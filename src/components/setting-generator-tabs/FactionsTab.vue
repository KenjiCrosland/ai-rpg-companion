<template>
  <div>
    <h2>Factions</h2>

    <div v-if="setting.factions && setting.factions.length > 0">
      <cdr-accordion-group class="factions-accordion">
        <cdr-accordion
          v-for="(faction, index) in setting.factions"
          :key="faction.name"
          level="2"
          :id="'faction-' + index"
          :opened="faction.open"
          @accordion-toggle="faction.open = !faction.open"
        >
          <template #label>{{ faction.name }}</template>

          <cdr-tooltip id="tooltip-faction-delete" position="left" class="delete-button">
            <template #trigger>
              <cdr-button size="small" :icon-only="true" :with-background="true"
                @click.stop="deleteFaction(index)">
                <template #icon><icon-x-sm /></template>
              </cdr-button>
            </template>
            <div>Delete Faction</div>
          </cdr-tooltip>

          <!-- View Mode -->
          <div v-if="editingFactionIndex !== index">
            <h3 class="faction-header">{{ faction.name }}</h3>

            <div class="influence-level">
              <strong>Influence Level:</strong> {{ factionPowerLevels[faction.influence_level - 1] }}
              <cdr-popover id="popover-faction" position="right">
                <template #trigger>
                  <cdr-button :icon-only="true" :with-background="true">
                    <template #icon><icon-information-stroke /></template>
                  </cdr-button>
                </template>
                <div>{{ factionPowerDescriptions[faction.influence_level - 1] }}</div>
              </cdr-popover>
            </div>

            <div class="focus-text">
              <p><strong>Faction Leader, {{ faction.faction_leader }}:</strong> {{ faction.faction_leader_description }}</p>
              <p><strong>Key Strengths: </strong> {{ faction.key_resources_and_assets }}</p>
              <p><strong>Motto: </strong>"{{ faction.motto }}"</p>
            </div>

            <div style="margin-top: 2rem" v-if="loadingFactionIndex === index">
              <CdrSkeleton><OverviewSkeleton /></CdrSkeleton>
            </div>

            <div class="faction-description" v-if="faction.combined_content || faction.history">
              <div v-if="faction.combined_content">
                <p v-for="(paragraph, pIndex) in faction.combined_content.split('\n\n')" :key="pIndex">
                  {{ paragraph }}
                </p>
              </div>
              <div v-else>
                <p>{{ faction.history }}</p>
                <p>{{ faction.recent_event }} {{ faction.current_situation }}</p>
                <p>{{ faction.rites_and_ceremonies }} {{ faction.recent_ceremony }}</p>
                <p>{{ faction.challenge_to_power }} {{ faction.challenge_event }}</p>
              </div>
            </div>

            <div class="button-group">
              <cdr-button @click="startEditingFaction(index)" modifier="secondary">Edit Faction</cdr-button>
              <cdr-button
                v-if="!faction.history && !faction.combined_content"
                @click="generateDetailedFaction(index)"
              >
                Generate Full Description
              </cdr-button>
            </div>
          </div>

          <!-- Edit Mode -->
          <div v-else class="edit-form">
            <h2>Edit Faction</h2>

            <cdr-input v-model="factionEditForm.name" label="Faction Name" background="secondary" class="edit-field" />

            <cdr-select v-model.number="factionEditForm.influence_level" label="Influence Level"
              :options="influenceLevelOptions" class="edit-field">
              <template #helper-text-bottom>
                {{ factionPowerLevels[factionEditForm.influence_level - 1] }}: {{ factionPowerDescriptions[factionEditForm.influence_level - 1] }}
              </template>
            </cdr-select>

            <cdr-input v-model="factionEditForm.faction_leader" label="Faction Leader" background="secondary" class="edit-field" />

            <cdr-input v-model="factionEditForm.faction_leader_description" label="Faction Leader Description"
              background="secondary" :rows="3" tag="textarea" class="edit-field" />

            <cdr-input v-model="factionEditForm.key_resources_and_assets" label="Key Strengths/Resources"
              background="secondary" :rows="3" tag="textarea" class="edit-field" />

            <cdr-input v-model="factionEditForm.motto" label="Faction Motto" background="secondary" class="edit-field" />

            <cdr-input v-model="factionEditForm.detailed_content" label="Detailed Description"
              background="secondary" :rows="12" tag="textarea" class="edit-field">
              <template #helper-text-bottom>
                The full history and details of the faction. Use double line breaks for paragraphs.
              </template>
            </cdr-input>

            <div class="button-group">
              <cdr-button @click="saveEditFaction">Save Changes</cdr-button>
              <cdr-button @click="cancelEditFaction" modifier="secondary">Cancel</cdr-button>
            </div>
          </div>
        </cdr-accordion>

        <!-- Loading skeleton for new faction being added -->
        <cdr-accordion v-if="loadingNewFaction" :level="2" id="new-faction-accordion" :opened="true">
          <template #label>{{ newFactionName }}</template>
          <CdrSkeleton><FactionSkeleton /></CdrSkeleton>
        </cdr-accordion>

        <div style="padding: 2rem">
          <h3>Create New Faction</h3>
          <cdr-input id="faction-name" v-model="newFactionName" label="Faction Name" />
          <cdr-input :rows="4" id="faction-description" v-model="newFactionDescription" label="Faction Description" />
          <cdr-button style="margin-top: 2rem;" @click="addNewFaction" modifier="secondary">Add Faction</cdr-button>
        </div>
        <hr style="margin-top: 2rem">
      </cdr-accordion-group>
    </div>

    <div v-if="!(setting.factions.length > 0) && !loadingFactions">
      <p>Factions are any group of people gathered together to pursue a certain goal or to maintain or increase
        their power. They can range in influence from the dominant power in the setting (like a royal family) to a
        group of downtrodden commoners who have informally banded together to voice their grievances. They can also
        be smaller entities like merchant guilds, religious cults, or criminal organizations.
      </p>
    </div>

    <cdr-button
      v-if="setting.factions.length <= 0 && !loadingFactions"
      @click="generateFactions"
      modifier="dark"
    >
      Generate Factions for {{ setting.place_name }}
    </cdr-button>

    <cdr-button
      style="margin-top: 2rem"
      v-if="setting.factions.length > 0 && !loadingFactions"
      @click="generateFactions"
      modifier="dark"
    >
      Re-Generate Factions for {{ setting.place_name }}
    </cdr-button>

    <div v-if="loadingFactions">
      <BlockSkeleton />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive } from 'vue';
import {
  CdrButton,
  CdrInput,
  CdrSelect,
  CdrAccordionGroup,
  CdrAccordion,
  CdrTooltip,
  CdrPopover,
  CdrSkeleton,
  IconXSm,
  IconInformationStroke,
} from '@rei/cedar';
import FactionSkeleton from '../skeletons/FactionSkeleton.vue';
import OverviewSkeleton from '../skeletons/OverviewSkeleton.vue';
import BlockSkeleton from '../skeletons/BlockSkeleton.vue';
import { generateGptResponse } from '../../util/open-ai.mjs';
import {
  factionListPrompt,
  detailedFactionPrompt,
  singleFactionPrompt,
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
// Constants
// -------------------------
const factionPowerLevels = [
  'Nonexistent', 'Marginal', 'Emerging', 'Moderate', 'Noteworthy', 'Influential',
  'Powerful', 'Dominant', 'Controlling', 'Totalitarian',
];

const factionPowerDescriptions = [
  'No influence or recognition in any sphere. Entirely disregarded in political, social, and economic contexts.',
  'Very limited influence, struggling for recognition. Minor local impact but largely ineffective on a broader scale.',
  'Beginning to make their presence felt with minimal overall influence. Early stages of establishing a base.',
  'Noticeable but limited regional influence. May sway local policies but lack broader power.',
  'Recognized within a larger context, starting to effect significant change. Gaining momentum.',
  'Significant sway in local politics and society. Can influence major decisions and hold considerable clout.',
  'Strong influence and considerable resources. Shapes outcomes in multiple spheres and key player in environments.',
  'Strong influence in one branch of government or aspect of governance. Major player but power is not absolute.',
  'High level of power, controls multiple branches or has significant sway across governance. Broad control over policies.',
  'Absolute control over society, without opposition. Marked by unilateral decision-making and lack of democratic processes.',
];

// -------------------------
// Local state
// -------------------------
const loadingFactions = ref(false);
const loadingNewFaction = ref(false);
const loadingFactionIndex = ref(null);

const editingFactionIndex = ref(null);
const factionEditForm = ref({
  name: '',
  influence_level: 1,
  faction_leader: '',
  faction_leader_description: '',
  key_resources_and_assets: '',
  motto: '',
  detailed_content: '',
});

const newFactionName = ref('');
const newFactionDescription = ref('');

// -------------------------
// Computed
// -------------------------
const influenceLevelOptions = computed(() => {
  return factionPowerLevels.map((level, index) => ({
    text: `${index + 1} - ${level}`,
    value: index + 1,
  }));
});

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

function getFactionText(factionsArray) {
  return factionsArray.map(faction =>
    `Faction Name: ${faction.name} \n Influence Level: ${faction.influence_level} \n Faction Leader: ${faction.faction_leader} ${faction.faction_leader_description} \n Faction Assets: ${faction.key_resources_and_assets} \n Faction Motto: \n ${faction.motto}`
  ).join('\n---\n\n');
}

function combineFactionDetails(faction) {
  if (!faction) return '';
  const parts = [];
  if (faction.history) parts.push(faction.history);
  if (faction.recent_event || faction.current_situation) {
    parts.push([faction.recent_event, faction.current_situation].filter(Boolean).join(' '));
  }
  if (faction.rites_and_ceremonies || faction.recent_ceremony) {
    parts.push([faction.rites_and_ceremonies, faction.recent_ceremony].filter(Boolean).join(' '));
  }
  if (faction.challenge_to_power || faction.challenge_event) {
    parts.push([faction.challenge_to_power, faction.challenge_event].filter(Boolean).join(' '));
  }
  return parts.filter(Boolean).join('\n\n');
}

// -------------------------
// Validation
// -------------------------
function factionListValidation(jsonString) {
  try {
    const jsonObj = JSON.parse(jsonString);
    return jsonObj.every(faction =>
      ['name', 'influence_level', 'faction_leader', 'faction_leader_description', 'key_resources_and_assets', 'motto']
        .every(key => key in faction)
    );
  } catch { return false; }
}

function factionDetailValidation(jsonString) {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = ['history', 'recent_event', 'current_situation', 'rites_and_ceremonies', 'recent_ceremony', 'challenge_to_power', 'challenge_event'];
    return keys.every(key => key in jsonObj);
  } catch { return false; }
}

function singleFactionValidation(jsonString) {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = ['name', 'history', 'recent_event', 'current_situation', 'motto', 'influence_level',
      'faction_leader', 'faction_leader_description', 'key_resources_and_assets', 'rites_and_ceremonies',
      'recent_ceremony', 'challenge_to_power', 'challenge_event'];
    return keys.every(key => key in jsonObj);
  } catch { return false; }
}

// -------------------------
// Emit helper
// -------------------------
function emitUpdated(patch) {
  emit('updated-setting', { ...props.setting, ...patch });
}

// -------------------------
// Delete
// -------------------------
const deleteFaction = (index) => {
  const updatedFactions = [...props.setting.factions];
  updatedFactions.splice(index, 1);
  emitUpdated({ factions: updatedFactions });
};

// -------------------------
// Edit
// -------------------------
const startEditingFaction = (index) => {
  const faction = props.setting.factions[index];
  factionEditForm.value = {
    name: faction.name || '',
    influence_level: faction.influence_level || 1,
    faction_leader: faction.faction_leader || '',
    faction_leader_description: faction.faction_leader_description || '',
    key_resources_and_assets: faction.key_resources_and_assets || '',
    motto: faction.motto || '',
    detailed_content: faction.combined_content || combineFactionDetails(faction),
  };
  editingFactionIndex.value = index;
};

const cancelEditFaction = () => {
  editingFactionIndex.value = null;
};

const saveEditFaction = () => {
  if (editingFactionIndex.value === null) return;
  const updatedFactions = props.setting.factions.map((faction, i) => {
    if (i !== editingFactionIndex.value) return faction;
    return {
      ...faction,
      name: factionEditForm.value.name,
      influence_level: factionEditForm.value.influence_level,
      faction_leader: factionEditForm.value.faction_leader,
      faction_leader_description: factionEditForm.value.faction_leader_description,
      key_resources_and_assets: factionEditForm.value.key_resources_and_assets,
      motto: factionEditForm.value.motto,
      combined_content: factionEditForm.value.detailed_content,
    };
  });
  emitUpdated({ factions: updatedFactions });
  editingFactionIndex.value = null;
};

// -------------------------
// Generate bulk factions
// -------------------------
async function generateFactions() {
  let currentFactions = props.setting.factions;
  if (currentFactions.length > 0) {
    if (!confirm('Are you sure you want to regenerate factions? This will erase all existing factions and will remove all npcs associated with a faction.')) return;
    currentFactions = [];
  }

  const overviewText = getOverviewText(props.setting.setting_overview);
  const prompt = factionListPrompt(overviewText);

  try {
    loadingFactions.value = true;
    const response = await generateGptResponse(prompt, factionListValidation);
    const factions = JSON.parse(response);
    factions.sort((a, b) => a.influence_level - b.influence_level).reverse();

    // Add faction leaders as NPCs if not already present
    const existingNpcNames = props.setting.npcs.map(npc => npc.name);
    const newNpcs = [...props.setting.npcs.filter(npc => !npc.faction)];
    factions.forEach(faction => {
      if (!existingNpcNames.includes(faction.faction_leader)) {
        newNpcs.push({
          name: faction.faction_leader,
          description: faction.faction_leader_description,
          faction: faction.name,
        });
      }
    });

    emitUpdated({ factions, npcs: newNpcs });
  } catch (error) {
    console.error('Error generating factions:', error);
  } finally {
    loadingFactions.value = false;
  }
}

// -------------------------
// Generate detailed faction
// -------------------------
async function generateDetailedFaction(index) {
  const faction = props.setting.factions[index];
  const factionText = getFactionText(props.setting.factions);
  const settingOverviewText = getOverviewText(props.setting.setting_overview);
  const prompt = detailedFactionPrompt(faction.name, factionText, settingOverviewText);

  try {
    loadingFactionIndex.value = index;
    const response = await generateGptResponse(prompt, factionDetailValidation);
    const detailedData = JSON.parse(response);
    const updatedFactions = props.setting.factions.map((f, i) => {
      if (i !== index) return f;
      const merged = { ...f, ...detailedData };
      merged.combined_content = combineFactionDetails(merged);
      return merged;
    });
    emitUpdated({ factions: updatedFactions });
  } catch (error) {
    console.error('Error generating detailed faction:', error);
  } finally {
    loadingFactionIndex.value = null;
  }
}

// -------------------------
// Add new faction
// -------------------------
async function addNewFaction() {
  if (!newFactionName.value) return;

  const overviewText = getOverviewText(props.setting.setting_overview);
  const factionText = props.setting.factions.length > 0
    ? getFactionText(props.setting.factions)
    : null;
  const prompt = singleFactionPrompt(newFactionName.value, newFactionDescription.value, factionText, overviewText);

  try {
    loadingNewFaction.value = true;
    const response = await generateGptResponse(prompt, singleFactionValidation);
    const newGeneratedFaction = JSON.parse(response);
    newGeneratedFaction.combined_content = combineFactionDetails(newGeneratedFaction);
    newGeneratedFaction.open = true;

    const updatedFactions = [...props.setting.factions, newGeneratedFaction];

    // Add faction leader as NPC if not already present
    const updatedNpcs = [...props.setting.npcs];
    if (!updatedNpcs.map(npc => npc.name).includes(newGeneratedFaction.faction_leader)) {
      updatedNpcs.push({
        name: newGeneratedFaction.faction_leader,
        description: newGeneratedFaction.faction_leader_description,
        faction: newGeneratedFaction.name,
      });
    }

    emitUpdated({ factions: updatedFactions, npcs: updatedNpcs });
    newFactionName.value = '';
    newFactionDescription.value = '';
  } catch (error) {
    console.error('Error adding new faction:', error);
  } finally {
    loadingNewFaction.value = false;
  }
}

// Reset edit state when parent switches to a different setting
watch(
  () => props.setting,
  (newSetting, oldSetting) => {
    if (newSetting !== oldSetting) {
      editingFactionIndex.value = null;
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

.influence-level {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
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
