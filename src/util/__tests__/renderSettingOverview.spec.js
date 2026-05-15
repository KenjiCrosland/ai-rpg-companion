/**
 * Tests for the setting-overview markdown consolidator + parser +
 * renderers. Cover the AST contract — what shape comes out of the
 * parser, what comes out of the AST → text/markdown/HTML renderers —
 * not the prose content itself.
 */

import {
  consolidateOverviewToMarkdown,
  parseSettingMarkdown,
  renderOverview,
  overviewAstToText,
  overviewAstToMarkdown,
  overviewAstToHtml,
  applyFirstMentionEmphasis,
} from '../renderSettingOverview.mjs';

describe('consolidateOverviewToMarkdown', () => {
  it('emits the overview field as the lead with no heading', () => {
    const md = consolidateOverviewToMarkdown({
      overview: 'A coastal village under banked coals.',
    });
    expect(md).toBe('A coastal village under banked coals.');
    expect(md).not.toMatch(/^##/);
  });

  it('emits ## headings for each non-lead section that has content', () => {
    const md = consolidateOverviewToMarkdown({
      overview: 'Lead text.',
      history: 'History text.',
      current_ruler_sentence: 'Mayor Eda rules.',
      social_history: 'Social history text.',
    });
    expect(md).toContain('Lead text.');
    expect(md).toContain('## History');
    expect(md).toContain('History text.');
    expect(md).toContain('## Leadership');
    expect(md).toContain('Mayor Eda rules.');
    expect(md).toContain('## Society');
    expect(md).toContain('Social history text.');
  });

  it('skips sections whose fields are all blank', () => {
    const md = consolidateOverviewToMarkdown({
      overview: 'Lead.',
      economic_history: '',
      notable_economic_facet: '',
    });
    expect(md).not.toContain('## Economy');
  });

  it('emits each non-lead section field as its own \\n\\n-separated paragraph', () => {
    const md = consolidateOverviewToMarkdown({
      overview: 'Lead.',
      central_dynamic: 'Dynamic part.',
      responses_in_motion: 'Responses part.',
      present_state: 'Present state part.',
    });
    // Each "right now" field stands alone — typographic equality with
    // the static-lore paragraphs.
    expect(md).toContain('Dynamic part.\n\nResponses part.\n\nPresent state part.');
  });

  it('separates static-lore and right-now fields within a section as distinct paragraphs', () => {
    const md = consolidateOverviewToMarkdown({
      overview: 'Lead.',
      social_history: 'History part.',
      notable_social_facet: 'Yesterday at dawn the wardens met.',
    });
    expect(md).toContain('History part.\n\nYesterday at dawn the wardens met.');
    expect(md).not.toContain('History part. Yesterday');
  });

  it('parses each field as a separate paragraph block in its section', () => {
    const md = consolidateOverviewToMarkdown({
      overview: 'Lead.',
      social_history: 'History part.',
      notable_social_facet: 'Yesterday at dawn the wardens met.',
    });
    const ast = parseSettingMarkdown(md);
    const society = ast.sections.find(s => s.heading === 'Society');
    expect(society).toBeDefined();
    expect(society.blocks).toHaveLength(2);
    expect(society.blocks[0].type).toBe('paragraph');
    expect(society.blocks[1].type).toBe('paragraph');
  });

  it('returns an empty string for null/undefined input', () => {
    expect(consolidateOverviewToMarkdown(null)).toBe('');
    expect(consolidateOverviewToMarkdown(undefined)).toBe('');
  });

  it('places relation_to_larger_setting under its own Region section, not the lead', () => {
    const md = consolidateOverviewToMarkdown({
      overview: 'Lead text.',
      relation_to_larger_setting: 'Sits within the Western Reach.',
    });
    // Lead is just the overview field. Region is a separate headed
    // section so the larger-world context reads as a discrete topic
    // alongside History, Society, etc.
    expect(md).toContain('Lead text.');
    expect(md).toContain('## Region');
    expect(md).toContain('Sits within the Western Reach.');
    expect(md).not.toContain('Lead text. Sits within');
  });
});

describe('parseSettingMarkdown', () => {
  it('returns empty AST for empty input', () => {
    expect(parseSettingMarkdown('')).toEqual({ lead: null, sections: [] });
    expect(parseSettingMarkdown(null)).toEqual({ lead: null, sections: [] });
  });

  it('promotes the first paragraph to the lead', () => {
    const ast = parseSettingMarkdown('Lead paragraph here.\n\n## History\n\nHistory text.');
    expect(ast.lead).not.toBeNull();
    expect(ast.lead.type).toBe('lead');
    expect(ast.lead.children).toEqual([{ type: 'text', value: 'Lead paragraph here.' }]);
    expect(ast.sections).toHaveLength(1);
    expect(ast.sections[0].heading).toBe('History');
  });

  it('parses `## Heading` lines as section starts', () => {
    const ast = parseSettingMarkdown('Lead.\n\n## Society\n\nSocial.\n\n## Economy\n\nEconomic.');
    expect(ast.sections.map(s => s.heading)).toEqual(['Society', 'Economy']);
  });

  it('treats legacy `> *...*` blockquote-italic input as a plain paragraph (markers stripped)', () => {
    // Defensive: edit-mode users can paste raw markdown containing
    // the old blockquote-italic beat convention; the parser strips
    // the `> ` and surrounding `*…*` and renders as a plain paragraph
    // instead of leaking literal characters. No more 'beat' block type.
    const ast = parseSettingMarkdown('Lead.\n\n## Leadership\n\n> *Mayor rules.*');
    const block = ast.sections[0].blocks[0];
    expect(block.type).toBe('paragraph');
    expect(block.children).toEqual([{ type: 'text', value: 'Mayor rules.' }]);
  });

  it('parses `**bold**` as a bold inline node', () => {
    const ast = parseSettingMarkdown('Lead with **Magnus** here.');
    expect(ast.lead.children).toEqual([
      { type: 'text', value: 'Lead with ' },
      { type: 'bold', value: 'Magnus' },
      { type: 'text', value: ' here.' },
    ]);
  });

  it('parses `*italic*` as an italic inline node', () => {
    const ast = parseSettingMarkdown('A *whisper* in the dark.');
    expect(ast.lead.children).toEqual([
      { type: 'text', value: 'A ' },
      { type: 'italic', value: 'whisper' },
      { type: 'text', value: ' in the dark.' },
    ]);
  });

  it('parses bold inside a legacy stripped-blockquote paragraph', () => {
    const ast = parseSettingMarkdown('Lead.\n\n## Leadership\n\n> *Mayor **Eda** rules.*');
    const block = ast.sections[0].blocks[0];
    expect(block.type).toBe('paragraph');
    expect(block.children).toEqual([
      { type: 'text', value: 'Mayor ' },
      { type: 'bold', value: 'Eda' },
      { type: 'text', value: ' rules.' },
    ]);
  });

  it('passes legacy plain prose through as paragraph blocks (no markup)', () => {
    const legacy = 'First paragraph.\n\nSecond paragraph.\n\nThird paragraph.';
    const ast = parseSettingMarkdown(legacy);
    expect(ast.lead.children).toEqual([{ type: 'text', value: 'First paragraph.' }]);
    // No heading → all subsequent blocks land in a heading-less section
    expect(ast.sections).toHaveLength(1);
    expect(ast.sections[0].heading).toBeNull();
    expect(ast.sections[0].blocks).toHaveLength(2);
  });
});

describe('renderOverview', () => {
  it('parses combined_content directly when present', () => {
    const ast = renderOverview({
      combined_content: 'Legacy prose with no markers.',
      overview: 'Should be ignored.',
    });
    expect(ast.lead.children).toEqual([{ type: 'text', value: 'Legacy prose with no markers.' }]);
  });

  it('consolidates structured fields when combined_content is absent', () => {
    const ast = renderOverview({
      overview: 'Lead.',
      history: 'Founded long ago.',
    });
    expect(ast.lead).not.toBeNull();
    expect(ast.sections.map(s => s.heading)).toEqual(['History']);
  });

  it('returns empty AST for null overview', () => {
    expect(renderOverview(null)).toEqual({ lead: null, sections: [] });
  });
});

describe('overviewAstToText', () => {
  it('strips bold/italic markers and underlines section headings', () => {
    const ast = renderOverview({
      overview: 'Lead with **Magnus** and *whisper*.',
      history: 'Founded by **Eda**.',
    });
    const text = overviewAstToText(ast);
    expect(text).toContain('Lead with Magnus and whisper.');
    expect(text).toContain('History\n-------');
    expect(text).toContain('Founded by Eda.');
    expect(text).not.toContain('**');
    expect(text).not.toContain('*');
  });
});

describe('overviewAstToMarkdown', () => {
  it('round-trips bold/italic markers in a plain paragraph', () => {
    const ast = renderOverview({
      overview: 'Lead with **Magnus** here.',
      current_ruler_sentence: 'Mayor **Eda** rules.',
    });
    const md = overviewAstToMarkdown(ast);
    expect(md).toContain('Lead with **Magnus** here.');
    expect(md).toContain('## Leadership');
    expect(md).toContain('Mayor **Eda** rules.');
  });
});

describe('applyFirstMentionEmphasis', () => {
  it('wraps the first occurrence of an entity in a text node', () => {
    const nodes = [{ type: 'text', value: 'Magnus told the wardens.' }];
    const out = applyFirstMentionEmphasis(nodes, ['Magnus'], 'Hjallmark');
    expect(out).toEqual([
      { type: 'entity', value: 'Magnus' },
      { type: 'text', value: ' told the wardens.' },
    ]);
  });

  it('leaves text untouched when the entity does not appear', () => {
    const nodes = [{ type: 'text', value: 'No names here.' }];
    const out = applyFirstMentionEmphasis(nodes, ['Magnus'], 'Hjallmark');
    expect(out).toEqual([{ type: 'text', value: 'No names here.' }]);
  });

  it('wraps only the first of multiple occurrences', () => {
    const nodes = [{ type: 'text', value: 'Magnus left. Later, Magnus returned.' }];
    const out = applyFirstMentionEmphasis(nodes, ['Magnus'], 'Hjallmark');
    expect(out).toEqual([
      { type: 'entity', value: 'Magnus' },
      { type: 'text', value: ' left. Later, Magnus returned.' },
    ]);
  });

  it('longer entity wins when one is a substring of another', () => {
    const nodes = [{ type: 'text', value: 'Magnus the Watch-Master returned. Then Magnus left.' }];
    const out = applyFirstMentionEmphasis(
      nodes,
      ['Magnus', 'Magnus the Watch-Master'],
      'Hjallmark'
    );
    expect(out).toEqual([
      { type: 'entity', value: 'Magnus the Watch-Master' },
      { type: 'text', value: ' returned. Then ' },
      { type: 'entity', value: 'Magnus' },
      { type: 'text', value: ' left.' },
    ]);
  });

  it('handles entities adjacent to punctuation as word-boundary matches', () => {
    const nodes = [{ type: 'text', value: 'They asked Vance, who refused.' }];
    const out = applyFirstMentionEmphasis(nodes, ['Vance'], 'Hjallmark');
    expect(out).toEqual([
      { type: 'text', value: 'They asked ' },
      { type: 'entity', value: 'Vance' },
      { type: 'text', value: ', who refused.' },
    ]);
  });

  it('does not match an entity when it appears as a substring of a longer word', () => {
    const nodes = [{ type: 'text', value: 'Edaward is not Eda.' }];
    const out = applyFirstMentionEmphasis(nodes, ['Eda'], 'Hjallmark');
    // The "Eda" in "Edaward" must not match (boundary check); the
    // standalone "Eda" should be wrapped.
    expect(out).toEqual([
      { type: 'text', value: 'Edaward is not ' },
      { type: 'entity', value: 'Eda' },
      { type: 'text', value: '.' },
    ]);
  });

  it('does not wrap entity occurrences inside italic nodes (skip italic regions)', () => {
    const nodes = [
      { type: 'text', value: 'The ' },
      { type: 'italic', value: 'sídhe' },
      { type: 'text', value: ' watch over ' },
      { type: 'text', value: 'Magnus.' },
    ];
    const out = applyFirstMentionEmphasis(nodes, ['sídhe', 'Magnus'], 'Hjallmark');
    // The italic 'sídhe' stays italic, NOT wrapped as an entity.
    // 'Magnus' inside the trailing text node gets wrapped.
    expect(out).toEqual([
      { type: 'text', value: 'The ' },
      { type: 'italic', value: 'sídhe' },
      { type: 'text', value: ' watch over ' },
      { type: 'entity', value: 'Magnus' },
      { type: 'text', value: '.' },
    ]);
  });

  it('filters the setting name out of the entity pool', () => {
    const nodes = [{ type: 'text', value: 'Hjallmark stands against the dark.' }];
    const out = applyFirstMentionEmphasis(nodes, ['Hjallmark'], 'Hjallmark');
    // Setting name skipped — no entity wrap.
    expect(out).toEqual([{ type: 'text', value: 'Hjallmark stands against the dark.' }]);
  });

  it('returns input unchanged when entity list is empty or missing', () => {
    const nodes = [{ type: 'text', value: 'Anything.' }];
    expect(applyFirstMentionEmphasis(nodes, [], 'X')).toEqual(nodes);
    expect(applyFirstMentionEmphasis(nodes, null, 'X')).toEqual(nodes);
  });

  it('handles Unicode-letter names (accented, non-Latin) at word boundaries', () => {
    const nodes = [{ type: 'text', value: 'Brìghde walked east. Brìghde returned.' }];
    const out = applyFirstMentionEmphasis(nodes, ['Brìghde'], 'X');
    expect(out).toEqual([
      { type: 'entity', value: 'Brìghde' },
      { type: 'text', value: ' walked east. Brìghde returned.' },
    ]);
  });
});

describe('renderOverview with named_entities', () => {
  it('applies first-mention emphasis to overview blocks when named_entities present', () => {
    const ast = renderOverview({
      name: 'Hjallmark',
      overview: 'Magnus rules.',
      history: 'Magnus founded the realm. Magnus then expanded.',
      named_entities: ['Magnus', 'Hjallmark'],
    });
    // Lead has the first "Magnus", wrapped.
    expect(ast.lead.children).toEqual([
      { type: 'entity', value: 'Magnus' },
      { type: 'text', value: ' rules.' },
    ]);
    // History block has both occurrences as plain text — first-mention
    // emphasis is scoped across the whole overview, so the lead's wrap
    // consumed Magnus's budget.
    expect(ast.sections[0].blocks[0].children).toEqual([
      { type: 'text', value: 'Magnus founded the realm. Magnus then expanded.' },
    ]);
  });
});

describe('overviewAstToHtml', () => {
  it('emits <p class="setting-lead"><em>...</em></p> for the lead', () => {
    const ast = renderOverview({ overview: 'Lead text.' });
    const html = overviewAstToHtml(ast);
    expect(html).toContain('<p class="setting-lead"><em>Lead text.</em></p>');
  });

  it('emits <h3> for section headings', () => {
    const ast = renderOverview({ overview: 'Lead.', history: 'History.' });
    expect(overviewAstToHtml(ast)).toContain('<h3>History</h3>');
  });

  it('emits <strong> for bold and <em> for italic inline', () => {
    const ast = renderOverview({ overview: 'Lead.', history: 'Founded by **Eda**.' });
    const html = overviewAstToHtml(ast);
    expect(html).toContain('<strong>Eda</strong>');
  });

  it('emits a plain <p> for what was previously a beat (no <blockquote>)', () => {
    const ast = renderOverview({
      overview: 'Lead.',
      current_ruler_sentence: 'Mayor rules.',
    });
    const html = overviewAstToHtml(ast);
    expect(html).toContain('<p>Mayor rules.</p>');
    expect(html).not.toContain('<blockquote>');
  });

  it('escapes HTML special characters in plain text', () => {
    const ast = parseSettingMarkdown('A <script>alert(1)</script> & more.');
    const html = overviewAstToHtml(ast);
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('&amp;');
  });
});
