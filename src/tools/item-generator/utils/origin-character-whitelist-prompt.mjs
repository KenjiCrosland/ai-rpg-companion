/**
 * Origin-keyed character-whitelist prompt-block builder.
 *
 * Parallel to `buildFictionalPaletteWhitelistBlock` but gated on
 * resolved origin instead of selected palette. Use case: origins like
 * Dwarven have a tightly-bound character-name pool that should fire
 * across every palette in the origin's allow-list — palette-keyed
 * routing wouldn't capture that without also firing for non-Dwarven
 * items that happen to land on the same palette.
 *
 * Conflict-of-precedence: see `origin-character-whitelists.mjs`
 * docblock. No overlap with per-palette whitelists today; if the two
 * mechanisms ever route the same generation to both, a precedence
 * rule needs to be added (most likely palette wins because it's more
 * specific to the rolled context).
 *
 * Item names, place names, and other lore elements stay freehand —
 * the whitelist applies only to the lore's single named character.
 */
import { getCharacterWhitelistForOrigin } from '@/data/cultural-pools/origin-character-whitelists.mjs';

/**
 * Origins that route through this builder. Lock against silent
 * additions/removals — adding an origin here without a registered
 * whitelist (or vice versa) is a routing bug.
 */
export const ORIGIN_CHARACTER_WHITELIST_NAMES = [
  'Dwarven',
];

export function isOriginWithCharacterWhitelist(resolvedOrigin) {
  if (typeof resolvedOrigin !== 'string') return false;
  return ORIGIN_CHARACTER_WHITELIST_NAMES.includes(resolvedOrigin);
}

export function buildOriginCharacterWhitelistBlock(resolvedOrigin) {
  if (!isOriginWithCharacterWhitelist(resolvedOrigin)) return '';

  const whitelist = getCharacterWhitelistForOrigin(resolvedOrigin);
  if (!whitelist || whitelist.length === 0) return '';

  return `NAMING — CHARACTER WHITELIST FOR ${resolvedOrigin.toUpperCase()} ORIGIN:

The lore's single named character (typically the creator, primary wielder, or key witness) MUST be picked from this curated list. Pick exactly one and use it as written; do NOT modify, compound, or affix it:

  ${whitelist.join(', ')}

Do NOT generate any character name outside this list, even if you know ${resolvedOrigin.toLowerCase()} naming conventions or the rolled palette's morphology — the list is the only permitted source for this generation's named character.

Item names, place names, and other lore elements stay freehand. The whitelist applies only to the named character.`;
}
