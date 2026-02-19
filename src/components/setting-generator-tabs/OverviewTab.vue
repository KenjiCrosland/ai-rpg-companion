<template>
  <div>
    <!-- View Mode -->
    <div v-if="!isEditing">
      <h2>{{ formatTitle(setting.adjective, setting.setting_type, setting.place_name, setting.setting_overview.title) }}</h2>

      <div v-if="setting.setting_overview.combined_content" class="overview-content">
        <p v-for="(paragraph, index) in setting.setting_overview.combined_content.split('\n\n')" :key="index">
          {{ paragraph }}
        </p>
      </div>
      <div v-else class="overview-content">
        <p>{{ setting.setting_overview.overview }} {{ setting.setting_overview.relation_to_larger_setting }}</p>
        <p>{{ setting.setting_overview.history }}</p>
        <p>
          {{ setting.setting_overview.current_ruler_sentence }}
          {{ setting.setting_overview.recent_event_current_ruler }}
          {{ setting.setting_overview.recent_event_consequences }}
        </p>
        <p>{{ setting.setting_overview.social_history }} {{ setting.setting_overview.recent_event_social }}</p>
        <p>{{ setting.setting_overview.economic_history }} {{ setting.setting_overview.impactful_economic_event }}</p>
        <p>{{ setting.setting_overview.military_history }} {{ setting.setting_overview.recent_event_military }}</p>
        <p>{{ setting.setting_overview.main_problem }} {{ setting.setting_overview.potential_solutions }}</p>
        <p>{{ setting.setting_overview.conclusion }}</p>
      </div>

      <div class="button-group">
        <cdr-button @click="startEditing" modifier="secondary">Edit Overview</cdr-button>
      </div>
    </div>

    <!-- Edit Mode -->
    <div v-else class="edit-form">
      <h2>Edit Setting Overview</h2>

      <cdr-input v-model="editForm.title" label="Title" background="secondary" class="edit-field">
        <template #helper-text-bottom>
          The title of your setting
        </template>
      </cdr-input>

      <cdr-input v-model="editForm.content" label="Overview Content" background="secondary" :rows="15"
        tag="textarea" class="edit-field">
        <template #helper-text-bottom>
          The main content of your setting overview. Use double line breaks for paragraphs.
        </template>
      </cdr-input>

      <div class="button-group">
        <cdr-button @click="saveEdit">Save Changes</cdr-button>
        <cdr-button @click="cancelEdit" modifier="secondary">Cancel</cdr-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { CdrButton, CdrInput } from '@rei/cedar';

const props = defineProps({
  setting: {
    type: Object,
    required: true,
  },
  premium: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['updated-setting']);

// -------------------------
// Local state
// -------------------------
const isEditing = ref(false);
const editForm = ref({
  title: '',
  content: '',
});

// -------------------------
// Helpers
// -------------------------
function formatTitle(string1, string2, string3, title) {
  if (title) return title;
  if (!string1 || !string2 || !string3) return '';
  function capitalize(text) {
    return text.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  return `The ${capitalize(string1)} ${capitalize(string2)} of ${capitalize(string3)}`;
}

function combineOverviewFields(overview) {
  if (!overview) return '';
  const parts = [];
  if (overview.overview || overview.relation_to_larger_setting) {
    parts.push([overview.overview, overview.relation_to_larger_setting].filter(Boolean).join(' '));
  }
  if (overview.history) parts.push(overview.history);
  if (overview.current_ruler_sentence || overview.recent_event_current_ruler || overview.recent_event_consequences) {
    parts.push([overview.current_ruler_sentence, overview.recent_event_current_ruler, overview.recent_event_consequences].filter(Boolean).join(' '));
  }
  if (overview.social_history || overview.recent_event_social) {
    parts.push([overview.social_history, overview.recent_event_social].filter(Boolean).join(' '));
  }
  if (overview.economic_history || overview.impactful_economic_event) {
    parts.push([overview.economic_history, overview.impactful_economic_event].filter(Boolean).join(' '));
  }
  if (overview.military_history || overview.recent_event_military) {
    parts.push([overview.military_history, overview.recent_event_military].filter(Boolean).join(' '));
  }
  if (overview.main_problem || overview.potential_solutions) {
    parts.push([overview.main_problem, overview.potential_solutions].filter(Boolean).join(' '));
  }
  if (overview.conclusion) parts.push(overview.conclusion);
  return parts.filter(Boolean).join('\n\n');
}

// -------------------------
// Edit actions
// -------------------------
const startEditing = () => {
  const overview = props.setting.setting_overview;
  editForm.value = {
    title: overview?.title || formatTitle(
      props.setting.adjective,
      props.setting.setting_type,
      props.setting.place_name,
      overview?.title,
    ),
    content: overview?.combined_content || combineOverviewFields(overview),
  };
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
};

const saveEdit = () => {
  emit('updated-setting', {
    ...props.setting,
    setting_overview: {
      ...props.setting.setting_overview,
      title: editForm.value.title,
      combined_content: editForm.value.content,
    },
  });
  isEditing.value = false;
};

// Reset edit state when the parent switches to a different setting
watch(
  () => props.setting,
  (newSetting, oldSetting) => {
    if (newSetting !== oldSetting) {
      isEditing.value = false;
    }
  },
);
</script>

<style scoped>
.overview-content {
  margin-bottom: 2rem;
}

.edit-form .edit-field {
  margin-bottom: 1.5rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .button-group {
    flex-direction: column;
  }

  .button-group button {
    width: 100%;
  }
}
</style>
