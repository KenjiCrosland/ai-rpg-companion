import { dungeonToHTML } from './dungeon-to-html.mjs';

describe('dungeonToHTML', () => {
  const basicDungeon = {
    dungeonOverview: {
      name: 'The Cursed Catacombs',
      overview: 'Dark tunnels beneath the city.',
      relation_to_larger_setting: 'Connected to the old cemetery.',
      finding_the_dungeon: 'Enter through the mausoleum.',
      history: 'Once a burial place for nobles.',
      dominant_power: 'A vampire lord dwells here.',
      dominant_power_goals: 'To spread his undead plague.',
      dominant_power_minions: 'Zombie servants and vampire spawn.',
      dominant_power_event: 'Recently turned the mayor into a thrall.',
      recent_event_consequences: 'The city is in chaos.',
      secondary_power: 'A band of vampire hunters.',
      secondary_power_event: 'They seek the vampire\'s coffin.',
      main_problem: 'The vampire must be stopped.',
      potential_solutions: 'Find the coffin, expose him to sunlight.',
      conclusion: 'Time is running out.',
      difficulty_level: 'Tier 3: Champion',
    },
    npcs: [],
    rooms: [],
    monsters: [],
  };

  it('should convert basic dungeon overview to HTML', () => {
    const result = dungeonToHTML(basicDungeon);

    expect(result).toContain('<h1>THE CURSED CATACOMBS</h1>');
    expect(result).toContain('<p>Dark tunnels beneath the city.');
    expect(result).toContain('Connected to the old cemetery.</p>');
    expect(result).toContain('<p>Enter through the mausoleum.</p>');
    expect(result).toContain('<strong>Difficulty Level:</strong> Tier 3: Champion');
  });

  it('should properly escape HTML and combine arrays', () => {
    const result = dungeonToHTML(basicDungeon);

    expect(result).toContain('A vampire lord dwells here. To spread his undead plague.');
    expect(result).toContain('Zombie servants and vampire spawn. Recently turned the mayor into a thrall.');
  });

  it('should handle dungeon with NPCs (short description)', () => {
    const dungeonWithNPC = {
      ...basicDungeon,
      npcs: [
        {
          name: 'Father Aldric',
          short_description: 'A priest who fights the undead.',
        },
      ],
    };

    const result = dungeonToHTML(dungeonWithNPC);

    expect(result).toContain('<h2>NPCs</h2>');
    expect(result).toContain('<h3>FATHER ALDRIC</h3>');
    expect(result).toContain('<p>A priest who fights the undead.</p>');
  });

  it('should handle dungeon with NPCs (full description)', () => {
    const dungeonWithDetailedNPC = {
      ...basicDungeon,
      npcs: [
        {
          name: 'Lydia the Brave',
          read_aloud_description: 'A warrior woman with silver hair stands guard.',
          description_of_position: 'She leads the vampire hunters.',
          why_in_dungeon: 'Seeking revenge for her slain family.',
          distinctive_features_or_mannerisms: 'Clutches a silver crucifix.',
          character_secret: 'She was once bitten but resisted the curse.',
          relationships: {
            'Father Aldric': 'He blessed her weapons.',
            'Vampire Lord': 'Killed her parents.',
          },
          roleplaying_tips: 'Speak with determination and grief.',
        },
      ],
    };

    const result = dungeonToHTML(dungeonWithDetailedNPC);

    expect(result).toContain('<h3>LYDIA THE BRAVE</h3>');
    expect(result).toContain('<div class="descriptive">A warrior woman with silver hair stands guard.</div>');
    expect(result).toContain('<p>She leads the vampire hunters.</p>');
    expect(result).toContain('<h4>Relationships</h4>');
    expect(result).toContain('<strong>Father Aldric:</strong> He blessed her weapons.');
    expect(result).toContain('<h4>Roleplaying Tips</h4>');
    expect(result).toContain('<div>Speak with determination and grief.</div>');
  });

  it('should handle NPC with statblock', () => {
    const dungeonWithNPCStatblock = {
      ...basicDungeon,
      npcs: [
        {
          name: 'Sir Roland',
          short_description: 'A paladin of light.',
          statblock: {
            name: 'Sir Roland',
            type_and_alignment: 'Medium humanoid (human), lawful good',
            armor_class: '20 (plate + shield)',
            hit_points: '75 (10d8 + 30)',
            speed: '30 ft.',
            attributes: 'STR 18 (+4), DEX 10 (+0), CON 16 (+3), INT 12 (+1), WIS 14 (+2), CHA 16 (+3)',
            saving_throws: 'WIS +5, CHA +6',
            skills: 'Persuasion +6, Religion +4',
            damage_resistances: '',
            damage_immunities: '',
            condition_immunities: 'Frightened',
            senses: 'Passive Perception 12',
            languages: 'Common, Celestial',
            challenge_rating: '5 (1,800 XP)',
            abilities: [
              {
                name: 'Divine Smite',
                description: 'Adds 2d8 radiant damage to weapon attacks.',
              },
            ],
            actions: [
              {
                name: 'Longsword',
                description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage.',
              },
            ],
            legendary_actions: [],
          },
        },
      ],
    };

    const result = dungeonToHTML(dungeonWithNPCStatblock);

    expect(result).toContain('<div class="statblock">');
    expect(result).toContain('<h4>Sir Roland</h4>');
    expect(result).toContain('<p><strong>Armor Class:</strong> 20 (plate + shield)</p>');
    expect(result).toContain('<table class="attributes">');
    expect(result).toContain('<th>STR</th><th>DEX</th><th>CON</th>');
    expect(result).toContain('<p><em><strong>Divine Smite.</strong> Adds 2d8 radiant damage to weapon attacks.</em></p>');
    expect(result).toContain('<h5>Actions</h5>');
  });

  it('should handle dungeon with rooms', () => {
    const dungeonWithRooms = {
      ...basicDungeon,
      rooms: [
        {
          id: 1,
          name: 'The Bone Chamber',
          contentArray: [
            {
              format: 'read_aloud',
              content: 'Skulls line the walls, grinning in the torchlight.',
            },
            {
              format: 'header',
              content: 'Treasure',
            },
            {
              format: 'paragraph',
              content: 'A chest contains 500 gold pieces.',
            },
          ],
        },
        {
          id: 2,
          name: undefined,
          contentArray: [
            {
              format: 'paragraph',
              content: 'An empty room.',
            },
          ],
        },
      ],
    };

    const result = dungeonToHTML(dungeonWithRooms);

    expect(result).toContain('<h2>Rooms</h2>');
    expect(result).toContain('<h3>Room 1: The Bone Chamber</h3>');
    expect(result).toContain('<div class="descriptive">Skulls line the walls, grinning in the torchlight.</div>');
    expect(result).toContain('<h4>Treasure</h4>');
    expect(result).toContain('<p>A chest contains 500 gold pieces.</p>');
    expect(result).toContain('<h3>Room 2: Unnamed Room</h3>');
  });

  it('should handle dungeon with monsters (simple description)', () => {
    const dungeonWithMonsters = {
      ...basicDungeon,
      monsters: [
        {
          name: 'Wraith',
          description: 'A ghostly figure that drains life.',
        },
      ],
    };

    const result = dungeonToHTML(dungeonWithMonsters);

    expect(result).toContain('<h2>Monsters</h2>');
    expect(result).toContain('<h3>Wraith</h3>');
    expect(result).toContain('<p>A ghostly figure that drains life.</p>');
  });

  it('should handle dungeon with monsters (detailed description)', () => {
    const dungeonWithDetailedMonster = {
      ...basicDungeon,
      monsters: [
        {
          name: 'Bone Colossus',
          detailedDescription: {
            name: 'Bone Colossus',
            intro: 'A massive construct of fused bones.',
            appearance: 'Stands 12 feet tall with glowing red eyes.',
            behaviorAbilities: 'Strikes with devastating force.',
            lore: 'Created from the remains of a hundred warriors.',
          },
        },
      ],
    };

    const result = dungeonToHTML(dungeonWithDetailedMonster);

    expect(result).toContain('<h3>Bone Colossus</h3>');
    expect(result).toContain('<p>A massive construct of fused bones.</p>');
    expect(result).toContain('<p>Stands 12 feet tall with glowing red eyes.</p>');
    expect(result).toContain('<p> Strikes with devastating force.</p>');
    expect(result).toContain('<p>Created from the remains of a hundred warriors.</p>');
  });

  it('should handle monster with statblock', () => {
    const dungeonWithMonsterStatblock = {
      ...basicDungeon,
      monsters: [
        {
          name: 'Vampire Spawn',
          description: 'A lesser vampire.',
          statblock: {
            name: 'Vampire Spawn',
            type_and_alignment: 'Medium undead, neutral evil',
            armor_class: '15 (natural armor)',
            hit_points: '82 (11d8 + 33)',
            speed: '30 ft.',
            attributes: 'STR 16 (+3), DEX 16 (+3), CON 16 (+3), INT 11 (+0), WIS 10 (+0), CHA 12 (+1)',
            saving_throws: 'DEX +6, WIS +3',
            skills: 'Perception +3, Stealth +6',
            damage_resistances: 'necrotic; bludgeoning, piercing, and slashing from nonmagical attacks',
            damage_immunities: '',
            condition_immunities: 'None',
            senses: 'darkvision 60 ft., passive Perception 13',
            languages: 'the languages it knew in life',
            challenge_rating: '5 (1,800 XP)',
            abilities: [
              {
                name: 'Regeneration',
                description: 'The vampire regains 10 hit points at the start of its turn.',
              },
            ],
            actions: [
              {
                name: 'Claws',
                description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 8 (2d4 + 3) slashing damage.',
              },
            ],
            legendary_actions: [],
          },
        },
      ],
    };

    const result = dungeonToHTML(dungeonWithMonsterStatblock);

    expect(result).toContain('<div class="statblock">');
    expect(result).toContain('<h4>Vampire Spawn</h4>');
    expect(result).toContain('<p><em><strong>Regeneration.</strong> The vampire regains 10 hit points at the start of its turn.</em></p>');
  });

  it('should handle empty arrays', () => {
    const dungeonEmpty = {
      ...basicDungeon,
      npcs: [],
      rooms: [],
      monsters: [],
    };

    const result = dungeonToHTML(dungeonEmpty);

    expect(result).not.toContain('<h2>NPCs</h2>');
    expect(result).not.toContain('<h2>Rooms</h2>');
    expect(result).not.toContain('<h2>Monsters</h2>');
  });

  it('should filter out empty/falsy values in arrays', () => {
    const dungeonWithEmptyFields = {
      dungeonOverview: {
        name: 'Test Dungeon',
        overview: 'A test place.',
        relation_to_larger_setting: '',
        finding_the_dungeon: 'Through a door.',
        history: '',
        dominant_power: 'A dragon.',
        dominant_power_goals: '',
        dominant_power_minions: '',
        dominant_power_event: '',
        recent_event_consequences: '',
        secondary_power: '',
        secondary_power_event: '',
        main_problem: 'The dragon.',
        potential_solutions: 'Fight it.',
        conclusion: '',
        difficulty_level: 'Tier 1',
      },
      npcs: [],
      rooms: [],
      monsters: [],
    };

    const result = dungeonToHTML(dungeonWithEmptyFields);

    // Should combine main_problem and potential_solutions
    expect(result).toContain('The dragon. Fight it.');
    // Should have dominant_power in its own paragraph
    expect(result).toContain('<p>A dragon.</p>');
    // Should not have double spaces or empty paragraphs for missing fields
    expect(result).not.toContain('</p><p></p>');
  });

  it('should properly handle statblock with empty optional fields', () => {
    const dungeonWithMinimalStatblock = {
      ...basicDungeon,
      monsters: [
        {
          name: 'Goblin',
          description: 'A small green creature.',
          statblock: {
            name: 'Goblin',
            type_and_alignment: 'Small humanoid, neutral evil',
            armor_class: '15 (leather armor)',
            hit_points: '7 (2d6)',
            speed: '30 ft.',
            attributes: 'STR 8 (-1), DEX 14 (+2), CON 10 (+0), INT 10 (+0), WIS 8 (-1), CHA 8 (-1)',
            saving_throws: '',
            skills: '',
            damage_resistances: '',
            damage_immunities: '',
            condition_immunities: 'None',
            senses: 'darkvision 60 ft., passive Perception 9',
            languages: 'Common, Goblin',
            challenge_rating: '1/4 (50 XP)',
            abilities: [],
            actions: [
              {
                name: 'Scimitar',
                description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage.',
              },
            ],
            legendary_actions: [],
          },
        },
      ],
    };

    const result = dungeonToHTML(dungeonWithMinimalStatblock);

    expect(result).toContain('<h4>Goblin</h4>');
    // Should not render empty fields
    expect(result).not.toContain('<p><strong>Saving Throws:</strong> </p>');
    expect(result).not.toContain('<p><strong>Skills:</strong> </p>');
    expect(result).not.toContain('<p><strong>Damage Resistances:</strong> </p>');
    expect(result).not.toContain('<p><strong>Damage Immunities:</strong> </p>');
    // Should not render empty abilities section
    expect(result).not.toContain('<h5>Legendary Actions</h5>');
  });
});
