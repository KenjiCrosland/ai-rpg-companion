/**
 * Tests for selectExtractionSections — the scale-aware prose-field
 * selector that feeds the related-places extraction prompt.
 *
 * The full extractRelatedPlaces pipeline calls the LLM and is
 * verified by manual production review per project test convention.
 * The selector is pure code with a small surface and disjoint
 * per-scale branches; behavior tests cover it cleanly.
 */

import {
  selectExtractionSections,
  attachSeededFromMatchingItemStubs,
} from './extract-related-places.mjs';

class LocalStorageMock {
  constructor() { this.store = {}; }
  clear() { this.store = {}; }
  getItem(key) { return this.store[key] ?? null; }
  setItem(key, value) { this.store[key] = String(value); }
  removeItem(key) { delete this.store[key]; }
  get length() { return Object.keys(this.store).length; }
}

function seedItems(items) {
  localStorage.setItem('savedItems', JSON.stringify(items));
}

describe('selectExtractionSections — polity scale (default)', () => {
  it('returns the legacy region/history/leadership fields when scale is polity', () => {
    const setting = {
      scale: 'polity',
      setting_overview: {
        relation_to_larger_setting: 'A kingdom in the north.',
        history: 'Founded by Tzar Vladislav.',
        current_ruler_sentence: 'The Voivoda rules.',
        // Place + landscape fields that should NOT be selected:
        where_it_sits: 'should not appear',
        features: 'should not appear',
        extent: 'should not appear',
      },
    };
    const sections = selectExtractionSections(setting);
    const labels = sections.map(s => s.label);
    expect(labels).toEqual(['REGION', 'HISTORY', 'LEADERSHIP']);
    expect(sections[0].text).toBe('A kingdom in the north.');
  });

  it('defaults to polity selection when scale is missing (legacy data)', () => {
    const setting = {
      setting_overview: {
        relation_to_larger_setting: 'Region prose.',
        history: 'History prose.',
        current_ruler_sentence: 'Leadership prose.',
      },
    };
    const sections = selectExtractionSections(setting);
    const labels = sections.map(s => s.label);
    expect(labels).toEqual(['REGION', 'HISTORY', 'LEADERSHIP']);
  });

  it('defaults to polity selection when scale is an unknown string', () => {
    const setting = {
      scale: 'wibble',
      setting_overview: {
        relation_to_larger_setting: 'Region prose.',
      },
    };
    const sections = selectExtractionSections(setting);
    expect(sections.map(s => s.label)).toEqual(['REGION', 'HISTORY', 'LEADERSHIP']);
  });
});

describe('selectExtractionSections — place scale', () => {
  it('returns the six place-scale fields with correct labels and order', () => {
    const setting = {
      scale: 'place',
      setting_overview: {
        overview: 'A piazza at dusk.',
        where_it_sits: 'At the foot of the Collina.',
        features: 'Thirty paces across, a dry fountain.',
        what_happens_here: 'Bell-founders haggle here.',
        who_frequents_here: 'Old Renzo sweeps at dusk.',
        hidden_detail: 'A dark stain on the third step.',
        // Polity fields that should NOT appear:
        relation_to_larger_setting: 'should not appear',
        history: 'should not appear',
      },
    };
    const sections = selectExtractionSections(setting);
    expect(sections.map(s => s.label)).toEqual([
      'OVERVIEW',
      'WHERE IT SITS',
      'FEATURES',
      'WHAT HAPPENS HERE',
      'WHO FREQUENTS HERE',
      'HIDDEN DETAIL',
    ]);
    // Spot-check that the prose is mapped from the right fields.
    expect(sections.find(s => s.label === 'WHERE IT SITS').text)
      .toBe('At the foot of the Collina.');
    expect(sections.find(s => s.label === 'WHO FREQUENTS HERE').text)
      .toBe('Old Renzo sweeps at dusk.');
  });

  it('returns sections with undefined text when the overview is missing fields', () => {
    // The downstream prompt builder filters empty sections out, so
    // it's fine for the selector to surface fields whose text is
    // undefined or empty. This test just confirms the selector
    // doesn't crash when fields are missing.
    const setting = { scale: 'place', setting_overview: {} };
    const sections = selectExtractionSections(setting);
    expect(sections).toHaveLength(6);
    expect(sections.every(s => typeof s.label === 'string')).toBe(true);
  });
});

describe('attachSeededFromMatchingItemStubs', () => {
  beforeEach(() => {
    global.localStorage = new LocalStorageMock();
  });

  it('is a no-op when the setting has no item provenance', () => {
    const stubs = [{ name: 'Stonemother', kind: 'parent' }];
    const out = attachSeededFromMatchingItemStubs(stubs, { sourceType: null });
    expect(out).toEqual(stubs);
    expect(out[0].seeded_from).toBeUndefined();
  });

  it('is a no-op when the source item is not in storage', () => {
    seedItems([]);
    const stubs = [{ name: 'Stonemother', kind: 'parent' }];
    const out = attachSeededFromMatchingItemStubs(stubs, {
      sourceType: 'item',
      sourceId: 'Vardlokkur',
    });
    expect(out).toEqual(stubs);
  });

  it('tags a stub when its name matches a stub on the source item', () => {
    seedItems([{
      name: 'Vardlokkur',
      related_settings: [
        { name: 'Stonemother', stub_role: 'mountain-range' },
        { name: 'the Broken Gate', stub_role: 'battlefield' },
      ],
    }]);
    const stubs = [
      { name: 'Stonemother', kind: 'parent', source_quote: '...' },
      { name: 'Some unrelated piazza', kind: 'sibling', source_quote: '...' },
    ];
    const out = attachSeededFromMatchingItemStubs(stubs, {
      sourceType: 'item',
      sourceId: 'Vardlokkur',
    });
    expect(out[0].seeded_from).toEqual({
      source_type: 'item',
      source_id: 'Vardlokkur',
      source_name: 'Vardlokkur',
      stub_name: 'Stonemother',
    });
    // Unrelated stub untagged.
    expect(out[1].seeded_from).toBeUndefined();
    // Original stubs preserved.
    expect(out[0].name).toBe('Stonemother');
    expect(out[0].kind).toBe('parent');
  });

  it('matches case-insensitively after trimming whitespace', () => {
    // The LLM may extract "the Stonemother" while the item stub is
    // "Stonemother" — normalization handles the mismatch.
    seedItems([{
      name: 'Vardlokkur',
      related_settings: [{ name: 'Stonemother' }],
    }]);
    const stubs = [{ name: '  stonemother  ', kind: 'parent' }];
    const out = attachSeededFromMatchingItemStubs(stubs, {
      sourceType: 'item',
      sourceId: 'Vardlokkur',
    });
    expect(out[0].seeded_from).toBeDefined();
    expect(out[0].seeded_from.stub_name).toBe('Stonemother'); // preserves the item-side casing
  });

  it('tags via leading-word match when the extracted name has a terrain qualifier', () => {
    // The LLM may extract "Stonemother range" from prose while the
    // item-side stub is just "Stonemother". Leading-word match
    // recovers the link.
    seedItems([{
      name: 'Vardlokkur',
      related_settings: [{ name: 'Stonemother', role_brief: 'mountain-range' }],
    }]);
    const stubs = [{ name: 'Stonemother range', kind: 'parent', source_quote: '...' }];
    const out = attachSeededFromMatchingItemStubs(stubs, {
      sourceType: 'item',
      sourceId: 'Vardlokkur',
    });
    expect(out[0].seeded_from).toEqual({
      source_type: 'item',
      source_id: 'Vardlokkur',
      source_name: 'Vardlokkur',
      stub_name: 'Stonemother',
    });
  });

  it('does NOT tag when only a trailing-word match exists', () => {
    // "Range of Stonemother" is not a leading-word match for "Stonemother"
    // — the link should not fire (leading-word match was the agreed
    // heuristic; trailing-substring matches would be too noisy).
    seedItems([{
      name: 'Vardlokkur',
      related_settings: [{ name: 'Stonemother' }],
    }]);
    const stubs = [{ name: 'Range of Stonemother', kind: 'parent' }];
    const out = attachSeededFromMatchingItemStubs(stubs, {
      sourceType: 'item',
      sourceId: 'Vardlokkur',
    });
    expect(out[0].seeded_from).toBeUndefined();
  });

  it('prefers the shortest matching item-side stub when multiple match', () => {
    // Both stubs leading-word-match "Stonemother peaks"; the shorter
    // canonical "Stonemother" wins because item-side stub names are
    // typically the canonical short form.
    seedItems([{
      name: 'Vardlokkur',
      related_settings: [
        { name: 'Stonemother range' },
        { name: 'Stonemother' },
      ],
    }]);
    const stubs = [{ name: 'Stonemother peaks', kind: 'parent' }];
    const out = attachSeededFromMatchingItemStubs(stubs, {
      sourceType: 'item',
      sourceId: 'Vardlokkur',
    });
    expect(out[0].seeded_from.stub_name).toBe('Stonemother');
  });

  it('does not mutate the input array or its members', () => {
    seedItems([{
      name: 'Vardlokkur',
      related_settings: [{ name: 'Stonemother' }],
    }]);
    const stubs = [{ name: 'Stonemother', kind: 'parent' }];
    const out = attachSeededFromMatchingItemStubs(stubs, {
      sourceType: 'item',
      sourceId: 'Vardlokkur',
    });
    expect(stubs[0].seeded_from).toBeUndefined();
    expect(out).not.toBe(stubs);
    expect(out[0]).not.toBe(stubs[0]);
  });

  it('handles an empty stubs array gracefully', () => {
    seedItems([{
      name: 'Vardlokkur',
      related_settings: [{ name: 'Stonemother' }],
    }]);
    const out = attachSeededFromMatchingItemStubs([], {
      sourceType: 'item',
      sourceId: 'Vardlokkur',
    });
    expect(out).toEqual([]);
  });
});

describe('selectExtractionSections — landscape scale', () => {
  it('returns the six landscape-scale fields with correct labels and order', () => {
    const setting = {
      scale: 'landscape',
      setting_overview: {
        overview: 'A great range of dark stone.',
        extent: 'Sixty days\' walk north to south.',
        where_it_sits: 'Between two regions.',
        what_lives_here: 'Bears, ice-wolves, the dwarven clan.',
        travel_and_hazards: 'Bear-Pass opens in summer.',
        hidden_detail: 'A weathered cairn at the south pass.',
        // Polity + place fields that should NOT appear:
        history: 'should not appear',
        what_happens_here: 'should not appear',
        features: 'should not appear',
      },
    };
    const sections = selectExtractionSections(setting);
    expect(sections.map(s => s.label)).toEqual([
      'OVERVIEW',
      'EXTENT',
      'WHERE IT SITS',
      'WHAT LIVES HERE',
      'TRAVEL AND HAZARDS',
      'HIDDEN DETAIL',
    ]);
    expect(sections.find(s => s.label === 'EXTENT').text)
      .toBe('Sixty days\' walk north to south.');
    expect(sections.find(s => s.label === 'WHAT LIVES HERE').text)
      .toBe('Bears, ice-wolves, the dwarven clan.');
  });
});
