/**
 * assign-content-seeds.mjs
 *
 * Place "content seeds" produced by one room onto eligible host rooms
 * elsewhere in the dungeon. Currently the only producer is the
 * key/obstacle pair's external clue distribution (key rooms with
 * non-obvious solutions can request 1-2 clues live in other rooms so
 * a party scouting ahead can pick up the trail). The substrate is
 * kept generic — keyed by a `kind` tag — so future producers
 * (foreshadowing, NPC reference, hint, etc.) can plug in without
 * re-architecting.
 *
 * Pure-ish: reads from the dungeon, mutates the chosen rooms by
 * appending to their `pendingContentSeeds` arrays, returns a placement
 * record. No I/O — caller persists via the usual saveDungeons() path.
 *
 * Eligibility (a room can host a seed when ALL hold):
 *   1. Not the origin room (a room can't seed itself).
 *   2. roomType is in ELIGIBLE_HOST_TYPES: living, purpose, secret,
 *      setback, custom. Excluded types either have heavy assigned
 *      content (entrance, boss, locked, key, obstacle — these have
 *      fixed roles) or are atmospheric-only (connecting — those
 *      prompts don't carry plot-relevant detail).
 *   3. No contentArray yet — the user hasn't generated the room.
 *      Seeding a room that already has prose would either be lost or
 *      contradict what was written.
 *   4. No lore-location assignment from `loreAssignments` — the room
 *      already has a destined name from the overview prose and we
 *      don't want to compete with that signal.
 *   5. No NPC / monster / item assignment — those rooms have hosts
 *      lined up; the seed might conflict thematically.
 *
 * Selection strategy: from the eligible set, pick the first N by
 * ascending area id. Deterministic — re-running with the same dungeon
 * state yields the same placement, which makes the flow testable and
 * the GM's experience predictable. Graceful fallback: if no eligible
 * rooms exist, returns an empty placement list and the caller's
 * content stays where it was (the key room's local clue list handles
 * this case — see the THREE CLUE RULE block in key-room.mjs).
 */

const ELIGIBLE_HOST_TYPES = new Set([
  'living',
  'purpose',
  'secret',
  'setback',
  'custom',
  // 'locked' covers both pickable-locked rooms (lock IS the challenge)
  // and the requiresKey obstacle flow (quest-gate, key is elsewhere).
  // The obstacle-room case is the highest-value clue host: the party
  // reading the obstacle naturally wants a clue about where the key
  // lives. See the `preferredRoomIds` option below for the bias that
  // routes the first seed to the obstacle room when known.
  'locked',
]);

/**
 * @param {Object} dungeon - The dungeon record (dungeon.rooms is the room array).
 * @param {Array<{content: string}>} seeds - 0-N seed objects. `content` is the prose to inject.
 * @param {number|string} originRoomId - The producing room's id (excluded as a candidate).
 * @param {string} [kind='clue'] - Seed kind tag stored alongside content so the consuming
 *                                 prompt can frame it appropriately.
 * @param {Object} [options]
 * @param {Array<number|string>} [options.preferredRoomIds] - Room ids to try FIRST,
 *        in the given order, before falling back to the default ascending-area-id
 *        candidate list. Each preferred room must still pass the same eligibility
 *        gate. Used by the key-room flow to bias the first clue toward the paired
 *        obstacle room — see handleKeyRoom in useRoomDescription.js.
 * @returns {Array<{roomId: number|string, content: string, kind: string}>}
 *          Placement record — one entry per seed that found a home. May be empty.
 */
export function assignContentSeeds(dungeon, seeds, originRoomId, kind = 'clue', options = {}) {
  if (!dungeon || !Array.isArray(dungeon.rooms)) return [];
  if (!Array.isArray(seeds) || seeds.length === 0) return [];

  const preferredRoomIds = Array.isArray(options.preferredRoomIds)
    ? options.preferredRoomIds.map(String)
    : [];

  // Index every kind of assignment into Sets keyed by room-id string.
  // Each indexing pass is defensive — the assignment fields can be
  // null / missing on freshly generated dungeons or on dungeons that
  // skipped a particular assignment call (logged + non-fatal in
  // map-store). String coercion handles the mixed-int / mixed-string
  // id state that exists in saved data.
  const assignedLoreRoomIds = new Set(
    Object.values(dungeon.loreAssignments?.lore_to_room || {}).map(String),
  );
  const assignedNPCRoomIds = new Set(
    Object.values(dungeon.npcAssignments?.npc_id_to_room || {}).map(String),
  );
  // Monster assignments map a monster id → ARRAY of room ids (the same
  // population can appear in multiple rooms). Flatten before set-building.
  const assignedMonsterRoomIds = new Set(
    Object.values(dungeon.monsterAssignments?.monster_id_to_rooms || {})
      .flat()
      .map(String),
  );
  const assignedItemRoomIds = new Set(
    Object.values(dungeon.itemAssignments?.item_to_room || {}).map(String),
  );

  function isEligible(room) {
    if (!room || room.id === undefined || room.id === null) return false;
    if (String(room.id) === String(originRoomId)) return false;
    if (!ELIGIBLE_HOST_TYPES.has(room.roomType)) return false;
    if (Array.isArray(room.contentArray) && room.contentArray.length > 0) return false;
    const key = String(room.id);
    if (assignedLoreRoomIds.has(key)) return false;
    if (assignedNPCRoomIds.has(key)) return false;
    if (assignedMonsterRoomIds.has(key)) return false;
    if (assignedItemRoomIds.has(key)) return false;
    return true;
  }

  // Eligible rooms in ascending area-id order — the default candidate pool.
  const eligibleSorted = dungeon.rooms
    .filter(isEligible)
    .sort((a, b) => Number(a.id) - Number(b.id));

  // Build the actual candidate list: preferred rooms first (in the
  // caller's order, deduped, eligible-only), then the remaining
  // eligible rooms by ascending area-id. The result is a single ordered
  // list — same selection logic ("first N candidates") applies after
  // either branch. Deterministic given the same dungeon + preferences.
  const preferredEligible = preferredRoomIds
    .map((pid) => eligibleSorted.find((r) => String(r.id) === pid))
    .filter(Boolean);
  const preferredIdSet = new Set(preferredEligible.map((r) => String(r.id)));
  const remainder = eligibleSorted.filter((r) => !preferredIdSet.has(String(r.id)));
  const candidates = [...preferredEligible, ...remainder];

  const placements = [];
  const limit = Math.min(seeds.length, candidates.length);
  for (let i = 0; i < limit; i++) {
    const room = candidates[i];
    const seed = seeds[i];
    const content = typeof seed?.content === 'string' ? seed.content.trim() : '';
    if (!content) continue;
    const entry = { content, originRoomId, kind };
    if (!Array.isArray(room.pendingContentSeeds)) {
      room.pendingContentSeeds = [];
    }
    room.pendingContentSeeds.push(entry);
    placements.push({ roomId: room.id, content, kind });
  }
  return placements;
}

/**
 * Pop and return the pending content seeds on a room, clearing the
 * array. Caller uses the return value to format the prompt block;
 * the cleared state means a re-generation of the same room won't
 * re-inject the seed. The seed is "consumed" once handed to the LLM.
 *
 * @param {Object} room - The host room.
 * @returns {Array<{content: string, originRoomId, kind: string}>} the seeds (possibly empty).
 */
export function consumePendingContentSeeds(room) {
  if (!room || !Array.isArray(room.pendingContentSeeds) || room.pendingContentSeeds.length === 0) {
    return [];
  }
  const seeds = room.pendingContentSeeds;
  room.pendingContentSeeds = [];
  return seeds;
}
