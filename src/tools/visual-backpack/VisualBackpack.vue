<template>
  <div class="backpack">
    <header class="backpack__header">
      <h1 class="backpack__title">Visual backpack</h1>
      <p class="backpack__tagline">
        Lay out your gear like a video-game inventory. Drag, drop, and watch the load.
      </p>
    </header>

    <div class="backpack__toolbar">
      <StrengthControl :model-value="strength" @update:model-value="setStrength" />

      <div class="backpack__actions">
        <ParButton size="small" variant="primary-outline" @click="printList">Print list</ParButton>
        <ParButton size="small" variant="primary-outline" @click="exportData">Back up</ParButton>
        <ParButton size="small" variant="primary-outline" @click="triggerImport">Restore</ParButton>
        <ParButton
          size="small"
          variant="secondary"
          :disabled="!items.length"
          @click="confirmClear = true"
        >Empty pack</ParButton>
        <input
          ref="fileInput"
          class="backpack__file"
          type="file"
          accept="application/json,.json"
          @change="onFileChosen"
        />
      </div>
    </div>

    <p v-if="!saveNoteDismissed" class="backpack__save-note">
      <span class="backpack__save-icon" aria-hidden="true">💾</span>
      <span>Your pack saves automatically in <strong>this browser</strong>. To use it on
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
          @set-quantity="({ id, quantity }) => setQuantity(id, quantity)"
          @update="({ id, patch }) => updateItem(id, patch)"
          @remove="removeItem"
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
          @place="({ template, pos }) => addItem(template, pos)"
          @move="({ instanceId, pos }) => moveItemTo(instanceId, pos)"
          @reorder="({ movedId, targetId }) => reorderList(movedId, targetId)"
          @nudge="({ instanceId, dx, dy }) => nudge(instanceId, dx, dy)"
          @remove="removeItem"
          @select="selectItem"
          @autopack="autopack"
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
          @toggle="toggleCoinWeight"
        />
      </div>
    </div>

    <PrintList :items="items" :strength="strength" :status="status" :coins="coins" :coin-gold="coinGold" />

    <footer class="backpack__footer">
      <p class="backpack__footer-brand">Kenji's Game Master Tools</p>
      <p class="backpack__footer-links">
        <a href="https://cros.land/">More tools</a>
        · <a href="https://www.patreon.com/c/kenjisgamemastertools">Patreon</a>
      </p>
      <p class="backpack__attrib">
        Game content uses SRD 5.1, licensed under
        <a href="https://creativecommons.org/licenses/by/4.0/" rel="noopener">CC-BY-4.0</a>.
      </p>
    </footer>

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
  </div>
</template>

<script setup>
/**
 * Visual RPG Backpack — standalone, no-AI drag-and-drop inventory. The grid is a
 * cosmetic arrangement that never rejects an item; WEIGHT is the only real limit
 * (CapacityIndicator). Self-contained persistence + JSON backup; outside the AI
 * generator suite (no DataManagerModal coupling).
 */
import { ref } from 'vue';
import { ParButton, ParConfirm } from '@/parchment';
import { useToast } from '@/composables/useToast';
import { useBackpack } from './composables/useBackpack.js';
import { downloadBackpack } from './utils/backpack-storage.mjs';
import StrengthControl from './components/StrengthControl.vue';
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
.backpack {
  max-width: 120rem;
  margin: 0 auto;
  padding: 2.4rem 2rem 4rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
}

.backpack__header {
  margin-bottom: 1.8rem;
}

.backpack__title {
  margin: 0;
  font-size: 3.6rem;
  font-weight: 600;
  color: var(--color-action-hover, #2a4d70);
}

.backpack__tagline {
  margin: 0.4rem 0 0;
  font-size: 1.6rem;
  font-style: italic;
  color: var(--par-color-text-secondary, #555);
}

.backpack__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  margin-bottom: 1rem;
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

.backpack__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
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

.backpack__footer {
  margin-top: 3.2rem;
  padding-top: 1.8rem;
  border-top: 0.5px solid var(--par-color-border, #e8e2d4);
  text-align: center;
  color: var(--par-color-text-muted, #6b6b6b);
}

.backpack__footer-brand {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
}

.backpack__footer-links {
  margin: 0.3rem 0 0;
  font-size: 1.3rem;
}
.backpack__footer-links a,
.backpack__attrib a {
  color: var(--color-action-hover, #2a4d70);
}

.backpack__attrib {
  margin: 0.8rem 0 0;
  font-size: 1.15rem;
}

@media (max-width: 860px) {
  .backpack__main {
    grid-template-columns: 1fr;
  }
}

@media print {
  .backpack__header,
  .backpack__toolbar,
  .backpack__save-note,
  .backpack__main,
  .backpack__footer {
    display: none !important;
  }
}
</style>
