/**
 * Tests for the rewritten dungeon overview prompt + validator.
 *
 * The prompt itself is a long string — we don't test its content
 * verbatim, just smoke-check that key contextual fragments are
 * present (the per-tier monster CRs, the tension description, the
 * banned tropes when supplied, the user's name when supplied). The
 * validator is the load-bearing surface for response shape.
 */

import {
  dungeonOverviewPrompt,
  validateDungeonOverview,
} from '../prompts/dungeon-overview.mjs';
import {
  DUNGEON_TENSION_DESCRIPTIONS,
  DIFFICULTY_TIERS,
} from '../util/dungeon-dimensions.mjs';

// Minimal valid response, used as the base shape for validator tests.
function validResponse() {
  return {
    name: 'Eikheim Barrow',
    title: 'Tomb of the Singing Bones',
    overview: 'A low mound of moss-furred stone, mist clinging to the entrance lintel.',
    relation_to_larger_setting: 'It sits at the southern edge of the Iron Hills.',
    approach_and_threshold: 'A worn stone stair descends into a chamber lit by phosphorescent lichen.',
    history: 'Built by the Ash-Bearers three centuries ago.',
    dominant_power: 'Vetheras, the lich-king, dreams in the central vault.',
    inhabitants: 'A handful of skeleton wardens, plus a band of cultists camped in the antechamber.',
    notable_inhabitant_facet: 'The cultists have begun arguing among themselves.',
    traps_and_security: 'The doors close on a slow rune-clock; the central vault is warded against sound.',
    notable_security_facet: '',
    central_dynamic: 'Vetheras stirs more each cycle of the moon, and the cultists believe his waking is near.',
    current_occupation: 'Three cultists are conducting the seventh of nine planned vigils.',
    present_state: 'The barrow hums faintly at midnight; the air around the central vault has thickened.',
    difficulty_level: 'A Tier 1 dungeon suited for novice adventurers with local stakes.',
    named_entities: ['Vetheras', 'Aldwyn'],
    npc_list: [
      { name: 'Vetheras', description: 'The dreaming lich-king.' },
      { name: 'Aldwyn', description: 'The leader of the cultist vigil.' },
      { name: 'Brunhild', description: 'A defected cultist hiding nearby.' },
    ],
    monsters: [
      { type: 'minion', name: 'skeleton warden', description: 'Bone-rattling foot soldier.', CR: '1/4' },
      { type: 'strong_minion', name: 'wight captain', description: 'Tactical undead leader.', CR: '1' },
      { type: 'large_creature', name: 'tomb-wyrm', description: 'A burrowing bone-serpent.', CR: '3' },
    ],
  };
}

describe('dungeonOverviewPrompt — content smoke tests', () => {
  const baseArgs = {
    type: 'tomb',
    character: ['ancient', 'haunted', 'moss-furred'],
    register: 'Old-Norse-inspired: ...',
    userName: null,
    tension: 'sealed-and-stirring',
    difficulty: 1,
    description: '',
    lore: '',
    bannedTropes: [],
  };

  it('includes the dungeon type', () => {
    const prompt = dungeonOverviewPrompt(baseArgs);
    expect(prompt).toContain('tomb');
  });

  it('includes character qualities as a comma list', () => {
    const prompt = dungeonOverviewPrompt(baseArgs);
    expect(prompt).toContain('ancient, haunted, moss-furred');
  });

  it('includes the register descriptor', () => {
    const prompt = dungeonOverviewPrompt(baseArgs);
    expect(prompt).toContain('Old-Norse-inspired');
  });

  it('includes the tension and its full description', () => {
    const prompt = dungeonOverviewPrompt(baseArgs);
    expect(prompt).toContain('sealed-and-stirring');
    expect(prompt).toContain(DUNGEON_TENSION_DESCRIPTIONS['sealed-and-stirring']);
  });

  it('includes per-tier monster CRs', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, difficulty: 3 });
    const t3 = DIFFICULTY_TIERS[3].monsterCRs;
    expect(prompt).toContain(`minion ~${t3.minion}`);
    expect(prompt).toContain(`strong minion ~${t3.strongMinion}`);
    expect(prompt).toContain(`large creature ~${t3.largeCreature}`);
  });

  it('includes the tier name and scope-of-stakes', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, difficulty: 5 });
    expect(prompt).toContain(DIFFICULTY_TIERS[5].name);
    expect(prompt).toContain(DIFFICULTY_TIERS[5].scopeOfStakes);
  });

  it('emits the user-name directive verbatim when one is supplied', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, userName: 'the Hollow Vault' });
    expect(prompt).toContain('the Hollow Vault');
    expect(prompt).toContain('VERBATIM');
  });

  it('omits the user-name directive when none is supplied', () => {
    const prompt = dungeonOverviewPrompt(baseArgs);
    expect(prompt).toContain('register-coherent dungeon name');
  });

  it('emits the anti-clustering ban block when banned tropes are supplied', () => {
    const tropes = [
      'ancient seal weakening: the seal is failing.',
      'lich seeking phylactery: phylactery hunt.',
    ];
    const prompt = dungeonOverviewPrompt({ ...baseArgs, bannedTropes: tropes });
    expect(prompt).toContain('ANTI-CLUSTERING');
    expect(prompt).toContain('ancient seal weakening');
    expect(prompt).toContain('lich seeking phylactery');
  });

  it('omits the anti-clustering block when no banned tropes are supplied', () => {
    const prompt = dungeonOverviewPrompt(baseArgs);
    expect(prompt).not.toContain('ANTI-CLUSTERING');
  });

  it('includes the fantasy-texture requirement', () => {
    const prompt = dungeonOverviewPrompt(baseArgs);
    expect(prompt).toContain('FANTASY TEXTURE REQUIREMENT');
    expect(prompt).toContain('NAMED and PRESENT-TENSE');
  });

  it('includes boss-vs-miniboss logic', () => {
    const prompt = dungeonOverviewPrompt(baseArgs);
    expect(prompt).toContain('BOSS-VS-MINIBOSS LOGIC');
    expect(prompt).toContain('npc_list');
    expect(prompt).toContain('large_creature');
  });

  it('escapes quotes in user description', () => {
    const prompt = dungeonOverviewPrompt({
      ...baseArgs,
      description: 'a tomb with "the sealed gate"',
    });
    expect(prompt).toContain('\\"the sealed gate\\"');
  });

  it('falls back to Tier 1 CRs for an invalid difficulty', () => {
    const prompt = dungeonOverviewPrompt({ ...baseArgs, difficulty: 99 });
    expect(prompt).toContain(DIFFICULTY_TIERS[1].name);
  });
});

describe('validateDungeonOverview', () => {
  it('accepts a well-shaped response', () => {
    expect(validateDungeonOverview(JSON.stringify(validResponse()))).toBe(true);
  });

  it('accepts empty strings for the optional facet fields', () => {
    const r = validResponse();
    r.notable_inhabitant_facet = '';
    r.notable_security_facet = '';
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(true);
  });

  it('accepts the response when optional facet fields are missing entirely', () => {
    const r = validResponse();
    delete r.notable_inhabitant_facet;
    delete r.notable_security_facet;
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(true);
  });

  it('rejects malformed JSON', () => {
    expect(validateDungeonOverview('{not json')).toBe(false);
    expect(validateDungeonOverview('')).toBe(false);
  });

  it('rejects when a required string field is missing', () => {
    const r = validResponse();
    delete r.overview;
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when a required string field is empty', () => {
    const r = validResponse();
    r.dominant_power = '';
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when a required field is wrong type', () => {
    const r = validResponse();
    r.history = 123;
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when named_entities is not an array', () => {
    const r = validResponse();
    r.named_entities = 'Vetheras, Aldwyn';
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when named_entities contains non-strings', () => {
    const r = validResponse();
    r.named_entities = ['Vetheras', 42];
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when npc_list is empty', () => {
    const r = validResponse();
    r.npc_list = [];
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when an npc entry is malformed', () => {
    const r = validResponse();
    r.npc_list = [{ name: 'Vetheras' }]; // missing description
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when monsters has != 3 entries', () => {
    const r = validResponse();
    r.monsters = [r.monsters[0], r.monsters[1]];
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when monster types do not cover minion + strong_minion + large_creature', () => {
    const r = validResponse();
    r.monsters[2].type = 'minion';
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('rejects when a monster entry is missing name', () => {
    const r = validResponse();
    delete r.monsters[0].name;
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });

  it('accepts numeric CR alongside string CR', () => {
    const r = validResponse();
    r.monsters[0].CR = 0.25;
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(true);
  });

  it('rejects when monster is missing a CR field', () => {
    const r = validResponse();
    delete r.monsters[1].CR;
    expect(validateDungeonOverview(JSON.stringify(r))).toBe(false);
  });
});
