<template>
  <div class="app-container">
    <h1>RPG Book Title Generator</h1>
    <form class="title-form" @submit.prevent="generateBookTitles">
      <cdr-input class="book-form-input" id="setting" v-model="setting" background="secondary" label="Setting:" required />
      <cdr-input class="book-form-input" id="location" v-model="location" background="secondary" label="Location:" required />
      <cdr-input class="book-form-input" id="genre" v-model="genre" background="secondary" label="Genre:" required />
      <cdr-button class="generate-button" type="submit" :disabled="!setting || !location || !genre || loadingTitles">Generate Book Titles</cdr-button>
    </form>
    <cdr-accordion-group v-if="loadingTitles">
    <cdr-accordion class="accordion" level="2" v-for="n in 7" :key="n" id="loading-location">
      <template #label>
        <CdrSkeleton>
          <CdrSkeletonBone type="line" style="width:150px" />
        </CdrSkeleton>
      </template>
    </cdr-accordion>
  </cdr-accordion-group>
    <cdr-accordion-group>
      <cdr-accordion v-for="(title, index) in bookTitles" :key="title" :id="`accordion-${index}`" :level="2" :opened="openedAccordions[index]" @accordion-toggle="toggleAccordion(index)">
        <template #label>
          {{ title }}
        </template>
        <div>
          <form v-if="!bookDescriptions[index] && !loadingDescriptions[index]" @submit.prevent="generateBookDescription(title, index)">
            <cdr-button class="generate-button" modifier="secondary" :full-width="true" type="submit">Generate Full Description</cdr-button>
          </form>
          <div v-if="bookDescriptions[index] && !loadingDescriptions[index]">
            <h2>{{ bookDescriptions[index].book_title }}</h2>
            <h3>Author Name</h3>
            <cdr-text class="body-text">{{ bookDescriptions[index].author_name }}</cdr-text>

            <h3>Summary</h3>
            <cdr-text class="body-text">{{ bookDescriptions[index].summary }}</cdr-text>

            <h3>Author's Background</h3>
            <cdr-text class="body-text">{{ bookDescriptions[index].author_background }}</cdr-text>
            
            <h3>Book Physical Description</h3>
            <cdr-text class="body-text">{{ bookDescriptions[index].book_physical_description }}</cdr-text>
            
            <h3>Excerpt</h3>
            <cdr-text class="body-text">{{ bookDescriptions[index].excerpt }}</cdr-text>
            
            <h3>Secret (Requires a {{ bookDescriptions[index].secret.check_difficulty }} {{ bookDescriptions[index].secret.check_needed }})</h3>
            <cdr-text class="body-text">{{ bookDescriptions[index].secret.description }}</cdr-text>
            <cdr-text class="body-text">{{ bookDescriptions[index].secret.secret_found }}</cdr-text>
          </div>
          <div v-if="loadingDescriptions[index]">
            <CdrSkeleton>
          <CdrSkeletonBone type="line" style="width:150px" />
        </CdrSkeleton>
          </div>
        </div>
      </cdr-accordion>
    </cdr-accordion-group>
  </div>
</template>
  
  <script setup>
  import { ref } from 'vue';
  import { CdrInput, CdrButton, CdrList, CdrText, CdrAccordionGroup, CdrAccordion, CdrSkeleton, CdrSkeletonBone } from "@rei/cedar";
  import "@rei/cedar/dist/cdr-fonts.css";
  import "@rei/cedar/dist/reset.css";
  import "@rei/cedar/dist/style/cdr-input.css";
  import "@rei/cedar/dist/style/cdr-button.css";
  import '@rei/cedar/dist/style/cdr-list.css';
  import '@rei/cedar/dist/style/cdr-text.css';
  import '@rei/cedar/dist/style/cdr-accordion.css';
  import '@rei/cedar/dist/style/cdr-accordion-group.css';
  import "@rei/cedar/dist/style/cdr-skeleton.css";
  import "@rei/cedar/dist/style/cdr-skeleton-bone.css";
  import { generateGptResponse } from "../util/open-ai.mjs";
  
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
    const prompt = `Generate an eclectic list of 7 book titles. The books are located in a ${location.value} in the ${setting.value} setting but be sure to include an eclectic mix of books. Make sure that the books reflect various interests and genres (including fiction, non-fiction and reference books) but also include 1-2 books focused on ${genre.value}. Only provide the title and do not number the results.`;
  
    try {
      loadingTitles.value = true;
      const response = await generateGptResponse(prompt);
      console.log(response);
      bookTitles.value = response.split('\n');
      loadingTitles.value = false;
    } catch (error) {
      console.error("Error generating book titles:", error);
    }
  };

  const generateBookDescription = async (title, index) => {
    const prompt = `Generate a description for a book with the title "${title}". This book was found in a "${location.value}" in the "${setting.value}" setting. Please provide the information in the following JSON format: 
      {
        "book_title": "<Book's Title>"
        "author_name": "<Author's name>",
        "author_background": "<Background of the author>",
        "book_physical_description": "<Description of the book's physical appearance>",
        "summary": "<A summary of the book in no more than 3 sentences>",
        "excerpt": "<An excerpt from the book ranging from 2 to 7 sentences>",
        "secret": {
            "description": "<Description of the secret>",
            "check_difficulty": "<Difficulty level of the check - 'Easy', 'Average', 'Hard', 'Very Hard'>",
            "check_needed": "<Description of the general type of check needed to discover the secret>",
            "secret_found": "<Description of how the secret appears in the book and how it can be found by the reader>"
        }
      }.`;
    try {
      loadingDescriptions.value[index] = true;
      const response = await generateGptResponse(prompt);
      console.log(response);
      bookDescriptions.value[index] = JSON.parse(response);
      loadingDescriptions.value[index] = false;
    } catch (error) {
      console.error("Error generating book titles:", error);
    }
  }
  </script>
  
  <style scoped lang="scss">
  @import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  
  .app-container {
    @include cdr-text-body-400();
    color: $cdr-color-text-primary;
    max-width: 800px;
    margin: 20px auto;
    padding: 2px 30px 30px 30px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .body-text {
  @include cdr-text-body-400();
  margin: 1rem 0;
}
  
  hr {
    border: 1px solid $cdr-color-border-secondary;
    width: 80%;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  
  .title-form {
    background-color: $cdr-color-background-secondary;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .generate-button {
    align-self: flex-start;
  }
  
  .book-title-container {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }

  .book-title {
    @include cdr-text-body-500();
  }
</style>