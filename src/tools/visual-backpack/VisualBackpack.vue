<template>
  <div class="backpack parchment" :class="isMobile ? `backpack--m-${mobileMode}` : ''">
    <p class="sr-only" aria-live="polite" role="status">{{ announcement }}</p>

    <!-- Collapsed-sidebar affordance (mobile only). -->
    <button
      class="backpack__menu-toggle"
      type="button"
      aria-label="Show characters"
      :aria-expanded="sidebarOpen"
      @click="sidebarOpen = true"
    >☰ Characters</button>
    <div
      v-if="sidebarOpen && isNarrow"
      class="backpack__overlay"
      @click="sidebarOpen = false"
    ></div>

    <!-- Application chrome: edge-to-edge sepia leather top bar. -->
    <header class="app-top-bar">
      <div class="app-top-bar__inner">
        <div class="app-top-bar__brand">
          <h1 class="app-top-bar__title">Kenji&rsquo;s D&amp;D 5e Inventory Manager</h1>
          <p class="app-top-bar__subtitle">
            Lay out each character's gear like a video-game inventory.
          </p>
        </div>
        <button
          ref="rulesTrigger"
          class="app-top-bar__rules-trigger"
          type="button"
          aria-haspopup="dialog"
          :aria-expanded="rulesOpen"
          @click="openRules"
        >
          <span class="app-top-bar__rules-icon" aria-hidden="true">📖</span>
          <span class="app-top-bar__rules-label">Rules reference</span>
        </button>
      </div>
    </header>

    <input
      ref="fileInput"
      class="backpack__file"
      type="file"
      accept="application/json,.json"
      @change="onFileChosen"
    />

    <div class="backpack__layout">
      <CharacterSidebar
        ref="characterSidebar"
        class="backpack__rail"
        :characters="characters"
        :current-id="currentCharacterId"
        :open="sidebarOpen"
        :character-name="characterName"
        :strength="strength"
        @select="onSelectCharacter"
        @add="onAddCharacter"
        @remove="askRemoveCharacter"
        @update:character-name="setCharacterName"
        @update:strength="setStrength"
      />

      <div class="backpack__page">
      <div class="backpack__content">
        <p v-if="!saveNoteDismissed" class="backpack__save-note">
          <span class="backpack__save-icon" aria-hidden="true">💾</span>
          <span>Every character saves automatically in <strong>this browser</strong>. To use them on
          another machine, click <strong>Back up</strong> and send that file there, then
          open this page and click <strong>Restore</strong>.</span>
          <button
            class="backpack__save-dismiss"
            type="button"
            aria-label="Dismiss this message"
            @click="dismissSaveNote"
          >×</button>
        </p>

        <p v-if="showBagTip" class="backpack__save-note backpack__save-note--bag">
          <span class="backpack__save-icon" aria-hidden="true">🧳</span>
          <span>You've got a <strong>Bag of Holding</strong>! Drag items onto its panel below (or use
          <strong>Stash in bag</strong> in an item's details) to tuck them away. Stashed gear stops
          counting against your carry weight. It holds up to <strong>500 lb</strong>.</span>
          <button
            class="backpack__save-dismiss"
            type="button"
            aria-label="Dismiss this message"
            @click="dismissBagTip"
          >×</button>
        </p>

        <div v-if="isMobile" class="mobile-bar">
          <!-- Character row: tap the name to rename in place; use the stepper to set
               Strength (which drives carry capacity). Roster management (switch / add /
               delete) stays in the off-canvas rail, reached via the Characters pill. -->
          <div class="mobile-bar__char">
            <span class="mobile-bar__field-label">Name</span>
            <input
              v-if="nameEditing"
              ref="nameInput"
              class="mobile-bar__name-input"
              :value="characterName"
              aria-label="Character name"
              @input="setCharacterName($event.target.value)"
              @blur="nameEditing = false"
              @keydown.enter.prevent="nameEditing = false"
            />
            <button v-else class="mobile-bar__name" type="button" @click="startNameEdit">
              {{ characterName || 'Character 1' }}
            </button>
            <span class="mobile-bar__field-label">Str</span>
            <div class="mobile-bar__str">
              <button class="mobile-bar__str-btn" type="button" aria-label="Decrease Strength" @click="setStrength(strength - 1)">−</button>
              <span class="mobile-bar__str-val" aria-live="polite">{{ strength }}</span>
              <button class="mobile-bar__str-btn" type="button" aria-label="Increase Strength" @click="setStrength(strength + 1)">+</button>
            </div>
            <span class="mobile-bar__status" :title="status.tier === 'ok' ? 'Unencumbered' : status.consequences">
              <span class="mobile-bar__dot" :class="encumbranceDotClass"></span>
              <span class="mobile-bar__weight">{{ formatLbs(status.total) }} / {{ status.capacity }} lb</span>
            </span>
          </div>
          <div class="mobile-bar__switch" role="tablist" aria-label="View">
            <button
              type="button"
              role="tab"
              :aria-selected="mobileMode === 'catalog'"
              :class="{ 'mobile-bar__tab--active': mobileMode === 'catalog' }"
              @click="mobileMode = 'catalog'"
            >Add gear</button>
            <button
              type="button"
              role="tab"
              :aria-selected="mobileMode === 'pack'"
              :class="{ 'mobile-bar__tab--active': mobileMode === 'pack' }"
              @click="mobileMode = 'pack'"
            >My pack<span v-if="packCount" :key="packBump" class="mobile-bar__tab-count">{{ packCount }}</span></button>
          </div>
        </div>

        <div class="backpack__main">
          <div class="backpack__sidebar">
        <ItemDetail
          v-if="!isMobile"
          :item="selectedItem"
          :categories="detailCategories"
          :attuned-count="attunedCount"
          :max-attunement="maxAttunement"
          :can-stash="canStashSelected"
          @set-quantity="({ id, quantity }) => setQuantity(id, quantity)"
          @update="({ id, patch }) => updateItem(id, patch)"
          @remove="removeItem"
          @equip="({ instanceId, slot }) => equipItem(instanceId, slot)"
          @unequip="unequipItem"
          @attune="toggleAttune"
          @stash="stashSelected"
          @view-equipped="setPackView('equip')"
        />

        <ItemCatalog
          class="backpack__catalog"
          :catalog="catalog"
          :packs="packs"
          :coins="coins"
          @add="onCatalogAdd"
          @buy="onBuyItem"
          @add-pack="onAddPackMobile"
          @add-custom="onAddCustom"
          @remove-custom="removeCustomItem"
          @paste-treasure="treasureOpen = true"
          :mobile="isMobile"
        />
      </div>

      <div class="backpack__pack">
        <BackpackGrid
          :items="items"
          :flash-id="flashItemId"
          :mobile="isMobile"
          :title="packTitle"
          :strength="strength"
          :selected-id="selectedItem?.instanceId || null"
          :equipped-by-slot="equippedBySlot"
          :attuned-count="attunedCount"
          :max-attunement="maxAttunement"
          :view="packView"
          @update:view="setPackView"
          @place="({ template, pos }) => addItem(template, pos)"
          @move="({ instanceId, pos }) => moveItemTo(instanceId, pos)"
          @reorder="({ movedId, targetId }) => reorderList(movedId, targetId)"
          @nudge="({ instanceId, dx, dy }) => nudge(instanceId, dx, dy)"
          @remove="removeItem"
          @select="onSelectTile"
          @unequip="unequipItem"
          @equip="({ instanceId, slot }) => equipItem(instanceId, slot)"
          @set-quantity="({ id, quantity }) => setQuantity(id, quantity)"
          @autopack="autopack"
          @print="printList"
          @backup="exportData"
          @restore="triggerImport"
          @empty="confirmClear = true"
        >
          <!-- Mobile: the selected item's detail renders inline under its list row. -->
          <template #detail>
            <div v-if="selectedItem?.isCoinPurse" class="coin-detail backpack__mobile-detail">
              <p class="coin-detail__summary">
                <span class="coin-detail__gold">{{ formatGp(coinGold) }} gp</span>
                <span class="coin-detail__weight">{{ formatLbs(coinLbs) }} lb</span>
              </p>
              <div class="coin-detail__actions">
                <button
                  v-if="hasBag"
                  type="button"
                  class="coin-detail__btn coin-detail__btn--primary"
                  @click="stashCoins"
                >🧳 Stash coins in bag</button>
                <button type="button" class="coin-detail__btn" @click="focusCoins">Edit coins</button>
              </div>
            </div>
            <ItemDetail
              v-else
              embedded
              class="backpack__mobile-detail"
              :item="selectedItem"
              :categories="detailCategories"
              :attuned-count="attunedCount"
              :max-attunement="maxAttunement"
              :can-stash="canStashSelected"
              @set-quantity="({ id, quantity }) => setQuantity(id, quantity)"
              @update="({ id, patch }) => updateItem(id, patch)"
              @remove="removeItem"
              @equip="({ instanceId, slot }) => equipItem(instanceId, slot)"
              @unequip="unequipItem"
              @attune="toggleAttune"
              @stash="stashSelected"
              @view-equipped="setPackView('equip')"
            />
          </template>
          <!-- Carrying total folds into the pack card footer (desktop + mobile). -->
          <template #capacity>
            <CapacityIndicator
              embedded
              :status="status"
              :count-coin-weight="countCoinWeight"
              :pack-dropped="packDropped"
              :pack-weight="packWeight"
              :equipped-weight="equippedWeight"
              :has-pack="!!items.length"
              @toggle="toggleCoinWeight"
              @toggle-drop="toggleDropPack"
            />
          </template>
        </BackpackGrid>
        <BagPanel
          v-for="b in bags"
          :key="b.instanceId"
          :bag="b"
          @stash="(id) => stashItem(id, b.instanceId)"
          @retrieve="retrieveItem"
          @empty="emptyBag"
          @reject-bag="onRejectBag"
        />
        <CoinPurse
          ref="coinPurse"
          :class="{ 'coin-flash': coinFlash }"
          :coins="coins"
          :coin-lbs="coinLbs"
          :coin-gold="coinGold"
          :treasure-value="treasureValue"
          @set-coin="({ denom, value }) => setCoin(denom, value)"
          @adjust="adjustCoins"
          @empty="confirmEmptyPurse = true"
        />
        </div>
        </div>
      </div>

      <PrintList :items="items" :strength="strength" :status="status" :coins="coins" :coin-gold="coinGold" />
      </div>
    </div>

    <RiftOverlay :active="riftActive" @close="riftActive = false" />

    <RulesDrawer :open="rulesOpen" @close="closeRules" />

    <TreasureImportModal
      :opened="treasureOpen"
      :parse="previewTreasure"
      @cancel="treasureOpen = false"
      @confirm="onImportTreasure"
      @claim="onClaimPile"
    />

    <ParConfirm
      :opened="confirmClear"
      title="Empty your pack?"
      message="This removes every packed item. Your custom catalog and Strength stay. This can't be undone."
      confirm-label="Empty pack"
      cancel-label="Keep it"
      destructive
      @confirm="doClear"
      @cancel="confirmClear = false"
    />

    <ParConfirm
      :opened="confirmEmptyPurse"
      title="Empty your purse?"
      message="This removes every coin (gp, ep, sp, and cp). This can't be undone."
      confirm-label="Empty purse"
      cancel-label="Keep it"
      destructive
      @confirm="doEmptyPurse"
      @cancel="confirmEmptyPurse = false"
    />

    <ParConfirm
      :opened="!!pendingDeleteId"
      :title="lastCharacter ? 'Reset this character?' : 'Delete this character?'"
      :message="deleteMessage"
      :confirm-label="lastCharacter ? 'Reset character' : 'Delete character'"
      cancel-label="Keep it"
      destructive
      @confirm="doRemoveCharacter"
      @cancel="pendingDeleteId = null"
    />
  </div>
</template>

<script setup>
/**
 * Visual RPG Backpack — standalone, no-AI drag-and-drop inventory. The grid is a
 * cosmetic arrangement that never rejects an item; WEIGHT is the only real limit
 * (CapacityIndicator). Self-contained persistence + JSON backup; outside the AI
 * generator suite (no DataManagerModal coupling).
 */
import { ref, computed, nextTick, watch, onMounted, onBeforeUnmount } from 'vue';
import { ParConfirm } from '@/parchment';
import { useToast } from '@/composables/useToast';
import { useBackpack } from './composables/useBackpack.js';
import { downloadBackpack } from './utils/backpack-storage.mjs';
import CharacterSidebar from './components/CharacterSidebar.vue';
import RulesDrawer from './components/RulesDrawer.vue';
import ItemDetail from './components/ItemDetail.vue';
import ItemCatalog from './components/ItemCatalog.vue';
import BackpackGrid from './components/BackpackGrid.vue';
import RiftOverlay from './components/RiftOverlay.vue';
import BagPanel from './components/BagPanel.vue';
import CoinPurse from './components/CoinPurse.vue';
import TreasureImportModal from './components/TreasureImportModal.vue';
import CapacityIndicator from './components/CapacityIndicator.vue';
import PrintList from './components/PrintList.vue';
import { isBagOfHolding } from './utils/tile-presentation.mjs';

// Free standalone tool; accept (and ignore) a premium prop so mountApp can't warn.
defineProps({ premium: { type: Boolean, default: false } });

const toast = useToast();

const {
  characters,
  currentCharacterId,
  characterName,
  selectCharacter,
  addCharacter,
  removeCharacter,
  strength,
  items,
  coins,
  countCoinWeight,
  coinLbs,
  coinGold,
  catalog,
  packs,
  status,
  selectedItem,
  selectItem,
  deselect,
  setQuantity,
  updateItem,
  packDropped,
  packWeight,
  equippedWeight,
  toggleDropPack,
  attunedCount,
  maxAttunement,
  equippedBySlot,
  equipItem,
  unequipItem,
  toggleAttune,
  bags,
  hasBag,
  stashItem,
  retrieveItem,
  emptyBag,
  coinPurseId,
  announcement,
  setStrength,
  setCoin,
  adjustCoins,
  emptyPurse,
  previewTreasure,
  applyTreasure,
  treasureValue,
  toggleCoinWeight,
  addItem,
  buyItem,
  addPack,
  removeItem,
  moveItemTo,
  reorderList,
  nudge,
  autopack,
  clearAll,
  addCustomItem,
  removeCustomItem,
  importBundle,
  currentState,
} = useBackpack();

const detailCategories = ['Weapon', 'Armor', 'Adventuring Gear', 'Consumable', 'Tools', 'Magic Item', 'Misc'];

// --- bag of holding ---
const canStashSelected = computed(
  () => hasBag.value && !!selectedItem.value && !isBagOfHolding(selectedItem.value),
);
function stashSelected() {
  if (!selectedItem.value || !bags.value.length) return;
  stashItem(selectedItem.value.instanceId, bags.value[0].instanceId);
}
const riftActive = ref(false);
function onRejectBag() {
  // Easter egg: play the Astral-rift gag instead of a plain error. The bag was
  // never stashed, so it simply stays where it is once the animation clears.
  riftActive.value = true;
}

// Clicking the coin-purse tile focuses the coin editor instead of opening the detail panel.
const coinPurse = ref(null);
const coinFlash = ref(false);
function focusCoins() {
  const el = coinPurse.value?.$el;
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  coinFlash.value = true;
  setTimeout(() => (coinFlash.value = false), 1200);
}
function onSelectTile(id) {
  if (id === coinPurseId) {
    if (isMobile.value) selectItem(id); // mobile: open the inline coin detail (with "stash in bag")
    else focusCoins(); // desktop: jump straight to the coin editor
  } else {
    selectItem(id);
  }
}
// Stash the coin purse INTO the bag of holding, like any item: it moves to the bag
// panel and its coin weight stops counting (bagged items are excluded from carry
// weight). Take it back out from the bag panel (retrieve), same as other gear.
function stashCoins() {
  if (!bags.value.length) return;
  stashItem(coinPurseId, bags.value[0].instanceId);
  selectItem(null);
}
function formatGp(n) {
  return Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

// One-time tip the first time a bag of holding appears in the pack.
const BAG_TIP_KEY = 'backpack-bag-tip-dismissed';
const bagTipDismissed = ref(localStorage.getItem(BAG_TIP_KEY) === '1');
const showBagTip = computed(() => hasBag.value && !bagTipDismissed.value);
function dismissBagTip() {
  bagTipDismissed.value = true;
  try {
    localStorage.setItem(BAG_TIP_KEY, '1');
  } catch (e) {
    /* ignore */
  }
}

const confirmClear = ref(false);
const confirmEmptyPurse = ref(false);
const treasureOpen = ref(false);
const fileInput = ref(null);

// Rules-reference drawer (chrome affordance). Returns focus to the trigger on close.
const rulesOpen = ref(false);
const rulesTrigger = ref(null);
function openRules() {
  rulesOpen.value = true;
}
function closeRules() {
  rulesOpen.value = false;
  nextTick(() => rulesTrigger.value?.focus());
}

// Edit the active character's name from the sidebar (writable computed; empty allowed).
const characterSidebar = ref(null);
function setCharacterName(v) {
  characterName.value = v;
}

// "Gorm's pack" / "Gus' pack" (names ending in s take a bare apostrophe);
// falls back to "Your pack" when the character is unnamed.
const packTitle = computed(() => {
  const n = (characterName.value || '').trim();
  if (!n) return 'Your pack';
  const possessive = /s$/i.test(n) ? `${n}’` : `${n}’s`;
  return `${possessive} pack`;
});

// Collapsible character rail on narrow screens (mirrors GeneratorLayout).
const sidebarOpen = ref(false);
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200);
const isNarrow = computed(() => windowWidth.value <= 860);
const isMobile = computed(() => windowWidth.value <= 768);
function onResize() {
  windowWidth.value = window.innerWidth;
  if (!isNarrow.value) sidebarOpen.value = false; // desktop: rail is always shown
}
onMounted(() => window.addEventListener('resize', onResize));
onBeforeUnmount(() => window.removeEventListener('resize', onResize));
watch([sidebarOpen, isNarrow], () => {
  // Only the off-canvas character rail locks scroll. The pack is DOCKED (non-modal):
  // the catalog must stay scrollable while the pack is expanded so items can move
  // between them.
  document.body.style.overflow = sidebarOpen.value && isNarrow.value ? 'hidden' : '';
});
// On mobile, picking/adding a character dismisses the off-canvas rail.
function onSelectCharacter(id) {
  selectCharacter(id);
  if (isNarrow.value) sidebarOpen.value = false;
}
function onAddCharacter() {
  addCharacter();
  // Keep the rail open and drop the cursor straight into the new name field.
  nextTick(() => characterSidebar.value?.focusName());
}
// Mobile: tap the name in the character row to rename it in place.
const nameEditing = ref(false);
const nameInput = ref(null);
function startNameEdit() {
  nameEditing.value = true;
  nextTick(() => {
    nameInput.value?.focus();
    nameInput.value?.select();
  });
}

// Character deletion (parent-side confirm).
const pendingDeleteId = ref(null);
const lastCharacter = computed(() => characters.value.length <= 1);
const deleteMessage = computed(() => {
  const c = characters.value.find((x) => x.id === pendingDeleteId.value);
  const name = c?.name || 'this character';
  return lastCharacter.value
    ? `“${name}” is your only character, so this empties their inventory and starts fresh. This can't be undone.`
    : `This permanently deletes “${name}” and their entire inventory. This can't be undone.`;
});
function askRemoveCharacter(id) {
  pendingDeleteId.value = id;
}
function doRemoveCharacter() {
  removeCharacter(pendingDeleteId.value);
  pendingDeleteId.value = null;
}

const PACK_VIEW_KEY = 'backpack-view';
const packView = ref(
  ['grid', 'list', 'equip'].includes(localStorage.getItem(PACK_VIEW_KEY))
    ? localStorage.getItem(PACK_VIEW_KEY)
    : 'grid',
);
function setPackView(v) {
  packView.value = v;
  try {
    localStorage.setItem(PACK_VIEW_KEY, v);
  } catch (e) {
    /* ignore */
  }
}

const SAVE_NOTE_KEY = 'backpack-save-note-dismissed';
const saveNoteDismissed = ref(localStorage.getItem(SAVE_NOTE_KEY) === '1');
function dismissSaveNote() {
  saveNoteDismissed.value = true;
  try {
    localStorage.setItem(SAVE_NOTE_KEY, '1');
  } catch (e) {
    /* ignore storage errors */
  }
}

function onAddCustom(payload) {
  const template = addCustomItem(payload);
  // add it to the pack immediately (and keep it in the catalog); flash where it lands
  flashItem(addItem(template));
}

function onAddPack(packId) {
  const pack = addPack(packId);
  if (pack) toast.success(`Added ${pack.name}: ${pack.itemCount} items.`);
}

// --- mobile: catalog vs pack mode + add feedback ---
// On mobile the tool is a task switch, not two panes: browse gear ('catalog') or
// review the pack ('pack'). Desktop shows both side by side and ignores this.
const mobileMode = ref('catalog');
const flashItemId = ref(null);
let flashTimer = null;
// Add feedback: the "My pack" tab shows a live count that pops on every add (packBump
// re-keys the badge to replay the animation). Coin purse tile excluded from the count.
const packBump = ref(0);
const packCount = computed(() => items.value.filter((i) => !i.isCoinPurse).length);

// Encumbrance dot for the header status line (reinforced by the weight text beside it).
const encumbranceDotClass = computed(() => {
  const t = status.value?.tier;
  if (t === 'heavily' || t === 'over') return 'mobile-bar__dot--danger';
  if (t === 'encumbered') return 'mobile-bar__dot--warn';
  return '';
});
function formatLbs(n) {
  return Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 1 });
}
// Flash the tile/row that just landed — visible when the pack view is showing; in
// catalog mode the capacity bar's item/weight bump is the "it landed" feedback.
function notifyAdded() {
  packBump.value += 1; // pop the "My pack" tab count
  try {
    navigator.vibrate?.(8); // a tiny tactile confirmation on supporting devices
  } catch {
    /* no haptics */
  }
}
function flashItem(id) {
  if (!id) return;
  flashItemId.value = id;
  notifyAdded();
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => {
    if (flashItemId.value === id) flashItemId.value = null;
  }, 1200);
}
function onCatalogAdd(template) {
  flashItem(addItem(template));
}
function onBuyItem(template) {
  flashItem(buyItem(template));
}
function onAddPackMobile(packId) {
  onAddPack(packId);
  notifyAdded();
}
onBeforeUnmount(() => clearTimeout(flashTimer));

function doClear() {
  clearAll();
  confirmClear.value = false;
}

function doEmptyPurse() {
  emptyPurse();
  confirmEmptyPurse.value = false;
}

function onImportTreasure({ coins: parsedCoins, items }) {
  applyTreasure(parsedCoins, items);
  treasureOpen.value = false;
}
function onClaimPile({ coins: pileCoins, items }) {
  // Claim one loot-split pile into the pack — the modal stays open so the other
  // piles can still be copied for the (offline) players.
  applyTreasure(pileCoins, items);
}

function printList() {
  window.print();
}

function exportData() {
  downloadBackpack(currentState());
  toast.success('Backup downloaded.');
}

function triggerImport() {
  fileInput.value?.click();
}

function onFileChosen(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      importBundle(ev.target.result);
      toast.success('Backpack restored.');
    } catch (err) {
      toast.error('That file could not be read as a backpack backup.');
    } finally {
      e.target.value = '';
    }
  };
  reader.readAsText(file);
}
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Root is a vertical stack: chrome bands (top bar + strip), the rail+content
   layout, then the footer. */
.backpack {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
}

/* Character rail flush to the viewport's left edge + content centered in the rest. */
.backpack__layout {
  display: flex;
  align-items: flex-start;
}
.backpack__page {
  flex: 1;
  min-width: 0;
  max-width: 104rem;
  margin: 0 auto; /* centered in the space right of the rail */
  padding: 2.4rem 2.4rem 4rem;
}

/* ===== Application chrome ===== */
/* Edge-to-edge sepia leather top bar — tool identity + rules affordance. */
.app-top-bar {
  background: #6b5840;
  color: #fefbf4;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.15);
}
.app-top-bar__inner {
  max-width: 140rem;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}
.app-top-bar__brand {
  flex: 1;
  min-width: 0;
}
.app-top-bar__title {
  margin: 0 0 0.15rem;
  font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif;
  font-size: 2.2rem;
  font-weight: 600;
  line-height: 1.15;
  color: #fefbf4;
}
.app-top-bar__subtitle {
  margin: 0;
  font-size: 1.2rem;
  font-style: italic;
  color: rgba(254, 251, 244, 0.75);
}
.app-top-bar__rules-trigger {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.85rem;
  background: rgba(254, 251, 244, 0.1);
  border: 0.5px solid rgba(254, 251, 244, 0.3);
  border-radius: var(--par-radius-md, 4px);
  font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif;
  font-size: 1.3rem;
  font-weight: 500;
  color: #fefbf4;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.app-top-bar__rules-trigger:hover {
  background: rgba(254, 251, 244, 0.18);
  border-color: rgba(254, 251, 244, 0.5);
}
.app-top-bar__rules-trigger:focus-visible {
  outline: 2px solid #fefbf4;
  outline-offset: 2px;
}
.app-top-bar__rules-icon {
  font-size: 1.4rem;
  line-height: 1;
}

.backpack__content {
  min-width: 0; /* let the inner grid shrink instead of overflowing */
}

/* Brief highlight when the coin-purse tile is clicked (focuses the editor). */
.coin-flash {
  outline: 2px solid var(--color-action-rest, #365a85);
  outline-offset: 2px;
  border-radius: var(--par-radius-lg, 12px);
  transition: outline-color 0.3s ease;
}

.backpack__save-note {
  display: flex;
  align-items: flex-start; /* icon + dismiss align to the first line, not the middle of a wrapped block */
  gap: 0.6rem;
  margin: 0 0 2rem;
  padding: 0.7rem 1.1rem;
  background: var(--par-color-callout-bg-light, #f8f2e3);
  border: 0.5px solid var(--par-color-border, #e8e2d4);
  border-radius: var(--par-radius-md, 4px);
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.3rem;
  line-height: 1.5;
  color: var(--par-color-text-secondary, #555);
}
.backpack__save-icon {
  font-size: 1.5rem;
  flex: none;
}
.backpack__save-note strong {
  font-weight: 600;
  color: var(--par-color-text, #222);
}
.backpack__save-dismiss {
  flex: none;
  margin-left: auto;
  width: 2.2rem;
  height: 2.2rem;
  border: none;
  background: transparent;
  font-size: 1.8rem;
  line-height: 1;
  color: var(--par-color-text-muted, #6b6b6b);
  cursor: pointer;
  border-radius: 50%;
}
.backpack__save-dismiss:hover {
  background: rgba(0, 0, 0, 0.06);
  color: var(--par-color-text, #222);
}

.backpack__file {
  display: none;
}

.backpack__main {
  display: grid;
  grid-template-columns: 32rem 1fr; /* [detail + catalog] | pack */
  gap: 1.8rem;
  align-items: start;
}

.backpack__sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  min-width: 0; /* let the catalog wrap/shrink in the 1fr mobile column instead of overflowing */
}

.backpack__pack {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  min-width: 0; /* let the 1fr grid track shrink so long row names wrap, not overflow */
}

/* --- mobile: task-switch layout --------------------------------------------
   Desktop is unaffected (catalog + pack side by side). Below 768px the two become
   full-width modes toggled by a sticky bar (capacity + Add gear / My pack). */
.mobile-bar {
  display: none;
}

@media (max-width: 768px) {
  /* Tighter gutters on phones — cards sit near the edges as distinct "islands". */
  .backpack__page {
    padding: 1.2rem 1.2rem 4rem;
  }
  .app-top-bar__inner {
    padding: 1rem 1.2rem;
  }
  /* The tagline is desktop chrome; on a phone the title alone is enough. */
  .app-top-bar__subtitle {
    display: none;
  }

  /* Sticky capacity + mode switch: the tool's constant compass, always in view. */
  .mobile-bar {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    position: sticky;
    top: 0;
    z-index: 50;
    margin: -1.2rem -1.2rem 1.2rem;
    padding: 0.9rem 1.2rem;
    background: var(--par-color-surface-page, #eaeef2);
    border-bottom: 0.5px solid var(--par-color-border-strong, #c9b99a);
  }
  .mobile-bar__char {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.4rem 0.5rem;
    width: 100%;
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  }
  /* Name: a nested cream field that reads as editable; becomes an input on tap. */
  .mobile-bar__name,
  .mobile-bar__name-input {
    flex: 1;
    min-width: 4rem;
    height: 3rem;
    padding: 0 0.7rem;
    border: 0.5px solid var(--par-color-border-strong, #c9b99a);
    border-radius: var(--par-radius-sm, 3px);
    background: var(--par-color-surface-card, #fefbf4);
    font-family: inherit;
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--color-action-hover, #2a4d70);
  }
  .mobile-bar__name {
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: text;
  }
  .mobile-bar__name-input {
    outline: none;
  }
  .mobile-bar__name-input:focus {
    border-color: var(--color-action-rest, #365a85);
    box-shadow: 0 0 0 2px rgba(54, 90, 133, 0.2);
  }
  .mobile-bar__field-label {
    flex: none;
    font-size: 1.15rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--par-color-text-secondary, #555);
  }
  .mobile-bar__str {
    flex: none;
    display: flex;
    align-items: center;
    border: 0.5px solid var(--par-color-border-strong, #c9b99a);
    border-radius: var(--par-radius-sm, 3px);
    background: var(--par-color-surface-card, #fefbf4);
    overflow: hidden;
  }
  .mobile-bar__str-btn {
    width: 2.6rem;
    height: 3rem;
    border: none;
    background: transparent;
    font-size: 1.7rem;
    font-weight: 600;
    color: var(--color-action-rest, #365a85);
    cursor: pointer;
  }
  .mobile-bar__str-btn:active {
    background: var(--par-color-callout-bg, #f3ebda);
  }
  .mobile-bar__str-val {
    min-width: 2rem;
    text-align: center;
    font-size: 1.45rem;
    font-weight: 700;
    color: var(--par-color-text, #222);
  }

  /* Always-visible encumbrance read (both modes) — the tool's core "am I overloaded".
     Sits inline at the end of the character row. */
  .mobile-bar__status {
    flex: none;
    /* breathing room on each side — the flexing name field yields the space. */
    margin: 0 0.3rem 0 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
    font-size: 1.25rem;
    color: var(--par-color-text-secondary, #555);
  }
  .mobile-bar__dot {
    flex: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #5a7a4a; /* ok — green */
  }
  .mobile-bar__dot--warn {
    background: #b8912d;
  }
  .mobile-bar__dot--danger {
    background: var(--par-color-destructive, #a03333);
  }
  .mobile-bar__weight {
    font-weight: 700;
    white-space: nowrap;
    color: var(--par-color-text, #222);
  }
  /* iOS-style segmented control: a recessed neutral track with a raised, light
     active segment (not a bold fill). Subtle — it's a view toggle, not a CTA. */
  .mobile-bar__switch {
    display: flex;
    gap: 0.2rem;
    padding: 0.25rem;
    background: rgba(58, 70, 84, 0.1);
    border-radius: 0.9rem;
  }
  .mobile-bar__switch button {
    flex: 1;
    min-height: 3.2rem;
    border: none;
    border-radius: 0.7rem;
    background: transparent;
    font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
    font-size: 1.35rem;
    font-weight: 600;
    color: var(--par-color-text-secondary, #555);
    cursor: pointer;
    transition: color 0.15s ease;
  }
  .mobile-bar__switch button.mobile-bar__tab--active {
    background: var(--par-color-surface-card, #fefbf4);
    color: var(--color-action-hover, #2a4d70);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.14);
  }
  /* Live pack count on the My-pack tab — pops on every add (re-keyed to replay). */
  .mobile-bar__tab-count {
    display: inline-block;
    margin-left: 0.5rem;
    min-width: 2rem;
    padding: 0 0.45rem;
    border-radius: 999px;
    background: var(--color-action-rest, #365a85);
    color: var(--color-action-text, #fbf7f0);
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 2rem;
    animation: tab-count-pop 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  @keyframes tab-count-pop {
    0% { transform: scale(0.5); }
    55% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }
  @media (prefers-reduced-motion: reduce) {
    .mobile-bar__tab-count { animation: none; }
  }

  /* Two full-width modes — show one, hide the other. */
  .backpack--m-catalog .backpack__pack {
    display: none;
  }
  .backpack--m-pack .backpack__sidebar {
    display: none;
  }
  .backpack__mobile-detail {
    margin-bottom: 0.2rem;
  }

  /* Declutter the top: the notice is a full-width banner (flush to the header and
     both edges), not a card floating in the gutter. */
  .backpack__save-note {
    margin: -1.2rem -1.2rem 1.2rem;
    padding: 0.8rem 1.2rem;
    border-width: 0 0 0.5px;
    border-radius: 0;
    font-size: 1.15rem;
    line-height: 1.4;
  }
}

/* Inline coin-purse detail (mobile): summary + stash-in-bag / edit actions. */
.coin-detail {
  padding: 0.4rem 0.2rem 0.6rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
}
.coin-detail__summary {
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
  margin: 0 0 0.7rem;
  font-size: 1.3rem;
  color: var(--par-color-text-secondary, #555);
}
.coin-detail__gold {
  font-weight: 700;
  color: var(--par-color-title, #7a1f1f);
}
.coin-detail__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.coin-detail__btn {
  min-height: 3.2rem;
  padding: 0 1rem;
  border: 0.5px solid var(--par-color-border-strong, #cbb8a0);
  border-radius: var(--par-radius-sm, 3px);
  background: transparent;
  font-family: inherit;
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--par-color-text-secondary, #555);
  cursor: pointer;
}
.coin-detail__btn--primary {
  border-color: var(--color-action-rest, #365a85);
  color: var(--color-action-hover, #2a4d70);
  font-weight: 600;
}

/* Dim backdrop behind the collapsed sidebar on mobile. */
.backpack__overlay {
  position: fixed;
  inset: 0;
  background: rgba(31, 58, 92, 0.4);
  z-index: 1000;
}

/* Floating toggle to reveal the character rail when it's collapsed (mobile). */
.backpack__menu-toggle {
  display: none;
}

@media (max-width: 860px) {
  .backpack__main {
    grid-template-columns: 1fr;
  }
  /* Bottom-left FAB to open the (now off-canvas) character rail. */
  .backpack__menu-toggle {
    position: fixed;
    bottom: 1.6rem;
    left: 1.6rem;
    z-index: 999; /* below the overlay (1000) + rail (1001) so it hides while open */
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.9rem 1.3rem;
    background: #6b5840;
    color: #fefbf4;
    border: none;
    border-radius: 999px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif;
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
  }
  .backpack__menu-toggle:focus-visible {
    outline: 2px solid #fefbf4;
    outline-offset: 2px;
  }
}

@media print {
  .app-top-bar,
  .backpack__rail,
  .backpack__overlay,
  .backpack__menu-toggle,
  .backpack__save-note,
  .backpack__main {
    display: none !important;
  }
}
</style>
