<template>
  <div class="par-callout parchment">
    <slot />
  </div>
</template>

<script setup>
/**
 * ParCallout — tinted parchment surface primitive.
 *
 * The "tinted block on the parchment surface" pattern. Wraps slot content
 * in a warm-tan rounded card with parchment serif typography. Used for:
 *   - Premium status blocks ("All features unlimited. Save/Load…")
 *   - Future: tip callouts, beta notices, any "this is supplementary
 *     content that lives on the parchment surface" pattern.
 *
 * PatreonCallout has its own version of this surface inline rather than
 * composing ParCallout — that's intentional, not technical debt. The
 * upsell has tighter coupling to its body/aside/expandable structure
 * and benefits from owning its own surface CSS. ParCallout coordinates
 * with PatreonCallout through shared `--par-color-callout-*` tokens, so
 * the two surfaces stay visually identical without code coupling.
 *
 * Conventions:
 *   - Wraps a single default slot. No props. Style via tokens, not props.
 *   - `:slotted(p)` styles paragraphs by default — drop a plain `<p>`
 *     in and it picks up serif body treatment, no extra class needed.
 *   - `.parchment` marker class on the root opts out of App.vue's global
 *     sans-serif override (same pattern as NPCCard, ItemCard,
 *     PatreonCallout).
 *
 * If a use case needs a label, an aside, or other internal structure
 * (PatreonCallout does), build that as a feature component composing
 * ParCallout — don't extend ParCallout's API.
 */
defineOptions({ name: 'ParCallout' });
</script>

<style scoped>
.par-callout {
  background-color: var(--par-color-callout-bg, #f3ebda);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  padding: 1.75rem 2rem;
  margin: 1rem 0;
  /* Defensive: some legacy parent wrappers in this codebase apply
     text-align: center as part of their SaaS-styled chrome. The callout
     is always left-aligned regardless of context. Same defensive pattern
     as PatreonCallout. */
  text-align: left;
}

/* Default paragraph styling for slotted content. Consumers can drop a
   `<p>` inside ParCallout and it picks up the parchment body treatment
   automatically. Use `:slotted(p)` rather than `p` because the consumer's
   paragraphs carry the parent's [data-v-] scope, not ParCallout's. */
.par-callout :slotted(p) {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 16px;
  color: var(--par-color-text, #222);
  line-height: 1.6;
  font-weight: 400;
  margin: 0 0 1rem;
}

/* Tighten the gap between the last paragraph and the action that
   follows it — typically a button. Matches PatreonCallout's body-to-
   actions spacing for visual parity. */
.par-callout :slotted(p:last-of-type) {
  margin-bottom: 1.25rem;
}
</style>
