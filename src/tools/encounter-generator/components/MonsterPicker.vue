<template>
  <div class="monster-picker">
    <div class="picker-search">
      <cdr-input v-model="searchTerm" label="Search" :hide-label="true" placeholder="🔍 Search monsters..."
        background="secondary" class="search-input" />
      <cdr-select :hide-label="true" v-model="sourceFilter" label="Source" :options="sourceOptions"
        class="source-filter" />
      <cdr-select :hide-label="true" v-model="crFilter" label="CR" :options="crOptions" class="cr-filter" />
    </div>

    <div class="monster-list">
      <div v-if="filteredMonsters.length === 0" class="empty-state">
        <p v-if="allMonsters.length === 0">Loading monsters...</p>
        <p v-else-if="sourceFilter === 'custom' && customMonsters.length === 0">
          No custom statblocks yet.<br />
          <cdr-link href="https://cros.land/ai-powered-dnd-5e-monster-statblock-generator/">
            Create one in the Statblock Generator →
          </cdr-link>
        </p>
        <p v-else>No monsters match your filters.</p>
      </div>

      <div v-for="(monster, idx) in paginatedMonsters" :key="`${monster.name}_${monster.source}_${idx}`" class="monster-row"
        @click="$emit('add-monster', monster)">
        <div class="monster-primary">
          <span class="monster-name">{{ monster.name }}</span>
          <span v-if="monster.source === 'custom'" class="source-tag">custom</span>
        </div>
        <div class="monster-secondary">
          <span class="monster-cr">CR {{ monster.cr }}</span>
          <span v-if="monster.creatureType" class="monster-type">{{ monster.creatureType }}</span>
        </div>
      </div>

      <div v-if="filteredMonsters.length > currentPageSize" class="pagination-note">
        Showing {{ Math.min(currentPageSize, filteredMonsters.length) }} of {{ filteredMonsters.length }}
        <button v-if="currentPageSize < filteredMonsters.length" class="show-more-btn" @click="currentPageSize += 50">
          Show more
        </button>
      </div>
    </div>

    <div class="picker-footer">
      <cdr-link href="https://cros.land/ai-powered-dnd-5e-monster-statblock-generator/">
        Want custom monsters? → Statblock Generator
      </cdr-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { CdrInput, CdrSelect, CdrLink } from '@rei/cedar';
import { loadSRDMonsters, loadCustomMonsters, getUniqueCRs } from '../util/monster-adapter.mjs';

const emit = defineEmits(['add-monster']);

const searchTerm = ref('');
const crFilter = ref('any');
const sourceFilter = ref('all');
const srdMonsters = ref([]);
const customMonsters = ref([]);
const currentPageSize = ref(50);

onMounted(async () => {
  srdMonsters.value = await loadSRDMonsters();
  customMonsters.value = loadCustomMonsters();
});

const allMonsters = computed(() => {
  const srd = srdMonsters.value.map(m => ({ ...m, source: m.source || 'srd' }));
  const custom = customMonsters.value.map(m => ({ ...m, source: 'custom' }));
  return [...srd, ...custom];
});

const sourceOptions = computed(() => {
  const options = [{ text: 'All Sources', value: 'all' }];
  if (srdMonsters.value.length > 0) options.push({ text: 'SRD', value: 'srd' });
  if (customMonsters.value.length > 0) {
    options.push({ text: 'My Statblocks', value: 'custom' });

    const folders = new Set();
    customMonsters.value.forEach(m => {
      if (m.sourceLabel && m.sourceLabel !== 'Uncategorized') {
        folders.add(m.sourceLabel);
      }
    });
    folders.forEach(folder => {
      options.push({ text: folder, value: `folder:${folder}` });
    });
  }
  return options;
});

const crOptions = computed(() => {
  const crs = getUniqueCRs(allMonsters.value);
  return [
    { text: 'Any CR', value: 'any' },
    ...crs.map(cr => ({ text: `CR ${cr}`, value: cr })),
  ];
});

const filteredMonsters = computed(() => {
  let monsters = allMonsters.value;

  if (sourceFilter.value === 'srd') {
    monsters = monsters.filter(m => m.source === 'srd');
  } else if (sourceFilter.value === 'custom') {
    monsters = monsters.filter(m => m.source === 'custom');
  } else if (sourceFilter.value.startsWith('folder:')) {
    const folder = sourceFilter.value.replace('folder:', '');
    monsters = monsters.filter(m => m.sourceLabel === folder);
  }

  if (crFilter.value !== 'any') {
    monsters = monsters.filter(m => String(m.cr) === crFilter.value);
  }

  if (searchTerm.value.trim()) {
    const term = searchTerm.value.toLowerCase().trim();
    monsters = monsters.filter(m =>
      m.name.toLowerCase().includes(term) ||
      (m.creatureType && m.creatureType.toLowerCase().includes(term))
    );
  }

  return monsters;
});

const paginatedMonsters = computed(() => {
  return filteredMonsters.value.slice(0, currentPageSize.value);
});
</script>

<style scoped>
.monster-picker {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
}

.picker-search {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
  background: #fafafa;
}

.picker-search> :first-child {
  grid-column: 1 / -1;
}

/* Source and CR filters take equal width in grid */

.monster-list {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.monster-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.1s;
  user-select: none;
  min-height: 4rem;
}

.monster-row:hover {
  background: #e8f5e9;
}

.monster-row:active {
  background: #c8e6c9;
}

.monster-row:last-child {
  border-bottom: none;
}

.monster-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.monster-name {
  font-weight: 600;
  font-size: 1.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.source-tag {
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.0625rem 0.375rem;
  border-radius: 3px;
  background: #f3e5f5;
  color: #7b1fa2;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  flex-shrink: 0;
}

.monster-secondary {
  display: flex;
  gap: 0.75rem;
  font-size: 1rem;
  color: #666;
  flex-shrink: 0;
}

.monster-cr {
  font-weight: 600;
  color: #555;
}

.monster-type {
  font-style: italic;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  line-height: 1.5;
}

.pagination-note {
  padding: 0.5rem 0.75rem;
  text-align: center;
  color: #888;
  font-size: 0.8125rem;
  border-top: 1px solid #eee;
  background: #fafafa;
}

.show-more-btn {
  margin-left: 0.5rem;
  background: none;
  border: none;
  color: #007a5a;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.8125rem;
}

.show-more-btn:hover {
  text-decoration: underline;
}

.picker-footer {
  flex-shrink: 0;
  padding: 0.875rem 0.75rem;
  border-top: 1px solid #ddd;
  background: #f0f7f4;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
}

.picker-footer a {
  color: #007a5a;
  text-decoration: none;
  transition: color 0.2s;
}

.picker-footer a:hover {
  color: #005a42;
  text-decoration: underline;
}

@media (max-width: 600px) {
  .picker-search {
    grid-template-columns: 1fr;
  }

  .source-filter,
  .cr-filter {
    width: 100%;
  }
}
</style>
