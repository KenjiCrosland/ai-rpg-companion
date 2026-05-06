<template>
  <label class="par-checkbox">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      class="par-checkbox__field"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="par-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup>
/**
 * ParCheckbox — native checkbox + label, label-on-the-right convention
 * (the convention every D&D source-book uses for option toggles).
 *
 * Accepts label text via prop or via the default slot.
 */
defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.par-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  font-family: var(--par-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  font-size: 1.4rem;
  color: var(--par-color-text, #222);
  user-select: none;
}

.par-checkbox__field {
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
  width: 1.6rem;
  height: 1.6rem;
  background: var(--par-color-surface, #fdfbf6);
  border: 1px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-sm, 3px);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s ease, background-color 0.15s ease;
  flex-shrink: 0;
}

.par-checkbox__field:hover:not(:disabled) {
  border-color: var(--par-color-title, #7a1f1f);
}

.par-checkbox__field:checked {
  background: var(--par-color-title, #7a1f1f);
  border-color: var(--par-color-title, #7a1f1f);
}

/* Render the checkmark via background-image so we don't need a child node. */
.par-checkbox__field:checked::before {
  content: '';
  width: 0.9rem;
  height: 0.55rem;
  border-left: 2px solid var(--par-color-surface, #fdfbf6);
  border-bottom: 2px solid var(--par-color-surface, #fdfbf6);
  transform: rotate(-45deg) translate(0.05rem, -0.1rem);
}

.par-checkbox__field:focus,
.par-checkbox__field:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--par-color-action-hover, rgba(122, 31, 31, 0.06));
}

.par-checkbox__field:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.par-checkbox:has(.par-checkbox__field:disabled) {
  cursor: not-allowed;
  color: var(--par-color-text-muted, #6b6b6b);
}
</style>
