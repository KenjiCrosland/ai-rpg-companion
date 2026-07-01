import {
  carryCapacity,
  encumberedThreshold,
  heavilyEncumberedThreshold,
  totalWeight,
  totalCoins,
  coinWeight,
  coinValueGp,
  coinsToCp,
  costToCp,
  formatCost,
  canAfford,
  spendCoins,
  encumbranceStatus,
} from './carry-capacity.mjs';

const items = (...weights) => weights.map((w, i) => ({ name: `i${i}`, weight: w }));

describe('carrying-capacity thresholds', () => {
  it.each([
    [1, 15, 5, 10],
    [8, 120, 40, 80],
    [10, 150, 50, 100],
    [15, 225, 75, 150],
    [20, 300, 100, 200],
    [30, 450, 150, 300],
  ])('Str %i → cap %i, encumbered %i, heavy %i', (str, cap, enc, heavy) => {
    expect(carryCapacity(str)).toBe(cap);
    expect(encumberedThreshold(str)).toBe(enc);
    expect(heavilyEncumberedThreshold(str)).toBe(heavy);
  });
});

describe('totalWeight', () => {
  it('sums item weights', () => {
    expect(totalWeight(items(3, 6, 1.5, 0.5))).toBe(11);
  });

  it('ignores missing / non-numeric weights and bad input', () => {
    expect(totalWeight([{ name: 'a' }, { weight: '5' }, { weight: 2 }])).toBe(7);
    expect(totalWeight(null)).toBe(0);
    expect(totalWeight([])).toBe(0);
  });

  it('trims floating-point dust', () => {
    expect(totalWeight(items(0.1, 0.2))).toBe(0.3);
  });
});

describe('encumbranceStatus tiers (Str 10 → 50 / 100 / 150)', () => {
  it('ok at or below Str×5', () => {
    const s = encumbranceStatus(10, items(50));
    expect(s.tier).toBe('ok');
    expect(s.consequences).toBe('');
  });

  it('encumbered just past Str×5', () => {
    expect(encumbranceStatus(10, items(51)).tier).toBe('encumbered');
    expect(encumbranceStatus(10, items(100)).tier).toBe('encumbered');
  });

  it('heavily encumbered just past Str×10', () => {
    expect(encumbranceStatus(10, items(101)).tier).toBe('heavily');
    expect(encumbranceStatus(10, items(150)).tier).toBe('heavily');
  });

  it('over capacity past Str×15', () => {
    const s = encumbranceStatus(10, items(151));
    expect(s.tier).toBe('over');
    expect(s.consequences).toMatch(/cannot carry/i);
  });

  it('reports total, capacity, and ratio', () => {
    const s = encumbranceStatus(10, items(75));
    expect(s.total).toBe(75);
    expect(s.capacity).toBe(150);
    expect(s.ratio).toBeCloseTo(0.5);
  });
});

describe('coins', () => {
  const purse = { gp: 100, ep: 10, sp: 50, cp: 200 };

  it('counts coins across denominations', () => {
    expect(totalCoins(purse)).toBe(360);
    expect(totalCoins(null)).toBe(0);
  });

  it('weighs 50 coins per pound', () => {
    expect(coinWeight(purse)).toBe(7.2); // 360 / 50
    expect(coinWeight({ gp: 50, ep: 0, sp: 0, cp: 0 })).toBe(1);
    expect(coinWeight({})).toBe(0);
  });

  it('values coins in gold (1 gp = 2 ep = 10 sp = 100 cp)', () => {
    expect(coinValueGp({ gp: 1, ep: 0, sp: 0, cp: 0 })).toBe(1);
    expect(coinValueGp({ gp: 0, ep: 1, sp: 0, cp: 0 })).toBe(0.5);
    expect(coinValueGp({ gp: 0, ep: 0, sp: 10, cp: 0 })).toBe(1);
    expect(coinValueGp({ gp: 0, ep: 0, sp: 0, cp: 100 })).toBe(1);
    expect(coinValueGp(purse)).toBe(112); // 100 + 5 + 5 + 2
  });
});

describe('prices & buying', () => {
  const gp = (n) => ({ gp: n, ep: 0, sp: 0, cp: 0 });

  it('converts a purse and a price to copper (the exact base unit)', () => {
    expect(coinsToCp({ gp: 1, ep: 1, sp: 1, cp: 1 })).toBe(161); // 100+50+10+1
    expect(costToCp({ quantity: 15, unit: 'gp' })).toBe(1500);
    expect(costToCp({ quantity: 5, unit: 'sp' })).toBe(50);
    expect(costToCp(undefined)).toBe(0); // priceless → never buyable
  });

  it('is quantity-aware: a bundle costs unit price × quantity', () => {
    // 20 arrows at 1 gp per bundle-of-20... here unit price × 20 quantity.
    expect(costToCp({ quantity: 1, unit: 'gp' }, 20)).toBe(2000);
    expect(canAfford(gp(20), { quantity: 1, unit: 'gp' }, 20)).toBe(true);
    expect(canAfford(gp(19), { quantity: 1, unit: 'gp' }, 20)).toBe(false);
  });

  it('labels a price in its native denomination', () => {
    expect(formatCost({ quantity: 15, unit: 'gp' })).toBe('15 gp');
    expect(formatCost({ quantity: 5, unit: 'sp' })).toBe('5 sp');
    expect(formatCost(null)).toBe('');
  });

  it('affords only when the purse value covers the price', () => {
    expect(canAfford(gp(15), { quantity: 15, unit: 'gp' })).toBe(true);
    expect(canAfford(gp(14), { quantity: 15, unit: 'gp' })).toBe(false);
    // mixed coin makes change: 14 gp + 100 sp (=10 gp) = 24 gp ≥ 15 gp
    expect(canAfford({ gp: 14, ep: 0, sp: 100, cp: 0 }, { quantity: 15, unit: 'gp' })).toBe(true);
    expect(canAfford(gp(100), undefined)).toBe(false); // priceless isn't buyable
  });

  it('spends coin so the purse loses EXACTLY the price value (making change)', () => {
    // Buy a 15 gp item with a 20 gp purse → 5 gp of value remains.
    const after = spendCoins(gp(20), { quantity: 15, unit: 'gp' });
    expect(coinValueGp(after)).toBe(5);
    // Pay a 15 gp item entirely in silver: 200 sp (=20 gp) → 5 gp of value left.
    const afterSp = spendCoins({ gp: 0, ep: 0, sp: 200, cp: 0 }, { quantity: 15, unit: 'gp' });
    expect(coinValueGp(afterSp)).toBe(5);
    // Bundle: 20 × 1 gp from 25 gp → 5 gp left.
    const afterBundle = spendCoins(gp(25), { quantity: 1, unit: 'gp' }, 20);
    expect(coinValueGp(afterBundle)).toBe(5);
    // never mints platinum (value can't hide in an untracked coin)
    expect(after.pp).toBeUndefined();
  });

  it('refuses to spend when unaffordable or priceless (returns null)', () => {
    expect(spendCoins(gp(10), { quantity: 15, unit: 'gp' })).toBe(null);
    expect(spendCoins(gp(10), undefined)).toBe(null);
  });
});

describe('encumbranceStatus folds in extra (coin) weight', () => {
  it('adds extraWeight to the total against every threshold', () => {
    // Str 10: capacity 150, encumbered > 50. Items 45 + 10 coin lb = 55 → encumbered.
    const items = [{ name: 'gear', weight: 45 }];
    expect(encumbranceStatus(10, items, 0).tier).toBe('ok');
    expect(encumbranceStatus(10, items, 10).tier).toBe('encumbered');
    expect(encumbranceStatus(10, items, 10).total).toBe(55);
  });

  it('treats a missing extraWeight as zero (back-compat)', () => {
    expect(encumbranceStatus(10, [{ weight: 40 }]).total).toBe(40);
  });
});

describe('add / remove / custom item updates the total', () => {
  it('recomputes the tier as items change', () => {
    let carried = items(40); // Str 10: ok (≤50)
    expect(encumbranceStatus(10, carried).tier).toBe('ok');

    carried = [...carried, { name: 'anvil', weight: 20 }]; // 60 → encumbered
    expect(encumbranceStatus(10, carried).tier).toBe('encumbered');

    carried = [...carried, { name: 'custom boulder', weight: 100, source: 'custom' }]; // 160 → over
    expect(encumbranceStatus(10, carried).tier).toBe('over');

    carried = carried.filter((i) => i.name !== 'custom boulder'); // back to 60
    expect(encumbranceStatus(10, carried).tier).toBe('encumbered');
  });
});
