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
  'Norse-inspired: harsh consonants (e.g., Stormbreak, Ashveil)',
  'Germanic-inspired: guttural (e.g., Grundrak, Hammerfel)',
  'Celtic-inspired: soft consonants (e.g., Branwen, Caelith)',
  'Eastern European-inspired: aristocratic (e.g., Draculesti, Volkhara)',
  'Arabic/Persian-inspired: flowing (e.g., Qamar al-Sahir, Zafira)',
  'Hebrew-inspired: ancient (e.g., Mikael, Shoshana)',
  'Japanese-inspired: clean syllables (e.g., Kagezuki, Shiawase)',
  'Chinese-inspired: tonal (e.g., Jianhao, Mei-Lin)',
  'Korean-inspired: structured (e.g., Soohyun, Jaewon)',
  'Mongolian-inspired: bold, sweeping (e.g., Temujin, Khulan)',
  'Tibetan-inspired: aspirated (e.g., Tashi, Dorje)',
  'Hindi/Sanskrit-inspired: melodic (e.g., Devraj, Kaliyana)',
  'Thai-inspired: tonal, flowing (e.g., Niran, Suchada)',
  'Polynesian-inspired: oceanic (e.g., Moanakai, Tahurei)',
  'Yoruba-inspired: rhythmic (e.g., Olorun, Adégoke)',
  'Swahili-inspired: rolling rhythm (e.g., Asante, Zuberi)',
  'West African-inspired: rhythmic (e.g., Kofi, Ife-kari)',
  'Mesoamerican-inspired: bold sounds (e.g., Tezcamil, Ixchara)',
  'Andean-inspired: structured Quechua (e.g., Inti-Wasi, Killa)',
  'Indigenous-North-American-inspired: descriptive compounds (e.g., Atohi, Wakinyan)',
];

describe('detectLanguageFromUserInput', () => {
  describe('basic detection', () => {
    it('detects Japanese-specific terms', () => {
      // ofuda → Japanese-inspired palette
      const result = detectLanguageFromUserInput('Shiawase Ofuda', samplePalettes);
      expect(result).toMatch(/^Japanese-inspired/);
    });

    it('detects Mesoamerican-specific terms', () => {
      const result = detectLanguageFromUserInput('Macuahuitl of the Sun', samplePalettes);
      expect(result).toMatch(/^Mesoamerican-inspired/);
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
    it('resolves "atlatl" to Mesoamerican (intentional ordering)', () => {
      // atlatl is in BOTH Mesoamerican-inspired and previously had been
      // documented as also-a-Northern-American thing. The detection map
      // lists it under Mesoamerican only, with a comment explaining the
      // popular-association decision. Documents the resolution so a
      // future contributor doesn't quietly flip it.
      expect(detectLanguageFromUserInput('Atlatl of the Hunt', samplePalettes))
        .toMatch(/^Mesoamerican-inspired/);
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

    it('detects "medicine bundle" as a multi-word indigenous term', () => {
      expect(detectLanguageFromUserInput('A medicine bundle from the elders', samplePalettes))
        .toMatch(/^Indigenous-North-American-inspired/);
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
