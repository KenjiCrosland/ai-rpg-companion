/**
 * promote-npc-statblock-ref-to-nested.mjs
 *
 * One-shot migration that consolidates every canonical NPC's statblock
 * reference (`statblock_name`, `statblock_folder`) under
 * `npcDescriptionPart1` and removes the legacy top-level copies.
 *
 * Background: the codebase historically had two write paths for NPC
 * statblock references:
 *
 *   - CANONICAL (NPC Generator's auto-save after a statblock generation)
 *     wrote nested under `npcDescriptionPart1.statblock_name`.
 *   - LEGACY (older saves) wrote top-level `npc.statblock_name`.
 *
 * The dungeon and setting NPC tabs originally read only the legacy
 * top-level location, so canonical writes were invisible until
 * `getNPCStatblockRef` centralized the dual-read. That helper covered
 * both shapes but propagated the dual-read pattern across every reader.
 *
 * This migration removes the legacy shape from the canonical store.
 * After it runs, every canonical NPC has its statblock reference (if
 * any) at `npcDescriptionPart1.statblock_name`, and `getNPCStatblockRef`
 * can drop its legacy-top-level fallback. The dungeon/setting-local
 * fallback (third branch in the helper) stays — those records are
 * dungeon-shape, where top-level is the correct location.
 *
 * Conflict resolution: if a canonical NPC carries the field at BOTH
 * locations (a corner case from concurrent writes mid-rollout), the
 * nested value wins. The top-level fields are always deleted at the
 * end of processing, regardless.
 *
 * Idempotent: running the migration twice produces the same end state
 * as running it once.
 */

import { logger } from './logger.mjs';

const STORE_KEY = 'npcGeneratorNPCs';

export function promoteNPCStatblockRefToNested() {
  let raw;
  try {
    raw = localStorage.getItem(STORE_KEY);
  } catch (error) {
    logger.warn('promote-npc-statblock-ref-to-nested: failed to read store:', error);
    return;
  }
  if (!raw) return;

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    logger.warn('promote-npc-statblock-ref-to-nested: failed to parse store:', error);
    return;
  }
  if (!parsed || typeof parsed !== 'object') return;

  let changed = false;

  // The store is keyed by folder name → array of canonical NPCs.
  for (const folder of Object.values(parsed)) {
    if (!Array.isArray(folder)) continue;

    for (const npc of folder) {
      if (!npc || typeof npc !== 'object') continue;

      // Ensure npcDescriptionPart1 exists if the NPC has a top-level
      // field to promote — otherwise the deletion below is the only
      // change for this record.
      const hasLegacyName = Object.prototype.hasOwnProperty.call(npc, 'statblock_name');
      const hasLegacyFolder = Object.prototype.hasOwnProperty.call(npc, 'statblock_folder');
      if (!hasLegacyName && !hasLegacyFolder) continue;

      if (!npc.npcDescriptionPart1 || typeof npc.npcDescriptionPart1 !== 'object') {
        npc.npcDescriptionPart1 = {};
      }

      // Promote each field independently. Nested wins on conflict so
      // partial concurrent writes don't lose the newer value.
      if (hasLegacyName && !npc.npcDescriptionPart1.statblock_name && npc.statblock_name) {
        npc.npcDescriptionPart1.statblock_name = npc.statblock_name;
      }
      if (hasLegacyFolder && !npc.npcDescriptionPart1.statblock_folder && npc.statblock_folder) {
        npc.npcDescriptionPart1.statblock_folder = npc.statblock_folder;
      }

      // Always strip the legacy top-level fields, even if nested already
      // had values (the migration's whole point is to remove them).
      if (hasLegacyName) delete npc.statblock_name;
      if (hasLegacyFolder) delete npc.statblock_folder;

      changed = true;
    }
  }

  if (changed) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(parsed));
    } catch (error) {
      logger.warn('promote-npc-statblock-ref-to-nested: failed to write store:', error);
    }
  }
}
