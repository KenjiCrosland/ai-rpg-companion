/**
 * Origin-keyed character whitelists.
 *
 * Parallel to `paletteCharacterEpithetWhitelists` (which is keyed by
 * palette prefix), this map is keyed by ORIGIN. The use case: an
 * origin like Dwarven has a tightly-bound character-name pool that
 * should fire across all the palettes in its allow-list (Old-Norse,
 * Anglo-Saxon, Old-High-German, Middle-High-German, Gothic) — the
 * names are characteristically dwarven regardless of which Germanic-
 * family register gets rolled. Per-palette routing wouldn't capture
 * that: registering the dwarven pool for "Old-Norse-inspired" alone
 * would also fire it for non-Dwarven items that happen to land on
 * Old-Norse (Goblinoid + Old-Norse, Orcish + Old-Norse, etc.).
 *
 * Origin-keying solves this. The lookup is gated on `resolvedOrigin`,
 * not on the rolled palette.
 *
 * Conflict-of-precedence note: if a future palette whitelist is
 * registered for a palette that an origin's allow-list routes to
 * (e.g., a hypothetical Sindarin palette whitelist + Elven origin
 * whitelist), both would fire and produce contradictory injection
 * blocks. No such overlap exists today (Dwarven's allow-list palettes
 * have no per-palette whitelists; Sindarin's per-palette whitelist
 * has no per-origin whitelist). When the conflict actually arises, a
 * precedence rule needs to be added in the prompt-block wiring (most
 * likely: palette whitelist wins because it's more specific to the
 * rolled context). For now the wiring assumes disjointness.
 *
 * Curation guidance: same as the per-palette whitelists. Reject
 * Tolkien-published character names and D&D-canon character names /
 * close derivatives. Public-domain / pattern-following originals are
 * permitted. See `palette-whitelists.mjs` docblock for the full
 * rationale.
 */
import { dwarvenCharacterEpithets } from './dwarven.mjs';

export const originCharacterEpithetWhitelists = {
  'Dwarven': dwarvenCharacterEpithets,
};

/**
 * Look up the character whitelist for a given origin. Returns the
 * array of epithet strings if a whitelist exists for this origin, or
 * null if the origin has no whitelist.
 */
export function getCharacterWhitelistForOrigin(resolvedOrigin) {
  if (typeof resolvedOrigin !== 'string') return null;
  return originCharacterEpithetWhitelists[resolvedOrigin] || null;
}
