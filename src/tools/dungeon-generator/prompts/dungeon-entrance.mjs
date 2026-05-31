/**
 * Entrance room prompt — generates the threshold room.
 *
 * Output shape (3 fields, parallel to the published-adventure room
 * structure — short boxed text, optional challenge title, one DM
 * notes paragraph):
 *
 *   read_aloud_opening — 60-100 word boxed text. Sets BOTH the
 *                        threshold (outside) and the first chamber
 *                        (inside) in one block, since the entrance
 *                        is the only room where one read-aloud
 *                        spans the outside-to-inside transition.
 *
 *   has_challenge      — boolean. Inferred from the dungeon
 *                        overview's APPROACH/threshold text. Only
 *                        true when the entrance ITSELF poses a
 *                        challenge (sealed door, guarded threshold,
 *                        ward, etc.) — NOT when the route there is
 *                        dangerous (that danger lived in getting
 *                        there, the entrance is "you've arrived").
 *
 *   challenge_header   — ≤8 word title, present only if has_challenge
 *                        is true.
 *
 *   dm_notes           — one paragraph DM-side reference. 60-150
 *                        words for no-challenge entrances (what's
 *                        in the chamber, who's there, dimensions);
 *                        100-200 words for entrances with a
 *                        challenge (same + mechanics, DCs scaled
 *                        to difficulty, immediate failure
 *                        consequence, optional bypass). Inline
 *                        markdown bold for scannable DM keywords.
 *
 *   one_sentence_summary — sidebar-list summary, ≤20 words.
 *
 * Why this shape (vs. the previous 16-slot structure):
 *   The old prompt mandated challenge_explanation +
 *   challenge_mechanics + failure_scenario + challenge_circumvention
 *   as four separate slots. The model couldn't help duplicating
 *   content across them. The old prompt also baked in the
 *   five-room-dungeon-formula assumption that every entrance must
 *   have a guardian/puzzle/lock. Many real dungeons have open
 *   thresholds. The conditional `has_challenge` lets the model say
 *   "no, the danger was the route in" when the overview supports it.
 *
 * Difficulty tier (1-5) scales DCs and failure severity. Stored on
 * `dungeon.dimensions.difficulty`; passed through here as a number
 * or null. If null, DCs default to T2 (moderate).
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
  validateHasChallenge,
  validateDmNotes,
  validateOptionalDoorPreamble,
  validateOptionalRoomMentions,
} from './shared-validators.mjs';

export function generateEntrancePrompt(
  dungeonOverview,
  shortDescription,
  connectedRoomsInfo = '',
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
    ? `Dungeon difficulty tier: ${difficulty} (1-5). If a challenge is generated, scale DCs and failure severity to this tier.`
    : `Dungeon difficulty tier: not specified — default to T2 (DCs 12-14) if generating a challenge.`;

  const roomNameSection = formRoomName
    ? `User-provided room name (use this verbatim): ${formRoomName}\n`
    : '';

  const roomSummarySection = formRoomSummary
    ? `User-provided summary (incorporate into the room): ${formRoomSummary}\n`
    : '';

  const connectedSection = connectedRoomsInfo
    ? `Connected rooms (rooms reachable from this one): ${connectedRoomsInfo}\n`
    : '';

  // LORE ROLE: when this room was assigned a named place from the
  // overview by the lore-assignment pass, tell the model so the room
  // generates with that identity.
  const loreRoleSection = loreRole
    ? `\nLORE ROLE: This room corresponds to "${loreRole}" from the dungeon's overview prose. The entrance generates AS that named place — its character, contents, and the player-facing payoff align with whatever the overview says about "${loreRole}".\n`
    : '';

  const doorwaySection = doorwayInfo
    ? `\nDOORWAYS IN THIS ROOM — authoritative door states from the map. The door_preamble field MUST report states EXACTLY as listed here. Do NOT invent locks, bars, DCs, force checks, or alternate bypasses for doors marked "unlocked door." Do NOT add visual or material details here — those belong in the read-aloud:
${doorwayInfo}
`
    : '';

  const npcSection = npcString
    ? `NPC present at the entrance — the user explicitly picked this NPC. They MUST appear by name in the read_aloud_opening or dm_notes; do NOT silently omit them. If this NPC is the dungeon's BOSS or a powerful entity, present them as a weakened version, projection, illusion, or avatar (a "final boss preview") rather than the full encounter — but they MUST still appear. If this NPC reads as someone from OUTSIDE the dungeon (a questgiver, a townsperson, a relative the party was sent to investigate, an NPC whose context lives in the surrounding setting rather than this dungeon), incorporate them diegetically — a vision in the steam, a voice carried on a draft, a written note left here in their hand, a memory-echo touched in the cold, a sketched portrait on the wall, a sleeping form half-glimpsed in shadow — but they MUST still appear by name. Neither exception is a license to skip them.

NPC details:
${npcString}
`
    : '';

  return `You are writing the ENTRANCE room of a D&D 5e dungeon. The entrance is where the party crosses the threshold into the dungeon proper.

DUNGEON OVERVIEW (read the APPROACH/threshold section carefully — it tells you whether the entrance itself poses a challenge):
${dungeonOverview}

ENTRANCE INFO:
Short description (size, exits, map-side notes): ${shortDescription}
${connectedSection}${loreRoleSection}${doorwaySection}${loreLookup}${incomingMentions}${featuredItems}${tierLine}
${roomNameSection}${roomSummarySection}${npcSection}
## REGISTER FIDELITY — respect the dungeon's established context

The dungeon overview establishes the dungeon's material, lighting, inhabitants, and construction register. The entrance and first chamber INHERIT that register and must not contradict it:

- LIGHTING: if the overview describes ambient/natural light (ember-glass veins, lava heat, daylight from holes, bioluminescent fungus, etc.), do NOT invent torches, sconces, braziers, lanterns, or other installed lighting infrastructure in this room. The dungeon's natural light is what lights this room too.

- CONSTRUCTION: if the dungeon was excavated or grown by non-tool-using inhabitants (drakes, oozes, fungi, worms), do NOT invent carpentry, masonry, brick courses, ironmongery, or other tool-marks. Their walls are claw-scored, melted, gnawed, or shaped by what shaped them.

- FURNITURE AND OBJECTS: if the overview names the inhabitants, only invent objects the inhabitants would plausibly have placed. A drake-kin burrow has bones, scorch marks, gnawed remains, ember-glass shards — NOT tapestries, sconces, candleholders, or chests of drawers. Match the inhabitants.

If you're about to write a sentence that describes infrastructure or furnishing, check: is this consistent with the dungeon's established register? If not, cut it.

## CHALLENGE DECISION — do this first

Read the dungeon overview's APPROACH or threshold prose. Then decide whether the entrance ITSELF has a challenge:

- The route to the dungeon is described as DIFFICULT or DANGEROUS (treacherous terrain, hostile climate, guarded approach, lengthy journey) → has_challenge = FALSE. The danger lived in getting here. The entrance is "you've arrived" — describe the threshold and the first chamber the party sees past it.

- The route is benign, but the threshold itself is SEALED, BARRED, WARDED, or DEFENDED (a locked door, a riddle, a guardian on the doorstep) → has_challenge = TRUE.

- Neither — the route was uneventful and the door is open or trivially passable → has_challenge = FALSE.

Do NOT default to "every entrance has a guardian/puzzle/lock." Many published-adventure entrances are open thresholds. The five-room-dungeon formula does not apply here.

## BOLDING RULES

Use **markdown bold** ONLY for these three things — nothing else:
1. Creature names when first introduced in a paragraph (e.g., **Granny Nightshade**, **drake-kit**)
2. Character names when first introduced in a paragraph (e.g., **Velina**, **Zallithrax**)
3. Feature sub-block titles at the START of an optional dm_notes paragraph, formatted as: **Feature Name.** followed by description

DO NOT bold game mechanics keywords (Puzzle, Skill Checks, Consequences of Failure, etc.), DCs ("DC 12 Investigation"), action verbs, or generic phrases. Plain text carries those — the layout already distinguishes them. The above three categories are the ONLY exception to plain-text body.

## CROSS-REFERENCE FIDELITY — use the LORE-LOCATION LOOKUP

When dm_notes (or any field) references other parts of the dungeon in a way the party can act on (a route, a destination, a bypass), the references MUST resolve to actual area numbers on the map.

- If a lore-location appears in the LORE-LOCATION LOOKUP above, USE the listed area number when referencing it ("a passage leading to area 7" — or "a passage to the bone-pile chamber, area 7"). These references are actionable.
- If a lore-location is NOT in the lookup, treat it as ATMOSPHERIC only ("the air still tastes of the bog-water outside") — do not promise navigation to it. The DM has no way to fulfill the promise.

The LORE-LOCATION LOOKUP is the source of truth. If it's empty (no assignments were made), treat any lore-location named in the overview as atmospheric-only by default.

${CROSS_ROOM_REFERENCES_SECTION}

## WHAT DOES NOT GO IN dm_notes

Three categories are explicitly owned by OTHER fields or by separately-generated sections. Putting them in dm_notes duplicates or contradicts the canonical source:

1. EXIT INVENTORY. Sentences like "exits to the west (area 5) and south (area 7) via open corridors, and an unlocked door to the east (area 8)." The read-aloud already names the visible directions; door_preamble handles the door states. dm_notes never lists exits.

2. SECRET DOORS, HIDDEN PASSAGES, AND THEIR MECHANICS. Sentences like "a secret door in the north wall leads to area 10; pressing a tile triggers it." A separately-generated **Secret Door** notes section gets appended to this room with the canonical discovery/opening mechanics. dm_notes never mentions the secret door's location, finding mechanic, or opening mechanic — and NEVER creates a **Secret Door Trigger** or **Hidden Passage** feature sub-block. The door_preamble flagged its existence; that is the only mention dm_notes is allowed.

3. DOOR MATERIAL. "Wooden door," "stone door," etc. Door material is for the read-aloud (and only when notable). dm_notes treats doors by area number only.

If you're about to write something that fits one of the three categories above, STOP and remove it. The information belongs elsewhere.

## OUTPUT FORMAT

Return STRICT JSON (no prose, no commentary, no code fences):

{
  "door_preamble": ${DOOR_PREAMBLE_FIELD_DESC},

  "read_aloud_opening": "Boxed text the DM reads when the party arrives. 60-100 words, present-tense, sensory. Describe BOTH the threshold from outside AND the first chamber visible past it — this is the only room where one read-aloud spans the outside-to-inside transition. ${READ_ALOUD_NO_DOORWAY_INVENTORY_RULE} ${READ_ALOUD_SHOW_DONT_TELL_DIMENSIONS_RULE} NO mechanics, NO DM hints, NO addressing the DM. Just what the players see, hear, smell, feel. Avoid generic material adjectives like 'wooden door' or 'stone door' unless the material is genuinely notable (ember-glass, iron-bound, salt-crusted, etc.) — for ordinary doors, just say 'door' or 'doorway'.",

  "has_challenge": true,
  "challenge_header": "≤8 word title for the challenge. Omit this key entirely if has_challenge is false.",

  "dm_notes": [
    "Array of strings. Each string is ONE paragraph. The first paragraph covers the room's content overview: what's in the first chamber, who's there (NPCs/inhabitants), precise dimensions, any features the DM needs to know about. If has_challenge, this paragraph also covers the mechanic (how it works, skills, DCs scaled to the dungeon's difficulty tier, IMMEDIATE physical failure consequence, optional bypass woven inline).",
    "Subsequent paragraphs are OPTIONAL feature sub-blocks — distinct interactive elements that warrant their own block (e.g., a specific NPC encounter, a hidden cache, an environmental hazard the party can engage). Each begins with a bolded inline title: **Feature Name.** Description follows in regular text. Examples: '**Tea with Granny Nightshade.** Characters who arrange a meeting...', '**The Drake-Kit in the Shadows.** The wounded juvenile can be approached...'. Skip these if the room has no specific sub-features beyond what the overview paragraph covered. EACH FEATURE SUB-BLOCK MUST HAVE A UNIQUE TITLE within dm_notes — do not emit the same **Title.** twice. If you find yourself writing the same sub-block title a second time, consolidate the content into a single paragraph instead."
  ],

  "one_sentence_summary": "Brief sidebar-list summary (≤20 words) of the room's purpose and what's there.",

  "room_mentions": ${ROOM_MENTIONS_FIELD_DESC}
}

## DC SCALING (only if has_challenge)

- T1: DCs 10-12, failure → minor damage (1d4-1d6) or short setback
- T2: DCs 12-14, failure → moderate damage (2d6) or temporary condition
- T3: DCs 14-16, failure → real damage (3d6+) or persistent threat
- T4: DCs 16-18, failure → severe damage (4d8+) or party-wide complication
- T5: DCs 18-20, failure → lethal threat or major resource cost

Failure consequences MUST be PHYSICAL and IMMEDIATE — observable to the whole table within seconds of the failed roll. Do NOT write failure consequences like "wait 12 hours" or "the dungeon shifts memory" or other indirect/delayed effects. A failed roll at the entrance should cause something the players see, feel, or take damage from right now.`;
}

/**
 * Validate the entrance response.
 *
 *   read_aloud_opening    — required string
 *   has_challenge         — required boolean
 *   challenge_header      — required string when has_challenge=true
 *   door_preamble         — optional string (may be omitted or empty)
 *   dm_notes              — required array of non-empty strings
 *   one_sentence_summary  — required string
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
export function validateEntranceResponse(jsonString) {
  return parseAndValidateRoom(jsonString, [
    d => validateRequiredKeys(d, [
      'read_aloud_opening',
      'has_challenge',
      'dm_notes',
      'one_sentence_summary',
    ]),
    validateHasChallenge,
    d => validateDmNotes(d, 1),
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
 *   3. challenge_header (header)            — only when has_challenge
 *   4. dm_notes[0..n] (paragraph each)      — one entry per paragraph
 *
 * The header item is included in the array when has_challenge is true
 * so the edit-form markup round-trip works; the RoomDescription
 * template no longer renders the header slot (the room's h3
 * "1. Entrance" is the heading; the challenge title was redundant).
 * It is preserved in storage for forward compatibility.
 *
 * @param {object} data parsed entrance response
 * @returns {Array<{format: string, content: string}>}
 */
export function processEntranceResponse(data) {
  const content = [];
  if (data.door_preamble && data.door_preamble.trim()) {
    content.push({ format: 'paragraph', content: data.door_preamble.trim() });
  }
  content.push({
    format: 'read_aloud',
    content: data.read_aloud_opening,
  });
  if (data.has_challenge && data.challenge_header) {
    content.push({ format: 'header', content: data.challenge_header });
  }
  for (const paragraph of data.dm_notes) {
    if (typeof paragraph !== 'string' || !paragraph.trim()) continue;
    content.push({ format: 'paragraph', content: paragraph });
  }
  return content;
}
