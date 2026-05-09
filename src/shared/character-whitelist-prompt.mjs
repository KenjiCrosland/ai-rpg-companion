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
 * looks up the right pool and strictness. The strictness gate
 * (`shouldInjectWhitelist`) decides whether to fire — mandatory always,
 * preferred 70% of the time. When the gate fails (or no pool matches),
 * the builder returns empty string and the LLM constructs the name
 * freehand in the rolled register.
 *
 * Block content: a single uniform "pick from this curated list" block
 * regardless of strictness mode. Strictness affects firing frequency,
 * not block wording — LLMs are unreliable at probabilistic instructions
 * ("follow this 70% of the time") so the gate runs in code.
 *
 * Item names, place names, and other lore elements stay freehand —
 * the whitelist applies only to the lore's single named character.
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

  return `NAMING — CHARACTER WHITELIST FOR THIS GENERATION:

The lore's single named character (typically the creator, primary wielder, or key witness) MUST be picked from this curated list. Pick exactly one and use it as written; do NOT modify, compound, or affix it:

  ${entry.pool.join(', ')}

Do NOT generate any character name outside this list, even if you know the register's morphology — the list is the only permitted source for this generation's named character.

Item names, place names, and other lore elements stay freehand. The whitelist applies only to the named character.`;
}
