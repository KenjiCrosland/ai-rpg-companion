/**
 * Unified character-whitelist prompt-block builder.
 *
 * Replaces the previous per-mechanism builders
 * (buildFictionalRegisterWhitelistBlock,
 * buildOriginCharacterWhitelistBlock, the whitelist-injection portion
 * of buildCatchallPromptBlock, and rotateRegisterExamples) with a
 * single block that consumes the unified registry at
 * `src/shared/registers/character-whitelist-registry.mjs`.
 *
 * Routing decision: the registry's `getCharacterWhitelistForGeneration`
 * looks up the right pool, strictness, and scope. The strictness gate
 * (`shouldInjectWhitelist`) decides whether to fire — mandatory always,
 * preferred 70% of the time. When the gate fails (or no pool matches),
 * the builder returns empty string and the LLM constructs the name
 * freehand in the rolled register.
 *
 * Scope branches on the registry entry's `scope` field:
 *
 *   'primary' (default) — whitelist governs the lore's single named
 *     character. Secondary characters can be named freehand in the
 *     register's morphology or described by role. This is the
 *     historical behavior and the default for every register that
 *     doesn't opt into the strict scope.
 *
 *   'all-characters' — whitelist governs ALL named characters in the
 *     output (primary + every secondary). The LLM is forbidden from
 *     inventing any register-language name. Secondary characters
 *     either draw additional entries from the same pool, or get
 *     described by role only. Used for registers where freehand name
 *     construction reliably surfaces culturally-loaded vocabulary
 *     even when individual outputs look invented (Arabic is the pilot
 *     register — freehand was producing "Yathrib bint Karif" and
 *     "Faridah bint Qays" despite the rules).
 *
 * @param {string} resolvedOrigin
 * @param {string} selectedRegister
 * @param {number} [mathRandom] — optional injected randomness for
 *   deterministic testing. Defaults to a fresh Math.random() call.
 * @returns {string} the prompt block, or empty string when no pool
 *   matches or the strictness gate fails.
 */
import {
  getCharacterWhitelistForGeneration,
  shouldInjectWhitelist,
} from '@/shared/character-whitelist-registry.mjs';

export function buildCharacterWhitelistBlock(resolvedOrigin, selectedRegister, mathRandom) {
  const entry = getCharacterWhitelistForGeneration(resolvedOrigin, selectedRegister);
  if (!entry) return '';
  if (!shouldInjectWhitelist(entry.strictness, mathRandom)) return '';

  if (entry.scope === 'all-characters') {
    return `NAMING — CHARACTER WHITELIST FOR THIS GENERATION (STRICT MODE):

This register uses STRICT whitelist mode. EVERY character named anywhere in the output — the primary character AND every secondary character named in lore prose (apprentices, masters, ancestors, named relatives, named adversaries, witnesses, recipients) — MUST come from this curated list:

  ${entry.pool.join(', ')}

Use entries as written; do NOT modify, compound, or affix them. Do NOT invent any character name outside this list. Even if you know the register's morphology, the list is the only permitted source for ALL character names in this generation.

When the lore requires more than one named character, draw additional names from this same list (each entry used once at most). When a name isn't strictly needed, refer to secondary characters by role only ('the elder of the salt-clan,' 'the apprentice carver,' 'the keeper of the precinct,' 'a stranger at the diyafa-fire'). Do NOT invent a name when describing a role would do.

This overrides the 'ONE character name' rule elsewhere in the prompt — multiple names from the whitelist are permitted; no name from outside the whitelist is permitted in any role.

Item names, place names, and other lore elements stay freehand. The whitelist governs character names only.`;
  }

  return `NAMING — CHARACTER WHITELIST FOR THIS GENERATION:

The lore's single named character (typically the creator, primary wielder, or key witness) MUST be picked from this curated list. Pick exactly one and use it as written; do NOT modify, compound, or affix it:

  ${entry.pool.join(', ')}

Do NOT generate any character name outside this list, even if you know the register's morphology — the list is the only permitted source for this generation's named character.

Item names, place names, and other lore elements stay freehand. The whitelist applies only to the named character.`;
}
