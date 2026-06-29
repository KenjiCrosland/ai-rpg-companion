<template>
  <nav class="chars parchment" aria-label="Characters" :data-open="open">
    <h2 class="chars__title">Characters</h2>

    <ul class="chars__list">
      <li
        v-for="c in characters"
        :key="c.id"
        class="char-row"
        :class="{ 'char-row--active': c.id === currentId }"
      >
        <button
          class="char-row__select"
          type="button"
          :aria-current="c.id === currentId ? 'true' : null"
          @click="$emit('select', c.id)"
        >
          <span class="char-row__name">{{ c.name || 'Unnamed character' }}</span>
          <span class="char-row__meta">
            {{ c.itemCount }} item{{ c.itemCount === 1 ? '' : 's' }} · {{ formatWeight(c.totalWeight) }} lb
          </span>
        </button>
        <button
          class="char-row__delete"
          type="button"
          :aria-label="`Delete ${c.name || 'character'}`"
          title="Delete character"
          @click="$emit('remove', c.id)"
        >×</button>
      </li>
    </ul>

    <button class="chars__new" type="button" @click="$emit('add')">+ New character</button>
  </nav>
</template>

<script setup>
/**
 * Left-rail character roster — one entry per character, matching the generator
 * suite's sidebar look. Selecting switches the active inventory; each row can be
 * deleted (parent confirms); the footer button adds a new character.
 */
defineProps({
  characters: { type: Array, default: () => [] },
  currentId: { type: String, default: null },
  open: { type: Boolean, default: false }, // off-canvas reveal on narrow screens
});

defineEmits(['select', 'add', 'remove']);

function formatWeight(w) {
  const n = Number(w) || 0;
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}
</script>

<style scoped>
.chars {
  flex: none;
  align-self: flex-start;
  position: sticky;
  top: 0;
  width: 25rem;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--par-color-surface-card, #fefbf4);
  border-right: 0.5px solid var(--par-color-border-strong, #c9b99a);
  overflow-y: auto;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
}

@media (max-width: 860px) {
  /* Off-canvas: collapsed by default, slides in over the content when opened. */
  .chars {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
    width: 28rem;
    max-width: 80vw;
    height: 100vh;
    height: 100dvh;
    border-right: 0.5px solid var(--par-color-border-strong, #c9b99a);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  .chars[data-open='true'] {
    transform: translateX(0);
  }
}
@media (max-width: 860px) and (prefers-reduced-motion: reduce) {
  .chars {
    transition: none;
  }
}

.chars__title {
  margin: 0;
  padding: 1.3rem 1.6rem 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-action-hover, #2a4d70);
}

.chars__list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 0.5px solid var(--par-color-divider, #e2dccd);
}

.char-row {
  position: relative;
  display: flex;
  align-items: stretch;
}
.char-row + .char-row {
  border-top: 0.5px solid var(--par-color-divider, #e2dccd);
}

.char-row__select {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 1.1rem 1.6rem;
  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.15s ease;
}
.char-row__select:hover {
  background-color: rgba(243, 235, 218, 0.4);
}
.char-row__select:focus-visible {
  outline: 2px solid var(--color-action-secondary-rest, #5a7a9a);
  outline-offset: -2px;
}

.char-row__name {
  font-size: 1.6rem;
  line-height: 1.25;
  color: var(--par-color-text, #222);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.char-row__meta {
  font-size: 1.25rem;
  color: var(--par-color-text-secondary, #555);
}

/* Active entry: warm tan wash + lapis name, matching the suite sidebars. */
.char-row--active .char-row__select {
  background-color: var(--par-color-callout-bg, #f3ebda);
}
.char-row--active .char-row__name {
  color: var(--color-action-hover, #2a4d70);
  font-weight: 600;
}
.char-row--active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--color-action-rest, #365a85);
}

.char-row__delete {
  flex: none;
  width: 3.2rem;
  border: none;
  background: transparent;
  color: var(--par-color-text-muted, #6b6b6b);
  font-size: 1.8rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.12s ease, color 0.12s ease, background 0.12s ease;
}
.char-row:hover .char-row__delete,
.char-row__delete:focus-visible {
  opacity: 0.7;
}
.char-row__delete:hover,
.char-row__delete:focus-visible {
  opacity: 1;
  background: rgba(160, 51, 51, 0.12);
  color: var(--par-color-destructive, #a03333);
}

.chars__new {
  margin: 0;
  padding: 1.2rem 1.6rem;
  text-align: left;
  background: transparent;
  border: none;
  border-top: 0.5px solid var(--par-color-divider, #e2dccd);
  font-family: inherit;
  font-size: 1.4rem;
  color: var(--color-action-rest, #365a85);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.chars__new:hover {
  background-color: rgba(243, 235, 218, 0.4);
  color: var(--color-action-hover, #2a4d70);
}
.chars__new:focus-visible {
  outline: 2px solid var(--color-action-secondary-rest, #5a7a9a);
  outline-offset: -2px;
}
</style>
