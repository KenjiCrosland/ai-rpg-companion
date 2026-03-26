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
    const references = JSON.parse(localStorage.getItem('entity-references') || '[]');
    let updated = false;

    for (const ref of references) {
      if (ref.target_type === 'statblock' &&
          ref.target_id === `${statblockName}__${oldFolder}`) {
        ref.target_id = `${statblockName}__${newFolder}`;
        updated = true;
      }
    }

    if (updated) {
      localStorage.setItem('entity-references', JSON.stringify(references));
    }
  } catch (error) {
    console.warn('Failed to update reference store:', error);
  }
}

/**
 * Update all references to a renamed statblock across all tools
 * @param {string} oldName - The old statblock name
 * @param {string} newName - The new statblock name
 * @returns {Object} - Object with counts of updated references
 */
export function renameStatblockReferences(oldName, newName) {
  let npcReferencesUpdated = 0;
  let dungeonReferencesUpdated = 0;

  // Update NPC Generator NPCs
  const npcGeneratorNPCs = JSON.parse(localStorage.getItem('npcGeneratorNPCs') || '{}');
  let npcUpdated = false;

  for (const folder of Object.values(npcGeneratorNPCs)) {
    if (!Array.isArray(folder)) continue;
    for (const npc of folder) {
      if (npc.npcDescriptionPart1?.statblock_name === oldName) {
        npc.npcDescriptionPart1.statblock_name = newName;
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
        if (monster.statblock_name === oldName) {
          monster.statblock_name = newName;
          dungeonsUpdated = true;
          dungeonReferencesUpdated++;
        }
      }
    }

    // Update NPC references
    if (dungeon.npcs) {
      for (const npc of dungeon.npcs) {
        if (npc.statblock_name === oldName) {
          npc.statblock_name = newName;
          dungeonsUpdated = true;
          dungeonReferencesUpdated++;
        }
      }
    }
  }

  if (dungeonsUpdated) {
    localStorage.setItem('dungeons', JSON.stringify(dungeons));
  }

  return {
    npcReferencesUpdated,
    dungeonReferencesUpdated,
    totalUpdated: npcReferencesUpdated + dungeonReferencesUpdated
  };
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
  const references = JSON.parse(localStorage.getItem('entity-references') || '[]');
  let referencesUpdated = false;

  for (const ref of references) {
    if (ref.target_type === 'statblock' && ref.target_id.endsWith(`__${oldFolder}`)) {
      const statblockName = ref.target_id.substring(0, ref.target_id.lastIndexOf('__'));
      ref.target_id = `${statblockName}__${newFolder}`;
      referencesUpdated = true;
    }
  }

  if (referencesUpdated) {
    localStorage.setItem('entity-references', JSON.stringify(references));
  }

  return {
    npcReferencesUpdated,
    dungeonReferencesUpdated,
    settingReferencesUpdated,
    totalUpdated: npcReferencesUpdated + dungeonReferencesUpdated + settingReferencesUpdated
  };
}
