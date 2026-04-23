<template>
  <div class="map-controls">
    <div class="map-name-wrap">
      <input
        v-if="editingName"
        ref="nameInput"
        v-model="draft"
        class="map-name-input"
        @blur="commit"
        @keydown.enter="commit"
        @keydown.esc="cancel"
      />
      <h2 v-else class="map-name display-heading" @click="beginEdit">{{ mapName }}</h2>
    </div>
    <div class="map-actions">
      <DButton variant="primary" @click="$emit('roll-shift')">✦ What Changes?</DButton>
      <DButton variant="secondary" @click="$emit('add-token')">+ Token</DButton>
      <DButton variant="secondary" @click="$emit('open-library')">+ Zone</DButton>
      <DButton variant="tertiary" @click="$emit('toggle-rules')">📖 Rules</DButton>
      <DButton variant="tertiary" @click="confirmReset">↺ New Chase</DButton>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue';
import DButton from './DButton.vue';

export default {
  name: 'MapControls',
  components: { DButton },
  props: {
    mapName: { type: String, required: true },
  },
  emits: ['roll-shift', 'add-token', 'open-library', 'reset', 'rename-map', 'toggle-rules'],
  data() {
    return { editingName: false, draft: '' };
  },
  methods: {
    async beginEdit() {
      this.draft = this.mapName;
      this.editingName = true;
      await nextTick();
      this.$refs.nameInput?.focus();
      this.$refs.nameInput?.select();
    },
    commit() {
      if (!this.editingName) return;
      const value = this.draft.trim();
      if (value && value !== this.mapName) this.$emit('rename-map', value);
      this.editingName = false;
    },
    cancel() {
      this.editingName = false;
    },
    confirmReset() {
      if (window.confirm('Start a new chase? The current map will be cleared.')) {
        this.$emit('reset');
      }
    },
  },
};
</script>

<style scoped>
.map-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0.25rem 1rem;
  border-bottom: 1px solid var(--parchment-edge);
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.map-name-wrap {
  flex: 1;
  min-width: 12rem;
}

.map-name {
  font-size: 1.85rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  cursor: pointer;
}

.map-name:hover {
  color: var(--accent-red);
}

.map-name-input {
  font-family: var(--font-display);
  font-size: 1.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: var(--parchment-warm);
  border: 1px solid var(--button-border);
  padding: 0.2rem 0.5rem;
  color: var(--ink-primary);
  width: 100%;
  max-width: 22rem;
}

.map-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>
