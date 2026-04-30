/**
 * assign-setting-ids.mjs
 *
 * One-shot migration that gives every setting a stable string id.
 *
 * Settings predate the reference graph and are keyed by `place_name` in
 * older data. This migration:
 *
 *   1. Walks `gameSettings` and assigns a `set_${ts}_${random}` id to any
 *      setting that lacks one.
 *   2. Rewrites legacy `tool-references` whose `target_id`/`source_id` was
 *      a setting's place_name to the newly-assigned id.
 *   3. Backfills missing `appears_in_setting` references for setting-
 *      sourced NPCs. The original `extract-existing-references` migration
 *      silently skipped settings without an `id`, so most users currently
 *      have zero of these references in `tool-references`. Now that ids
 *      exist, fill them in.
 *
 * Idempotent: if every setting already has an id and no legacy refs
 * remain, this is a no-op aside from possibly creating refs for NPCs
 * whose folder name matches a setting's place_name (which is the
 * convention `migrateSourceTypeFromTypeOfPlace` and the existing
 * extraction already rely on).
 */

import { addReference, referenceExists } from './reference-storage.mjs';

const SETTINGS_KEY = 'gameSettings';
const REFS_KEY = 'tool-references';
const NPCS_KEY = 'npcGeneratorNPCs';

function generateSettingId() {
  return `set_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function safeParse(raw, fallback) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function assignSettingIds() {
  const settings = safeParse(localStorage.getItem(SETTINGS_KEY), null);
  if (!Array.isArray(settings)) return;

  // Step 1: assign IDs. Track which place_names just got new IDs so we can
  // rewrite legacy refs that targeted them by name.
  const nameToNewId = new Map();
  let assignedCount = 0;

  for (const setting of settings) {
    if (!setting || setting.id) continue;
    const newId = generateSettingId();
    setting.id = newId;
    if (setting.place_name) nameToNewId.set(setting.place_name, newId);
    assignedCount++;
  }

  if (assignedCount > 0) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  // Step 2: rewrite legacy refs whose source/target was a place_name. This
  // is defensive — most users have zero of these because the original
  // extraction migration skipped settings without an id.
  const references = safeParse(localStorage.getItem(REFS_KEY), {});
  let rewriteCount = 0;
  for (const ref of Object.values(references)) {
    if (ref.target_type === 'setting' && nameToNewId.has(ref.target_id)) {
      ref.target_id = nameToNewId.get(ref.target_id);
      rewriteCount++;
    }
    if (ref.source_type === 'setting' && nameToNewId.has(ref.source_id)) {
      ref.source_id = nameToNewId.get(ref.source_id);
      rewriteCount++;
    }
  }
  if (rewriteCount > 0) {
    localStorage.setItem(REFS_KEY, JSON.stringify(references));
  }

  // Step 3: backfill missing `appears_in_setting` refs for setting-sourced
  // NPCs. Folder name is the convention used by every existing setting
  // NPC migration to associate an NPC with its setting.
  const settingMap = new Map();
  for (const setting of settings) {
    if (setting?.place_name && setting?.id) {
      settingMap.set(setting.place_name, setting.id);
    }
  }

  let createdCount = 0;
  const npcs = safeParse(localStorage.getItem(NPCS_KEY), null);
  if (npcs && typeof npcs === 'object') {
    for (const folderName in npcs) {
      const folder = npcs[folderName];
      if (!Array.isArray(folder)) continue;
      const settingId = settingMap.get(folderName);
      if (!settingId) continue;

      for (const npc of folder) {
        if (npc?.sourceType !== 'setting') continue;
        const npcId = npc.npc_id || npc.id;
        if (!npcId) continue;
        if (referenceExists('npc', npcId, 'setting', settingId, 'appears_in_setting')) continue;

        const npcName = npc.npcDescriptionPart1?.character_name || 'Unknown NPC';
        addReference({
          source_type: 'npc',
          source_id: npcId,
          source_name: npcName,
          target_type: 'setting',
          target_id: settingId,
          target_name: folderName,
          relationship: 'appears_in_setting',
          context: '',
        });
        createdCount++;
      }
    }
  }

  console.log(
    `assign-setting-ids: assigned ${assignedCount} new IDs, rewrote ${rewriteCount} legacy refs, backfilled ${createdCount} appears_in_setting refs`
  );
}
