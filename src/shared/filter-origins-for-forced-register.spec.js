import { filterOriginsForForcedRegister } from './filter-origins-for-forced-register.mjs';

// Representative full-form register descriptors (.startsWith matching is
// what the helper actually runs, so we use realistic strings here).
const MAORI = 'Maori-inspired: vowel-rich Te Reo phonetics, nature-grounded';
const YORUBA = 'Yoruba-inspired: rhythmic with diacriticals';
const ANDEAN = 'Andean-inspired: structured Quechua flavor';
const LATIN = 'Latin-inspired: formal, structured (e.g., Aurelium)';
const OLD_NORSE = 'Old-Norse-inspired: Eddaic register (e.g., Sigrún)';
const SINDARIN = 'Sindarin-inspired (elvish): elegant, vowel-rich';
const GOBLIN_INSPIRED = 'Goblin-inspired: sharp, crude, percussive';
const ORCISH = 'Orcish: brutal, guttural';
const ROMANIAN = 'Romanian-inspired: Latin-rooted with Slavic influence';
const ABYSSAL = 'Abyssal: guttural, chaotic';
const INFERNAL = 'Infernal: sharp, aggressive';

// Full-canon eligible-origins pool — all six fantasy races plus all
// seven horror-coded origins plus a handful of unrestricted aesthetic
// origins. Tests assert which subset survives filtering for various
// forced registers.
const ALL_ELIGIBLE = [
  'Orcish', 'Goblinoid', 'Gnomish', 'Elven', 'Dwarven', 'Giant',
  'Infernal', 'Abyssal', 'Necromantic', 'Vampiric', 'Lycanthropic', 'Aberrant', 'Shadow',
  'Fey', 'Celestial', 'Wizardry', 'Alchemical', 'Verdant', 'Astral',
];

const HORROR_ORIGINS = ['Infernal', 'Abyssal', 'Necromantic', 'Vampiric', 'Lycanthropic', 'Aberrant', 'Shadow'];

describe('filterOriginsForForcedRegister', () => {
  describe('falsy / non-string forcedRegister returns input unchanged', () => {
    it('returns input when forcedRegister is empty string', () => {
      expect(filterOriginsForForcedRegister(ALL_ELIGIBLE, '')).toEqual(ALL_ELIGIBLE);
    });

    it('returns input when forcedRegister is null', () => {
      expect(filterOriginsForForcedRegister(ALL_ELIGIBLE, null)).toEqual(ALL_ELIGIBLE);
    });

    it('returns input when forcedRegister is undefined', () => {
      expect(filterOriginsForForcedRegister(ALL_ELIGIBLE, undefined)).toEqual(ALL_ELIGIBLE);
    });

    it('returns input when forcedRegister is a non-string (defensive)', () => {
      expect(filterOriginsForForcedRegister(ALL_ELIGIBLE, 42)).toEqual(ALL_ELIGIBLE);
    });
  });

  describe('Maori (catchall register, NOT in any restriction pool)', () => {
    // Maori was the production-failure motivating case: dev forced
    // Maori, blank-canvas random origin selector picked Goblinoid (or
    // a horror origin), then the prompt builder ran with both — but
    // the orc/goblin allow-list rejected Maori, so the dev saw the
    // override silently overridden. The filter excludes any origin
    // that would force such a conflict.
    const filtered = filterOriginsForForcedRegister(ALL_ELIGIBLE, MAORI);

    it('excludes Orcish (Maori not in Orcish allow-list pool)', () => {
      expect(filtered).not.toContain('Orcish');
    });

    it('excludes Goblinoid (Maori not in Goblinoid allow-list pool)', () => {
      expect(filtered).not.toContain('Goblinoid');
    });

    it('excludes ALL horror-coded origins (Maori not in horror pool)', () => {
      for (const horrorOrigin of HORROR_ORIGINS) {
        expect(filtered).not.toContain(horrorOrigin);
      }
    });

    it('excludes Dwarven, Gnomish, Elven (all Western-fantasy-bound, none have Maori in pool)', () => {
      // Post-Task-1, the five Western-fantasy-bound races (Orcish/
      // Goblinoid/Dwarven/Gnomish/Elven) are all allow-list-restricted
      // and none of their conventional allow-lists contain Maori.
      // Picking any of them would force the allow-list to override
      // the Maori override.
      expect(filtered).not.toContain('Dwarven');
      expect(filtered).not.toContain('Gnomish');
      expect(filtered).not.toContain('Elven');
    });

    it('keeps Giant (cross-cultural archetype, not in WESTERN_FANTASY_BOUND_RACES)', () => {
      // Giant pairs freely with any register per the cross-cultural-
      // archetype tier (jötnar/titans/rakshasas/oni exist across many
      // traditions). Maori-on-Giant is architecturally permitted.
      expect(filtered).toContain('Giant');
    });

    it('keeps non-restricted aesthetic origins (Fey, Celestial, Wizardry, etc.)', () => {
      expect(filtered).toContain('Fey');
      expect(filtered).toContain('Celestial');
      expect(filtered).toContain('Wizardry');
      expect(filtered).toContain('Alchemical');
      expect(filtered).toContain('Verdant');
      expect(filtered).toContain('Astral');
    });
  });

  describe('Yoruba and Andean (pool registers, NOT in any restriction pool)', () => {
    // Same protection profile as Maori — neither pool register is in
    // orc/goblin or horror pools. The filter must apply the same
    // exclusions so dev-forced Yoruba/Andean produces clean test output.

    it('Yoruba excludes Orcish, Goblinoid, and all horror origins', () => {
      const filtered = filterOriginsForForcedRegister(ALL_ELIGIBLE, YORUBA);
      expect(filtered).not.toContain('Orcish');
      expect(filtered).not.toContain('Goblinoid');
      for (const horrorOrigin of HORROR_ORIGINS) {
        expect(filtered).not.toContain(horrorOrigin);
      }
    });

    it('Andean excludes Orcish, Goblinoid, and all horror origins', () => {
      const filtered = filterOriginsForForcedRegister(ALL_ELIGIBLE, ANDEAN);
      expect(filtered).not.toContain('Orcish');
      expect(filtered).not.toContain('Goblinoid');
      for (const horrorOrigin of HORROR_ORIGINS) {
        expect(filtered).not.toContain(horrorOrigin);
      }
    });
  });

  describe('Latin (in Orcish + horror pools, NOT in Goblinoid pool)', () => {
    // Per fantasyRaceConventionalRegisters: Orcish pool includes Latin,
    // Goblinoid pool does NOT include Latin.
    // Per horrorOriginRegisterPool: Latin is included.
    // Filter should keep Orcish, drop Goblinoid, keep horror origins.
    const filtered = filterOriginsForForcedRegister(ALL_ELIGIBLE, LATIN);

    it('keeps Orcish (Latin IS in Orcish allow-list pool)', () => {
      expect(filtered).toContain('Orcish');
    });

    it('excludes Goblinoid (Latin NOT in Goblinoid allow-list pool)', () => {
      expect(filtered).not.toContain('Goblinoid');
    });

    it('keeps all horror-coded origins (Latin IS in horror pool)', () => {
      for (const horrorOrigin of HORROR_ORIGINS) {
        expect(filtered).toContain(horrorOrigin);
      }
    });
  });

  describe('Old-Norse-inspired (in Orcish + Goblinoid + Dwarven + horror pools, NOT in Gnomish/Elven/Giant pools)', () => {
    // Old-Norse-inspired is the Eddaic-archaic register. It IS in the
    // Orcish, Goblinoid, and Dwarven pools, plus the horror pool. It
    // is NOT in the Gnomish pool (Gnomish = Greek/Anglo-Saxon/Italian-
    // Renaissance + the Gnomish fictional register), the Elven pool
    // (Sindarin/Welsh/Old-Irish/Occitan/Latin), or the Giant pool
    // (which references modern 'Norse-inspired', a separate descriptor).
    const filtered = filterOriginsForForcedRegister(ALL_ELIGIBLE, OLD_NORSE);

    it('keeps Orcish, Goblinoid, Dwarven, and all horror origins', () => {
      expect(filtered).toContain('Orcish');
      expect(filtered).toContain('Goblinoid');
      expect(filtered).toContain('Dwarven');
      for (const horrorOrigin of HORROR_ORIGINS) {
        expect(filtered).toContain(horrorOrigin);
      }
    });

    it('excludes Gnomish and Elven (Old-Norse not in their pools)', () => {
      expect(filtered).not.toContain('Gnomish');
      expect(filtered).not.toContain('Elven');
    });

    it('keeps Giant (cross-cultural archetype, not in WESTERN_FANTASY_BOUND_RACES)', () => {
      expect(filtered).toContain('Giant');
    });
  });

  describe('Anglo-Saxon-inspired (in 4 of 5 Western-fantasy-bound race allow-lists — NOT in Elven)', () => {
    // Anglo-Saxon-inspired is in the Orcish, Goblinoid, Dwarven, and
    // Gnomish allow-lists, plus the horror pool. The Elven allow-list
    // is Sindarin/Welsh/Old-Irish/Occitan/Latin — no Anglo-Saxon.
    // After the Western-fantasy-bound promotion, no single register is
    // in all five race allow-lists (the intersection is empty), so
    // "returns full input" is unreachable for any forced register.
    const ANGLO_SAXON = 'Anglo-Saxon-inspired: Old English compounds (e.g., Wulfstan)';
    const filtered = filterOriginsForForcedRegister(ALL_ELIGIBLE, ANGLO_SAXON);

    it('keeps Orcish, Goblinoid, Dwarven, Gnomish, and all horror origins', () => {
      expect(filtered).toContain('Orcish');
      expect(filtered).toContain('Goblinoid');
      expect(filtered).toContain('Dwarven');
      expect(filtered).toContain('Gnomish');
      for (const horrorOrigin of HORROR_ORIGINS) {
        expect(filtered).toContain(horrorOrigin);
      }
    });

    it('keeps Giant (cross-cultural archetype, not filtered)', () => {
      expect(filtered).toContain('Giant');
    });

    it('excludes Elven (Anglo-Saxon not in Elven pool)', () => {
      expect(filtered).not.toContain('Elven');
    });
  });

  describe('Sindarin (in horror pool only, NOT in orc/goblin pools)', () => {
    // Sindarin is in the horror pool (high-elven necromancers exist as
    // a recognized subgenre) but isn't in either orc or goblin pool.
    const filtered = filterOriginsForForcedRegister(ALL_ELIGIBLE, SINDARIN);

    it('excludes Orcish and Goblinoid', () => {
      expect(filtered).not.toContain('Orcish');
      expect(filtered).not.toContain('Goblinoid');
    });

    it('keeps all horror-coded origins (Sindarin IS in horror pool)', () => {
      for (const horrorOrigin of HORROR_ORIGINS) {
        expect(filtered).toContain(horrorOrigin);
      }
    });
  });

  describe('Goblin-inspired (in Goblinoid pool only — primary fictional register)', () => {
    // Goblin-inspired is the Goblinoid pool's primary register. It is
    // NOT in the Orcish pool (Orcish has its own primary 'Orcish'
    // fictional register and the European registers as alternates;
    // 'Goblin-inspired' isn't among them). Not in horror pool.
    const filtered = filterOriginsForForcedRegister(ALL_ELIGIBLE, GOBLIN_INSPIRED);

    it('keeps Goblinoid (Goblin-inspired IS in Goblinoid allow-list)', () => {
      expect(filtered).toContain('Goblinoid');
    });

    it('excludes Orcish (Goblin-inspired NOT in Orcish allow-list)', () => {
      expect(filtered).not.toContain('Orcish');
    });

    it('excludes ALL horror-coded origins (Goblin-inspired NOT in horror pool)', () => {
      for (const horrorOrigin of HORROR_ORIGINS) {
        expect(filtered).not.toContain(horrorOrigin);
      }
    });
  });

  describe('Orcish (in Orcish pool only — primary fictional register)', () => {
    // Orcish-the-register is the primary register for Orcish-the-origin.
    // Not in Goblinoid pool, not in horror pool.
    const filtered = filterOriginsForForcedRegister(ALL_ELIGIBLE, ORCISH);

    it('keeps Orcish origin', () => {
      expect(filtered).toContain('Orcish');
    });

    it('excludes Goblinoid (Orcish-register NOT in Goblinoid allow-list)', () => {
      expect(filtered).not.toContain('Goblinoid');
    });

    it('excludes ALL horror-coded origins', () => {
      for (const horrorOrigin of HORROR_ORIGINS) {
        expect(filtered).not.toContain(horrorOrigin);
      }
    });
  });

  describe('Romanian (in horror pool only)', () => {
    // Romanian is exclusively a horror-pool member (gothic-vampire
    // tradition). Not in orc/goblin pools.
    const filtered = filterOriginsForForcedRegister(ALL_ELIGIBLE, ROMANIAN);

    it('excludes Orcish and Goblinoid, keeps all horror origins', () => {
      expect(filtered).not.toContain('Orcish');
      expect(filtered).not.toContain('Goblinoid');
      for (const horrorOrigin of HORROR_ORIGINS) {
        expect(filtered).toContain(horrorOrigin);
      }
    });
  });

  describe('Abyssal-the-register (in horror pool, NOT in orc/goblin)', () => {
    // The fictional Abyssal register IS in the horror pool — horror
    // origins can use the Abyssal linguistic register.
    const filtered = filterOriginsForForcedRegister(ALL_ELIGIBLE, ABYSSAL);

    it('keeps all horror-coded origins (Abyssal IS in horror pool)', () => {
      for (const horrorOrigin of HORROR_ORIGINS) {
        expect(filtered).toContain(horrorOrigin);
      }
    });

    it('excludes Orcish and Goblinoid', () => {
      expect(filtered).not.toContain('Orcish');
      expect(filtered).not.toContain('Goblinoid');
    });
  });

  describe('Infernal-the-register (in horror pool)', () => {
    const filtered = filterOriginsForForcedRegister(ALL_ELIGIBLE, INFERNAL);

    it('keeps all horror-coded origins', () => {
      for (const horrorOrigin of HORROR_ORIGINS) {
        expect(filtered).toContain(horrorOrigin);
      }
    });
  });

  describe('non-mutation invariant', () => {
    it('does not mutate the input array', () => {
      const input = [...ALL_ELIGIBLE];
      filterOriginsForForcedRegister(input, MAORI);
      expect(input).toEqual(ALL_ELIGIBLE);
    });
  });

  describe('regression: production-failure scenarios that motivated the filter', () => {
    it('Maori + blank-canvas pool never produces Goblinoid (Tapestry of the Still Pool case)', () => {
      // The reported failure: forced Maori, blank-canvas random origin
      // picked Goblinoid, prompt rendered "Goblinoid item with Maori-
      // inspired naming" plus catchall Maori whitelist. Under the
      // filter, Goblinoid is excluded from the random pool — the bad
      // combination is structurally impossible.
      const filtered = filterOriginsForForcedRegister(ALL_ELIGIBLE, MAORI);
      expect(filtered).not.toContain('Goblinoid');
    });

    it('Maori + blank-canvas pool never produces Abyssal (Greaves of the Lost Raid pattern)', () => {
      // Earlier reported failure: forced Maori + blank-canvas random
      // origin picked Abyssal, prompt rendered "Abyssal item with
      // Maori-inspired naming" — exactly the cross-cultural Western-
      // horror imposition the horror-coded protection exists to
      // prevent.
      const filtered = filterOriginsForForcedRegister(ALL_ELIGIBLE, MAORI);
      expect(filtered).not.toContain('Abyssal');
    });

    it('Maori + blank-canvas pool never produces any restricted origin', () => {
      // Spelled out in full so a future refactor that drops one of
      // the restriction layers gets an explicit failure here, not a
      // silent regression. Western-fantasy-bound races + horror-coded
      // origins.
      const filtered = filterOriginsForForcedRegister(ALL_ELIGIBLE, MAORI);
      const restricted = [
        'Orcish', 'Goblinoid', 'Dwarven', 'Gnomish', 'Elven',
        ...HORROR_ORIGINS,
      ];
      for (const origin of restricted) {
        expect(filtered).not.toContain(origin);
      }
    });

    it('Maori + blank-canvas pool DOES produce Giant (cross-cultural archetype)', () => {
      // Giant is NOT restricted under the Western-fantasy-bound tier —
      // its archetype-slot exists in many living mythological traditions
      // (jötnar/titans/rakshasas/oni). Maori-on-Giant is permitted.
      // Explicit assertion so a future refactor that incorrectly adds
      // Giant back to WESTERN_FANTASY_BOUND_RACES gets an explicit failure here.
      const filtered = filterOriginsForForcedRegister(ALL_ELIGIBLE, MAORI);
      expect(filtered).toContain('Giant');
    });

    it('Maori + blank-canvas pool never produces Shadow (post-promotion regression guard)', () => {
      // Shadow joined horrorRestrictedOrigins after production validation
      // showed Shadow-magic register imposing Western occultism on non-
      // Western registers. Explicit assertion so a future refactor that
      // drops Shadow from the horror list gets an explicit failure.
      const filtered = filterOriginsForForcedRegister(ALL_ELIGIBLE, MAORI);
      expect(filtered).not.toContain('Shadow');
    });

    it('Maori + blank-canvas pool never produces Elven (Western-fantasy-bound regression guard)', () => {
      // Elven joined WESTERN_FANTASY_BOUND_RACES under the Western-fantasy-bound
      // tier (Task 1). Explicit assertion so a future refactor that
      // drops Elven from WESTERN_FANTASY_BOUND_RACES gets an explicit failure here.
      const filtered = filterOriginsForForcedRegister(ALL_ELIGIBLE, MAORI);
      expect(filtered).not.toContain('Elven');
    });
  });
});
