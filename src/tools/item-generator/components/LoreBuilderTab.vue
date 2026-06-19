<template>
  <div class="lore-builder parchment">
    <!-- ── Header: title · subtitle · world-year badge · hairline ─────────── -->
    <header class="lore-header">
      <div class="lore-header__titles">
        <h2 class="lore-header__title">{{ item.name }}</h2>
        <p class="lore-header__subtitle">{{ subtitle }}</p>
      </div>
      <div class="lore-header__year">
        <input
          v-model="currentYear"
          class="lore-header__year-input"
          :class="{ 'is-error': yearError }"
          placeholder="Set year"
          aria-label="Current year in your world"
          @blur="validateYear"
        />
      </div>
    </header>
    <p v-if="yearError" class="lore-header__year-error">{{ yearErrorMessage }}</p>
    <p v-else class="lore-header__year-hint">
      Set your world's current year — historical dates derive from it.
    </p>

    <!-- ── Empty state: no timeline yet ──────────────────────────────────── -->
    <div v-if="!hasStarted && timelineEvents.length === 0" class="lore-empty">
      <p class="lore-empty__lede">This item has no recorded history.</p>
      <ParCardButton variant="create" :disabled="!canStartTimeline" @click="startTimeline">
        + Create Historical Timeline
      </ParCardButton>
      <p v-if="!canStartTimeline" class="lore-empty__gate">
        Set your world's current year above to begin.
      </p>
    </div>

    <!-- ── The spine ─────────────────────────────────────────────────────── -->
    <div v-else class="spine">
      <!-- Existing events, oldest → newest -->
      <template v-for="(event, index) in sortedTimelineEvents" :key="`event-${index}`">
        <!-- Mid-spine insert slot BEFORE this node (chronological position = index) -->
        <div v-if="generatingPosition === index" class="spine-row spine-row--summon">
          <div class="spine-year"></div>
          <div class="spine-marker"><span class="spine-dot spine-dot--pending"></span></div>
          <div class="spine-body">
            <LoreSummonCard
              heading="Summon a new event"
              v-model:event-type="eventType"
              v-model:time-period="timePeriod"
              v-model:additional-context="additionalContext"
              :event-type-options="eventTypeOptions"
              :period-options="getAvailablePeriodsForPosition(index)"
              :loading="loadingEvents"
              :pending-event="pendingEvent"
              :premium="premium"
              :remaining="remainingGenerations"
              :can-cancel="true"
              @generate="generateEvent"
              @keep="confirmAddEvent"
              @regenerate="regenerateEvent"
              @cancel="cancelGeneration"
            />
          </div>
        </div>

        <!-- Time-gap row: only between two nodes, when nothing is summoning here -->
        <div v-else-if="index > 0 && !pendingEvent" class="spine-gap">
          <div class="spine-year"></div>
          <div class="spine-marker"></div>
          <div class="spine-gap__body">
            <span class="spine-gap__rule"></span>
            <span v-if="gapYears(index) !== null" class="spine-gap__text">
              ≈ {{ gapYears(index) }} year{{ gapYears(index) === 1 ? '' : 's' }} pass
            </span>
            <ParCardButton variant="create" size="small" @click="startGeneratingEvent(index)">
              + insert
            </ParCardButton>
          </div>
        </div>

        <!-- Event node -->
        <div class="spine-row spine-row--event" :class="{ 'is-expanded': expandedIndex === index }">
          <div class="spine-year">{{ event.eventYear }}</div>
          <div class="spine-marker"><span class="spine-dot spine-dot--committed"></span></div>
          <div class="spine-body">
            <!-- Collapsed: title + one-line teaser, no chrome -->
            <button
              v-if="expandedIndex !== index"
              type="button"
              class="node-collapsed"
              @click="expandedIndex = index"
            >
              <span class="node-collapsed__title">{{ event.title }}</span>
              <span class="node-collapsed__teaser">{{ teaser(event.description) }}</span>
            </button>

            <!-- Expanded: full prose + chrome -->
            <div v-else class="node-expanded">
              <template v-if="editingEventIndex !== index">
                <h3 class="node-expanded__title" @click="expandedIndex = null">{{ event.title }}</h3>
                <p class="node-expanded__text" v-html="formatMarkdown(event.description)"></p>
                <div class="node-expanded__actions">
                  <ParCardButton variant="affirmative" size="small" @click="startEditingEvent(index)">
                    Edit
                  </ParCardButton>
                  <ParCardButton variant="muted" size="small" @click="removeFromTimeline(index)">
                    Remove
                  </ParCardButton>
                </div>
              </template>

              <!-- Inline edit -->
              <div v-else class="node-edit">
                <ParCardInput v-model="editingEvent.title" label="Event Title" />
                <ParCardInput v-model="editingEvent.eventYear" label="Event Year" placeholder="e.g., 1462 DR" />
                <ParCardTextarea v-model="editingEvent.description" label="Description" :rows="5" />
                <div class="node-expanded__actions">
                  <ParCardButton variant="primary" size="small" @click="saveEventEdit(index)">Save</ParCardButton>
                  <ParCardButton variant="muted" size="small" @click="cancelEventEdit">Cancel</ParCardButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Resting summon slot: the first event (empty timeline) or an append
           after the last node — both are chronological position = length. The
           dashed marker stays visible so the spine reads as extending into
           possibility; with events present the form collapses to a quiet
           lapis affordance and expands inline on click, keeping the reading
           flow (events → summary) uninterrupted. -->
      <div
        v-if="generatingPosition === timelineEvents.length"
        class="spine-row spine-row--summon spine-row--end"
        :class="{ 'spine-row--collapsed': isSummonCollapsed }"
      >
        <div class="spine-year"></div>
        <div class="spine-marker"><span class="spine-dot spine-dot--pending"></span></div>
        <div class="spine-body">
          <!-- Collapsed: events exist, form not open, nothing pending -->
          <div
            v-if="isSummonCollapsed"
            class="summon-trigger"
          >
            <ParCardButton variant="create" size="small" @click="summonFormExpanded = true">
              + Add event
            </ParCardButton>
          </div>

          <!-- Expanded: full form (always shown for the first event) -->
          <LoreSummonCard
            v-else
            :heading="timelineEvents.length === 0 ? 'Summon the first event' : 'Summon a new event'"
            v-model:event-type="eventType"
            v-model:time-period="timePeriod"
            v-model:additional-context="additionalContext"
            :event-type-options="eventTypeOptions"
            :period-options="getAvailablePeriodsForPosition(timelineEvents.length)"
            :loading="loadingEvents"
            :pending-event="pendingEvent"
            :premium="premium"
            :remaining="remainingGenerations"
            :can-cancel="timelineEvents.length > 0"
            @generate="generateEvent"
            @keep="confirmAddEvent"
            @regenerate="regenerateEvent"
            @cancel="cancelGeneration"
          />
        </div>
      </div>
    </div>

    <!-- ── Terminus: the spine distils into the historical summary ───────── -->
    <div v-if="timelineEvents.length > 0" class="lore-terminus">
      <div class="lore-terminus__divider">
        <span class="lore-terminus__label">distilled into</span>
      </div>

      <div class="summary-card">
        <h3 class="summary-card__heading">Historical Summary</h3>

        <div v-if="loadingSummary" class="lore-skeleton">
          <span v-for="n in 4" :key="n" class="lore-skeleton__line"></span>
        </div>

        <div v-else-if="historicalSummary" class="summary-card__body">
          <p class="summary-card__text" v-html="formatMarkdown(historicalSummary)"></p>
          <p class="summary-card__legacy" v-if="itemLegacy">
            <span class="summary-card__legacy-label">Legacy</span>
            <span v-html="formatMarkdown(itemLegacy)"></span>
          </p>
        </div>

        <p v-else class="summary-card__empty">
          Add two or more events, then distil them into a single history.
        </p>

        <div class="summary-card__actions">
          <ParCardButton v-if="timelineEvents.length >= 2" variant="affirmative" :disabled="loadingSummary"
            @click="generateSummary">
            {{ historicalSummary ? 'Regenerate' : 'Generate' }}
          </ParCardButton>
          <ParCardButton v-if="historicalSummary && itemLegacy" variant="affirmative" class="summary-card__commit"
            @click="requestUpdateItemLore"
            title="Replace the item's current lore with the generated historical summary">
            Update Item Lore
          </ParCardButton>
        </div>
      </div>
    </div>

    <!-- ── Export (toggleable, matching the Item Details tab) ────────────── -->
    <div v-if="timelineEvents.length > 0" class="lore-export-toggle">
      <ParCardButton @click="showExport = !showExport">
        {{ showExport ? 'Hide export' : 'Export' }}
      </ParCardButton>
    </div>

    <ItemExportsSection v-if="timelineEvents.length > 0 && showExport" heading="Export Item History">
      <template #description>
        Export your item's historical timeline in different formats. The markdown format works perfectly with
        <cdr-link href="https://homebrewery.naturalcrit.com" target="_blank">Homebrewery</cdr-link>
        for creating beautifully formatted D&D handouts.
      </template>
      <template #buttons>
        <ParCardButton variant="affirmative" @click="exportToMarkdown">
          Copy History as Markdown
        </ParCardButton>
        <ParCardButton variant="affirmative" @click="exportToPlainText">
          Copy History as Plain Text
        </ParCardButton>
      </template>
      <template #tip>
        <strong>Quick tip:</strong> After copying as markdown, visit
        <cdr-link href="https://homebrewery.naturalcrit.com/new" target="_blank">homebrewery.naturalcrit.com</cdr-link>,
        paste your content on the left side, and watch it transform into a beautiful D&D-styled document!
      </template>
    </ItemExportsSection>

    <!-- Confirm before overwriting the item's hand-written lore. -->
    <ParConfirm
      :opened="showLoreConfirm"
      title="Replace item lore?"
      message="This replaces the item's current lore with the generated historical summary and legacy. The original lore is lost unless you've saved it elsewhere."
      confirm-label="Replace lore"
      cancel-label="Keep current lore"
      destructive
      @confirm="confirmUpdateItemLore"
      @cancel="showLoreConfirm = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { CdrLink } from '@rei/cedar';
import {
  ParCardButton,
  ParCardInput,
  ParCardTextarea,
  ParConfirm,
} from '@/parchment';
import { logger } from '@/util/logger.mjs';
import ItemExportsSection from './ItemExportsSection.vue';
import LoreSummonCard from './LoreSummonCard.vue';
import { formatMarkdown } from '../utils/format-markdown.mjs';
import { generateGptResponse } from "@/util/ai-client.mjs";
import { detectIncognito } from 'detectincognitojs';
import { readQuota, writeQuota, remainingFromQuota, ensureQuotaSeeded } from '@/util/quota-storage.mjs';
import {
  generateEventPrompt,
  generateSummaryPrompt,
  validateEventJson,
  validateSummaryJson
} from '@/prompts/loreBuilderPrompts.mjs';
import {
  deriveEventYear,
  yearsAgoFromEventYear,
  sortByYearsAgo,
  availablePeriodsForPosition,
  yearsAgoFromSelection,
} from '../utils/lore-timeline.mjs';
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
const timelineEvents = ref(props.item.timelineEvents || []);
const historicalSummary = ref(props.item.historicalSummary || '');
const itemLegacy = ref(props.item.itemLegacy || '');
const loadingEvents = ref(false);
const loadingSummary = ref(false);
// Which chronological slot the summon card occupies. Defaults to the end
// (timelineEvents.length) so the "Summon a new event" card rests at the
// spine's tail; a mid-spine "+ insert" relocates it to that gap. null only
// before a timeline has been started.
const generatingPosition = ref(null);
const pendingEvent = ref(null);
const hasStarted = ref(false);
const remainingGenerations = ref(0); // Track remaining generations for non-premium
const editingEventIndex = ref(null); // Track which event is being edited (display row)
const editingEvent = ref({}); // Store the event being edited
const expandedIndex = ref(null); // Which node is expanded (one open at a time)
const showLoreConfirm = ref(false); // "Replace item lore?" confirm dialog
const showExport = ref(false); // Toggleable export panel (matches Item Details)
// End-of-spine summon form: expanded by default only when the timeline is
// empty (the form is the entry point). With events present it rests collapsed
// to a lapis affordance and the user opens it; it auto-collapses after a keep
// or cancel. No watcher — the template derives the empty-state form from
// `timelineEvents.length`, so this only governs the populated case.
const summonFormExpanded = ref(false);

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

// Editorial subtitle beneath the item name — derived from the item's own
// classification so the header reads like a chronicle's frontispiece.
const subtitle = computed(() => {
  const parts = [props.item.rarity, props.item.item_type].filter(Boolean).join(' ');
  return parts ? `A chronicle of the ${parts.toLowerCase()}` : 'A chronicle of ages';
});

// Compute sorted timeline events (oldest to newest). The display year is
// DERIVED here from the canonical `yearsAgo` + the world's current year, so
// changing the current year cascades to every event instead of leaving a
// stale stored snapshot. Events never persist `eventYear`.
const sortedTimelineEvents = computed(() => {
  return sortByYearsAgo(timelineEvents.value).map((event) => ({
    ...event,
    eventYear: deriveEventYear(currentYear.value, event.yearsAgo),
  }));
});

// Years elapsed across the gap BEFORE the node at `nodeIndex` (i.e. between
// the older neighbour at nodeIndex-1 and this node). Null for the first node
// (no older neighbour to measure from).
const gapYears = (nodeIndex) => {
  const events = sortedTimelineEvents.value;
  const older = events[nodeIndex - 1];
  const younger = events[nodeIndex];
  if (!older || !younger) return null;
  return older.yearsAgo - younger.yearsAgo;
};

// One-line teaser for a collapsed node: strip light markdown, collapse
// whitespace, truncate on a word boundary.
const teaser = (text) => {
  if (!text) return '';
  const plain = text.replace(/[*_#>`]/g, '').replace(/\s+/g, ' ').trim();
  if (plain.length <= 110) return plain;
  const cut = plain.slice(0, 110);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…';
};

// The world-year gates timeline creation: derived dates are meaningless
// without it, so the "Create Timeline" affordance stays disabled until a
// valid single-number year is set (gate, not a toast-on-click).
const canStartTimeline = computed(() => !!currentYear.value && !yearError.value);

// The end-of-spine summon rests as a collapsed "+ Add event" affordance when
// events already exist, the form isn't open, and nothing is mid-preview.
const isSummonCollapsed = computed(
  () => timelineEvents.value.length > 0 && !summonFormExpanded.value && !pendingEvent.value,
);

// Get available periods for a specific position (delegates to the pure
// helper; sorted events carry the canonical yearsAgo the constraint reads).
const getAvailablePeriodsForPosition = (position) =>
  availablePeriodsForPosition(sortedTimelineEvents.value, position);

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

// `yearsAgoFromSelection` (pick a concrete yearsAgo inside the selected
// bucket, clamped between neighbours) and `deriveEventYear` (render the
// display year from the world year) both live in ../utils/lore-timeline.mjs
// — the single source of truth shared with the unit tests. `yearsAgo` is
// the canonical axis; the display year is always derived, never stored.

// Resolve the actual stored event object for a display-row index. The
// derived `sortedTimelineEvents` maps to NEW objects (to attach eventYear),
// so its elements are NOT reference-equal to anything in `timelineEvents`.
// `sortByYearsAgo` sorts WITHOUT mapping, preserving references, so this
// gives the real stored object the edit/remove handlers can locate.
const storedEventAtRow = (index) => sortByYearsAgo(timelineEvents.value)[index];

const MAX_GENERATIONS = 5;
const RESET_WINDOW_MS = 86400000;

// Check if user can generate events (premium or under limit)
const canGenerateEvent = async () => {
  if (props.premium) {
    await ensureQuotaSeeded('lore');
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

  const quota = await readQuota('lore');

  if (!quota.valid) {
    toast.warning(
      "Lore tracking data couldn't be read. Clear this site's browser storage to reset, or become a $5 patron for unlimited access.",
      8000
    );
    return false;
  }

  const { count, firstGenTime } = quota;
  const now = Date.now();

  if (count >= MAX_GENERATIONS) {
    if (!firstGenTime || now - firstGenTime >= RESET_WINDOW_MS) {
      await writeQuota('lore', { count: 1, firstGenTime: now });
    } else {
      const resetTime = new Date(firstGenTime + RESET_WINDOW_MS);
      toast.warning(`You've reached the 5 event generation limit. Come back at ${resetTime.toLocaleString()} or become a $5 patron for unlimited access.`, 8000);
      return false;
    }
  } else {
    await writeQuota('lore', {
      count: count + 1,
      firstGenTime: count === 0 ? now : firstGenTime,
    });
  }

  await updateRemainingGenerations();
  return true;
};

// Update remaining generations display
const updateRemainingGenerations = async () => {
  if (props.premium) {
    remainingGenerations.value = Infinity;
    return;
  }
  const quota = await readQuota('lore');
  remainingGenerations.value = remainingFromQuota(quota, MAX_GENERATIONS, RESET_WINDOW_MS);
};

// Start the timeline. Gated by canStartTimeline (the button is disabled
// until the world-year is set), so no toast-on-click here. Seeds the first
// event type with the natural opener; the summon card rests at position 0.
const startTimeline = () => {
  if (!canStartTimeline.value) return;

  hasStarted.value = true;
  eventType.value = 'Creation/Forging';
  timePeriod.value = '';
  additionalContext.value = '';
  generatingPosition.value = 0;
};

// Relocate the summon card to a mid-spine gap at `position`.
const startGeneratingEvent = (position) => {
  generatingPosition.value = position;
  pendingEvent.value = null;
  eventType.value = '';
  timePeriod.value = '';
  additionalContext.value = '';
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
  const yearsAgo = yearsAgoFromSelection(timePeriod.value, sortedTimelineEvents.value, position);
  const eventYear = deriveEventYear(currentYear.value, yearsAgo);

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

  } catch (error) {
    logger.error('Error generating event:', error);
    toast.error('Failed to generate event. Please try again.');
  } finally {
    loadingEvents.value = false;
  }
};

// Regenerate event
const regenerateEvent = () => {
  // Don't clear pendingEvent - keep it visible while regenerating
  generateEvent();
};

// Confirm adding the event
const confirmAddEvent = () => {
  if (!pendingEvent.value) return;

  // Persist only the canonical shape — eventYear is derived at render, never
  // stored (pendingEvent carries it for the transient preview only).
  const e = pendingEvent.value;
  timelineEvents.value.push({
    title: e.title,
    description: e.description,
    timePeriod: e.timePeriod,
    yearsAgo: e.yearsAgo,
  });

  // Clear generation state; rest the summon card collapsed at the spine's end.
  pendingEvent.value = null;
  eventType.value = '';
  timePeriod.value = '';
  additionalContext.value = '';
  generatingPosition.value = timelineEvents.value.length;
  summonFormExpanded.value = false;

  updateItem();
};

// Cancel generation — collapse the summon form back to the spine's end.
const cancelGeneration = () => {
  pendingEvent.value = null;
  eventType.value = '';
  timePeriod.value = '';
  additionalContext.value = '';
  generatingPosition.value = timelineEvents.value.length;
  summonFormExpanded.value = false;
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
  const stored = storedEventAtRow(index);
  const originalIndex = timelineEvents.value.indexOf(stored);
  if (originalIndex === -1) return;

  // If the user edited the display year, invert it back to the canonical
  // yearsAgo. Keep the old value when the edit can't be parsed unambiguously.
  let updatedYearsAgo = editingEvent.value.yearsAgo;
  const originalDisplayYear = deriveEventYear(currentYear.value, stored.yearsAgo);
  if (editingEvent.value.eventYear !== originalDisplayYear) {
    const derived = yearsAgoFromEventYear(editingEvent.value.eventYear, currentYear.value);
    if (derived !== null) updatedYearsAgo = derived;
  }

  // Persist the canonical shape; never store the derived display year.
  const updated = {
    ...stored,
    title: editingEvent.value.title,
    description: editingEvent.value.description,
    yearsAgo: updatedYearsAgo,
  };
  delete updated.eventYear;
  timelineEvents.value[originalIndex] = updated;

  // Clear edit state
  editingEventIndex.value = null;
  editingEvent.value = {};

  updateItem();
};

// Cancel event edit
const cancelEventEdit = () => {
  editingEventIndex.value = null;
  editingEvent.value = {};
};

// Remove event from timeline
const removeFromTimeline = (index) => {
  const stored = storedEventAtRow(index);
  const originalIndex = timelineEvents.value.indexOf(stored);

  if (originalIndex !== -1) {
    timelineEvents.value.splice(originalIndex, 1);
    if (expandedIndex.value === index) expandedIndex.value = null;
    if (editingEventIndex.value === index) editingEventIndex.value = null;
    // Keep the resting summon position pinned to the (new) end of the spine.
    if (generatingPosition.value !== null && generatingPosition.value > timelineEvents.value.length) {
      generatingPosition.value = timelineEvents.value.length;
    }
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
    logger.error('Error generating summary:', error);
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

// Update item lore with the historical summary. This overwrites hand-written
// lore, so it's gated behind the parchment confirm dialog rather than the
// native confirm().
const requestUpdateItemLore = () => {
  showLoreConfirm.value = true;
};

const confirmUpdateItemLore = () => {
  showLoreConfirm.value = false;

  // Combine the historical summary and legacy into a comprehensive lore text
  const newLore = `${historicalSummary.value}${itemLegacy.value ? `\n\n${itemLegacy.value}` : ''}`;

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

  toast.success('Item lore has been updated with the historical summary!');
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
});

// Load timeline data from item
const loadTimelineData = () => {
  if (props.item.timelineEvents && props.item.timelineEvents.length > 0) {
    timelineEvents.value = [...props.item.timelineEvents];
    hasStarted.value = true;
    generatingPosition.value = timelineEvents.value.length; // Summon rests at the end
  } else {
    timelineEvents.value = [];
    hasStarted.value = false;
    generatingPosition.value = null;
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

  // Reset transient form state when loading a new item
  pendingEvent.value = null;
  eventType.value = '';
  timePeriod.value = '';
  additionalContext.value = '';
  expandedIndex.value = null;
  editingEventIndex.value = null;
  summonFormExpanded.value = false;
};

// Watch for prop changes (when switching items)
watch(() => props.item, () => {
  loadTimelineData();
}, { deep: true });

// Watch for current year changes (but don't save to localStorage)
watch(currentYear, () => {
  validateYear();
});
</script>

<style scoped lang="scss">
/* ──────────────────────────────────────────────────────────────────────────
   Lore Builder — vertical timeline "spine".

   Editorial parchment surface: ink prose, burgundy headers, a quiet burgundy
   spine, year marginalia in the left rail. The only chrome is the buttons
   (ParCardButton semantic variants) and the lapis "create" affordances; they
   sit at action points and stay latent at rest. Colors go through --par-*
   tokens, never hex (parchment house rule).
   ────────────────────────────────────────────────────────────────────────── */

/* Shared rail geometry so every row's year column, marker dot, and spine
   line align to the same vertical. The year column is wide enough to hold a
   short reckoning ("815 DR") on one line; longer ones ("38 Before the
   Cataclysm") wrap within it rather than overflowing onto the title. */
$rail-year: 7.5rem;   /* year-rail (marginalia) column width */
$rail-marker: 2rem;   /* marker column width */
$line-x: 8.5rem;      /* $rail-year + half of $rail-marker → dot/line centre */

.lore-builder {
  padding: 2.5rem 2rem 1rem;
  background: var(--par-color-surface-card, #FEFBF4);
  border-radius: var(--par-radius-lg, 12px);
  color: var(--par-color-text, #222);
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
}

/* ── Header ─────────────────────────────────────────────────────────────── */
.lore-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
}

.lore-header__title {
  margin: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 2.6rem;
  font-weight: 600;
  font-variant-caps: small-caps;
  letter-spacing: 0.02em;
  line-height: 1.1;
  color: var(--par-color-title, #7a1f1f);
}

.lore-header__subtitle {
  margin: 0.3rem 0 0;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
}

.lore-header__year-input {
  width: 9rem;
  box-sizing: border-box;
  padding: 0.5rem 0.9rem;
  text-align: center;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.5rem;
  color: var(--par-color-title, #7a1f1f);
  background: transparent;
  border: 1px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-sm, 3px);
  outline: none;
  transition: border-color 0.15s ease;
}

.lore-header__year-input::placeholder {
  color: var(--par-color-text-muted, #6b6b6b);
  font-style: italic;
}

.lore-header__year-input:focus {
  border-color: var(--par-color-title, #7a1f1f);
}

.lore-header__year-input.is-error {
  border-color: var(--par-color-title, #7a1f1f);
}

.lore-header__year-error,
.lore-header__year-hint {
  margin: 0.5rem 0 0;
  font-size: 1.25rem;
  font-style: italic;
  text-align: right;
}

.lore-header__year-error {
  color: var(--par-color-title, #7a1f1f);
}

.lore-header__year-hint {
  color: var(--par-color-text-muted, #6b6b6b);
}

/* Hairline rule beneath the header. */
.lore-header__year-hint,
.lore-header__year-error {
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--par-color-divider, #e2dccd);
}

/* ── Empty state ────────────────────────────────────────────────────────── */
.lore-empty {
  margin-top: 2.5rem;
  padding: 3rem 1rem;
  text-align: center;
  background: var(--par-color-callout-bg-light, #F8F2E3);
  border: 1px solid var(--par-color-border, #e8e2d4);
  border-radius: var(--par-radius-lg, 12px);
}

.lore-empty__lede {
  margin: 0 0 1.25rem;
  font-size: 1.6rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
}

.lore-empty__gate {
  margin: 1.25rem 0 0;
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}

/* ── Spine ──────────────────────────────────────────────────────────────── */
.spine {
  position: relative;
  margin-top: 2rem;
}

/* The continuous vertical rule. Runs the full height of the spine; the
   terminus divider below picks the line up and converges it into the
   summary. */
.spine::before {
  content: '';
  position: absolute;
  top: 0.6rem;
  bottom: 0;
  left: $line-x;
  width: 2px;
  background: var(--par-color-title, #7a1f1f);
  opacity: 0.55;
}

/* Every row shares the same three-column rail so years, dots, and bodies
   line up vertically down the spine. */
.spine-row,
.spine-gap {
  display: grid;
  grid-template-columns: $rail-year $rail-marker 1fr;
  align-items: start;
}

.spine-year {
  padding-top: 0.35rem;
  padding-right: 0.9rem;
  text-align: right;
  font-size: 1.35rem;
  font-variant-caps: small-caps;
  letter-spacing: 0.04em;
  line-height: 1.25;
  color: var(--par-color-title, #7a1f1f);
  /* Long reckonings wrap within the rail instead of bleeding onto the title;
     break a single over-long word as a last resort so nothing overflows. */
  overflow-wrap: break-word;
}

.spine-marker {
  position: relative;
  display: flex;
  justify-content: center;
}

/* Node / pending markers sit on top of the line, masked by a ring the colour
   of the surface so the rule reads as passing behind them. */
.spine-dot {
  width: 1.1rem;
  height: 1.1rem;
  margin-top: 0.35rem;
  border-radius: 50%;
  box-shadow: 0 0 0 4px var(--par-color-surface-card, #FEFBF4);
}

.spine-dot--committed {
  background: var(--par-color-title, #7a1f1f);
}

.spine-dot--pending {
  background: var(--par-color-surface-card, #FEFBF4);
  border: 1.5px dashed var(--par-color-border-deep, #b8a685);
}

/* ── Event node ─────────────────────────────────────────────────────────── */
.spine-row--event {
  padding-bottom: 1.4rem;
}

/* Collapsed: title + teaser, no chrome. The whole row is the affordance. */
.node-collapsed {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.2rem 0.6rem 0.2rem 0;
  background: transparent;
  border: none;
  border-radius: var(--par-radius-sm, 3px);
  cursor: pointer;
  font-family: inherit;
}

.node-collapsed__title {
  display: block;
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  line-height: 1.25;
}

.node-collapsed__teaser {
  display: block;
  margin-top: 0.2rem;
  font-size: 1.45rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.4;
}

.node-collapsed:hover .node-collapsed__title,
.node-collapsed:focus-visible .node-collapsed__title {
  color: var(--par-color-title-deep, #58180d);
}

.node-collapsed:focus-visible {
  outline: 2px solid var(--par-color-title, #7a1f1f);
  outline-offset: 2px;
}

/* Expanded: the card with full prose + its chrome. */
.node-expanded {
  padding: 1.4rem 1.6rem;
  background: var(--par-color-surface, #FBF7F0);
  border: 1px solid var(--par-color-border, #e8e2d4);
  border-radius: var(--par-radius-md, 4px);
  box-shadow: var(--par-color-card-shadow, 0 1px 3px rgba(122, 50, 30, 0.04));
}

.node-expanded__title {
  margin: 0 0 0.6rem;
  font-size: 1.85rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  cursor: pointer;
}

.node-expanded__text {
  margin: 0 0 1rem;
  font-size: 1.55rem;
  line-height: 1.65;
  color: var(--par-color-text, #222);
}

.node-expanded__text :deep(strong) { font-weight: 600; }

.node-expanded__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.node-edit {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ── Time-gap row ───────────────────────────────────────────────────────── */
.spine-gap {
  padding: 0.4rem 0 1rem;
}

.spine-gap__body {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-height: 2.4rem;
}

.spine-gap__rule {
  width: 2rem;
  height: 1px;
  background: var(--par-color-border-strong, #c9b99a);
  flex-shrink: 0;
}

.spine-gap__text {
  font-size: 1.35rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  white-space: nowrap;
}

/* ── Summon card ────────────────────────────────────────────────────────── */
/* The card itself lives in LoreSummonCard.vue; here we only own the spine
   row that wraps it (year-rail / marker / body grid) and the collapsed
   "+ Add event" affordance that rests in its place when events exist. */
.spine-row--summon {
  padding-bottom: 1.6rem;
}

/* Collapsed affordance: give the resting row extra breathing room below the
   last event so "+ Add event" sits a little further down the spine, and drop
   the pending dot to the button's vertical centre (the affordance is shorter
   than an event node, so the default top-aligned dot reads as misaligned). */
.spine-row--collapsed {
  padding-top: 0.9rem;
}

.spine-row--collapsed .spine-dot {
  margin-top: 1rem;
}

/* ── Skeleton (generating state) — summary terminus loading ─────────────── */
.lore-skeleton {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0.4rem 0;
}

.lore-skeleton__line {
  height: 1.2rem;
  border-radius: var(--par-radius-sm, 3px);
  background: linear-gradient(
    90deg,
    var(--par-color-callout-bg, #f3ebda) 25%,
    var(--par-color-callout-bg-deep, #ede2cb) 50%,
    var(--par-color-callout-bg, #f3ebda) 75%
  );
  background-size: 200% 100%;
  animation: lore-shimmer 1.4s ease-in-out infinite;
}

.lore-skeleton__line:nth-child(1) { width: 100%; }
.lore-skeleton__line:nth-child(2) { width: 92%; }
.lore-skeleton__line:nth-child(3) { width: 84%; }
.lore-skeleton__line:nth-child(4) { width: 70%; }

@keyframes lore-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── Terminus: spine converges into the historical summary ──────────────── */
.lore-terminus {
  margin-top: 0.5rem;
}

.lore-terminus__divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0 0 1.4rem;
}

.lore-terminus__label {
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  white-space: nowrap;
}

.lore-terminus__divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--par-color-divider, #e2dccd);
}

.summary-card {
  position: relative;
  padding: 1.8rem 2rem;
  background: var(--par-color-callout-bg, #f3ebda);
  border-left: 3px solid var(--par-color-title, #7a1f1f);
  border-radius: var(--par-radius-md, 4px);
}

.summary-card__heading {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  font-variant-caps: small-caps;
  letter-spacing: 0.06em;
  color: var(--par-color-title, #7a1f1f);
}

.summary-card__text {
  margin: 0 0 1rem;
  font-size: 1.6rem;
  line-height: 1.7;
  color: var(--par-color-callout-text, #2c2c2a);
}

.summary-card__text :deep(strong) { font-weight: 600; }

.summary-card__legacy {
  margin: 0 0 1.2rem;
  font-size: 1.45rem;
  line-height: 1.6;
  color: var(--par-color-text-secondary, #555);
}

.summary-card__legacy-label {
  font-variant-caps: small-caps;
  letter-spacing: 0.06em;
  color: var(--par-color-title, #7a1f1f);
  margin-right: 0.5rem;
}

.summary-card__empty {
  margin: 0 0 1.2rem;
  font-size: 1.45rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}

.summary-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

/* Toggleable export affordance — mirrors the Item Details tab's Export
   button; the shared ItemExportsSection panel reveals below it. */
.lore-export-toggle {
  margin-top: 2rem;
}

/* Update Item Lore overwrites hand-written lore — a real commitment — but it
   sits beneath the summary it distils. A burgundy ghost (thin burgundy
   outline, semibold) keeps the summary prose primary and lets the action read
   as a considered commitment rather than a filled button competing with the
   reading flow. Overrides the affirmative variant's tan rest-border + 400
   weight; its transparent ground and burgundy hover tint carry through. */
.summary-card__actions :deep(.summary-card__commit) {
  border-width: 0.5px;
  border-color: var(--par-color-title, #7a1f1f);
  font-weight: 600;
}
</style>
