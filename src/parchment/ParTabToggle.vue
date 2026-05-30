<template>
  <div class="par-tab-toggle parchment" role="tablist">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      role="tab"
      :aria-selected="modelValue === option.value"
      class="par-tab-toggle__btn"
      :class="{ 'is-active': modelValue === option.value }"
      @click="$emit('update:modelValue', option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
/**
 * ParTabToggle
 *
 * Inline parchment tab strip — sourcebook-editorial register, not the
 * Cedar/chrome register. Used as a view-mode switcher inside content
 * surfaces (e.g., the dungeon-generator room panel's
 * Description/Form toggle).
 *
 * The active state uses burgundy (--par-color-title) — the parchment
 * editorial accent — NOT lapis. Lapis is reserved for chrome action
 * primitives (ParActionButton). The visual difference reinforces
 * "this lives on a content surface" vs "this is a chrome control".
 *
 * Usage:
 *   <ParTabToggle
 *     v-model="activeView"
 *     :options="[
 *       { value: 'description', label: 'Show Description' },
 *       { value: 'form',        label: 'Show Form' }
 *     ]"
 *   />
 *
 * A11y: container is role="tablist", each button is role="tab" with
 * aria-selected. Native <button type="button"> so form submission
 * isn't accidentally triggered when the toggle sits inside a form.
 */
defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  options: {
    type: Array,
    required: true,
    validator(value) {
      return Array.isArray(value)
        && value.every(o => o && typeof o === 'object' && 'value' in o && 'label' in o);
    },
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.par-tab-toggle {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--par-color-divider, #e2dccd);
  margin: 0 0 1.5rem;
}

.par-tab-toggle__btn {
  font-family: var(--par-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  font-size: 1.15rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--par-color-text-muted, #6b6b6b);
  background: transparent;
  border: none;
  padding: 0.7rem 1.5rem;
  cursor: pointer;
  /* Active state is a burgundy bottom rule; inactive tabs reserve
     the same 2px so switching doesn't jiggle vertical alignment. */
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.par-tab-toggle__btn:hover {
  color: var(--par-color-text, #222);
}

.par-tab-toggle__btn:focus-visible {
  outline: 2px solid var(--par-color-title, #7a1f1f);
  outline-offset: 2px;
  border-radius: 2px;
}

.par-tab-toggle__btn.is-active {
  color: var(--par-color-title, #7a1f1f);
  border-bottom-color: var(--par-color-title, #7a1f1f);
  font-weight: 600;
}
</style>
