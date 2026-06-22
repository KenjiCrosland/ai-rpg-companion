<template>
  <div class="related-npcs-section parchment">
    <div class="related-npcs-header">
      <h3 class="related-npcs-title">Notable NPCs</h3>
      <p class="related-npcs-subtitle">
        People connected to this setting — extracted from its prose or
        <button
          type="button"
          class="related-npcs-subtitle-link"
          @click="openAddForm"
        >added manually</button>. Generated NPCs are saved to the NPC Generator.
      </p>
    </div>

    <AddNPCForm
      ref="addFormRef"
      :factions="setting.factions || []"
      @add-and-generate="onAddAndGenerate"
    />

    <p v-if="npcs.length === 0 && !loadingNewNPC" class="related-npcs-empty">
      No NPCs yet. Use the form above to add one, or generate this setting's
      overview — named people from its prose appear here automatically.
    </p>

    <!-- New-NPC loading row — sits above all groups while a brand-new
         NPC is being generated. -->
    <div v-if="loadingNewNPC" class="related-npcs-group">
      <ul class="related-npcs-list">
        <li class="npc-row-loading">
          <div class="npc-row-loading-info">
            <strong class="npc-row-loading-name">Generating new NPC…</strong>
            <span class="npc-row-loading-role">Creating description and relationships</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- Grouped by faction -->
    <template v-if="hasAnyFaction">
      <div
        v-for="groupName in orderedGroupNames"
        :key="`g-${groupName}`"
        class="related-npcs-group"
      >
        <h4 class="related-npcs-group-title">{{ groupName }}</h4>
        <ul class="related-npcs-list">
          <li
            v-for="entry in grouped[groupName]"
            :key="rowKey(entry)"
            class="npc-list-item"
          >
            <Transition
              :css="!reducedMotion"
              name="npc-swap"
              mode="out-in"
            >
              <div
                v-if="!isExpanded(entry) && isStub(entry.npc)"
                key="stub"
                class="npc-stub-row"
              >
                <div class="npc-collapsed-info">
                  <strong class="npc-collapsed-name">{{ entry.npc.name || 'Unnamed NPC' }}</strong>
                  <span v-if="oneLineDescription(entry.npc)" class="npc-collapsed-desc">
                    {{ oneLineDescription(entry.npc) }}
                  </span>
                </div>
                <div class="npc-stub-actions">
                  <ParCardButton
                    size="small"
                    :disabled="loadingNpcIndex === entry.index"
                    @click="$emit('generate-detailed-description', { npcIndex: entry.index })"
                  >
                    {{ loadingNpcIndex === entry.index ? 'Generating…' : 'Generate Full NPC' }}
                  </ParCardButton>
                  <button
                    type="button"
                    class="npc-stub-delete"
                    :aria-label="`Delete ${entry.npc.name || 'NPC'}`"
                    @click="$emit('delete-npc', { npcIndex: entry.index })"
                  >
                    <svg viewBox="0 0 12 12" width="18" height="18" aria-hidden="true">
                      <line x1="3" y1="3" x2="9" y2="9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                      <line x1="9" y1="3" x2="3" y2="9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                v-else-if="!isExpanded(entry)"
                key="collapsed"
                class="npc-collapsed-row"
                role="button"
                tabindex="0"
                :aria-expanded="false"
                :aria-label="`Expand ${entry.npc.name || 'NPC'}`"
                @click="toggleExpand(entry)"
                @keydown.enter.prevent="toggleExpand(entry)"
                @keydown.space.prevent="toggleExpand(entry)"
              >
                <div class="npc-collapsed-info">
                  <strong class="npc-collapsed-name">{{ entry.npc.name || 'Unnamed NPC' }}</strong>
                  <span v-if="oneLineDescription(entry.npc)" class="npc-collapsed-desc">
                    {{ oneLineDescription(entry.npc) }}
                  </span>
                </div>
                <span class="npc-collapsed-chevron" aria-hidden="true">
                  <svg viewBox="0 0 12 12" width="18" height="18">
                    <polyline
                      points="2,4 6,8 10,4"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>

              <NPCCard
                v-else
                key="expanded"
                :npc="normalizeSettingNPC(entry.npc)"
                :origin="originLabel"
                :source-type="'setting'"
                :display-type="'setting'"
                :is-editing="editingNpcIndex === entry.index"
                :show-relationship-generator="true"
                :is-generating-relationship="loadingNewRelationship"
                :has-statblock="false"
                :editable="true"
                :show-delete="true"
                :stub-mode="isStub(entry.npc)"
                :loading-description="loadingNpcIndex === entry.index"
                :collapsible="true"
                :is-collapsed="false"
                @start-edit="onStartEdit(entry)"
                @save-edit="$emit('save-edit', { npcIndex: entry.index, edited: $event })"
                @cancel-edit="$emit('cancel-edit')"
                @generate-relationship="$emit('generate-relationship', { npcIndex: entry.index, payload: $event })"
                @generate-detailed="$emit('generate-detailed-description', { npcIndex: entry.index })"
                @delete="$emit('delete-npc', { npcIndex: entry.index })"
                @toggle-collapse="toggleExpand(entry)"
              />
            </Transition>
          </li>
        </ul>
      </div>
    </template>

    <!-- Flat list (no factions referenced by any NPC) -->
    <div v-else-if="npcs.length > 0" class="related-npcs-group">
      <ul class="related-npcs-list">
        <li
          v-for="entry in flatList"
          :key="rowKey(entry)"
          class="npc-list-item"
        >
          <Transition
            :css="!reducedMotion"
            name="npc-swap"
            mode="out-in"
          >
            <div
              v-if="!isExpanded(entry) && isStub(entry.npc)"
              key="stub"
              class="npc-stub-row"
            >
              <div class="npc-collapsed-info">
                <strong class="npc-collapsed-name">{{ entry.npc.name || 'Unnamed NPC' }}</strong>
                <span v-if="oneLineDescription(entry.npc)" class="npc-collapsed-desc">
                  {{ oneLineDescription(entry.npc) }}
                </span>
              </div>
              <div class="npc-stub-actions">
                <ParCardButton
                  size="small"
                  :disabled="loadingNpcIndex === entry.index"
                  @click="$emit('generate-detailed-description', { npcIndex: entry.index })"
                >
                  {{ loadingNpcIndex === entry.index ? 'Generating…' : 'Generate Full NPC' }}
                </ParCardButton>
                <button
                  type="button"
                  class="npc-stub-delete"
                  :aria-label="`Delete ${entry.npc.name || 'NPC'}`"
                  @click="$emit('delete-npc', { npcIndex: entry.index })"
                >
                  <svg viewBox="0 0 12 12" width="18" height="18" aria-hidden="true">
                    <line x1="3" y1="3" x2="9" y2="9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                    <line x1="9" y1="3" x2="3" y2="9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div
              v-else-if="!isExpanded(entry)"
              key="collapsed"
              class="npc-collapsed-row"
              role="button"
              tabindex="0"
              :aria-expanded="false"
              :aria-label="`Expand ${entry.npc.name || 'NPC'}`"
              @click="toggleExpand(entry)"
              @keydown.enter.prevent="toggleExpand(entry)"
              @keydown.space.prevent="toggleExpand(entry)"
            >
              <div class="npc-collapsed-info">
                <strong class="npc-collapsed-name">{{ entry.npc.name || 'Unnamed NPC' }}</strong>
                <span v-if="oneLineDescription(entry.npc)" class="npc-collapsed-desc">
                  {{ oneLineDescription(entry.npc) }}
                </span>
              </div>
              <span class="npc-collapsed-chevron" aria-hidden="true">
                <svg viewBox="0 0 12 12" width="18" height="18">
                  <polyline
                    points="2,4 6,8 10,4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>

            <NPCCard
              v-else
              key="expanded"
              :npc="normalizeSettingNPC(entry.npc)"
              :origin="originLabel"
              :source-type="'setting'"
              :display-type="'setting'"
              :is-editing="editingNpcIndex === entry.index"
              :show-relationship-generator="true"
              :is-generating-relationship="loadingNewRelationship"
              :has-statblock="false"
              :editable="true"
              :show-delete="true"
              :stub-mode="isStub(entry.npc)"
              :loading-description="loadingNpcIndex === entry.index"
              :collapsible="true"
              :is-collapsed="false"
              @start-edit="onStartEdit(entry)"
              @save-edit="$emit('save-edit', { npcIndex: entry.index, edited: $event })"
              @cancel-edit="$emit('cancel-edit')"
              @generate-relationship="$emit('generate-relationship', { npcIndex: entry.index, payload: $event })"
              @generate-detailed="$emit('generate-detailed-description', { npcIndex: entry.index })"
              @delete="$emit('delete-npc', { npcIndex: entry.index })"
              @toggle-collapse="toggleExpand(entry)"
            />
          </Transition>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import AddNPCForm from './AddNPCForm.vue';
import NPCCard from '@/components/NPCCard.vue';
import { ParCardButton } from '@/parchment';
import { normalizeSettingNPC } from '@/util/npc-storage.mjs';

const props = defineProps({
  setting: {
    type: Object,
    required: true,
  },
  loadingNewNPC: {
    type: Boolean,
    default: false,
  },
  loadingNpcIndex: {
    type: Number,
    default: null,
  },
  loadingNewRelationship: {
    type: Boolean,
    default: false,
  },
  editingNpcIndex: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits([
  'add-and-generate',
  'generate-detailed-description',
  'start-edit',
  'cancel-edit',
  'save-edit',
  'delete-npc',
  'generate-relationship',
]);

const addFormRef = ref(null);
function openAddForm() {
  addFormRef.value?.expand();
}

const npcs = computed(() => Array.isArray(props.setting?.npcs) ? props.setting.npcs : []);

const originLabel = computed(() =>
  props.setting?.setting_overview?.name || props.setting?.place_name || ''
);

const factionOrder = computed(() => {
  const seen = new Set();
  const order = [];
  for (const f of props.setting?.factions || []) {
    const name = (f?.name || '').trim();
    if (name && !seen.has(name)) {
      order.push(name);
      seen.add(name);
    }
  }
  return order;
});

const hasAnyFaction = computed(() =>
  npcs.value.some(n => (n?.faction || '').trim().length > 0)
);

const grouped = computed(() => {
  const out = {};
  npcs.value.forEach((npc, index) => {
    const fac = (npc?.faction || '').trim() || 'Unaffiliated';
    if (!out[fac]) out[fac] = [];
    out[fac].push({ npc, index });
  });
  return out;
});

const orderedGroupNames = computed(() => {
  const present = new Set(Object.keys(grouped.value));
  const ordered = [];
  for (const name of factionOrder.value) {
    if (present.has(name)) {
      ordered.push(name);
      present.delete(name);
    }
  }
  for (const name of Object.keys(grouped.value)) {
    if (present.has(name) && name !== 'Unaffiliated') {
      ordered.push(name);
      present.delete(name);
    }
  }
  if (present.has('Unaffiliated')) ordered.push('Unaffiliated');
  return ordered;
});

const flatList = computed(() =>
  npcs.value.map((npc, index) => ({ npc, index }))
);

function rowKey({ npc, index }) {
  return npc?.npc_id || `stub-${index}`;
}

function isStub(npc) {
  return !npc?.read_aloud_description;
}

// One-line description in the collapsed row. Stubs use the user's
// short blurb; promoted NPCs use description_of_position (the
// canonical role tag). Both feed the same visual slot so collapsed
// rows look identical regardless of generation state.
function oneLineDescription(npc) {
  if (isStub(npc)) {
    return (npc?.description || '').trim();
  }
  return (npc?.description_of_position || '').trim();
}

// ---- single-open expansion state ----
// Only one NPC may be expanded at a time. Tracked by a single ref of
// the row key (or null when nothing is expanded). Toggling the same
// row collapses it; toggling a different row collapses the previous
// and expands the new one in one ref change — Vue's reactivity then
// drives both Transitions in parallel.
const expandedKey = ref(null);

function isExpanded(entry) {
  return expandedKey.value === rowKey(entry);
}

function toggleExpand(entry) {
  const key = rowKey(entry);
  expandedKey.value = expandedKey.value === key ? null : key;
}

function onStartEdit(entry) {
  // Editing requires the card to be expanded — guarantee it.
  expandedKey.value = rowKey(entry);
  emit('start-edit', { npcIndex: entry.index });
}

function onAddAndGenerate(payload) {
  emit('add-and-generate', payload);
}

// ---- animation ----
// Simple opacity + small translateY settle on the entering element;
// quick fade-out on the leaving element. The wrapper height changes
// naturally when the DOM swaps — no JS-measured height animation
// (which read as jarring on the previous pass). The "simple
// expansion → header transitions in" feel comes from the entering
// card's slight downward settle + delayed fade.
// prefers-reduced-motion → Vue's :css="false" skips classes entirely
// and the swap is instant.
const reducedMotion = ref(typeof window !== 'undefined'
  && window.matchMedia
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

if (typeof window !== 'undefined' && window.matchMedia) {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handler = (e) => { reducedMotion.value = e.matches; };
  if (mql.addEventListener) mql.addEventListener('change', handler);
  else if (mql.addListener) mql.addListener(handler);
}

// Reset expansion when the parent switches settings.
watch(() => props.setting, () => {
  expandedKey.value = null;
});
</script>

<style scoped lang="scss">
/* Workspace surface — same parchment register as RelatedPlacesSection.
   Font stacks include the same fallback chain tokens.css defines so
   the serif still resolves correctly when the CSS variable hasn't
   loaded yet (matches the convention used by ParButton,
   ParCallout, ParCardTextarea, etc.). */
.related-npcs-section {
  background: transparent;
  padding: 2rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

.related-npcs-header {
  margin-bottom: 1.25rem;
}

.related-npcs-title {
  /* Large 2.8rem — the shared tab-header standard across Locations /
     Factions / NPCs / Quest Hooks. */
  margin: 0 0 0.3rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 2.8rem;
  font-weight: 600;
  color: var(--par-color-action-primary, #2A4D70);
  letter-spacing: 0;
  line-height: 1.2;
}

.related-npcs-subtitle {
  /* Standard tab description: regular-weight serif body text (matches the
     Locations tab, the canonical reference). */
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.55;
}

.related-npcs-subtitle-link {
  appearance: none;
  -webkit-appearance: none;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  font: inherit;
  color: var(--par-color-action-primary, #2A4D70);
  text-decoration: underline;
  text-underline-offset: 0.15em;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    color: var(--par-color-action-primary, #2A4D70);
    text-decoration-thickness: 2px;
    outline: none;
  }
}

.related-npcs-empty {
  margin: 0.75rem 0 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.6;
}

.related-npcs-group {
  margin-top: 1.5rem;
}

.related-npcs-group-title {
  margin: 0 0 0.6rem 0;
  font-family: var(--par-font-sans, sans-serif);
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--color-action-hover, #2A4D70);
}

.related-npcs-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.npc-list-item {
  list-style: none;
}

/* ---- Collapsed row ----
   Uniform lightweight row used for ALL NPCs, regardless of generation
   state. Cream fill, warm-tan border, serif name + sans italic
   description. Padding matches NPCCard's header (1.6rem 3rem) so the
   chevron stays at the same horizontal x-coordinate when a row
   expands into the burgundy card — no left-jump on the swap. */
.npc-collapsed-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 1.6rem 3rem;
  background: var(--par-color-surface, #FBF7F0);
  border: 1.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-sm, 3px);
  box-shadow: var(--par-color-card-shadow, 0 1px 3px rgba(122, 50, 30, 0.04));
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);

  &:hover {
    background: #f8f3e8;
    border-color: var(--par-color-title, #7a1f1f);
  }

  &:focus-visible {
    outline: 2px solid var(--par-color-action-primary, #2A4D70);
    outline-offset: 2px;
  }
}

/* Stub row — same parchment surface as the collapsed row, but no
   expand affordance (chevron gone, cursor default, no hover-as-button
   feedback). Inline actions sit on the right: Generate Full NPC
   promotes the stub, Delete removes it. Stubs are not expandable
   because there's nothing to expand — the user's short blurb is all
   the stub has. The two actions cover both intents directly. */
.npc-stub-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 1.6rem 3rem;
  background: var(--par-color-surface, #FBF7F0);
  border: 1.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-sm, 3px);
  box-shadow: var(--par-color-card-shadow, 0 1px 3px rgba(122, 50, 30, 0.04));
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

.npc-stub-actions {
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
}

.npc-collapsed-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
  flex: 1;
}

.npc-collapsed-name {
  /* Bumped from 1.5rem so the stub row doesn't read as a small
     island of text next to the NPCCard header on expand. The
     burgundy 2.8rem title still dominates the expanded state;
     1.8rem here keeps the collapsed row substantial without
     claiming the same hierarchy. */
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--par-color-text, #222);
  line-height: 1.3;
}

.npc-collapsed-desc {
  font-family: var(--par-font-sans, sans-serif);
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.4;
  /* One line only, truncate with ellipsis when long so collapsed rows
     stay visually scannable. */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.npc-collapsed-chevron {
  /* Bordered box matches .npc-card-collapse styling on NPCCard so
     the chevron looks identical (same size, same chrome) in both
     collapsed and expanded states. */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 0.75rem;
  color: var(--par-color-action-muted, #5A7A9A);
  border: 1px solid var(--par-color-divider, #e2dccd);
  border-radius: var(--par-radius-sm, 3px);
  background: rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
  transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;

  svg { display: block; }
}

.npc-collapsed-row:hover .npc-collapsed-chevron {
  color: var(--par-color-title, #7a1f1f);
  border-color: var(--par-color-title, #7a1f1f);
  background: rgba(255, 255, 255, 0.85);
}

/* Stub-row delete — bordered box mirroring the collapsed-row chevron
   (same size, same chrome), so the affordance lines up visually with
   the click-to-expand chevron on non-stub rows. Faded slate at rest,
   burgundy on hover/focus — the chevron's destructive sibling. */
.npc-stub-delete {
  appearance: none;
  -webkit-appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 0.75rem;
  color: var(--par-color-action-muted, #5A7A9A);
  border: 1px solid var(--par-color-divider, #e2dccd);
  border-radius: var(--par-radius-sm, 3px);
  background: rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
  cursor: pointer;
  transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease;

  svg { display: block; }

  &:hover,
  &:focus-visible {
    color: var(--par-color-title, #7a1f1f);
    border-color: var(--par-color-title, #7a1f1f);
    background: rgba(255, 255, 255, 0.85);
    outline: none;
  }
}

/* ---- New-NPC loading row ----
   Visually mirrors the collapsed row shape so it slots into the list
   without disrupting rhythm. Italic muted label communicates the
   generation-in-flight state without claiming a real NPC name. */
.npc-row-loading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 1.6rem 3rem;
  background: var(--par-color-surface, #FBF7F0);
  border: 1.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-sm, 3px);
  box-shadow: var(--par-color-card-shadow, 0 1px 3px rgba(122, 50, 30, 0.04));
  list-style: none;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

.npc-row-loading-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.npc-row-loading-name {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--par-color-text-muted, #6b6b6b);
  font-style: italic;
}

.npc-row-loading-role {
  font-family: var(--par-font-sans, sans-serif);
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}

/* ---- Swap animation ----
   Leaving element fades out quickly; entering element fades in with a
   tiny downward settle (6px) on a short delay. The DOM height changes
   between the two elements during the swap, but the bounded opacity
   transitions on either side mask the jump so the user reads it as
   "simple expansion → header settles in" rather than a hard cut. No
   JS height animation — that read as jarring on the previous pass. */
.npc-swap-leave-active {
  transition: opacity 120ms ease-in;
}

.npc-swap-leave-to {
  opacity: 0;
}

.npc-swap-enter-active {
  transition: opacity 220ms ease-out 70ms, transform 220ms ease-out 70ms;
}

.npc-swap-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}

.npc-swap-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
