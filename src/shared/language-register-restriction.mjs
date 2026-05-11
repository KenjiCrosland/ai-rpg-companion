/**
 * language-register-restriction.mjs
 *
 * Shared prompt block for Western-fantasy-bound race contexts. Revokes
 * the LLM's "LANGUAGE REGISTER OVERRIDE" authority for Orcish/Goblinoid/
 * Dwarven/Gnomish/Elven contexts so creative re-association during
 * generation can't re-introduce the cross-cultural pairings the
 * structural register selection blocks.
 *
 * Used by the item generator's prompt and the NPC generator's prompt.
 * Future generators producing cultural-coded content (location, setting,
 * dungeon, …) will use the same helper.
 *
 * Per the architecture note in `select-register.mjs`'s
 * WESTERN_FANTASY_BOUND_RACES docblock, the block fires only when a
 * fantasy-race context resolves to one of those five. Cross-cultural-
 * archetype races (Fey, Giant) do not fire it.
 */

/**
 * Build the LANGUAGE REGISTER RESTRICTION prompt block.
 *
 * @param {Object} args
 * @param {string} args.register — full pre-selected register descriptor
 *                                 (e.g. "Old-Norse-inspired: Eddaic …").
 *                                 Used both as the in-block reference
 *                                 register and as the fallback target.
 * @param {boolean} args.isWesternFantasyRaceContext — when false, the
 *                                                     helper returns ''.
 * @param {string} [args.entityNoun] — the kind of entity being
 *                                     generated. "item" / "NPC" / etc.
 *                                     Phrasing reads naturally in
 *                                     either case ("This {noun} is in
 *                                     a Western-fantasy-bound …").
 *                                     Defaults to 'item' for backwards
 *                                     compatibility with the item
 *                                     generator's existing usage.
 * @returns {string}
 */
export function buildLanguageRegisterRestrictionBlock({
  register,
  isWesternFantasyRaceContext,
  entityNoun = 'item',
}) {
  if (!isWesternFantasyRaceContext) return '';
  return `LANGUAGE REGISTER RESTRICTION — WESTERN-FANTASY-BOUND RACE CONTEXT (OVERRIDES THE AUTHORITY ABOVE):

This ${entityNoun} is in a Western-fantasy-bound race context (origin or user-typed keyword indicates one of: Orcish, Goblinoid, Dwarven, Gnomish, Elven). These five fantasy-race categories are Norse/Germanic/Celtic-coded archetypes with no parallels in most non-Western mythological traditions. Pairing them with non-Western linguistic registers doesn't include those cultures in fantasy; it conscripts those cultures' linguistic registers to decorate Western archetypes — a documented appropriation pattern in fantasy media. Orcs and goblins additionally carry documented racial-proxy history with non-European real-world peoples, making the pattern especially acute for those two.

The LANGUAGE REGISTER OVERRIDE authority above is REVOKED for this generation. You must NOT generate names — for the ${entityNoun}, characters, factions, or locations — in any of the following registers, even if you would otherwise infer them from the user's input or from creative association:

- Yoruba, Akan, Igbo, Swahili, or any other African real-world tradition
- Arabic, Persian
- Hindi, Sanskrit
- Chinese, Japanese, Korean, Mongolian, Tibetan, Thai
- Maori, Hawaiian, or other Pacific Islander traditions
- Maya, Aztec/Nahuatl, Andean, or other Latin American Indigenous traditions
- Lakota or other North American Indigenous traditions

This restriction is absolute. It is not subject to creative reinterpretation, "translation" framing, or unconventional-pairing reasoning. If the user's input mentions something that would normally trigger one of these registers (e.g., a place name, a deity, a cultural artifact), use the pre-selected register ("${register}") instead.

Allowed registers for this generation:
- Pre-selected register: "${register}" (use this by default)
- European real-world: Latin, Greek, Slavic, Russian, Romanian, Hungarian, Norse, Germanic, Celtic
- Fantasy-fictional: Elven, Draconic, Goblin-inspired, Orcish, Aberrant, Abyssal, Infernal, Primordial, Technomagical

Do not produce any name in this generation that would identify with the restricted-register list above. This applies to ALL names: ${entityNoun}, characters, factions, places, no exceptions.
`;
}
