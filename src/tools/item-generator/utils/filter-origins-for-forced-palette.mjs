/**
 * TEST-PALETTE-OVERRIDE — REMOVE WHEN YORUBA TESTING COMPLETE
 *
 * filterOriginsForForcedPalette — when the dev override forces a
 * specific naming palette, this helper filters the random origin pool
 * to exclude origins whose architectural protection would override
 * the forced palette. Without it, the dev picks (e.g.) Maori, the
 * random origin selector picks Goblinoid, the orc/goblin allow-list
 * rejects Maori, and the dev never sees their forced palette
 * actually fire.
 *
 * Architectural commitment preserved: protection layers (orc/goblin
 * allow-list, horror-coded origin pool) ALWAYS win against a forced
 * palette. This filter doesn't bypass them — it removes origins from
 * the random pool that would force such a protection-vs-override
 * conflict, leaving only origins where the forced palette is
 * architecturally valid.
 *
 * Pure function: takes the eligible origins array and the forced
 * palette string, returns a filtered array. No side effects, no
 * dependencies on Vue refs or component state. Imports the
 * restriction maps from select-language-palette.mjs (the source of
 * truth for what's protected).
 *
 * @param {string[]} eligibleOrigins — pre-filtered origin pool from
 *                                     mood-compatibility resolution.
 * @param {string|null|undefined} forcedPalette — the override palette
 *                                                 string, or falsy if
 *                                                 no override is set.
 * @returns {string[]} — the filtered eligible-origin pool. When no
 *                       override is set, returns the input unchanged.
 */

import {
  WESTERN_FANTASY_BOUND_RACES,
  fantasyRaceConventionalPalettes,
  horrorRestrictedOrigins,
  horrorOriginPalettePool,
} from './select-language-palette.mjs';

export function filterOriginsForForcedPalette(eligibleOrigins, forcedPalette) {
  if (!forcedPalette || typeof forcedPalette !== 'string') {
    return eligibleOrigins;
  }

  let filtered = eligibleOrigins;

  // Western-fantasy-bound races (Orcish / Goblinoid / Dwarven /
  // Gnomish / Elven): each is restricted to a curated palette
  // allow-list. If the forced palette isn't in a given race's
  // allow-list, exclude that race — picking it would trigger the
  // allow-list protection and override the forced palette. Data-
  // driven on WESTERN_FANTASY_BOUND_RACES, so adding a race to that
  // list automatically extends the filter.
  for (const race of WESTERN_FANTASY_BOUND_RACES) {
    const racePool = fantasyRaceConventionalPalettes[race];
    if (!racePool.some(prefix => forcedPalette.startsWith(prefix))) {
      filtered = filtered.filter(o => o !== race);
    }
  }

  // Horror-coded aesthetic origins: if the forced palette isn't in the
  // horror pool, exclude every horror-restricted origin — picking any
  // of them would trigger the horror-pool protection.
  const inHorrorPool = horrorOriginPalettePool.some(prefix =>
    forcedPalette.startsWith(prefix),
  );
  if (!inHorrorPool) {
    filtered = filtered.filter(o => !horrorRestrictedOrigins.includes(o));
  }

  return filtered;
}
