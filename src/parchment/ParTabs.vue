<template>
  <!-- `parchment` opts out of App.vue's global font-family !important so
       the serif tab labels are honored. -->
  <div class="par-tabs parchment" role="tablist">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      type="button"
      role="tab"
      :id="`par-tabs-tab-${tab.id}`"
      :aria-selected="activeId === tab.id ? 'true' : 'false'"
      :aria-controls="`par-tabs-panel-${tab.id}`"
      :tabindex="activeId === tab.id ? 0 : -1"
      :class="['par-tabs__tab', { 'par-tabs__tab--active': activeId === tab.id }]"
      @click="$emit('update:activeId', tab.id)"
      @keydown="handleKeydown"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup>
/**
 * ParTabs — chrome tab strip primitive for view-switching across a single
 * content's multiple views. Renders only the strip; consumers render their
 * own panels and match panel IDs to `par-tabs-panel-${tab.id}` (plus
 * role="tabpanel", aria-labelledby="par-tabs-tab-${tab.id}", tabindex="0").
 *
 * Active tab: dark-lapis text + lapis underline — the active state lives
 * fully in the chrome (lapis) register. Inactive: muted gray, hover
 * deepens to body text.
 *
 * Roving tabindex: active tab is the only tab stop; Arrow Left/Right cycle,
 * Home/End jump to ends.
 */
const props = defineProps({
  // Array of { id, label }.
  tabs: { type: Array, required: true },
  activeId: { type: String, required: true },
});

const emit = defineEmits(['update:activeId']);

function handleKeydown(event) {
  const ids = props.tabs.map(t => t.id);
  const i = ids.indexOf(props.activeId);
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    emit('update:activeId', ids[(i + 1) % ids.length]);
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    emit('update:activeId', ids[(i - 1 + ids.length) % ids.length]);
  } else if (event.key === 'Home') {
    event.preventDefault();
    emit('update:activeId', ids[0]);
  } else if (event.key === 'End') {
    event.preventDefault();
    emit('update:activeId', ids[ids.length - 1]);
  }
}
</script>

<style scoped>
.par-tabs {
  display: flex;
  gap: 2rem;
  padding: 0 0.5rem;
  margin-bottom: 1.25rem;
  border-bottom: 0.5px solid var(--par-color-border-strong, #c9b99a);
}

.par-tabs__tab {
  background: transparent;
  border: none;
  padding: 0.5rem 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.8rem;
  font-weight: 400;
  color: var(--par-color-text-secondary, #555);
  cursor: pointer;
  border-bottom: 3px solid transparent;
  margin-bottom: -1px; /* aligns active underline with the strip's bottom border */
  transition: color 0.15s ease, border-color 0.15s ease;
}

.par-tabs__tab:hover {
  color: var(--par-color-text, #222);
}

.par-tabs__tab:focus {
  outline: none;
}

.par-tabs__tab:focus-visible {
  outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
  outline-offset: 2px;
  border-radius: 2px;
}

.par-tabs__tab--active {
  color: var(--color-action-hover, #2A4D70); /* dark lapis */
  font-weight: 600;
  border-bottom-color: var(--color-action-hover, #2A4D70); /* lapis underline — unifies the active state in the chrome register */
}
</style>
