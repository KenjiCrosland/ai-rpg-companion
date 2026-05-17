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
          <div v-if="!location.promoted_setting_id && !location.loading">
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
              <div class="location-title-block">
                <h2 class="location-name">{{ location.name }}</h2>
                <p v-if="location.title" class="location-epithet">{{ location.title }}</p>
              </div>
              <p>{{ location.description }}</p>
              <p v-if="location.setting_scale">{{ location.setting_scale }}</p>

              <div class="button-group">
                <ParActionButton @click="startEditingLocation(index)" variant="secondary">Edit Location</ParActionButton>
                <ParActionButton @click="$emit('generate-sublocation', {
                  sublocationIndex: index,
                  subLocationName: location.name,
                  subLocationDescription: location.description,
                  setting_type: location.setting_type,
                })">
                  Generate Full Description
                </ParActionButton>
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
                <ParActionButton @click="saveEditLocation">Save Changes</ParActionButton>
                <ParActionButton @click="cancelEditLocation" variant="secondary">Cancel</ParActionButton>
              </div>
            </div>
          </div>

          <!-- Has a full setting attached -->
          <div v-if="location.has_detailed_description && !location.loading">
            <cdr-tooltip id="tooltip-setting-delete" position="left" class="delete-button">
              <template #trigger>
                <cdr-button size="small" :icon-only="true" :with-background="true"
                  @click.stop="$emit('delete-sublocation-setting', location.promoted_setting_id)">
                  <template #icon><icon-x-sm /></template>
                </cdr-button>
              </template>
              <div>Delete Sub-Location</div>
            </cdr-tooltip>
            <div class="location-title-block">
              <h2 class="location-name">{{ location.name }}</h2>
              <p v-if="settingsById.get(location.promoted_setting_id)?.setting_overview?.title" class="location-epithet">
                {{ settingsById.get(location.promoted_setting_id).setting_overview.title }}
              </p>
            </div>
            <p>{{ settingsById.get(location.promoted_setting_id)?.setting_overview?.overview }} {{ settingsById.get(location.promoted_setting_id)?.setting_overview?.relation_to_larger_setting }}</p>
            <p>{{ settingsById.get(location.promoted_setting_id)?.setting_overview?.history }}</p>
            <p>
              {{ settingsById.get(location.promoted_setting_id)?.setting_overview?.current_ruler_sentence }}
              {{ settingsById.get(location.promoted_setting_id)?.setting_overview?.recent_event_current_ruler }}
              {{ settingsById.get(location.promoted_setting_id)?.setting_overview?.recent_event_consequences }}
            </p>
            <p>{{ settingsById.get(location.promoted_setting_id)?.setting_overview?.social_history }} {{ settingsById.get(location.promoted_setting_id)?.setting_overview?.recent_event_social }}</p>
            <p>{{ settingsById.get(location.promoted_setting_id)?.setting_overview?.economic_history }} {{ settingsById.get(location.promoted_setting_id)?.setting_overview?.impactful_economic_event }}</p>
            <p>{{ settingsById.get(location.promoted_setting_id)?.setting_overview?.military_history }} {{ settingsById.get(location.promoted_setting_id)?.setting_overview?.recent_event_military }}</p>
            <p>{{ settingsById.get(location.promoted_setting_id)?.setting_overview?.main_problem }} {{ settingsById.get(location.promoted_setting_id)?.setting_overview?.potential_solutions }}</p>
            <p>{{ settingsById.get(location.promoted_setting_id)?.setting_overview?.conclusion }}</p>

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
        <ParActionButton style="margin-top: 2rem;" @click="addNewSubLocation" variant="secondary">Add Location</ParActionButton>
      </div>
      <hr style="margin-top: 2rem">
      <ParActionButton style="margin-top: 3rem" @click="generateSubLocations">
        Re-Generate Important Locations for {{ setting.place_name }}
      </ParActionButton>
    </div>

    <div v-if="!(setting.importantLocations.length > 0) && !loadingSubLocations">
      <p>Important locations are key sites within the setting that can serve as focal points for adventures or
        intrigue. They can be anything from a grand castle to a hidden underground lair. Generate a full location
        description to flesh out the setting.</p>
      <ParActionButton @click="generateSubLocations">
        Generate Important Locations for {{ setting.place_name }}
      </ParActionButton>
    </div>

    <div v-if="loadingSubLocations">
      <BlockSkeleton />
    </div>

    <!-- Related Places: extracted from this setting's own prose
         (regions, neighbors, internal landmarks, geographic features).
         Distinct from Important Locations: Important Locations are
         invented for the setting; Related Places are the entities the
         setting's narrative actually named, ready to be promoted into
         first-class settings with the right hierarchical relationship. -->
    <RelatedPlacesSection
      :setting="setting"
      @promote-related-place="$emit('promote-related-place', $event)"
      @remove-related-place="onRemoveRelatedPlace"
    />
  </div>
</template>

<script setup>
import { ParActionButton } from "@/parchment";
import { ref, computed, watch } from 'vue';
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
import { generateGptResponse } from "@/util/ai-client.mjs";
import { subLocationsPrompt } from '../../prompts/index.mjs';
import RelatedPlacesSection from '../RelatedPlacesSection.vue';

const props = defineProps({
  setting: {
    type: Object,
    required: true,
  },
  // Full settings array needed to look up promoted sub-setting overviews
  // by promoted_setting_id (rendered via the settingsById computed below).
  allSettings: {
    type: Array,
    required: true,
  },
  premium: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  'updated-setting',
  'generate-sublocation',
  'delete-sublocation-setting',
  'promote-related-place',
]);

// Local handler for removing a related_places stub. Mutates a copy of
// related_places and re-emits via updated-setting so the parent owns
// persistence.
function onRemoveRelatedPlace({ stub }) {
  const next = (props.setting.related_places || []).filter(p => p?.name !== stub?.name);
  emit('updated-setting', { ...props.setting, related_places: next });
}

// Map<id, setting> for O(1) lookup by promoted_setting_id in the
// template. Rebuilt whenever the allSettings prop changes (Vue's
// shallow-reactivity on prop arrays still triggers computed
// recomputation when the array reference shifts).
const settingsById = computed(() => {
  const map = new Map();
  for (const s of props.allSettings || []) {
    if (s?.id) map.set(s.id, s);
  }
  return map;
});

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
      ['name', 'description', 'title', 'setting_type'].every(key => key in location)
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
    promoted_setting_id: null,
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
  const prompt = subLocationsPrompt({
    settingDescription: overviewText,
    existingSubLocations: currentSubLocationsText,
    register: props.setting.register || null,
  });

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
.location-title-block {
  margin-bottom: 1rem;
}

.location-name {
  margin: 0 0 0.25rem 0;
  line-height: 1.15;
}

.location-epithet {
  margin: 0 0 0.5rem 0;
  font-size: 1.4rem;
  font-style: italic;
  font-weight: 400;
  color: #6b7280;
  line-height: 1.3;
}

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
