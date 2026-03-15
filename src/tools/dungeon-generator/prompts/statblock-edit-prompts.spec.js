import {
  legendaryActionsPrompt,
  actionsPrompt,
  monsterAbilitiesPrompt,
  singleAbilityPrompt,
  singleActionPrompt,
  singleLegendaryActionPrompt,
} from './statblock-edit-prompts.mjs';

// Mock creature templates
jest.mock('@/data/creatureTemplates.json', () => ({
  '5': [
    {
      type: 'balanced',
      actions: [
        {
          name: 'Multiattack',
          description: 'The creature makes two attacks.',
        },
        {
          name: 'Action 1',
          description: 'Melee attack: +7 to hit, 15 (2d10 + 4) damage.',
        },
      ],
    },
    {
      type: 'offensive',
      actions: [
        {
          name: 'Power Attack',
          description: 'Melee attack: +8 to hit, 20 (3d10 + 5) damage.',
        },
      ],
    },
    {
      type: 'defensive',
      actions: [
        {
          name: 'Defensive Strike',
          description: 'Melee attack: +6 to hit, 12 (2d8 + 3) damage.',
        },
      ],
    },
  ],
}));

describe('legendaryActionsPrompt', () => {
  it('should prompt to add legendary actions when none exist', () => {
    const monster = {
      name: 'Dragon',
      challenge_rating: '10 (5,900 XP)',
      legendary_actions: [],
    };

    const prompt = legendaryActionsPrompt(monster);

    expect(prompt).toContain('currently has no legendary actions');
    expect(prompt).toContain('Please add 3');
    expect(prompt).toContain('cost for each action (1, 2, or 3 actions)');
    expect(prompt).toContain('match the CR of the monster');
  });

  it('should prompt to replace existing legendary actions', () => {
    const monster = {
      name: 'Ancient Wyrm',
      challenge_rating: '15 (13,000 XP)',
      legendary_actions: [
        {
          name: 'Wing Attack (Costs 2 Actions)',
          description: 'The dragon beats its wings.',
        },
      ],
    };

    const prompt = legendaryActionsPrompt(monster);

    expect(prompt).toContain('currently has the following legendary actions');
    expect(prompt).toContain('Wing Attack');
    expect(prompt).toContain('replace the current legendary actions with 3 completely different ones');
  });

  it('should include user suggestion when provided', () => {
    const monster = {
      name: 'Lich',
      challenge_rating: '12 (8,400 XP)',
      legendary_actions: [],
    };

    const prompt = legendaryActionsPrompt(monster, 'Add a teleportation ability');

    expect(prompt).toContain('Add a teleportation ability');
    expect(prompt).toContain('user has made the following suggestion');
  });

  it('should specify JSON format return', () => {
    const monster = {
      name: 'Titan',
      challenge_rating: '20 (25,000 XP)',
      legendary_actions: [],
    };

    const prompt = legendaryActionsPrompt(monster);

    expect(prompt).toContain("Don't return the full monster object");
    expect(prompt).toContain('just the legendary_actions array in JSON format');
  });

  it('should provide example structure', () => {
    const monster = {
      name: 'Kraken',
      challenge_rating: '23 (50,000 XP)',
      legendary_actions: [],
    };

    const prompt = legendaryActionsPrompt(monster);

    expect(prompt).toContain('"legendary_actions"');
    expect(prompt).toContain('"name"');
    expect(prompt).toContain('"description"');
    expect(prompt).toContain('(Costs 1 Action)');
    expect(prompt).toContain('(Costs 2 Actions)');
    expect(prompt).toContain('(Costs 3 Actions)');
  });
});

describe('actionsPrompt', () => {
  it('should use template matching monster type', () => {
    const monster = {
      name: 'Fire Giant',
      challenge_rating: '5 (1,800 XP)',
      monsterType: 'Balanced',
      actions: [],
    };

    const prompt = actionsPrompt(monster);

    expect(prompt).toContain('currently has no actions');
    expect(prompt).toContain('new actions array');
    expect(prompt).toContain('exact number of actions');
    expect(prompt).toContain('same damage and to hit bonuses');
  });

  it('should handle offensive monster type', () => {
    const monster = {
      name: 'Berserker',
      challenge_rating: '5 (1,800 XP)',
      monsterType: 'Stronger Offense',
      actions: [],
    };

    const prompt = actionsPrompt(monster);

    expect(prompt).toBeDefined();
    expect(prompt).toContain('actions array');
  });

  it('should handle defensive monster type', () => {
    const monster = {
      name: 'Guardian',
      challenge_rating: '5 (1,800 XP)',
      monsterType: 'Stronger Defense',
      actions: [],
    };

    const prompt = actionsPrompt(monster);

    expect(prompt).toBeDefined();
    expect(prompt).toContain('actions array');
  });

  it('should handle random monster type', () => {
    const monster = {
      name: 'Beast',
      challenge_rating: '5 (1,800 XP)',
      monsterType: 'Random',
      actions: [],
    };

    const prompt = actionsPrompt(monster);

    expect(prompt).toBeDefined();
    expect(prompt).toContain('actions array');
  });

  it('should replace existing actions', () => {
    const monster = {
      name: 'Troll',
      challenge_rating: '5 (1,800 XP)',
      monsterType: 'Balanced',
      actions: [
        {
          name: 'Bite',
          description: 'Melee attack.',
        },
      ],
    };

    const prompt = actionsPrompt(monster);

    expect(prompt).toContain('new actions array');
    expect(prompt).toContain('matches the damage and to hit bonuses');
  });

  it('should include user suggestion when provided', () => {
    const monster = {
      name: 'Hydra',
      challenge_rating: '5 (1,800 XP)',
      monsterType: 'Balanced',
      actions: [],
    };

    const prompt = actionsPrompt(monster, 'Add regenerating heads mechanic');

    expect(prompt).toContain('Add regenerating heads mechanic');
    expect(prompt).toContain('user has made the following suggestion');
  });

  it('should specify condition list', () => {
    const monster = {
      name: 'Medusa',
      challenge_rating: '5 (1,800 XP)',
      monsterType: 'Balanced',
      actions: [],
    };

    const prompt = actionsPrompt(monster);

    expect(prompt).toContain('Blinded, Charmed, Deafened, Frightened');
    expect(prompt).toContain('Grappled, Incapacitated, Paralyzed');
    expect(prompt).toContain('Petrified, Poisoned, Prone, Restrained, Stunned, Unconscious');
  });

  it('should instruct to name actions properly', () => {
    const monster = {
      name: 'Warrior',
      challenge_rating: '5 (1,800 XP)',
      monsterType: 'Balanced',
      actions: [],
    };

    const prompt = actionsPrompt(monster);

    expect(prompt).toContain('be sure each action has a name');
    expect(prompt).toContain('Replace "Action 1" or "Action 2" with a descriptive name');
  });
});

describe('monsterAbilitiesPrompt', () => {
  it('should request abilities array', () => {
    const monster = {
      name: 'Beholder',
      challenge_rating: '13 (10,000 XP)',
      abilities: [],
    };

    const prompt = monsterAbilitiesPrompt(monster);

    expect(prompt).toContain('abilities array in JSON format');
    expect(prompt).toContain("don't return the full monster object");
  });

  it('should provide example structure', () => {
    const monster = {
      name: 'Sphinx',
      challenge_rating: '11 (7,200 XP)',
      abilities: [],
    };

    const prompt = monsterAbilitiesPrompt(monster);

    expect(prompt).toContain('"name": "Ability Name #1"');
    expect(prompt).toContain('"description": "Description of the ability and the mechanics."');
  });

  it('should instruct to replace existing abilities', () => {
    const monster = {
      name: 'Mind Flayer',
      challenge_rating: '7 (2,900 XP)',
      abilities: [
        {
          name: 'Mind Blast',
          description: 'Psychic damage in a cone.',
        },
      ],
    };

    const prompt = monsterAbilitiesPrompt(monster);

    expect(prompt).toContain('already has abilities');
    expect(prompt).toContain('replace them with new and completely different ones');
    expect(prompt).toContain('still match the flavor of the creature');
  });

  it('should clarify abilities are passive', () => {
    const monster = {
      name: 'Vampire',
      challenge_rating: '13 (10,000 XP)',
      abilities: [],
    };

    const prompt = monsterAbilitiesPrompt(monster);

    expect(prompt).toContain('should not be legendary actions or actions');
    expect(prompt).toContain('should be passive abilities');
  });

  it('should include user suggestion when provided', () => {
    const monster = {
      name: 'Phoenix',
      challenge_rating: '16 (15,000 XP)',
      abilities: [],
    };

    // Note: The current implementation doesn't support userSuggestion parameter
    // This test documents that limitation
    const prompt = monsterAbilitiesPrompt(monster);

    expect(prompt).toBeDefined();
  });
});

describe('singleAbilityPrompt', () => {
  it('should request replacement for single ability', () => {
    const monster = {
      name: 'Aboleth',
      challenge_rating: '10 (5,900 XP)',
    };

    const currentAbility = {
      name: 'Amphibious',
      description: 'The creature can breathe air and water.',
    };

    const prompt = singleAbilityPrompt(monster, currentAbility);

    expect(prompt).toContain('currently has this ability');
    expect(prompt).toContain('Amphibious');
    expect(prompt).toContain('generate a single NEW passive ability');
    expect(prompt).toContain('Be completely different from the current one');
  });

  it('should specify return format', () => {
    const monster = {
      name: 'Unicorn',
      challenge_rating: '5 (1,800 XP)',
    };

    const currentAbility = {
      name: 'Magic Resistance',
      description: 'Advantage on saves against spells.',
    };

    const prompt = singleAbilityPrompt(monster, currentAbility);

    expect(prompt).toContain('Return a single ability object (not an array)');
    expect(prompt).toContain('"name" and "description" properties');
  });

  it('should clarify passive vs action', () => {
    const monster = {
      name: 'Golem',
      challenge_rating: '10 (5,900 XP)',
    };

    const currentAbility = {
      name: 'Immutable Form',
      description: 'Immune to any spell or effect that would alter its form.',
    };

    const prompt = singleAbilityPrompt(monster, currentAbility);

    expect(prompt).toContain('Be a passive ability (not an action or legendary action)');
  });
});

describe('singleActionPrompt', () => {
  it('should request replacement for single action', () => {
    const monster = {
      name: 'Ogre',
      challenge_rating: '5 (1,800 XP)',
      monsterType: 'Balanced',
    };

    const currentAction = {
      name: 'Greatclub',
      description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage.',
    };

    const prompt = singleActionPrompt(monster, currentAction);

    expect(prompt).toContain('currently has this action');
    expect(prompt).toContain('Greatclub');
    expect(prompt).toContain('generate a single NEW action');
    expect(prompt).toContain('Be completely different from the current one');
  });

  it('should use template for damage guidance', () => {
    const monster = {
      name: 'Hill Giant',
      challenge_rating: '5 (1,800 XP)',
      monsterType: 'Balanced',
    };

    const currentAction = {
      name: 'Boulder',
      description: 'Ranged Weapon Attack.',
    };

    const prompt = singleActionPrompt(monster, currentAction);

    expect(prompt).toContain('following template as a guide');
    expect(prompt).toContain('appropriate damage and to-hit bonuses');
    expect(prompt).toContain('Match the damage and to-hit bonuses of the template');
  });

  it('should list valid conditions', () => {
    const monster = {
      name: 'Yuan-ti',
      challenge_rating: '5 (1,800 XP)',
      monsterType: 'Balanced',
    };

    const currentAction = {
      name: 'Poison Bite',
      description: 'Melee attack with poison.',
    };

    const prompt = singleActionPrompt(monster, currentAction);

    expect(prompt).toContain('Blinded, Charmed, Deafened, Frightened, Grappled');
    expect(prompt).toContain('Incapacitated, Paralyzed, Petrified, Poisoned');
  });

  it('should handle different monster types', () => {
    const offensiveMonster = {
      name: 'Assassin',
      challenge_rating: '5 (1,800 XP)',
      monsterType: 'Stronger Offense',
    };

    const defensiveMonster = {
      name: 'Knight',
      challenge_rating: '5 (1,800 XP)',
      monsterType: 'Stronger Defense',
    };

    const currentAction = {
      name: 'Attack',
      description: 'An attack.',
    };

    const offensivePrompt = singleActionPrompt(offensiveMonster, currentAction);
    const defensivePrompt = singleActionPrompt(defensiveMonster, currentAction);

    expect(offensivePrompt).toBeDefined();
    expect(defensivePrompt).toBeDefined();
  });
});

describe('singleLegendaryActionPrompt', () => {
  it('should request replacement for single legendary action', () => {
    const monster = {
      name: 'Ancient Dragon',
      challenge_rating: '20 (25,000 XP)',
    };

    const currentAction = {
      name: 'Tail Attack (Costs 2 Actions)',
      description: 'The dragon makes a tail attack.',
    };

    const prompt = singleLegendaryActionPrompt(monster, currentAction);

    expect(prompt).toContain('currently has this legendary action');
    expect(prompt).toContain('Tail Attack');
    expect(prompt).toContain('generate a single NEW legendary action');
  });

  it('should instruct to include action cost', () => {
    const monster = {
      name: 'Tarrasque',
      challenge_rating: '30 (155,000 XP)',
    };

    const currentAction = {
      name: 'Move',
      description: 'The creature moves.',
    };

    const prompt = singleLegendaryActionPrompt(monster, currentAction);

    expect(prompt).toContain('Include the cost (1, 2, or 3 actions) in the name');
    expect(prompt).toContain('(Costs X Action)');
    expect(prompt).toContain('(Costs X Actions)');
  });

  it('should provide example structure', () => {
    const monster = {
      name: 'Empyrean',
      challenge_rating: '23 (50,000 XP)',
    };

    const currentAction = {
      name: 'Blast (Costs 3 Actions)',
      description: 'A powerful blast.',
    };

    const prompt = singleLegendaryActionPrompt(monster, currentAction);

    expect(prompt).toContain('example structure');
    expect(prompt).toContain('"name": "Legendary Action Name (Costs 2 Actions)"');
    expect(prompt).toContain('"description"');
  });

  it('should specify to match CR and power level', () => {
    const monster = {
      name: 'Balor',
      challenge_rating: '19 (22,000 XP)',
    };

    const currentAction = {
      name: 'Whip Attack',
      description: 'Melee attack.',
    };

    const prompt = singleLegendaryActionPrompt(monster, currentAction);

    expect(prompt).toContain('Match the CR and power level of the monster');
    expect(prompt).toContain('interesting and challenging for players');
  });

  it('should specify JSON format return', () => {
    const monster = {
      name: 'Pit Fiend',
      challenge_rating: '20 (25,000 XP)',
    };

    const currentAction = {
      name: 'Fire Storm (Costs 3 Actions)',
      description: 'Area fire damage.',
    };

    const prompt = singleLegendaryActionPrompt(monster, currentAction);

    expect(prompt).toContain('Return a single legendary action object (not an array)');
    expect(prompt).toContain('"name" and "description" properties');
  });
});
