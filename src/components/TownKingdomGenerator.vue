<template>
  <div class="main-content">
    <h1>Kingdom or Town Generator</h1>
    <form @submit.prevent="generateTownOrKingdom()">
      <div class="generator-fields">
        <cdr-input class="generator-field-input" id="adjective" v-model="adjective" background="secondary"
          label="Adjective">
          <template #helper-text-bottom>
            Examples: "Flourishing", "Decrepit", "Decadent"
          </template>
        </cdr-input>
        <cdr-input class="generator-field-input" id="kingdomType" v-model="kingdomType" background="secondary"
          label="Type of Place">
          <template #helper-text-bottom>
            Examples: "Kingdom", "Town", "City", "Republic"
          </template>
        </cdr-input>
        <p>Of</p>
        <cdr-input class="generator-field-input" id="placeName" v-model="placeName" background="secondary"
          label="Place name">
          <template #helper-text-bottom>
            Examples: "Kingdomaria", "Townland", "Citytopia", "Republic of the People"
          </template>
        </cdr-input>

      </div>
      <cdr-input :rows="5" tag="textarea" v-model="placeLore" background="secondary" label="Setting Lore"
        placeholder="Enter any any additional details about the setting" class="item-lore-details">
        <template #helper-text-bottom>
          Write any details about your setting that you want to include. Need help coming up with lore for your
          setting? Use the <cdr-link href="https://cros.land/ai-powered-lore-and-timeline-generator/">Lore
            Generator</cdr-link> and paste in the generated summary!
        </template>
      </cdr-input>

      <cdr-button @click="generateTownOrKingdom">Generate</cdr-button>
    </form>
    <cdr-tabs v-if="kingdomOverview" height="auto" style="width: 800px">
      <cdr-tab-panel label="Overview" name="overview">
        <h2>{{ placeName }} Overview</h2>
        <div>
          <p>{{ kingdomOverview.overview }}</p>
          <p>{{ kingdomOverview.history }}</p>
          <p>{{ kingdomOverview.current_ruler_sentence }} {{ kingdomOverview.recent_event_current_ruler }} {{
      kingdomOverview.recent_event_consequences }}</p>
          <p>{{ kingdomOverview.social_history }} {{ kingdomOverview.recent_event_social }}</p>
          <p>{{ kingdomOverview.economic_history }} {{ kingdomOverview.impactful_economic_event }}</p>
          <p>{{ kingdomOverview.military_history }} {{ kingdomOverview.recent_event_military }}</p>
          <p>{{ kingdomOverview.greatest_hope }}</p>
          <p>{{ kingdomOverview.darkest_fear }}</p>
        </div>
      </cdr-tab-panel>
      <cdr-tab-panel label="Important Locations" name="locations" @tab-change="generateSubLocations">
        <h2>Important Locations</h2>
        <div v-if="importantLocations.length > 0">
          <cdr-list>
            <li v-for="location in importantLocations" :key="location.name">
              <h3>{{ location.name }}</h3>
              <p>{{ location.description }}</p>
            </li>
          </cdr-list>
        </div>
        <div v-else>
          <LocationListSkeleton />
        </div>
      </cdr-tab-panel>
      <cdr-tab-panel v-if="kingdomOverview" label="Factions" name="factions" @tab-change="generateFactions">
        <h2>Factions</h2>
        <div v-if="factions">
          <cdr-list>
            <li v-for="faction in factions" :key="faction.name">
              <h3>{{ faction.name }}</h3>
              <p><strong>Influence Level: </strong>{{ factionPowerLevels[faction.influence_level - 1] }}</p>
              <div class="focus-text">
                <p><strong>Faction Leader, {{ faction.faction_leader }}:</strong> {{ faction.faction_leader_description
                  }}
                </p>
                <p><strong>Key Strengths: </strong> {{ faction.key_resources_and_assets }}</p>
                <p><strong>Motto: </strong>"{{ faction.motto }}"</p>
              </div>

              <p>{{ faction.history }}</p>
              <p>{{ faction.recent_event }} {{ faction.current_situation }}</p>
              <p>{{ faction.rites_and_ceremonies }} {{ faction.recent_ceremony }}</p>
              <p>{{ faction.challenge_to_power }} {{ faction.challenge_event }}</p>
            </li>
          </cdr-list>
        </div>
        <div v-else>
          <CdrSkeleton>
            <cdr-list>
              <li>
                <FactionSkeleton />
              </li>
              <li class="bone-list-item">
                <FactionSkeleton />
              </li>
              <li class="bone-list-item">
                <FactionSkeleton />
              </li>
            </cdr-list>
          </CdrSkeleton>
        </div>
      </cdr-tab-panel>
      <cdr-tab-panel v-if="npcs" label="Notable NPCs" name="npcs">
        <div v-if="npcs">
          <h2>Notable NPCs</h2>
          <cdr-list>
            <li v-for="npc in npcs" :key="npc.name">
              <h3>{{ npc.name }}</h3>
              <p>{{ npc.description }}</p>
            </li>
          </cdr-list>
        </div>
        <p v-else>Notable NPCs not yet generated</p>
      </cdr-tab-panel>
      <cdr-tab-panel label="Empty" name="empty">
        <p>Empty tab</p>
      </cdr-tab-panel>
    </cdr-tabs>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CdrInput, CdrButton, CdrText, CdrSelect, CdrTabs, CdrTabPanel, CdrCheckbox, CdrLink, CdrList, CdrSkeleton, CdrSkeletonBone, IconXSm, CdrTooltip } from "@rei/cedar";
import { kingdomOverviewPrompt, subLocationsPrompt, factionsPrompt } from "../util/kingdom-prompts.mjs";
import FactionSkeleton from "./skeletons/FactionSkeleton.vue";
import LocationListSkeleton from "./skeletons/LocationListSkeleton.vue";
import { generateGptResponse } from "../util/open-ai.mjs";
import placeAdjectives from '../data/place-adjectives.json';
import placeNames from '../data/place-names.json';
import '@rei/cedar/dist/style/cdr-text.css';
import '@rei/cedar/dist/style/cdr-link.css';
import '@rei/cedar/dist/style/cdr-list.css';
import '@rei/cedar/dist/style/cdr-tabs.css';
const adjective = ref('');
const kingdomType = ref('');
const placeName = ref('');
const placeLore = ref('');
const kingdomOverview = ref(null);
const factions = ref(null);
const importantLocations = ref([]);
const npcs = ref([]);
const loadingFactions = ref(false);
const loadingSubLocations = ref(false);

const npcNames = computed(() => npcs.value.map(npc => npc.name));

//computed property that turns the kindgom overview into a human readable non-json string separated by newlines
const kingdomOverviewText = computed(() => {
  if (!kingdomOverview.value) {
    return '';
  }
  return Object.entries(kingdomOverview.value).map(([key, value]) => {
    if (Array.isArray(value)) {
      return '';
    }
    return `${value}`;
  }).join('\n');
});

const kingdomValidation = (jsonString) => {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = [
      'overview',
      'history',
      'current_ruler_sentence',
      'recent_event_current_ruler',
      'recent_event_consequences',
      'social_history',
      'recent_event_social',
      'economic_history',
      'impactful_economic_event',
      'military_history',
      'recent_event_military',
      'greatest_hope',
      'darkest_fear',
      'npc_list',
    ];
    const npcKeys = [
      'name',
      'description',
    ];
    for (let npc of jsonObj.npc_list) {
      if (!npcKeys.every((key) => key in npc)) {
        return false;
      }
    }
    return keys.every((key) => key in jsonObj);
  } catch (error) {
    return false;
  }
}

const factionPowerLevels = [
  'Nonexistent',
  'Marginal',
  'Emerging',
  'Moderate',
  'Noteworthy',
  'Influential',
  'Powerful',
  'Dominant',
  'Controlling',
  'Totalitarian'
];

const sublocationValidation = (jsonString) => {
  console.log(jsonString);
  try {
    const jsonObj = JSON.parse(jsonString);
    console.log(jsonObj);
    const locationKeys = [
      'name',
      'description'
    ];
    for (let location of jsonObj) {
      if (!locationKeys.every((key) => key in location)) {
        return false;
      }
    }
    return true;
  } catch (error) {
    return false;
  }
}

const factionValidation = (jsonString) => {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = [
      'name',
      'history',
      'recent_event',
      'current_situation',
      'motto',
      'influence_level',
      'faction_leader',
      'faction_leader_description',
      'key_resources_and_assets',
      'rites_and_ceremonies',
      'recent_ceremony',
      'challenge_to_power',
      'challenge_event'
    ];
    for (let faction of jsonObj) {
      if (!keys.every((key) => key in faction)) {
        return false;
      }
    }
    return true;
  } catch (error) {
    return false;
  }
}

const generateTownOrKingdom = async () => {
  if (!kingdomType.value) {
    const placeTypes = Object.keys(placeAdjectives);
    console.log(placeTypes)
    kingdomType.value = placeTypes[Math.floor(Math.random() * placeTypes.length)];
  }
  if (!adjective.value && placeAdjectives[kingdomType.value.toLowerCase()]) {
    adjective.value = placeAdjectives[kingdomType.value][Math.floor(Math.random() * placeAdjectives[kingdomType.value.toLowerCase()].length)];
  }
  if (!placeName.value && placeNames[kingdomType.value.toLowerCase()]) {
    placeName.value = placeNames[kingdomType.value.toLowerCase()][Math.floor(Math.random() * placeNames[kingdomType.value.toLowerCase()].length)];
  }
  const prompt = kingdomOverviewPrompt(adjective.value, kingdomType.value, placeName.value, placeLore.value);
  try {
    const response = await generateGptResponse(prompt, kingdomValidation, 3);
    kingdomOverview.value = JSON.parse(response);
    npcs.value.push(...kingdomOverview.value.npc_list);
  } catch (error) {
    console.error("Error generating kingdom description:", error);
  }
}

const generateSubLocations = async () => {
  if (!kingdomOverview.value || loadingSubLocations.value || importantLocations.value.length > 0) {
    return;
  }
  loadingSubLocations.value = true;
  const subLocationsResponse = await generateGptResponse(subLocationsPrompt(kingdomOverviewText.value), sublocationValidation, 3);
  const subLocations = JSON.parse(subLocationsResponse);
  importantLocations.value.push(...subLocations);
  console.log('Generated sublocations', importantLocations.value);
  loadingSubLocations.value = false;
}

const generateFactions = async () => {
  if (loadingFactions.value || factions.value || !kingdomOverview.value) {
    return;
  }
  loadingFactions.value = true;
  console.log('Generating factions')
  const factionsResponse = await generateGptResponse(factionsPrompt(kingdomOverviewText.value), factionValidation, 3);
  factions.value = JSON.parse(factionsResponse);
  factions.value.forEach(faction => {
    if (!npcNames.value.includes(faction.faction_leader)) {
      npcs.value.push({
        name: faction.faction_leader,
        description: faction.faction_leader_description
      });
    }
  });
  loadingFactions.value = false;
}
</script>

<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  max-width: 800px;
  height: 100vh;
}

.generator-fields {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.focus-text {
  background-color: $cdr-color-background-secondary;
  color: $cdr-color-text-secondary;
  padding: 1rem 2rem;
  font-style: italic;
}

.skeleton-line {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.bone-list-item {
  margin: 4rem 0;
}
</style>
