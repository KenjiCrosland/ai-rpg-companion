// WHOLE-SHEET BUDGETS SETTLE ON THE FINISHED SHEET (critic's package-six review,
// 2026-10-22). Test categories 1, 9 and 10 from that review, plus the declared
// seat-cell cap the owner's ruling asked for.
import { settleSheetBudgets, readGapOutcomes } from '../generate.mjs';
import { scaleDonor, pickDonor } from '../scale.mjs';

const scaled = () => scaleDonor(pickDonor(8, null, 'brute'), 8, { mechanics: [] });

const freeTrait = (name, template) => ({ name, text: 'A creature that touches it takes 7 (2d6) Fire damage.', freeRow: true, library: true, template });
const nova = (name, over = {}) => ({
  name: `${name} (Recharge 5-6)`,
  text: '*Dexterity Saving Throw:* DC 15, each creature in a 20-foot Emanation. *Failure:* 28 (8d6) Fire damage.',
  ...over,
});

describe('the free-row budget is counted at ship, once', () => {
  test('a single free row survives', () => {
    const sections = { Traits: [freeTrait('Smoldering Stumps', 'heated-body')] };
    const generation = {};
    settleSheetBudgets({ sections, scaled: scaled(), cr: 8, generation });
    expect(sections.Traits.map((e) => e.name)).toEqual(['Smoldering Stumps']);
    expect(generation.free_rows).toBe(1);
  });

  // THE BUG: the allowance used to be spent at GRANT, so a granted row vetoed
  // later still cost the sheet its second candidate. Bog Hound, Thunderwall
  // Drake, Drowned Choir and Trench Antiphon each lost a real trait this way.
  // A row that never reached the sheet must not spend the budget.
  test('a vetoed first candidate does not spend the budget', () => {
    const sections = { Traits: [freeTrait('Silt-Slick Hide', 'resonant-body')] }; // the first was vetoed upstream and is absent
    const generation = {};
    settleSheetBudgets({ sections, scaled: scaled(), cr: 8, generation });
    expect(sections.Traits.map((e) => e.name)).toEqual(['Silt-Slick Hide']);
    expect(generation.free_rows).toBe(1);
  });

  test('a second free row in a DIFFERENT declared cell still yields to the budget of 1', () => {
    const sections = { Traits: [freeTrait('A', 'heated-body'), freeTrait('B', 'warded-mending')] };
    const generation = {};
    settleSheetBudgets({ sections, scaled: scaled(), cr: 8, generation });
    expect(sections.Traits).toHaveLength(1);
    expect(generation.free_rows).toBe(1);
  });

  test('an EXACT print sheet keeps no free row — print closes the row set', () => {
    const sections = { Traits: [freeTrait('Decoration', 'heated-body')] };
    const generation = {};
    settleSheetBudgets({ sections, printExact: true, scaled: scaled(), cr: 8, generation });
    expect(sections.Traits).toHaveLength(0);
    expect(generation.free_rows).toBe(0);
  });

  test('the metric names the templates that shipped, so sameness is visible', () => {
    const sections = { Traits: [freeTrait('A', 'heated-body')] };
    const generation = {};
    settleSheetBudgets({ sections, scaled: scaled(), cr: 8, generation });
    expect(generation.free_row_templates).toEqual(['heated-body']);
  });

  test('a row with no freeRow mark is never touched', () => {
    const sections = { Traits: [{ name: 'Legendary Resistance (3/Day)', text: 'It succeeds instead.' }] };
    settleSheetBudgets({ sections, scaled: scaled(), cr: 8, generation: {} });
    expect(sections.Traits).toHaveLength(1);
  });
});

describe('one Recharge nova a sheet, counted whatever wrote it', () => {
  // 0 of 329 print blocks carry two Recharge Action rows; 72 carry exactly one.
  test('a FITTED nova blocks a later one (the library/template exclusion is gone)', () => {
    const sections = { Actions: [nova('Chorus Barrage', { library: true, template: 'active-toll' }), nova('Whirlwind', { library: true, template: 'spew' })] };
    settleSheetBudgets({ sections, scaled: scaled(), cr: 8, generation: {} });
    const gated = sections.Actions.filter((e) => /\(Recharge/.test(e.name));
    expect(gated).toHaveLength(1);
  });

  // The Air Elemental shipped Chorus Barrage (library, active-toll) beside
  // print's own Whirlwind, because the mid-build check ran ~1,460 lines before
  // print canon places print's rows.
  test("print's nova keeps its gate and the fitted one un-gates", () => {
    const sections = { Actions: [nova('Chorus Barrage', { library: true, template: 'active-toll' }), nova('Whirlwind', { print: true })] };
    settleSheetBudgets({ sections, scaled: scaled(), cr: 8, generation: {} });
    const byName = (n) => sections.Actions.find((e) => e.name.startsWith(n));
    expect(byName('Whirlwind').name).toMatch(/\(Recharge 5-6\)/);
    expect(byName('Chorus Barrage').name).not.toMatch(/\(Recharge/);
  });

  test('a lone nova is left alone', () => {
    const sections = { Actions: [nova('Breath', { print: true })] };
    settleSheetBudgets({ sections, scaled: scaled(), cr: 8, generation: {} });
    expect(sections.Actions[0].name).toMatch(/\(Recharge 5-6\)/);
  });

  // checker.mjs's novasOf counts a gate written in the row's TEXT too, so this
  // pass must see the same rows the gate sees — a name-only filter made a CR 13
  // swarm's 91 (14d12) emanation read as "nova none" (hold 4, 2026-10-16).
  test('a TEXT-gated nova is counted, and the name-gated one yields to it', () => {
    const textGated = {
      name: 'Dirge Burst',
      text: 'The first time the swarm is Bloodied in a fight, *Constitution Saving Throw:* DC 15, each creature in a 30-foot Emanation. *Failure:* 35 (10d6) Necrotic damage.',
      library: true, template: 'bloodied-burst',
    };
    const sections = { Actions: [nova('Chorus Barrage', { library: true, template: 'active-toll' }), textGated] };
    settleSheetBudgets({ sections, scaled: scaled(), cr: 8, generation: {} });
    // the text-gated row cannot be un-gated by renaming, so it keeps the budget
    expect(sections.Actions.find((e) => e.name === 'Dirge Burst')).toBeTruthy();
    expect(sections.Actions.find((e) => e.name.startsWith('Chorus Barrage')).name).not.toMatch(/\(Recharge/);
  });

  // PRINT OVERRULES THE RULE, and it does so exactly once: measured under the
  // gate's own predicate (which counts "1/Day", not only "Recharge"), 1 of 329
  // print blocks carries two — the Vrock's Spores (Recharge 6) beside Stunning
  // Screech (1/Day). So this pass never un-gates a print row.
  test('two PRINT novas are both left alone — print overrules the rule', () => {
    const sections = { Actions: [nova('One', { print: true }), nova('Two', { print: true })] };
    settleSheetBudgets({ sections, scaled: scaled(), cr: 8, generation: {} });
    expect(sections.Actions.filter((e) => /\(Recharge/.test(e.name))).toHaveLength(2);
  });
});

// THE GAP SHIP-CHECK COUNTS APPENDED RIDERS (critic's test category 4,
// 2026-10-22). A rider welded onto a row owns no row of its own, so the
// ship-check — which reads `e.template` off the rows — counted a SHIPPED rider
// as a veto. The Purple Worm's charge rode its Bite and Krennik's rode his
// Saber; both logged "VETOED: charge never reached the sheet".
describe('the gap ship-check counts appended riders', () => {
  const rec = (template) => ({ template, line: `a ram that drives the target back — ${template}` });

  test('a rider welded onto a host row counts as landed', () => {
    const sections = { Actions: [{ name: 'Bite', text: 'Melee Attack Roll: +9. Hit: 22 (3d10 + 6) Piercing damage. ...', riderTemplates: ['charge'] }] };
    const generation = {};
    const lines = [];
    const out = readGapOutcomes({ sections, gapRecords: [rec('charge')], generation, trace: (l, d) => lines.push(`${l} ${d}`) });
    expect(out).toEqual({ vetoed: 0, landed: 1 });
    expect(generation.gap_vetoed).toBe('0 of 1');
    expect(lines.join('\n')).toMatch(/\[landed: charge\]/);
  });

  test('a template on no row and no host is still a veto', () => {
    const sections = { Actions: [{ name: 'Bite', text: 'Melee Attack Roll: +9.' }] };
    const generation = {};
    const out = readGapOutcomes({ sections, gapRecords: [rec('charge')], generation, trace: () => {} });
    expect(out).toEqual({ vetoed: 1, landed: 0 });
    expect(generation.gap_vetoed).toBe('1 of 1');
  });

  test('a row of its own still counts as landed', () => {
    const sections = { Traits: [{ name: 'Heated Body', text: 'A creature that touches it takes damage.', template: 'heated-body' }] };
    const out = readGapOutcomes({ sections, gapRecords: [rec('heated-body')], trace: () => {} });
    expect(out.landed).toBe(1);
  });

  test('a gap record with no template reads as a dropped row, not a veto of something', () => {
    const lines = [];
    const out = readGapOutcomes({ sections: {}, gapRecords: [{ line: 'nothing was offered' }], trace: (l, d) => lines.push(`${l} ${d}`) });
    expect(out.vetoed).toBe(1);
    expect(lines.join('\n')).toMatch(/\[row dropped\]/);
  });

  test('no gap records is not an error', () => {
    expect(readGapOutcomes({ sections: {}, gapRecords: [] })).toEqual({ vetoed: 0, landed: 0 });
  });
});
