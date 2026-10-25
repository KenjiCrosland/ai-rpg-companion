/**
 * HOW MANY TIMES A ROUND THIS ROW CAN SWING, recorded on the row.
 *
 * The count lived only inside the Multiattack sentence, so a weld guard that
 * needed it could not be built — the Wrackwork Ram shoved its own target out of
 * reach of its second swing. scale.mjs reads that sentence ONCE and stamps
 * `attacksPerRound`; every consumer reads the field.
 */
import { stampAttacksPerRound, pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const of = (s, n) => Object.values(s).flat().find((e) => e.name === n)?.attacksPerRound;

describe('stampAttacksPerRound', () => {
  it("print's single-row idiom gives that row the full count", () => {
    const s = { Actions: [{ name: 'Multiattack', text: 'The creature makes three Rend attacks.' }, { name: 'Rend', text: '*Melee Attack Roll:* +8, reach 5 ft. 10 damage.' }] };
    stampAttacksPerRound(s); expect(of(s, 'Rend')).toBe(3);
  });

  it('"in any combination" gives every cited row the count — either can be used N times', () => {
    const s = { Actions: [{ name: 'Multiattack', text: 'The creature makes two attacks, using Claw or Bite in any combination.' },
      { name: 'Claw', text: '*Melee Attack Roll:* +8, reach 5 ft. 10 damage.' }, { name: 'Bite', text: '*Melee Attack Roll:* +8, reach 5 ft. 10 damage.' }] };
    stampAttacksPerRound(s); expect(of(s, 'Claw')).toBe(2); expect(of(s, 'Bite')).toBe(2);
  });

  it('a row named only in "can replace one attack with" swings ONCE', () => {
    const s = { Actions: [{ name: 'Multiattack', text: 'The creature makes three Rend attacks. It can replace one attack with a use of Spew.' },
      { name: 'Rend', text: '*Melee Attack Roll:* +8, reach 5 ft. 10 damage.' }, { name: 'Spew', text: '*Ranged Attack Roll:* +8, range 30 ft. 10 damage.' }] };
    stampAttacksPerRound(s); expect(of(s, 'Rend')).toBe(3); expect(of(s, 'Spew')).toBe(1);
  });

  it('no Multiattack means one swing', () => {
    const s = { Actions: [{ name: 'Slam', text: '*Melee Attack Roll:* +5, reach 5 ft. 7 damage.' }] };
    stampAttacksPerRound(s); expect(of(s, 'Slam')).toBe(1);
  });

  it('a gate suffix on the row name does not hide the citation', () => {
    const s = { Actions: [{ name: 'Multiattack', text: 'The creature makes two Gore attacks.' }, { name: 'Gore (Recharge 5-6)', text: '*Melee Attack Roll:* +8, reach 5 ft. 10 damage.' }] };
    stampAttacksPerRound(s); expect(of(s, 'Gore (Recharge 5-6)')).toBe(2);
  });

  it('re-stamping after a rename leaves no stale count', () => {
    const s = { Actions: [{ name: 'Multiattack', text: 'The creature makes three Rend attacks.' }, { name: 'Rend', text: '*Melee Attack Roll:* +8, reach 5 ft. 10 damage.' }] };
    stampAttacksPerRound(s); expect(of(s, 'Rend')).toBe(3);
    s.Actions[0].text = 'The creature makes two Saber attacks.'; s.Actions[1].name = 'Saber';
    stampAttacksPerRound(s); expect(of(s, 'Saber')).toBe(2);
  });

  it('every scaled donor at CR 5+ carries a count on its attack rows', () => {
    for (const [cr, arch] of [[5, 'brute'], [8, 'skirmisher'], [11, 'lurker'], [17, 'brute']]) {
      const s = scaleDonor(pickDonor(cr, null, arch), cr, { mechanics: [] });
      const atk = Object.values(s.sections).flat().filter((e) => /Attack Roll/.test(e.text ?? ''));
      expect(atk.length).toBeGreaterThan(0);
      for (const e of atk) expect(e.attacksPerRound).toBeGreaterThanOrEqual(1);
    }
  });
});
