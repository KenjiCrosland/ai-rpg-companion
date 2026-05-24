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
 * Flatten a settings tree to a depth-tagged list, skipping any
 * subtree whose root is not in `expandedIds`. Each emitted node
 * carries:
 *   - depth:       render-time indent level (0 = top-level)
 *   - hasChildren: whether this node has any sub-nodes
 *   - isExpanded:  whether this node is currently expanded
 *                  (only meaningful when hasChildren is true)
 *   - id / originalIndex / place_name / children / ...:
 *                  the node's own fields, spread through
 *
 * Pure function — does not mutate inputs.
 *
 * @param {Array<Object>} tree         - settings tree (each node has
 *                                       `children` and `id`)
 * @param {Set<string>}    expandedIds  - setting ids currently expanded
 * @param {number}         depth        - internal recursion arg; callers pass 0
 * @returns {Array<Object>}
 */
export function flattenVisibleSettings(tree, expandedIds, depth = 0) {
  const flat = [];
  if (!Array.isArray(tree)) return flat;
  const expanded = expandedIds instanceof Set ? expandedIds : new Set();
  for (const node of tree) {
    if (!node) continue;
    const hasChildren = Array.isArray(node.children) && node.children.length > 0;
    const isExpanded = hasChildren && expanded.has(node.id);
    flat.push({ ...node, depth, hasChildren, isExpanded });
    if (isExpanded) {
      flat.push(...flattenVisibleSettings(node.children, expanded, depth + 1));
    }
  }
  return flat;
}

/**
 * Given a flat settings array and a target setting id, return a NEW
 * expanded set that contains every ancestor of the target PLUS
 * whatever was already in `currentExpanded`. The target itself is
 * NOT added — expansion state of the target is independent of the
 * "is it on the path" question.
 *
 * The auto-expand behavior fires on selection changes:
 * `Don't auto-collapse branches the user previously opened. Don't
 * auto-expand branches the user previously closed. The auto-expand
 * behavior only fires when navigating to a new selection and only
 * operates on the path to that selection.`
 *
 * Implementation is set-union, so it can never collapse a branch
 * the user already opened.
 *
 * Defensive against cycles via a seen-set guard.
 *
 * Pure function — does not mutate inputs.
 *
 * @param {Array<Object>} settings        - flat settings array
 * @param {string|null}   settingId       - target setting whose path to expand
 * @param {Set<string>}   currentExpanded - existing expanded set
 * @returns {Set<string>}
 */
export function expandPathToSetting(settings, settingId, currentExpanded) {
  const next = new Set(currentExpanded || []);
  if (!settingId || !Array.isArray(settings)) return next;
  const byId = new Map();
  for (const s of settings) {
    if (s?.id) byId.set(s.id, s);
  }
  const target = byId.get(settingId);
  if (!target) return next;
  const seen = new Set();
  let cursor = target.parentId ?? null;
  while (cursor && !seen.has(cursor)) {
    seen.add(cursor);
    next.add(cursor);
    cursor = byId.get(cursor)?.parentId ?? null;
  }
  return next;
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
