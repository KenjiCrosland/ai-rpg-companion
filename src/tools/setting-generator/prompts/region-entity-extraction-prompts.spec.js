/**
 * Tests for region-entity-extraction-prompts.mjs.
 *
 * Coverage: structural contract of the prompt (current setting name,
 * register, and the three prose fields land in the prompt; self-
 * exclusion directive is present; classification rules cover all
 * four kinds) and the validator (accepts well-formed arrays,
 * rejects bad shapes / unknown kinds / unparseable JSON).
 *
 * No assertions on open-ended prompt wording per the project
 * test-writing convention — those go through manual production review.
 */

import {
  createRegionEntityExtractionPrompt,
  validateRegionEntityExtraction,
} from './region-entity-extraction-prompts.mjs';

describe('createRegionEntityExtractionPrompt', () => {
  const baseArgs = {
    settingName: 'Gorod-Ognya',
    register: 'Slavic-inspired',
    region: 'Gorod-Ognya crowns the western slope of Krakova-Gora, the highest peak in the Gray Ribs. Eastward lies the Dryad\'s Reach.',
    history: 'Founded by Tzar Vladislav after the fall of the Vysokogradsky realm.',
    leadership: 'The Voivoda Sergey rules with backing from the Kupechestvo.',
  };

  it('embeds the current setting name in the CURRENT SETTING line', () => {
    const prompt = createRegionEntityExtractionPrompt(baseArgs);
    expect(prompt).toContain('CURRENT SETTING: Gorod-Ognya');
  });

  it('embeds the register when provided', () => {
    const prompt = createRegionEntityExtractionPrompt(baseArgs);
    expect(prompt).toContain('REGISTER: Slavic-inspired');
  });

  it('omits the REGISTER line when register is null / missing', () => {
    const prompt = createRegionEntityExtractionPrompt({ ...baseArgs, register: null });
    expect(prompt).not.toContain('REGISTER:');
  });

  it('embeds the three prose fields verbatim under labeled headings', () => {
    const prompt = createRegionEntityExtractionPrompt(baseArgs);
    expect(prompt).toContain('REGION:\nGorod-Ognya crowns the western slope');
    expect(prompt).toContain('HISTORY:\nFounded by Tzar Vladislav');
    expect(prompt).toContain('LEADERSHIP:\nThe Voivoda Sergey rules');
  });

  it('omits prose blocks whose field is empty', () => {
    const prompt = createRegionEntityExtractionPrompt({ ...baseArgs, history: '', leadership: '' });
    expect(prompt).toContain('REGION:');
    expect(prompt).not.toContain('HISTORY:');
    expect(prompt).not.toContain('LEADERSHIP:');
  });

  it('emits all four classification kinds as named options', () => {
    const prompt = createRegionEntityExtractionPrompt(baseArgs);
    expect(prompt).toContain('"parent"');
    expect(prompt).toContain('"sibling"');
    expect(prompt).toContain('"sublocation"');
    expect(prompt).toContain('"feature"');
  });

  it('directs the LLM to exclude the current setting name from results', () => {
    const prompt = createRegionEntityExtractionPrompt(baseArgs);
    // The directive should mention the setting name in the exclusion list.
    expect(prompt).toMatch(/exclude.*Gorod-Ognya|Gorod-Ognya.*not.*include|own name.*Gorod-Ognya/i);
  });

  it('handles a missing settingName by falling back to a placeholder', () => {
    const prompt = createRegionEntityExtractionPrompt({ ...baseArgs, settingName: '' });
    expect(prompt).toContain('CURRENT SETTING: (unnamed setting)');
  });

  it('renders proseSections verbatim under their custom labels when provided', () => {
    // The new generalized shape: any-scale callers pass labeled prose
    // blocks instead of the three legacy fields. Place-scale and
    // landscape-scale extraction relies on this path.
    const prompt = createRegionEntityExtractionPrompt({
      settingName: 'Piazza dei Fonditori',
      register: 'Italian-Renaissance-inspired',
      proseSections: [
        { label: 'WHERE IT SITS', text: 'At the foot of the Collina dei Conclavi, on the Via della Ruota.' },
        { label: 'FEATURES', text: 'Thirty paces across, a dry fountain at the center.' },
      ],
    });
    expect(prompt).toContain('WHERE IT SITS:\nAt the foot of the Collina');
    expect(prompt).toContain('FEATURES:\nThirty paces across');
    // The legacy labels should not appear when proseSections is provided.
    expect(prompt).not.toContain('REGION:');
    expect(prompt).not.toContain('HISTORY:');
    expect(prompt).not.toContain('LEADERSHIP:');
  });

  it('ignores the legacy region/history/leadership fields when proseSections is provided', () => {
    const prompt = createRegionEntityExtractionPrompt({
      settingName: 'Piazza',
      register: null,
      proseSections: [
        { label: 'WHERE IT SITS', text: 'New-shape prose.' },
      ],
      // These should be silently ignored.
      region: 'Old-shape region prose.',
      history: 'Old-shape history prose.',
      leadership: 'Old-shape leadership prose.',
    });
    expect(prompt).toContain('WHERE IT SITS:\nNew-shape prose.');
    expect(prompt).not.toContain('Old-shape');
  });

  it('skips proseSections entries with empty text or missing label', () => {
    const prompt = createRegionEntityExtractionPrompt({
      settingName: 'Piazza',
      register: null,
      proseSections: [
        { label: 'PRESENT', text: 'This appears.' },
        { label: 'EMPTY', text: '' },
        { label: 'WHITESPACE', text: '   ' },
        { label: '', text: 'This has no label.' },
        { text: 'This has no label property at all.' },
      ],
    });
    expect(prompt).toContain('PRESENT:\nThis appears.');
    expect(prompt).not.toContain('EMPTY:');
    expect(prompt).not.toContain('WHITESPACE:');
    expect(prompt).not.toContain('This has no label.');
    expect(prompt).not.toContain('This has no label property at all.');
  });
});

describe('validateRegionEntityExtraction', () => {
  it('accepts a well-formed array', () => {
    const ok = JSON.stringify([
      {
        name: 'Krakova-Gora',
        kind: 'parent',
        source_quote: 'crowns the western slope of Krakova-Gora',
        role_brief: 'Dormant volcano the city crowns',
        suggested_setting_type: 'wilderness',
      },
    ]);
    expect(validateRegionEntityExtraction(ok)).toBe(true);
  });

  it('accepts an empty array (no places found)', () => {
    expect(validateRegionEntityExtraction('[]')).toBe(true);
  });

  it('accepts entries missing optional fields (source_quote / role_brief / suggested_setting_type)', () => {
    const minimal = JSON.stringify([{ name: 'Tverzh', kind: 'sibling' }]);
    expect(validateRegionEntityExtraction(minimal)).toBe(true);
  });

  it('rejects non-arrays', () => {
    expect(validateRegionEntityExtraction('{"name":"X"}')).toBe(false);
    expect(validateRegionEntityExtraction('"string"')).toBe(false);
    expect(validateRegionEntityExtraction('null')).toBe(false);
  });

  it('rejects entries with missing name', () => {
    const bad = JSON.stringify([{ kind: 'parent', source_quote: 'x' }]);
    expect(validateRegionEntityExtraction(bad)).toBe(false);
  });

  it('rejects entries with empty-string name', () => {
    const bad = JSON.stringify([{ name: '   ', kind: 'parent' }]);
    expect(validateRegionEntityExtraction(bad)).toBe(false);
  });

  it('rejects entries with unknown kind value', () => {
    const bad = JSON.stringify([{ name: 'X', kind: 'rivalry' }]);
    expect(validateRegionEntityExtraction(bad)).toBe(false);
  });

  it('rejects entries with missing kind field', () => {
    const bad = JSON.stringify([{ name: 'X' }]);
    expect(validateRegionEntityExtraction(bad)).toBe(false);
  });

  it('rejects unparseable input', () => {
    expect(validateRegionEntityExtraction('not json')).toBe(false);
    expect(validateRegionEntityExtraction('')).toBe(false);
  });

  it('rejects mixed arrays where one entry is bad', () => {
    const mixed = JSON.stringify([
      { name: 'Good', kind: 'parent' },
      { name: 'Bad', kind: 'not-a-kind' },
    ]);
    expect(validateRegionEntityExtraction(mixed)).toBe(false);
  });
});
