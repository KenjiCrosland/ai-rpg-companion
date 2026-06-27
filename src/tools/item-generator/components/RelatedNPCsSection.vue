<template>
  <div class="related-npcs-section parchment">
    <!-- Header is the same in both states: heading on the left, ghost
         Re-scan button on the right. Ghost styling makes the button
         quieter than the per-stub action buttons (Create NPC / View),
         which is right because Re-scan is a convenience, not a CTA.
         Tooltip explains *when* to use it — the affordance label answers
         "what" but not "why I'd come back to this." -->
    <div class="related-npcs-header">
      <h3 class="related-npcs-title">Related NPCs</h3>
      <ParTooltip
        text="Scans this item's lore and timeline events for named characters and adds them here. Re-run after editing the lore or adding events."
      >
        <button
          type="button"
          class="related-npcs-rescan"
          :disabled="loading"
          @click="rescan"
        >
          {{ loading ? 'Scanning…' : 'Re-scan lore' }}
        </button>
      </ParTooltip>
    </div>

    <!-- Empty state copy serves two audiences:
         - Existing users (bulk after this release): items pre-date the
           related_npcs field, so the array is empty even though their
           lore likely already names characters. The primary action is
           "Re-scan lore" — points up at the button in the section header.
         - New users: the scan ran during item generation. If the array
           is empty, the lore genuinely had no named characters, and the
           Lore Builder is the path to richer lore that names someone.
         Lead with re-scan (helps the bulk case immediately); offer the
         Lore Builder as the conditional fallback for the new-user case. -->
    <div v-if="!hasStubs" class="related-npcs-empty">
      <p class="related-npcs-empty-copy">
        No related NPCs yet. Click Re-scan lore above to find named characters in this item's lore. If the lore doesn't mention any,
        <a
          href="#"
          class="related-npcs-empty-link"
          @click.prevent="$emit('switch-to-lore-builder')"
        >use the Lore Builder</a>
        to add more lore content.
      </p>
    </div>

    <!-- Populated state: list only. No helper text — once stubs exist,
         the user doesn't need an explanation of how to get more. -->
    <ul v-if="hasStubs" class="related-npcs-list">
      <li
        v-for="(stub, idx) in visibleStubs"
        :key="`${stub.name}-${idx}`"
        class="related-npc-row"
      >
        <div class="related-npc-info">
          <strong class="related-npc-name">{{ stub.name }}</strong>
          <span v-if="stub.role_brief" class="related-npc-role">{{ stub.role_brief }}</span>
        </div>

        <div class="related-npc-actions">
          <ParButton
            v-if="!stub.npc_id"
            variant="primary-outline"
            size="small"
            @click="onCreate(stub)"
          >
            Create NPC
          </ParButton>
          <ParButton
            v-else
            variant="primary-outline"
            size="small"
            @click="onView(stub)"
          >
            View in NPC Generator
          </ParButton>
          <!--
            Only show ✕ for UNPROMOTED stubs. See RelatedDungeonsSection
            for the rationale: removing a promoted stub from this list
            doesn't delete the NPC, doesn't clear its sourceType back-
            pointer, and doesn't drop the mentioned_in_item edge — it
            just half-breaks the relationship. Force users to the NPC
            Generator to do a real delete.
          -->
          <button
            v-if="!stub.npc_id"
            type="button"
            class="related-npc-remove"
            :title="`Remove ${stub.name}`"
            :aria-label="`Remove ${stub.name}`"
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
      class="related-npcs-toggle"
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
import { extractRelatedNPCs, mergeStubs } from '@/tools/item-generator/utils/extract-related-npcs.mjs';
import { useToast } from '@/composables/useToast';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:item', 'switch-to-lore-builder']);
const toast = useToast();
const loading = ref(false);

const COLLAPSE_THRESHOLD = 5;
const collapseThreshold = COLLAPSE_THRESHOLD;
const showAll = ref(false);

const stubs = computed(() => Array.isArray(props.item?.related_npcs) ? props.item.related_npcs : []);
const hasStubs = computed(() => stubs.value.length > 0);
const visibleStubs = computed(() =>
  stubs.value.length > COLLAPSE_THRESHOLD && !showAll.value
    ? stubs.value.slice(0, COLLAPSE_THRESHOLD)
    : stubs.value
);

async function rescan() {
  if (loading.value) return;
  loading.value = true;
  try {
    const fresh = await extractRelatedNPCs(props.item);
    const merged = mergeStubs(props.item.related_npcs, fresh);
    emit('update:item', { ...props.item, related_npcs: merged });
    if (fresh.length === 0 && (!props.item.related_npcs || props.item.related_npcs.length === 0)) {
      toast.info?.('No named NPCs found in this item\'s lore.');
    } else {
      toast.success?.(`Found ${fresh.length} NPC${fresh.length === 1 ? '' : 's'} in lore.`);
    }
  } catch (error) {
    console.error('Error extracting related NPCs:', error);
    toast.error?.('Failed to scan lore for NPCs.');
  } finally {
    loading.value = false;
  }
}

function onCreate(stub) {
  trackEvent('cross_tool_start', { from_tool: 'item-generator', to_tool: 'npc-generator' });
  navigateToTool('npc-generator', {
    fromType: 'item',
    fromId: props.item.name,
    entityName: stub.name,
  });
}

function onView(stub) {
  if (!stub?.npc_id) return;
  navigateToTool('npc-generator', {
    npc: stub.npc_id
  });
}

function onRemove(idx) {
  const next = stubs.value.slice();
  next.splice(idx, 1);
  emit('update:item', { ...props.item, related_npcs: next });
}
</script>

<style scoped lang="scss">
/* ============================================
   Related NPCs — content-side, sits on the
   same parchment surface as the item card. The
   section is part of the same visual document
   (sourcebook list under the item entry), not
   a chrome region grafted below.
   ============================================ */
.related-npcs-section {
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--par-color-border-strong, #c9b99a);
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
}

.related-npcs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

/* Heading: dark lapis. The Related sections are chrome (cross-tool
   navigation metadata), so they sit in the lapis register; burgundy is
   reserved for the artifact (item card) above. */
.related-npcs-title {
  margin: 0;
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-action-hover, #2A4D70);
  letter-spacing: 0.02em;
  line-height: 1.3;
}

/* Re-scan lore: lifted-lapis text link with a thin lapis underline —
   a tool action affordance, not a burgundy editorial cue. */
.related-npcs-rescan {
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

/* Empty state: the section's content when there are no stubs. Combines
   "we found nothing" with guidance toward the Lore Builder + Re-scan
   button. The copy sits in a warm-tan contained surface so it reads as
   a contained "section is empty" region rather than text floating on
   the page — parallel to a populated stub row. The italic treatment
   keeps the "supplementary text" register. Heading + Re-scan stay
   outside on the page register. */
.related-npcs-empty {
  margin: 0.75rem 0 0;
  background: var(--par-color-callout-bg-light, #F8F2E3);
  border-radius: 0.8rem;
  padding: 1.25rem 1.5rem;
}

.related-npcs-empty-copy {
  margin: 0;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.6;
}

.related-npcs-empty-link {
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

/* List: each stub gets a subtle warm fill that gives it visual mass on
   the parchment surface. The fill is what separates rows — no
   dividers, no hard borders. A small flex gap keeps adjacent fills
   from merging into one continuous block.

   The point: the stub feels like a discrete object the user can act on,
   without grafting a card-within-a-card onto the document. Mass and
   rhythm, not chrome. */
.related-npcs-list {
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.related-npc-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 0.95rem 1.25rem;
  /* Deeper warm tint with a 1px tan border — reads as contained content
     metadata, a step toward callout territory without being a full
     editorial callout. */
  background: var(--par-color-callout-bg-light, #F8F2E3);
  border: 1px solid var(--par-color-border-strong, #c9b99a);
  border-radius: 0.8rem;
}

.related-npc-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
  flex: 1;
}

/* Body color, not burgundy. Burgundy is reserved for the section heading
   and the action buttons — those are the moments of emphasis. NPC names
   are content, read as standard body. */
.related-npc-name {
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--par-color-text, #222);
  line-height: 1.3;
}

.related-npc-role {
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.4rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.4;
}

.related-npc-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;
}

/* Remove (✕): muted palette so it recedes; primary action button (Create
   NPC / View in NPC Generator) carries the visual weight. Click target
   stays generous for accessibility. */
.related-npc-remove {
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

/* Show all / Show fewer: lapis text link (chrome action). */
.related-npcs-toggle {
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
