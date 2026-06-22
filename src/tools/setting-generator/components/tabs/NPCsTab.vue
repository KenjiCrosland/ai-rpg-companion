<template>
  <div class="npcs-tab parchment">
    <RelatedNPCsSection
      :setting="setting"
      :loading-new-npc="loadingNewNPC"
      :loading-npc-index="loadingNPCIndex"
      :loading-new-relationship="loadingNewRelationship"
      :editing-npc-index="editingNPCIndex"
      @add-and-generate="onAddAndGenerate"
      @generate-detailed-description="onGenerateDetailed"
      @start-edit="onStartEdit"
      @cancel-edit="onCancelEdit"
      @save-edit="onSaveEdit"
      @delete-npc="onDeleteNPC"
      @generate-relationship="onGenerateRelationship"
    />
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue';
import RelatedNPCsSection from '../RelatedNPCsSection.vue';
import { generateGptResponse } from '@/util/ai-client.mjs';
import {
  createNPCPrompt,
  createRelationshipAndTipsPrompt,
  generateSingleRelationshipPrompt,
} from '../../prompts/index.mjs';
import {
  saveNPCToStorage,
  settingNPCToCanonical,
} from '@/util/npc-storage.mjs';
import { useToast } from '@/composables/useToast.js';

const props = defineProps({
  setting: { type: Object, required: true },
  premium: { type: Boolean, default: false },
});

const emit = defineEmits(['updated-setting']);

const toast = useToast();
const storageVersion = ref(0);

// ---- loading + editing state ----
const loadingNewNPC = ref(false);
const loadingNPCIndex = ref(null);
const loadingNewRelationship = ref(false);
const editingNPCIndex = ref(null);

// ---- validators (carried from previous implementation) ----
const npcValidationPart1 = (jsonString) => {
  try {
    const obj = JSON.parse(jsonString);
    return ['description_of_position', 'current_location', 'distinctive_features_or_mannerisms',
      'character_secret', 'read_aloud_description'].every(k => k in obj);
  } catch { return false; }
};

const npcValidationPart2 = (jsonString) => {
  try {
    const obj = JSON.parse(jsonString);
    return ['relationships', 'roleplaying_tips'].every(k => k in obj);
  } catch { return false; }
};

const singleRelationshipValidation = (jsonString) => {
  try {
    const obj = JSON.parse(jsonString);
    return ['name', 'relationship'].every(k => k in obj);
  } catch { return false; }
};

// ---- prompt context builders ----
function getOverviewText(overviewObject) {
  if (!overviewObject) return '';
  const parts = [];
  if (props.setting.place_name) parts.push(`SETTING NAME: ${props.setting.place_name}`);
  if (overviewObject.description) parts.push(`\nDESCRIPTION: ${overviewObject.description}`);
  if (overviewObject.history) parts.push(`\nHISTORY: ${overviewObject.history}`);
  if (overviewObject.current_events) parts.push(`\nCURRENT EVENTS: ${overviewObject.current_events}`);
  if (overviewObject.atmosphere) parts.push(`\nATMOSPHERE: ${overviewObject.atmosphere}`);
  if (props.setting.factions?.length) {
    const factionText = props.setting.factions
      .map(f => `  - ${f.name}: ${f.goals || f.description || 'Active in the setting'}`)
      .join('\n');
    parts.push(`\nFACTIONS:\n${factionText}`);
  }
  return parts.join('');
}

function getFullNPCDescription(npc) {
  if (!npc.read_aloud_description) {
    return `${npc.name}: ${npc.description || 'A character in the setting'}`;
  }
  const parts = [`NAME: ${npc.name || 'Unknown'}`];
  if (npc.read_aloud_description) parts.push(`\nAPPEARANCE: ${npc.read_aloud_description}`);
  if (npc.description_of_position) parts.push(`\nROLE: ${npc.description_of_position}`);
  if (npc.current_location) parts.push(`\nCURRENT LOCATION: ${npc.current_location}`);
  if (npc.distinctive_features_or_mannerisms) parts.push(`\nDISTINCTIVE TRAITS: ${npc.distinctive_features_or_mannerisms}`);
  if (npc.character_secret) parts.push(`\nSECRET: ${npc.character_secret}`);
  if (npc.roleplaying_tips) parts.push(`\nROLEPLAYING TIPS: ${npc.roleplaying_tips}`);
  if (npc.relationships && Object.keys(npc.relationships).length > 0) {
    const rel = Object.entries(npc.relationships)
      .map(([name, desc]) => `  - ${name}: ${desc}`)
      .join('\n');
    parts.push(`\nEXISTING RELATIONSHIPS:\n${rel}`);
  }
  return parts.join('');
}

// ---- event handlers ----
async function onAddAndGenerate({ name, description, faction }) {
  // Synthesize a new stub, then run the same generate flow an existing
  // stub upgrade uses. Faction is captured up-front so the post-
  // generation NPC lands in the right group on first render.
  const npcId = `npc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const newNPC = {
    npc_id: npcId,
    name: name || 'New NPC',
    description: description || '',
    faction: faction || '',
  };
  const updatedNPCs = [...(props.setting.npcs || []), newNPC];
  emit('updated-setting', { ...props.setting, npcs: updatedNPCs });
  await nextTick();
  const newIndex = (props.setting.npcs || []).length - 1;
  loadingNewNPC.value = true;
  await runGeneration(newIndex, description);
  loadingNewNPC.value = false;
}

async function onGenerateDetailed({ npcIndex }) {
  loadingNPCIndex.value = npcIndex;
  const seed = props.setting.npcs?.[npcIndex]?.description || '';
  await runGeneration(npcIndex, seed);
  loadingNPCIndex.value = null;
}

async function runGeneration(npcIndex, shortDescriptionSeed) {
  const settingOverviewText = getOverviewText(props.setting.setting_overview);
  const npc = props.setting.npcs?.[npcIndex];
  if (!npc) return;
  const faction = (props.setting.factions || []).find(f => f.name === npc.faction);
  const factionOverviewText = getOverviewText(faction);

  try {
    const prompt = createNPCPrompt(npc.name, settingOverviewText, factionOverviewText, shortDescriptionSeed || '');
    const npcPart1 = await generateGptResponse(prompt, npcValidationPart1);
    const part1Data = JSON.parse(npcPart1);

    const npcPart2 = await generateGptResponse(
      createRelationshipAndTipsPrompt(part1Data.name || npc.name, npcPart1),
      npcValidationPart2,
    );
    const part2Data = JSON.parse(npcPart2);

    const merged = { ...npc, ...part1Data, ...part2Data };

    const parts = [];
    if (part1Data.description_of_position) parts.push(part1Data.description_of_position);
    if (part1Data.current_location) parts.push(part1Data.current_location);
    if (part1Data.distinctive_features_or_mannerisms) parts.push(part1Data.distinctive_features_or_mannerisms);
    if (part1Data.character_secret) parts.push(part1Data.character_secret);
    if (part2Data.roleplaying_tips) parts.push(part2Data.roleplaying_tips);
    merged.combined_details = parts.filter(Boolean).join('\n\n');

    if (merged.read_aloud_description) {
      const settingName = props.setting.setting_overview?.name
        || props.setting.place_name
        || 'Setting NPCs';
      const canonicalNPC = settingNPCToCanonical(merged, settingName);
      saveNPCToStorage(canonicalNPC, settingName);
      if (canonicalNPC.npc_id && !merged.npc_id) {
        merged.npc_id = canonicalNPC.npc_id;
      }
      toast.success(`${merged.name} saved to your NPCs`);
    }

    const updatedNPCs = (props.setting.npcs || []).map((n, i) => (i === npcIndex ? merged : n));
    emit('updated-setting', { ...props.setting, npcs: updatedNPCs });
  } catch (err) {
    console.error('Error generating detailed NPC description:', err);
  }
}

function onStartEdit({ npcIndex }) {
  editingNPCIndex.value = npcIndex;
}

function onCancelEdit() {
  editingNPCIndex.value = null;
}

function onSaveEdit({ npcIndex, edited }) {
  const originalNPC = props.setting.npcs?.[npcIndex];
  if (!originalNPC) {
    editingNPCIndex.value = null;
    return;
  }
  const settingName = props.setting.setting_overview?.name
    || props.setting.place_name
    || 'Setting NPCs';

  // Legacy id-recovery for renamed NPCs without a stable npc_id.
  let existingId = originalNPC.npc_id;
  if (!existingId && originalNPC.name !== edited.name && originalNPC.read_aloud_description) {
    const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs') || '{}');
    for (const folder of Object.values(stored)) {
      if (!Array.isArray(folder)) continue;
      const found = folder.find(n =>
        n.npcDescriptionPart1?.character_name === originalNPC.name
      );
      if (found) { existingId = found.npc_id; break; }
    }
  }

  const merged = {
    ...originalNPC,
    npc_id: existingId || originalNPC.npc_id,
    name: edited.name,
    read_aloud_description: edited.read_aloud_description,
    combined_details: edited.combined_details,
    relationships: edited.relationships,
  };

  if (merged.read_aloud_description) {
    const canonicalNPC = settingNPCToCanonical(merged, settingName);
    saveNPCToStorage(canonicalNPC, settingName);
    if (canonicalNPC.npc_id && !merged.npc_id) {
      merged.npc_id = canonicalNPC.npc_id;
    }
    toast.success(`${merged.name} updated in your NPCs`);
  }

  const updatedNPCs = (props.setting.npcs || []).map((n, i) => (i === npcIndex ? merged : n));
  emit('updated-setting', { ...props.setting, npcs: updatedNPCs });
  editingNPCIndex.value = null;
}

async function onDeleteNPC({ npcIndex }) {
  const npc = props.setting.npcs?.[npcIndex];
  const npcId = npc?.npc_id;
  const npcName = npc?.name || 'this NPC';

  if (!npcId) {
    if (confirm(`Are you sure you want to delete ${npcName}?`)) {
      const updatedNPCs = (props.setting.npcs || []).filter((_, i) => i !== npcIndex);
      emit('updated-setting', { ...props.setting, npcs: updatedNPCs });
    }
    return;
  }

  const { findNPCLocations, deleteNPCFromAllLocations } = await import('@/util/npc-storage.mjs');
  const locations = findNPCLocations(npcId);

  let confirmMessage = `Are you sure you want to delete "${npcName}"?\n\n`;
  confirmMessage += 'This NPC will be deleted from:\n';

  const settingName = props.setting.setting_overview?.name || props.setting.place_name;
  confirmMessage += `- Setting Generator (${settingName})\n`;
  const otherSettings = locations.settings.filter(s => s !== settingName);
  if (otherSettings.length > 0) {
    confirmMessage += otherSettings.length === 1
      ? `- Setting Generator (${otherSettings[0]})\n`
      : `- Setting Generator (${otherSettings.length} other settings)\n`;
  }
  if (locations.npcGenerator.length > 0) {
    confirmMessage += locations.npcGenerator.length === 1
      ? `- NPC Generator (${locations.npcGenerator[0]})\n`
      : `- NPC Generator (${locations.npcGenerator.length} folders)\n`;
  }
  if (locations.dungeons.length > 0) {
    confirmMessage += locations.dungeons.length === 1
      ? `- Dungeon Generator (${locations.dungeons[0]})\n`
      : `- Dungeon Generator (${locations.dungeons.length} dungeons)\n`;
  }

  if (confirm(confirmMessage)) {
    const { removeReferencesForEntity } = await import('@/util/reference-storage.mjs');
    removeReferencesForEntity('npc', npcId);
    const { resetStubsForDeletedNPC } = await import('@/util/seeded-input.mjs');
    resetStubsForDeletedNPC(npcId);
    deleteNPCFromAllLocations(npcId);

    const updatedNPCs = (props.setting.npcs || []).filter((_, i) => i !== npcIndex);
    emit('updated-setting', { ...props.setting, npcs: updatedNPCs });
    toast.success(`${npcName} deleted from all locations`);
  }
}

async function onGenerateRelationship({ npcIndex, payload }) {
  const npc = props.setting.npcs?.[npcIndex];
  if (!npc) return;
  const { name: relationshipName, description: relationshipDescription } = payload || {};
  if (!relationshipName || !relationshipDescription) return;
  loadingNewRelationship.value = true;
  try {
    const prompt = generateSingleRelationshipPrompt(
      getFullNPCDescription(npc),
      getOverviewText(props.setting.setting_overview),
      relationshipName,
      relationshipDescription,
    );
    const response = await generateGptResponse(prompt, singleRelationshipValidation);
    const generated = JSON.parse(response);

    const updatedNPCs = (props.setting.npcs || []).map((n, i) => {
      if (i !== npcIndex) return n;
      return {
        ...n,
        relationships: {
          ...(n.relationships || {}),
          [generated.name]: generated.relationship,
        },
      };
    });

    const updatedNPC = updatedNPCs[npcIndex];
    if (updatedNPC.read_aloud_description) {
      const settingName = props.setting.setting_overview?.name
        || props.setting.place_name
        || 'Setting NPCs';
      const canonicalNPC = settingNPCToCanonical(updatedNPC, settingName);
      saveNPCToStorage(canonicalNPC, settingName);
      if (canonicalNPC.npc_id && !updatedNPC.npc_id) {
        updatedNPC.npc_id = canonicalNPC.npc_id;
      }
      toast.success(`${updatedNPC.name} updated in your NPCs`);
    }
    emit('updated-setting', { ...props.setting, npcs: updatedNPCs });
  } catch (err) {
    console.error('Error generating new relationship:', err);
  } finally {
    loadingNewRelationship.value = false;
  }
}

// Reset edit state when the active setting changes.
watch(() => props.setting, () => {
  editingNPCIndex.value = null;
  storageVersion.value++;
});

const handleStorageChange = (event) => {
  if (event.key === 'npcGeneratorNPCs' || event.key === null) {
    storageVersion.value++;
  }
};
const handleNPCStorageUpdate = () => { storageVersion.value++; };

onMounted(() => {
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
/* Lighter/cooler cream surface panel (no border) — the quiet ground that
   warmer-toned stub cards lift off of (matches the Locations / Factions tabs). */
.npcs-tab {
  background: var(--par-color-surface-card, #FEFBF4);
  border-radius: var(--par-radius-lg, 12px);
  padding: 1.75rem 2rem;
}
</style>
