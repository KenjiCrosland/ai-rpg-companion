<template>
  <button
    :type="type"
    class="par-card-button"
    :class="classes"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span v-if="$slots.icon" class="par-card-button__icon" aria-hidden="true">
      <slot name="icon" />
    </span>
    <slot />
  </button>
</template>

<script setup>
/**
 * ParCardButton — the primitive content-action button shared across cards
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
    // Semantic variants (the canonical set — color carries meaning):
    // 'create'      — lapis. "Make something new": insert / generate /
    //                 "+ Add Event". The only place lapis enters the
    //                 card register (see note below).
    // 'affirmative' — burgundy outline. Act on what already exists in a
    //                 reversible way: Edit / Regenerate.
    // 'primary'     — burgundy, filled/emphasized. The committing action:
    //                 Keep / Save / Update Item Lore.
    // 'muted'       — recessive gray. Cancel / Remove. Quiet, not invisible.
    //
    // Legacy variants (kept for existing item-card / NPC-card consumers):
    // 'default' — outlined burgundy action (≈ 'affirmative').
    // 'ghost'   — quiet section affordance, no border, hover-tinted only.
    // 'link'    — text-only, no border/background. Demoted secondary action.
    // 'danger'  — destructive; gray at rest, warms to burgundy on hover.
    //
    // NOTE — lapis on a card button. The parchment system otherwise
    // reserves lapis for the chrome layer (ParButton) and keeps the card
    // register burgundy. The 'create' variant is a deliberate exception:
    // lapis is the suite-level "create / generate" semantic, so it reads
    // the same whether it sits on chrome or on a content surface.
    validator: v =>
      ['create', 'affirmative', 'primary', 'muted',
       'default', 'ghost', 'link', 'danger'].includes(v),
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
  'par-card-button--create': props.variant === 'create',
  'par-card-button--affirmative': props.variant === 'affirmative',
  'par-card-button--primary': props.variant === 'primary',
  'par-card-button--muted': props.variant === 'muted',
  'par-card-button--danger': props.variant === 'danger',
  'par-card-button--ghost': props.variant === 'ghost',
  'par-card-button--link': props.variant === 'link',
  'par-card-button--small': props.size === 'small',
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
.par-card-button {
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

.par-card-button:hover:not(:disabled) {
  background: var(--par-color-action-hover, rgba(122, 31, 31, 0.06));
  border-color: var(--par-color-title, #7a1f1f);
}

.par-card-button:active:not(:disabled) {
  background: var(--par-color-action-active, rgba(122, 31, 31, 0.12));
}

.par-card-button:focus-visible {
  outline: 2px solid var(--par-color-title, #7a1f1f);
  outline-offset: 2px;
}

.par-card-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Smaller variant for header/inline use. */
.par-card-button--small {
  font-size: 1.3rem;
  padding: 0.5rem 1rem;
}

/* ------------------------------------------------------------------
   Semantic variants. Each declares its OWN text color explicitly
   rather than inheriting the base burgundy — a global control style
   was washing the colors out, so color is pinned per variant.
   ------------------------------------------------------------------ */

/* create — lapis. The "make something new" affordance. Lapis text +
   outline at rest; fills with a light lapis wash on hover. */
.par-card-button--create {
  color: var(--color-action-rest, #365A85);
  border-color: var(--color-action-rest, #365A85);
}

.par-card-button--create:hover:not(:disabled) {
  color: var(--color-action-hover, #2A4D70);
  border-color: var(--color-action-hover, #2A4D70);
  background: var(--par-color-action-primary-hover-bg, rgba(42, 77, 112, 0.08));
}

.par-card-button--create:active:not(:disabled) {
  background: var(--color-action-secondary-active-bg, rgba(90, 122, 154, 0.16));
}

.par-card-button--create:focus-visible {
  outline-color: var(--color-action-rest, #365A85);
}

/* affirmative — burgundy outline. Reversible action on existing content
   (Edit / Regenerate). Matches the base outline treatment but pins the
   color so it never inherits from a washed-out parent. */
.par-card-button--affirmative {
  color: var(--par-color-title, #7a1f1f);
  border-color: var(--par-color-border, #e8e2d4);
}

.par-card-button--affirmative:hover:not(:disabled) {
  color: var(--par-color-title, #7a1f1f);
  border-color: var(--par-color-title, #7a1f1f);
  background: var(--par-color-action-hover, rgba(122, 31, 31, 0.06));
}

/* primary — filled burgundy. The committing action (Keep / Save /
   Update Item Lore). Cream text on a solid burgundy ground. */
.par-card-button--primary {
  color: var(--par-color-surface, #FBF7F0);
  background: var(--par-color-title, #7a1f1f);
  border-color: var(--par-color-title, #7a1f1f);
}

.par-card-button--primary:hover:not(:disabled) {
  color: var(--par-color-surface, #FBF7F0);
  background: var(--par-color-title-deep, #58180d);
  border-color: var(--par-color-title-deep, #58180d);
}

.par-card-button--primary:active:not(:disabled) {
  background: var(--par-color-title-deep, #58180d);
}

/* muted — recessive gray. Quiet, not invisible (Cancel / Remove). Stays
   above the contrast line at rest; firms to a darker gray on hover. */
.par-card-button--muted {
  color: var(--par-color-text-muted, #6b6b6b);
  border-color: var(--par-color-border, #e8e2d4);
}

.par-card-button--muted:hover:not(:disabled) {
  color: var(--par-color-text, #222);
  border-color: var(--par-color-text-muted, #6b6b6b);
  background: var(--par-color-action-hover, rgba(122, 31, 31, 0.06));
}

.par-card-button--muted:focus-visible {
  outline-color: var(--par-color-text-muted, #6b6b6b);
}

/* Ghost variant: quiet section affordance. No visible border so it doesn't
   compete with outlined action buttons sitting alongside it; burgundy
   text + soft warm hover wash carry the affordance signal. Use for
   refresh / re-scan / "do this again" actions where the button is a
   convenience, not the primary CTA. */
.par-card-button--ghost {
  border-color: transparent;
}

.par-card-button--ghost:hover:not(:disabled) {
  border-color: transparent;
  background: var(--par-color-action-hover, rgba(122, 31, 31, 0.06));
  color: var(--par-color-title, #7a1f1f);
}

/* Link variant: demoted text-only treatment. No border, no background,
   no hover wash — just burgundy text that underlines on hover. Sized
   smaller than default so it reads as a quiet secondary affordance
   that doesn't compete with the card's primary content. */
.par-card-button--link {
  border-color: transparent;
  background: transparent;
  padding: 0.4rem 0.8rem;
  font-size: 1.3rem;
}

.par-card-button--link:hover:not(:disabled) {
  border-color: transparent;
  background: transparent;
  color: var(--par-color-title-deep, #58180d);
  text-decoration: underline;
}

/* Danger variant: muted by default, warms to destructive red on hover. */
.par-card-button--danger {
  color: var(--par-color-text-muted, #6b6b6b);
}

.par-card-button--danger:hover:not(:disabled) {
  color: var(--par-color-destructive, #A03333);
  border-color: var(--par-color-destructive, #A03333);
  background: var(--par-color-destructive-bg-hover, rgba(160, 51, 51, 0.06));
}

.par-card-button__icon {
  display: inline-flex;
  align-items: center;
  font-size: 1.4rem;
  line-height: 1;
}
</style>
