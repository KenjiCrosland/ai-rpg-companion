/**
 * Legendary reuse must not replay an ungated area effect or an oversized save
 * nova (docs/investigations/01-legendary-costing.md). Behavioral: real lint +
 * applyCorrections. No prompt-string asserts.
 */
import { lintStatblock } from '../format-2024/lint.mjs';
import { applyCorrections } from '../format-2024/generate.mjs';

const chassis = { archetype: 'balanced', save_dc: 23 };
const opts = { chassis, edition: '2024', perAttack: 30 };
const reuseFindings = (m) => lintStatblock(m, opts).findings.filter((f) => f.rule === 'legendary-reuse');

// A block with an attack action (retarget target), one AoE save, one big save.
const block = (legendaryText) => ({
  type: 'Aberration',
  sections: {
    Actions: [
      { name: 'Multiattack', text: 'The creature makes two Rend attacks.' },
      { name: 'Rend', text: '*Melee Attack Roll:* +12, reach 5 ft. 20 (3d8 + 7) Slashing damage.' },
      { name: 'Psychic Pulse', text: '*Intelligence Saving Throw*: DC 23, each creature in a 20-foot-radius sphere. *Failure:* 84 (13d12) Psychic damage. *Success:* Half damage.' },
      { name: 'Buried Grasp', text: '*Strength Saving Throw*: DC 23, one creature within 30 feet. *Failure:* 55 (10d10) Bludgeoning damage and the target has the Restrained condition (escape DC 21). *Success:* Half damage.' },
    ],
    'Legendary Actions': [{ name: 'Strike', text: legendaryText }],
  },
});

describe('legendary-reuse lint rule', () => {
  test('flags reuse of an ungated area save effect', () => {
    expect(reuseFindings(block('The creature uses Psychic Pulse.'))).toHaveLength(1);
  });

  test('flags reuse of an oversized single-target save nova', () => {
    // 55 damage vs perAttack 30 → ceiling 45; over.
    expect(reuseFindings(block('The creature uses Buried Grasp.'))).toHaveLength(1);
  });

  test('passes reuse of a single-target attack', () => {
    expect(reuseFindings(block('The creature makes one Rend attack.'))).toHaveLength(0);
  });

  test('passes reuse of Spellcasting', () => {
    const m = block('The creature uses Spellcasting to cast Fireball.');
    expect(reuseFindings(m)).toHaveLength(0);
  });

  test('passes reuse of a Recharge-gated action', () => {
    const m = block('The creature uses Psychic Pulse.');
    m.sections.Actions[2].name = 'Psychic Pulse (Recharge 5-6)';
    expect(reuseFindings(m)).toHaveLength(0);
  });

  test('does not fire without perAttack (corpus sweep exempt)', () => {
    const m = block('The creature uses Psychic Pulse.');
    expect(lintStatblock(m, { chassis, edition: '2024' }).findings.filter((f) => f.rule === 'legendary-reuse')).toHaveLength(0);
  });
});

describe('legendary-reuse correction (retarget to an attack)', () => {
  test('rewrites "uses Psychic Pulse" to "makes one Rend attack"', () => {
    const m = block('The creature uses Psychic Pulse.');
    const fixed = applyCorrections(m, reuseFindings(m), { chassis });
    expect(fixed.sections['Legendary Actions'][0].text).toBe('The creature makes one Rend attack.');
    expect(reuseFindings(fixed)).toHaveLength(0);
  });

  test('retargets an oversized save nova too', () => {
    const m = block('The creature uses Buried Grasp.');
    const fixed = applyCorrections(m, reuseFindings(m), { chassis });
    expect(fixed.sections['Legendary Actions'][0].text).toContain('makes one Rend attack');
    expect(reuseFindings(fixed)).toHaveLength(0);
  });
});
