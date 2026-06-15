/**
 * Draconic character-epithet pool for the cros.land item generator.
 *
 * 80 names spanning eight sub-conventions intentionally — sub-
 * convention diversity is the protective architecture. When DeepSeek
 * picks "one name from this list," it's not just preserving the
 * register's phonetic register; it's getting variety across ancient
 * wyrm names, hatchling/kobold short forms, compound deed-names,
 * sibilant-heavy mage-wyrm names, clan-suffix names, Iokharic-script
 * compounds, wyrmling-earned titles, and thunder-voiced drake names.
 * Generated lore over many items shouldn't all sound like the same
 * kind of dragon.
 *
 * Phonetic register: hissing sibilants (sj, ss, sv), guttural throat-
 * clearing sounds (ach), hard consonants. First-syllable emphasis.
 *
 * No real-world religious or cultural-resistance figures; the register
 * is purely fictional. Item-name construction stays freehand because
 * the register has no real-world dual-meaning sacred-adjacent words.
 */
export const draconicCharacterEpithets = [
  // Ancient Wyrm Names (multisyllabic, imperious)
  'Arveithanos',
  'Olothurex',
  'Valamarras',
  'Tazmikorr',
  'Klausathryn',
  'Jalanvossir',
  'Aetheriskal',
  'Vorathandros',
  'Sythrazgar',
  'Kalavorrith',

  // Hatchling and Kobold-form Names (short, sharp)
  'Vrix',
  'Throk',
  'Hass',
  'Skarn',
  'Gozz',
  'Tyrr',
  'Krax',
  'Nizz',
  'Vrak',
  'Skell',

  // Compound Deed-Names (English-readable hybrid)
  'Bloodscale',
  'Goldwing',
  'Stormcrest',
  'Frostmaw',
  'Ashmaul',
  'Ironhide',
  'Silvercrest',
  'Emberclaw',
  'Thunderhoard',
  'Midnightwing',

  // Sibilant-Heavy Mage-Wyrm Names
  'Sjarrath',
  'Ssvorrach',
  'Sjirathass',
  'Svarakuss',
  'Sjorravex',
  'Hassirath',
  'Svekruss',
  'Sjelvashir',
  'Korissar',
  'Vesserath',

  // Clan-Suffix Names (-thar, -daar, -orn, -vyr, -rax)
  'Khordathar',
  'Velandaar',
  'Brakhoorn',
  'Solunvyr',
  'Tegmorax',
  'Zilathar',
  'Druendaar',
  'Skarvyrn',
  'Helzorax',
  'Bromvor',

  // Iokharic-Script Compound Names (prefix + suffix)
  'Korthax-Ven',
  'Skathyr-Mol',
  'Vraxmth-Or',
  'Glaurmth-Es',
  'Auzziryn-Dax',
  'Tharsil-Vex',
  'Borathos-Ker',
  'Iskandros-Vel',
  'Mordagh-Ren',
  'Pyrthane-Sor',

  // Wyrmling-Earned Titles (acquired across centuries)
  'Hassirath the Patient',
  'Velandaar the Counter-of-Stars',
  'Bromvor the Hoardless',
  'Sjarrath Coil-of-Ash',
  'Tegmorax Long-Wing',
  'Zilathar of the Quiet Caves',
  'Druendaar the Bargain-Sealer',
  'Korissar Star-Scorned',
  'Vesserath the Slow-Counter',
  'Skathyr-Mol the Twice-Named',

  // Thunder-Voiced Drake Names (heavy plosives)
  'Brogdrak',
  'Throkmar',
  'Krazgrok',
  'Drovbrok',
  'Gronthak',
  'Krollmox',
  'Thrunbar',
  'Drag-grok',
  'Brotmark',
  'Krunzgar',
];

export const draconicRegister = {
  prefix: 'Draconic',
  descriptor: 'Draconic: sibilant-heavy phonology (z, s, sz, sh, kh); long polysyllabic names with deep open vowels (a, o, u) carrying weight. Compound endings around -rax, -mokk, -thur, -ith, -drex convey age and territorial claim; names sound ancient, slow, sovereign. Derive fresh names from the phonology; do not copy from prior generations.',
  creatureTradition: 'draconic dungeons center on the dragon ecology: a true dragon of some color/age (the apex), with drakes, wyverns, wyrmlings, half-dragons, dragonkin honor-guards, kobolds (the reptilian dragon-worshipping kind, not the Germanic mine-spirits), pseudodragons, dragonnels, and dracoliches if undeath is in play. Charmed or dominated creatures broken to the dragon\'s will are register-appropriate (giants, ogres, beasts) — but the dragon and its kin are the SIGNATURE. The supernatural identity field should almost always name the dragon directly.',
  creatureTraditionByTier: {
    complicating: ['pseudodragons', 'dragon-worshipping kobolds', 'fledgling drake-kits'],
    significant:  ['drakes', 'wyrmlings', 'half-dragons', 'dragonkin honor-guards', 'young wyverns'],
    scary:        ['true dragon of color and age', 'adult wyverns', 'dracoliches', 'dragonnels', 'ancient hoard-dragons'],
  },
  materialTradition: 'dragon-scale shed, hoard-coin verdigris, charred stone, ember-glass, dragon-bone, sulfur crust, scorched gold',
  characterPool: draconicCharacterEpithets,
  characterPoolStrictness: 'preferred',
};
