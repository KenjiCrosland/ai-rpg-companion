<template>
  <GeneratorLayout :premium="premium">
    <template #sidebar>
      <div class="sidebar-content">
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
        <DataManagerModal :opened="showDataManagerModal" @update:opened="showDataManagerModal = $event"
          :premium="premium" currentApp="savedItems" />
      </div>
    </template>

    <div class="main-container">
      <!-- LANDING STATE: Three-zone layout -->
      <div class="landing-wrapper" v-if="!magicItemDescription && !loadingItem">

        <!-- ZONE 1: Hero header -->
        <div class="hero-header">
          <div class="brand-line">
            <span class="brand-name">Kenji's Item Generator</span>
            <span v-if="!premium" class="version-pill">Free</span>
            <span v-else class="version-pill premium">Premium</span>
          </div>
          <h1>Craft Unique D&D 5e Magic Items in Seconds</h1>
          <p class="value-prop">Generate balanced magic items with lore, quest hooks, and Homebrewery export — powered
            by
            AI.</p>
        </div>

        <!-- ZONE 2: Form card -->
        <div class="form-card">
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
              placeholder="Enter any details about the item lore" class="item-lore-details">
            </cdr-input>
            <cdr-button class="generate-button" type="submit" :full-width="true">Generate Magic Item</cdr-button>
          </form>
        </div>

        <!-- ZONE 3: Footer meta -->
        <div class="footer-meta">
          <p v-if="!premium" class="limit-info">
            Item generation is unlimited. Lore Builder and Quest Hook features are limited to 5/day on the free plan.
            <cdr-link href="https://cros.land/dnd-5e-magic-item-generator-premium-version/">Go Premium for unlimited
              access
              &rarr;</cdr-link>
          </p>
          <p v-else class="limit-info">
            All features unlimited. Export your creations in Homebrewery-compatible markdown format.
          </p>
        </div>
      </div>

      <!-- Tabbed Content for Generated Item (UNCHANGED) -->
      <div v-if="magicItemDescription && !loadingItem" class="form-container">
        <div v-if="!premium" class="premium-banner">
          Lore Builder and Quest Hooks are limited to 5 generations/day on the free plan.
          <cdr-link href="https://cros.land/dnd-5e-magic-item-generator-premium-version/">Go Premium for unlimited
            access
            &rarr;</cdr-link>
        </div>
        <Tabs :activeIndex="activeTabIndex" @tabChange="activeTabIndex = $event">
          <TabPanel label="Item Details">
            <!-- View Mode -->
            <div v-if="!isEditing">
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
                <cdr-button @click="startEditing" modifier="secondary">Edit Item</cdr-button>
                <cdr-button @click="deleteItem" modifier="dark">Delete Item</cdr-button>
              </div>

              <!-- Export Section -->
              <div class="export-section">
                <h3>Export Magic Item</h3>
                <p class="export-description">
                  Copy your item details in different formats. The markdown format works perfectly with
                  <cdr-link href="https://homebrewery.naturalcrit.com/new" target="_blank">Homebrewery</cdr-link>
                  for creating beautifully formatted D&D handouts.
                </p>

                <div class="export-options">
                  <div class="export-option">
                    <cdr-button @click="copyAsMarkdown" modifier="secondary" :full-width="true">
                      Copy as Markdown
                    </cdr-button>
                    <p class="option-description">For use with Homebrewery or other markdown tools</p>
                  </div>

                  <div class="export-option">
                    <cdr-button @click="copyAsPlainText" modifier="secondary" :full-width="true">
                      Copy as Plain Text
                    </cdr-button>
                    <p class="option-description">Simple format for notes or sharing in chat</p>
                  </div>
                </div>

                <div class="export-tip">
                  <strong>Quick tip:</strong> After copying as markdown, visit
                  <cdr-link href="https://homebrewery.naturalcrit.com/new"
                    target="_blank">homebrewery.naturalcrit.com</cdr-link>,
                  paste your content on the left side, and watch it transform into a beautiful D&D-styled document!
                </div>
              </div>
            </div>

            <!-- Edit Mode -->
            <div v-else class="edit-form">
              <h2>Edit Magic Item</h2>

              <cdr-input v-model="editForm.name" label="Item Name" background="secondary" class="edit-field" />

              <cdr-select v-model="editForm.item_type" label="Item Type" :options="itemTypeOptions"
                class="edit-field" />

              <cdr-select v-model="editForm.rarity" label="Rarity" :options="rarityOptions" class="edit-field" />

              <cdr-input v-model="editForm.modifier_sentence" label="Modifier Sentence (optional)"
                background="secondary" class="edit-field">
                <template #helper-text-bottom>
                  Example: "While wearing this armor, you gain a +1 bonus to AC."
                </template>
              </cdr-input>

              <div class="features-edit">
                <label class="feature-label">Features</label>
                <div v-for="(feature, index) in editForm.featuresArray" :key="index" class="feature-edit-row">
                  <cdr-input v-model="feature.name" label="Feature Name" background="secondary"
                    class="feature-name-input">
                    <template #helper-text-bottom>
                      Leave blank to auto-generate a name
                    </template>
                  </cdr-input>
                  <cdr-input v-model="feature.description" label="Description" background="secondary" :rows="3"
                    tag="textarea" class="feature-desc-input" />
                  <div class="feature-actions">
                    <cdr-button v-if="premium" @click="generateFeature(index)" modifier="secondary" size="small"
                      :disabled="feature.generating">
                      {{ feature.generating ? 'Generating...' : 'Generate Feature' }}
                    </cdr-button>
                    <span v-else class="premium-feature-label">
                      <cdr-link href="https://cros.land/dnd-5e-magic-item-generator-premium-version/">Generate Feature
                        (Premium)</cdr-link>
                    </span>
                    <cdr-button @click="removeFeature(index)" modifier="dark" size="small">
                      Remove
                    </cdr-button>
                  </div>
                </div>
                <cdr-button @click="addFeature" modifier="secondary" size="small">
                  + Add Feature
                </cdr-button>
              </div>

              <cdr-input v-model="editForm.physical_description" label="Physical Description" background="secondary"
                :rows="4" tag="textarea" class="edit-field" />

              <cdr-input v-model="editForm.lore" label="Lore" background="secondary" :rows="5" tag="textarea"
                class="edit-field" />

              <div class="button-group">
                <cdr-button @click="saveEdit">Save Changes</cdr-button>
                <cdr-button @click="cancelEdit" modifier="secondary">Cancel</cdr-button>
              </div>
            </div>
          </TabPanel>

          <TabPanel label="Lore Builder">
            <LoreBuilderTab :item="magicItemDescription" @updated-item="handleUpdatedItem" :premium="premium" />
          </TabPanel>

          <TabPanel label="Quest Hooks">
            <QuestHookTab :item="magicItemDescription" @updated-item="handleUpdatedItem" :premium="premium" />
          </TabPanel>
        </Tabs>
      </div>

      <div v-if="loadingItem" class="form-container">
        <item-skeleton />
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { CdrInput, CdrButton, CdrSelect, CdrLink } from "@rei/cedar";
import GeneratorLayout from './GeneratorLayout.vue';
import { generateGptResponse } from "../util/open-ai.mjs";
import { convertItemToMarkdown } from '../util/convertToMarkdown.mjs';
import determineFeaturesAndBonuses from '../util/determine-features-and-bonuses.mjs';
import ItemSkeleton from './skeletons/ItemSkeleton.vue';
import QuestHookTab from './item-generator-tabs/QuestHookTab.vue';
import LoreBuilderTab from './item-generator-tabs/LoreBuilderTab.vue';
import DataManagerModal from './DataManagerModal.vue';
import Tabs from './tabs/Tabs.vue';
import TabPanel from './tabs/TabPanel.vue';
import { useToast } from '../composables/useToast';

const toast = useToast();

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
const showDataManagerModal = ref(false);
const activeTabIndex = ref(0);
const isEditing = ref(false);
const editForm = ref({
  name: '',
  item_type: '',
  rarity: '',
  modifier_sentence: '',
  featuresArray: [],
  physical_description: '',
  lore: ''
});

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
  'Common': 'Minor magical properties or effects with no combat bonuses. Purely cosmetic or minor utility effects. Save DC: N/A (no saves required).',
  'Uncommon': 'Either a +1 bonus to AC/attack rolls OR one useful magical feature (not both). Save DC: 13.',
  'Rare': 'Either a +2 bonus OR a +1 bonus with a moderate feature OR one powerful feature without bonus. Save DC: 15.',
  'Very Rare': 'Either a +3 bonus (possibly with minor feature) OR +2 with powerful feature OR +1 with very powerful feature. Save DC: 17.',
  'Legendary': '+3 with multiple features OR +2 with legendary features OR multiple legendary features. Very rarely +4. Save DC: 19+'
};

const generateMagicItem = async () => {
  if (!itemType.value) {
    toast.warning('Please select an item type.');
    return;
  }
  if (!rarity.value) {
    const randomIndex = Math.floor(Math.random() * rarityOptions.length);
    rarity.value = rarityOptions[randomIndex];
  }

  const featuresAndBonuses = determineFeaturesAndBonuses(rarity.value, itemType.value);
  magicItemDescription.value = null;

  const effectDefsString = Object.entries(featuresAndBonuses.effectDefinitions)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  const prompt = `Generate a detailed Dungeons & Dragons 5e magic item description adhering to the provided rarity guidelines and incomplete information.

IMPORTANT D&D 5e DESIGN RULES:
- Only Armor and Weapons receive numerical bonuses (+1, +2, etc.) consistently
- Rods, Staffs, Rings, and Wands can occasionally have bonuses (rare)
- Common items are purely cosmetic/utility with NO combat benefits
- Higher rarity does not always mean higher bonus - features matter more
- Balance bonuses with features: high bonus = fewer features
- Use the effect definitions below to understand the appropriate power level for each feature type

${itemType.value === 'Potion' ? `SPECIAL RULES FOR POTIONS:
- Potions are CONSUMABLE items (single use, destroyed after drinking)
- Effects are TEMPORARY (typically 1 hour, or until triggered/expended)
- Potions SET stats rather than add bonuses (e.g., "Strength becomes 25" not "+5 to Strength")
- Describe the liquid's appearance, color, and taste in physical_description
- Common potions: minor healing (2d4+2), simple buffs
- Uncommon potions: moderate healing (4d4+4), useful buffs (resistance, advantage on checks)
- Rare potions: greater healing (8d4+8), powerful buffs (flight, invisibility)
- Very Rare potions: superior healing (10d4+20), very powerful effects (giant strength 25, heroism)
- Legendary potions: supreme healing (20d4+20), transformative effects (giant strength 29, invulnerability)
- Duration should match rarity: Common/Uncommon (10 min - 1 hour), Rare+ (1 hour - 8 hours)
` : ''}
EFFECT DEFINITIONS:
${effectDefsString}

ITEM STRUCTURE TO COMPLETE:
{
  "name": "${itemName.value || '[Generate an evocative, fantasy-appropriate name]'}",
  "item_type": "${itemType.value}",
  "rarity": "${rarity.value}",
  "bonus": "${featuresAndBonuses.bonus}",
  "modifier_sentence": "${constructModifierSentence(featuresAndBonuses.bonus, itemType.value)}",
  "feature_guidelines": "${rarityGuidelines[rarity.value]}",
  "feature_count": ${featuresAndBonuses.feature_count},
  "features": ${JSON.stringify(featuresAndBonuses.features)},
  "reason_for_rarity_level": "[Explain why this item fits its rarity based on the guidelines above]",
  "physical_description": "[2-3 sentences describing the item's appearance, feel, and any visual magical effects${itemType.value === 'Potion' ? '. For potions: describe the liquid color, consistency, swirls, particles, smell, and taste' : ''}]",
  "lore": "${itemLore.value || '[Create compelling backstory: origin, creator, historical significance, or legendary tales]'}"
}

INSTRUCTIONS:
1. Replace all placeholder values with actual content
2. For the "features" object: 
   - Replace BOTH the key names (e.g., "feature_name_1") AND the values (e.g., "useful_magical_effect")
   - Use descriptive, thematic feature names as keys (e.g., "Blazing Strike", "Protective Aura", "Ethereal Shift")
   - Replace effect types with specific, mechanically-detailed descriptions as values
3. Include specific mechanics: damage dice, save DCs, spell levels, recharge times, ranges, durations
4. ${itemType.value === 'Potion' ? 'For potions: Always include duration, specify if it is consumed on use, describe immediate and ongoing effects' : 'Ensure all features align with the rarity guidelines and effect definitions'}
5. Make features synergistic and thematic
6. Write features in D&D 5e stat block style (clear, concise, mechanical)

EXAMPLE of correct "features" format:
Instead of: {"feature_name_1": "useful_magical_effect"}
Do this: {"Verdant Resilience": "While wearing this armor, you have advantage on saving throws against poison and resistance to poison damage."}${itemType.value === 'Potion' ? '\n\nPOTION EXAMPLE:\n{"Giant\'s Might": "Your Strength score becomes 25 for 1 hour. You have advantage on Strength checks and Strength saving throws during this time.", "Enhanced Fortitude": "For the duration, you gain 20 temporary hit points."}' : ''}`;

  try {
    loadingItem.value = true;
    const response = await generateGptResponse(prompt, itemValidation, 3);
    magicItemDescription.value = JSON.parse(response);
    magicItemDescription.value.rarity = parseRarity(magicItemDescription.value.rarity);
    magicItemDescription.value.questHooks = [];
    loadingItem.value = false;
    saveItem(magicItemDescription.value);
    const index = savedItems.value.findIndex((item) => item.name === magicItemDescription.value.name);
    selectItem(index);
    activeTabIndex.value = 0;
    toast.success('Magic item generated and saved.');
  } catch (error) {
    console.error("Error generating magic item:", error);
    toast.error('Failed to generate magic item. Please try again.');
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
  if (!bonus || bonus === '0') return '';

  switch (itemType) {
    case 'Armor':
      return `While wearing this armor, you gain a ${bonus} bonus to AC.`;
    case 'Weapon':
      return `You have a ${bonus} bonus to attack and damage rolls made with this weapon.`;
    case 'Rod':
    case 'Staff':
      return `While holding this ${itemType.toLowerCase()}, you gain a ${bonus} bonus to spell attack rolls and to the saving throw DCs of your spells.`;
    case 'Ring':
      return `While wearing this ring, you gain a ${bonus} bonus to AC and saving throws.`;
    case 'Wand':
      return `While holding this wand, you gain a ${bonus} bonus to spell attack rolls.`;
    default:
      return '';
  }
}

const parseRarity = (rarity) => {
  if (!rarity) return '';
  return rarity.split(' // ')[0];
}

const copyAsMarkdown = () => {
  const markdownContent = convertItemToMarkdown(magicItemDescription.value);

  if (markdownContent) {
    navigator.clipboard.writeText(markdownContent);
    toast.success('Copied as markdown!');
  } else {
    toast.error('No content available to copy.');
  }
};

const copyAsPlainText = () => {
  let plainText = `${magicItemDescription.value.name}\n`;
  plainText += `${magicItemDescription.value.item_type}, ${magicItemDescription.value.rarity}\n\n`;

  if (magicItemDescription.value.modifier_sentence) {
    plainText += `${magicItemDescription.value.modifier_sentence}\n\n`;
  }

  plainText += `Features:\n`;
  Object.entries(magicItemDescription.value.features).forEach(([feature, description]) => {
    plainText += `• ${feature}: ${description}\n`;
  });

  plainText += `\nDescription:\n${magicItemDescription.value.physical_description}\n`;
  plainText += `\nLore:\n${magicItemDescription.value.lore}\n`;

  navigator.clipboard.writeText(plainText);
  toast.success('Copied as plain text!');
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

const detectEditChanges = () => {
  if (!isEditing.value) return;

  const original = magicItemDescription.value;

  if (editForm.value.name !== original.name) return true;
  if (editForm.value.item_type !== original.item_type) return true;
  if (editForm.value.rarity !== original.rarity) return true;
  if (editForm.value.modifier_sentence !== (original.modifier_sentence || '')) return true;
  if (editForm.value.physical_description !== (original.physical_description || '')) return true;
  if (editForm.value.lore !== (original.lore || '')) return true;

  const originalFeatures = Object.entries(original.features || {}).map(([name, description]) => ({
    name,
    description
  }));

  if (editForm.value.featuresArray.length !== originalFeatures.length) return true;

  for (let i = 0; i < editForm.value.featuresArray.length; i++) {
    if (editForm.value.featuresArray[i].name !== originalFeatures[i].name ||
      editForm.value.featuresArray[i].description !== originalFeatures[i].description) {
      return true;
    }
  }

  return false;
};

const selectItem = (index) => {
  if (isEditing.value && detectEditChanges()) {
    const confirmed = confirm('You have unsaved changes. Are you sure you want to switch items without saving?');
    if (!confirmed) {
      return;
    }
  }

  isEditing.value = false;

  activeItemIndex.value = index;
  magicItemDescription.value = savedItems.value[index];
  itemName.value = magicItemDescription.value.name;
  rarity.value = magicItemDescription.value.rarity;
  itemType.value = magicItemDescription.value.item_type;
  itemLore.value = magicItemDescription.value.lore || '';
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
  isEditing.value = false;
};

const startEditing = () => {
  const featuresArray = Object.entries(magicItemDescription.value.features || {}).map(([name, description]) => ({
    name,
    description
  }));

  editForm.value = {
    name: magicItemDescription.value.name || '',
    item_type: magicItemDescription.value.item_type || '',
    rarity: magicItemDescription.value.rarity || '',
    modifier_sentence: magicItemDescription.value.modifier_sentence || '',
    featuresArray: featuresArray,
    physical_description: magicItemDescription.value.physical_description || '',
    lore: magicItemDescription.value.lore || ''
  };
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
};

const saveEdit = () => {
  const features = {};
  editForm.value.featuresArray.forEach(feature => {
    const featureName = feature.name.trim() || 'Unnamed Feature';
    const featureDesc = feature.description.trim() || '(No description provided)';
    features[featureName] = featureDesc;
  });

  magicItemDescription.value = {
    ...magicItemDescription.value,
    name: editForm.value.name,
    item_type: editForm.value.item_type,
    rarity: editForm.value.rarity,
    modifier_sentence: editForm.value.modifier_sentence,
    features: features,
    physical_description: editForm.value.physical_description,
    lore: editForm.value.lore,
    feature_count: Object.keys(features).length
  };

  if (activeItemIndex.value !== null) {
    savedItems.value[activeItemIndex.value] = magicItemDescription.value;
    localStorage.setItem('savedItems', JSON.stringify(savedItems.value));
  }

  isEditing.value = false;
};

const addFeature = () => {
  editForm.value.featuresArray.push({
    name: '',
    description: '',
    generating: false
  });
};

const removeFeature = (index) => {
  editForm.value.featuresArray.splice(index, 1);
};

const generateFeature = async (index) => {
  // Premium-only: free users see a link instead of this button,
  // but keep this guard as a safety net
  if (!props.premium) {
    return;
  }

  const feature = editForm.value.featuresArray[index];

  if (feature.description && feature.description.trim()) {
    const featureName = feature.name.trim() || 'Unnamed Feature';
    const confirmed = confirm(`This will erase and regenerate this feature based on the feature name "${featureName}". Proceed?`);
    if (!confirmed) {
      return;
    }
  }

  feature.generating = true;

  const rarityToEffectLevel = {
    'Common': 'minor_utility_or_cosmetic_effect',
    'Uncommon': 'useful_magical_effect',
    'Rare': 'moderate_magical_effect OR powerful_magical_effect',
    'Very Rare': 'powerful_magical_effect OR very_powerful_magical_effect',
    'Legendary': 'legendary_magical_effect'
  };

  const effectLevel = rarityToEffectLevel[editForm.value.rarity] || 'useful_magical_effect';

  const featurePrompt = `Generate a single D&D 5e magic item feature for the following item:

Item Name: ${editForm.value.name || magicItemDescription.value.name}
Item Type: ${editForm.value.item_type}
Rarity: ${editForm.value.rarity}
Existing Features: ${editForm.value.featuresArray.filter((f, i) => i !== index && f.description).map(f => f.name).join(', ') || 'None yet'}
${feature.name ? `Desired Feature Name: ${feature.name}` : ''}

Create a feature appropriate for ${editForm.value.rarity} rarity (${effectLevel}).

Return ONLY a JSON object with this structure:
{
  "name": "Feature Name (if not provided, create a thematic name)",
  "description": "Complete mechanical description in D&D 5e style, including damage dice, save DCs, durations, ranges, etc."
}

The feature should:
- Be balanced for ${editForm.value.rarity} rarity
- Be thematically consistent with the item
- Include specific game mechanics (not vague descriptions)
- Complement existing features without being redundant`;

  try {
    const response = await generateGptResponse(featurePrompt, validateFeature, 3);
    const generatedFeature = JSON.parse(response);

    if (!feature.name.trim()) {
      feature.name = generatedFeature.name;
    }
    feature.description = generatedFeature.description;
  } catch (error) {
    console.error('Error generating feature:', error);
    toast.error('Failed to generate feature. Please try again.');
  } finally {
    feature.generating = false;
  }
};

const validateFeature = (jsonString) => {
  try {
    const jsonObj = JSON.parse(jsonString);
    return jsonObj.name && jsonObj.description;
  } catch (error) {
    return false;
  }
};

onMounted(() => {
  loadSavedItems();
});
</script>

<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.main-container {
  margin: 3rem auto;
  max-width: 800px;
  width: 100%;
  padding: 0 1rem;
}

/* ========================================
   LANDING PAGE: Three-zone layout
   ======================================== */

.landing-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

/* ZONE 1: Hero header */
.hero-header {
  text-align: center;
  padding: 2rem 1rem 2.5rem;

  .brand-line {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .brand-name {
    font-size: 1.4rem;
    font-weight: 500;
    color: $cdr-color-text-secondary;
    letter-spacing: 0.02em;
  }

  .version-pill {
    display: inline-block;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 0.2rem 0.8rem;
    border-radius: 100px;
    background-color: #ededed;
    color: $cdr-color-text-secondary;

    &.premium {
      background-color: #fdf3e0;
      color: #9c6a0a;
    }
  }

  h1 {
    font-size: 3.2rem;
    line-height: 1.15;
    margin: 0 0 0.75rem;
    color: $cdr-color-text-primary;
  }

  .value-prop {
    font-size: 1.6rem;
    font-weight: 400;
    color: $cdr-color-text-secondary;
    margin: 0;
  }
}

/* ZONE 2: Form card */
.form-card {
  background-color: #ffffff;
  border: 1px solid #e2e2e2;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  padding: 2.5rem 3rem;
}

/* ZONE 3: Footer meta */
.footer-meta {
  text-align: center;
  padding: 1.5rem 1rem 0;

  .limit-info {
    font-size: 1.2rem;
    color: $cdr-color-text-secondary;
    margin: 0;
    line-height: 1.6;
  }
}

/* ========================================
   PREMIUM INDICATORS
   ======================================== */

.premium-banner {
  font-size: 1.2rem;
  color: $cdr-color-text-secondary;
  background-color: #fdf8ef;
  border: 1px solid #f0e4cc;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  line-height: 1.5;
}

.premium-feature-label {
  display: inline-flex;
  align-items: center;
  font-size: 1.2rem;
  color: $cdr-color-text-secondary;
  padding: 0.4rem 0;
}

/* ========================================
   POST-GENERATION: Tabbed content card
   ======================================== */

.form-container {
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

// Export Section Styles
.export-section {
  margin-top: 3rem;
  padding: 1.5rem;
  background-color: $cdr-color-background-secondary;
  border-radius: 8px;

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .export-description {
    margin-bottom: 1.5rem;
    line-height: 1.5;
    color: $cdr-color-text-secondary;
  }

  .export-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .export-option {
    .option-description {
      margin-top: 0.5rem;
      font-size: 0.875rem;
      color: $cdr-color-text-secondary;
      font-style: italic;
    }
  }

  .export-tip {
    padding: 1rem;
    background-color: rgba($cdr-color-text-brand, 0.05);
    border-left: 3px solid $cdr-color-text-brand;
    border-radius: 4px;
    font-size: 0.9rem;
    line-height: 1.5;
  }
}

.edit-form {
  .edit-field {
    margin-bottom: 1.5rem;
  }

  .features-edit {
    margin-bottom: 2rem;

    .feature-label {
      display: block;
      font-weight: 500;
      margin-bottom: 1rem;
      color: $cdr-color-text-primary;
    }

    .feature-edit-row {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem;
      background-color: $cdr-color-background-secondary;
      border-radius: 4px;
      margin-bottom: 1rem;
      position: relative;

      .feature-actions {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
        margin-top: 0.5rem;
      }
    }

    .feature-name-input {
      flex: 1;
    }

    .feature-desc-input {
      flex: 2;
    }
  }
}

.sidebar-content {
  $background-color: #f4f4f4;
  $active-color: #ffffff;
  $hover-background-color: #f0f0f0;
  $default-background-color: #e0e0e0;
  $active-border-color: #007BFF;
  $transition-speed: 0.3s;

  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;

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

// Responsive
@media (max-width: 768px) {
  .main-container {
    margin: 1rem auto;
  }

  .hero-header {
    padding: 1.5rem 0.5rem 2rem;

    h1 {
      font-size: 2.4rem;
    }
  }

  .form-card {
    padding: 1.5rem;
    border-radius: 8px;
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

  .export-section {
    .export-options {
      grid-template-columns: 1fr;
    }
  }
}
</style>