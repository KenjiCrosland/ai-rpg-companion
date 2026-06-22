<template>
  <li class="related-stub">
    <div class="related-stub__info">
      <strong class="related-stub__name">{{ name }}</strong>
      <span v-if="brief" class="related-stub__brief">{{ brief }}</span>
    </div>
    <div class="related-stub__actions">
      <!-- Promote / view / generate action (consumer-supplied). -->
      <slot name="actions" />
      <button
        v-if="removable"
        type="button"
        class="related-stub__remove"
        :title="resolvedRemoveLabel"
        :aria-label="resolvedRemoveLabel"
        @click="$emit('remove')"
      >✕</button>
    </div>
  </li>
</template>

<script setup>
/**
 * RelatedStubRow — the shared "cross-tool stub" row used across the setting
 * generator's related-places, contained-locations, and related-NPCs lists.
 * One source of truth for the stub card look (warm-cream borderless surface,
 * bold serif name + italic brief) and the ✕ remove control, so every stub
 * reads identically regardless of which list it lives in.
 *
 * The promote/view/generate action is consumer-supplied via the `actions`
 * slot; the row only owns the name/brief layout and the remove affordance.
 */
import { computed } from 'vue';

const props = defineProps({
  name: { type: String, required: true },
  // Short descriptor under the name (role_brief, description, etc.).
  brief: { type: String, default: '' },
  // Show the ✕ remove control.
  removable: { type: Boolean, default: true },
  // Override the remove button's accessible label (defaults to "Remove {name}").
  removeLabel: { type: String, default: '' },
});

defineEmits(['remove']);

const resolvedRemoveLabel = computed(() => props.removeLabel || `Remove ${props.name}`);
</script>

<style scoped>
.related-stub {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 1.3rem 1.5rem;
  /* Warm-tan card, no border — the tab panel is the lighter/cooler card
     surface; the stub sits on it as a deeper warm-toned card plus a soft warm
     shadow, reading as a raised card by tone + elevation rather than an
     outline. */
  background: var(--par-color-callout-bg, #f3ebda);
  border-radius: var(--par-radius-md, 4px);
  box-shadow: 0 1px 4px rgba(122, 50, 30, 0.08);
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

.related-stub__info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
  flex: 1;
}

.related-stub__name {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-action-hover, #2A4D70);
  line-height: 1.3;
}

.related-stub__brief {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.35rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.45;
  /* Clamp longer descriptions so rows stay stub-sized. */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-stub__actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;
}

/* ✕ remove — quiet faded-slate at rest, burgundy on hover (the only place
   burgundy enters the action layer, as the destructive-confirm step). */
.related-stub__remove {
  appearance: none;
  -webkit-appearance: none;
  background: none;
  border: none;
  margin: 0;
  padding: 0.5rem 0.8rem;
  font-family: inherit;
  font-size: 1.8rem;
  line-height: 1;
  color: var(--par-color-action-muted, #5A7A9A);
  border-radius: var(--par-radius-sm, 3px);
  cursor: pointer;
  transition: color 0.15s ease, background-color 0.15s ease;
}

.related-stub__remove:hover {
  color: var(--par-color-title, #7a1f1f);
  background: var(--par-color-action-destructive-hover, rgba(122, 31, 31, 0.06));
}

.related-stub__remove:focus-visible {
  outline: 2px solid var(--par-color-title, #7a1f1f);
  outline-offset: 2px;
}

@media (max-width: 600px) {
  .related-stub {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
