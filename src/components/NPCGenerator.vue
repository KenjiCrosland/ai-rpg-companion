<template>
    <div class="app-container">
        <h1>RPG NPC Generator</h1>
        <hr>
        <cdr-text class="intro">
            Welcome to the RPG NPC Generator! This App uses the ChatGPT API to provide engaging descriptions
            of NPCs for your players. Below are some examples you can feed the NPC generator. The more context you provide, the better. If you want to generate NPCs for your homebrew city, for example, provide some details about the city so that the Generator can include details about the city in its response.
        </cdr-text>

        <cdr-list class="suggestions" modifier="unordered">
            <li v-for="example in examples" :key="example">
                <cdr-link modifier="standalone" @click="setInputValue(example)">{{ example }}</cdr-link>
            </li>
        </cdr-list>

        <cdr-text class="intro"> You also can use the <cdr-link href="https://cros.land/ai-rpg-location-generator/">location description
                generator</cdr-link> and copy and paste the results into the NPC generator here!
        </cdr-text>

        <form @submit.prevent="generateNPCDescription">
            <cdr-input id="typeOfPlace" v-model="typeOfPlace" background="secondary" label="Give me an NPC Description For:"
                required />
            <cdr-button type="submit" class="generate-button">Generate Description</cdr-button>
        </form>
        <div v-if="loading">Generating Description (This can take up to 2 minutes when ChatGPT is experiencing heavy traffic)...</div>
        <div v-if="npcDescription" class="location-description">
            <h2>{{ npcDescription.characterName }}</h2>
            <p>{{ npcDescription.descriptionOfPosition }}</p>
            <p>{{ npcDescription.reasonForBeingThere }}</p>
            <p>{{ npcDescription.distinctiveFeatureOrMannerism }}</p>
            <p>{{ npcDescription.characterSecret }}</p>
            <h3>Relationships</h3>
            <ul>
                <li v-for="relationship in formattedRelationships" :key="relationship.name">
                    <strong>{{ relationship.name }}:</strong> {{ relationship.description }}
                </li>
            </ul>

            <h3>Roleplaying Tips</h3>
            <p>{{ npcDescription.roleplaying_tips }}</p>
        </div>

    </div>
    <cdr-text class="credits">
        This app was created by <cdr-link href='https://cros.land'>Kenji Crosland</cdr-link>
    </cdr-text>
</template>
  
<script>
import { CdrInput, CdrLink, CdrButton, CdrText, CdrList } from '@rei/cedar';
import '@rei/cedar/dist/style/cdr-input.css';
import '@rei/cedar/dist/cdr-fonts.css';
import '@rei/cedar/dist/reset.css';
import '@rei/cedar/dist/style/cdr-text.css';
import '@rei/cedar/dist/style/cdr-button.css';
import '@rei/cedar/dist/style/cdr-link.css';
import '@rei/cedar/dist/style/cdr-list.css';
export default {
    data() {
        return {
            npcDescription: '',
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
            loading: false,
        };
    },
    computed: {
        formattedRelationships() {
            return this.npcDescription.relationships.map(relationship => {
                const [name, description] = Object.entries(relationship)[0];
                return { name, description };
            });
        }
    },
    components: {
        CdrInput,
        CdrText,
        CdrButton,
        CdrLink,
        CdrList,
    },
    methods: {
        setInputValue(value) {
            this.typeOfPlace = value;
        },
        async generateNPCDescription() {
            this.loading = true;

            const prompt =
                `Please provide a description of an NPC in a tabletop RPG in the form of a JSON object. The JSON object should contain the following keys:
{
  "characterName": "Portobas Dallington",
  "descriptionOfPosition": "This should be a description of their job or position in society. It should be specific about their profession and contain two elements, their position and a detail that sets them apart from others who may be in that position. For example, instead of just saying 'Dibbledop is a gnome tinkerer' say 'Dibbledop is a gnome tinkerer with the greatest collection of mechanical spiders and beetles in all the sword coast'",
  "reasonForBeingThere":"This should provide a reason for why they happen to be where they are this should align with their goals and aspirations. Example sentence: Waverly is actually drinking his sorrows away because his crew recently mutinied and kicked him off his own ship..",
  "distinctiveFeatureOrMannerism": "This should be a distinctive feature or peculiar mannerism observable mannerism written in the form of an action. Example sentence: Waverly gestures dramatically with his hands as he spins tales of his past exploits, punctuating his words with sips of his drink.",
  "characterSecret": "This should be a secret or hidden motivation that the character has that they are keeping from others. Example sentence: Waverly is trying to gather enough money to hire a new crew and take back his ship, but he doesn't want anyone to know he was overthrown. ",
  "relationships": [
    {"Amalia": "Portobas' older sister Amalia often comes to the tavern to check in on him, worried that he might go off on a quest"},
    {"Rose":"Dibbledop's adopted human daughter Rose has been frequenting the Tarnished Sword tavern listening to tales of adventurer's. He's worried she might run off to do an adventure herself"},
    {"Roxanne": "Waverly's current lover Roxanne is a famed dancer whose performances are sought by nobles of the highest echelons"}
  ],
  "roleplaying_tips": "1-2 sentences of roleplaing tips for this npc. Example: When roleplaying Portobas, your high pitched voice often breaks. You stutter often out of nervousness. Occasionally you pepper your speech cliched platitudes like \"I just wish to live my life to the fullest! And sometime be known throughout the land!\""
}

"descriptionOfPosition","reasonForBeingThere", "distinctiveFeatureOrMannerism", and "secret" are all sentences of a summary paragraph. Each or sentence should flow into the next. Use transitions like "Of Course", "Finally", "Further", "Furthermore", "However", "Fortunately," "Unfortunately" etc. These transitions are not required but should be used where appropriate.

Relationship descriptions should be in the form of actions.

Here are some more examples of descriptionOfPosition:
    Bjarti is the crown prince of the bearfolk Kingdom Bjarnvoldenheim, and he also happens to have the mind of a child.
    Gorton Traxer grew up watching vids of surgery procedures while other kids were playing the latest BD adventure--so it's not surprising he became one of the best known ripperdocs in Night city.
    Portobas Dallington is the fifth (and nearly forgotten) child of the preeminent Dallington family, he aspires to be a great hero one day, but his parents barely remember his name.
    Waverly Radcliffe is a consummate liar, but the fact that at least half of his stories of being a privateer are in fact true (if not embellished for dramatic effect).

Here are more examples of reasonForBeingThere:
    Portobas has been strutting around in his shining plate armor at the Leaky Tap for days now hoping someone may give him a quest, and no one has the heart to tell him that he looks ridiculous.
    Dibbledop is in the jungle collecting species of a rare mantis, hoping that he can get a few live specimens so that he can create a clockwork mantis.
    Gorton's is actually here to sell some braindances of folks who chose to undergo mod surgery without anesthesia.
    Bjarti went off chasing a butterfly and got separated from the rest of his tribe and has been lost for days.

Here are more examples of of distinctiveFeatureOrMannerism:
    His pale face is flushed with sweat and exertion from walking around in the plate armor, and he has a bit of a squeaky voice.
    He has a perfectly trimmed blond goatee and mustache and wears a hat with a ridiculously wide brim and his hands always seem to rest near his belt where his rapier is sheathed
    Dibbledop absentmindedly tinkers with a small mechanical spider, occasionally muttering to himself as he makes adjustments.
    Waverly gestures dramatically with his hands as he spins tales of his past exploits, punctuating his words with sips of his drink.
    Gorton nervously taps his fingers on the table, his eyes darting around the room as he looks for potential customers.
    Bjarti often breaks into fits of giggles at the sight of something amusing, and he has a habit of petting the head of his stuffed animal companion.

Here are more exmaples of characterSecret

    Portobas secretly hopes that by completing a heroic quest, he will win the approval of his family and be recognized as a true hero.
    Dibbledop is actually on the run from a rival inventor who wants to steal his clockwork mantis design.
    Waverly is trying to gather enough money to hire a new crew and take back his ship, but he doesn't want anyone to know he was overthrown.
    Gorton has been experimenting on himself with illegal cyberware and is starting to lose touch with reality.
    Bjarti knows the way back to his tribe, but he is enjoying his solo adventure and doesn't want to return just yet.",

With this format in mind, please create an NPC description for: ${this.typeOfPlace}`;

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
                const responseData = await response.json();
                this.npcDescription = JSON.parse(responseData.choices[0].message.content);
            } catch (error) {
                console.error('Error generating NPC description:', error);
                this.npcDescription = error;
            }

            this.loading = false;
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
}

.suggestions {
    margin-left: 2rem;
    padding: 2rem;
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
</style>