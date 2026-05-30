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
    ? `NPC present in the room — incorporate them into the read-aloud and dm_notes. If this NPC is the dungeon's boss or a powerful entity unlikely to be in a connecting room, present them as a weakened version, projection, illusion, or avatar (a "final boss preview"), not the full encounter.

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
${connectedSection}${loreRoleSection}${doorwaySection}${loreLookup}${tierLine}${existingRoomsLine}
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

## WHAT DOES NOT GO IN dm_notes

Three categories are explicitly owned by OTHER fields or by separately-generated sections. Putting them in dm_notes duplicates or contradicts the canonical source:

1. EXIT INVENTORY. Sentences like "exits to the west (area 5) and south (area 7) via open corridors, and an unlocked door to the east (area 8)." The read-aloud already names the visible directions; door_preamble handles the door states. dm_notes never lists exits.

2. SECRET DOORS, HIDDEN PASSAGES, AND THEIR MECHANICS. Sentences like "a secret door in the north wall leads to area 10; pressing a tile triggers it." A separately-generated **Secret Door** notes section gets appended to this room with the canonical discovery/opening mechanics. dm_notes never mentions the secret door's location, finding mechanic, or opening mechanic — and NEVER creates a **Secret Door Trigger** or **Hidden Passage** feature sub-block. The door_preamble flagged its existence; that is the only mention dm_notes is allowed.

3. DOOR MATERIAL. "Wooden door," "stone door," etc. Door material is for the read-aloud (and only when notable). dm_notes treats doors by area number only.

If you're about to write something that fits one of the three categories above, STOP and remove it. The information belongs elsewhere.

## OUTPUT FORMAT

Return STRICT JSON (no prose, no commentary, no code fences):

{
  "name": "1-2 word functional room name (Hallway, Antechamber, Atrium, Gallery, Corridor, etc.). Simple and functional — not descriptive.",

  "door_preamble": "Terse DM-side preamble describing door states. Use ONLY the door states from the DOORWAYS IN THIS ROOM section above. Reference rooms by their connected-room numbers. OMIT this key (pass empty string) if every doorway is 'open corridor' OR if all doors are 'unlocked door' and don't need flagging. For unlocked doors that you do flag: 'The doors to areas X and Y are closed but unlocked.' For locked or secret doors, follow these formats:\\n- Character holds key: 'The door to area Z is locked, and [character name] has the only key.'\\n- Key hidden in a room: 'The door to area Z is locked; the key is hidden in area W.'\\n- Key from a key-room: 'The door to area Z is locked; the means to open it lies in area W, which itself requires the party to [solve the key-room's challenge in 1 short clause].' If the key-room isn't yet known: 'the means to open it lies elsewhere in the dungeon.'\\n- Secret door: 'There is a hidden doorway to area Z; see the Secret Door notes below.' Do NOT include a Perception DC in the preamble — the Secret Door notes section owns the discovery mechanics for secret doors, and any DC here would either duplicate or contradict it.",

  "read_aloud_opening": "Boxed text the DM reads when the party enters this room. 40-80 words, present-tense, sensory. Describe the passage — architecture, atmosphere, light, sound, smell. Visible doorways/exits should be part of the scene; name directions naturally as part of the visual description. NO mechanics, NO DM hints, NO addressing the DM. For plain corridors, terse is fine — a single short paragraph beats inflated prose. Avoid generic material adjectives like 'wooden door' or 'stone door' unless the material is genuinely notable (peat-warped, salt-crusted, iron-bound, etc.) — for ordinary doors, just say 'door' or 'doorway'.",

  "has_challenge": false,

  "challenge_header": "≤8 word title for the challenge. Omit this key entirely if has_challenge is false.",

  "dm_notes": [
    "Array of strings. Each string is ONE paragraph. The first paragraph covers the room's content overview: precise dimensions, notable features the DM needs to know about, any inhabitants. If has_challenge: also covers the mechanic (how it works, skills, DCs scaled to tier, IMMEDIATE physical failure consequence, optional bypass woven inline). For plain corridors with no challenge or features, the first paragraph can be very short (30-60 words). For richer connecting rooms (a gallery with murals, an atrium with a fountain), 80-150 words is fine.",
    "Subsequent paragraphs are OPTIONAL feature sub-blocks — only when the room has a specific interactive element that warrants its own block. Each begins with a bolded inline title: **Feature Name.** Description follows in regular text. Examples: '**The Faded Mural.** Characters who study the wall...', '**The Discarded Helm.** Among the rubble lies...'. Skip these for plain corridors."
  ],

  "one_sentence_summary": "Brief sidebar-list summary (≤20 words) of the room's purpose and what's there."
}

## DC SCALING (only if has_challenge)

- T1: DCs 10-12, failure → minor damage (1d4-1d6) or short setback
- T2: DCs 12-14, failure → moderate damage (2d6) or temporary condition
- T3: DCs 14-16, failure → real damage (3d6+) or persistent threat
- T4: DCs 16-18, failure → severe damage (4d8+) or party-wide complication
- T5: DCs 18-20, failure → lethal threat or major resource cost

Failure consequences MUST be PHYSICAL and IMMEDIATE — observable to the whole table within seconds of the failed roll. Do NOT write failure consequences like "wait 12 hours" or other indirect/delayed effects.`;
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
    content.push({ format: 'paragraph', content: paragraph });
  }
  return content;
}
