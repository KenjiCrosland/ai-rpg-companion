<template>
  <transition name="dash-hint-fade">
    <div v-if="visible" class="dash-hint-overlay" @click.self="dismiss">
      <ParchmentPanel class="dash-hint-card" padded @click.stop>
        <div class="display-heading dash-hint-title">Dash Tracking</div>
        <p class="dash-hint-text ink-italic">
          The number on a token shows how many Dashes that character
          has taken. It increments automatically when tokens move on
          the map. Tap <strong>−</strong> in the Participants panel or
          the zone detail sheet to correct.
        </p>
        <div class="dash-hint-actions">
          <button type="button" class="dash-hint-dismiss" @click="dismiss">
            Got it
          </button>
        </div>
      </ParchmentPanel>
    </div>
  </transition>
</template>

<script>
import ParchmentPanel from './ParchmentPanel.vue';

export default {
  name: 'DashHint',
  components: { ParchmentPanel },
  props: {
    visible: { type: Boolean, default: false },
    autoDismissMs: { type: Number, default: 8000 },
  },
  emits: ['dismiss'],
  data() {
    return { timer: null };
  },
  watch: {
    visible(val) {
      if (val) this.scheduleDismiss();
      else this.clearTimer();
    },
  },
  mounted() {
    if (this.visible) this.scheduleDismiss();
  },
  beforeUnmount() {
    this.clearTimer();
  },
  methods: {
    scheduleDismiss() {
      this.clearTimer();
      this.timer = setTimeout(() => this.dismiss(), this.autoDismissMs);
    },
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    dismiss() {
      this.clearTimer();
      this.$emit('dismiss');
    },
  },
};
</script>

<style scoped>
.dash-hint-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 1.5rem 1rem 0;
  pointer-events: none;
  z-index: 140;
}

.dash-hint-overlay > * {
  pointer-events: auto;
}

.dash-hint-card {
  max-width: 26rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  box-shadow: 0 8px 26px rgba(46, 33, 20, 0.28);
}

.dash-hint-title {
  font-size: 1.1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-primary);
}

.dash-hint-text {
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.5;
  color: var(--ink-primary);
}

.dash-hint-text strong {
  font-style: normal;
  font-weight: 600;
  color: var(--accent-red);
}

.dash-hint-actions {
  display: flex;
  justify-content: flex-end;
}

.dash-hint-dismiss {
  font-family: var(--font-display);
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.45rem 1rem;
  background: var(--button-bg);
  border: 1px solid var(--accent-gold);
  color: var(--ink-primary);
  cursor: pointer;
  border-radius: 2px;
}

.dash-hint-dismiss:hover {
  background: var(--button-bg-hover);
  border-color: var(--accent-gold-dark);
}

.dash-hint-fade-enter-active,
.dash-hint-fade-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.dash-hint-fade-enter-active .dash-hint-card,
.dash-hint-fade-leave-active .dash-hint-card {
  transition: transform 220ms ease;
}

.dash-hint-fade-enter-from,
.dash-hint-fade-leave-to {
  opacity: 0;
}

.dash-hint-fade-enter-from .dash-hint-card,
.dash-hint-fade-leave-to .dash-hint-card {
  transform: translateY(-10px);
}
</style>
