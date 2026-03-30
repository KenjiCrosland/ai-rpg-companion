<template>
  <div class="map-and-sidebar-container" ref="mapContainer">
    <div class="dungeon-map-wrapper" ref="mapWrapper">
      <div v-if="dungeonStore.currentDungeon" class="dungeon-map-container" ref="mapInnerContainer">
        <h4 style="text-align: center">
          Map of {{ dungeonStore.currentDungeon.dungeonOverview.name }}
        </h4>
        <div v-if="dungeonStore.currentDungeon.rooms">
          <DungeonMap :rooms="dungeonStore.currentDungeon.rooms" @roomClicked="handleRoomClick" ref="dungeonMap"
            :dungeonName="dungeonStore.currentDungeon.dungeonOverview.name" @mapClicked="handleMapClick"
            :focusedRoomId="dungeonStore.isMapSidebarCollapsed ? null : dungeonStore.selectedRoomId" />
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
          <cdr-button @click="handleGenerateMapClick" modifier="dark" size="small">
            {{ dungeonStore.currentDungeon && dungeonStore.currentDungeon.rooms ? 'Re-generate Map' : 'Generate Map' }}
          </cdr-button>
          <cdr-button v-if="mapExists" @click="handleDownloadMapClick" modifier="dark" size="small">
            Download Map
          </cdr-button>
        </div>
      </div>
    </div>
    <MapSidebar v-model:isCollapsed="dungeonStore.isMapSidebarCollapsed" :style="mapContainerInlineStyles">
      <RoomDescription v-if="!dungeonStore.isMapSidebarCollapsed" />
    </MapSidebar>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { useDungeonStore } from '../stores/dungeon-store.mjs';
import DungeonMap from './DungeonMap.vue';
import MapSidebar from './MapSidebar.vue';
import RoomDescription from './RoomDescription.vue';
import { CdrButton } from '@rei/cedar';

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
.map-and-sidebar-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: hidden;
  min-height: 75vh;
}

.dungeon-map-wrapper {
  background-color: #fafaf6;
  overflow: auto;
  flex: 1 1 auto;
}

.dungeon-map-container {
  width: max-content;
  margin: 0 auto;
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