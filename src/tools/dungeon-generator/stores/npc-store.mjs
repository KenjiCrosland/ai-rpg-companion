import {
  npcName,
  npcShortDescription,
  currentlyLoadingNPCs,
  currentDungeon,
} from './dungeon-state.mjs';
import { saveDungeons } from './dungeon-utils.mjs';
import {
  createDungeonNPCPrompt,
  createDungeonNPCRelationshipsPrompt,
  validateDungeonNPCResponse,
  validateDungeonNPCRelationshipsResponse,
} from '../prompts/dungeon-npcs.mjs';
import { canGenerateStatblock } from '@/util/can-generate-statblock.mjs';
import { generateGptResponse } from '@/util/open-ai.mjs';
import { createStatblockPrompts } from '../prompts/monster-prompts.mjs';
import { ref } from 'vue';
import { saveStatblockToStorage } from '@/util/statblock-storage.mjs';
import { saveNPCToStorage, dungeonNPCToCanonical } from '@/util/npc-storage.mjs';
import { useToast } from '@/composables/useToast.js';

const toast = useToast();

// We can store loading states for NPC statblock generation:
export const npcStatblockLoadingStates = ref({});

/**
 * Ensure NPC has a unique ID (handles old stubs created before ID system)
 */
function ensureNPCHasId(npc) {
  if (!npc.npc_id) {
    npc.npc_id = `npc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    // Don't save here - let caller save once at the end
  }
}

/**
 * Sync NPC ID back from canonical format (handles deduplication by name)
 */
function syncNPCIdFromCanonical(canonicalNPC, dungeonNPC, npcIndex) {
  if (canonicalNPC.npc_id && canonicalNPC.npc_id !== dungeonNPC.npc_id) {
    dungeonNPC.npc_id = canonicalNPC.npc_id;
    currentDungeon.value.npcs[npcIndex].npc_id = canonicalNPC.npc_id;
    // Don't save here - let caller save once at the end
  }
}

function sbValidationPart1(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    const keys = [
      'armor_class',
      'hit_points',
      'speed',
      'senses',
      'languages',
      'challenge_rating',
      'proficiency_bonus',
      'abilities',
    ];
    return keys.every((k) => k in data);
  } catch {
    return false;
  }
}

function sbValidationPart2(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    return 'actions' in data;
  } catch {
    return false;
  }
}

// Example function:
export async function generateNPCStatblock(
  index,
  { CR, monsterType, isSpellcaster, premium },
) {
  if (!currentDungeon.value) return;
  const npc = currentDungeon.value.npcs[index];
  if (!npc) {
    console.error('NPC not found at index', index);
    return;
  }

  ensureNPCHasId(npc);

  // Quick check for premium usage:
  const canGen = await canGenerateStatblock(premium);
  if (!canGen) {
    // Set flag to show limit message in UI
    npcStatblockLoadingStates.value[index] = {
      part1: false,
      part2: false,
      generating: false,
      limitReached: true,
    };
    return;
  }

  npcStatblockLoadingStates.value[index] = {
    part1: true,
    part2: true,
    generating: true,
    limitReached: false,
  };

  let part2Data = null;

  try {
    // Build up the "description" from the NPC data
    const npcBodyString = buildNPCString(npc); // Something like "This NPC named X is..."
    // Possibly also add the shortDescription or read_aloud_description if you want more detail

    const promptOptions = {
      monsterName: npc.name,
      challengeRating: CR || '1',
      monsterType: monsterType || 'Random',
      monsterDescription: npcBodyString || 'A mysterious being',
      caster: !!isSpellcaster,
    };

    const statblockPrompts = createStatblockPrompts(promptOptions);

    // PART 1
    const npcStatsPart1 = await generateGptResponse(
      statblockPrompts.part1,
      sbValidationPart1,
      3,
    );
    const part1Data = JSON.parse(npcStatsPart1);
    npc.statblock = { id: npc.name, ...part1Data }; // Just some ID, or use crypto.randomUUID()
    // Don't save yet - wait until generation is complete

    // PART 2
    // Provide GPT the context of part1
    const previousContext = [
      {
        role: 'user',
        content: 'Please give me the first part of the D&D statblock',
      },
      { role: 'system', content: npcStatsPart1 },
    ];

    const npcStatsPart2 = await generateGptResponse(
      statblockPrompts.part2,
      sbValidationPart2,
      3,
      previousContext,
    );
    part2Data = JSON.parse(npcStatsPart2);

    // Combine for final
    const finalStatblock = { ...npc.statblock, ...part2Data };
    npc.statblock = finalStatblock;

    // Auto-save to shared storage
    const folderName = currentDungeon.value?.dungeonOverview?.name || 'Dungeon NPCs';
    saveStatblockToStorage(finalStatblock, folderName);
    npc.statblock_name = finalStatblock.name;
    npc.statblock_folder = folderName;

    // Update shared NPC storage with statblock reference
    if (npc.read_aloud_description) {
      const canonicalNPC = dungeonNPCToCanonical(npc, folderName);
      saveNPCToStorage(canonicalNPC, folderName);
      syncNPCIdFromCanonical(canonicalNPC, npc, index);
      toast.success(`${npc.name} statblock saved to your NPCs`);

      // Create reference linking this NPC to the statblock
      if (npc.npc_id) {
        import('@/util/reference-storage.mjs').then(({ addReference }) => {
          addReference({
            source_type: 'npc',
            source_id: npc.npc_id,
            source_name: npc.name,
            target_type: 'statblock',
            target_id: `${finalStatblock.name}__${folderName}`,
            target_name: finalStatblock.name,
            relationship: 'has_statblock',
            context: ''
          });
        });
      }
    }

    // Success - save once at the end
    saveDungeons();
  } catch (error) {
    console.error('Error generating NPC statblock:', error);
  } finally {
    npcStatblockLoadingStates.value[index] = {
      part1: false,
      part2: false,
      generating: false,
      limitReached: false,
    };
    // Only save if we didn't already save in success path
    // (This handles error case where generation failed)
    if (!part2Data) {
      saveDungeons();
    }
  }
}

function getDungeonOverviewText(overviewObject) {
  if (!overviewObject) return '';
  return Object.values(overviewObject)
    .filter((v) => typeof v === 'string')
    .join('\n');
}

function buildNPCString(npc) {
  const parts = [];
  if (npc.name) parts.push(npc.name);
  if (npc.description_of_position) parts.push(npc.description_of_position);
  if (npc.current_location) parts.push(npc.current_location);
  if (npc.distinctive_features_or_mannerisms)
    parts.push(npc.distinctive_features_or_mannerisms);
  if (npc.character_secret) parts.push(npc.character_secret);
  return parts.join('\n');
}

export async function generateDungeonNPC(npcIndex) {
  if (!currentDungeon.value) {
    console.error('No dungeon selected');
    return;
  }

  try {
    currentlyLoadingNPCs.value[npcIndex] = true;
    const npc = currentDungeon.value.npcs[npcIndex];
    if (!npc) {
      console.error('NPC not found');
      currentlyLoadingNPCs.value[npcIndex] = false;
      return;
    }

    ensureNPCHasId(npc);

    const npcNameVal = npc.name;
    const npcShortDescriptionVal = npc.short_description;
    const dungeonOverviewText = getDungeonOverviewText(
      currentDungeon.value.dungeonOverview,
    );

    const prompt = createDungeonNPCPrompt(
      npcNameVal,
      dungeonOverviewText,
      npcShortDescriptionVal,
    );
    const npcResponse = await generateGptResponse(
      prompt,
      validateDungeonNPCResponse,
    );
    const npcData = JSON.parse(npcResponse);

    const relationshipsPrompt = createDungeonNPCRelationshipsPrompt(
      npcNameVal,
      npcResponse,
    );
    const relationshipsResponse = await generateGptResponse(
      relationshipsPrompt,
      validateDungeonNPCRelationshipsResponse,
    );
    const relationshipsData = JSON.parse(relationshipsResponse);

    const completeNPC = {
      ...npc,
      ...npcData,
      ...relationshipsData,
      opened: true,
      complete: true,
    };
    completeNPC.npc_string = buildNPCString(completeNPC);

    currentDungeon.value.npcs.splice(npcIndex, 1, completeNPC);
    currentlyLoadingNPCs.value[npcIndex] = false;

    // Save NPC to shared storage if it has read_aloud_description (full NPC, not stub)
    if (completeNPC.read_aloud_description) {
      const dungeonTitle = currentDungeon.value.dungeonOverview?.name || 'Dungeon NPCs';
      const canonicalNPC = dungeonNPCToCanonical(completeNPC, dungeonTitle);
      saveNPCToStorage(canonicalNPC, dungeonTitle);
      syncNPCIdFromCanonical(canonicalNPC, completeNPC, npcIndex);
      toast.success(`${completeNPC.name} saved to your NPCs`);
    }

    // Save once at the very end after all modifications complete
    saveDungeons();
  } catch (error) {
    console.error('Error generating dungeon NPC:', error);
    currentlyLoadingNPCs.value[npcIndex] = false;
  }
}

export function deleteNPC(npcIndex) {
  if (!currentDungeon.value) return;

  const npc = currentDungeon.value.npcs[npcIndex];
  const npcId = npc?.npc_id || npc?.id;
  const npcName = npc?.name || 'this NPC';

  if (!npcId) {
    // Fallback for NPCs without IDs
    if (confirm(`Are you sure you want to delete ${npcName}?`)) {
      currentDungeon.value.npcs.splice(npcIndex, 1);
      saveDungeons();
    }
    return;
  }

  // Find all locations where this NPC exists
  import('@/util/npc-storage.mjs').then(({ findNPCLocations, deleteNPCFromAllLocations }) => {
    const locations = findNPCLocations(npcId);

    // Build confirmation message
    let confirmMessage = `Are you sure you want to delete "${npcName}"?\n\n`;
    confirmMessage += 'This NPC will be deleted from:\n';

    if (locations.dungeons.length > 0) {
      if (locations.dungeons.length === 1) {
        confirmMessage += `- Dungeon Generator (${locations.dungeons[0]})\n`;
      } else {
        confirmMessage += `- Dungeon Generator (${locations.dungeons.length} dungeons)\n`;
      }
    }

    if (locations.npcGenerator.length > 0) {
      if (locations.npcGenerator.length === 1) {
        confirmMessage += `- NPC Generator (${locations.npcGenerator[0]})\n`;
      } else {
        confirmMessage += `- NPC Generator (${locations.npcGenerator.length} folders)\n`;
      }
    }

    if (confirm(confirmMessage)) {
      // Remove references for this NPC
      import('@/util/reference-storage.mjs').then(({ removeReferencesForEntity }) => {
        removeReferencesForEntity('npc', npcId);
      });

      // Delete from all locations (this handles localStorage for NPC Generator)
      deleteNPCFromAllLocations(npcId);

      // Update reactive state - remove from current dungeon's NPC array
      if (currentDungeon.value && currentDungeon.value.npcs) {
        const npcIndex = currentDungeon.value.npcs.findIndex(n =>
          (n.npc_id === npcId || n.id === npcId)
        );
        if (npcIndex !== -1) {
          currentDungeon.value.npcs.splice(npcIndex, 1);
          // Save dungeon state after removing NPC
          saveDungeons();

          // Show success toast
          toast.success(`${npcName} deleted from all locations`);
        }
      }
    }
  });
}

export function addNPC() {
  if (!currentDungeon.value) {
    console.error('No dungeon selected');
    return;
  }

  const nameVal = npcName.value || 'Unnamed NPC';
  const shortDesc = npcShortDescription.value;
  if (!shortDesc) {
    console.error('NPC short description is required');
    return;
  }

  // Generate unique ID for NPC
  const npcId = `npc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  currentDungeon.value.npcs.push({
    npc_id: npcId,
    name: nameVal,
    short_description: shortDesc,
    opened: false,
  });

  npcName.value = '';
  npcShortDescription.value = '';

  generateDungeonNPC(currentDungeon.value.npcs.length - 1);
  saveDungeons();
}

// Handle storage changes from other tabs to sync statblock generation limits
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    // When another tab changes the statblock counter, sync our NPC statblock loading states
    if (e.key === 'monsters') {
      try {
        const monsters = JSON.parse(e.newValue);
        const generationCount = parseInt(monsters?.generationCount) || 0;

        // If count was reset (less than 5), clear NPC statblock limit flags
        if (generationCount < 5) {
          Object.keys(npcStatblockLoadingStates.value).forEach(key => {
            if (npcStatblockLoadingStates.value[key]?.limitReached) {
              npcStatblockLoadingStates.value[key].limitReached = false;
            }
          });
        }
      } catch (err) {
        // Ignore parse errors
      }
    }
  });
}
