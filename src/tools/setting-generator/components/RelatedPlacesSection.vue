<template>
  <div class="related-places-section">
    <div class="related-places-header">
      <h3 class="related-places-title">Related Places</h3>
      <p v-if="hasAnyStubs" class="related-places-subtitle">
        Places mentioned in this setting's prose. Promote them to first-class settings of their own.
      </p>
    </div>

    <p v-if="!hasAnyStubs" class="related-places-empty">
      No related places yet. After this setting is generated, named places from its prose
      (regions, neighbors, internal landmarks, geographic features) appear here.
    </p>

    <!-- Within: the setting sits inside these places. Parent candidates. -->
    <div v-if="groups.parent.length" class="related-places-group">
      <h4 class="related-places-group-title">Within</h4>
      <p class="related-places-group-help">
        Larger places that contain {{ settingName }}. Promoting moves {{ settingName }} under the new parent.
      </p>
      <ul class="related-places-list">
        <li v-for="stub in groups.parent" :key="`p-${stub.name}`" class="related-place-row">
          <div class="related-place-info">
            <strong class="related-place-name">{{ stub.name }}</strong>
            <span v-if="stub.role_brief" class="related-place-role">{{ stub.role_brief }}</span>
            <blockquote v-if="stub.source_quote" class="related-place-quote">{{ stub.source_quote }}</blockquote>
          </div>
          <div class="related-place-actions">
            <ParCardButton v-if="!stub.promoted_setting_id" @click="onPromote(stub, 'parent')">
              Create as Parent
            </ParCardButton>
            <ParCardButton v-else @click="onView(stub)">
              View in Setting Generator
            </ParCardButton>
            <button type="button" class="related-place-remove"
              :title="`Remove ${stub.name}`" :aria-label="`Remove ${stub.name}`"
              @click="onRemove(stub)">✕</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Adjacent: peers at the same scale. Sibling candidates. -->
    <div v-if="groups.sibling.length" class="related-places-group">
      <h4 class="related-places-group-title">Adjacent</h4>
      <p class="related-places-group-help">
        Peer settings at similar scale. Promoting creates a sibling under the same parent as {{ settingName }}.
      </p>
      <ul class="related-places-list">
        <li v-for="stub in groups.sibling" :key="`s-${stub.name}`" class="related-place-row">
          <div class="related-place-info">
            <strong class="related-place-name">{{ stub.name }}</strong>
            <span v-if="stub.role_brief" class="related-place-role">{{ stub.role_brief }}</span>
            <blockquote v-if="stub.source_quote" class="related-place-quote">{{ stub.source_quote }}</blockquote>
          </div>
          <div class="related-place-actions">
            <ParCardButton v-if="!stub.promoted_setting_id" @click="onPromote(stub, 'sibling')">
              Create as Sibling
            </ParCardButton>
            <ParCardButton v-else @click="onView(stub)">
              View in Setting Generator
            </ParCardButton>
            <button type="button" class="related-place-remove"
              :title="`Remove ${stub.name}`" :aria-label="`Remove ${stub.name}`"
              @click="onRemove(stub)">✕</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Contains: internal sublocations. -->
    <div v-if="groups.sublocation.length" class="related-places-group">
      <h4 class="related-places-group-title">Contains</h4>
      <p class="related-places-group-help">
        Places inside {{ settingName }}. Promoting creates a sublocation.
      </p>
      <ul class="related-places-list">
        <li v-for="stub in groups.sublocation" :key="`l-${stub.name}`" class="related-place-row">
          <div class="related-place-info">
            <strong class="related-place-name">{{ stub.name }}</strong>
            <span v-if="stub.role_brief" class="related-place-role">{{ stub.role_brief }}</span>
            <blockquote v-if="stub.source_quote" class="related-place-quote">{{ stub.source_quote }}</blockquote>
          </div>
          <div class="related-place-actions">
            <ParCardButton v-if="!stub.promoted_setting_id" @click="onPromote(stub, 'sublocation')">
              Create as Sublocation
            </ParCardButton>
            <ParCardButton v-else @click="onView(stub)">
              View in Setting Generator
            </ParCardButton>
            <button type="button" class="related-place-remove"
              :title="`Remove ${stub.name}`" :aria-label="`Remove ${stub.name}`"
              @click="onRemove(stub)">✕</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Features: named geography, not promotable. Context only. -->
    <div v-if="groups.feature.length" class="related-places-group">
      <h4 class="related-places-group-title">Features</h4>
      <p class="related-places-group-help">
        Named geography (roads, rivers, ranges) mentioned in the prose. For reference only — features aren't first-class settings.
      </p>
      <ul class="related-places-list">
        <li v-for="stub in groups.feature" :key="`f-${stub.name}`" class="related-place-row related-place-row--readonly">
          <div class="related-place-info">
            <strong class="related-place-name">{{ stub.name }}</strong>
            <span v-if="stub.role_brief" class="related-place-role">{{ stub.role_brief }}</span>
            <blockquote v-if="stub.source_quote" class="related-place-quote">{{ stub.source_quote }}</blockquote>
          </div>
          <div class="related-place-actions">
            <button type="button" class="related-place-remove"
              :title="`Remove ${stub.name}`" :aria-label="`Remove ${stub.name}`"
              @click="onRemove(stub)">✕</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { ParCardButton } from '@/parchment';
import { navigateToTool } from '@/util/navigation.mjs';

const props = defineProps({
  setting: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['promote-related-place', 'remove-related-place']);

const stubs = computed(() =>
  Array.isArray(props.setting?.related_places) ? props.setting.related_places : []
);

const hasAnyStubs = computed(() => stubs.value.length > 0);

const settingName = computed(() =>
  props.setting?.place_name
    || props.setting?.setting_overview?.name
    || 'this setting'
);

// Group stubs by kind. Defensive fallback to 'feature' for unknown
// kinds so a future LLM-emitted kind value doesn't drop the row.
const groups = computed(() => {
  const out = { parent: [], sibling: [], sublocation: [], feature: [] };
  for (const stub of stubs.value) {
    const kind = stub?.kind && out[stub.kind] ? stub.kind : 'feature';
    out[kind].push(stub);
  }
  return out;
});

function onPromote(stub, kind) {
  emit('promote-related-place', { stub, kind });
}

function onView(stub) {
  if (!stub?.promoted_setting_id) return;
  navigateToTool('setting-generator', { setting: stub.promoted_setting_id });
}

function onRemove(stub) {
  emit('remove-related-place', { stub });
}
</script>

<style scoped lang="scss">
/* ============================================
   Related Places — parchment surface matching
   the rest of the Locations tab. Lives below
   Important Locations. Distinguishes itself
   from Important Locations conceptually:
   "what the prose actually named" vs
   "what the DM wants to invent."
   ============================================ */
.related-places-section {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--par-color-divider, #e2dccd);
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
}

.related-places-header {
  margin-bottom: 1rem;
}

.related-places-title {
  margin: 0;
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.02em;
  line-height: 1.3;
}

.related-places-subtitle {
  margin: 0.4rem 0 0;
  font-size: 1.4rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.5;
}

.related-places-empty {
  margin: 0.75rem 0 0;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.6;
}

.related-places-group {
  margin-top: 1.5rem;
}

.related-places-group-title {
  margin: 0 0 0.25rem 0;
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--par-color-text-secondary, #555);
}

.related-places-group-help {
  margin: 0 0 0.6rem 0;
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.5;
}

.related-places-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.related-place-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1.25rem 1.25rem;
  background: rgba(0, 0, 0, 0.025);
  border-radius: var(--par-radius-sm, 3px);

  &--readonly {
    background: rgba(0, 0, 0, 0.012);
  }
}

.related-place-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
  flex: 1;
}

.related-place-name {
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--par-color-text, #222);
  line-height: 1.3;
}

.related-place-role {
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.4rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.4;
}

.related-place-quote {
  margin: 0.3rem 0 0;
  padding: 0.4rem 0 0.4rem 0.9rem;
  border-left: 2px solid var(--par-color-divider, #e2dccd);
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.35rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.5;
}

.related-place-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;
  padding-top: 0.2rem;
}

.related-place-remove {
  appearance: none;
  -webkit-appearance: none;
  background: none;
  border: none;
  margin: 0;
  padding: 0.5rem 0.7rem;
  font-family: inherit;
  font-size: 1.4rem;
  line-height: 1;
  color: var(--par-color-text-muted, #6b6b6b);
  border-radius: var(--par-radius-sm, 3px);
  cursor: pointer;
  transition: color 0.15s ease, background-color 0.15s ease;

  &:hover {
    color: var(--par-color-title, #7a1f1f);
    background: var(--par-color-action-hover, rgba(122, 31, 31, 0.06));
  }

  &:focus-visible {
    outline: 2px solid var(--par-color-title, #7a1f1f);
    outline-offset: 2px;
  }
}
</style>
