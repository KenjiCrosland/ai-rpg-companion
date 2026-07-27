/**
 * Regressions from the third field batch (Grasp / Stalking Wardwall / Swallower
 * / Mangrove — 2026-07-27). Each case uses the live block's verbatim text.
 * Five fixes: trait-imposes-save trigger scoping, grapple-exit anchor+exit
 * widening, spellcasting-ability raise-only stamp, hybrid-targeting,
 * resistance-unknown.
 */
import { lintStatblock } from '../format-2024/lint.mjs';
import { applyCorrections, assembleMonster, buildContext } from '../format-2024/generate.mjs';

const chassis = { archetype: 'lurker', save_dc: 23 };
const rule = (m, name, opts = {}) =>
  lintStatblock(m, { chassis, edition: '2024', ...opts }).findings.filter((f) => f.rule === name);

describe('trait-imposes-save: trigger must be in the lead-in (Softening Tremor)', () => {
  const tremor = {
    type: 'Ooze',
    sections: {
      Traits: [{ name: 'Softening Tremor (1/Day)', text: 'Strength Saving Throw: DC 23, one creature within 60 feet. Failure: The target takes 44 (8d10) Acid damage and has the Prone condition. Success: Half damage only.' }],
      Actions: [{ name: 'Lash', text: '*Melee Attack Roll:* +17, reach 10 ft. 23 (3d8 + 10) Acid damage.' }],
    },
  };

  test('the Failure clause\'s own "takes N damage" no longer satisfies the trigger check', () => {
    expect(rule(tremor, 'trait-imposes-save')).toHaveLength(1);
  });

  test('a real lead-in trigger still exempts', () => {
    const aura = {
      ...tremor,
      sections: {
        ...tremor.sections,
        Traits: [{ name: 'Quake Aura', text: 'At the start of each of its turns, the ooze shakes the ground. Strength Saving Throw: DC 23, each creature in a 10-foot Emanation. Failure: 10 (3d6) damage.' }],
      },
    };
    expect(rule(aura, 'trait-imposes-save')).toHaveLength(0);
  });
});

describe('grapple-exit: widened anchor and exit patterns (Stalking Wardwall)', () => {
  test('the Wardwall Engulf passes — "is Restrained" phrasing WITH real exits', () => {
    const m = {
      type: 'Ooze',
      sections: {
        Actions: [{ name: 'Engulf', text: 'The wardwall forces one creature it has Grappled to make a Strength Saving Throw: DC 15, one creature within 60 feet. Failure: The target is Restrained and pulled entirely into the wardwall\'s space. The Restrained condition lasts until the wardwall dies or the target uses an action to make a DC 15 Strength check, freeing itself on a success. While Restrained, the target is Blinded and Deafened and takes 10 (3d6) Acid damage at the start of each of the wardwall\'s turns.' }],
      },
    };
    expect(rule(m, 'grapple-exit')).toHaveLength(0); // exits recognized
    expect(rule(m, 'hybrid-targeting')).toHaveLength(1); // but the double-targeting is caught
  });

  test('bare "is Restrained" with NO exit now flags and gets the repeat save', () => {
    const m = {
      type: 'Ooze',
      sections: { Actions: [{ name: 'Clutch', text: '*Strength Saving Throw*: DC 23, one creature within 30 feet. *Failure:* The target is Restrained and takes 22 (4d10) damage each turn.' }] },
    };
    const f = rule(m, 'grapple-exit');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.sections.Actions[0].text).toContain('repeats the save at the end of each of its turns');
    expect(rule(fixed, 'grapple-exit')).toHaveLength(0);
  });

  test('bare "is Grappled" gets the escape-DC rider with normalized phrasing', () => {
    const m = {
      type: 'Ooze',
      sections: { Actions: [{ name: 'Snatch', text: '*Strength Saving Throw*: DC 23, one creature within 5 feet. *Failure:* The target is Grappled and pulled 5 feet.' }] },
    };
    const f = rule(m, 'grapple-exit');
    expect(f[0]?.expected).toBe('Grappled');
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.sections.Actions[0].text).toContain('has the Grappled condition (escape DC 21)');
    expect(rule(fixed, 'grapple-exit')).toHaveLength(0);
  });

  test('"is no longer Restrained" release phrasing is not an application', () => {
    const m = {
      type: 'Ooze',
      sections: { Actions: [{ name: 'Release', text: 'The ooze relaxes. Each creature in its space is no longer Restrained and exits to the nearest unoccupied space.' }] },
    };
    expect(rule(m, 'grapple-exit')).toHaveLength(0);
  });
});

describe('hybrid-targeting (double targeting clause)', () => {
  test('flags the "targets" lead-in variant (Feymire Muck Engulfing Sink)', () => {
    const m = {
      type: 'Ooze',
      sections: { Actions: [{ name: 'Engulfing Sink', text: 'The feymire muck targets one creature it can see within 30 feet. *Strength Saving Throw*: DC 15, one creature within 60 feet. *Failure:* 24 (7d6) Bludgeoning damage.' }] },
    };
    expect(rule(m, 'hybrid-targeting')).toHaveLength(1);
  });

  test('a "targets" lead-in WITHOUT a duplicated skeleton clause passes', () => {
    const m = {
      type: 'Ooze',
      sections: { Actions: [{ name: 'Sink', text: 'The feymire muck targets one creature it can see within 30 feet. *Strength Saving Throw*: DC 15, the target. *Failure:* 24 (7d6) Bludgeoning damage.' }] },
    };
    expect(rule(m, 'hybrid-targeting')).toHaveLength(0);
  });

  test('a clean skeleton with one targeting clause passes', () => {
    const m = {
      type: 'Ooze',
      sections: { Actions: [{ name: 'Engulf', text: '*Strength Saving Throw*: DC 23, one creature Grappled by the swallower. *Failure:* 30 (9d6) Acid damage.' }] },
    };
    expect(rule(m, 'hybrid-targeting')).toHaveLength(0);
  });
});

describe('resistance-unknown (Blindness/Deafness junk)', () => {
  test('drops junk tokens, keeps damage types, leaves conditions to resistance-conditions', () => {
    const m = {
      type: 'Ooze',
      resistances: 'Acid, Cold; Blindness, Deafness',
      sections: { Traits: [{ name: 'Blob', text: 'It wobbles.' }] },
    };
    const f = rule(m, 'resistance-unknown');
    expect(f).toHaveLength(1);
    expect(f[0].expected).toBe('Acid, Cold');
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.resistances).toBe('Acid, Cold');
    expect(rule(fixed, 'resistance-unknown')).toHaveLength(0);
  });

  test('canonical conditions in resistances are NOT junk (resistance-conditions owns them)', () => {
    const m = {
      type: 'Ooze',
      resistances: 'Fire; Charmed',
      sections: { Traits: [{ name: 'Blob', text: 'It wobbles.' }] },
    };
    expect(rule(m, 'resistance-unknown')).toHaveLength(0);
  });
});

describe('batch 14: identity-immunity (Glacial Golem cold resistance)', () => {
  const c14 = { archetype: 'brute', save_dc: 20 };
  const idImm = (m) => lintStatblock(m, { chassis: c14, edition: '2024' }).findings.filter((f) => f.rule === 'identity-immunity');
  const golem = () => ({
    name: 'Glacial Golem',
    type: 'Construct',
    resistances: 'Cold, Fire',
    immunities: 'Poison; Exhaustion, Poisoned',
    sections: {
      Actions: [
        { name: 'Ice Javelin', text: '*Ranged Attack Roll:* +12, range 60 ft. 25 (4d8 + 7) Cold damage.' },
        { name: 'Freezing Exhalation (Recharge 5-6)', text: '*Constitution Saving Throw*: DC 20, each creature in a 30-foot Cone. *Failure:* 35 (10d6) Cold damage. *Success:* Half damage.' },
      ],
    },
  });

  test('an ice-named, cold-dealing creature upgrades Cold resistance to immunity', () => {
    const m = golem();
    const f = idImm(m);
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis: c14 });
    expect(fixed.resistances).toBe('Fire');
    expect(fixed.immunities).toBe('Cold, Poison; Exhaustion, Poisoned');
    expect(idImm(fixed)).toHaveLength(0);
  });

  test('a material NAME without dealt damage stays resistant (Giant Fire Beetle shape)', () => {
    const m = golem();
    m.name = 'Frostwing';
    m.sections.Actions = [{ name: 'Peck', text: '*Melee Attack Roll:* +12, reach 5 ft. 25 (4d8 + 7) Piercing damage.' }];
    expect(idImm(m)).toHaveLength(0);
  });

  test('already-immune creatures are untouched', () => {
    const m = golem();
    m.immunities = 'Cold, Poison; Exhaustion';
    m.resistances = 'Fire';
    expect(idImm(m)).toHaveLength(0);
  });
});

describe('batch 14: cosmetic normalizers (speed casing, languages none)', () => {
  const { assembleMonster: am, buildContext: bc14 } = require('../format-2024/generate.mjs');
  const ctx = () => {
    const { chassis, plan, archetype } = bc14(4, 'lurker');
    return { cr: 4, chassis, plan, archetypeName: archetype, archetypeSource: 'auto' };
  };
  const fixture = (extra) => ({
    name: 'Gloom Stalker', size: 'Medium', type: 'Monstrosity', alignment: 'Neutral Evil',
    speed: '30 ft., burrow 20 ft., fly 40 ft. (hover)',
    stats: { STR: 12, DEX: 16, CON: 12, INT: 6, WIS: 14, CHA: 8 },
    save_proficiencies: [], skill_proficiencies: [],
    sections: { Traits: [{ name: 'Veil', text: 'It hides.' }], Actions: [{ name: 'Claw', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.' }] },
    ...extra,
  });

  test('movement modes capitalize; "(hover)" stays lowercase', () => {
    const m = am(fixture({}), ctx());
    expect(m.speed).toBe('30 ft., Burrow 20 ft., Fly 40 ft. (hover)');
  });

  test('languages "none" drops to the renderer\'s em-dash default', () => {
    const m = am(fixture({ languages: 'none' }), ctx());
    expect(m.languages).toBeUndefined();
    const m2 = am(fixture({ languages: 'Deep Speech' }), ctx());
    expect(m2.languages).toBe('Deep Speech');
  });
});

describe('batch 13: spell-stamp paren fix + weave extraction hardening', () => {
  const { assembleMonster, buildContext: bc } = require('../format-2024/generate.mjs');

  test('the "(spell save DC 24, +16 to hit...)" continuation no longer defeats the stamp', () => {
    const ctx22 = () => {
      const { chassis, plan, archetype } = bc(22, null);
      return { cr: 22, chassis, plan, archetypeName: archetype, archetypeSource: 'auto' };
    };
    const m = assembleMonster({
      name: 'Lumoth', size: 'Medium', type: 'Monstrosity', alignment: 'Neutral Evil', speed: '50 ft.',
      stats: { STR: 10, DEX: 26, CON: 22, INT: 3, WIS: 20, CHA: 12 },
      save_proficiencies: ['DEX', 'WIS'], skill_proficiencies: ['Perception'],
      sections: {
        Traits: [{ name: 'Wall Walker', text: 'It climbs difficult surfaces without a check.' }],
        Actions: [
          { name: 'Multiattack', text: 'The lumoth makes three Grasping Tendril attacks.' },
          { name: 'Grasping Tendril', text: '*Melee Attack Roll:* +15, reach 5 ft. 35 (6d8 + 8) Acid damage.' },
          { name: 'Spellcasting', text: 'The lumoth casts one of the following spells, using Wisdom as the spellcasting ability (spell save DC 23, +16 to hit with spell attacks): At Will: Misty Step' },
        ],
      },
    }, ctx22());
    // CR 22 chassis DC 23, PB 7 → required WIS = (23 − 8 − 7) × 2 + 10 = 26.
    expect(m.stats.WIS).toBe(26);
  });

  test('"a use of its Enveloping Feed action" resolves and the weave strips', () => {
    const m = {
      type: 'Monstrosity',
      sections: {
        Actions: [
          { name: 'Multiattack', text: 'The lumoth makes three Grasping Tendril attacks. It can replace one attack with a use of its Enveloping Feed action.' },
          { name: 'Grasping Tendril', text: '*Melee Attack Roll:* +15, reach 5 ft. 35 (6d8 + 8) Acid damage.' },
          { name: 'Enveloping Feed', text: '*Constitution Saving Throw*: DC 24, one creature the lumoth has Grappled. *Failure:* 99 (18d10) Acid damage. *Success:* Half damage.' },
        ],
      },
    };
    const opts = { chassis: { archetype: 'balanced', save_dc: 24 }, edition: '2024', perAttack: 35 };
    const f = lintStatblock(m, opts).findings.filter((x) => x.rule === 'multiattack-substitution');
    expect(f).toHaveLength(1); // 99 > 2 × 35
    const fixed = applyCorrections(m, f, { chassis: opts.chassis });
    expect(fixed.sections.Actions[0].text).toBe('The lumoth makes three Grasping Tendril attacks.');
  });

  test('a self-gated legendary option ("Envelop (1/Day)") is exempt from reuse capping', () => {
    const m = {
      type: 'Monstrosity',
      sections: {
        Actions: [
          { name: 'Grasping Tendril', text: '*Melee Attack Roll:* +15, reach 5 ft. 35 (6d8 + 8) Acid damage.' },
          { name: 'Enveloping Feed', text: '*Constitution Saving Throw*: DC 24, one creature. *Failure:* 99 (18d10) Acid damage. *Success:* Half damage.' },
        ],
        'Legendary Actions': [{ name: 'Envelop (1/Day)', text: 'The lumoth uses Enveloping Feed.' }],
      },
    };
    const f = lintStatblock(m, { chassis: { archetype: 'balanced', save_dc: 24 }, edition: '2024', perAttack: 35 }).findings
      .filter((x) => x.rule === 'legendary-reuse');
    expect(f).toHaveLength(0);
  });

  test('support CR 18 clamps a 25-damage claw in current code (Uuloth anomaly check)', () => {
    const { chassis, plan } = bc(18, 'support');
    const { damageBudgetFor: dbf, attackDamageDiceFor, requiredAttackModFor } = require('../format-2024/generate.mjs');
    const numbers = dbf(18, chassis, plan);
    const perAttack = attackDamageDiceFor(numbers.perAttack, requiredAttackModFor(chassis)).avg;
    const m = {
      type: 'Plant',
      sections: { Actions: [
        { name: 'Multiattack', text: 'The uuloth makes three Claw attacks.' },
        { name: 'Claw', text: '*Melee Attack Roll:* +13, reach 5 ft. 25 (4d8 + 7) Slashing damage.' },
      ] },
    };
    const findings = lintStatblock(m, { chassis, plan, edition: '2024', perAttack, totalDamage: numbers.total }).findings
      .filter((f) => f.rule === 'attack-damage-band');
    expect(findings.length).toBeGreaterThan(0); // 25 vs ~14 budget must flag
    const fixed = applyCorrections(m, findings, { chassis });
    const dmg = Number(/(\d+)\s*\(/.exec(fixed.sections.Actions[1].text)[1]);
    expect(dmg).toBeLessThanOrEqual(Math.round(numbers.perAttack * 1.3));
  });
});

describe('batch 13: creature-type seed dimension', () => {
  const { rollCreatureType, buildRandomConceptSeed } = require('../format-2024/concept-seeds.mjs');
  afterEach(() => jest.restoreAllMocks());

  test('rollCreatureType returns a valid type at the extremes', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    expect(rollCreatureType()).toBe('Monstrosity');
    Math.random.mockReturnValue(0.999);
    expect(rollCreatureType()).toBe('Ooze');
  });

  test('the seed carries a creature_type and mandates it in the concept', () => {
    const seed = buildRandomConceptSeed();
    expect(['Monstrosity', 'Aberration', 'Fiend', 'Undead', 'Fey', 'Construct', 'Elemental', 'Dragon', 'Celestial', 'Giant', 'Humanoid', 'Plant', 'Beast', 'Ooze']).toContain(seed.creature_type);
    expect(seed.concept).toContain(`creature type MUST be ${seed.creature_type}`);
  });
});

describe('batch 12: swarm-heal-contradiction v2 (Klakkhorde double heal)', () => {
  const c12 = { archetype: 'swarm', save_dc: 18 };
  const swarmTrait = { name: 'Swarm', text: 'The swarm can occupy another creature\'s space and vice versa. The swarm can\'t regain Hit Points or gain Temporary Hit Points.' };
  const heals = (m) => lintStatblock(m, { chassis: c12, edition: '2024' }).findings.filter((f) => f.rule === 'swarm-heal-contradiction');

  test('name-subject and pronoun-subject heals are both caught and stripped', () => {
    const m = {
      type: 'Swarm of Tiny Undead',
      sections: {
        Traits: [
          swarmTrait,
          { name: 'Bonechip Heal', text: 'When the Klakkhorde is Bloodied, it regains 10 (3d6) Hit Points at the start of each of its turns.' },
        ],
        Actions: [
          { name: 'Heat Drain (1/Day)', text: 'The Klakkhorde targets one creature Grappled by it. *Constitution Saving Throw*: DC 18, that creature. *Failure:* The target takes 49 (14d6) Necrotic damage, and the Klakkhorde regains 24 Hit Points. *Success:* Half damage, and no Hit Point regain.' },
        ],
      },
    };
    const f = heals(m);
    expect(f).toHaveLength(2);
    const fixed = applyCorrections(m, f, { chassis: c12 });
    expect(fixed.sections.Traits.map((e) => e.name)).toEqual(['Swarm']); // heal-only trait deleted
    const drain = fixed.sections.Actions[0].text;
    expect(drain).not.toMatch(/regains|regain/);
    expect(drain).toContain('49 (14d6) Necrotic damage.');
    expect(heals(fixed)).toHaveLength(0);
  });

  test('the Swarm trait\'s own "can\'t regain Hit Points" clause never trips it', () => {
    const m = { type: 'Swarm of Tiny Undead', sections: { Traits: [swarmTrait] } };
    expect(heals(m)).toHaveLength(0);
  });
});

describe('batch 12: attack-suffix rename + squeeze garble', () => {
  test('"Chain Blade Attack" renames with reference propagation', () => {
    const m = {
      type: 'Construct',
      sections: {
        Actions: [
          { name: 'Multiattack', text: 'Bogoroth makes two Chain Blade Attack attacks.' },
          { name: 'Chain Blade Attack', text: '*Melee Attack Roll:* +8, reach 15 ft. 16 (2d10 + 5) Slashing damage.' },
          { name: 'Underwater Ram', text: 'Bogoroth moves up to its Speed and makes one Chain Blade Attack attack with Advantage.' },
        ],
      },
    };
    const f = lintStatblock(m, { chassis: { save_dc: 15 }, edition: '2024' }).findings.filter((x) => x.rule === 'entry-name-attack-suffix');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis: { save_dc: 15 } });
    expect(fixed.sections.Actions.map((e) => e.name)).toContain('Chain Blade');
    expect(fixed.sections.Actions[0].text).toContain('two Chain Blade attacks');
    expect(fixed.sections.Actions[2].text).toContain('one Chain Blade attack');
  });

  test('"can squeeze through ... without squeezing" becomes "move through"', () => {
    const m = {
      type: 'Fey',
      sections: { Traits: [{ name: 'Squeeze', text: 'The slither can squeeze through a space as narrow as 1 inch wide without squeezing. In addition, it ignores difficult terrain.' }] },
    };
    const f = lintStatblock(m, { chassis: { save_dc: 12 }, edition: '2024' }).findings.filter((x) => x.rule === 'squeeze-phrasing');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis: { save_dc: 12 } });
    expect(fixed.sections.Traits[0].text).toContain('can move through a space as narrow as 1 inch wide without squeezing');
  });
});

describe('batch 11: defense-contradiction (Icy Carapace resistance vs immunity line)', () => {
  const c11 = { archetype: 'swarm', save_dc: 20 };
  const contra = (m) => lintStatblock(m, { chassis: c11, edition: '2024' }).findings.filter((f) => f.rule === 'defense-contradiction');

  test('strips the contradicting sentence, keeps and re-capitalizes the mechanic', () => {
    const m = {
      type: 'Swarm of Tiny Beasts',
      immunities: 'Cold; Charmed, Frightened',
      sections: { Traits: [{ name: 'Icy Carapace', text: 'The swarm has Resistance to Cold damage. In addition, when a creature hits the swarm with a melee attack, the creature takes 5 (1d10) Cold damage.' }] },
    };
    const f = contra(m);
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis: c11 });
    expect(fixed.sections.Traits[0].text).toBe('When a creature hits the swarm with a melee attack, the creature takes 5 (1d10) Cold damage.');
    expect(contra(fixed)).toHaveLength(0);
  });

  test('a CONSISTENT claim with a mechanic passes', () => {
    const m = {
      type: 'Swarm of Tiny Beasts',
      resistances: 'Cold',
      sections: { Traits: [{ name: 'Icy Carapace', text: 'The swarm has Resistance to Cold damage. In addition, attackers take 5 (1d10) Cold damage.' }] },
    };
    expect(contra(m)).toHaveLength(0);
  });

  test('an entire-text contradiction is defense-restated business, not this rule', () => {
    const m = {
      type: 'Swarm of Tiny Beasts',
      immunities: 'Cold',
      sections: { Traits: [{ name: 'Icy Shell', text: 'The swarm has Resistance to Cold damage.' }] },
    };
    expect(contra(m)).toHaveLength(0);
    expect(lintStatblock(m, { chassis: c11, edition: '2024' }).findings.some((f) => f.rule === 'defense-restated')).toBe(true);
  });
});

describe('anti-clustering name bans (Chit- swarms ×6)', () => {
  const { rollNameBans, OVERUSED_NAME_STEMS } = require('../format-2024/concept-seeds.mjs');
  const { pickName, generateMonster2024 } = require('../format-2024/generate.mjs');

  afterEach(() => jest.restoreAllMocks());

  test('rollNameBans samples each stem at 50% (all in at 0, none at 0.99)', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    const all = rollNameBans({ type: 'Swarm of Tiny Beasts', archetypeName: 'swarm' });
    expect(all).toEqual(expect.arrayContaining(['chit', ...OVERUSED_NAME_STEMS.global]));
    Math.random.mockReturnValue(0.99);
    expect(rollNameBans({ type: 'Swarm of Tiny Beasts', archetypeName: 'swarm' })).toHaveLength(0);
  });

  test('type-keyed stems only join for their type', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    expect(rollNameBans({ type: 'Ooze' })).toEqual(expect.arrayContaining(['mire', 'muck']));
    expect(rollNameBans({ type: 'Construct' })).not.toEqual(expect.arrayContaining(['mire']));
  });

  test('pickName skips banned-stem candidates', () => {
    expect(pickName(['Chittering Maw', 'Stone Maw'], { bans: ['chit'] })).toBe('Stone Maw');
    expect(pickName(['Chittering Maw', 'Stone Maw'], { bans: [] })).toBe('Chittering Maw');
  });

  test('end-to-end: an active ban steers the final name past the attractor', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0); // every stem banned
    const fixture = JSON.stringify({
      name: 'Chittix',
      size: 'Medium', type: 'Monstrosity', alignment: 'Unaligned', speed: '40 ft.',
      stats: { STR: 12, DEX: 16, CON: 12, INT: 6, WIS: 14, CHA: 8 },
      save_proficiencies: ['DEX'], skill_proficiencies: ['Stealth'],
      sections: {
        Traits: [{ name: 'Umbral Veil', slot: 'stealth/phasing/invisibility trait', text: 'While in Dim Light or Darkness, it has the Invisible condition.' }],
        Actions: [
          { name: 'Multiattack', text: 'It makes two Shadow Claw attacks.' },
          { name: 'Shadow Claw', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.' },
          { name: 'Ambush Pounce', slot: 'ambush or once-per-fight nova mechanic', text: '*Dexterity Saving Throw*: DC 13, one creature within 60 feet. *Failure:* 21 (6d6) Psychic damage. *Success:* Half damage.' },
        ],
      },
    });
    // A GLOBAL stem ("grim") — the lurker archetype doesn't pull swarm stems.
    const naming = '{"candidates": ["Grimfang", "Stone Maw", "Pale Grasper"], "ability_renames": {}}';
    const m = await generateMonster2024(
      { concept: 'a skittering horror', cr: 4, archetypeName: 'lurker', edition: '2024', namePass: { userTypedName: null } },
      async (prompt) => (prompt.startsWith('Name this finished') ? naming : fixture),
    );
    expect(m.name).toBe('Stone Maw'); // Grimfang filtered by the grim ban
  });
});

describe('batch 10: swarm type pluralization + subtype leak', () => {
  const chassis10 = { archetype: 'swarm', save_dc: 16 };
  const typeFindings = (m) => lintStatblock(m, { chassis: chassis10, edition: '2024' }).findings.filter((f) => f.rule === 'swarm-type');
  const base = { sections: { Actions: [{ name: 'Bite', text: '*Melee Attack Roll:* +9, reach 5 ft. 32 (6d8 + 5) Piercing damage, or 18 (3d8 + 5) Piercing damage if the swarm has half of its Hit Points or fewer.' }] } };

  test('"Monstrositys" corrects to "Monstrosities"', () => {
    const m = { ...base, type: 'Swarm of Tiny Monstrositys' };
    const f = typeFindings(m);
    expect(f).toHaveLength(1);
    expect(applyCorrections(m, f, { chassis: chassis10 }).type).toBe('Swarm of Tiny Monstrosities');
  });

  test('"Undeads" corrects to the invariant "Undead"', () => {
    const m = { ...base, type: 'Swarm of Tiny Undeads' };
    expect(typeFindings(m)[0].expected).toBe('Swarm of Tiny Undead');
  });

  test('a duplicated swarm phrase in the subtype is dropped', () => {
    const m = { ...base, type: 'Swarm of Tiny Monstrositys', subtype: 'Swarm of Tiny Beasts' };
    const f = typeFindings(m);
    const fixed = applyCorrections(m, f, { chassis: chassis10 });
    expect(fixed.subtype).toBeUndefined();
    expect(fixed.type).toBe('Swarm of Tiny Monstrosities');
  });

  test('the wrap path pluralizes properly now ("Monstrosity" → "Monstrosities")', () => {
    const m = { ...base, type: 'Monstrosity' };
    expect(typeFindings(m)[0].expected).toBe('Swarm of Tiny Monstrosities');
  });

  test('proper plurals pass untouched', () => {
    for (const t of ['Swarm of Tiny Beasts', 'Swarm of Tiny Monstrosities', 'Swarm of Tiny Undead', 'Swarm of Tiny Fey']) {
      expect(typeFindings({ ...base, type: t })).toHaveLength(0);
    }
  });
});

describe('batch 10: legendary-resistance-uses + reaction-trigger referent', () => {
  const rules10 = (m, name) => lintStatblock(m, { chassis: { archetype: 'swarm', save_dc: 20 }, edition: '2024' }).findings.filter((f) => f.rule === name);

  test('bare "Legendary Resistance" gains its (3/Day) suffix', () => {
    const m = {
      type: 'Swarm of Tiny Undead',
      sections: { Traits: [{ name: 'Legendary Resistance', text: 'If the dust fails a saving throw, it can choose to succeed instead.' }] },
    };
    const f = rules10(m, 'legendary-resistance-uses');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis: { save_dc: 20 } });
    expect(fixed.sections.Traits[0].name).toBe('Legendary Resistance (3/Day)');
  });

  test('the official lair-variant suffix passes', () => {
    const m = {
      type: 'Dragon',
      sections: { Traits: [{ name: 'Legendary Resistance (3/Day, or 4/Day in Lair)', text: 'If the dragon fails a saving throw, it can choose to succeed instead.' }] },
    };
    expect(rules10(m, 'legendary-resistance-uses')).toHaveLength(0);
  });

  test('a trigger with "The target" as subject is flagged (Shatter Shield)', () => {
    const m = {
      type: 'Swarm of Tiny Undead',
      sections: { Reactions: [{ name: 'Shatter Shield', text: '*Trigger:* The target takes damage from a melee attack roll. *Response:* The dust shatters its ward.' }] },
    };
    expect(rules10(m, 'reaction-trigger-referent')).toHaveLength(1);
  });

  test('a properly-anchored trigger passes', () => {
    const m = {
      type: 'Swarm of Tiny Undead',
      sections: { Reactions: [{ name: 'Shatter Shield', text: '*Trigger:* A creature within 5 feet hits the dust with a melee attack roll. *Response:* The attacker takes 7 (2d6) Slashing damage.' }] },
    };
    expect(rules10(m, 'reaction-trigger-referent')).toHaveLength(0);
  });
});

describe('batch 9: swarm-half-damage v2 (missing clause + negation evasion)', () => {
  const chassis9 = { archetype: 'swarm', save_dc: 17 };
  const halfDmg = (m) => lintStatblock(m, { chassis: chassis9, edition: '2024' }).findings.filter((f) => f.rule === 'swarm-half-damage');

  test('missing clause injects deterministically (Chittering Shredder Claw)', () => {
    const m = {
      type: 'Swarm of Tiny Beasts',
      sections: { Actions: [
        { name: 'Multiattack', text: 'The shredder makes two Claw attacks.' },
        { name: 'Claw', text: '*Melee Attack Roll:* +10, reach 5 ft. 36 (8d8) Cold damage.' },
      ] },
    };
    const f = halfDmg(m);
    expect(f).toHaveLength(1);
    expect(f[0].severity).toBe('correctable');
    const fixed = applyCorrections(m, f, { chassis: chassis9 });
    expect(fixed.sections.Actions[1].text).toContain('36 (8d8) Cold damage, or 18 (4d8) Cold damage if the swarm has half of its Hit Points or fewer');
    expect(halfDmg(fixed)).toHaveLength(0);
  });

  test('the negation evasion is stripped and replaced (Chitin Crawler Pseudopod)', () => {
    const m = {
      type: 'Swarm of Tiny Aberrations',
      sections: { Actions: [
        { name: 'Pseudopod', text: '*Melee Attack Roll:* +12, reach 5 ft. 20 (3d8 + 7) Bludgeoning damage. If the crawler has half of its Hit Points or fewer, the damage is not reduced.' },
      ] },
    };
    const f = halfDmg(m);
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis: chassis9 });
    const text = fixed.sections.Actions[0].text;
    expect(text).not.toMatch(/not reduced/);
    expect(text).toContain('20 (3d8 + 7) Bludgeoning damage, or 11 (1d8 + 7) Bludgeoning damage if the swarm has half of its Hit Points or fewer');
    expect(halfDmg(fixed)).toHaveLength(0);
  });

  test('a real reduction satisfies the check (Chittering Cyst shape)', () => {
    const m = {
      type: 'Swarm of Tiny Monstrosities',
      sections: { Actions: [
        { name: 'Slicing Grasp', text: '*Melee Attack Roll:* +13, reach 5 ft. 21 (4d6 + 7) Piercing damage, or 14 (2d6 + 7) Piercing damage if the swarm has half of its Hit Points or fewer.' },
      ] },
    };
    expect(halfDmg(m)).toHaveLength(0);
  });
});

describe('batch 9: phrasing-hit-marker + defense-restated', () => {
  const rules9 = (m, name) => lintStatblock(m, { chassis: { archetype: 'swarm', save_dc: 20 }, edition: '2024' }).findings.filter((f) => f.rule === name);

  test('flags the duplicated Hit: clause (Chittering Cyst Slicing Grasp)', () => {
    const m = {
      type: 'Swarm of Tiny Monstrosities',
      sections: { Actions: [{ name: 'Slicing Grasp', text: 'Melee Attack Roll: +13, reach 5 ft. 21 (4d6 + 7) Piercing damage. Hit: 21 (4d6 + 7) damage, or 14 (2d6 + 7) damage if the swarm has half of its Hit Points or fewer. Hit or Miss: The target\'s space is difficult terrain for it until the start of the swarm\'s next turn.' }] },
    };
    expect(rules9(m, 'phrasing-hit-marker')).toHaveLength(1);
  });

  test('"Hit Points" alone never trips the marker rule', () => {
    const m = {
      type: 'Ooze',
      sections: { Traits: [{ name: 'Swarm', text: 'The swarm can\'t regain Hit Points or gain Temporary Hit Points.' }] },
    };
    expect(rules9(m, 'phrasing-hit-marker')).toHaveLength(0);
  });

  test('flags a pure defense-restatement trait (Rattling Shell)', () => {
    const m = {
      type: 'Swarm of Tiny Monstrosities',
      resistances: 'Cold, Lightning; Bludgeoning, Piercing, Slashing',
      sections: { Traits: [{ name: 'Rattling Shell', text: 'The swarm has resistance to Cold and Lightning damage.' }] },
    };
    expect(rules9(m, 'defense-restated')).toHaveLength(1);
  });

  test('a restatement WITH a real mechanic stays legal (Frozen Carapace)', () => {
    const m = {
      type: 'Swarm of Tiny Beasts',
      sections: { Traits: [{ name: 'Frozen Carapace', text: 'The shredder\'s frigid shells grant it immunity to Cold damage. Any creature that touches the shredder or hits it with a melee attack takes 4 (1d8) Cold damage.' }] },
    };
    expect(rules9(m, 'defense-restated')).toHaveLength(0);
  });
});

describe('batch 8: swarm-half-value (Chittix reduced-damage arithmetic)', () => {
  const chassis8 = { archetype: 'swarm', save_dc: 14 };
  const halfFindings = (m) => lintStatblock(m, { chassis: chassis8, edition: '2024' }).findings.filter((f) => f.rule === 'swarm-half-value');
  const swarm = (text) => ({
    type: 'Swarm of Tiny Plants',
    sections: { Actions: [{ name: 'Sap Strike', text }] },
  });

  test('flags the live Chittix shape and recomputes the halved value', () => {
    const m = swarm('*Melee Attack Roll:* +7, reach 5 ft. 18 (4d8) Piercing damage. If the swarm has half of its Hit Points or fewer, the damage is 13 (2d8 + 4).');
    const f = halfFindings(m);
    expect(f).toHaveLength(1);
    expect(f[0].expected).toBe('9 (2d8)');
    const fixed = applyCorrections(m, f, { chassis: chassis8 });
    expect(fixed.sections.Actions[0].text).toContain('the damage is 9 (2d8).');
    expect(fixed.sections.Actions[0].text).toContain('18 (4d8)'); // primary untouched
    expect(halfFindings(fixed)).toHaveLength(0);
  });

  test('the official keep-the-flat law passes (Crawling Claws shape)', () => {
    const m = swarm('*Melee Attack Roll:* +7, reach 5 ft. 20 (4d8 + 2) Bludgeoning damage, or 11 (2d8 + 2) Bludgeoning damage if the swarm is Bloodied.');
    expect(halfFindings(m)).toHaveLength(0);
  });

  test('single-die primaries are out of scope (Ravens/Venomous Snakes irregulars)', () => {
    const m = swarm('*Melee Attack Roll:* +7, reach 5 ft. 8 (1d8 + 4) Piercing damage, or 6 (1d4 + 4) Piercing damage if the swarm is Bloodied.');
    expect(halfFindings(m)).toHaveLength(0);
  });
});

describe('batch 7: instruction-leak (Lumor meta-commentary)', () => {
  const chassis7 = { archetype: 'support', save_dc: 12 };
  const leak = (m) => lintStatblock(m, { chassis: chassis7, edition: '2024' }).findings.filter((f) => f.rule === 'instruction-leak');

  test('flags and deletes the verbatim Lumor sentence', () => {
    const m = {
      type: 'Monstrosity',
      sections: { Actions: [{ name: 'Unearthly Insight', text: 'The lumor targets one ally it can see within 30 feet. Until the start of the lumor\'s next turn, that ally has Advantage on the next ability check or attack roll it makes against a creature the lumor can see. This is a buff, heal, or enable action targeting allies.' }] },
    };
    const f = leak(m);
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis: chassis7 });
    expect(fixed.sections.Actions[0].text).not.toMatch(/This is a/);
    expect(fixed.sections.Actions[0].text).toMatch(/can see\.$/);
    expect(leak(fixed)).toHaveLength(0);
  });

  test('in-world prose is untouched', () => {
    const m = {
      type: 'Monstrosity',
      sections: { Traits: [{ name: 'Pack Bond', text: 'The lumor fights harder near its kin. This creature is never alone for long.' }] },
    };
    expect(leak(m)).toHaveLength(0);
  });
});

describe('batch 7: ability-rename audit in the naming pass (Morvoth class)', () => {
  const { generateMonster2024 } = require('../format-2024/generate.mjs');
  const fixture = JSON.stringify({
    name: 'Lumor',
    size: 'Medium', type: 'Monstrosity', alignment: 'Neutral Evil', speed: '40 ft.',
    stats: { STR: 12, DEX: 16, CON: 12, INT: 6, WIS: 14, CHA: 8 },
    save_proficiencies: ['DEX'], skill_proficiencies: ['Stealth'],
    sections: {
      Traits: [{ name: 'Morvoth', slot: 'stealth/phasing/invisibility trait', text: 'The lumor can use the Help action as a Bonus Action.' }],
      Actions: [
        { name: 'Multiattack', text: 'The lumor makes two Kragor attacks.' },
        { name: 'Kragor', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.' },
        { name: 'Ambush Pounce', slot: 'ambush or once-per-fight nova mechanic', text: '*Dexterity Saving Throw*: DC 13, one creature within 60 feet. *Failure:* 21 (6d6) Psychic damage. *Success:* Half damage.' },
      ],
    },
  });
  const naming = JSON.stringify({
    candidates: ['Gravewing', 'Mire Stalker', 'Hollow Fen Cat'],
    ability_renames: { Morvoth: 'Helping Snarl', Kragor: 'Raking Claw', Multiattack: 'Bad Idea', Nonexistent: 'Nope' },
  });
  const callLLM = async (prompt) => (prompt.startsWith('Name this finished') ? naming : fixture);

  test('renames coined ability names, propagates references, protects Multiattack', async () => {
    const m = await generateMonster2024(
      { concept: 'a helpful horror', cr: 4, archetypeName: 'lurker', edition: '2024', namePass: { userTypedName: null } },
      callLLM,
    );
    const traitNames = m.sections.Traits.map((e) => e.name);
    const actionNames = m.sections.Actions.map((e) => e.name);
    expect(traitNames).toContain('Helping Snarl');
    expect(actionNames).toContain('Raking Claw');
    expect(actionNames).toContain('Multiattack');            // protected
    expect(actionNames).not.toContain('Bad Idea');
    const multi = m.sections.Actions.find((e) => e.name === 'Multiattack');
    expect(multi.text).toContain('Raking Claw');             // reference propagated
    expect(m.name).toBe('Gravewing');
  });
});

describe('batch 6: Stormtalon weave corrector (standalone-sentence shape)', () => {
  const stormtalon = () => ({
    type: 'Monstrosity',
    sections: {
      Actions: [
        { name: 'Multiattack', text: 'The stormtalon makes three Talon attacks. It can replace one attack with a use of Shriek.' },
        { name: 'Talon', text: '*Melee Attack Roll:* +14, reach 5 ft. 26 (4d8 + 8) Slashing damage.' },
        { name: 'Shriek', text: '*Constitution Saving Throw*: DC 22, one creature within 30 feet. *Failure:* 78 (12d12) Thunder damage, and the target has the Deafened condition until the end of its next turn. *Success:* Half damage.' },
      ],
    },
  });
  const opts = { chassis: { archetype: 'skirmisher', save_dc: 22 }, edition: '2024', perAttack: 26 };
  const findings = (m) => lintStatblock(m, opts).findings.filter((f) => f.rule === 'multiattack-substitution');

  test('the live shipped shape is flagged AND actually corrected now', () => {
    const m = stormtalon();
    const f = findings(m);
    expect(f).toHaveLength(1); // 78 damage > 2 × 26 cap
    const fixed = applyCorrections(m, f, { chassis: opts.chassis });
    expect(fixed.sections.Actions[0].text).toBe('The stormtalon makes three Talon attacks.');
    expect(findings(fixed)).toHaveLength(0);
  });
});

describe('batch 6: Dive Bomb hybrid ("affected by" re-targeting)', () => {
  test('flags "is also affected by a Saving Throw: DC N, one creature..."', () => {
    const m = {
      type: 'Monstrosity',
      sections: { Actions: [{ name: 'Dive Bomb (Recharge 5-6)', text: 'The stormtalon flies up to half its Fly Speed, then makes one Talon attack. On a hit, the target is also affected by a Strength Saving Throw: DC 22, one creature within 60 feet. Failure: The target has the Prone condition.' }] },
    };
    const f = lintStatblock(m, { chassis: { archetype: 'skirmisher', save_dc: 22 }, edition: '2024' }).findings.filter((x) => x.rule === 'hybrid-targeting');
    expect(f).toHaveLength(1);
  });
});

describe('batch 6: stat-ref (Strige → Stirge respell)', () => {
  const summoner = (ref) => ({
    name: 'Stormtalon',
    type: 'Monstrosity',
    sections: { Actions: [{ name: 'Screech for Reinforcements (1/Day)', text: `The stormtalon emits a piercing shriek. It summons 1d4 fledglings (use ${ref} statistics) that appear in unoccupied spaces within 60 feet.` }] },
  });
  const statRef = (m) => lintStatblock(m, { edition: '2024' }).findings.filter((f) => f.rule === 'stat-ref');

  test('misspelled reference with a unique close match respells deterministically', () => {
    const m = summoner('Strige');
    const f = statRef(m);
    expect(f).toHaveLength(1);
    expect(f[0].severity).toBe('correctable');
    expect(f[0].expected).toBe('Stirge');
    const fixed = applyCorrections(m, f, { chassis: { save_dc: 22 } });
    expect(fixed.sections.Actions[0].text).toContain('(use Stirge statistics)');
    expect(statRef(fixed)).toHaveLength(0);
  });

  test('a valid SRD reference passes', () => {
    expect(statRef(summoner('Stirge'))).toHaveLength(0);
  });

  test('a self-reference passes (the official Treant pattern)', () => {
    expect(statRef(summoner('Stormtalon'))).toHaveLength(0);
  });

  test('an unresolvable reference is a reject for the fix call', () => {
    const f = statRef(summoner('Zyxwvut'));
    expect(f).toHaveLength(1);
    expect(f[0].severity).toBe('reject');
  });

  test('stat references are not double-flagged as undefined-attack-ref', () => {
    const m = summoner('Strige');
    const refs = lintStatblock(m, { edition: '2024' }).findings.filter((f) => f.rule === 'undefined-attack-ref');
    expect(refs).toHaveLength(0);
  });
});

describe('concept-path naming pass (Swoop/Shriek Talon class)', () => {
  const { generateMonster2024 } = require('../format-2024/generate.mjs');
  const fixtureWithName = (name) => JSON.stringify({
    name,
    size: 'Medium', type: 'Monstrosity', alignment: 'Unaligned', speed: '40 ft.',
    stats: { STR: 12, DEX: 16, CON: 12, INT: 6, WIS: 14, CHA: 8 },
    save_proficiencies: ['DEX'], skill_proficiencies: ['Stealth'],
    sections: {
      Traits: [{ name: 'Umbral Veil', slot: 'stealth/phasing/invisibility trait', text: 'While in Dim Light or Darkness, it has the Invisible condition.' }],
      Actions: [
        { name: 'Multiattack', text: 'It makes two Shadow Claw attacks.' },
        { name: 'Shadow Claw', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.' },
        { name: 'Ambush Pounce', slot: 'ambush or once-per-fight nova mechanic', text: '*Dexterity Saving Throw*: DC 13, one creature within 60 feet. *Failure:* 21 (6d6) Psychic damage. *Success:* Half damage.' },
      ],
    },
  });
  const namingAware = (statblockJson) => jest.fn(async (prompt) =>
    prompt.startsWith('Name this finished') ? '{"candidates": ["Gravewing"]}' : statblockJson);

  test('refines when the model renamed a generic input', async () => {
    const callLLM = namingAware(fixtureWithName('Swoop Talon'));
    const m = await generateMonster2024(
      { concept: 'vicious bird', cr: 4, archetypeName: 'lurker', edition: '2024', namePass: { userTypedName: 'vicious bird' } },
      callLLM,
    );
    expect(m.name).toBe('Gravewing');
    expect(callLLM.mock.calls.some(([p]) => p.startsWith('Name this finished'))).toBe(true);
  });

  test('honors a typed name the model kept verbatim — no naming call', async () => {
    const callLLM = namingAware(fixtureWithName('Headless Horseman'));
    const m = await generateMonster2024(
      { concept: 'Headless Horseman', cr: 4, archetypeName: 'lurker', edition: '2024', namePass: { userTypedName: 'Headless Horseman' } },
      callLLM,
    );
    expect(m.name).toBe('Headless Horseman');
    expect(callLLM.mock.calls.some(([p]) => p.startsWith('Name this finished'))).toBe(false);
  });

  test('runs when no name was typed (description-only concept)', async () => {
    const callLLM = namingAware(fixtureWithName('Gloom Stalker'));
    const m = await generateMonster2024(
      { concept: 'a lurking dread of the fens', cr: 4, archetypeName: 'lurker', edition: '2024', namePass: { userTypedName: null } },
      callLLM,
    );
    expect(m.name).toBe('Gravewing');
  });

  test('without namePass the old single-call contract holds (back-compat)', async () => {
    const callLLM = namingAware(fixtureWithName('Gloom Stalker'));
    const m = await generateMonster2024(
      { concept: 'test', cr: 4, archetypeName: 'lurker', edition: '2024' },
      callLLM,
    );
    expect(m.name).toBe('Gloom Stalker');
    expect(callLLM.mock.calls.some(([p]) => p.startsWith('Name this finished'))).toBe(false);
  });
});

describe('entry-name-design-term: mechanic suffixes (Pinning Grip)', () => {
  test('flags "(Replaces One Attack)" in an entry name', () => {
    const m = {
      type: 'Monstrosity',
      sections: { Actions: [{ name: 'Pinning Grip (Replaces One Attack)', text: '*Dexterity Saving Throw*: DC 16, one creature within 5 feet. *Failure:* 13 (3d8) Slashing damage.' }] },
    };
    const f = lintStatblock(m, { edition: '2024' }).findings.filter((x) => x.rule === 'entry-name-design-term');
    expect(f).toHaveLength(1);
  });
});

describe('undefined-attack-ref: uses-references must resolve (Malmgrave Wing Burst)', () => {
  const wingBurst = (multiText, diveText) => ({
    type: 'Monstrosity',
    sections: {
      Actions: [
        { name: 'Multiattack', text: multiText },
        { name: 'Shatterfist', text: '*Melee Attack Roll:* +12, reach 5 ft. 25 (4d8 + 7) Bludgeoning damage.' },
        { name: 'Shardstorm (Recharge 5-6)', text: '*Dexterity Saving Throw*: DC 20, each creature in a 20-foot-radius sphere. *Failure:* 28 (8d6) Piercing damage. *Success:* Half damage.' },
        { name: 'Shattering Dive (1/Day)', text: diveText },
      ],
    },
  });
  const refs = (m) => lintStatblock(m, { edition: '2024' }).findings.filter((f) => f.rule === 'undefined-attack-ref');

  test('flags both live "Wing Burst" references (Multiattack + the 1/Day)', () => {
    const m = wingBurst(
      'The malmgrave makes three Shatterfist attacks. It can replace one attack with a use of Wing Burst.',
      'The malmgrave flies up to 60 feet in a straight line. It then uses Wing Burst without expending a Recharge.',
    );
    expect(refs(m)).toHaveLength(2);
  });

  test('resolves against the parenthetical-stripped entry name', () => {
    const m = wingBurst(
      'The malmgrave makes three Shatterfist attacks. It can replace one attack with a use of Shardstorm.',
      'The malmgrave flies up to 60 feet. It then uses Shardstorm without expending a Recharge.',
    );
    expect(refs(m)).toHaveLength(0);
  });

  test('official reference shapes stay legal (alternation, trailing words, Spellcasting)', () => {
    const m = {
      type: 'Fiend',
      sections: {
        Actions: [
          { name: 'Multiattack', text: 'The fiend makes two Pummel attacks, and it uses Pummel or Spellcasting. It uses Holy Burst twice.' },
          { name: 'Pummel', text: '*Melee Attack Roll:* +10, reach 5 ft. 20 (3d8 + 7) Bludgeoning damage.' },
          { name: 'Holy Burst', text: '*Dexterity Saving Throw*: DC 18, each creature in a 20-foot Emanation. *Failure:* 22 (5d8) Radiant damage. *Success:* Half damage.' },
        ],
      },
    };
    expect(refs(m)).toHaveLength(0);
  });
});

describe('final normalization pass (Death Knell rename collision)', () => {
  test('a correctable leftover from a same-entry rename collision cannot ship', async () => {
    const { generateMonster2024 } = require('../format-2024/generate.mjs');
    // ALL-CAPS + Recharge-in-Traits: entry-name-caps renames first, then
    // trait-recharge's lookup misses on the stale name — one pass leaves the
    // Recharge marker behind. The final sweep must catch it.
    const response = JSON.stringify({
      name: 'Gloom Stalker',
      size: 'Medium', type: 'Monstrosity', alignment: 'Neutral Evil', speed: '40 ft.',
      stats: { STR: 12, DEX: 16, CON: 12, INT: 6, WIS: 14, CHA: 8 },
      save_proficiencies: ['DEX'], skill_proficiencies: ['Stealth'],
      sections: {
        Traits: [
          { name: 'Umbral Veil', slot: 'stealth/phasing/invisibility trait', text: 'While in Dim Light or Darkness, the stalker has the Invisible condition.' },
          { name: 'DEATH KNELL (Recharge 5-6)', text: 'When a creature within 30 feet of the stalker drops to 0 Hit Points, the stalker gains 5 Temporary Hit Points.' },
        ],
        Actions: [
          { name: 'Multiattack', text: 'The stalker makes two Shadow Claw attacks.' },
          { name: 'Shadow Claw', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.' },
          { name: 'Ambush Pounce', slot: 'ambush or once-per-fight nova mechanic', text: '*Dexterity Saving Throw*: DC 13, one creature within 60 feet. *Failure:* 21 (6d6) Psychic damage. *Success:* Half damage.' },
        ],
      },
    });
    const monster = await generateMonster2024(
      { concept: 'test', cr: 4, archetypeName: 'lurker', edition: '2024' },
      async () => response,
    );
    const names = monster.sections.Traits.map((e) => e.name);
    expect(names).toContain('Death Knell (1/Day)');
    expect(names.join()).not.toMatch(/Recharge/);
  });
});

describe('spellcasting-ability raise-only stamp (Mangrove DC 25 / INT 16)', () => {
  const caster = (int, dc) => ({
    name: 'Mangrove', size: 'Large', type: 'Plant', alignment: 'Neutral Evil', speed: '40 ft.',
    stats: { STR: 28, DEX: 16, CON: 22, INT: int, WIS: 18, CHA: 12 },
    save_proficiencies: ['STR', 'CON'],
    skill_proficiencies: ['Perception'],
    sections: {
      Traits: [{ name: 'Bark', text: 'It is barky.' }],
      Actions: [
        { name: 'Multiattack', text: 'The mangrove makes three Spine Lash attacks.' },
        { name: 'Spine Lash', text: '*Melee Attack Roll:* +17, reach 10 ft. 54 (10d8 + 9) Slashing damage.' },
        { name: 'Spellcasting', text: `The mangrove casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC ${dc}): At will: Minor Illusion` },
      ],
    },
  });
  const ctx26 = () => {
    const { chassis: ch, plan, archetype } = buildContext(26, 'brute');
    return { cr: 26, chassis: ch, plan, archetypeName: archetype, archetypeSource: 'auto' };
  };

  test('raises the named ability to exactly support the DC (INT 16 → 28 at DC 25, PB 8)', () => {
    const m = assembleMonster(caster(16, 25), ctx26());
    expect(m.stats.INT).toBe(28); // (25 − 8 − 8) × 2 + 10
    const dcFindings = lintStatblock(m, { edition: '2024' }).findings.filter((f) => f.rule === 'spell-dc-ability');
    expect(dcFindings).toHaveLength(0);
  });

  test('raise-only: an already-sufficient score is untouched', () => {
    const m = assembleMonster(caster(30, 25), ctx26());
    expect(m.stats.INT).toBe(30);
  });

  test('non-casters are untouched', () => {
    const j = caster(16, 25);
    j.sections.Actions = j.sections.Actions.filter((e) => e.name !== 'Spellcasting');
    const m = assembleMonster(j, ctx26());
    expect(m.stats.INT).toBe(16);
  });
});
