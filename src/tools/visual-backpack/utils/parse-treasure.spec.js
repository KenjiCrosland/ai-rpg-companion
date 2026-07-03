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

  it('an unknown item with no price is Misc (not gear, not treasure)', () => {
    const { items } = parseTreasure('a mysterious note', catalog);
    expect(items[0]).toMatchObject({ category: 'Misc', valueGp: 0, matched: false });
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

describe('parseTreasure — DMG hierarchical hoard format', () => {
  const byName = (items, name) => items.find((i) => i.name === name);

  const DMG = `A total of 837 gp worth of coins, art objects, and/or gems, as follows:
447 gp in coinage:
110 gp
3,000 sp
3,700 cp
10 gp gemstones (×4; worth 40 gp total):
Azurite (opaque mottled deep blue)
Moss agate (translucent pink with mossy gray markings), ×2
Turquoise (opaque light blue-green)
25 gp art objects (×4; worth 100 gp total):
Gold locket with a painted portrait inside
Embroidered silk handkerchief, ×2
5 mundane items:
A kneeling bench, which anyone addressing the dragon is required to use
A jar with a dead illithid tadpole floating in preserving chemicals
Magic Items (Table A)
Potion of Healing (Rolled 19) [reroll]
Potion of Invulnerability (Rolled 59) [reroll]
Spell Scroll (5th Level) ( [reroll] Hallow -or- see all 5th-level spells ) (Rolled 72) [reroll]`;

  it('inherits the group-header value onto every item line beneath it', () => {
    const { items } = parseTreasure(DMG, catalog);
    // 10 gp gemstones — each inherits 10 gp; the colour paren is dropped.
    expect(byName(items, 'Azurite')).toMatchObject({ category: 'Treasure', valueGp: 10, quantity: 1 });
    expect(byName(items, 'Moss agate')).toMatchObject({ valueGp: 10, quantity: 2 });
    expect(byName(items, 'Turquoise')).toMatchObject({ valueGp: 10 });
    // 25 gp art objects — different header, different inherited value.
    expect(byName(items, 'Gold locket with a painted portrait inside')).toMatchObject({ valueGp: 25 });
    expect(byName(items, 'Embroidered silk handkerchief')).toMatchObject({ valueGp: 25, quantity: 2 });
  });

  it('parses the coin breakdown and skips the summary/total lines', () => {
    const { coins, items } = parseTreasure(DMG, catalog);
    expect(coins).toEqual({ pp: 0, gp: 110, ep: 0, sp: 3000, cp: 3700 }); // 447 gp value
    // "A total of 837 gp…" and "447 gp in coinage:" produce no items.
    expect(items.some((i) => /total|coinage/i.test(i.name))).toBe(false);
  });

  it('keeps unrecognized flavor items as valueless Misc (not gear)', () => {
    const { items } = parseTreasure(DMG, catalog);
    const bench = byName(items, 'A kneeling bench, which anyone addressing the dragon is required to use');
    expect(bench).toMatchObject({ category: 'Misc', valueGp: 0 });
  });

  it('strips magic-item roll noise, matches known ones, keeps unknown ones as Magic Items', () => {
    const { items } = parseTreasure(DMG, catalog);
    expect(byName(items, 'Potion of Healing')).toMatchObject({ matched: true }); // (Rolled 19) [reroll] stripped
    // Unknown-to-SRD but under a Magic Items header → stays a (GM-priced) Magic Item.
    expect(byName(items, 'Potion of Invulnerability')).toMatchObject({ category: 'Magic Item', valueGp: 0, matched: false });
    // Spell-scroll tool-cruft ("… -or- see all … spells") cleans to a plain name.
    expect(byName(items, 'Spell Scroll (5th Level)')).toMatchObject({ category: 'Magic Item' });
  });

  it('handles the multi-line spell-scroll widget without junk "(" / ")" items', () => {
    const { items } = parseTreasure(
      'Spell Scroll (Cantrip) (\n[reroll]\nMending\n-or-\nsee all Cantrips spells\n) (Rolled 58) [reroll]',
      catalog,
    );
    // The scroll's spell becomes "Spell Scroll (Mending)"; no bracket junk survives.
    expect(byName(items, 'Spell Scroll (Mending)')).toMatchObject({ category: 'Magic Item' });
    expect(items.every((i) => /[a-z0-9]/i.test(i.name))).toBe(true);
  });
});

describe('parseTreasure — rarity-tier magic tables (donjon) + fuzzy matching', () => {
  const byName = (items, name) => items.find((i) => i.name === name);
  // A catalog whose names put the bonus/qualifier in a different order than the dump.
  const cat = [
    { id: 'w2', name: 'Wand of the War Mage, +2', category: 'Magic Item', weight: 1, source: 'srd' },
    { id: 'fig', name: 'Marble Elephant Figurine of Wondrous Power', category: 'Magic Item', weight: 0, source: 'srd' },
    { id: 'arrow', name: 'Arrow of Slaying', category: 'Magic Item', weight: 0, source: 'srd' },
  ];

  const DUMP = `Rare items (×2):
+2 Wand of the War Mage
(Rolled 2)
[reroll]
Figurine of Wondrous Power, Marble Elephant
(Rolled 28)
[reroll]
Very Rare items (×5):
Arrow of Slaying (*)
(
[reroll]
Crossbow Bolt of Slaying
)
(Rolled 16)
[reroll]
Nolzur's Marvelous Pigments
(Rolled 3)
[reroll]
Rare items (×9):
Spell Scroll (4th Level)
(
[reroll]
Death Ward
-or-
see all 4th-level spells
)
(Rolled 35)
[reroll]`;

  it('matches a leading "+N" bonus reordered to the catalog form', () => {
    expect(byName(parseTreasure(DUMP, cat).items, 'Wand of the War Mage, +2')).toMatchObject({ matched: true });
  });

  it('matches a comma-reversed name ("Figurine …, Marble Elephant")', () => {
    expect(byName(parseTreasure(DUMP, cat).items, 'Marble Elephant Figurine of Wondrous Power')).toMatchObject({ matched: true });
  });

  it('skips "( … )" alternative widgets — no Crossbow Bolt / Death Ward leak items', () => {
    const names = parseTreasure(DUMP, cat).items.map((i) => i.name);
    expect(names).toContain('Arrow of Slaying');
    expect(names).not.toContain('Crossbow Bolt of Slaying');
    expect(names).not.toContain('Death Ward');
    expect(names).toContain('Spell Scroll (4th Level)');
  });

  it('treats unknown items under a rarity-tier header as Magic Items, not gear', () => {
    expect(byName(parseTreasure(DUMP, cat).items, "Nolzur's Marvelous Pigments"))
      .toMatchObject({ category: 'Magic Item', matched: false });
  });

  it('matches "+2 Ammunition (20 arrows)" and reads the count as quantity', () => {
    const ammo = [{ id: 'a2', name: 'Ammunition, +2', category: 'Magic Item', weight: 0, source: 'srd' }];
    const item = parseTreasure('+2 Ammunition (20 arrows)', ammo).items[0];
    // Composed transforms: drop "(20 arrows)" → reorder "+2" to the back → matches.
    expect(item).toMatchObject({ name: 'Ammunition, +2', matched: true, quantity: 20 });
  });
});

describe('parseTreasure — flat comma-separated list (donjon one-liner)', () => {
  const byName = (items, name) => items.find((i) => i.name === name);
  const cat = [{ id: 'hz', name: 'Horseshoes of a Zephyr', category: 'Magic Item', weight: 0, source: 'srd' }];
  const LINE =
    '300 cp, 7000 sp, 2500 gp, 50 pp, a bone comb engraved with arcane runes (25 gp), ' +
    'an agate cup set with a rosette of aquamarine (25 gp), Horseshoes of a Zephyr (very rare, dmg 175)';

  it('splits the line into coins + items (respecting commas inside parens)', () => {
    const { coins, items } = parseTreasure(LINE, cat);
    expect(coins).toEqual({ pp: 50, gp: 2500, ep: 0, sp: 7000, cp: 300 });
    expect(byName(items, 'a bone comb engraved with arcane runes')).toMatchObject({ category: 'Treasure', valueGp: 25 });
    expect(byName(items, 'an agate cup set with a rosette of aquamarine')).toMatchObject({ valueGp: 25 });
    // "(very rare, dmg 175)" tag is stripped; the name matches the catalog.
    expect(byName(items, 'Horseshoes of a Zephyr')).toMatchObject({ matched: true });
  });

  it('reads donjon\'s "N x name" multiplier as quantity (not a name starting with x)', () => {
    const { items } = parseTreasure('14000 gp, 2 x agate (1000 gp), diamond (1000 gp)', []);
    expect(byName(items, 'agate')).toMatchObject({ quantity: 2, category: 'Treasure', valueGp: 1000 });
    expect(byName(items, 'diamond')).toMatchObject({ quantity: 1 });
    // A real word beginning with "x" keeps its letter (the multiplier needs a space).
    expect(parseTreasure('2 xorn figurines (50 gp)', []).items[0]).toMatchObject({ name: 'xorn figurines', quantity: 2 });
  });

  it('leaves a lone comma inside a single item name intact', () => {
    // Only 2 segments, none treasure-like → NOT a flat list, so it is not split.
    const { items } = parseTreasure('Carpet of Flying, 4 ft. by 6 ft.', cat);
    expect(items).toHaveLength(1);
  });

  it('tags an unmatched rarity item as a Magic Item, not gear', () => {
    const { items } = parseTreasure('10 gp, 20 sp, Amulet of the Deep (rare, xge 138)', []);
    expect(byName(items, 'Amulet of the Deep')).toMatchObject({ category: 'Magic Item', matched: false });
  });
});

describe('parseTreasure — mixed-format hoard (robustness)', () => {
  const byName = (items, name) => items.find((i) => i.name === name);
  const cat = [
    { id: 'ph', name: 'Potion of Healing', category: 'Magic Item', weight: 0, magicType: 'Potion', source: 'srd' },
    { id: 'sac', name: 'Sacrificial dagger', category: 'Weapon', weight: 1, source: 'srd' },
  ];

  it('strips invisible characters (soft-hyphen/zero-width) so names still match', () => {
    // "Sacrificial" written with soft-hyphens (U+00AD) between letters.
    const dirty = 'Sac­ri­fi­cial dagger';
    const { items } = parseTreasure(dirty, cat);
    expect(items[0]).toMatchObject({ name: 'Sacrificial dagger', matched: true });
    expect(items[0].name).not.toMatch(/­/);
  });

  it('reconciles inline counts under a header count (×2 in a ×3 group = 3 total, not 5)', () => {
    const { items } = parseTreasure('Gemstones (10 gp each, ×3): bloodstone, ×2 tiger eye', []);
    expect(byName(items, 'bloodstone')).toMatchObject({ quantity: 1, category: 'Treasure', valueGp: 10 });
    expect(byName(items, 'tiger eye')).toMatchObject({ quantity: 2, category: 'Treasure', valueGp: 10 });
    const total = items.reduce((s, i) => s + i.quantity, 0);
    expect(total).toBe(3); // 1 + 2 — the header's ×3 is not multiplied in
  });

  it('parses comma-thousands and platinum coins exactly (no split on the thousands comma)', () => {
    const { coins } = parseTreasure('Coins: 88 pp, 1,204 gp, 15 ep, 6,600 sp, 12,000 cp', []);
    expect(coins).toEqual({ pp: 88, gp: 1204, ep: 15, sp: 6600, cp: 12000 });
  });

  it('inherits the header value across all three "each/gems/apiece" phrasings', () => {
    const each = parseTreasure('Gemstones (10 gp each, ×2): agate, onyx', []).items;
    expect(each.every((i) => i.valueGp === 10 && i.category === 'Treasure')).toBe(true);

    const leads = parseTreasure('500 gp gems (2): black opal; fire opal', []).items;
    expect(leads.every((i) => i.valueGp === 500)).toBe(true);

    const apiece = parseTreasure('art objects worth 250 gp apiece (×2)\n- a silver ewer\n- a gold ring', []).items;
    expect(apiece.every((i) => i.valueGp === 250 && i.category === 'Treasure')).toBe(true);
  });
});

describe('parseTreasure — structured JSON export', () => {
  const byName = (items, name) => items.find((i) => i.name === name);
  const JSON_DUMP = JSON.stringify({
    currency: { cp: 3700, sp: 3000, gp: 110 },
    entityInfos: [
      { entity: { name: 'Azurite', value: 1000, _typeListText: ['treasure (gemstone)'], rarity: 'none', __prop: 'item' }, options: { quantity: 1 } },
      { entity: { name: 'Moss Agate', value: 1000, _typeListText: ['treasure (gemstone)'], rarity: 'none', __prop: 'item' }, options: { quantity: 2 } },
      { entity: { name: 'Potion of Healing', _typeListText: ['potion'], rarity: 'common', __prop: 'item' } },
      { entity: { name: 'Potion of Invulnerability', rarity: 'rare', __prop: 'item' } },
      { entity: { name: 'Mending', __prop: 'spell' } },
      { entity: { name: 'A kneeling bench for addressing the dragon', rarity: 'unknown' } },
    ],
  });

  it('reads coins, copper values, quantities, and item kinds straight from JSON', () => {
    const { coins, items } = parseTreasure(JSON_DUMP, catalog);
    expect(coins).toEqual({ pp: 0, gp: 110, ep: 0, sp: 3000, cp: 3700 });
    expect(byName(items, 'Azurite')).toMatchObject({ category: 'Treasure', valueGp: 10, quantity: 1 });
    expect(byName(items, 'Moss Agate')).toMatchObject({ valueGp: 10, quantity: 2 });
    expect(byName(items, 'Potion of Healing')).toMatchObject({ matched: true });
    expect(byName(items, 'Potion of Invulnerability')).toMatchObject({ category: 'Magic Item', matched: false });
    expect(byName(items, 'Spell Scroll (Mending)')).toMatchObject({ category: 'Magic Item' }); // spell → scroll
    expect(byName(items, 'A kneeling bench for addressing the dragon')).toMatchObject({ category: 'Misc', valueGp: 0 });
  });
});
