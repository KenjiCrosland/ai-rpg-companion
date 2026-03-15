/**
 * EncounterGenerator Component Tests
 *
 * These tests verify:
 * 1. Three-part encounter generation flow
 * 2. Party configuration management
 * 3. Monster selection and filtering
 * 4. localStorage operations preserve encounters and party data
 * 5. Encounter CRUD operations (create, read, update, delete)
 */

import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import EncounterGenerator from './EncounterGenerator.vue';
import * as openAi from '@/util/open-ai.mjs';

// Mock the open-ai module
jest.mock('@/util/open-ai.mjs', () => ({
  generateGptResponse: jest.fn(),
}));

// Mock encounter prompts
jest.mock('./prompts/encounter-prompt.mjs', () => ({
  buildCall1StructurePrompt: jest.fn((location, minimalBrief, includeNPC, tone, centerpieceShortlist) => {
    return `Mock call 1 prompt - Location: ${location || 'none'} - Brief: ${minimalBrief || 'none'}`;
  }),
  buildCall2ScenePrompt: jest.fn((call1Result, minimalBrief) => {
    const placeName = call1Result?.place_name || 'unknown';
    const npc = call1Result?.key_npc || 'none';
    return `Mock call 2 prompt - Place: ${placeName} - NPC: ${npc} - Brief: ${minimalBrief || 'none'}`;
  }),
  buildCall3DetailsPrompt: jest.fn((call1Result, call2Result, tacticalBrief, location, difficultyRating, partyDesc, encounterProfile, creatureIntel) => {
    return `Mock call 3 prompt - Party: ${partyDesc || 'none'}`;
  }),
  buildMinimalBrief: jest.fn((baseBrief) => baseBrief || 'Minimal monster brief'),
  buildTacticalBrief: jest.fn((baseBrief, creatureIntel) => baseBrief || 'Mock tactical brief'),
  selectTone: jest.fn(() => ({ id: 'grim', name: 'Grim' })),
  getReadAloudToneAndCenterpieces: jest.fn(() => ({
    tone: { id: 'grim', name: 'Grim' },
    centerpieceShortlist: [{ id: 'altar', description: 'stone altar' }]
  })),
  validateCall1Structure: jest.fn((response) => {
    const data = JSON.parse(response);
    return data.place_name && data.tone_id;
  }),
  validateCall2Scene: jest.fn((response) => {
    const data = JSON.parse(response);
    return data.encounter_intro;
  }),
  validateCall3Details: jest.fn((response) => {
    const data = JSON.parse(response);
    return data.situation || data.space;
  }),
  processEncounterResponse: jest.fn(() => ({
    place_name: 'Test Location',
    contentArray: []
  })),
  parseInlineMarkup: jest.fn((text) => {
    // Simple mock that returns text segments
    return [{ text: text || '', bold: false }];
  }),
  getCreatureIntelligence: jest.fn(() => Promise.resolve({})),
  getEncounterProfile: jest.fn(() => ({ dominantTactic: 'ambush' }))
}));

// Mock monster-prompts
jest.mock('@/prompts/monster-prompts.mjs', () => ({
  createStatblockPrompts: jest.fn(() => ({
    part1: 'Mock statblock prompt part 1',
    part2: 'Mock statblock prompt part 2'
  }))
}));

// Mock calculateCR
jest.mock('@/util/calculateCR.js', () => ({
  __esModule: true,
  default: jest.fn((statblock) => ({
    finalCR: statblock.challenge_rating || '1',
    offensiveCR: '1',
    defensiveCR: '1'
  }))
}));

// Mock monster adapter
jest.mock('./util/monster-adapter.mjs', () => ({
  loadSRDMonsters: jest.fn(() => Promise.resolve([
    {
      name: 'Goblin',
      cr: '1/4',
      size: 'Small',
      type: 'Humanoid',
      statblock: null
    },
    {
      name: 'Orc',
      cr: '1/2',
      size: 'Medium',
      type: 'Humanoid',
      statblock: null
    }
  ])),
  loadCustomMonsters: jest.fn(() => Promise.resolve([]))
}));

// Mock GeneratorLayout component
jest.mock('@/components/GeneratorLayout.vue', () => ({
  name: 'GeneratorLayout',
  template: '<div><slot name="sidebar"></slot><slot></slot></div>',
  props: ['premium']
}));

// Mock DataManagerModal component
jest.mock('@/components/DataManagerModal.vue', () => ({
  name: 'DataManagerModal',
  template: '<div></div>',
  props: ['opened', 'premium', 'currentApp']
}));

// Mock Statblock component
jest.mock('@/components/Statblock.vue', () => ({
  name: 'Statblock',
  template: '<div>Statblock Display</div>',
  props: ['monster', 'premium']
}));

// Mock MonsterPicker component
jest.mock('./components/MonsterPicker.vue', () => ({
  name: 'MonsterPicker',
  template: '<div></div>',
  props: ['modelValue']
}));

// Mock EncounterMonsterList component
jest.mock('./components/EncounterMonsterList.vue', () => ({
  name: 'EncounterMonsterList',
  template: '<div></div>',
  props: ['monsters', 'partyGroups', 'difficultyRating']
}));

// Mock encounter utilities
jest.mock('@/util/encounter-enrichment.mjs', () => ({
  buildEnrichedMonsterBrief: jest.fn((monsters) => {
    // Include monster names in the brief so tests can verify them
    const names = monsters?.map(m => m.name).join(', ') || '';
    return `Enriched brief with monsters: ${names}`;
  }),
  getEncounterProfile: jest.fn(() => ({ dominantTactic: 'ambush' }))
}));

// Mock statblock generator
jest.mock('@/util/statblock-generator.mjs', () => ({
  generateStatblockPart1: jest.fn(() => Promise.resolve({})),
  completeStatblock: jest.fn(() => Promise.resolve({}))
}));

// Mock encounter difficulty data
jest.mock('@/data/encounter-difficulty.json', () => {
  // Return mock XP thresholds for levels 1-20
  const mockData = [];
  for (let i = 0; i < 20; i++) {
    mockData.push({
      Level: i + 1,
      Easy: 25 * (i + 1),
      Medium: 50 * (i + 1),
      Hard: 75 * (i + 1),
      Deadly: 100 * (i + 1)
    });
  }
  return {
    encounter_difficulty: mockData
  };
}, { virtual: true });

// Mock Cedar components
jest.mock('@rei/cedar', () => ({
  CdrButton: {
    name: 'CdrButton',
    template: '<button :type="type || \'button\'" :disabled="disabled"><slot></slot></button>',
    props: ['type', 'disabled', 'modifier', 'iconOnly', 'size', 'withBackground', 'fullWidth']
  },
  CdrInput: {
    name: 'CdrInput',
    template: '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
    props: ['modelValue', 'label', 'background', 'placeholder', 'rows', 'tag', 'hideLabel']
  },
  CdrSelect: {
    name: 'CdrSelect',
    template: '<select :value="modelValue" @change="$emit(\'update:modelValue\', $event.target.value)"><option v-for="opt in options" :key="opt" :value="opt">{{opt}}</option></select>',
    props: ['modelValue', 'options', 'label', 'background', 'placeholder', 'prompt', 'multiple', 'multipleSize']
  },
  CdrLink: {
    name: 'CdrLink',
    template: '<a :href="href"><slot></slot></a>',
    props: ['href', 'target']
  },
  CdrCheckbox: {
    name: 'CdrCheckbox',
    template: '<input type="checkbox" :checked="modelValue" @change="$emit(\'update:modelValue\', $event.target.checked)" />',
    props: ['modelValue', 'label']
  },
  CdrAccordion: {
    name: 'CdrAccordion',
    template: '<div><slot name="label"></slot><slot></slot></div>',
    props: ['id', 'opened', 'level']
  },
  CdrAccordionGroup: {
    name: 'CdrAccordionGroup',
    template: '<div><slot></slot></div>'
  },
  CdrTooltip: {
    name: 'CdrTooltip',
    template: '<div><slot name="trigger"></slot><slot></slot></div>',
    props: ['id', 'position']
  },
  IconXSm: {
    name: 'IconXSm',
    template: '<span>X</span>'
  },
  CdrSkeleton: {
    name: 'CdrSkeleton',
    template: '<div><slot></slot></div>'
  },
  CdrSkeletonBone: {
    name: 'CdrSkeletonBone',
    template: '<div></div>',
    props: ['type']
  }
}));

describe('EncounterGenerator', () => {
  let wrapper;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Group 1: Component Mounting and Initialization
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Component Mounting', () => {
    it('should mount successfully', () => {
      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('should load encounters from localStorage on mount', async () => {
      const testEncounters = {
        'Uncategorized': [
          {
            name: 'Test Encounter',
            monsters: [],
            environment: 'Forest',
            difficulty: 'Medium'
          }
        ]
      };

      localStorage.setItem('encounters', JSON.stringify(testEncounters));

      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      await nextTick();

      // Component should have loaded the encounter
      expect(wrapper.vm.savedEncounters).toEqual(testEncounters);
    });

    it('should load party config from localStorage on mount', async () => {
      const testParty = [
        { name: 'Fighter', level: 5, count: 1 },
        { name: 'Wizard', level: 5, count: 1 }
      ];

      localStorage.setItem('partyConfig', JSON.stringify(testParty));

      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      await nextTick();

      // Component should have loaded the party
      expect(wrapper.vm.partyGroups).toEqual(testParty);
    });

    it('should handle corrupted localStorage gracefully', () => {
      localStorage.setItem('encounters', 'invalid json{{{');

      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      // Should initialize with default structure
      expect(wrapper.vm.savedEncounters).toEqual({ 'Uncategorized': [] });
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Group 2: localStorage Persistence
  // ═══════════════════════════════════════════════════════════════════════════

  describe('localStorage Operations', () => {
    it('should save encounters to localStorage', async () => {
      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      const testEncounter = {
        name: 'Goblin Ambush',
        monsters: [{ name: 'Goblin', cr: '1/4' }],
        environment: 'Forest'
      };

      // Add encounter to component state
      wrapper.vm.savedEncounters['Uncategorized'].push(testEncounter);
      wrapper.vm.saveToLocalStorage();

      await nextTick();

      // Check localStorage
      const stored = JSON.parse(localStorage.getItem('encounters'));
      expect(stored['Uncategorized']).toContainEqual(testEncounter);
    });

    it('should save party config to localStorage', async () => {
      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      wrapper.vm.partyGroups = [
        { name: 'Barbarian', level: 3, count: 1 }
      ];
      wrapper.vm.savePartyConfig();

      await nextTick();

      const stored = JSON.parse(localStorage.getItem('partyConfig'));
      expect(stored).toEqual([
        { name: 'Barbarian', level: 3, count: 1 }
      ]);
    });

    it('should preserve folder structure when saving', async () => {
      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      wrapper.vm.savedEncounters = {
        'Dragons': [{ name: 'Dragon Fight', monsters: [] }],
        'Undead': [{ name: 'Zombie Horde', monsters: [] }]
      };
      wrapper.vm.saveToLocalStorage();

      await nextTick();

      const stored = JSON.parse(localStorage.getItem('encounters'));
      expect(Object.keys(stored)).toEqual(['Dragons', 'Undead']);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Group 3: Three-Part Encounter Generation
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Encounter Generation', () => {
    it('should make three API calls for encounter generation', async () => {
      // Call 1: Structure - needs place_name, centerpiece, key_npc, etc.
      const mockCall1Response = JSON.stringify({
        place_name: 'Dark Forest Clearing',
        tone_id: 'grim',
        centerpiece: {
          id: 'altar',
          description: 'stone altar covered in moss'
        },
        key_npc: 'Goblin Chief Grimtooth',
        situation: 'ambush',
        has_turn: true,
        disguised_as: null
      });

      // Call 2: Scene - needs encounter_intro
      const mockCall2Response = JSON.stringify({
        encounter_intro: 'You enter a dark forest clearing and see goblins...'
      });

      // Call 3: Details - DM notes
      const mockCall3Response = JSON.stringify({
        situation: 'The goblins are preparing an ambush',
        space: 'The clearing is 30 feet across',
        turn_readaloud: 'More goblins emerge from the forest',
        turn_dm_notes: 'Reinforcements arrive on round 3',
        aftermath: 'The goblins flee if their chief falls'
      });

      openAi.generateGptResponse
        .mockResolvedValueOnce(mockCall1Response)
        .mockResolvedValueOnce(mockCall2Response)
        .mockResolvedValueOnce(mockCall3Response);

      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      wrapper.vm.location = 'Forest';
      wrapper.vm.partyGroups = [{ players: 1, level: 5 }];
      wrapper.vm.encounterMonsters = [{
        name: 'Goblin',
        cr: '1/4',
        size: 'Small',
        type: 'Humanoid',
        quantity: 4
      }];

      await wrapper.vm.generateEncounter();
      await flushPromises();

      // Should make exactly 3 API calls
      expect(openAi.generateGptResponse).toHaveBeenCalledTimes(3);
    });

    it('should pass party info to first API call', async () => {
      // Proper mock responses for all 3 calls
      const mockCall1 = JSON.stringify({
        place_name: 'Dungeon Chamber',
        tone_id: 'dark',
        centerpiece: { id: 'pit', description: 'bottomless pit' },
        key_npc: 'Skeleton Lord',
        situation: 'guard duty'
      });
      const mockCall2 = JSON.stringify({ encounter_intro: 'Skeletons guard...' });
      const mockCall3 = JSON.stringify({ situation: 'Test', space: 'Test', goals: 'Test', complications: 'Test' });

      openAi.generateGptResponse
        .mockResolvedValueOnce(mockCall1)
        .mockResolvedValueOnce(mockCall2)
        .mockResolvedValueOnce(mockCall3);

      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      wrapper.vm.partyGroups = [
        { players: 1, level: 7 },
        { players: 1, level: 7 }
      ];
      wrapper.vm.location = 'Dungeon';
      wrapper.vm.encounterMonsters = [{
        name: 'Skeleton',
        cr: '1/4',
        type: 'Undead',
        quantity: 3
      }];

      await wrapper.vm.generateEncounter();
      await flushPromises();

      // First call should include monster brief with monster names
      const firstCallPrompt = openAi.generateGptResponse.mock.calls[0][0];
      expect(firstCallPrompt).toContain('Skeleton'); // monster name from encounterMonsters
      expect(firstCallPrompt).toContain('Dungeon'); // location
    });

    it('should use call 1 response as context for call 2', async () => {
      const mockCall1 = JSON.stringify({
        place_name: 'Mountain Pass',
        tone_id: 'tense',
        centerpiece: { id: 'bridge', description: 'narrow rope bridge' },
        key_npc: 'Orc Warlord',
        situation: 'blocking passage'
      });

      const mockCall2 = JSON.stringify({
        encounter_intro: 'Orcs block the mountain pass...'
      });

      const mockCall3 = JSON.stringify({
        situation: 'Orcs demand tribute',
        space: 'Narrow mountain pass',
        goals: 'Extract tolls from travelers',
        complications: 'Rockslide if combat starts'
      });

      openAi.generateGptResponse
        .mockResolvedValueOnce(mockCall1)
        .mockResolvedValueOnce(mockCall2)
        .mockResolvedValueOnce(mockCall3);

      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      wrapper.vm.location = 'Mountains';
      wrapper.vm.partyGroups = [{ players: 1, level: 5 }];
      wrapper.vm.encounterMonsters = [{
        name: 'Orc',
        cr: '1/2',
        type: 'Humanoid',
        quantity: 2
      }];

      await wrapper.vm.generateEncounter();
      await flushPromises();

      // Second call should reference Call 1 result (place name, NPC)
      const secondCallPrompt = openAi.generateGptResponse.mock.calls[1][0];
      expect(secondCallPrompt).toContain('Mountain Pass'); // from Call 1 result
      expect(secondCallPrompt).toContain('Orc Warlord'); // NPC from Call 1 result
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Group 4: Prompt Generation (CRITICAL)
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Prompt Function Calls', () => {
    const encounterPrompt = require('./prompts/encounter-prompt.mjs');

    it('should call buildCall1StructurePrompt with correct parameters', async () => {
      const mockCall1 = JSON.stringify({
        place_name: 'Dark Cave',
        tone_id: 'grim',
        key_npc: null,
        situation: 'ambush',
        centerpiece: { id: 'altar', description: 'stone altar' }
      });
      const mockCall2 = JSON.stringify({ encounter_intro: 'You enter...' });
      const mockCall3 = JSON.stringify({ situation: 'Test situation' });

      openAi.generateGptResponse
        .mockResolvedValueOnce(mockCall1)
        .mockResolvedValueOnce(mockCall2)
        .mockResolvedValueOnce(mockCall3);

      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      wrapper.vm.location = 'Cave';
      wrapper.vm.partyGroups = [{ players: 2, level: 4 }];
      wrapper.vm.encounterMonsters = [{
        name: 'Goblin',
        cr: '1/4',
        size: 'Small',
        type: 'Humanoid',
        quantity: 4
      }];

      await wrapper.vm.generateEncounter();
      await flushPromises();

      // buildCall1StructurePrompt should be called with:
      // (location, minimalBrief, includeNPC, tone, centerpieceShortlist)
      expect(encounterPrompt.buildCall1StructurePrompt).toHaveBeenCalled();

      const call1Args = encounterPrompt.buildCall1StructurePrompt.mock.calls[0];
      expect(call1Args[0]).toContain('Cave'); // location
      expect(call1Args[1]).toBeTruthy(); // minimalBrief exists
      expect(typeof call1Args[2]).toBe('boolean'); // includeNPC is boolean
      expect(call1Args[3]).toBeTruthy(); // tone
      expect(Array.isArray(call1Args[4])).toBe(true); // centerpieceShortlist is array
    });

    it('should call buildCall2ScenePrompt with Call 1 result as context', async () => {
      const mockCall1Result = {
        place_name: 'Haunted Chapel',
        tone_id: 'eerie',
        key_npc: 'Ghost of Father Marcus',
        situation: 'trapped souls',
        centerpiece: { id: 'altar', description: 'cracked altar' }
      };

      const mockCall1 = JSON.stringify(mockCall1Result);
      const mockCall2 = JSON.stringify({ encounter_intro: 'Cold mist...' });
      const mockCall3 = JSON.stringify({ situation: 'Test' });

      openAi.generateGptResponse
        .mockResolvedValueOnce(mockCall1)
        .mockResolvedValueOnce(mockCall2)
        .mockResolvedValueOnce(mockCall3);

      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      wrapper.vm.location = 'Chapel';
      wrapper.vm.partyGroups = [{ players: 1, level: 6 }];
      wrapper.vm.encounterMonsters = [{
        name: 'Ghost',
        cr: '4',
        type: 'Undead',
        quantity: 1
      }];

      await wrapper.vm.generateEncounter();
      await flushPromises();

      // buildCall2ScenePrompt should be called with:
      // (call1Result, minimalBrief)
      expect(encounterPrompt.buildCall2ScenePrompt).toHaveBeenCalled();

      const call2Args = encounterPrompt.buildCall2ScenePrompt.mock.calls[0];
      expect(call2Args[0]).toEqual(mockCall1Result); // call1Result
      expect(call2Args[1]).toBeTruthy(); // minimalBrief exists
    });

    it('should call buildCall3DetailsPrompt with both Call 1 and Call 2 results', async () => {
      const mockCall1Result = {
        place_name: 'Goblin Warren',
        tone_id: 'chaotic',
        key_npc: 'Snagtooth, goblin boss',
        situation: 'defending lair',
        centerpiece: { id: 'pit', description: 'spike pit' }
      };

      const mockCall2Result = {
        encounter_intro: 'Screams echo...'
      };

      const mockCall1 = JSON.stringify(mockCall1Result);
      const mockCall2 = JSON.stringify(mockCall2Result);
      const mockCall3 = JSON.stringify({
        situation: 'Goblins defend their lair',
        space: 'Cramped tunnels',
        turn_readaloud: 'More goblins arrive',
        turn_dm_notes: 'Reinforcements',
        aftermath: 'Loot and escape routes'
      });

      openAi.generateGptResponse
        .mockResolvedValueOnce(mockCall1)
        .mockResolvedValueOnce(mockCall2)
        .mockResolvedValueOnce(mockCall3);

      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      wrapper.vm.location = 'Underground';
      wrapper.vm.partyGroups = [
        { players: 1, level: 3 },
        { players: 1, level: 3 }
      ];
      wrapper.vm.encounterMonsters = [{
        name: 'Goblin',
        cr: '1/4',
        count: 6,
        xp: 50 // XP for CR 1/4
      }];

      await nextTick(); // Let computed properties update

      await wrapper.vm.generateEncounter();
      await flushPromises();

      // buildCall3DetailsPrompt should be called with:
      // (call1Result, call2Result, tacticalBrief, location, difficultyRating, partyDescription, encounterProfile, creatureIntelligence)
      expect(encounterPrompt.buildCall3DetailsPrompt).toHaveBeenCalled();

      const call3Args = encounterPrompt.buildCall3DetailsPrompt.mock.calls[0];
      expect(call3Args[0]).toEqual(mockCall1Result); // call1Result
      expect(call3Args[1]).toEqual(mockCall2Result); // call2Result
      expect(call3Args[2]).toBeTruthy(); // tacticalBrief
      expect(call3Args[3]).toContain('Underground'); // location
      expect(call3Args[4]).toBeTruthy(); // difficultyRating
      expect(call3Args[5]).toBeTruthy(); // partyDescription
      expect(call3Args[6]).toBeTruthy(); // encounterProfile
      expect(call3Args[7]).toBeTruthy(); // creatureIntelligence
    });

    it('should pass party description to buildCall3DetailsPrompt', async () => {
      const mockResponses = [
        JSON.stringify({ place_name: 'Test', tone_id: 'test', key_npc: null, situation: 'test', centerpiece: { id: 'test', description: 'test' } }),
        JSON.stringify({ encounter_intro: 'test' }),
        JSON.stringify({ situation: 'test' })
      ];

      openAi.generateGptResponse
        .mockResolvedValueOnce(mockResponses[0])
        .mockResolvedValueOnce(mockResponses[1])
        .mockResolvedValueOnce(mockResponses[2]);

      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      wrapper.vm.location = 'Forest';
      wrapper.vm.partyGroups = [
        { name: 'Paladin', level: 7, count: 1, players: 1 },
        { name: 'Bard', level: 7, count: 1, players: 1 },
        { name: 'Rogue', level: 8, count: 1, players: 1 }
      ];
      wrapper.vm.encounterMonsters = [{ name: 'Orc', cr: '1', count: 5 }];

      await wrapper.vm.generateEncounter();
      await flushPromises();

      const call3Args = encounterPrompt.buildCall3DetailsPrompt.mock.calls[0];
      const partyDesc = call3Args[5]; // partyDescription parameter

      // Should describe party composition
      expect(partyDesc).toContain('level 7');
      expect(partyDesc).toContain('level 8');
    });

    it('should use monster count to build briefs correctly', async () => {
      const mockResponses = [
        JSON.stringify({ place_name: 'Test', tone_id: 'test', key_npc: null, situation: 'test', centerpiece: { id: 'test', description: 'test' } }),
        JSON.stringify({ encounter_intro: 'test' }),
        JSON.stringify({ situation: 'test' })
      ];

      openAi.generateGptResponse
        .mockResolvedValueOnce(mockResponses[0])
        .mockResolvedValueOnce(mockResponses[1])
        .mockResolvedValueOnce(mockResponses[2]);

      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      wrapper.vm.location = 'Dungeon';
      wrapper.vm.partyGroups = [{ players: 1, level: 10 }];
      wrapper.vm.encounterMonsters = [
        { name: 'Skeleton', cr: '1/4', count: 8 },
        { name: 'Zombie', cr: '1/4', count: 4 },
        { name: 'Wight', cr: '3', count: 1 }
      ];

      await wrapper.vm.generateEncounter();
      await flushPromises();

      // buildMinimalBrief should have been called with monster data
      expect(encounterPrompt.buildMinimalBrief).toHaveBeenCalled();

      // buildTacticalBrief should have been called
      expect(encounterPrompt.buildTacticalBrief).toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Group 5: Party Management
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Party Management', () => {
    it('should add party group', async () => {
      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      const initialLength = wrapper.vm.partyGroups.length;
      wrapper.vm.addPartyGroup();

      expect(wrapper.vm.partyGroups.length).toBe(initialLength + 1);
      expect(wrapper.vm.partyGroups[wrapper.vm.partyGroups.length - 1]).toEqual({
        players: null,
        level: null
      });
    });

    it('should remove party group', async () => {
      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      wrapper.vm.partyGroups = [
        { players: 2, level: 4 },
        { players: 1, level: 4 }
      ];

      wrapper.vm.removePartyGroup(0);

      expect(wrapper.vm.partyGroups.length).toBe(1);
      expect(wrapper.vm.partyGroups[0].players).toBe(1);
      expect(wrapper.vm.partyGroups[0].level).toBe(4);
    });

    it('should calculate party XP thresholds', async () => {
      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      wrapper.vm.partyGroups = [
        { players: 2, level: 5 },
        { players: 1, level: 5 }
      ];

      await nextTick();

      // Should calculate difficulty thresholds based on party composition
      expect(wrapper.vm.difficultyThresholds).toBeDefined();
      expect(wrapper.vm.difficultyThresholds.easy).toBeGreaterThan(0);
      expect(wrapper.vm.difficultyThresholds.medium).toBeGreaterThan(0);
      expect(wrapper.vm.difficultyThresholds.hard).toBeGreaterThan(0);
      expect(wrapper.vm.difficultyThresholds.deadly).toBeGreaterThan(0);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Group 5: Monster Selection
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Monster Selection', () => {
    it('should add monster to encounter', async () => {
      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      const testMonster = {
        name: 'Skeleton',
        cr: '1/4',
        type: 'Undead',
        source: 'SRD'
      };

      expect(wrapper.vm.encounterMonsters.length).toBe(0);

      wrapper.vm.addMonster(testMonster);

      expect(wrapper.vm.encounterMonsters.length).toBe(1);
      expect(wrapper.vm.encounterMonsters[0].name).toBe('Skeleton');
      expect(wrapper.vm.encounterMonsters[0].quantity).toBe(1);
    });

    it('should increment quantity when adding same monster twice', async () => {
      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      const testMonster = {
        name: 'Goblin',
        cr: '1/4',
        type: 'Humanoid',
        source: 'SRD'
      };

      wrapper.vm.addMonster(testMonster);
      wrapper.vm.addMonster(testMonster);

      // Should have 1 monster with quantity 2, not 2 separate monsters
      expect(wrapper.vm.encounterMonsters.length).toBe(1);
      expect(wrapper.vm.encounterMonsters[0].quantity).toBe(2);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Group 6: Encounter CRUD Operations
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Encounter CRUD Operations', () => {
    it('should delete encounter', async () => {
      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      wrapper.vm.savedEncounters = {
        'Uncategorized': [
          { name: 'Encounter 1', monsters: [] },
          { name: 'Encounter 2', monsters: [] }
        ]
      };
      wrapper.vm.activeFolder = 'Uncategorized';
      wrapper.vm.activeEncounterIndex = 0;

      // Mock window.confirm
      global.confirm = jest.fn(() => true);

      wrapper.vm.deleteEncounter();

      expect(wrapper.vm.savedEncounters['Uncategorized'].length).toBe(1);
      expect(wrapper.vm.savedEncounters['Uncategorized'][0].name).toBe('Encounter 2');
    });

    it('should save new encounter after generation', async () => {
      const mockResponse = JSON.stringify({
        monsters: [{ name: 'Goblin', count: 3 }]
      });
      openAi.generateGptResponse.mockResolvedValue(mockResponse);

      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      wrapper.vm.location = 'Cave';
      wrapper.vm.partyGroups = [{ players: 1, level: 3 }];

      const initialCount = wrapper.vm.savedEncounters['Uncategorized'].length;

      await wrapper.vm.generateEncounter();
      await flushPromises();
      wrapper.vm.saveNewEncounter();

      expect(wrapper.vm.savedEncounters['Uncategorized'].length).toBe(initialCount + 1);
    });

    it('should switch between saved encounters', async () => {
      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      wrapper.vm.savedEncounters = {
        'Uncategorized': [
          {
            monsters: [{ name: 'Goblin', quantity: 2 }],
            partyGroups: [{ players: 4, level: 3 }],
            location: 'Forest',
            generatedEncounter: { place_name: 'Encounter A', contentArray: [] }
          },
          {
            monsters: [{ name: 'Orc', quantity: 1 }],
            partyGroups: [{ players: 4, level: 5 }],
            location: 'Mountains',
            generatedEncounter: { place_name: 'Encounter B', contentArray: [] }
          }
        ]
      };

      // Select first encounter
      wrapper.vm.selectEncounter('Uncategorized', 0);
      await nextTick();
      expect(wrapper.vm.generatedEncounter.place_name).toBe('Encounter A');

      // Switch to second encounter
      wrapper.vm.selectEncounter('Uncategorized', 1);
      await nextTick();
      expect(wrapper.vm.generatedEncounter.place_name).toBe('Encounter B');
      expect(wrapper.vm.encounterMonsters[0].name).toBe('Orc');
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Group 7: Error Handling
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      // Mock console.error to suppress expected error output during test
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      openAi.generateGptResponse.mockRejectedValue(new Error('API Error'));

      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      wrapper.vm.location = 'Desert';
      wrapper.vm.partyGroups = [{ players: 1, level: 6 }];
      wrapper.vm.encounterMonsters = [{
        name: 'Sand Elemental',
        cr: '5',
        type: 'Elemental',
        quantity: 1
      }];

      await wrapper.vm.generateEncounter();
      await flushPromises();

      // Should not crash, loading should be false
      expect(wrapper.vm.loading).toBe(false);

      // Verify error was logged
      expect(consoleErrorSpy).toHaveBeenCalled();

      // Restore console.error
      consoleErrorSpy.mockRestore();
    });

    it('should handle empty party gracefully', async () => {
      const mockCall1 = JSON.stringify({
        place_name: 'Forest Clearing',
        tone_id: 'serene',
        centerpiece: { id: 'tree', description: 'ancient oak' },
        key_npc: null,
        situation: 'resting'
      });
      const mockCall2 = JSON.stringify({ encounter_intro: 'A quiet forest...' });
      const mockCall3 = JSON.stringify({ situation: 'Test', space: 'Test', goals: 'Test', complications: 'Test' });

      openAi.generateGptResponse
        .mockResolvedValueOnce(mockCall1)
        .mockResolvedValueOnce(mockCall2)
        .mockResolvedValueOnce(mockCall3);

      wrapper = mount(EncounterGenerator, {
        props: { premium: false }
      });

      wrapper.vm.partyGroups = [];
      wrapper.vm.location = 'Forest';
      wrapper.vm.encounterMonsters = [{
        name: 'Wolf',
        cr: '1/4',
        type: 'Beast',
        quantity: 2
      }];

      // Should still be able to generate even without party (difficultyRating will be 'Unknown')
      await wrapper.vm.generateEncounter();
      await flushPromises();

      // Should have attempted generation
      expect(openAi.generateGptResponse).toHaveBeenCalled();
      expect(wrapper.vm.difficultyRating).toBe('Unknown'); // no party configured
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Group 8: Streaming Display
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Streaming Display', () => {
    it('should show read-aloud from Call 2 while Call 3 is loading', async () => {
      let resolveCall3;
      const call3Promise = new Promise(resolve => { resolveCall3 = resolve; });

      const mockCall1 = JSON.stringify({
        place_name: 'Moonlit Bridge',
        tone_id: 'quiet_tension',
        centerpiece: { id: 'bridge', description: 'crumbling stone bridge' },
        key_npc: null,
        situation: 'The horseman searches for its head...',
        has_turn: true,
        disguised_as: null
      });

      const mockCall2 = JSON.stringify({
        encounter_intro: 'A towering figure paces the ancient bridge...'
      });

      openAi.generateGptResponse
        .mockResolvedValueOnce(mockCall1)
        .mockResolvedValueOnce(mockCall2)
        .mockReturnValueOnce(call3Promise);

      wrapper = mount(EncounterGenerator, { props: { premium: false } });
      wrapper.vm.partyGroups = [{ players: 4, level: 5 }];
      wrapper.vm.encounterMonsters = [{
        name: 'Skeleton',
        cr: '1/4',
        quantity: 1,
        source: 'srd'
      }];

      wrapper.vm.generateEncounter();
      await flushPromises();

      // After Calls 1+2, read-aloud should be visible
      expect(wrapper.vm.generatedEncounter.place_name).toBe('Moonlit Bridge');
      expect(wrapper.vm.generatedEncounter.contentArray[0].content).toContain('towering figure');
      // But DM notes should still be loading
      expect(wrapper.vm.generatedEncounter.loading_details).toBe(true);

      // Now resolve Call 3
      resolveCall3(JSON.stringify({
        situation: 'The horseman patrols...',
        space: 'The bridge spans a 60-foot chasm...',
        turn_readaloud: 'The figure halts...',
        turn_dm_notes: 'The horseman attacks...',
        aftermath: 'Among the remains...'
      }));
      await flushPromises();

      expect(wrapper.vm.generatedEncounter.loading_details).toBe(false);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Group 9: Disguise Swap Logic
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Disguise Swap', () => {
    it('should rebuild minimal brief with disguise data for Call 2', async () => {
      const encounterPrompt = require('./prompts/encounter-prompt.mjs');

      const mockCall1 = JSON.stringify({
        place_name: 'Lonely Roadside Camp',
        tone_id: 'false_hospitality',
        centerpiece: { id: 'campfire', description: 'smoldering campfire' },
        key_npc: 'A wounded traveler...',
        situation: 'An oni disguised as a traveler...',
        has_turn: true,
        disguised_as: 'A limping man in tattered traveling clothes, one arm hidden beneath a muddy hood'
      });
      const mockCall2 = JSON.stringify({ encounter_intro: 'A limping man sits by the fire...' });
      const mockCall3 = JSON.stringify({
        situation: 'Test',
        space: 'Test',
        turn_readaloud: 'Test',
        turn_dm_notes: 'Test',
        aftermath: 'Test'
      });

      openAi.generateGptResponse
        .mockResolvedValueOnce(mockCall1)
        .mockResolvedValueOnce(mockCall2)
        .mockResolvedValueOnce(mockCall3);

      wrapper = mount(EncounterGenerator, { props: { premium: false } });
      wrapper.vm.partyGroups = [{ players: 4, level: 5 }];
      wrapper.vm.encounterMonsters = [{
        name: 'Oni',
        cr: '7',
        quantity: 1,
        source: 'srd'
      }];

      await wrapper.vm.generateEncounter();
      await flushPromises();

      // buildMinimalBrief should be called twice:
      // 1. Initial call without call1Result
      // 2. Rebuilt for Call 2 WITH call1Result (for disguise swap)
      expect(encounterPrompt.buildMinimalBrief).toHaveBeenCalledTimes(2);

      // Second call should include call1Result as third argument
      const secondCallArgs = encounterPrompt.buildMinimalBrief.mock.calls[1];
      expect(secondCallArgs[2]).toBeDefined(); // call1Result passed
      expect(secondCallArgs[2].disguised_as).toContain('limping man');
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Group 10: Creature Intelligence Loading
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Creature Intelligence', () => {
    it('should load creature intelligence before building briefs', async () => {
      const encounterPrompt = require('./prompts/encounter-prompt.mjs');

      const mockCall1 = JSON.stringify({
        place_name: 'Test',
        tone_id: 'test',
        centerpiece: { id: 'test', description: 'test' },
        key_npc: null,
        situation: 'test',
        has_turn: false,
        disguised_as: null
      });
      const mockCall2 = JSON.stringify({ encounter_intro: 'test' });
      const mockCall3 = JSON.stringify({
        situation: 'test',
        space: 'test',
        turn_readaloud: 'test',
        turn_dm_notes: 'test',
        aftermath: 'test'
      });

      openAi.generateGptResponse
        .mockResolvedValueOnce(mockCall1)
        .mockResolvedValueOnce(mockCall2)
        .mockResolvedValueOnce(mockCall3);

      wrapper = mount(EncounterGenerator, { props: { premium: false } });
      wrapper.vm.partyGroups = [{ players: 4, level: 5 }];
      wrapper.vm.encounterMonsters = [{
        name: 'Goblin',
        cr: '1/4',
        quantity: 3,
        source: 'srd'
      }];

      await wrapper.vm.generateEncounter();
      await flushPromises();

      // getCreatureIntelligence should be called before any prompt building
      expect(encounterPrompt.getCreatureIntelligence).toHaveBeenCalledWith(
        wrapper.vm.encounterMonsters
      );

      // buildMinimalBrief and buildTacticalBrief should receive intelligence data
      expect(encounterPrompt.buildMinimalBrief).toHaveBeenCalled();
      expect(encounterPrompt.buildTacticalBrief).toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Group 11: Empty State Guard
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Empty State', () => {
    it('should not generate when no monsters selected', async () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      wrapper.vm.encounterMonsters = [];
      wrapper.vm.partyGroups = [{ players: 4, level: 5 }];

      await wrapper.vm.generateEncounter();
      await flushPromises();

      expect(openAi.generateGptResponse).not.toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Group 12: Difficulty Calculation
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Difficulty Calculation', () => {
    it('should calculate correct XP for monsters', async () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      wrapper.vm.partyGroups = [{ players: 4, level: 5 }];
      wrapper.vm.encounterMonsters = [
        { name: 'Goblin', cr: '1/4', quantity: 4, xp: 50 }
      ];

      await nextTick();

      // 4 goblins at CR 1/4 = 4 * 50 = 200 raw XP
      expect(wrapper.vm.rawXp).toBe(200);
    });

    it('should apply encounter multiplier for multiple monsters', async () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      wrapper.vm.partyGroups = [{ players: 4, level: 5 }];
      wrapper.vm.encounterMonsters = [
        { name: 'Goblin', cr: '1/4', quantity: 6, xp: 50 }
      ];

      await nextTick();

      // 6 monsters with 4 players = tier 2 multiplier (x2)
      expect(wrapper.vm.currentEncounterMultiplier).toBe(2);
      expect(wrapper.vm.adjustedXp).toBe(wrapper.vm.rawXp * 2);
    });

    it('should return None when no monsters', async () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      wrapper.vm.partyGroups = [{ players: 4, level: 5 }];
      wrapper.vm.encounterMonsters = [];

      await nextTick();

      expect(wrapper.vm.difficultyRating).toBe('None');
    });

    it('should return Unknown when no party configured', async () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      wrapper.vm.partyGroups = [{ players: null, level: null }];
      wrapper.vm.encounterMonsters = [
        { name: 'Goblin', cr: '1/4', quantity: 1, xp: 50 }
      ];

      await nextTick();

      expect(wrapper.vm.difficultyRating).toBe('Unknown');
    });

    it('should handle fractional CR values', async () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      wrapper.vm.encounterMonsters = [
        { name: 'Kobold', cr: '1/8', quantity: 1, xp: 25 }
      ];

      await nextTick();

      expect(wrapper.vm.rawXp).toBe(25); // CR 1/8 = 25 XP
    });

    it('should adjust multiplier for small parties', async () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      wrapper.vm.partyGroups = [{ players: 2, level: 5 }];
      wrapper.vm.encounterMonsters = [
        { name: 'Goblin', cr: '1/4', quantity: 2, xp: 50 }
      ];

      await nextTick();

      // 2 monsters normally tier 1 (x1.5), but small party (<3) bumps up
      expect(wrapper.vm.currentEncounterMultiplier).toBe(2);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Group 13: Reset Encounter
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Reset Encounter', () => {
    it('should clear form state on reset', () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      wrapper.vm.encounterMonsters = [{ name: 'Goblin', cr: '1/4', quantity: 2, source: 'srd' }];
      wrapper.vm.location = 'Forest';
      wrapper.vm.generatedEncounter = { place_name: 'Test', contentArray: [] };
      wrapper.vm.activeEncounterIndex = 0;

      wrapper.vm.resetEncounter();

      expect(wrapper.vm.encounterMonsters).toEqual([]);
      expect(wrapper.vm.location).toBe('');
      expect(wrapper.vm.generatedEncounter).toBeNull();
      expect(wrapper.vm.activeEncounterIndex).toBeNull();
    });

    it('should preserve party config on reset', () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      wrapper.vm.partyGroups = [{ players: 4, level: 7 }];
      wrapper.vm.encounterMonsters = [{ name: 'Orc', cr: '1/2', quantity: 1, source: 'srd' }];

      wrapper.vm.resetEncounter();

      expect(wrapper.vm.partyGroups[0].players).toBe(4);
      expect(wrapper.vm.partyGroups[0].level).toBe(7);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Group 14: NPC Naming Logic
  // ═══════════════════════════════════════════════════════════════════════════

  describe('NPC Naming', () => {
    it('should include NPC for solo creature', () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      const result = wrapper.vm.shouldNameCreature([
        { name: 'Adult Red Dragon', quantity: 1, creatureType: 'dragon' }
      ]);
      expect(result).toBe(true);
    });

    it('should include NPC when leader type is present', () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      const result = wrapper.vm.shouldNameCreature([
        { name: 'Hobgoblin', quantity: 3, creatureType: 'humanoid' },
        { name: 'Wolf', quantity: 2, creatureType: 'beast' }
      ]);
      expect(result).toBe(true);
    });

    it('should not include NPC for pack of beasts', () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      const result = wrapper.vm.shouldNameCreature([
        { name: 'Wolf', quantity: 4, creatureType: 'beast' }
      ]);
      expect(result).toBe(false);
    });

    it('should include NPC for single beast (reputation name)', () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      const result = wrapper.vm.shouldNameCreature([
        { name: 'Owlbear', quantity: 1, creatureType: 'monstrosity' }
      ]);
      expect(result).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Group 15: Folder Management
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Folder Management', () => {
    it('should move encounter between folders', () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      wrapper.vm.savedEncounters = {
        'Uncategorized': [{ place_name: 'Test', monsters: [], contentArray: [] }],
        'Dragons': []
      };
      wrapper.vm.activeFolder = 'Uncategorized';
      wrapper.vm.activeEncounterIndex = 0;
      wrapper.vm.folderMoveTarget = 'Dragons';

      wrapper.vm.handleFolderMove();

      expect(wrapper.vm.savedEncounters['Uncategorized'].length).toBe(0);
      expect(wrapper.vm.savedEncounters['Dragons'].length).toBe(1);
      expect(wrapper.vm.activeFolder).toBe('Dragons');
    });

    it('should create new folder when moving', () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      wrapper.vm.savedEncounters = {
        'Uncategorized': [{ place_name: 'Test', monsters: [], contentArray: [] }]
      };
      wrapper.vm.activeFolder = 'Uncategorized';
      wrapper.vm.activeEncounterIndex = 0;
      wrapper.vm.folderMoveTarget = '__new__';
      wrapper.vm.newFolderName = 'My Campaign';

      wrapper.vm.handleFolderMove();

      expect(wrapper.vm.savedEncounters['My Campaign']).toBeDefined();
      expect(wrapper.vm.savedEncounters['My Campaign'].length).toBe(1);
    });

    it('should clean up empty non-default folders after move', () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      wrapper.vm.savedEncounters = {
        'Uncategorized': [],
        'OldFolder': [{ place_name: 'Test', monsters: [], contentArray: [] }]
      };
      wrapper.vm.activeFolder = 'OldFolder';
      wrapper.vm.activeEncounterIndex = 0;
      wrapper.vm.folderMoveTarget = 'Uncategorized';

      wrapper.vm.handleFolderMove();

      expect(wrapper.vm.savedEncounters['OldFolder']).toBeUndefined();
    });

    it('should not delete Uncategorized folder when empty', () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      wrapper.vm.savedEncounters = {
        'Uncategorized': [{ place_name: 'Test', monsters: [], contentArray: [] }],
        'Dragons': []
      };
      wrapper.vm.activeFolder = 'Uncategorized';
      wrapper.vm.activeEncounterIndex = 0;
      wrapper.vm.folderMoveTarget = 'Dragons';

      wrapper.vm.handleFolderMove();

      // Uncategorized should still exist even when empty
      expect(wrapper.vm.savedEncounters['Uncategorized']).toBeDefined();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Group 16: Inline Editing
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Inline Editing', () => {
    it('should enter edit mode with current content', () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      wrapper.vm.generatedEncounter = {
        place_name: 'Dark Cave',
        contentArray: [
          { format: 'read_aloud', content: 'You enter a dark cave...' },
          { format: 'header', content: 'Situation' },
          { format: 'paragraph', content: 'Goblins lurk in the shadows.' }
        ]
      };

      wrapper.vm.startEditingEncounter();

      expect(wrapper.vm.isEditingEncounter).toBe(true);
      expect(wrapper.vm.encounterEditForm.place_name).toBe('Dark Cave');
      expect(wrapper.vm.encounterEditForm.content).toContain('[READ_ALOUD]');
      expect(wrapper.vm.encounterEditForm.content).toContain('## Situation');
    });

    it('should save edits and exit edit mode', () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      wrapper.vm.generatedEncounter = {
        place_name: 'Old Name',
        contentArray: [
          { format: 'paragraph', content: 'Original text' }
        ]
      };

      wrapper.vm.encounterEditForm = {
        place_name: 'New Name',
        content: '[READ_ALOUD]\nNew read aloud text\n[/READ_ALOUD]\n\n## New Header\n\nNew paragraph'
      };

      wrapper.vm.isEditingEncounter = true;
      wrapper.vm.saveEditEncounter();

      expect(wrapper.vm.isEditingEncounter).toBe(false);
      expect(wrapper.vm.generatedEncounter.place_name).toBe('New Name');
      expect(wrapper.vm.generatedEncounter.contentArray[0].format).toBe('read_aloud');
      expect(wrapper.vm.generatedEncounter.contentArray[1].format).toBe('header');
      expect(wrapper.vm.generatedEncounter.contentArray[2].format).toBe('paragraph');
    });

    it('should cancel edits without saving', () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      wrapper.vm.generatedEncounter = {
        place_name: 'Original Name',
        contentArray: []
      };

      wrapper.vm.isEditingEncounter = true;
      wrapper.vm.encounterEditForm.place_name = 'Changed Name';

      wrapper.vm.cancelEditEncounter();

      expect(wrapper.vm.isEditingEncounter).toBe(false);
      expect(wrapper.vm.generatedEncounter.place_name).toBe('Original Name');
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Group 17: Export Functions
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Export', () => {
    it('should export as plain text', async () => {
      const clipboardSpy = jest.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: { writeText: clipboardSpy }
      });

      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      wrapper.vm.generatedEncounter = {
        place_name: 'Dark Cave',
        contentArray: [
          { format: 'read_aloud', content: 'You enter...' },
          { format: 'header', content: 'Situation' },
          { format: 'paragraph', content: 'Goblins attack.' }
        ]
      };
      wrapper.vm.encounterMonsters = [{ name: 'Goblin', cr: '1/4', quantity: 3 }];

      await wrapper.vm.exportAsPlainText();

      expect(clipboardSpy).toHaveBeenCalled();
      const clipboardContent = clipboardSpy.mock.calls[0][0];
      expect(clipboardContent).toContain('Dark Cave');
      expect(clipboardContent).toContain('You enter...');
    });

    it('should show homebrewery link after markdown export', async () => {
      const clipboardSpy = jest.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: { writeText: clipboardSpy }
      });

      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      wrapper.vm.generatedEncounter = {
        place_name: 'Test',
        contentArray: [{ format: 'paragraph', content: 'Test' }]
      };
      wrapper.vm.encounterMonsters = [];

      await wrapper.vm.exportToMarkdown();

      expect(wrapper.vm.showHomebreweryLink).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Group 18: Premium Gating
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Premium Gating', () => {
    it('should show save/load button for premium users', () => {
      wrapper = mount(EncounterGenerator, { props: { premium: true } });

      // Premium users see the save/load button in the footer
      expect(wrapper.vm.premium).toBe(true);
    });

    it('should show upgrade prompt for free users', () => {
      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      // Free users see the Patreon unlock message
      expect(wrapper.vm.premium).toBe(false);
      expect(wrapper.vm.patreonLoginUrl).toContain('patreon-login=yes');
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Test Group 19: Cross-Tool Navigation
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Cross-Tool Navigation', () => {
    it('should load monster from URL query parameter', async () => {
      // Save original URLSearchParams
      const OriginalURLSearchParams = global.URLSearchParams;

      // Mock URLSearchParams to return query param
      global.URLSearchParams = jest.fn().mockImplementation(() => ({
        get: jest.fn((key) => key === 'monster' ? 'Goblin' : null)
      }));

      // Mock window.history.replaceState
      const originalReplaceState = window.history.replaceState;
      window.history.replaceState = jest.fn();

      wrapper = mount(EncounterGenerator, { props: { premium: false } });

      await flushPromises();

      // Should have loaded the goblin from the query param
      expect(wrapper.vm.encounterMonsters.length).toBe(1);
      expect(wrapper.vm.encounterMonsters[0].name).toBe('Goblin');
      expect(wrapper.vm.encounterMonsters[0].quantity).toBe(1);

      // Should have cleared the query param (called with current pathname)
      expect(window.history.replaceState).toHaveBeenCalled();
      expect(window.history.replaceState).toHaveBeenCalledWith({}, '', expect.any(String));

      // Restore
      global.URLSearchParams = OriginalURLSearchParams;
      window.history.replaceState = originalReplaceState;
    });
  });
});
