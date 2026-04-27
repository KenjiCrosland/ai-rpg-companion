<template>
  <button
    type="button"
    :class="['edge-btn', `edge-btn--${direction}`]"
    :aria-label="ariaLabel"
    :title="ariaLabel"
    @click="$emit('click')"
  >
    <span aria-hidden="true">+</span>
  </button>
</template>

<script>
const LABELS = {
  top:    'Expand grid upward',
  bottom: 'Expand grid downward',
  left:   'Expand grid to the left',
  right:  'Expand grid to the right',
};

export default {
  name: 'GridEdgeButton',
  props: {
    direction: {
      type: String,
      required: true,
      validator: (v) => ['top', 'bottom', 'left', 'right'].includes(v),
    },
  },
  emits: ['click'],
  computed: {
    ariaLabel() {
      return LABELS[this.direction] || 'Expand grid';
    },
  },
};
</script>

<style scoped>
.edge-btn {
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1;
  color: var(--ink-muted);
  background: var(--parchment-warm);
  border: 1px dashed var(--parchment-edge);
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.5;
  transition:
    opacity 140ms ease,
    transform 120ms ease,
    background-color 140ms ease,
    border-color 140ms ease,
    color 140ms ease,
    box-shadow 140ms ease;
}

.edge-btn:hover,
.edge-btn:focus-visible {
  opacity: 1;
  background: var(--button-bg);
  border-style: solid;
  border-color: var(--accent-gold);
  color: var(--ink-primary);
  box-shadow: 0 2px 6px rgba(46, 33, 20, 0.2);
  outline: none;
  transform: scale(1.04);
}

.edge-btn:active {
  transform: scale(0.98);
}

@media (pointer: coarse) {
  .edge-btn { opacity: 1; }
}

@media (max-width: 640px) {
  .edge-btn {
    width: 32px;
    height: 32px;
    font-size: 1.15rem;
  }
}
</style>
