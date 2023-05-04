<template>
    <cdr-button size="small" @click="handleRequestNPCDescription()">{{ buttonText }}</cdr-button>
</template>
  
<script>
import { CdrButton } from '@rei/cedar';
import { requestNPCDescription } from "../util/request-npc-description.mjs";
import '@rei/cedar/dist/style/cdr-button.css';
export default {
    props: {
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
                (event, payload) => this.$emit(event, payload)
            );
        },
    },
};
</script>
  
<style scoped lang="scss"></style>
  