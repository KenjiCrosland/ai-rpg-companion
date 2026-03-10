<template>
  <div class="tool-navigation">
    <label for="tool-select">Current Tool:</label>
    <select id="tool-select" :value="currentSlug" @change="navigate($event.target.value)">
      <optgroup label="Generators">
        <option v-for="tool in mainTools" :key="tool.slug" :value="tool.slug">
          {{ tool.name }}
        </option>
      </optgroup>
      <optgroup label="Patron Exclusive">
        <option v-for="tool in patronTools" :key="tool.slug" :value="tool.slug">
          ★ {{ tool.name }}
        </option>
      </optgroup>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { mainTools, patronTools, getCurrentSlug, navigate as navigateToTool } from '@/data/tool-navigation.js';

const currentSlug = computed(() => getCurrentSlug());

function navigate(slug) {
  if (slug === currentSlug.value) return;
  navigateToTool(slug);
}
</script>

<style scoped>
.tool-navigation {
  position: absolute;
  top: 1rem;
  right: 1.75rem;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.tool-navigation label {
  font-size: 1.6rem;
  color: #999;
  font-weight: 500;
  white-space: nowrap;
}

.tool-navigation select {
  font-size: 1.6rem;
  padding: 0.625rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  color: #333;
  cursor: pointer;
  min-width: 280px;
}

.tool-navigation select:focus {
  outline: 2px solid #007a5a;
  outline-offset: 1px;
}

@media (max-width: 768px) {
  .tool-navigation {
    display: none;
  }
}
</style>
