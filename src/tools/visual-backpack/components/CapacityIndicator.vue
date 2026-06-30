<template>
  <section class="capacity" :class="`capacity--${status.tier}`" aria-live="polite">
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
      <label class="capacity__toggle">
        <input
          type="checkbox"
          :checked="countCoinWeight"
          @change="$emit('toggle', $event.target.checked)"
        />
        <span>Include coin weight</span>
      </label>
    </div>

    <div v-if="hasPack" class="capacity__drop" :class="{ 'capacity__drop--active': packDropped }">
      <ParButton
        size="small"
        :variant="packDropped ? 'primary' : 'primary-outline'"
        @click="$emit('toggle-drop', !packDropped)"
      >{{ packDropped ? 'Pick up pack' : 'Drop pack' }}</ParButton>
      <span class="capacity__drop-note">
        <template v-if="packDropped">
          <strong>{{ formatWeight(packWeight) }} lb</strong> on the ground, counting worn gear only.
        </template>
        <template v-else>
          Set down <strong>{{ formatWeight(packWeight) }} lb</strong> to fight at
          <strong>{{ formatWeight(equippedWeight) }} lb</strong> of worn gear.
        </template>
      </span>
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
import { ParButton } from '@/parchment';

const props = defineProps({
  status: { type: Object, required: true },
  countCoinWeight: { type: Boolean, default: true },
  packDropped: { type: Boolean, default: false },
  packWeight: { type: Number, default: 0 },
  equippedWeight: { type: Number, default: 0 },
  hasPack: { type: Boolean, default: false },
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

/* Drop-pack control: the tactical move made one tap. */
.capacity__drop {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 0.5px solid var(--par-color-divider, #e2dccd);
}
.capacity__drop-note {
  font-size: 1.25rem;
  line-height: 1.4;
  color: var(--par-color-text-secondary, #555);
}
.capacity__drop-note strong {
  font-weight: 600;
  color: var(--par-color-text, #222);
}
.capacity__drop--active .capacity__drop-note strong {
  color: var(--color-action-hover, #2a4d70);
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
  gap: 1.2rem;
  margin-top: 0.7rem;
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
