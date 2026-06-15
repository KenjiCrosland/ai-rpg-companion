/**
 * Connecting room prompt — generates corridors, hallways, atria,
 * antechambers, galleries, and other transitional spaces between
 * the dungeon's keyed rooms.
 *
 * Output shape (same 4-field pattern as the entrance, with one
 * type-specific tightening: connecting rooms default has_challenge
 * to FALSE — most connecting rooms are pure traversal):
 *
 *   name                 — 1-2 word functional name (Corridor,
 *                          Antechamber, Atrium, etc.)
 *   door_preamble        — terse DM door-state info; omit if all
 *                          doors are unlocked. Same format as the
 *                          entrance prompt.
 *   read_aloud_opening   — 40-80 word boxed text describing the
 *                          passage. Shorter budget than entrance
 *                          (which has to set threshold + first
 *                          chamber); connecting rooms only describe
 *                          the space itself.
 *   has_challenge        — boolean. Defaults to FALSE for most
 *                          connecting rooms (they are paced traversal,
 *                          not encounter rooms). True only when the
 *                          dungeon context demands it (a trap, posted
 *                          guards, an obstacle in the passage, or an
 *                          NPC encounter).
 *   challenge_header     — ≤8 word title, only when has_challenge.
 *   dm_notes             — array of paragraph strings. First paragraph
 *                          covers dimensions / features / atmosphere
 *                          (30-100 words; very short for plain
 *                          corridors). Optional subsequent paragraphs
 *                          are feature sub-blocks with bolded inline
 *                          titles.
 *   one_sentence_summary — sidebar summary, ≤20 words.
 *
 * Why this shape (vs. the old 9-field structure):
 *   The old prompt mandated `interactive_element_header` +
 *   `interactive_element_lore` + `interactive_element_details` as
 *   three required slots. This forced the model to invent an
 *   "interactive element" in EVERY corridor — a feature on the wall,
 *   a lever, a statue with a hidden compartment — even when the
 *   passage was meant to be plain. Published adventures handle
 *   plain corridors in a single sentence ("A 20-foot hallway runs
 *   east, lined with cracked statues."); the new prompt's optional
 *   feature sub-blocks let the model do that without inventing
 *   anything.
 *
 * Difficulty tier (1-5) scales DCs/severity if has_challenge is
 * true. Stored on `dungeon.dimensions.difficulty`.
 */

import {
  CROSS_ROOM_REFERENCES_SECTION,
  DM_NOTES_EXCLUSIONS_SECTION,
  DOOR_PREAMBLE_FIELD_DESC,
  READ_ALOUD_SHOW_DONT_TELL_DIMENSIONS_RULE,
  ROOM_MENTIONS_FIELD_DESC,
  DC_SCALING_SECTION,
} from './shared-fragments.mjs';
import {
  parseAndValidateRoom,
  validateRequiredKeys,
  validateHasChallenge,
  validateDmNotes,
  validateOptionalDoorPreamble,
  validateOptionalRoomMentions,
} from './shared-validators.mjs';

export function generateConnectingRoomPrompt(
  dungeonOverview,
  shortDescription,
  existingRooms = 'none',
  connectedRoomsInfo = 'none',
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

  const connectedSection = connectedRoomsInfo && connectedRoomsInfo !== 'none'
    ? `Connected rooms (rooms reachable from this one): ${connectedRoomsInfo}\n`
    : '';

  const doorwaySection = doorwayInfo
    ? `\nDOORWAYS IN THIS ROOM — authoritative door states from the map. The door_preamble field MUST report states EXACTLY as listed here. Do NOT invent locks, bars, DCs, force checks, or alternate bypasses for doors marked "unlocked door." Do NOT add visual or material details here — those belong in the read-aloud:
${doorwayInfo}
`
    : '';

  const npcSection = npcString
    ? `NPC present in the room — the user explicitly picked this NPC. They MUST appear by name in the read_aloud_opening or dm_notes; do NOT silently omit them. If this NPC is the dungeon's BOSS or a powerful entity unlikely to be in a connecting room, present them as a weakened version, projection, illusion, or avatar (a "final boss preview"), not the full encounter — but they MUST still appear. If this NPC reads as someone from OUTSIDE the dungeon (a questgiver, a townsperson, a relative the party was sent to investigate, an NPC whose context lives in the surrounding setting rather than this dungeon), incorporate them diegetically — a vision in the steam, a voice carried on a draft, a written note left here in their hand, a memory-echo touched in the cold, a sketched portrait on the wall, a sleeping form half-glimpsed in shadow — but they MUST still appear by name. Neither exception is a license to skip them.

NPC details:
${npcString}
`
    : '';

  const existingRoomsLine = existingRooms && existingRooms !== 'none'
    ? `\nEXISTING ROOMS in this dungeon (do NOT reuse these room-type names — pick a different one): ${existingRooms}\n`
    : '';

  // LORE ROLE: when this room was assigned a named place from the
  // overview by the lore-assignment pass, tell the model so the room
  // generates with that identity.
  const loreRoleSection = loreRole
    ? `\nLORE ROLE: This room corresponds to "${loreRole}" from the dungeon's overview prose. The room generates AS that named place — its name, character, contents, and the player-facing payoff align with what the overview says about "${loreRole}". The connecting-room name field should reflect this lore identity.\n`
    : '';

  return `You are writing a CONNECTING room — a corridor, hallway, gallery, atrium, antechamber, foyer, or other transitional space between rooms in a D&D 5e dungeon.

DUNGEON OVERVIEW:
${dungeonOverview}

CONNECTING ROOM INFO:
Short description (size, exits, map-side notes): ${shortDescription}
${connectedSection}${loreRoleSection}${doorwaySection}${loreLookup}${incomingMentions}${featuredItems}${tierLine}${existingRoomsLine}
${npcSection}
## REGISTER FIDELITY — respect the dungeon's established context

The dungeon overview establishes the dungeon's material, lighting, inhabitants, and construction register. Individual rooms INHERIT that register and must not contradict it:

- LIGHTING: if the overview describes ambient/natural light (ember-glass veins, lava heat, daylight from holes, bioluminescent fungus, etc.), do NOT invent torches, sconces, braziers, lanterns, or other installed lighting infrastructure in individual rooms. The dungeon's natural light is what lights this room too.

- CONSTRUCTION: if the dungeon was excavated or grown by non-tool-using inhabitants (drakes, oozes, fungi, worms), do NOT invent carpentry, masonry, brick courses, ironmongery, or other tool-marks. Their walls are claw-scored, melted, gnawed, or shaped by what shaped them.

- FURNITURE AND OBJECTS: if the overview names the inhabitants, only invent objects the inhabitants would plausibly have placed. A drake-kin burrow has bones, scorch marks, gnawed remains, ember-glass shards — NOT tapestries, sconces, candleholders, or chests of drawers. A wizard's tower has scrolls, alembics, sigils — NOT pickaxes and ore-buckets. Match the inhabitants.

- "WE KNOW THERE'S LIGHTS BUT NO FURNITURE" — if the dungeon overview implies the chamber has only natural light and the creatures don't furnish, describe an empty stone (or whatever-the-material-is) chamber. Do not invent.

If you're about to write a sentence that describes infrastructure or furnishing, check: is this consistent with the dungeon's established register? If not, cut it.

## EMPTY ROOMS ARE ALLOWED TO BE EMPTY

Most connecting rooms in a real dungeon are empty. They exist to give the party room to walk, talk, and breathe. An empty antechamber is a perfectly fine room — describe the architecture and the atmosphere derived from the dungeon's register, and stop.

For an empty room:
- read_aloud_opening can be 30-50 words. Architecture + atmosphere only. No invented objects.
- dm_notes can be a single short paragraph (20-40 words): dimensions, "unoccupied and devoid of features," and any one detail the DM might care about. That's the whole entry.

Do NOT pad an empty room with invented furniture, invented sounds, invented atmospheric set-pieces, or invented historical residue ("scorch marks are consistent with..."). Empty is fine.

## CHALLENGE DECISION — do this first

Most connecting rooms have NO challenge. They are pure traversal — they pace the dungeon and give the party room to talk, plan, and breathe between keyed rooms. has_challenge should be FALSE by default.

Set has_challenge = TRUE only when the dungeon's context specifically demands danger in this passage:
- A trap that the dungeon's inhabitants would plausibly have placed here
- Guards or sentries posted at a chokepoint
- An obstacle (rubble, collapsed section, environmental hazard) that requires resolution
- An NPC encounter happens here

Do NOT default to "every room must have something to do." A boring hallway is a fine hallway. The five-room-dungeon-formula's "every room has a challenge" assumption does not apply.

## ROOM TYPE — match the room's size and shape

- Long: corridor or gallery (only call it a corridor if "long" is in the short description)
- Small: salon, antechamber, small foyer
- Large: grand hall, atrium, common room
- Otherwise: any 1-2 word transitional space name

Pick a SIMPLE 1-2 word functional name — Grand Hallway, Foyer, Atrium, Antechamber, Gallery, Corridor. Not "The Whispering Grand Foyer of the Faithful." The name is functional; the room's character comes from the description.

## BOLDING RULES

Use **markdown bold** ONLY for these three things — nothing else:
1. Creature names when first introduced in a paragraph (e.g., **goblin sentry**)
2. Character names when first introduced in a paragraph (e.g., **Velina**)
3. Feature sub-block titles at the START of an optional dm_notes paragraph, formatted as: **Feature Name.** followed by description

DO NOT bold game mechanics keywords (Puzzle, Skill Checks, Consequences of Failure, etc.), DCs ("DC 12 Investigation"), action verbs, or generic phrases. Plain text carries those.

## CROSS-REFERENCE FIDELITY — use the LORE-LOCATION LOOKUP

When dm_notes (or any field) references other parts of the dungeon in a way the party can act on (a route, a destination, a bypass), the references MUST resolve to actual area numbers on the map.

- If a lore-location appears in the LORE-LOCATION LOOKUP above, USE the listed area number when referencing it ("a passage leading to area 7" — or "a passage to the bone-pile chamber, area 7"). These references are actionable.
- If a lore-location is NOT in the lookup, treat it as ATMOSPHERIC only ("the air still tastes of the bog-water outside") — do not promise navigation to it. The DM has no way to fulfill the promise.

The LORE-LOCATION LOOKUP is the source of truth. If it's empty (no assignments were made), treat any lore-location named in the overview as atmospheric-only by default.

${CROSS_ROOM_REFERENCES_SECTION}

${DM_NOTES_EXCLUSIONS_SECTION}

## OUTPUT FORMAT

Return STRICT JSON (no prose, no commentary, no code fences):

{
  "name": "1-2 word functional room name (Hallway, Antechamber, Atrium, Gallery, Corridor, etc.). Simple and functional — not descriptive.",

  "door_preamble": ${DOOR_PREAMBLE_FIELD_DESC},

  "read_aloud_opening": "Boxed text the DM reads when the party enters this room. 40-80 words, present-tense, sensory. Describe the passage — architecture, atmosphere, light, sound, smell. Connecting rooms are about navigation, so naming the direction(s) the passage continues or branches IS part of the read-aloud's job — that's how players orient themselves. ${READ_ALOUD_SHOW_DONT_TELL_DIMENSIONS_RULE} NO mechanics, NO DM hints, NO addressing the DM. For plain corridors, terse is fine — a single short paragraph beats inflated prose. Avoid generic material adjectives like 'wooden door' or 'stone door' unless the material is genuinely notable (peat-warped, salt-crusted, iron-bound, etc.) — for ordinary doors, just say 'door' or 'doorway'.",

  "has_challenge": false,

  "challenge_header": "≤8 word title for the challenge. Omit this key entirely if has_challenge is false.",

  "dm_notes": [
    "Array of strings. Each string is ONE paragraph. The first paragraph covers the room's content overview: precise dimensions, notable features the DM needs to know about, any inhabitants. If has_challenge: also covers the mechanic (how it works, skills, DCs scaled to tier, IMMEDIATE physical failure consequence, optional bypass woven inline). For plain corridors with no challenge or features, the first paragraph can be very short (30-60 words). For richer connecting rooms (a gallery with murals, an atrium with a fountain), 80-150 words is fine.",
    "Subsequent paragraphs are OPTIONAL feature sub-blocks — only when the room has a specific interactive element that warrants its own block. Each begins with a bolded inline title: **Feature Name.** Description follows in regular text. Examples: '**The Faded Mural.** Characters who study the wall...', '**The Discarded Helm.** Among the rubble lies...'. Skip these for plain corridors. EACH FEATURE SUB-BLOCK MUST HAVE A UNIQUE TITLE within dm_notes — do not emit the same **Title.** twice. If you find yourself writing the same sub-block title a second time, consolidate the content into a single paragraph instead."
  ],

  "one_sentence_summary": "Brief sidebar-list summary (≤20 words) of the room's purpose and what's there.",

  "room_mentions": ${ROOM_MENTIONS_FIELD_DESC}
}

${DC_SCALING_SECTION}`;
}

/**
 * Validate the connecting room response. Same shape as the entrance
 * response — `name` and `dm_notes` (array) required; `has_challenge`
 * boolean; `challenge_header` required only when has_challenge is true;
 * `door_preamble` optional.
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
export function validateConnectingRoomResponse(jsonString) {
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
 * The header is preserved in the array (when present) for forward
 * compatibility with future edit-form round-trips; the
 * RoomDescription template currently doesn't render the header slot
 * (the room number/name h3 is the heading).
 *
 * @param {object} data parsed connecting room response
 * @returns {Array<{format: string, content: string}>}
 */
export function processConnectingRoomResponse(data) {
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
