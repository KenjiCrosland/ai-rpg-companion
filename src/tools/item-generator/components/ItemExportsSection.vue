<template>
  <div class="item-exports-section parchment">
    <h3 class="item-exports-heading">{{ heading }}</h3>

    <p v-if="$slots.description" class="item-exports-description">
      <slot name="description" />
    </p>

    <div class="item-exports-buttons">
      <slot name="buttons" />
    </div>

    <div v-if="$slots.tip" class="item-exports-tip">
      <slot name="tip" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  heading: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
/* Shared export panel — parchment register (serif, warm-tan surface, tokens).
   Used across the item, lore, quest-hook, and setting exports so they read
   identically. */
.item-exports-section {
  max-width: 850px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--par-color-callout-bg, #f3ebda);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

.item-exports-heading {
  margin: 0 0 1rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--color-action-hover, #2A4D70); /* dark lapis — export headers are lapis across the board */
}

.item-exports-description {
  margin: 0 0 1.5rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.45rem;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.6;
}

.item-exports-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.item-exports-tip {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.35rem;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.6;
}

/* Inline links (Homebrewery references) — lapis to match the chrome action
   color used elsewhere in the export panels. */
.item-exports-description :deep(a),
.item-exports-tip :deep(a) {
  color: var(--color-action-hover, #2A4D70);
  text-decoration: underline;
}

@media (max-width: 600px) {
  .item-exports-section {
    padding: 1.5rem;
  }

  .item-exports-buttons {
    flex-direction: column;

    :deep(button) {
      width: 100%;
    }
  }
}
</style>
