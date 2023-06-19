<template>
  <div :class="hidden ? 'hidden' : ''">
    <form @submit.prevent="handleRequestNPCDescription()">
      <cdr-input id="typeOfNPC" v-model="typeOfNPC" background="secondary" :label="labelText" required />
      <cdr-button type="submit" :disabled="disabledButton">Generate NPC</cdr-button>
    </form>
  </div>
</template>

<script>
import { CdrInput, CdrButton } from '@rei/cedar';
import { requestNPCDescription } from "../util/request-npc-description.mjs";
import '@rei/cedar/dist/style/cdr-input.css';
import '@rei/cedar/dist/style/cdr-button.css';
export default {
  data() {
    return {
      typeOfNPC: this.inputValue || '',
      firstPartDescription: '',
    };
  },
  props: {
    sequentialLoading: {
      type: Boolean,
      default: false
    },
    disabledButton: {
      type: Boolean,
      default: false,
    },
    hidden: false,
    labelText: {
      type: String,
      default: 'Type of NPC:'
    },
    inputValue: String,
    extraDescription: Object,
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
      this.typeOfNPC = newVal;
    },
  },
  methods: {
    async handleRequestNPCDescription() {
      await requestNPCDescription(
        this.typeOfNPC,
        this.extraDescription,
        this.sequentialLoading,
        (event, payload) => this.$emit(event, payload)
      );
    },
  },
};
</script>

<style scoped lang="scss">
button {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.hidden {
  //display: none;
}
</style>