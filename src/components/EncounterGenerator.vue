<template>
  <div class="app-container">
    <h3>Add a Monster</h3>
    <div class="monster-form">
      <!-- Form inputs for monster details -->
      <div class="creature-form-left">
        <cdr-input label="Name:" v-model="newMonster.name" placeholder="Monster Name"></cdr-input>
        <cdr-input label="Short Description:" v-model="newMonster.description" placeholder="Description"
          :rows="5"></cdr-input>

      </div>
      <div class="creature-form-right">
        <div class="label-standalone">
          <div class="label-standalone__label-wrapper">
            <label class="label-standalone__label">Count:</label>
          </div>
          <div class="label-standalone__input-wrap label-standalone__input-spacing">
            <div class="cdr-input-wrap"> <input class="counter-input" v-model.number="newMonster.quantity" type="number"
                label="level" /></div>
          </div>
          <div class="label-standalone__post-content"></div>
        </div>
        <cdr-select v-model="newMonster.cr" label="CR" prompt="CR" :options="challengeRatingData.fullArray" required />
        <cdr-select label="Type:" v-model="newMonster.type">
          <option value="Defensive">Defensive</option>
          <option value="Offensive">Offensive</option>
          <option value="Balanced">Balanced</option>
        </cdr-select>
      </div>
      <div>
        <cdr-checkbox label="Spellcaster:" v-model="newMonster.isSpellcaster">Creature is a Spellcaster</cdr-checkbox>

        <cdr-button @click="addMonster">Add Monster</cdr-button>
      </div>

    </div>
    <div class="party-and-xp">
      <div class="party-composition">
        <div>
          <h4>Party Composition</h4>
        </div>
        <div class="form-labels">
          <div>Players</div>
          <div></div>
          <div>Level</div>
        </div>
        <div v-for="(group, index) in groups" :key="index" class="group-row">
          <input class="counter-input" v-model.number="group.members" type="number" label="players" />
          <div class="separator">x</div>
          <input class="counter-input" v-model.number="group.level" type="number" label="level" />
          <cdr-button @click="removeGroup(index)" class="remove-btn">x</cdr-button>
        </div>
        <div class="add-group-row">
          <cdr-button @click="addGroup">+ Add Group</cdr-button>
        </div>
      </div>

      <div class="xp-thresholds">
        <div class="grid-header">
          <div>Difficulty</div>
          <div>XP</div>
        </div>
        <div class="grid-row" v-for="(value, key) in totalXPThreshold" :key="key">
          <div>{{ key }}</div>
          <div>{{ value }}</div>
        </div>
      </div>

      <div class="monster-list">
        <h4>Monsters</h4>
        <div v-for="(monster, index) in monsters" :key="index" class="monster-entry">
          <div class="monster-details">
            <div>{{ monster.name }}</div>
            <div>

              <div class="cr-and-xp">
                <span>CR {{ monster.cr }}</span>
                <span>{{ crToXP[monster.cr] }} XP</span>
              </div>




            </div>
          </div>
          <div class="count-and-remove">
            <div class="monster-count">
              <div class="form-labels">
                <div>Count</div>
              </div>
              <input class="counter-input" v-model.number="monster.quantity" type="number" label="count" />
            </div>
            <cdr-tooltip id="tooltip-example" position="right" class="delete-button">
              <template #trigger>
                <cdr-button size="small" :icon-only="true" :with-background="true" @click.stop="removeMonster(index)">
                  <template #icon>
                    <icon-x-sm />
                  </template>
                </cdr-button>
              </template>
              <div>
                Remove Monster
              </div>
            </cdr-tooltip>
          </div>

        </div>
      </div>
    </div>
    <div style="text-align: center;">
      <strong>Total Adjusted XP: {{ xpString }}</strong>
      <h3 :class="'difficulty-' + encounterDifficultyLevel.toLowerCase()">
        Encounter Difficulty: {{ encounterDifficultyLevel }}
      </h3>
    </div>
    <form @submit.prevent="generateEncounter" class="encounter_form">


    </form>

  </div>
</template>

<script>
import { ref, reactive, watchEffect } from 'vue';
import encounterDifficulty from '../data/encounter-difficulty.json';
import { CdrInput, CdrButton, CdrText, CdrSelect, CdrCheckbox, CdrLink, CdrList, CdrSkeleton, CdrSkeletonBone, IconXSm, CdrTooltip } from "@rei/cedar";
import challengeRatingData from '../data/challengeRatings.json';
import crToXP from '../data/cr-to-xp.json';
import { generateGptResponse } from "../util/open-ai.mjs";

export default {
  components: {
    CdrInput,
    CdrButton,
    CdrText,
    CdrSelect,
    CdrLink,
    CdrList,
    CdrCheckbox,
    CdrSkeleton,
    CdrSkeletonBone,
    IconXSm,
    CdrTooltip
  },
  setup() {
    const groups = reactive([{ members: 1, level: 1 }]);
    const totalXPThreshold = ref({ Easy: 0, Medium: 0, Hard: 0, Deadly: 0 });
    const totalMonsterXP = ref(0);
    const adjustedTotalXP = ref(0);
    const xpString = ref('');
    const encounterDifficultyLevel = ref('');
    const monsters = ref([]);
    const partyComposition = ref([]);

    function addGroup() {
      groups.push({ members: 1, level: 1 });
    }

    function removeGroup(index) {
      groups.splice(index, 1);
    }

    function calculateTotalMonsterXP() {
      return monsters.value.reduce((total, monster) => {
        const xp = crToXP[monster.cr] || 0;
        return total + (xp * monster.quantity);
      }, 0);
    };

    function getMultiplier(numberOfMonsters) {
      if (numberOfMonsters === 1) return 1;
      if (numberOfMonsters === 2) return 1.5;
      if (numberOfMonsters >= 3 && numberOfMonsters <= 6) return 2;
      if (numberOfMonsters >= 7 && numberOfMonsters <= 10) return 2.5;
      if (numberOfMonsters >= 11 && numberOfMonsters <= 14) return 3;
      if (numberOfMonsters >= 15) return 4;
      return 1; // Default multiplier if something goes wrong
    }

    function determineEncounterDifficulty(totalXPThreshold) {
      // Compare totalMonsterXP to the totalXPThreshold to determine the encounter's difficulty level
      //const totalMonsterXP = calculateTotalMonsterXP();
      if (adjustedTotalXP.value >= totalXPThreshold.Deadly) {
        return 'Deadly';
      } else if (adjustedTotalXP.value >= totalXPThreshold.Hard) {
        return 'Hard';
      } else if (adjustedTotalXP.value >= totalXPThreshold.Medium) {
        return 'Medium';
      } else if (adjustedTotalXP.value >= totalXPThreshold.Easy) {
        return 'Easy';
      } else {
        return 'Trivial'; // Assuming totalMonsterXP is below the 'Easy' threshold
      }
    }


    const newMonster = ref({
      name: 'Unnamed',
      cr: '1',
      description: '',
      quantity: 1,
      type: 'Balanced', // Default selection
      isSpellcaster: false
    });

    const addMonster = () => {
      monsters.value.push({ ...newMonster.value });
      // Reset form, defaulting type to Balanced and isSpellcaster to false
      newMonster.value = { name: 'Unnamed', cr: '1', description: '', quantity: 1, type: 'Balanced', isSpellcaster: false };
    };

    const removeMonster = (index) => {
      monsters.value.splice(index, 1);
    };

    const incrementQuantity = (index) => {
      monsters.value[index].quantity++;
    };

    const decrementQuantity = (index) => {
      if (monsters.value[index].quantity > 1) {
        monsters.value[index].quantity--;
      }
    };

    function calculateDifficulty(partyComposition) {
      const totalXP = { Easy: 0, Medium: 0, Hard: 0, Deadly: 0 };

      partyComposition.forEach(level => {
        // Since the first level is indexed at zero, subtract 1 from the character's level
        const difficulty = encounterDifficulty.encounter_difficulty[level - 1];
        if (difficulty) {
          totalXP.Easy += difficulty.Easy;
          totalXP.Medium += difficulty.Medium;
          totalXP.Hard += difficulty.Hard;
          totalXP.Deadly += difficulty.Deadly;
        }
      });

      return totalXP;
    }

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Automatically populate the partyComposition array whenever 'groups' changes
    watchEffect(() => {
      const newComposition = [];
      groups.forEach(group => {
        for (let i = 0; i < group.members; i++) {
          newComposition.push(group.level);
        }
      });
      totalMonsterXP.value = calculateTotalMonsterXP();
      const multiplier = getMultiplier(monsters.value.reduce((acc, curr) => acc + curr.quantity, 0));
      adjustedTotalXP.value = totalMonsterXP.value * multiplier;
      partyComposition.value = newComposition;
      totalXPThreshold.value = calculateDifficulty(partyComposition.value);
      console.log("adjustedTotalXP", adjustedTotalXP.value);
      encounterDifficultyLevel.value = determineEncounterDifficulty(totalXPThreshold.value);
      xpString.value = numberWithCommas(adjustedTotalXP.value);
      console.log(encounterDifficultyLevel.value)
    });

    return {
      groups,
      partyComposition,
      totalXPThreshold,
      addGroup,
      removeGroup,
      monsters,
      newMonster,
      addMonster,
      removeMonster,
      encounterDifficultyLevel,
      crToXP,
      xpString,
      IconXSm,
      incrementQuantity,
      decrementQuantity,
      challengeRatingData,
      CdrInput,
      CdrTooltip,
      CdrButton,
      CdrText,
      CdrSelect,
      CdrLink,
      CdrList,
      CdrSkeleton,
      CdrSkeletonBone
    };
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

.encounter_form {
  background-color: $cdr-color-background-secondary;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.monster-form {
  display: grid;
  grid-template-columns: 9fr 2fr;
  gap: 10px; // Space between grid items

  .creature-form-right {
    display: grid;
    grid-template-columns: 1fr;

    .label-standalone,
    cdr-select {
      display: grid; // Utilize the grid layout from the parent
    }

    .cdr-input-wrap,
    cdr-select {

      input,
      .cdr-select__input {
        max-width: 100%; // Ensures input and select fill their container
        // Optionally adjust height if necessary
      }
    }
  }

  cdr-input,
  cdr-select,
  cdr-checkbox {
    // Styles for other form elements to ensure they're compact
    max-width: 100%;
  }

  .cdr-button {
    justify-self: start; // Align the button to the start of the grid column
  }
}

.monster-list {
  h4 {
    margin-top: 0;
  }

  .cr-and-xp {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 1.5rem;
  }

  .monster-count {
    width: 5rem;
    font-size: 1.5rem;
    display: grid;
    grid-template-columns: 1fr;

  }

  .monster-entry {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    /* Space between monster entries */
  }

  .monster-details>div:first-child {
    font-weight: bold;
    /* Monster name emphasized */
  }

  .monster-details>div:last-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 5px;
    /* Adjust based on your design preference */
  }
}


.counter-input {
  max-width: 100px;
  font-family: Graphik, "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.016rem;
  font-size: 1.6rem;
  line-height: 2.2rem;
  font-weight: 500;
  color: #20201d;
  border: 0;
  background-color: rgba(244, 242, 237, 0.15);
  box-shadow: inset 0 0 0 0.1rem #928b80;
  border-radius: 0.4rem;
  fill: #928b80;
  border-radius: 0.4rem;
  padding: 0.8rem;
  height: 4rem;
  display: block;
  width: 100%;
  overflow: visible;
  margin: 0;

}

.count-and-remove {
  display: flex;
  gap: 1rem;

  .delete-button {
    margin-top: 3rem;
  }
}

.party-and-xp {
  display: grid;
  gap: 1rem;
  grid-template-columns: 2fr 2fr 3fr;
}

.party-composition {
  display: flex;
  flex-direction: column;

  h4 {
    margin: 0 0 .5rem 0;
  }

  .form-labels {
    display: grid;
    grid-template-columns: 5rem 3rem 5rem 1fr;
    font-size: 1.5rem;
    gap: .5rem;
  }

  .group-row {
    display: grid;
    grid-template-columns: 5rem 3rem 5rem 5rem; // Adjust based on content size
    gap: .5rem; // Adjust the space between grid items
    align-items: center;

    margin-bottom: 1rem;

    .separator {
      text-align: center;
    }

    button {
      margin-left: 1rem;
    }

    .remove-btn {
      // Style your remove button if needed
    }
  }

  .delete-button {
    margin-top: 3rem;
  }

  .add-group-row {
    display: grid;
    grid-template-columns: 14rem 1fr;
  }
}

.label-standalone {
  display: grid;
  grid-template-areas:
    "label label info"
    "input input input"
    "post post post";

  &__label-wrapper {
    grid-area: label;
  }

  &__label {
    font-family: Graphik, "Helvetica Neue", sans-serif;
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.016rem;
    font-size: 1.4rem;
    line-height: 1.8rem;
    color: rgba(12, 11, 8, 0.75);
    margin: 0;
  }

  &__input-wrap {
    margin-top: 0.8rem;
    position: relative;
    display: flex;
    grid-area: input;
  }

  &__post-content {
    grid-area: post;
  }
}

.xp-thresholds {
  max-width: 20rem;
  font-size: 1.5rem;

  .grid-header,
  .grid-row {
    display: grid;
    grid-template-columns: 1fr 1fr; // Distributes space evenly between the two columns
    gap: 10px; // Adjust based on your design preference
    align-items: center;
  }

  .grid-header {
    font-weight: bold;
    text-align: left;
    border-radius: 5px; // Optional: for styling
  }

  .grid-row {
    padding: 5px; // Optional: adjust as needed for spacing
    border-bottom: 1px solid #ccc; // Optional: visual separator between rows

    &:last-child {
      border-bottom: none; // Removes the border for the last item
    }
  }
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

.xp-thresholds {
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
  }
}

.difficulty-trivial {
  color: #999;
  /* Grey - for trivial difficulty */
}

.difficulty-easy {
  color: #2E8B57;
  /* Green - for easy difficulty */
}

.difficulty-medium {
  color: #FFA500;
  /* Orange - for medium difficulty */
}

.difficulty-hard {
  color: #FF4500;
  /* Orangered - for hard difficulty */
}

.difficulty-deadly {
  color: #B22222;
  /* FireBrick - for deadly difficulty */
}
</style>
