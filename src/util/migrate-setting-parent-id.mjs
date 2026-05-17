/**
 * migrate-setting-parent-id.mjs
 *
 * Promotes the two remaining array-index references in the settings
 * store to stable string-id references:
 *
 *   - `setting.parentIndex` (number | null)
 *       → `setting.parentId`  (string | null), pointing at the parent
 *         setting's `id` (`set_${ts}_${rand}`).
 *
 *   - `setting.importantLocations[].main_index` (number | null)
 *       → `setting.importantLocations[].promoted_setting_id` (string | null),
 *         pointing at the full sub-location setting promoted from this
 *         stub.
 *
 * Why: the index-based references force a reindex pass on every delete
 * (decrement every parentIndex > deletedIdx; same for every main_index).
 * That's brittle (the delete reindex was already a known footgun) and
 * makes new operations like `reparent` painful to add. With stable ids,
 * delete becomes a single splice + reference-graph cleanup, and
 * reparent is a single field write.
 *
 * Runs AFTER `assign-setting-ids` (which guarantees every setting has
 * an `id`). Safe if some legacy setting somehow lacks an id — the
 * reference simply lands as `null` and the orphan-sweep migration
 * later picks it up.
 *
 * Idempotent: a setting that already has parentId (and no parentIndex)
 * is left alone; same for stubs that already have promoted_setting_id.
 */

const SETTINGS_KEY = 'gameSettings';

function safeParse(raw, fallback) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/**
 * Resolve a numeric index in the settings array to that setting's id.
 * Returns null when the index is out of range or the target setting
 * lacks an id (defensive — assign-setting-ids runs upstream).
 */
function resolveIndexToId(settings, idx) {
  if (typeof idx !== 'number') return null;
  if (idx < 0 || idx >= settings.length) return null;
  const target = settings[idx];
  return target?.id || null;
}

export function migrateSettingParentId() {
  const settings = safeParse(localStorage.getItem(SETTINGS_KEY), null);
  if (!Array.isArray(settings) || settings.length === 0) return;

  let parentIdAssigned = 0;
  let promotedIdAssigned = 0;
  let parentIndexDropped = 0;
  let mainIndexDropped = 0;

  for (const setting of settings) {
    if (!setting || typeof setting !== 'object') continue;

    // (a) parentIndex → parentId
    // - Already migrated (has parentId, no parentIndex): leave alone.
    // - parentIndex is a number: resolve to id, write parentId, drop parentIndex.
    // - parentIndex is explicitly null: set parentId to null (top-level), drop parentIndex.
    if ('parentIndex' in setting) {
      const idx = setting.parentIndex;
      if (typeof idx === 'number') {
        setting.parentId = resolveIndexToId(settings, idx);
        parentIdAssigned++;
      } else {
        // parentIndex was null/undefined — treat as top-level.
        setting.parentId = null;
      }
      delete setting.parentIndex;
      parentIndexDropped++;
    } else if (!('parentId' in setting)) {
      // Brand-new setting with neither field — default to top-level.
      setting.parentId = null;
    }

    // (b) importantLocations[].main_index → promoted_setting_id
    if (Array.isArray(setting.importantLocations)) {
      for (const loc of setting.importantLocations) {
        if (!loc || typeof loc !== 'object') continue;
        if ('main_index' in loc) {
          const idx = loc.main_index;
          if (typeof idx === 'number') {
            loc.promoted_setting_id = resolveIndexToId(settings, idx);
            promotedIdAssigned++;
          } else {
            loc.promoted_setting_id = null;
          }
          delete loc.main_index;
          mainIndexDropped++;
        } else if (!('promoted_setting_id' in loc)) {
          loc.promoted_setting_id = null;
        }
      }
    }
  }

  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

  console.log(
    `migrate-setting-parent-id: assigned ${parentIdAssigned} parentId / ${promotedIdAssigned} promoted_setting_id; dropped ${parentIndexDropped} parentIndex / ${mainIndexDropped} main_index fields`
  );
}
