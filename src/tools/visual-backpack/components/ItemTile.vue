<template>
  <div
    class="tile"
    :class="{ 'tile--lifted': lifted }"
    :style="tileStyle"
    draggable="true"
    tabindex="0"
    role="listitem"
    :aria-label="ariaLabel"
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

    <span class="tile__name">{{ item.name }}</span>
    <span class="tile__weight">{{ formatWeight(item.weight) }} lb</span>
  </div>
</template>

<script setup>
/**
 * A single draggable backpack tile. Color encodes weight (the encounter
 * difficulty gradient, reused); shape (grid span) is the cosmetic size field.
 * Keyboard: ←/→ reorder, Delete/Backspace remove — the touch/keyboard-accessible
 * path alongside pointer drag.
 */
import { computed, ref } from 'vue';
import { weightBucket } from '../utils/tile-presentation.mjs';
import { setDrag, clearDrag } from '../composables/drag-state.js';

const props = defineProps({
  item: { type: Object, required: true },
  index: { type: Number, required: true },
});

const emit = defineEmits(['remove', 'move']);

const lifted = ref(false);

const bucket = computed(() => weightBucket(props.item.weight));

const tileStyle = computed(() => ({
  gridColumn: `span ${props.item.size?.w || 1}`,
  gridRow: `span ${props.item.size?.h || 1}`,
  '--tile-bg': bucket.value.bg,
  '--tile-text': bucket.value.text,
}));

const ariaLabel = computed(
  () => `${props.item.name}, ${formatWeight(props.item.weight)} pounds, ${bucket.value.label} weight. Use left and right arrow keys to reorder, Delete to remove.`,
);

function formatWeight(w) {
  const n = Number(w) || 0;
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function onDragStart(e) {
  lifted.value = true;
  setDrag({ kind: 'move', index: props.index });
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', props.item.name);
}

function onDragEnd() {
  lifted.value = false;
  clearDrag();
}

function onKeydown(e) {
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    emit('move', { from: props.index, to: props.index - 1 });
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    emit('move', { from: props.index, to: props.index + 1 });
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
  min-height: 6.4rem;
  padding: 0.9rem 1rem;
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

.tile--lifted {
  opacity: 0.45;
  cursor: grabbing;
}

.tile__name {
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.2;
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

.tile__weight {
  font-size: 1.15rem;
  font-weight: 500;
  opacity: 0.85;
  letter-spacing: 0.02em;
}

.tile__remove {
  position: absolute;
  top: 0.2rem;
  right: 0.3rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
  opacity: 0;
  font-size: 1.8rem;
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
