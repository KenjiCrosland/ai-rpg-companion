/**
 * CRITICAL: Local Storage Data Layer Tests
 *
 * These tests ensure that dungeon data is correctly persisted to and retrieved from
 * browser localStorage. This is CRITICAL because paying users have saved content
 * that must never be corrupted or lost.
 */

// Mock all API-related modules BEFORE importing the store
jest.mock('@/util/open-ai.mjs', () => ({
  generateGptResponse: jest.fn(),
}));

jest.mock('../stores/overview-store.mjs', () => ({
  generateDungeonOverview: jest.fn(),
  currentDungeonOverviewString: { value: '' },
}));

jest.mock('../stores/map-store.mjs', () => ({
  generateMap: jest.fn(),
  handleUpdateRoomDescription: jest.fn(),
}));

jest.mock('../stores/npc-store.mjs', () => ({
  generateDungeonNPC: jest.fn(),
  deleteNPC: jest.fn(),
  addNPC: jest.fn(),
  npcStatblockLoadingStates: { value: {} },
  generateNPCStatblock: jest.fn(),
}));

jest.mock('../stores/monster-store.mjs', () => ({
  createAndGenerateMonster: jest.fn(),
  generateMonsterStatblock: jest.fn(),
  generateAndSaveStatblock: jest.fn(),
  updateStatblock: jest.fn(),
  generateMonsterDescription: jest.fn(),
  generateDescriptionAndStatblock: jest.fn(),
  deleteMonster: jest.fn(),
}));

import { setActivePinia, createPinia } from 'pinia';
import { useDungeonStore } from '../stores/dungeon-store.mjs';
import sampleDungeons from './fixtures/sample-dungeons.json';

// Mock localStorage with an in-memory implementation
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }

  get length() {
    return Object.keys(this.store).length;
  }
}

describe('Dungeon Store - Local Storage Data Layer (CRITICAL)', () => {
  let store;
  let localStorageMock;

  beforeEach(() => {
    // Create fresh localStorage mock
    localStorageMock = new LocalStorageMock();
    global.localStorage = localStorageMock;

    // Create fresh Pinia instance and store for each test
    setActivePinia(createPinia());
    store = useDungeonStore();

    // Clear the dungeons state
    store.dungeons = [];
    store.currentDungeonId = null;
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  describe('saveDungeons()', () => {
    it('should save dungeons array to localStorage under "dungeons" key', () => {
      store.dungeons = [...sampleDungeons];

      store.saveDungeons();

      const savedData = localStorage.getItem('dungeons');
      expect(savedData).toBeTruthy();
      expect(typeof savedData).toBe('string');

      const parsed = JSON.parse(savedData);
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed).toHaveLength(2);
    });

    it('should preserve complete dungeon structure when saving', () => {
      store.dungeons = [...sampleDungeons];

      store.saveDungeons();

      const savedData = JSON.parse(localStorage.getItem('dungeons'));
      const firstDungeon = savedData[0];

      // Verify critical fields are present
      expect(firstDungeon).toHaveProperty('id');
      expect(firstDungeon).toHaveProperty('dungeonOverview');
      expect(firstDungeon).toHaveProperty('npcs');
      expect(firstDungeon).toHaveProperty('rooms');
      expect(firstDungeon).toHaveProperty('monsters');

      // Verify dungeonOverview structure
      expect(firstDungeon.dungeonOverview).toHaveProperty('name');
      expect(firstDungeon.dungeonOverview).toHaveProperty('overview');
      expect(firstDungeon.dungeonOverview).toHaveProperty('difficulty_level');
    });

    it('should preserve NPCs with all their fields', () => {
      store.dungeons = [...sampleDungeons];

      store.saveDungeons();

      const savedData = JSON.parse(localStorage.getItem('dungeons'));
      const npc = savedData[0].npcs[0];

      expect(npc).toHaveProperty('id');
      expect(npc).toHaveProperty('name');
      expect(npc).toHaveProperty('short_description');
      expect(npc).toHaveProperty('relationships');
    });

    it('should preserve rooms with content arrays', () => {
      store.dungeons = [...sampleDungeons];

      store.saveDungeons();

      const savedData = JSON.parse(localStorage.getItem('dungeons'));
      const room = savedData[0].rooms[0];

      expect(room).toHaveProperty('id');
      expect(room).toHaveProperty('name');
      expect(room).toHaveProperty('contentArray');
      expect(Array.isArray(room.contentArray)).toBe(true);
      expect(room.contentArray[0]).toHaveProperty('format');
      expect(room.contentArray[0]).toHaveProperty('content');
    });

    it('should preserve monsters with their structure', () => {
      store.dungeons = [...sampleDungeons];

      store.saveDungeons();

      const savedData = JSON.parse(localStorage.getItem('dungeons'));
      const monster = savedData[0].monsters[0];

      expect(monster).toHaveProperty('id');
      expect(monster).toHaveProperty('name');
      expect(monster).toHaveProperty('description');
      expect(monster).toHaveProperty('detailedDescription');
      expect(monster).toHaveProperty('statblock');
    });

    it('should handle empty dungeons array', () => {
      store.dungeons = [];

      store.saveDungeons();

      const savedData = localStorage.getItem('dungeons');
      expect(savedData).toBe('[]');
    });

    it('should overwrite existing localStorage data', () => {
      localStorage.setItem('dungeons', JSON.stringify([{id: 'old-dungeon'}]));

      store.dungeons = [...sampleDungeons];
      store.saveDungeons();

      const savedData = JSON.parse(localStorage.getItem('dungeons'));
      expect(savedData).toHaveLength(2);
      expect(savedData[0].id).toBe('dungeon-1');
    });
  });

  describe('loadDungeons()', () => {
    it('should load dungeons from localStorage into store', () => {
      localStorage.setItem('dungeons', JSON.stringify(sampleDungeons));

      store.loadDungeons();

      expect(store.dungeons).toHaveLength(2);
      expect(store.dungeons[0].id).toBe('dungeon-1');
      expect(store.dungeons[1].id).toBe('dungeon-2');
    });

    it('should set currentDungeonId to first dungeon when loading', () => {
      localStorage.setItem('dungeons', JSON.stringify(sampleDungeons));

      store.loadDungeons();

      expect(store.currentDungeonId).toBe('dungeon-1');
    });

    it('should not throw when localStorage is empty', () => {
      // Ensure localStorage is truly empty
      localStorageMock.clear();

      // Should not throw an error
      expect(() => store.loadDungeons()).not.toThrow();
    });

    it('should handle corrupted JSON gracefully', () => {
      localStorage.setItem('dungeons', '{invalid json');

      // Should not throw, but should reset to empty array
      expect(() => store.loadDungeons()).not.toThrow();
      expect(store.dungeons).toEqual([]);
    });

    it('should preserve all dungeon properties after load', () => {
      localStorage.setItem('dungeons', JSON.stringify(sampleDungeons));

      store.loadDungeons();

      const loadedDungeon = store.dungeons[0];

      // Verify structure is intact
      expect(loadedDungeon.dungeonOverview.name).toBe('The Forgotten Temple');
      expect(loadedDungeon.npcs).toHaveLength(1);
      expect(loadedDungeon.rooms).toHaveLength(1);
      expect(loadedDungeon.monsters).toHaveLength(1);
    });

    it('should handle dungeons with missing optional fields', () => {
      const minimalDungeon = [{
        id: 'minimal',
        dungeonOverview: {
          name: 'Minimal',
          overview: '',
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
          difficulty_level: 'Tier 1'
        },
        npcs: [],
        rooms: [],
        monsters: []
      }];

      localStorage.setItem('dungeons', JSON.stringify(minimalDungeon));

      store.loadDungeons();

      expect(store.dungeons).toHaveLength(1);
      expect(store.dungeons[0].id).toBe('minimal');
    });
  });

  describe('deleteDungeon()', () => {
    beforeEach(() => {
      store.dungeons = [...sampleDungeons];
      store.currentDungeonId = 'dungeon-1';
    });

    it('should remove dungeon from array and save to localStorage', () => {
      store.deleteDungeon('dungeon-1');

      // Check in-memory state
      expect(store.dungeons).toHaveLength(1);
      expect(store.dungeons[0].id).toBe('dungeon-2');

      // Check localStorage persistence
      const savedData = JSON.parse(localStorage.getItem('dungeons'));
      expect(savedData).toHaveLength(1);
      expect(savedData[0].id).toBe('dungeon-2');
    });

    it('should update currentDungeonId when deleting current dungeon', () => {
      store.deleteDungeon('dungeon-1');

      expect(store.currentDungeonId).toBe('dungeon-2');
    });

    it('should set currentDungeonId to null when deleting last dungeon', () => {
      store.deleteDungeon('dungeon-1');
      store.deleteDungeon('dungeon-2');

      expect(store.currentDungeonId).toBeNull();
      expect(store.dungeons).toHaveLength(0);
    });

    it('should not affect other dungeons when deleting one', () => {
      const dungeon2Before = JSON.parse(JSON.stringify(store.dungeons[1]));

      store.deleteDungeon('dungeon-1');

      const dungeon2After = store.dungeons[0];
      expect(dungeon2After).toEqual(dungeon2Before);
    });

    it('should handle deleting non-existent dungeon gracefully', () => {
      const lengthBefore = store.dungeons.length;

      store.deleteDungeon('non-existent-id');

      expect(store.dungeons).toHaveLength(lengthBefore);
    });

    it('should reset activeTabIndex when deleting dungeon', () => {
      store.activeTabIndex = 2;

      store.deleteDungeon('dungeon-1');

      expect(store.activeTabIndex).toBe(0);
    });
  });

  describe('deleteAllDungeons()', () => {
    beforeEach(() => {
      store.dungeons = [...sampleDungeons];
      store.currentDungeonId = 'dungeon-1';
    });

    it('should clear all dungeons from memory and localStorage', () => {
      store.deleteAllDungeons();

      // Check in-memory state
      expect(store.dungeons).toEqual([]);
      expect(store.currentDungeonId).toBeNull();

      // Check localStorage persistence
      const savedData = JSON.parse(localStorage.getItem('dungeons'));
      expect(savedData).toEqual([]);
    });

    it('should be safe to call multiple times', () => {
      store.deleteAllDungeons();
      store.deleteAllDungeons();

      expect(store.dungeons).toEqual([]);
      expect(store.currentDungeonId).toBeNull();
    });
  });

  describe('Data Integrity - Round-trip', () => {
    it('should preserve data through save-load cycle', () => {
      const originalDungeons = [...sampleDungeons];
      store.dungeons = originalDungeons;

      // Save
      store.saveDungeons();

      // Clear in-memory state
      store.dungeons = [];
      store.currentDungeonId = null;

      // Load
      store.loadDungeons();

      // Verify data is identical
      expect(store.dungeons).toEqual(originalDungeons);
    });

    it('should preserve nested object structures', () => {
      const dungeonWithStatblock = {
        id: 'test-dungeon',
        dungeonOverview: {
          name: 'Test',
          overview: 'Test overview',
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
          difficulty_level: 'Tier 1'
        },
        npcs: [],
        rooms: [],
        monsters: [{
          id: 'm1',
          name: 'Goblin',
          description: 'A goblin',
          detailedDescription: null,
          statblock: {
            name: 'Goblin',
            type_and_alignment: 'Small humanoid, neutral evil',
            armor_class: '15',
            hit_points: '7 (2d6)',
            speed: '30 ft.',
            attributes: 'STR 8 (-1), DEX 14 (+2), CON 10 (+0), INT 10 (+0), WIS 8 (-1), CHA 8 (-1)',
            saving_throws: '',
            skills: 'Stealth +6',
            damage_resistances: '',
            damage_immunities: '',
            condition_immunities: '',
            senses: 'darkvision 60 ft.',
            languages: 'Common, Goblin',
            challenge_rating: '1/4 (50 XP)',
            proficiency_bonus: '+2',
            abilities: [],
            actions: [{
              name: 'Scimitar',
              description: 'Melee attack: +4 to hit, 5 (1d6+2) slashing damage'
            }],
            legendary_actions: []
          }
        }]
      };

      store.dungeons = [dungeonWithStatblock];
      store.saveDungeons();

      store.dungeons = [];
      store.loadDungeons();

      const loadedMonster = store.dungeons[0].monsters[0];
      expect(loadedMonster.statblock).toBeDefined();
      expect(loadedMonster.statblock.name).toBe('Goblin');
      expect(loadedMonster.statblock.actions).toHaveLength(1);
      expect(loadedMonster.statblock.actions[0].name).toBe('Scimitar');
    });
  });

  describe('Edge Cases', () => {
    it('should handle dungeon with null NPCs array', () => {
      const dungeonWithNullNPCs = {
        ...sampleDungeons[0],
        npcs: null
      };

      store.dungeons = [dungeonWithNullNPCs];
      store.saveDungeons();
      store.dungeons = [];
      store.loadDungeons();

      expect(store.dungeons[0].npcs).toBeNull();
    });

    it('should handle dungeon with undefined monsters array', () => {
      const dungeonWithNoMonsters = {
        ...sampleDungeons[0]
      };
      delete dungeonWithNoMonsters.monsters;

      store.dungeons = [dungeonWithNoMonsters];
      store.saveDungeons();
      store.dungeons = [];
      store.loadDungeons();

      expect(store.dungeons[0].monsters).toBeUndefined();
    });

    it('should handle very large dungeon arrays', () => {
      const largeDungeonArray = Array.from({ length: 100 }, (_, i) => ({
        ...sampleDungeons[0],
        id: `dungeon-${i}`
      }));

      store.dungeons = largeDungeonArray;

      expect(() => store.saveDungeons()).not.toThrow();

      store.dungeons = [];
      store.loadDungeons();

      expect(store.dungeons).toHaveLength(100);
    });

    it('should handle dungeon with special characters in strings', () => {
      const dungeonWithSpecialChars = {
        ...sampleDungeons[0],
        dungeonOverview: {
          ...sampleDungeons[0].dungeonOverview,
          name: 'The "Forgotten" Temple & Cave\nWith\tTabs',
          overview: "It's got quotes & symbols: <>&"
        }
      };

      store.dungeons = [dungeonWithSpecialChars];
      store.saveDungeons();
      store.dungeons = [];
      store.loadDungeons();

      expect(store.dungeons[0].dungeonOverview.name).toBe('The "Forgotten" Temple & Cave\nWith\tTabs');
      expect(store.dungeons[0].dungeonOverview.overview).toBe("It's got quotes & symbols: <>&");
    });
  });
});
