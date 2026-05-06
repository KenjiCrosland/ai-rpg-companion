/**
 * assign-dungeon-ids.mjs
 *
 * One-shot migration that converts legacy numeric dungeon ids
 * (`Date.now()`) to the stable string format `dng_${oldNumericId}`.
 *
 * The transform is deterministic and identity-preserving: a legacy id of
 * `1710000000000` becomes `dng_1710000000000`. Existing references in
 * `tool-references` whose `target_id`/`source_id` matched the numeric
 * value are rewritten to match.
 *
 * Idempotent: dungeons whose id already starts with `dng_` are left
 * alone; refs whose target/source already starts with `dng_` are left
 * alone.
 */

const DUNGEONS_KEY = 'dungeons';
const REFS_KEY = 'tool-references';

function safeParse(raw, fallback) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function legacyToString(id) {
  if (id === null || id === undefined) return null;
  const s = String(id);
  if (s.startsWith('dng_')) return s;
  return `dng_${s}`;
}

export function assignDungeonIds() {
  const dungeons = safeParse(localStorage.getItem(DUNGEONS_KEY), null);
  if (!Array.isArray(dungeons)) return;

  // Step 1: rewrite legacy ids on dungeons. Build a map from the old
  // (string-coerced) id to the new id so refs can be rewritten using the
  // exact same string form they were stored under.
  const oldToNew = new Map();
  let convertedCount = 0;

  for (const dungeon of dungeons) {
    if (!dungeon || dungeon.id === null || dungeon.id === undefined) continue;
    const oldKey = String(dungeon.id);
    if (oldKey.startsWith('dng_')) continue;
    const newId = legacyToString(dungeon.id);
    dungeon.id = newId;
    oldToNew.set(oldKey, newId);
    convertedCount++;
  }

  if (convertedCount > 0) {
    localStorage.setItem(DUNGEONS_KEY, JSON.stringify(dungeons));
  }

  // Step 2: rewrite tool-references. Refs may have been stored with either
  // a numeric or stringified target_id (JSON.stringify preserves number
  // type), so match on the string form.
  const references = safeParse(localStorage.getItem(REFS_KEY), {});
  let rewriteCount = 0;
  for (const ref of Object.values(references)) {
    if (ref.target_type === 'dungeon') {
      const key = ref.target_id === null || ref.target_id === undefined ? null : String(ref.target_id);
      if (key && oldToNew.has(key)) {
        ref.target_id = oldToNew.get(key);
        rewriteCount++;
      }
    }
    if (ref.source_type === 'dungeon') {
      const key = ref.source_id === null || ref.source_id === undefined ? null : String(ref.source_id);
      if (key && oldToNew.has(key)) {
        ref.source_id = oldToNew.get(key);
        rewriteCount++;
      }
    }
  }
  if (rewriteCount > 0) {
    localStorage.setItem(REFS_KEY, JSON.stringify(references));
  }

  console.log(
    `assign-dungeon-ids: converted ${convertedCount} legacy ids, rewrote ${rewriteCount} refs`
  );
}
