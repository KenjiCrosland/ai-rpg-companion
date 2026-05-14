import {
  allLanguageRegisters,
  registerList,
  enableProtectedRegisters,
  PROTECTED_REGISTER_PREFIXES,
  THEMATIC_REGISTER_PREFIXES,
  humanoidRegisterList,
} from './register-list.mjs';

describe('register-list — protected-register feature flag', () => {
  describe('enableProtectedRegisters', () => {
    it('defaults to false in production (protective filter engaged)', () => {
      // Production ships with the flag off — protected registers
      // (Maori, Yoruba, Andean, Arabic, Japanese, Chinese, Lakota,
      // etc.) are filtered out of `registerList` until the protection
      // machinery is fully validated per register. Arabic was the
      // pilot under the flag-on state; turned off again after
      // production review surfaced remaining failure modes. Flipping
      // back to true is a deliberate decision and should require
      // updating this test alongside the source.
      expect(enableProtectedRegisters).toBe(false);
    });
  });

  describe('PROTECTED_REGISTER_PREFIXES — protective-architecture membership', () => {
    it('includes representative non-Western registers', () => {
      // Spot-check the categories the flag is meant to gate. Drift
      // (a contributor silently dropping one) would re-enable the
      // protected register in production.
      const expected = [
        'Japanese-inspired',
        'Chinese-inspired',
        'Korean-inspired',
        'Hindi/Sanskrit-inspired',
        'Arabic-inspired',
        'Atlas-Berber-inspired',
        'Yoruba-inspired',
        'Akan-inspired',
        'Igbo-inspired',
        'Swahili-inspired',
        'Maori-inspired',
        'Hawaiian-inspired',
        'Maya-inspired',
        'Aztec/Nahuatl-inspired',
        'Andean-inspired',
        'Lakota-inspired',
        'Caucasian-inspired',
      ];
      for (const prefix of expected) {
        expect(PROTECTED_REGISTER_PREFIXES).toContain(prefix);
      }
    });

    it('does NOT include Western-canonical registers', () => {
      // Western-canonical registers don't carry the same appropriation/
      // sacred-coding risk and remain available with the flag off. A
      // Western entry slipping into the protected list would gate it
      // out of production.
      const westernCanonical = [
        'Latin-inspired',
        'Greek-inspired',
        'Old-Norse-inspired',
        'Norse-inspired',
        'Anglo-Saxon-inspired',
        'Germanic-inspired',
        'Celtic-inspired',
        'Welsh-inspired',
        'Old-Irish-inspired',
        'Slavic-inspired',
        'Russian-inspired',
        'Romanian-inspired',
        'Hungarian-inspired',
        'Finnish-inspired',
        'Italian-Renaissance-inspired',
        'Old-Occitan-inspired',
      ];
      for (const prefix of westernCanonical) {
        expect(PROTECTED_REGISTER_PREFIXES).not.toContain(prefix);
      }
    });

    it('does NOT include fictional fantasy registers', () => {
      // Fictional registers have no real-world referents — no risk to
      // gate.
      const fictionalFantasy = [
        'Elven',
        'Orcish',
        'Goblin-inspired',
        'Gnomish',
        'Draconic',
        'Aberrant',
        'Abyssal',
        'Infernal',
        'Primordial',
        'Technomagical',
      ];
      for (const prefix of fictionalFantasy) {
        expect(PROTECTED_REGISTER_PREFIXES).not.toContain(prefix);
      }
    });
  });

  describe('registerList (consumer-facing, flag-gated)', () => {
    it('omits every protected register when the flag is off (default)', () => {
      // This is the user-visible production behavior. With the flag
      // off, no protected register can be selected, detected from user
      // input, or rolled into a generation.
      for (const prefix of PROTECTED_REGISTER_PREFIXES) {
        const leak = registerList.find(p => p.startsWith(prefix));
        expect(leak).toBeUndefined();
      }
    });

    it('keeps every non-protected register (Western-canonical + fictional + ancient-Mediterranean)', () => {
      // Drift here would shrink the user-visible pool (registers
      // silently disappearing from selection).
      const nonProtected = [
        // Western-canonical
        'Latin-inspired', 'Italian-Renaissance-inspired', 'Greek-inspired',
        'Slavic-inspired', 'Old-Slavic-inspired', 'Russian-inspired',
        'Romanian-inspired', 'Hungarian-inspired', 'Finnish-inspired',
        'Norse-inspired', 'Old-Norse-inspired', 'Gothic-inspired',
        'Anglo-Saxon-inspired', 'Germanic-inspired', 'Old-High-German-inspired',
        'Middle-High-German-inspired', 'Celtic-inspired', 'Welsh-inspired',
        'Middle-Welsh-inspired', 'Irish-inspired', 'Old-Irish-inspired',
        'Old-Occitan-inspired',
        // Ancient extinct-tradition (non-protected — no living
        // community standing). Mediterranean entries plus Tocharian
        // (Tarim Basin Buddhist oasis culture, non-Mediterranean).
        'Mesopotamian-inspired', 'Phoenician-Punic-inspired',
        'Egyptian-inspired', 'Etruscan-inspired', 'Tocharian-inspired',
        // Fictional fantasy
        'Elven', 'Draconic', 'Goblin-inspired', 'Orcish',
        'Gnomish', 'Aberrant', 'Abyssal', 'Infernal', 'Primordial',
        'Technomagical',
      ];
      for (const prefix of nonProtected) {
        const match = registerList.find(p => p.startsWith(prefix));
        expect(match).toBeDefined();
      }
    });

    it('is shorter than allLanguageRegisters by exactly the protected count when the flag is off', () => {
      // Sanity check the filter actually fires. If they're equal, the
      // filter has been silently disabled (e.g., via a buggy edit to
      // PROTECTED_REGISTER_PREFIXES).
      expect(registerList.length).toBeLessThan(allLanguageRegisters.length);
      expect(allLanguageRegisters.length - registerList.length)
        .toBe(PROTECTED_REGISTER_PREFIXES.length);
    });
  });

  describe('THEMATIC_REGISTER_PREFIXES — cosmic-genre categorization', () => {
    it('includes only the four thematic registers', () => {
      // The set is intentionally narrow: only registers that DeepSeek
      // commits to as a cosmic-genre rather than treating as just
      // linguistic flavor. Adding an entry expands the pool of
      // registers excluded from FANTASY_UNSPECIFIED routing.
      expect(THEMATIC_REGISTER_PREFIXES).toEqual([
        'Aberrant', 'Abyssal', 'Infernal', 'Primordial',
      ]);
    });

    it('does NOT include Draconic (humanoid — dragonborn-coded)', () => {
      // DeepSeek reads Draconic as dragonborn-style naming, not as a
      // cosmic-genre commitment. Keeping it humanoid means tavern
      // patron generations can land on Szarthrax-style names without
      // turning into dragons-as-cosmic-horror outputs.
      expect(THEMATIC_REGISTER_PREFIXES).not.toContain('Draconic');
    });

    it('does NOT include any humanoid-fantasy or real-cultural register', () => {
      const humanoidExpected = [
        'Elven', 'Goblin-inspired', 'Orcish', 'Gnomish', 'Draconic',
        'Technomagical',
        'Latin-inspired', 'Greek-inspired', 'Hungarian-inspired',
        'Welsh-inspired', 'Old-Norse-inspired', 'Anglo-Saxon-inspired',
      ];
      for (const prefix of humanoidExpected) {
        expect(THEMATIC_REGISTER_PREFIXES).not.toContain(prefix);
      }
    });
  });

  describe('humanoidRegisterList — FANTASY_UNSPECIFIED routing pool', () => {
    it('omits every thematic register', () => {
      for (const prefix of THEMATIC_REGISTER_PREFIXES) {
        const leak = humanoidRegisterList.find(p => p.startsWith(prefix));
        expect(leak).toBeUndefined();
      }
    });

    it('keeps every humanoid-fantasy and Western-canonical register', () => {
      // Spot-check the pool covers the full range FANTASY_UNSPECIFIED
      // generations should be able to land on.
      const expected = [
        // humanoid fantasy
        'Elven', 'Goblin-inspired', 'Orcish', 'Gnomish', 'Draconic',
        // Western-canonical (real-cultural, humanoid)
        'Latin-inspired', 'Greek-inspired', 'Hungarian-inspired',
        'Welsh-inspired', 'Old-Norse-inspired', 'Anglo-Saxon-inspired',
        'Old-High-German-inspired', 'Celtic-inspired',
      ];
      for (const prefix of expected) {
        const match = humanoidRegisterList.find(p => p.startsWith(prefix));
        expect(match).toBeDefined();
      }
    });

    it('is shorter than registerList by exactly the thematic count', () => {
      // Drift guard: silently emptying THEMATIC_REGISTER_PREFIXES would
      // make humanoidRegisterList === registerList and defeat the
      // genre-displacement protection.
      expect(humanoidRegisterList.length).toBeLessThan(registerList.length);
      expect(registerList.length - humanoidRegisterList.length)
        .toBe(THEMATIC_REGISTER_PREFIXES.length);
    });

    it('inherits the protected-register filter from registerList', () => {
      // With enableProtectedRegisters off, no protected register
      // should appear in the humanoid pool — derivation through
      // registerList ensures the protected filter still applies.
      for (const prefix of PROTECTED_REGISTER_PREFIXES) {
        const leak = humanoidRegisterList.find(p => p.startsWith(prefix));
        expect(leak).toBeUndefined();
      }
    });
  });

  describe('integrity guards (regardless of flag)', () => {
    it('every PROTECTED_REGISTER_PREFIXES entry resolves to an allLanguageRegisters entry', () => {
      // A protected prefix that doesn't correspond to a real register
      // is a typo — it would silently fail to filter anything.
      for (const prefix of PROTECTED_REGISTER_PREFIXES) {
        const match = allLanguageRegisters.find(p => p.startsWith(prefix));
        expect(match).toBeDefined();
      }
    });

    it('allLanguageRegisters entries each have a unique prefix', () => {
      // Duplicate prefixes would make startsWith lookups
      // non-deterministic.
      const prefixes = allLanguageRegisters.map(p => p.split(':')[0]);
      expect(new Set(prefixes).size).toBe(prefixes.length);
    });

    it('every THEMATIC_REGISTER_PREFIXES entry resolves to a registerList entry', () => {
      // A thematic prefix that doesn't correspond to a real active
      // register is a typo — it would silently fail to filter anything
      // out of humanoidRegisterList.
      for (const prefix of THEMATIC_REGISTER_PREFIXES) {
        const match = registerList.find(p => p.startsWith(prefix));
        expect(match).toBeDefined();
      }
    });
  });
});
