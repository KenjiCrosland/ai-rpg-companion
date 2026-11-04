import DMG_TABLE from '@/data/challengeRatings.json';
import { hpAim2014 } from './print-2014.mjs';
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

/**
 * PRINT'S HARDEST SINGLE-TARGET ROW, BY BAND — one closed fact, one home.
 *
 * Derived from SRD 5.2 by summing every damage component of each attack row that
 * names one target (the swarm's Bloodied split is one attack at two rates, never
 * their sum). A RUNNING MAX is applied: print's own sample dips at CR 17-20 (43)
 * below CR 13-16 (51), which is sampling and not a rule, and a ceiling must never
 * fall as CR rises (the critic's own correction, 2026-10-29).
 *
 * Lived privately in checker.mjs as `CAP`. `scale.mjs` needs the same number to
 * hold a one-attack body under it, and two copies of one fact is the drift this
 * sprint's audit is about.
 */
export const SINGLE_TARGET_CEILING = { '0-2': 24, '3-5': 31, '6-9': 35, '10-12': 39, '13-16': 51, '17-20': 51, '21+': 60 };
/**
 * PRINT'S HARDEST SINGLE-TARGET **SAVE** ROW, BY BAND (the critic, 2026-11-03).
 *
 * The ceiling above is derived from print's ATTACK rows, and the checker was applying it
 * to save rows too — so a single-target save row at CR 13-16 was judged against 51 when
 * print's hardest is 27. Print keeps a focused save row softer than a hit in every band
 * but the last, which makes sense: the target gets a save.
 *
 * Measured the same way (sum every damage component of a row that deals damage, names
 * one target, and resolves by a saving throw rather than an attack roll). 43 rows:
 *   0-2   n=4   5, 5, 7, 13
 *   3-5   n=12  6, 8, 9, 10, 13, 13, 15, 16, 17, 18, 18, 24
 *   6-9   n=4   9, 14, 15, 29
 *   10-12 n=7   10, 14, 20, 20, 21, 28, 31
 *   13-16 n=7   15, 17, 19, 22, 24, 25, 27
 *   17-20 n=2   10, 36            <- TWO ROWS. Thin, and the running max carries it.
 *   21+   n=7   24, 31, 33, 33, 47, 56, 60
 *
 * A RUNNING MAX is applied for the same reason the attack table needs one, and the 17-20
 * sample is why: at n=2 a band's own maximum is sampling, not a rule.
 *
 * The margin discipline is unchanged — over print is a true statement at any margin, and
 * the 1.25x severity line still separates "one-shots a PC" from "wants a reader".
 */
export const SINGLE_TARGET_SAVE_CEILING = { '0-2': 13, '3-5': 24, '6-9': 29, '10-12': 31, '13-16': 31, '17-20': 36, '21+': 60 };
/** The ceiling a row answers to: a save row is held to print's save rows, a hit to print's hits. */
export const ceilingFor = (cr, { save = false } = {}) => (save ? SINGLE_TARGET_SAVE_CEILING : SINGLE_TARGET_CEILING)[ceilingBandOf(cr)] ?? null;
export const ceilingBandOf = (cr) => (cr <= 2 ? '0-2' : cr <= 5 ? '3-5' : cr <= 9 ? '6-9' : cr <= 12 ? '10-12' : cr <= 16 ? '13-16' : cr <= 20 ? '17-20' : '21+');
export const singleTargetCeiling = (cr) => SINGLE_TARGET_CEILING[ceilingBandOf(cr)] ?? null;

const FRACTIONAL = { 0: { hp: 3, dpr: 2 }, 0.125: { hp: 9, dpr: 4 }, 0.25: { hp: 15, dpr: 6 }, 0.5: { hp: 24, dpr: 8 } };
const roundUp5 = (n) => Math.ceil(n / 5) * 5;

// THE 2014 CARD is the DMG's own table (src/data/challengeRatings.json): a 2014
// sheet budgets HP, AC, attack bonus, save DC and damage per round against the
// band the 2014 rules print. The flat 0.7 damage discount it replaces (owner
// ruling 2026-09-14, "~5 damage/CR") undershot the table — a CR 10 horseman
// sustained 38 against the DMG's 63-68 (owner, 2026-10-02).
const CR_KEY = (cr) => ({ 0.125: '1/8', 0.25: '1/4', 0.5: '1/2' }[cr] ?? String(cr));
export function dmgRow(cr) { return DMG_TABLE[CR_KEY(cr)] ?? null; }
const DMG_CRS = [0, 0.125, 0.25, 0.5, ...Array.from({ length: 30 }, (_, i) => i + 1)];
// the DMG's defensive trade, inverted: a sheet whose AC sits 2 over the table
// may carry the HP of one CR lower and still read as its CR (and the reverse),
// so a 2014 sheet's HP is the band mid at cr - trunc((ac - tableAC) / 2)
export function dmgHpForAc(cr, ac) {
  const row = dmgRow(cr); if (!row) return null;
  const i = DMG_CRS.indexOf(cr); if (i < 0) return null;
  const adj = Math.trunc((ac - row.armor_class) / 2);
  const at = DMG_CRS[Math.max(0, Math.min(DMG_CRS.length - 1, i - adj))];
  const r = dmgRow(at); return Math.round((r.min_hit_points + r.max_hit_points) / 2);
}
export function cardBudget(cr, { legendary = false, dragon = false, edition = null } = {}) {
  if (edition === '2014') {
    const row = dmgRow(cr);
    if (row) {
      // HP is PRINT's median at the CR, not the table's band: the table says 71–85 at CR 1 where print 2014 sits at 19–37 (critic's release audit 2026-10-03); damage, attack, AC and DC stay the table's
      const hp = hpAim2014(cr) ?? Math.round((row.min_hit_points + row.max_hit_points) / 2);
      let dpr = Math.round((row.min_damage_per_round + row.max_damage_per_round) / 2);
      const boosted = legendary || dragon;
      if (boosted && cr >= 13 && cr <= 17) dpr = roundUp5(dpr * 1.45);
      else if (boosted) dpr = roundUp5(dpr * 1.25);
      return { hp, dpr, atk: Number(String(row.attack_bonus).replace('+', '')), ac: row.armor_class, dc: row.save_dc, edition: '2014' };
    }
  }
  const frac = FRACTIONAL[cr];
  // CR 18–20: the 15/CR line sits under print (Balor 287 at 19, Pit Fiend 337 and Ancient White 333 at 20) — +5/CR above 17 tracks the corpus (a CR 20 hurler at 312 failed print's 332 floor, checker 2026-10-02)
  let hp = frac ? frac.hp : (cr <= 20 ? 15 + 15 * cr + (cr > 17 ? 5 * (cr - 17) : 0) : 315 + 50 * (cr - 20));
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
