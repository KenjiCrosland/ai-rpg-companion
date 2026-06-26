<template>
  <div class="app-container book-generator parchment">
    <ToolNavigation />

    <div class="book-form-card paper-grain">
      <div class="book-heading">
        <span class="book-heading__tag">Kenji's Bookshelf Generator</span>
        <h1 class="book-heading__title">Stock a shelf for your players</h1>
        <p class="book-heading__tagline">
          Seven eclectic books for any setting — each with an author, an excerpt, and a hidden secret.
        </p>
      </div>

      <form class="title-form" @submit.prevent="generateBookTitles">
        <ParField label="RPG setting">
          <ParInput id="setting" v-model="setting" placeholder="e.g., a high-magic kingdom, a neon megacity" />
          <template #hint>Examples: "a rain-soaked harbor city", "a steam-and-clockwork empire".</template>
        </ParField>
        <ParField label="Specific location">
          <ParInput id="location" v-model="location" placeholder="e.g., the study of an eccentric wizard" />
          <template #hint>Examples: "the study of an eccentric wizard" or "the waiting room of a back-alley cyber-clinic".</template>
        </ParField>
        <ParField label="Genres to include" :optional="true">
          <ParInput id="genre" v-model="genre" placeholder="e.g., cookbooks, birdwatching" />
          <template #hint>Separate multiple genres with a comma.</template>
        </ParField>
        <ParButton class="generate-button" type="submit" :full-width="true"
          :disabled="!setting || !location || loadingTitles">
          {{ loadingTitles ? 'Generating…' : 'Generate book titles' }}
        </ParButton>
      </form>

      <ParAccordionGroup v-if="loadingTitles" class="book-accordions">
      <ParAccordion v-for="n in 7" :key="n" :level="3" variant="burgundy" :id="`loading-${n}`">
        <template #label>
          <CdrSkeleton>
            <CdrSkeletonBone class="accordion-bone" type="line" />
          </CdrSkeleton>
        </template>
      </ParAccordion>
    </ParAccordionGroup>

    <ParAccordionGroup v-if="bookTitles" class="book-accordions">
      <ParAccordion v-for="(title, index) in bookTitles" :key="title" :id="`book-${index}`" :level="3"
        variant="burgundy" :label="title" :opened="!!openedAccordions[index]"
        @accordion-toggle="toggleAccordion(index)">
        <form @submit.prevent="generateBookDescription(title, index)">
          <ParButton class="generate-button" variant="primary-outline" :disabled="loadingDescriptions[index]"
            :full-width="true" type="submit">
            {{ bookDescriptions[index] ? 'Re-generate full description' : 'Generate full description' }}
          </ParButton>
        </form>

        <div v-if="bookDescriptions[index] && !loadingDescriptions[index]" class="book-detail">
          <h2 class="book-detail__title">{{ bookDescriptions[index].book_title }}</h2>

          <p class="book-detail__label">Author</p>
          <p class="book-detail__body">{{ bookDescriptions[index].author_name }}</p>

          <p class="book-detail__label">Author's background</p>
          <p class="book-detail__body">{{ bookDescriptions[index].author_background }}</p>

          <p class="book-detail__label">Physical description</p>
          <p class="book-detail__body">{{ bookDescriptions[index].book_physical_description }}</p>

          <p class="book-detail__label">Summary</p>
          <p class="book-detail__body">{{ bookDescriptions[index].summary }}</p>

          <ParReadAloud label="Excerpt" :text="bookDescriptions[index].excerpt" />

          <p class="book-detail__label">Secret</p>
          <p class="book-detail__check">
            Requires a {{ bookDescriptions[index].secret_check_difficulty }}
            {{ bookDescriptions[index].secret_check_needed }}
          </p>
          <p class="book-detail__body">{{ bookDescriptions[index].secret_description }}</p>
          <p class="book-detail__body">{{ bookDescriptions[index].secret_found }}</p>
        </div>

        <div v-if="loadingDescriptions[index]">
          <BookSkeleton />
        </div>
      </ParAccordion>
      </ParAccordionGroup>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue';
import BookSkeleton from './BookSkeleton.vue';
import ToolNavigation from '@/components/ToolNavigation.vue';
import { CdrSkeleton, CdrSkeletonBone } from "@rei/cedar";
import { ParButton, ParField, ParInput, ParAccordion, ParAccordionGroup, ParReadAloud } from "@/parchment";
import { logger } from "@/util/logger.mjs";
import "@rei/cedar/dist/cdr-fonts.css";
import "@rei/cedar/dist/reset.css";
import "@rei/cedar/dist/style/cdr-skeleton.css";
import "@rei/cedar/dist/style/cdr-skeleton-bone.css";
import { generateGptResponse } from "@/util/ai-client.mjs";

export default {
  components: {
    BookSkeleton,
    ToolNavigation,
    ParButton,
    ParField,
    ParInput,
    ParAccordion,
    ParAccordionGroup,
    ParReadAloud,
    CdrSkeleton,
    CdrSkeletonBone
  },
  setup() {
    const setting = ref('');
    const location = ref('');
    const genre = ref('');
    const openedAccordions = ref([]);
    const bookDescriptions = ref([]);
    const bookTitles = ref(null);
    const loadingTitles = ref(false);
    const loadingDescriptions = ref([]);

    function toggleAccordion(index) {
      openedAccordions.value[index] = !openedAccordions.value[index];
    }

    const generateBookTitles = async () => {
      bookTitles.value = null;
      bookDescriptions.value = [];
      openedAccordions.value = [];
      let genrePrompt = '';
      if (genre.value) {
        genrePrompt = `but also include 1-2 books focused on ${genre.value}`;
      }
      const prompt = `Generate an eclectic list of 7 book titles. The books are located in a ${location.value} in the ${setting.value} setting but be sure to include an eclectic mix of books. Make sure that the books reflect various interests and genres (including fiction, non-fiction and reference books)${genrePrompt}. Only provide the title and do not number the results.`;

      try {
        loadingTitles.value = true;

        const response = await generateGptResponse(prompt);
        logger.log(response);
        bookTitles.value = response.split('\n').map(t => t.trim()).filter(Boolean);
        loadingTitles.value = false;
      } catch (error) {
        logger.error("Error generating book titles:", error);
      }
    };

    function validateBookJSON(jsonString) {
      try {
        const jsonObj = JSON.parse(jsonString);
        const keys = [
          'book_title',
          'author_name',
          'author_background',
          'book_physical_description',
          'summary',
          "excerpt",
          "secret_description",
          "secret_check_difficulty",
          "secret_check_needed",
          "secret_found"
        ];
        return keys.every((key) => key in jsonObj);
      } catch (error) {
        return false;
      }
    }

    const generateBookDescription = async (title, index) => {
      bookDescriptions.value[index] = null;
      const prompt = `Generate a description for a book with the title "${title}". This book was found in a "${location.value}" in the "${setting.value}" setting. Please provide the information in the following JSON format: 
      {
        "book_title": "<Book's Title>"
        "author_name": "<Author's name>",
        "author_background": "<Background of the author>",
        "book_physical_description": "<Description of the book's physical appearance>",
        "summary": "<A summary of the book in no more than 3 sentences>",
        "excerpt": "<An excerpt from the book ranging from 2 to 7 sentences>",
        "secret_description": "<Description of the secret>",
        "secret_check_difficulty": "<Difficulty level of the secret check - 'Easy', 'Average', 'Hard', 'Very Hard'>",
        "secret_check_needed": "<Description of the general type of check needed to discover the secret>",
        "secret_found": "<Description of how the secret appears in the book and how it can be found by the reader>"
        }
      }.`;
      try {
        loadingDescriptions.value[index] = true;
        const response = await generateGptResponse(prompt, validateBookJSON);
        logger.log(response);
        bookDescriptions.value[index] = JSON.parse(response);
        loadingDescriptions.value[index] = false;
      } catch (error) {
        logger.error("Error generating book titles:", error);
      }
    }

    return {
      setting,
      location,
      genre,
      openedAccordions,
      bookDescriptions,
      bookTitles,
      loadingTitles,
      loadingDescriptions,
      toggleAccordion,
      generateBookTitles,
      validateBookJSON,
      generateBookDescription
    };
  }
};
</script>

<style scoped lang="scss">
.app-container {
  max-width: 800px;
  margin: 3rem auto;
  padding: 2px 30px 30px 30px;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
}

/* ── Editorial heading ─────────────────────────────────────────────────── */
.book-heading {
  text-align: center;
  margin-bottom: 1.75rem;
}

.book-heading__tag {
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--color-action-secondary-rest, #5A7A9A);
  letter-spacing: 0.04em;
}

.book-heading__title {
  font-size: 3rem;
  font-weight: 600;
  color: var(--color-action-hover, #2A4D70);
  margin: 0.4rem 0 0.5rem;
  line-height: 1.15;
}

.book-heading__tagline {
  font-size: 1.5rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  margin: 0;
  line-height: 1.5;
}

/* ── Form card ─────────────────────────────────────────────────────────── */
.book-form-card {
  background-color: var(--par-color-surface-card, #FEFBF4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  padding: 2.25rem 2.5rem 2rem;
}

.title-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.book-accordions {
  margin-top: 1.5rem;
}

.book-accordions .generate-button {
  margin-bottom: 1rem;
}

@media screen and (max-width: 500px) {
  .accordion-bone {
    width: 300px;
  }
}

@media screen and (min-width: 500px) {
  .accordion-bone {
    width: 500px;
  }
}

/* ── Book detail (inside an expanded accordion) ────────────────────────── */
.book-detail__title {
  margin: 0.5rem 0 1rem;
  font-size: 2.2rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  line-height: 1.2;
}

.book-detail__label {
  margin: 1.5rem 0 0.4rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.book-detail__check {
  margin: 0 0 0.6rem;
  max-width: 62rem;
  font-size: 1.4rem;
  font-style: italic;
  line-height: 1.5;
  color: var(--par-color-text-secondary, #555);
}

.book-detail__body {
  margin: 0;
  max-width: 62rem;
  font-size: 1.55rem;
  line-height: 1.7;
  color: var(--par-color-text, #222);
}
</style>