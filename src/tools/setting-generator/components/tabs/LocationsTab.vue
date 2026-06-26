<template>
  <div class="locations-tab parchment">
    <!-- Legacy: importantLocations[] was populated by the old bulk
         subLocationsPrompt flow (5-6 invented sublocation stubs at
         once). That entry point is gone; this block remains only to
         render existing data for users who already had it. New
         sublocations now come through Related Places (extraction or
         the manual add-place form). -->
    <!-- Legacy importantLocations rendered as "Contains" stub cards, matching
         the Related Places presentation. The old per-location accordion (with
         inline overview + inline edit) is gone; each location's description
         shows as the card brief and is carried into the full setting when
         promoted via Create Setting. -->
    <div v-if="setting.importantLocations && setting.importantLocations.length > 0" class="related-places-group">
      <h4 class="related-places-group-title">Contains</h4>
      <ul class="related-places-list">
        <RelatedStubRow
          v-for="(location, index) in setting.importantLocations"
          :key="location.name"
          :name="location.name"
          :brief="location.description"
          @remove="location.promoted_setting_id
            ? $emit('delete-sublocation-setting', location.promoted_setting_id)
            : deleteSublocation(index)"
        >
          <template #actions>
            <span v-if="location.loading" class="related-place-loading">Generating…</span>
            <template v-else>
              <ParButton v-if="location.promoted_setting_id" variant="primary-outline"
                @click="viewPromotedLocation(location.promoted_setting_id)">
                View in Setting Generator
              </ParButton>
              <ParButton v-else variant="primary-outline" @click="$emit('generate-sublocation', {
                sublocationIndex: index,
                subLocationName: location.name,
                subLocationDescription: location.description,
                setting_type: location.setting_type,
              })">
                Create setting
              </ParButton>
            </template>
          </template>
        </RelatedStubRow>
      </ul>
    </div>

    <!-- Related Places: extracted from this setting's prose, or added
         manually via the form inside the section. Replaces the old
         bulk-invented Important Locations entry point. -->
    <RelatedPlacesSection
      :setting="setting"
      @promote-related-place="$emit('promote-related-place', $event)"
      @remove-related-place="onRemoveRelatedPlace"
    />
  </div>
</template>

<script setup>
import { ParButton } from "@/parchment";
import { computed } from 'vue';
import { navigateToTool } from '@/util/navigation.mjs';
import RelatedPlacesSection from '../RelatedPlacesSection.vue';
import RelatedStubRow from '../RelatedStubRow.vue';

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

// Navigate to a promoted legacy location's full setting (same in-tool
// navigation the Related Places "View in Setting Generator" uses).
const viewPromotedLocation = (promotedSettingId) => {
  if (!promotedSettingId) return;
  navigateToTool('setting-generator', { setting: promotedSettingId });
};

const deleteSublocation = (index) => {
  const updated = [...props.setting.importantLocations];
  updated.splice(index, 1);
  emit('updated-setting', { ...props.setting, importantLocations: updated });
};
</script>

<style scoped>
/* Lighter/cooler cream surface panel (no border). Stub cards float on it as
   warmer-toned cards, so the panel reads as the quiet ground and the stubs lift
   off it by tone. */
/* Bare — the shared .setting-tabs container provides the cream surface and
   padding now (the tab strip and content share one card). */
.locations-tab {
  background: transparent;
  padding: 0;
}

/* "Contains" stub list for the legacy importantLocations — rendered with the
   shared RelatedStubRow so legacy entries match the new related-place cards. */
.related-places-group {
  margin: 0 0 1.5rem;
}

.related-places-group-title {
  margin: 0 0 0.6rem 0;
  font-family: var(--par-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--color-action-hover, #2A4D70);
}

.related-places-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.related-place-loading {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}
</style>
