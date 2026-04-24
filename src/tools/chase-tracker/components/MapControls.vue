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
      <DButton class="action-desktop" variant="secondary" @click="$emit('toggle-participants')">Participants</DButton>
      <DButton class="action-desktop" variant="secondary" @click="$emit('add-token')">+ Token</DButton>
      <DButton class="action-desktop" variant="secondary" @click="$emit('open-library')">+ Zone</DButton>
      <DButton class="action-desktop" variant="tertiary" @click="$emit('toggle-rules')">📖 Rules</DButton>
      <DButton class="action-desktop" variant="tertiary" @click="confirmReset">↺ New Chase</DButton>
      <OverflowMenu class="action-mobile" :items="overflowItems" @pick="onOverflowPick" />
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue';
import DButton from './DButton.vue';
import OverflowMenu from './OverflowMenu.vue';

export default {
  name: 'MapControls',
  components: { DButton, OverflowMenu },
  props: {
    mapName: { type: String, required: true },
  },
  emits: ['add-token', 'open-library', 'reset', 'rename-map', 'toggle-rules', 'toggle-participants'],
  data() {
    return {
      editingName: false,
      draft: '',
      overflowItems: [
        { key: 'toggle-participants', label: 'Participants' },
        { key: 'add-token',    label: '+ Add Token' },
        { key: 'open-library', label: '+ Add Zone' },
        { key: 'toggle-rules', label: '📖 Rules' },
        { key: 'reset',        label: '↺ New Chase' },
      ],
    };
  },
  methods: {
    onOverflowPick(key) {
      if (key === 'reset') return this.confirmReset();
      this.$emit(key);
    },
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
  font-size: 2.1rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  cursor: pointer;
}

.map-name:hover {
  color: var(--accent-red);
}

.map-name-input {
  font-family: var(--font-display);
  font-size: 2.1rem;
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
  align-items: center;
}

.action-mobile { display: none; }

@media (max-width: 640px) {
  .map-controls {
    padding: 0.35rem 0 0.6rem;
    margin-bottom: 0.75rem;
    flex-wrap: nowrap;
    gap: 0.5rem;
  }

  .map-name { font-size: 1.25rem; }
  .map-name-input { font-size: 1.25rem; }

  .action-desktop { display: none; }
  .action-mobile { display: block; }
}
</style>
