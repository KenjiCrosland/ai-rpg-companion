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
 * @returns {Object|null} - The statblock object or null if not found
 */
export function getStatblockFromStorage(name, folder = null) {
  const stored = JSON.parse(localStorage.getItem('monsters') || '{}');

  // Check specified folder first
  if (folder && stored[folder]) {
    const found = stored[folder].find(s => s.name === name);
    if (found) return found;
  }

  // Fallback: search all folders
  for (const f of Object.values(stored)) {
    if (!Array.isArray(f)) continue;
    const found = f.find(s => s.name === name);
    if (found) return found;
  }

  return null;
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
