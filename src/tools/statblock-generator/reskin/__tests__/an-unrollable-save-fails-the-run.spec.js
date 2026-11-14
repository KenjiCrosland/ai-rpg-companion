/**
 * A SAVE A GM CANNOT ROLL FAILS THE RUN (owner's ruling, 2026-11-13).
 *
 * The lint keeps `save-unrollable` at `audit` so it deletes nothing — deleting the row
 * takes a monk's whole Unarmed Strike with it, damage and all. The CHECK RUN is where
 * it bites, because "zero broken text" sits in the release bar and nothing else
 * guarded it.
 *
 * Wiring it turned up why the defect survived two separate guards. The monk's Unarmed
 * Strike is stamped `print: true` — it is the Spy's row, renamed by the class-weapon
 * pass — and both the audit and the checker defer to that stamp. The audit filed it as
 * "a finding on print, so no sheet-level fix runs"; the checker dropped it before it
 * could fail anything. Print never wrote "Unarmed Strike with a dangling Constitution
 * save".
 *
 * So the print exemption is narrowed for this rule alone, and only because it is
 * MEASURED: print ships no unrollable save in 329 monsters of srd52 or 970 rows of the
 * 2014 corpus (asserted in `a-save-a-gm-can-roll.spec.js`). On such a row the text is
 * ours whatever the stamp says.
 */
import { checkBlock } from '../checker.mjs';

const monkRow = (tail) => ({
  name: 'Unarmed Strike',
  text: `*Melee Attack Roll:* +7, reach 5 ft. 21 (4d8 + 3) Bludgeoning damage. Once on each of the warden's turns when it hits with this attack, the target is subjected to the following effect. *Constitution Saving Throw*: DC 14.${tail}`,
  print: true,       // the stamp that hid it: the Spy's row, renamed
  printNamed: true,
});

const sheet = (tail) => ({
  name: 'Sarn Vethis',
  format: '2024',
  cr: 5,
  challenge_rating: 'CR 5 (1,800 XP)',
  pb: 3,
  ac: 15,
  hp: 90,
  stats: {
    STR: 14, DEX: 16, CON: 14, INT: 10, WIS: 14, CHA: 10,
  },
  speed: '30 ft.',
  type: 'Humanoid',
  archetype: 'skirmisher',
  generation: { path: 'reskin', archetype: 'skirmisher' },
  sections: { Actions: [monkRow(tail)] },
});

const saveFindings = (m) => Object.values(checkBlock(m).gates)
  .flatMap((g) => g.findings ?? [])
  .filter((f) => /save-unrollable/.test(f.rule));

describe('an unrollable save fails the run', () => {
  test('the monk as the GM forty shipped it fails the adjudicability gate', () => {
    const r = checkBlock(sheet(''));
    expect(r.fails).toContain('adjudicability');
    const f = saveFindings(sheet(''));
    expect(f).toHaveLength(1);
    expect(f[0].severity).toBe('fail');
    expect(f[0].message).toMatch(/no outcome/);
  });

  test('the same row with its outcome restored does not fail', () => {
    const whole = sheet(' *Failure:* The target has the Stunned condition until the end of its next turn.');
    expect(saveFindings(whole)).toHaveLength(0);
    expect(checkBlock(whole).fails).not.toContain('adjudicability');
  });

  test('the print stamp does not excuse it — that is what hid it from two guards', () => {
    // identical row, print stamp removed: it must fail either way, so the rule cannot
    // be dodged by how a row came to be named
    const unstamped = sheet('');
    const row = unstamped.sections.Actions[0];
    delete row.print; delete row.printNamed;
    expect(saveFindings(unstamped)).toHaveLength(1);
  });
});
