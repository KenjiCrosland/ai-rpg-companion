<template>
  <div class="npc-card parchment">
    <!-- Header: name + buttons -->
    <div class="npc-card-header">
      <div>
        <h2 v-if="!loadingDescription" class="npc-card-name">{{ npc.name }}</h2>
        <p v-if="!loadingDescription && (origin || npc.type_info)" class="npc-card-subtitle">
          <template v-if="sourceSubtitleSegments && sourceSubtitleSegments.mode === 'inline'">
            <span>{{ sourceSubtitleSegments.prefix }}</span><a v-if="!sourceMissing" @click.prevent="navigateToSource" href="#" class="npc-source-link">{{ sourceSubtitleSegments.name }}</a><span v-else>{{ sourceSubtitleSegments.name }}</span><span>{{ sourceSubtitleSegments.suffix }}</span><span v-if="sourceMissing" class="npc-source-deleted"> (deleted)</span>
          </template>
          <template v-else-if="sourceSubtitleSegments && sourceSubtitleSegments.mode === 'append'">
            <span>{{ sourceSubtitleSegments.origin }}</span>
            <span> · From </span>
            <a v-if="!sourceMissing" @click.prevent="navigateToSource" href="#" class="npc-source-link">{{ sourceSubtitleSegments.sourceName }}</a>
            <span v-else>{{ sourceSubtitleSegments.sourceName }}</span>
            <span v-if="sourceMissing" class="npc-source-deleted"> (deleted)</span>
          </template>
          <template v-else>
            <span v-if="origin">
              From <a v-if="shouldShowSourceLink" @click.prevent="navigateToSource" href="#" class="npc-source-link">{{ origin }}</a>
              <template v-else>{{ origin }}</template>
              <span v-if="sourceMissing" class="npc-source-deleted"> (deleted)</span>
            </span>
            <span v-if="origin && npc.type_info && npc.type_info !== origin"> · </span>
            <span v-if="npc.type_info && npc.type_info !== origin">{{ npc.type_info }}</span>
          </template>
        </p>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <ParCardButton
          v-if="editable && !isEditing && !loadingDescription"
          size="small"
          @click="$emit('start-edit')"
        >
          Edit NPC
        </ParCardButton>
      </div>
    </div>

    <!-- Content wrapper for view mode (centers all content with shared left edge) -->
    <div v-if="!isEditing" class="npc-card-content">
      <!-- Read-aloud - skeleton or content -->
      <div class="npc-card-read-aloud">
        <CdrSkeleton v-if="loadingDescription">
          <CdrSkeletonBone type="line" style="width:95%; margin-bottom: 0.5rem;" />
          <CdrSkeletonBone type="line" style="width:88%;" />
        </CdrSkeleton>
        <p v-else>{{ npc.read_aloud_description }}</p>
      </div>

      <!-- Body: description paragraphs - skeleton or content -->
      <div class="npc-card-body">
        <CdrSkeleton v-if="loadingDescription">
          <CdrSkeletonBone type="line" style="width:95%; margin-bottom: 0.5rem;" />
          <CdrSkeletonBone type="line" style="width:90%; margin-bottom: 0.5rem;" />
          <CdrSkeletonBone type="line" style="width:85%; margin-bottom: 0.5rem;" />
          <CdrSkeletonBone type="line" style="width:92%; margin-bottom: 1rem;" />
          <CdrSkeletonBone type="line" style="width:88%; margin-bottom: 0.5rem;" />
          <CdrSkeletonBone type="line" style="width:93%; margin-bottom: 0.5rem;" />
          <CdrSkeletonBone type="line" style="width:87%; margin-bottom: 1rem;" />
          <CdrSkeletonBone type="line" style="width:91%; margin-bottom: 0.5rem;" />
          <CdrSkeletonBone type="line" style="width:86%; margin-bottom: 0.5rem;" />
          <CdrSkeletonBone type="line" style="width:60%;" />
        </CdrSkeleton>
        <template v-else>
          <p v-for="(paragraph, index) in bodyParagraphs" :key="index">
            {{ paragraph }}
          </p>
        </template>
      </div>

      <!-- Flourish divider -->
      <svg v-if="(hasRelationships || loadingRelationships) && (npc.combined_details || loadingDescription)"
        viewBox="0 0 400 12" xmlns="http://www.w3.org/2000/svg" class="npc-flourish">
        <line x1="0" y1="6" x2="188" y2="6" stroke="var(--par-color-border-strong, #c9b99a)" stroke-width="0.75" />
        <line x1="212" y1="6" x2="400" y2="6" stroke="var(--par-color-border-strong, #c9b99a)" stroke-width="0.75" />
        <polygon points="200,1 206,6 200,11 194,6" fill="var(--par-color-title, #7a1f1f)" />
      </svg>

      <!-- Relationships - skeleton or content -->
      <div v-if="hasRelationships || loadingRelationships" class="npc-card-relationships">
        <p class="npc-card-relationships-title">Relationships</p>
        <CdrSkeleton v-if="loadingRelationships">
          <div>
            <div style="display: flex; gap: 0.5rem; align-items: baseline; margin-bottom: 0.25rem;">
              <CdrSkeletonBone type="line" style="width:20%; height: 1.6rem;" />
            </div>
            <CdrSkeletonBone type="line" style="width:100%; margin-top: 0" />
            <CdrSkeletonBone type="line" style="width:90%;" />
            <CdrSkeletonBone type="line" style="width:85%; margin-bottom: 1.25rem;" />
          </div>

          <div>
            <div style="display: flex; gap: 0.5rem; align-items: baseline; margin-bottom: 0.25rem;">
              <CdrSkeletonBone type="line" style="width:20%; height: 1.6rem;" />
            </div>
            <CdrSkeletonBone type="line" style="width:100%; margin-top: 0" />
            <CdrSkeletonBone type="line" style="width:90%;" />
            <CdrSkeletonBone type="line" style="width:85%; margin-bottom: 1.25rem;" />
          </div>

          <div>
            <div style="display: flex; gap: 0.5rem; align-items: baseline; margin-bottom: 0.25rem;">
              <CdrSkeletonBone type="line" style="width:20%; height: 1.6rem;" />
            </div>
            <CdrSkeletonBone type="line" style="width:100%; margin-top: 0" />
            <CdrSkeletonBone type="line" style="width:90%;" />
            <CdrSkeletonBone type="line" style="width:85%;" />
          </div>
        </CdrSkeleton>
        <template v-else>
          <div v-for="(description, name) in npc.relationships" :key="name" class="npc-relationship-card">
            <p class="npc-relationship-name">{{ name }}</p>
            <p class="npc-relationship-description">{{ description }}</p>
          </div>
        </template>
      </div>
    </div>

    <!-- Edit form (replaces body when editing) -->
    <div v-if="isEditing" class="npc-edit">
      <header class="npc-edit__header">
        <h2 class="npc-edit__title">Edit NPC</h2>
      </header>

      <ParInput v-model="editForm.name" label="Name" class="npc-edit__field" />

      <ParTextarea v-model="editForm.read_aloud_description"
        label="Read-aloud description"
        :rows="4"
        hint="The initial description when the NPC is first encountered."
        class="npc-edit__field" />

      <ParTextarea v-model="editForm.combined_details"
        label="Details"
        :rows="10"
        hint="Position, location, mannerisms, secrets, and roleplaying tips. Use double line breaks for paragraphs."
        class="npc-edit__field" />

      <section class="npc-edit__relationships">
        <h3 class="npc-edit__section-title">Relationships</h3>

        <p v-if="editForm.relationshipsArray.length === 0" class="npc-edit__empty">
          No relationships yet. Add one below or generate one.
        </p>

        <div v-for="(relationship, relIndex) in editForm.relationshipsArray" :key="relIndex"
          class="npc-edit__relationship-row">
          <ParInput v-model="relationship.name" label="Name" />
          <ParTextarea v-model="relationship.description"
            label="Description"
            :rows="2" />
          <div class="npc-edit__relationship-actions">
            <ParCardButton variant="danger" size="small" @click="deleteRelationshipFromForm(relIndex)">
              Remove
            </ParCardButton>
          </div>
        </div>

        <ParCardButton size="small" @click="addRelationshipToForm" class="npc-edit__add">
          + Add Relationship
        </ParCardButton>
      </section>

      <!-- Generate Relationship in Edit Mode -->
      <section v-if="showRelationshipGenerator" class="npc-edit__generate">
        <h3 class="npc-edit__section-title">Generate new relationship</h3>

        <div v-if="isGeneratingRelationship" class="npc-edit__generate-loading">
          <CdrSkeleton>
            <cdr-skeleton-bone type="line" style="margin-bottom: 0.5rem;" />
            <cdr-skeleton-bone type="line" />
            <cdr-skeleton-bone type="line" style="width: 80%;" />
          </CdrSkeleton>
        </div>

        <ParInput v-model="relationshipForm.name"
          label="Name"
          hint="The name of the related NPC." />

        <ParTextarea v-model="relationshipForm.description"
          label="Short description"
          :rows="2"
          hint='Brief description of their relationship (e.g., "the wizard&apos;s familiar", "his estranged sister").' />

        <div class="npc-edit__generate-actions">
          <ParCardButton @click="generateRelationship" :disabled="isGeneratingRelationship">
            Generate Relationship
          </ParCardButton>
        </div>
      </section>

      <footer class="npc-edit__footer">
        <ParCardButton variant="danger" @click="$emit('cancel-edit')">Cancel</ParCardButton>
        <ParCardButton @click="saveEdit">Save Changes</ParCardButton>
      </footer>
    </div>

    <!-- Footer Bar -->
    <div v-if="!loadingDescription && !loadingRelationships && !isEditing" class="card-footer-bar">
      <div class="card-footer-bar__actions">
        <ParCardButton v-if="shouldShowNpcGeneratorLink" @click="navigateToNPCGenerator">
          View in NPC Generator
        </ParCardButton>

        <ParCardButton v-if="showMoveToFolder" @click="$emit('move-to-folder')">
          Move to Folder
        </ParCardButton>

        <ParCardButton v-if="showExport" @click="$emit('toggle-export')">
          {{ exportOpen ? 'Hide Export' : 'Export' }}
        </ParCardButton>
      </div>

      <ParCardButton v-if="showDelete" variant="danger" @click="$emit('delete')">
        Delete
      </ParCardButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { CdrSkeleton, CdrSkeletonBone } from '@rei/cedar';
import { ParCardButton, ParInput, ParTextarea } from '@/parchment';
import { navigateToTool } from '@/util/navigation.mjs';
import { sourceExists } from '@/util/seeded-input.mjs';

const props = defineProps({
  // NPC data in normalized format
  npc: {
    type: Object,
    default: () => ({}),
  },

  // Where this NPC came from (shown in subtitle)
  origin: {
    type: String,
    default: null,
  },

  // Source type ('dungeon', 'setting', or 'item')
  sourceType: {
    type: String,
    default: null,
  },

  // The literal source-entity name to linkify inside `origin` (e.g., the
  // item / dungeon / setting name that appears inside a role-brief style
  // origin string). The card splits `origin` at the first occurrence of
  // this string and renders it as a deep link back to the source tool.
  // When `sourceName` is absent from `origin`, the link is appended after
  // a divider as a fallback. Pass null to fall back to the generic "From
  // {origin}" subtitle layout.
  sourceName: {
    type: String,
    default: null,
  },

  // The source-entity id (e.g., item.name, setting.id, dungeon.id). Used
  // to detect at render time whether the source still exists; if it's
  // gone, the back-link is suppressed and a "(deleted)" marker appears
  // in its place. Pass null to skip the existence check (falls back to
  // assuming the source exists, current behavior).
  sourceId: {
    type: String,
    default: null,
  },

  // Display context ('dungeon', 'setting', or 'generator')
  // Used to prevent showing links when viewing NPC in its source context
  displayType: {
    type: String,
    default: 'generator',
  },

  // NPC ID for deep linking
  npcId: {
    type: String,
    default: null,
  },

  // Show the edit button and enable edit mode
  editable: {
    type: Boolean,
    default: true,
  },

  // Currently in edit mode
  isEditing: {
    type: Boolean,
    default: false,
  },

  // Show the "Generate Relationship" form
  showRelationshipGenerator: {
    type: Boolean,
    default: false,
  },

  // Loading state for relationship generation
  isGeneratingRelationship: {
    type: Boolean,
    default: false,
  },

  // URL to view/edit in NPC generator (for embedded contexts)
  // Will be auto-generated if not provided but npc has required fields
  npcGeneratorUrl: {
    type: String,
    default: null,
  },

  // Show origin note: "Created in X. Changes here won't update it there."
  showOriginNote: {
    type: Boolean,
    default: false,
  },

  // Show delete button in header
  showDelete: {
    type: Boolean,
    default: false,
  },

  // Show "Move to Folder" footer action. Parent handles the actual
  // move flow; the card just emits 'move-to-folder' on click.
  showMoveToFolder: {
    type: Boolean,
    default: false,
  },

  // Show the Export toggle in the footer. Emits 'toggle-export'.
  showExport: {
    type: Boolean,
    default: false,
  },

  // Whether the parent's export panel is currently open. Drives the
  // toggle button label between "Export" and "Hide Export".
  exportOpen: {
    type: Boolean,
    default: false,
  },

  // Show "View in NPC Generator" link in footer
  showNpcGeneratorLink: {
    type: Boolean,
    default: true,
  },

  // Loading states for skeleton display
  loadingDescription: {
    type: Boolean,
    default: false,
  },

  loadingRelationships: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  'start-edit',
  'save-edit',
  'cancel-edit',
  'delete',
  'generate-relationship',
  'add-relationship',
  'delete-relationship',
  'move-to-folder',
  'toggle-export',
]);

// Computed: body paragraphs
const bodyParagraphs = computed(() => {
  if (!props.npc.combined_details) return [];
  return props.npc.combined_details.split('\n\n').filter(p => p.trim());
});

// Computed: has relationships
const hasRelationships = computed(() => {
  return props.npc.relationships && Object.keys(props.npc.relationships).length > 0;
});

// Computed: Has the back-link target been deleted? Render-time check
// against the source-tool's storage. False when no sourceId is passed
// (callers that don't care about deletion semantics get the original
// always-show-link behavior).
const sourceMissing = computed(() => {
  if (!props.sourceType || !props.sourceId) return false;
  return !sourceExists(props.sourceType, props.sourceId);
});

// Computed: Should show link to source generator?
const shouldShowSourceLink = computed(() => {
  if (!props.sourceType || !props.origin) return false;
  // Don't show link if viewing NPC in its source context
  if (props.displayType === props.sourceType) return false;
  // Don't show link if the source has been deleted — the link target
  // would 404. The (deleted) marker carries the user-facing signal.
  if (sourceMissing.value) return false;
  return true;
});

// Computed: subtitle layout when an explicit source name is passed in.
// - 'inline': sourceName appears inside origin (role_brief). Split into [prefix, link, suffix].
// - 'append': sourceName not in origin. Show origin + " · From [linked sourceName]".
// Returns null when no sourceName is provided so the generic "From {origin}"
// subtitle layout applies.
const sourceSubtitleSegments = computed(() => {
  if (!props.sourceName) return null;
  const origin = props.origin || '';
  const sourceName = props.sourceName;
  const idx = origin.indexOf(sourceName);
  if (idx === -1) {
    return { mode: 'append', origin, sourceName };
  }
  return {
    mode: 'inline',
    prefix: origin.substring(0, idx),
    name: sourceName,
    suffix: origin.substring(idx + sourceName.length),
  };
});

// Computed: Should show link to NPC Generator?
const shouldShowNpcGeneratorLink = computed(() => {
  if (!props.showNpcGeneratorLink) return false;
  // If URL explicitly provided, we can navigate
  if (props.npcGeneratorUrl) return true;
  // Or if we have required fields (origin and name)
  if (props.origin && props.npc.name) return true;
  return false;
});

// Edit form state
const editForm = ref({
  name: '',
  read_aloud_description: '',
  combined_details: '',
  relationshipsArray: [],
});

// Relationship generator form
const relationshipForm = ref({
  name: '',
  description: '',
});

// Watch isEditing to populate edit form
watch(() => props.isEditing, (isEditing) => {
  if (isEditing) {
    // Convert relationships object to array
    const relationshipsArray = [];
    if (props.npc.relationships) {
      Object.entries(props.npc.relationships).forEach(([name, description]) => {
        relationshipsArray.push({ name, description });
      });
    }

    editForm.value = {
      name: props.npc.name || '',
      read_aloud_description: props.npc.read_aloud_description || '',
      combined_details: props.npc.combined_details || '',
      relationshipsArray,
    };
  }
});

// Watch relationships to update edit form when they change (e.g., after generation)
watch(() => props.npc.relationships, (newRelationships) => {
  if (props.isEditing && newRelationships) {
    // Update the relationships array in the form
    const relationshipsArray = [];
    Object.entries(newRelationships).forEach(([name, description]) => {
      relationshipsArray.push({ name, description });
    });
    editForm.value.relationshipsArray = relationshipsArray;
  }
}, { deep: true });

function addRelationshipToForm() {
  editForm.value.relationshipsArray.push({ name: '', description: '' });
}

function deleteRelationshipFromForm(index) {
  editForm.value.relationshipsArray.splice(index, 1);
}

function saveEdit() {
  // Convert relationships array back to object
  const relationshipsObject = {};
  editForm.value.relationshipsArray.forEach(rel => {
    if (rel.name && rel.description) {
      relationshipsObject[rel.name] = rel.description;
    }
  });

  const editedNPC = {
    name: editForm.value.name,
    read_aloud_description: editForm.value.read_aloud_description,
    combined_details: editForm.value.combined_details,
    relationships: relationshipsObject,
  };

  emit('save-edit', editedNPC);
}

function generateRelationship() {
  if (!relationshipForm.value.name || !relationshipForm.value.description) {
    alert('Please provide both a name and short description for the relationship');
    return;
  }

  emit('generate-relationship', {
    name: relationshipForm.value.name,
    description: relationshipForm.value.description,
  });

  // Clear form after emit (parent will handle the actual generation)
  relationshipForm.value.name = '';
  relationshipForm.value.description = '';
}

// Per-source nav: which tool id to route to and which params to pass.
// Items deep-link to the matching item by name; dungeons and settings
// open the source tool's NPCs tab filtered by the origin string.
const SOURCE_TYPE_NAV = {
  item:    (sourceName, origin) => ['item-generator',    { item: sourceName }],
  dungeon: (sourceName, origin) => ['dungeon-generator', { source: origin, tab: 'npcs' }],
  setting: (sourceName, origin) => ['setting-generator', { source: origin, tab: 'npcs' }],
};

function navigateToSource() {
  const builder = SOURCE_TYPE_NAV[props.sourceType];
  if (!builder) return;
  // For dungeons/settings the link only makes sense when not viewing the
  // NPC in its own source context.
  if (props.sourceType !== 'item' && !shouldShowSourceLink.value) return;
  const [toolName, params] = builder(props.sourceName, props.origin);
  navigateToTool(toolName, params);
}

function navigateToNPCGenerator() {
  if (!shouldShowNpcGeneratorLink.value) return;

  // Prefer the stable npc_id when available — the receiving handler walks
  // every folder by id, so moving the NPC between folders doesn't break
  // the link. Fall back to folder + npc_name only for legacy data that
  // pre-dates id assignment (the receiving handler also walks by name
  // across folders for that case, so either path survives reorganization).
  const params = props.npc?.npc_id
    ? { npc: props.npc.npc_id }
    : { folder: props.origin, npc_name: props.npc.name };

  navigateToTool('npc-generator', params);
}
</script>

<style scoped>
/* Card surface uses the parchment palette directly — no local --npc-*
   vars. The previous local palette ran slightly warmer than the rest of
   the parchment system (var(--par-color-surface, #fdfbf6) surface, var(--par-color-text, #222) body); converged to the
   parchment tokens so the NPC card renders in the same paper tone as the
   item card and any future card surface. If the NPC card needs to
   diverge visually for a real reason, swap specific tokens at the
   .npc-card scope rather than reintroducing a parallel palette. */

/* Card container */
.npc-card {
  background: var(--par-color-surface, #fdfbf6);
  border: 1.5px solid var(--par-color-border-strong, #c9b99a);
  border-top: 3px solid var(--par-color-title, #7a1f1f);
  border-radius: 2px;
  /* Card root carries the `parchment` marker class (see App.vue) which
     opts the card and its descendants out of the project-wide sans-serif
     override, so this declaration applies normally and inherits down. */
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  overflow: hidden;
  margin-bottom: 1.5rem;
  /* Priority 2: Hardcode font sizing to prevent WordPress theme overrides */
  font-size: 17px;
  line-height: 1.75;
}

/* Content wrapper - centers all view mode content with shared left edge */
.npc-card-content {
  /* Priority 1: Limit line length for readability - applied to wrapper so all content shares one left edge */
  max-width: 65ch;
  margin-inline: auto;
}

/* Header */
.npc-card-header {
  /* Priority 5: Increase horizontal padding */
  padding: 2rem 3rem 2rem;
  margin-bottom: 1.5rem;
  background: rgba(0, 0, 0, 0.03);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.npc-card-name {
  margin: 0 0 0.125rem;
  font-size: 2.8rem;
  font-weight: 500;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.02em;
}

.npc-card-subtitle {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  color: var(--par-color-text-muted, #6b6b6b);
  font-style: italic;
}

.npc-source-link {
  color: var(--par-color-title, #7a1f1f);
  text-decoration: underline;
  font-style: normal;
}

.npc-source-link:hover {
  color: var(--par-color-title-deep, #58180d);
  text-decoration: none;
}

.npc-source-deleted {
  color: var(--par-color-text-muted, #6b6b6b);
  font-style: italic;
  font-size: 0.95em;
}

/* Origin note */
.npc-card-origin-note {
  /* Priority 5: Increase horizontal padding */
  padding: 0.5rem 2rem;
  background: var(--par-color-callout-bg, #f3ebda);
  border-top: 1px solid var(--par-color-border-strong, #c9b99a);
  border-bottom: 1px solid var(--par-color-border-strong, #c9b99a);
  margin: 0 0 0.75rem;
}

.npc-card-origin-note p {
  margin: 0;
  font-size: 1.1rem;
  color: var(--par-color-text-muted, #6b6b6b);
  font-style: italic;
}

/* Read-aloud */
.npc-card-read-aloud {
  border-top: 1px solid var(--par-color-border-strong, #c9b99a);
  border-bottom: 1px solid var(--par-color-border-strong, #c9b99a);
  /* Priority 6: Add left border accent for quick scanning */
  border-left: 3px solid var(--par-color-title, #7a1f1f);
  /* Priority 5: Increase horizontal padding */
  margin: 2rem 1.5rem 2rem;
  padding: 1rem 0 1rem 1.25rem;
}

.npc-card-read-aloud p {
  margin: 0;
  font-size: 1.6rem;
  font-style: italic;
  color: var(--par-color-text, #222);
  line-height: 3rem;
}

/* Flourish divider */
.npc-flourish {
  width: 60%;
  height: 12px;
  display: block;
  margin: 1rem auto;
}

/* Body */
.npc-card-body {
  /* Priority 5: Increase horizontal padding */
  padding: 0.75rem 2rem 2rem;
}

.npc-card-body p {
  margin: 0 0 0.75rem;
  font-size: 1.6rem;
  color: var(--par-color-text, #222);
  line-height: 3rem;
}

/* Priority 3: Add more spacing between consecutive paragraphs */
.npc-card-body p+p {
  margin-top: 1em;
}

.npc-card-body p:last-child {
  margin-bottom: 0;
}

/* Drop cap on first body paragraph */
.npc-card-body p:first-child::first-letter {
  font-size: 2rem;
  float: left;
  line-height: 1;
  margin: 2px 2px 0 0;
  color: var(--par-color-title, #7a1f1f);
  font-weight: 500;
}

.npc-card-label {
  color: var(--par-color-title, #7a1f1f);
  font-weight: 500;
  font-size: 1.6rem;
}

/* ============================================
   NPC edit panel — parchment-styled fields
   that sit inline inside the surrounding
   .npc-card chrome. No outer border / surface
   here: the parent card already provides the
   warm-red top rule and tan paper background,
   so an extra frame would visually double-up.
   ============================================ */
.npc-edit {
  padding: 0 3rem 2rem;
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.npc-edit__header {
  /* No extra spacing — the parent card-header already has margin-bottom. */
}

.npc-edit__title {
  margin: 0;
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.85rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.02em;
}

.npc-edit__section-title {
  margin: 0;
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.02em;
}

.npc-edit__relationships,
.npc-edit__generate {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.npc-edit__empty {
  margin: 0;
  font-style: italic;
  font-size: 1.4rem;
  color: var(--par-color-text-muted, #6b6b6b);
}

.npc-edit__relationship-row {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.9rem 1.1rem;
  background: rgba(232, 226, 212, 0.35);
  border: 1px solid var(--par-color-divider, var(--par-color-divider, #e2dccd));
  border-radius: var(--par-radius-sm, 3px);
}

.npc-edit__relationship-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.25rem;
}

.npc-edit__add {
  align-self: flex-start;
}

.npc-edit__generate-loading {
  padding: 0.625rem 0.75rem;
  background: rgba(232, 226, 212, 0.35);
  border: 1px solid var(--par-color-divider, var(--par-color-divider, #e2dccd));
  border-radius: var(--par-radius-sm, 3px);
}

.npc-edit__generate-actions {
  display: flex;
  justify-content: flex-end;
}

.npc-edit__footer {
  margin-top: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--par-color-divider, var(--par-color-divider, #e2dccd));
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

@media (max-width: 600px) {
  .npc-edit {
    padding: 0 1.5rem 1.5rem;
  }
}

/* Relationships */
.npc-card-relationships {
  /* Priority 5: Increase horizontal padding */
  padding: 0.75rem 2rem 3rem;
}

.npc-card-relationships-title {
  margin: 0 0 0.625rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--par-color-title, #7a1f1f);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.npc-relationship-card {
  background: var(--par-color-callout-bg, #f3ebda);
  border-radius: 3px;
  padding: 0.625rem 0.75rem;
  margin-bottom: 0.75rem;
}

/* Priority 4: Better spacing between relationship cards */
.npc-relationship-card+.npc-relationship-card {
  margin-top: 1.25rem;
}

.npc-relationship-card:last-child {
  margin-bottom: 0;
}

.npc-relationship-name {
  margin: 0 0 0.25rem;
  font-size: 1.6rem;
  /* Priority 4: Bolder and red accent for visual hierarchy */
  font-weight: 700;
  color: var(--par-color-title, #7a1f1f);
}

.npc-relationship-description {
  margin: 0;
  font-size: 1.6rem;
  color: var(--par-color-text, #222);
  line-height: 3rem;
}

/* Relationship generator wrapper (used outside of edit mode if/when this
   renders standalone — kept for parity; the inline edit-mode generator
   uses .npc-edit__generate styles instead). */
.npc-card-relationship-generator {
  border-top: 1px solid var(--par-color-border-strong, #c9b99a);
  padding: 1rem 2rem 1.25rem;
  background: var(--par-color-surface, #fdfbf6);
}

/* Footer bar for card actions */
.card-footer-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--par-color-divider, var(--par-color-divider, #e2dccd));
  background: rgba(0, 0, 0, 0.02);
}

.card-footer-bar__actions {
  display: flex;
  gap: 0.25rem;
}

@media (max-width: 480px) {
  .card-footer-bar {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .card-footer-bar__actions {
    flex-wrap: wrap;
  }
}
</style>
