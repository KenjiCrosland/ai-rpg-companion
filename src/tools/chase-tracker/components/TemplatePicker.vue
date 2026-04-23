<template>
  <div class="template-picker">
    <header class="picker-header">
      <h1 class="display-heading picker-title">Choose the Ground</h1>
      <OrnamentalDivider />
      <p class="ink-italic picker-subtitle">
        A chase is the shape of the terrain it runs across. Pick a starting map — edit it, add to it, make it yours once the chase begins.
      </p>
    </header>

    <div class="picker-grid">
      <ParchmentPanel
        v-for="template in templates"
        :key="template.id"
        class="picker-card"
        padded
      >
        <h2 class="display-heading picker-card-name">{{ template.name }}</h2>
        <p class="ink-italic picker-card-description">{{ template.description }}</p>
        <div class="picker-card-actions">
          <DButton variant="primary" @click="$emit('pick', template.id)">Begin Here</DButton>
        </div>
      </ParchmentPanel>
    </div>
  </div>
</template>

<script>
import ParchmentPanel from './ParchmentPanel.vue';
import OrnamentalDivider from './OrnamentalDivider.vue';
import DButton from './DButton.vue';

export default {
  name: 'TemplatePicker',
  components: { ParchmentPanel, OrnamentalDivider, DButton },
  props: {
    templates: { type: Array, required: true },
  },
  emits: ['pick'],
};
</script>

<style scoped>
.template-picker {
  max-width: 64rem;
  margin: 0 auto;
}

.picker-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.picker-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.picker-subtitle {
  font-size: 1.15rem;
  max-width: 38rem;
  margin: 0.75rem auto 0;
  line-height: 1.55;
}

.picker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1.5rem;
}

.picker-card {
  display: flex;
  flex-direction: column;
  min-height: 14rem;
}

.picker-card-name {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
}

.picker-card-description {
  flex: 1;
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
}

.picker-card-actions {
  display: flex;
  justify-content: center;
}
</style>
