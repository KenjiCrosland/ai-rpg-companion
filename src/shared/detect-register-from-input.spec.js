import {
  detectRegisterFromInput,
  userInputLanguageDetection,
} from './detect-register-from-input.mjs';

// Realistic register pool, mirroring what generateMagicItem builds. Tests
// look up by prefix, so the actual descriptive content of each entry
// doesn't matter — just that the prefix is present.
const sampleRegisters = [
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
];

describe('detectRegisterFromInput', () => {
  describe('basic detection', () => {
    it('detects Japanese-specific terms', () => {
      // ofuda → Japanese-inspired register
      const result = detectRegisterFromInput('Shiawase Ofuda', sampleRegisters);
      expect(result).toMatch(/^Japanese-inspired/);
    });

    it('detects Aztec/Nahuatl-specific terms (formerly under Mesoamerican)', () => {
      // Macuahuitl is a Nahuatl word; under the cultural-specificity
      // refactor it now resolves to Aztec/Nahuatl rather than the
      // generic Mesoamerican catch-all.
      const result = detectRegisterFromInput('Macuahuitl of the Sun', sampleRegisters);
      expect(result).toMatch(/^Aztec\/Nahuatl-inspired/);
    });

    it('detects Maya-specific terms', () => {
      // kukulkan is a Maya deity name; under the split this routes to
      // Maya-inspired distinct from Aztec/Nahuatl.
      const result = detectRegisterFromInput('Temple of Kukulkan', sampleRegisters);
      expect(result).toMatch(/^Maya-inspired/);
    });

    it('detects Norse-specific terms', () => {
      const result = detectRegisterFromInput("Mjolnir's Echo", sampleRegisters);
      expect(result).toMatch(/^Norse-inspired/);
    });

    it('detects Tibetan-specific terms', () => {
      const result = detectRegisterFromInput('Phurba of Stillness', sampleRegisters);
      expect(result).toMatch(/^Tibetan-inspired/);
    });

    it('detects Andean-specific terms', () => {
      const result = detectRegisterFromInput('Quipu of the Forgotten Census', sampleRegisters);
      expect(result).toMatch(/^Andean-inspired/);
    });

    it('returns null when no detection term matches', () => {
      expect(detectRegisterFromInput('Verdant Bow', sampleRegisters)).toBe(null);
      expect(detectRegisterFromInput('A simple iron ring', sampleRegisters)).toBe(null);
    });
  });

  describe('input edge cases', () => {
    it('returns null on empty input', () => {
      expect(detectRegisterFromInput('', sampleRegisters)).toBe(null);
      expect(detectRegisterFromInput(null, sampleRegisters)).toBe(null);
      expect(detectRegisterFromInput(undefined, sampleRegisters)).toBe(null);
    });

    it('returns null when register pool is empty', () => {
      expect(detectRegisterFromInput('Shiawase Ofuda', [])).toBe(null);
      expect(detectRegisterFromInput('Shiawase Ofuda', null)).toBe(null);
    });

    it('matches case-insensitively', () => {
      expect(detectRegisterFromInput('SHIAWASE OFUDA', sampleRegisters)).toMatch(/^Japanese-inspired/);
      expect(detectRegisterFromInput('Mjolnir', sampleRegisters)).toMatch(/^Norse-inspired/);
    });
  });

  describe('word-boundary protection', () => {
    it('does not match a term inside a longer word', () => {
      // "kage" is a Japanese detection term; \bkage\b shouldn't match
      // inside "kagemusha" or other longer words. Empty boundary check.
      expect(detectRegisterFromInput('akagezakeoff', sampleRegisters)).toBe(null);
    });

    it('matches at start, end, and around punctuation', () => {
      expect(detectRegisterFromInput('Ofuda', sampleRegisters)).toMatch(/^Japanese-inspired/);
      expect(detectRegisterFromInput('"Ofuda"', sampleRegisters)).toMatch(/^Japanese-inspired/);
      expect(detectRegisterFromInput('the Ofuda.', sampleRegisters)).toMatch(/^Japanese-inspired/);
    });
  });

  describe('cross-register tie resolution (atlatl, asante)', () => {
    it('resolves "atlatl" to Aztec/Nahuatl (specific tradition under refactor)', () => {
      // atlatl is a Nahuatl word for spear-thrower. The earlier map
      // had it ambiguously under "Mesoamerican-inspired" and a comment
      // noted the technology was shared with Indigenous North American
      // traditions. The cultural-specificity refactor splits both
      // generics into specific traditions; atlatl now lives under
      // Aztec/Nahuatl alone (the originating language) and the
      // pan-Indigenous fallback path is retired in favor of LLM world
      // knowledge via the LANGUAGE REGISTER OVERRIDE prompt block.
      expect(detectRegisterFromInput('Atlatl of the Hunt', sampleRegisters))
        .toMatch(/^Aztec\/Nahuatl-inspired/);
    });

    it('resolves "asante" to Swahili (alphabetical-on-prefix tiebreak)', () => {
      // "asante" appears in BOTH Swahili-inspired and West-African-inspired
      // detection lists in the original brief. The detection function
      // iterates the map in declaration order; whichever register appears
      // FIRST in the map's entries wins on length ties. In the current
      // map, Swahili-inspired is declared after Yoruba-inspired but
      // BEFORE West-African-inspired, so Swahili wins. This test
      // documents the tiebreak.
      expect(detectRegisterFromInput('Asante of the Throne', sampleRegisters))
        .toMatch(/^Swahili-inspired/);
    });
  });

  describe('multi-word terms', () => {
    it('detects multi-word terms over single-word terms via length-descending sort', () => {
      // "morin khuur" is multi-word (Mongolian); should match before
      // any shorter overlapping single-word term would.
      expect(detectRegisterFromInput('Morin Khuur of Memory', sampleRegisters))
        .toMatch(/^Mongolian-inspired/);
    });

    it('"medicine bundle" is intentionally NOT mapped (pan-Indigenous popular term)', () => {
      // The cultural-specificity refactor split the generic
      // Indigenous-North-American-inspired register into specific
      // traditions (Lakota only — Navajo/Diné was removed entirely
      // under the same appropriation-caution that motivated the split).
      // Pan-Indigenous popular-fiction terms like medicine bundle,
      // tomahawk, wampum, dreamcatcher, and kachina (Hopi-sacred)
      // don't cleanly belong to Lakota, so they're deliberately
      // unmapped. The LLM can interpret them from world knowledge via
      // the LANGUAGE REGISTER OVERRIDE prompt block.
      expect(detectRegisterFromInput('A medicine bundle from the elders', sampleRegisters))
        .toBe(null);
    });
  });

  describe('cultural-specificity splits (post-refactor)', () => {
    // Earlier the detection map used generic regional registers
    // ("Polynesian", "Mesoamerican", "West African", "Indigenous-North-
    // American", "Eastern European"). Those flatten distinct cultures.
    // The splits below verify that the new specific traditions detect
    // distinctly — Maori-coded inputs go to Maori, Hawaiian-coded inputs
    // go to Hawaiian, etc. — rather than collapsing back into a single
    // catch-all.

    it('Maori terms route to Maori (not Hawaiian)', () => {
      // mere/taiaha/whakapapa are Maori-specific; the detection should
      // not fall back to Hawaiian or any generic Polynesian register.
      expect(detectRegisterFromInput('Mere of Whakapapa', sampleRegisters))
        .toMatch(/^Maori-inspired/);
    });

    it('Hawaiian terms route to Hawaiian (not Maori)', () => {
      expect(detectRegisterFromInput('Lehua of Pele\'s Choosing', sampleRegisters))
        .toMatch(/^Hawaiian-inspired/);
    });

    it('Akan terms route to Akan (not generic West African)', () => {
      expect(detectRegisterFromInput('Kwame and the Sankofa', sampleRegisters))
        .toMatch(/^Akan-inspired/);
    });

    it('Igbo terms route to Igbo distinctly', () => {
      expect(detectRegisterFromInput('The Ikenga of the household', sampleRegisters))
        .toMatch(/^Igbo-inspired/);
    });

    it('Russian-coded terms route to Russian (not generic Slavic)', () => {
      // shashka, baba yaga, koschei moved out of Slavic-inspired into
      // Russian-inspired in the refactor. domovoi is the only term that
      // remains in Slavic-inspired (genuinely pan-Slavic).
      expect(detectRegisterFromInput('The shashka of the steppes', sampleRegisters))
        .toMatch(/^Russian-inspired/);
      expect(detectRegisterFromInput('Baba Yaga\'s mortar', sampleRegisters))
        .toMatch(/^Russian-inspired/);
    });

    it('domovoi still routes to Slavic-inspired (pan-Slavic concept)', () => {
      expect(detectRegisterFromInput('A small offering for the domovoi', sampleRegisters))
        .toMatch(/^Slavic-inspired/);
    });

    it('Romanian terms route to Romanian distinctly', () => {
      expect(detectRegisterFromInput('The voievod of Wallachia', sampleRegisters))
        .toMatch(/^Romanian-inspired/);
    });

    it('Hungarian terms route to Hungarian distinctly', () => {
      expect(detectRegisterFromInput('Across the Magyar puszta', sampleRegisters))
        .toMatch(/^Hungarian-inspired/);
    });

    it('Lakota terms route to Lakota', () => {
      expect(detectRegisterFromInput('Wakinyan thunder over Paha-Sapa', sampleRegisters))
        .toMatch(/^Lakota-inspired/);
    });

    it('Navajo/Diné terms (hooghan, diné) route to NOTHING (register removed)', () => {
      // The Navajo/Diné register was removed entirely under appropriation
      // caution (skinwalker tradition is sacred; clan-name and sacred-
      // geographic terms carry too high a collision-risk). Diné-coded
      // user input falls through to the LLM's world-knowledge override
      // path with strict universal-invent rules — the keyword detection
      // map should NOT route these terms anywhere, regardless of any
      // sample register entry that might still claim Navajo coverage.
      expect(detectRegisterFromInput('A hooghan of the Diné', sampleRegisters))
        .toBe(null);
    });

    it('removed generic register keys are no longer in the detection map', () => {
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

  describe('register absent from caller pool', () => {
    it('returns null when the matched register is not in the pool', () => {
      // If a detection term matches but the corresponding register isn't
      // in the registerList pool the caller passed, return null
      // rather than fabricating a register string. Defensive behavior.
      const reducedPool = ['Latin-inspired: formal (e.g., Aurelium)']; // no Japanese
      expect(detectRegisterFromInput('Shiawase Ofuda', reducedPool)).toBe(null);
    });
  });

  describe('detection map shape (regression guards)', () => {
    it('every detection term is non-empty', () => {
      for (const [register, terms] of Object.entries(userInputLanguageDetection)) {
        for (const term of terms) {
          expect(term).toBeTruthy();
          expect(typeof term).toBe('string');
        }
      }
    });

    it('every register prefix is unique in the map', () => {
      const prefixes = Object.keys(userInputLanguageDetection);
      const uniquePrefixes = new Set(prefixes);
      expect(prefixes.length).toBe(uniquePrefixes.size);
    });
  });
});
