/**
 * npc-storage.mjs
 *
 * Shared NPC storage utilities for extracting NPCs from dungeon and setting
 * generators to the canonical NPC generator storage format.
 *
 * This enables cross-tool NPC browsing and future features like NPC backstories
 * from statblock generator and NPC references in encounter generator.
 *
 * Also includes adapter functions to normalize NPC data for NPCCard.vue component.
 */

/**
 * Save an NPC to shared NPC storage (npcGeneratorNPCs localStorage).
 * Deduplicates by unique ID first, then by character name within the folder.
 *
 * @param {Object} npc - NPC in canonical format (npcDescriptionPart1/Part2)
 * @param {string} folderName - Folder name (typically dungeon/setting title)
 */
export function saveNPCToStorage(npc, folderName = 'Uncategorized') {
  let stored;

  try {
    stored = JSON.parse(
      localStorage.getItem('npcGeneratorNPCs') || '{"Uncategorized":[]}'
    );
  } catch (error) {
    // If localStorage is corrupted, start fresh
    console.warn('Corrupted NPC storage detected, starting fresh:', error);
    stored = { 'Uncategorized': [] };
  }

  if (!stored[folderName]) {
    stored[folderName] = [];
  }

  const name = getNPCName(npc);
  let id = npc.npc_id || npc.id;

  // AUTO-MIGRATION: If NPC has an ID, remove it from other folders (handles dungeon/setting renames)
  if (id) {
    for (const otherFolder in stored) {
      if (otherFolder !== folderName) {
        const duplicateIndex = stored[otherFolder].findIndex(n =>
          (n.npc_id === id || n.id === id)
        );
        if (duplicateIndex !== -1) {
          // Remove NPC from old folder
          stored[otherFolder].splice(duplicateIndex, 1);

          // Clean up empty folders
          if (stored[otherFolder].length === 0) {
            delete stored[otherFolder];
          }
        }
      }
    }
  }

  // Deduplicate by ID first (if present), then by name
  let existingIndex = -1;

  if (id) {
    // Try to find by ID first
    existingIndex = stored[folderName].findIndex(n =>
      (n.npc_id === id || n.id === id)
    );
  }

  if (existingIndex === -1) {
    // Fall back to finding by name
    existingIndex = stored[folderName].findIndex(n =>
      getNPCName(n) === name
    );
  }

  if (existingIndex !== -1) {
    // Update existing NPC (preserve/assign ID if needed)
    const existingId = stored[folderName][existingIndex].npc_id
      || stored[folderName][existingIndex].id;

    if (existingId) {
      // Use existing ID
      npc.npc_id = existingId;
    } else if (!id) {
      // No ID exists anywhere - generate one for migration
      id = `npc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      npc.npc_id = id;
    }

    stored[folderName][existingIndex] = npc;
  } else {
    // Add new NPC - ensure it has an ID
    if (!id) {
      npc.npc_id = `npc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    stored[folderName].push(npc);
  }

  localStorage.setItem('npcGeneratorNPCs', JSON.stringify(stored));

  // Dispatch custom event for same-tab updates
  // (storage event only fires for other tabs)
  window.dispatchEvent(new CustomEvent('npc-storage-updated', {
    detail: { npcId: npc.npc_id, action: 'save', folderName }
  }));
}

/**
 * Get NPC name regardless of data shape (canonical or source format).
 *
 * @param {Object} npc - NPC object in any format
 * @returns {string} The character name
 */
export function getNPCName(npc) {
  return npc?.npcDescriptionPart1?.character_name
    || npc?.character_name
    || npc?.name
    || 'Unknown NPC';
}

/**
 * Convert a dungeon NPC to the NPC generator canonical format.
 *
 * Maps dungeon-specific field names to canonical field names:
 * - why_in_dungeon → reason_for_being_there
 * - distinctive_features_or_mannerisms → distinctive_feature_or_mannerism
 *
 * @param {Object} npc - Dungeon NPC object
 * @param {string} dungeonTitle - Title of the dungeon (used as typeOfPlace)
 * @returns {Object} NPC in canonical format
 */
export function dungeonNPCToCanonical(npc, dungeonTitle) {
  return {
    npc_id: npc.npc_id || npc.id || null,
    npcDescriptionPart1: {
      character_name: npc.name,
      description_of_position: npc.description_of_position || '',
      reason_for_being_there: npc.why_in_dungeon || '',
      distinctive_feature_or_mannerism: npc.distinctive_features_or_mannerisms || '',
      character_secret: npc.character_secret || '',
      read_aloud_description: npc.read_aloud_description || '',
      roleplaying_tips: npc.roleplaying_tips || '',
      combined_details: npc.combined_details || '',
      statblock_name: npc.statblock_name || null,
      statblock_folder: npc.statblock_folder || null,
    },
    npcDescriptionPart2: {
      relationships: npc.relationships || {},
    },
    typeOfPlace: dungeonTitle || 'Dungeon',
    sourceType: 'dungeon',
  };
}

/**
 * Convert a setting NPC to the NPC generator canonical format.
 *
 * Maps setting-specific field names to canonical field names:
 * - current_location → reason_for_being_there
 * - distinctive_features_or_mannerisms → distinctive_feature_or_mannerism
 *
 * @param {Object} npc - Setting NPC object
 * @param {string} settingName - Name of the setting (used as typeOfPlace)
 * @returns {Object} NPC in canonical format
 */
export function settingNPCToCanonical(npc, settingName) {
  return {
    npc_id: npc.npc_id || npc.id || null,
    npcDescriptionPart1: {
      character_name: npc.name,
      description_of_position: npc.description_of_position || '',
      reason_for_being_there: npc.current_location || '',
      distinctive_feature_or_mannerism: npc.distinctive_features_or_mannerisms || '',
      character_secret: npc.character_secret || '',
      read_aloud_description: npc.read_aloud_description || '',
      roleplaying_tips: npc.roleplaying_tips || '',
      combined_details: npc.combined_details || '',
      statblock_name: npc.statblock_name || null,
      statblock_folder: npc.statblock_folder || null,
    },
    npcDescriptionPart2: {
      relationships: npc.relationships || {},
    },
    typeOfPlace: settingName || 'Setting',
    sourceType: 'setting',
  };
}

/**
 * Convert a canonical NPC to dungeon format for saving to dungeon's npcs array.
 *
 * Maps canonical field names to dungeon-specific field names:
 * - reason_for_being_there → why_in_dungeon
 * - distinctive_feature_or_mannerism → distinctive_features_or_mannerisms
 *
 * @param {Object} canonicalNPC - NPC in canonical format
 * @returns {Object} NPC in dungeon format
 */
export function canonicalToDungeonNPC(canonicalNPC) {
  const part1 = canonicalNPC.npcDescriptionPart1 || {};
  const part2 = canonicalNPC.npcDescriptionPart2 || {};

  return {
    npc_id: canonicalNPC.npc_id || canonicalNPC.id || null,
    name: part1.character_name || '',
    description_of_position: part1.description_of_position || '',
    why_in_dungeon: part1.reason_for_being_there || '',
    distinctive_features_or_mannerisms: part1.distinctive_feature_or_mannerism || '',
    character_secret: part1.character_secret || '',
    read_aloud_description: part1.read_aloud_description || '',
    roleplaying_tips: part1.roleplaying_tips || '',
    combined_details: part1.combined_details || '',
    relationships: part2.relationships || {},
    statblock_name: part1.statblock_name || null,
    statblock_folder: part1.statblock_folder || null,
  };
}

/**
 * Normalize a dungeon NPC to NPCCard format for display.
 *
 * @param {Object} npc - Dungeon NPC object
 * @returns {Object} Normalized NPC for NPCCard component
 */
export function normalizeDungeonNPC(npc) {
  // If combined_details doesn't exist, create it from individual fields
  let combinedDetails = npc.combined_details || '';
  if (!combinedDetails) {
    const parts = [];
    if (npc.description_of_position) parts.push(npc.description_of_position);
    if (npc.why_in_dungeon) parts.push(npc.why_in_dungeon);
    if (npc.distinctive_features_or_mannerisms) parts.push(npc.distinctive_features_or_mannerisms);
    if (npc.character_secret) parts.push(npc.character_secret);
    if (npc.roleplaying_tips) parts.push(npc.roleplaying_tips);
    combinedDetails = parts.filter(Boolean).join('\n\n');
  }

  return {
    name: npc.name,
    read_aloud_description: npc.read_aloud_description || '',
    combined_details: combinedDetails,
    secret: npc.character_secret || '',
    roleplaying_tips: npc.roleplaying_tips || '',
    relationships: npc.relationships || {},
    type_info: npc.statblock?.type_and_alignment || '',
  };
}

/**
 * Normalize a setting NPC to NPCCard format for display.
 *
 * @param {Object} npc - Setting NPC object
 * @returns {Object} Normalized NPC for NPCCard component
 */
export function normalizeSettingNPC(npc) {
  // If combined_details doesn't exist, create it from individual fields
  let combinedDetails = npc.combined_details || '';
  if (!combinedDetails) {
    const parts = [];
    if (npc.description_of_position) parts.push(npc.description_of_position);
    if (npc.current_location) parts.push(npc.current_location);
    if (npc.distinctive_features_or_mannerisms) parts.push(npc.distinctive_features_or_mannerisms);
    if (npc.character_secret) parts.push(npc.character_secret);
    if (npc.roleplaying_tips) parts.push(npc.roleplaying_tips);
    combinedDetails = parts.filter(Boolean).join('\n\n');
  }

  return {
    name: npc.name,
    read_aloud_description: npc.read_aloud_description || '',
    combined_details: combinedDetails,
    secret: npc.character_secret || '',
    roleplaying_tips: npc.roleplaying_tips || '',
    relationships: npc.relationships || {},
    type_info: '',
  };
}

/**
 * Normalize an NPC generator NPC to NPCCard format for display.
 *
 * @param {Object} npc - NPC generator NPC object
 * @returns {Object} Normalized NPC for NPCCard component
 */
export function normalizeGeneratorNPC(npc) {
  // Handle null/undefined NPC (e.g., during initial loading)
  if (!npc) {
    return {
      name: '',
      read_aloud_description: '',
      combined_details: '',
      relationships: {}
    };
  }

  const part1 = npc.npcDescriptionPart1 || {};
  const part2 = npc.npcDescriptionPart2 || {};

  // If combined_details doesn't exist, create it from individual fields
  let combinedDetails = part1.combined_details || '';
  if (!combinedDetails) {
    const parts = [];
    if (part1.description_of_position) parts.push(part1.description_of_position);
    if (part1.reason_for_being_there) parts.push(part1.reason_for_being_there);
    if (part1.distinctive_feature_or_mannerism) parts.push(part1.distinctive_feature_or_mannerism);
    if (part1.character_secret) parts.push(part1.character_secret);
    if (part1.roleplaying_tips) parts.push(part1.roleplaying_tips);
    combinedDetails = parts.filter(Boolean).join('\n\n');
  }

  return {
    name: part1.character_name || '',
    read_aloud_description: part1.read_aloud_description || '',
    combined_details: combinedDetails,
    secret: part1.character_secret || '',
    roleplaying_tips: part1.roleplaying_tips || '',
    relationships: part2.relationships || {},
    type_info: npc.typeOfPlace || '',
  };
}

/**
 * Save an NPC to a dungeon's npcs array.
 * Deduplicates by NPC ID or name.
 *
 * @param {Object} canonicalNPC - NPC in canonical format
 * @param {string} dungeonName - Name of the dungeon (matches dungeonOverview.name)
 * @returns {boolean} True if successfully saved, false if dungeon not found
 */
export function saveNPCToDungeon(canonicalNPC, dungeonName) {
  try {
    const dungeons = JSON.parse(localStorage.getItem('dungeons') || '[]');

    // Find the dungeon by dungeonOverview.name
    const dungeonIndex = dungeons.findIndex(d => d.dungeonOverview?.name === dungeonName);

    if (dungeonIndex === -1) {
      console.warn(`Dungeon "${dungeonName}" not found`);
      return false;
    }

    const dungeon = dungeons[dungeonIndex];

    // Ensure npcs array exists
    if (!dungeon.npcs) {
      dungeon.npcs = [];
    }

    // Convert canonical NPC to dungeon format
    const dungeonNPC = canonicalToDungeonNPC(canonicalNPC);

    // Find existing NPC by ID or name
    let existingIndex = -1;
    const npcId = dungeonNPC.npc_id;

    if (npcId) {
      existingIndex = dungeon.npcs.findIndex(n => n.npc_id === npcId || n.id === npcId);
    }

    if (existingIndex === -1) {
      existingIndex = dungeon.npcs.findIndex(n => n.name === dungeonNPC.name);
    }

    if (existingIndex !== -1) {
      // Update existing NPC
      dungeon.npcs[existingIndex] = dungeonNPC;
    } else {
      // Add new NPC
      dungeon.npcs.push(dungeonNPC);
    }

    // Save back to localStorage
    localStorage.setItem('dungeons', JSON.stringify(dungeons));

    return true;
  } catch (error) {
    console.error('Error saving NPC to dungeon:', error);
    return false;
  }
}

/**
 * Find all locations where an NPC exists (by npc_id).
 * Returns an object describing where the NPC is found.
 *
 * @param {string} npcId - The NPC's unique ID
 * @returns {Object} Object with locations: { npcGenerator: [], dungeons: [] }
 */
export function findNPCLocations(npcId) {
  const locations = {
    npcGenerator: [], // Array of folder names in npcGeneratorNPCs
    dungeons: []      // Array of dungeon names
  };

  if (!npcId) return locations;

  try {
    // Check NPC Generator storage
    const npcGeneratorStorage = JSON.parse(
      localStorage.getItem('npcGeneratorNPCs') || '{}'
    );

    for (const folderName in npcGeneratorStorage) {
      const npcs = npcGeneratorStorage[folderName];
      if (Array.isArray(npcs)) {
        const found = npcs.find(n => n.npc_id === npcId || n.id === npcId);
        if (found) {
          locations.npcGenerator.push(folderName);
        }
      }
    }

    // Check Dungeon Generator storage
    const dungeons = JSON.parse(localStorage.getItem('dungeons') || '[]');
    for (const dungeon of dungeons) {
      if (dungeon.npcs && Array.isArray(dungeon.npcs)) {
        const found = dungeon.npcs.find(n => n.npc_id === npcId || n.id === npcId);
        if (found && dungeon.dungeonOverview?.name) {
          locations.dungeons.push(dungeon.dungeonOverview.name);
        }
      }
    }
  } catch (error) {
    console.error('Error finding NPC locations:', error);
  }

  return locations;
}

/**
 * Delete an NPC from all storage locations (by npc_id).
 *
 * @param {string} npcId - The NPC's unique ID
 * @returns {Object} Object with deletion results: { npcGenerator: number, dungeons: number }
 */
export function deleteNPCFromAllLocations(npcId) {
  const results = {
    npcGenerator: 0, // Number of folders where NPC was deleted
    dungeons: 0      // Number of dungeons where NPC was deleted
  };

  if (!npcId) return results;

  try {
    // Delete from NPC Generator storage
    const npcGeneratorStorage = JSON.parse(
      localStorage.getItem('npcGeneratorNPCs') || '{}'
    );

    for (const folderName in npcGeneratorStorage) {
      const npcs = npcGeneratorStorage[folderName];
      if (Array.isArray(npcs)) {
        const index = npcs.findIndex(n => n.npc_id === npcId || n.id === npcId);
        if (index !== -1) {
          npcs.splice(index, 1);
          results.npcGenerator++;

          // Clean up empty folders (except Uncategorized)
          if (npcs.length === 0 && folderName !== 'Uncategorized') {
            delete npcGeneratorStorage[folderName];
          }
        }
      }
    }

    localStorage.setItem('npcGeneratorNPCs', JSON.stringify(npcGeneratorStorage));

    // Delete from Dungeon Generator storage
    const dungeons = JSON.parse(localStorage.getItem('dungeons') || '[]');
    for (const dungeon of dungeons) {
      if (dungeon.npcs && Array.isArray(dungeon.npcs)) {
        const index = dungeon.npcs.findIndex(n => n.npc_id === npcId || n.id === npcId);
        if (index !== -1) {
          dungeon.npcs.splice(index, 1);
          results.dungeons++;
        }
      }
    }

    localStorage.setItem('dungeons', JSON.stringify(dungeons));

    // Dispatch custom event for same-tab updates
    // (storage event only fires for other tabs)
    window.dispatchEvent(new CustomEvent('npc-storage-updated', {
      detail: { npcId, action: 'delete', results }
    }));
  } catch (error) {
    console.error('Error deleting NPC from all locations:', error);
  }

  return results;
}

/**
 * One-time migration: Add npc_id to all NPCs in localStorage that don't have one.
 * Should be called when NPC Generator loads.
 *
 * @returns {number} Number of NPCs migrated
 */
export function migrateNPCIds() {
  const stored = JSON.parse(
    localStorage.getItem('npcGeneratorNPCs') || '{}'
  );

  let migratedCount = 0;
  let needsSave = false;

  // Loop through all folders
  for (const folderName in stored) {
    const npcs = stored[folderName];
    if (!Array.isArray(npcs)) continue;

    // Loop through all NPCs in this folder
    for (let i = 0; i < npcs.length; i++) {
      const npc = npcs[i];

      // Check if NPC has an ID
      if (!npc.npc_id && !npc.id) {
        // Generate a unique ID
        npc.npc_id = `npc_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`;
        migratedCount++;
        needsSave = true;
      }
    }
  }

  // Save back to localStorage if any NPCs were migrated
  if (needsSave) {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify(stored));
  }

  return migratedCount;
}

/**
 * One-time migration: Add sourceType to all NPCs in localStorage that don't have one.
 * Infers sourceType by checking if folder name matches a dungeon or setting.
 * Should be called when NPC Generator loads.
 *
 * @returns {number} Number of NPCs migrated
 */
export function migrateSourceTypes() {
  const stored = JSON.parse(
    localStorage.getItem('npcGeneratorNPCs') || '{}'
  );

  // Get list of dungeon names
  const dungeons = JSON.parse(localStorage.getItem('dungeons') || '[]');
  const dungeonNames = new Set(
    dungeons.map(d => d.dungeonOverview?.name).filter(Boolean)
  );

  // Get list of setting names
  const settings = JSON.parse(localStorage.getItem('gameSettings') || '[]');
  const settingNames = new Set(
    settings.map(s => s.place_name).filter(Boolean)
  );

  let migratedCount = 0;
  let needsSave = false;

  // Loop through all folders
  for (const folderName in stored) {
    const npcs = stored[folderName];
    if (!Array.isArray(npcs)) continue;

    // Loop through all NPCs in this folder
    for (let i = 0; i < npcs.length; i++) {
      const npc = npcs[i];

      // Check if NPC already has sourceType
      if (!npc.sourceType) {
        // Infer sourceType from folder name
        if (dungeonNames.has(folderName)) {
          npc.sourceType = 'dungeon';
          migratedCount++;
          needsSave = true;
        } else if (settingNames.has(folderName)) {
          npc.sourceType = 'setting';
          migratedCount++;
          needsSave = true;
        }
        // If folder name doesn't match anything, don't add sourceType
        // (these are NPCs created directly in NPC Generator)
      }
    }
  }

  // Save back to localStorage if any NPCs were migrated
  if (needsSave) {
    localStorage.setItem('npcGeneratorNPCs', JSON.stringify(stored));
  }

  return migratedCount;
}

/**
 * One-time migration: Sync all dungeon NPCs to npcGeneratorNPCs if not already there.
 * Should be called when Dungeon Generator or NPC Generator loads.
 *
 * @returns {number} Number of NPCs migrated
 */
export function migrateDungeonNPCsToSharedStorage() {
  try {
    const dungeons = JSON.parse(localStorage.getItem('dungeons') || '[]');
    let migratedCount = 0;

    for (const dungeon of dungeons) {
      if (!dungeon.npcs || !Array.isArray(dungeon.npcs)) continue;

      const dungeonTitle = dungeon.dungeonOverview?.name || 'Dungeon NPCs';

      for (const dungeonNPC of dungeon.npcs) {
        // Skip if NPC doesn't have a full description (just a stub)
        if (!dungeonNPC.read_aloud_description && !dungeonNPC.description_of_position) {
          continue;
        }

        // Convert to canonical format
        const canonicalNPC = dungeonNPCToCanonical(dungeonNPC, dungeonTitle);

        // Check if NPC already exists in shared storage
        const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs') || '{}');
        const folderNPCs = stored[dungeonTitle] || [];

        const exists = canonicalNPC.npc_id && folderNPCs.some(n =>
          n.npc_id === canonicalNPC.npc_id || n.id === canonicalNPC.npc_id
        );

        if (!exists) {
          // Save to shared storage
          saveNPCToStorage(canonicalNPC, dungeonTitle);
          migratedCount++;
        }
      }
    }

    if (migratedCount > 0) {
      console.log(`Migrated ${migratedCount} dungeon NPCs to shared storage`);
    }

    return migratedCount;
  } catch (error) {
    console.error('Error migrating dungeon NPCs:', error);
    return 0;
  }
}

/**
 * One-time migration: Sync all setting NPCs to npcGeneratorNPCs if not already there.
 * Should be called when Setting Generator or NPC Generator loads.
 *
 * @returns {number} Number of NPCs migrated
 */
export function migrateSettingNPCsToSharedStorage() {
  try {
    const settings = JSON.parse(localStorage.getItem('gameSettings') || '[]');
    let migratedCount = 0;

    for (const setting of settings) {
      if (!setting.npcs || !Array.isArray(setting.npcs)) continue;

      const settingName = setting.setting_overview?.name || setting.place_name || 'Setting NPCs';

      for (const settingNPC of setting.npcs) {
        // Skip if NPC doesn't have a full description (just a stub)
        if (!settingNPC.read_aloud_description && !settingNPC.description_of_position) {
          continue;
        }

        // Convert to canonical format
        const canonicalNPC = settingNPCToCanonical(settingNPC, settingName);

        // Check if NPC already exists in shared storage
        const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs') || '{}');
        const folderNPCs = stored[settingName] || [];

        const exists = canonicalNPC.npc_id && folderNPCs.some(n =>
          n.npc_id === canonicalNPC.npc_id || n.id === canonicalNPC.npc_id
        );

        if (!exists) {
          // Save to shared storage
          saveNPCToStorage(canonicalNPC, settingName);
          migratedCount++;
        }
      }
    }

    if (migratedCount > 0) {
      console.log(`Migrated ${migratedCount} setting NPCs to shared storage`);
    }

    return migratedCount;
  } catch (error) {
    console.error('Error migrating setting NPCs:', error);
    return 0;
  }
}

/**
 * Propagate an NPC rename across every place the NPC's display name is
 * cached. NPCs use a stable `npc_id` so the link itself never breaks on
 * rename — but several stores cache the NPC's display name alongside
 * the id (for human-readable rendering), and those caches need to
 * follow the rename.
 *
 * Updates:
 *   1. `tool-references` entries where this NPC is source or target —
 *      `source_name` / `target_name` get the new name.
 *   2. Item stubs: `savedItems[*].related_npcs[*]` matched by `npc_id`,
 *      updates `stub.name`.
 *   3. Setting NPC stubs: `gameSettings[*].npcs[*]` matched by `npc_id`.
 *   4. Dungeon NPC stubs: `dungeons[*].npcs[*]` matched by `npc_id`.
 *
 * Does NOT touch prose fields (e.g., another NPC's `combined_details`
 * mentioning this NPC by name) — those are free-form text that may use
 * the name in many forms and aren't safe to substring-replace.
 *
 * Idempotent: no-op when nothing matches or already at the new name.
 *
 * @param {string} npcId
 * @param {string} newName
 * @returns {{ totalUpdated: number }}
 */
export function renameNPCReferences(npcId, newName) {
  if (!npcId || !newName) return { totalUpdated: 0 };
  let totalUpdated = 0;

  // 1. Reference graph.
  const referencesRaw = localStorage.getItem('tool-references');
  if (referencesRaw) {
    let references;
    try { references = JSON.parse(referencesRaw); } catch { references = null; }
    if (references && typeof references === 'object') {
      let changed = false;
      for (const ref of Object.values(references)) {
        if (ref.source_type === 'npc' && ref.source_id === npcId && ref.source_name !== newName) {
          ref.source_name = newName;
          totalUpdated++;
          changed = true;
        }
        if (ref.target_type === 'npc' && ref.target_id === npcId && ref.target_name !== newName) {
          ref.target_name = newName;
          totalUpdated++;
          changed = true;
        }
      }
      if (changed) {
        localStorage.setItem('tool-references', JSON.stringify(references));
      }
    }
  }

  // 2. Item stubs.
  const itemsRaw = localStorage.getItem('savedItems');
  if (itemsRaw) {
    let items;
    try { items = JSON.parse(itemsRaw); } catch { items = null; }
    if (Array.isArray(items)) {
      let changed = false;
      for (const item of items) {
        if (!Array.isArray(item?.related_npcs)) continue;
        for (const stub of item.related_npcs) {
          if (stub?.npc_id === npcId && stub.name !== newName) {
            stub.name = newName;
            totalUpdated++;
            changed = true;
          }
        }
      }
      if (changed) {
        localStorage.setItem('savedItems', JSON.stringify(items));
      }
    }
  }

  // 3. Setting NPC stubs.
  const settingsRaw = localStorage.getItem('gameSettings');
  if (settingsRaw) {
    let settings;
    try { settings = JSON.parse(settingsRaw); } catch { settings = null; }
    if (Array.isArray(settings)) {
      let changed = false;
      for (const setting of settings) {
        if (!Array.isArray(setting?.npcs)) continue;
        for (const stub of setting.npcs) {
          if (stub?.npc_id === npcId && stub.name !== newName) {
            stub.name = newName;
            totalUpdated++;
            changed = true;
          }
        }
      }
      if (changed) {
        localStorage.setItem('gameSettings', JSON.stringify(settings));
      }
    }
  }

  // 4. Dungeon NPC stubs.
  const dungeonsRaw = localStorage.getItem('dungeons');
  if (dungeonsRaw) {
    let dungeons;
    try { dungeons = JSON.parse(dungeonsRaw); } catch { dungeons = null; }
    if (Array.isArray(dungeons)) {
      let changed = false;
      for (const dungeon of dungeons) {
        if (!Array.isArray(dungeon?.npcs)) continue;
        for (const stub of dungeon.npcs) {
          if (stub?.npc_id === npcId && stub.name !== newName) {
            stub.name = newName;
            totalUpdated++;
            changed = true;
          }
        }
      }
      if (changed) {
        localStorage.setItem('dungeons', JSON.stringify(dungeons));
      }
    }
  }

  // Notify same-tab listeners (Statblock Generator's "linked NPCs" panel,
  // setting/dungeon NPC tabs, etc.) so caches that depend on the NPC's
  // display name re-evaluate without waiting for a page reload. Cross-tab
  // listeners are already covered by the native `storage` event each
  // localStorage write fires.
  if (totalUpdated > 0 && typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('npc-storage-updated', {
      detail: { npcId, action: 'rename', newName }
    }));
  }

  return { totalUpdated };
}
