<template>
  <div v-if="!loading" class="exports-section parchment">
    <h3 class="exports-heading">Export Your Statblock</h3>

    <div class="export-buttons">
      <ParButton @click="copyAsMarkdown" variant="secondary">
        Copy as Markdown
      </ParButton>
      <ParButton @click="copyAsVTT" variant="secondary">
        Copy for Foundry VTT
      </ParButton>
      <ParButton @click="copyAsImprovedInitiative" variant="secondary">
        Copy for Improved Initiative
      </ParButton>
    </div>

    <div class="roll20-callout">
      <strong>Roll20 users:</strong> Export directly via the
      <a href="https://chromewebstore.google.com/detail/conjure-creature/oepoeaoeoaaedbgobaegpfamofhkbifo"
        target="_blank" rel="noopener noreferrer">Conjure Creature Chrome Extension</a>
      — your monsters sync automatically.
    </div>

    <ParAccordionGroup class="export-help">
      <ParAccordion variant="understated" :level="4" id="export-help-markdown" label="How to use with Homebrewery"
        :opened="openAccordion === 'markdown'" @accordion-toggle="toggleAccordion('markdown')">
        <ol class="export-help__steps">
          <li>Click "Copy as Markdown" above.</li>
          <li>Visit <a href="https://homebrewery.naturalcrit.com/new" target="_blank"
              rel="noopener noreferrer">Homebrewery</a>
            and paste on the left side.</li>
          <li>Edit as you like — your statblock renders as a beautiful D&D-styled PDF.</li>
        </ol>
      </ParAccordion>

      <ParAccordion variant="understated" :level="4" id="export-help-foundry" label="How to import into Foundry VTT"
        :opened="openAccordion === 'foundry'" @accordion-toggle="toggleAccordion('foundry')">
        <ol class="export-help__steps">
          <li>Click "Copy for Foundry VTT" above.</li>
          <li>Install the <a href="https://foundryvtt.com/packages/5e-statblock-importer" target="_blank"
              rel="noopener noreferrer">5e Statblock Importer</a> module in Foundry.</li>
          <li>Open the importer, paste, and import.</li>
        </ol>
      </ParAccordion>

      <ParAccordion variant="understated" :level="4" id="export-help-initiative" label="How to import into Improved Initiative"
        :opened="openAccordion === 'initiative'" @accordion-toggle="toggleAccordion('initiative')">
        <ol class="export-help__steps">
          <li>Click "Copy for Improved Initiative" above.</li>
          <li>Visit <a href="https://improvedinitiative.app/e/" target="_blank" rel="noopener noreferrer">Improved
              Initiative</a>.</li>
          <li>Click "Add New", choose "JSON" mode, paste, and save.</li>
        </ol>
      </ParAccordion>

      <ParAccordion variant="understated" :level="4" id="export-help-roll20" label="How to export to Roll20"
        :opened="openAccordion === 'roll20'" @accordion-toggle="toggleAccordion('roll20')">
        <ol class="export-help__steps">
          <li>Install the <a
              href="https://chromewebstore.google.com/detail/conjure-creature/oepoeaoeoaaedbgobaegpfamofhkbifo"
              target="_blank" rel="noopener noreferrer">Conjure Creature Chrome Extension</a>.</li>
          <li>Generate your monsters here — they sync automatically to the extension.</li>
          <li>Open a Roll20 NPC sheet, click the extension, select your monster, and export.</li>
        </ol>
      </ParAccordion>
    </ParAccordionGroup>
  </div>
</template>

<script setup>
import { ParButton, ParAccordion, ParAccordionGroup } from "@/parchment";
import { ref } from 'vue';
import { statblockToMarkdown } from '@/util/convertToMarkdown.mjs';
import { convertToImprovedInitiative } from '@/util/convertToImprovedInitiative.mjs';
import { convertToFoundryVTT } from '@/util/convertToFoundryVTT.mjs';
import { useToast } from '@/composables/useToast';

const toast = useToast();

const props = defineProps({
  monster: Object,
  columns: { type: String, default: 'two_columns' },
  loading: { type: Boolean, default: false }
});

const openAccordion = ref(null);

const toggleAccordion = (id) => {
  openAccordion.value = openAccordion.value === id ? null : id;
};

const copyAsMarkdown = () => {
  navigator.clipboard.writeText(statblockToMarkdown(props.monster, props.columns))
    .then(() => toast.success('Copied as markdown — paste into Homebrewery to format.'))
    .catch(() => toast.error('Failed to copy content.'));
};

const copyAsVTT = () => {
  navigator.clipboard.writeText(convertToFoundryVTT(props.monster))
    .then(() => toast.success('Copied for Foundry VTT.'))
    .catch(() => toast.error('Failed to copy content.'));
};

const copyAsImprovedInitiative = () => {
  navigator.clipboard.writeText(JSON.stringify(convertToImprovedInitiative(props.monster)))
    .then(() => toast.success('Copied for Improved Initiative.'))
    .catch(() => toast.error('Failed to copy content.'));
};
</script>

<style scoped lang="scss">
/* Parchment export panel — matches the shared ItemExportsSection register
   (serif, warm-tan surface, tokens, dark-lapis heading). */
.exports-section {
  max-width: 850px;
  margin: 2rem auto;
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

.roll20-callout {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.35rem;
  color: var(--par-color-text-secondary, #555);
  margin-bottom: 1.5rem;
  line-height: 1.6;

  a {
    color: var(--color-action-hover, #2A4D70);
    text-decoration: underline;
  }
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