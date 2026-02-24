import { dungeonFormatGuidelines } from "./prompts.mjs";
export function entrancePrompt(dungeonDetails) {
   return `
   Generate a description for a dungeon room. Below are some details about it:
   Dungeon Details: ${dungeonDetails}

   Guidelines for the read_aloud_description:
    ${dungeonFormatGuidelines()}
    {
        "dungeon_room_dimensions": "<This part of the description should give specific dimensions of all features in the dungeon entrance and where they happen to be relative to each other. Technical details only, no need for descriptions or flavor.>",
        "unique_feature_extra_details": "<Please provide extra details about the unique feature described in the read_aloud_description (sentence 3) if players decide to examine or interact with it>",
        "interactive_element_extra_details": "<Please provide extra details about the interactive element (sentence 4). What is the nature of it? What is the lore/history/biography behind this feature? Are there any consequences positive or negative for interacting with this feature>",
        "read_aloud_description": "<Description full text goes here. DO NOT INCLUDE ANYTHING HIDDEN TO THE PARTY>",
        "npc_or_monster_list": [
            {
                "name": "<The name of the monster or NPC>",
                "description": "<Short Description of the monster or NPC: Provide details about appearance as well as what the creature is currently doing>",
                "motivation": "<What does this NPC or monster want or fear? Perhaps some skillful roleplay can help avoid combat with this npc or monster or even perhaps recruit them as an ally? Provide this info>",
                "challenge_rating": "<Provide a D&D 5e challenge_rating for this creature>"
            }
        ],
    }`

}