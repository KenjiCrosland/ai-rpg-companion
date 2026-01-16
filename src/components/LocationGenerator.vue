<template>
  <ToolSuiteShowcase :premium="false" display-mode="banner" />

  <div class="app-container">
    <div class="main-container">
      <div class="form-container">
        <h1>Kenji's RPG Location Description Generator</h1>

        <cdr-text class="intro">
          Welcome to the RPG Location Description Generator! This app uses the ChatGPT API to generate engaging
          descriptions of locations for your players.
        </cdr-text>

        <cdr-text class="intro">
          Try one of these:
        </cdr-text>

        <cdr-list class="suggestions" modifier="unordered">
          <li v-for="example in examples" :key="example">
            <cdr-link modifier="standalone" @click="setInputValue(example)">
              {{ example }}
            </cdr-link>
          </li>
        </cdr-list>

        <LocationForm ref="locationFormRef" @set-loading-state="loading = $event"
          @location-description-generated="gptResponse = $event" @location-description-error="handleError" />

        <!-- Loading skeleton -->
        <div v-if="loading" class="result-card">
          <CdrSkeleton>
            <CdrSkeletonBone type="line" style="width:95%" />
            <CdrSkeletonBone type="line" style="width:90%" />
            <CdrSkeletonBone type="line" style="width:85%" />
            <CdrSkeletonBone type="line" style="width:95%" />
            <CdrSkeletonBone type="line" style="width:50%" />
          </CdrSkeleton>
        </div>

        <!-- Result -->
        <div v-if="gptResponse && !loading" class="result-card">
          <h2>{{ gptResponse.locationName }}</h2>
          <p class="body-text">{{ gptResponse.locationDescription }}</p>
        </div>

        <div class="footer-link">
          <cdr-link href="https://www.patreon.com/bePatron?u=2356190" target="_blank">
            Support Me on Patreon!
          </cdr-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CdrText, CdrList, CdrLink, CdrSkeleton, CdrSkeletonBone } from '@rei/cedar';
import LocationForm from './LocationForm.vue';
import ToolSuiteShowcase from './ToolSuiteShowcase.vue';

const loading = ref(false);
const gptResponse = ref(null);

const locationFormRef = ref(null);

const examples = [
  "The captain's quarters on a spelljammer ship",
  "A tavern in Neverwinter that serves as a front for the local chapter of the Zhentarim",
  "A tea house where the Emerald Champion Doji Satsume often frequents in the Land of Rokugan",
  "A gnome's workshop and home deep in the feywild who makes sentient puppets",
  "An upscale ripperdoc establishment in Night City",
];

const setInputValue = (value) => {
  locationFormRef.value?.updateInputValue(value);
};

const handleError = (errorMessage) => {
  console.error(errorMessage);
  loading.value = false;
};
</script>

<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';

.app-container {
  display: flex;
}

.main-container {
  margin: 3rem auto;
  max-width: 800px;
  width: 100%;
  padding: 0 1rem;
}

.form-container {
  color: $cdr-color-text-primary;
  padding: 2rem 3rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.intro {
  margin-top: 1rem;
  line-height: 1.5;
}

.suggestions {
  margin-top: 1rem;
  margin-left: 1.25rem;
  padding: 0.75rem 0;
}

.result-card {
  margin-top: 2rem;
  padding: 1.25rem 1.5rem;
  background-color: $cdr-color-background-secondary;
  border-radius: 8px;
}

.body-text {
  margin-top: 0.75rem;
  line-height: 1.6;
}

div[class^="cdr-skeleton-bone"] {
  block-size: 2rem;
  margin: 1.1rem 0;
}

.footer-link {
  margin-top: 2rem;
  text-align: center;
}

@media (max-width: 768px) {
  .main-container {
    margin: 1rem auto;
  }

  .form-container {
    padding: 1.5rem;
  }
}
</style>
