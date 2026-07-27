/**
 * A save effect targeting a bare "each creature" with no area/range/trigger is
 * unadjudicable and 0/329 in the SRD (docs/investigations/03-orphaned-
 * mechanics.md). The rule defaults it to a 10-foot Emanation. Behavioral.
 */
import { lintStatblock } from '../format-2024/lint.mjs';
import { applyCorrections } from '../format-2024/generate.mjs';

const chassis = { archetype: 'balanced', save_dc: 24 };
const findings = (m) => lintStatblock(m, { chassis, edition: '2024' }).findings.filter((f) => f.rule === 'bare-targeting');
const wrap = (text) => ({ type: 'Plant', sections: { Traits: [{ name: 'Spore Drift', text }] } });

describe('bare-targeting lint rule', () => {
  test('flags a bare "each creature." save clause (Spore Drift shape)', () => {
    expect(findings(wrap('*Constitution Saving Throw*: DC 24, each creature. *Failure:* The target has the Poisoned condition.'))).toHaveLength(1);
  });

  test('passes an area-qualified clause', () => {
    expect(findings(wrap('*Constitution Saving Throw*: DC 24, each creature in a 20-foot-radius sphere. *Failure:* 30 damage.'))).toHaveLength(0);
  });

  test('passes a range-qualified clause', () => {
    expect(findings(wrap('*Constitution Saving Throw*: DC 24, each creature within 10 feet of it. *Failure:* 30 damage.'))).toHaveLength(0);
  });

  test('passes a relational qualifier ("Grappled by")', () => {
    expect(findings(wrap('*Strength Saving Throw*: DC 24, each creature Grappled by it. *Failure:* 30 damage.'))).toHaveLength(0);
  });

  test('flags a bare "one creature" with no range (Pacifying Aura shape)', () => {
    const [f] = findings(wrap('*Wisdom Saving Throw*: DC 24, one creature. *Failure:* Disadvantage on attack rolls.'));
    expect(f).toBeTruthy();
    expect(f.expected).toBe('one');
  });

  test('passes "one creature within 60 feet"', () => {
    expect(findings(wrap('*Wisdom Saving Throw*: DC 24, one creature within 60 feet. *Failure:* Disadvantage.'))).toHaveLength(0);
  });

  test('does not fire without a chassis (corpus sweep exempt)', () => {
    const m = wrap('*Constitution Saving Throw*: DC 24, each creature. *Failure:* Poisoned.');
    expect(lintStatblock(m, { edition: '2024' }).findings.filter((f) => f.rule === 'bare-targeting')).toHaveLength(0);
  });
});

describe('bare-targeting correction', () => {
  test('defaults an area target to a 10-foot Emanation and clears the finding', () => {
    const m = wrap('*Constitution Saving Throw*: DC 24, each creature. *Failure:* The target has the Poisoned condition.');
    const fixed = applyCorrections(m, findings(m), { chassis });
    expect(fixed.sections.Traits[0].text).toContain('each creature in a 10-foot Emanation originating from it');
    expect(findings(fixed)).toHaveLength(0);
  });

  test('defaults a single target to "within 60 feet" and clears the finding', () => {
    const m = wrap('*Wisdom Saving Throw*: DC 24, one creature. *Failure:* Disadvantage on attack rolls.');
    const fixed = applyCorrections(m, findings(m), { chassis });
    expect(fixed.sections.Traits[0].text).toContain('one creature within 60 feet');
    expect(findings(fixed)).toHaveLength(0);
  });
});
