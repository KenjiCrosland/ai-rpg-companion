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
