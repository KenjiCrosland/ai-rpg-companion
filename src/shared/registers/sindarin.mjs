/**
 * Sindarin character-epithet pool for the cros.land item generator.
 *
 * Sub-convention diversity is the protective architecture against
 * monotonous outputs. Pool spans (originally) eight sub-conventions:
 * male names with -dir/-nir/-hir suffixes, female names with -iel/-wen/
 * -eth suffixes, color-compound names, star-and-light names, nature-
 * compound names, lord/royal names, compound deed-names, and compact
 * two-syllable names.
 *
 * Phonetic register: Tolkien Grey-Elven; Welsh-inspired phonology.
 * Soft mutations, liquid consonants, ae/ei/oe vowel clusters,
 * lyrical. Compound words with transparent meanings.
 *
 * Curation pass — Tolkien-published-name removal:
 *   - Removed direct character-name reuse: Mithrandir, Curunhir,
 *     Tinuviel, Galadhriel, Gilthoniel, Eldarion.
 *   - Removed all 10 entries from the Compound Deed-Names sub-
 *     convention (Anglachel-Bound, Mormegil the Black-Sword, Thalion
 *     the Steadfast, Ringil-Wielder, Hadhafang-Heir, Aiglos-Singer,
 *     Glamdring-Forged, Cuthalion the True-Bow, Crissaegrim-Watched,
 *     Narsil-Reforged) — every entry referenced a Tolkien-published
 *     character or item. The sub-convention is intentionally empty
 *     pending replacement entries that follow the "transparent
 *     meaning, deed-bearing epithet" pattern without exact-string
 *     collision with Tolkien-published names.
 *   - Source brief listed "Saelhir" twice (in -hir-suffix and compact-
 *     two-syllable sub-conventions); the second occurrence was dropped.
 *
 * Current entry count: 63. Add replacement entries to restore
 * sub-convention coverage (especially compound deed-names) and pool
 * size when ready.
 *
 * Item-name construction stays freehand — this is a fictional register
 * with no real-world dual-meaning sacred-adjacent words to fence off.
 */
export const sindarinCharacterEpithets = [
  // Male Names with -dir / -nir / -hir Suffixes
  'Arathadir',
  // 'Curunhir' (close to Curunír / Saruman) removed.
  'Brandir',
  'Hatholdir',
  'Thorondir',
  // 'Mithrandir' (Gandalf) removed.
  'Beleghir',
  'Saelhir',
  'Galadhir',
  'Elenhir',

  // Female Names with -iel / -wen / -eth Suffixes
  // 'Galadhriel' (close to Galadriel) removed.
  'Nimrothiel',
  // 'Tinuviel' (Lúthien Tinúviel) removed.
  'Aelindariel',
  'Lirathien',
  'Mithlosseth',
  'Saereldreth',
  'Eredhwen',
  'Glorwenneth',
  'Elariel',

  // Color-Compound Names (mor=black, mith=grey, calen=green, glor=gold, nim=white)
  'Morvellon',
  'Mithgornir',
  'Calenhad',
  'Glorrandir',
  'Nimroval',
  'Morrandel',
  'Mithrelas',
  'Calendhir',
  'Glorbeleth',
  'Nimwenneth',

  // Star and Light Names (gil-, êl-, elen-, anor-)
  // 'Gilthoniel' (Elbereth Gilthoniel) removed.
  // 'Eldarion' (son of Aragorn in the LotR appendices) removed.
  'Anardilen',
  'Elenharion',
  'Gilraen-Tirith',
  'Êlhirion',
  'Anorvaeth',
  'Gilrandel',
  'Elenwenniel',
  'Gilfaron',

  // Nature-Compound Names (eryn=wood, gond=stone, lin=pool, fela=mountain)
  'Erynbeleg',
  'Gondorin',
  'Linhirion',
  'Felarath',
  'Erynfaron',
  'Gondamar',
  'Lindiren',
  'Felagdir',
  'Erynmaethor',
  'Lossarion',

  // Lord and Royal Names (aran-, tar-, hir-)
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

  // Compound Deed-Names (transparent meaning) — sub-convention emptied
  // during the Tolkien-published-name removal. Every original entry
  // referenced a Tolkien-published character or item (Anglachel,
  // Mormegil, Thalion, Ringil, Hadhafang, Aiglos, Glamdring,
  // Cuthalion, Crissaegrim, Narsil). Replacement entries should follow
  // the same "transparent-meaning deed-bearing epithet" pattern but
  // construct from non-published Sindarin compound elements.

  // Compact Two-Syllable Names
  'Lossir',
  'Nimros',
  'Faelon',
  'Brethil',
  'Andir',
  // 'Saelhir' was duplicated in the source brief and removed here.
  'Tinwë',
  'Galen',
  'Aerlin',
  'Ithron',
];
