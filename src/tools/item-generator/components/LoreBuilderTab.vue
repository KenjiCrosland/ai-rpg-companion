<template>
  <div class="lore-builder-container">
    <!-- Current Year Input -->
    <div class="year-input-section">
      <cdr-input v-model="currentYear" label="Current Year in Your World" background="secondary"
        placeholder="e.g., 1492 DR, Year 3024, 5th Age" :error="yearError" @blur="validateYear">
        <template #helper-text-bottom>
          Set your world's current year to calculate historical dates
        </template>
        <template #error>
          <span>{{ yearErrorMessage }}</span>
        </template>
      </cdr-input>
    </div>

    <!-- Timeline Section -->
    <div class="timeline-section">
      <h3>Historical Timeline of {{ item.name }}</h3>

      <!-- Add Timeline Button -->
      <div v-if="!showTimelineCards && timelineEvents.length === 0" class="add-timeline-prompt">
        <cdr-button @click="startTimeline" modifier="secondary" size="large">
          + Create Historical Timeline
        </cdr-button>
      </div>

      <!-- Timeline Controls -->
      <div v-if="showTimelineCards || timelineEvents.length > 0" class="timeline-controls">
        <cdr-button @click="showAddButtons = !showAddButtons" modifier="secondary" size="small">
          {{ showAddButtons ? 'Hide Add Buttons' : 'Add Events to Timeline' }}
        </cdr-button>
        <p v-if="!premium" class="generation-info">
          {{ remainingGenerations }} lore generation{{ remainingGenerations !== 1 ? 's' : '' }} remaining today
        </p>
      </div>

      <div v-if="showTimelineCards || timelineEvents.length > 0" class="filmstrip-container">
        <cdr-button v-if="showLeftArrow" @click="scrollFilmstrip('left')" modifier="secondary" size="small"
          class="filmstrip-arrow filmstrip-arrow-left">
          ←
        </cdr-button>

        <div class="filmstrip" ref="filmstrip" @scroll="checkScroll">
          <!-- If no events and showing cards, show the first event form directly -->
          <div v-if="timelineEvents.length === 0 && showTimelineCards" class="timeline-card generating-card">
            <div class="generating-content">
              <h4>Create First Event</h4>

              <!-- Custom compact toggle when we have a pending event -->
              <div v-if="pendingEvent" class="custom-toggle">
                <button :class="['toggle-btn', { active: viewMode === 'form' }]" @click="viewMode = 'form'">
                  Event Form
                </button>
                <button :class="['toggle-btn', { active: viewMode === 'preview' }]" @click="viewMode = 'preview'">
                  Preview
                </button>
              </div>

              <!-- Form View -->
              <div v-show="!pendingEvent || viewMode === 'form'" class="form-view">
                <cdr-select v-model="firstEventType" label="Event Type" prompt="Choose type" :options="eventTypeOptions"
                  size="small" />

                <cdr-select v-model="firstTimePeriod" label="Time Period" prompt="Choose when"
                  :options="getAvailablePeriodsForPosition(0)" size="small" />

                <cdr-input v-model="firstAdditionalContext" label="Context (optional)" tag="textarea" :rows="2"
                  background="secondary" size="small" />

                <div v-if="!pendingEvent" class="button-row">
                  <cdr-button @click="generateFirstEvent"
                    :disabled="!firstEventType || !firstTimePeriod || loadingEvents" size="small" :full-width="true">
                    {{ loadingEvents ? 'Generating...' : 'Generate' }}
                  </cdr-button>
                </div>

                <div v-else class="button-row">
                  <cdr-button @click="regenerateFirstEvent" modifier="secondary" size="small" :full-width="true">
                    Regenerate
                  </cdr-button>
                </div>
              </div>

              <!-- Preview View -->
              <div v-show="pendingEvent && viewMode === 'preview'" class="preview-view">
                <div class="event-result compact">
                  <div class="result-header">
                    <h4>{{ pendingEvent?.title }}</h4>
                    <p class="result-year">{{ pendingEvent?.eventYear }}</p>
                  </div>
                  <p class="result-text" v-html="formatMarkdown(pendingEvent?.description)"></p>

                  <div class="button-row compact-buttons">
                    <cdr-button @click="confirmFirstEvent" size="small">
                      Add
                    </cdr-button>
                    <cdr-button @click="regenerateFirstEvent" modifier="secondary" size="small">
                      Regen
                    </cdr-button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Regular add button for subsequent events -->
          <div v-else-if="showAddButtons && generatingPosition !== 0 && timelineEvents.length > 0"
            class="timeline-card add-card compact">
            <cdr-button @click="startGeneratingEvent(0)" modifier="secondary" size="small" class="add-event-button">
              <span class="button-text">+ Add</span>
            </cdr-button>
          </div>

          <!-- Generating card at position 0 -->
          <div v-if="generatingPosition === 0" class="timeline-card generating-card">
            <div class="generating-content">
              <h4>Generate New Event</h4>

              <!-- Custom compact toggle when we have a pending event -->
              <div v-if="pendingEvent" class="custom-toggle">
                <button :class="['toggle-btn', { active: viewMode === 'form' }]" @click="viewMode = 'form'">
                  Event Form
                </button>
                <button :class="['toggle-btn', { active: viewMode === 'preview' }]" @click="viewMode = 'preview'">
                  Preview
                </button>
              </div>

              <!-- Form View -->
              <div v-show="!pendingEvent || viewMode === 'form'" class="form-view">
                <cdr-select v-model="eventType" label="Event Type" prompt="Choose type" :options="eventTypeOptions"
                  size="small" />

                <cdr-select v-model="timePeriod" label="Time Period" prompt="Choose when"
                  :options="getAvailablePeriodsForPosition(0)" size="small" />

                <cdr-input v-model="additionalContext" label="Context (optional)" tag="textarea" :rows="2"
                  background="secondary" size="small" />

                <div v-if="!pendingEvent" class="button-row">
                  <cdr-button @click="generateEvent" :disabled="!eventType || !timePeriod || loadingEvents" size="small"
                    :full-width="true">
                    {{ loadingEvents ? 'Generating...' : 'Generate' }}
                  </cdr-button>
                  <cdr-button @click="cancelGeneration" modifier="secondary" size="small" :full-width="true">
                    Cancel
                  </cdr-button>
                </div>

                <div v-else class="button-row">
                  <cdr-button @click="regenerateEvent" modifier="secondary" size="small" :full-width="true">
                    Regenerate
                  </cdr-button>
                </div>
              </div>

              <!-- Preview View -->
              <div v-show="pendingEvent && viewMode === 'preview'" class="preview-view">
                <div class="event-result compact">
                  <div class="result-header">
                    <h4>{{ pendingEvent?.title }}</h4>
                    <p class="result-year">{{ pendingEvent?.eventYear }}</p>
                  </div>
                  <p class="result-text" v-html="formatMarkdown(pendingEvent?.description)"></p>

                  <div class="button-row compact-buttons">
                    <cdr-button @click="confirmAddEvent" size="small">
                      Add
                    </cdr-button>
                    <cdr-button @click="regenerateEvent" modifier="secondary" size="small">
                      Regen
                    </cdr-button>
                    <cdr-button @click="cancelGeneration" modifier="dark" size="small">
                      Cancel
                    </cdr-button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <template v-for="(event, index) in sortedTimelineEvents" :key="`event-${index}`">
            <!-- Existing event card -->
            <cdr-card class="timeline-card event-card">
              <div class="card-content">
                <div v-if="editingEventIndex !== index">
                  <h4>{{ event.title }}</h4>
                  <p class="time-period">{{ event.eventYear }}</p>
                  <p class="event-text" v-html="formatMarkdown(event.description)"></p>
                  <div class="button-row-bottom">
                    <cdr-button modifier="secondary" size="small" @click="startEditingEvent(index)">
                      Edit
                    </cdr-button>
                    <cdr-button modifier="dark" size="small" @click="removeFromTimeline(index)">
                      Remove
                    </cdr-button>
                  </div>
                </div>

                <!-- Edit mode for this event -->
                <div v-else class="event-edit-form">
                  <cdr-input v-model="editingEvent.title" label="Event Title" background="secondary" size="small" />

                  <cdr-input v-model="editingEvent.eventYear" label="Event Year" background="secondary" size="small"
                    placeholder="e.g., 1462 DR" />

                  <cdr-input v-model="editingEvent.description" label="Description" tag="textarea" :rows="5"
                    background="secondary" size="small" />

                  <div class="button-row-bottom">
                    <cdr-button size="small" @click="saveEventEdit(index)">
                      Save
                    </cdr-button>
                    <cdr-button modifier="secondary" size="small" @click="cancelEventEdit">
                      Cancel
                    </cdr-button>
                  </div>
                </div>
              </div>
            </cdr-card>

            <!-- Add event after card (only show when showAddButtons is true) -->
            <div v-if="showAddButtons && generatingPosition !== index + 1" class="timeline-card add-card compact">
              <cdr-button @click="startGeneratingEvent(index + 1)" modifier="secondary" size="small"
                class="add-event-button">
                <span class="button-text">+ Add</span>
              </cdr-button>
            </div>

            <!-- Generating card at this position -->
            <div v-if="generatingPosition === index + 1" class="timeline-card generating-card">
              <div class="generating-content">
                <h4>Generate New Event</h4>

                <!-- Custom compact toggle when we have a pending event -->
                <div v-if="pendingEvent" class="custom-toggle">
                  <button :class="['toggle-btn', { active: viewMode === 'form' }]" @click="viewMode = 'form'">
                    Event Form
                  </button>
                  <button :class="['toggle-btn', { active: viewMode === 'preview' }]" @click="viewMode = 'preview'">
                    Preview
                  </button>
                </div>

                <!-- Form View -->
                <div v-show="!pendingEvent || viewMode === 'form'" class="form-view">
                  <cdr-select v-model="eventType" label="Event Type" prompt="Choose type" :options="eventTypeOptions"
                    size="small" />

                  <cdr-select v-model="timePeriod" label="Time Period" prompt="Choose when"
                    :options="getAvailablePeriodsForPosition(index + 1)" size="small" />

                  <cdr-input v-model="additionalContext" label="Context (optional)" tag="textarea" :rows="2"
                    background="secondary" size="small" />

                  <div v-if="!pendingEvent" class="button-row">
                    <cdr-button @click="generateEvent" :disabled="!eventType || !timePeriod || loadingEvents"
                      size="small" :full-width="true">
                      {{ loadingEvents ? 'Generating...' : 'Generate' }}
                    </cdr-button>
                    <cdr-button @click="cancelGeneration" modifier="secondary" size="small" :full-width="true">
                      Cancel
                    </cdr-button>
                  </div>

                  <div v-else class="button-row">
                    <cdr-button @click="regenerateEvent" modifier="secondary" size="small" :full-width="true">
                      Regenerate
                    </cdr-button>
                  </div>
                </div>

                <!-- Preview View -->
                <div v-show="pendingEvent && viewMode === 'preview'" class="preview-view">
                  <div class="event-result compact">
                    <div class="result-header">
                      <h4>{{ pendingEvent?.title }}</h4>
                      <p class="result-year">{{ pendingEvent?.eventYear }}</p>
                    </div>
                    <p class="result-text" v-html="formatMarkdown(pendingEvent?.description)"></p>

                    <div class="button-row compact-buttons">
                      <cdr-button @click="confirmAddEvent" size="small">
                        Add
                      </cdr-button>
                      <cdr-button @click="regenerateEvent" modifier="secondary" size="small">
                        Regen
                      </cdr-button>
                      <cdr-button @click="cancelGeneration" modifier="dark" size="small">
                        Cancel
                      </cdr-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <cdr-button v-if="showRightArrow" @click="scrollFilmstrip('right')" modifier="secondary" size="small"
          class="filmstrip-arrow filmstrip-arrow-right">
          →
        </cdr-button>
      </div>
    </div>

    <!-- Historical Summary -->
    <div class="summary-section" v-if="timelineEvents.length > 0">
      <h3>Historical Summary</h3>

      <div v-if="loadingSummary" class="loading-container">
        <cdr-skeleton>
          <cdr-skeleton-bone type="line" style="width:100%" />
          <cdr-skeleton-bone type="line" style="width:95%" />
          <cdr-skeleton-bone type="line" style="width:90%" />
          <cdr-skeleton-bone type="line" style="width:85%" />
        </cdr-skeleton>
      </div>

      <div v-else-if="historicalSummary">
        <p class="summary-text" v-html="formatMarkdown(historicalSummary)"></p>
        <p class="legacy-text" v-if="itemLegacy">
          <strong>Legacy & Significance:</strong> <span v-html="formatMarkdown(itemLegacy)"></span>
        </p>
      </div>

      <div class="summary-buttons">
        <cdr-button v-if="timelineEvents.length >= 2" @click="generateSummary" :disabled="loadingSummary"
          modifier="secondary">
          {{ historicalSummary ? 'Regenerate' : 'Generate' }} Historical Summary
        </cdr-button>

        <cdr-button v-if="historicalSummary && itemLegacy" @click="updateItemLore" modifier="primary"
          title="Replace the item's current lore with the generated historical summary">
          Update Item Lore
        </cdr-button>
      </div>
    </div>

    <!-- Export Section -->
    <div class="export-section" v-if="timelineEvents.length > 0">
      <h3>Export Item History</h3>
      <p class="export-description">
        Export your item's historical timeline in different formats. The markdown format works perfectly with
        <cdr-link href="https://homebrewery.naturalcrit.com" target="_blank">Homebrewery</cdr-link>
        for creating beautifully formatted D&D handouts.
      </p>

      <div class="export-options">
        <div class="export-option">
          <cdr-button @click="exportToMarkdown" modifier="secondary" :full-width="true">
            Copy History as Markdown
          </cdr-button>
          <p class="option-description">For use with Homebrewery or other markdown tools</p>
        </div>

        <div class="export-option">
          <cdr-button @click="exportToPlainText" modifier="secondary" :full-width="true">
            Copy History as Plain Text
          </cdr-button>
          <p class="option-description">Simple format for notes or sharing in chat</p>
        </div>
      </div>

      <div class="export-tip">
        <strong>Quick tip:</strong> After copying as markdown, visit
        <cdr-link href="https://homebrewery.naturalcrit.com/new" target="_blank">homebrewery.naturalcrit.com</cdr-link>,
        paste your content on the left side, and watch it transform into a beautiful D&D-styled document!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import {
  CdrButton,
  CdrCard,
  CdrSkeleton,
  CdrSkeletonBone,
  CdrSelect,
  CdrInput,
  CdrLink
} from '@rei/cedar';
import { generateGptResponse } from "@/util/ai-client.mjs";
import { detectIncognito } from 'detectincognitojs';
import { getPremiumStatus } from '@/util/auth-status.mjs';
import {
  generateEventPrompt,
  generateSummaryPrompt,
  validateEventJson,
  validateSummaryJson
} from '@/prompts/loreBuilderPrompts.mjs';
import { useToast } from '@/composables/useToast';

const toast = useToast();

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  premium: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['updated-item']);

// State
const currentYear = ref('');
const yearError = ref(false);
const yearErrorMessage = ref('');
const eventType = ref('');
const timePeriod = ref('');
const additionalContext = ref('');
const firstEventType = ref('Creation/Forging'); // Default for first event
const firstTimePeriod = ref('');
const firstAdditionalContext = ref('');
const timelineEvents = ref(props.item.timelineEvents || []);
const historicalSummary = ref(props.item.historicalSummary || '');
const itemLegacy = ref(props.item.itemLegacy || '');
const loadingEvents = ref(false);
const loadingSummary = ref(false);
const generatingPosition = ref(null);
const pendingEvent = ref(null);
const showTimelineCards = ref(false);
const showAddButtons = ref(false); // Toggle for add buttons
const remainingGenerations = ref(0); // Track remaining generations for non-premium
const editingEventIndex = ref(null); // Track which event is being edited
const editingEvent = ref({}); // Store the event being edited
const viewMode = ref('form'); // Toggle between 'form' and 'preview' for generated events

// Filmstrip navigation
const filmstrip = ref(null);
const showLeftArrow = ref(false);
const showRightArrow = ref(false);

// Event type options
const eventTypeOptions = [
  'Creation/Forging',
  'First Wielder',
  'Heroic Deed',
  'Dark Deed',
  'Lost/Hidden',
  'Rediscovered',
  'Changed Hands',
  'Altered/Modified',
  'Used in Battle',
  'Used in Ritual',
  'Cursed/Blessed',
  'Nearly Destroyed',
  'Legendary Achievement',
  'Failed Quest',
  'Theft/Heist',
  'Gift/Inheritance',
  'Prophetic Use'
];

// Compute sorted timeline events (oldest to newest)
const sortedTimelineEvents = computed(() => {
  return [...timelineEvents.value].sort((a, b) => b.yearsAgo - a.yearsAgo);
});

// Format markdown in text
const formatMarkdown = (text) => {
  if (!text) return text;

  // Escape HTML to prevent XSS
  const escapeHtml = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  // Escape any existing HTML first
  text = escapeHtml(text);

  // Then apply markdown formatting (now safe because we escaped first)
  // Bold first (double asterisks)
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Then italic (single asterisks)
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');

  return text;
};

// Get available periods for a specific position
const getAvailablePeriodsForPosition = (position) => {
  const sortedEvents = sortedTimelineEvents.value;

  // Get the event after this position (the one that would be more recent)
  const eventAfter = position < sortedEvents.length ? sortedEvents[position] : null;

  // If adding before the first event, we need to be older than it
  // If adding after the last event, we need to be more recent than it
  const eventBefore = position > 0 ? sortedEvents[position - 1] : null;

  let minYears = 1;
  let maxYears = 10000;

  // If there's an event after, we must be older than it
  if (eventAfter) {
    minYears = eventAfter.yearsAgo + 1;
  }

  // If there's an event before, we must be more recent than it
  if (eventBefore) {
    maxYears = eventBefore.yearsAgo - 1;
  }

  // Generate appropriate options
  const options = [];
  const yearRanges = [
    { label: 'Recent (1-5 years ago)', min: 1, max: 5 },
    { label: 'Several years ago (5-15 years)', min: 5, max: 15 },
    { label: 'A generation ago (20-40 years)', min: 20, max: 40 },
    { label: 'Two generations ago (40-80 years)', min: 40, max: 80 },
    { label: 'A century ago (80-120 years)', min: 80, max: 120 },
    { label: 'Several centuries ago (200-400 years)', min: 200, max: 400 },
    { label: 'Many centuries ago (400-800 years)', min: 400, max: 800 },
    { label: 'An age ago (800-1500 years)', min: 800, max: 1500 },
    { label: 'Ancient times (1500-3000 years)', min: 1500, max: 3000 },
    { label: 'Time immemorial (3000+ years)', min: 3000, max: 5000 }
  ];

  yearRanges.forEach(range => {
    if (range.min <= maxYears && range.max >= minYears) {
      options.push(range.label);
    }
  });

  return options;
};

// Validate year format
const validateYear = () => {
  if (!currentYear.value) {
    yearError.value = false;
    return true;
  }

  const matches = currentYear.value.match(/\d+/g);
  if (!matches || matches.length !== 1) {
    yearError.value = true;
    yearErrorMessage.value = 'Year must contain exactly one number';
    return false;
  }

  yearError.value = false;
  yearErrorMessage.value = '';
  return true;
};

// Helper function to get random year from selected option
const getYearFromSelection = (selection, position) => {
  const yearRanges = {
    'Recent (1-5 years ago)': [1, 5],
    'Several years ago (5-15 years)': [5, 15],
    'A generation ago (20-40 years)': [20, 40],
    'Two generations ago (40-80 years)': [40, 80],
    'A century ago (80-120 years)': [80, 120],
    'Several centuries ago (200-400 years)': [200, 400],
    'Many centuries ago (400-800 years)': [400, 800],
    'An age ago (800-1500 years)': [800, 1500],
    'Ancient times (1500-3000 years)': [1500, 3000],
    'Time immemorial (3000+ years)': [3000, 5000]
  };

  const range = yearRanges[selection];
  if (!range) return 100;

  // Apply constraints based on position
  const sortedEvents = sortedTimelineEvents.value;
  const eventBefore = position > 0 ? sortedEvents[position - 1] : null;
  const eventAfter = position < sortedEvents.length ? sortedEvents[position] : null;

  let min = range[0];
  let max = range[1];

  if (eventAfter) min = Math.max(min, eventAfter.yearsAgo + 1);
  if (eventBefore) max = Math.min(max, eventBefore.yearsAgo - 1);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Calculate event year string
const calculateEventYear = (yearsAgo) => {
  if (!currentYear.value) return `${yearsAgo} years ago`;

  const matches = currentYear.value.match(/\d+/g);
  if (!matches || matches.length !== 1) {
    return `${yearsAgo} years ago`;
  }

  const currentYearNum = parseInt(matches[0], 10);
  const eventYearNum = currentYearNum - yearsAgo;
  return currentYear.value.replace(/\d+/, eventYearNum.toString());
};

// Check if user can generate events (premium or under limit)
const canGenerateEvent = async () => {
  // Server is the source of truth — DOM-tampered `data-premium="true"`
  // does not bypass the rate limit. DOM hint becomes the offline fallback.
  if (await getPremiumStatus({ fallback: !!props.premium })) {
    return true;
  }

  const incognitoResult = await detectIncognito();

  if (incognitoResult.isPrivate) {
    toast.warning(
      "The free lore builder is not available in incognito or private mode. Please disable incognito mode or become a $5 patron for unlimited access.",
      8000
    );
    return false;
  }

  const MAX_GENERATIONS = 5;
  const storage = window.localStorage;
  const loreData = JSON.parse(storage.getItem('loreBuilderTracking')) || {
    generationCount: '0',
    firstGenerationTime: null,
  };

  let generationCount = parseInt(loreData.generationCount) || 0;
  let firstGenerationTime = parseInt(loreData.firstGenerationTime);
  const currentTime = new Date().getTime();

  if (generationCount >= MAX_GENERATIONS) {
    if (!firstGenerationTime || currentTime - firstGenerationTime >= 86400000) {
      // 24 hours in milliseconds
      // Reset the count and set the new day's first generation time
      loreData.generationCount = '1';
      loreData.firstGenerationTime = currentTime.toString();
      storage.setItem('loreBuilderTracking', JSON.stringify(loreData));
    } else {
      const resetTime = new Date(firstGenerationTime + 86400000);
      toast.warning(`You've reached the 5 event generation limit. Come back at ${resetTime.toLocaleString()} or become a $5 patron for unlimited access.`, 8000);
      return false;
    }
  } else {
    // Increment the count
    loreData.generationCount = (generationCount + 1).toString();
    if (generationCount === 0) {
      loreData.firstGenerationTime = currentTime.toString(); // Set the first generation time if this is the first count
    }
    storage.setItem('loreBuilderTracking', JSON.stringify(loreData));
  }

  updateRemainingGenerations();
  return true;
};

// Update remaining generations display
const updateRemainingGenerations = () => {
  if (props.premium) {
    remainingGenerations.value = Infinity;
    return;
  }

  const MAX_GENERATIONS = 5;
  const storage = window.localStorage;
  const loreData = JSON.parse(storage.getItem('loreBuilderTracking')) || {
    generationCount: '0',
    firstGenerationTime: null,
  };

  let generationCount = parseInt(loreData.generationCount) || 0;
  let firstGenerationTime = parseInt(loreData.firstGenerationTime);
  const currentTime = new Date().getTime();

  // Reset if 24 hours have passed
  if (firstGenerationTime && currentTime - firstGenerationTime >= 86400000) {
    generationCount = 0;
    loreData.generationCount = '0';
    loreData.firstGenerationTime = null;
    storage.setItem('loreBuilderTracking', JSON.stringify(loreData));
  }

  remainingGenerations.value = Math.max(0, MAX_GENERATIONS - generationCount);
};

// Start the timeline
const startTimeline = () => {
  if (!currentYear.value) {
    toast.warning('Please set the current year in your world before creating a timeline.');
    return;
  }

  // No premium check here - allow everyone to start a timeline
  showTimelineCards.value = true;
  showAddButtons.value = true; // Show add buttons immediately
};

// Start generating an event at a specific position
const startGeneratingEvent = (position) => {
  if (!currentYear.value) {
    toast.warning('Please set the current year in your world before adding events.');
    return;
  }

  // No premium check here - generation limits are handled by canGenerateEvent()

  generatingPosition.value = position;
  pendingEvent.value = null;
  eventType.value = '';
  timePeriod.value = '';
  additionalContext.value = '';
  viewMode.value = 'form'; // Reset to form view

  // Suggest creation/forging for first event
  if (position === 0 && timelineEvents.value.length === 0) {
    eventType.value = 'Creation/Forging';
  }

  // Scroll to the generating card with better positioning
  nextTick(() => {
    const generatingCard = document.querySelector('.generating-card');
    if (generatingCard) {
      // Scroll horizontally within filmstrip (keep this behavior)
      generatingCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

      // Then adjust vertical scroll if needed to ensure card is visible
      setTimeout(() => {
        const rect = generatingCard.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const cardHeight = rect.height;

        // Check if card is too close to top or bottom of viewport
        if (rect.top < 100) { // Too close to top
          window.scrollBy({
            top: rect.top - 150, // Give some padding from top
            behavior: 'smooth'
          });
        } else if (rect.bottom > viewportHeight - 50) { // Too close to bottom
          window.scrollBy({
            top: rect.bottom - viewportHeight + 100, // Give some padding from bottom
            behavior: 'smooth'
          });
        }
        // If card is reasonably visible, don't scroll vertically at all
      }, 100);
    }
    // Check scroll after position change
    setTimeout(checkScroll, 100);
  });
};

// Generate first event
const generateFirstEvent = async () => {
  if (!firstEventType.value || !firstTimePeriod.value) return;

  // Check generation limit for non-premium users
  const canGenerate = await canGenerateEvent();
  if (!canGenerate) return;

  loadingEvents.value = true;
  // Only clear pending event after we know we can generate
  pendingEvent.value = null;

  const yearsAgo = getYearFromSelection(firstTimePeriod.value, 0);
  const eventYear = calculateEventYear(yearsAgo);

  try {
    const prompt = generateEventPrompt({
      itemName: props.item.name,
      itemType: props.item.item_type,
      rarity: props.item.rarity,
      features: props.item.features,
      physicalDescription: props.item.physical_description,
      itemLore: props.item.lore,
      eventBefore: null,
      eventAfter: null,
      eventType: firstEventType.value,
      eventYear,
      yearsAgo,
      additionalContext: firstAdditionalContext.value,
      recentEvents: []
    });

    const response = await generateGptResponse(prompt, validateEventJson, 3);
    const data = JSON.parse(response);

    pendingEvent.value = {
      title: data.title,
      description: data.description,
      timePeriod: firstTimePeriod.value,
      eventYear: eventYear,
      yearsAgo: yearsAgo
    };

    // Switch to preview mode to show the generated event
    viewMode.value = 'preview';

  } catch (error) {
    console.error('Error generating event:', error);
    toast.error('Failed to generate event. Please try again.');
  } finally {
    loadingEvents.value = false;
  }
};

// Regenerate first event
const regenerateFirstEvent = () => {
  // Don't clear pendingEvent - keep it visible while regenerating
  viewMode.value = 'form'; // Go back to form when regenerating
  generateFirstEvent();
};

// Confirm first event
const confirmFirstEvent = () => {
  if (!pendingEvent.value) return;

  timelineEvents.value.push(pendingEvent.value);

  // Clear state
  pendingEvent.value = null;
  firstEventType.value = 'Creation/Forging';
  firstTimePeriod.value = '';
  firstAdditionalContext.value = '';

  // Hide add buttons to show clean timeline
  showAddButtons.value = false;

  updateItem();

  // Scroll to show the new event
  nextTick(() => {
    if (filmstrip.value) {
      filmstrip.value.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    }
    setTimeout(checkScroll, 500);
  });
};

// Generate event
const generateEvent = async () => {
  if (!eventType.value || !timePeriod.value) return;

  // Check generation limit for non-premium users
  const canGenerate = await canGenerateEvent();
  if (!canGenerate) return;

  loadingEvents.value = true;
  // Only clear pending event after we know we can generate
  pendingEvent.value = null;

  const position = generatingPosition.value;
  const yearsAgo = getYearFromSelection(timePeriod.value, position);
  const eventYear = calculateEventYear(yearsAgo);

  // Get context from adjacent events
  const sortedEvents = sortedTimelineEvents.value;
  const eventBefore = position > 0 ? sortedEvents[position - 1] : null;
  const eventAfter = position < sortedEvents.length ? sortedEvents[position] : null;

  // Get recent events for variety
  const recentEvents = timelineEvents.value.slice(-3);

  try {
    const prompt = generateEventPrompt({
      itemName: props.item.name,
      itemType: props.item.item_type,
      rarity: props.item.rarity,
      features: props.item.features,
      physicalDescription: props.item.physical_description,
      itemLore: props.item.lore,
      eventBefore,
      eventAfter,
      eventType: eventType.value,
      eventYear,
      yearsAgo,
      additionalContext: additionalContext.value,
      recentEvents
    });

    const response = await generateGptResponse(prompt, validateEventJson, 3);
    const data = JSON.parse(response);

    pendingEvent.value = {
      title: data.title,
      description: data.description,
      timePeriod: timePeriod.value,
      eventYear: eventYear,
      yearsAgo: yearsAgo
    };

    // Switch to preview mode to show the generated event
    viewMode.value = 'preview';

  } catch (error) {
    console.error('Error generating event:', error);
    toast.error('Failed to generate event. Please try again.');
  } finally {
    loadingEvents.value = false;
  }
};

// Regenerate event
const regenerateEvent = () => {
  // Don't clear pendingEvent - keep it visible while regenerating
  viewMode.value = 'form'; // Go back to form when regenerating
  generateEvent();
};

// Confirm adding the event
const confirmAddEvent = () => {
  if (!pendingEvent.value) return;

  timelineEvents.value.push(pendingEvent.value);

  // Clear generation state
  generatingPosition.value = null;
  pendingEvent.value = null;
  eventType.value = '';
  timePeriod.value = '';
  additionalContext.value = '';
  viewMode.value = 'form'; // Reset view mode

  // Hide add buttons after adding an event so user sees the complete timeline
  showAddButtons.value = false;

  updateItem();

  // Just check scroll, no automatic scrolling
  nextTick(() => {
    checkScroll();
  });
};

// Cancel generation
const cancelGeneration = () => {
  generatingPosition.value = null;
  pendingEvent.value = null;
  eventType.value = '';
  timePeriod.value = '';
  additionalContext.value = '';
  viewMode.value = 'form'; // Reset view mode

  // Also hide add buttons on cancel for consistency
  if (timelineEvents.value.length > 0) {
    showAddButtons.value = false;
  }
};

// Start editing an event
const startEditingEvent = (index) => {
  const sortedEvents = sortedTimelineEvents.value;
  const event = sortedEvents[index];

  editingEventIndex.value = index;
  editingEvent.value = {
    title: event.title,
    eventYear: event.eventYear,
    description: event.description,
    timePeriod: event.timePeriod,
    yearsAgo: event.yearsAgo
  };
};

// Save event edit
const saveEventEdit = (index) => {
  const sortedEvents = sortedTimelineEvents.value;
  const originalEvent = sortedEvents[index];
  const originalIndex = timelineEvents.value.findIndex(e => e === originalEvent);

  if (originalIndex !== -1) {
    // Calculate years ago from the event year if it was changed
    let updatedYearsAgo = editingEvent.value.yearsAgo;

    // If user edited the year, try to calculate new yearsAgo
    if (editingEvent.value.eventYear !== originalEvent.eventYear && currentYear.value) {
      const eventYearMatch = editingEvent.value.eventYear.match(/\d+/g);
      const currentYearMatch = currentYear.value.match(/\d+/g);

      if (eventYearMatch && eventYearMatch.length === 1 && currentYearMatch && currentYearMatch.length === 1) {
        const eventYearNum = parseInt(eventYearMatch[0], 10);
        const currentYearNum = parseInt(currentYearMatch[0], 10);
        updatedYearsAgo = currentYearNum - eventYearNum;
      }
    }

    // Update the event
    timelineEvents.value[originalIndex] = {
      ...originalEvent,
      title: editingEvent.value.title,
      eventYear: editingEvent.value.eventYear,
      description: editingEvent.value.description,
      yearsAgo: updatedYearsAgo
    };

    // Clear edit state
    editingEventIndex.value = null;
    editingEvent.value = {};

    updateItem();
  }
};

// Cancel event edit
const cancelEventEdit = () => {
  editingEventIndex.value = null;
  editingEvent.value = {};
};

// Remove event from timeline
const removeFromTimeline = (index) => {
  const sortedEvents = sortedTimelineEvents.value;
  const eventToRemove = sortedEvents[index];
  const originalIndex = timelineEvents.value.findIndex(e => e === eventToRemove);

  if (originalIndex !== -1) {
    timelineEvents.value.splice(originalIndex, 1);
    updateItem();
  }
};

// Generate historical summary
const generateSummary = async () => {
  if (timelineEvents.value.length === 0) return;

  loadingSummary.value = true;

  try {
    const sortedEvents = sortedTimelineEvents.value;

    const prompt = generateSummaryPrompt({
      itemName: props.item.name,
      itemType: props.item.item_type,
      rarity: props.item.rarity,
      itemLore: props.item.lore,
      sortedEvents
    });

    const response = await generateGptResponse(prompt, validateSummaryJson, 3);
    const data = JSON.parse(response);

    historicalSummary.value = data.historical_summary;
    itemLegacy.value = data.item_legacy;

    updateItem();

  } catch (error) {
    console.error('Error generating summary:', error);
    toast.error('Failed to generate historical summary. Please try again.');
  } finally {
    loadingSummary.value = false;
  }
};

// Update parent item
const updateItem = () => {
  const updatedItem = {
    ...props.item,
    timelineEvents: timelineEvents.value,
    historicalSummary: historicalSummary.value,
    itemLegacy: itemLegacy.value,
    currentYear: currentYear.value // Save current year with the item
  };
  emit('updated-item', updatedItem);
};

// Update item lore with historical summary
const updateItemLore = () => {
  // Combine the historical summary and legacy into a comprehensive lore text
  const newLore = `${historicalSummary.value}${itemLegacy.value ? `\n\n${itemLegacy.value}` : ''}`;

  // Confirm with user since this will replace existing lore
  const confirmed = confirm(
    'This will replace the item\'s current lore with the generated historical summary and legacy. ' +
    'The original lore will be lost unless you\'ve saved it elsewhere. Continue?'
  );

  if (!confirmed) return;

  // Update the item with the new lore
  const updatedItem = {
    ...props.item,
    lore: newLore,
    timelineEvents: timelineEvents.value,
    historicalSummary: historicalSummary.value,
    itemLegacy: itemLegacy.value,
    currentYear: currentYear.value
  };

  emit('updated-item', updatedItem);

  // Show success message
  toast.success('Item lore has been updated with the historical summary!');
};

// Filmstrip navigation
const scrollFilmstrip = (direction) => {
  if (!filmstrip.value) return;

  const scrollAmount = 400;
  const currentScroll = filmstrip.value.scrollLeft;

  if (direction === 'left') {
    filmstrip.value.scrollTo({
      left: Math.max(0, currentScroll - scrollAmount),
      behavior: 'smooth'
    });
  } else {
    filmstrip.value.scrollTo({
      left: currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  }
};

const checkScroll = () => {
  if (!filmstrip.value) return;

  showLeftArrow.value = filmstrip.value.scrollLeft > 0;
  showRightArrow.value =
    filmstrip.value.scrollLeft <
    filmstrip.value.scrollWidth - filmstrip.value.clientWidth - 10;
};

// Export functions
const exportToMarkdown = () => {
  let markdown = `## Historical Timeline of ${props.item.name}\n\n`;

  if (historicalSummary.value) {
    markdown += `### Summary\n${historicalSummary.value}\n\n`;
    if (itemLegacy.value) {
      markdown += `**Legacy:** ${itemLegacy.value}\n\n`;
    }
  }

  markdown += `### Timeline\n\n`;
  sortedTimelineEvents.value.forEach(event => {
    markdown += `#### ${event.title}\n`;
    markdown += `*${event.eventYear}*\n\n`;
    markdown += `${event.description}\n\n`;
  });

  navigator.clipboard.writeText(markdown);
  toast.success('History copied as markdown! Paste it into Homebrewery to see it formatted.');
};

const exportToPlainText = () => {
  let text = `Historical Timeline of ${props.item.name}\n\n`;

  if (historicalSummary.value) {
    text += `Summary:\n${historicalSummary.value}\n\n`;
    if (itemLegacy.value) {
      text += `Legacy: ${itemLegacy.value}\n\n`;
    }
  }

  text += `Timeline:\n\n`;
  sortedTimelineEvents.value.forEach(event => {
    text += `${event.title} (${event.eventYear})\n`;
    text += `${event.description}\n\n`;
  });

  navigator.clipboard.writeText(text);
  toast.success('History copied as plain text!');
};

// Initialize and watch for item changes
onMounted(() => {
  loadTimelineData();
  updateRemainingGenerations(); // Check generation limits on mount

  nextTick(() => {
    checkScroll();
  });
});

// Load timeline data from item
const loadTimelineData = () => {
  if (props.item.timelineEvents && props.item.timelineEvents.length > 0) {
    timelineEvents.value = [...props.item.timelineEvents];
    showTimelineCards.value = true;
  } else {
    timelineEvents.value = [];
    showTimelineCards.value = false;
  }

  if (props.item.historicalSummary) {
    historicalSummary.value = props.item.historicalSummary;
  } else {
    historicalSummary.value = '';
  }

  if (props.item.itemLegacy) {
    itemLegacy.value = props.item.itemLegacy;
  } else {
    itemLegacy.value = '';
  }

  // Load current year ONLY from the specific item
  if (props.item.currentYear) {
    currentYear.value = props.item.currentYear;
  } else {
    currentYear.value = ''; // Always start blank for new items
  }

  // Reset form state when loading new item
  generatingPosition.value = null;
  pendingEvent.value = null;
  eventType.value = '';
  timePeriod.value = '';
  additionalContext.value = '';
  showAddButtons.value = false;
  viewMode.value = 'form'; // Reset view mode
};

// Watch for prop changes (when switching items)
watch(() => props.item, () => {
  loadTimelineData();
  nextTick(() => {
    checkScroll();
  });
}, { deep: true });

// Watch for add buttons toggle
watch(showAddButtons, (newValue) => {
  nextTick(() => {
    checkScroll();
    // If showing add buttons, scroll to the end to see the most recent events
    if (newValue && filmstrip.value) {
      setTimeout(() => {
        filmstrip.value.scrollTo({
          left: filmstrip.value.scrollWidth,
          behavior: 'smooth'
        });
        // Double-check scroll arrows after animation
        setTimeout(checkScroll, 300);
      }, 100);
    }
  });
});

// Watch for generating position changes
watch(generatingPosition, () => {
  nextTick(() => {
    checkScroll();
    setTimeout(checkScroll, 100);
  });
});

// Watch for current year changes (but don't save to localStorage)
watch(currentYear, () => {
  validateYear();
});
watch(() => timelineEvents.value.length, async () => {
  await nextTick();
  checkScroll();
  // Double-check after animations
  setTimeout(checkScroll, 300);
});
</script>

<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';

.lore-builder-container {
  padding: 1rem 0;
}

.year-input-section {
  margin-bottom: 2rem;
  max-width: 400px;
}

.timeline-section {
  margin-bottom: 2rem;

  h3 {
    margin-bottom: 1rem;
  }

  .add-timeline-prompt {
    text-align: center;
    padding: 3rem 1rem;
    background-color: $cdr-color-background-secondary;
    border-radius: 8px;

    .generation-info {
      margin-top: 1rem;
      margin-bottom: 0;
      font-size: 0.875rem;
      color: $cdr-color-text-secondary;
    }
  }

  .timeline-controls {
    margin-bottom: 1rem;
    text-align: center;
  }

  .generation-info {
    margin-top: 0.75rem;
    margin-bottom: 0;
    font-size: 0.875rem;
    color: $cdr-color-text-secondary;
    text-align: center;
  }

  .filmstrip-container {
    position: relative;

    .filmstrip-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
      min-width: 40px;

      &-left {
        left: -45px;
      }

      &-right {
        right: -45px;
      }
    }

    .filmstrip {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      scroll-behavior: smooth;
      padding: 1rem 0.5rem;

      &::-webkit-scrollbar {
        height: 8px;
      }

      &::-webkit-scrollbar-track {
        background: $cdr-color-background-secondary;
        border-radius: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background: $cdr-color-text-secondary;
        border-radius: 4px;

        &:hover {
          background: $cdr-color-text-primary;
        }
      }
    }
  }

  .timeline-card {
    flex: 0 0 320px;
    min-height: 280px;

    &.add-card {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px dashed $cdr-color-text-secondary;
      background-color: $cdr-color-background-secondary;
      border-radius: 8px;

      &.compact {
        flex: 0 0 80px;
        min-height: 120px;
        border: 1px dashed rgba($cdr-color-text-secondary, 0.5);
        background-color: rgba($cdr-color-background-secondary, 0.7);

        .add-event-button {
          padding: 0.5rem;
          background: transparent;
          border: none;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          .button-text {
            writing-mode: vertical-rl;
            text-orientation: mixed;
            font-size: 0.9rem;
          }

          &:hover {
            background-color: rgba($cdr-color-background-primary, 0.8);
          }
        }
      }

      &:not(.compact) {
        .add-event-button {
          padding: 2rem 1rem;
          background: transparent;
          border: none;
          width: 100%;
          height: 100%;

          &:hover {
            background-color: $cdr-color-background-primary;
          }
        }
      }
    }

    &.generating-card {
      background-color: white;
      border: 2px solid $cdr-color-text-brand;
      border-radius: 8px;
      padding: 1rem;

      .generating-content {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        h4 {
          margin: 0 0 0.5rem 0;
          font-size: 1.6rem;
        }

        .event-preview {
          background-color: $cdr-color-background-secondary;
          padding: 0.75rem;
          border-radius: 4px;
          margin-top: 0.5rem;

          h5 {
            margin: 0 0 0.25rem 0;
            font-size: 1rem;
          }

          .preview-year {
            font-style: italic;
            color: $cdr-color-text-secondary;
            font-size: 0.85rem;
            margin: 0 0 0.5rem 0;
          }

          .preview-text {
            font-size: 0.9rem;
            line-height: 1.4;
            margin: 0 0 0.75rem 0;
          }
        }

        .event-result {
          background: linear-gradient(135deg,
              rgba($cdr-color-text-brand, 0.05) 0%,
              rgba($cdr-color-background-secondary, 1) 100%);
          border: 1px solid rgba($cdr-color-text-brand, 0.2);
          padding: 1rem;
          border-radius: 6px;
          margin-top: 0.75rem;

          &.compact {
            padding: 0.75rem;
            margin-top: 0.5rem;
          }

          .result-header {
            border-bottom: 1px solid $cdr-color-background-secondary;
            padding-bottom: 0.5rem;
            margin-bottom: 0.75rem;

            h5 {
              margin: 0 0 0.25rem 0;
              font-size: 1.1rem;
              color: $cdr-color-text-primary;
              font-weight: 600;
            }

            .result-year {
              font-style: italic;
              color: $cdr-color-text-secondary;
              font-size: 0.9rem;
              margin: 0;
            }
          }

          .result-text {
            font-size: 0.95rem;
            line-height: 1.5;
            margin: 0 0 1rem 0;
            color: $cdr-color-text-primary;
          }

          &.compact .result-text {
            font-size: 1.4rem;
            line-height: 1.6;
          }
        }

        .custom-toggle {
          display: flex;
          gap: 0.25rem;
          background-color: $cdr-color-background-secondary;
          padding: 0.25rem;
          border-radius: 4px;
          margin-bottom: 0.5rem;

          .toggle-btn {
            flex: 1;
            padding: 0.35rem 0.5rem;
            border: none;
            background: transparent;
            border-radius: 3px;
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: 500;
            color: $cdr-color-text-secondary;
            transition: all 0.2s ease;

            &:hover {
              background-color: rgba($cdr-color-text-primary, 0.05);
              color: $cdr-color-text-primary;
            }

            &.active {
              background-color: white;
              color: $cdr-color-text-brand;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
          }
        }

        .button-row {
          display: flex;
          gap: 0.25rem;
          margin-top: 0.5rem;

          &.compact-buttons {
            gap: 0.35rem;
            margin-top: 0.75rem;

            button {
              font-size: 1rem;
              padding: 0.4rem 0.6rem;
            }
          }

          button {
            flex: 1;
          }
        }
      }
    }

    &.event-card {
      .card-content {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 1rem;

        >div {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        h4 {
          margin-top: 0;
          margin-bottom: 0.5rem;
          color: $cdr-color-text-primary;
        }

        .time-period {
          font-style: italic;
          color: $cdr-color-text-secondary;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .event-text {
          flex: 1;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .button-row-bottom {
          display: flex;
          gap: 0.5rem;
          margin-top: auto;
          opacity: 0;
          transition: opacity 0.2s ease;

          button {
            flex: 1;
          }
        }

        .event-edit-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          height: 100%;

          .button-row-bottom {
            margin-top: auto;
            padding-top: 0.5rem;
            opacity: 1; // Always visible in edit mode
          }
        }
      }

      // Show buttons on hover or focus
      &:hover .card-content .button-row-bottom,
      &:focus-within .card-content .button-row-bottom {
        opacity: 1;
      }

      // Always show buttons on touch devices
      @media (hover: none) and (pointer: coarse) {
        .card-content .button-row-bottom {
          opacity: 1;
        }
      }

      // Also always show on smaller screens
      @media (max-width: 768px) {
        .card-content .button-row-bottom {
          opacity: 1;
        }
      }
    }
  }
}

.summary-section {
  background-color: $cdr-color-background-primary;
  padding: 1.5rem;
  border-left: 4px solid $cdr-color-text-brand;
  margin-bottom: 2rem;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .summary-text {
    display: block;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .legacy-text {
    display: block;
    line-height: 1.6;
    padding-top: 1rem;
    border-top: 1px solid $cdr-color-background-secondary;
  }

  .summary-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;

      button {
        width: 100%;
      }
    }
  }
}

.export-section {
  padding: 1.5rem;
  background-color: $cdr-color-background-secondary;
  border-radius: 8px;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .export-description {
    margin-bottom: 1.5rem;
    line-height: 1.5;
    color: $cdr-color-text-secondary;
  }

  .export-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .export-option {
    .option-description {
      margin-top: 0.5rem;
      font-size: 0.875rem;
      color: $cdr-color-text-secondary;
      font-style: italic;
    }
  }

  .export-tip {
    padding: 1rem;
    background-color: rgba($cdr-color-text-brand, 0.05);
    border-left: 3px solid $cdr-color-text-brand;
    border-radius: 4px;
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

.loading-container {
  padding: 2rem;
}

@media (max-width: 768px) {
  .filmstrip-container {
    .filmstrip-arrow {
      display: none;
    }
  }

  .timeline-card {
    flex: 0 0 280px;
  }

  .export-section {
    .export-options {
      grid-template-columns: 1fr;
    }
  }
}
</style>