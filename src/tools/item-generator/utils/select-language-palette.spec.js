import {
  selectLanguagePalette,
  resolveFantasyRace,
  fantasyRaceConventionalPalettes,
  fantasyRaceKeywords,
  orcGoblinExcludedPalettes,
} from './select-language-palette.mjs';

// Realistic palette pool covering at least one prefix from each fantasy
// race's conventional pool, plus a handful of unrelated palettes for
// alt-branch testing. The function looks up palettes by prefix, so any
// entry whose prefix matches a fantasy-race conventional prefix is
// reachable via the conventional path.
//
// With the multi-palette pool architecture, each fantasy race has 1-6
// conventional prefixes. Tests that need a deterministic conventional
// pick mock Math.random() to 0 (which selects pool index 0 — the first
// prefix in each race's pool); the test pool MUST contain at least
// that first-prefix entry for each race used in tests. Specifically:
//   Elven      pool[0] = 'Sindarin-inspired'        ✓
//   Dwarven    pool[0] = 'Old-Norse-inspired'       ✓
//   Orcish     pool[0] = 'Orcish'                   ✓
//   Goblinoid  pool[0] = 'Goblin-inspired'          ✓
//   Gnomish    pool[0] = 'Gnomish'                  ✓
//   Giant      pool[0] = 'Norse-inspired'           ✓
const palettes = [
  'Latin-inspired: formal (e.g., Aurelium)',
  'Sindarin-inspired (elvish): elegant (e.g., Galadhriel)',
  'Welsh-inspired: soft consonants (e.g., Branwen)',
  'Germanic-inspired: guttural (e.g., Grundrak)',
  'Old-Norse-inspired: Eddaic register (e.g., Sigrún)',
  'Anglo-Saxon-inspired: Old English compounds (e.g., Wulfstan)',
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

// Helper: assert that `result` starts with one of the prefixes in the
// race's conventional pool. Used by tests that don't care which
// specific palette in the pool was rolled, just that the conventional
// branch fired and produced a member of the pool.
const isInConventionalPool = (result, race) =>
  fantasyRaceConventionalPalettes[race].some(prefix => result.startsWith(prefix));

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
    it('returns a palette from the race\'s conventional pool when random < 0.7 (Elven)', () => {
      // The 70/30 roll uses Math.random call #1; the within-pool index
      // pick uses Math.random call #2. mockReturnValue(0) hits the
      // conventional branch and selects pool index 0 (Sindarin for Elven).
      randomSpy.mockReturnValue(0);
      const result = selectLanguagePalette('Elven', '', palettes, detectNothing);
      expect(isInConventionalPool(result, 'Elven')).toBe(true);
      // pool[0] is Sindarin-inspired with these mocks — the deterministic
      // assertion documents the index-pick mechanic.
      expect(result).toMatch(/^Sindarin-inspired/);
    });

    it('returns non-conventional palette when random >= 0.7 (alt branch filters entire conventional pool)', () => {
      randomSpy.mockReturnValue(0.85); // 0.85 >= 0.7 → "other" path
      const result = selectLanguagePalette('Elven', '', palettes, detectNothing);
      // Result must NOT match ANY prefix in Elven's conventional pool —
      // the alt branch filters out the entire conventional pool, not
      // just one palette, so cross-cultural pairings are guaranteed.
      expect(isInConventionalPool(result, 'Elven')).toBe(false);
    });

    it('70/30 boundary: random === 0.7 picks "other" (strict less-than)', () => {
      randomSpy.mockReturnValue(0.7); // 0.7 < 0.7 is false → "other" path
      const result = selectLanguagePalette('Elven', '', palettes, detectNothing);
      expect(isInConventionalPool(result, 'Elven')).toBe(false);
    });

    it.each([
      'Dwarven', 'Orcish', 'Goblinoid', 'Gnomish', 'Giant',
    ])('maps %s dropdown to a palette in its conventional pool on the 70%% roll', (race) => {
      randomSpy.mockReturnValue(0); // conventional branch + pool index 0
      const result = selectLanguagePalette(race, '', palettes, detectNothing);
      expect(isInConventionalPool(result, race)).toBe(true);
    });
  });

  describe('priority 2 — fantasy-race weighting (input keyword signal)', () => {
    it('detects "elven" in user input even with no dropdown', () => {
      randomSpy.mockReturnValue(0); // conventional branch + pool[0]
      const result = selectLanguagePalette(null, 'an elven longbow', palettes, detectNothing);
      expect(isInConventionalPool(result, 'Elven')).toBe(true);
    });

    it('detects various Elven keywords (elf, elves, elvish)', () => {
      randomSpy.mockReturnValue(0);
      expect(isInConventionalPool(
        selectLanguagePalette(null, 'a single elf', palettes, detectNothing),
        'Elven',
      )).toBe(true);
      expect(isInConventionalPool(
        selectLanguagePalette(null, 'forged by elves', palettes, detectNothing),
        'Elven',
      )).toBe(true);
      expect(isInConventionalPool(
        selectLanguagePalette(null, 'elvish craftsmanship', palettes, detectNothing),
        'Elven',
      )).toBe(true);
    });

    it('detects "dwarven" via keyword path → Dwarven conventional pool', () => {
      randomSpy.mockReturnValue(0);
      const result = selectLanguagePalette(null, 'an ancient dwarven warhammer', palettes, detectNothing);
      expect(isInConventionalPool(result, 'Dwarven')).toBe(true);
    });

    it('first race keyword found wins on conflicting signals', () => {
      // "elven blade carried by an orcish chieftain" mentions both elven
      // and orcish. The keyword map iterates in declaration order —
      // Elven is declared before Orcish, so Elven wins. Documents the
      // resolution.
      randomSpy.mockReturnValue(0);
      const result = selectLanguagePalette(
        null,
        'elven blade carried by an orcish chieftain',
        palettes,
        detectNothing,
      );
      expect(isInConventionalPool(result, 'Elven')).toBe(true);
      expect(isInConventionalPool(result, 'Orcish')).toBe(false);
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

  describe('Orcish/Goblinoid targeted palette exclusion', () => {
    // Orcs and goblins as fantasy categories have a documented history
    // of being racially coded against real human groups. The targeted
    // exclusion blocks the random alternative branch from landing on
    // palettes whose real-world referents have historically been
    // orc-coded — without losing legitimate cross-cultural pairings
    // (Celtic orcs, Sindarin orcs, Norse orcs, etc.) and without
    // overriding explicit user choice via cultural detection.
    //
    // The test palette pool above contains four entries on the
    // exclusion list (Japanese, Chinese, Yoruba, Andean), so the
    // filter has something to filter when invoked for Orcish/Goblinoid.

    const isExcluded = (palette) =>
      orcGoblinExcludedPalettes.some(prefix => palette.startsWith(prefix));

    // Spread fractional values across [0, 0.99] so the alt-pool index
    // pick lands on every position in the post-filter pool. The first
    // Math.random call (the 70/30 roll) must be ≥ 0.7 to enter the
    // alternative branch; the second call (the index pick) varies.
    const indexRolls = [0.0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.75, 0.85, 0.95, 0.99];

    it.each(indexRolls)(
      'Orcish + alternative branch never returns an excluded palette (index roll = %f)',
      (indexRoll) => {
        randomSpy
          .mockReturnValueOnce(0.85)        // ≥ 0.7 → alternative branch
          .mockReturnValueOnce(indexRoll);  // index pick
        const result = selectLanguagePalette('Orcish', '', palettes, detectNothing);
        expect(isExcluded(result)).toBe(false);
        // The conventional palette is also excluded from the alt pool
        // (so the alt branch reliably produces an unconventional pairing).
        expect(result).not.toMatch(/^Orcish[: ]/);
      },
    );

    it.each(indexRolls)(
      'Goblinoid + alternative branch never returns an excluded palette (index roll = %f)',
      (indexRoll) => {
        randomSpy
          .mockReturnValueOnce(0.85)
          .mockReturnValueOnce(indexRoll);
        const result = selectLanguagePalette('Goblinoid', '', palettes, detectNothing);
        expect(isExcluded(result)).toBe(false);
        expect(result).not.toMatch(/^Goblin-inspired/);
      },
    );

    it('Elven + alternative branch is NOT subject to the exclusion (filter is race-gated)', () => {
      // Regression guard against accidentally over-applying the filter:
      // sweep alt-pool index rolls for an Elven generation and verify
      // that at least one roll DOES land on an excluded-for-orc palette.
      // If this fails, the filter is firing for races it shouldn't.
      let sawExcluded = false;
      for (const indexRoll of indexRolls) {
        randomSpy
          .mockReturnValueOnce(0.85)
          .mockReturnValueOnce(indexRoll);
        const result = selectLanguagePalette('Elven', '', palettes, detectNothing);
        if (isExcluded(result)) {
          sawExcluded = true;
          break;
        }
      }
      expect(sawExcluded).toBe(true);
    });

    it('Orcish + cultural detection still returns the detected palette (user agency preserved)', () => {
      // Even when the detected palette is on the exclusion list (Yoruba
      // here), priority 1 cultural detection wins. The exclusion is
      // about RANDOM imposition of a problematic pairing, not about
      // overriding explicit user choice.
      const detect = stubDetect('Yoruba-inspired: rhythmic (e.g., Olorun)');
      const result = selectLanguagePalette('Orcish', "Olorun's drum", palettes, detect);
      expect(result).toMatch(/^Yoruba-inspired/);
    });

    it('Orcish + 70% conventional roll returns Orcish palette (filter does not run on conventional path)', () => {
      randomSpy.mockReturnValue(0.5); // < 0.7 → conventional path
      const result = selectLanguagePalette('Orcish', '', palettes, detectNothing);
      expect(result).toMatch(/^Orcish[: ]/);
    });

    it('Persian-inspired is excluded from orc/goblin alt branch (distinct from Arabic/Persian-inspired)', () => {
      // Persian-inspired is a separate palette string from Arabic/
      // Persian-inspired. startsWith would not catch the former from
      // the latter's exclusion entry, so Persian-inspired needs its
      // own entry in orcGoblinExcludedPalettes. This test guards
      // against a future contributor accidentally removing it.
      const persianInPool = [
        ...palettes,
        'Persian-inspired: refined classical-aesthetic register (e.g., Anahita)',
      ];
      // Iterate alt-pool index rolls; result must never start with
      // Persian-inspired for an Orcish generation in the alt branch.
      const indexRolls = [0.0, 0.1, 0.25, 0.5, 0.75, 0.9, 0.99];
      for (const indexRoll of indexRolls) {
        randomSpy.mockReturnValueOnce(0.85).mockReturnValueOnce(indexRoll);
        const result = selectLanguagePalette('Orcish', '', persianInPool, detectNothing);
        expect(result).not.toMatch(/^Persian-inspired/);
      }
    });

    it('orcGoblinExcludedPalettes export contains the expected entries', () => {
      // Persian-inspired added separately from Arabic/Persian-inspired —
      // they're distinct palette prefixes (the former is the new
      // refined-classical register for Elven conventional; the latter
      // is the existing flowing/melodic register). Both excluded from
      // orc/goblin alt-branch picks.
      const expected = [
        'Yoruba-inspired', 'Akan-inspired', 'Igbo-inspired',
        'Swahili-inspired', 'Arabic/Persian-inspired', 'Persian-inspired',
        'Hebrew-inspired', 'Hindi/Sanskrit-inspired', 'Chinese-inspired',
        'Korean-inspired', 'Mongolian-inspired', 'Tibetan-inspired',
        'Thai-inspired', 'Maori-inspired', 'Hawaiian-inspired',
        'Maya-inspired', 'Aztec/Nahuatl-inspired', 'Lakota-inspired',
        'Navajo/Diné-inspired', 'Andean-inspired',
      ];
      expect([...orcGoblinExcludedPalettes].sort()).toEqual(expected.sort());
    });
  });

  describe('exported maps (regression guards)', () => {
    it('fantasyRaceConventionalPalettes covers exactly the six core races', () => {
      const expected = ['Elven', 'Dwarven', 'Orcish', 'Goblinoid', 'Gnomish', 'Giant'];
      expect(Object.keys(fantasyRaceConventionalPalettes).sort()).toEqual(expected.sort());
    });

    it('fantasyRaceConventionalPalettes values are non-empty arrays of palette prefixes', () => {
      // After the multi-palette refactor every value is an array
      // (size ≥ 1). Single-palette pools (Orcish, Goblinoid) are
      // intentional; multi-palette pools (Elven, Dwarven, Gnomish,
      // Giant) honor plural cultural traditions and reduce example-
      // name reuse via cross-palette rotation.
      for (const [race, prefixes] of Object.entries(fantasyRaceConventionalPalettes)) {
        expect(Array.isArray(prefixes)).toBe(true);
        expect(prefixes.length).toBeGreaterThanOrEqual(1);
        prefixes.forEach(p => expect(typeof p).toBe('string'));
      }
    });

    it('Orcish and Goblinoid have single-palette conventional pools (intentional)', () => {
      // Single-palette pools for orcs/goblins are deliberate. Real-world
      // clan-warrior and trickster traditions appear on the orc/goblin
      // exclusion list; broadening the conventional pool would
      // reproduce the racist-coding pattern the exclusion prevents.
      // Variety comes from the cross-cultural 30% alt branch instead.
      expect(fantasyRaceConventionalPalettes['Orcish']).toEqual(['Orcish']);
      expect(fantasyRaceConventionalPalettes['Goblinoid']).toEqual(['Goblin-inspired']);
    });

    it('Elven, Dwarven, Gnomish, Giant have multi-palette conventional pools', () => {
      expect(fantasyRaceConventionalPalettes['Elven'].length).toBeGreaterThan(1);
      expect(fantasyRaceConventionalPalettes['Dwarven'].length).toBeGreaterThan(1);
      expect(fantasyRaceConventionalPalettes['Gnomish'].length).toBeGreaterThan(1);
      expect(fantasyRaceConventionalPalettes['Giant'].length).toBeGreaterThan(1);
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

  describe('resolveFantasyRace (helper exported for prompt-side gating)', () => {
    // The same race resolution selectLanguagePalette uses internally.
    // ItemGenerator imports this to gate the orc/goblin override-
    // revocation prompt block — that block must fire whenever the
    // palette filter would have fired, including the keyword-in-lore
    // case the user reproduced (origin=Necromantic, lore="Orcish
    // Battleaxe" → fantasyRace='Orcish' via priority 2b).

    it('returns the dropdown origin when it is a core fantasy race', () => {
      expect(resolveFantasyRace('Orcish', '')).toBe('Orcish');
      expect(resolveFantasyRace('Goblinoid', '')).toBe('Goblinoid');
      expect(resolveFantasyRace('Elven', '')).toBe('Elven');
    });

    it('returns null for non-fantasy-race origins with no keyword signal', () => {
      expect(resolveFantasyRace('Necromantic', '')).toBe(null);
      expect(resolveFantasyRace('Celestial', '')).toBe(null);
      expect(resolveFantasyRace(null, '')).toBe(null);
    });

    it('falls back to user-input keywords when origin is non-fantasy-race', () => {
      // The bug-report path: user picks Necromantic origin, types "Orcish
      // Battleaxe" in lore. fantasyRace must resolve to 'Orcish' so the
      // prompt-side revocation can gate on it.
      expect(resolveFantasyRace('Necromantic', 'Orcish Battleaxe')).toBe('Orcish');
      expect(resolveFantasyRace(null, 'A weathered goblin shiv')).toBe('Goblinoid');
    });

    it('first-found-wins on conflicting keyword signals (declaration order)', () => {
      // Elven appears before Orcish in the keyword map — same resolution
      // selectLanguagePalette already uses for its 70/30 weighting branch.
      expect(resolveFantasyRace(null, 'elven blade carried by an orcish chieftain'))
        .toBe('Elven');
    });

    it('is case-insensitive on keyword detection', () => {
      expect(resolveFantasyRace(null, 'ORCISH RUNE-CARVED MAUL')).toBe('Orcish');
    });
  });
});
