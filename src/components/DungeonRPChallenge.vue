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
        'stranger',
        'outcast_individual',
        'original_inhabitant',
        'two_parties_in_conflict',
      ];

      //currentChallengeType.value = _.sample(challengeTypes);
      currentChallengeType.value = 'stranger';

      const challengeGuidelines = (type) => {
        if (type !== 'two_parties_in_conflict'){
        return `
            "character_name": "<Please provide the character's name.>",
            "description_of_position": "<Provide a specific and detailed description of their job or position in society, including a detail that sets them apart from others in that position. && Examples: Bjarti is the crown prince of the bearfolk Kingdom Bjarnvoldenheim, and he also happens to have the mind of a child. && Gorton Traxer grew up watching vids of surgery procedures while other kids were playing the latest BD adventure--so it's not surprising he became one of the best known ripperdocs in Night city. && Portobas Dallington is the fifth (and nearly forgotten) child of the preeminent Dallington family, he aspires to be a great hero one day, but his parents barely remember his name. && Waverly Radcliffe is a consummate liar, but the fact that at least half of his stories of being a privateer are in fact true (if not embellished for dramatic effect).>",
            "reason_for_being_there": "<Provide a reason for why they happen to be in this dungeon room that aligns with their goals and aspirations.>",
            "distinctive_feature_or_mannerism": "<Provide a distinctive feature or peculiar mannerism observable in their actions. && Examples: His pale face is flushed with sweat and exertion from walking around in the plate armor, and he has a bit of a squeaky voice. && Dibbledop absentmindedly tinkers with a small mechanical spider, occasionally muttering to himself as he makes adjustments. && Waverly is easy to pick out from a crowd, as he often gestures dramatically with his hands as he spins tales of his past exploits, punctuating his words with sips of his drink.>",
            "character_secret": "<Provide a secret or hidden motivation that the character has that they are keeping from others. && Examples: Portobas secretly hopes that by completing a heroic quest, he will win the approval of his family and be recognized as a true hero. && Although Dibbledop manages to keep a calm facade, he is actually on the run from a rival inventor who wants to steal his clockwork mantis design.>",
            "character_read_aloud_description": "<Provide a concise 2-3 sentence description that provides evocative character details and also gives a clue as to what the character is up to. This is meant for a GM to read aloud to players when they meet this character.>",
            "challenge_rating": "<Provide a challenge rating for this character>",
        `
        }
      };
      const RPChallenges = {
        'stranger': 'In this room the adventurers encounter a stranger whose goals may run counter to the party. This stranger will have different motivations than the adventuring party and may be good, evil or neutral. Although the stranger is also likely to be an enemy of the residents of the dungeon, it does not mean they are allies with the adventurers. This stranger may try to trick or set up an obstacle to inhibit the progress or the party somehow. Provide potential motivations for the stranger and ways to circumvent or negotiate with them. Detail several potential interaction outcomes.',
        'outcast_individual': 'In this room the adventurers encounter an outcast. This individual will have been cast out by whoever controls this dungeon. This outcast could be an enemy or ally to the party depending on their motivation.',
        'original_inhabitant': 'Whoever occupies this dungeon now, this original inhabitant was there before they took over. This being has remained unmolested by the current inhabitants either by remaining hidden or being too powerful to mess with or perhaps a combination to both. Perhaps the original inhabitant is neutral or indifferent to what the current inhabitants of the dungeon are up to as well. Describe some potential interaction challenges with this original inhabitant. Detail several potential interaction outcomes.',
        'two_parties_in_conflict': 'The party stumbles upon two individuals or groups of individuals in the middle of an argument. What is the nature of the argument and what are the consequences of the party for allying with either side or perhaps helping the two parties reach a compromise? Detail several potential interaction outcomes.',
      };

      const prompt = `
          Generate a description for a room in a dungeon. Below are some details about it:
          Dungeon Details: ${dungeon_description.value}

          ${RPChallenges[currentChallengeType.value]}

          Guidelines for the read_aloud_description (sentence 4 should describe an aspect of the roleplay challenge):
          Examples are separated by '&&' within each instruction. Also each key should flow into the next as though they are part of the same summary. Use transition words to improve the flow between them:
          ${dungeonFormatGuidelines()}

          Please return the details of the dungeon in the following JSON format:

          {
            "dungeon_room_dimensions": "<This part of the description should give specific dimensions of all features in the dungeon entrance and where they happen to be relative to each other. Technical details only, no need for descriptions or flavor.>",
            "unique_feature_extra_details": "<Please provide extra details about the unique feature described in the read_aloud_description (sentence 3) if players decide to examine or interact with it>",
              ${challengeGuidelines(currentChallengeType.value)}
            "room_read_aloud_description": "<Description full text goes here. DO NOT INCLUDE ANYTHING HIDDEN TO THE PARTY>"
          }
    `;

    const generateMonster = async () => {
      if (currentChallengeType.value === 'guardian' && dungeon_details.value) {
        const guardianName = dungeon_details.value.encounter_individual_name;
        const challengeRating = dungeon_details.value.encounter_individual_challenge_rating;
        const monsterDescription = dungeon_details.value.encounter_individual_description;

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