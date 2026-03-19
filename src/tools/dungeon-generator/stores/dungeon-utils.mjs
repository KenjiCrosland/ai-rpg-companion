import { dungeons } from './dungeon-state.mjs';
import { saveStatblockToStorage, getStatblockFromStorage } from '@/util/statblock-storage.mjs';
import { saveNPCToStorage, dungeonNPCToCanonical } from '@/util/npc-storage.mjs';

export function saveDungeons() {
  // Prepare dungeons for save by stripping resolved statblocks
  const dungeonsToSave = dungeons.value.map(dungeon => prepareDungeonForSave(dungeon));
  localStorage.setItem('dungeons', JSON.stringify(dungeonsToSave));
}

export function loadDungeons(currentDungeonId) {
  const savedDungeons = localStorage.getItem('dungeons');
  if (savedDungeons) {
    dungeons.value = JSON.parse(savedDungeons);
    currentDungeonId.value = dungeons.value.length
      ? dungeons.value[0].id
      : null;

    // Migrate and resolve statblocks for all dungeons
    let anyMigrated = false;
    dungeons.value.forEach(dungeon => {
      const statblockMigrated = migrateDungeonStatblocks(dungeon);
      const npcMigrated = migrateDungeonNPCs(dungeon);
      if (statblockMigrated || npcMigrated) anyMigrated = true;
      resolveDungeonStatblocks(dungeon);
    });

    // Save if any migrations occurred
    if (anyMigrated) {
      saveDungeons();
    }
  }
}

export function findMonsterById(currentDungeon, monsterId) {
  if (!currentDungeon.value) return null;
  const monsters = currentDungeon.value.monsters || [];
  return monsters.find((m) => m.id === monsterId);
}

function prepareDungeonForSave(dungeon) {
  const clone = JSON.parse(JSON.stringify(dungeon));

  // TEMPORARY: Keep both nested statblocks AND references for safety during migration period
  // TODO: Later, uncomment the code below to strip nested statblocks and only keep references

  // if (clone.monsters) {
  //   clone.monsters.forEach(monster => {
  //     if (monster.statblock_name) {
  //       delete monster.statblock; // only keep reference
  //     }
  //   });
  // }

  // if (clone.npcs) {
  //   clone.npcs.forEach(npc => {
  //     if (npc.statblock_name) {
  //       delete npc.statblock; // only keep reference
  //     }
  //   });
  // }

  return clone;
}

function resolveDungeonStatblocks(dungeon) {
  let resolvedMonsters = 0;
  let resolvedNPCs = 0;
  let missingMonsters = 0;
  let missingNPCs = 0;

  // Resolve monster statblocks
  if (dungeon.monsters) {
    dungeon.monsters.forEach(monster => {
      if (monster.statblock_name) {
        // Prefer reference over nested statblock (delete stale nested data in memory)
        const hadNested = !!monster.statblock;
        delete monster.statblock;
        monster.statblock = getStatblockFromStorage(
          monster.statblock_name,
          monster.statblock_folder
        );
        if (monster.statblock) {
          resolvedMonsters++;
          // if (hadNested) {
          //   console.log(`  → Resolved monster "${monster.statblock_name}" from shared storage (replaced nested)`);
          // }
        } else {
          missingMonsters++;
          // console.warn(`  ⚠ Monster "${monster.statblock_name}" not found in shared storage!`);
        }
      }
      // else if (monster.statblock) → keep legacy nested statblock as fallback
    });
  }

  // Resolve NPC statblocks
  if (dungeon.npcs) {
    dungeon.npcs.forEach(npc => {
      if (npc.statblock_name) {
        // Prefer reference over nested statblock (delete stale nested data in memory)
        const hadNested = !!npc.statblock;
        delete npc.statblock;
        npc.statblock = getStatblockFromStorage(
          npc.statblock_name,
          npc.statblock_folder
        );
        if (npc.statblock) {
          resolvedNPCs++;
          // if (hadNested) {
          //   console.log(`  → Resolved NPC "${npc.statblock_name}" from shared storage (replaced nested)`);
          // }
        } else {
          missingNPCs++;
          // console.warn(`  ⚠ NPC "${npc.statblock_name}" not found in shared storage!`);
        }
      }
      // else if (npc.statblock) → keep legacy nested statblock as fallback
    });
  }

  // if (resolvedMonsters + resolvedNPCs > 0) {
  //   console.log(`[DUNGEON RESOLVE] Resolved ${resolvedMonsters} monsters and ${resolvedNPCs} NPCs from shared storage`);
  // }
  // if (missingMonsters + missingNPCs > 0) {
  //   console.warn(`[DUNGEON RESOLVE] ${missingMonsters} monsters and ${missingNPCs} NPCs not found in shared storage`);
  // }
}

function migrateDungeonStatblocks(dungeon) {
  const folderName = dungeon.dungeonOverview?.name || 'Dungeon Creatures';
  let migrated = false;
  let monsterCount = 0;
  let npcCount = 0;

  // console.log(`[DUNGEON MIGRATION] Starting migration for "${dungeon.dungeonOverview?.name || 'Unknown Dungeon'}"`);

  if (dungeon.monsters) {
    dungeon.monsters.forEach(monster => {
      if (monster.statblock && monster.statblock.name && !monster.statblock_name) {
        // console.log(`  → Migrating monster: "${monster.statblock.name}" to folder "${folderName}"`);
        saveStatblockToStorage(monster.statblock, folderName);
        monster.statblock_name = monster.statblock.name;
        monster.statblock_folder = folderName;
        migrated = true;
        monsterCount++;
      }
    });
  }

  if (dungeon.npcs) {
    dungeon.npcs.forEach(npc => {
      if (npc.statblock && npc.statblock.name && !npc.statblock_name) {
        // console.log(`  → Migrating NPC: "${npc.statblock.name}" to folder "${folderName}"`);
        saveStatblockToStorage(npc.statblock, folderName);
        npc.statblock_name = npc.statblock.name;
        npc.statblock_folder = folderName;
        migrated = true;
        npcCount++;
      }
    });
  }

  // if (migrated) {
  //   console.log(`[DUNGEON MIGRATION] ✓ Migrated ${monsterCount} monsters and ${npcCount} NPCs to shared storage`);
  // } else {
  //   console.log(`[DUNGEON MIGRATION] No migration needed (already has references or no statblocks)`);
  // }

  return migrated; // Return true if migration happened
}

function migrateDungeonNPCs(dungeon) {
  const dungeonTitle = dungeon.dungeonOverview?.name || 'Dungeon NPCs';
  let migrated = false;

  if (dungeon.npcs) {
    // Load shared storage once
    const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs') || '{}');
    const sharedNPCs = stored[dungeonTitle] || [];

    dungeon.npcs.forEach((npc) => {
      // Skip if already migrated AND has an ID (fully processed)
      if (npc.migrated_to_shared && npc.npc_id) {
        return;
      }

      // If marked as migrated but no ID, try to sync ID from shared storage
      if (npc.migrated_to_shared && !npc.npc_id) {
        const existingNPC = sharedNPCs.find(n =>
          n.npcDescriptionPart1?.character_name === npc.name
        );
        if (existingNPC) {
          // Check both npc_id and id fields
          const existingId = existingNPC.npc_id || existingNPC.id;
          if (existingId) {
            npc.npc_id = existingId;
            migrated = true;
            return;
          } else {
            npc.migrated_to_shared = false; // Reset flag so we can re-migrate
          }
        } else {
          npc.migrated_to_shared = false; // Reset flag so we can re-migrate
        }
      }

      // Only migrate NPCs with full descriptions (read_aloud_description)
      if (npc.read_aloud_description) {
        // Check if NPC already exists in shared storage
        const existingNPC = sharedNPCs.find(n =>
          (n.npc_id && (n.npc_id === npc.npc_id || n.id === npc.npc_id)) ||
          (n.npcDescriptionPart1?.character_name === npc.name)
        );

        if (existingNPC) {
          // NPC already in shared storage - just sync ID back, don't overwrite
          // Check both npc_id and id fields (shared storage might use either)
          const existingId = existingNPC.npc_id || existingNPC.id;
          if (existingId && !npc.npc_id) {
            npc.npc_id = existingId;
            migrated = true;
          }
        } else {
          // NPC not in shared storage - save it (initial migration)
          const canonicalNPC = dungeonNPCToCanonical(npc, dungeonTitle);
          saveNPCToStorage(canonicalNPC, dungeonTitle);

          // Sync ID back
          if (canonicalNPC.npc_id) {
            npc.npc_id = canonicalNPC.npc_id;
            migrated = true;
          }
        }

        // Mark as migrated so we don't overwrite on subsequent loads
        npc.migrated_to_shared = true;
        migrated = true;
      }
    });
  }

  return migrated;
}
