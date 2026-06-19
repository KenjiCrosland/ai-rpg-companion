<template>
  <li role="presentation" class="par-toggle-button">
    <button
      role="radio"
      type="button"
      class="par-toggle-button__item"
      :class="{ 'is-active': isActive }"
      :value="toggleValue"
      :aria-label="String(toggleValue)"
      :aria-checked="isActive ? 'true' : 'false'"
      :tabindex="isActive ? 0 : -1"
    >
      <!-- @slot label content (defaults to the toggleValue) -->
      <slot>{{ toggleValue }}</slot>
    </button>
  </li>
</template>

<script setup>
/**
 * ParToggleButton — a single segment in a ParToggleGroup. Mirrors Cedar's
 * CdrToggleButton: a `role="radio"` whose active state derives from the value
 * the parent group provides. Selection/focus are handled by the group's
 * delegated click + arrow-key handlers, so this component is presentational.
 */
import { inject, computed, ref } from 'vue';
import { PAR_TOGGLE_KEY } from './par-toggle-key.mjs';

const props = defineProps({
  toggleValue: { type: [String, Number], required: true },
});

const selected = inject(PAR_TOGGLE_KEY, ref(''));
const isActive = computed(() => props.toggleValue === selected.value);
</script>

<style scoped>
/* Equal-width segment. */
.par-toggle-button {
  display: flex;
  flex: 1 1 0;
  min-width: 0;
  margin: 0;
}

.par-toggle-button__item {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  margin: 0;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.6rem;
  font-weight: 500;
  /* Inactive: muted slate-lapis text, no border — only the active segment
     carries definition. */
  color: var(--color-action-secondary-rest, #5A7A9A);
  background: transparent;
  padding: 0.7rem 1.4rem;
  border-radius: var(--par-radius-sm, 3px);
  white-space: nowrap;
  transition: background-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
}

.par-toggle-button__item:hover:not(.is-active) {
  color: var(--color-action-hover, #2A4D70);
  background: var(--par-color-surface, #FBF7F0);
}

/* Active: a raised cream tab with lapis text + a lapis hairline ring —
   subtle lapis, clearly defined as the selected segment. */
.par-toggle-button__item.is-active {
  background: var(--par-color-surface-card, #FEFBF4);
  color: var(--color-action-hover, #2A4D70);
  box-shadow:
    0 1px 3px rgba(31, 58, 92, 0.2),
    inset 0 0 0 1px var(--color-action-secondary-rest, #5A7A9A);
}

.par-toggle-button__item:focus-visible {
  outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
  outline-offset: 2px;
}
</style>
