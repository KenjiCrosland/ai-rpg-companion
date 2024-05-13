<template>
  <div>
    <h2>{{ formattedTitle }}</h2>
    <!-- Display content based on the setting scale -->
    <div v-if="settingScale === 'region'">
      <p>{{ settingOverview.overview }} {{ settingOverview.relation_to_larger_setting }}</p>
      <p>{{ settingOverview.history }}</p>
      <p>{{ settingOverview.current_ruler_sentence }} {{ settingOverview.recent_event_current_ruler }} {{ settingOverview.recent_event_consequences }}</p>
      <p>{{ settingOverview.social_history }} {{ settingOverview.recent_event_social }}</p>
      <p>{{ settingOverview.economic_history }} {{ settingOverview.impactful_economic_event }}</p>
      <p>{{ settingOverview.military_history }} {{ settingOverview.recent_event_military }}</p>
      <p>{{ settingOverview.main_problem }} {{ settingOverview.potential_solutions }}</p>
      <p>{{ settingOverview.conclusion }}</p>
    </div>
    <div v-else-if="settingScale === 'area'">
      <p>{{ settingOverview.overview }}</p>
      <p>{{ settingOverview.significance }}</p>
      <p>{{ settingOverview.locations }}</p>
      <p>{{ settingOverview.exploration_potential }}</p>
      <p>{{ settingOverview.notable_features }}</p>
      <p>{{ settingOverview.connected_areas }}</p>
      <p>{{ settingOverview.conclusion }}</p>
    </div>
    <!-- Additional else-if can be added for 'location' with its specific structure -->
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

// Define props
const props = defineProps({
  currentSetting: {
    type: Object,
    required: true
  }
});

// Destructure for easier access in the template
const { setting_overview: settingOverview, adjective, setting_type, place_name, setting_scale } = props.currentSetting;

// Set default scale to 'region' if not provided
const settingScale = ref(setting_scale || 'region');

// Computed property to format the title using the custom formatTitle function
const formattedTitle = computed(() => {
  return formatTitle(adjective, setting_type, place_name, settingOverview.title);
});

// Function to format title with capitalization
function formatTitle(adjective, setting_type, place_name, title) {
  if (title) return title;
  if (!adjective || !setting_type || !place_name) return '';
  // Helper function to capitalize the first letter of each word
  function capitalize(text) {
    return text.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  return `The ${capitalize(adjective)} ${capitalize(setting_type)} of ${capitalize(place_name)}`;
}
</script>
