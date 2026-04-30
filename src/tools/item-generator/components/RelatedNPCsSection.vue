<template>
  <div class="related-npcs-section">
    <div class="related-npcs-header">
      <h3>Related NPCs</h3>
      <cdr-button
        v-if="hasStubs"
        size="small"
        modifier="secondary"
        :disabled="loading"
        @click="rescan"
      >
        {{ loading ? 'Scanning…' : 'Re-scan Lore' }}
      </cdr-button>
    </div>

    <p v-if="!hasStubs && !loading" class="related-npcs-empty">
      No related NPCs identified in this item's lore yet.
    </p>

    <cdr-button
      v-if="!hasStubs"
      size="small"
      modifier="secondary"
      :disabled="loading"
      @click="rescan"
    >
      {{ loading ? 'Searching…' : 'Find Related NPCs in Lore' }}
    </cdr-button>

    <p v-if="showLoreBuilderNudge" class="related-npcs-nudge">
      <a href="#" @click.prevent="$emit('switch-to-lore-builder')">Use the Lore Builder</a>
      for more NPC ideas, then click Re-scan Lore to see them here.
    </p>

    <ul v-if="hasStubs" class="related-npcs-list">
      <li
        v-for="(stub, idx) in visibleStubs"
        :key="`${stub.name}-${idx}`"
        class="related-npc-card"
      >
        <div class="related-npc-info">
          <strong class="related-npc-name">{{ stub.name }}</strong>
          <span v-if="stub.role_brief" class="related-npc-role">{{ stub.role_brief }}</span>
        </div>

        <div class="related-npc-actions">
          <cdr-button
            v-if="!stub.npc_id"
            size="small"
            modifier="secondary"
            @click="onCreate(stub)"
          >
            Create NPC
          </cdr-button>
          <cdr-button
            v-else
            size="small"
            modifier="secondary"
            @click="onView(stub)"
          >
            View in NPC Generator
          </cdr-button>
          <button
            type="button"
            class="related-npc-remove"
            @click="onRemove(idx)"
            :title="`Remove ${stub.name}`"
            :aria-label="`Remove ${stub.name}`"
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
import { CdrButton } from '@rei/cedar';
import { navigateToTool } from '@/util/navigation.mjs';
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

// Nudge to the Lore Builder when the user has few NPCs AND hasn't engaged
// with the timeline yet. Self-correcting: building any timeline events
// silences the nudge; clearing them brings it back.
const NUDGE_STUB_THRESHOLD = 2;
const showLoreBuilderNudge = computed(() => {
  if (stubs.value.length > NUDGE_STUB_THRESHOLD) return false;
  const events = props.item?.timelineEvents;
  return !Array.isArray(events) || events.length === 0;
});

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
.related-npcs-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
}

.related-npcs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  h3 {
    margin: 0;
  }
}

.related-npcs-empty {
  color: #666;
  margin: 0.5rem 0 1rem;
}

.related-npcs-nudge {
  color: #666;
  font-size: 1.05rem;
  margin: 0.75rem 0 0;

  a {
    color: #5a3e8a;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #3a2a5a;
    }
  }
}

.related-npcs-list {
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0;
}

.related-npc-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 1.1rem 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  margin-bottom: 0.75rem;
  background: #fafafa;
}

.related-npc-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
  flex: 1;
}

.related-npc-name {
  font-size: 1.65rem;
}

.related-npc-role {
  color: #555;
  font-size: 1.4rem;
}

.related-npc-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.related-npc-remove {
  background: none;
  border: none;
  padding: 0.4rem 0.7rem;
  font-size: 1.5rem;
  line-height: 1;
  color: #999;
  border-radius: 3px;
  cursor: pointer;
  transition: color 0.15s ease, background-color 0.15s ease;

  &:hover {
    color: #7a1f1f;
    background: rgba(122, 31, 31, 0.08);
  }

  &:focus-visible {
    outline: 2px solid #7a1f1f;
    outline-offset: 2px;
  }
}

.related-npcs-toggle {
  background: none;
  border: none;
  padding: 0.75rem 0;
  margin-top: 0.25rem;
  color: #5a3e8a;
  font-size: 1.4rem;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #3a2a5a;
  }

  &:focus-visible {
    outline: 2px solid #5a3e8a;
    outline-offset: 2px;
  }
}
</style>
