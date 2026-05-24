/**
 * Setting dimensions — variety pools for the setting generator's
 * inference call.
 *
 * Two pools control dimensional variety:
 *
 *   SETTING_TYPES — flat array of ~50 setting categories spanning
 *     political units, settlement scales, specialized institutions,
 *     natural-formation settlements, functional places, mystical
 *     places, smaller-scale places, and liminal places. The inference
 *     call picks ONE type per generation.
 *
 *   SETTING_CHARACTERS — object keyed by eight sub-dimensions, each
 *     holding ~10 character qualities. Sub-dimensions are state,
 *     political, cultural, geographic, mystical, temporal, hidden,
 *     and atmospheric. The inference call picks ONE value from each
 *     of THREE DIFFERENT sub-dimensions per generation, producing
 *     multi-facet texture rather than single-axis variation. The
 *     sub-dimension keys are taxonomy for selection guidance only —
 *     they do NOT surface in the data model or the prompt output
 *     (the response carries a flat array of 3 strings).
 *
 * Register selection reuses `humanoidRegisterList` from
 * `@/shared/register-list.mjs` (the ~25 humanoid registers, with the
 * protected-register filter inherited automatically). Settings can
 * use thematic registers (Aberrant/Abyssal/Infernal/Primordial)
 * when explicitly invoked by description or seeded from an item/NPC
 * in that register, but empty-input rolls stay humanoid by default.
 *
 * Adding or rebalancing dimensions: edit this file. The inference
 * call reads these structures directly; no prompt rewrite needed.
 */

export const SETTING_TYPES = [
  // Political units
  'kingdom',
  'empire',
  'republic',
  'principality',
  'duchy',
  'city-state',
  'theocracy',
  'federation',
  'magistracy',
  'tribal-confederation',
  'hegemony',
  'league',

  // Settlement scales
  'city',
  'town',
  'village',
  'hamlet',
  'port-city',
  'harbor-town',
  'trading-post',
  'market-town',
  'fortified-village',
  'frontier-settlement',
  'pilgrim-town',
  'exile-colony',
  'nomad-encampment',

  // Specialized institutions
  'monastery',
  'abbey',
  'academy',
  'library',
  'observatory',
  'guild-hall',
  'temple-complex',
  'sanctuary',
  'hermitage',
  'scriptorium',
  'conservatory',
  'archive',

  // Natural-formation settlements
  'mountain-hold',
  'cave-city',
  'oasis-settlement',
  'island-community',
  'forest-settlement',
  'marsh-community',
  'plateau-village',
  'desert-encampment',
  'river-confluence',
  'glacier-settlement',
  'volcanic-city',
  'canyon-settlement',
  'treetop-village',

  // Functional / production
  'fortress',
  'watchtower',
  'lighthouse',
  'mining-town',
  'caravan-waystation',
  'ferry-crossing',
  'shipyard',
  'mill-town',
  'lumber-camp',
  'foundry-town',
  'toll-station',

  // Military / martial
  'military-academy',
  'war-camp',
  'arena-city',
  'mercenary-hold',

  // Criminal / underworld
  'pirate-haven',
  'thieves-quarter',
  'smuggler-port',
  'gambling-quarter',

  // Mystical places
  'shrine',
  'oracle-seat',
  'sacred-grove',
  'fey-court',
  'ritual-precinct',
  'ley-line-junction',
  'dragon-roost',
  'elemental-spring',
  'haunted-battlefield',
  'cult-compound',

  // Liminal / ruined
  'ruined-city',
  'ghost-village',
  'crossroads-town',
  'plane-touched-settlement',
  'border-fortress',
];

export const SETTING_CHARACTERS = {
  // STATE — overall condition or trajectory of the setting
  state: [
    'corrupt',
    'prosperous',
    'declining',
    'thriving',
    'embattled',
    'rebellious',
    'isolated',
    'plague-stricken',
    'war-torn',
    'recovering',
    'gilded-rotten',
    'twice-burned',
    'exile-bloated',
    'famine-thin',
    'ember-banked',
  ],

  // POLITICAL — how power is organized and exercised
  political: [
    'theocratic',
    'oligarchic',
    'anarchic',
    'despotic',
    'democratic',
    'feudal',
    'mercantile',
    'militant',
    'matriarchal',
    'patriarchal',
    'guild-ruled',
    'magocracy',
    'gerontocracy',
    'regent-ruled',
    'council-fractured',
  ],

  // CULTURAL — dominant social or intellectual character
  cultural: [
    'scholarly',
    'monastic',
    'artistic',
    'merchant-driven',
    'warlike',
    'pious',
    'hedonistic',
    'ascetic',
    'cosmopolitan',
    'insular',
    'alchemist-driven',
    'duel-honored',
    'song-keeping',
    'mask-wearing',
    'carnival-defined',
  ],

  // GEOGRAPHIC — where the setting sits physically
  geographic: [
    'mountainous',
    'coastal',
    'floating',
    'underground',
    'island-bound',
    'forest-hidden',
    'desert-locked',
    'riverine',
    'sky-perched',
    'marsh-bound',
    'cliff-clinging',
    'ravine-spanning',
    'fjord-cut',
    'volcano-shadowed',
    'geyser-fed',
  ],

  // MYSTICAL — supernatural texture
  mystical: [
    'haunted',
    'blessed',
    'fey-touched',
    'cursed',
    'prophesied',
    'divine-favored',
    'demon-haunted',
    'spirit-thick',
    'dragon-marked',
    'planar-bleeding',
    'echo-haunted',
    'mirror-touched',
    'dream-walked',
    'name-dwelling',
    'threshold-thinned',
  ],

  // TEMPORAL — relationship to time and history
  temporal: [
    'ancient',
    'recent',
    'forgotten',
    'fallen',
    'reborn',
    'eternal',
    'decaying',
    'frozen-in-time',
    'doomed',
    'half-remembered',
    'yearless',
    'century-cycled',
    'between-eras',
    'in-mourning',
    'arrested',
  ],

  // HIDDEN — secrets, infiltration, double-natures
  hidden: [
    'secret',
    'masked',
    'infiltrated',
    'double-natured',
    'false-named',
    'conspiracy-ridden',
    'illusion-cloaked',
    'schism-torn',
    'plot-thick',
    'treason-shadowed',
    'two-faced',
    'name-changing',
    'mirror-twinned',
    'map-erased',
    'forbidden-named',
  ],

  // ATMOSPHERIC — sensory weather/light/mood texture spanning light,
  // weather, sound, smell, surface, and temperature. Deliberately
  // larger than other sub-dimensions (~4x) because sensory variety
  // in the real world is essentially infinite and a small pool
  // produced visible clustering on a handful of LLM-favorite hooks
  // (bell-ringing in particular).
  //
  // Tone-balance note: the original pool skewed grim/heavy/decline
  // (the LLM-fantasy default). Bright, warm, festive, and vibrant
  // textures are seeded deliberately in every sense category so the
  // pool isn't permanently in gothic-twilight mode. Settings in a
  // "prosperous + summer-warm + festival-loud" combination should
  // be just as reachable as "declining + ash-falling + gloom-soaked."
  atmospheric: [
    // Weather — grim/harsh
    'misty',
    'sun-scorched',
    'storm-wracked',
    'rain-drenched',
    'fog-shrouded',
    'snow-bound',
    'ash-falling',
    'drought-cracked',
    'wind-scoured',
    'dust-hazed',
    'hoarfrost-laced',
    'sirocco-baked',
    'monsoon-soaked',
    // Weather — pleasant
    'spring-soft',
    'balmy',
    'breeze-cooled',
    'harvest-bright',

    // Light — neutral / dark
    'twilit',
    'aurora-lit',
    'lantern-bound',
    'moonlit',
    'starlit',
    'dusk-soaked',
    'candle-lit',
    'eclipse-shadowed',
    'shadow-pooled',
    // Light — warm / vivid
    'gilded',
    'sun-drenched',
    'sun-dappled',
    'dawn-streaked',
    'golden-hour',
    'ember-lit',
    'fireside-warm',
    'firework-lit',
    'prismatic',
    'jewel-toned',
    'saffron-bright',

    // Sound — solemn / sparse (bells are one of several rather than
    // the obvious default)
    'bell-ringing',
    'drum-pulsed',
    'chant-murmured',
    'horn-echoing',
    'prayer-whispered',
    'silence-deep',
    'surf-hushed',
    'cricket-thrummed',
    'forge-clanging',
    'wind-howling',
    'river-roaring',
    // Sound — lively / festive
    'birdsong-laced',
    'music-soaked',
    'festival-loud',
    'fountain-trickling',
    'market-bustling',

    // Smell / air quality — harsh / heavy
    'smoke-veiled',
    'incense-laden',
    'kiln-acrid',
    'peat-smoking',
    'pitch-tarred',
    'ozone-charged',
    // Smell / air quality — fresh / pleasant
    'salt-tanged',
    'pine-resined',
    'citrus-bright',
    'jasmine-laced',
    'bread-warm',
    'spice-warmed',

    // Surface / texture — neglected / decayed
    'gloom-soaked',
    'moss-furred',
    'verdigris-streaked',
    'cobweb-veiled',
    'soot-blackened',
    // Surface / texture — adorned / vibrant
    'flower-strewn',
    'garland-hung',
    'silk-draped',
    'mosaic-tiled',
    'banner-festooned',

    // Temperature feel
    'hearth-warm',
    'crypt-cool',
  ],
};

/**
 * Setting tensions — the central dramatic situation that makes a
 * setting GM-useful. Production observation (~2026-05): empty-input
 * inference clustered hard on "imminent crisis" framing, because the
 * field templates in the main prompt (main_problem, potential_solutions,
 * "what happens if unresolved") and LLM training data both default
 * to decision-point-crisis as the natural framing for "interesting
 * setting." A non-crisis tension is just as GM-useful (often more so
 * for sandbox play) but won't surface without an explicit dimension.
 *
 * The pool of 9 covers the GM-useful tension space:
 *
 *   - imminent-crisis: classic decision-point. Still surfaces, just
 *     not 100% of the time.
 *   - ongoing-accommodation: sustained low-grade pressure the
 *     community has learned to negotiate.
 *   - internal-struggle: factional, generational, ideological
 *     conflict from within.
 *   - external-relationship: tribute, alliance, dependency, rivalry
 *     with another power.
 *   - identity-negotiation: cultural mixing, transition, hybrid
 *     tradition formation.
 *   - recovery-rebuilding: post-crisis repair work as the central
 *     activity.
 *   - mystery-accommodation: unresolved supernatural / inherited
 *     question that the community has learned to live with.
 *   - seasonal-cyclical: predictable recurring stress with ritual
 *     scaffolding around it.
 *   - aspirational-striving: a project, vision, or ambition the
 *     community is pushing toward.
 *
 * The inference call picks one. The main prompt's field framings are
 * reshaped per-tension so e.g. main_problem reads as "the sustained
 * difficulty" rather than "the crisis about to break."
 */
export const SETTING_TENSIONS = [
  'imminent-crisis',
  'ongoing-accommodation',
  'internal-struggle',
  'external-relationship',
  'identity-negotiation',
  'recovery-rebuilding',
  'mystery-accommodation',
  'seasonal-cyclical',
  'aspirational-striving',
  'succession-question',
  'resource-depletion',
  'open-secret',
  'reputational-burden',
  'inheritance-burden',
  'forgotten-knowledge',
  // Lower-stakes tensions — stable communities with social /
  // spiritual / intellectual / aesthetic frictions, NOT survival
  // stakes. These contribute to variety even on non-tonally-directed
  // generations. When non-conflict tonal signals appear in user
  // input (sacred, festive, wondrous, scholarly, hospitable,
  // apprenticeship), the orchestrator routes specifically to one of
  // these via detectLowStakesTension.
  'communal-friction',
  'sacred-practice',
  'celebration-preparation',
  'wonder-stewardship',
  'knowledge-cultivation',
  'hospitality-strain',
  'generational-transition',
];

export const TENSION_DESCRIPTIONS = {
  'imminent-crisis': 'something is about to break — a decision must be made soon, an event is approaching that will force change. The setting is at a decision-point that cannot be deferred.',
  'ongoing-accommodation': 'the community has adapted to a sustained difficulty and is still negotiating it day to day. Not a crisis, but a low-grade pressure that shapes daily life. The accommodation itself is the texture.',
  'internal-struggle': 'factional, generational, or ideological conflict within the community. Different groups want different things; the friction is internal, not external. Tension is the disagreement, not a looming event.',
  'external-relationship': 'the defining tension is the setting\'s relationship with another power — tribute, alliance, dependency, rivalry. The other party isn\'t present, but their pressure shapes daily life and decisions.',
  'identity-negotiation': 'cultural mixing, transition, hybrid traditions. The setting is figuring out who it is — what to keep, what to absorb, what to reject. Tension is about meaning, not action.',
  'recovery-rebuilding': 'a recent past crisis has passed; current focus is repair. The setting is post-disaster, post-war, or post-collapse, and the work is rebuilding rather than averting catastrophe. Tension is whether repair will hold.',
  'mystery-accommodation': 'an unresolved question — a strange phenomenon, an inherited curse, an unanswered prophecy — that the community has learned to live with. Tension comes from the mystery\'s presence, not from active conflict.',
  'seasonal-cyclical': 'predictable recurring stress (a seasonal flood, an annual rite, a generational reckoning). The community knows it\'s coming and has rituals around it. Tension is the approach of the next cycle.',
  'aspirational-striving': 'the community is pushing toward a goal — a project, a vision, an ambition. The tension is the work itself and whether they can pull it off. Forward-leaning rather than reactive.',
  'succession-question': 'the current authority is leaving, dying, stepping down, or contested — and the handoff hasn\'t happened yet. Different from internal-struggle (which is ongoing factional friction); this is a specific transition with named candidates and a deadline.',
  'resource-depletion': 'a critical resource is running out — a mine veining thin, a spring slowing, harvest land turning, lore-keepers dying without successors. No single breaking moment; the bottom just keeps approaching. Different from imminent-crisis (event-shaped) and ongoing-accommodation (which has equilibrium).',
  'open-secret': 'everyone knows something is wrong — someone is stealing, someone is a traitor, a ritual is hollow, a marriage is loveless — but no one acts on it. Tension is the willful inaction itself. Different from mystery-accommodation, which is about the unknown; this is about the willfully unaddressed known.',
  'reputational-burden': 'the setting is famous or infamous for something, and that reputation now constrains its choices. Pilgrims overrun a sacred site; duelists flock to a martial city; a trade-port must keep its image polished. The fame became a cage; the community performs itself for outsiders.',
  'inheritance-burden': 'ancestors built (or did) something — a structure, an oath, a precedent, a debt — and the current generation maintains it or lives with the consequences. The inheritance may be neutral or even prized, but it shapes everything. Distinct from recovery-rebuilding (post-disaster repair).',
  'forgotten-knowledge': 'institutional memory is decaying. The people who knew how to do X are gone, books are crumbling, the dialect is dying, the technique is half-remembered. The community is losing its grip on its own competence and the identity that depended on it.',
  // Lower-stakes tensions. Stakes are social / spiritual /
  // intellectual / aesthetic, NOT survival. Resolution doesn\'t
  // require violence or political upheaval. The community continues
  // functioning regardless of outcome. Multiple stakeholders hold
  // reasonable positions. Closing line should match the everyday-
  // stakes register, not crisis-completion.
  'communal-friction': 'low-stakes social friction within an otherwise stable community — a brewing rivalry between two guilds, a festival custom dispute, an awkward newcomer integration, a generational disagreement about how things should be done. Stakes are social or aesthetic, NOT survival; the community continues functioning regardless of outcome. Resolution doesn\'t require violence or political upheaval. Multiple parties hold reasonable positions. The friction is the texture of daily life rather than a problem demanding heroic resolution. Closing line: warm and settled, not crisis-completion.',
  'sacred-practice': 'internal tension in a religious or contemplative community — a dispute over scriptural interpretation, pilgrim-management logistics, novice training disagreements, a debate about an obscure point of liturgy, the rhythms of monastic or temple life. Stakes are spiritual and institutional, NOT physical. Resolution comes through ritual practice, reasoned debate, or quiet accommodation — never violence. The community continues its devotional life regardless of outcome. Multiple stakeholders bring legitimate theological / pedagogical perspectives. Closing line evokes ongoing practice, not dramatic conclusion.',
  'celebration-preparation': 'tension surrounding an upcoming festival, ceremony, or seasonal observance — performer rivalry, logistics complications, social dynamics around who hosts whom, last-year-vs-this-year planning disputes, food-and-drink prep stresses. Stakes are aesthetic, social, or reputational, NOT survival. Resolution unfolds through the celebration itself; the community gathers regardless of how the preparation goes. Multiple participants have stakes in how it goes. Closing line evokes the approach of the celebration, not crisis.',
  'wonder-stewardship': 'tension in a community that holds something wondrous — a sacred spring, a singing tree, a phoenix nest, a healing pool, a planar gateway, a star-touched stone. Access management, commercialization debates, stewardship questions about who tends it, how often it can be witnessed, what the etiquette is. Stakes are aesthetic and custodial, NOT survival; the wonder is stable and the community has held it for generations. Resolution is ongoing community negotiation, not crisis. Multiple parties value the wonder differently. Closing line evokes continued stewardship.',
  'knowledge-cultivation': 'tension in a scholarly or apprenticeship community — intellectual rivalry between schools of thought, pedagogical disputes about how a craft is taught, access politics around rare books or instruments, generational transmission of technique. Stakes are intellectual and reputational, NOT survival. Resolution comes through debate, publication, scholarly demonstration. The community continues its scholarship regardless of who wins which argument. Multiple positions are tenable. Closing line evokes the continuing intellectual life of the place.',
  'hospitality-strain': 'tension in a liminal or transit community — managing seasonal influx of pilgrims, travelers, or caravans, balancing locals-vs-visitors, capacity limits, etiquette tensions between resident and newcomer, the question of how welcoming to be. Stakes are social and economic, NOT survival; the town has weathered worse and the travelers keep coming. Resolution unfolds through accommodation, custom, and seasonal rhythms. Multiple stakeholders (locals, regulars, newcomers, guild-houses) have legitimate positions. Closing line evokes the continued passage of travelers.',
  'generational-transition': 'communal-scale tension around the transmission of craft, role, or knowledge — an aging master without a clear successor, a guild deciding how to evolve its practice, a ritual tradition questioning whether to admit new kinds of members, an apprenticeship pipeline narrowing. Stakes are cultural and continuity-of-practice, NOT survival. Resolution comes through apprenticeship, evolution of practice, or gentle replacement. The craft / role / knowledge persists regardless. Multiple parties have legitimate views on continuity vs. change. Closing line evokes the bridge between generations.',
  // cozy-routine is NOT part of the random pool (SETTING_TENSIONS).
  // It's only reachable when the orchestrator detects cozy / downtime
  // signals in user input via detectCozyMode and overrides the rolled
  // tension. The description below tells the LLM how to interpret
  // every "central tension" reference in the prompt — as the absence
  // of dramatic tension rather than its presence.
  'cozy-routine': 'NO dramatic tension. The user has explicitly requested cozy / peaceful / downtime / between-adventures content; the setting is in a stable, warm, low-stakes rhythm. The "central dynamic" is the texture of routine daily life — seasonal labor, market days, neighborly rhythms, gentle traditions, the kind of place adventurers go to rest and resupply. "responses_in_motion" describes pleasant or warmly-mundane current happenings — a harvest in progress, a wedding being planned, a visiting bard, a guild dispute resolved amicably, a new baker setting up shop. "present_state" is mood and atmosphere, not stakes. NO forcing decisions, NO imminent threats, NO political crises, NO succession schisms, NO looming-darkness foreshadowing, NO "borrowed-time" or "the calm before" framing. Recent events are routine, atmospheric, or warmly-mundane. The closing line is settled and warm — the setting feels safe to return to.',
};

/**
 * Pick a random tension from the pool. Used for the empty-input case
 * (no LLM involvement for tension; code-random gives uniform
 * distribution across the 9 options instead of the LLM's
 * imminent-crisis cluster).
 */
export function pickRandomTension(rng = Math.random) {
  return SETTING_TENSIONS[Math.floor(rng() * SETTING_TENSIONS.length)];
}

/**
 * Cozy-mode signals. Production observation: when users explicitly
 * requested cozy / peaceful / downtime content, the random tension
 * roll still produced dramatic tension (a "rising hill-king" decision
 * point for a "safe and warm" village). The cozy framing only got
 * applied to sensory surface, not narrative spine.
 *
 * detectCozyMode scans user input for any of these phrases. When
 * matched, the orchestrator overrides the random tension to
 * 'cozy-routine' (not in the random pool) so the main prompt's
 * tension-guidance block tells the LLM to produce stable, warm,
 * low-stakes content rather than dramatic stakes.
 *
 * The signal list is curated for low false-positive risk: phrases
 * here are almost always intentional tonal markers when they appear
 * in setting-generation lore. Add to this list as new production
 * cases surface phrasings that should trigger cozy mode.
 */
const COZY_SIGNALS = [
  'cozy',
  'downtime',
  'between adventures',
  'slice-of-life',
  'slice of life',
  'low-stakes',
  'low stakes',
  'rest and resupply',
  'safe and warm',
  'safe, warm',
  'safe, peaceful',
  'homecoming',
  'no political intrigue',
  'no political',
  'no crisis',
  'no intrigue',
  'no drama',
  'peaceful',
  'gentle',
  'tranquil',
  'idyllic',
  'pastoral',
  'lazy',
];

/**
 * Detect cozy-mode tonal request in user input. Returns true if any
 * COZY_SIGNALS phrase appears in description or lore (case-insensitive).
 * False otherwise.
 */
export function detectCozyMode(description = '', lore = '') {
  const text = `${description || ''}\n${lore || ''}`.toLowerCase();
  return COZY_SIGNALS.some(signal => text.includes(signal));
}

/**
 * Low-stakes signal → specific tension mapping. Each entry's signals
 * are checked in order; first match wins. The mapped tension is one
 * of the lower-stakes tensions added to SETTING_TENSIONS — community
 * continues functioning, stakes are aesthetic / social / spiritual /
 * intellectual rather than survival.
 *
 * This is a DIFFERENT layer from cozy-mode. Cozy → cozy-routine (no
 * tension at all). Low-stakes signals → a specific tension with some
 * texture but bounded stakes. Cozy detection runs first; if it
 * matches, this layer is skipped.
 */
const LOW_STAKES_SIGNAL_MAP = [
  {
    signals: [
      'sacred', 'contemplative', 'monastic', 'devotional',
      'pilgrim', 'pilgrimage', 'cloister', 'meditation',
      'religious order', 'temple-life',
    ],
    tension: 'sacred-practice',
  },
  {
    signals: [
      'festival', 'celebration', 'ceremony', 'festive',
      'midsummer', 'midwinter', 'harvest feast', 'feast day',
      'carnival',
    ],
    tension: 'celebration-preparation',
  },
  {
    signals: [
      'wondrous', 'sublime', 'marvelous', 'wonder',
      'phenomenon', 'miraculous', 'numinous',
    ],
    tension: 'wonder-stewardship',
  },
  {
    signals: [
      'scholarly', 'academic', 'pedagogical',
      'library', 'archive', 'university', 'school of thought',
      'apprentice', 'apprenticeship', 'craft mastery',
    ],
    tension: 'knowledge-cultivation',
  },
  {
    signals: [
      'hospitable', 'hospitality', 'way station', 'waystation',
      'caravan stop', 'travelers stopping', 'wayfarers',
      'pilgrim hostel', 'crossroads inn',
    ],
    tension: 'hospitality-strain',
  },
  {
    signals: [
      'generational transition', 'aging master', 'succession of craft',
      'passing the torch', 'inheriting the practice',
    ],
    tension: 'generational-transition',
  },
];

/**
 * Detect a low-stakes tonal signal in user input and return the
 * mapped tension key. Returns null when no signal matches.
 *
 * Caller order: detectCozyMode first (strongest signal → cozy-routine
 * override). If not cozy, call this — when it returns a tension,
 * override the rolled tension to that value. Otherwise, the rolled
 * tension stands.
 */
export function detectLowStakesTension(description = '', lore = '') {
  const text = `${description || ''}\n${lore || ''}`.toLowerCase();
  for (const entry of LOW_STAKES_SIGNAL_MAP) {
    if (entry.signals.some(signal => text.includes(signal))) {
      return entry.tension;
    }
  }
  return null;
}

/**
 * Anti-clustering: rotating bans on known LLM-attractor worldbuilding
 * tropes.
 *
 * Production observation across many empty-input setting generations
 * showed that certain worldbuilding premises recur across cultural
 * costumes — the LLM dresses the same dramatic architecture (sealed
 * danger, silence-cult, succession schism, etc.) in different
 * registers. The dimensional architecture (type / character / register
 * / tension) controls TEXTURE but not the structural premise the LLM
 * reaches for to organize the setting.
 *
 * The fix: every generation, ~70% of these tropes are banned via the
 * main prompt's ANTI-CLUSTERING block. The remaining ~30% are
 * available as attractors when the rolled dimensions naturally fit
 * them. The rotation forces the LLM to explore unfamiliar premises
 * (trade relationships, agricultural cycles, scholarly traditions,
 * craft mastery, festival cycles, ecological adaptation, etc.) most
 * of the time.
 *
 * Pool growth: as new attractors are observed in production, append
 * to this list. The architecture gets stronger over time as the pool
 * grows. Ratio (0.7) stays constant; more entries → larger ban set
 * per generation but same proportion of attractors available.
 *
 * Why every generation gets bans (not probability-gated): a
 * probability-gated approach where some generations are "free pass"
 * would default those generations to the strongest attractors —
 * exactly the clustering being prevented. Every generation needs
 * bans for the architecture to work.
 */
export const OVERUSED_TROPES = [
  'community maintaining ritual or object to keep a dangerous thing bound, sealed, or contained beneath/around them (e.g., a cult sustaining chants to feed or contain a creature, a bell-foundry binding ancient stone-eaters, bronze pillars chaining a titan\'s voice, a cracked seal holding back underworld spirits)',
  'silence-cult or community paralyzed by unspoken truth (e.g., everyone knows X but no one will speak it, a sacred curse that steals voices of those who name a traitor, a pact of silence binding the community)',
  'aging single authority figure embattled by a succession question or political schism',
  'ancient sealed evil that might break loose if maintenance fails',
  'lost knowledge or sacred text that must be recovered from a forbidden source (e.g., a ruin, a sealed archive, a stolen relic, a haunted vault)',
  'community defined by tribute-debt to a powerful neighbor or empire that is squeezing them',
  'isolated village or town with a dark secret that outsiders don\'t know',
  'cursed or fading artifact whose properties are weakening over time',
  'community split into factions over which heir or candidate should succeed',
  'aging master with no apprentice to inherit the craft or knowledge',
];

/**
 * Pick the banned-tropes subset for a single generation. Returns
 * roughly 70% of the pool as banned, leaving ~30% available as
 * attractors. The unbanned subset rotates each call.
 *
 * @param {() => number} [rng=Math.random] — injectable randomness for
 *   deterministic testing.
 * @returns {string[]} the subset of OVERUSED_TROPES to ban this
 *   generation. The caller forwards this to the main generation
 *   prompt's ANTI-CLUSTERING block.
 */
export function getBannedTropesForGeneration(rng = Math.random) {
  // Fisher-Yates-style shuffle via sort. Same bias-acknowledged
  // pattern as generateCharacterCandidates; negligible at this pool
  // size.
  const shuffled = [...OVERUSED_TROPES].sort(() => rng() - 0.5);
  const banCount = Math.ceil(OVERUSED_TROPES.length * 0.7);
  return shuffled.slice(0, banCount);
}

/**
 * Flat union of all character values across sub-dimensions. Useful
 * for shape validation (checking that an inference-returned value
 * actually exists in the pool). The sub-dimension structure is
 * preserved in `SETTING_CHARACTERS` itself for the inference prompt;
 * this is just the flat view.
 */
export const ALL_SETTING_CHARACTERS = Object.values(SETTING_CHARACTERS).flat();

/**
 * Sub-dimension names in iteration order. The inference prompt
 * enumerates these to instruct the LLM on what to pick from.
 */
export const SETTING_CHARACTER_SUBDIMENSIONS = Object.keys(SETTING_CHARACTERS);

/**
 * Reverse lookup: character value → sub-dimension name. Used by the
 * inference prompt to label candidate values ("ancient (temporal)")
 * so the LLM understands the swap-escape rule (replacement values
 * must come from the same sub-dimension as the value being swapped).
 *
 * Built once at module load from `SETTING_CHARACTERS`.
 */
export const CHARACTER_VALUE_TO_SUBDIMENSION = Object.entries(SETTING_CHARACTERS).reduce(
  (acc, [subdim, values]) => {
    values.forEach(v => { acc[v] = subdim; });
    return acc;
  },
  {},
);

/**
 * Generate N character-candidate combinations for the inference call.
 *
 * Each candidate is an array of 3 strings — one value drawn from
 * each of 3 DIFFERENT sub-dimensions, picked uniformly at random
 * from the pool entries. The LLM then picks the candidate that best
 * matches the setting's register; this curation architecture
 * eliminates training-data clustering (code-random has no
 * preferences) while still benefiting from LLM coherence-checking
 * (the selection step rejects clashes).
 *
 * Called only in the empty-input case (no description AND no lore).
 * When user input is present, the LLM picks directly from the full
 * 120-entry pool — the user's input is itself the anchor that
 * prevents training-data clustering, so candidate-based curation is
 * unneeded. When the character dimension is supplied externally as
 * a seed (cross-tool flows, sublocation inheritance), the caller
 * bypasses inference entirely for that dimension.
 *
 * @param {number} [count=3] — number of candidates to generate.
 *   Three is the calibration the architecture targets: enough
 *   variety for meaningful selection, not so many that the prompt
 *   bloats or the LLM's coherence judgment degrades.
 * @param {() => number} [rng=Math.random] — injectable randomness
 *   for deterministic testing. Each call returns a number in [0, 1).
 * @returns {string[][]} array of `count` candidates, each a flat
 *   array of 3 strings.
 */
export function generateCharacterCandidates(count = 3, rng = Math.random) {
  const subdimKeys = Object.keys(SETTING_CHARACTERS);
  return Array.from({ length: count }, () => {
    // Pick 3 distinct sub-dimensions via Fisher-Yates-style shuffle.
    // The .sort(() => rng() - 0.5) pattern is technically biased for
    // shuffles, but we're sampling 3 from 8 — the bias is negligible
    // at this scale and the implementation stays short.
    const shuffled = [...subdimKeys].sort(() => rng() - 0.5);
    const picked = shuffled.slice(0, 3);
    return picked.map(key => {
      const pool = SETTING_CHARACTERS[key];
      return pool[Math.floor(rng() * pool.length)];
    });
  });
}
