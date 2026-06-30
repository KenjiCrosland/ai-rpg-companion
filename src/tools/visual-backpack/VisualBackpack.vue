<template>
  <div class="backpack parchment">
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
          <h1 class="app-top-bar__title">D&amp;D 5e Inventory Manager</h1>
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

        <div class="backpack__main">
          <div class="backpack__sidebar">
        <ItemDetail
          :item="selectedItem"
          :categories="detailCategories"
          :attuned-count="attunedCount"
          :max-attunement="maxAttunement"
          @set-quantity="({ id, quantity }) => setQuantity(id, quantity)"
          @update="({ id, patch }) => updateItem(id, patch)"
          @remove="removeItem"
          @equip="({ instanceId, slot }) => equipItem(instanceId, slot)"
          @unequip="unequipItem"
          @attune="toggleAttune"
          @view-equipped="setPackView('equip')"
        />

        <ItemCatalog
          class="backpack__catalog"
          :catalog="catalog"
          :packs="packs"
          @add="addItem"
          @add-pack="onAddPack"
          @add-custom="onAddCustom"
          @remove-custom="removeCustomItem"
        />
      </div>

      <div class="backpack__pack">
        <BackpackGrid
          :items="items"
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
          @select="selectItem"
          @unequip="unequipItem"
          @equip="({ instanceId, slot }) => equipItem(instanceId, slot)"
          @autopack="autopack"
          @print="printList"
          @backup="exportData"
          @restore="triggerImport"
          @empty="confirmClear = true"
        />
        <CoinPurse
          :coins="coins"
          :coin-lbs="coinLbs"
          :coin-gold="coinGold"
          @set-coin="({ denom, value }) => setCoin(denom, value)"
        />
        <CapacityIndicator
          :status="status"
          :count-coin-weight="countCoinWeight"
          :pack-dropped="packDropped"
          :pack-weight="packWeight"
          :equipped-weight="equippedWeight"
          :has-pack="!!items.length"
          @toggle="toggleCoinWeight"
          @toggle-drop="toggleDropPack"
        />
        </div>
        </div>
      </div>

      <PrintList :items="items" :strength="strength" :status="status" :coins="coins" :coin-gold="coinGold" />
      </div>
    </div>

    <RulesDrawer :open="rulesOpen" @close="closeRules" />

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
import CoinPurse from './components/CoinPurse.vue';
import CapacityIndicator from './components/CapacityIndicator.vue';
import PrintList from './components/PrintList.vue';

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
  announcement,
  setStrength,
  setCoin,
  toggleCoinWeight,
  addItem,
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

const detailCategories = ['Weapon', 'Armor', 'Adventuring Gear', 'Tools', 'Magic Item'];

const confirmClear = ref(false);
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

// Collapsible character rail on narrow screens (mirrors GeneratorLayout).
const sidebarOpen = ref(false);
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200);
const isNarrow = computed(() => windowWidth.value <= 860);
function onResize() {
  windowWidth.value = window.innerWidth;
  if (!isNarrow.value) sidebarOpen.value = false; // desktop: rail is always shown
}
onMounted(() => window.addEventListener('resize', onResize));
onBeforeUnmount(() => window.removeEventListener('resize', onResize));
watch([sidebarOpen, isNarrow], ([open, narrow]) => {
  document.body.style.overflow = open && narrow ? 'hidden' : '';
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
  addItem(template); // add it to the pack immediately, and keep it in the catalog
}

function onAddPack(packId) {
  const pack = addPack(packId);
  if (pack) toast.success(`Added ${pack.name} — ${pack.itemCount} items.`);
}

function doClear() {
  clearAll();
  confirmClear.value = false;
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

.backpack__save-note {
  display: flex;
  align-items: center;
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
}

.backpack__pack {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
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
