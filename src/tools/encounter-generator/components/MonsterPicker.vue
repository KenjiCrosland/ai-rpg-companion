<template>
  <div class="monster-picker parchment">
    <div class="picker-search">
      <ParInput v-model="searchTerm" placeholder="🔍 Search monsters…" class="search-input" />
      <ParSelect v-model="sourceFilter" :options="sourceOptions" class="source-filter" />
      <ParSelect v-model="crFilter" :options="crOptions" class="cr-filter" />
    </div>

    <div class="monster-list">
      <div v-if="filteredMonsters.length === 0" class="empty-state">
        <p v-if="allMonsters.length === 0">Loading monsters…</p>
        <p v-else-if="sourceFilter === 'custom' && customMonsters.length === 0">
          No custom statblocks yet.<br />
          <a class="picker-link" href="https://cros.land/ai-powered-dnd-5e-monster-statblock-generator/">
            Create one in the Statblock Generator →
          </a>
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
          <template v-if="monster.creatureType">
            <span class="monster-separator">·</span>
            <span class="monster-type">{{ monster.creatureType }}</span>
          </template>
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
      <p class="picker-cross-reference">
        Want custom monsters?
        <a class="picker-cross-reference-link" href="https://cros.land/ai-powered-dnd-5e-monster-statblock-generator/">Generate one in the Statblock Generator</a> →
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { ParInput, ParSelect } from '@/parchment';
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
  const options = [{ label: 'All Sources', value: 'all' }];
  if (srdMonsters.value.length > 0) options.push({ label: 'SRD', value: 'srd' });
  if (customMonsters.value.length > 0) {
    options.push({ label: 'My Statblocks', value: 'custom' });

    const folders = new Set();
    customMonsters.value.forEach(m => {
      if (m.sourceLabel && m.sourceLabel !== 'Uncategorized') {
        folders.add(m.sourceLabel);
      }
    });
    folders.forEach(folder => {
      options.push({ label: folder, value: `folder:${folder}` });
    });
  }
  return options;
});

const crOptions = computed(() => {
  const crs = getUniqueCRs(allMonsters.value);
  return [
    { label: 'Any CR', value: 'any' },
    ...crs.map(cr => ({ label: `CR ${cr}`, value: cr })),
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
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
  background: var(--par-color-surface, #FBF7F0);
  overflow: hidden;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

.picker-search {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  padding: 0.75rem;
  border-bottom: 0.5px solid var(--par-color-divider, #e2dccd);
  background: var(--par-color-surface-card, #FEFBF4);
}

.picker-search > :first-child {
  grid-column: 1 / -1;
}

.monster-list {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.monster-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 0.9rem;
  cursor: pointer;
  border-bottom: 0.5px solid rgba(201, 185, 154, 0.4);
  transition: background-color 0.1s ease;
  user-select: none;
  min-height: 4rem;
}

.monster-row:hover {
  background: var(--par-color-callout-bg-light, #F8F2E3);
}

.monster-row:active {
  background: var(--par-color-callout-bg, #f3ebda);
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
  font-weight: 500;
  font-size: 1.5rem;
  color: var(--par-color-text, #222);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.source-tag {
  font-size: 1rem;
  font-weight: 500;
  padding: 0.1rem 0.5rem;
  border-radius: 3px;
  background: var(--par-color-callout-bg, #f3ebda);
  color: var(--par-color-text-secondary, #555);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  flex-shrink: 0;
}

.monster-secondary {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  font-size: 1.2rem;
  color: var(--par-color-text-secondary, #555);
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.monster-cr {
  color: var(--par-color-title, #7a1f1f);
  font-weight: 500;
}

.monster-separator {
  color: var(--par-color-text-muted, #6b6b6b);
}

.monster-type {
  font-style: italic;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: var(--par-color-text-secondary, #555);
  font-size: 1.4rem;
  font-style: italic;
  line-height: 1.5;
}

.picker-link {
  color: var(--color-action-rest, #365A85);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.pagination-note {
  padding: 0.5rem 0.9rem;
  text-align: center;
  color: var(--par-color-text-muted, #6b6b6b);
  font-size: 1.2rem;
  border-top: 0.5px solid var(--par-color-divider, #e2dccd);
  background: var(--par-color-callout-bg-light, #F8F2E3);
}

.show-more-btn {
  margin-left: 0.5rem;
  background: none;
  border: none;
  color: var(--color-action-rest, #365A85);
  font-weight: 600;
  cursor: pointer;
  font-size: 1.2rem;
  font-family: inherit;
}

.show-more-btn:hover {
  text-decoration: underline;
}

.picker-footer {
  flex-shrink: 0;
  padding: 0.875rem 0.9rem;
  border-top: 0.5px solid var(--par-color-divider, #e2dccd);
  background: var(--par-color-callout-bg-light, #F8F2E3);
  text-align: center;
}

.picker-cross-reference {
  margin: 0;
  font-family: inherit;
  font-size: 1.2rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
}

.picker-cross-reference-link {
  color: var(--color-action-rest, #365A85);
  text-decoration: underline;
  text-underline-offset: 2px;
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
