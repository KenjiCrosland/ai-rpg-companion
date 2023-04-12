<template>
    <div class="app-container">
      <h1>RPG Location Description Generator</h1>
      <hr>
      <cdr-text class="intro">
        Welcome to the RPG Location Description Generator! This App uses the ChatGPT API to provide engaging descriptions
        of locations for your players. Some examples of types of locations might be:
      </cdr-text>
  
      <cdr-list class="suggestions" modifier="unordered">
        <li v-for="example in examples" :key="example">
          <cdr-link modifier="standalone" @click="setInputValue(example)">{{ example }}</cdr-link>
        </li>
      </cdr-list>
  
      <form @submit.prevent="generateLocationDescription">
        <cdr-input id="typeOfPlace" v-model="typeOfPlace" background="secondary" label="Type of Location:" required />
        <cdr-button type="submit" class="generate-button">Generate Description</cdr-button>
      </form>
      <div v-if="loading">Generating...</div>
      <div v-if="locationDescription" class="location-description">{{ locationDescription }}</div>
    </div>
    <cdr-text class="credits">
      This app was created by <cdr-link href='https://cros.land'>Kenji Crosland</cdr-link>
    </cdr-text>
  </template>
  
  <script>
  import { CdrInput, CdrLink, CdrButton, CdrText, CdrList } from '@rei/cedar';
  import '@rei/cedar/dist/style/cdr-input.css';
  import '@rei/cedar/dist/cdr-fonts.css';
  import '@rei/cedar/dist/reset.css';
  import '@rei/cedar/dist/style/cdr-text.css';
  import '@rei/cedar/dist/style/cdr-button.css';
  import '@rei/cedar/dist/style/cdr-link.css';
  import '@rei/cedar/dist/style/cdr-list.css';
  export default {
    data() {
      return {
        locationDescription: '',
        typeOfPlace: '',
        examples: [
          'The captain\'s quarters on a spelljammer ship',
          'A tavern in Neverwinter that serves as a front for the local chapter of the Zhentarim',
          'A tea house where the Emerald Champion Doji Satsume often frequents in the Land of Rokugan',
          'A gnome\'s workshop and home deep in the feywild who makes sentient puppets',
          'An upscale ripperdoc establishment in Night City',
        ],
        loading: false,
      };
    },
    components: {
      CdrInput,
      CdrText,
      CdrButton,
      CdrLink,
      CdrList,
    },
    methods: {
      setInputValue(value) {
        this.typeOfPlace = value;
      },
      async generateLocationDescription() {
        this.loading = true;
  
        const prompt =
          `Write a 4-sentence description of a location in a Tabletop Roleplaying Game. Each sentence must meet the following parameters. Please note that while the example below is of a Tavern, it could be any place:
  
  Sentence 1: Provide a general description of the location's interior or exterior to give players a sense of its dimensions. Examples include:
  
      "The Red Rooster appears to have been converted from an old barn."
      "The Great Oak Inn is two stories high, with giant support beams hewn from ancient cedar."
      "The Grotto is a lantern-lit cave with white-washed walls and stone tables."
  
  Sentence 2: Include an engaging atmospheric detail that is evocative. Examples include:
  
      "The first thing you notice is that everything smells like horse."
      "A thick layer of tobacco smoke hangs in the air, obscuring everything."
      "You smell pumpkin garlic soup wafting in from the kitchen."
      "It takes a while for your eyes to adjust to the dim light inside."
  
  Sentence 3: Describe an interesting or unusual feature that sets the place apart from others. This could be related to the place's name. Examples include:
  
      "Several poorly taxidermied wolves hang above the tables with lopsided grins."
      "A shrine to Tymora occupies a corner of the room, with fresh flowers laid at the feet of a small stone statue."
      "A monstrous-looking organ dominates the far wall of the tavern, with brass pipes snaking their way from the console haphazardly."
  
  Sentence 4: Describe something or someone the players can interact with. It could be an NPC doing something interesting or saying something unusual or an enticing object:
      "An extremely wizened gnome lady appears to be pouring salt from a bag into a corner of the building saying, 'That will teach em spirits to haunt this here inn!'"
      "A bright red tiefling seems to be gesticulating wildly to his pale elven friend saying, 'Brilliant! Brilliant! Our performance tonight is sure to be wonderous my dear friend'
      "You notice a group of gnomes at a corner table, giggling and whispering excitedly about the arrival of a group of adventurers from a far-off land, while the tavern keeper, a tall and slender elf, pours a goblet of glowing green liquid for a half-ogre sitting at the bar."
      "You hear a deep bass voice laughing from a corner table and yelling out to what appears to be a group of fellow adventurers say, "And then he turned dear Philo here into a newt! A NEWT!""
  
  Based on these style notes, please write a description of ${this.typeOfPlace}. Please make sure it's only 4 sentences and do not share any hidden details that wouldn't be evident to the players.`;
  
        try {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [
                { "role": "system", "content": "You are an assistant Game Master." },
                { "role": "user", "content": prompt },
              ],
            }),
          };
          let response;
          if (import.meta.env.DEV) {
            requestOptions.headers.Authorization = `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
            response = await fetch('https://api.openai.com/v1/chat/completions', requestOptions);
          } else {
            response = await fetch('/wp-json/open-ai-proxy/api/v1/proxy', requestOptions);
          }
          const responseData = await response.json();
  
          this.locationDescription = responseData.choices[0].message.content;
        } catch (error) {
          console.error('Error generating tavern description:', error);
          this.locationDescription = error;
        }
  
        this.loading = false;
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
  .intro {
    @include cdr-text-body-400();
  }
  
  .suggestions {
    margin-left: 2rem;
    padding: 2rem;
  }
  .credits {
    @include cdr-text-body-400();
    margin: 5px auto;
    text-align: center;
  }
  
  h1 {
    @include cdr-text-heading-serif-1000;
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
  
  .location-description {
    @include cdr-text-body-500();
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }
  </style>