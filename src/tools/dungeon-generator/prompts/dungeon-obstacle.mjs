/**
 * Obstacle room prompt (`requiresKey` flow) — generates a room
 * dominated by a STRUCTURAL OBSTACLE that the party cannot defeat
 * through combat alone. The obstacle gates further progress through
 * the dungeon and is solved by retrieving the "key" from a separate
 * key room.
 *
 * This is DIFFERENT from the `locked` type:
 *   - `locked` rooms have PICKABLE obstacles (DC-based skill check)
 *   - `requires-key` (this prompt) has STRUCTURAL obstacles that
 *     require a specific solution from elsewhere in the dungeon
 *
 * The obstacle is NOT a combat-or-die encounter. The party cannot
 * grind through it with hit points; they must find the key. Combat
 * alternatives may exist for very creative play, but the design
 * assumes the party retrieves the solution and returns.
 *
 * Output shape (same 4-field pattern as the other audited room
 * types, with one type-specific tightening: has_challenge is ALWAYS
 * true — the obstacle IS the room):
 *
 *   name                 — descriptive room name reflecting the
 *                          obstacle or the room's role (e.g.,
 *                          "Hunger Ward," "The Vortex Hall,"
 *                          "Threshold of Names")
 *   door_preamble        — terse door states; omit when all unlocked
 *   read_aloud_opening   — 40-90 word boxed text; the obstacle is
 *                          part of the scene (visible, audible, or
 *                          imminent on approach)
 *   has_challenge        — ALWAYS true
 *   challenge_header     — ≤8 word title naming the obstacle's
 *                          character ("The Dust-Warden," "The
 *                          Hunger-Hum Ward," "The Ironbound Wall")
 *   dm_notes             — array of paragraph strings. First
 *                          paragraph covers the room overview + the
 *                          obstacle's setup. Required sub-blocks:
 *                          **The [Obstacle Name].**, **The Key.**
 *                          Optional: **Bypassing.**, **Aftermath.**
 *   one_sentence_summary — sidebar summary, ≤20 words.
 *
 * Why this shape (vs. the old 14-field structure):
 *   The old prompt mandated lore_description + features_and_contents
 *   + additional_notes + obstacle_explanation + obstacle_mechanics
 *   + failure_scenario + obstacle_solution + obstacle_circumvention
 *   + obstacle_completion_dm + TWO read-aloud blocks. The model
 *   produced ~10 DM paragraphs per room — a wall of unbolded prose
 *   where the GM couldn't find the load-bearing pieces. The new
 *   shape uses standard sub-block titles so a scanning GM can find:
 *   the obstacle, the key, the bypass, the aftermath.
 *
 * OBSTACLE TYPES (use to ground the model's choice):
 *
 *   1. WARDED GUARDIAN — a creature/construct that demands a specific
 *      tribute (a name, an item, a gesture, a memory). Not killable
 *      by force; only the tribute satisfies it.
 *   2. MAGICAL BARRIER — an energy field, anti-magic zone, or sigil-
 *      ward requiring a specific counter (a counter-artifact, a
 *      learned phrase, a sympathetic substance).
 *   3. PHYSICAL BARRIER — collapsed passage, flooded chamber, wall
 *      of thorns requiring a specific tool or condition from
 *      elsewhere.
 *   4. PUZZLE / RIDDLE — a sequence, pattern, or question requiring
 *      information from elsewhere in the dungeon to solve.
 *   5. SEALED LOCK — a structural lock requiring a specific physical
 *      key (literal key, etched plate, sympathy-binding object).
 *   6. ELEMENTAL CONDITION — extreme heat, cold, dark, silence, or
 *      vacuum that prevents passage; requires a counter-element from
 *      elsewhere (a heat-stone, a cold-iron lever, a song-of-light).
 *   7. CURSED THRESHOLD — the passage is cursed; crossing it inflicts
 *      a condition that must be cleansed before crossing safely.
 *   8. BOUND SPIRIT / SUPPLICANT — a being awaits acknowledgment of
 *      a specific debt or fulfillment of an old promise.
 *
 * Difficulty tier (1-5) scales DCs/damage if the obstacle's failure
 * is mechanical. Stored on `dungeon.dimensions.difficulty`.
 */

import {
  CROSS_ROOM_REFERENCES_SECTION,
  DOOR_PREAMBLE_FIELD_DESC,
  READ_ALOUD_NO_DOORWAY_INVENTORY_RULE,
  READ_ALOUD_SHOW_DONT_TELL_DIMENSIONS_RULE,
  ROOM_MENTIONS_FIELD_DESC,
} from './shared-fragments.mjs';
import {
  parseAndValidateRoom,
  validateRequiredKeys,
  validateHasChallengeRequired,
  validateDmNotes,
  validateOptionalDoorPreamble,
  validateOptionalRoomMentions,
} from './shared-validators.mjs';

export function generateObstaclePrompt(
  dungeonOverview,
  shortDescription,
  connectedRoomsInfo = '',
  solutionRoomId,
  keyRoomDescription = '',
  formRoomName = '',
  formRoomSummary = '',
  npcString = '',
  difficulty = null,
  doorwayInfo = null,
  loreRole = null,
  loreLookup = '',
  incomingMentions = '',
  featuredItems = '',
) {
  const tierLine = difficulty
    ? `Dungeon difficulty tier: ${difficulty} (1-5). Scale the obstacle's failure DCs and damage to this tier.`
    : `Dungeon difficulty tier: not specified — default to T2 (DCs 12-14, 2d6 damage).`;

  const connectedSection = connectedRoomsInfo && connectedRoomsInfo !== ''
    ? `Connected rooms (rooms reachable from this one): ${connectedRoomsInfo}\n`
    : '';

  const doorwaySection = doorwayInfo
    ? `\nDOORWAYS IN THIS ROOM — authoritative door states from the map. The door_preamble field MUST report states EXACTLY as listed here. Do NOT invent locks, bars, DCs, force checks, or alternate bypasses for doors marked "unlocked door":
${doorwayInfo}
`
    : '';

  const keyRoomSection = keyRoomDescription
    ? `\nTHE KEY ROOM (area ${solutionRoomId}) — what the party will find when they go to acquire the key. The obstacle in THIS room must be solvable by what the key room provides. Use this to inform the obstacle's character:
${keyRoomDescription}
`
    : `\nTHE KEY IS IN AREA ${solutionRoomId} — that room hasn't been generated yet. Pick an obstacle that fits the dungeon's register; when the key room is generated, its key will be the counter to this obstacle. Reference the key as "the means to overcome this obstacle (area ${solutionRoomId})."\n`;

  const npcSection = npcString
    ? `INHABITANTS PRESENT IN THE ROOM — incorporate them. If the obstacle is a WARDED GUARDIAN or BOUND SPIRIT, the assigned NPC may BE the guardian (use their identity from the overview). If MONSTER POPULATIONS are listed, use them as-is — but remember the obstacle is STRUCTURAL: combat alone does not defeat it.

${npcString}
`
    : '';

  const loreRoleSection = loreRole
    ? `\nLORE ROLE: This room corresponds to "${loreRole}" from the dungeon's overview prose. The room generates AS that named place — its name, character, contents, and the player-facing payoff align with what the overview says about "${loreRole}".\n`
    : '';

  const roomNameSection = formRoomName
    ? `User-provided room name (use verbatim): ${formRoomName}\n`
    : '';
  const roomSummarySection = formRoomSummary
    ? `User-provided summary (incorporate into the room): ${formRoomSummary}\n`
    : '';

  return `You are writing an OBSTACLE ROOM — a chamber in a D&D 5e dungeon dominated by a STRUCTURAL OBSTACLE that the party cannot defeat through combat alone. The obstacle gates further progress and is solved by retrieving the "key" from a separate key room.

DUNGEON OVERVIEW:
${dungeonOverview}

OBSTACLE ROOM INFO:
Short description (size, exits, map-side notes): ${shortDescription}
${connectedSection}${loreRoleSection}${doorwaySection}${keyRoomSection}${loreLookup}${incomingMentions}${featuredItems}${tierLine}
${roomNameSection}${roomSummarySection}${npcSection}

## THE OBSTACLE IS STRUCTURAL — NOT A COMBAT-OR-DIE ENCOUNTER

The party cannot grind through this obstacle with hit points. It is NOT a combat encounter that high damage solves. It is a STRUCTURAL gate: the party retrieves the key from area ${solutionRoomId} and returns to apply it.

The obstacle may have a combat dimension (a warded guardian that attacks when the party tries to force past, a cursed threshold that drains hit points), but combat by itself does NOT remove the obstacle. The guardian reforms; the curse re-applies; the wall stays.

Do NOT design the obstacle so it can be cheesed by raw damage. The KEY is the canonical solution.

## OBSTACLE TYPES — pick one that fits the dungeon

Vary the type — do NOT default to "a magical barrier" or "a guardian construct" every time. Pick the type whose character matches the dungeon's makers AND the kind of key the key room (area ${solutionRoomId}) will hold:

1. WARDED GUARDIAN — a creature/construct that demands a specific tribute (a name, an item, a gesture, a memory). Not killable by force; only the tribute satisfies it.
2. MAGICAL BARRIER — an energy field, anti-magic zone, or sigil-ward requiring a specific counter (a counter-artifact, a learned phrase, a sympathetic substance).
3. PHYSICAL BARRIER — collapsed passage, flooded chamber, wall of thorns requiring a specific tool or condition from elsewhere.
4. PUZZLE / RIDDLE — a sequence, pattern, or question requiring information from elsewhere in the dungeon to solve.
5. SEALED LOCK — a structural lock requiring a specific physical key (literal key, etched plate, sympathy-binding object) from elsewhere.
6. ELEMENTAL CONDITION — extreme heat, cold, dark, silence, or vacuum that prevents passage; requires a counter-element from elsewhere.
7. CURSED THRESHOLD — the passage is cursed; crossing it inflicts a condition that must be cleansed before crossing safely.
8. BOUND SPIRIT / SUPPLICANT — a being awaits acknowledgment of a specific debt or fulfillment of an old promise.

The OBSTACLE'S CHARACTER must pair with the KEY in area ${solutionRoomId}. A WARDED GUARDIAN demanding a name pairs with a key room holding the inscribed name. A SEALED LOCK pairs with a literal key. A FLOODED PASSAGE pairs with a drainage lever.

## REGISTER FIDELITY — respect the dungeon's established context

The dungeon overview establishes material, lighting, inhabitants, construction. The obstacle room INHERITS that register:

- LIGHTING: ambient/natural where the overview establishes it.
- CONSTRUCTION: the obstacle's MAKERS match the dungeon's makers. A drake-burrow's obstacle is shaped from stone, bone, and curse, not from arcane sigils. A wizard's lab's obstacle is sigils and bound spirits. A monastic order's obstacle is heavy-warded plate or oath-bound spirit.

## CHALLENGE — always present

has_challenge is ALWAYS true for obstacle rooms. The obstacle IS the room.

## BOLDING RULES

Use **markdown bold** ONLY for:
1. Creature names when first introduced (e.g., **dust-warden**, **bound efreet**)
2. Character names when first introduced (e.g., **King Vth'uum**)
3. Feature sub-block titles at the START of an optional dm_notes paragraph, formatted as: **Feature Name.** followed by description

DO NOT bold game mechanics keywords (DCs, skill names), action verbs, or generic phrases. Plain text carries those.

The bolded sub-block titles in dm_notes are CRITICAL for this room type — a scanning GM uses them to find the obstacle, the key, the bypass, the aftermath. Without them, the obstacle room reads as a wall of text and the GM can't navigate.

## CROSS-REFERENCE FIDELITY — use the LORE-LOCATION LOOKUP

When dm_notes references other parts of the dungeon (where the key is, where the obstacle's makers can be found), references MUST resolve to area numbers via the LORE-LOCATION LOOKUP above. The KEY is specifically in area ${solutionRoomId} — reference it by that area number.

${CROSS_ROOM_REFERENCES_SECTION}

## WHAT DOES NOT GO IN dm_notes

Three categories are owned by other fields or sections:

1. EXIT INVENTORY. The read-aloud names visible directions; door_preamble handles door states. dm_notes never lists exits.

2. SECRET DOORS AND THEIR MECHANICS. A separately-generated **Secret Door** notes section gets appended with canonical discovery/opening mechanics. dm_notes never mentions secret doors and NEVER creates a **Secret Door Trigger** or **Hidden Passage** feature sub-block.

3. DOOR MATERIAL. "Wooden door," "stone door" belong in the read-aloud (when notable). dm_notes treats doors by area number only.

## OUTPUT FORMAT

Return STRICT JSON (no prose, no commentary, no code fences):

{
  "name": "A 1-4 word descriptive name reflecting the obstacle (e.g., 'Hunger Ward,' 'The Vortex Hall,' 'Threshold of Names,' 'The Iron-Bound Pass'). Avoid generic 'Obstacle Room.' Avoid archaic opaque terms.",

  "door_preamble": ${DOOR_PREAMBLE_FIELD_DESC},

  "read_aloud_opening": "Boxed text the DM reads when the party enters. 50-100 words, present-tense, sensory. The obstacle is part of the scene — visible (a guardian standing before a door, a shimmering ward across a passage, a flooded depression, a wall of carved names), audible (a low hum, a grinding voice, dripping water), OR imminent (a chill that grows as you approach). Describe the chamber's character, atmosphere, and the obstacle's presence. ${READ_ALOUD_NO_DOORWAY_INVENTORY_RULE} ${READ_ALOUD_SHOW_DONT_TELL_DIMENSIONS_RULE} NO mechanics, NO DM hints. Avoid generic material adjectives unless the material is genuinely notable.",

  "has_challenge": true,

  "challenge_header": "≤8 word title naming the obstacle's character (e.g., 'The Dust-Warden,' 'The Vortex Ward,' 'The Hunger-Hum,' 'The Iron Threshold').",

  "dm_notes": [
    "First paragraph (REQUIRED). 80-150 words. Covers: dimensions, the obstacle's TYPE (from the list above), the room's environmental setup, any inhabitants here (if a guardian is part of the obstacle, briefly note them; full profile goes in the **The [Obstacle Name].** sub-block). Atmospheric details that hint at the obstacle's character. Do NOT yet describe the mechanic in detail — that's the next paragraph.",
    "Second paragraph (REQUIRED). **The [Obstacle Name].** Bolded inline title. Description follows. Cover: WHAT the obstacle is (its physical presence and behavior), HOW it prevents passage (the mechanic — the ward fires when crossed; the guardian demands a tribute; the wall blocks all but a specific tool), what happens if the party attempts to FORCE past it (the IMMEDIATE physical failure consequence — damage, condition, repulsion, summon reinforcements). Make clear the obstacle is structural — combat alone does not defeat it. 80-150 words.",
    "Third paragraph (REQUIRED). **The Key.** Bolded inline title. Description follows. Cover: WHAT the key is (the specific solution — a name, an item, a chant, a tooth) and WHERE in the dungeon it is (area ${solutionRoomId}). Briefly describe how the party uses the key to remove the obstacle (presenting it to the guardian, placing it in a slot, speaking it before crossing). Do NOT re-describe HOW the party acquires the key — that's the key room's job. 40-80 words.",
    "Fourth paragraph (OPTIONAL). **Bypassing.** Bolded inline title. Description follows. ONLY include when a clever alternative bypass exists that doesn't go through the key room: a high-DC magical workaround, an environmental approach (collapsing the ceiling, going around through another passage), a deception path (impersonating the key without it). Each bypass should have a clear DC and a notable risk (alerts the dungeon, fails partially, etc.). Skip when no genuine alternative bypass exists. 50-100 words.",
    "Fifth paragraph (OPTIONAL). **Aftermath.** Bolded inline title. Description follows. ONLY include when removing the obstacle has ongoing consequences (the guardian reforms after an hour and the party can no longer use the same trick; the ward leaves a lingering curse; the path opens but alerts something nearby). Skip when the obstacle resolves cleanly. 40-80 words."
  ],

  "one_sentence_summary": "Brief sidebar-list summary (≤20 words) of the obstacle's character and the key required.",

  "room_mentions": ${ROOM_MENTIONS_FIELD_DESC}
}

## DC AND DAMAGE SCALING

When the obstacle has a mechanical failure (damage from attempting to force past, save DC for the ward triggering, DC for the bypass alternatives):

- T1: DCs 10-12, saves DC 11-12, damage 1d4-2d6
- T2: DCs 12-14, saves DC 13-14, damage 2d6-3d8
- T3: DCs 14-16, saves DC 14-16, damage 3d8-5d8
- T4: DCs 16-18, saves DC 16-18, damage 5d8-8d10
- T5: DCs 18-20, saves DC 18-20, damage 8d10+

Failure consequences MUST be PHYSICAL and IMMEDIATE — observable to the whole table within seconds of the failed roll. The guardian's dust drains for damage; the ward repels with force; the cursed threshold inflicts a tier-appropriate condition. NOT "the party feels uneasy" or "memory of the room becomes hazy."`;
}

/**
 * Validate the obstacle response. Same shape as the other room
 * prompts — `name`, `read_aloud_opening`, `has_challenge` (always
 * true), `challenge_header` (always required), `dm_notes` (array
 * with at least 3 entries: overview + obstacle + key), `one_sentence_summary`
 * required; `door_preamble` optional.
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
export function validateObstacleResponse(jsonString) {
  return parseAndValidateRoom(jsonString, [
    d => validateRequiredKeys(d, [
      'name',
      'read_aloud_opening',
      'has_challenge',
      'challenge_header',
      'dm_notes',
      'one_sentence_summary',
    ]),
    validateHasChallengeRequired,
    d => validateDmNotes(d, 3),
    validateOptionalDoorPreamble,
    validateOptionalRoomMentions,
  ]);
}

/**
 * Build the contentArray that the RoomDescription component renders.
 *
 * Order:
 *   1. door_preamble (paragraph)            — only when non-empty
 *   2. read_aloud_opening (boxed)
 *   3. challenge_header (header)
 *   4. dm_notes[0..n] (paragraph each)      — one entry per paragraph
 *
 * @param {object} data parsed obstacle response
 * @returns {Array<{format: string, content: string}>}
 */
export function processObstacleResponse(data) {
  const content = [];
  if (data.door_preamble && data.door_preamble.trim()) {
    content.push({ format: 'paragraph', content: data.door_preamble.trim() });
  }
  content.push({
    format: 'read_aloud',
    content: data.read_aloud_opening,
  });
  content.push({ format: 'header', content: data.challenge_header });
  for (const paragraph of data.dm_notes) {
    if (typeof paragraph !== 'string' || !paragraph.trim()) continue;
    content.push({ format: 'paragraph', content: paragraph });
  }
  return content;
}
