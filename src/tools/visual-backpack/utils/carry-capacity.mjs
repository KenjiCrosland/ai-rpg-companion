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

/** The tool's coin denominations, highest value first. */
export const COIN_DENOMS = ['pp', 'gp', 'ep', 'sp', 'cp'];

/** Total number of coins across all denominations. */
export function totalCoins(coins) {
  if (!coins) return 0;
  return COIN_DENOMS.reduce((acc, k) => acc + (Number(coins[k]) || 0), 0);
}

/** Coin weight in pounds. 5e: 50 coins weigh 1 lb, regardless of denomination. */
export function coinWeight(coins) {
  return round2(totalCoins(coins) / 50);
}

/** Total coin value expressed in gold pieces (1 pp = 10 gp = 20 ep = 100 sp = 1000 cp). */
export function coinValueGp(coins) {
  if (!coins) return 0;
  const pp = Number(coins.pp) || 0;
  const gp = Number(coins.gp) || 0;
  const ep = Number(coins.ep) || 0;
  const sp = Number(coins.sp) || 0;
  const cp = Number(coins.cp) || 0;
  return round2(pp * 10 + gp + ep * 0.5 + sp * 0.1 + cp * 0.01);
}

// --- prices & buying (catalog "Buy" button) -------------------------------
// All money math runs in copper (the base unit) so it stays integer-exact —
// no floating-point drift when subtracting a purchase from the purse.

/** Copper value of one coin of each denomination. */
const COIN_IN_CP = { pp: 1000, gp: 100, ep: 50, sp: 10, cp: 1 };
const HIGH_TO_LOW = ['pp', 'gp', 'ep', 'sp', 'cp'];
const LOW_TO_HIGH = ['cp', 'sp', 'ep', 'gp', 'pp'];
// Coins we hand back as CHANGE — gp/sp/cp only. A shop doesn't make change in
// electrum (the odd-coin-out) or platinum, and any cp amount is exactly
// representable without them, so change never surprises you with an ep.
const CHANGE_DENOMS = ['gp', 'sp', 'cp'];

/** A whole purse ({gp,ep,sp,cp}) expressed in copper. */
export function coinsToCp(coins) {
  if (!coins) return 0;
  return Object.keys(COIN_IN_CP).reduce(
    (acc, k) => acc + (Number(coins[k]) || 0) * COIN_IN_CP[k],
    0,
  );
}

/**
 * Mint a copper amount into a tidy purse using gp/sp/cp — the coins players think
 * in for a handout. Value-exact (any amount is representable without pp/ep), and
 * it avoids the jarring "100 gp → 10 pp" promotion a fully-greedy mint would do.
 * Used to express a loot-split share as coins.
 */
export function mintCoins(cp) {
  let rem = Math.max(0, Math.floor(Number(cp) || 0));
  const out = { pp: 0, gp: 0, ep: 0, sp: 0, cp: 0 };
  for (const d of CHANGE_DENOMS) {
    out[d] = Math.floor(rem / COIN_IN_CP[d]);
    rem -= out[d] * COIN_IN_CP[d];
  }
  return out;
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
 * Spend `quantity`×`cost` from a purse, shedding coin bulk as it goes: pay
 * smallest-denomination-first, so a purchase unloads your pile of copper and
 * silver before it touches gold or platinum. In 5e, 50 coins weigh 1 lb
 * regardless of denomination, so offloading the small stuff literally lightens
 * the purse — and the compact high-value coins (and any platinum you're
 * hoarding) are the last thing spent. Only when the coins on hand can't make the
 * exact amount do we break ONE larger coin into change. Value-exact. Returns the
 * new purse, or `null` if it can't be afforded.
 */
export function spendCoins(coins, cost, quantity = 1) {
  const price = costToCp(cost, quantity);
  if (price <= 0) return null;
  const purse = {};
  for (const d of HIGH_TO_LOW) purse[d] = Number(coins?.[d]) || 0;
  if (coinsToCp(purse) < price) return null;

  // Pay exact coins, smallest first (shed bulk).
  let owed = price;
  for (const d of LOW_TO_HIGH) {
    if (owed <= 0) break;
    const use = Math.min(purse[d], Math.floor(owed / COIN_IN_CP[d]));
    purse[d] -= use;
    owed -= use * COIN_IN_CP[d];
  }
  // Remainder can't be made from the coins on hand → break the smallest coin big
  // enough to cover it, and mint the change back in gp/sp/cp (never electrum/platinum).
  if (owed > 0) {
    for (const d of LOW_TO_HIGH) {
      if (purse[d] > 0 && COIN_IN_CP[d] >= owed) {
        purse[d] -= 1;
        let change = COIN_IN_CP[d] - owed;
        owed = 0;
        for (const cd of CHANGE_DENOMS) {
          const add = Math.floor(change / COIN_IN_CP[cd]);
          purse[cd] += add;
          change -= add * COIN_IN_CP[cd];
        }
        break;
      }
    }
  }
  return purse;
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
