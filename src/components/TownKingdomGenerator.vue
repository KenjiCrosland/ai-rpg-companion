<template>
  <div class="app-container">
    <div class="sidebar">
      <ul class="settings-tabs">
        <!-- Flatten settings tree and display each with appropriate indentation -->
        <li v-for="setting in flattenSettings(settingsTree)" :key="setting.originalIndex"
          :class="{ active: currentSettingIndex === setting.originalIndex }"
          @click="selectSetting(setting.originalIndex)" :style="{ marginLeft: `${setting.depth * 20}px` }">
          {{ setting.place_name || 'Unnamed Setting' }}
        </li>
        <li v-if="!currentlyLoadingOverview && allSettingsHaveAnOverview" @click="createNewSetting">+ New Setting</li>
      </ul>

      <cdr-button @click="copySettingsAsPlainText">Copy As Plain Text</cdr-button>
    </div>
    <div class="main-content">
      <div class='generator-form' v-show="!settingOverviewExists && !currentSetting.loadingsettingOverview">
        <h1>Kenji's RPG Setting Generator: Build a Kingdom, Town, Empire, or Space Station!</h1>
        <form @submit.prevent="generateSetting">
          <div class="generator-fields">
            <cdr-input class="generator-field-input" id="adjective" v-model="currentSetting.adjective"
              background="secondary" label="Adjective">
              <template #helper-text-bottom>
                Examples: "Flourishing", "Decrepit", "Decadent"
              </template>
            </cdr-input>
            <cdr-input class="generator-field-input" id="setting_type" v-model="currentSetting.setting_type"
              background="secondary" label="Type of Place">
              <template #helper-text-bottom>
                Examples: "Kingdom", "Town", "City", "Republic"
              </template>
            </cdr-input>
            <p>Of</p>
            <cdr-input class="generator-field-input" id="place_name" v-model="currentSetting.place_name"
              background="secondary" label="Place name">
              <template #helper-text-bottom>
                Examples: "Kingdomaria", "Townland", "Citytopia", "Republic of the People"
              </template>
            </cdr-input>
          </div>
          <div class="lore-field-input">
            <cdr-input :rows="5" tag="textarea" v-model="currentSetting.place_lore" background="secondary"
              label="Setting Lore" placeholder="Enter any additional details about the setting"
              class="item-lore-details">
              <template #helper-text-bottom>
                Write any details about your setting that you want to include. Need help coming up with lore for your
                setting?
                Use the <cdr-link href="https://cros.land/ai-powered-lore-and-timeline-generator/">Lore
                  Generator</cdr-link>
                and paste in the generated summary!
              </template>
            </cdr-input>
          </div>

          <cdr-button @click="generateSetting" class='generate-button' :full-width="true"
            modifier="secondary">Generate</cdr-button>
        </form>
      </div>
      <cdr-tabs class="content-tabs" v-if="settingOverviewExists" height="auto" style="width: 100%">
        <cdr-tab-panel label="Overview" name="Overview">
          <h2>{{ formatTitle(currentSetting.adjective, currentSetting.setting_type, currentSetting.place_name,
            currentSetting.setting_overview.title) }}</h2>
          <p>{{ currentSetting.setting_overview.overview }} {{
            currentSetting.setting_overview.relation_to_larger_setting }}
          </p>
          <p>{{ currentSetting.setting_overview.history }}</p>
          <p>{{ currentSetting.setting_overview.current_ruler_sentence }} {{
            currentSetting.setting_overview.recent_event_current_ruler }} {{
              currentSetting.setting_overview.recent_event_consequences }}</p>
          <p>{{ currentSetting.setting_overview.social_history }} {{ currentSetting.setting_overview.recent_event_social
            }}
          </p>
          <p>{{ currentSetting.setting_overview.economic_history }} {{
            currentSetting.setting_overview.impactful_economic_event }}</p>
          <p>{{ currentSetting.setting_overview.military_history }} {{
            currentSetting.setting_overview.recent_event_military
            }}</p>
          <p>{{ currentSetting.setting_overview.main_problem }} {{ currentSetting.setting_overview.potential_solutions
            }}</p>
          <p>{{ currentSetting.setting_overview.conclusion }}</p>
        </cdr-tab-panel>
        <cdr-tab-panel label="Important Locations" name="Locations" @tab-change="generateSubLocations">
          <h2>Important Locations</h2>
          <cdr-accordion-group v-if="currentSetting.importantLocations && currentSetting.importantLocations.length > 0">
            <cdr-accordion v-for="(setting, index) in currentSetting.importantLocations" :key="setting.name"
              :id="setting.name" level="2" :opened="setting.open" @accordion-toggle="setting.open = !setting.open">
              <template #label>
                {{ setting.name }}
              </template>
              <div v-if="!setting.main_index && !setting.loading">
                <h2>{{ setting.name }}</h2>
                <p>{{ setting.description }}</p>
                <p>{{ setting.setting_scale }}</p>
                <cdr-button
                  @click="generateSetting({ sublocationIndex: index, subLocationName: setting.name, subLocationDescription: setting.description, adjective: setting.adjective, setting_type: setting.setting_type, title: setting.title })">
                  Generate Full Description
                </cdr-button>
              </div>
              <div v-if="setting.has_detailed_description && !setting.loading">
                <h2>{{ setting.name }}</h2>
                <p>{{ settings[setting.main_index].setting_overview.overview }} {{
                  settings[setting.main_index].setting_overview.relation_to_larger_setting }}</p>
                <p>{{ settings[setting.main_index].setting_overview.history }}</p>
                <p>{{ settings[setting.main_index].setting_overview.current_ruler_sentence }} {{
                  settings[setting.main_index].setting_overview.recent_event_current_ruler
                  }} {{ settings[setting.main_index].setting_overview.recent_event_consequences }}</p>
                <p>{{ settings[setting.main_index].setting_overview.social_history }} {{
                  settings[setting.main_index].setting_overview.recent_event_social }}</p>
                <p>{{ settings[setting.main_index].setting_overview.economic_history }} {{
                  settings[setting.main_index].setting_overview.impactful_economic_event
                  }}</p>
                <p>{{ settings[setting.main_index].setting_overview.military_history }} {{
                  settings[setting.main_index].setting_overview.recent_event_military }}
                </p>
                <p>{{ settings[setting.main_index].setting_overview.main_problem }} {{
                  settings[setting.main_index].setting_overview.potential_solutions }}</p>
                <p>
                  {{ settings[setting.main_index].setting_overview.conclusion }}
                </p>
              </div>
              <div v-if="!setting.has_detailed_description && setting.loading">
                <CdrSkeleton>
                  <OverviewSkeleton />
                </CdrSkeleton>
              </div>
            </cdr-accordion>
          </cdr-accordion-group>
          <div v-else>
            <LocationListSkeleton />
          </div>
        </cdr-tab-panel>

        <cdr-tab-panel label="Factions" name="Factions" @tab-change="generateFactions">
          <h2>Factions</h2>
          <div v-if="currentSetting.factions && currentSetting.factions.length > 0">
            <cdr-list>
              <li v-for="faction in currentSetting.factions" :key="faction.name">
                <h3>{{ faction.name }}</h3>
                <p><strong>Influence Level: </strong>{{ factionPowerLevels[faction.influence_level - 1] }}</p>
                <div class="focus-text">
                  <p><strong>Faction Leader, {{ faction.faction_leader }}:</strong> {{
                    faction.faction_leader_description
                    }}
                  </p>
                  <p><strong>Key Strengths: </strong> {{ faction.key_resources_and_assets }}</p>
                  <p><strong>Motto: </strong>"{{ faction.motto }}"</p>
                </div>
                <p>{{ faction.history }}</p>
                <p>{{ faction.recent_event }} {{ faction.current_situation }}</p>
                <p>{{ faction.rites_and_ceremonies }} {{ faction.recent_ceremony }}</p>
                <p>{{ faction.challenge_to_power }} {{ faction.challenge_event }}</p>
              </li>
            </cdr-list>
          </div>
          <div v-else>
            <CdrSkeleton>
              <cdr-list>
                <li>
                  <FactionSkeleton />
                </li>
                <li class="bone-list-item">
                  <FactionSkeleton />
                </li>
                <li class="bone-list-item">
                  <FactionSkeleton />
                </li>
              </cdr-list>
            </CdrSkeleton>
          </div>
        </cdr-tab-panel>
        <cdr-tab-panel label="Notable NPCs" name="NPCs">
          <h2>Notable NPCs</h2>
          <cdr-accordion-group>
            <cdr-accordion v-for="(npc, index) in currentSetting.npcs" level="2" :id="'npc-' + index"
              :key="'npc-' + index" :opened="npc.open" @accordion-toggle="npc.open = !npc.open">
              <template #label>
                {{ npc.name }}
              </template>
              <div v-if="!npc.loading">
                <h2>{{ npc.name }}</h2>
                <div v-if="!npc.read_aloud_description">
                  <p>{{ npc.description }}</p>
                  <cdr-button @click="generateDetailedNPCDescription(index)">Generate Detailed
                    Description</cdr-button>
                </div>
                <div v-else>
                  <div class="focus-text">{{ npc.read_aloud_description }}</div>
                  <p>{{ npc.description_of_position }}</p>
                  <p>{{ npc.current_location }}</p>
                  <p>{{ npc.distinctive_features_or_mannerisms }}</p>
                  <p>{{ npc.character_secret }}</p>
                  <h3>Relationships</h3>
                  <div v-for="(relationship, npcName) in npc.relationships" :key="npcName">
                    <p>
                      <strong>{{ npcName }}</strong>: {{ relationship }}
                    </p>
                  </div>
                  <h3>Roleplaying Tips</h3>
                  <p>{{ npc.roleplaying_tips }}</p>
                  <div class="relationship-buttons">
                    <h4>Generate a full description for:</h4>
                    <cdr-list modifier="inline" class="relationship-npc-buttons">
                      <li v-for="(relationshipDescription, relationshipName) in npc.relationships"
                        :key="relationshipName">
                        <cdr-button
                          @click="generateDetailedNPCDescription(index, { name: relationshipName, description: relationshipDescription })">{{
                            relationshipName }}</cdr-button>
                      </li>
                    </cdr-list>
                  </div>
                </div>
              </div>

              <div v-if="npc.loading">
                <NPCSkeleton />
              </div>
            </cdr-accordion>
          </cdr-accordion-group>
        </cdr-tab-panel>
        <cdr-tab-panel label="Empty" name="empty">
          <p>Empty tab</p>
        </cdr-tab-panel>
      </cdr-tabs>
      <cdr-button class="delete-button" v-if="settingOverviewExists && !currentlyLoading"
        @click="deleteSetting(currentSettingIndex)">Delete
        Setting</cdr-button>
      <div class="content-tabs" v-if="!settingOverviewExists && currentSetting.loadingsettingOverview">
        <CdrSkeleton>
          <ul class="skeleton-ul">
            <li class="skeleton-tab">
              Overview
            </li>
            <li class="skeleton-tab-inactive">
              Locations
            </li>
            <li class="skeleton-tab-inactive">
              Factions
            </li>
            <li class="skeleton-tab-inactive">
              NPCs
            </li>
          </ul>
          <hr class="skeleton-hr">
          <h2>{{ formatTitle(currentSetting.adjective, currentSetting.setting_type, currentSetting.place_name,
            currentSetting.setting_overview?.title) }}</h2>
          <OverviewSkeleton />
        </CdrSkeleton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick, onMounted } from 'vue'
import { CdrInput, CdrButton, CdrText, CdrSelect, CdrTabs, CdrTabPanel, CdrCheckbox, CdrLink, CdrList, CdrSkeleton, CdrSkeletonBone, IconXSm, CdrTooltip, CdrAccordionGroup, CdrAccordion } from "@rei/cedar";
import { settingOverviewPrompt, sublocationOverviewPrompt, subLocationsPrompt, factionsPrompt, createNPCPrompt, createRelationshipAndTipsPrompt, createNPCRelationshipPrompt } from "../util/kingdom-prompts.mjs";
import FactionSkeleton from "./skeletons/FactionSkeleton.vue";
import LocationListSkeleton from "./skeletons/LocationListSkeleton.vue";
import NPCSkeleton from "./skeletons/NPCSkeleton.vue";
import OverviewSkeleton from "./skeletons/OverviewSkeleton.vue";
import { formatSettingAsPlainText } from "../util/formatSettingAsPlainText.mjs";
import { generateGptResponse } from "../util/open-ai.mjs";
import placeAdjectives from '../data/place-adjectives.json';
import place_names from '../data/place-names.json';
import '@rei/cedar/dist/style/cdr-text.css';
import '@rei/cedar/dist/style/cdr-link.css';
import '@rei/cedar/dist/style/cdr-list.css';
import '@rei/cedar/dist/style/cdr-tabs.css';

function copySettingsAsPlainText() {
  const text = formatSettingAsPlainText(settingsTree.value);
  console.log(text);
  navigator.clipboard.writeText(text);
}

function isNumber(value) {
  return typeof value === 'number';
}
const currentlyLoading = ref(false);
const currentSettingIndex = ref(0);
const isNewSetting = ref(false);  // Flag to track if the current setting is new
const defaultSetting = reactive({
  adjective: '',
  setting_type: '',
  place_name: '',
  place_lore: '',
  setting_overview: null,
  factions: [],
  importantLocations: [],
  npcs: [],
  parentIndex: null,
});
const settings = ref([reactive({ ...defaultSetting })]);
const currentSetting = computed(() => settings.value[currentSettingIndex.value] || reactive({ ...defaultSetting }));
onMounted(loadSettingsFromLocalStorage);

const settingsTree = computed(() => {
  let tree = [];
  let settingsMap = new Map();

  // Initialize map entries for all settings with their indices as keys
  settings.value.forEach((setting, index) => {
    settingsMap.set(index, { ...setting, children: [], originalIndex: index });
  });

  // Populate children arrays based on the parentIndex
  settings.value.forEach((setting, index) => {
    if (typeof setting.parentIndex === 'number' && settingsMap.has(setting.parentIndex)) {
      settingsMap.get(setting.parentIndex).children.push(settingsMap.get(index));
    } else if (setting.parentIndex === null) {
      tree.push(settingsMap.get(index));
    }
  });

  console.log("Final TREE with Indices:", tree);
  return tree;
});

function flattenSettings(tree, depth = 0) {
  let flat = [];
  tree.forEach(setting => {
    flat.push({ ...setting, depth });
    if (setting.children.length) {
      flat = flat.concat(flattenSettings(setting.children, depth + 1));
    }
  });
  return flat;
}

const selectSetting = (index) => {
  currentSettingIndex.value = index;
  isNewSetting.value = false;  // Not new since it's selected from existing ones
};

const updateOriginalIndices = () => {
  settings.value.forEach((setting, index) => {
    setting.originalIndex = index;  // Update originalIndex to the new index
  });
};

const deleteSetting = (indexToDelete) => {
  if (indexToDelete < 0 || indexToDelete >= settings.value.length) return;  // Safety check

  // Capture the parentIndex of the setting to be deleted for reassigning children
  const parentOfDeleted = settings.value[indexToDelete].parentIndex;

  // Update children of the deleted setting to the parent of the deleted setting
  settings.value.forEach((setting, index) => {
    if (setting.parentIndex === indexToDelete) {
      setting.parentIndex = parentOfDeleted;
    }
    // Additionally check and update main_index in importantLocations if needed
    setting.importantLocations.forEach(location => {
      if (location.main_index === indexToDelete) {
        //location.main_index = parentOfDeleted !== null ? parentOfDeleted : null;  // Reassign or remove depending on parent availability
        location.main_index = null;  // Always remove main_index
        location.has_detailed_description = false;  // Reset detailed description flag
      } else if (location.main_index > indexToDelete) {
        location.main_index--;  // Adjust indices that are higher than the deleted index
      }
    });
  });

  // Remove the setting
  settings.value.splice(indexToDelete, 1);

  // Update parentIndex for all remaining settings
  settings.value.forEach(setting => {
    if (typeof setting.parentIndex === 'number' && setting.parentIndex > indexToDelete) {
      setting.parentIndex--;  // Adjust parentIndex down by one to account for the shift
    }
  });

  saveSettingsToLocalStorage();
  selectSetting(0);  // Select the first setting after deletion
};





const currentlyLoadingOverview = computed(() => {
  // Check if any setting has loadingsettingOverview set to true
  return settings.value.some(setting => setting.loadingsettingOverview);
});

//function similar to the above but returns false if there is no settingOverview for any setting
const allSettingsHaveAnOverview = computed(() => {
  return settings.value.every(setting => setting.setting_overview?.overview);
});

watch(currentSettingIndex, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    nextTick(() => {
      const tabs = document.querySelectorAll('[class^="cdr-tabs__header-item"]');
      if (tabs.length > 0 && tabs[0]) {
        tabs[0].click(); // Attempt to click the first tab
      }
    });
  }
});

const createNewSetting = (isSublocation, adjective = '', setting_type = '', place_name = '', title = '', parentIndex = null) => {
  const newSetting = reactive({
    adjective: adjective,
    setting_type: setting_type,
    place_name: place_name,
    title: title,
    place_lore: '',
    setting_overview: null,
    factions: [],
    importantLocations: [],
    npcs: [],
    parentIndex: isSublocation ? parentIndex : null
  });

  // Push the new setting to the settings array
  settings.value.push(newSetting);

  // Update currentSettingIndex to the index of the newly created setting
  currentSettingIndex.value = settings.value.length - 1;
  isNewSetting.value = true;  // Mark as new

  // Optionally save settings to local storage or another persistent state
  //saveSettingsToLocalStorage();
};



function saveSettingsToLocalStorage() {
  // Map over settings to adjust NPCs and remove non-serializable values
  const settingsToSave = settings.value.map(setting => ({
    ...setting,
    setting_overview: setting.setting_overview,
    factions: setting.factions,
    importantLocations: setting.importantLocations.map(location => ({
      ...location,
      open: false // Set all location.open properties to false before saving
    })),
    npcs: setting.npcs.map(npc => ({
      ...npc,
      open: false // Set all npc.open properties to false before saving
    }))
  }));

  // Serialize the modified settings to a JSON string
  const serializedSettings = JSON.stringify(settingsToSave);

  // Save the serialized string to local storage
  localStorage.setItem('gameSettings', serializedSettings);
}

function loadSettingsFromLocalStorage() {
  const serializedSettings = localStorage.getItem('gameSettings');
  if (serializedSettings) {
    try {
      const parsedSettings = JSON.parse(serializedSettings);
      settings.value = parsedSettings.map(setting => reactive(setting));
    } catch (error) {
      console.error("Failed to parse settings from local storage:", error);
    }
  }
}



const settingOverviewExists = computed(() => {
  const overview = currentSetting.value.setting_overview?.overview;
  return !!overview && overview.length > 0;
});

function formatTitle(string1, string2, string3, title) {
  if (title) return title;
  if (!string1 || !string2 || !string3) return '';
  // Helper function to capitalize the first letter of each word in a string
  function capitalize(text) {
    return text.split(' ') // Split the string into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' '); // Rejoin the words into a single string
  }

  // Apply the capitalize function to each string and format them
  return `The ${capitalize(string1)} ${capitalize(string2)} of ${capitalize(string3)}`;
}


// Validation and utility functions
const kingdomValidation = jsonString => {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = ['overview', 'relation_to_larger_setting', 'history', 'current_ruler_sentence', 'recent_event_current_ruler',
      'recent_event_consequences', 'social_history', 'recent_event_social', 'economic_history',
      'impactful_economic_event', 'military_history', 'recent_event_military', 'main_problem', 'potential_solutions', 'conclusion', 'npc_list'];
    const npcKeys = ['name', 'description'];
    for (let npc of jsonObj.npc_list) {
      if (!npcKeys.every(key => key in npc)) return false;
    }
    return keys.every(key => key in jsonObj);
  } catch (error) {
    return false;
  }
}

const sublocationValidation = jsonString => {
  try {
    const jsonObj = JSON.parse(jsonString);
    return jsonObj.every(location => ['name', 'description', 'title', 'setting_type', 'adjective'].every(key => key in location));
  } catch (error) {
    return false;
  }
}

const factionValidation = jsonString => {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = [
      'name', 'history', 'recent_event', 'current_situation', 'motto', 'influence_level',
      'faction_leader', 'faction_leader_description', 'key_resources_and_assets', 'rites_and_ceremonies',
      'recent_ceremony', 'challenge_to_power', 'challenge_event'
    ];
    return jsonObj.every(faction => keys.every(key => key in faction));
  } catch (error) {
    return false;
  }
}

const npcValidationPart1 = jsonString => {
  try {
    const jsonObj = JSON.parse(jsonString);
    console.log(jsonObj);
    const keys = ['description_of_position', 'current_location', 'distinctive_features_or_mannerisms',
      'character_secret', 'read_aloud_description'];
    return keys.every(key => key in jsonObj);

  } catch (error) {
    return false;
  }
}

const npcValidationPart2 = jsonString => {
  try {
    const jsonObj = JSON.parse(jsonString);
    console.log(jsonObj);
    const keys = ['relationships', 'roleplaying_tips'];
    return keys.every(key => key in jsonObj);

  } catch (error) {
    return false;
  }
}

// Faction power levels (constant)
const factionPowerLevels = [
  'Nonexistent', 'Marginal', 'Emerging', 'Moderate', 'Noteworthy', 'Influential',
  'Powerful', 'Dominant', 'Controlling', 'Totalitarian'
];

const requestQueue = ref([]);
const isProcessing = ref(false);

async function processQueue() {
  if (isProcessing.value || requestQueue.value.length === 0) return;
  isProcessing.value = true;

  const { type, data } = requestQueue.value.shift();  // Dequeue the first request

  switch (type) {
    case 'generateSetting':
      await handleGenerateSetting(data);
      break;
    case 'generateSubLocations':
      await handleGenerateSubLocations(data);
      break;
    case 'generateFactions':
      await handleGenerateFactions(data);
      break;
    case 'generateDetailedNPCDescription':
      await handleGenerateDetailedNPCDescription(data);
      break;
    default:
      console.error("Unknown request type:", type);
  }

  isProcessing.value = false;
  processQueue();  // Continue processing next in queue
}

function enqueueRequest(type, data) {
  requestQueue.value.push({ type, data });
  if (!isProcessing.value) processQueue();
}

function getOverviewText(overviewObject) {
  if (!overviewObject) {
    return '';
  }
  return Object.entries(overviewObject).map(([key, value]) => {
    if (Array.isArray(value)) {
      return ''; // Skip array values or handle them appropriately
    }
    return `${value}`;
  }).join('\n');
}


function generateSetting({ sublocationIndex, subLocationName, subLocationDescription, adjective, setting_type }) {
  const operationIndex = currentSettingIndex.value;
  const setting = settings.value[operationIndex];

  // Directly update properties in a reactive way
  setting.setting_type = setting.setting_type || randomType();
  setting.adjective = setting.adjective || randomAdjective(setting.setting_type);
  setting.place_name = setting.place_name || randomName(setting.setting_type);
  setting.place_lore = setting.place_lore || '';

  let nameToPass = subLocationName || setting.place_name || '';
  let parentLocationOverview = setting.place_lore || getOverviewText(setting.setting_overview) || '';

  let prompt;
  if (isNumber(sublocationIndex)) {
    prompt = sublocationOverviewPrompt(nameToPass, parentLocationOverview, subLocationDescription);
  } else {
    prompt = settingOverviewPrompt(setting.adjective, setting.setting_type, setting.place_name, setting.place_lore);
  }
  console.log(sublocationIndex);
  console.log(prompt);
  enqueueRequest('generateSetting', { operationIndex, prompt, sublocationIndex: sublocationIndex, subLocationName, adjective, setting_type });
}


function generateSubLocations() {
  const operationIndex = currentSettingIndex.value;
  if (settings.value[operationIndex].importantLocations.length > 0) return;
  const overviewText = getOverviewText(settings.value[operationIndex].setting_overview);
  const prompt = subLocationsPrompt(overviewText);

  enqueueRequest('generateSubLocations', { operationIndex, prompt });
}

function generateFactions() {
  const operationIndex = currentSettingIndex.value;
  if (settings.value[operationIndex].factions.length > 0) return;
  const overviewText = getOverviewText(settings.value[operationIndex].setting_overview);
  const prompt = factionsPrompt(overviewText);

  enqueueRequest('generateFactions', { operationIndex, prompt });
}

function findObjectByName(objects, name) {
  // Iterate through the array of objects
  for (const obj of objects) {
    // Check if the current object's name property matches the provided name
    if (obj.name === name) {
      return obj;  // Return the matching object
    }
  }
  return undefined;  // Return undefined if no matching object is found
}

function getNPCText(npc) {
  return `Here is a description of ${npc.name}: ${npc.description_of_position} ${npc.current_location} ${npc.distinctive_features_or_mannerisms} ${npc.character_secret}`;
}

function generateDetailedNPCDescription(index, relationshipObject) {
  const operationIndex = currentSettingIndex.value;
  const npc = settings.value[operationIndex].npcs[index];
  const npcText = getNPCText(npc);
  const settingOverviewText = getOverviewText(settings.value[operationIndex].setting_overview);
  let faction = findObjectByName(settings.value[operationIndex].factions, npc.faction);
  const factionOverviewText = getOverviewText(faction);

  if (!npc.detailedDescription) {
    let prompt;
    if (relationshipObject) {
      prompt = createNPCRelationshipPrompt(npc.name, npcText, relationshipObject, settingOverviewText, factionOverviewText);
    } else {
      prompt = createNPCPrompt(npc.name, settingOverviewText, factionOverviewText);
    }
    console.log(prompt);
    enqueueRequest('generateDetailedNPCDescription', { operationIndex, npcIndex: index, prompt, relationshipObject });
  }
}

// Generation functions
async function handleGenerateSetting({ operationIndex, prompt, sublocationIndex, subLocationName, adjective, setting_type, title }) {

  try {
    let parentIndex;
    if (isNumber(sublocationIndex)) {
      parentIndex = operationIndex;
      console.log("Parent index:", parentIndex, "Sublocation index:", sublocationIndex, "Sublocation name:", subLocationName, "Adjective:", adjective, "Setting type:", setting_type);
      createNewSetting(true, adjective, setting_type, subLocationName, title, parentIndex);
      operationIndex = settings.value.length - 1;
    }
    if (settings.value[operationIndex]) {
      settings.value[operationIndex].loadingsettingOverview = true;
      currentlyLoading.value = true;
    }
    if (isNumber(parentIndex)) {
      settings.value[parentIndex].importantLocations[sublocationIndex].loading = true;
    }
    const response = await generateGptResponse(prompt, kingdomValidation);
    const overview = JSON.parse(response);

    if (settings.value[operationIndex]) {
      settings.value[operationIndex].setting_overview = overview;
      settings.value[operationIndex].npcs = overview.npc_list || [];
      settings.value[operationIndex].loadingsettingOverview = false;
      currentlyLoading.value = false;
      if (isNumber(parentIndex)) {
        settings.value[parentIndex].importantLocations[sublocationIndex].has_detailed_description = true;
        settings.value[parentIndex].importantLocations[sublocationIndex].main_index = operationIndex;
        settings.value[parentIndex].importantLocations[sublocationIndex].loading = false;
        currentlyLoading.value = false;
      }
      saveSettingsToLocalStorage();  // Save to local storage after update
    }
  } catch (error) {
    console.error("Error generating kingdom description:", error);
    if (settings.value[operationIndex]) {
      settings.value[operationIndex].loadingsettingOverview = false;
      currentlyLoading.value = false;
    }
  }
}

async function handleGenerateSubLocations({ operationIndex, prompt }) {
  try {
    currentlyLoading.value = true;
    const response = await generateGptResponse(prompt, sublocationValidation);
    currentlyLoading.value = false;
    if (settings.value[operationIndex]) {
      settings.value[operationIndex].importantLocations = JSON.parse(response);
      saveSettingsToLocalStorage();  // Save to local storage after update
    }
  } catch (error) {
    currentlyLoading.value = false;
    console.error("Error generating sublocations:", error);
  }
}

async function handleGenerateFactions({ operationIndex, prompt }) {
  try {
    if (!settings.value[operationIndex].factions.length > 0) {
      currentlyLoading.value = true;
    }

    const response = await generateGptResponse(prompt, factionValidation);
    currentlyLoading.value = false;

    if (settings.value[operationIndex]) {
      const factions = JSON.parse(response);
      settings.value[operationIndex].factions = factions;
      factions.forEach(faction => {
        if (!settings.value[operationIndex].npcs.map(npc => npc.name).includes(faction.faction_leader)) {
          settings.value[operationIndex].npcs.push({
            name: faction.faction_leader,
            description: faction.faction_leader_description,
            faction: faction.name
          });
        }
      });
      currentlyLoading.value = false;
      saveSettingsToLocalStorage();  // Save to local storage after update
    }
  } catch (error) {
    currentlyLoading.value = false;
    console.error("Error generating factions:", error);
  }
}

async function handleGenerateDetailedNPCDescription({ operationIndex, npcIndex, prompt, relationshipObject }) {
  let npc;  // Define npc here to ensure it's accessible throughout the function

  try {
    if (relationshipObject) {
      settings.value[operationIndex].npcs.push({ name: relationshipObject.name, loading: true });  // Also set loading here
      let npcIndex = settings.value[operationIndex].npcs.length - 1;  // Update npcIndex to the new NPC
      npc = settings.value[operationIndex].npcs[npcIndex]; // Correctly reference the newly added npc
      handleAccordion(npcIndex);
    } else {
      npc = settings.value[operationIndex].npcs[npcIndex];
      npc.loading = true;  // Set loading status
      currentlyLoading.value = true;
    }

    const npcPart1 = await generateGptResponse(prompt, npcValidationPart1);
    const relationshipsAndTips = await generateGptResponse(createRelationshipAndTipsPrompt(npc.name, npcPart1), npcValidationPart2);

    if (npc) {
      Object.assign(npc, JSON.parse(npcPart1));
      Object.assign(npc, JSON.parse(relationshipsAndTips));
      npc.loading = false;
      currentlyLoading.value = false;
      console.log(npc);
      saveSettingsToLocalStorage(); // Save to local storage after update
    }
  } catch (error) {
    if (npc) {
      npc.loading = false; // Ensure we catch and handle the case where npc might be partially defined
      currentlyLoading.value = false;
    }
    console.error("Error generating detailed NPC description:", error);
  }
}

function handleAccordion(npcIndex) {
  nextTick(() => {
    const accordion = document.getElementById(`npc-${npcIndex}`);
    if (accordion) {
      accordion.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      settings.value[currentSettingIndex.value].npcs[npcIndex].open = true; // Open the accordion
    }
  });
}

// Random type, adjective, and name functions
function randomType() {
  const placeTypes = Object.keys(placeAdjectives);
  return placeTypes[Math.floor(Math.random() * placeTypes.length)];
}

function randomAdjective(type) {
  return placeAdjectives[type.toLowerCase()][Math.floor(Math.random() * placeAdjectives[type.toLowerCase()].length)];
}

function randomName(type) {
  return place_names[type.toLowerCase()][Math.floor(Math.random() * place_names[type.toLowerCase()].length)];
}
</script>


<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.app-container {
  display: flex;

  $sidebar-width: 400px;
  $background-color: #f4f4f4;
  $active-color: #ffffff;
  $hover-background-color: #f0f0f0;
  $default-background-color: #e0e0e0;
  $active-border-color: #007BFF;
  $indentation-step: 20px;
  $transition-speed: 0.3s;

  .sidebar {
    width: $sidebar-width;
    background-color: $background-color;
    padding: 10px;
    height: 100vh;

    .settings-tabs {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 8px 16px;
        cursor: pointer;
        background-color: $default-background-color;
        margin-bottom: 4px;
        border-left: 5px solid transparent;
        transition: background-color $transition-speed;

        &:hover {
          background-color: $hover-background-color;
        }

        &.active {
          background-color: $active-color;
          border-left-color: $active-border-color;
        }
      }
    }
  }


  .main-content {
    flex-grow: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 3rem auto;
    max-width: 800px;


    .generate-button {
      margin-top: 2rem;
    }

    .generator-form,
    .content-tabs {
      box-shadow: 0 4px 6px #0000001a;
      padding: 3rem;
      border-radius: 8px;
    }
  }
}

.delete-button {
  margin-top: 2rem;
}

.generator-fields {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.lore-field-input {
  margin-top: 1.5rem;
}

.focus-text {
  background-color: $cdr-color-background-secondary;
  color: $cdr-color-text-secondary;
  padding: 1rem 2rem;
  font-style: italic;
}

.tab-skeleton {
  width: 800px;
  margin-top: 2rem;
}

.skeleton-hr {
  height: 1px;
  color: rgba(66, 59, 47, 0.75);
  width: 800px;
  background-color: rgba(66, 59, 47, 0.75);
}

.skeleton-ul {
  display: flex;
  gap: 3rem;
  list-style: none;
  padding: 0;
  margin: 0 1rem;
}

.skeleton-tab-inactive {
  color: rgba(66, 59, 47, 0.75);
  font-weight: 300;
}

.skeleton-tab {
  color: rgba(12, 11, 8, 0.75);
  list-style: none;
  font-weight: 500;
}

.skeleton-line {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.bone-list-item {
  margin: 4rem 0;
}

.relationship-buttons {
  background-color: #f4f2ed;
  border-radius: 8px;
  padding: 1rem 1rem 4rem 1rem;
  margin: 1rem auto;
  text-align: center;

  ul {
    justify-content: center;
    margin: 0;
  }
}
</style>
