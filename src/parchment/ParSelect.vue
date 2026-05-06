<template>
  <label class="par-select">
    <span v-if="label" class="par-select__label">{{ label }}</span>
    <select
      :value="modelValue"
      :disabled="disabled"
      class="par-select__field"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="opt in normalizedOptions" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
    <span v-if="hint" class="par-select__hint">{{ hint }}</span>
  </label>
</template>

<script setup>
/**
 * ParSelect — native <select> wrapped in a label. Accepts options as
 * an array of strings or {value, label} pairs.
 *
 * Native <select> styling differs across platforms; we restyle the
 * wrapper but leave the dropdown chrome to the OS for accessibility
 * and behavioral parity.
 */
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  hint: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);

const normalizedOptions = computed(() =>
  props.options.map(opt =>
    typeof opt === 'string' || typeof opt === 'number'
      ? { value: opt, label: String(opt) }
      : { value: opt.value, label: opt.label ?? String(opt.value) }
  )
);
</script>

<style scoped>
.par-select {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-family: var(--par-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
}

.par-select__label {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.02em;
}

.par-select__field {
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
  padding: 0.55rem 2.4rem 0.55rem 0.8rem;
  background: var(--par-color-surface, #fdfbf6) url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'><path d='M0 0l6 8 6-8z' fill='%237a1f1f'/></svg>") no-repeat right 0.8rem center / 0.7rem 0.5rem;
  border: 1px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-sm, 3px);
  color: var(--par-color-text, #222);
  font-family: inherit;
  font-size: 1.4rem;
  line-height: 1.4;
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.par-select__field:hover:not(:disabled) {
  border-color: var(--par-color-title, #7a1f1f);
}

.par-select__field:focus,
.par-select__field:focus-visible {
  outline: none;
  border-color: var(--par-color-title, #7a1f1f);
  box-shadow: 0 0 0 2px var(--par-color-action-hover, rgba(122, 31, 31, 0.06));
}

.par-select__field:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.par-select__hint {
  font-size: 1.1rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}
</style>
