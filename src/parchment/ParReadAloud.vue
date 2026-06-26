<template>
  <!-- `parchment` opts out of App.vue's global sans override so the serif is
       honored. -->
  <div class="par-read-aloud parchment">
    <p class="par-read-aloud__label">{{ label }}</p>
    <p class="par-read-aloud__body"><slot>{{ text }}</slot></p>
  </div>
</template>

<script setup>
/**
 * ParReadAloud — player-facing "read-aloud" block, the editorial register for
 * voice meant to be read to the table (distinct from GM-facing notes). Warm-tan
 * callout with a burgundy left rule, a contextual small-caps label, and italic
 * serif body prose.
 *
 * The label is contextual: a generic "Read aloud" for the opening, or a
 * triggered cue like "When the first handler transforms" / "If the boss flees".
 * Rendered uppercase via CSS, so pass it in sentence case.
 *
 * Reusable beyond encounters — lore passages, NPC dialogue, magic-item
 * descriptions: anywhere player-facing voice needs to read differently from
 * mechanical content.
 *
 * Body text via the `text` prop or the default slot (slot wins, for rich
 * content).
 */
defineProps({
  label: { type: String, default: 'Read aloud' },
  text: { type: String, default: '' },
});
</script>

<style scoped>
.par-read-aloud {
  background: var(--par-color-callout-bg, #f3ebda);
  border-left: 3px solid var(--par-color-title, #7a1f1f);
  border-radius: 0 var(--par-radius-md, 4px) var(--par-radius-md, 4px) 0;
  padding: 1.25rem 1.5rem;
  margin: 1.5rem 0;
}

.par-read-aloud__label {
  margin: 0 0 0.6rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.par-read-aloud__body {
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  line-height: 1.7;
  font-style: italic;
  color: var(--par-color-text, #222);
}
</style>
