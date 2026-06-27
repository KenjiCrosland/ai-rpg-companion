import { buildItemGenerateParams } from './build-generate-params.mjs';

/**
 * Data-integrity tests for the content-free `generate` params. This is the one
 * piece worth automating (per the analytics brief): a pure function over form
 * state. We assert the PII-safety contract — every field logged as a
 * used/unused boolean, never contents and never the chosen closed-vocab value —
 * not event-payload shape (that's DebugView's job).
 */
describe('buildItemGenerateParams', () => {
  it('logs free-text fields as used/unused booleans, never their contents', () => {
    const filled = buildItemGenerateParams({
      itemName: 'Goblet of the Firmament',
      itemLore: 'Forged by a drowned cult.',
    });
    expect(filled.used_name).toBe(true);
    expect(filled.used_lore).toBe(true);
    expect(JSON.stringify(filled)).not.toContain('Goblet');
    expect(JSON.stringify(filled)).not.toContain('drowned');
  });

  it('treats empty and whitespace-only fields as unused', () => {
    expect(buildItemGenerateParams({ itemName: '' }).used_name).toBe(false);
    expect(buildItemGenerateParams({ itemName: '   ' }).used_name).toBe(false);
    expect(buildItemGenerateParams({ itemLore: '\n\t ' }).used_lore).toBe(false);
  });

  it('logs closed-vocab fields as used/unused booleans, never their values', () => {
    const params = buildItemGenerateParams({
      rarity: 'Legendary',
      itemType: 'Rod',
      itemOrigin: 'Aberrant',
    });
    expect(params.used_rarity).toBe(true);
    expect(params.used_item_type).toBe(true);
    expect(params.used_origin).toBe(true);
    // The chosen values are noise and must never appear in the payload.
    const json = JSON.stringify(params);
    expect(json).not.toContain('Legendary');
    expect(json).not.toContain('Rod');
    expect(json).not.toContain('Aberrant');
  });

  it('marks unset closed-vocab fields (placeholder/empty) as used: false', () => {
    const params = buildItemGenerateParams({
      itemName: 'Anything',
      rarity: '',
      itemType: '',
      itemOrigin: '',
    });
    expect(params.used_rarity).toBe(false);
    expect(params.used_item_type).toBe(false);
    expect(params.used_origin).toBe(false);
  });

  it('always tags the tool and defaults every field to false for empty/missing state', () => {
    const empty = buildItemGenerateParams({});
    expect(empty).toEqual({
      tool: 'item-generator',
      used_name: false,
      used_lore: false,
      used_rarity: false,
      used_item_type: false,
      used_origin: false,
    });
    expect(buildItemGenerateParams().tool).toBe('item-generator');
  });
});
