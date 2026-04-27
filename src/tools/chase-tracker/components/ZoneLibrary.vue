<template>
  <transition name="library-slide">
    <div v-if="open" class="library-overlay" @click.self="$emit('close')">
      <aside class="library-drawer" role="dialog" aria-label="Zone library">
        <header class="drawer-header">
          <div class="display-heading drawer-title">Zone Library</div>
          <button class="drawer-close" aria-label="Close library" @click="$emit('close')">×</button>
        </header>
        <OrnamentalDivider />

        <div class="filter-row" role="group" aria-label="Environment filters">
          <button
            type="button"
            :class="['env-btn', { 'env-btn--active': allSelected }]"
            :aria-pressed="allSelected"
            @click="toggleAny"
          >Any</button>
          <button
            v-for="env in environmentChips"
            :key="env.key"
            type="button"
            :class="['env-btn', { 'env-btn--active': isSelected(env.key) }]"
            :aria-pressed="isSelected(env.key)"
            @click="toggleEnv(env.key)"
          >{{ env.label }}</button>
        </div>

        <input
          v-model="query"
          type="search"
          placeholder="Search zones"
          class="search-input"
        />

        <label class="autoconnect-row">
          <input
            type="checkbox"
            class="autoconnect-checkbox"
            :checked="autoConnect"
            @change="$emit('update:auto-connect', $event.target.checked)"
          />
          <span class="autoconnect-label">Auto-connect adjacent zones</span>
        </label>

        <div v-if="hasAnyVisible" class="category-controls">
          <button type="button" class="category-control-btn" @click="expandAllVisible">
            Expand all
          </button>
          <span class="category-control-sep" aria-hidden="true">·</span>
          <button type="button" class="category-control-btn" @click="collapseAllVisible">
            Collapse all
          </button>
        </div>

        <div class="library-list">
          <template v-for="(section, sIdx) in envSections" :key="section.env">
            <div v-if="sIdx > 0" class="env-section-rule" aria-hidden="true"></div>

            <div
              v-if="showEnvSectionHeader"
              class="env-section-header display-heading"
            >{{ envLabelFor(section.env) }}</div>

            <template v-for="cat in section.categories" :key="`${section.env}:${cat.slug}`">
              <div class="category">
                <button
                  type="button"
                  :class="['category-header', { 'category-header--open': isExpanded(section.env, cat.slug) }]"
                  :aria-expanded="isExpanded(section.env, cat.slug)"
                  @click="toggleCategory(section.env, cat.slug)"
                >
                  <span class="category-chevron" aria-hidden="true">
                    {{ isExpanded(section.env, cat.slug) ? '▼' : '▶' }}
                  </span>
                  <span class="category-name">{{ cat.name }}</span>
                  <span class="category-count">({{ cat.zones.length }})</span>
                </button>

                <div v-if="isExpanded(section.env, cat.slug)" class="category-zones">
                  <div
                    v-for="zone in cat.zones"
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
                </div>
              </div>
            </template>
          </template>

          <p v-if="!hasAnyVisible" class="empty-hint ink-italic">
            No zones match that search.
          </p>
        </div>

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
import categoriesData from '../data/libraryCategories.json';

const ENVIRONMENT_CHIPS = [
  { key: 'urban',       label: 'Urban' },
  { key: 'wilderness',  label: 'Wilderness' },
  { key: 'indoor',      label: 'Indoor' },
  { key: 'underground', label: 'Underground' },
  { key: 'underdark',   label: 'Underdark' },
  { key: 'feywild',     label: 'Feywild' },
  { key: 'shadowfell',  label: 'Shadowfell' },
];

const ALL_ENV_KEYS = ENVIRONMENT_CHIPS.map((e) => e.key);
const UNCATEGORIZED_SLUG = '__uncategorized__';
const UNCATEGORIZED_LABEL = 'Uncategorized';

// Join an env+slug into a Set-safe key. Slugs namespace by env, so the
// composite avoids collisions when two envs share a slug string (e.g.
// wilderness and shadowfell both define `ruins-remnants`).
function catKey(env, slug) {
  return `${env}::${slug}`;
}

export default {
  name: 'ZoneLibrary',
  components: { OrnamentalDivider, DButton, ZoneShapePicker },
  props: {
    open: { type: Boolean, default: false },
    // Array of environment keys to seed the filter with when the drawer
    // opens. Empty array = all environments on ("Any"). Unknown keys
    // are ignored.
    defaultEnvironments: { type: Array, default: () => [] },
    // Whether new zones auto-connect to grid-adjacent neighbors on add.
    // Bound two-way via `update:auto-connect` so the parent can persist
    // the preference.
    autoConnect: { type: Boolean, default: true },
  },
  emits: ['close', 'add-from-library', 'add-custom', 'update:auto-connect'],
  data() {
    return {
      selectedEnvs: this.seedSelection(this.defaultEnvironments),
      query: '',
      environmentChips: ENVIRONMENT_CHIPS,
      custom: this.freshCustom(),
      justAddedId: null,
      justAddedTimer: null,
      // Source of truth for which categories are open. Set of keys
      // produced by catKey(). Default is empty — everything collapsed.
      expandedKeys: new Set(),
      // Snapshot of expandedKeys taken when the user first types into
      // the search box. Restored when the search clears. Null when no
      // search is active.
      preSearchSnapshot: null,
    };
  },
  beforeUnmount() {
    if (this.justAddedTimer) clearTimeout(this.justAddedTimer);
  },
  computed: {
    allSelected() {
      return this.selectedEnvs.length === ALL_ENV_KEYS.length;
    },
    showEnvSectionHeader() {
      return this.selectedEnvs.length > 1;
    },
    // Zones passing the env filter + search, in order of ALL_ENV_KEYS
    // so env sections always render in a stable order.
    envSections() {
      const q = this.query.trim().toLowerCase();
      const selected = this.selectedEnvs;
      const sections = [];

      for (const env of ALL_ENV_KEYS) {
        if (!selected.includes(env)) continue;

        // Filter zones to this env first (primary or transitional).
        // Transitional zones (multi-env) surface in every selected env
        // they belong to, but their `category` slug is namespaced to
        // their primary env. When a transitional zone appears in a
        // secondary env's section, treat it as uncategorized for that
        // env's category list.
        const zonesForEnv = libraryData.zones.filter((z) => {
          const envs = z.environments || [];
          if (!envs.includes(env)) return false;
          if (!q) return true;
          return (
            z.name.toLowerCase().includes(q) ||
            (z.description || '').toLowerCase().includes(q)
          );
        });

        const primaryEnvFor = (zone) => (zone.environments || [])[0];
        const categoryDefs = categoriesData[env] || [];
        const validSlugs = new Set(categoryDefs.map((c) => c.slug));

        // Category labels already carry the semantic grouping, so zones
        // within a category are sorted alphabetically by name for
        // predictable lookup. Locale-aware so accented / non-ASCII
        // names slot in naturally.
        const sortByName = (a, b) =>
          a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });

        const categories = [];
        for (const cat of categoryDefs) {
          const catZones = zonesForEnv
            .filter((z) => primaryEnvFor(z) === env && z.category === cat.slug)
            .sort(sortByName);
          if (catZones.length) {
            categories.push({ slug: cat.slug, name: cat.name, zones: catZones });
          }
        }

        // Uncategorized bucket: zones in this env that have no category,
        // have an unrecognized category, or are transitional from
        // another env (so their primary-env category doesn't apply here).
        const uncategorized = zonesForEnv
          .filter((z) => {
            if (primaryEnvFor(z) !== env) return true;
            if (!z.category) return true;
            return !validSlugs.has(z.category);
          })
          .sort(sortByName);
        if (uncategorized.length) {
          categories.push({
            slug: UNCATEGORIZED_SLUG,
            name: UNCATEGORIZED_LABEL,
            zones: uncategorized,
          });
        }

        if (categories.length) sections.push({ env, categories });
      }

      return sections;
    },
    hasAnyVisible() {
      return this.envSections.some((s) => s.categories.length > 0);
    },
    visibleCategoryKeys() {
      const keys = [];
      for (const section of this.envSections) {
        for (const cat of section.categories) {
          keys.push(catKey(section.env, cat.slug));
        }
      }
      return keys;
    },
  },
  watch: {
    open(val) {
      if (val) {
        this.selectedEnvs = this.seedSelection(this.defaultEnvironments);
        this.query = '';
        this.custom = this.freshCustom();
        this.expandedKeys = new Set();
        this.preSearchSnapshot = null;
      }
    },
    query(next, prev) {
      const becameActive = !prev && next;
      const becameInactive = prev && !next;
      if (becameActive) {
        // Snapshot the current state, then expand every visible category
        // so matching zones are instantly scannable.
        this.preSearchSnapshot = new Set(this.expandedKeys);
        this.expandedKeys = new Set(this.visibleCategoryKeys);
      } else if (becameInactive && this.preSearchSnapshot) {
        this.expandedKeys = this.preSearchSnapshot;
        this.preSearchSnapshot = null;
      }
    },
  },
  methods: {
    seedSelection(defaults) {
      const valid = (defaults || []).filter((k) => ALL_ENV_KEYS.includes(k));
      return valid.length ? [...valid] : [...ALL_ENV_KEYS];
    },
    envLabelFor(key) {
      return ENVIRONMENT_CHIPS.find((e) => e.key === key)?.label || key;
    },
    isSelected(key) {
      return this.selectedEnvs.includes(key);
    },
    toggleEnv(key) {
      const idx = this.selectedEnvs.indexOf(key);
      if (idx === -1) {
        this.selectedEnvs = [...this.selectedEnvs, key];
      } else {
        // Don't let the user deselect the last chip — leaving zero
        // environments on means the list would be empty, which is
        // confusing. Collapse to "Any" instead.
        if (this.selectedEnvs.length === 1) {
          this.selectedEnvs = [...ALL_ENV_KEYS];
        } else {
          this.selectedEnvs = this.selectedEnvs.filter((k) => k !== key);
        }
      }
    },
    toggleAny() {
      // Any is a "select all" shortcut. No useful "nothing selected"
      // state to toggle back to, so clicking when already all-selected
      // is a no-op.
      this.selectedEnvs = [...ALL_ENV_KEYS];
    },
    isExpanded(env, slug) {
      return this.expandedKeys.has(catKey(env, slug));
    },
    toggleCategory(env, slug) {
      const key = catKey(env, slug);
      const next = new Set(this.expandedKeys);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      this.expandedKeys = next;
    },
    expandAllVisible() {
      this.expandedKeys = new Set(this.visibleCategoryKeys);
    },
    collapseAllVisible() {
      // Only remove currently-visible keys; categories hidden by the
      // filter keep whatever pre-filter state they had.
      const next = new Set(this.expandedKeys);
      for (const key of this.visibleCategoryKeys) next.delete(key);
      this.expandedKeys = next;
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
  width: min(680px, 100%);
  height: 100vh;
  max-width: 100%;
  background-color: var(--parchment-base);
  background-image:
    radial-gradient(ellipse at top left, rgba(164, 134, 86, 0.08), transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(164, 134, 86, 0.10), transparent 50%);
  border-left: 1px solid var(--parchment-edge);
  box-shadow: -8px 0 24px rgba(46, 33, 20, 0.25);
  padding: 1.65rem 2rem 2.5rem;
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
  font-size: var(--ui-modal-title-font);
}

.drawer-close {
  background: transparent;
  border: none;
  font-size: var(--ui-modal-close-font);
  line-height: 1;
  color: var(--ink-muted);
  cursor: pointer;
  padding: 0.15rem 0.55rem;
}

.drawer-close:hover {
  color: var(--ink-primary);
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 1.25rem 0 1.25rem;
}

.env-btn {
  font-family: var(--font-display);
  font-size: var(--ui-chip-font);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: var(--ui-chip-padding);
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
  font-size: var(--ui-input-font);
  padding: var(--ui-input-padding);
  background: var(--parchment-warm);
  border: 1px solid var(--button-border);
  color: var(--ink-primary);
  margin-bottom: 1rem;
}

.autoconnect-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.15rem 0.25rem 0.95rem;
  cursor: pointer;
  user-select: none;
}

.autoconnect-checkbox {
  width: 1.35rem;
  height: 1.35rem;
  margin: 0;
  accent-color: var(--accent-gold-dark);
  cursor: pointer;
  flex-shrink: 0;
}

.autoconnect-label {
  font-family: var(--font-body);
  font-size: 1.35rem;
  color: var(--ink-secondary);
  letter-spacing: 0.02em;
}

.category-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.25rem 1.15rem;
  color: var(--ink-muted);
  font-size: 1.05rem;
}

.category-control-btn {
  background: transparent;
  border: none;
  color: var(--ink-muted);
  font-family: var(--font-body);
  font-size: 1.05rem;
  cursor: pointer;
  padding: 0.15rem 0.3rem;
  text-decoration: underline;
  text-decoration-color: var(--parchment-edge);
  text-underline-offset: 2px;
}

.category-control-btn:hover {
  color: var(--ink-primary);
  text-decoration-color: var(--accent-gold-dark);
}

.category-control-sep {
  color: var(--parchment-edge);
}

.library-list {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.35rem;
}

.env-section-header {
  font-size: 1.05rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-muted);
  text-align: center;
  padding: 0.7rem 0 0.6rem;
}

.env-section-rule {
  height: 0;
  border-top: 1px dotted var(--parchment-edge);
  margin: 0.8rem 0.5rem 0.45rem;
}

.category {
  display: flex;
  flex-direction: column;
}

.category-header {
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
  width: 100%;
  padding: 0.9rem 0.55rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--parchment-edge);
  /* Softer than the zone row names (ink-primary) so the bigger type
     doesn't overpower the content it groups. */
  color: var(--ink-secondary);
  font-family: var(--font-display);
  /* Larger than zone-row .row-name (1.6rem) so the category clearly
     parents the content it contains. */
  font-size: 1.8rem;
  letter-spacing: 0.04em;
  cursor: pointer;
  text-align: left;
  font-weight: 600;
  transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease;
}

.category-header:hover {
  background: rgba(164, 134, 86, 0.08);
  color: var(--ink-primary);
}

.category-header--open {
  border-bottom-color: transparent;
}

.category-chevron {
  display: inline-block;
  width: 1.35rem;
  font-size: 1.15rem;
  color: var(--ink-secondary);
  text-align: center;
}

.category-name {
  flex: 1;
}

.category-count {
  font-family: var(--font-body);
  font-size: 1.3rem;
  color: var(--ink-muted);
  font-weight: 400;
  letter-spacing: 0;
}

.category-zones {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.55rem 0 0.9rem 0.45rem;
  /* Next category's header carries its own border-bottom, so the
     zones list doesn't need one — a second edge-line right above it
     was visually doubling up. */
}

.library-row {
  display: flex;
  align-items: center;
  gap: 0.95rem;
  min-height: 64px;
  padding: 0.45rem 0.75rem;
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
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--parchment-base);
  border: 1.5px solid var(--parchment-edge);
  color: var(--ink-primary);
  font-family: var(--font-display);
  font-size: 1.4rem;
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
  font-size: 1.05rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-gold-dark);
  align-self: flex-start;
  padding-top: 0.5rem;
}

.row-body {
  flex: 1;
  min-width: 0; /* allow ellipsis to kick in */
}

.row-name {
  font-size: 1.6rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-primary);
  line-height: 1.2;
}

.row-description {
  font-size: 1.25rem;
  color: var(--ink-secondary);
  margin: 0.25rem 0 0;
  line-height: 1.4;
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
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-gold-dark);
  align-self: flex-start;
  padding-top: 0.5rem;
}

.empty-hint {
  text-align: center;
  color: var(--ink-muted);
  font-size: var(--ui-helper-font);
  margin: 1.35rem 0;
}

.custom-section {
  /* The last category header's border-bottom is now the only line
     separating the list from this section, so give the heading a
     clear stretch of parchment before it. */
  margin-top: 2.25rem;
}

.custom-title {
  font-size: 1.35rem;
}

.custom-hint {
  font-size: var(--ui-helper-font);
  margin: 0.35rem 0 1rem;
  color: var(--ink-muted);
}

.field {
  display: block;
  margin-bottom: var(--ui-field-gap);
}

.field-label {
  display: block;
  font-family: var(--font-display);
  font-size: var(--ui-label-font);
  letter-spacing: var(--ui-label-tracking);
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: var(--ui-label-gap);
}

.field-input {
  width: 100%;
  font-family: var(--font-body);
  font-size: var(--ui-input-font);
  padding: var(--ui-input-padding);
  background: var(--parchment-warm);
  border: 1px solid var(--button-border);
  color: var(--ink-primary);
  border-radius: 2px;
}

.custom-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.65rem;
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

@media (max-width: 640px) {
  .library-drawer {
    width: 100%;
    padding: 1.1rem 1.1rem 2.25rem;
  }

  /* Wrap chips onto multiple rows on narrow screens — horizontal
     scroll was cutting off the last chip ("Underground") against the
     drawer edge, and the scroll affordance wasn't discoverable. */
  .filter-row {
    flex-wrap: wrap;
    row-gap: 0.4rem;
  }

  .env-btn { flex-shrink: 0; }

  /* Row internals are unique to the library and not in the shared
     scale — keep the mobile tuning here. */
  .category-header { font-size: 1.55rem; padding: 0.8rem 0.45rem; }
  .category-count { font-size: 1.15rem; }
  .category-chevron { width: 1.2rem; font-size: 1rem; }
  .row-name { font-size: 1.35rem; }
  .row-description { font-size: 1.1rem; }
  .row-shape { font-size: 0.85rem; }
  .row-add { width: 34px; height: 34px; font-size: 1.25rem; }
  .library-row { min-height: 58px; gap: 0.75rem; }
  .custom-title { font-size: 1.2rem; }
}
</style>
