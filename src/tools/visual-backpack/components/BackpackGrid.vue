<template>
  <section class="grid-panel parchment paper-grain" aria-label="Your backpack">
    <header class="grid-panel__head">
      <h2 class="grid-panel__title">Your pack</h2>
      <ParButton
        size="small"
        variant="primary-outline"
        :disabled="!items.length"
        @click="$emit('autopack')"
      >Tidy up</ParButton>
    </header>

    <div
      ref="gridEl"
      class="grid-drop"
      :class="{ 'grid-drop--over': isOver }"
      :style="gridStyle"
      @dragover.prevent="onDragOver"
      @dragenter.prevent="isOver = true"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <p v-if="!items.length" class="grid-empty">
        <span class="grid-empty__icon" aria-hidden="true">🎒</span>
        <span>Start with a <strong>starter pack</strong>, or drag gear anywhere on the grid.</span>
      </p>

      <TransitionGroup name="tile" tag="div" class="tile-layer">
        <ItemTile
          v-for="item in items"
          :key="item.instanceId"
          :item="item"
          :selected="item.instanceId === selectedId"
          @remove="$emit('remove', $event)"
          @nudge="$emit('nudge', $event)"
          @select="$emit('select', $event)"
        />
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup>
/**
 * The positioned drop grid. Tiles live at real cell coordinates (item.pos), so
 * they can sit anywhere — separated, with gaps. The grid is a fixed COLS wide and
 * grows downward; a drop is placed at the pointed cell and NEVER rejected (it
 * slides to the nearest free cell if that spot is taken). Weight is the only real
 * limit (CapacityIndicator).
 */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { ParButton } from '@/parchment';
import ItemTile from './ItemTile.vue';
import { dragPayload, clearDrag } from '../composables/drag-state.js';
import { COLS, offsetToCell, contentRows } from '../utils/grid-layout.mjs';

const GAP = 6; // px, matches --gap

const props = defineProps({
  items: { type: Array, default: () => [] },
  strength: { type: Number, default: 10 },
  selectedId: { type: String, default: null },
});

const emit = defineEmits(['place', 'move', 'remove', 'nudge', 'autopack', 'select']);

const gridEl = ref(null);
const isOver = ref(false);
const cellPx = ref(60); // measured square cell side
const pitch = computed(() => cellPx.value + GAP);

// Enough rows to drop below the lowest item (and a comfortable minimum).
const rows = computed(() => Math.max(8, contentRows(props.items) + 3));

const gridStyle = computed(() => ({
  '--cols': COLS,
  '--cell': `${cellPx.value}px`,
  '--gap': `${GAP}px`,
  '--pitch': `${pitch.value}px`,
  minHeight: `${rows.value * pitch.value}px`,
}));

let ro = null;
function measure() {
  const el = gridEl.value;
  if (!el) return;
  const w = el.clientWidth;
  cellPx.value = Math.max(28, (w - (COLS - 1) * GAP) / COLS);
}
onMounted(() => {
  measure();
  ro = new ResizeObserver(measure);
  if (gridEl.value) ro.observe(gridEl.value);
});
onBeforeUnmount(() => ro?.disconnect());

function cellFromEvent(e) {
  const rect = gridEl.value.getBoundingClientRect();
  return {
    x: offsetToCell(e.clientX - rect.left, pitch.value),
    y: offsetToCell(e.clientY - rect.top, pitch.value),
  };
}

function onDragOver(e) {
  e.dataTransfer.dropEffect = dragPayload.value?.kind === 'move' ? 'move' : 'copy';
}

function onDragLeave(e) {
  if (!e.currentTarget.contains(e.relatedTarget)) isOver.value = false;
}

function onDrop(e) {
  isOver.value = false;
  const payload = dragPayload.value;
  if (!payload) return;
  const cell = cellFromEvent(e);
  // Offset by the grabbed cell so the tile lands under the pointer, not corner-first.
  const grab = payload.grab || { x: 0, y: 0 };
  const pos = { x: cell.x - grab.x, y: cell.y - grab.y };
  if (payload.kind === 'add' && payload.template) {
    emit('place', { template: payload.template, pos });
  } else if (payload.kind === 'move' && payload.instanceId) {
    emit('move', { instanceId: payload.instanceId, pos });
  }
  clearDrag();
}

</script>

<style scoped>
.grid-panel {
  display: flex;
  flex-direction: column;
  background: var(--par-color-surface-card, #fefbf4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  padding: 1.6rem 1.8rem 1.8rem;
}

.grid-panel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.2rem;
}

.grid-panel__title {
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-action-hover, #2a4d70);
}

.grid-drop {
  position: relative;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(var(--cols), 1fr);
  grid-auto-rows: var(--cell);
  gap: var(--gap);
  border-radius: var(--par-radius-md, 4px);
  /* Faint cell lattice so the droppable grid is visible. */
  background-image:
    linear-gradient(to right, rgba(122, 50, 30, 0.07) 0 1px, transparent 1px),
    linear-gradient(to bottom, rgba(122, 50, 30, 0.07) 0 1px, transparent 1px);
  background-size: var(--pitch) var(--pitch);
  background-position: 0 0;
  outline: 1.5px dashed transparent;
  outline-offset: -1px;
  transition: outline-color 0.15s ease, background-color 0.15s ease;
}

.grid-drop--over {
  outline-color: var(--color-action-rest, #365a85);
  background-color: rgba(54, 90, 133, 0.04);
}

/* The tile layer participates directly in the grid so tiles place by grid-area. */
.tile-layer {
  display: contents;
}

.grid-empty {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin: 0;
  padding: 2rem;
  text-align: center;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.6rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}

.grid-empty__icon {
  font-size: 3.6rem;
  font-style: normal;
  opacity: 0.8;
}

/* FLIP animation for autopack / placement / remove. */
.tile-move,
.tile-enter-active,
.tile-leave-active {
  transition: transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.24s ease;
}

.tile-enter-from,
.tile-leave-to {
  opacity: 0;
  transform: scale(0.85);
}

.tile-leave-active {
  position: absolute;
}

@media (prefers-reduced-motion: reduce) {
  .tile-move,
  .tile-enter-active,
  .tile-leave-active {
    transition: none;
  }
}
</style>
