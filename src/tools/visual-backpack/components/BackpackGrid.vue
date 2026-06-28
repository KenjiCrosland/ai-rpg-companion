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
      class="grid-drop"
      :class="{ 'grid-drop--over': isOver }"
      :style="dropStyle"
      @dragover.prevent="onDragOver"
      @dragenter.prevent="isOver = true"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <p v-if="!items.length" class="grid-empty">
        <span class="grid-empty__icon" aria-hidden="true">🎒</span>
        <span>Start with a <strong>starter pack</strong>, or drag gear here to pack it.</span>
      </p>

      <TransitionGroup v-else name="tile" tag="div" class="tile-grid">
        <ItemTile
          v-for="(item, idx) in items"
          :key="item.instanceId"
          :item="item"
          :index="idx"
          @remove="$emit('remove', $event)"
          @move="$emit('move', $event)"
        />
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup>
/**
 * The drop target. The grid is a VISUAL ARRANGEMENT — it never rejects an item
 * for lack of space (auto-flow dense + grows). Weight is the only real limit
 * (CapacityIndicator). Min-height scales subtly with Strength so a stronger
 * character's pack reads as roomier.
 */
import { ref, computed } from 'vue';
import { ParButton } from '@/parchment';
import ItemTile from './ItemTile.vue';
import { dragPayload, clearDrag } from '../composables/drag-state.js';

const props = defineProps({
  items: { type: Array, default: () => [] },
  strength: { type: Number, default: 10 },
});

const emit = defineEmits(['add', 'remove', 'move', 'autopack']);

const isOver = ref(false);

// Visual capacity grows with Strength (cosmetic — weight is the real limit).
const dropStyle = computed(() => ({ minHeight: `${160 + props.strength * 14}px` }));

function onDragOver(e) {
  e.dataTransfer.dropEffect = dragPayload.value?.kind === 'move' ? 'move' : 'copy';
}

function onDragLeave(e) {
  // Only clear when leaving the drop zone itself, not when crossing child tiles.
  if (!e.currentTarget.contains(e.relatedTarget)) isOver.value = false;
}

function onDrop() {
  isOver.value = false;
  const payload = dragPayload.value;
  if (payload?.kind === 'add' && payload.template) {
    emit('add', payload.template);
  } else if (payload?.kind === 'move') {
    // Dropped onto open grid area → send to the end of the arrangement.
    emit('move', { from: payload.index, to: props.items.length - 1 });
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
  flex: 1;
  border: 1.5px dashed transparent;
  border-radius: var(--par-radius-md, 4px);
  transition: border-color 0.15s ease, background 0.15s ease;
}

.grid-drop--over {
  border-color: var(--color-action-rest, #365a85);
  background: var(--par-color-readaloud-bg, #d8e3ef);
}

.tile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10.4rem, 1fr));
  grid-auto-rows: 10.4rem;
  grid-auto-flow: row dense;
  gap: 0.8rem;
  padding: 0.4rem;
}

.grid-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  height: 100%;
  min-height: 16rem;
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

/* FLIP animation for autopack / add / remove. */
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
