/**
 * extract-existing-references.mjs
 *
 * One-time migration to extract existing relationships from localStorage
 * and populate the reference store.
 *
 * This migration scans:
 * - NPCs with statblock_name/statblock_folder
 * - Dungeon NPCs with sourceType=dungeon
 * - Dungeon monsters with statblock references
 * - Setting NPCs with sourceType=setting
 * - Encounter monsters with statblock references
 */

import { addReference, referenceExists } from './reference-storage.mjs';
import { getStatblockFromStorage } from './statblock-storage.mjs';

/**
 * Extract references from NPCs that have associated statblocks.
 * @returns {number} - Number of references created
 */
function extractNPCStatblockReferences() {
  let count = 0;

  try {
    const npcStorage = JSON.parse(
      localStorage.getItem('npcGeneratorNPCs') || '{}'
    );

    for (const folderName in npcStorage) {
      const npcs = npcStorage[folderName];
      if (!Array.isArray(npcs)) continue;

      for (const npc of npcs) {
        const npcId = npc.npc_id;
        const statblockName = npc.npcDescriptionPart1?.statblock_name;
        const statblockFolder = npc.npcDescriptionPart1?.statblock_folder;

        if (!npcId || !statblockName || !statblockFolder) continue;

        // Verify the statblock actually exists in shared storage
        const statblock = getStatblockFromStorage(statblockName, statblockFolder);
        if (!statblock) {
          console.log(`Skipping NPC reference - statblock not found: ${statblockName}`);
          continue;
        }

        const statblockId = `${statblockName}__${statblockFolder}`;
        const npcName = npc.npcDescriptionPart1?.character_name || 'Unknown NPC';

        // Check if reference already exists
        if (!referenceExists('npc', npcId, 'statblock', statblockId, 'has_statblock')) {
          addReference({
            source_type: 'npc',
            source_id: npcId,
            source_name: npcName,
            target_type: 'statblock',
            target_id: statblockId,
            target_name: statblockName,
            relationship: 'has_statblock',
            context: ''
          });
          count++;
        }
      }
    }
  } catch (error) {
    console.error('Error extracting NPC statblock references:', error);
  }

  return count;
}

/**
 * Extract references from dungeon NPCs (NPCs that originated from dungeons).
 * @returns {number} - Number of references created
 */
function extractDungeonNPCReferences() {
  let count = 0;

  try {
    const npcStorage = JSON.parse(
      localStorage.getItem('npcGeneratorNPCs') || '{}'
    );
    const dungeons = JSON.parse(localStorage.getItem('dungeons') || '[]');

    // Build a map of dungeon names to dungeon IDs
    const dungeonMap = new Map();
    for (const dungeon of dungeons) {
      const dungeonName = dungeon.dungeonOverview?.name || dungeon.overview?.name;
      if (dungeonName && dungeon.id) {
        dungeonMap.set(dungeonName, dungeon.id);
      }
    }

    for (const folderName in npcStorage) {
      const npcs = npcStorage[folderName];
      if (!Array.isArray(npcs)) continue;

      for (const npc of npcs) {
        // Only process NPCs with dungeon sourceType
        if (npc.sourceType !== 'dungeon') continue;

        const npcId = npc.npc_id;
        const dungeonId = dungeonMap.get(folderName);

        if (!npcId || !dungeonId) continue;

        const npcName = npc.npcDescriptionPart1?.character_name || 'Unknown NPC';

        // Check if reference already exists
        if (!referenceExists('npc', npcId, 'dungeon', dungeonId, 'appears_in_dungeon')) {
          addReference({
            source_type: 'npc',
            source_id: npcId,
            source_name: npcName,
            target_type: 'dungeon',
            target_id: dungeonId,
            target_name: folderName,
            relationship: 'appears_in_dungeon',
            context: ''
          });
          count++;
        }
      }
    }
  } catch (error) {
    console.error('Error extracting dungeon NPC references:', error);
  }

  return count;
}

/**
 * Extract references from dungeon monsters that use shared statblocks.
 * @returns {number} - Number of references created
 */
function extractDungeonMonsterReferences() {
  let count = 0;

  try {
    const dungeons = JSON.parse(localStorage.getItem('dungeons') || '[]');

    for (const dungeon of dungeons) {
      if (!dungeon.monsters || !Array.isArray(dungeon.monsters)) continue;

      const dungeonId = dungeon.id;
      const dungeonName = dungeon.dungeonOverview?.name || dungeon.overview?.name || 'Unknown Dungeon';

      for (const monster of dungeon.monsters) {
        const statblockName = monster.statblock_name;
        const statblockFolder = monster.statblock_folder;

        if (!statblockName || !statblockFolder) continue;

        // Verify the statblock actually exists in shared storage
        const statblock = getStatblockFromStorage(statblockName, statblockFolder);
        if (!statblock) continue;

        const statblockId = `${statblockName}__${statblockFolder}`;

        // Check if reference already exists
        if (!referenceExists('statblock', statblockId, 'dungeon', dungeonId, 'appears_in_dungeon')) {
          addReference({
            source_type: 'statblock',
            source_id: statblockId,
            source_name: statblockName,
            target_type: 'dungeon',
            target_id: dungeonId,
            target_name: dungeonName,
            relationship: 'appears_in_dungeon',
            context: ''
          });
          count++;
        }
      }
    }
  } catch (error) {
    console.error('Error extracting dungeon monster references:', error);
  }

  return count;
}

/**
 * Extract references from setting NPCs (NPCs that originated from settings).
 * @returns {number} - Number of references created
 */
function extractSettingNPCReferences() {
  let count = 0;

  try {
    const npcStorage = JSON.parse(
      localStorage.getItem('npcGeneratorNPCs') || '{}'
    );
    const settings = JSON.parse(localStorage.getItem('gameSettings') || '[]');

    // Build a map of setting names to setting IDs
    const settingMap = new Map();
    for (const setting of settings) {
      const settingName = setting.place_name;
      if (settingName && setting.id) {
        settingMap.set(settingName, setting.id);
      }
    }

    for (const folderName in npcStorage) {
      const npcs = npcStorage[folderName];
      if (!Array.isArray(npcs)) continue;

      for (const npc of npcs) {
        // Only process NPCs with setting sourceType
        if (npc.sourceType !== 'setting') continue;

        const npcId = npc.npc_id;
        const settingId = settingMap.get(folderName);

        if (!npcId || !settingId) continue;

        const npcName = npc.npcDescriptionPart1?.character_name || 'Unknown NPC';

        // Check if reference already exists
        if (!referenceExists('npc', npcId, 'setting', settingId, 'appears_in_setting')) {
          addReference({
            source_type: 'npc',
            source_id: npcId,
            source_name: npcName,
            target_type: 'setting',
            target_id: settingId,
            target_name: folderName,
            relationship: 'appears_in_setting',
            context: ''
          });
          count++;
        }
      }
    }
  } catch (error) {
    console.error('Error extracting setting NPC references:', error);
  }

  return count;
}

/**
 * Extract references from encounter monsters that use shared statblocks.
 * @returns {number} - Number of references created
 */
function extractEncounterStatblockReferences() {
  let count = 0;

  try {
    const encounters = JSON.parse(localStorage.getItem('encounters') || '{}');

    for (const folderName in encounters) {
      const encounterList = encounters[folderName];
      if (!Array.isArray(encounterList)) continue;

      for (let i = 0; i < encounterList.length; i++) {
        const encounter = encounterList[i];
        if (!encounter.monsters || !Array.isArray(encounter.monsters)) continue;

        // Encounters don't have IDs, so use folder + index
        const encounterId = `${folderName}__${i}`;
        const encounterName = encounter.name || 'Unknown Encounter';

        for (const monster of encounter.monsters) {
          // Check if this monster has a reference to a statblock in shared storage
          // Monsters in encounters might have a `name` that matches a statblock name
          // but we need to verify it exists in shared storage
          const monsterName = monster.name;
          if (!monsterName) continue;

          // Try to find this monster in shared statblock storage
          const statblock = getStatblockFromStorage(monsterName);
          if (!statblock) continue;

          // Find the folder where this statblock is stored
          const monsters = JSON.parse(localStorage.getItem('monsters') || '{}');
          let statblockFolder = null;

          for (const folder in monsters) {
            if (Array.isArray(monsters[folder])) {
              const found = monsters[folder].find(s => s.name === monsterName);
              if (found) {
                statblockFolder = folder;
                break;
              }
            }
          }

          if (!statblockFolder) continue;

          const statblockId = `${monsterName}__${statblockFolder}`;

          // Check if reference already exists
          if (!referenceExists('statblock', statblockId, 'encounter', encounterId, 'features_in_encounter')) {
            addReference({
              source_type: 'statblock',
              source_id: statblockId,
              source_name: monsterName,
              target_type: 'encounter',
              target_id: encounterId,
              target_name: encounterName,
              relationship: 'features_in_encounter',
              context: ''
            });
            count++;
          }
        }
      }
    }
  } catch (error) {
    console.error('Error extracting encounter statblock references:', error);
  }

  return count;
}

/**
 * Extract `mentioned_in_item` references from items whose `related_npcs` stubs
 * already point to canonical NPCs (via `npc_id`).
 *
 * Items are stored as a flat array in `savedItems` and the reference graph
 * identity for an item is its `name` (item names are unique per user).
 *
 * @returns {number}
 */
function extractItemNPCReferences() {
  let count = 0;

  try {
    const itemsRaw = localStorage.getItem('savedItems');
    if (!itemsRaw) return 0;

    const items = JSON.parse(itemsRaw);
    if (!Array.isArray(items)) return 0;

    for (const item of items) {
      if (!item?.name || !Array.isArray(item.related_npcs)) continue;

      for (const stub of item.related_npcs) {
        if (!stub?.npc_id || !stub?.name) continue;

        if (referenceExists('npc', stub.npc_id, 'item', item.name, 'mentioned_in_item')) continue;

        addReference({
          source_type: 'npc',
          source_id: stub.npc_id,
          source_name: stub.name,
          target_type: 'item',
          target_id: item.name,
          target_name: item.name,
          relationship: 'mentioned_in_item',
          context: stub.role_brief || ''
        });
        count++;
      }
    }
  } catch (error) {
    console.error('Error extracting item NPC references:', error);
  }

  return count;
}

/**
 * Main migration function that runs all extraction steps.
 */
export function extractExistingReferences() {
  console.log('Starting reference extraction migration...');

  let totalCount = 0;

  const npcStatblocks = extractNPCStatblockReferences();
  totalCount += npcStatblocks;
  console.log(`- Extracted ${npcStatblocks} NPC → statblock references`);

  const dungeonNPCs = extractDungeonNPCReferences();
  totalCount += dungeonNPCs;
  console.log(`- Extracted ${dungeonNPCs} NPC → dungeon references`);

  const dungeonMonsters = extractDungeonMonsterReferences();
  totalCount += dungeonMonsters;
  console.log(`- Extracted ${dungeonMonsters} statblock → dungeon references`);

  const settingNPCs = extractSettingNPCReferences();
  totalCount += settingNPCs;
  console.log(`- Extracted ${settingNPCs} NPC → setting references`);

  const encounterStatblocks = extractEncounterStatblockReferences();
  totalCount += encounterStatblocks;
  console.log(`- Extracted ${encounterStatblocks} statblock → encounter references`);

  const itemNPCs = extractItemNPCReferences();
  totalCount += itemNPCs;
  console.log(`- Extracted ${itemNPCs} NPC → item references`);

  console.log(`✓ Reference extraction complete: ${totalCount} references created`);
}
