/**
 * Register registry aggregator — single source of truth for every
 * register in the system.
 *
 * The aggregator combines two sources:
 *
 *   1. Inline `minimalRegisters` entries below — registers whose data
 *      footprint is just a descriptor (and possibly a `protected` flag
 *      and a `promptArchitecture: 'catchall'` tag). They have no name
 *      pools, no avoid-lists, no cultural-notes prose, so a dedicated
 *      file would be ~4 lines of boilerplate. They stay inline.
 *
 *   2. Per-register modules in `./` — registers with structured data
 *      that warranted their own file (character/place/spirit pools,
 *      avoid-lists, cultural notes, curation history). Imported and
 *      appended to `ALL_REGISTERS`.
 *
 * Promotion is one-way: if a minimal register ever grows a pool, an
 * avoid-list, or rich cultural notes, cut its entry from
 * `minimalRegisters` and add a new file with an `xxxRegister` export.
 *
 * Each entry in `ALL_REGISTERS` is an object carrying whichever of the
 * following fields apply:
 *
 *   prefix                  — startsWith key (e.g., 'Maori-inspired')
 *   descriptor              — line that flows into `registerList`
 *   protected               — true if gated by `enableProtectedRegisters`
 *   promptArchitecture      — 'catchall' | 'pool' | undefined (universal-invent)
 *   characterPool           — curated character-name array
 *   characterPoolStrictness — 'mandatory' | 'preferred'
 *   placePool, spiritPool   — pool-architecture-only (Yoruba, Andean)
 *   itemNameAvoidList       — sacred-term avoid-list (catchall registers)
 *   culturalNotes           — register-specific prose
 *   fantasyRaceKey          — origin axis (Orcish, Goblinoid, Elven, Dwarven)
 *   thematic                — true for cosmic-genre registers
 *                              (Aberrant, Abyssal, Infernal, Primordial)
 *   itemNameGuidance,       — pool-prompt extras (Yoruba, Andean)
 *   spellingReminder,
 *   properNounsPoolOnly,
 *   cultureName,
 *   pools                   — pool-prompt label structure
 *
 * Consumers (register-list, character-whitelist-registry, catchall-
 * prompt, pool-prompt, register-whitelists) iterate `ALL_REGISTERS`
 * and pick the fields they care about, ignoring the rest. Missing
 * fields = the register doesn't participate in that mechanism.
 */

import { aberrantRegister }   from './aberrant.mjs';
import { abyssalRegister }    from './abyssal.mjs';
import { andeanRegister }     from './andean.mjs';
import { draconicRegister }   from './draconic.mjs';
import { dwarvenRegister }    from './dwarven.mjs';
import { elvenRegister }      from './elven.mjs';
import { goblinoidRegister }  from './goblinoid.mjs';
import { infernalRegister }   from './infernal.mjs';
import { maoriRegister }      from './maori.mjs';
import { orcishRegister }     from './orcish.mjs';
import { arabicRegister }     from './arabic.mjs';
import { primordialRegister } from './primordial.mjs';
import { yorubaRegister }     from './yoruba.mjs';

/**
 * Descriptor-only registers (and a few that only carry a `protected` /
 * `promptArchitecture` flag in addition). Kept inline because each
 * entry is one line and a dedicated file would be mostly boilerplate.
 *
 * All catchall-tier protected registers without curated pools live
 * here. Maori is the exception — it has a character pool, an item-
 * name avoid-list, and curator-facing prose, so it lives in
 * `./maori.mjs` and is appended below.
 */
const minimalRegisters = [
  // Western-canonical (universal-invent path; no protection layer needed)
  // Deity-mode classification: pre-Christian European traditions are
  // 'active-engagement' (extinct religion, deity names appear sparingly
  // as historical-mythological reference; active religious life uses
  // constructed epithets). Christian-era craft registers (Italian-
  // Renaissance, Middle-High-German-inspired, Old-Occitan) have no
  // deity-mode set — they're not religion-coded in fantasy use.
  //
  // Static `(e.g., Name1, Name2, Name3)` example tails removed across
  // these descriptors. Production showed the LLM cargo-culting them
  // verbatim across many generations (three Thyrsions in a row for
  // Greek-inspired, etc.) — same anchoring failure that drove
  // `rotateRegisterExamples` for fictional palettes. Without whitelist-
  // backed rotation, static example tails just become anchors. The
  // structural descriptor ("vowel-rich Te Reo phonetics," "harsh
  // consonants," "Mabinogion-era Welsh") teaches the register
  // phonology; the LLM's training supplies fresh names per generation.
  { prefix: 'Latin-inspired',                descriptor: 'Latin-inspired: formal, structured', deityMode: 'active-engagement' },
  { prefix: 'Italian-Renaissance-inspired',  descriptor: 'Italian-Renaissance-inspired: Renaissance-era Italian inventor-craftsperson register' },
  { prefix: 'Greek-inspired',                descriptor: 'Greek-inspired: mythological weight, melodic', deityMode: 'active-engagement' },
  { prefix: 'Slavic-inspired',               descriptor: 'Slavic-inspired: archaic consonant clusters, dramatic vowels; folkloric texture includes leshy (forest-lords), rusalka (drowned spirits), domovoi (household-guardians), kikimora (attic-spirits), vodyanoy (river-kings), koshchei (undying threats), baba yaga (witch-figures), zmey (serpent-dragons), the Firebird. Avoid defaulting to Orthodox-church historical fiction.', deityMode: 'active-engagement' },
  { prefix: 'Old-Slavic-inspired',           descriptor: 'Old-Slavic-inspired: pre-Christian archaic Slavic register, woodland-spirit tradition. Folklore: leshy and vila in the woods, rusalka in rivers, domovoi in homes, baba yaga in deep forests, koshchei and zmey as threats, Perun-style sky-powers, the Firebird as omen. The pre-Christian framing means folk-magic is the public religion, not a survival underneath Orthodox cover.', deityMode: 'active-engagement' },
  { prefix: 'Russian-inspired',              descriptor: 'Russian-inspired: patronymic structures, Cyrillic phonetics rendered; folkloric texture includes leshy (forest-lords), rusalka (drowned spirits) in rivers and lakes, domovoi (household-spirits) behind every stove, vodyanoy (water-tsars) in deep waters, kikimora in attics, baba yaga in the deep taiga, koshchei the undying, zmey-dragons in caves, the Firebird as omen. Do NOT default to Orthodox-church historical fiction (Old Believer villages, Patriarchs, kopecks, schismatics) — the supernatural is the texture, not the church politics.', deityMode: 'active-engagement' },
  { prefix: 'Romanian-inspired',             descriptor: 'Romanian-inspired: Latin-rooted with Slavic influence', deityMode: 'active-engagement' },
  { prefix: 'Hungarian-inspired',            descriptor: 'Hungarian-inspired: distinctive vowel harmony, Magyar register', deityMode: 'active-engagement' },
  { prefix: 'Finnish-inspired',              descriptor: 'Finnish-inspired: vowel harmony, double consonants, agglutinative compounds', deityMode: 'active-engagement' },
  { prefix: 'Norse-inspired',                descriptor: 'Norse-inspired: harsh consonants, primal force', deityMode: 'active-engagement' },
  { prefix: 'Old-Norse-inspired',            descriptor: 'Old-Norse-inspired: Eddaic register, archaic compound names, kennings', deityMode: 'active-engagement' },
  { prefix: 'Gothic-inspired',               descriptor: 'Gothic-inspired: earliest documented Germanic register, archaic and ancient-feeling, distinct from Old Norse', deityMode: 'active-engagement' },
  { prefix: 'Anglo-Saxon-inspired',          descriptor: 'Anglo-Saxon-inspired: Old English compound names, alliterative patterns', deityMode: 'active-engagement' },
  { prefix: 'Germanic-inspired',             descriptor: 'Germanic-inspired: guttural, industrial', deityMode: 'active-engagement' },
  { prefix: 'Old-High-German-inspired',      descriptor: 'Old-High-German-inspired: continental Germanic, archaic register', deityMode: 'active-engagement' },
  { prefix: 'Middle-High-German-inspired',   descriptor: 'Middle-High-German-inspired: medieval continental Germanic, Nibelungenlied-era register' },
  { prefix: 'Celtic-inspired',               descriptor: 'Celtic-inspired: soft consonants, nature references', deityMode: 'active-engagement' },
  { prefix: 'Welsh-inspired',                descriptor: 'Welsh-inspired: soft consonants (ll, dd, ch), vowel-rich, mythic-poetic register', deityMode: 'active-engagement' },
  { prefix: 'Middle-Welsh-inspired',         descriptor: 'Middle-Welsh-inspired: Mabinogion-era Welsh, soft consonants (ll, dd, ch), mythic-poetic register, fey-folk tradition', deityMode: 'active-engagement' },
  { prefix: 'Irish-inspired',                descriptor: 'Irish-inspired: Gaeilge phonetics, fey-folk register, sí-tradition', deityMode: 'active-engagement' },
  { prefix: 'Old-Irish-inspired',            descriptor: 'Old-Irish-inspired: pre-modern Gaeilge phonetics, Mythological Cycle register, sí-tradition', deityMode: 'active-engagement' },
  { prefix: 'Old-Occitan-inspired',          descriptor: 'Old-Occitan-inspired: troubadour register, courtly love poetry, refined Mediterranean aesthetic' },

  // Ancient extinct-religion Mediterranean traditions. Non-protected
  // (no living-community appropriation standing). Public-domain deity
  // and historical-figure names CAN appear directly, overriding the
  // generator's default invent-fictional rule for these registers.
  // Descriptors run longer than the Western-canonical entries to give
  // the LLM both phonological signal and grounded material-culture
  // specificity — these traditions are less embedded in default-fantasy
  // training than Latin / Greek / Norse, so the prompt does the
  // teaching.
  {
    prefix: 'Mesopotamian-inspired',
    descriptor: 'Mesopotamian-inspired: ancient Sumerian / Akkadian / Babylonian register. Phonology uses theophoric compounds (Bel-, Nabu-, Nin-, Shamshi-, Marduk-, Ashur-) and characteristic Akkadian -u / -um endings; Sumerian draws on -lugal / -en honorifics. Material culture is ziggurats, lapis-lazuli inlay, cuneiform tablets, cedar from the high mountains, reed boats, palm-wine, irrigation canals, baked-brick walls. Public-domain historical figures (Gilgamesh, Enkidu, Sargon, Hammurabi, Nebuchadnezzar) and public-domain texts (the Gilgamesh epic, the Enuma Elish) can appear directly. Real deities (Marduk, Ishtar, Anu, Enki, Tiamat, Nergal, Ereshkigal) are authorized for SPARING historical-mythological reference per the deity-handling block — see that block for the usage rule.',
    deityMode: 'active-engagement',
    // Real authentic epithets drawn from Mesopotamian texts (Enuma
    // Elish, Hammurabi's hymns, royal inscriptions, the Erra Epic).
    // Mixed formats — some are attested titles, some are common
    // formal epithets, some are domain-attribute phrases. Using
    // real-tradition epithets is itself a form of sparing engagement:
    // the epithet evokes the deity without naming them directly, in
    // the same idiom the culture itself used.
    deityEpithets: [
      'Lord of Fifty Names',          // Marduk, Enuma Elish
      'Bull-Calf of the Sun',         // Shamash imagery
      'Queen of Heaven',              // Ishtar / Inanna
      'Lady of Battles',              // Ishtar
      'the Morning Star',             // Ishtar (Venus)
      'Father of the Gods',           // Anu
      'the Just Judge',               // Shamash
      'the Cunning One',              // Enki / Ea
      'the Merciful Lord',            // common Marduk epithet
      'Lord of the Wide Earth',       // Enlil
    ],
  },
  {
    prefix: 'Phoenician-Punic-inspired',
    descriptor: 'Phoenician-Punic-inspired: ancient Mediterranean sea-trading register, Canaanite-family phonology with -baal / -melek / -bal / -shem compounds and characteristic doubled consonants. SCOPING: this register produces Phoenician-flavored FANTASY settings that GMs can drop into their own worlds, NOT historical fiction about ancient Tyre/Sidon/Carthage. Characters LIVE in constructed fantasy settings; real cultural patterns are TEXTURE, real historical specifics are NOT setting material. Cultural texture (use freely): purple-dye works with murex vats, cedar-built bireme ships, alphabet-inscribed bronze, salt-and-fish trade, silver shekel coinage, suffete magistrate system, council-of-elders governance, glass-blowing, the general trade-pattern of distant silver routes. Real deities (Baal, Tanit, Melqart, Astarte, Eshmun, Yamm, Baal-Hammon) may appear ONLY as occasional historical-mythological references in lore — never as the active patron deities of the setting; see the deity-handling block. PROHIBITED — do NOT use these directly: real historical figures as named characters or referenced ancestors (Hannibal Barca, Hamilcar, Hasdrubal, Dido, Pygmalion, Hiram, Mago, the Suffetes of specific historical periods); real historical events (the Punic Wars, Battle of Zama, sack of Carthage, the Barcid invasion); real geographic anchors as direct settings, neighbors, or trade routes (Tyre, Sidon, Carthage, Utica, Tarshish, the Punic Mediterranean coast, Numidia, Iberia-as-Tarshish). Construct fantasy place names using the register\'s phonological patterns (e.g., -baal / -melek / -shem compounds, doubled consonants) and use generic terms ("the distant silver coast," "the inland confederacy," "the war-elephant lands") for trade partners and neighbors rather than naming real ones.',
    deityMode: 'active-engagement',
    // Real authentic epithets drawn from Ugaritic / Phoenician texts,
    // Punic inscriptions, and classical-author records of Phoenician
    // religious practice.
    deityEpithets: [
      'the Cloud-Rider',              // Baal, Ugaritic
      'Prince of the Sea',            // Yamm
      'King of the City',             // Melqart (literal meaning)
      'Lord of Healing',              // Eshmun
      'the Lady',                     // Tanit, principal title
      'Face of Baal',                 // Tanit
      'the Eighth',                   // Eshmun (one of eight gods of Sidon)
      'Lord of the Furnaces',         // Melqart, smith association
      'Queen of Heaven',              // Astarte (shared with Mesopotamian)
      'the Storm-Bull',               // Baal imagery
    ],
  },
  {
    prefix: 'Egyptian-inspired',
    descriptor: 'Egyptian-inspired (pharaonic period only): ancient Egyptian register, Middle and New Kingdom theophoric compounds (-amun, -ra, -hotep, -mose, -djer, -ankh) and -et / -mut feminine endings. Material culture is faience, lapis-and-carnelian inlay, papyrus reed-pens, palm-wine, alabaster, electrum, granite obelisks, linen sails on the great river, ankh and djed amulets, kohl, painted cedar coffins. Public-domain historical figures (Imhotep, Hatshepsut, Akhenaten, Nefertiti, Ramses, Thutmose, Senmut) can appear directly. Real deities (Ra, Isis, Osiris, Anubis, Thoth, Bastet, Sekhmet, Set, Hathor, Horus) are authorized for SPARING historical-mythological reference per the deity-handling block. AVOID Orientalist genre tropes regardless of mood: mummy-curse plotlines, evil-sorcerous-pharaoh framing, exotic-seductress characterizations, and pyramids-built-by-slaves backstories. Tomb-builders were paid workers; pharaohs are political figures, not horror antagonists; magic in this register is ritual-formal, not sinister-occult.',
    deityMode: 'active-engagement',
    // Real authentic epithets drawn from the Pyramid Texts, the Book
    // of the Dead, temple inscriptions, and personal stelae.
    deityEpithets: [
      'Falcon of the Two Horizons',   // Horakhty / Horus
      'Lady of the Sycamore',         // Hathor
      'Mistress of the West',         // Hathor / Isis
      'Foremost of the Westerners',   // Osiris (Khentyamentiu)
      'Lord of the Sacred Land',      // Anubis
      'He upon his Mountain',         // Anubis
      'the Green One',                // Osiris
      'Lady of Ten Thousand Names',   // Isis
      'Three Times Great',            // Thoth (Trismegistus)
      'the Red One',                  // Set
      'Lord of All',                  // Ra
      'She Who Loves Silence',        // Bastet / Sekhmet quiescent
    ],
  },
  {
    prefix: 'Etruscan-inspired',
    descriptor: 'Etruscan-inspired: pre-Roman Italian register from the central-Tyrrhenian civilization that preceded and tutored early Rome. Distinctive non-Indo-European phonology with -na / -nu / -uchnei / -etre / -ena suffixes, and characteristic doubled consonants. Material culture is bucchero blackware pottery, painted tomb frescoes, bronze hand-mirrors with engraved scenes, iron weaponry, terracotta sculpture, gold-granulation jewelry, divination through liver-reading (haruspicy) and lightning-observation (fulgury). Public-domain historical figures (Tarquinius Priscus, Lars Porsena, Vel Saties, Tanaquil, the haruspex priest-class) can appear directly. Real deities (Tinia, Uni, Menrva, Voltumna, Aita, Vanth, Charun) are authorized for SPARING historical-mythological reference per the deity-handling block.',
    deityMode: 'active-engagement',
    // Etruscan deity-literature is largely lost (the Etruscan corpus
    // beyond inscriptions doesn't survive). Epithets below mix
    // iconographically-attested attributes (the Bolt-Hurler for Tinia
    // who threw lightning, the Hammer-Bearer for Charun who carried a
    // mallet, the Winged Watcher for Vanth who had eyes on her wings)
    // with descriptive forms grounded in the haruspex divination
    // practice. Less directly attested than the Mesopotamian /
    // Egyptian lists; expand here when better sources surface.
    deityEpithets: [
      'the Bolt-Hurler',              // Tinia, lightning-thrower
      'the Hammer-Bearer',            // Charun, mallet attribute
      'the Winged Watcher',           // Vanth, eye-feathered wings
      'Queen of the Bronze Mirror',   // Turan / Uni, mirror dedications
      'the Twelvefold Sky',           // Etruscan 16-region cosmos abbreviated
      'Lord of the Striking Heaven',  // Tinia, sky god
      'the Door-Keeper of the Necropolis',
      'the Veiled One',               // Vanth funerary aspect
    ],
  },

  // Protected registers (catchall-tier — density rules apply, no curated pool)
  // Deity-mode classification: most protected catchall registers cover
  // living religious traditions and are 'restricted' (no real deity
  // names anywhere). The Arabic register (per-file, see `./arabic.mjs`)
  // is protected and restricted-mode; its previous combined form
  // (`Arabic/Persian-inspired`) and the standalone `Persian-inspired`
  // entry were both removed when the consolidated Arabic file landed.
  // Persian-specific handling will return as its own per-file register
  // when it gets a pool and cultural notes.
  { prefix: 'Caucasian-inspired',            descriptor: 'Caucasian-inspired: mountain-peoples register drawing on Georgian/Ossetian/Chechen phonetics',                                                                       protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Atlas-Berber-inspired',         descriptor: 'Atlas-Berber-inspired: Amazigh register, North African mountain-craft tradition',                                                                       protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Pamir-inspired',                descriptor: 'Pamir-inspired: high-Central-Asian mountain register, Persian-adjacent',                                                                                                protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Japanese-inspired',             descriptor: 'Japanese-inspired: clean syllables, natural imagery',                                                                                                                                                                                protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Chinese-inspired',              descriptor: 'Chinese-inspired: tonal, philosophical',                                                                                                                                                                                              protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Korean-inspired',               descriptor: 'Korean-inspired: structured, balanced',                                                                                                                                                                                                protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Mongolian-inspired',            descriptor: 'Mongolian-inspired: bold, sweeping',                                                                                                                    protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Tibetan-inspired',              descriptor: 'Tibetan-inspired: aspirated, contemplative',                                                                                                            protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Hindi/Sanskrit-inspired',       descriptor: 'Hindi/Sanskrit-inspired: melodic, ceremonial',                                                                                                          protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Thai-inspired',                 descriptor: 'Thai-inspired: tonal, flowing',                                                                                                                                                                                                            protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Hawaiian-inspired',             descriptor: "Hawaiian-inspired: 'Ōlelo Hawai'i phonetics with okina and macron, place-coded",                                                                       protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Akan-inspired',                 descriptor: 'Akan-inspired: day-name traditions, Ghanaian register',                                                                                                 protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Igbo-inspired',                 descriptor: 'Igbo-inspired: tonal Nigerian register',                                                                                                                                                                                                  protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Swahili-inspired',              descriptor: 'Swahili-inspired (East African): rolling rhythm',                                                                                                                                                                                          protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Maya-inspired',                 descriptor: 'Maya-inspired: glottal stops and aspirated consonants, day-name structures',                                                                            protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Aztec/Nahuatl-inspired',        descriptor: 'Aztec/Nahuatl-inspired: tl-clusters and compound words, deity-and-place naming',                                                                        protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },
  { prefix: 'Lakota-inspired',               descriptor: 'Lakota-inspired: descriptive compound names, sacred-natural register',                                                                                  protected: true, promptArchitecture: 'catchall', deityMode: 'restricted' },

  // Fictional fantasy without curated pools (universal-invent path)
  { prefix: 'Gnomish',                       descriptor: 'Gnomish: clever, playful, mechanical (e.g., Fizzwocket, Cogsworth, Tinberlin)' },
  { prefix: 'Technomagical',                 descriptor: 'Technomagical: clinical with flair (e.g., Arcanaforge Mark IV, Voltspire, Aethercog)' },
];

/**
 * Full register registry. Iteration order is preserved: minimal
 * registers first (Western-canonical, then catchall-protected, then
 * fictional non-curated), then per-file registers grouped by
 * provenance.
 */
export const ALL_REGISTERS = [
  ...minimalRegisters,
  // Pool-architecture protected
  yorubaRegister,
  andeanRegister,
  // Catchall protected with curated pool
  maoriRegister,
  arabicRegister,
  // Fictional fantasy with curated pool
  elvenRegister,
  draconicRegister,
  goblinoidRegister,
  orcishRegister,
  aberrantRegister,
  abyssalRegister,
  infernalRegister,
  primordialRegister,
  // Origin-only (no register descriptor — feeds ORIGIN_CHARACTER_WHITELISTS)
  dwarvenRegister,
];

/**
 * Registers that have a register descriptor. Excludes origin-only
 * entries like Dwarven. Iteration of this list feeds `registerList`
 * and `allLanguageRegisters` downstream.
 */
export const REGISTERS_WITH_DESCRIPTOR = ALL_REGISTERS.filter(r => typeof r.descriptor === 'string');

/**
 * Convenience finder used by consumers that look up a register by
 * prefix-startsWith (the rest of the register machinery's lookup
 * convention).
 */
export function findRegisterByPrefix(selectedRegister) {
  if (typeof selectedRegister !== 'string') return null;
  return REGISTERS_WITH_DESCRIPTOR.find(r => selectedRegister.startsWith(r.prefix)) || null;
}
