<template>
    <form class="dungeon_form" @submit.prevent="generateDungeonDescription">
      <cdr-input class="dungeon_form_input" id="dungeon_name" v-model="dungeon_name" background="secondary"
        label="Dungeon Name:" required></cdr-input>
      <cdr-input class="dungeon_form_input" id="dungeon_description" v-model="dungeon_description" background="secondary"
        label="Dungeon Details:" :rows="4"></cdr-input>
      <cdr-button class="generate_button" type="submit" :disabled="!dungeon_name">Generate Dungeon Details</cdr-button>
    </form>
    <div class="dungeon-details" v-if="dungeon_details">
      <h2>{{ dungeon_name }}</h2>
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
        <h2>
            {{ dungeon_details.guardian_name }}
        </h2>
        <p>
          {{ dungeon_details.guardian_description }}
        </p>
        <StatblockBase v-if="!errorMessage && (loadingPart1 || loadingPart2 || monster)" :loadingPart1="loadingPart1" :loadingPart2="loadingPart2" :monster="monster" columns="one_column" />
      </div>
    </div>
</template>
      
<script>
import { ref } from 'vue';
import { dungeonFormatGuidelines } from "../util/prompts.mjs";
import { CdrInput, CdrButton, CdrText, CdrSelect } from "@rei/cedar";
import StatblockBase from './StatblockBase.vue';
import _ from 'lodash';
import "@rei/cedar/dist/cdr-fonts.css";
import "@rei/cedar/dist/reset.css";
import "@rei/cedar/dist/style/cdr-input.css";
import "@rei/cedar/dist/style/cdr-button.css";
import { generateGptResponse } from '../util/open-ai.mjs';
import { generateStatblockPart1, completeStatblock } from '../util/statblock-generator.mjs';

export default {
  components: {
    CdrInput,
    CdrButton,
    CdrText,
    CdrSelect,
    StatblockBase
  },
  setup() {
    const roomType = ref('Entrance');
    const dungeon_name = ref('');
    const dungeon_description = ref('');
    const loading_dungeon = ref(false);
    const dungeon_details = ref(null);
    const currentChallengeType = ref('');
    const monster = ref(null);
    const loadingPart1 = ref(false);
    const loadingPart2 = ref(false);
    const errorMessage = ref('');

    const generateDungeonDescription = async () => {
      loading_dungeon.value = true;

      const challengeTypes = [
        'trap',
        'guardian',
        'environmental',
      ];

      currentChallengeType.value = _.sample(challengeTypes);
      //currentChallengeType.value = 'guardian';

      const challengeGuidelines = {
        'trap': '',
        'guardian': `
        "guardian_name": "<Return the name of this creature>",
        "guardian_description": "<Return the name and detailed description of this creature. Provide details about the guardian's behavior, appearance and provide advice for roleplaying this creature as a GM. Provide one non-combat solution for bypassing this guardian.>",
        "guardian_challenge_rating": "<Return a number that gives an appropriate D&D 5th edition challenge rating>" 
        `,
        'environmental': `"environmental_challenges": "<Describe the environmental obstacles in detail. Include information about potential hazards, skill checks required, and any resources or tools that may aid in overcoming these challenges.>"`,
      };
      const entranceChallenges = {
        'trap': 'There is a hidden trap near the entrance. Do not include trap details in the read_aloud_description but do include information about the trap in interactive_element_extra_details. Be sure to include information about how the trap is hidden, damage, saving throws and consequences for springing the trap.',
        'guardian': 'There is a guardian of some sort at the entrance. This guardian could be several lower challenge creatures or one higher challenge creature. Combat is not the only way to bypass this guardian, be sure to include possibilities for bypassing the guardian without conflict. Provide subtle clues for bypassing the guardian that may require a knowledge or perception check.',
        'environmental': 'The entrance is obscured or hindered by environmental factors like thick vegetation, a magical storm, or unstable terrain. Detail the environmental challenges in interactive_element_extra_details, including potential skill checks and consequences of failure.',
      };

      const prompt = `
          Generate a description for the entrance of a dungeon. Below are some details about it:
          Dungeon Details: ${dungeon_description.value}

          ${entranceChallenges[currentChallengeType.value]}

          Please return the details of the dungeon in the following JSON format:

          {
            "dungeon_room_approach": "<Provide details about the approach to the dungeon entrance. Is there a long road or path to the dungeon? Are there hazards on long the way? What types of checks or actions are required to bypass or overcome these hazards? Technical details only, no need for descriptions or flavor.>",
            "dungeon_room_dimensions": "<This part of the description should give specific dimensions of all features in the dungeon entrance and where they happen to be relative to each other. Technical details only, no need for descriptions or flavor.>",
            "unique_feature_extra_details": "<Please provide extra details about the unique feature described in the read_aloud_description (sentence 3) if players decide to examine or interact with it>",
            "interactive_element_extra_details": "<Please provide extra details about the interactive element (sentence 4). What is the nature of it? What is the lore/history/biography behind this feature? Are there any consequences positive or negative for interacting with this feature>",
              ${challengeGuidelines[currentChallengeType.value]}
            "read_aloud_description": "<Description full text goes here. DO NOT INCLUDE ANYTHING HIDDEN TO THE PARTY>"
          }

          Guidelines for the read_aloud_description are below. Be sure to follow this format:

          ${dungeonFormatGuidelines()}

          Focus on atmosphere for the read_aloud_description. Don't reuse any text provided in this prompt. This is just to provide context.
    `;

    const generateMonster = async () => {
      if (currentChallengeType.value === 'guardian' && dungeon_details.value) {
        const guardianName = dungeon_details.value.guardian_name;
        const challengeRating = dungeon_details.value.guardian_challenge_rating;
        const monsterDescription = dungeon_details.value.guardian_description;

        loadingPart1.value = true;
        loadingPart2.value = true;
        const { monsterPart1, monsterPrompts, errorMessage: errorPart1 } = await generateStatblockPart1({
          monsterName: guardianName,
          challengeRating: challengeRating,
          monsterType: 'Balanced',
          monsterDescription: monsterDescription,
          caster: false,
        });
        loadingPart1.value = false;
        monster.value = monsterPart1;
        if (errorPart1) {
          console.error('Error in Part 1:', errorPart1);
          return;
        }

        const { monsterPart2, errorMessage: errorPart2 } = await completeStatblock(monsterPart1, monsterPrompts);
        loadingPart2.value = false;
        //console.log('Complete Monster', completeMonster);
        if (errorPart2) {
          console.error('Error in Part 2:', errorPart2);
          return;
        }

        if (monsterPart1 && monsterPart2) {
          let combined = {
            ...monsterPart1,
            ...monsterPart2
          };
          monster.value = combined;
          console.log("MONSTERVALUE", combined);
        }
      }
    };
      function validateDungeonJSON(jsonString) {
        try {
          const jsonObj = JSON.parse(jsonString);
          const baseKeys = [
            "dungeon_room_approach",
            "dungeon_room_dimensions",
            "unique_feature_extra_details",
            "interactive_element_extra_details",
            "read_aloud_description",
          ];

          // Additional keys based on challenge type
          const additionalKeys = {
            'trap': [],
            'guardian': ['guardian_description', 'guardian_name'],
            'environmental': ['environmental_challenges'],
          };

          // Combine base keys with keys specific to the current challenge type
          const requiredKeys = baseKeys.concat(additionalKeys[currentChallengeType.value]);

          return requiredKeys.every(key => key in jsonObj);
        } catch (error) {
          return false;
        }
      }
      try {
        const response = await generateGptResponse(prompt, validateDungeonJSON);
        dungeon_details.value = JSON.parse(response);
        await generateMonster();
        console.log("Monster Value", monster.value);
        loading_dungeon.value = false;
      } catch (error) {
        console.error("Error generating dungeon description:", error);
      }
    }

    return {
      dungeon_name,
      dungeon_description,
      loading_dungeon,
      dungeon_details,
      roomType,
      errorMessage,
      loadingPart1,
      loadingPart2,
      monster,
      currentChallengeType,
      generateDungeonDescription
    };
  }
};
</script>
      
<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

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