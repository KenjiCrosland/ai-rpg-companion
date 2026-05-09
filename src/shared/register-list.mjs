/**
 * Language registers — purely linguistic. No thematic implications;
 * any register can pair with any origin. Adding entries here is always
 * allowed; removing requires considering whether any saved item lore
 * references the register.
 *
 * The set is intentionally biased toward specific cultural-linguistic
 * traditions over generic regional categories. Earlier versions used
 * "Polynesian-inspired" / "Mesoamerican-inspired" / "West African-
 * inspired" / "Indigenous-North-American-inspired" / "Eastern
 * European-inspired" — those flatten distinct living cultures (Maori
 * ≠ Hawaiian, Maya ≠ Aztec, Yoruba ≠ Akan ≠ Igbo, etc.). Splits were
 * applied where DeepSeek demonstrably engages with the underlying
 * traditions distinctly. Generics that DeepSeek treats as a single
 * pastiche stay merged for now (e.g., Hindi/Sanskrit). Expansion is
 * open-ended; further splits are valid as the model's training
 * depth on individual traditions warrants them.
 *
 * Format: each entry is a single string of the form
 *   `<prefix>: <descriptor> (e.g., <Example1>, <Example2>, <Example3>)`
 * where <prefix> is the unique key the rest of the register machinery
 * (selectRegister, fantasyRaceConventionalRegisters,
 * orcGoblinExcludedRegisters, userInputLanguageDetection,
 * rotateRegisterExamples) refers to via String#startsWith.
 *
 * Lives in its own module so test suites can verify integrity
 * (every prefix referenced in fantasyRaceConventionalRegisters
 * resolves to an entry here, no orphan references) without depending
 * on inline data inside ItemGenerator.vue.
 *
 * PROTECTED-REGISTER FEATURE FLAG
 * ------------------------------
 *
 * `enableProtectedRegisters` (default: false) gates every non-Western,
 * non-fictional register out of the consumer-facing `registerList`
 * export. The full list survives as `allLanguageRegisters` and the
 * downstream protection machinery (catchall block, Yoruba/Andean pool
 * prompts, item-name avoid-lists, character-name whitelists) stays
 * intact, so re-enabling is a one-line flip — no architectural
 * unwinding required.
 *
 * Why off by default: the protections still need work to consistently
 * suppress sacred-coded outputs across all the affected registers. Until
 * that work lands, shipping these registers risks producing culturally
 * insensitive items at the user's expense. Western-canonical and
 * fictional-fantasy registers don't carry the same risk and remain
 * available.
 *
 * What gets filtered when the flag is off:
 *   - Every prefix in PROTECTED_REGISTER_PREFIXES is dropped from
 *     `registerList` (the consumer-facing array).
 *   - Cultural detection auto-fails for these registers because
 *     `detectRegisterFromInput` only returns registers present in
 *     the caller-provided pool.
 *   - The catchall prompt block, Yoruba/Andean pool prompts, and
 *     item-name avoid-lists become unreachable because their gating
 *     registers are no longer selectable. The code paths stay defined.
 *
 * What is NOT affected:
 *   - `fantasyRaceConventionalRegisters` (Western-only allow-lists for
 *     Orcish/Goblinoid/Dwarven/Gnomish/Elven; no protected members).
 *   - `horrorOriginRegisterPool` (Western-only/fictional; no protected
 *     members).
 *   - The Giant cross-cultural-archetype branch (filters into
 *     whatever's in `registerList`, so naturally restricts to the
 *     active set).
 *
 * To re-enable: flip `enableProtectedRegisters` to `true`. That is the
 * only change required. Tests that exercise protected registers pass
 * their own inline arrays, so test runs are unaffected by the flag's
 * value.
 */

export const enableProtectedRegisters = false;

/**
 * Register prefixes shipped only when `enableProtectedRegisters` is true.
 * Every entry here is a real-world cultural-linguistic tradition with
 * non-trivial appropriation/sacred-coding risk that we don't yet have
 * sufficient protection to mitigate consistently in production.
 *
 * Membership is conservative: when in doubt, a register belongs in this
 * list. Western-canonical registers (Latin-family, Norse-family,
 * Germanic-family, Celtic-family, Slavic-family, Hungarian, Finnish,
 * Italian Renaissance, Old Occitan) and fictional-fantasy registers
 * (Sindarin, Draconic, Goblin, Orcish, Gnomish, Aberrant, Abyssal,
 * Infernal, Primordial, Technomagical) are NOT in this list and remain
 * available with the flag off.
 */
export const PROTECTED_REGISTER_PREFIXES = [
  // East / Southeast / Central / South Asian
  'Japanese-inspired',
  'Chinese-inspired',
  'Korean-inspired',
  'Thai-inspired',
  'Mongolian-inspired',
  'Tibetan-inspired',
  'Hindi/Sanskrit-inspired',
  'Pamir-inspired',
  // Middle Eastern
  'Arabic/Persian-inspired',
  'Persian-inspired',
  // North African
  'Atlas-Berber-inspired',
  // Sub-Saharan African
  'Yoruba-inspired',
  'Akan-inspired',
  'Igbo-inspired',
  'Swahili-inspired',
  // Pacific
  'Maori-inspired',
  'Hawaiian-inspired',
  // Mesoamerican
  'Maya-inspired',
  'Aztec/Nahuatl-inspired',
  // Andean
  'Andean-inspired',
  // Indigenous American
  'Lakota-inspired',
  // Caucasus
  'Caucasian-inspired',
];

export const allLanguageRegisters = [
  // Real-world cultural traditions
  'Latin-inspired: formal, structured (e.g., Aurelium, Ferrata, Nexus Imperium)',
  'Italian-Renaissance-inspired: Renaissance-era Italian inventor-craftsperson register (e.g., Leonardo, Beatrice, Filippo)',
  'Greek-inspired: mythological weight, melodic (e.g., Thyrsion, Aeoliphos, Kymera)',
  'Slavic-inspired: archaic consonant clusters, dramatic vowels (e.g., Voronsk, Mirjan, Kresnik)',
  'Old-Slavic-inspired: archaic Slavic register, woodland-spirit tradition, leshy/vila folklore (e.g., Vesna, Radomir, Mokosh)',
  'Russian-inspired: patronymic structures, Cyrillic phonetics rendered (e.g., Anastasia Sergeyevna, Volodymyr, Yelena)',
  'Romanian-inspired: Latin-rooted with Slavic influence (e.g., Mihai, Dragoş, Stefania)',
  'Hungarian-inspired: distinctive vowel harmony, Magyar register (e.g., Csaba, Kinga, Zoltán)',
  'Finnish-inspired: vowel harmony, double consonants, agglutinative compounds (e.g., Aino, Väinämö, Ilmari)',
  'Norse-inspired: harsh consonants, primal force (e.g., Stormbreak, Ashveil, Grimthorn)',
  'Old-Norse-inspired: Eddaic register, archaic compound names, kennings (e.g., Sigrún, Hjorleif, Thrym)',
  'Gothic-inspired: earliest documented Germanic register, archaic and ancient-feeling, distinct from Old Norse (e.g., Athanaric, Theodoric, Hildibald)',
  'Anglo-Saxon-inspired: Old English compound names, alliterative patterns (e.g., Wulfstan, Æthelflæd, Beorhtric)',
  'Germanic-inspired: guttural, industrial (e.g., Grundrak, Hammerfel, Eisenmark)',
  'Old-High-German-inspired: continental Germanic, archaic register (e.g., Hildebrand, Adelheid, Walther)',
  'Middle-High-German-inspired: medieval continental Germanic, Nibelungenlied-era register (e.g., Hagen, Kriemhild, Brunhild)',
  'Celtic-inspired: soft consonants, nature references (e.g., Branwen, Caelith, Dunmara)',
  'Welsh-inspired: soft consonants (ll, dd, ch), vowel-rich, mythic-poetic register (e.g., Branwen, Caelith, Dunmara)',
  'Middle-Welsh-inspired: Mabinogion-era Welsh, soft consonants (ll, dd, ch), mythic-poetic register, fey-folk tradition (e.g., Pryderi, Rhiannon, Gwydion)',
  'Irish-inspired: Gaeilge phonetics, fey-folk register, sí-tradition (e.g., Niamh, Cormac, Aoife)',
  'Old-Irish-inspired: pre-modern Gaeilge phonetics, Mythological Cycle register, sí-tradition (e.g., Cúchulainn, Étaín, Lugh)',
  'Old-Occitan-inspired: troubadour register, courtly love poetry, refined Mediterranean aesthetic (e.g., Bertran, Azalaïs, Raimon)',
  'Caucasian-inspired: mountain-peoples register drawing on Georgian/Ossetian/Chechen phonetics (e.g., Tamuna, Otar, Nart)',
  // Atlas-Berber: example tail removed under the protected-register
  // seed audit. Tin-Hinan, Massinissa, and Yuba are real historical
  // Amazigh/Numidian figures; using them as fictional fantasy seeds
  // pulls the LLM toward reproducing real cultural specifics. The
  // descriptor still teaches the linguistic register; specific
  // example names aren't necessary for that.
  'Atlas-Berber-inspired: Amazigh register, North African mountain-craft tradition',
  'Pamir-inspired: high-Central-Asian mountain register, Persian-adjacent (e.g., Roshan, Wakhi, Soghd)',
  // Arabic/Persian: scope is RESTRICTED to pre-Islamic Arabic
  // (Jahili-era poetic register; vocabulary that predates Islamic
  // religious terminology) OR Persian. No Islamic religious figures,
  // titles, or sacred terms. The seed "Sayyid" was removed because
  // it's a specifically Islamic religious-honorific title used for
  // descendants of Muhammad. Qamar al-Sahir ("moon of the magician")
  // and Zafira are constructed/secular and stay.
  'Arabic/Persian-inspired: flowing, melodic; pre-Islamic Arabic OR Persian register only — no Islamic religious vocabulary (e.g., Qamar al-Sahir, Zafira)',
  // Persian: example tail removed under the protected-register seed
  // audit. Anahita is a real Zoroastrian goddess; Cyrus and Roxana
  // are real historical figures (Persian emperor and Alexander's
  // wife). The older Arabic/Persian-inspired register above stays
  // unaudited — its seeds (Qamar al-Sahir, Zafira) are constructed
  // and don't carry the same real-referent weight.
  'Persian-inspired: refined classical-aesthetic register',
  // Hebrew-inspired was removed from the register list entirely. The
  // earlier audit removed its seed examples and dropped it from the
  // Giant conventional pool; this further removal keeps Jewish
  // religious-cultural specifics off the random-rolling path even
  // for cultural detection. The detection-map entry was likewise
  // removed; user-typed Hebrew-language signals (shofar, menorah,
  // golem, etc.) now fall through to the LLM's world-knowledge path
  // via the LANGUAGE REGISTER OVERRIDE prompt block, where the
  // universal-invent rule still applies.
  'Japanese-inspired: clean syllables, natural imagery (e.g., Kagezuki, Shiawase, Tsubasa)',
  'Chinese-inspired: tonal, philosophical (e.g., Jianhao, Mei-Lin, Wangshu)',
  'Korean-inspired: structured, balanced (e.g., Soohyun, Jaewon, Hyejin)',
  // Mongolian: example tail removed under the protected-register seed
  // audit. Temujin is Genghis Khan's birth name — a specific,
  // historically and politically loaded real person, not a generic
  // naming convention. Khulan was one of his wives. Using these as
  // fictional fantasy seeds reproduces the same pattern that the
  // Lakota / Sitting Bull example modeled.
  'Mongolian-inspired: bold, sweeping',
  // Tibetan: example tail removed under the protected-register seed
  // audit. Dorje refers to the vajra, a sacred Vajrayana Buddhist
  // ritual implement (and conceptual figure). Tashi and Pema are
  // common given names with religious meanings ("auspicious," "lotus")
  // — the conservative call is to drop the tail rather than parse
  // which seeds carry sacred weight.
  'Tibetan-inspired: aspirated, contemplative',
  // Hindi/Sanskrit: example tail removed under the protected-register
  // seed audit. "Devraj" is a deity epithet (king-of-Devas, used for
  // Indra); the other examples were too close to deity-adjacent
  // semantics to keep without cultural-knowledge consultation.
  'Hindi/Sanskrit-inspired: melodic, ceremonial',
  'Thai-inspired: tonal, flowing (e.g., Niran, Suchada, Anong)',
  // Maori: example tail removed under the protected-register seed
  // audit. Tāne-mahuta is a real Māori atua (god of the forest);
  // using it as a fictional fantasy seed pulls the LLM toward
  // reproducing real Māori cosmology directly.
  'Maori-inspired: vowel-rich Te Reo phonetics, nature-grounded',
  // Hawaiian: example tail removed under the protected-register seed
  // audit. The previous seeds were constructed Hawaiian-language
  // names ("lehuanani" = "beautiful lehua"), but lehua is a sacred
  // plant in Hawaiian cultural-religious tradition; the conservative
  // call is to remove the tail and let the descriptor teach the
  // register on its own.
  'Hawaiian-inspired: \'Ōlelo Hawai\'i phonetics with okina and macron, place-coded',
  // Yoruba: example tail removed under the protected-register seed
  // audit. "Olorun" is the Yoruba supreme deity; deity names were the
  // original failure mode this audit addresses.
  'Yoruba-inspired: rhythmic with diacriticals',
  // Akan: example tail removed under the protected-register seed audit.
  // Kwame/Adwoa/Yaa are Akan day-names — a real and central naming
  // convention rather than fictional samples; their iconic association
  // with real public figures (e.g., Kwame Nkrumah) made them too
  // anchor-heavy as seeds.
  'Akan-inspired: day-name traditions, Ghanaian register',
  'Igbo-inspired: tonal Nigerian register (e.g., Chioma, Obinna, Adaeze)',
  // Swahili: replaced "Asante" (reads as the Akan/Asante kingdom name
  // and as the common word for "thank you"; either reading is fine,
  // but the kingdom-name reading was an attractor toward
  // appropriating-empire framings) with "Subira" (patience). Zuberi
  // (strong) and Imani (faith) stay — common given names without
  // specific religious or political reference.
  'Swahili-inspired (East African): rolling rhythm (e.g., Subira, Zuberi, Imani)',
  // Maya: example tail removed under the protected-register seed
  // audit. Ix-Chel (jaguar moon-goddess of midwifery and weaving) and
  // Kʼinich (the solar-deity epithet K'inich Ajaw) are real Maya
  // deities; using them as fictional seeds reproduces sacred-cultural
  // content directly.
  'Maya-inspired: glottal stops and aspirated consonants, day-name structures',
  // Aztec/Nahuatl: example tail removed under the protected-register
  // seed audit. Tezcatlipoca (Smoking Mirror, a major Aztec god) is a
  // real deity; the descriptor still mentions "deity-and-place naming"
  // to teach the register without seeding a specific deity name.
  'Aztec/Nahuatl-inspired: tl-clusters and compound words, deity-and-place naming',
  // Andean: example tail removed under the protected-register seed
  // audit. Inti (Inca sun god, root of "Inti-Wasi" = "House of Sun")
  // and Killa (Inca moon goddess, Mama Killa) are real Inca deities.
  'Andean-inspired: structured Quechua flavor',
  // Lakota: example tail removed under the protected-register seed
  // audit. Wakinyan-Tanka (the Great Thunder Beings) and Tatanka-
  // Iyotaka (Sitting Bull) are sacred figures and a real historical
  // leader respectively; using them as fictional seeds pulls the LLM
  // toward reproducing sacred-cultural content directly.
  'Lakota-inspired: descriptive compound names, sacred-natural register',
  // Navajo/Diné: removed entirely. The skinwalker tradition is sacred
  // and not appropriate for fictional appropriation; clan names and
  // sacred-geographic terms (Hashk'aan-Hadzohí, Kinłichíi'nii,
  // Tó-Aheedlíinii) carry too high a collision-risk for a curated
  // pool to safely contain. Diné-coded user input falls through to
  // the LLM's world-knowledge override path with strict universal-
  // invent rules. Detection-map entries removed in parallel.
  // Fictional / fantasy linguistic traditions
  'Sindarin-inspired (elvish): elegant, vowel-rich (e.g., Galadhriel, Thindol, Nimrathel)',
  'Draconic: harsh sibilants, ancient weight (e.g., Szarthrax, Vyrmokk, Kaelsithur)',
  'Goblin-inspired: sharp, crude, percussive (e.g., Skragbit, Mukgash, Krik-tak)',
  'Orcish: brutal, guttural (e.g., Grokthash, Uzgark, Dra\'mok)',
  'Gnomish: clever, playful, mechanical (e.g., Fizzwocket, Cogsworth, Tinberlin)',
  'Aberrant: unpronounceable clusters, wrong-sounding (e.g., Xith\'vaar, Qolenth, Uurm)',
  'Abyssal: guttural, chaotic (e.g., Ghar\'zuul, Rotmaw, Vilesung)',
  'Infernal: sharp, aggressive (e.g., Vex\'tharion, Morkaal, Sazrith)',
  'Primordial: pre-language sounds, elemental (e.g., Aath\'kol, Rumblith, Dross)',
  'Technomagical: clinical with flair (e.g., Arcanaforge Mark IV, Voltspire, Aethercog)',
];

/**
 * Consumer-facing register list. With `enableProtectedRegisters` off,
 * this is `allLanguageRegisters` minus every entry whose prefix is in
 * `PROTECTED_REGISTER_PREFIXES`. With the flag on, it equals
 * `allLanguageRegisters`. Existing callers (ItemGenerator.vue,
 * selectRegister callers, the test-register-override dropdown)
 * import this name and silently see only the active set.
 */
export const registerList = enableProtectedRegisters
  ? allLanguageRegisters
  : allLanguageRegisters.filter(
      entry => !PROTECTED_REGISTER_PREFIXES.some(prefix => entry.startsWith(prefix)),
    );
