<template>
  <div class="panel-content">
    <section
      v-for="group in groups"
      :key="group.role"
      class="role-group"
    >
      <div class="role-label">{{ group.label }}</div>
      <ul class="participant-list">
        <li
          v-for="token in participantsByRole[group.role]"
          :key="token.id"
          class="participant-row"
        >
          <input
            type="text"
            class="participant-input"
            :value="token.label"
            :aria-label="`Name for ${group.label}`"
            @input="$emit('rename', token.id, $event.target.value)"
          />
          <DashCounter
            :count="token.dashCount || 0"
            :name="token.label"
            class="participant-dash"
            @dash="$emit('dash', token.id)"
            @undo="$emit('undo-dash', token.id)"
          />
          <button
            v-if="group.role !== 'quarry' || participantsByRole.quarry.length > 1"
            type="button"
            class="participant-remove"
            :aria-label="`Remove ${token.label}`"
            @click="$emit('remove', token.id)"
          >×</button>
          <span v-else class="participant-remove-placeholder" aria-hidden="true" />
        </li>
      </ul>
      <button
        type="button"
        class="add-btn"
        @click="$emit('add', group.role)"
      >+ Add {{ group.addLabel }}</button>
    </section>
  </div>
</template>

<script>
import DashCounter from './DashCounter.vue';

export default {
  name: 'ChaseParticipantsPanelContent',
  components: { DashCounter },
  props: {
    participantsByRole: { type: Object, required: true },
  },
  emits: ['rename', 'remove', 'dash', 'undo-dash', 'add'],
  data() {
    return {
      groups: [
        { role: 'quarry',  label: 'Quarry',   addLabel: 'Quarry' },
        { role: 'pc',      label: 'Party',    addLabel: 'Character' },
        { role: 'pursuer', label: 'Pursuers', addLabel: 'Pursuer' },
      ],
    };
  },
};
</script>

<style scoped>
.panel-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.role-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.role-label {
  font-family: var(--font-display);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

.participant-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.participant-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.participant-input {
  flex: 1 1 12rem;
  min-width: 10rem;
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.03em;
  padding: 0.4rem 0.6rem;
  background: var(--parchment-base);
  border: 1px solid var(--button-border);
  color: var(--ink-primary);
  border-radius: 2px;
}

.participant-input:focus {
  outline: none;
  border-color: var(--accent-gold);
  box-shadow: 0 0 0 2px rgba(168, 133, 54, 0.25);
}

.participant-dash {
  flex-shrink: 0;
}

.participant-remove {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  padding: 0;
  background: transparent;
  border: 1px solid var(--parchment-edge);
  color: var(--ink-muted);
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
  border-radius: 50%;
}

.participant-remove:hover {
  color: var(--accent-red);
  border-color: var(--accent-red);
}

.participant-remove-placeholder {
  display: inline-block;
  width: 28px;
  height: 28px;
}

.add-btn {
  align-self: flex-start;
  font-family: var(--font-display);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.35rem 0.8rem;
  background: transparent;
  border: 1px dashed var(--button-border);
  color: var(--ink-secondary);
  cursor: pointer;
  border-radius: 2px;
}

.add-btn:hover {
  background: var(--parchment-warm);
  color: var(--ink-primary);
  border-style: solid;
  border-color: var(--accent-gold);
}

@media (max-width: 640px) {
  .participant-input {
    font-size: 1rem;
    flex-basis: 100%;
    min-width: 0;
  }

  .participant-row {
    gap: 0.5rem;
  }
}
</style>
