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

          <ParActionButton @click="copySettingsAsPlainText" variant="secondary">Copy As Plain Text</ParActionButton>
          <ParActionButton @click="copySettingsAsHtml" variant="secondary">Copy As HTML</ParActionButton>
          <ParActionButton @click="copySettingsAsMarkdown" variant="secondary">Copy As Homebrewery Markdown</ParActionButton>
          <p>Use the above buttons to copy or download all setting info into your desired format. For homebrewery go
            <cdr-link href="https://homebrewery.naturalcrit.com/new">here</cdr-link> and paste the markdown
            there. You will need to add your own pagebreaks.
          </p>
          <ParActionButton @click="deleteAllSettings" v-if="!currentlyLoading">Delete All Settings</ParActionButton>
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
            <div class="form-row-description">
              <cdr-input id="setting_description" v-model="currentSetting.setting_description" background="secondary"
                label="Describe your setting (optional)"
                placeholder="e.g. A decadent mercantile republic in decline — or leave blank for a surprise." />
            </div>
            <div class="form-row-lore">
              <cdr-input :rows="4" tag="textarea" v-model="currentSetting.place_lore" background="secondary"
                label="Setting Lore (optional)"
                placeholder="Paste in existing lore, or describe deeper history — optional.">
                <template #helper-text-bottom>
                  Already have lore? Paste it from the <cdr-link
                    href="https://cros.land/ai-powered-lore-and-timeline-generator/">Lore Generator</cdr-link> to build
                  on what you have.
                </template>
              </cdr-input>
            </div>
            <ParActionButton type="submit" :full-width="true">
              Generate Setting
            </ParActionButton>
          </form>
        </div>

        <!-- ZONE 3: Footer meta -->
        <div class="footer-meta">
          <PatreonCallout v-if="!premium" :patreon-url="patreonLoginUrl">
            <template #body>
              <p class="patreon-callout__body">Your work is saved to this browser only. Premium syncs your settings across devices.</p>
            </template>
            <template #features>
              <li>Cross-device save and load — your settings sync between browsers and devices.</li>
              <li>
                <a :href="patreonTiersUrl" target="_blank" rel="noopener">See all premium tiers and benefits on Patreon</a><span aria-hidden="true"> →</span>
              </li>
            </template>
          </PatreonCallout>
          <ParCallout v-else>
            <p>Setting data is saved on this browser. Export to a file to use on another device.</p>
            <ParActionButton @click="showDataManagerModal = true">
              Save/Load Data from a File
            </ParActionButton>
          </ParCallout>
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
      <div class="delete-setting-row" v-if="settingOverviewExists && !currentlyLoading">
        <ParActionButton variant="secondary" @click="deleteSetting(currentSettingIndex)">
          Delete Setting
        </ParActionButton>
      </div>

      <!-- Footer below content -->
      <div class="footer-meta" v-if="settingOverviewExists">
        <PatreonCallout v-if="!premium" :patreon-url="patreonLoginUrl">
          <template #body>
            <p class="patreon-callout__body">Your work is saved to this browser only. Premium syncs your settings across devices.</p>
          </template>
          <template #features>
            <li>Cross-device save and load — your settings sync between browsers and devices.</li>
            <li>
              <a :href="patreonTiersUrl" target="_blank" rel="noopener">See all premium tiers and benefits on Patreon</a><span aria-hidden="true"> →</span>
            </li>
          </template>
        </PatreonCallout>
        <ParCallout v-else>
          <p>Setting data is saved on this browser. Export to a file to use on another device.</p>
          <ParActionButton @click="showDataManagerModal = true">
            Save/Load Data from a File
          </ParActionButton>
        </ParCallout>
      </div>

      <!-- Loading branch mirrors the loaded-state Tabs wrapper exactly
           (class, width style) so the skeleton card has identical
           horizontal context to the rendered OverviewTab card. -->
      <Tabs class="content-tabs" v-if="!settingOverviewExists && currentSetting.loadingsettingOverview"
        height="auto" style="width: 100%">
        <TabPanel label="Overview">
          <SettingOverviewCardSkeleton />
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
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { ParActionButton, ParCallout } from "@/parchment";
import { ref, reactive, computed, watch, nextTick, onMounted } from 'vue'
import { CdrInput, CdrLink } from "@rei/cedar";
import {
  settingOverviewPrompt,
  sublocationOverviewPrompt,
} from "./prompts/index.mjs";
import SettingOverviewCardSkeleton from "./components/SettingOverviewCardSkeleton.vue";
import DataManagerModal from '@/components/DataManagerModal.vue';
import PatreonCallout from '@/components/PatreonCallout.vue';
import { patreonTiersUrl } from '@/util/patreon-urls.mjs';
import Tabs from '@/components/tabs/Tabs.vue';
import TabPanel from '@/components/tabs/TabPanel.vue';
import { formatSettingAsPlainText } from "@/util/formatSettingAsPlainText.mjs";
import { formatSettingAsMarkdown } from "@/util/formatSettingAsMarkdown.mjs";
import { formatSettingAsHtml } from "@/util/formatSettingAsHTML.mjs";
import { generateGptResponse } from "@/util/ai-client.mjs";
import { saveNPCToStorage, settingNPCToCanonical } from '@/util/npc-storage.mjs';
import { removeReferencesForEntity } from '@/util/reference-storage.mjs';
import { getNavigationParams } from '@/util/navigation.mjs';
import { inferSettingDimensions } from './utils/infer-setting-dimensions.mjs';
import {
  generateCharacterCandidates,
  pickRandomTension,
  getBannedTropesForGeneration,
  detectCozyMode,
  detectLowStakesTension,
} from './utils/setting-dimensions.mjs';
import { combineSettingOverview } from '@/util/combineSettingOverview.mjs';
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

// Handler for OverviewTab emit — persists edited name, epithet, and
// combined_content. The name lives both on the top-level place_name
// (sidebar source of truth) and on setting_overview.name (kept in
// sync for export utilities that read from the overview).
const onOverviewUpdated = (updatedSetting) => {
  const idx = currentSettingIndex.value;
  if (settings.value[idx]) {
    if (updatedSetting.place_name !== undefined) {
      settings.value[idx].place_name = updatedSetting.place_name;
    }
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
  setting_description: '',
  place_name: '',
  place_lore: '',
  type: null,
  character: null,
  register: null,
  userName: null,
  tension: null,
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

// Empty-slate "+ New Setting" button — creates a blank setting and
// focuses the form. Form submission runs the inference + generation
// pipeline against whatever the user typed (or nothing).
const createNewSetting = () => {
  settings.value.push(reactive(freshDefaultSetting()));
  currentSettingIndex.value = settings.value.length - 1;
  isNewSetting.value = true;
};

// Sublocation-creation: takes the stub's name/type/title plus the
// parent's register seed. The descriptive title from the stub seeds
// `place_name` so the sidebar has something to show while the AI
// generates. After generation, place_name is overwritten with the
// overview's full title.
const createSublocationSetting = ({
  parentIndex,
  subLocationName,
  setting_type,
  register,
}) => {
  const newSetting = reactive({
    ...freshDefaultSetting(),
    place_name: subLocationName || '',
    userName: subLocationName || null,
    type: setting_type || null,
    register: register || null,
    parentIndex: parentIndex,
  });
  settings.value.push(newSetting);
  currentSettingIndex.value = settings.value.length - 1;
  isNewSetting.value = true;
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

      // Consolidate legacy setting overviews into combined_content.
      // Settings generated before the field-rename pass have keys
      // like main_problem / conclusion / recent_event_* that the
      // render path no longer reads. Rather than dual-read in render
      // and exports forever, we consolidate those legacy fields into
      // a single combined_content string here, on load. Once
      // migrated, the render/export paths only need to handle two
      // shapes: (a) combined_content blob (legacy + edited), or
      // (b) the new individual-field set (fresh generations).
      migrateLegacyOverviews();
    } catch (error) {
      console.error("Failed to parse settings from local storage:", error);
    }
  }
}

function migrateLegacyOverviews() {
  let changed = false;
  for (const setting of settings.value) {
    const overview = setting.setting_overview;
    if (!overview) continue;
    if (overview.combined_content) continue;
    // A "legacy" overview is one with old keys (main_problem,
    // conclusion, recent_event_*, impactful_economic_event,
    // potential_solutions) but missing the new canonical equivalents.
    // Fresh generations have central_dynamic + present_state +
    // notable_*_facet fields — those skip migration and render
    // through the individual-field path.
    const hasNewKeys = overview.central_dynamic || overview.present_state;
    const hasLegacyKeys =
      overview.main_problem
      || overview.conclusion
      || overview.recent_event_current_ruler
      || overview.recent_event_social
      || overview.recent_event_military
      || overview.impactful_economic_event
      || overview.potential_solutions;
    if (!hasNewKeys && hasLegacyKeys) {
      overview.combined_content = combineSettingOverview(overview);
      changed = true;
    }
  }
  if (changed) saveSettingsToLocalStorage();
}

function migrateSettingNPCs(setting) {
  const settingName = setting.setting_overview?.name
    || setting.place_name
    || 'Setting NPCs';
  let migrated = false;

  if (setting.npcs) {
    // Load shared storage once. Flatten across all folders — the user
    // may have moved canonical NPCs out of the setting-named folder, and
    // the legacy id-recovery / dedup logic below shouldn't refuse to
    // find them just because they're now in a different folder.
    const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs') || '{}');
    const sharedNPCs = Object.values(stored)
      .filter(Array.isArray)
      .flat();

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
          const existingId = existingNPC.npc_id;
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
          (n.npc_id && n.npc_id === npc.npc_id) ||
          (n.npcDescriptionPart1?.character_name === npc.name)
        );

        if (existingNPC) {
          // NPC already in shared storage - just sync ID back, don't overwrite
          // Check both npc_id and id fields (shared storage might use either)
          const existingId = existingNPC.npc_id;
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



// Validation and utility functions
// Validator for the full setting overview response. Required keys
// are the structural pillars — the response is rejected without them
// and the retry logic kicks in. The notable_*_facet fields and
// npc_list are explicitly optional by prompt design (facets are
// empty-allowed; the LLM occasionally drops npc_list and NPCs can be
// added later from the NPCs tab). Same validator for top-level
// settings and sublocations since both use the full schema.
const kingdomValidation = jsonString => {
  try {
    const jsonObj = JSON.parse(jsonString);
    const requiredKeys = [
      'name', 'title', 'overview', 'history', 'current_ruler_sentence',
      'social_history', 'economic_history', 'military_history',
      'central_dynamic', 'present_state',
    ];
    if (!requiredKeys.every(key => key in jsonObj)) return false;
    if (Array.isArray(jsonObj.npc_list)) {
      const npcKeys = ['name', 'description'];
      for (const npc of jsonObj.npc_list) {
        if (!npcKeys.every(key => key in npc)) return false;
      }
    }
    return true;
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

// Build a single random character combination (one value from each
// of 3 distinct sub-dimensions). Used for sublocations, where the
// register is seeded from the parent and we just need a coherent
// character set without spending an inference call.
function rollCharacter() {
  return generateCharacterCandidates(1)[0];
}

async function generateSetting(payload = {}) {
  const { sublocationIndex, subLocationName, subLocationDescription, setting_type } = payload;
  const operationIndex = currentSettingIndex.value;
  const setting = settings.value[operationIndex];

  const isSublocation = isNumber(sublocationIndex);

  if (isSublocation) {
    // Parent register propagates as a seed; type/userName come from
    // the stub. Character and tension are code-picked from their
    // pools (no inference call for sublocations — the description
    // and parent context provide plenty of anchoring).
    const parentRegister = setting.register || null;
    const parentName = setting.place_name || '';
    const parentLore = setting.place_lore || getOverviewText(setting.setting_overview) || '';
    const character = rollCharacter();
    const tension = pickRandomTension();
    const bannedTropes = getBannedTropesForGeneration();

    // Diagnostic: log dimensions being sent to the main prompt so
    // distribution can be checked empirically across a batch of
    // generations. Remove once verified.
    console.log('[setting-gen][sublocation]', {
      type: setting_type || null,
      character,
      register: parentRegister,
      userName: subLocationName || null,
      tension,
      bannedTropeCount: bannedTropes.length,
      parentName,
    });

    const prompt = sublocationOverviewPrompt({
      type: setting_type || null,
      character,
      register: parentRegister,
      userName: subLocationName || null,
      tension,
      bannedTropes,
      parentName,
      parentLore,
      subLocationDescription: subLocationDescription || '',
    });

    enqueueRequest('generateSetting', {
      operationIndex,
      prompt,
      sublocationIndex,
      subLocationName,
      setting_type,
      register: parentRegister,
      character,
      tension,
    });
    return;
  }

  // Top-level: run the inference call to extract type/character/
  // register/userName from user input (or roll from pools when input
  // is empty), then call the single main prompt with fully-specified
  // dimensions. Single-call is coherent by construction — every
  // field is generated in one context window so internal facts cohere.
  // (We tried a two-phase variant for perceived-latency wins; it
  // introduced subtle continuity drift between phases that wasn't
  // worth the wall-clock improvement.)
  setting.loadingsettingOverview = true;
  currentlyLoading.value = true;

  const description = setting.setting_description || '';
  const lore = setting.place_lore || '';

  let inferred;
  try {
    inferred = await inferSettingDimensions({ description, lore });
  } catch (e) {
    console.error('Setting dimension inference failed:', e);
    inferred = { type: null, character: null, register: null, userName: null, tension: null };
  }

  // Tension override layer: user tonal signals take precedence over
  // the rolled tension. Order matters — cozy is the strongest signal
  // ("no tension at all"), so it wins. Low-stakes signals (sacred,
  // festive, wondrous, scholarly, hospitable, generational) route to
  // a specific lower-stakes tension that has some texture but
  // bounded stakes. If neither override fires, the rolled tension
  // stands.
  if (detectCozyMode(description, lore)) {
    inferred.tension = 'cozy-routine';
  } else {
    const lowStakesTension = detectLowStakesTension(description, lore);
    if (lowStakesTension) {
      inferred.tension = lowStakesTension;
    }
  }

  // Persist the dimensional metadata so sublocations can inherit
  // register, and so reloads preserve the constraints.
  setting.type = inferred.type;
  setting.character = inferred.character;
  setting.register = inferred.register;
  setting.userName = inferred.userName;
  setting.tension = inferred.tension;

  const bannedTropes = getBannedTropesForGeneration();

  console.log('[setting-gen][top-level]', {
    type: inferred.type,
    character: inferred.character,
    register: inferred.register,
    userName: inferred.userName,
    tension: inferred.tension,
    bannedTropeCount: bannedTropes.length,
    descriptionLength: description.length,
    loreLength: lore.length,
  });

  const prompt = settingOverviewPrompt({
    type: inferred.type,
    character: inferred.character,
    register: inferred.register,
    userName: inferred.userName,
    tension: inferred.tension,
    bannedTropes,
    description,
    lore,
  });

  enqueueRequest('generateSetting', { operationIndex, prompt });
}


// Generation functions
async function handleGenerateSetting({ operationIndex, prompt, sublocationIndex, subLocationName, setting_type, register, character, tension }) {

  try {
    let parentIndex;
    if (isNumber(sublocationIndex)) {
      parentIndex = operationIndex;
      createSublocationSetting({
        parentIndex,
        subLocationName,
        setting_type,
        register,
      });
      operationIndex = settings.value.length - 1;
      // Stash the rolled character + tension on the sublocation
      // setting so reloads preserve the dimensional metadata.
      if (character) {
        settings.value[operationIndex].character = character;
      }
      if (tension) {
        settings.value[operationIndex].tension = tension;
      }
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
      // place_name holds the bare name (used in sidebar/lists);
      // setting_overview.title holds the short evocative phrase
      // that renders as a subordinate subtitle in the overview
      // header.
      if (overview.name) {
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
  /* Match NPCGenerator's content area width (940px) so the parchment
     card surface gets the same canvas — narrower (800px) was clamping
     the card body well inside the 65ch readability target. */
  max-width: 940px;

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
  /* Visual chrome (text-align, background, border, radius) removed during
     PatreonCallout migration — the callout owns its own surface treatment.
     Layout properties (margin, padding) preserved. */
  margin-top: 1.5rem;
  padding: 0;

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

/* Setting-level destructive action — right-aligned in its own row so
   it pairs with the trailing edge of the tab area instead of floating
   orphaned. Uses ParActionButton secondary variant (faded slate ghost)
   so a permanent action doesn't compete for attention. */
.delete-setting-row {
  width: 100%;
  display: flex;
  justify-content: flex-end;
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
