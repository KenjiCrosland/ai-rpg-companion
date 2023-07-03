<template>
  <div id="app" v-bind="$attrs">
    <LocationGenerator v-if="currentPage === 'location-generator'" />
    <NPCGenerator v-if="currentPage === 'npc-generator'" />
    <Dashboard v-if="currentPage === 'gm-dashboard'" />
    <DashboardPlus v-if="currentPage === 'gm-dashboard-plus'" />
    <StatblockGenerator v-if="currentPage === 'statblock-generator'"/>
    <BookGenerator v-if="currentPage === 'book-generator'"/>
  </div>
</template>

<script>
import LocationGenerator from './components/LocationGenerator.vue';
import NPCGenerator from './components/NPCGenerator.vue';
import Dashboard from './components/Dashboard.vue';
import DashboardPlus from './components/DashboardPlus.vue';
import StatblockGenerator from './components/StatblockGenerator.vue';
import BookGenerator from './components/BookGenerator.vue';
import { CdrLink, CdrText } from '@rei/cedar';
import '@rei/cedar/dist/style/cdr-text.css';
import '@rei/cedar/dist/style/cdr-link.css';
export default {
  components: {
    LocationGenerator,
    NPCGenerator,
    Dashboard,
    DashboardPlus,
    StatblockGenerator,
    CdrLink,
    CdrText,
    BookGenerator
},
  data() {
    return {
      currentPage: this.$attrs['data-page'] || 'book-generator',
    };
  },
  mounted() {
    if (typeof gtag === 'function' && this.currentPage === 'location-generator') {
      gtag('config', 'UA-11925218-1', {
        'page_path': '/ai-rpg-location-generator',
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
  },
};
</script>