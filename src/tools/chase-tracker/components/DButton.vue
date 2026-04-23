<template>
  <button
    :class="['d-button', `d-button--${variant}`]"
    :disabled="disabled"
    @click="$emit('click', $event)"
    :type="type"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'DButton',
  props: {
    variant: {
      type: String,
      default: 'secondary',
      validator: (v) => ['primary', 'secondary', 'tertiary'].includes(v),
    },
    disabled: { type: Boolean, default: false },
    type: { type: String, default: 'button' },
  },
  emits: ['click'],
};
</script>

<style scoped>
.d-button {
  font-family: var(--font-display);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0.6rem 1.2rem;
  border-radius: 2px;
  transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease;
  color: var(--ink-primary);
}

.d-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.d-button--primary {
  background: var(--button-bg);
  border: 2px solid var(--accent-gold);
  font-weight: 600;
}

.d-button--primary:hover:not(:disabled) {
  background: var(--button-bg-hover);
  border-color: var(--accent-gold-dark);
}

.d-button--secondary {
  background: transparent;
  border: 1px solid var(--button-border);
}

.d-button--secondary:hover:not(:disabled) {
  background: var(--button-bg);
}

.d-button--tertiary {
  background: transparent;
  border: none;
  color: var(--ink-muted);
  text-decoration: underline;
  padding: 0.4rem 0.5rem;
}

.d-button--tertiary:hover:not(:disabled) {
  color: var(--ink-primary);
}
</style>
