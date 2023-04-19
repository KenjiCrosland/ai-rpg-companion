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
                <cdr-link modifier="standalone" @click="setInputValue(example)">{{ example }}</cdr-link>
            </li>
        </cdr-list>

        <cdr-text class="intro"> You also can use the <cdr-link href="https://cros.land/ai-rpg-location-generator/">location
                description generator</cdr-link> and copy and paste the results into the NPC generator here!
        </cdr-text>


        <form @submit.prevent="generateNPCDescription">
            <cdr-input id="typeOfPlace" v-model="typeOfPlace" background="secondary" label="Give me an NPC Description For:"
                required />
            <cdr-button type="submit" class="generate-button">Generate Description</cdr-button>
        </form>
        <div class="location-description" v-if="loadingPart1 || loadingPart2 || npcDescriptionPart1 || npcDescriptionPart2">
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
        </div>
        <div class="patreon">
            <cdr-link href="https://www.patreon.com/bePatron?u=2356190">Support Me on Patreon!</cdr-link>
        </div>
    </div>
</template>
  
<script>
import { CdrInput, CdrLink, CdrButton, CdrText, CdrList, CdrSkeleton, CdrSkeletonBone } from '@rei/cedar';
import { createNPCPrompt, createRelationshipAndTipsPrompt } from '../util/prompts.mjs';
import '@rei/cedar/dist/style/cdr-input.css';
import '@rei/cedar/dist/cdr-fonts.css';
import '@rei/cedar/dist/reset.css';
import '@rei/cedar/dist/style/cdr-text.css';
import '@rei/cedar/dist/style/cdr-button.css';
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
            loadingPart1: false,
            loadingPart2: false,
        };
    },
    components: {
        CdrInput,
        CdrText,
        CdrButton,
        CdrLink,
        CdrList,
        CdrSkeleton,
        CdrSkeletonBone
    },
    methods: {
        setInputValue(value) {
            this.typeOfPlace = value;
        },
        validateNPCDescription(jsonString) {
            try {
                const jsonObj = JSON.parse(jsonString);
                const keys = ['characterName', 'descriptionOfPosition', 'reasonForBeingThere', 'distinctiveFeatureOrMannerism', 'characterSecret'];
                return keys.every(key => key in jsonObj);
            } catch (error) {
                return false;
            }
        },
        validatePart2(jsonString) {
            try {
                const jsonObj = JSON.parse(jsonString);
                const keys = ['relationships', 'roleplaying_tips'];
                return keys.every(key => key in jsonObj);
            } catch (error) {
                return false;
            }
        },
        async generateGptResponse(prompt, validateJson = null, maxAttempts = 3) {
            let attempts = 0;
            let validJson = false;
            let errorThrown = false;
            let responseData;

            while (attempts < maxAttempts && !validJson && !errorThrown) {
                try {
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            model: "gpt-3.5-turbo",
                            messages: [
                                { "role": "system", "content": "You are an assistant Game Master." },
                                { "role": "user", "content": prompt },
                            ],
                        }),
                    };
                    let response;
                    if (import.meta.env.DEV) {
                        requestOptions.headers.Authorization = `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
                        response = await fetch('https://api.openai.com/v1/chat/completions', requestOptions);
                    } else {
                        response = await fetch('/wp-json/open-ai-proxy/api/v1/proxy', requestOptions);
                    }
                    responseData = await response.json();
                    const jsonString = responseData.choices[0].message.content;

                    validJson = validateJson(jsonString);

                } catch (error) {
                    console.error('Error generating response:', error);
                    errorThrown = true;
                }
                attempts++;
            }

            if (!validJson) {
                throw new Error('Failed to generate a valid response. Please try again later.');
            }

            return responseData.choices[0].message.content;
        },
        async generateNPCDescription() {
            this.loadingPart1 = true;
            this.loadingPart2 = true;

            const npcPrompt = createNPCPrompt(this.typeOfPlace); // Same as before

            try {
                const npcJsonString = await this.generateGptResponse(npcPrompt, this.validateNPCDescription);
                this.npcDescriptionPart1 = JSON.parse(npcJsonString);
                this.loadingPart1 = false;
                const part2Prompt = createRelationshipAndTipsPrompt(JSON.stringify(this.npcDescriptionPart1));
                const relationshipJsonString = await this.generateGptResponse(part2Prompt, this.validatePart2);
                this.npcDescriptionPart2 = JSON.parse(relationshipJsonString);
                this.loadingPart2 = false;
            } catch (error) {
                console.error('Error generating NPC description and relationships:', error);
                this.loadingPart1 = false;
                this.npcDescription = 'Failed to generate NPC description and relationships. Please try again later.';
            }
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
    @include cdr-text-heading-serif-1000;
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

.patreon {
    margin: 30px auto 0 auto;
    text-align: center;
}
</style>