// Shared prompt fragments used by multiple room-prompt files.
//
// Editing one of these constants changes the guidance for every
// room prompt that imports it — keeps cross-room consistency rules
// (cross-room references, dm_notes exclusions, door_preamble shape,
// DC scaling) in one place instead of duplicated across 10 files.

export const CROSS_ROOM_REFERENCES_SECTION = `## CROSS-ROOM REFERENCES — use room_mentions to propagate facts

You MAY establish specific facts about adjacent rooms — a creature patrolling there, an NPC working there, a SPECIFIC ITEM or container placed there (a chest, a corpse, a glowing rune, a written page), an ongoing event. When you do, you MUST capture each cross-room reference in the room_mentions field (described below).

THIS RULE COVERS EVERY PHRASE THAT NAMES AN AREA NUMBER WITH A SPECIFIC COMMITMENT — even casual asides in dm_notes. If you write "a small iron key, useless here — opens a locked chest in area 2," you have committed two facts about area 2 (a chest exists, it contains something). That MUST appear in room_mentions, or you must OMIT the cross-room detail. Half-commit (naming a fact about another room without capturing it) is the worst outcome — the casual aside survives in your room's text but the target room generates as if it doesn't exist, and the dungeon contradicts itself. Door references like "to area 5" are exempt; those are navigation, not facts.

Two kinds of cross-room references are valid:
- SPECIFIC: "a Chittering-Feast pack patrols in area 4," "Brother Galen works the forge in area 7," "a chest in area 2 contains old robes and a journal." Use room_mentions to propagate.
- ATMOSPHERIC: "a faint scraping sound from somewhere ahead," "a smell of smoke drifts through the south door." These don't need room_mentions because they don't commit specifics about another room.

If a room is referenced in the ESTABLISHED FACTS ABOUT THIS ROOM section (above the OUTPUT FORMAT), those facts have been propagated TO this room from other rooms — honor them in your generation.`;

// The room_mentions field description, as embedded in the OUTPUT
// FORMAT JSON block. Already quoted — drop in as the right-hand
// side of a JSON key with no extra quotes.
export const ROOM_MENTIONS_FIELD_DESC = `"Array of cross-room references this room makes. Empty array [] is valid. Each entry has {area_id: <number>, mention: <string>}. The mention should be a single short sentence describing the SPECIFIC fact this room establishes about the target area (a creature/NPC seen, an event in progress, a notable feature). The system propagates each mention to the target room so its generation honors what you established. Examples: [{\\"area_id\\": 4, \\"mention\\": \\"A Chittering-Feast pack patrols here.\\"}, {\\"area_id\\": 7, \\"mention\\": \\"Brother Galen is at the forge.\\"}]. Do NOT add mentions for vague/atmospheric perceptions that don't commit to specifics about the target room."`;

/**
 * Format pending content seeds on a room into a prompt block.
 *
 * Two kinds currently supported, both consumed through the same
 * substrate (`pendingContentSeeds` storage, `consumePendingContentSeeds`
 * hook, the per-room handler's prompt parameter):
 *
 *   - 'clue' — produced by key-room.mjs when a non-obvious key
 *     distributes a clue to another room (Three Clue Rule). The
 *     clue must resolve to the key's specific answer.
 *   - 'leaf_payoff' — produced by dungeon-details.mjs for dead-end
 *     leaf rooms. A random discovery seed so the leaf rewards
 *     exploration with something specific instead of reading as
 *     atmospheric padding.
 *
 * Two kinds, two block framings — clue seeds say "another room set
 * this up, integrate consistently," leaf payoff seeds say "the party
 * who explores here earns a small specific discovery." When both
 * happen to be present on the same room, both blocks render.
 *
 * Returns the empty string when there are no usable seeds, so
 * callers can unconditionally concatenate into their prompt scaffold.
 *
 * @param {Array<{content: string, originRoomId: number|string|null, kind: string}>} seeds
 * @returns {string}
 */
export function formatIncomingContentSeedsBlock(seeds) {
  if (!Array.isArray(seeds) || seeds.length === 0) return '';

  const valid = seeds.filter(
    (s) => s && typeof s.content === 'string' && s.content.trim(),
  );
  const clueSeeds = valid.filter((s) => s.kind === 'clue');
  const payoffSeeds = valid.filter((s) => s.kind === 'leaf_payoff');

  if (clueSeeds.length === 0 && payoffSeeds.length === 0) return '';

  let block = '';

  if (clueSeeds.length > 0) {
    const bullets = clueSeeds.map((s) => `- ${s.content.trim()}`).join('\n');
    block += `\nINCOMING CLUE SEEDS — another room's prompt requested that these clues be planted in this room as natural scene details. Each clue is a specific observation a party member might make while exploring this chamber. Weave each into the read-aloud or dm_notes as an ORGANIC detail of the scene (an item on a workbench, a carved mark on a wall, a fragment in an open book) — do NOT add a "**Clues.**" or "**Clue from Area X.**" feature sub-block; the seeded detail should feel like part of this room, not an annotation from elsewhere. The cluesː
${bullets}
`;
  }

  if (payoffSeeds.length > 0) {
    const bullets = payoffSeeds.map((s) => `- ${s.content.trim()}`).join('\n');
    block += `\nLEAF-ROOM PAYOFF SEED — this room is a dead-end pocket off the main dungeon path. The party who explores here deserves a small specific discovery as a reward for investigation, not just atmosphere. Use the seed below as the SHAPE of the discovery and dress it specifically to the dungeon's overview (its register, inhabitants, history). Weave the payoff organically into the read-aloud or as a brief feature sub-block in dm_notes — modest scale, specific contents, no major mechanical reward, no plot-critical revelation. The point is to reward exploration, not to gate progression. Seed:
${bullets}
`;
  }

  return block;
}

// The "WHAT DOES NOT GO IN dm_notes" section. Used by connecting-room
// (only file currently using the canonical shared form). Other room
// prompts have bespoke variations inline — extract them here if a
// cross-file change is needed.
export const DM_NOTES_EXCLUSIONS_SECTION = `## WHAT DOES NOT GO IN dm_notes

Three categories are explicitly owned by OTHER fields or by separately-generated sections. Putting them in dm_notes duplicates or contradicts the canonical source:

1. EXIT INVENTORY. The read-aloud already names the visible directions; door_preamble handles the door states. dm_notes never lists exits.

2. SECRET DOORS, HIDDEN PASSAGES, AND THEIR MECHANICS. A separately-generated **Secret Door** notes section gets appended to this room with the canonical discovery/opening mechanics. dm_notes never mentions the secret door's location, finding mechanic, or opening mechanic — and NEVER creates a **Secret Door Trigger** or **Hidden Passage** feature sub-block. The door_preamble flagged its existence; that is the only mention dm_notes is allowed.

3. DOOR MATERIAL. "Wooden door," "stone door," etc. Door material is for the read-aloud (and only when notable). dm_notes treats doors by area number only.

If you're about to write something that fits one of the three categories above, STOP and remove it. The information belongs elsewhere.`;

// Standard door_preamble JSON field description with the strict
// REQUIRED-when-flagged rules and pickable-lock default. Drops in
// as the value side of a JSON `"door_preamble":` key. Not every
// room uses this — boss rooms are dead-end terminals where doors
// usually aren't flagged, and obstacle rooms have their own bespoke
// guidance — so don't blindly substitute this everywhere.
export const DOOR_PREAMBLE_FIELD_DESC = `"Terse DM-side preamble describing door states. Use ONLY the door states from the DOORWAYS IN THIS ROOM section above. Reference rooms by their connected-room numbers. REQUIRED whenever ANY doorway is a locked-door, secret door, or otherwise needs DM attention — do not omit door_preamble just because some doors are unlocked. When some doors are unlocked and others are locked or secret, describe ALL of them together (e.g., 'The door to area 2 is closed but unlocked. The door to area 3 is locked, and Granny Nightshade has the only key. There is a hidden doorway to area 5; see the Secret Door notes below.'). OMIT this key (pass empty string) ONLY when every single doorway is 'open corridor' or 'unlocked door' and none need flagging. Door-state formats:\\n- Unlocked: 'The door to area X is closed but unlocked.'\\n- Pickable locked door (DEFAULT for any locked-door doorway): 'The door to area Z is locked; see the Lock notes below.' Do NOT invent a key location, a character who holds the key, or a quest gate — pickable locks have their DC and bypass mechanics generated separately in a **Lock.** sub-block appended to this room. The lock IS pickable; do not write it as requiring an external key.\\n- Character holds key (ONLY when an NPC has been EXPLICITLY described in the dungeon overview as the key-holder for this specific door): 'The door to area Z is locked, and [character name] has the only key.'\\n- Quest-gate obstacle (when the DOORWAYS line for this door is labeled 'QUEST-GATE LOCK' — the obstacle and key are described in the obstacle room's own notes, NOT a pickable lock). If the obstacle room is a DIFFERENT room from this one: 'The door to area Z is sealed; the obstacle and key are described in area Z\\'s own notes.' If the obstacle room IS this room (you are generating the obstacle room itself and this door is the gate you describe): 'The door to area Z is sealed; the obstacle and key are described in the notes below.'\\n- Secret door: 'There is a hidden doorway to area Z; see the Secret Door notes below.' Do NOT include a Perception DC; the Secret Door notes section owns the discovery mechanics."`;

// Don't list doorways in the read-aloud. Doorways are owned by
// door_preamble (DM-side); players will discover them by exploring.
// Applies to KEYED rooms (boss, key, purpose, living, setback, locked,
// secret, entrance, obstacle, custom). Connecting rooms are an
// exception — their entire function is navigation, so naming the
// direction(s) the corridor branches IS the read-aloud's job.
export const READ_ALOUD_NO_DOORWAY_INVENTORY_RULE = `Do NOT list doorways in the read-aloud. Doorways are owned by door_preamble (DM-side); players will discover them by exploring the space. EXCEPTION: a doorway that is importantly different — a massive iron-bound gate, an arch sealed with sigils, a curtain of frost-light, a door of bone-lacquer — MAY be named as a scene element in itself. The default is to NOT list exits; only highlight a doorway that carries thematic or visual weight beyond 'a door to the west.'`;

// Don't recite numeric measurements in the read-aloud. Dimensions are
// owned by dm_notes. Applies to ALL room types including connecting
// rooms — scale should always be embodied, not measured.
export const READ_ALOUD_SHOW_DONT_TELL_DIMENSIONS_RULE = `Do NOT recite measurements in the read-aloud, in ANY form. Dimensions are owned by dm_notes. The ban covers digits ("20 feet," "500 square feet"), spelled-out numbers ("twenty feet square," "forty feet long," "half as wide"), and any phrasing that gives the party a measurable spatial fact. Instead, show scale through embodied sensory cues — the fire fills the room with warmth, a thrown stone would clatter against the far wall, the ceiling is close enough to touch, the four walls feel near at hand, two people couldn't pass without turning sideways, footsteps echo too long for the room to be small. FAILURE EXAMPLES: "a small rectangular chamber, about 500 square feet" → fix: "the chamber is close enough that the four walls feel near at hand"; "this cramped antechamber is roughly twenty feet square" → fix: "this cramped antechamber barely fits the four of you"; "perhaps forty feet long and half as wide" → fix: "long enough that the far wall is lost to shadow." Read-aloud is pure atmosphere, mood, and the immediate situation the party walks into.`;

export const DC_SCALING_SECTION = `## DC SCALING (only if has_challenge)

- T1: DCs 10-12, failure → minor damage (1d4-1d6) or short setback
- T2: DCs 12-14, failure → moderate damage (2d6) or temporary condition
- T3: DCs 14-16, failure → real damage (3d6+) or persistent threat
- T4: DCs 16-18, failure → severe damage (4d8+) or party-wide complication
- T5: DCs 18-20, failure → lethal threat or major resource cost

Failure consequences MUST be PHYSICAL and IMMEDIATE — observable to the whole table within seconds of the failed roll. Do NOT write failure consequences like "wait 12 hours" or other indirect/delayed effects.`;
