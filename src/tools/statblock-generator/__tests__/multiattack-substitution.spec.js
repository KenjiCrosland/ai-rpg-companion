/**
 * A save entry woven into Multiattack must not exceed 2× the per-attack budget
 * — the single-target save number is a standalone action's whole-turn budget
 * (Strokeg field finding; official substitution ceiling is Lamia at 1.86×).
 * Behavioral: real lint + applyCorrections. No prompt-string asserts.
 */
import { lintStatblock } from '../format-2024/lint.mjs';
import { applyCorrections } from '../format-2024/generate.mjs';

const chassis = { archetype: 'defender', save_dc: 24 };
const opts = { chassis, edition: '2024', perAttack: 36 }; // cap = 72
const subFindings = (m) => lintStatblock(m, opts).findings.filter((f) => f.rule === 'multiattack-substitution');

// Strokeg-shaped block: 36-damage attack, legal save (Binding Spores, no dmg),
// oversized save nova (Ward's Rebuke, 104 > 72).
const block = (multiText) => ({
  type: 'Plant',
  sections: {
    Actions: [
      { name: 'Multiattack', text: multiText },
      { name: 'Spore-Tendril', text: '*Melee Attack Roll:* +16, reach 10 ft. 36 (6d8 + 9) Poison damage.' },
      { name: 'Binding Spores', text: '*Constitution Saving Throw*: DC 24, one creature within 60 feet. *Failure:* The target has the Restrained condition until the end of its next turn. At the end of each of its turns, the target repeats the save, ending the condition on a success.' },
      { name: "Ward's Rebuke", text: "*Constitution Saving Throw*: DC 24, one creature within 60 feet. *Failure:* 104 (16d12) Psychic damage. *Success:* Half damage." },
    ],
  },
});

describe('multiattack-substitution lint rule', () => {
  test('flags the Strokeg pattern (oversized save nova in an alternation)', () => {
    const m = block("The sentinel makes three Spore-Tendril attacks, one of which it can replace with a use of Binding Spores or Ward's Rebuke.");
    const f = subFindings(m);
    expect(f).toHaveLength(1);
    expect(f[0].expected).toBe("Ward's Rebuke");
  });

  test('passes a no-damage save substitution (Binding Spores alone)', () => {
    const m = block('The sentinel makes three Spore-Tendril attacks, one of which it can replace with a use of Binding Spores.');
    expect(subFindings(m)).toHaveLength(0);
  });

  test('passes damage at or under 2× per-attack (official Lamia scale)', () => {
    const m = block("The sentinel makes three Spore-Tendril attacks and can use Ward's Rebuke in place of one attack.");
    m.sections.Actions[3].text = "*Constitution Saving Throw*: DC 24, one creature within 60 feet. *Failure:* 72 (16d8) Psychic damage. *Success:* Half damage.";
    expect(subFindings(m)).toHaveLength(0);
  });

  test('passes a Recharge-gated weave (Shimmerstone "if available" shape)', () => {
    const m = block("The sentinel makes three Spore-Tendril attacks and uses Ward's Rebuke if available.");
    m.sections.Actions[3].name = "Ward's Rebuke (Recharge 5-6)";
    expect(subFindings(m)).toHaveLength(0);
  });

  test('flags the "in place of one attack" phrasing too', () => {
    const m = block("The sentinel makes three Spore-Tendril attacks and can use Ward's Rebuke in place of one attack.");
    expect(subFindings(m)).toHaveLength(1);
  });

  test('does not fire without perAttack (corpus sweep exempt)', () => {
    const m = block("The sentinel makes three Spore-Tendril attacks, one of which it can replace with a use of Ward's Rebuke.");
    expect(lintStatblock(m, { chassis, edition: '2024' }).findings.filter((f) => f.rule === 'multiattack-substitution')).toHaveLength(0);
  });
});

describe('multiattack-substitution correction', () => {
  test('drops only the offender from an "X or Y" alternation', () => {
    const m = block("The sentinel makes three Spore-Tendril attacks, one of which it can replace with a use of Binding Spores or Ward's Rebuke.");
    const fixed = applyCorrections(m, subFindings(m), { chassis });
    expect(fixed.sections.Actions[0].text).toBe('The sentinel makes three Spore-Tendril attacks, one of which it can replace with a use of Binding Spores.');
    expect(subFindings(fixed)).toHaveLength(0);
  });

  test('removes the whole clause when the offender is the sole target', () => {
    const m = block("The sentinel makes three Spore-Tendril attacks, one of which it can replace with a use of Ward's Rebuke.");
    const fixed = applyCorrections(m, subFindings(m), { chassis });
    expect(fixed.sections.Actions[0].text).toBe('The sentinel makes three Spore-Tendril attacks.');
    expect(subFindings(fixed)).toHaveLength(0);
  });

  test('removes an "in place of one attack" clause', () => {
    const m = block("The sentinel makes three Spore-Tendril attacks and can use Ward's Rebuke in place of one attack.");
    const fixed = applyCorrections(m, subFindings(m), { chassis });
    expect(fixed.sections.Actions[0].text).toBe('The sentinel makes three Spore-Tendril attacks.');
    expect(subFindings(fixed)).toHaveLength(0);
  });

  test('the standalone action itself is untouched', () => {
    const m = block("The sentinel makes three Spore-Tendril attacks, one of which it can replace with a use of Ward's Rebuke.");
    const fixed = applyCorrections(m, subFindings(m), { chassis });
    expect(fixed.sections.Actions[3].text).toContain('104 (16d12)');
  });
});
