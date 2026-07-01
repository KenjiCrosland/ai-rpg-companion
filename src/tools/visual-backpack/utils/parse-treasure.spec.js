import { parseTreasure } from './parse-treasure.mjs';

// A tiny stand-in catalog: only the potions are "known" SRD items.
const catalog = [
  { id: 'mi-potion-of-healing', name: 'Potion of Healing', category: 'Magic Item', weight: 0, magicType: 'Potion', source: 'srd' },
  { id: 'mi-potion-of-greater-healing', name: 'Potion of Greater Healing', category: 'Magic Item', weight: 0, magicType: 'Potion', source: 'srd' },
  { id: 'mi-potion-of-climbing', name: 'Potion of Climbing', category: 'Magic Item', weight: 0, magicType: 'Potion', source: 'srd' },
  { id: 'holy-water-flask', name: 'Holy water (flask)', category: 'Adventuring Gear', weight: 1, source: 'srd' },
];

const HOARD = `28 Copper
374 Silver
74 Gold
4 Platinum
3 bottle(s) of common wine (0.6 gp)
1 set of bagpipes (30 gp)
3 black jasper worth 50 gp each
Potion of Greater Healing
Potion of Healing
Potion of Healing
Potion of Climbing
Potion of Healing`;

describe('parseTreasure — coins', () => {
  it('sorts metal words into the right denominations (incl. platinum)', () => {
    const { coins } = parseTreasure(HOARD, catalog);
    expect(coins).toEqual({ pp: 4, gp: 74, ep: 0, sp: 374, cp: 28 });
  });

  it('accepts denomination abbreviations and "pieces" suffix', () => {
    const { coins } = parseTreasure('12 gp\n5 sp\n100 copper pieces', catalog);
    expect(coins).toEqual({ pp: 0, gp: 12, ep: 0, sp: 5, cp: 100 });
  });
});

describe('parseTreasure — items', () => {
  const byName = (items, name) => items.find((i) => i.name === name);

  it('stacks repeated bare names and matches them to the catalog', () => {
    const { items } = parseTreasure(HOARD, catalog);
    const healing = byName(items, 'Potion of Healing');
    expect(healing.quantity).toBe(3); // three "Potion of Healing" lines
    expect(healing.matched).toBe(true);
    expect(healing.category).toBe('Magic Item');
    expect(byName(items, 'Potion of Climbing').quantity).toBe(1);
    expect(byName(items, 'Potion of Greater Healing').quantity).toBe(1);
  });

  it('makes unmatched valuables into Treasure tiles carrying their gp value', () => {
    const { items } = parseTreasure(HOARD, catalog);
    const jasper = byName(items, 'black jasper');
    expect(jasper).toMatchObject({ quantity: 3, category: 'Treasure', valueGp: 50, matched: false });
    const bagpipes = byName(items, 'set of bagpipes');
    expect(bagpipes).toMatchObject({ quantity: 1, category: 'Treasure', valueGp: 30 });
    // "(s)" plural marker is stripped from the name.
    expect(byName(items, 'bottle of common wine')).toMatchObject({ quantity: 3, valueGp: 0.6 });
  });

  it('converts a non-gp listed price to gp value', () => {
    const { items } = parseTreasure('1 jeweled dagger (50 sp)', catalog);
    expect(items[0]).toMatchObject({ category: 'Treasure', valueGp: 5 }); // 50 sp = 5 gp
  });

  it('an unknown item with no price is a plain custom item, not treasure', () => {
    const { items } = parseTreasure('a mysterious note', catalog);
    expect(items[0]).toMatchObject({ category: 'Adventuring Gear', valueGp: 0, matched: false });
  });

  it('treats "worth X gp" WITHOUT a leading quantity as a valuable (qty 1)', () => {
    const { items } = parseTreasure('ivory large bracelet worth 250gp', catalog);
    expect(items[0]).toMatchObject({ quantity: 1, category: 'Treasure', valueGp: 250, matched: false });
  });

  it('matches a container-prefixed name to its real SRD item (keeps mechanics)', () => {
    // "vial of holy water" → SRD "Holy water (flask)" (has a mechanical effect),
    // so it is a matched Adventuring Gear item, not anonymous treasure.
    const { items } = parseTreasure("4 vial(s) of holy water (200 gp)", catalog);
    expect(items[0]).toMatchObject({
      name: 'Holy water (flask)',
      quantity: 4,
      category: 'Adventuring Gear',
      matched: true,
    });
  });

  it('reports how many parsed items were unmatched', () => {
    const { unmatchedCount } = parseTreasure(HOARD, catalog);
    expect(unmatchedCount).toBe(3); // wine, bagpipes, jasper
  });
});
