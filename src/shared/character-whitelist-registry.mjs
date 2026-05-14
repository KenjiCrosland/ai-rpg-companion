/**
 * Unified character-whitelist registry.
 *
 * Two keying axes, both derived from `ALL_REGISTERS` in
 * `src/shared/registers/index.mjs`:
 *
 *   ORIGIN_CHARACTER_WHITELISTS  — keyed by origin name (Orcish,
 *     Dwarven, etc.). Fires whenever the user picks that origin,
 *     regardless of which register in the origin's allow-list gets
 *     rolled. Use case: origins whose character names work across
 *     multiple registers (Dwarven names work in Old-Norse, Anglo-
 *     Saxon, etc.; Elven Elven names are characteristically elven
 *     across the Elven allow-list).
 *
 *     Derived from every register entry with `fantasyRaceKey`. Each
 *     such entry's `fantasyRaceKey` becomes the origin-axis key; its
 *     `characterPool` and `characterPoolStrictness` populate the
 *     value.
 *
 *   REGISTER_CHARACTER_WHITELISTS — keyed by register prefix
 *     (Elven, Draconic, etc.). Fires when the rolled register matches
 *     and no origin pool already routed. Catches edge cases where a
 *     register is rolled outside its primary origin (e.g., Elven via
 *     Aberrant alt-pool, dev override) and where the register is its
 *     own primary identifier (fictional palettes Draconic/Aberrant/
 *     etc. — origin = register name 70% of the time, alt-pool 30%).
 *
 *     Derived from every register entry with `prefix` AND `characterPool`.
 *
 * Lookup precedence: origin-bound wins over register-bound when both
 * match. This pins the architectural commitment that race-origin
 * pools (Orcish, Goblinoid, Elven, Dwarven) drive naming regardless
 * of which Western register gets rolled.
 *
 * Strictness:
 *
 *   `mandatory` — pool fires 100% of generations when context matches.
 *     Used for Orcish/Goblinoid (the curated pool IS the only
 *     permitted source) and the Maori protected pool. Signals "this
 *     pool is the protective architecture; bypassing it produces
 *     unsafe outputs."
 *
 *   `preferred` — pool fires 70% of generations when context matches;
 *     30% of the time the gate skips and the LLM constructs the name
 *     freehand in the rolled register. Used for Elven, Dwarven, and
 *     fictional thematic registers (Draconic/Aberrant/Abyssal/
 *     Infernal/Primordial). The 30% non-pool case is automatically
 *     constrained to the origin's allow-list (selectRegister already
 *     rolls within the allow-list), so the freehand name stays
 *     on-register — it's just not from the curated pool.
 */
import { ALL_REGISTERS } from '@/shared/registers/index.mjs';

export const ORIGIN_CHARACTER_WHITELISTS = Object.fromEntries(
  ALL_REGISTERS
    .filter(r => r.fantasyRaceKey && Array.isArray(r.characterPool))
    .map(r => [
      r.fantasyRaceKey,
      {
        pool: r.characterPool,
        strictness: r.characterPoolStrictness ?? 'preferred',
        scope: r.whitelistScope ?? 'primary',
      },
    ]),
);
// Note: Gnomish, Giant, and Fey are deliberately absent. Gnomish and
// Giant fall through to freehand construction in their rolled
// register; Fey is not in fantasyRaceConventionalRegisters at all
// (cross-cultural archetype — Fey items pair freely with any palette
// via uniform random).

export const REGISTER_CHARACTER_WHITELISTS = Object.fromEntries(
  ALL_REGISTERS
    .filter(r => typeof r.prefix === 'string' && Array.isArray(r.characterPool))
    .map(r => [
      r.prefix,
      {
        pool: r.characterPool,
        strictness: r.characterPoolStrictness ?? 'preferred',
        scope: r.whitelistScope ?? 'primary',
      },
    ]),
);
// Note: Goblin-inspired and Orcish appear in both maps because their
// registers carry both a fantasyRaceKey and a register prefix. The
// origin-axis entry fires when the caller resolves a Goblinoid/Orcish
// race (item generator path, or NPC generator with a goblin/orc
// keyword in input). The register-axis entry fires when no race
// resolved but the random fallback landed on the register anyway (NPC
// generator with empty / non-goblin input). Either path produces an
// NPC the user will read as a goblin/orc, so the protective whitelist
// must fire either way.

const PREFERRED_PROBABILITY = 0.7;

/**
 * Look up the active character whitelist for a generation, given the
 * resolved origin and rolled register. Origin-bound wins over
 * register-bound on collision.
 *
 * @returns {{ pool: string[], strictness: 'mandatory' | 'preferred', scope: 'primary' | 'all-characters' } | null}
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
