<template>
  <div
    class="tile"
    :class="{ 'tile--lifted': lifted, 'tile--selected': selected }"
    :style="tileStyle"
    draggable="true"
    tabindex="0"
    role="listitem"
    :aria-label="ariaLabel"
    @click="$emit('select', item.instanceId)"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    @keydown="onKeydown"
  >
    <button
      class="tile__remove"
      type="button"
      :aria-label="`Remove ${item.name}`"
      title="Remove"
      @click.stop="$emit('remove', item.instanceId)"
      @dragstart.prevent.stop
    >×</button>

    <span class="tile__name"
      >{{ baseName }}<span
        v-if="item.quantity > 1"
        :key="item.quantity"
        class="tile__qty"
      > ×{{ item.quantity }}</span></span>
    <span class="tile__weight">{{ formatWeight(weight) }} lb</span>
  </div>
</template>

<script setup>
/**
 * A single draggable backpack tile, placed at its grid cell (item.pos). Color
 * encodes type, square size encodes weight. Keyboard: arrow keys nudge the tile
 * one cell, Delete/Backspace removes — the touch/keyboard-accessible path
 * alongside pointer drag.
 */
import { computed, ref } from 'vue';
import { typeColor, tileSize, effectiveWeight, cleanName } from '../utils/tile-presentation.mjs';
import { setDrag, clearDrag } from '../composables/drag-state.js';

const props = defineProps({
  item: { type: Object, required: true },
  selected: { type: Boolean, default: false },
});

const emit = defineEmits(['remove', 'nudge', 'select']);

const lifted = ref(false);

// Color = type; square size = effective weight; placement = pos.
const colors = computed(() => typeColor(props.item));
const span = computed(() => tileSize(props.item));
const weight = computed(() => effectiveWeight(props.item));
const baseName = computed(() => cleanName(props.item.name));

const tileStyle = computed(() => {
  const x = props.item.pos?.x ?? 0;
  const y = props.item.pos?.y ?? 0;
  return {
    gridColumn: `${x + 1} / span ${span.value.w}`,
    gridRow: `${y + 1} / span ${span.value.h}`,
    '--tile-bg': colors.value.bg,
    '--tile-text': colors.value.text,
  };
});

const ariaLabel = computed(
  () => `${props.item.name}, ${formatWeight(props.item.weight)} pounds, ${colors.value.label}. Use arrow keys to move, Delete to remove.`,
);

function formatWeight(w) {
  const n = Number(w) || 0;
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function onDragStart(e) {
  lifted.value = true;
  // Which cell of the tile was grabbed — so the drop keeps that cell under the
  // cursor (the tile follows the pointer instead of snapping its corner there).
  const rect = e.currentTarget.getBoundingClientRect();
  const { w, h } = span.value;
  const gx = Math.min(w - 1, Math.max(0, Math.floor((e.clientX - rect.left) / (rect.width / w))));
  const gy = Math.min(h - 1, Math.max(0, Math.floor((e.clientY - rect.top) / (rect.height / h))));
  setDrag({ kind: 'move', instanceId: props.item.instanceId, grab: { x: gx, y: gy } });
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', props.item.name);
}

function onDragEnd() {
  lifted.value = false;
  clearDrag();
}

const NUDGES = {
  ArrowLeft: { dx: -1, dy: 0 },
  ArrowRight: { dx: 1, dy: 0 },
  ArrowUp: { dx: 0, dy: -1 },
  ArrowDown: { dx: 0, dy: 1 },
};

function onKeydown(e) {
  if (NUDGES[e.key]) {
    e.preventDefault();
    emit('nudge', { instanceId: props.item.instanceId, ...NUDGES[e.key] });
  } else if (e.key === 'Enter') {
    e.preventDefault();
    emit('select', props.item.instanceId);
  } else if (e.key === 'Delete' || e.key === 'Backspace') {
    e.preventDefault();
    emit('remove', props.item.instanceId);
  }
}
</script>

<style scoped>
.tile {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem 0.55rem;
  background: var(--tile-bg, #e8e2d4);
  color: var(--tile-text, #6b6b6b);
  border: 0.5px solid rgba(122, 50, 30, 0.18);
  border-radius: var(--par-radius-md, 4px);
  box-shadow: var(--par-color-card-shadow, 0 1px 3px rgba(122, 50, 30, 0.04));
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  cursor: grab;
  user-select: none;
  transition: transform 0.14s ease, box-shadow 0.14s ease, opacity 0.14s ease;
}

.tile:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(122, 50, 30, 0.12);
}

.tile:focus-visible {
  outline: 2px solid var(--color-action-rest, #365a85);
  outline-offset: 2px;
}

.tile--selected {
  outline: 2.5px solid var(--color-action-rest, #365a85);
  outline-offset: 1px;
  z-index: 1;
}

.tile--lifted {
  opacity: 0.45;
  cursor: grabbing;
}

.tile__name {
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.15;
  /* Wrap long words instead of clipping them ("Waterskin" was losing its n). */
  overflow-wrap: anywhere;
  word-break: break-word;
  hyphens: auto;
  /* clamp long names to keep small tiles tidy */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Live quantity in the title; pulses when it changes (re-keyed on quantity). */
.tile__qty {
  display: inline-block;
  font-weight: 700;
  border-radius: 3px;
  padding: 0 0.15rem;
  transform-origin: center;
  animation: qty-pulse 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}

@keyframes qty-pulse {
  0% { transform: scale(1); background: transparent; }
  30% { transform: scale(1.6); background: rgba(255, 255, 255, 0.7); }
  100% { transform: scale(1); background: transparent; }
}

.tile__weight {
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.85;
  letter-spacing: 0.02em;
}

@media (prefers-reduced-motion: reduce) {
  .tile__qty { animation: none; }
}

.tile__remove {
  position: absolute;
  top: 0.1rem;
  right: 0.15rem;
  width: 1.7rem;
  height: 1.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
  opacity: 0;
  font-size: 1.5rem;
  line-height: 1;
  border-radius: 50%;
  cursor: pointer;
  transition: opacity 0.12s ease, background 0.12s ease;
}

.tile:hover .tile__remove,
.tile:focus-within .tile__remove {
  opacity: 0.7;
}

.tile__remove:hover {
  opacity: 1;
  background: rgba(160, 51, 51, 0.14);
  color: var(--par-color-destructive, #a03333);
}

@media (prefers-reduced-motion: reduce) {
  .tile {
    transition: none;
  }
  .tile:hover {
    transform: none;
  }
}
</style>
