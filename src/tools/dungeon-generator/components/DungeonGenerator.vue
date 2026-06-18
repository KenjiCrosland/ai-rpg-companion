<template>
  <GeneratorLayout :premium="premium" :flexible-sidebar="true" :show-footer="false">
    <template #sidebar>
      <div class="sidebar-content parchment">
        <div class="sidebar-scroll">
          <ul class="saved-dungeons">
            <li v-for="(dungeon) in dungeonStore.dungeons" :key="dungeon.id"
              :class="{ active: dungeonStore.currentDungeonId === dungeon.id }">
              <button class="dungeon-button" @click="dungeonStore.selectDungeon(dungeon.id)">
                <span>{{ dungeon.dungeonOverview.name }}</span>
              </button>
            </li>
            <li>
              <button class="dungeon-button" @click="dungeonStore.createNewDungeon"
                :class="{ active: dungeonStore.currentDungeonId === null }">
                + New Dungeon
              </button>
            </li>
          </ul>
        </div>

        <div class="sidebar-footer">
          <ParButton @click="deleteAllDungeons" variant="secondary" :full-width="true">Delete All
            Dungeons</ParButton>
        </div>

        <DataManagerModal :opened="showDataManagerModal" @update:opened="showDataManagerModal = $event"
          :premium="premium" currentApp="dungeons" />
      </div>
    </template>

    <!-- Main Content -->
    <div class="generator-container">
      <div v-if="!dungeonStore.currentDungeon && !isGenerating" class="landing-wrapper">
        <!-- ZONE 1: Hero header -->
        <div class="hero-header">
          <div class="brand-line">
            <span class="brand-name">Kenji's Dungeon Generator</span>
            <!-- Version pill is fresh-visit framing — suppressed during
                 seeded flows where the user is mid-task. Mirrors the
                 NPC generator's pattern. -->
            <span v-if="!isSeededFlow && !premium" class="version-pill">Free</span>
            <span v-else-if="!isSeededFlow" class="version-pill premium">Premium</span>
          </div>
          <template v-if="isSeededFlow">
            <h1>
              Create Dungeon<template v-if="seedStubName">: {{ seedStubName }}</template>
            </h1>
            <p class="value-prop">
              From your {{ seedSourceType }}
              <a href="#" class="seed-source-link" @click.prevent="navigateBackToSeedSource">{{ seedSourceName }}</a>
            </p>
          </template>
          <template v-else>
            <h1>Create Complete D&D 5e Dungeons in Minutes</h1>
            <p class="value-prop">Generate dungeon maps, NPCs, monsters with full statblocks, and export-ready content.
            </p>
          </template>
        </div>

        <!-- ZONE 2: Form card -->
        <div class="form-card">
          <!-- Cross-tool seed callout: shown when the user arrived from
               the Item Generator (pendingSeed populated by the mount
               handler). Removes the "is anything actually happening?"
               ambiguity the empty form created. Kept terse — backend
               processes (register inheritance, mode inference,
               dimensional presets) intentionally not surfaced. -->
          <SeededFromBanner
            :source-type="seededFromItem ? 'item' : ''"
            :source-name="seededFromItem?.name || ''"
          />
          <form @submit.prevent="handleGenerateDungeon">
            <div class="form-row-description">
              <cdr-input id="dungeon_description" v-model="dungeonStore.overviewForm.description"
                background="secondary"
                label="Describe your dungeon (optional)"
                placeholder="e.g. A sunken Mesopotamian ziggurat called Edutu — or leave blank for a surprise." />
            </div>
            <cdr-select class="generator-field-select" id="difficulty" v-model="dungeonStore.overviewForm.difficulty"
              background="secondary" label="Dungeon Difficulty" :options="difficultyOptions"
              :placeholder="'Select Difficulty'">
              <template #helper-text-bottom>
                Select the desired difficulty tier for the dungeon.
              </template>
            </cdr-select>
            <div class="lore-field-input">
              <cdr-input :rows="5" tag="textarea" v-model="dungeonStore.overviewForm.place_lore" background="secondary"
                label="Dungeon Lore (optional)" placeholder="Paste in existing lore, or describe deeper history — optional.">
                <template #helper-text-bottom>
                  Need help with lore? Use the
                  <cdr-link href="https://cros.land/ai-powered-lore-and-timeline-generator/">Lore Generator</cdr-link>.
                </template>
              </cdr-input>
            </div>
            <ParButton style="margin-top: 2rem" type="submit" :full-width="true">Generate Dungeon</ParButton>
          </form>
        </div>

        <!-- ZONE 3: Footer with save/load or upgrade prompt -->
        <div class="dungeon-footer">
          <PatreonCallout v-if="!premium" :patreon-url="patreonLoginUrl">
            <template #body>
              <p class="patreon-callout__body">Your work is saved to this browser only. Premium syncs across devices and unlocks unlimited monster statblock generation within your dungeons.</p>
            </template>
            <template #features>
              <li>Cross-device save and load — your dungeons sync between browsers and devices.</li>
              <li>Unlimited monster statblock generation within dungeons — no daily cap.</li>
              <li>
                <a :href="patreonTiersUrl" target="_blank" rel="noopener">See all premium tiers and benefits on Patreon</a><span aria-hidden="true"> →</span>
              </li>
            </template>
          </PatreonCallout>
          <ParCallout v-else>
            <p>Dungeon data is saved on this browser. Export to a file to use on another device. Premium: Unlimited statblocks.</p>
            <ParButton @click="showDataManagerModal = true">
              Save/Load Data from a File
            </ParButton>
          </ParCallout>
        </div>
      </div>
      <div v-if="dungeonStore.currentDungeon || isGenerating" class="content-container">
        <Tabs :activeIndex="dungeonStore.activeTabIndex" @tab-changed="onTabChanged" class="tabs">
          <TabPanel label="Overview">
            <OverviewTab :is-loading="isGenerating" />
          </TabPanel>

          <TabPanel label="Map">
            <MapTab />
          </TabPanel>

          <TabPanel label="NPCs">
            <NPCsTab :premium="premium" />
          </TabPanel>

          <TabPanel label="Monsters">
            <MonstersTab :premium="premium" />
          </TabPanel>
        </Tabs>

        <!-- Export Section - only show when dungeon exists -->
        <DungeonExports v-if="dungeonStore.currentDungeon" :dungeon="dungeonStore.currentDungeon" />
      </div>

      <!-- Footer below content -->
      <div v-if="dungeonStore.currentDungeon || isGenerating" class="dungeon-footer">
        <PatreonCallout v-if="!premium" :patreon-url="patreonLoginUrl">
          <template #body>
            <p class="patreon-callout__body">Your work is saved to this browser only. Premium syncs across devices and unlocks unlimited monster statblock generation within your dungeons.</p>
          </template>
          <template #features>
            <li>Cross-device save and load — your dungeons sync between browsers and devices.</li>
            <li>Unlimited monster statblock generation within dungeons — no daily cap.</li>
            <li>
              <a :href="patreonTiersUrl" target="_blank" rel="noopener">See all premium tiers and benefits on Patreon</a><span aria-hidden="true"> →</span>
            </li>
          </template>
        </PatreonCallout>
        <ParCallout v-else>
          <p>Dungeon data is saved on this browser. Export to a file to use on another device. Premium: Unlimited statblocks.</p>
          <ParButton @click="showDataManagerModal = true">
            Save/Load Data from a File
          </ParButton>
        </ParCallout>
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { ParButton, ParCallout } from "@/parchment";
import SeededFromBanner from '@/components/SeededFromBanner.vue';
import { ref, computed, onMounted, provide } from 'vue';
import { useDungeonStore } from '../stores/dungeon-store.mjs';
import { useToast } from '@/composables/useToast';
import { getNavigationParams, navigateToTool } from '@/util/navigation.mjs';
import { loadSeededInput } from '@/util/seeded-input.mjs';
import { canGenerateCrossTool } from '@/util/can-generate-cross-tool.mjs';
import { buildDungeonPrefillFromItem } from '@/prompts/item-dungeon-prompts.mjs';
import { pendingSeed, overviewForm, currentDungeonId } from '../stores/dungeon-state.mjs';
import { patreonTiersUrl } from '@/util/patreon-urls.mjs';

import { CdrLink, CdrInput, CdrSelect } from '@rei/cedar';
import GeneratorLayout from '@/components/GeneratorLayout.vue';
import Tabs from '@/components/tabs/Tabs.vue';
import TabPanel from '@/components/tabs/TabPanel.vue';
import DataManagerModal from '@/components/DataManagerModal.vue';
import PatreonCallout from '@/components/PatreonCallout.vue';

// The tabs as separate components
import OverviewTab from './OverviewTab.vue';
import MapTab from './MapTab.vue';
import NPCsTab from './NPCsTab.vue';
import MonstersTab from './MonstersTab.vue';
import DungeonExports from './DungeonExports.vue';

const props = defineProps({
  premium: { type: Boolean, default: false },
});

const dungeonStore = useDungeonStore();
const toast = useToast();
const showDataManagerModal = ref(false);
const isGenerating = ref(false);

/**
 * Read pendingSeed and surface the item name to the template so the
 * form-side callout knows what to display. `pendingSeed` is populated
 * by the mount handler when navigating from the Item Generator;
 * cleared by the post-generation finalize hook in overview-store.
 *
 * Returns null when no item seed is pending; otherwise { name }.
 * Backend details (selected stub, register, inferred mode, dimensional
 * presets) are intentionally not surfaced here — the callout is just
 * a "yes, this is happening" affirmation.
 */
const seededFromItem = computed(() => {
  const seed = pendingSeed.value;
  if (!seed || seed.source?.type !== 'item') return null;
  return {
    name: seed.source.name || seed.source.id || '',
  };
});

// Seeded landing-page heading. Fires whenever a SeededInput exists,
// regardless of whether the seed names a specific destination entity:
// the dungeon generator has both a stub-based flow ("Create Dungeon"
// on a specific related_dungeons stub) AND a whole-item flow
// ("Generate a Dungeon from this Item"). The latter has no
// entities[0].name, so a stub-name-gated swap (NPCGenerator's
// pattern) leaves the whole-item case stranded with the generic
// header. Reading from source.type alone matches the SeededFromBanner's
// gate and ensures the hero swap fires in both cases. The h1 then
// conditionally includes the stub name when present.
const isSeededFlow = computed(() => !!pendingSeed.value?.source);
const seedStubName = computed(() => pendingSeed.value?.entities?.[0]?.name || '');
const seedSourceName = computed(() => pendingSeed.value?.source?.name || '');
const seedSourceType = computed(() => pendingSeed.value?.source?.type || '');

function navigateBackToSeedSource() {
  const source = pendingSeed.value?.source;
  if (!source) return;
  if (source.type === 'item') {
    navigateToTool('item-generator', { item: source.id });
  }
  // Setting/dungeon back-navigation can be added when those source flows ship.
}

// Provide motionToggle for Cedar skeleton components
const motionToggle = ref(true);
provide('motionToggle', motionToggle);

// Patreon OAuth URL with return to current page
const patreonLoginUrl = computed(() => {
  const returnUrl = encodeURIComponent(window.location.href);
  return `https://cros.land/patreon-flow/?patreon-login=yes&patreon-final-redirect=${returnUrl}`;
});

// Handle dungeon generation with local loading state
async function handleGenerateDungeon() {
  // Cross-tool gate: when this generation is item-seeded, count it
  // against the shared cross-tool quota (5/day total across all gated
  // combos — shares the counter with item→setting). Free, non-seeded
  // generations short-circuit the gate inside `canGenerateCrossTool`.
  // The gate surfaces its own toast on block; we just bail without
  // flipping the loading state so the user can come back tomorrow or
  // upgrade.
  const seedSourceType = pendingSeed.value?.source?.type;
  if (seedSourceType) {
    const canGenerate = await canGenerateCrossTool(seedSourceType, 'dungeon', props.premium);
    if (!canGenerate) return;
  }

  isGenerating.value = true;
  try {
    await dungeonStore.generateDungeonOverview();
  } finally {
    isGenerating.value = false;
  }
}

const difficultyOptions = [
  'Tier 1: Basic - A local hero in the making.',
  'Tier 2: Expert - An established local hero.',
  'Tier 3: Champion - A hero of the region.',
  'Tier 4: Master - A hero of the world.',
  'Tier 5: Immortal - A hero of the realms.',
];

function deleteAllDungeons() {
  const confirmed = window.confirm('Are you sure you want to delete all dungeons?');
  if (confirmed) {
    dungeonStore.deleteAllDungeons();
    toast.success('All dungeons deleted successfully');
  }
}

function onTabChanged(index) {
  dungeonStore.activeTabIndex = index;
}

onMounted(() => {
  dungeonStore.loadDungeons();

  const params = getNavigationParams();

  // Deep-link: Item Generator → "View in Dungeon Generator" for a
  // promoted stub. Select that dungeon by id. Mirrors the setting
  // generator's `params.setting` branch.
  if (params.dungeon) {
    dungeonStore.selectDungeon(params.dungeon);
    return;
  }

  // Cross-tool seed: Item Generator → "Create Dungeon" from the item.
  // Loads the seed and stashes it in module-level `pendingSeed`. The
  // overview-store's generateDungeonOverview() inspects pendingSeed
  // on its next call to run mode inference and apply mode-derived
  // dimensional presets. Land the user on the overview tab so they
  // can hit Generate immediately.
  //
  // Two seeded paths:
  //   - STUB-BASED (entityName present): prefill the form's description
  //     field with buildDungeonPrefillFromItem(seed) so the user sees
  //     the per-stub seed text (place name + role + source quote) and
  //     can review/edit before clicking Generate.
  //   - WHOLE-ITEM FALLBACK (no entityName): leave the form blank;
  //     overview-store synthesizes context from the item's lore on
  //     the next generateDungeonOverview() call.
  if (params.fromType === 'item' && params.fromId) {
    const seed = loadSeededInput({
      fromType: params.fromType,
      fromId: params.fromId,
      entityName: params.entityName,
      destinationType: 'dungeon',
    });
    if (seed) {
      pendingSeed.value = seed;
      // Clear currentDungeonId so the OverviewTab renders the landing
      // FORM, not whatever existing dungeon `loadDungeons` defaulted
      // to (it falls back to dungeons[0] when no prior selection
      // exists, which is the wrong landing state for a fresh seeded
      // generation). The form's blank slate is what the user expects.
      currentDungeonId.value = null;
      if (params.entityName) {
        const prefill = buildDungeonPrefillFromItem(seed);
        if (prefill) {
          overviewForm.value.description = prefill;
        }
      }
      dungeonStore.activeTabIndex = 0;
      return;
    }
  }

  // Handle deep linking from NPC Generator
  if (params.source && params.tab === 'npcs') {
    // Find dungeon by name
    const dungeon = dungeonStore.dungeons.find(d =>
      d.dungeonOverview?.name === params.source
    );

    if (dungeon) {
      // Select the dungeon
      dungeonStore.selectDungeon(dungeon.id);

      // Switch to NPCs tab (index 2)
      dungeonStore.activeTabIndex = 2;
    }
  }
});
</script>

<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';

/* ========================================
   SIDEBAR
   ======================================== */
.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.sidebar-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.sidebar-footer {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 1px solid var(--par-color-border-strong, #c9b99a);
  background-color: transparent;
}

.saved-dungeons {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 8px;

    &.active .dungeon-button {
      background-color: var(--par-color-callout-bg-deep, #ede2cb);
      border-left-color: var(--color-action-rest, #365A85);
      color: var(--color-action-hover, #2A4D70);
      font-weight: 600;
    }
  }

  .dungeon-button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem 1rem;
    font-size: 1.4rem;
    text-align: left;
    background-color: transparent;
    border: none;
    border-left: 4px solid transparent;
    color: var(--par-color-text, #212529);
    cursor: pointer;
    transition: background-color 0.15s ease, border-left-color 0.15s ease, color 0.15s ease;
    border-radius: var(--par-radius-sm, 3px);

    &:hover {
      background-color: var(--par-color-callout-bg, #f3ebda);
    }

    &:focus-visible {
      outline: none;
      border-left-color: var(--color-action-rest, #365A85);
      background-color: var(--par-color-callout-bg, #f3ebda);
    }

    &.active {
      background-color: var(--par-color-callout-bg-deep, #ede2cb);
      border-left-color: var(--color-action-rest, #365A85);
      color: var(--color-action-hover, #2A4D70);
      font-weight: 600;
    }
  }
}

/* ========================================
   MAIN CONTAINER
   ======================================== */
.generator-container {
  flex: 1;
  padding: 3rem 2rem;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

/* ========================================
   LANDING PAGE: Three-zone layout
   ======================================== */
.landing-wrapper {
  max-width: 855px;
  margin: 0 auto;
}

/* ZONE 1: Hero header */
.hero-header {
  text-align: center;
  padding: 2rem 1rem 2.5rem;

  .brand-line {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.2rem;

    .brand-name {
      font-size: 1.6rem;
      font-weight: 600;
      color: #6c757d;
      letter-spacing: 0.5px;
    }

    .version-pill {
      display: inline-block;
      padding: 0.3rem 1rem;
      background-color: #e9ecef;
      color: #495057;
      font-size: 1.2rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-radius: 12px;

      &.premium {
        background-color: #ffc107;
        color: #212529;
      }
    }
  }

  h1 {
    font-size: 3.6rem;
    font-weight: 700;
    color: #212529;
    margin: 0 0 1rem;
    line-height: 1.2;
  }

  .value-prop {
    font-size: 1.8rem;
    color: #6c757d;
    margin: 0;
    line-height: 1.5;
  }

  /* Seeded-flow back-link to the source entity. Mirrors NPCGenerator's
     .seed-source-link: burgundy parchment accent, quiet by default
     (no underline), underline emerges on hover/focus. */
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

/* ZONE 2: Form card */
.form-card {
  background-color: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 12px;
  padding: 3rem 2.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

  .generator-fields {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .generator-field-select,
  .lore-field-input {
    margin-bottom: 2rem;
  }
}

/* ZONE 3: Dungeon Footer (below form and content) */
.dungeon-footer {
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

/* ========================================
   CONTENT CONTAINER (when dungeon exists)
   ======================================== */
.content-container {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 2rem;
}

/* ========================================
   RESPONSIVE
   ======================================== */
@media screen and (max-width: 768px) {
  .generator-container {
    padding: 2rem 1rem;
  }

  .hero-header {
    padding: 1.5rem 0.5rem 2rem;

    h1 {
      font-size: 2.8rem;
    }

    .value-prop {
      font-size: 1.6rem;
    }
  }

  .form-card {
    padding: 2rem 1.5rem;
    border-radius: 8px;
  }

  .generator-fields {
    grid-template-columns: 1fr;
  }

  .content-container {
    padding: 1.5rem;
  }

  .tabs {
    width: 100%;
  }
}
</style>
