<template>
  <div v-if="!loading" class="exports-section">
    <h3 class="exports-heading">Export Your Statblock</h3>

    <div class="export-buttons">
      <cdr-button @click="copyAsMarkdown" modifier="secondary">
        Copy as Markdown
      </cdr-button>
      <cdr-button @click="copyAsVTT" modifier="secondary">
        Copy for Foundry VTT
      </cdr-button>
      <cdr-button @click="copyAsImprovedInitiative" modifier="secondary">
        Copy for Improved Initiative
      </cdr-button>
    </div>

    <div class="roll20-callout">
      <strong>Roll20 users:</strong> Export directly via the
      <a href="https://chromewebstore.google.com/detail/conjure-creature/oepoeaoeoaaedbgobaegpfamofhkbifo"
        target="_blank" rel="noopener noreferrer">Conjure Creature Chrome Extension</a>
      — your monsters sync automatically.
    </div>

    <cdr-accordion-group class="export-help">
      <cdr-accordion level="4" id="export-help-markdown" :opened="openAccordion === 'markdown'"
        @accordion-toggle="toggleAccordion('markdown')">
        <template #label>How to use with Homebrewery</template>
        <ol>
          <li>Click "Copy as Markdown" above.</li>
          <li>Visit <a href="https://homebrewery.naturalcrit.com/new" target="_blank"
              rel="noopener noreferrer">Homebrewery</a>
            and paste on the left side.</li>
          <li>Edit as you like — your statblock renders as a beautiful D&D-styled PDF.</li>
        </ol>
      </cdr-accordion>

      <cdr-accordion level="4" id="export-help-foundry" :opened="openAccordion === 'foundry'"
        @accordion-toggle="toggleAccordion('foundry')">
        <template #label>How to import into Foundry VTT</template>
        <ol>
          <li>Click "Copy for Foundry VTT" above.</li>
          <li>Install the <a href="https://foundryvtt.com/packages/5e-statblock-importer" target="_blank"
              rel="noopener noreferrer">5e Statblock Importer</a> module in Foundry.</li>
          <li>Open the importer, paste, and import.</li>
        </ol>
      </cdr-accordion>

      <cdr-accordion level="4" id="export-help-initiative" :opened="openAccordion === 'initiative'"
        @accordion-toggle="toggleAccordion('initiative')">
        <template #label>How to import into Improved Initiative</template>
        <ol>
          <li>Click "Copy for Improved Initiative" above.</li>
          <li>Visit <a href="https://improvedinitiative.app/e/" target="_blank" rel="noopener noreferrer">Improved
              Initiative</a>.</li>
          <li>Click "Add New", choose "JSON" mode, paste, and save.</li>
        </ol>
      </cdr-accordion>

      <cdr-accordion level="4" id="export-help-roll20" :opened="openAccordion === 'roll20'"
        @accordion-toggle="toggleAccordion('roll20')">
        <template #label>How to export to Roll20</template>
        <ol>
          <li>Install the <a
              href="https://chromewebstore.google.com/detail/conjure-creature/oepoeaoeoaaedbgobaegpfamofhkbifo"
              target="_blank" rel="noopener noreferrer">Conjure Creature Chrome Extension</a>.</li>
          <li>Generate your monsters here — they sync automatically to the extension.</li>
          <li>Open a Roll20 NPC sheet, click the extension, select your monster, and export.</li>
        </ol>
      </cdr-accordion>
    </cdr-accordion-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CdrButton, CdrAccordion, CdrAccordionGroup } from "@rei/cedar";
import { statblockToMarkdown } from '../util/convertToMarkdown.mjs';
import { convertToImprovedInitiative } from '../util/convertToImprovedInitiative.mjs';
import { convertToFoundryVTT } from '../util/convertToFoundryVTT.mjs';
import { useToast } from '../composables/useToast';

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
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';

.exports-section {
  max-width: 850px;
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

.roll20-callout {
  font-size: 1.3rem;
  color: $cdr-color-text-secondary;
  margin-bottom: 1.5rem;
  line-height: 1.5;

  a {
    color: $cdr-color-text-brand;
  }
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