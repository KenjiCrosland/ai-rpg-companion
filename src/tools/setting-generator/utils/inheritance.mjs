/**
 * inheritance.mjs
 *
 * Dimension-inheritance rules for setting generation.
 *
 * The substrate currently rolls (or infers) register, character, tension,
 * and banned tropes independently per generation. Without inheritance,
 * sibling settings — those promoted from the same source item, or
 * sublocations sharing a parent — frequently diverge on register
 * (different cultural naming style) and character qualities (different
 * atmospheric mood), producing campaigns that feel patchwork even
 * when the LLM-side sibling-content threading is in place.
 *
 * The rules (per design spec, option A — "broad type only"):
 *
 *   - REGISTER propagates broadly. Same-type siblings inherit register
 *     from the first sibling. First-of-type inherits from parent (when
 *     a parent is in scope). Otherwise rolls.
 *
 *   - CHARACTER qualities inherit only within same-type siblings. The
 *     first-of-type rolls fresh from the type-appropriate pool.
 *
 *   - TENSION rolls fresh per generation. Different scales and aspects
 *     need their own dramatic shape; inheriting tension produces
 *     monotone campaigns.
 *
 *   - BANNED TROPES roll fresh per generation. Each generation gets
 *     its own anti-clustering pass.
 *
 * This module owns only the register + character override logic. The
 * caller (SettingGenerator) handles tension and banned tropes
 * independently (they were already always-fresh).
 *
 * "Sibling" definition (option A): any same-broad-type entity sharing
 * the same source. For settings, this means:
 *   - Sublocations: every other sublocation under the same parent,
 *     regardless of setting_type (town vs dungeon vs building).
 *   - Top-level seeded: every other setting promoted from the same
 *     source item.
 */

/**
 * Apply sibling-based inheritance to an initial dimensions object.
 *
 * If at least one sibling is present and exposes a non-null register
 * or character, that value overrides the initial one. Sibling fields
 * that are null fall through to the initial value — keeps inheritance
 * from clobbering well-inferred values with sibling holes.
 *
 * Pure function. Does not mutate inputs.
 *
 * @param {Object} dimensions - Initial dimensions before inheritance.
 *   Typically { register, character, ...other fields }. Other fields
 *   pass through untouched.
 * @param {Array<{register?: string|null, character?: any}>} siblings -
 *   Sibling entities (already filtered to "same type" by the caller).
 *   Order matters; first non-empty sibling's values take precedence.
 * @returns {Object} New dimensions with register/character potentially
 *   overridden.
 */
export function applyInheritanceFromSiblings(dimensions, siblings) {
  const base = dimensions || {};
  if (!Array.isArray(siblings) || siblings.length === 0) return { ...base };

  const first = siblings[0];
  if (!first || typeof first !== 'object') return { ...base };

  return {
    ...base,
    // First sibling's register wins when present (non-null, non-empty).
    // Falls through to the base value otherwise — so a sibling with
    // null register doesn't clobber an inferred or parent-derived one.
    register: first.register || base.register || null,
    // Character: same rule. Sibling's character (an array of qualities)
    // wins when present and non-empty.
    character:
      (Array.isArray(first.character) && first.character.length > 0)
        ? first.character
        : (base.character || null),
  };
}
