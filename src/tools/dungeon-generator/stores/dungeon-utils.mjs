import { dungeons } from './dungeon-state.mjs';
import { saveStatblockToStorage, getStatblockFromStorage } from '@/util/statblock-storage.mjs';

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
      const migrated = migrateDungeonStatblocks(dungeon);
      if (migrated) anyMigrated = true;
      resolveDungeonStatblocks(dungeon);
    });

    // Save if any migrations occurred
    if (anyMigrated) {
      // console.log('[DUNGEON MIGRATION] Saving migrated references to localStorage');
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
