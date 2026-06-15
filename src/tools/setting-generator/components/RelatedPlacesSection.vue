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
        <li v-for="stub in groups.parent" :key="`p-${stub.name}`" class="related-place-row">
          <div class="related-place-info">
            <strong class="related-place-name">{{ stub.name }}</strong>
            <span v-if="stub.role_brief" class="related-place-role">{{ stub.role_brief }}</span>
          </div>
          <div class="related-place-actions">
            <ParButton v-if="!stub.promoted_setting_id" variant="primary-outline"
              @click="onPromote(stub, 'parent')">
              Create Setting
            </ParButton>
            <ParButton v-else variant="primary-outline" @click="onView(stub)">
              View in Setting Generator
            </ParButton>
            <button type="button" class="related-place-remove" :title="`Remove ${stub.name}`"
              :aria-label="`Remove ${stub.name}`" @click="onRemove(stub)">✕</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Neighbors: peer settings at similar scale. -->
    <div v-if="groups.sibling.length" class="related-places-group">
      <h4 class="related-places-group-title">Neighbors</h4>
      <ul class="related-places-list">
        <li v-for="stub in groups.sibling" :key="`s-${stub.name}`" class="related-place-row">
          <div class="related-place-info">
            <strong class="related-place-name">{{ stub.name }}</strong>
            <span v-if="stub.role_brief" class="related-place-role">{{ stub.role_brief }}</span>
          </div>
          <div class="related-place-actions">
            <ParButton v-if="!stub.promoted_setting_id" variant="primary-outline"
              @click="onPromote(stub, 'sibling')">
              Create Setting
            </ParButton>
            <ParButton v-else variant="primary-outline" @click="onView(stub)">
              View in Setting Generator
            </ParButton>
            <button type="button" class="related-place-remove" :title="`Remove ${stub.name}`"
              :aria-label="`Remove ${stub.name}`" @click="onRemove(stub)">✕</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Contains: places inside the current setting. -->
    <div v-if="groups.sublocation.length" class="related-places-group">
      <h4 class="related-places-group-title">Contains</h4>
      <ul class="related-places-list">
        <li v-for="stub in groups.sublocation" :key="`l-${stub.name}`" class="related-place-row">
          <div class="related-place-info">
            <strong class="related-place-name">{{ stub.name }}</strong>
            <span v-if="stub.role_brief" class="related-place-role">{{ stub.role_brief }}</span>
          </div>
          <div class="related-place-actions">
            <ParButton v-if="!stub.promoted_setting_id" variant="primary-outline"
              @click="onPromote(stub, 'sublocation')">
              Create Setting
            </ParButton>
            <ParButton v-else variant="primary-outline" @click="onView(stub)">
              View in Setting Generator
            </ParButton>
            <button type="button" class="related-place-remove" :title="`Remove ${stub.name}`"
              :aria-label="`Remove ${stub.name}`" @click="onRemove(stub)">✕</button>
          </div>
        </li>
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
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
}

.related-places-header {
  margin-bottom: 1.25rem;
}

.related-places-title {
  /* Tab heading, not a card opening. Lapis chrome (matches the
     "Generate a magic item" precedent), serif, weight 600 to read
     as a section title without dominating the surface. */
  margin: 0 0 0.25rem;
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 2rem;
  font-weight: 600;
  color: var(--par-color-action-primary, #2A4D70);
  letter-spacing: 0;
  line-height: 1.2;
}

.related-places-subtitle {
  /* Sans-serif chrome metadata, not editorial epithet. */
  margin: 0;
  font-family: var(--par-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  font-size: 1.3rem;
  font-style: italic;
  font-weight: 400;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.5;
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
  font-family: var(--par-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.6;
}

.related-places-group {
  margin-top: 1.5rem;
}

.related-places-group-title {
  /* Section labels (PART OF / NEIGHBORS / CONTAINS) — mirrors the
     magic item form's field labels (ITEM NAME, RARITY, TYPE). Lapis
     chrome, sans, compact, generous letter-spacing for the
     all-caps tracking. No hairline rule beneath. */
  margin: 0 0 0.5rem 0;
  font-family: var(--par-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  font-size: 1.1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--par-color-action-primary, #2A4D70);
}

.related-places-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.related-place-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  /* Compact row geometry — workspace density, not card breathing room. */
  padding: 1.2rem 1.4rem;
  /* Transitional surface treatment: the page surface is currently
     near-white so surface contrast alone can't carry the lift. The
     stronger warm-tan border (1.5px instead of 1px, using the
     existing border-strong token rather than forking a new hex) plus
     a faint warm-toned shadow do the differentiation work that
     cream-on-cream contrast will eventually do once the page tint
     deepens post-migration. */
  background: var(--par-color-surface, #FBF7F0);
  border: 1.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-sm, 3px);
  box-shadow: var(--par-color-card-shadow, 0 1px 3px rgba(122, 50, 30, 0.04));
}

.related-place-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
  flex: 1;
}

.related-place-name {
  /* Editorial serif at workspace weight — readable as the row's
     primary identifier without competing with the section title. */
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--par-color-text, #222);
  line-height: 1.3;
}

.related-place-role {
  /* Sans italic muted — chrome metadata under the editorial name.
     The serif/sans split here is intentional: name = entity (serif),
     role = descriptor (sans), same pattern the rest of the chrome uses. */
  font-family: var(--par-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.4;
}

.related-place-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;
  padding-top: 0.2rem;
}

/* × dismiss — quiet faded-slate glyph at rest, burgundy on hover.
   The two-step (slate → burgundy) gives the user a moment to confirm
   intent: at rest the affordance reads as "minor secondary control,"
   on hover it commits to "this is a destructive action." This is the
   only place burgundy is allowed into the action layer, and only as
   the hover confirmation step. */
.related-place-remove {
  appearance: none;
  -webkit-appearance: none;
  background: none;
  border: none;
  margin: 0;
  padding: 0.5rem 0.8rem;
  font-family: inherit;
  font-size: 1.8rem;
  line-height: 1;
  color: var(--par-color-action-muted, #5A7A9A);
  border-radius: var(--par-radius-sm, 3px);
  cursor: pointer;
  transition: color 0.15s ease, background-color 0.15s ease;

  &:hover {
    color: var(--par-color-title, #7a1f1f);
    background: var(--par-color-action-destructive-hover, rgba(122, 31, 31, 0.06));
  }

  &:focus-visible {
    outline: 2px solid var(--par-color-title, #7a1f1f);
    outline-offset: 2px;
  }
}
</style>
