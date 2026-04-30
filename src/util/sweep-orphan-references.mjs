/**
 * sweep-orphan-references.mjs
 *
 * One-shot migration that drops `tool-references` entries whose source or
 * target entity no longer resolves against current localStorage. Plugs the
 * accumulated debt from delete sites that historically didn't clean up
 * after themselves.
 *
 * Runs AFTER `assign-dungeon-ids` and `assign-setting-ids` so post-rewrite
 * refs aren't seen as orphans.
 *
 * The resolution logic mirrors the dev orphan probe so the count printed
 * by this migration matches what the probe reports against the same
 * data: dungeons match by stringified id (post-migration: `dng_…`);
 * settings match by id with a place_name fallback for any legacy refs
 * that escaped the id migration; encounters match by `${folder}__${index}`.
 */

import { removeReference } from './reference-storage.mjs';

const REFS_KEY = 'tool-references';

function safeParse(raw, fallback) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function buildIndexes() {
  const npcs = safeParse(localStorage.getItem('npcGeneratorNPCs'), {});
  const monsters = safeParse(localStorage.getItem('monsters'), {});
  const dungeons = safeParse(localStorage.getItem('dungeons'), []);
  const settings = safeParse(localStorage.getItem('gameSettings'), []);
  const encounters = safeParse(localStorage.getItem('encounters'), {});
  const items = safeParse(localStorage.getItem('savedItems'), []);

  const npcIds = new Set();
  if (npcs && typeof npcs === 'object') {
    for (const folder of Object.values(npcs)) {
      if (!Array.isArray(folder)) continue;
      for (const n of folder) {
        if (n?.npc_id) npcIds.add(n.npc_id);
      }
    }
  }

  const statblockKeys = new Set();
  if (monsters && typeof monsters === 'object') {
    for (const [folder, list] of Object.entries(monsters)) {
      if (!Array.isArray(list)) continue;
      for (const s of list) {
        if (s?.name) statblockKeys.add(`${s.name}__${folder}`);
      }
    }
  }

  const dungeonIds = new Set(
    Array.isArray(dungeons)
      ? dungeons.map(d => (d?.id !== null && d?.id !== undefined ? String(d.id) : null)).filter(Boolean)
      : []
  );

  const settingIds = new Set(
    Array.isArray(settings)
      ? settings.map(s => s?.id).filter(Boolean)
      : []
  );

  const settingNames = new Set(
    Array.isArray(settings)
      ? settings.map(s => s?.place_name).filter(Boolean)
      : []
  );

  const itemNames = new Set(
    Array.isArray(items)
      ? items.map(i => i?.name).filter(Boolean)
      : []
  );

  const encounterKeys = new Set();
  if (encounters && typeof encounters === 'object') {
    for (const [folder, list] of Object.entries(encounters)) {
      if (!Array.isArray(list)) continue;
      list.forEach((_, i) => encounterKeys.add(`${folder}__${i}`));
    }
  }

  return { npcIds, statblockKeys, dungeonIds, settingIds, settingNames, itemNames, encounterKeys };
}

function exists(type, id, indexes) {
  if (!id) return false;
  const key = String(id);
  switch (type) {
    case 'npc': return indexes.npcIds.has(id);
    case 'statblock': return indexes.statblockKeys.has(id);
    case 'dungeon': return indexes.dungeonIds.has(key);
    case 'setting': return indexes.settingIds.has(id) || indexes.settingNames.has(id);
    case 'encounter': return indexes.encounterKeys.has(id);
    case 'item': return indexes.itemNames.has(id);
    default: return true;
  }
}

export function sweepOrphanReferences() {
  const references = safeParse(localStorage.getItem(REFS_KEY), {});
  if (!references || typeof references !== 'object') return;

  const indexes = buildIndexes();
  let removed = 0;

  for (const ref of Object.values(references)) {
    const sourceGone = !exists(ref.source_type, ref.source_id, indexes);
    const targetGone = !exists(ref.target_type, ref.target_id, indexes);
    if (sourceGone || targetGone) {
      if (removeReference(ref.id)) removed++;
    }
  }

  console.log(`sweep-orphan-references: removed ${removed} orphan refs`);
}
