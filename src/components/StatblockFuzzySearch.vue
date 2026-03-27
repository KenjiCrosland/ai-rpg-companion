<template>
  <div class="statblock-fuzzy-search">
    <div class="input-wrapper" :class="{ 'statblock-field-highlight': shouldHighlight }" ref="inputWrapperRef">
      <!-- Using CdrInput for consistency with the main form field -->
      <cdr-input :id="inputId" v-model="displayValue" :label="label" :optional="optional" background="secondary" :placeholder="placeholder"
        autocomplete="off" :readonly="!!selectedStatblock" @focus="handleFocus" @blur="handleBlur" @input="handleInput">
      </cdr-input>

      <!-- Clear button - positioned inside the input -->
      <button v-if="selectedStatblock" type="button" class="clear-button" @click="clearSelection"
        title="Clear selection" aria-label="Clear selection">
        ×
      </button>
    </div>

    <!-- Dropdown results - absolute positioned overlay -->
    <div v-if="showDropdown && !selectedStatblock"
      class="search-results">
      <!-- Source filter tabs -->
      <div class="source-filter-tabs" v-if="!srdLoading">
        <button type="button"
          class="source-tab"
          :class="{ active: sourceFilter === 'all' }"
          @mousedown.prevent="sourceFilter = 'all'">
          All
        </button>
        <button type="button"
          class="source-tab"
          :class="{ active: sourceFilter === 'custom' }"
          @mousedown.prevent="sourceFilter = 'custom'">
          My Creatures
        </button>
        <button type="button"
          class="source-tab"
          :class="{ active: sourceFilter === 'srd' }"
          @mousedown.prevent="sourceFilter = 'srd'"
          :disabled="!srdLoaded">
          SRD
        </button>
      </div>

      <!-- Loading indicator -->
      <div v-if="srdLoading" class="loading-message">
        Loading SRD monsters...
      </div>

      <!-- Results list container with scroll -->
      <div class="results-list" v-if="!srdLoading">
        <!-- Results -->
        <button v-for="item in filteredStatblocks" :key="`${item.folder}_${item.name}`" type="button"
          class="search-result-item" @mousedown.prevent="selectStatblock(item)">
          <span class="result-name">{{ item.name }}</span>
          <span class="result-meta"> · CR {{ item.cr }} · {{ item.folder }}</span>
        </button>

        <!-- See More button -->
        <button v-if="hasMoreResults" type="button" class="see-more-button" @mousedown.prevent="loadMore">
          See More ({{ allFilteredStatblocks.length - displayLimit }} remaining)
        </button>

        <!-- No results message -->
        <div v-if="searchQuery && filteredStatblocks.length === 0" class="no-results">
          No statblocks found
        </div>

        <!-- Empty state for "My Creatures" tab -->
        <div v-if="!searchQuery && sourceFilter === 'custom' && filteredStatblocks.length === 0" class="no-results empty-state">
          <p>You haven't created any statblocks yet.</p>
          <a href="https://cros.land/ai-powered-dnd-5e-monster-statblock-generator/" target="_blank" class="empty-state-link">
            Create your first statblock →
          </a>
        </div>

        <!-- Empty state hint (general) -->
        <div v-if="!searchQuery && sourceFilter === 'all' && allStatblocks.length === 0" class="no-results">
          No statblocks available
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
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
  },
  highlightOnMount: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const searchQuery = ref('');
const showDropdown = ref(false);
const selectedStatblock = ref(props.modelValue);
const allStatblocks = ref([]);
const shouldHighlight = ref(false);
const inputWrapperRef = ref(null);
const srdLoaded = ref(false);
const srdLoading = ref(false);
const sourceFilter = ref('all'); // 'all', 'custom', 'srd'
const displayLimit = ref(50); // How many results to show initially

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

// Watch for highlight animation trigger from parent
watch(() => props.highlightOnMount, async (newValue) => {
  if (newValue && selectedStatblock.value) {
    await nextTick();

    // Scroll field into view
    if (inputWrapperRef.value) {
      inputWrapperRef.value.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }

    // Trigger highlight animation
    shouldHighlight.value = true;

    // Remove highlight class after animation completes (1.5s)
    setTimeout(() => {
      shouldHighlight.value = false;
    }, 1500);
  }
});

async function loadStatblocks() {
  try {
    const monsters = JSON.parse(localStorage.getItem('monsters') || '{}');
    const statblockList = [];

    // Load custom statblocks from localStorage
    for (const folderName in monsters) {
      const folder = monsters[folderName];
      if (!Array.isArray(folder)) continue;

      for (const statblock of folder) {
        statblockList.push({
          name: statblock.name,
          folder: folderName,
          cr: statblock.challenge_rating || statblock.cr || '?',
          statblock: statblock,
          source: 'custom'
        });
      }
    }

    // Load SRD monster index if requested (lazy loaded on first focus)
    // Only loads name, CR, type (~25KB instead of ~644KB)
    if (srdLoaded.value) {
      try {
        const indexModule = await import('@/data/srd-monsters-index.json');
        const srdIndex = indexModule.default || indexModule;

        for (const entry of srdIndex) {
          statblockList.push({
            name: entry.name,
            folder: 'SRD Monsters',
            cr: entry.cr,
            type: entry.type,
            statblock: null, // Will be loaded on selection
            source: 'srd'
          });
        }
      } catch (error) {
        console.error('Failed to load SRD monster index:', error);
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

// Filter statblocks based on search query and source filter (returns all matches)
const allFilteredStatblocks = computed(() => {
  // First apply source filter
  let results = allStatblocks.value;
  if (sourceFilter.value === 'custom') {
    results = results.filter(item => item.source === 'custom');
  } else if (sourceFilter.value === 'srd') {
    results = results.filter(item => item.source === 'srd');
  }

  // Then apply search query
  if (!searchQuery.value) {
    return results;
  }

  // Apply search filter
  const query = searchQuery.value.toLowerCase();
  return results.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.folder.toLowerCase().includes(query)
  );
});

// Display only limited results for performance
const filteredStatblocks = computed(() => {
  return allFilteredStatblocks.value.slice(0, displayLimit.value);
});

// Check if there are more results to show
const hasMoreResults = computed(() => {
  return allFilteredStatblocks.value.length > displayLimit.value;
});

// Reset display limit when filter or search changes
watch([searchQuery, sourceFilter], () => {
  displayLimit.value = 50;
});

function loadMore() {
  displayLimit.value += 50;
}

async function selectStatblock(item) {
  // For SRD monsters, load the full statblock data now
  if (item.source === 'srd' && !item.statblock) {
    try {
      const [srdModule, intelligenceModule] = await Promise.all([
        import('@/data/srd-monsters.json'),
        import('@/data/creature-intelligence.json')
      ]);

      const srdMonsters = srdModule.default || srdModule;
      const creatureIntelligence = intelligenceModule.default || intelligenceModule;

      // Find the full statblock by name
      const fullStatblock = srdMonsters.find(m => m.name === item.name);
      if (fullStatblock) {
        const intelligence = creatureIntelligence[item.name];
        item.statblock = {
          ...fullStatblock,
          creatureIntelligence: intelligence || null
        };
      }
    } catch (error) {
      console.error('Failed to load full SRD statblock:', error);
    }
  }

  selectedStatblock.value = item;
  searchQuery.value = '';
  showDropdown.value = false;
  displayLimit.value = 50; // Reset limit on selection
  emit('update:modelValue', item);
}

function clearSelection() {
  selectedStatblock.value = null;
  searchQuery.value = '';
  showDropdown.value = false;
  displayLimit.value = 50; // Reset limit on clear
  emit('update:modelValue', null);
}

async function handleFocus() {
  if (!selectedStatblock.value) {
    showDropdown.value = true;
  }

  // Lazy load SRD data on first focus
  if (!srdLoaded.value && !srdLoading.value) {
    srdLoading.value = true;
    srdLoaded.value = true;
    await loadStatblocks();
    srdLoading.value = false;
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
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  max-height: 300px;
}

/* Source filter tabs */
.source-filter-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid #e5e7eb;
  padding: 8px 12px 0 12px;
  background: white;
  border-radius: 4px 4px 0 0;
  flex-shrink: 0;
}

.source-tab {
  background: none;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 0.875rem;
  color: #9ca3af;
  border-bottom: 2px solid transparent;
  transition: color 0.15s ease, border-color 0.15s ease;
  margin-bottom: -1px;
}

.source-tab:hover:not(:disabled) {
  color: #6b7280;
}

.source-tab.active {
  color: #7c2d12;
  border-bottom-color: #7c2d12;
}

.source-tab:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Results list - scrollable container */
.results-list {
  overflow-y: auto;
  flex: 1;
  min-height: 0;
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
  background: rgba(0, 0, 0, 0.04);
}

.search-result-item:active {
  background: rgba(0, 0, 0, 0.08);
}

.result-name {
  font-size: 1rem;
  color: #333;
}

.result-meta {
  font-size: 0.85rem;
  color: #6b7280;
}

/* See More button */
.see-more-button {
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: #f9fafb;
  text-align: center;
  cursor: pointer;
  font-size: 0.875rem;
  color: #6b7280;
  border-top: 1px solid #e5e7eb;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.see-more-button:hover {
  background: #f3f4f6;
  color: #374151;
}

.see-more-button:active {
  background: #e5e7eb;
}

/* No results / empty state message */
.no-results {
  padding: 1rem;
  text-align: center;
  color: #9ca3af;
  font-size: 0.9rem;
}

.no-results.empty-state {
  padding: 1.5rem 1rem;
}

.no-results.empty-state p {
  margin: 0 0 0.75rem 0;
  color: #6b7280;
}

.empty-state-link {
  display: inline-block;
  color: #7c2d12;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.15s ease;
}

.empty-state-link:hover {
  color: #991b1b;
  text-decoration: underline;
}

/* Loading message */
.loading-message {
  padding: 1rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.9rem;
  font-style: italic;
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

/* Highlight animation for deep link pre-population */
@keyframes field-highlight {
  0% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.3);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.1);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.0);
  }
}

.statblock-field-highlight {
  animation: field-highlight 1.5s ease-out;
}
</style>
