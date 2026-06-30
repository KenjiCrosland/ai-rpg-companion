<template>
  <section
    class="bag parchment"
    :class="{ 'bag--over': over, 'bag--drop': dropActive }"
    aria-label="Bag of Holding"
    @dragover.prevent="onDragOver"
    @dragenter.prevent="dropActive = true"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <header class="bag__head">
      <h2 class="bag__title"><span aria-hidden="true">🧳</span> {{ bag.name }}</h2>
      <span class="bag__count" :class="{ 'bag__count--over': over }">
        {{ formatWeight(bag.used) }} / {{ bag.capacity }} lb
      </span>
    </header>

    <div
      class="bag__bar"
      role="progressbar"
      :aria-valuenow="Math.round(bag.used)"
      aria-valuemin="0"
      :aria-valuemax="bag.capacity"
    >
      <div class="bag__fill" :style="{ width: fillWidth }"></div>
    </div>

    <p v-if="over" class="bag__warn">
      Overloaded. A real bag of holding would rupture and spill its contents into the
      Astral&nbsp;Plane. Take some weight out.
    </p>

    <ul v-if="bag.contents.length" class="bag__list">
      <li v-for="it in bag.contents" :key="it.instanceId" class="bag__item">
        <span class="bag__item-swatch" :style="{ background: typeColor(it).bg }" aria-hidden="true"></span>
        <span class="bag__item-name"
          >{{ cleanName(it.name) }}<span v-if="it.quantity > 1" class="bag__item-qty"> ×{{ it.quantity }}</span></span>
        <span class="bag__item-weight">{{ formatWeight(effectiveWeight(it)) }} lb</span>
        <button
          class="bag__retrieve"
          type="button"
          :aria-label="`Take ${cleanName(it.name)} out of the bag`"
          title="Move to pack"
          @click="$emit('retrieve', it.instanceId)"
        >↑</button>
      </li>
    </ul>
    <p v-else class="bag__empty">
      <span class="bag__empty-icon" aria-hidden="true">✨</span>
      Drag items here (or use <strong>Stash in bag</strong> in an item's details). Stashed gear
      stops counting against your carry weight.
    </p>

    <footer v-if="bag.contents.length" class="bag__footer">
      <button class="bag__emptybtn" type="button" @click="$emit('empty', bag.instanceId)">
        Empty bag
      </button>
    </footer>
  </section>
</template>

<script setup>
/**
 * Bag of Holding panel — an extradimensional pocket that holds up to 500 lb
 * without weighing the character down. Drag a pack tile onto it (or use the
 * detail panel's "Stash in bag") to stash; ↑ on a row returns it to the pack.
 */
import { ref, computed } from 'vue';
import { cleanName, effectiveWeight, typeColor } from '../utils/tile-presentation.mjs';
import { dragPayload, clearDrag } from '../composables/drag-state.js';

const props = defineProps({
  bag: { type: Object, required: true }, // { instanceId, name, contents, used, capacity }
});
const emit = defineEmits(['retrieve', 'empty', 'stash', 'reject-bag']);

const over = computed(() => props.bag.used > props.bag.capacity);
const fillWidth = computed(() => `${Math.min(1, props.bag.used / props.bag.capacity || 0) * 100}%`);

const dropActive = ref(false);

function onDragOver(e) {
  e.dataTransfer.dropEffect = 'move';
}
function onDragLeave(e) {
  if (!e.currentTarget.contains(e.relatedTarget)) dropActive.value = false;
}
function onDrop() {
  dropActive.value = false;
  const payload = dragPayload.value;
  clearDrag();
  if (!payload || payload.kind !== 'move' || !payload.instanceId) return;
  // A bag inside a bag tears a rift — let the page warn instead of stashing.
  if (payload.isBag) emit('reject-bag');
  else emit('stash', payload.instanceId);
}

function formatWeight(w) {
  const n = Number(w) || 0;
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}
</script>

<style scoped>
.bag {
  background: var(--par-color-surface-card, #fefbf4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  padding: 1.2rem 1.6rem 1.3rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.bag--drop {
  border-color: var(--color-action-rest, #365a85);
  box-shadow: inset 0 0 0 1px var(--color-action-rest, #365a85);
}
.bag--over {
  border-color: var(--par-color-destructive, #a03333);
}

.bag__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.7rem;
}
.bag__title {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-action-hover, #2a4d70);
}
.bag__count {
  font-size: 1.4rem;
  color: var(--par-color-text-secondary, #555);
  white-space: nowrap;
}
.bag__count--over {
  color: var(--par-color-destructive, #a03333);
  font-weight: 600;
}

.bag__bar {
  height: 1rem;
  background: rgba(42, 77, 112, 0.1);
  border-radius: 999px;
  overflow: hidden;
}
.bag__fill {
  height: 100%;
  background: var(--color-action-rest, #365a85);
  border-radius: 999px;
  transition: width 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.3s ease;
}
.bag--over .bag__fill {
  background: var(--par-color-destructive, #a03333);
}
@media (prefers-reduced-motion: reduce) {
  .bag__fill {
    transition: none;
  }
}

.bag__warn {
  margin: 0.7rem 0 0;
  font-size: 1.25rem;
  line-height: 1.5;
  color: var(--par-color-destructive, #a03333);
}

.bag__list {
  list-style: none;
  margin: 0.9rem 0 0;
  padding: 0;
}
.bag__item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.5rem 0;
  border-bottom: 0.5px solid var(--par-color-divider, #e2dccd);
}
.bag__item-swatch {
  flex: none;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 4px;
  border: 0.5px solid rgba(122, 50, 30, 0.2);
}
.bag__item-name {
  flex: 1;
  min-width: 0;
  font-size: 1.4rem;
  color: var(--par-color-text, #222);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bag__item-qty {
  font-weight: 700;
  color: var(--color-action-hover, #2a4d70);
}
.bag__item-weight {
  flex: none;
  font-size: 1.3rem;
  color: var(--par-color-text-secondary, #555);
}
.bag__retrieve {
  flex: none;
  width: 2.6rem;
  height: 2.6rem;
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  background: var(--par-color-surface, #fbf7f0);
  border-radius: var(--par-radius-sm, 3px);
  color: var(--color-action-hover, #2a4d70);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.12s ease;
}
.bag__retrieve:hover {
  background: var(--par-color-callout-bg, #f3ebda);
}
.bag__retrieve:focus-visible {
  outline: 2px solid var(--color-action-rest, #365a85);
  outline-offset: 1px;
}

.bag__empty {
  margin: 0.9rem 0 0;
  font-size: 1.3rem;
  font-style: italic;
  line-height: 1.5;
  color: var(--par-color-text-muted, #6b6b6b);
}
.bag__empty-icon {
  font-style: normal;
}
.bag__empty strong {
  font-weight: 600;
  color: var(--par-color-text, #222);
}

.bag__footer {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}
.bag__emptybtn {
  display: inline-flex;
  align-items: center;
  min-height: 3.2rem;
  padding: 0.4rem 0.9rem;
  background: transparent;
  border: 0.5px solid transparent;
  border-radius: var(--par-radius-md, 4px);
  font-family: inherit;
  font-size: 1.3rem;
  color: var(--par-color-text-muted, #6b6b6b);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.bag__emptybtn:hover {
  background: rgba(160, 51, 51, 0.06);
  color: var(--par-color-destructive, #a03333);
  border-color: rgba(160, 51, 51, 0.3);
}
</style>
