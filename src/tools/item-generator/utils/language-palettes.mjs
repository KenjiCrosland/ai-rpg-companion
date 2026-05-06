/**
 * Language palettes — purely linguistic. No thematic implications;
 * any palette can pair with any origin. Adding entries here is always
 * allowed; removing requires considering whether any saved item lore
 * references the palette.
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
 * where <prefix> is the unique key the rest of the palette machinery
 * (selectLanguagePalette, fantasyRaceConventionalPalettes,
 * orcGoblinExcludedPalettes, userInputLanguageDetection,
 * rotatePaletteExamples) refers to via String#startsWith.
 *
 * Lives in its own module so test suites can verify integrity
 * (every prefix referenced in fantasyRaceConventionalPalettes
 * resolves to an entry here, no orphan references) without depending
 * on inline data inside ItemGenerator.vue.
 */
export const languagePalettes = [
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
  'Atlas-Berber-inspired: Amazigh register, North African mountain-craft tradition (e.g., Tin-Hinan, Massinissa, Yuba)',
  'Pamir-inspired: high-Central-Asian mountain register, Persian-adjacent (e.g., Roshan, Wakhi, Soghd)',
  'Arabic/Persian-inspired: flowing, melodic (e.g., Qamar al-Sahir, Zafira, Sayyid)',
  'Persian-inspired: refined classical-aesthetic register (e.g., Anahita, Cyrus, Roxana)',
  'Hebrew-inspired: ancient, ceremonial (e.g., Mikael, Shoshana, Adamah)',
  'Japanese-inspired: clean syllables, natural imagery (e.g., Kagezuki, Shiawase, Tsubasa)',
  'Chinese-inspired: tonal, philosophical (e.g., Jianhao, Mei-Lin, Wangshu)',
  'Korean-inspired: structured, balanced (e.g., Soohyun, Jaewon, Hyejin)',
  'Mongolian-inspired: bold, sweeping (e.g., Temujin, Khulan, Bataar)',
  'Tibetan-inspired: aspirated, contemplative (e.g., Tashi, Dorje, Pema)',
  'Hindi/Sanskrit-inspired: melodic, ceremonial (e.g., Devraj, Kaliyana, Aakash)',
  'Thai-inspired: tonal, flowing (e.g., Niran, Suchada, Anong)',
  'Maori-inspired: vowel-rich Te Reo phonetics, nature-grounded (e.g., Aroha, Tane-mahuta, Whakaata)',
  'Hawaiian-inspired: \'Ōlelo Hawai\'i phonetics with okina and macron, place-coded (e.g., Kaiwiokeoli, Lehuanani, Punahele)',
  'Yoruba-inspired: rhythmic with diacriticals (e.g., Olorun, Adégoke, Ifelola)',
  'Akan-inspired: day-name traditions, Ghanaian register (e.g., Kwame, Adwoa, Yaa)',
  'Igbo-inspired: tonal Nigerian register (e.g., Chioma, Obinna, Adaeze)',
  'Swahili-inspired (East African): rolling rhythm (e.g., Asante, Zuberi, Imani)',
  'Maya-inspired: glottal stops and aspirated consonants, day-name structures (e.g., Balam-Ek, Ix-Chel, Kʼinich)',
  'Aztec/Nahuatl-inspired: tl-clusters and compound words, deity-and-place naming (e.g., Tezcatlipoca, Xochiyaoyotl, Quetzalpetl)',
  'Andean-inspired: structured Quechua flavor (e.g., Inti-Wasi, Killa, Sayri)',
  'Lakota-inspired: descriptive compound names, sacred-natural register (e.g., Wakinyan-Tanka, Tatanka-Iyotaka, Wiyaka-Wakan)',
  'Navajo/Diné-inspired: clan-rooted naming, sacred geography (e.g., Hashk\'aan-Hadzohí, Tó-Aheedlíinii, Kinłichíi\'nii)',
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
