/**
 * Living room prompt — generates dormitories, kitchens, common
 * rooms, sleeping warrens, campsites, mess halls, and other spaces
 * where the dungeon's inhabitants (current or former) eat, sleep,
 * gather, or otherwise live.
 *
 * Output shape (same 4-field pattern as entrance / connecting /
 * secret room, with one type-specific tightening: has_challenge is
 * conditional on inhabitants being PRESENT and HOSTILE in this
 * specific room, not merely on inhabitants existing in the dungeon):
 *
 *   name                 — descriptive room name (Drake-Kit Nest,
 *                          Spinners' Hearth, Brothers' Refectory)
 *   door_preamble        — terse door states; omit if all unlocked
 *   read_aloud_opening   — 40-80 word boxed text; the room reads as
 *                          inhabited even when empty (their leavings
 *                          tell the story)
 *   has_challenge        — boolean. TRUE when inhabitants are
 *                          PRESENT and HOSTILE in this specific room
 *                          (the party will fight or be detected on
 *                          entry). FALSE when the room is empty
 *                          (inhabitants away, asleep elsewhere, dead,
 *                          long-departed), or when inhabitants are
 *                          present but non-hostile (refugees,
 *                          prisoners, children, kin).
 *   challenge_header     — ≤8 word title, only when has_challenge
 *   dm_notes             — array of paragraph strings. First
 *                          paragraph covers contents, dimensions,
 *                          inhabitants (current or former), and what
 *                          they do here. Optional subsequent
 *                          paragraphs are feature sub-blocks for
 *                          specific items, NPC interactions, or
 *                          environmental elements.
 *   one_sentence_summary — sidebar summary, ≤20 words.
 *
 * Why this shape (vs. the old 9-field structure):
 *   The old prompt mandated lore_description + features_and_contents
 *   + interactive_element_lore + interactive_element_details +
 *   additional_notes as five separate DM-side paragraphs, plus an
 *   interactive_element_header. The model padded every living room
 *   with an invented "interactive element" (a glowing tome, a
 *   conspicuously ornate chest) even when the room's actual point
 *   was the inhabitants' daily life. The new shape lets the
 *   inhabitants carry the room and uses optional feature sub-blocks
 *   for genuine interactive elements when warranted.
 *
 * The old name guidance also said "1-2 words, simple, almost dull"
 * — that was wrong; it stripped life from rooms that should feel
 * specific to their inhabitants. The new guidance encourages
 * evocative inhabitant-centric names: "Spinners' Hearth," "Drake-Kit
 * Nest," "Brothers' Refectory" — not just "Kitchen" or "Bedroom."
 *
 * Difficulty tier (1-5) scales DCs/severity when has_challenge is
 * true. Stored on `dungeon.dimensions.difficulty`.
 */

export function generateLivingRoomPrompt(
  dungeonOverview,
  shortDescription,
  existingRooms = 'none',
  connectedRoomsInfo = '',
  npcString = '',
  difficulty = null,
  doorwayInfo = null,
  loreRole = null,
  loreLookup = '',
) {
  const tierLine = difficulty
    ? `Dungeon difficulty tier: ${difficulty} (1-5). If a challenge is generated (inhabitants present + hostile), scale DCs and failure severity to this tier.`
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
    ? `NPC present in the room — incorporate them into the read-aloud and dm_notes. If this NPC is the dungeon's boss or a powerful entity unlikely to be in a living quarters, present them as a weakened version, projection, illusion, or avatar (a "final boss preview"), not the full encounter.

NPC details:
${npcString}
`
    : '';

  const existingRoomsLine = existingRooms && existingRooms !== 'none'
    ? `\nEXISTING ROOMS in this dungeon (do NOT reuse these specific room names — pick a different one): ${existingRooms}\n`
    : '';

  const loreRoleSection = loreRole
    ? `\nLORE ROLE: This room corresponds to "${loreRole}" from the dungeon's overview prose. The room generates AS that named place — its name, character, contents, and the player-facing payoff align with what the overview says about "${loreRole}".\n`
    : '';

  return `You are writing a LIVING room — a space in a D&D 5e dungeon where the inhabitants (current or former) sleep, eat, gather, or otherwise live. Dormitories, kitchens, refectories, common rooms, sleeping warrens, hearth-halls, campsites, mess halls, parlors — any space organized around daily life rather than ritual, defense, or function.

DUNGEON OVERVIEW:
${dungeonOverview}

LIVING ROOM INFO:
Short description (size, exits, map-side notes): ${shortDescription}
${connectedSection}${loreRoleSection}${doorwaySection}${loreLookup}${tierLine}${existingRoomsLine}
${npcSection}
## REGISTER FIDELITY — respect the dungeon's established context

The dungeon overview establishes the dungeon's material, lighting, inhabitants, and construction register. The living room INHERITS that register and must not contradict it:

- LIGHTING: if the overview describes ambient/natural light (ember-glass veins, lava heat, daylight from holes, bioluminescent fungus), do NOT invent torches, sconces, braziers, or other installed lighting infrastructure unless the inhabitants are tool-users who would have installed them and the room's lore explains why.
- CONSTRUCTION: if the dungeon was excavated or grown by non-tool-using inhabitants (drakes, oozes, fungi, worms), do NOT invent carpentry, masonry, or other tool-marks. Their living spaces are nests, hollows, scrapes, beds of moss or fur — not bunks and tables.
- FURNITURE AND OBJECTS: match the inhabitants. A drake-kin nest has piled hides, gnawed bones, and clutch-warmth — NOT cots and lockers. A monastic refectory has long benches, wooden bowls, and a single candle — NOT thrones and tapestries. A goblin warren has heaps of stolen cloth and chittering young — NOT writing desks.

## ROOM-IS-INHABITED-EVEN-WHEN-EMPTY

A living room reads as inhabited even when no creature is currently in it. The inhabitants' LEAVINGS tell the story: rumpled bedding, food half-eaten, a tool dropped mid-use, a sketched plan unfinished, a child's toy on a hearthstone, a spitted carcass cooling. The read-aloud should make the inhabitants felt without naming them on the page — the DM can decide whether they're here, asleep, away, or dead.

When the room IS occupied at the moment of entry (NPC string above, or the dungeon's central activity puts them here), describe the inhabitants in the read-aloud as part of the scene and set has_challenge = TRUE if they would react hostilely.

## CHALLENGE DECISION — do this first

has_challenge = TRUE when, at the moment the party enters, inhabitants are PRESENT and HOSTILE — meaning the party will either fight, be detected, or have to immediately negotiate to avoid combat. The challenge is the encounter itself (skill check to sneak past, social roll to deceive, combat).

has_challenge = FALSE when:
- The room is empty (inhabitants away, asleep elsewhere, on rotation in another area, recently dead)
- Inhabitants are present but non-hostile (refugees, prisoners, kin who won't fight, children, the dying)
- Former inhabitants (long-departed, the room is now ruined or quiet)

Do NOT default to "every inhabited room has a fight." Many living spaces in real dungeons are empty during play — the inhabitants are working elsewhere, on patrol, asleep at a different hour. An empty barracks with rumpled bedding is more atmospheric and useful than an arbitrary combat encounter.

## BOLDING RULES

Use **markdown bold** ONLY for:
1. Creature names when first introduced in a paragraph (e.g., **goblin sentry**, **drake-kit**)
2. Character names when first introduced in a paragraph (e.g., **Brother Calanthir**)
3. Feature sub-block titles at the START of an optional dm_notes paragraph, formatted as: **Feature Name.** followed by description

DO NOT bold game mechanics keywords (DCs, skill names), action verbs, or generic phrases. Plain text carries those.

## CROSS-REFERENCE FIDELITY — use the LORE-LOCATION LOOKUP

When dm_notes (or any field) references other parts of the dungeon in a way the party can act on (a route, a destination, a guide's directions), the references MUST resolve to actual area numbers on the map.

- If a lore-location appears in the LORE-LOCATION LOOKUP above, USE the listed area number when referencing it ("the brothers go to area 12 at dawn-song" or "the brothers go to the scriptorium, area 12, at dawn-song"). Actionable.
- If a lore-location is NOT in the lookup, treat it as atmospheric only ("the air carries the bog-smell from outside"). Do not promise navigation to it.

The LORE-LOCATION LOOKUP is the source of truth. If empty, default to atmospheric-only for any lore-location named in the overview.

## WHAT DOES NOT GO IN dm_notes

Three categories are owned by other fields or sections:

1. EXIT INVENTORY. The read-aloud already names visible directions; door_preamble handles door states. dm_notes never lists exits.

2. SECRET DOORS AND THEIR MECHANICS. A separately-generated **Secret Door** notes section gets appended to this room with the canonical discovery/opening mechanics. dm_notes never mentions the secret door's location, finding mechanic, or opening mechanic — and NEVER creates a **Secret Door Trigger** or **Hidden Passage** feature sub-block. The door_preamble flagged its existence; that is the only mention dm_notes is allowed.

3. DOOR MATERIAL. "Wooden door," "stone door," etc. belong in the read-aloud (when notable). dm_notes treats doors by area number only.

If you're about to write something in one of these categories, STOP and remove it.

## OUTPUT FORMAT

Return STRICT JSON (no prose, no commentary, no code fences):

{
  "name": "A 1-4 word descriptive name reflecting the inhabitants and their use of the room (e.g., 'Drake-Kit Nest,' 'Spinners' Hearth,' 'Brothers' Refectory,' 'Warband Barracks'). The name should be specific to the inhabitants — not generic 'Kitchen' or 'Dormitory' if the inhabitants give it a character. Avoid archaic opaque terms (no scriptorium, narthex, pronaos).",

  "door_preamble": "Terse DM-side preamble describing door states. Use ONLY the door states from the DOORWAYS IN THIS ROOM section above. Reference rooms by their connected-room numbers. OMIT this key (pass empty string) if every doorway is 'open corridor' OR all 'unlocked door' and don't need flagging. For locked or secret doors, follow these formats:\\n- Character holds key: 'The door to area Z is locked, and [character name] has the only key.'\\n- Key hidden in a room: 'The door to area Z is locked; the key is hidden in area W.'\\n- Key from a key-room: 'The door to area Z is locked; the means to open it lies in area W, which itself requires the party to [solve the key-room's challenge in 1 short clause].'\\n- Secret door: 'There is a hidden doorway to area Z; see the Secret Door notes below.' Do NOT include a Perception DC for secret doors — the Secret Door notes section owns that.",

  "read_aloud_opening": "Boxed text the DM reads when the party enters. 40-80 words, present-tense, sensory. Describe the inhabited space — what the inhabitants have left behind, the room's daily-life character, atmosphere, light, sound, smell. Visible doorways/exits should be part of the scene; name directions naturally. If inhabitants ARE here at the moment of entry, describe them as part of the scene (what they're doing, where they are in the room). NO mechanics, NO DM hints, NO addressing the DM. Avoid generic material adjectives like 'wooden door' unless the material is genuinely notable.",

  "has_challenge": false,

  "challenge_header": "≤8 word title for the challenge (e.g., 'The Sleeping Patrol,' 'The Hearth-Bound Warband'). Omit this key entirely if has_challenge is false.",

  "dm_notes": [
    "Array of strings. Each string is ONE paragraph. The first paragraph covers: dimensions, the inhabitants (CURRENT or FORMER — name them, give their daily-life details, what they do here), what the party will find of interest (objects, leavings, clues). If has_challenge: also covers the encounter mechanic (number of inhabitants present, behavior on detection, skills to sneak past or deceive, DCs scaled to tier, IMMEDIATE physical failure consequence — they raise the alarm, they attack, they call for kin). 80-150 words for the common case; 150-220 if the room has an active encounter to set up.",
    "Subsequent paragraphs are OPTIONAL feature sub-blocks — for specific items, NPC interactions, or environmental elements that warrant their own block. Each begins with a bolded inline title: **Feature Name.** Description follows in regular text. Examples: '**Brother Galen\\'s Lost Fingers.** Among the bedding on the third cot...', '**The Hearth-Pit.** The central fire is banked but not cold...', '**The Forge-Master\\'s Lockbox.** A small iron box on the workbench...'. Skip these if the first paragraph already covered everything."
  ],

  "one_sentence_summary": "Brief sidebar-list summary (≤20 words) of the room's function and inhabitants."
}

## DC SCALING (only if has_challenge)

- T1: DCs 10-12, failure → minor damage (1d4-1d6) or short setback
- T2: DCs 12-14, failure → moderate damage (2d6) or temporary condition
- T3: DCs 14-16, failure → real damage (3d6+) or persistent threat
- T4: DCs 16-18, failure → severe damage (4d8+) or party-wide complication
- T5: DCs 18-20, failure → lethal threat or major resource cost

Failure consequences MUST be PHYSICAL and IMMEDIATE — observable to the whole table within seconds of the failed roll. "The patrol raises the alarm and three guards close on the party" is right. "The party is now hunted for the rest of the dungeon" is also right (immediate state change). "The order's reputation suffers" is wrong (abstract, not observable).`;
}

/**
 * Validate the living room response. Same shape as the other room
 * prompts — `name`, `read_aloud_opening`, `has_challenge`, `dm_notes`
 * (array), `one_sentence_summary` required; `challenge_header`
 * required only when has_challenge; `door_preamble` optional.
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
export function validateLivingRoomResponse(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    const required = [
      'name',
      'read_aloud_opening',
      'has_challenge',
      'dm_notes',
      'one_sentence_summary',
    ];
    for (const key of required) {
      if (!(key in data)) {
        console.error(`Missing required key: ${key}`);
        return false;
      }
    }
    if (typeof data.has_challenge !== 'boolean') {
      console.error('has_challenge must be a boolean');
      return false;
    }
    if (
      data.has_challenge
      && (typeof data.challenge_header !== 'string'
        || !data.challenge_header.trim())
    ) {
      console.error('challenge_header required when has_challenge is true');
      return false;
    }
    if (!Array.isArray(data.dm_notes) || data.dm_notes.length === 0) {
      console.error('dm_notes must be a non-empty array of paragraph strings');
      return false;
    }
    if (data.dm_notes.some(p => typeof p !== 'string' || !p.trim())) {
      console.error('dm_notes entries must all be non-empty strings');
      return false;
    }
    if (data.door_preamble !== undefined && typeof data.door_preamble !== 'string') {
      console.error('door_preamble, when present, must be a string');
      return false;
    }
    return true;
  } catch (e) {
    console.error('Invalid JSON:', e);
    return false;
  }
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
 * @param {object} data parsed living room response
 * @returns {Array<{format: string, content: string}>}
 */
export function processLivingRoomResponse(data) {
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
