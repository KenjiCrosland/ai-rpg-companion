/**
 * 2014-edition engine tests (statblock-2014-archetype-retrofit).
 *
 * The chassis/slot-plan/budget layers are edition-agnostic and covered by
 * their own suites; these tests cover what the retrofit adds: edition-aware
 * lint, 2014 assembly → legacy-model conversion, and orchestration returning
 * the legacy shape.
 */
import {
  generateMonster2024, assembleMonster, toLegacyModel, buildContext,
} from '../format-2024/generate.mjs';
import { lintStatblock } from '../format-2024/lint.mjs';

// Lurker CR 4 with 2014 phrasing (chassis: hp 59, ac 14, attack +7, DC 13).
const llm2014Fixture = {
  name: 'Gloom Stalker',
  size: 'Medium', type: 'Monstrosity', alignment: 'neutral evil',
  speed: '40 ft.',
  stats: { STR: 12, DEX: 16, CON: 12, INT: 6, WIS: 14, CHA: 8 },
  save_proficiencies: ['DEX'],
  skill_proficiencies: ['Stealth'],
  senses_special: 'darkvision 60 ft.',
  immunities: 'Poison; Poisoned',
  sections: {
    Traits: [
      { name: 'Umbral Veil', slot: 'stealth/phasing/invisibility trait', text: 'While in dim light or darkness, the stalker is invisible.' },
    ],
    Actions: [
      { name: 'Multiattack', text: 'The stalker makes two Shadow Claw attacks.' },
      { name: 'Shadow Claw', text: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.' },
      { name: 'Ambush Pounce', slot: 'ambush or once-per-fight nova mechanic', text: 'Each creature within 10 feet must make a DC 13 Dexterity saving throw, taking 21 (6d6) psychic damage on a failed save, or half as much damage on a successful one.' },
    ],
  },
};

const ctx = () => {
  const { chassis, plan, archetype } = buildContext(4, 'lurker');
  return { cr: 4, chassis, plan, archetypeName: archetype, archetypeSource: 'user' };
};

describe('edition-aware lint', () => {
  const internal = assembleMonster(llm2014Fixture, ctx());
  const { chassis, plan } = buildContext(4, 'lurker');

  test('2014 phrasing lints clean under edition 2014', () => {
    expect(lintStatblock(internal, { chassis, plan, edition: '2014' })).toEqual({ ok: true, findings: [] });
  });

  test('the same block is rejected under edition 2024 (phrasing gate flipped)', () => {
    const rules = lintStatblock(internal, { chassis, plan }).findings.map((f) => f.rule);
    expect(rules).toContain('phrasing-2014');
    expect(rules).toContain('phrasing-to-hit');
  });

  test('2024 phrasing is rejected under edition 2014', () => {
    const modern = JSON.parse(JSON.stringify(internal));
    modern.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 5 ft. 13 (2d8 + 4) Slashing damage.';
    const rules = lintStatblock(modern, { chassis, plan, edition: '2014' }).findings.map((f) => f.rule);
    expect(rules).toContain('phrasing-2024-in-2014');
  });

  test('shared rules still fire in 2014 mode: bands extract from Weapon Attack phrasing', () => {
    const hot = JSON.parse(JSON.stringify(internal));
    hot.sections.Actions[1].text = 'Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.';
    const findings = lintStatblock(hot, { chassis, plan, edition: '2014' }).findings;
    expect(findings.some((f) => f.rule === 'attack-band')).toBe(true);
    const bad = JSON.parse(JSON.stringify(internal));
    bad.sections.Actions[1].text = 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 15 (2d8 + 4) slashing damage.';
    expect(lintStatblock(bad, { chassis, plan, edition: '2014' }).findings.some((f) => f.rule === 'damage-dice')).toBe(true);
  });
});

describe('toLegacyModel', () => {
  const internal = assembleMonster(llm2014Fixture, ctx());
  const legacy = toLegacyModel(internal);

  test('legacy field shapes', () => {
    expect(legacy.type_and_alignment).toBe('Medium monstrosity, neutral evil');
    expect(legacy.armor_class).toBe('14');
    expect(legacy.hit_points).toMatch(/^59 \(\d+d\d+( [+-] \d+)?\)$/);
    expect(legacy.attributes).toBe('STR 12 (+1), DEX 16 (+3), CON 12 (+1), INT 6 (-2), WIS 14 (+2), CHA 8 (-1)');
    expect(legacy.saving_throws).toBe('DEX +5'); // only the proficient save
    expect(legacy.challenge_rating).toBe('4 (1,100 XP)');
    expect(legacy.proficiency_bonus).toBe('+2');
    expect(legacy.senses).toContain('passive Perception'); // 2014 lowercase p
  });

  test('sections map to legacy arrays; merged immunities split', () => {
    expect(legacy.abilities).toEqual([
      { name: 'Umbral Veil', description: expect.stringContaining('invisible') },
    ]);
    expect(legacy.actions).toHaveLength(3);
    expect(legacy.actions[0].name).toBe('Multiattack');
    expect(legacy.damage_immunities).toBe('Poison');
    expect(legacy.condition_immunities).toBe('Poisoned');
    expect(legacy.legendary_actions).toBeUndefined();
  });

  test('reactions and bonus actions fold into abilities with suffixes', () => {
    const withExtras = JSON.parse(JSON.stringify(internal));
    withExtras.sections.Reactions = [{ name: 'Parry', text: 'It parries.' }];
    withExtras.sections['Bonus Actions'] = [{ name: 'Slip Away', text: 'It disengages.' }];
    const converted = toLegacyModel(withExtras);
    const names = converted.abilities.map((a) => a.name);
    expect(names).toContain('Parry (Reaction)');
    expect(names).toContain('Slip Away (Bonus Action)');
  });

  test('engine metadata carried, no 2024 format marker', () => {
    expect(legacy.format).toBe('2014');
    expect(legacy.archetype).toBe('lurker');
    expect(legacy.legendary_uses).toBeUndefined();
  });
});

describe('generateMonster2024 with edition 2014', () => {
  test('returns the legacy shape on a good response', async () => {
    const callLLM = jest.fn().mockResolvedValue(JSON.stringify(llm2014Fixture));
    const monster = await generateMonster2024(
      { concept: 'a shadow stalker', cr: 4, archetypeName: 'lurker', edition: '2014' },
      callLLM,
    );
    expect(callLLM).toHaveBeenCalledTimes(1);
    expect(monster.format).toBe('2014');
    expect(monster.attributes).toContain('STR 12');
    expect(monster.sections).toBeUndefined(); // legacy shape, not internal
  });

  test('2024-phrased response is rejected and retried under edition 2014', async () => {
    const modern = JSON.parse(JSON.stringify(llm2014Fixture));
    modern.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 5 ft. 13 (2d8 + 4) Slashing damage.';
    const callLLM = jest.fn()
      .mockResolvedValueOnce(JSON.stringify(modern))
      .mockResolvedValueOnce(JSON.stringify(llm2014Fixture));
    const monster = await generateMonster2024(
      { concept: 'a shadow stalker', cr: 4, archetypeName: 'lurker', edition: '2014' },
      callLLM,
    );
    expect(callLLM).toHaveBeenCalledTimes(2);
    expect(monster.format).toBe('2014');
  });
});
