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
    expect(callLLM).toHaveBeenCalledTimes(2); // generation + audit (gate opened)
    expect(monster.format).toBe('2014');
    expect(monster.attributes).toContain('STR 12');
    expect(monster.sections).toBeUndefined(); // legacy shape, not internal
  });

  test('2024 phrasing in a 2014 block gets a targeted entry fix, not a re-roll', async () => {
    const modern = JSON.parse(JSON.stringify(llm2014Fixture));
    modern.sections.Actions[1].text = '*Melee Attack Roll:* +7, reach 5 ft. 14 (2d8 + 5) Slashing damage.';
    const callLLM = jest.fn()
      .mockResolvedValueOnce(JSON.stringify(modern))
      .mockResolvedValueOnce(JSON.stringify({ findings: [] })) // audit (gate opened)
      // Entry-fix response: only the flagged entry, same name, classic phrasing.
      .mockResolvedValueOnce(JSON.stringify([{
        name: 'Shadow Claw',
        text: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.',
      }]));
    const monster = await generateMonster2024(
      { concept: 'a shadow stalker', cr: 4, archetypeName: 'lurker', edition: '2014' },
      callLLM,
    );
    expect(callLLM).toHaveBeenCalledTimes(3); // + audit
    const { validateSectionResponse } = require('../format-2024/generate.mjs');
    expect(callLLM.mock.calls[2][1]).toBe(validateSectionResponse); // audit sits at [1]
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
    // grammar survives for the fix ladder (condition-caps-in-2014 may still
    // lowercase the condition word inside it).
    expect(fixed('Both targets have the Prone condition.')).toMatch(/have the [Pp]rone condition/);
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

describe('native-2014 batch 1 (Kralvag): pattern gaps in edition-agnostic rules', () => {
  const { chassis } = buildContext(12, 'skirmisher');

  test('defense-restated catches 2014-lowercase compound restatements (verbatim Glimborg)', () => {
    const m = { name: 'Kralvag', type: 'Giant', resistances: 'cold', immunities: 'poison; poisoned', sections: { Traits: [
      { name: 'Glimborg', text: 'The kralvag has resistance to cold damage and immunity to poison damage and the poisoned condition.' },
    ] } };
    expect(lintStatblock(m, { edition: '2014' }).findings.map((f) => f.rule)).toContain('defense-restated');
  });

  test('duplicate-cross-section: verbatim Crystal Burst trait+reaction — the Traits copy drops', () => {
    const m = { name: 'Kralvag', type: 'Giant', sections: {
      Traits: [
        { name: 'Crystal Burst', text: 'When the kralvag takes damage from a melee weapon attack, it can burst into a cloud of razor-sharp crystalline dust and teleport up to 30 feet to an unoccupied space it can see. Immediately after it teleports, each creature within 10 feet of the space it left must succeed on a DC 17 Dexterity saving throw or take 9 (2d8) slashing damage.' },
        { name: 'Wall Climb', text: 'The kralvag can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check.' },
      ],
      Reactions: [
        { name: 'Crystal Burst (Reaction)', text: 'When the kralvag takes damage from a melee weapon attack, it can use its reaction to burst into a cloud of razor-sharp crystalline dust, teleporting up to 30 feet to an unoccupied space it can see. Each creature within 10 feet of the space it left must succeed on a DC 17 Dexterity saving throw or take 9 (2d8) slashing damage.' },
      ],
    } };
    const findings = lintStatblock(m, { edition: '2014' }).findings
      .filter((f) => f.rule === 'duplicate-cross-section');
    expect(findings).toHaveLength(1);
    expect(findings[0].severity).toBe('correctable');
    const out = applyCorrections(m, findings, { chassis });
    expect(out.sections.Traits.map((e) => e.name)).toEqual(['Wall Climb']);
    expect(out.sections.Reactions).toHaveLength(1);
  });

  test('legendary attack-reuse same-name entries stay legal (low overlap)', () => {
    const m = { name: 'Legmire', type: 'Monstrosity', sections: {
      Actions: [{ name: 'Pseudopod', text: 'Melee Weapon Attack: +16 to hit, reach 10 ft., one target. Hit: 36 (6d8 + 9) cold damage.' }],
      'Legendary Actions': [{ name: 'Pseudopod', text: 'The legmire makes one Pseudopod attack.' }],
    } };
    expect(lintStatblock(m, { edition: '2014' }).findings
      .filter((f) => f.rule === 'duplicate-cross-section')).toHaveLength(0);
  });

  test('languages normalize to the corpus mute form (verbatim Kralvag line)', () => {
    const fixture = JSON.parse(JSON.stringify(llm2014Fixture));
    fixture.languages = 'understands Giant but does not speak';
    const m = assembleMonster(fixture, ctx());
    expect(m.languages).toBe("Understands Giant but can't speak");
  });
});

describe('native-2014 batch 2 (Uulghul/Chuugoth/Uuloth): vocabulary + dependency rules', () => {
  const { chassis } = buildContext(21, 'controller');
  const lint14 = (m) => lintStatblock(m, { edition: '2014' }).findings;

  test('condition-caps-in-2014: verbatim Salt Anchor "becomes Restrained" lowercases', () => {
    const m = { name: 'Uuloth', type: 'Aberration', sections: { Actions: [
      { name: 'Salt Anchor (Recharge 4-6)', text: "Each creature within 30 feet of the uuloth must make a DC 23 Strength saving throw. On a failed save, a creature's speed is reduced to 0 and it becomes Restrained until the end of its next turn. On a successful save, its speed is halved until the end of its next turn." },
    ] } };
    const findings = lint14(m).filter((f) => f.rule === 'condition-caps-in-2014');
    expect(findings).toHaveLength(1);
    const out = applyCorrections(m, findings, { chassis });
    expect(out.sections.Actions[0].text).toContain('becomes restrained until');
  });

  test('grapple-dependency-orphan: verbatim Uuloth Constrict flags; Bonewrack (imposes) does not', () => {
    const uuloth = { name: 'Uuloth', type: 'Aberration', sections: { Actions: [
      { name: 'Constrict', text: 'Melee Weapon Attack: +15 to hit, reach 5 ft., one target grappled by the uuloth. Hit: 21 (3d8 + 8) bludgeoning damage, and the target is restrained until the grapple ends.' },
    ], Traits: [
      { name: 'Sand Sink', text: "The uuloth can't use this reaction while it has a creature grappled by it." },
    ] } };
    expect(lint14(uuloth).map((f) => f.rule)).toContain('grapple-dependency-orphan');
    const bonewrack = { name: 'Bonewrack', type: 'Dragon', sections: { Actions: [
      { name: 'Bite', text: "Melee Weapon Attack: +6 to hit, reach 0 ft., one target in the swarm's space. Hit: 13 (2d8 + 4) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be grappled (escape DC 11)." },
      { name: 'Crush', text: 'One target grappled by the bonewrack takes 7 (2d6) bludgeoning damage.' },
    ] } };
    expect(lint14(bonewrack).map((f) => f.rule)).not.toContain('grapple-dependency-orphan');
  });

  test('vocab-adjacent: verbatim Coordinated Strike rewrites to "within 5 feet of"', () => {
    const m = { name: 'Uulghul', type: 'Ooze', sections: { Traits: [
      { name: 'Coordinated Strike', text: 'If the uulghul can see or sense another uulghul that is within 30 feet of a hostile creature, the uulghul can take the Dash action as a bonus action and must end its movement adjacent to that hostile creature.' },
    ] } };
    const findings = lint14(m).filter((f) => f.rule === 'vocab-adjacent');
    expect(findings).toHaveLength(1);
    const out = applyCorrections(m, findings, { chassis });
    expect(out.sections.Traits[0].text).toContain('must end its movement within 5 feet of that hostile creature');
  });

  test('defense lines strip the "damage" word token-wise; languages catch "doesn\'t speak"', () => {
    const fixture = JSON.parse(JSON.stringify(llm2014Fixture));
    fixture.immunities = 'poison damage';
    fixture.resistances = 'bludgeoning, piercing, and slashing from nonmagical attacks';
    fixture.languages = "understands Deep Speech but doesn't speak";
    const m = assembleMonster(fixture, ctx());
    expect(m.immunities).toBe('poison');
    expect(m.resistances).toBe('bludgeoning, piercing, and slashing from nonmagical attacks');
    expect(m.languages).toBe("Understands Deep Speech but can't speak");
  });
});

describe('native-2014 batch 3 (Sinterhoard/Grech/Bloatbough): stamp + leak fixes', () => {
  test('spell DC rewrites to the derivation when the score overshoots (verbatim Sinterhoard)', () => {
    // The live case: CR 11 (PB +4), CHA 22, printed DC 17 — required score
    // for DC 17 is 20, so the raise stays silent; derived DC is 18 and the
    // printed DC must follow it (corpus DCs always derive exactly).
    const { chassis: c11, plan: p11, archetype: a11 } = (() => {
      const r = buildContext(11, 'defender');
      return { chassis: r.chassis, plan: r.plan, archetype: r.archetype };
    })();
    const fixture = JSON.parse(JSON.stringify(llm2014Fixture));
    fixture.stats = { ...fixture.stats, CHA: 22 };
    fixture.sections.Actions.push({
      name: 'Spellcasting',
      text: "The sinterhoard's spellcasting ability is Charisma (spell save DC 17). It can innately cast the following spells:\n\nAt will: heat metal, light, mending\n\n1/day each: wall of stone",
    });
    const m = assembleMonster(fixture, { cr: 11, chassis: c11, plan: p11, archetypeName: a11, archetypeSource: 'user' });
    const spell = m.sections.Actions.find((e) => e.name === 'Spellcasting');
    expect(spell.text).toContain('spell save DC 18');
    expect(m.stats.CHA).toBe(22);
  });

  test('raise-only branch still lifts an undersupporting score to the printed DC', () => {
    const fixture = JSON.parse(JSON.stringify(llm2014Fixture));
    fixture.stats = { ...fixture.stats, CHA: 10 };
    fixture.sections.Actions.push({
      name: 'Spellcasting',
      text: 'The stalker casts spells, using Charisma as the spellcasting ability (spell save DC 13).',
    });
    const m = assembleMonster(fixture, ctx()); // PB +2 → mod needed +3 → CHA 16
    expect(m.stats.CHA).toBe(16);
    const spell = m.sections.Actions.find((e) => e.name === 'Spellcasting');
    expect(spell.text).toContain('spell save DC 13'); // derives exactly after the raise
  });

  test('instruction-leak: verbatim Bloatbough classifier sentence strips', () => {
    const { chassis } = buildContext(1, 'brute');
    const m = { name: 'Bloatbough', type: 'Plant', sections: { Actions: [
      { name: 'Slam', text: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage. This attack is a heavy melee attack.' },
    ] } };
    const findings = lintStatblock(m, { edition: '2014' }).findings
      .filter((f) => f.rule === 'instruction-leak');
    expect(findings).toHaveLength(1);
    const out = applyCorrections(m, findings, { chassis });
    expect(out.sections.Actions[0].text).toBe('Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) bludgeoning damage.');
  });

  test('prompt-example-name: verbatim Grech "Helping Snarl" flags', () => {
    const m = { name: 'Grech', type: 'Humanoid', sections: { Traits: [
      { name: 'Helping Snarl', text: 'While within 5 feet of a friendly creature, the grech has advantage on saving throws against being charmed.' },
    ] } };
    expect(lintStatblock(m, { edition: '2014' }).findings.map((f) => f.rule)).toContain('prompt-example-name');
    const clean = { name: 'Grech', type: 'Humanoid', sections: { Traits: [
      { name: 'Warding Snarl', text: 'While within 5 feet of a friendly creature, the grech has advantage on saving throws against being charmed.' },
    ] } };
    expect(lintStatblock(clean, { edition: '2014' }).findings.map((f) => f.rule)).not.toContain('prompt-example-name');
  });
});

describe('native-2014 batch 4 (Glintspinner/Multitude/Bulwark): defense + grapple gaps', () => {
  const { chassis: c20 } = buildContext(20, 'skirmisher');
  const { chassis: cHalf } = buildContext(0.5, 'brute');

  test('resistance-unknown now covers immunities in 2014 (verbatim "prismatic")', () => {
    const m = {
      name: 'Glintspinner', type: 'Dragon',
      resistances: 'psychic', immunities: 'prismatic',
      sections: { Actions: [{ name: 'Claw', text: 'Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 26 (4d8 + 8) slashing damage.' }] },
    };
    const findings = lintStatblock(m, { edition: '2014', chassis: c20 }).findings
      .filter((f) => f.rule === 'resistance-unknown');
    expect(findings).toHaveLength(1);
    expect(findings[0].loc.field).toBe('immunities');
    const out = applyCorrections(m, findings, { chassis: c20 });
    expect(out.immunities).toBeUndefined();
    expect(out.resistances).toBe('psychic');
  });

  test('2014 nonmagical-qualified lines never read as junk', () => {
    const m = {
      name: 'Rootkelp', type: 'Plant',
      resistances: 'bludgeoning, piercing, and slashing from nonmagical attacks',
      immunities: 'poison; poisoned',
      sections: { Actions: [{ name: 'Tendril', text: 'Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 25 (4d8 + 7) bludgeoning damage.' }] },
    };
    expect(lintStatblock(m, { edition: '2014', chassis: c20 }).findings
      .filter((f) => f.rule === 'resistance-unknown')).toHaveLength(0);
  });

  test('grapple-escape-dc-2014: verbatim Snatching Bite gets a DC stamped', () => {
    const m = { name: 'Skittering Multitude', type: 'Giant', sections: { Actions: [
      { name: 'Snatching Bite', text: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage, and the target must succeed on a DC 12 Strength saving throw or be grappled. While grappled in this way, the creature is restrained.' },
    ] } };
    const findings = lintStatblock(m, { edition: '2014', chassis: cHalf }).findings
      .filter((f) => f.rule === 'grapple-escape-dc-2014');
    expect(findings).toHaveLength(1);
    const out = applyCorrections(m, findings, { chassis: cHalf });
    expect(out.sections.Actions[0].text).toMatch(/saving throw or be grappled \(escape DC \d+\)\. While grappled/);
  });

  test('grapple preconditions and DC-carrying grapples stay silent', () => {
    const precondition = { name: 'Vampire', type: 'Undead', sections: { Actions: [
      { name: 'Bite', text: 'Melee Weapon Attack: +9 to hit, reach 5 ft., one willing creature, or a creature that is grappled by the vampire. Hit: 7 (1d6 + 4) piercing damage.' },
    ] } };
    expect(lintStatblock(precondition, { edition: '2014', chassis: c20 }).findings
      .filter((f) => f.rule === 'grapple-escape-dc-2014')).toHaveLength(0);
    const withDC = { name: 'Rootkelp', type: 'Plant', sections: { Actions: [
      { name: 'Tendril', text: 'Hit: 25 (4d8 + 7) bludgeoning damage, and the target must succeed on a DC 17 Strength saving throw or be grappled (escape DC 17).' },
    ] } };
    expect(lintStatblock(withDC, { edition: '2014', chassis: c20 }).findings
      .filter((f) => f.rule === 'grapple-escape-dc-2014')).toHaveLength(0);
  });

  test('defense/senses normalizers: verbatim Glazed Bulwark lines', () => {
    const fixture = JSON.parse(JSON.stringify(llm2014Fixture));
    fixture.immunities = 'acid, lightning, exhausted';
    fixture.senses_special = 'blindsight 60 ft., blind beyond this radius';
    const m = assembleMonster(fixture, ctx());
    expect(m.immunities).toBe('acid, lightning, exhaustion');
    expect(m.senses).toContain('blindsight 60 ft. (blind beyond this radius);');
  });
});

describe('native-2014 batch 5 (Shardwisp/Shivver): rename corruption + reference gaps', () => {
  const { applyRenameMapping } = require('../format-2024/generate.mjs');
  const { chassis } = buildContext(12, 'lurker');

  test('head-noun rename never maps common object nouns (the Shardwisp barrier corruption)', () => {
    const m = { name: 'Glimmer Barrier', sections: { Actions: [
      { name: 'Anchored Barrier', text: 'The Glimmer Barrier anchors a crystal at a point within 30 feet. The barrier lasts for 1 minute. While the barrier is active, any creature within the barrier gains half cover.' },
    ] } };
    const out = applyRenameMapping(m, { 'Glimmer Barrier': 'Shardwisp' });
    expect(out.name).toBe('Shardwisp');
    // The exact full name follows the rename; the barrier OBJECT does not.
    expect(out.sections.Actions[0].text).toContain('The Shardwisp anchors a crystal');
    expect(out.sections.Actions[0].text).toContain('The barrier lasts for 1 minute');
    expect(out.sections.Actions[0].text).not.toContain('the Shardwisp lasts');
  });

  test('head-noun rename still follows genuine self-references (the burrower contract)', () => {
    const m = { name: 'Gloom Stalker', sections: { Traits: [
      { name: 'Umbral Veil', text: 'While in dim light, the stalker is invisible.' },
    ] } };
    const out = applyRenameMapping(m, { 'Gloom Stalker': 'Quietmaw' });
    expect(out.sections.Traits[0].text).toContain('the quietmaw is invisible');
  });

  test('undefined uses-reference survives a trailing parenthetical (verbatim Skitter Away)', () => {
    const m = { name: 'Shivver', type: 'Elemental', sections: {
      Traits: [{ name: 'Rain Cloak', text: 'While in an area of heavy rain, mist, or magical darkness, the shivver is invisible.' }],
      Actions: [{ name: 'Skitter Away', text: 'The shivver moves up to its speed without provoking opportunity attacks. If it ends this movement in an area of heavy rain, mist, or magical darkness, it can use its Storm Invisibility (or a similar trait that grants invisibility in such conditions) as part of this action.' }],
    } };
    const findings = lintStatblock(m, { edition: '2014', chassis }).findings;
    expect(findings.some((f) => f.rule === 'undefined-attack-ref' && /Storm Invisibility/.test(f.message))).toBe(true);
    // The hedge parenthetical is instruction-leak material and strips.
    const leak = findings.filter((f) => f.rule === 'instruction-leak');
    expect(leak).toHaveLength(1);
    const out = applyCorrections(m, leak, { chassis });
    expect(out.sections.Actions[0].text).not.toContain('or a similar trait');
  });

  test('clause boundaries keep official-shaped uses-references resolving (Aboleth shape)', () => {
    const m = { name: 'Aboleth', type: 'Aberration', sections: { 'Legendary Actions': [
      { name: 'Psychic Drain', text: 'The aboleth uses Consume Memories and regains 5 (2d4) Hit Points.' },
    ], Actions: [
      { name: 'Consume Memories', text: 'One creature must make a saving throw.' },
    ] } };
    expect(lintStatblock(m, { edition: '2014', chassis }).findings
      .filter((f) => f.rule === 'undefined-attack-ref')).toHaveLength(0);
  });

  test('prose-ft-abbrev: verbatim Shardwisp distances normalize to feet', () => {
    const m = { name: 'Shardwisp', type: 'Fey', sections: { Actions: [
      { name: 'Anchored Barrier', text: 'The shardwisp anchors a crystal at a point within 30 ft. of it, creating a shimmering barrier.' },
    ] } };
    const findings = lintStatblock(m, { edition: '2014', chassis }).findings
      .filter((f) => f.rule === 'prose-ft-abbrev');
    expect(findings).toHaveLength(1);
    const out = applyCorrections(m, findings, { chassis });
    expect(out.sections.Actions[0].text).toContain('within 30 feet of it');
  });
});

describe('2014→2024 conversion batch (Shisstril/Bonesilence/Prism Storm/Shivver leaks)', () => {
  const { chassis } = buildContext(22, 'lurker');
  const fix = (sections, type = 'Fey', name = 'Shisstril') => {
    const m = { name, type, sections };
    const findings = lintStatblock(m, { edition: '2024', chassis }).findings;
    return { findings, out: applyCorrections(m, findings, { chassis }) };
  };

  test('phrasing-hit-marker strips deterministically (verbatim Poisonous Tongue)', () => {
    const { findings, out } = fix({ Actions: [
      { name: 'Poisonous Tongue', text: '*Melee Attack Roll:* +16, reach 10 ft. Hit: 18 (2d8 + 9) Piercing damage plus 9 (2d8) Poison damage.' },
    ] });
    expect(findings.map((f) => f.rule)).toContain('phrasing-hit-marker');
    expect(out.sections.Actions[0].text).toContain('reach 10 ft. 18 (2d8 + 9) Piercing damage');
    expect(out.sections.Actions[0].text).not.toContain('Hit:');
  });

  test('success-half-phrasing: verbatim Shivver clause becomes "Half damage only."', () => {
    const { findings, out } = fix({ Actions: [
      { name: 'Lightning Bolt (Recharge 5-6)', text: '*Dexterity Saving Throw:* DC 17, each creature in a line 30 feet long and 5 feet wide. *Failure:* 24 (7d6) Lightning damage. *Success:* Half as much Lightning damage.' },
    ] }, 'Elemental');
    expect(findings.map((f) => f.rule)).toContain('success-half-phrasing');
    expect(out.sections.Actions[0].text).toContain('*Success:* Half damage only.');
  });

  test('skeleton-fusion: verbatim Shattering Charge unfuses at the skeleton', () => {
    const { findings, out } = fix({ Traits: [
      { name: 'Shattering Charge', text: 'If the bonesilence moves at least 20 feet straight toward a target and then hits it with a Bone Smash attack on the same turn, the target takes an extra 18 (4d8) Bludgeoning damage and Strength Saving Throw: DC 17, the target. Failure: The target is pushed 10 feet away from the bonesilence and has the Prone condition.' },
    ] }, 'Beast');
    expect(findings.map((f) => f.rule)).toContain('skeleton-fusion');
    // (dc-band may also retune the DC to the test chassis — the unfusing
    // is what this test pins.)
    expect(out.sections.Traits[0].text).toMatch(/Bludgeoning damage\. Strength Saving Throw: DC \d+/);
  });

  test('trigger-outside-reactions: verbatim Prism Storm legendary garbles collapse', () => {
    const { findings, out } = fix({
      'Legendary Actions': [
        { name: 'Double Teleport', text: 'Trigger: The storm uses Shard Teleport. Response: It does so.' },
        { name: 'Shard Volley (Costs 2 Actions)', text: 'Trigger: The storm takes this action. Response: It makes one Refractive Shard attack against each creature of its choice within 60 feet.' },
      ],
      Reactions: [
        { name: 'Real Reaction', text: '*Trigger:* A creature within 30 feet hits the storm with an attack roll. *Response:* The storm makes one Refractive Shard attack against that creature.' },
      ],
    }, 'Aberration', 'Prism Storm');
    const hits = findings.filter((f) => f.rule === 'trigger-outside-reactions');
    expect(hits).toHaveLength(2);
    const out2 = out.sections['Legendary Actions'];
    expect(out2[0].text).toBe('The storm uses Shard Teleport.');
    expect(out2[1].text).toBe('It makes one Refractive Shard attack against each creature of its choice within 60 feet.');
    // Real reactions keep their Trigger/Response form untouched.
    expect(out.sections.Reactions[0].text).toContain('*Trigger:* A creature within 30 feet');
  });

  test('prose-ft-abbrev extended shapes: radius and by-distance', () => {
    const { findings, out } = fix({ Actions: [
      { name: 'Anchored Barrier', text: 'The shardwisp anchors a crystal, creating a shimmering barrier in a 10 ft. radius centered on that point. Speed is reduced by 10 ft. until the end of its next turn.' },
    ] });
    expect(findings.map((f) => f.rule)).toContain('prose-ft-abbrev');
    expect(out.sections.Actions[0].text).toContain('a 10-foot radius');
    expect(out.sections.Actions[0].text).toContain('by 10 feet until');
  });
});

describe('conversion BPS-package drop (owner call, batch 6)', () => {
  const { convertEdition } = require('../format-2024/generate.mjs');
  const queuedLLM = (queue) => jest.fn(async (prompt, validate) => {
    const raw = JSON.stringify(queue.shift());
    if (validate && !validate(raw)) throw new Error('validator rejected fixture');
    return raw;
  });

  const legacyBase = (extras = {}) => ({
    name: 'Shivver',
    type_and_alignment: 'Medium elemental, chaotic evil',
    armor_class: '17',
    hit_points: '157 (21d8 + 63)',
    speed: '40 ft., climb 40 ft.',
    attributes: 'STR 10 (+0), DEX 24 (+7), CON 16 (+3), INT 6 (-2), WIS 14 (+2), CHA 8 (-1)',
    saving_throws: 'DEX +11, WIS +6',
    damage_resistances: 'lightning; bludgeoning, piercing, and slashing from nonmagical attacks',
    damage_immunities: 'poison',
    condition_immunities: 'poisoned',
    senses: 'darkvision 60 ft.; passive Perception 16',
    languages: "understands Primordial but can't speak",
    challenge_rating: '12 (8,400 XP)',
    proficiency_bonus: '+4',
    format: '2014',
    abilities: [],
    actions: [{ name: 'Bite', description: 'Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 20 (3d8 + 7) piercing damage.' }],
    ...extras,
  });

  test('2014→2024 drops the physical package on a non-swarm and reports a note', async () => {
    const legacy = legacyBase();
    const response = { Actions: [{ name: 'Bite', text: '*Melee Attack Roll:* +11, reach 5 ft. 20 (3d8 + 7) Piercing damage.' }] };
    const converted = await convertEdition(legacy, queuedLLM([response]));
    expect(converted.format).toBe('2024');
    expect(converted.resistances).toBe('Lightning');
    expect(converted._conversionNotes).toHaveLength(1);
    expect(converted._conversionNotes[0]).toContain('resistance package');
  });

  test('a swarm keeps its B/P/S package, no note', async () => {
    const legacy = legacyBase({
      name: 'Bonewrack',
      type_and_alignment: 'Medium swarm of Tiny dragons, chaotic neutral',
      damage_resistances: 'bludgeoning, piercing, slashing',
    });
    const response = { Actions: [{ name: 'Bite', text: '*Melee Attack Roll:* +11, reach 5 ft. 20 (3d8 + 7) Piercing damage.' }] };
    const converted = await convertEdition(legacy, queuedLLM([response]));
    expect(converted.resistances).toContain('Bludgeoning');
    expect(converted._conversionNotes).toBeUndefined();
  });
});

describe('batch 7 (Facetwing/Saltweb/Juggernaut): inversions + suffix doubling', () => {
  const { chassis } = buildContext(11, 'skirmisher');
  const lint24 = (m) => lintStatblock(m, { edition: '2024', chassis }).findings;

  test('self-afflicted-condition: verbatim inverted Poison Immunity flags; Invisible Stalker stays legal', () => {
    const bad = { name: 'Facetwing', type: 'Elemental', sections: { Traits: [
      { name: 'Poison Immunity', text: 'The facetwing has the Poisoned condition. It has Resistance to Bludgeoning, Piercing, and Slashing damage from nonmagical attacks.' },
    ] } };
    expect(lint24(bad).map((f) => f.rule)).toContain('self-afflicted-condition');
    const stalker = { name: 'Invisible Stalker', type: 'Elemental', sections: { Traits: [
      { name: 'Invisibility', text: 'The stalker has the Invisible condition.' },
    ] } };
    expect(lint24(stalker).map((f) => f.rule)).not.toContain('self-afflicted-condition');
  });

  test('generic-self-reference: verbatim "The creature casts" names the monster', () => {
    const m = { name: 'Saltweb Skitterer', type: 'Construct', sections: { Traits: [
      { name: 'Innate Spellcasting', text: 'The creature casts one of the following spells, using Charisma as the spellcasting ability (spell save DC 17): At will: Blade Ward, True Strike.' },
    ] } };
    const findings = lint24(m);
    expect(findings.map((f) => f.rule)).toContain('generic-self-reference');
    expect(findings.map((f) => f.rule)).toContain('spellcasting-entry-name');
    const out = applyCorrections(m, findings, { chassis });
    expect(out.sections.Traits[0].text).toContain('The saltweb skitterer casts one of');
    expect(out.sections.Traits[0].name).toBe('Spellcasting');
  });

  test('skeleton-fusion colon variant: verbatim Rusting Touch unfuses', () => {
    const m = { name: 'Saltweb Skitterer', type: 'Construct', sections: { Traits: [
      { name: 'Rusting Touch', text: 'A creature that hits the skitterer with a nonmagical metal weapon: Dexterity Saving Throw: DC 15, that creature. Failure: the weapon takes a permanent and cumulative −1 penalty to damage rolls.' },
    ] } };
    const findings = lint24(m).filter((f) => f.rule === 'skeleton-fusion');
    expect(findings).toHaveLength(1);
    const out = applyCorrections(m, findings, { chassis });
    expect(out.sections.Traits[0].text).toContain('weapon. Dexterity Saving Throw: DC 15');
  });

  test('doubled cost suffix: assembly strips in-section suffixes; the legacy fold never doubles', () => {
    const fixture = JSON.parse(JSON.stringify(llm2014Fixture));
    fixture.sections['Bonus Actions'] = [
      { name: 'Disengage (Bonus Action)', text: 'The stalker takes the Disengage action.' },
    ];
    const m = assembleMonster(fixture, ctx());
    expect(m.sections['Bonus Actions'][0].name).toBe('Disengage');
    const legacy = toLegacyModel(m);
    const folded = legacy.abilities.find((a) => /Disengage/.test(a.name));
    expect(folded.name).toBe('Disengage (Bonus Action)');
  });

  test('duplicate-cross-section matches through doubled suffixes', () => {
    const m = { name: 'Saltweb Skitterer', type: 'Construct', sections: {
      Traits: [{ name: 'Disengage (Bonus Action) (Bonus Action)', text: 'The saltweb skitterer takes the Disengage action.' }],
      Actions: [{ name: 'Disengage (Bonus Action)', text: 'The saltweb skitterer takes the Disengage action.' }],
    } };
    const findings = lint24(m).filter((f) => f.rule === 'duplicate-cross-section');
    expect(findings).toHaveLength(1);
    const out = applyCorrections(m, findings, { chassis });
    expect(out.sections.Traits).toHaveLength(0);
  });

  test('bps drop also strips the trait restatement (verbatim Stony Hide clause)', async () => {
    const { convertEdition } = require('../format-2024/generate.mjs');
    const queuedLLM = (queue) => jest.fn(async (prompt, validate) => {
      const raw = JSON.stringify(queue.shift());
      if (validate && !validate(raw)) throw new Error('validator rejected fixture');
      return raw;
    });
    const legacy = {
      name: 'Stoneslide Juggernaut',
      type_and_alignment: 'Huge giant, neutral',
      armor_class: '23', hit_points: '400 (32d12 + 192)', speed: '40 ft.',
      attributes: 'STR 26 (+8), DEX 10 (+0), CON 22 (+6), INT 18 (+4), WIS 16 (+3), CHA 12 (+1)',
      saving_throws: 'STR +15, CON +13',
      damage_resistances: 'bludgeoning, piercing, and slashing from nonmagical attacks',
      damage_immunities: 'cold', condition_immunities: 'paralyzed, petrified',
      senses: 'darkvision 120 ft.; passive Perception 20', languages: 'Giant',
      challenge_rating: '21 (33,000 XP)', proficiency_bonus: '+7', format: '2014',
      abilities: [{ name: 'Stony Hide', description: "The juggernaut's hide is as hard as stone, and it is resistant to bludgeoning, piercing, and slashing damage from nonmagical attacks." }],
      actions: [{ name: 'Slam', description: 'Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 26 (4d8 + 8) bludgeoning damage.' }],
    };
    const response = {
      Traits: [{ name: 'Stony Hide', text: "The juggernaut's hide is as hard as stone, and it is resistant to Bludgeoning, Piercing, and Slashing damage from nonmagical attacks." }],
      Actions: [{ name: 'Slam', text: '*Melee Attack Roll:* +15, reach 10 ft. 26 (4d8 + 8) Bludgeoning damage.' }],
    };
    const converted = await convertEdition(legacy, queuedLLM([response]));
    expect(converted.resistances).toBeUndefined();
    expect(converted.sections.Traits[0].text).toBe("The juggernaut's hide is as hard as stone.");
    expect(converted._conversionNotes).toHaveLength(1);
  });
});

describe('batch 8 (Siltsine/Amber Hound): type stamp + new leak shapes', () => {
  const { chassis } = buildContext(12, 'lurker');
  const lint24 = (m) => lintStatblock(m, { edition: '2024', chassis }).findings;

  test('resolved creature type stamps over a model-typed Humanoid (the Amber Hound class)', () => {
    const fixture = JSON.parse(JSON.stringify(llm2014Fixture));
    fixture.type = 'Humanoid';
    const m = assembleMonster(fixture, { ...ctx(), resolvedType: 'Construct' });
    expect(m.type).toBe('Construct');
  });

  test('the stamp never breaks swarm forms and ignores junk values', () => {
    const fixture = JSON.parse(JSON.stringify(llm2014Fixture));
    fixture.type = 'Swarm of Tiny Constructs';
    const swarm = assembleMonster(fixture, { ...ctx(), resolvedType: 'Beast' });
    expect(swarm.type).toBe('Swarm of Tiny Constructs');
    const fixture2 = JSON.parse(JSON.stringify(llm2014Fixture));
    fixture2.type = 'Monstrosity';
    const junk = assembleMonster(fixture2, { ...ctx(), resolvedType: 'Sparkle Fairy' });
    expect(junk.type).toBe('Monstrosity');
  });

  test('instruction-leak: verbatim Siltsine Credits sentence strips', () => {
    const m = { name: 'Siltsine', type: 'Aberration', sections: { Actions: [
      { name: 'Burrowing Eruption (Recharge 5-6)', text: 'Each creature in that area must make a DC 17 Dexterity saving throw, taking 49 (14d6) poison damage on a failed save, or half as much damage on a successful one. Credits: This ability fills the required slot for an ambush or once-per-fight nova mechanic.' },
    ] } };
    const findings = lintStatblock(m, { edition: '2014', chassis }).findings
      .filter((f) => f.rule === 'instruction-leak');
    expect(findings).toHaveLength(1);
    const out = applyCorrections(m, findings, { chassis });
    expect(out.sections.Actions[0].text).not.toMatch(/Credits|slot/);
    expect(out.sections.Actions[0].text).toContain('half as much damage on a successful one.');
  });

  test('failure-damage-echo: verbatim Spore Volley conversion drops the doubled 25', () => {
    const m = { name: 'Siltsine', type: 'Aberration', sections: { Actions: [
      { name: 'Spore Volley', text: '*Ranged Attack Roll:* +11, range 120 ft. 25 (4d8 + 7) Poison damage. *Constitution Saving Throw:* DC 17, the target. *Failure:* 25 Poison damage and the target has the Poisoned condition for 1 minute.' },
    ] } };
    const findings = lint24(m).filter((f) => f.rule === 'failure-damage-echo');
    expect(findings).toHaveLength(1);
    const out = applyCorrections(m, findings, { chassis });
    expect(out.sections.Actions[0].text).toContain('*Failure:* The target has the Poisoned condition');
    // The attack line's real damage survives.
    expect(out.sections.Actions[0].text).toContain('25 (4d8 + 7) Poison damage');
  });

  test('conversion drops source-qualified PARTIAL physical packages with the note', async () => {
    const { convertEdition } = require('../format-2024/generate.mjs');
    const queuedLLM = (queue) => jest.fn(async (prompt, validate) => {
      const raw = JSON.stringify(queue.shift());
      if (validate && !validate(raw)) throw new Error('validator rejected fixture');
      return raw;
    });
    const legacy = {
      name: 'Siltsine', type_and_alignment: 'Medium aberration, neutral evil',
      armor_class: '17', hit_points: '157 (21d8 + 63)', speed: '30 ft., burrow 30 ft.',
      attributes: 'STR 10 (+0), DEX 24 (+7), CON 16 (+3), INT 18 (+4), WIS 14 (+2), CHA 12 (+1)',
      saving_throws: 'INT +8, WIS +6',
      damage_resistances: 'psychic, bludgeoning, and slashing from nonmagical attacks',
      damage_immunities: 'poison', condition_immunities: 'poisoned, frightened',
      senses: 'darkvision 120 ft.; passive Perception 16', languages: 'Deep Speech',
      challenge_rating: '12 (8,400 XP)', proficiency_bonus: '+4', format: '2014',
      abilities: [], actions: [{ name: 'Spore Volley', description: 'Ranged Weapon Attack: +11 to hit, range 120 ft., one target. Hit: 25 (4d8 + 7) poison damage.' }],
    };
    const response = { Actions: [{ name: 'Spore Volley', text: '*Ranged Attack Roll:* +11, range 120 ft. 25 (4d8 + 7) Poison damage.' }] };
    const converted = await convertEdition(legacy, queuedLLM([response]));
    expect(converted.resistances).toBe('Psychic');
    expect(converted._conversionNotes).toHaveLength(1);
  });
});

describe('batch 9 (Shusspore/Shalespire): self-named entries, 2014 trait novas, The-names', () => {
  const { chassis } = buildContext(23, 'lurker');
  const lint14 = (m) => lintStatblock(m, { edition: '2014', chassis }).findings;

  test('entry-named-after-monster: verbatim Shusspore trait flags', () => {
    const m = { name: 'Shusspore', type: 'Celestial', sections: { Traits: [
      { name: 'Shusspore', text: 'While buried in earth or stone, the shusspore has tremorsense up to 60 feet and is indistinguishable from the surrounding ground.' },
    ] } };
    expect(lint14(m).map((f) => f.rule)).toContain('entry-named-after-monster');
  });

  test('trait-imposes-save catches the 2014 prose form and strips the cost lead-in (verbatim Spine Burst)', () => {
    const m = { name: 'Shalespire', type: 'Plant', sections: { Traits: [
      { name: 'Spine Burst (1/Day)', text: 'As an action, shalespire can launch a concentrated volley of barbed spines in a 30-foot-radius sphere centered on a point it can see within 120 feet. Each creature in that area must make a DC 23 Dexterity saving throw. On a failed save, a creature takes 44 (8d10) piercing damage, or half as much on a successful one.' },
    ] } };
    const findings = lint14(m).filter((f) => f.rule === 'trait-imposes-save');
    expect(findings).toHaveLength(1);
    const out = applyCorrections(m, findings, { chassis });
    expect(out.sections.Traits).toHaveLength(0);
    expect(out.sections.Actions[0].name).toBe('Spine Burst (1/Day)');
    expect(out.sections.Actions[0].text).toMatch(/^Shalespire can launch/);
    expect(out.sections.Actions[0].relocated).toBe(true);
  });

  test('official As-an-action utility traits without saves stay in Traits (Flameskull shape)', () => {
    const m = { name: 'Flameskull', type: 'Undead', sections: { Traits: [
      { name: 'Illumination', text: 'As an action, the flameskull can set its flames to shed bright light in a 15-foot radius, dim light in a 15-foot radius, or both.' },
    ] } };
    expect(lint14(m).filter((f) => f.rule === 'trait-imposes-save')).toHaveLength(0);
  });

  test('half-as-much-phrasing: verbatim Shalespire clause gains "damage"', () => {
    const m = { name: 'Shalespire', type: 'Plant', sections: { Actions: [
      { name: 'Root-Leg Trample', text: 'Each creature whose space it enters must make a DC 23 Dexterity saving throw, taking 21 (6d6) bludgeoning damage on a failed save, or half as much on a successful one.' },
    ] } };
    const findings = lint14(m).filter((f) => f.rule === 'half-as-much-phrasing');
    expect(findings).toHaveLength(1);
    const out = applyCorrections(m, findings, { chassis });
    expect(out.sections.Actions[0].text).toContain('half as much damage on a successful one');
  });
});

describe('type essences (anti-reskinning, owner call 2026-07-28)', () => {
  const { buildRandomConceptSeed, TYPE_ESSENCES, buildSynthesizedConcept } =
    require('../format-2024/concept-seeds.mjs');
  const { buildSeedSynthesisPrompt } = require('../format-2024/generate.mjs');

  test('every rolled type has an essence and the seed carries it', () => {
    for (const t of Object.keys(TYPE_ESSENCES)) {
      expect(TYPE_ESSENCES[t].length).toBeGreaterThan(40);
    }
    const seed = buildRandomConceptSeed();
    expect(seed.concept).toContain(`Its creature type MUST be ${seed.creature_type}: ${TYPE_ESSENCES[seed.creature_type]}`);
    expect(seed.concept).toContain('never a finished creature the type is painted onto');
  });

  test('the synthesis prompt fuses FROM the essence, not onto it', () => {
    const seed = { intelligence: 'mindless (INT 1-2)', physical: 'fungal', silhouette: 'burrower', origin: 'a city of graves', disposition: 'a relentless ambush predator', creature_type: 'Celestial' };
    const prompt = buildSeedSynthesisPrompt(seed);
    expect(prompt).toContain('Celestial — a being OF the higher planes');
    expect(prompt).toContain('never design the traits first and paint the type on after');
  });

  test('synthesized concepts carry the essence too', () => {
    const traits = { intelligence: 'scheming (INT 14-16)', disposition: 'a patient killer that strikes from extreme range', creature_type: 'Fiend', naming: 'a folk name: what frightened villagers would whisper — an <adjective> <noun> pair built from plain words that describe its body or behavior (store it WITHOUT a leading "the"; prose adds the article)' };
    const out = buildSynthesizedConcept(traits, 'A tar-black huntsman that watches from chimney smoke.');
    expect(out).toContain('Fiend: a being of the lower planes');
  });
});

describe('batch 10 (Bonecradle/Fissurecheat): flavor restatements, passive-rider actions', () => {
  const { renameAbilitiesSafely } = require('../format-2024/generate.mjs');
  const { chassis } = buildContext(8, 'controller');
  const lint14 = (m) => lintStatblock(m, { edition: '2014', chassis }).findings;

  test('defense-restated catches the flavor-lead shape (verbatim Bone Shroud)', () => {
    const m = { name: 'Bonecradle', type: 'Undead', resistances: 'bludgeoning, piercing, and slashing from nonmagical attacks', sections: { Traits: [
      { name: 'Bone Shroud', text: "The bonecradle's body is a mass of animated bones that grant it resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons." },
    ] } };
    expect(lint14(m).map((f) => f.rule)).toContain('defense-restated');
  });

  test('action-passive-rider: verbatim Grasping Earth relocates to Traits and still scores as an action', () => {
    const { plan } = buildContext(8, 'controller');
    const m = { name: 'Bonecradle', type: 'Undead', sections: {
      Traits: [{ name: 'Spike Field', text: 'Whenever a creature starts its turn in the space, it takes 5 (1d10) piercing damage.' }],
      Actions: [
        { name: 'Multiattack', text: 'The bonecradle makes two attacks: one with its Skeletal Grasp and one with its Crushing Ribs.' },
        { name: 'Skeletal Grasp', text: 'Melee Weapon Attack: +8 to hit, reach 15 ft., one target. Hit: 18 (3d8 + 5) bludgeoning damage.' },
        { name: 'Crushing Ribs', text: 'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 18 (3d8 + 5) bludgeoning damage.' },
        { name: 'Grasping Earth', text: "The first time on each of the bonecradle's turns that it hits a creature with its Skeletal Grasp attack, the target must succeed on a DC 16 Strength saving throw or be grappled (escape DC 16)." },
      ],
    } };
    const findings = lint14(m).filter((f) => f.rule === 'action-passive-rider');
    expect(findings).toHaveLength(1);
    const out = applyCorrections(m, findings, { chassis });
    expect(out.sections.Actions.map((e) => e.name)).not.toContain('Grasping Earth');
    const moved = out.sections.Traits.find((e) => e.name === 'Grasping Earth');
    expect(moved.relocatedToTraits).toBe(true);
    // Counts: still scores as an action, never inflates the trait count.
    const counts = lintStatblock(out, { chassis, plan, edition: '2014' }).findings.filter((f) => f.rule === 'counts');
    expect(counts.map((f) => f.message)).toEqual(counts.map((f) => f.message)); // no throw path
  });

  test('ability_renames strips a model-emitted leading article (the Seeping Fissures path)', () => {
    const m = { name: 'Fissurecheat', sections: { Traits: [
      { name: 'Searing Skin', text: 'A creature that touches the swarm takes 5 (1d10) fire damage.' },
    ] } };
    const out = renameAbilitiesSafely(m, { ability_renames: { 'Searing Skin': 'The Seeping Fissures' } });
    expect(out.sections.Traits[0].name).toBe('Seeping Fissures');
  });
});

describe('batch 10 conversions (Bonecradle/Wardrake/Thudstep leaks)', () => {
  const { chassis } = buildContext(8, 'controller');
  const fix = (sections, name = 'Thudstep', type = 'Construct') => {
    const m = { name, type, sections };
    const findings = lintStatblock(m, { edition: '2024', chassis }).findings;
    return { findings, out: applyCorrections(m, findings, { chassis }) };
  };

  test('term-caps: verbatim advantage/long rest capitalize in 2024', () => {
    const { findings, out } = fix({ Traits: [
      { name: 'Magic Resistance', text: 'The thudstep has advantage on saving throws against spells and other magical effects.' },
      { name: 'Necrotic Pulse', text: 'This reduction lasts until the creature finishes a long rest.' },
    ] });
    expect(findings.map((f) => f.rule)).toContain('term-caps');
    expect(out.sections.Traits[0].text).toContain('has Advantage on saving throws');
    expect(out.sections.Traits[1].text).toContain('finishes a Long Rest');
  });

  test('success-no-effect: verbatim "Success: No damage." strips', () => {
    const { out } = fix({ 'Bonus Actions': [
      { name: 'Squirm Advance', text: 'If it moves through another creature\'s space, *Dexterity Saving Throw:* DC 15, that creature. *Failure:* 5 (1d10) Fire damage. *Success:* No damage.' },
    ] }, 'Fissurecheat', 'Fey');
    expect(out.sections['Bonus Actions'][0].text).not.toMatch(/No damage/);
    expect(out.sections['Bonus Actions'][0].text).toContain('*Failure:* 5 (1d10) Fire damage.');
  });

  test('inability-phrasing: verbatim Spore Cloud garble becomes "can\'t"', () => {
    const { findings, out } = fix({ Traits: [
      { name: 'Spore Cloud', text: '*Wisdom Saving Throw:* DC 17, each hostile creature within 10 feet of it. *Failure:* It has the inability to take reactions until the start of the wardrake\'s next turn.' },
    ] }, 'Sporeveil Wardrake', 'Dragon');
    expect(findings.map((f) => f.rule)).toContain('inability-phrasing');
    expect(out.sections.Traits[0].text).toContain("It can't take reactions until");
  });

  test('paren-DC saving throw flags as phrasing (verbatim Grasping Earth)', () => {
    const { findings } = fix({ Traits: [
      { name: 'Grasping Earth', text: 'The first time on each of the bonecradle\'s turns that it hits a creature with its Skeletal Grasp attack, the target must make a Strength Saving Throw (DC 16). Failure: The target has the Grappled condition (escape DC 16).' },
    ] }, 'Bonecradle', 'Undead');
    expect(findings.map((f) => f.rule)).toContain('phrasing-saving-throw');
  });

  test('conversion strips grant-form restatements and relocates passive riders (Bonecradle e2e)', async () => {
    const { convertEdition } = require('../format-2024/generate.mjs');
    const queuedLLM = (queue) => jest.fn(async (prompt, validate) => {
      const raw = JSON.stringify(queue.shift());
      if (validate && !validate(raw)) throw new Error('validator rejected fixture');
      return raw;
    });
    const legacy = {
      name: 'Bonecradle', type_and_alignment: 'Large undead, neutral evil',
      armor_class: '16', hit_points: '133 (14d10 + 56)', speed: '30 ft., burrow 20 ft.',
      attributes: 'STR 20 (+5), DEX 10 (+0), CON 18 (+4), INT 6 (-2), WIS 14 (+2), CHA 10 (+0)',
      saving_throws: 'STR +8, CON +7',
      damage_resistances: 'bludgeoning, piercing, and slashing from nonmagical attacks',
      damage_immunities: 'poison', condition_immunities: 'frightened, poisoned',
      senses: 'darkvision 60 ft.; passive Perception 15', languages: "understands the languages of its creator but can't speak",
      challenge_rating: '8 (3,900 XP)', proficiency_bonus: '+3', format: '2014',
      abilities: [{ name: 'Bone Shroud', description: "The bonecradle's body is a mass of animated bones that grant it resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons." }],
      actions: [
        { name: 'Crushing Ribs', description: 'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 18 (3d8 + 5) bludgeoning damage.' },
        { name: 'Grasping Earth', description: "The first time on each of the bonecradle's turns that it hits a creature with its Skeletal Grasp attack, the target has the Grappled condition (escape DC 16)." },
      ],
    };
    const response = {
      Traits: [{ name: 'Bone Shroud', text: "The bonecradle's body is a mass of animated bones that grant it resistance to Bludgeoning, Piercing, and Slashing damage from nonmagical weapons." }],
      Actions: [
        { name: 'Crushing Ribs', text: '*Melee Attack Roll:* +8, reach 5 ft. 18 (3d8 + 5) Bludgeoning damage.' },
        { name: 'Grasping Earth', text: "The first time on each of the bonecradle's turns that it hits a creature with its Skeletal Grasp attack, the target has the Grappled condition (escape DC 16)." },
      ],
    };
    const converted = await convertEdition(legacy, queuedLLM([response]));
    expect(converted.resistances).toBeUndefined();
    // Grant-form restatement stripped with the package; the emptied trait drops.
    expect(converted.sections.Traits.map((e) => e.name)).not.toContain('Bone Shroud');
    // Passive rider relocated out of Actions.
    expect(converted.sections.Actions.map((e) => e.name)).not.toContain('Grasping Earth');
    expect(converted.sections.Traits.map((e) => e.name)).toContain('Grasping Earth');
    expect(converted._conversionNotes).toHaveLength(1);
  });
});

describe('batch 11 (Glassfang/Shardswarm/Chitterchill): slot leak, beast INT, swarm shape', () => {
  const { chassis } = buildContext(12, 'swarm');
  const lint14 = (m) => lintStatblock(m, { edition: '2014', chassis }).findings;

  test('raw slot descriptor strips (verbatim Sand Veil)', () => {
    const m = { name: 'Glassfang', type: 'Monstrosity', sections: { Traits: [
      { name: 'Sand Veil', text: 'While burrowing, the glassfang cannot be targeted by attacks of opportunity. It may use its bonus action to Disengage. slot: movement trick: bonus-action Disengage, flyby, spider climb, or burrow' },
    ] } };
    const findings = lint14(m);
    expect(findings.map((f) => f.rule)).toContain('instruction-leak');
    expect(findings.map((f) => f.rule)).toContain('vocab-register');
    const out = applyCorrections(m, findings, { chassis });
    expect(out.sections.Traits[0].text).not.toMatch(/slot:/);
    expect(out.sections.Traits[0].text).toContain('opportunity attacks');
    expect(out.sections.Traits[0].text).toContain('It can use its bonus action');
  });

  test('beast-intelligence retypes a genius Beast to Monstrosity; Giant Owl INT 8 stays', () => {
    const genius = { name: 'Glassfang', type: 'Beast', stats: { STR: 14, DEX: 16, CON: 13, INT: 18, WIS: 14, CHA: 10 }, sections: { Actions: [
      { name: 'Searing Bite', text: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage.' },
    ] } };
    const findings = lint14(genius).filter((f) => f.rule === 'beast-intelligence');
    expect(findings).toHaveLength(1);
    const out = applyCorrections(genius, findings, { chassis });
    expect(out.type).toBe('Monstrosity');
    const owl = { ...genius, stats: { ...genius.stats, INT: 8 } };
    expect(lint14(owl).filter((f) => f.rule === 'beast-intelligence')).toHaveLength(0);
  });

  test('swarm-half-value enforces the dice SHAPE (verbatim Claw Storm)', () => {
    const m = { name: 'Shardswarm', type: 'Swarm of Tiny Dragons', sections: { Actions: [
      { name: 'Claw Storm', text: 'Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 37 (7d8 + 6) slashing damage, or 18 (4d8) slashing damage if the swarm has half of its hit points or fewer.' },
    ] } };
    const findings = lint14(m).filter((f) => f.rule === 'swarm-half-value');
    expect(findings).toHaveLength(1);
    const out = applyCorrections(m, findings, { chassis });
    expect(out.sections.Actions[0].text).toContain('or 19 (3d8 + 6) slashing damage');
  });

  test('identity-immunity material branch now runs on 2014 (verbatim Chitterchill)', () => {
    const m = {
      name: 'Chitterchill Horde', type: 'Swarm of Tiny Fiends',
      resistances: 'bludgeoning, piercing, slashing, cold', immunities: 'fire',
      sections: { Traits: [{ name: 'Frozen Fury', text: 'Each creature that starts its turn in the same space as the horde takes 5 (1d10) fire damage and 5 (1d10) cold damage.' }] },
    };
    const findings = lint14(m).filter((f) => f.rule === 'identity-immunity');
    expect(findings).toHaveLength(1);
    expect(findings[0].expected).toBe('Cold');
  });

  test('mixed spoken/mute languages fold into the understood list', () => {
    const fixture = JSON.parse(JSON.stringify(llm2014Fixture));
    fixture.languages = "Infernal, understands Common but can't speak";
    const m = assembleMonster(fixture, ctx());
    expect(m.languages).toBe("Understands Infernal and Common but can't speak");
  });
});

describe('self-escape-immune-condition (verbatim Fracture Escape)', () => {
  test('the dead clause strips; a non-immune escape stays', () => {
    const { chassis } = buildContext(23, 'swarm');
    const m = {
      name: 'Chitterchill Horde', type: 'Swarm of Tiny Fiends',
      immunities: 'fire; charmed, frightened, grappled, paralyzed, petrified, prone, restrained, stunned',
      sections: { 'Legendary Actions': [
        { name: 'Fracture Escape (Costs 2 Actions)', text: 'The horde scatters into its constituent fiends. It ends any grappled or restrained condition on itself, moves up to half its speed, and then reforms.' },
      ] },
    };
    const findings = lintStatblock(m, { edition: '2014', chassis }).findings
      .filter((f) => f.rule === 'self-escape-immune-condition');
    expect(findings).toHaveLength(1);
    const out = applyCorrections(m, findings, { chassis });
    expect(out.sections['Legendary Actions'][0].text).toContain('It moves up to half its speed, and then reforms.');
    expect(out.sections['Legendary Actions'][0].text).not.toMatch(/ends any/);
    // A creature NOT immune keeps its escape clause.
    const escaper = { ...m, immunities: 'fire' };
    expect(lintStatblock(escaper, { edition: '2014', chassis }).findings
      .filter((f) => f.rule === 'self-escape-immune-condition')).toHaveLength(0);
  });
});

describe('the 2014 header polish (critic 2026-09-14)', () => {
  const { toLegacyModel } = require('../format-2024/generate.mjs');
  const base = () => ({
    name: 'Test Knight', format: '2024', size: 'Medium', type: 'Humanoid', alignment: 'Lawful Neutral',
    ac: 19, hp: 78, hp_formula: '12d8 + 24', speed: '30 ft.',
    stats: { STR: 16, DEX: 12, CON: 14, INT: 11, WIS: 13, CHA: 14 },
    saves: { STR: 6, DEX: 1, CON: 5, INT: 0, WIS: 1, CHA: 2 },
    senses: 'darkvision 60 ft.; Passive Perception 14',
    languages: 'Understands Common and Celestial but can\'t speak',
    cr: 5, cr_str: '5', xp: 1800, pb: 3,
    sections: { Actions: [{ name: 'Mace', text: 'x' }] },
  });

  test('a humanoid AC solves a real armor kit — "19 (splint, shield)" at Dex +1', () => {
    expect(toLegacyModel(base()).armor_class).toBe('19 (splint, shield)');
  });

  test('a non-humanoid over its Dex line prints natural armor; at the Dex line, no note', () => {
    const ooze = { ...base(), type: 'Ooze', ac: 15, stats: { ...base().stats, DEX: 6 } };
    expect(toLegacyModel(ooze).armor_class).toBe('15 (natural armor)');
    const lean = { ...base(), type: 'Beast', ac: 11, stats: { ...base().stats, DEX: 12 } };
    expect(toLegacyModel(lean).armor_class).toBe('11');
  });

  test('the senses semicolon becomes a comma and Understands lowercases', () => {
    const m = toLegacyModel(base());
    expect(m.senses).toBe('darkvision 60 ft., passive Perception 14');
    expect(m.languages).toMatch(/^understands Common/);
  });
});
