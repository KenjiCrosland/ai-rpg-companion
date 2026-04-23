<template>
  <div class="dash-counter">
    <span class="dash-label">Dashes:</span>
    <button
      type="button"
      class="dash-step dash-step--minus"
      :disabled="count === 0"
      :aria-label="`Remove one Dash from ${name || 'token'}`"
      title="Remove one Dash"
      @click.stop="$emit('undo')"
    >−</button>
    <span
      :class="['dash-value', `dash-value--${tier}`]"
      :aria-label="`Dash count: ${count}`"
    >{{ count }}</span>
    <button
      type="button"
      class="dash-step dash-step--plus"
      :aria-label="`Mark one Dash for ${name || 'token'}`"
      title="Add one Dash"
      @click.stop="$emit('dash')"
    >+</button>
  </div>
</template>

<script>
export default {
  name: 'DashCounter',
  props: {
    count: { type: Number, default: 0 },
    name: { type: String, default: '' },
  },
  emits: ['dash', 'undo'],
  computed: {
    tier() {
      if (this.count >= 4) return 'danger';
      if (this.count >= 3) return 'warn';
      if (this.count >= 1) return 'normal';
      return 'zero';
    },
  },
};
</script>

<style scoped>
.dash-counter {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.04em;
  color: var(--ink-secondary);
}

.dash-label {
  margin-right: 0.3rem;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  color: var(--ink-muted);
}

/* Quiet supporting controls — the badge is the focal point, these are
   small thin rectangles that read as "adjusters" rather than CTAs. */
.dash-step {
  width: 28px;
  height: 24px;
  padding: 0;
  background: rgba(217, 195, 149, 0.4); /* muted parchment tint */
  border: 1px solid var(--parchment-edge);
  color: var(--ink-muted);
  cursor: pointer;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease;
}

.dash-step:hover:not(:disabled) {
  background: var(--parchment-warm);
  color: var(--ink-primary);
  border-color: var(--button-border);
}

.dash-step:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.dash-value {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.3rem;
  height: 2.3rem;
  padding: 0 0.5rem;
  text-align: center;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--ink-primary);
  background: var(--parchment-base);
  border: 1px solid var(--parchment-edge);
  border-radius: 999px;
  user-select: none;
}

.dash-value--zero   { color: var(--ink-muted); }
.dash-value--normal {
  color: #2e2114;
  background: var(--accent-gold);
  border-color: var(--accent-gold-dark);
}
.dash-value--warn {
  color: #f5ede0;
  background: #a94c2c;
  border-color: #6d2d19;
}
.dash-value--danger {
  color: #f5ede0;
  background: var(--accent-red-dark);
  border-color: #300a0a;
}
</style>
