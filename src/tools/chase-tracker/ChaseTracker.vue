<template>
  <div class="chase-tracker-root">
    <div class="chase-tracker-shell">
      <TemplatePicker
        v-if="!map.state.hasActiveChase"
        :templates="availableTemplates"
        @pick="onPickTemplate"
      />
      <template v-else>
        <MapControls
          :map-name="map.state.mapName"
          @add-token="openCreator"
          @open-library="libraryOpen = true"
          @toggle-rules="rulesOpen = !rulesOpen"
          @toggle-participants="map.toggleParticipantsPanel"
          @reset="onReset"
          @rename-map="renameMap"
        />

        <div class="scenario-row">
          <textarea
            v-if="editingScenario"
            ref="scenarioInput"
            v-model="scenarioDraft"
            class="scenario-input"
            :class="{ 'scenario-input--example': scenarioDraftIsExample }"
            rows="1"
            @blur="commitScenario"
            @input="autoResizeScenario"
            @keydown.esc.prevent="cancelScenario"
          />
          <p
            v-else
            :class="['scenario-text', { 'scenario-text--example': scenarioIsExample }]"
            :aria-label="scenarioIsExample ? 'Edit scenario (placeholder)' : 'Edit scenario'"
            tabindex="0"
            role="button"
            @click="beginEditScenario"
            @keydown.enter.prevent="beginEditScenario"
            @keydown.space.prevent="beginEditScenario"
          >{{ map.state.scenario || '[Example] Set the scene in a sentence.' }}</p>
        </div>

        <ChaseParticipantsPanel
          :collapsed="map.state.participantsPanelCollapsed"
          :participants-by-role="map.participantsByRole.value"
          :zones="map.state.zones"
          @toggle="map.toggleParticipantsPanel"
          @close="map.setParticipantsPanelCollapsed(true)"
          @rename="map.renameToken"
          @remove="map.removeToken"
          @dash="map.incrementDash"
          @undo-dash="map.decrementDash"
          @add="map.addParticipant"
          @move="map.setTokenZone"
        />
        <ChaseMap
          :zones="map.state.zones"
          :connections="map.state.connections"
          :tokens-by-zone="map.tokensByZone.value"
          :selected-token-id="map.state.selectedTokenId"
          :adjacent-zone-ids="map.adjacentZoneIds.value"
          :dragged-token-id="draggedTokenId"
          :valid-drop-zone-ids="dragValidZones"
          :connecting-from-zone-id="map.state.connectingFromZoneId"
          :grid-cols="map.state.gridCols"
          :grid-rows="map.state.gridRows"
          @zone-clicked="onZoneClicked"
          @select-token="map.selectToken"
          @rename-token="map.renameToken"
          @remove-token="map.removeToken"
          @update-zone="map.updateZone"
          @delete-zone="map.removeZone"
          @start-connect="onStartConnect"
          @open-conditions="openPillManager"
          @cancel-connect="map.cancelConnectMode"
          @drag-start="onDragStart"
          @drag-end="onDragEnd"
          @drop-token="onDropToken"
          @expand-grid="onExpandGrid"
        />
        <TokenTray
          :tokens="map.trayTokens.value"
          :selected-token-id="map.state.selectedTokenId"
          :dragged-token-id="draggedTokenId"
          :dragged-token-from-zone-id="draggedTokenFromZoneId"
          @select-token="map.selectToken"
          @rename-token="map.renameToken"
          @remove-token="map.removeToken"
          @add-token="openCreator"
          @drag-start="onDragStart"
          @drag-end="onDragEnd"
          @drop-token="onDropToken"
        />
      </template>

      <TokenCreator
        v-if="creatorOpen"
        @create="onCreateToken"
        @cancel="creatorOpen = false"
      />

      <PillManager
        v-if="pillManagerZone"
        :zone-name="pillManagerZone.name"
        :pills="pillManagerZone.pills"
        @add="onAddPill"
        @remove="onRemovePill"
        @close="pillManagerZoneId = null"
      />

      <ZoneLibrary
        :open="libraryOpen"
        :default-environments="map.state.environments"
        @close="onLibraryClose"
        @add-from-library="onAddFromLibrary"
        @add-custom="onAddCustomZone"
      />

      <RulesDrawer :open="rulesOpen" @close="rulesOpen = false" />

      <ZoneDetailSheet
        :zone="detailSheetZone"
        :tokens="map.state.tokens"
        :connections="map.state.connections"
        :all-zones="map.state.zones"
        @close="detailSheetZoneId = null"
        @open-conditions="openPillManager"
        @edit="onSheetEdit"
        @connect="onSheetConnect"
        @delete="onSheetDelete"
        @move-token="onSheetMoveToken"
      />

      <OnboardingHint :visible="hintVisible" @dismiss="dismissHint" />

      <ToolFooter />
    </div>
  </div>
</template>

<script>
import './styles/index.css';
import { computed, nextTick, ref } from 'vue';
import templatesData from './data/templates.json';
import { useChaseMap } from './composables/useChaseMap.js';
import TemplatePicker from './components/TemplatePicker.vue';
import MapControls from './components/MapControls.vue';
import ChaseMap from './components/ChaseMap.vue';
import TokenTray from './components/TokenTray.vue';
import TokenCreator from './components/TokenCreator.vue';
import PillManager from './components/PillManager.vue';
import ZoneLibrary from './components/ZoneLibrary.vue';
import RulesDrawer from './components/RulesDrawer.vue';
import OnboardingHint from './components/OnboardingHint.vue';
import ToolFooter from './components/ToolFooter.vue';
import ZoneDetailSheet from './components/ZoneDetailSheet.vue';
import ChaseParticipantsPanel from './components/ChaseParticipantsPanel.vue';
import { useIsMobile } from './composables/useBreakpoint.js';

const HINT_SEEN_KEY = 'cros-chase-tracker-has-seen-hint';

export default {
  name: 'ChaseTracker',
  components: {
    TemplatePicker,
    MapControls,
    ChaseMap,
    TokenTray,
    TokenCreator,
    PillManager,
    ZoneLibrary,
    RulesDrawer,
    OnboardingHint,
    ToolFooter,
    ZoneDetailSheet,
    ChaseParticipantsPanel,
  },
  props: {
    premium: { type: Boolean, default: false },
  },
  setup(props) {
    const map = useChaseMap();

    const availableTemplates = computed(() =>
      templatesData.templates.filter((t) => props.premium || !t.premium)
    );

    const draggedTokenId = ref(null);
    const draggedTokenFromZoneId = ref(null);
    const dragValidZones = ref(new Set());

    const creatorOpen = ref(false);
    const rulesOpen = ref(false);
    const libraryOpen = ref(false);
    const hintVisible = ref(false);
    const pillManagerZoneId = ref(null);
    const detailSheetZoneId = ref(null);
    const isMobile = useIsMobile();
    const editingScenario = ref(false);
    const scenarioDraft = ref('');

    const scenarioIsExample = computed(() => {
      const text = (map.state.scenario || '').trim();
      return !text || text.startsWith('[Example]');
    });

    const scenarioDraftIsExample = computed(() =>
      (scenarioDraft.value || '').trim().startsWith('[Example]')
    );

    const pillManagerZone = computed(() =>
      pillManagerZoneId.value
        ? map.state.zones.find((z) => z.id === pillManagerZoneId.value) || null
        : null
    );

    const detailSheetZone = computed(() =>
      detailSheetZoneId.value
        ? map.state.zones.find((z) => z.id === detailSheetZoneId.value) || null
        : null
    );

    return {
      map,
      availableTemplates,
      draggedTokenId,
      draggedTokenFromZoneId,
      dragValidZones,
      creatorOpen,
      rulesOpen,
      libraryOpen,
      hintVisible,
      pillManagerZoneId,
      pillManagerZone,
      detailSheetZoneId,
      detailSheetZone,
      isMobile,
      editingScenario,
      scenarioDraft,
      scenarioIsExample,
      scenarioDraftIsExample,
    };
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
  methods: {
    handleKeydown(event) {
      if (event.key === 'Escape' && this.map.state.connectingFromZoneId) {
        this.map.cancelConnectMode();
      }
    },
    onPickTemplate(templateId) {
      this.map.startFromTemplate(templateId);
      if (typeof window !== 'undefined' && window.localStorage) {
        const seen = window.localStorage.getItem(HINT_SEEN_KEY) === 'true';
        if (!seen) this.hintVisible = true;
      }
    },
    dismissHint() {
      this.hintVisible = false;
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(HINT_SEEN_KEY, 'true');
      }
    },
    onZoneClicked(zoneId) {
      // Connect-mode takes priority over everything else.
      if (this.map.state.connectingFromZoneId) {
        this.map.completeConnection(zoneId);
        return;
      }
      // A selected token means the user is mid-move — try that first on
      // both platforms. On mobile, the tap-to-select/tap-to-move flow is
      // the primary way to move tokens in the main view since HTML5 drag
      // doesn't fire on touch.
      if (this.map.state.selectedTokenId) {
        this.map.moveSelectedTokenTo(zoneId);
        return;
      }
      // Mobile with no pending move → open the zone detail sheet.
      if (this.isMobile) {
        this.detailSheetZoneId = zoneId;
      }
    },
    onSheetEdit(zoneId) {
      this.detailSheetZoneId = null;
      const name = window.prompt('Zone name', this.map.state.zones.find((z) => z.id === zoneId)?.name || '');
      if (!name) return;
      const zone = this.map.state.zones.find((z) => z.id === zoneId);
      const description = window.prompt('Description', zone?.description || '');
      this.map.updateZone(zoneId, { name, description: description ?? zone?.description ?? '' });
    },
    onSheetConnect(zoneId) {
      this.detailSheetZoneId = null;
      this.onStartConnect(zoneId);
    },
    onSheetDelete(zoneId) {
      const zone = this.map.state.zones.find((z) => z.id === zoneId);
      if (!zone) return;
      if (window.confirm(`Delete zone "${zone.name}"?`)) {
        this.map.removeZone(zoneId);
        this.detailSheetZoneId = null;
      }
    },
    onSheetMoveToken(tokenId, targetZoneId) {
      this.map.moveTokenTo(tokenId, targetZoneId);
    },
    onStartConnect(zoneId) {
      // Clicking the Connect button on the source zone while already in
      // connect-mode cancels it, matching the in-banner affordance.
      if (this.map.state.connectingFromZoneId === zoneId) {
        this.map.cancelConnectMode();
      } else {
        this.map.startConnectMode(zoneId);
      }
    },
    onDragStart(tokenId) {
      const token = this.map.state.tokens.find((t) => t.id === tokenId);
      this.draggedTokenId = tokenId;
      this.draggedTokenFromZoneId = token ? token.zoneId : null;
      this.dragValidZones = this.map.validDropZoneIdsFor(tokenId);
    },
    onDragEnd() {
      this.draggedTokenId = null;
      this.draggedTokenFromZoneId = null;
      this.dragValidZones = new Set();
    },
    onDropToken(tokenId, zoneId) {
      this.map.moveTokenTo(tokenId, zoneId);
      this.onDragEnd();
    },
    openCreator() {
      this.creatorOpen = true;
    },
    onCreateToken(fields) {
      this.map.addToken({ ...fields, zoneId: null });
      this.creatorOpen = false;
    },
    openPillManager(zoneId) {
      this.pillManagerZoneId = zoneId;
    },
    onAddPill(pill) {
      if (!this.pillManagerZoneId) return;
      this.map.addPillToZone(this.pillManagerZoneId, pill);
    },
    onRemovePill(pillId) {
      if (!this.pillManagerZoneId) return;
      this.map.removePillFromZone(this.pillManagerZoneId, pillId);
    },
    onAddFromLibrary(libraryZone) {
      // Keep the drawer open so GMs can stack multiple adds.
      this.map.addZoneFromLibrary(libraryZone);
    },
    onAddCustomZone({ name, description, shape }) {
      this.map.addZoneFromLibrary({
        name,
        description,
        shape,
        defaultPills: [],
      });
      // Keep drawer open; the form resets itself after submit.
    },
    onExpandGrid(direction) {
      this.map.expandGrid(direction);
      this.libraryOpen = true;
    },
    onLibraryClose() {
      this.libraryOpen = false;
      // If the GM dismissed without picking, drop the pending edge-cell
      // placement so a future MapControls "+ Zone" uses the default
      // first-empty-cell flow instead.
      this.map.clearPendingPlacement();
    },
    renameMap(name) {
      this.map.state.mapName = name;
    },
    async beginEditScenario() {
      this.scenarioDraft = this.map.state.scenario || '';
      this.editingScenario = true;
      await nextTick();
      const input = this.$refs.scenarioInput;
      if (!input) return;
      input.focus();
      this.autoResizeScenario();
      // On first edit, pre-select the entire [Example] text so a
      // single keystroke replaces it.
      if ((this.scenarioDraft || '').startsWith('[Example]')) {
        input.select();
      }
    },
    commitScenario() {
      if (!this.editingScenario) return;
      this.map.setScenario(this.scenarioDraft);
      this.editingScenario = false;
    },
    cancelScenario() {
      this.editingScenario = false;
    },
    autoResizeScenario() {
      const el = this.$refs.scenarioInput;
      if (!el) return;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    },
    onReset() {
      this.map.reset();
      this.onDragEnd();
      this.pillManagerZoneId = null;
      this.libraryOpen = false;
      this.rulesOpen = false;
      this.detailSheetZoneId = null;
    },
  },
};
</script>

<style scoped>
.chase-tracker-shell {
  max-width: 72rem;
  margin: 0 auto;
}

.scenario-row {
  padding: 0 0.25rem 0.5rem;
  margin-top: -0.5rem;
  margin-bottom: 0.75rem;
}

.scenario-text,
.scenario-input {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.5;
  color: var(--ink-primary);
  margin: 0;
  width: 100%;
  display: block;
}

.scenario-text {
  cursor: text;
  padding: 0.3rem 0;
  border-bottom: 1px dashed transparent;
  transition: border-color 120ms ease;
  outline: none;
}

.scenario-text:hover,
.scenario-text:focus-visible {
  border-bottom-color: var(--parchment-edge);
}

.scenario-text--example {
  font-style: italic;
  color: var(--ink-muted);
}

.scenario-input {
  font-family: var(--font-body);
  background: var(--parchment-warm);
  border: 1px solid var(--button-border);
  border-radius: 2px;
  padding: 0.35rem 0.55rem;
  resize: none;
  overflow: hidden;
  min-height: 2rem;
}

.scenario-input--example {
  font-style: italic;
  color: var(--ink-muted);
}

@media (max-width: 640px) {
  .scenario-row {
    margin-top: -0.25rem;
    margin-bottom: 0.5rem;
  }
  .scenario-text,
  .scenario-input {
    font-size: 0.95rem;
  }
}
</style>
