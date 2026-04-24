<template>
  <div
    ref="root"
    :class="[
      'zone',
      {
        'zone--valid-drop': validDrop,
        'zone--invalid-drop': draggedTokenId && !validDrop,
        'zone--selected-adjacent': validDestination,
        'zone--dimmed': dimmed,
        'zone--connect-source': connectSource,
        'zone--connect-target': connectTarget,
      },
    ]"
    :style="gridStyle"
    :data-zone-id="zone.id"
    @click="onZoneClick"
    @dragover="onDragOver"
    @drop="onDrop"
  >
    <h3 class="zone-name">{{ zone.name }}</h3>

    <p class="zone-description ink-italic">{{ zone.description }}</p>

    <div v-if="zone.pills.length" class="zone-pills">
      <ZonePill v-for="pill in zone.pills" :key="pill.id" :pill="pill" />
    </div>

    <p class="zone-tap-hint ink-italic" aria-hidden="true">Tap card to edit</p>

    <div class="zone-tokens">
      <Token
        v-for="token in tokens"
        :key="token.id"
        :token="token"
        :selected="token.id === selectedTokenId"
        @select="(id) => $emit('select-token', id)"
        @rename="(id, label) => $emit('rename-token', id, label)"
        @remove="(id) => $emit('remove-token', id)"
        @drag-start="(id) => $emit('drag-start', id)"
        @drag-end="(id) => $emit('drag-end', id)"
      />
    </div>

    <div class="zone-affordance-anchor">
      <ZoneAffordanceRow
        :connect-active="connectSource"
        @action="onAffordance"
      />
    </div>

    <ZoneEditor
      v-if="editorOpen"
      :zone="zone"
      @save="saveEdit"
      @cancel="editorOpen = false"
    />
  </div>
</template>

<script>
import Token from './Token.vue';
import ZoneEditor from './ZoneEditor.vue';
import ZoneAffordanceRow from './ZoneAffordanceRow.vue';
import ZonePill from './ZonePill.vue';

export default {
  name: 'Zone',
  components: { Token, ZoneEditor, ZoneAffordanceRow, ZonePill },
  props: {
    zone: { type: Object, required: true },
    tokens: { type: Array, default: () => [] },
    selectedTokenId: { type: String, default: null },
    validDestination: { type: Boolean, default: false },
    dimmed: { type: Boolean, default: false },
    draggedTokenId: { type: String, default: null },
    validDropZoneIds: { type: Set, default: () => new Set() },
    connectSource: { type: Boolean, default: false },
    connectTarget: { type: Boolean, default: false },
  },
  emits: [
    'zone-clicked',
    'select-token',
    'rename-token',
    'remove-token',
    'update-zone',
    'delete-zone',
    'start-connect',
    'open-conditions',
    'drag-start',
    'drag-end',
    'drop-token',
  ],
  data() {
    return { editorOpen: false };
  },
  computed: {
    gridStyle() {
      return {
        gridColumn: `${this.zone.col} / span ${this.zone.colSpan || 1}`,
        gridRow: `${this.zone.row} / span ${this.zone.rowSpan || 1}`,
      };
    },
    validDrop() {
      return Boolean(this.draggedTokenId) && this.validDropZoneIds.has(this.zone.id);
    },
  },
  methods: {
    onZoneClick() {
      if (this.editorOpen) return;
      this.$emit('zone-clicked', this.zone.id);
    },
    onDragOver(event) {
      if (!this.draggedTokenId) return;
      if (!this.validDrop) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    },
    onDrop(event) {
      if (!this.validDrop) return;
      event.preventDefault();
      const tokenId = event.dataTransfer.getData('text/plain');
      if (!tokenId) return;
      this.$emit('drop-token', tokenId, this.zone.id);
    },
    onAffordance(key) {
      if (key === 'edit') {
        this.editorOpen = true;
      } else if (key === 'connect') {
        this.$emit('start-connect', this.zone.id);
      } else if (key === 'conditions') {
        this.$emit('open-conditions', this.zone.id);
      } else if (key === 'delete') {
        if (window.confirm(`Delete zone "${this.zone.name}"?`)) {
          this.$emit('delete-zone', this.zone.id);
        }
      }
    },
    saveEdit(fields) {
      this.$emit('update-zone', this.zone.id, fields);
      this.editorOpen = false;
    },
  },
};
</script>

<style scoped>
.zone {
  position: relative;
  background-color: var(--parchment-warm);
  border: 1px solid var(--parchment-edge);
  box-shadow:
    inset 0 0 0 3px var(--parchment-warm),
    inset 0 0 0 4px var(--parchment-edge),
    0 2px 6px rgba(46, 33, 20, 0.12);
  padding: 0.75rem 1rem 0.9rem;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  min-height: 180px;
  cursor: pointer;
  transition: border-color 150ms ease, opacity 150ms ease, background-color 150ms ease, box-shadow 150ms ease;
}

.zone--selected-adjacent {
  background-color: #f0dda8;
  box-shadow:
    inset 0 0 0 3px var(--parchment-warm),
    inset 0 0 0 4px var(--accent-gold),
    0 2px 10px rgba(168, 133, 54, 0.35);
}

.zone--valid-drop {
  background-color: #f2e0ab;
  box-shadow:
    inset 0 0 0 3px var(--parchment-warm),
    inset 0 0 0 4px var(--accent-gold),
    0 4px 16px rgba(168, 133, 54, 0.5);
  outline: 2px dashed var(--accent-gold);
  outline-offset: -2px;
}

.zone--invalid-drop {
  opacity: 0.6;
}

.zone--dimmed {
  opacity: 0.78;
}

.zone--connect-source {
  animation: connect-source-pulse 1.4s ease-in-out infinite;
}

.zone--connect-target {
  box-shadow:
    inset 0 0 0 3px var(--parchment-warm),
    inset 0 0 0 4px var(--accent-gold),
    0 0 12px rgba(168, 133, 54, 0.35);
}

.zone--connect-target:hover {
  background-color: #f0dda8;
}

@keyframes connect-source-pulse {
  0%, 100% {
    box-shadow:
      inset 0 0 0 3px var(--parchment-warm),
      inset 0 0 0 4px var(--accent-gold),
      0 0 12px rgba(168, 133, 54, 0.5);
  }
  50% {
    box-shadow:
      inset 0 0 0 3px var(--parchment-warm),
      inset 0 0 0 4px var(--accent-gold),
      0 0 22px rgba(168, 133, 54, 0.85);
  }
}

.zone-name {
  font-size: 1.65rem;
  font-weight: 600;
  text-align: center;
  margin: 0.25rem 0 0;
  line-height: 1.2;
  pointer-events: none;
  word-break: break-word;
}

.zone-description {
  font-size: 1.15rem;
  line-height: 1.5;
  margin: 0.5rem 0 0.75rem;
  text-align: center;
  color: var(--ink-secondary);
  pointer-events: none;
  /* Cap at two lines so the tokens+affordance row below always have a
     predictable amount of space to work with. */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.zone-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  justify-content: center;
  margin-bottom: 0.75rem;
}

.zone-tokens {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  align-items: flex-start;
  margin-top: auto;
  padding-top: 0.25rem;
  /* Reserve: affordance row (~32px) + label height (~18px) + gap. Keeps
     even long-name tokens clear of the bottom-right icon strip. */
  padding-bottom: 4rem;
  min-height: 70px;
}

.zone-affordance-anchor {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  z-index: 5;
}

/* Mobile-only signpost: lets touch users know the card body itself is
   tappable (opens the detail sheet) — since on desktop the affordance
   icons already advertise edit/conditions/delete on hover. Hidden at
   desktop widths. */
.zone-tap-hint {
  display: none;
  margin: 0;
  text-align: center;
  font-size: 0.82rem;
  color: var(--ink-muted);
  letter-spacing: 0.02em;
}

@media (max-width: 640px) {
  .zone {
    /* Top + bottom padding buffer the title and Connect button away
       from the card edges, so the connection-arrow tips (which sit
       ~12px inside the card perimeter) land in blank gutter rather
       than overlapping text or the Connect pill. */
    padding: 1.3rem 0.7rem 4.5rem;
    min-height: 160px;
    border-width: 1px;
    box-shadow:
      inset 0 0 0 1px var(--parchment-warm),
      inset 0 0 0 2px var(--parchment-edge),
      0 1px 2px rgba(46, 33, 20, 0.1);
  }

  .zone-name {
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.2;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Description still hides on mobile — it's visible in the detail
     sheet. The affordance row stays so Edit / Conditions / Delete /
     Connect are one tap away. */
  .zone-description {
    display: none;
  }

  .zone-affordance-anchor {
    /* Lifted up from the card bottom so the incoming arrow tip has
       clear gutter below the Connect pill. */
    bottom: 22px;
    left: 8px;
    right: 8px;
  }

  .zone-tap-hint {
    display: block;
    /* Flows right after the pills, introducing the card as tappable
       before the eye reaches the tokens. */
    margin: 0.2rem 0 0.4rem;
  }

  .zone-pills {
    gap: 4px;
    margin-bottom: 0.4rem;
    margin-top: 0.35rem;
  }

  .zone-tokens {
    gap: 8px;
    padding-top: 0.2rem;
    padding-bottom: 0;
    min-height: 44px;
  }
}
</style>
