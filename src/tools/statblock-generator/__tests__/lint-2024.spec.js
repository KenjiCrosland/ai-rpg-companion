/**
 * Lint module tests — build-order step 4 of docs/2024-architecture.md.
 *
 * Per the contract: deliberately broken blocks, one per rule class, each
 * asserting its rule fires. The SRD clean pass is the false-positive
 * guarantee: context-free rules must accept all 329 official blocks (minus
 * two documented source quirks).
 */
import { lintStatblock, avgDice } from '../format-2024/lint.mjs';
import { chassisFor, applyArchetype } from '../chassis/chassis.mjs';
import { applyCorrections } from '../format-2024/generate.mjs';
import { slotPlanFor } from '../chassis/slot-plan.mjs';
import monsters from '@/data/srd52-monsters.json';

// A clean generated-shape block: lurker at CR 4.
// chassis: hp 59, ac 14, attack +7, DC 13, pb 2 (verified in chassis.spec.js).
const lurkerChassis = applyArchetype(chassisFor(4), 'lurker');
const lurkerPlan = slotPlanFor(4, 'lurker');

const cleanLurker = {
  name: 'Gloom Stalker',
  size: 'Medium', type: 'Monstrosity', alignment: 'Neutral Evil',
  ac: 14, hp: 59, hp_formula: '13d8 + 1',
  speed: '40 ft.',
  initiative_bonus: 3, initiative_score: 13,
  stats: { STR: 12, DEX: 16, CON: 12, INT: 6, WIS: 14, CHA: 8 },
  saves: { STR: 1, DEX: 5, CON: 1, INT: -2, WIS: 2, CHA: -1 },
  senses: 'darkvision 60 ft.; Passive Perception 14',
  cr: 4, cr_str: '4', xp: 1100, pb: 2,
  sections: {
    Traits: [
      {
        name: 'Umbral Veil',
        slot: 'stealth/phasing/invisibility trait',
        text: 'While in Dim Light or Darkness, the stalker has the Invisible condition.',
      },
    ],
    Actions: [
      { name: 'Multiattack', text: 'The stalker makes two Shadow Claw attacks.' },
      { name: 'Shadow Claw', text: '*Melee Attack Roll:* +7, reach 5 ft. 12 (2d8 + 3) Slashing damage.' },
      {
        name: 'Ambush Pounce',
        slot: 'ambush or once-per-fight nova mechanic',
        text: '*Dexterity Saving Throw*: DC 13, one creature that has not acted this combat. *Failure:* 21 (6d6) Psychic damage and the target has the Frightened condition until the end of its next turn. *Success:* Half damage.',
      },
    ],
  },
};

const lint = (block, opts = { chassis: lurkerChassis, plan: lurkerPlan }) => lintStatblock(block, opts);
const rules = (result) => result.findings.map((f) => f.rule);
const withAction = (block, index, patch) => ({
  ...block,
  sections: {
    ...block.sections,
    Actions: block.sections.Actions.map((e, i) => (i === index ? { ...e, ...patch } : e)),
  },
});

// ---------------------------------------------------------------------------
// 0. The clean block is clean
// ---------------------------------------------------------------------------
test('clean lurker block passes all rules with chassis and plan', () => {
  expect(lint(cleanLurker)).toEqual({ ok: true, findings: [] });
});

// ---------------------------------------------------------------------------
// 1. One broken block per rule class
// ---------------------------------------------------------------------------
describe('each rule catches its violation class', () => {
  test('hp-formula: listed HP disagrees with dice average', () => {
    const result = lint({ ...cleanLurker, hp: 60 });
    expect(rules(result)).toContain('hp-formula');
    expect(result.findings.find((f) => f.rule === 'hp-formula').expected).toBe(59);
  });

  test('saves: save that is neither mod nor mod+PB', () => {
    const broken = { ...cleanLurker, saves: { ...cleanLurker.saves, DEX: 6 } };
    expect(rules(lint(broken))).toContain('saves');
  });

  test('initiative: passive score must be 10 + bonus', () => {
    expect(rules(lint({ ...cleanLurker, initiative_score: 15 }))).toContain('initiative');
  });

  test('pb: inconsistent with CR table', () => {
    expect(rules(lint({ ...cleanLurker, pb: 3 }))).toContain('pb');
  });

  test('xp: off the CR table', () => {
    expect(rules(lint({ ...cleanLurker, xp: 1000 }))).toContain('xp');
  });

  test('phrasing-2014: Melee Weapon Attack form', () => {
    const broken = withAction(cleanLurker, 1, {
      text: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. 12 (2d8 + 3) slashing damage.',
    });
    expect(rules(lint(broken))).toContain('phrasing-2014');
  });

  test('phrasing-to-hit: vestigial "to hit" in a 2024 attack line', () => {
    const broken = withAction(cleanLurker, 1, {
      text: '*Melee Attack Roll:* +7 to hit, reach 5 ft. 12 (2d8 + 3) Slashing damage.',
    });
    expect(rules(lint(broken))).toContain('phrasing-to-hit');
  });

  test('phrasing-to-hit: spellcasting "to hit with spell attacks" is legal', () => {
    const ok = withAction(cleanLurker, 2, {
      text: 'The stalker casts one spell (spell save DC 13, +5 to hit with spell attacks).',
    });
    expect(rules(lint(ok, {}))).not.toContain('phrasing-to-hit');
  });

  test('phrasing-saving-throw: saving throw without an ability name', () => {
    const broken = withAction(cleanLurker, 2, {
      text: '*Saving Throw*: DC 13, one creature. *Failure:* 21 (6d6) Psychic damage.',
    });
    expect(rules(lint(broken))).toContain('phrasing-saving-throw');
  });

  test('attack-damage-band: per-attack damage outside the budget band', () => {
    // Lurker CR 4 per-attack budget is 9 (turn total 18 across the fixture's
    // two-attack Multiattack); the fixture's 13 is 1.44× over.
    const result = lint(cleanLurker, { perAttack: 8, totalDamage: 16 });
    const finding = result.findings.find((f) => f.rule === 'attack-damage-band');
    expect(finding.severity).toBe('correctable'); // single expression → clamp
    expect(finding.expected).toBe(8);
    expect(finding.loc.entry).toBe('Shadow Claw');
    // Multi-expression entries route to the fix call instead.
    const rider = withAction(cleanLurker, 1, {
      text: '*Melee Attack Roll:* +7, reach 5 ft. 12 (2d8 + 3) Slashing damage plus 10 (3d6) Necrotic damage.',
    });
    const multi = lint(rider, { perAttack: 9, totalDamage: 18 }).findings.find((f) => f.rule === 'attack-damage-band');
    expect(multi.severity).toBe('reject');
    // Recharge novas are exempt — 27 is 3× the budget yet produces no
    // finding once the entry is a recharge (it replaces Shadow Claw here).
    const nova = withAction(cleanLurker, 1, {
      name: 'Death Lunge (Recharge 5-6)',
      text: '*Melee Attack Roll:* +7, reach 5 ft. 27 (6d8) Slashing damage.',
    });
    expect(rules(lint(nova, { perAttack: 9, totalDamage: 18 }))).not.toContain('attack-damage-band');
    // Without perAttack (corpus / context-free lint) the rule never runs.
    expect(rules(lint(cleanLurker, {}))).not.toContain('attack-damage-band');
  });

  test('entry-name-caps: all-caps ability names are title-cased', () => {
    const shouty = withAction(cleanLurker, 2, { name: 'CRACKLE (1/Day)' });
    const finding = lint(shouty, {}).findings.find((f) => f.rule === 'entry-name-caps');
    expect(finding.severity).toBe('correctable');
    expect(finding.expected).toBe('Crackle (1/Day)');
  });

  test('damage-dice: listed average disagrees with its own dice', () => {
    // 2d8 + 4 averages 13; a listed 15 is LLM arithmetic drift.
    const broken = withAction(cleanLurker, 1, {
      text: '*Melee Attack Roll:* +7, reach 5 ft. 15 (2d8 + 4) Slashing damage.',
    });
    const result = lint(broken, {});
    expect(rules(result)).toContain('damage-dice');
    expect(result.findings.find((f) => f.rule === 'damage-dice').expected).toBe(13);
  });

  test('nonmagical: 2014 resistance qualifier flagged with the stripped value', () => {
    const broken = {
      ...cleanLurker,
      immunities: 'Bludgeoning, Piercing, Slashing from nonmagical attacks; Frightened',
    };
    const result = lint(broken, {});
    const finding = result.findings.find((f) => f.rule === 'nonmagical');
    expect(finding.severity).toBe('correctable');
    expect(finding.expected).toBe('Bludgeoning, Piercing, Slashing; Frightened');
  });

  test('phrasing-hybrid-save: 2014 lead-in glued onto the 2024 skeleton', () => {
    const broken = withAction(cleanLurker, 2, {
      text: 'Each creature within 30 feet must make a *Dexterity Saving Throw*: DC 13, each creature within 30 feet. *Failure:* 21 (6d6) Psychic damage.',
    });
    const result = lint(broken);
    expect(rules(result)).toContain('phrasing-hybrid-save');
    expect(result.findings.find((f) => f.rule === 'phrasing-hybrid-save').severity).toBe('reject');
  });

  test('term-caps: lowercase Hit Points / opportunity attacks', () => {
    const broken = withAction(cleanLurker, 1, {
      text: '*Melee Attack Roll:* +7, reach 5 ft. 12 (2d8 + 3) Slashing damage, and the target can\'t regain hit points until the start of the stalker\'s next turn.',
    });
    expect(rules(lint(broken))).toContain('term-caps');
    const broken2 = withAction(cleanLurker, 1, {
      text: '*Melee Attack Roll:* +7, reach 5 ft. 12 (2d8 + 3) Slashing damage. The stalker can then move 10 feet without provoking opportunity attacks.',
    });
    expect(rules(lint(broken2))).toContain('term-caps');
  });

  test('undefined-attack-ref: referenced attack must exist in the statblock', () => {
    const broken = withAction(cleanLurker, 0, {
      text: 'The stalker makes two Shadow Claw attacks and can make one Phantom Fang attack.',
    });
    const result = lint(broken);
    const finding = result.findings.find((f) => f.rule === 'undefined-attack-ref');
    expect(finding.severity).toBe('reject');
    expect(finding.message).toContain('Phantom Fang');
    // The resolvable Shadow Claw reference in the clean block stays clean.
    expect(rules(lint(cleanLurker))).not.toContain('undefined-attack-ref');
  });

  test('second-person: statblocks are third person', () => {
    const broken = withAction(cleanLurker, 2, {
      text: '*Dexterity Saving Throw*: DC 13, each creature of your choice within 30 feet. *Failure:* 21 (6d6) Psychic damage. *Success:* Half damage.',
    });
    expect(rules(lint(broken))).toContain('second-person');
  });

  test('trait-mitigation: blanket damage halving as a trait is rejected; as a Reaction it is allowed', () => {
    const mitigationText = 'When an attacker hits it, the stalker halves the damage against it.';
    const asTrait = {
      ...cleanLurker,
      sections: {
        ...cleanLurker.sections,
        Traits: [...cleanLurker.sections.Traits, { name: 'Uncanny Dodge', text: mitigationText }],
      },
    };
    expect(rules(lint(asTrait, {}))).toContain('trait-mitigation');
    const asReaction = {
      ...cleanLurker,
      sections: {
        ...cleanLurker.sections,
        Reactions: [{ name: 'Uncanny Dodge', text: mitigationText }],
      },
    };
    expect(rules(lint(asReaction, {}))).not.toContain('trait-mitigation');
  });

  test('entry-name-design-term: slot/budget vocabulary in entry names rejects', () => {
    // Live finding: "Hungry Absorption (Half-Damage Mode)".
    const leaky = withAction(cleanLurker, 2, { name: 'Hungry Absorption (Half-Damage Mode)' });
    const f = lint(leaky, {}).findings.find((x) => x.rule === 'entry-name-design-term');
    expect(f.severity).toBe('reject');
    // In-world names with none of the terms pass.
    expect(rules(lint(cleanLurker, {}))).not.toContain('entry-name-design-term');
  });

  test('trait-recharge: Recharge in a trait name becomes (1/Day); coined entry names reject', () => {
    // Live findings: "Engulfing Dissolution (Recharge 5-6)" as a TRAIT
    // (zero corpus traits recharge; 33 use N/Day) and "Thul-eg" (coinage as
    // an ability name — official hyphenated names join full English words).
    const block = {
      ...cleanLurker,
      sections: {
        ...cleanLurker.sections,
        Traits: [
          ...cleanLurker.sections.Traits,
          { name: 'Engulfing Dissolution (Recharge 5-6)', text: 'It dissolves what it grabs.' },
          { name: 'Thul-eg', text: 'The creature can move through a space as narrow as 1 inch wide without squeezing.' },
        ],
      },
    };
    const findings = lint(block, {}).findings;
    const recharge = findings.find((f) => f.rule === 'trait-recharge');
    expect(recharge.severity).toBe('correctable');
    expect(recharge.expected).toBe('Engulfing Dissolution (1/Day)');
    const coined = findings.find((f) => f.rule === 'entry-name-coinage');
    expect(coined.severity).toBe('reject');
    expect(coined.message).toContain('Thul-eg');
    // Official hyphenated names (full English fragments) stay legal.
    const official = {
      ...cleanLurker,
      sections: {
        ...cleanLurker.sections,
        Traits: [...cleanLurker.sections.Traits, { name: 'Shape-Shift', text: 'It shifts its shape.' }],
      },
    };
    expect(rules(lint(official, {}))).not.toContain('entry-name-coinage');
  });

  test('defense-overlap: a type both resisted and immune drops from resistances', () => {
    // Live finding: acid in both lines on an ooze — immunity supersedes.
    const doubled = { ...cleanLurker, resistances: 'Bludgeoning, Acid, Lightning', immunities: 'Acid, Poison' };
    const f = lint(doubled, {}).findings.find((x) => x.rule === 'defense-overlap');
    expect(f.severity).toBe('correctable');
    expect(f.expected).toBe('Bludgeoning, Lightning');
    expect(f.loc).toEqual({ field: 'resistances' });
    // Disjoint lines are clean.
    const clean = { ...cleanLurker, resistances: 'Bludgeoning', immunities: 'Poison' };
    expect(rules(lint(clean, {}))).not.toContain('defense-overlap');
  });

  test('condition-unknown: invented conditions reject; the compound official form passes per token', () => {
    const withTrait = (text) => withAction(cleanLurker, 2, { text });
    // 4e-ism / invented status.
    const dazed = withAction(cleanLurker, 2, { text: '*Dexterity Saving Throw*: DC 13, one creature. *Failure:* The target has the Dazed condition.' });
    const f = lint(dazed, {}).findings.find((x) => x.rule === 'condition-unknown');
    expect(f.severity).toBe('reject');
    expect(f.message).toContain('Dazed');
    // Compound SRD form validates each token ("Blinded and Restrained conditions").
    const compound = withAction(cleanLurker, 2, { text: '*Dexterity Saving Throw*: DC 13, one creature. *Failure:* The target has the Blinded and Restrained conditions.' });
    expect(rules(lint(compound, {}))).not.toContain('condition-unknown');
    const badCompound = withAction(cleanLurker, 2, { text: '*Dexterity Saving Throw*: DC 13, one creature. *Failure:* The target has the Blinded and Winded conditions.' });
    expect(rules(lint(badCompound, {}))).toContain('condition-unknown');
  });

  test('damage-type-caps and area-term-caps: lowercase 2024 forms reject (deterministically fixable)', () => {
    const lcType = withAction(cleanLurker, 1, { text: '*Melee Attack Roll:* +7, reach 5 ft. 12 (2d8 + 3) slashing damage.' });
    expect(rules(lint(lcType, {}))).toContain('damage-type-caps');
    const lcArea = withAction(cleanLurker, 2, { text: '*Dexterity Saving Throw*: DC 13, each creature in a 15-foot cone. *Failure:* 21 (6d6) Psychic damage.' });
    expect(rules(lint(lcArea, {}))).toContain('area-term-caps');
    expect(rules(lint(cleanLurker))).not.toContain('damage-type-caps');
  });

  test('swarm passive slots accept both editions\' casing', () => {
    // Live failure: a 2014 swarm's lowercase "bludgeoning, piercing,
    // slashing" failed the case-sensitive slot check → structural reject →
    // doomed regeneration loop. Both casings must satisfy the slots.
    const swarmPlan = slotPlanFor(30, 'swarm');
    for (const casing of [
      { resistances: 'bludgeoning, piercing, slashing', immunities: 'necrotic; charmed, frightened, grappled, paralyzed, petrified, prone, restrained, stunned' },
      { resistances: 'Bludgeoning, Piercing, Slashing', immunities: 'Necrotic; Charmed, Frightened, Grappled, Paralyzed, Petrified, Prone, Restrained, Stunned' },
    ]) {
      const findings = lintStatblock({ ...cleanLurker, ...casing }, { plan: swarmPlan }).findings;
      const passiveMisses = findings.filter((f) =>
        f.rule === 'slot-missing' && /resistance package|condition immunities/.test(f.message));
      expect(passiveMisses).toEqual([]);
    }
  });

  test('cinderbore-round rules: fake statuses and no-effect Success clauses', () => {
    // "is Slowed" — a 4e-ism dodging the "has the X condition" wrapper.
    const slowed = withAction(cleanLurker, 2, { text: '*Strength Saving Throw*: DC 13, one creature. *Failure:* The target falls Prone and is Slowed until the end of its next turn.' });
    expect(rules(lint(slowed, {}))).toContain('condition-fake');
    // Real conditions and Bloodied-style terms in the same shape stay legal.
    const legal = withAction(cleanLurker, 2, { text: '*Strength Saving Throw*: DC 13, one creature. *Failure:* The target is Restrained until the end of its next turn.' });
    expect(rules(lint(legal, {}))).not.toContain('condition-fake');

    // "*Success:* No effect." strips deterministically.
    const noEffect = withAction(cleanLurker, 2, { text: '*Dexterity Saving Throw*: DC 13, one creature. *Failure:* 21 (6d6) Psychic damage. *Success:* No effect.' });
    const findings = lint(noEffect, {}).findings;
    expect(findings.some((f) => f.rule === 'success-no-effect')).toBe(true);
    const { chassis } = { chassis: lurkerChassis };
    const fixed = applyCorrections(noEffect, findings, { chassis });
    expect(fixed.sections.Actions[2].text).not.toContain('Success');
    expect(fixed.sections.Actions[2].text).toContain('21 (6d6) Psychic damage.');
    // The verbose "is not X" form is the same wart (Myrgoth's "Success: The
    // creature is not Restrained.").
    const verbose = withAction(cleanLurker, 2, { text: '*Wisdom Saving Throw*: DC 13, one creature. *Failure:* The target has the Restrained condition. *Success:* The target is not Restrained.' });
    expect(rules(lint(verbose, {}))).toContain('success-no-effect');
  });

  test('rubric-round rules: surprised leakage, bathos entry names, attack-mod coherence', () => {
    // 2024 removed the surprised state (live: "hits a creature that is surprised").
    const surprised = withAction(cleanLurker, 2, { text: '*Dexterity Saving Throw*: DC 13, one creature that is surprised. *Failure:* 21 (6d6) Psychic damage. *Success:* Half damage.' });
    expect(rules(lint(surprised, {}))).toContain('phrasing-surprised');

    // "Slurp" as a stealth trait (live) — bathos ban extends to entry names.
    const slurp = { ...cleanLurker, sections: { ...cleanLurker.sections, Traits: [{ name: 'Slurp', text: 'While in Dim Light, it can take the Hide action as a Bonus Action.' }] } };
    expect(rules(lint(slurp, {}))).toContain('entry-name-bathos');

    // "1d6 + 4" on a creature whose non-CON mods are {1, 3, -2, 2, -1} (live:
    // a rider attack keyed to nothing). CON never sources attack damage.
    const badMod = withAction(cleanLurker, 1, { text: '*Melee Attack Roll:* +7, reach 5 ft. 7 (1d6 + 4) Poison damage.' });
    expect(rules(lint(badMod, {}))).toContain('attack-mod-coherence');
    // The coherent fixture (+3 = DEX mod) stays clean.
    expect(rules(lint(cleanLurker))).not.toContain('attack-mod-coherence');
  });

  test('field-audit rules: self-named entries, swarm heal contradiction, resistance conditions, typography', () => {
    // Live findings from the five-creature field run (2026-07-20).
    const selfNamed = { ...cleanLurker, sections: { ...cleanLurker.sections, Traits: [{ name: 'Gloom Stalker', text: 'It climbs difficult surfaces without a check.' }] } };
    expect(rules(lint(selfNamed, {}))).toContain('entry-name-self');

    const healSwarm = { ...cleanLurker, sections: { ...cleanLurker.sections, Traits: [
      { name: 'Swarm', text: "The swarm can't regain hit points or gain temporary hit points." },
      { name: 'Corpse Feast', text: 'The swarm regains 10 (3d6) hit points.' },
    ] } };
    const heal = lint(healSwarm, {}).findings.find((x) => x.rule === 'swarm-heal-contradiction');
    expect(heal.severity).toBe('reject');
    expect(heal.loc.entry).toBe('Corpse Feast');

    const resCond = { ...cleanLurker, resistances: 'Fire, Charmed, Frightened', immunities: 'Poison' };
    expect(rules(lint(resCond, {}))).toContain('resistance-conditions');

    const circle = withAction(cleanLurker, 2, { text: '*Dexterity Saving Throw*: DC 13, each creature in a 30-foot-radius circle centred on a point within 60 feet. *Failure:* 21 (6d6) Psychic damage. *Success:* Half damage only.' });
    const rs = rules(lint(circle, {}));
    expect(rs).toContain('area-circle');
    expect(rs).toContain('spelling-centred');

    const legend = { ...cleanLurker, sections: { ...cleanLurker.sections, 'Legendary Actions': [{ name: 'Slam (Costs 2 Actions)', text: 'It slams once.' }] } };
    const lc = lint(legend, {}).findings.find((x) => x.rule === 'legendary-cost-2024');
    expect(lc.severity).toBe('correctable');
    expect(lc.expected).toBe('Slam');
  });

  test('swarm-half-damage: the reduced-damage clause must actually exist, tags are not enough', () => {
    const swarmChassis = applyArchetype(chassisFor(9), 'swarm');
    const missing = lintStatblock(cleanLurker, { chassis: swarmChassis }).findings
      .find((x) => x.rule === 'swarm-half-damage');
    expect(missing.loc).toEqual({ section: 'Actions', entry: 'Shadow Claw' });
    const withClause = withAction(cleanLurker, 1, { text: '*Melee Attack Roll:* +7, reach 5 ft. 12 (2d8 + 3) Slashing damage, or 5 (1d4 + 3) Slashing damage if the swarm has half of its Hit Points or fewer.' });
    expect(lintStatblock(withClause, { chassis: swarmChassis }).findings
      .some((x) => x.rule === 'swarm-half-damage')).toBe(false);
  });

  test('swarm-type: swarm archetype demands the swarm type line', () => {
    // Live finding: a 2014 swarm generated as "Medium aberration".
    const swarmChassis = applyArchetype(chassisFor(9), 'swarm');
    const wrongType = { ...cleanLurker, type: 'Aberration' };
    const f = lintStatblock(wrongType, { chassis: swarmChassis }).findings
      .find((x) => x.rule === 'swarm-type');
    expect(f.severity).toBe('correctable');
    expect(f.expected).toBe('Swarm of Tiny Aberrations');
    expect(f.loc).toEqual({ field: 'type' });
    const rightType = { ...cleanLurker, type: 'Swarm of Tiny Aberrations' };
    expect(lintStatblock(rightType, { chassis: swarmChassis }).findings
      .some((x) => x.rule === 'swarm-type')).toBe(false);
    // Non-swarm archetypes never fire it.
    expect(rules(lint({ ...cleanLurker, type: 'Aberration' }))).not.toContain('swarm-type');
  });

  test('escape-dc: asymmetric band — well under the save DC passes (official style), above it flags', () => {
    // Chassis save DC is 13. Official escape DCs run LOW, so 9 passes.
    const low = withAction(cleanLurker, 1, { text: '*Melee Attack Roll:* +7, reach 5 ft. 12 (2d8 + 3) Slashing damage. If the target is Medium or smaller, it has the Grappled condition (escape DC 9).' });
    expect(rules(lint(low))).not.toContain('escape-dc');
    const high = withAction(cleanLurker, 1, { text: '*Melee Attack Roll:* +7, reach 5 ft. 12 (2d8 + 3) Slashing damage. If the target is Medium or smaller, it has the Grappled condition (escape DC 18).' });
    const f = lint(high).findings.find((x) => x.rule === 'escape-dc');
    expect(f.severity).toBe('correctable');
    expect(f.expected).toBe(11); // save_dc − 2, the typical official offset
    // Context-free lint (no chassis) never runs the rule — corpus safe.
    expect(rules(lint(high, {}))).not.toContain('escape-dc');
  });

  test('reaction-trigger: a trigger-less Reaction rejects; Trigger/Response and SRD delegation pass', () => {
    const withReaction = (text) => ({
      ...cleanLurker,
      sections: { ...cleanLurker.sections, Reactions: [{ name: 'Mind-Spore', text }] },
    });
    // Reads like an action wearing a reaction's hat (live finding).
    const broken = withReaction('One creature within 60 feet must succeed on a saving throw or have the Incapacitated condition for 1 minute.');
    const result = lint(broken, {});
    const finding = result.findings.find((f) => f.rule === 'reaction-trigger');
    expect(finding.severity).toBe('reject');
    expect(finding.loc).toEqual({ section: 'Reactions', entry: 'Mind-Spore' });
    // Official 2024 form passes.
    expect(rules(lint(withReaction('*Trigger:* A creature within 30 feet hits the stalker with an attack roll. *Response:* The stalker teleports up to 15 feet.'), {})))
      .not.toContain('reaction-trigger');
    // The SRD's delegating form ("Protective Magic") passes.
    expect(rules(lint(withReaction("The stalker casts *Shield* in response to the spell's trigger."), {})))
      .not.toContain('reaction-trigger');
    // 2014 triggers are loose prose — prompt-enforced only, never linted.
    expect(rules(lint(broken, { edition: '2014' }))).not.toContain('reaction-trigger');
    // Empty text = pseudo-block name stub (reroll lint), skipped.
    expect(rules(lint(withReaction(''), {}))).not.toContain('reaction-trigger');
  });

  test('spell-dc-ability: DC must derive from the named ability (8 + PB + mod, ±1)', () => {
    // cleanLurker: pb 2, CHA 8 (mod -1) → derived DC 9; declared 13 is off by 4.
    const weak = withAction(cleanLurker, 2, {
      text: 'The stalker casts spells, using Charisma as the spellcasting ability (spell save DC 13): At will: Minor Illusion.',
    });
    expect(rules(lint(weak, {}))).toContain('spell-dc-ability');
    // WIS 14 (mod +2) → derived 12; declared 13 is within ±1.
    const ok = withAction(cleanLurker, 2, {
      text: 'The stalker casts spells, using Wisdom as the spellcasting ability (spell save DC 13): At will: Minor Illusion.',
    });
    expect(rules(lint(ok, {}))).not.toContain('spell-dc-ability');
  });

  test('condition-caps: lowercase condition word', () => {
    const broken = withAction(cleanLurker, 1, {
      text: '*Melee Attack Roll:* +7, reach 5 ft. 12 (2d8 + 3) Slashing damage, and the target is knocked prone.',
    });
    expect(rules(lint(broken))).toContain('condition-caps');
  });

  test('ac-band / attack-band / dc-band: numbers outside ±1 of budget', () => {
    expect(rules(lint({ ...cleanLurker, ac: 16 }))).toContain('ac-band');
    const hotAttack = withAction(cleanLurker, 1, {
      text: '*Melee Attack Roll:* +9, reach 5 ft. 12 (2d8 + 3) Slashing damage.',
    });
    expect(rules(lint(hotAttack))).toContain('attack-band');
    const hotDC = withAction(cleanLurker, 2, {
      text: '*Dexterity Saving Throw*: DC 15, one creature. *Failure:* 21 (6d6) Psychic damage. *Success:* Half damage.',
    });
    expect(rules(lint(hotDC))).toContain('dc-band');
  });

  test('hp-band: internally consistent HP still outside the budget band', () => {
    // 9d8 + 4 averages 44; 44/59 ≈ 0.75 falls just below the band.
    const result = lint({ ...cleanLurker, hp: 44, hp_formula: '9d8 + 4' });
    expect(rules(result)).toEqual(['hp-band']);
    expect(result.findings[0].expected).toBe(59);
  });

  test('slot-missing: required slot without a tagged entry', () => {
    const broken = withAction(cleanLurker, 2, { slot: undefined });
    const result = lint(broken);
    expect(rules(result)).toContain('slot-missing');
    expect(result.findings.find((f) => f.rule === 'slot-missing').severity).toBe('reject');
  });

  test('multiattack: required at tier 3 but absent', () => {
    const broken = {
      ...cleanLurker,
      sections: { ...cleanLurker.sections, Actions: cleanLurker.sections.Actions.slice(1) },
    };
    expect(rules(lint(broken))).toContain('multiattack');
  });

  test('multiattack: forbidden at tier 1 but present', () => {
    const minion = {
      name: 'Test', cr: 0.25, hp: 13, ac: 12,
      stats: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 },
      sections: { Actions: [{ name: 'Multiattack', text: 'Two attacks.' }] },
    };
    expect(rules(lintStatblock(minion, { plan: slotPlanFor(0.25, null) }))).toContain('multiattack');
  });

  test('legendary: required at tier 6 but absent', () => {
    expect(rules(lint(cleanLurker, { plan: slotPlanFor(25, null) }))).toContain('legendary');
  });

  test('section-structure: forbidden section present at tier 1', () => {
    const minion = {
      name: 'Test', cr: 0.25, hp: 13, ac: 12,
      stats: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 },
      sections: {
        Actions: [{ name: 'Peck', text: '*Melee Attack Roll:* +4, reach 5 ft. 1 Piercing damage.' }],
        Reactions: [{ name: 'Flinch', text: 'It flinches.' }],
      },
    };
    expect(rules(lintStatblock(minion, { plan: slotPlanFor(0.25, null) }))).toContain('section-structure');
  });

  test('counts: entry counts outside the plan range', () => {
    const extraTraits = {
      ...cleanLurker,
      sections: {
        ...cleanLurker.sections,
        Traits: [1, 2, 3, 4].map((n) => ({ name: `T${n}`, text: 'A trait.' })),
      },
    };
    expect(rules(lint(extraTraits))).toContain('counts');
  });

  test('passive slots: field-level obligations checked directly', () => {
    const swarmPlan = slotPlanFor(0.25, 'swarm');
    const swarm = {
      name: 'Rat Swarm', cr: 0.25, hp: 13, ac: 11,
      stats: { STR: 9, DEX: 11, CON: 9, INT: 2, WIS: 10, CHA: 3 },
      resistances: 'Bludgeoning, Piercing, Slashing',
      immunities: 'Charmed, Frightened, Grappled, Paralyzed, Petrified, Prone, Restrained, Stunned',
      sections: {
        Traits: [{ name: 'Swarm', slot: "swarm trait (occupy other creatures' space, no Tiny-space penalty)", text: 'The swarm can occupy another creature\'s space and vice versa.' }],
        Actions: [{ name: 'Bites', slot: 'half-damage attack mode at or below half HP', text: '*Melee Attack Roll:* +2, reach 5 ft. 5 (2d4) Piercing damage, or 2 (1d4) Piercing damage if the swarm is at half its Hit Points or fewer.' }],
      },
    };
    expect(rules(lintStatblock(swarm, { plan: swarmPlan }))).toEqual([]);
    const noImmunities = { ...swarm, immunities: 'Charmed, Frightened' };
    expect(rules(lintStatblock(noImmunities, { plan: swarmPlan }))).toContain('slot-missing');
  });

  test('passive slots: high STR for brutes', () => {
    const brutePlan = slotPlanFor(5, 'brute');
    const base = {
      name: 'Test Brute', cr: 5, hp: 124, ac: 14,
      stats: { STR: 19, DEX: 10, CON: 16, INT: 5, WIS: 8, CHA: 5 },
      sections: { Actions: [] },
    };
    const strFinding = (block) =>
      lintStatblock(block, { plan: brutePlan }).findings
        .some((f) => f.rule === 'slot-missing' && f.message.includes('high STR'));
    expect(strFinding(base)).toBe(false);
    expect(strFinding({ ...base, stats: { ...base.stats, STR: 12 } })).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// 2. Boundary exactness
// ---------------------------------------------------------------------------
describe('band boundaries are inclusive', () => {
  const chassis = { hp: 100, ac: 15, attack_bonus: 7, save_dc: 14 };
  const block = (patch, text) => ({
    name: 'Edge Case', cr: 5, hp: 100, ac: 15,
    stats: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 },
    sections: { Actions: [{ name: 'Strike', text: text ?? '*Melee Attack Roll:* +7, reach 5 ft. 11 (2d10) Slashing damage.' }] },
    ...patch,
  });
  const bandRules = (b) => rules(lintStatblock(b, { chassis }));

  test.each([
    [75, true], [74, false], [135, true], [136, false],
  ])('hp %p in band: %p', (hp, ok) => {
    expect(bandRules(block({ hp })).includes('hp-band')).toBe(!ok);
  });

  test.each([
    [16, true], [17, false], [14, true], [13, false],
  ])('ac %p in band: %p', (ac, ok) => {
    expect(bandRules(block({ ac })).includes('ac-band')).toBe(!ok);
  });

  test.each([
    ['+8', true], ['+9', false], ['+6', true], ['+5', false],
  ])('attack %s in band: %p', (atk, ok) => {
    const b = block({}, `*Melee Attack Roll:* ${atk}, reach 5 ft. 11 (2d10) Slashing damage.`);
    expect(bandRules(b).includes('attack-band')).toBe(!ok);
  });

  test.each([
    [15, true], [16, false], [13, true], [12, false],
  ])('DC %p in band: %p', (dc, ok) => {
    const b = block({}, `*Wisdom Saving Throw*: DC ${dc}, one creature. *Failure:* 11 (2d10) Psychic damage.`);
    expect(bandRules(b).includes('dc-band')).toBe(!ok);
  });

  test('check DCs cannot mask under-budget save DCs', () => {
    // Save DC 12 is 2 under the 14 budget; the Investigation DC 15 used to
    // top the max and hide it.
    const masked = block({}, '*Wisdom Saving Throw*: DC 12, one creature. *Failure:* 11 (2d10) Psychic damage. A creature can discern its nature with a DC 15 Intelligence (Investigation) check.');
    expect(bandRules(masked)).toContain('dc-band');
  });
});

// ---------------------------------------------------------------------------
// 3. SRD clean pass (false-positive guarantee)
// ---------------------------------------------------------------------------
describe('SRD corpus', () => {
  test('context-free rules accept all 329 official blocks (3 documented quirks)', () => {
    // The SRD source itself carries: vestigial "to hit" in exactly two
    // attack lines (Ancient Gold Dragon's Rend, Bat's Bite), and two flat
    // damage bonuses that derive from no non-CON ability mod (Frost Giant's
    // War Cry +5, Giant Frog's Bite +2). Everything else must lint clean —
    // if a rule flags official text, the rule is wrong.
    // (Frost Giant's War Cry +5 also derives from no non-CON mod, but that
    // expression lives in a save effect, and attack-mod-coherence is gated
    // to attack lines — so it stays clean.)
    const QUIRKS = {
      'Ancient Gold Dragon': ['phrasing-to-hit'],
      Bat: ['phrasing-to-hit'],
      'Giant Frog': ['attack-mod-coherence'],
    };
    for (const m of monsters) {
      const result = lintStatblock(m);
      if (QUIRKS[m.name]) {
        expect({ name: m.name, rules: rules(result) }).toEqual({ name: m.name, rules: QUIRKS[m.name] });
      } else {
        expect({ name: m.name, findings: result.findings }).toEqual({ name: m.name, findings: [] });
      }
    }
  });
});

// ---------------------------------------------------------------------------
// 4. Severity routing
// ---------------------------------------------------------------------------
describe('severity routing', () => {
  test('numeric findings are correctable and carry expected values', () => {
    const result = lint({ ...cleanLurker, ac: 17, pb: 3 });
    for (const f of result.findings) {
      expect(f.severity).toBe('correctable');
      expect(f.expected).toEqual(expect.any(Number));
    }
    expect(rules(result)).toEqual(expect.arrayContaining(['ac-band', 'pb']));
  });

  test('slot and phrasing findings are reject', () => {
    const broken = withAction(
      { ...cleanLurker, sections: { ...cleanLurker.sections } }, 2,
      { slot: undefined, text: 'Melee Weapon Attack: +7 to hit, reach 5 ft.' }
    );
    const result = lint(broken);
    expect(result.ok).toBe(false);
    for (const f of result.findings) expect(f.severity).toBe('reject');
  });

  test('avgDice mirrors the reference implementation', () => {
    expect(avgDice('20d10 + 40')).toBe(150);
    expect(avgDice('12d10+24')).toBe(90);
    expect(avgDice('11d4')).toBe(27);
    expect(avgDice('1d4 - 1')).toBe(1);
    expect(avgDice('not dice')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// 5. Slot-tag protocol
// ---------------------------------------------------------------------------
describe('slot-tag protocol', () => {
  test('flexible slots accept any allowed section', () => {
    // The nova slot is ['trait', 'action'] — move it to Traits; slot check
    // still passes (only the action-count rule complains about the plan).
    const moved = {
      ...cleanLurker,
      sections: {
        Traits: [...cleanLurker.sections.Traits, cleanLurker.sections.Actions[2]],
        Actions: cleanLurker.sections.Actions.slice(0, 2),
      },
    };
    const result = lint(moved);
    expect(rules(result)).not.toContain('slot-missing');
    expect(rules(result)).toContain('counts');
  });

  test('a tag in a disallowed section does not satisfy the slot', () => {
    // Stealth slot is trait-only; tagging an Action with it must not count.
    const misplaced = {
      ...cleanLurker,
      sections: {
        Traits: [],
        Actions: [
          ...cleanLurker.sections.Actions,
          { name: 'Fade', slot: 'stealth/phasing/invisibility trait', text: 'It fades from view and has the Invisible condition.' },
        ],
      },
    };
    expect(rules(lint(misplaced))).toContain('slot-missing');
  });
});
