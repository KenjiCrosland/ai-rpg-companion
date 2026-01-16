<template>
  <!-- fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
    rel="stylesheet">
  <!-- legacy material icons (optional if you fully switch to Symbols) -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <!-- material symbols (REQUIRED for many of your ligatures like fort, diamond, workspace_premium) -->
  <link
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
    rel="stylesheet">

  <div id="app" v-bind="$attrs">
    <LocationGenerator v-if="currentPage === 'location-generator'" />
    <NPCGenerator v-if="currentPage === 'npc-generator'" />
    <NPCGenerator :premium="true" v-if="currentPage === 'npc-generator-premium'" />
    <Dashboard v-if="currentPage === 'gm-dashboard'" />
    <DashboardPlus v-if="currentPage === 'gm-dashboard-plus'" />
    <StatblockGenerator v-if="currentPage === 'statblock-generator'" />
    <StatblockGenerator :premium="true" v-if="currentPage === 'statblock-generator-premium'" />
    <BookGenerator v-if="currentPage === 'book-generator'" />
    <LoreGenerator v-if="currentPage === 'lore-generator'" />
    <DungeonGenerator v-if="currentPage === 'dungeon-generator'" />
    <DungeonGeneratorPremium v-if="currentPage === 'dungeon-generator-premium'" />
    <ItemGenerator v-if="currentPage === 'item-generator'" />
    <ItemGenerator :premium="true" v-if="currentPage === 'item-generator-premium'" />
    <EncounterGenerator v-if="currentPage === 'encounter-generator'" />
    <EncounterGeneratorPremium v-if="currentPage === 'encounter-generator-premium'" />
    <SettingGenerator v-if="currentPage === 'setting-generator'" />
    <SettingGenerator :premium="true" v-if="currentPage === 'setting-generator-premium'" />
    <TabsExample v-if="currentPage === 'tabs-example'" />
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
import DungeonGeneratorPremium from './components/DungeonGeneratorPremium.vue';
import ItemGenerator from './components/ItemGenerator.vue';
import EncounterGenerator from './components/EncounterGenerator.vue';
import EncounterGeneratorPremium from './components/EncounterGeneratorPremium.vue';
import SettingGenerator from './components/SettingGenerator.vue';
import TabsExample from './components/tabs/TabsExample.vue';
import ToolSuiteShowcase from './components/ToolSuiteShowcase.vue';
import { CdrLink } from '@rei/cedar';
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
    BookGenerator,
    DungeonGenerator,
    DungeonGeneratorPremium,
    LoreGenerator,
    ItemGenerator,
    EncounterGenerator,
    EncounterGeneratorPremium,
    SettingGenerator,
    TabsExample
  },
  data() {
    return {
      currentPage: this.$attrs['data-page'] || 'location-generator',
    };
  },
  mounted() {
    if (typeof gtag === 'function' && this.currentPage === 'location-generator') {
      gtag('config', 'UA-11925218-1', { 'page_path': '/ai-rpg-location-generator' });
    }
    if (typeof gtag === 'function' && this.currentPage === 'town-kingdom-generator') {
      gtag('config', 'UA-11925218-1', { 'page_path': '/town-kingdom-generator' });
    }
    if (typeof gtag === 'function' && this.currentPage === 'dungeon-generator') {
      gtag('config', 'UA-11925218-1', { 'page_path': '/ai-powered-dungeon-generator' });
    }
    if (typeof gtag === 'function' && this.currentPage === 'dungeon-generator-premium') {
      gtag('config', 'UA-11925218-1', { 'page_path': '/ai-powered-dungeon-generator-premium' });
    }
    if (typeof gtag === 'function' && this.currentPage === 'npc-generator') {
      gtag('config', 'UA-11925218-1', { 'page_path': '/rpg-ai-npc-generator' });
    }
    if (typeof gtag === 'function' && this.currentPage === 'gm-dashboard') {
      gtag('config', 'UA-11925218-1', { 'page_path': '/gm-dashboard' });
    }
    if (typeof gtag === 'function' && this.currentPage === 'gm-dashboard-plus') {
      gtag('config', 'UA-11925218-1', { 'page_path': '/gm-dashboard-plus' });
    }
    if (typeof gtag === 'function' && this.currentPage === 'statblock-generator') {
      gtag('config', 'UA-11925218-1', { 'page_path': '/ai-powered-dnd-5e-monster-statblock-generator' });
    }
    if (typeof gtag === 'function' && this.currentPage === 'statblock-generator-premium') {
      gtag('config', 'UA-11925218-1', { 'page_path': '/ai-powered-dnd-5e-monster-statblock-generator-premium' });
    }
    if (typeof gtag === 'function' && this.currentPage === 'item-generator') {
      gtag('config', 'UA-11925218-1', { 'page_path': '/dnd-5e-magic-item-generator' });
    }
    if (typeof gtag === 'function' && this.currentPage === 'encounter-generator') {
      gtag('config', 'UA-11925218-1', { 'page_path': '/dnd-5e-encounter-generator' });
    }
    if (typeof gtag === 'function' && this.currentPage === 'encounter-generator-premium') {
      gtag('config', 'UA-11925218-1', { 'page_path': '/dnd-5e-encounter-generator-premium' });
    }
    if (typeof gtag === 'function' && this.currentPage === 'setting-generator') {
      gtag('config', 'UA-11925218-1', { 'page_path': '/rpg-setting-generator-and-world-building-tool' });
    }
  },
};
</script>

<style>
:root {
  --font-sans: "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

html,
body {
  font-family: var(--font-sans);
}

/* Make form controls inherit too */
body,
button,
input,
select,
textarea {
  font-family: inherit;
}

/* ===== Global font override, with EXCEPTIONS for icon fonts ===== */
:where(html, body, #root) :where(*):not(.material-icons):not(.material-symbols-outlined) {
  font-family: var(--font-sans) !important;
}

/* Don’t break code/mono/icon fonts */
pre,
code,
kbd,
samp,
.mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
}

/* If you keep this selector, exclude material classes */
[class*="icon"]:not(.material-icons):not(.material-symbols-outlined),
.icon:not(.material-icons):not(.material-symbols-outlined),
i.icon:not(.material-icons):not(.material-symbols-outlined) {
  font-family: inherit !important;
}

/* ===== Force correct font on Material icon classes ===== */
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined' !important;
  font-weight: 400 !important;
  font-style: normal !important;
  line-height: 1;
  display: inline-block;
  vertical-align: middle;
  letter-spacing: normal !important;
  text-transform: none !important;

  /* Make sure ligatures are enabled */
  font-feature-settings: 'liga' 1;
  -webkit-font-feature-settings: 'liga' 1;

  /* Variable font axes */
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Legacy Material Icons (if used anywhere) */
.material-icons {
  font-family: 'Material Icons' !important;
  font-weight: normal !important;
  font-style: normal !important;
  line-height: 1;
  display: inline-block;
  vertical-align: middle;
  letter-spacing: normal !important;
  text-transform: none !important;
  -webkit-font-smoothing: antialiased;
}
</style>
