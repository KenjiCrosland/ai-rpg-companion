<template>
  <div>
    <h2>Notable NPCs</h2>
    <p>The default NPC list below is extracted from the main setting overview and the faction descriptions.
      However, you are free to add an NPC of your own with a short description.</p>
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
        v-for="(npc, index) in setting.npcs"
        level="2"
        :id="'npc-' + index"
        :key="'npc-' + index"
        :opened="npc.open"
        @accordion-toggle="npc.open = !npc.open"
      >
        <template #label>
          {{ npc.name }}
        </template>

        <div v-if="loadingNPCIndex !== index">
          <cdr-tooltip id="tooltip-npc-delete" position="left" class="delete-button">
            <template #trigger>
              <cdr-button size="small" :icon-only="true" :with-background="true" @click.stop="deleteNPC(index)">
                <template #icon>
                  <icon-x-sm />
                </template>
              </cdr-button>
            </template>
            <div>Delete NPC</div>
          </cdr-tooltip>

          <!-- View Mode - No Detailed Description -->
          <div v-if="!npc.read_aloud_description && editingNPCIndex !== index">
            <h2>{{ npc.name }}</h2>
            <p>{{ npc.description }}</p>
            <cdr-button @click="generateDetailedNPCDescription(index)">Generate Detailed Description</cdr-button>
          </div>

          <!-- View Mode - Has Detailed Description -->
          <div v-else-if="npc.read_aloud_description && editingNPCIndex !== index">
            <h2>{{ npc.name }}</h2>
            <div class="focus-text">{{ npc.read_aloud_description }}</div>

            <div v-if="npc.combined_details" style="margin-top: 1.5rem;">
              <p v-for="(paragraph, pIndex) in npc.combined_details.split('\n\n')" :key="pIndex">
                {{ paragraph }}
              </p>
            </div>
            <div v-else style="margin-top: 1.5rem;">
              <p>{{ npc.description_of_position }}</p>
              <p>{{ npc.current_location }}</p>
              <p>{{ npc.distinctive_features_or_mannerisms }}</p>
              <p>{{ npc.character_secret }}</p>
              <p>{{ npc.roleplaying_tips }}</p>
            </div>

            <hr style="margin: 2rem 0;">

            <h3>Relationships</h3>
            <div v-if="npc.relationships && Object.keys(npc.relationships).length > 0">
              <div
                v-for="(relationship, npcName) in npc.relationships"
                :key="npcName"
                style="margin-bottom: 1rem; padding: 1rem; background: #f4f2ed; border-radius: 4px;"
              >
                <p style="margin: 0;">
                  <strong>Name:</strong> {{ npcName }}<br>
                  <strong>Relationship:</strong> {{ relationship }}
                </p>
              </div>
            </div>
            <div v-else-if="!loadingNewRelationship">
              <p style="font-style: italic; color: #666;">No relationships yet. Generate one below!</p>
            </div>

            <div v-if="loadingNewRelationship"
              style="margin-bottom: 1rem; padding: 1rem; background: #f4f2ed; border-radius: 4px;">
              <CdrSkeleton>
                <cdr-skeleton-bone type="line" style="margin-bottom: 0.5rem;" />
                <cdr-skeleton-bone type="line" />
                <cdr-skeleton-bone type="line" style="width: 80%;" />
              </CdrSkeleton>
            </div>

            <div class="button-group" style="margin-top: 2rem;">
              <cdr-button @click="startEditingNPC(index)" modifier="secondary">Edit NPC</cdr-button>
            </div>

            <h4 style="margin-top: 2rem;">Generate New Relationship</h4>
            <cdr-input v-model="newRelationship.name" label="Name" background="secondary"
              style="margin-bottom: 1rem;">
              <template #helper-text-bottom>
                The name of the related NPC
              </template>
            </cdr-input>
            <cdr-input v-model="newRelationship.description" label="Short Description" background="secondary"
              :rows="2" tag="textarea" style="margin-bottom: 1rem;">
              <template #helper-text-bottom>
                Brief description of their relationship (e.g., "the wizard's familiar", "his estranged sister")
              </template>
            </cdr-input>
            <cdr-button @click="generateNewRelationship(index)" :full-width="true">Generate Relationship</cdr-button>
          </div>

          <!-- Edit Mode -->
          <div v-else class="edit-form">
            <h2>Edit NPC</h2>

            <cdr-input v-model="npcEditForm.name" label="NPC Name" background="secondary" class="edit-field" />

            <cdr-input v-model="npcEditForm.read_aloud_description" label="Read-Aloud Description"
              background="secondary" :rows="4" tag="textarea" class="edit-field">
              <template #helper-text-bottom>
                The initial description when the NPC is first encountered
              </template>
            </cdr-input>

            <cdr-input v-model="npcEditForm.combined_details" label="NPC Details" background="secondary"
              :rows="10" tag="textarea" class="edit-field">
              <template #helper-text-bottom>
                Position, location, mannerisms, secrets, and roleplaying tips. Use double line breaks for paragraphs.
              </template>
            </cdr-input>

            <h3>Relationships</h3>
            <div v-if="npcEditForm.relationshipsArray.length > 0">
              <div
                v-for="(relationship, relIndex) in npcEditForm.relationshipsArray"
                :key="relIndex"
                style="margin-bottom: 1.5rem; padding: 1.5rem; background: #f4f2ed; border-radius: 4px;"
              >
                <cdr-input v-model="relationship.name" label="Name" background="secondary"
                  style="margin-bottom: 1rem;" />
                <cdr-input v-model="relationship.description" label="Short Description" background="secondary"
                  :rows="2" tag="textarea" style="margin-bottom: 1rem;" />
                <cdr-button size="small" @click="deleteRelationship(relIndex)">Remove Relationship</cdr-button>
              </div>
            </div>
            <div v-else>
              <p style="font-style: italic; color: #666; margin-bottom: 1rem;">No relationships to edit. Generate
                them in view mode first.</p>
            </div>

            <div class="button-group">
              <cdr-button @click="saveEditNPC">Save Changes</cdr-button>
              <cdr-button @click="cancelEditNPC" modifier="secondary">Cancel</cdr-button>
            </div>
          </div>
        </div>

        <div v-if="loadingNPCIndex === index">
          <NPCSkeleton />
        </div>
      </cdr-accordion>
    </cdr-accordion-group>
  </div>
</template>

<script setup>
import { ref, reactive, watch, nextTick } from 'vue';
import {
  CdrButton,
  CdrInput,
  CdrAccordionGroup,
  CdrAccordion,
  CdrTooltip,
  CdrSkeleton,
  CdrSkeletonBone,
  IconXSm,
} from '@rei/cedar';
import NPCSkeleton from '../skeletons/NPCSkeleton.vue';
import { generateGptResponse } from '../../util/open-ai.mjs';
import {
  createNPCPrompt,
  createRelationshipAndTipsPrompt,
  generateSingleRelationshipPrompt,
} from '../../util/kingdom-prompts.mjs';

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

// -------------------------
// Local state
// -------------------------
const npcShortDescription = ref('');
const editingNPCIndex = ref(null);
const npcEditForm = ref({
  name: '',
  read_aloud_description: '',
  combined_details: '',
  relationshipsArray: [],
});
const newRelationship = reactive({
  name: '',
  description: '',
});
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
  return Object.entries(overviewObject).map(([, value]) => {
    if (Array.isArray(value)) return '';
    return `${value}`;
  }).join('\n');
}

function getFullNPCDescription(npc) {
  const isFullyGenerated = !!npc.read_aloud_description;
  if (!isFullyGenerated) {
    return `${npc.name}: ${npc.description || 'A character in the setting'}`;
  }
  let description = `${npc.read_aloud_description || ''} ${npc.description_of_position || ''} ${npc.current_location || ''} ${npc.distinctive_features_or_mannerisms || ''} ${npc.character_secret || ''}`.trim();
  if (npc.relationships && Object.keys(npc.relationships).length > 0) {
    const relationshipText = Object.entries(npc.relationships)
      .map(([name, desc]) => `${name}: ${desc}`)
      .join(' ');
    description += `\n  Relationships:\n ${relationshipText}`;
  }
  return description;
}

const combineNPCDetails = (npc) => {
  if (!npc) return '';
  const parts = [];
  if (npc.description_of_position) parts.push(npc.description_of_position);
  if (npc.current_location) parts.push(npc.current_location);
  if (npc.distinctive_features_or_mannerisms) parts.push(npc.distinctive_features_or_mannerisms);
  if (npc.character_secret) parts.push(npc.character_secret);
  if (npc.roleplaying_tips) parts.push(npc.roleplaying_tips);
  return parts.filter(Boolean).join('\n\n');
};

// -------------------------
// Edit NPC
// -------------------------
const startEditingNPC = (index) => {
  const npc = props.setting.npcs[index];
  const relationshipsArray = npc.relationships
    ? Object.entries(npc.relationships).map(([name, description]) => ({ name, description }))
    : [];
  npcEditForm.value = {
    name: npc.name || '',
    read_aloud_description: npc.read_aloud_description || '',
    combined_details: npc.combined_details || combineNPCDetails(npc),
    relationshipsArray,
  };
  editingNPCIndex.value = index;
};

const cancelEditNPC = () => {
  editingNPCIndex.value = null;
};

const saveEditNPC = () => {
  if (editingNPCIndex.value === null) return;

  const relationshipsObject = {};
  npcEditForm.value.relationshipsArray.forEach(rel => {
    if (rel.name && rel.description) {
      relationshipsObject[rel.name] = rel.description;
    }
  });

  const updatedNPCs = props.setting.npcs.map((npc, i) => {
    if (i !== editingNPCIndex.value) return npc;
    return {
      ...npc,
      name: npcEditForm.value.name,
      read_aloud_description: npcEditForm.value.read_aloud_description,
      combined_details: npcEditForm.value.combined_details,
      relationships: relationshipsObject,
    };
  });

  emit('updated-setting', { ...props.setting, npcs: updatedNPCs });
  editingNPCIndex.value = null;
};

// -------------------------
// Delete
// -------------------------
const deleteNPC = (index) => {
  const updatedNPCs = props.setting.npcs.filter((_, i) => i !== index);
  emit('updated-setting', { ...props.setting, npcs: updatedNPCs });
};

const deleteRelationship = (relIndex) => {
  npcEditForm.value.relationshipsArray.splice(relIndex, 1);
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
    workingNPCs.push({ name: npcShortDescription.value || 'New NPC', description: npcShortDescription.value });
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
    workingNPCs[npcIndex].combined_details = combineNPCDetails(workingNPCs[npcIndex]);

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
const generateNewRelationship = async (npcIndex) => {
  if (!newRelationship.name || !newRelationship.description) {
    alert('Please provide both a name and short description for the relationship');
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
      newRelationship.name,
      newRelationship.description,
    );
    const response = await generateGptResponse(prompt, singleRelationshipValidation);
    const relationshipData = JSON.parse(response);

    const updatedNPCs = props.setting.npcs.map((n, i) => {
      if (i !== npcIndex) return n;
      return {
        ...n,
        relationships: {
          ...(n.relationships || {}),
          [relationshipData.name]: relationshipData.relationship,
        },
      };
    });

    newRelationship.name = '';
    newRelationship.description = '';
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
    }
  },
);
</script>

<style scoped>
.delete-button {
  position: absolute;
  top: 65px;
  right: 15px;
  z-index: 1;
}

.focus-text {
  background-color: #f4f2ed;
  color: #423b2f;
  padding: 1rem 2rem;
  font-style: italic;
}

.edit-form .edit-field {
  margin-bottom: 1.5rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .button-group {
    flex-direction: column;
  }

  .button-group button {
    width: 100%;
  }
}
</style>
