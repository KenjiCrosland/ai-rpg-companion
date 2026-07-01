<template>
  <!-- Always in the DOM; hidden on screen, revealed by the print stylesheet. -->
  <section class="print-list" aria-hidden="true">
    <h1 class="print-list__title">Backpack inventory</h1>
    <p class="print-list__meta">
      Strength {{ strength }} · carrying {{ formatWeight(status.total) }} / {{ status.capacity }} lb
      <template v-if="status.tier !== 'ok'"> · {{ tierLabel }}</template>
    </p>
    <p v-if="coinLine" class="print-list__meta">Coins: {{ coinLine }} ({{ coinGold }} gp value)</p>

    <div v-for="group in groups" :key="group.category" class="print-list__group">
      <h2 class="print-list__group-title">{{ group.category }}</h2>
      <ul class="print-list__items">
        <li v-for="item in group.items" :key="item.instanceId">
          <span>{{ item.name }}</span>
          <span class="print-list__dots"></span>
          <span>{{ formatWeight(item.weight) }} lb</span>
        </li>
      </ul>
    </div>

    <p v-if="!items.length" class="print-list__empty">No items packed.</p>
    <p class="print-list__attrib">Game content uses SRD 5.1, licensed under CC-BY-4.0.</p>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  items: { type: Array, default: () => [] },
  strength: { type: Number, default: 10 },
  status: { type: Object, required: true },
  coins: { type: Object, default: () => ({ pp: 0, gp: 0, ep: 0, sp: 0, cp: 0 }) },
  coinGold: { type: Number, default: 0 },
});

const coinLine = computed(() =>
  ['pp', 'gp', 'ep', 'sp', 'cp']
    .filter((k) => Number(props.coins?.[k]) > 0)
    .map((k) => `${props.coins[k]} ${k}`)
    .join(', '),
);

const TIER_LABELS = {
  encumbered: 'Encumbered',
  heavily: 'Heavily encumbered',
  over: 'Over capacity',
};
const tierLabel = computed(() => TIER_LABELS[props.status.tier] || '');

const CATEGORY_ORDER = ['Weapon', 'Armor', 'Adventuring Gear', 'Tools', 'Magic Item'];
const groups = computed(() => {
  const known = new Set(CATEGORY_ORDER);
  const ordered = CATEGORY_ORDER.map((category) => ({
    category,
    items: props.items
      .filter((i) => i.category === category)
      .sort((a, b) => a.name.localeCompare(b.name)),
  }));
  // Catch-all so an unexpected category can never be silently dropped from a printout.
  const other = props.items
    .filter((i) => !known.has(i.category))
    .sort((a, b) => a.name.localeCompare(b.name));
  if (other.length) ordered.push({ category: 'Other', items: other });
  return ordered.filter((g) => g.items.length);
});

function formatWeight(w) {
  const n = Number(w) || 0;
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}
</script>

<style scoped>
.print-list {
  display: none;
}

@media print {
  .print-list {
    display: block;
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
    color: #000;
  }

  .print-list__title {
    font-size: 22pt;
    margin: 0 0 0.2rem;
  }

  .print-list__meta {
    margin: 0 0 1.4rem;
    font-size: 11pt;
    color: #333;
  }

  .print-list__group {
    margin-bottom: 1.2rem;
    break-inside: avoid;
  }

  .print-list__group-title {
    font-size: 13pt;
    border-bottom: 1px solid #000;
    margin: 0 0 0.4rem;
    padding-bottom: 0.2rem;
  }

  .print-list__items {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .print-list__items li {
    display: flex;
    align-items: baseline;
    gap: 0.4rem;
    font-size: 11pt;
    padding: 0.15rem 0;
  }

  .print-list__dots {
    flex: 1;
    border-bottom: 1px dotted #999;
    transform: translateY(-0.25rem);
  }

  .print-list__attrib {
    margin-top: 2rem;
    font-size: 8pt;
    color: #555;
  }
}
</style>
