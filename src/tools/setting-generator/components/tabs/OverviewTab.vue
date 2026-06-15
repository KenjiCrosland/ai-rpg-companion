<template>
  <div class="setting-card parchment">
    <!-- View Mode -->
    <template v-if="!isEditing">
      <!-- Header: name + epithet + edit button -->
      <div class="setting-card-header">
        <div class="setting-card-header-text">
          <h2 class="setting-card-name">{{ displayName }}</h2>
          <p v-if="displayTitle" class="setting-card-epithet">{{ displayTitle }}</p>
          <p v-if="sourceInfo" class="setting-card-source">
            Inspired by
            <a v-if="!sourceMissing" href="#" class="setting-card-source-link" @click.prevent="navigateToSource">{{ sourceInfo.name }}</a>
            <span v-else>{{ sourceInfo.name }}</span>
            <span v-if="sourceMissing" class="setting-card-source-deleted"> (deleted)</span>
          </p>
        </div>
        <div class="setting-card-header-actions">
          <ParCardButton size="small" @click="startEditing">Edit Overview</ParCardButton>
        </div>
      </div>

      <!-- Content (lead + sections), AST-driven -->
      <div class="setting-card-content">
        <!-- Lead: read-aloud opener. Upright body weight; the burgundy
             left bar marks it as the opener, no italic, no hairlines. -->
        <div v-if="overviewAst.lead" class="setting-card-read-aloud">
          <p>
            <template v-for="(node, ni) in overviewAst.lead.children" :key="ni">
              <span v-if="node.type === 'entity'" class="par-entity">{{ node.value }}</span>
              <strong v-else-if="node.type === 'bold'">{{ node.value }}</strong>
              <em v-else-if="node.type === 'italic'">{{ node.value }}</em>
              <template v-else>{{ node.value }}</template>
            </template>
          </p>
        </div>

        <!-- Sections — every block (static lore and "right now" beat
             alike) is a plain paragraph at body weight. -->
        <section
          v-for="(section, si) in overviewAst.sections"
          :key="si"
          class="setting-card-section"
        >
          <h3 v-if="section.heading" class="setting-section-heading">
            {{ section.heading }}
          </h3>

          <p
            v-for="(block, bi) in section.blocks"
            :key="bi"
            class="setting-paragraph"
          >
            <template v-for="(node, ni) in block.children" :key="ni">
              <span v-if="node.type === 'entity'" class="par-entity">{{ node.value }}</span>
              <strong v-else-if="node.type === 'bold'">{{ node.value }}</strong>
              <em v-else-if="node.type === 'italic'">{{ node.value }}</em>
              <template v-else>{{ node.value }}</template>
            </template>
          </p>
        </section>
      </div>
    </template>

    <!-- Edit Mode -->
    <div v-else class="setting-edit">
      <header class="setting-edit__header">
        <h2 class="setting-edit__title">Edit Setting Overview</h2>
      </header>

      <ParCardInput
        v-model="editForm.name"
        label="Name"
        hint='The bare place name (e.g., "Hjallmark").'
        class="setting-edit__field"
      />

      <ParCardInput
        v-model="editForm.title"
        label="Subtitle"
        hint='A short evocative phrase that pairs with the name (e.g., "Village of the Drawn Blade").'
        class="setting-edit__field"
      />

      <ParCardTextarea
        v-model="editForm.content"
        label="Overview Content"
        :rows="18"
        hint="Plain prose. Use `## Heading` lines to mark sections and double line breaks between paragraphs. Use *italic* sparingly for foreign in-world terms."
        class="setting-edit__field"
      />

      <footer class="setting-edit__footer">
        <ParCardButton variant="danger" @click="cancelEdit">Cancel</ParCardButton>
        <ParCardButton @click="saveEdit">Save Changes</ParCardButton>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { ParCardButton, ParCardInput, ParCardTextarea } from '@/parchment';
import { combineSettingOverview } from '@/util/combineSettingOverview.mjs';
import {
  renderOverview,
  consolidateOverviewToMarkdown,
} from '@/util/renderSettingOverview.mjs';
import { navigateToTool } from '@/util/navigation.mjs';
import { sourceExists, getToolForSourceType } from '@/util/seeded-input.mjs';
import { renameSettingReferences } from '@/util/setting-storage.mjs';

const props = defineProps({
  setting: {
    type: Object,
    required: true,
  },
  premium: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['updated-setting']);

const isEditing = ref(false);
const editForm = ref({ name: '', title: '', content: '' });

const displayName = computed(() => {
  return props.setting.place_name
    || props.setting.setting_overview?.name
    || '';
});

const displayTitle = computed(() => props.setting.setting_overview?.title || '');

// Source provenance — populated by SettingGenerator.finalizePendingSeed
// after a cross-tool generation (e.g., from an item card's "Create
// Setting"). The denormalized fields let the header render an "Inspired
// by [Item]" line without walking tool-references on every render.
const sourceInfo = computed(() => {
  const type = props.setting?.sourceType;
  const id = props.setting?.sourceId;
  if (!type || !id) return null;
  const name = props.setting?.sourceName || id;
  return { type, id, name };
});

const sourceMissing = computed(() => {
  if (!sourceInfo.value) return false;
  return !sourceExists(sourceInfo.value.type, sourceInfo.value.id);
});

function navigateToSource() {
  const info = sourceInfo.value;
  if (!info || sourceMissing.value) return;
  const tool = getToolForSourceType(info.type);
  if (!tool) return;
  // For items the deep-link param is `item` (selects by name); future
  // source types can be added here when their flows ship.
  if (info.type === 'item') {
    navigateToTool(tool.id, { item: info.name });
  }
}

// Parsed AST. The renderer takes care of first-mention entity emphasis
// when the overview carries a `named_entities` array; legacy entries
// (combined_content prose, or older structured-field data without
// named_entities) flow through the same path and render as plain prose.
const overviewAst = computed(() => {
  return renderOverview(props.setting.setting_overview);
});

const startEditing = () => {
  const overview = props.setting.setting_overview;
  const content = overview?.combined_content
    || consolidateOverviewToMarkdown(overview)
    || combineSettingOverview(overview);

  editForm.value = {
    name: props.setting.place_name || overview?.name || '',
    title: overview?.title || '',
    content,
  };
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
};

const saveEdit = () => {
  // Detect rename so we can propagate the new name to every stub
  // that references this setting (Related Places on other settings,
  // Related Settings on items, tool-references edges, NPC source
  // provenance). Settings carry stable ids so the link survives a
  // rename — but stubs store the display name as a static field
  // rather than dereferencing the live entity, so without
  // propagation the user sees the old name in every list pointing
  // back at this setting.
  const oldName = props.setting.place_name || '';
  const newName = editForm.value.name || '';
  if (props.setting.id && newName && oldName !== newName) {
    renameSettingReferences(props.setting.id, newName);
  }

  emit('updated-setting', {
    ...props.setting,
    place_name: editForm.value.name,
    setting_overview: {
      ...props.setting.setting_overview,
      name: editForm.value.name,
      title: editForm.value.title,
      combined_content: editForm.value.content,
    },
  });
  isEditing.value = false;
};

watch(
  () => props.setting,
  (newSetting, oldSetting) => {
    if (newSetting !== oldSetting) {
      isEditing.value = false;
    }
  },
);
</script>

<style scoped>
/* Card container — 1.5px tan border on all four sides. The burgundy
   top ribbon was dropped because the active tab indicator above the
   card already carries the structural emphasis at the top edge. */
.setting-card {
  background: var(--par-color-surface, #fdfbf6);
  border: 1.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: 2px;
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  overflow: hidden;
  margin-bottom: 1.5rem;
  font-size: 17px;
  line-height: 1.75;
}

/* Header */
.setting-card-header {
  padding: 2rem 3rem 1.5rem;
  background: rgba(0, 0, 0, 0.03);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.setting-card-header-text {
  min-width: 0;
}

.setting-card-name {
  margin: 0 0 0.125rem;
  font-size: 2.8rem;
  font-weight: 500;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.02em;
  line-height: 1.15;
}

.setting-card-epithet {
  margin: 0;
  font-size: 1.4rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  font-weight: 400;
}

/* Cross-tool source line — "Inspired by [Item]". Same register as the
   NPCCard subtitle ("From [source]"): italic muted body, with the
   source name in upright burgundy that reads as a link. */
.setting-card-source {
  margin: 0.4rem 0 0;
  font-size: 1.2rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}

.setting-card-source-link {
  color: var(--par-color-title, #7a1f1f);
  text-decoration: underline;
  font-style: normal;
}

.setting-card-source-link:hover {
  color: var(--par-color-title-deep, #58180d);
  text-decoration: none;
}

.setting-card-source-deleted {
  color: var(--par-color-text-muted, #6b6b6b);
  font-style: italic;
  font-size: 0.95em;
}

.setting-card-header-actions {
  flex-shrink: 0;
}

/* Content wrapper centers prose at readable line length */
.setting-card-content {
  max-width: 65ch;
  margin-inline: auto;
  padding: 0 3rem 2.5rem;
}

/* Atmospheric opener. Italic muted prose, mirroring the item card's
   .item-card-description treatment — establishing-shot mood at a
   slightly looser rhythm than the body sections below. */
.setting-card-read-aloud {
  margin: 1.5rem 0 2rem;
}

.setting-card-read-aloud p {
  margin: 0;
  font-size: 1.75rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.65;
}

/* Sections — more rest between them than before. Labels stand alone
   without a hairline rule; the small-caps + burgundy treatment is
   distinctive enough. */
.setting-card-section {
  margin: 2.5rem 0 0;
}

.setting-card-section:first-of-type {
  margin-top: 1rem;
}

.setting-section-heading {
  margin: 0 0 14px;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

/* Paragraphs — every block (static lore and "right now" alike) renders
   at body weight as a plain paragraph. */
.setting-paragraph {
  margin: 0 0 0.75rem;
  font-size: 1.6rem;
  color: var(--par-color-text, #222);
  line-height: 3rem;
}

.setting-paragraph:last-child {
  margin-bottom: 0;
}

.setting-paragraph + .setting-paragraph {
  margin-top: 1em;
}

.setting-paragraph em,
.setting-card-read-aloud em {
  font-style: italic;
}

/* If the LLM ever emits `**bold**` despite the prompt asking it not
   to, match .par-entity treatment (weight 600, body-text color) so
   a stray marker doesn't compete with first-mention emphasis. */
.setting-paragraph strong,
.setting-card-read-aloud strong {
  font-weight: 600;
}

/* Named-entity first-mention emphasis. Weight 600 carries the
   anchor; color inherits from body text so the bold reads as
   emphasis without also fading. Since emphasis fires only on the
   FIRST mention, a single anchor per name doesn't accumulate into
   visual noise even at body color. */
.par-entity {
  font-weight: 600;
}

/* Edit form */
.setting-edit {
  padding: 0 3rem 2rem;
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.setting-edit__header {
  padding-top: 2rem;
}

.setting-edit__title {
  margin: 0;
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.85rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.02em;
}

.setting-edit__footer {
  margin-top: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--par-color-divider, #e2dccd);
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

@media (max-width: 600px) {
  .setting-card-header,
  .setting-card-content,
  .setting-edit {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .setting-card-header {
    flex-direction: column;
  }

  .setting-card-name {
    font-size: 2.2rem;
  }
}
</style>
