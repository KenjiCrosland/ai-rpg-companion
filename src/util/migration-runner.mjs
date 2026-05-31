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
import { promoteNPCIds } from './promote-npc-id.mjs';
import { assignDungeonIds } from './assign-dungeon-ids.mjs';
import { assignSettingIds } from './assign-setting-ids.mjs';
import { migrateSettingParentId } from './migrate-setting-parent-id.mjs';
import { dropNPCFolder } from './drop-npc-folder.mjs';
import { sweepOrphanReferences } from './sweep-orphan-references.mjs';
import { promoteNPCStatblockRefToNested } from './promote-npc-statblock-ref-to-nested.mjs';
import { sweepAuntUncleSiblingStubs } from './sweep-aunt-uncle-sibling-stubs.mjs';
import { sweepStubNames } from './sweep-stub-names.mjs';
import { seedCrossToolQuota } from './seed-cross-tool-quota.mjs';
import { seedMonsterQuotas } from './seed-monster-quotas.mjs';
import { logger } from './logger.mjs';
import { renameResolutionsToPotentialOutcomes } from './rename-resolutions-to-potential-outcomes.mjs';

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
 *   3. promote-npc-id — promote legacy `id` field on NPC records up to
 *      `npc_id` and drop the legacy field. Runs after rename-npc-item-fields
 *      (which may touch the same records' source-tagging fields) but
 *      before any consumer that reads `npc_id` as the canonical id.
 *   4. assign-dungeon-ids / assign-setting-ids — convert entities to
 *      stable string ids and rewrite refs that targeted them by name or
 *      numeric value.
 *   5. migrate-setting-parent-id — promote settings' parentIndex →
 *      parentId and importantLocations[].main_index →
 *      promoted_setting_id. Depends on assign-setting-ids having run
 *      first so every setting has a resolvable id.
 *   6. drop-npc-folder — remove the `npc_folder` denormalization from
 *      every cross-tool stub. Substrate lookups walk by id now; the
 *      cached folder hint is dead weight and a stale-cache hazard.
 *   7. sweep-orphan-references — drops any refs whose source/target no
 *      longer resolves; runs after the id migrations so their post-
 *      rewrite refs aren't seen as orphans.
 *   8. promote-npc-statblock-ref-to-nested — moves canonical NPC
 *      statblock_name/folder from top-level to npcDescriptionPart1.
 *      Lets `getNPCStatblockRef` drop its legacy-top-level fallback
 *      branch and removes the dual-read pattern from the codebase.
 *   9. sweep-aunt-uncle-sibling-stubs — drops sibling-kind
 *      related_places stubs whose names match the setting's
 *      "aunt/uncle" set (parent's siblings + parent's sibling stubs).
 *      Cleans up scale-mismatched peer claims the extraction LLM
 *      produced before `collectRelatedSettingNames` learned to
 *      exclude aunts/uncles. Depends on `migrate-setting-parent-id`
 *      so every setting has a resolvable parentId to walk.
 *  10. sweep-stub-names — aligns every stub's display `name` to its
 *      linked setting's current `place_name`. Cleans up stale names
 *      left over from setting renames performed before
 *      OverviewTab.saveEdit gained rename-propagation. Idempotent.
 *      Depends on `assign-setting-ids` so id-linked stubs can resolve.
 *  11. seed-cross-tool-quota — seeds `_xt: { c: 0 }` on the `monsters`
 *      host so the cross-tool gate can safely use `recoverAtCount`.
 *      Async — signs via SubtleCrypto. Order-independent; placed at
 *      the end so it doesn't gate any earlier data work.
 *  12. rename-resolutions-to-potential-outcomes — renames the dungeon
 *      overview's `resolutions` field to `potential_outcomes` on every
 *      saved dungeon. Order-independent; the field is structural data
 *      on `dungeonOverview` and isn't touched by any earlier migration.
 *  13. seed-monster-quotas — parallel to seed-cross-tool-quota for the
 *      remaining three quota domains on the `monsters` host: `_q`
 *      (statblock), `_qh` (quest-hook), `_lr` (lore). Creates the
 *      baseline-present guarantee that lets each gate distinguish
 *      "user never generated yet" from "user deleted the field
 *      (tampering)." Async — signs via SubtleCrypto.
 *
 * Add new migrations to the end of this array.
 */
const migrations = [
  { name: 'extract-existing-references', run: extractExistingReferences },
  { name: 'rename-npc-item-fields', run: renameNPCItemFields },
  { name: 'promote-npc-id', run: promoteNPCIds },
  { name: 'assign-dungeon-ids', run: assignDungeonIds },
  { name: 'assign-setting-ids', run: assignSettingIds },
  { name: 'migrate-setting-parent-id', run: migrateSettingParentId },
  { name: 'drop-npc-folder', run: dropNPCFolder },
  { name: 'sweep-orphan-references', run: sweepOrphanReferences },
  { name: 'promote-npc-statblock-ref-to-nested', run: promoteNPCStatblockRefToNested },
  { name: 'sweep-aunt-uncle-sibling-stubs', run: sweepAuntUncleSiblingStubs },
  { name: 'sweep-stub-names', run: sweepStubNames },
  { name: 'seed-cross-tool-quota', run: seedCrossToolQuota },
  { name: 'rename-resolutions-to-potential-outcomes', run: renameResolutionsToPotentialOutcomes },
  { name: 'seed-monster-quotas', run: seedMonsterQuotas },
];

/**
 * Run all pending migrations that haven't been completed yet.
 * Migrations are awaited in order — a migration may return a Promise
 * (e.g., the cross-tool quota seed signs via SubtleCrypto). Sync
 * migrations work unchanged because `await` on a non-thenable value
 * resolves immediately.
 *
 * If a migration throws, it won't be marked complete and will retry
 * on next load.
 */
export async function runPendingMigrations() {
  let completed;

  try {
    completed = JSON.parse(localStorage.getItem('migrations-completed') || '[]');
  } catch (error) {
    logger.warn('Failed to parse migrations-completed, starting fresh:', error);
    completed = [];
  }

  for (const migration of migrations) {
    if (!completed.includes(migration.name)) {
      try {
        logger.log(`Running migration: ${migration.name}...`);
        await migration.run();
        completed.push(migration.name);
        localStorage.setItem('migrations-completed', JSON.stringify(completed));
        logger.log(`Migration complete: ${migration.name}`);
      } catch (error) {
        logger.error(`Migration failed: ${migration.name}`, error);
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
    logger.warn(`Migration '${name}' is already registered`);
    return;
  }

  migrations.push({ name, run });
}
