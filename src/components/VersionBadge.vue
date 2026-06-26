<template>
  <!-- `parchment` opts the badge out of App.vue's global sans override. -->
  <span class="version-badge parchment" :class="{ 'version-badge--premium': premium }">
    {{ premium ? 'Premium' : 'Free' }}
  </span>
</template>

<script setup>
/**
 * VersionBadge — the standardized Free / Premium pill shown beside the tool
 * brand name in every generator's hero header. A composed feature component
 * (not a parchment primitive): it knows about the Free/Premium concept and
 * owns its own copy, so one size/treatment is shared across all tools.
 *
 * Show/hide logic (e.g. suppressing the badge during seeded cross-tool flows)
 * stays in the consumer via `v-if`; this component only renders the pill for
 * a given premium state.
 */
defineProps({
  premium: { type: Boolean, default: false },
});
</script>

<style scoped>
.version-badge {
  display: inline-block;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.05rem;
  font-weight: 500;
  font-style: italic;
  padding: 0.1rem 0.6rem;
  border-radius: var(--par-radius-sm, 3px);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  background: transparent;
  color: var(--par-color-text-muted, #6b6b6b);
  letter-spacing: 0.02em;
  white-space: nowrap;
  vertical-align: middle;
}

/* Premium — warm gold accent (the one place gold enters the palette, by
   convention; there's no parchment "gold" token, so the hex lives here). */
.version-badge--premium {
  border-color: #c8a24a;
  background: rgba(253, 243, 224, 0.5);
  color: #9c6a0a;
}
</style>
