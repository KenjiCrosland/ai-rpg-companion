<template>
  <div class="related-dungeons-section parchment">
    <!-- Header mirrors RelatedSettingsSection: title + ghost re-scan button.
         Tooltip explains when re-scan is useful so the affordance label
         can stay short ("Re-scan Lore"). -->
    <div class="related-dungeons-header">
      <h3 class="related-dungeons-title">Related Dungeons</h3>
      <ParTooltip
        text="Scans this item's lore and timeline events for named dungeon-shaped places (a barrow, tomb, vault, forge, lair) and adds them here. Re-run after editing the lore or adding events."
      >
        <button
          type="button"
          class="related-dungeons-rescan"
          :disabled="loading"
          @click="rescan"
        >
          {{ loading ? 'Scanning…' : 'Re-scan Lore' }}
        </button>
      </ParTooltip>
    </div>

    <!-- Empty state: no stubs found in lore (or the lore mentions no
         dungeon-shaped places). Offer the whole-item fallback — let the
         user create a dungeon seeded from the whole item, mode inferred
         by the dungeon generator on mount. -->
    <div v-if="!hasStubs" class="related-dungeons-empty">
      <p class="related-dungeons-empty-copy">
        No dungeon-shaped locations in this item's lore. Click Re-scan Lore above to look again, or
        <a
          href="#"
          class="related-dungeons-empty-link"
          @click.prevent="$emit('switch-to-lore-builder')"
        >use the Lore Builder</a>
        to add lore that names a tomb, vault, forge, lair, or similar bounded site.
      </p>

      <div class="related-dungeons-empty-actions">
        <ParButton variant="secondary" @click="onCreateFromWholeItem">
          Generate a Dungeon from this Item
        </ParButton>
      </div>
    </div>

    <!-- Stub list: one row per dungeon-shape stub. Each stub gets its
         own Create/View button — same pattern as RelatedSettingsSection.
         Mode (forgotten / revered / carried / trial) is inferred on the
         dungeon side from the item's full lore (not from the per-stub
         context, since the relationship-type signal is in the broader
         lore framing). -->
    <ul v-if="hasStubs" class="related-dungeons-list">
      <li
        v-for="(stub, idx) in visibleStubs"
        :key="`${stub.name}-${idx}`"
        class="related-dungeon-row"
      >
        <div class="related-dungeon-info">
          <strong class="related-dungeon-name">{{ displayNameFor(stub) }}</strong>
          <span v-if="stub.role_brief" class="related-dungeon-role">{{ stub.role_brief }}</span>
        </div>

        <div class="related-dungeon-actions">
          <ParButton
            v-if="!stub.dungeon_id"
            variant="secondary"
            size="small"
            @click="onCreate(stub)"
          >
            Create Dungeon
          </ParButton>
          <ParButton
            v-else
            variant="secondary"
            size="small"
            @click="onView(stub)"
          >
            View in Dungeon Generator
          </ParButton>
          <!--
            Only show the ✕ for UNPROMOTED stubs. Once a stub has a
            dungeon_id, clicking ✕ only severs the item's stored
            reference to the dungeon — the dungeon itself, its
            sourceType pointing back at this item, and the
            inspired_by_item edge in tool-references all survive.
            That's a half-broken cleanup that gives the user the
            impression they "deleted" something. To remove a promoted
            stub, users go to the destination tool and delete the
            actual entity (which cascades back here via the existing
            stub-reset path).
          -->
          <button
            v-if="!stub.dungeon_id"
            type="button"
            class="related-dungeon-remove"
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
      class="related-dungeons-toggle"
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
import { extractRelatedDungeons, mergeStubs } from '@/tools/item-generator/utils/extract-related-dungeons.mjs';
import { getDungeonDisplayName } from '@/util/dungeon-storage.mjs';
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

const stubs = computed(() => Array.isArray(props.item?.related_dungeons) ? props.item.related_dungeons : []);
const hasStubs = computed(() => stubs.value.length > 0);
const visibleStubs = computed(() =>
  stubs.value.length > COLLAPSE_THRESHOLD && !showAll.value
    ? stubs.value.slice(0, COLLAPSE_THRESHOLD)
    : stubs.value
);

// Display name resolves LIVE from dungeon storage when a stub has been
// promoted (`dungeon_id` is set). Matches the substrate's design
// principle: dungeons are identified by id, so a rename in
// `OverviewTab.saveEdit` propagates to every renderer that resolves
// through this function — no rename-fanout helper required, no stale
// stub names persisted across stores.
//
// Falls back to the stub's stored name when the dungeon is missing
// (deleted, or the stub hasn't been promoted yet).
function displayNameFor(stub) {
  if (stub?.dungeon_id) {
    const live = getDungeonDisplayName(stub.dungeon_id);
    if (live) return live;
  }
  return stub?.name || '';
}

async function rescan() {
  if (loading.value) return;
  loading.value = true;
  try {
    const fresh = await extractRelatedDungeons(props.item);
    const merged = mergeStubs(props.item.related_dungeons, fresh);
    emit('update:item', { ...props.item, related_dungeons: merged });
    if (fresh.length === 0 && (!props.item.related_dungeons || props.item.related_dungeons.length === 0)) {
      toast.info?.('No dungeon-shaped locations found in this item\'s lore.');
    } else {
      toast.success?.(`Found ${fresh.length} dungeon${fresh.length === 1 ? '' : 's'} in lore.`);
    }
  } catch (error) {
    console.error('Error extracting related dungeons:', error);
    toast.error?.('Failed to scan lore for dungeons.');
  } finally {
    loading.value = false;
  }
}

function onCreate(stub) {
  // Stub-based seed: pass `entityName` so the dungeon generator's
  // mount handler builds the per-stub prefill (via buildDungeonPrefillFromItem)
  // and links back to this specific stub on finalize.
  navigateToTool('dungeon-generator', {
    fromType: 'item',
    fromId: props.item.name,
    entityName: stub.name,
  });
}

function onCreateFromWholeItem() {
  // Whole-item fallback: no `entityName`. The dungeon generator's
  // mount handler runs the mode-inference on the whole item's lore
  // and generates a dungeon from scratch — the stub gets created on
  // the spot during the finalize hook (no back-link needed because
  // there was no stub to link from).
  navigateToTool('dungeon-generator', {
    fromType: 'item',
    fromId: props.item.name,
  });
}

function onView(stub) {
  if (!stub?.dungeon_id) return;
  navigateToTool('dungeon-generator', {
    dungeon: stub.dungeon_id,
  });
}

function onRemove(idx) {
  const next = stubs.value.slice();
  next.splice(idx, 1);
  emit('update:item', { ...props.item, related_dungeons: next });
}
</script>

<style scoped lang="scss">
/* ============================================
   Related Dungeons — same parchment surface
   as Related NPCs / Related Settings. Lives
   below Related Settings on the item card.
   Visual treatment intentionally identical so
   the three stub sections read as a coherent
   "related entities" trio under a single item.
   ============================================ */
.related-dungeons-section {
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--par-color-border-strong, #c9b99a);
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
}

.related-dungeons-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.related-dungeons-title {
  margin: 0;
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-action-hover, #2A4D70);
  letter-spacing: 0.02em;
  line-height: 1.3;
}

.related-dungeons-rescan {
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

/* Empty state: warm-tan contained surface so the copy + action read as
   "this section is currently empty, here's what to do" rather than text
   floating on the page. Parallel to a populated stub row's surface
   treatment. Heading + Re-scan stay outside, on the page register. */
.related-dungeons-empty {
  margin: 0.75rem 0 0;
  background: var(--par-color-callout-bg-light, #F8F2E3);
  border-radius: 0.8rem;
  padding: 1.25rem 1.5rem;
}

.related-dungeons-empty-copy {
  margin: 0;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.6;
}

.related-dungeons-empty-link {
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

.related-dungeons-empty-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.related-dungeons-list {
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.related-dungeon-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 0.95rem 1.25rem;
  background: var(--par-color-callout-bg-light, #F8F2E3);
  border: 1px solid var(--par-color-border-strong, #c9b99a);
  border-radius: 0.8rem;
}

.related-dungeon-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
  flex: 1;
}

.related-dungeon-name {
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--par-color-text, #222);
  line-height: 1.3;
}

.related-dungeon-role {
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.4rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.4;
}

.related-dungeon-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;
}

.related-dungeon-remove {
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

.related-dungeons-toggle {
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
