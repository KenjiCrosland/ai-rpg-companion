<template>
  <GeneratorLayout :premium="premium">
    <template #sidebar>
      <div class="sidebar-content parchment">
        <div class="sidebar-scroll">
          <ParAccordionGroup>
            <ParAccordion
              v-for="(folder, folderName) in filteredMonsters"
              :key="folderName"
              :id="`sb-folder-${folderName}`"
              :label="folderName"
              :count="folder.length"
              :level="3"
              :content-spacing="false"
              :opened="!!openedFolders[folderName]"
              @accordion-toggle="openedFolders[folderName] = !openedFolders[folderName]"
            >
              <ul class="statblock-list">
                <li
                  v-for="(monsterItem, index) in folder"
                  :key="index"
                  class="statblock-row"
                  :class="{ 'statblock-row--active': activeMonsterIndex === index && activeFolder === folderName }"
                >
                  <button class="statblock-row__button" @click="selectMonster(folderName, index)">
                    <span class="statblock-row__name">{{ monsterItem.name }}</span>
                    <span class="statblock-row__cr">
                      <span class="statblock-row__cr-label">CR</span> {{ getFirstNumber(monsterItem.challenge_rating) }}
                    </span>
                  </button>
                </li>
                <li class="statblock-row statblock-row--new">
                  <button
                    class="statblock-row__button statblock-row__new"
                    :class="{ 'statblock-row__new--active': activeMonsterIndex === null && activeFolder === folderName }"
                    @click="newMonster(folderName)"
                  >
                    + New monster statblock
                  </button>
                </li>
              </ul>
            </ParAccordion>
          </ParAccordionGroup>
        </div>

        <SidebarFooter
          new-label="+ New monster statblock"
          data-description="Save your library to a file or restore from a backup. Your data stays on your device."
          backup-label="Backup / Restore library"
          delete-all-label="Delete all statblocks"
          confirm-title="Delete all statblocks?"
          confirm-body="This will permanently delete every saved statblock in your library. This action cannot be undone."
          confirm-suggestion="Consider backing up your library first if you might want to restore these later."
          confirm-cta="Delete all statblocks"
          @new="newMonster(activeFolder)"
          @open-data-manager="showDataManagerModal = true"
          @delete-all="deleteAllMonsters"
        />
      </div>
    </template>

    <div class="generator-container">
      <div class="landing-wrapper" v-if="!monster && !loadingPart1 && !loadingPart2">
        <!-- ZONE 1: Hero header (lapis editorial register, matches the Item
             Generator) -->
        <div class="hero-header parchment">
          <div class="brand-line">
            <span class="brand-name">Kenji's Statblock Generator</span>
            <VersionBadge :premium="premium" />
          </div>
          <h1 class="page-heading__title">Build custom D&D 5e monsters in seconds</h1>
          <p class="page-heading__tagline">Create balanced, export-ready 5e statblocks — no math required.</p>
          <p class="page-heading__formats">Exports to Roll20, Homebrewery, Foundry VTT, and Improved Initiative</p>
        </div>

        <!-- ZONE 2: Form card — lifted cream surface, lapis "magic UI" -->
        <div class="form-card parchment paper-grain">
          <h2 class="form-heading">Generate a monster statblock</h2>
          <form @submit.prevent="generateStatblock" class="monster-form">
            <ParField label="Monster name" :optional="true">
              <ParInput id="monsterName" v-model="monsterName"
                placeholder="Headless Horseman, or leave blank for a random monster" />
            </ParField>

            <ParToggleGroup v-model="format" aria-label="Statblock rules version" class="format-toggle">
              <ParToggleButton toggleValue="2024">2024 rules</ParToggleButton>
              <ParToggleButton toggleValue="2014">2014 rules</ParToggleButton>
            </ParToggleGroup>

            <div class="form-grid">
              <ParField v-if="format === '2014'" label="Build">
                <ParSelect v-model="monsterType"
                  :options="['Random', 'Stronger Defense', 'Balanced', 'Stronger Offense']" />
              </ParField>
              <ParField v-else label="Combat role">
                <ParSelect v-model="archetype" :options="archetypeOptions" />
              </ParField>
              <ParField label="Challenge rating">
                <ParSelect v-model="selectedChallengeRating" :options="challengeRatingData.fullArray" placeholder="CR" />
              </ParField>
            </div>
            <p v-if="format === '2024'" class="archetype-help">{{ archetypeHelp }}</p>

            <ParField label="Description / special instructions" :optional="true">
              <ParTextarea v-model="monsterDescription" :rows="4"
                placeholder='E.g. "Flying speed of 60ft", "Can turn invisible once per day", "Output statblock in German"' />
            </ParField>

            <ParCheckbox v-model="caster" class="monster-form__caster">Creature is a spellcaster</ParCheckbox>

            <ParButton class="generate-button" type="submit" :full-width="true"
              :disabled="loadingPart1 || loadingPart2">
              {{ activeMonsterIndex !== null ? 'Regenerate monster' : 'Generate monster' }}
            </ParButton>
          </form>
        </div>

        <!-- ZONE 3: Secondary info (below the card, low-key). Free users see
             the upsell; premium users no longer need a save/load callout —
             the sidebar footer's Data options covers backup/restore. -->
        <div class="footer-meta" v-if="!premium">
          <PatreonCallout :patreon-url="patreonLoginUrl" location="statblock-footer">
            <template #body>
              <p class="patreon-callout__body">Your work is saved to this browser only. Premium syncs across devices and unlocks unlimited statblock generation.</p>
            </template>
            <template #features>
              <li>Cross-device save and load — your statblocks sync between browsers and devices.</li>
              <li>Unlimited statblock generation — no daily cap.</li>
              <li>
                <a :href="patreonTiersUrl" target="_blank" rel="noopener">See all premium tiers and benefits on Patreon</a><span aria-hidden="true"> →</span>
              </li>
            </template>
          </PatreonCallout>
        </div>
      </div>

      <ParToggleGroup
        v-if="shouldDisplayInterface && canSwitchColumns && (monster || loadingPart1 || loadingPart2)"
        v-model="userColumnsPreference"
        aria-label="Statblock column layout"
        class="column-toggle"
      >
        <ParToggleButton toggleValue="one_column">1 Column</ParToggleButton>
        <ParToggleButton toggleValue="two_columns">2 Columns</ParToggleButton>
      </ParToggleGroup>
      <Statblock v-if="!errorMessage && displayFormat === '2014' && (loadingPart1 || loadingPart2 || monster)" :loadingPart1="loadingPart1"
        :width="850" :loadingPart2="loadingPart2" :monster="monster" :columns="userColumnsPreference" :premium="premium"
        :linked-npcs-count="linkedNPCs.length" @update-monster="updateMonster"
        @move-to-folder="showFolderMover = !showFolderMover" @use-in-encounter="useInEncounter" @create-npc="createNPC"
        @delete="deleteStatblock" @can-switch-columns="canSwitchColumns = $event"
        @toggle-export="showExports = !showExports" @toggle-regenerate="showRegenerate = !showRegenerate" />
      <Statblock2024 v-else-if="!errorMessage && displayFormat === '2024' && (loadingPart1 || monster)"
        :monster="monster" :columns="userColumnsPreference" :width="850" :loading="loadingPart1"
        @move-to-folder="showFolderMover = !showFolderMover" @use-in-encounter="useInEncounter" @create-npc="createNPC"
        @delete="deleteStatblock" @can-switch-columns="canSwitchColumns = $event"
        @toggle-export="showExports = !showExports" @toggle-regenerate="showRegenerate = !showRegenerate" />

      <!-- Regenerate panel (toggled by the 🔄 Regenerate action in the
           statblock footer bar). Re-rolls a saved statblock: the gen params
           (name, build, CR, description, spellcaster) were saved with the
           monster and restored into the form refs by selectMonster, so
           generateStatblock() re-rolls keeping them — replacing this monster
           in place (the activeMonsterIndex !== null path). Build + CR are
           surfaced so you can nudge the re-roll; name/description are kept
           silently. Only meaningful for a saved monster. -->
      <div
        class="regenerate-bar parchment"
        v-if="showRegenerate && monster && activeMonsterIndex !== null && !loadingPart1 && !loadingPart2"
      >
        <p class="regenerate-bar__title">Regenerate this monster</p>
        <p class="regenerate-bar__hint">
          Re-rolls a fresh version, keeping the name and description. Adjust the build or CR first if you like.
        </p>
        <div class="regenerate-bar__grid">
          <ParField v-if="format === '2014'" label="Build">
            <ParSelect v-model="monsterType"
              :options="['Random', 'Stronger Defense', 'Balanced', 'Stronger Offense']" />
          </ParField>
          <ParField v-else label="Combat role">
            <ParSelect v-model="archetype" :options="archetypeOptions" />
          </ParField>
          <ParField label="Challenge rating">
            <ParSelect v-model="selectedChallengeRating" :options="challengeRatingData.fullArray" placeholder="CR" />
          </ParField>
        </div>
        <p
          v-if="format === '2024' && monster?.archetype_source === 'auto' && monster?.archetype"
          class="archetype-help"
        >
          Auto picked "{{ monster.archetype }}" for this monster — choose a role above to override it.
        </p>
        <ParButton class="regenerate-bar__button" variant="primary" :full-width="true"
          :disabled="loadingPart1 || loadingPart2" @click="generateStatblock">
          ↻ Regenerate
        </ParButton>
      </div>

      <!-- Linked NPCs (appears when references exist) -->
      <div v-if="linkedNPCs.length > 0 && monster && !loadingPart2" class="linked-npcs">
        Linked NPCs:
        <span v-for="(npc, index) in linkedNPCs" :key="npc.npc_id">
          <a href="#" @click.prevent="navigateToLinkedNPC(npc.folder, npc.name)" class="linked-npc-link">{{ npc.name
          }}</a><span v-if="index < linkedNPCs.length - 1">, </span>
        </span>
      </div>

      <!-- Inline folder mover (appears when toggled) -->
      <div class="folder-mover parchment" v-if="showFolderMover && monster && !loadingPart2">
        <div class="folder-mover-inner">
          <ParField label="Destination folder" class="folder-mover__field">
            <ParSelect v-model="folderMoveTarget" :options="folderMoveOptions" placeholder="Select a folder" />
          </ParField>
          <ParField v-if="folderMoveTarget === '__new__'" label="New folder name" class="folder-mover__field">
            <ParInput v-model="newFolder" placeholder="e.g., Undead" />
          </ParField>
          <ParButton class="folder-mover__move" variant="primary" @click="handleFolderMove" :disabled="!canMove">
            Move
          </ParButton>
        </div>
      </div>

      <!-- Export options (appears when toggled) -->
      <StatblockExports v-if="showExports && monster && !loadingPart2" :monster="monster"
        :loading="loadingPart1 || loadingPart2" :columns="userColumnsPreference" />

      <!-- Footer below monster content (free users only — premium's
           backup/restore lives in the sidebar footer's Data options). -->
      <div class="footer-meta" v-if="monster && !loadingPart2 && !premium">
        <PatreonCallout :patreon-url="patreonLoginUrl" location="statblock-footer">
          <template #body>
            <p class="patreon-callout__body">Your work is saved to this browser only. Premium syncs across devices and unlocks unlimited statblock generation.</p>
          </template>
          <template #features>
            <li>Cross-device save and load — your statblocks sync between browsers and devices.</li>
            <li>Unlimited statblock generation — no daily cap.</li>
            <li>
              <a :href="patreonTiersUrl" target="_blank" rel="noopener">See all premium tiers and benefits on Patreon</a><span aria-hidden="true"> →</span>
            </li>
          </template>
        </PatreonCallout>
      </div>
    </div>

    <DataManagerModal :opened="showDataManagerModal" @update:opened="showDataManagerModal = $event" :premium="premium"
      currentApp="monsters" />

    <ParConfirm
      :opened="pendingStatblockDelete !== null"
      title="Delete this statblock?"
      confirm-label="Delete statblock"
      cancel-label="Cancel"
      :destructive="true"
      @confirm="performStatblockDelete"
      @cancel="pendingStatblockDelete = null"
    >
      Deleting <strong>{{ pendingStatblockDelete?.name }}</strong> can't be undone.
    </ParConfirm>
  </GeneratorLayout>
</template>

<script setup>
import { ParButton, ParAccordion, ParAccordionGroup, ParToggleGroup, ParToggleButton, ParField, ParInput, ParSelect, ParTextarea, ParCheckbox, ParConfirm } from "@/parchment";
import { logger } from "@/util/logger.mjs";
import { ref, onMounted, onUnmounted, computed, reactive, watch } from 'vue';
import Statblock from '@/components/Statblock.vue';
import Statblock2024 from '@/components/Statblock2024.vue';
import {
  generateMonster2024, buildArchetypeResolvePrompt, validateArchetypeResponse,
  parseGenerationResponse, pickRandomArchetype, crNumberFor, crKeyFor,
} from './format-2024/generate.mjs';
import GeneratorLayout from '@/components/GeneratorLayout.vue';
import SidebarFooter from '@/components/SidebarFooter.vue';
import VersionBadge from '@/components/VersionBadge.vue';
import PatreonCallout from '@/components/PatreonCallout.vue';
import { patreonTiersUrl } from '@/util/patreon-urls.mjs';
import { generateGptResponse } from "@/util/ai-client.mjs";
import { CdrLink, CdrList, IconDownload, IconUpload } from "@rei/cedar";
import "@rei/cedar/dist/style/cdr-list.css";
import StatblockExports from './components/StatblockExports.vue';
import DataManagerModal from '@/components/DataManagerModal.vue';
import { sweepOrphanReferences } from '@/util/sweep-orphan-references.mjs';
import challengeRatingData from '@/data/challengeRatings.json';
import creatureTemplates from '@/data/creatureTemplates.json';
import { createStatblockPrompts } from "@/prompts/monster-prompts.mjs";
import { canGenerateStatblock } from "@/util/can-generate-statblock.mjs";
import { QUOTA_FIELDS, RESERVED_HOST_FIELDS } from "@/util/quota-storage.mjs";
import { renameStatblockReferences, moveStatblockToNewFolder } from '@/util/statblock-storage.mjs';
import { navigateToTool, getNavigationParams } from '@/util/navigation.mjs';
import { trackEvent } from '@/util/analytics.mjs';
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

// 2014/2024 rules toggle — default 2024, remembered per browser. The 2024
// path swaps the Build select for the archetype ("Combat role") select.
const FORMAT_STORAGE_KEY = 'statblock-format';
const format = ref(localStorage.getItem(FORMAT_STORAGE_KEY) === '2014' ? '2014' : '2024');
watch(format, (v) => localStorage.setItem(FORMAT_STORAGE_KEY, v));

const archetype = ref('auto');
const ARCHETYPE_HELP = {
  auto: "We'll pick the role that best fits your monster's name and description.",
  balanced: 'No role bias — the raw mathematical baseline for this CR.',
  brute: 'Hits hard up close, soaks damage, easy to hit. Ogres, zombies, giant hyenas.',
  defender: 'High AC, protects allies, punishes movement. Animated armor, ropers.',
  skirmisher: 'Mobile hit-and-run attacker with a movement trick.',
  artillery: 'Fragile long-range damage dealer with an escape tool.',
  controller: 'Locks enemies down with conditions instead of raw damage. Aboleths.',
  lurker: 'Fragile ambusher with a devastating opening strike. Ghosts, will-o\'-wisps.',
  support: 'Buffs, heals, and enables allies — underperforms its CR when fought alone.',
  swarm: 'A mass of small creatures acting as one, hard to put down with weapons.',
};
const archetypeOptions = [
  { label: 'Auto — match my concept', value: 'auto' },
  { label: 'Balanced (no role)', value: 'balanced' },
  ...Object.keys(ARCHETYPE_HELP)
    .filter((k) => k !== 'auto' && k !== 'balanced')
    .map((k) => ({ label: k.charAt(0).toUpperCase() + k.slice(1), value: k })),
];
const archetypeHelp = computed(() => ARCHETYPE_HELP[archetype.value] ?? '');

// Which card renders: a loaded monster's own format wins; while generating
// (monster is null) the form toggle decides.
const displayFormat = computed(() =>
  monster.value ? (monster.value.format === '2024' ? '2024' : '2014') : format.value
);
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

function deleteAllMonsters() {
  monsters.value = {};
  localStorage.setItem('monsters', JSON.stringify({}));
  // Reconcile the cross-tool reference graph: any edge pointing at a
  // now-deleted statblock is dropped. Runs after the store is cleared so the
  // sweep sees the statblocks as gone.
  sweepOrphanReferences();
  monster.value = null;
  activeMonsterIndex.value = null;
  activeFolder.value = 'Uncategorized';
  showDataManagerModal.value = false;
}
const showFolderMover = ref(false);
const showExports = ref(false);
const showRegenerate = ref(false);
const folderMoveTarget = ref('');

const folderMoveOptions = computed(() => {
  const current = activeFolder.value;
  const folders = folderNames.value
    .filter(name => name !== current)
    .map(name => ({ label: name, value: name }));
  folders.push({ label: '＋ Create new folder...', value: '__new__' });
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
    logger.warn('Failed to parse npcGeneratorNPCs from localStorage:', error);
    // Default to empty object - linked NPCs will show "Uncategorized" folder
  }

  return linkedRefs.map(ref => {
    // Find which folder contains this NPC
    let npcFolder = 'Uncategorized';
    for (const [folderName, npcsInFolder] of Object.entries(npcGeneratorNPCs)) {
      if (Array.isArray(npcsInFolder)) {
        const foundNPC = npcsInFolder.find(npc =>
          npc.npc_id === ref.source_id
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

  // Check navigation parameters to open a specific statblock. Reads from
  // sessionStorage in dev and URL search params in prod via the navigation
  // substrate, so cross-tool deep links work in both environments.
  const navParams = getNavigationParams();
  const monsterName = navParams.monster;
  const folderName = navParams.folder;

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
  archetype.value = 'auto';
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
  // Follow the selected monster's rules version so Regenerate re-rolls in the
  // same format; restore its archetype choice ('auto' when it was auto-picked).
  format.value = monster.value.format === '2024' ? '2024' : '2014';
  if (monster.value.format === '2024') {
    archetype.value = monster.value.archetype_source === 'auto'
      ? 'auto'
      : (monster.value.archetype || 'auto');
  }
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

  // Propagate the folder change across cross-tool stores so NPC links and
  // the reference graph follow the move. Without this, NPCs that pointed
  // at `${name}__${previousActiveFolder}` keep stale `statblock_folder`
  // values, "Edit in Statblock Generator" navigation 404s, and the
  // linked-NPCs panel here loses its rows.
  moveStatblockToNewFolder(currentMonsterName, previousActiveFolder, targetFolder);

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

const pendingStatblockDelete = ref(null);

function deleteStatblock() {
  if (!monster.value) return;
  pendingStatblockDelete.value = { name: monster.value.name };
}

async function performStatblockDelete() {
  pendingStatblockDelete.value = null;

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
    logger.warn(`[ENRICHMENT] Failed to delete intelligence for ${deletedName}:`, error);
  }
}

async function generateStatblock() {
  monster.value = null;
  errorMessage.value = '';
  const canGenerate = await canGenerateStatblock(props.premium);

  if (!canGenerate) {
    return;
  }

  if (format.value === '2024') {
    await generateStatblock2024();
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

  await saveGeneratedMonster(finalMonster);
}

// 2024 path: engine-first pipeline (chassis → slot plan → slot-filling prompt
// → assemble → lint with correct/reject loop) via format-2024/generate.mjs.
// The LLM never decides numbers; see docs/2024-architecture.md.
async function generateStatblock2024() {
  loadingPart1.value = true;
  const crInput = selectedChallengeRating.value || String(Math.floor(Math.random() * 30) + 1);
  const cr = crNumberFor(crInput);

  // Archetype resolution order (settled in the architecture doc):
  // user-picked → no call; Auto + concept → micro resolve call;
  // Auto + all inputs blank → random client-side pick, no call.
  let archetypeName = archetype.value;
  let archetypeSource = 'user';
  if (archetypeName === 'auto') {
    archetypeSource = 'auto';
    const conceptSeed = [monsterName.value, monsterDescription.value]
      .map((s) => (s || '').trim())
      .filter(Boolean)
      .join(' — ');
    if (conceptSeed) {
      try {
        const raw = await generateGptResponse(
          buildArchetypeResolvePrompt(conceptSeed),
          validateArchetypeResponse,
          2,
        );
        archetypeName = parseGenerationResponse(raw)?.archetype || pickRandomArchetype();
      } catch (e) {
        logger.warn('Archetype auto-resolve failed, picking randomly:', e);
        archetypeName = pickRandomArchetype();
      }
    } else {
      archetypeName = pickRandomArchetype();
    }
  }

  const concept = monsterName.value.trim()
    || monsterDescription.value.trim()
    || `a CR ${crKeyFor(cr)} ${archetypeName === 'balanced' ? '' : `${archetypeName} `}creature — invent something unconventional`;

  let finalMonster;
  try {
    finalMonster = await generateMonster2024(
      {
        concept,
        description: monsterDescription.value,
        cr,
        archetypeName,
        caster: caster.value,
        archetypeSource,
      },
      (prompt, validate) => generateGptResponse(prompt, validate, 3),
    );
  } catch (e) {
    errorMessage.value = e.message;
    toast.error('Failed to generate statblock. Please try again.');
    loadingPart1.value = false;
    return;
  }

  // Regen params — same fields the 2014 path stamps, so selectMonster
  // restores the form for Regenerate.
  finalMonster.monsterDescription = monsterDescription.value;
  finalMonster.selectedChallengeRating = crKeyFor(cr);
  finalMonster.monsterName = monsterName.value || finalMonster.name;
  finalMonster.caster = caster.value;

  loadingPart1.value = false;
  await saveGeneratedMonster(finalMonster);
}

async function saveGeneratedMonster(finalMonster) {
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
  trackEvent('generate', { tool: 'statblock-generator' });

  // Enrich custom statblock in background (non-blocking)
  try {
    const { enrichCustomStatblock, saveEnrichment } = await import('@/util/statblock-enrichment.mjs');
    const enrichment = await enrichCustomStatblock(finalMonster);
    saveEnrichment(finalMonster.name, enrichment);
  } catch (error) {
    logger.warn(`[ENRICHMENT] Failed to enrich ${finalMonster.name}:`, error);
    // Non-fatal: statblock still works, just won't have intelligence data for encounters
  }
}
</script>

<style lang="scss" scoped>
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';


.sidebar-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);

  .sidebar-scroll {
    flex: 1;
    overflow-y: auto;
  }
}

/* ---- Statblock rows inside a ParAccordion folder ---- */
.statblock-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.statblock-row__button {
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.3rem 1.6rem;
  text-align: left;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--par-color-divider, #e2dccd);
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.15s ease;
}

.statblock-row__button:hover {
  background-color: rgba(243, 235, 218, 0.4);
}

.statblock-row__button:focus-visible {
  outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
  outline-offset: -2px;
}

.statblock-row__name {
  font-size: 1.6rem;
  color: var(--par-color-text, #222);
  line-height: 1.3;
}

.statblock-row__cr {
  font-size: 1.3rem;
  color: var(--par-color-text-secondary, #555);
  white-space: nowrap;
  flex-shrink: 0;
}

.statblock-row__cr-label {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--par-color-text-muted, #6b6b6b);
  margin-right: 0.15rem;
}

.statblock-row--active .statblock-row__button {
  background-color: var(--par-color-callout-bg, #f3ebda);
}

.statblock-row--active .statblock-row__name {
  color: var(--color-action-hover, #2A4D70);
  font-weight: 600;
}

/* Per-folder "create new" affordance — lapis (create register), quieter than
   a monster row, no CR. */
.statblock-row__new {
  display: block;
  font-size: 1.35rem;
  color: var(--color-action-rest, #365A85);
}

.statblock-row__new:hover {
  color: var(--color-action-hover, #2A4D70);
}

.statblock-row__new--active {
  background-color: var(--par-color-callout-bg, #f3ebda);
  color: var(--color-action-hover, #2A4D70);
  font-weight: 600;
}

/* ========================================
   LANDING PAGE: Three-zone layout
   ======================================== */

.landing-wrapper {
  max-width: 855px;
  margin: 0 auto;
}

/* ZONE 1: Hero header — lapis editorial register (matches the Item Generator) */
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
    color: var(--color-action-secondary-rest, #5A7A9A); /* muted lapis */
    letter-spacing: 0.04em;
  }

  .page-heading__title {
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
    font-size: 3.6rem;
    font-weight: 600;
    color: var(--color-action-hover, #2A4D70); /* dark lapis */
    margin: 0 0 0.75rem;
    line-height: 1.15;
    letter-spacing: -0.015em;
  }

  .page-heading__tagline {
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
    font-size: 1.6rem;
    color: var(--par-color-text-secondary, #555);
    font-style: italic;
    margin: 0;
    line-height: 1.6;
  }

  .page-heading__formats {
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
    font-size: 1.3rem;
    color: var(--par-color-text-muted, #6b6b6b);
    margin: 0.75rem 0 0;
  }
}

@media (max-width: 600px) {
  .hero-header .page-heading__title {
    font-size: 2.8rem;
    line-height: 1.2;
  }
}

/* ZONE 2: Form card — lifted cream surface, lapis "magic UI" register */
.form-card {
  background: var(--par-color-surface-card, #FEFBF4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  padding: 2.25rem 2.25rem 2rem;
}

/* Regenerate bar — a compact form-card shown above a saved statblock so it
   can be re-rolled (keeping its saved gen params). Mirrors .form-card. */
.regenerate-bar {
  max-width: 850px;
  margin: 0 auto 1.5rem;
  background: var(--par-color-surface-card, #FEFBF4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  padding: 1.5rem 1.75rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

.regenerate-bar__title {
  margin: 0 0 0.25rem;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--par-color-title, #7a1f1f);
}

.regenerate-bar__hint {
  margin: 0 0 1rem;
  font-size: 1.4rem;
  font-style: italic;
  line-height: 1.5;
  color: var(--par-color-text-secondary, #555);
}

.regenerate-bar__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.regenerate-bar__button {
  margin-top: 1.25rem;
}

.form-heading {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--color-action-hover, #2A4D70); /* dark lapis */
  text-align: center;
  margin: 0 0 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

/* ZONE 3: Footer meta — limit info, upsell */
.footer-meta {
  /* Visual chrome (text-align, background, border, radius) removed during
     PatreonCallout migration — the callout owns its own surface treatment.
     Layout properties (margin, max-width) preserved. */
  margin-top: 1.5rem;
  padding: 0;
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

/* Two-up row for Build + CR, collapsing to one column on narrow screens
   (matches the Item Generator's .form-grid). */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

@media (max-width: 560px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

.monster-form__caster {
  margin: 0.25rem 0 0.5rem;
}

.column-toggle {
  display: flex;
  margin: 1.5rem auto;
  justify-content: center;
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

@media (max-width: 2080px) {
  .generator-container {
    margin-top: 3rem;
  }
}

.monster-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.monster-form .generate-button {
  margin-top: 0.75rem;
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
  margin: 0 auto 2rem;
  background: var(--par-color-surface-card, #FEFBF4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  padding: 1.75rem 2rem;
}

.folder-mover-inner {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Override ParField's default bottom margin so its control aligns with the
   Move button, and let the fields grow to share the row. */
.folder-mover .folder-mover__field {
  flex: 1 1 220px;
  min-width: 0;
  margin-bottom: 0;
}

.folder-mover__move {
  flex-shrink: 0;
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

/* 2014/2024 rules toggle + archetype helper line (lapis form register). */
.format-toggle {
  margin-bottom: 1.2rem;
}

.archetype-help {
  margin: -0.4rem 0 1rem;
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
}
</style>