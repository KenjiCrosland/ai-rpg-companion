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

import {
  DUNGEON_TENSION_DESCRIPTIONS,
  DIFFICULTY_TIERS,
  DUNGEON_TRAVERSAL_INVARIANT,
  OPERATIONAL_VOICE_BLOCK,
  SCHEMA_LEAK_DIRECTIVE,
  POWER_STRUCTURE_DIRECTIVES,
  POWER_STRUCTURE_DOMINANT_POWER_OVERRIDES,
  ORGANIZING_LOGIC_DIRECTIVES,
  CONTENDER_PRESENT_FRAMING,
  CONTENDER_KIND_DIRECTIVES,
  POV_FRAME_DIRECTIVES,
  CONTACT_PRESENT_FRAMING,
  CONTACT_ABSENT_DIRECTIVE,
  CONTACT_RELIABILITY_DIRECTIVES,
  CONTACT_OFFERS_DIRECTIVES,
  CONTACT_INVENT_DIRECTIVE,
  MOTIVE_DIRECTIVES,
  MOTIVE_PRESENT_STATE_CLAUSES,
  MOTIVE_DIFFICULTY_CLAUSES,
  FORMED_NATURE_FRAMING,
  FORMED_NATURE_DIRECTIVES,
  MODE_DIRECTIVES,
  RELATION_DIRECTIVES,
} from '../util/dungeon-dimensions.mjs';
import { REGISTER_PROSE_DIRECTIVE } from '@/shared/register-list.mjs';

const BASELINE_DOMINANT_POWER_FIELD_TEXT =
  "WHO RULES THIS DUNGEON. Specific, named (if intelligent), with the basis of their authority. 2-3 sentences. If intelligent → they appear in npc_list under the same name. If mindless/bestial → they appear in monsters[] as the large_creature. The character of the rule depends on the central tension — boss-decline reads as fading authority, scoured-and-claimed reads as absolute dominance, succession-fracture reads as contested. Voice anchor: who is in charge, what they want, how to play them — in one behavior. Example: 'wins every contest by simply not caring.'";

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
 * @param {string|null} [args.powerStructure] - one of POWER_STRUCTURES (or null for legacy callers). Injects a POWER STRUCTURE constraint block near the CENTRAL TENSION block. For non-apex values, also replaces the dominant_power schema field instruction with a value-specific override that permits the field to describe a non-apex situation (multiple unrelated forces, a hazard, an institution, an absence).
 * @param {string[]|null} [args.organizingLogic] - array of 1 or 2 entries from ORGANIZING_LOGICS, or null for legacy callers. Injects organizing-logic forces block(s) describing what the place was built or shaped for. Composite (length 2) injects both directives.
 * @param {Object|null} [args.contender] - shape `{ present: boolean, kind? }`, or null for legacy callers. When `present: true`, injects CONTENDER_PRESENT_FRAMING + the per-kind directive from CONTENDER_KIND_DIRECTIVES (one of 19 categorically distinct contender shapes). When `present: false`, no contender block is injected.
 * @param {string|null} [args.povFrame] - one entry from POV_FRAMES (or null for legacy callers). When set, injects the POV FRAME block and rewrites the overview schema field instruction to invoke the rolled frame as a POV hook (the single carve-out from OPERATIONAL_VOICE_BLOCK).
 * @param {string|null} [args.placeType] - the place-type noun for the dungeon's title (Sepulcher, Hold, etc.), pre-rolled in code from the bucket gated on organizingLogic. When set, injected into the name-templates section as a HARD CONSTRAINT (overrides the free-list vocabulary). Null falls back to the free list.
 * @param {Object|null} [args.nameTemplate] - one entry from NAME_TEMPLATES `{id, shape, requiresRegister, examples}` (or null for legacy callers). When set, the prompt replaces the full template listing with the single rolled template + compound-adjective nudge for B/F. Null falls back to the full template list + bias warning.
 * @param {Object|null} [args.contact] - fold object `{ present: boolean, reliability?, offers?, openSlot? }`, or null for legacy callers. When `present: true`, injects the contact framing + reliability + offers directives (or the invent directive for the open slot). When `present: false`, no contact block is injected.
 * @param {string[]|null} [args.registerPool] - rotated subset of the rolled register's curated character pool (6 names). When non-empty, injected into the register section as SAMPLE NAMES the LLM derives from (does NOT copy). Null for catchall registers; descriptor-only fallback.
 * @param {string|null} [args.motive] - one of MOTIVES (acquisition / prevention / recovery / discovery / invent), or null for legacy callers. When set, injects the MOTIVE block and appends motive-aware clauses to present_state, difficulty_level, and central_dynamic schema field text.
 * @param {string|null} [args.formedNature] - one of FORMED_NATURES (phenomenon / remnant), only set when 'formed' is in organizingLogic. Null otherwise. When set, injects the FORMED_NATURE_FRAMING + per-value directive to force the ambient force out of cosmic-horror formlessness into either inert-physics or named-specific-remnant.
 * @param {string|null} [args.mode] - one of the modes in the rolled holder's MODE_MENU (or 'invent' for the open slot). When set, injects the MODE block and appends a mode-conditional clause to difficulty_level (names the rolled mode + the deviation cost).
 * @param {{creature_type:string, relation:string}|null} [args.monsterPopulation] - pre-rolled dungeon-wide monster population: ONE creature_type (one of MONSTER_CREATURE_TYPES) + ONE cognition-gated relation tag (one of RELATION_TAGS_BY_COGNITION). All three encounter slots (minion / strong_minion / large_creature) inherit this creature_type — the roster reads as three tiers of the same population, not three unrelated creatures. The relation applies dungeon-wide. When null, falls back to the free-pick monsters[] schema.
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
  powerStructure = null,
  organizingLogic = null,
  contender = null,
  povFrame = null,
  placeType = null,
  nameTemplate = null,
  contact = null,
  registerPool = null,
  motive = null,
  formedNature = null,
  mode = null,
  monsterPopulation = null,
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

  // Place-type vocabulary line — when placeType is pre-rolled from
  // the organizing-logic bucket, inject as a hard constraint. When
  // null (legacy callers, or 'invent' open-slot organizingLogic),
  // fall back to the free list so the LLM picks contextually.
  // Name-template section. When nameTemplate is pre-rolled, REPLACE the
  // full template listing with the single rolled template (variety is
  // enforced by the roller, not by prose guidance). When null, fall
  // back to the full listing.
  const compoundAdjectiveNudge = (nameTemplate && (nameTemplate.id === 'B' || nameTemplate.id === 'F'))
    ? "\n\nFor the [English-adjective] slot, prefer a SINGLE-WORD adjective ('Hollow', 'Burnt', 'Silent', 'Cold', 'Iron', 'Sunken'). AVOID compound hyphenated adjectives like 'Bread-Warm', 'Monsoon-Carved', 'Shadow-Cindered' — they read as their own samey cluster across generations."
    : '';

  const nameTemplatesBlock = nameTemplate
    ? `NAME TEMPLATE FOR THIS GENERATION (pre-rolled in code; do not substitute another shape):

  Template ${nameTemplate.id} — ${nameTemplate.shape}
    Examples: ${nameTemplate.examples.map(e => `"${e}"`).join('  ·  ')}

Fill the slot(s) using the register (for register-flavored proper nouns) and the place-type noun specified below.${compoundAdjectiveNudge}`
    : `NAME TEMPLATES — pick ONE per generation. Each template produces a different rhythm; rotating across templates is the variety mechanism. Match the template to the dungeon's type and tension rather than reaching for the same pattern every time.

  Template A — [Register-noun] [Place-type]
    "Eikheim Barrow"  ·  "Vetha Crypt"  ·  "Drakhal Mine"  ·  "Slánú Hold"

  Template B — [English-adjective] [Place-type]
    "Hollow Vault"  ·  "Burnt Spire"  ·  "Silent Hold"  ·  "Drowned Catacombs"

  Template C — [Place-type] of [Register-noun]
    "Crypt of Vetheras"  ·  "Tomb of Eikheim"  ·  "Vault of Halgrim"  ·  "Sepulcher of Slánú"

  Template D — [Place-type] of [English-noun phrase]
    "Halls of Slow Light"  ·  "Sepulcher of Bones"  ·  "Tomb of the Last King"  ·  "Pit of Long Names"

  Template E — [Register-noun]'s [Place-type]
    "Vetheras's Crypt"  ·  "Halgrim's Hold"  ·  "Brunhild's Sanctum"  ·  "Eikheim's Maze"

  Template F — [English-adjective] [English-noun]
    "Sunken Wreck"  ·  "Iron Sanctum"  ·  "Cold Citadel"  ·  "Bright Hollow"`;

  // The bias warning only fires when the templates listing is shown.
  // With a pre-rolled template the rotation is mechanical and the
  // warning isn't needed (would just confuse the LLM about a shape it
  // wasn't given).
  const templateBiasWarning = nameTemplate
    ? ''
    : `\n\nTEMPLATE-BIAS WARNING:
Templates A, C, and E (the noun-modifier and of-/possessive shapes) are the LLM's grammatical safe-defaults. They will dominate without active rebalancing — every dungeon ending up "X Barrow" or "Crypt of X" is the failure mode. Treat them as ONE option among six, not the reflex. Templates B, D, and F (adjective-led and English-noun-phrase shapes) carry mood the others don't — reach for them when the dungeon's tension calls for atmosphere over a single proper noun. A session log of ten dungeons should show four or five different templates, not ten variants of one.`;

  const placeTypeLine = placeType
    ? `Place-type noun for THIS generation: USE EXACTLY "${placeType}" — pre-rolled in code from the bucket gated on the rolled organizing logic. Do NOT substitute another noun (no "Sepulcher" for a containment place, no "Tomb" for a foundry, etc.). The template choice is yours; the noun is fixed.`
    : `Place-type vocabulary (use ONE per name, in any of the templates above):\nBarrow, Crypt, Tomb, Vault, Hold, Spire, Halls, Maze, Mine, Catacombs, Lair, Reach, Mound, Watch, Pit, Tower, Citadel, Keep, Sanctum, Den, Sepulcher, Sanctuary, Ruins, Hollow, Wreck, Roost, Grove, Compound, Foundry, Outpost`;

  // Register pool injection — a rotated subset of curated names for
  // this generation. The LLM derives new names from these patterns;
  // it must NOT reuse the samples directly (the descriptor already
  // describes the phonology — these are concrete examples of how
  // that phonology lands as names).
  const registerPoolBlock = Array.isArray(registerPool) && registerPool.length > 0
    ? `\nSAMPLE NAMES IN THIS REGISTER (rotated subset for THIS generation — DERIVE new names from these patterns; do NOT reuse them directly):\n${registerPool.map(n => `- ${n}`).join('\n')}\n`
    : '';

  const registerDirective = register
    ? `LINGUISTIC REGISTER: ${register}.

INNER PROPER NOUNS must match this register: the boss / miniboss / other NPCs by name, faction names, named items and relics, named chambers and inner locations. These derive from the register's phonology, naming conventions, and cultural texture — they're the in-world detail the GM uses at the table.
${registerPoolBlock}

THE DUNGEON'S OWN NAME (the "name" field) and SUBTITLE (the "title" field) MUST BE ENGLISH-READABLE. A GM has to say it aloud, write it on a session note, search for it in their campaign log.

${nameTemplatesBlock}

${placeTypeLine}${templateBiasWarning}

HARD RULES (verify the chosen name before returning):
- 2-5 English words total. Compact, scannable, sayable.
- DO NOT begin the name with a leading article ("the", "a", "an"). The name STARTS with its first content word — a proper noun, adjective, or place-type. Examples: "Hollow Vault" not "the Hollow Vault"; "Halls of Slow Light" not "the Halls of Slow Light"; "Sunken Wreck" not "the Sunken Wreck". The article-led variant is the failure mode that makes a session log of ten dungeons read as ten names starting with "the".
- AT MOST ONE word may be register-flavored (a 1-3 syllable proper noun like "Eikheim", "Vetha", "Slánú"). All other words are English.
- NO foreign-language conjunctions, articles, or particles in the name ("an", "na", "ša", "el", "del", "tabal-ša"). If the register's natural naming uses these particles, that grammar stays inside the dungeon — on chambers, NPCs, items — NEVER in the dungeon's display name.

TRANSLATION HANDOFF — mirrors the item-generator translation rule.
When the register is non-English (Norse, Welsh, Old-Irish, Mesopotamian, Yoruba, Quechua, etc.), the culturally-rooted original-language phrase (the kind a register's poets would actually use) does NOT go in the "name" field. It goes in the FIRST SENTENCE of the "overview" field with cultural framing — so the GM has an English handle for their session notes and the cultural specificity is established once, in prose, where it belongs.

DON'T:
  name: "Fuar-chroí an Slánú"
  overview: "The barrow sits low..."

DO:
  name: "Slánú Barrow"
  title: "Cold Heart of Salvation"
  overview: "Known to the highland folk as Fuar-chroí an Slánú — the cold heart of salvation — the barrow sits low..."

DON'T:
  name: "Uaigheanna na nGaoth Fuar"
  overview: "A wind-scoured tomb..."

DO:
  name: "Crypt of Cold Winds" (Template C with English noun-phrase) — OR — "Wind-Scoured Crypt" (Template B)
  title: "Where the Gales Never Settle"
  overview: "The folk who buried their dead here called this place Uaigheanna na nGaoth Fuar — the graves of cold winds. A wind-scoured tomb..."

The English name is for usability at the table; the original-language phrase in the overview's first sentence is what makes the dungeon culturally rooted rather than culturally-flavored generic. Mention the original-language phrase ONCE in the overview — do not repeat it across other fields.

FAIL examples (these have NO English name and put the foreign phrase in the name field):
  name: "Uaigheanna na nGaoth Fuar"
  name: "Túath an Bhanríon Marbh"
  name: "Kírkjuvegr-jökulsbrú"
  name: "Fuar-chroí an Slánú"
  name: "Mausoleum tabal-ša-Esagila"

${REGISTER_PROSE_DIRECTIVE}`
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

  // Power-structure constraint. Injects the rolled structure's
  // directive near the tension block; for non-apex values, also swaps
  // the dominant_power schema field instruction so the field can carry
  // a non-apex description (multiple unrelated forces, a hazard, an
  // institution, an absence).
  const powerStructureBlock = powerStructure && POWER_STRUCTURE_DIRECTIVES[powerStructure]
    ? `\nPOWER STRUCTURE (pre-rolled for this generation; overrides the apex assumption where applicable):\n${POWER_STRUCTURE_DIRECTIVES[powerStructure]}\n`
    : '';

  const dominantPowerFieldText =
    (powerStructure && POWER_STRUCTURE_DOMINANT_POWER_OVERRIDES[powerStructure])
      ? POWER_STRUCTURE_DOMINANT_POWER_OVERRIDES[powerStructure]
      : BASELINE_DOMINANT_POWER_FIELD_TEXT;

  // Organizing-logic constraint block. Composite logics (length 2)
  // inject both directives so the friction between them is visible
  // to the LLM. Open slot ('invent') dispatches to its own directive.
  const organizingLogicValues = Array.isArray(organizingLogic) && organizingLogic.length > 0
    ? organizingLogic
    : (typeof organizingLogic === 'string' && organizingLogic
       ? [organizingLogic]
       : []);
  const organizingLogicBlock = organizingLogicValues.length > 0
    ? `\nORGANIZING LOGIC (the BONES — pre-rolled; tells you what the place was BUILT or SHAPED FOR, separate from what it currently LOOKS LIKE):\n${organizingLogicValues
        .map(l => ORGANIZING_LOGIC_DIRECTIVES[l])
        .filter(Boolean)
        .join('\n\n')}\n`
    : '';

  // Contender (rival outsider racing the party) block. Built from
  // the rolled fold: { present, position?, stance?, openSlot? }.
  // Absent (present: false) injects no block at all.
  let contenderBlock = '';
  if (contender && contender.present) {
    const kindPart = contender.kind && CONTENDER_KIND_DIRECTIVES[contender.kind]
      ? `\n\n${CONTENDER_KIND_DIRECTIVES[contender.kind]}`
      : '';
    contenderBlock = `\n${CONTENDER_PRESENT_FRAMING}${kindPart}\n`;
  }

  // Contact block — mirror of contender, gated on contact.present.
  // Present: framing + reliability + offers (or invent for open slot).
  // Absent: explicit "no helpful insider" directive, so the LLM
  //   doesn't manufacture a sympathetic helper to fill the gap.
  let contactBlock = '';
  if (contact && contact.present) {
    if (contact.openSlot) {
      contactBlock = `\n${CONTACT_INVENT_DIRECTIVE}\n`;
    } else {
      const reliabilityPart = contact.reliability && CONTACT_RELIABILITY_DIRECTIVES[contact.reliability]
        ? `\n\n${CONTACT_RELIABILITY_DIRECTIVES[contact.reliability]}`
        : '';
      const offersPart = contact.offers && CONTACT_OFFERS_DIRECTIVES[contact.offers]
        ? `\n\n${CONTACT_OFFERS_DIRECTIVES[contact.offers]}`
        : '';
      contactBlock = `\n${CONTACT_PRESENT_FRAMING}${reliabilityPart}${offersPart}\n`;
    }
  } else if (contact && contact.present === false) {
    contactBlock = `\n${CONTACT_ABSENT_DIRECTIVE}\n`;
  }

  // npc_list third-NPC line — gated on contact presence. When contact
  // is present, the contact IS the third NPC (don't manufacture
  // another one). When absent, the third NPC is an antagonist or
  // neutral (NEVER a helper-flavored captive / hermit / defector
  // shape — that's what the absent contact directive forbids).
  const thirdNpcLine = (contact && contact.present)
    ? "3. The CONTACT (see CONTACT block above) — render them as the named third NPC with reliability and offers matching the rolled axes. Do NOT add a second helper-shaped NPC."
    : "3. At least one other named NPC — an ANTAGONIST or NEUTRAL ONLY: a rival faction leader, a sub-boss the order has put in charge of a wing, a sentry-captain with a name, a neutral witness who refuses to take sides. NEVER a helper-shaped figure (no captive who knows a secret way, no turnable defector, no sympathetic hermit) — there is no contact in this dungeon by design.";

  // Motive block — the WHY of the delve. Injected alongside the
  // other rolled-dimension blocks. Null path skips injection.
  const motiveBlock = motive && MOTIVE_DIRECTIVES[motive]
    ? `\n${MOTIVE_DIRECTIVES[motive]}\n`
    : '';

  // Formed-nature block — only set when 'formed' is in organizingLogic.
  // Pairs the framing (anti-amorphous rule) with the per-value
  // directive (phenomenon or remnant).
  const formedNatureBlock = formedNature && FORMED_NATURE_DIRECTIVES[formedNature]
    ? `\n${FORMED_NATURE_FRAMING}\n\n${FORMED_NATURE_DIRECTIVES[formedNature]}\n`
    : '';

  // Mode block — the intended posture of play, conditioned on holder.
  // Each mode's directive names the verb, win-condition, and the
  // deviation cost (the brute-force path that is lethal).
  const modeBlock = mode && MODE_DIRECTIVES[mode]
    ? `\n${MODE_DIRECTIVES[mode]}\n`
    : '';

  // Mode-conditional difficulty clause — names the rolled mode and
  // tells the GM the rating ASSUMES that mode. Appended to the
  // difficulty_level schema field text when mode is set.
  const modeDifficultyClause = mode
    ? ` Mode-conditional rating: this rating assumes the party plays the rolled mode (${mode}). Express the assumption as a FACT about the situation — name what makes the brute-force path lethal in concrete terms about the dungeon itself: the central power's relative strength when engaged head-on, the order's coordination time when alerted, the hazard's awake form, what happens to the standoff when one power feels threatened. The cost lives in what is TRUE about the dungeon — the deadly path is a fact about the situation a GM reads from the field, not an instruction delivered to them.`
    : '';

  // Motive-aware clauses appended to present_state / difficulty_level
  // schema field text. Default to empty string when motive is null
  // (legacy) or when no clause exists for the rolled motive (e.g. invent).
  const motivePresentStateClause = motive && MOTIVE_PRESENT_STATE_CLAUSES[motive]
    ? ` ${MOTIVE_PRESENT_STATE_CLAUSES[motive]}`
    : '';
  const motiveDifficultyClause = motive && MOTIVE_DIFFICULTY_CLAUSES[motive]
    ? ` ${MOTIVE_DIFFICULTY_CLAUSES[motive]}`
    : '';

  // Acquisition coupling on central_dynamic: when motive=acquisition,
  // the central_dynamic must name the PRIZE concretely. This is the
  // load-bearing slot for acquisition rendering.
  const acquisitionPrizeNote = motive === 'acquisition'
    ? " Under the ACQUISITION motive, the central_dynamic MUST name the PRIZE concretely (what it is, why it's worth taking, where in the dungeon it sits) and render the RIVAL'S PROGRESS against the party's (who's ahead, how the party knows). The prize's PROPERTIES must be table-runnable: state what the prize DOES in play — what it grants, what it activates, what it changes, who it lets the holder bind, kill, or compel. 'A key to a god's mind' is not a property; 'speaks the true names of three named lords and binds them for one hour each' is. The GM must be able to adjudicate use without inventing the mechanic on the spot."
    : '';

  // current_occupation schema field text — when a contender or contact
  // is present, the field is one of their primary homes. Pulled into a
  // variable so apostrophes don't fight nested template-literal parsing.
  const contenderHomeNote = contender && contender.present
    ? " A CONTENDER (rival outsider) has been pre-rolled for this generation (see CONTENDER block above) — this field is the contender's primary home; render their present activity consistent with the rolled CONTENDER KIND directive."
    : '';
  const contactHomeNote = contact && contact.present
    ? " A CONTACT (in-dungeon NPC the party can use) has been pre-rolled (see CONTACT block above) — their current activity belongs here, and the rendering MUST be consistent with the rolled reliability and offers (a treacherous contact reads as treacherous in this field; a force contact's combat role is named)."
    : '';
  const currentOccupationFieldText =
    `WHO / WHAT IS IN THE DUNGEON RIGHT NOW and what they are doing. Concrete, named, immediate. Different from inhabitants (which is the social fabric generally) — current_occupation is THIS WEEK'S situation. Methodically-looted has a rival expedition mid-extraction or just-retreated; freshly-occupied has the new occupiers establishing; cult-ascendant has a ritual in preparation.${contenderHomeNote}${contactHomeNote} 2-3 sentences. Voice anchor: who is here right now and what they are DOING — name it, name the clock that ends what they are doing.`;

  // POV frame block + derived overview-field schema text. The overview
  // field is re-spec'd as a POV hook (the carve-out from
  // OPERATIONAL_VOICE_BLOCK). When povFrame is set, inject the rolled
  // frame's directive and interpolate the frame name into the overview
  // schema text. When null, the overview schema text falls back to a
  // generic POV-hook framing.
  const povFrameBlock = povFrame && POV_FRAME_DIRECTIVES[povFrame]
    ? `\n${POV_FRAME_DIRECTIVES[povFrame]}\n`
    : '';

  const overviewFieldText = povFrame
    ? `POV HOOK (NOT atmospheric prose). A short hook delivered from a specific point of view — the frame rolled for THIS generation is ${povFrame} (see the POV FRAME block above for delivery instructions). The overview MUST carry the SINGLE most intriguing, concrete, question-raising specific about this dungeon, voiced through the frame's bias and partial knowledge — and it doubles as an in-world adventure hook (how the party hears of the place). 2-3 short sentences. This field is the ONE EXCEPTION to the OPERATIONAL VOICE rules — characterful voiced delivery is the point. Do NOT default to omniscient atmospheric prose ("the air tastes of...", "a hum like a ... breathing"); use the rolled POV.`
    : `POV HOOK (NOT atmospheric prose). A short hook delivered from a specific point of view — a voice with bias, partial knowledge, and a stake — that doubles as an in-world adventure hook (how the party hears of the place). The overview MUST carry the SINGLE most intriguing, concrete, question-raising specific about this dungeon. 2-3 short sentences. This field is the ONE EXCEPTION to the OPERATIONAL VOICE rules — characterful voiced delivery is the point.`;

  // Minion-population constraint block. When monsterPopulation is
  // pre-rolled, inject ONE creature_type + ONE relation that apply
  // ONLY to the minion + strong_minion slots. The large_creature
  // (the apex) is intentionally left unconstrained — a distinct
  // kind from the minions, the dungeon's signature solo threat,
  // free-picked by the LLM to fit the place.
  const hasValidPopulation = !!(
    monsterPopulation
    && typeof monsterPopulation === 'object'
    && typeof monsterPopulation.creature_type === 'string'
    && typeof monsterPopulation.relation === 'string'
  );
  const monsterPopulationBlock = hasValidPopulation
    ? `\nMINION POPULATION (pre-rolled in code; applies to minion + strong_minion slots):\n  creature_type: "${monsterPopulation.creature_type}"\n  relation:      "${monsterPopulation.relation}"\n  Relation directive: ${RELATION_DIRECTIVES[monsterPopulation.relation] || ''}\n\nThe minion and strong_minion slots are TWO TIERS of the SAME population — basic and lieutenant of one kind. Pick names + descriptions that read as one population scaled, not two unrelated creatures.\n\nThe relation describes how the minion population ties to the dungeon's powers — read the directive's behavior into their role.\n\nThe large_creature slot is NOT constrained by this block — pick a distinct apex creature that fits the dungeon's character and is clearly different from the minion population.\n\nThe inhabitants / dominant_power prose MUST reference the minions by the names you give them here.\n`
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
${powerStructureBlock}${organizingLogicBlock}${formedNatureBlock}${contenderBlock}${contactBlock}${povFrameBlock}${motiveBlock}${modeBlock}
DIFFICULTY MODULATES STAKE-SCOPE THROUGHOUT, NOT JUST MONSTER STATS. Tier 1 prose reads local — a bandit-king bound under a hilltop barrow, a village's missing children traced to a sewer-maze. Tier 5 prose reads cosmic — a primordial bound at the underworld's edge, a god-corpse whose dreams remake reality. Same tension SHAPE, different STAKES. Match the stake-scope to the tier in every field — history is local-history or god-scale-history; dominant_power is a local rival or a planar entity; treasures_and_resources are grave-goods or reality-altering artifacts. Do not bake high stakes into a Tier 1 dungeon's prose or local stakes into a Tier 5.

User input description: "${safeDescription}"
User input lore: "${safeLore}"

LORE PRESERVATION:
Specific named entities in the user-provided lore are AUTHORITATIVE and must be preserved with the user's exact terminology. Named characters, places, factions, customs, organizations — all must appear in the generated output using the user's exact names. Build the dungeon AROUND user-named details rather than replacing them with thematically-similar inventions. If user lore mentions a PC's connection to this dungeon, the output must acknowledge it (a family grave, an old enemy, a discovered childhood landmark, an inherited claim).

FANTASY TEXTURE REQUIREMENT (mandatory — verify before returning):
The dungeon's CENTRAL SUPERNATURAL REALITY must be NAMED and PRESENT-TENSE. Most dungeons are inherently supernatural (the dragon, the lich, the ancient curse, the bound spirit, the planar incursion) — whatever the central supernatural identity is, it must be specifically named (drawn from the register's mythological tradition where possible) and operating NOW. The supernatural identity ACTS in the present tense: it dreams, it warns, it stirs, it consumes, it answers. Its actions have ongoing concrete effects the party can observe and the GM can adjudicate at the table tonight.

Draw the supernatural identity from the register's tradition where the register supports it:
- Norse → draugr, jötunn, fylgja, vættir
- Celtic → sídhe, púca, fey, Tylwyth Teg
- Mesopotamian → ūtukku, edimmu, mušḫuššu
- Egyptian → akh, sheut, kheper
- Greek → genius loci, dryad, lamia
- Generic-fantasy → name your own supernatural identity with intentional weight

The opposite of this rule — a supernatural identity rendered as past-tense, faded, broken, forgotten, dead-and-gone — reads as fantasy but FUNCTIONS as historical fiction; the party has nothing to confront, only memorials to read. If every supernatural reference is past-tense, broken, or aspirational, the dungeon fails the texture requirement. At least one supernatural identity (usually the central one) must be present-tense, named, and acting on the world right now.

${DUNGEON_TRAVERSAL_INVARIANT}
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

${OPERATIONAL_VOICE_BLOCK}

${SCHEMA_LEAK_DIRECTIVE}

BOSS-VS-MINIBOSS LOGIC (preserved from the proven dungeon pattern):
- If the "boss" (the dominant power) is an INTELLIGENT NAMED ENTITY (a lich, a vampire lord, a cunning dragon with motives, a cult leader, a planar regent): include them in \`npc_list\` under a unique name. They are an NPC the party can roleplay with.
- If the "boss" is TRULY MINDLESS OR BESTIAL (a giant burrowing worm, a primal elemental with no language, a fungal mass): include them in \`monsters\` as the large_creature entry. They are a monster the party encounters in combat, not roleplay.
- The "miniboss" is a mid-tier antagonist with a name and personal motivations — ALWAYS an NPC in \`npc_list\`, never a monster. They might serve, oppose, or be neutral to the dominant power.
- NO monster in \`monsters\` shares a name OR a distinctive name-root with any NPC in \`npc_list\`. A monster called "Krok-Vraz the Ironbound" and an NPC called "Krok-Vraz" is a violation — so is "Knikkit" the NPC and "Knikkit-Gron" the monster (same root). At the table the GM will say the wrong name. Each monster name must be lexically distinct from every NPC name in stem, prefix, and core syllables.

${monsterPopulationBlock}MONSTERS — EXACTLY 3 (the encounter palette):
1. A basic minion (type: "minion", CR ~${monsterCRs.minion}).
2. A stronger lieutenant minion (type: "strong_minion", CR ~${monsterCRs.strongMinion}).
3. A large creature (type: "large_creature", CR ~${monsterCRs.largeCreature}) — this is EITHER the bestial boss (when boss-vs-miniboss logic flags the boss as mindless) OR a separate large entity with no overlapping NPC name.

NPCs — AT LEAST 3 in \`npc_list\`:
1. The miniboss (named individual, mid-tier antagonist).
2. The boss IF they're intelligent (named individual, dominant power).
${thirdNpcLine}
The \`npc_list\` can include more than 3 — add any other individuals the prose mentions by name.

Return the description in JSON format with the following keys. Make sure \`named_entities\` includes EVERY personal name mentioned across all prose fields (these get first-mention bolding in the renderer). Keep descriptions concise:

{
  "name": ${userName ? `"${userName}" (use this verbatim)` : '"the dungeon\'s proper noun, in English. Pick ONE of the six NAME TEMPLATES (A through F) defined above and fill it; rotate template choice across generations rather than defaulting to the same shape. 2-5 English words. At most one register-flavored proper noun. NO foreign-language articles or particles (an / na / ša / el / etc.). If the register has a culturally-rooted original-language phrase, it belongs in the FIRST SENTENCE of the overview field, not here — see TRANSLATION HANDOFF above."'},
  "title": "A short evocative phrase (3-5 words, max 6) that pairs with the name as a subtitle. STRUCTURE: a phrase, not a sentence — NO 'where X does Y' clauses, NO conjugated verbs (no 'are', 'is', 'was', 'were', 'has', 'have', no '-ed' / '-ing' verb forms used as predicates). DO NOT begin with a leading article ('the', 'a', 'an') — the title starts with its first content word, same rule as the name. PASS: 'Tomb of the Singing Bones', 'Halls of Slow Light', 'Crypt of the Forgotten Vow'. FAIL: 'Where Oaths Are Knotted in Bone' (leading 'Where' + passive-voice conjugated 'Are Knotted' = clause, not phrase). FAIL: 'The Bones Sing in the Dark' (full sentence with subject + verb). SUGGEST the character qualities through imagery; do NOT use a character quality word as an adjective.",
  "overview": ${JSON.stringify(overviewFieldText)},
  "relation_to_larger_setting": "WHERE this dungeon sits geographically. What region, what landmarks border it, what local powers know of it. 2-3 sentences. Provide a name for the larger region if natural. Voice anchor: the geography matters because it is a way IN, a way OUT, or a way to bring help — name those. Example: 'the only path in is a three-day climb that puts the party out of sleep-cycle by the time they arrive.'",
  "approach_and_threshold": "HOW the party reaches the dungeon and what the entrance experience is. The threshold scene — the door, the descent, the warded sigils, the first chamber's character. 2-3 sentences. This is the GM's first-room handout when the party arrives. Concrete and spatial. Voice anchor: every threshold detail is a decision-point the party will make at the table. Example: 'the door is barred from the inside; the bar has been chopped at recently — by whom, and is whoever did it still inside?'",
  "history": "A brief history of the dungeon — founding / creation / what it was built for, and one or two pivotal events. Scope-match the tier: local history for Tier 1, cosmic history for Tier 5. Plain prose. Every history beat must be LOAD-BEARING IN THE PRESENT: a beat earns its place if cutting it would change what the party adjudicates or what is currently happening in the dungeon. Cosmological backstory belongs here only when its mechanism is still operating now (a cinder still in a hearthstone, a pact still being honored or broken, an old grievance still moving). Voice anchor: lead with what the GM needs to ADJUDICATE in play — promises kept or broken, debts owed, names the party may hear.",
  "dominant_power": "${dominantPowerFieldText}",
  "inhabitants": "WHO/WHAT LIVES OR WORKS INSIDE the dungeon — minions, mid-tier creatures, rival factions, prisoners, occasional residents (a captured NPC, a hermit, traders passing through). The social fabric of the dungeon's interior. Layered when the tension calls for it (succession-fracture has two factions; scoured-and-claimed has one dominant force + their direct servants; pilgrimage-route may include other expeditions). 2-3 sentences. Voice anchor: a RELATIONAL MAP, not a roster — who fears whom, who can be turned, who can be exploited. Every named faction or group MUST carry a knowable GOAL the GM can state in one line — what they want HERE, what they want NEXT, why this dungeon (not somewhere else). Players may never learn the goal; the GM always knows it, so the faction can respond to the party with intent rather than opacity. NATURE TWIST RULE: when a faction's NATURE has a non-obvious truth that reframes every interaction with them (these aren't jailers, they're worshippers; these aren't guards, they're hostages; these aren't allies, they're competitors), the twist belongs HERE, in inhabitants — NOT in present_state. The twist is part of who they ARE; present_state describes what they're DOING now. Burying the twist downstream makes the GM find the most load-bearing fact about the faction last.",
  "notable_inhabitant_facet": "OPTIONAL. One sentence about a current notable detail of the inhabitants. Plain prose. Empty string is acceptable.",
  "hazards_and_dangers": "HAZARDS AND DANGERS — the physical, magical, environmental, and architectural threats of this place, regardless of who (if anyone) placed them. The source can be ANY of: defender-installed wards and traps (when an apex or institution rules), residual systems left running long after their makers are gone, the hazard process itself when nobody rules (rot, slippage, bloom, radiation), accumulated leftovers from history (old battles, broken experiments, contaminated chambers), or hazards intrinsic to the place's nature (a flooded crypt's drowning chambers, a god-corpse's spawning biology, a fey-grove's hostile geometry, a factory-ruin's unstable boilers). Tie the hazards to WHAT THIS PLACE IS — they should feel inevitable given the type, character, history, and power structure, not pasted on from a generic trap list. NOT just 'forces guarding it' (that's inhabitants). 2-3 sentences. Voice anchor: each threat is a LEVER the party can read, avoid, or disarm. Example: 'the cistern overflows on a known cycle; cross between cycles or get carried into the lower works.'",
  "notable_hazard_facet": "OPTIONAL. One sentence about a current notable detail of the hazards. Empty string is acceptable.",
  "central_dynamic": "HOW THE CENTRAL TENSION CURRENTLY MANIFESTS in the dungeon. Frame in the tension's terms — see the CENTRAL TENSION block above. This is the load-bearing field; it tells the GM what the dungeon is ACTIVELY DOING right now. 2-3 sentences. BELIEF COMMITMENT: when the central tension hinges on a faction's BELIEF about the dungeon's contents (a worshipped relic, a feared prison, a prophesied awakening, a venerated remnant), commit to whether the faction's belief is TRUE or MISTAKEN — and state which. 'They believe the shard will remake the continent' tells the GM nothing about adjudication; 'they believe the shard will remake the continent, and they are wrong — it is a sealed prison, and breaking it releases what was bound, not a prophecy' tells the GM what happens when the party acts. The GM must know which scenario they're running.${acquisitionPrizeNote}",
  "current_occupation": ${JSON.stringify(currentOccupationFieldText)},
  "present_state": "WHAT IS HAPPENING in the dungeon right now, what is CHANGING, and what is LOST if the party does nothing — read through the tension's lens (the tension's pacing sets the rate of change; the dungeon is in motion, not posed). 2-3 sentences. Voice anchor: the live situation and its CLOCK — what changes if the party does nothing for another day, week, or hour.${motivePresentStateClause}",
  "difficulty_level": "A short note (1-2 sentences) on the dungeon's difficulty — what kind of party should attempt this and what scope of consequences success or failure carries. Match ${tierEntry.name} explicitly. Voice anchor: WHO should attempt this and what is CONCRETELY at stake if they don't — scoped to the tier, grounded not cosmic.${motiveDifficultyClause}${modeDifficultyClause}",
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
      "name": "Basic-tier name from the dungeon's rolled minion creature_type population. NOT shared with any NPC.",
      "description": "1-2 sentences. The basic tier of the minion population. Behavior follows the population's rolled relation directive.",
      "CR": "${monsterCRs.minion}"
    },
    {
      "type": "strong_minion",
      "name": "Lieutenant-tier name from the SAME minion creature_type population — clearly the same kind, one tier up.",
      "description": "1-2 sentences. A more capable tier of the same minion population — better-equipped, more individuated, harder to remove. Same relation directive.",
      "CR": "${monsterCRs.strongMinion}"
    },
    {
      "type": "large_creature",
      "name": "Apex name — a DISTINCT KIND from the minion population. The bestial boss if applicable, OR a separate large threat that fits the dungeon's character.",
      "description": "1-2 sentences. The dungeon's solo apex. Bestial if it's the dominant power; otherwise a separate large threat. Never shares a name with any NPC.",
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
    'hazards_and_dangers',
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
    'notable_hazard_facet',
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
