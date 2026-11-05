<template>
  <GeneratorLayout :premium="premium" :show-footer="false">
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
          <p class="page-heading__tagline">Create balanced, export-ready statblocks in 2024 or 2014 rules — every number computed and CR-checked for you.</p>
          <p class="page-heading__tagline">Edit anything in place, re-roll any ability, and convert between editions with one click.</p>
          <p class="page-heading__formats">Exports to Roll20, Homebrewery, Foundry VTT, and Improved Initiative</p>
        </div>

        <!-- ZONE 2: Form card — lifted cream surface, lapis "magic UI" -->
        <div class="form-card parchment paper-grain">
          <h2 class="form-heading">Generate a monster statblock</h2>
          <div class="rules-switch-row">
            <ParSwitch v-model="formatIs2024" data-testid="rules-switch"
              off-label="2014 rules" on-label="2024 rules" aria-label="Use 2024 rules" />
          </div>
          <form @submit.prevent="generateStatblock" class="monster-form">
            <ParField label="Name or concept" :optional="true">
              <ParInput id="monsterName" v-model="monsterName"
                placeholder="Headless Horseman, feywild mud monster — or blank for a random monster" />
            </ParField>

            <div class="form-grid">
              <ParField label="Combat role">
                <ParSelect v-model="archetype" :options="archetypeOptions" />
              </ParField>
              <ParField label="Challenge rating">
                <ParSelect v-model="selectedChallengeRating" :options="challengeRatingData.fullArray" placeholder="CR" />
              </ParField>
            </div>
            <p class="archetype-help">{{ archetypeHelp }}</p>

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
          <PatreonCallout location="statblock-footer">
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

      <div class="statblock-area" v-if="!errorMessage && (monster || loadingPart1 || loadingPart2)">
        <!-- One header row on the card's top edge: edition tabs left (two
             printings of the same document — burgundy content-surface
             register), compact column pill right (lapis chrome register),
             sharing a single divider baseline. Picking a not-yet-converted
             printing shows the blurred preview. -->
        <div class="statblock-tabbar">
          <ParTabToggle
            v-if="monster && !loadingPart1 && !loadingPart2"
            v-model="cardEdition"
            :options="EDITION_TAB_OPTIONS"
            data-testid="edition-switch"
          />
          <span v-else></span>
          <ParToggleGroup
            v-if="shouldDisplayInterface && canSwitchColumns"
            v-model="userColumnsPreference"
            size="small"
            aria-label="Statblock column layout"
            class="column-toggle-compact"
          >
            <ParToggleButton toggleValue="one_column">1 Column</ParToggleButton>
            <ParToggleButton toggleValue="two_columns">2 Columns</ParToggleButton>
          </ParToggleGroup>
        </div>

        <!-- Preview state: the other edition doesn't exist yet. The card below
             is the DETERMINISTIC shape mapping of the real monster (numbers and
             structure are exact; only the prose is still source-edition
             phrased) — blurred, with the one-time Convert action on top. -->
        <div v-if="previewEdition && monster" class="edition-preview" data-testid="edition-preview">
          <div class="edition-preview__card">
            <Statblock v-if="previewEdition === '2014'" :monster="previewMonster" :readonly="true"
              :width="850" :columns="userColumnsPreference" />
            <Statblock2024 v-else :monster="previewMonster" :loading="!previewMonster" :readonly="true"
              :width="850" :columns="userColumnsPreference" />
          </div>
          <div class="edition-preview__overlay">
            <ParButton data-testid="convert-edition" :disabled="converting || !!monster?.language" @click="convertMonsterEdition">
              {{ converting ? 'Converting…' : `Convert to ${previewEdition} rules` }}
            </ParButton>
            <p class="edition-preview__note">One-time AI conversion (counts as one generation) — the numbers stay identical; the wording is rewritten in {{ previewEdition }} style. After that the tabs flip instantly.</p>
          </div>
        </div>
        <template v-else-if="displayFormat === '2014' && (loadingPart1 || loadingPart2 || monster)">
          <div v-if="!loadingPart1 && !loadingPart2 && monster && piAliasNote" class="sb24-stage-note" data-testid="pi-alias-note">
            “{{ piAliasNote }}” isn’t in the free D&D rules, so this is an original creature in its spirit.
          </div>
          <div v-if="!loadingPart1 && !loadingPart2 && monster && languageNote" class="sb24-stage-note" data-testid="language-note">
            <template v-if="languageState === 'translated'">Translated into {{ languageNote }} by one extra generation; the block was built and checked in English first.</template>
            <template v-else>The {{ languageNote }} translation didn't go through this time, so this one is in English.</template>
          </div>
          <Statblock :loadingPart1="loadingPart1"
            :width="850" :loadingPart2="loadingPart2" :monster="monster" :columns="userColumnsPreference" :premium="premium"
            :linked-npcs-count="linkedNPCs.length" @update-monster="updateMonster"
            @move-to-folder="showFolderMover = !showFolderMover" @use-in-encounter="useInEncounter" @create-npc="createNPC"
            @delete="deleteStatblock" @can-switch-columns="canSwitchColumns = $event"
            @toggle-export="showExports = !showExports" @toggle-regenerate="showRegenerate = !showRegenerate" />
        </template>
        <template v-else-if="displayFormat === '2024' && (loadingPart1 || monster)">
          <div v-if="loadingPart1 && generationStage" class="sb24-stage-note" data-testid="generation-stage">
            {{ generationStage }}
          </div>
          <div v-if="!loadingPart1 && monster && piAliasNote" class="sb24-stage-note" data-testid="pi-alias-note">
            “{{ piAliasNote }}” isn’t in the free D&D rules, so this is an original creature in its spirit.
          </div>
          <div v-if="!loadingPart1 && monster && languageNote" class="sb24-stage-note" data-testid="language-note">
            Translation is available on 2024-format blocks only, so this 2014 block is in English.
          </div>
          <!-- Staged loading (owner ask, 2026-07-30): the assembled draft
               renders read-only while the audit/fix ladder polishes it;
               before that, the skeleton carries the real engine numbers. -->
          <div v-if="loadingPart1 && generationDraft" class="sb24-draft-revising">
            <Statblock2024 :monster="generationDraft" :readonly="true" :columns="userColumnsPreference" :width="850" />
          </div>
          <Statblock2024 v-else
            :monster="monster" :columns="userColumnsPreference" :width="850" :loading="loadingPart1"
            :chassis-preview="generationChassis"
            :premium="premium" @update-monster="updateMonster"
            @move-to-folder="showFolderMover = !showFolderMover" @use-in-encounter="useInEncounter" @create-npc="createNPC"
            @delete="deleteStatblock" @can-switch-columns="canSwitchColumns = $event"
            @toggle-export="showExports = !showExports" @toggle-regenerate="showRegenerate = !showRegenerate" />
        </template>
      </div>

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
          <ParField label="Combat role">
            <ParSelect v-model="archetype" :options="archetypeOptions" />
          </ParField>
          <ParField label="Challenge rating">
            <ParSelect v-model="selectedChallengeRating" :options="challengeRatingData.fullArray" placeholder="CR" />
          </ParField>
        </div>
        <p
          v-if="monster?.archetype_source === 'auto' && monster?.archetype"
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
        <PatreonCallout location="statblock-footer">
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
import { ParButton, ParAccordion, ParAccordionGroup, ParToggleGroup, ParToggleButton, ParField, ParInput, ParSelect, ParTextarea, ParCheckbox, ParConfirm, ParSwitch, ParTabToggle } from "@/parchment";
import { logger } from "@/util/logger.mjs";
import { ref, onMounted, onUnmounted, computed, reactive, watch } from 'vue';
import Statblock from '@/components/Statblock.vue';
import Statblock2024 from '@/components/Statblock2024.vue';
import {
  generateMonster2024, buildIdentityPrompt, validateIdentityResponse,
  buildSeedSynthesisPrompt, validateSeedSynthesisResponse,
  parseGenerationResponse, pickRandomArchetype, rollEnergy, rollDamageMix, rollNamingConvention, crNumberFor, crKeyFor, ENERGY_TYPES,
  convertEdition, translateStatblock, to2014Grammar, toLegacyModel, fromLegacyModel,
} from './format-2024/generate.mjs';
import { readRecent, recordShipped } from './skeleton/frequency-ledger.mjs';
import { buildRandomConceptSeed, buildSynthesizedConcept, buildSynthesisGuidance, rollRandomCR } from './format-2024/concept-seeds.mjs';
import GeneratorLayout from '@/components/GeneratorLayout.vue';
import SidebarFooter from '@/components/SidebarFooter.vue';
import VersionBadge from '@/components/VersionBadge.vue';
import PatreonCallout from '@/components/PatreonCallout.vue';
import { patreonTiersUrl } from '@/util/patreon-urls.mjs';
import { generateGptResponse, isDegradedMode } from "@/util/ai-client.mjs";
import { CdrLink, CdrList, IconDownload, IconUpload } from "@rei/cedar";
import "@rei/cedar/dist/style/cdr-list.css";
import StatblockExports from './components/StatblockExports.vue';
import DataManagerModal from '@/components/DataManagerModal.vue';
import { sweepOrphanReferences } from '@/util/sweep-orphan-references.mjs';
import challengeRatingData from '@/data/challengeRatings.json';
import { createStatblockPrompts } from "@/prompts/monster-prompts.mjs";
import { canGenerateStatblock } from "@/util/can-generate-statblock.mjs";
import { filterVerdicts, rejectedCanon } from './reskin/lexicon.mjs';
import { buildRoutePrompt, validateRouteResponse, chooseLine } from './reskin/route.mjs';
import { buildPathPrompt, validatePathResponse, readPath, dispatch as dispatchPath, pathLine } from './reskin/path.mjs';
import { crFromPrompt, crFromWords, readPhrases, piAliasesIn } from './reskin/lexicon.mjs';
import { ARCHETYPE_HELP, ARCHETYPE_OPTIONS } from "@/util/embedded-statblock.mjs";
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


const loadingPart1 = ref(false);
const loadingPart2 = ref(false);

// Staged-loading previews (2024 path): engine numbers land instantly, the
// assembled draft shows while the audit/fix ladder runs, and each call
// boundary reports what it's doing.
const generationChassis = ref(null);
const generationDraft = ref(null);
const generationStage = ref('');
const STAGE_COPY = {
  writing: 'Writing abilities…',
  rebuilding: 'Structure was off — rebuilding…',
  audit: 'Checking our work…',
  // The draft card already shows the provisional name — "finalizing"
  // matches what actually happens (it may survive, it may improve).
  naming: 'Finalizing the name…',
};
function onGenerationProgress(p) {
  if (p.phase === 'chassis') {
    generationChassis.value = p.chassis;
    generationStage.value = 'Locking the numbers…';
  } else if (p.phase === 'draft') {
    generationDraft.value = p.monster;
  } else if (p.phase === 'status') {
    generationStage.value = p.stage === 'fixing'
      ? `Polishing ${p.count === 1 ? 'a flagged ability' : `${p.count} flagged abilities`}…`
      : (STAGE_COPY[p.stage] ?? '');
  }
}
function clearGenerationPreview() {
  generationChassis.value = null;
  generationDraft.value = null;
  generationStage.value = '';
}
const monsterName = ref('');
const monsterType = ref('Random');

// 2014/2024 rules toggle — default 2024, remembered per browser. The 2024
// path swaps the Build select for the archetype ("Combat role") select.
const FORMAT_STORAGE_KEY = 'statblock-format';
const format = ref(localStorage.getItem(FORMAT_STORAGE_KEY) === '2014' ? '2014' : '2024');
watch(format, (v) => localStorage.setItem(FORMAT_STORAGE_KEY, v));

// v-model adapter for the ParSwitch (on = 2024).
const formatIs2024 = computed({
  get: () => format.value === '2024',
  set: (on) => { format.value = on ? '2024' : '2014'; },
});

const archetype = ref('auto');
const archetypeOptions = ARCHETYPE_OPTIONS;
const archetypeHelp = computed(() => ARCHETYPE_HELP[archetype.value] ?? '');

// Legacy Build values map onto archetypes for regenerating pre-engine
// monsters (the Build select itself is retired from the form).
const BUILD_TO_ARCHETYPE = {
  'Stronger Defense': 'defender',
  'Stronger Offense': 'brute',
  Balanced: 'auto', // balanced retired 2026-09-15 — old Builds resolve by concept
  Random: 'auto',
};
// Reverse map so the legacy two-part pipeline (escape hatch below) can still
// be steered from the Combat role select.
const ARCHETYPE_TO_BUILD = {
  defender: 'Stronger Defense',
  brute: 'Stronger Offense',
};

// Escape hatch: the pre-engine 2014 two-part pipeline, kept as a reachable
// fallback until the engine-generated 2014 path is production-verified
// (plans/statblock-2014-archetype-retrofit.md). Not surfaced in the UI.
const useLegacy2014 = () => localStorage.getItem('statblock-legacy-2014') === '1';

// Which card renders: a loaded monster's own format wins; while generating
// (monster is null) the form toggle decides.
const displayFormat = computed(() =>
  monster.value ? (monster.value.format === '2024' ? '2024' : '2014') : format.value
);
const monsterDescription = ref('');
// one line under the result when a Product Identity name was rewritten to a description (PI alias spec 2026-10-01)
const piAliasNote = ref(''); // the name the user typed (e.g. "mind flayer"), or '' when no alias fired
const languageNote = ref(''); // the output language the user asked for, or ''
const languageState = ref(''); // 'translated' | 'failed' | ''
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
    // Backfill: 2024 blocks saved before assembly stamped challenge_rating
    // lack the field the sidebar label and CR sort read. In-memory only;
    // the next save persists it.
    for (const folder of Object.values(allData)) {
      if (!Array.isArray(folder)) continue;
      for (const m of folder) {
        if (m && !m.challenge_rating && m.cr_str) {
          m.challenge_rating = `${m.cr_str} (XP ${(m.xp ?? 0).toLocaleString('en-US')}; PB ${m.pb >= 0 ? '+' : ''}${m.pb ?? 2})`;
        }
      }
    }
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
  const parts = String(text ?? '').split(' ');
  for (let part of parts) {
    if (/^\d+\/\d+$/.test(part) || /^\d+(\.\d+)?$/.test(part)) {
      return part;
    }
  }
  return null;
}

function fractionToDecimal(fraction) {
  if (fraction == null) return NaN;
  if (fraction.includes('/')) {
    const [numerator, denominator] = fraction.split('/').map(Number);
    return numerator / denominator;
  }
  return parseFloat(fraction);
}

function sortMonstersByCR(folderName) {
  // A monster's numeric `cr` (engine blocks) backstops an absent or
  // unparsable challenge_rating string (2024 blocks saved before the
  // challenge_rating stamp existed) — unknowns sort last, never crash.
  const crOf = (m) => {
    const parsed = fractionToDecimal(getFirstNumber(m.challenge_rating));
    if (Number.isFinite(parsed)) return parsed;
    return typeof m.cr === 'number' ? m.cr : Infinity;
  };
  return monsters.value[folderName].sort((a, b) => crOf(a) - crOf(b));
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

// Build the save payload from in-memory user data only — drop any
// wrapper-owned fields (current quota or legacy) that may have been loaded
// into `monsters.value`. Then copy the latest quota fields forward from
// localStorage so generate gates and saves don't clobber each other's
// writes on this key.
function persistMonsters() {
  const stored = JSON.parse(localStorage.getItem('monsters')) || {};
  const dataToStore = { ...monsters.value };
  for (const key of RESERVED_HOST_FIELDS) delete dataToStore[key];
  for (const key of QUOTA_FIELDS) {
    if (stored[key] !== undefined) dataToStore[key] = stored[key];
  }
  localStorage.setItem('monsters', JSON.stringify(dataToStore));
}

function updateMonster(updatedMonster) {
  // Store old name to detect renames
  const oldMonster = monsters.value[activeFolder.value][activeMonsterIndex.value];
  const oldName = oldMonster?.name;
  const newName = updatedMonster.name;

  // An edit invalidates the cached other-edition conversion — the two
  // printings would silently diverge otherwise. The switch falls back to
  // the Convert state until re-converted.
  delete updatedMonster.other_edition;

  // Update the monster
  monster.value = updatedMonster;
  monsters.value[activeFolder.value][activeMonsterIndex.value] = updatedMonster;
  persistMonsters();

  // If the name changed, update all references across other tools
  if (oldName && newName && oldName !== newName) {
    const result = renameStatblockReferences(oldName, newName);
    if (result.totalUpdated > 0) {
      toast.success(`Renamed "${oldName}" to "${newName}" and updated ${result.totalUpdated} reference${result.totalUpdated > 1 ? 's' : ''} in other tools`);
    }
  }
}

function selectMonster(folderName = 'Uncategorized', index, { fillForm = true } = {}) {
  activeFolder.value = folderName;
  activeMonsterIndex.value = index;
  monster.value = monsters.value[folderName][index];
  // fillForm: false = display-only selection. Generation-complete used to
  // fill the form with its own result, so roll 2's resolve call found
  // roll 1's invented name sitting in the name/concept field and judged
  // it USER-PROVIDED — the same name shipped 3 for 3 (the Grave-Hurler
  // Vulture loop, 2026-08-26). The form now only fills on an explicit
  // sidebar selection, where inheriting the identity is the point.
  if (!fillForm) return;
  monsterName.value = monster.value.name;
  monsterType.value = monster.value.monsterType || 'Random';
  monsterDescription.value = monster.value.monsterDescription || '';
  selectedChallengeRating.value = monster.value.selectedChallengeRating || getFirstNumber(monster.value.challenge_rating);
  caster.value = monster.value.caster;
  // Follow the selected monster's rules version so Regenerate re-rolls in the
  // same format; restore its archetype choice ('auto' when it was auto-picked).
  format.value = monster.value.format === '2024' ? '2024' : '2014';
  if (monster.value.archetype) {
    archetype.value = monster.value.archetype_source === 'auto'
      ? 'auto'
      : monster.value.archetype;
  } else {
    // Pre-engine monster: map its old Build value onto the archetype select.
    archetype.value = BUILD_TO_ARCHETYPE[monster.value.monsterType] ?? 'auto';
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
  // the same identity rule as the generate path below: two sheets may share a name, so
  // the row to re-select after the move is this OBJECT, not the first one named like it
  const movedMonster = monsters.value[activeFolder.value][activeMonsterIndex.value];
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
  const movedIdentity = monsters.value[activeFolder.value].indexOf(movedMonster);
  const newIndex = movedIdentity !== -1
    ? movedIdentity
    : monsters.value[activeFolder.value].findIndex(m => m.name === currentMonsterName);
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

// Save target captured when generation STARTS. Browsing the sidebar during
// the wait moves activeFolder/activeMonsterIndex, and resolving the target
// at completion time overwrote whichever monster the user had clicked
// (live bug). Regenerate replaces the monster that was selected at click
// time; anything else saves as new.
let generationTarget = null;

async function generateStatblock() {
  generationTarget = {
    folder: activeFolder.value || 'Uncategorized',
    index: activeMonsterIndex.value,
    name: activeMonsterIndex.value !== null
      ? (monsters.value[activeFolder.value]?.[activeMonsterIndex.value]?.name ?? null)
      : null,
  };
  monster.value = null;
  errorMessage.value = '';
  const canGenerate = await canGenerateStatblock(props.premium);

  if (!canGenerate) {
    return;
  }

  if (format.value === '2024' || !useLegacy2014()) {
    await generateStatblockEngine(format.value);
    return;
  }

  loadingPart1.value = true;
  loadingPart2.value = true;
  const randomCR = rollRandomCR(); // weighted toward actual-play CRs

  const promptOptions = {
    monsterName: monsterName.value,
    challengeRating: selectedChallengeRating.value || randomCR,
    // The Build select is retired; the legacy pipeline derives its Build
    // value from the Combat role select.
    monsterType: ARCHETYPE_TO_BUILD[archetype.value] ?? 'Random',
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
  finalMonster.monsterType = ARCHETYPE_TO_BUILD[archetype.value] ?? 'Random';
  finalMonster.selectedChallengeRating = selectedChallengeRating.value || getFirstNumber(finalMonster.challenge_rating);
  finalMonster.monsterName = monsterName.value || monster.name;
  finalMonster.caster = caster.value;

  await saveGeneratedMonster(finalMonster);
}

// Engine path, both editions: chassis → slot plan → slot-filling prompt →
// assemble → lint with correct/reject loop, via format-2024/generate.mjs.
// The LLM never decides numbers; see docs/2024-architecture.md. 2014 edition
// ships in the legacy model shape so the existing display/export chain works.
// CONCEPT PINNING (owner yes, 2026-08-19): the identity layer is the
// creature's contract — regenerating an unchanged concept reuses the
// resolve output (type, energy, mind, elements, style) instead of
// re-rolling it. Regen variance concentrates in the reskin layer, and
// each regen saves the resolve call. Session-scoped.
const conceptResolutionCache = new Map();

async function generateStatblockEngine(edition) {
  loadingPart1.value = true;
  // Statblock.vue renders one skeleton block per loading flag — the old
  // two-call flow set both, which is what filled both columns. The engine
  // is a single call, but the 2014 display still wants both halves ghosted.
  loadingPart2.value = true;
  piAliasNote.value = piAliasesIn(`${monsterName.value ?? ''} ${monsterDescription.value ?? ''}`)[0]?.matched?.replace(/'s$/i, '') ?? '';
  const crFromUser = selectedChallengeRating.value || crFromPrompt(`${monsterName.value ?? ''} ${monsterDescription.value ?? ''}`); // the words name a CR before the dice do ("level 3 party", "cr 5")
  const crInput = crFromUser || rollRandomCR();
  let cr = crNumberFor(crInput); // a named concept with no CR takes the route call's read below; only a blank form keeps the roll
  /* "uses 2014 rules format" in the words is a directive, not flavor (form-ten 2026-10-01) */
  if (/\bin (?:german|french|spanish|italian|portuguese|japanese|chinese|polish|dutch|russian|korean)\b/i.test(`${monsterName.value ?? ''} ${monsterDescription.value ?? ''}`)) { languageNote.value = (/\bin (german|french|spanish|italian|portuguese|japanese|chinese|polish|dutch|russian|korean)\b/i.exec(`${monsterName.value ?? ''} ${monsterDescription.value ?? ''}`) ?? [])[1] ?? ''; languageState.value = ''; logger.log('[concept] output-language directive:', `${languageNote.value} — the block is built and checked in English, then translated in one extra call`); }
  if (/\b2014\b[^.]{0,20}\b(?:rules|format|edition)\b|\b(?:rules|format|edition)\b[^.]{0,20}\b2014\b/i.test(`${monsterName.value ?? ''} ${monsterDescription.value ?? ''}`)) { edition = '2014'; logger.log('[concept] edition directive:', 'the words ask for the 2014 format'); }

  // Archetype resolution order (settled in the architecture doc):
  // user-picked → no call; Auto + concept → micro resolve call;
  // Auto + all inputs blank → build a random 5-dimension concept seed
  // (concept-seeds.mjs) and resolve the role FROM it, so the role coheres
  // with the seeded traits instead of being a blind random pick.
  const userConcept = [monsterName.value, monsterDescription.value]
    .map((s) => (s || '').trim())
    .filter(Boolean)
    .join(' — ');
  const randomSeed = userConcept ? null : buildRandomConceptSeed();

  let archetypeName = archetype.value;
  let archetypeSource = 'user';
  let synthesizedConcept = null;
  let synthesisGuidance = null; // authoring rules for a blank roll: the PROMPT's, never the GM's words
  let conceptIdentity = null;
  let conceptLore = null;
  let conceptThemes = null;
  // The ONE material the concept call declared from its type's line.
  let conceptHouse = null;
  // The synthesis's own proper name — a naming CANDIDATE, never an override.
  let conceptProposedName = null;
  let conceptMind = null;
  let conceptSize = null;
  let conceptMovement = null;
  let conceptAttackMode = null;
  let conceptSignature = null;
  let conceptStyle = null;
  let conceptBody = null;
  let conceptEnergy = null;
  let conceptMix = null;
  let conceptRejectedCanon = []; // canon cues the resolve REJECTED on the sentence (lexical hints)
  let conceptElements = null;
  // THE NAME RULING (owner, 2026-08-20): whether the input NAMED the
  // creature is the concept call's judgment, not a word-count heuristic.
  // A name may only ever come from the name/concept field - lore is never
  // a name (live: a description typed into the concept field shipped as
  // the monster's name and propagated into every row's self-reference).
  let conceptProvidedName = null;
  let conceptMechanics = null;
  let conceptBane = null;
  let conceptHolds = null; // the route call's read of a containment engine
  let conceptAskedMechanic = null; // the route call's read of WHAT the GM asked a row to do (2026-10-23)
  // Type-by-substance (owner call): the micro-calls decide creature type
  // from the concept's substance; the engine stamps it. Random path falls
  // back to the rolled type when the call fails or skips.
  let resolvedType = randomSeed?.creature_type ?? null;
  let conceptTypeSource = null; // the identity call's own answer: did the GM's words name the type? (replaces a regex over the GM's words — owner, 2026-10-18)
  // The resolve/synthesis call runs for USER-PICKED archetypes too (owner
  // call, 2026-08-04): those generations previously skipped it entirely and
  // got no identity, no lore, and no type honesty. The picked role is
  // passed as GIVEN — the call echoes it and designs around it.
  // 'balanced' aliases to auto-detection (owner 2026-09-15): no donor
  // is balanced-tagged, so the value routed the pre-sprint slot path
  const givenArchetype = archetypeName === 'auto' || archetypeName === 'balanced' ? null : archetypeName;
  // Rolled BEFORE the concept call so the lore is written to it.
  const rolledEnergy = rollEnergy();
  const rolledMix = rollDamageMix();
  const rolledNaming = rollNamingConvention();
  // THE TWO CALLS (owner, 2026-09-21: "let's do two calls. go"):
  //   1. ROUTE (reskin/route.mjs) — the model picks a chassis FROM THE SHELF
  //      by analogy to printed monsters and quotes the input phrase that
  //      earns it; chooseLine verifies every quote and falls to the next
  //      pick on a veto. Its output is exactly generateReskin's interface.
  //   2. IDENTITY (format-2024/generate.mjs) — the prose, written knowing
  //      the chassis, so words and block agree from the start.
  // The blank path runs them the other way round: SYNTHESIS first (there is
  // no concept until the rolled axes fuse), then ROUTE on the fused creature.
  // The old belt stack (STYLE_HOME, demotions, the artillery/engulf belts,
  // the regex claim guards) is gone: the shelf has no unserved styles and no
  // labels to translate.
  let conceptRole = null; // the menu label the saved monster records (artillery/controller for caster lines)
  let conceptLine = null;
  let conceptPath = null; // THE PATH (critic's Five Pipelines brief, step 2): decided once, first; step 2 runs it in shadow beside the matcher
  const hintText = `${monsterName.value} ${monsterDescription.value}`;
  const FACETS = ['bestial','armed','amorphous','grave','fiendish','celestial','fey','draconic','elemental','verdant','forged','mind','venomous','terror','beguiling','grasping','devouring','aquatic','subterranean','aerial','uncanny','arcane','voice','gaze','breath'];
  const KINDS = ['behavior', 'body', 'object', 'aura'];
  // one prose reader for both calls — the identity call (user path) and the
  // synthesis call (blank path) return the same fields but for the lead
  const readProse = (parsed, { blank }) => {
    if (!blank && typeof parsed?.identity === 'string' && parsed.identity.trim().length > 20) conceptIdentity = parsed.identity.trim();
    if (blank && parsed?.synthesis) { synthesizedConcept = buildSynthesizedConcept(randomSeed, parsed.synthesis); synthesisGuidance = buildSynthesisGuidance(randomSeed); }
    if (typeof parsed?.lore === 'string' && parsed.lore.trim().length > 15) conceptLore = parsed.lore.trim();
    // the route decides the type from substance; the prose only fills a gap
    if (!resolvedType && typeof parsed?.creature_type === 'string') resolvedType = parsed.creature_type;
    if (/^(?:user|inferred)$/i.test(String(parsed?.type_source ?? ''))) conceptTypeSource = String(parsed.type_source).toLowerCase();
    if (Array.isArray(parsed?.themes)) {
      const t = parsed.themes.filter((x) => FACETS.includes(String(x).toLowerCase())).slice(0, 2);
      if (t.length) conceptThemes = t;
    }
    if (typeof parsed?.name === 'string' && parsed.name.trim() && parsed.name.trim().split(/\s+/).length <= 4) conceptProposedName = parsed.name.trim();
    if (typeof parsed?.material === 'string' && parsed.material.trim()) conceptHouse = parsed.material.trim().toLowerCase();
    if (['sapient', 'bestial', 'mindless'].includes(parsed?.mind)) conceptMind = parsed.mind;
    if (typeof parsed?.size === 'string') conceptSize = parsed.size;
    if (Array.isArray(parsed?.movement)) conceptMovement = parsed.movement;
    if (typeof parsed?.attack_mode === 'string') conceptAttackMode = parsed.attack_mode;
    if (typeof parsed?.signature_mechanic === 'string') conceptSignature = parsed.signature_mechanic;
    if (Array.isArray(parsed?.signature_elements)) {
      const els = parsed.signature_elements
        .map((x) => (typeof x === 'string' ? { element: x, kind: null } : { element: String(x?.element ?? ''), kind: KINDS.includes(x?.kind) ? x.kind : null }))
        .filter((x) => x.element.trim()).map((x) => ({ element: x.element.trim().slice(0, 80), kind: x.kind })).slice(0, 3);
      if (els.length) conceptElements = els;
    }
    if (!blank) {
      if (typeof parsed?.energy === 'string') {
        const hit = ENERGY_TYPES.find((t) => t.toLowerCase() === parsed.energy.trim().toLowerCase());
        if (hit) conceptEnergy = hit;
      }
      // THE NAME FIELD IS A CLOSED FACT (critic A3, owner 2026-10-18). With a name
      // in the Name box AND a description in the textarea, the GM has already
      // separated the two; nothing is left for the call to judge. It was asked
      // anyway, and answered "not provided" for "Purple Worm" and "Air Elemental"
      // with their descriptions beside them — the engine then minted Gutforge and
      // Chorus of the Drowned. The call's `provided_name` still serves the ONE-BOX
      // shape below (a concept, or a name followed by its description, typed into
      // the Name field alone), which is what it was built to read.
      const typedNameOnly = monsterName.value.trim();
      if (typedNameOnly && monsterDescription.value.trim()) {
        conceptProvidedName = typedNameOnly.replace(/^(?:a|an|the)\s+/i, '');
        logger.log('[concept] name:', `"${conceptProvidedName}" — the Name field, beside a description; the field is the fact, the call is not asked`);
      } else if (typeof parsed?.provided_name === 'string') {
        const pn = parsed.provided_name.trim();
        // provenance AND shape (2026-08-20 / 2026-09-20 item F): the name must
        // come from the name/concept field, be at most 4 words (0/329 print
        // names run longer), and never be the whole input — that is the
        // description, which the generator names
        const inputWords = monsterName.value.trim().split(/\s+/).length;
        // A NAME THE GM TYPED IN THE NAME FIELD IS THE NAME, HOWEVER LONG
        // (owner's stage 1b, 2026-10-16). The four-word cap exists to stop the
        // model lifting a long DESCRIPTION as a name; it also rejected "Templar
        // of the Unmoved Stone", five words the GM had typed in the Name field
        // itself, as "the description, not a name". When the model's answer is
        // the Name field whole, there is nothing to lift and nothing to guess.
        const typedWhole = monsterName.value.trim() && pn.trim().toLowerCase().replace(/^(?:a|an|the)\s+/i, '') === monsterName.value.trim().toLowerCase().replace(/^(?:a|an|the)\s+/i, '');
        const nameShaped = typedWhole || (pn.split(/\s+/).length <= 4 && !(inputWords > 4 && pn.length >= monsterName.value.trim().length - 2));
        // and CASE (two-call smoke 2026-09-21: "grave beetles", "Brass bull",
        // "Drowned Knight" were lifted out of lowercase descriptions 5/15 and
        // locked the generator out of naming): inside a longer input a name is
        // written as one — every word capitalized in the input itself. A short
        // input (≤4 words) is the name however it is cased ("brazen bull").
        const hit = pn && new RegExp(pn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').exec(monsterName.value);
        const asWritten = hit ? hit[0].replace(/^(?:a|an|the)\s+/i, '') : '';
        // TITLE CASE IS HOW A NAME IS WRITTEN (owner's stage 1b, 2026-10-16).
        // This required EVERY word capitalized, so "Templar of the Unmoved Stone"
        // was rejected as "written in lowercase inside a description" over its
        // two title-case particles, and the GM lost the name they typed. A
        // connective is lowercase in correct title case; the test is that every
        // word that is NOT a connective is capitalized.
        const CONNECTIVE = /^(?:of|the|a|an|and|in|at|on|to|for|from|with|de|du|von|van|le|la|el|bin|ibn)$/i;
        const properCase = inputWords <= 4 || (asWritten && asWritten.split(/\s+/).filter((w) => !CONNECTIVE.test(w)).every((w) => /^[A-Z]/.test(w)) && /^[A-Z]/.test(asWritten));
        if (pn && nameShaped && hit && properCase) conceptProvidedName = asWritten;
        else if (pn && hit && !properCase) logger.log('[concept] name:', `provided_name rejected — "${pn.slice(0, 40)}" is written in lowercase inside a description; the generator names it`);
        else if (pn && !nameShaped) logger.log('[concept] name:', `provided_name rejected — "${pn.slice(0, 40)}…" is the description, not a name`);
        // the model returned no provided_name at all ("Meshrin" shipped as Meshrin Pit Champion, step 8 nine): a short Name field with no article IS the name, whatever the model read
        if (!conceptProvidedName && !pn && inputWords <= 4 && monsterName.value.trim() && !/^(?:a|an|the|some)\s/i.test(monsterName.value.trim())) { conceptProvidedName = monsterName.value.trim(); logger.log('[concept] name:', `the Name field "${conceptProvidedName}" is the name — the model named none`); }
      }
      if (['both', 'physical', 'energy'].includes(parsed?.damage_mix)) conceptMix = parsed.damage_mix;
      // contradiction belt: a declared element outranks a 'physical' mix
      // (the icon-first principle) — the model meant 'both'
      if (conceptMix === 'physical' && conceptEnergy) conceptMix = 'both';
      if (conceptMix === 'energy' && !conceptEnergy) conceptMix = null;
    }
    // prose-first: a "bestial" mind whose own identity taunts, performs, or
    // duels is sapient (the Matador read bull, 2026-08-19)
    if (conceptMind === 'bestial'
      && /taunt|mock|jeer|perform|danc|duel|toy(?:s|ing)? with/i.test(`${conceptIdentity ?? ''} ${(conceptElements ?? []).map((e) => e.element).join(' ')}`)) {
      conceptMind = 'sapient';
      logger.log('[concept] mind promoted to sapient — the identity asserts performance/taunting');
    }
    // lexical hints ride the prose call as questions; a REJECTED canon cue
    // is carried forward so the name-canon stamp cannot re-apply it off a
    // name the model then chooses ("Troll-Tooth Knight" got Regeneration)
    const verdicts = filterVerdicts(parsed?.hint_verdicts, hintText);
    conceptRejectedCanon = rejectedCanon(parsed?.hint_verdicts, hintText);
    if (verdicts.length) logger.log('[concept] hints:', verdicts.map((h) => `${h.cue}→${h.field} ${h.accepted ? '✓' : '✗'}${h.because ? ` ("${h.because.slice(0, 40)}")` : ''}`).join(' | '));
  };
  const routeOn = async (text) => {
    try {
      for (const h of piAliasesIn(text)) logger.log('[route] pi alias:', `"${h.matched}" → "${h.text}"`);
      const raw = await generateGptResponse(buildRoutePrompt(readPhrases(text), { cr, menuRole: givenArchetype }), validateRouteResponse, 2); // the rewritten concept is the only text the route reads (PI alias spec 2026-10-01)
      // STEP 7: the PARSE comes back here, the CHOICE is made after the path
      // call resolves, so chooseLine knows which pipeline it is routing for.
      // Both calls still race — the path is known with no added latency.
      return { parsed: parseGenerationResponse(raw), text: readPhrases(text), rawText: text };
    } catch (e) {
      logger.warn('[route] call failed:', e?.message ?? e);
      return null;
    }
  };
  const applyRoute = (route) => {
    if (route?.line) {
      archetypeName = route.archetype;
      conceptRole = route.role;
      conceptLine = route.line;
      conceptStyle = route.style;
      conceptBody = route.body;
      conceptMechanics = route.mechanics;
      conceptBane = route.bane ?? null;
      conceptHolds = route.holds ?? null; // the GM's own undoing, as the route call read it
      conceptAskedMechanic = route.askedMechanic ?? null;
      if (route.resolvedType) resolvedType = route.resolvedType;
      logger.log('[route]', `${route.line}${route.role && route.role !== route.archetype ? ` (${route.role})` : ''} type=${resolvedType ?? '?'} mechanics=${route.mechanics.join(', ') || 'none'} — ${route.notes.join(' | ')}`);
    } else {
      // never-fail: the user's role, else a random plain line — drawn from the
      // SHELF's families (pickRandomArchetype can return swarm/support/glass_cannon,
      // which have no reskin route and fell to the retired slot path: toad, 2026-09-21)
      archetypeName = givenArchetype ?? ['brute', 'skirmisher', 'lurker', 'defender', 'artillery'][Math.floor(Math.random() * 5)];
      conceptMechanics = [];
      logger.log('[route]', `nothing routed${route ? ` (${route.notes.join(' | ')})` : ' — the call failed'}; ${givenArchetype ? `the user's ${givenArchetype}` : `random ${archetypeName}`} plain line ships`);
    }
  };
  {
    archetypeSource = givenArchetype ? 'user' : 'auto';
    try {
      if (userConcept) {
        const pinKey = JSON.stringify([userConcept, monsterDescription.value, cr, givenArchetype]);
        const pinned = conceptResolutionCache.get(pinKey);
        if (pinned) {
          ({ archetypeName, conceptRole, conceptLine, conceptIdentity, conceptLore, resolvedType, conceptTypeSource, conceptThemes, conceptProposedName, conceptHouse, conceptMind, conceptSize, conceptMovement, conceptAttackMode, conceptSignature, conceptStyle, conceptEnergy, conceptMix, conceptElements, conceptProvidedName, conceptMechanics, conceptBody, conceptRejectedCanon } = pinned);
          logger.log('[concept] pinned — reusing the resolution for an unchanged concept');
        } else {
          // CALL 0 — THE PATH, beside the route call (step 2, shadow): code decides the
          // closed cases (an exact print name, a Name-field print name beside a description)
          // with no call; the call reads only free text. Its answer is traced as the first
          // [path] line and compared with the matcher inside the engine; it changes no sheet yet.
          const pathFields = { name: monsterName.value.trim(), concept: monsterDescription.value.trim(), cr: crFromUser ? cr : null, role: givenArchetype, edition };
          const pathOn = async () => {
            const byCode = dispatchPath(pathFields, null);
            if (byCode.path && byCode.by === 'code') return byCode;
            try {
              const rawP = await generateGptResponse(buildPathPrompt(pathFields), validatePathResponse, 2);
              const read = readPath(rawP, { concept: `${pathFields.name} ${pathFields.concept}`.trim(), edition });
              for (const r of read.refused) logger.log('[path] refused:', r);
              return dispatchPath(pathFields, read);
            } catch (e) { logger.warn('[path] call failed:', e?.message ?? e); return dispatchPath(pathFields, null); }
          };
          // A NAME ON ITS OWN IS EXPANDED BEFORE IT IS ROUTED (owner, 2026-11-03).
          // "Pumpkin King" in the Name box with nothing in the textarea gave the route
          // call two words, and `king` is the only one with a mechanical reading — so it
          // routed to brute 6 times out of 6 (pumpkin-six-2026-11-03T22-27-06), drew
          // `brute-9-juggernaut` 5 of those 6, and the Clay Golem composition then filled
          // FIVE of the six rows: an Absorption trait with the energy re-skinned, Siege
          // Monster, Multiattack, a slam and a Recharge 5-6 blast. Every Pumpkin King was
          // a recoloured Stone Golem, which is exactly what the owner reported seeing.
          //
          // So this path runs the two calls in the BLANK ROLL's order — identity first,
          // route second, on the expanded text — because a name with no description is in
          // the same position as an empty form: there is almost nothing for the router to
          // read. It is the SAME TWO CALLS, reversed, so it costs nothing extra.
          //
          // What it gives up: the prose is no longer conditioned on the chassis, which the
          // two-call split was partly for ("words and block agree from the start"). With
          // only a name, routing correctly matters more than prose-chassis agreement — the
          // trade the blank path already makes one block below.
          //
          // THINNESS IS THE TRIGGER, NOT WHICH BOX IT WAS TYPED IN (owner, 2026-11-03:
          // "lizardfolk shadow monk… is basically using the lore field as a place to jot
          // down a short concept and should be expanded just as much as a short name").
          // The first cut keyed on "the Name box is filled and the textarea is empty",
          // which read a WHOLE CONCEPT typed into the name box as a bare name and broke
          // eight tests — "A brass bull that charges down anyone who enters its pen" is
          // not a name needing expansion.
          //
          // `significantWords` is the file's existing definition of a concept too thin to
          // read, already the gate for `engineKeyOk` and for the body-verdict fallback at
          // three words or fewer. One definition, not a private copy.
          //
          // A PRINT NAME KEEPS TODAY'S ORDER. "Ogre" needs no expansion: the exact and
          // twist paths compose it from print, and engine words would only get in the way.
          // DECIDING THE ORDER MAY NEVER FAIL THE SHEET. Both helpers are lazy-loaded, and
          // a caller can have the engine module mocked or tree-shaken to something that
          // does not carry them — which is exactly what happened here first: the 2024-flow
          // spec mocks reskin/generate.mjs down to `generateReskin` alone, so `printHeadCr`
          // was undefined, the call threw, and generation died before its first LLM call.
          // Any failure here falls back to today's route-first order.
          let expandFirst = false;
          try {
            const [gen, tpl] = await Promise.all([import('./reskin/generate.mjs'), import('./reskin/templates.mjs')]);
            if (typeof tpl?.significantWords === 'function') {
              const thin = tpl.significantWords(userConcept).length <= 3;
              const printHead = typeof gen?.printHeadCr === 'function'
                && Number.isFinite(gen.printHeadCr(readPhrases(monsterName.value.trim() || userConcept)));
              expandFirst = thin && !printHead;
              if (thin && printHead) logger.log('[concept] thin but a print creature — keeping route-first:', userConcept);
            }
          } catch (e) {
            logger.warn('[concept] could not decide the call order — keeping route-first:', e?.message ?? e);
          }
          let routeText = userConcept;
          if (expandFirst) {
            // CALL 1 — IDENTITY, unconditioned (`line: null`, which the prompt already
            // tolerates): it answers creature_type, material, size, movement, attack_mode
            // and signature_mechanic, which is the expansion this path needs.
            try {
              const rawX = await generateGptResponse(
                buildIdentityPrompt(readPhrases(userConcept), '', { cr, archetype: givenArchetype, line: null, resolvedType: null }),
                validateIdentityResponse,
                2,
              );
              readProse(parseGenerationResponse(rawX), { blank: false });
              const parts = [userConcept, conceptIdentity, conceptHouse ? `its body is ${conceptHouse}` : null, conceptAttackMode, conceptSignature]
                .map((x) => String(x ?? '').trim()).filter(Boolean);
              if (parts.length > 1) { routeText = parts.join(' — '); logger.log('[concept] thin concept expanded before routing:', routeText.slice(0, 300)); }
              else logger.log('[concept] expansion added nothing — routing on the words as typed');
            } catch (e) {
              // NEVER-FAIL: a failed expansion falls back to today's order, not to nothing.
              logger.warn('[concept] expansion call failed — routing on the name alone:', e?.message ?? e);
            }
          }
          // CALL 1 — ROUTE (CALL 2 on the expand-first path)
          // a shadow decision may never delay the sheet: twenty seconds, then it is recorded as FAILED (timed out) and the route's own read stands
          const routedP = routeOn(routeText); // the route call is issued first; the path call rides beside it
          const pathCapped = Promise.race([pathOn(), new Promise((res) => setTimeout(() => res({ path: null, by: 'call', failed: true, print_body: null, relation: null, class: null, species: null, receipt: 'the path call did not answer within 20 s' }), 20_000))]);
          const [routedRaw, pathDecided] = await Promise.all([routedP, pathCapped]); // name — description, once (the route quoted "Flying speed of 60ft Flying speed of 60f" from the doubled text)
          conceptPath = pathDecided; logger.log(pathLine(conceptPath, userConcept));
          const routed = routedRaw ? chooseLine(routedRaw.parsed, { text: routedRaw.text, rawText: routedRaw.rawText, menuRole: givenArchetype, path: conceptPath?.path ?? null }) : null; // the quote check reads the same rewritten text the model saw
          applyRoute(routed);
          if (!crFromUser) {
            // a print creature with no CR set is its own CR (the Goblin Boss read 4 from the route, print says 1); otherwise the route's read; only a blank form keeps the roll
            const { printHeadCr } = await import('./reskin/generate.mjs');
            const headCr = printHeadCr(readPhrases(monsterName.value.trim() || userConcept)); // a print name in the NAME box, or heading the words ("a swarm of rats that…"), carries its own CR
            if (Number.isFinite(headCr)) { cr = crNumberFor(headCr); logger.log('[concept] cr from print:', `${headCr} — a print creature heads the words and the user set none`); }
            else { const ladder = crFromWords(`${monsterName.value ?? ''} ${monsterDescription.value ?? ''}`); cr = ladder; logger.log('[concept] cr from the words:', `${ladder} — the user set none and no print name heads the words; a fixed ladder, never the model's read (critic form-ten 2026-10-01)`); }
          }
          // CALL 2 — IDENTITY, conditioned on the routed line. SKIPPED when the name was
          // already expanded above: that was this same call, and running it twice would
          // cost a second call for no new field.
          if (!expandFirst) try {
            const raw = await generateGptResponse(
              buildIdentityPrompt(readPhrases(userConcept), readPhrases(monsterDescription.value), { cr, archetype: givenArchetype, line: conceptLine, resolvedType }),
              validateIdentityResponse,
              2,
            );
            readProse(parseGenerationResponse(raw), { blank: false });
          } catch (e) {
            logger.warn('[concept] identity call failed — the routed line ships without prose:', e?.message ?? e);
          }
          logger.log('[concept] resolve:', `archetype=${archetypeName} type=${resolvedType ?? '?'}`
            + ` themes=${(conceptThemes ?? []).join('/') || 'none'} mind=${conceptMind ?? '?'}`
            + ` style=${conceptStyle ?? '—'}`
            + ` energy=${conceptEnergy ?? '—'} mix=${conceptMix ?? '—'}`
            + `${conceptIdentity ? ' identity=✓' : ''}${conceptLore ? ' lore=✓' : ''}`);
          logger.log('[concept] name:', conceptProvidedName ? `provided "${conceptProvidedName}"` : 'not provided — the input describes, the generator names it');
          logger.log('[concept] mechanics:', (conceptMechanics ?? []).join(', ') || 'none claimed');
          if (conceptElements) logger.log('[concept] signature elements:', conceptElements.map((e) => `${e.element}${e.kind ? ` [${e.kind}]` : ''}`).join(' | '));
          if (conceptIdentity) logger.log('[concept] identity:', conceptIdentity);
          if (conceptLore) logger.log('[concept] lore:', conceptLore);
          conceptResolutionCache.set(pinKey, { archetypeName, conceptRole, conceptLine, conceptIdentity, conceptLore, resolvedType, conceptTypeSource, conceptThemes, conceptProposedName, conceptHouse, conceptMind, conceptSize, conceptMovement, conceptAttackMode, conceptSignature, conceptStyle, conceptEnergy, conceptMix, conceptElements, conceptProvidedName, conceptMechanics, conceptBody, conceptRejectedCanon });
        }
      } else {
        // CALL 1 — SYNTHESIS: fuse the rolled axes into one creature
        const raw = await generateGptResponse(
          buildSeedSynthesisPrompt(randomSeed, { cr, archetype: givenArchetype, energy: rolledEnergy, damageMix: rolledMix, naming: rolledNaming }),
          validateSeedSynthesisResponse,
          2,
        );
        readProse(parseGenerationResponse(raw), { blank: true });
        conceptPath = dispatchPath({ name: '', concept: '', role: givenArchetype }, null); logger.log(pathLine(conceptPath)); // blank, by code — no call
        // CALL 2 — ROUTE on the fused creature
        {
          // THE BLANK ROLL keeps the override. The step-7 retirement rests on the
          // call quoting THE GM'S OWN WORDS, and on a blank roll there are none —
          // the text is the engine's own synthesis. Unmeasured there, so unchanged.
          const rr = await routeOn(synthesizedConcept ?? randomSeed.concept);
          applyRoute(rr ? chooseLine(rr.parsed, { text: rr.text, rawText: rr.rawText, menuRole: givenArchetype, path: 'blank' }) : null);
        }
        logger.log('[concept] synthesis (blank roll):', `archetype=${archetypeName} type=${resolvedType ?? '?'}`
          + ` themes=${(conceptThemes ?? []).join('/') || 'none'} mind=${conceptMind ?? '?'}`
          + ` style=${conceptStyle ?? '—'}${conceptLore ? ' lore=✓' : ''}`);
        if (synthesizedConcept) logger.log('[concept] synthesis text:', synthesizedConcept);
        if (conceptElements) logger.log('[concept] signature elements:', conceptElements.map((e) => `${e.element}${e.kind ? ` [${e.kind}]` : ''}`).join(' | '));
        if (conceptProposedName) logger.log('[concept] name proposal:', conceptProposedName);
        if (conceptLore) logger.log('[concept] lore:', conceptLore);
      }
    } catch (e) {
      logger.warn('Archetype resolve failed:', e);
    }
    if (!archetypeName || archetypeName === 'auto' || archetypeName === 'balanced') archetypeName = givenArchetype ?? ['brute', 'skirmisher', 'lurker', 'defender', 'artillery'][Math.floor(Math.random() * 5)];
  }

  // the user's own words are NAME AND DESCRIPTION together — the name alone
  // dropped "Flying speed of 60ft" and "no legendary actions" on the floor
  // (form-ten 2026-10-01: the engine read "Owlbear" and "Ancient Red Dragon")
  const baseConcept = userConcept
    || synthesizedConcept
    || randomSeed.concept;
  let concept = conceptIdentity
    ? `${baseConcept}\nCOMBAT IDENTITY (design every ability to serve this): ${conceptIdentity}`
    : baseConcept;
  // The lore line guides the ship (owner design, 2026-08-04): one sentence
  // of who-it-is-and-why that the generation designs toward and the naming
  // call reads for fit — the anti-hodgepodge anchor.
  // a blank roll's authoring rules ride here, with identity and lore — never in
  // baseConcept, which is what the engine reads as the GM's own words
  if (synthesisGuidance) concept += `\nAUTHORING RULES (for this rolled concept; not the user's words): ${synthesisGuidance}`;
  if (conceptLore) concept += `\nLORE (the creature's story — every ability and its name should feel like they belong to it): ${conceptLore}`;

  // Two body derivations stay deterministic where print is certain: a
  // Dragon creature_type IS the dragon body; "swarm of" IS a swarm. (The
  // Ooze-type derivation is gone — a tar-mouthed toad typed Ooze shipped
  // on ooze-4; the route now decides the ooze body from quoted evidence.)
  if (!conceptBody && resolvedType === 'Dragon') conceptBody = 'dragon';
  if (!conceptBody && /\bswarm of\b/i.test(`${monsterName.value} ${monsterDescription.value} ${synthesizedConcept ?? ''}`)) conceptBody = 'swarm';

  let finalMonster;
  try {
    // THE RESKIN PATH — DEFAULT-ON for skirmisher (owner, 2026-08-26:
    // "this is so much better than the other way"; pilot spec v0
    // 2026-08-17, hardened through ~40 live-reviewed blocks). Every
    // 2024 skirmisher generation routes here; the slot path remains for
    // all other roles. The old pilot flag is now a KILL SWITCH:
    // localStorage['statblock-reskin-pilot']='0' restores the slot path.
    // BRUTE — DEFAULT-ON (owner, 2026-09-01, after 6 batches / ~30
    // live-reviewed blocks; pilot opened 2026-08-26). Same kill-switch
    // semantics as skirmisher: localStorage['statblock-reskin-brute']='0'
    // restores the slot path.
    // CASTER (2026-09-02, corpus sweep + critic counter-offer ratified):
    // the Artillery and Controller menu entries are style PRIORS over ONE
    // caster donor family — Artillery pins the burst prior (plain line),
    // Controller pins 'binder'. A concept-claimed style overrides the
    // prior (the no-force ruling). Kill switch:
    // localStorage['statblock-reskin-caster']='0' restores the slot path.
    // LURKER (2026-09-04, corpus sweep n~22): under-card defenses paid by
    // tech, the ambush attack-roll idiom, the conditioned hide-cycle.
    // Three lines: plain=stalker, 'phantom', 'trap'. Kill switch:
    // localStorage['statblock-reskin-lurker']='0' restores the slot path.
    // DEFENDER (2026-09-08, sweep amended the 2026-09-02 pin by print:
    // SRD 5.2 retired Parry — the protector WEARS its defense). Lines:
    // plain=soldier (Knight/Guard Captain), 'warden' (Shield Guardian
    // transfer link). Kill switch: statblock-reskin-defender='0'.
    const isCasterRole = archetypeName === 'caster' || archetypeName === 'artillery' || archetypeName === 'controller';
    const menuRole = isCasterRole ? (conceptRole ?? (archetypeName !== 'caster' ? archetypeName : 'artillery')) : null;
    // THE 2014 MOVE (owner go 2026-09-14: "let's update the 2014"): a
    // 2014-format generation now rides the SAME reskin pipeline — every
    // guard, the library, the replacement clause — then one lint-gated
    // convertEdition call rewrites the phrasing and both printings save
    // (other_edition = the 2024 original, so the tabs flip free). The
    // slot path remains behind the kill switch:
    // localStorage['statblock-reskin-2014']='0'.
    let served2014 = false;
    const reskin2014 = edition === '2014' && localStorage.getItem('statblock-reskin-2014') !== '0';
    // OWNER'S RULING (2026-10-20): AN EXACT NAME ON A 2014 SHEET IS THE 2014
    // BLOCK, SERVED STRAIGHT. The two books hold different creatures — the 5.1
    // Vampire is AC 16 / 144 HP, the 5.2 one 16 / 195 — and a GM on 2014 rules
    // who typed "Vampire" was getting the 5.2 creature with 2014 phrasing laid
    // over it. The exact path takes no call in either edition, so this is a
    // lookup: no generation, no conversion call, nothing rephrased.
    // Narrow by ruling: TWISTS on a 2014 sheet still start from the 5.2 body.
    if (edition === '2014' && conceptPath?.path === 'exact') {
      const { exact2014Printing } = await import('./reskin/print-2014.mjs');
      const served = exact2014Printing(conceptPath.print_body ?? monsterName.value.trim());
      if (served) {
        logger.log('[reskin] 2014 exact:', `"${served.name}" served from the SRD 5.1 corpus — no call, nothing rephrased (owner's ruling; the 2014 book's own creature)`);
        finalMonster = served;
        served2014 = true;
      } else {
        logger.log('[reskin] 2014 exact:', `"${conceptPath.print_body ?? monsterName.value.trim()}" is not in the SRD 5.1 corpus — the 5.2 block converts as before`);
      }
    }
    if (!served2014 && (edition === '2024' || reskin2014) && (
      (archetypeName === 'skirmisher' && localStorage.getItem('statblock-reskin-pilot') !== '0')
      || (archetypeName === 'brute' && localStorage.getItem('statblock-reskin-brute') !== '0')
      || (archetypeName === 'lurker' && localStorage.getItem('statblock-reskin-lurker') !== '0')
      || (archetypeName === 'defender' && localStorage.getItem('statblock-reskin-defender') !== '0')
      || (isCasterRole && localStorage.getItem('statblock-reskin-caster') !== '0')
      || (conceptBody && localStorage.getItem('statblock-reskin-bodies') !== '0'))) {
      const { generateReskin } = await import('./reskin/generate.mjs');
      finalMonster = await generateReskin(
        {
          archetype: isCasterRole ? 'caster' : archetypeName,
          menuRole,
          stylePrior: menuRole === 'controller' ? 'binder' : null,
          concept, cr, onProgress: onGenerationProgress,
          fixedName: conceptProvidedName,
          path: conceptPath, // shadow: the engine traces agreement with its matcher and reads nothing else from it (step 2)
          style: conceptStyle,
          signatureElements: conceptElements ?? [],
          mind: conceptMind,
          movement: conceptMovement ?? [],
          edition, // the form's edition: print's 2024-only reclasses (goblins to Fey) are not 2014's (form-ten 2026-10-01)
          // the resolve's creature_type rides along — without it the
          // reskin call re-picks and defaults to Monstrosity (4 of 5
          // first-lurker-smoke blocks drifted, 2026-09-04)
          resolvedType: resolvedType ?? null,
          // BODY TYPE (owner 2026-09-11): ooze/swarm/dragon donor pools
          // outrank the role at pickDonor; kill switch
          // statblock-reskin-bodies='0'
          bodyType: conceptBody ?? null,
          energy: userConcept ? conceptEnergy : rolledEnergy,
          mix: userConcept ? conceptMix : rolledMix,
          caster: caster.value,
          mechanics: conceptMechanics ?? null,
          bane: conceptBane ?? null,
          holds: conceptHolds,
          askedMechanic: conceptAskedMechanic, // selects templates by DECLARED mechanic, ahead of any word rule
          themes: conceptThemes ?? null, // the call's own read of the creature's substance, for the alias guard
          rejectedCanon: conceptRejectedCanon,
          typeSource: conceptTypeSource, // 'user' | 'inferred' | null — the call's field, not a word read
          userConcept: baseConcept, // the user's own words — the verb the signature must serve (the identity prose is the model's)
          material: conceptHouse, // the body's material — fire defenses derive from it (wax is vulnerable, never resistant)
          // THE 2014 LINE is the DMG table itself (2026-10-02): `edition`
          // above makes the card read challengeRatings.json for HP, AC,
          // attack, DC and damage. The flat 0.7 it replaces undershot the
          // table (a CR 10 horseman at 38 sustained vs the DMG's 63-68).
          // Tab conversions stay format-only (numbers never rebalance).
          dprScale: 1,
          takenNames: Object.values(monsters.value ?? {})
            .filter(Array.isArray).flat().map((m) => m?.name).filter(Boolean),
        },
        (prompt, validate) => generateGptResponse(prompt, validate, 3),
      );
      if (reskin2014) {
        // the reskin speaks 2024; the card the user asked for is 2014.
        // Conversion failure NEVER fails the generation — the
        // deterministic shape ships with 2024 phrasing (honest degrade,
        // same never-fail law as every other organ).
        const source = JSON.parse(JSON.stringify(finalMonster));
        try {
          const converted = await convertEdition(source, (p, v) => generateGptResponse(p, v, 3), { degraded: isDegradedMode() });
          delete converted._conversionNotes;
          // PROVENANCE SURVIVES THE EDITION (critic's gate-4 read, 2026-10-16).
          // The conversion rewrites PHRASING and returns a fresh object, so
          // `generation` — the clause record, the donor, the trace's provenance —
          // was dropped on every 2014 sheet. Coverage reads generation.clauses,
          // so it scored every 2014 block against an empty clause list: Kaelen
          // and Thurivald were the only two 2014 blocks in
          // classes-eight-2026-10-16T22-10-02 and the only two with none.
          if (source.generation && !converted.generation) converted.generation = source.generation;
          converted.other_edition = finalMonster;
          finalMonster = converted;
          logger.log('[reskin] 2014 conversion:', 'one lint-gated call — both printings saved');
        } catch (e2) {
          logger.warn('[reskin] 2014 conversion failed — the deterministic shape ships with 2024 phrasing:', e2?.message ?? e2);
          const shaped = toLegacyModel(source);
          // the classic card renders inline markdown (owner 2026-09-14)
          // — the 2024 markers display as italic labels, no strip needed;
          // the deterministic 2014 grammar pass still runs so no 2024 token ships (checker 2026-10-02)
          for (const k of ['abilities', 'actions', 'bonus_actions', 'reactions', 'legendary_actions']) if (Array.isArray(shaped[k])) shaped[k] = shaped[k].map((e) => ({ ...e, name: String(e.name ?? '').replace(/\bBloodied\b/g, 'Wounded'), description: to2014Grammar(e.description) }));
          if (source.generation && !shaped.generation) shaped.generation = source.generation; // the degraded path loses it too
          // A FAILED CONVERSION SHIPS MARKED (critic A9, 2026-10-18): nine of 32 conversion
          // calls failed in one run and every half-converted sheet read "edition: ok".
          // The checker's edition gate reads this mark and fails the block.
          shaped.generation = { ...(shaped.generation ?? {}), conversion: 'failed' };
          shaped.other_edition = finalMonster;
          finalMonster = shaped;
        }
      }
    } else if (!served2014) {
      finalMonster = await generateMonster2024(
      {
        concept,
        description: monsterDescription.value,
        cr,
        archetypeName: archetypeName === 'caster' ? (conceptRole ?? 'artillery') : archetypeName,
        caster: caster.value,
        archetypeSource,
        edition,
        seedTraits: randomSeed,
        resolvedType,
        lore: conceptLore,
        themes: conceptThemes,
        house: conceptHouse,
        proposedName: conceptProposedName,
        recent: readRecent(),
        energy: userConcept ? conceptEnergy : rolledEnergy,
        damageMix: userConcept ? conceptMix : rolledMix,
        naming: rolledNaming,
        mind: conceptMind,
        conceptSize,
        movement: conceptMovement,
        attackMode: conceptAttackMode,
        signatureMechanic: conceptSignature,
        // The saved roster's names, so the flavor call never re-mints one
        // (live: two different Celestials both named "Uulghoth" — a
        // duplicate-key error in public, and name__folder identity makes
        // same-folder collisions a data hazard).
        takenNames: Object.values(monsters.value ?? {})
          .filter(Array.isArray).flat().map((m) => m?.name).filter(Boolean),
        // Concept-path naming refinement: refine the name via the naming
        // micro-call unless the model kept the user's typed name verbatim
        // (a kept name was judged a proper name — honor it).
        namePass: randomSeed ? null : { userTypedName: conceptProvidedName },
        // Fallback-model mode: ship degraded output instead of failing
        // generations the weaker model can't polish (owner call).
        degraded: isDegradedMode(),
        onProgress: onGenerationProgress,
      },
      (prompt, validate) => generateGptResponse(prompt, validate, 3),
      );
    }
    // Cross-block frequency ledger: record what SOURCE ROWS this block
    // shipped, so the next generations damp them. Keyed on the row, not the
    // shipped name — the demiplane banish appeared four times under four
    // names, which is exactly why the repeat was invisible per-block.
    recordShipped(finalMonster?.generation?.row_keys ?? []);
  } catch (e) {
    errorMessage.value = e.message;
    // Failure taxonomy: keep the last 20 failures (rule names + settings) in
    // a ring buffer so "generations keep failing" reports come with data.
    // Inspect via localStorage['statblock-failure-log'] in the console.
    logger.error('Statblock generation failed:', e.rejectRules ?? e.message);
    try {
      const log = JSON.parse(localStorage.getItem('statblock-failure-log') ?? '[]');
      log.push({
        at: new Date().toISOString(),
        cr: crKeyFor(cr),
        archetype: archetypeName,
        edition,
        rules: e.rejectRules ?? null,
        message: String(e.message).slice(0, 300),
      });
      localStorage.setItem('statblock-failure-log', JSON.stringify(log.slice(-20)));
    } catch { /* telemetry must never break the error path */ }
    toast.error('Failed to generate statblock. Please try again.');
    clearGenerationPreview();
    loadingPart1.value = false;
    loadingPart2.value = false;
    return;
  }

  // Regen params — same fields the 2014 path stamps, so selectMonster
  // restores the form for Regenerate.
  // THE TRANSLATION PASS: one extra call on the finished, lint-clean English block (owner 2026-10-01); never fails the generation
  if (languageNote.value && finalMonster.format === '2024') {
    try {
      finalMonster = await translateStatblock(finalMonster, languageNote.value, (p, v) => generateGptResponse(p, v, 3));
      languageState.value = 'translated';
      logger.log('[concept] translated:', `${languageNote.value} — one extra call; the engine built and checked the block in English${finalMonster._translationNotes ? ` (${finalMonster._translationNotes})` : ''}`);
      delete finalMonster._translationNotes;
    } catch (e3) { languageState.value = 'failed'; logger.warn('[concept] translation failed — the English block ships:', e3?.message ?? e3); }
  } else if (languageNote.value) languageState.value = 'failed';
  finalMonster.monsterDescription = monsterDescription.value;
  finalMonster.selectedChallengeRating = crKeyFor(cr);
  finalMonster.monsterName = monsterName.value || finalMonster.name;
  finalMonster.caster = caster.value;

  clearGenerationPreview();
  loadingPart1.value = false;
  await saveGeneratedMonster(finalMonster);
  // lint_warnings stay stamped on the monster (console + debugging), but
  // are NOT surfaced in the UI (owner call): if the user is happy with the
  // output, don't invite them to second-guess it.
}

// ---------------------------------------------------------------------------
// Edition switch — cache-and-swap (owner design, 2026-07-19).
//
// The saved monster IS the active edition; the converted counterpart lives on
// it as `other_edition` (full object, no nesting). Flipping the switch swaps
// active ↔ cached and persists — instant and lossless. Flipping toward an
// edition that doesn't exist yet enters preview mode: the target card renders
// the DETERMINISTIC shape mapping of the monster (blurred — the prose is
// still source-phrased) under a one-time Convert button; convertEdition's
// LLM call rewrites the prose and fills the cache. Any edit/re-roll/
// regenerate of the active edition invalidates the cache (updateMonster and
// saveGeneratedMonster) — propagating edits across editions would be the
// translation problem again, so we drop and re-convert instead.
// ---------------------------------------------------------------------------
const previewEdition = ref(null); // '2014' | '2024' | null
const converting = ref(false);

const activeEdition = computed(() =>
  monster.value?.format === '2024' ? '2024' : '2014');

const EDITION_TAB_OPTIONS = [
  { value: '2014', label: '2014 rules' },
  { value: '2024', label: '2024 rules' },
];

// v-model adapter for the edition tabs: shows the printing being viewed
// (preview target while previewing); picking the other tab toggles.
const cardEdition = computed({
  get: () => previewEdition.value ?? activeEdition.value,
  set: (v) => {
    if (v !== (previewEdition.value ?? activeEdition.value)) toggleEdition();
  },
});

// Deterministic target-shape preview of the active monster. null (→ skeleton)
// only if the mapping throws on a malformed block.
const previewMonster = computed(() => {
  if (!previewEdition.value || !monster.value) return null;
  try {
    const source = JSON.parse(JSON.stringify(monster.value));
    delete source.other_edition;
    return previewEdition.value === '2014' ? toLegacyModel(source) : fromLegacyModel(source);
  } catch (e) {
    logger.warn('Edition preview mapping failed:', e);
    return null;
  }
});

// Leaving the monster (select/new/delete/regenerate) leaves preview mode.
watch(monster, () => { previewEdition.value = null; });

function toggleEdition() {
  if (!monster.value || converting.value) return;
  if (previewEdition.value) {
    previewEdition.value = null; // flip back from an unconverted preview
    return;
  }
  if (monster.value.other_edition) {
    swapEditions();
  } else {
    previewEdition.value = activeEdition.value === '2024' ? '2014' : '2024';
  }
}

function swapEditions() {
  const current = { ...monster.value };
  const cached = current.other_edition;
  delete current.other_edition;
  const next = { ...cached, other_edition: current };
  monster.value = next;
  monsters.value[activeFolder.value][activeMonsterIndex.value] = next;
  persistMonsters();
  format.value = next.format === '2024' ? '2024' : '2014';
}

// The one-time Convert action on the blurred preview. One LLM call rewrites
// the prose into the target edition (convertEdition); numbers never change.
async function convertMonsterEdition() {
  if (!monster.value || !previewEdition.value || converting.value) return;
  // Conversion is one LLM call — it meters like a generation (owner call:
  // no premium gate; free users spend one of the daily five, premium is
  // unlimited). canGenerateStatblock also owns the incognito + limit toasts.
  const canConvert = await canGenerateStatblock(props.premium);
  if (!canConvert) return;
  const target = previewEdition.value;
  converting.value = true;
  try {
    const source = JSON.parse(JSON.stringify(monster.value));
    delete source.other_edition;
    const converted = await convertEdition(source, (p, v) => generateGptResponse(p, v, 3), { degraded: isDegradedMode() });
    // Sanctioned conversion adjustments (e.g. the 2024 B/P/S-package drop)
    // arrive as transient notes — toast them, never persist them.
    const conversionNotes = converted._conversionNotes ?? [];
    delete converted._conversionNotes;
    converted.other_edition = source;
    monster.value = converted;
    monsters.value[activeFolder.value][activeMonsterIndex.value] = converted;
    persistMonsters();
    format.value = converted.format === '2024' ? '2024' : '2014';
    previewEdition.value = null;
    toast.success(`Converted to the ${target} rules — both printings are saved; use the tabs to flip between them.`);
    for (const note of conversionNotes) toast.info(note, 8000);
  } catch (e) {
    logger.error('Edition conversion failed:', e);
    toast.error('Failed to convert this statblock. Please try again.');
  } finally {
    converting.value = false;
  }
}

async function saveGeneratedMonster(finalMonster) {
  // Save into the slot captured at generation start — never the current
  // selection, which may have moved while the user browsed during the wait.
  const target = generationTarget ?? {
    folder: activeFolder.value || 'Uncategorized',
    index: activeMonsterIndex.value,
    name: activeMonsterIndex.value !== null
      ? (monsters.value[activeFolder.value]?.[activeMonsterIndex.value]?.name ?? null)
      : null,
  };
  generationTarget = null;
  const folderName = target.folder;
  let replaceIndex = null;
  if (target.index !== null && target.name) {
    const list = monsters.value[folderName] ?? [];
    // Indexes shift on delete/sort — trust the index only if the same
    // monster still occupies it, otherwise find it by name. Deleted
    // mid-generation → save as new rather than overwrite a stranger.
    replaceIndex = list[target.index]?.name === target.name
      ? target.index
      : list.findIndex((m) => m.name === target.name);
    if (replaceIndex === -1) replaceIndex = null;
  }
  if (!monsters.value[folderName]) {
    monsters.value[folderName] = [];
  }
  if (replaceIndex !== null) {
    monsters.value[folderName][replaceIndex] = finalMonster;
  } else {
    monster.value = finalMonster;
    monsters.value[folderName].push(finalMonster);
  }
  monsters.value[folderName] = sortMonstersByCR(folderName);
  // IDENTITY, NOT NAME (owner, 2026-11-05: "if I generate two headless horsemans at the
  // same cr the first one displays"). The sheet is pushed, the list is re-sorted, and the
  // index was then recovered by NAME — so `findIndex` returned the FIRST monster with
  // that name and the card showed the older sheet while the new one saved correctly. At
  // the same CR the two land adjacent after the sort, which is why comparing variants of
  // one creature is exactly the workflow that broke it. Caught by the critic on the
  // 11-05 gate as #21 showing #03's Owlbear, with both sheets right in storage.
  //
  // `finalMonster` is the object this function just placed in the array, in BOTH the
  // replace and the append branch, and a sort moves references rather than copying them,
  // so its position is recoverable exactly. The name search stays as a fallback only.
  const byIdentity = monsters.value[folderName].indexOf(finalMonster);
  const newIndex = byIdentity !== -1
    ? byIdentity
    : monsters.value[folderName].findIndex(monster => monster.name === finalMonster.name);
  // display-only: the form keeps what the user typed (the write-back
  // here is how the Grave-Hurler Vulture named itself 3 rolls running)
  selectMonster(folderName, newIndex, { fillForm: false });
  persistMonsters();
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

/* "Ink still drying": a soft band of light sweeps the draft card while
   the audit/fix ladder revises it. Overlay only — text stays readable,
   nothing shifts. */
.sb24-draft-revising {
  position: relative;
}

.sb24-draft-revising::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    100deg,
    transparent 35%,
    rgba(212, 175, 55, 0.10) 47%,
    rgba(212, 175, 55, 0.16) 50%,
    rgba(212, 175, 55, 0.10) 53%,
    transparent 65%
  );
  background-size: 300% 100%;
  animation: sb24-revising-sweep 3.2s ease-in-out infinite;
  pointer-events: none;
}

@keyframes sb24-revising-sweep {
  0% { background-position: 120% 0; }
  100% { background-position: -80% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .sb24-draft-revising::after {
    animation: none;
    background: rgba(212, 175, 55, 0.07);
  }
}

.sb24-stage-note {
  font-family: var(--par-font-serif, Georgia, serif);
  font-style: italic;
  font-size: 1.4rem;
  color: #58180D;
  margin: 0 0 0.8rem;
}

.monster-form__caster {
  margin: 0.25rem 0 0.5rem;
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

/* 2014/2024 rules switch (ParSwitch) — compact corner control instead of a
   full-width segmented bar (owner feedback, 2026-07-19). */
.rules-switch-row {
  display: flex;
  justify-content: flex-end;
  margin: -0.8rem 0 1rem;
}

/* Card area: edition tabs sit on the card's top edge like document tabs —
   two printings of the same monster. */
.statblock-area {
  max-width: 850px;
  width: 100%;
  margin: 0 auto;
}

.statblock-tabbar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.6rem;
  margin: 1.6rem 0 0;
  border-bottom: 1px solid var(--par-color-divider, #e2dccd);
}

/* The row owns the divider so it spans under both controls; strip the tab
   strip's internal one (the active tab's burgundy underline still overlaps
   the shared baseline via its own -1px margin). */
.statblock-tabbar :deep(.par-tab-toggle) {
  border-bottom: none;
  margin-bottom: 0;
}

/* Scaled up from the primitive's default so the tabs hold their own against
   the column pill on the same row. */
.statblock-tabbar :deep(.par-tab-toggle__btn) {
  font-size: 1.4rem;
  padding: 0.9rem 1.8rem;
}

/* ParToggleGroup fills its container by design — shrink it to content and
   lift it just off the baseline. Sized a notch below the group's own
   "small" so it reads as an accessory to the tabs, not a peer. */
.statblock-tabbar .column-toggle-compact {
  width: auto;
  margin-bottom: 0.5rem;
  padding: 0.3rem;
}

.statblock-tabbar .column-toggle-compact :deep(.par-toggle-button__item) {
  font-size: 1.1rem;
  padding: 0.35rem 1rem;
}

/* Tuck both cards up under the tabs' divider baseline so tab + card read
   as one document (the cards' own top margins assume a bare page). */
.statblock-area :deep(.container) {
  margin-top: 0.6rem;
}

.statblock-area :deep(.sb24-container) {
  margin-top: 0.6rem;
}

/* Blurred deterministic preview of the not-yet-converted edition, with the
   one-time Convert action centered on top. */
.edition-preview {
  position: relative;
}

.edition-preview__card {
  filter: blur(4px);
  opacity: 0.75;
  pointer-events: none;
  user-select: none;
}

.edition-preview__overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  padding: 2rem;
  text-align: center;
}

.edition-preview__note {
  max-width: 42rem;
  margin: 0;
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  background: var(--par-color-surface, #FBF7F0);
  border: 1px solid var(--par-color-border, #e8e2d4);
  border-radius: 6px;
  padding: 0.6rem 1rem;
}

/* Archetype helper line (lapis form register). */

.archetype-help {
  margin: -0.4rem 0 1rem;
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
}
</style>