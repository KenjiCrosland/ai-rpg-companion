<template>
  <div :class="hidden ? 'hidden' : ''">
    <form @submit.prevent="handleRequestNPCDescription()">
      <cdr-input id="typeOfNPC" v-model="typeOfNPC" background="secondary" :label="labelText" required />
      <ParActionButton type="submit" :disabled="disabledButton">Generate NPC</ParActionButton>
    </form>
  </div>
</template>

<script>
import { CdrInput } from '@rei/cedar';
import { ParActionButton } from '@/parchment';
import { requestNPCDescription } from "../utils/request-npc-description.mjs";
import '@rei/cedar/dist/style/cdr-input.css';
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
    CdrInput,
    ParActionButton,
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
</style>
