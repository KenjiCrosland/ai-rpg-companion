<template>
  <div :class="['parchment-panel', { padded }]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ParchmentPanel',
  props: {
    padded: { type: Boolean, default: false },
  },
};
</script>
