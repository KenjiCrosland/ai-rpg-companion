<template>
  <section class="catalog parchment" aria-label="Item catalog">
    <div v-if="packs.length" class="catalog__section">
      <button
        class="catalog__head"
        type="button"
        :aria-expanded="starterOpen"
        @click="starterOpen = !starterOpen"
      >
        <span class="catalog__title">Starter packs</span>
        <svg
          class="catalog__chevron"
          :class="{ 'catalog__chevron--open': starterOpen }"
          width="13" height="13" viewBox="0 0 12 12" aria-hidden="true"
        ><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </button>
      <div v-show="starterOpen" class="catalog__panel">
        <p class="starter__hint">Drops the pack's contents in as individual items you can rearrange or drop.</p>
        <div class="starter__list">
        <button
          v-for="pack in packs"
          :key="pack.id"
          class="pack-btn"
          type="button"
          :title="`Add ${pack.name} (${pack.itemCount} items, ${pack.totalWeight} lb)`"
          @click="$emit('add-pack', pack.id)"
        >
          <span class="pack-btn__name">{{ pack.name }}</span>
          <span class="pack-btn__meta">{{ pack.itemCount }} items · {{ pack.totalWeight }} lb</span>
        </button>
        </div>
      </div>
    </div>

    <div class="catalog__section">
      <button
        class="catalog__head"
        type="button"
        :aria-expanded="gearOpen"
        @click="gearOpen = !gearOpen"
      >
        <span class="catalog__title">Gear catalog</span>
        <svg
          class="catalog__chevron"
          :class="{ 'catalog__chevron--open': gearOpen }"
          width="13" height="13" viewBox="0 0 12 12" aria-hidden="true"
        ><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </button>
      <div v-show="gearOpen" class="catalog__panel">
        <div class="catalog__filters">
      <ParInput v-model="search" placeholder="Search gear…" aria-label="Search gear" />
      <ParSelect v-model="categoryFilter" :options="categoryOptions" aria-label="Filter by category" />
    </div>

    <div class="catalog__list" role="list">
      <p v-if="!groups.length" class="catalog__empty">No gear matches “{{ search }}”.</p>

      <div v-for="group in groups" :key="group.category" class="catalog__group">
        <h3 class="catalog__group-title">{{ group.category }}</h3>
        <button
          v-for="tpl in group.items"
          :key="tpl.id"
          class="row"
          type="button"
          role="listitem"
          draggable="true"
          :title="`Add ${tpl.name} to your pack`"
          @click="$emit('add', tpl)"
          @dragstart="onDragStart(tpl, $event)"
          @dragend="onDragEnd"
        >
          <span class="row__swatch" :style="{ background: swatchColor(tpl) }" aria-hidden="true"></span>
          <span class="row__name">{{ tpl.name }}</span>
          <span v-if="tpl.source === 'custom'" class="row__badge">custom</span>
          <span class="row__weight">{{ formatWeight(tpl.weight) }} lb</span>
          <span
            v-if="tpl.source === 'custom'"
            class="row__remove"
            role="button"
            tabindex="0"
            :aria-label="`Delete custom item ${tpl.name}`"
            title="Delete custom item"
            @click.stop="$emit('remove-custom', tpl.id)"
            @keydown.enter.stop.prevent="$emit('remove-custom', tpl.id)"
            @dragstart.prevent.stop
          >×</span>
        </button>
      </div>
    </div>

    <form class="custom" @submit.prevent="submitCustom">
      <h3 class="custom__title">Add a custom item</h3>
      <ParField label="Name">
        <ParInput v-model="form.name" placeholder="Lantern of the deep…" />
      </ParField>
      <div class="custom__grid">
        <ParField label="Weight (lb)">
          <ParInput v-model="form.weight" type="number" placeholder="0" />
        </ParField>
        <ParField label="Category">
          <ParSelect v-model="form.category" :options="categories" />
        </ParField>
      </div>
        <ParButton type="submit" variant="primary" size="small" :full-width="true">+ Add custom item</ParButton>
      </form>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * The drag-source catalog: SRD gear + the user's custom items, grouped by
 * category, searchable. Rows are buttons (Enter/Space or tap adds — the
 * touch/keyboard path) and also native drag sources. The custom-item form covers
 * SRD gaps and homebrew.
 */
import { reactive, ref, computed } from 'vue';
import { ParInput, ParSelect, ParField, ParButton } from '@/parchment';
import { typeColor } from '../utils/tile-presentation.mjs';
import { setDrag, clearDrag } from '../composables/drag-state.js';

const props = defineProps({
  catalog: { type: Array, default: () => [] },
  packs: { type: Array, default: () => [] },
});

const emit = defineEmits(['add', 'add-pack', 'add-custom', 'remove-custom']);

const categories = ['Weapon', 'Armor', 'Adventuring Gear', 'Tools', 'Magic Item'];
const categoryOptions = [{ value: '', label: 'All categories' }, ...categories];

const search = ref('');
const categoryFilter = ref('');
const starterOpen = ref(true);
const gearOpen = ref(true);

const form = reactive({ name: '', weight: '', category: 'Adventuring Gear' });

const groups = computed(() => {
  const q = search.value.trim().toLowerCase();
  return categories
    .filter((cat) => !categoryFilter.value || categoryFilter.value === cat)
    .map((category) => ({
      category,
      items: props.catalog
        .filter((t) => t.category === category && (!q || t.name.toLowerCase().includes(q)))
        .sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .filter((g) => g.items.length);
});

function swatchColor(tpl) {
  return typeColor(tpl).bg;
}

function formatWeight(w) {
  const n = Number(w) || 0;
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function onDragStart(tpl, e) {
  setDrag({ kind: 'add', template: tpl });
  e.dataTransfer.effectAllowed = 'copy';
  e.dataTransfer.setData('text/plain', tpl.name);
}

function onDragEnd() {
  clearDrag();
}

function submitCustom() {
  if (!form.name.trim()) return;
  emit('add-custom', {
    name: form.name,
    weight: form.weight,
    category: form.category,
  });
  form.name = '';
  form.weight = '';
}
</script>

<style scoped>
.catalog {
  display: flex;
  flex-direction: column;
  background: var(--par-color-surface-card, #fefbf4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  padding: 1.6rem 1.6rem 1.8rem;
}

.catalog__title {
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-action-hover, #2a4d70);
}

/* Collapsible section heads. */
.catalog__section + .catalog__section {
  margin-top: 1.3rem;
  padding-top: 1.3rem;
  border-top: 0.5px solid var(--par-color-divider, #e2dccd);
}

.catalog__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 0.2rem 0;
  background: transparent;
  border: none;
  cursor: pointer;
}
.catalog__head:focus-visible {
  outline: 2px solid var(--color-action-rest, #365a85);
  outline-offset: 2px;
}

.catalog__chevron {
  flex: none;
  color: var(--color-action-hover, #2a4d70);
  transition: transform 0.18s ease;
}
.catalog__chevron--open {
  transform: rotate(180deg);
}

.catalog__panel {
  padding-top: 1rem;
}

@media (prefers-reduced-motion: reduce) {
  .catalog__chevron {
    transition: none;
  }
}

.starter__hint {
  margin: -0.6rem 0 1rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.25rem;
  font-style: italic;
  line-height: 1.45;
  color: var(--par-color-text-muted, #6b6b6b);
}

.starter__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 0.6rem;
}

.pack-btn {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.7rem 0.9rem;
  text-align: left;
  background: var(--par-color-callout-bg-light, #f8f2e3);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
  cursor: pointer;
  transition: background 0.12s ease, border-color 0.12s ease;
}
.pack-btn:hover {
  background: var(--par-color-callout-bg, #f3ebda);
  border-color: var(--par-color-border-deep, #b8a685);
}
.pack-btn:focus-visible {
  outline: 2px solid var(--color-action-rest, #365a85);
  outline-offset: 1px;
}

.pack-btn__name {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.45rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
}
.pack-btn__meta {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.15rem;
  color: var(--par-color-text-secondary, #555);
}

.catalog__filters {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.7rem;
  margin-bottom: 1.1rem;
}

.catalog__list {
  flex: 1;
  overflow-y: auto;
  max-height: 46rem;
  padding-right: 0.4rem;
}

.catalog__group {
  margin-bottom: 1.2rem;
}

.catalog__group-title {
  position: sticky;
  top: 0;
  margin: 0 0 0.4rem;
  padding: 0.2rem 0;
  background: var(--par-color-surface-card, #fefbf4);
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--par-color-title, #7a1f1f);
}

.catalog__empty {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}

.row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
  padding: 0.6rem 0.7rem;
  border: none;
  border-radius: var(--par-radius-sm, 3px);
  background: transparent;
  text-align: left;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.4rem;
  color: var(--par-color-text, #222);
  cursor: grab;
  transition: background 0.12s ease;
}

.row:hover {
  background: var(--par-color-callout-bg, #f3ebda);
}
.row:focus-visible {
  outline: 2px solid var(--color-action-rest, #365a85);
  outline-offset: -2px;
}

.row__swatch {
  flex: none;
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 3px;
  border: 0.5px solid rgba(122, 50, 30, 0.18);
}

.row__name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.row__badge {
  flex: none;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--par-color-text-muted, #6b6b6b);
}

.row__weight {
  flex: none;
  font-size: 1.2rem;
  color: var(--par-color-text-secondary, #555);
}

.row__remove {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  font-size: 1.5rem;
  color: var(--par-color-text-muted, #6b6b6b);
  cursor: pointer;
}
.row__remove:hover {
  background: rgba(160, 51, 51, 0.14);
  color: var(--par-color-destructive, #a03333);
}

.custom {
  margin-top: 1.2rem;
  padding-top: 1.4rem;
  border-top: 0.5px solid var(--par-color-divider, #e2dccd);
}

.custom__title {
  margin: 0 0 1rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
}

.custom__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
}

@media (max-width: 560px) {
  .custom__grid {
    grid-template-columns: 1fr;
  }
}
</style>
