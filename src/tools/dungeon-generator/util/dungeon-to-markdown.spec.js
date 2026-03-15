import { dungeonToMarkdown } from './dungeon-to-markdown.mjs';

// Mock statblock-to-markdown since it's imported
jest.mock('./statblock-to-markdown.mjs', () => ({
  statblockToMarkdown: jest.fn((statblock) => `MOCK_STATBLOCK:${statblock.name}`),
}));

describe('dungeonToMarkdown', () => {
  const basicDungeon = {
    dungeonOverview: {
      name: 'The Forgotten Temple',
      overview: 'An ancient temple lost to time.',
      relation_to_larger_setting: 'It sits on the edge of the kingdom.',
      finding_the_dungeon: 'Follow the old road through the forest.',
      history: 'Built centuries ago by a forgotten civilization.',
      dominant_power: 'A lich named Malakar rules here.',
      dominant_power_goals: 'He seeks immortality and knowledge.',
      dominant_power_minions: 'Undead servants patrol the halls.',
      dominant_power_event: 'Recently, adventurers disturbed his rest.',
      recent_event_consequences: 'The lich has increased patrols.',
      secondary_power: 'A group of bandits hiding in the lower levels.',
      secondary_power_event: 'They found a secret cache of gold.',
      main_problem: 'The lich threatens nearby villages.',
      potential_solutions: 'Destroy the phylactery or seal the temple.',
      conclusion: 'The fate of the region hangs in the balance.',
      difficulty_level: 'Tier 2: Expert',
    },
    npcs: [],
    rooms: [],
    monsters: [],
  };

  it('should convert basic dungeon overview to markdown', () => {
    const result = dungeonToMarkdown(basicDungeon);

    expect(result).toContain('# THE FORGOTTEN TEMPLE');
    expect(result).toContain('An ancient temple lost to time.');
    expect(result).toContain('It sits on the edge of the kingdom.');
    expect(result).toContain('Follow the old road through the forest.');
    expect(result).toContain('Built centuries ago by a forgotten civilization.');
    expect(result).toContain('**Difficulty Level:** Tier 2: Expert');
  });

  it('should handle dungeon with NPCs (short description)', () => {
    const dungeonWithNPC = {
      ...basicDungeon,
      npcs: [
        {
          name: 'Brother Marcus',
          short_description: 'A wise old monk who guards the entrance.',
        },
      ],
    };

    const result = dungeonToMarkdown(dungeonWithNPC);

    expect(result).toContain('## NPCs');
    expect(result).toContain('### BROTHER MARCUS');
    expect(result).toContain('A wise old monk who guards the entrance.');
  });

  it('should handle dungeon with NPCs (full description)', () => {
    const dungeonWithDetailedNPC = {
      ...basicDungeon,
      npcs: [
        {
          name: 'Sister Elara',
          read_aloud_description:
            'A hooded figure stands before you, eyes glowing faintly.',
          description_of_position: 'She is the keeper of the inner sanctum.',
          why_in_dungeon: 'Seeking to cleanse the temple of evil.',
          distinctive_features_or_mannerisms:
            'Speaks in hushed, reverent tones.',
          character_secret: 'She is actually a half-elf, not human.',
          relationships: {
            'Brother Marcus': 'Her mentor and father figure.',
            Malakar: 'Her sworn enemy.',
          },
          roleplaying_tips: 'Be mysterious and wise.',
        },
      ],
    };

    const result = dungeonToMarkdown(dungeonWithDetailedNPC);

    expect(result).toContain('### SISTER ELARA');
    expect(result).toContain('{{descriptive');
    expect(result).toContain(
      'A hooded figure stands before you, eyes glowing faintly.',
    );
    expect(result).toContain('She is the keeper of the inner sanctum.');
    expect(result).toContain('#### Relationships');
    expect(result).toContain('**Brother Marcus:** Her mentor and father figure.');
    expect(result).toContain('#### Roleplaying Tips');
    expect(result).toContain('Be mysterious and wise.');
  });

  it('should handle NPC with statblock', () => {
    const dungeonWithNPCStatblock = {
      ...basicDungeon,
      npcs: [
        {
          name: 'Captain Gareth',
          short_description: 'A veteran warrior.',
          statblock: {
            name: 'Captain Gareth',
            type_and_alignment: 'Medium humanoid (human), lawful good',
            armor_class: '18 (plate armor)',
            hit_points: '58 (9d8 + 18)',
            speed: '30 ft.',
          },
        },
      ],
    };

    const result = dungeonToMarkdown(dungeonWithNPCStatblock);

    expect(result).toContain('#### Captain Gareth Statblock');
    expect(result).toContain('MOCK_STATBLOCK:Captain Gareth');
  });

  it('should handle dungeon with rooms', () => {
    const dungeonWithRooms = {
      ...basicDungeon,
      rooms: [
        {
          id: 1,
          name: 'The Entrance Hall',
          contentArray: [
            {
              format: 'read_aloud',
              content: 'Dust swirls in the dim light filtering through cracks.',
            },
            {
              format: 'header',
              content: 'Notable Features',
            },
            {
              format: 'paragraph',
              content: 'The walls are covered in ancient frescoes.',
            },
          ],
        },
        {
          id: 2,
          name: 'The Altar Room',
          contentArray: [
            {
              format: 'paragraph',
              content: 'A stone altar dominates the center of the room.',
            },
          ],
        },
      ],
    };

    const result = dungeonToMarkdown(dungeonWithRooms);

    expect(result).toContain('## Rooms');
    expect(result).toContain('### Room 1: The Entrance Hall');
    expect(result).toContain('{{descriptive');
    expect(result).toContain(
      'Dust swirls in the dim light filtering through cracks.',
    );
    expect(result).toContain('#### Notable Features');
    expect(result).toContain('The walls are covered in ancient frescoes.');
    expect(result).toContain('### Room 2: The Altar Room');
  });

  it('should handle dungeon with monsters (simple description)', () => {
    const dungeonWithMonsters = {
      ...basicDungeon,
      monsters: [
        {
          name: 'Shadow Beast',
          description: 'A creature of pure darkness and malice.',
        },
      ],
    };

    const result = dungeonToMarkdown(dungeonWithMonsters);

    expect(result).toContain('## Monsters');
    expect(result).toContain('### Shadow Beast');
    expect(result).toContain('A creature of pure darkness and malice.');
  });

  it('should handle dungeon with monsters (detailed description)', () => {
    const dungeonWithDetailedMonster = {
      ...basicDungeon,
      monsters: [
        {
          name: 'Crystal Golem',
          detailedDescription: {
            name: 'Crystal Golem',
            intro: 'A towering construct of enchanted crystal.',
            appearance:
              'Its body refracts light into a thousand shimmering colors.',
            behaviorAbilities: 'It moves with surprising grace.',
            lore: 'Created by ancient mages to guard their secrets.',
          },
        },
      ],
    };

    const result = dungeonToMarkdown(dungeonWithDetailedMonster);

    expect(result).toContain('### Crystal Golem');
    expect(result).toContain('A towering construct of enchanted crystal.');
    expect(result).toContain(
      'Its body refracts light into a thousand shimmering colors.',
    );
    expect(result).toContain('It moves with surprising grace.');
    expect(result).toContain(
      'Created by ancient mages to guard their secrets.',
    );
  });

  it('should handle monster with statblock', () => {
    const dungeonWithMonsterStatblock = {
      ...basicDungeon,
      monsters: [
        {
          name: 'Fire Elemental',
          description: 'A being of living flame.',
          statblock: {
            name: 'Fire Elemental',
            type_and_alignment: 'Large elemental, neutral',
            armor_class: '13',
            hit_points: '102 (12d10 + 36)',
            speed: '50 ft.',
          },
        },
      ],
    };

    const result = dungeonToMarkdown(dungeonWithMonsterStatblock);

    expect(result).toContain('MOCK_STATBLOCK:Fire Elemental');
  });

  it('should handle empty NPCs array', () => {
    const dungeonNoNPCs = {
      ...basicDungeon,
      npcs: [],
    };

    const result = dungeonToMarkdown(dungeonNoNPCs);

    expect(result).not.toContain('## NPCs');
  });

  it('should handle missing optional fields', () => {
    const minimalDungeon = {
      dungeonOverview: {
        name: 'Minimal Dungeon',
        overview: 'A simple place.',
        relation_to_larger_setting: '',
        finding_the_dungeon: '',
        history: '',
        dominant_power: '',
        dominant_power_goals: '',
        dominant_power_minions: '',
        dominant_power_event: '',
        recent_event_consequences: '',
        secondary_power: '',
        secondary_power_event: '',
        main_problem: '',
        potential_solutions: '',
        conclusion: '',
        difficulty_level: 'Tier 1',
      },
      npcs: [],
      rooms: [],
      monsters: [],
    };

    const result = dungeonToMarkdown(minimalDungeon);

    expect(result).toContain('# MINIMAL DUNGEON');
    expect(result).toContain('A simple place.');
    expect(result).toContain('**Difficulty Level:** Tier 1');
  });

  it('should handle complete dungeon with all elements', () => {
    const completeDungeon = {
      ...basicDungeon,
      npcs: [
        {
          name: 'Guard Captain',
          short_description: 'A stern warrior.',
        },
      ],
      rooms: [
        {
          id: 1,
          name: 'Entry',
          contentArray: [
            {
              format: 'paragraph',
              content: 'You enter a dimly lit chamber.',
            },
          ],
        },
      ],
      monsters: [
        {
          name: 'Goblin',
          description: 'A small, nasty creature.',
        },
      ],
    };

    const result = dungeonToMarkdown(completeDungeon);

    expect(result).toContain('# THE FORGOTTEN TEMPLE');
    expect(result).toContain('## NPCs');
    expect(result).toContain('### GUARD CAPTAIN');
    expect(result).toContain('## Rooms');
    expect(result).toContain('### Room 1: Entry');
    expect(result).toContain('## Monsters');
    expect(result).toContain('### Goblin');
  });
});
