/**
 * Batch-12 memo regressions (2026-07-29): rider saves reverting to 2014
 * phrasing, sub-band rider DCs masked by the max-only dc-band check, and
 * removal-from-play without counterplay. Live text from Tarwretch, Pumpkin
 * King, Shissk (Void Latch), Moon Moth (Web Lasso); official negatives from
 * SRD 5.2.1 (Behir, Gelatinous Cube, Barbed Devil, Giant Spider). All
 * detection anchors corpus-swept 0/329. No prompt-string asserts.
 */
import { lintStatblock } from '../format-2024/lint.mjs';
import { applyCorrections } from '../format-2024/generate.mjs';

const chassis = { archetype: 'balanced', save_dc: 17 };
const rulesFor = (m, rule, opts = {}) =>
  lintStatblock(m, { chassis, edition: '2024', ...opts }).findings.filter((f) => f.rule === rule);
const wrap = (section, name, text) => ({ type: 'Monstrosity', sections: { [section]: [{ name, text }] } });

describe('phrasing-rider-save (fix 1)', () => {
  test('flags Tarwretch\'s "unless the attacker succeeds" rider form', () => {
    const m = wrap('Traits', 'Sticky Ichor',
      'A creature that hits the tarwretch with a melee attack while within 5 feet of it is stuck to the tarwretch unless the attacker succeeds on a DC 15 Strength saving throw.');
    expect(rulesFor(m, 'phrasing-rider-save')).toHaveLength(1);
  });

  test('flags the Pumpkin King "must succeed ... or" rider form', () => {
    const m = wrap('Bonus Actions', 'Pumpkin Bomb',
      'The king lobs a gourd that shatters in a 10-foot Emanation. Each creature in that area must succeed on a DC 17 Constitution saving throw or have the Poisoned condition until the end of its next turn.');
    expect(rulesFor(m, 'phrasing-rider-save')).toHaveLength(1);
  });

  test('does NOT flag the official swallow regurgitation save (the monster is the saver)', () => {
    const m = wrap('Actions', 'Swallow',
      '*Dexterity Saving Throw*: DC 18, one Large or smaller creature Grappled by the behir. *Failure:* The behir swallows the target. If the behir takes 30 damage or more on a single turn from the swallowed creature, the behir must succeed on a DC 14 Constitution saving throw at the end of that turn or regurgitate the creature.');
    expect(rulesFor(m, 'phrasing-rider-save')).toHaveLength(0);
  });

  test('does NOT flag an ability CHECK in the 2014 form (Gelatinous Cube Transparent)', () => {
    const m = wrap('Traits', 'Transparent',
      'Even when the cube is in plain sight, a creature must succeed on a DC 15 Wisdom (Perception) check to notice the cube if the creature hasn\'t witnessed the cube move or otherwise act.');
    expect(rulesFor(m, 'phrasing-rider-save')).toHaveLength(0);
  });

  test('does NOT fire on 2014 blocks (the form is correct there)', () => {
    const m = wrap('Actions', 'Tar Tendril',
      'The target must succeed on a DC 15 Strength saving throw or be pulled up to 15 feet toward the tarwretch.');
    expect(rulesFor(m, 'phrasing-rider-save', { edition: '2014' })).toHaveLength(0);
  });
});

describe('dc-band per-instance (fix 2)', () => {
  const tarwretch = {
    type: 'Ooze',
    sections: {
      Actions: [
        { name: 'Engulf', text: '*Strength Saving Throw*: DC 17, one creature within 5 feet. *Failure:* 22 (4d10) Acid damage and the target has the Grappled condition (escape DC 15).' },
        { name: 'Tar Tendril', text: '*Strength Saving Throw*: DC 15, one creature within 30 feet. *Failure:* The target is pulled up to 15 feet toward the tarwretch.' },
      ],
    },
  };

  test('a sub-band rider DC is flagged even when the max DC sits on budget', () => {
    const findings = rulesFor(tarwretch, 'dc-band');
    expect(findings).toHaveLength(1);
    expect(findings[0].message).toContain('15');
  });

  test('correction restamps the rider save DC but never the escape DC', () => {
    const fixed = applyCorrections(tarwretch, rulesFor(tarwretch, 'dc-band'), { chassis });
    expect(fixed.sections.Actions[1].text).toContain('DC 17');
    expect(fixed.sections.Actions[0].text).toContain('(escape DC 15)');
    expect(rulesFor(fixed, 'dc-band')).toHaveLength(0);
  });

  test('an escape DC at save_dc−2 alone raises no finding', () => {
    const m = wrap('Actions', 'Grab',
      'Hit: 14 (2d8 + 5) Bludgeoning damage and the target has the Grappled condition (escape DC 15).');
    expect(rulesFor(m, 'dc-band')).toHaveLength(0);
  });
});

describe('removal-counterplay (fix 3)', () => {
  test('flags hit-based removal from play with no save and no escape (Void Latch shape)', () => {
    const m = wrap('Actions', 'Void Latch (1/Day)',
      'Melee Attack Roll: +8, reach 5 ft. Hit: 13 (2d8 + 4) Force damage, and the target disappears, transported to a lightless demiplane for up to 1 minute. When the effect ends, the target reappears in the space it left and takes 26 (4d12) Force damage.');
    const findings = rulesFor(m, 'removal-counterplay');
    expect(findings).toHaveLength(1);
    expect(findings[0].severity).toBe('reject');
  });

  test('passes removal behind a saving throw (official swallow shape)', () => {
    const m = wrap('Actions', 'Swallow',
      '*Dexterity Saving Throw*: DC 18, one creature Grappled by the behir. *Failure:* The behir swallows the target. While swallowed, a creature has the Blinded and Restrained conditions.');
    expect(rulesFor(m, 'removal-counterplay')).toHaveLength(0);
  });

  test('passes removal with an interior-escape clause', () => {
    const m = wrap('Actions', 'Void Latch (1/Day)',
      'Melee Attack Roll: +8, reach 5 ft. Hit: The target disappears, transported to a lightless demiplane. The target can escape by taking an action to make a DC 15 Wisdom check.');
    expect(rulesFor(m, 'removal-counterplay')).toHaveLength(0);
  });

  test('does NOT flag self-removal on death (Diabolical Restoration)', () => {
    const m = wrap('Traits', 'Diabolical Restoration',
      'If the devil dies outside the Nine Hells, its body disappears in sulfurous smoke, and it gains a new body instantly, reviving with all its Hit Points somewhere in the Nine Hells.');
    expect(rulesFor(m, 'removal-counterplay')).toHaveLength(0);
  });
});

describe('restrain-gate (sweep Q1)', () => {
  const webLasso = wrap('Actions', 'Web Lasso',
    'Melee Attack Roll: +7, reach 30 ft. Hit: The target has the Restrained condition until the end of its next turn.');

  test('an at-will no-damage restrain attack gets flagged and gated', () => {
    const findings = rulesFor(webLasso, 'restrain-gate');
    expect(findings).toHaveLength(1);
    const fixed = applyCorrections(webLasso, findings, { chassis });
    expect(fixed.sections.Actions[0].name).toBe('Web Lasso (Recharge 5-6)');
    expect(rulesFor(fixed, 'restrain-gate')).toHaveLength(0);
  });

  test('an already-gated restrain applier passes (Giant Spider Web shape)', () => {
    const m = wrap('Actions', 'Web (Recharge 5-6)',
      '*Dexterity Saving Throw*: DC 13, one creature the spider can see within 60 feet. *Failure:* The target has the Restrained condition until the web is destroyed.');
    expect(rulesFor(m, 'restrain-gate')).toHaveLength(0);
  });

  test('a damaging attack that restrains is not this rule\'s business', () => {
    const m = wrap('Actions', 'Crush',
      'Melee Attack Roll: +7, reach 10 ft. Hit: 18 (4d8) Bludgeoning damage and the target has the Restrained condition (escape DC 15).');
    expect(rulesFor(m, 'restrain-gate')).toHaveLength(0);
  });
});

describe('prone-duration (Zizzak live finding — audit-suggested fix overshot)', () => {
  test('a durationed Prone is flagged and the duration deterministically stripped', () => {
    const m = wrap('Legendary Actions', 'Swarm Rush',
      'Each creature whose space it enters must succeed on a DC 23 Dexterity saving throw or take 9 (2d8) Bludgeoning damage and have the Prone condition until the end of the zizzak\'s next turn.');
    const findings = rulesFor(m, 'prone-duration');
    expect(findings).toHaveLength(1);
    const fixed = applyCorrections(m, findings, { chassis });
    expect(fixed.sections['Legendary Actions'][0].text).toContain('have the Prone condition.');
    expect(fixed.sections['Legendary Actions'][0].text).not.toContain('until the end of the zizzak');
    expect(rulesFor(fixed, 'prone-duration')).toHaveLength(0);
  });

  test('2014 phrasing too, and other conditions keep their durations', () => {
    const m2014 = wrap('Actions', 'Slam',
      'The target must succeed on a DC 15 Strength saving throw or be knocked prone until the end of its next turn.');
    const f = rulesFor(m2014, 'prone-duration', { edition: '2014' });
    expect(f).toHaveLength(1);
    expect(applyCorrections(m2014, f, { chassis }).sections.Actions[0].text).toContain('knocked prone.');

    const restrained = wrap('Actions', 'Wave',
      '*Failure:* The target has the Restrained condition until the end of its next turn.');
    expect(rulesFor(restrained, 'prone-duration')).toHaveLength(0);
  });

  test('plain Prone raises no finding', () => {
    const m = wrap('Actions', 'Slam', 'Hit: 10 (2d8 + 1) Bludgeoning damage, and the target has the Prone condition.');
    expect(rulesFor(m, 'prone-duration')).toHaveLength(0);
  });
});
