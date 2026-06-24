<template>
  <GeneratorLayout :flexible-sidebar="true" :show-footer="false">
    <!-- ── Sidebar: saved timelines + footer ──────────────────────────────── -->
    <template #sidebar>
      <div class="sidebar-content parchment">
        <div class="sidebar-scroll">
          <ul class="saved-timelines">
            <li
              v-for="(t, index) in timelines"
              :key="t.id"
              class="sidebar-item"
              :class="{ 'sidebar-item--active': activeIndex === index }"
            >
              <button class="sidebar-item__button" @click="selectTimeline(index)">
                <span class="sidebar-item__name">{{ t.subject || 'Untitled timeline' }}</span>
                <span class="sidebar-item__meta">{{ eventCountLabel(t) }}</span>
              </button>
            </li>
            <li v-if="timelines.length === 0" class="sidebar-empty">No saved timelines yet.</li>
          </ul>
        </div>

        <div class="sidebar-footer">
          <ParButton variant="primary" :full-width="true" @click="newTimeline">
            + New timeline
          </ParButton>

          <div class="sidebar-footer__divider"></div>

          <div class="sidebar-data-options">
            <button
              class="sidebar-data-options__toggle"
              @click="dataOptionsExpanded = !dataOptionsExpanded"
              :aria-expanded="dataOptionsExpanded"
              aria-controls="sidebar-data-options-panel"
            >
              <span>Data options</span>
              <svg
                class="sidebar-data-options__icon"
                :class="{ 'is-expanded': dataOptionsExpanded }"
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>

            <div
              v-if="dataOptionsExpanded"
              id="sidebar-data-options-panel"
              class="sidebar-data-options__panel"
            >
              <p class="sidebar-data-options__description">
                Save your timelines to a file or restore from a backup. Your data stays on your device.
              </p>
              <button class="sidebar-data-options__action" @click="showDataManagerModal = true">
                Backup / Restore timelines
              </button>
              <button
                class="sidebar-data-options__action sidebar-data-options__action--danger"
                @click="confirmDeleteAll"
              >
                Delete all timelines
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- ── Main: the timeline spine ───────────────────────────────────────── -->
    <div class="main-container">
      <DataManagerModal :opened="showDataManagerModal" @update:opened="showDataManagerModal = $event"
        :premium="true" currentApp="rpgTimelines" />

      <ParModal :opened="showDeleteConfirmation" title="Delete all timelines?" @cancel="showDeleteConfirmation = false">
        <p class="delete-all-modal__body">
          This will permanently delete every saved timeline. This action cannot be undone.
        </p>
        <p class="delete-all-modal__suggestion">
          Consider backing up first if you might want to restore these later.
        </p>
        <template #footer>
          <ParButton variant="secondary" @click="showDeleteConfirmation = false">Cancel</ParButton>
          <button class="delete-all-modal__confirm" @click="deleteAllTimelines">Delete all timelines</button>
        </template>
      </ParModal>

      <div class="timeline-card">
        <!-- ── Header: subject · subtitle · world-year · hairline ───────────── -->
        <header class="timeline-header">
          <div class="timeline-header__titles">
            <input
              v-model="subject"
              class="timeline-header__subject"
              placeholder="Name a person, place, or thing…"
              aria-label="Subject of the timeline"
            />
            <p class="timeline-header__subtitle">{{ subtitle }}</p>
          </div>
          <div class="timeline-header__year">
            <input
              v-model="currentYear"
              class="timeline-header__year-input"
              :class="{ 'is-error': yearError }"
              placeholder="Set year"
              aria-label="Current year in your world"
              @blur="validateYear"
            />
          </div>
        </header>
        <p v-if="yearError" class="timeline-header__year-error">{{ yearErrorMessage }}</p>
        <p v-else class="timeline-header__year-hint">
          Set your world's current year — historical dates derive from it.
        </p>

        <!-- Optional background that informs every generated event -->
        <div class="timeline-background">
          <ParField label="Current lore or background" :optional="true">
            <ParTextarea v-model="background" :rows="3"
              placeholder="Anything already known about this subject (optional)…" />
          </ParField>
        </div>

        <!-- ── Empty state ──────────────────────────────────────────────────── -->
        <div v-if="!hasStarted && timelineEvents.length === 0" class="timeline-empty">
          <p class="timeline-empty__lede">No history has been recorded yet.</p>
          <ParCardButton variant="create" :disabled="!canStartTimeline" @click="startTimeline">
            + Create Historical Timeline
          </ParCardButton>
          <p v-if="!canStartTimeline" class="timeline-empty__gate">
            Name your subject and set the current year above to begin.
          </p>
        </div>

        <!-- ── The spine ────────────────────────────────────────────────────── -->
        <div v-else class="spine">
          <template v-for="(event, index) in sortedTimelineEvents" :key="`event-${index}`">
            <!-- Mid-spine insert slot BEFORE this node -->
            <div v-if="generatingPosition === index" class="spine-row spine-row--summon">
              <div class="spine-year"></div>
              <div class="spine-marker"><span class="spine-dot spine-dot--pending"></span></div>
              <div class="spine-body">
                <LoreSummonCard
                  heading="Summon a new event"
                  v-model:event-type="eventType"
                  v-model:time-period="timePeriod"
                  v-model:specific-year="specificYear"
                  v-model:additional-context="additionalContext"
                  :event-type-options="eventTypeOptions"
                  :period-options="getAvailablePeriodsForPosition(index)"
                  :allow-specific-year="true"
                  :loading="loadingEvents"
                  :pending-event="pendingEvent"
                  :premium="true"
                  :can-cancel="true"
                  @generate="generateEvent"
                  @keep="confirmAddEvent"
                  @regenerate="regenerateEvent"
                  @cancel="cancelGeneration"
                />
              </div>
            </div>

            <!-- Time-gap row between two nodes -->
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
                <button
                  v-if="expandedIndex !== index"
                  type="button"
                  class="node-collapsed"
                  @click="expandedIndex = index"
                >
                  <span class="node-collapsed__title">{{ event.title }}</span>
                  <span class="node-collapsed__teaser">{{ teaser(event.description) }}</span>
                </button>

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

          <!-- Resting summon slot at the spine's tail (or the first event) -->
          <div
            v-if="generatingPosition === timelineEvents.length"
            class="spine-row spine-row--summon spine-row--end"
            :class="{ 'spine-row--collapsed': isSummonCollapsed }"
          >
            <div class="spine-year"></div>
            <div class="spine-marker"><span class="spine-dot spine-dot--pending"></span></div>
            <div class="spine-body">
              <div v-if="isSummonCollapsed" class="summon-trigger">
                <ParCardButton variant="create" size="small" @click="summonFormExpanded = true">
                  + Add event
                </ParCardButton>
              </div>

              <LoreSummonCard
                v-else
                :heading="timelineEvents.length === 0 ? 'Summon the first event' : 'Summon a new event'"
                v-model:event-type="eventType"
                v-model:time-period="timePeriod"
                v-model:specific-year="specificYear"
                v-model:additional-context="additionalContext"
                :event-type-options="eventTypeOptions"
                :period-options="getAvailablePeriodsForPosition(timelineEvents.length)"
                :allow-specific-year="true"
                :loading="loadingEvents"
                :pending-event="pendingEvent"
                :premium="true"
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
        <div v-if="timelineEvents.length > 0" class="timeline-terminus">
          <div class="timeline-terminus__divider">
            <span class="timeline-terminus__label">distilled into</span>
          </div>

          <div class="summary-card">
            <h3 class="summary-card__heading">Historical Summary</h3>

            <div v-if="loadingSummary" class="lore-skeleton">
              <span v-for="n in 4" :key="n" class="lore-skeleton__line"></span>
            </div>

            <div v-else-if="historicalSummary" class="summary-card__body">
              <p class="summary-card__text" v-html="formatMarkdown(historicalSummary)"></p>
              <p class="summary-card__legacy" v-if="currentState">
                <span class="summary-card__legacy-label">Current State</span>
                <span v-html="formatMarkdown(currentState)"></span>
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
            </div>
          </div>
        </div>

        <!-- ── Export (toggleable) ──────────────────────────────────────────── -->
        <div v-if="timelineEvents.length > 0" class="timeline-export-toggle">
          <ParCardButton @click="showExport = !showExport">
            {{ showExport ? 'Hide export' : 'Export' }}
          </ParCardButton>
        </div>

        <div v-if="timelineEvents.length > 0 && showExport" class="timeline-exports">
          <div class="export-card">
            <p class="export-card__label">Homebrewery PDF</p>
            <p class="export-card__body">
              Copy your timeline as markdown, paste it into
              <a href="https://homebrewery.naturalcrit.com/new" target="_blank" rel="noopener noreferrer">Homebrewery</a>,
              and reorder or edit it into a beautifully formatted PDF.
            </p>
            <ParCardButton variant="affirmative" @click="copyAsMarkdown">Copy as markdown</ParCardButton>
          </div>
          <div class="export-card">
            <p class="export-card__label">Plain text</p>
            <p class="export-card__body">
              Copy your timeline as plain text to drop into your notes, a document, or any other tool.
            </p>
            <ParCardButton variant="affirmative" @click="copyPlainText">Copy as plain text</ParCardButton>
          </div>
        </div>
      </div>

      <!-- Per-timeline delete -->
      <div v-if="activeIndex !== null" class="timeline-footer">
        <ParButton variant="secondary" :full-width="true" type="button" @click="deleteCurrentTimeline">
          Delete this timeline
        </ParButton>
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue';
import {
  ParButton,
  ParField,
  ParTextarea,
  ParModal,
  ParCardButton,
  ParCardInput,
  ParCardTextarea,
} from '@/parchment';
import GeneratorLayout from '@/components/GeneratorLayout.vue';
import DataManagerModal from './DataManagerModal.vue';
import LoreSummonCard from '@/tools/item-generator/components/LoreSummonCard.vue';
import { formatMarkdown } from '@/tools/item-generator/utils/format-markdown.mjs';
import {
  deriveEventYear,
  yearsAgoFromEventYear,
  sortByYearsAgo,
  availablePeriodsForPosition,
  yearsAgoFromSelection,
} from '@/tools/item-generator/utils/lore-timeline.mjs';
import {
  generateTimelineEventPrompt,
  generateTimelineSummaryPrompt,
  validateTimelineEventJson,
  validateTimelineSummaryJson,
} from '@/prompts/timelinePrompts.mjs';
import { generateGptResponse } from '@/util/ai-client.mjs';
import { logger } from '@/util/logger.mjs';
import { useToast } from '@/composables/useToast';

const toast = useToast();

const STORAGE_KEY = 'rpgTimelines';
const LEGACY_KEY = 'rpgTimelineState';

// ── Working state (the timeline currently being edited) ──────────────────────
const subject = ref('');
const background = ref('');
const currentYear = ref('');
const yearError = ref(false);
const yearErrorMessage = ref('');

const eventType = ref('');
const timePeriod = ref('');
const specificYear = ref('');
const additionalContext = ref('');
const timelineEvents = ref([]);
const historicalSummary = ref('');
const currentState = ref('');

const loadingEvents = ref(false);
const loadingSummary = ref(false);
const generatingPosition = ref(null);
const pendingEvent = ref(null);
const hasStarted = ref(false);
const editingEventIndex = ref(null);
const editingEvent = ref({});
const expandedIndex = ref(null);
const summonFormExpanded = ref(false);
const showExport = ref(false);

// ── Library state ────────────────────────────────────────────────────────────
const timelines = ref([]);
const activeIndex = ref(null);
const showDataManagerModal = ref(false);
const dataOptionsExpanded = ref(false);
const showDeleteConfirmation = ref(false);

// Guards the autosave watcher from firing while we're loading an entry's data
// into the working refs (those mutations shouldn't write back). Cleared on the
// next tick, after the load's reactive flush has run.
let isLoadingEntry = false;

// Generic event types — a person/place/thing's history, not an item's.
const eventTypeOptions = [
  'Origin Event',
  'Transformative Event (Bad)',
  'Transformative Event (Good)',
  'Transformative Event (Mixed Consequences)',
  'Unusual/Weird Event',
  'Alteration/Modification',
  'Movement/Relocation',
  'Peak/Milestone',
  'Decline/Deterioration',
  'Revival/Renewal',
  'Conflict/Struggle',
  'Resolution/Agreement',
  'Discovery/Recognition',
  'End/Destruction',
  'Association/Connection',
  'Separation/Isolation',
  'Conservation/Preservation',
  'Expansion/Growth',
];

const subtitle = computed(() =>
  subject.value.trim() ? `A chronicle of ${subject.value.trim()}` : 'A history, one event at a time'
);

const eventCountLabel = (t) => {
  const n = t.timelineEvents?.length || 0;
  return `${n} event${n === 1 ? '' : 's'}`;
};

// Display year is DERIVED from canonical yearsAgo + the world year, so changing
// the world year cascades to every event. Events never persist eventYear.
const sortedTimelineEvents = computed(() =>
  sortByYearsAgo(timelineEvents.value).map((event) => ({
    ...event,
    eventYear: deriveEventYear(currentYear.value, event.yearsAgo),
  }))
);

const gapYears = (nodeIndex) => {
  const events = sortedTimelineEvents.value;
  const older = events[nodeIndex - 1];
  const younger = events[nodeIndex];
  if (!older || !younger) return null;
  return older.yearsAgo - younger.yearsAgo;
};

const teaser = (text) => {
  if (!text) return '';
  const plain = text.replace(/[*_#>`]/g, '').replace(/\s+/g, ' ').trim();
  if (plain.length <= 110) return plain;
  const cut = plain.slice(0, 110);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…';
};

const canStartTimeline = computed(
  () => !!subject.value.trim() && !!currentYear.value && !yearError.value
);

const isSummonCollapsed = computed(
  () => timelineEvents.value.length > 0 && !summonFormExpanded.value && !pendingEvent.value
);

const getAvailablePeriodsForPosition = (position) =>
  availablePeriodsForPosition(sortedTimelineEvents.value, position);

const storedEventAtRow = (index) => sortByYearsAgo(timelineEvents.value)[index];

// When the user pins an exact year, the event's chronological neighbours come
// from where that year sorts in — not the slot the summon card sits in.
const neighborsForYearsAgo = (years) => {
  let before = null; // older — the previous event in time
  let after = null; // younger — the next event in time
  for (const ev of sortedTimelineEvents.value) {
    if (ev.yearsAgo > years) before = ev;
    else if (ev.yearsAgo < years && !after) after = ev;
  }
  return { before, after };
};

// ── Persistence (a library of timelines under one key) ───────────────────────
const makeId = () => `tl_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;

const saveTimelines = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(timelines.value));
};

// Normalize stored events to the canonical { title, description, timePeriod,
// yearsAgo } shape. Older single-timeline saves stored `details` + a baked
// `eventYear` instead of `description` + `yearsAgo`.
const normalizeEvents = (rawEvents, yearForDerive) => {
  const arr = Array.isArray(rawEvents) ? rawEvents : [];
  return arr.map((e) => {
    let yearsAgo = e.yearsAgo;
    if (yearsAgo == null && e.eventYear != null) {
      const derived = yearsAgoFromEventYear(e.eventYear, yearForDerive);
      if (derived !== null) yearsAgo = derived;
    }
    return {
      title: e.title,
      description: e.description ?? e.details ?? '',
      timePeriod: e.timePeriod || '',
      yearsAgo: yearsAgo ?? 0,
    };
  });
};

const collectCurrent = () => ({
  subject: subject.value,
  background: background.value,
  currentYear: currentYear.value,
  timelineEvents: timelineEvents.value,
  historicalSummary: historicalSummary.value,
  currentState: currentState.value,
});

// Write the working refs back into the active library entry, creating one the
// first time there's something worth saving.
const persistActive = () => {
  const data = collectCurrent();
  if (activeIndex.value === null) {
    if (!data.subject.trim() && data.timelineEvents.length === 0) return;
    timelines.value.push({ id: makeId(), created: new Date().toISOString(), ...data });
    activeIndex.value = timelines.value.length - 1;
  } else {
    timelines.value[activeIndex.value] = { ...timelines.value[activeIndex.value], ...data };
  }
  saveTimelines();
};

const loadIntoWorkingState = (entry) => {
  isLoadingEntry = true;
  subject.value = entry.subject || '';
  background.value = entry.background || '';
  currentYear.value = entry.currentYear || '';
  historicalSummary.value = entry.historicalSummary || '';
  currentState.value = entry.currentState || '';
  timelineEvents.value = normalizeEvents(entry.timelineEvents, entry.currentYear);
  hasStarted.value = timelineEvents.value.length > 0;
  generatingPosition.value = timelineEvents.value.length > 0 ? timelineEvents.value.length : null;
  resetTransientState();
  nextTick(() => { isLoadingEntry = false; });
};

const resetTransientState = () => {
  pendingEvent.value = null;
  eventType.value = '';
  timePeriod.value = '';
  specificYear.value = '';
  additionalContext.value = '';
  expandedIndex.value = null;
  editingEventIndex.value = null;
  editingEvent.value = {};
  summonFormExpanded.value = false;
  showExport.value = false;
  yearError.value = false;
  yearErrorMessage.value = '';
};

const clearWorkingState = () => {
  isLoadingEntry = true;
  subject.value = '';
  background.value = '';
  currentYear.value = '';
  timelineEvents.value = [];
  historicalSummary.value = '';
  currentState.value = '';
  hasStarted.value = false;
  generatingPosition.value = null;
  resetTransientState();
  nextTick(() => { isLoadingEntry = false; });
};

const loadTimelines = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      // Tolerate a non-array (e.g. a backup of the old single-object format)
      // and backfill ids so sidebar keys stay stable.
      const list = Array.isArray(parsed) ? parsed : [parsed];
      timelines.value = list.map((t) => (t.id ? t : { ...t, id: makeId() }));
    } catch (error) {
      logger.error('Failed to load timelines from local storage:', error);
      timelines.value = [];
    }
  } else {
    // Migrate the legacy single-timeline save into a one-entry library.
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      try {
        const s = JSON.parse(legacy);
        const entry = {
          id: makeId(),
          created: new Date().toISOString(),
          subject: s.subject || '',
          background: s.background ?? s.itemDetails ?? '',
          currentYear: s.currentYear || '',
          historicalSummary: s.historicalSummary ?? s.timelineSummary ?? '',
          currentState: s.currentState || '',
          timelineEvents: normalizeEvents(s.timelineEvents, s.currentYear),
        };
        if (entry.subject.trim() || entry.timelineEvents.length) {
          timelines.value = [entry];
          saveTimelines();
        }
      } catch (error) {
        logger.error('Failed to migrate legacy timeline:', error);
      }
      localStorage.removeItem(LEGACY_KEY);
    }
  }

  // Open the most recent timeline if any exist; otherwise rest on a blank new
  // timeline (the sidebar still lists saved ones).
  if (timelines.value.length > 0) {
    activeIndex.value = 0;
    loadIntoWorkingState(timelines.value[0]);
  } else {
    activeIndex.value = null;
  }
};

// ── Library actions ──────────────────────────────────────────────────────────
const selectTimeline = (index) => {
  if (index === activeIndex.value) return;
  persistActive();
  activeIndex.value = index;
  loadIntoWorkingState(timelines.value[index]);
};

const newTimeline = () => {
  persistActive();
  activeIndex.value = null;
  clearWorkingState();
};

const deleteCurrentTimeline = () => {
  if (activeIndex.value === null) return;
  timelines.value.splice(activeIndex.value, 1);
  saveTimelines();
  activeIndex.value = null;
  clearWorkingState();
};

const confirmDeleteAll = () => {
  showDeleteConfirmation.value = true;
};

const deleteAllTimelines = () => {
  timelines.value = [];
  saveTimelines();
  activeIndex.value = null;
  clearWorkingState();
  showDeleteConfirmation.value = false;
  dataOptionsExpanded.value = false;
};

// ── Year validation ──────────────────────────────────────────────────────────
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

// ── Spine actions ────────────────────────────────────────────────────────────
const startTimeline = () => {
  if (!canStartTimeline.value) return;
  hasStarted.value = true;
  eventType.value = 'Origin Event';
  timePeriod.value = '';
  specificYear.value = '';
  additionalContext.value = '';
  generatingPosition.value = 0;
  persistActive();
};

const startGeneratingEvent = (position) => {
  generatingPosition.value = position;
  pendingEvent.value = null;
  eventType.value = '';
  timePeriod.value = '';
  specificYear.value = '';
  additionalContext.value = '';
};

const generateEvent = async () => {
  if (!eventType.value || (!timePeriod.value && !specificYear.value)) return;

  const position = generatingPosition.value;
  const sortedEvents = sortedTimelineEvents.value;

  // Resolve the canonical yearsAgo + the prompt's chronological neighbours.
  // A pinned exact year overrides the period bucket and re-derives neighbours
  // from where that year actually sorts in.
  let yearsAgo;
  let eventBefore;
  let eventAfter;
  if (specificYear.value.trim()) {
    const derived = yearsAgoFromEventYear(specificYear.value, currentYear.value);
    if (derived === null) {
      toast.error('Enter the specific year as a single number (e.g., "1462 DR").');
      return;
    }
    yearsAgo = derived;
    ({ before: eventBefore, after: eventAfter } = neighborsForYearsAgo(yearsAgo));
  } else {
    yearsAgo = yearsAgoFromSelection(timePeriod.value, sortedEvents, position);
    eventBefore = position > 0 ? sortedEvents[position - 1] : null;
    eventAfter = position < sortedEvents.length ? sortedEvents[position] : null;
  }

  loadingEvents.value = true;
  pendingEvent.value = null;

  const eventYear = deriveEventYear(currentYear.value, yearsAgo);
  const recentEvents = timelineEvents.value.slice(-3);

  try {
    const prompt = generateTimelineEventPrompt({
      subject: subject.value,
      background: background.value,
      eventBefore,
      eventAfter,
      eventType: eventType.value,
      eventYear,
      yearsAgo,
      additionalContext: additionalContext.value,
      recentEvents,
    });

    const response = await generateGptResponse(prompt, validateTimelineEventJson, 3);
    const data = JSON.parse(response);

    pendingEvent.value = {
      title: data.title,
      description: data.description,
      timePeriod: timePeriod.value,
      eventYear,
      yearsAgo,
    };
  } catch (error) {
    logger.error('Error generating timeline event:', error);
    toast.error('Failed to generate event. Please try again.');
  } finally {
    loadingEvents.value = false;
  }
};

const regenerateEvent = () => {
  generateEvent();
};

const confirmAddEvent = () => {
  if (!pendingEvent.value) return;
  const e = pendingEvent.value;
  timelineEvents.value.push({
    title: e.title,
    description: e.description,
    timePeriod: e.timePeriod,
    yearsAgo: e.yearsAgo,
  });

  pendingEvent.value = null;
  eventType.value = '';
  timePeriod.value = '';
  specificYear.value = '';
  additionalContext.value = '';
  generatingPosition.value = timelineEvents.value.length;
  summonFormExpanded.value = false;

  persistActive();
};

const cancelGeneration = () => {
  pendingEvent.value = null;
  eventType.value = '';
  timePeriod.value = '';
  specificYear.value = '';
  additionalContext.value = '';
  generatingPosition.value = timelineEvents.value.length;
  summonFormExpanded.value = false;
};

const startEditingEvent = (index) => {
  const event = sortedTimelineEvents.value[index];
  editingEventIndex.value = index;
  editingEvent.value = {
    title: event.title,
    eventYear: event.eventYear,
    description: event.description,
    timePeriod: event.timePeriod,
    yearsAgo: event.yearsAgo,
  };
};

const saveEventEdit = (index) => {
  const stored = storedEventAtRow(index);
  const originalIndex = timelineEvents.value.indexOf(stored);
  if (originalIndex === -1) return;

  let updatedYearsAgo = editingEvent.value.yearsAgo;
  const originalDisplayYear = deriveEventYear(currentYear.value, stored.yearsAgo);
  if (editingEvent.value.eventYear !== originalDisplayYear) {
    const derived = yearsAgoFromEventYear(editingEvent.value.eventYear, currentYear.value);
    if (derived !== null) updatedYearsAgo = derived;
  }

  timelineEvents.value[originalIndex] = {
    ...stored,
    title: editingEvent.value.title,
    description: editingEvent.value.description,
    yearsAgo: updatedYearsAgo,
  };

  editingEventIndex.value = null;
  editingEvent.value = {};
  persistActive();
};

const cancelEventEdit = () => {
  editingEventIndex.value = null;
  editingEvent.value = {};
};

const removeFromTimeline = (index) => {
  const stored = storedEventAtRow(index);
  const originalIndex = timelineEvents.value.indexOf(stored);
  if (originalIndex === -1) return;

  timelineEvents.value.splice(originalIndex, 1);
  if (expandedIndex.value === index) expandedIndex.value = null;
  if (editingEventIndex.value === index) editingEventIndex.value = null;
  if (generatingPosition.value !== null && generatingPosition.value > timelineEvents.value.length) {
    generatingPosition.value = timelineEvents.value.length;
  }
  persistActive();
};

const generateSummary = async () => {
  if (timelineEvents.value.length === 0) return;
  loadingSummary.value = true;

  try {
    const prompt = generateTimelineSummaryPrompt({
      subject: subject.value,
      background: background.value,
      sortedEvents: sortedTimelineEvents.value,
    });

    const response = await generateGptResponse(prompt, validateTimelineSummaryJson, 3);
    const data = JSON.parse(response);
    historicalSummary.value = data.timeline_summary;
    currentState.value = data.current_state;
    persistActive();
  } catch (error) {
    logger.error('Error generating timeline summary:', error);
    toast.error('Failed to generate historical summary. Please try again.');
  } finally {
    loadingSummary.value = false;
  }
};

// ── Export ───────────────────────────────────────────────────────────────────
const buildExport = ({ heading, bullet }) => {
  const name = subject.value || 'Subject';
  let out = `${heading(`Historic Summary of ${name}`)}\n\n`;
  if (historicalSummary.value) out += `${historicalSummary.value}\n\n`;
  if (currentState.value) out += `${currentState.value}\n\n`;
  out += `${heading(`Full Historic Timeline of ${name}`)}\n\n`;
  sortedTimelineEvents.value.forEach((event) => {
    out += `${bullet(event.title, event.eventYear)}\n${event.description}\n\n`;
  });
  return out;
};

const copyText = (text, message) => {
  navigator.clipboard.writeText(text);
  toast.success(message);
};

const copyAsMarkdown = () => {
  const markdown = buildExport({
    heading: (t) => `# ${t}`,
    bullet: (title, year) => `### ${title}\n#### ${year}`,
  });
  copyText(markdown, 'Timeline copied as markdown! Paste it into Homebrewery to see it formatted.');
};

const copyPlainText = () => {
  const text = buildExport({
    heading: (t) => t,
    bullet: (title, year) => `${title} (${year})`,
  });
  copyText(text, 'Timeline copied as plain text!');
};

// Autosave the header fields (subject / background / world-year). Re-validates
// the year on every change; persists only once an entry exists and we're not
// mid-load.
watch([subject, background, currentYear], () => {
  validateYear();
  if (!isLoadingEntry && activeIndex.value !== null) persistActive();
});

loadTimelines();
</script>

<style scoped lang="scss">
/* ──────────────────────────────────────────────────────────────────────────
   Timeline generator — a vertical history "spine" for any subject (person,
   place, or thing), with a GeneratorLayout sidebar listing saved timelines.
   Structurally a near-clone of the item generator's Lore Builder; the
   difference is the subject input in the header (this isn't bound to a single
   item) and the multi-entry library.
   ────────────────────────────────────────────────────────────────────────── */
$rail-year: 7.5rem;
$rail-marker: 2rem;
$line-x: 8.5rem;

.main-container {
  margin: 3rem auto;
  max-width: 880px;
  width: 100%;
  padding: 0 1rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

@media (max-width: 2080px) {
  .main-container {
    margin-top: 4rem;
  }
}

.timeline-card {
  padding: 2.25rem 2.5rem 2rem;
  background-color: var(--par-color-surface-card, #FEFBF4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  color: var(--par-color-text, #222);
}

/* ── Header ─────────────────────────────────────────────────────────────── */
.timeline-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
}

.timeline-header__titles {
  flex: 1;
  min-width: 0;
}

.timeline-header__subject {
  width: 100%;
  box-sizing: border-box;
  padding: 0.1rem 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 2.6rem;
  font-weight: 600;
  font-variant-caps: small-caps;
  letter-spacing: 0.02em;
  line-height: 1.1;
  color: var(--par-color-title, #7a1f1f);
  background: transparent;
  border: none;
  border-bottom: 1px solid transparent;
  outline: none;
  transition: border-color 0.15s ease;
}

.timeline-header__subject::placeholder {
  color: var(--par-color-text-muted, #6b6b6b);
  font-variant-caps: normal;
  font-style: italic;
  font-weight: 400;
}

.timeline-header__subject:hover {
  border-bottom-color: var(--par-color-border, #e8e2d4);
}

.timeline-header__subject:focus {
  border-bottom-color: var(--par-color-border-strong, #c9b99a);
}

.timeline-header__subtitle {
  margin: 0.3rem 0 0;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
}

.timeline-header__year-input {
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

.timeline-header__year-input::placeholder {
  color: var(--par-color-text-muted, #6b6b6b);
  font-style: italic;
}

.timeline-header__year-input:focus,
.timeline-header__year-input.is-error {
  border-color: var(--par-color-title, #7a1f1f);
}

.timeline-header__year-error,
.timeline-header__year-hint {
  margin: 0.5rem 0 0;
  padding-bottom: 1.25rem;
  font-size: 1.25rem;
  font-style: italic;
  text-align: right;
  border-bottom: 1px solid var(--par-color-divider, #e2dccd);
}

.timeline-header__year-error {
  color: var(--par-color-title, #7a1f1f);
}

.timeline-header__year-hint {
  color: var(--par-color-text-muted, #6b6b6b);
}

/* ── Background field ───────────────────────────────────────────────────── */
.timeline-background {
  margin-top: 1.5rem;
}

/* ── Empty state ────────────────────────────────────────────────────────── */
.timeline-empty {
  margin-top: 2.5rem;
  padding: 3rem 1rem;
  text-align: center;
  background: var(--par-color-callout-bg-light, #F8F2E3);
  border: 1px solid var(--par-color-border, #e8e2d4);
  border-radius: var(--par-radius-lg, 12px);
}

.timeline-empty__lede {
  margin: 0 0 1.25rem;
  font-size: 1.6rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
}

.timeline-empty__gate {
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
  overflow-wrap: break-word;
}

.spine-marker {
  position: relative;
  display: flex;
  justify-content: center;
}

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

/* ── Summon card row ────────────────────────────────────────────────────── */
.spine-row--summon {
  padding-bottom: 1.6rem;
}

.spine-row--collapsed {
  padding-top: 0.9rem;
}

.spine-row--collapsed .spine-dot {
  margin-top: 1rem;
}

/* ── Skeleton (summary terminus loading) ────────────────────────────────── */
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

/* ── Terminus ───────────────────────────────────────────────────────────── */
.timeline-terminus {
  margin-top: 0.5rem;
}

.timeline-terminus__divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0 0 1.4rem;
}

.timeline-terminus__label {
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
  white-space: nowrap;
}

.timeline-terminus__divider::after {
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

/* ── Export ─────────────────────────────────────────────────────────────── */
.timeline-export-toggle {
  margin-top: 2rem;
}

.timeline-exports {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.export-card {
  padding: 1.6rem 1.8rem;
  background: var(--par-color-callout-bg-light, #F8F2E3);
  border: 1px solid var(--par-color-border, #e8e2d4);
  border-radius: var(--par-radius-md, 4px);
}

.export-card__label {
  margin: 0 0 0.6rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.export-card__body {
  margin: 0 0 1.25rem;
  font-size: 1.45rem;
  line-height: 1.6;
  color: var(--par-color-text, #222);

  a {
    color: var(--color-action-rest, #365A85);
    text-decoration: underline;
    text-underline-offset: 0.15em;
  }
}

/* ── Per-timeline delete ────────────────────────────────────────────────── */
.timeline-footer {
  margin: 1.5rem auto 0;
  max-width: 40rem;
}

@media screen and (max-width: 640px) {
  .timeline-exports {
    grid-template-columns: 1fr;
  }
}

/* ──────────────────────────────────────────────────────────────────────────
   Sidebar — saved timelines list + pinned footer. Mirrors the statblock /
   item-generator sidebar conventions (roomy rows, hairline dividers, lapis
   active fill, quiet "Data options" gear panel).
   ────────────────────────────────────────────────────────────────────────── */
.sidebar-content {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);

  .sidebar-scroll {
    flex: 1;
    overflow-y: auto;
    padding-top: 0.5rem;
  }

  .saved-timelines {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .sidebar-item {
    transition: background-color 0.15s ease;

    &:hover {
      background-color: rgba(243, 235, 218, 0.4);
    }
  }

  .sidebar-item__button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.5rem;
    text-align: left;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--par-color-divider, #e2dccd);
    padding: 1.3rem 1.6rem;
    font-family: inherit;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
      outline-offset: -2px;
    }
  }

  .sidebar-item__name {
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--par-color-text, #222);
    line-height: 1.3;
  }

  .sidebar-item__meta {
    font-size: 1.3rem;
    color: var(--par-color-text-secondary, #555);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .sidebar-item--active {
    background-color: var(--par-color-callout-bg, #f3ebda);

    &:hover {
      background-color: var(--par-color-callout-bg, #f3ebda);
    }

    .sidebar-item__name {
      color: var(--color-action-hover, #2A4D70);
      font-weight: 600;
    }
  }

  .sidebar-empty {
    padding: 1.6rem;
    font-size: 1.4rem;
    font-style: italic;
    color: var(--par-color-text-muted, #6b6b6b);
  }

  .sidebar-footer {
    flex-shrink: 0;
    padding: 12px 16px;
  }

  .sidebar-footer__divider {
    height: 0;
    border-top: 0.5px solid var(--par-color-border, #e8e2d4);
    margin: 0.75rem 0;
  }

  .sidebar-data-options__toggle {
    margin: 0 -16px;
    padding: 12px 16px;
    width: calc(100% + 32px);
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
    font-size: 1.4rem;
    color: var(--color-action-rest, #365A85);
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease;

    &:hover {
      background-color: rgba(243, 235, 218, 0.4);
      color: var(--color-action-hover, #2A4D70);
    }

    &:focus-visible {
      outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
      outline-offset: -2px;
    }
  }

  .sidebar-data-options__icon {
    flex-shrink: 0;
    width: 14px;
    height: 14px;
    color: currentColor;
    transition: transform 0.2s ease;

    &.is-expanded {
      transform: rotate(30deg);
    }
  }

  .sidebar-data-options__panel {
    margin-top: 0.5rem;
    padding: 0.75rem 1rem;
    background: var(--par-color-callout-bg, #f3ebda);
    border-radius: 8px;
  }

  .sidebar-data-options__description {
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
    font-size: 1.2rem;
    font-style: italic;
    color: var(--par-color-text-secondary, #555);
    line-height: 1.5;
    margin: 0 0 0.75rem;
  }

  .sidebar-data-options__action {
    width: 100%;
    padding: 7px 12px;
    background: transparent;
    color: var(--color-action-secondary-rest, #5A7A9A);
    border: 0.5px solid var(--color-action-secondary-rest, #5A7A9A);
    border-radius: 6px;
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
    font-size: 1.2rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    margin-bottom: 0.4rem;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      background-color: var(--color-action-secondary-hover-bg, rgba(90, 122, 154, 0.08));
      color: var(--color-action-rest, #365A85);
      border-color: var(--color-action-rest, #365A85);
    }

    &:focus-visible {
      outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
      outline-offset: 2px;
    }
  }

  .sidebar-data-options__action--danger {
    color: var(--par-color-title, #7a1f1f);

    &:hover {
      background-color: rgba(122, 31, 31, 0.05);
      color: var(--par-color-title, #7a1f1f);
      border-color: var(--par-color-title, #7a1f1f);
    }
  }
}

/* ── Delete-all confirmation modal ──────────────────────────────────────── */
.delete-all-modal__body {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  line-height: 1.6;
  color: var(--par-color-text, #222);
  margin: 0 0 0.75rem;
}

.delete-all-modal__suggestion {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.4rem;
  line-height: 1.6;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  margin: 0;
}

.delete-all-modal__confirm {
  padding: 8px 18px;
  background-color: var(--par-color-title, #7a1f1f);
  color: var(--par-color-surface, #FBF7F0);
  border: none;
  border-radius: 6px;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: var(--par-color-title-deep, #58180d);
  }

  &:focus-visible {
    outline: 2px solid var(--par-color-title, #7a1f1f);
    outline-offset: 2px;
  }
}
</style>
