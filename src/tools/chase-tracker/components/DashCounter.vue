<template>
  <div class="dash-counter">
    <span class="dash-label">Dash:</span>
    <span :class="['dash-value', `dash-value--${tier}`]">{{ count }}</span>
    <button
      type="button"
      class="dash-primary"
      :aria-label="`Mark one Dash for ${name || 'token'}`"
      @click.stop="$emit('dash')"
    >Dash</button>
    <button
      type="button"
      class="dash-undo"
      :disabled="count === 0"
      :aria-label="`Undo Dash for ${name || 'token'}`"
      title="Undo"
      @click.stop="$emit('undo')"
    >−</button>
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
  gap: 0.4rem;
  font-family: var(--font-display);
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  color: var(--ink-secondary);
}

.dash-label {
  text-transform: uppercase;
  color: var(--ink-muted);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
}

.dash-value {
  min-width: 1.4rem;
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
  color: var(--ink-primary);
}

.dash-value--normal { color: var(--accent-gold-dark); }
.dash-value--warn   { color: #a94c2c; }
.dash-value--danger { color: var(--accent-red-dark); }

.dash-primary {
  font-family: var(--font-display);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.3rem 0.7rem;
  background: var(--button-bg);
  border: 1px solid var(--accent-gold);
  color: var(--ink-primary);
  cursor: pointer;
  border-radius: 2px;
  transition: background-color 120ms ease;
}

.dash-primary:hover {
  background: var(--button-bg-hover);
}

.dash-undo {
  width: 22px;
  height: 22px;
  padding: 0;
  background: transparent;
  border: 1px solid var(--button-border);
  color: var(--ink-secondary);
  cursor: pointer;
  font-size: 0.95rem;
  line-height: 1;
  border-radius: 2px;
}

.dash-undo:hover:not(:disabled) {
  background: var(--parchment-base);
  color: var(--ink-primary);
}

.dash-undo:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
</style>
