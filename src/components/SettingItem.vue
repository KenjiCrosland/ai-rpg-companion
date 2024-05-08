<template>
  <li :class="{ 'active': setting.id === activeId }" :style="{ paddingLeft: `${setting.depth * 20}px` }"
    @click.stop="emitSelect(setting.id)">
    {{ formatTitle(setting.adjective, setting.setting_type, setting.place_name) || 'Unnamed Setting' }}
    <ul v-if="setting.children.length" class="nested">
      <setting-item v-for="child in setting.children" :key="child.id" :setting="child" :active-id="activeId"
        @select="emitSelect" />
    </ul>
  </li>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  setting: Object,
  activeId: String
});
function formatTitle(string1, string2, string3) {
  if (!string1 || !string2 || !string3) return '';
  // Helper function to capitalize the first letter of each word in a string
  function capitalize(text) {
    return text.split(' ') // Split the string into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' '); // Rejoin the words into a single string
  }

  // Apply the capitalize function to each string and format them
  return `The ${capitalize(string1)} ${capitalize(string2)} of ${capitalize(string3)}`;
}
const emit = defineEmits(['select']);

const emitSelect = (id) => {
  emit('select', id);
};
</script>

<style scoped>
.nested {
  padding-left: 20px;
  /* Increase if more indentation is desired for children */
}
</style>
