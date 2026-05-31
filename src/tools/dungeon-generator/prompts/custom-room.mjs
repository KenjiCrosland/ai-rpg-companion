/**
 * Custom room prompt — generates a room from user-provided form
 * input (name + summary). This handler runs when the user has
 * supplied custom name/summary fields but the room doesn't fit a
 * specific procedural type (entrance/boss/setback/locked/secret/etc.).
 *
 * The user's input is the PRIMARY signal — the room should be
 * whatever the user described. The prompt provides shape (read-
 * aloud, dm_notes, sub-blocks) but defers to user intent on what
 * the room actually is.
 *
 * Output shape (same 4-field pattern as the other audited room
 * types):
 *
 *   name                 — user-provided name verbatim when given;
 *                          otherwise a model-generated name fitting
 *                          the user's summary
 *   door_preamble        — terse door states; omit when all unlocked
 *   read_aloud_opening   — 40-90 word boxed text; reflects the
 *                          user's intent
 *   has_challenge        — boolean. TRUE when user's input implies
 *                          a challenge (a guardian, a trap, a
 *                          puzzle). FALSE when the room is purely
 *                          descriptive (a chamber the user wants
 *                          described).
 *   challenge_header     — ≤8 word title, only when has_challenge
 *   dm_notes             — array of paragraph strings. First
 *                          paragraph covers room overview + the
 *                          user's intent. Optional feature sub-blocks.
 *   one_sentence_summary — sidebar summary, ≤20 words.
 *
 * Why this shape (vs. the old 9-field structure):
 *   The old prompt mandated lore_description +
 *   features_and_contents + additional_notes +
 *   interactive_element_header + interactive_element_lore +
 *   interactive_element_details — six overlapping DM slots and a
 *   forced interactive element. For custom rooms (where the user
 *   has already decided what's there), this often produced content
 *   that contradicted the user's stated room idea. The new shape
 *   uses the user's input as the primary driver and lets the model
 *   produce only what's needed.
 *
 * Difficulty tier (1-5) scales DCs/severity when has_challenge is
 * true. Stored on `dungeon.dimensions.difficulty`.
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

export function generateCustomRoomPrompt(
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

  const connectedSection = connectedRoomsInfo && connectedRoomsInfo !== ''
    ? `Connected rooms (rooms reachable from this one): ${connectedRoomsInfo}\n`
    : '';

  const doorwaySection = doorwayInfo
    ? `\nDOORWAYS IN THIS ROOM — authoritative door states from the map. The door_preamble field MUST report states EXACTLY as listed here. Do NOT invent locks, bars, DCs, force checks, or alternate bypasses for doors marked "unlocked door":
${doorwayInfo}
`
    : '';

  const npcSection = npcString
    ? `INHABITANTS PRESENT IN THE ROOM — incorporate them. If an NPC is present, use the NPC's identity from the overview. If MONSTER POPULATIONS are listed, USE THEM as-is.

${npcString}
`
    : '';

  const loreRoleSection = loreRole
    ? `\nLORE ROLE: This room corresponds to "${loreRole}" from the dungeon's overview prose. The room generates AS that named place — its name, character, contents, and the player-facing payoff align with what the overview says about "${loreRole}".\n`
    : '';

  // The user input is the PRIMARY driver. If the user provided a name
  // and/or summary, those describe what they want the room to be.
  const userInputSection = (formRoomName || formRoomSummary)
    ? `\n## USER INTENT (primary driver of this room)

${formRoomName ? `Room name: ${formRoomName}` : ''}
${formRoomSummary ? `Room summary: ${formRoomSummary}` : ''}

The user has explicitly named and/or described this room. Their input is the PRIMARY signal — generate a room that matches their stated intent. Do NOT override the user's vision with a different room type or contradict their summary. If they say "a quiet reading nook," do not generate a fortified armory. If they say "the alchemy lab where Galen mixes poisons," include Galen and the alchemy lab character.

`
    : `\n## NO USER INPUT

The user did not provide a name or summary. Generate a room that fits the dungeon overview's character and the short description above. Pick a room TYPE (e.g., living, purpose, specialized) that makes sense given the dungeon's context and what's already nearby. Avoid generic "chamber" or "room"; give it a specific function.

`;

  return `You are writing a CUSTOM room in a D&D 5e dungeon. The user may have provided a specific name and/or summary describing what they want the room to be — if so, their intent is the primary driver and the room should match it. Otherwise, infer a fitting room from the dungeon's context.

DUNGEON OVERVIEW:
${dungeonOverview}

CUSTOM ROOM INFO:
Short description (size, exits, map-side notes): ${shortDescription}
${connectedSection}${loreRoleSection}${doorwaySection}${loreLookup}${incomingMentions}${featuredItems}${tierLine}
${userInputSection}${npcSection}

## REGISTER FIDELITY — respect the dungeon's established context

The dungeon overview establishes material, lighting, inhabitants, construction. The custom room INHERITS that register:

- LIGHTING: ambient/natural where the overview establishes it. Do not invent installed lighting that contradicts the dungeon's makers.
- CONSTRUCTION: matches the dungeon's makers — claw-scored stone in a drake-burrow, fitted ashlar in a wizard's tower, layered moss-and-timber in a fen ruin.
- FURNITURE AND OBJECTS: match BOTH the user's stated intent (when given) AND the inhabitants. If the user says "alchemy lab," the lab tools should match the dungeon's alchemists.

## CHALLENGE DECISION

has_challenge is conditional:
- TRUE when the user's input implies an in-room challenge (a guarded item, a trap, a creature, a puzzle, a moral dilemma)
- TRUE when the room context (assigned monsters, hostile NPC) demands one
- FALSE when the room is purely descriptive (a quiet chamber the user wants painted in), a quiet inhabited space, or an empty room

The user's intent wins. If they say "the empty bedroom where the warden used to sleep," it's empty — has_challenge = FALSE. Don't fight their vision.

## BOLDING RULES

Use **markdown bold** ONLY for:
1. Creature names when first introduced (e.g., **drake-kit**)
2. Character names when first introduced (e.g., **Brother Galen**)
3. Feature sub-block titles at the START of an optional dm_notes paragraph, formatted as: **Feature Name.** followed by description

DO NOT bold game mechanics keywords (DCs, skill names), action verbs, or generic phrases.

## CROSS-REFERENCE FIDELITY — use the LORE-LOCATION LOOKUP

When dm_notes references other parts of the dungeon, references MUST resolve to area numbers via the LORE-LOCATION LOOKUP above. Lore-locations not in the lookup are atmospheric only.

${CROSS_ROOM_REFERENCES_SECTION}

## WHAT DOES NOT GO IN dm_notes

Three categories are owned by other fields or sections:

1. EXIT INVENTORY. The read-aloud names visible directions; door_preamble handles door states. dm_notes never lists exits.

2. SECRET DOORS AND THEIR MECHANICS. A separately-generated **Secret Door** notes section gets appended with canonical discovery/opening mechanics. dm_notes never mentions secret doors and NEVER creates a **Secret Door Trigger** or **Hidden Passage** feature sub-block.

3. DOOR MATERIAL. "Wooden door," "stone door" belong in the read-aloud (when notable). dm_notes treats doors by area number only.

## OUTPUT FORMAT

Return STRICT JSON (no prose, no commentary, no code fences):

{
  "name": "${formRoomName ? formRoomName + ' (use VERBATIM)' : 'A 1-4 word descriptive name reflecting the room\'s function. Avoid generic \"Chamber\" or \"Room\" alone. Avoid archaic opaque terms.'}",

  "door_preamble": ${DOOR_PREAMBLE_FIELD_DESC},

  "read_aloud_opening": "Boxed text the DM reads when the party enters. 40-90 words, present-tense, sensory. Describe the room as it is, reflecting the user's stated intent (when given). ${READ_ALOUD_NO_DOORWAY_INVENTORY_RULE} ${READ_ALOUD_SHOW_DONT_TELL_DIMENSIONS_RULE} NO mechanics, NO DM hints, NO addressing the DM. Avoid generic material adjectives like 'wooden door' unless the material is genuinely notable.",

  "has_challenge": false,

  "challenge_header": "≤8 word title for the in-room challenge. Omit this key entirely if has_challenge is false.",

  "dm_notes": [
    "First paragraph (REQUIRED). Covers: dimensions, the room's TYPE/CHARACTER (from the user's intent or inferred from context), the SPECIFIC contents or inhabitants the party finds, and any noteworthy features. If has_challenge: also covers the mechanic at high level (DC, immediate failure consequence). Content should be specific (named items, named NPCs, named objects), not generic ('various items,' 'strange apparatuses'). 60-150 words for the common case.",
    "Subsequent paragraphs are OPTIONAL feature sub-blocks for specific items, NPC interactions, or environmental elements. Each begins with a bolded inline title: **Feature Name.** Description follows in regular text. Skip these if the first paragraph already covered everything. EACH FEATURE SUB-BLOCK MUST HAVE A UNIQUE TITLE within dm_notes — do not emit the same **Title.** twice. If you find yourself writing the same sub-block title a second time, consolidate the content into a single paragraph instead."
  ],

  "one_sentence_summary": "Brief sidebar-list summary (≤20 words) of the room's character and contents.",

  "room_mentions": ${ROOM_MENTIONS_FIELD_DESC}
}

## DC SCALING (only if has_challenge)

- T1: DCs 10-12, failure → minor damage (1d4-1d6) or short setback
- T2: DCs 12-14, failure → moderate damage (2d6) or temporary condition
- T3: DCs 14-16, failure → real damage (3d6+) or persistent threat
- T4: DCs 16-18, failure → severe damage (4d8+) or party-wide complication
- T5: DCs 18-20, failure → lethal threat or major resource cost

Failure consequences MUST be PHYSICAL and IMMEDIATE — observable to the whole table within seconds of the failed roll.`;
}

/**
 * Validate the custom room response. Same shape as the other room
 * prompts — `name`, `read_aloud_opening`, `has_challenge`, `dm_notes`
 * (array), `one_sentence_summary` required; `challenge_header`
 * required only when has_challenge; `door_preamble` optional.
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
export function validateCustomRoomResponse(jsonString) {
  return parseAndValidateRoom(jsonString, [
    d => validateRequiredKeys(d, [
      'name',
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
 * @param {object} data parsed custom room response
 * @returns {Array<{format: string, content: string}>}
 */
export function processCustomRoomResponse(data) {
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
