<template>
  <GeneratorLayout :premium="premium" :flexible-sidebar="true" :show-footer="false">
    <template #sidebar>
      <div class="sidebar-content parchment">
        <div class="sidebar-scroll">
          <ParAccordionGroup>
            <ParAccordion :level="3" v-for="(folder, folderName) in filteredEncounters" :key="folderName"
              :id="folderName" :label="folderName" :count="folder.length" :content-spacing="false"
              :opened="!!openedFolders[folderName]"
              @accordion-toggle="openedFolders[folderName] = !openedFolders[folderName]">
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
                  <button class="encounter-button encounter-button--new" @click="newEncounter(folderName)"
                    :class="{ 'active': activeEncounterIndex === null && activeFolder === folderName }">
                    + New encounter</button>
                </li>
              </ul>
            </ParAccordion>
          </ParAccordionGroup>
        </div>

        <SidebarFooter
          new-label="+ New encounter"
          data-description="Save your encounters to a file or restore from a backup. Your data stays on your device."
          backup-label="Backup / Restore encounters"
          delete-all-label="Delete all encounters"
          confirm-title="Delete all encounters?"
          confirm-body="This will permanently delete every saved encounter in your library. This action cannot be undone."
          confirm-suggestion="Consider backing up your encounters first if you might want to restore these later."
          confirm-cta="Delete all encounters"
          @new="newEncounter(activeFolder)"
          @open-data-manager="showDataManagerModal = true"
          @delete-all="deleteAllEncounters"
        />

        <DataManagerModal :opened="showDataManagerModal" @update:opened="showDataManagerModal = $event"
          :premium="premium" currentApp="encounters" />
      </div>
    </template>

    <div class="encounter-generator">
      <!-- Landing / Form state -->
      <div v-if="!generatedEncounter && !loading" class="landing-wrapper">
        <!-- ZONE 1: Hero header -->
        <div class="hero-header parchment">
          <div class="brand-line">
            <span class="brand-name">Kenji's Encounter Generator</span>
            <VersionBadge :premium="premium" />
          </div>
          <h1 class="page-heading__title">Stage an encounter for your party</h1>
          <p class="value-prop">Read-aloud text, hazards, objectives, and aftermath hooks for memorable scenes.</p>
        </div>

        <!-- ZONE 2: Form card -->
        <div class="form-card parchment paper-grain">

          <!-- Scene Description — leads because it drives narrative quality -->
          <section class="form-section">
            <ParField label="Encounter context" :optional="true">
              <ParTextarea v-model="location" :rows="4"
                placeholder="Describe the location, situation, or encounter type — e.g., 'ambush in a narrow canyon,' 'negotiation in a merchant's tent,' or 'underwater combat with limited visibility'…" />
            </ParField>
          </section>

          <!-- Monster Picker + Party/Encounter List side by side -->
          <section class="form-section monster-party-row">
            <div class="picker-column">
              <h2>Monsters</h2>
              <MonsterPicker @add-monster="addMonster" />
            </div>

            <div class="party-encounter-column">
              <div class="party-bar">
                <h2>
                  Party
                  <ParTooltip :text="thresholdTooltipText" placement="top">
                    <span class="threshold-trigger" tabindex="0" aria-label="View XP thresholds">i</span>
                  </ParTooltip>
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
                  <button v-if="partyGroups.length > 1" type="button" class="party-remove"
                    aria-label="Remove party group" @click="removePartyGroup(index)">
                    <svg viewBox="0 0 12 12" width="14" height="14" aria-hidden="true">
                      <line x1="3" y1="3" x2="9" y2="9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                      <line x1="9" y1="3" x2="3" y2="9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                    </svg>
                  </button>
                </div>

                <ParAddNewButton @click="addPartyGroup">+ Add group</ParAddNewButton>
              </div>

              <EncounterMonsterList :monsters="encounterMonsters" :party-size="totalPartySize"
                :difficulty-thresholds="difficultyThresholds" :raw-xp="rawXp" :adjusted-xp="adjustedXp"
                :difficulty-rating="difficultyRating" :encounter-multiplier="currentEncounterMultiplier"
                :highlight-on-mount="highlightDeepLink"
                :highlight-index="highlightMonsterIndex"
                @update-monsters="encounterMonsters = $event"
                @highlight-complete="highlightMonsterIndex = -1" />
            </div>
          </section>

          <!-- Generate Button -->
          <ParButton class="generate-button" :full-width="true" @click="generateEncounter" :disabled="loading" data-testid="generate-encounter">
            {{ loading ? 'Generating…' : 'Generate encounter' }}
          </ParButton>
        </div>
      </div>

      <!-- ZONE 3: Navigation button (outside card) -->
      <div v-if="generatedEncounter && !loading" class="output-navigation">
        <button type="button" class="encounter-back-link" @click="resetEncounter">← Create new encounter</button>
      </div>

      <!-- Output card (separate from form) -->
      <div v-if="generatedEncounter || loading" class="output-card parchment paper-grain" data-testid="encounter-output">
        <!-- Show skeleton for title while loading and no place_name yet -->
        <div v-if="loading && (!generatedEncounter || !generatedEncounter.place_name)" class="title-skeleton">
          <cdr-skeleton>
            <cdr-skeleton-bone style="width: 60%; height: 1.5rem; margin-bottom: 1rem;" />
          </cdr-skeleton>
        </div>
        <div v-else-if="generatedEncounter && generatedEncounter.place_name" class="encounter-header">
          <div class="encounter-header__titles">
            <h3 class="encounter-title">{{ generatedEncounter.place_name }}</h3>
            <div class="encounter-metadata">
              <span class="encounter-metadata__label">Difficulty</span>
              <span class="encounter-metadata__value">{{ difficultyRating }}</span>
              <span class="encounter-metadata__sep">·</span>
              <span class="encounter-metadata__label">Party</span>
              <span class="encounter-metadata__value">{{ partySummary }}</span>
            </div>
          </div>
          <ParCardButton variant="affirmative" size="small" data-testid="edit-encounter"
            v-if="!isEditingEncounter && !loading && !generatedEncounter.loading_details" @click="startEditingEncounter">
            Edit
          </ParCardButton>
        </div>

        <!-- Skeleton for read-aloud while Call 1 loads -->
        <div v-if="loading && (!generatedEncounter || !generatedEncounter.contentArray)" class="read-aloud-skeleton">
          <cdr-skeleton>
            <cdr-skeleton-bone style="width: 100%; height: 1rem; margin-bottom: 0.5rem;" />
            <cdr-skeleton-bone style="width: 95%; height: 1rem; margin-bottom: 0.5rem;" />
            <cdr-skeleton-bone style="width: 98%; height: 1rem; margin-bottom: 0.5rem;" />
            <cdr-skeleton-bone style="width: 92%; height: 1rem;" />
          </cdr-skeleton>
        </div>

        <!-- View Mode: Render contentArray like dungeon rooms -->
        <div v-if="!isEditingEncounter && generatedEncounter && generatedEncounter.contentArray"
          class="encounter-content">
          <div v-for="(item, index) in generatedEncounter.contentArray" :key="index">
            <ParReadAloud v-if="item.format === 'read_aloud'" :label="item.label || 'Read aloud'"
              :text="item.content" />
            <p v-else-if="item.format === 'header'" class="encounter-section-label">{{ item.content }}</p>
            <p v-else-if="item.format === 'paragraph'" class="encounter-section-body">
              <template v-for="(seg, i) in parseInlineMarkup(item.content)" :key="i">
                <span v-if="seg.bold" class="encounter-emphasis">{{ seg.text }}</span>
                <template v-else>{{ seg.text }}</template>
              </template>
            </p>
          </div>
        </div>

        <!-- Edit Mode: Edit form for encounter -->
        <div v-else-if="isEditingEncounter" class="edit-form">
          <h3 class="edit-form__title">Edit encounter</h3>

          <ParField label="Place name">
            <ParInput v-model="encounterEditForm.place_name" />
            <template #hint>The name of the encounter location.</template>
          </ParField>

          <ParField label="Encounter content (markup format)">
            <ParTextarea v-model="encounterEditForm.content" :rows="20" />
            <template #hint>
              <div class="markup-help">
                <strong>Markup format guide:</strong><br>
                • Use <code>[READ_ALOUD]...[/READ_ALOUD]</code> for read-aloud text boxes<br>
                • Use <code>## Header Text</code> for section headers<br>
                • Leave blank lines between paragraphs<br>
                • Multiple [READ_ALOUD] blocks are supported
              </div>
            </template>
          </ParField>

          <div class="button-group">
            <ParCardButton variant="primary" @click="saveEditEncounter">Save changes</ParCardButton>
            <ParCardButton variant="muted" @click="cancelEditEncounter">Cancel</ParCardButton>
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
          <p class="encounter-section-label">Monsters</p>
          <div v-for="(monster, index) in encounterMonsters" :key="index" class="monster-output">
            <h4><span class="monster-output__name">{{ monster.name }}</span> <span class="monster-qty">×{{ monster.quantity }}</span></h4>

            <!-- Both printings cached on the library copy: free read-only
                 flip (no call, no persistence). Single printing: no tabs. -->
            <ParTabToggle v-if="monster.statblock?.other_edition"
              :model-value="viewEditionFor(index, monster.statblock)"
              @update:model-value="viewEditions[index] = $event"
              :options="EDITION_TAB_OPTIONS" data-testid="edition-switch" class="encounter-edition-tabs" />
            <template v-if="monster.statblock">
              <Statblock2024 v-if="displayBlockFor(index, monster.statblock).format === '2024'"
                :monster="displayBlockFor(index, monster.statblock)" :premium="premium" :readonly="true" />
              <Statblock v-else :monster="displayBlockFor(index, monster.statblock)" :premium="premium"
                :columns="'two_columns'" :readonly="true" />
            </template>

            <div v-else class="generate-statblock-section">
              <p>Statblock not available for this monster.</p>
              <ParButton v-if="!monster.loadingStatblock" @click="generateStatblock(index)" variant="secondary">
                Generate statblock
              </ParButton>
              <div v-else class="loading-statblock">
                Generating statblock...
              </div>
            </div>
          </div>
        </div>

        <!-- Inline folder mover -->
        <div class="folder-mover" v-if="showFolderMover && !loading && !generatedEncounter.loading_details">
          <div class="folder-mover-inner">
            <ParField label="Destination folder" class="folder-mover__field">
              <ParSelect v-model="folderMoveTarget" :options="folderMoveOptions" placeholder="Select a folder" />
            </ParField>
            <ParField v-if="folderMoveTarget === '__new__'" label="New folder name" class="folder-mover__field">
              <ParInput v-model="newFolderName" />
            </ParField>
            <ParButton class="folder-mover__move" @click="handleFolderMove" :disabled="!canMoveEncounter">
              Move
            </ParButton>
          </div>
        </div>

        <!-- Actions inside card -->
        <div class="output-actions" v-if="!loading && !generatedEncounter.loading_details">
          <ParButton variant="secondary" size="small" @click="showFolderMover = !showFolderMover">
            {{ showFolderMover ? 'Cancel' : 'Move to folder' }}
          </ParButton>
          <ParButton variant="secondary" size="small" @click="showExport = !showExport">
            {{ showExport ? 'Hide export' : 'Export' }}
          </ParButton>
          <ParCardButton variant="danger" size="small" @click="deleteEncounter" data-testid="delete-encounter">
            Delete
          </ParCardButton>
        </div>

        <!-- Export panel — toggled, same look as the item / setting exports. -->
        <ItemExportsSection v-if="showExport && !loading && !generatedEncounter.loading_details"
          heading="Export encounter">
          <template #description>
            Export this encounter for your notes or a player handout. The markdown format works perfectly with
            <a href="https://homebrewery.naturalcrit.com" target="_blank" rel="noopener">Homebrewery</a>.
          </template>
          <template #buttons>
            <ParButton variant="secondary" @click="exportAsPlainText">Copy as plain text</ParButton>
            <ParButton variant="secondary" @click="exportToMarkdown">Copy as Homebrewery Markdown</ParButton>
          </template>
          <template #tip>
            <strong>Quick tip:</strong> After copying as markdown, paste it into
            <a href="https://homebrewery.naturalcrit.com/new" target="_blank" rel="noopener">homebrewery.naturalcrit.com</a>
            to format your encounter.
          </template>
        </ItemExportsSection>
      </div>

      <!-- Footer with save/load or upgrade prompt -->
      <!-- Footer is the free-tier upgrade prompt only; premium has no callout
           (Backup/Restore lives in the sidebar Data options). -->
      <div v-if="!premium" class="encounter-footer">
        <PatreonCallout :patreon-url="patreonLoginUrl" location="encounter-footer">
          <template #body>
            <p class="patreon-callout__body">Your work is saved to this browser only. Premium syncs your encounters across devices.</p>
          </template>
          <template #features>
            <li>Cross-device save and load — your encounters sync between browsers and devices.</li>
            <li>
              <a :href="patreonTiersUrl" target="_blank" rel="noopener">See all premium tiers and benefits on Patreon</a><span aria-hidden="true"> →</span>
            </li>
          </template>
        </PatreonCallout>
      </div>
    </div>

    <ParConfirm
      :opened="pendingEncounterDelete !== null"
      title="Delete this encounter?"
      confirm-label="Delete encounter"
      cancel-label="Cancel"
      :destructive="true"
      @confirm="performEncounterDelete"
      @cancel="pendingEncounterDelete = null"
    >
      Deleting <strong>{{ pendingEncounterDelete?.name }}</strong> can't be undone.
    </ParConfirm>
  </GeneratorLayout>
</template>

<script setup>
import { ParButton, ParCardButton, ParField, ParInput, ParSelect, ParTextarea, ParTooltip, ParAddNewButton, ParReadAloud, ParAccordion, ParAccordionGroup, ParConfirm, ParTabToggle } from "@/parchment";
import { logger } from "@/util/logger.mjs";
import { ref, computed, onMounted, watch } from 'vue';
import { CdrSkeleton, CdrSkeletonBone } from '@rei/cedar';
import GeneratorLayout from '@/components/GeneratorLayout.vue';
import SidebarFooter from '@/components/SidebarFooter.vue';
import VersionBadge from '@/components/VersionBadge.vue';
import DataManagerModal from '@/components/DataManagerModal.vue';
import PatreonCallout from '@/components/PatreonCallout.vue';
import { patreonTiersUrl } from '@/util/patreon-urls.mjs';
import Statblock from '@/components/Statblock.vue';
import Statblock2024 from '@/components/Statblock2024.vue';
import MonsterPicker from './components/MonsterPicker.vue';
import EncounterMonsterList from './components/EncounterMonsterList.vue';
import ItemExportsSection from '@/tools/item-generator/components/ItemExportsSection.vue';
import encounterDifficulty from '@/data/encounter-difficulty.json';
import { generateGptResponse } from "@/util/ai-client.mjs";
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
} from './prompts/encounter-prompt.mjs';
import { buildEnrichedMonsterBrief, getEncounterProfile } from '@/util/encounter-enrichment.mjs';
import { removeReferencesForEntity, getAllReferences } from '@/util/reference-storage.mjs';
import { statblockToMarkdown } from '@/util/convertToMarkdown.mjs';
import { generateEmbeddedStatblock } from '@/util/embedded-statblock.mjs';
import { toLegacyModel } from '@/tools/statblock-generator/format-2024/generate.mjs';

const EDITION_TAB_OPTIONS = [
  { value: '2014', label: '2014 rules' },
  { value: '2024', label: '2024 rules' },
];
// Per-monster VIEW edition (index-keyed): pure display state for flipping
// between a library monster's cached printings — never persisted.
const viewEditions = ref({});
function viewEditionFor(index, statblock) {
  return viewEditions.value[index] ?? (statblock.format === '2024' ? '2024' : '2014');
}
function displayBlockFor(index, statblock) {
  const view = viewEditionFor(index, statblock);
  const active = statblock.format === '2024' ? '2024' : '2014';
  if (view === active || !statblock.other_edition) return statblock;
  return statblock.other_edition;
}


import { canGenerateStatblock } from '@/util/can-generate-statblock.mjs';
import { trackEvent } from '@/util/analytics.mjs';
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
// A new monster list means the index-keyed edition-view state is stale.
watch(encounterMonsters, () => { viewEditions.value = {}; });
const highlightDeepLink = ref(false);
const highlightMonsterIndex = ref(-1);
const partyGroups = ref([{ players: null, level: null }]);
const location = ref('');
const loading = ref(false);
const generatedEncounter = ref(null);

// ─── localStorage state ──────────────────────────────────────────────────────
const savedEncounters = ref({});
const activeEncounterIndex = ref(null);
const activeFolder = ref('Uncategorized');
const openedFolders = ref({ 'Uncategorized': true });
const showDataManagerModal = ref(false);
const showExport = ref(false);

// ─── Premium / Patreon ───────────────────────────────────────────────────────
const patreonLoginUrl = computed(() => {
  const returnUrl = encodeURIComponent(window.location.href);
  return `https://cros.land/patreon-flow/?patreon-login=yes&patreon-final-redirect=${returnUrl}`;
});

// ─── Folder management ───────────────────────────────────────────────────────
const showFolderMover = ref(false);
const folderMoveTarget = ref('');
const newFolderName = ref('');

// ─── Edit mode state ─────────────────────────────────────────────────────────
const isEditingEncounter = ref(false);
const encounterEditForm = ref({
  place_name: '',
  content: ''
});

// ─── Export state ────────────────────────────────────────────────────────────
const showHomebreweryLink = ref(false);

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

// XP-threshold summary for the Party info tooltip (ParTooltip takes plain text).
const thresholdTooltipText = computed(() => {
  const t = difficultyThresholds.value;
  return `XP thresholds — Easy: ${t.easy.toLocaleString()} · Medium: ${t.medium.toLocaleString()} · Hard: ${t.hard.toLocaleString()} · Deadly: ${t.deadly.toLocaleString()}`;
});

// Party summary for the generated encounter's metadata row (e.g. "5 players,
// level 6" — joined with · across multiple groups).
const partySummary = computed(() => {
  const parts = partyGroups.value
    .filter(g => Number(g.players) > 0 && Number(g.level) > 0)
    .map(g => `${g.players} player${Number(g.players) === 1 ? '' : 's'}, level ${g.level}`);
  return parts.length ? parts.join(' · ') : '—';
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
    .map(name => ({ label: name, value: name }));
  folders.push({ label: '＋ Create new folder…', value: '__new__' });
  return folders;
});

const canMoveEncounter = computed(() => {
  if (!folderMoveTarget.value) return false;
  if (folderMoveTarget.value === '__new__' && !newFolderName.value.trim()) return false;
  return true;
});

// ─── Monster management ──────────────────────────────────────────────────────
function addMonster(monster) {
  const existingIndex = encounterMonsters.value.findIndex(
    m => m.name === monster.name && m.source === monster.source
  );

  if (existingIndex !== -1) {
    // Replace object to guarantee reactivity
    encounterMonsters.value[existingIndex] = {
      ...encounterMonsters.value[existingIndex],
      quantity: encounterMonsters.value[existingIndex].quantity + 1
    };
    // Highlight the existing monster that was incremented
    highlightMonsterIndex.value = existingIndex;
  } else {
    encounterMonsters.value.push({ ...monster, quantity: 1 });
    // Highlight the newly added monster (last in array)
    highlightMonsterIndex.value = encounterMonsters.value.length - 1;
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
    logger.error('Failed to load encounters from localStorage:', error);
    savedEncounters.value = { 'Uncategorized': [] };
  }
}

function saveToLocalStorage() {
  try {
    localStorage.setItem('encounters', JSON.stringify(savedEncounters.value));
  } catch (error) {
    logger.error('Failed to save encounters to localStorage:', error);
  }
}

function deleteAllEncounters() {
  savedEncounters.value = { 'Uncategorized': [] };
  activeFolder.value = 'Uncategorized';
  activeEncounterIndex.value = null;
  saveToLocalStorage();
  resetEncounter();
  toast.success('All encounters deleted');
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
    logger.error('Failed to load party config:', error);
  }
}

function savePartyConfig() {
  try {
    localStorage.setItem('partyConfig', JSON.stringify(partyGroups.value));
  } catch (error) {
    logger.error('Failed to save party config:', error);
  }
}

function selectEncounter(folderName, index) {
  activeFolder.value = folderName;
  activeEncounterIndex.value = index;

  const encounter = savedEncounters.value[folderName][index];

  const currentPartyConfig = [...partyGroups.value]; // Save current party config

  // Load encounter data into form
  encounterMonsters.value = encounter.monsters || [];
  partyGroups.value = encounter.partyGroups || currentPartyConfig;
  location.value = encounter.location || '';
  generatedEncounter.value = encounter.generatedEncounter || null;
  showHomebreweryLink.value = false;
}

function newEncounter(folderName = 'Uncategorized') {
  activeFolder.value = folderName;
  activeEncounterIndex.value = null;

  // Reset form — but keep party config (it persists across encounters)
  encounterMonsters.value = [];
  location.value = '';
  generatedEncounter.value = null;
  showHomebreweryLink.value = false;
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
    // Get creature intelligence data (async - supports lazy enrichment for custom creatures)
    const creatureIntel = await getCreatureIntelligence(encounterMonsters.value);

    // Build monster briefs (minimal for Calls 1+2, tactical for Call 3)
    const baseBrief = buildEnrichedMonsterBrief(encounterMonsters.value);
    const minimalBrief = buildMinimalBrief(baseBrief, creatureIntel);
    const tacticalBrief = buildTacticalBrief(baseBrief, creatureIntel);

    const encounterProfile = getEncounterProfile(encounterMonsters.value);

    const locationText = location.value || '';

    // Determine if encounter should include a named NPC
    const includeNPC = shouldNameCreature(encounterMonsters.value);

    // Get tone and matching centerpieces (uses creature intelligence)
    const { tone, centerpieceShortlist } = getReadAloudToneAndCenterpieces(creatureIntel);

    // ── Call 1: Structure (Story + Metadata) ────────────────────
    const call1Prompt = buildCall1StructurePrompt(
      locationText,
      minimalBrief,
      includeNPC,
      tone,
      centerpieceShortlist
    );
    const call1Response = await generateGptResponse(call1Prompt, validateCall1Structure, 3, undefined, 'gpt-4.1-mini');
    const call1Result = JSON.parse(call1Response);

    // ── Call 2: Scene (Read-Aloud Prose) ────────────────────────
    // IMPORTANT: Rebuild minimal brief with call1Result for disguise swapping
    // If call1Result.disguised_as is not null, buildMinimalBrief will replace
    // the disguised creature's true description with the false appearance
    const minimalBriefForCall2 = buildMinimalBrief(baseBrief, creatureIntel, call1Result);

    const call2Prompt = buildCall2ScenePrompt(
      call1Result,
      minimalBriefForCall2
    );
    const call2Response = await generateGptResponse(call2Prompt, validateCall2Scene, 3, undefined, 'gpt-4.1-mini');
    const call2Result = JSON.parse(call2Response);

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
    const call3Response = await generateGptResponse(call3Prompt, validateCall3Details, 3, undefined, 'gpt-4.1-mini');
    const call3Result = JSON.parse(call3Response);

    // Combine all 3 calls into final encounter
    const finalEncounter = processEncounterResponse(call1Result, call2Result, call3Result, baseBrief);

    // Merge into final contentArray
    generatedEncounter.value = {
      ...finalEncounter,
      loading_details: false,
    };

    // Save
    saveNewEncounter();
    trackEvent('generate', { tool: 'encounter-generator' });
  } catch (error) {
    logger.error('Error generating encounter:', error);
    toast.error('Failed to generate encounter. Please try again.');
    generatedEncounter.value = null;
  } finally {
    loading.value = false;
  }
}

function resetEncounter() {
  // Clear all encounter data (but keep party config)
  encounterMonsters.value = [];
  location.value = '';
  generatedEncounter.value = null;
  activeEncounterIndex.value = null;
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

// ─── Data Manager ────────────────────────────────────────────────────────────
// Delete confirmation (ParConfirm modal — replaces native confirm()).
// The modal blocks interaction while open, so performDelete reads the live
// active-index/folder refs the way the original handler did.
const pendingEncounterDelete = ref(null);

function deleteEncounter() {
  if (activeEncounterIndex.value === null) return;
  const encounterName = savedEncounters.value[activeFolder.value]?.[activeEncounterIndex.value]?.name || 'this encounter';
  pendingEncounterDelete.value = { name: encounterName };
}

function performEncounterDelete() {
  pendingEncounterDelete.value = null;
  if (activeEncounterIndex.value === null) return;

  const folderName = activeFolder.value || 'Uncategorized';
  const deletedIndex = activeEncounterIndex.value;
  const deletedEncounterId = `${folderName}__${deletedIndex}`;

  savedEncounters.value[folderName].splice(deletedIndex, 1);

  // Reset state
  generatedEncounter.value = null;
  activeEncounterIndex.value = null;

  // Encounters are keyed in `tool-references` as `${folder}__${index}`,
  // so the splice above silently corrupts every ref pointing at an index
  // greater than the deleted one (their slot now holds a different
  // encounter). Drop the deleted encounter's refs and shift the rest.
  removeReferencesForEntity('encounter', deletedEncounterId);
  shiftEncounterReferencesAfterDelete(folderName, deletedIndex);

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

// Decrement encounter target/source ids in the given folder that pointed at
// an index greater than `deletedIndex`, so surviving refs continue to
// resolve after the splice. Refs at exactly `deletedIndex` should already
// have been removed via `removeReferencesForEntity` before this runs.
function shiftEncounterReferencesAfterDelete(folderName, deletedIndex) {
  const references = getAllReferences();
  let shifted = false;

  for (const ref of Object.values(references)) {
    if (ref.target_type === 'encounter') {
      const next = shiftEncounterId(ref.target_id, folderName, deletedIndex);
      if (next !== null) {
        ref.target_id = next;
        shifted = true;
      }
    }
    if (ref.source_type === 'encounter') {
      const next = shiftEncounterId(ref.source_id, folderName, deletedIndex);
      if (next !== null) {
        ref.source_id = next;
        shifted = true;
      }
    }
  }

  if (shifted) {
    localStorage.setItem('tool-references', JSON.stringify(references));
  }
}

function shiftEncounterId(encounterId, folderName, deletedIndex) {
  if (typeof encounterId !== 'string') return null;
  const sep = encounterId.lastIndexOf('__');
  if (sep === -1) return null;
  const refFolder = encounterId.slice(0, sep);
  if (refFolder !== folderName) return null;
  const idx = Number(encounterId.slice(sep + 2));
  if (!Number.isInteger(idx) || idx <= deletedIndex) return null;
  return `${refFolder}__${idx - 1}`;
}

// ─── Statblock generation ────────────────────────────────────────────────────
async function generateStatblock(index) {
  // canGenerateStatblock is async — Promises are truthy, so the bare
  // `!canGenerateStatblock()` form that used to live here was always
  // falsy and the gate never fired. Awaiting routes through the
  // helper's premium short-circuit and rate-limit toast.
  if (!(await canGenerateStatblock(props.premium))) {
    return;
  }

  // Replace object to set loading state (guarantees reactivity)
  encounterMonsters.value[index] = {
    ...encounterMonsters.value[index],
    loadingStatblock: true
  };

  try {
    const monster = encounterMonsters.value[index];
    // Engine-routed (embedded edition migration): chassis numbers, lint
    // stack, and the shared edition preference.
    const fullStatblock = await generateEmbeddedStatblock({
      name: monster.name,
      cr: monster.cr,
      description: monster.description || '',
      caster: monster.isSpellcaster || false,
    });

    // Replace object again with statblock data
    encounterMonsters.value[index] = {
      ...encounterMonsters.value[index],
      statblock: fullStatblock,
      loadingStatblock: false
    };
  } catch (error) {
    logger.error('Error generating statblock:', error);
    encounterMonsters.value[index] = {
      ...encounterMonsters.value[index],
      loadingStatblock: false
    };
    toast.error('Failed to generate statblock. Please try again.');
  }
}

// ─── Export ───────────────────────────────────────────────────────────────────
function convertContentArrayToPlainText(contentArray) {
  if (!contentArray || !Array.isArray(contentArray)) return '';

  return contentArray.map(item => {
    if (item.format === 'read_aloud') {
      return `READ ALOUD:\n${item.content}\n`;
    } else if (item.format === 'header') {
      return `\n${item.content.toUpperCase()}\n`;
    } else if (item.format === 'paragraph') {
      // Remove markdown bold markers
      const plainContent = item.content.replace(/\*\*(.*?)\*\*/g, '$1');
      return `${plainContent}\n`;
    }
    return item.content + '\n';
  }).join('\n');
}

function convertContentArrayToMarkdown(contentArray) {
  if (!contentArray || !Array.isArray(contentArray)) return '';

  return contentArray.map(item => {
    if (item.format === 'read_aloud') {
      return `{{descriptive\n${item.content}\n}}\n`;
    } else if (item.format === 'header') {
      return `### ${item.content}\n`;
    } else if (item.format === 'paragraph') {
      return `${item.content}\n`;
    }
    return item.content + '\n';
  }).join('\n');
}

async function exportAsPlainText() {
  if (!generatedEncounter.value) return;

  let plainText = `${generatedEncounter.value.place_name}\n${'='.repeat(generatedEncounter.value.place_name.length)}\n\n`;
  plainText += convertContentArrayToPlainText(generatedEncounter.value.contentArray);
  plainText += '\n\nMONSTERS\n========\n\n';

  encounterMonsters.value.forEach(monster => {
    plainText += `${monster.name}`;
    if (monster.quantity > 1) {
      plainText += ` (×${monster.quantity})`;
    }
    plainText += `\nCR: ${monster.cr}\n\n`;

    if (monster.statblock) {
      plainText += convertStatblockToPlainText(monster.statblock);
      plainText += '\n\n';
    }
  });

  try {
    await navigator.clipboard.writeText(plainText);
    toast.success('Encounter copied to clipboard as plain text!');
  } catch {
    const textarea = document.createElement('textarea');
    textarea.textContent = plainText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    toast.success('Encounter copied to clipboard as plain text!');
  }
}

async function exportToMarkdown() {
  if (!generatedEncounter.value) return;

  let markdown = `## ${generatedEncounter.value.place_name}\n\n`;
  markdown += convertContentArrayToMarkdown(generatedEncounter.value.contentArray);
  markdown += '\n';

  encounterMonsters.value.forEach(monster => {
    if (monster.statblock) {
      markdown += statblockToMarkdown(monster.statblock, 'two_columns') + '\n\n';
    } else {
      markdown += `### ${monster.name}`;
      if (monster.quantity > 1) {
        markdown += ` (×${monster.quantity})`;
      }
      markdown += `\n*CR ${monster.cr}*\n\n`;
    }
  });

  try {
    await navigator.clipboard.writeText(markdown);
    showHomebreweryLink.value = true;
    toast.success('Encounter copied to clipboard in Homebrewery format!');
  } catch {
    const textarea = document.createElement('textarea');
    textarea.textContent = markdown;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showHomebreweryLink.value = true;
    toast.success('Encounter copied to clipboard in Homebrewery format!');
  }
}

function convertStatblockToPlainText(statblock) {
  // 2024 blocks map through the engine's legacy-shape converter — the 2014
  // path below then renders traits/actions/defenses at full fidelity
  // (the earlier inline shim covered header fields only).
  if (statblock.format === '2024') {
    try { statblock = toLegacyModel(statblock); } catch { /* render raw */ }
  }
  let text = `${statblock.name}\n`;
  text += `${statblock.size} ${statblock.type}, ${statblock.alignment}\n\n`;
  // 2024-format statblocks carry numeric ac/hp + a stats map instead of the
  // 2014 armor_class/hit_points/abilities fields — fall back accordingly
  // (full interop: plans/statblock-2024-export-mappers.md).
  text += `Armor Class: ${statblock.armor_class ?? statblock.ac}\n`;
  text += `Hit Points: ${statblock.hit_points ?? (statblock.hp_formula ? `${statblock.hp} (${statblock.hp_formula})` : statblock.hp)}\n`;
  text += `Speed: ${statblock.speed}\n\n`;

  const abilities = statblock.abilities?.STR != null ? statblock.abilities : (statblock.stats ?? {});
  text += `STR: ${abilities.STR} DEX: ${abilities.DEX} CON: ${abilities.CON} INT: ${abilities.INT} WIS: ${abilities.WIS} CHA: ${abilities.CHA}\n\n`;

  if (statblock.saving_throws) {
    text += `Saving Throws: ${statblock.saving_throws}\n`;
  }
  if (statblock.skills) {
    text += `Skills: ${statblock.skills}\n`;
  }
  if (statblock.damage_resistances) {
    text += `Damage Resistances: ${statblock.damage_resistances}\n`;
  }
  if (statblock.damage_immunities) {
    text += `Damage Immunities: ${statblock.damage_immunities}\n`;
  }
  if (statblock.condition_immunities) {
    text += `Condition Immunities: ${statblock.condition_immunities}\n`;
  }
  text += `Senses: ${statblock.senses}\n`;
  text += `Languages: ${statblock.languages}\n`;
  text += `Challenge: ${statblock.challenge_rating} (${statblock.experience_points} XP)\n`;
  if (statblock.proficiency_bonus) {
    text += `Proficiency Bonus: ${statblock.proficiency_bonus}\n`;
  }
  text += '\n';

  if (statblock.special_abilities && statblock.special_abilities.length > 0) {
    statblock.special_abilities.forEach(ability => {
      text += `${ability.name}. ${ability.description}\n\n`;
    });
  }

  if (statblock.actions && statblock.actions.length > 0) {
    text += 'ACTIONS\n';
    statblock.actions.forEach(action => {
      text += `${action.name}. ${action.description}\n\n`;
    });
  }

  if (statblock.legendary_actions && statblock.legendary_actions.length > 0) {
    text += 'LEGENDARY ACTIONS\n';
    statblock.legendary_actions.forEach(action => {
      text += `${action.name}. ${action.description}\n\n`;
    });
  }

  return text;
}

// ─── Inline editing ──────────────────────────────────────────────────────────
// Convert contentArray to markup format
function contentArrayToMarkup(contentArr) {
  if (!contentArr || contentArr.length === 0) {
    return '';
  }

  const parts = [];

  contentArr.forEach(item => {
    if (item.format === 'read_aloud') {
      parts.push(`[READ_ALOUD]\n${item.content}\n[/READ_ALOUD]`);
    } else if (item.format === 'header') {
      parts.push(`## ${item.content}`);
    } else if (item.format === 'paragraph') {
      parts.push(item.content);
    }
  });

  return parts.join('\n\n');
}

// Convert markup format to contentArray
function markupToContentArray(markup) {
  if (!markup || !markup.trim()) {
    return [];
  }

  const contentArray = [];
  const lines = markup.split('\n');
  let inReadAloud = false;
  let readAloudContent = [];
  let currentParagraph = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check for read-aloud block start
    if (trimmed === '[READ_ALOUD]') {
      // Save any accumulated paragraph first
      if (currentParagraph.length > 0) {
        contentArray.push({
          format: 'paragraph',
          content: currentParagraph.join(' ').trim()
        });
        currentParagraph = [];
      }
      inReadAloud = true;
      readAloudContent = [];
      continue;
    }

    // Check for read-aloud block end
    if (trimmed === '[/READ_ALOUD]') {
      if (inReadAloud && readAloudContent.length > 0) {
        contentArray.push({
          format: 'read_aloud',
          content: readAloudContent.join(' ').trim()
        });
      }
      inReadAloud = false;
      readAloudContent = [];
      continue;
    }

    // If we're in a read-aloud block
    if (inReadAloud) {
      if (trimmed) {
        readAloudContent.push(trimmed);
      }
      continue;
    }

    // Check for headers (##)
    if (trimmed.startsWith('## ')) {
      // Save any accumulated paragraph first
      if (currentParagraph.length > 0) {
        contentArray.push({
          format: 'paragraph',
          content: currentParagraph.join(' ').trim()
        });
        currentParagraph = [];
      }
      // Add header
      contentArray.push({
        format: 'header',
        content: trimmed.substring(3).trim()
      });
      continue;
    }

    // Handle regular content
    if (trimmed === '') {
      // Empty line indicates paragraph break
      if (currentParagraph.length > 0) {
        contentArray.push({
          format: 'paragraph',
          content: currentParagraph.join(' ').trim()
        });
        currentParagraph = [];
      }
    } else {
      // Add to current paragraph
      currentParagraph.push(trimmed);
    }
  }

  // Add any remaining paragraph
  if (currentParagraph.length > 0) {
    contentArray.push({
      format: 'paragraph',
      content: currentParagraph.join(' ').trim()
    });
  }

  return contentArray;
}

// Start editing encounter
function startEditingEncounter() {
  if (!generatedEncounter.value) return;

  encounterEditForm.value = {
    place_name: generatedEncounter.value.place_name || '',
    content: contentArrayToMarkup(generatedEncounter.value.contentArray || [])
  };

  isEditingEncounter.value = true;
}

// Cancel editing encounter
function cancelEditEncounter() {
  isEditingEncounter.value = false;
}

// Save edited encounter
function saveEditEncounter() {
  if (!generatedEncounter.value) return;

  // Update encounter name
  generatedEncounter.value.place_name = encounterEditForm.value.place_name;

  // Update contentArray from markup
  generatedEncounter.value.contentArray = markupToContentArray(encounterEditForm.value.content);

  // Save to localStorage
  autoSaveEncounter();

  // Exit edit mode
  isEditingEncounter.value = false;

  toast.success('Encounter updated');
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

onMounted(async () => {
  loadEncounters();
  loadPartyConfig();

  // Check for monster query parameter from statblock generator
  const { getNavigationParams } = await import('@/util/navigation.mjs');
  const params = getNavigationParams();
  const monsterName = params.monster;

  if (monsterName) {
    try {
      // Import monster loading utilities
      const { loadSRDMonsters, loadCustomMonsters } = await import('./util/monster-adapter.mjs');

      // Load both SRD and custom monsters
      const [srdMonsters, customMonsters] = await Promise.all([
        loadSRDMonsters(),
        Promise.resolve(loadCustomMonsters())
      ]);

      // Search for monster by name (case-insensitive)
      const allMonsters = [...srdMonsters, ...customMonsters];
      const foundMonster = allMonsters.find(
        m => m.name.toLowerCase() === monsterName.toLowerCase()
      );

      if (foundMonster) {
        // Add monster to encounter with quantity 1
        encounterMonsters.value = [{ ...foundMonster, quantity: 1 }];

        // Enable highlight animation for deep link (using both methods for consistency)
        highlightDeepLink.value = true;
        highlightMonsterIndex.value = 0;

        // Clear the deep-link param to prevent re-adding on refresh (production
        // only). navigateToTool now writes handoff params to the URL fragment,
        // so clear the hash too — not just the query string.
        if (window.location.search || window.location.hash) {
          window.history.replaceState({}, '', window.location.pathname);
        }
      }
    } catch (error) {
      logger.error('Failed to load monster from query param:', error);
    }
  }

  // Migrate and cleanup enrichment data
  try {
    const { migrateOldEnrichmentFormat, cleanupOrphanedIntelligence } = await import('@/util/statblock-enrichment.mjs');
    migrateOldEnrichmentFormat();
    cleanupOrphanedIntelligence();
  } catch (error) {
    logger.warn('[ENRICHMENT] Failed to run migration/cleanup:', error);
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
.sidebar-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

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

/* Difficulty badges: the live, desaturated parchment palette is defined in the
   Phase-2 overrides block below (search ".difficulty-badge"). The original
   "candy" palette that used to live here was fully shadowed by it and has been
   removed. */

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
  height: 600px;
  overflow: hidden;

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
/* The .output-card surface is defined in the Phase-2 parchment overrides block
   below (cream surface-card + tan border). */
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

.export-actions-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.export-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.homebrewery-link-message {
  padding: 0.75rem 1rem;
  background: #f0fdf4;
  border: 1px solid #22c55e;
  border-radius: 6px;

  p {
    margin: 0;
    color: #14532d;
    font-size: 1.2rem
  }

  a {
    color: #16a34a;
    font-weight: 600;
    text-decoration: underline;

    &:hover {
      color: #22c55e;
    }
  }
}

/* ─── Encounter Header with Edit Button ────────────────────────────────── */
.encounter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.encounter-header h3 {
  margin: 0;
  flex: 1;
}

/* ─── Edit Form ──────────────────────────────────────────────────────────── */
.edit-form {
  margin-bottom: 2rem;
}

.edit-form h3 {
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.edit-field {
  margin-bottom: 1.5rem;
}

.markup-help {
  font-size: 1.6rem;
  line-height: 1.6;
  color: #666;
}

.markup-help code {
  background: #f5f5f5;
  padding: 0.125rem 0.375rem;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 1.6rem;
}

.button-group {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

/* ─── Patreon Button ────────────────────────────────────────────────────── */
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

/* ─── Encounter Footer ──────────────────────────────────────────────────── */
.encounter-footer {
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

  .management-actions,
  .export-actions {
    flex-direction: column;
    width: 100%;
  }

  .export-actions button {
    width: 100%;
  }
}

/* ════════════════════════════════════════════════════════════════
   PARCHMENT OVERRIDES (Phase 1: creation form). These come after the
   @import 'generator-foundation' so they win at equal specificity,
   restyling the shared hero/form-card chrome to the parchment register
   without touching the foundation (still used by non-migrated tools).
   ════════════════════════════════════════════════════════════════ */
.hero-header {
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
    margin: 0 0 1rem;
    line-height: 1.15;
  }

  .value-prop {
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
    font-size: 1.6rem;
    font-weight: 400;
    font-style: italic;
    color: var(--par-color-text-secondary, #555);
  }
}

.form-card {
  background-color: var(--par-color-surface-card, #FEFBF4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  box-shadow: none;
  padding: 2.25rem 2.25rem 2rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

/* Section headers (MONSTERS / PARTY) — lapis small-caps, matching the
   ParField labels on the Encounter context field. */
.form-section h2,
.picker-column h2,
.party-bar h2 {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--par-color-action-primary, #2A4D70);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.form-section {
  border-bottom-color: var(--par-color-divider, #e2dccd);
}

/* Party "i" info glyph — small parchment circle (matches the faction
   influence-level info icon). */
.threshold-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.4rem;
  height: 1.4rem;
  padding: 0;
  border: 0.5px solid var(--par-color-text-secondary, #555);
  border-radius: 50%;
  background: transparent;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 0.9rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  cursor: help;
}

/* Party micro-labels + number inputs — warm-tan parchment fields. */
.party-label {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.2rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
}

.party-number-input {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  color: var(--par-color-text, #222);
  background-color: var(--par-color-callout-bg, #f3ebda);
  box-shadow: inset 0 0 0 0.05rem var(--par-color-border-strong, #c9b99a);

  &:hover {
    box-shadow: inset 0 0 0 0.05rem var(--par-color-border-deep, #b8a685);
  }

  &:focus {
    box-shadow: inset 0 0 0 0.12rem var(--color-action-rest, #365A85);
  }
}

.multiply-symbol {
  color: var(--par-color-text-secondary, #555);
}

/* Party-group remove — quiet ✕ matching the setting NPC-stub delete:
   slate glyph + hairline border, burgundy on hover. */
.party-remove {
  appearance: none;
  -webkit-appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* Match the input height so it centers against the field box — the row is
     bottom-aligned (the Players/Level inputs carry labels above them). */
  height: 4rem;
  box-sizing: border-box;
  padding: 0 0.75rem;
  color: var(--color-action-secondary-rest, #5A7A9A);
  border: 1px solid var(--par-color-divider, #e2dccd);
  border-radius: var(--par-radius-sm, 3px);
  background: rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
  cursor: pointer;
  transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;
}

.party-remove svg {
  display: block;
}

.party-remove:hover,
.party-remove:focus-visible {
  color: var(--par-color-title, #7a1f1f);
  border-color: var(--par-color-title, #7a1f1f);
  background: rgba(255, 255, 255, 0.85);
  outline: none;
}

/* ──────────────── PARCHMENT OVERRIDES — Phase 2: encounter view ──────────── */
.output-card {
  background: var(--par-color-surface-card, #FEFBF4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  box-shadow: none;
  padding: 2rem 2.25rem;
  margin-top: 2rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

.encounter-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding-bottom: 1.25rem;
  border-bottom: 0.5px solid var(--par-color-border, #e8e2d4);
  margin-bottom: 1.5rem;

  h3 {
    margin: 0;
  }
}

.encounter-title {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 3rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  line-height: 1.15;
  margin: 0 0 0.3rem;
}

.encounter-metadata {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.encounter-metadata__label {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.encounter-metadata__value {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--par-color-text, #222);
}

.encounter-metadata__sep {
  color: var(--par-color-border-strong, #c9b99a);
}

/* GM-notes register — small-caps burgundy section labels + body prose with
   burgundy emphasis on mechanical terms. */
.encounter-section-label {
  margin: 1.5rem 0 0.5rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.encounter-section-body {
  margin: 0 0 1rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  line-height: 1.7;
  color: var(--par-color-text, #222);
}

.encounter-emphasis {
  color: var(--par-color-title, #7a1f1f);
  font-weight: 600;
}

.encounter-monsters {
  margin-top: 1.5rem;

  h4 {
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
    font-size: 1.7rem;
    font-weight: 600;
    margin: 1.5rem 0 0.75rem;
    color: var(--par-color-text, #222);
  }
}

.monster-output__name {
  color: var(--par-color-title, #7a1f1f);
  font-weight: 600;
}

.monster-qty {
  color: var(--par-color-text-secondary, #555);
  font-style: italic;
  font-weight: 400;
}

/* Quiet lapis text back-link. */
.encounter-back-link {
  appearance: none;
  -webkit-appearance: none;
  background: none;
  border: none;
  padding: 0;
  margin-bottom: 0.5rem;
  cursor: pointer;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--color-action-rest, #365A85);
}

.encounter-back-link:hover {
  text-decoration: underline;
  text-underline-offset: 2px;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.edit-form__title {
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
}

/* ──────────────── PARCHMENT OVERRIDES — Phase 3: sidebar + actions ──────── */
/* Sidebar text in serif (the foundation's .sidebar-content doesn't set it). */
.sidebar-content {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

/* Difficulty badges — the original semantic colors, desaturated/warm-toned so
   they read as parchment pills rather than candy. Small-caps register. */
.difficulty-badge {
  padding: 0.2rem 0.55rem;
  border: none;
  border-radius: 3px;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;
}

.difficulty-none {
  background: transparent;
  color: var(--par-color-text-muted, #6b6b6b);
  font-weight: 500;
}

.difficulty-trivial {
  background: #e8e2d4;
  color: #6b6b6b;
}

.difficulty-easy {
  background: #dde7d3;
  color: #4d6a3c;
}

.difficulty-medium {
  background: #efe6c6;
  color: #87691d;
}

.difficulty-hard {
  background: #ecd7c2;
  color: #9b5730;
}

.difficulty-deadly {
  background: #ebcfca;
  color: #8e3830;
}

/* Folder mover — warm-cream panel. */
.folder-mover {
  margin-bottom: 1.5rem;
  background-color: var(--par-color-callout-bg-light, #F8F2E3);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
  padding: 1.5rem;
}

.folder-mover__field {
  flex: 1;
  min-width: 12rem;
}

/* Bottom action row — centered buttons (Move to folder · Export · Delete). */
.output-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;
  flex-wrap: wrap;
  border-top-color: var(--par-color-divider, #e2dccd);
}

/* Move button aligns to the select box (the field carries a label above it). */
.folder-mover__move {
  align-self: flex-end;
  min-height: 4.2rem;
}

/* "Markdown copied" message — parchment callout (matches the statblock-saved
   message), replacing the green box. */
.homebrewery-link-message {
  background: var(--par-color-callout-bg, #f3ebda);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);

  p {
    color: var(--par-color-text, #222);
  }

  a {
    color: var(--color-action-hover, #2A4D70);

    &:hover {
      color: var(--color-action-active, #1F3A5C);
    }
  }
}

/* ──── Sidebar rows — match the Statblock generator's sidebar (larger rows,
   1.6rem serif, border-bottom dividers, full-fill active). Overrides the
   foundation's sidebar-item-button mixin. ──────────────────────────────── */
.sidebar-content .sidebar-scroll {
  padding: 0;
}

.saved-encounters {
  li {
    margin-bottom: 0;
  }
}

.encounter-button {
  padding: 1.3rem 1.6rem;
  font-size: 1.6rem;
  line-height: 1.3;
  color: var(--par-color-text, #222);
  border-left: none;
  border-radius: 0;
  border-bottom: 1px solid var(--par-color-divider, #e2dccd);
  align-items: baseline;
  gap: 1rem;

  &:hover {
    background-color: rgba(243, 235, 218, 0.4);
  }

  &:focus-visible {
    outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
    outline-offset: -2px;
    border-left: none;
    background-color: transparent;
  }

  &.active {
    background-color: var(--par-color-callout-bg, #f3ebda);
    border-left: none;
    color: var(--color-action-hover, #2A4D70);
    font-weight: 600;
  }
}

.saved-encounters li.active .encounter-button {
  background-color: var(--par-color-callout-bg, #f3ebda);
  border-left: none;
  color: var(--color-action-hover, #2A4D70);
  font-weight: 600;
}

.encounter-composition {
  font-weight: 400;

  .quantity {
    font-size: 0.85em;
    color: var(--par-color-text-muted, #6b6b6b);
  }
}

.saved-encounters li.active .encounter-composition {
  font-weight: 600;
}

/* Per-folder "+ New encounter" — lapis create register, quieter than a row. */
.encounter-button--new {
  display: block;
  font-size: 1.35rem;
  color: var(--color-action-rest, #365A85);

  &:hover {
    color: var(--color-action-hover, #2A4D70);
    background-color: rgba(243, 235, 218, 0.4);
  }

  &.active {
    background-color: var(--par-color-callout-bg, #f3ebda);
    color: var(--color-action-hover, #2A4D70);
    font-weight: 600;
  }
}

.encounter-edition-tabs {
  margin-bottom: -1px; /* document tabs sit on the card's top edge */
}

</style>
