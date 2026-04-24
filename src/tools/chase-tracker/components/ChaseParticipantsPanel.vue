<template>
  <!-- Mobile: full-screen bottom sheet overlay -->
  <transition name="panel-fade">
    <div
      v-if="isMobile && !collapsed"
      class="panel-overlay"
      @click.self="$emit('close')"
    >
      <div
        class="panel-sheet"
        role="dialog"
        aria-label="Chase participants"
      >
        <button class="panel-close" aria-label="Close" @click="$emit('close')">×</button>
        <div class="panel-handle" aria-hidden="true" />
        <div class="panel-inner">
          <div class="panel-header">
            <div class="display-heading panel-title">Chase Participants</div>
          </div>
          <OrnamentalDivider />
          <PanelContent
            :participants-by-role="participantsByRole"
            :zones="zones"
            @rename="(id, label) => $emit('rename', id, label)"
            @remove="(id) => $emit('remove', id)"
            @dash="(id) => $emit('dash', id)"
            @undo-dash="(id) => $emit('undo-dash', id)"
            @add="(role) => $emit('add', role)"
            @move="(id, zoneId) => $emit('move', id, zoneId)"
          />
        </div>
      </div>
    </div>
  </transition>

  <!-- Desktop: inline block that collapses to a thin strip -->
  <section v-if="!isMobile" class="panel-desktop" :class="{ 'panel-desktop--collapsed': collapsed }">
    <button
      v-if="collapsed"
      type="button"
      class="panel-strip"
      @click="$emit('toggle')"
    >
      <span class="strip-title">Chase Participants</span>
      <span class="strip-chevron" aria-hidden="true">+</span>
    </button>

    <div v-else class="panel-card">
      <div class="panel-header">
        <div class="display-heading panel-title">Chase Participants</div>
        <button class="panel-collapse" aria-label="Collapse panel" @click="$emit('toggle')">—</button>
      </div>
      <OrnamentalDivider />
      <PanelContent
        :participants-by-role="participantsByRole"
        :zones="zones"
        @rename="(id, label) => $emit('rename', id, label)"
        @remove="(id) => $emit('remove', id)"
        @dash="(id) => $emit('dash', id)"
        @undo-dash="(id) => $emit('undo-dash', id)"
        @add="(role) => $emit('add', role)"
        @move="(id, zoneId) => $emit('move', id, zoneId)"
      />
    </div>
  </section>
</template>

<script>
import OrnamentalDivider from './OrnamentalDivider.vue';
import PanelContent from './ChaseParticipantsPanelContent.vue';
import { useIsMobile } from '../composables/useBreakpoint.js';

export default {
  name: 'ChaseParticipantsPanel',
  components: { OrnamentalDivider, PanelContent },
  props: {
    collapsed: { type: Boolean, default: false },
    participantsByRole: { type: Object, required: true },
    zones: { type: Array, default: () => [] },
  },
  emits: ['toggle', 'close', 'rename', 'remove', 'dash', 'undo-dash', 'add', 'move'],
  setup() {
    const isMobile = useIsMobile();
    return { isMobile };
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
  methods: {
    handleKeydown(e) {
      if (this.isMobile && !this.collapsed && e.key === 'Escape') {
        this.$emit('close');
      }
    },
  },
};
</script>

<style scoped>
/* ---------------- Desktop inline panel ---------------- */
.panel-desktop {
  margin-bottom: 1.65rem;
}

.panel-strip {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--parchment-warm);
  border: 1px solid var(--parchment-edge);
  padding: 0.95rem 1.5rem;
  font-family: var(--font-display);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-secondary);
  cursor: pointer;
  font-size: 1.35rem;
  border-radius: 2px;
}

.panel-strip:hover {
  background: #f0dda8;
  color: var(--ink-primary);
}

.strip-chevron {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--accent-gold-dark);
}

.panel-card {
  background-color: var(--parchment-warm);
  border: 1px solid var(--parchment-edge);
  box-shadow:
    inset 0 0 0 3px var(--parchment-warm),
    inset 0 0 0 4px var(--parchment-edge),
    0 2px 6px rgba(46, 33, 20, 0.12);
  padding: 1.35rem 1.65rem 1.65rem;
  border-radius: 2px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel-title {
  font-size: 1.9rem;
  letter-spacing: 0.1em;
}

.panel-collapse {
  background: transparent;
  border: none;
  font-family: var(--font-display);
  font-size: 2rem;
  line-height: 1;
  padding: 0.3rem 0.9rem;
  color: var(--ink-muted);
  cursor: pointer;
}

.panel-collapse:hover {
  color: var(--ink-primary);
}

/* ---------------- Mobile sheet ---------------- */
.panel-overlay {
  position: fixed;
  inset: 0;
  background: rgba(46, 33, 20, 0.45);
  z-index: 128;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.panel-sheet {
  position: relative;
  background-color: var(--parchment-base);
  background-image:
    radial-gradient(ellipse at top left, rgba(164, 134, 86, 0.08), transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(164, 134, 86, 0.1), transparent 50%);
  width: 100%;
  max-width: 640px;
  max-height: 85vh;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  box-shadow: 0 -8px 30px rgba(46, 33, 20, 0.35);
  overflow-y: auto;
  padding: 1.2rem 1.35rem 2.4rem;
}

.panel-handle {
  width: 48px;
  height: 6px;
  background: var(--parchment-edge);
  border-radius: 3px;
  margin: 0 auto 1.1rem;
  opacity: 0.7;
}

.panel-close {
  position: absolute;
  top: 0.55rem;
  right: 0.7rem;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  font-size: 2.1rem;
  line-height: 1;
  color: var(--ink-muted);
  cursor: pointer;
  padding: 0;
}

.panel-close:hover { color: var(--ink-primary); }

.panel-inner .panel-title {
  font-size: 1.7rem;
}

.panel-fade-enter-active,
.panel-fade-leave-active {
  transition: opacity 180ms ease;
}

.panel-fade-enter-active .panel-sheet,
.panel-fade-leave-active .panel-sheet {
  transition: transform 220ms ease;
}

.panel-fade-enter-from,
.panel-fade-leave-to {
  opacity: 0;
}

.panel-fade-enter-from .panel-sheet,
.panel-fade-leave-to .panel-sheet {
  transform: translateY(100%);
}
</style>
