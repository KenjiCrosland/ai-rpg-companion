/**
 * Rotate the static "(e.g., …)" tail on a register descriptor with
 * three fresh samples drawn from the register's character whitelist.
 *
 * Why this exists:
 *   The descriptors in `register-list.mjs` end with a static
 *   "(e.g., Name1, Name2, Name3)" tail that teaches DeepSeek the
 *   register's phonology. Fictional palettes (Goblin-inspired, Orcish,
 *   Elven, Draconic, Aberrant, Abyssal, Infernal, Primordial) ALSO ship
 *   a curated character whitelist (80–100 names) that the prompt
 *   injects separately. Production telemetry shows the static tail
 *   anchors the LLM hard — relationship name selection clusters on the
 *   three displayed examples (Skragbit / Mukgash / Krik-tak for goblin)
 *   even when the whitelist provides the full pool.
 *
 *   Solution: rewrite the tail with three random picks from the
 *   whitelist on every render. The displayed signal still teaches
 *   phonology; the names just vary so they don't anchor.
 *
 * Behavior:
 *   - Whitelisted register descriptor → tail replaced with three
 *     uniformly random picks from the pool, joined by ", " inside
 *     the existing "(e.g., …)" parentheses.
 *   - Non-whitelisted register descriptor (Welsh, Hungarian, Old Norse,
 *     etc.) → returned unchanged. The static examples are the only
 *     seeded names DeepSeek receives for these registers and need to
 *     stay as the model.
 *   - Empty / non-string input → returned unchanged.
 *
 * Pure: callers can inject `mathRandom` for deterministic tests.
 *
 * Whitelist lookup uses the registry's register-prefix axis
 * (origin parameter null), matching how the descriptor is rendered
 * downstream — by the register's prefix, not the resolved race.
 *
 * @param {string} registerDescriptor — the full descriptor string
 *        from `registerList`, e.g. "Goblin-inspired: sharp, crude,
 *        percussive (e.g., Skragbit, Mukgash, Krik-tak)".
 * @param {() => number} [mathRandom] — defaults to Math.random.
 * @returns {string}
 */
import { getCharacterWhitelistForGeneration } from '@/shared/character-whitelist-registry.mjs';

const EXAMPLE_TAIL = /\(e\.g\.,\s*[^)]*\)\s*$/;

export function rotateRegisterExamples(registerDescriptor, mathRandom = Math.random) {
  if (typeof registerDescriptor !== 'string' || !registerDescriptor) {
    return registerDescriptor;
  }
  const entry = getCharacterWhitelistForGeneration(null, registerDescriptor);
  if (!entry || !Array.isArray(entry.pool) || entry.pool.length === 0) {
    return registerDescriptor;
  }
  const pool = entry.pool;
  const wanted = Math.min(3, pool.length);
  const used = new Set();
  const picks = [];
  // Cap iterations defensively; with a 100-name pool, three fresh
  // picks are reached well before this bound.
  const maxAttempts = wanted * 20;
  let attempts = 0;
  while (picks.length < wanted && attempts < maxAttempts) {
    attempts += 1;
    const idx = Math.floor(mathRandom() * pool.length);
    if (used.has(idx)) continue;
    used.add(idx);
    picks.push(pool[idx]);
  }
  if (picks.length === 0) return registerDescriptor;
  const replacement = `(e.g., ${picks.join(', ')})`;
  if (EXAMPLE_TAIL.test(registerDescriptor)) {
    return registerDescriptor.replace(EXAMPLE_TAIL, replacement);
  }
  return `${registerDescriptor.replace(/\s+$/, '')} ${replacement}`;
}
