/**
 * renderSettingOverview.mjs
 *
 * Consolidates a setting_overview JSON object into a markdown string
 * with system-controlled section labels, then parses that markdown
 * into a structured AST that Vue templates can render via v-for +
 * conditional rendering (no v-html).
 *
 * Two exports:
 *
 *   consolidateOverviewToMarkdown(overview) — takes the structured
 *     fields and emits a markdown string with `## Section` headers
 *     injected from a system-controlled vocabulary. The LLM never
 *     produces the headers; they're stamped in at consolidation so
 *     section vocabulary can change without regenerating settings.
 *
 *   parseSettingMarkdown(md) — takes any markdown string (new with
 *     section headers, or legacy plain prose) and returns:
 *
 *       {
 *         lead: { children: [...inlineNodes] } | null,
 *         sections: [
 *           { heading: 'History' | null, blocks: [...] }, ...
 *         ]
 *       }
 *
 *     Blocks are { type: 'paragraph' | 'beat', children: [...inlineNodes] }.
 *     Inline nodes are { type: 'text' | 'bold' | 'italic', value: string }.
 *
 * Markdown subset supported (the LLM is instructed to emit only these
 * markers; a custom parser is sufficient and avoids a markdown-it /
 * marked dependency for this narrow need):
 *
 *   **bold**           — named entities (people, places, factions)
 *   *italic*           — emphasis
 *   > *italic block*   — current-event beat (ruler activity, notable
 *                        facets); rendered as a brick left-bar inline-
 *                        block callout
 *   ## Heading         — section header (system-injected, never LLM)
 *
 * Legacy combined_content is pure plain prose with no markers; the
 * parser passes it through as plain paragraph blocks. First paragraph
 * becomes the lead by convention.
 */

/**
 * System-controlled vocabulary for section labels + field grouping.
 * The LLM never sees these strings; they're injected at consolidation
 * time. Changing a label here propagates to every un-edited setting
 * on next render.
 */
const SECTION_MAP = [
  // No-heading lead block: the overview field is the read-aloud pull-quote.
  { heading: null, fields: ['overview'], isLead: true },
  { heading: 'Region', fields: ['relation_to_larger_setting'] },
  { heading: 'History', fields: ['history'] },
  { heading: 'Leadership', fields: ['current_ruler_sentence'] },
  { heading: 'Society', fields: ['social_history', 'notable_social_facet'] },
  { heading: 'Economy', fields: ['economic_history', 'notable_economic_facet'] },
  { heading: 'Defense', fields: ['military_history', 'notable_security_facet'] },
  { heading: 'Present State', fields: ['central_dynamic', 'responses_in_motion', 'present_state'] },
];

/**
 * Consolidate a setting_overview JSON object into a markdown string
 * with section labels.
 *
 * Each section's fields are concatenated with spaces (they're prose;
 * separate sentences). Empty sections (all fields blank) are skipped.
 * The lead section emits no heading; subsequent sections emit `## H`.
 */
export function consolidateOverviewToMarkdown(overview) {
  if (!overview || typeof overview !== 'object') return '';
  const parts = [];
  for (const section of SECTION_MAP) {
    // Non-lead sections: every non-blank field becomes its own
    // \n\n-separated paragraph. This keeps the static-lore prose and
    // the "right now" beat ("Yesterday at dawn…") visually distinct
    // as separate paragraphs at body weight — the brief calls for
    // typographic equality, with prose itself signaling temporality.
    //
    // Lead section: join its fields into a single pull-quote-shaped
    // paragraph. The lead is the read-aloud opener for the card;
    // splitting it would dilute the identity.
    const values = section.fields
      .map(f => overview[f])
      .filter(v => typeof v === 'string' && v.trim())
      .map(v => v.trim());
    if (values.length === 0) continue;

    if (section.isLead) {
      parts.push(values.join(' '));
    } else {
      if (section.heading) parts.push(`## ${section.heading}`);
      parts.push(...values);
    }
  }
  return parts.join('\n\n');
}

/**
 * Parse a markdown string into the lead-and-sections AST.
 *
 * Block detection (by leading marker on a paragraph):
 *   "## X"          → heading (starts a new section)
 *   "> *...*"       → beat block
 *   anything else   → plain paragraph
 *
 * The first block (before any heading) is treated as the lead. If
 * the markdown emits a heading before any content, the lead is null
 * and all content lives in named sections.
 */
export function parseSettingMarkdown(md) {
  if (typeof md !== 'string' || !md.trim()) {
    return { lead: null, sections: [] };
  }

  const blocks = md.split(/\n\n+/).map(b => b.trim()).filter(Boolean);
  const result = { lead: null, sections: [] };
  let currentSection = null;

  for (const block of blocks) {
    if (block.startsWith('## ')) {
      const heading = block.slice(3).trim();
      currentSection = { heading, blocks: [] };
      result.sections.push(currentSection);
      continue;
    }

    // Legacy / defensive: `> *...*` blockquote-italic was an earlier
    // beat-block convention. The current design renders every "right
    // now" beat as a plain paragraph at body weight (temporality is
    // signaled by the prose itself: "Yesterday at dawn..."), so we
    // strip the blockquote/italic markers and let the inside parse as
    // a regular paragraph. Markdown the user pastes during edit still
    // round-trips this way without leaking literal `> *` characters.
    let normalized = block;
    if (/^>\s*\*[\s\S]*\*\.?\s*$/.test(block)) {
      normalized = block.replace(/^>\s*/, '').replace(/^\*/, '').replace(/\*\.?$/, '').trim();
    }
    const parsed = { type: 'paragraph', children: parseInline(normalized) };

    if (!result.lead && currentSection === null) {
      // First block before any heading → the lead. Promote a paragraph
      // to lead by tagging its type; a beat stays a beat but lives in
      // the lead slot.
      if (parsed.type === 'paragraph') {
        result.lead = { type: 'lead', children: parsed.children };
      } else {
        result.lead = parsed;
      }
      continue;
    }

    if (currentSection === null) {
      // Shouldn't typically happen given consolidator order, but
      // defensive: if we have a lead and now plain blocks with no
      // heading yet, create a heading-less section to hold them.
      currentSection = { heading: null, blocks: [] };
      result.sections.push(currentSection);
    }
    currentSection.blocks.push(parsed);
  }

  return result;
}

/**
 * Parse inline markdown (**bold** and *italic*) into a flat array of
 * { type, value } nodes. Plain text becomes { type: 'text', value }.
 *
 * The implementation walks character-by-character because the markers
 * are simple and we want to support **bold** appearing inside what
 * was already pulled out of a > *...* block. Nested markers (bold
 * inside italic and vice versa) are NOT supported — the LLM is
 * instructed to keep markup simple and a single level is enough for
 * the use case.
 */
function parseInline(text) {
  if (typeof text !== 'string' || text.length === 0) return [];
  const nodes = [];
  let i = 0;
  let plainStart = 0;

  const flushPlain = (end) => {
    if (end > plainStart) {
      nodes.push({ type: 'text', value: text.slice(plainStart, end) });
    }
  };

  while (i < text.length) {
    // **bold**
    if (text[i] === '*' && text[i + 1] === '*') {
      const end = text.indexOf('**', i + 2);
      if (end > i + 2) {
        flushPlain(i);
        nodes.push({ type: 'bold', value: text.slice(i + 2, end) });
        i = end + 2;
        plainStart = i;
        continue;
      }
    }
    // *italic* (not followed by another *)
    if (text[i] === '*' && text[i + 1] !== '*') {
      const end = text.indexOf('*', i + 1);
      // Don't match if the closing * is actually the start of another **bold**
      if (end > i + 1 && text[end + 1] !== '*') {
        flushPlain(i);
        nodes.push({ type: 'italic', value: text.slice(i + 1, end) });
        i = end + 1;
        plainStart = i;
        continue;
      }
    }
    i++;
  }
  flushPlain(text.length);
  return nodes;
}

/**
 * Convenience: take a setting_overview, return the parsed AST in one
 * call. Used by the Vue render path.
 *
 * Legacy combined_content path: when the overview has only
 * `combined_content` and no structured fields, parse the combined
 * content directly (it's plain prose, the parser handles it).
 *
 * When `named_entities` are present on the overview, first-mention
 * emphasis is applied to every block's inline-node array. The setting's
 * own name is filtered out of the entity pool so the card title — the
 * canonical place to read the setting name — carries the identity by
 * itself, and the body prose doesn't keep restating it in semibold.
 */
export function renderOverview(overview) {
  if (!overview) return { lead: null, sections: [] };
  let ast;
  if (overview.combined_content && typeof overview.combined_content === 'string') {
    ast = parseSettingMarkdown(overview.combined_content);
  } else {
    const md = consolidateOverviewToMarkdown(overview);
    ast = parseSettingMarkdown(md);
  }

  const entities = Array.isArray(overview.named_entities)
    ? overview.named_entities.filter(e => typeof e === 'string' && e.trim())
    : [];
  const settingName = (overview.name || '').trim();
  if (entities.length > 0) {
    return applyEntityEmphasisToAst(ast, entities, settingName);
  }
  return ast;
}

/**
 * First-mention emphasis: for each proper noun in `entities`, wrap its
 * FIRST occurrence in the overview prose with a `{type:'entity'}` inline
 * node. Subsequent mentions stay as plain text. This is the
 * readability-pass treatment — only one semibold cue per entity, so the
 * reader's eye gets a single anchor and the rest of the prose reads as
 * even-weighted body.
 *
 * Implementation notes:
 *
 * - Entities are sorted by length descending so longer multi-word names
 *   match before any shorter substring (e.g., "Magnus the Watch-Master"
 *   wins over "Magnus" when both are in the list).
 *
 * - The setting's own name is filtered out — the card title already
 *   establishes it; the body prose shouldn't keep semibold-highlighting
 *   the place every time it's named.
 *
 * - Only `text`-typed inline nodes are searched. Italic / bold / entity
 *   nodes are passed through untouched, so foreign in-world italics
 *   (e.g., *sídhe*, *kantele*) never receive a second emphasis layer.
 *
 * - Word-boundary matching uses Unicode letter classes so names with
 *   accents and non-Latin letters don't trip over JavaScript's default
 *   ASCII-only `\b`.
 *
 * Returns a NEW array of inline nodes; the input is not mutated.
 */
export function applyFirstMentionEmphasis(inlineNodes, entities, settingName) {
  if (!Array.isArray(inlineNodes) || inlineNodes.length === 0) return inlineNodes || [];
  if (!Array.isArray(entities) || entities.length === 0) return inlineNodes;

  const pool = entities
    .filter(e => typeof e === 'string' && e.trim())
    .filter(e => e.trim() !== (settingName || '').trim())
    .map(e => e.trim());

  // Sort longest-first so multi-word entities match before any shorter
  // substring they contain.
  const sorted = [...new Set(pool)].sort((a, b) => b.length - a.length);

  let result = inlineNodes;
  for (const entity of sorted) {
    result = wrapFirstOccurrence(result, entity);
  }
  return result;
}

function wrapFirstOccurrence(nodes, entity) {
  const escaped = entity.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Unicode-aware "word boundary": no Letter character immediately
  // before or after the match. Lookbehind/lookahead so the boundary
  // itself isn't part of the captured slice.
  let regex;
  try {
    regex = new RegExp(`(?<![\\p{L}])${escaped}(?![\\p{L}])`, 'u');
  } catch {
    return nodes;
  }

  const out = [];
  let wrapped = false;
  for (const node of nodes) {
    if (wrapped || node.type !== 'text' || typeof node.value !== 'string') {
      out.push(node);
      continue;
    }
    const match = regex.exec(node.value);
    if (!match) {
      out.push(node);
      continue;
    }
    const start = match.index;
    const end = start + entity.length;
    if (start > 0) out.push({ type: 'text', value: node.value.slice(0, start) });
    out.push({ type: 'entity', value: entity });
    if (end < node.value.length) out.push({ type: 'text', value: node.value.slice(end) });
    wrapped = true;
  }
  return out;
}

function applyEntityEmphasisToAst(ast, entities, settingName) {
  // Apply emphasis to the inline-node arrays of every block in the AST.
  // Each block is processed independently — "first mention" is scoped
  // to the entire overview, so we track per-entity-wrapped state across
  // blocks by progressively removing matched entities from the pool.
  const pool = entities
    .filter(e => typeof e === 'string' && e.trim())
    .filter(e => e.trim() !== (settingName || '').trim())
    .map(e => e.trim());
  const sorted = [...new Set(pool)].sort((a, b) => b.length - a.length);
  const remaining = new Set(sorted);

  function processBlock(block) {
    if (!block || !Array.isArray(block.children)) return block;
    let children = block.children;
    for (const entity of sorted) {
      if (!remaining.has(entity)) continue;
      const before = JSON.stringify(children);
      children = wrapFirstOccurrence(children, entity);
      if (JSON.stringify(children) !== before) {
        remaining.delete(entity);
      }
    }
    return { ...block, children };
  }

  return {
    lead: ast.lead ? processBlock(ast.lead) : null,
    sections: (ast.sections || []).map(section => ({
      ...section,
      blocks: (section.blocks || []).map(processBlock),
    })),
  };
}

/**
 * AST → plain text. Strips bold/italic markers; emits sections with a
 * dashed underline for the heading. Paragraphs separated by blank
 * lines; beats are flattened to plain sentences (the blockquote/italic
 * conventions don't survive the medium).
 */
function inlineToText(children) {
  if (!Array.isArray(children)) return '';
  // All node types collapse to their value when flattening to plain
  // text — entity emphasis and italics carry zero information in plain
  // text, so they're dropped to the raw value.
  return children.map(n => n.value || '').join('');
}

export function overviewAstToText(ast) {
  if (!ast) return '';
  const parts = [];
  if (ast.lead) {
    parts.push(inlineToText(ast.lead.children));
  }
  for (const section of ast.sections || []) {
    if (section.heading) {
      const title = section.heading;
      const dashes = '-'.repeat(title.length);
      parts.push(`${title}\n${dashes}`);
    }
    for (const block of section.blocks || []) {
      parts.push(inlineToText(block.children));
    }
  }
  return parts.filter(Boolean).join('\n\n');
}

/**
 * AST → markdown. Round-trips the consolidator's output: heading lines
 * `## Foo`, paragraphs, beats as `> *...*` blockquotes, inline bold
 * `**name**` and italic `*emph*` preserved.
 */
function inlineToMarkdown(children) {
  if (!Array.isArray(children)) return '';
  return children.map(n => {
    if (n.type === 'bold') return `**${n.value}**`;
    // Entity (first-mention emphasis) is a render-time concern derived
    // from the named_entities array — it has no markdown form, so it
    // flattens back to plain text when round-tripping.
    if (n.type === 'entity') return n.value || '';
    if (n.type === 'italic') return `*${n.value}*`;
    return n.value || '';
  }).join('');
}

export function overviewAstToMarkdown(ast) {
  if (!ast) return '';
  const parts = [];
  if (ast.lead) {
    parts.push(inlineToMarkdown(ast.lead.children));
  }
  for (const section of ast.sections || []) {
    if (section.heading) parts.push(`## ${section.heading}`);
    for (const block of section.blocks || []) {
      parts.push(inlineToMarkdown(block.children));
    }
  }
  return parts.filter(Boolean).join('\n\n');
}

/**
 * AST → HTML. Paragraphs become `<p>`, beats become `<blockquote><p><em>...</em></p></blockquote>`,
 * section headings become `<h3>`, bold becomes `<strong>`, italic
 * becomes `<em>`. The lead block gets a class hook so consumers can
 * style it as a pull quote.
 */
function escapeHtml(s) {
  if (typeof s !== 'string') return '';
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function inlineToHtml(children) {
  if (!Array.isArray(children)) return '';
  return children.map(n => {
    const value = escapeHtml(n.value || '');
    if (n.type === 'bold') return `<strong>${value}</strong>`;
    if (n.type === 'entity') return `<span class="par-entity">${value}</span>`;
    if (n.type === 'italic') return `<em>${value}</em>`;
    return value;
  }).join('');
}

export function overviewAstToHtml(ast) {
  if (!ast) return '';
  const parts = [];
  if (ast.lead) {
    parts.push(`<p class="setting-lead"><em>${inlineToHtml(ast.lead.children)}</em></p>`);
  }
  for (const section of ast.sections || []) {
    if (section.heading) {
      parts.push(`<h3>${escapeHtml(section.heading)}</h3>`);
    }
    for (const block of section.blocks || []) {
      parts.push(`<p>${inlineToHtml(block.children)}</p>`);
    }
  }
  return parts.join('\n');
}
