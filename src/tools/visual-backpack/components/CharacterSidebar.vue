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
        <!-- ACTIVE: editable identity (name, strength, capacity, metadata). -->
        <template v-if="c.id === currentId">
          <input
            :ref="setActiveNameEl"
            class="char-row__name-input"
            type="text"
            :value="characterName"
            placeholder="Name this character"
            maxlength="40"
            autocomplete="off"
            aria-label="Character name"
            @input="$emit('update:characterName', $event.target.value)"
          />
          <div class="char-row__stat">
            <span class="char-row__stat-label">Strength</span>
            <div class="str-compact">
              <button
                type="button"
                aria-label="Decrease strength"
                :disabled="strength <= 1"
                @click="$emit('update:strength', strength - 1)"
              >−</button>
              <span class="str-compact__value">{{ strength }}</span>
              <button
                type="button"
                aria-label="Increase strength"
                :disabled="strength >= 30"
                @click="$emit('update:strength', strength + 1)"
              >+</button>
            </div>
          </div>
          <p class="char-row__capacity">capacity {{ strength * 15 }} lb</p>
          <p class="char-row__meta char-row__meta--active">{{ metaLine(c) }}</p>
        </template>

        <!-- INACTIVE: compact, selectable. -->
        <button v-else class="char-row__select" type="button" @click="$emit('select', c.id)">
          <span class="char-row__name">{{ c.name || 'Unnamed character' }}</span>
          <span class="char-row__meta">{{ metaLine(c) }}</span>
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
 * Character roster + identity editing. The active character's row expands inline
 * to edit its name and strength (and show capacity + pack metadata); inactive
 * rows stay compact and selectable. The single home for character identity — the
 * pack card is purely about the pack.
 */
import { ref } from 'vue';

defineProps({
  characters: { type: Array, default: () => [] },
  currentId: { type: String, default: null },
  open: { type: Boolean, default: false }, // off-canvas reveal on narrow screens
  characterName: { type: String, default: '' }, // active character's name (editable)
  strength: { type: Number, default: 10 }, // active character's strength (editable)
});

defineEmits(['select', 'add', 'remove', 'update:characterName', 'update:strength']);

// Focus target for the active name input (so "+ New character" lands the cursor there).
const activeNameEl = ref(null);
const setActiveNameEl = (el) => {
  if (el) activeNameEl.value = el;
};
defineExpose({ focusName: () => activeNameEl.value?.focus() });

function formatWeight(w) {
  const n = Number(w) || 0;
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}
function metaLine(c) {
  return `${c.itemCount} item${c.itemCount === 1 ? '' : 's'} · ${formatWeight(c.totalWeight)} lb`;
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
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-action-hover, #2a4d70);
}

.chars__list {
  list-style: none;
  margin: 0;
  padding: 0 0.8rem;
}

/* --- row shell -------------------------------------------------------- */
.char-row {
  position: relative;
  border-radius: var(--par-radius-md, 4px);
}
.char-row + .char-row {
  margin-top: 0.2rem;
}

/* delete affordance (top-right, quiet until hover/focus) */
.char-row__delete {
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
  z-index: 1;
  width: 2.4rem;
  height: 2.4rem;
  border: none;
  background: transparent;
  color: var(--par-color-text-muted, #6b6b6b);
  font-size: 1.8rem;
  line-height: 1;
  cursor: pointer;
  border-radius: 50%;
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

/* --- inactive row ----------------------------------------------------- */
.char-row__select {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  width: 100%;
  padding: 0.7rem 0.85rem;
  text-align: left;
  background: transparent;
  border: none;
  border-radius: var(--par-radius-md, 4px);
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.15s ease;
}
.char-row__select:hover {
  background-color: rgba(243, 235, 218, 0.5);
}
.char-row__select:focus-visible {
  outline: 2px solid var(--color-action-secondary-rest, #5a7a9a);
  outline-offset: -2px;
}
.char-row__name {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--par-color-text, #2c2c2a);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1.8rem; /* clear the delete × */
}
.char-row__meta {
  font-size: 1.1rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}

/* --- active row (editable identity) ----------------------------------- */
.char-row--active {
  background: var(--par-color-callout-bg, #f3ebda);
  padding: 0.85rem 0.85rem 0.75rem;
}
.char-row__name-input {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 0.5rem;
  padding: 0.35rem 2.4rem 0.35rem 0.55rem; /* right pad clears the delete × */
  background: var(--par-color-surface, #fbf7f0);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-sm, 3px);
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  outline: none;
  transition: border-color 0.15s ease;
}
.char-row__name-input::placeholder {
  color: var(--par-color-text-muted, #6b6b6b);
  font-weight: 400;
  font-style: italic;
}
.char-row__name-input:focus {
  border-color: var(--color-action-active, #1f3a5c);
}

.char-row__stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
}
.char-row__stat-label {
  flex-shrink: 0;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-action-hover, #2a4d70);
}
.str-compact {
  display: inline-grid;
  grid-template-columns: 2.2rem 3.2rem 2.2rem;
  align-items: stretch;
  background: var(--par-color-surface, #fbf7f0);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-sm, 3px);
  overflow: hidden;
}
.str-compact button {
  height: 2.6rem;
  border: none;
  background: transparent;
  color: var(--color-action-hover, #2a4d70);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  font-family: inherit;
}
.str-compact button:hover:not(:disabled) {
  background: rgba(42, 77, 112, 0.1);
}
.str-compact button:disabled {
  color: var(--par-color-text-disabled, #ccc);
  cursor: not-allowed;
}
.str-compact__value {
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-right: 0.5px solid var(--par-color-border-strong, #c9b99a);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--par-color-text, #222);
}
.char-row__capacity {
  margin: 0.3rem 0 0;
  font-size: 1.1rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
}
.char-row__meta--active {
  margin: 0.45rem 0 0;
  padding-top: 0.45rem;
  border-top: 0.5px solid rgba(201, 185, 154, 0.5);
}

/* --- new character ---------------------------------------------------- */
.chars__new {
  display: block;
  width: calc(100% - 1.6rem);
  margin: 0.5rem 0.8rem 1rem;
  padding: 0.6rem 0.85rem;
  text-align: left;
  background: transparent;
  border: 0.5px dashed var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
  font-family: inherit;
  font-size: 1.3rem;
  font-style: italic;
  color: var(--color-action-hover, #2a4d70);
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.chars__new:hover {
  background-color: rgba(243, 235, 218, 0.5);
}
.chars__new:focus-visible {
  outline: 2px solid var(--color-action-secondary-rest, #5a7a9a);
  outline-offset: -2px;
}
</style>
