<template>
  <div class="app-container">
    <cdr-button modifier="secondary" class="sidebar-toggle" @click="isSidebarVisible = !isSidebarVisible"
      v-show="windowWidth <= 1020">
      <template #icon-left>
        <icon-navigation-menu inherit-color />
      </template>
      {{ isSidebarVisible ? 'Hide Sidebar' : 'Show Sidebar' }}
    </cdr-button>
    <!-- Overlay to close sidebar on click -->
    <div class="overlay" v-show="isSidebarVisible && windowWidth <= 1020" @click="isSidebarVisible = false"></div>
    <div class="sidebar" :style="sidebarStyle">
      <ul class="saved-items">
        <li v-for="(item, index) in savedItems" :key="index" :class="{ 'active': activeItemIndex === index }">
          <button class="item-button" @click="selectItem(index)">
            <span>{{ item.name }}</span>
            <span>{{ item.rarity }}</span>
          </button>
        </li>
        <li>
          <button class="item-button" @click="newItem" :class="{ 'active': activeItemIndex === null }">
            + New Magic Item
          </button>
        </li>
      </ul>
      <!-- Button to open the modal -->
      <cdr-button modifier="dark" @click="showDataManagerModal = true" style="margin-bottom: 12rem;">
        Save/Load Data from a File
      </cdr-button>

      <!-- Our new DataManagerModal component -->
      <DataManagerModal :opened="showDataManagerModal" @update:opened="showDataManagerModal = $event" :premium="premium"
        currentApp="savedItems" />
    </div>
    <div class="main-container">
      <div class="form-container" v-if="!magicItemDescription">
        <h1>Kenji's D&D 5e Magic Item Generator</h1>
        <div>
          <p>
            Welcome to the D&D 5th Edition Magic Item Generator, powered by the ChatGPT API. To start, select an item
            type
            (armor, weapon, etc.), which is the only required field. You may also specify the item's name, rarity, and
            lore
            to
            customize your creation further. If you prefer, simply choose an item type and click "Generate Item" to
            receive
            a
            magic item tailored to your selection. Enjoy crafting your unique magical artifacts!
          </p>
        </div>
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

          <cdr-button class="generate-button" type="submit" :full-width="true">Generate Magic Item</cdr-button>
        </form>
      </div>

      <!-- Tabbed Content for Generated Item -->
      <div v-if="magicItemDescription && !loadingItem" class="form-container">
        <Tabs :activeIndex="activeTabIndex" @tabChange="activeTabIndex = $event">
          <TabPanel label="Item Details">
            <h2>{{ magicItemDescription.name }}</h2>
            <p class="rarity">{{ magicItemDescription.item_type }}, {{ magicItemDescription.rarity }}</p>

            <h3>Features</h3>
            <p v-if="magicItemDescription.modifier_sentence">{{ magicItemDescription.modifier_sentence }}</p>
            <p class="body-text" v-for="(description, feature) in magicItemDescription.features" :key="feature">
              <strong>{{ feature }}</strong>: {{ description }}
            </p>
            <div class="read-aloud">
              <p class="body-text">{{ magicItemDescription.physical_description }}</p>
              <p class="body-text">{{ magicItemDescription.lore }}</p>
            </div>

            <div class="button-group">
              <cdr-button @click="regenerateItem" modifier="secondary">Re-Generate Item</cdr-button>
              <cdr-button @click="deleteItem" modifier="dark">Delete Item</cdr-button>
            </div>
          </TabPanel>

          <TabPanel label="Quest Hooks">
            <QuestHookTab :item="magicItemDescription" @updated-item="handleUpdatedItem" />
          </TabPanel>

          <TabPanel label="Export">
            <h2>Export Your Magic Item</h2>
            <p>Use these tools to export your generated content in various formats.</p>

            <div class="export-section">
              <h3>Homebrewery Export</h3>
              <cdr-list tag="ol" modifier="ordered">
                <li>Click the "Copy as Markdown" button below to copy the generated content in markdown format.</li>
                <li>Visit <a href="https://homebrewery.naturalcrit.com/new" target="_blank"
                    rel="noopener noreferrer">Homebrewery</a>.</li>
                <li>Paste the copied markdown into the document on the left-hand side. Feel free to edit or reorder the
                  content as you like.</li>
                <li>Enjoy the beautifully formatted content!</li>
              </cdr-list>
              <div class="button-group">
                <cdr-button @click="copyAsMarkdown">Copy as Markdown</cdr-button>
                <cdr-button @click="copyAsPlainText" modifier="secondary">Copy as Plain Text</cdr-button>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>

      <div v-if="loadingItem" class="form-container">
        <item-skeleton />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { CdrInput, CdrButton, CdrSelect, CdrLink, CdrList, IconNavigationMenu } from "@rei/cedar";
import { generateGptResponse } from "../util/open-ai.mjs";
import { convertItemToMarkdown } from '../util/convertToMarkdown.mjs';
import determineFeaturesAndBonuses from '../util/determine-features-and-bonuses.mjs';
import ItemSkeleton from './skeletons/ItemSkeleton.vue';
import QuestHookTab from './item-generator-tabs/QuestHookTab.vue';
import DataManagerModal from './DataManagerModal.vue';
import Tabs from './tabs/Tabs.vue';
import TabPanel from './tabs/TabPanel.vue';

const props = defineProps({
  premium: {
    type: Boolean,
    default: false
  }
});

const itemName = ref('');
const rarity = ref('');
const itemType = ref('');
const itemLore = ref('');
const magicItemDescription = ref(null);
const loadingItem = ref(false);
const savedItems = ref([]);
const activeItemIndex = ref(null);
const windowWidth = ref(window.innerWidth);
const isSidebarVisible = ref(false);
const showDataManagerModal = ref(false);
const activeTabIndex = ref(0);

const sidebarStyle = computed(() => {
  if (windowWidth.value <= 1020) {
    return {
      position: 'fixed',
      transform: isSidebarVisible.value ? 'translateX(0)' : 'translateX(-100%)',
      width: '70%',
      maxWidth: '400px'
    };
  } else {
    return {
      width: '400px',
      position: 'static',
      transform: 'none'
    };
  }
});

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

const updateVisibility = () => {
  if (window.innerWidth > 768) {
    isSidebarVisible.value = true;
  } else {
    isSidebarVisible.value = false;
  }
};

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

const rarityGuidelines = {
  'Common': 'Minor magical properties or effects. No bonuses to AC or attack/damage rolls. These items rarely cause effects requiring a saving throw.',
  'Uncommon': 'May include one minor feature OR a +1 bonus to AC (for armor) or to attack/damage rolls (for weapons). If the item causes an effect on a creature, the saving throw DC is around  13 to 14.',
  'Rare': 'Up to +1 bonus to AC and one minor feature for armor; up to +2 to attack/damage rolls OR one effect for weapons. If the item causes an effect on a creature, the saving throw DC is around  15 to 16.',
  'Very Rare': 'Up to +3 bonus to AC or enhanced features for armor; up to +3 to attack/damage rolls and/or effects for weapons. If the item causes an effect on a creature, the saving throw DC is around  17 to 18.',
  'Legendary': 'Significant magical features, up to +4 bonus to AC for armor; up to +4 to attack/damage rolls and major effects for weapons. If the item causes an effect on a creature, the saving throw DC is 19 or higher.'
}

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
    // Initialize with empty quest hooks
    magicItemDescription.value.questHooks = [];
    loadingItem.value = false;
    saveItem(magicItemDescription.value);
    const index = savedItems.value.findIndex((item) => item.name === magicItemDescription.value.name);
    selectItem(index);
    activeTabIndex.value = 0;
  } catch (error) {
    console.error("Error generating magic item:", error);
    loadingItem.value = false;
  }
};

const regenerateItem = () => {
  generateMagicItem();
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
  if (!bonus || bonus === '0') return '';
  if (itemType === 'Armor') {
    return `While wearing this armor, you gain a ${bonus} bonus to AC.`;
  } else if (itemType === 'Weapon') {
    return `This weapon grants a ${bonus} bonus to attack and damage rolls.`;
  }
  return '';
}

const parseRarity = (rarity) => {
  if (!rarity) return '';
  return rarity.split(' // ')[0];
}

const copyAsMarkdown = () => {
  let markdownContent = convertItemToMarkdown(magicItemDescription.value);

  if (magicItemDescription.value.questHooks && magicItemDescription.value.questHooks.length > 0) {
    markdownContent += '\n\n## Quest Hooks\n\n';
    magicItemDescription.value.questHooks.forEach((hook) => {
      markdownContent += `### ${hook.title}\n\n`;
      markdownContent += `**Quest Giver:** ${hook.questGiver}\n\n`;
      markdownContent += `${hook.setup}\n\n`;
      markdownContent += `**Objectives:**\n`;
      hook.objectives.forEach(obj => {
        markdownContent += `- ${obj}\n`;
      });
      markdownContent += `\n**Challenges:**\n`;
      hook.challenges.forEach(challenge => {
        markdownContent += `- ${challenge}\n`;
      });
      markdownContent += `\n**Reward:** ${hook.reward}\n`;
      if (hook.twist) {
        markdownContent += `\n**Twist:** ${hook.twist}\n`;
      }
      markdownContent += '\n';
    });
  }

  if (markdownContent) {
    navigator.clipboard.writeText(markdownContent);
    alert('Content copied as markdown!');
  } else {
    alert('No content available to copy as markdown.');
  }
};

const copyAsPlainText = () => {
  let plainText = `${magicItemDescription.value.name}\n`;
  plainText += `${magicItemDescription.value.item_type}, ${magicItemDescription.value.rarity}\n\n`;

  if (magicItemDescription.value.modifier_sentence) {
    plainText += `${magicItemDescription.value.modifier_sentence}\n`;
  }

  plainText += `\nFeatures:\n`;
  Object.entries(magicItemDescription.value.features).forEach(([feature, description]) => {
    plainText += `${feature}: ${description}\n`;
  });

  plainText += `\n${magicItemDescription.value.physical_description}\n`;
  plainText += `${magicItemDescription.value.lore}\n`;

  if (magicItemDescription.value.questHooks && magicItemDescription.value.questHooks.length > 0) {
    plainText += '\n\nQuest Hooks:\n';
    magicItemDescription.value.questHooks.forEach((hook) => {
      plainText += `\n${hook.title}\n`;
      plainText += `Quest Giver: ${hook.questGiver}\n`;
      plainText += `${hook.setup}\n`;
      plainText += `Objectives: ${hook.objectives.join(', ')}\n`;
      plainText += `Challenges: ${hook.challenges.join(', ')}\n`;
      plainText += `Reward: ${hook.reward}\n`;
      if (hook.twist) {
        plainText += `Twist: ${hook.twist}\n`;
      }
    });
  }

  navigator.clipboard.writeText(plainText);
  alert('Content copied as plain text!');
};

const saveItem = (item) => {
  const existingIndex = savedItems.value.findIndex(saved => saved.name === item.name);

  if (existingIndex !== -1) {
    savedItems.value[existingIndex] = item;
  } else {
    savedItems.value.push(item);
  }

  const rarityIndex = {
    'Common': 0,
    'Uncommon': 1,
    'Rare': 2,
    'Very Rare': 3,
    'Legendary': 4
  };
  savedItems.value.sort((a, b) => {
    return rarityIndex[a.rarity] - rarityIndex[b.rarity];
  });
  localStorage.setItem('savedItems', JSON.stringify(savedItems.value));
};

// Handler for updates from QuestHookTab
const handleUpdatedItem = (updatedItem) => {
  magicItemDescription.value = updatedItem;
  if (activeItemIndex.value !== null) {
    savedItems.value[activeItemIndex.value] = updatedItem;
    localStorage.setItem('savedItems', JSON.stringify(savedItems.value));
  }
};

const loadSavedItems = () => {
  const storedItems = localStorage.getItem('savedItems');
  if (storedItems) {
    savedItems.value = JSON.parse(storedItems);
  }
};

const selectItem = (index) => {
  activeItemIndex.value = index;
  magicItemDescription.value = savedItems.value[index];
  itemName.value = magicItemDescription.value.name;
  rarity.value = magicItemDescription.value.rarity;
  itemType.value = magicItemDescription.value.item_type;
  itemLore.value = magicItemDescription.value.lore;
  activeTabIndex.value = 0;
};

const deleteItem = () => {
  if (confirm('Are you sure you want to delete this item?')) {
    if (activeItemIndex.value !== null) {
      savedItems.value.splice(activeItemIndex.value, 1);
      localStorage.setItem('savedItems', JSON.stringify(savedItems.value));
      activeItemIndex.value = null;
      magicItemDescription.value = null;
      itemName.value = '';
      rarity.value = '';
      itemType.value = '';
      itemLore.value = '';
    }
  }
};

const newItem = () => {
  activeItemIndex.value = null;
  magicItemDescription.value = null;
  itemName.value = '';
  rarity.value = '';
  itemType.value = '';
  itemLore.value = '';
};

onMounted(() => {
  loadSavedItems();
  updateWindowWidth();
  updateVisibility();
  window.addEventListener('resize', updateWindowWidth);
});
</script>

<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.app-container {
  display: flex;

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
  }
}

.sidebar-toggle {
  display: none;
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1001;

  @media (max-width: 1020px) {
    display: block;
  }
}

.main-container {
  margin: 3rem auto;
  max-width: 800px;
  width: 100%;
  padding: 0 1rem;
}

.form-container {
  @include cdr-text-body-400();
  color: $cdr-color-text-primary;
  padding: 2rem 3rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.rarity {
  font-style: italic;
  margin-bottom: 1rem;
}

.item-form {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.generate-button {
  margin-top: 2rem;
}

.read-aloud {
  background-color: $cdr-color-background-secondary;
  color: $cdr-color-text-secondary;
  padding: 1rem 2rem;
  font-style: italic;
  margin-top: 1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.export-section {
  margin-top: 1.5rem;

  h3 {
    margin-bottom: 1rem;
  }

  .button-group {
    margin-top: 1.5rem;
  }
}

.sidebar {
  $background-color: #f4f4f4;
  $active-color: #ffffff;
  $hover-background-color: #f0f0f0;
  $default-background-color: #e0e0e0;
  $active-border-color: #007BFF;
  $transition-speed: 0.3s;

  transition: transform 0.3s ease;
  background-color: $background-color;
  padding: 1rem;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 3;

  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
  }

  .saved-items {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 4px;

      &.active {
        .item-button {
          background-color: $active-color;
          border-left-color: $active-border-color;
          font-weight: bold;
        }
      }

      .item-button {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 12px 20px;
        font-size: 1.5rem;
        text-align: left;
        background-color: $default-background-color;
        border: none;
        color: inherit;
        cursor: pointer;
        border-left: 5px solid transparent;
        transition: background-color $transition-speed, border-left-color $transition-speed;

        &:hover {
          background-color: $hover-background-color;
        }

        &:focus {
          outline: none;
          border-left-color: $active-border-color;
        }
      }
    }
  }
}

// Responsive styles
@media (max-width: 768px) {
  .main-container {
    margin: 1rem auto;
  }

  .form-container {
    padding: 1.5rem;
  }

  .button-group {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
}
</style>