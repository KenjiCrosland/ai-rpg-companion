/**
 * Engine routing for embedded statblock generation (dungeon monsters,
 * dungeon NPCs, NPC-generator statblocks) — phase 1 of the embedded
 * edition migration.
 */
jest.mock('@/util/ai-client.mjs', () => ({
  generateGptResponse: jest.fn(),
  isDegradedMode: jest.fn(() => false),
}));
jest.mock('@/tools/statblock-generator/format-2024/generate.mjs', () => {
  const actual = jest.requireActual('@/tools/statblock-generator/format-2024/generate.mjs');
  return { ...actual, generateMonster2024: jest.fn() };
});

import { generateEmbeddedStatblock, preferredEdition, setPreferredEdition } from './embedded-statblock.mjs';
import * as aiClient from '@/util/ai-client.mjs';
import { generateMonster2024 } from '@/tools/statblock-generator/format-2024/generate.mjs';

describe('generateEmbeddedStatblock', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('resolve call feeds archetype, identity, and creature type into the engine', async () => {
    aiClient.generateGptResponse.mockResolvedValueOnce(JSON.stringify({
      archetype: 'defender',
      identity: 'It anchors the doorway and punishes anyone who tries to slip past it.',
      creature_type: 'Construct',
    }));
    generateMonster2024.mockResolvedValueOnce({ name: 'Iron Sentinel', format: '2024', sections: {} });

    const out = await generateEmbeddedStatblock({
      name: 'Iron Sentinel', cr: '3', description: 'a rusted door guardian', caster: false,
    });
    const opts = generateMonster2024.mock.calls[0][0];
    expect(opts.archetypeName).toBe('defender');
    expect(opts.resolvedType).toBe('Construct');
    expect(opts.cr).toBe(3);
    expect(opts.edition).toBe('2024');
    expect(opts.concept).toContain('Iron Sentinel — a rusted door guardian');
    expect(opts.concept).toContain('COMBAT IDENTITY');
    expect(opts.namePass).toBeNull();
    expect(out.name).toBe('Iron Sentinel');
  });

  test('the tool-known type wins over the resolve call; fractional CR parses', async () => {
    aiClient.generateGptResponse.mockResolvedValueOnce(JSON.stringify({
      archetype: 'brute', identity: 'It charges the nearest creature and does not stop swinging until something dies.', creature_type: 'Fiend',
    }));
    generateMonster2024.mockResolvedValueOnce({ name: 'Bone Golem', format: '2024', sections: {} });
    await generateEmbeddedStatblock({ name: 'Bone Golem', cr: '1/2', type: 'Construct' });
    const opts = generateMonster2024.mock.calls[0][0];
    expect(opts.resolvedType).toBe('Construct');
    expect(opts.cr).toBe(0.5);
  });

  test('a drifted output name is stamped back, self-references included', async () => {
    aiClient.generateGptResponse.mockResolvedValueOnce(JSON.stringify({
      archetype: 'lurker', identity: 'It waits beneath the sand until prey wanders close, then erupts in a single killing lunge.', creature_type: 'Monstrosity',
    }));
    generateMonster2024.mockResolvedValueOnce({
      name: 'Duneshade Stalker', format: '2024',
      sections: { Traits: [{ name: 'Ambush', text: 'The stalker waits beneath the sand. Duneshade Stalker strikes with Advantage.' }] },
    });
    const out = await generateEmbeddedStatblock({ name: 'Sand Wraith', cr: 4 });
    expect(out.name).toBe('Sand Wraith');
    expect(out.sections.Traits[0].text).toContain('Sand Wraith strikes with Advantage');
  });

  test('a failed resolve call falls back to a random archetype and still generates', async () => {
    aiClient.generateGptResponse.mockRejectedValueOnce(new Error('boom'));
    generateMonster2024.mockResolvedValueOnce({ name: 'Gloom Rat', format: '2014' });
    const onResolve = jest.fn();
    const out = await generateEmbeddedStatblock({ name: 'Gloom Rat', cr: 1, onResolve });
    expect(onResolve).toHaveBeenCalled();
    expect(typeof generateMonster2024.mock.calls[0][0].archetypeName).toBe('string');
    expect(out.format).toBe('2014');
  });

  test('the shared edition preference routes the edition', async () => {
    setPreferredEdition('2014');
    expect(preferredEdition()).toBe('2014');
    aiClient.generateGptResponse.mockResolvedValueOnce(JSON.stringify({
      archetype: 'skirmisher', identity: 'It darts between shadows, striking once per pass and never lingering in reach.', creature_type: 'Fey',
    }));
    generateMonster2024.mockResolvedValueOnce({ name: 'Thistle Imp', format: '2014' });
    await generateEmbeddedStatblock({ name: 'Thistle Imp', cr: 2 });
    expect(generateMonster2024.mock.calls[0][0].edition).toBe('2014');
  });
});

describe('user-picked combat role (dungeon form parity)', () => {
  test('a non-auto archetype still runs the resolve call with the role as GIVEN (owner call, 2026-08-04)', async () => {
    const { generateMonster2024 } = require('@/tools/statblock-generator/format-2024/generate.mjs');
    const aiClient = require('@/util/ai-client.mjs');
    jest.clearAllMocks();
    aiClient.generateGptResponse.mockResolvedValueOnce(JSON.stringify({
      archetype: 'defender', identity: 'A vault-bound sentinel that plants itself between intruders and its charge.', creature_type: 'Construct',
    }));
    generateMonster2024.mockResolvedValueOnce({ name: 'Vault Warden', format: '2024', sections: {} });
    await generateEmbeddedStatblock({ name: 'Vault Warden', cr: 5, archetype: 'defender' });
    // The resolve call ran (identity + type honesty for picked roles too).
    expect(aiClient.generateGptResponse).toHaveBeenCalledTimes(1);
    const opts = generateMonster2024.mock.calls[0][0];
    expect(opts.archetypeName).toBe('defender'); // user's pick is authoritative
    expect(opts.archetypeSource).toBe('user');
    expect(opts.concept).toContain('COMBAT IDENTITY');
  });
});

describe('encounter adapter 2024 fidelity (plans/statblock-2024-export-mappers.md)', () => {
  test('a 2024-format monster normalizes with real scores, actions, and defenses', async () => {
    const { normalizeCustomMonster } = await import('@/tools/encounter-generator/util/monster-adapter.mjs');
    const monster2024 = {
      name: 'Iron Sentinel', format: '2024', size: 'Large', type: 'Construct',
      alignment: 'Unaligned', ac: 17, hp: 105, hp_formula: '14d10 + 28',
      speed: '30 ft.', stats: { STR: 18, DEX: 10, CON: 14, INT: 6, WIS: 12, CHA: 4 },
      saves: { STR: 7, DEX: 0, CON: 2, INT: -2, WIS: 1, CHA: -3 },
      immunities: 'Poison; Poisoned, Frightened', resistances: 'Cold',
      senses: 'darkvision 60 ft.; Passive Perception 11',
      cr: 5, cr_str: '5', pb: 3, xp: 1800, challenge_rating: '5 (XP 1,800; PB +3)',
      sections: {
        Traits: [{ name: 'Immutable Form', text: 'The sentinel is immune to any spell that would alter its form.' }],
        Actions: [
          { name: 'Multiattack', text: 'The sentinel makes two Slam attacks.' },
          { name: 'Slam', text: '*Melee Attack Roll:* +7, reach 5 ft. 13 (2d8 + 4) Bludgeoning damage.' },
        ],
      },
    };
    const out = normalizeCustomMonster(monster2024, 'Guardians');
    // Previously: scores defaulted to 10, Actions/Traits empty, defenses missed.
    expect(out.STR).toBe('18');
    expect(out.CHA).toBe('4');
    expect(out.Actions.length).toBe(2);
    expect(out.Traits.length).toBe(1);
    expect(out['Damage Immunities']).toContain('poison');
    expect(out['Condition Immunities']).toContain('poisoned');
    expect(out.cr).toBe('5');
    expect(out.xp).toBe(1800);
    // The ORIGINAL 2024 block stays attached for the display dispatch.
    expect(out.statblock.format).toBe('2024');
    expect(out.statblock.sections).toBeDefined();
  });
});
