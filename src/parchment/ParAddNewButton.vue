<template>
  <button
    :type="type"
    :disabled="disabled"
    class="par-add-new"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
/**
 * ParAddNewButton — full-width dashed-outline "+ Add new X" affordance
 * in the parchment lapis palette. Sits one step lower than primary-
 * outline ("act on existing") because it signals "create new" — the
 * dashed border telegraphs "this is a slot for a new thing," matching
 * the convention from countless data tools (Figma frames, Trello
 * cards, kanban add-row buttons).
 *
 * The hover-state border-style transition from dashed to solid is a
 * small affordance commit: as the user prepares to click, the
 * placeholder becomes "real." Subtle but recognizable.
 *
 * This is intentionally a distinct component from ParActionButton
 * because:
 *   - It's always full-width within its container (not inline like
 *     ParActionButton).
 *   - The dashed treatment isn't a per-instance variant — it's the
 *     entire purpose of the component.
 *   - The "+ " prefix is part of the affordance convention; callers
 *     should always include it in the slot content.
 *
 * Pattern will recur (Add NPC, Add Faction, Add Quest Hook, etc.) so
 * extract now rather than re-implement per tab.
 *
 * Props:
 *   type     — 'button' (default) | 'submit' | 'reset'. Standard button
 *              type attribute; mostly stays 'button' since "add new"
 *              isn't typically a form submission.
 *   disabled — boolean. Greys out at lower opacity, blocks the click
 *              event.
 *
 * Slots:
 *   default — label content. Include the "+ " prefix; the component
 *             doesn't add it automatically because callers may want
 *             to vary it ("✚ Add", "+ Create New", etc.).
 */

defineOptions({ name: 'ParAddNewButton' });

defineProps({
  type: {
    type: String,
    default: 'button',
    validator: v => ['button', 'submit', 'reset'].includes(v),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['click']);
</script>

<style scoped>
.par-add-new {
  /* Native reset */
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
  outline: none;

  /* Layout */
  display: block;
  width: 100%;
  text-align: left;

  /* Surface — transparent rest, lapis tint on hover */
  background-color: transparent;
  color: var(--par-color-action-primary, #2A4D70);
  border: 1px dashed var(--par-color-action-primary, #2A4D70);
  border-radius: 0.2rem;

  /* Sizing */
  padding: 1.1rem 1.6rem;

  /* Typography — sans-serif to read as chrome action affordance, not
     editorial. Slightly larger than primary-outline because this
     button stands alone (one per section) rather than repeating per
     row, and the dashed border benefits from a bit more text weight
     to balance the placeholder framing. */
  font-family: var(--par-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.4;

  /* Interaction */
  cursor: pointer;
  user-select: none;
  transition: background-color 0.18s ease, border-style 0.18s ease;
}

/* Hover — dashed border solidifies as user prepares to click, light
   lapis tint fills in. Small affordance commit. */
.par-add-new:hover:not(:disabled) {
  background-color: var(--par-color-action-primary-hover-bg, rgba(42, 77, 112, 0.05));
  border-style: solid;
}

.par-add-new:active:not(:disabled) {
  background-color: rgba(42, 77, 112, 0.1);
}

.par-add-new:focus-visible {
  outline: 2px solid var(--par-color-action-primary, #2A4D70);
  outline-offset: 2px;
}

.par-add-new:disabled {
  color: rgba(42, 77, 112, 0.35);
  border-color: rgba(42, 77, 112, 0.35);
  cursor: not-allowed;
}
</style>
