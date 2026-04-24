<template>
  <transition name="zone-tap-hint-fade">
    <aside v-if="visible" class="zone-tap-hint" role="note">
      <div class="zone-tap-hint-body">
        <div class="display-heading zone-tap-hint-title">Editing Zones</div>
        <p class="zone-tap-hint-text">
          Tap any zone card to rename it, edit its description, manage
          conditions, or delete it.
        </p>
      </div>
      <button
        type="button"
        class="zone-tap-hint-close"
        aria-label="Dismiss editing tip"
        @click="$emit('dismiss')"
      >×</button>
    </aside>
  </transition>
</template>

<script>
export default {
  name: 'ZoneTapHint',
  props: {
    visible: { type: Boolean, default: false },
  },
  emits: ['dismiss'],
};
</script>

<style scoped>
.zone-tap-hint {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.85rem 2.5rem 0.85rem 1rem;
  margin-bottom: 1rem;
  background: var(--parchment-warm);
  border: 1px solid var(--parchment-edge);
  border-left: 3px solid var(--accent-gold);
  border-radius: 3px;
  color: var(--ink-primary);
}

.zone-tap-hint-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.zone-tap-hint-title {
  font-size: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-primary);
}

.zone-tap-hint-text {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--ink-secondary);
}

.zone-tap-hint-close {
  position: absolute;
  top: 0.4rem;
  right: 0.55rem;
  width: 28px;
  height: 28px;
  padding: 0;
  background: transparent;
  border: none;
  color: var(--ink-muted);
  font-family: var(--font-display);
  font-size: 1.35rem;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 120ms ease;
}

.zone-tap-hint-close:hover {
  color: var(--accent-red);
}

.zone-tap-hint-fade-enter-active,
.zone-tap-hint-fade-leave-active {
  transition: opacity 180ms ease, transform 180ms ease, max-height 220ms ease;
  overflow: hidden;
}

.zone-tap-hint-fade-enter-from,
.zone-tap-hint-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
  max-height: 0;
}

.zone-tap-hint-fade-enter-to,
.zone-tap-hint-fade-leave-from {
  max-height: 200px;
}
</style>
