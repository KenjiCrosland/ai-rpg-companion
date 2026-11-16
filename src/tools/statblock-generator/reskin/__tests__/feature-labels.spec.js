/**
 * A MECHANIC HAS ONE NAME. Owner's rule, 2026-10-27: *"unless it's mechanically
 * different it needs the same name"* — "if the riposte is not doing anything but
 * a riposte, it shouldn't have a fancy name".
 *
 * Measured over every saved run: this pass renamed 82 rows, and the names it
 * replaced were four coats of paint on one reaction — "Silvered Riposte",
 * "Iron Haft Parry", "Slipstream Lash", "Tower Shield Riposte" are all the same
 * stock riposte, which every CR band renders identically bar the numbers.
 *
 * What was WRONG was the label it reached for: 13 payoff rows were renamed
 * "Trip Attack", a name belonging to the feature table's RIDER (a Strength save
 * imposing Prone, welded onto a weapon row) and never to a standalone action.
 * The brass tyrant's was a 60-foot Dexterity save for 71 Fire damage. Print has
 * no row named "Trip Attack", "Riposte" or "Parry" in 329 monsters.
 */
import { labelFeatureRows } from '@/tools/statblock-generator/reskin/generate.mjs';
import { TEMPLATE_BY_ID } from '@/tools/statblock-generator/reskin/templates.mjs';

const PAYOFF = TEMPLATE_BY_ID.get('condition-payoff').name;   // "Merciless Strike"
const LASH = TEMPLATE_BY_ID.get('exploiter').name;            // "Opportunist's Lash"
const RIPOSTE = TEMPLATE_BY_ID.get('riposte').name;           // "Riposte"
const weapon = (over = {}) => ({ name: 'Hammer', text: 'Melee Attack Roll: +12, reach 10 ft. 33 (6d8 + 6) Bludgeoning damage.', part: true, weapon: true, ...over });
const payoff = (name) => ({ name, text: 'Dexterity Saving Throw: DC 19, one creature within 60 feet that has the Frightened condition. Failure: 71 (13d10) Fire damage.', template: 'condition-payoff', library: true });
const lash = (name) => ({ name, text: 'Strength Saving Throw: DC 16, one creature within 30 feet that is Prone. Failure: 22 (4d10) damage.', template: 'exploiter', library: true });
const riposteRow = (name) => ({ name, text: 'Trigger: A creature within 5 feet misses it with a melee attack roll. Response: The creature makes one Hammer attack against that creature.', template: 'riposte', library: true });
const run = (sections) => { const lines = []; labelFeatureRows(sections, (l, d) => lines.push(`${l} ${d}`)); return lines; };

describe('one mechanic, one name', () => {
  test('every flavoured riposte becomes the one reaction it is', () => {
    for (const n of ['Silvered Riposte', 'Iron Haft Parry', 'Slipstream Lash', 'Shieldwall Riposte', 'Tower Shield Riposte']) {
      const sections = { Reactions: [riposteRow(n)] };
      expect(run(sections).join(' ')).toMatch(/one mechanic, one name/);
      expect(sections.Reactions[0].name).toBe(RIPOSTE);
    }
  });

  test('a payoff takes its own template\'s name, not a fancy one', () => {
    const sections = { Actions: [weapon(), payoff("Debt Collector's Hammer")] };
    run(sections);
    expect(sections.Actions.map((e) => e.name)).toContain(PAYOFF);
  });

  test('the exploiter and the payoff are different mechanics and keep different names', () => {
    const sections = { Actions: [lash('Spine Pin'), payoff('Terror-Found Hammer')] };
    run(sections);
    expect(sections.Actions.map((e) => e.name).sort()).toEqual([LASH, PAYOFF].sort());
  });

  test('a recharge gate survives the rename', () => {
    const sections = { Actions: [{ ...riposteRow('Whipping Riposte'), name: 'Whipping Riposte (Recharge 5-6)' }] };
    run(sections);
    expect(sections.Actions[0].name).toBe(`${RIPOSTE} (Recharge 5-6)`);
  });

  test('a row already correctly named is left alone, with no trace', () => {
    const sections = { Reactions: [riposteRow(RIPOSTE)], Actions: [payoff(PAYOFF)] };
    expect(run(sections)).toEqual([]);
  });

  test('an untemplated row is never touched', () => {
    const sections = { Actions: [weapon({ name: 'Furnace Breath (Recharge 5-6)' })] };
    expect(run(sections)).toEqual([]);
    expect(sections.Actions[0].name).toBe('Furnace Breath (Recharge 5-6)');
  });
});

describe('"Trip Attack" belongs to the rider, never to a standalone row', () => {
  test('no payoff is ever renamed Trip Attack — the tyrant\'s was a 60-foot Fire save', () => {
    const sections = { Actions: [weapon(), payoff("Debt Collector's Hammer")] };
    run(sections);
    expect(JSON.stringify(sections)).not.toMatch(/Trip Attack/);
  });

  test("when the style's real Trip rider is on the sheet, the template's copy leaves", () => {
    const sections = { Actions: [weapon({ feature: 'Trip Attack' }), payoff(PAYOFF)] };
    const lines = run(sections);
    expect(sections.Actions).toHaveLength(1);
    expect(sections.Actions[0].feature).toBe('Trip Attack');
    expect(lines.join(' ')).toMatch(/feature stands/);
  });

  test('a cross-reference to the row that left is swept, not left dangling', () => {
    const sections = {
      Actions: [weapon({ feature: 'Trip Attack' }), payoff(PAYOFF), { name: 'Multiattack', text: `It makes two Hammer attacks. It can replace one attack with a use of ${PAYOFF}.` }],
    };
    run(sections);
    expect(JSON.stringify(sections)).not.toMatch(new RegExp(PAYOFF));
  });
});
