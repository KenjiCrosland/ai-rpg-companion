/**
 * Setback room prompt — generates rooms organized around a single
 * physical encounter that the party must defeat, avoid, or endure.
 * Traps, ambushes, environmental hazards, hostile creatures lying
 * in wait, contained dangerous substances.
 *
 * Output shape (same 4-field pattern as the other audited room
 * types, with one type-specific tightening: has_challenge is ALWAYS
 * true — the setback IS the room):
 *
 *   name                 — descriptive room name reflecting the
 *                          setback or the room's character ("The
 *                          Pit-Trap Crossing," "Drake-Kit Ambush,"
 *                          "Spore Drift")
 *   door_preamble        — terse door states; omit when all unlocked
 *   read_aloud_opening   — 40-90 word boxed text; foreshadows the
 *                          setback without spoiling its mechanic
 *                          (visible warning signs, atmospheric
 *                          tension, but never "you see a trap")
 *   has_challenge        — ALWAYS true
 *   challenge_header     — ≤8 word title naming the setback's
 *                          character ("The Pit-Trap," "Sprite
 *                          Ambush," "The Spore Cloud")
 *   dm_notes             — array of paragraph strings. First
 *                          paragraph covers room overview +
 *                          environmental setup. Subsequent sub-
 *                          blocks: the setback mechanic, avoidance
 *                          options, aftermath/remediation.
 *   one_sentence_summary — sidebar summary, ≤20 words.
 *
 * Why this shape (vs. the old 9-field structure):
 *   The old prompt mandated room_purpose + setback_explanation +
 *   avoidance_checks (array of paragraph items) + overcoming_setback
 *   + consequences_of_failure + TWO read-aloud blocks (room +
 *   setback-occurs). The setback ended up taking 250-400+ words of
 *   DM-side content per room. Published-adventure traps and
 *   ambushes are 80-200 words. The new shape collapses overlapping
 *   slots and uses the standard sub-block convention.
 *
 * SETBACK TYPES (use to ground the model's choice):
 *
 *   1. MECHANICAL TRAP — pit, dart, swinging blade, pressure plate,
 *      falling block. Set by the dungeon's makers, may have aged.
 *   2. ENVIRONMENTAL HAZARD — collapsing floor, flooding, fire,
 *      toxic gas, freezing cold, vacuum. Often passive, triggered
 *      by entry or specific actions.
 *   3. AMBUSH — creatures lying in wait (from npcString assignment).
 *      Concealed, charge or attack from cover on detection.
 *   4. CURSE / WARD — magical effect triggered on entry, interaction,
 *      or after a delay. Often tied to the dungeon's makers.
 *   5. CONTAINED SUBSTANCE — toxic, explosive, hallucinogenic,
 *      acidic material the party encounters by movement or touch.
 *   6. LIVING HAZARD — vegetation, oozes, fungus, vermin swarms
 *      that don't actively pursue but threaten passage.
 *   7. ENVIRONMENTAL ELEMENTAL — lightning, water-surge, fire,
 *      ice from the dungeon's natural processes (the ember-vein
 *      flares; the bog-water rises; the sulfur-vent vents).
 *
 * Difficulty tier (1-5) scales DCs AND damage AND severity. Per
 * the danger-tier convention: physical and observable; severity
 * scales by tier, not effect type. The fire-snake bites and burns
 * at every tier — at T5, the burn keeps spreading.
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

export function generateSetbackRoomPrompt(
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
  incomingContentSeeds = '',
) {
  const tierLine = difficulty
    ? `Dungeon difficulty tier: ${difficulty} (1-5). Scale the setback's DCs, damage, and the severity of physical consequences to this tier.`
    : `Dungeon difficulty tier: not specified — default to T2 (DCs 12-14, 2d6 damage).`;

  const connectedSection = connectedRoomsInfo && connectedRoomsInfo !== ''
    ? `Connected rooms (rooms reachable from this one): ${connectedRoomsInfo}\n`
    : '';

  const doorwaySection = doorwayInfo
    ? `\nDOORWAYS IN THIS ROOM — authoritative door states from the map. The door_preamble field MUST report states EXACTLY as listed here. Do NOT invent locks, bars, DCs, force checks, or alternate bypasses for doors marked "unlocked door":
${doorwayInfo}
`
    : '';

  const npcSection = npcString
    ? `INHABITANTS PRESENT IN THE ROOM — incorporate them. If MONSTER POPULATIONS are listed, they ARE the ambushers/threat in this room (do not invent a different creature; do not promote tier). If a named NPC is present, use that character's identity from the overview.

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

  return `You are writing a SETBACK room — a single-encounter chamber in a D&D 5e dungeon organized around a physical setback the party must defeat, avoid, or endure. A trap, an ambush, an environmental hazard, a contained substance, a living hazard. The setback is the room's purpose; the room exists to deliver the encounter.

DUNGEON OVERVIEW:
${dungeonOverview}

SETBACK ROOM INFO:
Short description (size, exits, map-side notes): ${shortDescription}
${connectedSection}${loreRoleSection}${doorwaySection}${loreLookup}${incomingMentions}${incomingContentSeeds}${featuredItems}${tierLine}
${roomNameSection}${roomSummarySection}${npcSection}

## SETBACK TYPES — pick one that fits the dungeon

Vary the type — do NOT default to a pit-trap or spike-trap every time. Pick the setback whose character matches the dungeon's makers and natural processes:

1. MECHANICAL TRAP — pit, dart, swinging blade, pressure plate, falling block. Set by the dungeon's tool-using makers.
2. ENVIRONMENTAL HAZARD — collapsing floor, flooding, fire, toxic gas, freezing cold, sudden vacuum. Passive, triggered by entry or specific action.
3. AMBUSH — creatures lying in wait. USE the assigned monsters from INHABITANTS PRESENT above; do not invent a different ambush species.
4. CURSE OR WARD — magical effect triggered on entry, interaction, or after a delay. Tied to the dungeon's lore.
5. CONTAINED SUBSTANCE — toxic, explosive, hallucinogenic, acidic material; danger arrives via movement or touch.
6. LIVING HAZARD — vegetation, oozes, fungus, vermin swarms that don't pursue but threaten passage through the room.
7. ENVIRONMENTAL ELEMENTAL — lightning, water-surge, fire, ice from the dungeon's natural processes (the ember-vein flares; the bog-water rises).

A drake-burrow's setbacks lean toward AMBUSH or LIVING HAZARD (their own kin or thorn-walls). A monastic order's lean toward MECHANICAL TRAP or CURSE/WARD (deliberate engineering). A volcanic dungeon leans toward ENVIRONMENTAL ELEMENTAL. Match the makers.

## PHYSICAL + IMMEDIATE + OBSERVABLE — the danger-tier rule

The setback's effect MUST be physical (damage, condition, position change), immediate (resolves within seconds of failure), and observable to the whole table (everyone can see what happened). The fire snake bites and burns. The pit drops. The blade strikes. The gas chokes.

DO NOT write interior or abstract effects: memory-loss, name-theft, "the party becomes confused," "the room remembers the party," "a sense of dread." These are not setbacks; they are mood. Mood belongs in atmospherics, not in the encounter mechanic.

SEVERITY SCALES BY TIER, NOT EFFECT TYPE. The same setback type can fit every tier — at T1 the pit is 10 feet deep; at T5 it's 40 feet deep with spikes and a guardian below. The pit is still a pit.

## CHALLENGE — always present

has_challenge is ALWAYS true for setback rooms. The setback IS the room.

## REGISTER FIDELITY — respect the dungeon's established context

- LIGHTING: ambient/natural where the overview establishes it; the setback may add a brief flash (lightning strike, fire) but installed lighting needs a specific in-fiction reason.
- CONSTRUCTION: setbacks built into the dungeon match the makers. A drake-burrow's "trap" is a rolling stone or a clutch-warmed ledge that gives way, not a swinging-blade pendulum.
- TRIGGER: the setback's trigger should make sense for who built or birthed it. Pressure-plate traps require tool-makers. Living hazards just BE.

## BOLDING RULES

Use **markdown bold** ONLY for:
1. Creature names when first introduced (e.g., **fenn-scucca**, **drake-kit swarm**)
2. Character names when first introduced
3. Feature sub-block titles at the START of an optional dm_notes paragraph, formatted as: **Feature Name.** followed by description

DO NOT bold game mechanics keywords (DCs, skill names), action verbs, or generic phrases.

## CROSS-REFERENCE FIDELITY — use the LORE-LOCATION LOOKUP

When dm_notes references other parts of the dungeon (where remediation lies, where the trap's owner is), references MUST resolve to area numbers via the LORE-LOCATION LOOKUP above. Lore-locations not in the lookup are atmospheric only.

${CROSS_ROOM_REFERENCES_SECTION}

## WHAT DOES NOT GO IN dm_notes

Three categories are owned by other fields or sections:

1. EXIT INVENTORY. The read-aloud names visible directions; door_preamble handles door states. dm_notes never lists exits.

2. SECRET DOORS AND THEIR MECHANICS. A separately-generated **Secret Door** notes section gets appended with canonical discovery/opening mechanics. dm_notes never mentions secret doors and NEVER creates a **Secret Door Trigger** or **Hidden Passage** feature sub-block.

3. DOOR MATERIAL. "Wooden door," "stone door" belong in the read-aloud (when notable). dm_notes treats doors by area number only.

## OUTPUT FORMAT

Return STRICT JSON (no prose, no commentary, no code fences):

{
  "name": "A 1-4 word descriptive name reflecting the setback's character or the room (e.g., 'The Pit-Trap Crossing,' 'Drake-Kit Ambush,' 'Spore Drift,' 'The Singing Brine,' 'The Iron Pendulum'). Avoid generic 'Setback Room' or 'Trap Room.'",

  "door_preamble": ${DOOR_PREAMBLE_FIELD_DESC},

  "read_aloud_opening": "Boxed text the DM reads when the party enters. 40-90 words, present-tense, sensory. FORESHADOW the setback without spoiling its mechanic — describe warning signs (a faint hiss from a vent; bones at the edge of a flagstone; scratch-marks on the ceiling) but do NOT tell the players 'you see a trap' or 'creatures lie in wait.' Players read the warnings; the DM tells them what's there when it triggers. ${READ_ALOUD_NO_DOORWAY_INVENTORY_RULE} ${READ_ALOUD_SHOW_DONT_TELL_DIMENSIONS_RULE} NO mechanics, NO DM hints.",

  "has_challenge": true,

  "challenge_header": "≤8 word title for the setback (e.g., 'The Pit-Trap,' 'Sprite Ambush,' 'The Spore Cloud,' 'The Pendulum Blade').",

  "dm_notes": [
    "First paragraph (REQUIRED). 80-150 words. Covers: dimensions, the room's environmental setup, the setback's TYPE (from the list above), and the trigger condition (entering the room, stepping on a specific flagstone, touching an object, opening a door, etc.). The setback is in PLACE before the party arrives — describe it as a feature the room already has, not as something inserted in response to the party.",
    "Second paragraph (REQUIRED). **The [Setback Name].** Bolded inline title. Description follows. Cover: the mechanic (what attack roll/skill check the players need to make, against what DC), the IMMEDIATE physical consequence on failure (damage, position, condition — observable to the whole table), and the duration/spread (does the trap fire once and reset? does the fire keep burning? does the ambush press the attack?). 80-150 words.",
    "Third paragraph (OPTIONAL). **Avoidance.** Bolded inline title. Description follows. Cover 2-3 specific actions the party can take to bypass or lessen the setback BEFORE triggering it: an Investigation/Perception roll to spot the trigger, a specific maneuver (skirting the edge of the room, leaping the pit), an item that defuses the threat. Each option has a DC scaled to tier. Skip this paragraph if avoidance is identical to the primary defeat method (e.g., for ambushes, where the party fights or flees).",
    "Fourth paragraph (OPTIONAL). **Aftermath.** Bolded inline title. Description follows. ONLY include when the setback has CONTINUING consequences past the encounter (a poisoned character needs an antitoxin, a falling block traps a party member, a curse persists). Skip when the encounter resolves cleanly. 40-80 words."
  ],

  "one_sentence_summary": "Brief sidebar-list summary (≤20 words) of the setback's character and trigger.",

  "room_mentions": ${ROOM_MENTIONS_FIELD_DESC}
}

## DC AND DAMAGE SCALING

- T1: DCs 10-12, saves DC 11-12, damage 1d4-2d6, conditions short (1 round to 1 minute)
- T2: DCs 12-14, saves DC 13-14, damage 2d6-3d8, conditions 1 minute
- T3: DCs 14-16, saves DC 14-16, damage 3d8-5d8, conditions 1-10 minutes
- T4: DCs 16-18, saves DC 16-18, damage 5d8-8d10, conditions 10+ minutes
- T5: DCs 18-20, saves DC 18-20, damage 8d10+, conditions persistent until cured

Failure consequences MUST be PHYSICAL, IMMEDIATE, and OBSERVABLE. "The party takes 3d6 damage" is right. "The party feels uneasy" is wrong. "A character is petrified for 1 minute" is right. "A character forgets one personal memory" is wrong.`;
}

/**
 * Validate the setback room response. Same shape as the other room
 * prompts — `name`, `read_aloud_opening`, `has_challenge` (always
 * true), `challenge_header` (always required), `dm_notes` (array
 * with at least 2 entries — overview + setback), `one_sentence_summary`
 * required; `door_preamble` optional.
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
export function validateSetbackRoomResponse(jsonString) {
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
 *   3. challenge_header (header)
 *   4. dm_notes[0..n] (paragraph each)      — one entry per paragraph
 *
 * @param {object} data parsed setback room response
 * @returns {Array<{format: string, content: string}>}
 */
export function processSetbackRoomResponse(data) {
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
