/**
 * Tests for NPC Canonical Sync Logic
 *
 * This test suite verifies the critical ID synchronization between:
 * 1. Dungeon Generator's local NPC storage
 * 2. Shared NPC Generator storage (npcGeneratorNPCs)
 *
 * The sync ensures NPCs maintain consistent IDs across both storage systems.
 */

import { dungeonNPCToCanonical, saveNPCToStorage } from '@/util/npc-storage.mjs';

describe('NPC Canonical Sync - ID Management', () => {
  let mockLocalStorage;

  beforeEach(() => {
    // Mock localStorage using spies on the actual localStorage object
    mockLocalStorage = {};

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      return mockLocalStorage[key] || null;
    });

    jest.spyOn(Storage.prototype, 'setItem').mockImplementation((key, value) => {
      mockLocalStorage[key] = value;
    });

    jest.spyOn(Storage.prototype, 'removeItem').mockImplementation((key) => {
      delete mockLocalStorage[key];
    });

    jest.spyOn(Storage.prototype, 'clear').mockImplementation(() => {
      mockLocalStorage = {};
    });
  });

  afterEach(() => {
    // Restore localStorage spies
    jest.restoreAllMocks();
  });

  describe('dungeonNPCToCanonical', () => {
    test('should convert dungeon NPC format to canonical format', () => {
      const dungeonNPC = {
        npc_id: 'test-id-123',
        name: 'Test NPC',
        description_of_position: 'A brave warrior',
        why_in_dungeon: 'Seeking treasure',
        distinctive_features_or_mannerisms: 'Has a scar',
        character_secret: 'Is actually a spy',
        read_aloud_description: 'A tall figure',
        roleplaying_tips: 'Speak gruffly',
        relationships: {
          'Ally': 'They fought together',
        },
        statblock_name: 'Test Statblock',
        statblock_folder: 'Test Folder',
      };

      const canonical = dungeonNPCToCanonical(dungeonNPC, 'Test Dungeon');

      expect(canonical.npc_id).toBe('test-id-123');
      expect(canonical.npcDescriptionPart1.character_name).toBe('Test NPC');
      expect(canonical.npcDescriptionPart1.description_of_position).toBe('A brave warrior');
      expect(canonical.npcDescriptionPart1.reason_for_being_there).toBe('Seeking treasure');
      expect(canonical.npcDescriptionPart2.relationships).toEqual({ 'Ally': 'They fought together' });
      expect(canonical.npcDescriptionPart1.statblock_name).toBe('Test Statblock');
      expect(canonical.npcDescriptionPart1.statblock_folder).toBe('Test Folder');
    });

    test('should handle NPC without ID', () => {
      const dungeonNPC = {
        npc_id: null,
        name: 'Test NPC',
        read_aloud_description: 'A figure',
      };

      const canonical = dungeonNPCToCanonical(dungeonNPC, 'Test Dungeon');

      // Should still convert, even without ID
      expect(canonical.npcDescriptionPart1.character_name).toBe('Test NPC');
      expect(canonical.npc_id).toBeNull();
    });

    test('should handle missing optional fields', () => {
      const minimalNPC = {
        npc_id: 'min-id',
        name: 'Minimal NPC',
        read_aloud_description: 'A person',
      };

      const canonical = dungeonNPCToCanonical(minimalNPC, 'Test Dungeon');

      expect(canonical.npc_id).toBe('min-id');
      expect(canonical.npcDescriptionPart1.character_name).toBe('Minimal NPC');
      expect(canonical.npcDescriptionPart2.relationships).toEqual({});
    });
  });

  describe('saveNPCToStorage - ID Assignment and Deduplication', () => {
    test('should assign new ID to NPC without ID', () => {
      const npc = {
        npc_id: null,
        npcDescriptionPart1: {
          character_name: 'New NPC',
          read_aloud_description: 'Description',
        },
        npcDescriptionPart2: {
          relationships: {},
        },
      };

      saveNPCToStorage(npc, 'Test Folder');

      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);
      const savedNPC = stored['Test Folder'][0];

      // Should have assigned an ID
      expect(savedNPC.npc_id).toBeDefined();
      expect(savedNPC.npc_id).not.toBeNull();
      expect(typeof savedNPC.npc_id).toBe('string');
    });

    test('should preserve existing ID', () => {
      const existingId = 'existing-id-456';
      const npc = {
        npc_id: existingId,
        npcDescriptionPart1: {
          character_name: 'Existing NPC',
          read_aloud_description: 'Description',
        },
        npcDescriptionPart2: {
          relationships: {},
        },
      };

      saveNPCToStorage(npc, 'Test Folder');

      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);
      const savedNPC = stored['Test Folder'][0];

      // Should preserve the existing ID
      expect(savedNPC.npc_id).toBe(existingId);
    });

    test('should deduplicate NPCs by name in same folder', () => {
      // Save first NPC
      const npc1 = {
        npc_id: 'id-1',
        npcDescriptionPart1: {
          character_name: 'Duplicate NPC',
          read_aloud_description: 'First version',
        },
        npcDescriptionPart2: {
          relationships: {},
        },
      };
      saveNPCToStorage(npc1, 'Test Folder');

      // Save second NPC with same name
      const npc2 = {
        npc_id: 'id-2',
        npcDescriptionPart1: {
          character_name: 'Duplicate NPC',
          read_aloud_description: 'Second version (updated)',
        },
        npcDescriptionPart2: {
          relationships: { 'Friend': 'New relationship' },
        },
      };
      saveNPCToStorage(npc2, 'Test Folder');

      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);
      const folderNPCs = stored['Test Folder'];

      // Should only have one NPC
      expect(folderNPCs).toHaveLength(1);

      // Should have updated data
      expect(folderNPCs[0].npcDescriptionPart1.read_aloud_description).toBe('Second version (updated)');
      expect(folderNPCs[0].npcDescriptionPart2.relationships['Friend']).toBe('New relationship');

      // Should preserve the first ID (deduplication uses first occurrence's ID)
      expect(folderNPCs[0].npc_id).toBe('id-1');
    });

    test('should allow same name in different folders', () => {
      const npc1 = {
        npc_id: 'folder1-id',
        npcDescriptionPart1: {
          character_name: 'Same Name',
          read_aloud_description: 'In folder 1',
        },
        npcDescriptionPart2: {
          relationships: {},
        },
      };

      const npc2 = {
        npc_id: 'folder2-id',
        npcDescriptionPart1: {
          character_name: 'Same Name',
          read_aloud_description: 'In folder 2',
        },
        npcDescriptionPart2: {
          relationships: {},
        },
      };

      saveNPCToStorage(npc1, 'Folder 1');
      saveNPCToStorage(npc2, 'Folder 2');

      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);

      // Should have both NPCs in different folders
      expect(stored['Folder 1']).toHaveLength(1);
      expect(stored['Folder 2']).toHaveLength(1);

      // Each should keep their own ID
      expect(stored['Folder 1'][0].npc_id).toBe('folder1-id');
      expect(stored['Folder 2'][0].npc_id).toBe('folder2-id');
    });

    test('should handle updating NPC with relationships', () => {
      // Initial save
      const npc = {
        npc_id: 'update-id',
        npcDescriptionPart1: {
          character_name: 'Updateable NPC',
          read_aloud_description: 'Original',
        },
        npcDescriptionPart2: {
          relationships: {
            'Friend 1': 'Original friend',
          },
        },
      };
      saveNPCToStorage(npc, 'Test Folder');

      // Update with new relationship
      const updatedNPC = {
        npc_id: 'update-id',
        npcDescriptionPart1: {
          character_name: 'Updateable NPC',
          read_aloud_description: 'Updated',
        },
        npcDescriptionPart2: {
          relationships: {
            'Friend 1': 'Original friend',
            'Friend 2': 'New friend added',
          },
        },
      };
      saveNPCToStorage(updatedNPC, 'Test Folder');

      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);
      const savedNPC = stored['Test Folder'][0];

      // Should have both relationships
      expect(Object.keys(savedNPC.npcDescriptionPart2.relationships)).toHaveLength(2);
      expect(savedNPC.npcDescriptionPart2.relationships['Friend 2']).toBe('New friend added');
      expect(savedNPC.npcDescriptionPart1.read_aloud_description).toBe('Updated');
    });
  });

  describe('ID Sync Edge Cases', () => {
    test('should handle NPC with undefined npc_id field', () => {
      const npc = {
        // npc_id is undefined (not present)
        npcDescriptionPart1: {
          character_name: 'No ID NPC',
          read_aloud_description: 'Test',
        },
        npcDescriptionPart2: {
          relationships: {},
        },
      };

      saveNPCToStorage(npc, 'Test Folder');

      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);
      const savedNPC = stored['Test Folder'][0];

      // Should generate an ID
      expect(savedNPC.npc_id).toBeDefined();
      expect(savedNPC.npc_id).not.toBeNull();
    });

    test('should handle empty string as ID', () => {
      const npc = {
        npc_id: '',
        npcDescriptionPart1: {
          character_name: 'Empty ID NPC',
          read_aloud_description: 'Test',
        },
        npcDescriptionPart2: {
          relationships: {},
        },
      };

      saveNPCToStorage(npc, 'Test Folder');

      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);
      const savedNPC = stored['Test Folder'][0];

      // Should generate a new ID (empty string is falsy)
      expect(savedNPC.npc_id).toBeTruthy();
      expect(savedNPC.npc_id).not.toBe('');
    });

    test('should handle special characters in NPC name', () => {
      const npc = {
        npc_id: 'special-id',
        npcDescriptionPart1: {
          character_name: 'O\'Reilly the "Clever"',
          read_aloud_description: 'Has quotes & apostrophes',
        },
        npcDescriptionPart2: {
          relationships: {},
        },
      };

      saveNPCToStorage(npc, 'Test Folder');

      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);
      const savedNPC = stored['Test Folder'][0];

      // Should preserve special characters
      expect(savedNPC.npcDescriptionPart1.character_name).toBe('O\'Reilly the "Clever"');
      expect(savedNPC.npc_id).toBe('special-id');
    });

    test('should handle updating existing NPC that lost its ID', () => {
      // First save with ID
      const npc1 = {
        npc_id: 'original-id',
        npcDescriptionPart1: {
          character_name: 'Tracked NPC',
          read_aloud_description: 'First save',
        },
        npcDescriptionPart2: {
          relationships: {},
        },
      };
      saveNPCToStorage(npc1, 'Test Folder');

      // Second save, same name but ID was lost (set to null)
      const npc2 = {
        npc_id: null,
        npcDescriptionPart1: {
          character_name: 'Tracked NPC',
          read_aloud_description: 'Second save without ID',
        },
        npcDescriptionPart2: {
          relationships: { 'Friend': 'New data' },
        },
      };
      saveNPCToStorage(npc2, 'Test Folder');

      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);
      const savedNPC = stored['Test Folder'][0];

      // Should use the original ID (deduplication finds existing NPC)
      expect(savedNPC.npc_id).toBe('original-id');
      // But should have updated data
      expect(savedNPC.npcDescriptionPart1.read_aloud_description).toBe('Second save without ID');
      expect(savedNPC.npcDescriptionPart2.relationships['Friend']).toBe('New data');
    });
  });

  describe('Critical Bug Scenarios', () => {
    test('should NOT merge NPCs with same name from different folders (cross-source collision)', () => {
      // This tests the critical issue where NPCs from different contexts
      // (e.g., different dungeons) shouldn't be merged just because they share a name

      // Save NPC "Bob" from Dungeon 1
      const dungeon1Bob = {
        npc_id: null,
        npcDescriptionPart1: {
          character_name: 'Bob the Blacksmith',
          read_aloud_description: 'A burly dwarf with a thick beard',
        },
        npcDescriptionPart2: {
          relationships: {},
        },
      };
      saveNPCToStorage(dungeon1Bob, 'The Dark Crypt');

      // Save a DIFFERENT NPC "Bob" from Dungeon 2
      const dungeon2Bob = {
        npc_id: null,
        npcDescriptionPart1: {
          character_name: 'Bob the Blacksmith',
          read_aloud_description: 'A tall human with a scarred face',
        },
        npcDescriptionPart2: {
          relationships: {},
        },
      };
      saveNPCToStorage(dungeon2Bob, 'The Shadowy Crypt');

      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);

      // Should have TWO separate NPCs in different folders
      expect(stored['The Dark Crypt']).toHaveLength(1);
      expect(stored['The Shadowy Crypt']).toHaveLength(1);

      // Should have DIFFERENT IDs
      const bob1Id = stored['The Dark Crypt'][0].npc_id;
      const bob2Id = stored['The Shadowy Crypt'][0].npc_id;
      expect(bob1Id).not.toBe(bob2Id);

      // Should maintain their distinct descriptions
      expect(stored['The Dark Crypt'][0].npcDescriptionPart1.read_aloud_description)
        .toBe('A burly dwarf with a thick beard');
      expect(stored['The Shadowy Crypt'][0].npcDescriptionPart1.read_aloud_description)
        .toBe('A tall human with a scarred face');
    });

    test('should mutate canonical NPC ID when deduplicated (critical for sync)', () => {
      // This tests that saveNPCToStorage mutates the ID of the passed object
      // The sync code depends on this behavior to get the correct ID back

      // First, save an NPC with a specific ID
      const existingNPC = {
        npc_id: 'original-id-123',
        npcDescriptionPart1: {
          character_name: 'Alice',
          read_aloud_description: 'Original Alice',
        },
        npcDescriptionPart2: {
          relationships: {},
        },
      };
      saveNPCToStorage(existingNPC, 'Test Folder');

      // Now try to save another NPC with the same name but different ID
      const duplicateNPC = {
        npc_id: 'new-id-456',
        npcDescriptionPart1: {
          character_name: 'Alice',
          read_aloud_description: 'Updated Alice',
        },
        npcDescriptionPart2: {
          relationships: { 'Friend': 'New data' },
        },
      };
      saveNPCToStorage(duplicateNPC, 'Test Folder');

      // CRITICAL: The duplicateNPC object should now have its ID changed to the original
      expect(duplicateNPC.npc_id).toBe('original-id-123');

      // And the stored data should be updated but with the original ID
      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);
      expect(stored['Test Folder']).toHaveLength(1);
      expect(stored['Test Folder'][0].npc_id).toBe('original-id-123');
      expect(stored['Test Folder'][0].npcDescriptionPart1.read_aloud_description)
        .toBe('Updated Alice');
    });

    test('should treat names case-sensitively (Bob ≠ bob)', () => {
      // Testing if case matters in name deduplication

      const bob1 = {
        npc_id: 'id-1',
        npcDescriptionPart1: {
          character_name: 'Bob',
          read_aloud_description: 'Uppercase Bob',
        },
        npcDescriptionPart2: { relationships: {} },
      };
      saveNPCToStorage(bob1, 'Test Folder');

      const bob2 = {
        npc_id: 'id-2',
        npcDescriptionPart1: {
          character_name: 'bob',
          read_aloud_description: 'Lowercase bob',
        },
        npcDescriptionPart2: { relationships: {} },
      };
      saveNPCToStorage(bob2, 'Test Folder');

      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);

      // Should have TWO NPCs (case-sensitive comparison)
      expect(stored['Test Folder']).toHaveLength(2);

      // Verify both are present
      const names = stored['Test Folder'].map(n => n.npcDescriptionPart1.character_name);
      expect(names).toContain('Bob');
      expect(names).toContain('bob');
    });

    test('should handle whitespace differences in names', () => {
      // Testing if leading/trailing whitespace matters

      const npc1 = {
        npc_id: null,
        npcDescriptionPart1: {
          character_name: 'Alice',
          read_aloud_description: 'Normal Alice',
        },
        npcDescriptionPart2: { relationships: {} },
      };
      saveNPCToStorage(npc1, 'Test Folder');

      const npc2 = {
        npc_id: null,
        npcDescriptionPart1: {
          character_name: '  Alice  ',
          read_aloud_description: 'Whitespace Alice',
        },
        npcDescriptionPart2: { relationships: {} },
      };
      saveNPCToStorage(npc2, 'Test Folder');

      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);

      // Should have TWO NPCs (whitespace is preserved)
      expect(stored['Test Folder']).toHaveLength(2);
    });

    test('should handle very long NPC names without truncation', () => {
      const longName = 'A'.repeat(500); // 500 character name

      const npc = {
        npc_id: 'long-name-id',
        npcDescriptionPart1: {
          character_name: longName,
          read_aloud_description: 'Test',
        },
        npcDescriptionPart2: { relationships: {} },
      };

      saveNPCToStorage(npc, 'Test Folder');

      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);
      expect(stored['Test Folder'][0].npcDescriptionPart1.character_name).toBe(longName);
      expect(stored['Test Folder'][0].npcDescriptionPart1.character_name.length).toBe(500);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    test('should handle corrupted localStorage JSON gracefully', () => {
      // Set corrupted JSON
      mockLocalStorage['npcGeneratorNPCs'] = '{invalid json}';

      const npc = {
        npc_id: null,
        npcDescriptionPart1: {
          character_name: 'Test NPC',
          read_aloud_description: 'Test',
        },
        npcDescriptionPart2: { relationships: {} },
      };

      // Should not throw, should start fresh
      expect(() => {
        saveNPCToStorage(npc, 'Test Folder');
      }).not.toThrow();

      // Should have created new storage
      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);
      expect(stored['Test Folder']).toHaveLength(1);
    });

    test('should handle missing npcDescriptionPart1 in stored data', () => {
      // Simulate corrupted stored NPC missing part1
      mockLocalStorage['npcGeneratorNPCs'] = JSON.stringify({
        'Test Folder': [{
          npc_id: 'corrupted-id',
          npcDescriptionPart2: { relationships: {} },
          // npcDescriptionPart1 is missing!
        }],
      });

      const npc = {
        npc_id: null,
        npcDescriptionPart1: {
          character_name: 'New NPC',
          read_aloud_description: 'Test',
        },
        npcDescriptionPart2: { relationships: {} },
      };

      // Should handle gracefully
      expect(() => {
        saveNPCToStorage(npc, 'Test Folder');
      }).not.toThrow();
    });

    test('should handle NPC with null character_name', () => {
      const npc = {
        npc_id: 'test-id',
        npcDescriptionPart1: {
          character_name: null,
          read_aloud_description: 'Test',
        },
        npcDescriptionPart2: { relationships: {} },
      };

      expect(() => {
        saveNPCToStorage(npc, 'Test Folder');
      }).not.toThrow();

      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);
      expect(stored['Test Folder'][0].npcDescriptionPart1.character_name).toBeNull();
    });

    test('should handle NPC with undefined character_name', () => {
      const npc = {
        npc_id: 'test-id',
        npcDescriptionPart1: {
          // character_name is undefined
          read_aloud_description: 'Test',
        },
        npcDescriptionPart2: { relationships: {} },
      };

      expect(() => {
        saveNPCToStorage(npc, 'Test Folder');
      }).not.toThrow();
    });

    test('should handle extremely large relationship objects', () => {
      const relationships = {};
      // Create 100 relationships
      for (let i = 0; i < 100; i++) {
        relationships[`Friend ${i}`] = `A very long description about friend number ${i}. `.repeat(10);
      }

      const npc = {
        npc_id: 'big-relationships-id',
        npcDescriptionPart1: {
          character_name: 'Social Butterfly',
          read_aloud_description: 'Very popular',
        },
        npcDescriptionPart2: { relationships },
      };

      expect(() => {
        saveNPCToStorage(npc, 'Test Folder');
      }).not.toThrow();

      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);
      expect(Object.keys(stored['Test Folder'][0].npcDescriptionPart2.relationships)).toHaveLength(100);
    });

    test('should handle folder name with special characters', () => {
      const npc = {
        npc_id: 'test-id',
        npcDescriptionPart1: {
          character_name: 'Test NPC',
          read_aloud_description: 'Test',
        },
        npcDescriptionPart2: { relationships: {} },
      };

      const specialFolderName = 'Folder with "quotes" & \'apostrophes\' <brackets>';

      expect(() => {
        saveNPCToStorage(npc, specialFolderName);
      }).not.toThrow();

      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);
      expect(stored[specialFolderName]).toHaveLength(1);
    });

    test('should handle rapid successive saves of same NPC', () => {
      const baseNPC = {
        npc_id: 'rapid-id',
        npcDescriptionPart1: {
          character_name: 'Rapidly Updated NPC',
          read_aloud_description: 'Version 0',
        },
        npcDescriptionPart2: { relationships: {} },
      };

      // Save 10 times rapidly
      for (let i = 1; i <= 10; i++) {
        const npc = {
          ...baseNPC,
          npcDescriptionPart1: {
            ...baseNPC.npcDescriptionPart1,
            read_aloud_description: `Version ${i}`,
          },
        };
        saveNPCToStorage(npc, 'Test Folder');
      }

      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);

      // Should still have only ONE NPC
      expect(stored['Test Folder']).toHaveLength(1);

      // Should have the latest version
      expect(stored['Test Folder'][0].npcDescriptionPart1.read_aloud_description)
        .toBe('Version 10');
    });
  });

  describe('Folder/Dungeon Rename Scenarios (AUTO-MIGRATION)', () => {
    test('should automatically migrate NPCs when dungeon is renamed', () => {
      // This test verifies AUTO-MIGRATION fixes the rename bug

      // Step 1: Create dungeon with original name
      const originalDungeonName = 'The Dark Crypt';

      // Step 2: Save NPCs to that dungeon
      const npc1 = {
        npc_id: null,
        npcDescriptionPart1: {
          character_name: 'Alice the Guard',
          read_aloud_description: 'A vigilant guard',
        },
        npcDescriptionPart2: { relationships: {} },
      };
      saveNPCToStorage(npc1, originalDungeonName);

      const npc2 = {
        npc_id: null,
        npcDescriptionPart1: {
          character_name: 'Bob the Merchant',
          read_aloud_description: 'A shady merchant',
        },
        npcDescriptionPart2: { relationships: {} },
      };
      saveNPCToStorage(npc2, originalDungeonName);

      // Verify NPCs are in original folder
      let stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);
      expect(stored[originalDungeonName]).toHaveLength(2);

      // Capture the IDs that were auto-generated
      const aliceId = stored[originalDungeonName][0].npc_id;
      const bobId = stored[originalDungeonName][1].npc_id;

      // Step 3: USER RENAMES THE DUNGEON (this happens in the dungeon store)
      const newDungeonName = 'The Shadow Crypt';

      // Step 4: Save Alice with her ID to the new folder name (simulates generating a relationship after rename)
      const aliceUpdated = {
        npc_id: aliceId,
        npcDescriptionPart1: {
          character_name: 'Alice the Guard',
          read_aloud_description: 'A vigilant guard',
        },
        npcDescriptionPart2: {
          relationships: { 'New Friend': 'Met after the rename' },
        },
      };
      saveNPCToStorage(aliceUpdated, newDungeonName);

      stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);

      // AUTO-MIGRATION: Alice should be in new folder, removed from old
      expect(stored[newDungeonName]).toHaveLength(1);
      expect(stored[newDungeonName][0].npc_id).toBe(aliceId);
      expect(stored[newDungeonName][0].npcDescriptionPart2.relationships['New Friend']).toBeDefined();

      // Bob should still be in old folder (hasn't been touched yet)
      expect(stored[originalDungeonName]).toHaveLength(1);
      expect(stored[originalDungeonName][0].npc_id).toBe(bobId);

      // Step 5: Now save Bob to new folder too
      const bobUpdated = {
        npc_id: bobId,
        npcDescriptionPart1: {
          character_name: 'Bob the Merchant',
          read_aloud_description: 'A shady merchant',
        },
        npcDescriptionPart2: { relationships: {} },
      };
      saveNPCToStorage(bobUpdated, newDungeonName);

      stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);

      // Both NPCs should now be in new folder
      expect(stored[newDungeonName]).toHaveLength(2);

      // Old folder should be empty and deleted
      expect(stored[originalDungeonName]).toBeUndefined();
    });

    test('should prevent duplicate NPCs when generating relationships after rename', () => {
      // More specific case: User generates relationship after dungeon rename
      // AUTO-MIGRATION should handle this gracefully

      const originalName = 'Dungeon 1';

      // Save initial NPC
      const alice = {
        npc_id: 'alice-id',
        npcDescriptionPart1: {
          character_name: 'Alice',
          read_aloud_description: 'A fighter',
        },
        npcDescriptionPart2: {
          relationships: { 'Old Friend': 'They met before the rename' },
        },
      };
      saveNPCToStorage(alice, originalName);

      // User renames dungeon
      const newName = 'Dungeon 1 Renamed';

      // User generates a new relationship for Alice (but using new dungeon name)
      const aliceWithNewRelationship = {
        npc_id: 'alice-id',
        npcDescriptionPart1: {
          character_name: 'Alice',
          read_aloud_description: 'A fighter',
        },
        npcDescriptionPart2: {
          relationships: {
            'Old Friend': 'They met before the rename',
            'New Friend': 'They met after the rename',
          },
        },
      };
      saveNPCToStorage(aliceWithNewRelationship, newName);

      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);

      // AUTO-MIGRATION: Alice should only exist in new folder
      expect(stored[newName]).toHaveLength(1);
      expect(stored[originalName]).toBeUndefined(); // Old folder cleaned up

      // The migrated Alice has both relationships
      expect(Object.keys(stored[newName][0].npcDescriptionPart2.relationships)).toHaveLength(2);
      expect(stored[newName][0].npc_id).toBe('alice-id');
    });

    test('should prevent NPC accumulation across multiple renames', () => {
      // User keeps renaming dungeon
      // AUTO-MIGRATION should keep NPCs in the latest folder only

      const npc = {
        npc_id: 'persistent-id',
        npcDescriptionPart1: {
          character_name: 'Persistent Pete',
          read_aloud_description: 'Survives all renames',
        },
        npcDescriptionPart2: { relationships: {} },
      };

      // Save to original name
      saveNPCToStorage(npc, 'Dungeon V1');

      let stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);
      expect(stored['Dungeon V1']).toHaveLength(1);

      // Rename and save update
      saveNPCToStorage(npc, 'Dungeon V2');

      stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);
      expect(stored['Dungeon V2']).toHaveLength(1);
      expect(stored['Dungeon V1']).toBeUndefined(); // Migrated and cleaned up

      // Rename again and save another update
      saveNPCToStorage(npc, 'Dungeon V3');

      stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);

      // AUTO-MIGRATION: NPC only exists in the latest folder
      expect(stored['Dungeon V3']).toHaveLength(1);
      expect(stored['Dungeon V2']).toBeUndefined(); // Migrated and cleaned up
      expect(stored['Dungeon V1']).toBeUndefined(); // Never recreated

      // NPC has the same ID throughout
      expect(stored['Dungeon V3'][0].npc_id).toBe('persistent-id');
    });
  });

  describe('Round-Trip Sync Integrity', () => {
    test('should maintain data integrity through multiple save-load cycles', () => {
      const originalNPC = {
        npc_id: 'integrity-test',
        npcDescriptionPart1: {
          character_name: 'Integrity NPC',
          description_of_position: 'A tester',
          reason_for_being_there: 'Testing',
          distinctive_feature_or_mannerism: 'Methodical',
          character_secret: 'Loves bugs',
          read_aloud_description: 'A careful figure',
          roleplaying_tips: 'Be precise',
          combined_details: 'Combined text',
          statblock_name: 'Test Monster',
          statblock_folder: 'Test Monsters',
        },
        npcDescriptionPart2: {
          relationships: {
            'QA Engineer': 'They work together on testing',
          },
        },
      };

      // Save
      saveNPCToStorage(originalNPC, 'Test Folder');

      // Load
      const stored1 = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);
      const loaded1 = stored1['Test Folder'][0];

      // Modify and save again
      loaded1.npcDescriptionPart2.relationships['New Friend'] = 'Met recently';
      saveNPCToStorage(loaded1, 'Test Folder');

      // Load again
      const stored2 = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);
      const loaded2 = stored2['Test Folder'][0];

      // Verify all data preserved
      expect(loaded2.npc_id).toBe('integrity-test');
      expect(loaded2.npcDescriptionPart1.character_name).toBe('Integrity NPC');
      expect(loaded2.npcDescriptionPart1.description_of_position).toBe('A tester');
      expect(loaded2.npcDescriptionPart2.relationships['QA Engineer']).toBe('They work together on testing');
      expect(loaded2.npcDescriptionPart2.relationships['New Friend']).toBe('Met recently');
      expect(loaded2.npcDescriptionPart1.statblock_name).toBe('Test Monster');
    });

    test('should handle concurrent updates from multiple sources', () => {
      const baseNPC = {
        npc_id: 'concurrent-id',
        npcDescriptionPart1: {
          character_name: 'Concurrent NPC',
          read_aloud_description: 'Base description',
        },
        npcDescriptionPart2: {
          relationships: {},
        },
      };

      // Initial save
      saveNPCToStorage(baseNPC, 'Test Folder');

      // Simulate update from dungeon generator (adds relationship)
      const dungeonUpdate = JSON.parse(JSON.stringify(baseNPC));
      dungeonUpdate.npcDescriptionPart2.relationships['Dungeon Friend'] = 'Met in dungeon';
      saveNPCToStorage(dungeonUpdate, 'Test Folder');

      // Simulate update from NPC generator (adds different relationship)
      const npcGenUpdate = JSON.parse(JSON.stringify(baseNPC));
      npcGenUpdate.npcDescriptionPart2.relationships['NPC Gen Friend'] = 'Met in town';
      saveNPCToStorage(npcGenUpdate, 'Test Folder');

      const stored = JSON.parse(mockLocalStorage['npcGeneratorNPCs']);
      const finalNPC = stored['Test Folder'][0];

      // Last update wins (this is expected behavior)
      expect(finalNPC.npc_id).toBe('concurrent-id');
      expect(finalNPC.npcDescriptionPart2.relationships['NPC Gen Friend']).toBe('Met in town');
      // Earlier update was overwritten
      expect(finalNPC.npcDescriptionPart2.relationships['Dungeon Friend']).toBeUndefined();
    });
  });
});
