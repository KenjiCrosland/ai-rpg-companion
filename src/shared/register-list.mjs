/**
 * Language registers — purely linguistic. No thematic implications;
 * any register can pair with any origin. Adding entries here is always
 * allowed; removing requires considering whether any saved item lore
 * references the register.
 *
 * Registers themselves now live in `src/shared/registers/`. The big
 * registry (descriptors, pools, avoid-lists, flags) is consolidated
 * there — this file is now a thin set of derived views that the rest
 * of the codebase imports under its long-standing names:
 *   - `allLanguageRegisters` and `registerList` (descriptor strings)
 *   - `PROTECTED_REGISTER_PREFIXES` (gated by the flag below)
 *   - `THEMATIC_REGISTER_PREFIXES` and `humanoidRegisterList`
 *     (FANTASY_UNSPECIFIED routing for the NPC generator)
 *
 * The set is intentionally biased toward specific cultural-linguistic
 * traditions over generic regional categories. Earlier versions used
 * "Polynesian-inspired" / "Mesoamerican-inspired" / "West African-
 * inspired" / "Indigenous-North-American-inspired" / "Eastern
 * European-inspired" — those flatten distinct living cultures (Maori
 * ≠ Hawaiian, Maya ≠ Aztec, Yoruba ≠ Akan ≠ Igbo, etc.). Splits were
 * applied where DeepSeek demonstrably engages with the underlying
 * traditions distinctly. Generics that DeepSeek treats as a single
 * pastiche stay merged for now (e.g., Hindi/Sanskrit). Expansion is
 * open-ended; further splits are valid as the model's training
 * depth on individual traditions warrants them.
 *
 * Format: each register entry in the aggregator has a `descriptor` of
 * the form `<prefix>: <descriptor> (e.g., <Example1>, <Example2>,
 * <Example3>)` where <prefix> is the unique key the rest of the
 * register machinery (selectRegister, fantasyRaceConventionalRegisters,
 * orcGoblinExcludedRegisters, rotateRegisterExamples) refers to via
 * String#startsWith.
 *
 * PROTECTED-REGISTER FEATURE FLAG
 * ------------------------------
 *
 * `enableProtectedRegisters` gates every register whose entry sets
 * `protected: true` out of the consumer-facing `registerList` export.
 * `allLanguageRegisters` always returns the full set; downstream
 * protection machinery (catchall block, Yoruba/Andean pool prompts,
 * item-name avoid-lists, character-name whitelists) stays intact, so
 * flipping the flag back off is a one-line change.
 */

import { ALL_REGISTERS, REGISTERS_WITH_DESCRIPTOR } from '@/shared/registers/index.mjs';

/**
 * Protected-registers feature flag. Currently off — protected
 * registers (Maori, Yoruba, Andean, Japanese, Chinese, Lakota, etc.)
 * are filtered out of `registerList` in production. The flag was
 * briefly on during the per-register migration pilot so the new shape
 * could be exercised end-to-end against real generations; flipping
 * back to off re-engages the protective filter without losing the
 * consolidated data in `src/shared/registers/`.
 *
 * Re-enabling is a one-line change — set this to `true` and every
 * protected register becomes reachable again. The downstream
 * protection machinery (catchall block, pool prompts, character-name
 * whitelists, item-name avoid-lists) stays wired throughout the off
 * state.
 */
export const enableProtectedRegisters = false;

/**
 * Register prefixes shipped only when `enableProtectedRegisters` is true.
 * Derived from `ALL_REGISTERS` — every entry with `protected: true`
 * contributes its prefix.
 *
 * Membership is conservative: when in doubt, mark a register
 * `protected: true` in its registry entry. Western-canonical registers
 * (Latin-family, Norse-family, Germanic-family, Celtic-family, Slavic-
 * family, Hungarian, Finnish, Italian Renaissance, Old Occitan) and
 * fictional-fantasy registers (Elven, Draconic, Goblin, Orcish,
 * Gnomish, Aberrant, Abyssal, Infernal, Primordial, Technomagical) are
 * NOT protected.
 */
export const PROTECTED_REGISTER_PREFIXES = ALL_REGISTERS
  .filter(r => r.protected)
  .map(r => r.prefix);

/**
 * Every register descriptor in the system, including protected ones.
 * Tests and internal code that need the full picture import this.
 */
export const allLanguageRegisters = REGISTERS_WITH_DESCRIPTOR.map(r => r.descriptor);

/**
 * Consumer-facing register list. With `enableProtectedRegisters` off,
 * this is `allLanguageRegisters` minus every protected entry. With the
 * flag on (current production), it equals `allLanguageRegisters`.
 */
export const registerList = enableProtectedRegisters
  ? allLanguageRegisters
  : REGISTERS_WITH_DESCRIPTOR.filter(r => !r.protected).map(r => r.descriptor);

/**
 * Thematic registers describe cosmic genres (alien horror, demonic
 * realms, hellish power, primal elemental forces) rather than just
 * linguistic flavor. DeepSeek treats these as full genre commitments —
 * an NPC rolled with Aberrant tends to come out as a cosmic-horror
 * keeper; Infernal produces centuries-old oath-binders; Abyssal lands
 * on demonic envoys; Primordial drifts toward elemental wardens.
 *
 * The categorization gates the orchestrator's FANTASY_UNSPECIFIED
 * routing in the NPC generator: ambiguous fantasy inputs roll across
 * humanoid-only registers via `humanoidRegisterList` so the LLM
 * produces a normal person with cultural / species flavor. Thematic
 * registers still fire when the user explicitly invokes the genre, in
 * empty-input random selection (genre-shifts welcome), or in seeded
 * generations from already-thematic-coded source items.
 *
 * Draconic stays humanoid — the LLM reads it as dragonborn-style
 * naming, not a cosmic-genre commitment.
 *
 * Derived from `ALL_REGISTERS` — every entry with `thematic: true`
 * contributes its prefix.
 */
export const THEMATIC_REGISTER_PREFIXES = ALL_REGISTERS
  .filter(r => r.thematic)
  .map(r => r.prefix);

/**
 * Humanoid-only register pool — `registerList` minus the thematic
 * registers above. Used when the orchestrator wants random fantasy
 * naming variety without committing the NPC to a cosmic genre.
 * Inherits the protected-register filter from `registerList`, so
 * flipping `enableProtectedRegisters` automatically follows.
 */
export const humanoidRegisterList = registerList.filter(
  entry => !THEMATIC_REGISTER_PREFIXES.some(prefix => entry.startsWith(prefix)),
);
