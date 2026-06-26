<template>
  <!-- `parchment` opts out of App.vue's global font-family !important
       override so the serif (incl. placeholder) is honored anywhere. -->
  <textarea
    :value="modelValue"
    :placeholder="placeholder"
    :rows="rows"
    :disabled="disabled"
    class="par-textarea parchment"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
/**
 * ParTextarea — multi-line form input in the lapis "magic UI" register.
 * No built-in label; pair with ParField. Sibling to ParCardTextarea
 * (the burgundy card-edit textarea). Body text uses serif to match the
 * broader cros.land voice.
 */
defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  // Native rows attribute. Omit to fall back to the CSS min-height.
  rows: { type: [String, Number], default: undefined },
  disabled: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.par-textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 8rem;
  padding: 1rem 1.4rem;
  background: var(--par-color-field-bg, rgba(243, 235, 218, 0.5));
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  color: var(--par-color-text, #222);
  line-height: 1.6;
  outline: none;
  resize: vertical;
  transition: border-color 0.15s ease;
}

.par-textarea::placeholder {
  color: var(--par-color-text-muted, #6b6b6b);
}

.par-textarea:focus {
  border-color: var(--color-action-rest, #365A85);
}

.par-textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
