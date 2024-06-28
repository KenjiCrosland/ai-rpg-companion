<template>
  <div class="exports">
    <div v-if="!loading" class="instructions">
      <h3>Use Homebrewery to Make a Beautiful PDF of Your Statblock!</h3>
      <cdr-list tag="ol" modifier="ordered">
        <li>Click the "Copy as Markdown" button below to copy the generated content in markdown format.</li>
        <li>Visit <a href="https://homebrewery.naturalcrit.com/new" target="_blank"
            rel="noopener noreferrer">Homebrewery</a>.</li>
        <li>Paste the copied markdown into the document on the left hand side. Feel free to edit or reorder the content
          as you like.</li>
        <li>Enjoy the beautifully formatted content!</li>
      </cdr-list>
      <div class="markdown-button">
        <cdr-button @click="copyAsMarkdown">Copy as Markdown</cdr-button>
      </div>
    </div>
    <div v-if="!loading" class="instructions">
      <h3>Export this Monster to Foundry VTT!</h3>
      <cdr-list tag="ol" modifier="ordered">
        <li>Click the "Copy as Foundry VTT text" button below to copy the generated content in a text block compatible
          with the Foundry VTT.</li>
        <li>Follow these <a href="https://foundryvtt.com/packages/5e-statblock-importer" target="_blank"
            rel="noopener noreferrer">Foundry VTT Import Instructions</a> to import to Foundry VTT.</li>
        <li>Have Fun!</li>
      </cdr-list>
      <div class="markdown-button">
        <cdr-button @click="copyAsVTT">Copy in Foundry VTT Text Format</cdr-button>
      </div>
    </div>
    <div v-if="!loading" class="instructions">
      <h3>Export this Monster to the Improved Initiative App</h3>
      <cdr-list tag="ol" modifier="ordered">
        <li>Click the "Copy as Improved Initiative JSON" button below to copy the generated content in JSON format
          compatible with the Improved Initiative App.</li>
        <li>Visit <a href="https://improvedinitiative.app/e/" target="_blank" rel="noopener noreferrer">The Improved
            Initiative App</a>.</li>
        <li>Click "Add New" at the bottom right left of the screen.</li>
        <li>Choose the "JSON" Editor mode and paste your copied JSON in the text area</li>
        <li>Save the monster and have fun!</li>
      </cdr-list>
      <div class="markdown-button">
        <cdr-button @click="copyAsImprovedInitiative">Copy as Improved Initiative JSON</cdr-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { CdrButton, CdrList } from "@rei/cedar";
import { statblockToMarkdown } from '../util/convertToMarkdown.mjs';
import { convertToImprovedInitiative } from '../util/convertToImprovedInitiative.mjs';
import { convertToFoundryVTT } from '../util/convertToFoundryVTT.mjs';

const props = defineProps({
  monster: {
    type: Object,
    default: () => ({})
  },
  columns: {
    type: String,
    default: 'two_columns'
  },
  loading: {
    type: Boolean,
    default: false,
  }
});

const copyAsMarkdown = () => {
  const markdownContent = statblockToMarkdown(props.monster, props.columns);
  navigator.clipboard.writeText(markdownContent).then(() => {
    alert('Content copied as markdown!');
  }, () => {
    alert('Failed to copy content.');
  });
};

const copyAsVTT = () => {
  const VTTContent = convertToFoundryVTT(props.monster);
  navigator.clipboard.writeText(VTTContent).then(() => {
    alert('Content copied in Foundry VTT Format!');
  }, () => {
    alert('Failed to copy content.');
  });
};

const copyAsImprovedInitiative = () => {
  const improvedInitiativeJSON = convertToImprovedInitiative(props.monster);
  navigator.clipboard.writeText(JSON.stringify(improvedInitiativeJSON)).then(() => {
    alert('Copied as Improved Initiative JSON!');
  }, () => {
    alert('Failed to copy content.');
  });
};
</script>

<style scoped lang="scss">
.exports {
  max-width: 850px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.instructions {
  padding: 3rem;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.markdown-button {
  display: flex;

  button {
    margin: 2rem auto 1rem;
  }
}

@media screen and (max-width: 855px) {
  .exports {
    grid-template-columns: 1fr;
  }

  .container {
    background-image: none;

    &.one_column {
      width: inherit;
    }
  }
}
</style>
