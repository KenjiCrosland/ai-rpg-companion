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
