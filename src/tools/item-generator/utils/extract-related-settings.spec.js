/**
 * Tests for extract-related-settings.mjs — focused on the merge
 * algorithm. The orchestrator's API call is mocked at the module level.
 */

import { mergeStubs } from './extract-related-settings.mjs';

describe('mergeStubs (related_settings)', () => {
  it('returns an empty array when both inputs are empty', () => {
    expect(mergeStubs([], [])).toEqual([]);
    expect(mergeStubs(undefined, undefined)).toEqual([]);
  });

  it('keeps promoted stubs (setting_id present) untouched across rescans', () => {
    const existing = [
      { name: 'Vorn-Hall', setting_id: 'set_promoted', role_brief: 'Forge', context: '', source_quote: '' },
    ];
    const fresh = [];
    const result = mergeStubs(existing, fresh);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Vorn-Hall');
    expect(result[0].setting_id).toBe('set_promoted');
  });

  it('drops unpromoted existing stubs when a fresh scan runs (variant names evaporate)', () => {
    const existing = [
      { name: 'Glade', role_brief: '', context: '', source_quote: '', setting_id: null },
    ];
    const fresh = [
      { name: 'The Whispering Glade', role_brief: 'Forge of the Heart', context: '', source_quote: '' },
    ];
    const result = mergeStubs(existing, fresh);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('The Whispering Glade');
    expect(result[0].setting_id).toBeNull();
  });

  it('drops a fresh stub if its name matches a promoted stub (case-insensitive)', () => {
    const existing = [
      { name: 'Vorn-Hall', setting_id: 'set_promoted', role_brief: '', context: '', source_quote: '' },
    ];
    const fresh = [
      { name: 'vorn-hall', role_brief: 'New scan blurb', context: '', source_quote: '' },
      { name: 'Tower of Vorn', role_brief: '', context: '', source_quote: '' },
    ];
    const result = mergeStubs(existing, fresh);
    expect(result).toHaveLength(2);
    expect(result.map(s => s.name)).toEqual(['Vorn-Hall', 'Tower of Vorn']);
    expect(result[0].setting_id).toBe('set_promoted');
  });

  it('dedupes fresh stubs by case-insensitive name', () => {
    const fresh = [
      { name: 'Glade', role_brief: '', context: '', source_quote: '' },
      { name: 'GLADE', role_brief: 'duplicate variant', context: '', source_quote: '' },
    ];
    const result = mergeStubs([], fresh);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Glade');
  });

  it('skips fresh stubs with empty names', () => {
    const fresh = [
      { name: '   ', role_brief: '', context: '', source_quote: '' },
      { name: 'Real Place', role_brief: '', context: '', source_quote: '' },
    ];
    const result = mergeStubs([], fresh);
    expect(result.map(s => s.name)).toEqual(['Real Place']);
  });

  it('does not mutate the input arrays', () => {
    const existing = [{ name: 'Vorn-Hall', setting_id: 'set_x', role_brief: '', context: '', source_quote: '' }];
    const fresh = [{ name: 'Glade', role_brief: '', context: '', source_quote: '' }];
    const existingSnap = JSON.parse(JSON.stringify(existing));
    const freshSnap = JSON.parse(JSON.stringify(fresh));
    mergeStubs(existing, fresh);
    expect(existing).toEqual(existingSnap);
    expect(fresh).toEqual(freshSnap);
  });

  it('initializes setting_id to null on every freshly merged unpromoted stub', () => {
    const fresh = [
      { name: 'Glade', role_brief: '', context: '', source_quote: '' },
    ];
    const result = mergeStubs([], fresh);
    expect(result[0]).toHaveProperty('setting_id', null);
  });
});
