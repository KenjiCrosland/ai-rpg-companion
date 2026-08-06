/**
 * Chassis module tests — build-order step 1 of docs/2024-architecture.md.
 *
 * Ground truth is src/data/chassis-test-fixtures.json (empirical per-CR
 * medians + named SRD 5.2.1 monsters), asserted within the tolerances the
 * fixtures declare in _meta — NOT exact equality against the spec formulas,
 * which would just re-derive the implementation.
 */
import { chassisFor, pbFor, applyArchetype } from '../chassis/chassis.mjs';
import fixtures from '@/data/chassis-test-fixtures.json';
import spec from '@/data/archetype-chassis-spec.json';

const TOL = fixtures._meta.tolerance_guidance;

const VALID_CRS = [0, 0.125, 0.25, 0.5, ...Array.from({ length: 30 }, (_, i) => i + 1)];

const fixtureByName = Object.fromEntries(
  fixtures.named_fixtures.map((f) => [f.name, f])
);

const ARCHETYPE_NAMES = Object.keys(spec.archetypes).filter((n) => !n.startsWith('_'));

// ---------------------------------------------------------------------------
// 1. PB progression
// ---------------------------------------------------------------------------
describe('pbFor', () => {
  test.each([[0], [0.125], [0.25], [0.5], [1], [2], [3], [4]])(
    'CR %p is PB +2',
    (cr) => {
      expect(pbFor(cr)).toBe(2);
    }
  );

  // Both sides of every +1 breakpoint in the 5e PB progression.
  test.each([
    [4, 2], [5, 3],
    [8, 3], [9, 4],
    [12, 4], [13, 5],
    [16, 5], [17, 6],
    [20, 6], [21, 7],
    [24, 7], [25, 8],
    [28, 8], [29, 9],
    [30, 9],
  ])('CR %p is PB +%p', (cr, pb) => {
    expect(pbFor(cr)).toBe(pb);
  });

  test('agrees with every named SRD fixture', () => {
    for (const f of fixtures.named_fixtures) {
      expect(pbFor(f.cr)).toBe(f.pb);
    }
  });
});

// ---------------------------------------------------------------------------
// 2. Chassis vs empirical per-CR medians (CR >= 1)
// ---------------------------------------------------------------------------
describe('chassisFor vs SRD 5.2.1 per-CR medians (CR >= 1)', () => {
  const medianEntries = Object.entries(fixtures.per_cr_medians)
    .map(([cr, m]) => [Number(cr), m])
    .filter(([cr]) => cr >= 1);

  test.each(medianEntries)(
    'CR %p lands within fixture tolerances of the medians',
    (cr, m) => {
      const c = chassisFor(cr);
      expect(Math.abs(c.ac - m.ac_median)).toBeLessThanOrEqual(TOL.ac);
      expect(Math.abs(c.hp / m.hp_median - 1)).toBeLessThanOrEqual(TOL.hp_ratio);
      // Attack/DC medians drawn from fewer than 3 monsters are too noisy to
      // support a ±1 assert (e.g. CR 12, n=2, attack median 8.5); the looser
      // AC/HP checks still apply at those CRs.
      if (m.n >= 3) {
        if (m.attack_median != null) {
          expect(Math.abs(c.attack_bonus - m.attack_median)).toBeLessThanOrEqual(TOL.attack);
        }
        if (m.dc_median != null) {
          expect(Math.abs(c.save_dc - m.dc_median)).toBeLessThanOrEqual(TOL.dc);
        }
      }
    }
  );
});

// ---------------------------------------------------------------------------
// 3. Anchor table (CR < 1)
// ---------------------------------------------------------------------------
describe('chassisFor anchors (CR < 1)', () => {
  // Anchors are the contract below CR 1 (per the spec) — asserted as literal
  // values so a key-mapping bug (e.g. 0.125 vs "1/8") can't slip through.
  // Known divergence: the CR 0 anchor DC (10) sits 2 below the fixture median
  // (12); anchors win below CR 1.
  test.each([
    [0, { ac: 11, hp: 3, attack_bonus: 2, save_dc: 10 }],
    [0.125, { ac: 12, hp: 9, attack_bonus: 4, save_dc: 11 }],
    [0.25, { ac: 12, hp: 13, attack_bonus: 4, save_dc: 11 }],
    [0.5, { ac: 12, hp: 21, attack_bonus: 4, save_dc: 11 }],
  ])('CR %p returns the anchor values', (cr, expected) => {
    expect(chassisFor(cr)).toEqual({ cr, pb: 2, ...expected });
  });
});

// ---------------------------------------------------------------------------
// 4. Domain and monotonicity
// ---------------------------------------------------------------------------
describe('CR domain', () => {
  test.each([[-1], [0.3], [0.75], [26.5], [31], [NaN], [Infinity]])(
    'chassisFor(%p) throws',
    (cr) => {
      expect(() => chassisFor(cr)).toThrow(RangeError);
      expect(() => pbFor(cr)).toThrow(RangeError);
    }
  );

  test('non-number input throws', () => {
    expect(() => chassisFor('5')).toThrow();
    expect(() => chassisFor(undefined)).toThrow();
    expect(() => chassisFor(null)).toThrow();
  });

  test('every stat is non-decreasing across the full CR ladder', () => {
    // Catches anchor↔formula seam bugs at CR 0.5 → 1 as well as any
    // regression that makes a stat dip with rising CR.
    let prev = null;
    for (const cr of VALID_CRS) {
      const c = chassisFor(cr);
      if (prev) {
        expect(c.ac).toBeGreaterThanOrEqual(prev.ac);
        expect(c.hp).toBeGreaterThanOrEqual(prev.hp);
        expect(c.attack_bonus).toBeGreaterThanOrEqual(prev.attack_bonus);
        expect(c.save_dc).toBeGreaterThanOrEqual(prev.save_dc);
        expect(c.pb).toBeGreaterThanOrEqual(prev.pb);
      }
      prev = c;
    }
  });
});

// ---------------------------------------------------------------------------
// 5. applyArchetype semantics
// ---------------------------------------------------------------------------
describe('applyArchetype', () => {
  // Expected values hand-computed once from chassis × profile (behavioral
  // fixtures, not formula mirroring).
  test.each([
    ['brute', 5, { hp: 124, ac: 14, attack_bonus: 7, save_dc: 14 }],
    ['defender', 5, { hp: 105, ac: 17, attack_bonus: 7, save_dc: 14 }],
    ['skirmisher', 1, { hp: 26, ac: 13, attack_bonus: 5, save_dc: 12 }],
    ['artillery', 9, { hp: 122, ac: 15, attack_bonus: 10, save_dc: 16 }],
    ['controller', 10, { hp: 162, ac: 17, attack_bonus: 9, save_dc: 17 }],
    ['lurker', 4, { hp: 59, ac: 14, attack_bonus: 7, save_dc: 13 }],
    ['support', 3, { hp: 52, ac: 14, attack_bonus: 6, save_dc: 14 }],
    // hp_mult 0.85, measured 2026-08-04: 7/7 printed swarms sit at
    // 0.79-1.12x band HP (median 0.80) — B/P/S is the durability.
    ['swarm', 2, { hp: 37, ac: 13, attack_bonus: 5, save_dc: 12 }],
  ])('%s at CR %p produces the expected adjusted numbers', (name, cr, expected) => {
    const out = applyArchetype(chassisFor(cr), name);
    expect(out.hp).toBe(expected.hp);
    expect(out.ac).toBe(expected.ac);
    expect(out.attack_bonus).toBe(expected.attack_bonus);
    expect(out.save_dc).toBe(expected.save_dc);
    expect(out.archetype).toBe(name);
    // CR identity carries through unchanged.
    expect(out.cr).toBe(cr);
    expect(out.pb).toBe(pbFor(cr));
  });

  test('does not mutate the input chassis', () => {
    const chassis = chassisFor(5);
    const snapshot = JSON.parse(JSON.stringify(chassis));
    applyArchetype(chassis, 'brute');
    expect(chassis).toEqual(snapshot);
  });

  test('unknown archetype throws, including the spec _comment key', () => {
    expect(() => applyArchetype(chassisFor(5), 'tank')).toThrow(RangeError);
    expect(() => applyArchetype(chassisFor(5), '_comment')).toThrow(RangeError);
  });

  test('malformed chassis input throws', () => {
    expect(() => applyArchetype(null, 'brute')).toThrow(TypeError);
    expect(() => applyArchetype({ hp: 50 }, 'brute')).toThrow(TypeError);
  });

  test('passes spec fields through for downstream layers, for every archetype', () => {
    for (const name of ARCHETYPE_NAMES) {
      const profile = spec.archetypes[name];
      const out = applyArchetype(chassisFor(5), name);
      expect(out.required_slots).toEqual(profile.required_slots);
      expect(out.damage_mult).toBe(profile.damage_mult ?? 1);
      expect(out.forbidden).toEqual(profile.forbidden ?? []);
      // Missing mods must default to no-ops, never NaN (swarm defines no
      // attack_mod/dc_mod).
      expect(Number.isFinite(out.hp)).toBe(true);
      expect(Number.isFinite(out.ac)).toBe(true);
      expect(Number.isFinite(out.attack_bonus)).toBe(true);
      expect(Number.isFinite(out.save_dc)).toBe(true);
    }
  });

  test('lurker carries nova_mult; support carries solo_warning', () => {
    expect(applyArchetype(chassisFor(5), 'lurker').nova_mult).toBe(2.0);
    expect(applyArchetype(chassisFor(5), 'support').solo_warning).toBe(
      spec.archetypes.support.solo_warning
    );
    expect(applyArchetype(chassisFor(5), 'brute').nova_mult).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// 6. Archetype direction vs real SRD exemplars (directional only — real
//    monsters deviate beyond lint tolerances; those bounds constrain our
//    generator, not the SRD)
// ---------------------------------------------------------------------------
describe('archetype directions match SRD exemplars', () => {
  test('brute exemplar Ogre Zombie (CR 2): more HP, less AC than baseline', () => {
    const base = chassisFor(2);
    expect(fixtureByName['Ogre Zombie'].hp).toBeGreaterThan(base.hp);
    expect(fixtureByName['Ogre Zombie'].ac).toBeLessThan(base.ac);
  });

  test('defender exemplar Roper (CR 5): AC above baseline', () => {
    expect(fixtureByName['Roper'].ac).toBeGreaterThan(chassisFor(5).ac);
  });

  test('lurker exemplars Ghost (CR 4) and Will-o\'-Wisp (CR 2): HP below baseline', () => {
    expect(fixtureByName['Ghost'].hp).toBeLessThan(chassisFor(4).hp);
    expect(fixtureByName["Will-o'-Wisp"].hp).toBeLessThan(chassisFor(2).hp);
  });
});

describe('ability-score ceiling', () => {
  // Scores cap at 30 (+10 mod): attack must stay ≤ PB + 10 and save DC
  // ≤ PB + 18 or no ability can derive them (live finding: lurker CR 28
  // emitted +19 to hit against a +18 ceiling). Sweep every CR × archetype.
  const CRS = [0, 0.125, 0.25, 0.5, ...Array.from({ length: 30 }, (_, i) => i + 1)];
  const ARCHES = ['brute', 'defender', 'skirmisher', 'artillery', 'controller', 'lurker', 'support', 'swarm'];

  test('attack ≤ PB + 10 and save DC ≤ PB + 18 for every CR and archetype', () => {
    for (const cr of CRS) {
      const base = chassisFor(cr);
      expect(base.attack_bonus).toBeLessThanOrEqual(base.pb + 10);
      expect(base.save_dc).toBeLessThanOrEqual(base.pb + 18);
      for (const arch of ARCHES) {
        const c = applyArchetype(base, arch);
        expect(c.attack_bonus).toBeLessThanOrEqual(c.pb + 10);
        expect(c.save_dc).toBeLessThanOrEqual(c.pb + 18);
      }
    }
  });

  test('the ceiling binds where archetype mods exceed it (lurker CR 28)', () => {
    const c = applyArchetype(chassisFor(28), 'lurker');
    expect(c.attack_bonus).toBe(18); // 18 + 1 capped back to PB 8 + 10
  });
});
