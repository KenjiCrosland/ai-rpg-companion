<template>
  <div class="dungeon-npcs-section parchment">
    <div class="dungeon-npcs-header">
      <h3 class="dungeon-npcs-title">Notable NPCs</h3>
      <p class="dungeon-npcs-subtitle">
        People found in this dungeon — extracted from its overview or
        <button
          type="button"
          class="dungeon-npcs-subtitle-link"
          @click="openAddForm"
        >added manually</button>. Generated NPCs are saved to the NPC Generator, and their statblocks to the Statblock Generator.
      </p>
    </div>

    <!-- Add a new NPC: collapsed button that expands into a form -->
    <div class="add-npc">
      <ParAddNewButton
        v-if="!addFormExpanded"
        @click="addFormExpanded = true"
      >
        + Add an NPC
      </ParAddNewButton>

      <form
        v-else
        class="add-npc-form"
        @submit.prevent="submitAddNPC"
      >
        <div class="add-npc-row">
          <label class="add-npc-label">
            <span class="add-npc-label-text">Name <span class="add-npc-optional">(optional)</span></span>
            <input
              ref="addFormNameInput"
              v-model="addFormName"
              type="text"
              class="add-npc-input"
              placeholder="Leave blank, or e.g., Brother Aldric"
              @keydown.enter.prevent="submitAddNPC"
            />
          </label>
        </div>

        <div class="add-npc-row">
          <label class="add-npc-label">
            <span class="add-npc-label-text">Short description</span>
            <input
              v-model="addFormDescription"
              type="text"
              class="add-npc-input"
              placeholder="A trapped explorer seeking help"
              @keydown.enter.prevent="submitAddNPC"
            />
          </label>
        </div>

        <p v-if="addFormError" class="add-npc-error">{{ addFormError }}</p>

        <p class="add-npc-helper">
          A short description seeds the AI's full NPC generation. Leave the name blank to let the AI invent one.
        </p>

        <div class="add-npc-actions">
          <ParActionButton
            variant="primary-outline"
            :disabled="dungeonStore.currentlyLoadingNPC"
            @click="submitAddNPC"
          >
            Create NPC
          </ParActionButton>
          <button type="button" class="add-npc-cancel" @click="resetAddForm">
            Cancel
          </button>
        </div>
      </form>
    </div>

    <p v-if="enrichedNPCs.length === 0" class="dungeon-npc-empty">
      No NPCs yet. Use the form above to add one, or generate this dungeon's overview — named people from its prose appear here automatically.
    </p>

    <ul v-if="enrichedNPCs.length > 0" class="dungeon-npc-list">
      <li
        v-for="entry in npcEntries"
        :key="rowKey(entry)"
        class="dungeon-npc-item"
      >
        <Transition :css="!reducedMotion" name="npc-swap" mode="out-in">
          <!-- Skeleton: in-flight new-NPC generation -->
          <div v-if="dungeonStore.currentlyLoadingNPCs[entry.index]" key="loading">
            <NPCSkeleton />
          </div>

          <!-- Stub: name + short description, with inline Generate Full NPC + X delete -->
          <div
            v-else-if="!isExpanded(entry) && isStub(entry.npc)"
            key="stub"
            class="npc-stub-row"
          >
            <div class="npc-collapsed-info">
              <strong class="npc-collapsed-name">{{ entry.npc.name || 'Unnamed NPC' }}</strong>
              <span v-if="entry.npc.short_description" class="npc-collapsed-desc">
                {{ entry.npc.short_description }}
              </span>
            </div>
            <div class="npc-stub-actions">
              <ParCardButton
                size="small"
                :disabled="dungeonStore.currentlyLoadingNPCs[entry.index]"
                @click="dungeonStore.generateDungeonNPC(entry.index)"
              >
                Generate Full NPC
              </ParCardButton>
              <button
                type="button"
                class="npc-stub-delete"
                :aria-label="`Delete ${entry.npc.name || 'NPC'}`"
                @click="dungeonStore.deleteNPC(entry.index)"
              >
                <svg viewBox="0 0 12 12" width="18" height="18" aria-hidden="true">
                  <line x1="3" y1="3" x2="9" y2="9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                  <line x1="9" y1="3" x2="3" y2="9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Collapsed: full NPC, click to expand -->
          <div
            v-else-if="!isExpanded(entry)"
            key="collapsed"
            class="npc-collapsed-row"
            role="button"
            tabindex="0"
            :aria-expanded="false"
            :aria-label="`Expand ${entry.npc.name || 'NPC'}`"
            @click="toggleExpand(entry)"
            @keydown.enter.prevent="toggleExpand(entry)"
            @keydown.space.prevent="toggleExpand(entry)"
          >
            <div class="npc-collapsed-info">
              <strong class="npc-collapsed-name">{{ entry.npc.name || 'Unnamed NPC' }}</strong>
              <span v-if="oneLineDescription(entry.npc)" class="npc-collapsed-desc">
                {{ oneLineDescription(entry.npc) }}
              </span>
            </div>
            <span class="npc-collapsed-chevron" aria-hidden="true">
              <svg viewBox="0 0 12 12" width="18" height="18">
                <polyline
                  points="2,4 6,8 10,4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>

          <!-- Expanded: NPCCard + statblock section -->
          <div v-else key="expanded">
            <NPCCard
              :npc="normalizeDungeonNPC(entry.npc)"
              :origin="dungeonStore.currentDungeon.dungeonOverview?.name"
              :source-type="'dungeon'"
              :display-type="'dungeon'"
              :is-editing="editingNPCIndex === entry.index"
              :show-relationship-generator="true"
              :is-generating-relationship="loadingNewRelationship && loadingRelationshipForIndex === entry.index"
              :has-statblock="!!entry.npc.statblock || !!entry.npc.statblock_name"
              :statblock-url="getStatblockGeneratorUrl(entry.npc.statblock_name, entry.npc.statblock_folder)"
              :editable="true"
              :show-delete="true"
              :collapsible="true"
              :is-collapsed="false"
              @start-edit="startEditingNPC(entry.index)"
              @save-edit="handleSaveEdit(entry.index, $event)"
              @cancel-edit="cancelEditNPC"
              @delete="dungeonStore.deleteNPC(entry.index)"
              @generate-relationship="handleGenerateRelationship(entry.index, $event)"
              @toggle-collapse="toggleExpand(entry)"
            />

            <!-- NPC Statblock Section -->
            <div v-if="entry.npc.description_of_position"
              style="margin-top: 2rem; border-top: 1px solid #ccc; padding-top: 1rem;">
              <h3>NPC Statblock</h3>
              <!-- If npc has a statblock or is generating one, display it -->
              <div v-if="
                entry.npc.statblock ||
                dungeonStore.npcStatblockLoadingStates[entry.index]?.part1 ||
                dungeonStore.npcStatblockLoadingStates[entry.index]?.part2
              " style="margin-top: 1rem;">
                <Statblock :monster="entry.npc.statblock" :premium="premium" :readonly="true"
                  :loadingPart1="dungeonStore.npcStatblockLoadingStates[entry.index]?.part1 || false"
                  :loadingPart2="dungeonStore.npcStatblockLoadingStates[entry.index]?.part2 || false"
                  @update-monster="updateNpcStatblock(entry.index, $event)" />

                <!-- Statblock Saved Message -->
                <div v-if="entry.npc.statblock && entry.npc.statblock_name" class="statblock-saved-message">
                  <p>
                    Edit this statblock in the
                    <a :href="getStatblockGeneratorUrl(entry.npc.statblock_name, entry.npc.statblock_folder)" target="_blank">Statblock Generator</a>
                  </p>
                </div>
              </div>

              <!-- Statblock Not Found Warning -->
              <div v-if="entry.npc.statblock_name && !entry.npc.statblock && !dungeonStore.npcStatblockLoadingStates[entry.index]?.part1 && !dungeonStore.npcStatblockLoadingStates[entry.index]?.part2" class="statblock-not-found-message">
                <p><strong>Statblock not found</strong></p>
                <p>The statblock "{{ entry.npc.statblock_name }}" was not found. It may have been deleted or renamed in the Statblock Generator.</p>
                <div class="button-group">
                  <ParActionButton @click="generateNpcStatblock(entry.index, premium)" size="small">Regenerate Statblock</ParActionButton>
                  <ParActionButton @click="clearNpcStatblockReference(entry.index)" variant="secondary" size="small">Clear Reference</ParActionButton>
                </div>
              </div>

              <!-- Statblock Limit Message -->
              <div v-if="dungeonStore.npcStatblockLoadingStates[entry.index]?.limitReached"
                class="statblock-limit-message">
                <p><strong>Statblock generation limit reached</strong></p>
                <p>You are at your daily statblock generation limit (5 per 24 hours).</p>
                <PatreonCallout :patreon-url="patreonLoginUrl">
                  <template #body></template>
                  <template #aside></template>
                  <template #features>
                    <li>Unlimited statblock generation — no daily cap.</li>
                    <li>Cross-device save and load — your dungeons sync between browsers and devices.</li>
                    <li>
                      <a :href="patreonTiersUrl" target="_blank" rel="noopener">See all premium tiers and benefits on Patreon</a><span aria-hidden="true"> →</span>
                    </li>
                  </template>
                </PatreonCallout>
              </div>

              <!-- Simple form to generate a new statblock for the NPC -->
              <form @submit.prevent="generateNpcStatblock(entry.index, premium)"
                class="npc-statblock-form">
                <div class="form-row-top">
                  <cdr-select v-model="npcStatblockData[entry.index].CR" label="CR" :options="crOptions" prompt="Select CR" />
                  <cdr-select v-model="npcStatblockData[entry.index].monsterType" label="Type"
                    :options="['Random', 'Stronger Defense', 'Balanced', 'Stronger Offense']"
                    prompt="Select Monster Type" />

                </div>
                <cdr-checkbox v-model="npcStatblockData[entry.index].isSpellcaster" style="margin-top: 2rem;">
                  Creature is a spellcaster
                </cdr-checkbox>
                <!-- Submit button -->
                <ParActionButton class="monster-form-button" type="submit" style="margin-top: 1rem;"
                  :disabled="dungeonStore.npcStatblockLoadingStates[entry.index]?.generating">
                  {{
                    dungeonStore.npcStatblockLoadingStates[entry.index]?.generating
                      ? 'Generating...'
                      : (entry.npc.statblock
                        ? 'Re-generate Statblock'
                        : 'Generate Statblock')
                  }}
                </ParActionButton>
              </form>
            </div>
          </div>
        </Transition>
      </li>
    </ul>

  </div>
</template>

<script setup>
import { ParActionButton, ParCardButton, ParAddNewButton } from "@/parchment";
import { ref, reactive, computed, nextTick, onBeforeMount, onMounted, onUnmounted, watch } from 'vue';
import { useDungeonStore } from '../stores/dungeon-store.mjs';
import NPCSkeleton from './skeletons/NPCSkeleton.vue';
import Statblock from '@/components/Statblock.vue';
import NPCCard from '@/components/NPCCard.vue';
import { saveNPCToStorage, dungeonNPCToCanonical, normalizeDungeonNPC, findNPCByIdAcrossFolders, getNPCStatblockRef } from '@/util/npc-storage.mjs';
import { getStatblockFromStorage } from '@/util/statblock-storage.mjs';
import { useToast } from '@/composables/useToast.js';
import { generateGptResponse } from "@/util/ai-client.mjs";
import PatreonCallout from '@/components/PatreonCallout.vue';
import { patreonTiersUrl } from '@/util/patreon-urls.mjs';
import { generateSingleRelationshipPrompt, validateSingleRelationshipResponse } from '../prompts/dungeon-npcs.mjs';
import {
  CdrSelect,
  CdrCheckbox,
} from '@rei/cedar';
import crList from '../data/cr-list.json';
const props = defineProps({ premium: { type: Boolean, default: false } });
const dungeonStore = useDungeonStore();
const toast = useToast();

// ---- Add-NPC form state (collapsed-button → expanded-form pattern) ----
const addFormExpanded = ref(false);
const addFormName = ref('');
const addFormDescription = ref('');
const addFormError = ref('');
const addFormNameInput = ref(null);

function openAddForm() {
  addFormExpanded.value = true;
  // Focus the first field once the form renders, so users tabbed in
  // from the subtitle link land where they can start typing.
  nextTick(() => addFormNameInput.value?.focus());
}

function submitAddNPC() {
  const desc = addFormDescription.value.trim();
  if (!desc) {
    addFormError.value = 'Please enter a short description.';
    return;
  }
  // Drive the existing store flow: addNPC reads from store refs, pushes
  // a stub, then kicks off generation.
  dungeonStore.npcName = addFormName.value.trim() || 'Unnamed NPC';
  dungeonStore.npcShortDescription = desc;
  dungeonStore.addNPC();
  resetAddForm();
}

function resetAddForm() {
  addFormExpanded.value = false;
  addFormName.value = '';
  addFormDescription.value = '';
  addFormError.value = '';
}

// Reactive trigger for localStorage changes
const storageVersion = ref(0);

// Computed property: Enrich NPCs with data from shared storage (by ID reference)
// Falls back to nested data if not found in shared storage
const enrichedNPCs = computed(() => {
  // Depend on storageVersion to re-run when localStorage changes
  storageVersion.value;

  if (!dungeonStore.currentDungeon?.npcs) return [];

  const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs') || '{}');

  return dungeonStore.currentDungeon.npcs.map(dungeonNPC => {
    // If NPC has an ID, try to fetch from shared storage. Walk every
    // folder rather than guessing the dungeon-name folder — the user may
    // have moved the canonical NPC to a folder of their own choosing.
    if (dungeonNPC.npc_id) {
      const sharedNPC = findNPCByIdAcrossFolders(stored, dungeonNPC.npc_id);

      if (sharedNPC) {
        // Use shared storage data, but preserve dungeon-specific fields
        const enrichedNPC = {
          ...dungeonNPC, // Keep dungeon-specific data (opened, etc.)
          name: sharedNPC.npcDescriptionPart1?.character_name || dungeonNPC.name,
          description_of_position: sharedNPC.npcDescriptionPart1?.description_of_position,
          why_in_dungeon: sharedNPC.npcDescriptionPart1?.reason_for_being_there,
          distinctive_features_or_mannerisms: sharedNPC.npcDescriptionPart1?.distinctive_feature_or_mannerism,
          character_secret: sharedNPC.npcDescriptionPart1?.character_secret,
          read_aloud_description: sharedNPC.npcDescriptionPart1?.read_aloud_description,
          roleplaying_tips: sharedNPC.npcDescriptionPart1?.roleplaying_tips,
          combined_details: sharedNPC.npcDescriptionPart1?.combined_details,
          relationships: sharedNPC.npcDescriptionPart2?.relationships || {},
          // Resolve statblock ref via the centralized helper — handles
          // the canonical (nested) write path the NPC Generator uses,
          // the legacy top-level location, and the dungeon-local
          // fallback for NPCs not yet promoted to shared storage.
          ...getNPCStatblockRef(sharedNPC, dungeonNPC),
        };

        // Resolve statblock from storage if reference exists
        if (enrichedNPC.statblock_name) {
          enrichedNPC.statblock = getStatblockFromStorage(
            enrichedNPC.statblock_name,
            enrichedNPC.statblock_folder
          );
        } else {
          enrichedNPC.statblock = null;
        }

        return enrichedNPC;
      }
    }

    // Fallback to nested data if not found in shared storage or no ID
    return dungeonNPC;
  });
});

// Entry rows preserve the original index so delete/generate handlers
// stay aligned with dungeonStore.currentDungeon.npcs.
const npcEntries = computed(() =>
  enrichedNPCs.value.map((npc, index) => ({ npc, index }))
);

function rowKey({ npc, index }) {
  return npc?.npc_id || `stub-${index}`;
}

// Stub = no generated description fields yet. Matches the setting-generator
// definition (read_aloud_description is the part-1 generation tell), with
// description_of_position as a belt-and-suspenders fallback for shared-storage
// NPCs that may not have read_aloud_description set.
function isStub(npc) {
  return !npc?.read_aloud_description && !npc?.description_of_position;
}

function oneLineDescription(npc) {
  if (isStub(npc)) {
    return (npc?.short_description || '').trim();
  }
  return (npc?.description_of_position || npc?.short_description || '').trim();
}

// Single-open expansion: only one NPC may be expanded at a time. Tracked
// by a single ref of the row key (null when nothing is expanded).
const expandedKey = ref(null);

function isExpanded(entry) {
  return expandedKey.value === rowKey(entry);
}

function toggleExpand(entry) {
  const key = rowKey(entry);
  expandedKey.value = expandedKey.value === key ? null : key;
}

// Respect prefers-reduced-motion so Transition swaps don't animate
// when users have asked the system to minimize motion.
const reducedMotion = ref(
  typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
);

// Patreon OAuth URL
const patreonLoginUrl = computed(() => {
  const returnUrl = encodeURIComponent(window.location.href);
  return `https://cros.land/patreon-flow/?patreon-login=yes&patreon-final-redirect=${returnUrl}`;
});

// Statblock Generator URL with query params
function getStatblockGeneratorUrl(monsterName, folderName) {
  const base = 'https://cros.land/ai-powered-dnd-5e-monster-statblock-generator/';
  const params = new URLSearchParams();
  if (monsterName) params.set('monster', monsterName);
  if (folderName) params.set('folder', folderName);
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

// The CR dropdown data
const crOptions = crList.fullArray;

// Edit mode state
const editingNPCIndex = ref(null);

// Relationship generation state
const loadingNewRelationship = ref(false);
const loadingRelationshipForIndex = ref(null);

// We'll keep an object that holds per-NPC data for statblock generation
// so each NPC can have different CR / isSpellcaster etc.
const npcStatblockData = reactive({});

/**
 * On component mount (or whenever NPCs change), we can ensure each NPC has
 * an entry in `npcStatblockData[index]`.
 */
function ensureNpcStatblockData() {
  if (!dungeonStore.currentDungeon?.npcs) return;
  dungeonStore.currentDungeon.npcs.forEach((npc, idx) => {
    if (!npcStatblockData[idx]) {
      npcStatblockData[idx] = {
        CR: getCR(npc?.CR || '1'), // Use getCR to extract the number
        monsterType: 'Random',
        isSpellcaster: npc.isSpellcaster || false,
      };
    }
  });
}

//7 (2,900 XP)
//CR presents as a string I just need the first number as a string withouth the (XP)
function getCR(cr) {
  return cr.split(' ')[0];
}

onBeforeMount(() => {
  ensureNpcStatblockData();
});

watch(
  () => dungeonStore.currentDungeon?.npcs,
  () => {
    ensureNpcStatblockData();
  },
  { deep: true }
);

// Watch for dungeon changes to refresh NPC data from shared storage
watch(
  () => dungeonStore.currentDungeonId,
  () => {
    storageVersion.value++;
  }
);

// Watch for tab changes - refresh when NPCs tab is viewed
watch(
  () => dungeonStore.activeTabIndex,
  (newTab) => {
    // NPCs tab is index 2
    if (newTab === 2) {
      storageVersion.value++;
    }
  }
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

// Whenever the NPC list changes, make sure our form data is in sync
//ensureNpcStatblockData();

// Update the NPC's statblock once GPT finishes
function updateNpcStatblock(index, updatedStatblock) {
  const npc = dungeonStore.currentDungeon.npcs[index];
  if (!npc) return;
  npc.statblock = updatedStatblock;
  // If you want to store CR and isSpellcaster in npc as well, do so here
  npc.CR = updatedStatblock.challenge_rating || npc.CR;
  npc.isSpellcaster = npcStatblockData[index].isSpellcaster;
  dungeonStore.saveDungeons();
}

/**
 * This triggers the store function that calls GPT to generate or re-generate
 * a statblock for the NPC.
 */
async function generateNpcStatblock(index, premium) {
  const npc = dungeonStore.currentDungeon.npcs[index];
  if (!npc) return;

  const { CR, monsterType, isSpellcaster } = npcStatblockData[index];

  await dungeonStore.generateNPCStatblock(index, {
    CR,
    monsterType,
    isSpellcaster,
    premium,
  });
}

// Start editing NPC
function startEditingNPC(index) {
  editingNPCIndex.value = index;
}

// Cancel editing NPC
function cancelEditNPC() {
  editingNPCIndex.value = null;
}

// Handle save edit from NPCCard
function handleSaveEdit(index, editedData) {
  const npc = dungeonStore.currentDungeon.npcs[index];
  if (!npc) return;

  const originalName = npc.name;
  const dungeonTitle = dungeonStore.currentDungeon.dungeonOverview?.name || 'Dungeon NPCs';

  // If renaming and no ID, look up existing NPC by original name to get its ID.
  // Walk every folder; folder organization is the user's, not ours.
  if (!npc.npc_id && originalName !== editedData.name && npc.read_aloud_description) {
    const stored = JSON.parse(
      localStorage.getItem('npcGeneratorNPCs') || '{}'
    );
    for (const folder of Object.values(stored)) {
      if (!Array.isArray(folder)) continue;
      const existingNPC = folder.find(n =>
        n.npcDescriptionPart1?.character_name === originalName
      );
      if (existingNPC) {
        npc.npc_id = existingNPC.npc_id;
        break;
      }
    }
  }

  // Update NPC with edited data
  npc.name = editedData.name;
  npc.read_aloud_description = editedData.read_aloud_description;
  npc.combined_details = editedData.combined_details;
  npc.relationships = editedData.relationships;

  // Save to shared NPC storage first (this assigns/preserves ID)
  if (npc.read_aloud_description) {
    const canonicalNPC = dungeonNPCToCanonical(npc, dungeonTitle);
    saveNPCToStorage(canonicalNPC, dungeonTitle);

    // Sync the ID back to the dungeon NPC
    if (canonicalNPC.npc_id && canonicalNPC.npc_id !== npc.npc_id) {
      npc.npc_id = canonicalNPC.npc_id;
      dungeonStore.currentDungeon.npcs[index].npc_id = canonicalNPC.npc_id;
    }

    toast.success(`${npc.name} updated in your NPCs`);
  }

  // Save to dungeons localStorage after ID sync
  dungeonStore.saveDungeons();

  editingNPCIndex.value = null;
}

// Handle relationship generation from NPCCard
async function handleGenerateRelationship(npcIndex, relationshipData) {
  const npc = dungeonStore.currentDungeon.npcs[npcIndex];
  if (!npc) return;

  // Build NPC description for context with proper structure
  const npcDescription = `
NAME: ${npc.name}

APPEARANCE: ${npc.read_aloud_description || 'Not specified'}

ROLE: ${npc.description_of_position || 'Unknown'}

REASON IN DUNGEON: ${npc.why_in_dungeon || 'Unknown'}

DISTINCTIVE TRAITS: ${npc.distinctive_features_or_mannerisms || 'None noted'}

SECRET: ${npc.character_secret || 'None'}

ROLEPLAYING TIPS: ${npc.roleplaying_tips || 'None'}
`.trim();

  // Get dungeon overview for context with structure
  const overview = dungeonStore.currentDungeon.dungeonOverview;
  const dungeonOverview = overview ? `
DUNGEON NAME: ${overview.name || 'Unknown'}

THEME: ${overview.theme || 'Unknown'}

HISTORY: ${overview.history || 'Unknown'}

CURRENT STATE: ${overview.current_state || 'Unknown'}

FACTIONS: ${overview.factions ? overview.factions.map(f => `${f.name}: ${f.description}`).join(', ') : 'None'}

BOSS: ${overview.boss?.name || 'Unknown'} - ${overview.boss?.description || ''}
`.trim() : '';

  try {
    loadingNewRelationship.value = true;
    loadingRelationshipForIndex.value = npcIndex;

    const prompt = generateSingleRelationshipPrompt(
      npcDescription,
      dungeonOverview,
      relationshipData.name,
      relationshipData.description
    );

    const response = await generateGptResponse(prompt, validateSingleRelationshipResponse);
    const generatedRelationship = JSON.parse(response);

    // Add relationship to NPC
    if (!npc.relationships) {
      npc.relationships = {};
    }
    npc.relationships[generatedRelationship.name] = generatedRelationship.relationship;

    // Save to shared NPC storage first (this assigns/preserves ID)
    if (npc.read_aloud_description) {
      const dungeonTitle = dungeonStore.currentDungeon.dungeonOverview?.name || 'Dungeon NPCs';
      const canonicalNPC = dungeonNPCToCanonical(npc, dungeonTitle);
      saveNPCToStorage(canonicalNPC, dungeonTitle);

      // Sync the ID back to the dungeon NPC
      if (canonicalNPC.npc_id && canonicalNPC.npc_id !== npc.npc_id) {
        npc.npc_id = canonicalNPC.npc_id;
        dungeonStore.currentDungeon.npcs[npcIndex].npc_id = canonicalNPC.npc_id;
      }

      toast.success(`${npc.name} updated in your NPCs`);
    }

    // Save to dungeons localStorage after ID sync
    dungeonStore.saveDungeons();
  } catch (error) {
    console.error('Error generating new relationship:', error);
    alert('Failed to generate relationship. Please try again.');
  } finally {
    loadingNewRelationship.value = false;
    loadingRelationshipForIndex.value = null;
  }
}

// Clear NPC statblock reference
function clearNpcStatblockReference(index) {
  const npc = dungeonStore.currentDungeon.npcs[index];
  if (!npc) return;
  delete npc.statblock_name;
  delete npc.statblock_folder;
  npc.statblock = null;
  dungeonStore.saveDungeons();
}
</script>

<style scoped>
.read-aloud-box {
  background-color: #fafaf6;
  padding: 1rem 2rem;
  font-style: italic;
}

/* ---- NPC list (mirrors setting-generator's RelatedNPCsSection) ---- */
.dungeon-npc-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.dungeon-npc-item {
  list-style: none;
}

.dungeon-npc-empty {
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  margin: 1rem 0 2rem 0;
}

.npc-collapsed-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 1.6rem 3rem;
  background: var(--par-color-surface, #FBF7F0);
  border: 1.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-sm, 3px);
  box-shadow: var(--par-color-card-shadow, 0 1px 3px rgba(122, 50, 30, 0.04));
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

.npc-collapsed-row:hover {
  background: #f8f3e8;
  border-color: var(--par-color-title, #7a1f1f);
}

.npc-collapsed-row:focus-visible {
  outline: 2px solid var(--par-color-action-primary, #2A4D70);
  outline-offset: 2px;
}

.npc-stub-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 1.6rem 3rem;
  background: var(--par-color-surface, #FBF7F0);
  border: 1.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-sm, 3px);
  box-shadow: var(--par-color-card-shadow, 0 1px 3px rgba(122, 50, 30, 0.04));
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

.npc-stub-actions {
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
}

.npc-collapsed-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
  flex: 1;
}

.npc-collapsed-name {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--par-color-text, #222);
  line-height: 1.3;
}

.npc-collapsed-desc {
  font-family: var(--par-font-sans, sans-serif);
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.npc-collapsed-chevron {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 0.75rem;
  color: var(--par-color-action-muted, #5A7A9A);
  border: 1px solid var(--par-color-divider, #e2dccd);
  border-radius: var(--par-radius-sm, 3px);
  background: rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
  transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
}

.npc-collapsed-chevron svg { display: block; }

.npc-collapsed-row:hover .npc-collapsed-chevron {
  color: var(--par-color-title, #7a1f1f);
  border-color: var(--par-color-title, #7a1f1f);
  background: rgba(255, 255, 255, 0.85);
}

.npc-stub-delete {
  appearance: none;
  -webkit-appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 0.75rem;
  color: var(--par-color-action-muted, #5A7A9A);
  border: 1px solid var(--par-color-divider, #e2dccd);
  border-radius: var(--par-radius-sm, 3px);
  background: rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
  cursor: pointer;
  transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
}

.npc-stub-delete svg { display: block; }

.npc-stub-delete:hover,
.npc-stub-delete:focus-visible {
  color: var(--par-color-title, #7a1f1f);
  border-color: var(--par-color-title, #7a1f1f);
  background: rgba(255, 255, 255, 0.85);
  outline: none;
}

/* Transition: cross-fade between stub/collapsed/expanded states. */
.npc-swap-enter-active,
.npc-swap-leave-active {
  transition: opacity 0.15s ease;
}

.npc-swap-enter-from,
.npc-swap-leave-to {
  opacity: 0;
}

/* ---- Add-NPC form (mirrors setting-generator's AddNPCForm) ---- */
.add-npc {
  margin: 0 0 1.5rem 0;
}

.add-npc-form {
  padding: 1.25rem;
  border: 1px solid var(--par-color-divider, #e2dccd);
  border-radius: var(--par-radius-sm, 3px);
  background: var(--par-color-surface, #fdfbf6);
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
}

.add-npc-row {
  margin-bottom: 0.9rem;
}

.add-npc-row:last-of-type {
  margin-bottom: 1.1rem;
}

.add-npc-label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.add-npc-label-text {
  font-family: var(--par-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  font-size: 1.1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--par-color-action-primary, #2A4D70);
}

.add-npc-optional {
  text-transform: none;
  letter-spacing: 0;
  font-weight: 400;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}

.add-npc-input {
  font-family: inherit;
  font-size: 1.5rem;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--par-color-divider, #c8bfac);
  border-radius: var(--par-radius-sm, 3px);
  background: #fff;
  color: var(--par-color-text, #222);
}

.add-npc-input:focus {
  outline: none;
  border-color: var(--par-color-title, #7a1f1f);
  box-shadow: 0 0 0 2px rgba(122, 31, 31, 0.12);
}

.add-npc-helper {
  margin: 0 0 1rem 0;
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.5;
}

.add-npc-error {
  margin: 0 0 0.8rem 0;
  font-family: var(--par-font-sans, sans-serif);
  font-size: 1.3rem;
  color: var(--par-color-title, #7a1f1f);
}

.add-npc-actions {
  display: flex;
  gap: 0.6rem;
  align-items: center;
}

.add-npc-cancel {
  appearance: none;
  -webkit-appearance: none;
  background: none;
  border: none;
  margin: 0;
  padding: 0.5rem 0.7rem;
  font-family: inherit;
  font-size: 1.4rem;
  color: var(--par-color-text-muted, #6b6b6b);
  cursor: pointer;
}

.add-npc-cancel:hover {
  color: var(--par-color-title, #7a1f1f);
}

/* Reuse your .form-row-top, .form-row-mid, etc. classes. Example: */
.form-row-top {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  align-items: center;
}

.monster-form-button {
  margin-top: 1rem;
}

.edit-form {
  width: 100%;
}

.edit-field {
  margin-bottom: 1.5rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.statblock-limit-message {
  /* text-align: center removed during PatreonCallout migration — the
     callout's actions row needs to flow inline, not stack centered. */
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1.5rem 0;
}

.statblock-limit-message p {
  margin: 0.5rem 0;
  color: #6b7280;
  font-size: 1.4rem;
  line-height: 1.6;
}

.statblock-limit-message p strong {
  color: #374151;
  font-size: 1.6rem;
}

.statblock-limit-message .patreon-universal-button {
  margin-top: 1rem;
}

.statblock-limit-message .patreon-universal-button a {
  text-decoration: none;
}

.statblock-limit-message .patreon-universal-button .patreon-responsive-button-wrapper {
  border-radius: 6px;
  overflow: hidden;
}

.statblock-limit-message .patreon-universal-button .patreon-responsive-button {
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
}

.statblock-limit-message .patreon-universal-button .patreon_logo {
  width: 20px;
  height: 20px;
}

.statblock-limit-message .patreon-universal-button .patreon-responsive-button:hover {
  background: #e63946;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.statblock-limit-message .patreon-universal-button .patreon-responsive-button:active {
  transform: translateY(0);
}

.statblock-saved-message {
  margin-top: 1.5rem;
  padding: 1rem 1.5rem;
  background: #f0fdf4;
  border: 1px solid #22c55e;
  border-radius: 6px;
}

.statblock-saved-message p {
  margin: 0;
  color: #14532d;
  font-size: 1.6rem;
}

.statblock-saved-message a {
  color: #16a34a;
  font-weight: 600;
  text-decoration: underline;
}

.statblock-saved-message a:hover {
  color: #22c55e;
}

/* ---- Header (mirrors setting-generator's RelatedNPCsSection) ----
   The section wrapper sets the serif baseline so descendants (title,
   collapsed rows, inputs that opt-in via font-family: inherit) all
   resolve to Source Serif 4 / Georgia via the fallback chain. Without
   this, the h3's own class rule still applies its font-family, but
   Cedar's body Graphik inheritance can win when scoped specificity
   doesn't land cleanly — wrapping makes the serif baseline structural,
   not selector-dependent. */
.dungeon-npcs-section {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

.dungeon-npcs-header {
  margin-bottom: 1.25rem;
}

.dungeon-npcs-title {
  margin: 0 0 0.25rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 2rem;
  font-weight: 600;
  color: var(--par-color-action-primary, #2A4D70);
  letter-spacing: 0;
  line-height: 1.2;
}

.dungeon-npcs-subtitle {
  margin: 0;
  font-family: var(--par-font-sans, sans-serif);
  font-size: 1.3rem;
  font-style: italic;
  font-weight: 400;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.5;
}

.dungeon-npcs-subtitle-link {
  appearance: none;
  -webkit-appearance: none;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  font: inherit;
  color: var(--par-color-action-primary, #2A4D70);
  text-decoration: underline;
  text-underline-offset: 0.15em;
  cursor: pointer;
}

.dungeon-npcs-subtitle-link:hover,
.dungeon-npcs-subtitle-link:focus-visible {
  color: var(--par-color-action-primary, #2A4D70);
  text-decoration-thickness: 2px;
  outline: none;
}

.statblock-not-found-message {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: #fef2f2;
  border: 1px solid #ef4444;
  border-radius: 6px;
}

.statblock-not-found-message p {
  margin: 0 0 1rem 0;
  color: #7f1d1d;
  font-size: 1.6rem;
}

.statblock-not-found-message p strong {
  color: #991b1b;
  font-size: 1.8rem;
}

.statblock-not-found-message .button-group {
  margin-top: 1rem;
  margin-bottom: 0;
}
</style>
