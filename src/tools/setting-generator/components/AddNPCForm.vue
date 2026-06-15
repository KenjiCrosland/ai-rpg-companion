<template>
  <div class="add-npc">
    <ParAddNewButton
      v-if="!expanded"
      @click="expanded = true"
    >
      + Add an NPC
    </ParAddNewButton>

    <form
      v-else
      class="add-npc-form"
      @submit.prevent="onSubmit"
    >
      <div class="add-npc-row">
        <label class="add-npc-label">
          <span class="add-npc-label-text">Name <span class="add-npc-optional">(optional)</span></span>
          <input
            v-model="name"
            type="text"
            class="add-npc-input"
            placeholder="Leave blank, or e.g., Aldwyn the Spring-Watcher"
            @keydown.enter.prevent="onSubmit"
          />
        </label>
      </div>

      <div class="add-npc-row">
        <label class="add-npc-label">
          <span class="add-npc-label-text">Short description <span class="add-npc-optional">(optional)</span></span>
          <input
            v-model="description"
            type="text"
            class="add-npc-input"
            placeholder="e.g., A smuggler secretly working for the Queen"
            @keydown.enter.prevent="onSubmit"
          />
        </label>
      </div>

      <div v-if="factionNames.length > 0" class="add-npc-row">
        <label class="add-npc-label">
          <span class="add-npc-label-text">Faction <span class="add-npc-optional">(optional)</span></span>
          <select v-model="faction" class="add-npc-select">
            <option value="">Unaffiliated</option>
            <option v-for="name in factionNames" :key="name" :value="name">{{ name }}</option>
          </select>
        </label>
      </div>

      <p class="add-npc-helper">
        Leave name and description blank to let the AI invent a fresh NPC for this setting.
      </p>

      <div class="add-npc-actions">
        <ParButton
          variant="primary-outline"
          @click="onSubmit"
        >
          Create NPC
        </ParButton>
        <button type="button" class="add-npc-cancel" @click="reset">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ParButton, ParAddNewButton } from '@/parchment';

const props = defineProps({
  factions: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['add-and-generate']);

const expanded = ref(false);
const name = ref('');
const description = ref('');
const faction = ref('');

const factionNames = computed(() =>
  (props.factions || []).map(f => f?.name).filter(Boolean)
);

function onSubmit() {
  emit('add-and-generate', {
    name: name.value.trim(),
    description: description.value.trim(),
    faction: faction.value.trim(),
  });
  reset();
}

function reset() {
  expanded.value = false;
  name.value = '';
  description.value = '';
  faction.value = '';
}

defineExpose({
  expand() {
    expanded.value = true;
  },
});
</script>

<style scoped lang="scss">
.add-npc {
  margin: 0 0 1.5rem 0;
}

.add-npc-form {
  padding: 1.25rem;
  border: 1px solid var(--par-color-divider, #e2dccd);
  border-radius: var(--par-radius-sm, 3px);
  background: var(--par-color-surface, #fdfbf6);
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
}

.add-npc-row {
  margin-bottom: 0.9rem;

  &:last-of-type {
    margin-bottom: 1.1rem;
  }
}

.add-npc-label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.add-npc-label-text {
  font-family: var(--par-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  font-size: 1.1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--par-color-action-primary, #2A4D70);
}

.add-npc-optional {
  text-transform: none;
  letter-spacing: 0;
  font-weight: 400;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}

.add-npc-select,
.add-npc-input {
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

.add-npc-helper {
  margin: 0 0 1rem 0;
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.5;
}

.add-npc-actions {
  display: flex;
  gap: 0.6rem;
  align-items: center;
}

.add-npc-cancel {
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
