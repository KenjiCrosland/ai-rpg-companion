<template>
  <!-- `parchment` opts the control out of App.vue's global sans override so
       the serif label is honored. -->
  <ul
    ref="groupEl"
    class="par-toggle-group parchment"
    :class="`par-toggle-group--${size}`"
    role="radiogroup"
    :aria-label="ariaLabel || null"
    @click.prevent="onClick"
    @keyup.right.prevent="focusNext"
    @keyup.left.prevent="focusPrev"
  >
    <slot />
  </ul>
</template>

<script setup>
/**
 * ParToggleGroup — parchment segmented switcher (lapis chrome register).
 * Editorial sibling to Cedar's CdrToggleGroup with the same accessibility and
 * API: a `role="radiogroup"` of ParToggleButton radios, `v-model` for the
 * selected value, Left/Right arrow roving focus (no wrap, matching Cedar), and
 * the selected value provided down to the buttons via injection.
 *
 * Distinct from ParTabToggle (a burgundy underline tab strip for content
 * surfaces): this is a filled pill segmented control for chrome view-switches
 * (e.g. 1-column / 2-column statblock layout).
 *
 * Props: modelValue (v-model), size ('small'|'medium'|'large'), ariaLabel.
 * Emits: update:modelValue.
 */
import { ref, watch, provide } from 'vue';
import { PAR_TOGGLE_KEY } from './par-toggle-key.mjs';

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['small', 'medium', 'large'].includes(v),
  },
  ariaLabel: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue']);

const groupEl = ref(null);
const selected = ref(props.modelValue);
provide(PAR_TOGGLE_KEY, selected);

watch(() => props.modelValue, (v) => { selected.value = v; });

const buttons = () =>
  groupEl.value ? Array.from(groupEl.value.querySelectorAll('button')) : [];

const onClick = (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  selected.value = btn.value;
  emit('update:modelValue', btn.value);
  btn.focus();
};

const focusNext = (e) => {
  const list = buttons();
  const i = list.indexOf(e.target);
  if (i > -1 && i < list.length - 1) list[i + 1].focus();
};

const focusPrev = (e) => {
  const list = buttons();
  const i = list.indexOf(e.target);
  if (i > 0) list[i - 1].focus();
};
</script>

<style scoped>
/* Fills its container and divides into equal segments (standard segmented-
   control behavior). Constrain the width via the consumer's wrapper. */
.par-toggle-group {
  display: flex;
  align-items: stretch;
  width: 100%;
  gap: 0.4rem;
  margin: 0;
  padding: 0.4rem;
  list-style: none;
  background: var(--par-color-field-bg, rgba(243, 235, 218, 0.5));
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
}

/* Size variants reach into the child segment via :deep (the button lives in
   ParToggleButton's scope). */
.par-toggle-group--small :deep(.par-toggle-button__item) {
  font-size: 1.25rem;
  padding: 0.45rem 1.2rem;
}

.par-toggle-group--large :deep(.par-toggle-button__item) {
  font-size: 1.55rem;
  padding: 0.75rem 2rem;
}
</style>
