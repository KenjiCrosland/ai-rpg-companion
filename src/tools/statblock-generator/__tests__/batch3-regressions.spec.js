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
