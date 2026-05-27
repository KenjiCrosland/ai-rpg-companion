/**
 * Elven character-epithet pool for the cros.land generators.
 *
 * Sub-convention diversity is the protective architecture against
 * monotonous outputs. Pool spans (originally) eight sub-conventions:
 * male names with -dir/-nir/-hir suffixes, female names with -iel/-wen/
 * -eth suffixes, color-compound names, star-and-light names, nature-
 * compound names, lord/royal names, compound deed-names, and compact
 * two-syllable names.
 *
 * Phonetic register: high-fantasy elven; Welsh-inspired phonology.
 * Soft mutations, liquid consonants, ae/ei/oe vowel clusters,
 * lyrical. Compound words with transparent meanings.
 *
 * Curation pass — published-IP-name removal: names that collided
 * with characters, places, or recognizable patterns from published
 * high-fantasy IP were removed. The Compound Deed-Names sub-
 * convention is intentionally empty pending replacement entries that
 * follow the "transparent meaning, deed-bearing epithet" pattern
 * without collision risk.
 *
 * Current entry count: 49. Add replacement entries to restore
 * sub-convention coverage (especially compound deed-names) and pool
 * size when ready.
 *
 * Item-name construction stays freehand — this is a fictional register
 * with no real-world dual-meaning sacred-adjacent words to fence off.
 */
export const elvenCharacterEpithets = [
  // Male Names with -dir / -nir / -hir Suffixes
  'Arathadir',
  'Hatholdir',
  'Saelhir',
  'Elenhir',

  // Female Names with -iel / -wen / -eth Suffixes
  'Nimrothiel',
  'Aelindariel',
  'Lirathien',
  'Mithlosseth',
  'Saereldreth',
  'Eredhwen',
  'Glorwenneth',
  'Elariel',

  // Color-Compound Names
  'Morvellon',
  'Mithgornir',
  'Glorrandir',
  'Nimroval',
  'Morrandel',
  'Calendhir',
  'Glorbeleth',
  'Nimwenneth',

  // Star and Light Names
  'Elenharion',
  'Gilraen-Tirith',
  'Êlhirion',
  'Anorvaeth',
  'Gilrandel',
  'Gilfaron',

  // Nature-Compound Names
  'Linhirion',
  'Felarath',
  'Erynfaron',
  'Gondamar',
  'Lindiren',
  'Erynmaethor',

  // Lord and Royal Names
  'Aranlathon',
  'Tarondir',
  'Hirvaethor',
  'Aranfaron',
  'Tarmorvaeth',
  'Hirgalen',
  'Aranthelion',
  'Taraegir',
  'Hirenwë',
  'Aranguthor',

  // Compound Deed-Names (transparent meaning) — sub-convention
  // intentionally empty pending replacement entries that follow the
  // "transparent-meaning deed-bearing epithet" pattern without
  // collision risk against published fantasy IP.

  // Compact Two-Syllable Names
  'Lossir',
  'Nimros',
  'Faelon',
  'Andir',
  'Galen',
  'Aerlin',
  'Ithron',
];

export const elvenRegister = {
  prefix: 'Elven',
  descriptor: 'Elven: lyrical and vowel-rich — open vowels (a, e, i), soft liquid consonants (l, r, n), flowing polysyllabic names with no hard stops. Characteristic compound endings around -wen, -iel, -ariel, -ndor; names carry meanings of light, leaf, song, star, river. Derive fresh names from the phonology; do not copy from prior generations.',
  creatureTradition: 'elven dungeons lean fey-adjacent and ancient-arboreal: archfey (court-bound and capricious), treants and awakened trees, dryads, nymphs, will-o\'-wisps, displacer beasts (read as fey-beasts here), unicorns gone-wrong or corrupted, leucrottas, korred, blink-dogs as wardens, sprites and grigs as scouts, and the things that wake when an elven seal cracks. Long-lived ancients (banshees of old queens, the spirits of dead lorekeepers) and the cursed elven dead (yaggol-coded shades) are register-appropriate. Avoid orcs, demons, devils, and brute-force monsters as primary threats — those break the register.',
  creatureTraditionByTier: {
    complicating: ['sprites', 'grigs', 'pixies', 'blink-dog wardens', 'korred'],
    significant:  ['dryads gone hostile', "will-o'-wisps", 'leucrottas', 'displacer fey-beasts', 'awakened-tree saplings'],
    scary:        ['archfey of a corrupted court', 'ancient treants', 'unicorns gone-wrong', 'banshees of dead queens', 'yaggol-coded shades'],
  },
  materialTradition: 'moonsilver leaf, dew-glass, woven moss, song-thread, leaf-vellum, mithril dust, polished horn',
  characterPool: elvenCharacterEpithets,
  characterPoolStrictness: 'preferred',
  fantasyRaceKey: 'Elven',
};
