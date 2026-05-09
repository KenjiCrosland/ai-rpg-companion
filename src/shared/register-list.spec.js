import {
  allLanguageRegisters,
  registerList,
  enableProtectedRegisters,
  PROTECTED_REGISTER_PREFIXES,
} from './register-list.mjs';

describe('language-registers — protected-register feature flag', () => {
  describe('enableProtectedRegisters', () => {
    it('defaults to false', () => {
      // Production ships with protected registers off until the
      // protection machinery is robust enough to revisit. Flipping to
      // true is a deliberate decision and should require updating
      // this test alongside the source.
      expect(enableProtectedRegisters).toBe(false);
    });
  });

  describe('PROTECTED_REGISTER_PREFIXES', () => {
    it('is a non-empty array', () => {
      expect(Array.isArray(PROTECTED_REGISTER_PREFIXES)).toBe(true);
      expect(PROTECTED_REGISTER_PREFIXES.length).toBeGreaterThan(0);
    });

    it('includes representative non-Western registers', () => {
      // Spot-check the categories the flag is meant to gate. Drift
      // (a contributor silently dropping one) should fail this test.
      const expected = [
        'Japanese-inspired',
        'Chinese-inspired',
        'Korean-inspired',
        'Hindi/Sanskrit-inspired',
        'Arabic/Persian-inspired',
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
      // sacred-coding risk and remain available with the flag off.
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
        'Sindarin-inspired',
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

  describe('allLanguageRegisters', () => {
    it('contains every protected-register entry regardless of flag', () => {
      // The full list is the source of truth for re-enabling. Tests,
      // protection-machinery validators, and dev tooling all depend on
      // it staying complete even when the flag is off.
      for (const prefix of PROTECTED_REGISTER_PREFIXES) {
        const match = allLanguageRegisters.find(p => p.startsWith(prefix));
        expect(match).toBeDefined();
      }
    });

    it('contains representative Western/fictional registers', () => {
      const expected = [
        'Latin-inspired',
        'Old-Norse-inspired',
        'Sindarin-inspired',
        'Orcish',
      ];
      for (const prefix of expected) {
        const match = allLanguageRegisters.find(p => p.startsWith(prefix));
        expect(match).toBeDefined();
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

    it('keeps every Western-canonical register when the flag is off', () => {
      // The Western set is the active register pool with the flag off.
      // Drift here would shrink the user-visible register pool.
      const westernCanonical = [
        'Latin-inspired',
        'Italian-Renaissance-inspired',
        'Greek-inspired',
        'Slavic-inspired',
        'Old-Slavic-inspired',
        'Russian-inspired',
        'Romanian-inspired',
        'Hungarian-inspired',
        'Finnish-inspired',
        'Norse-inspired',
        'Old-Norse-inspired',
        'Gothic-inspired',
        'Anglo-Saxon-inspired',
        'Germanic-inspired',
        'Old-High-German-inspired',
        'Middle-High-German-inspired',
        'Celtic-inspired',
        'Welsh-inspired',
        'Middle-Welsh-inspired',
        'Irish-inspired',
        'Old-Irish-inspired',
        'Old-Occitan-inspired',
      ];
      for (const prefix of westernCanonical) {
        const match = registerList.find(p => p.startsWith(prefix));
        expect(match).toBeDefined();
      }
    });

    it('keeps every fictional-fantasy register when the flag is off', () => {
      const fictional = [
        'Sindarin-inspired',
        'Draconic',
        'Goblin-inspired',
        'Orcish',
        'Gnomish',
        'Aberrant',
        'Abyssal',
        'Infernal',
        'Primordial',
        'Technomagical',
      ];
      for (const prefix of fictional) {
        const match = registerList.find(p => p.startsWith(prefix));
        expect(match).toBeDefined();
      }
    });

    it('is shorter than allLanguageRegisters when the flag is off', () => {
      // Sanity check the filter actually fires. If they're equal, the
      // filter has been silently disabled (e.g., via a buggy edit to
      // PROTECTED_REGISTER_PREFIXES).
      expect(registerList.length).toBeLessThan(allLanguageRegisters.length);
      expect(allLanguageRegisters.length - registerList.length)
        .toBe(PROTECTED_REGISTER_PREFIXES.length);
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
  });
});
