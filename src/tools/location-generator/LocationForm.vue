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
import { generateGptResponse } from "@/util/ai-client.mjs";
import { PROVIDERS } from "@/util/ai-config.mjs";
import { CdrInput, CdrButton } from "@rei/cedar";
import "@rei/cedar/dist/style/cdr-input.css";
import "@rei/cedar/dist/style/cdr-button.css";
import { createLocationPrompt } from "./location-prompts.mjs";

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
                const requiredKeys = [
                    'locationName',
                    'sentence1_dimensions',
                    'sentence2_atmosphere',
                    'sentence3_unique_feature',
                    'sentence4_interaction',
                    'locationNPCs',
                    'subLocations'
                ];
                return requiredKeys.every((key) => key in jsonObj);
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
                const parentDescription = this.parentLocation.description ||
                    `${this.parentLocation.sentence1_dimensions || ''} ${this.parentLocation.sentence2_atmosphere || ''} ${this.parentLocation.sentence3_unique_feature || ''} ${this.parentLocation.sentence4_interaction || ''}`.trim();

                previousContext = [
                    { role: 'user', content: `${createLocationPrompt()}` },
                    { role: 'system', content: `${JSON.stringify({
                        locationName: this.parentLocation.name,
                        locationDescription: parentDescription,
                        locationNPCs: this.parentLocation.npcNames || this.parentLocation.locationNPCs,
                        subLocations: this.parentLocation.subLocations,
                    })}` }
                ];
                prompt = `Please describe ${this.typeOfPlace} which is a sublocation of the parent location. Return the same JSON structure as specified.`
            } else {
                prompt = createLocationPrompt(this.typeOfPlace);
            }

            try {
                // Single API call now returns complete JSON structure
                // Use OpenAI specifically for location generation
                const JSONResponse = await generateGptResponse(
                    prompt,
                    this.validateLocationDescription,
                    3,
                    previousContext,
                    null, // model (use default)
                    PROVIDERS.OPENAI // force OpenAI provider
                );
                const parsedResponse = JSON.parse(JSONResponse);

                // Build location description from structured sentences
                const locationDescription = `${parsedResponse.sentence1_dimensions} ${parsedResponse.sentence2_atmosphere} ${parsedResponse.sentence3_unique_feature} ${parsedResponse.sentence4_interaction}`;

                const returnObj = {
                    locationDescription,
                    ...parsedResponse
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
