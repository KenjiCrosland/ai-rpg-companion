<template>
  <div>
    <h2>Notable NPCs</h2>
    <p>The default NPC list below is extracted from the main setting overview and the faction descriptions.
      However, you are free to add an NPC of your own with a short description.</p>
    <p class="npc-tab-note">
      NPCs with full descriptions are automatically saved to your <strong>NPC Generator</strong>.
      Click "View in NPC Generator" at the bottom of any NPC card to see them there.
    </p>
    <cdr-input class="npc-input" id="npc-name" v-model="npcShortDescription" background="secondary"
      label="NPC Short Description">
      <template #helper-text-bottom>
        Examples: "A smuggler secretly working for the Queen", "The emperor's eccentric advisor", "The village drunk"
      </template>
    </cdr-input>
    <cdr-button @click="generateDetailedNPCDescription(null)" style="margin: 2rem 0;" modifier="dark"
      :full-width="true">Create NPC</cdr-button>

    <div v-if="loadingNewNPC">
      <NPCSkeleton />
    </div>

    <cdr-accordion-group>
      <cdr-accordion
        v-for="(npc, index) in enrichedNPCs"
        level="2"
        :id="'npc-' + index"
        :key="npc.npc_id || index"
        :opened="npc.open"
        @accordion-toggle="setting.npcs[index].open = !setting.npcs[index].open"
      >
        <template #label>
          {{ npc.name }}
        </template>

        <div v-if="loadingNPCIndex !== index">
          <!-- View Mode - No Detailed Description -->
          <div v-if="!npc.read_aloud_description && editingNPCIndex !== index">
            <h2>{{ npc.name }}</h2>
            <p>{{ npc.description }}</p>
            <div style="display: flex; gap: 0.5rem;">
              <cdr-button @click="generateDetailedNPCDescription(index)">Generate Detailed Description</cdr-button>
              <cdr-button @click="deleteNPC(index)" modifier="secondary" size="small">Delete</cdr-button>
            </div>
          </div>

          <!-- View/Edit Mode - Has Detailed Description -->
          <NPCCard
            v-else-if="npc.read_aloud_description"
            :npc="normalizeSettingNPC(npc)"
            :origin="setting.setting_overview?.name || setting.place_name"
            :source-type="'setting'"
            :display-type="'setting'"
            :is-editing="editingNPCIndex === index"
            :show-relationship-generator="true"
            :is-generating-relationship="loadingNewRelationship"
            :has-statblock="false"
            :editable="true"
            :show-delete="true"
            @start-edit="startEditingNPC(index)"
            @save-edit="handleSaveEdit(index, $event)"
            @cancel-edit="cancelEditNPC"
            @delete="deleteNPC(index)"
            @generate-relationship="handleGenerateRelationship(index, $event)"
          />
        </div>

        <div v-if="loadingNPCIndex === index">
          <NPCSkeleton />
        </div>
      </cdr-accordion>
    </cdr-accordion-group>
  </div>
</template>

<script setup>
import { ref, reactive, watch, nextTick, computed, onMounted, onUnmounted } from 'vue';
import {
  CdrButton,
  CdrInput,
  CdrAccordionGroup,
  CdrAccordion,
} from '@rei/cedar';
import NPCSkeleton from '@/components/skeletons/NPCSkeleton.vue';
import NPCCard from '@/components/NPCCard.vue';
import { generateGptResponse } from '@/util/open-ai.mjs';
import {
  createNPCPrompt,
  createRelationshipAndTipsPrompt,
  generateSingleRelationshipPrompt,
} from '../../prompts/index.mjs';
import { saveNPCToStorage, settingNPCToCanonical, normalizeSettingNPC } from '@/util/npc-storage.mjs';
import { useToast } from '@/composables/useToast.js';

const props = defineProps({
  setting: {
    type: Object,
    required: true,
  },
  premium: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['updated-setting']);

const toast = useToast();

// Reactive trigger for localStorage changes
const storageVersion = ref(0);

// -------------------------
// Computed: Enrich NPCs with data from shared storage (by ID reference)
// Falls back to nested data if not found in shared storage
// -------------------------
const enrichedNPCs = computed(() => {
  // Depend on storageVersion to re-run when localStorage changes
  storageVersion.value;

  if (!props.setting?.npcs) return [];

  const settingName = props.setting.setting_overview?.name
    || props.setting.place_name
    || 'Setting NPCs';
  const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs') || '{}');
  const sharedNPCs = stored[settingName] || [];

  return props.setting.npcs.map(settingNPC => {
    // If NPC has an ID, try to fetch from shared storage
    if (settingNPC.npc_id) {
      const sharedNPC = sharedNPCs.find(n =>
        (n.npc_id === settingNPC.npc_id || n.id === settingNPC.npc_id)
      );

      if (sharedNPC) {
        // Use shared storage data, but preserve setting-specific fields
        return {
          ...settingNPC, // Keep setting-specific data (open, faction, etc.)
          name: sharedNPC.npcDescriptionPart1?.character_name || settingNPC.name,
          description_of_position: sharedNPC.npcDescriptionPart1?.description_of_position,
          current_location: sharedNPC.npcDescriptionPart1?.reason_for_being_there,
          distinctive_features_or_mannerisms: sharedNPC.npcDescriptionPart1?.distinctive_feature_or_mannerism,
          character_secret: sharedNPC.npcDescriptionPart1?.character_secret,
          read_aloud_description: sharedNPC.npcDescriptionPart1?.read_aloud_description,
          roleplaying_tips: sharedNPC.npcDescriptionPart1?.roleplaying_tips,
          combined_details: sharedNPC.npcDescriptionPart1?.combined_details,
          relationships: sharedNPC.npcDescriptionPart2?.relationships || {},
          statblock_name: sharedNPC.statblock_name || settingNPC.statblock_name,
          statblock_folder: sharedNPC.statblock_folder || settingNPC.statblock_folder,
        };
      }
    }

    // Fallback to nested data if not found in shared storage or no ID
    return settingNPC;
  });
});

// -------------------------
// Local state
// -------------------------
const npcShortDescription = ref('');
const editingNPCIndex = ref(null);
const loadingNewRelationship = ref(false);
const loadingNPCIndex = ref(null);
const loadingNewNPC = ref(false);

// -------------------------
// Validation
// -------------------------
const npcValidationPart1 = (jsonString) => {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = ['description_of_position', 'current_location', 'distinctive_features_or_mannerisms',
      'character_secret', 'read_aloud_description'];
    return keys.every(key => key in jsonObj);
  } catch { return false; }
};

const npcValidationPart2 = (jsonString) => {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = ['relationships', 'roleplaying_tips'];
    return keys.every(key => key in jsonObj);
  } catch { return false; }
};

const singleRelationshipValidation = (jsonString) => {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = ['name', 'relationship'];
    return keys.every(key => key in jsonObj);
  } catch { return false; }
};

// -------------------------
// Helpers
// -------------------------
function getOverviewText(overviewObject) {
  if (!overviewObject) return '';

  // Build structured setting context with clear labels
  const parts = [];

  if (props.setting.place_name) {
    parts.push(`SETTING NAME: ${props.setting.place_name}`);
  }

  if (overviewObject.description) {
    parts.push(`\nDESCRIPTION: ${overviewObject.description}`);
  }

  if (overviewObject.history) {
    parts.push(`\nHISTORY: ${overviewObject.history}`);
  }

  if (overviewObject.current_events) {
    parts.push(`\nCURRENT EVENTS: ${overviewObject.current_events}`);
  }

  if (overviewObject.atmosphere) {
    parts.push(`\nATMOSPHERE: ${overviewObject.atmosphere}`);
  }

  if (props.setting.factions && props.setting.factions.length > 0) {
    const factionText = props.setting.factions
      .map(f => `  - ${f.name}: ${f.goals || f.description || 'Active in the setting'}`)
      .join('\n');
    parts.push(`\nFACTIONS:\n${factionText}`);
  }

  return parts.join('');
}

function getFullNPCDescription(npc) {
  const isFullyGenerated = !!npc.read_aloud_description;
  if (!isFullyGenerated) {
    return `${npc.name}: ${npc.description || 'A character in the setting'}`;
  }

  // Build structured description with clear labels
  const parts = [];
  parts.push(`NAME: ${npc.name || 'Unknown'}`);

  if (npc.read_aloud_description) {
    parts.push(`\nAPPEARANCE: ${npc.read_aloud_description}`);
  }

  if (npc.description_of_position) {
    parts.push(`\nROLE: ${npc.description_of_position}`);
  }

  if (npc.current_location) {
    parts.push(`\nCURRENT LOCATION: ${npc.current_location}`);
  }

  if (npc.distinctive_features_or_mannerisms) {
    parts.push(`\nDISTINCTIVE TRAITS: ${npc.distinctive_features_or_mannerisms}`);
  }

  if (npc.character_secret) {
    parts.push(`\nSECRET: ${npc.character_secret}`);
  }

  if (npc.roleplaying_tips) {
    parts.push(`\nROLEPLAYING TIPS: ${npc.roleplaying_tips}`);
  }

  if (npc.relationships && Object.keys(npc.relationships).length > 0) {
    const relationshipText = Object.entries(npc.relationships)
      .map(([name, desc]) => `  - ${name}: ${desc}`)
      .join('\n');
    parts.push(`\nEXISTING RELATIONSHIPS:\n${relationshipText}`);
  }

  return parts.join('');
}

// -------------------------
// Edit NPC
// -------------------------
const startEditingNPC = (index) => {
  editingNPCIndex.value = index;
};

const cancelEditNPC = () => {
  editingNPCIndex.value = null;
};

const handleSaveEdit = (index, editedData) => {
  const originalNPC = props.setting.npcs[index];
  const settingName = props.setting.setting_overview?.name
    || props.setting.place_name
    || 'Setting NPCs';

  // If renaming and no ID, look up existing NPC by original name to get its ID
  let existingId = originalNPC.npc_id;
  if (!existingId && originalNPC.name !== editedData.name && originalNPC.read_aloud_description) {
    const stored = JSON.parse(
      localStorage.getItem('npcGeneratorNPCs') || '{}'
    );
    if (stored[settingName]) {
      const existingNPC = stored[settingName].find(n =>
        n.npcDescriptionPart1?.character_name === originalNPC.name
      );
      if (existingNPC) {
        existingId = existingNPC.npc_id || existingNPC.id;
      }
    }
  }

  const updatedNPCs = props.setting.npcs.map((npc, i) => {
    if (i !== index) return npc;
    return {
      ...npc,
      npc_id: existingId || npc.npc_id,
      name: editedData.name,
      read_aloud_description: editedData.read_aloud_description,
      combined_details: editedData.combined_details,
      relationships: editedData.relationships,
    };
  });

  // Save to shared NPC storage first (this assigns/preserves ID)
  const updatedNPC = updatedNPCs[index];
  if (updatedNPC.read_aloud_description) {
    const canonicalNPC = settingNPCToCanonical(updatedNPC, settingName);
    saveNPCToStorage(canonicalNPC, settingName);

    // Save the ID back to the setting NPC
    if (canonicalNPC.npc_id && !updatedNPC.npc_id) {
      updatedNPC.npc_id = canonicalNPC.npc_id;
    }

    toast.success(`${updatedNPC.name} updated in your NPCs`);
  }

  // Emit updated setting with ID included
  emit('updated-setting', { ...props.setting, npcs: updatedNPCs });

  editingNPCIndex.value = null;
};

// -------------------------
// Delete
// -------------------------
const deleteNPC = async (index) => {
  const npc = props.setting.npcs[index];
  const npcId = npc?.npc_id || npc?.id;
  const npcName = npc?.name || 'this NPC';

  if (!npcId) {
    // Fallback for NPCs without IDs
    if (confirm(`Are you sure you want to delete ${npcName}?`)) {
      const updatedNPCs = props.setting.npcs.filter((_, i) => i !== index);
      emit('updated-setting', { ...props.setting, npcs: updatedNPCs });
    }
    return;
  }

  // Find all locations where this NPC exists
  const { findNPCLocations, deleteNPCFromAllLocations } = await import('@/util/npc-storage.mjs');
  const locations = findNPCLocations(npcId);

  // Build confirmation message
  let confirmMessage = `Are you sure you want to delete "${npcName}"?\n\n`;
  confirmMessage += 'This NPC will be deleted from:\n';

  const settingName = props.setting.setting_overview?.name || props.setting.place_name;

  // Check if in settings
  if (locations.npcGenerator.some(folder => folder === settingName)) {
    confirmMessage += `- Setting Generator (${settingName})\n`;
  }

  if (locations.npcGenerator.length > 0) {
    const otherFolders = locations.npcGenerator.filter(f => f !== settingName);
    if (otherFolders.length === 1) {
      confirmMessage += `- NPC Generator (${otherFolders[0]})\n`;
    } else if (otherFolders.length > 1) {
      confirmMessage += `- NPC Generator (${otherFolders.length} other folders)\n`;
    }
  }

  if (locations.dungeons.length > 0) {
    if (locations.dungeons.length === 1) {
      confirmMessage += `- Dungeon Generator (${locations.dungeons[0]})\n`;
    } else {
      confirmMessage += `- Dungeon Generator (${locations.dungeons.length} dungeons)\n`;
    }
  }

  if (confirm(confirmMessage)) {
    // Remove references for this NPC
    const { removeReferencesForEntity } = await import('@/util/reference-storage.mjs');
    removeReferencesForEntity('npc', npcId);

    // Delete from all locations
    deleteNPCFromAllLocations(npcId);

    // Update local state
    const updatedNPCs = props.setting.npcs.filter((_, i) => i !== index);
    emit('updated-setting', { ...props.setting, npcs: updatedNPCs });
  }
};

// -------------------------
// Generate detailed NPC description
// -------------------------
const generateDetailedNPCDescription = async (passedIndex) => {
  const settingOverviewText = getOverviewText(props.setting.setting_overview);
  const factions = props.setting.factions || [];

  let npcIndex = passedIndex;
  const workingNPCs = [...props.setting.npcs];

  if (npcIndex === null) {
    // Creating a new NPC
    const npcId = `npc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    workingNPCs.push({
      npc_id: npcId,
      name: npcShortDescription.value || 'New NPC',
      description: npcShortDescription.value
    });
    npcIndex = workingNPCs.length - 1;
    loadingNewNPC.value = true;
  } else {
    loadingNPCIndex.value = npcIndex;
  }

  const npc = workingNPCs[npcIndex];

  if (npc.detailedDescription) {
    loadingNPCIndex.value = null;
    loadingNewNPC.value = false;
    return;
  }

  const faction = factions.find(f => f.name === npc.faction);
  const factionOverviewText = getOverviewText(faction);

  try {
    const prompt = createNPCPrompt(npc.name, settingOverviewText, factionOverviewText, npcShortDescription.value);
    const npcPart1 = await generateGptResponse(prompt, npcValidationPart1);
    const part1Data = JSON.parse(npcPart1);

    const npcPart2 = await generateGptResponse(
      createRelationshipAndTipsPrompt(part1Data.name || npc.name, npcPart1),
      npcValidationPart2,
    );
    const part2Data = JSON.parse(npcPart2);

    workingNPCs[npcIndex] = {
      ...npc,
      ...part1Data,
      ...part2Data,
      open: true,
    };
    // Combine details from individual fields into combined_details
    const parts = [];
    if (part1Data.description_of_position) parts.push(part1Data.description_of_position);
    if (part1Data.current_location) parts.push(part1Data.current_location);
    if (part1Data.distinctive_features_or_mannerisms) parts.push(part1Data.distinctive_features_or_mannerisms);
    if (part1Data.character_secret) parts.push(part1Data.character_secret);
    if (part2Data.roleplaying_tips) parts.push(part2Data.roleplaying_tips);
    workingNPCs[npcIndex].combined_details = parts.filter(Boolean).join('\n\n');

    // Save NPC to shared storage first if it has read_aloud_description (full NPC, not stub)
    const updatedNPC = workingNPCs[npcIndex];
    if (updatedNPC.read_aloud_description) {
      const settingName = props.setting.setting_overview?.name
        || props.setting.place_name
        || 'Setting NPCs';
      const canonicalNPC = settingNPCToCanonical(updatedNPC, settingName);
      saveNPCToStorage(canonicalNPC, settingName);

      // Save the ID back to the working NPC
      if (canonicalNPC.npc_id && !updatedNPC.npc_id) {
        updatedNPC.npc_id = canonicalNPC.npc_id;
      }

      toast.success(`${updatedNPC.name} saved to your NPCs`);
    }

    npcShortDescription.value = '';
    emit('updated-setting', { ...props.setting, npcs: workingNPCs });

    // Scroll to the NPC after DOM updates
    const targetIndex = npcIndex;
    await nextTick();
    const accordion = document.getElementById(`npc-${targetIndex}`);
    if (accordion) {
      accordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } catch (error) {
    npcShortDescription.value = '';
    console.error('Error generating detailed NPC description:', error);
  } finally {
    loadingNPCIndex.value = null;
    loadingNewNPC.value = false;
  }
};

// -------------------------
// Generate new relationship
// -------------------------
const handleGenerateRelationship = async (npcIndex, relationshipData) => {
  if (!relationshipData.name || !relationshipData.description) {
    return;
  }

  const npc = props.setting.npcs[npcIndex];
  const npcDescription = getFullNPCDescription(npc);
  const settingOverviewText = getOverviewText(props.setting.setting_overview);

  try {
    loadingNewRelationship.value = true;
    const prompt = generateSingleRelationshipPrompt(
      npcDescription,
      settingOverviewText,
      relationshipData.name,
      relationshipData.description,
    );
    const response = await generateGptResponse(prompt, singleRelationshipValidation);
    const generatedRelationship = JSON.parse(response);

    const updatedNPCs = props.setting.npcs.map((n, i) => {
      if (i !== npcIndex) return n;
      return {
        ...n,
        relationships: {
          ...(n.relationships || {}),
          [generatedRelationship.name]: generatedRelationship.relationship,
        },
      };
    });

    // Save to shared NPC storage first (this assigns/preserves ID)
    const updatedNPC = updatedNPCs[npcIndex];
    if (updatedNPC.read_aloud_description) {
      const settingName = props.setting.setting_overview?.name
        || props.setting.place_name
        || 'Setting NPCs';
      const canonicalNPC = settingNPCToCanonical(updatedNPC, settingName);
      saveNPCToStorage(canonicalNPC, settingName);

      // Save the ID back to the setting NPC
      if (canonicalNPC.npc_id && !updatedNPC.npc_id) {
        updatedNPC.npc_id = canonicalNPC.npc_id;
      }

      toast.success(`${updatedNPC.name} updated in your NPCs`);
    }

    // Emit updated setting with ID included
    emit('updated-setting', { ...props.setting, npcs: updatedNPCs });
  } catch (error) {
    console.error('Error generating new relationship:', error);
  } finally {
    loadingNewRelationship.value = false;
  }
};

// Reset edit state when parent switches to a different setting
watch(
  () => props.setting,
  (newSetting, oldSetting) => {
    if (newSetting !== oldSetting) {
      editingNPCIndex.value = null;
      storageVersion.value++;
    }
  },
);

// Listen for localStorage changes (e.g., edits from NPC Generator in different tab)
const handleStorageChange = (event) => {
  if (event.key === 'npcGeneratorNPCs' || event.key === null) {
    storageVersion.value++;
  }
};

// Listen for same-tab NPC storage updates (custom event)
const handleNPCStorageUpdate = () => {
  storageVersion.value++;
};

onMounted(() => {
  // Refresh on mount
  storageVersion.value++;
  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('npc-storage-updated', handleNPCStorageUpdate);
});

onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange);
  window.removeEventListener('npc-storage-updated', handleNPCStorageUpdate);
});
</script>

<style scoped>
.npc-tab-note {
  font-size: 14px;
  color: #666;
  margin-bottom: 1.5rem;
  padding: 0.75rem 1rem;
  background: #f5f5f5;
  border-left: 3px solid #4a90e2;
  border-radius: 3px;
}
</style>
