<template>
  <div class="add-related-place">
    <ParAddNewButton
      v-if="!expanded"
      @click="expanded = true"
    >
      + Add a Related Place
    </ParAddNewButton>

    <form
      v-else
      class="add-related-place-form"
      @submit.prevent="onSubmit"
    >
      <div class="add-related-place-row">
        <label class="add-related-place-label">
          <span class="add-related-place-label-text">Relationship</span>
          <select v-model="kind" class="add-related-place-select">
            <option value="parent">Part Of — a larger place {{ settingName }} sits inside</option>
            <option value="sibling">Neighbors — a peer place at similar scale</option>
            <option value="sublocation">Contains — a place inside {{ settingName }}</option>
          </select>
        </label>
      </div>

      <div class="add-related-place-row">
        <label class="add-related-place-label">
          <span class="add-related-place-label-text">Name <span class="add-related-place-optional">(optional)</span></span>
          <input
            v-model="name"
            type="text"
            class="add-related-place-input"
            :placeholder="namePlaceholder"
            @keydown.enter.prevent="onSubmit"
          />
        </label>
      </div>

      <div class="add-related-place-row">
        <label class="add-related-place-label">
          <span class="add-related-place-label-text">Description <span class="add-related-place-optional">(optional)</span></span>
          <input
            v-model="roleBrief"
            type="text"
            class="add-related-place-input"
            :placeholder="rolePlaceholder"
            @keydown.enter.prevent="onSubmit"
          />
        </label>
      </div>

      <p class="add-related-place-helper">
        Leave both fields blank to let the AI invent a fresh place of this kind.
      </p>

      <div class="add-related-place-actions">
        <ParActionButton
          variant="primary-outline"
          @click="onSubmit"
        >
          Create Setting
        </ParActionButton>
        <button type="button" class="add-related-place-cancel" @click="reset">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ParActionButton, ParAddNewButton } from '@/parchment';

// `computed` retained for the dynamic placeholders below — submit
// validation isn't needed anymore now that name + description are
// both optional (kind has a default, so the form is always
// submittable; empty fields signal "let the AI invent freely").

const props = defineProps({
  settingName: {
    type: String,
    default: 'this setting',
  },
});

const emit = defineEmits(['add-and-promote']);

const expanded = ref(false);
const kind = ref('sibling');
const name = ref('');
const roleBrief = ref('');

const namePlaceholder = computed(() => {
  if (kind.value === 'parent') return 'Leave blank, or e.g., The Northern Marches';
  if (kind.value === 'sibling') return 'Leave blank, or e.g., Aethelmar';
  return 'Leave blank, or e.g., The Bell-Quarter';
});

const rolePlaceholder = computed(() => {
  if (kind.value === 'parent') return 'e.g., Kingdom containing the city';
  if (kind.value === 'sibling') return 'e.g., Trading city to the east';
  return 'e.g., Foundry district by the river';
});

function onSubmit() {
  emit('add-and-promote', {
    kind: kind.value,
    name: name.value.trim(),
    role_brief: roleBrief.value.trim(),
    suggested_setting_type: '',
  });
  reset();
}

function reset() {
  expanded.value = false;
  kind.value = 'sibling';
  name.value = '';
  roleBrief.value = '';
}

// Exposed so the section header's inline "added manually" link can
// open the form without duplicating the toggle button's state. Single
// source of truth (expanded ref); two affordances (toggle + link)
// both flip it.
defineExpose({
  expand() {
    expanded.value = true;
  },
});
</script>

<style scoped lang="scss">
.add-related-place {
  margin: 0 0 1.5rem 0;
}

.add-related-place-form {
  padding: 1.25rem;
  border: 1px solid var(--par-color-divider, #e2dccd);
  border-radius: var(--par-radius-sm, 3px);
  /* Cleanest cream so the form lifts off the page-surface tint of
     the surrounding Related Places section — same surface-contrast
     pattern the row cards use. */
  background: var(--par-color-surface, #fdfbf6);
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
}

.add-related-place-row {
  margin-bottom: 0.9rem;

  &:last-of-type {
    margin-bottom: 1.1rem;
  }
}

.add-related-place-label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.add-related-place-label-text {
  /* Matches the Related Places section labels (PART OF, NEIGHBORS,
     CONTAINS) — lapis chrome, sans, compact, wide letter-spacing.
     Keeps the form's field labels in the same register as the
     section labels so the workspace reads as a single visual layer. */
  font-family: var(--par-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  font-size: 1.1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--par-color-action-primary, #2A4D70);
}

.add-related-place-optional {
  text-transform: none;
  letter-spacing: 0;
  font-weight: 400;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}

.add-related-place-select,
.add-related-place-input {
  font-family: inherit;
  font-size: 1.5rem;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--par-color-divider, #c8bfac);
  border-radius: var(--par-radius-sm, 3px);
  background: #fff;
  color: var(--par-color-text, #222);

  &:focus {
    outline: none;
    border-color: var(--par-color-title, #7a1f1f);
    box-shadow: 0 0 0 2px rgba(122, 31, 31, 0.12);
  }
}

.add-related-place-helper {
  margin: 0 0 1rem 0;
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.5;
}

.add-related-place-actions {
  display: flex;
  gap: 0.6rem;
  align-items: center;
}

.add-related-place-cancel {
  appearance: none;
  -webkit-appearance: none;
  background: none;
  border: none;
  margin: 0;
  padding: 0.5rem 0.7rem;
  font-family: inherit;
  font-size: 1.4rem;
  color: var(--par-color-text-muted, #6b6b6b);
  cursor: pointer;

  &:hover {
    color: var(--par-color-title, #7a1f1f);
  }
}
</style>
