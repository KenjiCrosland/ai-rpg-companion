/**
 * sweep-stub-names.mjs
 *
 * One-shot data sweep: walk every stub that links to a setting by
 * stable id (`promoted_setting_id` on related-places stubs;
 * `setting_id` on item-side stubs) and align the stub's `name`
 * field to the linked setting's current `place_name`.
 *
 * Bug this cleans up: prior to the rename-propagation hook in
 * OverviewTab.saveEdit, renaming a setting left every stub pointing
 * to it with the old display name. The link survived (id-based) but
 * the UI showed the stale name. This migration applies the
 * propagation retroactively to existing data.
 *
 * Forward-only after this: future renames flow through
 * renameSettingReferences, so the sweep doesn't need to re-run.
 *
 * Idempotent: a stub whose name already matches the linked setting's
 * place_name is left alone; storage is only re-written when a stub
 * actually changes.
 *
 * Reference-graph edges (`tool-references` source_name / target_name)
 * are NOT swept here — they aren't user-visible, and the rename
 * helper already updates them forward. If they go stale on existing
 * data, it doesn't affect user-facing behavior.
 */

const SETTINGS_KEY = 'gameSettings';
const ITEMS_KEY = 'savedItems';

function safeParse(raw, fallback) {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function sweepStubNames() {
  const settings = safeParse(localStorage.getItem(SETTINGS_KEY), null);
  if (!Array.isArray(settings) || settings.length === 0) return;

  // Build a setting-id → current place_name map for fast lookup.
  // Settings without a stable id are skipped (they couldn't have been
  // linked by id in the first place).
  const nameById = new Map();
  for (const s of settings) {
    if (!s?.id) continue;
    const placeName = (s.place_name || '').trim();
    if (placeName) nameById.set(s.id, placeName);
  }
  if (nameById.size === 0) return;

  let settingStubsUpdated = 0;
  let itemStubsUpdated = 0;

  // 1. Walk every setting's related_places[] stubs.
  let settingsChanged = false;
  for (const s of settings) {
    if (!Array.isArray(s?.related_places)) continue;
    for (const stub of s.related_places) {
      const linkedId = stub?.promoted_setting_id;
      if (!linkedId) continue;
      const liveName = nameById.get(linkedId);
      if (!liveName) continue;
      if (stub.name === liveName) continue;
      stub.name = liveName;
      settingStubsUpdated++;
      settingsChanged = true;
    }
  }
  if (settingsChanged) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  // 2. Walk every item's related_settings[] stubs.
  const items = safeParse(localStorage.getItem(ITEMS_KEY), null);
  if (Array.isArray(items) && items.length > 0) {
    let itemsChanged = false;
    for (const item of items) {
      if (!Array.isArray(item?.related_settings)) continue;
      for (const stub of item.related_settings) {
        const linkedId = stub?.setting_id;
        if (!linkedId) continue;
        const liveName = nameById.get(linkedId);
        if (!liveName) continue;
        if (stub.name === liveName) continue;
        stub.name = liveName;
        itemStubsUpdated++;
        itemsChanged = true;
      }
    }
    if (itemsChanged) {
      localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
    }
  }

  console.log(
    `sweep-stub-names: aligned ${settingStubsUpdated} related-places stub(s) and ${itemStubsUpdated} item-side stub(s) to current setting names`,
  );
}
