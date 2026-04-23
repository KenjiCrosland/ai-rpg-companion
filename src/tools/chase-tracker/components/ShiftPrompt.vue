<template>
  <div class="shift-prompt-overlay" @click.self="$emit('dismiss')">
    <ParchmentPanel class="shift-prompt" padded>
      <div class="display-heading shift-heading">The Scene Shifts</div>
      <OrnamentalDivider />
      <p class="shift-text drop-cap">{{ shift.text }}</p>
      <p v-if="shift.suggestedState" class="ink-italic shift-hint">
        Consider setting a zone to <strong>{{ shift.suggestedState }}</strong>.
      </p>
      <div class="shift-actions">
        <DButton variant="tertiary" @click="$emit('dismiss')">Dismiss</DButton>
      </div>
    </ParchmentPanel>
  </div>
</template>

<script>
import ParchmentPanel from './ParchmentPanel.vue';
import OrnamentalDivider from './OrnamentalDivider.vue';
import DButton from './DButton.vue';

export default {
  name: 'ShiftPrompt',
  components: { ParchmentPanel, OrnamentalDivider, DButton },
  props: {
    shift: { type: Object, required: true },
  },
  emits: ['dismiss'],
};
</script>

<style scoped>
.shift-prompt-overlay {
  position: fixed;
  inset: 0;
  background: rgba(46, 33, 20, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 100;
}

.shift-prompt {
  max-width: 32rem;
  width: 100%;
}

.shift-heading {
  text-align: center;
  font-size: 1.3rem;
}

.shift-text {
  font-size: 1.25rem;
  line-height: 1.5;
  margin: 0.5rem 0 1rem;
}

.shift-hint {
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
}

.shift-hint strong {
  font-weight: 600;
  color: var(--accent-red);
}

.shift-actions {
  display: flex;
  justify-content: center;
}
</style>
