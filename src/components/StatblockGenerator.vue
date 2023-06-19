<template>
    <div class="generator-container">
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <form @submit.prevent="generateStatblock" class="monster-form">
            <div class="form-row">
                <cdr-input id="monsterName" v-model="monsterName" background="secondary"
                    :label="'Monster Description (Example: Headless Horseman)'" required />
                <cdr-select v-model="monsterType" label="type"
                    :options="['Random', 'Stronger Defense', 'Balanced', 'Stronger Offense']" required />
                <cdr-select v-model="selectedChallengeRating" label="CR" prompt="CR"
                    :options="challengeRatingData.fullArray" required />
                <cdr-checkbox v-model="caster">Creature is a spellcaster</cdr-checkbox>
            </div>

            <cdr-button :disabled="loadingPart1 || loadingPart2" class="monster-form-button" type="submit">{{ 'Generate Statblock' }}</cdr-button>
        </form>
        <Statblock v-if="loadingPart1 || loadingPart2 || monster" :loadingPart1="loadingPart1" :loadingPart2="loadingPart2" :monster="monster" />
    </div>
</template>
      
<script>
import { ref } from 'vue';
import Statblock from './Statblock.vue';
import { generateGptResponse } from "../util/open-ai.mjs";
import { CdrInput, CdrButton, CdrCheckbox, CdrSelect, CdrToggleButton, CdrToggleGroup, CdrList } from "@rei/cedar";
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

export default {
    components: {
        Statblock,
        CdrInput,
        CdrButton,
        CdrList,
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
            loadingPart1.value = true;
            loadingPart2.value = true;
            const promptOptions = {
                monsterName: monsterName.value,
                challengeRating: selectedChallengeRating.value,
                monsterType: monsterType.value,
                caster: caster.value
            }
            const monsterPrompts = createStatblockPrompts(promptOptions);
            //console.log(monsterPrompts.part1);
            let monsterStatsPart1;
            try {
             monsterStatsPart1 = await generateGptResponse(monsterPrompts.part1, validationPart1, 3);
            } catch(e) {
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
            } catch(e) {
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
.form-row {
    display: grid;
    grid-template-columns: 4fr 1.5fr .5fr;
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