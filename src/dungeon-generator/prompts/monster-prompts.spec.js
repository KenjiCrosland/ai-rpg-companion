import { createStatblockPrompts } from './monster-prompts.mjs';

// Mock the imported JSON files
jest.mock('../../data/creatureTemplates.json', () => ({
  '1': [
    {
      type: 'balanced',
      armor_class: 13,
      hit_points: 30,
      to_hit_bonus: 3,
      saving_throws: '+2, +1',
      actions: [
        {
          name: 'Multiattack',
          description: 'The creature makes two attacks.',
        },
        {
          name: 'Action 1',
          description: 'Melee attack: +3 to hit, 5 (1d8 + 1) damage.',
        },
      ],
    },
    {
      type: 'offensive',
      armor_class: 12,
      hit_points: 25,
      to_hit_bonus: 4,
      saving_throws: '+1',
      actions: [
        {
          name: 'Attack',
          description: 'Melee attack: +4 to hit, 7 (1d10 + 2) damage.',
        },
      ],
    },
    {
      type: 'defensive',
      armor_class: 15,
      hit_points: 40,
      to_hit_bonus: 2,
      saving_throws: '+3, +2',
      actions: [
        {
          name: 'Strike',
          description: 'Melee attack: +2 to hit, 4 (1d6 + 1) damage.',
        },
      ],
    },
  ],
  '5': [
    {
      type: 'balanced',
      armor_class: 16,
      hit_points: 120,
      to_hit_bonus: 7,
      saving_throws: '+5, +4',
      actions: [
        {
          name: 'Multiattack',
          description: 'The creature makes three attacks.',
        },
        {
          name: 'Action 1',
          description: 'Melee attack: +7 to hit, 15 (2d10 + 4) damage.',
        },
        {
          name: 'Action 2',
          description: 'Ranged attack: +7 to hit, 12 (2d8 + 3) damage.',
        },
      ],
      legendary_actions: [
        {
          name: 'Legendary Move',
          description: 'The creature moves up to its speed.',
        },
      ],
    },
  ],
}));

jest.mock('../../data/challengeRatings.json', () => ({
  '1': {
    proficiency_bonus: 2,
    attack_bonus: 3,
  },
  '5': {
    proficiency_bonus: 3,
    attack_bonus: 7,
  },
}));

describe('createStatblockPrompts', () => {
  it('should create prompts for basic monster', () => {
    const options = {
      monsterName: 'Goblin Warrior',
      challengeRating: '1',
      monsterType: 'Balanced',
      monsterDescription: '',
      caster: false,
    };

    const prompts = createStatblockPrompts(options);

    expect(prompts).toHaveProperty('part1');
    expect(prompts).toHaveProperty('part2');
    expect(prompts.part1).toContain('Goblin Warrior');
    expect(prompts.part1).toContain('challenge_rating 1');
    expect(prompts.part1).toContain('proficiency_bonus of +2');
    expect(prompts.part2).toContain('Goblin Warrior');
  });

  it('should include armor class and hit points from template', () => {
    const options = {
      monsterName: 'Stone Golem',
      challengeRating: '1',
      monsterType: 'Balanced',
      monsterDescription: '',
      caster: false,
    };

    const prompts = createStatblockPrompts(options);

    expect(prompts.part1).toContain('armor_class should be 13');
    expect(prompts.part1).toContain('hit_points should be 30');
  });

  it('should handle offensive monster type', () => {
    const options = {
      monsterName: 'Berserker',
      challengeRating: '1',
      monsterType: 'Stronger Offense',
      monsterDescription: '',
      caster: false,
    };

    const prompts = createStatblockPrompts(options);

    expect(prompts.part1).toBeDefined();
    expect(prompts.part2).toBeDefined();
    // Should select offensive template which has different stats
  });

  it('should handle defensive monster type', () => {
    const options = {
      monsterName: 'Iron Defender',
      challengeRating: '1',
      monsterType: 'Stronger Defense',
      monsterDescription: '',
      caster: false,
    };

    const prompts = createStatblockPrompts(options);

    expect(prompts.part1).toBeDefined();
    expect(prompts.part2).toBeDefined();
  });

  it('should handle random monster type', () => {
    const options = {
      monsterName: 'Wild Beast',
      challengeRating: '1',
      monsterType: 'Random',
      monsterDescription: '',
      caster: false,
    };

    const prompts = createStatblockPrompts(options);

    expect(prompts.part1).toBeDefined();
    expect(prompts.part2).toBeDefined();
  });

  it('should include spellcasting ability for casters', () => {
    const options = {
      monsterName: 'Wizard Apprentice',
      challengeRating: '1',
      monsterType: 'Balanced',
      monsterDescription: '',
      caster: true,
    };

    const prompts = createStatblockPrompts(options);

    expect(prompts.part1).toContain('spellcaster');
    expect(prompts.part1).toContain('Spellcasting');
    expect(prompts.part1).toContain('thematically appropriate spells');
  });

  it('should include legendary resistances for legendary creatures', () => {
    const options = {
      monsterName: 'Ancient Dragon',
      challengeRating: '5',
      monsterType: 'Balanced',
      monsterDescription: '',
      caster: false,
    };

    const prompts = createStatblockPrompts(options);

    expect(prompts.part1).toContain('Legendary Resistance');
    expect(prompts.part1).toContain('legendary resistances');
  });

  it('should include saving throws based on template', () => {
    const options = {
      monsterName: 'Tough Brute',
      challengeRating: '1',
      monsterType: 'Balanced',
      monsterDescription: '',
      caster: false,
    };

    const prompts = createStatblockPrompts(options);

    expect(prompts.part1).toContain('saving throws of +2, +1');
  });

  it('should include to-hit bonus in part 2', () => {
    const options = {
      monsterName: 'Archer',
      challengeRating: '1',
      monsterType: 'Balanced',
      monsterDescription: '',
      caster: false,
    };

    const prompts = createStatblockPrompts(options);

    expect(prompts.part2).toContain('attack_bonus for each attack should be 3');
  });

  it('should include multiattack reminder when present', () => {
    const options = {
      monsterName: 'Pack Hunter',
      challengeRating: '1',
      monsterType: 'Balanced',
      monsterDescription: '',
      caster: false,
    };

    const prompts = createStatblockPrompts(options);

    expect(prompts.part2).toContain('Multiattack action to the very beginning');
  });

  it('should include user description in part 1', () => {
    const options = {
      monsterName: 'Fire Drake',
      challengeRating: '1',
      monsterType: 'Balanced',
      monsterDescription: 'This creature breathes fire and is immune to heat.',
      caster: false,
    };

    const prompts = createStatblockPrompts(options);

    expect(prompts.part1).toContain('This creature breathes fire and is immune to heat.');
  });

  it('should include user description in part 2', () => {
    const options = {
      monsterName: 'Frost Giant',
      challengeRating: '1',
      monsterType: 'Balanced',
      monsterDescription: 'Frost damage on attacks.',
      caster: false,
    };

    const prompts = createStatblockPrompts(options);

    expect(prompts.part2).toContain('Frost damage on attacks.');
  });

  it('should mention damage type restrictions', () => {
    const options = {
      monsterName: 'Elemental',
      challengeRating: '1',
      monsterType: 'Balanced',
      monsterDescription: '',
      caster: false,
    };

    const prompts = createStatblockPrompts(options);

    expect(prompts.part1).toContain('Acid, Bludgeoning, Cold, Fire, Force');
    expect(prompts.part1).toContain('Lightning, Necrotic, Piercing, Poison');
  });

  it('should mention condition immunity restrictions', () => {
    const options = {
      monsterName: 'Construct',
      challengeRating: '1',
      monsterType: 'Balanced',
      monsterDescription: '',
      caster: false,
    };

    const prompts = createStatblockPrompts(options);

    expect(prompts.part1).toContain('Blinded, Charmed, Deafened, Frightened');
    expect(prompts.part1).toContain('Grappled, Incapacitated, Paralyzed');
  });

  it('should instruct to keep exact damage values', () => {
    const options = {
      monsterName: 'Warrior',
      challengeRating: '1',
      monsterType: 'Balanced',
      monsterDescription: '',
      caster: false,
    };

    const prompts = createStatblockPrompts(options);

    expect(prompts.part2).toContain('exact avg_damage');
    expect(prompts.part2).toContain('exact (number_of_dice/type_of_dice + modifier)');
  });

  it('should warn not to add more actions than examples', () => {
    const options = {
      monsterName: 'Fighter',
      challengeRating: '1',
      monsterType: 'Balanced',
      monsterDescription: '',
      caster: false,
    };

    const prompts = createStatblockPrompts(options);

    expect(prompts.part2).toContain('Do not add more actions than there are examples');
  });

  it('should handle higher CR creatures with more actions', () => {
    const options = {
      monsterName: 'Powerful Dragon',
      challengeRating: '5',
      monsterType: 'Balanced',
      monsterDescription: '',
      caster: false,
    };

    const prompts = createStatblockPrompts(options);

    expect(prompts.part1).toContain('challenge_rating 5');
    expect(prompts.part1).toContain('proficiency_bonus of +3');
    expect(prompts.part2).toContain('attack_bonus for each attack should be 7');
  });

  it('should generate resistance and immunity prompts based on CR', () => {
    const lowCR = createStatblockPrompts({
      monsterName: 'Weak Monster',
      challengeRating: '1',
      monsterType: 'Balanced',
      monsterDescription: '',
      caster: false,
    });

    const highCR = createStatblockPrompts({
      monsterName: 'Strong Monster',
      challengeRating: '5',
      monsterType: 'Balanced',
      monsterDescription: '',
      caster: false,
    });

    // Both should have resistance/immunity info
    expect(lowCR.part1).toContain('resistances');
    expect(highCR.part1).toContain('resistances');
  });

  it('should not include legendary actions for non-legendary creatures', () => {
    const options = {
      monsterName: 'Common Goblin',
      challengeRating: '1',
      monsterType: 'Balanced',
      monsterDescription: '',
      caster: false,
    };

    const prompts = createStatblockPrompts(options);

    // The template doesn't have legendary actions, so part2 shouldn't mention them
    expect(prompts.part2).not.toContain('legendary_actions');
  });

  it('should handle empty monster description', () => {
    const options = {
      monsterName: 'Basic Creature',
      challengeRating: '1',
      monsterType: 'Balanced',
      monsterDescription: '',
      caster: false,
    };

    const prompts = createStatblockPrompts(options);

    expect(prompts.part1).toBeDefined();
    expect(prompts.part2).toBeDefined();
    // Should not contain placeholder text for description
  });

  it('should create valid JSON example in part 1', () => {
    const options = {
      monsterName: 'Test Monster',
      challengeRating: '1',
      monsterType: 'Balanced',
      monsterDescription: '',
      caster: false,
    };

    const prompts = createStatblockPrompts(options);

    // Should contain JSON-like structure
    expect(prompts.part1).toContain('"name":');
    expect(prompts.part1).toContain('"armor_class":');
    expect(prompts.part1).toContain('"hit_points":');
  });

  it('should instruct about passive abilities vs actions', () => {
    const options = {
      monsterName: 'Guardian',
      challengeRating: '1',
      monsterType: 'Balanced',
      monsterDescription: '',
      caster: false,
    };

    const prompts = createStatblockPrompts(options);

    expect(prompts.part1).toContain('Abilities should be passive and not require an action');
    expect(prompts.part2).toContain('Actions should not repeat any content from the previously generated abilities');
  });
});
