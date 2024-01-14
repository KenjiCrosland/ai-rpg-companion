<template>
    <div class="app_container">
        <h1>RPG Dungeon Generator</h1>
        <form @submit.prevent="generateDungeonSummary" class="dungeon_form">
            <cdr-input v-model="dungeonName" label="Dungeon Name" placeholder="Enter Dungeon Name" required>
            </cdr-input>
            <cdr-input tag="textarea" v-model="dungeonDetails" label="Dungeon Details"
                placeholder="Enter any additional dungeon details" class="dungeon-details">
            </cdr-input>
            <cdr-button type="submit" class="generate_button">Generate Dungeon Summary</cdr-button>
        </form>

        <div v-if="dungeonSummary">
            <h2>Dungeon Summary: {{ dungeonName }}</h2>
            <div>
                <h3>General Description</h3>
                <p>{{ dungeonSummary.general_description }}</p>

                <h3>Current Situation</h3>
                <p>{{ dungeonSummary.current_situation }}</p>

                <h3>Historical Background</h3>
                <p>{{ dungeonSummary.historical_background }}</p>

                <h3>Adventurers' Motivation</h3>
                <p>{{ dungeonSummary.adventurers_motivation }}</p>

                <h3>Secret</h3>
                <p>{{ dungeonSummary.secret }}</p>

                <h3>Environmental Features</h3>
                <p>{{ dungeonSummary.environmental_features }}</p>

                <h3>Factions or NPCs</h3>
                <p>{{ dungeonSummary.factions_or_npcs }}</p>
            </div>
            <cdr-button @click="generateRoomList" class="generate_button">Generate Room List</cdr-button>
        </div>


        <div v-if="dungeonData && dungeonData.length > 0">
            <cdr-text tag="h2">Room List</cdr-text>
            <div v-for="(room, index) in dungeonData" :key="index">
                <h3>{{ room.room_name }}</h3>
                <p>{{ room.room_description }}</p>
                <cdr-button @click="createDetailedRoom(room)" class="expand_button">Generate Detailed Room</cdr-button>
            </div>
        </div>

        <div v-if="detailedRooms.length > 0">
            <h2>Detailed Room Descriptions</h2>
            <div v-for="(room, index) in detailedRooms" :key="`detailed-room-${index}`">
                <h3>{{ room.room_name }}</h3>
                <div class="read-aloud">
                    <p>{{ room.read_aloud_description }}</p>
                </div>
                <p>{{ room.detailed_description.dungeon_room_dimensions }}</p>
                <p>{{ room.detailed_description.unique_feature_extra_details }}</p>
                <p>{{ room.detailed_description.interactive_element_extra_details }}</p>
                <p v-if="room.detailed_description.hidden_secret">{{ room.detailed_description.hidden_secret }}</p>

                <div
                    v-if="room.detailed_description.npc_or_monster_list && room.detailed_description.npc_or_monster_list.length > 0">
                    <h4>NPCs or Monsters</h4>
                    <div v-for="(npc, npcIndex) in room.detailed_description.npc_or_monster_list"
                        :key="`npc-${index}-${npcIndex}`">
                        <p><strong>{{ npc.name }}</strong></p>
                        <p>{{ npc.description }}</p>
                        <p>{{ npc.motivation }}</p>
                        <cdr-button @click="generateMonster(npc, index, npcIndex)">Generate Statblock</cdr-button>
                        <StatblockBase  v-if="(npc.loadingPart1 || npc.loadingPart2 || npc.statblock)" :loadingPart1="npc.loadingPart1" :loadingPart2="npc.loadingPart2" :monster="npc.statblock" columns="one_column" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { CdrInput, CdrButton, CdrText } from "@rei/cedar";
import StatblockBase from './StatblockBase.vue';
import { generateGptResponse } from '../util/open-ai.mjs';
import { dungeonFormatGuidelines } from "../util/prompts.mjs";
import { generateStatblockPart1, completeStatblock } from '../util/statblock-generator.mjs';
export default {
    components: {
        CdrInput,
        CdrButton,
        CdrText,
        StatblockBase
    },
    data() {
        return {
            dungeonName: '',
            dungeonDetails: '',
            dungeonSummary: null,
            dungeonData: null,
            detailedRooms: [],
        };
    },
    methods: {
        async generateDungeonSummary() {
            const prompt = `
                Generate a detailed summary for a dungeon named "${this.dungeonName}" 
                
                Here are some existing details on the dungeon. Be sure to incorporate these and don't deviate from them, only supplement:
                ${this.dungeonDetails}

                Do NOT change the lore or names of any of the characters or factions above, and be sure to use them in the response. You can expand and add more details, but don't change any provided above.
                
                Return everything in a structured JSON format. Include specific details in each section. Use the following structure:

                {
                "general_description": "Describe the general location and basic appearance of the dungeon. Provide atmospheric details but avoid specific proper names.",
                "current_situation": "Detail who currently controls the dungeon, describing their leader, the nature of their activities (e.g., rituals, conquests, research), and their overall goal or the entity they serve. Also be sure to mention the consequences if current activities remain unchecked",
                "historical_background": "Discuss the dungeon's history, including its original purpose, previous inhabitants, any significant events that led to its current state, and how this history influences the dungeon now.",
                "adventurers_motivation": "Describe various reasons why adventurers might be drawn to explore this dungeon, such as types of treasures, adversaries, or mysteries to uncover.",
                "secret": "Reveal a significant secret or hidden aspect of the dungeon that could impact adventurers, specifying its nature and potential implications.",
                "environmental_features": "Provide details about the dungeon's layout, specific traps, environmental challenges, and any unique hazards or features.",
                "factions_or_npcs": "Identify potential factions or unaffiliated NPCs within the dungeon. Describe their characteristics, motivations, and how they might interact with or affect adventurers. This should be in paragraph form, not JSON"
                }

                Ensure the response is in JSON format and provides comprehensive, immersive details, with rich and specific information for each section.
            `;

            try {
                const response = await generateGptResponse(prompt);
                this.dungeonSummary = JSON.parse(response);
            } catch (error) {
                console.error('Error generating dungeon summary:', error);
            }
        },
        async getRoomType(detailedDescription, categoryList) {
            const categorizationPrompt = `
                Given the following room description, determine the most appropriate category for the room from this list: ${categoryList.join(', ')}.
                Room Description: "${detailedDescription}"
                If the above description has characters who do not seem like enemies, it is likely a roleplaying_challenge.
                Be sure to only return the room type and no other text.
            `;

            try {
                const categoryResponse = await generateGptResponse(categorizationPrompt);
                // Assuming the response might contain extra text, extract only the category
                const extractedCategory = categoryResponse.split(',').map(category => category.trim()).find(category => categoryList.includes(category));
                return extractedCategory || null; // Return the extracted category or null if not found
            } catch (error) {
                console.error('Error determining room category:', error);
                return null; // Return null in case of an error
            }
        },

        async createDetailedRoom(room) {
            // Check if this room's detailed description already exists
            if (!this.detailedRooms.find(r => r.room_name === room.room_name)) {
                const detailedPrompt = `
                Generate a detailed description for a room named "${room.room_name}" in the dungeon named "${this.dungeonName}".
                Dungeon Summary: ${JSON.stringify(this.dungeonSummary)}
                Here is a short description of that room: ${room.room_description}
                The final sentence of the above description is usually the interactive_element, and the sentence preceding it is the unique_feature.

                Return the description in the following JSON format:
                {
                    "dungeon_room_dimensions": "<This part of the description should give specific dimensions of all features in the dungeon entrance and where they happen to be relative to each other. Technical details only, no need for descriptions or flavor.>",
                    "unique_feature_extra_details": "<Please provide extra details about the unique feature described in the read_aloud_description (sentence 3) if players decide to examine or interact with it>",
                    "interactive_element_extra_details": "<Please provide extra details about the interactive element (sentence 4). What is the nature of it? What is the lore/history/biography behind this feature? Are there any consequences positive or negative for interacting with this feature?>",
                    "hidden_secret": "<Provide a possible hidden secret in this room. This secret could be a passage to another room, a cache of valuables, a hiding monster, or a trap. Make sure to include details about the skill check or knowledge needed to uncover this secret.>"
                    "npc_or_monster_list": [
                        {
                            "name": "<The name of the monster or NPC>",
                            "description": "<Short Description of the monster or NPC: Provide details about appearance as well as what the creature is currently doing>",
                            "motivation": "<What does this NPC or monster want or fear? Perhaps some skillful roleplay can help avoid combat with this npc or monster or even perhaps recruit them as an ally? Provide this info>",
                            "challenge_rating": "<Provide a D&D 5e challenge_rating for this creature>"
                        }
                    ],
                }
                For the npc_or_monster_list, don't include the final boss or ruler of the dungeon unless the room appears to be a place where a final confrontation takes place.
        `;

                try {
                    const detailedResponse = await generateGptResponse(detailedPrompt);
                    // Assuming the response is a simple string
                    const parsedResponse = JSON.parse(detailedResponse);
                    parsedResponse.npc_or_monster_list.forEach((monster) => {
                        monster.loadingPart1 = false;
                        monster.loadingPart2 = false;
                        monster.statblock = null;
                    });
                    this.detailedRooms.push({
                        room_name: room.room_name,
                        read_aloud_description: room.room_description,
                        detailed_description: parsedResponse
                    });
                } catch (error) {
                    console.error('Error generating detailed room description:', error);
                }
            }
        },
        async generateRoomList() {
            const roomListPrompt = `
                Generate a list of 7 rooms for a dungeon named "${this.dungeonName}". Use the following room types and include a brief description for each room, highlighting key features and potential characters or monsters. Use the following dungeon summary as context:
                Dungeon Summary: ${JSON.stringify(this.dungeonSummary)}
                All lists should include an entrance, a room with a roleplaying challenge, a hidden room, and a room with a final showdown. Feel free to include other rooms unique to the character of the dungeon

                [
                {
                    "room_name": "Name of the Room",
                    "room_description": "Description of the room. Be sure to follow the 4 sentence room_description format provided below"
                },
                // ... more rooms with other specified types
                ]
                Here is a guide to the room_description format:
                ${dungeonFormatGuidelines()}
            `;

            try {
                const response = await generateGptResponse(roomListPrompt);
                const generatedRooms = JSON.parse(response); // Assuming 'response' is the JSON-formatted string from the AI
                // Update your data with valid rooms
                this.dungeonData = generatedRooms;
            } catch (error) {
                console.error('Error generating room list:', error);
            }
        },
        async generateMonster(npc, roomIndex, npcIndex) {
            const { name, challenge_rating, description } = npc;
            this.detailedRooms[roomIndex].detailed_description.npc_or_monster_list[npcIndex].loadingPart1  = true
            this.detailedRooms[roomIndex].detailed_description.npc_or_monster_list[npcIndex].loadingPart2  = true
            console.log(challenge_rating);
            const { monsterPart1, monsterPrompts, errorMessage: errorPart1 } = await generateStatblockPart1({
                monsterName: name,
                challengeRating: challenge_rating.toString(),
                monsterType: 'Balanced',
                monsterDescription: description,
                caster: false,
            });
            this.detailedRooms[roomIndex].detailed_description.npc_or_monster_list[npcIndex].loadingPart1  = false;
            this.detailedRooms[roomIndex].detailed_description.npc_or_monster_list[npcIndex].statblock  = monsterPart1;

            if (errorPart1) {
                console.error('Error in Part 1:', errorPart1);
                return;
            }

            const { monsterPart2, errorMessage: errorPart2 } = await completeStatblock(monsterPart1, monsterPrompts);
            this.detailedRooms[roomIndex].detailed_description.npc_or_monster_list[npcIndex].loadingPart2  = false;

            if (errorPart2) {
                console.error('Error in Part 2:', errorPart2);
                return;
            }

            if (monsterPart1 && monsterPart2) {
                let combined = { ...monsterPart1, ...monsterPart2 };
                this.detailedRooms[roomIndex].detailed_description.npc_or_monster_list[npcIndex].statblock  = combined;
            }
        },
    }
};
</script>
  
<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.app_container {
    @include cdr-text-body-400();
    color: $cdr-color-text-primary;
    max-width: 800px;
    margin: 20px auto;
    padding: 2px 30px 30px 30px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.dungeon_form {
    background-color: $cdr-color-background-secondary;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.generate_button {
    align-self: flex-start;
}

.read-aloud {
    background-color: $cdr-color-background-secondary;
    color: $cdr-color-text-secondary;
    padding: 1rem 2rem;
    font-style: italic;
}
</style>
  