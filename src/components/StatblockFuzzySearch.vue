<template>
  <div class="statblock-fuzzy-search">
    <label :for="inputId" class="search-label">
      {{ label }}
      <span v-if="optional" class="optional-text">(Optional)</span>
    </label>
    <div class="search-wrapper">
      <input
        :id="inputId"
        v-model="searchQuery"
        type="text"
        :placeholder="placeholder"
        class="search-input"
        @focus="showDropdown = true"
        @blur="handleBlur"
        @input="handleInput"
      />
      <button
        v-if="selectedStatblock"
        type="button"
        class="clear-button"
        @click="clearSelection"
        title="Clear selection"
      >
        ×
      </button>
    </div>

    <!-- Selected statblock display -->
    <div v-if="selectedStatblock && !showDropdown" class="selected-statblock">
      <strong>{{ selectedStatblock.name }}</strong>
      <span class="folder-badge">{{ selectedStatblock.folder }}</span>
    </div>

    <!-- Dropdown results -->
    <div v-if="showDropdown && filteredStatblocks.length > 0" class="search-results">
      <button
        v-for="(item, index) in filteredStatblocks"
        :key="`${item.folder}_${item.name}`"
        type="button"
        class="search-result-item"
        @mousedown.prevent="selectStatblock(item)"
      >
        <div class="result-name">{{ item.name }}</div>
        <div class="result-folder">{{ item.folder }}</div>
      </button>
    </div>

    <!-- No results message -->
    <div v-if="showDropdown && searchQuery && filteredStatblocks.length === 0" class="no-results">
      No statblocks found matching "{{ searchQuery }}"
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

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

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  selectedStatblock.value = newValue;
  if (newValue) {
    searchQuery.value = newValue.name;
  } else {
    searchQuery.value = '';
  }
}, { immediate: true });

// Load all statblocks from localStorage
onMounted(() => {
  loadStatblocks();

  // Initialize with modelValue if provided
  if (props.modelValue) {
    selectedStatblock.value = props.modelValue;
    searchQuery.value = props.modelValue.name;
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
    return allStatblocks.value.slice(0, 20); // Show first 20 if no query
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
  searchQuery.value = item.name;
  showDropdown.value = false;
  emit('update:modelValue', item);
}

function clearSelection() {
  selectedStatblock.value = null;
  searchQuery.value = '';
  emit('update:modelValue', null);
}

function handleInput() {
  showDropdown.value = true;
  // Clear selection if user is typing a new query
  if (selectedStatblock.value && searchQuery.value !== selectedStatblock.value.name) {
    selectedStatblock.value = null;
    emit('update:modelValue', null);
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

.search-label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.optional-text {
  font-weight: normal;
  color: #666;
  font-size: 0.85rem;
}

.search-wrapper {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  padding-right: 2.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background: white;
}

.search-input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.clear-button {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  line-height: 1;
}

.clear-button:hover {
  color: #333;
}

.selected-statblock {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: #f0f8ff;
  border: 1px solid #4a90e2;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.folder-badge {
  padding: 0.25rem 0.5rem;
  background: #e8e8e8;
  border-radius: 3px;
  font-size: 0.75rem;
  color: #666;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 4px 4px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.search-result-item {
  width: 100%;
  padding: 0.75rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.search-result-item:hover {
  background: #f5f5f5;
}

.result-name {
  font-weight: 600;
  color: #333;
}

.result-folder {
  font-size: 0.85rem;
  color: #666;
}

.no-results {
  padding: 1rem;
  text-align: center;
  color: #999;
  font-style: italic;
}
</style>
