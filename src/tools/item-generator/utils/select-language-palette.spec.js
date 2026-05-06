import {
  selectLanguagePalette,
  fantasyRaceOriginConventionalPalettes,
  fantasyRaceKeywords,
} from './select-language-palette.mjs';

// Realistic palette pool. The function looks up by prefix, so any
// entry in the pool whose prefix matches a fantasy-race conventional
// prefix is reachable via the conventional path.
const palettes = [
  'Latin-inspired: formal (e.g., Aurelium)',
  'Sindarin-inspired (elvish): elegant (e.g., Galadhriel)',
  'Germanic-inspired: guttural (e.g., Grundrak)',
  'Orcish: brutal, guttural (e.g., Grokthash)',
  'Goblin-inspired: sharp (e.g., Skragbit)',
  'Gnomish: clever, playful (e.g., Fizzwocket)',
  'Norse-inspired: harsh consonants (e.g., Stormbreak)',
  'Japanese-inspired: clean syllables (e.g., Kagezuki)',
  'Chinese-inspired: tonal (e.g., Jianhao)',
  'Yoruba-inspired: rhythmic (e.g., Olorun)',
  'Andean-inspired: structured Quechua (e.g., Inti-Wasi)',
  'Slavic-inspired: archaic clusters (e.g., Voronsk)',
];

// Stub detection function with controllable return value.
const stubDetect = (returnValue) => () => returnValue;
const detectNothing = stubDetect(null);

describe('selectLanguagePalette', () => {
  let randomSpy;
  beforeEach(() => {
    randomSpy = jest.spyOn(Math, 'random');
  });
  afterEach(() => {
    randomSpy.mockRestore();
  });

  describe('priority 1 — cultural detection wins over everything', () => {
    it('returns the detected palette when detection fires', () => {
      const detect = stubDetect('Japanese-inspired: clean syllables (e.g., Kagezuki)');
      const result = selectLanguagePalette('Elven', "Akiko's Charm", palettes, detect);
      // Japanese, NOT Sindarin (elven conventional). Cultural detection
      // is priority 1; it wins even when fantasy-race signals are present.
      expect(result).toMatch(/^Japanese-inspired/);
    });

    it('cultural detection wins regardless of fantasy-race weighting random roll', () => {
      // Even with the 70% conventional roll loaded, cultural detection
      // never reaches the weighting branch. randomSpy shouldn't even be
      // consulted in this path.
      randomSpy.mockReturnValue(0.0);
      const detect = stubDetect('Norse-inspired: harsh consonants (e.g., Stormbreak)');
      const result = selectLanguagePalette('Elven', "Mjolnir's Echo", palettes, detect);
      expect(result).toMatch(/^Norse-inspired/);
    });
  });

  describe('priority 2 — fantasy-race weighting (dropdown signal)', () => {
    it('returns conventional palette when random < 0.7 (Elven → Sindarin)', () => {
      randomSpy.mockReturnValue(0.5); // 0.5 < 0.7 → conventional path
      const result = selectLanguagePalette('Elven', '', palettes, detectNothing);
      expect(result).toMatch(/^Sindarin-inspired/);
    });

    it('returns non-conventional palette when random >= 0.7', () => {
      randomSpy.mockReturnValue(0.85); // 0.85 >= 0.7 → "other" path
      const result = selectLanguagePalette('Elven', '', palettes, detectNothing);
      // Should NOT be Sindarin (the conventional one is excluded from the
      // "other" pool to guarantee an unconventional pick on the 30% roll).
      expect(result).not.toMatch(/^Sindarin-inspired/);
    });

    it('70/30 boundary: random === 0.7 picks "other" (strict less-than)', () => {
      randomSpy.mockReturnValue(0.7); // 0.7 < 0.7 is false → "other" path
      const result = selectLanguagePalette('Elven', '', palettes, detectNothing);
      expect(result).not.toMatch(/^Sindarin-inspired/);
    });

    it.each([
      ['Dwarven',   /^Germanic-inspired/],
      ['Orcish',    /^Orcish[: ]/],   // Orcish prefix is also a real entry
      ['Goblinoid', /^Goblin-inspired/],
      ['Gnomish',   /^Gnomish[: ]/],
      ['Giant',     /^Norse-inspired/],
    ])('maps %s dropdown to its conventional palette on the 70%% roll', (race, palettePattern) => {
      randomSpy.mockReturnValue(0.5);
      const result = selectLanguagePalette(race, '', palettes, detectNothing);
      expect(result).toMatch(palettePattern);
    });
  });

  describe('priority 2 — fantasy-race weighting (input keyword signal)', () => {
    it('detects "elven" in user input even with no dropdown', () => {
      randomSpy.mockReturnValue(0.5);
      const result = selectLanguagePalette(null, 'an elven longbow', palettes, detectNothing);
      expect(result).toMatch(/^Sindarin-inspired/);
    });

    it('detects various Elven keywords (elf, elves, elvish)', () => {
      randomSpy.mockReturnValue(0.5);
      expect(selectLanguagePalette(null, 'a single elf', palettes, detectNothing))
        .toMatch(/^Sindarin-inspired/);
      expect(selectLanguagePalette(null, 'forged by elves', palettes, detectNothing))
        .toMatch(/^Sindarin-inspired/);
      expect(selectLanguagePalette(null, 'elvish craftsmanship', palettes, detectNothing))
        .toMatch(/^Sindarin-inspired/);
    });

    it('detects "dwarven" via keyword path → Germanic conventional', () => {
      randomSpy.mockReturnValue(0.5);
      const result = selectLanguagePalette(null, 'an ancient dwarven warhammer', palettes, detectNothing);
      expect(result).toMatch(/^Germanic-inspired/);
    });

    it('first race keyword found wins on conflicting signals', () => {
      // "elven blade carried by an orcish chieftain" mentions both elven
      // and orcish. The map iterates in declaration order — Elven is
      // declared before Orcish, so Elven wins. Documents the resolution.
      randomSpy.mockReturnValue(0.5);
      const result = selectLanguagePalette(
        null,
        'elven blade carried by an orcish chieftain',
        palettes,
        detectNothing,
      );
      expect(result).toMatch(/^Sindarin-inspired/);
    });

    it('does not match keyword inside a longer word (word boundary)', () => {
      // "elf" should NOT match inside "self" or "shelf". \belf\b protects.
      // Keyword detection uses regex (no Math.random), so the first
      // Math.random call is the uniform-random fallback index pick.
      randomSpy.mockReturnValue(0.0); // → palettes[0] = Latin
      const result = selectLanguagePalette(null, 'on the shelf, the self', palettes, detectNothing);
      // No race detected → priority 3 uniform random fallback → palettes[0].
      expect(result).toMatch(/^Latin-inspired/);
    });
  });

  describe('priority 3 — uniform random fallback', () => {
    it('falls through to uniform random when no signal is present', () => {
      // No detection, no fantasy race. Function reaches the final branch.
      randomSpy.mockReturnValue(0.0); // index 0 → first palette
      const result = selectLanguagePalette(null, '', palettes, detectNothing);
      expect(result).toBe(palettes[0]);
    });

    it('uniform random respects the full pool', () => {
      // Math.random=0.99 floors to last index of the pool.
      randomSpy.mockReturnValue(0.99);
      const result = selectLanguagePalette(null, '', palettes, detectNothing);
      expect(result).toBe(palettes[Math.floor(0.99 * palettes.length)]);
    });
  });

  describe('aesthetic origins do not trigger fantasy-race weighting', () => {
    // Aesthetic origins (Celestial, Fey, Necromantic, etc.) are intentionally
    // absent from fantasyRaceOriginConventionalPalettes. They should NOT
    // bias palette selection — the architectural choice is that aesthetic
    // origins pair freely with any linguistic register.
    it.each(['Celestial', 'Fey', 'Necromantic', 'Abyssal', 'Verdant', 'Wizardry'])(
      '%s does not trigger fantasy-race weighting',
      (origin) => {
        randomSpy.mockReturnValue(0.0);
        const result = selectLanguagePalette(origin, '', palettes, detectNothing);
        // Should fall through to uniform random (priority 3) → palettes[0]
        expect(result).toBe(palettes[0]);
      }
    );
  });

  describe('exported maps (regression guards)', () => {
    it('fantasyRaceOriginConventionalPalettes covers exactly the six core races', () => {
      const expected = ['Elven', 'Dwarven', 'Orcish', 'Goblinoid', 'Gnomish', 'Giant'];
      expect(Object.keys(fantasyRaceOriginConventionalPalettes).sort()).toEqual(expected.sort());
    });

    it('fantasyRaceKeywords covers exactly the six core races', () => {
      const expected = ['Elven', 'Dwarven', 'Orcish', 'Goblinoid', 'Gnomish', 'Giant'];
      expect(Object.keys(fantasyRaceKeywords).sort()).toEqual(expected.sort());
    });

    it('every fantasy race has a non-empty keyword list', () => {
      for (const [race, keywords] of Object.entries(fantasyRaceKeywords)) {
        expect(keywords.length).toBeGreaterThan(0);
        keywords.forEach(k => expect(typeof k).toBe('string'));
      }
    });
  });
});
