import { ref, computed } from 'vue';

export const dungeons = ref([]);
export const currentDungeonId = ref(null);
export const loadingOverview = ref(false);
export const selectedRoomId = ref(null);
export const lastClickedRoomX = ref(null);
export const isMapSidebarCollapsed = ref(true);
export const activeTabIndex = ref(0);

// NPC-related
export const npcName = ref('');
export const npcShortDescription = ref('');
export const currentlyLoadingNPCs = ref({});

// Statblocks loading states
export const monsterLoadingStates = ref({});

// Overview form
export const overviewForm = ref({
  adjective: '',
  setting_type: '',
  place_name: '',
  place_lore: '',
  difficulty: '',
});

export const currentDungeon = computed(() => {
  return dungeons.value.find(
    (dungeon) => dungeon.id === currentDungeonId.value,
  );
});

// Handle storage changes from other tabs to sync statblock generation limits
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    // When another tab changes the statblock counter, sync our state
    if (e.key === 'monsters') {
      try {
        const monsters = JSON.parse(e.newValue);
        const generationCount = parseInt(monsters?.generationCount) || 0;

        // If count was reset (less than 5), clear all limit flags
        if (generationCount < 5) {
          // Reset monster loading states
          Object.keys(monsterLoadingStates.value).forEach(key => {
            if (monsterLoadingStates.value[key]?.limitReached) {
              monsterLoadingStates.value[key].limitReached = false;
            }
          });
        }
      } catch (err) {
        // Ignore parse errors
      }
    }
  });
}
