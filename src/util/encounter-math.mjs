/**
 * Encounter XP and difficulty maths.
 *
 * Extracted verbatim from `EncounterGenerator.vue` (2026-09-24) where it
 * lived as five Vue `computed` properties and two file-local helpers, so
 * nothing outside that component could reach it. The creature reference
 * pages need the same numbers from a Node build script, and generating
 * pages against a second implementation and reconciling later is the
 * expensive order.
 *
 * THIS MODULE IS PURE AND IMPORTS NO DATA. The thresholds table is passed
 * in by the caller. That is deliberate: `@/data/...` resolves under Vite
 * and Jest but not under plain Node, and the whole point of the extraction
 * is that `scripts/` can call it.
 *
 * SEMANTICS ARE 2014 DMG, unchanged by the move: Easy/Medium/Hard/Deadly
 * thresholds and the encounter-size multiplier (DMG p. 82). The 2024 model
 * (Low/Moderate/High, no multiplier) is a separate, deliberate change —
 * owner decision 2026-09-24 for the creature pages. Do not mix the two
 * silently; a caller gets one model or the other.
 */

/** 5e CR → XP award. */
export const CR_TO_XP = {
  '0': 10, '1/8': 25, '1/4': 50, '1/2': 100,
  '1': 200, '2': 450, '3': 700, '4': 1100, '5': 1800,
  '6': 2300, '7': 2900, '8': 3900, '9': 5000, '10': 5900,
  '11': 7200, '12': 8400, '13': 10000, '14': 11500, '15': 13000,
  '16': 15000, '17': 18000, '18': 20000, '19': 22000, '20': 25000,
  '21': 33000, '22': 41000, '23': 50000, '24': 62000, '25': 75000,
  '26': 90000, '27': 105000, '28': 120000, '29': 135000, '30': 155000,
};

/**
 * Normalize CR values from various formats to the string keys used in
 * CR_TO_XP. Handles: 0.125, 0.25, 0.5, "1/8", "1/4", "1/2", 5, "5", etc.
 */
export function normalizeCR(cr) {
  if (cr === undefined || cr === null) return '0';
  const s = String(cr);
  if (s.includes('/')) return s;
  const num = parseFloat(s);
  if (isNaN(num)) return '0';
  if (num === 0.125) return '1/8';
  if (num === 0.25) return '1/4';
  if (num === 0.5) return '1/2';
  return String(Math.floor(num));
}

/** XP award for a CR in any accepted format. Unknown CR scores 0. */
export function xpForCR(cr) {
  return CR_TO_XP[normalizeCR(cr)] || 0;
}

/**
 * 5e encounter multiplier (DMG p. 82). Adjusts tier up for small parties
 * (<3) and down for large ones (>5).
 *
 * An empty encounter returns 1 rather than falling through the table: at
 * `monsterCount` 0 the raw table would give tier 0, and a party of two
 * would then bump it to 1.5x of nothing. The caller relied on this guard
 * before the extraction; it is part of the rule, not a caller detail.
 */
export function multiplierFor(monsterCount, partySize) {
  if (monsterCount === 0) return 1;

  let tier;
  if (monsterCount <= 1) tier = 0;
  else if (monsterCount === 2) tier = 1;
  else if (monsterCount <= 6) tier = 2;
  else if (monsterCount <= 10) tier = 3;
  else if (monsterCount <= 14) tier = 4;
  else tier = 5;

  const multipliers = [1, 1.5, 2, 2.5, 3, 4];

  if (partySize < 3) tier = Math.min(tier + 1, 5);
  else if (partySize > 5) tier = Math.max(tier - 1, 0);

  return multipliers[tier];
}

/** Total players across party groups of `{ players, level }`. */
export function totalPlayers(partyGroups) {
  return partyGroups.reduce((sum, group) => sum + (Number(group.players) || 0), 0);
}

/** Total creatures across an encounter's `{ cr, quantity }` entries. */
export function totalMonsters(monsters) {
  return monsters.reduce((sum, m) => sum + (m.quantity || 1), 0);
}

/**
 * Party XP thresholds, summed across groups.
 *
 * `thresholdTable` is the `encounter_difficulty` array from
 * `src/data/encounter-difficulty.json`, indexed by level - 1. Groups with
 * no level or no players contribute nothing.
 */
export function thresholdsFor(partyGroups, thresholdTable) {
  let easy = 0, medium = 0, hard = 0, deadly = 0;

  partyGroups.forEach((group) => {
    const level = Number(group.level) || 0;
    const players = Number(group.players) || 0;
    const levelData = thresholdTable[level - 1];

    if (levelData && players > 0 && level > 0) {
      easy += levelData.Easy * players;
      medium += levelData.Medium * players;
      hard += levelData.Hard * players;
      deadly += levelData.Deadly * players;
    }
  });

  return { easy, medium, hard, deadly };
}

/** Unadjusted XP total: each creature's award times its quantity. */
export function rawXpFor(monsters) {
  return monsters.reduce((sum, m) => sum + xpForCR(m.cr) * (m.quantity || 1), 0);
}

/** Raw XP scaled by the encounter multiplier, floored. */
export function adjustedXpFor(monsters, partySize) {
  const count = totalMonsters(monsters);
  if (count === 0) return 0;
  return Math.floor(rawXpFor(monsters) * multiplierFor(count, partySize));
}

/**
 * Difficulty word for an adjusted XP total.
 *
 * 'None' means nothing to fight; 'Unknown' means the party isn't
 * configured, which is distinct from 'Trivial' (a real fight that is
 * beneath the easy threshold).
 */
export function difficultyFor(adjustedXp, thresholds) {
  if (adjustedXp === 0) return 'None';
  if (thresholds.easy === 0) return 'Unknown';
  if (adjustedXp >= thresholds.deadly) return 'Deadly';
  if (adjustedXp >= thresholds.hard) return 'Hard';
  if (adjustedXp >= thresholds.medium) return 'Medium';
  if (adjustedXp >= thresholds.easy) return 'Easy';
  return 'Trivial';
}
