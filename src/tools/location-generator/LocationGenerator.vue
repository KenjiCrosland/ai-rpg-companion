<template>
  <div class="location-wrapper">
    <ToolNavigation />

    <div class="app-container">
    <div class="main-container">
      <div class="form-container parchment paper-grain">
        <div class="location-heading">
          <span class="location-heading__tag">Kenji's Location Generator</span>
          <h1 class="location-heading__title">Describe a location for your players</h1>
          <p class="location-heading__tagline">
            Atmospheric, four-sentence descriptions for any place your party walks into.
          </p>
        </div>

        <p class="location-suggestions__label">Try one of these:</p>
        <ul class="location-suggestions">
          <li v-for="example in examples" :key="example">
            <button type="button" class="location-suggestion-link" @click="setInputValue(example)">
              {{ example }}
            </button>
          </li>
        </ul>

        <LocationForm ref="locationFormRef" @set-loading-state="loading = $event"
          @location-description-generated="onLocationGenerated" @location-description-error="handleError" />

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
          <h2 class="result-card__name">{{ gptResponse.locationName }}</h2>
          <p class="result-card__body">{{ gptResponse.locationDescription }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="ogl-footer">
    <div class="footer-title">Kenji's Game Master Tools</div>
    <div class="footer-links">
      <cdr-link href="https://cros.land/kenjis-game-master-tool-updates/" target="_blank">What's new</cdr-link>
      <span class="separator">•</span>
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
import { CdrLink, CdrSkeleton, CdrSkeletonBone } from '@rei/cedar';
import LocationForm from './LocationForm.vue';
import ToolNavigation from '@/components/ToolNavigation.vue';
import { mainTools, patronTools, getCurrentSlug, navigate as navigateToTool } from '@/data/tool-navigation.js';
import { trackEvent } from '@/util/analytics.mjs';

const loading = ref(false);
const gptResponse = ref(null);

// Analytics: a location was generated (only the standalone tool — LocationForm
// embedded in other tools emits to a different parent).
const onLocationGenerated = (e) => {
  gptResponse.value = e;
  trackEvent('generate', { tool: 'location-generator' });
};

const locationFormRef = ref(null);
const currentSlug = computed(() => getCurrentSlug());

const examples = [
  "The captain's quarters aboard a star-galleon sailing the astral void",
  "A tavern in a rain-soaked harbor city that fronts for a shadowy thieves' guild",
  "A tea house favored by a renowned duelist in a land of feuding samurai clans",
  "A gnome's workshop deep in a fae forest, where she crafts sentient puppets",
  "An upscale back-alley cyber-clinic in a neon-drenched megacity",
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
  min-height: 70vh;
}

.form-container {
  padding: 2.25rem 2.5rem 2rem;
  background-color: var(--par-color-surface-card, #FEFBF4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

/* ── Editorial heading ─────────────────────────────────────────────────── */
.location-heading {
  text-align: center;
  margin-bottom: 1.75rem;
}

.location-heading__tag {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--color-action-secondary-rest, #5A7A9A);
  letter-spacing: 0.04em;
}

.location-heading__title {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 3rem;
  font-weight: 600;
  color: var(--color-action-hover, #2A4D70);
  margin: 0.4rem 0 0.5rem;
  line-height: 1.15;
}

.location-heading__tagline {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  margin: 0;
  line-height: 1.5;
}

/* ── Suggestions ───────────────────────────────────────────────────────── */
.location-suggestions__label {
  margin: 0 0 0.5rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.location-suggestions {
  list-style: none;
  padding: 0;
  margin: 0 0 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.location-suggestion-link {
  appearance: none;
  -webkit-appearance: none;
  background: none;
  border: none;
  padding: 0;
  text-align: left;
  cursor: pointer;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  font-style: italic;
  line-height: 1.5;
  color: var(--color-action-rest, #365A85);
  text-decoration: underline;
  text-underline-offset: 0.15em;
  text-decoration-color: var(--par-color-border-strong, #c9b99a);
}

.location-suggestion-link:hover,
.location-suggestion-link:focus-visible {
  color: var(--color-action-hover, #2A4D70);
  text-decoration-color: currentColor;
  outline: none;
}

/* ── Result card — cream surface, burgundy serif name + serif body. ──────── */
.result-card {
  margin-top: 2rem;
  padding: 1.5rem 1.75rem;
  background-color: var(--par-color-callout-bg-light, #F8F2E3);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
}

.result-card__name {
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 2.2rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  line-height: 1.2;
}

.result-card__body {
  margin-top: 0.75rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.6rem;
  line-height: 1.7;
  color: var(--par-color-text, #222);
}

div[class^="cdr-skeleton-bone"] {
  block-size: 2rem;
  margin: 1.1rem 0;
}

.ogl-footer {
  display: none; /* Hidden - footer now in WordPress template */
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
