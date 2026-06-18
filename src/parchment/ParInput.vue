<template>
  <!-- `parchment` opts out of App.vue's global font-family !important
       override so the serif (incl. placeholder) is honored anywhere. -->
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    class="par-input parchment"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
/**
 * ParInput — single-line form text input in the lapis "magic UI"
 * register. No built-in label; pair with ParField for the label/hint.
 *
 * Sibling to ParCardInput (the burgundy, self-labelling card-edit
 * input). This is the form-page default.
 *
 * v-model binds to `modelValue`. For numeric input, set type="number"
 * and use the `.number` modifier on v-model in the consumer.
 */
defineProps({
  modelValue: { type: [String, Number], default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  disabled: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.par-input {
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 1.4rem;
  background: var(--par-color-field-bg, rgba(243, 235, 218, 0.5));
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  color: var(--par-color-text, #222);
  outline: none;
  transition: border-color 0.15s ease;
}

.par-input::placeholder {
  color: var(--par-color-text-muted, #6b6b6b);
}

.par-input:focus {
  border-color: var(--color-action-rest, #365A85);
}

.par-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
