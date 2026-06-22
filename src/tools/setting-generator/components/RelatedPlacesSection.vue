<template>
  <div class="related-places-section parchment">
    <div class="related-places-header">
      <h3 class="related-places-title">Related Places</h3>
      <p class="related-places-subtitle">
        Places connected to this setting — extracted from its prose or
        <button
          type="button"
          class="related-places-subtitle-link"
          @click="openAddForm"
        >added manually</button>.
      </p>
    </div>

    <!-- Manual-creation form: build a related place by name + kind +
         description, then immediately promote it. Synthesizes a stub
         and emits promote-related-place so the same SettingGenerator
         handler runs whether the stub came from extraction or manual
         entry. Ref'd so the subtitle's "added manually" link can
         expand it without owning a duplicate state ref. -->
    <AddRelatedPlaceForm
      ref="addFormRef"
      :setting-name="settingName"
      @add-and-promote="onAddAndPromote"
    />

    <p v-if="!hasAnyPromotableStubs" class="related-places-empty">
      No related places yet. Use the form above to add one, or generate this setting's
      overview — named places from its prose appear here automatically.
    </p>

    <!-- Part Of: the current setting sits inside these places. -->
    <div v-if="groups.parent.length" class="related-places-group">
      <h4 class="related-places-group-title">Part Of</h4>
      <ul class="related-places-list">
        <RelatedStubRow v-for="stub in groups.parent" :key="`p-${stub.name}`" :name="stub.name"
          :brief="stub.role_brief" @remove="onRemove(stub)">
          <template #actions>
            <ParButton v-if="!stub.promoted_setting_id" variant="primary-outline" @click="onPromote(stub, 'parent')">
              Create Setting
            </ParButton>
            <ParButton v-else variant="primary-outline" @click="onView(stub)">View in Setting Generator</ParButton>
          </template>
        </RelatedStubRow>
      </ul>
    </div>

    <!-- Neighbors: peer settings at similar scale. -->
    <div v-if="groups.sibling.length" class="related-places-group">
      <h4 class="related-places-group-title">Neighbors</h4>
      <ul class="related-places-list">
        <RelatedStubRow v-for="stub in groups.sibling" :key="`s-${stub.name}`" :name="stub.name"
          :brief="stub.role_brief" @remove="onRemove(stub)">
          <template #actions>
            <ParButton v-if="!stub.promoted_setting_id" variant="primary-outline" @click="onPromote(stub, 'sibling')">
              Create Setting
            </ParButton>
            <ParButton v-else variant="primary-outline" @click="onView(stub)">View in Setting Generator</ParButton>
          </template>
        </RelatedStubRow>
      </ul>
    </div>

    <!-- Contains: places inside the current setting. -->
    <div v-if="groups.sublocation.length" class="related-places-group">
      <h4 class="related-places-group-title">Contains</h4>
      <ul class="related-places-list">
        <RelatedStubRow v-for="stub in groups.sublocation" :key="`l-${stub.name}`" :name="stub.name"
          :brief="stub.role_brief" @remove="onRemove(stub)">
          <template #actions>
            <ParButton v-if="!stub.promoted_setting_id" variant="primary-outline"
              @click="onPromote(stub, 'sublocation')">
              Create Setting
            </ParButton>
            <ParButton v-else variant="primary-outline" @click="onView(stub)">View in Setting Generator</ParButton>
          </template>
        </RelatedStubRow>
      </ul>
    </div>

    <!-- Features (rivers, roads, ranges) are extracted and stored in
         related_places for the LLM's classification bucket completeness,
         but intentionally NOT rendered. They're prose context the user
         already has via the overview; surfacing them would invite
         promote-as-setting clicks against entries that don't make sense
         as standalone settings. -->
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { ParButton } from '@/parchment';
import { navigateToTool } from '@/util/navigation.mjs';
import AddRelatedPlaceForm from './AddRelatedPlaceForm.vue';
import RelatedStubRow from './RelatedStubRow.vue';

const addFormRef = ref(null);
function openAddForm() {
  addFormRef.value?.expand();
}

const props = defineProps({
  setting: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['promote-related-place', 'remove-related-place']);

const stubs = computed(() =>
  Array.isArray(props.setting?.related_places) ? props.setting.related_places : []
);

const settingName = computed(() =>
  props.setting?.place_name
  || props.setting?.setting_overview?.name
  || 'this setting'
);

// Group stubs by kind. Defensive fallback to 'feature' for unknown
// kinds. The 'feature' bucket is populated but never rendered — see
// the template comment near the end of the groups block.
const groups = computed(() => {
  const out = { parent: [], sibling: [], sublocation: [], feature: [] };
  for (const stub of stubs.value) {
    const kind = stub?.kind && out[stub.kind] ? stub.kind : 'feature';
    out[kind].push(stub);
  }
  return out;
});

// Only the three renderable kinds contribute to the empty-state check.
// Features exist in data but aren't shown in UI, so a setting with
// only feature stubs should still read as "no related places yet."
const hasAnyPromotableStubs = computed(() =>
  groups.value.parent.length
  + groups.value.sibling.length
  + groups.value.sublocation.length > 0
);

function onPromote(stub, kind) {
  emit('promote-related-place', { stub, kind });
}

function onView(stub) {
  if (!stub?.promoted_setting_id) return;
  navigateToTool('setting-generator', { setting: stub.promoted_setting_id });
}

function onRemove(stub) {
  emit('remove-related-place', { stub });
}

// Manual-creation form output: synthesize a stub-shaped object with no
// source_quote (signals "manually created" if we ever want to
// distinguish) and emit the same promote-related-place event the
// extraction-promoted stubs use. The SettingGenerator handler is
// idempotent on stub presence — it adds the stub to related_places
// before promotion if it's not already there.
function onAddAndPromote({ kind, name, role_brief, suggested_setting_type }) {
  const stub = {
    name: (name || '').trim(),
    kind,
    role_brief: (role_brief || '').trim(),
    source_quote: '',
    suggested_setting_type: (suggested_setting_type || '').trim(),
    promoted_setting_id: null,
  };
  emit('promote-related-place', { stub, kind });
}
</script>

<style scoped lang="scss">
/* ============================================
   Related Places — action/management surface,
   not a reading-mode card. The Locations tab
   is where the DM organizes the world graph,
   so the visual register is chrome (lapis
   action affordances, sans-serif labels) on
   a tinted page surface that row cards lift
   off of via cream-on-cream contrast.

   The title is deliberately smaller than the
   setting card's name (2rem vs 2.8rem) and
   in lapis vs burgundy — burgundy is reserved
   for reading-mode card content; this is a
   workspace, not a card opening.
   ============================================ */
.related-places-section {
  /* Transparent for now — the section inherits the surrounding card's
     white surface so it doesn't read as a tinted island inside an
     untinted container. Row cards still lift via their own warm tan
     border + faint warm shadow, so the workspace structure survives
     without the page-surface tint underneath.
       When the global design overhaul takes the whole app surface
       parchment, flip this back to:
         background: var(--par-color-surface-page);
       and the workspace will read as a continuous tinted zone again. */
  background: transparent;
  padding: 2rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

.related-places-header {
  margin-bottom: 1.25rem;
}

.related-places-title {
  /* Tab heading, not a card opening. Lapis chrome (matches the
     "Generate a magic item" precedent), serif, weight 600. Large 2.8rem
     size — the shared tab-header standard across Locations / Factions /
     NPCs / Quest Hooks. */
  margin: 0 0 0.3rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 2.8rem;
  font-weight: 600;
  color: var(--par-color-action-primary, #2A4D70);
  letter-spacing: 0;
  line-height: 1.2;
}

.related-places-subtitle {
  /* Standard tab description: regular-weight serif body text, the shared
     treatment across the Locations / Factions / NPCs / Quest Hooks tab
     headers. Locations is the canonical reference. */
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.55;
}

/* Inline interactive phrase ("added manually") — lapis underlined,
   inherits the subtitle's italic + size. Reset native button chrome
   so it reads as a text-flow link, not a button. The pattern mirrors
   the magic item form's "surprise me with something random" inline
   affordance: words you can click in the middle of descriptive
   prose, not a separate UI control. */
.related-places-subtitle-link {
  appearance: none;
  -webkit-appearance: none;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  font: inherit;
  color: var(--par-color-action-primary, #2A4D70);
  text-decoration: underline;
  text-underline-offset: 0.15em;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    color: var(--par-color-action-primary, #2A4D70);
    text-decoration-thickness: 2px;
    outline: none;
  }
}

.related-places-empty {
  margin: 0.75rem 0 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.6;
}

.related-places-group {
  margin-top: 1.5rem;
}

.related-places-group-title {
  /* Section labels (PART OF / NEIGHBORS / CONTAINS) — bold lapis, all-caps. */
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

/* Stub rows are the shared RelatedStubRow component. */
</style>
