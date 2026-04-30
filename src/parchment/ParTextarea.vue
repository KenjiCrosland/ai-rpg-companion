<template>
  <label class="par-textarea">
    <span v-if="label" class="par-textarea__label">{{ label }}</span>
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      class="par-textarea__field"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
    <span v-if="hint" class="par-textarea__hint">{{ hint }}</span>
  </label>
</template>

<script setup>
/**
 * ParTextarea — multi-line text input. Same shape as ParInput, with
 * a `rows` prop for height. Suitable for prose fields like
 * physical_description and lore.
 */
defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  hint: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  rows: { type: [String, Number], default: 4 },
  disabled: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.par-textarea {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-family: var(--par-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
}

.par-textarea__label {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.02em;
}

.par-textarea__field {
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
  padding: 0.6rem 0.8rem;
  background: var(--par-color-surface, #fdfbf6);
  border: 1px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-sm, 3px);
  color: var(--par-color-text, #222);
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.4rem;
  line-height: 1.5;
  resize: vertical;
  min-height: 4rem;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.par-textarea__field::placeholder {
  color: var(--par-color-text-muted, #6b6b6b);
  font-style: italic;
}

.par-textarea__field:hover:not(:disabled) {
  border-color: var(--par-color-title, #7a1f1f);
}

.par-textarea__field:focus,
.par-textarea__field:focus-visible {
  outline: none;
  border-color: var(--par-color-title, #7a1f1f);
  box-shadow: 0 0 0 2px var(--par-color-action-hover, rgba(122, 31, 31, 0.06));
}

.par-textarea__field:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.par-textarea__hint {
  font-size: 1.1rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}
</style>
