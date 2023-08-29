<template>
  <div class="app-container">

    <div class="top-container">
      <form class="subject-form" @submit.prevent="generateTimelineEvents">
        <h1>RPG Timeline Generator</h1>
        <cdr-input class="subject-form-input" id="subject" v-model="subject" background="secondary"
          label="Name of Person, Place or Thing:" required>
          <template #helper-text-bottom>
            Examples: "The Ivory City", "The Autumn Moonblade", "The Dragon Asverathmasil"
          </template>
        </cdr-input>
        <cdr-input v-model="itemDetails" :optional="true" label="A summary of the current lore" :rows="4" />
        <cdr-select v-model="eventType" label="Type of Event" prompt="Choose an event type" :options="eventOptions" />
        <cdr-input class="subject-form-input" id="years-ago" v-model="currentYear" background="secondary"
          label="Current Year (Must Contain Only 1 Number):" :error="yearError" aria-describedby="errorMessage"
          @blur="validateYear" required>
          <template #helper-text-bottom>
            Examples: "1492 C.E.", "1213 D.R.", "Year 745 Since the Great
            Calamity"
          </template>
          <template #error>
            <span id="errorMessage">{{ yearErrorMessage }}</span>
          </template>
        </cdr-input>

        <cdr-input class="subject-form-input" id="years-ago" v-model="yearsAgo" background="secondary"
          label="Number of Years Ago:" type="number" required>
        </cdr-input>
        <cdr-button class="generate-button" type="submit" :disabled="!subject || !yearsAgo || loadingEvents">Generate
          Timeline Events</cdr-button>
      </form>
      <div class="accordion-container" v-if="potentialEvents.length === 0 && !loadingEvents">
        <h2>Potential Events</h2>
        <cdr-accordion-group>
          <cdr-accordion v-for="n in 3" :key="n" level="3" :id="`accordion-${n}`" :opened="eventsAccordion[n]"
            @accordion-toggle="handleAccordionToggle(n - 1)">
            <template #label>
              Potential Timeline Event #{{ n }}
            </template>
            <cdr-text tag="p">
              Please use the form to the left to generate potential timeline events.
            </cdr-text>
          </cdr-accordion>
        </cdr-accordion-group>
      </div>

      <div class="accordion-container" v-if="loadingEvents">
        <h2>Potential Events</h2>
        <cdr-accordion-group>
          <cdr-accordion v-for="n in 3" :key="n" level="3" :id="`accordion-${n}`" :opened="eventsAccordion[n]"
          @accordion-toggle="handleAccordionToggle(n - 1)">
            <template #label>
              <CdrSkeleton>
                <CdrSkeletonBone type="line" style="width:300px" />
              </CdrSkeleton>
            </template>
            <cdr-text tag="p">
              Please use the form to the left to generate potential timeline events.
            </cdr-text>
          </cdr-accordion>
        </cdr-accordion-group>
      </div>

      <div class="accordion-container" v-if="potentialEvents.length > 0">
        <h2>Potential Events</h2>
        <cdr-accordion-group>
          <cdr-accordion v-for="(event, index) in potentialEvents" :key="index" :opened="eventsAccordion[index]"
            :id="`accordion-${index}`" level="3" @accordion-toggle="handleAccordionToggle(index)">
            <template #label>
              {{ event.title }}
            </template>
            <cdr-text class="body-text">{{ event.details }}</cdr-text>
            <cdr-button class="generate-button" modifier="secondary" @click="addEventToTimeline(index)" :full-width="true"
              type="button">Add Event to Timeline</cdr-button>
          </cdr-accordion>
        </cdr-accordion-group>
      </div>
    </div>

    <cdr-button class="clear-button" modifier="secondary"  @click="clearLocalStorage" :full-width="true" type="button">Clear All Timeline Data</cdr-button>

    <div>
      <h2 v-if="timelineEvents.length > 0">Historic Timeline of {{ subject }}</h2>
      <cdr-grid class="filmstrip">
        <cdr-card class="filmstrip-item" v-for="(event, index) in timelineEvents" :key="event">
          <h2>{{ event.title }}</h2>
          <h3>{{ event.eventYear }}</h3>
          <cdr-text class="body-text">{{ event.details }}</cdr-text>
          <cdr-button class="remove-button" modifier="secondary" @click="removeEventFromTimeline(index)"
            :full-width="true" type="button">Remove From Timeline</cdr-button>
        </cdr-card>
      </cdr-grid>
      <div v-if="!loadingSummary">
        <h2 v-if="timelineSummary">Historic Summary of {{ subject }}</h2>
        <cdr-text class="body-text">{{ timelineSummary }}</cdr-text>
        <h3 v-if="currentState">Current State of {{ subject }}</h3>
        <cdr-text class="body-text">{{ currentState }}</cdr-text>
      </div>
      <div v-if="loadingSummary">
        <CdrSkeleton>
                <h2>Historic Summary of {{ subject }}</h2>
                <CdrSkeletonBone type="line" style="width:100%" />
                <CdrSkeletonBone type="line" style="width:95%" />
                <CdrSkeletonBone type="line" style="width:90%" />
                <CdrSkeletonBone type="line" style="width:97%" />
                <CdrSkeletonBone type="line" style="width:85%" />
                <CdrSkeletonBone type="line" style="width:30%" />
                <h3 v-if="currentState">Current State of {{ subject }}</h3>
                <CdrSkeletonBone type="line" style="width:100%" />
                <CdrSkeletonBone type="line" style="width:95%" />
                <CdrSkeletonBone type="line" style="width:90%" />
                <CdrSkeletonBone type="line" style="width:97%" />
                <CdrSkeletonBone type="line" style="width:85%" />
                <CdrSkeletonBone type="line" style="width:30%" />
        </CdrSkeleton>
      </div>
      <cdr-button v-if="timelineSummary" class="generate-button" @click="generateTimelineSummary()" type="button" :disabled="loadingSummary">Re-Generate Summary</cdr-button>
      <cdr-button v-if="!timelineSummary && timelineEvents.length > 0" class="generate-button" @click="generateTimelineSummary()" type="button" :disabled="loadingSummary">Generate Summary of Timeline</cdr-button>

    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import {
  CdrAccordion,
  CdrAccordionGroup,
  CdrInput,
  CdrButton,
  CdrCard,
  CdrSkeleton,
  CdrSkeletonBone,
  CdrSelect,
  CdrText,
  CdrGrid
} from "@rei/cedar";
import "@rei/cedar/dist/cdr-fonts.css";
import "@rei/cedar/dist/reset.css";
import "@rei/cedar/dist/style/cdr-accordion.css";
import "@rei/cedar/dist/style/cdr-accordion-group.css";
import "@rei/cedar/dist/style/cdr-input.css";
import "@rei/cedar/dist/style/cdr-grid.css";
import "@rei/cedar/dist/style/cdr-button.css";
import "@rei/cedar/dist/style/cdr-card.css";
import "@rei/cedar/dist/style/cdr-select.css";
import "@rei/cedar/dist/style/cdr-skeleton.css";
import "@rei/cedar/dist/style/cdr-skeleton-bone.css";
import "@rei/cedar/dist/style/cdr-text.css";
import { generateGptResponse } from "../util/open-ai.mjs";

export default {
  components: {
    CdrAccordion,
    CdrAccordionGroup,
    CdrInput,
    CdrButton,
    CdrCard,
    CdrGrid,
    CdrSelect,
    CdrSkeleton,
    CdrSkeletonBone,
    CdrText,
  },
  setup() {
    const subject = ref("");
    const yearsAgo = ref(null);
    const description = ref("");
    const eventType = ref("");
    const eventOptions = [
      "Origin Event",
      "Transformative Event (Bad)",
      "Transformative Event (Good)",
    ];
    const currentYear = ref("");
    const yearReckoning = ref("");
    const itemDetails = ref("");
    const timelineSummary = ref("");
    const currentState = ref("");
    const currentYearNumber = ref(0);
    const yearError = ref(false);
    const yearErrorMessage = ref("");
    const potentialEvents = ref([]);
    const eventsAccordion = ref([true, false, false]);
    const timelineEvents = ref([]);
    const loadingEvents = ref(false);
    const loadingSummary = ref(false);

    const saveToLocalStorage = () => {
      const appState = {
        subject: subject.value,
        itemDetails: itemDetails.value,
        timelineEvents: timelineEvents.value,
        potentialEvents: potentialEvents.value,
        timelineSummary: timelineSummary.value,
        currentState: currentState.value,
        eventType: eventType.value,
        currentYear: currentYear.value
        // ... (any other data you want to save)
      };

    localStorage.setItem("rpgTimelineState", JSON.stringify(appState));
  };

  const handleAccordionToggle = (index) => {
    console.log(index);
    for (let i = 0; i < eventsAccordion.value.length; i++) {
      eventsAccordion.value[i] = (i === index);
    }
  }

  function summaryObjectValidation(jsonString) {
      try {
        const jsonObj = JSON.parse(jsonString);
        const keys = ["timeline_summary", "current_state"];
        return keys.every((key) => key in jsonObj);
      } catch (error) {
        return false;
      }
    }

    function timelineObjectValidation(jsonString) {
      try {
        const jsonObj = JSON.parse(jsonString);
        const keys = ["events"];
        return keys.every((key) => key in jsonObj);
      } catch (error) {
        return false;
      }
    }

    const timelineEventsText = computed(() => {
      let promptString = "And here are the current timeline events: \n";
      if (timelineEvents.value.length) {
        console.log(timelineEvents);
        let eventString = timelineEvents.value.reverse()
          .map(
            (event) => `${event.title} (${event.eventYear})\n${event.details}`
          )
          .join("\n\n");
        return "\n" + promptString + eventString + "\n";
      }

      return "";
    });

const eventYearString = computed(() => {
  const matches = currentYear.value.match(/\d+/g);
  if (matches && matches.length === 1){
    currentYearNumber.value = parseInt(matches[0], 10);
    yearReckoning.value = currentYear.value.replace(/\d+/, "THE_YEAR");
    const eventYear = (currentYearNumber.value - yearsAgo.value).toString();
    return yearReckoning.value.replace("THE_YEAR", eventYear);
  }
});


    const generateTimelineEvents = async () => {
      potentialEvents.value = [];

      // Construct the prompt based on the selected eventType
      let eventSpecificPrompt = "";
      switch (eventType.value) {
        case "Origin Event":
          eventSpecificPrompt = `the origin story for ${subject.value}`;
          break;
        case "Transformative Event (Bad)":
          eventSpecificPrompt = `a negative transformative event in the history of ${subject.value}`;
          break;
        case "Transformative Event (Good)":
          eventSpecificPrompt = `a positive transformative event in the history of ${subject.value}`;
          break;
        default:
          eventSpecificPrompt = `event for ${subject.value}`;
      }


      try {
        loadingEvents.value = true;
        if (timelineEvents.value.length > 0) {
          await generateTimelineSummary();
        }
        const timelineSummaryText = timelineSummary.value ? `Previously in the timeline:\n${timelineSummary.value}\n\n${currentState.value}\n\n` : timelineEventsText.value;
        const prompt = `
          Using the background information on ${subject.value}: ${itemDetails.value} ${timelineSummaryText}, generate 3 possible events that describe the ${eventSpecificPrompt} and happened in ${eventYearString.value}. Each event should be a distinct alternative, happening in the same year, as the user will pick the best one for a historic timeline.

          Format:
          {
            "events": [
              {
                "event_title": "Title of the event",
                "description": "A detailed description of the event which is ${eventSpecificPrompt}, outlining individuals, locations and immediate impacts. Do NOT provide any resolution for the event. Only provide the event itself"
              }
            ]
          }
          Note: Provide 3 distinct events in the events array.
        `;
        console.log(prompt);
        const response = await generateGptResponse(
          prompt,
          timelineObjectValidation
        );
        const eventData = JSON.parse(response);

        console.log(eventData);
        // const eventYear = (currentYearNumber.value - yearsAgo.value).toString();
        // const eventYearString = yearReckoning.value.replace('THE_YEAR', eventYear);
        console.log("Event year string:", eventYearString.value);
        const suggestedEvents = eventData.events.map((event) => ({
          title: event.event_title,
          eventYear: eventYearString.value,
          yearsAgo: yearsAgo.value,
          details: event.description,
        }));
        potentialEvents.value = suggestedEvents;
        loadingEvents.value = false;
        saveToLocalStorage();
      } catch (error) {
        console.error("Error generating timeline events:", error);
      }
    };

    async function generateTimelineSummary() {
      let summaryIntroduction = "";

      if (itemDetails.value.trim() === "") {
        summaryIntroduction = `Here an abbreviated timeline about ${subject.value}:\n`;
      } else {
        summaryIntroduction = `Here is some background about ${subject.value}: ${itemDetails.value}. Also below is an abbreviated timeline:\n`;
      }

      const eventsList = timelineEvents.value
        .sort((a, b) => a.yearsAgo - b.yearsAgo).reverse()
        .map(
          (event, i) =>
            `${i + 1}. In the year ${event.eventYear}, ${event.title
            } happened. Here are the details: ${event.details}\n`
        )
        .join("");

      const conclusion = `Please note that the first event in the list is the oldest chronologically, and the last event on the list is the newest. Based on these events detailed above. can you provide a summary of the timeline of ${subject.value} as a JSON Object? The format is provided below:
      
      {
        timeline_summary: "This is a summary paragraph that should introduce ${subject.value} and should summarize all the timeline events related to it. Each timeline event should flow into the next to create a coherent and compelling narrative thread. When summarizing each event provide brief commentary about why the event is significant.",
        current_state: "a one paragraph summary of the current state of ${subject.value}. Provide challenges and opportunities describe plans or schemes of important individuals or parties who may attempt to change the state of ${subject.value} for better or worse."
      }`;

      const prompt = summaryIntroduction + eventsList + conclusion;
      console.log('summary promprt', prompt);
      try {
        loadingSummary.value = true;
        const summary = await generateGptResponse(prompt, summaryObjectValidation);
        loadingSummary.value = false;
        const summaryData = JSON.parse(summary);
        console.log(summaryData);
        timelineSummary.value = summaryData.timeline_summary;
        currentState.value = summaryData.current_state;
        saveToLocalStorage();
      } catch (error) {
        console.error("Error generating timeline summary:", error);
      }
    }

    const validateYear = () => {
      //TODO: This needs to be separated into two methods
      console.log("currentYear.value:", currentYear.value);
      const matches = currentYear.value.match(/\d+/g);
      if (matches && matches.length === 1) {
        yearError.value = false;
        yearErrorMessage.value = "";
        console.log(currentYearNumber.value);
        console.log(yearReckoning.value);
        return;
      }
      yearError.value = true;
      yearErrorMessage.value =
        currentYear.value + " Must contain one number and only one number";
    };

    const addEventToTimeline = (index) => {
      const event = potentialEvents.value[index];
      timelineEvents.value.push(event);
      timelineEvents.value.sort(function (a, b) {
        return a.yearsAgo - b.yearsAgo;
      }).reverse();
      saveToLocalStorage();
    };

    const removeEventFromTimeline = (index) => {
      const event = timelineEvents.value[index];
      timelineEvents.value.splice(index, 1);
      saveToLocalStorage();
    };

    const deleteEvent = (index) => {
      potentialEvents.value.splice(index, 1);
      saveToLocalStorage();
    };



  const loadFromLocalStorage = () => {
  const savedState = localStorage.getItem("rpgTimelineState");

  if(!savedState) {
    return;
  }

  if (savedState) {
    try {
      const appState = JSON.parse(savedState);
      
      subject.value = appState.subject;
      itemDetails.value = appState.itemDetails;
      timelineEvents.value = appState.timelineEvents;
      currentState.value = appState.currentState,
      timelineSummary.value = appState.timelineSummary,
      currentYear.value = appState.currentYear;
      potentialEvents.value = appState.potentialEvents;
      // ... (load other saved data as necessary)

    } catch (error) {
      console.error("Failed to load from local storage:", error);
    }
  }

};
const clearLocalStorage = () => {
  localStorage.removeItem("rpgTimelineState");
  subject.value = "";
  itemDetails.value = "";
  timelineEvents.value = [];
  timelineSummary.value = "";
  currentState.value = "";
  currentYear.value = "";
  potentialEvents.value = [];
  yearsAgo.value = null;
};
loadFromLocalStorage();

    return {
      subject,
      yearsAgo,
      description,
      eventType,
      potentialEvents,
      timelineEvents,
      loadingEvents,
      generateTimelineEvents,
      addEventToTimeline,
      removeEventFromTimeline,
      generateTimelineSummary,
      eventsAccordion,
      clearLocalStorage,
      validateYear,
      timelineSummary,
      currentState,
      itemDetails,
      yearError,
      yearErrorMessage,
      handleAccordionToggle,
      eventOptions,
      timelineEventsText,
      currentYear,
      deleteEvent,
      loadingSummary
    };
  },
};
</script>


  
<style scoped lang="scss">
.top-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #e0e0e0;
  /* A subtle border */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Horizontal offset, vertical offset, blur radius, shadow color */
  padding-left: 2rem;
  grid-gap: 2rem;
  /* Spacing inside the form */
  border-radius: 8px;
  /* Rounded corners */
  margin: 0 auto;
  /* Optional: Centering the form */
}

.accordion-container {
  //padding: 1rem;
  background-color: #F6F4F0;
  padding: 0 2rem 2rem 2rem;
  border-left: 2px solid #F2F0E8;
}

.filmstrip {
  grid-template-columns: repeat(auto-fill, 38rem);
  grid-auto-columns: 38rem;
  grid-gap: 2rem;
  grid-auto-flow: column;
  overflow: scroll;
  padding: 1rem .5rem;
}

.filmstrip-item {
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
}

.app-container {
  max-width: 940px;
  margin: 0 auto;
  padding: 20px;
}

.subject-form {
  display: flex;
  flex-direction: column;
}

.subject-form-input {
  margin-bottom: 10px;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

  article {
    display: flex;
    flex-direction: column;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    padding: 15px;
    transition: box-shadow 0.3s;
  }
}

.cdr-card:hover {
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.card-bone {
  width: 100%;
  height: 100px;
}

.body-text {
  margin-top: 10px;
  margin-bottom: 20px;
}

.generate-button {
  margin: 2rem auto;
  /* push button to bottom of card */
}

.clear-button {
  margin-top: 2rem;
}

.remove-button {
  margin-top: auto;
  margin-bottom: 2rem;
  /* push button to bottom of card */
}

@media screen and (max-width: 855px) {
 .top-container {
    grid-template-columns: 1fr;
}
}
</style>