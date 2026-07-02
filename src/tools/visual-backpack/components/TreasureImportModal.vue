<template>
  <ParModal
    :opened="opened"
    title="Paste loot list"
    :close-on-backdrop="false"
    @cancel="$emit('cancel')"
  >
    <p class="ti__intro">
      Paste a loot list — coins and items, one per line. Loot-generator dumps
      work as-is. We'll sort coins into your purse and drop items into the pack.
    </p>

    <ParTextarea
      v-model="text"
      class="ti__input"
      :rows="8"
      placeholder="374 Silver&#10;74 Gold&#10;1 set of bagpipes (30 gp)&#10;3 black jasper worth 50 gp each&#10;Potion of Healing"
      aria-label="Treasure block"
    />

    <div v-if="text.trim()" class="ti__preview">
      <h4 class="ti__preview-title">Preview — uncheck anything you don't want</h4>

      <p v-if="coinChips.length" class="ti__coins">
        <span class="ti__coins-label">Coins</span>
        <span v-for="c in coinChips" :key="c.denom" class="ti__coin-chip">+{{ c.n }} {{ c.denom }}</span>
      </p>

      <ul v-if="preview.items.length" class="ti__items">
        <li
          v-for="it in preview.items"
          :key="it.id"
          class="ti__item"
          :class="{ 'ti__item--off': excluded.has(it.id) }"
        >
          <input
            class="ti__check"
            type="checkbox"
            :checked="!excluded.has(it.id)"
            :aria-label="`Include ${it.name}`"
            @change="toggle(it.id)"
          />
          <span class="ti__item-qty">{{ it.quantity }}×</span>
          <span class="ti__item-name">{{ it.name }}</span>
          <span class="ti__item-tag" :class="tagClass(it)">{{ tagLabel(it) }}</span>
          <span v-if="it.valueGp > 0" class="ti__item-value">{{ formatGp(it.valueGp) }} gp ea.</span>
        </li>
      </ul>

      <p v-if="!coinChips.length && !preview.items.length" class="ti__empty">
        Nothing recognized yet.
      </p>

      <div v-if="preview.unrecognized && preview.unrecognized.length" class="ti__skipped">
        <h4 class="ti__skipped-title">Couldn't read these — add them by hand</h4>
        <ul class="ti__skipped-list">
          <li v-for="(l, i) in preview.unrecognized" :key="i">{{ l }}</li>
        </ul>
      </div>
    </div>

    <template #footer>
      <ParButton variant="secondary" @click="$emit('cancel')">Cancel</ParButton>
      <ParButton variant="primary" :disabled="!hasAnything" @click="confirm">
        Add treasure
      </ParButton>
    </template>
  </ParModal>
</template>

<script setup>
/**
 * Paste-a-hoard importer. The textarea drives a live preview (pure parse — commits
 * nothing) so the user sees exactly which lines become coins, matched SRD items,
 * Treasure valuables, or plain custom items before confirming.
 */
import { ref, reactive, computed, watch } from 'vue';
import { ParModal, ParButton, ParTextarea } from '@/parchment';

const props = defineProps({
  opened: { type: Boolean, default: false },
  // (text) => { coins, items, ... } — the pure parser, injected by the parent.
  parse: { type: Function, required: true },
});

const emit = defineEmits(['cancel', 'confirm']);

const text = ref('');
// Item ids the user has unchecked (excluded from the import). Everything is
// included by default; this only tracks the opt-outs.
const excluded = reactive(new Set());

// Reset the field + selections each time the modal opens fresh.
watch(
  () => props.opened,
  (open) => {
    if (open) {
      text.value = '';
      excluded.clear();
    }
  },
);

const preview = computed(() =>
  text.value.trim() ? props.parse(text.value) : { coins: {}, items: [], unrecognized: [] },
);

const toggle = (id) => {
  if (excluded.has(id)) excluded.delete(id);
  else excluded.add(id);
};

const includedItems = computed(() => preview.value.items.filter((it) => !excluded.has(it.id)));

const coinChips = computed(() =>
  ['pp', 'gp', 'ep', 'sp', 'cp']
    .map((denom) => ({ denom, n: Number(preview.value.coins?.[denom]) || 0 }))
    .filter((c) => c.n > 0),
);

const hasAnything = computed(() => coinChips.value.length > 0 || includedItems.value.length > 0);

function tagLabel(it) {
  if (it.matched) return 'matched';
  return it.category === 'Treasure' ? 'treasure' : 'custom';
}
function tagClass(it) {
  if (it.matched) return 'ti__item-tag--matched';
  return it.category === 'Treasure' ? 'ti__item-tag--treasure' : 'ti__item-tag--custom';
}
function formatGp(v) {
  const n = Number(v) || 0;
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}

function confirm() {
  if (!hasAnything.value) return;
  // Only the checked items (plus coins) get imported.
  emit('confirm', { coins: preview.value.coins, items: includedItems.value });
}
</script>

<style scoped>
.ti__intro {
  margin: 0 0 1rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.3rem;
  font-style: italic;
  line-height: 1.45;
  color: var(--par-color-text-muted, #6b6b6b);
}
.ti__input {
  width: 100%;
  font-family: var(--par-font-mono, ui-monospace, 'SF Mono', Menlo, monospace);
}
.ti__preview {
  margin-top: 1.4rem;
  padding-top: 1.2rem;
  border-top: 0.5px solid var(--par-color-border-strong, #c9b99a);
}
.ti__preview-title {
  margin: 0 0 0.7rem;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-action-hover, #2a4d70);
}
.ti__coins {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 1rem;
}
.ti__coins-label {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--par-color-text-secondary, #555);
  margin-right: 0.2rem;
}
.ti__coin-chip {
  padding: 0.15rem 0.7rem;
  border-radius: 999px;
  background: var(--par-color-callout-bg, #f3ebda);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-action-hover, #2a4d70);
}
.ti__items {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 24rem;
  overflow-y: auto;
}
.ti__item {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  padding: 0.35rem 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.35rem;
  border-bottom: 0.5px solid var(--par-color-border, #e8e2d4);
}
.ti__check {
  flex: none;
  width: 1.6rem;
  height: 1.6rem;
  accent-color: var(--color-action-rest, #365a85);
  cursor: pointer;
}
.ti__item--off {
  opacity: 0.45;
}
.ti__item--off .ti__item-name {
  text-decoration: line-through;
}
.ti__item-qty {
  flex: none;
  font-weight: 700;
  color: var(--par-color-text-secondary, #555);
  min-width: 3rem;
}
.ti__item-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ti__item-tag {
  flex: none;
  padding: 0.05rem 0.5rem;
  border-radius: 3px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.ti__item-tag--matched {
  background: #cbd9b6;
  color: #465533;
}
.ti__item-tag--treasure {
  background: #e6c34d;
  color: #5f4708;
}
.ti__item-tag--custom {
  background: #e7ddc7;
  color: #5c513a;
}
.ti__item-value {
  flex: none;
  font-size: 1.15rem;
  color: var(--par-color-text-muted, #6b6b6b);
}
.ti__empty {
  margin: 0;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}
.ti__skipped {
  margin-top: 1.2rem;
  padding: 0.8rem 1rem;
  border-left: 2px solid var(--par-color-destructive, #a03333);
  background: rgba(160, 51, 51, 0.06);
  border-radius: 0 var(--par-radius-sm, 3px) var(--par-radius-sm, 3px) 0;
}
.ti__skipped-title {
  margin: 0 0 0.4rem;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--par-color-destructive, #a03333);
}
.ti__skipped-list {
  margin: 0;
  padding-left: 1.6rem;
  font-size: 1.2rem;
  color: var(--par-color-text-secondary, #555);
}
</style>
