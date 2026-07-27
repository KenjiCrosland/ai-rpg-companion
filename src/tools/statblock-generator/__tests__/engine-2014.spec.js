/**
 * 2014-edition engine tests (statblock-2014-archetype-retrofit).
 *
 * The chassis/slot-plan/budget layers are edition-agnostic and covered by
 * their own suites; these tests cover what the retrofit adds: edition-aware
 * lint, 2014 assembly → legacy-model conversion, and orchestration returning
 * the legacy shape.
 */
import {
  generateMonster2024, assembleMonster, toLegacyModel, buildContext, rerollEntry, rerollSection,
  applyCorrections,
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
      { name: 'Shadow Claw', text: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.' },
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
    modern.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.';
    const rules = lintStatblock(modern, { chassis, plan, edition: '2014' }).findings.map((f) => f.rule);
    expect(rules).toContain('phrasing-2024-in-2014');
  });

  test('mixed save construction rejects in 2014 and fixes deterministically', () => {
    // Live finding: "must make a DC 21 Strength saving throw or be knocked
    // prone" — condition saves use "must succeed on ... or".
    const mixed = JSON.parse(JSON.stringify(internal));
    mixed.sections.Actions[2].text = 'The target must make a DC 13 Strength saving throw or be knocked prone.';
    const findings = lintStatblock(mixed, { chassis, plan, edition: '2014' }).findings;
    expect(findings.some((f) => f.rule === 'phrasing-save-or')).toBe(true);
    const fixed = applyCorrections(mixed, findings, { chassis });
    expect(fixed.sections.Actions[2].text).toBe('The target must succeed on a DC 13 Strength saving throw or be knocked prone.');
    // The damage form ("make ... taking X on a failed save") stays legal.
    expect(lintStatblock(internal, { chassis, plan, edition: '2014' }).findings
      .some((f) => f.rule === 'phrasing-save-or')).toBe(false);
  });

  test('shared rules still fire in 2014 mode: bands extract from Weapon Attack phrasing', () => {
    const hot = JSON.parse(JSON.stringify(internal));
    hot.sections.Actions[1].text = 'Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.';
    const findings = lintStatblock(hot, { chassis, plan, edition: '2014' }).findings;
    expect(findings.some((f) => f.rule === 'attack-band')).toBe(true);
    const bad = JSON.parse(JSON.stringify(internal));
    bad.sections.Actions[1].text = 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 15 (2d8 + 5) slashing damage.';
    expect(lintStatblock(bad, { chassis, plan, edition: '2014' }).findings.some((f) => f.rule === 'damage-dice')).toBe(true);
  });
});

describe('toLegacyModel', () => {
  const internal = assembleMonster(llm2014Fixture, ctx());
  const legacy = toLegacyModel(internal);

  test('legacy field shapes', () => {
    expect(legacy.type_and_alignment).toBe('Medium monstrosity, neutral evil');
    expect(legacy.armor_class).toBe('14');
    expect(legacy.hit_points).toBe('60 (11d8 + 11)'); // CON-coherent: bonus = dice x CON mod
    // DEX stamped 16 -> 20: lurker CR 4 attack +7 with PB +2 needs a +5 striker mod.
    expect(legacy.attributes).toBe('STR 12 (+1), DEX 20 (+5), CON 12 (+1), INT 6 (-2), WIS 14 (+2), CHA 8 (-1)');
    expect(legacy.saving_throws).toBe('DEX +7'); // only the proficient save (stamped DEX 20)
    expect(legacy.challenge_rating).toBe('4 (1,100 XP)');
    expect(legacy.proficiency_bonus).toBe('+2');
    expect(legacy.senses).toContain('passive Perception'); // 2014 lowercase p
  });

  test('defense classification is by condition vocabulary, not separator position', () => {
    // Live finding: "immunities": "frightened" (no semicolon) filed a
    // condition under Damage Immunities.
    const noSemicolon = toLegacyModel({ ...internal, immunities: 'frightened' });
    expect(noSemicolon.damage_immunities).toBeUndefined();
    expect(noSemicolon.condition_immunities).toBe('frightened');
    const mixed = toLegacyModel({ ...internal, immunities: 'poison, frightened, necrotic' });
    expect(mixed.damage_immunities).toBe('poison, necrotic');
    expect(mixed.condition_immunities).toBe('frightened');
  });

  test('sections map to legacy arrays; merged immunities split', () => {
    expect(legacy.abilities).toEqual([
      { name: 'Umbral Veil', description: expect.stringContaining('invisible') },
    ]);
    expect(legacy.actions).toHaveLength(3);
    expect(legacy.actions[0].name).toBe('Multiattack');
    // 2014 lowercases defense lines (the internal model's "Poison; Poisoned"
    // normalizes at the gate; the 2024 direction re-capitalizes).
    expect(legacy.damage_immunities).toBe('poison');
    expect(legacy.condition_immunities).toBe('poisoned');
    expect(legacy.legendary_actions).toBeUndefined();
  });

  test('2014 case conventions: defense lines lowercase, swarm size stays capitalized in the type line', () => {
    const swarm = toLegacyModel({
      ...internal,
      type: 'Swarm of Tiny Aberrations',
      resistances: 'Bludgeoning, Piercing, Slashing',
      immunities: 'Acid; Charmed, Frightened',
    });
    expect(swarm.type_and_alignment).toBe('Medium swarm of Tiny aberrations, neutral evil');
    expect(swarm.damage_resistances).toBe('bludgeoning, piercing, slashing');
    expect(swarm.damage_immunities).toBe('acid');
    expect(swarm.condition_immunities).toBe('charmed, frightened');
  });

  test('the nonmagical clause sorts to the end of the defense line', () => {
    // Live finding: "bludgeoning, piercing, slashing from nonmagical
    // attacks, acid, lightning" — mid-list, the qualifier reads as if it
    // covered acid and lightning too. Official ordering: plain types first,
    // clause last after a semicolon.
    const withMixed = toLegacyModel({
      ...internal,
      resistances: 'bludgeoning, piercing, slashing from nonmagical attacks, acid, lightning',
    });
    expect(withMixed.damage_resistances)
      .toBe('acid, lightning; bludgeoning, piercing, and slashing from nonmagical attacks');
    // Already-clean lines pass through untouched.
    const plain = toLegacyModel({ ...internal, resistances: 'acid, lightning' });
    expect(plain.damage_resistances).toBe('acid, lightning');
  });

  test('legendary cost suffixes normalize to the official form', () => {
    // Live finding: "Stalk (2 Actions)" — 2014 convention is "(Costs 2 Actions)".
    const withLegendary = JSON.parse(JSON.stringify(internal));
    withLegendary.sections['Legendary Actions'] = [
      { name: 'Claw', text: 'It claws once.' },
      { name: 'Stalk (2 Actions)', text: 'It stalks.' },
      { name: 'Vanish (Costs 3 Actions)', text: 'It vanishes.' },
    ];
    const names = toLegacyModel(withLegendary).legendary_actions.map((a) => a.name);
    expect(names).toEqual(['Claw', 'Stalk (Costs 2 Actions)', 'Vanish (Costs 3 Actions)']);
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

describe('rerollEntry (engine-based inline edit re-rolls)', () => {
  const legacy = toLegacyModel(assembleMonster(llm2014Fixture, ctx()));
  const call = (responses) => {
    const fn = jest.fn();
    responses.forEach((r) => fn.mockResolvedValueOnce(JSON.stringify(r)));
    return fn;
  };

  test('good re-roll returns a legacy-shaped entry in one call; referenced names are stamped back', async () => {
    // Shadow Claw is named in Multiattack — a rename would break the
    // reference, so keep-mode deterministically restores the name even
    // when the model renames (no retry burned).
    const callLLM = call([{ name: 'Shadow Rake', text: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.' }]);
    const entry = await rerollEntry(legacy, { kind: 'action', current: legacy.actions[1] }, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(1);
    expect(entry).toEqual({ name: 'Shadow Claw', description: expect.stringContaining('+7 to hit') });
  });

  test('re-roll REPLACES a non-referenced ability: same-name responses are retried', async () => {
    // The old behavior (same name, shuffled mechanics) is the least valuable
    // outcome now that the engine owns the numbers — demand a new ability.
    const callLLM = call([
      { name: 'Umbral Veil', text: 'While in dim light or darkness, the stalker is invisible.' },
      { name: 'Gloom Mantle', text: 'The stalker is wreathed in clinging shadow.' },
    ]);
    const entry = await rerollEntry(legacy, { kind: 'ability', current: legacy.abilities[0] }, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(2);
    expect(entry.name).toBe('Gloom Mantle');
  });

  test('off-budget attack bonus is corrected, not retried', async () => {
    const callLLM = call([{ name: 'Shadow Rake', text: 'Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.' }]);
    const entry = await rerollEntry(legacy, { kind: 'action', current: legacy.actions[1] }, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(1);
    expect(entry.description).toContain('+7 to hit'); // lurker chassis attack
  });

  test('blanket-mitigation trait is rejected and retried', async () => {
    const callLLM = call([
      { name: 'Uncanny Dodge', text: 'When an attacker hits it, the stalker halves the damage against it.' },
      { name: 'Gloom Mantle', text: 'While in dim light or darkness, the stalker is invisible.' },
    ]);
    const entry = await rerollEntry(legacy, { kind: 'ability', current: legacy.abilities[0] }, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(2);
    expect(entry.name).toBe('Gloom Mantle');
  });

  test('references to undefined attacks are rejected', async () => {
    const bad = { name: 'Command', text: 'The stalker makes one Phantom Fang attack.' };
    const callLLM = call([bad, bad]);
    await expect(
      rerollEntry(legacy, { kind: 'action', current: legacy.actions[2] }, callLLM),
    ).rejects.toThrow(/Phantom Fang/);
  });

  test('pre-engine monsters fall back to a balanced chassis at their displayed CR', async () => {
    const preEngine = { ...legacy };
    delete preEngine.archetype;
    // Balanced CR 4 chassis attack is +6.
    const callLLM = call([{ name: 'Bite', text: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) piercing damage.' }]);
    const entry = await rerollEntry(preEngine, { kind: 'action', current: legacy.actions[1] }, callLLM);
    expect(entry.description).toContain('+6 to hit');
  });

  test('2024-shaped monsters re-roll under 2024 phrasing rules', async () => {
    const internal = assembleMonster(llm2014Fixture, ctx());
    const modern = { ...internal, format: '2024' };
    // 2014 phrasing must be rejected for a 2024 monster; retry succeeds.
    const callLLM = call([
      { name: 'Shadow Rake', text: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.' },
      { name: 'Shadow Rake', text: '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.' },
    ]);
    const entry = await rerollEntry(modern, { kind: 'action', current: { name: 'Shadow Claw' } }, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(2);
    expect(entry.description).toContain('Attack Roll');
  });
});

describe('rerollSection (engine-based whole-section re-rolls)', () => {
  const legacy = toLegacyModel(assembleMonster(llm2014Fixture, ctx()));
  const call = (responses) => {
    const fn = jest.fn();
    responses.forEach((r) => fn.mockResolvedValueOnce(JSON.stringify(r)));
    return fn;
  };
  const goodActions = [
    { name: 'Multiattack', text: 'The stalker makes two Night Talon attacks.' },
    { name: 'Night Talon', text: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.' },
    { name: 'Terrifying Screech', text: 'Each creature within 30 feet must make a DC 13 Wisdom saving throw or be frightened until the end of its next turn.' },
  ];

  test('good actions section returns legacy entries in one call', async () => {
    const callLLM = call([goodActions]);
    const entries = await rerollSection(legacy, { kind: 'actions' }, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(1);
    expect(entries).toHaveLength(3);
    expect(entries[0]).toEqual({ name: 'Multiattack', description: expect.stringContaining('Night Talon') });
  });

  test('missing required Multiattack triggers one retry', async () => {
    const callLLM = call([goodActions.slice(1).concat([{ name: 'Hiss', text: 'It hisses menacingly.' }]), goodActions]);
    const entries = await rerollSection(legacy, { kind: 'actions' }, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(2);
    expect(entries[0].name).toBe('Multiattack');
  });

  test('count violations are rejected (tier 3 actions must be 3-4)', async () => {
    const twoOnly = goodActions.slice(0, 2);
    const callLLM = call([twoOnly, twoOnly]);
    await expect(rerollSection(legacy, { kind: 'actions' }, callLLM)).rejects.toThrow(/between 3 and 4/);
  });

  test('off-budget numbers across the section are corrected, not retried', async () => {
    const hot = JSON.parse(JSON.stringify(goodActions));
    hot[1].text = 'Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.';
    const callLLM = call([hot]);
    const entries = await rerollSection(legacy, { kind: 'actions' }, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(1);
    expect(entries[1].description).toContain('+7 to hit');
  });

  test('legendary re-roll uses the fixed 2-4 range and resolves attack references', async () => {
    const withLegendary = { ...legacy, legendary_actions: [{ name: 'Old Lash', description: 'It lashes.' }] };
    const callLLM = call([[
      { name: 'Claw', text: 'The stalker makes one Shadow Claw attack.' },
      { name: 'Skitter', text: 'The stalker moves up to half its speed.' },
    ]]);
    const entries = await rerollSection(withLegendary, { kind: 'legendary' }, callLLM);
    expect(entries).toHaveLength(2);
    // Referencing the undefined 'Phantom Fang' would have been a reject:
    const bad = [
      { name: 'Claw', text: 'The stalker makes one Phantom Fang attack.' },
      { name: 'Skitter', text: 'The stalker moves up to half its speed.' },
    ];
    const badLLM = call([bad, bad]);
    await expect(rerollSection(withLegendary, { kind: 'legendary' }, badLLM)).rejects.toThrow(/Phantom Fang/);
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

  test('2024 phrasing in a 2014 block gets a targeted entry fix, not a re-roll', async () => {
    const modern = JSON.parse(JSON.stringify(llm2014Fixture));
    modern.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.';
    const callLLM = jest.fn()
      .mockResolvedValueOnce(JSON.stringify(modern))
      // Entry-fix response: only the flagged entry, same name, classic phrasing.
      .mockResolvedValueOnce(JSON.stringify([{
        name: 'Shadow Claw',
        text: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.',
      }]));
    const monster = await generateMonster2024(
      { concept: 'a shadow stalker', cr: 4, archetypeName: 'lurker', edition: '2014' },
      callLLM,
    );
    expect(callLLM).toHaveBeenCalledTimes(2);
    const { validateSectionResponse } = require('../format-2024/generate.mjs');
    expect(callLLM.mock.calls[1][1]).toBe(validateSectionResponse);
    expect(monster.format).toBe('2014');
    expect(monster.actions.find((a) => a.name === 'Shadow Claw').description).toContain('Weapon Attack');
  });
});

describe('edition conversion (⇄ footer action)', () => {
  const { fromLegacyModel, convertEdition, validateConversionResponse } =
    require('../format-2024/generate.mjs');

  const internal = assembleMonster(llm2014Fixture, ctx());
  const legacyOf = (extras = {}) => ({
    ...toLegacyModel(JSON.parse(JSON.stringify(internal))),
    ...extras,
  });

  // Fake AI: shift queued responses; enforce the validator like the real
  // client would (a fixture the validator rejects is a broken test).
  const queuedLLM = (queue) => jest.fn(async (prompt, validate) => {
    const raw = JSON.stringify(queue.shift());
    if (validate && !validate(raw)) throw new Error('validator rejected fixture');
    return raw;
  });

  const CONVERTED_2024_TEXTS = {
    'Umbral Veil': 'While in Dim Light or Darkness, the stalker has the Invisible condition.',
    Multiattack: 'The stalker makes two Shadow Claw attacks.',
    'Shadow Claw': '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.',
    'Ambush Pounce': '*Dexterity Saving Throw*: DC 13, each creature within 10 feet. *Failure:* 21 (6d6) Psychic damage. *Success:* Half damage only.',
  };
  const response2024 = (m) => Object.fromEntries(
    Object.entries(m.sections).map(([s, es]) =>
      [s, es.map((e) => ({ name: e.name, text: CONVERTED_2024_TEXTS[e.name] }))]));

  test('fromLegacyModel inverts toLegacyModel', () => {
    const withExtras = JSON.parse(JSON.stringify(internal));
    withExtras.sections.Reactions = [{ name: 'Parry', text: 'When a creature hits it, it parries.' }];
    withExtras.sections['Bonus Actions'] = [{ name: 'Slip Away', text: 'It disengages.' }];
    const model = fromLegacyModel(toLegacyModel(withExtras));
    expect(model.stats).toEqual(internal.stats);
    expect(model.saves).toEqual(internal.saves);
    expect(model.ac).toBe(internal.ac);
    expect(model.hp).toBe(internal.hp);
    expect(model.cr).toBe(4);
    expect(model.pb).toBe(2);
    expect(model.xp).toBe(1100);
    expect(model.size).toBe('Medium');
    expect(model.type).toBe('Monstrosity');
    expect(model.alignment).toBe('Neutral Evil');
    expect(model.immunities).toBe('Poison; Poisoned');
    // Folded reactions/bonus actions unfold back into their own sections.
    expect(model.sections.Reactions).toEqual([{ name: 'Parry', text: 'When a creature hits it, it parries.' }]);
    expect(model.sections['Bonus Actions']).toEqual([{ name: 'Slip Away', text: 'It disengages.' }]);
    expect(model.sections.Traits.map((e) => e.name)).toEqual(['Umbral Veil']);
    expect(model.sections.Actions).toHaveLength(3);
    expect(model.format).toBe('2024');
  });

  test('2014 → 2024: one rephrase call, deterministic shape, meta carried', async () => {
    const legacy = legacyOf({ monsterDescription: 'a shadow', selectedChallengeRating: '4', caster: false });
    const callLLM = queuedLLM([response2024(fromLegacyModel(legacy))]);
    const converted = await convertEdition(legacy, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(1);
    expect(converted.format).toBe('2024');
    expect(converted.stats.DEX).toBe(20); // striker stamp survives the round trip
    expect(converted.saves.DEX).toBe(7);
    expect(converted.sections.Traits[0].text).toContain('Invisible condition');
    expect(converted.sections.Actions[1].text).toContain('*Melee Attack Roll:*');
    // Regen params survive the shape change.
    expect(converted.monsterDescription).toBe('a shadow');
    expect(converted.caster).toBe(false);
    // Sidebar + CR sorting read challenge_rating on every monster regardless
    // of edition (live crash: undefined.split after a 2014→2024 convert).
    expect(converted.challenge_rating).toBe('4 (XP 1,100; PB +2)');
    // The result passes the 2024 phrasing gates.
    const rules = lintStatblock(converted, { edition: '2024' }).findings.map((f) => f.rule);
    expect(rules).not.toContain('phrasing-2014');
    expect(rules).not.toContain('phrasing-to-hit');
  });

  test('2024 → 2014: returns the legacy shape with numbers untouched', async () => {
    const modern = {
      ...JSON.parse(JSON.stringify(internal)),
      format: '2024',
      monsterDescription: 'a shadow',
    };
    modern.sections.Traits[0].text = 'While in Dim Light or Darkness, the stalker has the Invisible condition.';
    modern.sections.Actions[1].text = '*Melee Attack Roll:* +9, reach 5 ft. 14 (2d8 + 5) Slashing damage.';
    modern.sections.Actions[2].text = '*Dexterity Saving Throw*: DC 13, each creature within 10 feet. *Failure:* 21 (6d6) Psychic damage. *Success:* Half damage only.';
    const response = Object.fromEntries(Object.entries(modern.sections).map(([s, es]) =>
      [s, es.map((e) => ({
        name: e.name,
        text: {
          'Umbral Veil': 'While in dim light or darkness, the stalker is invisible.',
          Multiattack: 'The stalker makes two Shadow Claw attacks.',
          // +9 is off the CR-4 chassis ON PURPOSE: conversion is a dialect
          // change, never a rebalance — the number must survive.
          'Shadow Claw': 'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.',
          'Ambush Pounce': 'Each creature within 10 feet must make a DC 13 Dexterity saving throw, taking 21 (6d6) psychic damage on a failed save, or half as much damage on a successful one.',
        }[e.name],
      }))]));
    const converted = await convertEdition(modern, queuedLLM([response]));
    expect(converted.format).toBe('2014');
    expect(converted.attributes).toContain('DEX 20 (+5)');
    expect(converted.armor_class).toBe('14');
    expect(converted.actions.find((a) => a.name === 'Shadow Claw').description).toContain('+9 to hit');
    expect(converted.monsterDescription).toBe('a shadow');
    expect(converted.abilities[0].description).toContain('dim light');
  });

  test('a response that keeps source-edition phrasing gets the fix ladder', async () => {
    const legacy = legacyOf();
    const model = fromLegacyModel(legacy);
    const halfConverted = response2024(model);
    // Shadow Claw comes back still 2014-phrased.
    halfConverted.Actions[1].text = 'Melee Weapon Attack: +7, reach 5 ft., one target. Hit: 14 (2d8 + 5) Slashing damage.';
    const callLLM = queuedLLM([
      halfConverted,
      [{ name: 'Shadow Claw', text: CONVERTED_2024_TEXTS['Shadow Claw'] }],
    ]);
    const converted = await convertEdition(legacy, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(2);
    expect(converted.sections.Actions[1].text).toContain('*Melee Attack Roll:*');
  });

  test('validateConversionResponse enforces section shape and entry names', () => {
    const model = fromLegacyModel(legacyOf());
    const good = response2024(model);
    expect(validateConversionResponse(JSON.stringify(good), model)).toBe(true);
    const renamed = JSON.parse(JSON.stringify(good));
    renamed.Actions[1].name = 'Umbra Claw';
    expect(validateConversionResponse(JSON.stringify(renamed), model)).toBe(false);
    const short = JSON.parse(JSON.stringify(good));
    short.Actions.pop();
    expect(validateConversionResponse(JSON.stringify(short), model)).toBe(false);
    expect(validateConversionResponse(JSON.stringify({}), model)).toBe(false);
  });
});

describe('2024-vocabulary leaks in 2014 text (converted soak-3 live batch)', () => {
  // Verbatim texts from the first live converted batch (2026-07-27): the
  // conversion call handled the attack/save skeletons but leaked 2024
  // vocabulary. All four rules sweep 0/327 against the 2014 SRD corpus, and
  // the appliers are verified no-ops on every official text.
  const { chassis } = buildContext(7, 'balanced');
  const lint2014 = (sections) => lintStatblock(
    { type: 'Monstrosity', sections }, { edition: '2014' }
  ).findings;
  const fixed = (sections) => applyCorrections(
    { sections: JSON.parse(JSON.stringify(sections)) }, lint2014(sections), { chassis }
  );

  test('bloodied-in-2014: Planar Retreat (Stalking Webspinner)', () => {
    const sections = { Actions: [{ name: 'Planar Retreat', text: 'The portal lasts for 1 minute or until the Stalking Webspinner ends it (no action required). If the Stalking Webspinner is bloodied, it can use this action as a reaction on its turn.' }] };
    expect(lint2014(sections).map((f) => f.rule)).toContain('bloodied-in-2014');
    const out = fixed(sections);
    expect(out.sections.Actions[0].text).toContain('If the Stalking Webspinner has half of its hit points or fewer');
    expect(out.sections.Actions[0].text).not.toMatch(/bloodied/i);
  });

  test('emanation-in-2014: originating-from form (Ulghoch Caustic Slime)', () => {
    const sections = { Traits: [{ name: 'Caustic Slime', text: 'At the start of each of the ulghoch\'s turns, each creature in a 5-foot emanation originating from the ulghoch takes 11 (2d10) acid damage.' }] };
    expect(lint2014(sections).map((f) => f.rule)).toContain('emanation-in-2014');
    const out = fixed(sections);
    expect(out.sections.Traits[0].text).toContain('each creature within 5 feet of the ulghoch takes 11 (2d10) acid damage');
    expect(out.sections.Traits[0].text).not.toMatch(/emanation/i);
  });

  test('emanation-in-2014: radius form (Silk Shambler Spore Burst)', () => {
    const sections = { Actions: [{ name: 'Spore Burst', text: 'Each creature in a 20-foot-radius emanation centered on the silk shambler must make a DC 27 Constitution saving throw, taking 56 (16d6) poison damage on a failed save, or half as much damage on a successful one.' }] };
    const out = fixed(sections);
    expect(out.sections.Actions[0].text).toContain('20-foot-radius sphere centered on the silk shambler');
    expect(out.sections.Actions[0].text).not.toMatch(/emanation/i);
  });

  test('area-caps-in-2014: capitalized Cone incl. bare reference (Bilewurm)', () => {
    const sections = { Actions: [{ name: 'Corrosive Spew', text: 'The bilewurm vomits acid in a 15-foot Cone. Each creature in the Cone must make a DC 13 Constitution saving throw, taking 14 (4d6) acid damage and being knocked prone on a failed save, or half as much damage on a successful one.' }] };
    expect(lint2014(sections).map((f) => f.rule)).toContain('area-caps-in-2014');
    const out = fixed(sections);
    expect(out.sections.Actions[0].text).toContain('in a 15-foot cone');
    expect(out.sections.Actions[0].text).toContain('in the cone must make');
  });

  test('area-caps applier never touches creature-name Cube references', () => {
    const sections = { Actions: [
      { name: 'Zone', text: 'The wall fills a 10-foot Cube.' },
      { name: 'Summon', text: 'It uses the Gelatinous Cube stat block.' },
    ] };
    const out = fixed(sections);
    expect(out.sections.Actions[0].text).toContain('10-foot cube');
    expect(out.sections.Actions[1].text).toContain('Gelatinous Cube stat block');
  });

  test('condition-phrase-in-2014: Critical Panic (Chazkor)', () => {
    const sections = { Traits: [{ name: 'Critical Panic', text: 'If the swarm takes damage from a critical hit, it must make a DC 15 Wisdom saving throw. On a failure, it has the stunned condition until the end of its next turn.' }] };
    expect(lint2014(sections).map((f) => f.rule)).toContain('condition-phrase-in-2014');
    const out = fixed(sections);
    expect(out.sections.Traits[0].text).toContain('it is stunned until the end of its next turn');
  });

  test('condition-phrase applier handles compounds, leaves exhaustion to the fix call', () => {
    const sections = { Actions: [
      { name: 'Web', text: 'The target has the Grappled and Restrained conditions.' },
      { name: 'Drain', text: 'The target has the exhaustion condition.' },
    ] };
    const out = fixed(sections);
    expect(out.sections.Actions[0].text).toContain('is grappled and restrained');
    // exhaustion is levels in 2014 — no confident rewrite; reject persists.
    expect(out.sections.Actions[1].text).toContain('has the exhaustion condition');
    expect(lint2014(out.sections).map((f) => f.rule)).toContain('condition-phrase-in-2014');
  });

  test('none of the four rules fire on official-shaped 2014 text', () => {
    const sections = { Actions: [
      { name: 'Acid Spray', text: 'The dragon spits acid in a 15-foot cone. Each creature in the cone must make a DC 13 Dexterity saving throw, taking 22 (5d8) acid damage on a failed save, or half as much damage on a successful one.' },
      { name: 'Engulf', text: 'The cube moves up to its speed. The engulfed creature is restrained until the grapple ends.' },
    ] };
    const rules = lint2014(sections).map((f) => f.rule);
    for (const r of ['bloodied-in-2014', 'emanation-in-2014', 'area-caps-in-2014', 'condition-phrase-in-2014']) {
      expect(rules).not.toContain(r);
    }
  });

  test('none of the four rules fire on 2024-edition blocks', () => {
    const sections = { Actions: [{ name: 'Spew', text: 'Each creature in a 15-foot Cone that is Bloodied has the Stunned condition.' }] };
    const rules = lintStatblock({ type: 'Monstrosity', sections }, { edition: '2024' }).findings.map((f) => f.rule);
    for (const r of ['bloodied-in-2014', 'emanation-in-2014', 'area-caps-in-2014', 'condition-phrase-in-2014']) {
      expect(rules).not.toContain(r);
    }
  });
});

describe('convertEdition gates the leak rules (CONVERSION_LINT_RULES wiring)', () => {
  const { convertEdition } = require('../format-2024/generate.mjs');

  test('a leaked conversion response is cleaned deterministically — no second call', async () => {
    const internal = assembleMonster(llm2014Fixture, ctx());
    const modern = { ...JSON.parse(JSON.stringify(internal)), format: '2024' };
    const leakedTexts = {
      'Umbral Veil': 'While in dim light or darkness, the stalker is invisible. While bloodied, it cannot hide.',
      Multiattack: 'The stalker makes two Shadow Claw attacks.',
      'Shadow Claw': 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage. The target has the Poisoned condition.',
      'Ambush Pounce': 'Each creature in a 10-foot emanation must make a DC 13 Dexterity saving throw, taking 21 (6d6) psychic damage on a failed save, or half as much damage on a successful one.',
    };
    const response = Object.fromEntries(Object.entries(modern.sections).map(([s, es]) =>
      [s, es.map((e) => ({ name: e.name, text: leakedTexts[e.name] }))]));
    const callLLM = jest.fn(async (prompt, validate) => {
      const raw = JSON.stringify(response);
      if (validate && !validate(raw)) throw new Error('validator rejected fixture');
      return raw;
    });
    const converted = await convertEdition(modern, callLLM);
    expect(callLLM).toHaveBeenCalledTimes(1);
    expect(converted.format).toBe('2014');
    const texts = [...converted.abilities, ...converted.actions].map((e) => e.description).join('\n');
    expect(texts).toContain('While it has half of its hit points or fewer');
    expect(texts).toContain('is poisoned');
    expect(texts).toContain('within 10 feet of it');
    expect(texts).not.toMatch(/bloodied|emanation|has the \w+ condition/i);
  });
});

describe('condition-phrase modal contexts (Emberhide Hulk live regression)', () => {
  // The bare-verb rewrite turned "the hulk can't have the Invisible
  // condition" into "the hulk can't are invisible" (converted batch,
  // 2026-07-27). Modals take the base verb.
  const { chassis } = buildContext(5, 'defender');
  const fixed = (text) => {
    const sections = { Traits: [{ name: 'Blazing Aura', text }] };
    const findings = lintStatblock({ type: 'Celestial', sections }, { edition: '2014' }).findings;
    return applyCorrections({ sections }, findings, { chassis }).sections.Traits[0].text;
  };

  test('modal + have: verbatim Blazing Aura', () => {
    const out = fixed('While the light shines, the hulk can\'t have the Invisible condition, and any creature within the bright light that hits the hulk with a melee attack takes 5 (1d10) fire damage.');
    expect(out).toContain('the hulk can\'t be invisible');
    expect(out).not.toMatch(/can't are|condition/);
  });

  test('negated do and bare plural have', () => {
    expect(fixed('The target does not have the Prone condition.')).toContain('is not prone');
    // Bare "have" (plural subject) has no safe deterministic verb — the
    // reject stands and rides the fix ladder.
    expect(fixed('Both targets have the Prone condition.')).toContain('have the Prone condition');
  });
});

describe('spell-tiers-inline (Askor converted spellcaster, 2026-07-27)', () => {
  // The conversion call flattened the tier lines: "...requiring no material
  // components: At will: minor illusion, blade ward 1/day each: fear, fire
  // shield (warm shield only)" — official 2014 spellcasting puts every tier
  // marker at a line start (19/19 corpus spellcasters use "\n\nAt will:").
  const { chassis } = buildContext(15, 'defender');
  const fixed = (text) => {
    const sections = { Actions: [{ name: 'Spellcasting', text }] };
    const findings = lintStatblock({ type: 'Undead', sections }, { edition: '2014' }).findings;
    return { findings, text: applyCorrections({ sections }, findings, { chassis }).sections.Actions[0].text };
  };

  test('verbatim Askor text: tiers break onto their own lines', () => {
    const { findings, text } = fixed("The askor's spellcasting ability is Charisma (spell save DC 19). It can innately cast the following spells, requiring no material components: At will: minor illusion, blade ward 1/day each: fear, fire shield (warm shield only)");
    expect(findings.map((f) => f.rule)).toContain('spell-tiers-inline');
    expect(text).toContain('components:\n\nAt will: minor illusion, blade ward\n\n1/day each: fear, fire shield (warm shield only)');
  });

  test('official-shaped spellcasting (newline-separated tiers) passes untouched', () => {
    const official = "The couatl's spellcasting ability is Charisma (spell save DC 14). It can innately cast the following spells, requiring only verbal components:\n\nAt will: detect evil and good, detect magic\n\n3/day each: bless, create food and water";
    const { findings, text } = fixed(official);
    expect(findings.map((f) => f.rule)).not.toContain('spell-tiers-inline');
    expect(text).toBe(official);
  });
});
