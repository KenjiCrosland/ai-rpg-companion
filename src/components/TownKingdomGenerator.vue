<template>
  <div class="app-container">
    <div class="sidebar">
      <ul class="settings-tabs">
        <li v-for="(setting, index) in settings" :key="index" :class="{ active: currentSettingIndex === index }"
          @click="selectSetting(index)">
          {{ formatTitle(setting.adjective, setting.kingdomType, setting.placeName) || 'Unnamed Setting' }}
        </li>
        <li v-if="!currentlyLoadingOverview && allSettingsHaveAnOverview" @click="createNewSetting">+ New Setting</li>
      </ul>
    </div>
    <div class="main-content">
      <h1>Kenji's RPG Setting Generator: Build a Kingdom, Town, Empire, or Space Station!</h1>
      <form @submit.prevent="generateTownOrKingdom" style="margin-bottom: 3rem">
        <div class="generator-fields">
          <cdr-input class="generator-field-input" id="adjective" v-model="currentSetting.adjective"
            background="secondary" label="Adjective">
            <template #helper-text-bottom>
              Examples: "Flourishing", "Decrepit", "Decadent"
            </template>
          </cdr-input>
          <cdr-input class="generator-field-input" id="kingdomType" v-model="currentSetting.kingdomType"
            background="secondary" label="Type of Place">
            <template #helper-text-bottom>
              Examples: "Kingdom", "Town", "City", "Republic"
            </template>
          </cdr-input>
          <p>Of</p>
          <cdr-input class="generator-field-input" id="placeName" v-model="currentSetting.placeName"
            background="secondary" label="Place name">
            <template #helper-text-bottom>
              Examples: "Kingdomaria", "Townland", "Citytopia", "Republic of the People"
            </template>
          </cdr-input>
        </div>
        <cdr-input :rows="5" tag="textarea" v-model="currentSetting.placeLore" background="secondary"
          label="Setting Lore" placeholder="Enter any additional details about the setting" class="item-lore-details">
          <template #helper-text-bottom>
            Write any details about your setting that you want to include. Need help coming up with lore for your
            setting?
            Use the <cdr-link href="https://cros.land/ai-powered-lore-and-timeline-generator/">Lore Generator</cdr-link>
            and paste in the generated summary!
          </template>
        </cdr-input>
        <cdr-button @click="generateTownOrKingdom">Generate</cdr-button>
      </form>
      <cdr-tabs v-if="kingdomOverviewExists" height="auto" style="width: 800px">
        <cdr-tab-panel label="Overview" name="Overview">
          <h2>{{ formatTitle(currentSetting.adjective, currentSetting.kingdomType, currentSetting.placeName) }}</h2>
          <p>{{ currentSetting.kingdomOverview.overview }}</p>
          <p>{{ currentSetting.kingdomOverview.history }}</p>
          <p>{{ currentSetting.kingdomOverview.current_ruler_sentence }} {{
          currentSetting.kingdomOverview.recent_event_current_ruler }} {{
          currentSetting.kingdomOverview.recent_event_consequences }}</p>
          <p>{{ currentSetting.kingdomOverview.social_history }} {{ currentSetting.kingdomOverview.recent_event_social
            }}
          </p>
          <p>{{ currentSetting.kingdomOverview.economic_history }} {{
          currentSetting.kingdomOverview.impactful_economic_event }}</p>
          <p>{{ currentSetting.kingdomOverview.military_history }} {{
          currentSetting.kingdomOverview.recent_event_military
        }}</p>
          <p>{{ currentSetting.kingdomOverview.greatest_hope }}</p>
          <p>{{ currentSetting.kingdomOverview.darkest_fear }}</p>
        </cdr-tab-panel>
        <cdr-tab-panel label="Important Locations" name="Locations" @tab-change="generateSubLocations">
          <h2>Important Locations</h2>
          <div v-if="currentSetting.importantLocations && currentSetting.importantLocations.length > 0">
            <cdr-list>
              <li v-for="location in currentSetting.importantLocations" :key="location.name">
                <h3>{{ location.name }}</h3>
                <p>{{ location.description }}</p>
              </li>
            </cdr-list>
          </div>
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
            <cdr-accordion v-for="(npc, index) in currentSetting.npcs" level="2" :id="'npc-' + npc.name" :key="npc.name"
              :opened="npc.open" @accordion-toggle="npc.open = !npc.open">
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
                        <cdr-button @click="generateDetailedNPCDescription(index)">{{ relationshipName }}</cdr-button>
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
      <div v-if="!kingdomOverviewExists && currentSetting.loadingKingdomOverview">
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
          <h2>{{ formatTitle(currentSetting.adjective, currentSetting.kingdomType, currentSetting.placeName)}}</h2>

          <CdrSkeletonBone type="line" style="width:95%" />
          <CdrSkeletonBone type="line" style="width:90%" />
          <CdrSkeletonBone type="line" style="width:85%" />
          <CdrSkeletonBone type="line" style="width:95%" />
          <p>
            <CdrSkeletonBone type="line" style="width:95%" />
            <CdrSkeletonBone type="line" style="width:90%" />
            <CdrSkeletonBone type="line" style="width:85%" />
            <CdrSkeletonBone type="line" style="width:85%" />
          </p>
          <p>
            <CdrSkeletonBone type="line" style="width:95%" />
            <CdrSkeletonBone type="line" style="width:90%" />
            <CdrSkeletonBone type="line" style="width:85%" />
            <CdrSkeletonBone type="line" style="width:85%" />
            <CdrSkeletonBone type="line" style="width:90%" />
            <CdrSkeletonBone type="line" style="width:85%" />
          </p>
          <p>
            <CdrSkeletonBone type="line" style="width:95%" />
            <CdrSkeletonBone type="line" style="width:90%" />
            <CdrSkeletonBone type="line" style="width:85%" />
            <CdrSkeletonBone type="line" style="width:90%" />
            <CdrSkeletonBone type="line" style="width:85%" />
            <CdrSkeletonBone type="line" style="width:85%" />
          </p>
          <p>
            <CdrSkeletonBone type="line" style="width:95%" />
            <CdrSkeletonBone type="line" style="width:90%" />
          </p>
        </CdrSkeleton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick, onMounted } from 'vue'
import { CdrInput, CdrButton, CdrText, CdrSelect, CdrTabs, CdrTabPanel, CdrCheckbox, CdrLink, CdrList, CdrSkeleton, CdrSkeletonBone, IconXSm, CdrTooltip, CdrAccordionGroup, CdrAccordion } from "@rei/cedar";
import { kingdomOverviewPrompt, subLocationsPrompt, factionsPrompt, createNPCPrompt, createRelationshipAndTipsPrompt } from "../util/kingdom-prompts.mjs";
import FactionSkeleton from "./skeletons/FactionSkeleton.vue";
import LocationListSkeleton from "./skeletons/LocationListSkeleton.vue";
import NPCSkeleton from "./skeletons/NPCSkeleton.vue";
import { generateGptResponse } from "../util/open-ai.mjs";
import placeAdjectives from '../data/place-adjectives.json';
import placeNames from '../data/place-names.json';
import '@rei/cedar/dist/style/cdr-text.css';
import '@rei/cedar/dist/style/cdr-link.css';
import '@rei/cedar/dist/style/cdr-list.css';
import '@rei/cedar/dist/style/cdr-tabs.css';


const currentSettingIndex = ref(0);
const isNewSetting = ref(false);  // Flag to track if the current setting is new
const defaultSetting = reactive({
  adjective: '',
  kingdomType: '',
  placeName: '',
  placeLore: '',
  kingdomOverview: null,
  factions: [],
  importantLocations: [],
  npcs: [],
});
const settings = ref([reactive({ ...defaultSetting })]);
const currentSetting = computed(() => settings.value[currentSettingIndex.value] || reactive({ ...defaultSetting }));
onMounted(loadSettingsFromLocalStorage);

const selectSetting = (index) => {
  currentSettingIndex.value = index;
  isNewSetting.value = false;  // Not new since it's selected from existing ones
};

const currentlyLoadingOverview = computed(() => {
  // Check if any setting has loadingKingdomOverview set to true
  return settings.value.some(setting => setting.loadingKingdomOverview);
});

//function similar to the above but returns false if there is no kingdomOverview for any setting
const allSettingsHaveAnOverview = computed(() => {
  return settings.value.every(setting => setting.kingdomOverview?.overview);
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

const createNewSetting = () => {
  const newSetting = reactive({
    ...defaultSetting,
    kingdomOverview: { ...defaultSetting.kingdomOverview },
    factions: [],
    importantLocations: [],
    npcs: []
  });
  settings.value.push(newSetting);
  currentSettingIndex.value = settings.value.length - 1;
  isNewSetting.value = true;  // Mark as new
};

function saveSettingsToLocalStorage() {
  // Serialize the current state of settings to a JSON string
  const serializedSettings = JSON.stringify(settings.value.map(setting => ({
    ...setting,
    // Remove reactive internals and other non-serializable values
    kingdomOverview: setting.kingdomOverview,
    factions: setting.factions,
    importantLocations: setting.importantLocations,
    npcs: setting.npcs
  })));

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



const kingdomOverviewExists = computed(() => {
  const overview = currentSetting.value.kingdomOverview?.overview;
  return !!overview && overview.length > 0;
});

function formatTitle(string1, string2, string3) {
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
    const keys = ['overview', 'history', 'current_ruler_sentence', 'recent_event_current_ruler',
      'recent_event_consequences', 'social_history', 'recent_event_social', 'economic_history',
      'impactful_economic_event', 'military_history', 'recent_event_military', 'greatest_hope',
      'darkest_fear', 'npc_list'];
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
    return jsonObj.every(location => ['name', 'description'].every(key => key in location));
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
    case 'generateTownOrKingdom':
      await handleGenerateTownOrKingdom(data);
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


function generateTownOrKingdom() {
  const operationIndex = currentSettingIndex.value;
  const setting = settings.value[operationIndex];

  // Directly update properties in a reactive way
  setting.kingdomType = setting.kingdomType || randomType();
  setting.adjective = setting.adjective || randomAdjective(setting.kingdomType);
  setting.placeName = setting.placeName || randomName(setting.kingdomType);
  setting.placeLore = setting.placeLore || '';

  const prompt = kingdomOverviewPrompt(setting.kingdomType, setting.adjective, setting.placeName, setting.placeLore);
  enqueueRequest('generateTownOrKingdom', { operationIndex, prompt });
}


function generateSubLocations() {
  const operationIndex = currentSettingIndex.value;
  if (settings.value[operationIndex].importantLocations.length > 0) return;
  const overviewText = getOverviewText(settings.value[operationIndex].kingdomOverview);
  const prompt = subLocationsPrompt(overviewText);

  enqueueRequest('generateSubLocations', { operationIndex, prompt });
}

function generateFactions() {
  const operationIndex = currentSettingIndex.value;
  if (settings.value[operationIndex].factions.length > 0) return;
  const overviewText = getOverviewText(settings.value[operationIndex].kingdomOverview);
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

function generateDetailedNPCDescription(index) {
  const operationIndex = currentSettingIndex.value;
  const npc = settings.value[operationIndex].npcs[index];
  const kingdomOverviewText = getOverviewText(settings.value[operationIndex].kingdomOverview);
  let faction = findObjectByName(settings.value[operationIndex].factions, npc.faction);
  const factionOverviewText = getOverviewText(faction);

  if (!npc.detailedDescription) { // Avoid regenerating if already present
    const prompt = createNPCPrompt(npc.name, kingdomOverviewText, factionOverviewText); // Assume createNPCPrompt creates an appropriate prompt
    console.log(prompt);
    enqueueRequest('generateDetailedNPCDescription', { operationIndex, npcIndex: index, prompt });
  }
}




// Generation functions
async function handleGenerateTownOrKingdom({ operationIndex, prompt }) {
  try {
    if (settings.value[operationIndex]) {
      settings.value[operationIndex].loadingKingdomOverview = true;
    }
    const response = await generateGptResponse(prompt, kingdomValidation);
    const overview = JSON.parse(response);

    if (settings.value[operationIndex]) {
      settings.value[operationIndex].kingdomOverview = overview;
      settings.value[operationIndex].npcs = overview.npc_list || [];
      settings.value[operationIndex].loadingKingdomOverview = false;
      saveSettingsToLocalStorage();  // Save to local storage after update
    }
  } catch (error) {
    console.error("Error generating kingdom description:", error);
    if (settings.value[operationIndex]) {
      settings.value[operationIndex].loadingKingdomOverview = false;
    }
  }
}

async function handleGenerateSubLocations({ operationIndex, prompt }) {
  try {
    const response = await generateGptResponse(prompt, sublocationValidation);
    if (settings.value[operationIndex]) {
      settings.value[operationIndex].importantLocations = JSON.parse(response);
      saveSettingsToLocalStorage();  // Save to local storage after update
    }
  } catch (error) {
    console.error("Error generating sublocations:", error);
  }
}

async function handleGenerateFactions({ operationIndex, prompt }) {
  try {
    const response = await generateGptResponse(prompt, factionValidation);
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
      saveSettingsToLocalStorage();  // Save to local storage after update
    }
  } catch (error) {
    console.error("Error generating factions:", error);
  }
}

async function handleGenerateDetailedNPCDescription({ operationIndex, npcIndex, prompt }) {
  try {
    console.log(prompt);
    const npc = settings.value[operationIndex].npcs[npcIndex];
    npc.loading = true;
    const npcPart1 = await generateGptResponse(prompt, npcValidationPart1);
    const relationshipsAndTips = await generateGptResponse(createRelationshipAndTipsPrompt(npc.name, npcPart1), npcValidationPart2);
    if (npc) {
      Object.assign(npc, JSON.parse(npcPart1));
      Object.assign(npc, JSON.parse(relationshipsAndTips));
      npc.loading = false;
      console.log(npc);
      saveSettingsToLocalStorage(); // Save to local storage after update
    }
  } catch (error) {
    npc.loading = false;
    console.error("Error generating detailed NPC description:", error);
  }
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
  return placeNames[type.toLowerCase()][Math.floor(Math.random() * placeNames[type.toLowerCase()].length)];
}
</script>


<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.app-container {
  display: flex;

  .sidebar {
    width: 200px;
    background-color: #f4f4f4;
    padding: 10px;

    .settings-tabs {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 8px 16px;
        cursor: pointer;
        background-color: #e0e0e0;
        margin-bottom: 4px;
        border-left: 5px solid transparent;
        transition: background-color 0.3s;

        &:hover {
          background-color: #f0f0f0;
        }

        &.active {
          background-color: #ffffff;
          border-left-color: #007BFF;
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
    margin: auto;
    max-width: 800px;
    height: 100vh;
  }
}

.generator-fields {
  display: flex;
  gap: 2rem;
  align-items: center;
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
