<template>
  <transition name="banner-slide">
    <div
      v-if="sourceName"
      class="connect-banner"
      role="button"
      tabindex="0"
      @click="$emit('cancel')"
      @keydown.enter="$emit('cancel')"
      @keydown.space.prevent="$emit('cancel')"
    >
      <span class="banner-glyph">◈</span>
      <span class="banner-text">
        Click another zone to connect it with
        <strong>{{ sourceName }}</strong>.
        Click an already-connected zone to disconnect.
        Click here or press Escape to cancel.
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ConnectModeBanner',
  props: {
    sourceName: { type: String, default: '' },
  },
  emits: ['cancel'],
};
</script>

<style scoped>
.connect-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
  background: var(--parchment-warm);
  color: var(--ink-primary);
  border-top: 3px double var(--accent-gold);
  border-bottom: 3px double var(--accent-gold);
  text-align: center;
  font-family: var(--font-display);
  font-size: 1.2rem;
  letter-spacing: 0.04em;
  cursor: pointer;
  animation: banner-glow 1.8s ease-in-out infinite;
  outline: none;
}

.connect-banner:focus-visible {
  box-shadow: 0 0 0 3px var(--accent-gold);
}

.banner-glyph {
  font-size: 1.25rem;
  color: var(--accent-gold-dark);
}

.banner-text {
  max-width: 52rem;
  line-height: 1.4;
}

.banner-text strong {
  color: var(--accent-red);
  font-weight: 600;
}

@keyframes banner-glow {
  0%, 100% {
    background: var(--parchment-warm);
    box-shadow: inset 0 0 0 1px transparent;
  }
  50% {
    background: #f0dda8;
    box-shadow: inset 0 0 0 1px rgba(168, 133, 54, 0.45);
  }
}

.banner-slide-enter-active {
  transition: transform 220ms ease, opacity 220ms ease;
}
.banner-slide-leave-active {
  transition: transform 160ms ease, opacity 160ms ease;
}
.banner-slide-enter-from,
.banner-slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

@media (max-width: 640px) {
  .connect-banner {
    padding: 0.7rem 0.85rem;
    font-size: 0.85rem;
    gap: 0.5rem;
    letter-spacing: 0.02em;
  }

  .banner-glyph { font-size: 1rem; }

  .banner-text { line-height: 1.35; }
}
</style>
