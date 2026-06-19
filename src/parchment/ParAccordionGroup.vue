<template>
  <div class="par-accordion-group" ref="groupEl" @focusin="onFocusin" @keydown="onKeydown">
    <slot />
  </div>
</template>

<script setup>
/**
 * ParAccordionGroup — wraps a set of ParAccordions and provides the roving
 * keyboard navigation Cedar's CdrAccordionGroup implements: Home/End jump to
 * the first/last header, ArrowUp/ArrowDown move between headers (wrapping).
 * Headers are discovered by the `.js-par-accordion-button` marker class that
 * ParAccordion stamps on its button, so the group needs no registration API.
 *
 * Each accordion stays independently controlled by its parent (multi-open by
 * default) — the group only coordinates focus, matching Cedar.
 *
 * Note: Cedar's responsive `unwrap` (force-expanded at breakpoints) is not
 * ported — no consumer needs it yet. Add it here, mirroring CdrAccordionGroup's
 * provide/inject, when one does.
 */
import { ref } from 'vue';

const groupEl = ref(null);
const currentIdx = ref(-1);

const buttons = () =>
  groupEl.value
    ? Array.from(groupEl.value.querySelectorAll('.js-par-accordion-button'))
    : [];

const onFocusin = (e) => {
  currentIdx.value = buttons().indexOf(e.target);
};

const onKeydown = (e) => {
  if (currentIdx.value === -1) return;
  const list = buttons();
  if (!list.length) return;

  switch (e.key) {
    case 'Home':
      e.preventDefault();
      list[0]?.focus();
      break;
    case 'End':
      e.preventDefault();
      list[list.length - 1]?.focus();
      break;
    case 'ArrowDown':
    case 'Down': {
      e.preventDefault();
      const next = currentIdx.value + 1 >= list.length ? 0 : currentIdx.value + 1;
      list[next]?.focus();
      break;
    }
    case 'ArrowUp':
    case 'Up': {
      e.preventDefault();
      const prev = currentIdx.value - 1 < 0 ? list.length - 1 : currentIdx.value - 1;
      list[prev]?.focus();
      break;
    }
    default:
      break;
  }
};
</script>
