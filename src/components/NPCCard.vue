<template>
  <div class="npc-card">
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
        <button v-if="editable && !isEditing && !loadingDescription" class="npc-edit-button"
          @click="$emit('start-edit')">Edit
          NPC</button>
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
        <line x1="0" y1="6" x2="188" y2="6" stroke="#c9b99a" stroke-width="0.75" />
        <line x1="212" y1="6" x2="400" y2="6" stroke="#c9b99a" stroke-width="0.75" />
        <polygon points="200,1 206,6 200,11 194,6" fill="#7b2d26" />
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
    <div v-if="isEditing" class="npc-card-edit-form">
      <cdr-input v-model="editForm.name" label="NPC Name" background="secondary" class="edit-field" />

      <cdr-input v-model="editForm.read_aloud_description" label="Read-Aloud Description" background="secondary"
        :rows="4" tag="textarea" class="edit-field">
        <template #helper-text-bottom>
          The initial description when the NPC is first encountered
        </template>
      </cdr-input>

      <cdr-input v-model="editForm.combined_details" label="NPC Details" background="secondary" :rows="10"
        tag="textarea" class="edit-field">
        <template #helper-text-bottom>
          Position, location, mannerisms, secrets, and roleplaying tips. Use double line breaks for paragraphs.
        </template>
      </cdr-input>

      <h3 class="relationships-edit-title">Relationships</h3>
      <div v-if="editForm.relationshipsArray.length > 0">
        <div v-for="(relationship, relIndex) in editForm.relationshipsArray" :key="relIndex"
          class="edit-relationship-card">
          <cdr-input v-model="relationship.name" label="Name" background="secondary" style="margin-bottom: 1rem;" />
          <cdr-input v-model="relationship.description" label="Relationship Description" background="secondary"
            :rows="2" tag="textarea" style="margin-bottom: 1rem;" />
          <cdr-button size="small" @click="deleteRelationshipFromForm(relIndex)" modifier="secondary">
            Remove Relationship
          </cdr-button>
        </div>
      </div>
      <div v-else>
        <p style="font-style: italic; color: #666; margin-bottom: 1rem;">
          No relationships yet. Add one below or generate one.
        </p>
      </div>

      <cdr-button size="small" @click="addRelationshipToForm" modifier="secondary" style="margin-bottom: 1.5rem;">
        Add Relationship
      </cdr-button>

      <!-- Generate Relationship in Edit Mode -->
      <div v-if="showRelationshipGenerator">
        <h4 class="relationship-gen-title">Generate New Relationship</h4>

        <div v-if="isGeneratingRelationship" class="relationship-loading">
          <CdrSkeleton>
            <cdr-skeleton-bone type="line" style="margin-bottom: 0.5rem;" />
            <cdr-skeleton-bone type="line" />
            <cdr-skeleton-bone type="line" style="width: 80%;" />
          </CdrSkeleton>
        </div>

        <cdr-input v-model="relationshipForm.name" label="Name" background="secondary" style="margin-bottom: 1rem;">
          <template #helper-text-bottom>
            The name of the related NPC
          </template>
        </cdr-input>
        <cdr-input v-model="relationshipForm.description" label="Short Description" background="secondary" :rows="2"
          tag="textarea" style="margin-bottom: 1.5rem;">
          <template #helper-text-bottom>
            Brief description of their relationship (e.g., "the wizard's familiar", "his estranged sister")
          </template>
        </cdr-input>
        <cdr-button @click="generateRelationship" :full-width="true" :disabled="isGeneratingRelationship"
          style="margin-bottom: 1.5rem;">Generate Relationship</cdr-button>
      </div>

      <div class="button-group">
        <cdr-button @click="saveEdit">Save Changes</cdr-button>
        <cdr-button @click="$emit('cancel-edit')" modifier="secondary">Cancel</cdr-button>
      </div>
    </div>

    <!-- Footer Bar -->
    <div v-if="!loadingDescription && !loadingRelationships && !isEditing" class="card-footer-bar">
      <div class="card-footer-bar__actions">
        <CardFooterAction v-if="shouldShowNpcGeneratorLink" @click="navigateToNPCGenerator">
          <template #icon>📝</template>
          View in NPC Generator
        </CardFooterAction>

        <!-- Add other NPC-specific actions here as needed -->
      </div>

      <CardFooterAction v-if="showDelete" @click="$emit('delete')" variant="danger">
        <template #icon>🗑️</template>
        Delete
      </CardFooterAction>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { CdrInput, CdrButton, CdrSkeleton, CdrSkeletonBone } from '@rei/cedar';
import CardFooterAction from './CardFooterAction.vue';
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

  navigateToTool('npc-generator', {
    folder: props.origin,
    npc_name: props.npc.name
  });
}
</script>

<style scoped>
/* Color palette */
:root {
  --npc-bg: #faf8f3;
  --npc-border: #c9b99a;
  --npc-accent: #7b2d26;
  --npc-text: #4a4236;
  --npc-muted: #8a7e6b;
  --npc-card-bg: #f4f0e8;
  --npc-badge-bg: #e8e0d0;
  --npc-badge-text: #6b5f4f;
}

/* Card container */
.npc-card {
  background: #faf8f3;
  border: 1.5px solid #c9b99a;
  border-top: 3px solid #7b2d26;
  border-radius: 2px;
  font-family: Georgia, 'Times New Roman', serif;
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
  color: #7b2d26;
  letter-spacing: 0.02em;
}

.npc-card-subtitle {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  color: #8a7e6b;
  font-style: italic;
}

.npc-source-link {
  color: #7b2d26;
  text-decoration: underline;
  font-style: normal;
}

.npc-source-link:hover {
  color: #5a1f1a;
  text-decoration: none;
}

.npc-source-deleted {
  color: #8a7e6b;
  font-style: italic;
  font-size: 0.95em;
}

.npc-edit-button {
  font-size: 1.2rem;
  color: #7b2d26;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  padding: 3px 10px;
  border: 1px solid #c9b99a;
  border-radius: 3px;
  background: #f4f0e8;
  cursor: pointer;
  white-space: nowrap;
}

.npc-edit-button:hover {
  background: #ece6d8;
}

/* Origin note */
.npc-card-origin-note {
  /* Priority 5: Increase horizontal padding */
  padding: 0.5rem 2rem;
  background: #f4f0e8;
  border-top: 1px solid #c9b99a;
  border-bottom: 1px solid #c9b99a;
  margin: 0 0 0.75rem;
}

.npc-card-origin-note p {
  margin: 0;
  font-size: 1.1rem;
  color: #8a7e6b;
  font-style: italic;
}

/* Read-aloud */
.npc-card-read-aloud {
  border-top: 1px solid #c9b99a;
  border-bottom: 1px solid #c9b99a;
  /* Priority 6: Add left border accent for quick scanning */
  border-left: 3px solid #7b2d26;
  /* Priority 5: Increase horizontal padding */
  margin: 2rem 1.5rem 2rem;
  padding: 1rem 0 1rem 1.25rem;
}

.npc-card-read-aloud p {
  margin: 0;
  font-size: 1.6rem;
  font-style: italic;
  color: #4a4236;
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
  color: #4a4236;
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
  color: #7b2d26;
  font-weight: 500;
}

.npc-card-label {
  color: #7b2d26;
  font-weight: 500;
  font-size: 1.6rem;
}

/* Edit form */
.npc-card-edit-form {
  /* Priority 5: Increase horizontal padding */
  padding: 0.75rem 2rem 1.5rem;
  background: #faf8f3;
}

.edit-field {
  margin-bottom: 1.25rem;
}

.relationships-edit-title {
  margin: 1.5rem 0 0.75rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: #7b2d26;
}

.edit-relationship-card {
  background: #f4f0e8;
  border-radius: 3px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
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
  color: #7b2d26;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.npc-relationship-card {
  background: #f4f0e8;
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
  color: #7b2d26;
}

.npc-relationship-description {
  margin: 0;
  font-size: 1.6rem;
  color: #6b5f4f;
  line-height: 3rem;
}

/* Relationship generator */
.npc-card-relationship-generator {
  border-top: 1px solid #c9b99a;
  /* Priority 5: Increase horizontal padding */
  padding: 1rem 2rem 1.25rem;
  background: #f9f6f0;
}

.relationship-gen-title {
  margin: 0 0 1rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: #7b2d26;
}

.relationship-loading {
  margin-bottom: 1rem;
  padding: 0.625rem 0.75rem;
  background: #f4f0e8;
  border-radius: 3px;
}

/* Footer bar for card actions */
.card-footer-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e0d6c2;
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
