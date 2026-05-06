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
 * Orcish and Goblinoid pools are ALLOW-LISTS: a curated set of European
 * registers (fictional fantasy + Germanic + Celtic + Slavic + Latin)
 * with documented orc/goblin-fantasy precedent that don't carry the
 * racist-coding history protected-list traditions do. Selection for
 * these races is pool-only (no 30% alternative branch), and cultural
 * detection from user input is subordinated to the pool — if a user
 * signal would resolve to a non-pool palette in an orc/goblin context,
 * the pool wins. The architecture replaces the earlier filter-based
 * approach (orcGoblinExcludedPalettes) which had a code-path gap that
 * let Goblinoid + Navajo/Diné slip through to a production output. An
 * allow-list makes the bad combinations structurally impossible
 * rather than relying on the filter to recognize and block them.
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
 *   - Orcish: allow-list of European registers with orc-fantasy
 *     precedent — Old Norse (jötnar/troll-adjacent figures, Tolkien-
 *     tradition support), Anglo-Saxon (Beowulf-era register), Old/
 *     Middle High German and Gothic (Germanic mythological registers),
 *     Welsh and Old Irish (Celtic registers without orc-coding stigma),
 *     Old Slavic (zmey/leshy/bogatyr-warrior traditions), Latin
 *     (classical "barbarian-vs-civilization" framing). All other real-
 *     world traditions are deliberately excluded — pool-only selection
 *     overrides cultural detection from user input.
 *   - Goblinoid: similar allow-list philosophy, narrower because fewer
 *     European traditions have unambiguous goblin-fantasy precedent.
 *   - Gnomish: inventor/craftsperson archetype maps onto real-world
 *     traditions less fraught with racial coding than orcs/goblins.
 *   - Giant: primordial/large-being traditions in genre-canonical
 *     European registers (Norse jötnar, Greek titans/cyclopes, Anglo-
 *     Saxon eotenas). An earlier iteration included Hebrew-inspired
 *     for the Nephilim primordial-giant tradition; Hebrew was first
 *     moved to the protected list, then removed from the palette
 *     system entirely. Real-tradition pairings of Jewish religious-
 *     cultural specifics with fictional fantasy races carry too much
 *     risk regardless of the specific tradition cited as justification.
 *     The Hebrew palette and detection-map entries are both gone;
 *     Hebrew-coded user input falls through to the LLM's world-
 *     knowledge override path with strict universal-invent rules.
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
    'Orcish',                       // primary fictional register
    'Old-Norse-inspired',           // Tolkien-tradition; Brioc/Grief-Forged precedent
    'Anglo-Saxon-inspired',         // Beowulf-era register
    'Old-High-German-inspired',     // Germanic mythological register
    'Middle-High-German-inspired',  // Nibelungenlied register
    'Gothic-inspired',              // ancient Germanic register
    'Welsh-inspired',               // Celtic register
    'Old-Irish-inspired',           // Celtic register variant
    'Old-Slavic-inspired',          // Slavic warrior/spirit traditions
    'Latin-inspired',               // classical "barbarian-vs-civilization" framing
  ],
  'Goblinoid': [
    'Goblin-inspired',              // primary fictional register
    'Old-Norse-inspired',           // Germanic trickster/small-folk
    'Anglo-Saxon-inspired',         // Beowulf-era register
    'Middle-High-German-inspired',  // Germanic mythological register
    'Gothic-inspired',              // ancient Germanic register
    'Old-Slavic-inspired',          // Slavic mischief-spirit traditions
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

/**
 * Pick a palette from a conventional pool given a list of prefixes and
 * the caller's available palette list. Returns the resolved palette
 * string, or null if no prefix in the pool matches an entry in the
 * palette list.
 */
function pickFromPool(conventionalPrefixes, languagePalettes) {
  const selectedPrefix = conventionalPrefixes[
    Math.floor(Math.random() * conventionalPrefixes.length)
  ];
  return languagePalettes.find(p => p.startsWith(selectedPrefix)) || null;
}

/**
 * True if the resolved palette starts with any prefix in the race's
 * conventional pool.
 */
function isInConventionalPool(palette, conventionalPrefixes) {
  return conventionalPrefixes.some(prefix => palette.startsWith(prefix));
}

export function selectLanguagePalette(
  resolvedOrigin,
  userInput,
  languagePalettes,
  detectLanguageFn,
) {
  const culturalDetection = detectLanguageFn(userInput, languagePalettes);
  const fantasyRace = resolveFantasyRace(resolvedOrigin, userInput);

  // Orc/Goblin allow-list architecture: pool-only selection with a
  // 70/30 weighting. Cultural detection from user input is honored
  // ONLY when the detected palette is in the race's allow-list pool —
  // a user signal that would resolve to a protected-list palette
  // (Yoruba, Lakota, Navajo, etc.) does not override the
  // architectural protection. This replaced the earlier filter-based
  // approach (orcGoblinExcludedPalettes) which had a code-path gap
  // that let Goblinoid + Navajo/Diné slip through to a production
  // output.
  //
  // Within the pool, 70% of generations pick the primary fictional
  // register (pool[0] — 'Orcish' or 'Goblin-inspired') and 30%
  // pick uniformly from the remaining European cross-cultural pool
  // members. Mirrors the Elven/Dwarven/Gnomish/Giant 70/30 conceptually
  // — primary register is the default expectation; variety comes from
  // the minority case. Without this weighting, uniform pool selection
  // would only fire the primary register 1-in-N of the time (10% for
  // Orcish, 17% for Goblinoid), making cross-cultural variants the
  // majority experience.
  if (fantasyRace === 'Orcish' || fantasyRace === 'Goblinoid') {
    const pool = fantasyRaceConventionalPalettes[fantasyRace];
    if (culturalDetection && isInConventionalPool(culturalDetection, pool)) {
      return culturalDetection;
    }

    const primaryPrefix = pool[0];
    if (Math.random() < FANTASY_RACE_CONVENTIONAL_PROBABILITY) {
      const primaryPalette = languagePalettes.find(p => p.startsWith(primaryPrefix));
      if (primaryPalette) return primaryPalette;
      // Fall through to alt-branch only if the primary prefix isn't
      // in the caller's palette pool (defensive — production palette
      // list always contains it).
    }

    // 30% case: pick from the European cross-cultural pool members
    // (everything except the primary register).
    const altPool = pool.filter(prefix => prefix !== primaryPrefix);
    return pickFromPool(altPool, languagePalettes)
      || languagePalettes.find(p => p.startsWith(primaryPrefix))
      || languagePalettes[0];
  }

  // Priority 1: cultural detection from user input (non-orc/goblin
  // contexts; priority 1 wins for these).
  if (culturalDetection) {
    return culturalDetection;
  }

  // Priority 2: fantasy-race weighted selection (Elven/Dwarven/Gnomish/
  // Giant). 70% conventional pool, 30% any palette outside the pool.
  if (fantasyRace) {
    const conventionalPrefixes = fantasyRaceConventionalPalettes[fantasyRace];

    if (Math.random() < FANTASY_RACE_CONVENTIONAL_PROBABILITY) {
      const conventionalPalette = pickFromPool(conventionalPrefixes, languagePalettes);
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
    // Excluding ALL conventional prefixes means the alt branch always
    // produces a genuinely cross-cultural pairing.
    const otherPalettes = languagePalettes.filter(palette =>
      !isInConventionalPool(palette, conventionalPrefixes),
    );
    if (otherPalettes.length === 0) {
      return pickFromPool(conventionalPrefixes, languagePalettes) || languagePalettes[0];
    }
    return otherPalettes[Math.floor(Math.random() * otherPalettes.length)];
  }

  // Priority 3: uniform random across the full pool.
  return languagePalettes[Math.floor(Math.random() * languagePalettes.length)];
}
