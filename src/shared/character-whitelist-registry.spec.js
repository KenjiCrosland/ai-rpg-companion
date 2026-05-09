import {
  getCharacterWhitelistForGeneration,
  shouldInjectWhitelist,
  ORIGIN_CHARACTER_WHITELISTS,
  REGISTER_CHARACTER_WHITELISTS,
} from './character-whitelist-registry.mjs';
import {
  fantasyRaceConventionalRegisters,
  WESTERN_FANTASY_BOUND_RACES,
} from '@/shared/select-register.mjs';

describe('character-whitelist-registry', () => {
  describe('getCharacterWhitelistForGeneration — lookup correctness', () => {
    it('routes race origins to their origin-bound pool with the right strictness', () => {
      const cases = [
        ['Orcish',    'Orcish: brutal, guttural',          'mandatory'],
        ['Goblinoid', 'Goblin-inspired: sharp, crude',     'mandatory'],
        ['Elven',     'Sindarin-inspired (elvish): ...',   'preferred'],
        ['Dwarven',   'Old-Norse-inspired: Eddaic',        'preferred'],
      ];
      for (const [origin, register, expectedStrictness] of cases) {
        const result = getCharacterWhitelistForGeneration(origin, register);
        expect(result).not.toBeNull();
        expect(result.strictness).toBe(expectedStrictness);
        expect(Array.isArray(result.pool)).toBe(true);
        expect(result.pool.length).toBeGreaterThan(0);
      }
    });

    it('routes register-bound pools when origin has no entry', () => {
      // Necromantic / Aberrant + a fictional register that matches:
      // origin has no pool entry, register does → register-bound fires.
      const cases = [
        // Necromantic origin + Sindarin register (rolled via horror pool)
        ['Necromantic', 'Sindarin-inspired (elvish): elegant', 'preferred'],
        // Aberrant origin + Aberrant register (the 70% primary)
        ['Aberrant',    'Aberrant: unpronounceable clusters',  'preferred'],
        // Draconic, Abyssal, Infernal, Primordial similarly
        ['Draconic',    'Draconic: harsh sibilants',            'preferred'],
        ['Abyssal',     'Abyssal: guttural, chaotic',           'preferred'],
        ['Infernal',    'Infernal: sharp, aggressive',          'preferred'],
        ['Primordial',  'Primordial: pre-language sounds',      'preferred'],
      ];
      for (const [origin, register, expectedStrictness] of cases) {
        const result = getCharacterWhitelistForGeneration(origin, register);
        expect(result).not.toBeNull();
        expect(result.strictness).toBe(expectedStrictness);
      }
    });

    it('returns null when neither origin nor register has a pool', () => {
      const cases = [
        ['Gnomish',   'Gnomish: clever, playful'],          // Gnomish has no entry
        ['Giant',     'Norse-inspired: harsh consonants'],  // Giant has no entry
        ['Celestial', 'Latin-inspired: formal'],            // aesthetic origin, plain register
        ['Aberrant',  'Latin-inspired: formal'],            // Aberrant origin + alt-pool register (Latin not in REGISTER_CHARACTER_WHITELISTS)
        [null,        null],
        [undefined,   undefined],
        ['',          ''],
        [42,          {}],
      ];
      for (const [origin, register] of cases) {
        expect(getCharacterWhitelistForGeneration(origin, register)).toBeNull();
      }
    });
  });

  describe('origin-bound precedes register-bound', () => {
    it('Elven origin + Sindarin register routes via origin path (not register path)', () => {
      // Both maps would resolve: origin Elven → preferred pool, register
      // Sindarin → preferred pool. Same pool data either way (Sindarin
      // pool is the Elven character pool by user direction). The
      // precedence test pins the routing decision so a future contributor
      // adding a different pool to Elven origin doesn't accidentally
      // get superseded by the register-keyed entry.
      const result = getCharacterWhitelistForGeneration(
        'Elven',
        'Sindarin-inspired (elvish): elegant',
      );
      expect(result).toBe(ORIGIN_CHARACTER_WHITELISTS['Elven']);
      expect(result).not.toBe(REGISTER_CHARACTER_WHITELISTS['Sindarin-inspired']);
    });
  });

  describe('shouldInjectWhitelist — strictness gate', () => {
    it('mandatory always returns true regardless of mathRandom', () => {
      for (const roll of [0, 0.3, 0.5, 0.7, 0.9, 0.99]) {
        expect(shouldInjectWhitelist('mandatory', roll)).toBe(true);
      }
    });

    it('preferred returns true iff mathRandom < 0.7 (strict less-than)', () => {
      expect(shouldInjectWhitelist('preferred', 0)).toBe(true);
      expect(shouldInjectWhitelist('preferred', 0.5)).toBe(true);
      expect(shouldInjectWhitelist('preferred', 0.69999)).toBe(true);
      expect(shouldInjectWhitelist('preferred', 0.7)).toBe(false);  // strict less-than
      expect(shouldInjectWhitelist('preferred', 0.85)).toBe(false);
      expect(shouldInjectWhitelist('preferred', 0.99)).toBe(false);
    });

    it('unknown strictness values return false', () => {
      // Defensive: any non-mandatory / non-preferred value falls through
      // to false. Catches typos in future entries.
      expect(shouldInjectWhitelist(undefined, 0)).toBe(false);
      expect(shouldInjectWhitelist('strict', 0)).toBe(false);
      expect(shouldInjectWhitelist('', 0)).toBe(false);
    });
  });

  describe('migration integrity', () => {
    it('every Western-fantasy-bound race either has a pool entry or is documented as freehand', () => {
      // Five Western-fantasy-bound races: Orcish, Goblinoid, Dwarven,
      // Gnomish, Elven. Pool entries exist for Orcish/Goblinoid/Dwarven/
      // Elven. Gnomish is deliberately freehand (per user direction).
      // This pins which races have pools so a future contributor adding
      // a sixth Western-fantasy-bound race can't silently miss the pool
      // wiring.
      const expectFreehand = new Set(['Gnomish']);
      for (const race of WESTERN_FANTASY_BOUND_RACES) {
        const hasEntry = !!ORIGIN_CHARACTER_WHITELISTS[race];
        if (expectFreehand.has(race)) {
          expect(hasEntry).toBe(false);
        } else {
          expect(hasEntry).toBe(true);
        }
      }
    });

    it('every ORIGIN_CHARACTER_WHITELISTS key is a valid origin in fantasyRaceConventionalRegisters', () => {
      // Catches typos in the origin map (an entry keyed on a non-
      // existent origin would be unreachable).
      const validOrigins = Object.keys(fantasyRaceConventionalRegisters);
      for (const origin of Object.keys(ORIGIN_CHARACTER_WHITELISTS)) {
        expect(validOrigins).toContain(origin);
      }
    });

    it('every entry has shape { pool: non-empty array, strictness: mandatory | preferred }', () => {
      // Shape integrity: a malformed entry would break either the
      // lookup (no pool) or the gate (unknown strictness). Catches
      // copy-paste errors when adding new entries.
      const entries = [
        ...Object.values(ORIGIN_CHARACTER_WHITELISTS),
        ...Object.values(REGISTER_CHARACTER_WHITELISTS),
      ];
      for (const entry of entries) {
        expect(Array.isArray(entry.pool)).toBe(true);
        expect(entry.pool.length).toBeGreaterThan(0);
        expect(['mandatory', 'preferred']).toContain(entry.strictness);
      }
    });
  });
});
