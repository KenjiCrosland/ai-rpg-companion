/**
 * Goblinoid character-epithet pool for the cros.land item generator.
 *
 * 100 names. Mixes five style ranges so the rotation produces tonal
 * variety across generations:
 *   1. Sharp percussive monosyllabic (Skrik, Pix, Glop).
 *   2. Doubled / repeating-syllable hyphenated (Krik-tak, Snik-snak).
 *   3. Compound trade-marker (Snikbit, Murkrak, Skragdun).
 *   4. Diminutive-ending (-bit, -kit, -git, -snit): Skragbit, Wibblekit.
 *   5. Whimsical mocking compound (Wibblesnik, Snickerblot, Glompik).
 *
 * Routed via `ORIGIN_CHARACTER_WHITELISTS['Goblinoid']` in the unified
 * registry — strictness mandatory, fires 100% of generations when the
 * resolved origin is Goblinoid.
 */
export const goblinoidCharacterEpithets = [
  // Sharp percussive monosyllabic (~20)
  'Skrik', 'Snik', 'Krik', 'Pix', 'Glop', 'Mob', 'Rik', 'Tok', 'Vrelp',
  'Klak', 'Krit', 'Plib', 'Brek', 'Knik', 'Tup', 'Wug', 'Snak', 'Glib',
  'Murp', 'Pook',
  // Doubled / repeating-syllable hyphenated (~20)
  'Krik-tak', 'Snik-snak', 'Pliz-tok', 'Skrik-skrak', 'Tok-tik',
  'Glob-glop', 'Brik-brak', 'Skrip-skrap', 'Pip-tip', 'Skab-skib',
  'Blip-blop', 'Mok-mik', 'Glik-glak', 'Mur-mok', 'Vrek-vrak',
  'Snib-snub', 'Wib-wob', 'Trib-trab', 'Pix-pak', 'Klop-klap',
  // Compound trade-marker (~20)
  'Snikbit', 'Murkrak', 'Skragdun', 'Bogtok', 'Pribsnit', 'Skuzpik',
  'Glibvar', 'Murkrik', 'Pixrik', 'Snagtoof', 'Skuzbrek', 'Wibblepock',
  'Mukgash', 'Vrekkit', 'Snagvar', 'Tobsnik', 'Drekbit', 'Krelpik',
  'Murkglak', 'Snikvor',
  // Diminutive-ending (-bit, -kit, -git, -snit) (~20)
  'Skragbit', 'Wibblekit', 'Mubzit', 'Plubgit', 'Glibkit', 'Bogkit',
  'Pribbit', 'Snagkit', 'Skuzkit', 'Snikgit', 'Murkit', 'Drubbit',
  'Knikkit', 'Tobkit', 'Snibsnit', 'Lubgit', 'Pikbit', 'Skritkit',
  'Sniksnit', 'Vrazbit',
  // Whimsical mocking compound (~20)
  'Wibblesnik', 'Boggrim', 'Glompik', 'Wugzit', 'Brillok', 'Boggle-tok',
  'Snickerwib', 'Glomwig', 'Plibsnak', 'Wugbottle', 'Snickerblot',
  'Plibwiblet', 'Tribbsnig', 'Wibwobsnig', 'Glibblesnak', 'Mubblekrik',
  'Wuggleknit', 'Snicklepok', 'Wobblegrip', 'Skribblepok',
];
