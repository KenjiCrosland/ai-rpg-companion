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
 * pool (one or more palette prefixes that strongly associate with the
 * race in genre convention). Only the six core fantasy races are
 * included — aesthetic origins (Celestial, Fey, Necromantic, etc.)
 * deliberately have no conventional palette and pair freely with any
 * linguistic register.
 *
 * Multi-palette pools (Elven, Dwarven, Gnomish, Giant) replaced earlier
 * single-palette defaults to avoid reproducing Tolkien-as-canon and to
 * spread example-name rotation across multiple registers per generation.
 *
 * Single-palette pools (Orcish, Goblinoid) are intentional. Real-world
 * clan-warrior and trickster traditions that would broaden these pools
 * largely appear on orcGoblinExcludedPalettes (Mongolian, Lakota,
 * Maori, West African, etc.); broadening would reproduce the racist-
 * coding pattern the exclusion exists to prevent. Variety for orc/goblin
 * items comes from the cross-cultural 30% alternative branch instead.
 *
 * Race-specific notes:
 *   - Elven: refined-aesthetic / forest / longevity-coded traditions
 *     with clear fantasy-genre precedent. Tolkien-default Sindarin plus
 *     archaic Celtic registers (Middle Welsh from the Mabinogion, Old
 *     Irish from the Mythological Cycle), Old Occitan for troubadour
 *     refined-aesthetic, and Latin for high-classical refined register.
 *     Earlier iterations included modern Welsh, modern Irish, Finnish,
 *     Old Slavic, Persian, and Sanskrit/Japanese — those were trimmed
 *     because some read as their own thing (Finnish-coded, Slavic-
 *     coded) rather than as conventionally elven, and Sanskrit/
 *     Japanese were excluded for the same orc/goblin-exclusion-list
 *     caution. Trimmed traditions remain in languagePalettes and reach
 *     elven items via cultural detection or the 30% alt branch (where
 *     the unconventional-pairing translation directive fires).
 *   - Dwarven: mountain-craft cultures with strong clan structures.
 *     Old Norse (Tolkien's source) plus Anglo-Saxon, Old High German,
 *     Middle High German (Nibelungenlied register), and Gothic
 *     (earliest documented Germanic). Earlier iterations included
 *     Caucasian, Atlas Berber, Pamir — trimmed for the same "reads
 *     as its own thing" reason. Hebrew remains excluded (antisemitic-
 *     coding history with dwarves is too fraught) and Andean stays
 *     out (on the orc/goblin exclusion list).
 *   - Gnomish: inventor/craftsperson archetype maps onto real-world
 *     traditions less fraught with racial coding than orcs/goblins.
 *   - Giant: primordial/large-being traditions. Hebrew is included
 *     specifically for the Nephilim primordial-giant tradition — that
 *     pairing doesn't carry the antisemitic-coding history the Hebrew/
 *     dwarven combination does.
 */
export const fantasyRaceConventionalPalettes = {
  'Elven': [
    'Sindarin-inspired',
    'Middle-Welsh-inspired',
    'Old-Irish-inspired',
    'Old-Occitan-inspired',
    'Latin-inspired',
  ],
  'Dwarven': [
    'Old-Norse-inspired',
    'Anglo-Saxon-inspired',
    'Old-High-German-inspired',
    'Middle-High-German-inspired',
    'Gothic-inspired',
  ],
  'Orcish': [
    'Orcish',
  ],
  'Goblinoid': [
    'Goblin-inspired',
  ],
  'Gnomish': [
    'Gnomish',
    'Greek-inspired',
    'Anglo-Saxon-inspired',
    'Italian-Renaissance-inspired',
  ],
  'Giant': [
    'Norse-inspired',
    'Greek-inspired',
    'Anglo-Saxon-inspired',
    'Hebrew-inspired',
  ],
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

/**
 * Language palettes whose real-world cultural referents have historically
 * been orc-coded or goblin-coded in fantasy fiction. When the random
 * weighted-selection branch fires for Orcish or Goblinoid origin, these
 * palettes are filtered out of the alternative-palette pool.
 *
 * The list is grounded in documented historical coding patterns:
 * Tolkien's "Mongol-type" orc descriptors, decades of fantasy art that
 * depicted orcs and goblins with features stereotypical of African,
 * East Asian, and Indigenous peoples, and the broader genre history
 * that has used these fictional categories as proxies for racist
 * depiction of real human groups.
 *
 * Palettes NOT on this list (Celtic, Norse, Germanic, Latin, Greek,
 * Slavic, Russian, Romanian, Hungarian, plus all fantasy-fictional
 * palettes like Sindarin, Draconic, Abyssal, etc.) remain available
 * for cross-cultural pairing with orcs and goblins. The architectural
 * point is that "orc + Celtic" or "orc + Sindarin" don't reproduce the
 * historical coding — those traditions weren't the targets of orc-
 * coding in fantasy history. Blocking the specific traditions that
 * WERE targets is more careful than blocking all cross-cultural
 * pairings (which would lose the legitimate creative range like
 * Welsh-coded orcish tricksters or Saruman-bred elf-imitating orcs).
 *
 * Cultural detection from user input (priority 1 in selectLanguagePalette)
 * still wins over this exclusion. If a user explicitly types "Yoruba
 * orc" or "Akiko-Khan the Mongolian Orc Warlord," the system honors
 * their explicit choice. The exclusion only applies to RANDOM selection
 * in the alternative-palette pool — it prevents the system from
 * imposing a problematic pairing the user didn't request.
 *
 * Exported so tests can verify the list shape without re-deriving it.
 */
export const orcGoblinExcludedPalettes = [
  'Yoruba-inspired',
  'Akan-inspired',
  'Igbo-inspired',
  'Swahili-inspired',
  'Arabic/Persian-inspired',
  // Persian-inspired is a separate palette from Arabic/Persian-inspired
  // (the former is a refined-classical register added for Elven; the
  // latter is the existing flowing/melodic register). startsWith treats
  // them as distinct prefixes, so both are listed independently to keep
  // orc/goblin generations clear of Persian-coded pairings.
  'Persian-inspired',
  'Hebrew-inspired',
  'Hindi/Sanskrit-inspired',
  'Chinese-inspired',
  'Korean-inspired',
  'Mongolian-inspired',
  'Tibetan-inspired',
  'Thai-inspired',
  'Maori-inspired',
  'Hawaiian-inspired',
  'Maya-inspired',
  'Aztec/Nahuatl-inspired',
  'Lakota-inspired',
  'Navajo/Diné-inspired',
  'Andean-inspired',
];

/**
 * Determine which fantasy race (if any) this generation should be
 * weighted toward, given the resolved origin dropdown and the combined
 * user input (name + lore).
 *
 * Same logic that selectLanguagePalette applies internally for the
 * 70/30 weighting; extracted so callers can ALSO know the fantasy-race
 * state at prompt-construction time. The item generator uses it to
 * gate the orc/goblin-context override-revocation prompt block — that
 * block needs to fire whenever the palette filter would have fired,
 * including the priority-2b keyword case (e.g., dropdown=Necromantic,
 * lore="Orcish Battleaxe" → fantasyRace='Orcish').
 *
 * @param {string|null} resolvedOrigin
 * @param {string} userInput — combined name + lore.
 * @returns {string|null} — race name ('Elven'|'Dwarven'|'Orcish'|...)
 *                          or null if no fantasy-race signal is present.
 */
export function resolveFantasyRace(resolvedOrigin, userInput) {
  // 2a. Dropdown origin — does it signal a core fantasy race?
  if (resolvedOrigin && fantasyRaceConventionalPalettes[resolvedOrigin]) {
    return resolvedOrigin;
  }

  // 2b. User-input keywords. First-race-found wins; iteration order is
  //     the map declaration order. If multiple races are mentioned
  //     (e.g., "elven blade carried by an orcish chieftain"), the first
  //     in declaration order wins.
  if (userInput) {
    for (const [race, keywords] of Object.entries(fantasyRaceKeywords)) {
      const found = keywords.some(keyword => {
        const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const pattern = new RegExp(`\\b${escaped}\\b`, 'i');
        return pattern.test(userInput);
      });
      if (found) return race;
    }
  }

  return null;
}

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
  const fantasyRace = resolveFantasyRace(resolvedOrigin, userInput);

  if (fantasyRace) {
    const conventionalPrefixes = fantasyRaceConventionalPalettes[fantasyRace];

    // 70% branch: pick a conventional palette at random from the pool.
    // The earlier single-palette architecture used the same palette
    // every time, which produced visible reuse pressure and reproduced
    // a single cultural register as canon. Multi-palette pools spread
    // the rotation across registers per generation.
    if (Math.random() < FANTASY_RACE_CONVENTIONAL_PROBABILITY) {
      const selectedPrefix = conventionalPrefixes[
        Math.floor(Math.random() * conventionalPrefixes.length)
      ];
      const conventionalPalette = languagePalettes.find(p => p.startsWith(selectedPrefix));
      if (conventionalPalette) {
        return conventionalPalette;
      }
      // Fall through to the alt branch if the prefix isn't found in the
      // caller's palette pool (defensive — production palette list is
      // expected to contain every prefix referenced by the conventional
      // pools, but a reduced pool passed by tests or partial data state
      // shouldn't crash).
    }

    // 30% case: pick any palette outside the race's conventional pool.
    // Excluding ALL conventional prefixes (not just one) means the alt
    // branch always produces a genuinely cross-cultural pairing.
    let otherPalettes = languagePalettes.filter(palette =>
      !conventionalPrefixes.some(prefix => palette.startsWith(prefix)),
    );

    // Targeted exclusion for Orcish/Goblinoid: filter out palettes
    // whose real-world referents have historically been orc-coded
    // (see orcGoblinExcludedPalettes docblock for the full reasoning).
    // Only applies to this random branch; cultural detection (priority 1)
    // already returned earlier for any user-typed cultural signal.
    if (fantasyRace === 'Orcish' || fantasyRace === 'Goblinoid') {
      otherPalettes = otherPalettes.filter(palette =>
        !orcGoblinExcludedPalettes.some(excluded => palette.startsWith(excluded)),
      );
      // Defensive guard: if a future palette-list change leaves zero
      // valid alternatives after filtering, fall back to the first
      // conventional palette rather than picking from an empty array.
      if (otherPalettes.length === 0) {
        const fallbackPalette = languagePalettes.find(p =>
          conventionalPrefixes.some(prefix => p.startsWith(prefix)),
        );
        return fallbackPalette || languagePalettes[0];
      }
    }
    return otherPalettes[Math.floor(Math.random() * otherPalettes.length)];
  }

  // Priority 3: uniform random across the full pool.
  return languagePalettes[Math.floor(Math.random() * languagePalettes.length)];
}
