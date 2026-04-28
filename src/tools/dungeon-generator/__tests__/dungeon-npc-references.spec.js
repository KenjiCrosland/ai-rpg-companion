/**
 * @jest-environment jsdom
 */

import { ref } from 'vue';

// Mock reference storage BEFORE importing anything that uses it
jest.mock('@/util/reference-storage.mjs', () => ({
  addReference: jest.fn(() => 'ref_123'),
  getReferencesForEntity: jest.fn(() => []),
  removeReference: jest.fn(() => true)
}));

// Now import the modules that use reference-storage
import * as referenceStorage from '@/util/reference-storage.mjs';
import { generateNPCStatblock } from '../stores/npc-store.mjs';
import { loadDungeons, saveDungeons } from '../stores/dungeon-utils.mjs';
import { dungeons, currentDungeon, currentDungeonId } from '../stores/dungeon-state.mjs';

// Mock dependencies
jest.mock('@/util/ai-client.mjs', () => ({
  generateGptResponse: jest.fn()
}));

jest.mock('@/util/statblock-storage.mjs', () => ({
  saveStatblockToStorage: jest.fn(),
  getStatblockFromStorage: jest.fn()
}));

jest.mock('@/util/npc-storage.mjs', () => ({
  saveNPCToStorage: jest.fn(),
  dungeonNPCToCanonical: jest.fn((npc) => ({
    npc_id: npc.npc_id,
    npcDescriptionPart1: {
      character_name: npc.name
    }
  }))
}));

jest.mock('@/composables/useToast.js', () => ({
  useToast: () => ({
    success: jest.fn(),
    error: jest.fn()
  })
}));

jest.mock('@/util/can-generate-statblock.mjs', () => ({
  canGenerateStatblock: jest.fn(() => Promise.resolve(true))
}));

describe('Dungeon Generator - NPC Reference Creation', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();

    // Reset mock implementations
    referenceStorage.addReference.mockReturnValue('ref_123');
    referenceStorage.getReferencesForEntity.mockReturnValue([]);

    // Reset reactive state (currentDungeon is computed from dungeons and currentDungeonId)
    dungeons.value = [];
    currentDungeonId.value = null;
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Reference Creation on NPC Statblock Generation
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Reference Creation on NPC Statblock Generation', () => {
    it('should create reference when generating statblock for dungeon NPC', async () => {
      const { generateGptResponse } = require('@/util/ai-client.mjs');

      // Mock statblock generation
      generateGptResponse
        .mockResolvedValueOnce(JSON.stringify({
          armor_class: '15',
          hit_points: '50',
          speed: '30 ft.',
          senses: 'passive Perception 12',
          languages: 'Common',
          challenge_rating: '3',
          proficiency_bonus: '+2',
          abilities: []
        }))
        .mockResolvedValueOnce(JSON.stringify({
          actions: []
        }));

      // Set up dungeon with NPC
      const testDungeon = {
        id: 'dungeon_1',
        dungeonOverview: {
          name: 'Test Dungeon'
        },
        npcs: [
          {
            npc_id: 'npc_dungeon_123',
            name: 'Dungeon NPC',
            read_aloud_description: 'A mysterious figure'
          }
        ]
      };
      dungeons.value = [testDungeon];
      currentDungeonId.value = 'dungeon_1';

      // Generate statblock for NPC
      await generateNPCStatblock(0, {
        CR: '3',
        monsterType: 'Humanoid',
        isSpellcaster: false,
        premium: true
      });

      // Wait for async operations and dynamic import to complete
      await new Promise(resolve => setTimeout(resolve, 100));

      // Should have created a reference
      expect(referenceStorage.addReference).toHaveBeenCalledWith(
        expect.objectContaining({
          source_type: 'npc',
          source_id: 'npc_dungeon_123',
          source_name: 'Dungeon NPC',
          target_type: 'statblock',
          target_id: expect.stringMatching(/^.*__Test Dungeon$/),
          relationship: 'has_statblock'
        })
      );
    });

    it('should not create reference if NPC has no read_aloud_description', async () => {
      const { generateGptResponse } = require('@/util/ai-client.mjs');

      generateGptResponse
        .mockResolvedValueOnce(JSON.stringify({
          armor_class: '15',
          hit_points: '50',
          speed: '30 ft.',
          senses: 'passive Perception 12',
          languages: 'Common',
          challenge_rating: '3',
          proficiency_bonus: '+2',
          abilities: []
        }))
        .mockResolvedValueOnce(JSON.stringify({
          actions: []
        }));

      const testDungeon = {
        id: 'dungeon_1',
        dungeonOverview: {
          name: 'Test Dungeon'
        },
        npcs: [
          {
            npc_id: 'npc_stub',
            name: 'Stub NPC'
            // No read_aloud_description (stub NPC)
          }
        ]
      };
      dungeons.value = [testDungeon];
      currentDungeonId.value = 'dungeon_1';

      await generateNPCStatblock(0, {
        CR: '3',
        monsterType: 'Humanoid',
        isSpellcaster: false,
        premium: true
      });

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(referenceStorage.addReference).not.toHaveBeenCalled();
    });

    it('should auto-generate npc_id and create reference for legacy NPCs', async () => {
      const { generateGptResponse } = require('@/util/ai-client.mjs');

      generateGptResponse
        .mockResolvedValueOnce(JSON.stringify({
          name: 'Legacy NPC',
          armor_class: '15',
          hit_points: '50',
          speed: '30 ft.',
          senses: 'passive Perception 12',
          languages: 'Common',
          challenge_rating: '3',
          proficiency_bonus: '+2',
          abilities: []
        }))
        .mockResolvedValueOnce(JSON.stringify({
          actions: []
        }));

      const testDungeon = {
        id: 'dungeon_1',
        dungeonOverview: {
          name: 'Test Dungeon'
        },
        npcs: [
          {
            // No npc_id initially - will be auto-generated
            name: 'Legacy NPC',
            read_aloud_description: 'An old NPC'
          }
        ]
      };
      dungeons.value = [testDungeon];
      currentDungeonId.value = 'dungeon_1';

      await generateNPCStatblock(0, {
        CR: '3',
        monsterType: 'Humanoid',
        isSpellcaster: false,
        premium: true
      });

      await new Promise(resolve => setTimeout(resolve, 100));

      // Should have auto-generated an ID and created reference
      expect(referenceStorage.addReference).toHaveBeenCalledWith(
        expect.objectContaining({
          source_type: 'npc',
          source_id: expect.stringMatching(/^npc_/), // Auto-generated ID
          source_name: 'Legacy NPC',
          target_type: 'statblock',
          target_id: expect.stringMatching(/^Legacy NPC__Test Dungeon$/),
          relationship: 'has_statblock'
        })
      );
    });

    it('should use dungeon name as statblock folder', async () => {
      const { generateGptResponse } = require('@/util/ai-client.mjs');

      generateGptResponse
        .mockResolvedValueOnce(JSON.stringify({
          armor_class: '15',
          hit_points: '50',
          speed: '30 ft.',
          senses: 'passive Perception 12',
          languages: 'Common',
          challenge_rating: '3',
          proficiency_bonus: '+2',
          abilities: []
        }))
        .mockResolvedValueOnce(JSON.stringify({
          actions: []
        }));

      const testDungeon = {
        id: 'dungeon_1',
        dungeonOverview: {
          name: "Tariel's Cloister"
        },
        npcs: [
          {
            npc_id: 'npc_cloister_1',
            name: 'Zathira',
            read_aloud_description: 'A seer'
          }
        ]
      };
      dungeons.value = [testDungeon];
      currentDungeonId.value = 'dungeon_1';

      await generateNPCStatblock(0, {
        CR: '5',
        monsterType: 'Humanoid',
        isSpellcaster: true,
        premium: true
      });

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(referenceStorage.addReference).toHaveBeenCalledWith(
        expect.objectContaining({
          target_id: expect.stringMatching(/^.*__Tariel's Cloister$/)
        })
      );
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Migration on Dungeon Load
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Migration on Dungeon Load', () => {
    it('should create references for existing dungeon NPCs with statblocks', () => {
      // Set up dungeon with NPC that has statblock
      localStorage.setItem('dungeons', JSON.stringify([
        {
          id: 'dungeon_1',
          dungeonOverview: {
            name: 'Test Dungeon'
          },
          npcs: [
            {
              npc_id: 'npc_existing',
              name: 'Existing NPC',
              statblock_name: 'Existing NPC',
              statblock_folder: 'Test Dungeon',
              read_aloud_description: 'An NPC'
            }
          ]
        }
      ]));

      referenceStorage.getReferencesForEntity.mockReturnValue([]);

      // Load dungeons (triggers migration)
      loadDungeons(ref(null));

      // Should have created reference during migration
      expect(referenceStorage.addReference).toHaveBeenCalledWith(
        expect.objectContaining({
          source_type: 'npc',
          source_id: 'npc_existing',
          source_name: 'Existing NPC',
          target_type: 'statblock',
          target_id: 'Existing NPC__Test Dungeon',
          target_name: 'Existing NPC',
          relationship: 'has_statblock'
        })
      );
    });

    it('should not create duplicate references during migration', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        {
          id: 'dungeon_1',
          dungeonOverview: {
            name: 'Test Dungeon'
          },
          npcs: [
            {
              npc_id: 'npc_existing',
              name: 'Existing NPC',
              statblock_name: 'Existing NPC',
              statblock_folder: 'Test Dungeon'
            }
          ]
        }
      ]));

      // Mock existing reference
      referenceStorage.getReferencesForEntity.mockReturnValue([
        {
          relationship: 'has_statblock',
          target_type: 'statblock',
          target_id: 'Existing NPC__Test Dungeon'
        }
      ]);

      loadDungeons(ref(null));

      expect(referenceStorage.addReference).not.toHaveBeenCalled();
    });

    it('should skip NPCs without statblock references during migration', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        {
          id: 'dungeon_1',
          dungeonOverview: {
            name: 'Test Dungeon'
          },
          npcs: [
            {
              npc_id: 'npc_no_statblock',
              name: 'No Statblock NPC'
              // No statblock_name or statblock_folder
            }
          ]
        }
      ]));

      loadDungeons(ref(null));

      expect(referenceStorage.addReference).not.toHaveBeenCalled();
    });

    it('should skip NPCs without npc_id during migration', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        {
          id: 'dungeon_1',
          dungeonOverview: {
            name: 'Test Dungeon'
          },
          npcs: [
            {
              // No npc_id
              name: 'Legacy NPC',
              statblock_name: 'Some Statblock',
              statblock_folder: 'Test Dungeon'
            }
          ]
        }
      ]));

      loadDungeons(ref(null));

      expect(referenceStorage.addReference).not.toHaveBeenCalled();
    });

    it('should migrate NPCs across multiple dungeons', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        {
          id: 'dungeon_1',
          dungeonOverview: { name: 'Dungeon A' },
          npcs: [
            {
              npc_id: 'npc_a1',
              name: 'NPC A1',
              statblock_name: 'NPC A1',
              statblock_folder: 'Dungeon A'
            }
          ]
        },
        {
          id: 'dungeon_2',
          dungeonOverview: { name: 'Dungeon B' },
          npcs: [
            {
              npc_id: 'npc_b1',
              name: 'NPC B1',
              statblock_name: 'NPC B1',
              statblock_folder: 'Dungeon B'
            }
          ]
        }
      ]));

      referenceStorage.getReferencesForEntity.mockReturnValue([]);

      loadDungeons(ref(null));

      expect(referenceStorage.addReference).toHaveBeenCalledTimes(2);
    });

    it('should handle empty dungeons array gracefully', () => {
      localStorage.setItem('dungeons', JSON.stringify([]));

      expect(() => loadDungeons(ref(null))).not.toThrow();
      expect(referenceStorage.addReference).not.toHaveBeenCalled();
    });

    it('should handle dungeons without NPCs array', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        {
          id: 'dungeon_1',
          dungeonOverview: { name: 'Empty Dungeon' }
          // No npcs array
        }
      ]));

      expect(() => loadDungeons(ref(null))).not.toThrow();
      expect(referenceStorage.addReference).not.toHaveBeenCalled();
    });

    it('should handle corrupted localStorage gracefully', () => {
      localStorage.setItem('dungeons', 'invalid json');

      expect(() => loadDungeons(ref(null))).not.toThrow();
      expect(referenceStorage.addReference).not.toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // Edge Cases
  // ═══════════════════════════════════════════════════════════════════════════

  describe('Edge Cases', () => {
    it('should handle NPC with partial statblock data', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        {
          id: 'dungeon_1',
          dungeonOverview: { name: 'Test Dungeon' },
          npcs: [
            {
              npc_id: 'npc_partial',
              name: 'Partial NPC',
              statblock_name: 'Has Name'
              // Missing statblock_folder
            }
          ]
        }
      ]));

      loadDungeons(ref(null));

      expect(referenceStorage.addReference).not.toHaveBeenCalled();
    });

    it('should handle dungeon without overview', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        {
          id: 'dungeon_1',
          // No dungeonOverview
          npcs: [
            {
              npc_id: 'npc_1',
              name: 'NPC 1',
              statblock_name: 'NPC 1',
              statblock_folder: 'Dungeon NPCs'
            }
          ]
        }
      ]));

      referenceStorage.getReferencesForEntity.mockReturnValue([]);

      expect(() => loadDungeons(ref(null))).not.toThrow();

      // Should use default folder name "Dungeon NPCs"
      expect(referenceStorage.addReference).toHaveBeenCalledWith(
        expect.objectContaining({
          target_id: 'NPC 1__Dungeon NPCs'
        })
      );
    });

    it('should log migration count when references are created', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      localStorage.setItem('dungeons', JSON.stringify([
        {
          id: 'dungeon_1',
          dungeonOverview: { name: 'Test Dungeon' },
          npcs: [
            {
              npc_id: 'npc_1',
              name: 'NPC 1',
              statblock_name: 'NPC 1',
              statblock_folder: 'Test Dungeon'
            },
            {
              npc_id: 'npc_2',
              name: 'NPC 2',
              statblock_name: 'NPC 2',
              statblock_folder: 'Test Dungeon'
            }
          ]
        }
      ]));

      referenceStorage.getReferencesForEntity.mockReturnValue([]);

      loadDungeons(ref(null));

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(/Created 2 NPC statblock references/)
      );

      consoleSpy.mockRestore();
    });
  });
});
