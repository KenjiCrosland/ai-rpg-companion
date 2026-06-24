<template>
  <GeneratorLayout :premium="premium" :flexible-sidebar="true" :show-footer="false">
    <template #sidebar>
      <div class="sidebar-content parchment">
        <div class="sidebar-scroll">
          <ul class="saved-items">
            <li
              v-for="(item, index) in savedItems"
              :key="index"
              class="sidebar-item"
              :class="{ 'sidebar-item--active': activeItemIndex === index }"
            >
              <button class="sidebar-item__button" @click="selectItem(index)">
                <span class="sidebar-item__name">{{ item.name }}</span>
                <span class="sidebar-item__rarity">{{ item.rarity }}</span>
              </button>
            </li>
          </ul>
        </div>

        <SidebarFooter
          new-label="+ New magic item"
          data-description="Save your library to a file or restore from a backup. Your data stays on your device."
          backup-label="Backup / Restore library"
          delete-all-label="Delete all items"
          confirm-title="Delete all magic items?"
          confirm-body="This will permanently delete all magic items in your library. This action cannot be undone."
          confirm-suggestion="Consider backing up your library first if you might want to restore these items later."
          confirm-cta="Delete all items"
          @new="newItem"
          @open-data-manager="showDataManagerModal = true"
          @delete-all="deleteAllItems"
        />
      </div>
    </template>

    <div class="main-container">
      <!-- DataManagerModal component -->
      <DataManagerModal :opened="showDataManagerModal" @update:opened="showDataManagerModal = $event" :premium="premium"
        currentApp="savedItems" />

      <!-- LANDING STATE: Three-zone layout -->
      <div class="landing-wrapper" v-if="!magicItemDescription && !loadingItem">

        <!-- ZONE 1: Hero header -->
        <div class="hero-header parchment">
          <div class="brand-line">
            <span class="brand-name">Kenji's Item Generator</span>
            <VersionBadge :premium="premium" />
          </div>
          <h1 class="page-heading__title">Craft unique D&D 5e magic items</h1>
          <p class="page-heading__tagline">Mechanics, lore, and quest hooks for your campaign.</p>
        </div>

        <!-- ZONE 2: Form card -->
        <!-- `parchment` opts the card out of App.vue's global font-family
             !important override so the serif heading/subhead are honored
             (the form primitives self-mark, but the raw h2/p need this). -->
        <div class="form-card parchment">
          <h2 class="form-heading">Generate a magic item</h2>
          <p class="form-subhead">
            Specify what you want, or
            <button type="button" class="form-subhead__random" @click="generateRandom">surprise me with something
              random</button>.
          </p>
          <form class="item-form" @submit.prevent="generateMagicItem">
            <ParField label="Item name">
              <ParInput v-model="itemName"
                placeholder="Goblet of the Firmament, or leave blank for a random name" />
            </ParField>

            <div class="form-grid">
              <ParField label="Rarity">
                <ParSelect v-model="rarity" :options="rarityOptions" placeholder="Any rarity" />
              </ParField>
              <ParField label="Type">
                <ParSelect v-model="itemType" :options="itemTypeOptions" placeholder="Random" />
              </ParField>
            </div>

            <ParField label="Origin"
              hint="Colors the item's theme, look, and name — chosen for you when you leave the name and notes blank.">
              <ParSelect v-model="itemOrigin" :options="originOptions" placeholder="Random" />
            </ParField>

            <ParField label="Notes for the scribe" :optional="true">
              <ParTextarea v-model="itemLore" :rows="3"
                placeholder="A fallen empire, a coastal cult, a lost language…" />
            </ParField>
            <!-- TEST-REGISTER-OVERRIDE — REMOVE WHEN YORUBA TESTING COMPLETE -->
            <fieldset v-if="isDev" class="test-register-override">
              <legend>TEST: Register Override (dev only)</legend>
              <label>
                Register:
                <select v-model="testRegisterOverride">
                  <option value="">Auto (use detection)</option>
                  <option v-for="opt in registerOverrideOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </option>
                </select>
              </label>
              <p v-if="lastUsedRegister" class="test-register-override__last">
                Last generation used: <code>{{ lastUsedRegister }}</code>
              </p>
            </fieldset>
            <!-- END TEST-REGISTER-OVERRIDE -->
            <ParButton class="generate-button" type="submit" :full-width="true">Generate magic item
            </ParButton>
          </form>
        </div>

        <!-- ZONE 3: Footer meta -->
        <div class="footer-meta">
          <!-- Free users: PatreonCallout owns the upsell messaging end-to-end.
               Bullets are passed via slot so the item-generator-specific
               benefits (Lore Builder, Quest Hook) are stated explicitly at
               the call site rather than relied on as PatreonCallout's
               default. Other tools' migrations follow the same shape. -->
          <PatreonCallout v-if="!premium" :patreon-url="patreonLoginUrl">
            <template #features>
              <li>Cross-device save and load — your campaigns sync between browsers and devices.</li>
              <li>Unlimited Lore Builder generations — no daily cap.</li>
              <li>Unlimited Quest Hook generations — no daily cap.</li>
              <li>
                <a :href="patreonTiersUrl" target="_blank" rel="noopener">See all premium tiers and benefits on Patreon</a><span aria-hidden="true"> →</span>
              </li>
            </template>
          </PatreonCallout>
        </div>
      </div>

      <!-- Tabbed Content for Generated Item — Pattern A: the tab strip
           floats on the page background; each panel owns its own lifted
           content surface (no outer card-within-card wrapper). -->
      <div v-if="magicItemDescription && !loadingItem" class="item-view">
        <div class="item-view__tabs">
          <ParTabs :tabs="itemTabs" v-model:active-id="activeTabId" />
        </div>
        <div :id="`par-tabs-panel-${activeTabId}`" role="tabpanel"
          :aria-labelledby="`par-tabs-tab-${activeTabId}`" tabindex="0" class="item-view__panel">
          <template v-if="activeTabId === 'item-details'">
            <!-- View Mode -->
            <div v-if="!isEditing" class="item-card parchment">
              <header class="item-card-header">
                <div class="item-card-header-text">
                  <h2 class="item-card-name">{{ magicItemDescription.name }}</h2>
                  <p class="item-card-subtitle">{{ magicItemDescription.item_type }}, {{ magicItemDescription.rarity
                    }}<span v-if="magicItemDescription.requires_attunement"> (requires attunement{{
                      magicItemDescription.attunement_restriction ? ' ' + magicItemDescription.attunement_restriction :
                      ''
                      }})</span></p>
                </div>
                <ParCardButton variant="affirmative" @click="startEditing">Edit item</ParCardButton>
              </header>

              <!-- Description: italic, no box, sits in the flow. -->
              <p v-if="magicItemDescription.physical_description" class="item-card-description"
                v-html="formatMarkdown(magicItemDescription.physical_description)"></p>

              <!-- Mechanics: highest contrast block on the card. -->
              <div class="item-card-mechanics">
                <p v-if="magicItemDescription.modifier_sentence" class="item-card-modifier"
                  v-html="formatMarkdown(magicItemDescription.modifier_sentence)"></p>
                <div v-for="(description, feature) in magicItemDescription.features" :key="feature"
                  class="item-feature">
                  <p class="item-feature-name">{{ feature }}</p>
                  <p class="item-feature-description" v-html="formatMarkdown(description)"></p>
                </div>
              </div>

              <!-- Lore: tinted callout block with a small-caps label. Replaces
                   the prior divider-and-italic-paragraph treatment. The
                   tinted background owns the zone change; the label calls
                   out the supplementary nature of the content. -->
              <section v-if="magicItemDescription.lore" class="item-card-lore">
                <p class="item-card-lore-label">Lore</p>
                <div class="item-card-lore-body">
                  <p v-html="formatMarkdown(magicItemDescription.lore)"></p>
                </div>
              </section>

              <!-- Footer: Export (left) + Delete (right). Edit lives in the header. -->
              <footer class="item-card-footer">
                <ParCardButton @click="showExport = !showExport">
                  {{ showExport ? 'Hide export' : 'Export' }}
                </ParCardButton>
                <ParCardButton variant="danger" class="item-card-footer__trail" @click="deleteItem">
                  Delete item
                </ParCardButton>
              </footer>
            </div>

            <!-- Export panel: sits BELOW the card as its own section
                 (uses the shared ItemExportsSection format used across tabs). -->
            <ItemExportsSection v-if="showExport && !isEditing" heading="Export Magic Item">
              <template #description>
                Copy your item details in different formats. The markdown format works perfectly with
                <cdr-link href="https://homebrewery.naturalcrit.com" target="_blank">Homebrewery</cdr-link>
                for creating beautifully formatted D&D handouts.
              </template>
              <template #buttons>
                <ParButton @click="copyAsMarkdown" variant="secondary">
                  Copy as Markdown
                </ParButton>
                <ParButton @click="copyAsPlainText" variant="secondary">
                  Copy as plain text
                </ParButton>
              </template>
              <template #tip>
                <strong>Quick tip:</strong> After copying as markdown, visit
                <cdr-link href="https://homebrewery.naturalcrit.com/new"
                  target="_blank">homebrewery.naturalcrit.com</cdr-link>,
                paste your content on the left side, and watch it transform into a beautiful D&D-styled document!
              </template>
            </ItemExportsSection>

            <!-- Related NPCs (its own section, sibling to the card) -->
            <RelatedNPCsSection v-if="!isEditing" :item="magicItemDescription" @update:item="handleUpdatedItem"
              @switch-to-lore-builder="activeTabId = 'lore-builder'" />

            <!-- Related Settings — sits below NPCs as a parallel
                 cross-tool stub list. Same parchment surface, same
                 row styling. -->
            <RelatedSettingsSection v-if="!isEditing" :item="magicItemDescription" @update:item="handleUpdatedItem"
              @switch-to-lore-builder="activeTabId = 'lore-builder'" />

            <!-- Related Dungeon — single dungeon per item; mode
                 (forgotten / revered / carried / trial) is inferred
                 from the item's lore by the dungeon generator. -->
            <RelatedDungeonsSection v-if="!isEditing" :item="magicItemDescription" />

            <!-- Edit Mode -->
            <div v-else class="item-edit">
              <header class="item-edit__header">
                <h2 class="item-edit__title">Edit magic item</h2>
              </header>

              <ParCardInput v-model="editForm.name" label="Name" class="item-edit__field" />

              <div class="item-edit__row">
                <ParCardSelect v-model="editForm.item_type" label="Type" :options="concreteItemTypeOptions"
                  class="item-edit__field item-edit__field--inline" />
                <ParCardSelect v-model="editForm.rarity" label="Rarity" :options="rarityOptions"
                  class="item-edit__field item-edit__field--inline" />
              </div>

              <fieldset class="item-edit__attunement">
                <ParCheckbox v-model="editForm.requires_attunement" class="item-edit__attunement-toggle">
                  Requires attunement
                </ParCheckbox>
                <ParCardInput v-if="editForm.requires_attunement" v-model="editForm.attunement_restriction"
                  label="Restriction (optional)"
                  hint="Leave blank for any character. Example: &quot;by a paladin&quot; or &quot;by a creature of evil alignment&quot;."
                  placeholder="by a paladin" class="item-edit__field item-edit__attunement-restriction" />
              </fieldset>

              <ParCardInput v-model="editForm.modifier_sentence" label="Modifier sentence (optional)"
                hint='Example: "You have a +1 bonus to attack and damage rolls made with this weapon."'
                class="item-edit__field" />

              <ParCardTextarea v-model="editForm.physical_description" label="Physical description" :rows="4"
                class="item-edit__field" />

              <section class="item-edit__features">
                <h3 class="item-edit__section-title">Features</h3>
                <div v-for="(feature, index) in editForm.featuresArray" :key="index" class="item-edit__feature-row">
                  <ParCardInput v-model="feature.name" label="Feature name" hint="Leave blank to auto-generate a name."
                    class="item-edit__feature-name" />
                  <ParCardTextarea v-model="feature.description" label="Description" :rows="3"
                    class="item-edit__feature-desc" />
                  <div class="item-edit__feature-actions">
                    <ParCardButton size="small" @click="generateFeature(index)" :disabled="feature.generating">
                      {{ feature.generating ? 'Generating…' : 'Generate Feature' }}
                    </ParCardButton>
                    <ParCardButton variant="danger" size="small" @click="removeFeature(index)">
                      Remove
                    </ParCardButton>
                  </div>
                </div>
                <ParCardButton size="small" @click="addFeature" class="item-edit__add-feature">
                  + Add feature
                </ParCardButton>
              </section>

              <ParCardTextarea v-model="editForm.lore" label="Lore" :rows="5" class="item-edit__field" />

              <footer class="item-edit__footer">
                <ParCardButton variant="danger" @click="cancelEdit">Cancel</ParCardButton>
                <ParCardButton @click="saveEdit">Save changes</ParCardButton>
              </footer>
            </div>
          </template>

          <LoreBuilderTab v-if="activeTabId === 'lore-builder'" :item="magicItemDescription"
            @updated-item="handleUpdatedItem" :premium="premium" />

          <QuestHookTab v-if="activeTabId === 'quest-hooks'" :item="magicItemDescription"
            @updated-item="handleUpdatedItem" :premium="premium" />
        </div>
      </div>

      <!-- Footer below item content (separate card) -->
      <div class="footer-meta" v-if="magicItemDescription && !loadingItem">
        <!-- Free users: PatreonCallout owns the upsell messaging end-to-end.
             Same slot content as the form-sidebar instance above. -->
        <PatreonCallout v-if="!premium" :patreon-url="patreonLoginUrl">
          <template #features>
            <li>Cross-device save and load — your campaigns sync between browsers and devices.</li>
            <li>Unlimited Lore Builder generations — no daily cap.</li>
            <li>Unlimited Quest Hook generations — no daily cap.</li>
            <li>
              <a :href="patreonTiersUrl" target="_blank" rel="noopener">See all premium tiers and benefits on Patreon</a><span aria-hidden="true"> →</span>
            </li>
          </template>
        </PatreonCallout>
      </div>

      <div v-if="loadingItem" class="form-container">
        <item-skeleton />
      </div>
    </div>
  </GeneratorLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { CdrInput, CdrSelect, CdrLink } from "@rei/cedar";
import GeneratorLayout from '@/components/GeneratorLayout.vue';
import SidebarFooter from '@/components/SidebarFooter.vue';
import VersionBadge from '@/components/VersionBadge.vue';
import { generateGptResponse } from "@/util/ai-client.mjs";
import { logger } from "@/util/logger.mjs";
import { convertItemToMarkdown } from '@/util/convertToMarkdown.mjs';
import determineFeaturesAndBonuses from '@/util/determine-features-and-bonuses.mjs';
import ItemSkeleton from '@/components/skeletons/ItemSkeleton.vue';
import QuestHookTab from './components/QuestHookTab.vue';
import LoreBuilderTab from './components/LoreBuilderTab.vue';
import RelatedNPCsSection from './components/RelatedNPCsSection.vue';
import RelatedSettingsSection from './components/RelatedSettingsSection.vue';
import RelatedDungeonsSection from './components/RelatedDungeonsSection.vue';
import ItemExportsSection from './components/ItemExportsSection.vue';
import { ParCardButton, ParButton, ParCardInput, ParCardTextarea, ParCardSelect, ParCheckbox, ParField, ParInput, ParSelect, ParTextarea, ParTabs } from '@/parchment';
import PatreonCallout from '@/components/PatreonCallout.vue';
import DataManagerModal from '@/components/DataManagerModal.vue';
import { useToast } from '@/composables/useToast';
import { renameItemReferences, removeReferencesForItem } from '@/util/item-storage.mjs';
import { getNavigationParams } from '@/util/navigation.mjs';
import { detectFromUserInput } from './utils/detect-user-input.mjs';
import { detectRegisterFromInput } from '@/shared/detect-register-from-input.mjs';
import {
  selectRegister,
  resolveFantasyRace,
  fantasyRaceConventionalRegisters,
  WESTERN_FANTASY_BOUND_RACES,
} from '@/shared/select-register.mjs';
import { originMaterialPools, allMaterials } from './utils/material-pools.mjs';
import { registerList } from '@/shared/register-list.mjs';
import { buildPoolPromptBlock } from '@/shared/pool-prompt.mjs';
import { buildCatchallPromptBlock } from '@/shared/catchall-prompt.mjs';
import { buildCharacterWhitelistBlock } from '@/shared/character-whitelist-prompt.mjs';
import { filterOriginsForForcedRegister } from '@/shared/filter-origins-for-forced-register.mjs';
import { buildLanguageRegisterRestrictionBlock } from '@/shared/language-register-restriction.mjs';
import { buildRealWorldCategoryRestrictionBlock } from '@/shared/real-world-category-restriction.mjs';
import { buildDeityModeBlock } from '@/shared/deity-mode-block.mjs';
import { findRegisterByPrefix } from '@/shared/registers/index.mjs';
import { rotateRegisterExamples } from '@/shared/rotate-register-examples.mjs';
import { patreonTiersUrl } from '@/util/patreon-urls.mjs';

// TEST-REGISTER-OVERRIDE — REMOVE WHEN YORUBA TESTING COMPLETE
// process.env.NODE_ENV avoids the import.meta parse error under Jest;
// Vite statically replaces it at build time. Same pattern as ai-client.mjs.
const isDev = process.env.NODE_ENV !== 'production';
const testRegisterOverride = ref('');
const lastUsedRegister = ref('');
const registerOverrideOptions = registerList
  .map(p => ({
    value: p,
    label: p.length > 60 ? p.slice(0, 57) + '…' : p,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));
// END TEST-REGISTER-OVERRIDE

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
const activeTabId = ref('item-details');
const itemTabs = [
  { id: 'item-details', label: 'Item Details' },
  { id: 'lore-builder', label: 'Lore Builder' },
  { id: 'quest-hooks', label: 'Quest Hooks' },
];
const isEditing = ref(false);
const showExport = ref(false);
const editForm = ref({
  name: '',
  item_type: '',
  rarity: '',
  requires_attunement: false,
  attunement_restriction: '',
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
  'Legendary',
  'Artifact'
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
  'Legendary': '+3 with multiple features OR +2 with legendary features OR multiple legendary features. Very rarely +4. Save DC: 19+',
  'Artifact': 'Campaign-defining relics with +3 bonus and 5-6 legendary effects. MUST include major drawbacks, curses, or dangerous side effects. Save DC: 20+. Examples: Eye of Vecna, Book of Vile Darkness, Wand of Orcus.'
};

// "Surprise me" affordance: ignore any in-progress field values and
// generate a fully unconstrained item. Clearing every field lets
// generateMagicItem's random fallbacks fire for rarity, type, and origin.
const generateRandom = () => {
  itemName.value = '';
  itemLore.value = '';
  itemOrigin.value = '';
  rarity.value = '';
  itemType.value = '';
  generateMagicItem();
};

const generateMagicItem = async () => {
  if (!rarity.value) {
    const randomIndex = Math.floor(Math.random() * rarityOptions.length);
    rarity.value = rarityOptions[randomIndex];
  }

  // Combined user input — scanned for top-level type words AND subtype
  // words (specific weapons, specific wondrous forms) so the user's
  // vision overrides random seeds at every level.
  //
  // Two bug classes addressed:
  //   1. Originally, seed selection was unconditionally random, so
  //      "longbow" in lore could still produce a blowgun.
  //   2. After the first fix, top-level type detection only scanned
  //      ['Weapon','Armor','Ring',...]. So "Quartermaster's Shortsword"
  //      with no dropdown selection was producing armor — neither
  //      "Weapon" nor any other top-level word appeared in the input,
  //      so the random fallback fired. The fix below recognizes that
  //      a specific subtype word (e.g. "shortsword") implies its parent
  //      type ('Weapon') and retains the matched subtype for the seed.
  const userInput = `${itemName.value} ${itemLore.value}`;

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

  // Pre-select a weapon type for Weapons
  const weaponTypes = [
    'longsword', 'shortsword', 'greatsword', 'rapier', 'scimitar', 'dagger',
    'handaxe', 'battleaxe', 'greataxe', 'warhammer', 'maul', 'mace',
    'morningstar', 'flail', 'spear', 'javelin', 'halberd', 'glaive', 'pike',
    'trident', 'lance', 'whip', 'longbow', 'shortbow', 'light crossbow',
    'heavy crossbow', 'hand crossbow', 'sling', 'war pick', 'quarterstaff',
    'club', 'greatclub', 'sickle', 'blowgun', 'net', 'double-bladed scimitar'
  ];

  // Reverse lookup from any subtype word back to its parent item type.
  // Combined-list scan lets a single detectFromUserInput call return the
  // longest user-mentioned subtype across both weapon types and wondrous
  // forms — length-descending sort inside detectFromUserInput handles
  // overlap. Resolution rules for edge cases:
  //   - "Quartermaster's Shortsword"      → 'shortsword' → Weapon
  //   - "lantern in the alcove"           → 'lantern'    → Wondrous Item
  //   - "shield with shortsword inscriptions"
  //                                       → 'shortsword' wins (10 chars,
  //                                         and "shield" isn't in any
  //                                         subtype list, so it isn't
  //                                         considered).
  //   - Equal-length collisions (e.g. "longbow" 7 vs "lantern" 7):
  //     stable sort + iteration order means weaponTypes are checked
  //     before wondrousItemForms; first occurrence wins.
  const subtypeToParent = Object.fromEntries([
    ...weaponTypes.map(w => [w, 'Weapon']),
    ...wondrousItemForms.map(f => [f, 'Wondrous Item']),
  ]);
  const allSubtypes = Object.keys(subtypeToParent);
  const userMentionedSubtype = detectFromUserInput(userInput, allSubtypes);
  const inferredFromSubtype = userMentionedSubtype ? subtypeToParent[userMentionedSubtype] : null;

  // Generic type words. These are NOT in the seed pools (because the LLM
  // shouldn't be told to "design around a bow" — too vague), but they
  // imply the parent type when the user writes them. Each generic maps
  // to a sub-pool of specific subtypes that fit it; when the user writes
  // a generic word ("Verdant Bow"), we infer Weapon AND constrain the
  // seed to a random pick from the matching sub-pool (longbow, shortbow,
  // light/heavy/hand crossbow). This bridges between the user's loose
  // intent ("a bow") and the LLM's need for a concrete subtype seed.
  //
  // Compare with the specific-subtype scan above: when the user writes
  // a specific subtype already in weaponTypes/wondrousItemForms
  // ("Verdant Longbow"), we retain it directly as the seed. Generic
  // words trigger a constrained-random pick instead.
  // Three subpool patterns:
  //   - Array of specific subtypes — pick randomly. Used for generics
  //     that span multiple specific forms (bow → longbow|shortbow|...).
  //   - Single-element array — synonym of an existing specific form
  //     (helmet → helm). Pick path is the same as multi-element; the
  //     pool just always returns the one entry.
  //   - null — parent-only inference. Used for Armor (no armor-subtype
  //     seed exists in this generator) and Potion synonyms (Potion has
  //     no further subdivision). Sets resolvedItemType to the parent
  //     and lets the existing prompt handle specifics. Safe because
  //     pickFromGenericSubpool is only reached when resolvedItemType
  //     matches Weapon or Wondrous Item — never Armor or Potion — so
  //     the null subpool is never indexed.
  const genericTypeWords = {
    // Weapon generics — multi-element subpools
    'bow':        { parent: 'Weapon',        subpool: ['longbow', 'shortbow', 'light crossbow', 'heavy crossbow', 'hand crossbow'] },
    'sword':      { parent: 'Weapon',        subpool: ['longsword', 'shortsword', 'greatsword', 'scimitar', 'rapier'] },
    'blade':      { parent: 'Weapon',        subpool: ['longsword', 'shortsword', 'greatsword', 'scimitar', 'rapier', 'dagger'] },
    'axe':        { parent: 'Weapon',        subpool: ['handaxe', 'battleaxe', 'greataxe'] },
    'hammer':     { parent: 'Weapon',        subpool: ['warhammer', 'maul'] },
    'crossbow':   { parent: 'Weapon',        subpool: ['light crossbow', 'heavy crossbow', 'hand crossbow'] },
    'knife':      { parent: 'Weapon',        subpool: ['dagger'] },
    'spear':      { parent: 'Weapon',        subpool: ['spear', 'javelin', 'pike', 'lance'] },
    'club':       { parent: 'Weapon',        subpool: ['club', 'greatclub'] },
    'mace':       { parent: 'Weapon',        subpool: ['mace', 'morningstar'] },
    'pole':       { parent: 'Weapon',        subpool: ['halberd', 'glaive', 'pike', 'quarterstaff'] },
    // Wondrous Item generics
    'box':        { parent: 'Wondrous Item', subpool: ['music box', 'puzzle box'] },
    'helmet':     { parent: 'Wondrous Item', subpool: ['helm'] },
    'lamp':       { parent: 'Wondrous Item', subpool: ['lantern'] },
    'book':       { parent: 'Wondrous Item', subpool: ['tome'] },
    'amulet':     { parent: 'Wondrous Item', subpool: ['pendant'] },
    'necklace':   { parent: 'Wondrous Item', subpool: ['pendant'] },
    'instrument': { parent: 'Wondrous Item', subpool: ['musical instrument'] },
    'hat':        { parent: 'Wondrous Item', subpool: ['helm', 'circlet', 'headband', 'crown'] },
    // Armor synonyms — parent-only (no specific armor seed exists)
    'plate':      { parent: 'Armor',         subpool: null },
    'mail':       { parent: 'Armor',         subpool: null },
    'chainmail':  { parent: 'Armor',         subpool: null },
    'shield':     { parent: 'Armor',         subpool: null },
    // Potion synonyms — top-level type aliases
    'elixir':     { parent: 'Potion',        subpool: null },
    'draught':    { parent: 'Potion',        subpool: null },
    'tonic':      { parent: 'Potion',        subpool: null },
    'brew':       { parent: 'Potion',        subpool: null },
    // Documented gaps (not added — would be ambiguous or low-value):
    //   - 'horn' (drinking horn) — no analogous form in wondrousItemForms
    //   - 'staff' — already a top-level item type (Staff of Fire)
  };
  const genericWords = Object.keys(genericTypeWords);
  // Only run the generic scan if a specific subtype wasn't already
  // matched — specific always beats generic. This means
  // "Verdant Longbow" matches "longbow" specifically (not just "bow").
  const userMentionedGeneric = !userMentionedSubtype
    ? detectFromUserInput(userInput, genericWords)
    : null;
  const inferredFromGeneric = userMentionedGeneric ? genericTypeWords[userMentionedGeneric].parent : null;

  // Top-level type detection (matches "ring", "staff", "wand", "potion",
  // "scroll", "rod", "armor", "weapon", "wondrous item" verbatim).
  const userMentionedItemType = detectFromUserInput(userInput, concreteItemTypeOptions);

  // Resolve item type. Order of precedence:
  //   1. Explicit dropdown selection (other than "Random") — user
  //      intentionally picked this and it stays the highest authority
  //      even if their lore mentions a different subtype.
  //   2. Top-level type word in the user's input ("ring", "staff", etc.).
  //   3. Specific subtype word ("shortsword" → Weapon, "lantern" → Wondrous).
  //   4. Generic type word ("bow" → Weapon, "box" → Wondrous Item).
  //   5. UNRESOLVED — user typed input but no detection matched. Leave
  //      resolvedItemType null so the LLM determines the type from user
  //      input using its world knowledge ("Ikwa" → Weapon, "Khopesh" →
  //      Weapon, etc.). The keyword approach can't cover the long tail
  //      of obscure terms; this branch defers classification to the
  //      model. The prompt's ITEM TYPE DETERMINATION block kicks in
  //      with worked examples; the validator whitelists the response.
  //   6. Random fallback for true blank-canvas generations.
  const detectedType = userMentionedItemType || inferredFromSubtype || inferredFromGeneric;
  const userInputTrimmed = userInput.trim();
  const resolvedItemType =
    (itemType.value && itemType.value !== 'Random') ? itemType.value
      : detectedType
      || (userInputTrimmed
          ? null
          : concreteItemTypeOptions[Math.floor(Math.random() * concreteItemTypeOptions.length)]);

  // Origin resolution is split:
  //   - Dropdown selection fires immediately (doesn't depend on mood).
  //   - Blank-canvas random selection fires AFTER mood selection (below)
  //     because the random pool is now mood-constrained for aesthetic
  //     origins. Cultural origins (Orcish, Dwarven, etc.) are always
  //     eligible regardless of mood.
  //   - User-provided name/lore: origin stays null so the LLM derives
  //     thematic context from their text rather than a random seed.
  let resolvedOrigin = itemOrigin.value || null;

  // Seed-selection step. Three-way precedence per type:
  //   1. Specific subtype mention ("longbow") → use it directly.
  //   2. Generic word mention ("bow") → constrained-random pick from the
  //      generic's sub-pool.
  //   3. No user mention → fully random from the full pool.
  // Both subtype and generic require the parent type to match the
  // resolved type; if the user explicitly chose Armor and mentioned a
  // bow in lore, the generic mention is ignored at seed time.
  const userSubtypeMatchesResolvedType = userMentionedSubtype
    && subtypeToParent[userMentionedSubtype] === resolvedItemType;
  const userGenericMatchesResolvedType = userMentionedGeneric
    && genericTypeWords[userMentionedGeneric].parent === resolvedItemType;

  const pickFromGenericSubpool = () => {
    const pool = genericTypeWords[userMentionedGeneric].subpool;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  // When resolvedItemType is null (unresolved — LLM will determine), both
  // seed values are null. Type-specific prompt blocks (WONDROUS ITEM FORM,
  // WEAPON TYPE) are conditional on resolvedItemType matching, so they
  // don't render in the unresolved case — and the LLM picks the form
  // from user input rather than from a pre-selected seed.
  const selectedWondrousForm =
    resolvedItemType === null ? null
    : (resolvedItemType !== 'Wondrous Item') ? wondrousItemForms[Math.floor(Math.random() * wondrousItemForms.length)]
    : userSubtypeMatchesResolvedType ? userMentionedSubtype
    : userGenericMatchesResolvedType ? pickFromGenericSubpool()
    : wondrousItemForms[Math.floor(Math.random() * wondrousItemForms.length)];

  const selectedWeaponType =
    resolvedItemType === null ? null
    : (resolvedItemType !== 'Weapon') ? weaponTypes[Math.floor(Math.random() * weaponTypes.length)]
    : userSubtypeMatchesResolvedType ? userMentionedSubtype
    : userGenericMatchesResolvedType ? pickFromGenericSubpool()
    : weaponTypes[Math.floor(Math.random() * weaponTypes.length)];

  // Origin definitions — purely thematic. The previous originRegisterMap
  // bundled origin (thematic) with naming register (linguistic), which
  // forced stereotype pairings (Slavic = Necromantic, Arabic = Shadow)
  // and prevented combinations like "Japanese-named Celestial item."
  // The refactor splits these into independent dimensions: origin
  // describes what the item IS thematically; registerList (below)
  // describes how proper nouns SOUND. Either can pair with any of the
  // other freely.
  const originDefinitions = {
    'Abyssal':       'Born of the chaotic, formless deep — the item carries primal corruption, hungry void, or the touch of demonic excess.',
    'Aberrant':      'Touched by alien intelligences from beyond reality — the item is wrong in subtle ways, its geometry or behavior violating natural law.',
    'Alchemical':    'Forged through structured magical practice — the item embodies refined craft, formal procedure, and the controlled release of power.',
    'Astral':        'Drawn from the cosmic seas between worlds — the item shimmers with starlight, planar geometry, or the silence of vast spaces.',
    'Celestial':     'Crafted by or for divine beings of light — the item radiates holy power, healing presence, or unwavering moral clarity.',
    'Deep Sea':      'Surfaced from the crushing depths — the item carries oceanic mystery, the patience of pressure, and the cold indifference of trenches.',
    'Draconic':      'Made by or for dragons, or carrying their essence — the item bears ancient pride, hoarded power, and elemental weight.',
    'Dwarven':       'Forged in the deep halls of dwarvenkind — the item bears mountain-craft, runework, and the patience of stone.',
    'Elemental':     'Bound to one of the primal elements — fire, water, earth, air, or their stranger combinations — and pulses with raw force.',
    'Elven':         'Shaped by elven hands or magic — the item carries elven longevity, aesthetic refinement, and connection to wild or starlit places.',
    'Fey':           'Touched by the fey realms — the item is whimsical, dangerous, beautiful, or all three; bargains and unpredictability cling to it.',
    'Giant':         'Built at giant scale or by giant hands — the item carries primordial weight, ancient memory, and elemental kinship.',
    'Gnomish':       'Crafted by gnomish ingenuity — the item is clever, whimsical, possibly mechanical, often functioning in unexpected ways.',
    'Goblinoid':     'Made by goblin or hobgoblin craft — the item is functional, sometimes crude, often ingenious in its sharp practicality.',
    'Infernal':      'Forged in the hells or marked by their bargains — the item carries calculating malice, contractual power, and the smell of brimstone.',
    'Lycanthropic':  'Tied to the curse of shapeshifting — the item bears wild instinct, the moon\'s pull, or the boundary between human and beast.',
    'Necromantic':   'Crafted with death\'s essence — the item carries grave-cold, the weight of unmarked tombs, or the lingering will of the dead.',
    'Orcish':        'Forged by orcish hands — the item bears tribal craft, ancestor-honoring marks, and the strength of hard-earned survival.',
    'Primordial':    'From the world\'s first ages — the item predates civilization itself, carrying elemental rawness and pre-language power.',
    'Shadow':        'Drawn from the realms between light — the item operates in concealment, working through what is hidden, unseen, or whispered.',
    'Technomagical': 'Built where magic meets clockwork — the item combines arcane power with engineered precision, gears and runes interlocked.',
    'Vampiric':      'Marked by the curse of undeath that thirsts — the item carries aristocratic darkness, the night\'s hunger, or the patience of immortality.',
    'Verdant':       'Grown rather than forged — the item carries living wood, blooming magic, and the slow patience of green growth.',
    'Wizardry':      'Created through formal arcane study — the item bears academic precision, school-coded magic, and the rigor of arcane theory.',
  };

  // Pre-select a mood/tone. Pool calibrated for tonal variety — roughly
  // 1/4 dark, 1/4 light, 1/4 neutral/utilitarian, 1/4 weird/strange.
  // Mood selection happens here (before register selection) because the
  // blank-canvas origin selector below depends on it, and the blank-
  // canvas origin selector MUST run before register selection so the
  // orc/goblin and horror-coded protection layers see the resolved
  // origin. Previously this block lived after register selection, which
  // let the dev register override (and the existing random register
  // selection) silently bypass the protections when the user hadn't
  // picked an origin from the dropdown.
  const moods = [
    // Dark register
    'ominous and foreboding — something feels wrong about this item',
    'tragic and melancholy — this item carries the weight of loss',
    'eerie and unsettling — beautiful but deeply wrong',
    'brutal and unsubtle — this item was made for war',
    // Light register
    'warm and protective — this item feels like a guardian',
    'joyful and celebratory — this item was made for a great occasion',
    'gentle and affectionate — this item carries warmth toward its bearer',
    'exuberant and expansive — this item radiates generous energy',
    // Neutral / utilitarian
    'utilitarian and pragmatic — built for function, not glory',
    'regal and imperious — this item demands respect',
    'serene and meditative — this item radiates calm',
    'industrious and confident — built by skilled hands for serious purpose',
    'stately and ceremonial — befitting a great occasion or office',
    // Weird / strange
    'whimsical and playful — this item has a mischievous personality',
    'wild and untamed — this item pulses with primal energy',
    'mysterious and cryptic — its true purpose is unclear',
    'darkly humorous — this item has an ironic or sardonic edge',
    'volatile and unstable — this item is barely contained power',
    'cunning and deceptive — this item is not what it appears',
    'curious and inviting — this item draws you in',
    'rebellious and defiant — this item was forged in resistance'
  ];
  const selectedMood = moods[Math.floor(Math.random() * moods.length)];

  // Cultural origins are fictional peoples with full cultural depth.
  // Real cultures contain every mood; fictional cultures should too.
  // These are always eligible for origin selection regardless of mood
  // — "joyful Orcish" and "tragic Dwarven" are both valid pairings.
  const culturalOrigins = ['Orcish', 'Goblinoid', 'Gnomish', 'Elven', 'Dwarven', 'Giant'];

  // Maps each mood to the AESTHETIC origins it pairs with tonally.
  // Aesthetic origins ARE tonal registers — Abyssal is inherently dark,
  // Celestial is inherently bright — so they're constrained to moods
  // that match. Cultural origins (above) are not constrained because
  // a culture can be any mood.
  //
  // Keys must match entries in the moods array above. Missing keys
  // (e.g. if a mood is added later without a compatibility entry)
  // produce an empty aesthetic-origin pool — origin selection then
  // falls through to cultural origins only, which is a reasonable
  // default.
  const moodOriginCompatibility = {
    'ominous and foreboding — something feels wrong about this item': ['Abyssal', 'Aberrant', 'Necromantic', 'Shadow', 'Infernal', 'Vampiric'],
    'tragic and melancholy — this item carries the weight of loss':   ['Necromantic', 'Shadow', 'Vampiric', 'Lycanthropic', 'Wizardry'],
    'eerie and unsettling — beautiful but deeply wrong':              ['Aberrant', 'Shadow', 'Necromantic', 'Vampiric', 'Deep Sea', 'Fey'],
    'brutal and unsubtle — this item was made for war':               ['Infernal', 'Abyssal', 'Draconic'],
    'warm and protective — this item feels like a guardian':          ['Celestial', 'Verdant'],
    'joyful and celebratory — this item was made for a great occasion': ['Fey', 'Celestial', 'Verdant'],
    'gentle and affectionate — this item carries warmth toward its bearer': ['Celestial', 'Verdant', 'Fey'],
    'exuberant and expansive — this item radiates generous energy':   ['Celestial', 'Fey', 'Verdant', 'Astral'],
    'utilitarian and pragmatic — built for function, not glory':      ['Alchemical', 'Technomagical'],
    'regal and imperious — this item demands respect':                ['Astral', 'Celestial', 'Wizardry', 'Vampiric', 'Draconic'],
    'serene and meditative — this item radiates calm':                ['Celestial', 'Astral', 'Verdant'],
    'industrious and confident — built by skilled hands for serious purpose': ['Alchemical', 'Technomagical', 'Wizardry'],
    'stately and ceremonial — befitting a great occasion or office':  ['Celestial', 'Astral', 'Wizardry', 'Vampiric', 'Draconic'],
    'whimsical and playful — this item has a mischievous personality': ['Fey', 'Verdant'],
    'wild and untamed — this item pulses with primal energy':         ['Elemental', 'Primordial', 'Verdant', 'Lycanthropic', 'Draconic'],
    'mysterious and cryptic — its true purpose is unclear':           ['Astral', 'Aberrant', 'Shadow', 'Deep Sea', 'Wizardry', 'Fey'],
    'darkly humorous — this item has an ironic or sardonic edge':     ['Fey', 'Infernal', 'Vampiric', 'Shadow'],
    'volatile and unstable — this item is barely contained power':    ['Elemental', 'Abyssal', 'Aberrant', 'Primordial', 'Alchemical', 'Technomagical'],
    'cunning and deceptive — this item is not what it appears':       ['Fey', 'Vampiric', 'Shadow', 'Wizardry', 'Aberrant'],
    'curious and inviting — this item draws you in':                  ['Fey', 'Astral', 'Wizardry', 'Verdant'],
    'rebellious and defiant — this item was forged in resistance':    ['Infernal', 'Lycanthropic'],
  };

  // Resolve origin for the blank-canvas case. Aesthetic origins
  // compatible with the mood + all cultural origins are eligible.
  // User-input cases (name/lore provided) leave resolvedOrigin null so
  // the LLM derives thematic context from the user's text.
  if (!resolvedOrigin && !itemName.value.trim() && !itemLore.value.trim()) {
    const aestheticOrigins = moodOriginCompatibility[selectedMood] || [];
    let eligibleOrigins = [...aestheticOrigins, ...culturalOrigins];

    // TEST-REGISTER-OVERRIDE — REMOVE WHEN YORUBA TESTING COMPLETE
    // When the dev forces a register via the override dropdown, also
    // filter the random origin pool to exclude origins that would
    // protection-override the forced register. See filter-origins-for-
    // forced-register.mjs for the full rationale and unit tests.
    if (isDev && testRegisterOverride.value) {
      eligibleOrigins = filterOriginsForForcedRegister(
        eligibleOrigins,
        testRegisterOverride.value,
      );
    }
    // END TEST-REGISTER-OVERRIDE

    resolvedOrigin = eligibleOrigins[Math.floor(Math.random() * eligibleOrigins.length)];
  }

  // registerList is imported from ./utils/register-list.mjs.
  // Lives in its own module so test specs can verify integrity (every
  // prefix referenced in fantasyRaceConventionalRegisters resolves to
  // an entry there) without depending on inline data here.

  // Language register selection runs through the full priority hierarchy:
  //   1. Cultural detection from user input (Akiko → Japanese, etc.)
  //   2. Fantasy-race weighted (70/30 conventional/other) — when the
  //      origin or user input signals a core fantasy race, register
  //      selection biases toward the genre-conventional pairing
  //      (Elven → Elven, Dwarven → Germanic, etc.) without locking
  //      out unconventional pairings entirely.
  //   3. Uniform random across the full pool.
  // resolvedOrigin is fully resolved at this point — dropdown selection
  // OR blank-canvas random pick (which honors the dev register-override
  // filter above) OR null when user-provided text drives thematic
  // context. Protection layers (orc/goblin allow-list, horror pool)
  // see the final resolvedOrigin and fire correctly.
  const userInputForLangDetection = `${itemName.value} ${itemLore.value}`;
  // TEST-REGISTER-OVERRIDE — REMOVE WHEN YORUBA TESTING COMPLETE
  // The override routes THROUGH selectRegister as the cultural-
  // detection input, not around it. This preserves the architectural
  // protections (horror-origin pool, orc/goblin allow-list) that would
  // otherwise be silently bypassed in dev:
  //   - Non-restricted origins: override fires as priority-1 detection
  //     and wins.
  //   - Horror origins (Abyssal/Infernal/Necromantic/Vampiric/
  //     Lycanthropic/Aberrant): override wins only if the register is
  //     in the horror pool; otherwise pool wins.
  //   - Orc/Goblin: override wins only if in the allow-list pool;
  //     otherwise pool wins.
  // The "Last generation used" badge below shows the actual register
  // selected, so when protections override the override, the dev sees
  // the real outcome.
  const detectFn = (isDev && testRegisterOverride.value)
    ? () => testRegisterOverride.value
    : detectRegisterFromInput;
  const selectedRegister = selectRegister(
    resolvedOrigin,
    userInputForLangDetection,
    registerList,
    detectFn,
  );
  lastUsedRegister.value = selectedRegister;
  // END TEST-REGISTER-OVERRIDE

  // Unconventional pairing = fantasy-race origin paired with a register
  // OTHER than its genre-conventional one (e.g., Elven origin + Slavic
  // register, Gnomish origin + Mesoamerican register). Fires for the 30%
  // case in selectRegister's weighted branch. We use it to gate
  // the deeper "translate, don't mash up" prompt section, which is too
  // expensive in tokens to render for every fantasy-race generation.
  // After the multi-register pool refactor, each fantasy race's
  // conventional register is an array of prefixes. The pairing is
  // unconventional iff none of the pool prefixes matches the
  // selected register.
  const isUnconventionalPairing = !!(
    resolvedOrigin
    && fantasyRaceConventionalRegisters[resolvedOrigin]
    && !fantasyRaceConventionalRegisters[resolvedOrigin].some(prefix =>
      selectedRegister.startsWith(prefix),
    )
  );

  // Western-fantasy-bound race context = fantasy-race resolution (per
  // the same logic selectRegister uses) yields one of the five
  // Western-fantasy-bound races (Orcish, Goblinoid, Dwarven, Gnomish,
  // Elven — see WESTERN_FANTASY_BOUND_RACES in select-register.mjs).
  // Catches both the dropdown case and the keyword-in-lore case
  // (origin=Necromantic + lore="Orcish Battleaxe" → fantasyRace='Orcish'
  // via priority 2b keyword scan).
  //
  // Two layers of protection:
  // 1. STRUCTURAL — selectRegister uses an allow-list-restricted
  //    branch for these races (no 30% alternative, cultural-detection
  //    input subordinated to the allow-list). The selected register can
  //    only come from the race's curated European/fictional allow-list.
  // 2. PROMPT-SIDE — the LANGUAGE REGISTER RESTRICTION block below
  //    revokes the LLM's LANGUAGE REGISTER OVERRIDE authority for these
  //    contexts so creative re-association during generation can't
  //    re-introduce the cross-cultural pairings the structural
  //    protection blocks.
  // Defense-in-depth: if a future code change regresses the structural
  // protection, the prompt block catches it; if the LLM ignores the
  // prompt block, the structural protection has already restricted
  // the pre-selected register to the safe pool.
  //
  // Cross-cultural-archetype races (Fey, Giant) are deliberately NOT
  // covered — their archetype-slots exist in many living mythological
  // traditions, so non-Western pairings genuinely include those
  // cultures rather than decorating a Western archetype.
  const fantasyRaceForGen = resolveFantasyRace(
    resolvedOrigin,
    userInputForLangDetection,
  );
  const isWesternFantasyRaceContext = WESTERN_FANTASY_BOUND_RACES.includes(fantasyRaceForGen);

  // Orc and goblin conventional pools are intentionally single-register
  // (see fantasyRaceConventionalRegisters docstring on the racism-coding
  // architecture).
  //
  // Rotate the descriptor's "(e.g., …)" tail with fresh whitelist samples
  // for fictional palettes (Goblin-inspired, Orcish, Elven, Draconic,
  // Aberrant, Abyssal, Infernal, Primordial). Static tails on those
  // descriptors anchor DeepSeek's character-name selection onto the same
  // 3-4 names per generation even though the curated whitelist is
  // injected separately. Real-cultural registers without whitelists pass
  // through unchanged — their static examples are the only seeded names
  // the LLM receives and need to stay as the model.
  const displayedRegister = rotateRegisterExamples(selectedRegister);

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

  // Pre-select a primary material from the origin-curated pool. Each
  // origin has its own pool in material-pools.mjs (~18-22 entries for
  // aesthetic origins, ~35-40 for cultural origins). When origin is
  // unresolved (user input drives theme, no dropdown selection),
  // fall back to the deduplicated union of all pools.
  const materialPool = (resolvedOrigin && originMaterialPools[resolvedOrigin])
    ? originMaterialPools[resolvedOrigin]
    : allMaterials;
  const selectedMaterial = materialPool[Math.floor(Math.random() * materialPool.length)];

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

  // Rotating feature examples to avoid anchoring. The example pool is
  // calibrated for category breadth — defensive (resistance), damage
  // modifiers (lifesteal), utility (environmental, storage, sensory,
  // social), action economy, reaction. Movement/speed effects are
  // intentionally absent; DeepSeek follows examples closely enough that
  // overrepresenting any single category was producing clusters of
  // speed-reduction features in user-facing generations.
  const featureExamples = [
    '{"Verdant Resilience": "While wearing this armor, you have advantage on saving throws against poison and resistance to poison damage."}',
    '{"Hungering Edge": "When you hit a creature with this weapon, you regain hit points equal to half the damage dealt. This property can activate once per turn."}',
    '{"Tidewalker": "While attuned, you can breathe underwater and gain a swimming speed of 60 feet. Once per day, you can cast Control Water without expending a spell slot."}',
    '{"Ironbound Memory": "You can touch this item to a written text and it absorbs the content. As an action, you can project the stored text as glowing letters in the air. The item can store up to 100 pages."}',
    '{"Fracture Point": "As a bonus action, you can mark a creature you can see within 60 feet. Your next attack against that creature scores a critical hit on a roll of 18-20. Once used, this property recharges at dawn."}',
    '{"Echoing Shield": "When you are hit by a spell attack, you can use your reaction to reflect the spell back at the caster. The caster must make the original attack roll against their own AC. Once used, this property recharges after a short or long rest."}',
    '{"Witness Stone": "While attuned, you have truesight to a range of 30 feet and can speak any language you have heard spoken aloud in the last 24 hours."}',
    '{"Heartwood Bond": "While attuned, you can communicate telepathically with one willing creature within 1 mile that you have spent 1 hour bonding with. The bond persists until you choose to end it or attune to a different creature."}'
  ];
  const selectedExample = featureExamples[Math.floor(Math.random() * featureExamples.length)];

  // When resolvedItemType is null (unresolved — LLM determines), use
  // 'Wondrous Item' as the placeholder for featuresAndBonuses. This
  // gives the prompt structure something reasonable to anchor against.
  // The LLM's response is authoritative — it will overwrite bonus,
  // feature_count, and modifier_sentence if it determines a different
  // type (e.g. classifies "Ikwa" as a Weapon).
  const featuresAndBonuses = determineFeaturesAndBonuses(
    rarity.value,
    resolvedItemType || 'Wondrous Item'
  );
  magicItemDescription.value = null;

  const effectDefsString = Object.entries(featuresAndBonuses.effectDefinitions)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  // Only reaches here if user explicitly picked an origin from dropdown
  // (random origin is never assigned when user provides name/lore)
  const userExplicitlyChoseOrigin = !!itemOrigin.value;
  // Origin instruction now uses originDefinitions for thematic context.
  // The previous originRegisterMap bundled origin with naming; that
  // bundling forced stereotype pairings (Slavic = Necromantic, Arabic =
  // Shadow). The refactor splits them: this block carries the thematic
  // register only, and the naming section below carries the linguistic
  // register independently.
  const originInstruction = resolvedOrigin
    ? (userExplicitlyChoseOrigin && itemName.value.trim())
      ? `\nITEM ORIGIN HINT: ${resolvedOrigin} (the user chose this origin AND provided a name — use the origin as thematic influence, but their name "${itemName.value}" is final)\n${originDefinitions[resolvedOrigin] || ''}\n`
      : `\nITEM ORIGIN: ${resolvedOrigin}\n${originDefinitions[resolvedOrigin] || ''}\nThe item's nature, magical properties, cultural context, and lore should reflect this origin. Let the origin deeply influence the item's appearance, magic, and the world it comes from.\n`
    : '';

  const prompt = `You are a D&D 5e item designer. Be concise and table-ready.

RESPONSE FORMAT — STRICT REQUIREMENTS (deviations will be rejected):
- Return ONLY a single valid JSON object matching the structure at the bottom of this prompt.
- No prose before or after the JSON. No commentary, no preamble, no closing remarks.
- No markdown code fences (no \`\`\`json, no \`\`\`).
- No markdown headings (no #), no markdown horizontal rules (no ---), no markdown lists in your response.
- The MECHANICAL EMPHASIS rule below applies ONLY to the contents of feature description strings inside the features object — not to the response as a whole. The response itself is JSON, not markdown.
- All string values must be properly JSON-escaped (escape internal quotes as \\", escape newlines as \\n).
- This prompt contains lots of markdown formatting in its INSTRUCTIONS to you (bold, dashes, bullets, section headers). Do not mirror that formatting in your output. Your output is structured data, not a document.

CONCISENESS RULES:
- Features: State the base spell/mechanic, then ONLY what's different. No restating standard D&D rules. 2-4 sentences each.
- Physical description: 2-3 sentences total. One vivid sensory detail, not exhaustive cataloging.
- Lore: One short paragraph, 3-4 sentences. One origin detail, one consequence or current hook.
- Total item: Under 250 words.

MECHANICAL EMPHASIS — wrap key reference values in **markdown bold** within feature descriptions:
- Charge counts: **3 charges**, **1 charge**, **1d3 charges**
- Distances and ranges: **60 feet**, **30-foot cone**, **120-foot range**
- Damage and dice: **2d6 fire damage**, **1d8 + 2 piercing**
- Save DCs: **DC 15 Wisdom save**
- Durations: **1 hour**, **10 minutes**, **until the next dawn**
- Recharge timing: **dawn**, **short or long rest**
Bold the value plus its immediate unit ("3 charges", not just "3"). Do NOT bold prose, mechanic names, or rules references — only the specific scannable values a DM looks up at the table. Apply this to feature descriptions ONLY, not to physical_description or lore.

USER INPUT IS THE HIGHEST AUTHORITY:
Any specific item details mentioned by the user in the name or lore fields (weapon types, item types, materials, colors, specific features) take precedence over all other instructions in this prompt, including any pre-selected seeds (mood, material, weapon type, etc.). If the user's input conflicts with a seed, the user's input wins. If the user's input is consistent with a seed, both apply.
${itemName.value.trim() ? `
ITEM NAME ANCHORS THE ENTIRE DESIGN:

The user named this item "${itemName.value}". That name is the seed of the item's identity, MORE IMPORTANT than any other instruction in this prompt — including pre-selected mood, origin, material, quirk, era, and lore framing.

Every other element must adapt to make sense in light of the name. If a pre-selected seed contradicts the name's implications, IGNORE THE SEED and let the name drive that element.

Resolution examples:

User name: "Verdant Bow"
Pre-selected mood: "ominous and foreboding"
Resolution: The name implies verdant, growing, life-affirming. The mood seed contradicts this. IGNORE the mood seed. Choose a mood appropriate to "verdant" — likely warm, wild, serene, or joyful — and design accordingly.

User name: "Sunfall Banner"
Pre-selected origin: "Necromantic"
Resolution: The name implies dawn, light, declarative power. The origin seed contradicts this. IGNORE the origin seed for aesthetic purposes — treat it only as background context if at all (the banner was made by people from a culture that practices necromancy, perhaps), but let the name drive the item's actual mood, material, and visual aesthetic.

User name: "The Mourner's Hammer"
Pre-selected material: "frozen flame"
Resolution: The name implies grief, weight, sober purpose. Frozen flame is a vivid material but tonally inappropriate for a mourning weapon. IGNORE the material seed. Choose a material appropriate to the name — fossilized bone, blood iron, ghost wood, weathered stone.

The name is what the user typed. They typed those words for a reason. Honor that reason above any random seed.
` : ''}${itemLore.value.trim() ? `
USER LORE ANCHORS THE DESIGN:

The user has provided lore that describes their vision for this item. This lore is the SECOND-HIGHEST AUTHORITY (after a user-provided name, if any). Pre-selected seeds (mood, origin, material) MUST adapt to fit the lore's implications.

If the lore describes a sacred relic of a dwarven temple, IGNORE pre-selected origins like "Aberrant" or "Abyssal" — the lore says dwarven and that wins.

If the lore describes a child's lost toy made joyful by a fey blessing, IGNORE pre-selected moods like "ominous and foreboding" or "tragic and melancholy" — the lore says joyful and that wins.

The user's words tell you what the item is. The seeds are random suggestions. When they conflict, the user's words win.
` : ''}
Generate a detailed Dungeons & Dragons 5e magic item description adhering to the provided rarity guidelines and incomplete information.

IMPORTANT D&D 5e DESIGN RULES:
- Only Armor and Weapons receive numerical bonuses (+1, +2, etc.) consistently
- Rods, Staffs, Rings, and Wands can occasionally have bonuses (rare)
- Common items are purely cosmetic/utility with NO combat benefits
- Higher rarity does not always mean higher bonus - features matter more
- Balance bonuses with features: high bonus = fewer features
- Use the effect definitions below to understand the appropriate power level for each feature type

ATTUNEMENT (D&D 5e rule — set "requires_attunement" and optionally "attunement_restriction"):
Attunement gates the strongest effects so a single character can't stack too many potent items. Decide based on rarity AND the item's actual power:
- Common: NEVER requires attunement.
- Uncommon: USUALLY does not require attunement; flip to true only if the item grants a meaningful active ability beyond a flat bonus (e.g., spellcasting, sustained passive effects, scaling abilities).
- Rare: OFTEN requires attunement — especially anything granting spellcasting, ongoing buffs, recharge abilities, or substantial defensive bonuses.
- Very Rare: USUALLY requires attunement.
- Legendary: ALMOST ALWAYS requires attunement.
- Artifact: ALWAYS requires attunement.
${resolvedItemType === 'Potion' ? '- Consumable potions NEVER require attunement.' : ''}
${resolvedItemType === 'Scroll' ? '- Consumable scrolls NEVER require attunement.' : ''}
If any feature uses "while attuned", "while wearing", or "while wielding" phrasing with significant ongoing magical effects, set requires_attunement to true. Plain +1/+2 weapons and armor without other features do NOT require attunement.

ATTUNEMENT RESTRICTION (optional, narratively significant only):
Most attuned items can be used by anyone. Sometimes the item is gated to a class, alignment, race, or trait — paladin-only blades, wands restricted to spellcasters, cursed items that bind to creatures of evil alignment. Use the "attunement_restriction" field for this:
- Default: null (item can be attuned by any character).
- When restricted: a short "by X" phrase that composes after "requires attunement". Examples:
  * "by a paladin"
  * "by a sorcerer, warlock, or wizard"
  * "by a creature of evil alignment"
  * "by a non-evil creature"
  * "by a dwarf"
  * "by a creature with a Strength score of 18 or higher"
The phrase MUST start with "by " and be lowercase. It will be rendered as "(requires attunement by a paladin)" verbatim.

Only set a restriction when it makes narrative sense — the item's lore or effects should justify the gate. Restrictions are uncommon; null is the default for most items even when attunement is required. Common cases for restrictions: paladin-themed weapons, wizard wands tied to a school, items forged by a specific race for their kin, cursed items that bind to a particular alignment.

${resolvedItemType ? `CRITICAL — ITEM TYPE ENFORCEMENT:
- The item_type is "${resolvedItemType}". The generated item MUST be a ${resolvedItemType}.
- A Weapon must be a weapon (sword, axe, bow, dagger, mace, halberd, etc.) — NEVER a wand, staff, or rod.
- Armor must be armor (plate, chain mail, leather, shield, etc.) — NEVER a cloak, ring, or amulet.
- A Wondrous Item can be almost anything EXCEPT weapon/armor/wand/rod/staff/ring/scroll/potion.
- Do NOT substitute one item type for another under any circumstances.` : `ITEM TYPE DETERMINATION (user input did not match a known category):

The user has provided input that mentions an item the system did not recognize from its standard D&D 5e categories. You must determine the item_type yourself.

Use your knowledge to interpret the user's input:

1. If the user named a specific item (whether from D&D, real-world history like ikwa, khopesh, tonfa, or another fantasy tradition), classify it under the closest top-level 5e type: Weapon, Armor, Potion, Ring, Rod, Scroll, Staff, Wand, or Wondrous Item.

2. If the user's term is genuinely ambiguous, choose the type that best fits the implied use.

3. If the user's term is unrecognizable, default to "Wondrous Item" — wondrous items can take many forms.

Examples:
- User typed "Ikwa" → item_type: Weapon (ikwa is a Zulu/Nguni stabbing spear)
- User typed "Khopesh" → item_type: Weapon (Egyptian sickle-sword)
- User typed "Tonfa" → item_type: Weapon (Okinawan handled club)
- User typed "Atlatl" → item_type: Weapon (pre-Columbian spear-thrower)
- User typed "Kpinga" → item_type: Weapon (Zande throwing knife)
- User typed "Kente Cloak" → item_type: Wondrous Item OR Armor based on described use
- User typed "Frumblestick" → unrecognizable; default to Wondrous Item

Set "item_type" in your response to your determination. Design the entire item around what the user described — if they named an ikwa, the item should be an ikwa-form spear with the visual and cultural details that implies, not a generic D&D spear with the name "Ikwa" pasted on.

Default to "Wondrous Item" ONLY for truly unrecognizable terms. Recognizable real-world items should be classified correctly even if they aren't in the standard D&D 5e weapon/armor lists.`}
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
${resolvedOrigin && !isUnconventionalPairing ? `
ORIGIN DRIVES LORE CONTENT:

The thematic origin "${resolvedOrigin}" should shape the lore's content. Characters mentioned, places referenced, and cultural traditions invoked should reflect the origin. The naming register determines how proper nouns sound; the origin determines what the lore is about.

The lore MUST explicitly name the origin culture (elves, dwarves, orcs, gnomes, goblins, giants, fey, celestials, etc.) at least once. A reader should be able to identify the origin from the lore alone — origin-ambiguous lore that could equally describe humans or any other origin has failed.
` : ''}
${isUnconventionalPairing ? `
UNCONVENTIONAL PAIRING — TRANSLATE, DON'T MASH UP:

This item pairs ${resolvedOrigin} thematic identity with the ${selectedRegister.split(':')[0]} cultural framework. Render the origin's defining traits through the register's actual practices, materials, and forms — not by giving generic-fantasy occupations names from the register. The race keeps its identity; the cultural framework provides the practices, materials, and forms through which that identity expresses. Avoid surface renaming where only the proper nouns change while everything else stays default-fantasy.

EXPLICIT ORIGIN IDENTIFICATION — REQUIRED:

The lore MUST explicitly name the origin culture. Use the noun form (elves, dwarves, orcs, gnomes, goblins, giants, fey, celestials, etc.) at least once in the lore.

Provide a specific cultural subgroup or location when possible:

- Elven origin → "the Sun Elves of Liang-Tzu," "the elven lineage of [Place]," "the Star-Singers of the elven order"
- Dwarven origin → "the dwarves of [Mountain]," "the [Place] dwarven clan," "the smith-priests of the dwarven [Order]"
- Orcish origin → "the [Tribe] orcs," "the orcish lineage of [Place]," "the orcish [Clan/Order]"
- Gnomish origin → "the gnomes of [Place]," "the gnomish [Order/Guild]"
- Aesthetic origins → reference the origin's nature directly: "the celestial host of [Place]," "the necromancers of [Order]," "the fey of [Court]"

The cultural framework (the language register) provides linguistic style and practices. The origin culture is the actor — the elves, dwarves, orcs, etc. are the ones doing things within this cultural framework.

Reading test: a reader who finishes the lore should be able to identify the origin culture without needing additional context. If the lore could equally describe humans, generic fantasy beings, or members of any other origin, the identification has failed.

Don't just rename — translate.
` : ''}
${itemName.value.trim() ? `USER-PROVIDED NAME — DO NOT CHANGE:
The user has named this item "${itemName.value}". This name is FINAL and MUST appear exactly as written in the "name" field of your output. Do NOT rename, alter, translate, or "improve" it. Build the item's identity AROUND this name — the origin, lore, description, and all features should support and complement the name the user chose.
` : `NAMING STYLE:
Use this linguistic register for ALL names — the item name, character names, faction names, and location names: ${displayedRegister}
All names should feel like they belong to the same world. Do not blend or mix linguistic origins within a single name — commit fully to one style.

NAMING — AVOID OVERUSED DESCRIPTORS:
Do not use these words in the item name: Whispering, Luminous, Celestial, Ethereal, Arcane, Glimmering, Radiant, Verdant.
Use vivid, specific adjectives that match the item's origin and mood instead.

NAMING — AVOID OVERUSED STRUCTURAL PATTERNS:
Do not name items using these structures unless the user explicitly requested it:
- Possessive name + emotional noun: "Lirael's Lament," "Zonothar's Sorrow," "Mira's Weeping Ring"
- Possessive name + abstract suffering: "Vael's Anguish," "Korrish's Despair," "Thaedra's Grief"
- Em-dash descriptive constructions: "Kaelthorn — Last of the Veiled," "Sunfall — Banner of the Dawn"

NAMING — VARY STRUCTURAL PATTERN:
Item names fall into several distinct structural patterns. Vary across generations rather than reflexively defaulting to one. Pick the pattern that best fits THIS item's mood and origin:

- Genitive ("[Noun] of the [Qualifier]"): the workhorse pattern — descriptive object + qualifier. Use it freely, but it should be one tool among several. If your default-first-instinct lands here, reach for a different one this time.
- Compound noun: a single hyphenated or fused word built from two roots — material-noun, sense-noun, or domain-noun pairings. Punchy and memorable, no connective needed.
- Verb-noun action compound ("[Verb][Noun]" or "[Verb]-[Noun]"): the action the item performs as its name, verb-first. Produces a punchier, more active feel than neutral noun-noun compounds.
- Possessive ("[Owner]'s [Object]"): the maker, the first wielder, the witness, the unlucky finder — possessive of a specific or unlikely owner.
- Definite article ("The [Noun]" or "The [Adjective] [Noun]"): single resonant noun framed as a definite thing, for items that feel iconic or singular.
- Paired noun ("[Noun A] and [Noun B]"): two paired elements joined by "and" — often elemental, material, or oppositional pairings. Carries folkloric weight.
- Negation or absence ("The [Absence-Word] [Noun]," "[Adjective-Of-Lack] [Noun]"): names that point to what something LACKS rather than what it has. Strong for cursed, unmade, mysterious, or hollowed-out items.
- Numerical or ordinal ("[Ordinal] [Noun]," "[Number]-Fold [Noun]"): uses a number or ordinal as part of the name. Distinctive and ritualistic-feeling; fits cosmological, mythic, or order-of-X items.
- Bare evocative noun: one word that carries the whole weight — a sound, a quality, a moment, a verb-turned-noun.

The genitive form is the LLM's grammatical safe-default; that's why it dominates without active rebalancing. Treat it as one option among many, not the reflex.

Aim for tonal variety across generations. Items can be:
- Triumphant: themes of victory, light, steadfastness, oath-keeping. Names tend toward short compounds or brief evocative phrases that carry a sense of arrival or vindication.
- Practical: themes of trade, labor, daily craft, occupational pride. Names tend toward possessives of a trade-role or simple descriptors of utility.
- Mysterious: themes of the unknown, the unanswered, the partially-revealed. Names tend toward abstract single nouns, short questions, or open-ended phrases.
- Sinister: themes of predation, betrayal, ruin, the grim aftermath. Names tend toward predatory-creature compounds, grim title-phrases, or terms with finality.
- Whimsical: themes of humble joys, small absurdities, lucky charms, eccentric craft. Names tend toward possessives of an unlikely owner, modest objects, or playful compound phrases.
- Mythic: themes of cosmology, foundation, world-shaping, deep time. Names tend toward short compound nouns, definite-article phrases, or single resonant words.
- Plain descriptive: themes of unflashy function, honest tool-making, materials-first naming. Names tend toward material-plus-form compounds with no flourishes.

Invent fresh names per generation rather than reaching for the same compounds repeatedly. The mood category describes the theme; the actual name should match this generation's specific lore, origin, and register — not a pattern carried over from prior generations.

Match the naming register to the mood and origin. Do not default to melancholy, lament, sorrow, or weeping unless the lore specifically calls for it.
`}
NAMING — DO NOT REUSE EXAMPLE NAMES:

The example names shown in the register description (after "e.g.,") illustrate the linguistic register and phonetic style. They are NOT a list to choose from.

Do NOT use the example names directly in your output. Generate ORIGINAL names that match the register's phonetic patterns and structural style.

For instance, if the register description includes "(e.g., Aelindariel, Saereldreth, Glorwenneth)" — those names are samples teaching you the Elven register. Generate different names in that same register (e.g., Lirathien, Hatholdir, Felarath).

This rule applies to all registers. The examples teach style; your output should commit to that style with original names.

ITEM NAMING — TRANSLATION FOR NON-ENGLISH REGISTERS:

When the linguistic register is non-English (Tamazight, Maori, Yoruba, Finnish, Japanese, Quechua, Mongolian, Tibetan, Welsh, Irish, Slavic, etc.), the item name should be the ENGLISH TRANSLATION of the cultural concept, not the original-language phrase.

The original-language name appears in the description's first sentence with cultural framing.

REQUIREMENT — THE ITEM ITSELF MUST HAVE AN ORIGINAL-LANGUAGE NAME:

The lore MUST include the original-language version of the item's name. Not just original-language character names or place names — the ITEM must have a name in the cultural-linguistic register. Character names and place names alone don't satisfy this requirement; the item needs its own culturally-rooted name.

Even short names work — "Hjartasteinn" or "Starozub" are enough — but one must appear in the lore. The English title is for usability at the table; the original-language name in the lore is what makes the item culturally rooted rather than a culturally-flavored generic.

Examples:

DON'T do this:
- Item name: "Sulkasipailon Kukka"
- Description: "This wand is..."

DO this:
- Item name: "Wand of First Bloom"
- Description: "This wand, called Sulkasipailon Kukka by the sages who first cut it, is..."

DON'T do this:
- Item name: "Tizi-Uzzu"
- Description: "This wand is..."

DO this:
- Item name: "Pass-Wand" (or "Wand of the Mountain Pass" — translator's choice based on what reads naturally)
- Description: "Known as Tizi-Uzzu in the old tongue of the highland clans who carved it, this wand is..."

DON'T do this:
- Item name: "Pou o te Maunga"
- Description: "This staff is..."

DO this:
- Item name: "Heart of the Mountain"
- Description: "Called Pou o te Maunga by the carvers who first shaped it, this staff is..."

The English translation should capture the cultural concept evocatively, not just literally. "Wand of First Bloom" conveys the meaning of "Sulkasipailon Kukka" better than "Feather-Stroke's Flower" would. Translate for poetic effect, not word-for-word.

APPLY translation rule (item name in English, original in description):
- All real-world non-English-language registers: Tamazight (Atlas-Berber), Maori, Hawaiian, Yoruba, Akan, Igbo, Swahili, Arabic, Hindi/Sanskrit, Chinese, Korean, Japanese, Mongolian, Tibetan, Thai, Maya, Aztec/Nahuatl, Lakota, Andean, Russian, Romanian, Hungarian, Slavic, Old Slavic, Celtic, Welsh, Irish, Norse, Old Norse, Germanic, Old High German, Caucasian, Pamir, Finnish, Anglo-Saxon

(Norse, Welsh, Anglo-Saxon, etc. are technically European but their original-language names — "Sigrún Stormhammer," "Æthelflæd" — are intimidating to many DMs at the table. Apply the translation rule to these too — better to err on the side of usability.)

DO NOT apply translation rule (original name as item title is fine):
- Latin (English speakers handle Latin reasonably well)
- Greek (English speakers manage Greek-derived names)
- Italian Renaissance (English speakers handle Italian)
- Elven (high-fantasy elven; standard fantasy)
- Orcish, Goblin-inspired, Gnomish, Draconic, Aberrant, Abyssal, Infernal, Primordial, Technomagical (fictional fantasy registers)

Rule of thumb: if the linguistic register involves diacriticals, unfamiliar phonetics, or non-Roman characters, apply the translation rule. If the register reads as standard fantasy or familiar European, keep original names as titles.

DESCRIPTION INTEGRATION PATTERN — when the translation rule applies:
The original-language name in the description should:
1. Appear in the first sentence (or very early in the lore) so the cultural specificity establishes itself immediately.
2. Connect to the cultural framing (who calls it this, in what tradition, what it means).
3. Not be repeated throughout the description — once is enough; the DM can reference the cultural name when desired but doesn't need to re-encounter it.

Good integration patterns:
- "Called [Original Name] by the [cultural group] of [place], this [physical description]..."
- "Known as [Original Name] in the [language/tongue] of [those who made it], this [physical description]..."
- "The [cultural group] who first carved this [item type] called it [Original Name]; it is [physical description]..."

${buildRealWorldCategoryRestrictionBlock()}

${buildDeityModeBlock(findRegisterByPrefix(selectedRegister))}

CULTURAL-SPECIFIC NAMES — INVENT BY DEFAULT:

When the lore needs any of these culturally-specific named entities, INVENT a fictional name in the register's register rather than using a real one:

- Deities, religious figures, sacred beings, mythological figures
- Clans, kinship groups, family lineages, tribal names
- Sacred places, ceremonial sites, religious geography
- Ceremonial roles, religious titles, traditional offices
- Foundational ancestral figures from creation narratives
- Real historical figures with cultural-religious significance

Invented names should sound culturally appropriate to the register and carry meaningful semantic content where possible — a Yoruba-register iron-spirit might be "Olosun," constructed from a non-sacred word in the register. Don't take a common noun and label it as a sacred figure (e.g., "Kibarua" — Swahili for "casual laborer" — isn't a deity name).

LIMITED EXCEPTIONS — real names CAN be used for these registers only:

- Greek-inspired (Zeus, Athena, Apollo, etc.)
- Latin-inspired / Roman (Jupiter, Mars, Minerva, etc.)
- Egyptian-inspired (Ra, Anubis, Isis, etc.)
- All Norse-related: Norse-inspired, Old-Norse-inspired (Odin, Thor, Loki, etc.)
- Anglo-Saxon-inspired, Old-High-German-inspired, Middle-High-German-inspired, Gothic-inspired (Germanic mythological figures)
- Celtic-inspired, Welsh-inspired, Irish-inspired, Old-Irish-inspired (Celtic mythological figures)
- Elven and all fictional registers (no real-world referents)

These exceptions reflect Western fantasy genre convention — these traditions have been integrated into fantasy long enough that real names are genre-expected.

For ALL other registers (including but not limited to Yoruba, Akan, Igbo, Swahili, Atlas-Berber, Arabic, Hindu/Sanskrit, Chinese, Japanese, Korean, Thai, Mongolian, Tibetan, Maya, Aztec/Nahuatl, Andean, Lakota, Maori, Hawaiian, Slavic, Russian, Romanian, Hungarian, Finnish, Caucasian, Pamir), INVENT fictional named entities. Do not use real religious figures, real clan names, real sacred place names, real political-religious titles, or real culturally-significant historical figures from these traditions in fictional contexts.

Note: Hebrew/Jewish religious-cultural specifics are not in scope at all — the Hebrew register has been removed from the system. If a user's input invokes Hebrew-language signals (shofar, menorah, golem, sephirot, etc.), apply the universal-invent rule even more strictly: do not generate fictional content that references Jewish religious tradition, sacred figures, or sacred concepts. Choose a different cultural register for the item.

Cultural detection from user input still wins. If the user explicitly invokes a real entity ("an item blessed by Athena," "the temple of Inti"), honor their input. The invention rule applies to system-generated content where the user didn't specifically invoke the entity.

LANGUAGE REGISTER OVERRIDE (LLM AUTHORITY):

The pre-selected naming register ("${displayedRegister}") is a fallback, not a constraint. The system pre-selects a register via random selection and a small keyword detection map (covering specific cultural terms like ofuda, atlatl, mjolnir). The keyword map is intentionally narrow — it doesn't cover the broader universe of cultural-linguistic signals that real users will type.

If the user's name or lore contains clear cultural-linguistic signals — proper names from a specific tradition (e.g. "Akiko" → Japanese, "Olaf" → Norse, "Rashidah" → Arabic, "Inkari" → Andean), place names (e.g. "Volga" → Slavic, "Helsinki" → Finnish, "Kyoto" → Japanese, "Andes" → Andean), geographic references (e.g. "Sahel" → West African, "Yangtze" → Chinese, "Atacama" → Andean), historical references, deity names, or any other markers of a specific real-world or fantasy linguistic tradition — OVERRIDE the pre-selected register and use the tradition the user's input implies for ALL generated names (item, characters, factions, locations).

You have world knowledge of cultural-linguistic registers; activate it. The user's signal is the authoritative one. The pre-selected register is the fallback when no cultural signal is detectable.

If the user's input contains MIXED cultural signals (e.g. "Akiko of the Volga"), pick the strongest/most prominent signal and commit to it consistently across all generated names. Don't blend traditions within a single name.

If the user's input has no clear cultural-linguistic signal, use the pre-selected register as written.
${buildLanguageRegisterRestrictionBlock({
  register: displayedRegister,
  isWesternFantasyRaceContext,
  entityNoun: 'item',
})}
${buildPoolPromptBlock(selectedRegister)}
${buildCatchallPromptBlock(selectedRegister)}
${buildCharacterWhitelistBlock(resolvedOrigin, selectedRegister)}

ORIGIN-REGISTER INDEPENDENCE:

The naming register is independent of the item's thematic origin. A ${resolvedOrigin || '[origin determined from input]'} item with ${selectedRegister.split(':')[0]} naming is a perfectly valid combination — embrace the creative possibility rather than fighting the pairing. Do not drift the origin's aesthetic toward the register's culture, or the register's linguistic register toward the origin's stereotype. They describe different dimensions of the item.

All names should feel like they belong to the same linguistic family. Do not blend or mix linguistic origins within a single name — commit fully to one style.

MOOD & TONE:
The overall feel of this item should be: ${selectedMood}
Let this mood influence the name, description, features, and lore. Not every item needs to be heroic or epic.

MAGICAL MATERIAL:
The item incorporates: ${selectedMaterial}
This material should appear as a notable component, accent, or magical element of the item — not necessarily the entire construction. For example, a leather armor might have copper rivets or inlays, a wooden staff might have a crystal tip. Let the item type dictate the base construction; weave this material in naturally.

ITEM QUIRK (FLAVOR ONLY — NEVER A FEATURE):
${selectedQuirk}
${selectedQuirk.includes('no quirk') ? '' : 'Weave this quirk into the physical_description as a sensory detail. The quirk is flavor — it MUST NOT appear as a named feature in the features object. Features are mechanical abilities; quirks are narrative atmosphere.'}

HISTORICAL CONTEXT:
This item is ${selectedEra}.
Let this context shape the lore — the item\'s age, condition, and story should reflect when and how it came to exist.

${itemLore.value.trim() ? `USER-PROVIDED LORE — PRESERVE INTENT:
The user provided this lore: "${itemLore.value}"
Expand on it and enrich it, but keep the core narrative, characters, and events the user described. Do not replace their story with a different one.` : `LORE STYLE:\n${selectedLoreFraming}`}

LORE MUST INCLUDE A NAMED INDIVIDUAL:
The lore must feature at least one named individual person/being connected to the item — not just a group, faction, or anonymous archetype. Pick an archetype that fits the mood, era, and origin above. Suggestions (mix and match for variety — pick what fits, don't default to the same ones):

Origin-side:
- Creator / Forger / Maker (the smith, sage, witch, god, or artificer who made it)
- Patron / Commissioner (who paid for it, demanded it, or sponsored its making)
- Apprentice (who watched the creator at work and inherited the secret)
- Sacrifice (whose life, blood, or soul was given to power or seal it)
- Source / Subject (the being whose body provided a material — a dragon, titan, beast, ancestor)

Wielders:
- First Wielder (who carried it first — hero, soldier, queen, villain, child)
- Champion (who used it for good, possibly martyred)
- Heretic (who used it against their own order, faith, or oath)
- Penitent (who wields or guards it as atonement for a past wrong)
- Inheritor (who received it through bloodline, will, or oath)

Adversaries:
- Corrupter (who twisted its purpose or laid a curse on it)
- Thief (who stole it and what came of that theft)
- Rival / Hunter (who has been pursuing it across years, miles, or generations)
- Destroyer (who tried to unmake it and either failed, half-succeeded, or vanished)
- Deceiver (who used it under a false identity or stolen mantle)

Stewards:
- Sealer / Binder (who locked away its power and how the lock holds)
- Guardian / Keeper (who currently protects it, willingly or not)
- Restorer / Repairer (who put it back together after it broke)
- Last Known Owner (who lost it, where it ended up, who saw it last)
- Exile (who took it into banishment when forced to leave)

Witnesses:
- Scholar / Oracle / Seer (who studied, recorded, or foresaw it)
- Translator / Decipherer (who read inscriptions, glyphs, or hidden marks on it)
- Cartographer (who mapped where it was made, lost, or rediscovered)
- Witness / Chronicler (who recorded its existence in an account, ballad, or letter)
- Prophet / Heralded (who foretold the wielder it would choose)

Use a proper name in the same linguistic register as the item name. Weave the character into the prose naturally — one or two named individuals is plenty; do NOT list them like a roster, and do NOT label them with the archetype tag in the lore text. If the user provided lore, only add a named individual when their text does not already feature one.

COHERENCE:
All of the creative seeds above describe ONE item and must work together as a unified concept.${itemName.value.trim() || itemLore.value.trim() ? ' USER INPUT TAKES PRIORITY — if the user provided a name or lore, the creative seeds (origin, mood, material) should adapt to fit the user\'s vision, not the other way around. The user\'s name and lore are the anchor; the seeds are supporting flavor.' : ' If the naming style is Japanese-inspired and the origin is Fey, then the result should feel like a fey item from a Japanese-inspired culture — not a generic fantasy item with a Japanese name bolted on.'}

CREATIVITY:
- Powerful items can draw from ANY theme: shadow, elemental fury, undead craftsmanship, fey trickery, abyssal corruption, dwarven engineering, oceanic depths, volcanic forge, fungal growth, temporal magic, gravity manipulation, etc.
- Light and celestial themes are valid but should not dominate. Explore the full spectrum.
- Every item should feel genuinely unique. Surprise the user.

${resolvedItemType === 'Potion' ? `SPECIAL RULES FOR POTIONS:
- Potions are CONSUMABLE items (single use, destroyed after drinking)
- NEVER include recharge mechanics ("recharges at dawn", "X charges per long rest", etc.). A potion is consumed once and gone — there is nothing to recharge.
- Effects are TEMPORARY (typically 1 hour, or until triggered/expended)
- Potions SET stats rather than add bonuses (e.g., "Strength becomes 25" not "+5 to Strength")
- Describe the liquid's appearance, color, and taste in physical_description
- CONSUMABILITY IS THE COST — calibrate UPWARD: because a potion is destroyed on use, its single effect should hit HARDER than a non-consumable item of the same rarity. Lean toward the upper end of each tier's power band, not the middle. The reusability of a permanent item is its tax; potions don't pay that tax, so the burst should feel worth using a charge of inventory on.
- Common potions: minor healing (2d4+2), simple buffs
- Uncommon potions: moderate healing (4d4+4), useful buffs (resistance, advantage on checks)
- Rare potions: greater healing (8d4+8), powerful buffs (flight, invisibility)
- Very Rare potions: superior healing (10d4+20), very powerful effects (giant strength 25, heroism)
- Legendary potions: supreme healing (20d4+20), transformative effects (giant strength 29, invulnerability)
- Duration should match rarity: Common/Uncommon (10 min - 1 hour), Rare+ (1 hour - 8 hours)
` : ''}
${resolvedItemType === 'Scroll' ? `SPECIAL RULES FOR SCROLLS:
- Scrolls are CONSUMABLE items (single use, destroyed when read/cast — the writing fades or the scroll burns)
- NEVER include recharge mechanics ("recharges at dawn", "X charges per day", "regains X expended charges", etc.). A scroll is read once and consumed — there is nothing to recharge. Do NOT write features with charge counts or recharge timing.
- Effects fire ONCE on use; ongoing effects last for their stated duration after that single activation, then end permanently
- Describe the parchment, ink, sigils, seals, and any sensory cues (smell of ozone, faint humming, glowing glyphs) in physical_description
- CONSUMABILITY IS THE COST — calibrate UPWARD: because a scroll is destroyed on use, its single effect should hit HARDER than a non-consumable item of the same rarity. Lean toward the upper end of each tier's power band. A reusable wand of the same rarity would do less per casting; the scroll trades reusability for raw potency.
- Common scrolls: minor utility cantrip-tier effects (light, prestidigitation-like, message)
- Uncommon scrolls: 1st-2nd level spells, minor wards, single-target buffs
- Rare scrolls: 3rd-4th level spells, area effects, significant battlefield impact
- Very Rare scrolls: 5th-6th level spells, scene-shaping magic
- Legendary scrolls: 7th-9th level spells, irreversible or world-affecting magic
- A scroll's features object should describe the spell or effect being cast, not a charge-based mechanic
- Scrolls do NOT require attunement
` : ''}
EFFECT DEFINITIONS:
${effectDefsString}

RARITY POWER SCALING:
Match the mechanical power of features to the item's rarity tier:

- Common: Minor utility, flavor effects, +0 weapons. Examples: candle that lights itself, bag that's always slightly cleaner inside than outside, ring that signals when its pair is nearby.
- Uncommon: +1 weapons, single-charge spell-like effects (1st-2nd level), minor combat bonuses. Examples: +1 longsword, cloak of protection, bag of tricks (gray).
- Rare: +2 weapons, multi-charge spell-like effects (3rd-4th level), significant combat advantages. Examples: +2 longsword, flame tongue, ring of spell storing.
- Very Rare: +3 weapons, powerful spell-like effects (5th-6th level), substantial combat or utility power. Examples: +3 longsword, staff of fire, manual of bodily health.
- Legendary: World-changing abilities, unique effects, +4 or attunement-locked items with profound power. Examples: vorpal sword, holy avenger, ioun stones.

CRITICAL — TRIVIAL DRAWBACKS ARE NOT FEATURES:
At Uncommon, Rare, Very Rare, and Legendary rarity, NEVER produce a feature whose primary content is a trivial drawback or restriction. A drawback is not an ability.

Examples of trivial drawbacks that MUST NOT appear as features:
- "This item cannot be set on bare ground"
- "The wielder hears faint music while attuned"
- "Flowers wilt within 5 feet of this item"
- "The item is uncomfortably warm"

These are quirks (flavor) and belong in the physical_description, not in features.

Drawbacks ARE acceptable as features only when:
- The item is an Artifact (which mandates drawbacks)
- The drawback is mechanically substantial (e.g., "each long rest, save vs. exhaustion")
- The drawback is paired with a powerful upside in the same item

NEVER produce a Very Rare or Legendary item whose primary feature is a drawback or trivial restriction. The features must demonstrate the item's power level.

MECHANICAL VARIETY:
Vary the type of mechanical effect across features. Avoid clustering on a single mechanic type.

Effect categories include:
- Damage modifiers (extra dice, type changes, vulnerability/resistance)
- Saving throws (forced saves with various failure conditions)
- Movement effects (speed changes, teleportation, flight, climbing)
- Sensory effects (darkvision, truesight, detect magic, see invisibility)
- Action economy (bonus actions, reactions, additional attacks)
- Buffs and debuffs (advantage/disadvantage, condition application/removal)
- Spell-like abilities (cast specific spells from the item)
- Defensive properties (AC bonuses, shielding effects, deflection)
- Utility effects (light, communication, transportation, illusions, storage)
- Social/narrative effects (Charisma bonuses, language understanding, telepathy)

Speed reduction is one option among many. Do not default to it. Choose effects that fit the item's lore, rarity, and mood.
${rarity.value === 'Artifact' ? `
CRITICAL — ARTIFACT REQUIREMENTS:
Artifacts are campaign-defining relics that MUST include major drawbacks alongside their incredible power.

MANDATORY DRAWBACK ENFORCEMENT:
At least TWO of your features must be CURSES or DRAWBACKS, not benefits. These are not optional flavor text — they must be mechanical penalties that create real risk for the wielder.

At least ONE drawback must be PERSISTENT and ESCALATING — it should get worse the longer the item is used or attuned, creating narrative tension about whether to keep wielding it. Examples: corruption that spreads over time, madness that accumulates, physical transformation, mounting divine displeasure.

Examples of proper drawbacks:
- "Corrupting Influence": Each day you remain attuned to this item, you must succeed on a DC 18 Wisdom saving throw or have your alignment shift one step toward chaotic evil. If you become chaotic evil, you are controlled by the DM until the item is removed.
- "Soul Drain": Each time you use a feature of this item, you take 2d10 necrotic damage that cannot be reduced or avoided. This damage persists even if you are resistant or immune to necrotic damage.
- "Maddening Whispers": While attuned, you hear the voices of those who previously wielded this artifact. Make a DC 17 Wisdom saving throw at the end of each long rest or gain one level of exhaustion.
- "Divine Wrath": If you willingly end your attunement to this item, a deity associated with the artifact becomes aware of your location and sends agents to retrieve it or punish you.

ARTIFACT FEATURE DESIGN PHILOSOPHY:
Artifact features should RESHAPE GAMEPLAY, not just add damage. Prioritize features that:
- Give new tactical options (battlefield control, environment manipulation, summoning)
- Alter the environment (create terrain, change weather, warp reality)
- Interact with the narrative (affect factions, attract enemies, reveal secrets)
- Transform the wielder (physical changes, new senses, planar awareness)

Avoid generic damage riders like "deals +3d6 fire damage." If you include damage features, make them interesting — require positioning, have area effects, scale with story elements, or come with tactical trade-offs.

DRAWBACK PLACEMENT:
Include the drawbacks as named features within the "features" object, alongside the beneficial features. Do NOT hide them in lore text or physical_description — they must be distinct, named features with clear mechanics.
` : ''}
ITEM STRUCTURE TO COMPLETE:
{
  "name": "${itemName.value || '[Generate a unique, evocative name — avoid generic fantasy clichés]'}",${itemName.value.trim() ? ' // USER-PROVIDED — DO NOT CHANGE THIS VALUE' : ''}
  "item_type": "${resolvedItemType || '[Determine from user input — see ITEM TYPE DETERMINATION above. MUST be one of: Weapon, Armor, Potion, Ring, Rod, Scroll, Staff, Wand, Wondrous Item]'}",
  "rarity": "${rarity.value}",
  "bonus": "${featuresAndBonuses.bonus}",
  "modifier_sentence": "${constructModifierSentence(featuresAndBonuses.bonus, resolvedItemType)}",
  "feature_guidelines": "${rarityGuidelines[rarity.value]}",
  "feature_count": ${featuresAndBonuses.feature_count},
  "requires_attunement": [true or false — apply the ATTUNEMENT rule above based on rarity and item power],
  "attunement_restriction": [null OR a "by X" phrase per the ATTUNEMENT RESTRICTION rule — null is the default],
  "features": ${JSON.stringify(featuresAndBonuses.features)},
  "reason_for_rarity_level": "[Explain why this item fits its rarity based on the guidelines above]",
  "physical_description": "[2-3 sentences describing the item's appearance incorporating the magical material, mood, and any quirk. ${resolvedItemType === 'Potion' ? 'For potions: describe the liquid color, consistency, swirls, particles, smell, and taste.' : ''}]",
  "lore": "${itemLore.value || '[Create compelling backstory using the lore style and historical context above. All character names, faction names, and location names must use the same linguistic register as the item name.]'}",
  "related_npcs": [
    /*
      Add one stub for every NAMED INDIVIDUAL person/being relevant to this item — oracles, smiths,
      wielders, gods, owners, witnesses, etc.

      INDIVIDUALS vs GROUPS — important distinction:
        - A specific individual with a proper name (e.g., "Yelena of the Duskwood", "Master Smith Gorvak"):
          extract directly using that name.
        - A GROUP / faction / cult / tribe / order / lineage with no specific member named in the lore
          (e.g., "the Vorn-Taak earth-priests", "the Kha'Zur smith-cults"): INVENT a single plausible
          individual member's name in the same linguistic style as the rest of the lore. Use the invented
          name as this stub's "name". Do NOT use the group's name as the stub's name. In context, identify
          them as a member of that group.
        - If a group AND a specific member are both named in the lore (e.g., "Skragbit, shaman of the
          Mukgash tribe"): only extract the specific member; do NOT invent an additional member for the
          same group.
        - Anonymous archetypes with no proper name ("a wandering knight", "the king"): skip.

      Each stub:
        - name: the individual's name (real if named, invented if only the group was named).
        - role_brief: ≤10 words describing their relationship to this item AND containing the EXACT item
          name verbatim. Examples: "Creator of ${itemName.value || '[item name]'}",
          "Wielder of ${itemName.value || '[item name]'}",
          "Oracle who received the vision of ${itemName.value || '[item name]'}",
          "Smith who forged ${itemName.value || '[item name]'}".
          The item name MUST appear character-for-character — no paraphrasing, no "the staff", no shortened forms.
        - context: one sentence describing what they did or how they relate to this specific item.
          For invented members of a named group, mention the group affiliation here.
        - source_quote: the verbatim sentence(s) in the lore field where this NPC appears, copied
          character-for-character. Used downstream as context for NPC generation. Empty string if the NPC
          was invented from a group passage with no individual reference.

      If the lore mentions no named individuals or groups, return an empty array [].
    */
  ],
  "related_settings": [
    /*
      Add one stub for every NAMED LOCATION the lore anchors to a place — settlements, forges,
      temples, chambers, forests, mountains, ruins, regions, planes. Anywhere the item was made,
      hidden, used, lost, recovered, or otherwise had its history play out, AS LONG AS the place
      has a proper name in the lore.

      LOCATIONS vs NON-LOCATIONS — important distinction:
        - A specific named place (e.g., "the Whispering Glade", "Forge of Vorn", "Throne of Aša"):
          extract directly using that name.
        - A category-only reference with no proper name ("a forest", "the king's hall", "an old
          smithy"): SKIP. Locations need a proper name to anchor a full setting generation.
        - Organizations / factions / cults / orders / lineages: SKIP — those belong in
          related_npcs (as invented members), not here.
        - A region AND a specific place inside it both named ("the Sunless Wood, where the
          Whispering Glade lies"): extract BOTH as separate stubs.

      Each stub:
        - name: the place's proper name as it appears in the lore (verbatim).
        - role_brief: ≤10 words describing the place's relationship to this item AND containing
          the EXACT item name verbatim. Examples: "Forge that produced ${itemName.value || '[item name]'}",
          "Vault holding ${itemName.value || '[item name]'}", "Battlefield where ${itemName.value || '[item name]'} was lost".
        - context: one sentence describing what the place is and how it relates to this item.
          Geographic / political character if useful.
        - source_quote: the verbatim sentence(s) in the lore field where this place appears.

      If the lore mentions no named places, return an empty array [].
    */
  ],
  "related_dungeons": [
    /*
      Add one stub for every NAMED DUNGEON-SHAPED LOCATION the lore anchors to a specific
      bounded site — one structure, one cave system, one fortified building, one barrow.

      DUNGEON-SHAPE vocabulary (signals): Sepulcher, Tomb, Crypt, Barrow, Mausoleum, Vault, Hall,
      Reliquary, Compound, Hold, Watch, Garrison, Foundry, Forge, Works, Mine, Quarry, Lab, Cell,
      Warren, Burrow, Maw, Pit, Sink, Hollow, Spire, Tower, Steading, Lair, Coil, Sty, Heap,
      Cradle, Furnace. If the lore names a place with this kind of shape, add a stub.

      DUNGEON vs SETTING — important distinction (use this to route stubs correctly):
        - A dungeon is a SPECIFIC BOUNDED, DELVABLE place — the party can enter, delve, and exit.
        - A setting is a REGION, SETTLEMENT, or BROADER GEOGRAPHY — kingdom, city, forest, frontier.
        - "The Iron Hills" → setting. "The Hollow Vault in the Iron Hills" → dungeon. Both can
          appear from the same lore as DIFFERENT STUBS in different arrays.
        - "Carthal, the Free City" → setting. "The catacombs under Carthal" → dungeon.

      NON-DUNGEONS — skip:
        - A category-only reference with no proper name ("an old smithy", "a hidden vault"): SKIP.
        - An organization / faction / cult / order / lineage: SKIP (those go in related_npcs).
        - A place referenced ONLY by relationship to a named entity ("the king's hall"): SKIP.

      Each stub:
        - name: the place's proper name as it appears in the lore (verbatim).
        - role_brief: ≤10 words describing the place's relationship to this item AND containing
          the EXACT item name verbatim. Examples: "Tomb where ${itemName.value || '[item name]'} was sealed",
          "Forge that produced ${itemName.value || '[item name]'}", "Vault that contains ${itemName.value || '[item name]'}".
        - context: one sentence describing what the place is and how it relates to this item.
          Structural / geographic character if useful.
        - source_quote: the verbatim sentence(s) in the lore field where this place appears.

      If the lore mentions no named dungeon-shaped places, return an empty array [].
    */
  ]
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
7. ${resolvedItemType
    ? `The "item_type" in the output MUST be exactly "${resolvedItemType}" — do not change it`
    : `The "item_type" in the output is your determination based on the user's input — see ITEM TYPE DETERMINATION above. It MUST be one of: Weapon, Armor, Potion, Ring, Rod, Scroll, Staff, Wand, Wondrous Item.`}

EXAMPLE of correct "features" format:
Instead of: {"feature_name_1": "useful_magical_effect"}
Do this: ${selectedExample}${resolvedItemType === 'Potion' ? '\n\nPOTION EXAMPLE:\n{"Giant\'s Might": "Your Strength score becomes 25 for 1 hour. You have advantage on Strength checks and Strength saving throws during this time.", "Enhanced Fortitude": "For the duration, you gain 20 temporary hit points."}' : ''}`;

  try {
    loadingItem.value = true;
    const response = await generateGptResponse(prompt, itemValidation, 3);
    magicItemDescription.value = JSON.parse(response);
    magicItemDescription.value.rarity = parseRarity(magicItemDescription.value.rarity);

    // Normalize fields the LLM occasionally drops. The validator now
    // treats these as optional; we backfill from sensible sources so the
    // saved item has a stable shape regardless of the model's mood.
    if (typeof magicItemDescription.value.feature_count !== 'number') {
      const featureKeys = magicItemDescription.value.features
        ? Object.keys(magicItemDescription.value.features)
        : [];
      magicItemDescription.value.feature_count = featureKeys.length;
    }
    if (typeof magicItemDescription.value.bonus !== 'string') {
      magicItemDescription.value.bonus = featuresAndBonuses.bonus || '';
    }
    if (typeof magicItemDescription.value.modifier_sentence !== 'string') {
      magicItemDescription.value.modifier_sentence = constructModifierSentence(
        featuresAndBonuses.bonus,
        resolvedItemType
      );
    }

    // Name fallback: when the model drops the `name` field but otherwise
    // produces a usable item, recover with a focused single-purpose API
    // call rather than failing the whole generation. This is faster and
    // less wasteful than re-running the full prompt — we have a complete
    // item, we just need to fill in the one missing creative slot.
    const generatedName = (magicItemDescription.value.name || '').toString().trim();
    if (!generatedName) {
      logger.warn('Item generation: name missing from primary response — running focused fallback call');
      const fallbackName = await generateNameFallback(magicItemDescription.value);
      if (!fallbackName) {
        throw new Error('Failed to generate item name — both primary and fallback calls dropped the name field');
      }
      magicItemDescription.value.name = fallbackName;
    } else {
      // Strip any wrapping quotes the model occasionally adds.
      magicItemDescription.value.name = generatedName.replace(/^["'`]+|["'`]+$/g, '').trim();
    }

    magicItemDescription.value.questHooks = [];
    magicItemDescription.value.related_npcs = normalizeRelatedNPCs(magicItemDescription.value.related_npcs);
    magicItemDescription.value.related_settings = normalizeRelatedSettings(magicItemDescription.value.related_settings);
    magicItemDescription.value.related_dungeons = normalizeRelatedDungeons(magicItemDescription.value.related_dungeons);
    // Persist the selected register on the saved item so cross-tool
    // promotions (e.g., item → NPC) can inherit it without re-detecting
    // from the lore. Legacy items without this field fall back to
    // detection at promotion time.
    magicItemDescription.value.selectedRegister = selectedRegister;
    loadingItem.value = false;
    saveItem(magicItemDescription.value);
    const index = savedItems.value.findIndex((item) => item.name === magicItemDescription.value.name);
    selectItem(index);
    activeTabId.value = 'item-details';
    toast.success('Magic item generated and saved.');
  } catch (error) {
    logger.error("Error generating magic item:", error);
    toast.error('Failed to generate magic item. Please try again.');
    loadingItem.value = false;
  }
};

/**
 * Recover a missing item name with a focused single-purpose API call.
 *
 * Used when the primary item-generation call produced a usable response
 * but dropped the `name` field. Cheaper and faster than re-running the
 * full prompt: we have the lore, physical description, type, and rarity,
 * and just need a short name that fits.
 *
 * Returns the cleaned name string, or null if the fallback also fails.
 * Caller decides whether to throw on null.
 */
const generateNameFallback = async (item) => {
  const physical = (item?.physical_description || '').toString().trim();
  const lore = (item?.lore || '').toString().trim();
  // Cap lore at ~600 chars to keep the focused prompt small. The
  // linguistic register of names appears across the lore, so the head
  // is enough for the model to match style.
  const loreExcerpt = lore.length > 600 ? `${lore.slice(0, 600)}…` : lore;

  const prompt = `You are a D&D 5e item designer. Generate a single short, evocative name for this magic item.

ITEM TYPE: ${item?.item_type || 'Wondrous Item'}
RARITY: ${item?.rarity || 'Uncommon'}
${physical ? `PHYSICAL DESCRIPTION: ${physical}\n` : ''}${loreExcerpt ? `LORE: ${loreExcerpt}\n` : ''}
Output ONLY the name (3-6 words). No quotes, no explanation, no JSON, no markdown. Match the linguistic style of any character or place names already in the lore. Avoid generic fantasy clichés.`;

  try {
    // No JSON validator — this call returns raw text. Two attempts is
    // plenty for a single-string output; falling back further would just
    // waste tokens.
    const raw = await generateGptResponse(prompt, null, 2);
    const cleaned = (raw || '')
      .toString()
      .trim()
      .split('\n')[0]                  // first line only — defends against accidental commentary
      .replace(/^["'`]+|["'`]+$/g, '') // strip wrapping quotes
      .trim();
    return cleaned || null;
  } catch (error) {
    logger.error('Name fallback generation failed:', error);
    return null;
  }
};

const itemValidation = (jsonString) => {
  try {
    const jsonObj = JSON.parse(jsonString);
    // Required fields are limited to the irreplaceable creative outputs
    // the model MUST produce. Optional fields the model occasionally
    // drops are normalized post-parse:
    //   - feature_count: derivable from Object.keys(features).length
    //   - bonus / modifier_sentence: usually "" for Potions and Wondrous
    //     Items; the deterministic featuresAndBonuses values fill in
    //   - name: recovered via a focused single-purpose API call when
    //     missing, rather than failing the whole generation
    // The retry loop would otherwise spin through 3 identical mis-shaped
    // responses and fail when the model drops one of these fields, even
    // though the rest of the response is fine.
    const keys = [
      'item_type',
      'rarity',
      'features',
      'physical_description',
      'lore'
    ];
    if (!keys.every((key) => key in jsonObj)) return false;
    // item_type must be one of the legitimate D&D 5e item categories.
    // Critical when resolvedItemType was null and the LLM determined
    // the type from user input — guards against hallucinated categories
    // ("Cyberweapon", "Foo") that would break downstream rendering.
    // Also serves as a backstop when the type IS pre-resolved: the
    // model occasionally rewrites item_type even when instructed not to.
    const validItemTypes = ['Weapon', 'Armor', 'Potion', 'Ring', 'Rod', 'Scroll', 'Staff', 'Wand', 'Wondrous Item'];
    if (!validItemTypes.includes(jsonObj.item_type)) return false;
    // related_npcs is optional, but if present must be an array of {name, role_brief, context}
    if ('related_npcs' in jsonObj) {
      if (!Array.isArray(jsonObj.related_npcs)) return false;
      const ok = jsonObj.related_npcs.every(stub =>
        stub && typeof stub === 'object'
        && typeof stub.name === 'string'
      );
      if (!ok) return false;
    }
    // related_settings is optional too; same minimal shape requirement
    // (everything beyond name is normalized post-parse).
    if ('related_settings' in jsonObj) {
      if (!Array.isArray(jsonObj.related_settings)) return false;
      const ok = jsonObj.related_settings.every(stub =>
        stub && typeof stub === 'object'
        && typeof stub.name === 'string'
      );
      if (!ok) return false;
    }
    // related_dungeons is optional too; same minimal shape requirement.
    if ('related_dungeons' in jsonObj) {
      if (!Array.isArray(jsonObj.related_dungeons)) return false;
      const ok = jsonObj.related_dungeons.every(stub =>
        stub && typeof stub === 'object'
        && typeof stub.name === 'string'
      );
      if (!ok) return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

// Normalize a related_npcs array (from a fresh generation or imported data)
// to the canonical stub shape. `npc_id` is the only promotion-link field;
// `npc_folder` was a denormalized hint that the substrate has stopped
// writing — `drop-npc-folder` strips it from existing data.
const normalizeRelatedNPCs = (raw) => {
  if (!Array.isArray(raw)) return [];
  const seen = new Set();
  const stubs = [];
  for (const entry of raw) {
    const name = (entry?.name || '').toString().trim();
    if (!name) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    stubs.push({
      name,
      role_brief: (entry.role_brief || '').toString().trim(),
      context: (entry.context || '').toString().trim(),
      source_quote: (entry.source_quote || '').toString().trim(),
      npc_id: entry.npc_id || null,
    });
  }
  return stubs;
}

// Normalize a related_settings array (locations the item's lore names
// that could be promoted into full settings). Same shape and dedupe
// rules as normalizeRelatedNPCs; `setting_id` is the promotion-link
// field instead of `npc_id`.
const normalizeRelatedSettings = (raw) => {
  if (!Array.isArray(raw)) return [];
  const seen = new Set();
  const stubs = [];
  for (const entry of raw) {
    const name = (entry?.name || '').toString().trim();
    if (!name) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    stubs.push({
      name,
      role_brief: (entry.role_brief || '').toString().trim(),
      context: (entry.context || '').toString().trim(),
      source_quote: (entry.source_quote || '').toString().trim(),
      setting_id: entry.setting_id || null,
    });
  }
  return stubs;
}

// Normalize related_dungeons inline emissions from the main item
// generation prompt. Same shape and dedupe rules as
// normalizeRelatedSettings; the only difference is the promotion-link
// field name (`dungeon_id` vs `setting_id`).
const normalizeRelatedDungeons = (raw) => {
  if (!Array.isArray(raw)) return [];
  const seen = new Set();
  const stubs = [];
  for (const entry of raw) {
    const name = (entry?.name || '').toString().trim();
    if (!name) continue;
    const key = name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    stubs.push({
      name,
      role_brief: (entry.role_brief || '').toString().trim(),
      context: (entry.context || '').toString().trim(),
      source_quote: (entry.source_quote || '').toString().trim(),
      dungeon_id: entry.dungeon_id || null,
    });
  }
  return stubs;
}

const constructModifierSentence = (bonus, itemType) => {
  if (!bonus || bonus === '0') return '';

  // Wrap the bonus pair in markdown bold so formatMarkdown emits <strong>
  // around it. Mirrors the mechanical-emphasis rule applied to feature
  // descriptions — a DM scanning the card should be able to find "+1 bonus"
  // at the same visual weight regardless of whether it sits in the
  // unlabeled passive paragraph or under a feature label.
  const b = `**${bonus} bonus**`;

  switch (itemType) {
    case 'Armor':
      return `While wearing this armor, you gain a ${b} to AC.`;
    case 'Weapon':
      return `You have a ${b} to attack and damage rolls made with this weapon.`;
    case 'Rod':
    case 'Staff':
      return `While holding this ${itemType.toLowerCase()}, you gain a ${b} to spell attack rolls and to the saving throw DCs of your spells.`;
    case 'Ring':
      return `While wearing this ring, you gain a ${b} to AC and saving throws.`;
    case 'Wand':
      return `While holding this wand, you gain a ${b} to spell attack rolls.`;
    default:
      return '';
  }
}

const parseRarity = (rarity) => {
  if (!rarity) return '';
  return rarity.split(' // ')[0];
}

const formatMarkdown = (text) => {
  if (!text) return text;

  // Escape HTML to prevent XSS
  const escapeHtml = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  // Escape any existing HTML first
  text = escapeHtml(text);

  // Then apply markdown formatting (now safe because we escaped first)
  // Bold first (double asterisks)
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Then italic (single asterisks)
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');

  return text;
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
  const item = magicItemDescription.value;
  const parts = [`${item.name}`, `${item.item_type}, ${item.rarity}`];

  if (item.physical_description) {
    parts.push('', item.physical_description);
  }

  if (item.modifier_sentence) {
    parts.push('', item.modifier_sentence);
  }

  Object.entries(item.features || {}).forEach(([feature, description]) => {
    parts.push('', `${feature}: ${description}`);
  });

  if (item.lore) {
    parts.push('', `Lore: ${item.lore}`);
  }

  navigator.clipboard.writeText(parts.join('\n'));
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
    'Legendary': 4,
    'Artifact': 5
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
  if (editForm.value.requires_attunement !== !!original.requires_attunement) return true;
  if ((editForm.value.attunement_restriction || '').trim() !== (original.attunement_restriction || '').trim()) return true;
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
  activeTabId.value = 'item-details';
  showExport.value = false;
};

const deleteItem = () => {
  if (confirm('Are you sure you want to delete this item?')) {
    if (activeItemIndex.value !== null) {
      const deletedName = savedItems.value[activeItemIndex.value]?.name;
      savedItems.value.splice(activeItemIndex.value, 1);
      localStorage.setItem('savedItems', JSON.stringify(savedItems.value));
      if (deletedName) {
        removeReferencesForItem(deletedName);
        // We intentionally do NOT clear the denormalized
        // sourceType/sourceId/sourceName fields on settings or
        // dungeons that point at this item. Those fields drive the
        // render-time "(deleted)" marker via `sourceExists` — if we
        // dropped them eagerly, the entire "Inspired by" line would
        // vanish from the card and the user would have no signal
        // that the source was once present. Persistent cleanup
        // belongs on a subsequent save of the dungeon/setting (not
        // here), so the user sees the marker first.
      }
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

function deleteAllItems() {
  // Drop each item's cross-tool references before clearing the library,
  // mirroring the single-item delete path (removeReferencesForItem). The
  // canonical entities in other stores (NPCs, settings, dungeons) are left
  // intact — deleting items does not cascade.
  for (const item of savedItems.value) {
    if (item?.name) removeReferencesForItem(item.name);
  }
  savedItems.value = [];
  localStorage.setItem('savedItems', JSON.stringify(savedItems.value));
  newItem();
  toast.success('All magic items deleted.');
}

const startEditing = () => {
  const featuresArray = Object.entries(magicItemDescription.value.features || {}).map(([name, description]) => ({
    name,
    description
  }));

  editForm.value = {
    name: magicItemDescription.value.name || '',
    item_type: magicItemDescription.value.item_type || '',
    rarity: magicItemDescription.value.rarity || '',
    requires_attunement: !!magicItemDescription.value.requires_attunement,
    attunement_restriction: magicItemDescription.value.attunement_restriction || '',
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

  const oldName = magicItemDescription.value?.name;
  const newName = editForm.value.name;

  // Normalize attunement_restriction: only meaningful when attunement
  // is required, and the rendered output expects either a "by …" phrase
  // or null (never an empty string).
  const requiresAttunement = !!editForm.value.requires_attunement;
  const restriction = requiresAttunement
    ? (editForm.value.attunement_restriction || '').trim() || null
    : null;

  magicItemDescription.value = {
    ...magicItemDescription.value,
    name: newName,
    item_type: editForm.value.item_type,
    rarity: editForm.value.rarity,
    requires_attunement: requiresAttunement,
    attunement_restriction: restriction,
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

  if (oldName && newName && oldName !== newName) {
    const result = renameItemReferences(oldName, newName);
    if (result.totalUpdated > 0) {
      toast.success(`Renamed and updated ${result.totalUpdated} reference${result.totalUpdated === 1 ? '' : 's'}.`);
    }
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
    'Legendary': 'legendary_magical_effect',
    'Artifact': 'legendary_magical_effect (with major drawback)'
  };

  const effectLevel = rarityToEffectLevel[editForm.value.rarity] || 'useful_magical_effect';

  const featurePrompt = `You are a D&D 5e item designer. Be concise and table-ready.

FEATURE WRITING RULES:
- State the base spell or mechanic, then ONLY what's different from standard rules
- 2-4 sentences maximum
- Include specific mechanics: damage dice, DCs, ranges, durations, recharge
- No restating rules the DM already knows

MECHANICAL EMPHASIS — wrap key reference values in **markdown bold**:
- Charge counts: **3 charges**, **1 charge**, **1d3 charges**
- Distances and ranges: **60 feet**, **30-foot cone**, **120-foot range**
- Damage and dice: **2d6 fire damage**, **1d8 + 2 piercing**
- Save DCs: **DC 15 Wisdom save**
- Durations: **1 hour**, **10 minutes**, **until the next dawn**
- Recharge timing: **dawn**, **short or long rest**
Bold the value plus its immediate unit ("3 charges", not just "3"). Do NOT bold prose, mechanic names, or rules references — only the specific scannable values a DM looks up at the table.

Generate a single D&D 5e magic item feature for the following item:

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
    logger.error('Error generating feature:', error);
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

// Reload when the NPC Generator (in another tab, or via the same-tab bridge)
// updates a stub on an item. This keeps the active view consistent without
// requiring a manual refresh.
const handleSavedItemsStorageChange = (e) => {
  if (e?.key && e.key !== 'savedItems') return;
  const previousName = magicItemDescription.value?.name || null;
  loadSavedItems();
  if (previousName) {
    const idx = savedItems.value.findIndex(i => i?.name === previousName);
    if (idx !== -1) {
      activeItemIndex.value = idx;
      magicItemDescription.value = savedItems.value[idx];
    }
  }
};

onMounted(() => {
  loadSavedItems();
  window.addEventListener('storage', handleSavedItemsStorageChange);
  window.addEventListener('saved-items-updated', handleSavedItemsStorageChange);

  // Deep link from another tool (e.g., the NPC Generator's "From [item]" link
  // on item-sourced NPCs). Selects the matching saved item by name.
  const params = getNavigationParams();
  if (params.item) {
    const idx = savedItems.value.findIndex(i => i?.name === params.item);
    if (idx !== -1) {
      selectItem(idx);
    }
  }
});

onUnmounted(() => {
  window.removeEventListener('storage', handleSavedItemsStorageChange);
  window.removeEventListener('saved-items-updated', handleSavedItemsStorageChange);
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

/* ZONE 1: Hero header — page heading zone (H1 + tagline) above the form
   card. H1 carries SEO/marketing/impact; the form card's H2 does
   editorial form-orientation. */
.hero-header {
  text-align: center;
  padding: 2rem 1rem 2.5rem;

  .brand-line {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .page-heading__title {
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
    font-size: 3.6rem;
    font-weight: 600;
    color: var(--color-action-hover, #2A4D70); /* dark lapis */
    margin: 0 0 0.75rem;
    line-height: 1.15;
    letter-spacing: -0.015em;
  }

  .page-heading__tagline {
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
    font-size: 1.6rem;
    color: var(--par-color-text-secondary, #555);
    font-style: italic;
    margin: 0;
    line-height: 1.6;
  }

  .brand-name {
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--color-action-secondary-rest, #5A7A9A); /* muted lapis */
    letter-spacing: 0.04em;
  }

}

/* Page H1 scales down on narrow viewports so it doesn't wrap awkwardly. */
@media (max-width: 600px) {
  .hero-header .page-heading__title {
    font-size: 2.8rem;
    line-height: 1.2;
  }

  .hero-header .page-heading__tagline {
    font-size: 1.5rem;
  }
}

/* ZONE 2: Form card — lifted content surface, lapis "magic UI" register */
.form-card {
  background: var(--par-color-surface-card, #FEFBF4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  padding: 2.25rem 2.25rem 2rem;
}

.form-heading {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--color-action-hover, #2A4D70); /* dark lapis */
  text-align: center;
  margin: 0 0 0.5rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.form-subhead {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);
  font-size: 1.4rem;
  color: var(--par-color-text-secondary, #555);
  text-align: center;
  font-style: italic;
  margin: 0 0 1.75rem;
  line-height: 1.6;
}

.form-subhead__random {
  display: inline;
  background: transparent;
  border: none;
  padding: 0 0 1px;
  font-family: inherit;
  font-size: inherit;
  font-style: italic; /* explicit — buttons don't inherit italic */
  color: var(--color-action-hover, #2A4D70);
  font-weight: 500;
  cursor: pointer;
  border-bottom: 0.5px solid var(--color-action-hover, #2A4D70);
  vertical-align: baseline;
  line-height: inherit;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.form-subhead__random:hover {
  color: var(--color-action-active, #1F3A5C);
  border-color: var(--color-action-active, #1F3A5C);
}

.form-subhead__random:focus {
  outline: none;
}

.form-subhead__random:focus-visible {
  outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
  outline-offset: 2px;
  border-radius: 2px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 0 0 1.25rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

/* ZONE 3: Footer meta */
.footer-meta {
  /* Visual chrome (text-align, background, border, radius) removed during
     PatreonCallout migration — the callout owns its own surface treatment.
     Layout properties (margin, max-width) preserved. */
  margin-top: 1.5rem;
  padding: 0;
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

/* Pattern A item view: layout only. The container, tab strip, and
   related sections all span the full main-container width; only the
   item card (and its edit form) is centered at the prior ~700px content
   width within it. */
/* Content container — cream surface-card panel (same as the dungeon
   generator's .content-container). Extends up over the ParTabs strip so the
   tabs and the active panel share one card. */
.item-view {
  box-sizing: border-box;
  background-color: var(--par-color-surface-card, #FEFBF4);
  border-radius: 8px;
  padding: 2.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 2rem;
}

@media (max-width: 2080px) {
  .item-view {
    margin-top: 3rem;
  }
}

.item-view__panel:focus {
  outline: none;
}

/* Loading skeleton wrapper (transient). */
.form-container {
  color: $cdr-color-text-primary;
  padding: 2rem 3rem;
  background-color: var(--par-color-surface-card, #FEFBF4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  box-shadow: 0 1px 3px rgba(60, 50, 30, 0.06);
}

.rarity {
  font-style: italic;
  margin-bottom: 1rem;
}

.item-form {
  /* No flex gap — ParField owns vertical rhythm via its own margins. */
  margin-bottom: 20px;
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

/* ============================================
   Item edit panel — parchment-styled, mirrors
   the visual rhythm of the read-only item card
   so editing feels like an in-place mode flip
   rather than a separate form.
   ============================================ */
.item-edit {
  background: var(--par-color-surface, #FBF7F0);
  border: 0.5px solid var(--par-color-border, #e8e2d4);
  border-top: 2px solid var(--par-color-title, #7a1f1f);
  border-radius: 2px;
  /* Full-width card; form content centered to a ~700px column. */
  padding: 2rem max(2.5rem, calc((100% - 700px) / 2));
  margin-bottom: 1.5rem;
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.item-edit__header {
  margin-bottom: 0.25rem;
}

.item-edit__title {
  margin: 0;
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.85rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.02em;
}

.item-edit__row {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.item-edit__field--inline {
  flex: 1;
  min-width: 0;
}

.item-edit__attunement {
  border: 1px solid var(--par-color-divider, #e2dccd);
  border-radius: var(--par-radius-sm, 3px);
  padding: 0.9rem 1.1rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.item-edit__attunement-restriction {
  /* Indent the conditional restriction so it reads as nested under the toggle. */
  padding-left: 0.25rem;
}

.item-edit__features {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.item-edit__section-title {
  margin: 0;
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.02em;
}

.item-edit__feature-row {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.9rem 1.1rem;
  background: rgba(232, 226, 212, 0.35);
  border: 1px solid var(--par-color-divider, #e2dccd);
  border-radius: var(--par-radius-sm, 3px);
}

.item-edit__feature-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  align-items: center;
  margin-top: 0.25rem;
}

.item-edit__add-feature {
  align-self: flex-start;
}

.item-edit__footer {
  margin-top: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--par-color-divider, #e2dccd);
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

@media (max-width: 600px) {
  .item-edit {
    padding: 1.5rem;
  }

  .item-edit__row {
    flex-direction: column;
  }
}

.sidebar-content {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, 'Times New Roman', serif);

  /* Scrollable item list. The pinned footer below never scrolls away. */
  .sidebar-scroll {
    flex: 1;
    overflow-y: auto;
    padding-top: 0.5rem;
  }

  .saved-items {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  /* Each entry is a designed object: editorial name + small-caps rarity tag.
     Typography is the sole treatment — no rarity color marker, by design
     (per-rarity bars read as categorical noise when items group up). */
  .sidebar-item {
    transition: background-color 0.15s ease;

    &:hover {
      background-color: rgba(243, 235, 218, 0.4); /* subtle warm tint */
    }
  }

  .sidebar-item__button {
    width: 100%;
    /* Single-line row: name left, rarity tag right. baseline keeps the
       name and rarity tag sharing a typographic baseline. */
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.5rem;
    text-align: left;
    background: transparent;
    border: none;
    /* Roomier rows with a hairline divider — matches the statblock sidebar. */
    border-bottom: 1px solid var(--par-color-divider, #e2dccd);
    padding: 1.3rem 1.6rem;
    font-family: inherit;
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
      outline-offset: -2px;
    }
  }

  .sidebar-item__name {
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--par-color-text, #222);
    line-height: 1.3;
    /* long names wrap to a second line; rarity tag stays right on line one */
  }

  .sidebar-item__rarity {
    font-size: 1.3rem;
    color: var(--par-color-text-secondary, #555);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap; /* never wrap the rarity tag itself */
    flex-shrink: 0;      /* and never let it get squeezed */
  }

  /* Active: warm tan bg + lapis name. */
  .sidebar-item--active {
    background-color: var(--par-color-callout-bg, #f3ebda);

    &:hover {
      background-color: var(--par-color-callout-bg, #f3ebda);
    }

    .sidebar-item__name {
      color: var(--color-action-hover, #2A4D70);
      font-weight: 600;
    }

    .sidebar-item__rarity {
      color: var(--par-color-text-secondary, #555);
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
  }

  .form-card {
    padding: 1.5rem;
    border-radius: var(--par-radius-lg, 12px);
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

/* ============================================
   Item Card v3 — restrained, mechanics-first.
   Description and lore sit in the flow with no
   chrome; lore is collapsible and demoted.
   ============================================ */

/* Card surface uses parchment tokens directly. The previous block of
   local --card-* / --title-color / --body-text aliases mapped 1:1 to
   parchment values (the item card was the de-facto reference register);
   inlining the tokens removes the indirection and stops any drift from
   the parchment system over time. NPCCard.vue went through the same
   sweep — both cards now render against the same paper tone. */
.item-card {
  background: var(--par-color-surface, #FBF7F0);
  border: 0.5px solid var(--par-color-border, #e8e2d4);
  border-top: 2px solid var(--par-color-title, #7a1f1f);
  border-radius: 2px;
  margin-bottom: 1.5rem;
  /* Full-width card surface (cohesive with the related sections); the
     content is centered to a ~700px readable column via symmetric
     padding that grows on wider cards and falls back on narrow ones. */
  padding: 2rem max(2.5rem, calc((100% - 700px) / 2));
  /* Card root carries the `parchment` marker class (see App.vue) which
     opts the card and its descendants out of the project-wide sans-serif
     override, so this declaration applies normally and inherits down. */
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.5rem;
  line-height: 1.7;
  color: var(--par-color-text, #222);
}

/* Header: title + type/rarity on the left, Edit Item button top-right. */
.item-card-header {
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.item-card-header-text {
  flex: 1;
  min-width: 0;
}

.item-card-name {
  margin: 0 0 0.15rem;
  font-size: 2.9rem;
  font-weight: 400;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.01em;
}

.item-card-subtitle {
  margin: 0;
  font-size: 1.55rem;
  color: var(--par-color-text-muted, #6b6b6b);
  font-style: italic;
}

/* Body rhythm: every section in the card body — flavor description,
   modifier paragraph, each feature, lore callout — is separated by
   ~2rem of vertical space. The card's content blocks are dense enough
   (paragraphs, not full sections) that a single consistent gap reads
   cleaner than escalating rhythm. The lore callout's tinted background
   handles the zone-change signal that escalating gaps used to carry.

   Description: italic body text, transitional prose between header
   and mechanics. Line-height 1.65 sits between mechanics' 1.5 and
   lore's 1.6 — italic prose at a slightly looser rhythm than the
   reference blocks below it. */
.item-card-description {
  margin: 1.75rem 0 0;
  max-width: 65ch;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
  font-size: 1.75rem;
  line-height: 1.65;
}

/* Mechanics: highest contrast block on the card. Reference text — read
   for specific values (DC, damage, condition) rather than narratively —
   so line-height tightens to 1.6 for faster vertical scanning.

   `max-width: 65ch` caps line length around 60-70 actual characters of
   Georgia (its "0" is on the wide side of the alphabet) — the readable
   range without cramping the card. */
.item-card-mechanics {
  margin-top: 2rem;
  max-width: 65ch;
}

/* Passive modifier paragraph (e.g. "You have a +1 bonus to attack..." or
   "While wearing this armor, you gain a +1 bonus to AC."). Sits at the
   top of mechanics with no extra top margin — the mechanics block's
   own margin-top (2rem) owns the gap from the description above. */
.item-card-modifier {
  margin: 0 0 2rem;
  color: var(--par-color-text, #222);
  font-size: 1.55rem;
  line-height: 1.5;
}

/* Feature-to-feature gap. 2rem matches the rest of the body rhythm —
   features read as discrete reference blocks rather than tightly-packed
   sub-paragraphs of a single section. */
.item-feature {
  margin-bottom: 2rem;
}

.item-feature:last-child {
  margin-bottom: 0;
}

/* Feature heading. Sized just barely above body (16px vs 15.5px) so the
   ratio matches the pre-compaction card and the heading doesn't feel
   over-weighted relative to the now-tighter mechanical text. Hierarchy
   reads through bold weight + burgundy color, not size — the sourcebook
   pattern. */
.item-feature-name {
  margin: 0 0 0.15rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
  line-height: 1.3;
}

.item-feature-description {
  margin: 0;
  font-size: 1.55rem;
  color: var(--par-color-text, #222);
  line-height: 1.5;
}

/* Multi-paragraph mechanical text reads as a tight reference block: the
   gap between paragraphs sits at 0.4em rather than the natural prose
   ~1em, so multi-sentence features stay visually packed. v-html through
   formatMarkdown only emits inline markup today, but if/when feature
   content carries `\n\n` or other markdown produces sibling <p>s, this
   rule keeps them dense. Empty for the current single-paragraph case. */
.item-feature-description p {
  margin: 0 0 0.4em;
}

.item-feature-description p:last-child {
  margin-bottom: 0;
}

/* Lore: tinted callout block. The warmer cream background (slightly
   darker than the card surface) owns the zone change — no divider rule
   needed. The label calls out supplementary content; the body sits
   roman (not italic) so it reads as prose, not flavor text.

   Narrative reading mode — linear and immersive rather than scanned —
   so line-height stays at 1.6 (looser than mechanics' 1.5 but not the
   prior 1.7). The size step (1.4rem vs feature body's 1.55rem) signals
   "this is secondary content" without requiring color-only contrast. */
.item-card-lore {
  margin-top: 2rem;
  /* Horizontal padding tightened to 1.5rem so the line length inside
     the callout sits a touch shorter than the surrounding mechanics
     block — gives the lore paragraph its own reading rhythm without
     looking cramped against the callout edges. */
  padding: 1rem 1.5rem;
  background: var(--par-color-callout-bg, #f3ebda);
  border-radius: var(--par-radius-md, 4px);
}

/* Small-caps label. Mirrors the feature-name's burgundy register so the
   eye recognizes it as a section affordance, but the all-caps + tight
   tracking + smaller size mark it as supplementary. */
.item-card-lore-label {
  margin: 0 0 0.5rem;
  font-family: var(--par-font-serif, Georgia, 'Times New Roman', serif);
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--par-color-title, #7a1f1f);
}

.item-card-lore-body {
  max-width: 65ch;
}

.item-card-lore-body p {
  margin: 0 0 0.75rem;
  /* Size + color match the feature body (.item-feature-description)
     for primary-content reading weight. Font-weight bumps to 500 —
     heavier than the feature body's 400 — matching the sourcebook
     "aside" convention where boxed/tinted narrative passages run a
     hair heavier than surrounding text. The tinted callout surface
     plus the heavier weight together signal "set apart" without
     needing italic or lightened color. Line-height 1.65 gives longer
     narrative paragraphs slightly more breathing room than the scan-
     density 1.5 that mechanics use. */
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--par-color-callout-text, #2c2c2a);
  line-height: 1.65;
}

.item-card-lore-body p:last-child {
  margin-bottom: 0;
}

/* Footer: three matched buttons. */
.item-card-footer {
  margin-top: 1.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--par-color-divider, #e2dccd);
  display: flex;
  gap: 0.5rem;
}

/* Footer trailing-action helper — pushes the Delete button to the right edge. */
.item-card-footer__trail {
  margin-left: auto;
}

@media (max-width: 600px) {
  .item-card {
    padding: 1.5rem;
  }

  .item-card-footer {
    flex-wrap: wrap;
  }
}

/* TEST-REGISTER-OVERRIDE — REMOVE WHEN YORUBA TESTING COMPLETE */
.test-register-override {
  border: 2px dashed #d97706;
  background: #fff7ed;
  padding: 0.75rem 1rem;
  margin: 1rem 0;
  border-radius: 4px;

  legend {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #9a3412;
    padding: 0 0.5rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.875rem;
  }

  select,
  select option {
    padding: 0.375rem 0.5rem;
    font-size: 1.3125rem;
    width: 100%;
  }

  &__last {
    margin: 0.5rem 0 0;
    font-size: 0.8125rem;
    color: #57534e;

    code {
      background: #fef3c7;
      padding: 0.125rem 0.25rem;
      border-radius: 2px;
      font-size: 0.8125rem;
    }
  }
}
/* END TEST-REGISTER-OVERRIDE */
</style>