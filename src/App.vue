<template>
  <div id="app" v-bind="$attrs">
    <LocationGenerator v-if="currentPage === 'location-generator'" />
    <NPCGenerator v-if="currentPage === 'npc-generator'" />
    <Dashboard v-if="currentPage === 'gm-dashboard'" />
    <DashboardPlus v-if="currentPage === 'gm-dashboard-plus'" />
    <StatblockGenerator v-if="currentPage === 'statblock-generator'" />
    <BookGenerator v-if="currentPage === 'book-generator'" />
    <LoreGenerator v-if="currentPage === 'lore-generator'" />
    <DungeonGenerator v-if="currentPage === 'dungeon-generator'" />
    <ItemGenerator v-if="currentPage === 'item-generator'" />
    <EncounterGenerator v-if="currentPage === 'encounter-generator'" />
  </div>
</template>

<script>
import LocationGenerator from './components/LocationGenerator.vue';
import LoreGenerator from './components/LoreGenerator.vue';
import NPCGenerator from './components/NPCGenerator.vue';
import Dashboard from './components/Dashboard.vue';
import DashboardPlus from './components/DashboardPlus.vue';
import StatblockGenerator from './components/StatblockGenerator.vue';
import BookGenerator from './components/BookGenerator.vue';
import DungeonGenerator from './components/DungeonGenerator.vue';
import ItemGenerator from './components/ItemGenerator.vue';
import EncounterGenerator from './components/EncounterGenerator.vue';
import { CdrLink, CdrText } from '@rei/cedar';
import '@rei/cedar/dist/style/cdr-text.css';
import '@rei/cedar/dist/style/cdr-link.css';
export default {
  components: {
    LocationGenerator,
    LoreGenerator,
    NPCGenerator,
    Dashboard,
    DashboardPlus,
    StatblockGenerator,
    CdrLink,
    CdrText,
    BookGenerator,
    DungeonGenerator,
    LoreGenerator,
    ItemGenerator,
    EncounterGenerator
  },
  data() {
    return {
      currentPage: this.$attrs['data-page'] || 'encounter-generator',
    };
  },
  mounted() {
    if (typeof gtag === 'function' && this.currentPage === 'location-generator') {
      gtag('config', 'UA-11925218-1', {
        'page_path': '/ai-rpg-location-generator',
      });
    }
    if (typeof gtag === 'function' && this.currentPage === 'dungeon-generator') {
      gtag('config', 'UA-11925218-1', {
        'page_path': '/ai-powered-dungeon-generator',
      });
    }
    if (typeof gtag === 'function' && this.currentPage === 'npc-generator') {
      gtag('config', 'UA-11925218-1', {
        'page_path': '/rpg-ai-npc-generator',
      });
    }
    if (typeof gtag === 'function' && this.currentPage === 'gm-dashboard') {
      gtag('config', 'UA-11925218-1', {
        'page_path': '/gm-dashboard',
      });
    }
    if (typeof gtag === 'function' && this.currentPage === 'gm-dashboard-plus') {
      gtag('config', 'UA-11925218-1', {
        'page_path': '/gm-dashboard-plus',
      });
    }
    if (typeof gtag === 'function' && this.currentPage === 'statblock-generator') {
      gtag('config', 'UA-11925218-1', {
        'page_path': '/ai-powered-dnd-5e-monster-statblock-generator',
      });
    }
    if (typeof gtag === 'function' && this.currentPage === 'item-generator') {
      gtag('config', 'UA-11925218-1', {
        'page_path': '/dnd-5e-magic-item-generator',
      });
    }
    if (typeof gtag === 'function' && this.currentPage === 'encounter-generator') {
      gtag('config', 'UA-11925218-1', {
        'page_path': '/dnd-5e-encounter-generator',
      });
    }
  },
};
</script>