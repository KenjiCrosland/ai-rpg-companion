<template>
  <div class="map-and-sidebar-container" ref="mapContainer">
    <div class="dungeon-map-wrapper" ref="mapWrapper">
      <div class="dungeon-map-heading parchment">
        <h3 class="dungeon-map-heading__title">Map</h3>
        <p class="dungeon-map-heading__tagline">Click a room to view and generate its description.</p>
      </div>
      <div v-if="dungeonStore.currentDungeon" class="dungeon-map-container" ref="mapInnerContainer">
        <div v-if="dungeonStore.currentDungeon.rooms" class="dungeon-map-positioner">
          <DungeonMap :rooms="dungeonStore.currentDungeon.rooms" @roomClicked="handleRoomClick" ref="dungeonMap"
            :dungeonName="dungeonStore.currentDungeon.dungeonOverview.name" @mapClicked="handleMapClick"
            :focusedRoomId="dungeonStore.isMapSidebarCollapsed ? null : dungeonStore.selectedRoomId" />
          <!--
            Assignment-phase overlay. The map renders immediately when
            generateMap() lands, but the cross-reference layer (lore /
            NPC / monster / item placements) fires after — and room
            generation downstream relies on those placements being
            present. Block interaction while they're in flight so the
            user can't open a room mid-assignment and end up with an
            unattributed room.
          -->
          <div v-if="dungeonStore.isAssigningMapContext" class="map-assignment-overlay" aria-live="polite">
            <div class="map-assignment-overlay__inner">
              <div class="map-assignment-overlay__spinner" role="status" aria-label="Loading"></div>
              <p class="map-assignment-overlay__status">Placing inhabitants…</p>
              <p class="map-assignment-overlay__hint">
                Cross-referencing the overview against the map so rooms can name their occupants. This takes a moment.
              </p>
            </div>
          </div>
        </div>
        <!-- Map legend -->
        <div v-if="mapExists" class="map-legend">
          <span class="legend-item">
            <svg width="12" height="10" viewBox="0 0 12 10">
              <polygon points="6,0 0,10 12,10" fill="#4a4a4a" />
            </svg>
            Entrance
          </span>
          <span class="legend-item">
            <svg width="12" height="12" viewBox="0 0 12 12">
              <circle cx="6" cy="6" r="5" fill="none" stroke="#4a4a4a" stroke-width="0.8" />
              <path d="M6,2 L7.2,4.5 L9.8,4.8 L7.8,6.6 L8.4,9.2 L6,7.8 L3.6,9.2 L4.2,6.6 L2.2,4.8 L4.8,4.5 Z"
                fill="#4a4a4a" />
            </svg>
            Boss
          </span>
          <span class="legend-item">
            <svg width="12" height="8" viewBox="0 0 12 8">
              <rect x="1" y="1" width="10" height="6" fill="#fff" stroke="#555" stroke-width="1" />
            </svg>
            Door
          </span>
          <span class="legend-item">
            <svg width="12" height="8" viewBox="0 0 12 8">
              <rect x="1" y="1" width="10" height="6" fill="#fff" stroke="#555" stroke-width="1" />
              <line x1="2" y1="2" x2="10" y2="6" stroke="#555" stroke-width="0.8" />
              <line x1="2" y1="6" x2="10" y2="2" stroke="#555" stroke-width="0.8" />
            </svg>
            Locked
          </span>
          <span class="legend-item">
            <svg width="12" height="10" viewBox="0 0 12 10">
              <line x1="2" y1="2" x2="10" y2="2" stroke="#666" stroke-width="1.5" />
              <line x1="3" y1="4.5" x2="9" y2="4.5" stroke="#666" stroke-width="1.5" />
              <line x1="4" y1="7" x2="8" y2="7" stroke="#666" stroke-width="1.5" />
            </svg>
            Stairs
          </span>
        </div>
        <!-- First-time hint -->
        <p v-if="mapExists && !hasClickedRoom" class="map-hint">
          Click a room number to add details
        </p>
        <div class="generate-button-container">
          <ParButton @click="handleGenerateMapClick" size="small"
            :disabled="dungeonStore.isAssigningMapContext">
            {{ dungeonStore.currentDungeon && dungeonStore.currentDungeon.rooms ? 'Re-generate Map' : 'Generate Map' }}
          </ParButton>
          <ParButton v-if="mapExists" @click="handleDownloadMapClick" size="small"
            :disabled="dungeonStore.isAssigningMapContext">
            Download Map
          </ParButton>
        </div>
      </div>
    </div>
    <MapSidebar v-model:isCollapsed="dungeonStore.isMapSidebarCollapsed" :style="mapContainerInlineStyles">
      <RoomDescription v-if="!dungeonStore.isMapSidebarCollapsed" />
    </MapSidebar>
  </div>
</template>

<script setup>
import { ParButton } from "@/parchment";
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { useDungeonStore } from '../stores/dungeon-store.mjs';
import DungeonMap from './DungeonMap.vue';
import MapSidebar from './MapSidebar.vue';
import RoomDescription from './RoomDescription.vue';

const dungeonStore = useDungeonStore();

const mapContainer = ref(null);
const mapWrapper = ref(null);
const dungeonMap = ref(null);
const mapInnerContainer = ref(null);

const windowWidth = ref(window.innerWidth);
const isMobileWidth = computed(() => windowWidth.value <= 768);

const mapExists = computed(() => {
  return dungeonStore.currentDungeon && dungeonStore.currentDungeon.rooms;
});

const hasClickedRoom = ref(false);

function handleDownloadMapClick() {
  if (dungeonMap.value && dungeonMap.value.downloadCanvasAsImage) {
    dungeonMap.value.downloadCanvasAsImage();
  } else {
    console.error('DungeonMap component or downloadCanvasAsImage method not found');
  }
}

function handleMapClick() {
  if (!dungeonStore.isMapSidebarCollapsed) {
    dungeonStore.isMapSidebarCollapsed = true;
  }
}

function handleRoomClick({ roomId }) {
  dungeonStore.selectedRoomId = roomId;
  dungeonStore.isMapSidebarCollapsed = false;
  hasClickedRoom.value = true;
}

function handleGenerateMapClick() {
  if (dungeonStore.currentDungeon && dungeonStore.currentDungeon.rooms) {
    const confirmed = window.confirm(
      'Re-generate the map? This overwrites the existing map and room descriptions.'
    );
    if (confirmed) {
      dungeonStore.generateMap();
    }
  } else {
    dungeonStore.generateMap();
  }
}

const mapContainerHeight = ref('auto');
const mapContainerInlineStyles = computed(() => (isMobileWidth.value ? {} : { height: mapContainerHeight.value }));

function updateMapContainerHeight() {
  if (mapContainer.value) {
    mapContainerHeight.value = `${mapContainer.value.clientHeight}px`;
  }
}

onMounted(() => {
  window.addEventListener('resize', () => (windowWidth.value = window.innerWidth));
  watch(
    () => dungeonStore.activeTabIndex,
    (newIndex) => {
      if (newIndex === 1) {
        nextTick(() => {
          updateMapContainerHeight();
        });
      }
    }
  );
});
</script>

<style scoped>
/* Tab header — shared 2.8rem standard (matches the other dungeon/setting tabs). */
.dungeon-map-heading {
  margin-bottom: 1.5rem;
}

.dungeon-map-heading__title {
  margin: 0 0 0.3rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 2.8rem;
  font-weight: 600;
  color: var(--par-color-action-primary, #2A4D70);
  line-height: 1.2;
}

.dungeon-map-heading__tagline {
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.55;
}

.map-and-sidebar-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: hidden;
  min-height: 75vh;
}

.dungeon-map-wrapper {
  overflow: auto;
  flex: 1 1 auto;
}

.dungeon-map-container {
  width: max-content;
  margin: 0 auto;
}

/* Positioner: the overlay needs an absolute-positioned parent so it
   can stack on top of the map without leaking out of the container. */
.dungeon-map-positioner {
  position: relative;
}

/* Assignment overlay: parchment-tinted scrim over the map. Blocks
   pointer events on the rooms below (so clicks don't fire room
   selection mid-assignment) and provides a clear "background work
   in flight" signal — see dungeon-state.mjs `isAssigningMapContext`
   for the underlying flag. */
.map-assignment-overlay {
  position: absolute;
  inset: 0;
  background: rgba(253, 251, 246, 0.78);
  backdrop-filter: blur(1.5px);
  -webkit-backdrop-filter: blur(1.5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  cursor: progress;
}

.map-assignment-overlay__inner {
  text-align: center;
  max-width: 340px;
  padding: 1.75rem 2rem;
  background: var(--par-color-surface, #FBF7F0);
  border: 1.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-sm, 3px);
  box-shadow: var(--par-color-card-shadow, 0 1px 3px rgba(122, 50, 30, 0.04));
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

/* Lapis-ring spinner. Faint full ring + solid arc on top; spinning the
   whole thing reads as a chrome-action loading indicator (lapis is
   reserved for that register — see parchment/CLAUDE.md). Sits above
   the burgundy "Placing inhabitants…" title so the two color cues
   read as "chrome work" + "editorial label." */
.map-assignment-overlay__spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 1.1rem;
  border-radius: 50%;
  border: 3px solid rgba(42, 77, 112, 0.15);
  border-top-color: var(--par-color-action-primary, #2A4D70);
  animation: map-assignment-spin 0.9s linear infinite;
}

/* Reduced-motion users still need a "loading" signal, but not a
   spinning one. Pause the animation; the partial ring still reads as
   placeholder content next to the live-region status text below. */
@media (prefers-reduced-motion: reduce) {
  .map-assignment-overlay__spinner {
    animation: none;
  }
}

@keyframes map-assignment-spin {
  to { transform: rotate(360deg); }
}

.map-assignment-overlay__status {
  margin: 0 0 0.75rem;
  font-size: 1.75rem;
  font-weight: 500;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.02em;
}

.map-assignment-overlay__hint {
  margin: 0;
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.5;
}

.generate-button-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.map-legend {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 1.125rem;
  color: #777;
}

.legend-item svg {
  flex-shrink: 0;
  width: 18px;
  height: 16px;
}

.map-hint {
  text-align: center;
  color: #999;
  font-size: 1.275rem;
  margin-top: 0.5rem;
  font-style: italic;
}

@media (max-width: 768px) {
  .map-and-sidebar-container {
    flex-direction: column;
  }

  .dungeon-map-wrapper {
    margin-bottom: 500px;
  }
}
</style>