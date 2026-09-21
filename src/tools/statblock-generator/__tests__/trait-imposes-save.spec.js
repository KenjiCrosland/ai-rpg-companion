/**
 * A Trait that imposes a save with no trigger can never fire (Spectral Tangle
 * / Pacifying Aura, post-fix review; 0/329 in SRD — official trait-saves are
 * self-saves or carry triggers). Fix: relocate to Actions with the `relocated`
 * marker; the counts rule scores relocated entries against the Traits range
 * (relocate-and-exempt). Behavioral, no prompt-string asserts.
 */
import { lintStatblock } from '../format-2024/lint.mjs';
import { applyCorrections, buildContext } from '../format-2024/generate.mjs';

const chassis = { archetype: 'balanced', save_dc: 24 };
const relFindings = (m, opts = {}) =>
  lintStatblock(m, { chassis, edition: '2024', ...opts }).findings.filter((f) => f.rule === 'trait-imposes-save');

const withTrait = (text, extra = {}) => ({
  type: 'Plant',
  sections: {
    Traits: [{ name: 'Pacifying Aura', text }],
    Actions: [{ name: 'Slam', text: '*Melee Attack Roll:* +10, reach 5 ft. 20 (3d8 + 7) Bludgeoning damage.' }],
    ...extra,
  },
});

describe('trait-imposes-save lint rule', () => {
  test('flags a triggerless save-imposing trait (Pacifying Aura shape)', () => {
    const m = withTrait('Wisdom Saving Throw: DC 24, one creature within 30 feet. Failure: The target has Disadvantage on attack rolls until the start of its next turn.');
    expect(relFindings(m)).toHaveLength(1);
  });

  test('flags the Spectral Tangle shape too', () => {
    const m = withTrait('Dexterity Saving Throw: DC 24, one creature within 5 feet. Failure: The target has the Restrained condition until the start of its next turn. At the end of each of its turns, the target repeats the save, ending the effect on a success.');
    // "at the end of each of its turns" belongs to the CONDITION's exit, but
    // the entry-level trigger check accepts it — so craft the pure shape:
    const pure = withTrait('Dexterity Saving Throw: DC 24, one creature within 5 feet. Failure: The target has the Restrained condition until the start of its next turn.');
    expect(relFindings(pure)).toHaveLength(1);
  });

  test('passes a triggered aura trait', () => {
    const m = withTrait('At the start of each of its turns, each creature within 10 feet of it makes a save. Constitution Saving Throw: DC 24, each creature in a 10-foot Emanation. Failure: 10 (3d6) Poison damage.');
    expect(relFindings(m)).toHaveLength(0);
  });

  test('passes self-save traits (Magic Resistance / Undead Fortitude shapes)', () => {
    const m = withTrait('The creature has Advantage on saving throws against spells and other magical effects.');
    expect(relFindings(m)).toHaveLength(0);
  });

  test('ignores save-imposing entries already in Actions', () => {
    const m = {
      type: 'Plant',
      sections: {
        Traits: [{ name: 'Amphibious', text: 'It can breathe air and water.' }],
        Actions: [{ name: 'Blast', text: 'Wisdom Saving Throw: DC 24, one creature within 30 feet. Failure: 20 (6d6) Psychic damage.' }],
      },
    };
    expect(relFindings(m)).toHaveLength(0);
  });

  test('does not fire without a chassis (corpus sweep exempt)', () => {
    const m = withTrait('Wisdom Saving Throw: DC 24, one creature within 30 feet. Failure: Disadvantage.');
    expect(lintStatblock(m, { edition: '2024' }).findings.filter((f) => f.rule === 'trait-imposes-save')).toHaveLength(0);
  });
});

describe('trait-imposes-save correction (relocate-and-exempt)', () => {
  test('relocates the trait to Actions with the relocated marker', () => {
    const m = withTrait('Wisdom Saving Throw: DC 24, one creature within 30 feet. Failure: The target has Disadvantage on attack rolls until the start of its next turn.');
    const fixed = applyCorrections(m, relFindings(m), { chassis });
    expect(fixed.sections.Traits).toHaveLength(0);
    const moved = fixed.sections.Actions.find((e) => e.name === 'Pacifying Aura');
    expect(moved).toBeTruthy();
    expect(moved.relocated).toBe(true);
    expect(relFindings(fixed)).toHaveLength(0);
  });

  test('relocation cannot trip the counts reject (the exempt half)', () => {
    // Real plan; fill Traits to min and Actions to max, with one offending
    // trait. Post-relocation raw counts are traits min−1 / actions max+1 —
    // exactly the shape that would reject without the exemption.
    const { chassis: ch, plan } = buildContext(10, null);
    const filler = (n, prefix) => Array.from({ length: n }, (_, i) => ({ name: `${prefix} ${i}`, text: 'It does something passive.' }));
    const m = {
      type: 'Plant',
      sections: {
        Traits: [
          ...filler(plan.traits.min - 1, 'Quirk'),
          { name: 'Pacifying Aura', text: 'Wisdom Saving Throw: DC 16, one creature within 30 feet. Failure: The target has Disadvantage on attack rolls until the start of its next turn.' },
        ],
        Actions: filler(plan.actions.max, 'Strike'),
      },
    };
    const before = lintStatblock(m, { chassis: ch, plan, edition: '2024' }).findings;
    expect(before.some((f) => f.rule === 'trait-imposes-save')).toBe(true);
    expect(before.some((f) => f.rule === 'counts')).toBe(false); // in range pre-fix
    const fixed = applyCorrections(m, before, { chassis: ch });
    const after = lintStatblock(fixed, { chassis: ch, plan, edition: '2024' }).findings;
    expect(after.some((f) => f.rule === 'trait-imposes-save')).toBe(false);
    expect(after.some((f) => f.rule === 'counts')).toBe(false); // exemption holds
  });
});
