/**
 * dungeon-overview.mjs
 *
 * Main-call prompt for dungeon overview generation. Receives fully-
 * specified dimensions from the inference call (`inferDungeonDimensions`)
 * and produces a single JSON response with the new structured field
 * shape that mirrors settings' overview architecture while preserving
 * proven dungeon-specific pieces (approach_and_threshold, monster CR
 * triplet, boss-vs-miniboss logic, difficulty_level).
 *
 * Architecture parallel to settingOverviewPrompt:
 *   - Anti-clustering: rotating bans on dungeon-attractor narrative
 *     tropes (ancient-seal-weakening, lich-seeking-phylactery, etc.).
 *   - Fantasy texture: the central supernatural reality must be NAMED
 *     and PRESENT-TENSE. Dungeons are usually supernatural already;
 *     this rule guards against past-tense "the lich king once ruled here"
 *     framings that read as historical fiction.
 *   - Tension shapes the field framings (central_dynamic, current_occupation,
 *     present_state read through the tension's lens).
 *   - Difficulty modulates stake-scope of the prose throughout
 *     (Tier 1 = local, Tier 5 = cosmic) AND drives monster CR triplet.
 *   - Character qualities expressed through STRUCTURE, not keyword
 *     repetition. Atmospheric quality used at most ONCE.
 *   - Deity handling: extinct-tradition registers use epithets for
 *     active religious life, real deity names appear sparingly.
 *   - Naming protection: user-provided name and lore are sacrosanct.
 *
 * Old prompt is gone. Legacy dungeons with the old field shape render
 * via fallback in OverviewTab.vue — the rendering layer handles both
 * the new shape and the old shape.
 */

import { DUNGEON_TENSION_DESCRIPTIONS, DIFFICULTY_TIERS } from '../util/dungeon-dimensions.mjs';
import { registerProseDirective } from '@/shared/register-prose-directive.mjs';

/**
 * Build the dungeon overview prompt. All inputs are pre-resolved by
 * the inference call (or supplied directly by the caller for cross-
 * tool seed paths). The prompt itself does no rolling.
 *
 * @param {Object} args
 * @param {string} args.type - one of DUNGEON_TYPES
 * @param {string[]} args.character - 3 character quality strings
 * @param {string|null} args.register - full register descriptor or null
 * @param {string|null} args.userName - user-provided dungeon name or null
 * @param {string} args.tension - one of DUNGEON_TENSIONS
 * @param {number} args.difficulty - 1-5
 * @param {string} [args.description] - user's free-text description
 * @param {string} [args.lore] - user's pasted lore
 * @param {string[]} [args.bannedTropes] - rotating ban subset from getBannedDungeonTropesForGeneration
 */
export function dungeonOverviewPrompt({
  type,
  character,
  register,
  userName,
  tension,
  difficulty,
  description = '',
  lore = '',
  bannedTropes = [],
} = {}) {
  const safeDescription = (description || '').replace(/"/g, '\\"');
  const safeLore = (lore || '').replace(/"/g, '\\"');
  const safeUserName = userName ? `"${userName.replace(/"/g, '\\"')}"` : 'null';

  const characterList = Array.isArray(character) && character.length > 0
    ? character.join(', ')
    : 'ancient, haunted, fog-shrouded';

  const tierEntry = DIFFICULTY_TIERS[difficulty] || DIFFICULTY_TIERS[1];
  const monsterCRs = tierEntry.monsterCRs;

  const tensionDescription = DUNGEON_TENSION_DESCRIPTIONS[tension]
    || 'a central dramatic situation that gives this dungeon its shape and pacing.';

  const registerDirective = register
    ? `LINGUISTIC REGISTER: ${register}.

INNER PROPER NOUNS must match this register: the boss / miniboss / other NPCs by name, faction names, named items and relics, named chambers and inner locations. These derive from the register's phonology, naming conventions, and cultural texture — they're the in-world detail the GM uses at the table.

THE DUNGEON'S OWN NAME (the "name" field) and SUBTITLE (the "title" field) MUST BE ENGLISH-READABLE. A GM has to say it aloud, write it on a session note, search for it in their campaign log.

NAME TEMPLATES — pick ONE per generation. Each template produces a different rhythm; rotating across templates is the variety mechanism. Match the template to the dungeon's type and tension rather than reaching for the same pattern every time.

  Template A — [Register-noun] [Place-type]
    "Eikheim Barrow"  ·  "Vetha Crypt"  ·  "Drakhal Mine"  ·  "Slánú Hold"

  Template B — the [English-adjective] [Place-type]
    "the Hollow Vault"  ·  "the Burnt Spire"  ·  "the Silent Hold"  ·  "the Drowned Catacombs"

  Template C — [Place-type] of [Register-noun]
    "Crypt of Vetheras"  ·  "Tomb of Eikheim"  ·  "Vault of Halgrim"  ·  "Sepulcher of Slánú"

  Template D — the [Place-type] of [English-noun phrase]
    "the Halls of Slow Light"  ·  "the Sepulcher of Bones"  ·  "the Tomb of the Last King"  ·  "the Pit of Long Names"

  Template E — [Register-noun]'s [Place-type]
    "Vetheras's Crypt"  ·  "Halgrim's Hold"  ·  "Brunhild's Sanctum"  ·  "Eikheim's Maze"

  Template F — the [English-adjective] [English-noun]
    "the Sunken Wreck"  ·  "the Iron Sanctum"  ·  "the Cold Citadel"  ·  "the Salt-Eaten Reach"

Place-type vocabulary (use ONE per name, in any of the templates above):
Barrow, Crypt, Tomb, Vault, Hold, Spire, Halls, Maze, Mine, Catacombs, Lair, Reach, Mound, Watch, Pit, Tower, Citadel, Keep, Sanctum, Den, Sepulcher, Sanctuary, Ruins, Hollow, Wreck, Roost, Grove, Compound, Foundry, Outpost

TEMPLATE-BIAS WARNING:
Templates A, C, and E (the noun-modifier and of-/possessive shapes) are the LLM's grammatical safe-defaults. They will dominate without active rebalancing — every dungeon ending up "X Barrow" or "Crypt of X" is the failure mode. Treat them as ONE option among six, not the reflex. Templates B, D, and F (definite-article, English-noun-phrase, and pure-English shapes) carry mood that A/C/E don't — reach for them when the dungeon's tension calls for atmosphere over a single proper noun. A session log of ten dungeons should show four or five different templates, not ten variants of one.

HARD RULES (verify the chosen name before returning):
- 2-5 English words total. Compact, scannable, sayable.
- AT MOST ONE word may be register-flavored (a 1-3 syllable proper noun like "Eikheim", "Vetha", "Slánú"). All other words are English.
- NO foreign-language conjunctions, articles, or particles in the name ("an", "na", "ša", "el", "del", "tabal-ša"). If the register's natural naming uses these particles, that grammar stays inside the dungeon — on chambers, NPCs, items — NEVER in the dungeon's display name.

TRANSLATION HANDOFF — mirrors the item-generator translation rule.
When the register is non-English (Norse, Welsh, Old-Irish, Mesopotamian, Yoruba, Quechua, etc.), the culturally-rooted original-language phrase (the kind a register's poets would actually use) does NOT go in the "name" field. It goes in the FIRST SENTENCE of the "overview" field with cultural framing — so the GM has an English handle for their session notes and the cultural specificity is established once, in prose, where it belongs.

DON'T:
  name: "Fuar-chroí an Slánú"
  overview: "The barrow sits low..."

DO:
  name: "Slánú Barrow"
  title: "the Cold Heart of Salvation"
  overview: "Known to the highland folk as Fuar-chroí an Slánú — the Cold Heart of Salvation — the barrow sits low..."

DON'T:
  name: "Uaigheanna na nGaoth Fuar"
  overview: "A wind-scoured tomb..."

DO:
  name: "Crypt of Cold Winds" (Template C with English noun-phrase) — OR — "the Wind-Scoured Crypt" (Template B)
  title: "where the gales never settle"
  overview: "The folk who buried their dead here called this place Uaigheanna na nGaoth Fuar — the graves of cold winds. A wind-scoured tomb..."

The English name is for usability at the table; the original-language phrase in the overview's first sentence is what makes the dungeon culturally rooted rather than culturally-flavored generic. Mention the original-language phrase ONCE in the overview — do not repeat it across other fields.

FAIL examples (these have NO English name and put the foreign phrase in the name field):
  name: "Uaigheanna na nGaoth Fuar"
  name: "Túath an Bhanríon Marbh"
  name: "Kírkjuvegr-jökulsbrú"
  name: "Fuar-chroí an Slánú"
  name: "Mausoleum tabal-ša-Esagila"

${registerProseDirective()}`
    : `LINGUISTIC REGISTER: none specified. ${
      lore.trim().length > 0 || description.trim().length > 0
        ? "The user has provided their own naming style via the description / lore. Extend that style for any new names. Do NOT impose a register on top of established invented naming conventions. The dungeon's own name and subtitle must still be English-readable — see name / title rules in the schema."
        : "Use a generic fantasy register for naming. The dungeon's own name and subtitle must be English-readable — see name / title rules in the schema."
    }`;

  const userNameDirective = userName
    ? `NAME: The user has named this dungeon ${safeUserName}. Use this name VERBATIM as the "name" field. The "title" field is a separate short evocative phrase.`
    : `NAME: No user-provided name. Generate a register-coherent dungeon name for the "name" field.`;

  const bannedTropesBlock = bannedTropes.length > 0
    ? `\nANTI-CLUSTERING:\nDo NOT use the following narrative patterns in this generation:\n${bannedTropes.map(t => `- ${t}`).join('\n')}\n\nThese patterns are compelling but appear too often in unguided dungeon generation. Use a different worldbuilding premise. The tension axis (see below) already gives you a structural shape — fill it with something that ISN'T one of these patterns. Dungeons can be defined by ongoing harvest operations, faction occupation, decay of maintenance systems, accumulated pilgrim history, methodical looting by rivals, dormant inhabitants with outside witnesses, and many other premises that don't reduce to seal-weakening, phylactery-hunting, summoning-ritual-interruption, or hoard-defense.\n`
    : '';

  return `Generate a dungeon overview as a single JSON response.

TYPE: ${type || 'ruin'}
CHARACTER QUALITIES: ${characterList}
${registerDirective}
${userNameDirective}

DIFFICULTY: ${tierEntry.name}
STAKE-SCOPE AT THIS TIER: ${tierEntry.scopeOfStakes}
Monster CRs for the encounter palette: minion ~${monsterCRs.minion}, strong minion ~${monsterCRs.strongMinion}, large creature ~${monsterCRs.largeCreature}.

CENTRAL TENSION: ${tension}
${tensionDescription}

DIFFICULTY MODULATES STAKE-SCOPE THROUGHOUT, NOT JUST MONSTER STATS. Tier 1 prose reads local — a bandit-king bound under a hilltop barrow, a village's missing children traced to a sewer-maze. Tier 5 prose reads cosmic — a primordial bound at the underworld's edge, a god-corpse whose dreams remake reality. Same tension SHAPE, different STAKES. Match the stake-scope to the tier in every field — history is local-history or god-scale-history; dominant_power is a local rival or a planar entity; treasures_and_resources are grave-goods or reality-altering artifacts. Do not bake high stakes into a Tier 1 dungeon's prose or local stakes into a Tier 5.

User input description: "${safeDescription}"
User input lore: "${safeLore}"

LORE PRESERVATION:
Specific named entities in the user-provided lore are AUTHORITATIVE and must be preserved with the user's exact terminology. Named characters, places, factions, customs, organizations — all must appear in the generated output using the user's exact names. Build the dungeon AROUND user-named details rather than replacing them with thematically-similar inventions. If user lore mentions a PC's connection to this dungeon, the output must acknowledge it (a family grave, an old enemy, a discovered childhood landmark, an inherited claim).

FANTASY TEXTURE REQUIREMENT (mandatory — verify before returning):
The dungeon's CENTRAL SUPERNATURAL REALITY must be NAMED and PRESENT-TENSE. Most dungeons are inherently supernatural (the dragon, the lich, the ancient curse, the bound spirit, the planar incursion) — the rule is that whatever the central supernatural identity is, it must be specifically named (drawn from the register's mythological tradition where possible) and operating NOW, not in past tense.

PASS: "Vetheras, the lich-king, dreams in the central vault and the air around him slows clocks within ten paces."
FAIL: "The lich-king once ruled here. His phylactery was hidden in the deepest chamber, but he has long since faded."

PASS: "The mountain itself has a name — Halgrim — and a voice the workers learned to listen for. Halgrim warns of cave-ins through the iron in the walls; ignoring the warning is how the central shaft collapsed last spring."
FAIL: "The ancient dwarves once worshipped the mountain spirit, but the practice has been forgotten."

Drawn from the register's tradition where the register supports it:
- Norse → draugr, jötunn, fylgja, vættir
- Celtic → sídhe, púca, fey, Tylwyth Teg
- Mesopotamian → ūtukku, edimmu, mušḫuššu
- Egyptian → akh, sheut, kheper
- Greek → genius loci, dryad, lamia
- Generic-fantasy → name your own supernatural identity with intentional weight

ANTI-PATTERN: rituals that no longer work, dead gods, fading magic, broken seals, lost names — these all read as fantasy but FUNCTION as historical fiction. If every supernatural reference is past-tense, broken, or aspirational, the dungeon fails the texture requirement. At least one supernatural identity (usually the central one) must be present-tense and named.
${bannedTropesBlock}
DEITY HANDLING:
This register may draw on an extinct religious tradition with no living practitioner community. Active religious life in dungeon narrative (rituals, blessings, oaths, names of powers being invoked, devotional dynamics) should use EPITHETS — descriptive deity-handles authentic to the register's textual tradition. Real deity names from the register MAY appear sparingly as historical-mythological reference, but the DEFAULT for active religious framing is the epithet. Most dungeon generations should name no deity at all; when a deity is named, it carries weight precisely because of its rarity.

EXPRESSION MODES (for this dungeon's character qualities):
The three character qualities (${characterList}) shape the dungeon's facets. Express each one through the mode appropriate to its sub-dimension — NOT by repeating the keyword across every field. Texture comes from STRUCTURE, EVENTS, and CONSEQUENCE.

- State qualities (corrupt, declining, embattled, thriving, etc.): shape the framing of history and present state so they feel this way. A "declining" dungeon reads late-stage; a "thriving" cult-compound reads ascendant. Express through trajectory and tone, not by naming the adjective.
- Political qualities (theocratic, despotic, council-fractured, etc.): show through specific institutions, contested authority, and named factions inside the dungeon.
- Cultural qualities (scholarly, monastic, warlike, etc.): show through what the dungeon's occupants spend their time on, what they prize, what they argue about.
- Geographic qualities (mountainous, underground, coastal, etc.): shape physical context. A "coastal" dungeon has tidal mechanics; an "underground" one has stale air and lightlessness.
- Mystical qualities (haunted, cursed, fey-touched, etc.): bleed into atmospheric and supernatural beats throughout, but do NOT become the central premise unless that's what the tension demands.
- Temporal qualities (ancient, forgotten, decaying, etc.): shape history and how much the present knows of the past.
- Hidden qualities (secret, conspiracy-ridden, false-named, etc.): show through what the dungeon HIDES — false rooms, double-agents in the inhabitants, layered identities.
- Atmospheric qualities (misty, snow-bound, candle-lit, etc.): ONE specific sensory beat that establishes the texture. Used at most ONCE in the entire output — never make a sensory quality into the political, economic, or religious driver.

PROSE FORMATTING:
- Do NOT use markdown bold (\`**text**\`) for proper nouns. The renderer applies first-mention emphasis using the \`named_entities\` array you return.
- Use *italic* (\`*term*\`) ONLY for foreign in-world terms that genuinely shift register. Cap italic usage strictly: at most one or two italic terms across the ENTIRE overview. Do NOT italicize whole sentences. Do NOT italicize proper names.
- Every field is plain prose. No blockquotes, no callouts, no special structure.
- Keep descriptions concise. Avoid run-on sentences.
- Avoid common fantasy tropes and clichés.

BOSS-VS-MINIBOSS LOGIC (preserved from the proven dungeon pattern):
- If the "boss" (the dominant power) is an INTELLIGENT NAMED ENTITY (a lich, a vampire lord, a cunning dragon with motives, a cult leader, a planar regent): include them in \`npc_list\` under a unique name. They are an NPC the party can roleplay with.
- If the "boss" is TRULY MINDLESS OR BESTIAL (a giant burrowing worm, a primal elemental with no language, a fungal mass): include them in \`monsters\` as the large_creature entry. They are a monster the party encounters in combat, not roleplay.
- The "miniboss" is a mid-tier antagonist with a name and personal motivations — ALWAYS an NPC in \`npc_list\`, never a monster. They might serve, oppose, or be neutral to the dominant power.
- NO monster in \`monsters\` shares a name with any NPC in \`npc_list\`.

MONSTERS — EXACTLY 3 (the encounter palette):
1. A basic minion (type: "minion", CR ~${monsterCRs.minion}).
2. A stronger lieutenant minion (type: "strong_minion", CR ~${monsterCRs.strongMinion}).
3. A large creature (type: "large_creature", CR ~${monsterCRs.largeCreature}) — this is EITHER the bestial boss (when boss-vs-miniboss logic flags the boss as mindless) OR a separate large entity with no overlapping NPC name.

NPCs — AT LEAST 3 in \`npc_list\`:
1. The miniboss (named individual, mid-tier antagonist).
2. The boss IF they're intelligent (named individual, dominant power).
3. At least one other named NPC (a rival faction leader, a captured prisoner, a hermit-resident, a defected former-minion, etc.).
The \`npc_list\` can include more than 3 — add any other individuals the prose mentions by name.

Return the description in JSON format with the following keys. Make sure \`named_entities\` includes EVERY personal name mentioned across all prose fields (these get first-mention bolding in the renderer). Keep descriptions concise:

{
  "name": ${userName ? `"${userName}" (use this verbatim)` : '"the dungeon\'s proper noun, in English. Pick ONE of the six NAME TEMPLATES (A through F) defined above and fill it; rotate template choice across generations rather than defaulting to the same shape. 2-5 English words. At most one register-flavored proper noun. NO foreign-language articles or particles (an / na / ša / el / etc.). If the register has a culturally-rooted original-language phrase, it belongs in the FIRST SENTENCE of the overview field, not here — see TRANSLATION HANDOFF above."'},
  "title": "A short evocative phrase (3-5 words, max 6) that pairs with the name as a subtitle. STRUCTURE: a phrase, not a sentence — NO 'where X does Y' clauses, NO conjugated verbs. Examples: 'Tomb of the Singing Bones', 'the Halls of Slow Light', 'Crypt of the Forgotten Vow'. SUGGEST the character qualities through imagery; do NOT use a character quality word as an adjective.",
  "overview": "ATMOSPHERIC VIGNETTE — what the party sees / smells / hears / feels when they reach the dungeon. 2-3 short sentences. Sensory texture only: the establishing shot. NO history, NO inhabitant rundown, NO ruler info (those live in dedicated fields). Plain prose, no markdown.",
  "relation_to_larger_setting": "WHERE this dungeon sits geographically. What region, what landmarks border it, what local powers know of it. 2-3 sentences. Provide a name for the larger region if natural.",
  "approach_and_threshold": "HOW the party reaches the dungeon and what the entrance experience is. The threshold scene — the door, the descent, the warded sigils, the first chamber's character. 2-3 sentences. This is the GM's first-room handout when the party arrives. Concrete and spatial.",
  "history": "A brief history of the dungeon — founding / creation / what it was built for, and one or two pivotal events. Scope-match the tier: local history for Tier 1, cosmic history for Tier 5. Plain prose.",
  "dominant_power": "WHO RULES THIS DUNGEON. Specific, named (if intelligent), with the basis of their authority. 2-3 sentences. If intelligent → they appear in npc_list under the same name. If mindless/bestial → they appear in monsters[] as the large_creature. The character of the rule depends on the central tension — boss-decline reads as fading authority, scoured-and-claimed reads as absolute dominance, succession-fracture reads as contested.",
  "inhabitants": "WHO/WHAT LIVES OR WORKS INSIDE the dungeon — minions, mid-tier creatures, rival factions, prisoners, occasional residents (a captured NPC, a hermit, traders passing through). The social fabric of the dungeon's interior. Layered when the tension calls for it (succession-fracture has two factions; scoured-and-claimed has one dominant force + their direct servants; pilgrimage-route may include other expeditions). 2-3 sentences.",
  "notable_inhabitant_facet": "OPTIONAL. One sentence about a current notable detail of the inhabitants. Plain prose. Empty string is acceptable.",
  "traps_and_security": "HOW THE DUNGEON DEFENDS ITSELF — active wards, mechanical traps, alarm systems, magical seals, line-of-sight ambush positions, the architecture's own hostility. NOT just 'forces guarding it' (that's inhabitants). The defensive ARCHITECTURE. The tension modulates: decaying-system has the wards strobing and failing; awakening-architecture has the building itself acting; freshly-occupied has half-installed defenses. 2-3 sentences.",
  "notable_security_facet": "OPTIONAL. One sentence about a current notable detail of the dungeon's defenses. Empty string is acceptable.",
  "central_dynamic": "HOW THE CENTRAL TENSION CURRENTLY MANIFESTS in the dungeon. Frame in the tension's terms — see the CENTRAL TENSION block above. This is the load-bearing field; it tells the GM what the dungeon is ACTIVELY DOING right now. 2-3 sentences.",
  "current_occupation": "WHO / WHAT IS IN THE DUNGEON RIGHT NOW and what they are doing. Concrete, named, immediate. Different from inhabitants (which is the social fabric generally) — current_occupation is THIS WEEK'S situation. Methodically-looted has a rival expedition mid-extraction or just-retreated; freshly-occupied has the new occupiers establishing; cult-ascendant has a ritual in preparation. 2-3 sentences.",
  "present_state": "THE OVERALL VIBE of the dungeon NOW, read through the tension's lens. Not a fix-it-or-doomed framing — match the tension's pacing. Sealed-and-stirring reads as pressure-against-thinning-barrier; pilgrimage-route reads as well-worn-with-fresh-arrivals; scoured-and-claimed reads as silent-and-absolute. 2-3 sentences.",
  "difficulty_level": "A short note (1-2 sentences) on the dungeon's difficulty — what kind of party should attempt this and what scope of consequences success or failure carries. Match ${tierEntry.name} explicitly.",
  "named_entities": ["Every personal name (people only) mentioned in the prose fields above. Match VERBATIM, case-sensitive. EXCLUDE place names, faction names, deity names, role-words. EXCLUDE titles of offices ('the High Priest', 'the Warden'). Typically 3-6 entries."],
  "npc_list": [
    {
      "name": "Register-coherent NPC name (individuals only, not organizations)",
      "description": "Role and personality — 1-2 sentences"
    }
  ],
  "monsters": [
    {
      "type": "minion",
      "name": "Register-coherent or descriptive monster name (NOT shared with any NPC)",
      "description": "A brief description of the minion's role",
      "CR": "${monsterCRs.minion}"
    },
    {
      "type": "strong_minion",
      "name": "Lieutenant-tier monster name (distinct from minion and large_creature)",
      "description": "How does this differ from the basic minion? Role and tactics.",
      "CR": "${monsterCRs.strongMinion}"
    },
    {
      "type": "large_creature",
      "name": "Large creature name (the bestial boss if applicable, OR a separate large entity)",
      "description": "Big monstrous entity. Bestial if it's the dominant power; otherwise used as a separate large threat. Never shares a name with any NPC.",
      "CR": "${monsterCRs.largeCreature}"
    }
  ]
}

Return ONLY valid JSON with the fields above. No prose before or after, no markdown code fences, no commentary. Temperature: 0.9.`;
}

/**
 * Shape validator for dungeonOverviewPrompt responses.
 *
 * Required string fields, required array fields (with min-count
 * checks where the spec demands them), optional facet fields, monster
 * triplet enforcement.
 */
export function validateDungeonOverview(jsonString) {
  let data;
  try {
    data = JSON.parse(jsonString);
  } catch (e) {
    return false;
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return false;

  // Required string fields.
  const requiredStrings = [
    'name', 'title',
    'overview', 'relation_to_larger_setting', 'approach_and_threshold',
    'history', 'dominant_power', 'inhabitants',
    'traps_and_security',
    'central_dynamic', 'current_occupation', 'present_state',
    'difficulty_level',
  ];
  for (const key of requiredStrings) {
    if (typeof data[key] !== 'string' || data[key].trim().length === 0) {
      return false;
    }
  }

  // Optional facet fields — allow empty string but require string type.
  const optionalStrings = [
    'notable_inhabitant_facet',
    'notable_security_facet',
  ];
  for (const key of optionalStrings) {
    if (key in data && typeof data[key] !== 'string') return false;
  }

  // named_entities: array of strings.
  if (!Array.isArray(data.named_entities)) return false;
  if (!data.named_entities.every((e) => typeof e === 'string')) return false;

  // npc_list: array of objects with name + description, at least 1
  // (the boss-vs-miniboss spec asks for ≥3 but we don't hard-fail the
  // validator on count — a thin response is recoverable; an empty
  // array is not).
  if (!Array.isArray(data.npc_list) || data.npc_list.length === 0) return false;
  if (!data.npc_list.every((npc) =>
    npc
    && typeof npc === 'object'
    && typeof npc.name === 'string'
    && typeof npc.description === 'string'
  )) return false;

  // monsters: array of EXACTLY 3, one of each type, with name + CR.
  if (!Array.isArray(data.monsters) || data.monsters.length !== 3) return false;
  const requiredMonsterTypes = ['minion', 'strong_minion', 'large_creature'];
  const haveTypes = data.monsters.map((m) => m && m.type).filter(Boolean).sort();
  if (JSON.stringify(haveTypes) !== JSON.stringify([...requiredMonsterTypes].sort())) {
    return false;
  }
  if (!data.monsters.every((m) =>
    m
    && typeof m === 'object'
    && typeof m.name === 'string'
    && typeof m.description === 'string'
    && (typeof m.CR === 'string' || typeof m.CR === 'number')
  )) return false;

  return true;
}
