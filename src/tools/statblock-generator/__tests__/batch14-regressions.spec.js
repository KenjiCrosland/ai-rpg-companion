/**
 * Batch-14 regressions (2026-07-31, Gongthokk live text): one-dimensional
 * Lines, "within a" Emanations, flat damage bonuses, immunity-restating
 * clauses, and the missing Languages line. Sweeps: 0/329 + 0/327 on every
 * anchor; the immunities gate on "cannot be X" spares the Mummy Lord's
 * transformation clause (the one official near-miss).
 */
import { lintStatblock } from '../format-2024/lint.mjs';
import { applyCorrections } from '../format-2024/generate.mjs';
import { renderStatblock2024 } from '../format-2024/render.mjs';

const chassis = { archetype: 'brute', save_dc: 16, ac: 16 };
const rulesFor = (m, rule, opts = {}) =>
  lintStatblock(m, { chassis, edition: '2024', ...opts }).findings.filter((f) => f.rule === rule);
const wrap = (section, name, text, extra = {}) =>
  ({ type: 'Aberration', sections: { [section]: [{ name, text }] }, ...extra });

describe('line-dimensions (Porcelain Shard Spray)', () => {
  test('a one-dimensional Line gains the official 5-foot width', () => {
    const m = wrap('Bonus Actions', 'Porcelain Shard Spray',
      'The gongthokk stomps, sending a spray of razor-sharp porcelain shards in a 10-foot Line originating from the gongthokk in a direction of its choice. Dexterity Saving Throw: DC 16, each creature in the Line. Failure: 7 (2d6) Slashing damage. Success: Half damage only.');
    const f = rulesFor(m, 'line-dimensions');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.sections['Bonus Actions'][0].text).toContain('10-foot-long, 5-foot-wide Line');
    expect(rulesFor(fixed, 'line-dimensions')).toHaveLength(0);
  });

  test('a fully-dimensioned Line passes (official Behir shape)', () => {
    const m = wrap('Actions', 'Lightning Breath (Recharge 5-6)',
      'Dexterity Saving Throw: DC 16, each creature in a 90-foot-long, 5-foot-wide Line. Failure: 66 (12d10) Lightning damage. Success: Half damage.');
    expect(rulesFor(m, 'line-dimensions')).toHaveLength(0);
  });
});

describe('emanation-form: "within a" targeting (Psychic Burst)', () => {
  test('within → in, deterministically', () => {
    const m = wrap('Actions', 'Psychic Burst (Recharge 5-6)',
      'Wisdom Saving Throw: DC 16, each creature within a 15-foot Emanation originating from the gongthokk. Failure: 21 (6d6) Psychic damage, and the target has the Frightened condition until the end of its next turn. Success: Half damage only.');
    const f = rulesFor(m, 'emanation-form');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.sections.Actions[0].text).toContain('each creature in a 15-foot Emanation');
  });
});

describe('flat-damage-bonus (Echoing Shards)', () => {
  test('a flat bonus to damage rolls is a reject for the fix ladder', () => {
    const m = wrap('Traits', 'Echoing Shards',
      'When the gongthokk is Bloodied, its movement Speed increases by 10 ft., and it gains a +2 bonus to damage rolls.');
    const f = rulesFor(m, 'flat-damage-bonus');
    expect(f).toHaveLength(1);
    expect(f[0].severity).toBe('reject');
  });

  test('extra dice riders pass (the official shape)', () => {
    const m = wrap('Traits', 'Pack Tactics',
      'While Bloodied, the gongthokk deals an extra 4 (1d8) Bludgeoning damage with its melee attacks.');
    expect(rulesFor(m, 'flat-damage-bonus')).toHaveLength(0);
  });
});

describe('immunity-restated-clause (Crunch)', () => {
  test('a clause restating the Immunities line is flagged', () => {
    const m = wrap('Traits', 'Crunch',
      'The gongthokk has Advantage on attack rolls against a creature that is Frightened of it. Additionally, the gongthokk cannot be Frightened and is immune to effects that would cause it to retreat.',
      { immunities: 'Charmed, Frightened' });
    expect(rulesFor(m, 'immunity-restated-clause')).toHaveLength(1);
  });

  test('the Mummy Lord form clause passes: condition NOT on the line', () => {
    const m = wrap('Legendary Actions', 'Whirlwind of Sand (Costs 2 Actions)',
      'The mummy lord transforms into a whirlwind of sand. While in this form, it can\'t be Grappled or Restrained.',
      { immunities: 'Necrotic; Charmed, Exhaustion' });
    expect(rulesFor(m, 'immunity-restated-clause')).toHaveLength(0);
  });
});

describe('languages line always renders (Gongthokk shipped without one)', () => {
  const base = {
    name: 'Gongthokk', size: 'Large', type: 'Aberration', alignment: 'Chaotic Evil',
    ac: 16, hp: 237, hp_formula: '25d10 + 100', speed: '40 ft.',
    stats: { STR: 20, DEX: 10, CON: 18, INT: 2, WIS: 8, CHA: 5 },
    cr: 10, cr_str: '10', pb: 4, xp: 5900, initiative_bonus: 0,
    sections: { Actions: [{ name: 'Slam', text: 'Melee Attack Roll: +9, reach 5 ft. 36 (7d8 + 5) Bludgeoning damage.' }] },
  };

  test('markdown renderer emits the official "None" form for a missing field', () => {
    expect(renderStatblock2024(base)).toContain('**Languages** None');
  });

  test('a present languages field renders as-is', () => {
    expect(renderStatblock2024({ ...base, languages: 'Deep Speech' })).toContain('**Languages** Deep Speech');
  });
});
