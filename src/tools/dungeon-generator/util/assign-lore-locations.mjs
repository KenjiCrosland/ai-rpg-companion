/**
 * assign-lore-locations.mjs
 *
 * Phase 1 of the lore-to-map coherence layer.
 *
 * Problem this solves: the dungeon overview's prose mentions named
 * places ("the inner chamber," "the midden-chamber," "the
 * sulfur-vents") that are conceptual references in the lore but do
 * not correspond to specific numbered areas on the procedurally-
 * generated map. When individual room prompts later try to
 * cross-reference these places ("a route to the midden-chamber"),
 * the destinations don't resolve to actual rooms and the DM has to
 * retrofit at the table.
 *
 * What this module does: runs a single LLM call AFTER map generation
 * to match each named lore-location in the overview to the best-fit
 * existing area on the map. The match is stored on the dungeon
 * record as `dungeon.loreAssignments` and passed into subsequent
 * room generation prompts so:
 *   - Each room knows its lore-role (if any) when it generates
 *   - Cross-references in dm_notes can resolve "the inner chamber"
 *     to "area 12" — actionable navigation, not lore handwave
 *
 * Phase 1 does NOT mutate the map. It only LABELS existing rooms
 * with lore-roles. If a lore-location has no compatible area on the
 * map (no room with a fitting type), it stays unassigned and falls
 * back to the prompt-side CROSS-REFERENCE FIDELITY rule. Phase 2
 * would add map mutation (insertions, reassignments) but is out of
 * scope here.
 *
 * Data shape on the dungeon record:
 *
 *   dungeon.loreAssignments = {
 *     rooms_to_lore: { 7: 'the midden-chamber', 12: 'the inner chamber' },
 *     lore_to_rooms: { 'the midden-chamber': 7, 'the inner chamber': 12 },
 *     unassigned:    [ { lore_name: 'the outer tunnels',
 *                        reason: 'refers to a group of areas, not a single one' } ],
 *   }
 *
 * Type-compatibility table the LLM is asked to use:
 *
 *   ┌──────────────────────┬─────────────────────────────────────────────┐
 *   │ Lore archetype       │ Existing room type fit                      │
 *   ├──────────────────────┼─────────────────────────────────────────────┤
 *   │ terminal / sanctum   │ boss                                        │
 *   │ deadly / midden /    │ setback                                     │
 *   │   ossuary / trap     │                                             │
 *   │ transit / vent /     │ connecting                                  │
 *   │   tunnel             │                                             │
 *   │ inhabited / camp /   │ living                                      │
 *   │   den / hall         │                                             │
 *   │ functional / forge / │ purpose                                     │
 *   │   library / lab      │                                             │
 *   │ hidden vault         │ secret (only if lore explicitly hidden)     │
 *   │ sealed treasury      │ locked (only if lore explicitly sealed)     │
 *   │ entrance / threshold │ entrance (room 1 by convention)             │
 *   └──────────────────────┴─────────────────────────────────────────────┘
 *
 * The key / locked / secret types are MECHANICALLY rigid in the
 * dungeon system — their behavior depends on the type. The LLM is
 * told to avoid reassigning them unless the lore explicitly aligns.
 */

import { generateGptResponse } from '@/util/ai-client.mjs';
import { logger } from '@/util/logger.mjs';

/**
 * Build a compact representation of the map for prompt injection.
 * Each line is one area with its mechanical type and its connected
 * areas. The model uses this to understand topology and type fit.
 *
 * @param {Array<{id: number, roomType?: string, doorways?: Array}>} rooms
 * @returns {string}
 */
export function formatRoomsForPrompt(rooms) {
  if (!Array.isArray(rooms) || rooms.length === 0) return '(no rooms)';
  return rooms
    .map((room) => {
      const type = room.roomType || 'untyped';
      const connections = (room.doorways || [])
        .map((d) => d.connectedRoomId)
        .filter((id) => id != null)
        .sort((a, b) => a - b)
        .join(', ');
      return `- area ${room.id}: ${type}${connections ? `, connects to [${connections}]` : ''}`;
    })
    .join('\n');
}

/**
 * Build the LLM prompt for lore-location assignment.
 *
 * @param {string} dungeonOverview — the overview prose (combined or string form)
 * @param {Array} rooms — the dungeon's rooms array
 * @returns {string}
 */
export function buildLoreAssignmentPrompt(dungeonOverview, rooms) {
  const roomsTable = formatRoomsForPrompt(rooms);

  return `You are matching NAMED LORE-LOCATIONS from a D&D 5e dungeon's overview prose to NUMBERED AREAS on its procedurally-generated map. The output drives cross-reference resolution: when a later room mentions "the inner chamber," the system needs to know that means area 12 on this specific map.

## DUNGEON OVERVIEW
${dungeonOverview}

## DUNGEON MAP (existing areas)
${roomsTable}

## TASK

Step 1 — Identify EVERY named lore-location in the overview that refers to a SPECIFIC place within this dungeon.
- INCLUDE specific places named in the prose: "the inner chamber," "the collapsed chimney," "the midden-chamber," "the sulfur-vents," "the ore-sorting hall," "the threshold chamber," etc.
- EXCLUDE external locations (towns, mountains, regions outside the dungeon — they aren't on this map).
- EXCLUDE vague non-specific spaces ("the deeper tunnels," "elsewhere in the burrow") that don't name a single navigable place.
- EXCLUDE faction names that aren't tied to a specific area ("the Tyrr-Ash war-band" is people, not a place; "the war-band's ore-sorting hall" IS a place).

Step 2 — For each lore-location, infer the BEST AREA on the map based on type compatibility.

Type-compatibility table:
- TERMINAL / SANCTUM / inner-chamber / throne-hall lore → best fit: boss room
- DEADLY / midden / ossuary / killing-floor / trapped lore → best fit: setback room
- TRANSIT / vent / tunnel / corridor lore → best fit: connecting room
- INHABITED / camp / den / barracks / hall lore → best fit: living room
- FUNCTIONAL / forge / library / lab / kitchen lore → best fit: purpose room
- HIDDEN VAULT lore (only if explicitly described as hidden) → best fit: secret room
- SEALED TREASURY lore (only if explicitly described as sealed/locked) → best fit: locked room
- THRESHOLD / entry-cavern lore → best fit: entrance (typically area 1)

Mechanical rigidity rule:
- The room types key, locked, and secret are MECHANICALLY rigid — the dungeon system relies on them for specific behavior. AVOID assigning lore to these rooms unless the lore explicitly aligns (a hidden vault → secret; a sealed treasury → locked; a key chamber that holds the means to open something → key).
- The types boss, setback, connecting, living, purpose are NARRATIVELY flexible — assign lore freely to these based on best fit.
- The entrance type is fixed to area 1 (or whichever room is the entrance).

Matching rule:
- Each lore-location maps to AT MOST one area; each area receives AT MOST one lore-location.
- If multiple lore-locations compete for the same best-fit area, pick the one with the strongest narrative weight (the lore-location most central to the dungeon's stakes) and leave the others unassigned.
- If no compatible area exists for a lore-location, leave it unassigned. Do NOT force a bad fit.

Step 3 — Output the matches and the unassigned list with brief reasons.

## OUTPUT FORMAT

Return STRICT JSON (no prose, no commentary, no code fences):

{
  "assignments": [
    {
      "lore_name": "the midden-chamber",
      "area_id": 7,
      "reason": "setback room fits the deadly/refuse role of a midden"
    },
    {
      "lore_name": "the inner chamber",
      "area_id": 12,
      "reason": "boss room is the terminal sanctum the lore points at"
    }
  ],
  "unassigned": [
    {
      "lore_name": "the outer tunnels",
      "reason": "refers to a group of connecting areas as a class, not a single named area"
    }
  ]
}

If there are no named lore-locations to assign, return empty arrays for both keys.`;
}

/**
 * Validate the LLM response shape for the assignment call.
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
export function validateLoreAssignmentResponse(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    if (!Array.isArray(data.assignments)) {
      logger.error('assignments must be an array');
      return false;
    }
    if (!Array.isArray(data.unassigned)) {
      logger.error('unassigned must be an array');
      return false;
    }
    for (const a of data.assignments) {
      if (typeof a.lore_name !== 'string' || !a.lore_name.trim()) return false;
      if (typeof a.area_id !== 'number') return false;
      if (typeof a.reason !== 'string') return false;
    }
    for (const u of data.unassigned) {
      if (typeof u.lore_name !== 'string' || !u.lore_name.trim()) return false;
      if (typeof u.reason !== 'string') return false;
    }
    return true;
  } catch (e) {
    logger.error('Invalid JSON:', e);
    return false;
  }
}

/**
 * Run the assignment call. Returns the canonical loreAssignments
 * shape to be stored on the dungeon record.
 *
 * Returns null if the assignment call fails — caller should treat
 * absence of loreAssignments as "no assignments available; rely on
 * prompt-side CROSS-REFERENCE FIDELITY rule." This is the graceful
 * fallback path.
 *
 * @param {object} args
 * @param {string} args.dungeonOverview — overview prose
 * @param {Array}  args.rooms — dungeon's rooms array
 * @returns {Promise<{rooms_to_lore: object, lore_to_rooms: object, unassigned: Array}|null>}
 */
export async function assignLoreLocations({ dungeonOverview, rooms }) {
  if (!dungeonOverview || !Array.isArray(rooms) || rooms.length === 0) {
    return null;
  }

  const prompt = buildLoreAssignmentPrompt(dungeonOverview, rooms);

  let response;
  try {
    response = await generateGptResponse(prompt, validateLoreAssignmentResponse);
  } catch (err) {
    logger.error('Lore assignment call failed:', err);
    return null;
  }

  let parsed;
  try {
    parsed = JSON.parse(response);
  } catch (err) {
    logger.error('Lore assignment response was unparseable:', err);
    return null;
  }

  const rooms_to_lore = {};
  const lore_to_rooms = {};
  const validAreaIds = new Set(rooms.map((r) => r.id));

  for (const assignment of parsed.assignments) {
    // Defense: skip assignments to area IDs that aren't in the actual map.
    if (!validAreaIds.has(assignment.area_id)) {
      logger.warn(
        `Lore-assignment for "${assignment.lore_name}" pointed at non-existent area ${assignment.area_id}; dropping`,
      );
      continue;
    }
    // Defense: skip if the area is already taken (each area gets one).
    if (rooms_to_lore[assignment.area_id]) {
      logger.warn(
        `Area ${assignment.area_id} already assigned to "${rooms_to_lore[assignment.area_id]}"; dropping duplicate for "${assignment.lore_name}"`,
      );
      continue;
    }
    rooms_to_lore[assignment.area_id] = assignment.lore_name;
    lore_to_rooms[assignment.lore_name] = assignment.area_id;
  }

  return {
    rooms_to_lore,
    lore_to_rooms,
    unassigned: parsed.unassigned || [],
  };
}

// ---------------------------------------------------------------------------
// Lookup helpers — used by room generation prompts to inject context.
// ---------------------------------------------------------------------------

/**
 * Get the lore-location name assigned to a given room, if any.
 * Returns null when the room has no assignment.
 *
 * @param {object} dungeon
 * @param {number} roomId
 * @returns {string|null}
 */
export function getRoomLoreName(dungeon, roomId) {
  return dungeon?.loreAssignments?.rooms_to_lore?.[roomId] || null;
}

/**
 * Get the area number assigned to a given lore-location name, if any.
 * Returns null when the lore name is unassigned.
 *
 * @param {object} dungeon
 * @param {string} loreName
 * @returns {number|null}
 */
export function getLoreAreaNumber(dungeon, loreName) {
  return dungeon?.loreAssignments?.lore_to_rooms?.[loreName] ?? null;
}

/**
 * Format the lore-location lookup table for prompt injection. The
 * room prompts append this to their dungeon-context section so the
 * model can resolve cross-references like "the inner chamber" to
 * "area 12."
 *
 * Empty string when no assignments exist — the prompt-side
 * CROSS-REFERENCE FIDELITY rule still applies as a fallback.
 *
 * @param {object} dungeon
 * @returns {string}
 */
export function formatLoreLookupForPrompt(dungeon) {
  const lookup = dungeon?.loreAssignments?.lore_to_rooms;
  if (!lookup || Object.keys(lookup).length === 0) return '';

  const entries = Object.entries(lookup)
    .sort(([, a], [, b]) => a - b)
    .map(([name, area]) => `- "${name}" = area ${area}`)
    .join('\n');

  return `\nLORE-LOCATION LOOKUP (use these area numbers when referencing the overview's named places — these are the canonical area assignments):
${entries}
`;
}
