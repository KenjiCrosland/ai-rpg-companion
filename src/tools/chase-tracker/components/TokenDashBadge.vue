<template>
  <span
    :class="['dash-badge', `dash-badge--${tier}`]"
    :title="`${count} Dash${count === 1 ? '' : 'es'}`"
    aria-hidden="true"
  >{{ count }}</span>
</template>

<script>
export default {
  name: 'TokenDashBadge',
  props: {
    count: { type: Number, required: true },
  },
  computed: {
    tier() {
      if (this.count >= 4) return 'danger';
      if (this.count >= 3) return 'warn';
      return 'normal';
    },
  },
};
</script>

<style scoped>
.dash-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  min-width: 20px;
  height: 20px;
  padding: 0 4px;
  border-radius: 999px;
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--parchment-warm);
  box-shadow: 0 1px 2px rgba(46, 33, 20, 0.3);
  color: #f5ede0;
  pointer-events: none;
  user-select: none;
}

.dash-badge--normal {
  background: var(--accent-gold);
  color: #2e2114;
  border-color: var(--accent-gold-dark);
}

.dash-badge--warn {
  background: #a94c2c;
  border-color: #6d2d19;
}

.dash-badge--danger {
  background: var(--accent-red-dark);
  border-color: #300a0a;
}

@media (max-width: 640px) {
  .dash-badge {
    top: -4px;
    right: -4px;
    min-width: 16px;
    height: 16px;
    font-size: 0.65rem;
    border-width: 1.5px;
    padding: 0 3px;
  }
}
</style>
