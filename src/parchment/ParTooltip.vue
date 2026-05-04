<template>
  <span class="par-tooltip-wrapper">
    <slot />
    <span
      v-if="text"
      class="par-tooltip"
      :class="placementClass"
      role="tooltip"
    >{{ text }}</span>
  </span>
</template>

<script setup>
/**
 * ParTooltip — wrapper-style tooltip primitive for the Parchment design
 * system. Wraps a target element (typically a `ParCardButton` with a
 * non-obvious affordance) and shows explanatory text on hover or focus.
 *
 * Why custom rather than `title` attribute: native browser tooltips have
 * a ~1s show delay and unstyled rendering; for "you'd come back to this
 * affordance when X happens" buttons (Re-scan Lore, etc.) the latency
 * undercuts the explanation. CSS-driven show/hide is immediate.
 *
 * Why CSS-only show/hide rather than Vue refs: `:hover` plus
 * `:focus-within` covers mouse and keyboard cases without per-instance
 * state. The component stays declarative and zero-runtime-overhead.
 *
 * Usage:
 *   <ParTooltip text="Re-runs lore extraction. Useful after editing...">
 *     <ParCardButton variant="ghost" size="small">Re-scan Lore</ParCardButton>
 *   </ParTooltip>
 *
 * Props:
 *   text      — tooltip body. If empty, the tooltip element isn't rendered.
 *   placement — 'top' (default) or 'bottom'. Picks which side of the
 *               target the tooltip sits on; arrow follows.
 */

import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  placement: {
    type: String,
    default: 'top',
    validator: (v) => ['top', 'bottom'].includes(v),
  },
});

const placementClass = computed(() => `par-tooltip--${props.placement}`);
</script>

<style scoped>
/* Wrapper has to be relative so the absolutely-positioned tooltip
   anchors to the target. `inline-flex` lets the wrapper hug the slot's
   natural size without breaking inline layout. */
.par-tooltip-wrapper {
  position: relative;
  display: inline-flex;
}

/* Tooltip surface. Cream paper, slightly lighter than the card surface
   so it reads as a lifted note rather than blending into the card. Warm
   tan border + warm-tinted shadow keep it tonally consistent with the
   parchment palette around it. */
.par-tooltip {
  position: absolute;
  left: 50%;
  z-index: 10;

  /* Surface */
  background: var(--par-color-tooltip-bg, #fefcf7);
  color: var(--par-color-tooltip-text, #2c2c2a);
  border: 1px solid var(--par-color-border, #e8e2d4);
  border-radius: var(--par-radius-md, 4px);
  box-shadow: 0 2px 8px var(--par-color-tooltip-shadow, rgba(60, 40, 20, 0.08));

  /* Typography — serif to match the card. Slightly larger than 12px so
     serif body legibility holds at this scale. */
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.45;
  letter-spacing: 0;

  /* Layout. Fixed `width` rather than `max-content` because the tooltip
     is absolutely positioned inside an inline-flex wrapper that hugs
     the target — Chromium caps absolute children at the containing
     block's width unless an explicit value is given. A fixed width
     also gives tooltips a consistent feel across instances regardless
     of target width. `min-content` is a safety net for the rare case
     of a single very-long word. */
  padding: 0.7rem 1rem;
  width: 26ch;
  min-width: min-content;
  white-space: normal;
  text-align: left;

  /* Hidden by default; CSS `:hover`/`:focus-within` on the wrapper
     fade it in. The transform translation provides a subtle slide-in
     so the tooltip settles into place rather than popping. */
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

/* Arrow construction — two-triangle pattern.
 *
 * `::before` draws the border-colored triangle (slightly larger).
 * `::after` draws the background-colored triangle (1px shorter on each
 * edge), sitting on top of `::before`. The 1px difference around the
 * diagonal edges of the larger triangle remains visible, giving the
 * appearance of a triangle whose border continues from the tooltip's
 * own border. The ::after's wide top edge covers the seam where the
 * tooltip's bottom border would otherwise show through.
 */

/* Top placement: tooltip sits above target, arrow points down. */
.par-tooltip--top {
  bottom: calc(100% + 8px);
  transform: translate(-50%, 4px);
}

.par-tooltip--top::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -7px;
  border: 7px solid transparent;
  border-top-color: var(--par-color-border, #e8e2d4);
}

.par-tooltip--top::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -6px;
  border: 6px solid transparent;
  border-top-color: var(--par-color-tooltip-bg, #fefcf7);
}

/* Bottom placement: tooltip sits below target, arrow points up. */
.par-tooltip--bottom {
  top: calc(100% + 8px);
  transform: translate(-50%, -4px);
}

.par-tooltip--bottom::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -7px;
  border: 7px solid transparent;
  border-bottom-color: var(--par-color-border, #e8e2d4);
}

.par-tooltip--bottom::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -6px;
  border: 6px solid transparent;
  border-bottom-color: var(--par-color-tooltip-bg, #fefcf7);
}

/* Show on hover (mouse) or focus-within (keyboard) — covers both
   discovery paths without JS. */
.par-tooltip-wrapper:hover > .par-tooltip,
.par-tooltip-wrapper:focus-within > .par-tooltip {
  opacity: 1;
  transform: translate(-50%, 0);
}
</style>
