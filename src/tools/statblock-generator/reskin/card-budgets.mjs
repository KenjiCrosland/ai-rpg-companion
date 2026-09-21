/**
 * THE 2024 MONSTER MANUAL ON A BUSINESS CARD (Blog of Holding v2, CC BY 4.0,
 * blogofholding.com/?p=8469) — the reskin pilot's single numeric authority,
 * owner-designated (2026-08-17). Every stat is ONE formula per band, and the
 * damage figure is a SUMMED budget: sustained-per-round PLUS amortized
 * limited-use damage, priced together (the fix for "DPR calculating poorly
 * across repeated generations" — the slot path prices them in separate code
 * paths).
 *
 * Card formulas, verbatim:
 *   HP   — CR 0: 3, 1/8: 9, 1/4: 15, 1/2: 24; CR 1-20: 15 + 15/CR;
 *          CR 21+: 315 + 50/CR above 20
 *   DPR  — CR 0: 2, 1/8: 4, 1/4: 6, 1/2: 8; CR 1-20: 7.5/CR rounded UP to
 *          the nearest 5; CR 21+: 150 + 12.5/CR above 20, same rounding
 *   ATK  — unchanged from 2014: 4 + CR/2 (round down)
 *   AC   — 2014 + 1 across the board: 14 + CR/3 (round to nearest)
 *   DC   — unchanged from 2014: 11 + CR/2 (round down)
 *   LEGENDARY/DRAGON (v2 fix): +25% damage in general; at CR 13-17 the
 *   printed shape is -20% HP and +45% damage (room for the breath weapon).
 *
 * DPR assumptions inherited with the card (2014 DMG method + card's calls):
 * 3-round fight, highest-damage options, attacks hit, saves fail, area
 * effects hit 2 targets, Recharge 4-6 triggers twice per fight, Recharge
 * 5-6 / 1/Day / swallow-class once.
 */

export const NOVA_USES_PER_FIGHT = { 'Recharge 4-6': 2, 'Recharge 5-6': 1, '1/Day': 1, '2/Day': 2, '3/Day': 3 };
export const FIGHT_ROUNDS = 3;
export const AREA_TARGETS = 2;

const FRACTIONAL = { 0: { hp: 3, dpr: 2 }, 0.125: { hp: 9, dpr: 4 }, 0.25: { hp: 15, dpr: 6 }, 0.5: { hp: 24, dpr: 8 } };
const roundUp5 = (n) => Math.ceil(n / 5) * 5;

export function cardBudget(cr, { legendary = false, dragon = false } = {}) {
  const frac = FRACTIONAL[cr];
  let hp = frac ? frac.hp : (cr <= 20 ? 15 + 15 * cr : 315 + 50 * (cr - 20));
  let dpr = frac ? frac.dpr : (cr <= 20 ? roundUp5(7.5 * cr) : roundUp5(150 + 12.5 * (cr - 20)));
  const boosted = legendary || dragon;
  if (boosted && cr >= 13 && cr <= 17) { hp = Math.round(hp * 0.8); dpr = roundUp5(dpr * 1.45); }
  else if (boosted) { dpr = roundUp5(dpr * 1.25); }
  return {
    hp,
    dpr,
    atk: 4 + Math.floor(cr / 2),
    // AC: the card says "2014 + 1" (14 + CR/3), but its rounding mints
    // AC 21 at CR 20 where the shipped set and the slot engine both say
    // 20 — one block at 21 scans as an error regardless of derivation
    // (reviewer's set-consistency rider). floor(15 + CR/4) matches the
    // card's own data AND the engine at every pilot CR: 15/16/17/18/19/20.
    ac: cr < 1 ? Math.round(14 + cr / 3) : Math.floor(15 + cr / 4),
    dc: 11 + Math.floor(cr / 2),
  };
}

/**
 * The summed per-round damage of a block under the card's fight model:
 * sustained rounds plus amortized limited-use damage, divided by the fight.
 * `novas`: [{ avg, gate, targets? }] — targets defaults to AREA_TARGETS for
 * area rows, 1 for single-target (caller decides).
 */
export function summedDPR(sustainedPerRound, novas = []) {
  let total = sustainedPerRound * FIGHT_ROUNDS;
  for (const n of novas) {
    const uses = NOVA_USES_PER_FIGHT[n.gate] ?? 0;
    // a nova round REPLACES a sustained round, so only the surplus counts
    const perUse = n.avg * (n.targets ?? AREA_TARGETS);
    total += uses * Math.max(0, perUse - sustainedPerRound);
  }
  return total / FIGHT_ROUNDS;
}

/** Band check: within the card's orange path, approximated as median ±25%.
 * `dprScale`: a donor's measured damage discount — the ward tax (Shield
 * Guardian prints 36 of a 55 card, 0.65x, paid by the transfer link and
 * Regeneration; defender sweep 2026-09-08). The solver and the donor laws
 * both price against the discounted target. */
export function withinBudget(cr, sustainedPerRound, novas, opts = {}) {
  const target = Math.round(cardBudget(cr, opts).dpr * (opts.dprScale ?? 1));
  const actual = summedDPR(sustainedPerRound, novas);
  return { target, actual, ok: actual >= target * 0.75 && actual <= target * 1.25 };
}
