<template>
    <div class="app_container">
        <div class="header">
        <h1>RPG Dungeon Generator</h1>
        <cdr-button size="small" modifier="secondary" @click="clearAllContent">Clear All Content</cdr-button>
        </div>
        <form @submit.prevent="generateDungeonSummary" class="dungeon_form">
            <cdr-input v-model="dungeonName" background="secondary" label="Dungeon Name" placeholder="Enter Dungeon Name" required>
            </cdr-input>
            <cdr-input :rows="7" tag="textarea" v-model="dungeonDetails" background="secondary" label="Dungeon Details"
                placeholder="Enter any additional dungeon details" class="dungeon-details">
            </cdr-input>
            <cdr-button type="submit" class="generate_button">Generate Dungeon Summary</cdr-button>
        </form>
        <h2>{{ dungeonName }}</h2>
        <cdr-accordion v-if="dungeonSummary" level="2" :opened="summaryOpen" @accordion-toggle="summaryOpen = !summaryOpen">
            <template #label>
                Dungeon Summary
            </template>
            <div >

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
        </cdr-accordion>

        <cdr-accordion v-if="dungeonList && dungeonList.length > 0" level="2" :opened="listOpen" @accordion-toggle="listOpen = !listOpen" id="room-list">
            <template #label>
                <div class="accordion-lineup">
                <div>
                Potential Room List
                </div>
                
                <cdr-tooltip id="tooltip-example" position="right">
                        <template #trigger>
                            <cdr-button size="small" :icon-only="true" :with-background="true"
                                @click.stop="generateRoomList">
                                <template #icon>
                                    <icon-reload />
                                </template>
                            </cdr-button>
                        </template>
                        <div>
                            Regenerate List
                        </div>
                    </cdr-tooltip>
                </div>
            </template>
            <div >
                <div v-for="(room, index) in dungeonList" :key="index">
                    <h3>{{ room.room_name }}</h3>
                    <p>{{ room.room_description }}</p>
                    <cdr-button @click="createDetailedRoom(room)" class="expand_button">Generate Detailed Room</cdr-button>
                </div>
            </div>
        </cdr-accordion>

        <div v-if="detailedRooms && detailedRooms.length > 0">
            <h2>Detailed Room Descriptions</h2>
            <cdr-accordion-group v-for="(room, index) in detailedRooms" :key="`detailed-room-${index}`" id="detailed-rooms">
                <cdr-accordion level="2" :opened="roomOpen[index]" @accordion-toggle="roomOpen[index] = !roomOpen[index]" :id="`detailed-room-${index}`">
                    <template #label>
                        {{ (index + 1).toString() + '. ' + room.room_name }}
                    </template>
                    <cdr-tooltip id="tooltip-example" position="left" class="delete-button">
                        <template #trigger>
                            <cdr-button size="small" :icon-only="true" :with-background="true"
                                @click.stop="deleteRoom(index)">
                                <template #icon>
                                    <icon-x-sm />
                                </template>
                            </cdr-button>
                        </template>
                        <div>
                            Delete Location
                        </div>
                    </cdr-tooltip>
                    <h3 class="room-name">{{ room.room_name }}</h3>
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
                            <StatblockBase v-if="(npc.loadingPart1 || npc.loadingPart2 || npc.statblock)"
                                :loadingPart1="npc.loadingPart1" :loadingPart2="npc.loadingPart2"
                                :monster="npc.statblock" :copyButtons="true" />
                        </div>
                    </div>
                </cdr-accordion>
            </cdr-accordion-group>
        </div>
    </div>
    <div v-if="dungeonSummary" class="instructions">
        <h3>Use Homebrewery to Make a Beautiful PDF of Your Generated Content!</h3>
        <cdr-list tag="ol" modifier="ordered">
            <li>Click the "Copy as Markdown" button below to copy the generated content in markdown format.</li>
            <li>Visit <a href="https://homebrewery.naturalcrit.com/new" target="_blank"
                    rel="noopener noreferrer">Homebrewery</a>.</li>
            <li>Paste the copied markdown into the document on the left hand side. Feel free to edit or reorder the
                content as
                you like.</li>
            <li>Enjoy the beautifully formatted content!</li>
        </cdr-list>
        <div class="markdown-button">
            <cdr-button @click="copyAsMarkdown">Copy as Markdown</cdr-button>
        </div>
    </div>
</template>
  
<script>
import { CdrInput, CdrButton, CdrList, CdrText, CdrAccordion, CdrAccordionGroup, CdrTooltip, IconXSm, IconReload } from "@rei/cedar";
import StatblockBase from './StatblockBase.vue';
import { generateGptResponse } from '../util/open-ai.mjs';
import { dungeonFormatGuidelines } from "../util/prompts.mjs";
import { generateStatblockPart1, completeStatblock } from '../util/statblock-generator.mjs';
import { convertDungeonToMarkdown } from '../util/convertToMarkdown.mjs';
export default {
    components: {
        CdrInput,
        CdrButton,
        CdrText,
        CdrList,
        CdrAccordion,
        CdrAccordionGroup,
        CdrTooltip,
        IconXSm,
        IconReload,
        StatblockBase
    },
    data() {
        return {
            summaryOpen: false,
            listOpen: false,
            roomOpen: [],
            dungeonName: '',
            dungeonDetails: '',
            dungeonSummary: null,
            dungeonList: null,
            detailedRooms: [],
        };
    },
    mounted() {
        this.loadFromLocalStorage();
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
                const response = await generateGptResponse(prompt, this.summaryValidation);
                this.dungeonSummary = JSON.parse(response);
                this.saveToLocalStorage();
            } catch (error) {
                console.error('Error generating dungeon summary:', error);
            }
        },
        summaryValidation(jsonString) {
            try {
                const jsonObj = JSON.parse(jsonString);
                const keys = [
                    'general_description',
                    'current_situation',
                    'historical_background',
                    'adventurers_motivation',
                    'secret',
                    'environmental_features',
                    'factions_or_npcs'
                ];
                return keys.every((key) => key in jsonObj);
            } catch (error) {
                return false;
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
                    const detailedResponse = await generateGptResponse(detailedPrompt, this.detailedRoomValidation);
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
                    this.roomOpen.push(true);
                    this.saveToLocalStorage();
                } catch (error) {
                    console.error('Error generating detailed room description:', error);
                }
            }
        },
        detailedRoomValidation(jsonString) {
            try {
                const jsonObj = JSON.parse(jsonString);

                // List of required keys
                const requiredKeys = [
                    'dungeon_room_dimensions',
                    'unique_feature_extra_details',
                    'interactive_element_extra_details',
                    'hidden_secret'
                ];

                // Check if all required keys are present
                const hasAllRequiredKeys = requiredKeys.every(key => key in jsonObj);
                if (!hasAllRequiredKeys) {
                    return false;
                }

                // Validate npc_or_monster_list if it exists
                if (jsonObj.hasOwnProperty('npc_or_monster_list')) {
                    if (!Array.isArray(jsonObj.npc_or_monster_list)) {
                        return false;
                    }

                    for (let npc of jsonObj.npc_or_monster_list) {
                        const npcKeys = ['name', 'description', 'motivation', 'challenge_rating'];
                        const hasAllNpcKeys = npcKeys.every(key => key in npc);
                        if (!hasAllNpcKeys) {
                            return false;
                        }
                        // Additional NPC validation can be added here
                    }
                }

                return true; // All validations passed
            } catch (error) {
                return false; // JSON parsing failed
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
                const response = await generateGptResponse(roomListPrompt, this.roomListValidation);
                const generatedRooms = JSON.parse(response); // Assuming 'response' is the JSON-formatted string from the AI
                // Update your data with valid rooms
                this.dungeonList = generatedRooms;
                this.saveToLocalStorage();
            } catch (error) {
                console.error('Error generating room list:', error);
            }
        },
        roomListValidation(jsonString) {
            try {
                const jsonObj = JSON.parse(jsonString);

                // Check if it's an array
                if (!Array.isArray(jsonObj)) {
                    return false;
                }

                // Validate each item in the array
                for (let item of jsonObj) {
                    // Check if both required keys are present
                    if (!item.hasOwnProperty('room_name') || !item.hasOwnProperty('room_description')) {
                        return false;
                    }
                    // Additional validation can be added here if needed
                }

                return true; // All items are valid
            } catch (error) {
                return false; // JSON parsing failed
            }
        },
        async generateMonster(npc, roomIndex, npcIndex) {
            const { name, challenge_rating, description } = npc;
            this.detailedRooms[roomIndex].detailed_description.npc_or_monster_list[npcIndex].loadingPart1 = true
            this.detailedRooms[roomIndex].detailed_description.npc_or_monster_list[npcIndex].loadingPart2 = true
            console.log(challenge_rating);
            const { monsterPart1, monsterPrompts, errorMessage: errorPart1 } = await generateStatblockPart1({
                monsterName: name,
                challengeRating: challenge_rating.toString(),
                monsterType: 'Balanced',
                monsterDescription: description,
                caster: false,
            });
            this.detailedRooms[roomIndex].detailed_description.npc_or_monster_list[npcIndex].loadingPart1 = false;
            this.detailedRooms[roomIndex].detailed_description.npc_or_monster_list[npcIndex].statblock = monsterPart1;

            if (errorPart1) {
                console.error('Error in Part 1:', errorPart1);
                return;
            }

            const { monsterPart2, errorMessage: errorPart2 } = await completeStatblock(monsterPart1, monsterPrompts);
            this.detailedRooms[roomIndex].detailed_description.npc_or_monster_list[npcIndex].loadingPart2 = false;

            if (errorPart2) {
                console.error('Error in Part 2:', errorPart2);
                return;
            }

            if (monsterPart1 && monsterPart2) {
                let combined = { ...monsterPart1, ...monsterPart2 };
                this.detailedRooms[roomIndex].detailed_description.npc_or_monster_list[npcIndex].statblock = combined;
                this.saveToLocalStorage();
            }
        },
        copyAsMarkdown() {
            // Replace `generatedMarkdown` with the variable that holds your generated markdown content.
            const markdownContent = convertDungeonToMarkdown(this.dungeonName, this.dungeonSummary, this.detailedRooms);

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
        },
        deleteRoom(index) {
            this.roomOpen[index] = false;
            this.detailedRooms.splice(index, 1);
            this.saveToLocalStorage();
        },
        clearAllContent() {
            this.dungeonName = '';
            this.dungeonDetails = '';
            this.dungeonSummary = null;
            this.dungeonList =  null;
            this.detailedRooms = [];

            localStorage.setItem('dungeonData', '{}');
        },
        saveToLocalStorage() {
            const dungeonData = {
                dungeonName: this.dungeonName,
                dungeonDetails: this.dungeonDetails,
                dungeonSummary: this.dungeonSummary,
                dungeonList: this.dungeonList,
                detailedRooms: this.detailedRooms
            }
            localStorage.setItem('dungeonData', JSON.stringify(dungeonData));
        },
        loadFromLocalStorage() {
            const dungeonData = JSON.parse(localStorage.getItem('dungeonData'));
            if (dungeonData) {
                this.dungeonName = dungeonData.dungeonName;
                this.dungeonDetails = dungeonData.dungeonDetails;
                this.dungeonSummary = dungeonData.dungeonSummary;
                this.dungeonList = dungeonData.dungeonList;
                this.detailedRooms = dungeonData.detailedRooms;
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

.header {
    display:flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
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

.accordion-lineup {
    display: flex;
    gap: 1.5rem;
    align-items: center;
}

.read-aloud {
    background-color: $cdr-color-background-secondary;
    color: $cdr-color-text-secondary;
    padding: 1rem 2rem;
    font-style: italic;
}

.room-name {
    font-weight: 600;
    font-size: 2rem;
}

.delete-button {
    position: absolute;
    top: 80px;
    right: 15px;
    z-index: 1;
}

.instructions {
    max-width: 700px;
    padding: 3rem;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.instructions h2 {
    margin-bottom: 1rem;
}

.instructions ol {
    padding-left: 1.5rem;
}

.instructions li {
    margin-bottom: 0.5rem;
}
</style>
  