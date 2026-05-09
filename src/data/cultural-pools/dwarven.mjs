/**
 * Dwarven character-epithet pool for the cros.land item generator.
 *
 * 100 names spanning eight sub-conventions: Khuzdul-style harsh
 * constructions (Semitic-pattern phonology, no Tolkien morpheme reuse),
 * Norse-pattern outer male names, Norse-pattern female names (Tolkien
 * did not name female dwarves; these are dwarven-by-genre-convention),
 * compound English-readable deed-surnames, patronymic title-stacking
 * forms, multi-syllable clan-house names, earned honor-names (deed-
 * based titles), and Khuzdul-style + compound-surname hybrids.
 *
 * Keyed by ORIGIN, not palette: this pool fires whenever the user
 * picks Dwarven origin, regardless of which Germanic-family palette
 * (Old-Norse, Anglo-Saxon, Old-High-German, Middle-High-German,
 * Gothic) gets rolled. The names are characteristically dwarven across
 * all of those registers, so origin-binding is the right gate.
 *
 * Audit notes — names DELIBERATELY excluded per project policy
 * (Tolkien-published-name and D&D-canon-character avoidance):
 *   - All -dûm endings (Khazad-dûm pattern)
 *   - All -bûl endings (Mazarbûl pattern)
 *   - All Khaz- prefixes (Khazad pattern)
 *   - All Bharak- constructions (Caradhras Khuzdul name)
 *   - Tharbad references (Tolkien Eriador city)
 *   - Felak- constructions (Felakgundu epithet)
 *   - Zigil (Tolkien Khuzdul "silver")
 *   - Bund- (Tolkien Khuzdul "head")
 *   - Mazarbûl (Chamber in Moria)
 *   - Tholin (too close to Thorin)
 *   - Thrar (too close to Thrór)
 *   - Frar (Balin's company)
 *   - Bruenor / Battlehammer (D&D-iconic via Bruenor Battlehammer)
 *   - Oakenshield (Thorin's surname)
 *   - "Long-Beard" / Longbeards reference (Tolkien for Durin's folk)
 *   - Tharzghâl / -ghâl ending (Azaghâl-coded)
 *
 * Item-name construction stays freehand — the whitelist applies only
 * to the lore's single named character.
 */
export const dwarvenCharacterEpithets = [
  // Khuzdul-Style Harsh Constructions (Semitic-pattern phonology, no
  // Tolkien morpheme reuse)
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
  // not Völuspá-or-Tolkien names)
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

  // Norse-Pattern Female Names (Old Norse names — Tolkien did not name
  // female dwarves, so these are dwarven only by genre convention)
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

  // Khuzdul-Style + Compound-Surname Hybrid
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
