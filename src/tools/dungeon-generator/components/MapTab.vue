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

@media (max-width: 768px) {
  .map-and-sidebar-container {
    flex-direction: column;
  }

  .dungeon-map-wrapper {
    margin-bottom: 500px;
  }
}
</style>