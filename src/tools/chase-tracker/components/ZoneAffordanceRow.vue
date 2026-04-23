<template>
  <div class="affordance-row">
    <button
      v-for="action in actions"
      :key="action.key"
      type="button"
      :class="['affordance-btn', { 'affordance-btn--active': action.active }]"
      :title="action.label"
      :aria-label="action.label"
      @click.stop="$emit('action', action.key)"
    >
      <Icon :icon="action.icon" :width="22" :height="22" />
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
    actions() {
      return [
        { key: 'edit',       icon: 'game-icons:quill-ink',    label: 'Edit' },
        { key: 'connect',    icon: 'game-icons:linked-rings', label: 'Connect', active: this.connectActive },
        { key: 'conditions', icon: 'game-icons:price-tag',    label: 'Conditions' },
        { key: 'delete',     icon: 'game-icons:trash-can',    label: 'Delete' },
      ];
    },
  },
};
</script>

<style scoped>
.affordance-row {
  display: flex;
  gap: 0.15rem;
  opacity: 0.4;
  transition: opacity 120ms ease;
}

/* Parent .zone controls hover — see Zone.vue */
:global(.zone:hover) .affordance-row,
:global(.zone:focus-within) .affordance-row {
  opacity: 1;
}

@media (pointer: coarse) {
  .affordance-row { opacity: 1; }
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

.affordance-btn--active {
  background: var(--accent-gold);
  color: var(--parchment-base);
}
</style>
