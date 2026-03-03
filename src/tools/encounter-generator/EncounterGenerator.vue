<template>
  <GeneratorLayout :premium="premium">
    <template #sidebar>
      <div class="sidebar-content">
        <div class="sidebar-scroll">
          <cdr-accordion-group>
            <cdr-accordion level="3" v-for="(folder, folderName) in filteredEncounters" :key="folderName"
              :id="folderName" :opened="openedFolders[folderName]"
              @accordion-toggle="openedFolders[folderName] = !openedFolders[folderName]">
              <template #label>
                {{ folderName }}
              </template>
              <ul class="saved-encounters">
                <li v-for="(encounter, index) in folder" :key="index"
                  :class="{ 'active': activeEncounterIndex === index && activeFolder === folderName }">
                  <button class="encounter-button" @click="selectEncounter(folderName, index)" tabindex="0">
                    <span class="encounter-composition">
                      <template v-for="(monster, mIndex) in encounter.monsters" :key="mIndex">
                        <span v-if="mIndex > 0">, </span>
                        <span>{{ monster.name }} <span class="quantity">({{ monster.quantity || 1 }}×)</span></span>
                      </template>
                      <span v-if="!encounter.monsters || encounter.monsters.length === 0">Empty Encounter</span>
                    </span>
                    <span v-if="encounter.difficulty"
                      :class="['difficulty-badge', `difficulty-${encounter.difficulty.toLowerCase()}`]">
                      {{ encounter.difficulty }}
                    </span>
                  </button>
                </li>
                <li>
                  <button class="encounter-button" @click="newEncounter(folderName)"
                    :class="{ 'active': activeEncounterIndex === null && activeFolder === folderName }">
                    + New Encounter</button>
                </li>
              </ul>
            </cdr-accordion>
          </cdr-accordion-group>
        </div>

        <div class="sidebar-footer">
          <cdr-button modifier="dark" @click="showDataManagerModal = true" :full-width="true">
            Save/Load Data from a File
          </cdr-button>
        </div>

        <DataManagerModal :opened="showDataManagerModal" @update:opened="showDataManagerModal = $event"
          :premium="premium" currentApp="encounters" />
      </div>
    </template>

    <div class="encounter-generator">
      <!-- Landing / Form state -->
      <div v-if="!generatedEncounter && !loading" class="landing-wrapper">
        <!-- ZONE 1: Hero header -->
        <div class="hero-header">
          <div class="brand-line">
            <span class="brand-name">Kenji's Encounter Generator</span>
            <span v-if="!premium" class="version-pill">Free</span>
            <span v-else class="version-pill premium">Premium</span>
          </div>
          <h1>Generate Encounters Your Players Will Actually Remember</h1>
          <p class="value-prop">Pick monsters, set the scene, and generate read-aloud text, hazards, objectives, and
            aftermath hooks.</p>
        </div>

        <!-- ZONE 2: Form card -->
        <div class="form-card">

          <!-- Scene Description — leads because it drives narrative quality -->
          <section class="form-section">
            <cdr-input v-model="location" label="Encounter Context"
              placeholder="Describe the location, situation, or encounter type — e.g., 'ambush in a narrow canyon,' 'negotiation in a merchant's tent,' or 'underwater combat with limited visibility'..."
              :rows="4" tag="textarea" background="secondary" optional />
          </section>

          <!-- Monster Picker + Party/Encounter List side by side -->
          <section class="form-section monster-party-row">
            <div ref="pickerColumnRef" class="picker-column">
              <h2>Monsters</h2>
              <MonsterPicker @add-monster="addMonster" />
            </div>

            <div ref="partyColumnRef" class="party-encounter-column">
              <div class="party-bar">
                <h2>
                  Party
                  <cdr-tooltip id="xp-thresholds-tooltip" position="top">
                    <template #trigger>
                      <button class="threshold-trigger" aria-label="View XP thresholds">ⓘ</button>
                    </template>
                    <div class="threshold-tooltip-content">
                      <strong>XP Thresholds</strong>
                      <div>Easy: {{ difficultyThresholds.easy.toLocaleString() }}</div>
                      <div>Medium: {{ difficultyThresholds.medium.toLocaleString() }}</div>
                      <div>Hard: {{ difficultyThresholds.hard.toLocaleString() }}</div>
                      <div>Deadly: {{ difficultyThresholds.deadly.toLocaleString() }}</div>
                    </div>
                  </cdr-tooltip>
                </h2>

                <div v-for="(group, index) in partyGroups" :key="index" class="party-group">
                  <div class="party-input-wrapper">
                    <label class="party-label">Players</label>
                    <input class="party-number-input" type="number" min="1" :value="group.players || ''" placeholder="4"
                      @input="updateGroupPlayers(index, $event.target.value)" />
                  </div>
                  <span class="multiply-symbol">×</span>
                  <div class="party-input-wrapper">
                    <label class="party-label">Level</label>
                    <input class="party-number-input" type="number" min="1" max="20" :value="group.level || ''"
                      placeholder="5" @input="updateGroupLevel(index, $event.target.value)" />
                  </div>
                  <cdr-button v-if="partyGroups.length > 1" size="small" icon-only @click="removePartyGroup(index)">
                    <template #icon>
                      <icon-x-sm />
                    </template>
                  </cdr-button>
                </div>

                <cdr-button size="small" modifier="secondary" @click="addPartyGroup">
                  + Add Group
                </cdr-button>
              </div>

              <EncounterMonsterList :monsters="encounterMonsters" :party-size="totalPartySize"
                :difficulty-thresholds="difficultyThresholds" :raw-xp="rawXp" :adjusted-xp="adjustedXp"
                :difficulty-rating="difficultyRating" :encounter-multiplier="currentEncounterMultiplier"
                @update-monsters="encounterMonsters = $event" />
            </div>
          </section>

          <!-- Generate Button -->
          <cdr-button class="generate-button" :full-width="true" @click="generateEncounter" :disabled="loading">
            {{ loading ? 'Generating...' : 'Generate Encounter' }}
          </cdr-button>
        </div>
      </div>

      <!-- ZONE 3: Navigation button (outside card) -->
      <div v-if="generatedEncounter && !loading" class="output-navigation">
        <cdr-button @click="resetEncounter" modifier="secondary">
          ← Create New Encounter
        </cdr-button>
      </div>

      <!-- Output card (separate from form) -->
      <div v-if="generatedEncounter || loading" class="output-card">
        <!-- Show skeleton for title while loading and no place_name yet -->
        <div v-if="loading && (!generatedEncounter || !generatedEncounter.place_name)" class="title-skeleton">
          <cdr-skeleton>
            <cdr-skeleton-bone style="width: 60%; height: 1.5rem; margin-bottom: 1rem;" />
          </cdr-skeleton>
        </div>
        <h3 v-else-if="generatedEncounter && generatedEncounter.place_name">{{ generatedEncounter.place_name }}</h3>

        <!-- Skeleton for read-aloud while Call 1 loads -->
        <div v-if="loading && (!generatedEncounter || !generatedEncounter.contentArray)" class="read-aloud-skeleton">
          <cdr-skeleton>
            <cdr-skeleton-bone style="width: 100%; height: 1rem; margin-bottom: 0.5rem;" />
            <cdr-skeleton-bone style="width: 95%; height: 1rem; margin-bottom: 0.5rem;" />
            <cdr-skeleton-bone style="width: 98%; height: 1rem; margin-bottom: 0.5rem;" />
            <cdr-skeleton-bone style="width: 92%; height: 1rem;" />
          </cdr-skeleton>
        </div>

        <!-- Render contentArray like dungeon rooms -->
        <div v-else-if="generatedEncounter && generatedEncounter.contentArray" class="encounter-content">
          <div v-for="(item, index) in generatedEncounter.contentArray" :key="index">
            <div v-if="item.format === 'read_aloud'" class="read-aloud-box">
              <p><em>{{ item.content }}</em></p>
            </div>
            <h3 v-else-if="item.format === 'header'">{{ item.content }}</h3>
            <p v-else-if="item.format === 'paragraph'">
              <template v-for="(seg, i) in parseInlineMarkup(item.content)" :key="i">
                <strong v-if="seg.bold">{{ seg.text }}</strong>
                <template v-else>{{ seg.text }}</template>
              </template>
            </p>
          </div>
        </div>

        <!-- Skeleton while Call 2 loads -->
        <div v-if="generatedEncounter.loading_details" class="dm-notes-skeleton">
          <cdr-skeleton>
            <cdr-skeleton-bone style="width: 100%; height: 1rem; margin-bottom: 0.75rem;" />
            <cdr-skeleton-bone style="width: 90%; height: 1rem; margin-bottom: 0.75rem;" />
            <cdr-skeleton-bone style="width: 95%; height: 1rem; margin-bottom: 1.5rem;" />
            <cdr-skeleton-bone style="width: 40%; height: 1.25rem; margin-bottom: 0.75rem;" />
            <cdr-skeleton-bone style="width: 100%; height: 1rem; margin-bottom: 0.75rem;" />
            <cdr-skeleton-bone style="width: 85%; height: 1rem; margin-bottom: 0.75rem;" />
          </cdr-skeleton>
        </div>

        <!-- Monsters section -->
        <div class="encounter-monsters" v-if="!loading && !generatedEncounter.loading_details">
          <h3>Monsters</h3>
          <div v-for="(monster, index) in encounterMonsters" :key="index" class="monster-output">
            <h4>{{ monster.name }} <span class="monster-qty">×{{ monster.quantity }}</span></h4>

            <Statblock v-if="monster.statblock" :monster="monster.statblock" :premium="premium"
              :columns="'two_columns'" />

            <div v-else class="generate-statblock-section">
              <p>Statblock not available for this monster.</p>
              <cdr-button v-if="!monster.loadingStatblock" @click="generateStatblock(index)" modifier="secondary">
                Generate Statblock
              </cdr-button>
              <div v-else class="loading-statblock">
                Generating statblock...
              </div>
            </div>
          </div>
        </div>

        <!-- Inline folder mover -->
        <div class="folder-mover" v-if="showFolderMover && !loading && !generatedEncounter.loading_details">
          <div class="folder-mover-inner">
            <cdr-select v-model="folderMoveTarget" label="Destination folder" prompt="Select a folder"
              :options="folderMoveOptions" />
            <cdr-input v-if="folderMoveTarget === '__new__'" v-model="newFolderName" label="New folder name"
              background="secondary" />
            <cdr-button @click="handleFolderMove" :disabled="!canMoveEncounter">
              Move
            </cdr-button>
          </div>
        </div>

        <!-- Actions inside card -->
        <div class="output-actions" v-if="!loading && !generatedEncounter.loading_details">
          <div class="management-actions">
            <cdr-button modifier="secondary" size="small" @click="showFolderMover = !showFolderMover">
              {{ showFolderMover ? 'Cancel' : 'Move to Folder' }}
            </cdr-button>
            <cdr-button modifier="secondary" size="small" @click="deleteEncounter">
              Delete
            </cdr-button>
          </div>
          <div class="export-action">
            <cdr-button @click="exportToMarkdown">
              Export to Homebrewery
            </cdr-button>
          </div>
        </div>
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { CdrButton, CdrInput, CdrSelect, CdrAccordionGroup, CdrAccordion, CdrTooltip, IconXSm, CdrSkeleton, CdrSkeletonBone } from '@rei/cedar';
import GeneratorLayout from '@/components/GeneratorLayout.vue';
import DataManagerModal from '@/components/DataManagerModal.vue';
import Statblock from '@/components/Statblock.vue';
import MonsterPicker from './components/MonsterPicker.vue';
import EncounterMonsterList from './components/EncounterMonsterList.vue';
import encounterDifficulty from '@/data/encounter-difficulty.json';
import { generateGptResponse } from '@/util/open-ai.mjs';
import {
  buildCall1StructurePrompt,
  buildCall2ScenePrompt,
  buildCall3DetailsPrompt,
  buildMinimalBrief,
  buildTacticalBrief,
  validateCall1Structure,
  validateCall2Scene,
  validateCall3Details,
  processEncounterResponse,
  parseInlineMarkup,
  getReadAloudToneAndCenterpieces,
  getCreatureIntelligence
} from '@/prompts/encounter-prompt.mjs';
import { buildEnrichedMonsterBrief, getEncounterProfile } from '@/util/encounter-enrichment.mjs';
import { convertEncounterToMarkdown } from '@/util/convertToMarkdown.mjs';
import { generateStatblockPart1, completeStatblock } from '@/util/statblock-generator.mjs';
import { canGenerateStatblock } from '@/util/can-generate-statblock.mjs';
import { useToast } from '@/composables/useToast';

const props = defineProps({
  premium: {
    type: Boolean,
    default: false,
  },
});

const toast = useToast();

// ─── CR-to-XP lookup (5e DMG) ────────────────────────────────────────────────
const CR_TO_XP = {
  '0': 10, '1/8': 25, '1/4': 50, '1/2': 100,
  '1': 200, '2': 450, '3': 700, '4': 1100, '5': 1800,
  '6': 2300, '7': 2900, '8': 3900, '9': 5000, '10': 5900,
  '11': 7200, '12': 8400, '13': 10000, '14': 11500, '15': 13000,
  '16': 15000, '17': 18000, '18': 20000, '19': 22000, '20': 25000,
  '21': 33000, '22': 41000, '23': 50000, '24': 62000, '25': 75000,
  '26': 90000, '27': 105000, '28': 120000, '29': 135000, '30': 155000
};

/**
 * Normalize CR values from various formats to the string keys used in CR_TO_XP.
 * Handles: 0.125, 0.25, 0.5, "1/8", "1/4", "1/2", 5, "5", etc.
 */
function normalizeCR(cr) {
  if (cr === undefined || cr === null) return '0';
  const s = String(cr);
  if (s.includes('/')) return s;
  const num = parseFloat(s);
  if (isNaN(num)) return '0';
  if (num === 0.125) return '1/8';
  if (num === 0.25) return '1/4';
  if (num === 0.5) return '1/2';
  return String(Math.floor(num));
}

/**
 * 5e encounter multiplier table (DMG p. 82).
 * Adjusts tier up for small parties (<3) and down for large parties (>5).
 */
function getEncounterMultiplier(monsterCount, partySize) {
  let tier;
  if (monsterCount <= 1) tier = 0;
  else if (monsterCount === 2) tier = 1;
  else if (monsterCount <= 6) tier = 2;
  else if (monsterCount <= 10) tier = 3;
  else if (monsterCount <= 14) tier = 4;
  else tier = 5;

  const multipliers = [1, 1.5, 2, 2.5, 3, 4];

  if (partySize < 3) tier = Math.min(tier + 1, 5);
  else if (partySize > 5) tier = Math.max(tier - 1, 0);

  return multipliers[tier];
}

// ─── State ────────────────────────────────────────────────────────────────────
const encounterMonsters = ref([]);
const partyGroups = ref([{ players: null, level: null }]);
const location = ref('');
const loading = ref(false);
const generatedEncounter = ref(null);

// ─── Template refs for height matching ──────────────────────────────────────
const pickerColumnRef = ref(null);
const partyColumnRef = ref(null);

// ─── localStorage state ──────────────────────────────────────────────────────
const savedEncounters = ref({});
const activeEncounterIndex = ref(null);
const activeFolder = ref('Uncategorized');
const openedFolders = ref({ 'Uncategorized': true });
const showDataManagerModal = ref(false);

// ─── Folder management ───────────────────────────────────────────────────────
const showFolderMover = ref(false);
const folderMoveTarget = ref('');
const newFolderName = ref('');

// ─── Party calculations ──────────────────────────────────────────────────────
const totalPartySize = computed(() =>
  partyGroups.value.reduce((sum, group) => sum + (Number(group.players) || 0), 0)
);

const difficultyThresholds = computed(() => {
  let easy = 0, medium = 0, hard = 0, deadly = 0;
  const table = encounterDifficulty.encounter_difficulty;

  partyGroups.value.forEach(group => {
    const level = Number(group.level) || 0;
    const players = Number(group.players) || 0;
    const levelData = table[level - 1]; // 0-indexed array, level 1 = index 0

    if (levelData && players > 0 && level > 0) {
      easy += levelData.Easy * players;
      medium += levelData.Medium * players;
      hard += levelData.Hard * players;
      deadly += levelData.Deadly * players;
    }
  });

  return { easy, medium, hard, deadly };
});

// ─── Monster XP & Difficulty ─────────────────────────────────────────────────
const totalMonsterCount = computed(() =>
  encounterMonsters.value.reduce((sum, m) => sum + (m.quantity || 1), 0)
);

const rawXp = computed(() =>
  encounterMonsters.value.reduce((sum, m) => {
    const xp = CR_TO_XP[normalizeCR(m.cr)] || 0;
    return sum + (xp * (m.quantity || 1));
  }, 0)
);

const currentEncounterMultiplier = computed(() => {
  if (totalMonsterCount.value === 0) return 1;
  return getEncounterMultiplier(totalMonsterCount.value, totalPartySize.value);
});

const adjustedXp = computed(() => {
  if (totalMonsterCount.value === 0) return 0;
  return Math.floor(rawXp.value * currentEncounterMultiplier.value);
});

const difficultyRating = computed(() => {
  const xp = adjustedXp.value;
  const t = difficultyThresholds.value;
  if (xp === 0) return 'None';
  if (t.easy === 0) return 'Unknown'; // party not configured
  if (xp >= t.deadly) return 'Deadly';
  if (xp >= t.hard) return 'Hard';
  if (xp >= t.medium) return 'Medium';
  if (xp >= t.easy) return 'Easy';
  return 'Trivial';
});

const folderNames = computed(() => {
  return Object.keys(savedEncounters.value).filter(
    key => key !== 'firstGenerationTime' && key !== 'generationCount'
  );
});

const folderMoveOptions = computed(() => {
  const current = activeFolder.value || 'Uncategorized';
  const folders = folderNames.value
    .filter(name => name !== current)
    .map(name => ({ text: name, value: name }));
  folders.push({ text: '＋ Create new folder...', value: '__new__' });
  return folders;
});

const canMoveEncounter = computed(() => {
  if (!folderMoveTarget.value) return false;
  if (folderMoveTarget.value === '__new__' && !newFolderName.value.trim()) return false;
  return true;
});

// ─── Monster management ──────────────────────────────────────────────────────
function addMonster(monster) {
  console.log('=== ADDING MONSTER ===');
  console.log('Monster data:', monster);
  console.log('Has STR?', monster.STR);
  console.log('Has Actions?', monster.Actions);
  console.log('Has Traits?', monster.Traits);

  const existingIndex = encounterMonsters.value.findIndex(
    m => m.name === monster.name && m.source === monster.source
  );

  if (existingIndex !== -1) {
    // Replace object to guarantee reactivity
    encounterMonsters.value[existingIndex] = {
      ...encounterMonsters.value[existingIndex],
      quantity: encounterMonsters.value[existingIndex].quantity + 1
    };
  } else {
    encounterMonsters.value.push({ ...monster, quantity: 1 });
  }
}

// ─── Party management ────────────────────────────────────────────────────────
function addPartyGroup() {
  partyGroups.value.push({ players: null, level: null });
}

function removePartyGroup(index) {
  partyGroups.value.splice(index, 1);
}

function updateGroupPlayers(index, value) {
  const parsed = parseInt(value);
  partyGroups.value[index] = {
    ...partyGroups.value[index],
    players: isNaN(parsed) ? null : Math.max(1, parsed)
  };
}

function updateGroupLevel(index, value) {
  const parsed = parseInt(value);
  partyGroups.value[index] = {
    ...partyGroups.value[index],
    level: isNaN(parsed) ? null : Math.min(20, Math.max(1, parsed))
  };
}

// ─── localStorage management ─────────────────────────────────────────────────
const filteredEncounters = computed(() => savedEncounters.value);

function loadEncounters() {
  try {
    const stored = localStorage.getItem('encounters');
    if (stored) {
      savedEncounters.value = JSON.parse(stored);
    } else {
      savedEncounters.value = { 'Uncategorized': [] };
    }
  } catch (error) {
    console.error('Failed to load encounters from localStorage:', error);
    savedEncounters.value = { 'Uncategorized': [] };
  }
}

function saveToLocalStorage() {
  try {
    localStorage.setItem('encounters', JSON.stringify(savedEncounters.value));
  } catch (error) {
    console.error('Failed to save encounters to localStorage:', error);
  }
}

// ─── Party localStorage persistence ─────────────────────────────────────────
function loadPartyConfig() {
  try {
    const stored = localStorage.getItem('partyConfig');
    if (stored) {
      const config = JSON.parse(stored);
      if (Array.isArray(config) && config.length > 0) {
        partyGroups.value = config;
      }
    }
  } catch (error) {
    console.error('Failed to load party config:', error);
  }
}

function savePartyConfig() {
  try {
    localStorage.setItem('partyConfig', JSON.stringify(partyGroups.value));
  } catch (error) {
    console.error('Failed to save party config:', error);
  }
}

function selectEncounter(folderName, index) {
  activeFolder.value = folderName;
  activeEncounterIndex.value = index;

  const encounter = savedEncounters.value[folderName][index];
  console.log('=== LOADING ENCOUNTER FROM SIDEBAR ===');
  console.log('Folder:', folderName, 'Index:', index);
  console.log('Encounter data:', encounter);
  console.log('Generated encounter:', encounter.generatedEncounter);

  const currentPartyConfig = [...partyGroups.value]; // Save current party config

  // Load encounter data into form
  encounterMonsters.value = encounter.monsters || [];
  partyGroups.value = encounter.partyGroups || currentPartyConfig;
  location.value = encounter.location || '';
  generatedEncounter.value = encounter.generatedEncounter || null;
}

async function newEncounter(folderName = 'Uncategorized') {
  activeFolder.value = folderName;
  activeEncounterIndex.value = null;

  // Reset form — but keep party config (it persists across encounters)
  encounterMonsters.value = [];
  location.value = '';
  generatedEncounter.value = null;

  // Wait for DOM update and trigger resize recalculation
  await nextTick();
  if (partyColumnRef.value && pickerColumnRef.value) {
    const rightHeight = partyColumnRef.value.offsetHeight;
    const pickerHeight = Math.max(400, rightHeight);
    pickerColumnRef.value.style.height = `${pickerHeight}px`;
  }
}

function generateDefaultName() {
  const monsterNames = encounterMonsters.value.slice(0, 2).map(m => m.name).join(', ');
  const locationName = location.value ? ` at ${location.value.substring(0, 20)}` : '';
  return (monsterNames || 'Unnamed Encounter') + locationName;
}

function autoSaveEncounter() {
  // Only autosave if we have an active encounter (selected from sidebar or just generated)
  if (activeEncounterIndex.value === null) return;

  const encounterName = savedEncounters.value[activeFolder.value][activeEncounterIndex.value]?.name || generateDefaultName();

  const encounterData = {
    name: encounterName,
    monsters: encounterMonsters.value,
    partyGroups: partyGroups.value,
    location: location.value,
    generatedEncounter: generatedEncounter.value,
    difficulty: difficultyRating.value,
    adjustedXp: adjustedXp.value,
    timestamp: new Date().toISOString(),
  };

  if (!savedEncounters.value[activeFolder.value]) {
    savedEncounters.value[activeFolder.value] = [];
  }

  savedEncounters.value[activeFolder.value][activeEncounterIndex.value] = encounterData;
  saveToLocalStorage();
}

function saveNewEncounter() {
  const encounterName = generateDefaultName();

  const encounterData = {
    name: encounterName,
    monsters: encounterMonsters.value,
    partyGroups: partyGroups.value,
    location: location.value,
    generatedEncounter: generatedEncounter.value,
    difficulty: difficultyRating.value,
    adjustedXp: adjustedXp.value,
    timestamp: new Date().toISOString(),
  };

  if (!savedEncounters.value[activeFolder.value]) {
    savedEncounters.value[activeFolder.value] = [];
  }

  savedEncounters.value[activeFolder.value].push(encounterData);
  activeEncounterIndex.value = savedEncounters.value[activeFolder.value].length - 1;
  saveToLocalStorage();
}

// ─── Encounter generation ────────────────────────────────────────────────────
/**
 * Determine if encounter should include a named NPC.
 * - Solo creatures always get names (even beasts get reputation names)
 * - Multi-creature encounters get a name if any creature can plausibly lead
 *   (humanoids, fiends, dragons, celestials, fey, giants, aberrations)
 */
function shouldNameCreature(monsters) {
  // If only one creature type and quantity 1, it gets a name
  if (monsters.length === 1 && monsters[0].quantity === 1) return true;

  // Check if any creature is a plausible leader (can speak/lead)
  const leaderTypes = ['humanoid', 'fiend', 'dragon', 'celestial', 'fey', 'giant', 'aberration'];
  return monsters.some(m => {
    const type = (m.creatureType || '').toLowerCase();
    return leaderTypes.some(t => type.includes(t));
  });
}

async function generateEncounter() {
  if (encounterMonsters.value.length === 0) {
    toast.warning('Add at least one monster before generating.');
    return;
  }

  loading.value = true;

  // Set initial loading state to show all skeletons immediately
  generatedEncounter.value = {
    place_name: null,
    centerpiece: null,
    key_npc: null,
    contentArray: null,
    loading_details: true,  // Shows DM notes skeleton
  };

  try {
    // Get creature intelligence data
    const creatureIntel = getCreatureIntelligence(encounterMonsters.value);
    console.log('=== CREATURE INTELLIGENCE ===');
    console.log(creatureIntel);

    // Build monster briefs (minimal for Calls 1+2, tactical for Call 3)
    const baseBrief = buildEnrichedMonsterBrief(encounterMonsters.value);
    const minimalBrief = buildMinimalBrief(baseBrief, creatureIntel);
    const tacticalBrief = buildTacticalBrief(baseBrief, creatureIntel);
    console.log('=== MINIMAL BRIEF (Calls 1+2) ===');
    console.log(minimalBrief);
    console.log('=== TACTICAL BRIEF (Call 3) ===');
    console.log(tacticalBrief);

    const encounterProfile = getEncounterProfile(encounterMonsters.value);
    console.log('=== ENCOUNTER PROFILE ===');
    console.log(encounterProfile);

    const locationText = location.value || '';

    // Determine if encounter should include a named NPC
    const includeNPC = shouldNameCreature(encounterMonsters.value);

    // Get tone and matching centerpieces (uses creature intelligence)
    const { tone, centerpieceShortlist } = getReadAloudToneAndCenterpieces(creatureIntel);
    console.log('=== SELECTED TONE ===');
    console.log(`Tone: ${tone.label}`);
    console.log(`Centerpieces: ${centerpieceShortlist.length} options selected`);

    // ── Call 1: Structure (Story + Metadata) ────────────────────
    const call1Prompt = buildCall1StructurePrompt(
      locationText,
      minimalBrief,
      includeNPC,
      tone,
      centerpieceShortlist
    );
    console.log('=== CALL 1 STRUCTURE PROMPT ===');
    console.log(call1Prompt);
    const call1Response = await generateGptResponse(call1Prompt, validateCall1Structure, 3, undefined, 'gpt-4.1-mini');
    console.log('=== CALL 1 STRUCTURE RESPONSE ===');
    console.log(call1Response);
    const call1Result = JSON.parse(call1Response);
    console.log('=== CALL 1 STRUCTURE PARSED ===');
    console.log(call1Result);

    // ── Call 2: Scene (Read-Aloud Prose) ────────────────────────
    // IMPORTANT: Rebuild minimal brief with call1Result for disguise swapping
    // If call1Result.disguised_as is not null, buildMinimalBrief will replace
    // the disguised creature's true description with the false appearance
    const minimalBriefForCall2 = buildMinimalBrief(baseBrief, creatureIntel, call1Result);
    console.log('=== MINIMAL BRIEF FOR CALL 2 (with disguise swap) ===');
    console.log(minimalBriefForCall2);

    const call2Prompt = buildCall2ScenePrompt(
      call1Result,
      minimalBriefForCall2
    );
    console.log('=== CALL 2 SCENE PROMPT ===');
    console.log(call2Prompt);
    const call2Response = await generateGptResponse(call2Prompt, validateCall2Scene, 3, undefined, 'gpt-4.1-mini');
    console.log('=== CALL 2 SCENE RESPONSE ===');
    console.log(call2Response);
    const call2Result = JSON.parse(call2Response);
    console.log('=== CALL 2 SCENE PARSED ===');
    console.log(call2Result);

    // Show read-aloud immediately while Call 3 runs
    generatedEncounter.value = {
      place_name: call1Result.place_name,
      centerpiece: call1Result.centerpiece.description,
      key_npc: call1Result.key_npc,
      contentArray: [
        { format: 'read_aloud', content: call2Result.encounter_intro }
      ],
      loading_details: true,  // flag for skeleton in DM notes area
    };

    // ── Call 3: Details (4 DM Paragraphs) ────────────────────────
    // Build party description for prompt context
    const partyDesc = partyGroups.value
      .filter(g => g.players && g.level)
      .map(g => `${g.players} players at level ${g.level}`)
      .join(', ');

    const call3Prompt = buildCall3DetailsPrompt(
      call1Result,
      call2Result,
      tacticalBrief,
      locationText,
      difficultyRating.value !== 'None' && difficultyRating.value !== 'Unknown' ? difficultyRating.value : '',
      partyDesc,
      encounterProfile,
      creatureIntel
    );
    console.log('=== CALL 3 DETAILS PROMPT ===');
    console.log(call3Prompt);
    const call3Response = await generateGptResponse(call3Prompt, validateCall3Details, 3, undefined, 'gpt-4.1-mini');
    console.log('=== CALL 3 DETAILS RESPONSE ===');
    console.log(call3Response);
    const call3Result = JSON.parse(call3Response);
    console.log('=== CALL 3 DETAILS PARSED ===');
    console.log(call3Result);

    // Combine all 3 calls into final encounter
    const finalEncounter = processEncounterResponse(call1Result, call2Result, call3Result, baseBrief);
    console.log('=== FINAL ENCOUNTER ===');
    console.log(finalEncounter);

    // Merge into final contentArray
    generatedEncounter.value = {
      ...finalEncounter,
      loading_details: false,
    };

    // Save
    saveNewEncounter();
  } catch (error) {
    console.error('Error generating encounter:', error);
    toast.error('Failed to generate encounter. Please try again.');
    generatedEncounter.value = null;
  } finally {
    loading.value = false;
  }
}

async function resetEncounter() {
  // Clear all encounter data (but keep party config)
  encounterMonsters.value = [];
  location.value = '';
  generatedEncounter.value = null;
  activeEncounterIndex.value = null;

  // Wait for DOM update and trigger resize recalculation
  await nextTick();
  if (partyColumnRef.value && pickerColumnRef.value) {
    const rightHeight = partyColumnRef.value.offsetHeight;
    const pickerHeight = Math.max(400, rightHeight);
    pickerColumnRef.value.style.height = `${pickerHeight}px`;
  }
}

// ─── Folder management ──────────────────────────────────────────────────────
function handleFolderMove() {
  if (activeEncounterIndex.value === null) return;

  const previousActiveFolder = activeFolder.value || 'Uncategorized';
  let targetFolder = folderMoveTarget.value;

  // Create new folder if needed
  if (targetFolder === '__new__') {
    const trimmed = newFolderName.value.trim();
    if (!trimmed) return;
    targetFolder = trimmed;
    savedEncounters.value[targetFolder] = [];
    openedFolders.value[targetFolder] = true;
  }

  // Move encounter
  const encounter = savedEncounters.value[previousActiveFolder][activeEncounterIndex.value];
  savedEncounters.value[previousActiveFolder].splice(activeEncounterIndex.value, 1);

  if (!savedEncounters.value[targetFolder]) {
    savedEncounters.value[targetFolder] = [];
  }
  savedEncounters.value[targetFolder].push(encounter);

  // Update active state
  const newIndex = savedEncounters.value[targetFolder].length - 1;
  activeEncounterIndex.value = newIndex;
  activeFolder.value = targetFolder;

  // Clean up empty folders (except Uncategorized)
  if (savedEncounters.value[previousActiveFolder].length === 0 && previousActiveFolder !== 'Uncategorized') {
    delete savedEncounters.value[previousActiveFolder];
    delete openedFolders.value[previousActiveFolder];
  }

  // Update accordion state
  if (previousActiveFolder !== activeFolder.value) {
    openedFolders.value[previousActiveFolder] = false;
    openedFolders.value[activeFolder.value] = true;
  }

  // Save to localStorage
  localStorage.setItem('encounters', JSON.stringify(savedEncounters.value));

  // Reset form
  showFolderMover.value = false;
  folderMoveTarget.value = '';
  newFolderName.value = '';

  toast.success(`Moved to ${targetFolder}`);
}

function deleteEncounter() {
  if (activeEncounterIndex.value === null) return;

  const encounterName = savedEncounters.value[activeFolder.value]?.[activeEncounterIndex.value]?.name || 'this encounter';

  if (!confirm(`Delete "${encounterName}"? This cannot be undone.`)) return;

  const folderName = activeFolder.value || 'Uncategorized';
  savedEncounters.value[folderName].splice(activeEncounterIndex.value, 1);

  // Reset state
  generatedEncounter.value = null;
  activeEncounterIndex.value = null;

  // Clean up empty folder
  if (savedEncounters.value[folderName].length === 0 && folderName !== 'Uncategorized') {
    delete savedEncounters.value[folderName];
    delete openedFolders.value[folderName];
    activeFolder.value = 'Uncategorized';
    openedFolders.value['Uncategorized'] = true;
  }

  // Save to localStorage
  localStorage.setItem('encounters', JSON.stringify(savedEncounters.value));

  toast.success('Encounter deleted');
}

// ─── Statblock generation ────────────────────────────────────────────────────
async function generateStatblock(index) {
  if (!props.premium && !canGenerateStatblock()) {
    toast.warning('Daily limit reached. Upgrade to premium for unlimited generation.');
    return;
  }

  // Replace object to set loading state (guarantees reactivity)
  encounterMonsters.value[index] = {
    ...encounterMonsters.value[index],
    loadingStatblock: true
  };

  try {
    const monster = encounterMonsters.value[index];
    const part1 = await generateStatblockPart1({
      name: monster.name,
      cr: monster.cr,
      type: monster.type || 'Balanced',
      description: monster.description || '',
      isSpellcaster: monster.isSpellcaster || false,
    }, '');

    const fullStatblock = await completeStatblock(part1, '');

    // Replace object again with statblock data
    encounterMonsters.value[index] = {
      ...encounterMonsters.value[index],
      statblock: fullStatblock,
      loadingStatblock: false
    };
  } catch (error) {
    console.error('Error generating statblock:', error);
    encounterMonsters.value[index] = {
      ...encounterMonsters.value[index],
      loadingStatblock: false
    };
    toast.error('Failed to generate statblock. Please try again.');
  }
}

// ─── Export ───────────────────────────────────────────────────────────────────
async function exportToMarkdown() {
  const markdown = convertEncounterToMarkdown(generatedEncounter.value, encounterMonsters.value);

  try {
    await navigator.clipboard.writeText(markdown);
    toast.success('Encounter copied to clipboard in Homebrewery format!');
  } catch {
    // Fallback for older browsers / non-HTTPS
    const textarea = document.createElement('textarea');
    textarea.textContent = markdown;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    toast.success('Encounter copied to clipboard in Homebrewery format!');
  }
}

// ─── Watchers for autosave ──────────────────────────────────────────────────
watch(encounterMonsters, () => {
  autoSaveEncounter();
}, { deep: true });

watch(partyGroups, () => {
  autoSaveEncounter();
  savePartyConfig();
}, { deep: true });

watch(location, () => {
  autoSaveEncounter();
});

// ─── Lifecycle ────────────────────────────────────────────────────────────────
let resizeObserver = null;

onMounted(() => {
  loadEncounters();
  loadPartyConfig();

  if (partyColumnRef.value) {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rightHeight = entry.contentRect.height;
        if (pickerColumnRef.value) {
          const pickerHeight = Math.max(400, rightHeight);
          pickerColumnRef.value.style.height = `${pickerHeight}px`;
        }
      }
    });
    resizeObserver.observe(partyColumnRef.value);
  }
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/generator-foundation';

/* ════════════════════════════════════════════════════════════════════════════
   ENCOUNTER GENERATOR SPECIFIC STYLES

   Foundation styles are in /src/styles/_generator-foundation.scss
   Only encounter-specific styles belong here.
   ════════════════════════════════════════════════════════════════════════════ */

/* ─── Main container ────────────────────────────────────────────────────── */
.encounter-generator {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

/* ─── Sidebar ───────────────────────────────────────────────────────────── */
.saved-encounters {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 4px;

    @include sidebar-item-active('encounter-button');
  }
}

.encounter-button {
  @include sidebar-item-button;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.encounter-composition {
  flex: 1;
  text-align: left;
  font-weight: 500;

  .quantity {
    font-size: 0.85em;
    font-weight: 400;
    color: #666;
  }
}

/* ─── Difficulty badges ───────────────────────────────────────────────────── */
.difficulty-badge {
  padding: 0.125rem 0.5rem;
  font-weight: 700;
  font-size: 0.75rem;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.difficulty-none {
  background: #f5f5f5;
  color: #9e9e9e;
}

.difficulty-trivial {
  background: #e0e0e0;
  color: #757575;
}

.difficulty-easy {
  background: #c8e6c9;
  color: #2e7d32;
}

.difficulty-medium {
  background: #fff9c4;
  color: #f57f17;
}

.difficulty-hard {
  background: #ffccbc;
  color: #d84315;
}

.difficulty-deadly {
  background: #ffcdd2;
  color: #c62828;
}

/* ─── Form sections ─────────────────────────────────────────────────────── */
.form-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;

  &:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  h2 {
    font-size: 1.25rem;
    margin: 0 0 0.75rem 0;
    color: #333;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}

/* ─── Monster Picker + Party/Encounter (side by side grid) ────────────── */
.monster-party-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 2rem;
}

.picker-column {
  min-width: 0;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 1.25rem;
    margin: 0 0 0.75rem 0;
    color: #333;
    flex-shrink: 0;
  }
}

.party-encounter-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;
}

.party-bar {
  h2 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    margin: 0 0 0.75rem 0;
    color: #333;
  }
}

.threshold-trigger {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #888;
  padding: 0;
  line-height: 1;
}

.threshold-trigger:hover {
  color: #555;
}

.threshold-tooltip-content {
  font-size: 0.8125rem;
  line-height: 1.6;
}

.threshold-tooltip-content strong {
  display: block;
  margin-bottom: 0.25rem;
}

.ambush-checkbox {
  margin-top: 1rem;
}

/* ─── Party Inputs ──────────────────────────────────────────────────────── */
.party-group {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.party-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.party-label {
  font-size: 1.4rem;
  letter-spacing: -0.016rem;
  color: #20201d;
  margin-bottom: 0.4rem;
}

.party-number-input {
  width: 8rem;
  font-family: Graphik, "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.016rem;
  font-size: 1.6rem;
  line-height: 2.2rem;
  color: #20201d;
  border: 0;
  background-color: rgba(244, 242, 237, 0.15);
  box-shadow: inset 0 0 0 0.1rem #928b80;
  border-radius: 0.4rem;
  padding: 0.8rem;
  height: 4rem;
  display: block;
  overflow: visible;
  margin: 0;
  -webkit-appearance: none;
  appearance: none;

  &:hover {
    box-shadow: inset 0 0 0 0.1rem #5f584d;
  }

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 0.2rem #007a5a;
  }
}

.multiply-symbol {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: .6rem;
  color: #5f584d;
}

.generate-button {
  margin-top: 4rem;
}

/* ─── Encounter Output ──────────────────────────────────────────────────── */
.output-card {
  background-color: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 2.5rem 3rem;
  margin-top: 2rem;
}

.output-card h3 {
  margin-bottom: 0.5rem;
}

.output-card p {
  line-height: 1.7;
}

/* Read-aloud box styling (matches RoomDescription.vue) */
.read-aloud-box {
  border: 1px solid #ccc;
  padding: 1em;
  margin: 1.5em 0;
  background-color: #f9f9f9;
  border-radius: 4px;

  p {
    font-style: italic;
    margin: 0;
    line-height: 1.7;
  }
}

/* Encounter content area */
.encounter-content {
  margin-bottom: 2rem;

  h3 {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 1.5rem 0 0.5rem 0;
    color: #333;
  }

  p {
    margin: 0 0 1rem 0;
    line-height: 1.7;
    color: #333;
  }
}

/* Loading skeletons */
.title-skeleton {
  margin-bottom: 1.5rem;
}

.read-aloud-skeleton {
  border: 1px solid #ccc;
  padding: 1em;
  margin: 1.5em 0;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.dm-notes-skeleton {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 4px;
}

.encounter-monsters {
  margin-top: 2rem;
}

.monster-output {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
}

.monster-output:last-child {
  border-bottom: none;
}

.monster-output h4 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.monster-qty {
  font-weight: 400;
  color: #888;
}

.generate-statblock-section {
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 4px;
  text-align: center;
}

.loading-statblock {
  padding: 1rem;
  font-style: italic;
  color: #666;
}

.folder-mover {
  margin-bottom: 1.5rem;
  background-color: #f9f9f9;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  padding: 1.5rem;
}

.folder-mover-inner {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
}

.output-navigation {
  margin-bottom: 1rem;
}

.output-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e5e5;
}

.management-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.export-action {
  flex-shrink: 0;
}

/* ─── Responsive ─────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .encounter-generator {
    padding: 1rem;
  }

  .monster-party-row {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .party-group {
    flex-wrap: wrap;
  }

  .output-card {
    padding: 1.5rem;
    border-radius: 8px;
  }

  .folder-mover-inner {
    flex-direction: column;
    align-items: stretch;
  }

  .output-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .export-action {
    width: 100%;
  }
}
</style>
