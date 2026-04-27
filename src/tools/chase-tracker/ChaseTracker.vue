<template>
  <div class="chase-tracker-root">
    <div class="chase-tracker-shell">
      <TemplatePicker
        v-if="!map.state.hasActiveChase"
        :templates="availableTemplates"
        @pick="onPickTemplate"
      />
      <template v-else>
        <ZoneTapHint
          :visible="zoneTapHintVisible"
          @dismiss="dismissZoneTapHint"
        />

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
          <template v-if="editingScenario">
            <span class="scenario-label">Scene Description:</span>
            <textarea
              ref="scenarioInput"
              v-model="scenarioDraft"
              class="scenario-input"
              :class="{ 'scenario-input--example': scenarioDraftIsExample }"
              rows="1"
              aria-label="Scene description"
              @blur="commitScenario"
              @input="autoResizeScenario"
              @keydown.esc.prevent="cancelScenario"
            />
          </template>
          <p
            v-else
            :class="['scenario-text', { 'scenario-text--example': scenarioIsExample }]"
            :aria-label="scenarioIsExample ? 'Edit scene description (placeholder)' : 'Edit scene description'"
            tabindex="0"
            role="button"
            @click="beginEditScenario"
            @keydown.enter.prevent="beginEditScenario"
            @keydown.space.prevent="beginEditScenario"
          ><span class="scenario-label">Scene Description:</span>{{ map.state.scenario || '[Example] Set the scene in a sentence.' }}</p>
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
          @add-token="onZoneAddToken"
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
        @cancel="onCancelCreator"
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
        :auto-connect="map.state.autoConnectEnabled"
        @close="onLibraryClose"
        @add-from-library="onAddFromLibrary"
        @add-custom="onAddCustomZone"
        @update:auto-connect="map.setAutoConnectEnabled"
      />

      <RulesDrawer :open="rulesOpen" @close="rulesOpen = false" />

      <ZoneDetailSheet
        :zone="detailSheetZone"
        :tokens="map.state.tokens"
        :connections="map.state.connections"
        :all-zones="map.state.zones"
        @close="detailSheetZoneId = null"
        @update-zone="map.updateZone"
        @add-pill="map.addPillToZone"
        @remove-pill="map.removePillFromZone"
        @add-token="onSheetAddTokenInline"
        @move-token="onSheetMoveToken"
        @dash="map.incrementDash"
        @undo-dash="map.decrementDash"
        @delete="onSheetDelete"
      />

      <OnboardingHint :visible="hintVisible" @dismiss="dismissHint" />

      <DashHint
        :visible="map.dashHintVisible.value"
        @dismiss="map.dismissDashHint"
      />

      <!-- Footer lives outside the Vue app on the WordPress page (see
           rpg-companion-chase-tracker.php's `rpg_chase_tracker_footer`).
           Avoid double-footers by skipping ToolFooter here. -->
      <!-- <ToolFooter /> -->
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
import DashHint from './components/DashHint.vue';
import ZoneTapHint from './components/ZoneTapHint.vue';
// ToolFooter intentionally not imported — the WordPress template
// renders its own attribution footer below the Vue app (see
// rpg-companion-chase-tracker.php).
import ZoneDetailSheet from './components/ZoneDetailSheet.vue';
import ChaseParticipantsPanel from './components/ChaseParticipantsPanel.vue';
import { useIsMobile } from './composables/useBreakpoint.js';

const HINT_SEEN_KEY = 'cros-chase-tracker-has-seen-hint';
const ZONE_TAP_HINT_KEY = 'cros-chase-tracker-zone-tap-hint-seen';

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
    DashHint,
    ZoneTapHint,
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
    // When the desktop affordance row opens the creator from a zone,
    // the newly-created token should land in that zone rather than
    // the tray. Null means "drop in tray" (the MapControls + Token
    // flow and the TokenTray's + Add button).
    const creatorTargetZoneId = ref(null);
    const rulesOpen = ref(false);
    const libraryOpen = ref(false);
    const hintVisible = ref(false);
    const zoneTapHintVisible = ref(false);
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
      creatorTargetZoneId,
      rulesOpen,
      libraryOpen,
      hintVisible,
      zoneTapHintVisible,
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
    // Rehydrated mobile chase: show the zone-tap onboarding if the
    // user hasn't seen it yet. Handled here (rather than in
    // onPickTemplate) so users who come back to a saved chase still
    // see the hint on first mobile load.
    this.maybeShowZoneTapHint();
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
      // Picking a template mid-session also counts as "loading a
      // mobile chase," so surface the zone-tap hint here too.
      this.$nextTick(() => this.maybeShowZoneTapHint());
    },
    dismissHint() {
      this.hintVisible = false;
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(HINT_SEEN_KEY, 'true');
      }
    },
    maybeShowZoneTapHint() {
      if (!this.isMobile) return;
      if (!this.map.state.hasActiveChase) return;
      if (typeof window === 'undefined' || !window.localStorage) return;
      try {
        if (window.localStorage.getItem(ZONE_TAP_HINT_KEY) === 'true') return;
      } catch {
        return;
      }
      this.zoneTapHintVisible = true;
    },
    dismissZoneTapHint() {
      this.zoneTapHintVisible = false;
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          window.localStorage.setItem(ZONE_TAP_HINT_KEY, 'true');
        } catch {
          // silent
        }
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
    onSheetDelete(zoneId) {
      // The sheet already ran its own confirm() before emitting, so
      // we just remove and dismiss.
      this.map.removeZone(zoneId);
      this.detailSheetZoneId = null;
    },
    onSheetAddTokenInline(zoneId, fields) {
      // Inline add-token form passes role + label; the composable
      // applies role defaults for icon + color.
      this.map.addToken({ ...fields, zoneId });
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
      // Called from MapControls + Token and TokenTray + Add — those
      // entry points always place the new token in the tray.
      this.creatorTargetZoneId = null;
      this.creatorOpen = true;
    },
    onZoneAddToken(zoneId) {
      // Called from a zone's affordance row on desktop. Target the
      // zone so the new token drops straight in.
      this.creatorTargetZoneId = zoneId;
      this.creatorOpen = true;
    },
    onCreateToken(fields) {
      this.map.addToken({ ...fields, zoneId: this.creatorTargetZoneId ?? null });
      this.creatorOpen = false;
      this.creatorTargetZoneId = null;
    },
    onCancelCreator() {
      this.creatorOpen = false;
      this.creatorTargetZoneId = null;
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
  margin-top: -0.25rem;
  margin-bottom: 0.85rem;
}

.scenario-label {
  font-family: var(--font-body);
  font-weight: 600;
  color: var(--ink-primary);
  margin-right: 0.5rem;
}

.scenario-text,
.scenario-input {
  font-family: var(--font-body);
  font-size: 1.35rem;
  line-height: 1.5;
  color: var(--ink-primary);
  margin: 0;
  width: 100%;
}

.scenario-text {
  display: block;
  cursor: text;
  padding: 0.35rem 0;
  border-bottom: 1px dashed transparent;
  transition: border-color 120ms ease;
  outline: none;
}

.scenario-text:hover,
.scenario-text:focus-visible {
  border-bottom-color: var(--parchment-edge);
}

.scenario-text--example {
  color: var(--ink-secondary);
  font-style: italic;
}

/* Keep the "Scene Description:" label anchored — dark and upright —
   even while the scenario content is rendered as a muted italic
   placeholder. */
.scenario-text--example .scenario-label {
  color: var(--ink-primary);
  font-style: normal;
}

.scenario-input {
  display: block;
  background: var(--parchment-warm);
  border: 1px solid var(--button-border);
  border-radius: 2px;
  padding: 0.45rem 0.65rem;
  resize: none;
  overflow: hidden;
  min-height: 2.2rem;
  margin-top: 0.15rem;
}

.scenario-input--example {
  font-style: italic;
  color: var(--ink-secondary);
}

@media (max-width: 640px) {
  .scenario-row {
    margin-top: -0.25rem;
    margin-bottom: 0.5rem;
  }
  .scenario-text,
  .scenario-input {
    font-size: 1.2rem;
  }
}
</style>
