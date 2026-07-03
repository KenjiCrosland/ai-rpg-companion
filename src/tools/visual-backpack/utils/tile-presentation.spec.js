import {
  itemType,
  itemTypes,
  typeColor,
  tileSize,
  cleanName,
  equipSlot,
  equipTargets,
  isTwoHanded,
  TYPE_COLORS,
} from './tile-presentation.mjs';

const item = (name, category, weight) => ({ name, category, weight });

describe('tileSize — size encodes weight (5 buckets)', () => {
  it('grows in footprint tiers (≤1 / ≤5 tall / ≤15 / ≤40 tall / 40+)', () => {
    expect(tileSize(item('Piton', 'Adventuring Gear', 0.25))).toEqual({ w: 1, h: 1 });
    expect(tileSize(item('Dagger', 'Weapon', 1))).toEqual({ w: 1, h: 1 });
    expect(tileSize(item('Hammer', 'Tools', 3))).toEqual({ w: 1, h: 2 });
    expect(tileSize(item('Crowbar', 'Adventuring Gear', 5))).toEqual({ w: 1, h: 2 });
    expect(tileSize(item('Rope, hempen', 'Adventuring Gear', 10))).toEqual({ w: 2, h: 2 });
    expect(tileSize(item('Leather Armor', 'Armor', 10))).toEqual({ w: 2, h: 2 });
    expect(tileSize(item('Chain Shirt', 'Armor', 20))).toEqual({ w: 2, h: 3 });
    expect(tileSize(item('Chain Mail', 'Armor', 55))).toEqual({ w: 3, h: 3 });
  });

  it('never shrinks in footprint as weight grows', () => {
    let prev = 0;
    for (const w of [0, 1, 5, 15, 40, 80]) {
      const s = tileSize(item('x', 'Tools', w));
      const a = s.w * s.h;
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

  it('classifies unrecognized flavor loot as Misc, not gear', () => {
    expect(itemType({ category: 'Misc', name: 'A scroll with a long epic poem praising the dragon' })).toBe('misc');
    expect(itemType({ category: 'Misc', name: 'A kneeling bench for addressing the dragon' })).toBe('misc');
    // A Misc item named like a consumable still reads as one (name wins).
    expect(itemType({ category: 'Misc', name: 'Oil of dubious provenance' })).toBe('consumable');
  });

  it('defaults safely', () => {
    expect(itemType(null)).toBe('gear');
  });
});

describe('equipSlot', () => {
  const mi = (name, magicType) => ({ name, category: 'Magic Item', magicType });

  it('slots base gear by category', () => {
    expect(equipSlot({ name: 'Longsword', category: 'Weapon' })).toBe('mainHand');
    expect(equipSlot({ name: 'Chain Mail', category: 'Armor' })).toBe('body');
    expect(equipSlot({ name: 'Shield', category: 'Armor' })).toBe('offHand');
  });

  it('slots magic items by subtype + name', () => {
    expect(equipSlot(mi('Ring of Protection', 'Ring'))).toBe('ring');
    expect(equipSlot(mi('Cloak of Protection', 'Wondrous Items'))).toBe('cloak');
    expect(equipSlot(mi('Boots of Speed', 'Wondrous Items'))).toBe('feet');
    expect(equipSlot(mi('Amulet of Health', 'Wondrous Items'))).toBe('neck');
    expect(equipSlot(mi('Gauntlets of Ogre Power', 'Wondrous Items'))).toBe('hands');
    expect(equipSlot(mi('Flame Tongue', 'Weapon'))).toBe('mainHand');
    expect(equipSlot(mi('Staff of Power', 'Staff'))).toBe('mainHand');
    expect(equipSlot(mi('Adamantine Armor', 'Armor'))).toBe('body');
  });

  it('slots the wearable wondrous items the name rules used to miss', () => {
    expect(equipSlot(mi('Wings of Flying', 'Wondrous Items'))).toBe('cloak'); // worn as a cloak
    expect(equipSlot(mi('Eyes of the Eagle', 'Wondrous Items'))).toBe('head'); // lenses over the eyes
    expect(equipSlot(mi('Eyes of Charming', 'Wondrous Items'))).toBe('head');
    // "Robe of Eyes" stays a cloak — the cloak rule is checked before the eyes rule.
    expect(equipSlot(mi('Robe of Eyes', 'Wondrous Items'))).toBe('cloak');
  });

  it('returns null for non-equippable items', () => {
    expect(equipSlot(mi('Potion of Healing', 'Potion'))).toBe(null);
    expect(equipSlot(mi('Bag of Holding', 'Wondrous Items'))).toBe(null);
    expect(equipSlot({ name: 'Torch', category: 'Adventuring Gear' })).toBe(null);
    expect(equipSlot(null)).toBe(null);
  });
});

describe('weapon handedness (equipTargets)', () => {
  const weapon = (name, twoHanded) => ({ name, category: 'Weapon', twoHanded });

  it('lets a one-handed weapon go in either hand (dual-wield)', () => {
    expect(equipTargets(weapon('Dagger', false))).toEqual(['mainHand', 'offHand']);
    expect(isTwoHanded(weapon('Dagger', false))).toBe(false);
  });

  it('anchors a two-handed weapon in the main hand only', () => {
    // It blocks the off hand at equip time, but its only target slot is mainHand.
    expect(equipTargets(weapon('Greatsword', true))).toEqual(['mainHand']);
    expect(isTwoHanded(weapon('Greatsword', true))).toBe(true);
  });

  it('treats magic weapons as one-handed (grip unknown from SRD)', () => {
    const mw = { name: 'Flame Tongue', category: 'Magic Item', magicType: 'Weapon' };
    expect(equipTargets(mw)).toEqual(['mainHand', 'offHand']);
    expect(isTwoHanded(mw)).toBe(false);
  });

  it('leaves non-weapons with their single slot', () => {
    expect(equipTargets({ name: 'Shield', category: 'Armor' })).toEqual(['offHand']);
    expect(equipTargets({ name: 'Chain Mail', category: 'Armor' })).toEqual(['body']);
    expect(
      equipTargets({ name: 'Ring of Protection', category: 'Magic Item', magicType: 'Ring' }),
    ).toEqual(['ring1', 'ring2']);
    expect(equipTargets({ name: 'Torch', category: 'Adventuring Gear' })).toEqual([]);
  });
});

describe('itemTypes — primary color type + filtering overlaps', () => {
  const mi = (name, magicType) => ({ name, category: 'Magic Item', magicType });

  it('keeps magic items plum (primary) but also matches their real kind for filters', () => {
    expect(itemTypes(mi('Flame Tongue', 'Weapon'))).toEqual(['magic', 'weapon']);
    expect(itemTypes(mi('Dragon Scale Mail', 'Armor'))).toEqual(['magic', 'armor']);
    expect(itemTypes(mi('Ammunition, +1', 'Ammunition'))).toEqual(['magic', 'consumable']);
    expect(itemTypes(mi('Potion of Healing', 'Potion'))).toEqual(['magic', 'consumable']);
    // color (primary) is unchanged:
    expect(itemType(mi('Flame Tongue', 'Weapon'))).toBe('magic');
  });

  it('non-overlapping items have a single type', () => {
    expect(itemTypes({ name: 'Longsword', category: 'Weapon' })).toEqual(['weapon']);
    expect(itemTypes({ name: 'Torch', category: 'Adventuring Gear' })).toEqual(['consumable']);
    expect(itemTypes(mi('Bag of Holding', 'Wondrous Items'))).toEqual(['magic']);
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
