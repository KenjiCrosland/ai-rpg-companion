<template>
  <div class="app-container">
    <h1>D&D 5e Magic Item Generator</h1>
    <p>
      Welcome to the D&D 5th Edition Magic Item Generator, powered by the ChatGPT API. To start, select an item type
      (armor, weapon, etc.), which is the only required field. You may also specify the item's name, rarity, and lore to
      customize your creation further. If you prefer, simply choose an item type and click "Generate Item" to receive a
      magic item tailored to your selection. Enjoy crafting your unique magical
      artifacts!
    </p>
    <form class="item-form" @submit.prevent="generateMagicItem">
      <cdr-input class="form-input" id="item-name" v-model="itemName" background="secondary"
        label="Magic Item Name (optional):">
        <template #helper-text-bottom>
          Example: "Goblet of the Firmament". Leave blank for a random name.
        </template>
      </cdr-input>

      <cdr-select v-model="rarity" label="Rarity Level (optional)" prompt="Choose a rarity level"
        :options="rarityOptions" />
      <cdr-select v-model="itemType" label="Item Type" prompt="Choose an item type" :options="itemTypeOptions" />
      <cdr-input :rows="7" tag="textarea" v-model="itemLore" background="secondary" label="Item Lore"
        placeholder="Enter any any details about the item lore" class="item-lore-details">
        <template #helper-text-bottom>
          Write any details about your item that you want to include. Need help coming up with lore for your
          magical item? Use the <cdr-link href="https://cros.land/ai-powered-lore-and-timeline-generator/">Lore
            Generator</cdr-link> and paste in the generated summary!
        </template>
      </cdr-input>

      <cdr-button class="generate-button" type="submit">Generate Magic Item</cdr-button>
    </form>
    <div v-if="magicItemDescription && !loadingItem">
      <h2>{{ magicItemDescription.name }}</h2>
      <p class="rarity">{{ magicItemDescription.item_type }}, {{ magicItemDescription.rarity }}</p>

      <h3>Features</h3>
      {{ magicItemDescription.modifier }}
      <p class="body-text" v-for="(description, feature) in magicItemDescription.features" :key="feature">
        <strong>{{ feature }}</strong>: {{ description }}
      </p>
      <div class="read-aloud">
        <p class="body-text">{{ magicItemDescription.physical_description }}</p>
        <p class="body-text">{{ magicItemDescription.lore }}</p>
      </div>
    </div>
  </div>
  <div v-if="magicItemDescription && !loadingItem" class="instructions">
    <h3>Use Homebrewery to Make a Beautiful PDF of Your Generated Content!</h3>
    <cdr-list tag="ol" modifier="ordered">
      <li>Click the "Copy as Markdown" button below to copy the generated content in markdown format.</li>
      <li>Visit <a href="https://homebrewery.naturalcrit.com/new" target="_blank"
          rel="noopener noreferrer">Homebrewery</a>.</li>
      <li>Paste the copied markdown into the document on the left hand side. Feel free to edit or reorder the
        content as
        you like.</li>
      <li>Enjoy the beautifully formatted content!</li>
    </cdr-list>
    <div class="markdown-button">
      <cdr-button @click="copyAsMarkdown">Copy as Markdown</cdr-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { CdrInput, CdrButton, CdrText, CdrSelect, CdrLink, CdrList } from "@rei/cedar";
import { generateGptResponse } from "../util/open-ai.mjs";
import { convertItemToMarkdown } from '../util/convertToMarkdown.mjs';
export default {
  components: {
    CdrInput,
    CdrButton,
    CdrText,
    CdrSelect,
    CdrLink,
    CdrList
  },
  setup() {
    const itemName = ref('');
    const rarity = ref('');
    const itemType = ref('');
    const itemLore = ref('');
    const magicItemDescription = ref(null);
    const loadingItem = ref(false);
    const rarityOptions = [
      'Common',
      'Uncommon',
      'Rare',
      'Very Rare',
      'Legendary'
    ];
    const itemTypeOptions = [
      'Armor',
      'Potion',
      'Ring',
      'Rod',
      'Scroll',
      'Staff',
      'Wand',
      'Weapon',
      'Wondrous Item'
    ];

    const generateMagicItem = async () => {
      if (!itemType.value) {
        //prevent submission if no item type is selected and display an error message
        alert('Please select an item type.');
        return;
      }
      if (!rarity.value) {
        //randomly select a rarity if none is provided
        const randomIndex = Math.floor(Math.random() * rarityOptions.length);
        rarity.value = rarityOptions[randomIndex];
      }
      magicItemDescription.value = null;
      const prompt = `Generate a detailed Dungeons & Dragons magic item description adhering to the provided rarity guidelines and incomplete information. The item's description should align with D&D 5e mechanics, including specific spell levels, attunement requirements, and balanced recharge conditions. Emphasize the item's versatility, historical context, and potential interactions with players.
        For "features" and "possible_uses", present them as nested objects where each feature or use is a key, and its detailed description is the corresponding value. This structure should enrich the item's narrative and mechanical clarity.

        Rarity Guidelines:
        - **Common:** Mimics cantrips or has 1st-level spell effects, no bonuses.
        - **Uncommon:** May include up to 3rd-level spells, provides a +1 bonus.
        - **Rare:** Can feature up to 6th-level spells, offers a +2 bonus, often combines features.
        - **Very Rare:** Encompasses up to 8th-level spells, grants a +3 bonus, significantly alters gameplay.
        - **Legendary:** Includes 9th-level spells, grants a +4 bonus, pivotal to plots.

        Example of a detailed object for guidance:
        {
          "name": "Armor of Shadow Veil",
          "item_type": "Wondrous Item",
          "rarity": "Rare // Can feature up to 6th-level spells, offers a +2 bonus, often combines features.",
          "armor_or_weapon_modifier": "While wearing this armor, you gain a +1 bonus to AC."
          "features": {
            "Invisibility": "Grants invisibility when in shadows or darkness.",
            "Darkness": "Can cast 'Darkness' once per day without expending a spell slot. Requires attunement by a rogue or bard."
          },
          "physical_description": "The Armor of Shadow Veil is a dark, form-fitting leather armor that shimmers in the light. It is adorned with intricate elven runes that glow faintly in the dark",
          "reason_for_rarity_level": "The combination of invisibility and the ability to cast 'Darkness', along with the limited usage and specific attunement requirements, justifies the rare classification.",
          "lore": "Crafted by the elf shadow-weaver Aranethil as a reward for the rogue Illyana, saving her village. Its use has turned the tide in critical battles."
        }

        Please complete and enrich the following item description based on the above guidelines, structure, and specifications:
        {
          "name": "${itemName.value}",
          "item_type": "${itemType.value}",
          "rarity": "${rarity.value} // ${rarityGuidelines[rarity.value]}",
          ${isWeapon(itemType.value) ? '"modifier": "While wielding this weapon, you gain a' + rarityModifiers[rarity.value] + 'bonus to attack and damage rolls.",' : ''}
          ${(itemType.value === 'Armor') ? '"modifier": "While wearing this armor, you gain a' + rarityModifiers[rarity.value] + 'bonus to AC.",' : ''}
          "features": {
            "feature_1": "feature_1_description",
            "feature_2": "feature_2_description"
          },
          "reason_for_rarity_level": "",
          "physical_description": "",
          "lore": "${itemLore.value}"
        }`

      try {
        loadingItem.value = true;
        // Use your method to call the OpenAI API with the prompt and parse the JSON response.
        // This example assumes you have a method like `generateGptResponse` that takes a prompt and returns the response data.
        const response = await generateGptResponse(prompt);
        magicItemDescription.value = JSON.parse(response);
        magicItemDescription.value.rarity = parseRarity(magicItemDescription.value.rarity);
        loadingItem.value = false;
      } catch (error) {
        console.error("Error generating magic item:", error);
        loadingItem.value = false;
      }
    };

    const rarityModifiers = {
      'Common': '+1',
      'Uncommon': '+1',
      'Rare': '+2',
      'Very Rare': '+3',
      'Legendary': '+4'
    };

    const isWeapon = (itemType) => {
      return itemType === 'Weapon' || itemType === 'Rod' || itemType === 'Staff';
    }

    const parseRarity = (rarity) => {
      return rarity.split(' // ')[0];
    }

    const rarityGuidelines = {
      'Common': 'Mimics cantrips or has 1st-level spell effects, no bonuses.',
      'Uncommon': 'May include up to 3rd-level spells, provides a +1 bonus.',
      'Rare': 'Can feature up to 6th-level spells, offers a +2 bonus, often combines features.',
      'Very Rare': 'Encompasses up to 8th-level spells, grants a +3 bonus, significantly alters gameplay.',
      'Legendary': 'Includes 9th-level spells, grants a +4 bonus, pivotal to plots.'
    }

    const copyAsMarkdown = () => {

      const markdownContent = convertItemToMarkdown(magicItemDescription.value);

      if (markdownContent) {
        const textarea = document.createElement('textarea');
        textarea.textContent = markdownContent;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        // Optionally, display a message that the content has been copied.
        alert('Content copied as markdown!');
      } else {
        // If there is no content to copy, display a message to the user.
        alert('No content available to copy as markdown.');
      }
    }
    return {
      itemName,
      itemLore,
      itemType,
      rarity,
      itemTypeOptions,
      magicItemDescription,
      loadingItem,
      generateMagicItem,
      rarityOptions,
      copyAsMarkdown
    };
  }
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

.rarity {
  font-style: italic;
  margin-bottom: 1rem;
}

.item_form {
  background-color: $cdr-color-background-secondary;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.generate-button {
  margin-top: 2rem;
}


.read-aloud {
  background-color: $cdr-color-background-secondary;
  color: $cdr-color-text-secondary;
  padding: 1rem 2rem;
  font-style: italic;
}

.instructions {
  max-width: 700px;
  padding: 3rem;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.instructions h2 {
  margin-bottom: 1rem;
}

.instructions ol {
  padding-left: 1.5rem;
}

.instructions li {
  margin-bottom: 0.5rem;
}
</style>