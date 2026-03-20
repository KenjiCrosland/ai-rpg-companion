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

/**
 * List of all migrations to run.
 * Each migration is { name: string, run: () => void }
 *
 * Add new migrations to the end of this array.
 */
const migrations = [
  { name: 'extract-existing-references', run: extractExistingReferences }
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
