/**
 * Andean Cultural Pool — Cuzco Quechua register
 *
 * ----------------------------------------------------------------------------
 * METHODOLOGY AND SCOPE
 * ----------------------------------------------------------------------------
 *
 * This palette draws on Cuzco Quechua linguistic and material patterns — the
 * imperial register associated with the Inca state, distinguished by its full
 * three-way stop contrast (plain, aspirated, ejective) and uvular q. Quechua
 * is a living language family spoken today by roughly 13 million people across
 * Peru, Bolivia, Ecuador, and parts of Chile, Argentina, and Colombia.
 *
 * Pool entries are praise-name epithets and descriptive bynames following
 * Quechua morphological conventions — NOT given names. The dominant pattern is
 * the agentive -q form ("the doer of X"). Secondary patterns include the
 * possessive -yuq form ("bearer of X"), animal-attribute warrior bynames, and
 * quality compounds. Spirits in the pool follow the same conventions but
 * describe a spirit's action or domain rather than naming theonyms.
 *
 * ----------------------------------------------------------------------------
 * ROUTING SCOPE
 * ----------------------------------------------------------------------------
 *
 * In-scope inputs (palette should fire):
 *   - "Andean", "Inca", "Cuzco", "Cusco", "Quechua", "Quechua-inspired"
 *   - Cuzco-region or Bolivian-altiplano cultural framings with Quechua coding
 *   - Highland South American fantasy framings with explicit Inca-imperial
 *     register cues
 *
 * Out-of-scope adjacents (need their own palette if added later):
 *   - Aymara — separate language family, distinct phonology and pantheon
 *   - Ecuadorian Kichwa — lacks ejective/aspirated contrasts; different name
 *     conventions
 *   - Mapuche / Mapudungun — Patagonian, entirely separate tradition
 *   - Pre-Inca coastal cultures (Moche, Chimú, Nazca) — distinct material
 *     culture and pantheon
 *
 * Acceptable fall-through (route to general handling, not this palette):
 *   - Generic "South American fantasy" without specific Andean coding
 *   - "Indigenous American" without further specification
 *   - "Mesoamerican" framings (Aztec, Maya, etc.)
 *
 * ----------------------------------------------------------------------------
 * CURATION-TIME AVOID-LIST (NOT EXPORTED — for future curators verifying pool
 * expansions. Per ARCHITECTURE.md, avoid-lists carry priming risk and must not
 * appear in prompt-injected content.)
 * ----------------------------------------------------------------------------
 *
 * Inca emperors and royal consorts (15):
 *   Manco Capac / Manqu Qhapaq, Sinchi Roca / Sinchi Ruq'a, Lloque Yupanqui /
 *   Lluq'i Yupanki, Mayta Capac / Mayta Qhapaq, Capac Yupanqui / Qhapaq
 *   Yupanki, Inca Roca / Inka Ruq'a, Yahuar Huacac / Yawar Waqaq, Viracocha
 *   Inca / Wiraqucha Inka, Pachacuti / Pachakutiq, Tupac Inca Yupanqui /
 *   Tupaq Inka Yupanki, Huayna Capac / Wayna Qhapaq, Huascar / Waskar,
 *   Atahualpa / Atawallpa, Tupac Amaru / Tupaq Amaru (I and II), Mama Ocllo /
 *   Mama Uqllu (and Mama Huaco, Mama Runtu)
 *
 * Deities and major spiritual figures (12):
 *   Inti, Wiraqucha / Viracocha, Pachamama, Pachacamac / Pachakamaq, Mama
 *   Killa / Mama Quilla, Mama Qucha / Mama Cocha, Illapa / Apu Illapu, Supay,
 *   Ch'aska / Chaska, Mama Coca, Mama Sara, Catequil / Cataquilla
 *
 * Sacred mountains (apus) (8):
 *   Ausangate / Awsanqati, Salkantay / Sallqantay, Huascarán, Misti, Coropuna,
 *   Pariacaca, Wanakawri / Huanacauri, Pachatusan
 *
 * Sacred sites (8):
 *   Cusco / Qusqu, Machu Picchu, Ollantaytambo, Qorikancha / Coricancha,
 *   Sacsayhuamán / Saksaywaman, Tawantinsuyu / Tahuantinsuyo, Lake Titicaca /
 *   Titiqaqa, Pacaritambo
 *
 * Sacred concepts and titles (7):
 *   Wak'a / Huaca, Khipu / Quipu, Capacocha, Inti Raymi, Qoyllur Rit'i, Hanan
 *   Pacha / Kay Pacha / Uku Pacha, Sapa Inka / Sapa Inca
 *
 * Verification: every pool entry below has been checked against this list.
 * No pool entry contains any avoid-list name as a substring or near variant.
 * Note that some pool entries use morphemes that also appear in avoid-list
 * names (e.g., Yawaryuq uses "yawar" which appears in Yawar Waqaq; Sinchimaki
 * uses "sinchi" which appears in Sinchi Roca) — these are productive Quechua
 * morphemes used in many non-religious contexts, and the specific compounds
 * are distinct from the protected names.
 *
 * Structural restriction (added post-v1): the place-suffix -kancha is NOT
 * used in andeanPlaceEpithets and is excluded from the cultural-notes safe
 * place-suffix list. -kancha denotes royal or sacred enclosed compounds in
 * Andean tradition (Qorikancha, Pumakancha) and shouldn't be applied to
 * invented non-sacred places. Pool expansions must use -llaqta, -marka,
 * -pampa, -pata, -wasi, -mayu, -qucha, -ñan, or -p'unku instead. The
 * original Ninakancha entry was replaced with Ninapata under this rule.
 *
 * ----------------------------------------------------------------------------
 * RESIDUAL RISK ACKNOWLEDGMENT
 * ----------------------------------------------------------------------------
 *
 * Quechua place-name morphology is highly productive (root + pampa, marka,
 * mayu, qucha, wasi, urku, etc.). Real Quechua place names use the same
 * compositional patterns as the constructed entries here. Pool place names
 * may overlap with small villages, hills, or water features somewhere in
 * Peru, Bolivia, or Ecuador. The hard avoidance is on major sacred sites
 * (above); small-village overlap is acknowledged residual risk consistent
 * with the project's articulated values commitment.
 *
 * For character and spirit epithets, the agentive -q and possessive -yuq
 * patterns are STRUCTURALLY barred from collision with real Quechua given
 * names — those follow noun-noun or adjective-noun compounding patterns
 * (Sachasisa "jungle-flower", Ch'askañawi "star-eye", Kusi-quyllur "joyful
 * star"). The epithet-construction pattern used here is structurally distinct.
 *
 * Cultural notes accuracy is consultative-quality (research-based, not
 * native-speaker-authored). Production user feedback is the primary post-ship
 * verification mechanism.
 *
 * ----------------------------------------------------------------------------
 * SOURCES
 * ----------------------------------------------------------------------------
 *
 * Phonology and orthography:
 *   - Wikipedia, "Cusco Quechua" and "Quechuan languages"
 *   - Max Planck Institute, "Quechua: Main Points of Interest For Linguists"
 *
 * Imperial lineage and pantheon:
 *   - Wikipedia, "Sapa Inca", "Inca mythology", "Religion in the Inca Empire",
 *     "Viracocha", "Apu (god)"
 *   - Britannica, "Inca religion" and "huaca"
 *
 * Naming patterns and morphology:
 *   - Behind the Name, "Quechua Names" and "Quechua Submitted Names"
 *   - Optimaize NameAPI, Quechua/Aymara dictionary update (~3,700 documented
 *     given names)
 *   - Green Mochila, "Beginner's Guide to Quechua Place Names"
 *   - American Alpine Club, "Quechua Names in the Northern Peruvian Andes"
 *
 * Sacred geography:
 *   - Salkantay Trekking, "Apus: The Sacred Mountains of Peru"
 *   - Wikipedia, "Apu (god)" — twelve sacred apu of Cusco enumerated
 */

/**
 * Curation-time avoid-list. NOT injected into prompts (per
 * ARCHITECTURE.md, prompt-time avoid-lists carry priming risk; the
 * pool's positive constraint is the prompt-time protection). Exported
 * so tests can verify pool entries don't contain these names as
 * substrings, and so future curators expanding the pool have a
 * machine-readable reference.
 *
 * Categories covered: Inca emperors and royal consorts, deities and
 * major spiritual figures, sacred mountains (apus), sacred sites,
 * sacred concepts and titles, and (added v2) named historical figures
 * of cultural-resistance significance. The resistance-figures category
 * was added after production validation surfaced "Rumiñawi" used as a
 * fictional dark-magic name — Inca generals and post-conquest
 * rebellion leaders remain culturally significant in contemporary
 * Andean memory. The list is iterative; production user feedback may
 * necessitate further expansion.
 */
export const andeanAvoidList = [
  // === Inca emperors and royal consorts ===
  'Manco Capac', 'Manqu Qhapaq',
  'Sinchi Roca', "Sinchi Ruq'a",
  'Lloque Yupanqui', "Lluq'i Yupanki",
  'Mayta Capac', 'Mayta Qhapaq',
  'Capac Yupanqui', 'Qhapaq Yupanki',
  'Inca Roca', "Inka Ruq'a",
  'Yahuar Huacac', 'Yawar Waqaq',
  'Viracocha Inca', 'Wiraqucha Inka',
  'Pachacuti', 'Pachakutiq',
  'Tupac Inca Yupanqui', 'Tupaq Inka Yupanki',
  'Huayna Capac', 'Wayna Qhapaq',
  'Huascar', 'Waskar',
  'Atahualpa', 'Atawallpa',
  'Tupac Amaru', 'Tupaq Amaru',
  'Mama Ocllo', 'Mama Uqllu', 'Mama Huaco', 'Mama Runtu',

  // === Deities and major spiritual figures ===
  'Inti', 'Wiraqucha', 'Viracocha', 'Pachamama',
  'Pachacamac', 'Pachakamaq',
  'Mama Killa', 'Mama Quilla',
  'Mama Qucha', 'Mama Cocha',
  'Illapa', 'Apu Illapu', 'Supay',
  "Ch'aska", 'Chaska',
  'Mama Coca', 'Mama Sara',
  'Catequil', 'Cataquilla',

  // === Sacred mountains (apus) ===
  'Ausangate', 'Awsanqati',
  'Salkantay', 'Sallqantay',
  'Huascarán', 'Misti', 'Coropuna', 'Pariacaca',
  'Wanakawri', 'Huanacauri', 'Pachatusan',

  // === Sacred sites ===
  'Cusco', 'Qusqu', 'Machu Picchu', 'Ollantaytambo',
  'Qorikancha', 'Coricancha',
  'Sacsayhuamán', 'Saksaywaman',
  'Tawantinsuyu', 'Tahuantinsuyo',
  'Lake Titicaca', 'Titiqaqa',
  'Pacaritambo',

  // === Sacred concepts and titles ===
  "Wak'a", 'Huaca', 'Khipu', 'Quipu',
  'Capacocha', 'Inti Raymi',
  "Qoyllur Rit'i",
  'Hanan Pacha', 'Kay Pacha', 'Uku Pacha',
  'Sapa Inka', 'Sapa Inca',

  // === Named historical figures of resistance significance (v2 addition) ===
  // Production validation (Rumiñawi-as-cursed-ring) surfaced this category.
  // Inca generals and post-conquest rebellion leaders parse from non-sacred
  // Quechua components, which means freehand construction can reproduce them.
  'Rumiñawi', 'Rumiñahui', 'Ruminawi',           // Inca general, Quito resistance
  'Quizquiz', 'Quisquis', 'Khishkis',            // Inca general, post-Atahualpa resistance
  'Chalkuchimaq', 'Challcuchima', 'Chalcuchimac',// Inca general, Atahualpa loyalist
  'Calicuchima',                                 // (variant of above, sometimes distinct)
  'Cahuide', 'Kawiti',                           // legendary Sacsayhuamán defender
  'Mango Inca', 'Manco Inca Yupanqui',           // resistance Sapa Inca
  'Sayri Tupac', 'Sayri Tupaq',                  // Vilcabamba resistance leader
  'Titu Cusi', 'Titu Kusi Yupanki',              // Vilcabamba resistance leader
  'Juan Santos Atahualpa',                       // 18th-c. Andean rebellion leader
  'Tomás Katari',                                // 18th-c. Aymara/Andean rebel
  'Tupac Katari', 'Tupaq Katari', 'Túpac Catari',// Aymara rebellion leader
  'Bartolina Sisa',                              // Aymara rebellion leader, Tupac Katari's wife
  'Micaela Bastidas',                            // Tupac Amaru II's wife, executed leader
];

export const andeanCulturalNotes = `
This palette draws on Andean and Cuzco-Quechua linguistic and material patterns. Quechua is a living language family spoken today by roughly 13 million people across Peru, Bolivia, Ecuador, and parts of Chile, Argentina, and Colombia. The Cuzco variety modeled here is the imperial register associated with the Inca state, distinguished by its full ejective and aspirated consonant inventory. This is an active living tradition deserving serious engagement.

PHONOLOGY: Three vowels only — a, i, u. No e or o except in Spanish-influenced spellings. Cuzco Quechua has a uvular q (distinct from k) and a three-way stop contrast: plain (p, t, ch, k, q), aspirated (ph, th, chh, kh, qh), and ejective (p', t', ch', k', q'). The apostrophe marks an ejective; an h after a stop marks aspiration. Other consonants: m, n, ñ, l, ll (palatal lateral), s, h, w, y, r. Stress falls on the penultimate syllable. Vowel sequences are separate syllables, not diphthongs. Preserve apostrophes and h-after-stop spellings exactly — these are phonemic, not decorative.

NAMING CONVENTIONS: The character names in the provided pools are descriptive bynames following Quechua morphological conventions. They are NOT given names. The dominant pattern is the agentive -q form ("the doer of X" — Hamutariq the thinking one, Yachachiq the teacher, Phawariq the swift-foot). Secondary patterns include the possessive -yuq form ("bearer of X" — Sunquyuq heart-bearer, Kallpayuq strength-bearer), animal-attribute warrior bynames (Pumakallpa puma-strength, Atuqsunqu fox-hearted), and quality compounds (Sinchimaki fierce-handed, Hatunsimi great-voiced). Spirits in the pool follow the same conventions but describe a spirit's action or domain (Phuyuriq the cloud-bringer, Mayuqhawaq the river-watcher) rather than naming them as theonyms. Place names in the pool are descriptive compounds (Wayrapampa wind-plain, Phuyullaqta cloud-settlement). Use these names directly. Do not modify them with honorifics or affixes, and do not invent additional Andean-styled names beyond the pool.

The character names in the provided pools are praise-name epithets (descriptive identity-handles) following Quechua descriptive-naming conventions. They function as character names in lore but their semantic content is descriptive — they imply identity through marked-by qualities (the rememberer, the strength-haver, the wind-hearted one). Pool entries use multiple Quechua name-construction patterns: agentive -q forms, possessive -yuq forms, and X-sunqu quality compounds. Use them as character names directly. Do not invent additional names. Rely on your knowledge of Quechua morphology to interpret meanings and pick names that fit the lore's tone.

MATERIAL CULTURE: Cyclopean stonework with no mortar, dressed-stone irrigation channels, terraced agriculture climbing impossibly steep slopes. Textiles are warp-faced weaves with geometric tocapu motifs in red, ochre, indigo, and undyed alpaca; chumpi (woven sashes) and chuspa (small bags) are everyday items. Metalwork favors hammered metal worked into discs, beakers, and ear-spools rather than cast objects; copper (yauri) is the everyday metal. Camelids (llama, alpaca, vicuña) provide wool, meat, and pack labor at altitude. High-altitude staples include potato (papa), quinoa, kiwicha, and ulluku. Use these material-culture specifics in lore framing rather than defaulting to generic-fantasy materials.

VISUAL AND SENSORY FLAVOR: The Andean world spans multiple sensory registers depending on altitude and region. High-altitude registers include thin sharp air, the smell of cold stone, distant condor cries, the silence after a rockslide, the slow drift of mountain mist. Coastal registers include salt-spray and wet sand, the cries of seabirds, the sun on dried algae, the taste of fish-broth. Highland-valley registers include warm midday sun on terraced fields, the sound of water in irrigation channels, the smell of alpaca wool drying, the rhythm of weaving looms. Forest-fringe registers include damp moss, the calls of unfamiliar birds, the heavy weight of cloud-forest humidity. Each region has its own quality of light and weight of air. Vary atmospheric details across generations rather than defaulting to a single register. The atmosphere is animistic without being theologically specific: mountains have personalities, rivers are conversational, ancestors stay close. A reciprocity ethic — you give to the land and the land gives back — animates everyday life. Evoke this without invoking specific real cosmological structures.

WHAT TO AVOID: Do not use the names of Inca emperors or their consorts — the lineage from the founding ruler through the last emperor, including the empire-builder, the great expander, and the resistance leaders, all of whom remain culturally significant figures. Do not use the names of named Inca generals or post-conquest resistance leaders — figures like the Quito-resistance general, the Vilcabamba-resistance Sapa Incas, or the 18th-century rebellion leaders parse from non-sacred Quechua components but remain culturally significant figures in contemporary Andean memory. Do not use the names of Andean deities — the sun, the moon, the creator, the earth-mother, the thunder-god, the sea-goddess, the dawn-goddess, the death-god — invent your own fictional named entities for any divine figures the lore requires. Do not use the names of the sacred mountains; do not invent new "Apu [X]", "Mama [X]", or "Tayta [X]" honorifics, since those titles belong to the actual living tradition. Do not use the major Inca cities, temples, or origin sites as place names. Do not name fictional ceremonies after real Andean rituals. Do not appropriate sacred concepts like the knotted record-cord, the ceremonial duel-encounter, or the tripartite cosmological realms — if the setting needs analogous concepts, invent fictional names for them.

COMPOUND CONSTRUCTION PATTERNS TO AVOID: Quechua's productive morphology means that compound constructions from non-sacred individual components can accidentally produce names that have specific cultural-religious or historical resonance. The following compound patterns must be avoided when constructing any new compound name (whether for an item, place, character, or fictional concept):
- "[X]-kancha": This pattern produces sacred royal/temple compound names in Inca tradition (Qorikancha, Pumakancha, Hatunkancha). Even when X is non-sacred, the construction reads as sacred-coded. Use "[X]-llaqta" (settlement), "[X]-marka" (region), "[X]-pampa" (plain), or "[X]-pata" (height) for fictional non-sacred places instead.
- "Yawar [X]" and "Yawar-[X]": Yawar (blood) compounds produce names that overlap with real Andean cultural-historical concepts. Yawar Mayu is a documented ritual practice, Yawar Fiesta is a real ceremonial tradition, and multiple geographic places use Yawar in their names. Avoid Yawar-compounds entirely; substitute with non-blood-coded compounds for fictional dark imagery (puka 'red', yana 'black', and qhilli 'gray' carry similar mood without the cultural overlap).
- "[X]-ñawi" for personal names: This pattern produces real historical figure names (the Quito-resistance general's name parses as stone-eye). For personal-name construction, prefer agentive -q forms or possessive -yuq forms which structurally signal epithet rather than historical-figure naming.
- "[X]-Inka" and "[X]-Inca": Always treat as forming royal/imperial titles. Never use Inka/Inca as a compound element in fictional names.
- "[X]-amaru" (serpent): Avoid as a personal name component. Tupac Amaru is the most prominent example, but [X]-amaru constructions broadly read as dynastic-resistance-coded.

When constructing an item name freehand from Quechua word components, verify the compound doesn't pattern-match these forbidden constructions before using.

ITEM-NAME CONSTRUCTION: When constructing an item's original-language name, use ONLY these pre-approved components, joined with descriptive elements:
- Item types: thinka (rod), tawra (sword), warak'a (sling), chuki (lance), kallana (cup), p'ukucha (vessel), wasi-q'ipi (small-bag), unkhuna (cloth), ch'uspa (pouch).
- Material descriptors: yana (black), puka (red), q'illu (yellow), ankas (blue), q'umir (green), yuraq (white), qhilli (gray).
- Quality descriptors: ch'uya (clear), llamp'u (gentle), hatun (great), uchuy (small), mawk'a (old), musuq (new), llasa (heavy), pisi (light).
Do NOT use: yawar (blood), inka, amaru (serpent), sapa (sole/sovereign), qhapaq (royal), wak'a, khipu, pacha (cosmic-time-coded). Do NOT construct compounds in [X]-kancha or [X]-ñawi patterns. Do NOT include any avoid-list component as part of a constructed name.

POOL-ONLY INSTRUCTION: Use only entries from the provided pools for character names, place names, and spirit names. Do NOT generate Andean-styled character/place/spirit names beyond what the pools contain. Do NOT construct new compound names from Quechua components for proper nouns of people, places, or spirits. Do not modify pool entries by adding honorifics, prefixes, or suffixes that aren't already present. The pools are sufficient for any character, location, or spirit-figure that needs an Andean-flavored name. The single exception is item-name construction, which is permitted within the constrained vocabulary specified in ITEM-NAME CONSTRUCTION above — and even there, every constructed compound must clear the COMPOUND CONSTRUCTION PATTERNS TO AVOID checklist.
`.trim();

export const andeanCharacterEpithets = [
  // === Agentive -q forms (the dominant pattern: "the doer of X") ===
  'Hamutariq',     // the thinking one (hamutay 'to ponder' + iter -ri- + agt -q)
  'Yachachiq',     // the teacher (yachay 'to know' + caus -chi- + -q)
  'Yuyariq',       // the rememberer (yuyay 'to remember')
  'Khuyariq',      // the compassionate (khuyay 'to love compassionately')
  'Munariq',       // the willing one (munay 'to want, will')
  'Saminchaq',     // the blesser (sami 'good fortune' + verbalizer -ncha- + -q)
  'Rikch\'ariq',   // the awakening one (rikch'ariy 'to awaken')
  'Phawariq',      // the swift-foot (phaway 'to fly' — epithet for runner/messenger)
  'Maskhaq',       // the seeker (maskhay 'to search')
  'Suyariq',       // the patient one (suyay 'to wait, hope')
  'Watariq',       // the binder (watay 'to bind')
  'Sayariq',       // the upstanding (sayay 'to stand')
  'Tarpuq',        // the sower (tarpuy 'to plant')
  'Hawariq',       // the chronicler (hawariy 'to tell stories')
  'Qhawariq',      // the watcher (qhaway 'to look')
  'Llank\'ariq',   // the laborer (llank'ay 'to work')
  'Puriq',         // the walker, the wanderer (puriy 'to walk')
  'Ch\'uyaqhawaq', // the clear-watcher (ch'uya 'clear' + qhaway + -q)

  // === Possessive -yuq forms ("bearer of X", attributive) ===
  'Sunquyuq',      // heart-bearer, the courageous (sunqu 'heart')
  'Kallpayuq',     // strength-bearer, the powerful (kallpa 'strength')
  'Misk\'iyuq',    // honey-tongued (misk'i 'honey')
  'Ñawiyuq',       // keen-eyed (ñawi 'eye')
  'Sutiyuq',       // name-bearer, the renowned (suti 'name')
  'Q\'aytuyuq',    // well-spun (q'aytu 'thread' — epithet for a master weaver/diplomat)
  'Samiyuq',       // good-fortune-bearer, the blessed (sami 'good fortune')
  // (Yawaryuq was here in v1; removed under the v2 ban on Yawar-X compounds —
  // Yawar Mayu is a documented ritual concept, [X] Yawar [X] compounds read as
  // culturally-loaded.)

  // === Animal-attribute warrior bynames (an attested Andean byname pattern) ===
  'Pumakallpa',    // puma-strength
  'Kunturñan',     // condor-path (the high-traveler)
  'Atuqsunqu',     // fox-hearted (the cunning one)
  'Wamansimi',     // hawk-tongued (the sharp-spoken)
  'Q\'entisimi',   // hummingbird-tongued (the swift-spoken; messenger or envoy)
  // (Amaruwasa was here in v1; removed under the v2 ban on amaru-as-component —
  // [X]-amaru constructions read as dynastic-resistance-coded.)

  // === Quality-compound bynames (descriptive, not name-pattern) ===
  'Sinchimaki',    // fierce-handed (sinchi 'fierce' + maki 'hand')
  'Hatunsimi',     // great-voiced (hatun 'great' + simi 'mouth/voice')

  // === Passive participles (the recipient of an action, "the X-ed one") ===
  'Maskhasqa',     // the sought-after (passive participle of maskhay)
  'Munasqa',       // the beloved (passive participle of munay)
];

export const andeanPlaceEpithets = [
  // === Plain/Mountain/Region compounds ===
  'Wayrapampa',    // wind plain
  'Ch\'uyapampa',  // clear plain
  'Rumimarka',     // stone region
  'Atuqurku',      // fox mountain
  'Phuyullaqta',   // cloud settlement

  // === Water-feature compounds (mayu river, qucha lake, pukyu spring) ===
  'Misk\'imayu',   // honey river
  'Llamp\'umayu',  // gentle river
  'Pukamayu',      // red river (an iron-rich or sunset-colored watercourse)
  // (Yawarmayu was here in v1; removed under the v2 ban on Yawar-X compounds —
  // Yawar Mayu is a documented ritual practice and culturally-loaded geography.)
  'Achikqucha',    // dawn lake
  'Ch\'uyaqucha',  // clear lake
  'Misk\'iqucha',  // honey lake
  'Wamanqucha',    // hawk lake

  // === Path / threshold compounds (ñan path, p'unku door, q'asa pass) ===
  'Achikñan',      // dawn path
  'Kallpañan',     // strength path (a road of trial)
  'Phuyup\'unku',  // cloud-door (a pass through the clouds)
  'Atuqp\'unku',   // fox-door (a narrow pass)

  // === Height / structure compounds (pata height, wasi house) ===
  // Note: -kancha is NOT used here. The suffix denotes royal or sacred
  // enclosed compounds in Andean tradition (Qorikancha, Pumakancha) and
  // should not be applied to invented non-sacred places. Use -llaqta
  // (settlement), -marka (region), -pampa (plain), or -pata (height)
  // instead. This caution was added after v1 — Ninakancha was removed
  // from this pool and replaced with Ninapata.
  'Sayaripata',    // standing height (a watchtower, lookout)
  'Sunqupata',     // heart height
  'Qillqawasi',    // writing-house (a hall of records, archive)
  'Ninapata',      // fire-height (a hearth-mound, beacon-place)
  'Sumaqsamana',   // beautiful resting-place (samana 'resting place')
  'Sumaqurpi',     // beautiful-dove (a place named for a notable sighting)
];

export const andeanSpiritEpithets = [
  // === Agentive forms describing the spirit's action or role ===
  'Phuyuriq',         // the cloud-bringer
  'Tamyariq',         // the rain-bringer (tamya 'rain')
  'Mayuqhawaq',       // the river-watcher
  'Wayraqhawaq',      // the wind-watcher (a sentinel-spirit)
  'Ñanpuriq',         // the path-walker (ñan 'path' + puriy)
  'Pakarichiq',       // the dawn-bringer (paqariy 'to dawn' + caus -chi- + -q)
  'Phuyukachaq',      // the cloud-sender (kachay 'to send')
  'Ninapaqariq',      // the fire-kindler (paqariy 'to bring forth' + -q)
  'Llakihampiq',      // the sorrow-healer (llaki 'sorrow' + hampiy 'to heal')
  'Llakiwakaq',       // the sorrow-weeper (waqay 'to weep' — note: distinct from emperor Yawar Waqaq)

  // === Possessive forms describing the spirit's domain or attribute ===
  'Q\'asakallpayuq',  // pass-strength-bearer (a spirit who lends strength to high travelers)
  'Mayuqispiyuq',     // river-clarity-bearer (a spirit of pure waters)
  'Quyllurñawiyuq',   // star-eye-bearer (a celestial sentinel)
];
