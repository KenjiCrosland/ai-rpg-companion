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
      </div>

      <div v-if="showTimelineCards || timelineEvents.length > 0" class="filmstrip-container">
        <cdr-button v-if="showLeftArrow" @click="scrollFilmstrip('left')" modifier="secondary" size="small"
          class="filmstrip-arrow filmstrip-arrow-left">
          ←
        </cdr-button>

        <div class="filmstrip" ref="filmstrip" @scroll="checkScroll">
          <!-- Add first event card (only show when showAddButtons is true) -->
          <div v-if="showAddButtons && generatingPosition !== 0" class="timeline-card add-card">
            <cdr-button @click="startGeneratingEvent(0)" modifier="secondary" :full-width="true"
              class="add-event-button">
              {{ timelineEvents.length > 0 ? '+ Add Previous Event' : '+ Add First Event' }}
            </cdr-button>
          </div>

          <!-- Generating card at position 0 -->
          <div v-if="generatingPosition === 0" class="timeline-card generating-card">
            <div class="generating-content">
              <h4>Generate New Event</h4>

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

              <div v-if="pendingEvent" class="event-preview">
                <h5>{{ pendingEvent.title }}</h5>
                <p class="preview-year">{{ pendingEvent.eventYear }}</p>
                <p class="preview-text">{{ pendingEvent.description }}</p>

                <div class="button-row">
                  <cdr-button @click="confirmAddEvent" size="small">
                    Add
                  </cdr-button>
                  <cdr-button @click="regenerateEvent" modifier="secondary" size="small">
                    Retry
                  </cdr-button>
                  <cdr-button @click="cancelGeneration" modifier="dark" size="small">
                    Cancel
                  </cdr-button>
                </div>
              </div>
            </div>
          </div>

          <template v-for="(event, index) in sortedTimelineEvents" :key="`event-${index}`">
            <!-- Existing event card -->
            <cdr-card class="timeline-card event-card">
              <div class="card-content">
                <h4>{{ event.title }}</h4>
                <p class="time-period">{{ event.eventYear }}</p>
                <cdr-text class="event-text">{{ event.description }}</cdr-text>
                <cdr-button modifier="dark" size="small" @click="removeFromTimeline(index)" :full-width="true"
                  style="margin-top: auto;">
                  Remove
                </cdr-button>
              </div>
            </cdr-card>

            <!-- Add event after card (only show when showAddButtons is true) -->
            <div v-if="showAddButtons && generatingPosition !== index + 1" class="timeline-card add-card">
              <cdr-button @click="startGeneratingEvent(index + 1)" modifier="secondary" :full-width="true"
                class="add-event-button">
                + Add After
              </cdr-button>
            </div>

            <!-- Generating card at this position -->
            <div v-if="generatingPosition === index + 1" class="timeline-card generating-card">
              <div class="generating-content">
                <h4>Generate New Event</h4>

                <cdr-select v-model="eventType" label="Event Type" prompt="Choose type" :options="eventTypeOptions"
                  size="small" />

                <cdr-select v-model="timePeriod" label="Time Period" prompt="Choose when"
                  :options="getAvailablePeriodsForPosition(index + 1)" size="small" />

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

                <div v-if="pendingEvent" class="event-preview">
                  <h5>{{ pendingEvent.title }}</h5>
                  <p class="preview-year">{{ pendingEvent.eventYear }}</p>
                  <p class="preview-text">{{ pendingEvent.description }}</p>

                  <div class="button-row">
                    <cdr-button @click="confirmAddEvent" size="small">
                      Add
                    </cdr-button>
                    <cdr-button @click="regenerateEvent" modifier="secondary" size="small">
                      Retry
                    </cdr-button>
                    <cdr-button @click="cancelGeneration" modifier="dark" size="small">
                      Cancel
                    </cdr-button>
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
        <cdr-text class="summary-text">{{ historicalSummary }}</cdr-text>
        <cdr-text class="legacy-text" v-if="itemLegacy">
          <strong>Legacy & Significance:</strong> {{ itemLegacy }}
        </cdr-text>
      </div>

      <cdr-button v-if="timelineEvents.length >= 2" @click="generateSummary" :disabled="loadingSummary"
        modifier="secondary" style="margin-top: 1rem;">
        {{ historicalSummary ? 'Regenerate' : 'Generate' }} Historical Summary
      </cdr-button>
    </div>

    <!-- Export Section -->
    <div class="export-section" v-if="timelineEvents.length > 0">
      <h3>Export Item History</h3>
      <div class="button-group">
        <cdr-button @click="exportToMarkdown" modifier="secondary">
          Copy History as Markdown
        </cdr-button>
        <cdr-button @click="exportToPlainText" modifier="secondary">
          Copy History as Plain Text
        </cdr-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import {
  CdrButton,
  CdrCard,
  CdrText,
  CdrSkeleton,
  CdrSkeletonBone,
  CdrSelect,
  CdrInput
} from '@rei/cedar';
import { generateGptResponse } from '../../util/open-ai.mjs';
import {
  generateEventPrompt,
  generateSummaryPrompt,
  validateEventJson,
  validateSummaryJson
} from '../../util/loreBuilderPrompts.mjs';

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
const timelineEvents = ref(props.item.timelineEvents || []);
const historicalSummary = ref(props.item.historicalSummary || '');
const itemLegacy = ref(props.item.itemLegacy || '');
const loadingEvents = ref(false);
const loadingSummary = ref(false);
const generatingPosition = ref(null);
const pendingEvent = ref(null);
const showTimelineCards = ref(false);
const showAddButtons = ref(false); // Toggle for add buttons

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

// Check if premium features are needed
const checkPremiumAccess = () => {
  if (!props.premium) {
    alert('The Lore Builder feature is only available to premium patrons. Please consider becoming a patron to access this feature.');
    return false;
  }
  return true;
};

// Start the timeline
const startTimeline = () => {
  if (!currentYear.value) {
    alert('Please set the current year in your world before creating a timeline.');
    return;
  }

  if (!checkPremiumAccess()) return;

  showTimelineCards.value = true;
  showAddButtons.value = true; // Show add buttons immediately
};

// Start generating an event at a specific position
const startGeneratingEvent = (position) => {
  if (!currentYear.value) {
    alert('Please set the current year in your world before adding events.');
    return;
  }

  if (!checkPremiumAccess()) return;

  generatingPosition.value = position;
  pendingEvent.value = null;
  eventType.value = '';
  timePeriod.value = '';
  additionalContext.value = '';

  // Suggest creation/forging for first event
  if (position === 0 && timelineEvents.value.length === 0) {
    eventType.value = 'Creation/Forging';
  }

  // Scroll to the generating card and check arrows
  nextTick(() => {
    const generatingCard = document.querySelector('.generating-card');
    if (generatingCard) {
      generatingCard.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
    // Check scroll after position change
    setTimeout(checkScroll, 100);
  });
};

// Generate event
const generateEvent = async () => {
  if (!eventType.value || !timePeriod.value) return;

  loadingEvents.value = true;
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

  } catch (error) {
    console.error('Error generating event:', error);
    alert('Failed to generate event. Please try again.');
  } finally {
    loadingEvents.value = false;
  }
};

// Regenerate event
const regenerateEvent = () => {
  pendingEvent.value = null;
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

  // Hide add buttons after adding an event so user sees the complete timeline
  showAddButtons.value = false;

  updateItem();

  // Check scroll after hiding buttons
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

  // Also hide add buttons on cancel for consistency
  if (timelineEvents.value.length > 0) {
    showAddButtons.value = false;
  }
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
    alert('Failed to generate historical summary. Please try again.');
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
    itemLegacy: itemLegacy.value
  };
  emit('updated-item', updatedItem);
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
  alert('History copied as markdown!');
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
  alert('History copied as plain text!');
};

// Initialize and watch for item changes
onMounted(() => {
  loadTimelineData();

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

  // Reset form state when loading new item
  generatingPosition.value = null;
  pendingEvent.value = null;
  eventType.value = '';
  timePeriod.value = '';
  additionalContext.value = '';
  showAddButtons.value = false;
};

// Watch for prop changes (when switching items)
watch(() => props.item, () => {
  loadTimelineData();
  nextTick(() => {
    checkScroll();
  });
}, { deep: true });

// Watch for add buttons toggle
watch(showAddButtons, () => {
  nextTick(() => {
    checkScroll();
    // Double-check after DOM settles
    setTimeout(checkScroll, 100);
  });
});

// Watch for generating position changes
watch(generatingPosition, () => {
  nextTick(() => {
    checkScroll();
    setTimeout(checkScroll, 100);
  });
});

// Watch for other updates
watch(currentYear, validateYear);
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
  }

  .timeline-controls {
    margin-bottom: 1rem;
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
          font-size: 1.1rem;
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

        .button-row {
          display: flex;
          gap: 0.25rem;
          margin-top: 0.5rem;

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
}

.export-section {
  padding: 1.5rem;
  background-color: $cdr-color-background-secondary;
  border-radius: 8px;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .button-group {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
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
}
</style>