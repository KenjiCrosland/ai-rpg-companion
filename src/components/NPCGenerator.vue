<template>
    <div class="app-container">
        <h1>RPG NPC Generator</h1>
        <hr>
        <cdr-text class="intro">
            Welcome to the RPG NPC Generator! This App uses the ChatGPT API to provide engaging descriptions
            of NPCs for your players. Below are some examples you can feed the NPC generator. The more context you provide,
            the better. If you want to generate NPCs for your homebrew city, for example, provide some details about the
            city so that the Generator can include details about the city in its response. Please note that it can take up
            to two minutes for a description to load when ChatGPT is experiencing heavy traffic.

        </cdr-text>

        <cdr-list class="suggestions" modifier="unordered">
            <li v-for="example in examples" :key="example">
                <cdr-link modifier="standalone" @click="setInputValue({ value: example })">{{ example }}</cdr-link>
            </li>
        </cdr-list>

        <cdr-text class="intro"> You also can use the <cdr-link href="https://cros.land/ai-rpg-location-generator/">location
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
                <h2>{{ npcDescriptionPart1.characterName }}</h2>
                <p>{{ npcDescriptionPart1.descriptionOfPosition }}</p>
                <p>{{ npcDescriptionPart1.reasonForBeingThere }}</p>
                <p>{{ npcDescriptionPart1.distinctiveFeatureOrMannerism }}</p>
                <p>{{ npcDescriptionPart1.characterSecret }}</p>
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
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </div>
        <div class="patreon">
            <cdr-link href="https://www.patreon.com/bePatron?u=2356190">Support Me on Patreon!</cdr-link>
        </div>
    </div>
</template>
  
<script>
import { CdrButton, CdrInput, CdrLink, CdrText, CdrList, CdrSkeleton, CdrSkeletonBone } from '@rei/cedar';
import NPCForm from './NPCForm.vue';
import '@rei/cedar/dist/cdr-fonts.css';
import '@rei/cedar/dist/reset.css';
import '@rei/cedar/dist/style/cdr-text.css';
import '@rei/cedar/dist/style/cdr-link.css';
import '@rei/cedar/dist/style/cdr-list.css';
import '@rei/cedar/dist/style/cdr-skeleton.css';
import '@rei/cedar/dist/style/cdr-skeleton-bone.css';
export default {
    data() {
        return {
            npcDescriptionPart1: '',
            npcDescriptionPart2: '',
            typeOfPlace: '',
            examples: [
                'An edgerunner in Night City dealing with bouts of cyberpsychosis',
                'A Scorpion Illusionist Shugenja who is possessed by an Oni and is living in the city of Ryoko Owari',
                'A notable tavern patron',
                'A sentient gazebo in the Feywild by the name of Gary',
                'A prisoner who has been kept in the dungeons of an evil red wizard of Thay',
                'A goblin by the name of Boblin',
                'A completely random NPC. Surprise me'
            ],
            errorMessage: '',
            loadingPart1: false,
            loadingPart2: false,
        };
    },
    components: {
        NPCForm,
        CdrText,
        CdrInput,
        CdrButton,
        CdrLink,
        CdrList,
        CdrSkeleton,
        CdrSkeletonBone
    },
    methods: {
        setInputValue({ value }) {
            this.typeOfPlace = value;
        },

        setLoadingState({ part, isLoading }) {
            this[`loadingPart${part}`] = isLoading;
        },
        displayNPCDescription({ part, npcDescription }) {
            this[`npcDescriptionPart${part}`] = npcDescription;
            this[`loadingPart${part}`] = false;
        },
        handleError(errorMessage) {
            console.error(errorMessage);
            this.loadingPart1 = false;
            this.loadingPart2 = false;
            if (this.npcDescriptionPart1 && this.npcDescriptionPart2) {
                this.errorMessage = null;
                return;
            }
            this.errorMessage = errorMessage;
        },
    },
};
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
}</style>