/**
 * Batch-13 regressions (2026-07-30, Reedwrack + Rustking Mycelium live
 * text): per-combat vocabulary, rider-save targeting contradictions,
 * Emanation form, parenthesized speed modes, and dangling area referents.
 * All anchors swept 0/329 (2024) and 0/327 (2014); the 2014 corpus's 50
 * "in that area" uses all define the area first. No prompt-string asserts.
 */
import { lintStatblock } from '../format-2024/lint.mjs';
import { applyCorrections } from '../format-2024/generate.mjs';

const chassis = { archetype: 'balanced', save_dc: 23, ac: 21 };
const rulesFor = (m, rule, opts = {}) =>
  lintStatblock(m, { chassis, edition: '2024', ...opts }).findings.filter((f) => f.rule === rule);
const wrap = (section, name, text) => ({ type: 'Monstrosity', sections: { [section]: [{ name, text }] } });

describe('per-combat-vocab (Reedwrack Sunken Lunge)', () => {
  test('flags and rewrites to per day', () => {
    const m = wrap('Traits', 'Sunken Lunge',
      'If the reedwrack is Invisible to a creature at the start of its turn, the target takes an extra 40 (9d8) damage. This trait can be used only once per combat.');
    const f = rulesFor(m, 'per-combat-vocab');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.sections.Traits[0].text).toContain('once per day');
    expect(fixed.sections.Traits[0].text).not.toContain('per combat');
  });
});

describe('rider-target-mismatch (Reedwrack live text)', () => {
  test('on-hit rider re-targeting becomes "the target" (Submerge and Strike)', () => {
    const m = wrap('Actions', 'Submerge and Strike (Recharge 5-6)',
      'The reedwrack lunges from concealment. It moves up to half its Speed without provoking Opportunity Attacks and then makes one Splintered Horn attack. On a hit, Strength Saving Throw: DC 23, one creature within 60 feet. Failure: The target has the Prone condition.');
    const f = rulesFor(m, 'rider-target-mismatch');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.sections.Actions[0].text).toContain('DC 23, the target. Failure:');
  });

  test('prose range wins over a contradicting skeleton range (Wracking Flense)', () => {
    const m = wrap('Actions', 'Wracking Flense (1/Day)',
      'The reedwrack tears at a creature within 5 feet of it with its splintered limbs. Dexterity Saving Throw: DC 23, one creature within 60 feet. Failure: 60 (11d10) Slashing damage. Success: Half damage.');
    const f = rulesFor(m, 'rider-target-mismatch');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.sections.Actions[0].text).toContain('one creature within 5 feet');
  });

  test('a consistent skeleton raises nothing', () => {
    const m = wrap('Actions', 'Bog Blast',
      'Constitution Saving Throw: DC 23, one creature within 60 feet. Failure: 31 (9d6) Poison damage.');
    expect(rulesFor(m, 'rider-target-mismatch')).toHaveLength(0);
  });
});

describe('emanation-form (Reedwrack Stifling Bog)', () => {
  test('radius and centered-on rewrite to the official form', () => {
    const m = wrap('Actions', 'Stifling Bog',
      'Constitution Saving Throw: DC 23, each creature in a 20-foot-radius Emanation centered on the reedwrack. Failure: 31 (9d6) Poison damage. Success: Half damage.');
    const f = rulesFor(m, 'emanation-form');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.sections.Actions[0].text).toContain('20-foot Emanation originating from the reedwrack');
  });

  test('the official form passes', () => {
    const m = wrap('Traits', 'Stench',
      'Constitution Saving Throw: DC 16, any creature that starts its turn in a 10-foot Emanation originating from the hezrou.');
    expect(rulesFor(m, 'emanation-form')).toHaveLength(0);
  });
});

describe('undefined-area (Rustking Fungal Decay)', () => {
  test('a dangling "that area" is a reject', () => {
    const m = wrap('Actions', 'Fungal Decay',
      'Constitution Saving Throw: DC 24, each creature in that area. Failure: The creature has the Poisoned condition until the start of its next turn.');
    const f = rulesFor(m, 'undefined-area');
    expect(f).toHaveLength(1);
    expect(f[0].severity).toBe('reject');
  });

  test('an area defined before the referent passes (official breath shape)', () => {
    const m = wrap('Actions', 'Spore Cloud',
      'The rustking releases spores in a 20-foot-radius Emanation centered on it. Constitution Saving Throw: DC 24, each creature in that area. Failure: The target has the Poisoned condition.');
    expect(rulesFor(m, 'undefined-area')).toHaveLength(0);
  });
});

describe('speed-paren (Rustking speed line)', () => {
  test('parenthesized burrow flattens to comma form', () => {
    const m = { type: 'Plant', speed: '20 ft. (Burrow 20 ft.)', sections: {} };
    const f = lintStatblock(m, { chassis, edition: '2024' }).findings.filter((x) => x.rule === 'speed-paren');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.speed).toBe('20 ft., Burrow 20 ft.');
  });

  test('hover parenthetical is official and passes', () => {
    const m = { type: 'Undead', speed: '10 ft., Fly 40 ft. (hover)', sections: {} };
    expect(lintStatblock(m, { chassis, edition: '2024' }).findings.filter((x) => x.rule === 'speed-paren')).toHaveLength(0);
  });
});

describe('Sussanyx live findings (batch 13b)', () => {
  test('an undefined named zone is a reject (Spore Cloud\'s phantom cloud)', () => {
    const m = wrap('Actions', 'Spore Cloud',
      'Constitution Saving Throw: DC 25, any creature that enters the cloud for the first time on a turn or starts its turn there. Failure: 14 (4d6) Poison damage. Success: Half damage only.');
    const f = rulesFor(m, 'undefined-area');
    expect(f).toHaveLength(1);
    expect(f[0].severity).toBe('reject');
  });

  test('a defined cloud passes', () => {
    const m = wrap('Actions', 'Spore Cloud',
      'Sussanyx exhales spores that fill a 20-foot Emanation originating from it. Constitution Saving Throw: DC 25, any creature that enters the cloud or starts its turn there. Failure: 14 (4d6) Poison damage.');
    expect(rulesFor(m, 'undefined-area')).toHaveLength(0);
  });

  test('an orphan repeat-save sentence in a saveless trait is stripped (Spore Saturation)', () => {
    const m = wrap('Traits', 'Spore Saturation',
      'When Sussanyx hits a creature with a Talon attack while it has the Restrained condition from Spore Breath, the attack scores a critical hit on a roll of 19 or 20 on the d20. The target repeats the save at the end of each of its turns, ending the effect on a success.');
    const f = rulesFor(m, 'orphan-repeat-save');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.sections.Traits[0].text).toContain('critical hit on a roll of 19 or 20 on the d20.');
    expect(fixed.sections.Traits[0].text).not.toContain('repeats the save');
  });

  test('a repeat-save sentence WITH its save present is untouched (Spore Breath shape)', () => {
    const m = wrap('Actions', 'Spore Breath (Recharge 5-6)',
      'Constitution Saving Throw: DC 25, each creature in the Cone. Failure: 42 (12d6) Poison damage, and the target has the Restrained condition. The target can repeat the save at the end of each of its turns, ending the condition on a success.');
    expect(rulesFor(m, 'orphan-repeat-save')).toHaveLength(0);
  });
});
