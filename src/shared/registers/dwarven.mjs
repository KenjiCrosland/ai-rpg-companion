/**
 * Dwarven character-epithet pool for the cros.land generators.
 *
 * 100 names spanning eight sub-conventions: ancient-dwarven harsh
 * constructions (Semitic-pattern phonology, original morphemes only),
 * Norse-pattern outer male names, Norse-pattern female names (these
 * are dwarven-by-genre-convention; female dwarven naming is sparse in
 * canonical fantasy), compound English-readable deed-surnames,
 * patronymic title-stacking forms, multi-syllable clan-house names,
 * earned honor-names (deed-based titles), and ancient-dwarven +
 * compound-surname hybrids.
 *
 * Keyed by ORIGIN, not register: this pool fires whenever the user
 * picks Dwarven origin, regardless of which Germanic-family register
 * (Old-Norse, Anglo-Saxon, Old-High-German, Middle-High-German,
 * Gothic) gets rolled. The names are characteristically dwarven across
 * all of those registers, so origin-binding is the right gate.
 *
 * Audit notes — names DELIBERATELY excluded during pool construction
 * per project policy (avoidance of published-character names and
 * fantasy-canon iconic surnames):
 *   - All -dûm endings (published city pattern)
 *   - All -bûl endings (published chamber pattern)
 *   - All Khaz- prefixes (published clan pattern)
 *   - All Bharak- constructions (published city name)
 *   - Tharbad references (published city)
 *   - Felak- constructions (published epithet)
 *   - Zigil (published "silver" morpheme)
 *   - Bund- (published "head" morpheme)
 *   - Mazarbûl (published chamber name)
 *   - Tholin (too close to a published name)
 *   - Thrar (too close to a published name)
 *   - Frar (published company member)
 *   - Bruenor / Battlehammer (canon-iconic surname)
 *   - Oakenshield (canon-iconic surname)
 *   - "Long-Beard" / Longbeards reference (published clan term)
 *   - Tharzghâl / -ghâl ending (published-coded suffix)
 *
 * Item-name construction stays freehand — the whitelist applies only
 * to the lore's single named character.
 */
export const dwarvenCharacterEpithets = [
  // Ancient-dwarven harsh constructions (Semitic-pattern phonology,
  // original morphemes only — no published-IP morpheme reuse)
  'Vrazgur',
  'Drukurol',
  'Azokvurn',
  'Korvarash',
  'Zhirakol',
  'Vulgarok',
  'Karkhulor',
  'Zhandukar',
  'Vorzhudur',
  'Drumakar',
  'Vulkhandar',
  'Korbathol',
  'Vurzghud',
  'Vrazkhond',
  'Korzakar',

  // Norse-Pattern Outer Names (Male — pattern-following originals,
  // not drawn from any published canon)
  'Borvin',
  'Brogi',
  'Veski',
  'Hroldur',
  'Trondir',
  'Skarvar',
  'Erivald',
  'Kjelbjorn',
  'Hraldin',
  'Brogan',
  'Olfin',
  'Hroskar',
  'Kjelvar',
  'Grimulf',
  'Throvald',

  // Norse-Pattern Female Names (Old Norse names — female dwarven
  // naming is sparse in fantasy canon, so these are dwarven only by
  // genre convention)
  'Hilda',
  'Disa',
  'Gunnhild',
  'Sigrun',
  'Tordis',
  'Brynja',
  'Ranveig',
  'Astrid',
  'Helga',
  'Frida',
  'Ingvild',
  'Solveig',
  'Thora',
  'Borghild',
  'Aslaug',

  // Compound English-Readable Deed-Surnames
  'Stonefist',
  'Hammerfall',
  'Ironbeard',
  'Goldhand',
  'Coalfist',
  'Anvilcrack',
  'Iron-Heart',
  'Deepvein',
  'Forgewright',
  'Stonewright',
  'Goldreckoner',
  'Coalkeel',
  'Hammerthrice',
  'Stonebrow',
  'Steelbeard',

  // Patronymic Title-Stacking Forms
  'Borvin son of Veski',
  'Hroldur Stonefist son of Trondir',
  'Hilda Hammerfall daughter of Brogi',
  'Brogan Ironbeard, Lord of the Deep Vaults',
  'Skarvar son of Kjelvar son of Erivald',
  'Vrazgur son of Drukurol, Master of the Iron Hall',
  'Throvald Goldhand, son of Hroldur',
  'Sigrun Stonewright, daughter of Astrid',
  'Borvin son of Throvald, Keeper of the Forge-Songs',
  'Disa Anvil-Mother, of the Khor-Vrazgund Vale',

  // Multi-Syllable Clan-House Names
  'Khor-Vrazgund',
  'Vraz-Akhol',
  'Vulkhanrok',
  'Korbath-Vor',
  'Brynkeldur',
  'Drumvarn',
  'Karkhulor-Vale',
  'Hroskaldorn',
  'Vorzhud-Hold',
  'Vurzghul-Bren',

  // Earned Honor-Names (deed-based titles)
  'Ironvein the Steady',
  'Drukurol the Stone-Reader',
  'Hilda Anvil-Mother',
  'Throvald Three-Hammers',
  'Borvin the Quiet-Forge',
  'Vrazgur of the Last Hearth',
  'Disa the Vault-Speaker',
  'Brogan Hold-Faster',
  'Brogi the Coal-Counter',
  'Hroldur Goldreckoner',

  // Ancient-dwarven + Compound-Surname Hybrid
  'Drongar Stonefist',
  'Thargrim Ironbeard',
  'Khordrim Forgewright',
  'Drukan Anvilbeard',
  'Karzgar Coalheart',
  'Vrundur Stoneblood',
  'Gazgar Hammerthrice',
  'Khrazjin Goldcoffer',
  'Tharbal Deephold',
  'Vrazgar Steelbeard',
];

/**
 * Dwarven register. Originally origin-only (dwarves were paired with
 * Old-Norse / Anglo-Saxon / Germanic registers for naming). Promoted
 * with its own `descriptor` so the dungeon and item generators can roll
 * dwarven-flavored dungeons / items directly without routing through a
 * Germanic-family register first.
 *
 * The descriptor is distinct from Norse / Germanic — dwarven naming is
 * harder, denser, more stone-and-forge anchored than Norse (which leans
 * dramatic and open-voweled).
 *
 * `fantasyRaceKey` is retained so ORIGIN_CHARACTER_WHITELISTS['Dwarven']
 * keeps routing through this pool for tools that have an Origin axis.
 */
export const dwarvenRegister = {
  prefix: 'Dwarven',
  descriptor: 'Dwarven: deep, hard-consonanted, mountain-rooted — closed syllables with hard stops (k, t, g, kh, gr), heavy doubled-consonant clusters, dense compound names anchored to stone, iron, forge, vault, lineage, oath. Characteristic endings around -grim, -thar, -bek, -kar, -din; compounds tied to mountain / smith / honor imagery. Derive fresh names from the phonology; do not copy from prior generations.',
  creatureTradition: 'dwarven mythological threats lean to creatures of stone, deep places, and stolen craft: kobolds (the Germanic mine-spirits, not the reptilian kind), gråberg (mountain-giants who watch from peaks), bergsrå (the ladies of the mountain), knockers (small malicious miners), nachzehrer (gnawing dead in forgotten vaults), wights (barrow-bound dead claiming hoarded gold), dwarven revenants who refuse to abandon their forge-debts, blood-curses tied to broken oaths, and the deep things that wake when miners dig too far. Stone golems and animated forge-constructs fit; cosmic horrors and demons do not (this register is earth-bound, not outer-planar).',
  creatureTraditionByTier: {
    complicating: ['knockers', 'mine-kobolds', 'rock-rats', 'glow-fungus swarms'],
    significant:  ['nachzehrer', 'bergsrå', 'dwarven wights', 'forge-revenants', 'shaft-trolls'],
    scary:        ['gråberg mountain-giants', 'stone golems', 'animated forge-constructs', 'deep-things from below the lowest shaft'],
  },
  materialTradition: 'forge-iron, granite, gold ingot, runic-engraved bronze, hammer-soot, beard-tar, mountain-mortar, coal',
  characterPool: dwarvenCharacterEpithets,
  characterPoolStrictness: 'preferred',
  fantasyRaceKey: 'Dwarven',
};
