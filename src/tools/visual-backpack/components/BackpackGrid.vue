<template>
  <section class="grid-panel parchment paper-grain" aria-label="Your backpack">
    <header class="grid-panel__head">
      <div class="grid-panel__titlebar">
        <h2 class="grid-panel__title">{{ title }}</h2>
        <span
          v-if="attunedCount > 0 || view === 'equip'"
          class="grid-panel__attune"
          :class="{ 'grid-panel__attune--over': attunedCount > maxAttunement }"
          title="Attuned magic items (max 3)"
        >⚜ {{ attunedCount }}/{{ maxAttunement }}</span>
      </div>
      <div class="grid-panel__controls">
        <div class="view-toggle" role="group" aria-label="View mode">
          <button
            type="button"
            class="view-toggle__btn"
            :class="{ 'view-toggle__btn--active': view === 'grid' }"
            :aria-pressed="view === 'grid'"
            @click="setView('grid')"
          >Grid</button>
          <button
            type="button"
            class="view-toggle__btn"
            :class="{ 'view-toggle__btn--active': view === 'list' }"
            :aria-pressed="view === 'list'"
            @click="setView('list')"
          >List</button>
          <button
            type="button"
            class="view-toggle__btn"
            :class="{ 'view-toggle__btn--active': view === 'equip' }"
            :aria-pressed="view === 'equip'"
            @click="setView('equip')"
          >Equip</button>
        </div>
        <template v-if="view !== 'equip'">
          <label class="grid-panel__sort">
            <span class="grid-panel__sort-label">Sort</span>
            <ParSelect
              :model-value="sortBy"
              :options="sortOptions"
              aria-label="Sort pack"
              @update:model-value="onSort"
            />
          </label>
          <ParButton
            size="small"
            variant="primary-outline"
            :disabled="!items.length"
            @click="$emit('autopack', sortBy)"
          >Tidy up</ParButton>
        </template>
      </div>
    </header>

    <div v-if="items.length && view !== 'equip'" class="grid-panel__pills" role="group" aria-label="Filter pack by type">
      <button
        class="pill"
        type="button"
        :class="{ 'pill--active': !typeFilter }"
        @click="typeFilter = ''"
      >All</button>
      <button
        v-for="t in types"
        :key="t.key"
        class="pill"
        type="button"
        :class="{ 'pill--active': typeFilter === t.key }"
        :style="pillStyle(t)"
        @click="typeFilter = typeFilter === t.key ? '' : t.key"
      >
        <span class="pill__dot" :style="{ background: t.color.bg }" aria-hidden="true"></span>{{ t.label }}
      </button>
      <button
        v-if="hasEquipped || typeFilter === 'equipped'"
        class="pill pill--equipped"
        type="button"
        :class="{ 'pill--active': typeFilter === 'equipped' }"
        @click="typeFilter = typeFilter === 'equipped' ? '' : 'equipped'"
      >
        <span class="pill__check" aria-hidden="true">✓</span>Equipped
      </button>
    </div>

    <!-- GRID VIEW -->
    <div
      v-if="view === 'grid'"
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
      <p v-else-if="!gridItems.length" class="grid-empty">
        No {{ activeTypeLabel }} items in your pack.
      </p>

      <TransitionGroup name="tile" tag="div" class="tile-layer">
        <ItemTile
          v-for="item in gridItems"
          :key="item.instanceId"
          :item="item"
          :selected="item.instanceId === selectedId"
          @remove="$emit('remove', $event)"
          @nudge="$emit('nudge', $event)"
          @select="$emit('select', $event)"
        />
      </TransitionGroup>
    </div>

    <!-- EQUIP (PAPER DOLL) VIEW -->
    <EquipDoll
      v-else-if="view === 'equip'"
      :by-slot="equippedBySlot"
      :items="items"
      :attuned-count="attunedCount"
      :max-attunement="maxAttunement"
      :selected-id="selectedId"
      @select="$emit('select', $event)"
      @unequip="$emit('unequip', $event)"
      @equip="$emit('equip', $event)"
    />

    <!-- LIST VIEW -->
    <div v-else class="list">
      <p v-if="!items.length" class="grid-empty grid-empty--list">
        <span class="grid-empty__icon" aria-hidden="true">🎒</span>
        <span>Start with a <strong>starter pack</strong>, or add gear from the catalog.</span>
      </p>
      <p v-else-if="!listItems.length" class="grid-empty grid-empty--list">
        No {{ activeTypeLabel }} items in your pack.
      </p>

      <TransitionGroup v-else name="row" tag="ul" class="list__items" role="list">
        <li
          v-for="item in listItems"
          :key="item.instanceId"
          class="row-item"
          :class="{
            'row-item--selected': item.instanceId === selectedId,
            'row-item--drop': dragOverId === item.instanceId,
            'row-item--dragging': listDragId === item.instanceId,
          }"
          draggable="true"
          tabindex="0"
          @click="$emit('select', item.instanceId)"
          @keydown="onRowKeydown(item, $event)"
          @dragstart="onRowDragStart(item, $event)"
          @dragover.prevent="dragOverId = item.instanceId"
          @drop="onRowDrop(item)"
          @dragend="onRowDragEnd"
        >
          <span class="row-item__handle" aria-hidden="true">⠿</span>
          <span class="row-item__swatch" :style="{ background: rowColor(item).bg }" aria-hidden="true"></span>
          <span class="row-item__name"
            >{{ rowName(item) }}<span v-if="item.quantity > 1" class="row-item__qty"> ×{{ item.quantity }}</span></span>
          <span v-if="item.equippedSlot" class="row-item__equipped">✓ Equipped</span>
          <span class="row-item__weight">{{ formatWeight(rowWeight(item)) }} lb</span>
          <button
            class="row-item__remove"
            type="button"
            :aria-label="`Remove ${item.name}`"
            @click.stop="$emit('remove', item.instanceId)"
            @dragstart.prevent.stop
          >×</button>
        </li>
      </TransitionGroup>
    </div>

    <!-- Pack data actions — secondary affordances, anchored to the pack they affect. -->
    <footer class="pack-footer">
      <div class="pack-actions">
        <button class="pack-action" type="button" @click="$emit('print')">
          <span class="pack-action__icon" aria-hidden="true">🖨️</span>
          <span class="pack-action__label">Print list</span>
        </button>
        <button class="pack-action" type="button" @click="$emit('backup')">
          <span class="pack-action__icon" aria-hidden="true">💾</span>
          <span class="pack-action__label">Back up</span>
        </button>
        <button class="pack-action" type="button" @click="$emit('restore')">
          <span class="pack-action__icon" aria-hidden="true">↩️</span>
          <span class="pack-action__label">Restore</span>
        </button>
        <button
          class="pack-action pack-action--destructive"
          type="button"
          :disabled="!items.length"
          @click="$emit('empty')"
        >
          <span class="pack-action__icon" aria-hidden="true">🗑️</span>
          <span class="pack-action__label">Empty pack</span>
        </button>
      </div>
    </footer>
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
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { ParButton, ParSelect } from '@/parchment';
import ItemTile from './ItemTile.vue';
import EquipDoll from './EquipDoll.vue';
import { dragPayload, clearDrag } from '../composables/drag-state.js';
import { COLS, offsetToCell, contentRows, packItems } from '../utils/grid-layout.mjs';
import { itemType, TYPE_COLORS, typeColor, effectiveWeight, cleanName } from '../utils/tile-presentation.mjs';

const GAP = 6; // px, matches --gap

const props = defineProps({
  items: { type: Array, default: () => [] },
  title: { type: String, default: 'Your pack' },
  strength: { type: Number, default: 10 },
  selectedId: { type: String, default: null },
  equippedBySlot: { type: Object, default: () => ({}) },
  attunedCount: { type: Number, default: 0 },
  maxAttunement: { type: Number, default: 3 },
  view: { type: String, default: 'grid' }, // grid | list | equip (owned by the root)
});

const emit = defineEmits([
  'place', 'move', 'remove', 'nudge', 'autopack', 'select', 'reorder', 'unequip', 'equip', 'update:view',
  'print', 'backup', 'restore', 'empty',
]);

const setView = (v) => emit('update:view', v);

// Sort the arrangement (re-packs) and filter the visible tiles by type.
const sortOptions = [
  { value: 'type', label: 'Type' },
  { value: 'name', label: 'Name' },
  { value: 'weight-desc', label: 'Weight (heavy first)' },
  { value: 'weight-asc', label: 'Weight (light first)' },
];
const types = ['weapon', 'armor', 'consumable', 'tools', 'gear', 'magic'].map((key) => ({
  key,
  label: TYPE_COLORS[key].label,
  color: TYPE_COLORS[key],
}));

const sortBy = ref('type');
const typeFilter = ref('');

// "Equipped" is a cross-cutting filter (any item worn on the doll), alongside the
// type pills. Only offered when something is actually equipped.
const hasEquipped = computed(() => props.items.some((i) => i.equippedSlot));
const matchesFilter = (i) => {
  if (!typeFilter.value) return true;
  if (typeFilter.value === 'equipped') return !!i.equippedSlot;
  return itemType(i) === typeFilter.value;
};

// Items after the active filter (array order — used by the list view).
const listItems = computed(() =>
  typeFilter.value ? props.items.filter(matchesFilter) : props.items,
);

// Grid view: when filtered, the hidden items are treated as absent and the
// visible subset is tidied into a fresh top-left layout for the view only (the
// stored positions are untouched, so clearing the filter restores them).
const gridItems = computed(() =>
  typeFilter.value ? packItems(listItems.value, COLS, sortBy.value) : props.items,
);
const activeTypeLabel = computed(() =>
  typeFilter.value === 'equipped'
    ? 'equipped'
    : (types.find((t) => t.key === typeFilter.value)?.label || '').toLowerCase(),
);

function onSort(v) {
  sortBy.value = v;
  emit('autopack', v); // re-pack in the new order
}
function pillStyle(t) {
  return typeFilter.value === t.key
    ? { background: t.color.bg, color: t.color.text, borderColor: t.color.text }
    : {};
}

// --- list rows -----------------------------------------------------------
const rowName = (it) => cleanName(it.name);
const rowColor = (it) => typeColor(it);
const rowWeight = (it) => effectiveWeight(it);
function formatWeight(w) {
  const n = Number(w) || 0;
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

const listDragId = ref(null);
const dragOverId = ref(null);

function onRowDragStart(item, e) {
  listDragId.value = item.instanceId;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', item.name);
}
function onRowDrop(target) {
  if (listDragId.value && listDragId.value !== target.instanceId) {
    emit('reorder', { movedId: listDragId.value, targetId: target.instanceId });
  }
  listDragId.value = null;
  dragOverId.value = null;
}
function onRowDragEnd() {
  listDragId.value = null;
  dragOverId.value = null;
}
function onRowKeydown(item, e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    emit('select', item.instanceId);
  } else if (e.key === 'Delete' || e.key === 'Backspace') {
    e.preventDefault();
    emit('remove', item.instanceId);
  }
}

const gridEl = ref(null);
const isOver = ref(false);
const cellPx = ref(60); // measured square cell side
const pitch = computed(() => cellPx.value + GAP);

// Enough rows to drop below the lowest item (and a comfortable minimum).
const rows = computed(() => Math.max(8, contentRows(gridItems.value) + 3));

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
  if (!w) return; // element not laid out yet (e.g. still hidden) — keep last good value
  cellPx.value = Math.max(28, (w - (COLS - 1) * GAP) / COLS);
}
// (Re)bind measurement to the live grid element. The grid-drop is v-if'd on the
// grid view, so it's created/destroyed as the user switches views — measure the
// fresh element and re-point the observer at it each time it appears, otherwise
// the cell-size measurement (and the background lattice) stays at its stale
// default and the tiles no longer line up with the grid.
function attachGrid() {
  ro?.disconnect();
  ro = null;
  if (!gridEl.value) return;
  measure();
  ro = new ResizeObserver(measure);
  ro.observe(gridEl.value);
}
onMounted(attachGrid);
onBeforeUnmount(() => ro?.disconnect());
watch(
  () => props.view,
  (v) => {
    if (v === 'grid') nextTick(attachGrid);
  },
);

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
  position: relative; /* containing block so an absolute empty-state can't escape */
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
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.grid-panel__titlebar {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.grid-panel__title {
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-action-hover, #2a4d70);
}
.grid-panel__attune {
  padding: 0.2rem 0.7rem;
  background: var(--par-color-callout-bg, #f3ebda);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: 999px;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  white-space: nowrap;
}
.grid-panel__attune--over {
  border-color: var(--par-color-destructive, #a03333);
  color: var(--par-color-destructive, #a03333);
}

.grid-panel__controls {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}
.grid-panel__sort {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.grid-panel__sort-label {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-action-hover, #2a4d70);
}
.grid-panel__sort :deep(.par-select-wrapper) {
  min-width: 16rem;
}

.grid-panel__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: 999px;
  background: var(--par-color-surface, #fbf7f0);
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.2rem;
  color: var(--par-color-text-secondary, #555);
  cursor: pointer;
  transition: background 0.12s ease, border-color 0.12s ease;
}
.pill:hover {
  border-color: var(--par-color-border-deep, #b8a685);
}
.pill:focus-visible {
  outline: 2px solid var(--color-action-rest, #365a85);
  outline-offset: 1px;
}
.pill--active {
  font-weight: 600;
  background: var(--par-color-callout-bg, #f3ebda);
  border-color: var(--par-color-border-deep, #b8a685);
}
.pill__dot {
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
  border: 0.5px solid rgba(122, 50, 30, 0.2);
}
.pill__check {
  font-weight: 700;
  color: var(--color-action-rest, #365a85);
}
/* Equipped is a different dimension from type — give it the lapis action color. */
.pill--equipped.pill--active {
  background: var(--color-action-rest, #365a85);
  border-color: var(--color-action-rest, #365a85);
  color: var(--color-action-text, #fbf7f0);
}
.pill--equipped.pill--active .pill__check {
  color: var(--color-action-text, #fbf7f0);
}

/* Grid / List view toggle. */
.view-toggle {
  display: inline-flex;
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
  overflow: hidden;
}
.view-toggle__btn {
  padding: 0.45rem 1.1rem;
  border: none;
  background: var(--par-color-surface, #fbf7f0);
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.3rem;
  color: var(--par-color-text-secondary, #555);
  cursor: pointer;
}
.view-toggle__btn + .view-toggle__btn {
  border-left: 0.5px solid var(--par-color-border-strong, #c9b99a);
}
.view-toggle__btn--active {
  background: var(--color-action-rest, #365a85);
  color: var(--color-action-text, #fbf7f0);
  font-weight: 600;
}

/* List view. */
.list__items {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.row-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  border-bottom: 0.5px solid var(--par-color-divider, #e2dccd);
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  cursor: grab;
  transition: background 0.12s ease;
}
.row-item:hover {
  background: var(--par-color-callout-bg-light, #f8f2e3);
}
.row-item:focus-visible {
  outline: 2px solid var(--color-action-rest, #365a85);
  outline-offset: -2px;
}
.row-item--selected {
  background: var(--par-color-callout-bg, #f3ebda);
  box-shadow: inset 3px 0 0 var(--color-action-rest, #365a85);
}
.row-item--dragging {
  opacity: 0.45;
}
.row-item--drop {
  box-shadow: inset 0 2px 0 var(--color-action-rest, #365a85);
}
.row-item__handle {
  flex: none;
  color: var(--par-color-text-muted, #6b6b6b);
  font-size: 1.4rem;
}
.row-item__swatch {
  flex: none;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 4px;
  border: 0.5px solid rgba(122, 50, 30, 0.2);
}
.row-item__name {
  flex: 1;
  min-width: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--par-color-text, #222);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.row-item__qty {
  font-weight: 700;
  color: var(--color-action-hover, #2a4d70);
}
.row-item__equipped {
  flex: none;
  padding: 0.15rem 0.55rem;
  background: var(--color-action-rest, #365a85);
  color: var(--color-action-text, #fbf7f0);
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 999px;
  white-space: nowrap;
}
.row-item__weight {
  flex: none;
  font-size: 1.35rem;
  color: var(--par-color-text-secondary, #555);
}
.row-item__remove {
  flex: none;
  width: 2rem;
  height: 2rem;
  border: none;
  background: transparent;
  color: var(--par-color-text-muted, #6b6b6b);
  font-size: 1.7rem;
  line-height: 1;
  cursor: pointer;
  border-radius: 50%;
  opacity: 0;
}
.row-item:hover .row-item__remove,
.row-item:focus-within .row-item__remove {
  opacity: 0.7;
}
.row-item__remove:hover {
  opacity: 1;
  background: rgba(160, 51, 51, 0.14);
  color: var(--par-color-destructive, #a03333);
}

/* Higher specificity than `.grid-empty` so the list empty-state stays in flow
   (the base rule is absolute + inset:0 for the grid overlay, declared later). */
.grid-empty.grid-empty--list {
  position: static;
  min-height: 16rem;
}

.row-move,
.row-enter-active,
.row-leave-active {
  transition: transform 0.28s ease, opacity 0.2s ease;
}
.row-enter-from,
.row-leave-to {
  opacity: 0;
  transform: translateX(-1rem);
}
.row-leave-active {
  position: absolute;
  width: 100%;
}
@media (prefers-reduced-motion: reduce) {
  .row-move,
  .row-enter-active,
  .row-leave-active {
    transition: none;
  }
}

.grid-drop {
  position: relative;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(var(--cols), 1fr);
  grid-auto-rows: var(--cell);
  gap: var(--gap);
  border-radius: var(--par-radius-md, 4px);
  /* Faint cell lattice so the droppable grid is visible. Shifted by half a gap so
     the lines fall in the gap centers — framing each tile symmetrically rather
     than leaving the gap trailing to one side (tiles read as centered, not top-left). */
  background-image:
    linear-gradient(to right, rgba(122, 50, 30, 0.07) 0 1px, transparent 1px),
    linear-gradient(to bottom, rgba(122, 50, 30, 0.07) 0 1px, transparent 1px);
  background-size: var(--pitch) var(--pitch);
  background-position: calc(var(--gap) / -2) calc(var(--gap) / -2);
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

/* Pack data actions: quiet, footer-placed secondary affordances. */
.pack-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.2rem;
  padding-top: 1rem;
  border-top: 0.5px solid rgba(201, 185, 154, 0.5);
}
.pack-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.5rem;
  align-items: center;
}
.pack-action {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 3.2rem;
  padding: 0.4rem 0.75rem;
  background: transparent;
  border: 0.5px solid transparent;
  border-radius: var(--par-radius-md, 4px);
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.3rem;
  color: var(--par-color-text-muted, #6b6b6b);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.pack-action:hover {
  background: rgba(243, 235, 218, 0.5);
  color: var(--color-action-active, #1f3a5c);
  border-color: rgba(201, 185, 154, 0.4);
}
.pack-action:focus-visible {
  outline: 2px solid var(--color-action-rest, #365a85);
  outline-offset: 1px;
}
.pack-action__icon {
  font-size: 1.4rem;
  line-height: 1;
}
.pack-action__label {
  font-weight: 500;
}

/* Empty pack — irreversible, so it reads in destructive red and sits set apart. */
.pack-action--destructive {
  margin-left: 0.4rem;
  color: var(--par-color-destructive, #a03333);
}
.pack-action--destructive:hover {
  background: rgba(160, 51, 51, 0.06);
  color: #862828;
  border-color: rgba(160, 51, 51, 0.3);
}
.pack-action:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.pack-action:disabled:hover {
  background: transparent;
  color: var(--par-color-destructive, #a03333);
  border-color: transparent;
}

@media (max-width: 500px) {
  .pack-action__label {
    display: none;
  }
  .pack-action {
    padding: 0.55rem 0.7rem;
  }
}
</style>
