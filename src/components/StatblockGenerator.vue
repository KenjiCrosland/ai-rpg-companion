<template>
    <div class="generator-container">
        <div class="intro-container">
            <h1>D&D 5e Monster Statblock Generator -- Free Version</h1>
            <p>
                Welcome to the D&D 5e Statblock
                Generator! This free version has a limit of 5 statblocks per day.
                Enter the name of the monster and choose a monster type and CR.
                Monster types determine whether a monster is stronger on defense, offense or balanced. CR will determine
                how
                strong a monster is, with higher CRs making for stronger monsters. Finally, if you wish the creature to
                be
                able to cast spells, please use select the “Creature is a spellcaster” checkbox. When the ChatGPT API is
                slow it can take up to two minutes to generate a creature. Once generated, you can export a creature to
                homebrewery, foundry VTT or the Improved Initiative app.
            </p>

            <p><cdr-link href="https://cros.land/ai-powered-dnd-5e-monster-statblock-generator-premium/">Link to
                    Statblock Generator -- Premium Version</cdr-link></p>
        </div>
        <form @submit.prevent="generateStatblock" class="monster-form">
            <div class="form-row-top">
                <cdr-input id="monsterName" v-model="monsterName" background="secondary"
                    :label="'Monster Name (Example: Headless Horseman)'" required />
                <cdr-select v-model="monsterType" label="type"
                    :options="['Random', 'Stronger Defense', 'Balanced', 'Stronger Offense']" required />
                <cdr-select v-model="selectedChallengeRating" label="CR" prompt="CR"
                    :options="challengeRatingData.fullArray" required />
            </div>
            <div class="form-row-mid">
                <cdr-input v-model="monsterDescription" :optional="true"
                    label='Monster Description / Special Instructions: Input extra details about the monster or any special instructions. Examples: "output the statblock in German", "this creature has a flying speed of 60ft", "this creature has an ability to do X". Feel free to add as much or as little detail as you like, or you can leave this field blank.'
                    :rows="4" />
            </div>
            <div class="form-row-end">
                <cdr-checkbox v-model="caster">Creature is a spellcaster</cdr-checkbox>
            </div>


            <cdr-button :disabled="loadingPart1 || loadingPart2" class="monster-form-button" type="submit">
                {{ 'Generate Statblock' }}
            </cdr-button>
        </form>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <Statblock v-if="!errorMessage && (loadingPart1 || loadingPart2 || monster)" :loadingPart1="loadingPart1"
            :loadingPart2="loadingPart2" :monster="monster" />
    </div>
</template>

<script>
//Include a "Decapitate" action, but make sure that the target is already suffering a condition inflicted by the headless horseman for it to work.
import { ref } from 'vue';
import Statblock from './Statblock.vue';
import { generateGptResponse } from "../util/open-ai.mjs";
import { CdrInput, CdrButton, CdrCheckbox, CdrLink, CdrSelect, CdrToggleButton, CdrToggleGroup, CdrList } from "@rei/cedar";
import "@rei/cedar/dist/style/cdr-input.css";
import "@rei/cedar/dist/style/cdr-list.css";
import "@rei/cedar/dist/style/cdr-button.css";
import "@rei/cedar/dist/style/cdr-checkbox.css";
import "@rei/cedar/dist/style/cdr-select.css";
import "@rei/cedar/dist/style/cdr-toggle-group.css";
import "@rei/cedar/dist/style/cdr-toggle-button.css";
import challengeRatingData from '../data/challengeRatings.json';
import creatureTemplates from '../data/creatureTemplates.json';
import { createStatblockPrompts } from "../util/monster-prompts.mjs";
import { canGenerateStatblock } from "../util/can-generate-statblock.mjs";

export default {
    components: {
        Statblock,
        CdrInput,
        CdrButton,
        CdrList,
        CdrLink,
        CdrCheckbox,
        CdrSelect,
        CdrToggleButton,
        CdrToggleGroup,
    },
    setup() {
        const loadingPart1 = ref(false);
        const loadingPart2 = ref(false);
        const monsterName = ref('');
        const monsterType = ref('Random');
        const monsterDescription = ref('');
        const selectedChallengeRating = ref(null);
        const monster = ref(null);
        const caster = ref(false);
        const errorMessage = ref('');
        function validationPart1(jsonString) {
            try {
                const jsonObj = JSON.parse(jsonString);
                const keys = [
                    'armor_class',
                    'hit_points',
                    'speed',
                    'senses',
                    'languages',
                    'challenge_rating',
                    'proficiency_bonus',
                    'abilities'
                ];
                return keys.every((key) => key in jsonObj);
            } catch (error) {
                return false;
            }
        }

        function validationPart2(jsonString) {
            try {
                const jsonObj = JSON.parse(jsonString);
                const keys = [
                    'actions'
                ];
                return keys.every((key) => key in jsonObj);
            } catch (error) {
                return false;
            }
        }

        async function generateStatblock() {
            monster.value = null;
            if (!canGenerateStatblock()) {
                return; // Exit if the limit is reached
            }
            loadingPart1.value = true;
            loadingPart2.value = true;

            const promptOptions = {
                monsterName: monsterName.value,
                challengeRating: selectedChallengeRating.value,
                monsterType: monsterType.value,
                monsterDescription: monsterDescription.value,
                caster: caster.value
            }
            const monsterPrompts = createStatblockPrompts(promptOptions);
            //console.log(monsterPrompts.part1);
            let monsterStatsPart1;
            try {
                monsterStatsPart1 = await generateGptResponse(monsterPrompts.part1, validationPart1, 3);
            } catch (e) {
                errorMessage.value = 'There was an issue generating the full description. Please reload your browser and resubmit your creature.'
            }
            //console.log(monsterStatsPart1);
            monster.value = JSON.parse(monsterStatsPart1);
            loadingPart1.value = false;
            const previousContext = [
                { role: 'user', content: `Please give me the first part of a D&D statblock in the following format` },
                { role: 'system', content: `${monsterStatsPart1}` }
            ];
            //console.log(monsterPrompts.part2);
            let monsterStatsPart2;
            try {
                monsterStatsPart2 = await generateGptResponse(monsterPrompts.part2, validationPart2, 3, previousContext);
            } catch (e) {
                errorMessage.value = 'There was an issue generating the full description. Please reload your browser and resubmit your creature.'
            }
            //console.log(monsterStatsPart2);
            const finalMonster = {
                ...JSON.parse(monsterStatsPart1),
                ...JSON.parse(monsterStatsPart2),
            }
            console.log(finalMonster);
            monster.value = finalMonster;
            loadingPart2.value = false;
        }

        return {
            loadingPart1,
            loadingPart2,
            errorMessage,
            monsterName,
            monsterType,
            monsterDescription,
            monster,
            caster,
            generateStatblock,
            challengeRatingData,
            creatureTemplates,
            selectedChallengeRating
        }
    }
}
</script>


<style lang="scss" scoped>
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';

.form-row-top {
    display: grid;
    grid-template-columns: 4fr 1.5fr .5fr;
    gap: 2rem;
}

.form-row-mid {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
}

.form-row-end {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
}

#monsterType {
    width: 580px;
}

.generator-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.intro-container {
    width: 855px;
    margin: 5px 20px;
    max-width: calc(100vw - 2rem);
}

.monster-form {
    display: flex;
    flex-direction: column;
    width: 855px;
    margin: 20px;
    max-width: calc(100vw - 2rem);

    button {
        align-self: flex-start;
        margin-top: 1.5rem;
    }
}

@media screen and (max-width: 855px) {
    .form-row {
        grid-template-columns: 1fr;
    }
}

.error-message {
    border: 1px solid $cdr-color-border-error;
    padding: $cdr-space-inset-one-x-stretch;
    color: $cdr-color-text-message-error;
    background-color: $cdr-color-background-message-error-01;
    text-align: center;
    margin-top: 16px;
}
</style>