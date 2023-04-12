<template>
  <div id="app">
    <LocationGenerator v-if="currentPage === 'location-generator'" />
    <NPCGenerator v-if="currentPage === 'npc-generator'" />
  </div>
</template>

<script>
import LocationGenerator from './components/LocationGenerator.vue';
import NPCGenerator from './components/NPCGenerator.vue';

export default {
  components: {
    LocationGenerator,
    NPCGenerator,
  },
  data() {
    return {
      currentPage: 'npc-generator',
    };
  },
  mounted() {
    this.currentPage = this.$el.getAttribute('data-page') || this.currentPage;
  },
};
</script>
