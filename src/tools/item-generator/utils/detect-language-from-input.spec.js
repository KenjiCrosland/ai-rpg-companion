import {
  detectLanguageFromUserInput,
  userInputLanguageDetection,
} from './detect-language-from-input.mjs';

// Realistic palette pool, mirroring what generateMagicItem builds. Tests
// look up by prefix, so the actual descriptive content of each entry
// doesn't matter — just that the prefix is present.
const samplePalettes = [
  'Latin-inspired: formal, structured (e.g., Aurelium, Ferrata)',
  'Greek-inspired: mythological weight (e.g., Thyrsion, Aeoliphos)',
  'Slavic-inspired: archaic clusters (e.g., Voronsk, Mirjan)',
  'Russian-inspired: patronymic structures (e.g., Anastasia Sergeyevna)',
  'Romanian-inspired: Latin-rooted with Slavic influence (e.g., Mihai)',
  'Hungarian-inspired: vowel harmony (e.g., Csaba, Kinga)',
  'Norse-inspired: harsh consonants (e.g., Stormbreak, Ashveil)',
  'Germanic-inspired: guttural (e.g., Grundrak, Hammerfel)',
  'Celtic-inspired: soft consonants (e.g., Branwen, Caelith)',
  'Arabic/Persian-inspired: flowing (e.g., Qamar al-Sahir, Zafira)',
  'Hebrew-inspired: ancient (e.g., Mikael, Shoshana)',
  'Japanese-inspired: clean syllables (e.g., Kagezuki, Shiawase)',
  'Chinese-inspired: tonal (e.g., Jianhao, Mei-Lin)',
  'Korean-inspired: structured (e.g., Soohyun, Jaewon)',
  'Mongolian-inspired: bold, sweeping (e.g., Temujin, Khulan)',
  'Tibetan-inspired: aspirated (e.g., Tashi, Dorje)',
  'Hindi/Sanskrit-inspired: melodic (e.g., Devraj, Kaliyana)',
  'Thai-inspired: tonal, flowing (e.g., Niran, Suchada)',
  'Maori-inspired: vowel-rich Te Reo (e.g., Aroha, Tane-mahuta)',
  'Hawaiian-inspired: \'Ōlelo Hawai\'i phonetics (e.g., Lehuanani)',
  'Yoruba-inspired: rhythmic (e.g., Olorun, Adégoke)',
  'Akan-inspired: day-name traditions (e.g., Kwame, Adwoa)',
  'Igbo-inspired: tonal Nigerian (e.g., Chioma, Obinna)',
  'Swahili-inspired (East African): rolling rhythm (e.g., Asante, Zuberi)',
  'Maya-inspired: glottal stops, day-names (e.g., Balam-Ek, Ix-Chel)',
  'Aztec/Nahuatl-inspired: tl-clusters, deity-and-place naming (e.g., Tezcatlipoca)',
  'Andean-inspired: structured Quechua (e.g., Inti-Wasi, Killa)',
  'Lakota-inspired: descriptive compounds (e.g., Wakinyan-Tanka)',
  'Navajo/Diné-inspired: clan-rooted naming (e.g., Tó-Aheedlíinii)',
];

describe('detectLanguageFromUserInput', () => {
  describe('basic detection', () => {
    it('detects Japanese-specific terms', () => {
      // ofuda → Japanese-inspired palette
      const result = detectLanguageFromUserInput('Shiawase Ofuda', samplePalettes);
      expect(result).toMatch(/^Japanese-inspired/);
    });

    it('detects Aztec/Nahuatl-specific terms (formerly under Mesoamerican)', () => {
      // Macuahuitl is a Nahuatl word; under the cultural-specificity
      // refactor it now resolves to Aztec/Nahuatl rather than the
      // generic Mesoamerican catch-all.
      const result = detectLanguageFromUserInput('Macuahuitl of the Sun', samplePalettes);
      expect(result).toMatch(/^Aztec\/Nahuatl-inspired/);
    });

    it('detects Maya-specific terms', () => {
      // kukulkan is a Maya deity name; under the split this routes to
      // Maya-inspired distinct from Aztec/Nahuatl.
      const result = detectLanguageFromUserInput('Temple of Kukulkan', samplePalettes);
      expect(result).toMatch(/^Maya-inspired/);
    });

    it('detects Norse-specific terms', () => {
      const result = detectLanguageFromUserInput("Mjolnir's Echo", samplePalettes);
      expect(result).toMatch(/^Norse-inspired/);
    });

    it('detects Tibetan-specific terms', () => {
      const result = detectLanguageFromUserInput('Phurba of Stillness', samplePalettes);
      expect(result).toMatch(/^Tibetan-inspired/);
    });

    it('detects Andean-specific terms', () => {
      const result = detectLanguageFromUserInput('Quipu of the Forgotten Census', samplePalettes);
      expect(result).toMatch(/^Andean-inspired/);
    });

    it('returns null when no detection term matches', () => {
      expect(detectLanguageFromUserInput('Verdant Bow', samplePalettes)).toBe(null);
      expect(detectLanguageFromUserInput('A simple iron ring', samplePalettes)).toBe(null);
    });
  });

  describe('input edge cases', () => {
    it('returns null on empty input', () => {
      expect(detectLanguageFromUserInput('', samplePalettes)).toBe(null);
      expect(detectLanguageFromUserInput(null, samplePalettes)).toBe(null);
      expect(detectLanguageFromUserInput(undefined, samplePalettes)).toBe(null);
    });

    it('returns null when palette pool is empty', () => {
      expect(detectLanguageFromUserInput('Shiawase Ofuda', [])).toBe(null);
      expect(detectLanguageFromUserInput('Shiawase Ofuda', null)).toBe(null);
    });

    it('matches case-insensitively', () => {
      expect(detectLanguageFromUserInput('SHIAWASE OFUDA', samplePalettes)).toMatch(/^Japanese-inspired/);
      expect(detectLanguageFromUserInput('Mjolnir', samplePalettes)).toMatch(/^Norse-inspired/);
    });
  });

  describe('word-boundary protection', () => {
    it('does not match a term inside a longer word', () => {
      // "kage" is a Japanese detection term; \bkage\b shouldn't match
      // inside "kagemusha" or other longer words. Empty boundary check.
      expect(detectLanguageFromUserInput('akagezakeoff', samplePalettes)).toBe(null);
    });

    it('matches at start, end, and around punctuation', () => {
      expect(detectLanguageFromUserInput('Ofuda', samplePalettes)).toMatch(/^Japanese-inspired/);
      expect(detectLanguageFromUserInput('"Ofuda"', samplePalettes)).toMatch(/^Japanese-inspired/);
      expect(detectLanguageFromUserInput('the Ofuda.', samplePalettes)).toMatch(/^Japanese-inspired/);
    });
  });

  describe('cross-palette tie resolution (atlatl, asante)', () => {
    it('resolves "atlatl" to Aztec/Nahuatl (specific tradition under refactor)', () => {
      // atlatl is a Nahuatl word for spear-thrower. The earlier map
      // had it ambiguously under "Mesoamerican-inspired" and a comment
      // noted the technology was shared with Indigenous North American
      // traditions. The cultural-specificity refactor splits both
      // generics into specific traditions; atlatl now lives under
      // Aztec/Nahuatl alone (the originating language) and the
      // pan-Indigenous fallback path is retired in favor of LLM world
      // knowledge via the LANGUAGE PALETTE OVERRIDE prompt block.
      expect(detectLanguageFromUserInput('Atlatl of the Hunt', samplePalettes))
        .toMatch(/^Aztec\/Nahuatl-inspired/);
    });

    it('resolves "asante" to Swahili (alphabetical-on-prefix tiebreak)', () => {
      // "asante" appears in BOTH Swahili-inspired and West-African-inspired
      // detection lists in the original brief. The detection function
      // iterates the map in declaration order; whichever palette appears
      // FIRST in the map's entries wins on length ties. In the current
      // map, Swahili-inspired is declared after Yoruba-inspired but
      // BEFORE West-African-inspired, so Swahili wins. This test
      // documents the tiebreak.
      expect(detectLanguageFromUserInput('Asante of the Throne', samplePalettes))
        .toMatch(/^Swahili-inspired/);
    });
  });

  describe('multi-word terms', () => {
    it('detects multi-word terms over single-word terms via length-descending sort', () => {
      // "morin khuur" is multi-word (Mongolian); should match before
      // any shorter overlapping single-word term would.
      expect(detectLanguageFromUserInput('Morin Khuur of Memory', samplePalettes))
        .toMatch(/^Mongolian-inspired/);
    });

    it('"medicine bundle" is intentionally NOT mapped (pan-Indigenous popular term)', () => {
      // The cultural-specificity refactor split the generic
      // Indigenous-North-American-inspired palette into specific
      // traditions (Lakota, Navajo/Diné). Pan-Indigenous popular-fiction
      // terms like medicine bundle, tomahawk, wampum, dreamcatcher,
      // and kachina (Hopi-sacred) don't cleanly belong to either
      // specific tradition, so they're deliberately unmapped. The LLM
      // can interpret them from world knowledge via the LANGUAGE
      // PALETTE OVERRIDE prompt block.
      expect(detectLanguageFromUserInput('A medicine bundle from the elders', samplePalettes))
        .toBe(null);
    });
  });

  describe('cultural-specificity splits (post-refactor)', () => {
    // Earlier the detection map used generic regional palettes
    // ("Polynesian", "Mesoamerican", "West African", "Indigenous-North-
    // American", "Eastern European"). Those flatten distinct cultures.
    // The splits below verify that the new specific traditions detect
    // distinctly — Maori-coded inputs go to Maori, Hawaiian-coded inputs
    // go to Hawaiian, etc. — rather than collapsing back into a single
    // catch-all.

    it('Maori terms route to Maori (not Hawaiian)', () => {
      // mere/taiaha/whakapapa are Maori-specific; the detection should
      // not fall back to Hawaiian or any generic Polynesian register.
      expect(detectLanguageFromUserInput('Mere of Whakapapa', samplePalettes))
        .toMatch(/^Maori-inspired/);
    });

    it('Hawaiian terms route to Hawaiian (not Maori)', () => {
      expect(detectLanguageFromUserInput('Lehua of Pele\'s Choosing', samplePalettes))
        .toMatch(/^Hawaiian-inspired/);
    });

    it('Akan terms route to Akan (not generic West African)', () => {
      expect(detectLanguageFromUserInput('Kwame and the Sankofa', samplePalettes))
        .toMatch(/^Akan-inspired/);
    });

    it('Igbo terms route to Igbo distinctly', () => {
      expect(detectLanguageFromUserInput('The Ikenga of the household', samplePalettes))
        .toMatch(/^Igbo-inspired/);
    });

    it('Russian-coded terms route to Russian (not generic Slavic)', () => {
      // shashka, baba yaga, koschei moved out of Slavic-inspired into
      // Russian-inspired in the refactor. domovoi is the only term that
      // remains in Slavic-inspired (genuinely pan-Slavic).
      expect(detectLanguageFromUserInput('The shashka of the steppes', samplePalettes))
        .toMatch(/^Russian-inspired/);
      expect(detectLanguageFromUserInput('Baba Yaga\'s mortar', samplePalettes))
        .toMatch(/^Russian-inspired/);
    });

    it('domovoi still routes to Slavic-inspired (pan-Slavic concept)', () => {
      expect(detectLanguageFromUserInput('A small offering for the domovoi', samplePalettes))
        .toMatch(/^Slavic-inspired/);
    });

    it('Romanian terms route to Romanian distinctly', () => {
      expect(detectLanguageFromUserInput('The voievod of Wallachia', samplePalettes))
        .toMatch(/^Romanian-inspired/);
    });

    it('Hungarian terms route to Hungarian distinctly', () => {
      expect(detectLanguageFromUserInput('Across the Magyar puszta', samplePalettes))
        .toMatch(/^Hungarian-inspired/);
    });

    it('Lakota terms route to Lakota', () => {
      expect(detectLanguageFromUserInput('Wakinyan thunder over Paha-Sapa', samplePalettes))
        .toMatch(/^Lakota-inspired/);
    });

    it('Navajo/Diné terms route to Navajo/Diné', () => {
      expect(detectLanguageFromUserInput('A hooghan of the Diné', samplePalettes))
        .toMatch(/^Navajo\/Diné-inspired/);
    });

    it('removed generic palette keys are no longer in the detection map', () => {
      // Regression guard: if a future change accidentally re-introduces
      // a generic catch-all, this test fails. The whole point of the
      // refactor is that these keys don't exist anymore.
      const removedKeys = [
        'Polynesian-inspired',
        'Mesoamerican-inspired',
        'West African-inspired',
        'Indigenous-North-American-inspired',
        'Eastern European-inspired',
      ];
      for (const key of removedKeys) {
        expect(userInputLanguageDetection).not.toHaveProperty(key);
      }
    });
  });

  describe('palette absent from caller pool', () => {
    it('returns null when the matched palette is not in the pool', () => {
      // If a detection term matches but the corresponding palette isn't
      // in the languagePalettes pool the caller passed, return null
      // rather than fabricating a palette string. Defensive behavior.
      const reducedPool = ['Latin-inspired: formal (e.g., Aurelium)']; // no Japanese
      expect(detectLanguageFromUserInput('Shiawase Ofuda', reducedPool)).toBe(null);
    });
  });

  describe('detection map shape (regression guards)', () => {
    it('every detection term is non-empty', () => {
      for (const [palette, terms] of Object.entries(userInputLanguageDetection)) {
        for (const term of terms) {
          expect(term).toBeTruthy();
          expect(typeof term).toBe('string');
        }
      }
    });

    it('every palette prefix is unique in the map', () => {
      const prefixes = Object.keys(userInputLanguageDetection);
      const uniquePrefixes = new Set(prefixes);
      expect(prefixes.length).toBe(uniquePrefixes.size);
    });
  });
});
