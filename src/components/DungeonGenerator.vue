<template>
    <div class="app_container">
      <h1>RPG Dungeon Generator</h1>
      <form class="dungeon_form" @submit.prevent="generateDungeonDescription">
        <cdr-input class="dungeon_form_input" id="dungeon_name" v-model="dungeon_name" background="secondary" label="Dungeon Details:" :rows="4" required></cdr-input>
        <cdr-button class="generate_button" type="submit" :disabled="!dungeon_name">Generate Dungeon Details</cdr-button>
      </form>
      <div v-if="dungeon_details">
      <div class="read-aloud">
        <p>{{ dungeon_details.read_aloud_description }}</p>
      </div>
        <p>
            {{ dungeon_details.dungeon_room_approach }}
        </p>
        <p>
            {{ dungeon_details.dungeon_room_dimensions }}
        </p>
        <p>
            {{ dungeon_details.unique_feature_extra_details }}
        </p>
        <p>
            {{ dungeon_details.interactive_element_extra_details }}
        </p>
      <div v-if="currentChallengeType === 'guardian'">
        <p>
            {{ dungeon_details.guardian_name_and_description }}
        </p>
      </div>
    </div>
    </div>
  </template>
      
  <script>
  import { ref } from 'vue';
  import { dungeonFormatGuidelines } from "../util/prompts.mjs"
  import { CdrInput, CdrButton, CdrText } from "@rei/cedar";
  import _ from 'lodash';
  import "@rei/cedar/dist/cdr-fonts.css";
  import "@rei/cedar/dist/reset.css";
  import "@rei/cedar/dist/style/cdr-input.css";
  import "@rei/cedar/dist/style/cdr-button.css";
  import { generateGptResponse } from "../util/open-ai.mjs";
  
  export default {
    components: {
      CdrInput,
      CdrButton
    },
    setup() {
      const dungeon_name = ref('');
      const loading_dungeon = ref(false);
      const dungeon_details = ref(null);
      const currentChallengeType = ref('');
  
      const generateDungeonDescription = async () => {
        loading_dungeon.value = true;

      const challengeTypes = [
        'trap',
        'guardian',
      ]

      currentChallengeType.value = _.sample(challengeTypes);
      const guardianString =  (currentChallengeType.value === 'guardian') ? `"guardian_name_and_description": "<Return the name and detailed description of this creature. Provide details about the guardian's behavior, appearance and provide advice for roleplaying this creature as a GM>",` : '';

      const entranceChallenges = {
        'trap': 'There is a hidden trap near the entrance. Do not include trap details in the read_aloud_description but do include information about the trap in interactive_element_extra_details. Be sure to include information about how the trap is hidden, damage, saving throws and consequences for springing the trap',
        'guardian': 'There is a guardian of some sort at the entrance. This guardian could be several lower challenge creature or one higher challenge creature. Combat is not the only way to bypass this guardian, be sure to include possibilities for bypassing the guardian without conflict. Be sure to provide subtle clues for bypassing the guardian that may require a knowledge or perception check'
      }
        
      const prompt = `
          Generate a description for the entrance of a dungeon. Below are some details about it:
          Dungeon Details: ${dungeon_name.value}

          ${entranceChallenges[currentChallengeType.value]}

          Guidelines for the read_aloud_description:

          ${dungeonFormatGuidelines()}

          Please return the details of the dungeon in the following JSON format:

          {
            "dungeon_room_approach": "<Provide details about the approach to the dungeon entrance. Is there a long road or path to the dungeon? Are there hazards on long the way? What types of checks or actions are required to bypass or overcome these hazards? Technical details only, no need for descriptions or flavor.>",
            "dungeon_room_dimensions": "<This part of the description should give specific dimensions of all features in the dungeon entrance and where they happen to be relative to each other. Technical details only, no need for descriptions or flavor.>",
            "unique_feature_extra_details": "<Please provide extra details about the unique feature described in the read_aloud_description (sentence 3) if players decide to examine or interact with it>",
            "interactive_element_extra_details": "<Please provide extra details about the interactive element (sentence 4). What is the nature of it? What is the lore/history/biography behind this feature? Are there any consequences positive or negative for interacting with this feature>",
            ${guardianString}
            "read_aloud_description": "<Description full text goes here. DO NOT INCLUDE ANYTHING HIDDEN TO THE PARTY>"
          }
    `;
    function validateDungeonJSON(jsonString) {
      try {
        const jsonObj = JSON.parse(jsonString);
        const keys = [
        "dungeon_room_approach",
        "dungeon_room_dimensions",
        "unique_feature_extra_details",
        "interactive_element_extra_details",
        "read_aloud_description",
        ];
        if (currentChallengeType.value === 'guardian') {
          keys.push('guardian_name_and_description');
        }
        return keys.every((key) => key in jsonObj);
      } catch (error) {
        return false;
      }
    }
  
        try {
          const response = await generateGptResponse(prompt, validateDungeonJSON);
          dungeon_details.value = JSON.parse(response);
          loading_dungeon.value = false;
        } catch (error) {
          console.error("Error generating dungeon description:", error);
        }
      }
  
      return {
        dungeon_name,
        loading_dungeon,
        dungeon_details,
        currentChallengeType,
        generateDungeonDescription
      };
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
  