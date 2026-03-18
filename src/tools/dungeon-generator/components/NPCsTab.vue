<template>
  <div>
    <h2>Notable NPCs</h2>
    <p class="npc-tab-note">
      NPCs with full descriptions are automatically saved to your <strong>NPC Generator</strong>.
      Click "View in NPC Generator" at the bottom of any NPC card to see them there.
      Statblocks are also saved and linked automatically.
    </p>
    <cdr-accordion-group v-if="enrichedNPCs.length > 0">
      <cdr-accordion v-for="(npc, index) in enrichedNPCs" :key="npc.npc_id || index" :id="'npc-' + index"
        :opened="npc.opened" @accordion-toggle="dungeonStore.currentDungeon.npcs[index].opened = !dungeonStore.currentDungeon.npcs[index].opened" level="2">
        <template #label>
          {{ npc.name }}
        </template>

        <!-- NPC content -->
        <div>
          <!-- Skeleton if loading -->
          <div v-if="dungeonStore.currentlyLoadingNPCs[index]">
            <NPCSkeleton />
          </div>

          <!-- NPC Details -->
          <div v-else>
            <!-- Full NPC with NPCCard -->
            <div v-if="npc.description_of_position || npc.combined_details">
              <NPCCard
                :npc="normalizeDungeonNPC(npc)"
                :origin="dungeonStore.currentDungeon.dungeonOverview?.title"
                :is-editing="editingNPCIndex === index"
                :show-relationship-generator="true"
                :is-generating-relationship="loadingNewRelationship && loadingRelationshipForIndex === index"
                :has-statblock="!!npc.statblock || !!npc.statblock_name"
                :statblock-url="getStatblockGeneratorUrl(npc.statblock_name, npc.statblock_folder)"
                :editable="true"
                :show-delete="true"
                @start-edit="startEditingNPC(index)"
                @save-edit="handleSaveEdit(index, $event)"
                @cancel-edit="cancelEditNPC"
                @delete="dungeonStore.deleteNPC(index)"
                @generate-relationship="handleGenerateRelationship(index, $event)"
              />
            </div>

            <!-- Stub NPC (no full description yet) -->
            <div v-else>
              <h2>{{ npc.name }}</h2>
              <p>{{ npc.short_description }}</p>
              <div style="display: flex; gap: 0.5rem;">
                <cdr-button @click="dungeonStore.generateDungeonNPC(index)"
                  :disabled="dungeonStore.currentlyLoadingNPCs[index]">
                  Generate Full Description
                </cdr-button>
                <cdr-button @click="dungeonStore.deleteNPC(index)" modifier="secondary" size="small">
                  Delete
                </cdr-button>
              </div>
            </div>

            <!-- NPC Statblock Section -->
            <div v-if="npc.description_of_position"
              style="margin-top: 2rem; border-top: 1px solid #ccc; padding-top: 1rem;">
              <h3>NPC Statblock</h3>
              <!-- If npc has a statblock or is generating one, display it -->
              <div v-if="
                npc.statblock ||
                dungeonStore.npcStatblockLoadingStates[index]?.part1 ||
                dungeonStore.npcStatblockLoadingStates[index]?.part2
              " style="margin-top: 1rem;">
                <Statblock :monster="npc.statblock" :premium="premium" :readonly="true"
                  :loadingPart1="dungeonStore.npcStatblockLoadingStates[index]?.part1 || false"
                  :loadingPart2="dungeonStore.npcStatblockLoadingStates[index]?.part2 || false"
                  @update-monster="updateNpcStatblock(index, $event)" />

                <!-- Statblock Saved Message -->
                <div v-if="npc.statblock && npc.statblock_name" class="statblock-saved-message">
                  <p>
                    Edit this statblock in the
                    <a :href="getStatblockGeneratorUrl(npc.statblock_name, npc.statblock_folder)" target="_blank">Statblock Generator</a>
                  </p>
                </div>
              </div>

              <!-- Statblock Not Found Warning -->
              <div v-if="npc.statblock_name && !npc.statblock && !dungeonStore.npcStatblockLoadingStates[index]?.part1 && !dungeonStore.npcStatblockLoadingStates[index]?.part2" class="statblock-not-found-message">
                <p><strong>Statblock not found</strong></p>
                <p>The statblock "{{ npc.statblock_name }}" was not found. It may have been deleted or renamed in the Statblock Generator.</p>
                <div class="button-group">
                  <cdr-button @click="generateNpcStatblock(index, premium)" size="small">Regenerate Statblock</cdr-button>
                  <cdr-button @click="clearNpcStatblockReference(index)" modifier="secondary" size="small">Clear Reference</cdr-button>
                </div>
              </div>

              <!-- Statblock Limit Message -->
              <div v-if="dungeonStore.npcStatblockLoadingStates[index]?.limitReached"
                class="statblock-limit-message">
                <p><strong>Statblock generation limit reached</strong></p>
                <p>You are at your daily statblock generation limit (5 per 24 hours).</p>
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

              <!-- Simple form to generate a new statblock for the NPC -->
              <form v-if="npc.description_of_position" @submit.prevent="generateNpcStatblock(index, premium)"
                class="npc-statblock-form">
                <div class="form-row-top">
                  <cdr-select v-model="npcStatblockData[index].CR" label="CR" :options="crOptions" prompt="Select CR" />
                  <cdr-select v-model="npcStatblockData[index].monsterType" label="Type"
                    :options="['Random', 'Stronger Defense', 'Balanced', 'Stronger Offense']"
                    prompt="Select Monster Type" />

                </div>
                <cdr-checkbox v-model="npcStatblockData[index].isSpellcaster" style="margin-top: 2rem;">
                  Creature is a spellcaster
                </cdr-checkbox>
                <!-- Submit button -->
                <cdr-button class="monster-form-button" type="submit" style="margin-top: 1rem;"
                  :disabled="dungeonStore.npcStatblockLoadingStates[index]?.generating">
                  {{
                    dungeonStore.npcStatblockLoadingStates[index]?.generating
                      ? 'Generating...'
                      : (npc.statblock
                        ? 'Re-generate Statblock'
                        : 'Generate Statblock')
                  }}
                </cdr-button>
              </form>
            </div>
          </div>
        </div>
      </cdr-accordion>
    </cdr-accordion-group>

    <!-- Add a new NPC -->
    <h3 style="margin-top: 3rem; margin-bottom: 1rem">Add a New NPC</h3>
    <cdr-form-group :error="modelError">
      <cdr-input v-model="dungeonStore.npcName" label="NPC Name" :required="true" />
      <cdr-input v-model="dungeonStore.npcShortDescription" label="NPC Short Description" :required="true">
        <template #helper-text-bottom>
          Examples: "A trapped explorer seeking help", "A ghost haunting the corridors", "A lost child"
        </template>
      </cdr-input>
      <cdr-button style="margin-top: 2rem" @click="createNPC" :disabled="dungeonStore.currentlyLoadingNPC">
        Add NPC
      </cdr-button>
    </cdr-form-group>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onBeforeMount, onMounted, onUnmounted, watch } from 'vue';
import { useDungeonStore } from '../stores/dungeon-store.mjs';
import NPCSkeleton from './skeletons/NPCSkeleton.vue';
import Statblock from '@/components/Statblock.vue';
import NPCCard from '@/components/NPCCard.vue';
import { saveNPCToStorage, dungeonNPCToCanonical, normalizeDungeonNPC } from '@/util/npc-storage.mjs';
import { getStatblockFromStorage } from '@/util/statblock-storage.mjs';
import { useToast } from '@/composables/useToast.js';
import { generateGptResponse } from '@/util/open-ai.mjs';
import { generateSingleRelationshipPrompt, validateSingleRelationshipResponse } from '../prompts/dungeon-npcs.mjs';
import {
  CdrFormGroup,
  CdrInput,
  CdrButton,
  CdrAccordionGroup,
  CdrAccordion,
  CdrSelect,
  CdrCheckbox,
} from '@rei/cedar';
import crList from '../data/cr-list.json';
const props = defineProps({ premium: { type: Boolean, default: false } });
const dungeonStore = useDungeonStore();
const toast = useToast();
const modelError = ref(null);

// Reactive trigger for localStorage changes
const storageVersion = ref(0);

// Computed property: Enrich NPCs with data from shared storage (by ID reference)
// Falls back to nested data if not found in shared storage
const enrichedNPCs = computed(() => {
  // Depend on storageVersion to re-run when localStorage changes
  storageVersion.value;

  if (!dungeonStore.currentDungeon?.npcs) return [];

  const dungeonTitle = dungeonStore.currentDungeon.dungeonOverview?.name || 'Dungeon NPCs';
  const stored = JSON.parse(localStorage.getItem('npcGeneratorNPCs') || '{}');
  const sharedNPCs = stored[dungeonTitle] || [];

  return dungeonStore.currentDungeon.npcs.map(dungeonNPC => {
    // If NPC has an ID, try to fetch from shared storage
    if (dungeonNPC.npc_id) {
      const sharedNPC = sharedNPCs.find(n =>
        (n.npc_id === dungeonNPC.npc_id || n.id === dungeonNPC.npc_id)
      );

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
          statblock_name: sharedNPC.statblock_name || dungeonNPC.statblock_name,
          statblock_folder: sharedNPC.statblock_folder || dungeonNPC.statblock_folder,
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

onMounted(() => {
  // Refresh on mount
  storageVersion.value++;
  window.addEventListener('storage', handleStorageChange);
});

onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange);
});

// Whenever the NPC list changes, make sure our form data is in sync
//ensureNpcStatblockData();

function createNPC() {
  if (!dungeonStore.npcName || !dungeonStore.npcShortDescription) {
    modelError.value = 'Please fill out all fields.';
    return false;
  }
  dungeonStore.addNPC();
  modelError.value = null;
  return true;
}

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

  // If renaming and no ID, look up existing NPC by original name to get its ID
  if (!npc.npc_id && originalName !== editedData.name && npc.read_aloud_description) {
    const stored = JSON.parse(
      localStorage.getItem('npcGeneratorNPCs') || '{}'
    );
    if (stored[dungeonTitle]) {
      const existingNPC = stored[dungeonTitle].find(n =>
        n.npcDescriptionPart1?.character_name === originalName
      );
      if (existingNPC) {
        npc.npc_id = existingNPC.npc_id || existingNPC.id;
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
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1.5rem;
  text-align: center;
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

.npc-tab-note {
  font-size: 14px;
  color: #666;
  margin-bottom: 1.5rem;
  padding: 0.75rem 1rem;
  background: #f5f5f5;
  border-left: 3px solid #4a90e2;
  border-radius: 3px;
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
