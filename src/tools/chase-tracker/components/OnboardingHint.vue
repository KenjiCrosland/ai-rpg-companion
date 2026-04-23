<template>
  <transition name="hint-fade">
    <div v-if="visible" class="hint-overlay" @click="dismiss">
      <div class="hint-card parchment-panel" @click.stop>
        <p class="hint-text">
          <strong>Tip:</strong> Drag tokens between zones to move them.
          Double-click any token to rename it.
        </p>
        <button class="hint-dismiss" @click="dismiss">Got it</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'OnboardingHint',
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
.hint-overlay {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 1.25rem;
  display: flex;
  justify-content: center;
  z-index: 90;
  pointer-events: none;
}

.hint-card {
  pointer-events: auto;
  max-width: 28rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1.1rem;
}

.hint-text {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
  color: var(--ink-primary);
  flex: 1;
}

.hint-text strong {
  font-weight: 600;
  color: var(--accent-red);
}

.hint-dismiss {
  font-family: var(--font-display);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.35rem 0.8rem;
  background: var(--button-bg);
  border: 1px solid var(--accent-gold);
  color: var(--ink-primary);
  cursor: pointer;
  border-radius: 2px;
}

.hint-dismiss:hover {
  background: var(--button-bg-hover);
}

.hint-fade-enter-active,
.hint-fade-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}

.hint-fade-enter-from,
.hint-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
