<template>
  <!--
    Cross-tool seed affordance — sits above the form fields on a
    generator's landing page when the user arrived via a cross-tool
    seed flow (e.g., clicking "Create NPC" / "Create Setting" /
    "Create Dungeon" on an item card). Provides the "yes, this is
    happening from X" affirmation that the empty form otherwise lacks.

    Extracted from DungeonGenerator.vue once a second use case
    appeared (NPC + Setting generators want the same treatment). The
    component renders nothing when sourceType + sourceName aren't both
    provided, so callers can drop it in unconditionally and gate via
    prop binding rather than a parent v-if.

    Keep the messaging terse: backend processing (register inheritance,
    mode inference, dimensional presets) is intentionally NOT surfaced
    here. The user already knows what they clicked; the banner just
    confirms the context propagated.
  -->
  <div v-if="sourceType && sourceName" class="seeded-from-banner">
    <p class="seeded-from-banner__lead">
      Generating from {{ sourceType }}:
      <strong class="seeded-from-banner__name">{{ sourceName }}</strong>
    </p>
  </div>
</template>

<script setup>
defineProps({
  // Source tool type (e.g., 'item', 'dungeon', 'setting'). Lowercased
  // by convention; rendered verbatim in the banner copy.
  sourceType: {
    type: String,
    default: '',
  },
  // Display name of the source entity (the item name, dungeon name,
  // setting name). Rendered as the burgundy emphasis word.
  sourceName: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>
.seeded-from-banner {
  margin-bottom: 2rem;
  padding: 1.25rem 1.75rem;
  background: linear-gradient(
    135deg,
    rgba(122, 31, 31, 0.04),
    rgba(122, 31, 31, 0.08)
  );
  border-left: 3px solid var(--par-color-title, #7a1f1f);
  border-radius: 6px;
}

.seeded-from-banner__lead {
  margin: 0;
  font-size: 1.5rem;
  color: var(--par-color-text-secondary, #4a4a4a);
}

.seeded-from-banner__name {
  color: var(--par-color-title, #7a1f1f);
  font-weight: 600;
}
</style>
