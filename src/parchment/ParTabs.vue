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
 * Pill tabs: active tab is burgundy text on a warm-tan pill (editorial
 * register); inactive tabs are muted gray with no pill until hover, when a
 * lighter pill fades in and the text deepens. Labels are uppercase + tracked.
 * A hairline divider sits beneath the strip.
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
  gap: 0.5rem;
  padding: 0 0.25rem 1.5rem;
  margin-bottom: 1.75rem;
  /* Rule matches the active pill's warm-tan fill. */
  border-bottom: 2px solid var(--par-color-callout-bg, #f3ebda);
}

.par-tabs__tab {
  background: transparent;
  border: none;
  padding: 0.6rem 1.4rem;
  border-radius: var(--par-radius-md, 8px);
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--par-color-text-muted, #6b6b6b);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

/* Inactive tabs reveal a quiet pill on hover; the text deepens to body ink. */
.par-tabs__tab:hover {
  background: var(--par-color-callout-bg-light, #F8F2E3);
  color: var(--par-color-text, #222);
}

.par-tabs__tab:focus {
  outline: none;
}

.par-tabs__tab:focus-visible {
  outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
  outline-offset: 2px;
}

/* Active: burgundy on a warm-tan pill (editorial register). */
.par-tabs__tab--active,
.par-tabs__tab--active:hover {
  background: var(--par-color-callout-bg, #f3ebda);
  color: var(--par-color-title, #7a1f1f);
  font-weight: 600;
}
</style>
