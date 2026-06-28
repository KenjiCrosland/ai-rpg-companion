<template>
  <div class="related-settings-section parchment">
    <!-- Header mirrors RelatedNPCsSection: title + ghost re-scan button.
         Tooltip explains when re-scan is useful so the affordance label
         can stay short ("Re-scan lore"). -->
    <div class="related-settings-header">
      <h3 class="related-settings-title">Related Settings</h3>
      <ParTooltip
        text="Scans this item's lore and timeline events for named locations and adds them here. Re-run after editing the lore or adding events."
      >
        <button
          type="button"
          class="related-settings-rescan"
          :disabled="loading"
          @click="rescan"
        >
          {{ loading ? 'Scanning…' : 'Re-scan lore' }}
        </button>
      </ParTooltip>
    </div>

    <!-- Empty state. Same two-audience framing as the NPC version:
         existing items pre-date the related_settings field; new items
         get scanned during generation. The Lore Builder fallback link
         opens the path to richer lore that names places. -->
    <div v-if="!hasStubs" class="related-settings-empty">
      <p class="related-settings-empty-copy">
        No related settings yet. Click Re-scan lore above to find named locations in this item's lore. If the lore doesn't mention any,
        <a
          href="#"
          class="related-settings-empty-link"
          @click.prevent="$emit('switch-to-lore-builder')"
        >use the Lore Builder</a>
        to add more lore content.
      </p>
    </div>

    <ul v-if="hasStubs" class="related-settings-list">
      <li
        v-for="(stub, idx) in visibleStubs"
        :key="`${stub.name}-${idx}`"
        class="related-setting-row"
      >
        <div class="related-setting-info">
          <strong class="related-setting-name">{{ displayNameFor(stub) }}</strong>
          <span v-if="stub.role_brief" class="related-setting-role">{{ stub.role_brief }}</span>
        </div>

        <div class="related-setting-actions">
          <ParButton
            v-if="!stub.setting_id"
            variant="primary-outline"
            size="small"
            @click="onCreate(stub)"
          >
            Create setting
          </ParButton>
          <ParButton
            v-else
            variant="primary-outline"
            size="small"
            @click="onView(stub)"
          >
            View in Setting Generator
          </ParButton>
          <!--
            Only show ✕ for UNPROMOTED stubs. See RelatedDungeonsSection
            for the rationale: removing a promoted stub from this list
            doesn't delete the setting, doesn't clear its sourceType
            back-pointer, and doesn't drop the inspired_by_item edge —
            it just half-breaks the relationship. Force users to the
            Setting Generator to do a real delete.
          -->
          <button
            v-if="!stub.setting_id"
            type="button"
            class="related-setting-remove"
            :title="`Remove ${displayNameFor(stub)}`"
            :aria-label="`Remove ${displayNameFor(stub)}`"
            @click="onRemove(idx)"
          >
            ✕
          </button>
        </div>
      </li>
    </ul>

    <button
      v-if="hasStubs && stubs.length > collapseThreshold"
      type="button"
      class="related-settings-toggle"
      @click="showAll = !showAll"
    >
      {{ showAll ? 'Show fewer' : `Show all (${stubs.length})` }}
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { ParButton, ParTooltip } from '@/parchment';
import { navigateToTool } from '@/util/navigation.mjs';
import { trackEvent } from '@/util/analytics.mjs';
import { extractRelatedSettings, mergeStubs } from '@/tools/item-generator/utils/extract-related-settings.mjs';
import { getSettingDisplayName } from '@/util/setting-storage.mjs';
import { useToast } from '@/composables/useToast';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:item', 'switch-to-lore-builder']);
const toast = useToast();
const loading = ref(false);

const COLLAPSE_THRESHOLD = 5;
const collapseThreshold = COLLAPSE_THRESHOLD;
const showAll = ref(false);

const stubs = computed(() => Array.isArray(props.item?.related_settings) ? props.item.related_settings : []);
const hasStubs = computed(() => stubs.value.length > 0);
const visibleStubs = computed(() =>
  stubs.value.length > COLLAPSE_THRESHOLD && !showAll.value
    ? stubs.value.slice(0, COLLAPSE_THRESHOLD)
    : stubs.value
);

// Display name resolves LIVE from setting storage when a stub has been
// promoted (`setting_id` is set). Same shape as RelatedDungeonsSection's
// `displayNameFor`: substrate's "identity is the id, display reads live"
// principle made concrete on the consumer side, so renames in the
// setting tool propagate through to the item card at the next render
// without a fanout-on-save helper.
//
// Falls back to the stub's stored name when the setting is missing
// (deleted, or the stub hasn't been promoted yet).
function displayNameFor(stub) {
  if (stub?.setting_id) {
    const live = getSettingDisplayName(stub.setting_id);
    if (live) return live;
  }
  return stub?.name || '';
}

async function rescan() {
  if (loading.value) return;
  loading.value = true;
  try {
    const fresh = await extractRelatedSettings(props.item);
    const merged = mergeStubs(props.item.related_settings, fresh);
    emit('update:item', { ...props.item, related_settings: merged });
    if (fresh.length === 0 && (!props.item.related_settings || props.item.related_settings.length === 0)) {
      toast.info?.('No named locations found in this item\'s lore.');
    } else {
      toast.success?.(`Found ${fresh.length} location${fresh.length === 1 ? '' : 's'} in lore.`);
    }
  } catch (error) {
    console.error('Error extracting related settings:', error);
    toast.error?.('Failed to scan lore for locations.');
  } finally {
    loading.value = false;
  }
}

function onCreate(stub) {
  trackEvent('cross_tool_start', { from_tool: 'item-generator', to_tool: 'setting-generator' });
  navigateToTool('setting-generator', {
    fromType: 'item',
    fromId: props.item.name,
    entityName: stub.name,
  });
}

function onView(stub) {
  if (!stub?.setting_id) return;
  navigateToTool('setting-generator', {
    setting: stub.setting_id,
  });
}

function onRemove(idx) {
  const next = stubs.value.slice();
  next.splice(idx, 1);
  emit('update:item', { ...props.item, related_settings: next });
}
</script>

<style scoped lang="scss">
/* ============================================
   Related Settings — same parchment surface
   as Related NPCs. Lives below the NPCs
   section in the item card. Visual treatment
   intentionally identical so the two stub
   sections read as a coherent "related
   entities" pair under a single item.
   ============================================ */
.related-settings-section {
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--par-color-border-strong, #c9b99a);
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
}

.related-settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.related-settings-title {
  margin: 0;
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-action-hover, #2A4D70);
  letter-spacing: 0.02em;
  line-height: 1.3;
}

.related-settings-rescan {
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  border: none;
  margin: 0;
  padding: 0 0 1px;
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.3rem;
  color: var(--color-action-rest, #365A85);
  cursor: pointer;
  border-bottom: 0.5px solid var(--color-action-rest, #365A85);
  transition: color 0.15s ease, border-color 0.15s ease;

  &:hover:not(:disabled) {
    color: var(--color-action-hover, #2A4D70);
    border-color: var(--color-action-hover, #2A4D70);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
    outline-offset: 2px;
    border-radius: 2px;
  }
}

/* Empty state: warm-tan contained surface so the copy reads as a
   contained "section is empty" region, parallel to a populated stub
   row. Heading + Re-scan stay outside on the page register. */
.related-settings-empty {
  margin: 0.75rem 0 0;
  background: var(--par-color-callout-bg-light, #F8F2E3);
  border-radius: 0.8rem;
  padding: 1.25rem 1.5rem;
}

.related-settings-empty-copy {
  margin: 0;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.6;
}

.related-settings-empty-link {
  color: var(--color-action-rest, #365A85);
  text-decoration: none;
  border-bottom: 0.5px solid var(--color-action-rest, #365A85);
  cursor: pointer;
  font-style: normal;
  transition: color 0.15s ease, border-color 0.15s ease;

  &:hover {
    color: var(--color-action-hover, #2A4D70);
    border-color: var(--color-action-hover, #2A4D70);
  }

  &:focus-visible {
    outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
    outline-offset: 2px;
  }
}

.related-settings-list {
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.related-setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 0.95rem 1.25rem;
  background: var(--par-color-callout-bg-light, #F8F2E3);
  border: 1px solid var(--par-color-border-strong, #c9b99a);
  border-radius: 0.8rem;
}

.related-setting-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
  flex: 1;
}

.related-setting-name {
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--par-color-text, #222);
  line-height: 1.3;
}

.related-setting-role {
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.4rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.4;
}

.related-setting-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;
}

.related-setting-remove {
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
    color: var(--par-color-text, #222);
    background: rgba(0, 0, 0, 0.04);
  }

  &:focus-visible {
    outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
    outline-offset: 2px;
  }
}

.related-settings-toggle {
  appearance: none;
  -webkit-appearance: none;
  background: none;
  border: none;
  margin: 0.5rem 0 0;
  padding: 0.5rem 0;
  font-family: inherit;
  font-size: 1.4rem;
  color: var(--color-action-rest, #365A85);
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: var(--color-action-hover, #2A4D70);
  }

  &:focus-visible {
    outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
    outline-offset: 2px;
  }
}
</style>
