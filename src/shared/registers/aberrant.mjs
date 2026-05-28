/**
 * Aberrant character-epithet pool for the cros.land item generator.
 *
 * 80 names spanning eight sub-conventions: cosmic-deity-form,
 * apostrophe-broken mid-tier, unpronounceable elder things, whispering
 * mind-things, body-horror, star-spawn / dimensional drift, fragment-
 * names, and long-form sealed-entity. Sub-convention diversity is the
 * protective architecture against monotonous outputs.
 *
 * Phonetic register: Far Realm / cosmic horror. Apostrophe-broken
 * consonant clusters, glottal stops, unpronounceable phoneme
 * combinations, alien suffixes.
 *
 * Public-domain Lovecraftian mythos derivatives are included
 * (Cthulvarn, Yog-Sothral, Yth'oggor, Tsathoggoroth, Hastrunir,
 * Shubogoth, Azathkul, etc.) — these are genre-conventional fantasy
 * appropriations, not living-tradition concerns. Item-name construction
 * stays freehand.
 */
export const aberrantCharacterEpithets = [
  // Cosmic Deity-Form (Lovecraftian, imperious)
  'Yog-Sothral',
  'Azathkul',
  'Nyxathoth',
  'Cthulvarn',
  'Shubogoth',
  'Ulthazar',
  "Yth'oggor",
  'Hastrunir',
  "N'gathuul",
  'Tsathoggoroth',

  // Apostrophe-Broken Mid-Tier Horrors
  "Vorl'kaen",
  "Ix'thalor",
  "Dra'zul",
  "Qel'thrax",
  "Ul'karis",
  "Ark'thuun",
  "Xa'korr",
  "Zor'maeth",
  "Thal'zen",
  "Myrr'akoth",

  // Unpronounceable Elder Things
  "Y'gthul-vrek",
  "Z'kar'an-mhor",
  "N'verith-yth",
  "Q'thalax-grunn",
  "W'hraxen-vol",
  "P'soggrath-iir",
  "Vh'orraxen-sul",
  "Ph'tagn-malreth",
  "M'holthok-vren",
  "B'voggrith-aen",

  // Whispering Mind-Things (sibilant, soft)
  'Sshalaeth',
  'Esselethrim',
  'Vhosshalin',
  'Niserrath',
  'Lhuvven-shen',
  'Ysshelaen',
  'Phossaleth',
  'Velsheraen',
  'Ossothrin',
  'Vhirelaen',

  // Body-Horror Names (guttural, organic)
  'Klythrax',
  "Gorrak'mul",
  "Vrok'thuul",
  'Krunghoth',
  'Drelvrak',
  'Bhulgrath',
  'Skrymorr',
  "Throgg'malex",
  'Vurkhan',
  'Drelghuul',

  // Star-Spawn / Dimensional Drift Names
  "Xal'mareth",
  "Zon'thuvar",
  'Ix-Shalor',
  "Ozyrr'kaen",
  'Vhyl-tharox',
  'Elthuun-akar',
  'Krux-zalath',
  'Ozalvenir',
  "Yhxar'ven",
  'Velzunorr',

  // Fragment-Names (truncated, broken)
  "'thuun",
  "Vrr'k",
  "Z'thal",
  "Ix'",
  "Y'rrn",
  "Kth'a",
  "Vh'l",
  "N'shr",
  "Q'voth",
  "Rrl'k",

  // Long-Form Sealed-Entity Names
  'Azothmar-of-the-Outer-Halls',
  "Yth'oggor-Beyond-the-Vault",
  "N'gathuul-Who-Sleeps-Twice",
  'Cthulvarn-of-the-Drowned-Star',
  'Shubogoth-of-the-Splitting-Eye',
  'Hastrunir-Whose-Name-Was-Stolen',
  'Tsathoggoroth-of-the-Folded-Sea',
  'Ulthazar-of-the-Hollow-Between',
  "Vorl'kaen-Who-Speaks-Backwards",
  "Xal'mareth-of-the-Sundered-Page",
];

/**
 * Hybrid register object — single source of truth for the Aberrant
 * register. Bare-array export above stays canonical; `characterPool`
 * is an alias so callers that want the full register metadata can
 * grab the object via the registers/index.mjs aggregator.
 */
export const aberrantRegister = {
  prefix: 'Aberrant',
  descriptor: "Aberrant: unpronounceable clusters that resist natural articulation. Apostrophe-broken syllables marking glottal stops, multi-consonant onsets and codas (xth, qrn, vth, uum), vowel-poor frames; names feel pre-linguistic or post-linguistic rather than spoken — the mouth doesn't quite want to make them. Derive fresh names from the phonology; do not copy from prior generations.",
  creatureTradition: 'aberrant dungeons run on the cosmic-horror bestiary: aboleths (memory-eaters in deep water), beholders (their floating eye-tyrant kin), mind flayers (illithids and their thralls), gibbering mouthers, gricks, otyughs in the lower passages, intellect devourers, neogi (slaver-spiders), choakers, grell, cloakers. The supernatural identity is usually one alien apex with a brood of lesser kin and dominated thralls; charmed humans and beasts read as victims, not minions.',
  creatureTraditionByTier: {
    complicating: ['chokers', 'grell scouts', 'lesser intellect devourers', 'dominated human thralls'],
    significant:  ['gricks', 'otyughs', 'neogi slaver-spiders', 'gibbering mouthers (lesser brood)'],
    scary:        ['aboleths', 'beholders', 'mind flayers', 'cloakers', 'unnamed alien apex'],
  },
  materialTradition: 'non-Euclidean glass, gibbering-flesh residue, eye-mucus, alien metal that resists tarnish, displacement-shimmer, void-darkened bone, mind-stained crystal',
  characterPool: aberrantCharacterEpithets,
  characterPoolStrictness: 'preferred',
  thematic: true,
};
