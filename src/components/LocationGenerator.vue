<template>
  <div class="app-container">
    <h1>RPG Book Title Generator</h1>
    <hr>
    <form @submit.prevent="generateBookTitles">
      <cdr-input class="book-form-input" id="setting" v-model="setting" background="secondary" label="Setting:" required />
      <cdr-input class="book-form-input" id="location" v-model="location" background="secondary" label="Location:" required />
      <cdr-input class="book-form-input" id="genre" v-model="genre" background="secondary" label="Genre:" required />
      <cdr-button class="generate-button" type="submit" :disabled="!setting || !location || !genre">Generate Book Titles</cdr-button>
    </form>
    <hr>
    <div class="book-title-container">
      <div v-for="title in bookTitles" :key="title" class="book-title">
        <h2>{{ title }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { CdrInput, CdrButton } from "@rei/cedar";
import "@rei/cedar/dist/cdr-fonts.css";
import "@rei/cedar/dist/reset.css";
import "@rei/cedar/dist/style/cdr-input.css";
import "@rei/cedar/dist/style/cdr-button.css";
import { generateGptResponse } from "../util/open-ai.mjs"; // Add your import here

export default {
  data() {
    return {
      setting: "",
      location: "",
      genre: "",
      bookTitles: [],
    };
  },
  components: {
    CdrInput,
    CdrButton,
  },
  methods: {
    async generateBookTitles() {
      const prompt = `Generate a list of 5 book titles. The books are located in a ${this.location} in the ${this.setting} setting and the books span various genres including ${this.genre}.`;

      try {
        const response = await generateGptResponse(prompt); // Replace fetch call with generateGptResponse
        console.log(response);
        // Assume the output from the model is a string of book titles
        // separated by line breaks.
        this.bookTitles = response.split('\n');
      } catch (error) {
        console.error("Error generating book titles:", error);
      }
    },
  },
};
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
  
  hr {
    border: 1px solid $cdr-color-border-secondary;
    width: 80%;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  
  form {
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
