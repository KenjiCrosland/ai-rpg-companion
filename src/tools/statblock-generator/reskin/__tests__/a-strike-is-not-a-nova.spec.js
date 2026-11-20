/**
 * A STRIKE IS NOT A NOVA (owner's ruling, 2026-11-20; fixes D1 and D2).
 *
 * A sheet carries ONE Recharge nova. A strike is gated, carries a saving throw and rolls damage
 * dice, so every site that counts or strips novas claimed it on sight — and the 18 November ruling
 * puts a Recharge on a strike that takes a creature's turn away. The two rules collided and the
 * strike always lost: the drake shipped "Stagger-Wake … the target has the Stunned condition"
 * at will, on 3 of 3 probe rolls and again on the two-sheet check after the first fix.
 *
 * THE FIRST FIX TAUGHT ONE SITE OF FOUR. `hasChassisNova` and the strip beside the value check
 * learned it; the pass at ship, in `settleSheetBudgets`, did not, and un-gated the strike anyway
 * ("one nova at ship"). That is what these tests are for: the ruling is one predicate,
 * `exemptFromOneNova`, and the test drives the pass that was missed, not the one that was fixed.
 *
 * AND THE PRICING NEEDED THE SAME RULING. `valueCheck` reads a gate as "this is a nova" and sets
 * the floor to the whole Multiattack. A strike replaces ONE attack — its gate says how often it
 * may be taken, not how much of the round it costs — so the moment it kept its Recharge it was
 * asked for 19.9 against the 9.9 it can deliver, a floor it can never clear.
 */
import { settleSheetBudgets, exemptFromOneNova } from '../generate.mjs';
import { valueCheck } from '../templates.mjs';

const scaled = { cr: 5, dc: 15, pb: 3, per_hit: 11, mod: { STR: 4 } };
const GATE = / \(Recharge [\d–-]+\)$/;

/** the drake as it stands when the ship pass runs: a chassis nova AND a gated strike */
const drake = () => ({
  Actions: [
    { name: 'Multiattack', text: 'The drake makes two Horn attacks. It can replace one attack with a use of Charge-Wake.' },
    { name: 'Horn', text: '*Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Piercing damage.' },
    { name: 'Thunder Wall (Recharge 5-6)', text: '*Dexterity Saving Throw*: DC 15, each creature in a 30-foot Cone. *Failure:* 27 (6d8) Thunder damage. *Success:* Half damage only.' },
    { name: 'Charge-Wake (Recharge 5-6)', strike: true, authored: true, authoredSeat: true, gate: 'Recharge 5-6', text: '*Melee Attack Roll:* +7, reach 5 ft. 11 (2d6 + 4) Piercing damage plus 7 (2d6) Thunder damage. If the target is a creature, it is subjected to the following effect. *Constitution Saving Throw*: DC 15. *Failure:* The target has the Stunned condition until the end of its next turn.' },
  ],
});
const rowNamed = (sections, bare) => (sections.Actions ?? []).find((r) => String(r.name).replace(GATE, '') === bare);

describe('D1 — the one-nova rule never acts on a strike, at any of its sites', () => {
  test('the ruling is ONE predicate, so a site cannot be taught and the next one missed', () => {
    expect(exemptFromOneNova({ strike: true })).toBe(true);
    expect(exemptFromOneNova({ name: 'Thunder Wall (Recharge 5-6)' })).toBe(false);
    expect(exemptFromOneNova(null)).toBe(false);
  });

  test('THE PASS AT SHIP keeps the strike gated beside the chassis nova — the site the first fix missed', () => {
    const sections = drake();
    // the subjects are present, and both gated, which is the state that used to be impossible
    expect(rowNamed(sections, 'Charge-Wake').name).toMatch(GATE);
    expect(rowNamed(sections, 'Thunder Wall').name).toMatch(GATE);

    settleSheetBudgets({ sections, scaled, cr: 5 });

    expect(rowNamed(sections, 'Charge-Wake').name).toBe('Charge-Wake (Recharge 5-6)');
    expect(rowNamed(sections, 'Thunder Wall').name).toBe('Thunder Wall (Recharge 5-6)');
  });

  test('and a SECOND true nova is still un-gated by it — the rule is intact for everything else', () => {
    const sections = drake();
    sections.Actions = sections.Actions.filter((r) => !r.strike);
    sections.Actions.push({ name: 'Rolling Peal (Recharge 5-6)', gate: 'Recharge 5-6', text: '*Constitution Saving Throw*: DC 15, each creature in a 20-foot Emanation. *Failure:* 22 (4d10) Thunder damage.' });
    expect(rowNamed(sections, 'Rolling Peal').name).toMatch(GATE);   // present and gated

    settleSheetBudgets({ sections, scaled, cr: 5 });

    const kept = [rowNamed(sections, 'Thunder Wall'), rowNamed(sections, 'Rolling Peal')].filter((r) => GATE.test(r.name));
    expect(kept).toHaveLength(1);                                     // one nova a sheet, still
  });
});

describe('D2 — a strike is priced against the one attack it replaces', () => {
  const sections = drake();
  const strike = rowNamed(sections, 'Charge-Wake');
  const nova = rowNamed(sections, 'Thunder Wall');

  test('a GATED STRIKE trades for one attack, not for the round', () => {
    const vc = valueCheck(strike, { scaled, sections, section: 'Actions', cr: 5 });
    expect(vc.replaced).toMatch(/one attack of \d/);
    expect(vc.replaced).not.toMatch(/whole Multiattack/);
  });

  test('a GATED NOVA still trades for the whole Multiattack — the gate means what it always meant there', () => {
    const vc = valueCheck(nova, { scaled, sections, section: 'Actions', cr: 5 });
    expect(vc.replaced).toMatch(/whole Multiattack/);
  });

  test("and the strike's floor is the one it cleared before it was allowed to keep its gate", () => {
    const gatedVc = valueCheck(strike, { scaled, sections, section: 'Actions', cr: 5 });
    const ungated = { ...strike, name: 'Charge-Wake', gate: undefined };
    const ungatedVc = valueCheck(ungated, { scaled, sections, section: 'Actions', cr: 5 });
    expect(gatedVc.floor).toBeCloseTo(ungatedVc.floor, 5);            // the gate changes how OFTEN, not what it costs
  });
});
