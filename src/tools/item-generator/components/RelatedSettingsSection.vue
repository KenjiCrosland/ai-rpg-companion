<template>
  <div class="related-settings-section">
    <!-- Header mirrors RelatedNPCsSection: title + ghost re-scan button.
         Tooltip explains when re-scan is useful so the affordance label
         can stay short ("Re-scan Lore"). -->
    <div class="related-settings-header">
      <h3 class="related-settings-title">Related Settings</h3>
      <ParTooltip
        text="Scans this item's lore and timeline events for named locations and adds them here. Re-run after editing the lore or adding events."
      >
        <ParCardButton
          variant="ghost"
          size="small"
          :disabled="loading"
          @click="rescan"
        >
          {{ loading ? 'Scanning…' : 'Re-scan Lore' }}
        </ParCardButton>
      </ParTooltip>
    </div>

    <!-- Empty state. Same two-audience framing as the NPC version:
         existing items pre-date the related_settings field; new items
         get scanned during generation. The Lore Builder fallback link
         opens the path to richer lore that names places. -->
    <p v-if="!hasStubs" class="related-settings-empty">
      No related settings yet. Click Re-scan Lore above to find named locations in this item's lore. If the lore doesn't mention any,
      <a
        href="#"
        class="related-settings-empty-link"
        @click.prevent="$emit('switch-to-lore-builder')"
      >use the Lore Builder</a>
      to add more lore content.
    </p>

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
          <ParCardButton
            v-if="!stub.setting_id"
            @click="onCreate(stub)"
          >
            Create Setting
          </ParCardButton>
          <ParCardButton
            v-else
            @click="onView(stub)"
          >
            View in Setting Generator
          </ParCardButton>
          <button
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
import { ParCardButton, ParTooltip } from '@/parchment';
import { navigateToTool } from '@/util/navigation.mjs';
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
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--par-color-divider, #e2dccd);
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
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.02em;
  line-height: 1.3;
}

.related-settings-empty {
  margin: 0.75rem 0 0;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  line-height: 1.6;
}

.related-settings-empty-link {
  color: var(--par-color-title, #7a1f1f);
  text-decoration: underline;
  cursor: pointer;
  font-style: normal;

  &:hover {
    color: var(--par-color-title-deep, #58180d);
  }

  &:focus-visible {
    outline: 2px solid var(--par-color-title, #7a1f1f);
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
  padding: 1.35rem 1.25rem;
  background: rgba(0, 0, 0, 0.025);
  border-radius: var(--par-radius-sm, 3px);
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
    color: var(--par-color-title, #7a1f1f);
    background: var(--par-color-action-hover, rgba(122, 31, 31, 0.06));
  }

  &:focus-visible {
    outline: 2px solid var(--par-color-title, #7a1f1f);
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
  color: var(--par-color-title, #7a1f1f);
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: var(--par-color-title-deep, #58180d);
  }

  &:focus-visible {
    outline: 2px solid var(--par-color-title, #7a1f1f);
    outline-offset: 2px;
  }
}
</style>
