<template>
  <div class="location-wrapper">
    <ToolNavigation />

    <div class="app-container">
    <div class="main-container">
      <div class="form-container">
        <h1>Kenji's RPG Location Description Generator</h1>

        <cdr-text class="intro">
          Welcome to the RPG Location Description Generator! This app instantly generates engaging
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
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="ogl-footer">
    <div class="footer-title">Kenji's Game Master Tools</div>
    <div class="footer-links">
      <cdr-link href="https://cros.land" target="_blank">Blog</cdr-link>
      <span class="separator">•</span>
      <cdr-link href="https://discord.gg/DJVTbkH4VG" target="_blank">Discord</cdr-link>
      <span class="separator">•</span>
      <cdr-link href="https://www.patreon.com/c/ai_rpg_tookit" target="_blank">Patreon</cdr-link>
    </div>
    <div class="ogl-text">
      This content uses the D&D 5e SRD under the <cdr-link href="https://cros.land/ogl" target="_blank">Open Gaming License</cdr-link>
    </div>
  </footer>

  <!-- Mobile Bottom Bar (no sidebar, just navigation) -->
  <div class="mobile-bottom-bar">
    <select :value="currentSlug" @change="navigate($event.target.value)">
      <optgroup label="Generators">
        <option v-for="tool in mainTools" :key="tool.slug" :value="tool.slug">
          {{ tool.name }}
        </option>
      </optgroup>
      <optgroup label="Patron Exclusive">
        <option v-for="tool in patronTools" :key="tool.slug" :value="tool.slug">
          ★ {{ tool.name }}
        </option>
      </optgroup>
    </select>
  </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { CdrText, CdrList, CdrLink, CdrSkeleton, CdrSkeletonBone } from '@rei/cedar';
import LocationForm from './LocationForm.vue';
import ToolNavigation from '@/components/ToolNavigation.vue';
import { mainTools, patronTools, getCurrentSlug, navigate as navigateToTool } from '@/data/tool-navigation.js';

const loading = ref(false);
const gptResponse = ref(null);

const locationFormRef = ref(null);
const currentSlug = computed(() => getCurrentSlug());

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

function navigate(slug) {
  if (slug === currentSlug.value) return;
  navigateToTool(slug);
}
</script>

<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';

.location-wrapper {
  position: relative;
}

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

.ogl-footer {
  text-align: center;
  padding: 2rem 1rem;
  margin-top: 3rem;
  border-top: 1px solid #dee2e6;
  color: $cdr-color-text-secondary;
  font-size: 1.5rem;

  .footer-title {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: $cdr-color-text-primary;
  }

  .footer-links {
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;

    .separator {
      color: #999;
      margin: 0 0.25rem;
    }
  }

  .ogl-text {
    font-size: 1.5rem;
    color: $cdr-color-text-secondary;
  }
}

.mobile-bottom-bar {
  display: none;
}

@media (max-width: 768px) {
  .main-container {
    margin: 1rem auto;
    padding-bottom: 5rem;
  }

  .form-container {
    padding: 1.5rem;
  }

  .mobile-bottom-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1002;
    padding: 1rem 1.25rem;
    background: #fff;
    border-top: 1px solid #e5e5e5;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
  }

  .mobile-bottom-bar select {
    width: 100%;
    max-width: 600px;
    font-size: 1.125rem;
    padding: 0.75rem 0.875rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    color: #333;
  }
}
</style>
