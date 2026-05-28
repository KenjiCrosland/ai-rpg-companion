/**
 * Primordial character-epithet pool for the cros.land item generator.
 *
 * Sub-convention diversity is the protective architecture against
 * monotonous outputs. Pool spans (originally) eight sub-conventions:
 * ancient Primordial lords, Auran (air), Aquan (water), Ignan (fire),
 * Terran (earth), para-elemental (cold/magma/ooze/smoke), elemental-
 * noble compound names, and genie-court / janni servant names.
 *
 * Phonetic register: elemental — mix of dialects. Auran (airy,
 * breathy), Aquan (flowing, liquid), Ignan (sharp clicks and hisses),
 * Terran (heavy, deep, stone-syllabled). Plus pure-Primordial (older,
 * more abstract) and elemental-noble compound names.
 *
 * Curation pass — D&D Princes-of-Elemental-Evil/Good removal. The
 * source brief built much of this pool around Imix, Olhydra,
 * Ogremoch, Yan-C-Bin, Cryonax, Chan, Sunnis, Akadi, and Bwimb (the
 * Princes of Elemental Evil/Good and the Para-Elemental Princes).
 * The downstream removal hit eight sub-conventions:
 *
 *   - Ancient Primordial Lords: 8 of 10 entries removed (Akadiroth,
 *     Imixthal, Olhydross, Ogremorrok, Yan-C-Vel, Cryonarrak,
 *     Sunnisroth, Chan-Vorrak). Two pool-internal originals stay
 *     (Vrakathim, Sundinaak).
 *   - Auran: kept entirely (10).
 *   - Aquan: 5 of 10 entries removed (Olhyr-Mar, Olhyrolyn,
 *     Olhyranth, Olhyrune, Olhydross-Mar — all Olhydra-derivatives).
 *   - Ignan: 6 of 10 entries removed (Imixarrak, Imixhraskar,
 *     Pyrr-Imix, Imixzhokar, Krak-Imix, Imixphraz — all Imix-
 *     derivatives).
 *   - Terran: 3 of 10 entries removed (Ogremmoth, Ogremorvel,
 *     Ogremmath — all Ogremoch-derivatives).
 *   - Para-elemental: 4 of 10 removed (Cryonaxhel, Cryomorr,
 *     Cryssimorr, Olhydrooz, Bwimb-Sloth).
 *   - Elemental-Noble Compound: emptied entirely (10) — every entry
 *     was a Prince-of-Elemental-Evil/Good compound (Akadi-of-...,
 *     Imix-..., Olhydra-..., Ogremoch-..., Yan-C-Bin-..., Cryonax-...,
 *     Sunnis-..., Chan-...).
 *   - Genie-Court: emptied entirely (10) — every entry was a
 *     Sa'<Prince>-... pattern.
 *
 * Two sub-conventions are now empty (Elemental-Noble Compound,
 * Genie-Court). Replacement entries should construct elemental-
 * authority compound names without referencing the Princes of
 * Elemental Evil/Good or their Para-Elemental analogs.
 *
 * Source-brief annotation note: some Para-Elemental entries had
 * type hints in parentheses (e.g., "Cryonaxhel (cold)"); the
 * parentheticals were dropped so names go to the LLM as clean
 * character names rather than annotated tokens.
 *
 * Current entry count: 33. Item-name construction stays freehand.
 */
export const primordialCharacterEpithets = [
  // Ancient Primordial Lords (abstract, foundational)
  // 'Akadiroth' (Akadi), 'Imixthal' (Imix), 'Olhydross' (Olhydra),
  // 'Ogremorrok' (Ogremoch), 'Yan-C-Vel' (Yan-C-Bin), 'Cryonarrak'
  // (Cryonax), 'Sunnisroth' (Sunnis), 'Chan-Vorrak' (Chan) removed.
  'Vrakathim',
  'Sundinaak',

  // Auran (Air) — Breathy, Whisper-Sounded
  'Wif-Sylven',
  'Aralsiph',
  'Hael-Whoss',
  'Syllamir',
  'Phalwhinnen',
  'Whiff-Sylvar',
  'Raelphys',
  'Auvel-Hyss',
  'Phaelwinn',
  'Syllwhisp',

  // Aquan (Water) — Flowing, Sibilant
  // 'Olhyr-Mar', 'Olhyrolyn', 'Olhyranth', 'Olhyrune', 'Olhydross-Mar'
  // (all Olhydra-derivatives) removed.
  'Mareth-Ossvyn',
  'Hydrellin',
  'Marithoss',
  'Sythril-Olhyn',
  'Marrhyselon',

  // Ignan (Fire) — Sharp Clicks, Hisses
  // 'Imixarrak', 'Imixhraskar', 'Pyrr-Imix', 'Imixzhokar', 'Krak-Imix',
  // 'Imixphraz' (all Imix-derivatives) removed.
  'Krathraken',
  'Tszakharran',
  'Tszhar-Krenn',
  'Pyrekkar',

  // Terran (Earth) — Heavy, Deep, Stone-Syllabled
  // 'Ogremmoth', 'Ogremorvel', 'Ogremmath' (all Ogremoch-derivatives)
  // removed.
  'Druvgroth',
  'Stondurram',
  'Karak-Brunn',
  'Drogga-Mol',
  'Stonebound-Drum',
  'Karbrun-Goth',
  'Drogg-Vrund',

  // Para-Elemental (Cold, Magma, Ooze, Smoke)
  // 'Cryonaxhel', 'Cryomorr', 'Cryssimorr' (Cryonax-derivatives) and
  // 'Olhydrooz' (Olhydra-derivative) and 'Bwimb-Sloth' (Bwimb is the
  // Para-Elemental Prince of Ooze) removed.
  'Magmonax',
  'Magmoroth',
  'Smoulgar',
  'Smolgren-Whif',
  'Magmorath',

  // Elemental-Noble Compound Names — sub-convention emptied during
  // the D&D Princes-of-Elemental-Evil/Good removal. Every entry was
  // an Akadi/Imix/Olhydra/Ogremoch/Yan-C-Bin/Cryonax/Sunnis/Chan
  // compound. Replacement entries should construct elemental-
  // authority compound names without referencing the Princes.

  // Genie-Court / Janni Servants — sub-convention emptied during the
  // D&D Princes-of-Elemental-Evil/Good removal. Every entry was a
  // Sa'<Prince>-... pattern. Replacement entries should construct
  // janni-servant names without anchor on the Princes.
];

export const primordialRegister = {
  prefix: 'Primordial',
  descriptor: "Primordial: pre-language phonology — names that sound rumbled, eroded, or weathered rather than spoken. Long open vowels (aa, oo, uu), apostrophes marking pauses in the breath, compound shapes pairing an elemental root (rumble, stone, brine, gust, ember, frost, mire) with a position or motion suffix. Derive fresh names from the phonology; do not copy from prior generations.",
  creatureTradition: 'primordial dungeons run on the elemental ecology: elementals of fire / earth / water / air (the basic ranks), salamanders (fire-touched), mephits (air / fire / ice / mud / steam — the lesser elementals), genies (efreeti, djinn, dao, marid), invisible stalkers, archomentals (the named princes of elemental power), gargoyles of true elemental origin, fire snakes, magmin, water weirds. The dungeon often resembles a node, a junction, or a wound in the world where one element bleeds through.',
  creatureTraditionByTier: {
    complicating: ['mephits (air / fire / ice / mud / steam)', 'fire snakes', 'magmin', 'lesser water weirds'],
    significant:  ['gargoyles of true elemental origin', 'salamanders', 'invisible stalkers', 'elemental swarms'],
    scary:        ['elementals (fire / earth / water / air, major)', 'genies (efreeti / djinn / dao / marid)', 'archomentals (named princes of elemental power)'],
  },
  materialTradition: 'raw stone, raw fire, ice, brine, wind-shaped sand, mephit-residue, salt-crust, oil-pool, charcoal-rain',
  characterPool: primordialCharacterEpithets,
  characterPoolStrictness: 'preferred',
  thematic: true,
};
