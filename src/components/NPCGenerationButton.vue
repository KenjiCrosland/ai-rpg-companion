<template>
    <cdr-button size="small" :disabled="disabledButton" @click="handleRequestNPCDescription()">{{ buttonText }}</cdr-button>
</template>
  
<script>
import { CdrButton } from '@rei/cedar';
import { requestNPCDescription } from "../util/request-npc-description.mjs";
import '@rei/cedar/dist/style/cdr-button.css';
export default {
    props: {
        sequentialLoading: {
            type: Boolean,
            default: false
        },
        disabledButton: {
            type: Boolean,
            default: false,
        },
        typeOfNPC: String,
        extraDescription: Object,
        buttonText: {
            type: String,
            default: 'Generate NPC',
        },
    },
    components: {
        CdrButton,
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
  
<style scoped lang="scss"></style>
  