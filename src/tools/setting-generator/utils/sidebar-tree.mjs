/**
 * sidebar-tree.mjs
 *
 * Pure helpers for the SettingGenerator sidebar tree:
 *
 *   - sortUnnamedToBottom(level)   — stable-sort each tree level so
 *     entries without a place_name fall to the bottom. Used to keep
 *     the "show form by default" blank draft from sitting above the
 *     user's named settings.
 *
 *   - siblingIdsToReparent({ settings, source, oldParentId })  —
 *     return the ids of settings that were promoted as siblings of
 *     `source` (via source.related_places kind='sibling' stubs with
 *     promoted_setting_id set) AND are still at the parentId source
 *     held before its own reparent. Used by the parent-promote
 *     finalize step to cascade-move sibling settings under the new
 *     parent so the cluster's geographic relationship survives.
 *
 *     One-hop only: chained cascades through grandchild-siblings
 *     aren't expanded here. If a deeper cascade is wanted, the
 *     caller can re-invoke for each cascaded id, but in practice
 *     deeper cascades should be triggered by explicit parent-promote
 *     actions on the deeper settings.
 *
 *     The "still at oldParentId" constraint preserves any explicit
 *     manual reparent the user performed since the sibling was
 *     promoted — we only auto-move siblings that haven't been
 *     touched independently.
 */

/**
 * Recursively sort each level of the tree so unnamed entries land at
 * the bottom. Mutates `level` in place (and each `children` array).
 *
 * @param {Array<Object>} level - array of tree nodes; each may have a
 *   `children` array of the same shape.
 */
export function sortUnnamedToBottom(level) {
  if (!Array.isArray(level)) return;
  level.sort((a, b) => {
    const aNamed = !!(a?.place_name || '').trim();
    const bNamed = !!(b?.place_name || '').trim();
    if (aNamed && !bNamed) return -1;
    if (!aNamed && bNamed) return 1;
    return 0; // stable: insertion order within each bucket
  });
  for (const node of level) {
    if (node?.children?.length) sortUnnamedToBottom(node.children);
  }
}

/**
 * Compute the ids of settings that should follow `source` to a new
 * parent during a parent-promote cascade.
 *
 * @param {Object} params
 * @param {Array<Object>} params.settings    - settings array (flat, by id)
 * @param {Object} params.source             - the setting being reparented
 * @param {string|null} params.oldParentId   - source.parentId before the reparent
 * @returns {Array<string>} ids of sibling settings to also move
 */
export function siblingIdsToReparent({ settings, source, oldParentId }) {
  if (!source || !Array.isArray(source.related_places)) return [];
  if (!Array.isArray(settings)) return [];
  const normalizedOld = oldParentId ?? null;
  const ids = [];
  for (const stub of source.related_places) {
    if (stub?.kind !== 'sibling') continue;
    if (!stub.promoted_setting_id) continue;
    const sibling = settings.find(s => s?.id === stub.promoted_setting_id);
    if (!sibling) continue;
    if ((sibling.parentId ?? null) !== normalizedOld) continue;
    ids.push(stub.promoted_setting_id);
  }
  return ids;
}
