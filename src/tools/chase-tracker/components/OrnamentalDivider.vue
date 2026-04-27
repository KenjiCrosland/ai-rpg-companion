<template>
  <div class="ornamental-divider" role="separator" aria-hidden="true">
    <span>{{ glyph }}</span>
  </div>
</template>

<script>
export default {
  name: 'OrnamentalDivider',
  props: {
    glyph: { type: String, default: '❦' },
  },
};
</script>
