<template>
  <div class="app-container">
    <cdr-button modifier="secondary" class="sidebar-toggle" @click="isSidebarVisible = !isSidebarVisible"
      v-show="windowWidth <= 1020">
      <template #icon-left>
        <icon-navigation-menu inherit-color />
      </template>
      {{ isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar' }}
    </cdr-button>
    <!-- Overlay to close sidebar on click -->
    <div class="overlay" v-show="isSidebarVisible && windowWidth <= 1020" @click="isSidebarVisible = false"></div>
    <div class="sidebar" :style="sidebarStyle">
      <cdr-accordion-group>
        <cdr-accordion level="3" v-for="(folder, folderName) in monsters" :key="folderName" :id="folderName"
          :opened="openedFolders[folderName]"
          @accordion-toggle="openedFolders[folderName] = !openedFolders[folderName]">
          <template #label>
            {{ folderName }}
          </template>
          <ul class="saved-statblocks">
            <li v-for="(monsterItem, index) in folder" :key="index"
              :class="{ 'active': activeMonsterIndex === index && activeFolder === folderName }">
              <button class="monster-button" @click="selectMonster(folderName, index)" tabindex="0">
                <span>{{ monsterItem.name }}</span>
                <span>CR {{ getFirstNumber(monsterItem.challenge_rating) }}</span>
              </button>
            </li>
            <li>
              <button class="monster-button" @click="newMonster(folderName)"
                :class="{ 'active': activeMonsterIndex === null && activeFolder === folderName }">
                + New Monster Statblock</button>
            </li>
          </ul>
        </cdr-accordion>
      </cdr-accordion-group>

      <div class="folder-form">
        <h3>Move Statblock to Folder</h3>
        <form @submit.prevent="moveMonsterToFolder">
          <cdr-input v-model="newFolder" label="New Folder Name:">
            <template #helper-text-top>
              Move the monster to a new folder in the sidebar
            </template>
          </cdr-input>
          <cdr-select v-model="chosenFolder" label="Existing Folders" :options="folderNames">
            <template #helper-text>
              Move the monster to an existing folder in the sidebar
            </template>
          </cdr-select>
          <cdr-button type="submit">Move To Folder</cdr-button>
        </form>
      </div>
    </div>
    <div class="generator-container">
      <cdr-button :full-width="true" v-if="monster && windowWidth <= 1280" @click="newMonster()">New
        Monster
        Statblock</cdr-button>
      <div class="intro-and-form" v-show="!monster && !loadingPart1 && !loadingPart2">
        <div class="intro-container">
          <h1>Kenji's D&D 5e Monster Statblock Generator -- Free Version</h1>
          <p>
            Welcome to the D&D 5e Statblock Generator! This free version has a limit of 5 statblocks per
            day. Enter
            the name of the monster and choose a monster type and CR. Monster types determine whether a
            monster is
            stronger on defense, offense or balanced. CR will determine how strong a monster is, with higher
            CRs
            making for stronger monsters. Finally, if you wish the creature to be able to cast spells,
            please use
            select the “Creature is a spellcaster” checkbox. Once generated, you can export a creature to
            homebrewery,
            foundry VTT or
            the Improved Initiative app.
          </p>
          <cdr-link href="https://cros.land/ai-powered-dnd-5e-monster-statblock-generator-premium/">Link to
            Statblock
            Generator -- Premium Version</cdr-link>
        </div>
        <form @submit.prevent="generateStatblock" class="monster-form">
          <div class="form-row-top">
            <cdr-input id="monsterName" v-model="monsterName" background="secondary"
              :label="'Monster Name (Example: Headless Horseman)'" />
            <cdr-select v-model="monsterType" label="type"
              :options="['Random', 'Stronger Defense', 'Balanced', 'Stronger Offense']" />
            <cdr-select v-model="selectedChallengeRating" label="CR" prompt="CR"
              :options="challengeRatingData.fullArray" />
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
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <cdr-toggle-group v-if="shouldDisplayInterface && (monster || loadingPart1 || loadingPart2)"
        v-model="userColumnsPreference" style="margin: 2cap;auto">
        <cdr-toggle-button toggleValue="one_column">1 Column</cdr-toggle-button>
        <cdr-toggle-button toggleValue="two_columns">2 Columns</cdr-toggle-button>
      </cdr-toggle-group>
      <Statblock v-if="!errorMessage && (loadingPart1 || loadingPart2 || monster)" :loadingPart1="loadingPart1"
        :loadingPart2="loadingPart2" :monster="monster" :columns="userColumnsPreference" />

      <cdr-button class="delete-button" v-if="monster && !loadingPart2" modifier="dark" :full-width="true"
        @click="deleteStatblock">Delete
        Statblock</cdr-button>
      <StatblockExports v-if="monster" :monster="monster" :loading="loadingPart1 || loadingPart2"
        :columns="userColumnsPreference" />
    </div>
    <cdr-button class="new-monster-button" v-if="monster && windowWidth >= 1280" @click="newMonster()">New
      Monster
      Statblock</cdr-button>
  </div>
</template>

<script>
import { ref, onMounted, computed, reactive, onUnmounted } from 'vue';
import Statblock from './Statblock.vue';
import { generateGptResponse } from "../util/open-ai.mjs";
import { CdrInput, CdrButton, CdrLink, CdrCheckbox, CdrSelect, CdrToggleButton, CdrToggleGroup, CdrAccordion, CdrAccordionGroup, CdrList, IconNavigationMenu } from "@rei/cedar";
import "@rei/cedar/dist/style/cdr-input.css";
import "@rei/cedar/dist/style/cdr-list.css";
import "@rei/cedar/dist/style/cdr-button.css";
import "@rei/cedar/dist/style/cdr-checkbox.css";
import "@rei/cedar/dist/style/cdr-select.css";
import "@rei/cedar/dist/style/cdr-toggle-group.css";
import "@rei/cedar/dist/style/cdr-toggle-button.css";
import StatblockExports from './StatblockExports.vue';
import challengeRatingData from '../data/challengeRatings.json';
import creatureTemplates from '../data/creatureTemplates.json';
import { createStatblockPrompts } from "../util/monster-prompts.mjs";
import { canGenerateStatblock } from "../util/can-generate-statblock.mjs";

export default {
  components: {
    Statblock,
    CdrInput,
    CdrButton,
    CdrLink,
    CdrList,
    CdrCheckbox,
    CdrAccordion,
    CdrAccordionGroup,
    CdrSelect,
    CdrToggleButton,
    CdrToggleGroup,
    IconNavigationMenu,
    StatblockExports
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
    const monsters = ref({ 'Uncategorized': [] });
    const newFolder = ref('');
    const chosenFolder = ref('');
    const activeFolder = ref('Uncategorized'); // Initialize with default folder
    const openedFolders = reactive({ 'Uncategorized': true }); // To track the state of each accordion
    const userColumnsPreference = ref('two_columns');
    const shouldDisplayInterface = computed(() => {
      return windowWidth.value > 855;
    });
    const folderNames = computed(() => {
      return Object.keys(monsters.value);
    });

    onMounted(() => {
      const savedMonsters = localStorage.getItem('monsters');
      if (savedMonsters) {
        let allData = JSON.parse(savedMonsters);
        // Delete the specific keys to ensure they are not mixed into your UI state
        delete allData.generationCount;
        delete allData.firstGenerationTime;
        // Now, monsters.value will only contain relevant monster data
        monsters.value = allData;
      }

      updateWindowWidth(); // Set initial width
      updateVisibility();  // Set initial visibility
      window.addEventListener('resize', updateWindowWidth);
    });


    // Add a ref to track the active index
    const activeMonsterIndex = ref(null);

    function getFirstNumber(text) {
      // Split the text by spaces
      const parts = text.split(' ');
      // Find the first part that contains digits
      for (let part of parts) {
        if (/\d/.test(part)) {  // Check if the part has any digits
          return parseInt(part, 10);  // Return the integer value
        }
      }
      return null;  // Return null if no number is found
    }


    function sortMonstersByCR(folderName) {
      return monsters.value[folderName].sort((a, b) => {
        const crA = getFirstNumber(a.challenge_rating);
        const crB = getFirstNumber(b.challenge_rating);
        return crA - crB;
      });
    }

    function newMonster(folderName = 'Uncategorized') {
      activeFolder.value = folderName;
      activeMonsterIndex.value = null;
      monster.value = null;
      monsterName.value = '';
      monsterType.value = 'Random';
      monsterDescription.value = '';
      selectedChallengeRating.value = null;
    }

    // Modify selectMonster to set the active index
    function selectMonster(folderName = 'Uncategorized', index) {
      activeFolder.value = folderName;
      activeMonsterIndex.value = index;
      monster.value = monsters.value[folderName][index];
    }
    const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth;
    };

    const sidebarStyle = computed(() => {
      if (windowWidth.value <= 1020) {
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
      if (window.innerWidth > 1020) {
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

    function moveMonsterToFolder() {
      const currentMonsterName = monsters.value[activeFolder.value][activeMonsterIndex.value].name;
      let previousActiveFolder = activeFolder.value;
      if (newFolder.value) {
        monsters.value[newFolder.value] = monsters.value[activeFolder.value].splice(activeMonsterIndex.value, 1);
        activeFolder.value = newFolder.value;
        newFolder.value = '';
      } else if (chosenFolder.value) {
        monsters.value[chosenFolder.value].push(...monsters.value[activeFolder.value].splice(activeMonsterIndex.value, 1));
        activeFolder.value = chosenFolder.value;
        chosenFolder.value = '';
      }

      if (monsters.value[previousActiveFolder].length === 0 && previousActiveFolder !== 'Uncategorized') {
        delete monsters.value[previousActiveFolder];
      }

      //close the accordion if the monster was moved from it
      if (previousActiveFolder !== activeFolder.value) {
        openedFolders[previousActiveFolder] = false;
      }

      //If the accordion is closed, open it
      if (!openedFolders[activeFolder.value]) {
        openedFolders[activeFolder.value] = true;
      }
      monsters.value[activeFolder.value] = sortMonstersByCR(activeFolder.value);
      const storedData = JSON.parse(localStorage.getItem('monsters')) || { generationCount: '0', firstGenerationTime: null };
      const dataToStore = { ...monsters.value, generationCount: storedData.generationCount, firstGenerationTime: storedData.firstGenerationTime };
      const newIndex = monsters.value[activeFolder.value].findIndex(monster => monster.name === currentMonsterName);
      selectMonster(activeFolder.value, newIndex);
      localStorage.setItem('monsters', JSON.stringify(dataToStore));
    }

    function deleteStatblock() {
      const folderName = activeFolder.value || 'Uncategorized';
      monsters.value[folderName].splice(activeMonsterIndex.value, 1);
      monster.value = null;
      activeMonsterIndex.value = null;
      if (monsters.value[folderName].length === 0 && folderName !== 'Uncategorized') {
        delete monsters.value[folderName];
        activeFolder.value = 'Uncategorized';
        if (!openedFolders['Uncategorized']) {
          openedFolders['Uncategorized'] = true;
        }
      }
      const storedData = JSON.parse(localStorage.getItem('monsters')) || { generationCount: '0', firstGenerationTime: null };
      const dataToStore = { ...monsters.value, generationCount: storedData.generationCount, firstGenerationTime: storedData.firstGenerationTime };
      localStorage.setItem('monsters', JSON.stringify(dataToStore));
    }

    async function generateStatblock() {
      monster.value = null;
      const canGenerate = await canGenerateStatblock();

      if (!canGenerate) {
        return;
      }
      loadingPart1.value = true;
      loadingPart2.value = true;
      //return a random integer between '1' and '30' as a string
      const randomCR = Math.floor(Math.random() * 30) + 1;

      const promptOptions = {
        monsterName: monsterName.value,
        challengeRating: selectedChallengeRating.value || randomCR.toString(),
        monsterType: monsterType.value,
        monsterDescription: monsterDescription.value,
        caster: caster.value
      };

      const monsterPrompts = createStatblockPrompts(promptOptions);

      let monsterStatsPart1;
      try {
        monsterStatsPart1 = await generateGptResponse(monsterPrompts.part1, validationPart1, 3);
        if (!monsterStatsPart1) throw new Error('Empty statblock response part 1');
      } catch (e) {
        errorMessage.value = `There was an issue generating the first part of the description: ${e.message}`;
        loadingPart1.value = false;
        return;
      }

      monster.value = JSON.parse(monsterStatsPart1);
      loadingPart1.value = false;
      const previousContext = [
        { role: 'user', content: `Please give me the first part of a D&D statblock in the following format` },
        { role: 'system', content: `${monsterStatsPart1}` }
      ];

      let monsterStatsPart2;
      try {
        monsterStatsPart2 = await generateGptResponse(monsterPrompts.part2, validationPart2, 3, previousContext);
      } catch (e) {
        errorMessage.value = `There was an issue generating the second part of the description: ${e.message}`;
        loadingPart2.value = false;
        return;
      }

      const finalMonster = {
        ...JSON.parse(monsterStatsPart1),
        ...JSON.parse(monsterStatsPart2),
      };

      const folderName = activeFolder.value || 'Uncategorized';
      monster.value = finalMonster; // Update the current monster
      monsters.value[folderName].push(finalMonster);
      monsters.value[folderName] = sortMonstersByCR(folderName);
      const newIndex = monsters.value[folderName].findIndex(monster => monster.name === finalMonster.name);
      selectMonster(folderName, newIndex); // Select the newly added monster
      const storedData = JSON.parse(localStorage.getItem('monsters')) || { generationCount: '0', firstGenerationTime: null };
      const dataToStore = { ...monsters.value, generationCount: storedData.generationCount, firstGenerationTime: storedData.firstGenerationTime };
      localStorage.setItem('monsters', JSON.stringify(dataToStore));
      loadingPart2.value = false;
      monsterName.value = '';
      monsterType.value = 'Random';
      monsterDescription.value = '';
      selectedChallengeRating.value = null;
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
      activeMonsterIndex,
      deleteStatblock,
      userColumnsPreference,
      shouldDisplayInterface,
      newMonster,
      newFolder,
      chosenFolder,
      folderNames,
      updateVisibility,
      updateWindowWidth,
      activeFolder,
      openedFolders,
      moveMonsterToFolder,
      getFirstNumber,
      sortMonstersByCR
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

.new-monster-button {
  min-width: 210px;
  margin: 2rem;
  height: 4rem;
}

.sidebar {
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
  min-height: 100vh;
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

      &.active {
        .monster-button {
          background-color: $active-color;
          border-left-color: $active-border-color;
          font-weight: bold;
        }
      }

      .monster-button {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 12px 20px;
        font-size: 1.5rem;
        text-align: left;
        background-color: $default-background-color;
        border: none;
        color: inherit; // Ensures button text color matches your design
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
          border-color: $active-border-color;
          font-weight: bold;
        }
      }
    }
  }

  .folder-form {
    display: flex;
    flex-direction: column;
    margin: 1rem;
    margin-bottom: 7rem;

    button {
      margin-top: 2rem;
    }
  }
}

.sidebar-toggle {
  display: none; // Initially hidden
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1001;

  @media (max-width: 1020px) {
    display: block; // Only shown on mobile
  }

}

.form-row-top {
  display: grid;
  grid-template-columns: 4fr 1.5fr .5fr;
  gap: 2rem;
}

@media screen and (max-width: 1020px) {
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
  height: 100vh;
  overflow-y: scroll;
  overflow-x: visible;
  margin: 0 auto;
  padding: 2rem;

  @media screen and (min-width: 890px) {
    min-width: 890px;
  }
}

.intro-container {
  max-width: 855px;
  margin: 5px 20px;
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

.delete-button {
  margin-bottom: 2rem;
}

@media screen and (max-width: 1020px) {
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