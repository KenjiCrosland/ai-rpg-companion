<template>
  <div class="app_container">
    <h1>RPG Dungeon Generator</h1>
    <cdr-select v-model="roomType" label="Dungeon room type" prompt="Choose a dungeon room type"
        :options="['Entrance', 'Roleplaying Challenge', 'Physical Challenge', 'Trick or Setback', 'Final Confrontation']" />
    <dungeon-entrance v-if="roomType === 'Entrance'"/>
    <DungeonRPChallenge v-if="roomType === 'Roleplaying Challenge'" />
  </div>
</template>
      
<script>
import { ref } from 'vue';
import DungeonEntrance from "./DungeonEntrance.vue";
import DungeonRPChallenge from './DungeonRPChallenge.vue';
import { CdrText, CdrSelect } from "@rei/cedar";
import _ from 'lodash';
import "@rei/cedar/dist/cdr-fonts.css";
import "@rei/cedar/dist/reset.css";

export default {
  components: {
    CdrText,
    CdrSelect,
    DungeonEntrance,
    DungeonRPChallenge
  },
  setup() {
    const roomType = ref('Roleplaying Challenge');

    return {
      roomType,
    };
  }
};
</script>
      
<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.app_container {
  @include cdr-text-body-400();
  color: $cdr-color-text-primary;
  max-width: 800px;
  margin: 20px auto;
  padding: 2px 30px 30px 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

</style>
  