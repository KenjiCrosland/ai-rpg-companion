<template>
    <div class="generator-container">
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

            <cdr-button class="monster-form-button" type="submit">{{ 'Generate Statblock' }}</cdr-button>
        </form>

        <Statblock v-if="monster" :creatureData="monster" />

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
        const monsterName = ref('');
        const monsterType = ref('Random');
        const selectedChallengeRating = ref(null);
        const monster = ref(null);
        const caster = ref(false);
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
            const promptOptions = {
                monsterName: monsterName.value,
                challengeRating: selectedChallengeRating.value,
                monsterType: monsterType.value,
                caster: caster.value
            }
            const monsterPrompts = createStatblockPrompts(promptOptions);
            console.log(monsterPrompts.part1);
            const monsterStatsPart1 = await generateGptResponse(monsterPrompts.part1, validationPart1, 3);
            console.log(monsterStatsPart1);
            const previousContext = [
                { role: 'user', content: `Please give me the first part of a D&D statblock in the following format` },
                { role: 'system', content: `${monsterStatsPart1}` }
            ];
            console.log(monsterPrompts.part2);
            const monsterStatsPart2 = await generateGptResponse(monsterPrompts.part2, validationPart2, 3, previousContext);
            console.log(monsterStatsPart2);
            const finalMonster = {
                ...JSON.parse(monsterStatsPart1),
                ...JSON.parse(monsterStatsPart2),
            }
            console.log(finalMonster);
            monster.value = finalMonster;
        }

        function copyAsMarkdown() {

      const markdownContent = statblockToMarkdown(monster.value);

      if (markdownContent) {
        const textarea = document.createElement('textarea');
        textarea.textContent = markdownContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        // Optionally, display a message that the content has been copied.
        alert('Content copied as markdown!');
      } else {
        // If there is no content to copy, display a message to the user.
        alert('No content available to copy as markdown.');
      }
    }

        return {
            copyAsMarkdown,
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

    button {
        align-self: flex-start;
        margin-top: 1.5rem;
    }
}
</style>