/**
 * Purpose room prompt — generates rooms organized around a SPECIFIC
 * function: libraries, laboratories, forges, kitchens, armories,
 * treasuries, chapels, ritual chambers, hatcheries, observatories,
 * spinning halls, well-chambers, granaries, machine-rooms.
 *
 * Output shape (same 4-field pattern as entrance / connecting /
 * living / secret room, with one type-specific tightening:
 * SPECIFICITY — the function must be real and concrete, with named
 * tools, named books, named work-in-progress; not "ancient tomes"
 * and "strange apparatuses"):
 *
 *   name                 — descriptive room name reflecting both
 *                          function and dungeon character ("Library
 *                          of Silken Leaves," "Brothers' Forge,"
 *                          "Sprite-Hatchery")
 *   door_preamble        — terse door states; omit if all unlocked
 *   read_aloud_opening   — 40-80 word boxed text; the function is
 *                          immediately legible from what's in the
 *                          room
 *   has_challenge        — boolean. TRUE when workers/guardians are
 *                          PRESENT and HOSTILE, OR the
 *                          work-in-progress itself is dangerous (an
 *                          unstable experiment, a ward mid-ritual,
 *                          a contained beast), OR a guardian is
 *                          bound to the room. FALSE when empty,
 *                          dormant, or post-functional.
 *   challenge_header     — ≤8 word title, only when has_challenge
 *   dm_notes             — array of paragraph strings. First
 *                          paragraph covers the function, dimensions,
 *                          inhabitants (if any), and the SPECIFIC
 *                          contents (named tools, named books, named
 *                          work-in-progress). Optional subsequent
 *                          paragraphs are feature sub-blocks for
 *                          particular items, mechanisms, or
 *                          interactions.
 *   one_sentence_summary — sidebar summary, ≤20 words.
 *
 * Why this shape (vs. the old 9-field structure):
 *   The old prompt's example ("ancient tomes, some sealed with
 *   magical locks") was the template — generic content the model
 *   could fall back on regardless of the dungeon's actual setting.
 *   The mandatory interactive_element_* fields forced the model to
 *   invent one "Enchanted Tome" / "Glowing Artifact" per room. The
 *   new shape requires SPECIFIC content (THIS book on THIS shelf,
 *   THIS experiment on THIS bench) and makes interactive elements
 *   optional feature sub-blocks when warranted.
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

export function generatePurposeRoomPrompt(
  dungeonOverview,
  shortDescription,
  existingRooms = 'none',
  connectedRoomsInfo = '',
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
    ? `NPC present in the room — the user explicitly picked this NPC. They MUST appear by name in the read_aloud_opening or dm_notes; do NOT silently omit them. If this NPC is the dungeon's BOSS or a powerful entity unlikely to be working at this station, present them as a weakened version, projection, illusion, or avatar (a "final boss preview"), not the full encounter — but they MUST still appear. If this NPC reads as someone from OUTSIDE the dungeon (a questgiver, a townsperson, a relative the party was sent to investigate, an NPC whose context lives in the surrounding setting rather than this dungeon), incorporate them diegetically — a vision in the steam, a voice carried on a draft, a written note left here in their hand, a memory-echo touched in the cold, a sketched portrait on the wall, a sleeping form half-glimpsed in shadow — but they MUST still appear by name. Neither exception is a license to skip them.

NPC details:
${npcString}
`
    : '';

  const existingRoomsLine = existingRooms && existingRooms !== 'none'
    ? `\nEXISTING ROOMS in this dungeon (do NOT reuse these specific room names — pick a different one): ${existingRooms}\n`
    : '';

  const loreRoleSection = loreRole
    ? `\nLORE ROLE: This room corresponds to "${loreRole}" from the dungeon's overview prose. The room generates AS that named place — its name, character, function, contents, and the player-facing payoff align with what the overview says about "${loreRole}".\n`
    : '';

  return `You are writing a PURPOSE room — a D&D 5e dungeon room organized around a SPECIFIC FUNCTION: a library, laboratory, forge, kitchen, armory, treasury, chapel, ritual chamber, hatchery, observatory, spinning hall, well-chamber, granary, machine-room, or any other room designed for a particular activity.

DUNGEON OVERVIEW:
${dungeonOverview}

PURPOSE ROOM INFO:
Short description (size, exits, map-side notes): ${shortDescription}
${connectedSection}${loreRoleSection}${doorwaySection}${loreLookup}${incomingMentions}${featuredItems}${tierLine}${existingRoomsLine}
${npcSection}
## REGISTER FIDELITY — respect the dungeon's established context

The dungeon overview establishes the dungeon's material, lighting, inhabitants, and construction register. The purpose room INHERITS that register and must not contradict it:

- LIGHTING: if the overview describes ambient/natural light (ember-glass veins, lava heat, daylight from holes, bioluminescent fungus), do NOT invent torches, sconces, braziers, or other installed lighting unless the workers would have brought specific task-lighting (a candle at a workbench, a lantern hung on a chain over an anvil).
- CONSTRUCTION: if the dungeon was excavated or grown by non-tool-using inhabitants (drakes, oozes, fungi), the room's PURPOSE may be wholly different from what tool-using creatures would build. A drake-kin "hatchery" is a warm hollow with clutch-stones, not an incubator with thermometers. A fungal "library" is a chamber where memory-spores hang in clusters, not shelved books.
- TOOLS AND OBJECTS: must match BOTH the function AND the inhabitants. A monastic library has codices, ink-pots, lecterns, and reading-stones — NOT laboratory equipment. A goblin smithy has hammered scrap, leather aprons, a roaring forge of stolen coal — NOT a precision lathe.

## SPECIFICITY — name the work, not the category

The function of a purpose room is REAL. The model's default failure mode is to describe the room in generic category-terms ("ancient tomes," "strange apparatuses," "alchemical equipment") that could fit any dungeon. The new bar is SPECIFIC content:

- Not: "the shelves contain ancient tomes, some with magical wards"
- Yes: "the third shelf holds the Codex of Bleeding Letters, its cover bound with silver wire; beside it sits a half-copied page where Brother Calanthir was transcribing the river-oath verses before he was called away"

- Not: "a workbench cluttered with strange apparatuses"
- Yes: "a workbench bears a copper distillation coil mid-run, a half-glass of cloudy dew-gland tincture, and a notebook open to a page titled 'attempt 14 — the sprites again refused the offering'"

- Not: "an altar with ritual implements"
- Yes: "the altar holds a clay bowl filled with sprite-dew, three iron knives arranged by size, and a folded length of pilgrim-grey cloth stained with old blood at the cuff"

Pick TWO OR THREE specific elements. Each should imply WORK BEING DONE — who works here, what they're making, what they were doing yesterday, what they'll resume tomorrow. The function is a process, not a snapshot.

## CHALLENGE DECISION — do this first

has_challenge = TRUE when:
- Workers are PRESENT and HOSTILE (the smith and apprentices are at the forge; the brothers are at prayer)
- The work-in-progress is DANGEROUS to disturb (an unstable distillation, a half-completed binding, a hatching egg that will alert the brood)
- A guardian is bound to the room (a defending construct, a warded spirit)

has_challenge = FALSE when:
- The room is empty (workers on break, asleep elsewhere, in a different cycle)
- The function is dormant (the forge cold, the experiment abandoned)
- The room is post-functional (the library has been ransacked, the chapel is desecrated and silent)

Most purpose rooms during play are EMPTY (workers are on rotation in other areas). Default to has_challenge = FALSE unless the dungeon overview specifically puts workers here at this hour.

## BOLDING RULES

Use **markdown bold** ONLY for:
1. Creature names when first introduced (e.g., **drake-kit guardian**)
2. Character names when first introduced (e.g., **Brother Calanthir**, **Warden Elenharion**)
3. Feature sub-block titles at the START of an optional dm_notes paragraph, formatted as: **Feature Name.** followed by description

DO NOT bold game mechanics keywords (DCs, skill names), action verbs, or generic phrases.

## CROSS-REFERENCE FIDELITY — use the LORE-LOCATION LOOKUP

When dm_notes (or any field) references other parts of the dungeon in a way the party can act on (a route, a destination, a workflow that connects this room to another), the references MUST resolve to actual area numbers on the map.

- If a lore-location appears in the LORE-LOCATION LOOKUP above, USE the listed area number ("the finished tinctures are carried to area 9 for storage" or "the finished tinctures go to the cellar, area 9"). Actionable.
- If a lore-location is NOT in the lookup, treat it as atmospheric only. Do not promise navigation to it.

The LORE-LOCATION LOOKUP is the source of truth. If empty, default to atmospheric-only for any lore-location named in the overview.

${CROSS_ROOM_REFERENCES_SECTION}

## WHAT DOES NOT GO IN dm_notes

Three categories are owned by other fields or sections:

1. EXIT INVENTORY. The read-aloud already names visible directions; door_preamble handles door states. dm_notes never lists exits.

2. SECRET DOORS AND THEIR MECHANICS. A separately-generated **Secret Door** notes section gets appended with canonical discovery/opening mechanics. dm_notes never mentions secret doors and NEVER creates a **Secret Door Trigger** or **Hidden Passage** feature sub-block.

3. DOOR MATERIAL. "Wooden door," "stone door" belong to the read-aloud (when notable). dm_notes treats doors by area number only.

## OUTPUT FORMAT

Return STRICT JSON (no prose, no commentary, no code fences):

{
  "name": "A 1-4 word descriptive name that reflects BOTH the function AND the inhabitants/character (e.g., 'Library of Silken Leaves,' 'Brothers' Forge,' 'Sprite-Hatchery,' 'Inkwell Scriptorium,' 'Dew-Gland Distillery'). Avoid generic single-word names like 'Library' or 'Forge' if context allows a more evocative pairing. Avoid archaic opaque terms (no scriptorium-as-bare-word, narthex, pronaos).",

  "door_preamble": ${DOOR_PREAMBLE_FIELD_DESC},

  "read_aloud_opening": "Boxed text the DM reads when the party enters. 40-80 words, present-tense, sensory. The room's FUNCTION should be immediately legible from what's in the scene — the books, the workbench, the altar, the forge, the racked weapons. ${READ_ALOUD_NO_DOORWAY_INVENTORY_RULE} ${READ_ALOUD_SHOW_DONT_TELL_DIMENSIONS_RULE} If workers are present at the moment of entry, describe them as part of the scene. NO mechanics, NO DM hints, NO addressing the DM. Avoid generic material adjectives like 'wooden door' unless the material is genuinely notable.",

  "has_challenge": false,

  "challenge_header": "≤8 word title for the challenge (e.g., 'The Forge-Hot Smiths,' 'The Half-Bound Spirit'). Omit this key entirely if has_challenge is false.",

  "dm_notes": [
    "Array of strings. Each string is ONE paragraph. The first paragraph covers: dimensions, the room's function (who works here, what they make/do), and TWO OR THREE specific items/work-in-progress (named books, named tools, named experiments, named ritual remnants — not categories). Each specific item should imply ongoing work. If has_challenge: also covers the encounter or hazard mechanic (number of workers, behavior on detection, DCs scaled to tier, IMMEDIATE physical failure consequence — the smith hammers an alarm-bell, the experiment ruptures, the spirit pulls free). 100-200 words for the common case.",
    "Subsequent paragraphs are OPTIONAL feature sub-blocks — for specific items the players can examine in depth, NPC interactions, or mechanisms that warrant their own block. Each begins with a bolded inline title: **Feature Name.** Description follows. Examples: '**The Codex of Bleeding Letters.** A character who reads more than a page...', '**The Distillation Apparatus.** Disturbing the coil mid-run...', '**The Bound Spirit-Lamp.** The flame inside the lamp is a captive...'. Skip these if the first paragraph covered everything. EACH FEATURE SUB-BLOCK MUST HAVE A UNIQUE TITLE within dm_notes — do not emit the same **Title.** twice. If you find yourself writing the same sub-block title a second time, consolidate the content into a single paragraph instead."
  ],

  "one_sentence_summary": "Brief sidebar-list summary (≤20 words) of the room's function and current state.",

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
 * Validate the purpose room response. Same shape as the other room
 * prompts — `name`, `read_aloud_opening`, `has_challenge`, `dm_notes`
 * (array), `one_sentence_summary` required; `challenge_header`
 * required only when has_challenge; `door_preamble` optional.
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
export function validatePurposeRoomResponse(jsonString) {
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
 * @param {object} data parsed purpose room response
 * @returns {Array<{format: string, content: string}>}
 */
export function processPurposeRoomResponse(data) {
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
