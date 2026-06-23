<template>
  <div v-if="!loading" class="setting-ops parchment">
    <!-- Footer actions: Export toggles the panel below; Delete is the
         trailing destructive action (mirrors the Item Generator). -->
    <div class="setting-ops__actions">
      <ParCardButton @click="showExport = !showExport">
        {{ showExport ? 'Hide export' : 'Export' }}
      </ParCardButton>
      <ParCardButton variant="danger" class="setting-ops__delete" @click="$emit('delete-setting')">
        Delete setting
      </ParCardButton>
    </div>

    <!-- Shared export panel — same component/look as the item, lore, and
         quest-hook exports. -->
    <ItemExportsSection v-if="showExport" heading="Export Setting">
      <template #description>
        Export this setting and its sub-locations. The markdown format works perfectly with
        <a href="https://homebrewery.naturalcrit.com" target="_blank" rel="noopener">Homebrewery</a>
        for beautifully formatted D&amp;D handouts.
      </template>
      <template #buttons>
        <ParButton variant="secondary" @click="copyAsMarkdown">Copy as Markdown</ParButton>
        <ParButton variant="secondary" @click="copyAsHtml">Copy as HTML</ParButton>
        <ParButton variant="secondary" @click="copyAsPlainText">Copy as Plain Text</ParButton>
      </template>
      <template #tip>
        <strong>Quick tip:</strong> After copying as markdown, visit
        <a href="https://homebrewery.naturalcrit.com/new" target="_blank" rel="noopener">homebrewery.naturalcrit.com</a>,
        paste your content on the left side, and watch it transform into a beautiful D&amp;D-styled document!
      </template>
    </ItemExportsSection>
  </div>
</template>

<script setup>
import { ParButton, ParCardButton } from '@/parchment';
import { ref } from 'vue';
import ItemExportsSection from '@/tools/item-generator/components/ItemExportsSection.vue';
import { formatSettingAsMarkdown } from '@/util/formatSettingAsMarkdown.mjs';
import { formatSettingAsPlainText } from '@/util/formatSettingAsPlainText.mjs';
import { formatSettingAsHtml } from '@/util/formatSettingAsHTML.mjs';
import { useToast } from '@/composables/useToast.js';

const toast = useToast();

const props = defineProps({
  // The settings tree (root → children, etc.) — same shape the format
  // utilities consume. Passed in from SettingGenerator's `settingsTree`.
  settingsTree: {
    type: Array,
    default: () => [],
  },
  // Hide the panel while the parent is still loading data.
  loading: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['delete-setting']);

const showExport = ref(false);

function copyAsMarkdown() {
  navigator.clipboard.writeText(formatSettingAsMarkdown(props.settingsTree))
    .then(() => toast.success('Copied as markdown — paste into Homebrewery to format.'))
    .catch(() => toast.error('Failed to copy content.'));
}

function copyAsHtml() {
  navigator.clipboard.writeText(formatSettingAsHtml(props.settingsTree))
    .then(() => toast.success('Copied as HTML.'))
    .catch(() => toast.error('Failed to copy content.'));
}

function copyAsPlainText() {
  navigator.clipboard.writeText(formatSettingAsPlainText(props.settingsTree))
    .then(() => toast.success('Copied as plain text.'))
    .catch(() => toast.error('Failed to copy content.'));
}
</script>

<style scoped>
.setting-ops {
  margin: 2rem 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

/* Footer action row — Export + Delete centered. Centered (not Delete-trailing)
   so the buttons don't shift when the export panel toggles and widens the block. */
.setting-ops__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
}

@media (max-width: 600px) {
  .setting-ops__actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
