<template>
  <div class="str parchment">
    <span class="str__label">Strength</span>
    <div class="str__control">
      <button
        class="str__step"
        type="button"
        aria-label="Decrease Strength"
        :disabled="modelValue <= 1"
        @click="$emit('update:modelValue', modelValue - 1)"
      >−</button>
      <input
        class="str__input"
        type="number"
        min="1"
        max="30"
        :value="modelValue"
        aria-label="Strength score"
        @change="onInput"
      />
      <button
        class="str__step"
        type="button"
        aria-label="Increase Strength"
        :disabled="modelValue >= 30"
        @click="$emit('update:modelValue', modelValue + 1)"
      >+</button>
    </div>
    <span class="str__cap">capacity {{ modelValue * 15 }} lb</span>
  </div>
</template>

<script setup>
/**
 * Strength stepper. Drives both the carrying capacity and (cosmetically) the
 * pack's visual roominess. v-model on `modelValue`.
 */
defineProps({
  modelValue: { type: Number, default: 10 },
});

const emit = defineEmits(['update:modelValue']);

function onInput(e) {
  emit('update:modelValue', Number(e.target.value));
}
</script>

<style scoped>
.str {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
}

.str__label {
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-action-hover, #2a4d70);
}

.str__control {
  display: inline-flex;
  align-items: stretch;
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
  overflow: hidden;
  background: var(--par-color-field-bg, rgba(243, 235, 218, 0.5));
}

.str__step {
  width: 3rem;
  border: none;
  background: transparent;
  color: var(--color-action-hover, #2a4d70);
  font-size: 1.9rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.12s ease;
}
.str__step:hover:not(:disabled) {
  background: rgba(42, 77, 112, 0.1);
}
.str__step:disabled {
  color: var(--par-color-text-disabled, #ccc);
  cursor: not-allowed;
}

.str__input {
  width: 4.2rem;
  border: none;
  border-left: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-right: 0.5px solid var(--par-color-border-strong, #c9b99a);
  background: transparent;
  text-align: center;
  font-family: inherit;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--par-color-text, #222);
  outline: none;
  -moz-appearance: textfield;
}
.str__input::-webkit-outer-spin-button,
.str__input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.str__input:focus {
  background: #fff;
}

.str__cap {
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}
</style>
