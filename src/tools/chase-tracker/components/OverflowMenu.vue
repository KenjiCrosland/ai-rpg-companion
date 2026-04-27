<template>
  <div class="overflow-wrap">
    <button
      class="overflow-btn"
      :aria-expanded="open"
      aria-label="More actions"
      @click="open = !open"
    >
      <span aria-hidden="true">☰</span>
    </button>
    <transition name="overflow-fade">
      <ul v-if="open" class="overflow-menu" @click.stop>
        <li v-for="item in items" :key="item.key">
          <button class="overflow-item" @click="onPick(item)">{{ item.label }}</button>
        </li>
      </ul>
    </transition>
    <div v-if="open" class="overflow-scrim" @click="open = false" />
  </div>
</template>

<script>
export default {
  name: 'OverflowMenu',
  props: {
    items: { type: Array, default: () => [] },
    // [{ key: 'add-token', label: '+ Add Token' }, ...]
  },
  emits: ['pick'],
  data() {
    return { open: false };
  },
  methods: {
    onPick(item) {
      this.open = false;
      this.$emit('pick', item.key);
    },
  },
};
</script>

<style scoped>
.overflow-wrap {
  position: relative;
}

.overflow-btn {
  background: transparent;
  border: 1px solid var(--button-border);
  color: var(--ink-primary);
  font-size: 1.15rem;
  line-height: 1;
  padding: 0.4rem 0.7rem;
  cursor: pointer;
  border-radius: 2px;
}

.overflow-btn:hover {
  background: var(--button-bg);
}

.overflow-menu {
  position: absolute;
  top: calc(100% + 0.3rem);
  right: 0;
  min-width: 12rem;
  background: var(--parchment-warm);
  border: 1px solid var(--parchment-edge);
  box-shadow: 0 6px 14px rgba(46, 33, 20, 0.3);
  list-style: none;
  padding: 0.25rem 0;
  margin: 0;
  z-index: 20;
}

.overflow-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.85rem;
  background: transparent;
  border: none;
  font-family: var(--font-display);
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  color: var(--ink-primary);
  cursor: pointer;
}

.overflow-item:hover {
  background: var(--parchment-shadow);
}

.overflow-scrim {
  position: fixed;
  inset: 0;
  z-index: 10;
}

.overflow-fade-enter-active,
.overflow-fade-leave-active {
  transition: opacity 120ms ease;
}

.overflow-fade-enter-from,
.overflow-fade-leave-to {
  opacity: 0;
}
</style>
