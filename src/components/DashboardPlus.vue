<template>
  <div class="dashboard">
    <div class="form-container">
      <location-form @location-description-generated="addLocation($event)" @set-loading-state="loadingLocation = $event"
        buttonText="Add Location" :disabledButton="anythingLoading" />
    </div>
    <cdr-accordion-group>
      <cdr-accordion class="accordion" v-for="(location, locationIndex) in locations" :key="location.id"
        :id="'location-' + location.id" level="2" :opened="openedAccordions[locationIndex]"
        @accordion-toggle="toggleAccordion(locationIndex)">
        <template #label>
          {{ location.name }}
        </template>
        <div class="content-container">
          <cdr-tooltip id="tooltip-example" position="left" class="delete-button">
            <template #trigger>
              <cdr-button size="small" :icon-only="true" :with-background="true"
                @click.stop="deleteLocation(locationIndex)">
                <template #icon>
                  <icon-x-sm />
                </template>
              </cdr-button>
            </template>
            <div>
              Delete Location
            </div>
          </cdr-tooltip>
          <h2>{{ location.name }}</h2>
          <cdr-text class="body-text">{{ location.description }}</cdr-text>
          <div class="form-container">
            <h3>Potential NPCs in {{ location.name }}</h3>
            <cdr-text class="body-text"></cdr-text>
            <cdr-list>
              <li v-for="npcName in location.npcNames" :key="npcName" class="npc-name-example">
                <cdr-text class="body-text">{{ npcName }}</cdr-text>
                <NPCGenerationButton :disabledButton="anythingLoading" :sequentialLoading="true" :typeOfNPC="npcName"
                  :extraDescription="{ location: location.description, locationName: location.name }"
                  @npc-description-generated="addNPCPart(locationIndex, $event)"
                  @npc-description-part-received="updateFirstPartDescription(locationIndex, $event)"
                  @set-loading-state="setNPCLoadingState(locationIndex, $event)" />
              </li>
            </cdr-list>
            <NPCForm :disabledButton="anythingLoading" :sequentialLoading="true"
              :extraDescription="{ location: location.description, locationName: location.name }"
              labelText="Or, suggest your own NPC below (leave blank for a random NPC):"
              @npc-description-generated="addNPCPart(locationIndex, $event)"
              @npc-description-part-received="updateFirstPartDescription(locationIndex, $event)"
              @set-loading-state="setNPCLoadingState(locationIndex, $event)" />
          </div>
          <div v-if="location.subLocations && location.subLocations.length > 0" class="form-container">
            <h3>Potential Sub-locations in {{ location.name }}</h3>
            <cdr-text class="body-text"></cdr-text>
            <cdr-list>
              <li v-for="sublocation in location.subLocations" :key="sublocation" class="npc-name-example">
                <cdr-text class="body-text">{{ sublocation }}</cdr-text>
                <location-form buttonSize="small" :formContent="sublocation" :parentLocation="location"
                  @location-description-generated="addLocation($event)" @set-loading-state="loadingLocation = $event"
                  buttonText="Add Location" :disabledButton="anythingLoading" />
              </li>
            </cdr-list>
            <location-form formLabel="Or suggest your own Sub-location below" buttonSize="small"
              :parentLocation="location" @location-description-generated="addLocation($event)"
              @set-loading-state="loadingLocation = $event" buttonText="Add Location"
              :disabledButton="anythingLoading" />
          </div>
        </div>
        <cdr-accordion-group>
          <cdr-accordion class="accordion" v-for="(npc, npcIndex) in location.npcs" :key="npc.id" :id="'npc-' + npc.id"
            level="2" :opened="openedNPCAccordions[locationIndex][npcIndex]"
            @accordion-toggle="toggleNPCAccordion(locationIndex, npcIndex)">
            <template #label>
              <div class="accordion-header">
                {{ npc.character_name }}
              </div>
            </template>
            <div class="content-container">
              <cdr-tooltip id="tooltip-example" position="left" class="delete-button">
                <template #trigger>
                  <cdr-button size="small" :icon-only="true" :with-background="true"
                    @click.stop="deleteNPC(locationIndex, npcIndex)">
                    <template #icon>
                      <icon-x-sm />
                    </template>
                  </cdr-button>
                </template>
                <div>
                  Delete NPC
                </div>
              </cdr-tooltip>
              <h2>{{ npc.character_name }}</h2>
              <div class="read-aloud">
                <cdr-text class="body-text">{{ npc.read_aloud_description }}</cdr-text>
              </div>
              <cdr-text class="body-text">{{ npc.description_of_position }}</cdr-text>
              <cdr-text class="body-text">{{ npc.reason_for_being_there }}</cdr-text>
              <cdr-text class="body-text">{{ npc.distinctive_feature_or_mannerism }}</cdr-text>
              <cdr-text class="body-text">{{ npc.character_secret }}</cdr-text>
              <div v-if="!npc.loadingRelationships">
                <h3>Relationships</h3>
                <cdr-list>
                  <li class="relationship" v-for="(relationshipDescription, relationshipName) in npc.relationships"
                    :key="relationshipName">
                    <cdr-text class="body-text"><strong>{{ relationshipName }}</strong> : {{ relationshipDescription
                      }}</cdr-text>
                  </li>
                </cdr-list>
                <div class="relationship-buttons">
                  <h4>Generate a full description for:</h4>
                  <cdr-list modifier="inline" class="relationship-npc-buttons">
                    <li v-for="(relationshipDescription, relationshipName) in npc.relationships"
                      :key="relationshipName">
                      <NPCGenerationButton :disabledButton="anythingLoading" :sequentialLoading="true"
                        :buttonText="relationshipName" :typeOfNPC="relationshipName"
                        :extraDescription="{ locationName: location.name, locationContext: location.description, mainNPC: npc.character_name, relationship: npc.fullDescription + ' ' + relationshipName + ' ' + relationshipDescription }"
                        @npc-description-generated="addNPCPart(locationIndex, { ...$event, relationshipNPC: true })"
                        @npc-description-part-received="updateFirstPartDescription(locationIndex, $event)"
                        @set-loading-state="setNPCLoadingState(locationIndex, $event)" />
                    </li>
                  </cdr-list>
                </div>
                <h3>Roleplaying Tips</h3>
                <cdr-text class="body-text">{{ npc.roleplaying_tips }}</cdr-text>
              </div>
              <div v-if="npc.loadingRelationships">
                <RelationshipSkeleton />
              </div>
            </div>
          </cdr-accordion>
        </cdr-accordion-group>
        <cdr-accordion-group v-if="locations[locationIndex].loadingNPC">
          <cdr-accordion class="accordion" level="2" id="loading-npc">
            <template #label>
              <CdrSkeleton>
                <CdrSkeletonBone type="line" style="width:150px" />
              </CdrSkeleton>
            </template>
          </cdr-accordion>
        </cdr-accordion-group>
      </cdr-accordion>
    </cdr-accordion-group>
    <cdr-accordion-group v-if="loadingLocation">
      <cdr-accordion class="accordion" level="2" id="loading-location">
        <template #label>
          <CdrSkeleton>
            <CdrSkeletonBone type="line" style="width:150px" />
          </CdrSkeleton>
        </template>
      </cdr-accordion>
    </cdr-accordion-group>
  </div>

  <div class="instructions">
    <h3>Use Homebrewery to Make a Beautiful PDF of Your Generated Content!</h3>
    <cdr-list tag="ol" modifier="ordered">
      <li>Click the "Copy as Markdown" button below to copy the generated content in markdown format.</li>
      <li>Visit <a href="https://homebrewery.naturalcrit.com/new" target="_blank"
          rel="noopener noreferrer">Homebrewery</a>.</li>
      <li>Paste the copied markdown into the document on the left hand side. Feel free to edit or reorder the content as
        you like.</li>
      <li>Enjoy the beautifully formatted content!</li>
    </cdr-list>
    <div class="markdown-button">
      <cdr-button @click="copyAsMarkdown">Copy as Markdown</cdr-button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, nextTick, computed, onMounted } from 'vue';
import { CdrText, CdrList, CdrLink, CdrTooltip, CdrAccordionGroup, CdrAccordion, CdrInput, CdrButton, CdrSkeleton, CdrSkeletonBone, IconXSm } from '@rei/cedar';
import LocationForm from './LocationForm.vue';
import NPCGenerationButton from './NPCGenerationButton.vue';
import NPCForm from './NPCForm.vue';
import RelationshipSkeleton from "./RelationshipSkeleton.vue";
import { convertLocationsToMarkdown } from '../util/convertToMarkdown.mjs';
import '@rei/cedar/dist/style/cdr-input.css';
import '@rei/cedar/dist/cdr-fonts.css';
import '@rei/cedar/dist/reset.css';
import '@rei/cedar/dist/style/cdr-accordion.css';
import '@rei/cedar/dist/style/cdr-accordion-group.css';
import '@rei/cedar/dist/style/cdr-text.css';
import '@rei/cedar/dist/style/cdr-button.css';
import '@rei/cedar/dist/style/cdr-link.css';
import '@rei/cedar/dist/style/cdr-list.css';
import '@rei/cedar/dist/style/cdr-tooltip.css';
import "@rei/cedar/dist/style/cdr-skeleton.css";
import "@rei/cedar/dist/style/cdr-skeleton-bone.css";
export default {
  components: {
    CdrText,
    CdrList,
    CdrLink,
    CdrAccordion,
    CdrAccordionGroup,
    CdrInput,
    CdrButton,
    CdrTooltip,
    IconXSm,
    LocationForm,
    NPCForm,
    NPCGenerationButton,
    CdrSkeleton,
    CdrSkeletonBone,
    RelationshipSkeleton
  },
  setup() {
    const locations = reactive([]);
    loadLocationsFromLocalStorage();
    const loadingLocation = ref(false);
    const loadingNPC = ref(false);
    const openedAccordions = ref([]);
    const openedNPCAccordions = reactive(locations.map(location => location.npcs.map(() => false)));
    const newLocation = ref({ name: '', description: '' });
    const newNPCs = reactive(locations.map(() => ({ description: '' })));
    // const markdownString = convertLocationsToMarkdown(locations);
    // console.log(markdownString);
    onMounted(() => {
      resetLoadingStates();
    });

    const anythingLoading = computed(() => {
      return (
        loadingLocation.value ||
        locations.some(location =>
          location.npcs.some(npc => npc.loadingRelationships)
        ) ||
        locations.some(location => location.loadingNPC)
      );
    });

    function resetLoadingStates() {
      loadingLocation.value = false;
      locations.forEach(location => {
        location.loadingNPC = false;
        location.npcs.forEach(npc => {
          npc.loadingRelationships = false;
        });
      });
    }


    function addLocation(generatedData) {
      const id = locations.length + 1;
      const location = {
        id,
        name: generatedData.locationName,
        description: generatedData.locationDescription,
        npcNames: generatedData.locationNPCs,
        subLocations: generatedData.subLocations || [],
        npcs: [],
      };
      locations.push(location);
      saveLocationsToLocalStorage();
      // Add an empty object to the newNPCs array for the newly added location
      newNPCs.push({ description: '' });

      // Update openedNPCAccordions
      openedNPCAccordions.push([]);

      nextTick(() => {
        // Open the newly added accordion
        openedAccordions.value[locations.length - 1] = true;
      });
    }

    function deleteLocation(index) {
      openedAccordions.value[index] = false;
      locations.splice(index, 1);
      saveLocationsToLocalStorage();
    }

    function saveLocationsToLocalStorage() {
      localStorage.setItem('locations', JSON.stringify(locations));
    }

    function loadLocationsFromLocalStorage() {
      const storedLocations = localStorage.getItem('locations');
      if (storedLocations) {
        locations.splice(0, locations.length, ...JSON.parse(storedLocations));
      }
    }

    function addNPCPart(locationIndex, response) {
      if (response.part === 1) {
        updateFirstPartDescription(locationIndex, response.npcDescription);
        // Save first part
        locations[locationIndex].firstPartDescription = response.npcDescription;
      }
      if (response.part === 2) {
        // Merge first and second parts
        const completeDescription = { ...locations[locationIndex].firstPartDescription, ...response.npcDescription };
        addNPC(locationIndex, completeDescription);
        // Delete the first part after it's used
        delete locations[locationIndex].firstPartDescription;
      }
    }

    function addNPC(locationIndex, npcDescription) {
      const npc = locations[locationIndex].npcs[locations[locationIndex].npcs.length - 1];
      npc.relationships = npcDescription.relationships;
      npc.roleplaying_tips = npcDescription.roleplaying_tips;
      npc.read_aloud_description = npcDescription.read_aloud_description;
      npc.fullDescription = `${npcDescription.description_of_position} ${npcDescription.reason_for_being_there} ${npcDescription.distinctive_feature_or_mannerism} ${npcDescription.character_secret}`;

      delete newNPCs[locationIndex].firstPart; // Remove the first part property
      saveLocationsToLocalStorage();
    }


    function deleteNPC(locationIndex, npcIndex) {
      openedNPCAccordions[locationIndex][npcIndex] = false;
      locations[locationIndex].npcs.splice(npcIndex, 1);
      saveLocationsToLocalStorage();
    }

    function updateFirstPartDescription(locationIndex, npcDescription) {
      if (!newNPCs[locationIndex].hasOwnProperty("firstPart")) {
        newNPCs[locationIndex].firstPart = `${npcDescription.read_aloud_description} ${npcDescription.description_of_position} ${npcDescription.reason_for_being_there} ${npcDescription.distinctive_feature_or_mannerism} ${npcDescription.character_secret}`;

        const npc = {
          id: Math.random(),
          loadingRelationships: true,
          ...npcDescription
        };

        locations[locationIndex].npcs.push(npc);
        nextTick(() => {
          openedNPCAccordions[locationIndex][locations[locationIndex].npcs.length - 1] = true;
        });
      }
    }


    function toggleAccordion(index) {
      openedAccordions.value[index] = !openedAccordions.value[index];
    }

    function toggleNPCAccordion(locationIndex, npcIndex) {
      openedNPCAccordions[locationIndex][npcIndex] = !openedNPCAccordions[locationIndex][npcIndex];
    }

    function setNPCLoadingState(index, npcDescription) {
      if (npcDescription.part === 1) {
        locations[index].loadingNPC = npcDescription.isLoading;
      } else if (npcDescription.part === 2) {
        const npcIndex = locations[index].npcs.length - 1;
        locations[index].npcs[npcIndex].loadingRelationships = npcDescription.isLoading;
      }
    }

    function copyAsMarkdown() {
      // Replace `generatedMarkdown` with the variable that holds your generated markdown content.
      const markdownContent = convertLocationsToMarkdown(locations);

      if (markdownContent) {
        const textarea = document.createElement('textarea');
        textarea.textContent = markdownContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        // Optionally, display a message that the content has been copied.
        alert('Content copied as markdown!');
      } else {
        // If there is no content to copy, display a message to the user.
        alert('No content available to copy as markdown.');
      }
    }

    return {
      anythingLoading,
      locations,
      loadingLocation,
      loadingNPC,
      setNPCLoadingState,
      openedAccordions,
      openedNPCAccordions,
      updateFirstPartDescription,
      toggleAccordion,
      toggleNPCAccordion,
      newLocation,
      newNPCs,
      addLocation,
      deleteLocation,
      deleteNPC,
      addNPCPart,
      addNPC,
      copyAsMarkdown
    };
  },
};
</script>

<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';

//styling for a red message banner which spans the page
.message-banner {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  max-width: 700px;
  margin: auto;
}

.content-container {
  position: relative;
}

.delete-button {
  position: absolute;
  top: -6px;
  right: 3px;
}

.dashboard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px 30px;
  max-width: 700px;
}

h2 {
  font-family: Roboto, "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: 800;
  letter-spacing: 0px;
  font-size: 2.7rem;
  line-height: 3rem;
}

h3 {
  font-family: Roboto, "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0px;
  font-size: 2.2rem;
  line-height: 3rem;
}

.body-text {
  @include cdr-text-body-400();
  margin: 1rem 0;
}

.form-container {
  background-color: #f4f2ed;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.read-aloud {
  background-color: $cdr-color-background-secondary;
  color: $cdr-color-text-secondary;

  .body-text {
    @include cdr-text-body-400();
    font-style: italic;
  }

  padding: 1rem 2rem;
}

.cdr-accordion-group {
  max-width: 600px;
  margin: 0 auto;
}

.form {
  //display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.relationship {
  margin-left: 2rem;
  list-style-type: disc;
  border: none;
}

.relationship-buttons {
  background-color: #f4f2ed;
  border-radius: 8px;
  padding: 1rem 1rem 4rem 1rem;
  margin: 1rem auto;
  text-align: center;

  ul {
    justify-content: center;
    margin: 0;
  }

}

.accordion {
  border: 0.1rem solid #dcd6cb;

  &:hover {
    background: #fff;
  }

}

li.npc-name-example {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

li:hover {
  background-color: #eaeaea;
  cursor: pointer;
}

@media (min-width: 760px) {

  .dashboard {
    margin: 50px auto;
  }
}

.flex-bone {
  display: flex;
  gap: 10px;
}

.instructions {
  max-width: 700px;
  padding: 3rem;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.instructions h2 {
  margin-bottom: 1rem;
}

.instructions ol {
  padding-left: 1.5rem;
}

.instructions li {
  margin-bottom: 0.5rem;
}

.markdown-button {
  display: flex;

  button {
    margin: 2rem auto 1rem;
  }
}
</style>