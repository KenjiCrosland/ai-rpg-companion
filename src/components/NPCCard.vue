<template>
  <div class="npc-card">
    <!-- Header: name + buttons -->
    <div class="npc-card-header">
      <div>
        <h2 class="npc-card-name">{{ npc.name }}</h2>
        <p v-if="origin || npc.type_info" class="npc-card-subtitle">
          <span v-if="origin">From {{ origin }}</span>
          <span v-if="origin && npc.type_info"> · </span>
          <span v-if="npc.type_info">{{ npc.type_info }}</span>
        </p>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center;">
        <button v-if="editable && !isEditing" class="npc-edit-button" @click="$emit('start-edit')">Edit NPC</button>
      </div>
    </div>

    <!-- Origin note (for imported NPCs) -->
    <div v-if="showOriginNote && origin && !isEditing" class="npc-card-origin-note">
      <p>Created in {{ origin }}. Changes here won't update it there.</p>
    </div>

    <!-- Read-aloud -->
    <div v-if="npc.read_aloud_description && !isEditing" class="npc-card-read-aloud">
      <p>{{ npc.read_aloud_description }}</p>
    </div>

    <!-- Body: description paragraphs (view mode) -->
    <div v-if="!isEditing && npc.combined_details" class="npc-card-body">
      <p v-for="(paragraph, index) in bodyParagraphs" :key="index">
        {{ paragraph }}
      </p>
      <svg v-if="npc.combined_details && !isEditing" viewBox="0 0 400 12" xmlns="http://www.w3.org/2000/svg"
        class="npc-flourish">
        <line x1="0" y1="6" x2="188" y2="6" stroke="#c9b99a" stroke-width="0.75" />
        <line x1="212" y1="6" x2="400" y2="6" stroke="#c9b99a" stroke-width="0.75" />
        <polygon points="200,1 206,6 200,11 194,6" fill="#7b2d26" />
      </svg>

      <p v-if="npc.secret">
        <span class="npc-card-label">Secret:</span> {{ npc.secret }}
      </p>
      <p v-if="npc.roleplaying_tips">
        <span class="npc-card-label">Roleplaying:</span> {{ npc.roleplaying_tips }}
      </p>
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

    <!-- Flourish divider -->
    <svg v-if="hasRelationships && npc.combined_details && !isEditing" viewBox="0 0 400 12"
      xmlns="http://www.w3.org/2000/svg" class="npc-flourish">
      <line x1="0" y1="6" x2="188" y2="6" stroke="#c9b99a" stroke-width="0.75" />
      <line x1="212" y1="6" x2="400" y2="6" stroke="#c9b99a" stroke-width="0.75" />
      <polygon points="200,1 206,6 200,11 194,6" fill="#7b2d26" />
    </svg>

    <!-- Relationships (view mode) -->
    <div v-if="hasRelationships && !isEditing" class="npc-card-relationships">
      <p class="npc-card-relationships-title">Relationships</p>
      <div v-for="(description, name) in npc.relationships" :key="name" class="npc-relationship-card">
        <p class="npc-relationship-name">{{ name }}</p>
        <p class="npc-relationship-description">{{ description }}</p>
      </div>
    </div>

    <!-- Footer -->
    <div class="npc-card-footer">
      <button v-if="showDelete" class="npc-footer-link npc-delete-text" @click="$emit('delete')">
        Delete NPC
      </button>
      <div v-else></div>
      <a v-if="npcGeneratorLink" :href="npcGeneratorLink" class="npc-footer-link">
        View in NPC Generator
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { CdrInput, CdrButton, CdrSkeleton, CdrSkeletonBone } from '@rei/cedar';

const props = defineProps({
  // NPC data in normalized format
  npc: {
    type: Object,
    required: true,
  },

  // Where this NPC came from (shown in subtitle)
  origin: {
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

// Computed: NPC Generator URL with params
const npcGeneratorLink = computed(() => {
  // If URL explicitly provided, use it
  if (props.npcGeneratorUrl) {
    return props.npcGeneratorUrl;
  }

  // Auto-generate URL if we have required fields (origin and name)
  if (props.origin && props.npc.name) {
    const base = 'https://cros.land/npc-generator/';
    const params = new URLSearchParams();
    params.set('folder', props.origin);
    params.set('name', props.npc.name);
    return `${base}?${params.toString()}`;
  }

  return null;
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
}

/* Header */
.npc-card-header {
  padding: 1.25rem 1.5rem 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.npc-card-name {
  margin: 0 0 0.125rem;
  font-size: 24px;
  font-weight: 500;
  color: #7b2d26;
  letter-spacing: 0.02em;
}

.npc-card-subtitle {
  margin: 0;
  font-size: 12px;
  color: #8a7e6b;
  font-style: italic;
}

.npc-edit-button {
  font-size: 12px;
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
  padding: 0.5rem 1.5rem;
  background: #f4f0e8;
  border-top: 1px solid #c9b99a;
  border-bottom: 1px solid #c9b99a;
  margin: 0 0 0.75rem;
}

.npc-card-origin-note p {
  margin: 0;
  font-size: 11px;
  color: #8a7e6b;
  font-style: italic;
}

/* Read-aloud */
.npc-card-read-aloud {
  border-top: 1px solid #c9b99a;
  border-bottom: 1px solid #c9b99a;
  margin: 0 1.5rem;
  padding: 1rem 0;
}

.npc-card-read-aloud p {
  margin: 0;
  font-size: 14px;
  font-style: italic;
  color: #4a4236;
  line-height: 1.65;
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
  padding: 0.75rem 1.5rem 1rem;
}

.npc-card-body p {
  margin: 0 0 0.75rem;
  font-size: 13.5px;
  color: #4a4236;
  line-height: 1.65;
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
}

/* Edit form */
.npc-card-edit-form {
  padding: 0.75rem 1.5rem 1.5rem;
  background: #faf8f3;
}

.edit-field {
  margin-bottom: 1.25rem;
}

.relationships-edit-title {
  margin: 1.5rem 0 0.75rem;
  font-size: 15px;
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
  padding: 0.75rem 1.5rem 1rem;
}

.npc-card-relationships-title {
  margin: 0 0 0.625rem;
  font-size: 13px;
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

.npc-relationship-card:last-child {
  margin-bottom: 0;
}

.npc-relationship-name {
  margin: 0 0 0.25rem;
  font-size: 13px;
  font-weight: 500;
  color: #4a4236;
}

.npc-relationship-description {
  margin: 0;
  font-size: 12.5px;
  color: #6b5f4f;
  line-height: 1.55;
}

/* Relationship generator */
.npc-card-relationship-generator {
  border-top: 1px solid #c9b99a;
  padding: 1rem 1.5rem 1.25rem;
  background: #f9f6f0;
}

.relationship-gen-title {
  margin: 0 0 1rem;
  font-size: 14px;
  font-weight: 500;
  color: #7b2d26;
}

.relationship-loading {
  margin-bottom: 1rem;
  padding: 0.625rem 0.75rem;
  background: #f4f0e8;
  border-radius: 3px;
}

/* Footer */
.npc-card-footer {
  border-top: 1px solid #c9b99a;
  padding: 0.625rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f4f0e8;
}

.npc-footer-link {
  font-size: 12px;
  color: #7b2d26;
  text-decoration: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.npc-footer-link:hover {
  text-decoration: underline;
}

.npc-delete-text {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #8a7e6b;
}

.npc-delete-text:hover {
  color: #7b2d26;
}
</style>
