<template>
  <Teleport to="body">
    <transition name="par-modal">
      <div
        v-if="opened"
        class="par-modal-backdrop"
        role="presentation"
        @click.self="onBackdrop"
      >
        <div
          ref="dialogEl"
          class="par-modal"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          tabindex="-1"
        >
          <header class="par-modal__header">
            <h3 :id="titleId" class="par-modal__title">
              {{ title }}
            </h3>
            <button
              v-if="dismissible"
              type="button"
              class="par-modal__close"
              :aria-label="closeLabel"
              @click="onCancel"
            >
              <span aria-hidden="true">×</span>
            </button>
          </header>

          <div class="par-modal__body">
            <slot />
          </div>

          <footer v-if="hasFooter" class="par-modal__footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick, useId, useSlots, computed } from 'vue';

const props = defineProps({
  // Drives visibility. Parent controls open/close imperatively.
  opened: { type: Boolean, default: false },
  // Required — sets the heading text and the dialog's accessible name
  // via aria-labelledby. Use a sentence; small-caps treatment is
  // applied by the modal style.
  title: { type: String, required: true },
  // Show the × close affordance in the header. Set to false for
  // modals that must be resolved by an explicit action (rare).
  dismissible: { type: Boolean, default: true },
  // Click on the backdrop emits cancel. Disable for modals where
  // accidental dismissal is costly (mid-flow forms).
  closeOnBackdrop: { type: Boolean, default: true },
  // ESC key emits cancel. Off only if the parent needs to handle ESC
  // for its own keyboard flow (e.g., nested forms).
  closeOnEscape: { type: Boolean, default: true },
  // Override for the close button's aria-label.
  closeLabel: { type: String, default: 'Close' },
});

const emit = defineEmits(['cancel']);

const titleId = useId();
const dialogEl = ref(null);
const slots = useSlots();

const hasFooter = computed(() => Boolean(slots.footer));

// Focus the dialog on open so keyboard users land inside, and the ESC
// handler below has a focused element to listen on.
watch(() => props.opened, async (isOpen) => {
  if (isOpen) {
    await nextTick();
    dialogEl.value?.focus();
    if (props.closeOnEscape) document.addEventListener('keydown', onKeydown);
  } else {
    document.removeEventListener('keydown', onKeydown);
  }
});

function onKeydown(event) {
  if (event.key === 'Escape') onCancel();
}

function onBackdrop() {
  if (props.closeOnBackdrop) onCancel();
}

function onCancel() {
  emit('cancel');
}
</script>

<style scoped>
.par-modal-backdrop {
  position: fixed;
  inset: 0;
  /* Cool-toned backdrop — leans the dim toward the lapis chrome
     register rather than the warm-brown shadow the parchment cards
     use. Modals sit on UI chrome, not on card surfaces. */
  background-color: rgba(20, 30, 50, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  z-index: 1000;
}

/* Parchment surface with lapis chrome accents — cream bg matches the
   parchment card register (consistent with how cards/forms feel
   throughout the app), and lapis is reserved for the *chrome* layer:
   border rules, title color, close-button hover, and any
   consumer-provided callouts inside the body. The split keeps the
   modal feeling like a parchment surface lifted off the page, not
   a foreign lapis panel. Consumers can layer pale-lapis surfaces
   (--par-color-readaloud-bg) for inner callouts that need to call
   attention to themselves against the parchment ground. */
.par-modal {
  background-color: var(--par-color-surface, #FBF7F0);
  color: var(--par-color-text, #222);
  border: 2px solid var(--par-color-readaloud-rule, #7A8FAA);
  border-top-width: 4px;
  border-radius: 2px;
  width: min(560px, 100%);
  max-height: calc(100vh - 3rem);
  display: flex;
  flex-direction: column;
  box-shadow: 0 12px 32px rgba(20, 30, 50, 0.35),
              0 4px 8px rgba(20, 30, 50, 0.2);
  font-family: var(--par-font-sans);
  outline: none;
}

.par-modal__header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem 1.75rem 1rem;
  border-bottom: 1px solid var(--par-color-readaloud-rule, #7A8FAA);
}

.par-modal__title {
  font-family: var(--par-font-serif);
  /* Deep lapis title — the chrome-action-hover value (deeper than
     primary-rest) reads as authoritative at small-caps weight against
     the pale lapis surface. */
  color: var(--color-action-hover);
  font-variant-caps: small-caps;
  font-weight: 600;
  font-size: 1.9rem;
  letter-spacing: 0.04em;
  line-height: 1.2;
  margin: 0;
  flex: 1;
}

.par-modal__close {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 2.2rem;
  line-height: 1;
  color: var(--par-color-action-muted);
  padding: 0 0.4rem;
  border-radius: 2px;
  transition: color 120ms ease, background-color 120ms ease;
}

.par-modal__close:hover,
.par-modal__close:focus-visible {
  color: var(--color-action-hover);
  background-color: var(--par-color-action-primary-hover-bg);
  outline: none;
}

.par-modal__body {
  padding: 1.5rem 1.75rem 0.5rem;
  overflow-y: auto;
  color: var(--par-color-text, #222);
}

.par-modal__footer {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding: 1rem 1.75rem 1.5rem;
  border-top: 1px solid var(--par-color-readaloud-rule, #7A8FAA);
}

/* Open/close transition — quick fade and a slight rise. Restraint
   intentional; this is a chrome moment, not a celebration. */
.par-modal-enter-active,
.par-modal-leave-active {
  transition: opacity 160ms ease;
}
.par-modal-enter-active .par-modal,
.par-modal-leave-active .par-modal {
  transition: transform 160ms ease, opacity 160ms ease;
}
.par-modal-enter-from,
.par-modal-leave-to {
  opacity: 0;
}
.par-modal-enter-from .par-modal,
.par-modal-leave-to .par-modal {
  opacity: 0;
  transform: translateY(8px);
}
</style>
