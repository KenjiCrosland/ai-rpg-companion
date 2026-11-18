/**
 * THE FREE-ROW BUDGET KEEPS THE ROW HANDED A TYPED CLAUSE (fix A, 2026-11-18).
 *
 * "An air elemental that carries stolen voices" shipped with no signature row at all. Its budget was
 * one, and it met a row nobody had asked for before it met the one the seat had been handed:
 *
 *   seat takes its clause: "Stolen Voices" is HANDED "carries stolen voices"
 *   free row over budget: Actions/"Stolen Voices" leaves at ship — this sheet's free-row budget (1)
 *                         is spent by a row that SHIPPED
 *
 * and the row the budget kept was then dropped as half a rule. On the forty, 7 rows left on this
 * budget and 2 of them carried a typed clause — Stolen Voices on s05 and River's Reversal on s33.
 *
 * THIS IS AN ORDERING, NOT AN EXEMPTION. The row still counts against the budget and still earns no
 * clause credit, so the owner's 22 October ruling stands: a row handed a clause has not thereby
 * answered it. It is the same predicate `printCanonExempt` and the audit's rename guard read.
 */
import { settleSheetBudgets, writtenForATypedClause } from '../generate.mjs';

/** a CR 17 card padded to print's own row count for the band, so the budget is the only thing cutting */
const card = (traits) => ({
  Traits: traits,
  Actions: Array.from({ length: 7 }, (_, i) => ({ name: `Chassis ${i + 1}`, text: '*Melee Attack Roll:* +12, reach 5 ft. 20 (4d6 + 6) Bludgeoning damage.' })),
});
const run = (sections) => {
  const drops = [];
  settleSheetBudgets({ sections, scaled: { per_hit: 10 }, cr: 17, noteDrop: (template, stage, why) => drops.push({ template, stage, why }) });
  return { drops, kept: Object.values(sections).flat().map((e) => e.name) };
};

describe('the free-row budget keeps the typed row', () => {
  test('the row carrying a clauseId survives and the one without it is cut', () => {
    const sections = card([
      { name: 'Nobody Asked', text: 'x', template: 'relentless-pursuit', freeRow: true },
      { name: 'Stolen Voices', text: 'y', template: 'condition-payoff', freeRow: true, clauseId: 'cl_voices', clause: 'carries stolen voices' },
    ]);
    // the subjects are present, and only one of them is bound
    expect(writtenForATypedClause(sections.Traits[1])).toBe(true);
    expect(writtenForATypedClause(sections.Traits[0])).toBe(false);

    const { kept } = run(sections);

    expect(kept).toContain('Stolen Voices');
    expect(kept).not.toContain('Nobody Asked');
  });

  test('the order it meets them in does not decide it', () => {
    const sections = card([
      { name: 'Stolen Voices', text: 'y', template: 'condition-payoff', freeRow: true, clauseId: 'cl_voices' },
      { name: 'Nobody Asked', text: 'x', template: 'relentless-pursuit', freeRow: true },
    ]);
    const { kept } = run(sections);
    expect(kept).toContain('Stolen Voices');
    expect(kept).not.toContain('Nobody Asked');
  });

  test('with neither bound, the result is what it was — the first one met is kept', () => {
    const sections = card([
      { name: 'First Met', text: 'x', template: 'relentless-pursuit', freeRow: true },
      { name: 'Second Met', text: 'y', template: 'condition-payoff', freeRow: true },
    ]);
    const { kept, drops } = run(sections);
    expect(kept).toContain('First Met');
    expect(kept).not.toContain('Second Met');
    expect(drops.find((d) => d.template === 'condition-payoff')?.stage).toBe('the free-row budget');
  });

  test('a bound row still COUNTS against the budget — this is an ordering, not an exemption', () => {
    const sections = card([
      { name: 'Bound One', text: 'x', template: 'relentless-pursuit', freeRow: true, clauseId: 'cl_a' },
      { name: 'Bound Two', text: 'y', template: 'condition-payoff', freeRow: true, clauseId: 'cl_b' },
    ]);
    const { kept, drops } = run(sections);
    // both carry an id, so the budget still cuts one of them
    expect(kept.filter((n) => /^Bound/.test(n))).toHaveLength(1);
    expect(drops.some((d) => d.stage === 'the free-row budget')).toBe(true);
  });
});
