<template>
  <div class="statblock-fuzzy-search">
    <div class="input-wrapper">
      <!-- Using CdrInput for consistency with the main form field -->
      <cdr-input :id="inputId" v-model="displayValue" :label="label" background="secondary" :placeholder="placeholder"
        autocomplete="off" :readonly="!!selectedStatblock" @focus="handleFocus" @blur="handleBlur" @input="handleInput">
        <template v-if="optional" #label>
          {{ label }} <span class="optional-text">(Optional)</span>
        </template>
      </cdr-input>

      <!-- Clear button - positioned inside the input -->
      <button v-if="selectedStatblock" type="button" class="clear-button" @click="clearSelection"
        title="Clear selection" aria-label="Clear selection">
        ×
      </button>
    </div>

    <!-- Dropdown results - absolute positioned overlay -->
    <div v-if="showDropdown && !selectedStatblock && (filteredStatblocks.length > 0 || searchQuery)"
      class="search-results">
      <!-- Results list -->
      <button v-for="(item, index) in filteredStatblocks" :key="`${item.folder}_${item.name}`" type="button"
        class="search-result-item" @mousedown.prevent="selectStatblock(item)">
        <span class="result-name">{{ item.name }}</span>
        <span class="result-folder"> · {{ item.folder }}</span>
      </button>

      <!-- No results message -->
      <div v-if="searchQuery && filteredStatblocks.length === 0" class="no-results">
        No statblocks found
      </div>

      <!-- Empty state hint -->
      <div v-if="!searchQuery && allStatblocks.length === 0" class="no-results">
        No statblocks available
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { CdrInput } from '@rei/cedar';

const props = defineProps({
  modelValue: {
    type: Object,
    default: null
  },
  label: {
    type: String,
    default: 'Associated Statblock'
  },
  placeholder: {
    type: String,
    default: 'Search for a statblock...'
  },
  optional: {
    type: Boolean,
    default: true
  },
  inputId: {
    type: String,
    default: 'statblock-search'
  }
});

const emit = defineEmits(['update:modelValue']);

const searchQuery = ref('');
const showDropdown = ref(false);
const selectedStatblock = ref(props.modelValue);
const allStatblocks = ref([]);

// Display value - shows search query or selected statblock
const displayValue = computed({
  get() {
    if (selectedStatblock.value) {
      return `${selectedStatblock.value.name} · ${selectedStatblock.value.folder}`;
    }
    return searchQuery.value;
  },
  set(value) {
    if (!selectedStatblock.value) {
      searchQuery.value = value;
    }
  }
});

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  selectedStatblock.value = newValue;
}, { immediate: true });

// Load all statblocks from localStorage
onMounted(() => {
  loadStatblocks();

  // Initialize with modelValue if provided
  if (props.modelValue) {
    selectedStatblock.value = props.modelValue;
  }
});

function loadStatblocks() {
  try {
    const monsters = JSON.parse(localStorage.getItem('monsters') || '{}');
    const statblockList = [];

    for (const folderName in monsters) {
      const folder = monsters[folderName];
      if (!Array.isArray(folder)) continue;

      for (const statblock of folder) {
        statblockList.push({
          name: statblock.name,
          folder: folderName,
          statblock: statblock
        });
      }
    }

    // Sort by name
    statblockList.sort((a, b) => a.name.localeCompare(b.name));
    allStatblocks.value = statblockList;
  } catch (error) {
    console.error('Failed to load statblocks:', error);
    allStatblocks.value = [];
  }
}

// Filter statblocks based on search query
const filteredStatblocks = computed(() => {
  if (!searchQuery.value) {
    // Show all statblocks when focused but no query (if manageable count)
    return allStatblocks.value.length <= 30
      ? allStatblocks.value
      : allStatblocks.value.slice(0, 20);
  }

  const query = searchQuery.value.toLowerCase();
  return allStatblocks.value
    .filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.folder.toLowerCase().includes(query)
    )
    .slice(0, 20); // Limit to 20 results
});

function selectStatblock(item) {
  selectedStatblock.value = item;
  searchQuery.value = '';
  showDropdown.value = false;
  emit('update:modelValue', item);
}

function clearSelection() {
  selectedStatblock.value = null;
  searchQuery.value = '';
  showDropdown.value = false;
  emit('update:modelValue', null);
}

function handleFocus() {
  if (!selectedStatblock.value) {
    showDropdown.value = true;
  }
}

function handleInput() {
  if (!selectedStatblock.value) {
    showDropdown.value = true;
  }
}

function handleBlur() {
  // Delay to allow click events on dropdown items
  setTimeout(() => {
    showDropdown.value = false;
  }, 200);
}
</script>

<style scoped>
.statblock-fuzzy-search {
  position: relative;
  margin-bottom: 1.5rem;
}

/* Input wrapper for positioning clear button */
.input-wrapper {
  position: relative;
}

/* Optional text styling */
.optional-text {
  font-weight: normal;
  color: #6b7280;
  font-size: 0.9em;
}

/* Add padding to Cedar's input element to make room for clear button */
.input-wrapper :deep(.cdr-input__input) {
  padding-right: 2.5rem;
}

/* Folder text inside the input - muted */
.input-wrapper :deep(.cdr-input__input[readonly]) {
  cursor: default;
  color: #333;
}

/* Clear button - positioned inside the input field */
.clear-button {
  position: absolute;
  right: 0.75rem;
  bottom: -.1rem;
  background: none;
  border: none;
  font-size: 1.75rem;
  color: #999;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  line-height: 1;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.clear-button:hover {
  color: #333;
}

/* Dropdown results - absolute overlay with shadow */
.search-results {
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 250px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Result items - compact spacing */
.search-result-item {
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: baseline;
  transition: background-color 0.15s ease;
}

.search-result-item:hover {
  background: rgba(139, 26, 26, 0.04);
}

.search-result-item:active {
  background: rgba(139, 26, 26, 0.08);
}

.result-name {
  font-size: 1rem;
  color: #333;
}

.result-folder {
  font-size: 0.85rem;
  color: #6b7280;
}

/* No results / empty state message */
.no-results {
  padding: 1rem;
  text-align: center;
  color: #9ca3af;
  font-size: 0.9rem;
}

/* Mobile tap targets */
@media (max-width: 768px) {
  .search-result-item {
    min-height: 44px;
    padding: 12px;
  }

  .clear-button {
    min-width: 44px;
    min-height: 44px;
  }
}
</style>
