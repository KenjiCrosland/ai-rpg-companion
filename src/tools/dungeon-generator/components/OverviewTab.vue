<template>
  <div>
    <DungeonOverviewCardSkeleton v-if="props.isLoading" />
    <div v-if="!props.isLoading && dungeonStore.currentDungeon?.dungeonOverview" class="dungeon-card parchment">
      <!-- View Mode -->
      <template v-if="!isEditing">
        <!-- Header: name + epithet + edit button -->
        <div class="dungeon-card-header">
          <div class="dungeon-card-header-text">
            <h2 class="dungeon-card-name">{{ displayName }}</h2>
            <p v-if="displayEpithet" class="dungeon-card-epithet">{{ displayEpithet }}</p>
            <p v-if="sourceInfo" class="dungeon-card-source">
              Inspired by
              <a v-if="!sourceMissing" href="#" class="dungeon-card-source-link" @click.prevent="navigateToSource">{{ sourceInfo.name }}</a>
              <span v-else>{{ sourceInfo.name }}</span>
              <span v-if="sourceMissing" class="dungeon-card-source-deleted"> (deleted)</span>
            </p>
          </div>
          <div class="dungeon-card-header-actions">
            <ParCardButton size="small" @click="startEditing">Edit overview</ParCardButton>
          </div>
        </div>

        <!-- Content (lead + sections), AST-driven -->
        <div class="dungeon-card-content">
          <!-- Lead: atmospheric opener. Italic, slightly looser; mirrors
               the setting card's read-aloud treatment. -->
          <div v-if="overviewAst.lead" class="dungeon-card-read-aloud">
            <p>
              <DungeonInline :children="overviewAst.lead.children" />
            </p>
          </div>

          <!-- Sections — uppercase small-caps burgundy heading + body
               paragraphs. Matches the setting card's section register. -->
          <section
            v-for="(section, si) in overviewAst.sections"
            :key="si"
            class="dungeon-card-section"
          >
            <h3 v-if="section.heading" class="dungeon-section-heading">
              {{ section.heading }}
            </h3>
            <p
              v-for="(block, bi) in section.blocks"
              :key="bi"
              class="dungeon-paragraph"
            >
              <DungeonInline :children="block.children" />
            </p>
          </section>
        </div>
      </template>

      <!-- Edit Mode -->
      <div v-else class="dungeon-edit">
        <header class="dungeon-edit__header">
          <h2 class="dungeon-edit__title">Edit dungeon overview</h2>
        </header>

        <ParCardInput
          v-model="editForm.name"
          label="Name"
          hint='The bare dungeon name (e.g., "Eikheim Barrow").'
          class="dungeon-edit__field"
        />

        <ParCardInput
          v-model="editForm.title"
          label="Subtitle"
          hint='A short evocative phrase that pairs with the name (e.g., "Tomb of the Singing Bones").'
          class="dungeon-edit__field"
        />

        <ParCardTextarea
          v-model="editForm.content"
          label="Overview Content"
          :rows="18"
          hint="Plain prose. Use `## Heading` lines to mark sections and double line breaks between paragraphs. Use *italic* sparingly for foreign in-world terms."
          class="dungeon-edit__field"
        />

        <footer class="dungeon-edit__footer">
          <ParCardButton variant="muted" @click="cancelEdit">Cancel</ParCardButton>
          <ParCardButton @click="saveEdit">Save changes</ParCardButton>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ParCardButton, ParCardInput, ParCardTextarea } from '@/parchment';
import { ref, computed, h } from 'vue';
import { useDungeonStore } from '../stores/dungeon-store.mjs';
import DungeonOverviewCardSkeleton from './skeletons/DungeonOverviewCardSkeleton.vue';
import { renderOverview, consolidateOverviewToMarkdown } from '../util/renderDungeonOverview.mjs';
import { combineDungeonOverview } from '../util/combineDungeonOverview.mjs';
import { sourceExists } from '@/util/seeded-input.mjs';
import { navigateToTool } from '@/util/navigation.mjs';

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
});

const dungeonStore = useDungeonStore();

// Inline render-function component for the AST's inline-node arrays.
// Mirrors the setting OverviewTab's inline rendering: each node type
// maps to a different wrapper.
const DungeonInline = {
  name: 'DungeonInline',
  props: {
    children: { type: Array, default: () => [] },
  },
  setup(p) {
    return () => p.children.map((node, i) => {
      if (!node) return null;
      switch (node.type) {
        case 'entity':
          return h('span', { key: i, class: 'par-entity' }, node.value || '');
        case 'bold':
          return h('strong', { key: i }, node.value || '');
        case 'italic':
          return h('em', { key: i }, node.value || '');
        case 'text':
        default:
          return node.value || '';
      }
    });
  },
};

// Header name + epithet. New-shape dungeons have `name` as the proper
// noun ("Eikheim Barrow") and `title` as the subtitle phrase
// ("Tomb of the Singing Bones"). Legacy dungeons emitted `title` as
// the descriptive phrase that included the name ("The Haunted Ruins
// of Blackwood"); for those, name may be the bare slug ("Blackwood").
// Either shape renders sensibly: name leads as the h2, title (if
// present and distinct) renders as the italic epithet below.
const displayName = computed(() => {
  const ov = dungeonStore.currentDungeon?.dungeonOverview;
  if (!ov) return '';
  return ov.name || ov.title || 'Unnamed Dungeon';
});

const displayEpithet = computed(() => {
  const ov = dungeonStore.currentDungeon?.dungeonOverview;
  if (!ov) return '';
  const name = ov.name || '';
  const title = ov.title || '';
  if (!title) return '';
  if (title === name) return ''; // avoid duplicating the name as epithet
  return title;
});

// Source provenance — populated by overview-store's post-finalize hook
// when this dungeon was generated from a cross-tool seed (currently
// item only). Mirrors SettingGenerator.OverviewTab's sourceInfo pattern.
// The denormalized sourceType/sourceId/sourceName/seedMode fields let
// the header render "Inspired by [item]" + the seed mode badge without
// walking tool-references.
const sourceInfo = computed(() => {
  const d = dungeonStore.currentDungeon;
  if (!d?.sourceType || !d?.sourceId) return null;
  return {
    type: d.sourceType,
    id: d.sourceId,
    name: d.sourceName || d.sourceId,
  };
});

const sourceMissing = computed(() => {
  if (!sourceInfo.value) return false;
  return !sourceExists(sourceInfo.value.type, sourceInfo.value.id);
});

function navigateToSource() {
  const info = sourceInfo.value;
  if (!info || sourceMissing.value) return;
  if (info.type === 'item') {
    navigateToTool('item-generator', { item: info.name });
  }
}

// AST. renderOverview handles both new and legacy shapes via marker-
// field detection and applies first-mention entity emphasis.
const overviewAst = computed(() =>
  renderOverview(dungeonStore.currentDungeon?.dungeonOverview)
);

// Edit mode.
const isEditing = ref(false);
const editForm = ref({
  name: '',
  title: '',
  content: '',
});

const startEditing = () => {
  const overview = dungeonStore.currentDungeon?.dungeonOverview;
  // Pre-fill content: combined_content wins (user has edited before);
  // else consolidate structured fields to markdown with `## Section`
  // headings; else (sparse data) flatten via combineDungeonOverview.
  const content = overview?.combined_content
    || consolidateOverviewToMarkdown(overview)
    || combineDungeonOverview(overview);

  editForm.value = {
    name: overview?.name || '',
    title: overview?.title || '',
    content,
  };
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
};

const saveEdit = () => {
  if (dungeonStore.currentDungeon?.dungeonOverview) {
    dungeonStore.currentDungeon.dungeonOverview.name = editForm.value.name;
    dungeonStore.currentDungeon.dungeonOverview.title = editForm.value.title;
    dungeonStore.currentDungeon.dungeonOverview.combined_content = editForm.value.content;
  }
  dungeonStore.saveDungeons();
  isEditing.value = false;
};
</script>

<style scoped>
/* Card container — parchment surface, warm-tan border. Mirrors
   .setting-card so the two tools' overview cards read as visual
   siblings. */
.dungeon-card {
  background: var(--par-color-surface, #FBF7F0);
  border: 1px solid var(--par-color-border, #e8e2d4);
  border-radius: 2px;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  overflow: hidden;
  margin-bottom: 1.5rem;
  font-size: 17px;
  line-height: 1.75;
}

/* Header — slight darker tint over the card surface, name + epithet
   + Edit action. */
.dungeon-card-header {
  padding: 2rem 3rem 1.5rem;
  background: rgba(0, 0, 0, 0.03);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.dungeon-card-header-text {
  min-width: 0;
}

.dungeon-card-name {
  margin: 0 0 0.125rem;
  font-size: 2.8rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.02em;
  line-height: 1.15;
}

.dungeon-card-epithet {
  margin: 0;
  font-size: 1.4rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  font-weight: 400;
}

/* Cross-tool source line — "Inspired by [Item] · mode: forgotten".
   Same register as the setting OverviewTab's source line; sits below
   the epithet, above the burgundy hairline that separates header from
   content. Hairline color and weight intentionally muted so the source
   attribution doesn't compete with the dungeon's name + epithet. */
.dungeon-card-source {
  margin: 0.4rem 0 0;
  font-size: 1.3rem;
  color: var(--par-color-text-muted, #6b6b6b);
  font-style: normal;
}

.dungeon-card-source-link {
  color: var(--par-color-title, #7a1f1f);
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: var(--par-color-title-deep, #58180d);
  }

  &:focus-visible {
    outline: 2px solid var(--par-color-title, #7a1f1f);
    outline-offset: 2px;
  }
}

.dungeon-card-source-deleted {
  color: var(--par-color-text-muted, #6b6b6b);
  font-style: italic;
}

.dungeon-card-header-actions {
  flex-shrink: 0;
}

/* Content — readable line length, centered. */
.dungeon-card-content {
  max-width: 75ch;
  margin-inline: auto;
  padding: 0 3rem 2.5rem;
}

/* Atmospheric opener: italic, looser rhythm. */
.dungeon-card-read-aloud {
  margin: 1.5rem 0 2rem;
}

.dungeon-card-read-aloud p {
  margin: 0;
  font-size: 1.75rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.65;
}

/* Sections — uppercase small-caps burgundy heading, plenty of rest
   between sections. */
.dungeon-card-section {
  margin: 2.5rem 0 0;
}

.dungeon-card-section:first-of-type {
  margin-top: 1rem;
}

.dungeon-section-heading {
  margin: 0 0 14px;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

/* Paragraphs — body weight, generous line-height. */
.dungeon-paragraph {
  margin: 0 0 0.75rem;
  font-size: 1.6rem;
  color: var(--par-color-text, #222);
  line-height: 3rem;
}

.dungeon-paragraph:last-child {
  margin-bottom: 0;
}

.dungeon-paragraph + .dungeon-paragraph {
  margin-top: 1em;
}

.dungeon-paragraph em,
.dungeon-card-read-aloud em {
  font-style: italic;
}

/* Stray `**bold**` markers (if the LLM ignores the prompt directive)
   get matched to entity-emphasis weight so they don't compete with
   first-mention entity bolding. */
.dungeon-paragraph strong,
.dungeon-card-read-aloud strong {
  font-weight: 600;
}

/* Named-entity first-mention emphasis. Weight 600, body color — the
   anchor without fading. Wrapped in `:deep()` because the entity span
   is rendered by DungeonInline (a separate inline render-function
   component), so its DOM nodes don't inherit this file's scoped
   `data-v-*` attribute. A bare `.par-entity` rule (or a plain
   descendant selector) would still get a `[data-v-*]` appended by
   Vue's scoped compiler and silently fail to match the span. `:deep()`
   strips the scope attribute from the inner selector while leaving
   the outer scope intact, which is exactly what we want. */
:deep(.par-entity) {
  font-weight: 600;
}

/* Below-content destructive action — hairline separator + right-
   aligned button. */
/* Edit form — same register as setting's edit panel. */
.dungeon-edit {
  padding: 0 3rem 2rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.dungeon-edit__header {
  padding-top: 2rem;
}

.dungeon-edit__title {
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.85rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.02em;
}

.dungeon-edit__footer {
  margin-top: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--par-color-divider, #e2dccd);
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

@media (max-width: 600px) {
  .dungeon-card-header,
  .dungeon-card-content,
  .dungeon-edit {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .dungeon-card-header {
    flex-direction: column;
  }

  .dungeon-card-name {
    font-size: 2.2rem;
  }
}
</style>
