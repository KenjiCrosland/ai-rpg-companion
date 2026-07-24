/**
 * split-loot.mjs
 *
 * Flat loot splitter for the treasure-import flow. Given a parsed haul (coins +
 * items) and a share count N, it does the tedious division math and hands back N
 * anonymous piles plus an honest leftover — humans make the social decisions
 * (who takes which pile), the tool just divides.
 *
 * Rules:
 *  - COINS split by VALUE, evenly. Total copper ÷ N; each pile gets the floor,
 *    minted into a tidy purse. The remainder (< N cp) is surfaced as `leftover`,
 *    never fudged into a pile.
 *  - ITEMS are dealt like cards: every stack is expanded to individual units,
 *    the units are shuffled, then dealt round-robin so pile counts stay balanced
 *    (a "3 potions across 3 shares" split falls out naturally). Units of the same
 *    item re-group within a pile. Re-dealing = calling again with a fresh shuffle.
 *  - Each pile carries a live gp value (its coin value + its items' gp value).
 *
 * Pure — no DOM, no randomness of its own beyond the injected `rng` (so it's
 * deterministic under test and re-shuffleable in the UI).
 */

import { coinsToCp, coinValueGp, mintCoins } from './carry-capacity.mjs';
import { estimateMagicValue, RARITY_BASE_GP } from '@/util/magic-item-value.mjs';

const round2 = (n) => Math.round(n * 100) / 100;

/** Fisher–Yates shuffle using an injected rng (defaults to Math.random). */
function shuffle(list, rng) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const itemsValueGp = (items) =>
  round2(items.reduce((s, it) => s + (Number(it.valueGp) || 0) * (Number(it.quantity) || 1), 0));

// Rarity base prices come from the shared Magic Item Price Calculator model.
export const RARITY_VALUE_GP = RARITY_BASE_GP;

/**
 * One item unit's estimated worth (gp) for the value-balanced deal + rebalancing:
 * mundane treasure uses its real `valueGp`; a magic item uses the price-calculator
 * estimate (rarity × item-type — so a Very Rare *potion* is a tenth of a permanent
 * Very Rare item, and single-use items don't dominate a share). Unrated / non-SRD
 * magic estimates to 0 — the tool under-compensates rather than guessing.
 */
function unitValue(u) {
  if (u.category === 'Treasure') return Number(u.valueGp) || 0;
  if (u.category === 'Magic Item') return estimateMagicValue(u);
  return 0;
}

export function computeShareItemValue(pile) {
  let gp = 0;
  for (const it of pile.items || []) {
    gp += unitValue(it) * (Number(it.quantity) || 1);
  }
  return gp;
}

/**
 * Assign coins to piles so each pile's (coins + estimated item value) trends equal.
 * Piles that drew high-value items get fewer coins; low-value piles get more. Never
 * takes a pile below zero coins, and never spends more than the pool — if the
 * disparity exceeds the coins available, compensation scales down proportionally.
 * Mutates `pile.coins`; returns the leftover copper.
 */
function assignRebalancedCoins(piles, totalCp) {
  const n = piles.length;
  const itemValues = piles.map(computeShareItemValue);
  const totalItemValue = itemValues.reduce((s, v) => s + v, 0);

  // No value data to balance against → fall back to an even split.
  if (totalItemValue === 0) {
    const perCp = Math.floor(totalCp / n);
    piles.forEach((p) => { p.coins = mintCoins(perCp); });
    return totalCp - perCp * n;
  }

  const availableGp = totalCp / 100;
  const targetPileValue = (availableGp + totalItemValue) / n;
  // Coin value each pile needs to reach the target — floored at 0 (no negatives).
  let need = itemValues.map((iv) => Math.max(0, targetPileValue - iv));
  const totalNeed = need.reduce((s, v) => s + v, 0);
  // Can't fully compensate → scale everyone's coin share down proportionally.
  if (totalNeed > availableGp && totalNeed > 0) {
    const scale = availableGp / totalNeed;
    need = need.map((v) => v * scale);
  }

  let assignedCp = 0;
  piles.forEach((p, i) => {
    const cp = Math.floor(need[i] * 100);
    p.coins = mintCoins(cp);
    assignedCp += cp;
  });
  return totalCp - assignedCp; // whatever rounding leaves behind
}

/**
 * Re-run the coin balancing over piles whose items changed (a drag/move between
 * shares), keeping the same coin pool. Mutates each `pile.coins` and returns the
 * new leftover in the {coins, valueGp} shape splitLoot uses.
 */
export function rebalanceCoins(piles, coins) {
  const leftoverCp = assignRebalancedCoins(piles, coinsToCp(coins));
  const leftoverCoins = mintCoins(leftoverCp);
  return { coins: leftoverCoins, valueGp: coinValueGp(leftoverCoins) };
}

/**
 * @param {object} coins  {pp,gp,ep,sp,cp} — the haul's coins
 * @param {Array}  items  parsed items [{ id, name, quantity, valueGp, category, rarity? }]
 * @param {number} shares number of piles (>= 1)
 * @param {() => number} [rng] 0..1 source, injectable for determinism/re-deal
 * @param {{rebalance?: boolean}} [opts]  rebalance → shift coins to offset item value
 * @returns {{ piles: Array<{coins, items, valueGp}>, leftover: {coins, valueGp} }}
 */
export function splitLoot(coins, items, shares, rng = Math.random, { rebalance = false } = {}) {
  const n = Math.max(1, Math.floor(Number(shares) || 1));
  const totalCp = coinsToCp(coins);

  // --- items: expand stacks to units, then deal ---
  const piles = Array.from({ length: n }, () => ({ coins: {}, items: [] }));
  const units = [];
  for (const it of items || []) {
    const q = Math.max(1, Math.floor(Number(it.quantity) || 1));
    for (let k = 0; k < q; k += 1) units.push({ ...it, quantity: 1 });
  }

  if (rebalance) {
    // Value-balanced greedy deal: place the highest-value units first, each into
    // the currently-lightest share (ties broken at random for re-deal variety). A
    // single dominant item (a Legendary) lands ALONE — no other share can catch it.
    const ordered = shuffle(units, rng).sort((a, b) => unitValue(b) - unitValue(a));
    const totals = new Array(n).fill(0);
    for (const unit of ordered) {
      const min = Math.min(...totals);
      const lightest = totals.map((t, i) => (t === min ? i : -1)).filter((i) => i >= 0);
      const idx = lightest[Math.floor(rng() * lightest.length)];
      piles[idx].items.push(unit);
      totals[idx] += unitValue(unit);
    }
  } else {
    // Plain random deal, balanced by count (unchanged).
    shuffle(units, rng).forEach((unit, idx) => {
      piles[idx % n].items.push(unit);
    });
  }

  for (const pile of piles) {
    const byId = new Map();
    for (const u of pile.items) {
      const key = u.id ?? u.name;
      if (byId.has(key)) byId.get(key).quantity += 1;
      else byId.set(key, { ...u, quantity: 1 });
    }
    pile.items = [...byId.values()];
  }

  // --- coins: even by value, or rebalanced against item value (opt-in) ---
  let leftoverCp;
  if (rebalance) {
    leftoverCp = assignRebalancedCoins(piles, totalCp);
  } else {
    const perCp = Math.floor(totalCp / n);
    leftoverCp = totalCp - perCp * n;
    for (const pile of piles) pile.coins = mintCoins(perCp);
  }

  // Displayed pile value: coins + item value. When rebalancing we include magic
  // rarity estimates (so the pile holding a Legendary reads as valuable, not 0 gp);
  // otherwise only real treasure gp counts.
  for (const pile of piles) {
    const itemGp = rebalance ? computeShareItemValue(pile) : itemsValueGp(pile.items);
    pile.valueGp = round2(coinValueGp(pile.coins) + itemGp);
  }

  const leftoverCoins = mintCoins(leftoverCp);
  return {
    piles,
    leftover: { coins: leftoverCoins, valueGp: coinValueGp(leftoverCoins) },
  };
}
