import {
  selectRegister,
  resolveFantasyRace,
  fantasyRaceConventionalRegisters,
  fantasyRaceKeywords,
  horrorRestrictedOrigins,
  horrorOriginRegisterPool,
  fictionalOriginRegisters,
  WESTERN_FANTASY_BOUND_RACES,
} from './select-register.mjs';

// Realistic register pool covering at least one prefix from each fantasy
// race's conventional pool, plus a handful of unrelated registers for
// alt-branch testing. The function looks up registers by prefix, so any
// entry whose prefix matches a fantasy-race conventional prefix is
// reachable via the conventional path.
//
// With the multi-register pool architecture, each fantasy race has 1-6
// conventional prefixes. Tests that need a deterministic conventional
// pick mock Math.random() to 0 (which selects pool index 0 — the first
// prefix in each race's pool); the test pool MUST contain at least
// that first-prefix entry for each race used in tests. Specifically:
//   Elven      pool[0] = 'Elven'        ✓
//   Dwarven    pool[0] = 'Old-Norse-inspired'       ✓
//   Orcish     pool[0] = 'Orcish'                   ✓
//   Goblinoid  pool[0] = 'Goblin-inspired'          ✓
//   Gnomish    pool[0] = 'Gnomish'                  ✓
//   Giant      pool[0] = 'Norse-inspired'           ✓
const registers = [
  'Latin-inspired: formal (e.g., Aurelium)',
  'Elven: elegant (e.g., Aelindariel)',
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
  // Horror-origin pool members not already in the test pool. Needed so
  // the horror-restricted branch can pool-pick a member, and so cultural-
  // detection-overridden tests can verify the override resolves into
  // a real in-pool entry.
  'Romanian-inspired: Latin-rooted with Slavic influence (e.g., Mihai)',
  'Abyssal: guttural, chaotic (e.g., Ghar\'zuul)',
  'Infernal: sharp, aggressive (e.g., Vex\'tharion)',
  'Aberrant: unpronounceable clusters (e.g., Xith\'vaar)',
  // Fictional-origin matching registers — needed so the fictional-
  // origin routing branch can resolve to a real in-pool entry.
  'Draconic: harsh sibilants, ancient weight (e.g., Szarthrax)',
  'Primordial: pre-language sounds, elemental (e.g., Aath\'kol)',
  'Finnish-inspired: vowel harmony, agglutinative (e.g., Aino)',
];

// Helper: assert that `result` starts with one of the prefixes in the
// race's conventional pool. Used by tests that don't care which
// specific register in the pool was rolled, just that the conventional
// branch fired and produced a member of the pool.
const isInConventionalPool = (result, race) =>
  fantasyRaceConventionalRegisters[race].some(prefix => result.startsWith(prefix));

// Stub detection function with controllable return value.
const stubDetect = (returnValue) => () => returnValue;
const detectNothing = stubDetect(null);

describe('selectRegister', () => {
  let randomSpy;
  beforeEach(() => {
    randomSpy = jest.spyOn(Math, 'random');
  });
  afterEach(() => {
    randomSpy.mockRestore();
  });

  describe('priority 1 — cultural detection wins for cross-cultural-archetype races', () => {
    // Post-Task-1, the five Western-fantasy-bound races (Orcish,
    // Goblinoid, Dwarven, Gnomish, Elven) are allow-list-restricted —
    // priority-1 cultural detection only wins for them when the
    // detected register is in the race's allow-list. For the cross-
    // cultural-archetype race (Giant), priority-1 cultural detection
    // wins unconditionally.
    it('returns the detected register when detection fires (Giant + non-pool register)', () => {
      const detect = stubDetect('Japanese-inspired: clean syllables (e.g., Kagezuki)');
      const result = selectRegister('Giant', "Akiko's giant kin", registers, detect);
      // Japanese is NOT in the Giant pool (Norse/Greek/Anglo-Saxon).
      // Cultural detection is priority 1 for cross-cultural-archetype
      // races; it wins even when the detected register is non-conventional.
      expect(result).toMatch(/^Japanese-inspired/);
    });

    it('cultural detection wins regardless of fantasy-race weighting random roll (Giant)', () => {
      // Even with the 70% conventional roll loaded, cultural detection
      // never reaches the weighting branch. Tested on Giant because
      // Giant is the only fantasy race left on the priority-2 weighted
      // branch after Western-fantasy-bound races were promoted to
      // allow-list restriction.
      randomSpy.mockReturnValue(0.0);
      const detect = stubDetect('Yoruba-inspired: rhythmic with diacriticals');
      const result = selectRegister('Giant', "Olorun's hammer", registers, detect);
      expect(result).toMatch(/^Yoruba-inspired/);
    });
  });

  describe('priority 2 — fantasy-race weighting (dropdown signal, Giant only post-promotion)', () => {
    // Pre-Task-1, the priority-2 weighted branch (70/30 with broad
    // alt-branch into the full register pool) fired for Elven, Dwarven,
    // Gnomish, AND Giant. Post-Task-1, the first three are allow-list-
    // restricted and the priority-2 branch is reserved for the single
    // remaining cross-cultural-archetype fantasy race: Giant.

    it('returns a register from the race\'s conventional pool when random < 0.7 (Giant)', () => {
      // The 70/30 roll uses Math.random call #1; the within-pool index
      // pick uses Math.random call #2. mockReturnValue(0) hits the
      // conventional branch and selects pool index 0 (Norse-inspired
      // for Giant).
      randomSpy.mockReturnValue(0);
      const result = selectRegister('Giant', '', registers, detectNothing);
      expect(isInConventionalPool(result, 'Giant')).toBe(true);
      expect(result).toMatch(/^Norse-inspired/);
    });

    it('returns non-conventional register when random >= 0.7 (Giant alt branch)', () => {
      // Post-promotion, only Giant retains the priority-2 alt-branch
      // semantics — the 30% case can land on any register outside the
      // Giant pool (Norse/Greek/Anglo-Saxon). This is the architectural
      // commitment that cross-cultural-archetype races pair freely.
      randomSpy.mockReturnValue(0.85);
      const result = selectRegister('Giant', '', registers, detectNothing);
      expect(isInConventionalPool(result, 'Giant')).toBe(false);
    });

    it('70/30 boundary: random === 0.7 picks "other" (strict less-than, Giant)', () => {
      randomSpy.mockReturnValue(0.7);
      const result = selectRegister('Giant', '', registers, detectNothing);
      expect(isInConventionalPool(result, 'Giant')).toBe(false);
    });

    it.each([
      'Dwarven', 'Orcish', 'Goblinoid', 'Gnomish', 'Giant', 'Elven',
    ])('maps %s dropdown to a register in its conventional pool on the 70%% roll', (race) => {
      // 70% roll is the convergent case — Western-fantasy-bound
      // (allow-list-restricted) and priority-2 both land on pool[0]
      // when Math.random === 0. The test asserts the structural
      // invariant (race-pool match) regardless of which branch the
      // race is in.
      randomSpy.mockReturnValue(0);
      const result = selectRegister(race, '', registers, detectNothing);
      expect(isInConventionalPool(result, race)).toBe(true);
    });
  });

  describe('priority 2 — fantasy-race weighting (input keyword signal)', () => {
    it('detects "elven" in user input even with no dropdown', () => {
      randomSpy.mockReturnValue(0); // conventional branch + pool[0]
      const result = selectRegister(null, 'an elven longbow', registers, detectNothing);
      expect(isInConventionalPool(result, 'Elven')).toBe(true);
    });

    it('detects various Elven keywords (elf, elves, elvish)', () => {
      randomSpy.mockReturnValue(0);
      expect(isInConventionalPool(
        selectRegister(null, 'a single elf', registers, detectNothing),
        'Elven',
      )).toBe(true);
      expect(isInConventionalPool(
        selectRegister(null, 'forged by elves', registers, detectNothing),
        'Elven',
      )).toBe(true);
      expect(isInConventionalPool(
        selectRegister(null, 'elvish craftsmanship', registers, detectNothing),
        'Elven',
      )).toBe(true);
    });

    it('detects "dwarven" via keyword path → Dwarven conventional pool', () => {
      randomSpy.mockReturnValue(0);
      const result = selectRegister(null, 'an ancient dwarven warhammer', registers, detectNothing);
      expect(isInConventionalPool(result, 'Dwarven')).toBe(true);
    });

    it('first race keyword found wins on conflicting signals', () => {
      // "elven blade carried by an orcish chieftain" mentions both elven
      // and orcish. The keyword map iterates in declaration order —
      // Elven is declared before Orcish, so Elven wins. Documents the
      // resolution.
      randomSpy.mockReturnValue(0);
      const result = selectRegister(
        null,
        'elven blade carried by an orcish chieftain',
        registers,
        detectNothing,
      );
      expect(isInConventionalPool(result, 'Elven')).toBe(true);
      expect(isInConventionalPool(result, 'Orcish')).toBe(false);
    });

    it('does not match keyword inside a longer word (word boundary)', () => {
      // "elf" should NOT match inside "self" or "shelf". \belf\b protects.
      // Keyword detection uses regex (no Math.random), so the first
      // Math.random call is the uniform-random fallback index pick.
      randomSpy.mockReturnValue(0.0); // → registers[0] = Latin
      const result = selectRegister(null, 'on the shelf, the self', registers, detectNothing);
      // No race detected → priority 3 uniform random fallback → registers[0].
      expect(result).toMatch(/^Latin-inspired/);
    });
  });

  describe('priority 3 — uniform random fallback', () => {
    it('falls through to uniform random when no signal is present', () => {
      // No detection, no fantasy race. Function reaches the final branch.
      randomSpy.mockReturnValue(0.0); // index 0 → first register
      const result = selectRegister(null, '', registers, detectNothing);
      expect(result).toBe(registers[0]);
    });

    it('uniform random respects the full pool', () => {
      // Math.random=0.99 floors to last index of the pool.
      randomSpy.mockReturnValue(0.99);
      const result = selectRegister(null, '', registers, detectNothing);
      expect(result).toBe(registers[Math.floor(0.99 * registers.length)]);
    });
  });

  describe('aesthetic origins do not trigger fantasy-race weighting', () => {
    // Aesthetic origins (Celestial, Fey, Verdant, Wizardry, etc.) are
    // intentionally absent from fantasyRaceOriginConventionalRegisters
    // and from fictionalOriginRegisters. They should NOT bias register
    // selection — the architectural choice is that these aesthetic
    // origins pair freely with any linguistic register.
    //
    // Note: Necromantic / Abyssal / Aberrant / Infernal go through
    // protection branches (horror restriction or fictional-origin
    // routing) and are tested in those describe blocks instead.
    it.each(['Celestial', 'Fey', 'Verdant', 'Wizardry'])(
      '%s does not trigger fantasy-race weighting',
      (origin) => {
        randomSpy.mockReturnValue(0.0);
        const result = selectRegister(origin, '', registers, detectNothing);
        // Should fall through to uniform random (priority 3) → registers[0]
        expect(result).toBe(registers[0]);
      }
    );
  });

  describe('fictional-origin → matching-register routing (70/30)', () => {
    // Five fictional origins (Draconic, Aberrant, Abyssal, Infernal,
    // Primordial) route to their matching fictional register 70% of
    // the time and to a per-origin curated alt-pool 30% of the time.
    // The 70% case fires the matching whitelist; the 30% case
    // provides cross-cultural tonal variety. Overrides cultural
    // detection, horror restriction, and fantasy-race restriction.
    //
    // Motivating bug: Draconic-origin items were rolling Finnish
    // (or any other active register) because Draconic wasn't in any
    // branch, so the Draconic whitelist almost never fired. Same
    // gap for Primordial; ~8% match rate for Aberrant/Abyssal/
    // Infernal in the 12-member horror pool.

    it.each([
      ['Draconic',   'Draconic'],
      ['Aberrant',   'Aberrant'],
      ['Abyssal',    'Abyssal'],
      ['Infernal',   'Infernal'],
      ['Primordial', 'Primordial'],
    ])('%s origin: 70%% roll returns %s primary register', (origin, expectedPrefix) => {
      randomSpy.mockReturnValue(0); // < 0.7 → primary branch
      const result = selectRegister(origin, '', registers, detectNothing);
      expect(result.startsWith(expectedPrefix)).toBe(true);
    });

    it.each([
      ['Draconic',   'Draconic'],
      ['Aberrant',   'Aberrant'],
      ['Abyssal',    'Abyssal'],
      ['Infernal',   'Infernal'],
      ['Primordial', 'Primordial'],
    ])('%s origin: 30%% roll returns alt-pool member (NOT %s primary)', (origin, primaryPrefix) => {
      randomSpy.mockReturnValue(0.85); // ≥ 0.7 → alt branch
      const altPool = fictionalOriginRegisters[origin].altPool;
      const result = selectRegister(origin, '', registers, detectNothing);
      // Alt-branch result is NOT the primary register.
      expect(result.startsWith(primaryPrefix)).toBe(false);
      // Alt-branch result IS one of the curated alt-pool prefixes.
      const inAltPool = altPool.some(prefix => result.startsWith(prefix));
      expect(inAltPool).toBe(true);
    });

    it('70/30 boundary: random === 0.7 takes the alt branch (strict less-than)', () => {
      randomSpy.mockReturnValue(0.7);
      const result = selectRegister('Draconic', '', registers, detectNothing);
      // At exactly 0.7, the strict-less-than primary check fails and
      // we fall to the alt-pool branch.
      expect(result.startsWith('Draconic')).toBe(false);
      const inAltPool = fictionalOriginRegisters['Draconic'].altPool.some(
        prefix => result.startsWith(prefix),
      );
      expect(inAltPool).toBe(true);
    });

    it('Draconic origin: in-allow-list cultural detection wins (Finnish IS in alt-pool)', () => {
      // After the user-direction restoration, Finnish is in Draconic's
      // alt-pool — so Finnish-coded user input ("Aino's hoard-flame")
      // resolves via in-allow-list cultural detection regardless of
      // 70/30 roll. Mirrors the fantasy-race in-pool detection path.
      const detect = stubDetect('Finnish-inspired: vowel harmony, agglutinative (e.g., Aino)');
      const result = selectRegister('Draconic', "Aino's hoard-flame", registers, detect);
      expect(result).toMatch(/^Finnish-inspired/);
    });

    it('Draconic origin: out-of-allow-list cultural detection is ignored (Yoruba)', () => {
      // Yoruba is NOT in Draconic's allow-list (primary + alt-pool).
      // The architectural protection: the user signal can't escape
      // the per-origin allow-list. Falls through to 70/30 (forced
      // primary here via Math.random=0).
      randomSpy.mockReturnValue(0); // 70% branch
      const detect = stubDetect('Yoruba-inspired: rhythmic');
      const result = selectRegister('Draconic', "Olorun's hoard", registers, detect);
      expect(result).not.toMatch(/^Yoruba-inspired/);
      expect(result.startsWith('Draconic')).toBe(true);
    });

    it('Abyssal origin: 70% routes to Abyssal register (overriding the horror pool)', () => {
      // Pre-fix, Abyssal origin used the 12-member horror pool
      // (uniform random ~8% chance of matching Abyssal register).
      // Now Abyssal origin lands on Abyssal register 70% of the
      // time via this branch — fictional-origin runs FIRST.
      randomSpy.mockReturnValue(0); // 70% branch
      const result = selectRegister('Abyssal', '', registers, detectNothing);
      expect(result.startsWith('Abyssal')).toBe(true);
    });

    it('Infernal origin: 70% routes to Infernal register (overriding the horror pool)', () => {
      randomSpy.mockReturnValue(0); // 70% branch
      const result = selectRegister('Infernal', '', registers, detectNothing);
      expect(result.startsWith('Infernal')).toBe(true);
    });

    it('Aberrant origin: 70% routes to Aberrant register (overriding the horror pool)', () => {
      randomSpy.mockReturnValue(0); // 70% branch
      const result = selectRegister('Aberrant', '', registers, detectNothing);
      expect(result.startsWith('Aberrant')).toBe(true);
    });

    it('Necromantic origin still goes through the horror pool (NOT in fictional-origin map)', () => {
      // Sanity check the disjointness: Necromantic / Vampiric /
      // Lycanthropic / Shadow are horror-coded but have no matching
      // fictional register of their own, so they continue to pull
      // from the 12-member horror pool. The fictional-origin branch
      // must not accidentally claim them.
      randomSpy.mockReturnValue(0.0); // pool[0] = Latin-inspired
      const result = selectRegister('Necromantic', '', registers, detectNothing);
      expect(result.startsWith('Latin-inspired')).toBe(true);
    });

    it('fictionalOriginRegisters contains exactly the five expected origins', () => {
      // Membership lock against silent additions/removals. Adding a
      // sixth origin to this map is a deliberate architectural
      // change and should require updating this test alongside the
      // source.
      expect(Object.keys(fictionalOriginRegisters).sort()).toEqual([
        'Aberrant',
        'Abyssal',
        'Draconic',
        'Infernal',
        'Primordial',
      ]);
    });

    it('Draconic alt-pool includes Finnish (Kalevala fit)', () => {
      // User-confirmed tonal fit: Finnish (Kalevala primal-mythic
      // register, Tuoni/Louhi tradition) belongs in Draconic's alt-
      // pool. Regression guard against silent removal.
      expect(fictionalOriginRegisters['Draconic'].altPool).toContain('Finnish-inspired');
    });

    it('every fictionalOriginRegisters entry has a primary string and a non-empty altPool', () => {
      // Shape integrity: a malformed entry (missing primary, empty
      // altPool) would break the 70/30 routing silently.
      for (const [origin, entry] of Object.entries(fictionalOriginRegisters)) {
        expect(typeof entry.primary).toBe('string');
        expect(entry.primary.length).toBeGreaterThan(0);
        expect(Array.isArray(entry.altPool)).toBe(true);
        expect(entry.altPool.length).toBeGreaterThan(0);
        // primary must NOT also appear in altPool (alt is the variety
        // share — it should always pick a different register).
        expect(entry.altPool).not.toContain(entry.primary);
      }
    });

    it('fictionalOriginRegisters does NOT overlap with fantasy-race origins', () => {
      // Fantasy races have their own allow-list architecture; the
      // two protection branches must not claim the same origin.
      const fantasyRaces = Object.keys(fantasyRaceConventionalRegisters);
      for (const fictionalOrigin of Object.keys(fictionalOriginRegisters)) {
        expect(fantasyRaces).not.toContain(fictionalOrigin);
      }
    });
  });

  describe('Orcish/Goblinoid allow-list architecture', () => {
    // Orcs and goblins are restricted to a curated allow-list of
    // European registers (fictional fantasy + Germanic + Celtic +
    // Slavic + Latin) with documented orc/goblin-fantasy precedent.
    // Selection is allow-list-restricted — no 30% alternative branch —
    // and cultural detection from user input is subordinated to the
    // allow-list.
    // The architecture replaced an earlier filter approach
    // (orcGoblinExcludedRegisters) that had a code-path gap allowing
    // Goblinoid + Navajo/Diné to reach a production output.

    // Allow-list invariant: every Math.random roll across the index
    // range stays within the race's conventional pool. Catches leak-out
    // bugs where a race's selection escapes its restriction.
    it.each([
      ['Orcish'],
      ['Goblinoid'],
      ['Dwarven'],
      ['Gnomish'],
      ['Elven'],
    ])('%s allow-list: every random roll stays in the pool', (race) => {
      const indexRolls = [0.0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.75, 0.85, 0.95, 0.99];
      for (const indexRoll of indexRolls) {
        randomSpy.mockReturnValue(indexRoll);
        const result = selectRegister(race, '', registers, detectNothing);
        expect(isInConventionalPool(result, race)).toBe(true);
      }
    });

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
        const result = selectRegister('Orcish', '', registers, detectNothing);
        expect(result).toMatch(/^Orcish[: ]/);
      });

      it('Orcish: Math.random ≥ 0.7 returns a non-primary allow-list register', () => {
        // 70/30 roll: 0.85 ≥ 0.7 → alt-pool branch.
        // alt-pool index pick: 0.0 → first alt-pool entry.
        randomSpy.mockReturnValueOnce(0.85).mockReturnValueOnce(0.0);
        const result = selectRegister('Orcish', '', registers, detectNothing);
        expect(result).not.toMatch(/^Orcish[: ]/);
        expect(isInConventionalPool(result, 'Orcish')).toBe(true);
      });

      it('Orcish: 70/30 boundary (Math.random === 0.7) takes the alt branch (strict less-than)', () => {
        randomSpy.mockReturnValueOnce(0.7).mockReturnValueOnce(0.0);
        const result = selectRegister('Orcish', '', registers, detectNothing);
        expect(result).not.toMatch(/^Orcish[: ]/);
      });

      it('Goblinoid: Math.random < 0.7 returns the Goblin-inspired primary register', () => {
        randomSpy.mockReturnValue(0.5);
        const result = selectRegister('Goblinoid', '', registers, detectNothing);
        expect(result).toMatch(/^Goblin-inspired/);
      });

      it('Goblinoid: Math.random ≥ 0.7 returns a non-primary allow-list register', () => {
        randomSpy.mockReturnValueOnce(0.85).mockReturnValueOnce(0.0);
        const result = selectRegister('Goblinoid', '', registers, detectNothing);
        expect(result).not.toMatch(/^Goblin-inspired/);
        expect(isInConventionalPool(result, 'Goblinoid')).toBe(true);
      });
    });

    it('Orcish + cultural detection of in-pool register is honored', () => {
      // Norse-coded user input that resolves to Old-Norse-inspired
      // (which IS in the Orcish pool) is honored. The pool architecture
      // doesn't override user signals that align with the allow-list.
      const detect = stubDetect('Old-Norse-inspired: Eddaic register (e.g., Sigrún)');
      const result = selectRegister('Orcish', "Mjolnir's echo", registers, detect);
      expect(result).toMatch(/^Old-Norse-inspired/);
    });

    it('Orcish + cultural detection of out-of-pool register is OVERRIDDEN by pool selection', () => {
      // The architectural protection: even when the user signal would
      // resolve to a protected-list register (Yoruba here), the pool
      // wins. This is the bug fix for the Goblinoid + Navajo/Diné
      // production failure — no cultural-detection escape hatch.
      randomSpy.mockReturnValue(0); // pool[0] = Orcish
      const detect = stubDetect('Yoruba-inspired: rhythmic');
      const result = selectRegister('Orcish', "Olorun's drum", registers, detect);
      expect(result).not.toMatch(/^Yoruba-inspired/);
      expect(isInConventionalPool(result, 'Orcish')).toBe(true);
    });

    it('Orcish + "Akiko of the lands" (Japanese-coded user input) returns Orcish-pool register, not Japanese', () => {
      // Brief verification case verbatim. Japanese cultural detection
      // would normally fire from "Akiko" (Japanese given name) — the
      // allow-list branch overrides that signal because orc/goblin
      // contexts subordinate cultural detection to the European
      // allow-list. This is the architectural commitment the
      // production-failure (Stone-Flesh Vest with Yoruba names) was
      // meant to prevent.
      randomSpy.mockReturnValue(0); // pool[0] = Orcish
      const detect = stubDetect('Japanese-inspired: clean syllables (e.g., Kagezuki)');
      const result = selectRegister('Orcish', 'Akiko of the lands', registers, detect);
      expect(result).not.toMatch(/^Japanese-inspired/);
      expect(isInConventionalPool(result, 'Orcish')).toBe(true);
    });

    it('Goblinoid + cultural detection of out-of-pool register is OVERRIDDEN by pool selection', () => {
      // Same protection for Goblinoid. The original production failure
      // (Goblinoid + Navajo/Diné) is no longer reproducible since the
      // Navajo/Diné register was removed entirely, but the architectural
      // protection remains: ANY out-of-pool register is overridden.
      // Lakota stands in here as a still-shipped protected-tradition
      // register; the override mechanism is register-agnostic.
      randomSpy.mockReturnValue(0); // pool[0] = Goblin-inspired
      const detect = stubDetect('Lakota-inspired: descriptive compounds (e.g., Wakinyan-Tanka)');
      const result = selectRegister('Goblinoid', 'Wakinyan goblin clan', registers, detect);
      expect(result).not.toMatch(/^Lakota-inspired/);
      expect(isInConventionalPool(result, 'Goblinoid')).toBe(true);
    });

    it('Dwarven + Yoruba cultural detection is OVERRIDDEN by pool (Western-fantasy-bound)', () => {
      // Dwarven joined WESTERN_FANTASY_BOUND_RACES — Norse/Germanic-coded archetype
      // shouldn't pair with non-Western register. Pool wins regardless
      // of cultural-detection signal.
      randomSpy.mockReturnValue(0);
      const detect = stubDetect('Yoruba-inspired: rhythmic');
      const result = selectRegister('Dwarven', "Olorun's hammer", registers, detect);
      expect(result).not.toMatch(/^Yoruba-inspired/);
      expect(isInConventionalPool(result, 'Dwarven')).toBe(true);
    });

    it('Gnomish + Japanese cultural detection is OVERRIDDEN by pool', () => {
      randomSpy.mockReturnValue(0);
      const detect = stubDetect('Japanese-inspired: clean syllables (e.g., Kagezuki)');
      const result = selectRegister('Gnomish', "Akiko's clockwork", registers, detect);
      expect(result).not.toMatch(/^Japanese-inspired/);
      expect(isInConventionalPool(result, 'Gnomish')).toBe(true);
    });

    it('Elven + Yoruba cultural detection is OVERRIDDEN by pool (post-promotion)', () => {
      // Pre-Task-1, Elven was the canonical example of cultural-
      // detection-wins (priority 1 honored Yoruba-coded input even on
      // an Elven origin). Post-promotion to WESTERN_FANTASY_BOUND_RACES, the Elven
      // pool wins — Yoruba is not in the Elven/Welsh/Old-Irish/
      // Old-Occitan/Latin pool, so the pool overrides the detection
      // signal. This test pins the new behavior.
      randomSpy.mockReturnValue(0);
      const detect = stubDetect('Yoruba-inspired: rhythmic');
      const result = selectRegister('Elven', "Olorun's gift", registers, detect);
      expect(result).not.toMatch(/^Yoruba-inspired/);
      expect(isInConventionalPool(result, 'Elven')).toBe(true);
    });

    it('Elven + Elven cultural detection (in-pool) IS still honored', () => {
      // Elven IS in the Elven pool. In-pool cultural detection
      // wins — symmetric with the orc/goblin in-pool case.
      const detect = stubDetect('Elven: elegant (e.g., Aelindariel)');
      const result = selectRegister('Elven', 'a Elven verse', registers, detect);
      expect(result).toMatch(/^Elven/);
    });

    it('Elven pool includes Finnish (Kalevala fit)', () => {
      // User-confirmed tonal fit: Finnish (Kalevala forest-magic /
      // runic register) belongs in Elven's allow-list. Regression
      // guard against silent removal — Finnish was previously
      // trimmed from this pool ("reads as its own thing rather than
      // conventionally elven") and was restored on user direction.
      expect(fantasyRaceConventionalRegisters['Elven']).toContain('Finnish-inspired');
    });

    it('Elven + Finnish cultural detection (in-pool, post-restoration) IS honored', () => {
      // With Finnish back in the Elven pool, Finnish-coded user input
      // ("Aino's bow" → Aino is a Kalevala figure) resolves to Finnish
      // register via the in-pool cultural-detection path.
      const detect = stubDetect('Finnish-inspired: vowel harmony, agglutinative (e.g., Aino)');
      const result = selectRegister('Elven', "Aino's bow", registers, detect);
      expect(result).toMatch(/^Finnish-inspired/);
    });

    it('Elven never lands on protected-list registers (post-promotion regression guard)', () => {
      // Pre-Task-1, this test asserted Elven COULD land on Yoruba/
      // Andean/Chinese/Japanese via the 30% alt branch (the explicit
      // architectural commitment that orc/goblin protection didn't
      // bleed into other races). Post-promotion, Elven IS allow-list-
      // restricted — protected-list registers are now structurally
      // unreachable for Elven generations. This test inverts the
      // original to lock in the new behavior.
      let sawProtectedListRegister = false;
      for (const indexRoll of [0.0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.75, 0.85, 0.95, 0.99]) {
        randomSpy.mockReturnValueOnce(0.85).mockReturnValueOnce(indexRoll);
        const result = selectRegister('Elven', '', registers, detectNothing);
        if (/^(Yoruba|Andean|Chinese|Japanese)-inspired/.test(result)) {
          sawProtectedListRegister = true;
          break;
        }
      }
      expect(sawProtectedListRegister).toBe(false);
    });

    it('Giant + Yoruba cultural detection IS honored (Giant is cross-cultural archetype)', () => {
      // Regression guard: Giant is NOT in WESTERN_FANTASY_BOUND_RACES. Cross-
      // cultural archetype (jötnar/titans/rakshasas/oni exist across
      // many traditions). Yoruba-coded input is honored on a Giant
      // origin via priority-1 cultural detection.
      const detect = stubDetect('Yoruba-inspired: rhythmic');
      const result = selectRegister('Giant', "Olorun's giant kin", registers, detect);
      expect(result).toMatch(/^Yoruba-inspired/);
    });

    it('Giant alt-branch can land on protected-list registers (cross-cultural archetype)', () => {
      // Regression guard: Giant uses priority-2 weighted (70/30 with
      // broad alt-branch), so the 30% case CAN land on Yoruba/Andean/
      // etc. This is the architectural commitment that cross-cultural
      // archetypes pair freely.
      let sawProtectedListRegister = false;
      for (const indexRoll of [0.0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.75, 0.85, 0.95, 0.99]) {
        randomSpy.mockReturnValueOnce(0.85).mockReturnValueOnce(indexRoll);
        const result = selectRegister('Giant', '', registers, detectNothing);
        if (/^(Yoruba|Andean|Chinese|Japanese)-inspired/.test(result)) {
          sawProtectedListRegister = true;
          break;
        }
      }
      expect(sawProtectedListRegister).toBe(true);
    });

    it('orcGoblinExcludedRegisters is no longer exported (replaced by allow-list architecture)', async () => {
      // Regression guard: the old filter export was removed when the
      // allow-list shipped. A future contributor reintroducing it would
      // be a sign the dual-mechanism architecture has snuck back in.
      const mod = await import('./select-register.mjs');
      expect(mod).not.toHaveProperty('orcGoblinExcludedRegisters');
    });
  });

  describe('Horror-origin allow-list architecture', () => {
    // Horror-coded aesthetic origins (Infernal, Abyssal, Necromantic,
    // Vampiric, Lycanthropic, Aberrant) are restricted to the
    // horrorOriginRegisterPool — European registers with horror-genre
    // precedent (Latin/Norse/Germanic/Slavic/Romanian/Elven) plus
    // the fictional horror-native registers (Abyssal/Infernal/Aberrant).
    // The protection blocks pairings that would impose Western horror
    // conventions onto non-Western cultural registers (Necromantic +
    // Yoruba), engage culturally-protected concepts inappropriately
    // (Lycanthropic + Diné skinwalker), or reproduce Lovecraft Otherness-
    // coding (Aberrant + non-Western register).
    //
    // Selection is uniform-random across the pool (no 70/30 weighting
    // like orc/goblin) because horror origins lack a single "primary
    // register" — Necromantic items can lean Latin/Romanian/Norse/
    // Elven/Abyssal-Infernal-Aberrant and all are valid genre
    // pairings. Spread is the desired behavior.

    const indexRolls = [0.0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.75, 0.85, 0.95, 0.99];

    const isInHorrorPool = (register) =>
      horrorOriginRegisterPool.some(prefix => register.startsWith(prefix));

    // Aberrant / Abyssal / Infernal route through the fictional-origin
    // branch first (matching fictional register 70%, per-origin alt-pool
    // 30%) and never reach the horror branch. Their per-origin alt-
    // pools may include registers outside `horrorOriginRegisterPool`
    // (e.g., Infernal alt-pool includes Greek, which isn't in horror
    // pool but fits classical demonology). This test applies only to
    // the four horror origins WITHOUT a matching fictional register.
    const horrorOnlyOrigins = horrorRestrictedOrigins.filter(
      origin => !['Aberrant', 'Abyssal', 'Infernal'].includes(origin),
    );

    it.each(horrorOnlyOrigins)(
      '%s always returns a register in the horror-origin pool',
      (origin) => {
        for (const indexRoll of indexRolls) {
          randomSpy.mockReturnValueOnce(indexRoll);
          const result = selectRegister(origin, '', registers, detectNothing);
          expect(isInHorrorPool(result)).toBe(true);
        }
      },
    );

    it('Necromantic + cultural detection of in-pool register is honored', () => {
      // Romanian is in the horror pool and Romanian-coded user input
      // (gothic-vampire register) aligns with horror genre. The pool
      // architecture honors user signals that align with the allow-list.
      const detect = stubDetect('Romanian-inspired: Latin-rooted with Slavic influence (e.g., Mihai)');
      const result = selectRegister('Necromantic', "Mihai's grimoire", registers, detect);
      expect(result).toMatch(/^Romanian-inspired/);
    });

    it('Necromantic + cultural detection of out-of-pool register is OVERRIDDEN by pool selection', () => {
      // The architectural protection: even when user signal would
      // resolve to a non-pool register (Yoruba here — Western death-
      // magic imposed on West African register), the pool wins.
      randomSpy.mockReturnValue(0); // pool[0] = Latin-inspired
      const detect = stubDetect('Yoruba-inspired: rhythmic');
      const result = selectRegister('Necromantic', "Olorun's death-mask", registers, detect);
      expect(result).not.toMatch(/^Yoruba-inspired/);
      expect(isInHorrorPool(result)).toBe(true);
    });

    it('Lycanthropic + Lakota cultural detection is OVERRIDDEN', () => {
      // The original protection case for the horror restriction targeted
      // Lycanthropic + Navajo/Diné (the skinwalker tradition is sacred
      // and not appropriate for fictional appropriation). The Navajo/Diné
      // register has since been removed entirely under the same caution,
      // so the literal pairing is no longer reachable. This test now
      // covers the analogous case with another Indigenous-tradition
      // register still in the system — the protection mechanism is
      // register-agnostic.
      randomSpy.mockReturnValue(0);
      const detect = stubDetect('Lakota-inspired: descriptive compounds (e.g., Wakinyan-Tanka)');
      const result = selectRegister('Lycanthropic', 'Wakinyan moon-cursed', registers, detect);
      expect(result).not.toMatch(/^Lakota-inspired/);
      expect(isInHorrorPool(result)).toBe(true);
    });

    it('Aberrant + Japanese cultural detection is OVERRIDDEN (Lovecraft Otherness-coding prevention)', () => {
      // Aberrant + non-Western register reproduces the Lovecraft-
      // tradition pattern of "alien = foreign culture." Pool wins.
      randomSpy.mockReturnValue(0);
      const detect = stubDetect('Japanese-inspired: clean syllables (e.g., Kagezuki)');
      const result = selectRegister('Aberrant', 'Akiko of the wrong-geometries', registers, detect);
      expect(result).not.toMatch(/^Japanese-inspired/);
      expect(isInHorrorPool(result)).toBe(true);
    });

    it('Vampiric + Andean cultural detection is OVERRIDDEN', () => {
      // Vampiric coding pulls from European-folk-vampirism; pairing
      // with Andean register is the kind of cross-tradition imposition
      // the protection exists to prevent.
      randomSpy.mockReturnValue(0);
      const detect = stubDetect('Andean-inspired: structured Quechua (e.g., Inti-Wasi)');
      const result = selectRegister('Vampiric', "Inkari's eternal hunger", registers, detect);
      expect(result).not.toMatch(/^Andean-inspired/);
      expect(isInHorrorPool(result)).toBe(true);
    });

    it('Shadow + Yoruba cultural detection is OVERRIDDEN (Western-occultism imposition)', () => {
      // Shadow joined the horror restriction after production validation
      // showed Shadow-magic register imposing Western occultism on non-
      // Western registers. Yoruba is out-of-pool here; pool wins.
      randomSpy.mockReturnValue(0);
      const detect = stubDetect('Yoruba-inspired: rhythmic');
      const result = selectRegister('Shadow', "Olorun's shadowed gift", registers, detect);
      expect(result).not.toMatch(/^Yoruba-inspired/);
      expect(isInHorrorPool(result)).toBe(true);
    });

    it('Celestial (non-horror aesthetic origin) does NOT fire the horror branch', () => {
      // Regression guard: the horror restriction is scoped to the seven
      // horror-coded origins. Other aesthetic origins still respect
      // priority-1 cultural detection across all registers.
      const detect = stubDetect('Yoruba-inspired: rhythmic');
      const result = selectRegister('Celestial', "Olorun's blessing", registers, detect);
      expect(result).toMatch(/^Yoruba-inspired/);
    });

    it('Fey (non-horror aesthetic origin) does NOT fire the horror branch', () => {
      const detect = stubDetect('Japanese-inspired: clean syllables (e.g., Kagezuki)');
      const result = selectRegister('Fey', 'Akiko of the twilight grove', registers, detect);
      expect(result).toMatch(/^Japanese-inspired/);
    });

    it('horror restriction is checked BEFORE orc/goblin (origin-based wins over keyword-based)', () => {
      // Brief specifies origin-based restrictions are checked before
      // fantasy-race restrictions. With resolvedOrigin=Necromantic and
      // lore mentioning "orcish", the keyword-detected fantasyRace would
      // be 'Orcish' but the horror branch fires first because it gates
      // on resolvedOrigin directly. Result: horror pool, not orc pool.
      randomSpy.mockReturnValue(0);
      const result = selectRegister('Necromantic', 'orcish battleaxe of the death-cult', registers, detectNothing);
      expect(isInHorrorPool(result)).toBe(true);
      // The orc pool contains 'Welsh-inspired' and 'Old-Irish-inspired'
      // which are NOT in the horror pool — verify we didn't slip into
      // the orc branch.
      expect(result).not.toMatch(/^Welsh-inspired/);
      expect(result).not.toMatch(/^Old-Irish-inspired/);
    });

    it('horror restriction is gated on resolvedOrigin only, not on user-input keywords', () => {
      // Brief: "When resolvedOrigin matches one of these six". Keyword
      // detection ("vampire" in lore with origin=null) does not trigger
      // the horror branch. This asymmetry is intentional — words like
      // "vampire"/"necromancer" appear in many fantasy contexts and
      // would over-trigger the restriction.
      const detect = stubDetect('Yoruba-inspired: rhythmic');
      const result = selectRegister(null, 'a vampire necromancer of ancient evil', registers, detect);
      expect(result).toMatch(/^Yoruba-inspired/);
    });

    it('Fantasy-race origin (Giant) does NOT fire the horror branch', () => {
      // Giant is a fantasy race (not a horror-coded origin) and is on
      // the priority-2 weighted branch (cross-cultural archetype).
      // Cultural detection is priority 1 for Giant, honored across
      // all registers. Pre-Task-1 this test used Elven as the
      // cross-cultural example; post-Task-1, Elven is allow-list-
      // restricted and Giant is the canonical cross-cultural-
      // archetype fantasy race.
      const detect = stubDetect('Yoruba-inspired: rhythmic');
      const result = selectRegister('Giant', "Olorun's giant kin", registers, detect);
      expect(result).toMatch(/^Yoruba-inspired/);
    });
  });

  describe('exported maps (regression guards)', () => {
    it('fantasyRaceConventionalRegisters covers exactly the six core races', () => {
      const expected = ['Elven', 'Dwarven', 'Orcish', 'Goblinoid', 'Gnomish', 'Giant'];
      expect(Object.keys(fantasyRaceConventionalRegisters).sort()).toEqual(expected.sort());
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
      expect([...fantasyRaceConventionalRegisters['Orcish']].sort())
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
      expect([...fantasyRaceConventionalRegisters['Goblinoid']].sort())
        .toEqual([...expected].sort());
    });

    it('fantasyRaceKeywords covers exactly the six core races', () => {
      const expected = ['Elven', 'Dwarven', 'Orcish', 'Goblinoid', 'Gnomish', 'Giant'];
      expect(Object.keys(fantasyRaceKeywords).sort()).toEqual(expected.sort());
    });

    it('horrorRestrictedOrigins covers exactly the seven horror-coded aesthetic origins', () => {
      // Shadow joined the horror restriction after production validation
      // surfaced the same cross-cultural-imposition pattern with Shadow-
      // origin items (Western occultism imposed on non-Western registers).
      const expected = ['Infernal', 'Abyssal', 'Necromantic', 'Vampiric', 'Lycanthropic', 'Aberrant', 'Shadow'];
      expect([...horrorRestrictedOrigins].sort()).toEqual([...expected].sort());
    });

    it('horrorOriginRegisterPool contains the expected European + fictional registers', () => {
      // Drift away from this pool — adding a non-Western register,
      // dropping one of the European registers without explicit reason —
      // should fail this test and force a deliberate decision rather
      // than a quiet change.
      const expected = [
        'Latin-inspired',
        'Old-Norse-inspired',
        'Anglo-Saxon-inspired',
        'Old-High-German-inspired',
        'Middle-High-German-inspired',
        'Gothic-inspired',
        'Old-Slavic-inspired',
        'Romanian-inspired',
        'Elven',
        'Abyssal',
        'Infernal',
        'Aberrant',
      ];
      expect([...horrorOriginRegisterPool].sort()).toEqual([...expected].sort());
    });

    it('horror origins do not overlap with fantasy-race origins', () => {
      // Horror-coded protection is origin-coded; race-coded protection
      // is in fantasyRaceConventionalRegisters. The two protection layers
      // are disjoint — overlap would mean a single origin gets routed
      // to both branches, indicating a design conflict.
      const fantasyRaces = Object.keys(fantasyRaceConventionalRegisters);
      for (const horror of horrorRestrictedOrigins) {
        expect(fantasyRaces).not.toContain(horror);
      }
    });

    it('WESTERN_FANTASY_BOUND_RACES is a subset of fantasyRaceConventionalRegisters keys', () => {
      // Every Western-fantasy-bound race must have a defined allow-
      // list. A race in WESTERN_FANTASY_BOUND_RACES without a pool
      // entry would crash the branch.
      const fantasyRaces = Object.keys(fantasyRaceConventionalRegisters);
      for (const race of WESTERN_FANTASY_BOUND_RACES) {
        expect(fantasyRaces).toContain(race);
      }
    });

    it('WESTERN_FANTASY_BOUND_RACES contains exactly the five Western-fantasy-bound races', () => {
      // Locks the membership against silent additions or removals.
      // Adding/removing a race is a deliberate architectural decision
      // and should require updating this test alongside the source.
      // The five members are Orcish, Goblinoid, Dwarven, Gnomish, Elven —
      // the Western-fantasy-bound tier per the architecture doc.
      // Fey and Giant are NOT in this list because their archetype-slot
      // exists in many living mythological traditions (cross-cultural
      // archetypes pair freely with any register).
      expect([...WESTERN_FANTASY_BOUND_RACES].sort()).toEqual(
        ['Dwarven', 'Elven', 'Gnomish', 'Goblinoid', 'Orcish'],
      );
    });
  });

  describe('resolveFantasyRace (helper exported for prompt-side gating)', () => {
    // The same race resolution selectRegister uses internally.
    // ItemGenerator imports this to gate the orc/goblin override-
    // revocation prompt block — that block must fire whenever the
    // register filter would have fired, including the keyword-in-lore
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
      // selectRegister already uses for its 70/30 weighting branch.
      expect(resolveFantasyRace(null, 'elven blade carried by an orcish chieftain'))
        .toBe('Elven');
    });

    it('is case-insensitive on keyword detection', () => {
      expect(resolveFantasyRace(null, 'ORCISH RUNE-CARVED MAUL')).toBe('Orcish');
    });
  });
});
