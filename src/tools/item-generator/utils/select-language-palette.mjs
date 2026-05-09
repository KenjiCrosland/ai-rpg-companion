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
 * included — most aesthetic origins (Celestial, Fey, Elemental, etc.)
 * deliberately have no conventional palette and pair freely with any
 * linguistic register. The six horror-coded aesthetic origins
 * (Infernal, Abyssal, Necromantic, Vampiric, Lycanthropic, Aberrant)
 * have their OWN protection layer via `horrorRestrictedOrigins` /
 * `horrorOriginPalettePool` below — that is origin-coded protection,
 * separate from this race-coded one. Both layers exist for the same
 * structural reason: certain genre-conventional pairings (orc + non-
 * European register, Necromantic + non-Western religious-cultural
 * register, etc.) carry real-world coding risk that uniform-random
 * palette selection would surface.
 *
 * Multi-palette pools (Elven, Dwarven, Gnomish, Giant) replaced earlier
 * single-palette defaults to avoid reproducing Tolkien-as-canon and to
 * spread example-name rotation across multiple registers per generation.
 *
 * Orcish and Goblinoid palettes are ALLOW-LISTS: a curated set of
 * European registers (fictional fantasy + Germanic + Celtic + Slavic +
 * Latin) with documented orc/goblin-fantasy precedent that don't carry
 * the racist-coding history protected-list traditions do. Selection
 * for these races is allow-list-restricted (no 30% alternative
 * branch), and cultural detection from user input is subordinated to
 * the allow-list — if a user signal would resolve to a palette outside
 * the allow-list in an orc/goblin context, the allow-list wins. The
 * architecture replaces the earlier filter-based approach
 * (orcGoblinExcludedPalettes) which had a code-path gap that let
 * Goblinoid + Navajo/Diné slip through to a production output. An
 * allow-list makes the bad combinations structurally impossible
 * rather than relying on the filter to recognize and block them.
 *
 * Race-specific notes:
 *   - Elven: refined-aesthetic / forest / longevity-coded traditions
 *     with clear fantasy-genre precedent. Tolkien-default Sindarin
 *     (primary) plus archaic Celtic registers (Middle Welsh from the
 *     Mabinogion, Old Irish from the Mythological Cycle), Old Occitan
 *     for troubadour refined-aesthetic, Latin for high-classical
 *     refined register, and Finnish for the Kalevala forest-
 *     magic/runic register. Finnish was trimmed in an earlier
 *     iteration ("reads as its own thing rather than conventionally
 *     elven") and restored on user direction. Modern Welsh, modern
 *     Irish, Old Slavic, Persian, and Sanskrit/Japanese remain
 *     trimmed; they reach elven items only via cultural detection or
 *     uniform-random fall-through paths that this branch overrides.
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
 *     world traditions are deliberately excluded — allow-list
 *     restriction overrides cultural detection from user input.
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
    'Finnish-inspired',          // Kalevala forest-magic/runic register; restored
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
 * Aesthetic origins whose genre-conventional framing pulls from
 * specific Western literary-religious horror traditions (Faustian,
 * gothic, Lovecraftian, European-folk-vampirism, dark-shadow-magic).
 * When paired with non-Western cultural palettes, the pairing risks:
 *   - Imposing Western-Christian horror conventions onto unrelated
 *     cultural registers (e.g., Necromantic + Yoruba reproducing
 *     "African = death-magic" coding patterns),
 *   - Engaging culturally-protected concepts inappropriately
 *     (the original motivating case was Lycanthropic + Diné invoking
 *     the skinwalker tradition; the Diné palette has since been
 *     removed entirely under that same caution, but analogous risks
 *     remain for other Indigenous-tradition palettes the protection
 *     covers),
 *   - Reproducing Lovecraft-tradition Otherness-coding patterns
 *     (Aberrant + non-Western palette → "alien = foreign culture").
 *
 * Selection for these origins is restricted to `horrorOriginPalettePool`
 * via the same allow-list logic the orc/goblin branch uses. Cultural
 * detection from user input is honored ONLY when the detected palette
 * is in the pool; otherwise the allow-list wins. This is origin-coded
 * protection, parallel to but separate from the race-coded protection
 * in `fantasyRaceConventionalPalettes`.
 *
 * Shadow joined this list after production validation surfaced the
 * same cross-cultural-imposition pattern with Shadow-origin items —
 * the genre-conventional shadow-magic register is rooted in
 * Western occultism and reads as appropriative when paired with
 * non-Western cultural registers.
 */
export const horrorRestrictedOrigins = [
  'Infernal',
  'Abyssal',
  'Necromantic',
  'Vampiric',
  'Lycanthropic',
  'Aberrant',
  'Shadow',
];

/**
 * Fictional-origin palette routing with 70/30 weighting.
 *
 * Each entry maps a fictional-fantasy origin to:
 *   - `primary`: the matching fictional palette prefix (the one that
 *     fires the per-palette whitelist). Selected on the 70% branch.
 *   - `altPool`: a curated list of alt-palette prefixes that pair
 *     tonally with the origin. Selected uniformly on the 30% branch
 *     for cross-cultural variety. The alt-pool is per-origin (not
 *     shared) so each origin's variety stays thematically coherent
 *     — e.g., Draconic alt-rolls into Beowulf-/Ladon-/jötnar-
 *     tradition registers, not into Yoruba or Japanese.
 *
 * Why this branch exists: without it, the matching fictional palette
 * was reachable only by uniform-random rolls (1/N chance for Draconic
 * /Primordial, falling through to priority 3) or as one of 12 members
 * of the horror pool (~8% chance for Aberrant/Abyssal/Infernal). The
 * matching fictional whitelist almost never fired, producing
 * Finnish-flavored Draconic items, Latin-flavored Primordial items,
 * etc. — the opposite of what the per-palette whitelists are for.
 *
 * Architectural placement: this branch runs BEFORE the horror branch
 * so Aberrant/Abyssal/Infernal origins route here (70/30 with their
 * own alt-pool) instead of into the horror pool (12-member uniform).
 * Necromantic / Vampiric / Lycanthropic / Shadow are NOT in this map
 * — they have no matching fictional palette of their own and continue
 * to use the horror pool. Sindarin is NOT in this map because
 * Sindarin is not an origin (it's a palette only); the Sindarin
 * whitelist fires when Elven origin rolls the Sindarin palette via
 * the Elven allow-list (~70% of Elven generations).
 *
 * Cultural detection from user input is honored ONLY when the
 * detected palette is in (primary ∪ altPool). A user typing Latin-
 * coded names with a Draconic origin gets Latin (Latin is in
 * Draconic's alt-pool). A user typing Yoruba-coded names with a
 * Draconic origin gets the 70/30 roll instead (Yoruba is not in the
 * allow-list). This mirrors the fantasy-race architecture and lets
 * the user steer to a specific in-allow-list palette via input
 * signals while keeping the allow-list as a hard boundary.
 *
 * 70/30 weighting uses `FANTASY_RACE_CONVENTIONAL_PROBABILITY` (the
 * same constant used by the fantasy-race branch) — both branches use
 * the same primary-vs-alt split, so reusing the constant keeps the
 * meaning consistent.
 */
export const fictionalOriginPalettes = {
  'Draconic': {
    primary: 'Draconic',
    altPool: [
      'Latin-inspired',           // imperial, hoarded power
      'Greek-inspired',           // mythological dragons (Ladon, Typhon)
      'Old-Norse-inspired',       // Eddaic/Beowulf-tradition dragons
      'Anglo-Saxon-inspired',     // Beowulf register
      'Gothic-inspired',          // ancient-feeling
      'Finnish-inspired',         // Kalevala primal-mythic register (Tuoni, Louhi)
    ],
  },
  'Aberrant': {
    primary: 'Aberrant',
    altPool: [
      'Sindarin-inspired',        // high-elven-corrupted aberrant
      'Old-Slavic-inspired',      // folk-horror / whisper-tradition
      'Romanian-inspired',        // gothic-horror
      'Gothic-inspired',          // medieval mystery / forbidden
      'Latin-inspired',           // academic-occult forbidden knowledge
    ],
  },
  'Abyssal': {
    primary: 'Abyssal',
    altPool: [
      'Latin-inspired',           // Roman barbarian-vs-civilization
      'Old-Norse-inspired',       // jötnar / hostile primal
      'Gothic-inspired',          // medieval death-cult
      'Old-Slavic-inspired',      // zmey / black-magic folklore
      'Romanian-inspired',        // gothic-horror
    ],
  },
  'Infernal': {
    primary: 'Infernal',
    altPool: [
      'Latin-inspired',           // classical Roman demonology
      'Greek-inspired',           // Greek demonology / mythology
      'Romanian-inspired',        // Faustian / Stoker pact-devil
      'Gothic-inspired',          // medieval pact-devils
    ],
  },
  'Primordial': {
    primary: 'Primordial',
    altPool: [
      'Greek-inspired',           // Titans, Hesiod's Theogony
      'Old-Norse-inspired',       // jötnar, primordial Ymir
      'Latin-inspired',           // abstract elemental, formal
    ],
  },
};

/**
 * Allow-list of palette prefixes that horror-restricted origins may
 * use. Selection is uniform-random across the pool (no 70/30 weighting
 * like orc/goblin) because horror origins don't have a single
 * "primary register" the way orcs have an Orcish fictional register —
 * Necromantic items can lean Latin (academic-occult), Romanian (gothic
 * vampirism), Old Norse (rune-magic), Gothic (medieval death-cult),
 * Sindarin (high-elven necromancers), or any of the fictional registers
 * (Abyssal, Infernal, Aberrant). All these are valid horror traditions;
 * spread across the pool is the desired behavior.
 *
 * Pool composition:
 *   - European real-world registers with documented horror-genre
 *     precedent (Latin/Norse/Germanic/Slavic/Romanian/Sindarin).
 *   - Fictional fantasy registers (Abyssal/Infernal/Aberrant) that
 *     are themselves horror-genre native.
 *
 * Notes:
 *   - Necromantic, Vampiric, Lycanthropic exist as origin names but
 *     not as palette prefixes (no `Necromantic-inspired` palette
 *     entry), so they don't appear in the pool.
 *   - Romanian-inspired is included for the gothic-vampire / Carpathian
 *     horror tradition that sits in genre canon (Stoker, Murnau,
 *     contemporary Eastern-European folk-horror).
 *   - Sindarin-inspired is included because high-fantasy elven
 *     necromancy/vampirism is a recognized subgenre (e.g., Tolkien's
 *     barrow-wights, the rings' wraith-creation, post-Tolkien dark-
 *     elven traditions).
 */
export const horrorOriginPalettePool = [
  'Latin-inspired',
  'Old-Norse-inspired',
  'Anglo-Saxon-inspired',
  'Old-High-German-inspired',
  'Middle-High-German-inspired',
  'Gothic-inspired',
  'Old-Slavic-inspired',
  'Romanian-inspired',
  'Sindarin-inspired',
  'Abyssal',
  'Infernal',
  'Aberrant',
];

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
 * Fantasy races whose palette selection is restricted to a curated
 * palette allow-list (no 30% alt-branch into the broader palette
 * set). Within the allow-list, the 70/30 weighting still applies —
 * the primary register at index 0 fires 70% of the time, the rest
 * of the allow-list covers the 30%. Cultural detection from user
 * input is honored ONLY when the detected palette is in the allow-
 * list; otherwise the allow-list wins.
 *
 * Naming note: this constant used to be called WESTERN_FANTASY_BOUND_RACES, which
 * collided with the unrelated "pool" vocabulary used for the Yoruba/
 * Andean character/place/spirit name lists in src/data/cultural-pools.
 * Same word, different concept (palette set vs. name set). Renamed to
 * WESTERN_FANTASY_BOUND_RACES to match the tier scheme in
 * ARCHITECTURE.md and to free "pool" for the name-list usage.
 *
 * Membership criterion: Western-fantasy-bound races whose archetype-
 * slot is Norse/Germanic/Celtic-coded with no parallel in most non-
 * Western mythological traditions. Pairing these races with non-
 * Western linguistic registers doesn't include those cultures in
 * fantasy; it conscripts those cultures' linguistic registers to
 * decorate Western archetypes — a documented appropriation pattern
 * across fantasy media.
 *
 * Members (all five Western-fantasy-bound races):
 *   - Orcish, Goblinoid: documented racial-coding history with non-
 *     European palettes (the canonical orc-as-racial-proxy pattern).
 *   - Dwarven: Norse/Germanic mountain-craft archetype.
 *   - Gnomish: European inventor-tinkerer archetype.
 *   - Elven: Sindarin / Celtic refined-aesthetic archetype.
 *
 * Explicitly NOT in this list:
 *   - Fey, Giant: cross-cultural archetypes — the slot exists in many
 *     living mythological traditions (kitsune/huli jing/mami wata/
 *     patupaiarehe for fey; jötnar/titans/rakshasas/oni for giants).
 *     These pair freely with any palette; non-Western pairings
 *     genuinely include those cultures' tradition rather than
 *     decorating a Western archetype. Giant was briefly added to this
 *     list under the "Giant + non-Western pairings read as primitive
 *     tribes" framing, then removed when the broader tier scheme
 *     identified the cross-cultural-archetype distinction.
 *
 * Adding a race to this list = adding it to the structural protection.
 * Removing a race = lifting the restriction back to the priority-2
 * weighted 70/30-with-broad-alt-branch behavior.
 */
export const WESTERN_FANTASY_BOUND_RACES = ['Orcish', 'Goblinoid', 'Dwarven', 'Gnomish', 'Elven'];

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

  // Fictional-origin → primary-palette + alt-pool routing (70/30).
  // Highest priority — overrides cultural detection, horror
  // restriction, and fantasy-race restriction. See
  // `fictionalOriginPalettes` docblock for the rationale (the
  // matching fictional whitelist needs the matching palette to fire
  // most of the time, with a small share of cross-cultural variety
  // for tonal interest).
  //
  // 70%: pick the matching fictional palette (whitelist fires).
  // 30%: pick uniformly from the per-origin curated alt-pool (no
  //      whitelist; tonal variety).
  //
  // Runs before the horror branch so Aberrant / Abyssal / Infernal
  // route here instead of into the 12-member horror pool.
  if (resolvedOrigin && fictionalOriginPalettes[resolvedOrigin]) {
    const { primary, altPool } = fictionalOriginPalettes[resolvedOrigin];
    const allowList = [primary, ...altPool];

    // In-allow-list cultural detection wins (mirrors fantasy-race
    // pattern). A user typing Latin-coded input with Draconic origin
    // gets Latin; out-of-allow-list signals (e.g., Yoruba) fall
    // through to the 70/30 roll.
    if (culturalDetection && isInConventionalPool(culturalDetection, allowList)) {
      return culturalDetection;
    }

    if (Math.random() < FANTASY_RACE_CONVENTIONAL_PROBABILITY) {
      const primaryPalette = languagePalettes.find(p => p.startsWith(primary));
      if (primaryPalette) return primaryPalette;
      // Fall through to alt-branch only if the primary prefix isn't in
      // the caller's palette pool (defensive — production palette list
      // always contains the five fictional palettes).
    }

    // 30% case: uniform random from the per-origin alt-pool.
    const altPalette = pickFromPool(altPool, languagePalettes);
    if (altPalette) return altPalette;

    // Last-ditch defensive fall-through: neither primary nor any
    // alt-pool member resolved against the active pool. Try primary
    // one more time before letting the remaining branches handle it.
    const fallback = languagePalettes.find(p => p.startsWith(primary));
    if (fallback) return fallback;
  }

  // Horror-coded aesthetic origin allow-list architecture: allow-list-
  // restricted selection over a curated set of European registers
  // (real-world horror-genre traditions) plus the fictional horror-
  // native registers (Abyssal, Infernal, Aberrant). Same protection
  // logic as the orc/goblin branch — cultural detection honored ONLY
  // when the detected palette is in the pool; otherwise the allow-list
  // wins. Selection is uniform-random (no 70/30 weighting) because
  // horror origins don't have a single "primary register" to weight
  // toward.
  //
  // Origin-coded protection, gated on dropdown selection (not keyword
  // detection). Checked BEFORE the orc/goblin branch so origin-based
  // restrictions resolve before fantasy-race restrictions. The two
  // branches don't overlap in practice — horror origins are aesthetic-
  // coded and never resolve to a fantasy race.
  //
  // The protection blocks Necromantic + Yoruba (Western death-magic
  // imposed on West African register), Aberrant + non-Western palette
  // (Lovecraft Otherness coding), and similar pairings that uniform-
  // random palette selection would otherwise surface. The original
  // motivating case was Lycanthropic + Diné (skinwalker appropriation);
  // the Diné palette has since been removed entirely under that same
  // caution, but the protection still covers analogous risks for the
  // remaining Indigenous-tradition palettes.
  if (resolvedOrigin && horrorRestrictedOrigins.includes(resolvedOrigin)) {
    if (culturalDetection && isInConventionalPool(culturalDetection, horrorOriginPalettePool)) {
      return culturalDetection;
    }
    return pickFromPool(horrorOriginPalettePool, languagePalettes)
      || languagePalettes[0];
  }

  // Western-fantasy-bound race architecture (Orcish, Goblinoid,
  // Dwarven, Gnomish, Elven): allow-list-restricted selection with a
  // 70/30 weighting. Cultural detection from user input is honored
  // ONLY when the detected palette is in the race's allow-list — a
  // user signal that would resolve to a protected-list palette
  // (Yoruba, Lakota, etc.) does not override the architectural
  // protection. The orc/goblin members replaced an earlier filter-
  // based approach (orcGoblinExcludedPalettes) that had a code-path
  // gap; the Dwarven/Gnomish/Elven members were added after
  // production validation showed problematic cross-cultural pairings
  // for Western-fantasy-bound races.
  //
  // Within the allow-list, 70% of generations pick the primary
  // register (pool[0] — 'Orcish' / 'Goblin-inspired' /
  // 'Old-Norse-inspired' / 'Gnomish' / 'Sindarin-inspired') and 30%
  // pick uniformly from the remaining members. Without this
  // weighting, uniform selection would fire the primary register
  // only 1-in-N of the time (10% for Orcish, 17% for Goblinoid, 20%
  // for Dwarven/Elven, 25% for Gnomish), making cross-register
  // variants the majority experience.
  //
  // To add a race to allow-list protection: append to
  // WESTERN_FANTASY_BOUND_RACES above. The branch condition is data-
  // driven so adding a race is a one-line change.
  if (WESTERN_FANTASY_BOUND_RACES.includes(fantasyRace)) {
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

  // Priority 1: cultural detection from user input (contexts that are
  // not Western-fantasy-bound and not horror-restricted; priority 1
  // wins for these).
  if (culturalDetection) {
    return culturalDetection;
  }

  // Priority 2: fantasy-race weighted selection (Giant — the cross-
  // cultural-archetype race NOT in WESTERN_FANTASY_BOUND_RACES).
  // 70% conventional palette pool, 30% any palette outside the pool.
  // The Western-fantasy-bound races returned above; if execution
  // reaches here with a fantasyRace, it's the cross-cultural-
  // archetype race left on the weighted branch (Giant). Fey isn't a
  // member of fantasyRaceConventionalPalettes at all and never
  // resolves to a fantasyRace via resolveFantasyRace, so it skips
  // this branch entirely and falls through to priority 3 uniform
  // random.
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
