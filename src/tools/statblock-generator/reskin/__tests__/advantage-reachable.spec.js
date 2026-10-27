/**
 * A CONDITIONAL ADVANTAGE SHIPS ONLY IF SOMETHING SETS IT UP.
 *
 * The owner's name-only read, 2026-10-27, on the Dread Bellringer:
 *   "Bell Slam. Melee Attack Roll: +6 (with Advantage if the target is Grappled
 *    by the bellringer), reach 5 ft. ..."
 * — on a sheet whose other rows are a Peal and a shape-shift. Nothing grapples.
 *
 * The clause comes from DONOR data: four grappler donors ship their Melee Attack
 * with it, assuming their own grapple row survives the reskin. 147 rows across
 * the saved runs carry a conditional Advantage; 5 dangle.
 *
 * The sibling of `payoffReachable`, with one difference: the ROW stays, because
 * it is the creature's weapon. Only the promise goes.
 */
import { advantageReachable } from '@/tools/statblock-generator/reskin/generate.mjs';

const slam = (over = {}) => ({ name: 'Bell Slam', text: '*Melee Attack Roll:* +6 (with Advantage if the target is Grappled by the bellringer), reach 5 ft. 12 (2d8 + 3) Bludgeoning damage.', ...over });

describe('the clause leaves when nothing sets it up', () => {
  test("the Bellringer's dangling promise is stripped and the row survives", () => {
    const sections = { Actions: [slam(), { name: 'Peal', text: '*Constitution Saving Throw:* DC 14, each creature in a 15-foot Emanation. *Failure:* 18 (4d8) Thunder damage.' }] };
    const out = advantageReachable(sections, () => {});
    expect(out.map((x) => x.need)).toEqual(['Grappled']);
    const row = sections.Actions.find((e) => e.name === 'Bell Slam');
    expect(row).toBeDefined();                       // the weapon stays
    expect(row.text).not.toMatch(/with Advantage/);  // the promise goes
    expect(row.text).toMatch(/\+6, reach 5 ft\./);   // and reads cleanly, no double comma or gap
    expect(row.text).toMatch(/12 \(2d8 \+ 3\) Bludgeoning/);
  });

  test('a sheet that DOES grapple keeps the clause', () => {
    const sections = { Actions: [slam(), { name: 'Snatch', text: '*Melee Attack Roll:* +6, reach 10 ft. 9 (2d4 + 4) damage, and the target has the Grappled condition (escape DC 13).', imposes: 'Grappled' }] };
    expect(advantageReachable(sections, () => {})).toEqual([]);
    expect(sections.Actions[0].text).toMatch(/with Advantage if the target is Grappled/);
  });

  test('it reads the DECLARED record, so a prerequisite elsewhere does not count as setup', () => {
    // a payoff REQUIRES Grappled; it does not impose it
    const sections = { Actions: [slam(), { name: "Opportunist's Lash", text: '*Strength Saving Throw:* DC 16, one creature that is Grappled. *Failure:* 22 (4d10) damage.', consumes: 'Grappled' }] };
    expect(advantageReachable(sections, () => {}).map((x) => x.need)).toEqual(['Grappled']);
  });

  test('a row with no conditional Advantage is untouched', () => {
    const sections = { Actions: [{ name: 'Claw', text: '*Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Slashing damage.' }] };
    const before = sections.Actions[0].text;
    expect(advantageReachable(sections, () => {})).toEqual([]);
    expect(sections.Actions[0].text).toBe(before);
  });

  test('the trace says what left and why', () => {
    const lines = [];
    advantageReachable({ Actions: [slam()] }, (l, d) => lines.push(`${l} ${d}`));
    expect(lines.join(' ')).toMatch(/advantage clause dropped.*Grappled.*the row stays/);
  });
});
