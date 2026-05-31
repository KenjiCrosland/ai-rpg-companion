/**
 * assign-npcs.mjs
 *
 * Parallel architecture to assign-lore-locations.mjs, but for NPCs.
 *
 * Problem this solves: the dungeon overview already extracts named
 * NPCs into `dungeon.npcs[]` (with npc_id, name, short_description).
 * But these NPCs aren't placed anywhere on the map — when individual
 * rooms generate, they don't know which NPCs should be IN them.
 * The result: rooms talk ABOUT characters from the overview ("Brother
 * Calanthir," "Warden Elenharion") but no formal NPC presence is
 * coded into any specific room, so the DM can't predict where the
 * party will encounter them.
 *
 * What this module does: runs a single LLM call AFTER map generation
 * (and after lore-location assignment) to match each NPC from
 * dungeon.npcs[] to the best-fit area on the map. The match is stored
 * on the dungeon record as `dungeon.npcAssignments` and passed into
 * subsequent room generation prompts so:
 *   - Each room knows which NPCs are present when it generates
 *   - The room prompt's existing npcString contract is fed
 *     automatically (no manual form step required)
 *   - The NPCs tab can show where each NPC is placed
 *
 * Phase 1 does NOT regenerate NPCs or mutate their data. It only
 * LABELS rooms with NPC presence. NPCs that don't fit any room
 * (external patrons, the dying messenger from the quest hook, etc.)
 * stay unassigned and the dungeon record carries the reason.
 *
 * Data shape on the dungeon record:
 *
 *   dungeon.npcAssignments = {
 *     rooms_to_npc_ids: { 12: ['npc_xxx'], 1: ['npc_yyy'] },
 *     npc_id_to_room:   { 'npc_xxx': 12, 'npc_yyy': 1 },
 *     unassigned:       [ { npc_id, npc_name, reason } ],
 *   }
 *
 * Type-compatibility table the LLM uses:
 *
 *   ┌─────────────────────────────────┬───────────────────────────┐
 *   │ NPC role                        │ Existing room type fit    │
 *   ├─────────────────────────────────┼───────────────────────────┤
 *   │ Dungeon's main antagonist /     │ boss                      │
 *   │   primary boss                  │                           │
 *   │ Specialist worker (smith,       │ purpose (matching craft)  │
 *   │   scribe, alchemist)            │                           │
 *   │ Faction member at rest /        │ living                    │
 *   │   off-duty                      │                           │
 *   │ Gate-keeper / sentry            │ entrance                  │
 *   │ Witness / captive / refugee     │ secret OR living          │
 *   │ Key-holder for a sealed door    │ key OR matching purpose   │
 *   │ Patron / quest-giver outside    │ unassigned (external)     │
 *   │   the dungeon                   │                           │
 *   │ Sub-boss / lieutenant           │ setback OR purpose        │
 *   └─────────────────────────────────┴───────────────────────────┘
 *
 *   When a lore-location was assigned to a room, NPCs tied to that
 *   lore-location prefer it (the Warden in the scriptorium beats
 *   the Warden in a generic boss room — assuming the scriptorium
 *   was lore-assigned to the boss room area).
 */

import { generateGptResponse } from '@/util/ai-client.mjs';
import { logger } from '@/util/logger.mjs';

/**
 * Format the NPCs list for the prompt.
 *
 * @param {Array<{npc_id: string, name: string, short_description: string}>} npcs
 * @returns {string}
 */
export function formatNPCsForPrompt(npcs) {
  if (!Array.isArray(npcs) || npcs.length === 0) return '(no NPCs to assign)';
  return npcs
    .map(npc => `- ${npc.npc_id}: ${npc.name} — ${npc.short_description || '(no description)'}`)
    .join('\n');
}

/**
 * Format the rooms list with both their mechanical types and (when
 * available) their assigned lore-location, so the LLM can match NPCs
 * against the room's narrative identity, not just the procedural
 * type.
 *
 * @param {Array} rooms
 * @param {object} loreAssignments — dungeon.loreAssignments shape
 * @returns {string}
 */
export function formatRoomsForNPCPrompt(rooms, loreAssignments) {
  if (!Array.isArray(rooms) || rooms.length === 0) return '(no rooms)';
  const roomsToLore = loreAssignments?.rooms_to_lore || {};
  return rooms
    .map((room) => {
      const type = room.roomType || 'untyped';
      const lore = roomsToLore[room.id]
        ? ` — lore: "${roomsToLore[room.id]}"`
        : '';
      return `- area ${room.id}: ${type}${lore}`;
    })
    .join('\n');
}

/**
 * Build the LLM prompt for NPC-to-room assignment.
 *
 * @param {string} dungeonOverview
 * @param {Array} rooms
 * @param {Array} npcs
 * @param {object} loreAssignments
 * @returns {string}
 */
export function buildNPCAssignmentPrompt(dungeonOverview, rooms, npcs, loreAssignments) {
  const roomsTable = formatRoomsForNPCPrompt(rooms, loreAssignments);
  const npcsTable = formatNPCsForPrompt(npcs);

  return `You are matching NAMED NPCs from a D&D 5e dungeon's overview to NUMBERED AREAS on its procedurally-generated map. The output drives room generation: when a room generates, it will receive its assigned NPCs as PRESENT IN THE ROOM. Place each NPC where they would most plausibly be when the party arrives.

## DUNGEON OVERVIEW
${dungeonOverview}

## DUNGEON MAP (existing areas, with lore-location assignments where known)
${roomsTable}

## NPCS TO PLACE
${npcsTable}

## TASK

For EACH NPC, choose ONE of:
A. Assign to a specific area on the map (the area where the party is most likely to encounter them)
B. Leave UNASSIGNED with a brief reason

Step 1 — For each NPC, infer their primary location based on their role described in the overview:
- Dungeon's main antagonist / primary boss → boss room
- Specialist worker (smith, scribe, alchemist, distiller, etc.) → purpose room of their craft
- Faction member at rest / off-duty / general inhabitant → living room
- Gate-keeper, bridge-warden, sentry → entrance
- Captive / refugee / witness / fugitive → secret room or living room (depending on whether they're hiding)
- Key-holder for a sealed door → either the key room, or a purpose/living room matching their role
- Sub-boss / lieutenant → setback room, OR the purpose room of their role
- Patron / quest-giver / messenger external to the dungeon → UNASSIGNED (they're outside the dungeon)
- Dead / departed / historical figure mentioned only in lore → UNASSIGNED (they're not present in play)

Step 2 — When a room has a LORE assignment (shown above), prefer placing an NPC there if the NPC's role aligns with that lore-location's character. The Warden of an order is most plausibly in the scriptorium-assigned area; the bridge-warden is most plausibly at the entrance area. Mechanical room type is the fallback when no lore assignment guides the placement.

Step 3 — Each NPC maps to AT MOST one area. An area MAY hold multiple NPCs (a guard captain and a sleeping squad-mate). Don't force assignments; if an NPC genuinely belongs outside the dungeon, leave them unassigned.

## OUTPUT FORMAT

Return STRICT JSON (no prose, no commentary, no code fences):

{
  "assignments": [
    {
      "npc_id": "npc_xxx",
      "npc_name": "Warden Elenharion",
      "area_id": 12,
      "reason": "boss room is lore-assigned to the scriptorium; the Warden sleeps there with the key"
    },
    {
      "npc_id": "npc_yyy",
      "npc_name": "Brother Calanthir",
      "area_id": 1,
      "reason": "bridge-warden role fits the entrance area"
    }
  ],
  "unassigned": [
    {
      "npc_id": "npc_zzz",
      "npc_name": "Arienwë",
      "reason": "College patron outside the dungeon; quest-giver in town, not present in play"
    }
  ]
}

If there are no NPCs to assign, return empty arrays for both keys.`;
}

/**
 * Validate the LLM response shape.
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
export function validateNPCAssignmentResponse(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    if (!Array.isArray(data.assignments)) return false;
    if (!Array.isArray(data.unassigned)) return false;
    for (const a of data.assignments) {
      if (typeof a.npc_id !== 'string' || !a.npc_id.trim()) return false;
      if (typeof a.area_id !== 'number') return false;
      if (typeof a.reason !== 'string') return false;
    }
    for (const u of data.unassigned) {
      if (typeof u.npc_id !== 'string' || !u.npc_id.trim()) return false;
      if (typeof u.reason !== 'string') return false;
    }
    return true;
  } catch (e) {
    logger.error('Invalid JSON:', e);
    return false;
  }
}

/**
 * Run the assignment call.
 *
 * Returns null if the assignment call fails — caller treats absence
 * of npcAssignments as "no auto-assignment; NPCs only appear in rooms
 * when the user manually picks them via the form."
 *
 * @param {object} args
 * @param {string} args.dungeonOverview
 * @param {Array}  args.rooms
 * @param {Array}  args.npcs — dungeon.npcs array
 * @param {object} [args.loreAssignments] — dungeon.loreAssignments (optional)
 * @returns {Promise<{rooms_to_npc_ids: object, npc_id_to_room: object, unassigned: Array}|null>}
 */
export async function assignNPCs({
  dungeonOverview,
  rooms,
  npcs,
  loreAssignments = null,
}) {
  if (!dungeonOverview || !Array.isArray(rooms) || rooms.length === 0) return null;
  if (!Array.isArray(npcs) || npcs.length === 0) return null;

  const prompt = buildNPCAssignmentPrompt(dungeonOverview, rooms, npcs, loreAssignments);

  let response;
  try {
    response = await generateGptResponse(prompt, validateNPCAssignmentResponse);
  } catch (err) {
    logger.error('NPC assignment call failed:', err);
    return null;
  }

  let parsed;
  try {
    parsed = JSON.parse(response);
  } catch (err) {
    logger.error('NPC assignment response was unparseable:', err);
    return null;
  }

  const rooms_to_npc_ids = {};
  const npc_id_to_room = {};
  const validAreaIds = new Set(rooms.map((r) => r.id));
  const validNPCIds = new Set(npcs.map((n) => n.npc_id));

  for (const a of parsed.assignments) {
    if (!validAreaIds.has(a.area_id)) {
      logger.warn(`NPC-assignment for ${a.npc_id} pointed at non-existent area ${a.area_id}; dropping`);
      continue;
    }
    if (!validNPCIds.has(a.npc_id)) {
      logger.warn(`NPC-assignment for ${a.npc_id} references unknown npc; dropping`);
      continue;
    }
    if (npc_id_to_room[a.npc_id]) {
      logger.warn(`NPC ${a.npc_id} already assigned to area ${npc_id_to_room[a.npc_id]}; dropping duplicate`);
      continue;
    }
    if (!rooms_to_npc_ids[a.area_id]) rooms_to_npc_ids[a.area_id] = [];
    rooms_to_npc_ids[a.area_id].push(a.npc_id);
    npc_id_to_room[a.npc_id] = a.area_id;
  }

  return {
    rooms_to_npc_ids,
    npc_id_to_room,
    unassigned: parsed.unassigned || [],
  };
}

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

/**
 * Get the npc_ids assigned to a given room. Returns empty array if
 * no NPCs are assigned or assignments are missing.
 *
 * @param {object} dungeon
 * @param {number} roomId
 * @returns {string[]}
 */
export function getRoomNPCIds(dungeon, roomId) {
  return dungeon?.npcAssignments?.rooms_to_npc_ids?.[roomId] || [];
}

/**
 * Build the npc_string for a room — concatenated description of all
 * NPCs assigned to that room, used by the room-prompt's npcString
 * parameter. Falls back to name + short_description when an NPC stub
 * hasn't yet been fully elaborated via the NPCs tab.
 *
 * Returns empty string when no NPCs are assigned to the room.
 *
 * @param {object} dungeon
 * @param {number} roomId
 * @returns {string}
 */
export function formatRoomNPCsForPrompt(dungeon, roomId) {
  const npcIds = getRoomNPCIds(dungeon, roomId);
  if (npcIds.length === 0) return '';
  if (!Array.isArray(dungeon?.npcs)) return '';

  const npcStrings = npcIds
    .map((id) => {
      const npc = dungeon.npcs.find((n) => n.npc_id === id);
      if (!npc) return null;
      // If the NPC has been fully generated, use its npc_string (which
      // contains the rich rendered description). Otherwise fall back to
      // the stub's name + short_description — enough for the room
      // prompt to incorporate the NPC's presence.
      if (npc.npc_string) return npc.npc_string;
      return `${npc.name} — ${npc.short_description || '(no description)'}`;
    })
    .filter(Boolean);

  return npcStrings.join('\n\n');
}
