<template>
  <cdr-modal label="Save/Load Data" :opened="opened" aria-describedby="dataManagerModalDescription"
    @closed="closeModal">
    <template #title>
      <cdr-text tag="h3" class="title-header">
        Save/Load Data
      </cdr-text>
    </template>

    <!-- Free tier upsell -->
    <div v-if="!premium">
      <cdr-text id="dataManagerModalDescription" tag="p" style="margin-bottom: 1rem;">
        Downloading and uploading app data is reserved for the premium version of this app.
        Please access the premium version here:
      </cdr-text>

      <cdr-link v-if="matchedApp?.premiumLink" :href="matchedApp.premiumLink" target="_blank">
        {{ matchedApp?.appName }} - Premium Version
      </cdr-link>
    </div>

    <!-- Premium: single bundled download/upload -->
    <div v-else>
      <cdr-text id="dataManagerModalDescription" tag="p" style="margin-bottom: 1rem;">
        Save your data to a file you can back up, share, or move to another device. Upload a saved file to restore your
        work.
      </cdr-text>

      <div v-if="hasAnyData" class="summary">
        <p class="summary-heading">Currently in your browser:</p>
        <ul class="summary-list">
          <li v-for="row in summaryRows" :key="row.label">
            <strong>{{ row.count }}</strong> {{ row.label }}
          </li>
        </ul>
        <p class="summary-footer">Connections between your items, NPCs, and other tools are preserved automatically.</p>
      </div>
      <p v-else style="margin: 0.75rem 0;">
        No saved data found in this browser. Upload a previous export to restore your work.
      </p>

      <div class="buttons-container">
        <cdr-button modifier="secondary" @click="triggerFileSelect">
          Upload JSON
        </cdr-button>
        <input ref="fileInput" type="file" accept="application/json" style="display: none;"
          @change="handleFileChange" />

        <cdr-button @click="downloadData" :disabled="!hasAnyData">
          Download JSON
        </cdr-button>
      </div>
    </div>
  </cdr-modal>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  CdrModal,
  CdrText,
  CdrButton,
  CdrLink
} from '@rei/cedar';
import { writeQuota, QUOTA_FIELDS } from '@/util/quota-storage.mjs';

// Cedar CSS
import '@rei/cedar/dist/style/cdr-modal.css';
import '@rei/cedar/dist/style/cdr-text.css';
import '@rei/cedar/dist/style/cdr-button.css';
import '@rei/cedar/dist/style/cdr-link.css';

const props = defineProps({
  opened: {
    type: Boolean,
    default: false
  },
  premium: {
    type: Boolean,
    default: false
  },
  currentApp: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:opened']);

/**
 * Every localStorage key that's part of the user's game-master data
 * bundle. Listed in one place so download and upload stay consistent.
 *
 * `tool-references` MUST be included — it's the cross-tool relationship
 * graph (mentioned_in_item, appears_in_setting, has_statblock, etc.).
 * Without it, an exported NPC arriving on a fresh device would have its
 * back-link to its source item, dungeon, or setting disappear.
 *
 * `migrations-completed` is intentionally NOT included — that's run-state
 * tracking, not user data. On import, omitting it means the migrations
 * re-run against the imported blob (which is exactly what we want for old
 * exports that predate the current id format).
 */
const EXPORT_KEYS = [
  'monsters',
  'savedItems',
  'npcGeneratorNPCs',
  'gameSettings',
  'dungeons',
  'encounters',
  'tool-references',
  'rpgTimelineState',
];

/**
 * Per-tool display info. Used only for the free-tier upsell link
 * (matched against `currentApp`) — single-bundle exports don't need
 * the per-tool checkbox UI anymore.
 */
const APP_INFO = {
  monsters:         { appName: 'Statblock Generator',     premiumLink: 'https://cros.land/ai-powered-dnd-5e-monster-statblock-generator-premium/' },
  savedItems:       { appName: 'Magic Item Generator',    premiumLink: 'https://cros.land/dnd-5e-magic-item-generator-premium-version/' },
  npcGeneratorNPCs: { appName: 'NPC Generator',           premiumLink: 'https://cros.land/npc-generator-premium-version/' },
  rpgTimelineState: { appName: 'Timeline Generator',      premiumLink: null },
  gameSettings:     { appName: 'Worldbuilding Dashboard', premiumLink: 'https://cros.land/rpg-setting-generator-and-world-building-tool-premium-version/' },
  dungeons:         { appName: 'Dungeon Generator',       premiumLink: 'https://cros.land/dungeon-generator-2-0-premium-version/' },
  encounters:       { appName: 'Encounter Generator',     premiumLink: 'https://cros.land/dnd-5e-encounter-generator/' },
};

const matchedApp = computed(() => APP_INFO[props.currentApp] || null);

function safeParse(raw) {
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

/**
 * Read everything we'd export, parsed. Returns null for keys not in
 * localStorage. Used for both the summary panel and the download flow.
 */
function readBundleFromLocalStorage() {
  const out = {};
  for (const key of EXPORT_KEYS) {
    const parsed = safeParse(localStorage.getItem(key));
    if (parsed !== null) out[key] = parsed;
  }
  return out;
}

const bundle = computed(() => readBundleFromLocalStorage());
const hasAnyData = computed(() => Object.keys(bundle.value).length > 0);

/**
 * Friendly counts for the summary panel. Hides rows whose count is zero
 * so the panel stays compact for users who only use a few tools.
 */
const summaryRows = computed(() => {
  const b = bundle.value;
  const rows = [];
  const itemsLen = Array.isArray(b.savedItems) ? b.savedItems.length : 0;
  if (itemsLen) rows.push({ label: pluralize(itemsLen, 'item', 'items'), count: itemsLen });

  if (b.monsters && typeof b.monsters === 'object') {
    let count = 0;
    for (const folder of Object.values(b.monsters)) if (Array.isArray(folder)) count += folder.length;
    if (count) rows.push({ label: pluralize(count, 'statblock', 'statblocks'), count });
  }

  if (b.npcGeneratorNPCs && typeof b.npcGeneratorNPCs === 'object') {
    let count = 0;
    for (const folder of Object.values(b.npcGeneratorNPCs)) if (Array.isArray(folder)) count += folder.length;
    if (count) rows.push({ label: pluralize(count, 'NPC', 'NPCs'), count });
  }

  const settingsLen = Array.isArray(b.gameSettings) ? b.gameSettings.length : 0;
  if (settingsLen) rows.push({ label: pluralize(settingsLen, 'setting', 'settings'), count: settingsLen });

  const dungeonsLen = Array.isArray(b.dungeons) ? b.dungeons.length : 0;
  if (dungeonsLen) rows.push({ label: pluralize(dungeonsLen, 'dungeon', 'dungeons'), count: dungeonsLen });

  if (b.encounters && typeof b.encounters === 'object') {
    let count = 0;
    for (const folder of Object.values(b.encounters)) if (Array.isArray(folder)) count += folder.length;
    if (count) rows.push({ label: pluralize(count, 'encounter', 'encounters'), count });
  }

  // Cross-tool references are deliberately NOT shown as a counted row —
  // the connection layer is part of the export bundle but it's mechanism,
  // not user content. The summary footer reassures the user that links
  // survive without making them think about ref counts.

  return rows;
});

function pluralize(n, singular, plural) {
  return n === 1 ? singular : plural;
}

function closeModal() {
  emit('update:opened', false);
}

function downloadData() {
  const dataToSave = readBundleFromLocalStorage();

  // Strip ephemeral / device-local quota tracking from the monsters
  // blob — exports are portable user data, not per-device state.
  if (dataToSave.monsters) {
    delete dataToSave.monsters.generationCount;
    delete dataToSave.monsters.firstGenerationTime;
    for (const f of QUOTA_FIELDS) delete dataToSave.monsters[f];
  }

  if (!Object.keys(dataToSave).length) {
    alert('No data found to download.');
    return;
  }

  const date = new Date();
  const monthName = date.toLocaleString('default', { month: 'short' }).toLowerCase();
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2);
  const fileName = `game-master-data-${monthName}-${day}-${year}.json`;

  const jsonStr = JSON.stringify(dataToSave, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);

  closeModal();
}

const fileInput = ref(null);
function triggerFileSelect() {
  fileInput.value?.click();
}

function describeImport(dataObj) {
  // Build a "what's in this file" summary for the confirmation dialog.
  // Mirrors the summary panel so users see the same numbers they saw
  // before exporting.
  const lines = [];
  const itemsLen = Array.isArray(dataObj.savedItems) ? dataObj.savedItems.length : 0;
  if (itemsLen) lines.push(`• ${itemsLen} ${pluralize(itemsLen, 'item', 'items')}`);
  if (dataObj.monsters && typeof dataObj.monsters === 'object') {
    let n = 0;
    for (const f of Object.values(dataObj.monsters)) if (Array.isArray(f)) n += f.length;
    if (n) lines.push(`• ${n} ${pluralize(n, 'statblock', 'statblocks')}`);
  }
  if (dataObj.npcGeneratorNPCs && typeof dataObj.npcGeneratorNPCs === 'object') {
    let n = 0;
    for (const f of Object.values(dataObj.npcGeneratorNPCs)) if (Array.isArray(f)) n += f.length;
    if (n) lines.push(`• ${n} ${pluralize(n, 'NPC', 'NPCs')}`);
  }
  const settingsLen = Array.isArray(dataObj.gameSettings) ? dataObj.gameSettings.length : 0;
  if (settingsLen) lines.push(`• ${settingsLen} ${pluralize(settingsLen, 'setting', 'settings')}`);
  const dungeonsLen = Array.isArray(dataObj.dungeons) ? dataObj.dungeons.length : 0;
  if (dungeonsLen) lines.push(`• ${dungeonsLen} ${pluralize(dungeonsLen, 'dungeon', 'dungeons')}`);
  if (dataObj.encounters && typeof dataObj.encounters === 'object') {
    let n = 0;
    for (const f of Object.values(dataObj.encounters)) if (Array.isArray(f)) n += f.length;
    if (n) lines.push(`• ${n} ${pluralize(n, 'encounter', 'encounters')}`);
  }
  // tool-references intentionally omitted from the user-facing summary
  // — see summaryRows comment in the template script.
  return lines;
}

/**
 * Handle file upload. The file is expected to be a single bundle (the
 * format produced by the new download), but we also accept older
 * partial exports — any recognized key in the file gets imported, any
 * key NOT in the file is left alone in localStorage. That preserves
 * backwards compat with files exported before this consolidation.
 */
function handleFileChange(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const dataObj = JSON.parse(e.target.result);
      const recognizedKeys = EXPORT_KEYS.filter(k => k in dataObj);

      if (!recognizedKeys.length) {
        alert('No recognized app data found in the uploaded file.');
        return;
      }

      const lines = describeImport(dataObj);
      const summary = lines.length ? lines.join('\n') : '(empty bundle)';
      const confirmationMessage =
        `Import this bundle?\n\n${summary}\n\n` +
        'This will overwrite the matching data currently in your browser. ' +
        'Anything not in the file will be left alone. Continue?';

      if (!confirm(confirmationMessage)) {
        return;
      }

      for (const key of recognizedKeys) {
        let value = dataObj[key];
        if (key === 'monsters' && value && typeof value === 'object') {
          // Strip device-local quota tracking on import so the user
          // doesn't inherit another device's "near-limit" state.
          delete value.generationCount;
          delete value.firstGenerationTime;
          for (const f of QUOTA_FIELDS) delete value[f];
        }
        localStorage.setItem(key, JSON.stringify(value));
      }

      // Reset migrations-completed so the imported blob flows through
      // assign-dungeon-ids / assign-setting-ids / sweep-orphan-references
      // / rename-npc-item-fields on next boot. Old exports may carry
      // legacy id forms; new exports are already migrated but re-running
      // the migrations is idempotent.
      localStorage.removeItem('migrations-completed');

      // After importing `monsters`, seed fresh quota fields so the
      // user lands in the standard "fresh window" state on next read
      // instead of being soft-recovered to the daily limit.
      if (recognizedKeys.includes('monsters')) {
        await Promise.all([
          writeQuota('statblock', { count: 0, firstGenTime: null }),
          writeQuota('quest-hook', { count: 0, firstGenTime: null }),
          writeQuota('lore', { count: 0, firstGenTime: null }),
        ]);
      }

      alert('Data uploaded successfully.');
      location.reload();
      closeModal();
    } catch (err) {
      alert('Error parsing JSON file: ' + err.message);
    } finally {
      event.target.value = '';
    }
  };
  reader.readAsText(file);
}
</script>

<style scoped>
.summary {
  margin: 0.75rem 0 1rem;
  padding: 0.75rem 1rem;
  background: #f4f0e8;
  border: 1px solid #c9b99a;
  border-radius: 4px;
}

.summary-heading {
  margin: 0 0 0.5rem;
  font-weight: 600;
}

.summary-list {
  margin: 0;
  padding-left: 1.25rem;
  list-style: disc;
}

.summary-list li {
  margin-bottom: 0.15rem;
}

.summary-footer {
  margin: 0.6rem 0 0;
  font-size: 0.85em;
  font-style: italic;
  color: #6b6356;
}

.buttons-container {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: flex-end;
}
</style>
