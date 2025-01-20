<template>
    <div class="app-container">
        <h1 v-if="premium">Kenji's NPC Generator -- Premium Version</h1>
        <h1 v-else>Kenji's NPC Generator -- Free Version</h1>
        <hr>
        <cdr-text class="intro">
            Welcome to the RPG NPC Generator! This App uses the ChatGPT API to provide engaging descriptions
            of NPCs for your players. Below are some examples you can feed the NPC generator. The more context you
            provide, the better. If you want to generate NPCs for your homebrew city, for example, provide some details
            about
            the
            city so that the Generator can include details about the city in its response.
            <span v-if="premium">
                Finally, you can generate unlimited D&D 5e Statblocks for the NPCs you generate. These statblocks can be
                saved
                to folders in the <cdr-link
                    href="https://cros.land/ai-powered-dnd-5e-monster-statblock-generator-premium/">Statblock Generator
                    App</cdr-link> where you can access them later.
            </span>
            <span v-else>
                Finally, you can generate D&D 5e Statblocks for the NPCs you generate. Statblock generation is limited
                to 5 per
                day for the free version. These statblocks can be saved to folders in the <cdr-link
                    href="https://cros.land/ai-powered-dnd-5e-monster-statblock-generator/">Statblock Generator
                    App</cdr-link>
                where you can access them later.
            </span>
        </cdr-text>
        <p v-if="!premium">
            <cdr-link href="https://cros.land/npc-generator-premium-version/">NPC Generator -- Premium
                Version</cdr-link>
        </p>
        <cdr-list class="suggestions" modifier="unordered">
            <li v-for="example in examples" :key="example">
                <cdr-link modifier="standalone" @click="setInputValue({ value: example })">{{ example }}</cdr-link>
            </li>
        </cdr-list>

        <cdr-text class="intro"> You also can use the <cdr-link
                href="https://cros.land/ai-rpg-location-generator/">location
                description generator</cdr-link> and copy and paste the results into the NPC generator here!
        </cdr-text>
        <NPCForm :inputValue="typeOfPlace" labelText="Give me an NPC Description For:"
            @npc-description-generated="displayNPCDescription" @npc-description-error="handleError"
            @set-loading-state="setLoadingState" @example-clicked="setInputValue"></NPCForm>
        <div class="location-description"
            v-if="loadingPart1 || loadingPart2 || npcDescriptionPart1 || npcDescriptionPart2 || errorMessage">
            <div v-if="loadingPart1">
                <CdrSkeleton>
                    <CdrSkeletonBone type="heading" style="width: 50%; height: 50px" />
                    <p>
                        <CdrSkeletonBone type="line" style="width:95%" />
                        <CdrSkeletonBone type="line" style="width:90%" />
                        <CdrSkeletonBone type="line" style="width:85%" />
                        <CdrSkeletonBone type="line" style="width:95%" />
                        <CdrSkeletonBone type="line" style="width:50%" />
                    </p>
                    <p>
                        <CdrSkeletonBone type="line" style="width:95%" />
                        <CdrSkeletonBone type="line" style="width:90%" />
                        <CdrSkeletonBone type="line" style="width:85%" />
                        <CdrSkeletonBone type="line" style="width:95%" />
                        <CdrSkeletonBone type="line" style="width:75%" />
                    </p>
                    <p>
                        <CdrSkeletonBone type="line" style="width:95%" />
                        <CdrSkeletonBone type="line" style="width:90%" />
                        <CdrSkeletonBone type="line" style="width:85%" />
                        <CdrSkeletonBone type="line" style="width:95%" />
                        <CdrSkeletonBone type="line" style="width:30%" />
                    </p>
                    <p>
                        <CdrSkeletonBone type="line" style="width:95%" />
                        <CdrSkeletonBone type="line" style="width:90%" />
                        <CdrSkeletonBone type="line" style="width:85%" />
                        <CdrSkeletonBone type="line" style="width:95%" />
                        <CdrSkeletonBone type="line" style="width:60%" />
                    </p>
                </CdrSkeleton>
            </div>
            <div v-if="npcDescriptionPart1 && !loadingPart1">
                <h2>{{ npcDescriptionPart1.character_name }}</h2>
                <div class="read-aloud">
                    <p>{{ npcDescriptionPart1.read_aloud_description }}</p>
                </div>
                <p>{{ npcDescriptionPart1.description_of_position }}</p>
                <p>{{ npcDescriptionPart1.reason_for_being_there }}</p>
                <p>{{ npcDescriptionPart1.distinctive_feature_or_mannerism }}</p>
                <p>{{ npcDescriptionPart1.character_secret }}</p>
            </div>
            <div v-if="loadingPart2">
                <h3>Relationships</h3>
                <CdrSkeleton>
                    <div>
                        <div class="flex-bone">
                            <CdrSkeletonBone type="line" style="width:10%;" /> :
                            <CdrSkeletonBone type="line" style="width:80%;" />
                        </div>
                        <CdrSkeletonBone type="line" style="width:100%; margin-top: 0" />
                        <CdrSkeletonBone type="line" style="width:90%;" />
                        <CdrSkeletonBone type="line" style="width:85%;" />
                    </div>

                    <div>
                        <div class="flex-bone">
                            <CdrSkeletonBone type="line" style="width:10%;" /> :
                            <CdrSkeletonBone type="line" style="width:80%;" />
                        </div>
                        <CdrSkeletonBone type="line" style="width:100%; margin-top: 0" />
                        <CdrSkeletonBone type="line" style="width:90%;" />
                        <CdrSkeletonBone type="line" style="width:85%;" />
                    </div>

                    <div>
                        <div class="flex-bone">
                            <CdrSkeletonBone type="line" style="width:10%;" /> :
                            <CdrSkeletonBone type="line" style="width:80%;" />
                        </div>
                        <CdrSkeletonBone type="line" style="width:100%; margin-top: 0" />
                        <CdrSkeletonBone type="line" style="width:90%;" />
                        <CdrSkeletonBone type="line" style="width:85%;" />
                    </div>


                    <h3>Roleplaying Tips</h3>

                    <p style="margin-top: 0">
                        <CdrSkeletonBone type="line" style="width:95%" />
                        <CdrSkeletonBone type="line" style="width:90%" />
                        <CdrSkeletonBone type="line" style="width:85%" />
                        <CdrSkeletonBone type="line" style="width:95%" />
                        <CdrSkeletonBone type="line" style="width:60%" />
                    </p>
                </CdrSkeleton>
            </div>
            <div v-if="npcDescriptionPart2 && !loadingPart2">
                <h3>Relationships</h3>
                <ul>
                    <li v-for="(relationshipDescription, relationshipName) in npcDescriptionPart2.relationships"
                        :key="relationshipName">
                        <strong>{{ relationshipName }}:</strong> {{ relationshipDescription }}
                    </li>
                </ul>

                <h3>Roleplaying Tips</h3>
                <p>{{ npcDescriptionPart2.roleplaying_tips }}
                </p>
            </div>
            <div v-if="npcDescriptionPart2 && !loadingPart2">
                <h3>Generate D&D 5e Statblock for {{ npcDescriptionPart1.character_name }}</h3>
                <div>
                    <div class="generate-monster">

                        <div class="cr-select">
                            <cdr-select v-model="selectedChallengeRating" label="Challenge Rating" prompt="CR"
                                :options="challengeRatingData.fullArray" />
                            <cdr-checkbox label="Spellcaster:" v-model="isSpellcaster">NPC is a
                                Spellcaster</cdr-checkbox>
                        </div>

                        <cdr-button @click="generateStatblock()">Generate Statblock</cdr-button>
                    </div>

                    <Statblock v-if="(loadingStatblockPart1 || loadingStatblockPart1 || statblock)"
                        :loadingPart1="loadingStatblockPart1" :loadingPart2="loadingStatblockPart2" :monster="statblock"
                        :premium="premium" :copyButtons="true" @update-monster="updateStatblock" />
                    <SaveStatblock v-if="statblock" :monster="statblock"
                        :statblockLink="premium ? 'https://cros.land/ai-powered-dnd-5e-monster-statblock-generator-premium/' : 'https://cros.land/ai-powered-dnd-5e-monster-statblock-generator/'" />
                </div>
            </div>
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </div>
        <div class="patreon" v-if="!premium">
            <cdr-link href="https://www.patreon.com/bePatron?u=2356190">Support Me on Patreon!</cdr-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { CdrButton, CdrLink, CdrText, CdrCheckbox, CdrSelect, CdrList, CdrSkeleton, CdrSkeletonBone } from '@rei/cedar';
import Statblock from './Statblock.vue';
import SaveStatblock from './SaveStatblock.vue';
import { generateGptResponse } from "../util/open-ai.mjs";
import { createStatblockPrompts } from "../util/monster-prompts.mjs";
import challengeRatingData from '../data/challengeRatings.json';
import creatureTemplates from '../data/creatureTemplates.json';
import NPCForm from './NPCForm.vue';
import { canGenerateStatblock } from "../util/can-generate-statblock.mjs";
import '@rei/cedar/dist/cdr-fonts.css';
import '@rei/cedar/dist/reset.css';
import '@rei/cedar/dist/style/cdr-text.css';
import '@rei/cedar/dist/style/cdr-link.css';
import '@rei/cedar/dist/style/cdr-list.css';
import '@rei/cedar/dist/style/cdr-skeleton.css';
import '@rei/cedar/dist/style/cdr-skeleton-bone.css';


const npcDescriptionPart1 = ref('');
const npcDescriptionPart2 = ref('');
const typeOfPlace = ref('');
const errorMessage = ref('');
const loadingPart1 = ref(false);
const loadingPart2 = ref(false);
const loadingStatblockPart1 = ref(false);
const loadingStatblockPart2 = ref(false);
const statblock = ref(null);
const selectedChallengeRating = ref('1');
const isSpellcaster = ref(false);

const props = defineProps({
    premium: {
        type: Boolean,
        default: false
    }
});

const examples = ref([
    'An edgerunner in Night City dealing with bouts of cyberpsychosis',
    'A Scorpion Illusionist Shugenja who is possessed by an Oni and is living in the city of Ryoko Owari',
    'A notable tavern patron',
    'A sentient gazebo in the Feywild by the name of Gary',
    'A prisoner who has been kept in the dungeons of an evil red wizard of Thay',
    'A goblin by the name of Boblin',
    'A completely random NPC. Surprise me'
]);

function updateStatblock(monster) {
    statblock.value = monster;
}

function setInputValue({ value }) {
    typeOfPlace.value = value;
}

function setLoadingState({ part, isLoading }) {
    if (part === 1) {
        loadingPart1.value = isLoading;
    } else if (part === 2) {
        loadingPart2.value = isLoading;
    }
}

function displayNPCDescription({ part, npcDescription }) {
    if (part === 1) {
        npcDescriptionPart1.value = npcDescription;
        loadingPart1.value = false;
    } else if (part === 2) {
        npcDescriptionPart2.value = npcDescription;
        loadingPart2.value = false;
    }
}

function handleError(message) {
    console.error(message);
    loadingPart1.value = false;
    loadingPart2.value = false;
    errorMessage.value = message || null;
}

async function generateStatblock() {
    statblock.value = null;
    const canGenerate = await canGenerateStatblock(props.premium);

    if (!canGenerate) {
        return;
    }

    loadingStatblockPart1.value = true;
    loadingStatblockPart2.value = true;
    const fullNPCDescription = `Description of Position: ${npcDescriptionPart1.value.description_of_position}. Distinctive Feature: ${npcDescriptionPart1.value.distinctive_feature_or_mannerism}. Character Secret: ${npcDescriptionPart1.value.character_secret}. Read Aloud Description: ${npcDescriptionPart1.value.read_aloud_description}`;
    const promptOptions = {
        monsterName: npcDescriptionPart1.value.character_name,
        challengeRating: selectedChallengeRating.value,
        monsterType: 'Random',
        monsterDescription: fullNPCDescription,
        caster: isSpellcaster.value
    };
    const npcPrompts = createStatblockPrompts(promptOptions);

    try {
        const npcStatsPart1 = await generateGptResponse(npcPrompts.part1, validationPart1, 3);
        statblock.value = JSON.parse(npcStatsPart1);
        loadingStatblockPart1.value = false;
        const previousContext = [
            { role: 'user', content: `Please give me the first part of a D&D statblock in the following format` },
            { role: 'system', content: `${npcStatsPart1}` }
        ];
        const npcStatsPart2 = await generateGptResponse(npcPrompts.part2, validationPart2, 3, previousContext);
        const finalStatblock = {
            ...JSON.parse(npcStatsPart1),
            ...JSON.parse(npcStatsPart2),
        };
        statblock.value = finalStatblock;
    } catch (e) {
        errorMessage.value = 'There was an issue generating the full description. Please reload your browser and resubmit your creature.';
    }
    loadingStatblockPart2.value = false;
}

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
        const keys = ['actions'];
        return keys.every((key) => key in jsonObj);
    } catch (error) {
        return false;
    }
}
</script>

<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.app-container {
    @include cdr-text-body-400();
    color: $cdr-color-text-primary;
    max-width: 800px;
    margin: 20px auto;
    padding: 2px 30px 30px 30px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

hr {
    border: 1px solid $cdr-color-border-secondary;
    width: 80%;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.intro {
    @include cdr-text-body-400();
    margin: 1rem 0;
}

.read-aloud {
    background-color: $cdr-color-background-secondary;
    color: $cdr-color-text-secondary;
    padding: 1rem 2rem;
    font-style: italic;
}

.suggestions {
    margin-left: 2rem;
    padding: 2rem;
}

div[class^="cdr-skeleton-bone"] {
    block-size: 2rem;
    margin: 1.1rem 0;
}

.flex-bone {
    display: flex;
    gap: 10px;
}

.generate-monster {
    display: flex;
    align-items: center;
    gap: 2rem;

    button {
        margin-top: 4px;
    }
}

.credits {
    @include cdr-text-body-400();
    margin: 5px auto;
    text-align: center;
}

h1 {
    font-family: Roboto, "Helvetica Neue", sans-serif;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0px;
    font-size: 4.2rem;
    line-height: 3rem;
}

form {
    background-color: $cdr-color-background-secondary;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.generate-button {
    align-self: flex-start;
}

.location-description {
    @include cdr-text-body-500();
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
}

.error-message {
    border: 1px solid $cdr-color-border-error;
    padding: $cdr-space-inset-one-x-stretch;
    color: $cdr-color-text-message-error;
    background-color: $cdr-color-background-message-error-01;
    text-align: center;
    margin-top: 16px;
}

.patreon {
    margin: 30px auto 0 auto;
    text-align: center;
}
</style>