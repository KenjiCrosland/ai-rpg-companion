/**
 * @jest-environment jsdom
 */

import {
  getStatblockFromStorage,
  renameStatblockFolder,
  renameStatblockReferences
} from '../statblock-storage.mjs';

describe('statblock-storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // renameStatblockFolder Tests
  // ═══════════════════════════════════════════════════════════════════════════

  describe('renameStatblockFolder', () => {
    it('should update NPC statblock folder references', () => {
      // Setup NPCs with statblock references
      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
        'Uncategorized': [
          {
            npc_id: 'npc_1',
            npcDescriptionPart1: {
              character_name: 'Bob',
              statblock_name: 'Goblin',
              statblock_folder: 'OldFolder'
            }
          },
          {
            npc_id: 'npc_2',
            npcDescriptionPart1: {
              character_name: 'Alice',
              statblock_name: 'Orc',
              statblock_folder: 'OldFolder'
            }
          }
        ],
        'Campaign': [
          {
            npc_id: 'npc_3',
            npcDescriptionPart1: {
              character_name: 'Charlie',
              statblock_name: 'Dragon',
              statblock_folder: 'DifferentFolder'
            }
          }
        ]
      }));

      const result = renameStatblockFolder('OldFolder', 'NewFolder');

      expect(result.npcReferencesUpdated).toBe(2);
      expect(result.totalUpdated).toBe(2);

      const npcs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
      expect(npcs.Uncategorized[0].npcDescriptionPart1.statblock_folder).toBe('NewFolder');
      expect(npcs.Uncategorized[1].npcDescriptionPart1.statblock_folder).toBe('NewFolder');
      expect(npcs.Campaign[0].npcDescriptionPart1.statblock_folder).toBe('DifferentFolder');
    });

    it('should update dungeon monster folder references', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        {
          dungeonOverview: { name: 'Dungeon 1' },
          monsters: [
            {
              name: 'Goblin Boss',
              statblock_name: 'Goblin Boss',
              statblock_folder: 'OldFolder'
            },
            {
              name: 'Orc Chieftain',
              statblock_name: 'Orc Chieftain',
              statblock_folder: 'OldFolder'
            }
          ]
        },
        {
          dungeonOverview: { name: 'Dungeon 2' },
          monsters: [
            {
              name: 'Dragon',
              statblock_name: 'Dragon',
              statblock_folder: 'DifferentFolder'
            }
          ]
        }
      ]));

      const result = renameStatblockFolder('OldFolder', 'NewFolder');

      expect(result.dungeonReferencesUpdated).toBe(2);

      const dungeons = JSON.parse(localStorage.getItem('dungeons'));
      expect(dungeons[0].monsters[0].statblock_folder).toBe('NewFolder');
      expect(dungeons[0].monsters[1].statblock_folder).toBe('NewFolder');
      expect(dungeons[1].monsters[0].statblock_folder).toBe('DifferentFolder');
    });

    it('should update dungeon NPC folder references', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        {
          dungeonOverview: { name: 'Dungeon 1' },
          npcs: [
            {
              npc_id: 'npc_1',
              npcDescriptionPart1: {
                character_name: 'Guard',
                statblock_name: 'Guard',
                statblock_folder: 'OldFolder'
              }
            }
          ]
        }
      ]));

      const result = renameStatblockFolder('OldFolder', 'NewFolder');

      expect(result.dungeonReferencesUpdated).toBe(1);

      const dungeons = JSON.parse(localStorage.getItem('dungeons'));
      expect(dungeons[0].npcs[0].npcDescriptionPart1.statblock_folder).toBe('NewFolder');
    });

    it('should update setting NPC folder references', () => {
      localStorage.setItem('gameSettings', JSON.stringify([
        {
          place_name: 'Waterdeep',
          npcs: [
            {
              npc_id: 'npc_1',
              npcDescriptionPart1: {
                character_name: 'City Guard',
                statblock_name: 'Guard',
                statblock_folder: 'OldFolder'
              }
            },
            {
              npc_id: 'npc_2',
              npcDescriptionPart1: {
                character_name: 'Merchant',
                statblock_name: 'Merchant',
                statblock_folder: 'OldFolder'
              }
            }
          ]
        }
      ]));

      const result = renameStatblockFolder('OldFolder', 'NewFolder');

      expect(result.settingReferencesUpdated).toBe(2);

      const settings = JSON.parse(localStorage.getItem('gameSettings'));
      expect(settings[0].npcs[0].npcDescriptionPart1.statblock_folder).toBe('NewFolder');
      expect(settings[0].npcs[1].npcDescriptionPart1.statblock_folder).toBe('NewFolder');
    });

    it('should update reference store target IDs', () => {
      localStorage.setItem('entity-references', JSON.stringify([
        {
          id: 'ref_1',
          source_type: 'npc',
          source_id: 'npc_1',
          target_type: 'statblock',
          target_id: 'Goblin__OldFolder',
          relationship: 'has_statblock'
        },
        {
          id: 'ref_2',
          source_type: 'npc',
          source_id: 'npc_2',
          target_type: 'statblock',
          target_id: 'Orc__OldFolder',
          relationship: 'has_statblock'
        },
        {
          id: 'ref_3',
          source_type: 'npc',
          source_id: 'npc_3',
          target_type: 'statblock',
          target_id: 'Dragon__DifferentFolder',
          relationship: 'has_statblock'
        }
      ]));

      renameStatblockFolder('OldFolder', 'NewFolder');

      const refs = JSON.parse(localStorage.getItem('entity-references'));
      expect(refs[0].target_id).toBe('Goblin__NewFolder');
      expect(refs[1].target_id).toBe('Orc__NewFolder');
      expect(refs[2].target_id).toBe('Dragon__DifferentFolder');
    });

    it('should handle all data stores simultaneously', () => {
      // Setup all data stores with OldFolder references
      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
        'Uncategorized': [
          {
            npc_id: 'npc_1',
            npcDescriptionPart1: {
              statblock_name: 'Goblin',
              statblock_folder: 'OldFolder'
            }
          }
        ]
      }));

      localStorage.setItem('dungeons', JSON.stringify([
        {
          monsters: [{ statblock_folder: 'OldFolder' }],
          npcs: [{ npcDescriptionPart1: { statblock_folder: 'OldFolder' } }]
        }
      ]));

      localStorage.setItem('gameSettings', JSON.stringify([
        {
          npcs: [{ npcDescriptionPart1: { statblock_folder: 'OldFolder' } }]
        }
      ]));

      localStorage.setItem('entity-references', JSON.stringify([
        { target_type: 'statblock', target_id: 'Monster__OldFolder' }
      ]));

      const result = renameStatblockFolder('OldFolder', 'NewFolder');

      expect(result.npcReferencesUpdated).toBe(1);
      expect(result.dungeonReferencesUpdated).toBe(2);
      expect(result.settingReferencesUpdated).toBe(1);
      expect(result.totalUpdated).toBe(4);
    });

    it('should return zero counts when no references exist', () => {
      const result = renameStatblockFolder('NonExistentFolder', 'NewFolder');

      expect(result.npcReferencesUpdated).toBe(0);
      expect(result.dungeonReferencesUpdated).toBe(0);
      expect(result.settingReferencesUpdated).toBe(0);
      expect(result.totalUpdated).toBe(0);
    });

    it('should handle empty localStorage gracefully', () => {
      expect(() => {
        renameStatblockFolder('OldFolder', 'NewFolder');
      }).not.toThrow();
    });

    it('should throw on corrupted localStorage', () => {
      localStorage.setItem('npcGeneratorNPCs', 'invalid json');

      expect(() => {
        renameStatblockFolder('OldFolder', 'NewFolder');
      }).toThrow(SyntaxError);
    });

    it('should not modify NPCs without statblock_folder', () => {
      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
        'Uncategorized': [
          {
            npc_id: 'npc_1',
            npcDescriptionPart1: {
              character_name: 'Bob'
              // No statblock_folder
            }
          }
        ]
      }));

      const result = renameStatblockFolder('OldFolder', 'NewFolder');

      expect(result.npcReferencesUpdated).toBe(0);
      const npcs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
      expect(npcs.Uncategorized[0].npcDescriptionPart1.statblock_folder).toBeUndefined();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // getStatblockFromStorage - Auto-Fix Tests
  // ═══════════════════════════════════════════════════════════════════════════

  describe('getStatblockFromStorage - auto-fix', () => {
    it('should find statblock in exact folder when specified', () => {
      localStorage.setItem('monsters', JSON.stringify({
        'Folder A': [
          { name: 'Goblin', cr: '1' }
        ],
        'Folder B': [
          { name: 'Orc', cr: '2' }
        ]
      }));

      const statblock = getStatblockFromStorage('Goblin', 'Folder A');

      expect(statblock).toEqual({ name: 'Goblin', cr: '1' });
    });

    it('should fallback to searching all folders when exact match fails', () => {
      localStorage.setItem('monsters', JSON.stringify({
        'Folder A': [
          { name: 'Goblin', cr: '1' }
        ],
        'Folder B': [
          { name: 'Orc', cr: '2' }
        ]
      }));

      // Search for Goblin in wrong folder
      const statblock = getStatblockFromStorage('Goblin', 'Folder B');

      expect(statblock).toEqual({ name: 'Goblin', cr: '1' });
    });

    it('should auto-fix NPC reference when statblock found in different folder', () => {
      localStorage.setItem('monsters', JSON.stringify({
        'NewFolder': [
          { name: 'Goblin', cr: '1' }
        ]
      }));

      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
        'Uncategorized': [
          {
            npc_id: 'npc_1',
            npcDescriptionPart1: {
              character_name: 'Bob',
              statblock_name: 'Goblin',
              statblock_folder: 'OldFolder'
            }
          }
        ]
      }));

      // Search with context for auto-fix
      const statblock = getStatblockFromStorage('Goblin', 'OldFolder', {
        npcId: 'npc_1',
        folderName: 'Uncategorized'
      });

      expect(statblock).toEqual({ name: 'Goblin', cr: '1' });

      // Verify auto-fix happened
      const npcs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
      expect(npcs.Uncategorized[0].npcDescriptionPart1.statblock_folder).toBe('NewFolder');
    });

    it('should auto-fix reference store when statblock found in different folder', () => {
      localStorage.setItem('monsters', JSON.stringify({
        'NewFolder': [
          { name: 'Goblin', cr: '1' }
        ]
      }));

      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
        'Uncategorized': [
          {
            npc_id: 'npc_1',
            npcDescriptionPart1: {
              character_name: 'Bob',
              statblock_name: 'Goblin',
              statblock_folder: 'OldFolder'
            }
          }
        ]
      }));

      localStorage.setItem('entity-references', JSON.stringify([
        {
          id: 'ref_1',
          source_type: 'npc',
          source_id: 'npc_1',
          target_type: 'statblock',
          target_id: 'Goblin__OldFolder',
          relationship: 'has_statblock'
        }
      ]));

      getStatblockFromStorage('Goblin', 'OldFolder', {
        npcId: 'npc_1',
        folderName: 'Uncategorized'
      });

      // Verify reference store was updated
      const refs = JSON.parse(localStorage.getItem('entity-references'));
      expect(refs[0].target_id).toBe('Goblin__NewFolder');
    });

    it('should not auto-fix when statblock found in correct folder', () => {
      localStorage.setItem('monsters', JSON.stringify({
        'CorrectFolder': [
          { name: 'Goblin', cr: '1' }
        ]
      }));

      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
        'Uncategorized': [
          {
            npc_id: 'npc_1',
            npcDescriptionPart1: {
              character_name: 'Bob',
              statblock_name: 'Goblin',
              statblock_folder: 'CorrectFolder'
            }
          }
        ]
      }));

      const originalNPCs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));

      getStatblockFromStorage('Goblin', 'CorrectFolder', {
        npcId: 'npc_1',
        folderName: 'Uncategorized'
      });

      // Verify no changes
      const npcs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
      expect(npcs).toEqual(originalNPCs);
    });

    it('should not auto-fix when context is not provided', () => {
      localStorage.setItem('monsters', JSON.stringify({
        'NewFolder': [
          { name: 'Goblin', cr: '1' }
        ]
      }));

      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
        'Uncategorized': [
          {
            npc_id: 'npc_1',
            npcDescriptionPart1: {
              character_name: 'Bob',
              statblock_name: 'Goblin',
              statblock_folder: 'OldFolder'
            }
          }
        ]
      }));

      const originalNPCs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));

      // Call without context
      getStatblockFromStorage('Goblin', 'OldFolder');

      // Verify no changes
      const npcs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
      expect(npcs).toEqual(originalNPCs);
    });

    it('should return null when statblock not found in any folder', () => {
      localStorage.setItem('monsters', JSON.stringify({
        'Folder A': [
          { name: 'Goblin', cr: '1' }
        ]
      }));

      const statblock = getStatblockFromStorage('Dragon', 'Folder A');

      expect(statblock).toBeNull();
    });

    it('should handle empty monsters localStorage', () => {
      const statblock = getStatblockFromStorage('Goblin', 'Folder A');

      expect(statblock).toBeNull();
    });

    it('should handle corrupted auto-fix gracefully', () => {
      localStorage.setItem('monsters', JSON.stringify({
        'NewFolder': [
          { name: 'Goblin', cr: '1' }
        ]
      }));

      localStorage.setItem('entity-references', 'invalid json');

      // Should not throw even with corrupted reference store
      expect(() => {
        getStatblockFromStorage('Goblin', 'OldFolder', {
          npcId: 'npc_1',
          folderName: 'Uncategorized'
        });
      }).not.toThrow();
    });

    it('should handle NPC not found during auto-fix', () => {
      localStorage.setItem('monsters', JSON.stringify({
        'NewFolder': [
          { name: 'Goblin', cr: '1' }
        ]
      }));

      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
        'Uncategorized': []
      }));

      // Should not throw when NPC not found
      expect(() => {
        getStatblockFromStorage('Goblin', 'OldFolder', {
          npcId: 'npc_nonexistent',
          folderName: 'Uncategorized'
        });
      }).not.toThrow();
    });
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // renameStatblockReferences Tests
  // ═══════════════════════════════════════════════════════════════════════════

  describe('renameStatblockReferences', () => {
    it('should update NPC statblock name references', () => {
      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
        'Uncategorized': [
          {
            npc_id: 'npc_1',
            npcDescriptionPart1: {
              character_name: 'Bob',
              statblock_name: 'OldName',
              statblock_folder: 'Monsters'
            }
          },
          {
            npc_id: 'npc_2',
            npcDescriptionPart1: {
              character_name: 'Alice',
              statblock_name: 'OldName',
              statblock_folder: 'Monsters'
            }
          }
        ]
      }));

      const result = renameStatblockReferences('OldName', 'NewName');

      expect(result.npcReferencesUpdated).toBe(2);

      const npcs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
      expect(npcs.Uncategorized[0].npcDescriptionPart1.statblock_name).toBe('NewName');
      expect(npcs.Uncategorized[1].npcDescriptionPart1.statblock_name).toBe('NewName');
    });

    it('should update dungeon monster name references', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        {
          monsters: [
            { name: 'Boss', statblock_name: 'OldName' },
            { name: 'Minion', statblock_name: 'OldName' }
          ]
        }
      ]));

      const result = renameStatblockReferences('OldName', 'NewName');

      expect(result.dungeonReferencesUpdated).toBe(2);

      const dungeons = JSON.parse(localStorage.getItem('dungeons'));
      expect(dungeons[0].monsters[0].statblock_name).toBe('NewName');
      expect(dungeons[0].monsters[1].statblock_name).toBe('NewName');
    });

    it('should update dungeon NPC name references', () => {
      localStorage.setItem('dungeons', JSON.stringify([
        {
          npcs: [
            {
              statblock_name: 'OldName',
              npcDescriptionPart1: { character_name: 'Guard' }
            }
          ]
        }
      ]));

      const result = renameStatblockReferences('OldName', 'NewName');

      expect(result.dungeonReferencesUpdated).toBe(1);

      const dungeons = JSON.parse(localStorage.getItem('dungeons'));
      expect(dungeons[0].npcs[0].statblock_name).toBe('NewName');
    });

    it('should return accurate counts across all data stores', () => {
      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
        'Folder A': [
          { npcDescriptionPart1: { statblock_name: 'OldName' } }
        ]
      }));

      localStorage.setItem('dungeons', JSON.stringify([
        {
          monsters: [{ statblock_name: 'OldName' }],
          npcs: [{ statblock_name: 'OldName' }]
        }
      ]));

      const result = renameStatblockReferences('OldName', 'NewName');

      expect(result.npcReferencesUpdated).toBe(1);
      expect(result.dungeonReferencesUpdated).toBe(2);
      expect(result.totalUpdated).toBe(3);
    });

    it('should return zero counts when no references exist', () => {
      const result = renameStatblockReferences('NonExistent', 'NewName');

      expect(result.npcReferencesUpdated).toBe(0);
      expect(result.dungeonReferencesUpdated).toBe(0);
      expect(result.totalUpdated).toBe(0);
    });

    it('should handle empty localStorage gracefully', () => {
      expect(() => {
        renameStatblockReferences('OldName', 'NewName');
      }).not.toThrow();
    });

    it('should not modify statblocks with different names', () => {
      localStorage.setItem('npcGeneratorNPCs', JSON.stringify({
        'Uncategorized': [
          {
            npcDescriptionPart1: {
              statblock_name: 'DifferentName',
              statblock_folder: 'Monsters'
            }
          }
        ]
      }));

      renameStatblockReferences('OldName', 'NewName');

      const npcs = JSON.parse(localStorage.getItem('npcGeneratorNPCs'));
      expect(npcs.Uncategorized[0].npcDescriptionPart1.statblock_name).toBe('DifferentName');
    });
  });
});
