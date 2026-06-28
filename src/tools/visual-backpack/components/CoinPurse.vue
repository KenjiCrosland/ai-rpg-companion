<template>
  <section class="purse parchment" aria-label="Coin purse">
    <header class="purse__head">
      <h2 class="purse__title">Coin purse</h2>
      <span class="purse__weight-note">{{ coinLbs }} lb</span>
    </header>

    <div class="purse__row">
      <div v-for="denom in denoms" :key="denom.key" class="coin" :class="`coin--${denom.key}`">
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

      <div class="coin-total" :title="`${coinGold} gp total value`">
        <span class="coin-total__label">Total</span>
        <span class="coin-total__value"
          >{{ formatGp(coinGold) }} <span class="coin-total__unit">gp</span></span
        >
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * Gold / electrum / silver / copper counter — coins only. Each denomination is a
 * flat labeled stepper (metal color in the label, −[value]+ as one field); the
 * total is a defined summary pool on the right (warm tan, lapis text). The coin
 * weight is a quiet inline note in the heading.
 *
 * Coin weight is reported, not gated here: the "include coin weight" toggle lives
 * on the carrying bar (it's a carrying-calculation setting, not a coin property).
 *
 * The metal colors are coin-purse-specific contextual treatment — they do not
 * enter parchment's global token system or propagate to other tools.
 */
const props = defineProps({
  coins: { type: Object, required: true },
  coinLbs: { type: Number, default: 0 },
  coinGold: { type: Number, default: 0 },
});

const emit = defineEmits(['set-coin']);

const denoms = [
  { key: 'gp', name: 'Gold pieces' },
  { key: 'ep', name: 'Electrum pieces' },
  { key: 'sp', name: 'Silver pieces' },
  { key: 'cp', name: 'Copper pieces' },
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
  /* Coin-purse-specific metal colors — contextual to this widget only.
     Darkened to clear WCAG AA (4.5:1) on the cream card at 11px/700, while
     keeping the four hues clearly separated (warm amber / olive / cool / brown). */
  --coin-color-gold: #956a0b;
  --coin-color-electrum: #7a743b;
  --coin-color-silver: #617493;
  --coin-color-copper: #a8562e;

  background: var(--par-color-surface-card, #fefbf4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  padding: 1.4rem 1.6rem 1.5rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
}

/* Zone 1: heading + inline weight note. */
.purse__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.1rem;
}
.purse__title {
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-action-hover, #2a4d70);
}
.purse__weight-note {
  font-size: 1.2rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}

/* Zone 2: four steppers + the total pool, auto-sized so there's no gap at the end. */
.purse__row {
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  gap: 0.75rem;
  align-items: end;
}

.coin {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}
.coin__label {
  font-size: 1.1rem;
  font-weight: 700; /* heavier than burgundy small-caps — metal colors are less saturated */
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-align: center;
}
.coin--gp .coin__label {
  color: var(--coin-color-gold);
}
.coin--ep .coin__label {
  color: var(--coin-color-electrum);
}
.coin--sp .coin__label {
  color: var(--coin-color-silver);
}
.coin--cp .coin__label {
  color: var(--coin-color-copper);
}

.stepper {
  display: flex;
  align-items: stretch;
  width: 100%;
  background: var(--par-color-surface, #fbf7f0);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
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
  font-size: 1.6rem;
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

/* The total: a defined summary zone — warm tan pool, lapis text. */
.coin-total {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  min-width: 13rem;
  background: var(--par-color-callout-bg, #f3ebda);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
}
.coin-total__label {
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-align: right;
  color: var(--color-action-hover, #2a4d70);
  margin-bottom: 0.2rem;
}
.coin-total__value {
  /* Slightly smaller than the section heading (2rem) for hierarchy. */
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 1;
  text-align: right;
  color: var(--color-action-hover, #2a4d70);
}
.coin-total__unit {
  font-size: 1.3rem;
  font-style: italic;
  font-weight: 400;
  color: var(--par-color-text-muted, #6b6b6b);
}

@media (max-width: 560px) {
  .purse__row {
    grid-template-columns: repeat(2, 1fr);
  }
  .coin-total {
    grid-column: 1 / -1;
    min-width: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stepper__btn {
    transition: none;
  }
}
</style>
