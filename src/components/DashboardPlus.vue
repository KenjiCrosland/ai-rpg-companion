<template>
  <div class="dashboard">
    <h1>AI Powered Game Master Dashboard</h1>
    <div class="form-container">
      <location-form @location-description-generated="addLocation($event)" @set-loading-state="loadingLocation = $event"
        buttonText="Add Location" />
    </div>
    <cdr-accordion-group>
      <cdr-accordion class="accordion" v-for="(location, index) in locations" :key="location.id"
        :id="'location-' + location.id" level="2" :opened="openedAccordions[index]"
        @accordion-toggle="toggleAccordion(index)">
        <template #label>
          {{ location.name }}
        </template>
        <h2>{{ location.name }}</h2>
        <cdr-text class="body-text">{{ location.description }}</cdr-text>
        <div class="form-container">
          <NPCForm :combineResponses="true" :inputValue="newNPCs[index].description"
            labelText="Give me an NPC Description For:" @npc-description-generated="addNPC(index, $event)"
            @npc-description-part-received="updateFirstPartDescription(index, $event)"
            @set-loading-state="setNPCLoadingState($event)" />
        </div>
        <cdr-accordion-group>
          <cdr-accordion class="accordion" v-for="(npc, npcIndex) in location.npcs" :key="npc.id" :id="'npc-' + npc.id"
            level="2" :opened="openedNPCAccordions[index][npcIndex]"
            @accordion-toggle="toggleNPCAccordion(index, npcIndex)">
            <template #label>
              {{ npc.characterName }}
            </template>
            <h2>{{ npc.characterName }}</h2>
            <p>{{ npc.descriptionOfPosition }}</p>
            <p>{{ npc.reasonForBeingThere }}</p>
            <p>{{ npc.distinctiveFeatureOrMannerism }}</p>
            <p>{{ npc.characterSecret }}</p>
            <div v-if="!loadingRelationships">
              <h3>Relationships</h3>
              <ul>
                <li class="relationship" v-for="(relationshipDescription, relationshipName) in npc.relationships"
                  :key="relationshipName">
                  <cdr-text class="body-text"><strong>{{ relationshipName }}</strong> : {{ relationshipDescription
                  }}</cdr-text>
                </li>
              </ul>
              <h3>Roleplaying Tips</h3>
              <cdr-text class="body-text">{{ npc.roleplaying_tips }}</cdr-text>
            </div>
            <div v-if="loadingRelationships">
              <h3>Relationships</h3>
              <CdrSkeleton>
                <div>
                  <div class="flex-bone">
                    <CdrSkeletonBone type="line" style="width:10%;" /> :
                    <CdrSkeletonBone type="line" style="width:80%;" />
                  </div>
                  <CdrSkeletonBone type="line" style="width:100%; margin-top: 0" />
                  <CdrSkeletonBone type="line" style="width:90%;" />
                  <CdrSkeletonBone type="line" style="width:85%;" />
                </div>

                <div>
                  <div class="flex-bone">
                    <CdrSkeletonBone type="line" style="width:10%;" /> :
                    <CdrSkeletonBone type="line" style="width:80%;" />
                  </div>
                  <CdrSkeletonBone type="line" style="width:100%; margin-top: 0" />
                  <CdrSkeletonBone type="line" style="width:90%;" />
                  <CdrSkeletonBone type="line" style="width:85%;" />
                </div>

                <div>
                  <div class="flex-bone">
                    <CdrSkeletonBone type="line" style="width:10%;" /> :
                    <CdrSkeletonBone type="line" style="width:80%;" />
                  </div>
                  <CdrSkeletonBone type="line" style="width:100%; margin-top: 0" />
                  <CdrSkeletonBone type="line" style="width:90%;" />
                  <CdrSkeletonBone type="line" style="width:85%;" />
                </div>


                <h3>Roleplaying Tips</h3>

                <p style="margin-top: 0">
                  <CdrSkeletonBone type="line" style="width:95%" />
                  <CdrSkeletonBone type="line" style="width:90%" />
                  <CdrSkeletonBone type="line" style="width:85%" />
                  <CdrSkeletonBone type="line" style="width:95%" />
                  <CdrSkeletonBone type="line" style="width:60%" />
                </p>
              </CdrSkeleton>
            </div>
          </cdr-accordion>
        </cdr-accordion-group>
        <cdr-accordion-group v-if="loadingNPC">
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
</template>
  
<script>
import { ref, reactive, nextTick, onMounted } from 'vue';
import { CdrText, CdrList, CdrAccordionGroup, CdrAccordion, CdrInput, CdrButton, CdrSkeleton, CdrSkeletonBone } from '@rei/cedar';
import LocationForm from './LocationForm.vue';
import NPCForm from './NPCForm.vue';
import '@rei/cedar/dist/style/cdr-input.css';
import '@rei/cedar/dist/cdr-fonts.css';
import '@rei/cedar/dist/reset.css';
import '@rei/cedar/dist/style/cdr-accordion.css';
import '@rei/cedar/dist/style/cdr-accordion-group.css';
import '@rei/cedar/dist/style/cdr-text.css';
import '@rei/cedar/dist/style/cdr-button.css';
import '@rei/cedar/dist/style/cdr-link.css';
import '@rei/cedar/dist/style/cdr-list.css';
import "@rei/cedar/dist/style/cdr-skeleton.css";
import "@rei/cedar/dist/style/cdr-skeleton-bone.css";
export default {
  components: {
    CdrText,
    CdrList,
    CdrAccordion,
    CdrAccordionGroup,
    CdrInput,
    CdrButton,
    LocationForm,
    NPCForm,
    CdrSkeleton,
    CdrSkeletonBone
  },
  setup() {
    const locations = reactive([
      {
        id: 1,
        name: 'Mock Location 1',
        description: 'This is a mock description for Location 1. This is a mock description for Location 1. This is a mock description for Location 1. This is a mock description for Location 1',
        npcs: [
          {
            id: 1.1,
            characterName: 'Mock NPC 1',
            descriptionOfPosition: 'This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1',
            reasonForBeingThere: 'This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1',
            distinctiveFeatureOrMannerism: 'This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1',
            characterSecret: 'This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1',
            relationships: {
              'Mock Character 1': 'Mock relationship description for Mock Character 1. Mock relationship description for Mock Character 1. Mock relationship description for Mock Character 1.',
              'Mock Character 2': 'Mock relationship description for Mock Character 2. Mock relationship description for Mock Character 2. Mock relationship description for Mock Character 2. Mock relationship description for Mock Character 2.',
            },
            roleplaying_tips: 'These are mock roleplaying tips for NPC 1 in Location 1. These are mock roleplaying tips for NPC 1 in Location 1. These are mock roleplaying tips for NPC 1 in Location 1. These are mock roleplaying tips for NPC 1 in Location 1.',
          },
          {
            id: 1.2,
            characterName: 'Mock NPC 2',
            descriptionOfPosition: 'This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1',
            reasonForBeingThere: 'This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1',
            distinctiveFeatureOrMannerism: 'This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1',
            characterSecret: 'This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1. This is a mock description for NPC 1 in Location 1',
            relationships: {
              'Mock Character 3': 'Mock relationship description for Mock Character 3.',
              'Mock Character 4': 'Mock relationship description for Mock Character 4.',
            },
            roleplaying_tips: 'These are mock roleplaying tips for NPC 2 in Location 1.',
          },
        ],
      },
      {
        id: 2,
        name: 'Mock Location 2',
        description: 'This is a mock description for Location 2.',
        npcs: [
          {
            id: 2.1,
            name: 'Mock NPC 1',
            description: 'This is a mock description for NPC 1 in Location 2.',
            relationships: {
              'Mock Character 5': 'Mock relationship description for Mock Character 5.',
              'Mock Character 6': 'Mock relationship description for Mock Character 6.',
            },
            roleplayingTips: 'These are mock roleplaying tips for NPC 1 in Location 2.',
          },
          {
            id: 2.2,
            name: 'Mock NPC 2',
            description: 'This is a mock description for NPC 2 in Location 2.',
            relationships: {
              'Mock Character 7': 'Mock relationship description for Mock Character 7.',
              'Mock Character 8': 'Mock relationship description for Mock Character 8.',
            },
            roleplayingTips: 'These are mock roleplaying tips for NPC 2 in Location 2.',
          },
        ],
      },
    ]);
    const loadingLocation = ref(false);
    const loadingNPC = ref(false);
    const loadingRelationships = ref(false);
    const openedAccordions = ref([]);
    const openedNPCAccordions = reactive(locations.map(location => location.npcs.map(() => false)));
    const newLocation = ref({ name: '', description: '' });
    const newNPCs = reactive(locations.map(() => ({ description: '' })));

    function addLocation(generatedData) {
      const id = locations.length + 1;
      const location = {
        id,
        name: generatedData.locationName,
        description: generatedData.locationDescription,
        npcs: [],
      };
      locations.push(location);

      // Add an empty object to the newNPCs array for the newly added location
      newNPCs.push({ description: '' });

      // Update openedNPCAccordions
      openedNPCAccordions.push([]);

      nextTick(() => {
        // Open the newly added accordion
        openedAccordions.value[locations.length - 1] = true;
      });
    }

    async function addNPC(locationIndex, npcDescription) {
      const npc = {
        id: Math.random(),
        name: npcDescription.characterName,
        ...npcDescription
      };

      locations[locationIndex].npcs[locations[locationIndex].npcs.length - 1] = npc;
      delete newNPCs[locationIndex].firstPart; // Remove the first part property
    }

    function updateFirstPartDescription(locationIndex, npcDescription) {
      if (!newNPCs[locationIndex].hasOwnProperty("firstPart")) {
        newNPCs[locationIndex].firstPart = `${npcDescription.descriptionOfPosition} ${npcDescription.reasonForBeingThere} ${npcDescription.distinctiveFeatureOrMannerism} ${npcDescription.characterSecret}`;

        const npc = {
          id: Math.random(),
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

    function setNPCLoadingState({ part, isLoading }) {
      if (part === 1) {
        return loadingNPC.value = isLoading;
      }
      if (part === 2) {
        return loadingRelationships.value = isLoading;
      }
    }

    return {
      locations,
      loadingLocation,
      loadingNPC,
      loadingRelationships,
      setNPCLoadingState,
      openedAccordions,
      openedNPCAccordions,
      updateFirstPartDescription,
      toggleAccordion,
      toggleNPCAccordion,
      newLocation,
      newNPCs,
      addLocation,
      addNPC,
    };
  },
};
</script>
  
<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';

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
  list-style-type: disc;
  border: none;
}

.accordion {
  border: 0.1rem solid #dcd6cb;

  &:hover {
    background: #fff;
  }

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
</style>