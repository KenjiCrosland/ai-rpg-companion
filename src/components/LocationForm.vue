<template>
    <div>
        <form @submit.prevent="generateLocationDescription">
            <cdr-input id="typeOfPlace" v-model="typeOfPlace" background="secondary" label="Type of Location:" required />
            <cdr-button type="submit" :disabled="disabledButton">{{ buttonText }}</cdr-button>
        </form>
    </div>
</template>
  
<script>
import { generateGptResponse } from "../util/open-ai.mjs";
import { CdrInput, CdrButton } from "@rei/cedar";
import "@rei/cedar/dist/style/cdr-input.css";
import "@rei/cedar/dist/style/cdr-button.css";
import { createLocationPrompt } from "../util/prompts.mjs";

export default {
    data() {
        return {
            typeOfPlace: "",
        };
    },
    components: {
        CdrButton,
        CdrInput,
    },
    props: {
        disabledButton: {
            type: Boolean,
            default: false
        },
        buttonText: {
            type: String,
            default: 'Generate Description'
        },
    },
    methods: {
        updateInputValue(value) {
            this.typeOfPlace = value;
        },
        validateLocationDescription(jsonString) {
            try {
                const jsonObj = JSON.parse(jsonString);
                const keys = [
                'locationName',
                'locationDescription',
                'locationNPCs'
                ];
                return keys.every((key) => key in jsonObj);
            } catch (error) {
                return false;
            }
        },
        async generateLocationDescription() {
            this.$emit("set-loading-state", true);

            const prompt = createLocationPrompt(this.typeOfPlace);
            try {
                const response = await generateGptResponse(prompt, this.validateLocationDescription);
                this.$emit("location-description-generated", JSON.parse(response));
            } catch (error) {
                console.error("Error generating location description:", error);
                this.$emit("location-description-error", "Failed to generate location description. Please try again later.");
            }

            this.$emit("set-loading-state", false);
        },
    },
};
</script>
<style scoped lang="scss">
    button {
        margin-top: 2rem;
    }
</style>
  