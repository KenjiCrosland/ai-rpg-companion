/**
 * Key room prompt — generates a room that contains the "key" needed
 * to overcome a `requiresKey` obstacle elsewhere in the dungeon. The
 * "key" is broadly defined: a literal key, a lever, an item, an
 * NPC ally, a spell or piece of knowledge, a body part of a creature
 * the party defeats here (a drake-tooth, a horn, a venom-sac).
 *
 * Output shape (same 4-field pattern as the other audited room
 * types, with one type-specific tightening: the **The [Key Name].**
 * sub-block is required — that's the room's reason for existing):
 *
 *   name                 — descriptive room name reflecting the room's
 *                          actual function (a library, a hatchery, a
 *                          forge, a sleeping chamber, an apex's lair)
 *   door_preamble        — terse door states; omit when all unlocked
 *   read_aloud_opening   — 40-90 word boxed text; foreshadows the key
 *                          without explicitly naming it
 *   has_challenge        — boolean. TRUE when acquiring the key
 *                          requires a mechanic (skill check, combat,
 *                          puzzle, parley). FALSE when the key sits
 *                          plainly visible and the party can just
 *                          take it (rare; usually only when the
 *                          locked-room flow is its own challenge).
 *   challenge_header     — ≤8 word title naming the key acquisition's
 *                          character. Only when has_challenge.
 *   dm_notes             — array of paragraph strings. First
 *                          paragraph covers room overview + the key's
 *                          location. Required sub-block: **The [Key
 *                          Name].** Optional sub-blocks for guardians,
 *                          NPCs, secondary features.
 *   one_sentence_summary — sidebar summary, ≤20 words.
 *
 * Why this shape (vs. the old 14-field structure):
 *   The old prompt mandated lore_description + features_and_contents
 *   + additional_notes + key_explanation + key_location +
 *   key_acquisition + failure_consequences + key_circumvention +
 *   key_acquisition_dm + TWO read-aloud blocks. The model produced
 *   ~10 DM paragraphs per room — a wall of overlapping content.
 *   Published-adventure key rooms are 1-3 paragraphs with bolded
 *   sub-blocks. The new shape collapses the duplicated slots.
 *
 * KEY TYPES (use to ground the model's choice):
 *
 *   1. LITERAL KEY — a metal key, a bone key, an etched plate
 *   2. LEVER / MECHANISM — a wheel, a pull-chain, a sequence of
 *      pressure plates that opens the obstacle from this room
 *   3. ITEM — a sympathy-binding object (a relic that resonates
 *      with the obstacle's lock; an artifact whose touch dissolves
 *      a ward)
 *   4. ALLY NPC — a person who can open the way (a captive
 *      keeper, a sympathetic spirit, the obstacle's original owner)
 *   5. KNOWLEDGE — a spoken phrase, a glyph copied from a wall,
 *      a chant the party learns by reading a tablet
 *   6. APEX-PART — a body part of the apex monster the party
 *      defeats here (a drake-tooth, a horn, a scale, a venom-sac).
 *      Strongest design pattern when the apex guards its own key.
 *   7. SPELL OR RITUAL — a one-shot magical effect taught here
 *      that the party then invokes at the obstacle
 *
 * The key TYPE should fit the obstacle's character and the dungeon's
 * register. A drake-bone catch (obstacle) pairs with a drake-tooth
 * (apex-part key). A wax-sealed door pairs with a flame (knowledge:
 * the rite of burning). A ward-stone pairs with the matching
 * counter-ward (item or spell).
 *
 * Difficulty tier (1-5) scales DCs/severity for the key's
 * acquisition. Stored on `dungeon.dimensions.difficulty`.
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

export function generateKeyRoomPrompt(
  dungeonOverview,
  shortDescription,
  obstacleDescription = '',
  formRoomName = '',
  formRoomSummary = '',
  npcString = '',
  difficulty = null,
  doorwayInfo = null,
  loreRole = null,
  loreLookup = '',
  connectedRoomsInfo = '',
  incomingMentions = '',
  featuredItems = '',
) {
  const tierLine = difficulty
    ? `Dungeon difficulty tier: ${difficulty} (1-5). If a challenge is generated for acquiring the key, scale DCs and failure severity to this tier.`
    : `Dungeon difficulty tier: not specified — default to T2 (DCs 12-14) if generating a challenge.`;

  const connectedSection = connectedRoomsInfo && connectedRoomsInfo !== ''
    ? `Connected rooms (rooms reachable from this one): ${connectedRoomsInfo}\n`
    : '';

  const doorwaySection = doorwayInfo
    ? `\nDOORWAYS IN THIS ROOM — authoritative door states from the map. The door_preamble field MUST report states EXACTLY as listed here. Do NOT invent locks, bars, DCs, force checks, or alternate bypasses for doors marked "unlocked door":
${doorwayInfo}
`
    : '';

  const obstacleSection = obstacleDescription
    ? `\nTHE OBSTACLE THE KEY OPENS (the gating mechanism this room's key defeats — use this to ensure the key thematically fits the obstacle):
${obstacleDescription}
`
    : `\nTHE OBSTACLE THE KEY OPENS: not yet described. The key should still be SPECIFIC and EVOCATIVE; the obstacle generated later will resolve to it.\n`;

  const npcSection = npcString
    ? `INHABITANTS PRESENT IN THE ROOM — incorporate them. If an NPC is present, they may BE the key-holder (an ally who unlocks the way) or guard the key. If MONSTER POPULATIONS are listed, USE THEM as the room's guardians/threat. The apex monster CAN appear here as the key-guarder OR when a part of the apex IS the key (a tooth, scale, horn) — use the apex as-is, do not invent a different creature.

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

  return `You are writing a KEY ROOM — a chamber that contains the "key" needed to overcome a structural obstacle elsewhere in the dungeon. The "key" is broadly defined: a literal key, a lever, an item, an ally NPC, a spoken phrase, a body part of a creature the party defeats here, or any other specific thing that unlocks the obstacle.

DUNGEON OVERVIEW:
${dungeonOverview}

KEY ROOM INFO:
Short description (size, exits, map-side notes): ${shortDescription}
${connectedSection}${loreRoleSection}${doorwaySection}${obstacleSection}${loreLookup}${incomingMentions}${featuredItems}${tierLine}
${roomNameSection}${roomSummarySection}${npcSection}

## KEY TYPES — pick one that fits both the obstacle and the dungeon's register

Vary the type — do NOT default to "a brass key in a chest" every time. Pick the type whose character matches BOTH the obstacle (above) AND the dungeon's makers:

1. LITERAL KEY — a metal key, a bone key, an etched plate. Common when the obstacle is a lock.
2. LEVER / MECHANISM — a wheel, a pull-chain, a sequence of pressure plates. Opens the obstacle remotely from this room.
3. ITEM — a relic that resonates with the obstacle's lock; an artifact whose touch dissolves a ward; a torch that thaws an ice barrier.
4. ALLY NPC — a person who can open the way: a captive keeper bargained free, a sympathetic spirit, the obstacle's original owner waiting here.
5. KNOWLEDGE — a spoken phrase, a glyph copied from a wall, a chant learned by reading a tablet. The party CARRIES the knowledge to the obstacle.
6. APEX-PART — a body part of the apex monster the party defeats here (a drake-tooth, a horn, a scale, a venom-sac). Strong design pattern: defeating the apex YIELDS the key. The apex guards its own solution.
7. SPELL OR RITUAL — a one-shot magical effect taught here that the party then invokes at the obstacle.

The key TYPE should mirror the obstacle's character. A drake-bone catch (obstacle) pairs with a drake-tooth (apex-part key). A wax-sealed door pairs with the rite of burning (knowledge). A sympathy-warded door pairs with a sympathetic item.

## REGISTER FIDELITY — respect the dungeon's established context

The dungeon overview establishes the dungeon's material, lighting, inhabitants, and construction register. The key room INHERITS that register:

- LIGHTING: ambient/natural where the overview establishes it.
- CONSTRUCTION: matches the dungeon's makers.
- KEY MATERIAL: matches the dungeon's makers AND the obstacle's character. A monastic order's key is bone or wax-pressed; a drake-burrow's key is a tooth or horn; a wizard's lab's key is a sympathetic item or a learned phrase.

## CHALLENGE — usually present, scale to tier

has_challenge is typically TRUE for key rooms; acquiring the key is the challenge. Scenarios:

- The key is GUARDED (a creature, an NPC who won't give it up, a ward that triggers on touch)
- The key requires SKILL to acquire (a puzzle, a high climb to reach a high shelf, a riddle on a sigil that names where the key is)
- The key requires TRADE (parley with the holder, an offering left, a debt acknowledged)
- The key requires DEFEAT (the apex's part — taken from the body)

has_challenge = FALSE only when the key sits plainly visible in an empty room and acquiring it is the party simply picking it up (rare and usually unsatisfying; reserve for when the obstacle itself is the dungeon's main challenge).

## BOLDING RULES

Use **markdown bold** ONLY for:
1. Creature names when first introduced (e.g., **drake-warden**, **fenn-scucca brood**)
2. Character names when first introduced
3. Feature sub-block titles at the START of an optional dm_notes paragraph, formatted as: **Feature Name.** followed by description

DO NOT bold game mechanics keywords (DCs, skill names), action verbs, or generic phrases.

## CROSS-REFERENCE FIDELITY — use the LORE-LOCATION LOOKUP

When dm_notes references other parts of the dungeon (where the obstacle this key opens lives), references MUST resolve to area numbers via the LORE-LOCATION LOOKUP above. Lore-locations not in the lookup are atmospheric only.

The OBSTACLE the key opens may also resolve to an area number — when describing the key's purpose, say "the key opens the obstacle in area X" rather than "the key opens the obstacle elsewhere." If the obstacle's area is not in the lookup, use general descriptive language.

${CROSS_ROOM_REFERENCES_SECTION}

## WHAT DOES NOT GO IN dm_notes

Three categories are owned by other fields or sections:

1. EXIT INVENTORY. The read-aloud names visible directions; door_preamble handles door states. dm_notes never lists exits.

2. SECRET DOORS AND THEIR MECHANICS. A separately-generated **Secret Door** notes section gets appended with canonical discovery/opening mechanics. dm_notes never mentions secret doors and NEVER creates a **Secret Door Trigger** or **Hidden Passage** feature sub-block.

3. DOOR MATERIAL. "Wooden door," "stone door" belong in the read-aloud (when notable). dm_notes treats doors by area number only.

## OUTPUT FORMAT

Return STRICT JSON (no prose, no commentary, no code fences):

{
  "name": "A 1-4 word descriptive name reflecting the room's character AND its function (e.g., 'The Reading Hall,' 'Brothers' Forge,' 'The Drake's Lair,' 'Echo-Chamber,' 'The Lever-Plinth'). Avoid generic 'Key Room' or 'Treasure Vault.' The name should fit the dungeon's lore.",

  "door_preamble": ${DOOR_PREAMBLE_FIELD_DESC},

  "read_aloud_opening": "Boxed text the DM reads when the party enters. 40-90 words, present-tense, sensory. Describe the room's character and atmosphere. Foreshadow the key's presence (a shape on a pedestal, a creature pacing, an NPC waiting, a glow from a far alcove) WITHOUT explicitly identifying it as 'the key' — let the players discover its purpose through investigation. ${READ_ALOUD_NO_DOORWAY_INVENTORY_RULE} ${READ_ALOUD_SHOW_DONT_TELL_DIMENSIONS_RULE} NO mechanics, NO DM hints. Avoid generic material adjectives unless notable.",

  "has_challenge": true,

  "challenge_header": "≤8 word title naming the key acquisition's character (e.g., 'The Drake's Tooth,' 'The Riddle of the Glyph,' 'Bargain with the Spirit'). Omit this key entirely if has_challenge is false.",

  "dm_notes": [
    "First paragraph (REQUIRED). 60-150 words. Covers: dimensions, the room's character (function/feel), the key's TYPE (from the list above), where in the room the key is located, and how the room relates to the obstacle this key opens. Mention any visible inhabitants here (the apex pacing, the NPC waiting, the bound spirit). Do NOT put the key's full identity in this paragraph — that goes in the **The [Key Name].** sub-block.",
    "Second paragraph (REQUIRED). **The [Key Name].** Bolded inline title with a specific key name (e.g., **The Drake-Tooth.**, **The Iron Lever.**, **Brother Galen's Promise.**, **The Burning-Phrase.**). Description follows. Cover: WHAT the key is (its specific identity), HOW the party acquires it (combat tactic, skill check at tier-scaled DC, parley terms, puzzle solution), and the IMMEDIATE physical failure consequence if the attempt fails. 60-150 words.",
    "Subsequent paragraphs are OPTIONAL feature sub-blocks for specific items, guardian profiles if not covered above, secondary obstacles in the room, or NPC interactions. Each begins with a bolded inline title: **Feature Name.** Skip these if the first two paragraphs covered everything. EACH FEATURE SUB-BLOCK MUST HAVE A UNIQUE TITLE within dm_notes — do not emit the same **Title.** twice. If you find yourself writing the same sub-block title a second time, consolidate the content into a single paragraph instead."
  ],

  "one_sentence_summary": "Brief sidebar-list summary (≤20 words) of the room's character and the key it holds.",

  "room_mentions": ${ROOM_MENTIONS_FIELD_DESC}
}

## DC AND DAMAGE SCALING (when has_challenge is true)

- T1: DCs 10-12, saves DC 11-12, damage 1d4-2d6
- T2: DCs 12-14, saves DC 13-14, damage 2d6-3d8
- T3: DCs 14-16, saves DC 14-16, damage 3d8-5d8
- T4: DCs 16-18, saves DC 16-18, damage 5d8-8d10
- T5: DCs 18-20, saves DC 18-20, damage 8d10+

Failure consequences MUST be PHYSICAL and IMMEDIATE — observable to the whole table within seconds of the failed roll. The drake-warden bites for damage; the ward zaps for fire; the bound spirit grapples. NOT "the room becomes sad" or "the party feels watched."`;
}

/**
 * Validate the key room response. Same shape as the other room
 * prompts — `name`, `read_aloud_opening`, `has_challenge`, `dm_notes`
 * (array with at least 2 entries: overview + key sub-block),
 * `one_sentence_summary` required; `challenge_header` required only
 * when has_challenge; `door_preamble` optional.
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
export function validateKeyRoomResponse(jsonString) {
  return parseAndValidateRoom(jsonString, [
    d => validateRequiredKeys(d, [
      'name',
      'read_aloud_opening',
      'has_challenge',
      'dm_notes',
      'one_sentence_summary',
    ]),
    validateHasChallenge,
    d => validateDmNotes(d, 2),
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
 * @param {object} data parsed key room response
 * @returns {Array<{format: string, content: string}>}
 */
export function processKeyRoomResponse(data) {
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
