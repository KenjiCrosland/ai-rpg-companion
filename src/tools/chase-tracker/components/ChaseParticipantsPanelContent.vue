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
          <div class="participant-location">
            <select
              class="location-select"
              :value="token.zoneId === null ? '__tray' : token.zoneId"
              :aria-label="`Location for ${token.label}`"
              @change="onZoneChange(token.id, $event.target.value)"
            >
              <option
                v-for="zone in sortedZones"
                :key="zone.id"
                :value="zone.id"
              >{{ zone.name }}</option>
              <option disabled class="location-divider">──────────</option>
              <option value="__tray">Off the Board</option>
            </select>
          </div>
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
    zones: { type: Array, default: () => [] },
  },
  emits: ['rename', 'remove', 'dash', 'undo-dash', 'add', 'move'],
  data() {
    return {
      groups: [
        { role: 'quarry',  label: 'Quarry',   addLabel: 'Quarry' },
        { role: 'pc',      label: 'Party',    addLabel: 'Character' },
        { role: 'pursuer', label: 'Pursuers', addLabel: 'Pursuer' },
      ],
    };
  },
  computed: {
    sortedZones() {
      return [...this.zones].sort((a, b) => (a.row - b.row) || (a.col - b.col));
    },
  },
  methods: {
    onZoneChange(tokenId, rawValue) {
      const zoneId = rawValue === '__tray' ? null : rawValue;
      this.$emit('move', tokenId, zoneId);
    },
  },
};
</script>

<style scoped>
.panel-content {
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
}

.role-group {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.role-label {
  font-family: var(--font-display);
  font-size: var(--ui-label-font);
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
  gap: 0.55rem;
}

.participant-row {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.participant-input {
  flex: 1 1 16rem;
  min-width: 13rem;
  font-family: var(--font-display);
  font-size: 1.55rem;
  letter-spacing: 0.03em;
  padding: 0.75rem 1rem;
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

.participant-location {
  flex-shrink: 0;
}

.location-select {
  font-family: var(--font-body);
  font-size: 1.35rem;
  padding: 0.6rem 2.5rem 0.6rem 0.95rem;
  background-color: var(--parchment-warm);
  color: var(--ink-primary);
  border: 1px solid var(--button-border);
  border-radius: 2px;
  min-width: 13rem;
  max-width: 18rem;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  /* Parchment-tinted chevron */
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' fill='none' stroke='%234e3a22' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.95rem center;
}

.location-select:focus {
  outline: none;
  border-color: var(--accent-gold);
  box-shadow: 0 0 0 2px rgba(168, 133, 54, 0.25);
}

.participant-remove {
  flex-shrink: 0;
  /* Sized to match the dash-step buttons next to it, with the same
     muted parchment treatment so it reads as a peer of the row's
     other controls. Destructive intent is carried by the accent-red
     hover rather than a bold resting state. */
  width: var(--ui-row-control-size);
  height: var(--ui-row-control-size);
  padding: 0;
  margin-left: var(--ui-row-control-gap);
  background: rgba(217, 195, 149, 0.4);
  border: 1px solid var(--parchment-edge);
  border-radius: 2px;
  color: var(--ink-muted);
  cursor: pointer;
  font-family: var(--font-display);
  font-size: var(--ui-row-control-font);
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease, transform 80ms ease;
}

.participant-remove:hover {
  background: var(--parchment-warm);
  border-color: var(--accent-red);
  color: var(--accent-red);
}

.participant-remove:active {
  transform: scale(0.96);
}

.participant-remove:focus-visible {
  outline: 2px solid var(--accent-gold);
  outline-offset: 2px;
}

.participant-remove-placeholder {
  display: inline-block;
  width: var(--ui-row-control-size);
  height: var(--ui-row-control-size);
  margin-left: var(--ui-row-control-gap);
}

.add-btn {
  align-self: flex-start;
  font-family: var(--font-display);
  font-size: var(--ui-button-font);
  letter-spacing: var(--ui-button-tracking);
  text-transform: uppercase;
  padding: var(--ui-button-padding);
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

/* Intermediate widths (narrow desktop / tablet portrait): name + dropdown
   fill row 1 together; dash controls + × wrap to row 2. */
@media (max-width: 900px) {
  .participant-input {
    flex: 1 1 calc(60% - 0.4rem);
    min-width: 0;
  }

  .participant-location {
    flex: 1 1 calc(40% - 0.4rem);
    min-width: 0;
  }

  .location-select {
    width: 100%;
    max-width: none;
    min-width: 0;
  }
}

@media (max-width: 640px) {
  .participant-input {
    font-size: 1.3rem;
    padding: 0.65rem 0.85rem;
    flex: 1 1 100%;
  }

  .participant-location {
    flex: 1 1 100%;
  }

  .location-select {
    font-size: 1.2rem;
    padding: 0.55rem 2.2rem 0.55rem 0.85rem;
  }

  .participant-row {
    gap: 0.65rem;
  }
}
</style>
