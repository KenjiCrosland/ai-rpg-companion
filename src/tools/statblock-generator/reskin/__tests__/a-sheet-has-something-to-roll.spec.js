/**
 * A MULTIATTACK WITH NOTHING TO ROLL (the Vigilant Warden, 2026-11-16).
 *
 * "A guard captain turned paladin" at CR 4 shipped this as its whole Actions section:
 *
 *     Multiattack. The warden makes two attacks.
 *
 * No attack row. Measured live at CR 4, five rolls each of four prompts on e6fffc7, **8 of 20**
 * sheets did it — including plain "a paladin" (2 of 5) and plain "a fighter" (1 of 5), so the
 * trigger was never the words or the Guard Captain's body.
 *
 * THE CAUSE. On a closed path the Actions are closed too, and a row carrying an attack that no
 * stage claimed is chassis filler and leaves. On this sheet it was the LAST attack row, and the
 * pass immediately before had narrowed that very row to melee *because* it was "the only attack on
 * the sheet … rather than leaving a sheet with nothing to attack with". Two passes disagreed and
 * the sweep went last.
 *
 * NOT the Multiattack re-read, which only rewrites the sentence after a row has gone, and not the
 * dead-name sweep. Both are untouched, which is why this needed no regression forty.
 *
 * The two halves are tested on the shape the collapsed roll handed them: the fix, and the net under
 * it for a cause nobody has found yet.
 */
import { closedPathFillerLeaves, assertSomethingToRoll } from '../generate.mjs';

/** the Vigilant Warden's own Actions, at the moment the sweep ran: one attack, no provenance */
const theWarden = () => ({
  Actions: [
    { name: 'Multiattack', text: 'The warden makes two attacks, using Slam or Longsword in any combination.' },
    { name: 'Slam', text: '*Melee Attack Roll:* +6, reach 5 ft. 14 (3d6 + 4) Bludgeoning damage.' },
  ],
  Traits: [{ name: 'Shielded Stance', text: 'While the warden is not Incapacitated, it gains a bonus to AC.', template: 'stance' }],
});

describe('the closed-path filler sweep never takes the last attack row', () => {
  test("the Vigilant Warden's only attack survives the sweep", () => {
    const sections = theWarden();
    closedPathFillerLeaves(sections, 'Guard Captain');
    expect(sections.Actions.map((e) => e.name)).toEqual(['Multiattack', 'Slam']);
    expect(sections.Actions.find((e) => e.name === 'Slam').text).toMatch(/Attack Roll/);
  });

  test('it says so in the trace, so a reader can see why a row with no provenance stayed', () => {
    const lines = [];
    closedPathFillerLeaves(theWarden(), 'Guard Captain', (a, b) => lines.push(`${a} ${b}`));
    expect(lines.join(' ')).toMatch(/chassis row STAYS/);
    expect(lines.join(' ')).toMatch(/only attack roll on the sheet/);
  });

  // THE SWEEP STILL DOES ITS JOB: filler leaves while the sheet keeps something to roll.
  test('with two unclaimed attacks, one leaves and one stays', () => {
    const sections = theWarden();
    sections.Actions.push({ name: 'Javelin', text: '*Ranged Attack Roll:* +6, range 30/120 ft. 14 (3d6 + 4) Piercing damage.' });
    closedPathFillerLeaves(sections, 'Guard Captain');
    const atk = sections.Actions.filter((e) => /Attack Roll/.test(e.text));
    expect(atk).toHaveLength(1);
  });

  test('a row any stage claimed is never filler, whatever else is on the sheet', () => {
    for (const flag of ['print', 'part', 'feature', 'kit', 'library', 'template', 'authored', 'gmArmed', 'userSet', 'rules']) {
      const sections = theWarden();
      sections.Actions.push({ name: 'Longsword', text: '*Melee Attack Roll:* +6, reach 5 ft. 15 (2d10 + 4) Slashing damage.', [flag]: true });
      closedPathFillerLeaves(sections, 'Guard Captain');
      expect(sections.Actions.map((e) => e.name)).toContain('Longsword');
    }
  });

  // A CASTER NEVER HAD AN ATTACK TO ROLL, so a save row is still filler and still leaves.
  test('a lone saving-throw row with no provenance still leaves', () => {
    const sections = { Actions: [
      { name: 'Multiattack', text: 'The adept casts twice.' },
      { name: 'Withering Word', text: '*Constitution Saving Throw:* DC 14, one creature. *Failure:* 10 (3d6) Necrotic damage.' },
      { name: 'Arcane Burst', text: '*Melee or Ranged Attack Roll:* +7, reach 5 ft. or range 120 ft. 14 (3d6 + 4) Force damage.', print: true },
    ] };
    closedPathFillerLeaves(sections, 'Mage');
    expect(sections.Actions.map((e) => e.name)).toEqual(['Multiattack', 'Arcane Burst']);
  });
});

describe('the last guard: a Multiattack with nothing to roll does not ship', () => {
  test('it throws on the shape that shipped', () => {
    expect(() => assertSomethingToRoll({ Actions: [{ name: 'Multiattack', text: 'The warden makes two attacks.' }] }))
      .toThrow(/Multiattack with no attack row/);
  });

  test('one attack row and a Multiattack naming it is correct and passes', () => {
    expect(() => assertSomethingToRoll({ Actions: [
      { name: 'Multiattack', text: 'The knight makes three Longsword attacks.' },
      { name: 'Longsword', text: '*Melee Attack Roll:* +7, reach 5 ft. 15 (2d10 + 4) Slashing damage.' },
    ] })).not.toThrow();
  });

  test('no Multiattack at all is not this bug', () => {
    expect(() => assertSomethingToRoll({ Actions: [{ name: 'Withering Word', text: '*Constitution Saving Throw:* DC 14, one creature.' }] })).not.toThrow();
    expect(() => assertSomethingToRoll({})).not.toThrow();
    expect(() => assertSomethingToRoll(null)).not.toThrow();
  });

  test('an attack row in any section counts — a Multiattack may cite a Bonus Action', () => {
    expect(() => assertSomethingToRoll({
      Actions: [{ name: 'Multiattack', text: 'The hunter makes two attacks.' }],
      'Bonus Actions': [{ name: 'Shortbow', text: '*Ranged Attack Roll:* +6, range 80/320 ft. 7 (1d6 + 4) Piercing damage.' }],
    })).not.toThrow();
  });
});
