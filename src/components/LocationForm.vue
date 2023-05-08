<template>
    <div>
        <form v-if="!formContent" @submit.prevent="generateLocationDescription">
            <cdr-input id="typeOfPlace" v-model="typeOfPlace" background="secondary" :label="formLabel" required />
            <cdr-button class="location-form-button" type="submit" :disabled="disabledButton">{{ buttonText }}</cdr-button>
        </form>
        <cdr-button :size="buttonSize" v-else @click="generateLocationDescription" :disabled="disabledButton">
            {{ buttonText }}
        </cdr-button>
    </div>
</template>
  
<script>
import { startCase } from 'lodash';
import { generateGptResponse } from "../util/open-ai.mjs";
import { CdrInput, CdrButton } from "@rei/cedar";
import "@rei/cedar/dist/style/cdr-input.css";
import "@rei/cedar/dist/style/cdr-button.css";
import { createLocationPrompt, getLocationJSON } from "../util/prompts.mjs";

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
        buttonSize: {
            type: String,
            default: null,
        },
        formLabel: {
            type: String,
            default: 'Type of Location:'
        },
        parentLocation: {
            type: Object,
            default: null
        },
        formContent: {
            type: String,
            default: null,
        },
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
                    'locationNPCs',
                    'subLocations'
                ];
                return keys.every((key) => key in jsonObj);
            } catch (error) {
                return false;
            }
        },
        async generateLocationDescription() {
            this.$emit("set-loading-state", true);
            if (this.typeOfPlace === "" && this.formContent) {
                this.typeOfPlace = this.formContent;
            };
            this.typeOfPlace = startCase(this.typeOfPlace);

            let previousContext;
            let prompt;
            if (this.parentLocation) {
                const contextLocationObj = {
                    locationName: this.parentLocation.name,
                    locationDescription: this.parentLocation.description,
                    locationNPCs: this.parentLocation.npcNames,
                    subLocations: this.parentLocation.subLocations,
                };
                previousContext = [
                    { role: 'user', content: `${createLocationPrompt()}` },
                    { role: 'system', content: `${this.parentLocation.description}` }
                ];
                prompt = `Please describe ${this.typeOfPlace} which is a sublocation of the place described in the previous message. Return the exact same format.`
            } else {
                prompt = createLocationPrompt(this.typeOfPlace);
            }
             
            try {
                const response = await generateGptResponse(prompt, null, 3, previousContext);
                console.log(response);
                previousContext = [
                    { role: 'user', content: `Please create a description of a location in a tabletop RPG` },
                    { role: 'system', content: `${response}` }
                ];
                prompt = getLocationJSON();
                const JSONResponse = await generateGptResponse(prompt, this.validateLocationDescription, 3, previousContext);
                const returnObj = {
                    locationDescription: response,
                    ...JSON.parse(JSONResponse)
                };
                this.$emit("location-description-generated", returnObj);
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
.location-form-button {
    margin-top: 2rem;
}
</style>
  