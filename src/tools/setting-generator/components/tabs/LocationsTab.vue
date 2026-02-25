<template>
  <div>
    <h2>Important Locations</h2>

    <div v-if="setting.importantLocations && setting.importantLocations.length > 0 && !loadingSubLocations">
      <cdr-accordion-group>
        <cdr-accordion
          v-for="(location, index) in setting.importantLocations"
          :key="location.name"
          :id="location.name"
          level="2"
          :opened="location.open"
          @accordion-toggle="location.open = !location.open"
        >
          <template #label>{{ location.name }}</template>

          <!-- Simple (no full description yet) -->
          <div v-if="!location.main_index && !location.loading">
            <cdr-tooltip id="tooltip-location-delete" position="left" class="delete-button">
              <template #trigger>
                <cdr-button size="small" :icon-only="true" :with-background="true"
                  @click.stop="deleteSublocation(index)">
                  <template #icon><icon-x-sm /></template>
                </cdr-button>
              </template>
              <div>Delete Sub-Location</div>
            </cdr-tooltip>

            <!-- View Mode -->
            <div v-if="editingLocationIndex !== index">
              <h2>{{ location.name }}</h2>
              <p>{{ location.description }}</p>
              <p v-if="location.setting_scale">{{ location.setting_scale }}</p>

              <div class="button-group">
                <cdr-button @click="startEditingLocation(index)" modifier="secondary">Edit Location</cdr-button>
                <cdr-button @click="$emit('generate-sublocation', {
                  sublocationIndex: index,
                  subLocationName: location.name,
                  subLocationDescription: location.description,
                  adjective: location.adjective,
                  setting_type: location.setting_type,
                  title: location.title
                })">
                  Generate Full Description
                </cdr-button>
              </div>
            </div>

            <!-- Edit Mode -->
            <div v-else class="edit-form">
              <h2>Edit Location</h2>

              <cdr-input v-model="locationEditForm.name" label="Location Name" background="secondary" class="edit-field" />

              <cdr-input v-model="locationEditForm.description" label="Location Description"
                background="secondary" :rows="5" tag="textarea" class="edit-field" />

              <cdr-input v-model="locationEditForm.setting_scale" label="Setting Scale (optional)"
                background="secondary" class="edit-field">
                <template #helper-text-bottom>
                  Additional context about the scale or scope of this location
                </template>
              </cdr-input>

              <div class="button-group">
                <cdr-button @click="saveEditLocation">Save Changes</cdr-button>
                <cdr-button @click="cancelEditLocation" modifier="secondary">Cancel</cdr-button>
              </div>
            </div>
          </div>

          <!-- Has a full setting attached -->
          <div v-if="location.has_detailed_description && !location.loading">
            <cdr-tooltip id="tooltip-setting-delete" position="left" class="delete-button">
              <template #trigger>
                <cdr-button size="small" :icon-only="true" :with-background="true"
                  @click.stop="$emit('delete-sublocation-setting', location.main_index)">
                  <template #icon><icon-x-sm /></template>
                </cdr-button>
              </template>
              <div>Delete Sub-Location</div>
            </cdr-tooltip>
            <h2>{{ location.name }}</h2>
            <p>{{ allSettings[location.main_index]?.setting_overview?.overview }} {{ allSettings[location.main_index]?.setting_overview?.relation_to_larger_setting }}</p>
            <p>{{ allSettings[location.main_index]?.setting_overview?.history }}</p>
            <p>
              {{ allSettings[location.main_index]?.setting_overview?.current_ruler_sentence }}
              {{ allSettings[location.main_index]?.setting_overview?.recent_event_current_ruler }}
              {{ allSettings[location.main_index]?.setting_overview?.recent_event_consequences }}
            </p>
            <p>{{ allSettings[location.main_index]?.setting_overview?.social_history }} {{ allSettings[location.main_index]?.setting_overview?.recent_event_social }}</p>
            <p>{{ allSettings[location.main_index]?.setting_overview?.economic_history }} {{ allSettings[location.main_index]?.setting_overview?.impactful_economic_event }}</p>
            <p>{{ allSettings[location.main_index]?.setting_overview?.military_history }} {{ allSettings[location.main_index]?.setting_overview?.recent_event_military }}</p>
            <p>{{ allSettings[location.main_index]?.setting_overview?.main_problem }} {{ allSettings[location.main_index]?.setting_overview?.potential_solutions }}</p>
            <p>{{ allSettings[location.main_index]?.setting_overview?.conclusion }}</p>

            <div class="info-message"
              style="margin-top: 2rem; padding: 1rem; background-color: #f4f2ed; border-radius: 4px;">
              <p style="margin: 0;"><strong>Note:</strong> To edit this location's details, select "{{ location.name }}" from the sidebar to open its full setting page.</p>
            </div>
          </div>

          <!-- Loading skeleton for individual location -->
          <div v-if="!location.has_detailed_description && location.loading">
            <CdrSkeleton><OverviewSkeleton /></CdrSkeleton>
          </div>
        </cdr-accordion>
      </cdr-accordion-group>

      <div style="padding: 2rem">
        <h3>Create New Important Location</h3>
        <cdr-input id="location-name" v-model="newLocationName" label="Location Name" />
        <cdr-input :rows="4" id="location-description" v-model="newLocationDescription" label="Location Description" />
        <cdr-button style="margin-top: 2rem;" @click="addNewSubLocation" modifier="secondary">Add Location</cdr-button>
      </div>
      <hr style="margin-top: 2rem">
      <cdr-button style="margin-top: 3rem" @click="generateSubLocations" modifier="dark">
        Re-Generate Important Locations for {{ setting.place_name }}
      </cdr-button>
    </div>

    <div v-if="!(setting.importantLocations.length > 0) && !loadingSubLocations">
      <p>Important locations are key sites within the setting that can serve as focal points for adventures or
        intrigue. They can be anything from a grand castle to a hidden underground lair. Generate a full location
        description to flesh out the setting.</p>
      <cdr-button modifier="dark" @click="generateSubLocations">
        Generate Important Locations for {{ setting.place_name }}
      </cdr-button>
    </div>

    <div v-if="loadingSubLocations">
      <BlockSkeleton />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import {
  CdrButton,
  CdrInput,
  CdrAccordionGroup,
  CdrAccordion,
  CdrTooltip,
  CdrSkeleton,
  IconXSm,
} from '@rei/cedar';
import OverviewSkeleton from '@/components/skeletons/OverviewSkeleton.vue';
import BlockSkeleton from '@/components/skeletons/BlockSkeleton.vue';
import { generateGptResponse } from '@/util/open-ai.mjs';
import { subLocationsPrompt } from '@/prompts/index.mjs';

const props = defineProps({
  setting: {
    type: Object,
    required: true,
  },
  // Full settings array needed to look up sub-setting overviews by main_index
  allSettings: {
    type: Array,
    required: true,
  },
  premium: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['updated-setting', 'generate-sublocation', 'delete-sublocation-setting']);

// -------------------------
// Local state
// -------------------------
const loadingSubLocations = ref(false);
const editingLocationIndex = ref(null);
const locationEditForm = ref({
  name: '',
  description: '',
  setting_scale: '',
});
const newLocationName = ref('');
const newLocationDescription = ref('');

// -------------------------
// Helpers
// -------------------------
function getOverviewText(overviewObject) {
  if (!overviewObject) return '';
  return Object.entries(overviewObject).map(([, value]) => {
    if (Array.isArray(value)) return '';
    return `${value}`;
  }).join('\n');
}

function sublocationValidation(jsonString) {
  try {
    const jsonObj = JSON.parse(jsonString);
    return jsonObj.every(location =>
      ['name', 'description', 'title', 'setting_type', 'adjective'].every(key => key in location)
    );
  } catch { return false; }
}

// -------------------------
// Edit location
// -------------------------
const startEditingLocation = (index) => {
  const location = props.setting.importantLocations[index];
  locationEditForm.value = {
    name: location.name || '',
    description: location.description || '',
    setting_scale: location.setting_scale || '',
  };
  editingLocationIndex.value = index;
};

const cancelEditLocation = () => {
  editingLocationIndex.value = null;
};

const saveEditLocation = () => {
  if (editingLocationIndex.value === null) return;
  const updatedLocations = props.setting.importantLocations.map((loc, i) => {
    if (i !== editingLocationIndex.value) return loc;
    return {
      ...loc,
      name: locationEditForm.value.name,
      description: locationEditForm.value.description,
      setting_scale: locationEditForm.value.setting_scale,
    };
  });
  emit('updated-setting', { ...props.setting, importantLocations: updatedLocations });
  editingLocationIndex.value = null;
};

// -------------------------
// Add / delete locations
// -------------------------
const addNewSubLocation = () => {
  if (!newLocationName.value) return;
  const newLoc = {
    name: newLocationName.value,
    description: newLocationDescription.value,
    setting_scale: '',
    main_index: null,
    has_detailed_description: false,
    open: true,
  };
  emit('updated-setting', {
    ...props.setting,
    importantLocations: [...props.setting.importantLocations, newLoc],
  });
  newLocationName.value = '';
  newLocationDescription.value = '';
};

const deleteSublocation = (index) => {
  const updated = [...props.setting.importantLocations];
  updated.splice(index, 1);
  emit('updated-setting', { ...props.setting, importantLocations: updated });
};

// -------------------------
// Generate sub-locations
// -------------------------
async function generateSubLocations() {
  let existingLocations = props.setting.importantLocations;
  let currentSubLocationsText = '';

  if (existingLocations.length > 0) {
    if (!confirm("Are you sure you want to regenerate sublocations? This will erase sublocations which don't have a full description.")) return;
    // Keep only those with full descriptions
    existingLocations = existingLocations.filter(loc => loc.has_detailed_description);
    if (existingLocations.length > 0) {
      currentSubLocationsText = 'These sublocations already exist so don\'t include them in the generated results: ' +
        existingLocations.map(loc => loc.name).join(', ');
    }
  }

  const overviewText = getOverviewText(props.setting.setting_overview);
  const prompt = subLocationsPrompt(overviewText, currentSubLocationsText);

  try {
    loadingSubLocations.value = true;
    const response = await generateGptResponse(prompt, sublocationValidation);
    const newLocations = JSON.parse(response);
    emit('updated-setting', {
      ...props.setting,
      importantLocations: [...existingLocations, ...newLocations],
    });
  } catch (error) {
    console.error('Error generating sublocations:', error);
  } finally {
    loadingSubLocations.value = false;
  }
}

// Reset edit state when parent switches to a different setting
watch(
  () => props.setting,
  (newSetting, oldSetting) => {
    if (newSetting !== oldSetting) {
      editingLocationIndex.value = null;
    }
  },
);
</script>

<style scoped>
.delete-button {
  position: absolute;
  top: 65px;
  right: 15px;
  z-index: 1;
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
