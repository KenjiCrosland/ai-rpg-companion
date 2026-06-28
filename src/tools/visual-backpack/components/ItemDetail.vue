<template>
  <aside class="detail parchment" aria-label="Item details">
    <button
      class="detail__toggle"
      type="button"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span class="detail__toggle-label">{{ item ? labelText : 'Item details' }}</span>
      <svg
        class="detail__chevron"
        :class="{ 'detail__chevron--open': open }"
        width="13" height="13" viewBox="0 0 12 12" aria-hidden="true"
      ><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </button>

    <div v-show="open" class="detail__panel">
      <p v-if="!item" class="detail__empty">
        <span class="detail__empty-icon" aria-hidden="true">📜</span>
        <span>Click an item in your pack to see its details.</span>
      </p>

      <!-- VIEW MODE -->
      <div v-else-if="!editing" class="detail__body">
        <p class="detail__type">{{ typeLine }}</p>

        <div class="detail__qty">
          <span class="detail__qty-label">Quantity</span>
          <div class="qty">
            <button
              class="qty__btn"
              type="button"
              aria-label="Decrease quantity"
              :disabled="item.quantity <= 1"
              @click="emit('set-quantity', { id: item.instanceId, quantity: item.quantity - 1 })"
            >−</button>
            <span class="qty__value" :key="item.quantity">{{ item.quantity }}</span>
            <button
              class="qty__btn"
              type="button"
              aria-label="Increase quantity"
              @click="emit('set-quantity', { id: item.instanceId, quantity: item.quantity + 1 })"
            >+</button>
          </div>
          <span class="detail__weight">{{ weightText }}</span>
        </div>

        <div v-if="paragraphs.length" class="detail__desc">
          <p v-for="(para, i) in paragraphs" :key="i">{{ para }}</p>
        </div>
        <p v-else class="detail__nodesc">No description for this item.</p>

        <div class="detail__actions">
          <ParButton variant="primary-outline" size="small" @click="startEdit">Edit</ParButton>
          <ParButton variant="secondary" size="small" @click="emit('remove', item.instanceId)">Remove</ParButton>
        </div>
      </div>

      <!-- EDIT MODE -->
      <form v-else class="detail__body" @submit.prevent="save">
        <ParField label="Name">
          <ParInput v-model="form.name" />
        </ParField>
        <div class="detail__row">
          <ParField label="Weight (lb each)">
            <ParInput v-model="form.weight" type="number" />
          </ParField>
          <ParField label="Quantity">
            <ParInput v-model="form.quantity" type="number" />
          </ParField>
        </div>
        <ParField label="Category">
          <ParSelect v-model="form.category" :options="categories" />
        </ParField>
        <ParField label="Description">
          <ParTextarea v-model="form.description" :rows="6" />
        </ParField>
        <div class="detail__actions">
          <ParButton type="submit" variant="primary" size="small">Save changes</ParButton>
          <ParButton type="button" variant="secondary" size="small" @click="editing = false">Cancel</ParButton>
        </div>
      </form>
    </div>
  </aside>
</template>

<script setup>
/**
 * Collapsible item-detail panel that sits above the catalog's add-menus. It
 * auto-opens when a pack tile is clicked and shows the item's name, type/rarity,
 * weight, SRD description/mechanics, a quantity stepper, and an Edit mode. Emits
 * up to the composable; never mutates the item directly.
 */
import { computed, reactive, ref, watch } from 'vue';
import { ParButton, ParField, ParInput, ParSelect, ParTextarea } from '@/parchment';
import { effectiveWeight, cleanName } from '../utils/tile-presentation.mjs';

const props = defineProps({
  item: { type: Object, default: null },
  categories: { type: Array, default: () => [] },
});

const emit = defineEmits(['set-quantity', 'update', 'remove']);

const open = ref(false);
const editing = ref(false);
const form = reactive({ name: '', weight: 0, quantity: 1, category: '', description: '' });

// Selecting a tile opens the panel and drops out of edit mode.
watch(
  () => props.item?.instanceId,
  (id) => {
    if (id) open.value = true;
    editing.value = false;
  },
);

const labelText = computed(() => {
  if (!props.item) return '';
  const base = cleanName(props.item.name);
  return props.item.quantity > 1 ? `${base} ×${props.item.quantity}` : base;
});

const typeLine = computed(() => {
  if (!props.item) return '';
  const bits = [props.item.category];
  if (props.item.rarity) bits.push(props.item.rarity);
  return bits.join(' · ');
});

const paragraphs = computed(() =>
  (props.item?.description || '').split('\n\n').map((p) => p.trim()).filter(Boolean),
);

const weightText = computed(() => {
  if (!props.item) return '';
  const total = effectiveWeight(props.item);
  const each = Number(props.item.weight) || 0;
  const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(2));
  return props.item.quantity > 1 ? `${fmt(total)} lb (${fmt(each)} each)` : `${fmt(total)} lb`;
});

function startEdit() {
  const it = props.item;
  form.name = it.name;
  form.weight = it.weight;
  form.quantity = it.quantity;
  form.category = it.category;
  form.description = it.description || '';
  editing.value = true;
}

function save() {
  emit('update', {
    id: props.item.instanceId,
    patch: {
      name: form.name,
      weight: form.weight,
      quantity: form.quantity,
      category: form.category,
      description: form.description,
    },
  });
  editing.value = false;
}
</script>

<style scoped>
.detail {
  background: var(--par-color-surface-card, #fefbf4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  padding: 1.2rem 1.6rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
}

.detail__toggle {
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
.detail__toggle:focus-visible {
  outline: 2px solid var(--color-action-rest, #365a85);
  outline-offset: 2px;
}
.detail__toggle-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
}
.detail__chevron {
  flex: none;
  color: var(--color-action-hover, #2a4d70);
  transition: transform 0.18s ease;
}
.detail__chevron--open {
  transform: rotate(180deg);
}

.detail__panel {
  padding-top: 1rem;
}

.detail__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  margin: 0;
  padding: 1.6rem 1rem;
  text-align: center;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}
.detail__empty-icon {
  font-size: 2.6rem;
}

.detail__type {
  margin: 0 0 1.1rem;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--par-color-text-secondary, #555);
}

.detail__qty {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.7rem 0;
  border-top: 0.5px solid var(--par-color-divider, #e2dccd);
  border-bottom: 0.5px solid var(--par-color-divider, #e2dccd);
  margin-bottom: 1.1rem;
}
.detail__qty-label {
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-action-hover, #2a4d70);
}
.qty {
  display: inline-flex;
  align-items: stretch;
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
  overflow: hidden;
  background: #fff;
}
.qty__btn {
  width: 2.8rem;
  min-height: 3.2rem;
  border: none;
  background: transparent;
  color: var(--par-color-text-secondary, #555);
  font-size: 1.7rem;
  cursor: pointer;
}
.qty__btn:hover:not(:disabled) { background: rgba(0, 0, 0, 0.05); }
.qty__btn:disabled { color: var(--par-color-text-disabled, #ccc); cursor: not-allowed; }
.qty__value {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3.4rem;
  border-left: 0.5px solid var(--par-color-border, #e8e2d4);
  border-right: 0.5px solid var(--par-color-border, #e8e2d4);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--par-color-text, #222);
  animation: qty-flash 0.5s ease;
}

@keyframes qty-flash {
  0% { background: transparent; }
  30% { background: rgba(54, 90, 133, 0.2); }
  100% { background: transparent; }
}
@media (prefers-reduced-motion: reduce) {
  .qty__value { animation: none; }
}
.detail__weight {
  margin-left: auto;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--par-color-text, #222);
}

.detail__desc {
  font-size: 1.45rem;
  line-height: 1.6;
  color: var(--par-color-text, #222);
  max-height: 36vh;
  overflow-y: auto;
}
.detail__desc p { margin: 0 0 0.9rem; }
.detail__nodesc {
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}

.detail__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
}

.detail__actions {
  display: flex;
  gap: 0.7rem;
  margin-top: 1.4rem;
}

@media (prefers-reduced-motion: reduce) {
  .detail__chevron { transition: none; }
}
</style>
