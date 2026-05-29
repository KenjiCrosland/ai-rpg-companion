import { defineStore } from 'pinia';
import {
  dungeons,
  currentDungeonId,
  selectedRoomId,
  lastClickedRoomX,
  isMapSidebarCollapsed,
  activeTabIndex,
  npcName,
  npcShortDescription,
  currentlyLoadingNPCs,
  overviewForm,
  monsterLoadingStates,
  currentDungeon,
} from './dungeon-state.mjs';

import { saveDungeons, loadDungeons } from './dungeon-utils.mjs';
import { removeReferencesForEntity } from '@/util/reference-storage.mjs';
import {
  generateDungeonOverview,
  currentDungeonOverviewString,
} from './overview-store.mjs';
import { generateMap, handleUpdateRoomDescription } from './map-store.mjs';
import {
  generateDungeonNPC,
  deleteNPC,
  addNPC,
  npcStatblockLoadingStates,
  generateNPCStatblock,
} from './npc-store.mjs';
import {
  createAndGenerateMonster,
  generateMonsterStatblock,
  generateAndSaveStatblock,
  updateStatblock,
  deleteMonster,
} from './monster-store.mjs';

export const useDungeonStore = defineStore('dungeon', () => {
  function selectDungeon(dungeonId) {
    currentDungeonId.value = dungeonId;
    // Reset Map-tab UI state when switching dungeons. Without these
    // two resets, the sidebar stays open showing the previously-
    // selected room from the OLD dungeon (or — if the new dungeon
    // has a room with the same numeric id — the new dungeon's room
    // at that index, which lands the user on a room they didn't pick).
    // Both are confusing; the right behavior is "no room selected,
    // sidebar collapsed, user clicks a room on the new map to dive in."
    selectedRoomId.value = null;
    isMapSidebarCollapsed.value = true;
  }

  function createNewDungeon() {
    overviewForm.value.adjective = '';
    overviewForm.value.setting_type = '';
    overviewForm.value.place_name = '';
    overviewForm.value.place_lore = '';
    overviewForm.value.difficulty = '';
    currentDungeonId.value = null;
  }

  function deleteDungeon(dungeonId) {
    activeTabIndex.value = 0;
    const index = dungeons.value.findIndex(
      (dungeon) => dungeon.id === dungeonId,
    );
    if (index !== -1) {
      dungeons.value.splice(index, 1);
      if (currentDungeonId.value === dungeonId) {
        currentDungeonId.value = dungeons.value.length
          ? dungeons.value[0].id
          : null;
      }
      removeReferencesForEntity('dungeon', dungeonId);
      saveDungeons();
    }
  }

  function deleteAllDungeons() {
    dungeons.value = [];
    currentDungeonId.value = null;
    saveDungeons();
  }

  return {
    // State
    dungeons,
    currentDungeonId,
    selectedRoomId,
    lastClickedRoomX,
    isMapSidebarCollapsed,
    activeTabIndex,
    npcName,
    npcShortDescription,
    currentlyLoadingNPCs,
    overviewForm,
    monsterLoadingStates,
    currentDungeon,
    currentDungeonOverviewString,

    // Actions
    saveDungeons,
    loadDungeons: () => loadDungeons(currentDungeonId),
    selectDungeon,
    createNewDungeon,
    deleteDungeon,
    deleteAllDungeons,
    generateDungeonOverview,
    generateDungeonNPC,
    deleteNPC,
    addNPC,
    generateNPCStatblock,
    npcStatblockLoadingStates,
    generateMap,
    handleUpdateRoomDescription,
    createAndGenerateMonster,
    generateAndSaveStatblock,
    generateMonsterStatblock,
    deleteMonster,
    updateStatblock,
  };
});

// Listen for localStorage changes from other tabs (e.g., statblock renames)
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'dungeons' && e.newValue) {
      // Dungeons were updated in another tab, reload them
      const store = useDungeonStore();
      store.loadDungeons();
    }
  });
}
