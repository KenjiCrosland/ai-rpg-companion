<template>
  <!-- `parchment` opts out of App.vue's global font-family !important. -->
  <div class="tool-navigation parchment">
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
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.55rem;
  color: var(--color-action-hover, #2A4D70);
  font-weight: 700;
  white-space: nowrap;
}

.tool-navigation select {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  font-weight: 700;
  padding: 0.6rem 2.4rem 0.6rem 1rem;
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
  background: var(--par-color-field-bg, rgba(243, 235, 218, 0.5))
    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'><path d='M0 0l6 8 6-8z' fill='%232A4D70'/></svg>")
    no-repeat right 1rem center / 0.7rem 0.5rem;
  color: var(--color-action-hover, #2A4D70);
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  min-width: 280px;
  transition: border-color 0.15s ease;
}

.tool-navigation select:focus {
  outline: none;
  border-color: var(--color-action-rest, #365A85);
}

@media (max-width: 768px) {
  .tool-navigation {
    display: none;
  }
}
</style>
