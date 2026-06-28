<template>
  <section class="purse parchment" aria-label="Coin purse">
    <header class="purse__head">
      <h2 class="purse__title">Coin purse</h2>
    </header>

    <div class="purse__body">
      <div class="purse__coins">
        <div
          v-for="denom in denoms"
          :key="denom.key"
          class="coin"
          :style="{ '--metal': denom.metal, '--metal-deep': denom.deep }"
        >
          <span class="coin__label">{{ denom.key }}</span>
          <!-- One compact field: −[ value ]+ -->
          <div class="stepper">
            <button
              class="stepper__btn"
              type="button"
              :aria-label="`Remove one ${denom.key}`"
              :disabled="(coins[denom.key] || 0) <= 0"
              @click="step(denom.key, -1)"
            >−</button>
            <input
              class="stepper__input"
              type="number"
              min="0"
              step="1"
              :value="coins[denom.key]"
              :aria-label="denom.name"
              @input="onInput(denom.key, $event)"
            />
            <button
              class="stepper__btn"
              type="button"
              :aria-label="`Add one ${denom.key}`"
              @click="step(denom.key, 1)"
            >+</button>
          </div>
        </div>
      </div>

      <div class="purse__total" :title="`${coinGold} gp total value`">
        <span class="purse__total-label">Total</span>
        <span class="purse__total-value"><strong>{{ formatGp(coinGold) }}</strong> gp</span>
      </div>
    </div>

    <div class="purse__foot">
      <label class="purse__toggle">
        <input
          type="checkbox"
          :checked="countCoinWeight"
          @change="$emit('toggle', $event.target.checked)"
        />
        <span>Count coin weight</span>
      </label>
      <span class="purse__weight" :class="{ 'purse__weight--muted': !countCoinWeight }">
        {{ coinLbs }} lb<template v-if="!countCoinWeight"> (ignored)</template>
      </span>
    </div>
  </section>
</template>

<script setup>
/**
 * Gold / electrum / silver / copper counter. Each denomination is a flat labeled
 * stepper — metal lives only in the label + a thin top accent on the field, with
 * −[value]+ as a single compact unit (no nested boxes). The total is its own
 * emphasized block on the right: adjust coins → read the total.
 */
const props = defineProps({
  coins: { type: Object, required: true },
  countCoinWeight: { type: Boolean, default: true },
  coinLbs: { type: Number, default: 0 },
  coinGold: { type: Number, default: 0 },
});

const emit = defineEmits(['set-coin', 'toggle']);

const denoms = [
  { key: 'gp', name: 'Gold pieces', metal: '#c8a22b', deep: '#9a7c1c' },
  { key: 'ep', name: 'Electrum pieces', metal: '#b3a96a', deep: '#857b3f' },
  { key: 'sp', name: 'Silver pieces', metal: '#9aa3ad', deep: '#6c747c' },
  { key: 'cp', name: 'Copper pieces', metal: '#b06a3b', deep: '#8a4f29' },
];

function onInput(denom, e) {
  emit('set-coin', { denom, value: e.target.value });
}

function step(denom, delta) {
  const next = Math.max(0, (Number(props.coins[denom]) || 0) + delta);
  emit('set-coin', { denom, value: next });
}

function formatGp(v) {
  const n = Number(v) || 0;
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}
</script>

<style scoped>
.purse {
  background: var(--par-color-surface-card, #fefbf4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  padding: 1.4rem 1.6rem 1.5rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
}

.purse__head {
  margin-bottom: 1.2rem;
}
.purse__title {
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-action-hover, #2a4d70);
}

/* [ four compact steppers ] → [ total ] */
.purse__body {
  display: flex;
  align-items: stretch;
  gap: 1.4rem;
}

.purse__coins {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.1rem;
}

.coin {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.coin__label {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--metal-deep);
}

/* The single field: minus, number, plus share one border; metal top accent. */
.stepper {
  display: flex;
  align-items: stretch;
  width: 100%;
  background: #fff;
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-top: 2.5px solid var(--metal);
  border-radius: var(--par-radius-md, 4px);
  overflow: hidden;
}

.stepper__btn {
  flex: none;
  width: 3.2rem;
  min-height: 4rem;
  border: none;
  background: transparent;
  color: var(--par-color-text-secondary, #555);
  font-size: 1.9rem;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: background 0.12s ease;
}
.stepper__btn:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.05);
}
.stepper__btn:active:not(:disabled) {
  background: rgba(0, 0, 0, 0.1);
}
.stepper__btn:disabled {
  color: var(--par-color-text-disabled, #ccc);
  cursor: not-allowed;
}
.stepper__btn:focus-visible {
  outline: 2px solid var(--color-action-rest, #365a85);
  outline-offset: -2px;
}

.stepper__input {
  flex: 1;
  width: 100%;
  min-width: 0;
  border: none;
  border-left: 0.5px solid var(--par-color-border, #e8e2d4);
  border-right: 0.5px solid var(--par-color-border, #e8e2d4);
  background: transparent;
  text-align: center;
  font-family: inherit;
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--par-color-text, #222);
  outline: none;
  -moz-appearance: textfield;
}
.stepper__input::-webkit-outer-spin-button,
.stepper__input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.stepper__input:focus {
  background: rgba(54, 90, 133, 0.06);
}

/* The output, as a destination. */
.purse__total {
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  min-width: 11rem;
  padding: 0.6rem 1.6rem;
  background: var(--par-color-callout-bg, #f3ebda);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
}
.purse__total-label {
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-action-hover, #2a4d70);
}
.purse__total-value {
  font-size: 1.4rem;
  color: var(--par-color-text-secondary, #555);
}
.purse__total-value strong {
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--par-color-text, #222);
}

.purse__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.3rem;
  padding-top: 1rem;
  border-top: 0.5px solid var(--par-color-divider, #e2dccd);
}
.purse__toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.4rem;
  color: var(--par-color-text, #222);
  cursor: pointer;
}
.purse__toggle input {
  width: 1.8rem;
  height: 1.8rem;
  accent-color: var(--color-action-rest, #365a85);
  cursor: pointer;
}
.purse__weight {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--par-color-text-secondary, #555);
}
.purse__weight--muted {
  font-weight: 400;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}

@media (max-width: 620px) {
  .purse__body {
    flex-direction: column;
  }
  .purse__total {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    min-width: 0;
  }
}
@media (max-width: 460px) {
  .purse__coins {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .stepper__btn {
    transition: none;
  }
}
</style>
