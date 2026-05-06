import {
  selectLanguagePalette,
  resolveFantasyRace,
  fantasyRaceConventionalPalettes,
  fantasyRaceKeywords,
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
  'Old-Irish-inspired: pre-modern Gaeilge (e.g., placeholder)',
  'Old-Occitan-inspired: troubadour register',
  'Germanic-inspired: guttural (e.g., Grundrak)',
  'Old-Norse-inspired: Eddaic register (e.g., Sigrún)',
  'Anglo-Saxon-inspired: Old English compounds (e.g., Wulfstan)',
  'Old-High-German-inspired: continental Germanic (e.g., placeholder)',
  'Middle-High-German-inspired: Nibelungenlied register (e.g., placeholder)',
  'Gothic-inspired: earliest documented Germanic',
  'Orcish: brutal, guttural (e.g., Grokthash)',
  'Goblin-inspired: sharp (e.g., Skragbit)',
  'Gnomish: clever, playful (e.g., Fizzwocket)',
  'Norse-inspired: harsh consonants (e.g., Stormbreak)',
  'Japanese-inspired: clean syllables (e.g., Kagezuki)',
  'Chinese-inspired: tonal (e.g., Jianhao)',
  'Yoruba-inspired: rhythmic',
  'Andean-inspired: structured Quechua (e.g., Inti-Wasi)',
  'Slavic-inspired: archaic clusters (e.g., Voronsk)',
  'Old-Slavic-inspired: archaic Slavic register',
  'Greek-inspired: mythological weight',
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

  describe('Orcish/Goblinoid allow-list architecture', () => {
    // Orcs and goblins are restricted to a curated allow-list of
    // European registers (fictional fantasy + Germanic + Celtic +
    // Slavic + Latin) with documented orc/goblin-fantasy precedent.
    // Selection is pool-only — no 30% alternative branch — and
    // cultural detection from user input is subordinated to the pool.
    // The architecture replaced an earlier filter approach
    // (orcGoblinExcludedPalettes) that had a code-path gap allowing
    // Goblinoid + Navajo/Diné to reach a production output.

    // Index rolls span the pool's range; pool-only branch makes one
    // Math.random call per generation (just the index pick).
    const indexRolls = [0.0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.75, 0.85, 0.95, 0.99];

    it.each(indexRolls)(
      'Orcish always returns a palette in the Orcish allow-list pool (index roll = %f)',
      (indexRoll) => {
        randomSpy.mockReturnValue(indexRoll);
        const result = selectLanguagePalette('Orcish', '', palettes, detectNothing);
        expect(isInConventionalPool(result, 'Orcish')).toBe(true);
      },
    );

    it.each(indexRolls)(
      'Goblinoid always returns a palette in the Goblinoid allow-list pool (index roll = %f)',
      (indexRoll) => {
        randomSpy.mockReturnValue(indexRoll);
        const result = selectLanguagePalette('Goblinoid', '', palettes, detectNothing);
        expect(isInConventionalPool(result, 'Goblinoid')).toBe(true);
      },
    );

    describe('70/30 weighting within the allow-list pool', () => {
      // Within the orc/goblin allow-list, 70% of generations land on
      // the primary fictional register (Orcish / Goblin-inspired) and
      // 30% spread across the European cross-cultural pool members.
      // Without this weighting, the primary register would only fire
      // 1-in-N — too rarely for orcs/goblins to feel canonically orc/
      // goblin most of the time.

      it('Orcish: Math.random < 0.7 returns the Orcish primary register', () => {
        // 70/30 roll: 0.5 < 0.7 → primary branch → 'Orcish'.
        randomSpy.mockReturnValue(0.5);
        const result = selectLanguagePalette('Orcish', '', palettes, detectNothing);
        expect(result).toMatch(/^Orcish[: ]/);
      });

      it('Orcish: Math.random ≥ 0.7 returns a non-primary allow-list palette', () => {
        // 70/30 roll: 0.85 ≥ 0.7 → alt-pool branch.
        // alt-pool index pick: 0.0 → first alt-pool entry.
        randomSpy.mockReturnValueOnce(0.85).mockReturnValueOnce(0.0);
        const result = selectLanguagePalette('Orcish', '', palettes, detectNothing);
        expect(result).not.toMatch(/^Orcish[: ]/);
        expect(isInConventionalPool(result, 'Orcish')).toBe(true);
      });

      it('Orcish: 70/30 boundary (Math.random === 0.7) takes the alt branch (strict less-than)', () => {
        randomSpy.mockReturnValueOnce(0.7).mockReturnValueOnce(0.0);
        const result = selectLanguagePalette('Orcish', '', palettes, detectNothing);
        expect(result).not.toMatch(/^Orcish[: ]/);
      });

      it('Goblinoid: Math.random < 0.7 returns the Goblin-inspired primary register', () => {
        randomSpy.mockReturnValue(0.5);
        const result = selectLanguagePalette('Goblinoid', '', palettes, detectNothing);
        expect(result).toMatch(/^Goblin-inspired/);
      });

      it('Goblinoid: Math.random ≥ 0.7 returns a non-primary allow-list palette', () => {
        randomSpy.mockReturnValueOnce(0.85).mockReturnValueOnce(0.0);
        const result = selectLanguagePalette('Goblinoid', '', palettes, detectNothing);
        expect(result).not.toMatch(/^Goblin-inspired/);
        expect(isInConventionalPool(result, 'Goblinoid')).toBe(true);
      });
    });

    it('Orcish + cultural detection of in-pool palette is honored', () => {
      // Norse-coded user input that resolves to Old-Norse-inspired
      // (which IS in the Orcish pool) is honored. The pool architecture
      // doesn't override user signals that align with the allow-list.
      const detect = stubDetect('Old-Norse-inspired: Eddaic register (e.g., Sigrún)');
      const result = selectLanguagePalette('Orcish', "Mjolnir's echo", palettes, detect);
      expect(result).toMatch(/^Old-Norse-inspired/);
    });

    it('Orcish + cultural detection of out-of-pool palette is OVERRIDDEN by pool selection', () => {
      // The architectural protection: even when the user signal would
      // resolve to a protected-list palette (Yoruba here), the pool
      // wins. This is the bug fix for the Goblinoid + Navajo/Diné
      // production failure — no cultural-detection escape hatch.
      randomSpy.mockReturnValue(0); // pool[0] = Orcish
      const detect = stubDetect('Yoruba-inspired: rhythmic');
      const result = selectLanguagePalette('Orcish', "Olorun's drum", palettes, detect);
      expect(result).not.toMatch(/^Yoruba-inspired/);
      expect(isInConventionalPool(result, 'Orcish')).toBe(true);
    });

    it('Orcish + "Akiko of the lands" (Japanese-coded user input) returns Orcish-pool palette, not Japanese', () => {
      // Brief verification case verbatim. Japanese cultural detection
      // would normally fire from "Akiko" (Japanese given name) — the
      // pool-only branch overrides that signal because orc/goblin
      // contexts subordinate cultural detection to the European
      // allow-list. This is the architectural commitment the
      // production-failure (Stone-Flesh Vest with Yoruba names) was
      // meant to prevent.
      randomSpy.mockReturnValue(0); // pool[0] = Orcish
      const detect = stubDetect('Japanese-inspired: clean syllables (e.g., Kagezuki)');
      const result = selectLanguagePalette('Orcish', 'Akiko of the lands', palettes, detect);
      expect(result).not.toMatch(/^Japanese-inspired/);
      expect(isInConventionalPool(result, 'Orcish')).toBe(true);
    });

    it('Goblinoid + cultural detection of out-of-pool palette is OVERRIDDEN by pool selection', () => {
      // Same protection for Goblinoid. Reproduces the original
      // production failure scenario at the architecture level.
      randomSpy.mockReturnValue(0); // pool[0] = Goblin-inspired
      const detect = stubDetect('Navajo/Diné-inspired: clan-rooted naming');
      const result = selectLanguagePalette('Goblinoid', 'Hashk\'aan goblin clan', palettes, detect);
      expect(result).not.toMatch(/^Navajo\/Diné-inspired/);
      expect(isInConventionalPool(result, 'Goblinoid')).toBe(true);
    });

    it('Elven + cultural detection of any palette is still honored (pool-only is orc/goblin-specific)', () => {
      // Regression guard: the pool-only architecture is scoped to orcs
      // and goblins. Other fantasy races still respect priority-1
      // cultural detection across all palettes.
      const detect = stubDetect('Yoruba-inspired: rhythmic');
      const result = selectLanguagePalette('Elven', "Olorun's gift", palettes, detect);
      expect(result).toMatch(/^Yoruba-inspired/);
    });

    it('Elven + alt branch can land on protected-list palettes (no orc/goblin filter)', () => {
      // Regression guard: the orc/goblin protection should not bleed
      // into other races. Iterate Elven alt-branch picks; at least one
      // should land on a palette that would have been blocked under
      // the old filter (Yoruba/Andean/Chinese/Japanese in this pool).
      let sawProtectedListPalette = false;
      for (const indexRoll of indexRolls) {
        randomSpy.mockReturnValueOnce(0.85).mockReturnValueOnce(indexRoll);
        const result = selectLanguagePalette('Elven', '', palettes, detectNothing);
        if (/^(Yoruba|Andean|Chinese|Japanese)-inspired/.test(result)) {
          sawProtectedListPalette = true;
          break;
        }
      }
      expect(sawProtectedListPalette).toBe(true);
    });

    it('orcGoblinExcludedPalettes is no longer exported (replaced by allow-list architecture)', async () => {
      // Regression guard: the old filter export was removed when the
      // allow-list shipped. A future contributor reintroducing it would
      // be a sign the dual-mechanism architecture has snuck back in.
      const mod = await import('./select-language-palette.mjs');
      expect(mod).not.toHaveProperty('orcGoblinExcludedPalettes');
    });
  });

  describe('exported maps (regression guards)', () => {
    it('fantasyRaceConventionalPalettes covers exactly the six core races', () => {
      const expected = ['Elven', 'Dwarven', 'Orcish', 'Goblinoid', 'Gnomish', 'Giant'];
      expect(Object.keys(fantasyRaceConventionalPalettes).sort()).toEqual(expected.sort());
    });

    it('fantasyRaceConventionalPalettes values are non-empty arrays of palette prefixes', () => {
      for (const [race, prefixes] of Object.entries(fantasyRaceConventionalPalettes)) {
        expect(Array.isArray(prefixes)).toBe(true);
        expect(prefixes.length).toBeGreaterThanOrEqual(1);
        prefixes.forEach(p => expect(typeof p).toBe('string'));
      }
    });

    it('every fantasy race has a multi-palette conventional pool', () => {
      // After the orc/goblin allow-list architecture, every race has
      // multiple palettes: Elven/Dwarven/Gnomish/Giant for cross-
      // palette name-rotation variety; Orcish/Goblinoid for the
      // European-register allow-list.
      for (const [race, prefixes] of Object.entries(fantasyRaceConventionalPalettes)) {
        expect(prefixes.length).toBeGreaterThan(1);
      }
    });

    it('Orcish allow-list pool contains the expected European registers', () => {
      // The Orcish pool is European-only (fictional fantasy + Germanic
      // + Celtic + Slavic + Latin). Drift away from this list — adding
      // a protected-tradition register, dropping one of the European
      // registers without explicit reason — should fail this test
      // and force a deliberate decision rather than a quiet change.
      const expected = [
        'Orcish',
        'Old-Norse-inspired',
        'Anglo-Saxon-inspired',
        'Old-High-German-inspired',
        'Middle-High-German-inspired',
        'Gothic-inspired',
        'Welsh-inspired',
        'Old-Irish-inspired',
        'Old-Slavic-inspired',
        'Latin-inspired',
      ];
      expect([...fantasyRaceConventionalPalettes['Orcish']].sort())
        .toEqual([...expected].sort());
    });

    it('Goblinoid allow-list pool contains the expected European registers', () => {
      const expected = [
        'Goblin-inspired',
        'Old-Norse-inspired',
        'Anglo-Saxon-inspired',
        'Middle-High-German-inspired',
        'Gothic-inspired',
        'Old-Slavic-inspired',
      ];
      expect([...fantasyRaceConventionalPalettes['Goblinoid']].sort())
        .toEqual([...expected].sort());
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
