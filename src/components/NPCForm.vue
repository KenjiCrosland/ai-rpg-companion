<template>
  <div>
    <form @submit.prevent="combineResponses ? requestCombinedNPCDescription() : requestNPCDescription()">
      <cdr-input id="typeOfPlace" v-model="typeOfPlace" background="secondary" label="Type of NPC:" required />
      <cdr-button type="submit">Generate NPC</cdr-button>
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
      firstPartDescription: '',
    };
  },
  props: {
    labelText: String,
    inputValue: String,
    combineResponses: {
      type: Boolean,
      default: false,
    },
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
    async requestCombinedNPCDescription() {
      const npcDescription = {
        characterName: "",
        descriptionOfPosition: "",
        reasonForBeingThere: "",
        distinctiveFeatureOrMannerism: "",
        characterSecret: "",
        relationships: {},
        roleplaying_tips: "",
      };

      const handlePart = (part, receivedData) => {
        console.log(receivedData);
        Object.assign(npcDescription, receivedData);
        if (part === 1) {
          this.$emit("npc-description-part-received", receivedData);
        }
        if (part === 2) {
          this.$emit("npc-description-generated", npcDescription);
        }
        this.$emit("set-loading-state", { part, isLoading: false });
      };

      const handleError = (error) => {
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
          part1: (receivedData) => handlePart(1, receivedData),
          part2: (receivedData) => handlePart(2, receivedData),
          error1: (error) => handleError(error),
          error2: (error) => handleError(error),
        });
      } catch (error) {
        handleError(error);
      }
    },
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

<style scoped lang="scss">
    button {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
</style>