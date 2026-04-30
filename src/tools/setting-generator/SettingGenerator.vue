<template>
  <GeneratorLayout :premium="premium" :flexible-sidebar="true" :show-footer="false">
    <template #sidebar>
      <div class="sidebar-content">
        <ul class="settings-tabs">
          <!-- Flatten settings tree and display each with appropriate indentation -->
          <li v-for="setting in flattenSettings(settingsTree)" :key="setting.originalIndex"
            :class="{ 'active-tab': currentSettingIndex === setting.originalIndex }"
            :style="{ marginLeft: `${setting.depth * 20}px` }">
            <button class="setting-button" @click="selectSetting(setting.originalIndex)">
              {{ setting.place_name || 'Unnamed Setting' }}
            </button>
          </li>
          <li>
            <button v-if="!currentlyLoadingOverview && allSettingsHaveAnOverview" class="setting-button"
              @click="createNewSetting">+ New Setting</button>
          </li>
        </ul>
        <div class="copy-buttons">

          <cdr-button @click="copySettingsAsPlainText" modifier="secondary">Copy As Plain Text</cdr-button>
          <cdr-button @click="copySettingsAsHtml" modifier="secondary">Copy As HTML</cdr-button>
          <cdr-button @click="copySettingsAsMarkdown" modifier="secondary">Copy As Homebrewery Markdown</cdr-button>
          <p>Use the above buttons to copy or download all setting info into your desired format. For homebrewery go
            <cdr-link href="https://homebrewery.naturalcrit.com/new">here</cdr-link> and paste the markdown
            there. You will need to add your own pagebreaks.
          </p>
          <cdr-button @click="deleteAllSettings" v-if="!currentlyLoading">Delete All Settings</cdr-button>
        </div>
      </div>

      <DataManagerModal :opened="showDataManagerModal" @update:opened="showDataManagerModal = $event" :premium="premium"
        currentApp="gameSettings" />
    </template>

    <div class="main-content">
      <div class="landing-wrapper" v-show="!settingOverviewExists && !currentSetting.loadingsettingOverview">
        <!-- ZONE 1: Brand + Headline -->
        <div class="hero-header">
          <div class="brand-line">
            <span class="brand-name">Kenji's Setting Generator</span>
            <span v-if="!premium" class="version-pill">Free</span>
            <span v-else class="version-pill premium">Premium</span>
          </div>
          <h1>Generate Rich RPG Settings with Factions, NPCs &amp; Quests</h1>
          <p class="value-prop">From a single name to a fully detailed kingdom, town or empire with nested
            locations, political factions, and quest hooks.</p>
        </div>

        <!-- ZONE 2: Form card -->
        <div class="form-card">
          <form @submit.prevent="generateSetting" class="setting-form">
            <div class="form-row-identity">
              <cdr-input id="adjective" v-model="currentSetting.adjective" background="secondary"
                label="Adjective (optional)" placeholder="e.g. Flourishing, Decrepit, Decadent" />
              <cdr-input id="setting_type" v-model="currentSetting.setting_type" background="secondary"
                label="Type of Place (optional)" placeholder="e.g. Kingdom, Town, Republic" />
              <cdr-input id="place_name" v-model="currentSetting.place_name" background="secondary"
                label="Place Name (optional)" placeholder="e.g. Valderia, Ashenmoor" />
            </div>
            <div class="form-row-lore">
              <cdr-input :rows="4" tag="textarea" v-model="currentSetting.place_lore" background="secondary"
                label="Setting Lore (optional)"
                placeholder="Describe your setting in as much or as little detail as you like — or leave blank for a surprise.">
                <template #helper-text-bottom>
                  Already have lore? Paste it from the <cdr-link
                    href="https://cros.land/ai-powered-lore-and-timeline-generator/">Lore Generator</cdr-link> to build
                  on what you have.
                </template>
              </cdr-input>
            </div>
            <cdr-button type="submit" :full-width="true">
              Generate Setting
            </cdr-button>
          </form>
        </div>

        <!-- ZONE 3: Footer meta -->
        <div class="footer-meta">
          <div v-if="!premium">
            <p>
              All setting generation is currently free. Setting data is saved on this browser. To save/load setting data for use in another computer or browser requires a premium Patreon subscription.
            </p>
            <div class="patreon-universal-button">
              <a :href="patreonLoginUrl">
                <div class="patreon-responsive-button-wrapper">
                  <div class="patreon-responsive-button">
                    <img class="patreon_logo"
                      src="https://cros.land/wp-content/plugins/patreon-connect/assets/img/patreon-logomark-on-coral.svg"
                      alt="Unlock with Patreon"> Unlock with Patreon
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div v-else>
            <p>Setting data is saved on this browser. Export to a file to use on another device.</p>
            <cdr-button modifier="dark" @click="showDataManagerModal = true">
              Save/Load Data from a File
            </cdr-button>
          </div>
        </div>
      </div>
      <Tabs class="content-tabs" v-if="settingOverviewExists" height="auto" style="width: 100%"
        :activeIndex="activeTabIndex">
        <TabPanel label="Overview">
          <OverviewTab :setting="currentSetting" :premium="premium" @updated-setting="onOverviewUpdated" />
        </TabPanel>
        <TabPanel label="Locations">
          <LocationsTab :setting="currentSetting" :all-settings="settings" :premium="premium"
            @updated-setting="onLocationsUpdated" @generate-sublocation="generateSetting"
            @delete-sublocation-setting="deleteSetting" />
        </TabPanel>
        <TabPanel label="Factions">
          <FactionsTab :setting="currentSetting" :premium="premium" @updated-setting="onFactionsUpdated" />
        </TabPanel>
        <TabPanel label="NPCs" name="NPCs">
          <NPCsTab :setting="currentSetting" :premium="premium" @updated-setting="onNPCsUpdated" />
        </TabPanel>
        <TabPanel label="Quest Hooks">
          <QuestHooksTab :setting="currentSetting" :premium="premium" @updated-setting="onQuestHooksUpdated" />
        </TabPanel>
      </Tabs>
      <cdr-button class="delete-button" v-if="settingOverviewExists && !currentlyLoading"
        @click="deleteSetting(currentSettingIndex)">Delete
        Setting</cdr-button>

      <!-- Footer below content -->
      <div class="footer-meta" v-if="settingOverviewExists">
        <div v-if="!premium">
          <p>
            All setting generation is currently free. Setting data is saved on this browser. To save/load setting data for use in another computer or browser requires a premium Patreon subscription.
          </p>
          <div class="patreon-universal-button">
            <a :href="patreonLoginUrl">
              <div class="patreon-responsive-button-wrapper">
                <div class="patreon-responsive-button">
                  <img class="patreon_logo"
                    src="https://cros.land/wp-content/plugins/patreon-connect/assets/img/patreon-logomark-on-coral.svg"
                    alt="Unlock with Patreon"> Unlock with Patreon
                </div>
              </div>
            </a>
          </div>
        </div>
        <div v-else>
          <p>Setting data is saved on this browser. Export to a file to use on another device.</p>
          <cdr-button modifier="dark" @click="showDataManagerModal = true">
            Save/Load Data from a File
          </cdr-button>
        </div>
      </div>

      <div class="content-tabs" v-if="!settingOverviewExists && currentSetting.loadingsettingOverview">
        <CdrSkeleton>
          <Tabs>
            <TabPanel label="Overview">
              <div class="tab-skeleton">
                <h2>{{ formatTitle(currentSetting.adjective, currentSetting.setting_type, currentSetting.place_name,
                  currentSetting.setting_overview?.title) }}</h2>
                <OverviewSkeleton />
              </div>

            </TabPanel>
            <TabPanel label="Locations" :disabled="true">
            </TabPanel>
            <TabPanel label="Factions" :disabled="true">
            </TabPanel>
            <TabPanel label="NPCs" :disabled="true">
            </TabPanel>
            <TabPanel label="Quest Hooks" :disabled="true">
            </TabPanel>
          </Tabs>
        </CdrSkeleton>
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick, onMounted } from 'vue'
import { CdrInput, CdrButton, CdrLink, CdrSkeleton } from "@rei/cedar";
import { settingOverviewPrompt, sublocationOverviewPrompt } from "./prompts/index.mjs";
import OverviewSkeleton from "@/components/skeletons/OverviewSkeleton.vue";
import DataManagerModal from '@/components/DataManagerModal.vue';
import Tabs from '@/components/tabs/Tabs.vue';
import TabPanel from '@/components/tabs/TabPanel.vue';
import { formatSettingAsPlainText } from "@/util/formatSettingAsPlainText.mjs";
import { formatSettingAsMarkdown } from "@/util/formatSettingAsMarkdown.mjs";
import { formatSettingAsHtml } from "@/util/formatSettingAsHTML.mjs";
import { generateGptResponse } from "@/util/ai-client.mjs";
import { saveNPCToStorage, settingNPCToCanonical } from '@/util/npc-storage.mjs';
import { removeReferencesForEntity } from '@/util/reference-storage.mjs';
import { getNavigationParams } from '@/util/navigation.mjs';
import placeAdjectives from '@/data/place-adjectives.json';
import place_names from '@/data/place-names.json';
import '@rei/cedar/dist/style/cdr-link.css';
import '@rei/cedar/dist/style/cdr-list.css';
import '@rei/cedar/dist/style/cdr-popover.css';
import QuestHooksTab from './components/tabs/QuestHooksTab.vue';
import OverviewTab from './components/tabs/OverviewTab.vue';
import FactionsTab from './components/tabs/FactionsTab.vue';
import LocationsTab from './components/tabs/LocationsTab.vue';
import NPCsTab from './components/tabs/NPCsTab.vue';
import GeneratorLayout from '@/components/GeneratorLayout.vue';

const props = defineProps({
  premium: {
    type: Boolean,
    default: false
  }
});

// Patreon OAuth URL
const patreonLoginUrl = computed(() => {
  const returnUrl = encodeURIComponent(window.location.href);
  return `https://cros.land/patreon-flow/?patreon-login=yes&patreon-final-redirect=${returnUrl}`;
});

const showDataManagerModal = ref(false);

// Handler for LocationsTab emit — persists updated importantLocations
const onLocationsUpdated = (updatedSetting) => {
  const idx = currentSettingIndex.value;
  if (settings.value[idx]) {
    settings.value[idx].importantLocations = updatedSetting.importantLocations;
    saveSettingsToLocalStorage();
  }
};

// Handler for FactionsTab emit — merges updated factions (and npcs) and persists
const onFactionsUpdated = (updatedSetting) => {
  const idx = currentSettingIndex.value;
  if (settings.value[idx]) {
    settings.value[idx].factions = updatedSetting.factions;
    if (updatedSetting.npcs) {
      settings.value[idx].npcs = updatedSetting.npcs;
    }
    saveSettingsToLocalStorage();
  }
};

// Handler for OverviewTab emit — persists edited title and combined_content
const onOverviewUpdated = (updatedSetting) => {
  const idx = currentSettingIndex.value;
  if (settings.value[idx]) {
    settings.value[idx].setting_overview = updatedSetting.setting_overview;
    saveSettingsToLocalStorage();
  }
};

// Handler for NPCsTab emit — persists updated npcs
const onNPCsUpdated = (updatedSetting) => {
  const idx = currentSettingIndex.value;
  if (settings.value[idx]) {
    settings.value[idx].npcs = updatedSetting.npcs;
    saveSettingsToLocalStorage();
  }
};

// Handler for QuestHooksTab emit — merges updated setting and persists
const onQuestHooksUpdated = (updatedSetting) => {
  const idx = currentSettingIndex.value;
  if (settings.value[idx]) {
    settings.value[idx].questHooks = updatedSetting.questHooks;
    saveSettingsToLocalStorage();
  }
};

function copySettingsAsPlainText() {
  const text = formatSettingAsPlainText(settingsTree.value);
  navigator.clipboard.writeText(text);
  alert("Settings copied to clipboard as plain text!");
}

function copySettingsAsMarkdown() {
  const text = formatSettingAsMarkdown(settingsTree.value);
  navigator.clipboard.writeText(text);
  alert("Settings copied to clipboard as Homebrewery Markdown!");
}

function copySettingsAsHtml() {
  const text = formatSettingAsHtml(settingsTree.value);
  navigator.clipboard.writeText(text);
  alert("Settings copied to clipboard as HTML!");
}

function deleteAllSettings() {
  if (confirm("Are you sure you want to delete all settings?")) {
    settings.value = [reactive(freshDefaultSetting())];
    currentSettingIndex.value = 0;
    saveSettingsToLocalStorage();
  }
}

function isNumber(value) {
  return typeof value === 'number';
}
const currentlyLoading = ref(false);
const currentSettingIndex = ref(0);
const activeTabIndex = ref(0);
const isNewSetting = ref(false);  // Flag to track if the current setting is new
function makeSettingId() {
  return `set_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

const defaultSetting = reactive({
  id: '',
  adjective: '',
  setting_type: '',
  place_name: '',
  place_lore: '',
  setting_overview: null,
  factions: [],
  importantLocations: [],
  npcs: [],
  questHooks: [],
  parentIndex: null,
  loadingFactions: false,
  loadingSubLocations: false,
  loadingsettingOverview: false,
});

function freshDefaultSetting() {
  return { ...defaultSetting, id: makeSettingId() };
}

const settings = ref([reactive(freshDefaultSetting())]);
const currentSetting = computed(() => settings.value[currentSettingIndex.value] || reactive({ ...defaultSetting }));

onMounted(async () => {
  loadSettingsFromLocalStorage();

  // Handle deep linking from NPC Generator
  const params = getNavigationParams();

  if (params.source && params.tab === 'npcs') {
    // Find setting by name
    const settingIndex = settings.value.findIndex(s =>
      s.place_name === params.source
    );

    if (settingIndex !== -1) {
      // Select the setting
      currentSettingIndex.value = settingIndex;

      // Wait for the watcher to reset tab index (it runs on nextTick)
      await nextTick();
      await nextTick();

      // NOW switch to NPCs tab (index 3) after the watcher has run
      activeTabIndex.value = 3;
    }
  }
});
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
  //confirm deletion
  if (!confirm("Are you sure you want to delete this setting?")) return;
  if (indexToDelete < 0 || indexToDelete >= settings.value.length) return;  // Safety check

  // Capture the parentIndex of the setting to be deleted for reassigning children
  const parentOfDeleted = settings.value[indexToDelete].parentIndex;
  // Capture the deleted setting's id so we can drop its references after removal.
  // (Children are re-parented, not cascading-deleted — only one id needs cleanup.)
  const deletedId = settings.value[indexToDelete].id;

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

  if (deletedId) {
    removeReferencesForEntity('setting', deletedId);
  }

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
      activeTabIndex.value = 0;  // Reset active tab index when switching settings
    });
  }
});

const createNewSetting = (isSublocation, adjective = '', setting_type = '', place_name = '', title = '', parentIndex = null) => {
  const newSetting = reactive({
    id: makeSettingId(),
    adjective: adjective,
    setting_type: setting_type,
    place_name: place_name,
    title: title,
    place_lore: '',
    setting_overview: null,
    factions: [],
    importantLocations: [],
    npcs: [],
    questHooks: [],
    parentIndex: isSublocation ? parentIndex : null,
    loadingFactions: false,
    loadingSubLocations: false,
    loadingNewFaction: false,
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
    factions: setting.factions.map(faction => ({
      ...faction,
      open: false // Set all faction.open properties to false before saving
    })),
    loadingFactions: false,  // Set loadingFactions to false before saving
    loadingSubLocations: false,  // Set loadingSubLocations to false before saving
    loadingsettingOverview: false,  // Set loadingsettingOverview to false before saving
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

      // Migrate existing NPCs to shared storage
      settings.value.forEach(setting => {
        migrateSettingNPCs(setting);
      });
    } catch (error) {
      console.error("Failed to parse settings from local storage:", error);
    }
  }
}

function migrateSettingNPCs(setting) {
  const settingName = setting.setting_overview?.name
    || setting.place_name
    || 'Setting NPCs';
  let migrated = false;

  if (setting.npcs) {
    // Load shared storage once
    const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs') || '{}');
    const sharedNPCs = stored[settingName] || [];

    setting.npcs.forEach(npc => {
      // Skip if already migrated AND has an ID (fully processed)
      if (npc.migrated_to_shared && npc.npc_id) {
        return;
      }

      // If marked as migrated but no ID, try to sync ID from shared storage
      if (npc.migrated_to_shared && !npc.npc_id) {
        const existingNPC = sharedNPCs.find(n =>
          n.npcDescriptionPart1?.character_name === npc.name
        );
        if (existingNPC) {
          // Check both npc_id and id fields
          const existingId = existingNPC.npc_id || existingNPC.id;
          if (existingId) {
            npc.npc_id = existingId;
            migrated = true;
            return;
          } else {
            npc.migrated_to_shared = false; // Reset flag so we can re-migrate
          }
        } else {
          npc.migrated_to_shared = false; // Reset flag so we can re-migrate
        }
      }

      // Only migrate NPCs with full descriptions (read_aloud_description)
      if (npc.read_aloud_description) {
        // Check if NPC already exists in shared storage
        const existingNPC = sharedNPCs.find(n =>
          (n.npc_id && (n.npc_id === npc.npc_id || n.id === npc.npc_id)) ||
          (n.npcDescriptionPart1?.character_name === npc.name)
        );

        if (existingNPC) {
          // NPC already in shared storage - just sync ID back, don't overwrite
          // Check both npc_id and id fields (shared storage might use either)
          const existingId = existingNPC.npc_id || existingNPC.id;
          if (existingId && !npc.npc_id) {
            npc.npc_id = existingId;
            migrated = true;
          }
        } else {
          // NPC not in shared storage - save it (initial migration)
          const canonicalNPC = settingNPCToCanonical(npc, settingName);
          saveNPCToStorage(canonicalNPC, settingName);

          // Sync ID back
          if (canonicalNPC.npc_id && !npc.npc_id) {
            npc.npc_id = canonicalNPC.npc_id;
            migrated = true;
          }
        }

        // Mark as migrated so we don't overwrite on subsequent loads
        npc.migrated_to_shared = true;
        migrated = true;
      }
    });
  }

  if (migrated) {
    // Save settings after ID sync
    saveSettingsToLocalStorage();
  }

  // if (migrated) {
  //   console.log(`[MIGRATION] Extracted NPCs from setting "${settingName}" to shared NPC storage and synced IDs`);
  // }
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
  return Object.entries(overviewObject).map(([, value]) => {
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

  setting.setting_type = setting.setting_type || randomType(setting);
  setting.adjective = setting.adjective || randomAdjective(setting) || '';
  setting.place_name = setting.place_name || randomName(setting) || '';
  setting.place_lore = setting.place_lore || '';

  let nameToPass = subLocationName || setting.place_name || '';
  let parentLocationOverview = setting.place_lore || getOverviewText(setting.setting_overview) || '';

  let prompt;
  if (isNumber(sublocationIndex)) {
    prompt = sublocationOverviewPrompt(nameToPass, parentLocationOverview, subLocationDescription);
  } else {
    prompt = settingOverviewPrompt(setting.adjective, setting.setting_type, setting.place_name, setting.place_lore);
  }
  enqueueRequest('generateSetting', { operationIndex, prompt, sublocationIndex: sublocationIndex, subLocationName, adjective, setting_type });
}


// Generation functions
async function handleGenerateSetting({ operationIndex, prompt, sublocationIndex, subLocationName, adjective, setting_type, title }) {

  try {
    let parentIndex;
    if (isNumber(sublocationIndex)) {
      parentIndex = operationIndex;
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
      if (!settings.value[operationIndex].place_name) {
        settings.value[operationIndex].place_name = overview.name;
      }
      settings.value[operationIndex].setting_overview = overview;
      // Add unique IDs to NPCs from npc_list
      settings.value[operationIndex].npcs = (overview.npc_list || []).map((npc, index) => ({
        npc_id: `npc_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`,
        ...npc
      }));
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

// Random type, adjective, and name functions
function randomType(setting) {
  if (setting.place_lore !== '') return '';
  const placeTypes = Object.keys(placeAdjectives);
  return placeTypes[Math.floor(Math.random() * placeTypes.length)];
}

function randomAdjective(setting) {
  if (setting.place_lore !== '') return '';
  if (!placeAdjectives[setting.setting_type.toLowerCase()]) return '';
  return placeAdjectives[setting.setting_type.toLowerCase()][Math.floor(Math.random() * placeAdjectives[setting.setting_type.toLowerCase()].length)];
}

function randomName(setting) {
  if (setting.place_lore !== '') return '';
  if (!place_names[setting.setting_type.toLowerCase()]) return '';
  return place_names[setting.setting_type.toLowerCase()][Math.floor(Math.random() * place_names[setting.setting_type.toLowerCase()].length)];
}
</script>


<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

// Sidebar-specific styles
$active-color: #ffffff;
$hover-background-color: #f0f0f0;
$default-background-color: #e0e0e0;
$active-border-color: #007BFF;
$transition-speed: 0.3s;

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.settings-tabs {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 1rem;

  li {
    margin-bottom: 4px;

    &.active-tab {
      .setting-button {
        background-color: $active-color;
        border-left-color: $active-border-color;
      }
    }

    .setting-button {
      width: 100%;
      padding: 12px 20px;
      font-size: 1.5rem;
      text-align: left;
      background-color: $default-background-color;
      border: none;
      color: inherit;
      cursor: pointer;
      border-left: 5px solid transparent;
      transition: background-color $transition-speed, border-left-color $transition-speed;

      &:hover {
        background-color: $hover-background-color;
      }

      &:focus {
        outline: none;
        border-left-color: $active-border-color;
      }

      &.active {
        background-color: $active-color;
        border-color: $active-border-color;
      }
    }
  }
}

.copy-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

// Main content styles
.main-content {
  flex-grow: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem auto;
  max-width: 800px;

  .content-tabs {
    box-shadow: 0 4px 6px #0000001a;
    padding: 3rem;
    border-radius: 8px;
  }

  p {
    line-height: 3rem;
    margin: 0 0 25px;
  }
}

/* ========================================
 LANDING PAGE: Three-zone layout
 ======================================== */

.landing-wrapper {
  max-width: 800px;
  width: 100%;
}

/* ZONE 1: Hero header */
.hero-header {
  text-align: center;
  padding: 2rem 1rem 2.5rem;

  .brand-line {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .brand-name {
    font-size: 1.4rem;
    font-weight: 500;
    color: $cdr-color-text-secondary;
    letter-spacing: 0.02em;
  }

  .version-pill {
    display: inline-block;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 0.2rem 0.8rem;
    border-radius: 100px;
    background-color: #ededed;
    color: $cdr-color-text-secondary;

    &.premium {
      background-color: #fdf3e0;
      color: #9c6a0a;
    }
  }

  h1 {
    font-size: 3.2rem;
    line-height: 1.15;
    margin: 0 0 0.75rem;
    color: $cdr-color-text-primary;
  }

  .value-prop {
    font-size: 1.6rem;
    font-weight: 400;
    color: $cdr-color-text-secondary;
    margin: 0;
    line-height: 1.5;
  }
}

/* ZONE 2: Form card */
.form-card {
  background-color: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 2.5rem 3rem;
}

.setting-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row-identity {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
}

.form-row-lore {
  display: grid;
  grid-template-columns: 1fr;
}

/* ZONE 3: Footer meta */
.footer-meta {
  margin-top: 1.5rem;
  padding: 1rem 1.5rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  text-align: center;

  p {
    margin: 0 0 1rem 0;
    color: #6b7280;
    font-size: 1.6rem;
    line-height: 1.6;
  }

  .patreon-universal-button {
    margin-top: 0.75rem;

    a {
      text-decoration: none;
    }

    .patreon-responsive-button-wrapper {
      border-radius: 6px;
      overflow: hidden;
    }

    .patreon-responsive-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: #F96854;
      color: #fff;
      font-weight: 700;
      font-size: 0.9375rem;
      font-variant: small-caps;
      text-decoration: none;
      border-radius: 6px;
      transition: all 0.2s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      .patreon_logo {
        width: 20px;
        height: 20px;
      }

      &:hover {
        background: #e63946;
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .hero-header {
    padding: 1.5rem 0.5rem 2rem;

    h1 {
      font-size: 2.4rem;
    }
  }

  .form-card {
    padding: 1.5rem;
    border-radius: 8px;
  }

  .form-row-identity {
    grid-template-columns: 1fr;
  }
}

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

.delete-button {
  margin-top: 2rem;
}

.focus-text {
  background-color: $cdr-color-background-secondary;
  color: $cdr-color-text-secondary;
  padding: 1rem 2rem;
  font-style: italic;
}

.faction-header {
  display: block;
  font-size: 1.17em;
  margin-block-start: 1.5em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  unicode-bidi: isolate;
}

.faction-description {
  margin: 1rem .5rem;
}

.tab-skeleton {
  width: 800px;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .tab-skeleton {
    width: 100%;
  }
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

// Inline editing styles
.edit-form {
  .edit-field {
    margin-bottom: 1.5rem;
  }
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.overview-content {
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .button-group {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
}
</style>
