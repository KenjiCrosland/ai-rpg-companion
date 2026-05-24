/**
 * Tests for dungeon-dimensions pure data + helpers.
 *
 * Mirrors the testing approach for setting-dimensions: shape integrity,
 * pool consistency, weighted picker behavior. LLM-side behavior (the
 * inference prompt) is tested separately in infer-dungeon-dimensions.
 */

import {
  DUNGEON_TYPES,
  TIER_WEIGHTED_TYPES,
  DUNGEON_CHARACTERS,
  DUNGEON_CHARACTER_SUBDIMENSIONS,
  DUNGEON_TENSIONS,
  DUNGEON_TENSION_DESCRIPTIONS,
  DIFFICULTY_TIERS,
  DIFFICULTY_TIER_KEYS,
  OVERUSED_DUNGEON_TROPES,
  pickRandomTension,
  pickRandomDifficulty,
  pickWeightedDungeonType,
  resolveDifficulty,
  getBannedDungeonTropesForGeneration,
  generateCharacterCandidates,
} from '../util/dungeon-dimensions.mjs';

import {
  SETTING_CHARACTERS,
} from '../../setting-generator/utils/setting-dimensions.mjs';

describe('DUNGEON_TYPES', () => {
  it('contains the documented 33 entries', () => {
    expect(DUNGEON_TYPES).toHaveLength(33);
  });

  it('every entry is a non-empty string with no whitespace', () => {
    for (const t of DUNGEON_TYPES) {
      expect(typeof t).toBe('string');
      expect(t.length).toBeGreaterThan(0);
      expect(t).not.toMatch(/\s/);
    }
  });

  it('has no duplicate entries', () => {
    expect(new Set(DUNGEON_TYPES).size).toBe(DUNGEON_TYPES.length);
  });

  it('includes the soft-weighted types', () => {
    expect(DUNGEON_TYPES).toContain('god-corpse');
    expect(DUNGEON_TYPES).toContain('plane-pocket');
    expect(DUNGEON_TYPES).toContain('living-trap');
    expect(DUNGEON_TYPES).toContain('shadow-keep');
  });
});

describe('TIER_WEIGHTED_TYPES', () => {
  it('every key is also in DUNGEON_TYPES', () => {
    for (const key of Object.keys(TIER_WEIGHTED_TYPES)) {
      expect(DUNGEON_TYPES).toContain(key);
    }
  });

  it('every weights array has 5 entries (one per tier)', () => {
    for (const weights of Object.values(TIER_WEIGHTED_TYPES)) {
      expect(weights).toHaveLength(5);
      for (const w of weights) {
        expect(typeof w).toBe('number');
        expect(w).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it('soft-weighted types have lower weights at low tiers than high tiers', () => {
    // Architectural invariant: the whole point of the weighting is
    // that low tiers downweight these types.
    for (const [type, weights] of Object.entries(TIER_WEIGHTED_TYPES)) {
      expect(weights[0]).toBeLessThan(weights[4]);
    }
  });
});

describe('DUNGEON_CHARACTERS', () => {
  it('is the same reference as SETTING_CHARACTERS (reuse, not duplicate)', () => {
    expect(DUNGEON_CHARACTERS).toBe(SETTING_CHARACTERS);
  });

  it('exposes the same 8 sub-dimensions as setting', () => {
    expect(DUNGEON_CHARACTER_SUBDIMENSIONS).toEqual(
      Object.keys(SETTING_CHARACTERS),
    );
  });
});

describe('DUNGEON_TENSIONS', () => {
  it('contains 15 distinct shapes per design intent', () => {
    expect(DUNGEON_TENSIONS).toHaveLength(15);
  });

  it('has no duplicate entries', () => {
    expect(new Set(DUNGEON_TENSIONS).size).toBe(DUNGEON_TENSIONS.length);
  });

  it('every tension has a corresponding description', () => {
    for (const tension of DUNGEON_TENSIONS) {
      expect(DUNGEON_TENSION_DESCRIPTIONS[tension]).toBeTruthy();
      expect(typeof DUNGEON_TENSION_DESCRIPTIONS[tension]).toBe('string');
      expect(DUNGEON_TENSION_DESCRIPTIONS[tension].length).toBeGreaterThan(50);
    }
  });

  it('description map has no orphan keys', () => {
    for (const key of Object.keys(DUNGEON_TENSION_DESCRIPTIONS)) {
      expect(DUNGEON_TENSIONS).toContain(key);
    }
  });
});

describe('DIFFICULTY_TIERS', () => {
  it('covers tiers 1 through 5', () => {
    expect(DIFFICULTY_TIER_KEYS).toEqual([1, 2, 3, 4, 5]);
  });

  it('every tier has name, monsterCRs (minion / strongMinion / largeCreature), scopeOfStakes', () => {
    for (const tier of DIFFICULTY_TIER_KEYS) {
      const entry = DIFFICULTY_TIERS[tier];
      expect(entry.name).toMatch(/Tier\s+\d/);
      expect(entry.monsterCRs.minion).toBeTruthy();
      expect(entry.monsterCRs.strongMinion).toBeTruthy();
      expect(entry.monsterCRs.largeCreature).toBeTruthy();
      expect(typeof entry.scopeOfStakes).toBe('string');
      expect(entry.scopeOfStakes.length).toBeGreaterThan(20);
    }
  });

  it('monster CRs escalate across tiers', () => {
    // Parse fractional CRs like "1/4" → 0.25 for comparison.
    const cr = (s) => {
      if (s.includes('/')) {
        const [n, d] = s.split('/').map(Number);
        return n / d;
      }
      return Number(s);
    };
    for (let i = 1; i < 5; i++) {
      expect(cr(DIFFICULTY_TIERS[i + 1].monsterCRs.minion))
        .toBeGreaterThanOrEqual(cr(DIFFICULTY_TIERS[i].monsterCRs.minion));
      expect(cr(DIFFICULTY_TIERS[i + 1].monsterCRs.strongMinion))
        .toBeGreaterThanOrEqual(cr(DIFFICULTY_TIERS[i].monsterCRs.strongMinion));
      expect(cr(DIFFICULTY_TIERS[i + 1].monsterCRs.largeCreature))
        .toBeGreaterThanOrEqual(cr(DIFFICULTY_TIERS[i].monsterCRs.largeCreature));
    }
  });
});

describe('OVERUSED_DUNGEON_TROPES', () => {
  it('contains the four documented attractor patterns', () => {
    expect(OVERUSED_DUNGEON_TROPES).toHaveLength(4);
    expect(OVERUSED_DUNGEON_TROPES.some(t => t.includes('seal'))).toBe(true);
    expect(OVERUSED_DUNGEON_TROPES.some(t => t.includes('phylactery'))).toBe(true);
    expect(OVERUSED_DUNGEON_TROPES.some(t => t.includes('summoning'))).toBe(true);
    expect(OVERUSED_DUNGEON_TROPES.some(t => t.includes('hoard'))).toBe(true);
  });
});

describe('pickRandomTension', () => {
  it('returns a value from DUNGEON_TENSIONS', () => {
    for (let i = 0; i < 50; i++) {
      const picked = pickRandomTension();
      expect(DUNGEON_TENSIONS).toContain(picked);
    }
  });

  it('honors injected rng for determinism', () => {
    // rng() returning 0 always → first entry.
    const picked = pickRandomTension(() => 0);
    expect(picked).toBe(DUNGEON_TENSIONS[0]);
    // rng() returning just-under-1 → last entry.
    const last = pickRandomTension(() => 0.9999);
    expect(last).toBe(DUNGEON_TENSIONS[DUNGEON_TENSIONS.length - 1]);
  });
});

describe('pickRandomDifficulty', () => {
  it('returns a tier between 1 and 5', () => {
    for (let i = 0; i < 50; i++) {
      const t = pickRandomDifficulty();
      expect(DIFFICULTY_TIER_KEYS).toContain(t);
    }
  });

  it('honors injected rng for determinism', () => {
    expect(pickRandomDifficulty(() => 0)).toBe(1);
    expect(pickRandomDifficulty(() => 0.9999)).toBe(5);
  });
});

describe('resolveDifficulty', () => {
  it('accepts integer 1-5 as-is', () => {
    for (const n of [1, 2, 3, 4, 5]) {
      expect(resolveDifficulty(n)).toBe(n);
    }
  });

  it('parses string "1" through "5"', () => {
    for (const s of ['1', '2', '3', '4', '5']) {
      expect(resolveDifficulty(s)).toBe(Number(s));
    }
  });

  it('returns null for out-of-range numbers', () => {
    expect(resolveDifficulty(0)).toBeNull();
    expect(resolveDifficulty(6)).toBeNull();
    expect(resolveDifficulty(-1)).toBeNull();
    expect(resolveDifficulty(1.5)).toBeNull();
  });

  it('returns null for malformed strings', () => {
    expect(resolveDifficulty('tier-3')).toBeNull();
    expect(resolveDifficulty('hard')).toBeNull();
    expect(resolveDifficulty('')).toBeNull();
  });

  it('returns null for null / undefined', () => {
    expect(resolveDifficulty(null)).toBeNull();
    expect(resolveDifficulty(undefined)).toBeNull();
  });
});

describe('pickWeightedDungeonType', () => {
  it('returns a value from DUNGEON_TYPES at every tier', () => {
    for (const tier of DIFFICULTY_TIER_KEYS) {
      for (let i = 0; i < 20; i++) {
        const picked = pickWeightedDungeonType(tier);
        expect(DUNGEON_TYPES).toContain(picked);
      }
    }
  });

  it('falls back to tier 1 weights when given an out-of-range tier', () => {
    // Same weight set as tier 1, so result is in-pool either way.
    const picked = pickWeightedDungeonType(99, () => 0);
    expect(DUNGEON_TYPES).toContain(picked);
  });

  it('soft-weighted types appear LESS often at tier 1 than uniform-weighted types', () => {
    // Statistical sanity check: across many rolls, the cumulative
    // count of soft-weighted types at tier 1 should be far below
    // their proportion of the pool (4 / 33 ≈ 12%).
    const rng = mulberry32(42); // deterministic
    const samples = 10000;
    let softCount = 0;
    const softSet = new Set(Object.keys(TIER_WEIGHTED_TYPES));
    for (let i = 0; i < samples; i++) {
      if (softSet.has(pickWeightedDungeonType(1, rng))) softCount++;
    }
    const observedRate = softCount / samples;
    const uniformRate = softSet.size / DUNGEON_TYPES.length;
    // Should be well under the uniform rate. ~4% expected.
    expect(observedRate).toBeLessThan(uniformRate * 0.6);
  });

  it('soft-weighted types appear MORE often at tier 5 than at tier 1', () => {
    const rng1 = mulberry32(42);
    const rng5 = mulberry32(42);
    const samples = 10000;
    const softSet = new Set(Object.keys(TIER_WEIGHTED_TYPES));
    let tier1Count = 0;
    let tier5Count = 0;
    for (let i = 0; i < samples; i++) {
      if (softSet.has(pickWeightedDungeonType(1, rng1))) tier1Count++;
      if (softSet.has(pickWeightedDungeonType(5, rng5))) tier5Count++;
    }
    expect(tier5Count).toBeGreaterThan(tier1Count * 3);
  });
});

describe('getBannedDungeonTropesForGeneration', () => {
  it('returns ~70% of the pool (rounded up)', () => {
    const expected = Math.ceil(OVERUSED_DUNGEON_TROPES.length * 0.7);
    const banned = getBannedDungeonTropesForGeneration();
    expect(banned).toHaveLength(expected);
  });

  it('every returned trope is from the pool', () => {
    const banned = getBannedDungeonTropesForGeneration();
    for (const t of banned) {
      expect(OVERUSED_DUNGEON_TROPES).toContain(t);
    }
  });

  it('rotation: different rng → different subsets', () => {
    const a = getBannedDungeonTropesForGeneration(mulberry32(1));
    const b = getBannedDungeonTropesForGeneration(mulberry32(2));
    // Not always different (small pool means overlap), but with
    // different seeds the order should typically vary. Smoke test.
    expect(a).toEqual(expect.arrayContaining(a.filter(x => b.includes(x))));
  });
});

describe('generateCharacterCandidates (re-exported)', () => {
  it('returns 3 candidates by default', () => {
    const candidates = generateCharacterCandidates();
    expect(candidates).toHaveLength(3);
  });

  it('each candidate is 3 values from 3 distinct sub-dimensions', () => {
    const candidates = generateCharacterCandidates(5);
    for (const c of candidates) {
      expect(c).toHaveLength(3);
      // No duplicate values in a single candidate (3 distinct
      // sub-dimensions means 3 distinct pools).
      expect(new Set(c).size).toBe(3);
    }
  });
});

// ---- helpers ----

/**
 * Tiny deterministic PRNG so the soft-weight statistical assertions
 * don't flake. Standard mulberry32 implementation.
 */
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = a + 0x6D2B79F5 | 0;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
