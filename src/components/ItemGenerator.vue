<template>
  <div class="app-container">
    <h1>Kenji's D&D 5e Magic Item Generator</h1>
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
      {{ magicItemDescription.modifier_sentence }}
      <p class="body-text" v-for="(description, feature) in magicItemDescription.features" :key="feature">
        <strong>{{ feature }}</strong>: {{ description }}
      </p>
      <div class="read-aloud">
        <p class="body-text">{{ magicItemDescription.physical_description }}</p>
        <p class="body-text">{{ magicItemDescription.lore }}</p>
      </div>
    </div>
    <div v-if="loadingItem">
      <item-skeleteon />
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

<script setup>
import { ref } from 'vue';
import { CdrInput, CdrButton, CdrText, CdrSelect, CdrLink, CdrList, CdrSkeleton, CdrSkeletonBone } from "@rei/cedar";
import { generateGptResponse } from "../util/open-ai.mjs";
import { convertItemToMarkdown } from '../util/convertToMarkdown.mjs';
import determineFeaturesAndBonuses from '../util/determine-features-and-bonuses.mjs';
import ItemSkeleteon from './skeletons/ItemSkeleteon.vue';

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
    alert('Please select an item type.');
    return;
  }
  if (!rarity.value) {
    const randomIndex = Math.floor(Math.random() * rarityOptions.length);
    rarity.value = rarityOptions[randomIndex];
  }
  const featuresAndBonuses = determineFeaturesAndBonuses(rarity.value);
  magicItemDescription.value = null;
  const prompt = `Generate a detailed Dungeons & Dragons magic item description adhering to the provided rarity guidelines and incomplete information. The item's description should align with D&D 5e mechanics, including specific spell levels, attunement requirements, and balanced recharge conditions. Emphasize the item's versatility, historical context, and potential interactions with players.
    For "features" and "possible_uses", present them as nested objects where each feature or use is a key, and its detailed description is the corresponding value. This structure should enrich the item's narrative and mechanical clarity.

    Guidelines for features based on rarity and item type:
    - Common: Minor magical properties or effects. No bonuses to AC or attack/damage rolls.
    - Uncommon: May include one minor effect OR a +1 bonus to AC (for armor) or to attack/damage rolls (for weapons).
    - Rare: Up to +1 bonus to AC and one minor effect for armor; up to +2 to attack/damage rolls OR one effect for weapons.
    - Very Rare: Up to +3 bonus to AC or enhanced effects for armor; up to +3 to attack/damage rolls and/or effects for weapons.
    - Legendary: Significant magical effects, up to +4 bonus to AC for armor; up to +4 to attack/damage rolls and major effects for weapons.

    Example of a detailed object for guidance:
    {
      "name": "Armor of Shadow Veil",
      "item_type": "Armor",
      "rarity": "Rare // Can feature up to 6th-level spells, offers a +2 bonus, often combines features.",
      "bonus": "+1",
      "modifier_sentence": "While wearing this armor, you gain a +1 bonus to AC.",
      "feature_count": 2,
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
      "bonus": "${featuresAndBonuses.bonus}",
      "modifier_sentence": "${constructModifierSentence(featuresAndBonuses.bonus, itemType.value)}",
      "feature_guidelines": "${rarityGuidelines[rarity.value]}",
      "feature_count": ${featuresAndBonuses.feature_count},
      "features": ${JSON.stringify(featuresAndBonuses.features)},
      "reason_for_rarity_level": "",
      "physical_description": "",
      "lore": "${itemLore.value}"
    }`

  try {
    loadingItem.value = true;
    const response = await generateGptResponse(prompt, itemValidation, 3);
    magicItemDescription.value = JSON.parse(response);
    magicItemDescription.value.rarity = parseRarity(magicItemDescription.value.rarity);
    loadingItem.value = false;
  } catch (error) {
    console.error("Error generating magic item:", error);
    loadingItem.value = false;
  }
};

const itemValidation = (jsonString) => {
  try {
    const jsonObj = JSON.parse(jsonString);
    const keys = [
      'name',
      'item_type',
      'rarity',
      'bonus',
      'feature_count',
      'features',
      'physical_description',
      'lore'
    ];
    return keys.every((key) => key in jsonObj);
  } catch (error) {
    return false;
  }
}

const constructModifierSentence = (bonus, itemType) => {
  if (itemType === 'Armor') {
    return `While wearing this armor, you gain a ${bonus} bonus to AC.`;
  } else if (itemType === 'Weapon') {
    return `This weapon grants a ${bonus} bonus to attack and damage rolls.`;
  } else {
    return '';
  }
}

const parseRarity = (rarity) => {
  return rarity.split(' // ')[0];
}

const rarityGuidelines = {
  'Common': 'Minor magical properties or effects. No bonuses to AC or attack/damage rolls. These items rarely cause effects requiring a saving throw.',
  'Uncommon': 'May include one minor feature OR a +1 bonus to AC (for armor) or to attack/damage rolls (for weapons). If the item causes an effect on a creature, the saving throw DC is around  13 to 14.',
  'Rare': 'Up to +1 bonus to AC and one minor feature for armor; up to +2 to attack/damage rolls OR one effect for weapons. If the item causes an effect on a creature, the saving throw DC is around  15 to 16.',
  'Very Rare': 'Up to +3 bonus to AC or enhanced features for armor; up to +3 to attack/damage rolls and/or effects for weapons. If the item causes an effect on a creature, the saving throw DC is around  17 to 18.',
  'Legendary': 'Significant magical features, up to +4 bonus to AC for armor; up to +4 to attack/damage rolls and major effects for weapons. If the item causes an effect on a creature, the saving throw DC is 19 or higher.'
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
    alert('Content copied as markdown!');
  } else {
    alert('No content available to copy as markdown.');
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
