<template>
  <div class="app-container">
    <h1>RPG Location Description Generator</h1>
    <hr>
    <cdr-text class="intro">
      Welcome to the RPG Location Description Generator! This App uses a custom trained GPT Model to provide engaging
      descriptions
      of locations for your players. Some examples of types of locations might be:
    </cdr-text>

    <cdr-list class="suggestions" modifier="unordered">
      <li v-for="example in examples" :key="example">
        <cdr-link modifier="standalone" @click="setInputValue(example)">{{ example }}</cdr-link>
      </li>
    </cdr-list>

    <location-form ref="locationForm" @set-loading-state="loading = $event"
      @location-description-generated="gptResponse = $event" @location-description-error="handleError($event)" />

    <div v-if="loading" class="location-description">
      <p>
        <CdrSkeleton>
          <CdrSkeletonBone type="line" style="width:95%" />
          <CdrSkeletonBone type="line" style="width:90%" />
          <CdrSkeletonBone type="line" style="width:85%" />
          <CdrSkeletonBone type="line" style="width:95%" />
          <CdrSkeletonBone type="line" style="width:50%" />
        </CdrSkeleton>
      </p>
    </div>
    <div v-if="gptResponse" class="location-description">
      <h2>{{ gptResponse.locationName }}</h2>
      {{ gptResponse.locationDescription }}
    </div>
    <div class="patreon">
      <cdr-link href="https://www.patreon.com/bePatron?u=2356190">Support Me on Patreon!</cdr-link>
    </div>
  </div>
</template>

<script>
import {
  CdrInput,
  CdrLink,
  CdrButton,
  CdrText,
  CdrList,
  CdrSkeleton,
  CdrSkeletonBone,
} from "@rei/cedar";
import "@rei/cedar/dist/style/cdr-input.css";
import "@rei/cedar/dist/cdr-fonts.css";
import "@rei/cedar/dist/reset.css";
import "@rei/cedar/dist/style/cdr-text.css";
import "@rei/cedar/dist/style/cdr-button.css";
import "@rei/cedar/dist/style/cdr-link.css";
import "@rei/cedar/dist/style/cdr-list.css";
import "@rei/cedar/dist/style/cdr-skeleton.css";
import "@rei/cedar/dist/style/cdr-skeleton-bone.css";
import LocationForm from "./LocationForm.vue";

export default {
  data() {
    return {
      gptResponse: "",
      typeOfPlace: "",
      examples: [
        "The captain's quarters on a spelljammer ship",
        "A tavern in Neverwinter that serves as a front for the local chapter of the Zhentarim",
        "A tea house where the Emerald Champion Doji Satsume often frequents in the Land of Rokugan",
        "A gnome's workshop and home deep in the feywild who makes sentient puppets",
        "An upscale ripperdoc establishment in Night City",
      ],
      loading: false,
    };
  },
  components: {
    CdrInput,
    CdrText,
    CdrButton,
    CdrLink,
    CdrList,
    CdrSkeleton,
    CdrSkeletonBone,
    LocationForm,
  },
  methods: {
    setInputValue(value) {
      this.$refs.locationForm.updateInputValue(value);
    },
    handleError(errorMessage) {
      console.error(errorMessage);
      this.loading = false;
    },
  },
};
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

div[class^="cdr-skeleton-bone"] {
  block-size: 2rem;
  margin: 1.1rem 0;
}

hr {
  border: 1px solid $cdr-color-border-secondary;
  width: 80%;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.intro {
  @include cdr-text-body-400();
}

.suggestions {
  margin-left: 2rem;
  padding: 2rem;
}

.credits {
  @include cdr-text-body-400();
  margin: 5px auto;
  text-align: center;
}

h1 {
  @include cdr-text-heading-serif-1000;
}

form {
  background-color: $cdr-color-background-secondary;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.generate-button {
  align-self: flex-start;
}

.location-description {
  @include cdr-text-body-500();
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.patreon {
  margin: 30px auto 0 auto;
  text-align: center;
}
</style>