/**
 * detectRegisterFromInput — keyword-driven cultural-register detection.
 *
 * Status: deprecated / no-op.
 *
 * The cultural-language detection map (~30 entries spanning Japanese,
 * Maori, Yoruba, Lakota, Russian, Hungarian, Latin, Greek, Norse, etc.)
 * was deleted during the per-register migration sweep. It was vestigial
 * for two reasons:
 *
 *   1. Protected registers were flag-gated off in production for most
 *      of the map's life, so cultural-keyword detection routing to
 *      Maori / Yoruba / Andean / etc. was unreachable at runtime.
 *
 *   2. The prompt already carries a LANGUAGE REGISTER OVERRIDE block
 *      authorizing the LLM to detect cultural signals from its own
 *      training and switch register accordingly ("Akiko → Japanese,"
 *      "Olaf → Norse," "Inkari → Andean"). The hand-curated keyword
 *      map was a redundant safety net for traditions where the LLM
 *      has strong training coverage anyway.
 *
 * Fantasy-race detection (elven, goblin, orc, dwarven, gnomish, giant)
 * still happens — it lives in `resolveFantasyRace` in
 * `select-register.mjs`, unaffected by this deletion.
 *
 * Aesthetic-origin detection (fey, draconic, infernal, abyssal, etc.)
 * still happens — it lives in `aestheticOriginKeywords` in
 * `select-register.mjs`, unaffected by this deletion.
 *
 * The function shape stays so existing callers (selectRegister,
 * ItemGenerator.vue, item-storage backfill) don't need to change.
 * Calls always return null; the LLM's override authority handles
 * cultural detection.
 *
 * @param {string} userInput  — combined name + lore. Ignored.
 * @param {string[]} registerList  — full register pool. Ignored.
 * @returns {null}
 */
export function detectRegisterFromInput(_userInput, _registerList) {
  return null;
}
