<template>
  <div v-show="isActive" class="panel-content" :class="{ 'panel-content--bare': bare }">
    <slot></slot>
  </div>
</template>

<script setup>
import { inject, computed, defineProps, onBeforeUnmount } from 'vue';

const props = defineProps({
  label: String,
  disabled: {
    type: Boolean,
    default: false // Set default to false, making it optional
  },
  // Opt out of the default 10px + white-bg panel frame so the slot
  // content owns its own surface. Used when the tab body wants to
  // render an edge-to-edge custom surface (e.g. the Setting
  // Generator's Locations tab, which renders a workspace-tinted
  // parchment block as the entire tab body). Defaults to false so
  // existing consumers keep the framed appearance.
  bare: {
    type: Boolean,
    default: false,
  },
});

const tabs = inject('tabs');
const currentIndex = inject('currentIndex');

// Register against the parent Tabs' shared array, then deregister on
// unmount. The earlier pattern captured a numeric `index` at mount
// time and never removed the entry on unmount — which corrupted the
// array under HMR (every save pushed a duplicate set of tabs) and
// would break any future dynamic add/remove of tab panels.
//
// Tracking the entry by object reference keeps active-state matching
// honest no matter what other panels do to the array: isActive looks
// up the entry's current position each time `tabs` changes, so a
// panel that's third in the rendered strip reads active when
// currentIndex is 2, regardless of mount order.
const tabEntry = { label: props.label, disabled: props.disabled };
tabs.value.push(tabEntry);

onBeforeUnmount(() => {
  const i = tabs.value.indexOf(tabEntry);
  if (i !== -1) tabs.value.splice(i, 1);
});

const isActive = computed(() => {
  const i = tabs.value.indexOf(tabEntry);
  return i !== -1 && i === currentIndex.value;
});
</script>

<style scoped>
.panel-content {
  padding: 10px;
  background: #fff;
  min-height: 100px;
}

/* Bare variant: slot content owns its own surface. No padding, no
   background, no min-height — the consumer is responsible for any
   visual frame. */
.panel-content--bare {
  padding: 0;
  background: transparent;
  min-height: 0;
}
</style>
