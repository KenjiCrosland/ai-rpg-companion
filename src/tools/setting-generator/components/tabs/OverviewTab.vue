<template>
  <div>
    <!-- View Mode -->
    <div v-if="!isEditing">
      <div class="setting-title-block">
        <h2 class="setting-name">{{ displayName }}</h2>
        <p v-if="displayTitle" class="setting-epithet">{{ displayTitle }}</p>
      </div>

      <div v-if="setting.setting_overview.combined_content" class="overview-content">
        <p v-for="(paragraph, index) in setting.setting_overview.combined_content.split('\n\n')" :key="index">
          {{ paragraph }}
        </p>
      </div>
      <div v-else class="overview-content">
        <p v-if="setting.setting_overview.overview || setting.setting_overview.relation_to_larger_setting">
          {{ setting.setting_overview.overview }} {{ setting.setting_overview.relation_to_larger_setting }}
        </p>
        <p v-if="setting.setting_overview.history">{{ setting.setting_overview.history }}</p>
        <p v-if="setting.setting_overview.current_ruler_sentence">{{ setting.setting_overview.current_ruler_sentence }}</p>
        <p v-if="setting.setting_overview.social_history || setting.setting_overview.notable_social_facet">
          {{ setting.setting_overview.social_history }} {{ setting.setting_overview.notable_social_facet }}
        </p>
        <p v-if="setting.setting_overview.economic_history || setting.setting_overview.notable_economic_facet">
          {{ setting.setting_overview.economic_history }} {{ setting.setting_overview.notable_economic_facet }}
        </p>
        <p v-if="setting.setting_overview.military_history || setting.setting_overview.notable_security_facet">
          {{ setting.setting_overview.military_history }} {{ setting.setting_overview.notable_security_facet }}
        </p>
        <p v-if="setting.setting_overview.central_dynamic || setting.setting_overview.responses_in_motion">
          {{ setting.setting_overview.central_dynamic }} {{ setting.setting_overview.responses_in_motion }}
        </p>
        <p v-if="setting.setting_overview.present_state">{{ setting.setting_overview.present_state }}</p>
      </div>

      <div class="button-group">
        <ParActionButton @click="startEditing" variant="secondary">Edit Overview</ParActionButton>
      </div>
    </div>

    <!-- Edit Mode -->
    <div v-else class="edit-form">
      <h2>Edit Setting Overview</h2>

      <cdr-input v-model="editForm.name" label="Name" background="secondary" class="edit-field">
        <template #helper-text-bottom>
          The bare place name (e.g., "Hjallmark").
        </template>
      </cdr-input>

      <cdr-input v-model="editForm.title" label="Subtitle" background="secondary" class="edit-field">
        <template #helper-text-bottom>
          A short evocative phrase that pairs with the name (e.g., "Village of the Drawn Blade").
        </template>
      </cdr-input>

      <cdr-input v-model="editForm.content" label="Overview Content" background="secondary" :rows="15"
        tag="textarea" class="edit-field">
        <template #helper-text-bottom>
          The main content of your setting overview. Use double line breaks for paragraphs.
        </template>
      </cdr-input>

      <div class="button-group">
        <ParActionButton @click="saveEdit">Save Changes</ParActionButton>
        <ParActionButton @click="cancelEdit" variant="secondary">Cancel</ParActionButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ParActionButton } from "@/parchment";
import { ref, computed, watch } from 'vue';
import { CdrInput } from '@rei/cedar';
import { combineSettingOverview } from '@/util/combineSettingOverview.mjs';

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
  name: '',
  title: '',
  content: '',
});

// Display name: prefer the canonical place_name on the setting; fall
// back to the AI's name field if place_name wasn't populated.
const displayName = computed(() => {
  return props.setting.place_name
    || props.setting.setting_overview?.name
    || '';
});

// Display subtitle: setting_overview.title now holds a short evocative
// phrase (3-5 words). Legacy settings generated before this prompt
// change have a longer composed title in the same field — it still
// renders, just longer than ideal.
const displayTitle = computed(() => props.setting.setting_overview?.title || '');


// -------------------------
// Edit actions
// -------------------------
const startEditing = () => {
  const overview = props.setting.setting_overview;
  editForm.value = {
    name: props.setting.place_name || overview?.name || '',
    title: overview?.title || '',
    content: overview?.combined_content || combineSettingOverview(overview),
  };
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
};

const saveEdit = () => {
  emit('updated-setting', {
    ...props.setting,
    place_name: editForm.value.name,
    setting_overview: {
      ...props.setting.setting_overview,
      name: editForm.value.name,
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
.setting-title-block {
  margin-bottom: 2rem;
}

.setting-name {
  margin: 0 0 0.25rem 0;
  line-height: 1.15;
}

.setting-epithet {
  margin: 0 0 1rem 0;
  font-size: 1.6rem;
  font-style: italic;
  font-weight: 400;
  color: #6b7280;
  line-height: 1.3;
}

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
