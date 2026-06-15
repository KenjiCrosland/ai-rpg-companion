<template>
  <div class="par-select-wrapper">
    <select
      class="par-select"
      :value="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option
        v-for="opt in normalizedOptions"
        :key="opt.value"
        :value="opt.value"
      >
        {{ opt.label }}
      </option>
    </select>
    <svg
      class="par-select__caret"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      aria-hidden="true"
    >
      <path
        d="M2 4L5 7L8 4"
        stroke="currentColor"
        stroke-width="1"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script setup>
/**
 * ParSelect — native <select> in the lapis "magic UI" register, with a
 * custom lapis caret. No built-in label; pair with ParField. Sibling to
 * ParCardSelect (the burgundy card-edit select).
 *
 * Accepts options as an array of strings/numbers or {value, label}
 * pairs. The native dropdown chrome is left to the OS for accessibility.
 */
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  options: { type: Array, default: () => [] },
  // Rendered as a leading empty-value option (e.g. "Any rarity").
  placeholder: { type: String, default: '' },
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
.par-select-wrapper {
  position: relative;
}

.par-select {
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 3.2rem 1rem 1.4rem;
  background: var(--par-color-field-bg, rgba(243, 235, 218, 0.5));
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  color: var(--par-color-text, #222);
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  transition: border-color 0.15s ease;
}

.par-select:focus {
  border-color: var(--color-action-rest, #365A85);
}

.par-select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.par-select__caret {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--color-action-hover, #2A4D70); /* dark lapis */
}
</style>
