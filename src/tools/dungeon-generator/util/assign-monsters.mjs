/**
 * assign-monsters.mjs
 *
 * Parallel architecture to assign-npcs.mjs, but for monster
 * populations. The dungeon overview produces `dungeon.monsters[]`
 * with three entries (minion / strong_minion / large_creature). This
 * module places each of those populations into one or more rooms on
 * the map, so room generation knows which creatures are present.
 *
 * Difference from NPC assignment: monsters can populate MULTIPLE
 * rooms (a minion population spreads across patrol routes and nests),
 * whereas NPCs are individuals placed in one room.
 *
 * Data shape on the dungeon record:
 *
 *   dungeon.monsterAssignments = {
 *     rooms_to_monster_ids: { 7: ['mid_xxx', 'mid_yyy'], 12: ['mid_zzz'] },
 *     monster_id_to_rooms:  { 'mid_xxx': [7, 8],
 *                             'mid_yyy': [7],
 *                             'mid_zzz': [12] },
 *     unassigned:           [ { monster_id, monster_name, reason } ],
 *   }
 *
 * Type-compatibility table the LLM uses:
 *
 *   ┌─────────────────────────┬─────────────────────────────────────┐
 *   │ Monster tier            │ Room type fits                      │
 *   ├─────────────────────────┼─────────────────────────────────────┤
 *   │ apex (large_creature)   │ boss room (when boss is bestial,    │
 *   │                         │   not a named NPC) — single area    │
 *   │                         │ OR setback (apex roams) — single    │
 *   │ strong_minion           │ setback (combat encounter); near-   │
 *   │ (lieutenant tier)       │   boss living (lieutenant lairs);   │
 *   │                         │   guarding key/locked rooms         │
 *   │                         │ — typically 1-2 areas               │
 *   │ minion (basic tier)     │ living rooms (their nest/warren);   │
 *   │                         │ connecting rooms (patrol routes);   │
 *   │                         │ setback rooms (ambush sites)        │
 *   │                         │ — typically 2-4 areas               │
 *   └─────────────────────────┴─────────────────────────────────────┘
 *
 * Avoid placing minions/strong_minions in: entrance (unless lore-
 * justified — guards), secret rooms (those are payoffs), boss room
 * (the boss has their own monster presence).
 *
 * If a named-NPC boss occupies the boss room, the apex (large_creature)
 * typically goes to a setback room as a "roaming apex" the party meets
 * mid-dungeon, NOT the boss room. The boss room is for the NPC.
 */

import { generateGptResponse } from '@/util/ai-client.mjs';

/**
 * Format the monsters list for the prompt. Each monster gets its
 * tier (minion/strong_minion/large_creature) so the LLM can apply
 * type-compatibility rules.
 *
 * @param {Array<{id: string, type: string, name: string, description?: string}>} monsters
 * @returns {string}
 */
export function formatMonstersForPrompt(monsters) {
  if (!Array.isArray(monsters) || monsters.length === 0) return '(no monsters to assign)';
  return monsters
    .map(m => `- ${m.id} [${m.type || 'unknown tier'}]: ${m.name} — ${m.description || '(no description)'}`)
    .join('\n');
}

/**
 * Format the rooms list with their mechanical types, flags, and
 * (when available) their assigned lore and NPC, so the LLM can match
 * monsters against the room's full narrative AND structural context.
 *
 * Two flags worth surfacing to the LLM:
 *   - `requiresKey: true` — this is the obstacle/divider room. The
 *     party solves it by finding the key from elsewhere; placing an
 *     apex here makes the obstacle into a combat-or-die encounter,
 *     which is wrong pacing.
 *   - `hasKeyForRoomId: <id>` — this is the key room for some other
 *     obstacle. The party comes here to acquire the key; placing an
 *     apex here forces a brutal fight at a mandatory pickup point.
 *
 * @param {Array} rooms
 * @param {object} loreAssignments
 * @param {object} npcAssignments
 * @param {Array} npcs — dungeon.npcs (for name lookup in the room table)
 * @returns {string}
 */
export function formatRoomsForMonsterPrompt(rooms, loreAssignments, npcAssignments, npcs) {
  if (!Array.isArray(rooms) || rooms.length === 0) return '(no rooms)';
  const roomsToLore = loreAssignments?.rooms_to_lore || {};
  const roomsToNPCs = npcAssignments?.rooms_to_npc_ids || {};
  const npcNameLookup = Object.fromEntries(
    (Array.isArray(npcs) ? npcs : []).map(n => [n.npc_id, n.name]),
  );
  return rooms
    .map((room) => {
      const type = room.roomType || 'untyped';
      const flags = [];
      if (room.requiresKey) flags.push('REQUIRES-KEY (obstacle/divider — party solves by finding key)');
      if (room.hasKeyForRoomId) flags.push(`HAS-KEY-FOR area ${room.hasKeyForRoomId}`);
      const flagsLine = flags.length ? ` — flags: [${flags.join('; ')}]` : '';
      const lore = roomsToLore[room.id] ? ` — lore: "${roomsToLore[room.id]}"` : '';
      const npcsHere = roomsToNPCs[room.id] || [];
      const npcLine = npcsHere.length
        ? ` — NPCs: [${npcsHere.map(id => npcNameLookup[id] || id).join(', ')}]`
        : '';
      return `- area ${room.id}: ${type}${flagsLine}${lore}${npcLine}`;
    })
    .join('\n');
}

/**
 * Build the LLM prompt for monster-to-room assignment.
 *
 * @param {string} dungeonOverview
 * @param {Array} rooms
 * @param {Array} monsters
 * @param {object} npcAssignments
 * @param {object} loreAssignments
 * @param {Array} npcs
 * @returns {string}
 */
export function buildMonsterAssignmentPrompt(
  dungeonOverview,
  rooms,
  monsters,
  npcAssignments,
  loreAssignments,
  npcs,
) {
  const roomsTable = formatRoomsForMonsterPrompt(rooms, loreAssignments, npcAssignments, npcs);
  const monstersTable = formatMonstersForPrompt(monsters);

  return `You are placing MONSTER POPULATIONS from a D&D 5e dungeon's overview into NUMBERED AREAS on its procedurally-generated map. The output drives room generation: rooms will receive their assigned monster populations as present in the room. Place each monster tier where its population would most plausibly live/patrol/lair.

## DUNGEON OVERVIEW
${dungeonOverview}

## DUNGEON MAP (with lore and NPC assignments where known)
${roomsTable}

## MONSTERS TO PLACE
${monstersTable}

## TASK

For EACH monster, choose ONE of:
A. Assign to one or more areas (multiple areas allowed for populations that spread)
B. Leave UNASSIGNED with a brief reason (rare — most monsters belong somewhere)

Tier-compatibility table:

- LARGE_CREATURE (apex): typically ONE area, either:
  - the boss room (when no named-NPC boss occupies it), OR
  - a SINGLE late-dungeon setback room (when a named NPC IS the boss; the apex becomes a roaming threat the party meets after they've earned the encounter)
- STRONG_MINION (lieutenant tier): typically 1-2 areas. Setback rooms, locked rooms (as guards), rooms adjacent to the boss area. Lieutenant-tier creatures organize and direct — they need a place to plant themselves.
- MINION (basic tier): typically 2-4 areas. Living rooms (their nest/warren), connecting rooms (patrol routes), setback rooms (ambush sites). Populations spread across multiple chambers.

Apex placement is CRITICAL. The apex is the dungeon's load-bearing combat threat — it gets ONE ROOM TO ITSELF. No co-tenants:
- No co-tenant NPCs in the apex's room (the apex IS the room's identity; sharing dilutes it)
- No co-tenant minions or strong_minions in the apex's room (the apex is one encounter; layering minions on top is unfair pacing)

The apex's correct positions, in priority order:
1. The BOSS ROOM, when no named-NPC boss occupies it (the apex IS the boss).
2. A HAS-KEY-FOR room (key room), when the key is something the apex guards or — more evocatively — when a part of the apex (a tooth, a horn, a scale, a shed feather, a venom-sac) IS the key. This is a strong design pattern: defeating the apex yields the means to bypass an obstacle elsewhere.
3. A SETBACK ROOM, as a creature-ambush setback. (Note: trap or environmental hazard setbacks are PREFERRED for variety; the apex should go to a setback only when no boss/key-room placement fits, or when the dungeon's central conflict points the apex to a specific lair the party visits along the way.)
4. A thematic LIVING or PURPOSE room ONLY when the dungeon's central conflict makes that room the apex's lair (a sleeping-dragon's hoard-chamber, a brood-mother's nest) AND no NPC or other monster is there.

The apex must NOT appear:
- At the ENTRANCE (the party hasn't earned it yet)
- In a REQUIRES-KEY room (those are structural obstacle/divider rooms; the party solves them by finding the key elsewhere, not by fighting the apex; an apex here turns an obstacle into a die-here choke point)
- In SECRET ROOMS (payoff chambers)
- In LOCKED ROOMS (the pickable lock is the challenge; an apex behind it is overkill)
- In CONNECTING ROOMS (transit space)

In every case, the apex's room is the apex's room — no minion co-tenants, no strong_minion co-tenants.

Avoidance rules for minions and strong_minions:
- Do NOT place minions/strong_minions in the entrance area unless the dungeon overview specifically describes guards posted there.
- Do NOT place monsters in secret rooms — those are payoff chambers.
- Do NOT place minions or strong_minions in REQUIRES-KEY rooms. Those rooms already deliver an obstacle; adding hostile monsters on top compounds the challenge unfairly. (A single minion patrol may pass through, but the obstacle is the encounter.)
- A HAS-KEY-FOR room (key room) MAY hold defenders proportional to its narrative role. A handful of minions guarding a hidden tool is fine. A strong_minion as lieutenant-guard is fine when the key justifies it. The apex CAN be the key-guarder (especially if a part of the apex IS the key — a tooth, scale, horn, venom-sac) — but if the apex is here, do NOT also place minions or strong_minions in that same room. The apex gets its room to itself even when the room is a key-room.
- When a named-NPC BOSS occupies the boss room (visible in the room table above), do NOT also place the apex monster there. The boss room is for the named NPC; the apex goes elsewhere as a late-stage encounter.
- When a non-hostile NPC is placed in a room (a refugee, prisoner, captive scribe), do NOT place hostile monsters there — that placement contradicts the NPC's situation.
- Whichever area the APEX is assigned to, NO other monster (minion or strong_minion) is also assigned to that area. The apex gets its room to itself. This is a hard rule — check your assignments at the end and verify that the apex's area_id does not appear in any other monster's area_ids list.

Faction coherence:
- If the dungeon has TWO factions (home faction NPCs + monster population), keep the monsters in areas the home faction does NOT control. Example: the order's brothers occupy the living rooms; the sprites occupy the lower archive's nest and patrol the connecting tunnels.

## OUTPUT FORMAT

Return STRICT JSON (no prose, no commentary, no code fences):

{
  "assignments": [
    {
      "monster_id": "mid_xxx",
      "monster_name": "drake-kit",
      "area_ids": [4, 7, 9],
      "reason": "minion tier; spread across living and connecting areas as patrol/nest"
    },
    {
      "monster_id": "mid_yyy",
      "monster_name": "lieutenant drake",
      "area_ids": [8],
      "reason": "strong_minion; guards the setback area"
    },
    {
      "monster_id": "mid_zzz",
      "monster_name": "Zul-tharak (elder drake)",
      "area_ids": [12],
      "reason": "apex; boss room (no named-NPC boss assigned to that area)"
    }
  ],
  "unassigned": [
    {
      "monster_id": "mid_qqq",
      "monster_name": "wandering creature",
      "reason": "dormant/historical; not active in current dungeon state"
    }
  ]
}

If there are no monsters to assign, return empty arrays for both keys.`;
}

/**
 * Validate the LLM response shape.
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
export function validateMonsterAssignmentResponse(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    if (!Array.isArray(data.assignments)) return false;
    if (!Array.isArray(data.unassigned)) return false;
    for (const a of data.assignments) {
      if (typeof a.monster_id !== 'string' || !a.monster_id.trim()) return false;
      if (!Array.isArray(a.area_ids) || a.area_ids.length === 0) return false;
      if (a.area_ids.some(id => typeof id !== 'number')) return false;
      if (typeof a.reason !== 'string') return false;
    }
    for (const u of data.unassigned) {
      if (typeof u.monster_id !== 'string' || !u.monster_id.trim()) return false;
      if (typeof u.reason !== 'string') return false;
    }
    return true;
  } catch (e) {
    console.error('Invalid JSON:', e);
    return false;
  }
}

/**
 * Run the assignment call.
 *
 * @param {object} args
 * @param {string} args.dungeonOverview
 * @param {Array}  args.rooms
 * @param {Array}  args.monsters — dungeon.monsters
 * @param {Array}  args.npcs — dungeon.npcs (for room-table context)
 * @param {object} [args.npcAssignments]
 * @param {object} [args.loreAssignments]
 * @returns {Promise<{rooms_to_monster_ids: object, monster_id_to_rooms: object, unassigned: Array}|null>}
 */
export async function assignMonsters({
  dungeonOverview,
  rooms,
  monsters,
  npcs = [],
  npcAssignments = null,
  loreAssignments = null,
}) {
  if (!dungeonOverview || !Array.isArray(rooms) || rooms.length === 0) return null;
  if (!Array.isArray(monsters) || monsters.length === 0) return null;

  const prompt = buildMonsterAssignmentPrompt(
    dungeonOverview,
    rooms,
    monsters,
    npcAssignments,
    loreAssignments,
    npcs,
  );

  let response;
  try {
    response = await generateGptResponse(prompt, validateMonsterAssignmentResponse);
  } catch (err) {
    console.error('Monster assignment call failed:', err);
    return null;
  }

  let parsed;
  try {
    parsed = JSON.parse(response);
  } catch (err) {
    console.error('Monster assignment response was unparseable:', err);
    return null;
  }

  const rooms_to_monster_ids = {};
  const monster_id_to_rooms = {};
  const validAreaIds = new Set(rooms.map(r => r.id));
  const validMonsterIds = new Set(monsters.map(m => m.id));

  for (const a of parsed.assignments) {
    if (!validMonsterIds.has(a.monster_id)) {
      console.warn(`Monster-assignment for ${a.monster_id} references unknown monster; dropping`);
      continue;
    }
    const validAreas = a.area_ids.filter(id => validAreaIds.has(id));
    if (validAreas.length === 0) {
      console.warn(`Monster-assignment for ${a.monster_id} pointed at no valid areas; dropping`);
      continue;
    }
    monster_id_to_rooms[a.monster_id] = validAreas;
    for (const areaId of validAreas) {
      if (!rooms_to_monster_ids[areaId]) rooms_to_monster_ids[areaId] = [];
      rooms_to_monster_ids[areaId].push(a.monster_id);
    }
  }

  return {
    rooms_to_monster_ids,
    monster_id_to_rooms,
    unassigned: parsed.unassigned || [],
  };
}

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

/**
 * Get the monster_ids assigned to a given room. Returns empty array
 * if no monsters are assigned or assignments are missing.
 *
 * @param {object} dungeon
 * @param {number} roomId
 * @returns {string[]}
 */
export function getRoomMonsterIds(dungeon, roomId) {
  return dungeon?.monsterAssignments?.rooms_to_monster_ids?.[roomId] || [];
}

/**
 * Build a string describing the monster populations assigned to a
 * room — formatted for inclusion alongside the NPC string in the
 * room prompt's inhabitants context. Returns empty string when no
 * monsters are assigned.
 *
 * Format the room prompts read:
 *   MONSTER POPULATIONS PRESENT IN THIS ROOM:
 *   - [minion] drake-kit — description...
 *   - [strong_minion] drake-warden — description...
 *
 * The model treats these as POPULATIONS (a pack, a swarm, a brood),
 * not individuals. Tier annotations help the model calibrate threat.
 *
 * @param {object} dungeon
 * @param {number} roomId
 * @returns {string}
 */
export function formatRoomMonstersForPrompt(dungeon, roomId) {
  const monsterIds = getRoomMonsterIds(dungeon, roomId);
  if (monsterIds.length === 0) return '';
  if (!Array.isArray(dungeon?.monsters)) return '';

  const lines = monsterIds
    .map((id) => {
      const m = dungeon.monsters.find(x => x.id === id);
      if (!m) return null;
      const tier = m.type ? `[${m.type}] ` : '';
      const desc = m.description ? ` — ${m.description}` : '';
      return `- ${tier}${m.name}${desc}`;
    })
    .filter(Boolean);

  if (lines.length === 0) return '';

  return `MONSTER POPULATIONS PRESENT IN THIS ROOM (treat as POPULATIONS — packs, broods, swarms — not single creatures):
${lines.join('\n')}`;
}
