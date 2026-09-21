/**
 * Archetype/tier resolver tests — build-order step 2 of docs/2024-architecture.md.
 *
 * Tier breakpoints and per-tier structure are asserted as hand-written
 * literals (the tier table is contract data — literals catch wiring bugs
 * without re-deriving the table read). Structural obligations are additionally
 * cross-checked against the empirical percentages in chassis-test-fixtures.json.
 */
import { tierFor, slotPlanFor } from '../chassis/slot-plan.mjs';
import fixtures from '@/data/chassis-test-fixtures.json';
import spec from '@/data/archetype-chassis-spec.json';

const ARCHETYPE_NAMES = Object.keys(spec.archetypes).filter((n) => !n.startsWith('_'));

// ---------------------------------------------------------------------------
// 1. Tier breakpoints
// ---------------------------------------------------------------------------
describe('tierFor', () => {
  test.each([
    [0, 'tier_1_minion'],
    [0.125, 'tier_1_minion'],
    [0.25, 'tier_1_minion'],
    [0.5, 'tier_1_minion'],
    [1, 'tier_2_standard'],
    [2, 'tier_2_standard'],
    [3, 'tier_3_veteran'],
    [7, 'tier_3_veteran'],
    [8, 'tier_4_elite'],
    [12, 'tier_4_elite'],
    [13, 'tier_5_paragon'],
    [20, 'tier_5_paragon'],
    [21, 'tier_6_mythic'],
    [30, 'tier_6_mythic'],
  ])('CR %p resolves to %s', (cr, tier) => {
    expect(tierFor(cr)).toBe(tier);
  });
});

// ---------------------------------------------------------------------------
// 2. Per-tier structure literals (baseline archetype)
// ---------------------------------------------------------------------------
describe('slotPlanFor baseline structure per tier', () => {
  test.each([
    [0.25, {
      tier: 'tier_1_minion',
      traits: { min: 0, max: 1 }, actions: { min: 1, max: 2 },
      multiattack: { status: 'forbidden', count: null },
      bonus_action: 'forbidden', reaction: 'forbidden',
      legendary: { status: 'forbidden', resistance_per_day: null, consider_lair: false },
    }],
    [2, {
      tier: 'tier_2_standard',
      traits: { min: 1, max: 2 }, actions: { min: 2, max: 3 },
      multiattack: { status: 'optional', count: null },
      bonus_action: 'optional', reaction: 'forbidden',
      legendary: { status: 'forbidden', resistance_per_day: null, consider_lair: false },
    }],
    [5, {
      tier: 'tier_3_veteran',
      traits: { min: 1, max: 3 }, actions: { min: 3, max: 4 },
      multiattack: { status: 'required', count: [2, 2] },
      bonus_action: 'optional', reaction: 'optional',
      legendary: { status: 'forbidden', resistance_per_day: null, consider_lair: false },
    }],
    [10, {
      tier: 'tier_4_elite',
      traits: { min: 2, max: 4 }, actions: { min: 3, max: 5 },
      multiattack: { status: 'required', count: [2, 3] },
      bonus_action: 'recommended', reaction: 'optional',
      legendary: { status: 'optional', resistance_per_day: null, consider_lair: false },
    }],
    [15, {
      tier: 'tier_5_paragon',
      traits: { min: 3, max: 5 }, actions: { min: 4, max: 5 },
      multiattack: { status: 'required', count: [3, 3] },
      bonus_action: 'optional', reaction: 'optional',
      legendary: { status: 'recommended', resistance_per_day: [3, 3], consider_lair: false },
    }],
    [25, {
      tier: 'tier_6_mythic',
      traits: { min: 3, max: 6 }, actions: { min: 4, max: 6 },
      multiattack: { status: 'required', count: [3, 3] },
      bonus_action: 'optional', reaction: 'optional',
      legendary: { status: 'required', resistance_per_day: [3, 4], consider_lair: true },
    }],
  ])('CR %p produces the expected baseline plan', (cr, expected) => {
    expect(slotPlanFor(cr, null)).toEqual({
      cr, archetype: null, required_slots: [], ...expected,
    });
  });
});

// ---------------------------------------------------------------------------
// 3. Empirical cross-check vs fixture percentages
// ---------------------------------------------------------------------------
describe('structural obligations vs SRD 5.2.1 empirical percentages', () => {
  test('multiattack and legendary directives are consistent with the data (n >= 3)', () => {
    let sawRequired = 0;
    let sawForbidden = 0;
    for (const [crKey, m] of Object.entries(fixtures.per_cr_medians)) {
      if (m.n < 3) continue;
      const plan = slotPlanFor(Number(crKey), null);
      if (plan.multiattack.status === 'required') {
        sawRequired += 1;
        expect(m.pct_multiattack).toBeGreaterThanOrEqual(75);
      }
      if (plan.multiattack.status === 'forbidden') {
        sawForbidden += 1;
        expect(m.pct_multiattack).toBeLessThanOrEqual(20);
      }
      if (plan.legendary.status === 'required') {
        expect(m.pct_legendary).toBe(100);
      }
    }
    // Guard against the loop silently asserting nothing.
    expect(sawRequired).toBeGreaterThan(0);
    expect(sawForbidden).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// 4. Archetype required-slot integration
// ---------------------------------------------------------------------------
describe('archetype required slots', () => {
  test('defender below tier 3 has no required slots and no reaction upgrade', () => {
    const plan = slotPlanFor(1, 'defender');
    expect(plan.required_slots).toEqual([]);
    expect(plan.reaction).toBe('forbidden');
  });

  test.each([[5], [13]])('defender at CR %p requires its reaction slot', (cr) => {
    const plan = slotPlanFor(cr, 'defender');
    expect(plan.required_slots).toHaveLength(1);
    expect(plan.required_slots[0].category).toBe('reaction');
    expect(plan.reaction).toBe('required');
  });

  test('lurker at CR 5: stealth trait plus flexible nova slot', () => {
    const plan = slotPlanFor(5, 'lurker');
    expect(plan.required_slots).toHaveLength(2);
    expect(plan.required_slots.map((s) => s.category)).toEqual([
      'trait',
      ['trait', 'action'],
    ]);
  });

  test('artillery at CR 9: primary ranged action plus flexible escape tool', () => {
    const plan = slotPlanFor(9, 'artillery');
    expect(plan.required_slots.map((s) => s.category)).toEqual([
      'action',
      ['action', 'bonus_action'],
    ]);
  });

  test('swarm at CR 0.25: 4 slots, trait minimum raised to fit the swarm trait', () => {
    const plan = slotPlanFor(0.25, 'swarm');
    expect(plan.required_slots).toHaveLength(4);
    expect(plan.required_slots.filter((s) => s.category === 'passive')).toHaveLength(2);
    expect(plan.required_slots.filter((s) => s.category === 'trait')).toHaveLength(1);
    // tier 1 traits are [0, 1]; the required swarm trait raises the minimum
    expect(plan.traits).toEqual({ min: 1, max: 1 });
  });

  test('skirmisher movement trick narrows to trait where bonus actions are forbidden', () => {
    expect(slotPlanFor(0.5, 'skirmisher').required_slots[0].category).toBe('trait');
    expect(slotPlanFor(5, 'skirmisher').required_slots[0].category).toEqual([
      'trait',
      'bonus_action',
    ]);
  });

  test('baseline and "balanced" produce identical plans with no required slots', () => {
    expect(slotPlanFor(5, 'balanced')).toEqual(slotPlanFor(5, null));
    expect(slotPlanFor(5, null).required_slots).toEqual([]);
  });

  test('every spec required_slot string resolves, verbatim, for every archetype', () => {
    // If a spec edit adds/changes a required_slots string without a matching
    // categorization, slotPlanFor throws and this test fails loudly.
    const VALID = ['trait', 'action', 'bonus_action', 'reaction', 'passive'];
    for (const name of ARCHETYPE_NAMES) {
      const plan = slotPlanFor(15, name); // tier 5: nothing tier-filtered away
      expect(plan.required_slots).toHaveLength(spec.archetypes[name].required_slots.length);
      for (const slot of plan.required_slots) {
        expect(spec.archetypes[name].required_slots).toContain(slot.description);
        const cats = Array.isArray(slot.category) ? slot.category : [slot.category];
        expect(cats.length).toBeGreaterThan(0);
        for (const c of cats) expect(VALID).toContain(c);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// 5. Determinism and domain
// ---------------------------------------------------------------------------
describe('determinism and domain', () => {
  test('same inputs produce deep-equal plans', () => {
    for (const name of [null, ...ARCHETYPE_NAMES]) {
      expect(slotPlanFor(9, name)).toEqual(slotPlanFor(9, name));
    }
  });

  test('returned plans are fresh objects — mutating one does not leak', () => {
    const first = slotPlanFor(5, 'lurker');
    first.traits.min = 99;
    first.multiattack.count[0] = 99;
    first.required_slots[1].category.push('bogus');
    expect(slotPlanFor(5, 'lurker').traits.min).toBe(1);
    expect(slotPlanFor(5, 'lurker').multiattack.count).toEqual([2, 2]);
    expect(slotPlanFor(5, 'lurker').required_slots[1].category).toEqual(['trait', 'action']);
  });

  test.each([[-1], [0.3], [31], [NaN]])('invalid CR %p throws', (cr) => {
    expect(() => tierFor(cr)).toThrow(RangeError);
    expect(() => slotPlanFor(cr, null)).toThrow(RangeError);
  });

  test('unknown archetype throws, including the spec _comment key', () => {
    expect(() => slotPlanFor(5, 'tank')).toThrow(RangeError);
    expect(() => slotPlanFor(5, '_comment')).toThrow(RangeError);
  });
});
