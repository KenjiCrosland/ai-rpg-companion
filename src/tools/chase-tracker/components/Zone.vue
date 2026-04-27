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
    <button
      type="button"
      class="zone-delete-btn"
      :aria-label="`Delete ${zone.name}`"
      title="Delete zone"
      @click.stop="onDeleteClick"
    >×</button>

    <h3 class="zone-name">{{ zone.name }}</h3>

    <p
      v-if="zone.description"
      ref="description"
      :class="['zone-description', 'ink-italic', {
        'zone-description--expanded': descriptionExpanded,
        'zone-description--clickable': descriptionOverflows,
      }]"
      :role="descriptionOverflows ? 'button' : null"
      :tabindex="descriptionOverflows ? 0 : null"
      :aria-expanded="descriptionOverflows ? descriptionExpanded : null"
      :aria-label="descriptionOverflows
        ? (descriptionExpanded ? 'Collapse description' : 'Expand description')
        : null"
      @click="onDescriptionClick"
      @keydown.enter="onDescriptionKey"
      @keydown.space="onDescriptionKey"
    >{{ zone.description }}</p>

    <div v-if="zone.pills.length" class="zone-pills">
      <ZonePill v-for="pill in zone.pills" :key="pill.id" :pill="pill" />
    </div>

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
    'add-token',
    'drag-start',
    'drag-end',
    'drop-token',
  ],
  data() {
    return {
      editorOpen: false,
      descriptionExpanded: false,
      descriptionOverflows: false,
    };
  },
  created() {
    // Hold the ResizeObserver instance off the reactive `data()` so Vue
    // doesn't proxy-wrap it. Plain instance property is enough here.
    this.descriptionObserver = null;
  },
  mounted() {
    this.attachDescriptionObserver();
  },
  beforeUnmount() {
    this.detachDescriptionObserver();
  },
  watch: {
    'zone.description'(val) {
      // Description text changed (edit save). Re-measure once layout
      // settles. If the new text is empty, drop the observer entirely.
      if (val) {
        this.$nextTick(() => {
          if (!this.descriptionObserver) this.attachDescriptionObserver();
          else this.measureDescription();
        });
      } else {
        this.descriptionOverflows = false;
        this.descriptionExpanded = false;
        this.detachDescriptionObserver();
      }
    },
    descriptionExpanded() {
      // Toggling between clamped and full changes scrollHeight; the
      // next measurement should run after the layout reflows.
      this.$nextTick(() => this.measureDescription());
    },
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
      } else if (key === 'addToken') {
        this.$emit('add-token', this.zone.id);
      }
    },
    onDeleteClick() {
      if (window.confirm(`Delete zone "${this.zone.name}"?`)) {
        this.$emit('delete-zone', this.zone.id);
      }
    },
    saveEdit(fields) {
      this.$emit('update-zone', this.zone.id, fields);
      this.editorOpen = false;
    },
    onDescriptionClick(event) {
      // Non-truncated descriptions act as plain text — let the click
      // bubble to the zone so token-move still works on the body.
      if (!this.descriptionOverflows) return;
      event.stopPropagation();
      this.descriptionExpanded = !this.descriptionExpanded;
    },
    onDescriptionKey(event) {
      if (!this.descriptionOverflows) return;
      event.preventDefault();
      event.stopPropagation();
      this.descriptionExpanded = !this.descriptionExpanded;
    },
    attachDescriptionObserver() {
      const el = this.$refs.description;
      if (!el) return;
      this.measureDescription();
      if (typeof ResizeObserver !== 'function') return;
      this.descriptionObserver = new ResizeObserver(() => this.measureDescription());
      this.descriptionObserver.observe(el);
    },
    detachDescriptionObserver() {
      if (!this.descriptionObserver) return;
      this.descriptionObserver.disconnect();
      this.descriptionObserver = null;
    },
    measureDescription() {
      const el = this.$refs.description;
      if (!el) return;
      // While expanded the element shows full text, so scrollHeight
      // ≈ clientHeight and the naive overflow check would flip the
      // toggle off. Preserve the previously detected overflow state
      // until the user collapses it again.
      if (this.descriptionExpanded) return;
      // +1 tolerance for sub-pixel rounding on some browsers.
      this.descriptionOverflows = el.scrollHeight > el.clientHeight + 1;
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
  /* Padding so the title text can't crash into the top-right × on
     narrow columns, no matter how long the name is. */
  padding: 0 1.75rem;
}

/* Small destructive affordance in the top-right corner of every
   zone card. Quiet at rest — muted ink, no border/background —
   bright red on hover so intent reads instantly. Hidden on mobile:
   the detail sheet's Delete Zone button covers deletion there. */
.zone-delete-btn {
  position: absolute;
  top: 0.35rem;
  right: 0.45rem;
  width: 24px;
  height: 24px;
  padding: 0;
  background: transparent;
  border: none;
  color: var(--ink-muted);
  font-family: var(--font-display);
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  transition: color 120ms ease, opacity 120ms ease;
  z-index: 4;
}

.zone:hover .zone-delete-btn,
.zone:focus-within .zone-delete-btn {
  opacity: 1;
}

.zone-delete-btn:hover {
  color: var(--accent-red);
}

.zone-description {
  font-size: 1.15rem;
  line-height: 1.5;
  margin: 0.5rem 0 0.75rem;
  text-align: center;
  color: var(--ink-secondary);
  border-radius: 2px;
  transition: color 120ms ease;
  /* Cap at two lines so the tokens+affordance row below always have a
     predictable amount of space to work with. The clickable modifier
     adds the tap-to-expand affordance only when the text actually
     overflows the clamp — short descriptions stay plain text. */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  pointer-events: none;
}

.zone-description--clickable {
  cursor: pointer;
  pointer-events: auto;
}

.zone-description--clickable:hover,
.zone-description--clickable:focus-visible {
  color: var(--ink-primary);
  outline: none;
}

.zone-description--clickable:focus-visible {
  box-shadow: 0 0 0 2px var(--accent-gold);
}

.zone-description--expanded {
  display: block;
  -webkit-line-clamp: unset;
  overflow: visible;
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

@media (max-width: 640px) {
  /* Mobile: delete lives in the zone detail sheet's Edit tab. The
     top-right × on the card would compete for the tap target with
     the "tap card to open sheet" gesture. */
  .zone-delete-btn {
    display: none;
  }

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
    /* Smaller + wrappable on mobile — long names like "Collapsed
       Section" get two tight lines rather than a truncated ellipsis. */
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.2;
    margin: 0;
    white-space: normal;
    overflow-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
  }

  /* Mobile description: 2–3 visible lines, truncated beyond that.
     CSS grid auto-sizes the row to the tallest card, so every zone
     in the same row matches height when some have longer text. */
  .zone-description {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 0.85rem;
    line-height: 1.35;
    margin: 0.25rem 0 0;
  }

  /* Mobile re-override: expanded state must win against the more
     restrictive mobile clamp above. Same specificity as
     `.zone-description`, so this rule needs to come after. */
  .zone-description--expanded {
    display: block;
    -webkit-line-clamp: unset;
    line-clamp: unset;
    overflow: visible;
  }

  .zone-affordance-anchor {
    /* Lifted up from the card bottom so the incoming arrow tip has
       clear gutter below the Connect pill. */
    bottom: 22px;
    left: 8px;
    right: 8px;
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
