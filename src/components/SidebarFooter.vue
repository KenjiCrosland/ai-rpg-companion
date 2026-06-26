<template>
  <!-- Pinned sidebar footer shared by every generator's sidebar: the
       "+ New X" CTA, a quiet "Data options" disclosure (backup/restore +
       delete-all), and the delete-all confirmation modal.

       SAFETY CONTRACT: this component owns only the chrome. It never
       touches storage. The destructive path emits `delete-all` ONLY after
       the user confirms in the modal; the consuming tool wires that event
       to its OWN delete handler, so each tool deletes its own data and
       nothing else. Same for `new` and `open-data-manager`. -->
  <div class="sidebar-footer">
    <ParButton variant="primary" :full-width="true" @click="$emit('new')">
      {{ newLabel }}
    </ParButton>

    <div class="sidebar-footer__divider"></div>

    <div class="sidebar-data-options">
      <button
        class="sidebar-data-options__toggle"
        @click="expanded = !expanded"
        :aria-expanded="expanded"
        aria-controls="sidebar-data-options-panel"
        data-testid="data-options-toggle"
      >
        <span>Data options</span>
        <svg
          class="sidebar-data-options__icon"
          :class="{ 'is-expanded': expanded }"
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      <div
        v-if="expanded"
        id="sidebar-data-options-panel"
        class="sidebar-data-options__panel"
      >
        <p class="sidebar-data-options__description">{{ dataDescription }}</p>

        <button class="sidebar-data-options__action" @click="$emit('open-data-manager')">
          {{ backupLabel }}
        </button>

        <button
          class="sidebar-data-options__action sidebar-data-options__action--danger"
          @click="showDeleteConfirmation = true"
          data-testid="data-options-delete-all"
        >
          {{ deleteAllLabel }}
        </button>
      </div>
    </div>

    <ParModal
      :opened="showDeleteConfirmation"
      :title="confirmTitle"
      @cancel="showDeleteConfirmation = false"
    >
      <p class="delete-all-modal__body">{{ confirmBody }}</p>
      <p v-if="confirmSuggestion" class="delete-all-modal__suggestion">{{ confirmSuggestion }}</p>
      <template #footer>
        <ParButton variant="secondary" @click="showDeleteConfirmation = false">Cancel</ParButton>
        <ParButton variant="destructive" @click="onConfirmDelete">{{ confirmCta }}</ParButton>
      </template>
    </ParModal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ParButton, ParModal } from '@/parchment';

defineProps({
  // "+ New magic item", "+ New encounter", etc.
  newLabel: { type: String, required: true },
  // Italic description inside the data-options panel.
  dataDescription: {
    type: String,
    default: 'Save your data to a file or restore from a backup. Your data stays on your device.',
  },
  // "Backup / Restore library", etc.
  backupLabel: { type: String, default: 'Backup / Restore' },
  // "Delete all items", "Delete all settings", etc. — the danger row label.
  deleteAllLabel: { type: String, required: true },
  // Confirmation modal copy.
  confirmTitle: { type: String, required: true },
  confirmBody: { type: String, required: true },
  confirmSuggestion: { type: String, default: '' },
  // Destructive CTA label inside the modal (defaults to the danger-row label).
  confirmCta: { type: String, default: '' },
});

const emit = defineEmits(['new', 'open-data-manager', 'delete-all']);

const expanded = ref(false);
const showDeleteConfirmation = ref(false);

// Confirmed destructive intent. The modal closes and the tool's own
// handler (wired to @delete-all) performs the actual deletion.
function onConfirmDelete() {
  showDeleteConfirmation.value = false;
  emit('delete-all');
}
</script>

<style scoped>
.sidebar-footer {
  flex-shrink: 0;
  padding: 12px 16px;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

/* Thin tan divider between the primary new-item button and the quiet
   Data options affordance below it. */
.sidebar-footer__divider {
  height: 0;
  border-top: 0.5px solid var(--par-color-border, #e8e2d4);
  margin: 0.75rem 0;
}

/* Quiet expandable affordance for library data operations — lifted-lapis
   label + gear, expanding into a warm-tan panel of slate-ghost actions. */
.sidebar-data-options__toggle {
  /* Full-bleed row: negative margins cancel the footer's 16px side padding
     so the hover tint spans the sidebar edge-to-edge, matching the item
     rows above. Label + gear centered as a group with a small gap. */
  margin: 0 -16px;
  padding: 12px 16px;
  width: calc(100% + 32px);
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.4rem;
  color: var(--color-action-rest, #365A85);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.sidebar-data-options__toggle:hover {
  background-color: rgba(243, 235, 218, 0.4);
  color: var(--color-action-hover, #2A4D70);
}

.sidebar-data-options__toggle:focus-visible {
  outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
  outline-offset: -2px;
}

.sidebar-data-options__icon {
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  color: currentColor;
  transition: transform 0.2s ease;
}

.sidebar-data-options__icon.is-expanded {
  transform: rotate(30deg);
}

.sidebar-data-options__panel {
  margin-top: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--par-color-callout-bg, #f3ebda);
  border-radius: 8px;
}

.sidebar-data-options__description {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.2rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.5;
  margin: 0 0 0.75rem;
}

.sidebar-data-options__action {
  width: 100%;
  padding: 7px 12px;
  background: transparent;
  color: var(--color-action-secondary-rest, #5A7A9A);
  border: 0.5px solid var(--color-action-secondary-rest, #5A7A9A);
  border-radius: 6px;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  margin-bottom: 0.4rem;
}

.sidebar-data-options__action:last-child {
  margin-bottom: 0;
}

.sidebar-data-options__action:hover {
  background-color: var(--color-action-secondary-hover-bg, rgba(90, 122, 154, 0.08));
  color: var(--color-action-rest, #365A85);
  border-color: var(--color-action-rest, #365A85);
}

.sidebar-data-options__action:focus-visible {
  outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
  outline-offset: 2px;
}

/* Destructive action — destructive-red text (its own register, not editorial
   burgundy): subtle caution signal; slate border deepens to red on hover. */
.sidebar-data-options__action--danger {
  color: var(--par-color-destructive, #A03333);
}

.sidebar-data-options__action--danger:hover {
  background-color: var(--par-color-destructive-bg-hover, rgba(160, 51, 51, 0.06));
  color: var(--par-color-destructive, #A03333);
  border-color: var(--par-color-destructive, #A03333);
}

/* Delete-all confirmation modal body (ParModal provides the surface/chrome;
   the destructive confirm CTA is now ParButton variant="destructive"). */
.delete-all-modal__body {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  line-height: 1.6;
  color: var(--par-color-text, #222);
  margin: 0 0 0.75rem;
}

.delete-all-modal__suggestion {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.4rem;
  line-height: 1.6;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  margin: 0;
}
</style>
