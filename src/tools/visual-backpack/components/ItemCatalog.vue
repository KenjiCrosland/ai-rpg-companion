<template>
  <section class="catalog parchment" aria-label="Item catalog">
    <!-- Bulk add: paste a whole haul (coins + items) — a peer to the catalog and packs. -->
    <button class="catalog__paste" type="button" @click="$emit('paste-treasure')">
      <span class="catalog__paste-icon" aria-hidden="true">📋</span>
      <span class="catalog__paste-text">
        <span class="catalog__paste-title">Paste a loot list</span>
        <span class="catalog__paste-sub">Coins &amp; items from a hoard or generator dump</span>
      </span>
    </button>

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
          <ParSelect v-model="typeFilter" :options="typeOptions" aria-label="Filter by type" />
        </div>
        <p class="catalog__hint" :class="{ 'catalog__hint--used': hintDismissed }">
          Click or drag an item to add it free. Click <strong>Buy</strong> to deduct
          its standard SRD price from your coin purse.
        </p>

    <div class="catalog__list" role="list">
      <p v-if="!groups.length" class="catalog__empty">No gear matches “{{ search }}”.</p>

      <div v-for="group in groups" :key="group.category" class="catalog__group">
        <h3 class="catalog__group-title">{{ group.category }}</h3>
        <button
          v-for="tpl in group.items"
          :key="tpl.id"
          class="row"
          :class="{ 'row--added': addedId === tpl.id }"
          type="button"
          role="listitem"
          draggable="true"
          :title="`Add ${tpl.name} to your pack`"
          @click="onRowAdd(tpl)"
          @dragstart="onDragStart(tpl, $event)"
          @dragend="onDragEnd"
        >
          <span class="row__swatch" :style="{ background: swatchColor(tpl) }" aria-hidden="true"></span>
          <span class="row__name">{{ tpl.name }}</span>
          <span v-if="tpl.source === 'custom'" class="row__badge">custom</span>
          <span class="row__meta"
            >{{ formatWeight(tpl.weight) }} lb<span v-if="tpl.cost" class="row__price"> · {{ formatCost(tpl.cost) }}</span></span>
          <!-- Priced items get a quiet, separate Buy target: click the row to add
               it free; click Buy to add it AND spend the coin. Priceless items
               (magic items, anything with no SRD cost) show neither price nor Buy. -->
          <span
            v-if="tpl.cost"
            class="row__buy"
            :class="{ 'row__buy--disabled': !affordable(tpl) }"
            role="button"
            :tabindex="affordable(tpl) ? 0 : -1"
            :aria-disabled="!affordable(tpl)"
            :aria-label="affordable(tpl) ? `Buy ${tpl.name} for ${formatCost(tpl.cost)}` : `Not enough coin for ${tpl.name}`"
            :title="affordable(tpl) ? `Buy for ${formatCost(tpl.cost)}` : 'Not enough coin'"
            @click.stop="onBuy(tpl)"
            @keydown.enter.stop.prevent="onBuy(tpl)"
            @keydown.space.stop.prevent="onBuy(tpl)"
            @dragstart.prevent.stop
          >Buy</span>
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

    <div class="custom" :class="{ 'custom--collapsed': !customOpen }">
      <button
        class="custom__toggle"
        type="button"
        :aria-expanded="customOpen"
        @click="customOpen = !customOpen"
      >
        <span>+ Add a custom item</span>
        <svg
          class="custom__caret"
          :class="{ 'custom__caret--open': customOpen }"
          width="13" height="13" viewBox="0 0 12 12" aria-hidden="true"
        ><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </button>
      <form class="custom__body" @submit.prevent="submitCustom">
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
import { typeColor, itemTypes, TYPE_COLORS } from '../utils/tile-presentation.mjs';
import { formatCost, canAfford } from '../utils/carry-capacity.mjs';
import { setDrag, clearDrag } from '../composables/drag-state.js';

const props = defineProps({
  catalog: { type: Array, default: () => [] },
  packs: { type: Array, default: () => [] },
  coins: { type: Object, default: () => ({ pp: 0, gp: 0, ep: 0, sp: 0, cp: 0 }) },
  mobile: { type: Boolean, default: false },
});

const emit = defineEmits(['add', 'add-pack', 'add-custom', 'remove-custom', 'buy', 'paste-treasure']);

/** Can the current purse afford one of this priced item? */
const affordable = (tpl) => canAfford(props.coins, tpl.cost, tpl.quantity || 1);
const onBuy = (tpl) => {
  if (affordable(tpl)) {
    emit('buy', tpl);
    confirmAdded(tpl.id);
    markInstructionsUsed();
  }
};

// D&D categories — used to group the catalog and to seed the custom-item form.
const categories = ['Weapon', 'Armor', 'Adventuring Gear', 'Consumable', 'Tools', 'Magic Item', 'Misc'];

// Filtering uses the same TYPE taxonomy the pack does (weapon / consumable / gear / …),
// via itemTypes() (PLURAL) so an item counts under every type it belongs to — a magic
// weapon shows under both Weapon and Magic Item, a potion under both Consumable and
// Magic Item. Only types actually present are offered.
const TYPE_ORDER = ['weapon', 'armor', 'consumable', 'tools', 'gear', 'misc', 'magic', 'treasure', 'currency'];
const typeOptions = computed(() => {
  const present = new Set(props.catalog.flatMap((t) => itemTypes(t)));
  return [
    { value: '', label: 'All types' },
    ...TYPE_ORDER.filter((t) => present.has(t)).map((t) => ({ value: t, label: TYPE_COLORS[t]?.label || t })),
  ];
});

const search = ref('');
const typeFilter = ref('');
const starterOpen = ref(!props.mobile); // collapsed on mobile to keep the gear list near the top
const gearOpen = ref(true);
// Mobile-only: the custom-item form is collapsed by default (desktop shows it always).
const customOpen = ref(false);

// The long "click or drag to add" hint is shown until the first add, then hidden on
// mobile to reclaim space (persisted). Desktop keeps it — room is not scarce there.
const INSTRUCTIONS_KEY = 'vb-catalog-instructions-shown';
const hintDismissed = ref(safeGet(INSTRUCTIONS_KEY) === 'true');
function safeGet(k) {
  try { return localStorage.getItem(k); } catch { return null; }
}
function markInstructionsUsed() {
  if (hintDismissed.value) return;
  hintDismissed.value = true;
  try { localStorage.setItem(INSTRUCTIONS_KEY, 'true'); } catch { /* storage blocked */ }
}
// Confirm the tap ON the row (a green "added" flash), so it's obvious which item
// landed — important on mobile where the pack itself isn't in view.
const addedId = ref(null);
let addedTimer = null;
function confirmAdded(id) {
  addedId.value = id;
  clearTimeout(addedTimer);
  addedTimer = setTimeout(() => {
    if (addedId.value === id) addedId.value = null;
  }, 850);
}
function onRowAdd(tpl) {
  emit('add', tpl);
  confirmAdded(tpl.id);
  markInstructionsUsed();
}

const form = reactive({ name: '', weight: '', category: 'Adventuring Gear' });

const groups = computed(() => {
  const q = search.value.trim().toLowerCase();
  return categories
    .map((category) => ({
      category,
      items: props.catalog
        .filter(
          (t) =>
            t.category === category &&
            (!q || t.name.toLowerCase().includes(q)) &&
            (!typeFilter.value || itemTypes(t).includes(typeFilter.value)),
        )
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

/* Bulk-add CTA — paste a whole haul; a peer to browsing the catalog / starter packs. */
.catalog__paste {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  width: 100%;
  margin-bottom: 1.4rem;
  padding: 0.9rem 1.1rem;
  border: 0.5px dashed var(--color-action-rest, #365a85);
  border-radius: var(--par-radius-md, 4px);
  background: var(--par-color-callout-bg-light, #f8f2e3);
  text-align: left;
  cursor: pointer;
  transition: background 0.12s ease;
}
.catalog__paste:hover {
  background: var(--par-color-callout-bg, #f3ebda);
}
.catalog__paste:focus-visible {
  outline: 2px solid var(--color-action-rest, #365a85);
  outline-offset: 2px;
}
.catalog__paste-icon {
  flex: none;
  font-size: 1.8rem;
}
.catalog__paste-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
}
.catalog__paste-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-action-hover, #2a4d70);
}
.catalog__paste-sub {
  font-size: 1.1rem;
  color: var(--par-color-text-muted, #6b6b6b);
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
.catalog__hint {
  margin: 0.8rem 0 0.4rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.25rem;
  font-style: italic;
  line-height: 1.45;
  color: var(--par-color-text-muted, #6b6b6b);
}
.catalog__hint strong {
  font-style: normal;
  font-weight: 600;
  color: var(--par-color-text-secondary, #555);
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
/* Green "added" flash confirming the tap landed on this item (mobile especially). */
.row--added {
  animation: row-added 0.85s ease-out;
}
@keyframes row-added {
  0% {
    background: rgba(90, 122, 74, 0.38);
    box-shadow: inset 3px 0 0 #5a7a4a;
  }
  100% {
    background: transparent;
    box-shadow: inset 3px 0 0 rgba(90, 122, 74, 0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .row--added {
    animation: none;
    background: rgba(90, 122, 74, 0.22);
  }
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

.row__meta {
  flex: none;
  font-size: 1.2rem;
  color: var(--par-color-text-secondary, #555);
  white-space: nowrap;
}
.row__price {
  color: var(--par-color-text-muted, #6b6b6b);
}

/* Buy: understated — the row's primary action is still "add", so Buy is a quiet
   muted-ink outline (no lapis, small corners), reading as "available if you want
   it", not a CTA. Still a real tap target. */
.row__buy {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 4.2rem;
  min-height: 2.6rem;
  padding: 0 0.8rem;
  border: 0.5px solid var(--par-color-border-strong, #cbb8a0);
  border-radius: var(--par-radius-sm, 3px);
  background: transparent;
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--par-color-text-secondary, #555);
  cursor: pointer;
  transition: background 0.12s ease, color 0.12s ease, border-color 0.12s ease;
}
.row__buy:hover {
  border-color: var(--par-color-text-secondary, #555);
  background: var(--par-color-callout-bg, #f3ebda);
  color: var(--par-color-text, #222);
}
.row__buy:focus-visible {
  outline: 2px solid var(--color-action-rest, #365a85);
  outline-offset: 2px;
}
.row__buy--disabled {
  border-color: var(--par-color-border, #e4d8c4);
  color: var(--par-color-text-muted, #9a9082);
  cursor: not-allowed;
}
.row__buy--disabled:hover {
  background: transparent;
  border-color: var(--par-color-border, #e4d8c4);
  color: var(--par-color-text-muted, #9a9082);
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

/* Desktop shows the form directly; the toggle is a mobile-only affordance. */
.custom__toggle {
  display: none;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.4rem 0;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
}
.custom__caret {
  transition: transform 0.18s ease;
}
.custom__caret--open {
  transform: rotate(180deg);
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

/* Mobile: compress the catalog so it stays browsable above the pack drawer. */
@media (max-width: 768px) {
  .row {
    padding: 0.35rem 0.5rem;
    gap: 0.5rem;
  }
  /* The long instructional hint is reclaimed after the first add. */
  .catalog__hint--used {
    display: none;
  }
  /* Custom-item form collapses behind a toggle to save vertical space. */
  .custom__toggle {
    display: flex;
  }
  .custom__title {
    display: none;
  }
  .custom--collapsed .custom__body {
    display: none;
  }
}
</style>
