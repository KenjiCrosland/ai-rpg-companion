<template>
  <ToolSuiteShowcase :premium="premium" display-mode="banner" />

  <div class="app-container">
    <div class="main-container">
      <div class="form-container">
        <h1>{{ title }}</h1>

        <p>
          Welcome to the D&D 5e Encounter Generator! Build your encounter by adding monsters and party composition, then
          type in a short location description to generate a full encounter description.
          You can also generate statblocks for the monsters you’ve added once the encounter description has been
          generated.
        </p>

        <p v-if="premium">
          This premium version has <strong>no daily limit</strong> on statblock generation.
          Generated statblocks can be saved to folders in the
          <cdr-link :href="statblockAppLink">Statblock Generator App</cdr-link>.
        </p>

        <p v-else>
          This free version limits statblock generation to <strong>5 per day</strong>.
          You can save and organize statblocks in the
          <cdr-link href="https://cros.land/ai-powered-dnd-5e-monster-statblock-generator/">
            Statblock Generator App
          </cdr-link>.
        </p>

        <p>
          No form fields are required. You can click "Generate Encounter" to randomly generate a full encounter
          description without adding monsters or a location description.
        </p>

        <!-- MONSTER BUILDER -->
        <h3>Add a Monster</h3>

        <div class="monster-form">
          <div class="creature-form-left">
            <cdr-input label="Name:" v-model="newMonster.name" placeholder="Monster Name" background="secondary" />

            <cdr-input label="Short Description:" v-model="newMonster.description" placeholder="Short notes (optional)"
              :rows="5" tag="textarea" background="secondary" />
          </div>

          <div class="creature-form-right">
            <div class="label-standalone">
              <div class="label-standalone__label-wrapper">
                <label class="label-standalone__label">Count:</label>
              </div>

              <div class="label-standalone__input-wrap">
                <input class="counter-input" v-model.number="newMonster.quantity" type="number" min="1" />
              </div>
            </div>

            <cdr-select v-model="newMonster.cr" label="CR" prompt="CR" :options="challengeRatingData.fullArray"
              required />

            <cdr-select v-model="newMonster.type" label="Type:" prompt="Creature Role">
              <option value="Defensive">Defensive</option>
              <option value="Offensive">Offensive</option>
              <option value="Balanced">Balanced</option>
            </cdr-select>
          </div>

          <div class="creature-form-actions">
            <cdr-checkbox label="Spellcaster:" v-model="newMonster.isSpellcaster">
              Creature is a Spellcaster
            </cdr-checkbox>

            <cdr-button @click="addMonster()">Add Monster</cdr-button>
          </div>
        </div>

        <!-- PARTY + XP + MONSTERS LIST -->
        <div class="party-and-xp">
          <!-- Party composition -->
          <div class="party-composition">
            <div class="party-header">
              <h4>Party Composition</h4>
            </div>

            <div class="form-labels">
              <div>Players</div>
              <div></div>
              <div>Level</div>
            </div>

            <div v-for="(group, index) in groups" :key="index" class="group-row">
              <input class="counter-input" v-model.number="group.members" type="number" min="1" />
              <div class="separator">x</div>
              <input class="counter-input" v-model.number="group.level" type="number" min="1" />
              <cdr-button @click="removeGroup(index)" class="remove-btn" modifier="dark" size="small">x</cdr-button>
            </div>

            <div class="add-group-row">
              <cdr-button @click="addGroup" modifier="secondary" size="small">+ Add Group</cdr-button>
            </div>
          </div>

          <!-- XP thresholds -->
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

          <!-- Monster list -->
          <div class="monster-list">
            <h4>Monsters</h4>

            <div v-if="monsters.length === 0" class="empty-state">
              No monsters added yet.
            </div>

            <div v-for="(monster, index) in monsters" :key="`${monster.name}-${index}`" class="monster-entry">
              <div class="monster-details">
                <div class="monster-name">{{ monster.name }}</div>
                <div class="cr-and-xp">
                  <span>CR {{ monster.cr }}</span>
                  <span>{{ crToXP[monster.cr] }} XP</span>
                </div>
              </div>

              <div class="count-and-remove">
                <div class="monster-count">
                  <div class="form-labels">
                    <div>Count</div>
                  </div>
                  <input class="counter-input" v-model.number="monster.quantity" type="number" min="1" />
                </div>

                <cdr-tooltip id="remove-monster-tooltip" position="right" class="delete-button">
                  <template #trigger>
                    <cdr-button size="small" :icon-only="true" :with-background="true"
                      @click.stop="removeMonster(index)" modifier="dark">
                      <template #icon>
                        <icon-x-sm />
                      </template>
                    </cdr-button>
                  </template>
                  <div>Remove Monster</div>
                </cdr-tooltip>
              </div>
            </div>
          </div>
        </div>

        <!-- Difficulty summary -->
        <div class="difficulty-summary">
          <strong>Total Adjusted XP: {{ xpString }}</strong>

          <h3 :class="'difficulty-' + encounterDifficultyLevel.toLowerCase()">
            Encounter Difficulty: {{ encounterDifficultyLevel }}
          </h3>
        </div>

        <!-- Encounter form -->
        <form @submit.prevent="generateEncounter" class="encounter-form">
          <cdr-input id="location" v-model="location" background="secondary" label="Short location description"
            placeholder="Example: a misty forest, the glimmering ruins of Xarnok..." />

          <cdr-checkbox label="Ambush" v-model="ambush">
            Encounter is an Ambush
          </cdr-checkbox>

          <cdr-button type="submit" :full-width="true" class="generate-button">
            Generate Encounter
          </cdr-button>
        </form>

        <!-- Location Read-Aloud -->
        <div v-if="locationReadAloud && !loadingReadAloud" class="read-aloud">
          <p>{{ locationReadAloud }}</p>
        </div>

        <div v-if="loadingReadAloud" class="read-aloud">
          <LoadingLines :lines="9" />
        </div>

        <!-- Encounter description -->
        <div v-if="loadingEncounterDescription" class="encounter-loading">
          <LoadingLines :lines="4" />
          <LoadingLines :lines="4" />
          <LoadingLines :lines="4" />
        </div>

        <div v-if="encounterDescription && !loadingEncounterDescription" class="encounter-description">
          <p>{{ encounterDescription.encounter_intro }}</p>
          <p>{{ encounterDescription.environmental_twist }}</p>
          <p>{{ encounterDescription.non_combat_objective }}</p>
          <p>{{ encounterDescription.potential_event }}</p>
          <p>{{ encounterDescription.encounter_aftermath }}</p>
        </div>

        <!-- Statblocks -->
        <div v-if="encounterDescription" class="statblocks">
          <h3>Statblocks</h3>

          <div v-for="(monster, index) in monsters" :key="index" class="statblock-row">
            <div v-if="!monster.statblock" class="statblock-generation-list">
              <div class="monster-details">
                <div class="monster-name">{{ monster.name }}</div>
                <div class="cr-and-xp">
                  <span>CR {{ monster.cr }}</span>
                  <span>{{ crToXP[monster.cr] }} XP</span>
                </div>
              </div>

              <cdr-button @click="generateStatblock(monster, index)" modifier="secondary">
                Generate Statblock
              </cdr-button>
            </div>

            <div v-if="monster.statblock || monster.loadingPart1 || monster.loadingPart2">
              <Statblock v-if="monster.loadingPart1 || monster.loadingPart2 || monster.statblock"
                :monster="monster.statblock" :loadingPart1="monster.loadingPart1" :loadingPart2="monster.loadingPart2"
                :premium="premium" />

              <SaveStatblock v-if="monster.statblock" :monster="monster.statblock" :statblockLink="statblockAppLink" />
            </div>
          </div>
        </div>

        <!-- Export instructions -->
        <div v-if="encounterDescription" class="export-section">
          <h3>Export to Homebrewery</h3>

          <p class="export-description">
            Copy your encounter as Markdown and paste it into
            <cdr-link href="https://homebrewery.naturalcrit.com/new" target="_blank">Homebrewery</cdr-link>
            to generate a clean, printable handout.
          </p>

          <cdr-button @click="copyAsMarkdown" modifier="secondary" :full-width="true">
            Copy as Markdown
          </cdr-button>

          <div class="export-tip">
            <strong>Quick tip:</strong> Paste on the left side in Homebrewery, then export to PDF.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watchEffect } from 'vue';
import {
  CdrInput,
  CdrButton,
  CdrText,
  CdrSelect,
  CdrCheckbox,
  CdrLink,
  CdrList,
  CdrSkeleton,
  CdrSkeletonBone,
  IconXSm,
  CdrTooltip
} from "@rei/cedar";

import ToolSuiteShowcase from '@/components/ToolSuiteShowcase.vue';
import Statblock from '@/components/Statblock.vue';
import SaveStatblock from '@/components/SaveStatblock.vue';

import encounterDifficulty from '@/data/encounter-difficulty.json';
import challengeRatingData from '@/data/challengeRatings.json';
import crToXP from '@/data/cr-to-xp.json';

import { generateGptResponse } from "@/util/open-ai.mjs";
import { createLocationPrompt } from '@/prompts/prompts.mjs';
import { generateStatblockPart1, completeStatblock } from '@/util/statblock-generator.mjs';
import encounterPrompt from '@/prompts/encounter-prompt.mjs';
import { convertEncounterToMarkdown } from '@/util/convertToMarkdown.mjs';
import { canGenerateStatblock } from "@/util/can-generate-statblock.mjs";

const props = defineProps({
  premium: {
    type: Boolean,
    default: false
  }
});

const title = computed(() => {
  return `Kenji's D&D 5e Encounter Generator — ${props.premium ? 'Premium' : 'Free'} Version`;
});

const statblockAppLink = computed(() => {
  return props.premium
    ? 'https://cros.land/ai-powered-dnd-5e-monster-statblock-generator-premium/'
    : 'https://cros.land/ai-powered-dnd-5e-monster-statblock-generator/';
});

// Party state
const groups = reactive([{ members: 1, level: 1 }]);
const partyComposition = ref([]);

// Encounter state
const location = ref('');
const ambush = ref(false);
const locationReadAloud = ref('');
const encounterDescription = ref(null);

const loadingReadAloud = ref(false);
const loadingEncounterDescription = ref(false);

// Monsters state
const monsters = ref([]);

const newMonster = ref({
  name: '',
  cr: '1',
  description: '',
  quantity: 1,
  type: 'Balanced',
  isSpellcaster: false,
  statblock: null,
  loadingPart1: false,
  loadingPart2: false
});

// XP / difficulty state
const totalXPThreshold = ref({ Easy: 0, Medium: 0, Hard: 0, Deadly: 0 });
const totalMonsterXP = ref(0);
const adjustedTotalXP = ref(0);
const xpString = ref('');
const encounterDifficultyLevel = ref('Trivial');

function addGroup() {
  groups.push({ members: 1, level: 1 });
}

function removeGroup(index) {
  groups.splice(index, 1);
}

function addMonster() {
  const monsterToAdd = { ...newMonster.value };

  if (!monsterToAdd.name) monsterToAdd.name = 'Unnamed Monster';
  if (!monsterToAdd.quantity || monsterToAdd.quantity < 1) monsterToAdd.quantity = 1;

  monsters.value.push(monsterToAdd);

  newMonster.value = {
    name: '',
    cr: '1',
    description: '',
    quantity: 1,
    type: 'Balanced',
    isSpellcaster: false,
    statblock: null,
    loadingPart1: false,
    loadingPart2: false
  };
}

function removeMonster(index) {
  monsters.value.splice(index, 1);
}

function calculateTotalMonsterXP() {
  return monsters.value.reduce((total, monster) => {
    const xp = crToXP[monster.cr] || 0;
    return total + (xp * (monster.quantity || 1));
  }, 0);
}

function getMultiplier(numberOfMonsters) {
  if (numberOfMonsters === 1) return 1;
  if (numberOfMonsters === 2) return 1.5;
  if (numberOfMonsters >= 3 && numberOfMonsters <= 6) return 2;
  if (numberOfMonsters >= 7 && numberOfMonsters <= 10) return 2.5;
  if (numberOfMonsters >= 11 && numberOfMonsters <= 14) return 3;
  if (numberOfMonsters >= 15) return 4;
  return 1;
}

function calculateDifficulty(partyLevels) {
  const totalXP = { Easy: 0, Medium: 0, Hard: 0, Deadly: 0 };

  partyLevels.forEach(level => {
    const difficulty = encounterDifficulty.encounter_difficulty[level - 1];
    if (!difficulty) return;

    totalXP.Easy += difficulty.Easy;
    totalXP.Medium += difficulty.Medium;
    totalXP.Hard += difficulty.Hard;
    totalXP.Deadly += difficulty.Deadly;
  });

  return totalXP;
}

function determineEncounterDifficulty(thresholds) {
  if (adjustedTotalXP.value >= thresholds.Deadly) return 'Deadly';
  if (adjustedTotalXP.value >= thresholds.Hard) return 'Hard';
  if (adjustedTotalXP.value >= thresholds.Medium) return 'Medium';
  if (adjustedTotalXP.value >= thresholds.Easy) return 'Easy';
  return 'Trivial';
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function buildLocationPrompt() {
  const monstersString = monsters.value
    .map(m => `${m.quantity || 1} ${m.name}`)
    .join(', ');

  let locationAndMonsters = `${location.value || 'A random location'}. In this location there are the following monsters: ${monstersString || 'none specified'}.`;

  if (ambush.value) {
    locationAndMonsters += " This is an ambush so the creatures are not visible. Only include hints of them in the description.";
  }

  return createLocationPrompt(locationAndMonsters);
}

const encounterValidation = (jsonString) => {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = [
      'encounter_intro',
      'environmental_twist',
      'non_combat_objective',
      'potential_event',
      'encounter_aftermath'
    ];
    return keys.every((key) => key in jsonObj);
  } catch {
    return false;
  }
};

async function generateEncounter() {
  const locationPrompt = buildLocationPrompt();

  const monsterDescriptionString = monsters.value
    .map(m => `${m.quantity || 1} ${m.name}${m.description ? ': ' + m.description : ''}`)
    .join(', ');

  try {
    loadingEncounterDescription.value = true;
    loadingReadAloud.value = true;

    locationReadAloud.value = await generateGptResponse(locationPrompt);
    loadingReadAloud.value = false;
  } catch (error) {
    console.error("Error generating location read-aloud:", error);
    loadingReadAloud.value = false;
  }

  try {
    const response = await generateGptResponse(
      encounterPrompt(locationReadAloud.value, monsterDescriptionString),
      encounterValidation,
      3
    );

    encounterDescription.value = JSON.parse(response);
  } catch (error) {
    console.error("Error generating encounter:", error);
  } finally {
    loadingEncounterDescription.value = false;
  }
}

async function generateStatblock(monster, index) {
  // Free version guard
  if (!props.premium) {
    const ok = await canGenerateStatblock();
    if (!ok) return;
  }

  monsters.value[index].loadingPart1 = true;
  monsters.value[index].loadingPart2 = true;

  try {
    const { monsterPart1, monsterPrompts, errorMessage: errorPart1 } = await generateStatblockPart1({
      monsterName: monsters.value[index].name,
      challengeRating: monsters.value[index].cr,
      monsterType: monsters.value[index].type,
      monsterDescription: monsters.value[index].description,
      caster: monsters.value[index].isSpellcaster,
    });

    if (errorPart1) {
      console.error("Error generating statblock part 1:", errorPart1);
      return;
    }

    const { monsterPart2, errorMessage: errorPart2 } = await completeStatblock(monsterPart1, monsterPrompts);

    if (errorPart2) {
      console.error("Error generating statblock part 2:", errorPart2);
      return;
    }

    if (monsterPart1 && monsterPart2) {
      monsters.value[index].statblock = { ...monsterPart1, ...monsterPart2 };
    }
  } catch (error) {
    console.error("Error generating statblock:", error);
  } finally {
    monsters.value[index].loadingPart1 = false;
    monsters.value[index].loadingPart2 = false;
  }
}

async function copyAsMarkdown() {
  const markdownContent = convertEncounterToMarkdown(locationReadAloud.value, encounterDescription.value, monsters.value);

  if (!markdownContent) {
    alert('No content available to copy as markdown.');
    return;
  }

  try {
    await navigator.clipboard.writeText(markdownContent);
    alert('Copied as markdown!');
  } catch (err) {
    console.error('Clipboard write failed:', err);
    alert('Could not copy to clipboard. Try again.');
  }
}

// Keep computed fields updated whenever party/monsters change
watchEffect(() => {
  const composition = [];

  groups.forEach(group => {
    const members = Math.max(1, Number(group.members || 1));
    const lvl = Math.max(1, Number(group.level || 1));

    for (let i = 0; i < members; i++) {
      composition.push(lvl);
    }
  });

  partyComposition.value = composition;

  totalMonsterXP.value = calculateTotalMonsterXP();

  const totalMonsterCount = monsters.value.reduce((acc, m) => acc + (m.quantity || 1), 0);
  const multiplier = getMultiplier(totalMonsterCount);

  adjustedTotalXP.value = Math.round(totalMonsterXP.value * multiplier);
  xpString.value = numberWithCommas(adjustedTotalXP.value);

  totalXPThreshold.value = calculateDifficulty(partyComposition.value);
  encounterDifficultyLevel.value = determineEncounterDifficulty(totalXPThreshold.value);
});

// Small local skeleton helper component (keeps template cleaner)
const LoadingLines = {
  props: { lines: { type: Number, default: 4 } },
  components: { CdrSkeleton, CdrSkeletonBone },
  template: `
    <CdrSkeleton>
      <CdrSkeletonBone v-for="i in lines" :key="i" type="line" :style="{ width: (i === lines ? '50%' : '95%') }" />
    </CdrSkeleton>
  `
};
</script>

<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.app-container {
  display: flex;
}

.main-container {
  margin: 3rem auto;
  max-width: 980px;
  width: 100%;
  padding: 0 1rem;
}

.form-container {
  @include cdr-text-body-400();
  color: $cdr-color-text-primary;
  padding: 2rem 3rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.encounter-form {
  background-color: $cdr-color-background-secondary;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.generate-button {
  margin-top: 0.5rem;
}

.read-aloud {
  background-color: $cdr-color-background-secondary;
  color: $cdr-color-text-secondary;
  padding: 1rem 2rem;
  font-style: italic;
  margin-top: 1.5rem;
  border-radius: 6px;
}

.encounter-loading {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.encounter-description {
  margin-top: 2rem;
}

.difficulty-summary {
  margin-top: 1.5rem;
  text-align: center;
}

.monster-form {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  align-items: start;
}

.creature-form-left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.creature-form-right {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 11rem;
}

.creature-form-actions {
  grid-column: 1 / -1;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.party-and-xp {
  margin: 2rem 0;
  display: grid;
  gap: 1rem;
  grid-template-columns: 2fr 2fr 3fr;
}

.party-composition {
  display: flex;
  flex-direction: column;

  .form-labels {
    display: grid;
    grid-template-columns: 5rem 3rem 5rem 1fr;
    font-size: 1.5rem;
    gap: .5rem;
    margin-bottom: 0.5rem;
  }

  .group-row {
    display: grid;
    grid-template-columns: 5rem 3rem 5rem 5rem;
    gap: .5rem;
    align-items: center;
    margin-bottom: 0.75rem;

    .separator {
      text-align: center;
    }
  }

  .add-group-row {
    margin-top: 0.25rem;
  }
}

.xp-thresholds {
  max-width: 20rem;
  font-size: 1.5rem;

  .grid-header,
  .grid-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    align-items: center;
  }

  .grid-header {
    font-weight: bold;
  }

  .grid-row {
    padding: 5px 0;
    border-bottom: 1px solid #ccc;

    &:last-child {
      border-bottom: none;
    }
  }
}

.monster-list {
  h4 {
    margin-top: 0;
  }

  .empty-state {
    color: $cdr-color-text-secondary;
    font-style: italic;
    padding: 0.75rem 0;
  }

  .monster-entry {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .monster-name {
    font-weight: bold;
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
}

.count-and-remove {
  display: flex;
  gap: 1rem;
  align-items: flex-end;

  .delete-button {
    margin-bottom: 0.2rem;
  }
}

.statblocks {
  margin-top: 2rem;
}

.statblock-generation-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.counter-input {
  max-width: 100px;
  font-family: Graphik, "Helvetica Neue", sans-serif;
  font-style: normal;
  letter-spacing: -0.016rem;
  font-size: 1.6rem;
  line-height: 2.2rem;
  font-weight: 500;
  color: #20201d;
  border: 0;
  background-color: rgba(244, 242, 237, 0.15);
  box-shadow: inset 0 0 0 0.1rem #928b80;
  border-radius: 0.4rem;
  padding: 0.8rem;
  height: 4rem;
  display: block;
  width: 100%;
  margin: 0;
}

.label-standalone {
  display: grid;
  grid-template-areas:
    "label"
    "input"
    "post";

  &__label-wrapper {
    grid-area: label;
  }

  &__label {
    font-family: Graphik, "Helvetica Neue", sans-serif;
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
}

.difficulty-trivial {
  color: #999;
}

.difficulty-easy {
  color: #2E8B57;
}

.difficulty-medium {
  color: #FFA500;
}

.difficulty-hard {
  color: #FF4500;
}

.difficulty-deadly {
  color: #B22222;
}

.export-section {
  margin-top: 3rem;
  padding: 1.5rem;
  background-color: $cdr-color-background-secondary;
  border-radius: 8px;

  .export-description {
    margin-bottom: 1rem;
    color: $cdr-color-text-secondary;
  }

  .export-tip {
    margin-top: 1rem;
    padding: 1rem;
    background-color: rgba($cdr-color-text-brand, 0.05);
    border-left: 3px solid $cdr-color-text-brand;
    border-radius: 4px;
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

@media screen and (max-width: 855px) {
  .form-container {
    padding: 1.5rem;
  }

  .monster-form {
    grid-template-columns: 1fr;
  }

  .party-and-xp {
    grid-template-columns: 1fr 1fr;

    > :nth-child(3) {
      grid-column: 1 / span 2;
    }
  }

  .statblock-generation-list {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
}
</style>
