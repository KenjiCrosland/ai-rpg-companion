/**
 * renderDungeonOverview.mjs
 *
 * Dungeon overview renderer — parallel to renderSettingOverview but
 * with dungeon-specific section maps. Reuses setting's generic
 * markdown parser + entity-emphasis helpers (parseSettingMarkdown,
 * applyFirstMentionEmphasis) so the AST shape is identical and the
 * AST→text/markdown/html converters work uniformly across both tools.
 *
 * Exports:
 *
 *   consolidateOverviewToMarkdown(overview) — structured fields →
 *     markdown string with `## Section` headings. Used for storage
 *     (combined_content) and as the input to the renderer when no
 *     combined_content exists yet.
 *
 *   renderOverview(overview) — entry point. Picks combined_content if
 *     present, else consolidates fresh; parses to AST; applies
 *     first-mention entity emphasis from `named_entities`.
 *
 *   pickSectionMap(overview) — dispatcher exposed for tests. Detects
 *     new vs legacy shape via marker fields (central_dynamic for new,
 *     finding_the_dungeon for legacy).
 *
 * Two section maps, picked by field-shape detection:
 *
*   DUNGEON_SECTION_MAP_NEW — the post-2026-05 redesign shape.
 *     Approach (entrance / first-scene), Region, History, Dominant
 *     Power, Inhabitants (+ notable_inhabitant_facet), Defenses
 *     (+ notable_security_facet), Present State (central_dynamic +
 *     current_occupation + present_state), Difficulty.
 *
 *   DUNGEON_SECTION_MAP_LEGACY — the pre-2026-05 shape. Same section
 *     vocabulary where possible (Region / Approach / History /
 *     Dominant Power / Present State / Difficulty), legacy field
 *     names underneath. Treasures / Defenses / Inhabitants don't
 *     have legacy equivalents and are simply absent.
 */

import {
  parseSettingMarkdown,
  applyFirstMentionEmphasis,
} from '@/util/renderSettingOverview.mjs';

const DUNGEON_SECTION_MAP_NEW = [
  { heading: null, fields: ['overview'], isLead: true },
  { heading: 'Region', fields: ['relation_to_larger_setting'] },
  { heading: 'Approach', fields: ['approach_and_threshold'] },
  { heading: 'History', fields: ['history'] },
  { heading: 'Dominant Power', fields: ['dominant_power'] },
  { heading: 'Inhabitants', fields: ['inhabitants', 'notable_inhabitant_facet'] },
  { heading: 'Defenses', fields: ['traps_and_security', 'notable_security_facet'] },
  { heading: 'Present State', fields: ['central_dynamic', 'current_occupation', 'present_state'] },
  { heading: 'Difficulty', fields: ['difficulty_level'] },
];

const DUNGEON_SECTION_MAP_LEGACY = [
  { heading: null, fields: ['overview'], isLead: true },
  { heading: 'Region', fields: ['relation_to_larger_setting'] },
  { heading: 'Approach', fields: ['finding_the_dungeon'] },
  { heading: 'History', fields: ['history'] },
  {
    heading: 'Dominant Power',
    fields: ['dominant_power', 'dominant_power_goals', 'miniboss_description'],
  },
  { heading: 'Inhabitants', fields: ['dominant_power_minions'] },
  {
    heading: 'Present State',
    fields: [
      'dominant_power_event', 'recent_event_consequences',
      'secondary_power', 'secondary_power_event',
      'main_problem', 'potential_solutions',
      'conclusion',
    ],
  },
  { heading: 'Difficulty', fields: ['difficulty_level'] },
];

/**
 * Dispatch between section maps by marker-field detection. New shape
 * has `central_dynamic`; legacy shape has `finding_the_dungeon`
 * (the old approach axis). When neither marker is present (sparse
 * data), default to the new map — it will simply skip absent fields.
 */
export function pickSectionMap(overview) {
  if (!overview || typeof overview !== 'object') return DUNGEON_SECTION_MAP_NEW;
  if (typeof overview.central_dynamic === 'string' && overview.central_dynamic.trim()) {
    return DUNGEON_SECTION_MAP_NEW;
  }
  if (typeof overview.finding_the_dungeon === 'string' && overview.finding_the_dungeon.trim()) {
    return DUNGEON_SECTION_MAP_LEGACY;
  }
  return DUNGEON_SECTION_MAP_NEW;
}

/**
 * Consolidate a dungeon overview's structured fields into a single
 * markdown string with section headings.
 *
 * Each non-lead section emits `## Heading` followed by its fields as
 * separate \n\n-separated paragraphs (same convention as setting).
 * The lead joins its fields into one paragraph. Empty sections (no
 * non-blank fields) are skipped — legacy data missing Treasures /
 * Defenses doesn't emit empty sections.
 */
export function consolidateOverviewToMarkdown(overview) {
  if (!overview || typeof overview !== 'object') return '';
  const sectionMap = pickSectionMap(overview);
  const parts = [];
  for (const section of sectionMap) {
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
 * Local equivalent of setting's applyEntityEmphasisToAst (which isn't
 * exported by name). Walks the AST and applies first-mention bolding
 * to each block's inline-node array, with cross-block tracking so an
 * entity bolds in the first block it appears in and stays plain
 * thereafter.
 */
function applyEntityEmphasis(ast, entities, dungeonName) {
  const pool = (entities || [])
    .filter(e => typeof e === 'string' && e.trim())
    .filter(e => e.trim() !== (dungeonName || '').trim())
    .map(e => e.trim());
  if (pool.length === 0) return ast;

  const sorted = [...new Set(pool)].sort((a, b) => b.length - a.length);
  const remaining = new Set(sorted);

  function processBlock(block) {
    if (!block || !Array.isArray(block.children)) return block;
    let children = block.children;
    for (const entity of sorted) {
      if (!remaining.has(entity)) continue;
      const before = JSON.stringify(children);
      children = applyFirstMentionEmphasis(children, [entity], dungeonName);
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
 * Render a dungeon overview to a parsed AST.
 *
 * - If `combined_content` is present (i.e., user has edited), parse
 *   that directly. The edit flow consolidates structured fields into
 *   a single markdown blob; on subsequent renders the blob is the
 *   source of truth.
 * - Otherwise consolidate the structured fields into markdown and
 *   parse that.
 *
 * Then apply first-mention entity emphasis using `named_entities`,
 * with the dungeon's own name excluded (the title carries it).
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
    ? overview.named_entities
    : [];
  const dungeonName = (overview.name || '').trim();
  return applyEntityEmphasis(ast, entities, dungeonName);
}
