/**
 * Secret room prompt — generates the room behind a secret door. The
 * payoff for finding the door: a hidden cache, sealed knowledge,
 * unseen ally, ritual chamber, shortcut, etc.
 *
 * Output shape (same 4-field pattern as entrance / connecting):
 *
 *   name                 — descriptive room name (Drake-Kin Memorial,
 *                          Cache of Bone-Singing, etc.)
 *   door_preamble        — usually empty for secret rooms (the secret
 *                          door is owned by the source room's notes).
 *                          Present only if THIS secret room has its
 *                          own additional secret doorways onward.
 *   read_aloud_opening   — 40-80 word boxed text describing the
 *                          chamber as the party steps through.
 *   has_challenge        — boolean. FALSE for the common case (the
 *                          room is the reward); TRUE for trap
 *                          chambers, sealed prisoners, ward-bound
 *                          rooms where engagement is the challenge.
 *   challenge_header     — ≤8 word title, only when has_challenge.
 *   dm_notes             — array of paragraph strings. First
 *                          paragraph covers contents, brief lore
 *                          reason ("why is this hidden"), inhabitants
 *                          and dimensions. Optional subsequent
 *                          paragraphs are feature sub-blocks for
 *                          specific items, encounters, or interactions.
 *   one_sentence_summary — sidebar summary, ≤20 words.
 *
 * Why this shape (vs. the old 7-field structure):
 *   The old prompt mandated lore_description + features_and_contents
 *   + interactive_elements + additional_notes as four separate DM-
 *   side paragraphs. The model produced 4-5 paragraphs of overlapping
 *   content. Published-adventure secret rooms are typically 1-2
 *   paragraphs — name + brief contents + the reward. The new shape
 *   collapses the overlapping slots and lets the optional feature
 *   sub-blocks carry any specific interactive elements (the locked
 *   chest, the strange apparatus) as their own block instead of
 *   stuffing them into a generic "interactive_elements" paragraph.
 *
 * Difficulty tier (1-5) scales DCs/severity if has_challenge is true
 * (trap chambers etc.). Stored on `dungeon.dimensions.difficulty`.
 */

import {
  CROSS_ROOM_REFERENCES_SECTION,
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

export function generateSecretRoomPrompt(
  dungeonOverview,
  roomDescription,
  connectedRoomsInfo = '',
  secretDoorDetails = '',
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

  const secretDoorSection = secretDoorDetails
    ? `\nSECRET DOOR (the door the party used to enter this room — already documented in the source room's notes; do NOT re-describe its discovery or opening mechanics in this room's output):
${secretDoorDetails}
`
    : '';

  const npcSection = npcString
    ? `NPC present in the room — incorporate them into the read-aloud and dm_notes. If this NPC is the dungeon's boss or a powerful entity, present them as a weakened version, projection, illusion, or avatar (a "final boss preview") rather than the full encounter.

NPC details:
${npcString}
`
    : '';

  const roomNameSection = formRoomName
    ? `User-provided room name (use verbatim): ${formRoomName}\n`
    : '';
  const roomSummarySection = formRoomSummary
    ? `User-provided summary (incorporate into the room): ${formRoomSummary}\n`
    : '';

  // LORE ROLE: when this secret room was assigned a named place from
  // the overview by the lore-assignment pass, tell the model so the
  // room generates with that identity.
  const loreRoleSection = loreRole
    ? `\nLORE ROLE: This secret room corresponds to "${loreRole}" from the dungeon's overview prose. The room generates AS that named place — its name, character, contents, and the player-facing payoff align with what the overview says about "${loreRole}".\n`
    : '';

  return `You are writing a SECRET room — the hidden chamber behind a secret door in a D&D 5e dungeon. The secret room is the payoff for finding the door; it contains a reward, a hidden truth, a sealed thing, or another specific element that justified its concealment.

DUNGEON OVERVIEW:
${dungeonOverview}

SECRET ROOM INFO:
Short description (size, exits, map-side notes): ${roomDescription}
${connectedSection}${loreRoleSection}${doorwaySection}${secretDoorSection}${loreLookup}${incomingMentions}${featuredItems}${tierLine}
${roomNameSection}${roomSummarySection}${npcSection}
## REGISTER FIDELITY — respect the dungeon's established context

The dungeon overview establishes the dungeon's material, lighting, inhabitants, and construction register. The secret room INHERITS that register and must not contradict it:

- LIGHTING: if the overview describes ambient/natural light (ember-glass veins, lava heat, daylight from holes, bioluminescent fungus), do NOT invent torches, sconces, braziers, or other installed lighting unless the room's hidden inhabitants would have installed them and the room's lore explains why.
- CONSTRUCTION: if the dungeon was excavated or grown by non-tool-using inhabitants (drakes, oozes, fungi), do NOT invent carpentry, masonry, or other tool-marks unless someone specifically prepared this secret room (e.g., a human refugee hiding in a drake burrow may have brought in a cot and a lantern, but the WALLS are still the drake-kin's claw-scored stone).
- FURNITURE AND OBJECTS: match the inhabitants AND the room's purpose. A drake-kin memorial holds bones and ember-glass shards, not tapestries. A scholar's hidden vault holds books and an inkwell, not a smith's anvil.

## SECRET ROOM TYPES — pick one that fits the dungeon

Most secret rooms have ONE primary purpose. Do not stack multiple types into one room. Pick the type that the dungeon overview and the secret door (above) most plausibly justify:

1. TREASURE CACHE — concealed loot. Gold, gems, weapons, magic items. The most common type; works in most dungeon registers.
2. FORBIDDEN KNOWLEDGE — books, scrolls, inscriptions, a single tablet. The room was hidden to keep knowledge from leaving.
3. HIDDEN ALLY — an NPC who chose to hide here. Could be a refugee, a deserter, a fugitive who knows the dungeon.
4. SEALED PRISONER — a bound creature, an imprisoned soul, a captured rival. Often has_challenge = TRUE if the party can free or interact with the prisoner.
5. RITUAL CHAMBER — used for rites the inhabitants needed to conceal. Altar, sigils, ritual remnants. Often has lore implications for the dungeon.
6. SECRET SHORTCUT — alternate route to another part of the dungeon. The reward is positional, not material.
7. MEMORIAL / SHRINE — hidden veneration of a forbidden figure (dead leader, exiled saint, ancestor). Often empty of treasure but rich in lore.
8. SAFE HAVEN — a resting space the current inhabitants don't know about. Could be a stocked supply cache, a sleeping nook, an escape route's staging point.
9. TRAP CHAMBER — meant to ensnare those who find the secret door. has_challenge = TRUE. The "reward" is the challenge itself.
10. LORE VAULT — historical archives, dynastic records, sealed correspondence. Often hidden because what's in here is politically dangerous.

If the secret door notes (above) describe a thematic clue (a drake-bone catch, a hidden recess of bone pegs, a particular grave-marker), make sure the room's primary type fits that clue — the door's mechanism and the room's purpose should feel like one design.

## CHALLENGE DECISION

Secret rooms are USUALLY rewards — has_challenge defaults to FALSE. The party found the door; the room is what they get. Setting has_challenge = TRUE should be reserved for:

- TRAP CHAMBER type (the room is the trap)
- SEALED PRISONER type when releasing or engaging the prisoner is itself the challenge
- Wards or guardians the original builders left to protect what's hidden

Do NOT add a challenge to a treasure cache or lore vault by default. "There's a locked chest in the corner" can be a brief feature sub-block, not a full challenge.

## BOLDING RULES

Use **markdown bold** ONLY for:
1. Creature names when first introduced (e.g., **the bound efreet**, **drake-kit guardian**)
2. Character names when first introduced (e.g., **Zallithrax**)
3. Feature sub-block titles at the start of an optional dm_notes paragraph, formatted as: **Feature Name.** followed by description

DO NOT bold game mechanics keywords, DCs, action verbs, or generic phrases. Plain text carries those.

## CROSS-REFERENCE FIDELITY — use the LORE-LOCATION LOOKUP

When dm_notes (or any field) references other parts of the dungeon in a way the party can act on (a route, a destination, a bypass, a journal's directions), the references MUST resolve to actual area numbers on the map.

- If a lore-location appears in the LORE-LOCATION LOOKUP above, USE the listed area number when referencing it. Navigational content in the room (a survivor's notes, a scribbled map, a guide's directions) should give the area number alongside or instead of the lore name ("a passage to the bone-pile chamber, area 7" or simply "a passage to area 7").
- If a lore-location is NOT in the lookup, do NOT promise navigation to it. Either reference it as backstory only ("the notes describe the route the writer took to escape," not "a fissure behind the stalactite leads to the inner chamber"), or omit the navigation detail entirely.

The LORE-LOCATION LOOKUP is the source of truth. If it's empty (no assignments were made), treat any lore-location named in the overview as atmospheric-only by default.

${CROSS_ROOM_REFERENCES_SECTION}

## WHAT DOES NOT GO IN dm_notes

Three categories are explicitly owned by OTHER fields or by separately-generated sections. Putting them in dm_notes duplicates or contradicts the canonical source:

1. THE SECRET DOOR'S DISCOVERY OR OPENING MECHANICS. The secret door is documented in the source room's Secret Door notes (shown above as context). dm_notes never re-describes how the party found or opened the door.

2. EXIT INVENTORY. The read-aloud already names visible directions; door_preamble (if any) handles door states. dm_notes never lists exits.

3. DOOR MATERIAL. "Wooden door," "stone door," etc. belong to the read-aloud and only when notable. dm_notes treats doors by area number only.

If you're about to write something that fits one of the three categories above, STOP and remove it. The information belongs elsewhere.

## OUTPUT FORMAT

Return STRICT JSON (no prose, no commentary, no code fences):

{
  "name": "${formRoomName ? formRoomName : 'A descriptive 1-4 word name for the secret room. Should reflect the room\'s primary type and the dungeon\'s register (e.g., \"Drake-Kin Memorial,\" \"Bone-Singing Vault,\" \"Hidden Forge-Cache,\" \"Sealed Reliquary\"). Avoid generic names like \"Secret Room.\"'}",

  "door_preamble": "Usually empty/omitted for secret rooms — the secret door the party used is documented in the source room's notes, not here. Include door_preamble ONLY if this secret room has its OWN additional doorways onward, using the same format as other room prompts. Most secret rooms are dead-end chambers; for those, pass empty string or omit this key.",

  "read_aloud_opening": "Boxed text the DM reads when the party steps through the secret door into this room. 40-80 words, present-tense, sensory. Describe what the party SEES — the chamber's character, its primary contents, the atmosphere. ${READ_ALOUD_NO_DOORWAY_INVENTORY_RULE} ${READ_ALOUD_SHOW_DONT_TELL_DIMENSIONS_RULE} NO mechanics, NO DM hints, NO addressing the DM. Avoid generic material adjectives like 'wooden chest' unless the material is genuinely notable.",

  "has_challenge": false,

  "challenge_header": "≤8 word title for the challenge. Omit this key entirely if has_challenge is false.",

  "dm_notes": [
    "Array of strings. Each string is ONE paragraph. The first paragraph covers: dimensions, the room's PRIMARY contents (the reward — what the party finds), a brief lore note explaining WHY this is hidden (1-2 sentences, woven inline), and any inhabitants. For most secret rooms 80-150 words is right; for very simple caches 50-80 is fine; for rooms with complex inhabitants or ritual elements up to 200 is acceptable. If has_challenge: also covers the mechanic (how it works, skills, DCs scaled to tier, IMMEDIATE physical failure consequence, optional bypass woven inline).",
    "Subsequent paragraphs are OPTIONAL feature sub-blocks — for specific interactive elements that warrant their own block (a locked chest, a strange apparatus, an inscription, an NPC interaction). Each begins with a bolded inline title: **Feature Name.** Description follows in regular text. Examples: '**The Sealed Chest.** A character who picks the lock...', '**The Reliquary.** Removing the relic from its stand triggers...', '**Zallithrax\\'s Refuge.** The bedroll in the corner...'. Skip these if the first paragraph already covered everything. EACH FEATURE SUB-BLOCK MUST HAVE A UNIQUE TITLE within dm_notes — do not emit the same **Title.** twice. If you find yourself writing the same sub-block title a second time, consolidate the content into a single paragraph instead."
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

Failure consequences MUST be PHYSICAL and IMMEDIATE — observable to the whole table within seconds of the failed roll.`;
}

/**
 * Validate the secret room response. Same shape as the other room
 * prompts — `name`, `read_aloud_opening`, `has_challenge`, `dm_notes`
 * (array), `one_sentence_summary` required; `challenge_header`
 * required only when has_challenge; `door_preamble` optional.
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
export function validateSecretRoomResponse(jsonString) {
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
 * @param {object} data parsed secret room response
 * @returns {Array<{format: string, content: string}>}
 */
export function processSecretRoomResponse(data) {
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
    content.push({ format: 'paragraph', content: paragraph });
  }
  return content;
}
