/**
 * Fictional-fantasy palette whitelist prompt-block builder.
 *
 * Parallel to (and disjoint from) the catchall prompt-block builder.
 * The catchall handles real-world cultural palettes (Maori, Hindi/
 * Sanskrit, Japanese, etc.) where the prompt must constrain naming
 * density, prohibit real religious/historical figures, and enforce
 * English-descriptive forms for places and spirits. None of those
 * constraints fit fictional-fantasy palettes (Sindarin, Draconic,
 * Aberrant, Abyssal, Infernal, Primordial), where the register has
 * no real-world referents to protect and the lore SHOULD have item
 * names, place names, and lore elements in the palette's register.
 *
 * What this builder does: when a fictional-fantasy palette has a
 * registered character-name whitelist (in `palette-whitelists.mjs`),
 * inject a "pick the named character from this curated list" block.
 * The whitelist's purpose is sub-convention diversity — each list
 * spans ~80 names across 6-8 sub-conventions so that one-name-per-
 * generation rotation produces variety across many items, rather
 * than a monotonous register.
 *
 * Disjointness from catchall:
 *   - `CATCHALL_PALETTE_PREFIXES` excludes fictional-fantasy palettes
 *     by design (the spec pins this).
 *   - `FICTIONAL_PALETTE_WHITELIST_PREFIXES` here lists only the
 *     fictional palettes that have whitelists registered.
 *   - The two sets must remain disjoint. The integrity test in this
 *     module's spec asserts the disjointness.
 *
 * Item-name construction stays freehand for these palettes — no
 * avoid-list, no real-figure caution. Fictional registers don't have
 * real-world dual-meaning sacred-adjacent words to fence off.
 */
import { getWhitelistForPalette } from '@/data/cultural-pools/palette-whitelists.mjs';

/**
 * Palette prefixes whose whitelist is routed through this fictional-
 * palette block (rather than the catchall). Membership lock: every
 * entry here must
 *   (a) have a registered whitelist in
 *       `paletteCharacterEpithetWhitelists`, and
 *   (b) NOT appear in `CATCHALL_PALETTE_PREFIXES`.
 *
 * Both invariants are spec-tested.
 */
export const FICTIONAL_PALETTE_WHITELIST_PREFIXES = [
  'Draconic',
  'Aberrant',
  'Abyssal',
  'Sindarin-inspired',
  'Infernal',
  'Primordial',
];

export function isFictionalPaletteWithWhitelist(selectedPalette) {
  if (typeof selectedPalette !== 'string') return false;
  return FICTIONAL_PALETTE_WHITELIST_PREFIXES.some(
    prefix => selectedPalette.startsWith(prefix),
  );
}

export function buildFictionalPaletteWhitelistBlock(selectedPalette) {
  if (!isFictionalPaletteWithWhitelist(selectedPalette)) return '';

  const whitelist = getWhitelistForPalette(selectedPalette);
  if (!whitelist || whitelist.length === 0) return '';

  return `NAMING — CHARACTER WHITELIST FOR THIS PALETTE:

The lore's single named character (typically the creator, primary wielder, or key witness) MUST be picked from this curated list. Pick exactly one and use it as written; do NOT modify, compound, or affix it:

  ${whitelist.join(', ')}

Do NOT generate any character name outside this list, even if you know the palette's naming morphology — the list is the only permitted source for this generation's named character.

Item names, place names, and other lore elements stay freehand in the palette's register. The whitelist applies only to the named character. Construct other proper nouns from non-character word components consistent with the palette's phonetic conventions.`;
}
