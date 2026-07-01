/**
 * carry-capacity.mjs
 *
 * Pure D&D 5e carrying-capacity math — the heart of the Visual RPG Backpack.
 * No DOM, no Vue: directly unit-testable. WEIGHT is the only real limit in this
 * tool; the grid is a cosmetic arrangement (see plan).
 *
 * 5e variant encumbrance (PHB):
 *  - carry capacity (hard cap) = Str × 15
 *  - encumbered          when weight > Str × 5   → speed −10 ft
 *  - heavily encumbered  when weight > Str × 10  → speed −20 ft + disadvantage on
 *                        ability checks / attack rolls / saving throws using
 *                        Strength, Dexterity, or Constitution
 *  - over capacity       when weight > Str × 15  → cannot carry this much
 */

export function carryCapacity(str) {
  return str * 15;
}

export function encumberedThreshold(str) {
  return str * 5;
}

export function heavilyEncumberedThreshold(str) {
  return str * 10;
}

/** Sum item weights (per-unit weight × quantity), ignoring missing weights. */
export function totalWeight(items) {
  if (!Array.isArray(items)) return 0;
  const sum = items.reduce(
    (acc, it) => acc + (Number(it?.weight) || 0) * (Number(it?.quantity) || 1),
    0,
  );
  // Trim binary-float dust (weights are integers or simple fractions).
  return Math.round(sum * 100) / 100;
}

const round2 = (n) => Math.round(n * 100) / 100;

/** Total number of coins across all denominations. */
export function totalCoins(coins) {
  if (!coins) return 0;
  return ['gp', 'ep', 'sp', 'cp'].reduce((acc, k) => acc + (Number(coins[k]) || 0), 0);
}

/** Coin weight in pounds. 5e: 50 coins weigh 1 lb, regardless of denomination. */
export function coinWeight(coins) {
  return round2(totalCoins(coins) / 50);
}

/** Total coin value expressed in gold pieces (1 gp = 2 ep = 10 sp = 100 cp). */
export function coinValueGp(coins) {
  if (!coins) return 0;
  const gp = Number(coins.gp) || 0;
  const ep = Number(coins.ep) || 0;
  const sp = Number(coins.sp) || 0;
  const cp = Number(coins.cp) || 0;
  return round2(gp + ep * 0.5 + sp * 0.1 + cp * 0.01);
}

// --- prices & buying (catalog "Buy" button) -------------------------------
// All money math runs in copper (the base unit) so it stays integer-exact —
// no floating-point drift when subtracting a purchase from the purse.

/** Copper value of one coin of each denomination. */
const COIN_IN_CP = { pp: 1000, gp: 100, ep: 50, sp: 10, cp: 1 };

/** A whole purse ({gp,ep,sp,cp}) expressed in copper. */
export function coinsToCp(coins) {
  if (!coins) return 0;
  return Object.keys(COIN_IN_CP).reduce(
    (acc, k) => acc + (Number(coins[k]) || 0) * COIN_IN_CP[k],
    0,
  );
}

/**
 * An SRD price ({ quantity, unit }) in copper, times an optional item quantity
 * (buying 20 arrows costs 20× the unit price). Returns 0 for a missing/priceless
 * cost — priceless items are never buyable, so this is only ever a guard.
 */
export function costToCp(cost, quantity = 1) {
  if (!cost || !COIN_IN_CP[cost.unit]) return 0;
  const q = Math.max(1, Math.floor(Number(quantity) || 1));
  return (Number(cost.quantity) || 0) * COIN_IN_CP[cost.unit] * q;
}

/** Human price label in the item's native denomination, e.g. "15 gp", "5 sp". */
export function formatCost(cost) {
  if (!cost || !COIN_IN_CP[cost.unit]) return '';
  return `${Number(cost.quantity) || 0} ${cost.unit}`;
}

/** Can this purse afford `quantity` of an item at `cost`? */
export function canAfford(coins, cost, quantity = 1) {
  const price = costToCp(cost, quantity);
  return price > 0 && coinsToCp(coins) >= price;
}

/**
 * Spend `quantity`×`cost` from a purse. The purse is melted to copper, the price
 * subtracted, and the remainder re-minted greedily from the highest denomination
 * down — value-exact, fewest coins. Re-mints only into the denominations this
 * tool tracks (gp/ep/sp/cp, no platinum), so no value can hide in an untracked
 * coin. Returns the new purse, or `null` if it can't be afforded (the caller
 * should have disabled Buy already).
 */
export function spendCoins(coins, cost, quantity = 1) {
  const price = costToCp(cost, quantity);
  if (price <= 0) return null;
  let remaining = coinsToCp(coins) - price;
  if (remaining < 0) return null;
  const out = { gp: 0, ep: 0, sp: 0, cp: 0 };
  for (const k of ['gp', 'ep', 'sp', 'cp']) {
    out[k] = Math.floor(remaining / COIN_IN_CP[k]);
    remaining -= out[k] * COIN_IN_CP[k];
  }
  return out;
}

export const CONSEQUENCES = {
  ok: '',
  encumbered: 'Encumbered: speed reduced by 10 feet.',
  heavily:
    'Heavily encumbered: speed reduced by 20 feet, and disadvantage on ability checks, attack rolls, and saving throws that use Strength, Dexterity, or Constitution.',
  over: 'Over capacity: you cannot carry this much. Drop something or raise Strength.',
};

/**
 * Full encumbrance read for a Strength score + carried items.
 *
 * `extraWeight` folds in non-tile load (currently coin weight, when the user has
 * coin encumbrance enabled). It's part of the total against every threshold.
 *
 * @returns {{ tier:'ok'|'encumbered'|'heavily'|'over', total:number, capacity:number,
 *   encumberedThreshold:number, heavilyEncumberedThreshold:number, ratio:number,
 *   consequences:string }}
 */
export function encumbranceStatus(str, items, extraWeight = 0) {
  const total = round2(totalWeight(items) + (Number(extraWeight) || 0));
  const capacity = carryCapacity(str);
  const enc = encumberedThreshold(str);
  const heavy = heavilyEncumberedThreshold(str);

  let tier;
  if (total > capacity) tier = 'over';
  else if (total > heavy) tier = 'heavily';
  else if (total > enc) tier = 'encumbered';
  else tier = 'ok';

  return {
    tier,
    total,
    capacity,
    encumberedThreshold: enc,
    heavilyEncumberedThreshold: heavy,
    ratio: capacity > 0 ? total / capacity : 0,
    consequences: CONSEQUENCES[tier],
  };
}
