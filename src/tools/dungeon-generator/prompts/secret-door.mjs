/**
 * Secret door prompt — generates the "**Secret Door.**" sub-block
 * appended to a room that contains a secret doorway.
 *
 * Output shape (1-2 paragraph strings, parallel to the new room
 * prompts' dm_notes sub-blocks):
 *
 *   secret_door_paragraphs[0] — REQUIRED. First paragraph leads with
 *                               the **Secret Door.** sub-block title.
 *                               Covers (a) where the door is, (b) the
 *                               finding mechanic with a tier-scaled
 *                               hard DC, (c) the opening mechanic
 *                               woven inline IF simple ("swings open
 *                               at a touch", "slides aside when
 *                               pressed"). 30-60 words for the common
 *                               case.
 *
 *   secret_door_paragraphs[1] — OPTIONAL. Second paragraph appears
 *                               ONLY when the opening mechanism is
 *                               genuinely non-trivial (a riddle, a
 *                               ritual, a required item from a key
 *                               room) OR there's a load-bearing piece
 *                               of DM-side lore that informs play.
 *                               If present, leads with a bolded
 *                               sub-block title like **Opening the
 *                               Door.** Skip otherwise — most secret
 *                               doors don't need a second paragraph.
 *
 * Why this shape (vs. the old 3-field structure):
 *   The old prompt mandated finding_mechanics + opening_mechanics +
 *   lore as separate paragraphs. The model produced ~400-word
 *   entries with backstory paragraphs about why the door exists.
 *   Published-adventure secret doors are 30-60 words in one
 *   paragraph; the lore lives implicitly in the room the door leads
 *   to. The new shape encourages terse-by-default while still
 *   accommodating complex opening mechanics when warranted.
 *
 * Difficulty tier scales the discovery DC. Secret doors are ALWAYS
 * hard relative to tier; the absolute DC shifts so a T1 character's
 * +3-4 modifier and a T5 character's +10-12 modifier both produce
 * roughly the same success rate (~30%).
 *
 *   T1: DC 14-16
 *   T2: DC 16-18
 *   T3: DC 18-20
 *   T4: DC 20-22
 *   T5: DC 22-24
 */

export function generateSecretDoorPrompt(
  dungeonOverview,
  currentRoomDescription,
  connectedRoomsInfo = '',
  secretRoomSummary = '',
  currentRoomContent = '',
  secretRoomContent = '',
  difficulty = null,
  loreLookup = '',
) {
  const tierLine = difficulty
    ? `Dungeon difficulty tier: ${difficulty} (1-5). The discovery DC for the secret door MUST come from the tier-scaling table below.`
    : `Dungeon difficulty tier: not specified — default to T2 discovery DC (16-18).`;

  const secretRoomSection = secretRoomSummary
    ? `\nSECRET ROOM SUMMARY (use to inform the door's thematic clue):\n${secretRoomSummary}\n`
    : '';

  const secretRoomContentSection = secretRoomContent
    ? `\nSECRET ROOM CONTENT (use to inform the door's thematic clue):\n${secretRoomContent}\n`
    : '';

  const currentRoomContentSection = currentRoomContent
    ? `\nCURRENT ROOM CONTENT (the room the secret door is in):\n${currentRoomContent}\n`
    : '';

  const connectedSection = connectedRoomsInfo
    ? `\nConnected rooms: ${connectedRoomsInfo}\n`
    : '';

  return `You are writing the **Secret Door.** sub-block that gets appended to a room's DM-side notes when the room contains a hidden doorway. The output is GM-only — there is no read-aloud component.

DUNGEON OVERVIEW:
${dungeonOverview}

CURRENT ROOM DESCRIPTION:
${currentRoomDescription}
${connectedSection}${currentRoomContentSection}${secretRoomSection}${secretRoomContentSection}${loreLookup}
${tierLine}

## SECRET DOOR TYPES — pick one that fits the dungeon and the secret room

Vary which type you use — do NOT default to a generic seam-in-the-wall every time. The right type is the one that fits the dungeon's character, the inhabitants, and what the secret room contains. Use the dungeon overview and secret room summary to guide your choice.

1. CONCEALED BY FURNISHING — door hidden behind a tapestry, bookshelf, painting, mirror, statue, wardrobe, hearth, curtain, or other surface object. Most common in inhabited or formerly-inhabited dungeons (temples, libraries, manor houses, drake-kin chambers with hanging hide).

2. ARCHITECTURAL ILLUSION — a recessed seam in the stone, a false flagstone, a hidden ceiling panel, a pivoting wall block. THIS IS THE DEFAULT FAILURE MODE — use it ONLY when no other type fits. If you find yourself writing "a thin seam in the wall," reconsider whether one of the other types would be more evocative.

3. MECHANICAL TRIGGER — a lever disguised as a sconce or candleholder, a pressure plate under a flagstone, a swiveling brick, a counterweighted statue, a chain hidden in a brazier. Good for dungeons built with deliberate concealment (forge-clans, dwarven engineers, paranoid wizards).

4. OBJECT-AS-DOOR — the door IS an object the players can interact with: a sarcophagus that pivots, a hollow tree-trunk, an empty wardrobe with no back, a chest whose bottom drops out, an altar that rotates.

5. ENVIRONMENTAL COVER — door hidden behind a waterfall, beneath a thin layer of sand or ash, behind a wall of steam or smoke, inside a pool that drains when a valve is turned, under a snowbank.

6. LIVING OR ORGANIC — a root system that parts when touched, a fungal wall that retracts, vines that draw aside, a sleeping creature whose hollow body IS the doorway, a hive that splits open at a sound.

7. MAGICAL OR SYMPATHETIC — an illusion-walled passage, a stone that responds to a command word, a mirror that becomes a portal when a specific item is held up to it, a ward that releases when a sympathetic object (blood, key, sigil) touches it.

8. THEMATIC TO THE DUNGEON'S RESIDENTS — a drake-bone catch in a drake-kin burrow, an anvil-lever in a smith's hall, a font in a temple, a specific grave-marker in a necropolis, a particular book in a library. Often the most evocative choice — pick this when the dungeon has a clear faction or character.

If the dungeon has a strong thematic register (drake-kin, sulfur-vents, ember-glass, etc.), favor types 1, 3, 4, or 8 over the architectural default. Even type 2 should INCORPORATE the dungeon's material register ("a seam hidden by the pattern of the volcanic stone" is type 2 done with thematic skin — better than a generic stone seam, but still the weakest category).

## DISCOVERY DC — scale to tier, always hard

Secret doors are always hard checks relative to the party's expected modifiers — they aren't "level appropriate" the way ordinary obstacles are. Use these tier-scaled DCs:

- T1: DC 14-16 Investigation or Perception
- T2: DC 16-18 Investigation or Perception
- T3: DC 18-20 Investigation or Perception
- T4: DC 20-22 Investigation or Perception
- T5: DC 22-24 Investigation or Perception

Pick a single DC within the tier's range. Most secret doors should use Investigation (active search). Perception is appropriate when there's a sensory clue (draft, sound, light). Other skills (Arcana for magical seals, Religion for sacred wards) are fine when thematically right.

## BOLDING RULES

Use **markdown bold** ONLY for:
1. Creature and character names when first introduced
2. The sub-block title **Secret Door.** at the start of the first paragraph
3. An optional second-paragraph sub-block title like **Opening the Door.** when a second paragraph is genuinely warranted

DO NOT bold DCs, skill names, action verbs, or mechanical keywords. Plain text carries those.

## OUTPUT FORMAT

Return STRICT JSON (no prose, no commentary, no code fences):

{
  "secret_door_paragraphs": [
    "First paragraph (REQUIRED). Lead with **Secret Door.** Then cover: WHERE the door is (which wall, which surface), an OPTIONAL thematic sensory clue that hints at the secret room beyond, the FINDING mechanic (a character that [searches/examines X] and succeeds on a DC N [skill] check [discovers Y]), and the OPENING mechanic woven inline if simple ('The door swings inward at a touch.' / 'The seam slides aside when pressed.'). Aim for 30-60 words for simple cases. Do NOT include a separate lore paragraph — fold any necessary context into one short phrase.",
    "Second paragraph (OPTIONAL — include ONLY when warranted). Use cases: (a) the opening mechanic is genuinely complex (a riddle to recite, an item from a key-room to insert, a ritual to perform) — lead with **Opening the Door.** and describe; or (b) there's a single piece of load-bearing DM-side lore that informs how the door is used in play (a clue the door provides, a trap that fires on incorrect opening). Skip entirely otherwise. Most secret doors do NOT need a second paragraph."
  ]
}

## TIGHTNESS

The old version of this prompt produced 400-word secret door entries with full backstories. The published-adventure target is 30-60 words for the common case. If you find yourself writing more than 80 words across both paragraphs, you're over-writing. Cut backstory, generic atmospheric flourishes, and anything that the secret room's own entry will already cover.

## EXAMPLES (terse, varied types — model these patterns)

Type 1 (concealed by furnishing), 1 paragraph, 45 words:
[
  "**Secret Door.** A faded tapestry on the east wall depicts the elder drake's lineage. A character who examines it and succeeds on a DC 16 Investigation check finds a drake-shaped catch in the stone behind; pressing it swings the wall open."
]

Type 3 (mechanical trigger), 1 paragraph, 50 words:
[
  "**Secret Door.** One of the four sconces flanking the hearth is a lever in disguise. A character who searches the room and succeeds on a DC 16 Perception check notices the sconce is cooler than the others; tilting it forward slides a section of the hearthstone aside."
]

Type 4 (object-as-door), 1 paragraph, 40 words:
[
  "**Secret Door.** The dust-shrouded sarcophagus against the north wall is hollow. A character who succeeds on a DC 14 Investigation check finds latches inside the lid; pushing the sarcophagus forward reveals a passage in the alcove behind it."
]

Type 8 (thematic — drake-kin burrow), with complex opening, 2 paragraphs, 70 words:
[
  "**Secret Door.** A character who searches the north wall and succeeds on a DC 16 Investigation check finds a hidden recess containing five drake-bone pegs set into the volcanic stone.",
  "**Opening the Door.** The pegs must be pressed in the order of the drake-line's succession — eldest first. A character who has read the genealogy in area 6 can deduce the order; otherwise, each wrong press resets the puzzle and the next attempt has a 25% chance of triggering an alarm in area 3."
]`;
}

/**
 * Validate the secret door response.
 *
 *   secret_door_paragraphs — required non-empty array of non-empty strings,
 *                            max 2 entries.
 *
 * @param {string} jsonString
 * @returns {boolean}
 */
export function validateSecretDoorResponse(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    if (!Array.isArray(data.secret_door_paragraphs)) {
      console.error('secret_door_paragraphs must be an array');
      return false;
    }
    if (data.secret_door_paragraphs.length < 1
      || data.secret_door_paragraphs.length > 2) {
      console.error('secret_door_paragraphs must have 1 or 2 entries');
      return false;
    }
    if (data.secret_door_paragraphs.some(p => typeof p !== 'string' || !p.trim())) {
      console.error('secret_door_paragraphs entries must all be non-empty strings');
      return false;
    }
    return true;
  } catch (e) {
    console.error('Invalid JSON:', e);
    return false;
  }
}

/**
 * Build the content items to append to the room's contentArray. Each
 * paragraph in secret_door_paragraphs becomes one paragraph item; the
 * first paragraph carries the **Secret Door.** bolded sub-block title
 * inline, so no separate header item is emitted (the UI's renderer
 * picks up the inline bold via markdown).
 *
 * @param {object} data parsed secret door response
 * @returns {Array<{format: string, content: string}>}
 */
export function processSecretDoorResponse(data) {
  return data.secret_door_paragraphs.map(p => ({
    format: 'paragraph',
    content: p,
  }));
}
