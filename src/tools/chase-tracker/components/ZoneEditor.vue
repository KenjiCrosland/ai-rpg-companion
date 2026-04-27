<template>
  <div class="zone-editor" @click.stop>
    <label class="field">
      <span class="field-label">Name</span>
      <input v-model="draft.name" type="text" class="field-input" />
    </label>
    <label class="field">
      <span class="field-label">Description</span>
      <textarea v-model="draft.description" class="field-input" rows="3" />
    </label>
    <div class="span-fields">
      <label class="field field--inline">
        <span class="field-label">Cols</span>
        <input v-model.number="draft.colSpan" type="number" min="1" max="6" class="field-input field-input--small" />
      </label>
      <label class="field field--inline">
        <span class="field-label">Rows</span>
        <input v-model.number="draft.rowSpan" type="number" min="1" max="6" class="field-input field-input--small" />
      </label>
    </div>
    <div class="actions">
      <DButton variant="primary" @click="save">Save</DButton>
      <DButton variant="tertiary" @click="$emit('cancel')">Cancel</DButton>
    </div>
  </div>
</template>

<script>
import DButton from './DButton.vue';

export default {
  name: 'ZoneEditor',
  components: { DButton },
  props: {
    zone: { type: Object, required: true },
  },
  emits: ['save', 'cancel'],
  data() {
    return {
      draft: {
        name: this.zone.name,
        description: this.zone.description,
        colSpan: this.zone.colSpan || 1,
        rowSpan: this.zone.rowSpan || 1,
      },
    };
  },
  methods: {
    save() {
      this.$emit('save', { ...this.draft });
    },
  },
};
</script>

<style scoped>
.zone-editor {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 20;
  background: var(--parchment-warm);
  border: 1px solid var(--parchment-edge);
  box-shadow: 0 6px 18px rgba(46, 33, 20, 0.25);
  padding: var(--ui-modal-padding);
  margin-top: 0.5rem;
  border-radius: 2px;
}

.field {
  display: block;
  margin-bottom: var(--ui-field-gap);
}

.field--inline {
  display: inline-block;
  margin-right: 1rem;
}

.field-label {
  display: block;
  font-family: var(--font-display);
  font-size: var(--ui-label-font);
  letter-spacing: var(--ui-label-tracking);
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: var(--ui-label-gap);
}

.field-input {
  font-family: var(--font-body);
  font-size: var(--ui-input-font);
  width: 100%;
  padding: var(--ui-input-padding);
  background: var(--parchment-base);
  border: 1px solid var(--button-border);
  color: var(--ink-primary);
  border-radius: 2px;
}

.field-input--small {
  width: 5.5rem;
}

.span-fields {
  margin-bottom: var(--ui-field-gap);
}

.actions {
  display: flex;
  gap: 0.55rem;
  justify-content: flex-end;
  align-items: center;
}
</style>
