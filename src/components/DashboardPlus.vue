<template>
    <div>
      <div class="form-container">
        <cdr-input v-model="newLocation.name" placeholder="New location name" />
        <cdr-input
          v-model="newLocation.description"
          placeholder="New location description"
        ></cdr-input>
        <cdr-button @click="addLocation">Add Location</cdr-button>
      </div>
      <cdr-accordion-group>
        <cdr-accordion
          v-for="(location, index) in locations"
          :key="location.id"
          :id="'location-' + location.id"
          level="4"
          :opened="openedAccordions[index]"
          @accordion-toggle="toggleAccordion(index)"
        >
          <template #label>
            {{ location.name }}
          </template>
          <p>{{ location.description }}</p>
          <cdr-input
            v-model="newNPCs[index].description"
            placeholder="New NPC description"
          ></cdr-input>
          <cdr-button @click="addNPC(index)">Add NPC</cdr-button>
          <cdr-accordion-group>
            <cdr-accordion
              v-for="(npc, npcIndex) in location.npcs"
              :key="npc.id"
              :id="'npc-' + npc.id"
              level="4"
              :opened="openedNPCAccordions[index][npcIndex]"
              @accordion-toggle="toggleNPCAccordion(index, npcIndex)"
            >
              <template #label>
                {{ npc.name }}
              </template>
              <p>{{ npc.description }}</p>
            </cdr-accordion>
          </cdr-accordion-group>
        </cdr-accordion>
      </cdr-accordion-group>
    </div>
  </template>
  
  
  
  <script>
  import { ref, reactive, onMounted } from 'vue';
  import { CdrAccordionGroup, CdrAccordion, CdrInput, CdrButton } from '@rei/cedar';
  import '@rei/cedar/dist/style/cdr-input.css';
  import '@rei/cedar/dist/cdr-fonts.css';
  import '@rei/cedar/dist/reset.css';
  import '@rei/cedar/dist/style/cdr-accordion.css';
  import '@rei/cedar/dist/style/cdr-accordion-group.css';
  import '@rei/cedar/dist/style/cdr-text.css';
  import '@rei/cedar/dist/style/cdr-button.css';
  import '@rei/cedar/dist/style/cdr-link.css';
  import '@rei/cedar/dist/style/cdr-list.css';
  export default {
      components: {
          CdrAccordion,
          CdrAccordionGroup,
          CdrInput,
          CdrButton,
      },
      setup() {
      const locations = reactive([
        {
          id: 1,
          name: 'Location 1',
          description: 'Lorem ipsum',
          npcs: [
            { id: 1, name: 'NPC 1.1', description: 'Lorem ipsum' },
            { id: 2, name: 'NPC 1.2', description: 'Lorem ipsum' },
          ],
        },
        {
          id: 2,
          name: 'Location 2',
          description: 'Lorem ipsum',
          npcs: [
            { id: 3, name: 'NPC 2.1', description: 'Lorem ipsum' },
            { id: 4, name: 'NPC 2.2', description: 'Lorem ipsum' },
          ],
        },
      ]);
  
      const openedAccordions = ref([]);
      const openedNPCAccordions = reactive(locations.map(location => location.npcs.map(() => false)));
      const newLocation = ref({ name: '', description: '' });
      const newNPCs = reactive(locations.map(() => ({ description: '' })));
  
      function addLocation() {
        const id = locations.length + 1;
        const location = {
          id,
          name: newLocation.value.name,
          description: newLocation.value.description,
          npcs: [],
        };
        locations.push(location);
        newLocation.value.name = '';
        newLocation.value.description = '';
      }
  
      function getDummyResponse() {
        return {
          name: 'Lorem ipsum',
          description: 'Lorem ipsum',
        };
      }
  
      function addNPC(index) {
        const newNPCDescription = newNPCs[index].description;
  
        // Get dummy data for name and description
        const { name, description } = getDummyResponse();
  
        const npc = {
          id: Math.random(),
          name,
          description,
        };
  
        locations[index].npcs.push(npc);
        newNPCs[index].description = '';
      }
  
      function toggleAccordion(index) {
        openedAccordions.value[index] = !openedAccordions.value[index];
      }

      function toggleNPCAccordion(locationIndex, npcIndex) {
        openedNPCAccordions[locationIndex][npcIndex] = !openedNPCAccordions[locationIndex][npcIndex];
      }
      return {
        locations,
        openedAccordions,
        openedNPCAccordions,
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
  
<style scoped>
.cdr-accordion-group {
    max-width: 600px;
    margin: 0 auto;
}

.form {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

li {
    padding: 8px 16px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    margin-bottom: 4px;
    font-size: 16px;
}

li:hover {
    background-color: #eaeaea;
    cursor: pointer;
}
</style>