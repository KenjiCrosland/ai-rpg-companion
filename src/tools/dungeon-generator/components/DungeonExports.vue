<template>
  <div class="exports-section">
    <h3 class="exports-heading">Export Your Dungeon</h3>

    <div class="export-buttons">
      <cdr-button @click="copyAsPlainText" modifier="secondary">
        Copy as Plain Text
      </cdr-button>
      <cdr-button @click="copyAsHTML" modifier="secondary">
        Copy as HTML
      </cdr-button>
      <cdr-button @click="copyAsMarkdown" modifier="secondary">
        Copy as Homebrewery Markdown
      </cdr-button>
    </div>

    <cdr-accordion-group class="export-help">
      <cdr-accordion level="4" id="export-help-markdown" :opened="openAccordion === 'markdown'"
        @accordion-toggle="toggleAccordion('markdown')">
        <template #label>How to use with Homebrewery</template>
        <ol>
          <li>Click "Copy as Homebrewery Markdown" above.</li>
          <li>Visit <a href="https://homebrewery.naturalcrit.com/new" target="_blank"
              rel="noopener noreferrer">Homebrewery</a> and paste on the left side.</li>
          <li>Add your own page breaks and edit as needed — your dungeon renders as a beautiful D&D-styled PDF.</li>
        </ol>
      </cdr-accordion>

      <cdr-accordion level="4" id="export-help-html" :opened="openAccordion === 'html'"
        @accordion-toggle="toggleAccordion('html')">
        <template #label>How to use HTML format</template>
        <ol>
          <li>Click "Copy as HTML" above.</li>
          <li>Paste into any HTML editor, blog, or website.</li>
          <li>Style as needed with your own CSS.</li>
        </ol>
      </cdr-accordion>

      <cdr-accordion level="4" id="export-help-text" :opened="openAccordion === 'text'"
        @accordion-toggle="toggleAccordion('text')">
        <template #label>How to use Plain Text format</template>
        <ol>
          <li>Click "Copy as Plain Text" above.</li>
          <li>Paste into any text editor, notes app, or document.</li>
          <li>Great for sharing via Discord, forums, or email.</li>
        </ol>
      </cdr-accordion>
    </cdr-accordion-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CdrButton, CdrAccordion, CdrAccordionGroup } from '@rei/cedar';
import { dungeonToMarkdown } from '../util/dungeon-to-markdown.mjs';
import { dungeonToHTML } from '../util/dungeon-to-html.mjs';
import { dungeonToPlainText } from '../util/dungeon-to-plain-text.mjs';
import { useToast } from '@/composables/useToast';

const toast = useToast();

const props = defineProps({
  dungeon: {
    type: Object,
    required: true
  }
});

const openAccordion = ref(null);

const toggleAccordion = (id) => {
  openAccordion.value = openAccordion.value === id ? null : id;
};

const copyAsMarkdown = () => {
  navigator.clipboard.writeText(dungeonToMarkdown(props.dungeon))
    .then(() => toast.success('Copied as markdown — paste into Homebrewery to format.'))
    .catch(() => toast.error('Failed to copy content.'));
};

const copyAsHTML = () => {
  navigator.clipboard.writeText(dungeonToHTML(props.dungeon))
    .then(() => toast.success('Copied as HTML.'))
    .catch(() => toast.error('Failed to copy content.'));
};

const copyAsPlainText = () => {
  navigator.clipboard.writeText(dungeonToPlainText(props.dungeon))
    .then(() => toast.success('Copied as plain text.'))
    .catch(() => toast.error('Failed to copy content.'));
};
</script>

<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';

.exports-section {
  max-width: 900px;
  margin: 2rem 0;
  padding: 2rem;
  background-color: $cdr-color-background-secondary;
  border-radius: 8px;
}

.exports-heading {
  margin: 0 0 1.25rem;
  font-size: 1.6rem;
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

    li {
      margin-bottom: 0.25rem;
    }

    a {
      color: $cdr-color-text-brand;
    }
  }
}

@media screen and (max-width: 600px) {
  .export-buttons {
    flex-direction: column;

    button {
      width: 100%;
    }
  }

  .exports-section {
    padding: 1.5rem;
  }
}
</style>
