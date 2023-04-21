<template>
  <div>
    <form @submit.prevent="requestNPCDescription">
      <cdr-input id="typeOfPlace" v-model="typeOfPlace" background="secondary" label="Type of Location:" required />
      <cdr-button type="submit" class="generate-button">Generate Description</cdr-button>
    </form>
  </div>
</template>

<script>
import { generateNPCDescription } from '../util/npc-generator.mjs';
import { CdrInput, CdrButton } from '@rei/cedar';
import '@rei/cedar/dist/style/cdr-input.css';
import '@rei/cedar/dist/style/cdr-button.css';
export default {
  data() {
    return {
      typeOfPlace: '',
    };
  },
  props: {
    labelText: String,
    inputValue: String,
  },
  components: {
    CdrButton,
    CdrInput
  },
  watch: {
    inputValue(newVal) {
      this.typeOfPlace = newVal;
    },
  },
  methods: {
    async requestNPCDescription() {
      const handlePart = (part, npcDescription) => {
        this.$emit("npc-description-generated", {
          part,
          npcDescription,
        });
        this.$emit("set-loading-state", { part, isLoading: false });
      };

      const handleError = error => {
        console.error("Error generating NPC description:", error);
        const errorMessage = "Failed to generate full description. Please try again later.";
        this.$emit("npc-description-error", errorMessage);
        this.$emit("set-loading-state", { part: 1, isLoading: false });
        this.$emit("set-loading-state", { part: 2, isLoading: false });
      };

      // Set loading state for both parts
      this.$emit("set-loading-state", { part: 1, isLoading: true });
      this.$emit("set-loading-state", { part: 2, isLoading: true });

      try {
        await generateNPCDescription(this.typeOfPlace, {
          part1: npcDescription => handlePart(1, npcDescription),
          part2: npcDescription => handlePart(2, npcDescription),
          error1: error => handleError(error),
          error2: error => handleError(error),
        });
      } catch (error) {
        handleError(error);
      }
    },
  },
};
</script>
