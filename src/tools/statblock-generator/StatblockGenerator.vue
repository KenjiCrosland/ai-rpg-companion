<template>
  <GeneratorLayout :premium="premium">
    <template #sidebar>
      <div class="sidebar-content">
        <div class="sidebar-scroll">
          <cdr-accordion-group>
            <cdr-accordion level="3" v-for="(folder, folderName) in filteredMonsters" :key="folderName" :id="folderName"
              :opened="openedFolders[folderName]"
              @accordion-toggle="openedFolders[folderName] = !openedFolders[folderName]">
              <template #label>
                {{ folderName }}
              </template>
              <ul class="saved-statblocks">
                <li v-for="(monsterItem, index) in folder" :key="index"
                  :class="{ 'active': activeMonsterIndex === index && activeFolder === folderName }">
                  <button class="monster-button" @click="selectMonster(folderName, index)" tabindex="0">
                    <span>{{ monsterItem.name }}</span>
                    <span>CR {{ getFirstNumber(monsterItem.challenge_rating) }}</span>
                  </button>
                </li>
                <li>
                  <button class="monster-button" @click="newMonster(folderName)"
                    :class="{ 'active': activeMonsterIndex === null && activeFolder === folderName }">
                    + New Monster Statblock</button>
                </li>
              </ul>
            </cdr-accordion>
          </cdr-accordion-group>
        </div>
      </div>
    </template>

    <div class="generator-container">
      <div class="landing-wrapper" v-if="!monster && !loadingPart1 && !loadingPart2">
        <!-- ZONE 1: Brand + Headline (lives outside the card) -->
        <div class="hero-header">
          <div class="brand-line">
            <span class="brand-name">Kenji's Statblock Generator</span>
            <span v-if="!premium" class="version-pill">Free</span>
            <span v-else class="version-pill premium">Premium</span>
          </div>
          <h1>Build Custom D&D 5e Monsters in Seconds</h1>
          <p class="value-prop">Create balanced, export-ready 5e statblocks — no math required.</p>
          <p class="export-formats">Exports to Roll20, Homebrewery, Foundry VTT, and Improved Initiative</p>
        </div>

        <!-- ZONE 2: The form card -->
        <div class="form-card">
          <form @submit.prevent="generateStatblock" class="monster-form">
            <div class="form-row-top">
              <cdr-input id="monsterName" v-model="monsterName" background="secondary"
                :label="'Monster Name (Example: Headless Horseman)'" />
              <cdr-select v-model="monsterType" label="type"
                :options="['Random', 'Stronger Defense', 'Balanced', 'Stronger Offense']" />
              <cdr-select v-model="selectedChallengeRating" label="CR" prompt="CR"
                :options="challengeRatingData.fullArray" />
            </div>
            <div class="form-row-mid">
              <cdr-input v-model="monsterDescription" :optional="true" label='Description / Special Instructions'
                placeholder='E.g. "Flying speed of 60ft", "Can turn invisible once per day", "Output statblock in German"'
                :rows="4" />
            </div>
            <div class="form-row-end">
              <cdr-checkbox v-model="caster">Creature is a spellcaster</cdr-checkbox>
            </div>

            <cdr-button :disabled="loadingPart1 || loadingPart2" class="monster-form-button" type="submit">
              {{ activeMonsterIndex !== null ? 'Regenerate Monster' : 'Generate Monster' }}
            </cdr-button>
          </form>
        </div>

        <!-- ZONE 3: Secondary info (below the card, low-key) -->
        <div class="footer-meta">
          <!-- Free users: Show message + unlock button -->
          <div v-if="!premium">
            <p>
              Free: 5 generations per 24 hours (includes re-generations). Unlock unlimited generations and save/load
              data
              across browsers with a premium Patreon subscription.
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

          <!-- Premium users: Show message -->
          <div v-else>
            <p>
              Unlimited generations. Statblock data is saved on this browser. Export to a file to use on another device.
            </p>
            <cdr-button modifier="dark" @click="showDataManagerModal = true">
              Save/Load Data from a File
            </cdr-button>
          </div>
        </div>
      </div>

      <cdr-toggle-group v-if="shouldDisplayInterface && canSwitchColumns && (monster || loadingPart1 || loadingPart2)"
        v-model="userColumnsPreference" style="margin: 2cap;auto">
        <cdr-toggle-button toggleValue="one_column">1 Column</cdr-toggle-button>
        <cdr-toggle-button toggleValue="two_columns">2 Columns</cdr-toggle-button>
      </cdr-toggle-group>
      <Statblock v-if="!errorMessage && (loadingPart1 || loadingPart2 || monster)" :loadingPart1="loadingPart1"
        :width="850" :loadingPart2="loadingPart2" :monster="monster" :columns="userColumnsPreference" :premium="premium"
        :linked-npcs-count="linkedNPCs.length" @update-monster="updateMonster"
        @move-to-folder="showFolderMover = !showFolderMover" @use-in-encounter="useInEncounter" @create-npc="createNPC"
        @delete="deleteStatblock" @can-switch-columns="canSwitchColumns = $event"
        @toggle-export="showExports = !showExports" />

      <!-- Linked NPCs (appears when references exist) -->
      <div v-if="linkedNPCs.length > 0 && monster && !loadingPart2" class="linked-npcs">
        Linked NPCs:
        <span v-for="(npc, index) in linkedNPCs" :key="npc.npc_id">
          <a href="#" @click.prevent="navigateToLinkedNPC(npc.folder, npc.name)" class="linked-npc-link">{{ npc.name
          }}</a><span v-if="index < linkedNPCs.length - 1">, </span>
        </span>
      </div>

      <!-- Inline folder mover (appears when toggled) -->
      <div class="folder-mover" v-if="showFolderMover && monster && !loadingPart2">
        <div class="folder-mover-inner">
          <cdr-select v-model="folderMoveTarget" label="Destination folder" prompt="Select a folder"
            :options="folderMoveOptions" />
          <cdr-input v-if="folderMoveTarget === '__new__'" v-model="newFolder" label="New folder name"
            background="secondary" />
          <cdr-button @click="handleFolderMove" :disabled="!canMove">
            Move
          </cdr-button>
        </div>
      </div>

      <!-- Export options (appears when toggled) -->
      <StatblockExports v-if="showExports && monster && !loadingPart2" :monster="monster"
        :loading="loadingPart1 || loadingPart2" :columns="userColumnsPreference" />

      <!-- Footer below monster content -->
      <div class="footer-meta" v-if="monster && !loadingPart2">
        <!-- Free users: Show message + unlock button -->
        <div v-if="!premium">
          <p>
            Free: 5 generations per 24 hours (includes re-generations). Unlock unlimited generations and save/load data
            across browsers with a premium Patreon subscription.
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

        <!-- Premium users: Show message -->
        <div v-else>
          <p>
            Unlimited generations. Statblock data is saved on this browser. Export to a file to use on another device.
          </p>
          <cdr-button modifier="dark" @click="showDataManagerModal = true">
            Save/Load Data from a File
          </cdr-button>
        </div>
      </div>
    </div>

    <DataManagerModal :opened="showDataManagerModal" @update:opened="showDataManagerModal = $event" :premium="premium"
      currentApp="monsters" />
  </GeneratorLayout>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, reactive } from 'vue';
import Statblock from '@/components/Statblock.vue';
import GeneratorLayout from '@/components/GeneratorLayout.vue';
import { generateGptResponse } from "@/util/ai-client.mjs";
import { CdrInput, CdrButton, CdrLink, CdrCheckbox, CdrSelect, CdrToggleButton, CdrToggleGroup, CdrAccordion, CdrAccordionGroup, CdrList, IconDownload, IconUpload } from "@rei/cedar";
import "@rei/cedar/dist/style/cdr-input.css";
import "@rei/cedar/dist/style/cdr-list.css";
import "@rei/cedar/dist/style/cdr-button.css";
import "@rei/cedar/dist/style/cdr-checkbox.css";
import "@rei/cedar/dist/style/cdr-select.css";
import "@rei/cedar/dist/style/cdr-toggle-group.css";
import "@rei/cedar/dist/style/cdr-toggle-button.css";
import StatblockExports from './components/StatblockExports.vue';
import DataManagerModal from '@/components/DataManagerModal.vue';
import challengeRatingData from '@/data/challengeRatings.json';
import creatureTemplates from '@/data/creatureTemplates.json';
import { createStatblockPrompts } from "@/prompts/monster-prompts.mjs";
import { canGenerateStatblock } from "@/util/can-generate-statblock.mjs";
import { QUOTA_FIELDS, RESERVED_HOST_FIELDS } from "@/util/quota-storage.mjs";
import { renameStatblockReferences } from '@/util/statblock-storage.mjs';
import { navigateToTool } from '@/util/navigation.mjs';
import { useToast } from '@/composables/useToast';
import { getReferencesForEntity } from '@/util/reference-storage.mjs';

const toast = useToast();

const props = defineProps({
  premium: {
    type: Boolean,
    default: false
  }
})

const patreonLoginUrl = computed(() => {
  const returnUrl = encodeURIComponent(window.location.href);
  return `https://cros.land/patreon-flow/?patreon-login=yes&patreon-final-redirect=${returnUrl}`;
});

const loadingPart1 = ref(false);
const loadingPart2 = ref(false);
const monsterName = ref('');
const monsterType = ref('Random');
const monsterDescription = ref('');
const selectedChallengeRating = ref(null);
const monster = ref(null);
const caster = ref(false);
const errorMessage = ref('');
const windowWidth = ref(window.innerWidth);
const monsters = ref({ 'Uncategorized': [] });
const newFolder = ref('');
const activeFolder = ref('Uncategorized');
const openedFolders = reactive({ 'Uncategorized': true });
const userColumnsPreference = ref('two_columns');
const canSwitchColumns = ref(true);
const shouldDisplayInterface = computed(() => windowWidth.value > 855);
// Filter out wrapper-owned fields (current quota fields plus legacy
// pre-Pillar-B quota fields that may still be on the host until
// migration runs) so they never surface as folders in the sidebar.
const folderNames = computed(() =>
  Object.keys(monsters.value).filter((k) => !RESERVED_HOST_FIELDS.includes(k))
);
const filteredMonsters = computed(() => {
  const filtered = { ...monsters.value };
  for (const k of RESERVED_HOST_FIELDS) delete filtered[k];
  return filtered;
});
const showDataManagerModal = ref(false);
const showFolderMover = ref(false);
const showExports = ref(false);
const folderMoveTarget = ref('');

const folderMoveOptions = computed(() => {
  const current = activeFolder.value;
  const folders = folderNames.value
    .filter(name => name !== current)
    .map(name => ({ text: name, value: name }));
  folders.push({ text: '＋ Create new folder...', value: '__new__' });
  return folders;
});

const canMove = computed(() => {
  if (!folderMoveTarget.value) return false;
  if (folderMoveTarget.value === '__new__') return newFolder.value.trim().length > 0;
  return true;
});

// Reactive trigger that bumps when NPC storage / tool-references change
// in this tab or another. Read inside `linkedNPCs` so the computed re-
// evaluates when the underlying localStorage caches change (e.g., user
// renamed an NPC in the NPC Generator and the linked-NPC display here
// needs to follow). Without this, `getReferencesForEntity` and the
// localStorage scan are non-reactive and only refresh on page reload.
const storageVersion = ref(0);

const linkedNPCs = computed(() => {
  // Track the storageVersion so this computed re-runs on storage events.
  // eslint-disable-next-line no-unused-expressions
  storageVersion.value;

  if (!monster.value || !activeFolder.value) return [];

  const statblockId = `${monster.value.name}__${activeFolder.value}`;
  const references = getReferencesForEntity('statblock', statblockId);

  // Filter for has_statblock relationships where this statblock is the target
  const linkedRefs = references.filter(
    ref => ref.relationship === 'has_statblock' && ref.target_type === 'statblock'
  );

  // Look up each NPC in localStorage to find its folder
  // Note: We need error handling here because localStorage can be corrupted
  // (e.g., if user manually edited it, browser storage got corrupted, etc.)
  // Rather than crash the entire component, we gracefully degrade to empty object
  let npcGeneratorNPCs = {};
  try {
    npcGeneratorNPCs = JSON.parse(localStorage.getItem('npcGeneratorNPCs') || '{}');
  } catch (error) {
    console.warn('Failed to parse npcGeneratorNPCs from localStorage:', error);
    // Default to empty object - linked NPCs will show "Uncategorized" folder
  }

  return linkedRefs.map(ref => {
    // Find which folder contains this NPC
    let npcFolder = 'Uncategorized';
    for (const [folderName, npcsInFolder] of Object.entries(npcGeneratorNPCs)) {
      if (Array.isArray(npcsInFolder)) {
        const foundNPC = npcsInFolder.find(npc =>
          npc.npc_id === ref.source_id || npc.id === ref.source_id
        );
        if (foundNPC) {
          npcFolder = folderName;
          break;
        }
      }
    }

    return {
      name: ref.source_name,
      folder: npcFolder,
      npc_id: ref.source_id
    };
  });
});


onMounted(() => {
  const savedMonsters = localStorage.getItem('monsters');
  if (savedMonsters) {
    let allData = JSON.parse(savedMonsters);
    allData['Uncategorized'] = allData['Uncategorized'] || [];
    monsters.value = allData;
  } else {
    monsters.value = { 'Uncategorized': [] };
  }

  // Check for URL parameters to open a specific statblock
  const urlParams = new URLSearchParams(window.location.search);
  const monsterName = urlParams.get('monster');
  const folderName = urlParams.get('folder');

  if (monsterName) {
    // Check specified folder first
    if (folderName && monsters.value[folderName]) {
      const index = monsters.value[folderName].findIndex(
        m => m.name === monsterName
      );
      if (index !== -1) {
        // Open this folder and select this statblock
        openedFolders[folderName] = true;
        selectMonster(folderName, index);
        // Clean URL
        window.history.replaceState({}, '', window.location.pathname);
      }
    } else {
      // Fallback: search all folders
      for (const [folder, monstersInFolder] of Object.entries(monsters.value)) {
        if (!Array.isArray(monstersInFolder)) continue;
        const index = monstersInFolder.findIndex(m => m.name === monsterName);
        if (index !== -1) {
          openedFolders[folder] = true;
          selectMonster(folder, index);
          window.history.replaceState({}, '', window.location.pathname);
          break;
        }
      }
    }
  }

  updateWindowWidth();
  window.addEventListener('resize', updateWindowWidth);

  // Storage event wiring: bump `storageVersion` whenever NPC data or the
  // reference graph changes so the linked-NPCs panel reflects renames /
  // new attachments / detachments without requiring a page reload.
  // - `storage`: fires for changes from OTHER tabs.
  // - `npc-storage-updated`: same-tab custom event dispatched by the
  //   shared NPC-rename and save helpers.
  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('npc-storage-updated', handleNPCStorageUpdate);
});

function handleStorageChange(event) {
  if (
    event.key === 'tool-references'
    || event.key === 'npcGeneratorNPCs'
    || event.key === null
  ) {
    storageVersion.value++;
  }
}

function handleNPCStorageUpdate() {
  storageVersion.value++;
}

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
  window.removeEventListener('storage', handleStorageChange);
  window.removeEventListener('npc-storage-updated', handleNPCStorageUpdate);
});

const activeMonsterIndex = ref(null);

function getFirstNumber(text) {
  const parts = text.split(' ');
  for (let part of parts) {
    if (/^\d+\/\d+$/.test(part) || /^\d+(\.\d+)?$/.test(part)) {
      return part;
    }
  }
  return null;
}

function fractionToDecimal(fraction) {
  if (fraction.includes('/')) {
    const [numerator, denominator] = fraction.split('/').map(Number);
    return numerator / denominator;
  }
  return parseFloat(fraction);
}

function sortMonstersByCR(folderName) {
  return monsters.value[folderName].sort((a, b) => {
    const crA = fractionToDecimal(getFirstNumber(a.challenge_rating));
    const crB = fractionToDecimal(getFirstNumber(b.challenge_rating));
    return crA - crB;
  });
}

function newMonster(folderName = 'Uncategorized') {
  activeFolder.value = folderName;
  activeMonsterIndex.value = null;
  monster.value = null;
  monsterName.value = '';
  monsterType.value = 'Random';
  monsterDescription.value = '';
  selectedChallengeRating.value = null;
}

function updateMonster(updatedMonster) {
  // Store old name to detect renames
  const oldMonster = monsters.value[activeFolder.value][activeMonsterIndex.value];
  const oldName = oldMonster?.name;
  const newName = updatedMonster.name;

  // Update the monster
  monster.value = updatedMonster;
  monsters.value[activeFolder.value][activeMonsterIndex.value] = updatedMonster;
  // Build the save payload from in-memory user data only — drop any
  // wrapper-owned fields (current quota or legacy) that may have been
  // loaded into `monsters.value`. Then copy the latest quota fields
  // forward from localStorage so generate gates and saves don't
  // clobber each other's writes on this key.
  const stored = JSON.parse(localStorage.getItem('monsters')) || {};
  const dataToStore = { ...monsters.value };
  for (const key of RESERVED_HOST_FIELDS) delete dataToStore[key];
  for (const key of QUOTA_FIELDS) {
    if (stored[key] !== undefined) dataToStore[key] = stored[key];
  }
  localStorage.setItem('monsters', JSON.stringify(dataToStore));

  // If the name changed, update all references across other tools
  if (oldName && newName && oldName !== newName) {
    const result = renameStatblockReferences(oldName, newName);
    if (result.totalUpdated > 0) {
      toast.success(`Renamed "${oldName}" to "${newName}" and updated ${result.totalUpdated} reference${result.totalUpdated > 1 ? 's' : ''} in other tools`);
    }
  }
}

function selectMonster(folderName = 'Uncategorized', index) {
  activeFolder.value = folderName;
  activeMonsterIndex.value = index;
  monster.value = monsters.value[folderName][index];
  monsterName.value = monster.value.name;
  monsterType.value = monster.value.monsterType || 'Random';
  monsterDescription.value = monster.value.monsterDescription || '';
  selectedChallengeRating.value = monster.value.selectedChallengeRating || getFirstNumber(monster.value.challenge_rating);
  caster.value = monster.value.caster;
}

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

function validationPart1(jsonString) {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = [
      'armor_class',
      'hit_points',
      'speed',
      'senses',
      'languages',
      'challenge_rating',
      'proficiency_bonus',
      'abilities'
    ];
    return keys.every((key) => key in jsonObj);
  } catch (error) {
    return false;
  }
}

function validationPart2(jsonString) {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = [
      'actions'
    ];
    return keys.every((key) => key in jsonObj);
  } catch (error) {
    return false;
  }
}

function handleFolderMove() {
  if (activeMonsterIndex.value === null) return;

  const targetFolder = folderMoveTarget.value === '__new__'
    ? newFolder.value.trim()
    : folderMoveTarget.value;

  if (!targetFolder) return;

  const currentMonsterName = monsters.value[activeFolder.value][activeMonsterIndex.value].name;
  const previousActiveFolder = activeFolder.value;

  // Create folder if new
  if (!monsters.value[targetFolder]) {
    monsters.value[targetFolder] = [];
  }

  // Move the monster
  monsters.value[targetFolder].push(...monsters.value[previousActiveFolder].splice(activeMonsterIndex.value, 1));
  activeFolder.value = targetFolder;

  // Clean up empty folders (except Uncategorized)
  if (monsters.value[previousActiveFolder].length === 0 && previousActiveFolder !== 'Uncategorized') {
    delete monsters.value[previousActiveFolder];
  }

  // Update accordion state
  if (previousActiveFolder !== activeFolder.value) {
    openedFolders[previousActiveFolder] = false;
  }
  if (!openedFolders[activeFolder.value]) {
    openedFolders[activeFolder.value] = true;
  }

  // Sort and re-select
  monsters.value[activeFolder.value] = sortMonstersByCR(activeFolder.value);
  // Build the save payload from in-memory user data only — drop any
  // wrapper-owned fields (current quota or legacy) that may have been
  // loaded into `monsters.value`. Then copy the latest quota fields
  // forward from localStorage so generate gates and saves don't
  // clobber each other's writes on this key.
  const stored = JSON.parse(localStorage.getItem('monsters')) || {};
  const dataToStore = { ...monsters.value };
  for (const key of RESERVED_HOST_FIELDS) delete dataToStore[key];
  for (const key of QUOTA_FIELDS) {
    if (stored[key] !== undefined) dataToStore[key] = stored[key];
  }
  const newIndex = monsters.value[activeFolder.value].findIndex(m => m.name === currentMonsterName);
  selectMonster(activeFolder.value, newIndex);
  localStorage.setItem('monsters', JSON.stringify(dataToStore));

  // Reset and close
  showFolderMover.value = false;
  folderMoveTarget.value = '';
  newFolder.value = '';
  toast.success(`Moved to ${targetFolder}.`);
}

function useInEncounter() {
  if (!monster.value) return;
  navigateToTool('encounter-generator', {
    monster: monster.value.name
  });
}

function createNPC() {
  if (!monster.value) return;

  // Navigate to NPC generator with statblock info
  navigateToTool('npc-generator', {
    statblock: monster.value.name,
    folder: activeFolder.value || 'Uncategorized'
  });
}

function navigateToLinkedNPC(npcFolder, npcName) {
  navigateToTool('npc-generator', {
    folder: npcFolder,
    npc_name: npcName
  });
}

async function deleteStatblock() {
  if (!confirm(`Delete "${monster.value.name}"? This cannot be undone.`)) return;

  const deletedName = monster.value.name;
  const folderName = activeFolder.value || 'Uncategorized';
  const statblockId = `${deletedName}__${folderName}`;

  // Remove references for this statblock
  import('@/util/reference-storage.mjs').then(({ removeReferencesForEntity }) => {
    removeReferencesForEntity('statblock', statblockId);
  });

  monsters.value[folderName].splice(activeMonsterIndex.value, 1);
  monster.value = null;
  activeMonsterIndex.value = null;
  if (monsters.value[folderName].length === 0 && folderName !== 'Uncategorized') {
    delete monsters.value[folderName];
    activeFolder.value = 'Uncategorized';
    if (!openedFolders['Uncategorized']) {
      openedFolders['Uncategorized'] = true;
    }
  }
  // Build the save payload from in-memory user data only — drop any
  // wrapper-owned fields (current quota or legacy) that may have been
  // loaded into `monsters.value`. Then copy the latest quota fields
  // forward from localStorage so generate gates and saves don't
  // clobber each other's writes on this key.
  const stored = JSON.parse(localStorage.getItem('monsters')) || {};
  const dataToStore = { ...monsters.value };
  for (const key of RESERVED_HOST_FIELDS) delete dataToStore[key];
  for (const key of QUOTA_FIELDS) {
    if (stored[key] !== undefined) dataToStore[key] = stored[key];
  }
  localStorage.setItem('monsters', JSON.stringify(dataToStore));

  // Delete associated intelligence data
  try {
    const { deleteEnrichment } = await import('@/util/statblock-enrichment.mjs');
    deleteEnrichment(deletedName);
  } catch (error) {
    console.warn(`[ENRICHMENT] Failed to delete intelligence for ${deletedName}:`, error);
  }
}

async function generateStatblock() {
  monster.value = null;
  errorMessage.value = '';
  const canGenerate = await canGenerateStatblock(props.premium);

  if (!canGenerate) {
    return;
  }
  loadingPart1.value = true;
  loadingPart2.value = true;
  const randomCR = Math.floor(Math.random() * 30) + 1;

  const promptOptions = {
    monsterName: monsterName.value,
    challengeRating: selectedChallengeRating.value || randomCR.toString(),
    monsterType: monsterType.value,
    monsterDescription: monsterDescription.value,
    caster: caster.value
  };

  const monsterPrompts = createStatblockPrompts(promptOptions);

  let monsterStatsPart1;
  try {
    monsterStatsPart1 = await generateGptResponse(monsterPrompts.part1, validationPart1, 3);
    if (!monsterStatsPart1) throw new Error('Empty statblock response part 1');
  } catch (e) {
    errorMessage.value = e.message;
    toast.error('Failed to generate statblock. Please try again.');
    loadingPart1.value = false;
    return;
  }

  monster.value = JSON.parse(monsterStatsPart1);
  loadingPart1.value = false;
  const previousContext = [
    { role: 'user', content: `Please give me the first part of a D&D statblock in the following format` },
    { role: 'system', content: `${monsterStatsPart1}` }
  ];

  let monsterStatsPart2;
  try {
    monsterStatsPart2 = await generateGptResponse(monsterPrompts.part2, validationPart2, 3, previousContext);
  } catch (e) {
    errorMessage.value = e.message;
    toast.error('Failed to generate statblock. Please try again.');
    loadingPart2.value = false;
    return;
  }

  const finalMonster = {
    ...JSON.parse(monsterStatsPart1),
    ...JSON.parse(monsterStatsPart2),
  };

  finalMonster.monsterDescription = monsterDescription.value;
  finalMonster.monsterType = monsterType.value;
  finalMonster.selectedChallengeRating = selectedChallengeRating.value || getFirstNumber(finalMonster.challenge_rating);
  finalMonster.monsterName = monsterName.value || monster.name;
  finalMonster.caster = caster.value;

  // Save and display statblock immediately
  if (activeMonsterIndex.value !== null) {
    monsters.value[activeFolder.value][activeMonsterIndex.value] = finalMonster;
    monsters.value[activeFolder.value] = sortMonstersByCR(activeFolder.value);
    const newIndex = monsters.value[activeFolder.value].findIndex(monster => monster.name === finalMonster.name);
    selectMonster(activeFolder.value, newIndex);
  } else {
    const folderName = activeFolder.value || 'Uncategorized';
    if (!monsters.value[folderName]) {
      monsters.value[folderName] = [];
    }
    monster.value = finalMonster;
    monsters.value[folderName].push(finalMonster);
    monsters.value[folderName] = sortMonstersByCR(folderName);
    const newIndex = monsters.value[folderName].findIndex(monster => monster.name === finalMonster.name);
    selectMonster(folderName, newIndex);
  }
  // Build the save payload from in-memory user data only — drop any
  // wrapper-owned fields (current quota or legacy) that may have been
  // loaded into `monsters.value`. Then copy the latest quota fields
  // forward from localStorage so generate gates and saves don't
  // clobber each other's writes on this key.
  const stored = JSON.parse(localStorage.getItem('monsters')) || {};
  const dataToStore = { ...monsters.value };
  for (const key of RESERVED_HOST_FIELDS) delete dataToStore[key];
  for (const key of QUOTA_FIELDS) {
    if (stored[key] !== undefined) dataToStore[key] = stored[key];
  }
  localStorage.setItem('monsters', JSON.stringify(dataToStore));
  loadingPart2.value = false;
  toast.success('Statblock generated and saved.');

  // Enrich custom statblock in background (non-blocking)
  try {
    const { enrichCustomStatblock, saveEnrichment } = await import('@/util/statblock-enrichment.mjs');
    const enrichment = await enrichCustomStatblock(finalMonster);
    saveEnrichment(finalMonster.name, enrichment);
  } catch (error) {
    console.warn(`[ENRICHMENT] Failed to enrich ${finalMonster.name}:`, error);
    // Non-fatal: statblock still works, just won't have intelligence data for encounters
  }
}
</script>

<style lang="scss" scoped>
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';


.sidebar-content {
  $background-color: #f4f4f4;
  $active-color: #ffffff;
  $hover-background-color: #f0f0f0;
  $default-background-color: #e0e0e0;
  $active-border-color: #007BFF;
  $indentation-step: 20px;
  $transition-speed: 0.3s;

  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .sidebar-scroll {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
  }

  .saved-statblocks {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 4px;

      &.active {
        .monster-button {
          background-color: $active-color;
          border-left-color: $active-border-color;
          font-weight: bold;
        }
      }

      .monster-button {
        width: 100%;
        display: flex;
        justify-content: space-between;
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
          font-weight: bold;
        }
      }
    }
  }
}

/* ========================================
   LANDING PAGE: Three-zone layout
   ======================================== */

.landing-wrapper {
  max-width: 855px;
  margin: 0 auto;
}

/* ZONE 1: Hero header — brand, headline, value prop */
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
  }

  .export-formats {
    font-size: 1.3rem;
    font-weight: 500;
    color: #666;
    margin: 0.75rem 0 0 0;
  }
}

/* ZONE 2: Form card — elevated, clearly interactive */
.form-card {
  background-color: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 2.5rem 3rem;
}

/* ZONE 3: Footer meta — limit info, upsell */
.footer-meta {
  text-align: center;
  margin-top: 1.5rem;
  padding: 1rem 1.5rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  max-width: 940px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;

  p {
    font-size: 1.4rem;
    color: #6b7280;
    margin: 0 0 1rem 0;
    line-height: 1.6;
  }

  .limit-info {
    font-size: 1.2rem;
    color: #6b7280;
    margin: 0;
    line-height: 1.6;
  }
}

.patreon-universal-button {
  margin-top: 1rem;

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
    font-size: 1.2rem;
    font-variant: small-caps;
    text-decoration: none;
    border-radius: 6px;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: none;

    &:hover {
      background: #e63946;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .patreon_logo {
    width: 20px;
    height: 20px;
  }
}

/* ========================================
   FORM INTERNALS
   ======================================== */

.form-row-top {
  display: grid;
  grid-template-columns: 4fr 1.5fr .5fr;
  gap: 2rem;
}

@media screen and (max-width: 1300px) {
  .form-row-top {
    grid-template-columns: 1fr;
  }
}

.form-row-mid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.form-row-end {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

#monsterType {
  width: 580px;
}

.generator-container {
  height: 100vh;
  min-height: 100dvh;
  overflow-y: auto;
  overflow-x: visible;
  max-width: 940px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}

.monster-form {
  display: flex;
  flex-direction: column;

  button {
    align-self: flex-start;
    margin-top: 1.5rem;
  }
}

.intro-container {
  max-width: 855px;
  margin: 5px 20px;
  padding: 0 1.5rem;
}

/* ========================================
   ACTION BAR + FOLDER MOVER
   ======================================== */

.action-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  max-width: 850px;
}

.folder-mover {
  max-width: 850px;
  margin-bottom: 2rem;
  background-color: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  margin: auto;
}

.folder-mover-inner {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
}

.linked-npcs {
  max-width: 850px;
  margin: 0 auto 2rem auto;
  padding: 0.75rem;
  color: #6b7280;
  font-size: 1.4rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
}

.linked-npc-link {
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #374151;
    text-decoration: underline;
  }
}

@media screen and (max-width: 600px) {
  .action-bar {
    flex-direction: column;
  }

  .folder-mover-inner {
    flex-direction: column;
    align-items: stretch;
  }
}

@media screen and (max-width: 1300px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 600px) {
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
}

.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>