import {
  orcGivenNames,
  goblinoidGivenNames,
  rotatePaletteExamples,
} from './orc-goblin-name-pools.mjs';

describe('orcGivenNames', () => {
  it('contains 100 names', () => {
    expect(orcGivenNames).toHaveLength(100);
  });

  it('every name is a non-empty string', () => {
    for (const name of orcGivenNames) {
      expect(typeof name).toBe('string');
      expect(name.length).toBeGreaterThan(0);
    }
  });

  it('contains no duplicates', () => {
    expect(new Set(orcGivenNames).size).toBe(orcGivenNames.length);
  });

  it('represents the five style ranges from the brief', () => {
    // Smoke check that each style range from the docstring has at least
    // one representative — guards against a future contributor pruning
    // a whole style category accidentally.
    // 1. Monosyllabic guttural — 4-6 chars, no apostrophe/hyphen.
    expect(orcGivenNames.some(n => /^[A-Z][a-z]{2,5}$/.test(n))).toBe(true);
    // 2. Apostrophied — contains a single-quote.
    expect(orcGivenNames.some(n => n.includes('\''))).toBe(true);
    // 3. Long compound multisyllabic — 9+ chars, no apostrophe/hyphen.
    expect(orcGivenNames.some(n => n.length >= 9 && !n.includes('\'') && !n.includes('-'))).toBe(true);
    // 4. Hyphenated.
    expect(orcGivenNames.some(n => n.includes('-'))).toBe(true);
    // 5. English title-epithet — multi-word feel, anchor on a few known.
    const epithetAnchors = ['Bloodfang', 'Skullsplitter', 'Ironback'];
    expect(epithetAnchors.every(n => orcGivenNames.includes(n))).toBe(true);
  });
});

describe('goblinoidGivenNames', () => {
  it('contains 100 names', () => {
    expect(goblinoidGivenNames).toHaveLength(100);
  });

  it('every name is a non-empty string', () => {
    for (const name of goblinoidGivenNames) {
      expect(typeof name).toBe('string');
      expect(name.length).toBeGreaterThan(0);
    }
  });

  it('contains no duplicates', () => {
    expect(new Set(goblinoidGivenNames).size).toBe(goblinoidGivenNames.length);
  });

  it('represents the five style ranges from the brief', () => {
    // 1. Sharp percussive monosyllabic — 3-5 chars, no apostrophe/hyphen.
    expect(goblinoidGivenNames.some(n => /^[A-Z][a-z]{2,4}$/.test(n))).toBe(true);
    // 2. Doubled / repeating-syllable hyphenated — contains a hyphen.
    expect(goblinoidGivenNames.some(n => n.includes('-'))).toBe(true);
    // 3. Compound trade-marker — anchors on a few known compound names.
    const compoundAnchors = ['Snikbit', 'Murkrak', 'Skragdun'];
    expect(compoundAnchors.every(n => goblinoidGivenNames.includes(n))).toBe(true);
    // 4. Diminutive ending — a few known.
    const dimAnchors = ['Skragbit', 'Wibblekit', 'Knikkit'];
    expect(dimAnchors.every(n => goblinoidGivenNames.includes(n))).toBe(true);
    // 5. Whimsical mocking compound — a few known.
    const whimsicalAnchors = ['Wibblesnik', 'Snickerblot', 'Glompik'];
    expect(whimsicalAnchors.every(n => goblinoidGivenNames.includes(n))).toBe(true);
  });
});

describe('orc and goblin pools are disjoint', () => {
  // The pools represent different registers — the rotation logic
  // assumes they don't overlap. A name appearing in both would mean
  // the same register was reused for both, which would weaken the
  // tonal distinction between orc and goblin output.
  it('no name appears in both pools', () => {
    const orcSet = new Set(orcGivenNames);
    const overlap = goblinoidGivenNames.filter(n => orcSet.has(n));
    expect(overlap).toEqual([]);
  });
});

describe('rotatePaletteExamples', () => {
  let randomSpy;
  beforeEach(() => {
    randomSpy = jest.spyOn(Math, 'random');
  });
  afterEach(() => {
    randomSpy.mockRestore();
  });

  describe('Orcish palette', () => {
    const orcishPalette = 'Orcish: brutal, guttural (e.g., Grokthash, Uzgark, Dra\'mok)';

    it('rebuilds the example tail with names from orcGivenNames', () => {
      randomSpy.mockReturnValue(0.5);
      const result = rotatePaletteExamples(orcishPalette);
      expect(result).toMatch(/^Orcish: brutal, guttural \(e\.g\., /);
      expect(result).toMatch(/\)$/);
      const tail = result.match(/\(e\.g\., (.+)\)$/)[1];
      const names = tail.split(', ');
      expect(names).toHaveLength(3);
      for (const name of names) {
        expect(orcGivenNames).toContain(name);
      }
    });

    it('the original static names (Grokthash, Uzgark, Dra\'mok) get replaced', () => {
      // The whole point: static examples produce reuse pressure.
      // After rotation, the result should not contain the original
      // tail verbatim (probabilistically guaranteed across 100 names
      // and a 3-name pick).
      randomSpy.mockReturnValue(0.5);
      const result = rotatePaletteExamples(orcishPalette);
      expect(result).not.toContain('Grokthash, Uzgark, Dra\'mok');
    });

    it('exampleCount controls how many names appear', () => {
      randomSpy.mockReturnValue(0.5);
      const result = rotatePaletteExamples(orcishPalette, 5);
      const tail = result.match(/\(e\.g\., (.+)\)$/)[1];
      expect(tail.split(', ')).toHaveLength(5);
    });
  });

  describe('Goblin-inspired palette', () => {
    const goblinPalette = 'Goblin-inspired: sharp, crude, percussive (e.g., Skragbit, Mukgash, Krik-tak)';

    it('rebuilds the example tail with names from goblinoidGivenNames', () => {
      randomSpy.mockReturnValue(0.5);
      const result = rotatePaletteExamples(goblinPalette);
      const tail = result.match(/\(e\.g\., (.+)\)$/)[1];
      const names = tail.split(', ');
      expect(names).toHaveLength(3);
      for (const name of names) {
        expect(goblinoidGivenNames).toContain(name);
      }
    });
  });

  describe('non-orc/goblin palettes', () => {
    // Pass-through behavior is what makes this scoped narrowly to the
    // two single-palette races. Multi-palette races (Elven, Dwarven,
    // Gnomish, Giant) get rotation via cross-palette variety; non-
    // fantasy-race palettes (Latin, Slavic, Japanese, etc.) keep
    // their static examples.
    it.each([
      'Sindarin-inspired (elvish): elegant, vowel-rich (e.g., Galadhriel, Thindol, Nimrathel)',
      'Welsh-inspired: soft consonants (e.g., Branwen)',
      'Old-Norse-inspired: Eddaic register (e.g., Sigrún, Hjorleif, Thrym)',
      'Anglo-Saxon-inspired: Old English compounds (e.g., Wulfstan)',
      'Gnomish: clever, playful (e.g., Fizzwocket, Cogsworth, Tinberlin)',
      'Norse-inspired: harsh consonants (e.g., Stormbreak, Ashveil, Grimthorn)',
      'Latin-inspired: formal (e.g., Aurelium)',
      'Yoruba-inspired: rhythmic (e.g., Olorun)',
      'Aberrant: unpronounceable clusters (e.g., Xith\'vaar)',
      'Draconic: harsh sibilants (e.g., Szarthrax)',
    ])('passes through unchanged: %s', (palette) => {
      randomSpy.mockReturnValue(0.5);
      const result = rotatePaletteExamples(palette);
      expect(result).toBe(palette);
    });

    it.each([null, undefined, '', 0, false])('returns input unchanged for falsy/non-string: %p', (input) => {
      expect(rotatePaletteExamples(input)).toBe(input);
    });
  });

  describe('rotation produces variety across calls', () => {
    it('different Math.random sequences produce different example tails', () => {
      const orcishPalette = 'Orcish: brutal, guttural (e.g., Grokthash, Uzgark, Dra\'mok)';
      randomSpy.mockReturnValue(0.1);
      const tailA = rotatePaletteExamples(orcishPalette).match(/\(e\.g\., (.+)\)$/)[1];
      randomSpy.mockReturnValue(0.9);
      const tailB = rotatePaletteExamples(orcishPalette).match(/\(e\.g\., (.+)\)$/)[1];
      // With a 100-name pool and 3-name picks under different shuffle
      // biases, collision is vanishingly unlikely.
      expect(tailA).not.toBe(tailB);
    });
  });
});
