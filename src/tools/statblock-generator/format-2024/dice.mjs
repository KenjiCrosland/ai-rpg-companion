/**
 * Dice solvers shared by the generation pipeline and the skeleton builder.
 *
 * Extracted from generate.mjs so `skeleton/` can use them without importing
 * generate.mjs, which will import the skeleton builder in turn. generate.mjs
 * re-exports everything here, so existing importers are unaffected.
 *
 * These turn a target AVERAGE into printable dice. The engine owns the
 * numbers; these decide how they're written.
 */

export const HIT_DIE_BY_SIZE = { Tiny: 4, Small: 6, Medium: 8, Large: 10, Huge: 12, Gargantuan: 20 };

/**
 * Deterministic hit-dice solver, CON-coherent: the flat bonus is EXACTLY
 * dice-count × CON mod (the DMG construction grognards check — "17d10 + 69"
 * with CON +4 is a tell). Dice count is chosen so the floor-average lands
 * nearest the chassis target; callers re-read the exact average via
 * avgDice() and stamp it as the block's HP (the ±35% band absorbs the
 * drift).
 */
export function hpFormulaFor(targetHp, size, conMod = 0) {
  const die = HIT_DIE_BY_SIZE[size] ?? 8;
  const avgPerDie = (die + 1) / 2;
  // The 0.5 floor keeps the dice-count estimate honest when CON drags the
  // per-die contribution near zero (small dice, deeply negative CON).
  const perDie = Math.max(0.5, avgPerDie + conMod);
  let n = Math.max(1, Math.round(targetHp / perDie));
  // Deep-negative CON guard: never emit a formula whose average is < 1.
  while (n > 1 && Math.floor(n * avgPerDie) + n * conMod < 1) n--;
  const m = n * conMod;
  if (m === 0) return `${n}d${die}`;
  return m > 0 ? `${n}d${die} + ${m}` : `${n}d${die} - ${-m}`;
}

/**
 * Attack damage skeleton: NdD + M where M IS the attack ability's modifier
 * (grognard contract: the flat damage bonus equals the ability mod that
 * made the attack roll). Returns the dice and their exact floor-average —
 * the skeleton prints that average, not the raw budget.
 */
/**
 * PRINT'S LARGEST d4 ATTACK ROW IS 3d4 (R10, 2026-11-02; re-sited 2026-11-03).
 * Measured over the corpus: 99 attack rows use d4 and the largest is 3d4 — the
 * Bugbear Warrior's Light Hammer, the Hobgoblin Warrior's Longbow, the Vampire
 * Familiar's Umbral Dagger. A closed fact from print, so it lives in one place:
 * `attackDamageDiceFor` declines to OFFER a bigger d4 candidate, and the two
 * weapon-die restamps in the reskin path decline to FORCE one. The first cut set
 * it only here, and the gate forty then shipped a 4d4 Dart — print's own rule of
 * "keep the weapon's die and scale the count" runs on a later pass that this
 * function never sees, which is exactly the row the d4-stack lint names.
 */
export const D4_MAX = 3;

export function attackDamageDiceFor(avg, mod) {
  // House die is d8; smaller dice only when meaningfully closer. Within a
  // ±1 closeness tolerance the LARGER die wins — officials write "4d6 + 9",
  // not "6d4 + 9" (live finding) — while low-CR budgets (avg ≈ mod) still
  // fall to d4/d6 to avoid overshooting.
  // AND PRINT NEVER STACKS MORE THAN THREE d4 ON AN ATTACK ROW (R10, 2026-11-02).
  // Measured over the corpus: 99 attack rows use d4 and the largest is **3d4** — the
  // Bugbear Warrior's Light Hammer, the Hobgoblin Warrior's Longbow, the Vampire
  // Familiar's Umbral Dagger. The gate runs shipped 7d4 (a cane), 4d4 and 4d4: a GM who
  // plays does not roll seven d4 for a club. A d4 candidate past print's own maximum is
  // simply not offered, so the next die up wins on closeness instead. Closed fact from
  // print, no judgement.
  const candidates = [];
  for (const die of [8, 6, 4]) {
    const per = (die + 1) / 2;
    const n = Math.max(1, Math.round((avg - mod) / per));
    const actual = Math.floor(n * per) + mod;
    if (actual < 1) continue;
    if (die === 4 && n > D4_MAX) continue;
    const dice = mod === 0 ? `${n}d${die}` : mod > 0 ? `${n}d${die} + ${mod}` : `${n}d${die} - ${-mod}`;
    candidates.push({ dice, avg: actual, diff: Math.abs(actual - avg) });
  }
  if (!candidates.length) return { dice: '1d4', avg: Math.max(1, 2 + mod) };
  const minDiff = Math.min(...candidates.map((c) => c.diff));
  const { dice, avg: actual } = candidates.find((c) => c.diff <= minDiff + 1);
  return { dice, avg: actual };
}

/**
 * Save-effect damage skeleton: pure dice, no flat bonus — the SRD's own
 * convention for save-based effects ("21 (6d6)"). Picks the die whose
 * floor-average lands closest to the budget.
 */
export function saveDamageDiceFor(avg) {
  // Closeness first, but dice-count sanity matters at scale: officials top
  // out at 26 dice (Ancient Red's 26d6), while a closeness-only pick
  // produced "311 (89d6)" (live finding). Counts beyond 15 pay a growing
  // penalty, so big budgets climb to larger dice (24d12, not 45d6) while
  // small ones keep the canonical handfuls (6d6).
  let best = null;
  for (const die of [6, 8, 10, 12]) {
    const per = (die + 1) / 2;
    const n = Math.max(1, Math.round(avg / per));
    const actual = Math.floor(n * per);
    const score = Math.abs(actual - avg) + Math.max(0, n - 15) * 0.5;
    if (!best || score < best.score) {
      best = { dice: `${n}d${die}`, avg: actual, score };
    }
  }
  return { dice: best.dice, avg: best.avg };
}

/**
 * Pure dice with no flat bonus, sized to a target average. Used for rider
 * damage ("plus 10 (3d6) Fire damage"), which never carries the attack
 * ability's modifier — only the main instance does.
 */
export function riderDamageDiceFor(avg) {
  return saveDamageDiceFor(avg);
}
