/**
 * Statblock Storage Utility
 *
 * Manages shared statblock storage in localStorage under the 'monsters' key.
 * Statblocks are organized by folder for easy organization and cross-tool access.
 */

/**
 * Save a statblock to shared storage
 * @param {Object} statblock - The statblock object to save
 * @param {string} folderName - The folder to save it in (default: 'Uncategorized')
 */
export function saveStatblockToStorage(statblock, folderName = 'Uncategorized') {
  const stored = JSON.parse(localStorage.getItem('monsters') || '{}');

  if (!stored[folderName]) {
    stored[folderName] = [];
  }

  // Check for duplicate by name — update if exists
  const existingIndex = stored[folderName].findIndex(
    s => s.name === statblock.name
  );

  if (existingIndex !== -1) {
    stored[folderName][existingIndex] = statblock;
  } else {
    stored[folderName].push(statblock);
  }

  localStorage.setItem('monsters', JSON.stringify(stored));
}

/**
 * Get a statblock from shared storage by name
 * @param {string} name - The statblock name to search for
 * @param {string} folder - Optional folder name to check first
 * @param {Object} context - Optional context for auto-fixing stale references
 *   @param {string} context.npcId - NPC ID to update if found in different folder
 *   @param {string} context.folderName - Current folder of the NPC
 * @returns {Object|null} - The statblock object or null if not found
 */
export function getStatblockFromStorage(name, folder = null, context = null) {
  const stored = JSON.parse(localStorage.getItem('monsters') || '{}');

  // Check specified folder first
  if (folder && stored[folder]) {
    const found = stored[folder].find(s => s.name === name);
    if (found) return found;
  }

  // Fallback: search all folders
  for (const [folderName, monsters] of Object.entries(stored)) {
    if (!Array.isArray(monsters)) continue;
    const found = monsters.find(s => s.name === name);
    if (found) {
      // Auto-fix stale reference if context provided
      if (context && folder && folderName !== folder) {
        autoFixStatblockReference(name, folder, folderName, context);
      }
      return found;
    }
  }

  return null;
}

/**
 * Auto-fix a stale statblock folder reference
 * @param {string} statblockName - The statblock name
 * @param {string} oldFolder - The old (stale) folder reference
 * @param {string} newFolder - The new (correct) folder where statblock was found
 * @param {Object} context - Context about what to update
 */
function autoFixStatblockReference(statblockName, oldFolder, newFolder, context) {
  // Update NPC reference
  if (context.npcId && context.folderName) {
    const npcGeneratorNPCs = JSON.parse(localStorage.getItem('npcGeneratorNPCs') || '{}');
    const folder = npcGeneratorNPCs[context.folderName];

    if (folder && Array.isArray(folder)) {
      const npc = folder.find(n => n.npc_id === context.npcId);
      if (npc && npc.npcDescriptionPart1?.statblock_name === statblockName) {
        npc.npcDescriptionPart1.statblock_folder = newFolder;
        localStorage.setItem('npcGeneratorNPCs', JSON.stringify(npcGeneratorNPCs));
      }
    }
  }

  // Update reference store
  try {
    const references = JSON.parse(localStorage.getItem('tool-references') || '[]');
    let updated = false;

    for (const ref of references) {
      if (ref.target_type === 'statblock' &&
          ref.target_id === `${statblockName}__${oldFolder}`) {
        ref.target_id = `${statblockName}__${newFolder}`;
        updated = true;
      }
    }

    if (updated) {
      localStorage.setItem('tool-references', JSON.stringify(references));
    }
  } catch (error) {
    console.warn('Failed to update reference store:', error);
  }
}

/**
 * Update all references to a renamed statblock across every store that
 * names this statblock by name.
 *
 * Walks five stores:
 *   - `npcGeneratorNPCs`: NPCs whose `statblock_name` matches oldName
 *   - `dungeons`: dungeon monsters and dungeon NPCs (legacy flat shape AND
 *     the part1-nested shape, since both exist in the wild)
 *   - `gameSettings`: setting NPCs whose `statblock_name` matches
 *   - `tool-references`: any ref whose target_id (or source_id) is
 *     `${oldName}__${anyFolder}` — rewrites the name segment, preserves folder
 *
 * Without the `tool-references` walk, the StatblockGenerator's linked-NPCs
 * panel goes empty after a rename and only repopulates once NPCGenerator
 * mounts and `migrateNPCStatblockReferences` heals via reload. The walk
 * here keeps the panel correct in real time.
 *
 * Dispatches `npc-storage-updated` so same-tab listeners
 * (StatblockGenerator's linkedNPCs computed) refresh without a reload.
 *
 * @param {string} oldName - The old statblock name
 * @param {string} newName - The new statblock name
 * @returns {Object} per-store update counts
 */
export function renameStatblockReferences(oldName, newName) {
  const results = {
    npcReferencesUpdated: 0,
    dungeonReferencesUpdated: 0,
    settingReferencesUpdated: 0,
    toolReferencesUpdated: 0,
    totalUpdated: 0,
  };

  if (!oldName || !newName || oldName === newName) {
    return results;
  }

  // NPC Generator NPCs
  try {
    const npcGeneratorNPCs = JSON.parse(localStorage.getItem('npcGeneratorNPCs') || '{}');
    let updated = false;
    for (const folder of Object.values(npcGeneratorNPCs)) {
      if (!Array.isArray(folder)) continue;
      for (const npc of folder) {
        if (npc?.npcDescriptionPart1?.statblock_name === oldName) {
          npc.npcDescriptionPart1.statblock_name = newName;
          results.npcReferencesUpdated++;
          updated = true;
        }
      }
    }
    if (updated) {
      localStorage.setItem('npcGeneratorNPCs', JSON.stringify(npcGeneratorNPCs));
    }
  } catch (error) {
    console.warn('Failed to update NPC statblock references during rename:', error);
  }

  // Dungeons (monsters + NPCs, both flat and part1-nested shapes)
  try {
    const dungeons = JSON.parse(localStorage.getItem('dungeons') || '[]');
    let updated = false;
    for (const dungeon of dungeons) {
      if (Array.isArray(dungeon?.monsters)) {
        for (const monster of dungeon.monsters) {
          if (monster?.statblock_name === oldName) {
            monster.statblock_name = newName;
            results.dungeonReferencesUpdated++;
            updated = true;
          }
        }
      }
      if (Array.isArray(dungeon?.npcs)) {
        for (const npc of dungeon.npcs) {
          if (npc?.statblock_name === oldName) {
            npc.statblock_name = newName;
            results.dungeonReferencesUpdated++;
            updated = true;
          }
          if (npc?.npcDescriptionPart1?.statblock_name === oldName) {
            npc.npcDescriptionPart1.statblock_name = newName;
            results.dungeonReferencesUpdated++;
            updated = true;
          }
        }
      }
    }
    if (updated) {
      localStorage.setItem('dungeons', JSON.stringify(dungeons));
    }
  } catch (error) {
    console.warn('Failed to update dungeon statblock references during rename:', error);
  }

  // Settings
  try {
    const settings = JSON.parse(localStorage.getItem('gameSettings') || '[]');
    let updated = false;
    for (const setting of settings) {
      if (!Array.isArray(setting?.npcs)) continue;
      for (const npc of setting.npcs) {
        if (npc?.npcDescriptionPart1?.statblock_name === oldName) {
          npc.npcDescriptionPart1.statblock_name = newName;
          results.settingReferencesUpdated++;
          updated = true;
        }
      }
    }
    if (updated) {
      localStorage.setItem('gameSettings', JSON.stringify(settings));
    }
  } catch (error) {
    console.warn('Failed to update setting statblock references during rename:', error);
  }

  // tool-references graph: rewrite the name segment of every statblock id.
  // The id format is `${name}__${folder}`; we preserve folder and swap name.
  try {
    const refs = JSON.parse(localStorage.getItem('tool-references') || '[]');
    if (Array.isArray(refs)) {
      const oldPrefix = `${oldName}__`;
      let updated = false;
      const rewriteId = (id) => `${newName}__${id.slice(oldPrefix.length)}`;
      for (const ref of refs) {
        if (ref?.target_type === 'statblock' && typeof ref?.target_id === 'string'
            && ref.target_id.startsWith(oldPrefix)) {
          ref.target_id = rewriteId(ref.target_id);
          if (ref.target_name === oldName) ref.target_name = newName;
          results.toolReferencesUpdated++;
          updated = true;
        }
        if (ref?.source_type === 'statblock' && typeof ref?.source_id === 'string'
            && ref.source_id.startsWith(oldPrefix)) {
          ref.source_id = rewriteId(ref.source_id);
          if (ref.source_name === oldName) ref.source_name = newName;
          results.toolReferencesUpdated++;
          updated = true;
        }
      }
      if (updated) {
        localStorage.setItem('tool-references', JSON.stringify(refs));
      }
    }
  } catch (error) {
    console.warn('Failed to update tool-references during statblock rename:', error);
  }

  results.totalUpdated =
    results.npcReferencesUpdated +
    results.dungeonReferencesUpdated +
    results.settingReferencesUpdated +
    results.toolReferencesUpdated;

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('npc-storage-updated', {
      detail: { action: 'statblock-rename', oldName, newName },
    }));
  }

  return results;
}

/**
 * Update all statblock folder references when a folder is renamed
 * @param {string} oldFolder - The old folder name
 * @param {string} newFolder - The new folder name
 * @returns {Object} - Object with counts of updated references
 */
export function renameStatblockFolder(oldFolder, newFolder) {
  let npcReferencesUpdated = 0;
  let dungeonReferencesUpdated = 0;
  let settingReferencesUpdated = 0;

  // Update NPC Generator NPCs
  const npcGeneratorNPCs = JSON.parse(localStorage.getItem('npcGeneratorNPCs') || '{}');
  let npcUpdated = false;

  for (const folder of Object.values(npcGeneratorNPCs)) {
    if (!Array.isArray(folder)) continue;
    for (const npc of folder) {
      if (npc.npcDescriptionPart1?.statblock_folder === oldFolder) {
        npc.npcDescriptionPart1.statblock_folder = newFolder;
        npcUpdated = true;
        npcReferencesUpdated++;
      }
    }
  }

  if (npcUpdated) {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify(npcGeneratorNPCs));
  }

  // Update Dungeon Generator dungeons
  const dungeons = JSON.parse(localStorage.getItem('dungeons') || '[]');
  let dungeonsUpdated = false;

  for (const dungeon of dungeons) {
    // Update monster references
    if (dungeon.monsters) {
      for (const monster of dungeon.monsters) {
        if (monster.statblock_folder === oldFolder) {
          monster.statblock_folder = newFolder;
          dungeonsUpdated = true;
          dungeonReferencesUpdated++;
        }
      }
    }

    // Update NPC references
    if (dungeon.npcs) {
      for (const npc of dungeon.npcs) {
        if (npc.npcDescriptionPart1?.statblock_folder === oldFolder) {
          npc.npcDescriptionPart1.statblock_folder = newFolder;
          dungeonsUpdated = true;
          dungeonReferencesUpdated++;
        }
      }
    }
  }

  if (dungeonsUpdated) {
    localStorage.setItem('dungeons', JSON.stringify(dungeons));
  }

  // Update Setting Generator settings
  const settings = JSON.parse(localStorage.getItem('gameSettings') || '[]');
  let settingsUpdated = false;

  for (const setting of settings) {
    // Update NPC references in settings
    if (setting.npcs && Array.isArray(setting.npcs)) {
      for (const npc of setting.npcs) {
        if (npc.npcDescriptionPart1?.statblock_folder === oldFolder) {
          npc.npcDescriptionPart1.statblock_folder = newFolder;
          settingsUpdated = true;
          settingReferencesUpdated++;
        }
      }
    }
  }

  if (settingsUpdated) {
    localStorage.setItem('gameSettings', JSON.stringify(settings));
  }

  // Update reference store IDs
  const references = JSON.parse(localStorage.getItem('tool-references') || '[]');
  let referencesUpdated = false;

  for (const ref of references) {
    if (ref.target_type === 'statblock' && ref.target_id.endsWith(`__${oldFolder}`)) {
      const statblockName = ref.target_id.substring(0, ref.target_id.lastIndexOf('__'));
      ref.target_id = `${statblockName}__${newFolder}`;
      referencesUpdated = true;
    }
  }

  if (referencesUpdated) {
    localStorage.setItem('tool-references', JSON.stringify(references));
  }

  return {
    npcReferencesUpdated,
    dungeonReferencesUpdated,
    settingReferencesUpdated,
    totalUpdated: npcReferencesUpdated + dungeonReferencesUpdated + settingReferencesUpdated
  };
}

/**
 * Move a single statblock between folders. Updates every cross-tool
 * pointer that names this specific (statblockName, oldFolder) pair so
 * existing NPC links survive the move.
 *
 * The canonical statblock object's location in the `monsters` store is
 * the caller's responsibility — this function only fixes the cross-tool
 * pointers that would otherwise dangle. It mirrors `renameStatblockFolder`
 * but matches by name+folder instead of folder alone, so other statblocks
 * in the same source folder aren't affected.
 *
 * Updates four stores:
 *   - `npcGeneratorNPCs`: NPCs whose statblock_name matches and statblock_folder === oldFolder
 *   - `dungeons`: dungeon monsters and dungeon NPCs (both legacy flat shape and part1-nested shape)
 *   - `gameSettings`: setting NPCs
 *   - `tool-references`: refs whose target/source id is `${statblockName}__${oldFolder}`
 *
 * Dispatches `npc-storage-updated` so same-tab listeners (e.g., the
 * StatblockGenerator's linked-NPCs panel) refresh without a reload.
 *
 * @param {string} statblockName
 * @param {string} oldFolder
 * @param {string} newFolder
 * @returns {Object} per-store update counts
 */
export function moveStatblockToNewFolder(statblockName, oldFolder, newFolder) {
  const results = {
    npcReferencesUpdated: 0,
    dungeonReferencesUpdated: 0,
    settingReferencesUpdated: 0,
    toolReferencesUpdated: 0,
    totalUpdated: 0,
  };

  if (!statblockName || !oldFolder || !newFolder || oldFolder === newFolder) {
    return results;
  }

  // NPC Generator NPCs
  try {
    const npcGeneratorNPCs = JSON.parse(localStorage.getItem('npcGeneratorNPCs') || '{}');
    let updated = false;
    for (const folder of Object.values(npcGeneratorNPCs)) {
      if (!Array.isArray(folder)) continue;
      for (const npc of folder) {
        const part1 = npc?.npcDescriptionPart1;
        if (part1?.statblock_name === statblockName && part1?.statblock_folder === oldFolder) {
          part1.statblock_folder = newFolder;
          results.npcReferencesUpdated++;
          updated = true;
        }
      }
    }
    if (updated) {
      localStorage.setItem('npcGeneratorNPCs', JSON.stringify(npcGeneratorNPCs));
    }
  } catch (error) {
    console.warn('Failed to update NPC statblock references during folder move:', error);
  }

  // Dungeons
  try {
    const dungeons = JSON.parse(localStorage.getItem('dungeons') || '[]');
    let updated = false;
    for (const dungeon of dungeons) {
      if (Array.isArray(dungeon?.monsters)) {
        for (const monster of dungeon.monsters) {
          if (monster?.statblock_name === statblockName && monster?.statblock_folder === oldFolder) {
            monster.statblock_folder = newFolder;
            results.dungeonReferencesUpdated++;
            updated = true;
          }
        }
      }
      if (Array.isArray(dungeon?.npcs)) {
        for (const npc of dungeon.npcs) {
          const part1 = npc?.npcDescriptionPart1;
          if (part1?.statblock_name === statblockName && part1?.statblock_folder === oldFolder) {
            part1.statblock_folder = newFolder;
            results.dungeonReferencesUpdated++;
            updated = true;
          }
          // Some legacy dungeon NPCs store statblock_* directly on the entry.
          if (npc?.statblock_name === statblockName && npc?.statblock_folder === oldFolder) {
            npc.statblock_folder = newFolder;
            results.dungeonReferencesUpdated++;
            updated = true;
          }
        }
      }
    }
    if (updated) {
      localStorage.setItem('dungeons', JSON.stringify(dungeons));
    }
  } catch (error) {
    console.warn('Failed to update dungeon statblock references during folder move:', error);
  }

  // Settings
  try {
    const settings = JSON.parse(localStorage.getItem('gameSettings') || '[]');
    let updated = false;
    for (const setting of settings) {
      if (!Array.isArray(setting?.npcs)) continue;
      for (const npc of setting.npcs) {
        const part1 = npc?.npcDescriptionPart1;
        if (part1?.statblock_name === statblockName && part1?.statblock_folder === oldFolder) {
          part1.statblock_folder = newFolder;
          results.settingReferencesUpdated++;
          updated = true;
        }
      }
    }
    if (updated) {
      localStorage.setItem('gameSettings', JSON.stringify(settings));
    }
  } catch (error) {
    console.warn('Failed to update setting statblock references during folder move:', error);
  }

  // tool-references graph (target side and source side, defensive)
  try {
    const refs = JSON.parse(localStorage.getItem('tool-references') || '[]');
    if (Array.isArray(refs)) {
      const oldId = `${statblockName}__${oldFolder}`;
      const newId = `${statblockName}__${newFolder}`;
      let updated = false;
      for (const ref of refs) {
        if (ref?.target_type === 'statblock' && ref?.target_id === oldId) {
          ref.target_id = newId;
          results.toolReferencesUpdated++;
          updated = true;
        }
        if (ref?.source_type === 'statblock' && ref?.source_id === oldId) {
          ref.source_id = newId;
          results.toolReferencesUpdated++;
          updated = true;
        }
      }
      if (updated) {
        localStorage.setItem('tool-references', JSON.stringify(refs));
      }
    }
  } catch (error) {
    console.warn('Failed to update tool-references during statblock folder move:', error);
  }

  results.totalUpdated =
    results.npcReferencesUpdated +
    results.dungeonReferencesUpdated +
    results.settingReferencesUpdated +
    results.toolReferencesUpdated;

  // Same-tab listeners (StatblockGenerator's linked-NPCs panel, etc.)
  // pick this up alongside the existing `npc-storage-updated` event.
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('npc-storage-updated', {
      detail: { action: 'statblock-folder-move', statblockName, oldFolder, newFolder },
    }));
  }

  return results;
}
