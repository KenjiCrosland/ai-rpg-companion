<template>
  <section class="capacity" :class="[`capacity--${status.tier}`, { 'capacity--embedded': embedded }]" aria-live="polite">
    <div class="capacity__row">
      <span class="capacity__label">Carrying</span>
      <span class="capacity__value">
        <strong>{{ formatWeight(status.total) }}</strong> / {{ status.capacity }} lb
        <span v-if="packDropped" class="capacity__dropped-tag">🎒 pack dropped</span>
      </span>
    </div>

    <div
      class="capacity__bar"
      role="progressbar"
      :aria-valuenow="Math.round(status.total)"
      aria-valuemin="0"
      :aria-valuemax="status.capacity"
    >
      <div class="capacity__fill" :style="{ width: fillWidth }"></div>
      <!-- threshold ticks: encumbered = Str×5 (⅓), heavily = Str×10 (⅔) -->
      <span class="capacity__tick" style="left: 33.33%" title="Encumbered"></span>
      <span class="capacity__tick" style="left: 66.66%" title="Heavily encumbered"></span>
    </div>

    <div class="capacity__footer">
      <span class="capacity__status">
        <template v-if="status.consequences">{{ status.consequences }}</template>
        <template v-else>Unencumbered, carry on.</template>
      </span>
      <div class="capacity__toggles">
        <!-- Drop pack: a situational combat toggle. The state stays legible via the
             "🎒 pack dropped" tag by the weight; the numbers live in the tooltip. -->
        <label
          v-if="hasPack"
          class="capacity__toggle"
          :title="packDropped
            ? `Pack is set down — ${formatWeight(packWeight)} lb on the ground, fighting at ${formatWeight(equippedWeight)} lb of worn gear.`
            : `Set the pack down to fight in worn gear only — drop ${formatWeight(packWeight)} lb to ${formatWeight(equippedWeight)} lb.`"
        >
          <input type="checkbox" :checked="packDropped" @change="$emit('toggle-drop', $event.target.checked)" />
          <span>Drop pack</span>
        </label>
        <label class="capacity__toggle" title="Count coin weight toward your carry total.">
          <input
            type="checkbox"
            :checked="countCoinWeight"
            @change="$emit('toggle', $event.target.checked)"
          />
          <span>Include coin weight</span>
        </label>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * The real limit made legible. Bar fill + tier color follow the same load
 * severity gradient as the tiles (easy→deadly), with overflow going to the
 * destructive-red token. Consequences spell out the 5e variant encumbrance rules.
 *
 * Owns the "include coin weight" toggle — it's a carrying-calculation setting, so
 * it lives here next to the encumbrance read, not on the coin purse.
 */
import { computed } from 'vue';

const props = defineProps({
  status: { type: Object, required: true },
  countCoinWeight: { type: Boolean, default: true },
  packDropped: { type: Boolean, default: false },
  packWeight: { type: Number, default: 0 },
  equippedWeight: { type: Number, default: 0 },
  hasPack: { type: Boolean, default: false },
  // Rendered inside the pack card (mobile) instead of as its own card — drop the chrome.
  embedded: { type: Boolean, default: false },
});

defineEmits(['toggle', 'toggle-drop']);

const fillWidth = computed(() => `${Math.min(1, props.status.ratio || 0) * 100}%`);

function formatWeight(w) {
  const n = Number(w) || 0;
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}
</script>

<style scoped>
.capacity {
  --tier-color: #4d6a3c; /* ok = easy green */
  background: var(--par-color-surface-card, #fefbf4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  padding: 1.2rem 1.6rem 1.3rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
}
/* Folded into the pack card footer — no card chrome (the footer supplies the divider). */
.capacity--embedded {
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
}

.capacity--encumbered {
  --tier-color: #87691d;
}
.capacity--heavily {
  --tier-color: #9b5730;
}
.capacity--over {
  --tier-color: var(--par-color-destructive, #a03333);
}

.capacity__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.7rem;
}

.capacity__label {
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-action-hover, #2a4d70);
}

.capacity__value {
  font-size: 1.6rem;
  color: var(--par-color-text, #222);
}
.capacity__value strong {
  font-weight: 600;
  color: var(--tier-color);
}
.capacity__dropped-tag {
  margin-left: 0.6rem;
  padding: 0.1rem 0.6rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--color-action-hover, #2a4d70);
  background: var(--par-color-callout-bg, #f3ebda);
  border-radius: 999px;
  white-space: nowrap;
}


.capacity__bar {
  position: relative;
  height: 1rem;
  background: rgba(42, 77, 112, 0.1);
  border-radius: 999px;
  overflow: hidden;
}

.capacity__fill {
  height: 100%;
  background: var(--tier-color);
  border-radius: 999px;
  transition: width 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.3s ease;
}

.capacity__tick {
  position: absolute;
  top: 0;
  width: 1px;
  height: 100%;
  background: rgba(0, 0, 0, 0.18);
  transform: translateX(-0.5px);
}

.capacity__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.6rem 1.2rem;
  margin-top: 0.7rem;
}
.capacity__toggles {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1.4rem;
}

.capacity__status {
  font-size: 1.35rem;
  line-height: 1.5;
  color: var(--tier-color);
}
.capacity--ok .capacity__status {
  color: var(--par-color-text-secondary, #555);
  font-style: italic;
}

.capacity__toggle {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  color: var(--par-color-text-muted, #6b6b6b);
  cursor: pointer;
}
.capacity__toggle input {
  width: 1.6rem;
  height: 1.6rem;
  accent-color: var(--color-action-rest, #365a85);
  cursor: pointer;
}

@media (prefers-reduced-motion: reduce) {
  .capacity__fill {
    transition: none;
  }
}
</style>
