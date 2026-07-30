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
