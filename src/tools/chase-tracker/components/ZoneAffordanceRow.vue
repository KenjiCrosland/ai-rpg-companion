<template>
  <div class="affordance-row">
    <div class="affordance-icons">
      <button
        v-for="action in iconActions"
        :key="action.key"
        type="button"
        class="affordance-btn"
        :title="action.label"
        :aria-label="action.label"
        @click.stop="$emit('action', action.key)"
      >
        <Icon :icon="action.icon" :width="22" :height="22" />
      </button>
    </div>

    <button
      type="button"
      :class="['affordance-connect', { 'affordance-connect--active': connectActive }]"
      :aria-pressed="connectActive"
      @click.stop="$emit('action', 'connect')"
    >
      <span class="affordance-connect__label">Connect</span>
      <span class="affordance-connect__arrow" aria-hidden="true">→</span>
    </button>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  name: 'ZoneAffordanceRow',
  components: { Icon },
  props: {
    connectActive: { type: Boolean, default: false },
  },
  emits: ['action'],
  computed: {
    iconActions() {
      return [
        { key: 'edit',       icon: 'game-icons:quill-ink', label: 'Edit' },
        { key: 'conditions', icon: 'game-icons:price-tag', label: 'Conditions' },
        { key: 'delete',     icon: 'game-icons:trash-can', label: 'Delete' },
      ];
    },
  },
};
</script>

<style scoped>
.affordance-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.affordance-icons {
  display: flex;
  gap: 0.15rem;
  opacity: 0.68;
  transition: opacity 120ms ease;
}

/* Parent .zone controls hover — see Zone.vue */
:global(.zone:hover) .affordance-icons,
:global(.zone:focus-within) .affordance-icons {
  opacity: 1;
}

@media (pointer: coarse) {
  .affordance-icons { opacity: 0.75; }
}

.affordance-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--ink-muted);
  cursor: pointer;
  border-radius: 2px;
  padding: 0;
  transition: background-color 120ms ease, color 120ms ease;
}

.affordance-btn:hover {
  background: var(--parchment-base);
  color: var(--ink-primary);
}

.affordance-connect {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-display);
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-primary);
  background: var(--parchment-warm);
  border: 1px solid var(--button-border);
  border-radius: 2px;
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease;
}

.affordance-connect:hover {
  background: var(--button-bg);
  border-color: var(--accent-gold-dark);
}

.affordance-connect__arrow {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1;
  transform: translateY(-1px);
}

.affordance-connect--active {
  background: var(--accent-gold);
  border-color: var(--accent-gold-dark);
  color: var(--parchment-base);
}

.affordance-connect--active:hover {
  background: var(--accent-gold-dark);
}
</style>
