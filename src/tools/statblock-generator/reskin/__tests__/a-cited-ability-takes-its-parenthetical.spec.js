/**
 * A CITED ABILITY TAKES ITS USAGE PARENTHETICAL WITH IT (owner's fix D, 2026-11-15).
 *
 * The Stone Golem shipped this, and it is the only garbled sentence in the 107 sheets read that
 * day:
 *
 *   Multiattack. The golem makes two attacks, using Slam or Force Bolt in any combination.
 *   It can replace one attack with  (Recharge 5-6).
 *
 * `sweepDeadName` strips the recharge suffix off the dead name before it searches, so its fallback
 * removed "a use of Splintering Charge" out of the Multiattack and left behind the " (Recharge
 * 5-6)" that had followed it. The stump cleanup added on 2026-10-23 wanted a clause ending at
 * "with.", so a stump still holding a parenthetical slipped past it.
 *
 * The cause was a RENAME ("name follows content": Splintering Charge -> Splintering Shove), which
 * passes the renamed row as the keeper — but the re-point is gated on the keeper being an attack
 * row, and a shove is a saving throw. So it fell through to the fallback. That gate is reported
 * separately; this file tests the rule as the owner stated it.
 */
import { sweepDeadName } from '../generate.mjs';

const golem = () => ({
  Actions: [
    { name: 'Multiattack', text: 'The golem makes two attacks, using Slam or Force Bolt in any combination. It can replace one attack with a use of Splintering Charge (Recharge 5-6).' },
    { name: 'Slam', text: '*Melee Attack Roll:* +10, reach 5 ft. 15 (2d8 + 6) Bludgeoning damage.' },
    { name: 'Force Bolt', text: '*Ranged Attack Roll:* +10, range 60 ft. 12 (2d6 + 5) Force damage.' },
  ],
});

describe('a cited ability takes its usage parenthetical with it', () => {
  test('the dead name and its parenthetical go together, and the objectless clause goes whole', () => {
    const sections = golem();
    // the rename: the row is already called Splintering Shove, and the old name is swept
    const renamed = { name: 'Splintering Shove (Recharge 5-6)', text: 'Strength Saving Throw: DC 17, one creature. Failure: the target is pushed 15 feet away.' };
    sections.Actions.push(renamed);
    sweepDeadName(sections, 'Splintering Charge', renamed, () => {});
    const ma = sections.Actions.find((e) => e.name === 'Multiattack').text;
    expect(ma).toBe('The golem makes two attacks, using Slam or Force Bolt in any combination.');
    expect(ma).not.toMatch(/\(Recharge/);        // no dangling parenthetical
    expect(ma).not.toMatch(/replace .* with\s*\./); // no objectless clause
    expect(ma).not.toMatch(/with\s*\(/);
    expect(ma.trim()).toMatch(/[.!?]$/);
  });

  test('an en-dashed recharge is swept the same way', () => {
    const sections = golem();
    sections.Actions[0].text = sections.Actions[0].text.replace('5-6', '5–6');
    sweepDeadName(sections, 'Splintering Charge', null, () => {});
    expect(sections.Actions[0].text).toBe('The golem makes two attacks, using Slam or Force Bolt in any combination.');
  });

  test('a 1/Day citation is swept the same way', () => {
    const sections = golem();
    sections.Actions[0].text = sections.Actions[0].text.replace('(Recharge 5-6)', '(1/Day)');
    sweepDeadName(sections, 'Splintering Charge', null, () => {});
    expect(sections.Actions[0].text).toBe('The golem makes two attacks, using Slam or Force Bolt in any combination.');
  });

  // THE SWEEP MUST STILL NOT FIRE when the cited row is alive: that guard predates this fix and
  // a parenthetical must not sneak past it.
  test('a name two rows still carry is not swept', () => {
    const sections = golem();
    sections.Actions.push({ name: 'Splintering Charge (Recharge 5-6)', text: 'It charges.' });
    const before = sections.Actions[0].text;
    sweepDeadName(sections, 'Splintering Charge', null, () => {});
    expect(sections.Actions[0].text).toBe(before);
  });

  // THE GAP, STATED AS A FACT RATHER THAN LEFT AS FOLKLORE. A "can replace one attack with a use
  // of X" citation is DROPPED even when a keeper is passed, because the keeper re-point inside the
  // Multiattack branch only handles the "makes N X attacks" count form. On a RENAME that means the
  // golem loses the option entirely instead of citing the row's new name — the sentence is clean,
  // but the sheet is poorer. Re-pointing it is a change to what a renamed row's citation becomes,
  // which is the owner's call; this test pins today's behaviour so the day it changes, it changes
  // here too.
  test('a replace-clause citation is dropped, not re-pointed, even with a keeper', () => {
    const sections = golem();
    const keeper = { name: 'Rubble Hurl (Recharge 5-6)', text: '*Ranged Attack Roll:* +10, range 60 ft. 14 (3d6 + 4) Bludgeoning damage.' };
    sections.Actions.push(keeper);
    sweepDeadName(sections, 'Splintering Charge', keeper, () => {});
    expect(sections.Actions[0].text).toBe('The golem makes two attacks, using Slam or Force Bolt in any combination.');
    expect(sections.Actions[0].text).not.toContain('Rubble Hurl');
  });

  // A NON-MULTIATTACK citation IS re-pointed to an attack keeper, parenthetical and all — that
  // path is unchanged by this fix and is what the Multiattack branch does not do.
  test('a citation outside the Multiattack re-points to the keeper', () => {
    const sections = golem();
    sections.Actions.push({ name: 'Grinding Advance', text: 'The golem moves 20 feet and makes one Splintering Charge attack.' });
    const keeper = { name: 'Rubble Hurl', text: '*Ranged Attack Roll:* +10, range 60 ft. 14 (3d6 + 4) Bludgeoning damage.' };
    sections.Actions.push(keeper);
    sweepDeadName(sections, 'Splintering Charge', keeper, () => {});
    expect(sections.Actions.find((e) => e.name === 'Grinding Advance').text).toContain('one Rubble Hurl attack');
  });
});
