<template>
  <button
    type="button"
    role="switch"
    class="par-switch parchment"
    :aria-checked="modelValue ? 'true' : 'false'"
    :aria-label="ariaLabel"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span class="par-switch__opt" :class="{ 'is-active': !modelValue }">{{ offLabel }}</span>
    <span class="par-switch__track" aria-hidden="true"><span class="par-switch__thumb"></span></span>
    <span class="par-switch__opt" :class="{ 'is-active': modelValue }">{{ onLabel }}</span>
  </button>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, required: true },
  // Labels flank the track; both states are valid choices (this is a
  // two-option switcher, not an on/off), so the track stays lapis in both
  // positions and the bold label carries the state.
  offLabel: { type: String, required: true },
  onLabel: { type: String, required: true },
  ariaLabel: { type: String, required: true },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.par-switch {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  background: none;
  border: none;
  padding: 0.2rem;
  cursor: pointer;
  font-family: inherit;
  font-size: 1.2rem;
}

.par-switch:focus-visible {
  outline: 2px solid var(--color-action-rest, #365A85);
  outline-offset: 2px;
  border-radius: 4px;
}

.par-switch__opt {
  color: var(--par-color-text-muted, #6b6b6b);
  letter-spacing: 0.02em;
}

.par-switch__opt.is-active {
  color: var(--color-action-hover, #2A4D70);
  font-weight: 700;
}

.par-switch__track {
  position: relative;
  width: 3.4rem;
  height: 1.8rem;
  border-radius: 1rem;
  background: var(--color-action-rest, #365A85);
  flex-shrink: 0;
}

.par-switch__thumb {
  position: absolute;
  top: 0.2rem;
  left: 0.2rem;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background: var(--par-color-surface, #FBF7F0);
  transition: left 0.15s ease;
}

.par-switch[aria-checked="true"] .par-switch__thumb {
  left: calc(100% - 1.6rem);
}
</style>
