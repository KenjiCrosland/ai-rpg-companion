/**
 * assign-items.mjs
 *
 * Parallel architecture to assign-npcs.mjs and assign-monsters.mjs, but
 * for featured items. When a dungeon is seeded from an item (or has
 * `inspired_by_item` edges in the cross-tool reference graph), this
 * module decides which room on the procedurally-generated map holds
 * each item. The chosen room's prompt then receives the item's full
 * properties verbatim — so room generation reproduces the actual item
 * card instead of inventing one.
 *
 * Why not always place in the boss room? Items aren't always the final
 * prize. The overview's lore may treat the item as something picked up
 * incidentally — a relic left on an altar, a tool stashed in a
 * scriptorium, a weapon abandoned on a setback floor. The LLM placement
 * call reads the overview and decides per lore.
 *
 * Why not just pass the item to every room prompt? It primes the model
 * to fit the item in wherever the room happens to be a thematic match,
 * which means the item shows up in two or three rooms (or the wrong
 * one) instead of exactly one.
 *
 * Data shape on the dungeon record:
 *
 *   dungeon.itemAssignments = {
 *     rooms_to_item_names: { 7: ['Lyutiputra-Straik'], 12: [...] },
 *     item_name_to_room:   { 'Lyutiputra-Straik': 7 },
 *     unassigned:          [ { item_name, reason } ],
 *   }
 *
 * Each item lands in EXACTLY ONE room (or unassigned). Unlike monsters,
 * items don't spread.
 *
 * Placement avoidance rules:
 *   - ENTRANCE: typically too early. Allowed only when the lore
 *     explicitly stages the item at the threshold (e.g., a guardian
 *     holds it out, an old caretaker offers it).
 *   - CONNECTING ROOMS: transit space. Items can land here when the
 *     lore frames it as something abandoned mid-journey, but this is
 *     the exception, not the default.
 *   - REQUIRES-KEY (obstacle/divider) ROOMS: the room IS the obstacle.
 *     Adding an item here muddles the encounter; place items in the
 *     rooms BEYOND or BESIDE the obstacle instead.
 *
 * Lore-driven priority:
 *   1. If overview names a specific room or room-feature where the item
 *      lives → place there.
 *   2. If overview names the boss room as the item's location ("guarded
 *      by the Still-Wind") → boss room.
 *   3. If overview frames the item as an incidental pickup → setback,
 *      living, purpose, or secret room — choose the thematic best fit.
 *   4. Default → boss room (safest fallback for unknown placement).
 */

import { generateGptResponse } from '@/util/ai-client.mjs';

/**
 * Format an item summary for the placement prompt. Just enough for the
 * LLM to make a thematic decision — name, type, rarity, one-line
 * descriptor. The FULL item card is reserved for room-gen-time
 * injection in the chosen room only.
 *
 * @param {Array<object>} items
 * @returns {string}
 */
export function formatItemsForPrompt(items) {
  if (!Array.isArray(items) || items.length === 0) return '(no items to assign)';
  return items
    .map((item) => {
      const type = item.item_type || 'item';
      const rarity = item.rarity ? `, ${item.rarity}` : '';
      const desc = (item.physical_description || '').trim();
      const shortDesc = desc ? ` — ${desc.split('.')[0]}.` : '';
      return `- "${item.name}" (${type}${rarity})${shortDesc}`;
    })
    .join('\n');
}

/**
 * Format the rooms list with their mechanical types and short
 * descriptions, so the LLM can match items against the room's
 * narrative context.
 *
 * @param {Array} rooms
 * @returns {string}
 */
export function formatRoomsForItemPrompt(rooms) {
  if (!Array.isArray(rooms) || rooms.length === 0) return '(no rooms)';
  return rooms
    .map((room) => {
      const type = room.roomType || 'untyped';
      const flags = [];
      if (room.requiresKey) flags.push('REQUIRES-KEY (obstacle/divider)');
      if (room.hasKeyForRoomId) flags.push(`HAS-KEY-FOR area ${room.hasKeyForRoomId}`);
      const flagsLine = flags.length ? ` — flags: [${flags.join('; ')}]` : '';
      const short = room.shortDescription
        ? ` — "${room.shortDescription.split('.')[0]}."`
        : '';
      return `- area ${room.id}: ${type}${flagsLine}${short}`;
    })
    .join('\n');
}

/**
 * Build the LLM prompt for item-to-room placement.
 *
 * @param {string} dungeonOverview
 * @param {Array} rooms
 * @param {Array} items
 * @returns {string}
 */
export function buildItemAssignmentPrompt(dungeonOverview, rooms, items) {
  const roomsTable = formatRoomsForItemPrompt(rooms);
  const itemsTable = formatItemsForPrompt(items);

  return `You are placing FEATURED ITEMS into NUMBERED AREAS on a procedurally-generated dungeon map. Each item lands in EXACTLY ONE room. The chosen room's generation will then reproduce the item's full mechanical properties verbatim — so this placement decision is about WHERE in the dungeon the lore places the item.

## DUNGEON OVERVIEW
${dungeonOverview}

## DUNGEON MAP
${roomsTable}

## ITEMS TO PLACE
${itemsTable}

## TASK

For EACH item, choose ONE of:
A. Assign to exactly ONE area_id (single room — items do not spread)
B. Leave UNASSIGNED with a brief reason (rare — most items belong somewhere)

Placement priority (read the OVERVIEW carefully):

1. LORE NAMES THE LOCATION. If the overview specifies a room, feature, or guardian that holds the item ("the staff lies in the inner sanctum," "the Still-Wind guards the relic," "Khalima carries the locket"), place the item in that room.

2. CENTRAL TO THE BOSS ENCOUNTER. If the overview frames the item as the final prize — guarded by the boss, central to the dungeon's purpose — place it in the BOSS ROOM.

3. INCIDENTAL PICKUP. If the overview frames the item as something the party finds along the way (left behind by a fled scribe, stashed in a workroom, abandoned on a trap-room floor), choose a thematically-appropriate room: purpose, living, setback, key, or secret. Match the item's character to the room's character.

4. UNKNOWN PLACEMENT. If the overview gives no clear signal, default to the BOSS ROOM as the safest placement.

## AVOIDANCE RULES

The following placements are WRONG by default — only place there when the lore explicitly demands it:

- ENTRANCE: the party hasn't earned the item yet. Allowed only when the lore stages it at the threshold (a caretaker holds it out, an offering at the door). Otherwise place elsewhere.
- CONNECTING ROOMS: transit space, not loot spaces. Allowed only when the lore frames the item as abandoned mid-journey. Otherwise place in a keyed room.
- REQUIRES-KEY (obstacle/divider) rooms: the room IS the obstacle. Items placed here muddle the encounter. Place the item in the rooms BEYOND (the room the obstacle gates entry to) or BESIDE (the key-room that holds the obstacle's solution) instead.

## OUTPUT FORMAT

Return STRICT JSON (no prose, no commentary, no code fences):

{
  "assignments": [
    {
      "item_name": "Lyutiputra-Straik",
      "area_id": 13,
      "reason": "overview names the Still-Wind as the staff's guardian; boss room placement"
    }
  ],
  "unassigned": [
    {
      "item_name": "Old Lantern",
      "reason": "overview frames item as backstory only, not present in the dungeon"
    }
  ]
}

If there are no items to assign, return empty arrays for both keys.`;
}

/**
 * Validate the LLM response shape.
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
export function validateItemAssignmentResponse(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    if (!Array.isArray(data.assignments)) return false;
    if (!Array.isArray(data.unassigned)) return false;
    for (const a of data.assignments) {
      if (typeof a.item_name !== 'string' || !a.item_name.trim()) return false;
      if (typeof a.area_id !== 'number') return false;
      if (typeof a.reason !== 'string') return false;
    }
    for (const u of data.unassigned) {
      if (typeof u.item_name !== 'string' || !u.item_name.trim()) return false;
      if (typeof u.reason !== 'string') return false;
    }
    return true;
  } catch (e) {
    console.error('Invalid JSON:', e);
    return false;
  }
}

/**
 * Run the item-placement assignment call.
 *
 * @param {object} args
 * @param {string} args.dungeonOverview
 * @param {Array}  args.rooms
 * @param {Array}  args.items
 * @returns {Promise<{rooms_to_item_names: object, item_name_to_room: object, unassigned: Array}|null>}
 */
export async function assignItems({ dungeonOverview, rooms, items }) {
  if (!dungeonOverview || !Array.isArray(rooms) || rooms.length === 0) return null;
  if (!Array.isArray(items) || items.length === 0) return null;

  const prompt = buildItemAssignmentPrompt(dungeonOverview, rooms, items);

  let response;
  try {
    response = await generateGptResponse(prompt, validateItemAssignmentResponse);
  } catch (err) {
    console.error('Item assignment call failed:', err);
    return null;
  }

  let parsed;
  try {
    parsed = JSON.parse(response);
  } catch (err) {
    console.error('Item assignment response was unparseable:', err);
    return null;
  }

  const rooms_to_item_names = {};
  const item_name_to_room = {};
  const validAreaIds = new Set(rooms.map(r => r.id));
  const validItemNames = new Set(items.map(i => i.name));

  for (const a of parsed.assignments) {
    if (!validItemNames.has(a.item_name)) {
      console.warn(`Item-assignment for "${a.item_name}" references unknown item; dropping`);
      continue;
    }
    if (!validAreaIds.has(a.area_id)) {
      console.warn(`Item-assignment for "${a.item_name}" pointed at invalid area ${a.area_id}; dropping`);
      continue;
    }
    item_name_to_room[a.item_name] = a.area_id;
    if (!rooms_to_item_names[a.area_id]) rooms_to_item_names[a.area_id] = [];
    rooms_to_item_names[a.area_id].push(a.item_name);
  }

  return {
    rooms_to_item_names,
    item_name_to_room,
    unassigned: parsed.unassigned || [],
  };
}

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

/**
 * Get the item names assigned to a given room. Returns empty array
 * if no items are assigned or assignments are missing.
 *
 * @param {object} dungeon
 * @param {number} roomId
 * @returns {string[]}
 */
export function getRoomItemNames(dungeon, roomId) {
  return dungeon?.itemAssignments?.rooms_to_item_names?.[roomId] || [];
}
