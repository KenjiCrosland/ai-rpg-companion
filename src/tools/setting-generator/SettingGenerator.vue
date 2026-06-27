<template>
  <GeneratorLayout :premium="premium" :flexible-sidebar="true" :show-footer="false">
    <template #sidebar>
      <div class="sidebar-content parchment">
        <ul class="settings-tabs">
          <!-- Collapsible tree: every node renders at its depth as a
               (chevron-or-spacer) + label row. Branches stay collapsed
               by default; auto-expand reveals the path to the
               currently-selected setting; manual toggles persist for
               the session. -->
          <li v-for="setting in visibleSidebarSettings"
            :key="setting.id || setting.originalIndex"
            :class="['setting-tree-item', { 'active-tab': currentSettingIndex === setting.originalIndex }]">
            <div class="setting-tree-row" :style="{ paddingLeft: `${setting.depth * 16}px` }">
              <button v-if="setting.hasChildren"
                type="button"
                class="setting-tree-chevron"
                :class="{ 'is-expanded': setting.isExpanded }"
                :aria-label="setting.isExpanded
                  ? `Collapse ${setting.place_name || 'Unnamed Setting'}`
                  : `Expand ${setting.place_name || 'Unnamed Setting'}`"
                :aria-expanded="setting.isExpanded ? 'true' : 'false'"
                @click.stop="toggleExpanded(setting.id)">
                <svg class="setting-tree-chevron-glyph" viewBox="0 0 10 10" width="9" height="9" aria-hidden="true">
                  <polygon points="2,1 8,5 2,9" fill="currentColor" />
                </svg>
              </button>
              <span v-else class="setting-tree-chevron-spacer" aria-hidden="true"></span>
              <button class="setting-tree-label" @click="selectSetting(setting.originalIndex)">
                {{ setting.place_name || 'Unnamed Setting' }}
              </button>
            </div>
          </li>
        </ul>

        <SidebarFooter
          v-if="!currentlyLoadingOverview && !currentlyLoading"
          new-label="+ New setting"
          data-description="Save your library to a file or restore from a backup. Your data stays on your device."
          backup-label="Backup / Restore library"
          delete-all-label="Delete all settings"
          confirm-title="Delete all settings?"
          confirm-body="This will permanently delete every saved setting in your library. This action cannot be undone."
          confirm-suggestion="Consider backing up your library first if you might want to restore these later."
          confirm-cta="Delete all settings"
          @new="createNewSetting"
          @open-data-manager="showDataManagerModal = true"
          @delete-all="deleteAllSettings"
        />
      </div>

      <DataManagerModal :opened="showDataManagerModal" @update:opened="showDataManagerModal = $event" :premium="premium"
        currentApp="gameSettings" />
    </template>

    <div class="main-content">
      <div class="landing-wrapper" v-show="!settingOverviewExists && !currentSetting.loadingsettingOverview">
        <!-- ZONE 1: Hero header (lapis editorial register) -->
        <div class="hero-header parchment">
          <div class="brand-line">
            <span class="brand-name">Kenji's Setting Generator</span>
            <!-- Version pill is fresh-visit framing — suppressed during
                 seeded flows where the user is mid-task. Mirrors the
                 NPC and dungeon generators. -->
            <VersionBadge v-if="!isSeededFlow" :premium="premium" />
          </div>
          <template v-if="isSeededFlow">
            <h1 class="page-heading__title">
              Create setting<template v-if="seedStubName">: {{ seedStubName }}</template>
            </h1>
            <p class="page-heading__tagline">
              From your {{ seededSourceType }}
              <a href="#" class="seed-source-link" @click.prevent="navigateBackToSeedSource">{{ seededSourceName }}</a>
            </p>
          </template>
          <template v-else>
            <h1 class="page-heading__title">Generate rich RPG settings with factions, NPCs &amp; quests</h1>
            <p class="page-heading__tagline">From a single name to a fully detailed kingdom, town or empire with nested
              locations, political factions, and quest hooks.</p>
          </template>
        </div>

        <!-- ZONE 2: Form card — lifted cream surface, lapis "magic UI" -->
        <div class="form-card parchment paper-grain">
          <SeededFromBanner
            :source-type="seededSourceType"
            :source-name="seededSourceName"
          />
          <form @submit.prevent="generateSetting" class="setting-form">
            <ParField label="Describe your setting" :optional="true">
              <ParInput id="setting_description" v-model="currentSetting.setting_description"
                placeholder="e.g. A decadent mercantile republic in decline — or leave blank for a surprise." />
            </ParField>
            <ParField label="Setting lore" :optional="true">
              <ParTextarea :rows="4" v-model="currentSetting.place_lore"
                placeholder="Paste in existing lore, or describe deeper history — optional." />
              <template #hint>
                Already have lore? Paste it from the <cdr-link
                  href="https://cros.land/ai-powered-lore-and-timeline-generator/">Lore Generator</cdr-link> to build on
                what you have.
              </template>
            </ParField>
            <ParButton type="submit" :full-width="true" data-testid="generate-setting">
              Generate setting
            </ParButton>
          </form>
        </div>

        <!-- ZONE 3: Footer meta (free users only — premium's backup/restore
             lives in the sidebar footer's Data options). -->
        <div class="footer-meta" v-if="!premium">
          <PatreonCallout :patreon-url="patreonLoginUrl" location="setting-footer">
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
        </div>
      </div>
      <!-- Tab strip (ParTabs) + bare panels — no card surface around the
           content; the tab components own their own cards (matches the Item
           Generator). Also covers the overview-loading skeleton state. -->
      <div v-if="settingOverviewExists || currentSetting.loadingsettingOverview" class="setting-tabs paper-grain" data-testid="setting-output">
        <ParTabs :tabs="settingTabs" v-model:active-id="activeTabId" />
        <div
          :id="`par-tabs-panel-${activeTabId}`"
          role="tabpanel"
          :aria-labelledby="`par-tabs-tab-${activeTabId}`"
          tabindex="0"
          class="setting-tab-panel"
        >
          <SettingOverviewCardSkeleton v-if="!settingOverviewExists && currentSetting.loadingsettingOverview" />
          <template v-else>
            <OverviewTab v-if="activeTabId === 'overview'" :setting="currentSetting" :premium="premium"
              @updated-setting="onOverviewUpdated" />
            <LocationsTab v-else-if="activeTabId === 'locations'" :setting="currentSetting" :all-settings="settings"
              :premium="premium" @updated-setting="onLocationsUpdated" @generate-sublocation="generateSetting"
              @delete-sublocation-setting="deleteSetting" @promote-related-place="onPromoteRelatedPlace" />
            <FactionsTab v-else-if="activeTabId === 'factions'" :setting="currentSetting" :premium="premium"
              @updated-setting="onFactionsUpdated" />
            <NPCsTab v-else-if="activeTabId === 'npcs'" :setting="currentSetting" :premium="premium"
              @updated-setting="onNPCsUpdated" />
            <QuestHooksTab v-else-if="activeTabId === 'quest-hooks'" :setting="currentSetting" :premium="premium"
              @updated-setting="onQuestHooksUpdated" />
          </template>
        </div>
      </div>
      <SettingOperations
        v-if="settingOverviewExists && !currentlyLoading"
        :settings-tree="currentSettingSubtree"
        :loading="currentlyLoading"
        @delete-setting="deleteSetting(currentSetting.id)"
      />

      <!-- Footer below content (free users only). -->
      <div class="footer-meta" v-if="settingOverviewExists && !premium">
        <PatreonCallout :patreon-url="patreonLoginUrl" location="setting-footer">
          <template #body>
            <p class="patreon-callout__body">Your work is saved to this browser only. Premium syncs your settings across devices.</p>
          </template>
          <template #features>
            <li>Cross-device save and load — your settings sync between browsers and devices.</li>
            <li>Unlimited cross-tool generation — promote items into full settings and dungeons without the 5/day free-tier cap.</li>
            <li>
              <a :href="patreonTiersUrl" target="_blank" rel="noopener">See all premium tiers and benefits on Patreon</a><span aria-hidden="true"> →</span>
            </li>
          </template>
        </PatreonCallout>
      </div>

    </div>

    <ParConfirm
      :opened="pendingSettingDelete !== null"
      title="Delete this setting?"
      confirm-label="Delete setting"
      cancel-label="Cancel"
      :destructive="true"
      @confirm="performSettingDelete"
      @cancel="pendingSettingDelete = null"
    >
      Deleting this setting removes it and re-parents its children. This can't be undone.
    </ParConfirm>
  </GeneratorLayout>
</template>

<script setup>
import { ParButton, ParField, ParInput, ParTextarea, ParTabs, ParConfirm } from "@/parchment";
import SidebarFooter from '@/components/SidebarFooter.vue';
import { ref, reactive, computed, watch, nextTick, onMounted } from 'vue'
import { CdrInput, CdrLink } from "@rei/cedar";
import {
  settingOverviewPrompt,
  sublocationOverviewPrompt,
  placeOverviewPrompt,
  validatePlaceOverviewResponse,
  landscapeOverviewPrompt,
  validateLandscapeOverviewResponse,
} from "./prompts/index.mjs";
import SettingOverviewCardSkeleton from "./components/SettingOverviewCardSkeleton.vue";
import DataManagerModal from '@/components/DataManagerModal.vue';
import SeededFromBanner from '@/components/SeededFromBanner.vue';
import { logger } from '@/util/logger.mjs';
import PatreonCallout from '@/components/PatreonCallout.vue';
import { patreonTiersUrl } from '@/util/patreon-urls.mjs';
import { generateGptResponse } from "@/util/ai-client.mjs";
import { saveNPCToStorage, settingNPCToCanonical } from '@/util/npc-storage.mjs';
import { removeReferencesForEntity } from '@/util/reference-storage.mjs';
import { sweepOrphanReferences } from '@/util/sweep-orphan-references.mjs';
import { getNavigationParams, navigateToTool } from '@/util/navigation.mjs';
import { loadSeededInput, addReferenceForSeed, sourceExists } from '@/util/seeded-input.mjs';
import { trackEvent } from '@/util/analytics.mjs';
import { buildSettingPrefillFromItem } from '@/prompts/item-setting-prompts.mjs';
import {
  linkSettingToItemStub,
  resetItemStubsForDeletedSetting,
  findItemStubMatchingName,
  addSettingStubToItem,
  reconcileNPCStubsAgainstItem,
} from '@/util/item-storage.mjs';
import { getSettingById, mergeRelatedPlaces, auntUncleNamesFor } from '@/util/setting-storage.mjs';
import { consolidateOverviewToMarkdown } from '@/util/renderSettingOverview.mjs';
import { inferSettingDimensions } from './utils/infer-setting-dimensions.mjs';
import {
  generateCharacterCandidates,
  pickRandomTension,
  getBannedTropesForGeneration,
  detectCozyMode,
  detectLowStakesTension,
} from './utils/setting-dimensions.mjs';
import { applyInheritanceFromSiblings } from './utils/inheritance.mjs';
import { extractRelatedPlaces } from './utils/extract-related-places.mjs';
import {
  sortUnnamedToBottom,
  siblingIdsToReparent,
  flattenVisibleSettings,
  expandPathToSetting,
} from './utils/sidebar-tree.mjs';
import { combineSettingOverview } from '@/util/combineSettingOverview.mjs';
import '@rei/cedar/dist/style/cdr-link.css';
import '@rei/cedar/dist/style/cdr-list.css';
import '@rei/cedar/dist/style/cdr-popover.css';
import QuestHooksTab from './components/tabs/QuestHooksTab.vue';
import OverviewTab from './components/tabs/OverviewTab.vue';
import FactionsTab from './components/tabs/FactionsTab.vue';
import SettingOperations from './components/SettingOperations.vue';
import { canGenerateCrossTool } from '@/util/can-generate-cross-tool.mjs';
import LocationsTab from './components/tabs/LocationsTab.vue';
import NPCsTab from './components/tabs/NPCsTab.vue';
import GeneratorLayout from '@/components/GeneratorLayout.vue';
import VersionBadge from '@/components/VersionBadge.vue';

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
    // LocationsTab also emits this handler when a related-place stub is
    // removed (the X on a NEIGHBORS/sub-location card). Persist that too —
    // dropping it here is why the remove appeared to do nothing.
    if (updatedSetting.related_places !== undefined) {
      settings.value[idx].related_places = updatedSetting.related_places;
    }
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

function deleteAllSettings() {
  settings.value = [reactive(freshDefaultSetting())];
  currentSettingIndex.value = 0;
  saveSettingsToLocalStorage();
  // Drop cross-tool edges pointing at the now-deleted settings. Runs after
  // the store is saved so the sweep sees them as gone.
  sweepOrphanReferences();
  showDataManagerModal.value = false;
}

function isNumber(value) {
  return typeof value === 'number';
}
const currentlyLoading = ref(false);
const currentSettingIndex = ref(0);
// ParTabs strip: { id, label } pairs + the active id (v-model). Replaces the
// old numeric activeTabIndex with the Tabs component.
const settingTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'locations', label: 'Locations' },
  { id: 'factions', label: 'Factions' },
  { id: 'npcs', label: 'NPCs' },
  { id: 'quest-hooks', label: 'Quest Hooks' },
];
const activeTabId = ref('overview');
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
  parentId: null,
  loadingFactions: false,
  loadingSubLocations: false,
  loadingsettingOverview: false,
});

function freshDefaultSetting() {
  return { ...defaultSetting, id: makeSettingId() };
}

const settings = ref([reactive(freshDefaultSetting())]);
const currentSetting = computed(() => settings.value[currentSettingIndex.value] || reactive({ ...defaultSetting }));

// Pending cross-tool seed (e.g., from an item card's "Create Setting"
// action). Held from mount until the post-generation finalize writes
// the back-link onto the source-tool's stub.
const pendingSeed = ref(null);

// Seeded-from affordances for the form-card banner. Mirror the dungeon
// generator's `seededFromItem` shape so SeededFromBanner can render the
// same "Generating from item: [name]" affirmation above the form fields.
// Banner self-hides when either field is empty, so no extra v-if needed.
const seededSourceType = computed(() => pendingSeed.value?.source?.type || '');
const seededSourceName = computed(
  () => pendingSeed.value?.source?.name || pendingSeed.value?.source?.id || ''
);

// Seeded landing-page heading. Fires whenever a SeededInput exists,
// matching the dungeon generator's gate. The current item-side UI only
// surfaces stub-based "Create Setting" navigation (so entities[0].name
// is always populated here), but relaxing the gate keeps the behavior
// symmetric with the dungeon flow and future-proof if a "Generate a
// Setting from this Item" whole-item path is added later. The h1
// conditionally includes the stub name when present.
const isSeededFlow = computed(() => !!pendingSeed.value?.source);
const seedStubName = computed(() => pendingSeed.value?.entities?.[0]?.name || '');

function navigateBackToSeedSource() {
  const source = pendingSeed.value?.source;
  if (!source) return;
  if (source.type === 'item') {
    navigateToTool('item-generator', { item: source.id });
  }
  // Setting/dungeon back-navigation can be added when those source flows ship.
}

onMounted(async () => {
  // Reset to a clean state before loading. Defends against test-time
  // module re-mount where module-level state can leak between component
  // instances; in production this is a no-op since the component
  // mounts once per page load.
  settings.value = [reactive(freshDefaultSetting())];
  currentSettingIndex.value = 0;

  loadSettingsFromLocalStorage();

  const params = getNavigationParams();

  // Deep-link: NPC Generator → setting NPCs tab. Select the named
  // setting and switch to its NPCs tab.
  if (params.source && params.tab === 'npcs') {
    const settingIndex = settings.value.findIndex(s =>
      s.place_name === params.source
    );
    if (settingIndex !== -1) {
      currentSettingIndex.value = settingIndex;
      await nextTick();
      await nextTick();
      activeTabId.value = 'npcs';
    }
    return;
  }

  // Deep-link: Item Generator → "View in Setting Generator" for a
  // promoted stub. Select that setting by id.
  if (params.setting) {
    const settingIndex = settings.value.findIndex(s => s.id === params.setting);
    if (settingIndex !== -1) {
      currentSettingIndex.value = settingIndex;
    }
    return;
  }

  // Cross-tool seed: Item Generator → "Create Setting" from a stub.
  // Push a fresh blank setting (so the landing form is visible),
  // prefill setting_description from the seed, and remember the seed
  // so the post-generation hook writes the cross-tool back-link.
  if (params.fromType && params.fromId) {
    const seed = loadSeededInput({
      fromType: params.fromType,
      fromId: params.fromId,
      entityName: params.entityName,
      destinationType: 'setting',
    });
    if (seed) {
      const prefill = buildSettingPrefillFromItem(seed);
      createNewSetting();
      if (prefill) {
        settings.value[currentSettingIndex.value].setting_description = prefill;
      }
      pendingSeed.value = seed;
      return;
    }
  }

  // Default: land on the form, not on someone's existing setting. If
  // the user has saved settings, loadSettingsFromLocalStorage put us on
  // the first one (parchment card view, no form). Push a fresh blank
  // and switch to it so the landing experience is "ready to generate"
  // for both new and returning users. The sidebar still shows every
  // saved setting; clicking one switches to its card view as before.
  //
  // Gate on localStorage rather than settings.value — settings.value is
  // module-level, so test state leaks across mounts; localStorage is
  // authoritative for "has this user saved a setting before."
  if (localStorage.getItem('gameSettings')) {
    createNewSetting();
  }
});

/**
 * Finalize a pending cross-tool seed after the destination setting has
 * been generated and saved. Writes:
 *   1. The promotion edge (setting → inspired_by_item → item) via the
 *      shared substrate.
 *   2. The source-side back-link (`setting_id` onto the item's
 *      related_settings stub) so the item card flips from "Create
 *      Setting" to "View in Setting Generator" without a refresh.
 *
 * No-op if no seed is pending or the setting has no id yet.
 */
function finalizePendingSeed(setting) {
  const seed = pendingSeed.value;
  if (!seed || !setting?.id) return;

  addReferenceForSeed(seed, {
    type: 'setting',
    id: setting.id,
    name: setting.place_name || 'Unnamed Setting',
  });

  const stubName = seed.entities?.[0]?.name;
  if (stubName) {
    linkSettingToItemStub(seed.source.id, stubName, setting.id);
  }

  // Denormalize source provenance onto the setting record so the
  // OverviewTab can render "Inspired by [source]" without walking
  // tool-references on every render. Mirrors the NPC pattern's
  // sourceType / sourceId / sourceName fields.
  setting.sourceType = seed.source.type;
  setting.sourceId = seed.source.id;
  setting.sourceName = seed.source.name;

  // Analytics: a seeded generation completed — closes the cross_tool_start
  // funnel. Only the provenance flag (not the setting tool's full usability).
  trackEvent('generate', { tool: 'setting-generator', seeded: true, seed_source: seed.source.type });

  pendingSeed.value = null;
}
const settingsTree = computed(() => {
  let tree = [];
  // Tree-build walks the flat settings array twice: once to seed
  // wrapper nodes keyed by id, then again to attach each node to its
  // parent (or to the top-level tree array if parentId is null /
  // unresolvable). Index-keyed lookup was the old way; id-keyed lookup
  // is what survives delete operations without reindex.
  const settingsById = new Map();
  settings.value.forEach((setting, index) => {
    if (!setting?.id) return;
    settingsById.set(setting.id, { ...setting, children: [], originalIndex: index });
  });

  settings.value.forEach((setting) => {
    if (!setting?.id) return;
    const node = settingsById.get(setting.id);
    if (!node) return;
    const parentId = setting.parentId ?? null;
    const parentNode = parentId ? settingsById.get(parentId) : null;
    if (parentNode) {
      parentNode.children.push(node);
    } else {
      // Top-level: parentId is null, OR parentId points at a setting
      // that no longer exists (orphaned by some upstream operation —
      // promote to top-level rather than dropping silently).
      tree.push(node);
    }
  });

  // Sort each tree level so settings without a place_name fall to the
  // bottom. Keeps the in-progress draft (the "show form by default"
  // blank that gets pushed at mount) from sitting above the user's
  // named settings in the sidebar. Stable within each bucket so named
  // settings keep their insertion order.
  sortUnnamedToBottom(tree);

  return tree;
});

/**
 * Walk the settings tree to find a node by id. Used to extract the
 * current setting's sub-tree (active node + descendants) for the
 * export panel — the user expects "export this setting" to mean the
 * setting they're viewing plus its sub-locations, not the entire
 * workspace of sibling regions.
 */
function findNodeById(tree, id) {
  for (const node of tree) {
    if (node.id === id) return node;
    const found = findNodeById(node.children || [], id);
    if (found) return found;
  }
  return null;
}

const currentSettingSubtree = computed(() => {
  const id = currentSetting.value?.id;
  if (!id) return [];
  const node = findNodeById(settingsTree.value, id);
  return node ? [node] : [];
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

// Sidebar tree expansion state. Sub-trees stay collapsed by default;
// the user toggles open the branches they're working in. Persisted to
// sessionStorage so the layout survives an in-tab reload but resets
// on a fresh tab (sessionStorage felt right — across-tab persistence
// would surprise a user opening a new tab to a different campaign).
//
// Auto-expand: a watcher below opens the ancestor path whenever
// currentSettingIndex changes, so navigating to a deep node (via
// click, link, or newly-promoted sublocation auto-selection) reveals
// the path without the user hunting.
const EXPANSION_STORAGE_KEY = 'setting-sidebar-expanded';

function loadExpandedSettingIds() {
  if (typeof window === 'undefined' || !window.sessionStorage) return new Set();
  try {
    const raw = window.sessionStorage.getItem(EXPANSION_STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr.filter(x => typeof x === 'string') : []);
  } catch {
    return new Set();
  }
}

const expandedSettingIds = ref(loadExpandedSettingIds());

function persistExpansion() {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  try {
    window.sessionStorage.setItem(
      EXPANSION_STORAGE_KEY,
      JSON.stringify([...expandedSettingIds.value]),
    );
  } catch {
    // sessionStorage full or disabled — silent. Expansion state lives
    // in memory for the rest of the session either way.
  }
}

function toggleExpanded(settingId) {
  if (!settingId) return;
  const next = new Set(expandedSettingIds.value);
  if (next.has(settingId)) {
    next.delete(settingId);
  } else {
    next.add(settingId);
  }
  expandedSettingIds.value = next;
  persistExpansion();
}

// Filtered + depth-tagged list the sidebar renders. Recomputes when
// the tree shape changes OR when the user toggles a branch.
// A freshly-created setting ("+ New Setting") is a blank, unnamed, overview-
// less leaf. Like the other tools, we don't surface that in-progress draft in
// the list — it appears once it has a name or a generated overview. Nodes with
// children are always kept so the tree never orphans descendants.
const visibleSidebarSettings = computed(() =>
  flattenVisibleSettings(settingsTree.value, expandedSettingIds.value)
    .filter(s => s.hasChildren || s.place_name || s.setting_overview?.overview)
);

// Auto-expand the ancestor path to the currently-selected setting.
// Set-union semantics — never collapses a branch the user already
// opened. Runs immediate so the initial render shows the right
// branches for the persisted-or-default selection.
watch(
  () => currentSettingIndex.value,
  (newIndex) => {
    if (newIndex == null) return;
    const target = settings.value[newIndex];
    if (!target?.id) return;
    const next = expandPathToSetting(
      settings.value,
      target.id,
      expandedSettingIds.value,
    );
    // Only persist when the set actually changed; avoids a spurious
    // sessionStorage write on every selection click.
    if (next.size !== expandedSettingIds.value.size) {
      expandedSettingIds.value = next;
      persistExpansion();
    }
  },
  { immediate: true },
);

const selectSetting = (index) => {
  currentSettingIndex.value = index;
  isNewSetting.value = false;  // Not new since it's selected from existing ones
};

const updateOriginalIndices = () => {
  settings.value.forEach((setting, index) => {
    setting.originalIndex = index;  // Update originalIndex to the new index
  });
};

const pendingSettingDelete = ref(null);

const deleteSetting = (idToDelete) => {
  if (!idToDelete) return;
  pendingSettingDelete.value = idToDelete;
};

const performSettingDelete = () => {
  const idToDelete = pendingSettingDelete.value;
  pendingSettingDelete.value = null;
  if (!idToDelete) return;
  const indexToDelete = settings.value.findIndex(s => s?.id === idToDelete);
  if (indexToDelete < 0) return;

  // Capture the deleted setting's id + parentId so we can re-parent its
  // children and clean up references after removal.
  const deletedId = idToDelete;
  const deletedParentId = settings.value[indexToDelete].parentId ?? null;

  // Re-parent any direct children of the deleted setting up one level,
  // and detach any promoted-stub pointers across all settings that
  // pointed at this id. Two stub families to clean: importantLocations
  // (legacy free-invented sublocations) and related_places (extracted
  // from prose, kind-grouped). Both stubs remain in place but flip
  // back to "needs promotion" — the user keeps the textual context
  // and can re-promote later.
  settings.value.forEach((setting) => {
    if (setting?.parentId === deletedId) {
      setting.parentId = deletedParentId;
    }
    (setting?.importantLocations || []).forEach(location => {
      if (location?.promoted_setting_id === deletedId) {
        location.promoted_setting_id = null;
        location.has_detailed_description = false;
      }
    });
    (setting?.related_places || []).forEach(place => {
      if (place?.promoted_setting_id === deletedId) {
        place.promoted_setting_id = null;
      }
    });
  });

  // Remove the setting itself.
  settings.value.splice(indexToDelete, 1);

  if (deletedId) {
    // Reference-graph cleanup: drop every edge where this setting is
    // source or target (e.g., `setting → inspired_by_item → item`,
    // `npc → appears_in_setting → setting`).
    removeReferencesForEntity('setting', deletedId);
    // Source-side stub cleanup: flip every item's related_settings stub
    // that pointed at this setting back to setting_id: null, so the item
    // card's UI reverts from "View in Setting Generator" to "Create
    // Setting" instead of dangling on a dead link.
    resetItemStubsForDeletedSetting(deletedId);
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
      activeTabId.value = 'overview';  // Reset to the first tab when switching settings
    });
  }
});

// Empty-slate "+ New Setting" button — creates a blank setting and
// focuses the form. Form submission runs the inference + generation
// pipeline against whatever the user typed (or nothing).
const createNewSetting = () => {
  // Reuse an existing blank draft (no name, no overview) rather than stacking
  // another — so the button can stay visible for cross-tool consistency
  // without piling up empty settings.
  const blankIdx = settings.value.findIndex(
    s => !s.place_name && !s.setting_overview?.overview,
  );
  if (blankIdx !== -1) {
    currentSettingIndex.value = blankIdx;
    isNewSetting.value = true;
    return;
  }
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
  parentId,
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
    parentId: parentId,
  });
  settings.value.push(newSetting);
  currentSettingIndex.value = settings.value.length - 1;
  isNewSetting.value = true;
};



function saveSettingsToLocalStorage() {
  // Drop empty-draft settings (no setting_overview, not loading)
  // before persisting. The "show form by default" behavior pushes a
  // fresh blank draft into settings.value at each mount; if the user
  // never generates in it but triggers a save (e.g., deletes another
  // setting), the draft would otherwise leak into localStorage and
  // accumulate as "Unnamed Setting" sidebar entries over time.
  // Filtering both at load and at save means the leak is caught in
  // both directions: load drops anything that snuck through previously,
  // save prevents new pollution from being written.
  const filtered = filterAndReindexDraftSettings(settings.value);

  // Map over settings to adjust NPCs and remove non-serializable values
  const settingsToSave = filtered.map(setting => {
    // Drop the transient promotion marker; only matters while a
    // generation is in flight, never persisted.
    const { _pendingPromotion, ...rest } = setting;
    return {
      ...rest,
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
    };
  });

  // Serialize the modified settings to a JSON string
  const serializedSettings = JSON.stringify(settingsToSave);

  // Save the serialized string to local storage
  localStorage.setItem('gameSettings', serializedSettings);
}

/**
 * Filter out empty-draft settings and re-link orphaned references.
 *
 * The "show form by default" behavior pushes a fresh blank
 * freshDefaultSetting() onto settings.value at every mount. If the
 * user then triggers any save (via delete, edit, etc.) before
 * generating in that draft, the blank gets persisted. Repeating that
 * cycle (mount → delete → mount → delete…) leaks one "Unnamed
 * Setting" per cycle.
 *
 * Drops every setting that has no setting_overview AND isn't currently
 * mid-generation. References are by stable id (`parentId`,
 * `promoted_setting_id`), so the surviving settings keep their links
 * with no remap needed; the only fix-up is detaching pointers that
 * referenced a filtered-out id (children become top-level, promoted
 * stubs revert to "needs promotion").
 */
function filterAndReindexDraftSettings(settingsArr) {
  if (!Array.isArray(settingsArr)) return [];

  const kept = settingsArr.filter(s => !!s?.setting_overview || !!s?.loadingsettingOverview);
  const keptIds = new Set(kept.map(s => s?.id).filter(Boolean));

  return kept.map(s => ({
    ...s,
    parentId: s?.parentId && keptIds.has(s.parentId) ? s.parentId : null,
    importantLocations: (s.importantLocations || []).map(loc => ({
      ...loc,
      promoted_setting_id:
        loc?.promoted_setting_id && keptIds.has(loc.promoted_setting_id)
          ? loc.promoted_setting_id
          : null,
    })),
  }));
}

function loadSettingsFromLocalStorage() {
  const serializedSettings = localStorage.getItem('gameSettings');
  if (serializedSettings) {
    try {
      const parsedSettings = JSON.parse(serializedSettings);
      const cleaned = filterAndReindexDraftSettings(parsedSettings);
      settings.value = cleaned.map(setting => reactive(setting));

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

      // Self-heal a known regression in parent-promotion:
      // earlier versions of finalizePendingPromotion called
      // `reparentSetting` against localStorage before the new parent
      // had been persisted, so the reparent silently failed even
      // though the promoted_setting_id stub side was correctly
      // updated. Result: setting whose related_places carries a
      // `kind: 'parent'` stub with promoted_setting_id set, but the
      // setting's own parentId still null. Re-link those here.
      // Idempotent: when parentId already matches, this is a no-op.
      healParentPromotionLinks();
    } catch (error) {
      logger.error("Failed to parse settings from local storage:", error);
    }
  }
}

function healParentPromotionLinks() {
  let changed = false;
  const byId = new Map();
  const byName = new Map();
  for (const s of settings.value) {
    if (s?.id) byId.set(s.id, s);
    const nameKey = (s?.place_name || '').trim().toLowerCase();
    if (s?.id && nameKey && !byName.has(nameKey)) byName.set(nameKey, s.id);
  }
  for (const setting of settings.value) {
    if (!setting || !Array.isArray(setting.related_places)) continue;
    for (const stub of setting.related_places) {
      // (a) Back-fill promoted_setting_id when the stub's name matches
      // an existing setting in the library. Heals data created before
      // linkExistingSettingsByName ran during extraction (e.g., the
      // user already has Aethelmar as a real setting AND a stub for
      // Aethelmar with promoted_setting_id null). Skip self-matches.
      if (!stub?.promoted_setting_id) {
        const nameKey = (stub?.name || '').trim().toLowerCase();
        const existingId = nameKey ? byName.get(nameKey) : null;
        if (existingId && existingId !== setting.id) {
          stub.promoted_setting_id = existingId;
          changed = true;
        }
      }
      const promotedId = stub?.promoted_setting_id;
      if (!promotedId) continue;
      // (b) Clear pointers to settings that no longer exist (e.g., the
      // user deleted the promoted target). The stub remains; only the
      // pointer is reset, so the UI flips from "View in Setting
      // Generator" back to "Create Setting" and the user can re-promote
      // when ready.
      if (!byId.has(promotedId)) {
        stub.promoted_setting_id = null;
        changed = true;
        continue;
      }
      // (c) For kind === 'parent', also ensure setting.parentId mirrors
      // the stub's promoted_setting_id. Heals an earlier regression
      // where reparentSetting read pre-save localStorage and silently
      // failed; the stub's promoted_setting_id was set correctly but
      // setting.parentId stayed null.
      if (stub.kind === 'parent' && (setting.parentId ?? null) !== promotedId) {
        setting.parentId = promotedId;
        changed = true;
      }
    }
  }
  if (changed) saveSettingsToLocalStorage();
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
  //   logger.log(`[MIGRATION] Extracted NPCs from setting "${settingName}" to shared NPC storage and synced IDs`);
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
      logger.error("Unknown request type:", type);
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

/**
 * Render an array of canonical settings into the markdown strings the
 * setting-overview prompts expect as `siblingSettings`. Skips empties
 * (settings without an overview) so the prompt block doesn't fire on
 * placeholders. Returns an empty array if nothing renderable is found.
 */
function buildSiblingMarkdown(settingsList) {
  if (!Array.isArray(settingsList)) return [];
  const result = [];
  for (const s of settingsList) {
    if (!s?.setting_overview) continue;
    const md = consolidateOverviewToMarkdown(s.setting_overview);
    if (md && md.trim()) {
      const heading = s.place_name || s.setting_overview?.name || 'Sibling';
      result.push(`# ${heading}\n\n${md}`);
    }
  }
  return result;
}

/**
 * Collect sibling settings for a top-level generation seeded from
 * another tool's stub (e.g., item → setting). Pulls the realized
 * settings list off the pending seed and resolves each via its
 * canonical id. Filters to those with full overview content; settings
 * that haven't generated yet are skipped.
 */
function collectSeededSiblings(seed) {
  const realized = seed?.source?.realized?.settings;
  if (!Array.isArray(realized) || realized.length === 0) return [];
  const canonical = realized
    .map(s => getSettingById(s.setting_id))
    .filter(Boolean);
  return buildSiblingMarkdown(canonical);
}

/**
 * Collect sibling sublocations under a shared parent. Walks the
 * settings array for entries whose parentId matches and whose
 * place_name differs from the one being generated (excludes self).
 * Same shape as collectSeededSiblings so both feed into the same
 * `siblingSettings` prompt param.
 */
function collectSublocationSiblings(parentId, selfPlaceName) {
  if (!parentId) return [];
  const siblings = settings.value.filter((s) =>
    s?.parentId === parentId
    && s.setting_overview
    && (s.place_name || '').trim() !== (selfPlaceName || '').trim()
  );
  return buildSiblingMarkdown(siblings);
}

async function generateSetting(payload = {}) {
  const { sublocationIndex, subLocationName, subLocationDescription, setting_type } = payload;
  const operationIndex = currentSettingIndex.value;
  const setting = settings.value[operationIndex];

  const isSublocation = isNumber(sublocationIndex);

  if (isSublocation) {
    // Parent register propagates as a seed; type/userName come from
    // the stub. Character is rolled fresh by default. Tension and
    // banned tropes always roll fresh per generation.
    const parentRegister = setting.register || null;
    const parentName = setting.place_name || '';
    const parentLore = setting.place_lore || getOverviewText(setting.setting_overview) || '';

    // Sibling inheritance: if other sublocations under this parent
    // have already been generated, inherit register + character from
    // the first one (option A — broad type, all sublocations are
    // siblings regardless of setting_type). Keeps atmospheric and
    // cultural coherence across sublocations of the same parent
    // without forcing tension to homogenize.
    const parentSettingId = setting.id;
    const sublocationSiblings = settings.value.filter((s) =>
      s?.parentId === parentSettingId
      && !!s?.setting_overview
    );
    const inherited = applyInheritanceFromSiblings(
      { register: parentRegister, character: rollCharacter() },
      sublocationSiblings,
    );

    const character = inherited.character;
    const register = inherited.register;
    const tension = pickRandomTension();
    const bannedTropes = getBannedTropesForGeneration();

    // Diagnostic: log dimensions being sent to the main prompt so
    // distribution can be checked empirically across a batch of
    // generations. Remove once verified.
    logger.log('[setting-gen][sublocation]', {
      type: setting_type || null,
      character,
      register,
      userName: subLocationName || null,
      tension,
      bannedTropeCount: bannedTropes.length,
      parentName,
      siblingCount: sublocationSiblings.length,
    });

    // Sibling sublocations of the same parent — pass their full
    // overviews to the prompt so the new sublocation lands as part of
    // a coherent set (shared geography, no contradicting NPCs, etc.).
    const siblingSettings = collectSublocationSiblings(parentSettingId, subLocationName);

    // Legacy importantLocations-stub expansion stays polity-only —
    // this flow predates the place-scale split and only renders for
    // users with stale data from the deprecated bulk-generate UI.
    // New sublocations route through onPromoteRelatedPlace, which
    // does run scale-aware inference. If the legacy flow ever sees
    // place-scale demand, run inferSettingDimensions here and branch
    // exactly like the promote-related-place site does.
    const prompt = sublocationOverviewPrompt({
      type: setting_type || null,
      character,
      register,
      userName: subLocationName || null,
      tension,
      bannedTropes,
      parentName,
      parentLore,
      subLocationDescription: subLocationDescription || '',
      siblingSettings,
    });

    enqueueRequest('generateSetting', {
      operationIndex,
      parentId: parentSettingId,
      prompt,
      sublocationIndex,
      subLocationName,
      setting_type,
      register,
      character,
      tension,
    });
    return;
  }

  // Cross-tool gate: if this top-level generation is being seeded from
  // another tool (currently item → setting), check the 5/day quota
  // before any AI calls fire. Free combos (e.g., no seed at all)
  // short-circuit the gate and return true. Gate handles its own toast
  // on failure; we just bail and leave the form in place so the user
  // can come back tomorrow or upgrade.
  const seedSourceType = pendingSeed.value?.source?.type;
  if (seedSourceType) {
    const canGenerate = await canGenerateCrossTool(seedSourceType, 'setting', props.premium);
    if (!canGenerate) return;
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
    logger.error('Setting dimension inference failed:', e);
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

  // Sibling inheritance for cross-tool seeded generations: if the user
  // has already promoted other settings from the same source item,
  // inherit register + character from the first sibling so the cluster
  // reads as culturally coherent. Tension stays fresh per generation.
  // Resolve canonical sibling records via getSettingById so we read
  // the real persisted dimensions rather than the stub-level snapshot.
  const seedSiblingsRaw = pendingSeed.value?.source?.realized?.settings;
  const seedSiblingsCanonical = Array.isArray(seedSiblingsRaw)
    ? seedSiblingsRaw
        .map(stub => getSettingById(stub.setting_id))
        .filter(Boolean)
    : [];
  // Fallback chain for register when no siblings: inferred → source
  // item's detected register → null (let the prompt's pool-roll fire).
  const seedSourceRegister = pendingSeed.value?.source?.register || null;
  const seededDimensions = applyInheritanceFromSiblings(
    {
      register: inferred.register || seedSourceRegister,
      character: inferred.character,
    },
    seedSiblingsCanonical,
  );
  inferred.register = seededDimensions.register;
  inferred.character = seededDimensions.character;

  // Persist the dimensional metadata so sublocations can inherit
  // register, and so reloads preserve the constraints. Scale is
  // persisted so handleGenerateSetting picks the right validator
  // and so the renderer can branch on it without re-running inference.
  setting.type = inferred.type;
  setting.character = inferred.character;
  setting.register = inferred.register;
  setting.userName = inferred.userName;
  setting.tension = inferred.tension;
  setting.scale = inferred.scale;

  const bannedTropes = getBannedTropesForGeneration();

  logger.log('[setting-gen][top-level]', {
    type: inferred.type,
    character: inferred.character,
    register: inferred.register,
    userName: inferred.userName,
    tension: inferred.tension,
    bannedTropeCount: bannedTropes.length,
    descriptionLength: description.length,
    loreLength: lore.length,
  });

  // Sibling settings for top-level cross-tool generations: other
  // settings the user has already promoted from the same source (e.g.,
  // the same item's lore). Pass their full overviews so the new
  // generation anchors to canonical names, geography, and history
  // rather than reinventing in-conflict facts.
  const siblingSettings = collectSeededSiblings(pendingSeed.value);

  // Scale-based prompt routing. Top-level place/landscape generations
  // are rarer than polity ones (those scales usually sit inside a
  // parent) but supported — both alternate prompts handle the
  // no-parent case by describing surrounding region instead of a
  // named parent.
  const promptArgs = {
    type: inferred.type,
    character: inferred.character,
    register: inferred.register,
    userName: inferred.userName,
    tension: inferred.tension,
    bannedTropes,
    description,
    lore,
    siblingSettings,
  };
  let prompt;
  if (inferred.scale === 'place') {
    prompt = placeOverviewPrompt(promptArgs);
  } else if (inferred.scale === 'landscape') {
    prompt = landscapeOverviewPrompt(promptArgs);
  } else {
    prompt = settingOverviewPrompt(promptArgs);
  }

  enqueueRequest('generateSetting', { operationIndex, prompt });
}


/**
 * Promote a stub from `setting.related_places` into a real generated
 * setting. Dispatches on `kind`:
 *
 *   - 'sublocation': new setting sits UNDER the current setting
 *     (parentId = current.id). Uses sublocationOverviewPrompt with
 *     current as parent context.
 *   - 'sibling':     new setting sits at the SAME LEVEL as current
 *     (parentId = current.parentId). If current is top-level, the new
 *     sibling is top-level too. Uses sublocationOverviewPrompt when
 *     there's a shared parent, settingOverviewPrompt otherwise.
 *   - 'parent':      new setting takes current's slot (parentId =
 *     current.parentId). After generation succeeds, current is
 *     re-parented under the new setting.
 *
 * All three flows stamp a `_pendingPromotion` marker on the new
 * setting so handleGenerateSetting's post-success hook can finalize:
 * set `promoted_setting_id` on the source `related_places` stub, and
 * (for 'parent') perform the reparent of the source setting.
 *
 * Cross-tool source provenance (sourceType/sourceId/sourceName) is
 * inherited from the current setting so promoted siblings stay linked
 * to the same originating item.
 */
async function onPromoteRelatedPlace({ stub, kind }) {
  if (!stub || !kind) return;
  const current = settings.value[currentSettingIndex.value];
  if (!current) return;

  // Idempotent stub-presence guarantee. Two entry points feed this
  // handler: (a) extraction-promoted stubs that are already in
  // current.related_places (clicked from the Related Places list), and
  // (b) manually-created stubs synthesized by AddRelatedPlaceForm and
  // emitted without first being appended. In case (b), ensure the
  // stub lands in related_places before promotion so the
  // promoted_setting_id finalization (which looks up by name in
  // related_places) has a target. Case-insensitive name dedup so
  // extracted + manual entries don't both occupy a slot.
  //
  // A SECOND case (b) variant: the manual form may have submitted an
  // empty name — "just generate me a new sublocation of this kind."
  // In that case there's no stub to track (nothing to name in
  // related_places yet), so we skip the add. The new setting will get
  // its place_name from the LLM after generation, and won't be
  // back-linked to a related_places stub since none exists.
  if (!Array.isArray(current.related_places)) current.related_places = [];
  const stubKey = (stub.name || '').trim().toLowerCase();
  const alreadyPresent = stubKey && current.related_places.some(
    p => (p?.name || '').trim().toLowerCase() === stubKey
  );
  if (stubKey && !alreadyPresent) {
    current.related_places.unshift({
      name: stub.name,
      kind,
      source_quote: stub.source_quote || '',
      role_brief: stub.role_brief || '',
      suggested_setting_type: stub.suggested_setting_type || '',
      promoted_setting_id: null,
    });
  }

  // Determine where the new setting sits in the tree.
  const newSettingParentId = kind === 'sublocation'
    ? current.id
    : (current.parentId ?? null);

  // Parent setting that will be the prompt context (if any).
  const promptParentSetting = newSettingParentId
    ? settings.value.find(s => s?.id === newSettingParentId)
    : null;

  // Create the new setting in settings.value with the promotion marker.
  // Register/character/tension are resolved AFTER inference below — we
  // create the record with null placeholders here so the in-memory
  // entry is on the sidebar immediately, then fill in dimensions.
  const newSetting = reactive({
    ...freshDefaultSetting(),
    place_name: stub.name,
    userName: stub.name,
    type: stub.suggested_setting_type || null,
    register: null,
    parentId: newSettingParentId,
    sourceType: current.sourceType || null,
    sourceId: current.sourceId || null,
    sourceName: current.sourceName || null,
    loadingsettingOverview: true,
    _pendingPromotion: {
      sourceSettingId: current.id,
      sourceStubName: stub.name,
      kind,
    },
  });
  settings.value.push(newSetting);
  currentSettingIndex.value = settings.value.length - 1;
  isNewSetting.value = true;
  currentlyLoading.value = true;
  const operationIndex = settings.value.length - 1;

  // Run dimension inference against the stub's name + role brief.
  // This catches cases where the stub's NAME carries a clear cultural
  // signal that differs from the current setting's register (e.g.,
  // promoting "Aethelmar" as a sibling of an Italian Renaissance
  // setting — the LLM detects Anglo-Saxon from the name and overrides
  // the sibling-inheritance default).
  //
  // stub.source_quote is DELIBERATELY EXCLUDED: it's parent-setting
  // prose ("a handful of low stone houses gathered around a single
  // spring called the Weeping-Cleft"), and concatenating it into the
  // sub-location's own description contaminated type/scale
  // classification — the LLM read the parent's hamlet-shape and
  // typed the sub-location as 'hamlet', which then correctly routed
  // to polity even when the sub-location is a single spring.
  // Register signal from the source_quote is rarely needed beyond
  // what the name already carries.
  const inferenceInput = [stub.name, stub.role_brief]
    .filter(Boolean)
    .join('. ');
  let inferred = { type: null, character: null, register: null, userName: null, tension: null };
  try {
    inferred = await inferSettingDimensions({ description: inferenceInput, lore: '' });
  } catch (e) {
    logger.warn('[setting-gen][promote] dimension inference failed:', e);
  }

  // Sibling pool for inheritance fallback when inference doesn't fire.
  const candidateSiblings = settings.value.filter(s =>
    s?.id !== newSetting.id
    && (s?.parentId ?? null) === newSettingParentId
    && !!s?.setting_overview
  );

  // Register priority: inferred (name-driven) → sibling inheritance →
  // current's register. The inferred register wins whenever inference
  // detected a cultural signal in the name; otherwise siblings carry
  // the cluster's coherence; otherwise fall back to the current
  // setting's register as a last resort.
  let resolvedRegister = inferred.register;
  if (!resolvedRegister) {
    const inheritedRegister = applyInheritanceFromSiblings(
      { register: current.register || null, character: null },
      candidateSiblings,
    ).register;
    resolvedRegister = inheritedRegister || current.register || null;
  }

  // Character priority: inferred → sibling inheritance → fresh roll.
  let resolvedCharacter = inferred.character;
  if (!resolvedCharacter) {
    const inheritedCharacter = applyInheritanceFromSiblings(
      { register: null, character: rollCharacter() },
      candidateSiblings,
    ).character;
    resolvedCharacter = inheritedCharacter;
  }

  // Tension: inferred wins if it surfaced; otherwise roll fresh per
  // generation (never inherited — different tensions need their own
  // dramatic shape).
  const tension = inferred.tension || pickRandomTension();

  // Scale resolution for promoted-stub generations. The stub's
  // suggested_setting_type and its role_brief feed the inferrer; the
  // inferrer's scale judgment + the always-polity ceiling decide
  // whether this promotion routes to place / landscape / polity.
  // Defensive fallback to 'polity' so any inferrer regression doesn't
  // misroute promotions to a narrower schema.
  let resolvedScale = 'polity';
  if (inferred.scale === 'place') resolvedScale = 'place';
  else if (inferred.scale === 'landscape') resolvedScale = 'landscape';

  // Persist resolved dimensions on the new setting so reloads preserve
  // them and so handleGenerateSetting picks the right validator.
  newSetting.register = resolvedRegister;
  newSetting.character = resolvedCharacter;
  newSetting.tension = tension;
  newSetting.scale = resolvedScale;

  const bannedTropes = getBannedTropesForGeneration();
  const siblingSettings = buildSiblingMarkdown(candidateSiblings);

  // Parent-promote: collect the children-to-be (source + any siblings
  // that will cascade under the new parent). The generation prompt
  // needs to know about these so the prose treats them as contained
  // places, not as peers. Without this, the LLM reads "Aethelmar and
  // Repubblica" in the user's source-quote / role-brief and assumes
  // they're external neighbors.
  let childrenSettings = [];
  if (kind === 'parent') {
    const sourceOldParentId = current.parentId ?? null;
    const cascadeIds = siblingIdsToReparent({
      settings: settings.value,
      source: current,
      oldParentId: sourceOldParentId,
    });
    const childrenToBe = [current, ...cascadeIds
      .map(id => settings.value.find(s => s?.id === id))
      .filter(Boolean)];
    childrenSettings = buildSiblingMarkdown(childrenToBe);
  }

  // Build a stub-aware description that anchors the LLM to the prose
  // origin: where this place was named, why it matters, the verbatim
  // quote so the generation stays consistent with current's narrative.
  //
  // When the stub has no name (the manual form was submitted blank to
  // request a "surprise me with a new sublocation"), the relationship
  // framing alone carries the description — the LLM picks the name and
  // shape from the kind + parent context + register.
  const descriptionLines = [];
  if (stub.name) descriptionLines.push(`Name: ${stub.name}`);
  if (stub.role_brief) descriptionLines.push(`Role: ${stub.role_brief}.`);
  if (kind === 'parent') {
    descriptionLines.push(`This is the larger place that contains ${current.place_name || 'the current setting'}.`);
  } else if (kind === 'sibling') {
    descriptionLines.push(`This is a peer of ${current.place_name || 'the current setting'} at similar scale.`);
  } else if (kind === 'sublocation' && !stub.name && !stub.role_brief) {
    // Empty-stub sublocation — make the relationship explicit since
    // there's no other signal in the description.
    descriptionLines.push(`This is a new place INSIDE ${current.place_name || 'the current setting'}. Invent it fresh from the parent's character and register.`);
  }
  if (stub.source_quote) {
    descriptionLines.push('');
    descriptionLines.push(`Where this place appears in the prose of ${current.place_name || 'the current setting'}:`);
    descriptionLines.push(stub.source_quote);
  }
  const description = descriptionLines.join('\n');

  // userName: pass through whatever the user typed (or null when blank
  // so the prompt's "Generate a register-coherent bare name" branch
  // fires instead of the "use this name verbatim" branch).
  const userName = stub.name || null;

  // Scale-aware prompt routing. Place/landscape promotions go through
  // their dedicated prompts regardless of whether the stub has a
  // parent — both prompts handle parented and unparented cases.
  // Polity-scale promotions branch on parent presence as before:
  // sublocation for parented, top-level for unparented.
  const stubBasedPromptArgs = {
    type: stub.suggested_setting_type || null,
    character: resolvedCharacter,
    register: resolvedRegister,
    userName,
    tension,
    bannedTropes,
    description,
    lore: '',
    parentName: promptParentSetting?.place_name || '',
    parentLore: promptParentSetting
      ? (promptParentSetting.place_lore
        || getOverviewText(promptParentSetting.setting_overview)
        || '')
      : '',
    siblingSettings,
    childrenSettings,
  };
  let prompt;
  if (resolvedScale === 'place') {
    prompt = placeOverviewPrompt(stubBasedPromptArgs);
  } else if (resolvedScale === 'landscape') {
    prompt = landscapeOverviewPrompt(stubBasedPromptArgs);
  } else if (promptParentSetting) {
    prompt = sublocationOverviewPrompt({
      type: stub.suggested_setting_type || null,
      character: resolvedCharacter,
      register: resolvedRegister,
      userName,
      tension,
      bannedTropes,
      parentName: promptParentSetting.place_name || '',
      parentLore: promptParentSetting.place_lore
        || getOverviewText(promptParentSetting.setting_overview)
        || '',
      subLocationDescription: description,
      siblingSettings,
      childrenSettings,
    });
  } else {
    prompt = settingOverviewPrompt({
      type: stub.suggested_setting_type || null,
      character: resolvedCharacter,
      register: resolvedRegister,
      userName,
      tension,
      bannedTropes,
      description,
      lore: '',
      siblingSettings,
      childrenSettings,
    });
  }

  logger.log('[setting-gen][promote]', {
    kind,
    stubName: stub.name,
    inferredRegister: inferred.register,
    resolvedRegister,
    inferredCharacter: inferred.character,
    resolvedCharacter,
    fromCurrentRegister: current.register,
  });

  enqueueRequest('generateSetting', { operationIndex, prompt });
}

// Generation functions
async function handleGenerateSetting({ operationIndex, parentId, prompt, sublocationIndex, subLocationName, setting_type, register, character, tension }) {

  try {
    const isSublocation = isNumber(sublocationIndex);
    if (isSublocation) {
      createSublocationSetting({
        parentId,
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
    // Resolve the parent (by stable id) once, so all stub writes go
    // through the same reference. If the parent was deleted mid-flight
    // (rare), the stub writes simply no-op.
    const parentSetting = isSublocation && parentId
      ? settings.value.find(s => s?.id === parentId)
      : null;
    if (parentSetting && parentSetting.importantLocations?.[sublocationIndex]) {
      parentSetting.importantLocations[sublocationIndex].loading = true;
    }
    // Pick the validator that matches the prompt's schema. Each scale
    // produces a different field shape; running the wrong validator
    // would fail every retry. The scale comes from the persisted
    // setting (set earlier in the flow when inference resolved scale),
    // with a defensive fallback to polity for legacy settings that
    // pre-date the scale splits.
    const persistedScale = settings.value[operationIndex]?.scale;
    let validator;
    if (persistedScale === 'place') {
      validator = validatePlaceOverviewResponse;
    } else if (persistedScale === 'landscape') {
      validator = validateLandscapeOverviewResponse;
    } else {
      validator = kingdomValidation;
    }
    const response = await generateGptResponse(prompt, validator);
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

      // Cross-tool stub dedup: when this setting is item-seeded, stamp
      // `seeded_from` on any stub whose name matches one of the source
      // item's `related_npcs`. The substrate's writeBack chain treats
      // both ends as the same character on promotion. See
      // reconcileNPCStubsAgainstItem in item-storage.mjs. No-op for
      // sublocations and non-item seeds.
      if (!isSublocation && pendingSeed.value?.source?.type === 'item') {
        settings.value[operationIndex].npcs = reconcileNPCStubsAgainstItem(
          settings.value[operationIndex].npcs,
          pendingSeed.value.source.id
        );
      }
      settings.value[operationIndex].loadingsettingOverview = false;
      currentlyLoading.value = false;
      // Cross-tool finalize: when this generation ran for a top-level
      // setting from a pending item-stub seed, write the back-link
      // edge + flip the source item's stub from "Create Setting" to
      // "View in Setting Generator". No-op for sublocations and for
      // generations that didn't come from a cross-tool flow.
      if (!isSublocation) {
        finalizePendingSeed(settings.value[operationIndex]);
      }
      if (parentSetting && parentSetting.importantLocations?.[sublocationIndex]) {
        const stub = parentSetting.importantLocations[sublocationIndex];
        stub.has_detailed_description = true;
        stub.promoted_setting_id = settings.value[operationIndex].id;
        stub.loading = false;
        currentlyLoading.value = false;
      }

      // Finalize a pending related_places promotion if this generation
      // was triggered by onPromoteRelatedPlace. The marker lives on the
      // newly-generated setting itself so the post-success hook can
      // (a) set promoted_setting_id on the source stub and (b) for
      // 'parent' kind, swap the source setting under the new parent.
      finalizePendingPromotion(operationIndex);

      saveSettingsToLocalStorage();  // Save to local storage after update

      // Background extraction of NAMED PLACES mentioned in the prose
      // (parent / sibling / sublocation / feature). Fires and forgets —
      // failure shouldn't block the user-visible generation result. The
      // stubs land under setting.related_places and feed the Locations
      // tab's "Related Places" section.
      runRelatedPlacesExtraction(operationIndex);
    }
  } catch (error) {
    logger.error("Error generating kingdom description:", error);
    if (settings.value[operationIndex]) {
      settings.value[operationIndex].loadingsettingOverview = false;
      currentlyLoading.value = false;
      // Drop the promotion marker on failure so it doesn't get persisted
      // as a permanent zombie property on the new setting.
      delete settings.value[operationIndex]._pendingPromotion;
    }
  }
}

/**
 * Finalize a pending related_places promotion after the new setting's
 * overview has landed. Two effects:
 *
 *   (a) Set `promoted_setting_id` on the source `related_places` stub
 *       so the UI flips from "Create as <kind>" to "View in Setting
 *       Generator" and re-extractions don't try to re-create it.
 *   (b) For kind === 'parent', swap the source setting under the
 *       newly-generated parent (source.parentId = newSetting.id).
 *
 * Why we do NOT go through `reparentSetting` here:
 *   `reparentSetting` reads from localStorage and validates the new
 *   parent exists in the persisted store. At this point in the flow
 *   the new parent has only been minted in memory — the next
 *   `saveSettingsToLocalStorage` will persist it. So the storage-layer
 *   guards trip spuriously (parent-not-found) and the reparent fails.
 *   For this specific path the guards are moot anyway: the new parent
 *   just came into existence with no descendants, so a cycle is
 *   impossible. We mutate `parentId` in memory and let the trailing
 *   save persist the consistent state.
 *
 * No-op when the new setting carries no `_pendingPromotion` marker.
 * The marker is deleted whether or not the source/stub still exists,
 * so a torn-down source (rare) doesn't strand the marker on disk.
 */
function finalizePendingPromotion(operationIndex) {
  const newSetting = settings.value[operationIndex];
  const promo = newSetting?._pendingPromotion;
  if (!promo) return;

  let sourceStub = null;
  const source = settings.value.find(s => s?.id === promo.sourceSettingId);
  if (source && Array.isArray(source.related_places)) {
    const target = promo.sourceStubName.trim().toLowerCase();
    sourceStub = source.related_places.find(
      p => (p?.name || '').trim().toLowerCase() === target
    );
    if (sourceStub) {
      sourceStub.promoted_setting_id = newSetting.id;

      // Promotion-time fallback for the cross-tool seeded_from tag.
      // Extraction-time tagging may have missed this stub because of
      // a name mismatch (LLM extracted "Stonemother range" while the
      // item stub is just "Stonemother") or because the stub was
      // added manually via AddRelatedPlaceForm (bypasses extraction
      // entirely). Re-attempt the match here with the leading-word
      // matcher so the back-link can still fire below.
      if (
        !sourceStub.seeded_from
        && source.sourceType === 'item'
        && source.sourceId
      ) {
        const itemStub = findItemStubMatchingName(source.sourceId, sourceStub.name);
        if (itemStub) {
          sourceStub.seeded_from = {
            source_type: 'item',
            source_id: source.sourceId,
            source_name: source.sourceName || source.sourceId,
            stub_name: itemStub.name,
          };
        }
      }
    }
  }

  if (promo.kind === 'parent' && source) {
    const oldParentId = source.parentId ?? null;
    source.parentId = newSetting.id;

    // Cascade: settings that were promoted as siblings of source
    // should follow source under the new parent. See
    // siblingIdsToReparent for the constraint set (one-hop only,
    // skips siblings the user has manually moved elsewhere).
    const cascadeIds = siblingIdsToReparent({
      settings: settings.value,
      source,
      oldParentId,
    });
    for (const id of cascadeIds) {
      const sibling = settings.value.find(s => s?.id === id);
      if (sibling) sibling.parentId = newSetting.id;
    }
  }

  // Cross-tool back-link: if the source stub carries `seeded_from`
  // (the extraction matched its name against a stub on the source
  // setting's originating item), fire the secondary writeback so the
  // item's stub flips from "Create Setting" to "View" and the
  // reference graph gets the inspired_by_item edge. This mirrors what
  // finalizePendingSeed does for top-level cross-tool generations.
  // Without this, promoting Stonemother from Broken Gate's tab would
  // create the Stonemother setting but leave the Vardlokkur item's
  // own Stonemother stub un-linked.
  const from = sourceStub?.seeded_from;
  if (from && from.source_type === 'item' && from.source_id && from.stub_name) {
    linkSettingToItemStub(from.source_id, from.stub_name, newSetting.id);

    addReferenceForSeed(
      {
        source: {
          type: from.source_type,
          id: from.source_id,
          name: from.source_name || from.source_id,
        },
        entities: [{ type: 'setting', name: from.stub_name }],
      },
      {
        type: 'setting',
        id: newSetting.id,
        name: newSetting.place_name || 'Unnamed Setting',
      },
    );

    // Denormalize source provenance onto the new setting so the
    // OverviewTab can render "Inspired by [item]" without walking
    // tool-references on every render — mirrors finalizePendingSeed.
    newSetting.sourceType = from.source_type;
    newSetting.sourceId = from.source_id;
    newSetting.sourceName = from.source_name || from.source_id;
  } else if (
    newSetting.sourceType === 'item'
    && newSetting.sourceId
    && newSetting.place_name
  ) {
    // Descendant back-link: the new setting inherited item provenance
    // from its parent (line ~1463 in onPromoteRelatedPlace), but the
    // cross-tool seeded_from branch above didn't fire — no item-side
    // stub matched, so this is a user-invented descendant rather than
    // a re-link to existing item lore. Register the new setting on
    // the originating item so the item card surfaces it; also write
    // the inspired_by_item reference edge to keep the cross-tool
    // graph in sync with the inherited provenance.
    addSettingStubToItem(newSetting.sourceId, {
      settingId: newSetting.id,
      settingName: newSetting.place_name,
      roleBrief: sourceStub?.role_brief || '',
    });

    addReferenceForSeed(
      {
        source: {
          type: 'item',
          id: newSetting.sourceId,
          name: newSetting.sourceName || newSetting.sourceId,
        },
        entities: [{ type: 'setting', name: newSetting.place_name }],
      },
      {
        type: 'setting',
        id: newSetting.id,
        name: newSetting.place_name,
      },
    );
  }

  delete newSetting._pendingPromotion;
}

/**
 * Fire-and-forget extraction of NAMED PLACES from the just-generated
 * setting's prose. Called after handleGenerateSetting writes the
 * overview to localStorage; runs in the background and merges results
 * back into `setting.related_places` when done.
 *
 * Failures are logged and swallowed — the user's primary action
 * (generating the setting) has already succeeded by the time this
 * fires. We don't want a downstream LLM hiccup to surface as a
 * generation error.
 */
async function runRelatedPlacesExtraction(operationIndex) {
  const setting = settings.value[operationIndex];
  if (!setting?.setting_overview) return;

  // Names to suppress from extraction results: the current setting,
  // its ancestors (parentId chain), its siblings (same parentId), and
  // its children (settings with parentId === current.id). Anything
  // already realized in the tree shouldn't surface as a stub again —
  // the prose may still mention them (correctly, per
  // childrenSettings), but the related_places list is for places
  // NOT yet realized.
  const excludeNames = collectRelatedSettingNames(setting);

  let stubs;
  try {
    stubs = await extractRelatedPlaces(setting, {
      excludeNames,
      allSettings: settings.value,
    });
  } catch (err) {
    logger.warn('[setting-gen] related-places extraction failed:', err);
    return;
  }

  // The setting may have moved in the array (rare — concurrent edits)
  // or been deleted in flight. Look it up by id to be safe.
  const live = settings.value.find(s => s?.id === setting.id);
  if (!live) return;

  live.related_places = mergeRelatedPlaces(live.related_places, stubs);
  saveSettingsToLocalStorage();
}

/**
 * Walk the current settings array to collect names of every entity
 * that should suppress extraction matches: the setting itself, every
 * ancestor up the parentId chain, every sibling under the same
 * parent, and every direct child. Returns a flat array of place_name
 * strings.
 *
 * Why children too: after a parent-promote cascade, the new parent
 * setting (now generated) has children whose names appear in its
 * prose. Background extraction was re-surfacing those children as
 * fresh stubs (often mis-classified as siblings because the prose
 * mentioned them as peers of each other). Excluding children from
 * extraction keeps them from being duplicated; they remain visible
 * in the sidebar tree where the containment relationship is
 * authoritative.
 */
function collectRelatedSettingNames(setting) {
  const names = [];
  if (!setting) return names;

  // Self
  if (setting.place_name) names.push(setting.place_name);

  // Ancestors: walk up parentId chain.
  const byId = new Map();
  for (const s of settings.value) {
    if (s?.id) byId.set(s.id, s);
  }
  const seen = new Set();
  let cursor = setting.parentId ?? null;
  while (cursor && !seen.has(cursor)) {
    seen.add(cursor);
    const node = byId.get(cursor);
    if (!node) break;
    if (node.place_name) names.push(node.place_name);
    cursor = node.parentId ?? null;
  }

  // Siblings: same parentId, different id.
  const sameParent = settings.value.filter(s =>
    s?.id !== setting.id
    && (s?.parentId ?? null) === (setting.parentId ?? null)
  );
  for (const s of sameParent) {
    if (s.place_name) names.push(s.place_name);
  }

  // Children: parentId === setting.id. After a parent-promote
  // cascade, these are the settings that got moved under the new
  // parent; their names already appear in the parent's prose and
  // we don't want extraction to re-surface them as stubs.
  const children = settings.value.filter(s => s?.parentId === setting.id);
  for (const s of children) {
    if (s.place_name) names.push(s.place_name);
  }

  // Aunts/uncles: places at the parent's scale that the LLM tends
  // to bucket as 'sibling' here because the schema has no
  // aunt/uncle slot. Surfacing them produces incoherent peer
  // claims (a city listed as sibling of a region, etc.). Pulling
  // them into the exclude list mirrors the retroactive cleanup
  // done by sweep-aunt-uncle-sibling-stubs.
  for (const name of auntUncleNamesFor(setting, settings.value)) {
    names.push(name);
  }

  return names;
}

</script>


<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

// Sidebar-specific styles
$active-color: var(--par-color-callout-bg-deep, #ede2cb);
$hover-background-color: var(--par-color-callout-bg, #f3ebda);
$default-background-color: transparent;
$active-border-color: var(--color-action-rest, #365A85);
$transition-speed: 0.3s;

.sidebar-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

.settings-tabs {
  flex: 1;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;

  /* Tree rows — chevron column + label, sharing a row-level background so
     the selection highlight reads at any depth. */
  .setting-tree-item.active-tab .setting-tree-row {
    background-color: var(--par-color-callout-bg, #f3ebda);
  }

  .setting-tree-item.active-tab .setting-tree-label {
    color: var(--color-action-hover, #2A4D70);
    font-weight: 600;
  }

  .setting-tree-row {
    display: flex;
    align-items: stretch;
    min-width: 0;
    background-color: transparent;
    border-bottom: 1px solid var(--par-color-divider, #e2dccd);
    transition: background-color 0.15s ease;

    &:hover {
      background-color: rgba(243, 235, 218, 0.4);
    }
  }

  .setting-tree-chevron,
  .setting-tree-chevron-spacer {
    flex: 0 0 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .setting-tree-chevron {
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    color: var(--color-action-muted, #5A7A9A);

    /* Inline SVG triangle, not a Unicode glyph: WordPress's emoji
       conversion script substitutes `▶` (U+25B6) for an s.w.org-hosted
       emoji image, so a text-character chevron renders as a blue
       play-button image in production. SVG bypasses that path entirely. */
    .setting-tree-chevron-glyph {
      display: inline-block;
      transition: transform 0.15s ease;
    }

    &.is-expanded .setting-tree-chevron-glyph {
      transform: rotate(90deg);
    }

    &:hover {
      color: var(--color-action-hover, #2A4D70);
    }

    &:focus-visible {
      outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
      outline-offset: -2px;
    }
  }

  .setting-tree-label {
    flex: 1 1 auto;
    min-width: 0;
    padding: 1.3rem 1.6rem 1.3rem 0.4rem;
    font-family: inherit;
    font-size: 1.6rem;
    text-align: left;
    background: transparent;
    border: none;
    color: var(--par-color-text, #222);
    cursor: pointer;
    /* Long names (Italian compounds, deep hierarchies) truncate
       with ellipsis rather than wrap or push the row wider. */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:focus-visible {
      outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
      outline-offset: -2px;
    }
  }
}

// Main content styles
.main-content {
  flex-grow: 1;
  /* Match NPCGenerator's content canvas exactly (940px max + 30px side
     padding ≈ 880px effective) so tab content reads at the same width as
     the other generators. The landing form stays 800px via .landing-wrapper. */
  padding: 2px 30px 30px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem auto;
  max-width: 940px;

  /* Content container — cream surface-card panel (same as the dungeon
     generator's .content-container). Extends up over the ParTabs strip so the
     tabs and the active panel share one card; the per-tab components no longer
     carry their own surface (they render bare inside this container). */
  .setting-tabs {
    width: 100%;
    box-sizing: border-box;
    background-color: var(--par-color-surface-card, #FEFBF4);
    border-radius: 8px;
    padding: 2.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    margin-bottom: 2rem;
  }

  @media (max-width: 2080px) {
    .setting-tabs {
      margin-top: 3rem;
    }
  }

  .setting-tab-panel {
    &:focus {
      outline: none;
    }
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

/* ZONE 1: Hero header — lapis editorial register (matches the other tools) */
.hero-header {
  text-align: center;
  padding: 2rem 1rem 2.5rem;

  .brand-line {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .brand-name {
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--color-action-secondary-rest, #5A7A9A);
    letter-spacing: 0.04em;
  }

  .page-heading__title {
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
    font-size: 3.6rem;
    font-weight: 600;
    color: var(--color-action-hover, #2A4D70);
    margin: 0 0 0.75rem;
    line-height: 1.15;
    letter-spacing: -0.015em;
  }

  .page-heading__tagline {
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--par-color-text-secondary, #555);
    font-style: italic;
    margin: 0;
    line-height: 1.6;
  }

  /* Seeded-flow back-link to the source entity. Mirrors NPCGenerator's
     .seed-source-link: burgundy parchment accent, quiet by default,
     underline emerges on hover/focus. */
  .seed-source-link {
    color: var(--par-color-title, #7a1f1f);
    font-weight: inherit;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: var(--par-color-title-deep, #58180d);
      text-decoration: underline;
    }

    &:focus-visible {
      outline: 2px solid var(--par-color-title, #7a1f1f);
      outline-offset: 2px;
    }
  }
}

/* ZONE 2: Form card — lifted cream surface, lapis "magic UI" register */
.form-card {
  background: var(--par-color-surface-card, #FEFBF4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  padding: 2.25rem 2.25rem 2rem;
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
   orphaned. Uses ParButton secondary variant (faded slate ghost)
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
  background-color: var(--par-color-surface, #FBF7F0);
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
