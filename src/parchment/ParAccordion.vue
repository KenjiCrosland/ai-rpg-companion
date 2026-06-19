<template>
  <div class="par-accordion" :class="rootClasses" :id="`${id}-accordion`">
    <component :is="headingTag" class="par-accordion__header">
      <button
        class="par-accordion__button js-par-accordion-button"
        :id="id"
        type="button"
        :aria-expanded="String(opened)"
        :aria-controls="`${id}-collapsible`"
        @click="$emit('accordion-toggle', $event)"
      >
        <span class="par-accordion__label" :id="`${id}-label`">
          <slot name="label">{{ label }}</slot>
        </span>
        <span class="par-accordion__meta">
          <span v-if="hasCount" class="par-accordion__count">{{ count }}</span>
          <span class="par-accordion__caret" :class="{ 'is-open': opened }" aria-hidden="true">
            <svg viewBox="0 0 12 12" width="14" height="14">
              <polyline points="2,4 6,8 10,4" fill="none" stroke="currentColor" stroke-width="1.6"
                stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </span>
      </button>
    </component>

    <div
      ref="containerEl"
      class="par-accordion__content-container"
      :class="{ 'is-open': opened }"
      :style="{ maxHeight }"
    >
      <div
        ref="contentEl"
        class="par-accordion__content"
        :id="`${id}-collapsible`"
        :aria-hidden="String(!opened)"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * ParAccordion — parchment expandable section. Editorial sibling to Cedar's
 * CdrAccordion: same accessible structure (heading > button with
 * aria-expanded/aria-controls, content region with a matching id and
 * aria-hidden) and the same controlled `opened` + `accordion-toggle`
 * contract, restyled to the parchment register. Pair inside a
 * ParAccordionGroup for roving keyboard navigation across headers.
 *
 * Controlled, like Cedar: the parent owns `opened` and flips it in the
 * `accordion-toggle` handler. The smooth max-height open/close animation is
 * ported from CdrAccordion (animate to scrollHeight, then settle to `none`
 * on transitionend so content reflows naturally and never clips).
 *
 * Props:
 *   id            — required; namespaces the button/label/content ids for ARIA.
 *   opened        — controlled open state.
 *   level         — heading level for the wrapping tag (h2…h6). Default 3.
 *   label         — header text (or use the #label slot for rich content).
 *   count         — optional trailing count pill (e.g. items in a folder).
 *   variant       — 'burgundy' (default) | 'lapis'. Lapis is the future
 *                   allowance for chrome-register accordions; the sidebar
 *                   ships burgundy.
 *   contentSpacing — pad the content region (default true). Set false for
 *                   full-bleed list content (e.g. a sidebar folder of rows).
 *
 * Slots: label, default (content). Emits: accordion-toggle.
 */
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';

const props = defineProps({
  id: { type: String, required: true },
  opened: { type: Boolean, default: false },
  level: { type: [Number, String], default: 3 },
  label: { type: String, default: '' },
  count: { type: [Number, String], default: null },
  variant: {
    type: String,
    default: 'burgundy',
    validator: (v) => ['burgundy', 'lapis'].includes(v),
  },
  contentSpacing: { type: Boolean, default: true },
});

defineEmits(['accordion-toggle']);

const containerEl = ref(null);
const contentEl = ref(null);
const maxHeight = ref(props.opened ? 'none' : '0px');

const headingTag = computed(() => `h${props.level}`);
const hasCount = computed(() => props.count !== null && props.count !== '');
const rootClasses = computed(() => ({
  'par-accordion--lapis': props.variant === 'lapis',
  'par-accordion--no-spacing': !props.contentSpacing,
}));

// Settle to `none` once the open animation finishes so the content can grow
// (e.g. a row is added) without being capped by a stale pixel max-height.
const handleTransitionEnd = (event) => {
  if (event.propertyName === 'max-height' && event.target === containerEl.value) {
    if (props.opened) maxHeight.value = 'none';
  }
};

watch(
  () => props.opened,
  async (opened) => {
    if (!contentEl.value) return;
    if (opened) {
      maxHeight.value = '0px';
      await nextTick();
      void contentEl.value.offsetHeight; // force reflow
      maxHeight.value = `${contentEl.value.scrollHeight}px`;
    } else {
      maxHeight.value = `${contentEl.value.scrollHeight}px`;
      await nextTick();
      void contentEl.value.offsetHeight; // force reflow
      maxHeight.value = '0px';
    }
  },
);

onMounted(() => {
  if (props.opened) maxHeight.value = 'none';
  containerEl.value?.addEventListener('transitionend', handleTransitionEnd);
});

onBeforeUnmount(() => {
  containerEl.value?.removeEventListener('transitionend', handleTransitionEnd);
});
</script>

<style scoped>
.par-accordion__header {
  margin: 0;
  font: inherit;
}

.par-accordion__button {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.4rem 1.6rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--par-color-divider, #e2dccd);
  cursor: pointer;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  transition: background-color 0.15s ease;
}

.par-accordion__button:hover {
  background: rgba(243, 235, 218, 0.4);
}

.par-accordion__button:focus-visible {
  outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
  outline-offset: -2px;
}

.par-accordion__label {
  font-size: 1.3rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--par-color-title, #7a1f1f);
  text-align: left;
  line-height: 1.3;
}

.par-accordion--lapis .par-accordion__label {
  color: var(--color-action-hover, #2A4D70);
}

.par-accordion__meta {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-shrink: 0;
}

.par-accordion__count {
  min-width: 2.2rem;
  padding: 0.15rem 0.7rem;
  border-radius: 999px;
  background: var(--par-color-callout-bg, #f3ebda);
  color: var(--par-color-text-muted, #6b6b6b);
  font-size: 1.2rem;
  font-variant-numeric: tabular-nums;
  text-align: center;
  line-height: 1.4;
}

.par-accordion__caret {
  display: inline-flex;
  align-items: center;
  color: var(--par-color-text-muted, #6b6b6b);
  transition: transform 0.2s ease;
}

.par-accordion__caret.is-open {
  transform: rotate(180deg);
}

.par-accordion--lapis .par-accordion__caret {
  color: var(--color-action-muted, #5A7A9A);
}

.par-accordion__content-container {
  overflow: hidden;
  transition: max-height 0.25s ease;
}

/* contentSpacing default: pad the content region (Cedar parity). Turned off
   via the `par-accordion--no-spacing` root class for full-bleed list content. */
.par-accordion__content {
  padding: 1rem 1.6rem 1.4rem;
}

.par-accordion--no-spacing .par-accordion__content {
  padding: 0;
}

@media (prefers-reduced-motion: reduce) {
  .par-accordion__content-container,
  .par-accordion__caret {
    transition: none;
  }
}
</style>
