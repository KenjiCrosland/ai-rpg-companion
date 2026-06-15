<template>
  <div v-if="!loading" class="operations-section">
    <!-- ---- Export ---- -->
    <section class="operations-group">
      <h4 class="operations-group-title">Export</h4>
      <div class="export-buttons">
        <ParButton @click="copyAsMarkdown" variant="secondary">
          Copy as Homebrewery Markdown
        </ParButton>
        <ParButton @click="copyAsHtml" variant="secondary">
          Copy as HTML
        </ParButton>
        <ParButton @click="copyAsPlainText" variant="secondary">
          Copy as Plain Text
        </ParButton>
      </div>

      <cdr-accordion-group class="export-help">
        <cdr-accordion level="4" id="export-help-setting-markdown" :opened="openAccordion === 'markdown'"
          @accordion-toggle="toggleAccordion('markdown')">
          <template #label>How to use with Homebrewery</template>
          <ol>
            <li>Click "Copy as Homebrewery Markdown" above.</li>
            <li>Visit <a href="https://homebrewery.naturalcrit.com/new" target="_blank"
                rel="noopener noreferrer">Homebrewery</a>
              and paste on the left side.</li>
            <li>Add page breaks where needed — your settings render as a styled D&amp;D-flavored PDF.</li>
          </ol>
        </cdr-accordion>
      </cdr-accordion-group>
    </section>

    <!-- ---- Delete (visually separated as the destructive action) ---- -->
    <section class="operations-group operations-group--danger">
      <h4 class="operations-group-title operations-group-title--danger">Delete this setting</h4>
      <p class="operations-group-note">
        Removes the current setting and detaches any sub-locations and stub references to it.
        This action can't be undone.
      </p>
      <div class="operations-danger-actions">
        <ParButton variant="secondary" @click="$emit('delete-setting')">
          Delete Setting
        </ParButton>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ParButton } from '@/parchment';
import { ref } from 'vue';
import { CdrAccordion, CdrAccordionGroup } from '@rei/cedar';
import { formatSettingAsMarkdown } from '@/util/formatSettingAsMarkdown.mjs';
import { formatSettingAsPlainText } from '@/util/formatSettingAsPlainText.mjs';
import { formatSettingAsHtml } from '@/util/formatSettingAsHTML.mjs';
import { useToast } from '@/composables/useToast.js';

const toast = useToast();

const props = defineProps({
  // The settings tree (root → children, etc.) — same shape the format
  // utilities consume. Passed in from SettingGenerator's
  // `settingsTree` computed.
  settingsTree: {
    type: Array,
    default: () => [],
  },
  // Hide the panel while the parent is still loading data; matches
  // StatblockExports' loading-gate behavior.
  loading: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['delete-setting']);

const openAccordion = ref(null);

function toggleAccordion(id) {
  openAccordion.value = openAccordion.value === id ? null : id;
}

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

<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';

/* Per-setting operations block sitting below the main content area.
   Groups Export (constructive) and Delete (destructive); the
   destructive section is set off with a hairline divider and
   burgundy-tinted heading so it doesn't read as just-another button
   row alongside Copy as Markdown.
     No max-width here — the block stretches to fill the main content
   container so it lines up flush with the Tabs above it. */
.operations-section {
  margin: 2rem 0;
  padding: 2rem;
  background-color: $cdr-color-background-secondary;
  border-radius: 8px;
}

.operations-group {
  margin-bottom: 1.5rem;

  &:last-child { margin-bottom: 0; }
}

.operations-group-title {
  margin: 0 0 0.75rem;
  font-size: 1.3rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: $cdr-color-text-secondary;
}

.export-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.export-help {
  ol {
    margin: 0.5rem 0 0.5rem 1.5rem;
    padding: 0;
    font-size: 1.3rem;
    line-height: 1.6;

    li { margin-bottom: 0.25rem; }
    a { color: $cdr-color-text-brand; }
  }
}

/* Destructive section: hairline divider above, burgundy-tinted
   heading, muted explanatory line so the user reads the consequence
   before reaching the button. */
.operations-group--danger {
  padding-top: 1.5rem;
  border-top: 1px solid $cdr-color-border-secondary;
}

.operations-group-title--danger {
  color: var(--par-color-title, #7a1f1f);
}

.operations-group-note {
  margin: 0 0 1rem;
  font-size: 1.3rem;
  line-height: 1.5;
  color: $cdr-color-text-secondary;
}

.operations-danger-actions {
  display: flex;
  gap: 0.75rem;
}

@media screen and (max-width: 600px) {
  .export-buttons,
  .operations-danger-actions {
    flex-direction: column;

    button { width: 100%; }
  }

  .operations-section {
    padding: 1.5rem;
  }
}
</style>
