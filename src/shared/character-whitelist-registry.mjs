/**
 * Unified character-whitelist registry.
 *
 * Replaces the previous split between `register-whitelists.mjs` (per-
 * register character pools) and `origin-character-whitelists.mjs`
 * (per-origin character pools). Same data, single lookup, with an
 * explicit `strictness` tag on each entry that gates whether the
 * whitelist injection fires deterministically (`mandatory`) or via a
 * 70/30 random gate (`preferred`).
 *
 * Two keying axes:
 *
 *   ORIGIN_CHARACTER_WHITELISTS  — keyed by origin name (Orcish,
 *     Dwarven, etc.). Fires whenever the user picks that origin,
 *     regardless of which register in the origin's allow-list gets
 *     rolled. Use case: origins whose character names work across
 *     multiple registers (Dwarven names work in Old-Norse, Anglo-
 *     Saxon, etc.; Sindarin Elven names are characteristically elven
 *     across the Elven allow-list).
 *
 *   REGISTER_CHARACTER_WHITELISTS — keyed by register prefix
 *     (Sindarin-inspired, Draconic, etc.). Fires when the rolled
 *     register matches and no origin pool already routed. Catches
 *     edge cases where a register is rolled outside its primary
 *     origin (e.g., Sindarin via Aberrant alt-pool, horror pool, dev
 *     override) and where the register is its own primary identifier
 *     (fictional palettes Draconic/Aberrant/etc. — origin = register
 *     name 70% of the time, alt-pool 30%; whitelist fires on the 70%
 *     case automatically because origin's primary register equals the
 *     pool's key).
 *
 * Lookup precedence: origin-bound wins over register-bound when both
 * match. This pins the architectural commitment that race-origin
 * pools (Orcish, Goblinoid, Elven, Dwarven) drive naming regardless
 * of which Western register gets rolled.
 *
 * Strictness:
 *
 *   `mandatory` — pool fires 100% of generations when context matches.
 *     No 70/30 gate. Used for Orcish/Goblinoid (the curated pool IS
 *     the only permitted source) and reserved for future culturally-
 *     sensitive registers (Maori, Andean) when those flag-gate back
 *     on. The strictness signals "this pool is the protective
 *     architecture; bypassing it produces unsafe outputs."
 *
 *   `preferred` — pool fires 70% of generations when context matches;
 *     30% of the time the gate skips and the LLM constructs the name
 *     freehand in the rolled register. Used for Elven, Dwarven, and
 *     fictional registers (Sindarin/Draconic/Aberrant/Abyssal/
 *     Infernal/Primordial). The 30% non-pool case is automatically
 *     constrained to the origin's allow-list (selectRegister
 *     already rolls within the allow-list), so the freehand name
 *     stays on-register — it's just not from the curated pool.
 *
 * Currently-flag-gated entries: Maori-inspired and Andean-inspired
 * are commented out below — those registers are unreachable under
 * `enableProtectedRegisters: false` and the catchall/yoruba/andean
 * prompt builders already return empty strings for them. When the
 * flag flips on, uncomment and the unified mechanism takes over.
 */
import { aberrantCharacterEpithets } from '@/shared/registers/aberrant.mjs';
import { abyssalCharacterEpithets } from '@/shared/registers/abyssal.mjs';
import { draconicCharacterEpithets } from '@/shared/registers/draconic.mjs';
import { dwarvenCharacterEpithets } from '@/shared/registers/dwarven.mjs';
import { goblinoidCharacterEpithets } from '@/shared/registers/goblinoid.mjs';
import { infernalCharacterEpithets } from '@/shared/registers/infernal.mjs';
import { orcishCharacterEpithets } from '@/shared/registers/orcish.mjs';
import { primordialCharacterEpithets } from '@/shared/registers/primordial.mjs';
import { sindarinCharacterEpithets } from '@/shared/registers/sindarin.mjs';

export const ORIGIN_CHARACTER_WHITELISTS = {
  'Orcish':    { pool: orcishCharacterEpithets,             strictness: 'mandatory' },
  'Goblinoid': { pool: goblinoidCharacterEpithets,       strictness: 'mandatory' },
  'Elven':     { pool: sindarinCharacterEpithets, strictness: 'preferred' },
  'Dwarven':   { pool: dwarvenCharacterEpithets,  strictness: 'preferred' },
  // Gnomish, Giant, Fey: deliberately absent. Gnomish and Giant fall
  // through to freehand construction in their rolled register; Fey is
  // not in fantasyRaceConventionalRegisters at all (cross-cultural
  // archetype — Fey items pair freely with any palette via uniform
  // random).
};

export const REGISTER_CHARACTER_WHITELISTS = {
  // Fictional registers. Fire when the matching register is rolled —
  // typically the 70% primary case for the matching fictional origin
  // (selectRegister.fictionalOriginRegisters), or the rare
  // case where the register is rolled outside its primary origin
  // (Sindarin via Aberrant/horror alt-pool, dev override).
  'Sindarin-inspired': { pool: sindarinCharacterEpithets, strictness: 'preferred' },
  'Draconic':          { pool: draconicCharacterEpithets, strictness: 'preferred' },
  'Aberrant':          { pool: aberrantCharacterEpithets, strictness: 'preferred' },
  'Abyssal':           { pool: abyssalCharacterEpithets,  strictness: 'preferred' },
  'Infernal':          { pool: infernalCharacterEpithets, strictness: 'preferred' },
  'Primordial':        { pool: primordialCharacterEpithets, strictness: 'preferred' },
  // Maori-inspired (mandatory): currently flag-gated off; when
  // enableProtectedRegisters flips on, restore this entry pointing
  // to the Maori curated pool.
  // Andean-inspired (mandatory): same as Maori — flag-gated, restore
  // when enabling.
};

const PREFERRED_PROBABILITY = 0.7;

/**
 * Look up the active character whitelist for a generation, given the
 * resolved origin and rolled register. Origin-bound wins over
 * register-bound on collision.
 *
 * @returns {{ pool: string[], strictness: 'mandatory' | 'preferred' } | null}
 */
export function getCharacterWhitelistForGeneration(resolvedOrigin, selectedRegister) {
  if (typeof resolvedOrigin === 'string' && ORIGIN_CHARACTER_WHITELISTS[resolvedOrigin]) {
    return ORIGIN_CHARACTER_WHITELISTS[resolvedOrigin];
  }
  if (typeof selectedRegister === 'string') {
    for (const [prefix, entry] of Object.entries(REGISTER_CHARACTER_WHITELISTS)) {
      if (selectedRegister.startsWith(prefix)) return entry;
    }
  }
  return null;
}

/**
 * Decide whether to inject the whitelist for a given strictness.
 * Pure function with optional injected randomness for testing.
 *
 *   mandatory → always true
 *   preferred → true iff mathRandom < 0.7
 *
 * Default `mathRandom` calls Math.random() lazily at invocation time
 * (JS default-parameter evaluation is lazy).
 */
export function shouldInjectWhitelist(strictness, mathRandom = Math.random()) {
  if (strictness === 'mandatory') return true;
  if (strictness === 'preferred') return mathRandom < PREFERRED_PROBABILITY;
  return false;
}
