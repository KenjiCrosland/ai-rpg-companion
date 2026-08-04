/**
 * Batch-24 regressions (2026-07-30, Mudgrave Warden live text): the
 * duplicated slot-tagged action that slipped two existing rules, plus the
 * Entomb immune/threshold loop and check-imposed conditions. Sweeps:
 * same-section duplicate names 0/329 (cross-section delegation names stay
 * legal); immune+threshold 0/329; check-imposes 0/329.
 */
import { lintStatblock } from '../format-2024/lint.mjs';
import { applyCorrections, assembleMonster } from '../format-2024/generate.mjs';

const chassis = { archetype: 'balanced', save_dc: 25 };
const rulesFor = (m, rule, opts = {}) =>
  lintStatblock(m, { chassis, edition: '2024', ...opts }).findings.filter((f) => f.rule === rule);
const wrap = (section, name, text) =>
  ({ type: 'Elemental', name: 'Mudgrave Warden', sections: { [section]: [{ name, text }] } });

const PULSE = 'Strength Saving Throw: DC 25, each creature in a 30-foot Cone. Failure: The target takes 42 (12d6) Force damage and has the Prone condition. Success: Half damage.';

describe('duplicate-name (the doubled Gravity Pulse)', () => {
  test('same-section same-name identical-modulo-slot-tag copies drop deterministically', () => {
    const m = {
      type: 'Elemental', name: 'Mudgrave Warden',
      sections: { Actions: [
        { name: 'Gravity Pulse', text: PULSE },
        { name: 'Gravity Pulse', text: `${PULSE} (slot: save-based action imposing a condition (2024 capitalized condition names))` },
      ] },
    };
    const f = rulesFor(m, 'duplicate-name');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.sections.Actions).toHaveLength(1);
    expect(fixed.sections.Actions[0].text).toBe(PULSE);
  });

  test('cross-section shared names stay legal (official delegation pattern)', () => {
    const m = {
      type: 'Elemental', name: 'Mudgrave Warden',
      sections: {
        Actions: [{ name: 'Stone Pillar', text: 'Melee Attack Roll: +16, reach 15 ft. 45 (8d8 + 9) Bludgeoning damage.' }],
        'Legendary Actions': [{ name: 'Stone Pillar', text: 'The mudgrave warden makes one Stone Pillar attack.' }],
      },
    };
    expect(rulesFor(m, 'duplicate-name')).toHaveLength(0);
  });
});

describe('slot-tag assembly strip (root cause)', () => {
  test('a nested slot annotation never survives assembly into entry text', () => {
    const llm = {
      name: 'Mudgrave Warden', size: 'Large', type: 'Elemental', alignment: 'Lawful Neutral',
      speed: '30 ft.', stats: { STR: 10, DEX: 10, CON: 20, INT: 28, WIS: 16, CHA: 12 },
      sections: { Actions: [{ name: 'Gravity Pulse', text: `${PULSE} (slot: save-based action imposing a condition (2024 capitalized condition names))` }] },
    };
    const m = assembleMonster(llm, { cr: 24, chassis: { ...chassis, ac: 22, hp: 378, attack_bonus: 16, pb: 7 }, plan: null, archetypeName: 'balanced' });
    expect(m.sections.Actions[0].text).not.toContain('slot:');
    expect(m.sections.Actions[0].text).toContain('Success: Half damage.');
  });
});

describe('immune-damage-end-contradiction (Entomb)', () => {
  test('immune-to-damage plus a damage-threshold end is a reject', () => {
    const m = wrap('Actions', 'Entomb (1/Day)',
      'Strength Saving Throw: DC 25, one creature within 60 feet. Failure: The target is encased in solid crystal and has the Petrified condition. While Petrified, the target is Immune to damage and conditions. The effect ends for the target if it takes 50 or more damage from a single source.');
    expect(rulesFor(m, 'immune-damage-end-contradiction')).toHaveLength(1);
  });

  test('resistance plus a threshold is coherent and passes', () => {
    const m = wrap('Actions', 'Entomb (1/Day)',
      'Failure: The target is encased in solid crystal and has the Petrified condition, with Resistance to all damage. The effect ends for the target if it takes 50 or more damage from a single source.');
    expect(rulesFor(m, 'immune-damage-end-contradiction')).toHaveLength(0);
  });
});

describe('check-imposes-condition (Tectonic Aura)', () => {
  test('an aura imposing Prone on a failed Strength check is a reject', () => {
    const m = wrap('Traits', 'Tectonic Aura',
      'At the end of each of the mudgrave warden\'s turns, each creature of its choice in a 20-foot Emanation originating from it must succeed on a Strength check (DC 25) or have the Prone condition.');
    expect(rulesFor(m, 'check-imposes-condition')).toHaveLength(1);
  });

  test('escape checks stay legal (no "or <effect>" clause)', () => {
    const m = wrap('Actions', 'Stone Pillar',
      'Hit: 45 (8d8 + 9) Bludgeoning damage and the target has the Restrained condition (escape DC 23). The target or a creature within 5 feet of it can use an action to make a DC 23 Strength check, freeing the target on a success.');
    expect(rulesFor(m, 'check-imposes-condition')).toHaveLength(0);
  });
});

describe('batch 25: type-damage and spell affinity (Weeping Reaper)', () => {
  test('Necrotic on an Elemental is a reject; on a Monstrosity it passes (2/37 official)', () => {
    const text = 'While Grappled, the target takes 7 (2d6) Necrotic damage at the start of each of the reaper\'s turns.';
    const elemental = { type: 'Elemental', name: 'Weeping Reaper', sections: { Actions: [{ name: 'Entangling Grasp', text }] } };
    expect(lintStatblock(elemental, { chassis, edition: '2024' }).findings.filter((x) => x.rule === 'type-damage-affinity')).toHaveLength(1);
    const monstrosity = { ...elemental, type: 'Monstrosity' };
    expect(lintStatblock(monstrosity, { chassis, edition: '2024' }).findings.filter((x) => x.rule === 'type-damage-affinity')).toHaveLength(0);
  });

  test('Animate Dead on a non-Undead non-caster type is a reject; the Lich shape passes', () => {
    const text = 'The reaper casts one of the following spells: At will: Minor Illusion. 1/Day each: Animate Dead, Blight.';
    const elemental = { type: 'Elemental', name: 'Weeping Reaper', sections: { Actions: [{ name: 'Spellcasting', text }] } };
    expect(lintStatblock(elemental, { chassis, edition: '2024' }).findings.filter((x) => x.rule === 'spell-type-affinity')).toHaveLength(1);
    const undead = { ...elemental, type: 'Undead' };
    expect(lintStatblock(undead, { chassis, edition: '2024' }).findings.filter((x) => x.rule === 'spell-type-affinity')).toHaveLength(0);
    const humanoid = { ...elemental, type: 'Humanoid' };
    expect(lintStatblock(humanoid, { chassis, edition: '2024' }).findings.filter((x) => x.rule === 'spell-type-affinity')).toHaveLength(0);
  });
});

describe('batch 26: Soulbog fixes', () => {
  test('fused Grappled-and-Restrained gains the official linkage', () => {
    const m = { type: 'Undead', name: 'Soulbog', sections: { Actions: [{ name: 'Engulfing Grasp',
      text: 'Dexterity Saving Throw: DC 18, one creature within 20 feet. Failure: The target has the Grappled condition (escape DC 16) and the Restrained condition. While Grappled, the target takes 11 (2d10) Necrotic damage at the start of each of the soulbog\'s turns.' }] } };
    const f = lintStatblock(m, { chassis, edition: '2024' }).findings.filter((x) => x.rule === 'grapple-restrain-linkage');
    expect(f).toHaveLength(1);
    const fixed = applyCorrections(m, f, { chassis });
    expect(fixed.sections.Actions[0].text).toContain('(escape DC 16). Until the grapple ends, the target also has the Restrained condition.');
  });

  test('the official until-linkage form passes untouched', () => {
    const m = { type: 'Monstrosity', name: 'Roper', sections: { Actions: [{ name: 'Tendril',
      text: 'Hit: The target has the Grappled condition (escape DC 14). Until the grapple ends, the target also has the Restrained condition.' }] } };
    expect(lintStatblock(m, { chassis, edition: '2024' }).findings.filter((x) => x.rule === 'grapple-restrain-linkage')).toHaveLength(0);
  });

  test('paren-mute languages normalize to the official form at assembly', () => {
    const llm = {
      name: 'Soulbog', size: 'Large', type: 'Undead', alignment: 'Neutral Evil',
      speed: '40 ft.', stats: { STR: 18, DEX: 24, CON: 18, INT: 14, WIS: 12, CHA: 20 },
      languages: "Common (can't speak)",
      sections: { Actions: [{ name: 'Slam', text: 'Melee Attack Roll: +12, reach 5 ft. 11 (1d8 + 7) Acid damage.' }] },
    };
    const m = assembleMonster(llm, { cr: 14, chassis: { ...chassis, ac: 18, hp: 190, attack_bonus: 12, pb: 5 }, plan: null, archetypeName: 'lurker' });
    expect(m.languages).toBe("understands Common but can't speak");
  });
});

describe('batch 27: multiattack substitution clauses (Frostgrave)', () => {
  // The live block's Ice Shard: 10 damage. Against the TRUE 3-attack budget
  // of 14 that is 0.71 and out of band; against the phantom 4-attack budget
  // of 11 it is 0.91 and passes. That gap is the bug.
  const shard = { name: 'Ice Shard', text: 'Ranged Attack Roll: +12, range 60 ft. 10 (1d6 + 7) Cold damage.' };
  const block = (multiattackText) => ({
    type: 'Monstrosity', name: 'Frostgrave',
    sections: { Actions: [{ name: 'Multiattack', text: multiattackText }, shard] },
  });
  // CR 16 controller: 43 total damage across its real attacks.
  const opts = { chassis: { archetype: 'controller', save_dc: 21 }, edition: '2024', perAttack: 14, totalDamage: 43 };
  const band = (m) => lintStatblock(m, opts).findings.filter((x) => x.rule === 'attack-damage-band');

  test('a "can replace" clause no longer inflates the attack count', () => {
    const m = block('The frostgrave makes two Claw attacks and one Ice Shard attack. It can replace one Claw attack with a use of Collapse Earth if available.');
    const f = band(m);
    expect(f).toHaveLength(1);
    expect(f[0].message).toContain('14 per-attack budget'); // 43/3, not 43/4
  });

  test('the same block with no substitution clause budgets identically', () => {
    const m = block('The frostgrave makes two Claw attacks and one Ice Shard attack.');
    expect(band(m)[0].message).toContain('14 per-attack budget');
  });

  test('the official "replace one attack with Spellcasting" shape is unaffected', () => {
    const m = block('The creature makes three Rend attacks. It can replace one attack with a use of Spellcasting.');
    expect(band(m)[0].message).toContain('14 per-attack budget');
  });

  test('an on-budget attack still passes', () => {
    const m = {
      type: 'Monstrosity', name: 'Frostgrave',
      sections: { Actions: [
        { name: 'Multiattack', text: 'The frostgrave makes three Ice Shard attacks. It can replace one Ice Shard attack with a use of Collapse Earth.' },
        { name: 'Ice Shard', text: 'Ranged Attack Roll: +12, range 60 ft. 14 (2d6 + 7) Cold damage.' },
      ] },
    };
    expect(band(m)).toHaveLength(0);
  });
});

describe('batch 27b: save DC must be supported by an ability score (Frostgrave)', () => {
  // CR 16, PB +5, best modifier +7 (STR 24) → ceiling 20. The chassis
  // stamped 21 because the controller role bumps the DC.
  const frost = () => ({
    type: 'Monstrosity', name: 'Frostgrave', pb: 5,
    stats: { STR: 24, DEX: 14, CON: 22, INT: 16, WIS: 18, CHA: 12 },
    sections: { Actions: [
      { name: 'Collapse Earth (3/Day)', text: 'Dexterity Saving Throw: DC 21, each creature in a 20-foot Emanation originating from it. Failure: 22 (5d8) Bludgeoning damage.' },
      { name: 'Entombing Frost', text: 'Constitution Saving Throw: DC 21, one creature within 30 feet. Failure: The target has the Restrained condition (escape DC 19).' },
    ] },
  });
  const opts = { chassis: { archetype: 'controller', save_dc: 21 }, edition: '2024' };
  const findings = (m) => lintStatblock(m, opts).findings.filter((x) => x.rule === 'save-dc-unsupported');

  test('a DC above 8 + PB + best modifier is flagged and clamped', () => {
    const m = frost();
    const f = findings(m);
    expect(f).toHaveLength(1);
    expect(f[0].message).toContain('= 20');
    const fixed = applyCorrections(m, f, { chassis: opts.chassis });
    expect(fixed.sections.Actions[0].text).toContain('Saving Throw: DC 20');
    expect(fixed.sections.Actions[1].text).toContain('Saving Throw: DC 20');
    expect(findings(fixed)).toHaveLength(0);
  });

  test('escape DCs are untouched by the clamp', () => {
    const m = frost();
    const fixed = applyCorrections(m, findings(m), { chassis: opts.chassis });
    expect(fixed.sections.Actions[1].text).toContain('(escape DC 19)');
  });

  test('a DC sitting exactly on the ceiling passes (54 officials do)', () => {
    const m = frost();
    for (const e of m.sections.Actions) e.text = e.text.replace(/DC 21/g, 'DC 20');
    expect(findings(m)).toHaveLength(0);
  });

  test('a stat that supports the DC keeps it (raise the score, keep the number)', () => {
    const m = frost();
    m.stats.STR = 26; // +8 → ceiling 21
    expect(findings(m)).toHaveLength(0);
  });
});

describe('batch 27c: legendary budget accounting + the glass cannon role', () => {
  const { buildContext, damageBudgetFor } = require('../format-2024/generate.mjs');
  const total = (cr, role) => {
    const { chassis, plan } = buildContext(cr, role);
    return damageBudgetFor(cr, chassis, plan).total;
  };

  test('the routine is a FRACTION of total output, not all of it', () => {
    // A legendary creature spends its budget across its turn and its
    // legendary actions. Routine 0.6, legendary actions carry the rest.
    // Removing this discount was the wrong fix for the Frostgrave; the
    // real bug was the multiattack count.
    expect(total(16, 'balanced') / total(16, 'balanced')).toBe(1);
    const { chassis, plan } = buildContext(16, 'balanced');
    const routine = damageBudgetFor(16, chassis, plan).total;
    expect(routine).toBeGreaterThan(55);
    expect(routine).toBeLessThan(70); // ~0.6 of a ~102 midpoint
  });

  test('role multipliers still apply on top, in order', () => {
    for (const cr of [16, 22, 30]) {
      expect(total(cr, 'brute')).toBeGreaterThan(total(cr, 'balanced'));
      expect(total(cr, 'balanced')).toBeGreaterThan(total(cr, 'defender'));
      expect(total(cr, 'defender')).toBeGreaterThan(total(cr, 'controller'));
    }
  });

  test('non-legendary tiers take the role multiplier alone', () => {
    expect(total(4, 'controller') / total(4, 'balanced')).toBeCloseTo(0.7, 1);
  });

  test('all-utility legendary actions are a reject (the budget assumes they pay)', () => {
    const utility = {
      type: 'Monstrosity', name: 'Frostgrave',
      sections: { 'Legendary Actions': [
        { name: 'Burrow', text: 'The frostgrave moves up to its Burrow Speed.' },
        { name: 'Shift', text: 'The frostgrave teleports up to 30 feet to an unoccupied space it can see.' },
      ] },
    };
    const f = lintStatblock(utility, { chassis, edition: '2024' }).findings.filter((x) => x.rule === 'legendary-no-damage');
    expect(f).toHaveLength(1);
    expect(f[0].severity).toBe('reject');
  });

  test('one damaging or delegating option satisfies it (30/30 officials do)', () => {
    const mixed = (third) => ({
      type: 'Monstrosity', name: 'Frostgrave',
      sections: { 'Legendary Actions': [
        { name: 'Burrow', text: 'The frostgrave moves up to its Burrow Speed.' },
        third,
      ] },
    });
    const delegates = mixed({ name: 'Ice Shard', text: 'The frostgrave makes one Ice Shard attack.' });
    const damages = mixed({ name: 'Shards', text: 'Dexterity Saving Throw: DC 20, one creature. Failure: 10 (3d6) Cold damage.' });
    for (const m of [delegates, damages]) {
      expect(lintStatblock(m, { chassis, edition: '2024' }).findings.filter((x) => x.rule === 'legendary-no-damage')).toHaveLength(0);
    }
  });

  test('glass cannon out-damages every role and is the most fragile', () => {
    const { chassis: gc } = buildContext(12, 'glass_cannon');
    const { chassis: brute } = buildContext(12, 'brute');
    const { chassis: bal } = buildContext(12, 'balanced');
    expect(total(12, 'glass_cannon')).toBeGreaterThan(total(12, 'brute'));
    expect(gc.hp).toBeLessThan(bal.hp);
    expect(gc.hp).toBeLessThan(brute.hp);
    expect(gc.ac).toBeLessThan(bal.ac);
    expect(gc.attack_bonus).toBeGreaterThanOrEqual(bal.attack_bonus);
  });

  test('glass cannon offsets its offense with defense, not free power', () => {
    const { chassis: gc } = buildContext(12, 'glass_cannon');
    const { chassis: bal } = buildContext(12, 'balanced');
    expect(gc.hp / bal.hp).toBeLessThan(0.8);
    expect(total(12, 'glass_cannon') / total(12, 'balanced')).toBeGreaterThan(1.2);
  });

  test('it is offered in the UI with a readable multi-word label', () => {
    const { ARCHETYPE_OPTIONS, ARCHETYPE_HELP } = require('@/util/embedded-statblock.mjs');
    const opt = ARCHETYPE_OPTIONS.find((o) => o.value === 'glass_cannon');
    expect(opt).toBeTruthy();
    expect(opt.label).toBe('Glass cannon');
    expect(ARCHETYPE_HELP.glass_cannon).toContain('dies fast');
  });
});
