<template>
  <GeneratorLayout :premium="premium">
    <template #sidebar>
      <div class="sidebar-content">
        <div class="sidebar-scroll">
          <cdr-accordion-group>
            <cdr-accordion level="3" v-for="(folder, folderName) in filteredMonsters" :key="folderName" :id="folderName"
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
        </div>

        <div class="sidebar-footer">
          <cdr-button modifier="dark" @click="showDataManagerModal = true" :full-width="true">
            Save/Load Data from a File
          </cdr-button>
        </div>

        <DataManagerModal :opened="showDataManagerModal" @update:opened="showDataManagerModal = $event"
          :premium="premium" currentApp="monsters" />
      </div>
    </template>

    <div class="generator-container">
      <cdr-button :full-width="true" v-if="monster && windowWidth <= 1280" @click="newMonster()">New
        Monster
        Statblock</cdr-button>

      <div class="landing-wrapper" v-if="!monster && !loadingPart1 && !loadingPart2">
        <!-- ZONE 1: Brand + Headline (lives outside the card) -->
        <div class="hero-header">
          <div class="brand-line">
            <span class="brand-name">Kenji's Statblock Generator</span>
            <span v-if="!premium" class="version-pill">Free</span>
            <span v-else class="version-pill premium">Premium</span>
          </div>
          <h1>Build Custom D&D 5e Monsters in Seconds</h1>
          <p class="value-prop">Create balanced, export-ready 5e statblocks — no math required.</p>
        </div>

        <!-- ZONE 2: The form card -->
        <div class="form-card">
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
              <cdr-input v-model="monsterDescription" :optional="true" label='Description / Special Instructions'
                placeholder='E.g. "Flying speed of 60ft", "Can turn invisible once per day", "Output statblock in German"'
                :rows="4" />
            </div>
            <div class="form-row-end">
              <cdr-checkbox v-model="caster">Creature is a spellcaster</cdr-checkbox>
            </div>

            <cdr-button :disabled="loadingPart1 || loadingPart2" class="monster-form-button" type="submit">
              {{ activeMonsterIndex !== null ? 'Regenerate Monster' : 'Generate Monster' }}
            </cdr-button>
          </form>
        </div>

        <!-- ZONE 3: Secondary info (below the card, low-key) -->
        <div class="footer-meta">
          <p v-if="!premium" class="limit-info">
            Free: 5 generations per 24 hours (includes re-generations). Exports to Roll20, Homebrewery, Foundry VTT, and
            Improved Initiative.
            <cdr-link href="https://cros.land/ai-powered-dnd-5e-monster-statblock-generator-premium/">Need more than 5
              per
              day? Go Premium &rarr;</cdr-link>
          </p>
        </div>
      </div>

      <cdr-toggle-group v-if="shouldDisplayInterface && (monster || loadingPart1 || loadingPart2)"
        v-model="userColumnsPreference" style="margin: 2cap;auto">
        <cdr-toggle-button toggleValue="one_column">1 Column</cdr-toggle-button>
        <cdr-toggle-button toggleValue="two_columns">2 Columns</cdr-toggle-button>
      </cdr-toggle-group>
      <Statblock v-if="!errorMessage && (loadingPart1 || loadingPart2 || monster)" :loadingPart1="loadingPart1"
        :width="850" :loadingPart2="loadingPart2" :monster="monster" :columns="userColumnsPreference" :premium="premium"
        @update-monster="updateMonster" />

      <!-- Action bar: Move + Delete -->
      <div class="action-bar" v-if="monster && !loadingPart2">
        <cdr-button modifier="secondary" @click="showFolderMover = !showFolderMover">
          {{ showFolderMover ? 'Cancel' : 'Move to Folder' }}
        </cdr-button>
        <cdr-button modifier="dark" @click="deleteStatblock">
          Delete Statblock
        </cdr-button>
      </div>

      <!-- Inline folder mover (appears when toggled) -->
      <div class="folder-mover" v-if="showFolderMover && monster && !loadingPart2">
        <div class="folder-mover-inner">
          <cdr-select v-model="folderMoveTarget" label="Destination folder" prompt="Select a folder"
            :options="folderMoveOptions" />
          <cdr-input v-if="folderMoveTarget === '__new__'" v-model="newFolder" label="New folder name"
            background="secondary" />
          <cdr-button @click="handleFolderMove" :disabled="!canMove">
            Move
          </cdr-button>
        </div>
      </div>
      <StatblockExports v-if="monster" :monster="monster" :loading="loadingPart1 || loadingPart2"
        :columns="userColumnsPreference" />
    </div>
    <cdr-button class="new-monster-button" v-if="monster && windowWidth >= 1280" @click="newMonster()">New
      Monster
      Statblock</cdr-button>
  </GeneratorLayout>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import Statblock from './Statblock.vue';
import GeneratorLayout from './GeneratorLayout.vue';
import { generateGptResponse } from "../util/open-ai.mjs";
import { CdrInput, CdrButton, CdrLink, CdrCheckbox, CdrSelect, CdrToggleButton, CdrToggleGroup, CdrAccordion, CdrAccordionGroup, CdrList, IconDownload, IconUpload } from "@rei/cedar";
import "@rei/cedar/dist/style/cdr-input.css";
import "@rei/cedar/dist/style/cdr-list.css";
import "@rei/cedar/dist/style/cdr-button.css";
import "@rei/cedar/dist/style/cdr-checkbox.css";
import "@rei/cedar/dist/style/cdr-select.css";
import "@rei/cedar/dist/style/cdr-toggle-group.css";
import "@rei/cedar/dist/style/cdr-toggle-button.css";
import StatblockExports from './StatblockExports.vue';
import DataManagerModal from './DataManagerModal.vue';
import challengeRatingData from '../data/challengeRatings.json';
import creatureTemplates from '../data/creatureTemplates.json';
import { createStatblockPrompts } from "../prompts/monster-prompts.mjs";
import { canGenerateStatblock } from "../util/can-generate-statblock.mjs";
import { useToast } from '../composables/useToast';

const toast = useToast();

const props = defineProps({
  premium: {
    type: Boolean,
    default: false
  }
})

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
const activeFolder = ref('Uncategorized');
const openedFolders = reactive({ 'Uncategorized': true });
const userColumnsPreference = ref('two_columns');
const shouldDisplayInterface = computed(() => windowWidth.value > 855);
const folderNames = computed(() => {
  return Object.keys(monsters.value).filter(key => key !== 'firstGenerationTime' && key !== 'generationCount');
});
const filteredMonsters = computed(() => {
  const filtered = { ...monsters.value };
  delete filtered.firstGenerationTime;
  delete filtered.generationCount;
  return filtered;
});
const showDataManagerModal = ref(false);
const showFolderMover = ref(false);
const folderMoveTarget = ref('');

const folderMoveOptions = computed(() => {
  const current = activeFolder.value;
  const folders = folderNames.value
    .filter(name => name !== current)
    .map(name => ({ text: name, value: name }));
  folders.push({ text: '＋ Create new folder...', value: '__new__' });
  return folders;
});

const canMove = computed(() => {
  if (!folderMoveTarget.value) return false;
  if (folderMoveTarget.value === '__new__') return newFolder.value.trim().length > 0;
  return true;
});


onMounted(() => {
  const savedMonsters = localStorage.getItem('monsters');
  if (savedMonsters) {
    let allData = JSON.parse(savedMonsters);
    allData['Uncategorized'] = allData['Uncategorized'] || [];
    monsters.value = allData;
  } else {
    monsters.value = { 'Uncategorized': [] };
  }

  updateWindowWidth();
  window.addEventListener('resize', updateWindowWidth);
});

const activeMonsterIndex = ref(null);

function getFirstNumber(text) {
  const parts = text.split(' ');
  for (let part of parts) {
    if (/^\d+\/\d+$/.test(part) || /^\d+(\.\d+)?$/.test(part)) {
      return part;
    }
  }
  return null;
}

function fractionToDecimal(fraction) {
  if (fraction.includes('/')) {
    const [numerator, denominator] = fraction.split('/').map(Number);
    return numerator / denominator;
  }
  return parseFloat(fraction);
}

function sortMonstersByCR(folderName) {
  return monsters.value[folderName].sort((a, b) => {
    const crA = fractionToDecimal(getFirstNumber(a.challenge_rating));
    const crB = fractionToDecimal(getFirstNumber(b.challenge_rating));
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

function updateMonster(updatedMonster) {
  monster.value = updatedMonster;
  monsters.value[activeFolder.value][activeMonsterIndex.value] = updatedMonster;
  const storedData = JSON.parse(localStorage.getItem('monsters')) || { generationCount: '0', firstGenerationTime: null };
  const dataToStore = { ...monsters.value, generationCount: storedData.generationCount, firstGenerationTime: storedData.firstGenerationTime };
  localStorage.setItem('monsters', JSON.stringify(dataToStore));
}

function selectMonster(folderName = 'Uncategorized', index) {
  activeFolder.value = folderName;
  activeMonsterIndex.value = index;
  monster.value = monsters.value[folderName][index];
  monsterName.value = monster.value.name;
  monsterType.value = monster.value.monsterType || 'Random';
  monsterDescription.value = monster.value.monsterDescription || '';
  selectedChallengeRating.value = monster.value.selectedChallengeRating || getFirstNumber(monster.value.challenge_rating);
  caster.value = monster.value.caster;
}

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
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

function handleFolderMove() {
  if (activeMonsterIndex.value === null) return;

  const targetFolder = folderMoveTarget.value === '__new__'
    ? newFolder.value.trim()
    : folderMoveTarget.value;

  if (!targetFolder) return;

  const currentMonsterName = monsters.value[activeFolder.value][activeMonsterIndex.value].name;
  const previousActiveFolder = activeFolder.value;

  // Create folder if new
  if (!monsters.value[targetFolder]) {
    monsters.value[targetFolder] = [];
  }

  // Move the monster
  monsters.value[targetFolder].push(...monsters.value[previousActiveFolder].splice(activeMonsterIndex.value, 1));
  activeFolder.value = targetFolder;

  // Clean up empty folders (except Uncategorized)
  if (monsters.value[previousActiveFolder].length === 0 && previousActiveFolder !== 'Uncategorized') {
    delete monsters.value[previousActiveFolder];
  }

  // Update accordion state
  if (previousActiveFolder !== activeFolder.value) {
    openedFolders[previousActiveFolder] = false;
  }
  if (!openedFolders[activeFolder.value]) {
    openedFolders[activeFolder.value] = true;
  }

  // Sort and re-select
  monsters.value[activeFolder.value] = sortMonstersByCR(activeFolder.value);
  const storedData = JSON.parse(localStorage.getItem('monsters')) || { generationCount: '0', firstGenerationTime: null };
  const dataToStore = { ...monsters.value, generationCount: storedData.generationCount, firstGenerationTime: storedData.firstGenerationTime };
  const newIndex = monsters.value[activeFolder.value].findIndex(m => m.name === currentMonsterName);
  selectMonster(activeFolder.value, newIndex);
  localStorage.setItem('monsters', JSON.stringify(dataToStore));

  // Reset and close
  showFolderMover.value = false;
  folderMoveTarget.value = '';
  newFolder.value = '';
  toast.success(`Moved to ${targetFolder}.`);
}

function deleteStatblock() {
  if (!confirm(`Delete "${monster.value.name}"? This cannot be undone.`)) return;

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
  errorMessage.value = '';
  const canGenerate = await canGenerateStatblock(props.premium);

  if (!canGenerate) {
    return;
  }
  loadingPart1.value = true;
  loadingPart2.value = true;
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
    errorMessage.value = e.message;
    toast.error('Failed to generate statblock. Please try again.');
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
    errorMessage.value = e.message;
    toast.error('Failed to generate statblock. Please try again.');
    loadingPart2.value = false;
    return;
  }

  const finalMonster = {
    ...JSON.parse(monsterStatsPart1),
    ...JSON.parse(monsterStatsPart2),
  };

  finalMonster.monsterDescription = monsterDescription.value;
  finalMonster.monsterType = monsterType.value;
  finalMonster.selectedChallengeRating = selectedChallengeRating.value || getFirstNumber(finalMonster.challenge_rating);
  finalMonster.monsterName = monsterName.value || monster.name;
  finalMonster.caster = caster.value;

  if (activeMonsterIndex.value !== null) {
    monsters.value[activeFolder.value][activeMonsterIndex.value] = finalMonster;
    monsters.value[activeFolder.value] = sortMonstersByCR(activeFolder.value);
    const newIndex = monsters.value[activeFolder.value].findIndex(monster => monster.name === finalMonster.name);
    selectMonster(activeFolder.value, newIndex);
  } else {
    const folderName = activeFolder.value || 'Uncategorized';
    if (!monsters.value[folderName]) {
      monsters.value[folderName] = [];
    }
    monster.value = finalMonster;
    monsters.value[folderName].push(finalMonster);
    monsters.value[folderName] = sortMonstersByCR(folderName);
    const newIndex = monsters.value[folderName].findIndex(monster => monster.name === finalMonster.name);
    selectMonster(folderName, newIndex);
  }
  const storedData = JSON.parse(localStorage.getItem('monsters')) || { generationCount: '0', firstGenerationTime: null };
  const dataToStore = { ...monsters.value, generationCount: storedData.generationCount, firstGenerationTime: storedData.firstGenerationTime };
  localStorage.setItem('monsters', JSON.stringify(dataToStore));
  loadingPart2.value = false;
  toast.success('Statblock generated and saved.');
}
</script>

<style lang="scss" scoped>
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';


.new-monster-button {
  min-width: 210px;
  margin: 2rem;
  height: 4rem;
}

.sidebar-content {
  $background-color: #f4f4f4;
  $active-color: #ffffff;
  $hover-background-color: #f0f0f0;
  $default-background-color: #e0e0e0;
  $active-border-color: #007BFF;
  $indentation-step: 20px;
  $transition-speed: 0.3s;

  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .sidebar-scroll {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
  }

  .sidebar-footer {
    flex-shrink: 0;
    padding: 1rem;
    border-top: 1px solid #e0e0e0;
    background-color: $background-color;
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
        color: inherit;
        cursor: pointer;
        border-left: 5px solid transparent;
        transition: background-color $transition-speed, border-left-color $transition-speed;

        &:hover {
          background-color: $hover-background-color;
        }

        &:focus {
          outline: none;
          border-left-color: $active-border-color;
        }

        &.active {
          background-color: $active-color;
          border-color: $active-border-color;
          font-weight: bold;
        }
      }
    }
  }
}

/* ========================================
   LANDING PAGE: Three-zone layout
   ======================================== */

.landing-wrapper {
  max-width: 855px;
  margin: 0 auto;
}

/* ZONE 1: Hero header — brand, headline, value prop */
.hero-header {
  text-align: center;
  padding: 2rem 1rem 2.5rem;

  .brand-line {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .brand-name {
    font-size: 1.4rem;
    font-weight: 500;
    color: $cdr-color-text-secondary;
    letter-spacing: 0.02em;
  }

  .version-pill {
    display: inline-block;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 0.2rem 0.8rem;
    border-radius: 100px;
    background-color: #ededed;
    color: $cdr-color-text-secondary;

    &.premium {
      background-color: #fdf3e0;
      color: #9c6a0a;
    }
  }

  h1 {
    font-size: 3.2rem;
    line-height: 1.15;
    margin: 0 0 0.75rem;
    color: $cdr-color-text-primary;
  }

  .value-prop {
    font-size: 1.6rem;
    font-weight: 400;
    color: $cdr-color-text-secondary;
    margin: 0;
  }
}

/* ZONE 2: Form card — elevated, clearly interactive */
.form-card {
  background-color: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 2.5rem 3rem;
}

/* ZONE 3: Footer meta — limit info, upsell */
.footer-meta {
  text-align: center;
  padding: 1.5rem 1rem 0;

  .limit-info {
    font-size: 1.2rem;
    color: $cdr-color-text-secondary;
    margin: 0;
    line-height: 1.6;
  }
}

/* ========================================
   FORM INTERNALS
   ======================================== */

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
  min-height: 100dvh;
  overflow-y: auto;
  overflow-x: visible;
  margin: 0 auto;
  padding: 2rem;

  @media screen and (min-width: 890px) {
    min-width: 890px;
  }
}

.monster-form {
  display: flex;
  flex-direction: column;

  button {
    align-self: flex-start;
    margin-top: 1.5rem;
  }
}

.intro-container {
  max-width: 855px;
  margin: 5px 20px;
  padding: 0 1.5rem;
}

/* ========================================
   ACTION BAR + FOLDER MOVER
   ======================================== */

.action-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  max-width: 850px;
}

.folder-mover {
  max-width: 850px;
  margin-bottom: 2rem;
  background-color: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.folder-mover-inner {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
}

@media screen and (max-width: 600px) {
  .action-bar {
    flex-direction: column;
  }

  .folder-mover-inner {
    flex-direction: column;
    align-items: stretch;
  }
}

@media screen and (max-width: 1020px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 600px) {
  .hero-header {
    padding: 1.5rem 0.5rem 2rem;

    h1 {
      font-size: 2.4rem;
    }
  }

  .form-card {
    padding: 1.5rem;
    border-radius: 8px;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>