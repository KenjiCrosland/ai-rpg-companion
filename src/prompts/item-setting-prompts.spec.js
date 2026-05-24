/**
 * Tests for item-setting-prompts.mjs
 *
 * Coverage focuses on the contract bits — schema validation, the prefill
 * shape, and the structural directives the prompt is supposed to embed
 * (item-name verbatim hint, existing-stubs-block firing). Open-ended LLM
 * behavior is verified by manual production review per the project's
 * test-writing convention.
 */

import {
  createItemSettingExtractionPrompt,
  validateItemSettingExtraction,
  buildSettingPrefillFromItem,
} from './item-setting-prompts.mjs';

describe('createItemSettingExtractionPrompt', () => {
  const baseItem = {
    name: 'The Whispering Crown',
    item_type: 'Wondrous Item',
    rarity: 'Rare',
    physical_description: 'A bronze diadem set with green stones.',
    lore: 'Forged in the Whispering Glade by the smith Vorn.',
  };

  it('embeds the item name verbatim into the role_brief example so the LLM uses it character-for-character', () => {
    const prompt = createItemSettingExtractionPrompt(baseItem);
    expect(prompt).toContain('Forge that produced The Whispering Crown');
    expect(prompt).toContain('Vault holding The Whispering Crown');
  });

  it('falls back to a placeholder when the item has no name', () => {
    const prompt = createItemSettingExtractionPrompt({ ...baseItem, name: '' });
    expect(prompt).toContain('[item name]');
  });

  it('emits an EXISTING LOCATION STUBS block when prior stubs are passed', () => {
    const prompt = createItemSettingExtractionPrompt(baseItem, {
      existingStubs: [{ name: 'The Whispering Glade' }, { name: 'Vorn-Hall' }],
    });
    expect(prompt).toContain('EXISTING LOCATION STUBS');
    expect(prompt).toContain('- The Whispering Glade');
    expect(prompt).toContain('- Vorn-Hall');
  });

  it('omits the EXISTING LOCATION STUBS block when no prior stubs are passed', () => {
    const prompt = createItemSettingExtractionPrompt(baseItem);
    expect(prompt).not.toContain('EXISTING LOCATION STUBS');
  });

  it('skips locations that are organizations / factions (the prompt routes those to NPCs)', () => {
    // The prompt itself is the contract here — verify it carries the
    // distinction directive so future edits don't regress the rule.
    const prompt = createItemSettingExtractionPrompt(baseItem);
    expect(prompt).toMatch(/organization.*faction.*cult.*SKIP/is);
    expect(prompt).toContain('related_npcs');
  });

  it('does not duplicate summary/legacy when they already appear inside lore', () => {
    const item = {
      ...baseItem,
      lore: 'Forged in the Whispering Glade. The Crown waited there for a thousand years before the Long War.',
      historicalSummary: 'The Crown waited there for a thousand years before the Long War.',
      itemLegacy: 'Long War-era relic.',
    };
    const prompt = createItemSettingExtractionPrompt(item);
    // Summary already inside lore — should NOT be re-emitted as its own
    // section block.
    expect(prompt).not.toContain('HISTORICAL SUMMARY');
    // Legacy is unique → should appear.
    expect(prompt).toContain('ITEM LEGACY:');
    expect(prompt).toContain('Long War-era relic.');
  });
});

describe('validateItemSettingExtraction', () => {
  it('accepts a well-formed array', () => {
    const json = JSON.stringify([
      { name: 'Glade', role_brief: 'Forge', context: 'a place', source_quote: '...' },
    ]);
    expect(validateItemSettingExtraction(json)).toBe(true);
  });

  it('accepts an empty array (no locations found)', () => {
    expect(validateItemSettingExtraction('[]')).toBe(true);
  });

  it('accepts entries without source_quote (older response shapes)', () => {
    const json = JSON.stringify([
      { name: 'Glade', role_brief: 'Forge', context: 'a place' },
    ]);
    expect(validateItemSettingExtraction(json)).toBe(true);
  });

  it('rejects non-arrays', () => {
    expect(validateItemSettingExtraction('{}')).toBe(false);
    expect(validateItemSettingExtraction('null')).toBe(false);
  });

  it('rejects entries with missing name', () => {
    const json = JSON.stringify([{ role_brief: 'Forge', context: 'no name' }]);
    expect(validateItemSettingExtraction(json)).toBe(false);
  });

  it('rejects entries with empty-string name', () => {
    const json = JSON.stringify([{ name: '   ', role_brief: '', context: '' }]);
    expect(validateItemSettingExtraction(json)).toBe(false);
  });

  it('rejects unparseable input', () => {
    expect(validateItemSettingExtraction('not json')).toBe(false);
  });
});

describe('buildSettingPrefillFromItem', () => {
  const baseSeed = {
    source: {
      type: 'item',
      id: 'The Whispering Crown',
      name: 'The Whispering Crown',
      item_type: 'Wondrous Item',
      rarity: 'Rare',
      physical_description: 'A bronze diadem.',
      lore: 'Forged long ago.',
    },
    entities: [{
      type: 'location',
      name: 'The Whispering Glade',
      role_or_description: 'Forge that produced The Whispering Crown',
      context: 'A clearing in the Sunless Wood',
      source_quote: 'It was forged in the Whispering Glade by the smith Vorn.',
    }],
  };

  it('produces a structured Name: / Role: headline plus context and source quote', () => {
    const text = buildSettingPrefillFromItem(baseSeed);
    expect(text).toContain('Name: The Whispering Glade');
    expect(text).toContain('Role: Forge that produced The Whispering Crown.');
    expect(text).toContain('Inspired by lore of The Whispering Crown.');
    expect(text).toContain('Place context: A clearing in the Sunless Wood');
    expect(text).toContain('Where this place appears in the source text:');
    expect(text).toContain('It was forged in the Whispering Glade by the smith Vorn.');
  });

  it('omits the Role line when role_or_description is missing', () => {
    const seed = {
      ...baseSeed,
      entities: [{ ...baseSeed.entities[0], role_or_description: '' }],
    };
    const text = buildSettingPrefillFromItem(seed);
    expect(text).not.toContain('Role:');
    expect(text).toContain('Name: The Whispering Glade');
  });

  it('omits the source-quote section when no quote is present', () => {
    const seed = {
      ...baseSeed,
      source: { ...baseSeed.source, quote: undefined },
      entities: [{ ...baseSeed.entities[0], source_quote: '' }],
    };
    const text = buildSettingPrefillFromItem(seed);
    expect(text).not.toContain('Where this place appears');
  });

  it('returns empty string for malformed input', () => {
    expect(buildSettingPrefillFromItem(null)).toBe('');
    expect(buildSettingPrefillFromItem({})).toBe('');
    expect(buildSettingPrefillFromItem({ source: {} })).toBe('');
    expect(buildSettingPrefillFromItem({ source: {}, entities: [] })).toBe('');
  });

  it('renders a slim "Other entities" list when realized siblings are present', () => {
    const seed = {
      ...baseSeed,
      source: {
        ...baseSeed.source,
        realized: {
          npcs: [{ name: 'Yelena of the Duskwood', role_brief: 'Oracle' }],
          settings: [{ name: 'The Sunless Wood', role_brief: 'Region holding the Glade' }],
        },
      },
    };
    const text = buildSettingPrefillFromItem(seed);
    expect(text).toContain('Other entities from this item\'s lore (already in your library):');
    expect(text).toContain('- Yelena of the Duskwood (NPC): Oracle');
    expect(text).toContain('- The Sunless Wood (Setting): Region holding the Glade');
  });

  it('omits the realized-siblings block entirely when both lists are empty', () => {
    const seed = {
      ...baseSeed,
      source: {
        ...baseSeed.source,
        realized: { npcs: [], settings: [] },
      },
    };
    const text = buildSettingPrefillFromItem(seed);
    expect(text).not.toContain('Other entities from this item\'s lore');
  });

  it('drops the role suffix when an entity has no role_brief', () => {
    const seed = {
      ...baseSeed,
      source: {
        ...baseSeed.source,
        realized: {
          npcs: [{ name: 'Anonymous Smith', role_brief: '' }],
          settings: [],
        },
      },
    };
    const text = buildSettingPrefillFromItem(seed);
    expect(text).toContain('- Anonymous Smith (NPC)');
    expect(text).not.toContain('- Anonymous Smith (NPC):'); // no trailing colon when role empty
  });

  it('does not embed full sibling content in the prefill — that goes via the prompt', () => {
    // Previously the prefill rendered an indented "brief" block under
    // each sibling. Now full sibling content threads through the
    // settingOverviewPrompt's `siblingSettings` param instead, keeping
    // the user-facing prefill compact.
    const seed = {
      ...baseSeed,
      source: {
        ...baseSeed.source,
        realized: {
          npcs: [],
          settings: [{ name: 'Tockwrought Vault', role_brief: 'Vault holding the Scroll' }],
        },
      },
    };
    const text = buildSettingPrefillFromItem(seed);
    expect(text).toContain('- Tockwrought Vault (Setting): Vault holding the Scroll');
    expect(text).not.toContain('Region:');
    expect(text).not.toContain('Leadership:');
  });
});
