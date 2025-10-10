<template>
  <div>
    <h2>Lore Builder for {{ item.name }}</h2>
    <p>Build a rich history for this magic item by generating timeline events. Each generation creates 3 new event
      options to choose from.</p>

    <!-- Timeline Events Filmstrip - Moved to top -->
    <div v-if="timelineEvents.length > 0" class="timeline-section">
      <div class="timeline-header">
        <h2>Historic Timeline of {{ item.name }}</h2>
        <span class="event-count-badge">
          {{ timelineEvents.length }} {{ timelineEvents.length === 1 ? 'Event' : 'Events' }}
        </span>
      </div>
      <cdr-grid class="filmstrip">
        <cdr-card class="filmstrip-item" v-for="(event, index) in sortedTimelineEvents" :key="index">
          <h3>{{ event.title }}</h3>
          <h4>{{ event.eventYear }}</h4>
          <cdr-text class="body-text">{{ event.details }}</cdr-text>
          <cdr-button @click="removeEventFromTimeline(index)" modifier="secondary" :full-width="true"
            class="remove-button">
            Remove From Timeline
          </cdr-button>
        </cdr-card>
      </cdr-grid>

      <!-- Summary Section -->
      <div v-if="!loadingSummary && !timelineSummary">
        <cdr-button @click="generateTimelineSummary" style="margin: 2rem auto; display: block;">
          Generate Summary of Timeline
        </cdr-button>
      </div>

      <div v-if="loadingSummary">
        <CdrSkeleton>
          <h2>Historic Summary of {{ item.name }}</h2>
          <CdrSkeletonBone type="line" style="width:100%" />
          <CdrSkeletonBone type="line" style="width:95%" />
          <CdrSkeletonBone type="line" style="width:90%" />
          <CdrSkeletonBone type="line" style="width:97%" />
          <CdrSkeletonBone type="line" style="width:85%" />
          <CdrSkeletonBone type="line" style="width:60%" />
          <h3>Current State of {{ item.name }}</h3>
          <CdrSkeletonBone type="line" style="width:100%" />
          <CdrSkeletonBone type="line" style="width:95%" />
          <CdrSkeletonBone type="line" style="width:90%" />
        </CdrSkeleton>
      </div>

      <div v-if="!loadingSummary && timelineSummary">
        <h2>Historic Summary of {{ item.name }}</h2>
        <cdr-text class="body-text">{{ timelineSummary }}</cdr-text>
        <h3 v-if="currentState">Current State of {{ item.name }}</h3>
        <cdr-text class="body-text">{{ currentState }}</cdr-text>

        <div class="button-group">
          <cdr-button @click="generateTimelineSummary" modifier="secondary" style="margin: 2rem auto;">
            Re-Generate Summary
          </cdr-button>
          <cdr-button @click="applyLoreToItem" modifier="dark" style="margin: 2rem auto;">
            Apply Lore to Item
          </cdr-button>
        </div>
      </div>
    </div>

    <div class="top-container">
      <!-- Event Generation Form -->
      <div class="lore-form">
        <div class="form-header">
          <h3>{{ potentialEvents.length > 0 ? 'Generate More Events' : 'Event Generation Form' }}</h3>
          <p class="helper-text" v-if="potentialEvents.length > 0">
            Each generation adds 3 new event options without erasing previous ones.
          </p>
        </div>

        <cdr-select v-model="eventType" label="Type of Event" prompt="Choose an event type" :options="eventOptions" />

        <div class="year-inputs">
          <cdr-input v-model="currentYear" label="Current Year in Your Campaign" background="secondary"
            :error="yearError" @blur="validateYear" class="year-input">
            <template #helper-text-bottom>
              e.g., "1492 D.R." or "Year 745"
            </template>
            <template #error>
              {{ yearErrorMessage }}
            </template>
          </cdr-input>

          <cdr-input v-model="yearsAgo" label="How Many Years Ago Did This Happen?" type="number" background="secondary"
            class="year-input">
            <template #helper-text-bottom>
              e.g., 100 (for an event 100 years in the past)
            </template>
          </cdr-input>
        </div>

        <div class="calculated-year" v-if="calculatedEventYear">
          <strong>Event will occur in:</strong> {{ calculatedEventYear }}
        </div>

        <cdr-button @click="generateLoreEvents" :full-width="true" modifier="dark"
          :disabled="!currentYear || !yearsAgo || loadingEvents" style="margin-top: 2rem;">
          {{ loadingEvents ? 'Generating...' : potentialEvents.length > 0 ? 'Generate 3 More Events' :
            'Generate 3 Events' }}
        </cdr-button>
      </div>

      <!-- Potential Events Accordion -->
      <div class="accordion-container">
        <div class="accordion-header">
          <h3>Potential Events</h3>
          <span v-if="potentialEvents.length > 0" class="event-count-badge">
            {{ potentialEvents.length }} Available
          </span>
        </div>

        <cdr-accordion-group v-if="potentialEvents.length === 0 && !loadingEvents">
          <cdr-accordion v-for="n in 3" :key="n" level="3" :id="`accordion-${n}`" :opened="false">
            <template #label>
              Potential Timeline Event #{{ n }}
            </template>
            <cdr-text tag="p">
              Please use the form to the left to generate potential timeline events.
            </cdr-text>
          </cdr-accordion>
        </cdr-accordion-group>

        <cdr-accordion-group v-if="loadingEvents">
          <cdr-accordion v-for="n in 3" :key="'loading-' + n" level="3" :id="'loading-event-' + n" :opened="false">
            <template #label>
              <CdrSkeleton>
                <CdrSkeletonBone type="line" style="width:300px" />
              </CdrSkeleton>
            </template>
            <cdr-text tag="p">
              Generating events...
            </cdr-text>
          </cdr-accordion>
        </cdr-accordion-group>

        <cdr-accordion-group v-if="potentialEvents.length > 0 && !loadingEvents">
          <cdr-accordion v-for="(event, index) in potentialEvents" :key="index" :id="'event-' + index" level="3"
            :opened="event.open" @accordion-toggle="toggleEventOpen(index)">
            <template #label>
              {{ event.title }}
            </template>
            <cdr-text class="body-text">{{ event.details }}</cdr-text>
            <cdr-button @click="addEventToTimeline(index)" modifier="secondary" :full-width="true"
              style="margin-top: 1rem;">
              Add Event to Timeline
            </cdr-button>
          </cdr-accordion>
        </cdr-accordion-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  CdrSelect,
  CdrButton,
  CdrInput,
  CdrAccordionGroup,
  CdrAccordion,
  CdrSkeleton,
  CdrSkeletonBone,
  CdrText,
  CdrGrid,
  CdrCard
} from '@rei/cedar';
import { generateGptResponse } from '../../util/open-ai.mjs';

const props = defineProps({
  item: { type: Object, required: true },
  premium: { type: Boolean, default: false }
});

const emit = defineEmits(['updated-item']);

const eventType = ref('');
const currentYear = ref('');
const yearsAgo = ref(null);
const yearError = ref(false);
const yearErrorMessage = ref('');
const loadingEvents = ref(false);
const loadingSummary = ref(false);
const potentialEvents = ref([]);
const timelineEvents = ref([]);
const timelineSummary = ref('');
const currentState = ref('');

// Optional extras (not yet rendered by your template)
const timelineRumors = ref([]);
const timelineConsequences = ref([]);
const timelineSeeds = ref([]);
const timelineMotifs = ref([]);

const eventOptions = [
  "Origin/Creation",
  "Transformative Event (Corrupting)",
  "Transformative Event (Purifying)",
  "Transformative Event (Empowering)",
  "Discovery/Rediscovery",
  "Theft/Loss",
  "Ownership Transfer",
  "Battle/Conflict",
  "Imprisonment/Binding",
  "Liberation/Unbinding",
  "Modification/Reforging",
  "Destruction Attempt",
  "Legacy/Inheritance",
  "Curse/Blessing",
  "Association with Hero/Villain",
  "Hidden/Forgotten Period"
];

const typeToTag = {
  "Origin/Creation": "origin",
  "Transformative Event (Corrupting)": "corruption",
  "Transformative Event (Purifying)": "purification",
  "Transformative Event (Empowering)": "empowerment",
  "Discovery/Rediscovery": "discovery",
  "Theft/Loss": "theft",
  "Ownership Transfer": "transfer",
  "Battle/Conflict": "battle",
  "Imprisonment/Binding": "binding",
  "Liberation/Unbinding": "unbinding",
  "Modification/Reforging": "reforging",
  "Destruction Attempt": "destruction_attempt",
  "Legacy/Inheritance": "legacy",
  "Curse/Blessing": "curse", // if you want “blessing” split, special-case below
  "Association with Hero/Villain": "hero_link", // or "villain_link" – model will follow the exact string we set
  "Hidden/Forgotten Period": "hidden"
};

const sortedTimelineEvents = computed(() => {
  return [...timelineEvents.value].sort((a, b) => b.yearsAgo - a.yearsAgo);
});

const calculatedEventYear = computed(() => {
  if (!currentYear.value || !yearsAgo.value) return '';
  return getEventYearString();
});

const validateYear = () => {
  const matches = currentYear.value.match(/\d+/g);
  if (matches && matches.length === 1) {
    yearError.value = false;
    yearErrorMessage.value = '';
    return true;
  }
  yearError.value = true;
  yearErrorMessage.value = 'Must contain exactly one number';
  return false;
};

const getEventYearString = () => {
  const matches = currentYear.value.match(/\d+/g);
  if (matches && matches.length === 1) {
    const currentYearNumber = parseInt(matches[0], 10);
    const yearReckoning = currentYear.value.replace(/\d+/, 'THE_YEAR');
    const eventYear = (currentYearNumber - (yearsAgo.value ?? 0)).toString();
    return yearReckoning.replace('THE_YEAR', eventYear);
  }
  return '';
};

const toggleEventOpen = (index) => {
  potentialEvents.value[index].open = !potentialEvents.value[index].open;
};

// ---------- VALIDATION that enforces the selected type/tag ----------
const makeEventsValidator = (expectedTag) => (jsonString) => {
  try {
    const obj = JSON.parse(jsonString);
    if (!obj || !Array.isArray(obj.events) || obj.events.length !== 3) return false;
    // All events must have the required fields and the SAME expected tag.
    return obj.events.every(ev =>
      typeof ev.event_title === 'string' &&
      typeof ev.description === 'string' &&
      typeof ev.gm_hook === 'string' &&
      typeof ev.tag === 'string' &&
      ev.tag === expectedTag && // ← enforce selected type
      typeof ev.tone === 'string' &&
      typeof ev.who === 'string' &&
      typeof ev.where === 'string' &&
      typeof ev.object === 'string' &&
      typeof ev.evidence_still_findable === 'string' &&
      typeof ev.metric === 'string' &&
      typeof ev.immediate_fallout === 'string' &&
      typeof ev.lasting_mark === 'string'
    );
  } catch {
    return false;
  }
};

// Utilities to enforce concision
const clamp = (str = '', max = 360) => {
  const s = String(str).replace(/\s+/g, ' ').trim();
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
};
const hardTrim = (str = '', maxWords = 85) => {
  const words = String(str).trim().split(/\s+/);
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '…' : str;
};

const generateLoreEvents = async () => {
  if (!validateYear()) return;
  if (!props.premium) {
    alert('Lore generation is only available to $5 patrons. Please consider becoming a Patron to access the premium lore builder.');
    return;
  }

  loadingEvents.value = true;
  const eventYearString = getEventYearString();
  const existingLore = timelineSummary.value || props.item.lore || '';

  // Map UI selection to prompt focus + canonical tag
  let eventSpecificPrompt = '';
  switch (eventType.value) {
    case "Origin/Creation": eventSpecificPrompt = `the creation or origin story of ${props.item.name}`; break;
    case "Transformative Event (Corrupting)": eventSpecificPrompt = `a corrupting or dark transformation in the history of ${props.item.name}`; break;
    case "Transformative Event (Purifying)": eventSpecificPrompt = `a purifying or redemptive transformation in the history of ${props.item.name}`; break;
    case "Transformative Event (Empowering)": eventSpecificPrompt = `an empowering transformation that increased the power of ${props.item.name}`; break;
    case "Discovery/Rediscovery": eventSpecificPrompt = `when ${props.item.name} was discovered or rediscovered`; break;
    case "Theft/Loss": eventSpecificPrompt = `when ${props.item.name} was stolen or lost`; break;
    case "Ownership Transfer": eventSpecificPrompt = `when ${props.item.name} changed hands between significant owners`; break;
    case "Battle/Conflict": eventSpecificPrompt = `a major battle or conflict involving ${props.item.name}`; break;
    case "Imprisonment/Binding": eventSpecificPrompt = `when ${props.item.name} was imprisoned, sealed, or bound`; break;
    case "Liberation/Unbinding": eventSpecificPrompt = `when ${props.item.name} was liberated or unbound from imprisonment`; break;
    case "Modification/Reforging": eventSpecificPrompt = `when ${props.item.name} was modified, reforged, or altered`; break;
    case "Destruction Attempt": eventSpecificPrompt = `an attempt to destroy ${props.item.name}`; break;
    case "Legacy/Inheritance": eventSpecificPrompt = `when ${props.item.name} was passed down as a legacy or inheritance`; break;
    case "Curse/Blessing": eventSpecificPrompt = `when ${props.item.name} received a curse or blessing`; break;
    case "Association with Hero/Villain": eventSpecificPrompt = `when ${props.item.name} became associated with a famous hero or villain`; break;
    case "Hidden/Forgotten Period": eventSpecificPrompt = `a period when ${props.item.name} was hidden or forgotten`; break;
    default: eventSpecificPrompt = `event involving ${props.item.name}`;
  }

  // Canonical tag to enforce
  let expectedTag = typeToTag[eventType.value] || 'hidden';
  // Special-case split types if you want: choose one side deterministically
  if (eventType.value === "Curse/Blessing") expectedTag = "curse";
  if (eventType.value === "Association with Hero/Villain") expectedTag = "hero_link";

  const prompt = `Generate exactly 3 alternative historic EVENTS for a D&D magic item called ${props.item.name}.

Item Type: ${props.item.item_type}
Rarity: ${props.item.rarity}
${existingLore ? `Existing Lore (do not retcon): ${existingLore}` : ''}

Focus: ${eventSpecificPrompt} that happened in ${eventYearString}.
All 3 events occur in the SAME year and MUST be the same type.

STRICT TYPE ENFORCEMENT:
- For ALL THREE events, set "tag" to this exact value: "${expectedTag}".
- Also include "type_note" (6–12 words) briefly stating how the event expresses that type.

CONCRETENESS RULES (must satisfy ALL):
- WHO: one concrete actor or group (max 1 proper noun).
- WHERE: a specific site/room/landmark (not just a city/kingdom).
- WHAT: a tangible object interacted with (tool, map, lock, blood vial, ledger, rope, etc.).
- EVIDENCE_STILL_FINDABLE: a clue that could plausibly remain now (scar, missing page, stained flagstone, ledger entry, altered rune).
- METRIC: one number OR precise time marker then (“second bell”, “seven seals”, “twelve steps”).
- IMMEDIATE_FALLOUT: what happened within days back then.
- LASTING_MARK: what endures now that points to this event.

STYLE:
- Active, plain, gameable. No purple prose.
- 2–3 sentences in description. End on a live thread.
- Avoid proper-noun soup: max 1 new name per event.

HARD LIMITS:
- event_title: 3–6 words
- description: 35–65 words
- gm_hook: ≤ 20 words, imperative
- tag: MUST be "${expectedTag}"
- tone: one of ["mythic","grim","whimsical","tavern_rumor","scholarly_margin"]

OUTPUT JSON EXACTLY:
{
  "events": [
    {
      "event_title": "...",
      "description": "...",
      "gm_hook": "...",
      "tag": "${expectedTag}",
      "tone": "grim",
      "who": "named actor or group",
      "where": "specific site/room/landmark",
      "object": "tangible item involved",
      "evidence_still_findable": "clue that plausibly remains",
      "metric": "a concrete number or time marker",
      "immediate_fallout": "what happened within days back then",
      "lasting_mark": "what endures now that points to this event",
      "type_note": "6–12 words explaining alignment to ${expectedTag}"
    },
    { ... },
    { ... }
  ]
}`;

  try {
    const validator = makeEventsValidator(expectedTag);
    const response = await generateGptResponse(prompt, validator, 3);
    const eventData = JSON.parse(response);

    const suggestedEvents = eventData.events.map((event) => ({
      title: clamp(event.event_title, 64),
      eventYear: eventYearString,
      yearsAgo: yearsAgo.value,
      details: clamp(hardTrim(event.description, 85), 380),
      gm_hook: clamp(event.gm_hook || '', 120),
      tag: event.tag || null,
      tone: event.tone || null,
      who: clamp(event.who || '', 80),
      where: clamp(event.where || '', 80),
      object: clamp(event.object || '', 80),
      evidence: clamp(event.evidence_still_findable || '', 140),
      metric: clamp(event.metric || '', 60),
      immediate_fallout: clamp(event.immediate_fallout || '', 140),
      lasting_mark: clamp(event.lasting_mark || '', 160),
      type_note: clamp(event.type_note || '', 80),
      open: false
    }));

    potentialEvents.value = [...potentialEvents.value, ...suggestedEvents];
  } catch (error) {
    console.error('Error generating lore events:', error);
    alert('Failed to generate lore events. Please try again.');
  } finally {
    loadingEvents.value = false;
  }
};

const addEventToTimeline = (index) => {
  const event = potentialEvents.value[index];
  timelineEvents.value.push({ ...event });
  potentialEvents.value.splice(index, 1);
};

const removeEventFromTimeline = (index) => {
  const actualEvent = sortedTimelineEvents.value[index];
  const originalIndex = timelineEvents.value.findIndex(e =>
    e.title === actualEvent.title && e.eventYear === actualEvent.eventYear
  );
  if (originalIndex !== -1) {
    timelineEvents.value.splice(originalIndex, 1);
  }
};

const summaryObjectValidation = (jsonString) => {
  try {
    const jsonObj = JSON.parse(jsonString);
    return jsonObj.timeline_summary && jsonObj.current_state;
  } catch {
    return false;
  }
};

const generateTimelineSummary = async () => {
  if (!props.premium) {
    alert('Lore summary generation is only available to $5 patrons.');
    return;
  }

  loadingSummary.value = true;

  const eventsList = sortedTimelineEvents.value
    .map((event, i) =>
      `${i + 1}. In ${event.eventYear}, ${event.title} occurred.
WHO: ${event.who || '—'}
WHERE: ${event.where || '—'}
OBJECT: ${event.object || '—'}
EVIDENCE: ${event.evidence || '—'}
IMMEDIATE_FALLOUT: ${event.immediate_fallout || '—'}
LASTING_MARK: ${event.lasting_mark || '—'}
DETAILS: ${event.details}`
    )
    .join('\n\n');

  const prompt = `Create a compact, game-ready lore package for ${props.item.name} from the TIMELINE below.

Item Type: ${props.item.item_type}
Rarity: ${props.item.rarity}
Features: ${Object.entries(props.item.features || {}).map(([k, v]) => `${k}: ${v}`).join('; ')}

TIMELINE (oldest→newest, do not contradict):
${eventsList}

STYLE:
- Plain, concrete, table-usable. No purple prose.
- Recur 1–2 motifs (e.g., "salt on metal", "blue moths").
- Leave live threads.

STRUCTURE + LIMITS:
- timeline_summary: 60–90 words, ≤ 3 sentences.
- current_state: 3 bullets, ≤ 18 words each, player-facing pressures around the item.
- rumors: 3 bullets labeled RUMOR, RUMOR, TRUTH (hard to verify), 15–25 words each.
- consequences: 3 "If the party … then …" lines, ≤ 20 words each.
- seeds: 3 adventure seeds, ≤ 18 words each, imperative.
- motifs: 3–6 short tokens.

OUTPUT JSON EXACTLY:
{
  "timeline_summary": "…",
  "current_state": ["…","…","…"],
  "rumors": ["RUMOR: …","RUMOR: …","TRUTH: …"],
  "consequences": ["If … then …","If … then …","If … then …"],
  "seeds": ["…","…","…"],
  "motifs": ["…","…","…"]
}`;

  try {
    const response = await generateGptResponse(prompt, summaryObjectValidation, 3);
    const summaryData = JSON.parse(response);
    timelineSummary.value = (summaryData.timeline_summary || '').trim();
    currentState.value = Array.isArray(summaryData.current_state)
      ? summaryData.current_state.join('\n')
      : String(summaryData.current_state || '');

    timelineRumors.value = Array.isArray(summaryData.rumors) ? summaryData.rumors : [];
    timelineConsequences.value = Array.isArray(summaryData.consequences) ? summaryData.consequences : [];
    timelineSeeds.value = Array.isArray(summaryData.seeds) ? summaryData.seeds : [];
    timelineMotifs.value = Array.isArray(summaryData.motifs) ? summaryData.motifs : [];
  } catch (error) {
    console.error('Error generating summary:', error);
    alert('Failed to generate summary. Please try again.');
  } finally {
    loadingSummary.value = false;
  }
};

const applyLoreToItem = () => {
  const fullLore = timelineSummary.value + (currentState.value ? '\n\n' + currentState.value : '');
  const updatedItem = { ...props.item, lore: fullLore };
  emit('updated-item', updatedItem);
  alert('Lore has been applied to the item!');
};
</script>


<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';

.timeline-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid $cdr-color-border-primary;
}

.timeline-header,
.accordion-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  h2,
  h3 {
    margin: 0;
  }
}

.event-count-badge {
  background-color: #007BFF;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
}

.top-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  grid-gap: 2rem;
  border-radius: 8px;
  margin: 2rem 0;
}

.lore-form {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;

  .form-header {
    margin-bottom: 1rem;

    h3 {
      margin: 0 0 0.5rem 0;
    }

    .helper-text {
      margin: 0;
      font-size: 0.875rem;
      color: $cdr-color-text-secondary;
      font-style: italic;
    }
  }
}

.year-inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.calculated-year {
  padding: 1rem;
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
  border-radius: 4px;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.accordion-container {
  background-color: #F6F4F0;
  padding: 2rem;
  border-left: 2px solid #F2F0E8;
}

.filmstrip {
  grid-template-columns: repeat(auto-fill, 38rem);
  grid-auto-columns: 38rem;
  grid-gap: 2rem;
  grid-auto-flow: column;
  overflow-x: scroll;
  padding: 1rem .5rem;
  margin: 2rem 0;
}

.filmstrip-item {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  min-height: 300px;

  h3 {
    margin-top: 0;
  }

  h4 {
    font-style: italic;
    color: $cdr-color-text-secondary;
    margin: 0.5rem 0 1rem;
  }

  .body-text {
    flex: 1;
    margin-bottom: 1rem;
  }

  .remove-button {
    margin-top: auto;
  }
}

.body-text {
  margin: 1rem 0;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media screen and (max-width: 855px) {
  .top-container {
    grid-template-columns: 1fr;
  }
}
</style>