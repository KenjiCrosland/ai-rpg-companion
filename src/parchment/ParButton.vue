<template>
  <button
    :type="type"
    class="par-button"
    :class="classes"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span v-if="$slots.icon" class="par-button__icon" aria-hidden="true">
      <slot name="icon" />
    </span>
    <slot />
  </button>
</template>

<script setup>
/**
 * ParButton — the primitive content-action button shared across cards
 * (item card, NPC card, future: dungeon/setting cards). Single source
 * of truth for the parchment-styled action button so the cards stay
 * in visual sync as we evolve them.
 *
 * Props:
 *   variant — 'default' (neutral action) | 'danger' (destructive)
 *   size    — 'default' (footer/body actions) | 'small' (header)
 *   type    — passed through to the native button (default 'button' so
 *             the button never accidentally submits a parent form)
 *   disabled
 *
 * Slots:
 *   default — button label
 *   icon    — optional icon, rendered before the label
 */

import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    // 'default' — outlined primary action (Save Changes, etc.)
    // 'ghost'   — quiet section affordance, no border, hover-tinted only
    //             (refresh / re-scan / "do this again" actions). Visually
    //             lighter than the action buttons that sit alongside it.
    // 'link'    — text-only treatment, no border, no background. For
    //             demoted secondary actions that shouldn't compete with
    //             the card's primary content (Edit item, etc.).
    // 'danger'  — destructive (Delete item).
    validator: v => ['default', 'ghost', 'link', 'danger'].includes(v),
  },
  size: {
    type: String,
    default: 'default',
    validator: v => ['default', 'small'].includes(v),
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['click']);

const classes = computed(() => ({
  'par-button--danger': props.variant === 'danger',
  'par-button--ghost': props.variant === 'ghost',
  'par-button--link': props.variant === 'link',
  'par-button--small': props.size === 'small',
}));
</script>

<style scoped>
/**
 * Reset block — Cedar's reset.css applies `-webkit-appearance: button`
 * and a `:focus { outline: ... -webkit-focus-ring-color }` to all
 * <button> elements. Without an explicit appearance reset and an
 * explicit outline rule here, the parchment styling fights the
 * native chrome on WebKit and the focus ring shows the wrong color.
 *
 * Fallback values are inlined alongside the `--par-*` tokens so the
 * button still renders correctly if `tokens.css` hasn't been imported
 * (e.g., a tool that bypasses `entries/base.js`).
 */
.par-button {
  /* Native reset */
  appearance: none;
  -webkit-appearance: none;
  margin: 0;

  /* Layout */
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;

  /* Surface */
  background: transparent;
  border: 1px solid var(--par-color-border, #e8e2d4);
  border-radius: var(--par-radius-sm, 3px);
  color: var(--par-color-title, #7a1f1f);

  /* Typography — explicit so the button matches the item-card-action it
     replaces regardless of the parent's font/line-height. */
  font-family: var(--par-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.4;

  /* Interaction */
  cursor: pointer;
  white-space: nowrap;
  outline: none;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.par-button:hover:not(:disabled) {
  background: var(--par-color-action-hover, rgba(122, 31, 31, 0.06));
  border-color: var(--par-color-title, #7a1f1f);
}

.par-button:active:not(:disabled) {
  background: var(--par-color-action-active, rgba(122, 31, 31, 0.12));
}

.par-button:focus-visible {
  outline: 2px solid var(--par-color-title, #7a1f1f);
  outline-offset: 2px;
}

.par-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Smaller variant for header/inline use. */
.par-button--small {
  font-size: 1.3rem;
  padding: 0.5rem 1rem;
}

/* Ghost variant: quiet section affordance. No visible border so it doesn't
   compete with outlined action buttons sitting alongside it; burgundy
   text + soft warm hover wash carry the affordance signal. Use for
   refresh / re-scan / "do this again" actions where the button is a
   convenience, not the primary CTA. */
.par-button--ghost {
  border-color: transparent;
}

.par-button--ghost:hover:not(:disabled) {
  border-color: transparent;
  background: var(--par-color-action-hover, rgba(122, 31, 31, 0.06));
  color: var(--par-color-title, #7a1f1f);
}

/* Link variant: demoted text-only treatment. No border, no background,
   no hover wash — just burgundy text that underlines on hover. Sized
   smaller than default so it reads as a quiet secondary affordance
   that doesn't compete with the card's primary content. */
.par-button--link {
  border-color: transparent;
  background: transparent;
  padding: 0.4rem 0.8rem;
  font-size: 1.3rem;
}

.par-button--link:hover:not(:disabled) {
  border-color: transparent;
  background: transparent;
  color: var(--par-color-title-deep, #58180d);
  text-decoration: underline;
}

/* Danger variant: muted by default, warms up on hover. */
.par-button--danger {
  color: var(--par-color-text-muted, #6b6b6b);
}

.par-button--danger:hover:not(:disabled) {
  color: var(--par-color-title, #7a1f1f);
  border-color: var(--par-color-title, #7a1f1f);
  background: var(--par-color-action-hover, rgba(122, 31, 31, 0.06));
}

.par-button__icon {
  display: inline-flex;
  align-items: center;
  font-size: 1.4rem;
  line-height: 1;
}
</style>
