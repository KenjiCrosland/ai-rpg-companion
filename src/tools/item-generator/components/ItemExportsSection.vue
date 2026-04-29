<template>
  <div class="item-exports-section">
    <h3 class="item-exports-heading">{{ heading }}</h3>

    <p v-if="$slots.description" class="item-exports-description">
      <slot name="description" />
    </p>

    <div class="item-exports-buttons">
      <slot name="buttons" />
    </div>

    <div v-if="$slots.tip" class="item-exports-tip">
      <slot name="tip" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  heading: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.item-exports-section {
  max-width: 850px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f4f0e8;
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.item-exports-heading {
  margin: 0 0 1rem;
  font-size: 1.7rem;
  color: #58180d;
}

.item-exports-description {
  margin: 0 0 1.5rem;
  font-size: 1.4rem;
  color: #4a4236;
  line-height: 1.5;
}

.item-exports-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.item-exports-tip {
  font-size: 1.3rem;
  color: #4a4236;
  line-height: 1.5;
}

@media (max-width: 600px) {
  .item-exports-section {
    padding: 1.5rem;
  }

  .item-exports-buttons {
    flex-direction: column;

    :deep(button) {
      width: 100%;
    }
  }
}
</style>
