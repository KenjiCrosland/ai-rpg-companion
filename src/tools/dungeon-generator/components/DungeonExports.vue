<template>
  <div class="exports-section parchment">
    <h3 class="exports-heading">Export Your Dungeon</h3>

    <div class="export-buttons">
      <ParButton @click="copyAsPlainText" variant="secondary">
        Copy as Plain Text
      </ParButton>
      <ParButton @click="copyAsHTML" variant="secondary">
        Copy as HTML
      </ParButton>
      <ParButton @click="copyAsMarkdown" variant="secondary">
        Copy as Homebrewery Markdown
      </ParButton>
    </div>

    <ParAccordionGroup class="export-help">
      <ParAccordion variant="understated" :level="4" id="export-help-markdown" label="How to use with Homebrewery"
        :opened="openAccordion === 'markdown'" @accordion-toggle="toggleAccordion('markdown')">
        <ol class="export-help__steps">
          <li>Click "Copy as Homebrewery Markdown" above.</li>
          <li>Visit <a href="https://homebrewery.naturalcrit.com/new" target="_blank"
              rel="noopener noreferrer">Homebrewery</a> and paste on the left side.</li>
          <li>Add your own page breaks and edit as needed — your dungeon renders as a beautiful D&D-styled PDF.</li>
        </ol>
      </ParAccordion>

      <ParAccordion variant="understated" :level="4" id="export-help-html" label="How to use HTML format"
        :opened="openAccordion === 'html'" @accordion-toggle="toggleAccordion('html')">
        <ol class="export-help__steps">
          <li>Click "Copy as HTML" above.</li>
          <li>Paste into any HTML editor, blog, or website.</li>
          <li>Style as needed with your own CSS.</li>
        </ol>
      </ParAccordion>

      <ParAccordion variant="understated" :level="4" id="export-help-text" label="How to use Plain Text format"
        :opened="openAccordion === 'text'" @accordion-toggle="toggleAccordion('text')">
        <ol class="export-help__steps">
          <li>Click "Copy as Plain Text" above.</li>
          <li>Paste into any text editor, notes app, or document.</li>
          <li>Great for sharing via Discord, forums, or email.</li>
        </ol>
      </ParAccordion>
    </ParAccordionGroup>
  </div>
</template>

<script setup>
import { ParButton, ParAccordion, ParAccordionGroup } from "@/parchment";
import { ref } from 'vue';
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
/* Parchment export panel — matches StatblockExports / ItemExportsSection
   (serif, warm-tan surface, tokens, dark-lapis heading, understated help
   accordions). Inline hex fallbacks per the dungeon's entry-CSS divergence. */
.exports-section {
  max-width: 900px;
  margin: 2rem 0;
  padding: 2rem;
  background-color: var(--par-color-callout-bg, #f3ebda);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

.exports-heading {
  margin: 0 0 1.25rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--color-action-hover, #2A4D70); /* dark lapis */
}

.export-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.export-help__steps {
  margin: 0;
  padding-left: 1.5rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.4rem;
  line-height: 1.65;
  color: var(--par-color-text, #222);

  li {
    margin-bottom: 0.3rem;
  }

  a {
    color: var(--color-action-hover, #2A4D70);
    text-decoration: underline;
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
