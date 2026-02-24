<template>
  <GeneratorLayout :premium="premium">
    <template #sidebar>
      <div class="sidebar-content">
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
          <cdr-button modifier="dark" @click="showDataManagerModal = true" :full-width="true">
            Save/Load Data from a File
          </cdr-button>
          <cdr-button @click="deleteAllDungeons" modifier="secondary" :full-width="true">Delete All
            Dungeons</cdr-button>
        </div>

        <DataManagerModal :opened="showDataManagerModal" @update:opened="showDataManagerModal = $event"
          :premium="premium" currentApp="dungeons" />
      </div>
    </template>

    <!-- Main Content -->
    <div class="generator-container">
      <div v-if="!dungeonStore.currentDungeon && !dungeonStore.loadingOverview" class="landing-wrapper">
        <!-- ZONE 1: Hero header -->
        <div class="hero-header">
          <div class="brand-line">
            <span class="brand-name">Kenji's Dungeon Generator</span>
            <span v-if="!premium" class="version-pill">Free</span>
            <span v-else class="version-pill premium">Premium</span>
          </div>
          <h1>Create Complete D&D 5e Dungeons in Minutes</h1>
          <p class="value-prop">Generate dungeon maps, NPCs, monsters with full statblocks, and export-ready content.
          </p>
        </div>

        <!-- ZONE 2: Form card -->
        <div class="form-card">
          <form @submit.prevent="dungeonStore.generateDungeonOverview">
            <div class="generator-fields">
              <cdr-input id="adjective" v-model="dungeonStore.overviewForm.adjective" background="secondary"
                label="Adjective (optional)" placeholder="e.g. Forgotten, Decaying, Sunken" />
              <cdr-input id="setting_type" v-model="dungeonStore.overviewForm.setting_type" background="secondary"
                label="Type of Dungeon (optional)" placeholder="e.g. Temple, Fortress, Outpost" />
              <cdr-input id="place_name" v-model="dungeonStore.overviewForm.place_name" background="secondary"
                label="Place Name (optional)" placeholder="e.g. Grimhold, Farwatch Outpost" />
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
                label="Dungeon Lore (optional)" placeholder="Enter additional details">
                <template #helper-text-bottom>
                  Need help with lore? Use the
                  <cdr-link href="https://cros.land/ai-powered-lore-and-timeline-generator/">Lore Generator</cdr-link>.
                </template>
              </cdr-input>
            </div>
            <cdr-button style="margin-top: 2rem" type="submit" :full-width="true">Generate Dungeon</cdr-button>
          </form>
        </div>

        <!-- ZONE 3: Footer meta -->
        <div class="footer-meta">
          <p v-if="!premium" class="limit-info">
            Free: 5 statblock generations per 24 hours. Full dungeon creation, maps, NPCs, and exports included.
            <cdr-link href="https://cros.land/dungeon-generator-2-0-premium-version/">Go Premium for unlimited
              statblocks
              &rarr;</cdr-link>
          </p>
          <p v-else class="limit-info">
            Premium: Unlimited statblocks, NPCs, monsters, and map generation. Export to Homebrewery, HTML, or plain
            text.
          </p>
        </div>
      </div>
      <div v-if="dungeonStore.currentDungeon || dungeonStore.loadingOverview" class="content-container">
        <Tabs :activeIndex="dungeonStore.activeTabIndex" @tab-changed="onTabChanged" class="tabs">
          <TabPanel label="Overview">
            <OverviewTab />
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

        <!-- Export Section -->
        <DungeonExports :dungeon="dungeonStore.currentDungeon" />
      </div>

      <!-- Delete Button -->
      <cdr-button v-if="dungeonStore.currentDungeon" class="delete-dungeon-button" size="small" modifier="secondary"
        @click="dungeonStore.deleteDungeon(dungeonStore.currentDungeonId)">
        Delete Current Dungeon
      </cdr-button>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useDungeonStore } from '../stores/dungeon-store.mjs';
import { useToast } from '../../composables/useToast';

import { CdrButton, CdrLink, CdrInput, CdrSelect } from '@rei/cedar';
import GeneratorLayout from '../../components/GeneratorLayout.vue';
import Tabs from '../../components/tabs/Tabs.vue';
import TabPanel from '../../components/tabs/TabPanel.vue';
import DataManagerModal from '../../components/DataManagerModal.vue';

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
  border-top: 1px solid #dee2e6;
  background-color: #f9f9f9;
}

.saved-dungeons {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 8px;

    &.active .dungeon-button {
      background-color: #ffffff;
      border-left-color: #007BFF;
      font-weight: 600;
    }
  }

  .dungeon-button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    font-size: 1.4rem;
    text-align: left;
    background-color: #e9ecef;
    border: none;
    border-left: 3px solid transparent;
    color: #212529;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 4px;

    &:hover {
      background-color: #dee2e6;
    }

    &:focus {
      outline: 2px solid #007BFF;
      outline-offset: 2px;
    }

    &.active {
      background-color: #ffffff;
      border-left-color: #007BFF;
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

/* ZONE 3: Footer meta */
.footer-meta {
  text-align: center;
  padding: 1.5rem 1rem 0;

  .limit-info {
    font-size: 1.4rem;
    color: #6c757d;
    margin: 0;
    line-height: 1.6;
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

.delete-dungeon-button {
  margin-top: 2rem;
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
