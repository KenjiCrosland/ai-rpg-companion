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
      </div>
    </template>

    <div class="main-container">
      <!-- DataManagerModal component -->
      <DataManagerModal :opened="showDataManagerModal" @update:opened="showDataManagerModal = $event"
        :premium="premium" currentApp="savedItems" />
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
            <cdr-select v-model="itemType" label="Item Type (optional)" prompt="Random" :options="itemTypeOptions" />
            <cdr-select v-model="itemOrigin" label="Item Origin (optional)" prompt="Random" :options="originOptions">
              <template #helper-text-bottom>
                Influences theme, aesthetics, and naming. Auto-selected when name and lore are blank.
              </template>
            </cdr-select>
            <cdr-input :rows="7" tag="textarea" v-model="itemLore" background="secondary" label="Item Lore (optional)"
              placeholder="Enter any details about the item lore" class="item-lore-details">
            </cdr-input>
            <cdr-button class="generate-button" type="submit" :full-width="true">Generate Magic Item</cdr-button>
          </form>
        </div>

        <!-- ZONE 3: Footer meta -->
        <div class="footer-meta">
          <!-- Free users: Show message + unlock button -->
          <div v-if="!premium">
            <p>
              Item generation is unlimited. Lore Builder and Quest Hook features are limited to 5 per 24 hours. Item
              data is saved on this browser. To save/load item data for use in another computer or browser requires a
              premium Patreon subscription.
            </p>
            <div class="patreon-universal-button">
              <a :href="patreonLoginUrl">
                <div class="patreon-responsive-button-wrapper">
                  <div class="patreon-responsive-button">
                    <img class="patreon_logo"
                      src="https://cros.land/wp-content/plugins/patreon-connect/assets/img/patreon-logomark-on-coral.svg"
                      alt="Unlock with Patreon"> Unlock with Patreon
                  </div>
                </div>
              </a>
            </div>
          </div>

          <!-- Premium users: Show save/load button -->
          <div v-else>
            <p>
              All features unlimited. Item data is saved on this browser. Export to a file to use on another device.
            </p>
            <cdr-button modifier="dark" @click="showDataManagerModal = true">
              Save/Load Data from a File
            </cdr-button>
          </div>
        </div>
      </div>

      <!-- Tabbed Content for Generated Item -->
      <div v-if="magicItemDescription && !loadingItem" class="form-container">
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
                  <cdr-link href="https://homebrewery.naturalcrit.com" target="_blank">Homebrewery</cdr-link>
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

              <cdr-select v-model="editForm.item_type" label="Item Type" :options="concreteItemTypeOptions"
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

      <!-- Footer below item content (separate card) -->
      <div class="footer-meta" v-if="magicItemDescription && !loadingItem">
        <!-- Free users: Show message + unlock button -->
        <div v-if="!premium">
          <p>
            Item generation is unlimited. Lore Builder and Quest Hook features are limited to 5 per 24 hours. Item
            data is saved on this browser. To save/load item data for use in another computer or browser requires a
            premium Patreon subscription.
          </p>
          <div class="patreon-universal-button">
            <a :href="patreonLoginUrl">
              <div class="patreon-responsive-button-wrapper">
                <div class="patreon-responsive-button">
                  <img class="patreon_logo"
                    src="https://cros.land/wp-content/plugins/patreon-connect/assets/img/patreon-logomark-on-coral.svg"
                    alt="Unlock with Patreon"> Unlock with Patreon
                </div>
              </div>
            </a>
          </div>
        </div>

        <!-- Premium users: Show save/load button -->
        <div v-else>
          <p>
            All features unlimited. Item data is saved on this browser. Export to a file to use on another device.
          </p>
          <cdr-button modifier="dark" @click="showDataManagerModal = true">
            Save/Load Data from a File
          </cdr-button>
        </div>
      </div>

      <div v-if="loadingItem" class="form-container">
        <item-skeleton />
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { CdrInput, CdrButton, CdrSelect, CdrLink } from "@rei/cedar";
import GeneratorLayout from '@/components/GeneratorLayout.vue';
import { generateGptResponse } from "@/util/open-ai.mjs";
import { convertItemToMarkdown } from '@/util/convertToMarkdown.mjs';
import determineFeaturesAndBonuses from '@/util/determine-features-and-bonuses.mjs';
import ItemSkeleton from '@/components/skeletons/ItemSkeleton.vue';
import QuestHookTab from './components/QuestHookTab.vue';
import LoreBuilderTab from './components/LoreBuilderTab.vue';
import DataManagerModal from '@/components/DataManagerModal.vue';
import Tabs from '@/components/tabs/Tabs.vue';
import TabPanel from '@/components/tabs/TabPanel.vue';
import { useToast } from '@/composables/useToast';

const toast = useToast();

const props = defineProps({
  premium: {
    type: Boolean,
    default: false
  }
});

const patreonLoginUrl = computed(() => {
  const returnUrl = encodeURIComponent(window.location.href);
  return `https://cros.land/patreon-flow/?patreon-login=yes&patreon-final-redirect=${returnUrl}`;
});

const itemName = ref('');
const rarity = ref('');
const itemType = ref('');
const itemOrigin = ref('');
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

// Same list used in edit mode and for random selection
const concreteItemTypeOptions = itemTypeOptions;

const originOptions = [
  'Abyssal',
  'Alchemical',
  'Aberrant',
  'Astral',
  'Celestial',
  'Deep Sea',
  'Draconic',
  'Dwarven',
  'Elven',
  'Elemental',
  'Fey',
  'Giant',
  'Gnomish',
  'Goblinoid',
  'Infernal',
  'Lycanthropic',
  'Necromantic',
  'Orcish',
  'Primordial',
  'Shadow',
  'Technomagical',
  'Vampiric',
  'Verdant',
  'Wizardry'
];

const rarityGuidelines = {
  'Common': 'Minor magical properties or effects with no combat bonuses. Purely cosmetic or minor utility effects. Save DC: N/A (no saves required).',
  'Uncommon': 'Either a +1 bonus to AC/attack rolls OR one useful magical feature (not both). Save DC: 13.',
  'Rare': 'Either a +2 bonus OR a +1 bonus with a moderate feature OR one powerful feature without bonus. Save DC: 15.',
  'Very Rare': 'Either a +3 bonus (possibly with minor feature) OR +2 with powerful feature OR +1 with very powerful feature. Save DC: 17.',
  'Legendary': '+3 with multiple features OR +2 with legendary features OR multiple legendary features. Very rarely +4. Save DC: 19+'
};

const generateMagicItem = async () => {
  if (!rarity.value) {
    const randomIndex = Math.floor(Math.random() * rarityOptions.length);
    rarity.value = rarityOptions[randomIndex];
  }

  // Resolve item type: use selection, or pick randomly if empty/Random
  const resolvedItemType = (!itemType.value || itemType.value === 'Random')
    ? concreteItemTypeOptions[Math.floor(Math.random() * concreteItemTypeOptions.length)]
    : itemType.value;

  // Origin logic:
  // - User explicitly picked from dropdown → always use it
  // - User typed a name or lore → skip random origin (they have a vision)
  // - Blank canvas → pick random origin for variety
  let resolvedOrigin = '';
  if (itemOrigin.value) {
    resolvedOrigin = itemOrigin.value;
  } else if (!itemName.value.trim() && !itemLore.value.trim()) {
    resolvedOrigin = originOptions[Math.floor(Math.random() * originOptions.length)];
  }

  // Pre-select a physical form for Wondrous Items
  const wondrousItemForms = [
    'boots', 'gloves', 'gauntlets', 'belt', 'cloak', 'bag', 'lantern', 'mask',
    'goggles', 'compass', 'hourglass', 'mirror', 'musical instrument', 'figurine',
    'orb', 'brazier', 'carpet', 'helm', 'circlet', 'tattoo', 'earring', 'brooch',
    'chalice', 'tome', 'candle', 'gemstone', 'set of dice', 'map', 'feather',
    'bone carving', 'tooth', 'coin', 'idol', 'pendulum', 'prism', 'totem',
    'monocle', 'quill', 'veil', 'crown', 'locket', 'mantle', 'sash', 'fan',
    'music box', 'puzzle box', 'sundial', 'spyglass', 'bell', 'incense burner',
    'dreamcatcher', 'snow globe', 'jar', 'saddle', 'banner', 'tapestry',
    'chess piece', 'hand mirror', 'armband', 'anklet', 'nose ring', 'headband',
    'pauldron', 'eye patch', 'scarf', 'cape', 'tabard', 'satchel', 'quiver',
    'tankard', 'pipe', 'lodestone', 'wind chime', 'prayer beads', 'deck of cards'
  ];
  const selectedWondrousForm = wondrousItemForms[Math.floor(Math.random() * wondrousItemForms.length)];

  // Pre-select a weapon type for Weapons
  const weaponTypes = [
    'longsword', 'shortsword', 'greatsword', 'rapier', 'scimitar', 'dagger',
    'handaxe', 'battleaxe', 'greataxe', 'warhammer', 'maul', 'mace',
    'morningstar', 'flail', 'spear', 'javelin', 'halberd', 'glaive', 'pike',
    'trident', 'lance', 'whip', 'longbow', 'shortbow', 'light crossbow',
    'heavy crossbow', 'hand crossbow', 'sling', 'war pick', 'quarterstaff',
    'club', 'greatclub', 'sickle', 'blowgun', 'net', 'double-bladed scimitar'
  ];
  const selectedWeaponType = weaponTypes[Math.floor(Math.random() * weaponTypes.length)];

  // Pre-select a naming palette — linked to origin when available for coherence
  const originPaletteMap = {
    'Abyssal': 'Abyssal-inspired: guttural, chaotic (e.g., Ghar\'zuul, Rotmaw, Vilesung)',
    'Alchemical': 'Latin/Roman-inspired: formal, structured (e.g., Aurelium, Ferrata, Nexus Imperium)',
    'Aberrant': 'Alien and unsettling: unpronounceable clusters, wrong-sounding (e.g., Xith\'vaar, Qolenth, Uurm)',
    'Astral': 'Greek-inspired: mythological weight, melodic (e.g., Thyrsion, Aeoliphos, Kymera)',
    'Celestial': 'Latin/Roman-inspired: formal, radiant (e.g., Solverium, Luxcaris, Auranthis)',
    'Deep Sea': 'Polynesian-inspired: flowing vowels, oceanic (e.g., Moanakai, Tahurei, Levaleva)',
    'Draconic': 'Draconic: harsh sibilants, ancient weight (e.g., Szarthrax, Vyrmokk, Kaelsithur)',
    'Dwarven': 'Dwarven/Germanic-inspired: guttural, industrial (e.g., Grundrak, Hammerfel, Eisenmark)',
    'Elven': 'Elvish/Sindarin-inspired: elegant, vowel-rich (e.g., Galadhriel, Thindol, Nimrathel)',
    'Elemental': 'Norse-inspired: harsh consonants, primal force (e.g., Stormbreak, Ashveil, Grimthorn)',
    'Fey': 'Fey-inspired: whimsical, unexpected (e.g., Thistlewick, Moonpetal, Laughing Brook)',
    'Giant': 'Norse-inspired: heavy, booming (e.g., Thrundvalk, Jotmark, Bergskald)',
    'Gnomish': 'Gnomish: clever, playful, mechanical (e.g., Fizzwocket, Cogsworth, Tinberlin)',
    'Goblinoid': 'Goblin-inspired: sharp, crude, percussive (e.g., Skragbit, Mukgash, Krik-tak)',
    'Infernal': 'Infernal-inspired: sharp, aggressive (e.g., Vex\'tharion, Morkaal, Sazrith)',
    'Lycanthropic': 'Celtic-inspired: earthy, primal (e.g., Branmhor, Caelith, Dunmara)',
    'Necromantic': 'Slavic-inspired: dark, archaic (e.g., Voronsk, Morghul, Kresnik)',
    'Orcish': 'Orcish: brutal, guttural (e.g., Grokthash, Uzgark, Dra\'mok)',
    'Primordial': 'Ancient and alien: pre-language sounds, elemental (e.g., Aath\'kol, Rumblith, Dross)',
    'Shadow': 'Arabic/Persian-inspired: mysterious, flowing (e.g., Qamar al-Sahir, Zafira, Sayyid)',
    'Technomagical': 'Clinical with flair: compound technical-arcane (e.g., Arcanaforge Mark IV, Voltspire, Aethercog)',
    'Vampiric': 'Eastern European-inspired: aristocratic, dark (e.g., Draculesti, Volkhara, Nachtfürst)',
    'Verdant': 'Celtic-inspired: soft consonants, nature references (e.g., Branwen, Caelith, Dunmara)',
    'Wizardry': 'Latin/Roman-inspired: academic, arcane (e.g., Magistrix, Archanum Volaris, Thesophor)'
  };

  // All palettes available for fully random selection (when no origin)
  const allPalettes = [
    ...Object.values(originPaletteMap),
    'Japanese-inspired: clean syllables, natural imagery (e.g., Kagezuki, Honokaji, Tsubasa)',
    'Mesoamerican-inspired: bold sounds, astronomical themes (e.g., Tezcamil, Ixchara, Coatlwing)',
    'West African-inspired: rhythmic, strong vowels (e.g., Asante, Orunla, Ife-kari)'
  ];

  // If origin is set, use its matched palette. Otherwise pick randomly from all palettes.
  const selectedPalette = resolvedOrigin
    ? originPaletteMap[resolvedOrigin]
    : allPalettes[Math.floor(Math.random() * allPalettes.length)];

  // Pre-select a mood/tone
  const moods = [
    'ominous and foreboding — something feels wrong about this item',
    'whimsical and playful — this item has a mischievous personality',
    'tragic and melancholy — this item carries the weight of loss',
    'utilitarian and pragmatic — built for function, not glory',
    'regal and imperious — this item demands respect',
    'wild and untamed — this item pulses with primal energy',
    'eerie and unsettling — beautiful but deeply wrong',
    'warm and protective — this item feels like a guardian',
    'mysterious and cryptic — its true purpose is unclear',
    'brutal and unsubtle — this item was made for war',
    'serene and meditative — this item radiates calm',
    'darkly humorous — this item has an ironic or sardonic edge',
    'ancient and weathered — this item has survived ages',
    'volatile and unstable — this item is barely contained power',
    'cunning and deceptive — this item is not what it appears',
    'joyful and celebratory — this item was made for a great occasion',
    'haunted and sorrowful — something lingers within this item',
    'rebellious and defiant — this item was forged in resistance'
  ];
  const selectedMood = moods[Math.floor(Math.random() * moods.length)];

  // Pre-select an item quirk
  const quirks = [
    'The item is sentient and has a distinct personality. Describe its temperament and how it communicates (speech, emotions, images, etc.).',
    'The item has a minor cosmetic curse — an odd but non-harmful side effect when used (e.g., the wielder\'s hair changes color, they hear faint music, flowers wilt nearby).',
    'The item changes its appearance based on the wielder\'s emotional state.',
    'The item hums, vibrates, or emits a faint sound under certain conditions.',
    'The item was clearly broken at some point and repaired — the mend is visible and part of its identity.',
    'The item is warm to the touch, as if alive or recently near a fire.',
    'The item is uncomfortably cold, and frost forms on surfaces near it.',
    'The item is heavier or lighter than it should be for its size and material.',
    'The item casts no shadow, or casts a shadow that doesn\'t match its shape.',
    'The item smells faintly of something unexpected (e.g., pine forests, iron, cinnamon, ozone, old books).',
    'The item attracts a specific type of small creature (e.g., moths, cats, ravens, fireflies).',
    'The item occasionally whispers a word or phrase in an unknown language.',
    'The item leaves a faint, glowing trail when moved quickly through the air.',
    'The item cannot be set down on bare earth — it always slides or rolls to a hard surface.',
    'The item has a previous owner\'s initials or personal mark scratched into it.',
    'The item slowly rotates to point toward the nearest source of a specific element (fire, water, etc.).',
    'The item has no quirk — it is straightforward and unremarkable in its behavior.'
  ];
  const selectedQuirk = quirks[Math.floor(Math.random() * quirks.length)];

  // Pre-select a lore framing device
  const loreFramings = [
    'Tell the lore as a tavern rumor — secondhand, slightly embellished, with a storyteller\'s flair.',
    'Write the lore as a dry scholar\'s catalog entry — clinical, precise, with academic detachment.',
    'Frame the lore as a warning inscription found on the item itself or its container.',
    'Tell the lore as the dying words of the item\'s previous owner.',
    'Write the lore as a fragment of a longer ballad or epic poem (in prose, not verse).',
    'Frame the lore as a merchant\'s sales pitch — enthusiastic, possibly omitting key dangers.',
    'Tell the lore as a child\'s fairy tale passed down through generations.',
    'Write the lore as an entry from a military officer\'s field report.',
    'Frame the lore as a confession — someone admitting what they did with this item.',
    'Tell the lore as competing accounts — two conflicting stories about the item\'s origin.',
    'Write the lore as a divine prophecy or oracle\'s vision about the item\'s significance.',
    'Frame the lore as graffiti or desperate scratching found in a dungeon near where the item was discovered.',
    'Tell the lore matter-of-factly, as if the item\'s history is well-documented common knowledge.',
    'Write the lore as a letter from the item\'s creator, explaining why they made it.'
  ];
  const selectedLoreFraming = loreFramings[Math.floor(Math.random() * loreFramings.length)];

  // Pre-select a primary material
  const materials = [
    'frozen flame — perpetually burning ice that radiates cold light',
    'living wood — bark that slowly grows and repairs itself, with tiny leaf buds',
    'volcanic glass — black obsidian veined with glowing magma',
    'woven spider silk — impossibly light, stronger than steel, slightly sticky',
    'fossilized bone — ancient creature remains, hard as stone, faintly warm',
    'liquid mercury suspended in crystal — shifting silver that flows within its container',
    'star metal — ore from a fallen meteorite, faintly magnetic, covered in pitting',
    'petrified coral — ocean-born stone in pale pinks and blues, smells of salt',
    'singing crystal — translucent mineral that resonates with a clear tone when struck',
    'shadow-forged iron — metal quenched in magical darkness, absorbs light around it',
    'amber with trapped insects — ancient resin preserving tiny creatures that seem to move',
    'storm-charged copper — green-patinated metal that sparks when gripped tightly',
    'mycelium-threaded leather — fungal fibers woven through cured hide, faintly luminescent',
    'sand-fused glass — desert lightning strike captured in jagged, beautiful form',
    'wyrm scale — a single massive dragon scale, iridescent and impossibly tough',
    'clockwork brass — precision-engineered gears and plates, ticking faintly',
    'ghost wood — wood from a tree that died and was resurrected by magic, pale white',
    'blood iron — metal smelted with alchemical blood, dark red with a metallic sheen',
    'cloud marble — white stone so light it nearly floats, swirled with grey wisps',
    'chitin — polished insectoid shell plates, iridescent greens and purples'
  ];
  const selectedMaterial = materials[Math.floor(Math.random() * materials.length)];

  // Pre-select an era / historical context
  const eras = [
    'recently forged — the item is newly created, its magic still settling, its story just beginning',
    'from a golden age of magic — crafted when magical knowledge was at its peak, before some great decline',
    'ancient pre-civilization artifact — predates all known cultures, its original purpose may be lost',
    'from a fallen empire — created by a once-great civilization that no longer exists',
    'created during a magical catastrophe — forged in desperation during a cataclysm, scarred by that event',
    'cobbled together from battlefield scraps — improvised from broken weapons and armor, unexpectedly powerful',
    'a divine commission — created by mortals at the direct request of a god or powerful entity',
    'smuggled out of a forbidden vault — this item was locked away for good reason',
    'inherited through a bloodline — passed down through generations of a specific family',
    'salvaged from a shipwreck — recovered from the ocean floor, changed by centuries underwater',
    'grown, not made — this item formed naturally through magical processes over centuries',
    'a failed experiment — the creator intended something else entirely, but the result is remarkable',
    'a trophy from a great hunt — taken from or made to commemorate the defeat of a legendary creature',
    'stolen from the gods — this item was not meant for mortal hands'
  ];
  const selectedEra = eras[Math.floor(Math.random() * eras.length)];

  // Rotating feature examples to avoid anchoring
  const featureExamples = [
    '{"Verdant Resilience": "While wearing this armor, you have advantage on saving throws against poison and resistance to poison damage."}',
    '{"Hungering Edge": "When you hit a creature with this weapon, you regain hit points equal to half the damage dealt. This property can activate once per turn."}',
    '{"Tidewalker": "While attuned, you can breathe underwater and gain a swimming speed of 60 feet. Once per day, you can cast Control Water without expending a spell slot."}',
    '{"Ironbound Memory": "You can touch this item to a written text and it absorbs the content. As an action, you can project the stored text as glowing letters in the air. The item can store up to 100 pages."}',
    '{"Fracture Point": "As a bonus action, you can mark a creature you can see within 60 feet. Your next attack against that creature scores a critical hit on a roll of 18-20. Once used, this property recharges at dawn."}',
    '{"Creeping Frost": "When you deal damage with this weapon, the target\'s speed is reduced by 10 feet until the start of your next turn. If a creature\'s speed is reduced to 0 by this effect, it is restrained until the end of your next turn."}',
    '{"Echoing Shield": "When you are hit by a spell attack, you can use your reaction to reflect the spell back at the caster. The caster must make the original attack roll against their own AC. Once used, this property recharges after a short or long rest."}',
    '{"Gravity Well": "As an action, you can activate this item to create a 20-foot radius sphere of intensified gravity centered on a point within 60 feet. Creatures in the area must succeed on a DC 16 Strength save or be pulled to the center and knocked prone. Lasts 1 minute. Recharges at dawn."}'
  ];
  const selectedExample = featureExamples[Math.floor(Math.random() * featureExamples.length)];

  const featuresAndBonuses = determineFeaturesAndBonuses(rarity.value, resolvedItemType);
  magicItemDescription.value = null;

  const effectDefsString = Object.entries(featuresAndBonuses.effectDefinitions)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  // Only reaches here if user explicitly picked an origin from dropdown
  // (random origin is never assigned when user provides name/lore)
  const userExplicitlyChoseOrigin = !!itemOrigin.value;
  const originInstruction = resolvedOrigin
    ? (userExplicitlyChoseOrigin && itemName.value.trim())
      ? `\nITEM ORIGIN HINT: ${resolvedOrigin} (the user chose this origin AND provided a name — use the origin as thematic influence, but their name "${itemName.value}" is final)\n`
      : `\nITEM ORIGIN: ${resolvedOrigin}\nThe item's theme, aesthetics, and lore MUST reflect its ${resolvedOrigin} origin. Let the origin deeply influence the item's appearance, magical properties, cultural context, and the world it comes from.\n`
    : '';

  const prompt = `Generate a detailed Dungeons & Dragons 5e magic item description adhering to the provided rarity guidelines and incomplete information.

IMPORTANT D&D 5e DESIGN RULES:
- Only Armor and Weapons receive numerical bonuses (+1, +2, etc.) consistently
- Rods, Staffs, Rings, and Wands can occasionally have bonuses (rare)
- Common items are purely cosmetic/utility with NO combat benefits
- Higher rarity does not always mean higher bonus - features matter more
- Balance bonuses with features: high bonus = fewer features
- Use the effect definitions below to understand the appropriate power level for each feature type

CRITICAL — ITEM TYPE ENFORCEMENT:
- The item_type is "${resolvedItemType}". The generated item MUST be a ${resolvedItemType}.
- A Weapon must be a weapon (sword, axe, bow, dagger, mace, halberd, etc.) — NEVER a wand, staff, or rod.
- Armor must be armor (plate, chain mail, leather, shield, etc.) — NEVER a cloak, ring, or amulet.
- A Wondrous Item can be almost anything EXCEPT weapon/armor/wand/rod/staff/ring/scroll/potion.
- Do NOT substitute one item type for another under any circumstances.
${resolvedItemType === 'Wondrous Item' ? `
WONDROUS ITEM FORM:
This wondrous item takes the form of: ${selectedWondrousForm}.
Design the item around this physical form. Its name, appearance, features, and lore should all make sense for a magical ${selectedWondrousForm}.
` : ''}
${resolvedItemType === 'Weapon' ? `
WEAPON TYPE:
This weapon is a ${selectedWeaponType}. Design the item around this specific weapon type. Its name, appearance, and features should fit a ${selectedWeaponType}.
` : ''}
${originInstruction}
${itemName.value.trim() ? `USER-PROVIDED NAME — DO NOT CHANGE:
The user has named this item "${itemName.value}". This name is FINAL and MUST appear exactly as written in the "name" field of your output. Do NOT rename, alter, translate, or "improve" it. Build the item's identity AROUND this name — the origin, lore, description, and all features should support and complement the name the user chose.
` : `NAMING STYLE:
Use this linguistic palette for ALL names — the item name, character names, faction names, and location names: ${selectedPalette}
All names should feel like they belong to the same world. Do not blend or mix linguistic origins within a single name — commit fully to one style.

NAMING — AVOID OVERUSED DESCRIPTORS:
Do not use these words in the item name: Whispering, Luminous, Celestial, Ethereal, Arcane, Glimmering, Radiant, Verdant.
Use vivid, specific adjectives that match the item's origin and mood instead.
`}
MOOD & TONE:
The overall feel of this item should be: ${selectedMood}
Let this mood influence the name, description, features, and lore. Not every item needs to be heroic or epic.

MAGICAL MATERIAL:
The item incorporates: ${selectedMaterial}
This material should appear as a notable component, accent, or magical element of the item — not necessarily the entire construction. For example, a leather armor might have copper rivets or inlays, a wooden staff might have a crystal tip. Let the item type dictate the base construction; weave this material in naturally.

ITEM QUIRK:
${selectedQuirk}
${selectedQuirk.includes('no quirk') ? '' : 'Weave this quirk naturally into the physical_description or as a note at the end of a feature.'}

HISTORICAL CONTEXT:
This item is ${selectedEra}.
Let this context shape the lore — the item\'s age, condition, and story should reflect when and how it came to exist.

${itemLore.value.trim() ? `USER-PROVIDED LORE — PRESERVE INTENT:
The user provided this lore: "${itemLore.value}"
Expand on it and enrich it, but keep the core narrative, characters, and events the user described. Do not replace their story with a different one.` : `LORE STYLE:\n${selectedLoreFraming}`}

COHERENCE:
All of the creative seeds above describe ONE item and must work together as a unified concept.${itemName.value.trim() || itemLore.value.trim() ? ' USER INPUT TAKES PRIORITY — if the user provided a name or lore, the creative seeds (origin, mood, material) should adapt to fit the user\'s vision, not the other way around. The user\'s name and lore are the anchor; the seeds are supporting flavor.' : ' If the naming style is Japanese-inspired and the origin is Fey, then the result should feel like a fey item from a Japanese-inspired culture — not a generic fantasy item with a Japanese name bolted on.'}

CREATIVITY:
- Powerful items can draw from ANY theme: shadow, elemental fury, undead craftsmanship, fey trickery, abyssal corruption, dwarven engineering, oceanic depths, volcanic forge, fungal growth, temporal magic, gravity manipulation, etc.
- Light and celestial themes are valid but should not dominate. Explore the full spectrum.
- Every item should feel genuinely unique. Surprise the user.

${resolvedItemType === 'Potion' ? `SPECIAL RULES FOR POTIONS:
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
  "name": "${itemName.value || '[Generate a unique, evocative name — avoid generic fantasy clichés]'}",${itemName.value.trim() ? ' // USER-PROVIDED — DO NOT CHANGE THIS VALUE' : ''}
  "item_type": "${resolvedItemType}",
  "rarity": "${rarity.value}",
  "bonus": "${featuresAndBonuses.bonus}",
  "modifier_sentence": "${constructModifierSentence(featuresAndBonuses.bonus, resolvedItemType)}",
  "feature_guidelines": "${rarityGuidelines[rarity.value]}",
  "feature_count": ${featuresAndBonuses.feature_count},
  "features": ${JSON.stringify(featuresAndBonuses.features)},
  "reason_for_rarity_level": "[Explain why this item fits its rarity based on the guidelines above]",
  "physical_description": "[2-3 sentences describing the item's appearance incorporating the magical material, mood, and any quirk. ${resolvedItemType === 'Potion' ? 'For potions: describe the liquid color, consistency, swirls, particles, smell, and taste.' : ''}]",
  "lore": "${itemLore.value || '[Create compelling backstory using the lore style and historical context above. All character names, faction names, and location names must use the same linguistic palette as the item name.]'}"
}

INSTRUCTIONS:
1. Replace all placeholder values with actual content
2. For the "features" object: 
   - Replace BOTH the key names (e.g., "feature_name_1") AND the values (e.g., "useful_magical_effect")
   - Use descriptive, thematic feature names as keys
   - Replace effect types with specific, mechanically-detailed descriptions as values
3. Include specific mechanics: damage dice, save DCs, spell levels, recharge times, ranges, durations
4. ${resolvedItemType === 'Potion' ? 'For potions: Always include duration, specify if it is consumed on use, describe immediate and ongoing effects' : 'Ensure all features align with the rarity guidelines and effect definitions'}
5. Make features synergistic and thematic
6. Write features in D&D 5e stat block style (clear, concise, mechanical)
7. The "item_type" in the output MUST be exactly "${resolvedItemType}" — do not change it

EXAMPLE of correct "features" format:
Instead of: {"feature_name_1": "useful_magical_effect"}
Do this: ${selectedExample}${resolvedItemType === 'Potion' ? '\n\nPOTION EXAMPLE:\n{"Giant\'s Might": "Your Strength score becomes 25 for 1 hour. You have advantage on Strength checks and Strength saving throws during this time.", "Enhanced Fortitude": "For the duration, you gain 20 temporary hit points."}' : ''}`;

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
      itemOrigin.value = '';
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
  itemOrigin.value = '';
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
  margin-top: 1.5rem;
  padding: 1rem 1.5rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  max-width: 940px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;

  p {
    font-size: 1.4rem;
    color: #6b7280;
    margin: 0 0 1rem 0;
    line-height: 1.6;
  }

  .limit-info {
    font-size: 1.2rem;
    color: #6b7280;
    margin: 0;
    line-height: 1.6;
  }
}

.patreon-universal-button {
  margin-top: 1rem;

  a {
    text-decoration: none;
  }

  .patreon-responsive-button-wrapper {
    border-radius: 6px;
    overflow: hidden;
  }

  .patreon-responsive-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: #F96854;
    color: #fff;
    font-weight: 700;
    font-size: 1.2rem;
    font-variant: small-caps;
    text-decoration: none;
    border-radius: 6px;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: none;

    &:hover {
      background: #e63946;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .patreon_logo {
    width: 20px;
    height: 20px;
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
  gap: 1.5rem;
}

.generate-button {
  margin-top: 0.5rem;
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