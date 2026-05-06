/**
 * selectLanguagePalette — pick a naming palette using a three-tier
 * priority order designed to honor the user's strongest signal.
 *
 * The origin-language separation refactor decoupled origin (thematic)
 * from palette (linguistic) so they can pair freely. That decoupling
 * surfaced two issues:
 *
 *   1. Fantasy-race origins (Elven, Dwarven, Orcish, Goblinoid, Gnomish,
 *      Giant) were getting unconventional palette pairings too often.
 *      Genre conventions strongly associate elves with Sindarin-style
 *      naming, dwarves with Germanic, orcs with Orcish-phonetic, etc.
 *      Fully uniform-random palette selection ignored those conventions
 *      entirely. The fix: 70% chance conventional, 30% chance other —
 *      preserves architectural flexibility while respecting genre.
 *
 *   2. Cultural-linguistic signals in user input (proper names, place
 *      names) were sometimes being overridden by random palette rolls.
 *      Already handled by detectLanguageFromUserInput; this function
 *      preserves that as priority 1.
 *
 * Priority order:
 *   1. Cultural detection from user input. "Akiko" → Japanese. "Olaf"
 *      → Norse. "Mjolnir" → Norse. Highest authority — the user's
 *      input is the strongest signal.
 *   2. Fantasy-race weighted selection. Triggered when the user
 *      signals a fantasy race (dropdown selection or keyword in
 *      input). 70% conventional, 30% any other.
 *   3. Uniform random across the full palette pool. No signal, no
 *      weighting.
 *
 * @param {string|null} resolvedOrigin — the determined origin (may be
 *                                       null if user input is unresolved).
 * @param {string} userInput — combined name + lore.
 * @param {string[]} languagePalettes — full palette pool to select from.
 * @param {Function} detectLanguageFn — injected detection function
 *                                      (typically detectLanguageFromUserInput).
 * @returns {string} — the selected palette string.
 */

/**
 * Maps fantasy-race origins to their conventional language palette
 * (the prefix of the palette string in languagePalettes that strongly
 * associates with the race in genre convention). Only the six core
 * fantasy races are included — aesthetic origins (Celestial, Fey,
 * Necromantic, etc.) deliberately have no conventional palette and
 * pair freely with any linguistic register.
 */
export const fantasyRaceOriginConventionalPalettes = {
  'Elven': 'Sindarin-inspired',
  'Dwarven': 'Germanic-inspired',
  'Orcish': 'Orcish',
  'Goblinoid': 'Goblin-inspired',
  'Gnomish': 'Gnomish',
  'Giant': 'Norse-inspired',
};

/**
 * Maps fantasy-race origins to keywords that signal the race when
 * present in user-provided name or lore. Used to detect fantasy-race
 * intent even when the user hasn't explicitly selected from the
 * dropdown — e.g., "ancient elven longbow" in lore triggers Elven
 * race weighting via the "elven" keyword.
 */
export const fantasyRaceKeywords = {
  'Elven':     ['elf', 'elven', 'elvish', 'elves'],
  'Dwarven':   ['dwarf', 'dwarven', 'dwarvish', 'dwarves'],
  'Orcish':    ['orc', 'orcish', 'orcs'],
  'Goblinoid': ['goblin', 'goblinoid', 'goblins', 'hobgoblin', 'hobgoblins'],
  'Gnomish':   ['gnome', 'gnomish', 'gnomes'],
  'Giant':     ['giant', 'giants'],
};

/** Probability that a fantasy-race-signaled palette selection picks the
 *  conventional palette (Sindarin for Elven, Germanic for Dwarven, etc.).
 *  The remaining (1 - this) probability picks any other palette uniformly.
 *  See selectLanguagePalette's docblock for the reasoning. */
const FANTASY_RACE_CONVENTIONAL_PROBABILITY = 0.7;

export function selectLanguagePalette(
  resolvedOrigin,
  userInput,
  languagePalettes,
  detectLanguageFn,
) {
  // Priority 1: cultural detection from user input.
  const culturalDetection = detectLanguageFn(userInput, languagePalettes);
  if (culturalDetection) {
    return culturalDetection;
  }

  // Priority 2: fantasy-race weighted selection.
  let fantasyRace = null;

  // 2a. Check the dropdown origin — does it signal a core fantasy race?
  if (resolvedOrigin && fantasyRaceOriginConventionalPalettes[resolvedOrigin]) {
    fantasyRace = resolvedOrigin;
  }

  // 2b. Check user input for fantasy-race keywords. First-race-found wins;
  //     iteration order is the map declaration order. If multiple races
  //     are mentioned (e.g., "elven blade carried by an orcish chieftain"),
  //     the first one in declaration order wins. Documented in tests.
  if (!fantasyRace && userInput) {
    for (const [race, keywords] of Object.entries(fantasyRaceKeywords)) {
      const found = keywords.some(keyword => {
        const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pattern = new RegExp(`\\b${escaped}\\b`, 'i');
        return pattern.test(userInput);
      });
      if (found) {
        fantasyRace = race;
        break;
      }
    }
  }

  if (fantasyRace) {
    const conventionalPrefix = fantasyRaceOriginConventionalPalettes[fantasyRace];
    const conventionalPalette = languagePalettes.find(p => p.startsWith(conventionalPrefix));

    if (Math.random() < FANTASY_RACE_CONVENTIONAL_PROBABILITY && conventionalPalette) {
      return conventionalPalette;
    }
    // 30% case: pick any other palette uniformly. Excludes the
    // conventional palette so the "other" branch reliably produces
    // an unconventional pairing.
    const otherPalettes = conventionalPalette
      ? languagePalettes.filter(p => p !== conventionalPalette)
      : languagePalettes;
    return otherPalettes[Math.floor(Math.random() * otherPalettes.length)];
  }

  // Priority 3: uniform random across the full pool.
  return languagePalettes[Math.floor(Math.random() * languagePalettes.length)];
}
