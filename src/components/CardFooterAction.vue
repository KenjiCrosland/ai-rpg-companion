<template>
  <button
    class="card-footer-action"
    :class="{
      'card-footer-action--danger': variant === 'danger'
    }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <span v-if="$slots.icon" class="card-footer-action__icon">
      <slot name="icon"></slot>
    </span>
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'danger'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

defineEmits(['click']);
</script>

<style scoped>
.card-footer-action {
  /* Reset */
  background: none;
  border: none;
  cursor: pointer;

  /* Layout */
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.25rem;

  /* Typography — match the sourcebook's serif font */
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.3rem;
  font-weight: 600;
  font-variant: small-caps;
  letter-spacing: 0.03em;
  color: #58180d; /* D&D sourcebook dark red-brown */

  /* Interaction */
  border-radius: 3px;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.card-footer-action:hover {
  background: rgba(88, 24, 13, 0.08);
}

.card-footer-action:active {
  background: rgba(88, 24, 13, 0.14);
}

/* Danger variant — delete actions */
.card-footer-action--danger {
  color: #999;
}

.card-footer-action--danger:hover {
  color: #7b2d26;
  background: rgba(123, 45, 38, 0.08);
}

/* Disabled state */
.card-footer-action:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.card-footer-action:disabled:hover {
  background: none;
}

/* Icon slot */
.card-footer-action__icon {
  font-size: 1.3rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
}
</style>
