<template>
  <component
    :is="tag"
    :class="classes"
    :type="buttonType"
    :disabled="nativeDisabled"
    :aria-disabled="tag === 'a' && disabled ? 'true' : null"
    :tabindex="tag === 'a' && disabled ? -1 : null"
    @click="handleClick"
  >
    <slot name="icon-left" />
    <slot name="icon" />
    <slot />
    <slot name="icon-right" />
  </component>
</template>

<script setup>
/**
 * ParButton — chrome-level primary action button in the cros.land
 * lapis palette. The first component in the parchment system that is
 * deliberately *not* burgundy: this is the form-page CTA (Generate Magic
 * Item, Save Changes, Delete Quest Hook), where the parchment editorial
 * burgundy doesn't fit because the surface isn't a card.
 *
 * Sibling to ParCardButton:
 *   - ParCardButton          — editorial card-context button, burgundy palette.
 *   - ParButton    — chrome form-page CTA, lapis palette.
 *
 * Don't merge them. They differ in palette, weight, role, and the surfaces
 * they sit on — they read as different components, not variants.
 *
 * Props:
 *   tag       — 'button' (default) | 'a'. Anchor tags get aria-disabled
 *               instead of disabled, plus tabindex=-1 when disabled.
 *   type      — 'button' (default) | 'submit' | 'reset'. Only applied
 *               when tag is 'button'; anchor tags don't have a type
 *               attribute and binding it produces invalid HTML.
 *   size      — 'small' | 'medium' (default) | 'large'. Sized to match
 *               Cedar's equivalents during the migration so swapping
 *               cdr-button for par-button doesn't shift layouts.
 *   fullWidth — boolean. Block-level layout with width 100%.
 *   iconOnly  — boolean. Square padding, no text.
 *   disabled  — boolean. Greys out interaction feedback and prevents
 *               click events from reaching the parent on anchor tags.
 *
 * Slots:
 *   icon-left   — icon rendered before the label text.
 *   icon        — single icon for icon-only mode (or middle slot for
 *                 mixed cases). Renders between icon-left and the label.
 *   default     — label text.
 *   icon-right  — icon rendered after the label text.
 *
 * Lapis tokens come from `tokens.css` (--color-action-*) which is loaded
 * once via base.js. Hex fallbacks inlined so the button still renders if
 * a tool bypasses base.js (e.g., dungeon-generator).
 */

import { computed, useSlots } from 'vue';

defineOptions({ name: 'ParButton' });

const props = defineProps({
  tag: {
    type: String,
    default: 'button',
    validator: v => ['button', 'a'].includes(v),
  },
  type: {
    type: String,
    default: 'button',
    validator: v => ['button', 'submit', 'reset'].includes(v),
  },
  variant: {
    type: String,
    default: 'primary',
    // 'primary'         — saturated lapis fill, serif, the form CTA.
    //                     The default; reserved for prominent single
    //                     CTAs ("Generate Setting" on a form page).
    // 'primary-outline' — saturated lapis OUTLINE, sans-serif, compact.
    //                     For inline data-row actions that repeat per
    //                     card (Create Setting, View). Deliberately a
    //                     lighter visual register than primary so a
    //                     page with 6+ related places doesn't read as
    //                     a wall of blue.
    // 'secondary'       — faded SLATE outline, serif. Supporting
    //                     alternative beside a primary CTA (Cancel
    //                     beside Generate). Same family as primary,
    //                     lower visual volume.
    // 'luminous'        — cabochon gradient. Reserved for rare special-
    //                     importance moments (premium upsell, etc.).
    //                     Don't proliferate — the variant earns its
    //                     complexity through scarcity.
    validator: v => ['primary', 'primary-outline', 'secondary', 'luminous'].includes(v),
  },
  size: {
    type: String,
    default: 'medium',
    // 'xsmall' — compact chrome action for dense, in-content button
    //            rows (room generation/edit buttons, etc.) where
    //            'small' still feels heavy against the surrounding
    //            body copy.
    validator: v => ['xsmall', 'small', 'medium', 'large'].includes(v),
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  iconOnly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const slots = useSlots();

// `type` and `disabled` are only valid HTML attributes on <button>, not on
// <a>. Anchor disabled state is signalled via aria-disabled + tabindex
// instead (see template), and click navigation is blocked in handleClick.
const buttonType = computed(() => (props.tag === 'button' ? props.type : null));
const nativeDisabled = computed(() =>
  props.tag === 'button' && props.disabled ? true : null
);

const classes = computed(() => [
  'par-button',
  `par-button--${props.size}`,
  {
    // Variant: only non-primary variants need their own class. The
    // base .par-button styles already are the primary treatment.
    'par-button--variant-primary-outline': props.variant === 'primary-outline',
    'par-button--variant-secondary': props.variant === 'secondary',
    'par-button--variant-luminous': props.variant === 'luminous',
    'par-button--full-width': props.fullWidth && !props.iconOnly,
    'par-button--icon-only': props.iconOnly,
    // Padding adjustments only apply when an icon coexists with label text.
    // iconOnly buttons handle their own padding via --icon-only.
    'par-button--has-icon-left': !!slots['icon-left'] && !!slots.default,
    'par-button--has-icon-right': !!slots['icon-right'] && !!slots.default,
  },
]);

function handleClick(event) {
  // For anchor tags, native disabled doesn't exist — block the click
  // ourselves so consumers don't have to remember to guard.
  if (props.disabled && props.tag === 'a') {
    event.preventDefault();
    return;
  }
  emit('click', event);
}
</script>

<style scoped>
/**
 * Native reset block. Cedar's reset.css applies `-webkit-appearance: button`
 * and a `:focus { outline: ... -webkit-focus-ring-color }` to all <button>
 * elements. Without an explicit appearance reset and an explicit outline
 * rule here, the parchment styling fights the native chrome on WebKit.
 *
 * Anchor reset: text-decoration off, color inherits from our own rules.
 */
.par-button {
  /* Native reset */
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
  outline: none;
  text-decoration: none;

  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  /* Surface — lapis with cream text */
  background-color: var(--color-action-rest, #365A85);
  color: var(--color-action-text, #FBF7F0);
  fill: var(--color-action-text, #FBF7F0);
  border: none;
  border-radius: 0.6rem;

  /* Default size: medium. Padding/font set in size variants below so
     the base block stays uncontested when small/large override. */
  padding: 0.8rem 1.6rem;

  /* Typography — serif to match the broader cros.land design language.
     Source Serif 4 falls back to Georgia / system serif if the web font
     hasn't loaded. Weight 600 to read as primary action. */
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.01em;
  white-space: nowrap;

  /* Interaction */
  cursor: pointer;
  user-select: none;
  transition: var(--action-transition, background-color 0.18s ease, box-shadow 0.18s ease);
}

/* States — `:not(:disabled, [aria-disabled="true"])` covers both <button>
   disabled and the anchor aria-disabled equivalent so disabled buttons
   never show interaction feedback (which would mislead users). */
.par-button:hover:not(:disabled):not([aria-disabled="true"]) {
  background-color: var(--color-action-hover, #2A4D70);
}

.par-button:active:not(:disabled):not([aria-disabled="true"]) {
  background-color: var(--color-action-active, #1F3A5C);
}

/* Keyboard-only focus ring. :focus-visible fires only on keyboard
   navigation; mouse clicks don't get the ring (which is what mouse
   users expect). Cream outline + soft lapis glow against the lapis
   background gives clear high-contrast focus indication. */
.par-button:focus-visible {
  outline: 2px solid var(--color-action-text, #FBF7F0);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(42, 77, 112, 0.4);
}

.par-button:disabled,
.par-button[aria-disabled="true"] {
  background-color: var(--color-action-disabled, #9DAFC1);
  color: rgba(251, 247, 240, 0.7);
  fill: rgba(251, 247, 240, 0.7);
  cursor: not-allowed;
}

/* Sizes — calibrated to match Cedar's small/medium/large so swapping
   cdr-button for par-button during migration doesn't reflow
   surrounding layouts. The codebase is 10px-base (1rem = 10px).

   xsmall sits below Cedar's range — a parchment-native compact size
   for in-content button rows that should recede into the surrounding
   sourcebook copy rather than declare themselves as page chrome.
   Deliberately uses sans-serif (overriding the base serif): at this
   compact size the chrome register reads more honestly than a serif
   CTA, which at 12px starts to look like body type rather than a
   button. */
.par-button--xsmall {
  font-family: var(--par-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0;
  padding: 0.45rem 1rem;
}

.par-button--small {
  font-size: 1.4rem;
  padding: 0.6rem 1.2rem;
}

/* .par-button--medium has no rules of its own — the base block carries
   the medium values. The class is still applied so consumers can style
   against it from outside. */

.par-button--large {
  font-size: 1.6rem;
  padding: 1.2rem 2.4rem;
}

/* Layout modifiers. */
.par-button--full-width {
  width: 100%;
}

.par-button--icon-only {
  padding: 0.8rem;
  aspect-ratio: 1;
}

/* Padding adjustments when an icon sits next to the label, so the icon
   has a slightly tighter outer margin than the text-side padding. */
.par-button--has-icon-left {
  padding-left: 1.2rem;
}

.par-button--has-icon-right {
  padding-right: 1.2rem;
}

/* Default-slot icon sizing — matches the surrounding text size with a
   small visual lead. Inline-flex on the slots ensures SVGs align to the
   text baseline cleanly. */
.par-button :slotted(svg) {
  width: 1.8rem;
  height: 1.8rem;
  flex-shrink: 0;
}

.par-button--small :slotted(svg) {
  width: 1.6rem;
  height: 1.6rem;
}

.par-button--large :slotted(svg) {
  width: 2rem;
  height: 2rem;
}

/* -----------------------------------------------------------------------
   Primary-outline variant — saturated lapis OUTLINE, sans-serif, compact.
   Intentionally a lighter visual register than primary: this variant is
   the "act on this item" affordance that repeats per row in dense lists
   (Create Setting on each Related Place card). A row of 6 serif/large
   primary buttons reads as a wall of blue and dominates the surface; the
   compact outline treatment recedes and lets the row content stay
   primary. Saturated lapis (not slate, like secondary) keeps the action
   signal strong despite the lower weight.

   This variant deliberately diverges from the base .par-button typography:
     - sans-serif (vs serif) — reads as chrome action, not editorial CTA
     - 13px (vs 16px) — compact for row contexts
     - weight 500 (vs 600) — quieter
     - radius 2px (vs 6px) — tighter, more data-row
     - padding 7px 14px (vs 8px 16px) — slightly trimmer

   When you need a serif/large primary action, use variant="primary".
   When you need a desaturated slate alternative, use variant="secondary".
   ----------------------------------------------------------------------- */
.par-button--variant-primary-outline {
  background-color: transparent;
  color: var(--par-color-action-primary, #2A4D70);
  fill: var(--par-color-action-primary, #2A4D70);
  border: 1px solid var(--par-color-action-primary, #2A4D70);
  border-radius: 0.2rem;
  font-family: var(--par-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: 0;
  padding: 0.7rem 1.4rem;
}

.par-button--variant-primary-outline:hover:not(:disabled):not([aria-disabled="true"]) {
  background-color: var(--par-color-action-primary-hover-bg, rgba(42, 77, 112, 0.08));
}

.par-button--variant-primary-outline:active:not(:disabled):not([aria-disabled="true"]) {
  background-color: var(--par-color-action-primary-hover-bg, rgba(42, 77, 112, 0.08));
  /* Slightly darker on active — uses a deeper tint of the same lapis
     by relying on additive opacity rather than a second token. */
  box-shadow: inset 0 0 0 9999px rgba(42, 77, 112, 0.05);
}

.par-button--variant-primary-outline:focus-visible {
  outline: 2px solid var(--par-color-action-primary, #2A4D70);
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(42, 77, 112, 0.25);
}

.par-button--variant-primary-outline:disabled,
.par-button--variant-primary-outline[aria-disabled="true"] {
  background-color: transparent;
  color: rgba(42, 77, 112, 0.35);
  fill: rgba(42, 77, 112, 0.35);
  border-color: rgba(42, 77, 112, 0.35);
  cursor: not-allowed;
}

/* -----------------------------------------------------------------------
   Secondary variant — faded slate ghost. Sits alongside primary at a
   lower visual volume: outlined rather than filled, desaturated rather
   than saturated. Inherits all sizing, padding, typography, fullWidth,
   iconOnly, and icon-slot styling from the base .par-button — only
   surface and state colors change.

   Placed at the end of the file so source order beats the primary state
   rules at equal specificity (both are 3 simple selectors / pseudos).
   ----------------------------------------------------------------------- */
.par-button--variant-secondary {
  background-color: transparent;
  color: var(--color-action-secondary-rest, #5A7A9A);
  fill: var(--color-action-secondary-rest, #5A7A9A);
  border: 1px solid var(--color-action-secondary-rest, #5A7A9A);
}

.par-button--variant-secondary:hover:not(:disabled):not([aria-disabled="true"]) {
  background-color: var(--color-action-secondary-hover-bg, rgba(90, 122, 154, 0.08));
  /* Border and text color stay the same — only the background tints. */
}

.par-button--variant-secondary:active:not(:disabled):not([aria-disabled="true"]) {
  background-color: var(--color-action-secondary-active-bg, rgba(90, 122, 154, 0.16));
}

.par-button--variant-secondary:focus-visible {
  outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px var(--color-action-secondary-focus-glow, rgba(90, 122, 154, 0.3));
}

.par-button--variant-secondary:disabled,
.par-button--variant-secondary[aria-disabled="true"] {
  background-color: transparent;
  color: var(--color-action-secondary-disabled, rgba(90, 122, 154, 0.35));
  fill: var(--color-action-secondary-disabled, rgba(90, 122, 154, 0.35));
  border-color: var(--color-action-secondary-disabled, rgba(90, 122, 154, 0.35));
  cursor: not-allowed;
}

/* -----------------------------------------------------------------------
   Luminous variant — cabochon gradient. Reserved for rare special-
   importance moments (premium upsell). The gradient mimics light
   catching polished lapis stone — semantic depth, not decoration. The
   inset highlight on top + inset shadow on bottom give the surface a
   physical "carved" quality.

   Justified because the variant only appears in rare, high-importance
   moments. Don't propagate to common buttons.
   ----------------------------------------------------------------------- */
.par-button--variant-luminous {
  background-color: transparent;
  background-image: linear-gradient(
    165deg,
    var(--color-action-luminous-light, #A0B8D0) 0%,
    var(--color-action-luminous-mid, #3D6BA0) 50%,
    var(--color-action-luminous-deep, #1F3A5C) 100%
  );
  color: var(--color-action-text, #FBF7F0);
  fill: var(--color-action-text, #FBF7F0);
  border: none;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
}

.par-button--variant-luminous:hover:not(:disabled):not([aria-disabled="true"]) {
  background-image: linear-gradient(
    165deg,
    var(--color-action-luminous-mid, #3D6BA0) 0%,
    var(--color-action-luminous-deep, #1F3A5C) 50%,
    var(--color-action-luminous-deepest, #142640) 100%
  );
}

.par-button--variant-luminous:active:not(:disabled):not([aria-disabled="true"]) {
  /* Active reuses the hover gradient — gives a stable visual through
     the press without an additional state shift that would feel busy
     at this level of visual elaboration. */
  background-image: linear-gradient(
    165deg,
    var(--color-action-luminous-mid, #3D6BA0) 0%,
    var(--color-action-luminous-deep, #1F3A5C) 50%,
    var(--color-action-luminous-deepest, #142640) 100%
  );
}

.par-button--variant-luminous:focus-visible {
  outline: 2px solid var(--color-action-text, #FBF7F0);
  outline-offset: 2px;
  /* Stack the focus halo with the inset highlights so the cabochon
     surface remains visually intact under keyboard focus. */
  box-shadow:
    0 0 0 4px rgba(90, 122, 154, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
}

.par-button--variant-luminous:disabled,
.par-button--variant-luminous[aria-disabled="true"] {
  background-image: linear-gradient(165deg, #B5BFC9 0%, #98A4B0 100%);
  color: rgba(251, 247, 240, 0.7);
  fill: rgba(251, 247, 240, 0.7);
  cursor: not-allowed;
  box-shadow: none;
}
</style>
