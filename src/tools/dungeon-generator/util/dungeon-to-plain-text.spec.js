import { dungeonToPlainText } from './dungeon-to-plain-text.mjs';

describe('dungeonToPlainText', () => {
  const basicDungeon = {
    dungeonOverview: {
      name: 'The Lost Mines',
      overview: 'Abandoned mines filled with danger.',
      relation_to_larger_setting: 'Once provided ore to the kingdom.',
      finding_the_dungeon: 'Follow the mountain trail.',
      history: 'Closed after a cave-in 50 years ago.',
      dominant_power: 'A black dragon has claimed it.',
      dominant_power_goals: 'Hoarding treasure and terrorizing locals.',
      dominant_power_minions: 'Kobolds worship the dragon.',
      dominant_power_event: 'Recently raided a nearby village.',
      recent_event_consequences: 'Villagers seek heroes.',
      secondary_power: 'A band of dwarven miners.',
      secondary_power_event: 'They want to reclaim their ancestral home.',
      main_problem: 'The dragon must be defeated.',
      potential_solutions: 'Negotiate or fight.',
      conclusion: 'The mines hold secrets.',
      difficulty_level: 'Tier 2: Expert',
    },
    npcs: [],
    rooms: [],
    monsters: [],
  };

  it('should convert basic dungeon overview to plain text', () => {
    const result = dungeonToPlainText(basicDungeon);

    // Check for the boxed title
    expect(result).toContain('THE LOST MINES');
    expect(result).toContain('|  THE LOST MINES  |');
    expect(result).toContain('Abandoned mines filled with danger.');
    expect(result).toContain('Once provided ore to the kingdom.');
    expect(result).toContain('Follow the mountain trail.');
    expect(result).toContain('Difficulty Level: Tier 2: Expert');
  });

  it('should create proper section dividers', () => {
    const result = dungeonToPlainText(basicDungeon);

    // The title should have dashes
    expect(result).toMatch(/---+/);
    expect(result).toMatch(/\|  THE LOST MINES  \|/);
  });

  it('should handle dungeon with NPCs (short description)', () => {
    const dungeonWithNPC = {
      ...basicDungeon,
      npcs: [
        {
          name: 'Grimli Ironforge',
          short_description: 'A gruff dwarven warrior.',
        },
      ],
    };

    const result = dungeonToPlainText(dungeonWithNPC);

    expect(result).toContain('NPCs');
    expect(result).toContain('GRIMLI IRONFORGE');
    expect(result).toContain('A gruff dwarven warrior.');
  });

  it('should handle dungeon with NPCs (full description)', () => {
    const dungeonWithDetailedNPC = {
      ...basicDungeon,
      npcs: [
        {
          name: 'Thora Stoneheart',
          read_aloud_description: 'A dwarf with braided beard and gleaming armor.',
          description_of_position: 'Leader of the reclamation party.',
          why_in_dungeon: 'To restore her family honor.',
          distinctive_features_or_mannerisms: 'Never backs down from a challenge.',
          character_secret: 'Her grandfather caused the original cave-in.',
          relationships: {
            'Grimli Ironforge': 'Her loyal lieutenant.',
            'Black Dragon': 'Killed her father.',
          },
          roleplaying_tips: 'Speak with pride and determination.',
        },
      ],
    };

    const result = dungeonToPlainText(dungeonWithDetailedNPC);

    expect(result).toContain('THORA STONEHEART');
    expect(result).toContain('A dwarf with braided beard and gleaming armor.');
    expect(result).toContain('Leader of the reclamation party.');
    expect(result).toContain('Relationships');
    expect(result).toContain('Grimli Ironforge: Her loyal lieutenant.');
    expect(result).toContain('Roleplaying Tips');
    expect(result).toContain('Speak with pride and determination.');
  });

  it('should handle NPC with statblock', () => {
    const dungeonWithNPCStatblock = {
      ...basicDungeon,
      npcs: [
        {
          name: 'Durin Steelfist',
          short_description: 'A veteran miner turned fighter.',
          statblock: {
            name: 'Durin Steelfist',
            type_and_alignment: 'Medium humanoid (dwarf), lawful good',
            armor_class: '17 (chain mail)',
            hit_points: '52 (8d8 + 16)',
            speed: '25 ft.',
            attributes: 'STR 16 (+3), DEX 12 (+1), CON 14 (+2), INT 10 (+0), WIS 12 (+1), CHA 10 (+0)',
            saving_throws: 'STR +5, CON +4',
            skills: 'Athletics +5, Survival +3',
            damage_resistances: 'poison',
            damage_immunities: '',
            condition_immunities: 'None',
            senses: 'darkvision 60 ft., passive Perception 11',
            languages: 'Common, Dwarvish',
            challenge_rating: '3 (700 XP)',
            abilities: [
              {
                name: 'Dwarven Resilience',
                description: 'Advantage on saves against poison.',
              },
            ],
            actions: [
              {
                name: 'Warhammer',
                description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) bludgeoning damage.',
              },
            ],
            legendary_actions: [],
          },
        },
      ],
    };

    const result = dungeonToPlainText(dungeonWithNPCStatblock);

    expect(result).toContain('Name: Durin Steelfist');
    expect(result).toContain('Armor Class: 17 (chain mail)');
    expect(result).toContain('Attributes:');
    expect(result).toContain('  STR 16 (+3)');
    expect(result).toContain('Abilities:');
    expect(result).toContain('  * Dwarven Resilience: Advantage on saves against poison.');
    expect(result).toContain('Actions:');
    expect(result).toContain('  * Warhammer:');
  });

  it('should handle dungeon with rooms', () => {
    const dungeonWithRooms = {
      ...basicDungeon,
      rooms: [
        {
          id: 1,
          name: 'The Ore Storage',
          contentArray: [
            {
              format: 'read_aloud',
              content: 'Rusted mining equipment litters the floor.',
            },
            {
              format: 'header',
              content: 'Hidden Passage',
            },
            {
              format: 'paragraph',
              content: 'A DC 15 Perception check reveals a secret door.',
            },
          ],
        },
        {
          id: 2,
          name: 'The Minecart Station',
          contentArray: [
            {
              format: 'paragraph',
              content: 'Old carts rust on broken tracks.',
            },
          ],
        },
      ],
    };

    const result = dungeonToPlainText(dungeonWithRooms);

    expect(result).toContain('Rooms');
    expect(result).toContain('Room 1: The Ore Storage');
    expect(result).toContain('Rusted mining equipment litters the floor.');
    expect(result).toContain('Hidden Passage');
    expect(result).toContain('A DC 15 Perception check reveals a secret door.');
    expect(result).toContain('Room 2: The Minecart Station');
  });

  it('should handle room with no name', () => {
    const dungeonWithUnnamedRoom = {
      ...basicDungeon,
      rooms: [
        {
          id: 5,
          name: null,
          contentArray: [
            {
              format: 'paragraph',
              content: 'An empty chamber.',
            },
          ],
        },
      ],
    };

    const result = dungeonToPlainText(dungeonWithUnnamedRoom);

    expect(result).toContain('Room 5: Unnamed Room');
  });

  it('should handle dungeon with monsters (simple description)', () => {
    const dungeonWithMonsters = {
      ...basicDungeon,
      monsters: [
        {
          name: 'Cave Spider',
          description: 'A giant arachnid with venomous fangs.',
        },
      ],
    };

    const result = dungeonToPlainText(dungeonWithMonsters);

    expect(result).toContain('Monsters');
    expect(result).toContain('Cave Spider');
    expect(result).toContain('A giant arachnid with venomous fangs.');
  });

  it('should handle dungeon with monsters (detailed description)', () => {
    const dungeonWithDetailedMonster = {
      ...basicDungeon,
      monsters: [
        {
          name: 'Magma Elemental',
          detailedDescription: {
            name: 'Magma Elemental',
            intro: 'A being of molten rock and flame.',
            appearance: 'Its body glows with intense heat.',
            behaviorAbilities: 'Leaves pools of lava in its wake.',
            lore: 'Born from volcanic fury.',
          },
        },
      ],
    };

    const result = dungeonToPlainText(dungeonWithDetailedMonster);

    expect(result).toContain('Magma Elemental');
    expect(result).toContain('A being of molten rock and flame.');
    expect(result).toContain('Its body glows with intense heat.');
    expect(result).toContain('Leaves pools of lava in its wake.');
    expect(result).toContain('Born from volcanic fury.');
  });

  it('should handle monster with statblock', () => {
    const dungeonWithMonsterStatblock = {
      ...basicDungeon,
      monsters: [
        {
          name: 'Kobold Dragonshield',
          description: 'A kobold blessed by the dragon.',
          statblock: {
            name: 'Kobold Dragonshield',
            type_and_alignment: 'Small humanoid (kobold), lawful evil',
            armor_class: '15 (leather armor, shield)',
            hit_points: '44 (8d6 + 16)',
            speed: '20 ft.',
            attributes: 'STR 12 (+1), DEX 15 (+2), CON 14 (+2), INT 8 (-1), WIS 9 (-1), CHA 10 (+0)',
            saving_throws: '',
            skills: 'Perception +1',
            damage_resistances: 'see Dragon\'s Resistance',
            damage_immunities: '',
            condition_immunities: 'None',
            senses: 'darkvision 60 ft., passive Perception 11',
            languages: 'Common, Draconic',
            challenge_rating: '1 (200 XP)',
            abilities: [
              {
                name: 'Pack Tactics',
                description: 'Advantage on attacks if ally is within 5 feet of target.',
              },
            ],
            actions: [
              {
                name: 'Spear',
                description: 'Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d6 + 1) piercing damage.',
              },
            ],
            legendary_actions: [],
          },
        },
      ],
    };

    const result = dungeonToPlainText(dungeonWithMonsterStatblock);

    expect(result).toContain('Name: Kobold Dragonshield');
    expect(result).toContain('Type & Alignment: Small humanoid (kobold), lawful evil');
    expect(result).toContain('Challenge: 1 (200 XP)');
  });

  it('should not show empty sections', () => {
    const dungeonEmpty = {
      ...basicDungeon,
      npcs: [],
      rooms: [],
      monsters: [],
    };

    const result = dungeonToPlainText(dungeonEmpty);

    // NPCs section should not appear at all
    const npcIndex = result.indexOf('NPCs');
    const roomsIndex = result.indexOf('Rooms');
    const monstersIndex = result.indexOf('Monsters');

    // Since arrays are empty, these headers shouldn't be in the output
    // (They're only added when arrays have items)
    expect(npcIndex).toBe(-1);
    expect(roomsIndex).toBe(-1);
    expect(monstersIndex).toBe(-1);
  });

  it('should handle statblock with optional fields missing', () => {
    const dungeonWithMinimalStatblock = {
      ...basicDungeon,
      monsters: [
        {
          name: 'Rat',
          description: 'A common rat.',
          statblock: {
            name: 'Rat',
            type_and_alignment: 'Tiny beast, unaligned',
            armor_class: '10',
            hit_points: '1 (1d4 - 1)',
            speed: '20 ft.',
            attributes: 'STR 2 (-4), DEX 11 (+0), CON 9 (-1), INT 2 (-4), WIS 10 (+0), CHA 4 (-3)',
            saving_throws: '',
            skills: '',
            damage_resistances: '',
            damage_immunities: '',
            condition_immunities: 'None',
            senses: 'darkvision 30 ft., passive Perception 10',
            languages: '—',
            challenge_rating: '0 (10 XP)',
            abilities: [],
            actions: [
              {
                name: 'Bite',
                description: 'Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 piercing damage.',
              },
            ],
            legendary_actions: [],
          },
        },
      ],
    };

    const result = dungeonToPlainText(dungeonWithMinimalStatblock);

    expect(result).toContain('Name: Rat');
    // Empty optional fields should not show up
    expect(result).not.toContain('Saving Throws: \n');
    expect(result).not.toContain('Skills: \n');
    // But should have actions
    expect(result).toContain('Actions:');
    expect(result).toContain('  * Bite:');
    // Should not show legendary actions section when empty
    expect(result).not.toContain('Legendary Actions:');
  });

  it('should handle NPC with detailedDescription', () => {
    const dungeonWithDetailedNPC = {
      ...basicDungeon,
      npcs: [
        {
          name: 'Merchant Garrick',
          detailedDescription: {
            name: 'Merchant Garrick',
            intro: 'A portly merchant with a wide smile.',
            appearance: 'Wears fine silk robes.',
            behaviorAbilities: 'Expert at haggling.',
            lore: 'Known throughout the land for fair deals.',
          },
        },
      ],
    };

    const result = dungeonToPlainText(dungeonWithDetailedNPC);

    expect(result).toContain('Merchant Garrick');
    expect(result).toContain('A portly merchant with a wide smile.');
    expect(result).toContain('Wears fine silk robes.');
    expect(result).toContain('Expert at haggling.');
    expect(result).toContain('Known throughout the land for fair deals.');
  });

  it('should combine array fields with spaces', () => {
    const result = dungeonToPlainText(basicDungeon);

    // These fields should be combined into single paragraphs
    expect(result).toContain('A black dragon has claimed it. Hoarding treasure and terrorizing locals.');
    expect(result).toContain('Kobolds worship the dragon. Recently raided a nearby village.');
    expect(result).toContain('The dragon must be defeated. Negotiate or fight.');
  });
});
