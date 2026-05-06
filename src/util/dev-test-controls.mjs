/**
 * Dev Test Data Controls
 *
 * Exposes seed/clear/snapshot operations on `window.devTestData` for
 * manual smoke testing in the browser console. Production-mode bail
 * matches `dev-ai-controls.mjs` — this is purely a developer tool.
 *
 * Console workflow:
 *   devTestData.help()     // see all commands
 *   devTestData.seed()     // wipe localStorage, write the test seed, reload
 *   devTestData.clear()    // wipe localStorage, reload (back to pristine app)
 *   devTestData.export()   // dump current localStorage to console for inspection
 *   devTestData.checklist() // print the manual-test checklist
 */

import { TEST_SEED, TEST_SEED_CHECKLIST } from './dev-test-data.mjs';

// localStorage keys this seed writes. Listed explicitly so `clear()`
// only wipes the application's keys (leaves things like `dev-current-page`,
// AI provider override, migrations-completed, etc. — see `clear()` docs).
const SEED_KEYS = [
  'monsters',
  'savedItems',
  'npcGeneratorNPCs',
  'gameSettings',
  'dungeons',
  'encounters',
  'tool-references',
];

// Additional keys we wipe so migrations/state run fresh after seeding.
const STATE_KEYS_TO_RESET = [
  'migrations-completed',
  'partyConfig',
];

function writeSeedToLocalStorage(seed) {
  for (const key of SEED_KEYS) {
    if (key in seed) {
      localStorage.setItem(key, JSON.stringify(seed[key]));
    } else {
      localStorage.removeItem(key);
    }
  }
  // Always reset migration tracking so the seeded data flows through
  // assign-dungeon-ids / assign-setting-ids / sweep-orphan-references on
  // next boot. That's the whole point — we WANT the legacy-id and
  // missing-id cases to exercise the migrations.
  for (const key of STATE_KEYS_TO_RESET) {
    localStorage.removeItem(key);
  }
}

function wipeLocalStorage() {
  for (const key of SEED_KEYS) {
    localStorage.removeItem(key);
  }
  for (const key of STATE_KEYS_TO_RESET) {
    localStorage.removeItem(key);
  }
}

function exportLocalStorage() {
  const out = {};
  for (const key of SEED_KEYS) {
    const raw = localStorage.getItem(key);
    out[key] = raw ? safeParse(raw) : null;
  }
  return out;
}

function safeParse(raw) {
  try { return JSON.parse(raw); } catch { return raw; }
}

/**
 * Initialize dev test-data controls (only in development).
 */
export function initDevTestControls() {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  window.devTestData = {
    /**
     * Wipe all app localStorage keys and write the curated test seed.
     * Reloads the page so migrations + reactive state pick up the new
     * data cleanly.
     *
     * Destructive: confirms before running.
     */
    seed() {
      const ok = confirm(
        'Seed manual test data?\n\n' +
        'This will OVERWRITE all existing items, NPCs, settings, dungeons, ' +
        'encounters, statblocks, and reference graph in localStorage.\n\n' +
        'Run devTestData.export() first if you want a copy of your current data.'
      );
      if (!ok) {
        console.log('Seed cancelled.');
        return;
      }
      writeSeedToLocalStorage(TEST_SEED);
      console.log('🌱 Test seed written. Reloading page so migrations + UI pick up the new state…');
      setTimeout(() => window.location.reload(), 50);
    },

    /**
     * Wipe all app localStorage keys (no seed). Returns the app to a
     * fresh-install state. Reloads.
     *
     * Destructive: confirms before running.
     */
    clear() {
      const ok = confirm(
        'Clear all app data?\n\n' +
        'Wipes items, NPCs, settings, dungeons, encounters, statblocks, ' +
        'and the reference graph. Cannot be undone.'
      );
      if (!ok) {
        console.log('Clear cancelled.');
        return;
      }
      wipeLocalStorage();
      console.log('🧹 App data wiped. Reloading…');
      setTimeout(() => window.location.reload(), 50);
    },

    /**
     * Dump current localStorage app state to console as a single object,
     * and return it so you can copy via $_ in the browser console.
     */
    export() {
      const state = exportLocalStorage();
      console.log('📦 Current app state:', state);
      console.log('(returned value also available — assign with: const snap = devTestData.export())');
      return state;
    },

    /**
     * Print the manual-test checklist. Walk through each item in the
     * running app to verify edge-case rendering before release.
     */
    checklist() {
      console.log('🧪 Manual test checklist after seeding:');
      console.log('');
      TEST_SEED_CHECKLIST.forEach((item, idx) => {
        console.log(`  ${String(idx + 1).padStart(2)}. ${item}`);
      });
      console.log('');
      console.log(`Total: ${TEST_SEED_CHECKLIST.length} scenarios.`);
    },

    /**
     * Show help.
     */
    help() {
      console.log(`
🌱 Test Data Controls
======================

Commands:
  devTestData.seed()       - Wipe + seed curated edge-case data, then reload
  devTestData.clear()      - Wipe all app data, then reload
  devTestData.export()     - Dump current app state to console (and return it)
  devTestData.checklist()  - Print the manual-test checklist for the seed
  devTestData.help()       - This help text

Typical workflow before release:
  1. devTestData.export() — save your current data if you want it back
  2. devTestData.seed()
  3. devTestData.checklist() — see what to verify
  4. Click through each tool, confirm edge cases render correctly
  5. devTestData.clear() (or restore your export manually) when done
      `);
    },
  };

  console.log('🌱 Test Data Controls loaded. Type devTestData.help() for commands.');
}
