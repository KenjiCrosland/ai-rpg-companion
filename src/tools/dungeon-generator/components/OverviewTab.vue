<template>
  <div>
    <OverviewSkeleton v-if="props.isLoading" />
    <div v-if="!props.isLoading && dungeonStore.currentDungeon?.dungeonOverview" class="dungeon-overview">
      <!-- View Mode -->
      <div v-if="!isEditing" class="overview-container">
        <!-- Section 1: Header -->
        <h2 class="overview-title">{{ overview.title }}</h2>
        <p class="overview-subtitle">{{ overview.overview }}</p>

        <!-- Section 2: Quick Reference Cards (new format only) -->
        <div v-if="overview.location_name && overview.entry_method_short" class="metric-cards">
          <div class="metric-card">
            <div class="metric-label">Location</div>
            <div class="metric-value">{{ overview.location_name }}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Entry method</div>
            <div class="metric-value">{{ overview.entry_method_short }}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Difficulty</div>
            <div class="metric-value" :title="overview.difficulty_level">{{ extractTierName(overview.difficulty_level) }}</div>
          </div>
        </div>

        <!-- Section 3: Expandable Sections -->
        <div class="expandable-sections">
          <details class="expandable-item">
            <summary>
              <span class="arrow">▶</span>
              Location & entry
            </summary>
            <div class="expandable-content">
              <p>{{ overview.relation_to_larger_setting }}</p>
              <p>{{ overview.finding_the_dungeon }}</p>
            </div>
          </details>

          <details class="expandable-item">
            <summary>
              <span class="arrow">▶</span>
              History
            </summary>
            <div class="expandable-content">
              <p>{{ overview.history }}</p>
            </div>
          </details>

          <details class="expandable-item" open>
            <summary>
              <span class="arrow">▶</span>
              Dominant power — {{ extractNPCName(overview.dominant_power) }}
            </summary>
            <div class="expandable-content">
              <p>{{ overview.dominant_power }}</p>
              <p>{{ overview.dominant_power_goals }}</p>
              <div class="nested-card">
                <div class="nested-label">Minions</div>
                <div>{{ overview.dominant_power_minions }}</div>
              </div>
            </div>
          </details>

          <details class="expandable-item">
            <summary>
              <span class="arrow">▶</span>
              Rival — {{ extractNPCName(overview.miniboss_description) }}
            </summary>
            <div class="expandable-content">
              <p>{{ overview.miniboss_description }}</p>
            </div>
          </details>

          <details class="expandable-item">
            <summary>
              <span class="arrow">▶</span>
              Other power — {{ extractNPCName(overview.secondary_power) }}
            </summary>
            <div class="expandable-content">
              <p>{{ overview.secondary_power }}</p>
              <p>{{ overview.secondary_power_event }}</p>
            </div>
          </details>

          <details class="expandable-item">
            <summary>
              <span class="arrow">▶</span>
              Bestiary
            </summary>
            <div class="expandable-content">
              <div v-for="monster in overview.monsters" :key="monster.name" class="monster-item">
                <a href="#" @click.prevent="selectMonster(monster)" class="monster-link">{{ monster.name }}</a>
                <span class="monster-cr">CR {{ monster.CR }}</span>
              </div>
            </div>
          </details>
        </div>

        <!-- Section 4: Current Situation -->
        <div class="current-situation">
          <div class="situation-label">Current situation</div>
          <p>{{ overview.dominant_power_event }}</p>
          <p>{{ overview.recent_event_consequences }}</p>
        </div>

        <!-- Section 5: Solutions -->
        <div class="solutions-section">
          <div class="solutions-label">Possible resolutions</div>

          <!-- New format: 3 solution cards -->
          <template v-if="overview.solution_1_name">
            <div class="solution-card solution-danger">
              <div class="solution-header">
                <span class="solution-name">{{ overview.solution_1_name }}</span>
                <span class="solution-champion"> — championed by {{ overview.solution_1_champion }}</span>
              </div>
              <div class="solution-description">{{ overview.solution_1_description }}</div>
            </div>

            <div class="solution-card solution-warning">
              <div class="solution-header">
                <span class="solution-name">{{ overview.solution_2_name }}</span>
                <span class="solution-champion"> — championed by {{ overview.solution_2_champion }}</span>
              </div>
              <div class="solution-description">{{ overview.solution_2_description }}</div>
            </div>

            <div class="solution-card solution-info">
              <div class="solution-header">
                <span class="solution-name">{{ overview.solution_3_name }}</span>
                <span class="solution-champion"> — championed by {{ overview.solution_3_champion }}</span>
              </div>
              <div class="solution-description">{{ overview.solution_3_description }}</div>
            </div>
          </template>

          <!-- Legacy fallback: single potential_solutions block -->
          <template v-else-if="overview.potential_solutions">
            <div class="solution-card solution-neutral">
              <div class="solution-description">{{ overview.potential_solutions }}</div>
            </div>
          </template>
        </div>

        <!-- Section 6: Stakes -->
        <div class="stakes-card">
          <div class="stakes-label">If the party fails</div>
          <p>{{ overview.main_problem }}</p>
        </div>

        <!-- Section 7: Conclusion -->
        <p class="conclusion-text">{{ overview.conclusion }}</p>

        <div class="button-group">
          <cdr-button @click="startEditing" modifier="secondary">Edit Overview</cdr-button>
          <cdr-button @click="confirmDelete" modifier="dark">Delete Current Dungeon</cdr-button>
        </div>
      </div>

      <!-- Edit Mode -->
      <div v-else class="edit-form">
        <h2>Edit Dungeon Overview</h2>

        <cdr-input v-model="editForm.title" label="Title" background="secondary" class="edit-field">
          <template #helper-text-bottom>
            The title of your dungeon
          </template>
        </cdr-input>

        <cdr-input v-model="editForm.content" label="Overview Content" background="secondary" :rows="15"
          tag="textarea" class="edit-field">
          <template #helper-text-bottom>
            The main content of your dungeon overview. Use double line breaks for paragraphs.
          </template>
        </cdr-input>

        <div class="button-group">
          <cdr-button @click="saveEdit">Save Changes</cdr-button>
          <cdr-button @click="cancelEdit" modifier="secondary">Cancel</cdr-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useDungeonStore } from '../stores/dungeon-store.mjs';
import OverviewSkeleton from './skeletons/OverviewSkeleton.vue';
import { CdrButton, CdrInput } from '@rei/cedar';
import '@rei/cedar/dist/style/cdr-button.css';
import '@rei/cedar/dist/style/cdr-input.css';

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
});

const dungeonStore = useDungeonStore();

// Computed ref for cleaner template access
const overview = computed(() => dungeonStore.currentDungeon?.dungeonOverview || {});

// Edit mode state
const isEditing = ref(false);
const editForm = ref({
  title: '',
  content: ''
});

// Helper function to extract tier name from difficulty_level
const extractTierName = (difficultyLevel) => {
  if (!difficultyLevel) return '';
  // Extract "Tier X: Name" from "Tier X: Name - Description"
  const match = difficultyLevel.match(/^(Tier\s+\d+:\s+[^-]+)/i);
  return match ? match[1].trim() : difficultyLevel;
};

// Helper function to extract NPC name from description
const extractNPCName = (description) => {
  if (!description) return 'Unknown';
  // Try to extract first capitalized word or phrase before comma/period
  const match = description.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
  return match ? match[1] : 'Unknown';
};

// Helper function to select a monster (navigate to Monsters tab)
const selectMonster = (monster) => {
  // TODO: Implement navigation to Monsters tab and select this monster
  // This will need to integrate with the dungeon store's tab navigation
  console.log('Select monster:', monster);
  dungeonStore.activeTabIndex = 3; // Index 3 is typically the Monsters tab
};

// Helper function to combine overview fields into a single content block
const combineOverviewFields = (overview) => {
  if (!overview) return '';

  const parts = [];

  if (overview.overview) {
    parts.push(overview.overview);
  }

  if (overview.relation_to_larger_setting || overview.finding_the_dungeon) {
    parts.push([overview.relation_to_larger_setting, overview.finding_the_dungeon].filter(Boolean).join(' '));
  }

  if (overview.history) {
    parts.push(overview.history);
  }

  if (overview.dominant_power || overview.dominant_power_goals || overview.dominant_power_minions) {
    parts.push([overview.dominant_power, overview.dominant_power_goals, overview.dominant_power_minions].filter(Boolean).join(' '));
  }

  if (overview.miniboss_description) {
    parts.push(overview.miniboss_description);
  }

  if (overview.dominant_power_event || overview.recent_event_consequences) {
    parts.push([overview.dominant_power_event, overview.recent_event_consequences].filter(Boolean).join(' '));
  }

  if (overview.secondary_power || overview.secondary_power_event) {
    parts.push([overview.secondary_power, overview.secondary_power_event].filter(Boolean).join(' '));
  }

  if (overview.main_problem || overview.potential_solutions) {
    parts.push([overview.main_problem, overview.potential_solutions].filter(Boolean).join(' '));
  }

  if (overview.conclusion) {
    parts.push(overview.conclusion);
  }

  return parts.filter(Boolean).join('\n\n');
};

// Start editing
const startEditing = () => {
  const overview = dungeonStore.currentDungeon.dungeonOverview;

  editForm.value = {
    title: overview?.title || '',
    content: overview?.combined_content || combineOverviewFields(overview)
  };

  isEditing.value = true;
};

// Cancel editing
const cancelEdit = () => {
  isEditing.value = false;
};

// Save edited content
const saveEdit = () => {
  if (dungeonStore.currentDungeon.dungeonOverview) {
    dungeonStore.currentDungeon.dungeonOverview.title = editForm.value.title;
    dungeonStore.currentDungeon.dungeonOverview.combined_content = editForm.value.content;
  }

  // Save to localStorage
  dungeonStore.saveDungeons();

  isEditing.value = false;
};

// Confirm and delete current dungeon
const confirmDelete = () => {
  const dungeonName = dungeonStore.currentDungeon?.dungeonOverview?.title || 'this dungeon';
  const confirmed = window.confirm(`Are you sure you want to delete "${dungeonName}"? This action cannot be undone.`);

  if (confirmed) {
    dungeonStore.deleteDungeon(dungeonStore.currentDungeonId);
  }
};
</script>

<style scoped>
/* Container */
.overview-container {
  max-width: 700px;
  margin: 0 auto;
  font-size: 14px;
  line-height: 1.7;
}

/* Section 1: Header */
.overview-title {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 24px;
  font-weight: 600;
}

.overview-subtitle {
  font-style: italic;
  color: #666;
  margin-bottom: 1.5rem;
}

/* Section 2: Metric Cards */
.metric-cards {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric-card {
  flex: 1;
  background: #f5f5f5;
  padding: 0.75rem 1rem;
  border-radius: 6px;
}

.metric-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #999;
  margin-bottom: 0.25rem;
}

.metric-value {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

/* Section 3: Expandable Sections */
.expandable-sections {
  margin-bottom: 1.5rem;
}

.expandable-item {
  border: 0.5px solid #ddd;
  border-radius: 6px;
  margin-bottom: 10px;
  overflow: hidden;
}

.expandable-item summary {
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  user-select: none;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.expandable-item summary::-webkit-details-marker {
  display: none;
}

.expandable-item .arrow {
  display: inline-block;
  transition: transform 0.2s ease;
  font-size: 12px;
  color: #666;
}

.expandable-item[open] .arrow {
  transform: rotate(90deg);
}

.expandable-content {
  padding: 0 1rem 1rem 1rem;
}

.expandable-content p {
  margin: 0 0 0.75rem 0;
}

.expandable-content p:last-child {
  margin-bottom: 0;
}

/* Nested card within expandable section */
.nested-card {
  background: #f5f5f5;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  margin-top: 0.75rem;
}

.nested-label {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

/* Bestiary items */
.monster-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.monster-item:last-child {
  border-bottom: none;
}

.monster-link {
  color: #0066cc;
  text-decoration: none;
}

.monster-link:hover {
  text-decoration: underline;
}

.monster-cr {
  font-size: 12px;
  background: #e8e8e8;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: #666;
}

/* Section 4: Current Situation */
.current-situation {
  border-left: 3px solid #ff6b6b;
  border-radius: 0 6px 6px 0;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  background: #fff;
}

.situation-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #ff6b6b;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.current-situation p {
  margin: 0 0 0.75rem 0;
  color: #333;
}

.current-situation p:last-child {
  margin-bottom: 0;
}

/* Section 5: Solutions */
.solutions-section {
  margin-bottom: 1.5rem;
}

.solutions-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #999;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.solution-card {
  border-radius: 0 6px 6px 0;
  padding: 1rem 1.25rem;
  margin-bottom: 8px;
}

.solution-card:last-child {
  margin-bottom: 0;
}

.solution-danger {
  border-left: 3px solid #dc3545;
}

.solution-warning {
  border-left: 3px solid #ffc107;
}

.solution-info {
  border-left: 3px solid #0066cc;
}

.solution-neutral {
  border-left: 3px solid #6c757d;
}

.solution-header {
  margin-bottom: 0.5rem;
}

.solution-name {
  font-size: 14px;
  font-weight: 500;
}

.solution-danger .solution-name {
  color: #dc3545;
}

.solution-warning .solution-name {
  color: #e67700;
}

.solution-info .solution-name {
  color: #0066cc;
}

.solution-neutral .solution-name {
  color: #333;
}

.solution-champion {
  font-size: 12px;
  color: #999;
}

.solution-description {
  font-size: 13px;
  color: #666;
}

/* Section 6: Stakes */
.stakes-card {
  border: 0.5px solid #ddd;
  border-radius: 6px;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
}

.stakes-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #999;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.stakes-card p {
  margin: 0;
  color: #333;
  font-size: 14px;
}

/* Section 7: Conclusion */
.conclusion-text {
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 14px;
}

/* Buttons */
.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

/* Edit Form */
.edit-form {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}

.edit-field {
  margin-bottom: 2rem;
}
</style>
