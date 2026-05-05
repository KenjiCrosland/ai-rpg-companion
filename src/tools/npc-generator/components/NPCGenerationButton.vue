<template>
    <ParActionButton size="small" :disabled="disabledButton" @click="handleRequestNPCDescription()">{{ buttonText }}</ParActionButton>
</template>

<script>
import { ParActionButton } from '@/parchment';
import { requestNPCDescription } from "../utils/request-npc-description.mjs";
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
        ParActionButton,
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
