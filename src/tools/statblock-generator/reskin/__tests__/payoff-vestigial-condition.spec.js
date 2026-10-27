/**
 * A PAYOFF ROW MUST NOT IMPOSE THE CONDITION IT REQUIRES, AND A DAMAGE-DOMINANT
 * ROW IS NEVER A STRENGTH SAVE (owner's GM read of save10-2026-10-27T00-36-54).
 *
 * The read found two wrong saves and diagnosed the mechanism exactly:
 *
 *   Killing Cold Wake. Strength Saving Throw: DC 19, one creature within 60 feet
 *     that has the Prone condition. Failure: 84 (13d12) Cold damage, and the
 *     target has the Prone condition.
 *
 * `condition-payoff` requires a condition (`consumed_condition`) and imposes a
 * minor one (`condition_minor`). Nothing stopped the engine choosing the SAME
 * condition for both, so the row re-imposed Prone on a target that must already
 * be Prone — a dead clause — and then A2 read that dead `imposes: Prone` and
 * paired it with print's Strength, on a row whose point is 84 Cold damage.
 *
 * Two fixes, at two layers:
 *  1. the condition the row imposes is chosen from the closed list MINUS the one
 *     it requires, so the clause can never be vestigial;
 *  2. `saveStatsFor` drops Strength from a damage-dominant row's acceptable
 *     stats unless the row MOVES its target (print's one such row is the Centaur
 *     Trooper's Trampling Charge, which is `movement: true` here). The owner's
 *     rule: "No STR save on a damage-dominant row."
 */
import { saveStatsFor, renderTemplate, TEMPLATE_BY_ID } from '@/tools/statblock-generator/reskin/templates.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const ctx = (cr = 15) => ({ scaled: scaleDonor(pickDonor(cr, null, 'brute'), cr, { mechanics: [] }), archetype: 'brute', cr, imposed: ['Prone'], conditionMinor: 'Prone', name: 'C', energy: 'Cold', mix: 'both', meleeName: 'Slam' });
const plain = (t) => String(t).replace(/\*/g, '');

describe('no Strength save on a damage-dominant row', () => {
  it('a damage-dominant row that imposes Prone does not accept Strength', () => {
    const want = saveStatsFor({ imposes: 'Prone', damageDominant: true });
    expect(want).not.toContain('Strength');
    expect(want[0]).toBe('Dexterity');
  });

  it('...unless the row moves its target — print\'s Trampling Charge', () => {
    expect(saveStatsFor({ imposes: 'Prone', damageDominant: true, movement: true })[0]).toBe('Strength');
  });

  it('a Prone row with no damage still saves by Strength', () => {
    expect(saveStatsFor({ imposes: 'Prone', damageDominant: false })[0]).toBe('Strength');
  });

  it('the other arms are unchanged', () => {
    expect(saveStatsFor({ imposes: 'Frightened', damageDominant: true })).toEqual(['Dexterity', 'Constitution']);
    expect(saveStatsFor({ imposes: 'Poisoned', damageDominant: true })).toEqual(['Constitution', 'Dexterity']);
    expect(saveStatsFor({ imposes: 'Frightened', damageDominant: false })).toEqual(['Wisdom', 'Charisma']);
  });
});

describe('a payoff row never imposes what it requires', () => {
  const payoff = () => TEMPLATE_BY_ID.get('condition-payoff');

  it('the imposed condition differs from the required one, so no clause is dead', () => {
    // the real case: the call named Prone as the condition the sheet supplies
    const r = renderTemplate(payoff(), ctx(15), { consumed_condition: 'Prone', condition_minor: 'Prone' });
    const text = plain(r.text);
    const required = (/that has the (\w+) condition/.exec(text) ?? [])[1];
    const imposedInText = [...text.matchAll(/the target has the (\w+) condition/g)].map((m) => m[1]);
    expect(required).toBe('Prone');
    for (const c of imposedInText) expect(c).not.toBe(required);
    if (r.imposes) expect(r.imposes).not.toBe('Prone');
  });

  it('a payoff whose required condition is NOT the proposed minor one is untouched', () => {
    const r = renderTemplate(payoff(), ctx(15), { consumed_condition: 'Frightened', condition_minor: 'Poisoned' });
    const text = plain(r.text);
    expect(text).toMatch(/that has the Frightened condition/);
    if (/the target has the (\w+) condition/.test(text)) expect(r.imposes).toBe('Poisoned');
  });

  it('the save stat follows the row, not the dead clause: 84 Cold is not Strength', () => {
    const r = renderTemplate(payoff(), ctx(15), { consumed_condition: 'Prone', condition_minor: 'Prone' });
    expect(plain(r.text)).not.toMatch(/Strength Saving Throw/);
  });
});
