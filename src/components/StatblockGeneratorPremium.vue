<template>
  <div class="app-container">


    <cdr-button modifier="secondary" class="sidebar-toggle" @click="isSidebarVisible = !isSidebarVisible"
      v-show="windowWidth <= 900">
      <template #icon-left>
        <icon-navigation-menu inherit-color />
      </template>
      {{ isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar' }}
    </cdr-button>
    <!-- Overlay to close sidebar on click -->
    <div class="overlay" v-show="isSidebarVisible && windowWidth <= 900" @click="isSidebarVisible = false"></div>
    <div class="sidebar" :style="sidebarStyle">
      <ul class="saved-statblocks">
        <li v-for="(monsterItem, index) in monsters" :key="index" @click="selectMonster(index)"
          :class="{ 'active': activeMonsterIndex === index }">
          {{ monsterItem.name }} (CR: {{ monsterItem.challenge_rating }})
        </li>
      </ul>

    </div>
    <div class="generator-container">

      <div class="intro-container">
        <h1>Kenji's D&D 5e Monster Statblock Generator -- Premium Version</h1>
        <p>
          Welcome to the D&D 5e Statblock
          Generator -- Premium Version! This premium version has no limits on the number of creatures you can generate
          per
          day.
          Enter the name of the monster and choose a monster type and CR.
          Monster types determine whether a monster is stronger on defense, offense or balanced. CR will determine
          how
          strong a monster is, with higher CRs making for stronger monsters. Finally, if you wish the creature to
          be
          able to cast spells, please use select the “Creature is a spellcaster” checkbox. When the ChatGPT API is
          slow it can take up to two minutes to generate a creature. Once generated, you can export a creature to
          homebrewery, foundry VTT or the Improved Initiative app.
        </p>
      </div>
      <form @submit.prevent="generateStatblock" class="monster-form">
        <div class="form-row-top">
          <cdr-input id="monsterName" v-model="monsterName" background="secondary"
            :label="'Monster Name (Example: Headless Horseman)'" required />
          <cdr-select v-model="monsterType" label="type"
            :options="['Random', 'Stronger Defense', 'Balanced', 'Stronger Offense']" required />
          <cdr-select v-model="selectedChallengeRating" label="CR" prompt="CR" :options="challengeRatingData.fullArray"
            required />
        </div>
        <div class="form-row-mid">
          <cdr-input v-model="monsterDescription" :optional="true"
            label='Monster Description / Special Instructions: Input extra details about the monster or any special instructions. Examples: "output the statblock in German", "this creature has a flying speed of 60ft", "this creature has an ability to do X". Feel free to add as much or as little detail as you like, or you can leave this field blank.'
            :rows="4" />
        </div>
        <div class="form-row-end">
          <cdr-checkbox v-model="caster">Creature is a spellcaster</cdr-checkbox>
        </div>


        <cdr-button :disabled="loadingPart1 || loadingPart2" class="monster-form-button" type="submit">
          {{ 'Generate Statblock' }}
        </cdr-button>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <Statblock v-if="!errorMessage && (loadingPart1 || loadingPart2 || monster)" :loadingPart1="loadingPart1"
        :loadingPart2="loadingPart2" :monster="monster" />
    </div>
  </div>
</template>

<script>
//Include a "Decapitate" action, but make sure that the target is already suffering a condition inflicted by the headless horseman for it to work.
import { ref, onMounted, computed, onUnmounted } from 'vue';
import Statblock from './Statblock.vue';
import { generateGptResponse } from "../util/open-ai.mjs";
import { CdrInput, CdrButton, CdrCheckbox, CdrSelect, CdrToggleButton, CdrToggleGroup, CdrList, IconNavigationMenu } from "@rei/cedar";
import "@rei/cedar/dist/style/cdr-input.css";
import "@rei/cedar/dist/style/cdr-list.css";
import "@rei/cedar/dist/style/cdr-button.css";
import "@rei/cedar/dist/style/cdr-checkbox.css";
import "@rei/cedar/dist/style/cdr-select.css";
import "@rei/cedar/dist/style/cdr-toggle-group.css";
import "@rei/cedar/dist/style/cdr-toggle-button.css";
import challengeRatingData from '../data/challengeRatings.json';
import creatureTemplates from '../data/creatureTemplates.json';
import { createStatblockPrompts } from "../util/monster-prompts.mjs";

export default {
  components: {
    Statblock,
    CdrInput,
    CdrButton,
    CdrList,
    CdrCheckbox,
    CdrSelect,
    CdrToggleButton,
    CdrToggleGroup,
    IconNavigationMenu,
  },
  setup() {
    const loadingPart1 = ref(false);
    const loadingPart2 = ref(false);
    const monsterName = ref('');
    const monsterType = ref('Random');
    const monsterDescription = ref('');
    const selectedChallengeRating = ref(null);
    const monster = ref(null);
    const caster = ref(false);
    const errorMessage = ref('');
    const windowWidth = ref(window.innerWidth);
    const monsters = ref([]);

    onMounted(() => {
      const savedMonsters = localStorage.getItem('monsters');
      if (savedMonsters) {
        monsters.value = JSON.parse(savedMonsters);
      }
      updateWindowWidth(); // Set initial width
      updateVisibility();  // Set initial visibility
      window.addEventListener('resize', updateWindowWidth);
    });

    // Add a ref to track the active index
    const activeMonsterIndex = ref(null);

    // Modify selectMonster to set the active index
    function selectMonster(index) {
      monster.value = monsters.value[index];
      activeMonsterIndex.value = index;  // Update the active index
    }
    const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth;
    };

    const sidebarStyle = computed(() => {
      if (windowWidth.value <= 900) {
        return {
          position: 'fixed',
          transform: isSidebarVisible.value ? 'translateX(0)' : 'translateX(-100%)',
          width: '70%', // Adjust width for mobile
          maxWidth: '400px'
        };
      } else {
        return {
          width: '400px',
          position: 'static',
          transform: 'none'
        };
      }
    });
    const isSidebarVisible = ref(false); // Start hidden on mobile

    // Update based on viewport size immediately and on resize
    const updateVisibility = () => {
      if (window.innerWidth > 900) {
        isSidebarVisible.value = true;  // Always show on desktop
      } else {
        isSidebarVisible.value = false;  // Manage with toggle button on mobile
      }
    };
    function validationPart1(jsonString) {
      try {
        const jsonObj = JSON.parse(jsonString);
        const keys = [
          'armor_class',
          'hit_points',
          'speed',
          'senses',
          'languages',
          'challenge_rating',
          'proficiency_bonus',
          'abilities'
        ];
        return keys.every((key) => key in jsonObj);
      } catch (error) {
        return false;
      }
    }

    function validationPart2(jsonString) {
      try {
        const jsonObj = JSON.parse(jsonString);
        const keys = [
          'actions'
        ];
        return keys.every((key) => key in jsonObj);
      } catch (error) {
        return false;
      }
    }

    async function generateStatblock() {
      monster.value = null;
      loadingPart1.value = true;
      loadingPart2.value = true;
      const promptOptions = {
        monsterName: monsterName.value,
        challengeRating: selectedChallengeRating.value,
        monsterType: monsterType.value,
        monsterDescription: monsterDescription.value,
        caster: caster.value
      }
      const monsterPrompts = createStatblockPrompts(promptOptions);
      console.log(monsterPrompts.part1);
      let monsterStatsPart1;
      try {
        monsterStatsPart1 = await generateGptResponse(monsterPrompts.part1, validationPart1, 3);
      } catch (e) {
        errorMessage.value = 'There was an issue generating the full description. Please reload your browser and resubmit your creature.'
      }
      //console.log(monsterStatsPart1);
      monster.value = JSON.parse(monsterStatsPart1);
      loadingPart1.value = false;
      const previousContext = [
        { role: 'user', content: `Please give me the first part of a D&D statblock in the following format` },
        { role: 'system', content: `${monsterStatsPart1}` }
      ];
      console.log(monsterPrompts.part2);
      let monsterStatsPart2;
      try {
        monsterStatsPart2 = await generateGptResponse(monsterPrompts.part2, validationPart2, 3, previousContext);
      } catch (e) {
        errorMessage.value = 'There was an issue generating the full description. Please reload your browser and resubmit your creature.'
      }
      //console.log(monsterStatsPart2);
      const finalMonster = {
        ...JSON.parse(monsterStatsPart1),
        ...JSON.parse(monsterStatsPart2),
      }
      monsters.value.push(finalMonster);  // Store the new monster in the array
      monster.value = finalMonster;       // Update the current monster
      localStorage.setItem('monsters', JSON.stringify(monsters.value)); // Save to local storage
      loadingPart2.value = false;
    }

    return {
      loadingPart1,
      loadingPart2,
      errorMessage,
      monsterName,
      monsterType,
      monsterDescription,
      monster,
      caster,
      generateStatblock,
      challengeRatingData,
      creatureTemplates,
      selectedChallengeRating,
      windowWidth,
      sidebarStyle,
      isSidebarVisible,
      monsters,
      selectMonster,
      activeMonsterIndex
    }
  }
}
</script>


<style lang="scss" scoped>
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';

.app-container {
  display: flex;

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); // Semi-transparent
    z-index: 2; // Lower than sidebar but higher than content
  }
}

.sidebar {
  $sidebar-width: 300px;
  $background-color: #f4f4f4;
  $active-color: #ffffff;
  $hover-background-color: #f0f0f0;
  $default-background-color: #e0e0e0;
  $active-border-color: #007BFF;
  $indentation-step: 20px;
  $transition-speed: 0.3s;

  transition: transform 0.3s ease;
  background-color: $background-color;
  padding: 1rem;
  min-width: $sidebar-width;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 3;

  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
  }

  .saved-statblocks {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 4px;
      padding: 12px 20px;
      font-size: 1.5rem;
      text-align: left;
      background-color: $default-background-color;
      cursor: pointer;
      border-left: 5px solid transparent;
      transition: background-color $transition-speed, border-left-color $transition-speed;

      &:hover {
        background-color: $hover-background-color;
      }

      &:focus {
        outline: none; // Optionally, add a custom focus style
        border-left-color: $active-border-color; // Example focus style for accessibility
      }

      &.active {
        background-color: $active-color;
        border-left-color: $active-border-color;
      }
    }
  }

  .copy-buttons {
    display: flex;
    flex-direction: column;
    margin: 1rem;
    gap: 1rem;
    margin-bottom: 7rem;
  }
}

.sidebar-toggle {
  display: none; // Initially hidden
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1001;

  @media (max-width: 900px) {
    display: block; // Only shown on mobile
  }
}

.form-row-top {
  display: grid;
  grid-template-columns: 4fr 1.5fr .5fr;
  gap: 2rem;
}

@media screen and (max-width: 900px) {
  .form-row-top {
    grid-template-columns: 1fr;
  }
}

.form-row-mid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.form-row-end {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

#monsterType {
  width: 580px;
}

.generator-container {
  margin: auto;
}

.intro-container {
  max-width: 855px;
  margin: 5px 30px;
  padding: 0 1.5rem;
}

.monster-form {
  display: flex;
  flex-direction: column;
  max-width: 855px;
  margin: 20px;
  padding: 2px 30px 30px 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  button {
    align-self: flex-start;
    margin-top: 1.5rem;
  }
}

@media screen and (max-width: 900px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.error-message {
  border: 1px solid $cdr-color-border-error;
  padding: $cdr-space-inset-one-x-stretch;
  color: $cdr-color-text-message-error;
  background-color: $cdr-color-background-message-error-01;
  text-align: center;
  margin-top: 16px;
}
</style>