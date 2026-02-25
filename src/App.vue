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

  <!-- Dev Mode Switcher -->
  <div v-if="isDev" :class="['dev-switcher', { minimized: !devSwitcherVisible }]">
    <button
      v-if="!devSwitcherVisible"
      @click="toggleDevSwitcher"
      class="dev-toggle-btn"
      title="Show Dev Switcher (Ctrl+D)"
    >
      🔧
    </button>
    <template v-else>
      <button
        @click="toggleDevSwitcher"
        class="dev-close-btn"
        title="Hide Dev Switcher (Ctrl+D)"
      >
        ×
      </button>
      <label for="page-select">Dev Mode: </label>
      <select id="page-select" v-model="currentPage" @change="saveDevPage">
        <optgroup label="Generators">
          <option value="statblock-generator">Statblock Generator</option>
          <option value="statblock-generator-premium">Statblock Generator (Premium)</option>
          <option value="npc-generator">NPC Generator</option>
          <option value="npc-generator-premium">NPC Generator (Premium)</option>
          <option value="item-generator">Item Generator</option>
          <option value="item-generator-premium">Item Generator (Premium)</option>
          <option value="encounter-generator">Encounter Generator</option>
          <option value="encounter-generator-premium">Encounter Generator (Premium)</option>
          <option value="setting-generator">Setting Generator</option>
          <option value="setting-generator-premium">Setting Generator (Premium)</option>
          <option value="legacy-dungeon-generator">Dungeon Generator (Legacy)</option>
          <option value="legacy-dungeon-generator-premium">Dungeon Generator Premium (Legacy)</option>
          <option value="new-dungeon-generator">New Dungeon Generator</option>
          <option value="new-dungeon-generator-premium">New Dungeon Generator (Premium)</option>
          <option value="location-generator">Location Generator</option>
          <option value="lore-generator">Lore Builder</option>
          <option value="book-generator">Book Generator</option>
        </optgroup>
        <optgroup label="Dashboards">
          <option value="gm-dashboard">GM Dashboard</option>
          <option value="gm-dashboard-plus">GM Dashboard Plus</option>
          <option value="category-landing">Landing Page</option>
        </optgroup>
        <optgroup label="Examples">
          <option value="tabs-example">Tabs Example</option>
        </optgroup>
      </select>
    </template>
  </div>

  <div id="app" v-bind="$attrs">
    <!-- App-wide toast notifications -->
    <AppToast ref="toast" position="top-center" />
    <LocationGenerator v-if="currentPage === 'location-generator'" />
    <NPCGenerator v-if="currentPage === 'npc-generator'" />
    <NPCGenerator :premium="true" v-if="currentPage === 'npc-generator-premium'" />
    <Dashboard v-if="currentPage === 'gm-dashboard'" />
    <DashboardPlus v-if="currentPage === 'gm-dashboard-plus'" />
    <StatblockGenerator v-if="currentPage === 'statblock-generator'" />
    <StatblockGenerator :premium="true" v-if="currentPage === 'statblock-generator-premium'" />
    <BookGenerator v-if="currentPage === 'book-generator'" />
    <LoreGenerator v-if="currentPage === 'lore-generator'" />
    <LegacyDungeonGenerator v-if="currentPage === 'legacy-dungeon-generator'" />
    <LegacyDungeonGeneratorPremium v-if="currentPage === 'legacy-dungeon-generator-premium'" />
    <ItemGenerator v-if="currentPage === 'item-generator'" />
    <ItemGenerator :premium="true" v-if="currentPage === 'item-generator-premium'" />
    <EncounterGenerator v-if="currentPage === 'encounter-generator'" />
    <EncounterGenerator :premium="true" v-if="currentPage === 'encounter-generator-premium'" />
    <SettingGenerator v-if="currentPage === 'setting-generator'" />
    <SettingGenerator :premium="true" v-if="currentPage === 'setting-generator-premium'" />
    <NewDungeonGenerator v-if="currentPage === 'new-dungeon-generator'" />
    <NewDungeonGenerator :premium="true" v-if="currentPage === 'new-dungeon-generator-premium'" />
    <TabsExample v-if="currentPage === 'tabs-example'" />
    <LandingPage v-if="currentPage === 'category-landing'" />


  </div>
</template>

<script>
import LocationGenerator from '@/tools/location-generator/LocationGenerator.vue';
import LoreGenerator from '@/components/LoreGenerator.vue';
import NPCGenerator from '@/tools/npc-generator/NPCGenerator.vue';
import Dashboard from '@/components/Dashboard.vue';
import DashboardPlus from '@/components/DashboardPlus.vue';
import StatblockGenerator from '@/tools/statblock-generator/StatblockGenerator.vue';
import BookGenerator from '@/components/BookGenerator.vue';
import LegacyDungeonGenerator from '@/tools/legacy-tools/dungeon-generator/LegacyDungeonGenerator.vue';
import LegacyDungeonGeneratorPremium from '@/tools/legacy-tools/dungeon-generator/LegacyDungeonGeneratorPremium.vue';
import ItemGenerator from '@/tools/item-generator/ItemGenerator.vue';
import EncounterGenerator from '@/components/EncounterGenerator.vue';
import EncounterGeneratorPremium from '@/components/EncounterGeneratorPremium.vue';
import SettingGenerator from '@/components/SettingGenerator.vue';
import NewDungeonGenerator from '@/tools/dungeon-generator/components/DungeonGeneratorWrapper.vue';
import TabsExample from '@/components/tabs/TabsExample.vue';
import ToolSuiteShowcase from '@/components/ToolSuiteShowcase.vue';
import LandingPage from '@/components/LandingPage.vue';
import AppToast from '@/components/AppToast.vue';
import { registerToast } from '@/composables/useToast';
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
    LegacyDungeonGenerator,
    LegacyDungeonGeneratorPremium,
    NewDungeonGenerator,
    LoreGenerator,
    ItemGenerator,
    EncounterGenerator,
    EncounterGeneratorPremium,
    SettingGenerator,
    TabsExample,
    LandingPage,
    AppToast
  },
  data() {
    return {
      isDev: import.meta.env.DEV,
      currentPage: this.getInitialPage(),
      devSwitcherVisible: this.getDevSwitcherVisibility(),
    };
  },
  methods: {
    getInitialPage() {
      // In dev mode, check localStorage first
      if (import.meta.env.DEV) {
        const savedPage = localStorage.getItem('dev-current-page');
        if (savedPage) return savedPage;
      }
      // Otherwise use data-page attribute or default
      return this.$attrs['data-page'] || 'statblock-generator-premium';
    },
    getDevSwitcherVisibility() {
      if (!import.meta.env.DEV) return false;
      const saved = localStorage.getItem('dev-switcher-visible');
      return saved !== null ? saved === 'true' : true; // default to visible
    },
    saveDevPage() {
      if (import.meta.env.DEV) {
        localStorage.setItem('dev-current-page', this.currentPage);
      }
    },
    toggleDevSwitcher() {
      this.devSwitcherVisible = !this.devSwitcherVisible;
      localStorage.setItem('dev-switcher-visible', this.devSwitcherVisible.toString());
    },
    handleKeyDown(e) {
      // Toggle dev switcher with Ctrl+D (or Cmd+D on Mac)
      if (import.meta.env.DEV && (e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        this.toggleDevSwitcher();
      }
    },
  },
  mounted() {
    registerToast(this.$refs.toast);

    // Add keyboard shortcut for dev switcher
    if (import.meta.env.DEV) {
      window.addEventListener('keydown', this.handleKeyDown);
    }

    if (typeof gtag === 'function' && this.currentPage === 'location-generator') {
      gtag('config', 'UA-11925218-1', { 'page_path': '/ai-rpg-location-generator' });
    }
    if (typeof gtag === 'function' && this.currentPage === 'town-kingdom-generator') {
      gtag('config', 'UA-11925218-1', { 'page_path': '/town-kingdom-generator' });
    }
    if (typeof gtag === 'function' && this.currentPage === 'legacy-dungeon-generator') {
      gtag('config', 'UA-11925218-1', { 'page_path': '/ai-powered-dungeon-generator' });
    }
    if (typeof gtag === 'function' && this.currentPage === 'legacy-dungeon-generator-premium') {
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
  beforeUnmount() {
    // Clean up keyboard listener
    if (import.meta.env.DEV) {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  },
};
</script>

<style>
/* Dev Mode Switcher */
.dev-switcher {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 12px 40px 12px 15px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 14px;
  transition: all 0.2s ease;
}

.dev-switcher.minimized {
  padding: 0;
  background: transparent;
  box-shadow: none;
}

.dev-toggle-btn {
  background: rgba(0, 0, 0, 0.9);
  border: none;
  color: white;
  font-size: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

.dev-toggle-btn:hover {
  background: rgba(0, 0, 0, 1);
  transform: scale(1.1);
}

.dev-close-btn {
  background: transparent;
  border: none;
  color: #666;
  font-size: 24px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.dev-close-btn:hover {
  color: #fff;
}

.dev-switcher label {
  margin-right: 8px;
  font-weight: 600;
  color: #4ade80;
}

.dev-switcher select {
  background: white;
  color: black;
  border: 1px solid #ccc;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 14px;
  min-width: 250px;
  cursor: pointer;
}

.dev-switcher select:focus {
  outline: 2px solid #4ade80;
  outline-offset: 2px;
}

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
