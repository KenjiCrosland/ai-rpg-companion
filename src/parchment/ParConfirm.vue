<template>
  <ParModal
    :opened="opened"
    :title="title"
    :close-on-backdrop="!destructive"
    @cancel="$emit('cancel')"
  >
    <p class="par-confirm__message">
      <slot>{{ message }}</slot>
    </p>

    <template #footer>
      <ParCardButton variant="muted" @click="$emit('cancel')">
        {{ cancelLabel }}
      </ParCardButton>
      <ParCardButton
        :variant="destructive ? 'danger' : 'primary'"
        @click="$emit('confirm')"
      >
        {{ confirmLabel }}
      </ParCardButton>
    </template>
  </ParModal>
</template>

<script setup>
/**
 * ParConfirm — parchment confirmation dialog.
 *
 * Thin wrapper over ParModal for the common "are you sure?" pattern, so
 * destructive/high-stakes actions get an on-brand parchment modal instead
 * of the native confirm(). The body text comes from the `message` prop or
 * the default slot (slot wins, for rich content).
 *
 * Footer is a muted Cancel + a committing action — burgundy `primary` by
 * default, or `danger` when `destructive` is set (and backdrop-dismiss is
 * disabled in that case so the action can't be cancelled by a stray click
 * being misread as confirmation).
 *
 * Props:
 *   opened       — v-model-style visibility (parent controls open/close)
 *   title        — required dialog heading
 *   message      — body text (overridden by the default slot)
 *   confirmLabel — confirm button label (default "Confirm")
 *   cancelLabel  — cancel button label (default "Cancel")
 *   destructive  — style confirm as danger; disable backdrop dismiss
 *
 * Emits: confirm, cancel
 */
import ParModal from './ParModal.vue';
import ParCardButton from './ParCardButton.vue';

defineProps({
  opened: { type: Boolean, default: false },
  title: { type: String, required: true },
  message: { type: String, default: '' },
  confirmLabel: { type: String, default: 'Confirm' },
  cancelLabel: { type: String, default: 'Cancel' },
  destructive: { type: Boolean, default: false },
});

defineEmits(['confirm', 'cancel']);
</script>

<style scoped>
.par-confirm__message {
  margin: 0;
  font-family: var(--par-font-serif, Georgia, serif);
  font-size: 1.6rem;
  line-height: 1.6;
  color: var(--par-color-text, #222);
}
</style>
