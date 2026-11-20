/**
 * A RENAMED ROW KEEPS ITS CITATION (owner's ruling, 2026-11-20; fix D3), AND THE END-OF-LINE LINT.
 *
 * `name follows content` renamed the drake's strike Charge-Wake -> Stagger-Wake. `sweepDeadName`
 * was handed the dead name, could not tell a rename from a removal — in both cases nothing on the
 * sheet answers to the old name — stripped it, and the "a replacement clause without its object
 * is nonsense" rule then deleted the clause. The finished sheet read "The drake makes two Horn
 * attacks." with a stunning strike below it that nothing offered.
 *
 * The lint is here too because it is the same defect seen from the other end: all three of that
 * day's faults were a later pass undoing an earlier one, and none showed in the seat's trace.
 */
import { sweepDeadName } from '../generate.mjs';
import { lintSheet } from '../sheet-lints.mjs';

const sheet = (maText, extra = {}) => ({
  name: 'Thunderwall Drake',
  sections: {
    Actions: [
      { name: 'Multiattack', text: maText },
      { name: 'Horn', text: '*Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Piercing damage.' },
      { name: 'Stagger-Wake', strike: true, authoredSeat: true, replacementClause: true, text: '*Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Piercing damage. *Constitution Saving Throw*: DC 15. *Failure:* The target has the Stunned condition until the end of its next turn.', ...extra },
    ],
  },
});
const maOf = (s) => s.sections.Actions.find((r) => r.name === 'Multiattack').text;
const hits = (s, rule) => lintSheet(s).filter((h) => h.rule === rule);

describe('D3 — a rename re-points, a removal drops', () => {
  test('THE RENAME: the clause follows the row to its new name', () => {
    const s = sheet('The drake makes two Horn attacks. It can replace one attack with a use of Charge-Wake.');
    const renamedRow = s.sections.Actions.find((r) => r.strike);
    expect(maOf(s)).toContain('Charge-Wake');                       // the subject is present

    sweepDeadName(s.sections, 'Charge-Wake', renamedRow, () => {}, { renamed: true });

    expect(maOf(s)).toContain('It can replace one attack with a use of Stagger-Wake.');
    expect(maOf(s)).not.toContain('Charge-Wake');
  });

  test('THE REMOVAL is untouched: a row that actually left loses its clause', () => {
    const s = sheet('The drake makes two Horn attacks. It can replace one attack with a use of Charge-Wake.');
    s.sections.Actions = s.sections.Actions.filter((r) => !r.strike);  // the row has gone

    sweepDeadName(s.sections, 'Charge-Wake', null, () => {});

    expect(maOf(s)).toBe('The drake makes two Horn attacks.');
    expect(maOf(s)).not.toContain('replace one attack');
  });

  test('a rename re-points a bare mention in the attack list too, not only the clause', () => {
    const s = sheet('The drake makes two attacks, using Horn or Charge-Wake in any combination.');
    sweepDeadName(s.sections, 'Charge-Wake', s.sections.Actions.find((r) => r.strike), () => {}, { renamed: true });
    expect(maOf(s)).toContain('Stagger-Wake');
  });
});

describe('the end-of-line lint counts what the later passes undid', () => {
  test('uncited-replacement-row: 1 when the clause is gone, 0 when it is there', () => {
    const gone = sheet('The drake makes two Horn attacks.');
    expect(hits(gone, 'uncited-replacement-row')).toHaveLength(1);
    expect(hits(gone, 'uncited-replacement-row')[0].message).toMatch(/Stagger-Wake/);

    const cited = sheet('The drake makes two Horn attacks. It can replace one attack with a use of Stagger-Wake.');
    expect(hits(cited, 'uncited-replacement-row')).toHaveLength(0);
  });

  test('ungated-turn-denial: 1 for a stunning strike with no Recharge, 0 once it carries one', () => {
    const bare = sheet('The drake makes two Horn attacks. It can replace one attack with a use of Stagger-Wake.');
    expect(hits(bare, 'ungated-turn-denial')).toHaveLength(1);

    const gated = sheet('The drake makes two Horn attacks. It can replace one attack with a use of Stagger-Wake if available.', { name: 'Stagger-Wake (Recharge 5-6)' });
    expect(hits(gated, 'ungated-turn-denial')).toHaveLength(0);
  });

  test('and neither fires on a sheet with no strike and no clause', () => {
    const plain = { name: 'Plain', sections: { Actions: [
      { name: 'Multiattack', text: 'The drake makes two Horn attacks.' },
      { name: 'Horn', text: '*Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Piercing damage.' },
    ] } };
    expect(hits(plain, 'uncited-replacement-row')).toHaveLength(0);
    expect(hits(plain, 'ungated-turn-denial')).toHaveLength(0);
  });
});
