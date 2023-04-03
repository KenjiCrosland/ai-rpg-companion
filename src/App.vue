<template>
  <div class="app-container">
    <h1>RPG Location Description Generator</h1>
    <hr>
    <p>
      Welcome to the RPG Location Description Generator! This App uses the ChatGPT API to provide an engaging descriptions of locations for your players. Some examples of types of locations might be:
      <ul>
        <li
          v-for="example in examples"
          :key="example"
          @click="setInputValue(example)"
          class="suggestion"
        >
          {{ example }}
        </li>
      </ul>
    </p>
    <form @submit.prevent="generateLocationDescription">
      <label for="typeOfPlace">Type of location:</label>
      <input id="typeOfPlace" v-model="typeOfPlace" required />
      <button type="submit">Generate Description</button>
    </form>
    <div v-if="loading">Generating...</div>
    <div v-if="locationDescription" class="location-description">{{ locationDescription }}</div>
  </div>
</template>

<script>
import { Configuration, OpenAIApi }  from "openai";
const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default {
  data() {
    return {
      locationDescription: '',
      typeOfPlace: '',
      examples: [
        'A tavern in Neverwinter that serves as a front for the local chapter of the Zhentarim',
        'The captain\'s quarters on a spelljammer ship',
        'A tea house where the Emerald Champion Doji Satsume often frequents in the Land of Rokugan',
        'An upscale ripperdoc establishment in Night City',
        'A study in a mage\'s tower, long abandoned',
        'A gnome\'s workshop and home deep in the feywild who makes sentient puppets'
      ],
      loading: false,
    };
  },
  methods: {
    setInputValue(value) {
      this.typeOfPlace = value;
    },
    async generateLocationDescription() {
      this.loading = true;

      const prompt =
`Write a 4-sentence description of a location in a D&D game. Each sentence must meet the following parameters. Please note that while the example below is of a Tavern, it could be any place:

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
        const gptResponse = await openai.createChatCompletion({
  model:"gpt-3.5-turbo",
  messages:[
        {"role": "system", "content": "You are an assistant Game Master."},
        {"role": "user", "content": prompt }
    ]
        })

    this.locationDescription = gptResponse.data.choices[0].message.content;
      } catch (error) {
        console.error('Error generating tavern description:', error);
        this.locationDescription = error;
      }

      this.loading = false;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.app-container {
  font-family: 'Roboto', sans-serif;
  max-width: 800px;
  margin: 20px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-family: 'Roboto', sans-serif;
  color: #7A200D;
  font-weight: 700;
  margin: 0px;
  font-size: 36px;
  letter-spacing: 1px;
  font-variant: small-caps;
  text-align: center;
  margin-bottom: 30px;
}

p {
  font-size: 1.2rem;
  line-height: 1.7;
  margin-bottom: 20px;
  color: #3c1208;
}

ul {
  list-style-type: disc;
  padding-left: 40px;
  margin-bottom: 20px;
}

li {
  color: #3c1208;
  cursor: pointer;
}

.suggestion:hover {
  color: #922610;
}

form {
  background-color: #FDF1DC;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: #3c1208;
}

input {
  width: 95%;
padding: 8px 16px;
  font-size: 1.1rem;
  border: none;
  background-color: #ffffff;
  border-bottom: 2px solid #7A200D;
  margin-bottom: 16px;
  outline-color: #7A200D;
}

button {
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #7A200D;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

button:hover {
  background-color: #922610;
}

.location-description {
  font-size: 1.3rem;
  line-height: 1.7;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  color: #3c1208;
  margin-top: 20px;
}
</style>
