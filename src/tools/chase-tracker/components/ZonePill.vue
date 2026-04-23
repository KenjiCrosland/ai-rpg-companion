<template>
  <span
    class="zone-pill"
    :class="[`zone-pill--${pill.tone}`, { 'zone-pill--has-detail': hasDetail }]"
    :tabindex="hasDetail ? 0 : -1"
    @mouseenter="showDetail = true"
    @mouseleave="showDetail = false"
    @focus="showDetail = true"
    @blur="showDetail = false"
    @click.stop="onClick"
  >
    <span class="zone-pill-label">{{ pill.label }}</span>
    <transition name="pill-fade">
      <span v-if="hasDetail && showDetail" class="zone-pill-tooltip">{{ pill.detail }}</span>
    </transition>
  </span>
</template>

<script>
export default {
  name: 'ZonePill',
  props: {
    pill: { type: Object, required: true },
  },
  emits: ['activate'],
  data() {
    return { showDetail: false };
  },
  computed: {
    hasDetail() {
      return Boolean(this.pill.detail && this.pill.detail.trim());
    },
  },
  methods: {
    onClick() {
      // Tap-to-toggle on touch devices: treat a click as a reveal.
      if (this.hasDetail) {
        this.showDetail = !this.showDetail;
      }
      this.$emit('activate', this.pill.id);
    },
  },
};
</script>

<style scoped>
.zone-pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.7rem;
  border-radius: 999px;
  font-family: var(--font-display);
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  line-height: 1.4;
  border: 1px solid;
  white-space: nowrap;
  user-select: none;
  cursor: default;
  outline: none;
}

.zone-pill--has-detail {
  cursor: help;
}

.zone-pill--has-detail:hover,
.zone-pill--has-detail:focus-visible {
  box-shadow: 0 0 0 2px var(--accent-gold);
}

.zone-pill--neutral { background: #d9c28d; color: #2e2114; border-color: #a3905f; }
.zone-pill--warm    { background: #c46a3b; color: #f5ede0; border-color: #8b4322; }
.zone-pill--danger  { background: #8a2a2a; color: #f5ede0; border-color: #5a1515; }
.zone-pill--muted   { background: #8a8270; color: #f5ede0; border-color: #5f594b; }
.zone-pill--mystery { background: #5c3762; color: #f5ede0; border-color: #38213c; }

.zone-pill-tooltip {
  position: absolute;
  top: calc(100% + 0.35rem);
  left: 50%;
  transform: translateX(-50%);
  background: var(--parchment-warm);
  color: var(--ink-primary);
  border: 1px solid var(--parchment-edge);
  font-family: var(--font-body);
  font-size: 0.82rem;
  letter-spacing: 0;
  font-weight: normal;
  padding: 0.4rem 0.6rem;
  max-width: 14rem;
  min-width: 10rem;
  white-space: normal;
  line-height: 1.35;
  z-index: 30;
  border-radius: 2px;
  box-shadow: 0 3px 10px rgba(46, 33, 20, 0.25);
  pointer-events: none;
}

.pill-fade-enter-active,
.pill-fade-leave-active {
  transition: opacity 120ms ease;
}

.pill-fade-enter-from,
.pill-fade-leave-to {
  opacity: 0;
}
</style>
