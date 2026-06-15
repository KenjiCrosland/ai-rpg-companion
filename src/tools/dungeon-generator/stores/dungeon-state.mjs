import { ref, computed } from 'vue';

export const dungeons = ref([]);
export const currentDungeonId = ref(null);
// Cross-tool seed: populated by the DungeonGenerator's mount handler
// when the user navigated here from another tool (currently the Item
// Generator). The generation flow inspects this to:
//   - run the item-dungeon mode inference + apply mode-derived presets
//     to inferDungeonDimensions (driveType, powerStructure, etc.)
//   - inherit the item's register directly
//   - write the inspired_by_item reference edge after generation
// Cleared by finalizePendingSeed when the post-generation hook runs.
export const pendingSeed = ref(null);
export const selectedRoomId = ref(null);
export const lastClickedRoomX = ref(null);
export const isMapSidebarCollapsed = ref(true);
export const activeTabIndex = ref(0);

// NPC-related
export const npcName = ref('');
export const npcShortDescription = ref('');
export const currentlyLoadingNPCs = ref({});

// Map-context assignment in flight. Set true at the start of
// `generateMap` and false in its finally; covers the four sequential
// assignment calls (lore-location → NPC → monster → item placements)
// that the map renderer doesn't visually depend on, but that the
// room-prompt pipeline downstream does. The MapTab uses this to
// overlay a blocking skeleton so the user can't click into rooms
// before the cross-reference layer is ready (rooms generated mid-
// assignment would miss placements and the GM would have to retrofit
// at the table).
export const isAssigningMapContext = ref(false);

// Statblocks loading states
export const monsterLoadingStates = ref({});

// Overview form. Two free-text fields + difficulty — mirrors the
// setting generator's form. The user-supplied dungeon name (if any)
// is extracted from the description prose by inferDungeonDimensions's
// userName step, so there's no separate "place_name" field.
export const overviewForm = ref({
  description: '',
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
