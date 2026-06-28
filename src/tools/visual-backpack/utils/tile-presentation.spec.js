import { itemType, typeColor, tileSize, cleanName, TYPE_COLORS } from './tile-presentation.mjs';

const item = (name, category, weight) => ({ name, category, weight });

describe('tileSize — square tile, size encodes weight (5 tiers)', () => {
  it('grows in square tiers (0–3 / 3–5 / 5–10 / 10–20 / 20+)', () => {
    expect(tileSize(item('Dagger', 'Weapon', 1))).toEqual({ w: 1, h: 1 });
    expect(tileSize(item('Longsword', 'Weapon', 3))).toEqual({ w: 1, h: 1 });
    expect(tileSize(item('Mace', 'Weapon', 4))).toEqual({ w: 2, h: 2 });
    expect(tileSize(item('Shield', 'Armor', 6))).toEqual({ w: 3, h: 3 });
    expect(tileSize(item('Crossbow, heavy', 'Weapon', 18))).toEqual({ w: 4, h: 4 });
    expect(tileSize(item('Chain Mail', 'Armor', 55))).toEqual({ w: 5, h: 5 });
  });

  it('is always square and never shrinks with more weight', () => {
    const area = (w) => { const s = tileSize(item('x', 'Tools', w)); return [s.w === s.h, s.w * s.h]; };
    let prev = 0;
    for (const w of [0, 3, 4, 6, 11, 25]) {
      const [square, a] = area(w);
      expect(square).toBe(true);
      expect(a).toBeGreaterThanOrEqual(prev);
      prev = a;
    }
  });

  it('treats bad input as the smallest tile', () => {
    expect(tileSize(null)).toEqual({ w: 1, h: 1 });
  });
});

describe('itemType — color encodes type', () => {
  it('maps the SRD categories', () => {
    expect(itemType({ category: 'Weapon', name: 'Longsword' })).toBe('weapon');
    expect(itemType({ category: 'Armor', name: 'Chain Mail' })).toBe('armor');
    expect(itemType({ category: 'Tools', name: "Thieves' Tools" })).toBe('tools');
  });

  it('splits consumables out of Adventuring Gear', () => {
    expect(itemType({ category: 'Adventuring Gear', name: 'Rations (1 day)' })).toBe('consumable');
    expect(itemType({ category: 'Adventuring Gear', name: 'Torch' })).toBe('consumable');
    expect(itemType({ category: 'Adventuring Gear', name: 'Oil (flask)' })).toBe('consumable');
    expect(itemType({ category: 'Adventuring Gear', name: 'Arrow' })).toBe('consumable');
    expect(itemType({ category: 'Adventuring Gear', name: 'Potion of Healing' })).toBe('consumable');
  });

  it('treats other Adventuring Gear as gear', () => {
    expect(itemType({ category: 'Adventuring Gear', name: 'Backpack' })).toBe('gear');
    expect(itemType({ category: 'Adventuring Gear', name: 'Rope, hempen (50 feet)' })).toBe('gear');
  });

  it('defaults safely', () => {
    expect(itemType(null)).toBe('gear');
  });
});

describe('typeColor', () => {
  it('returns a distinct fill per type', () => {
    const fills = Object.values(TYPE_COLORS).map((t) => t.bg);
    expect(new Set(fills).size).toBe(fills.length);
  });

  it('resolves an item to its type color', () => {
    expect(typeColor({ category: 'Weapon', name: 'Mace' })).toBe(TYPE_COLORS.weapon);
    expect(typeColor({ category: 'Adventuring Gear', name: 'Torch' })).toBe(TYPE_COLORS.consumable);
  });
});
