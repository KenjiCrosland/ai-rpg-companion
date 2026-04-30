/**
 * migration-runner.mjs
 *
 * Utility for running one-time data migrations with version tracking.
 *
 * Migrations are tracked in localStorage under 'migrations-completed' key.
 * Each migration runs exactly once per browser and is recorded to prevent re-running.
 *
 * Usage:
 *   import { runPendingMigrations } from '@/util/migration-runner.mjs';
 *
 *   // In App.vue mounted():
 *   runPendingMigrations();
 */

import { extractExistingReferences } from './extract-existing-references.mjs';
import { renameNPCItemFields } from './rename-npc-item-fields.mjs';
import { assignDungeonIds } from './assign-dungeon-ids.mjs';
import { assignSettingIds } from './assign-setting-ids.mjs';
import { sweepOrphanReferences } from './sweep-orphan-references.mjs';

/**
 * List of all migrations to run.
 * Each migration is { name: string, run: () => void }
 *
 * Order matters when migrations touch the same data:
 *   1. extract-existing-references — populates initial reference graph
 *      from legacy data shapes.
 *   2. rename-npc-item-fields — promotes legacy `itemName` on item-sourced
 *      NPCs to the generic `sourceId`/`sourceName` pair. Runs before any
 *      id migration that might touch the same records.
 *   3. assign-dungeon-ids / assign-setting-ids — convert entities to
 *      stable string ids and rewrite refs that targeted them by name or
 *      numeric value.
 *   4. sweep-orphan-references — drops any refs whose source/target no
 *      longer resolves; runs after the id migrations so their post-
 *      rewrite refs aren't seen as orphans.
 *
 * Add new migrations to the end of this array.
 */
const migrations = [
  { name: 'extract-existing-references', run: extractExistingReferences },
  { name: 'rename-npc-item-fields', run: renameNPCItemFields },
  { name: 'assign-dungeon-ids', run: assignDungeonIds },
  { name: 'assign-setting-ids', run: assignSettingIds },
  { name: 'sweep-orphan-references', run: sweepOrphanReferences },
];

/**
 * Run all pending migrations that haven't been completed yet.
 * Migrations are run synchronously in order.
 *
 * If a migration throws an error, it won't be marked complete and will retry on next load.
 */
export function runPendingMigrations() {
  let completed;

  try {
    completed = JSON.parse(localStorage.getItem('migrations-completed') || '[]');
  } catch (error) {
    console.warn('Failed to parse migrations-completed, starting fresh:', error);
    completed = [];
  }

  for (const migration of migrations) {
    if (!completed.includes(migration.name)) {
      try {
        console.log(`Running migration: ${migration.name}...`);
        migration.run();
        completed.push(migration.name);
        localStorage.setItem('migrations-completed', JSON.stringify(completed));
        console.log(`Migration complete: ${migration.name}`);
      } catch (error) {
        console.error(`Migration failed: ${migration.name}`, error);
        // Don't add to completed - will retry next load
      }
    }
  }
}

/**
 * Register a migration to be run.
 * This should be called before runPendingMigrations().
 *
 * @param {string} name - Unique migration name
 * @param {Function} run - Migration function to execute
 */
export function registerMigration(name, run) {
  // Check if migration with this name already exists
  const existing = migrations.find(m => m.name === name);
  if (existing) {
    console.warn(`Migration '${name}' is already registered`);
    return;
  }

  migrations.push({ name, run });
}
