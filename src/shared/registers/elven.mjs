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
