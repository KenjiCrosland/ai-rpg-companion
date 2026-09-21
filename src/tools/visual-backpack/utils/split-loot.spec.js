import { splitLoot, rebalanceCoins, computeShareItemValue, RARITY_VALUE_GP } from './split-loot.mjs';
import { coinsToCp, coinValueGp } from './carry-capacity.mjs';

// A deterministic rng so the deal is reproducible in tests.
const seededRng = (seed) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

const item = (id, name, quantity, valueGp = 0, category = 'Treasure') => ({
  id, name, quantity, valueGp, category, weight: 0, matched: false, source: 'custom',
});

describe('splitLoot — coins divide by value', () => {
  it('splits coin VALUE evenly across shares, minted per pile', () => {
    const { piles } = splitLoot({ gp: 9, ep: 0, sp: 0, cp: 0 }, [], 3, seededRng(1));
    // 9 gp = 900 cp ÷ 3 = 300 cp = 3 gp each.
    expect(piles).toHaveLength(3);
    expect(piles.every((p) => coinsToCp(p.coins) === 300)).toBe(true);
  });

  it('surfaces the remainder honestly instead of forcing divisibility', () => {
    const { piles, leftover } = splitLoot({ gp: 0, ep: 0, sp: 0, cp: 100 }, [], 3, seededRng(1));
    // 100 cp ÷ 3 = 33 cp each, 1 cp left over.
    expect(piles.every((p) => coinsToCp(p.coins) === 33)).toBe(true);
    expect(coinsToCp(leftover.coins)).toBe(1);
  });

  it('conserves total value: sum of piles + leftover == the haul', () => {
    const coins = { pp: 4, gp: 74, ep: 3, sp: 374, cp: 28 };
    const { piles, leftover } = splitLoot(coins, [], 5, seededRng(7));
    const dealt = piles.reduce((s, p) => s + coinsToCp(p.coins), 0) + coinsToCp(leftover.coins);
    expect(dealt).toBe(coinsToCp(coins));
  });
});

describe('splitLoot — items dealt like cards', () => {
  const items = [
    item('trs-jasper', 'jasper', 3, 50),
    item('mag-potion', 'Potion of Healing', 3, 0, 'Magic Item'),
    item('mag-ring', 'Ring of Protection', 1, 0, 'Magic Item'),
  ];

  it('deals every unit with balanced counts (no loss, no duplication)', () => {
    const { piles } = splitLoot({}, items, 3, seededRng(3));
    const total = piles.reduce((s, p) => s + p.items.reduce((a, i) => a + i.quantity, 0), 0);
    expect(total).toBe(7); // 3 jasper + 3 potions + 1 ring
    // 7 units over 3 piles → counts differ by at most 1 (round-robin deal).
    const counts = piles.map((p) => p.items.reduce((a, i) => a + i.quantity, 0)).sort();
    expect(counts[2] - counts[0]).toBeLessThanOrEqual(1);
  });

  it('re-groups units of the same item within a pile', () => {
    // Force everything into one pile by asking for a single share.
    const { piles } = splitLoot({}, items, 1, seededRng(1));
    const jasper = piles[0].items.find((i) => i.id === 'trs-jasper');
    expect(jasper.quantity).toBe(3);
  });

  it('a fresh shuffle re-deals differently but still conserves the units', () => {
    const a = splitLoot({}, items, 3, seededRng(1));
    const b = splitLoot({}, items, 3, seededRng(999));
    const unitsOf = (r) => r.piles.flatMap((p) => p.items.map((i) => `${i.id}:${i.quantity}@${p.items.indexOf(i)}`));
    // Different arrangement (very likely with different seeds)…
    expect(JSON.stringify(a.piles)).not.toBe(JSON.stringify(b.piles));
    // …but the same total unit count either way.
    const count = (r) => r.piles.reduce((s, p) => s + p.items.reduce((x, i) => x + i.quantity, 0), 0);
    expect(count(a)).toBe(count(b));
    void unitsOf;
  });
});

describe('splitLoot — coin rebalancing by item value (opt-in)', () => {
  const magic = (id, name, rarity) => ({ id, name, quantity: 1, category: 'Magic Item', rarity, valueGp: 0, matched: true, source: 'srd' });
  // True worth of a pile for balance purposes = its coins + its estimated item value.
  const trueValue = (pile) => coinValueGp(pile.coins) + computeShareItemValue(pile);

  it('trends toward equal TOTAL value when items have known rarity and coins suffice', () => {
    // 3 Uncommon (300 gp) deal 1-per-pile; 3000 gp of coins covers the gap.
    const items = [magic('a', 'Boots', 'Uncommon'), magic('b', 'Cloak', 'Uncommon'), magic('c', 'Rod', 'Uncommon')];
    const { piles } = splitLoot({ gp: 3000 }, items, 3, seededRng(1), { rebalance: true });
    const totals = piles.map(trueValue);
    expect(Math.max(...totals) - Math.min(...totals)).toBeLessThan(1); // ~1300 gp each
  });

  it('degrades gracefully with unrated items — they contribute 0, nothing crashes', () => {
    const items = [
      magic('r', 'Flametongue', 'Rare'),
      { id: 'u', name: 'Homebrew Blade', quantity: 1, category: 'Magic Item', valueGp: 0, matched: false }, // no rarity
      item('g', 'gem', 2, 50),
    ];
    const { piles } = splitLoot({ gp: 500 }, items, 3, seededRng(4), { rebalance: true });
    expect(piles).toHaveLength(3);
    // The unrated blade adds nothing to its pile's balance estimate.
    const bladePile = piles.find((p) => p.items.some((i) => i.id === 'u'));
    const others = bladePile.items.filter((i) => i.id !== 'u');
    expect(computeShareItemValue(bladePile)).toBe(computeShareItemValue({ items: others }));
    expect(piles.every((p) => coinsToCp(p.coins) >= 0)).toBe(true);
  });

  it('deals a dominant item ALONE — a Legendary share gets nothing else', () => {
    // Luck Blade (150k) dwarfs everything; no other share can catch it, so it sits solo.
    const items = [magic('L', 'Luck Blade', 'Legendary'), item('g', 'gem', 6, 50)];
    const { piles } = splitLoot({ gp: 100 }, items, 5, seededRng(1), { rebalance: true });
    const legendaryPile = piles.find((p) => p.items.some((i) => i.rarity === 'Legendary'));
    expect(legendaryPile.items).toHaveLength(1);
    expect(legendaryPile.items[0].name).toBe('Luck Blade');
  });

  it('a consumable does not hog a share — its own tier table keeps it modest', () => {
    // A Very Rare potion ≈ 2,750 gp (the consumable table = a Rare permanent), so
    // the greedy deal groups it WITH other items instead of giving it its own share.
    const items = [
      { id: 'p', name: 'Potion of Storm Giant Strength', category: 'Magic Item', magicType: 'Potion', rarity: 'Very Rare', quantity: 1, valueGp: 0 },
      item('g1', 'ruby', 1, 1000),
      item('g2', 'opal', 1, 1000),
      item('g3', 'jade', 1, 1000),
      item('g4', 'pearl', 1, 1000),
    ];
    const { piles } = splitLoot({}, items, 2, seededRng(1), { rebalance: true });
    const potionPile = piles.find((p) => p.items.some((i) => i.id === 'p'));
    expect(potionPile.items.length).toBeGreaterThan(1); // not alone
  });

  it('never drives a pile negative — a Legendary worth more than the whole pool → 0 coins', () => {
    const items = [magic('L', 'Vorpal Sword', 'Legendary'), magic('c1', 'Trinket', 'Common'), magic('c2', 'Charm', 'Common')];
    const { piles } = splitLoot({ gp: 100 }, items, 3, seededRng(2), { rebalance: true });
    expect(piles.every((p) => coinsToCp(p.coins) >= 0)).toBe(true);
    const legendaryPile = piles.find((p) => p.items.some((i) => i.rarity === 'Legendary'));
    expect(coinsToCp(legendaryPile.coins)).toBe(0); // it holds the value; it gets no coins
  });

  it('conserves the coin pool exactly (piles + leftover == input)', () => {
    const items = [magic('a', 'A', 'Rare'), magic('b', 'B', 'Uncommon'), item('g', 'gem', 3, 40)];
    const coins = { pp: 2, gp: 517, sp: 33, cp: 90 };
    const { piles, leftover } = splitLoot(coins, items, 4, seededRng(9), { rebalance: true });
    const dealt = piles.reduce((s, p) => s + coinsToCp(p.coins), 0) + coinsToCp(leftover.coins);
    expect(dealt).toBe(coinsToCp(coins));
  });

  it('rebalance:false is identical to the plain even split', () => {
    const items = [magic('a', 'A', 'Legendary'), item('g', 'gem', 2, 50), magic('b', 'B', 'Common')];
    const coins = { gp: 90 };
    const off = splitLoot(coins, items, 3, seededRng(5), { rebalance: false });
    const plain = splitLoot(coins, items, 3, seededRng(5));
    expect(JSON.stringify(off)).toBe(JSON.stringify(plain));
    expect(off.piles.every((p) => coinsToCp(p.coins) === 3000)).toBe(true); // 90 gp / 3 = 30 gp each
  });

  it('rebalanceCoins re-shifts coins after a move and conserves the pool', () => {
    const items = [magic('L', 'Luck Blade', 'Legendary'), item('g', 'gem', 2, 1000)];
    const coins = { gp: 60000 };
    const { piles } = splitLoot(coins, items, 2, seededRng(1), { rebalance: true });
    // Simulate the user dragging every item into pile 0.
    piles[1].items.forEach((i) => piles[0].items.push(i));
    piles[1].items = [];
    const leftover = rebalanceCoins(piles, coins);
    // Pool conserved, and the loaded pile now gets fewer coins than the empty one.
    const dealt = piles.reduce((s, p) => s + coinsToCp(p.coins), 0) + coinsToCp(leftover.coins);
    expect(dealt).toBe(coinsToCp(coins));
    expect(coinsToCp(piles[0].coins)).toBeLessThan(coinsToCp(piles[1].coins));
  });

  it('the rarity table exists for every DMG tier', () => {
    ['Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact'].forEach((r) =>
      expect(RARITY_VALUE_GP[r]).toBeGreaterThan(0),
    );
  });
});

describe('splitLoot — running value per pile', () => {
  it('a pile value = its coin value + its items’ gp value', () => {
    const { piles } = splitLoot({ gp: 30 }, [item('trs-gem', 'gem', 1, 50)], 1, seededRng(1));
    // one share: all 30 gp + the 50 gp gem = 80 gp
    expect(piles[0].valueGp).toBe(80);
    expect(piles[0].valueGp).toBe(coinValueGp(piles[0].coins) + 50);
  });
});
