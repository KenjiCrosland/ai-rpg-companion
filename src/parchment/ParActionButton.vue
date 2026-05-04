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
 * ParActionButton — chrome-level primary action button in the cros.land
 * lapis palette. The first component in the parchment system that is
 * deliberately *not* burgundy: this is the form-page CTA (Generate Magic
 * Item, Save Changes, Delete Quest Hook), where the parchment editorial
 * burgundy doesn't fit because the surface isn't a card.
 *
 * Sibling to ParCardButton:
 *   - ParCardButton          — editorial card-context button, burgundy palette.
 *   - ParActionButton    — chrome form-page CTA, lapis palette.
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
 *               cdr-button for par-action-button doesn't shift layouts.
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

defineOptions({ name: 'ParActionButton' });

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
    // 'primary'   — saturated lapis fill, the form CTA. The default.
    // 'secondary' — faded slate outline, the supporting alternative
    //               (Cancel beside Generate, etc.). Same component
    //               family, lower visual volume.
    validator: v => ['primary', 'secondary'].includes(v),
  },
  size: {
    type: String,
    default: 'medium',
    validator: v => ['small', 'medium', 'large'].includes(v),
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
  'par-action',
  `par-action--${props.size}`,
  {
    // Variant: only secondary needs its own class. The base .par-action
    // styles already are the primary treatment.
    'par-action--variant-secondary': props.variant === 'secondary',
    'par-action--full-width': props.fullWidth && !props.iconOnly,
    'par-action--icon-only': props.iconOnly,
    // Padding adjustments only apply when an icon coexists with label text.
    // iconOnly buttons handle their own padding via --icon-only.
    'par-action--has-icon-left': !!slots['icon-left'] && !!slots.default,
    'par-action--has-icon-right': !!slots['icon-right'] && !!slots.default,
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
.par-action {
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
  background-color: var(--color-action-rest, #2A4D70);
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
.par-action:hover:not(:disabled):not([aria-disabled="true"]) {
  background-color: var(--color-action-hover, #1F3A5C);
}

.par-action:active:not(:disabled):not([aria-disabled="true"]) {
  background-color: var(--color-action-active, #142640);
}

/* Keyboard-only focus ring. :focus-visible fires only on keyboard
   navigation; mouse clicks don't get the ring (which is what mouse
   users expect). Cream outline + soft lapis glow against the lapis
   background gives clear high-contrast focus indication. */
.par-action:focus-visible {
  outline: 2px solid var(--color-action-text, #FBF7F0);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(42, 77, 112, 0.4);
}

.par-action:disabled,
.par-action[aria-disabled="true"] {
  background-color: var(--color-action-disabled, #9DAFC1);
  color: rgba(251, 247, 240, 0.7);
  fill: rgba(251, 247, 240, 0.7);
  cursor: not-allowed;
}

/* Sizes — calibrated to match Cedar's small/medium/large so swapping
   cdr-button for par-action-button during migration doesn't reflow
   surrounding layouts. The codebase is 10px-base (1rem = 10px). */
.par-action--small {
  font-size: 1.4rem;
  padding: 0.6rem 1.2rem;
}

/* .par-action--medium has no rules of its own — the base block carries
   the medium values. The class is still applied so consumers can style
   against it from outside. */

.par-action--large {
  font-size: 1.6rem;
  padding: 1.2rem 2.4rem;
}

/* Layout modifiers. */
.par-action--full-width {
  width: 100%;
}

.par-action--icon-only {
  padding: 0.8rem;
  aspect-ratio: 1;
}

/* Padding adjustments when an icon sits next to the label, so the icon
   has a slightly tighter outer margin than the text-side padding. */
.par-action--has-icon-left {
  padding-left: 1.2rem;
}

.par-action--has-icon-right {
  padding-right: 1.2rem;
}

/* Default-slot icon sizing — matches the surrounding text size with a
   small visual lead. Inline-flex on the slots ensures SVGs align to the
   text baseline cleanly. */
.par-action :slotted(svg) {
  width: 1.8rem;
  height: 1.8rem;
  flex-shrink: 0;
}

.par-action--small :slotted(svg) {
  width: 1.6rem;
  height: 1.6rem;
}

.par-action--large :slotted(svg) {
  width: 2rem;
  height: 2rem;
}

/* -----------------------------------------------------------------------
   Secondary variant — faded slate ghost. Sits alongside primary at a
   lower visual volume: outlined rather than filled, desaturated rather
   than saturated. Inherits all sizing, padding, typography, fullWidth,
   iconOnly, and icon-slot styling from the base .par-action — only
   surface and state colors change.

   Placed at the end of the file so source order beats the primary state
   rules at equal specificity (both are 3 simple selectors / pseudos).
   ----------------------------------------------------------------------- */
.par-action--variant-secondary {
  background-color: transparent;
  color: var(--color-action-secondary-rest, #5A7A9A);
  fill: var(--color-action-secondary-rest, #5A7A9A);
  border: 1px solid var(--color-action-secondary-rest, #5A7A9A);
}

.par-action--variant-secondary:hover:not(:disabled):not([aria-disabled="true"]) {
  background-color: var(--color-action-secondary-hover-bg, rgba(90, 122, 154, 0.08));
  /* Border and text color stay the same — only the background tints. */
}

.par-action--variant-secondary:active:not(:disabled):not([aria-disabled="true"]) {
  background-color: var(--color-action-secondary-active-bg, rgba(90, 122, 154, 0.16));
}

.par-action--variant-secondary:focus-visible {
  outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px var(--color-action-secondary-focus-glow, rgba(90, 122, 154, 0.3));
}

.par-action--variant-secondary:disabled,
.par-action--variant-secondary[aria-disabled="true"] {
  background-color: transparent;
  color: var(--color-action-secondary-disabled, rgba(90, 122, 154, 0.35));
  fill: var(--color-action-secondary-disabled, rgba(90, 122, 154, 0.35));
  border-color: var(--color-action-secondary-disabled, rgba(90, 122, 154, 0.35));
  cursor: not-allowed;
}
</style>
