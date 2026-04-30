<template>
  <label class="par-input">
    <span v-if="label" class="par-input__label">{{ label }}</span>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :min="min"
      :max="max"
      class="par-input__field"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span v-if="hint" class="par-input__hint">{{ hint }}</span>
  </label>
</template>

<script setup>
/**
 * ParInput — single-line text input. Wraps a native <input> in a label
 * so the whole row is clickable and the label/hint are visually paired.
 *
 * v-model binds to `modelValue` like any modern Vue 3 input. For numeric
 * input, set `type="number"` and use `.number` modifier on v-model in
 * the consumer.
 */
defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  hint: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  disabled: { type: Boolean, default: false },
  min: { type: [String, Number], default: undefined },
  max: { type: [String, Number], default: undefined },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.par-input {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-family: var(--par-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
}

.par-input__label {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.02em;
}

.par-input__field {
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
  padding: 0.55rem 0.8rem;
  background: var(--par-color-surface, #fdfbf6);
  border: 1px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-sm, 3px);
  color: var(--par-color-text, #222);
  font-family: inherit;
  font-size: 1.4rem;
  line-height: 1.4;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.par-input__field::placeholder {
  color: var(--par-color-text-muted, #6b6b6b);
}

.par-input__field:hover:not(:disabled) {
  border-color: var(--par-color-title, #7a1f1f);
}

.par-input__field:focus,
.par-input__field:focus-visible {
  outline: none;
  border-color: var(--par-color-title, #7a1f1f);
  box-shadow: 0 0 0 2px var(--par-color-action-hover, rgba(122, 31, 31, 0.06));
}

.par-input__field:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.par-input__hint {
  font-size: 1.1rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}
</style>
