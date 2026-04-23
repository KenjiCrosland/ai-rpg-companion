<template>
  <transition name="library-slide">
    <div v-if="open" class="library-overlay" @click.self="$emit('close')">
      <aside class="library-drawer" role="dialog" aria-label="Zone library">
        <header class="drawer-header">
          <div class="display-heading drawer-title">Zone Library</div>
          <button class="drawer-close" aria-label="Close library" @click="$emit('close')">×</button>
        </header>
        <OrnamentalDivider />

        <div class="filter-row">
          <button
            v-for="env in environmentOptions"
            :key="env.key"
            type="button"
            :class="['env-btn', { 'env-btn--active': activeEnv === env.key }]"
            @click="activeEnv = env.key"
          >{{ env.label }}</button>
        </div>

        <input
          v-model="query"
          type="search"
          placeholder="Search zones"
          class="search-input"
        />

        <div class="library-list">
          <div
            v-for="zone in filteredZones"
            :key="zone.id"
            :class="['library-row', { 'library-row--just-added': justAddedId === zone.id }]"
            role="button"
            tabindex="0"
            :aria-label="`Add ${zone.name} to map`"
            @click="onRowActivate(zone)"
            @keydown.enter.prevent="onRowActivate(zone)"
            @keydown.space.prevent="onRowActivate(zone)"
          >
            <span class="row-add" aria-hidden="true">+</span>
            <div class="row-body">
              <div class="row-name display-heading">{{ zone.name }}</div>
              <p class="row-description ink-italic">{{ zone.description }}</p>
            </div>
            <span v-if="justAddedId === zone.id" class="row-added-flash">✓ Added</span>
            <span v-else class="row-shape">{{ zone.shape }}</span>
          </div>
          <p v-if="!filteredZones.length" class="empty-hint ink-italic">
            No zones match that search.
          </p>
        </div>

        <OrnamentalDivider glyph="✦" />

        <section class="custom-section">
          <div class="display-heading custom-title">Custom Zone</div>
          <p class="ink-italic custom-hint">Not in the library? Build your own.</p>
          <label class="field">
            <span class="field-label">Name</span>
            <input v-model="custom.name" type="text" class="field-input" placeholder="The Somewhere" />
          </label>
          <label class="field">
            <span class="field-label">Description</span>
            <textarea v-model="custom.description" class="field-input" rows="2" placeholder="One line of flavor."></textarea>
          </label>
          <div class="field">
            <span class="field-label">Shape</span>
            <ZoneShapePicker v-model="custom.shape" />
          </div>
          <div class="custom-actions">
            <DButton variant="primary" :disabled="!custom.name.trim()" @click="submitCustom">+ Add Custom Zone</DButton>
          </div>
        </section>
      </aside>
    </div>
  </transition>
</template>

<script>
import OrnamentalDivider from './OrnamentalDivider.vue';
import DButton from './DButton.vue';
import ZoneShapePicker from './ZoneShapePicker.vue';
import libraryData from '../data/zoneLibrary.json';

const ENVIRONMENTS = [
  { key: 'any', label: 'Any' },
  { key: 'urban', label: 'Urban' },
  { key: 'wilderness', label: 'Wilderness' },
  { key: 'building_interior', label: 'Building' },
];

export default {
  name: 'ZoneLibrary',
  components: { OrnamentalDivider, DButton, ZoneShapePicker },
  props: {
    open: { type: Boolean, default: false },
    defaultEnvironment: { type: String, default: 'any' },
  },
  emits: ['close', 'add-from-library', 'add-custom'],
  data() {
    return {
      activeEnv: ENVIRONMENTS.some((e) => e.key === this.defaultEnvironment)
        ? this.defaultEnvironment
        : 'any',
      query: '',
      environmentOptions: ENVIRONMENTS,
      custom: this.freshCustom(),
      justAddedId: null,
      justAddedTimer: null,
    };
  },
  beforeUnmount() {
    if (this.justAddedTimer) clearTimeout(this.justAddedTimer);
  },
  computed: {
    filteredZones() {
      const q = this.query.trim().toLowerCase();
      return libraryData.zones.filter((z) => {
        const matchesEnv =
          this.activeEnv === 'any' || (z.environments || []).includes(this.activeEnv);
        if (!matchesEnv) return false;
        if (!q) return true;
        return (
          z.name.toLowerCase().includes(q) ||
          (z.description || '').toLowerCase().includes(q)
        );
      });
    },
  },
  watch: {
    open(val) {
      if (val) {
        this.activeEnv = ENVIRONMENTS.some((e) => e.key === this.defaultEnvironment)
          ? this.defaultEnvironment
          : 'any';
        this.query = '';
        this.custom = this.freshCustom();
      }
    },
  },
  methods: {
    environmentLabel(key) {
      return ENVIRONMENTS.find((e) => e.key === key)?.label || key;
    },
    freshCustom() {
      return { name: '', description: '', shape: 'small' };
    },
    onRowActivate(zone) {
      this.$emit('add-from-library', zone);
      this.justAddedId = zone.id;
      if (this.justAddedTimer) clearTimeout(this.justAddedTimer);
      this.justAddedTimer = setTimeout(() => {
        this.justAddedId = null;
        this.justAddedTimer = null;
      }, 900);
    },
    submitCustom() {
      const name = this.custom.name.trim();
      if (!name) return;
      this.$emit('add-custom', {
        name,
        description: this.custom.description.trim(),
        shape: this.custom.shape,
      });
      this.custom = this.freshCustom();
    },
  },
};
</script>

<style scoped>
.library-overlay {
  position: fixed;
  inset: 0;
  background: rgba(46, 33, 20, 0.25);
  z-index: 110;
  display: flex;
  justify-content: flex-end;
}

.library-drawer {
  width: min(500px, 100%);
  height: 100vh;
  background-color: var(--parchment-base);
  background-image:
    radial-gradient(ellipse at top left, rgba(164, 134, 86, 0.08), transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(164, 134, 86, 0.10), transparent 50%);
  border-left: 1px solid var(--parchment-edge);
  box-shadow: -8px 0 24px rgba(46, 33, 20, 0.25);
  padding: 1.25rem 1.5rem 2rem;
  overflow-y: auto;
  font-family: var(--font-body);
  color: var(--ink-primary);
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer-title {
  font-size: 1.3rem;
}

.drawer-close {
  background: transparent;
  border: none;
  font-size: 1.6rem;
  line-height: 1;
  color: var(--ink-muted);
  cursor: pointer;
  padding: 0.1rem 0.4rem;
}

.drawer-close:hover {
  color: var(--ink-primary);
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin: 0.75rem 0 0.75rem;
}

.env-btn {
  font-family: var(--font-display);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.3rem 0.6rem;
  background: transparent;
  border: 1px solid var(--button-border);
  color: var(--ink-secondary);
  cursor: pointer;
  border-radius: 2px;
}

.env-btn--active {
  background: var(--accent-gold);
  color: var(--parchment-base);
  border-color: var(--accent-gold-dark);
}

.search-input {
  width: 100%;
  font-family: var(--font-body);
  font-size: 0.9rem;
  padding: 0.45rem 0.6rem;
  background: var(--parchment-warm);
  border: 1px solid var(--button-border);
  color: var(--ink-primary);
  margin-bottom: 1rem;
}

.library-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.library-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  min-height: 48px;
  padding: 0.3rem 0.55rem;
  background-color: var(--parchment-warm);
  border: 1px solid transparent;
  border-radius: 2px;
  cursor: pointer;
  user-select: none;
  text-align: left;
  outline: none;
  transition: background-color 140ms ease, border-color 140ms ease, transform 80ms ease;
}

.library-row:hover,
.library-row:focus-visible {
  background-color: #f0dda8;
  border-color: var(--parchment-edge);
}

.library-row:focus-visible {
  box-shadow: 0 0 0 2px var(--accent-gold);
}

.library-row:active {
  background-color: #d9c28d;
  transform: scale(0.99);
}

.library-row--just-added {
  background-color: #e8d49e;
  border-color: var(--accent-gold);
  animation: row-added-pulse 600ms ease;
}

@keyframes row-added-pulse {
  0% {
    background-color: var(--accent-gold);
    box-shadow: 0 0 0 4px rgba(168, 133, 54, 0.35);
  }
  100% {
    background-color: #e8d49e;
    box-shadow: 0 0 0 0 rgba(168, 133, 54, 0);
  }
}

.row-add {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--parchment-base);
  border: 1.5px solid var(--parchment-edge);
  color: var(--ink-primary);
  font-family: var(--font-display);
  font-size: 1.05rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 140ms ease, border-color 140ms ease, transform 120ms ease;
  pointer-events: none;
}

.library-row:hover .row-add,
.library-row:focus-visible .row-add {
  background: var(--accent-gold);
  border-color: var(--accent-gold-dark);
  color: var(--parchment-base);
  transform: scale(1.08);
}

.row-added-flash {
  flex-shrink: 0;
  font-family: var(--font-display);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-gold-dark);
  align-self: flex-start;
  padding-top: 0.35rem;
}

.row-body {
  flex: 1;
  min-width: 0; /* allow ellipsis to kick in */
}

.row-name {
  font-size: 1.1rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-primary);
  line-height: 1.2;
}

.row-description {
  font-size: 0.85rem;
  color: var(--ink-secondary);
  margin: 0.1rem 0 0;
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: white-space 0s, overflow 0s;
}

.library-row:hover .row-description {
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
}

.row-shape {
  flex-shrink: 0;
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-gold-dark);
  align-self: flex-start;
  padding-top: 0.35rem;
}

.empty-hint {
  text-align: center;
  color: var(--ink-muted);
  margin: 1rem 0;
}

.custom-section {
  margin-top: 0.5rem;
}

.custom-title {
  font-size: 1rem;
}

.custom-hint {
  font-size: 0.85rem;
  margin: 0.25rem 0 0.75rem;
  color: var(--ink-muted);
}

.field {
  display: block;
  margin-bottom: 0.65rem;
}

.field-label {
  display: block;
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: 0.2rem;
}

.field-input {
  width: 100%;
  font-family: var(--font-body);
  font-size: 0.9rem;
  padding: 0.4rem 0.55rem;
  background: var(--parchment-warm);
  border: 1px solid var(--button-border);
  color: var(--ink-primary);
  border-radius: 2px;
}

.custom-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.library-slide-enter-active,
.library-slide-leave-active {
  transition: opacity 160ms ease;
}
.library-slide-enter-active .library-drawer,
.library-slide-leave-active .library-drawer {
  transition: transform 220ms ease;
}
.library-slide-enter-from,
.library-slide-leave-to {
  opacity: 0;
}
.library-slide-enter-from .library-drawer,
.library-slide-leave-to .library-drawer {
  transform: translateX(100%);
}
</style>
