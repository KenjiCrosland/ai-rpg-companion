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
 *   - Tension shapes the field framings (central_dynamic, inhabitants,
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
  buildAdjudicatableDangerRule,
  pickRegisterCreatureForTier,
  pickRegisterMaterials,
  OPERATIONAL_VOICE_BLOCK,
  SCHEMA_LEAK_DIRECTIVE,
  POWER_STRUCTURE_DIRECTIVES,
  POWER_STRUCTURE_DOMINANT_POWER_OVERRIDES,
  ORGANIZING_LOGIC_DIRECTIVES,
  CONTENDER_PRESENT_FRAMING,
  CONTENDER_KIND_DIRECTIVES,
  CONTACT_KIND_DIRECTIVES,
  POV_FRAME_DIRECTIVES,
  CONTACT_PRESENT_FRAMING,
  MOTIVE_DIRECTIVES,
  MOTIVE_PRESENT_STATE_CLAUSES,
  FORMED_NATURE_FRAMING,
  FORMED_NATURE_DIRECTIVES,
  MODE_DIRECTIVES,
  RELATION_DIRECTIVES,
} from '../util/dungeon-dimensions.mjs';
import { REGISTER_PROSE_DIRECTIVE } from '@/shared/register-list.mjs';
import { findRegisterByPrefix } from '@/shared/registers/index.mjs';

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
 * @param {Object|null} [args.thirdParty] - unified outsider shape `{ present: boolean, type?: 'adversary'|'ally', kind? }`, or null for legacy callers. When `present: true` + `type: 'adversary'`, injects CONTENDER_PRESENT_FRAMING + the per-kind directive from CONTENDER_KIND_DIRECTIVES (19 adversary shapes). When `present: true` + `type: 'ally'`, injects CONTACT_PRESENT_FRAMING + the per-kind directive from CONTACT_KIND_DIRECTIVES (10 ally shapes). When `present: false` or null, no block is injected.
 * @param {string|null} [args.povFrame] - one entry from POV_FRAMES (or null for legacy callers). When set, injects the POV FRAME block and rewrites the overview schema field instruction to invoke the rolled frame as a POV hook (the single carve-out from OPERATIONAL_VOICE_BLOCK).
 * @param {string|null} [args.placeType] - the place-type noun for the dungeon's title (Sepulcher, Hold, etc.), pre-rolled in code from the bucket gated on organizingLogic. When set, injected into the name-templates section as a HARD CONSTRAINT (overrides the free-list vocabulary). Null falls back to the free list.
 * @param {Object|null} [args.nameTemplate] - one entry from NAME_TEMPLATES `{id, shape, requiresRegister, examples}` (or null for legacy callers). When set, the prompt replaces the full template listing with the single rolled template + compound-adjective nudge for B/F. Null falls back to the full template list + bias warning.
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
  thirdParty = null,
  povFrame = null,
  placeType = null,
  nameTemplate = null,
  registerPool = null,
  motive = null,
  formedNature = null,
  mode = null,
  monsterPopulation = null,
  rng = Math.random,
} = {}) {
  const safeDescription = (description || '').replace(/"/g, '\\"');
  const safeLore = (lore || '').replace(/"/g, '\\"');
  const safeUserName = userName ? `"${userName.replace(/"/g, '\\"')}"` : 'null';

  const characterList = Array.isArray(character) && character.length > 0
    ? character.join(', ')
    : 'ancient, haunted, fog-shrouded';

  const tierEntry = DIFFICULTY_TIERS[difficulty] || DIFFICULTY_TIERS[1];
  // Effective difficulty mirrors tierEntry's fallback path so the
  // displayed "Tier N" label stays consistent with the resolved
  // tierEntry. Without this, `difficulty: 99` would render
  // "TIER 99 DANGER SHELF" paired with Tier 1 shelf content.
  const effectiveDifficulty = DIFFICULTY_TIERS[difficulty] ? difficulty : 1;

  // Pre-roll example values for worked examples in rule headers and
  // schema field instructions. Without per-generation interpolation,
  // any concrete creature / material name baked into an example gets
  // cargo-culted into LLM outputs across generations (production
  // showed 'Sirmus' and 'wax' clustering across many dungeons). With
  // these pre-rolls, each generation's worked examples vary with the
  // rolled register and tier — the LLM learns the SHAPE without a
  // specific name to copy. When register has no tier-coded creatures /
  // material tradition (protected catchall registers), the helpers
  // return null and downstream code substitutes a bracket placeholder.
  const exampleCreature = pickRegisterCreatureForTier(register, effectiveDifficulty, rng);
  const exampleMaterials = pickRegisterMaterials(register, rng, 3) || [];
  const exampleMaterial    = exampleMaterials[0] || null;
  const exampleMaterialAlt = exampleMaterials[1] || exampleMaterials[0] || null;
  const exampleMaterial3rd = exampleMaterials[2] || exampleMaterials[0] || null;
  // Character slots for multi-character worked examples. Pulled from
  // the rolled register's character pool subset (registerPool) so the
  // worked examples vary with the rolled register every generation
  // instead of cargo-culting specific NPC names (Crauson Vex,
  // Sturmgeister, Loscán, Zenta were the production-observed clusters).
  const examplePool = Array.isArray(registerPool) ? registerPool : [];
  const exampleCharacterA = examplePool[0] || null;
  const exampleCharacterB = examplePool[1] || null;
  const exampleCharacterC = examplePool[2] || null;
  const monsterCRs = tierEntry.monsterCRs;

  const tensionDescription = DUNGEON_TENSION_DESCRIPTIONS[tension]
    || 'a central dramatic situation that gives this dungeon its shape and pacing.';

  // Name template section. When nameTemplate is pre-rolled, REPLACE
  // the full template listing with the single rolled template. When
  // null, list all four shapes. All templates are register-agnostic
  // and image-anchored: the load-bearing word is a concrete noun
  // mined from the dungeon's body fields (which the LLM has already
  // written by the time it reaches the name field at the end).
  const nameTemplatesBlock = nameTemplate
    ? `NAME TEMPLATE FOR THIS GENERATION (pre-rolled in code; do not substitute another shape):

  Template ${nameTemplate.id} — ${nameTemplate.shape}
    Examples: ${nameTemplate.examples.map(e => `"${e}"`).join('  ·  ')}

Fill the [image] slot per the IMAGE-FROM-CONTENT rule below. The place-type noun is specified below.`
    : `NAME TEMPLATES — pick ONE per generation. Frames are free; the image is mandatory.

  Template A — [image] [place-type]
    "Bone Hollow"  ·  "Mirror Tomb"  ·  "Salt Sepulcher"  ·  "Glass Warren"

  Template B — [adjective] [image] [place-type]
    "Frigid Bone Hollow"  ·  "Drowned Mirror Tomb"  ·  "Hollow Salt Sepulcher"

  Template C — [place-type] of (the) [image]
    "Garden of Bone"  ·  "Choir of Ash"  ·  "Cathedral of Salt"  ·  "Sanctum of Unfading Roses"  ·  "Nest of the Grik-torn"

  Template D — [image]-[participle] [place-type]
    "Moss-Buried Warren"  ·  "Grief-Sunk Hall"  ·  "Pitch-Lined Hold"

  Template E — [name]'s [image] [place-type]
    "${exampleCharacterA || "[character A]"}'s Ash Mill"  ·  "${exampleCharacterB || "[character B]"}'s Glass Compound"  ·  "${exampleCharacterC || "[character C]"}'s Bone Crypt"

  Template F — The [image]
    "The Maw"  ·  "The Cradle"  ·  "The Drowning"  ·  "The Witherward"  ·  "The Quiet Mile"  ·  "The Last Forge"`;

  const templateBiasWarning = '';

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

  // Creature-tradition injection — the rolled register's curated list
  // of mythologically-grounded non-human threats. Counters the LLM's
  // anthropocentric default (cults, guilds, orders) by giving it a
  // ready vocabulary of actual D&D-coded creatures the register
  // supports. Only populated for registers whose registry entry sets
  // `creatureTradition` — protected catchall registers (Maori, Yoruba,
  // Arabic, Andean, Japanese, etc.) and any future minimal registers
  // without one fall through to a generic invent-with-weight directive.
  const registerEntry = findRegisterByPrefix(register);
  const creatureTraditionBlock = registerEntry && typeof registerEntry.creatureTradition === 'string'
    ? `\nCREATURE TRADITION (for monsters / inhabitants / supernatural identity):
${registerEntry.creatureTradition}

When the dungeon needs a non-human threat, PREFER a creature from this list before inventing generic fantasy or another human institution (cult, guild, order). Two human factions arguing in a tomb is the failure case.\n`
    : '';

  // Material tradition — parallel to creatureTradition. Production
  // showed generic materials (wax, salt, ash) clustering across
  // registers that shouldn't share them. Each non-protected register
  // carries a curated material list; the prompt directs the LLM to
  // reach for these before generic fantasy defaults when describing
  // surfaces, hazards, ritual residue, and atmosphere.
  const materialTraditionBlock = registerEntry && typeof registerEntry.materialTradition === 'string'
    ? `\nMATERIAL TRADITION FOR THIS REGISTER:
The dungeon's surfaces, creatures, hazards, and atmosphere draw from these materials before reaching for generic fantasy defaults: ${registerEntry.materialTradition}.\n`
    : '';

  const registerDirective = register
    ? `LINGUISTIC REGISTER: ${register}.

Inner proper nouns (boss, miniboss, NPC names, faction names, named items / relics / chambers) derive from this register's phonology and cultural texture.
${registerPoolBlock}
${creatureTraditionBlock}
${materialTraditionBlock}

The dungeon's own NAME and TITLE fields MUST BE ENGLISH-READABLE — a GM has to say it aloud and write it in session notes.

${nameTemplatesBlock}

${placeTypeLine}${templateBiasWarning}

IMAGE-FROM-CONTENT RULE: the name's [image] slot must be a concrete element mined from the dungeon you've already written — pick the strangest TRUE detail. Image can be a THING (signature creature, central relic), an EVENT (something the dungeon still carries — "The Last Forge"), an OXYMORON (the dungeon's central contradiction — "Unfading Roses"), a NUMBER (a real count — "The Seven Rings"), or a CONSEQUENCE (what the place does to entrants — "The Witherward"). A reader should be able to find the image in your prose; if you can't, rewrite a field before naming the dungeon. "${exampleCharacterA || "[character A]"}'s Mill" is dead; "${exampleCharacterA || "[character A]"}'s Ash Mill" lives because Ash is mined from the dungeon. Single-word evocative compounds (Ashfall, Coldreave) work without a place-type.

HARD RULES: 2-5 English words. Leading "the" only for template F. At most ONE register-flavored proper noun. No foreign-language particles in the display name.

TRANSLATION HANDOFF: when the register is non-English, the culturally-rooted phrase goes in the FIRST SENTENCE of overview ("Known to the highland folk as [phrase] — [translation] — the barrow sits low..."), never in the name field. Don't repeat the phrase across other fields.

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

  // Third-party block — the unified non-controlling outsider. ONE
  // third party per dungeon (adversary OR ally, never both). When
  // absent, no block is injected. When present, the framing + per-kind
  // directive matches the rolled type/kind.
  let thirdPartyBlock = '';
  const tpPresent = thirdParty && thirdParty.present;
  if (tpPresent && thirdParty.type === 'adversary') {
    const kindPart = thirdParty.kind && CONTENDER_KIND_DIRECTIVES[thirdParty.kind]
      ? `\n\n${CONTENDER_KIND_DIRECTIVES[thirdParty.kind]}`
      : '';
    thirdPartyBlock = `\n${CONTENDER_PRESENT_FRAMING}${kindPart}\n`;
  } else if (tpPresent && thirdParty.type === 'ally') {
    const kindPart = thirdParty.kind && CONTACT_KIND_DIRECTIVES[thirdParty.kind]
      ? `\n\n${CONTACT_KIND_DIRECTIVES[thirdParty.kind]}`
      : '';
    thirdPartyBlock = `\n${CONTACT_PRESENT_FRAMING}${kindPart}\n`;
  }

  // npc_list third-NPC line — gated on ally-third-party presence.
  // When an ally is present, that ally IS the third NPC. Otherwise
  // the third NPC slot is an antagonist or neutral (no manufactured
  // helper-shaped figure).
  const tpIsAlly = tpPresent && thirdParty.type === 'ally';
  const thirdNpcLine = tpIsAlly
    ? "3. The ALLY third party (see CONTACT block above) — render them as the named third NPC with the kind directive's behavior reflected in their description. Do NOT add a second helper-shaped NPC."
    : "3. At least one other named NPC — an ANTAGONIST or NEUTRAL ONLY: a rival faction leader, a sub-boss the order has put in charge of a wing, a sentry-captain with a name, a neutral witness who refuses to take sides. NEVER a helper-shaped figure (no captive who knows a secret way, no turnable defector, no sympathetic hermit) unless one was rolled as the ally third party.";

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

  // Motive-aware clause appended to present_state schema field text.
  // Defaults to empty string when motive is null or no clause exists
  // for the rolled motive (e.g. invent).
  const motivePresentStateClause = motive && MOTIVE_PRESENT_STATE_CLAUSES[motive]
    ? ` ${MOTIVE_PRESENT_STATE_CLAUSES[motive]}`
    : '';

  // Acquisition coupling on central_dynamic: when motive=acquisition,
  // the central_dynamic must name the PRIZE concretely. This is the
  // load-bearing slot for acquisition rendering.
  const acquisitionPrizeNote = motive === 'acquisition'
    ? " Under the ACQUISITION motive, the central_dynamic MUST name the PRIZE concretely (what it is, why it's worth taking, where in the dungeon it sits) and render the RIVAL'S PROGRESS against the party's (who's ahead, how the party knows). The prize's PROPERTIES must be table-runnable: state what the prize DOES in play — what it grants, what it activates, what it changes, who it lets the holder bind, kill, or compel. 'A key to a god's mind' is not a property; 'speaks the true names of three named lords and binds them for one hour each' is. The GM must be able to adjudicate use without inventing the mechanic on the spot."
    : '';

  // Discovery coupling on central_dynamic: when motive=discovery, the
  // central_dynamic must name a PARTY-SPECIFIC hook for why the
  // knowledge matters. Without this, discovery dungeons read as
  // homework — "go map the lost archive" with no stake the party
  // would actually answer.
  const discoveryQuestionNote = motive === 'discovery'
    ? " Under the DISCOVERY motive, the central_dynamic MUST name a PARTY-SPECIFIC HOOK for why the knowledge matters — a coming threat only this knowledge counters, a debt or oath the answer cancels, a person the party needs to identify, a place the knowledge locates, a choice the party can't make blind. The knowledge must MATTER to who the party IS or what they're ABOUT TO FACE, not be a generic academic recovery. 'The party seeks the lost mappings' is homework; 'the mappings name the true crossing through the Bone Marsh, and the party's caravan was hired to escort a hundred refugees across it next week' is a delve. SPECIFICALLY BANNED: the dying-patron-needs-succession-document hook (a patron dying without an heir, an oath-clause for appointing a successor, an intestate-bloodline crisis). That pattern clustered hard in production — use a different stake shape. Also name the SLIPPAGE — what's actively erasing the knowledge inside, and the clock that ends it."
    : '';

  // Inhabitants now absorbs current-position work (current_occupation
  // was dropped). When a third party is pre-rolled, it counts as one
  // of the field's factions — exactly one sentence, same format as
  // the others.
  const thirdPartyInhabitantsNote = tpPresent
    ? (thirdParty.type === 'adversary'
      ? " The pre-rolled THIRD PARTY (adversary; see CONTENDER block above) counts as ONE of the field's factions — exactly one sentence with zone, goal, and behavioral note, consistent with the rolled CONTENDER KIND directive."
      : " The pre-rolled THIRD PARTY (ally; see CONTACT block above) counts as ONE of the field's factions — exactly one sentence with zone, goal, and behavioral note (their stated terms count as the behavioral note), consistent with the rolled CONTACT KIND directive.")
    : '';

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
    ? `\nMINION POPULATION (pre-rolled; applies to minion + strong_minion slots):\n  creature_type: "${monsterPopulation.creature_type}"\n  relation:      "${monsterPopulation.relation}"\n  Relation directive: ${RELATION_DIRECTIVES[monsterPopulation.relation] || ''}\n\nThe minion + strong_minion slots are TWO TIERS of the SAME population (basic + lieutenant). The large_creature is a DISTINCT apex. The inhabitants / dominant_power prose must reference the minions by the names you give them.\n\nSIGNATURE EVIDENCE: the apex's distinctive capability must appear as visible evidence in at least one body field (history, inhabitants, central_dynamic, or approach_and_threshold) — a cocooned expedition still warm, claw-marks at impossible height, the local fauna gone deaf, the chamber other factions refuse to enter. The party reads the dungeon and the creature's capability is already proven.\n\nCOMBAT-PRESSURE: at least ONE entity must be a credible combat threat the party CANNOT talk around. Default carrier is the large_creature (apex). The apex is ACTIVE in the present tense (not centuries-sealed, not dormant), its evidence is RECENT, and it cannot be negotiated past with words alone.\n`
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
${powerStructureBlock}${organizingLogicBlock}${formedNatureBlock}${thirdPartyBlock}${povFrameBlock}${motiveBlock}${modeBlock}
DIFFICULTY MODULATES STAKE-SCOPE THROUGHOUT, NOT JUST MONSTER STATS. Tier 1 prose reads local — a bandit-king bound under a hilltop barrow, a village's missing children traced to a sewer-maze. Tier 5 prose reads cosmic — a primordial bound at the underworld's edge, a god-corpse whose dreams remake reality. Same tension SHAPE, different STAKES. Match the stake-scope to the tier in every field — history is local-history or god-scale-history; dominant_power is a local rival or a planar entity; treasures_and_resources are grave-goods or reality-altering artifacts. Do not bake high stakes into a Tier 1 dungeon's prose or local stakes into a Tier 5.

User input description: "${safeDescription}"
User input lore: "${safeLore}"

LORE PRESERVATION:
Specific named entities in the user-provided lore are AUTHORITATIVE and must be preserved with the user's exact terminology. Named characters, places, factions, customs, organizations — all must appear in the generated output using the user's exact names. Build the dungeon AROUND user-named details rather than replacing them with thematically-similar inventions. If user lore mentions a PC's connection to this dungeon, the output must acknowledge it (a family grave, an old enemy, a discovered childhood landmark, an inherited claim).

FANTASY TEXTURE: the dungeon's CENTRAL SUPERNATURAL REALITY must be NAMED (drawn from the register's CREATURE TRADITION where available) and PRESENT-TENSE. It dreams, warns, stirs, consumes, answers — its actions have ongoing concrete effects the GM can adjudicate tonight. Past-tense / faded / forgotten supernatural identities fail the texture requirement — that's historical fiction, not fantasy.

${buildAdjudicatableDangerRule({ exampleCreature, exampleMaterial, exampleMaterialAlt })}

TIER ${effectiveDifficulty} DANGER SHELF (in-scope consequences for monsters and hazards in THIS dungeon):
${tierEntry.dangerShelf}

${DUNGEON_TRAVERSAL_INVARIANT}
${bannedTropesBlock}
DEITY HANDLING: for registers drawing on extinct religious traditions, active religious life uses descriptive EPITHETS (deity-handles authentic to the register's textual tradition). Real deity names may appear sparingly as historical-mythological reference; most generations should name no deity at all.

CHARACTER QUALITIES (${characterList}): express each through STRUCTURE, EVENTS, and CONSEQUENCE — never by naming the adjective. A "declining" dungeon reads late-stage through trajectory; a "council-fractured" one shows through contested authority and named factions; "atmospheric" qualities (misty, candle-lit) get ONE sensory beat across the whole output, never a political driver.

PROSE FORMATTING: plain prose only — no markdown bold (renderer handles named_entities), no blockquotes, no callouts. *Italic* only for foreign in-world terms (cap at 1-2 across the whole overview). Concise sentences. Avoid common fantasy clichés.

${OPERATIONAL_VOICE_BLOCK}

${SCHEMA_LEAK_DIRECTIVE}

BOSS-VS-MINIBOSS LOGIC:
- INTELLIGENT NAMED boss (lich, vampire lord, cunning dragon, cult leader) → npc_list.
- MINDLESS / BESTIAL boss (burrowing worm, mindless elemental, fungal mass) → monsters[] as large_creature.
- Miniboss is always an NPC in npc_list, never a monster.
- NO monster name (or distinctive name-root) shared with any NPC name — lexically distinct in stem, prefix, and core syllables.

${monsterPopulationBlock}MONSTERS — EXACTLY 3 (the encounter palette):
1. A basic minion (type: "minion", CR ~${monsterCRs.minion}).
2. A stronger lieutenant minion (type: "strong_minion", CR ~${monsterCRs.strongMinion}).
3. A large creature (type: "large_creature", CR ~${monsterCRs.largeCreature}) — this is EITHER the bestial boss (when boss-vs-miniboss logic flags the boss as mindless) OR a separate large entity with no overlapping NPC name.

NPCs — AT LEAST 3 in \`npc_list\`:
1. The miniboss (named individual, mid-tier antagonist).
2. The boss IF they're intelligent (named individual, dominant power).
${thirdNpcLine}
The \`npc_list\` can include more than 3 — add any other individuals the prose mentions by name.

Return the description in JSON format with the following keys. Make sure \`named_entities\` includes EVERY personal name mentioned across all prose fields (these get first-mention bolding in the renderer). Keep descriptions concise. IMPORTANT: \`name\` and \`title\` appear LAST in the schema below — write the body fields first, then name the dungeon based on what you actually wrote. Don't name a dungeon you haven't built yet.

{
  "overview": ${JSON.stringify(overviewFieldText)},
  "quest_hook": "HOW THE PARTY GOT PULLED INTO THIS DELVE. 1-2 sentences. GM-facing, NOT in-character voice and NOT atmospheric prose — a fishhook the GM can paraphrase at the table. Name the IN-WORLD bait concretely: WHO delivers the hook (a named patron, a kinsman, a guild factor, a dying messenger, a dream that names a person), WHAT they say or pay (a sum, a debt called in, an oath, a written contract, a hereditary obligation), and WHAT the party stands to gain or lose. Motive-aware: under ACQUISITION name the prize a patron wants and what they pay; under PREVENTION name the doom and who carries the warning; under RECOVERY name the specific captive or object and who needs them back; under DISCOVERY name the question and who's paying for the answer. Tie the hook to elements already named in the dungeon's history or the surrounding region — the patron's name, the missing kin's identity, the augury's source should slot into the prose around it.",
  "relation_to_larger_setting": "WHERE this dungeon sits geographically. What region, what landmarks border it, what local powers know of it. 2-3 sentences. Provide a name for the larger region if natural. Voice anchor: the geography matters because it is a way IN, a way OUT, or a way to bring help — name those. Example: 'the only path in is a three-day climb that puts the party out of sleep-cycle by the time they arrive.'",
  "approach_and_threshold": "HOW the party reaches the dungeon and what the entrance experience is. The threshold scene — the door, the descent, the warded sigils, the first chamber's character. 2-3 sentences. This is the GM's first-room handout when the party arrives. Concrete and spatial. Voice anchor: every threshold detail is a decision-point the party will make at the table. Example: 'the door is barred from the inside; the bar has been chopped at recently — by whom, and is whoever did it still inside?'",
  "history": "Brief dungeon history — founding, what it was built for, one or two pivotal events. Scope-match the tier (local for T1, cosmic for T5). Every beat must be LOAD-BEARING IN THE PRESENT — it earns its place only if its mechanism is still operating now (a pact still being honored or broken, a grievance still moving). Lead with what the GM needs to adjudicate at the table: promises, debts, names the party may hear.",
  "dominant_power": "${dominantPowerFieldText}",
  "inhabitants": "WHO LIVES OR WORKS INSIDE the dungeon, as flowing GM-facing prose. NO NUMBERED LIST, NO BULLETED LIST — '(1) the Priestess of X (2) the Y-things (3) a colony of Z' is the failure mode. The factions are introduced through prose sentences that flow into each other, not enumerated.\n\nHARD CAP: AT MOST 3 FACTIONS total in this field, including the rolled third party. Two factions is a duel; three is a triangle; four+ is a wall the GM can't track. Reflexes to avoid: 'a fourth faction moves at the edges,' 'a lone X also dwells here,' 'meanwhile a band of Y...' — these are the failure mode. If a candidate fourth figure exists, either absorb them into an existing faction (a named dissenter inside one of the three) or drop them entirely (they belong in a room description, not the overview).\n\n2-4 sentences total. One sentence per faction by default. A faction earns a SECOND SENTENCE only when it adds ONE additional fact (a named lieutenant, a relationship to another faction, a fresh wound, a specific cost the party will pay to deal with them) — never to pile on more activities, methods, or plans. The reader should be able to answer in one breath: WHO leads them, WHAT they want, WHAT'S their one distinctive trait. If you find yourself adding 'and she also...' or 'meanwhile she has begun...' — stop. That content routes to present_state or notable_inhabitant_facet.\n\nNO ORIENTATION PARAGRAPH, NO ROSTER. Do NOT describe a faction's internal hierarchy or membership count (no 'three ranks: the X, the Y, the Z'; no 'thirty-two members'; no 'led by an order of sixteen brothers'). If an order has internal politics, name ONE figure inside it whose dissent or loyalty matters — that is the way internal structure surfaces. The orientation-paragraph reflex is the failure mode.\n\nLEAD WITH NAMES, NOT NUMBERS. '${exampleCharacterA || "[NPC]"} the warlord and his enforcers' beats 'thirty goblin scouts, ten hobgoblin enforcers, four bugbears.' Numbers belong in room descriptions when the GM actually deploys the encounter.\n\nPOSITION ONLY WHEN TACTICALLY LOADED. Skip 'they patrol the upper warren' unless the upper warren is where the ambush waits or the prize sits. The overview is WHO and WHY; room descriptions carry WHERE.\n\nFor each named faction: WHO leads (a name) + WHAT they want (ONE phrase, ONE want — commit to a single goal, not a layered set) + ONE concrete trait that shapes how the GM plays them (a habit, a debt, a fear, a fresh wound, a named lieutenant in dissent). The trait is ONE thing, not three. A leader who 'rules from a nest of iron thread, collects voices, whispers them into walls to confuse direction, and is birthing a sister' is FOUR traits — pick one. The others route to present_state (if happening now) or get cut. Commit to truths (no 'possibly,' 'may be planning').\n\nWhen a faction is a CREATURE THREAT (not a dialogue-capable NPC or ally), its trait MUST be an ANECDOTE per the ADJUDICATABLE-DANGER RULE — what it did to the last person it reached, with a specific outcome. NOT behavioral framing ('he will attack anyone who touches the anvil,' 'they will crush anyone who disturbs the hearth') — that's vague and doesn't tell the GM what to adjudicate. Anecdote shape: 'his hand closed on the surveyor's throat and the heat went out of her body — her corpse was swept to the side' / 'the last expedition that disturbed the central hearth was found pressed flat into the floor, their lanterns still lit beside them.' One victim, one outcome.\n\nPass shape: '${exampleCharacterA || "[NPC]"} the hobgoblin warlord rules from the wyrm-skull throne through the shard's whispers; he has crushed two challengers this month and will not parley except under flag of bone. A pursuing band of [register-coherent faction-name], led by ${exampleCharacterB || "[NPC]"}, has tracked the shard here and is digging a breach toward the inner chamber — they will deal for the shard but bear a long grudge if tricked. The ${exampleCreature || "[register-creature]"} in the deep tunnels do not negotiate; their hide breaks steel, and the last fighter who closed with one was found beside her bent spear.'${thirdPartyInhabitantsNote}",
  "notable_inhabitant_facet": "OPTIONAL. One sentence about a current notable detail of the inhabitants. Plain prose. Empty string is acceptable.",
  "central_dynamic": "HOW THE CENTRAL TENSION CURRENTLY MANIFESTS. 2-3 sentences. This is the load-bearing field — it tells the GM what the dungeon is ACTIVELY DOING right now. When the tension hinges on a faction's BELIEF about something (a worshipped relic, a feared prison, a prophesied awakening), commit to whether that belief is TRUE or MISTAKEN and state which. When a faction CAUSED the situation they now race against, commit to whether they KNOW — are they panicking, plotting cover-up, or oblivious. The GM must know which scenario they're running.${acquisitionPrizeNote}${discoveryQuestionNote}",
  "present_state": "WHAT IS HAPPENING NOW that the party walks into, as living-situation prose. HARD CAP: 3 SENTENCES TOTAL. The dungeon has a CLOCK — name what's counting down and what gets lost — but weave it into the texture of the day, not as a stat line. Name at least one RECENT SHIFT the party can read on arrival (a fresh body, a torch snuffed, a faction's behavior changed) — the tonight-only detail.\n\nOPEN ON THE CLOCK OR THE RECENT SHIFT — not on what factions BELIEVE, KNOW, or DON'T KNOW. 'Tlaphes believes the forge-heart has chosen her... she does not know the Tuchulcha can be driven back by iron shavings' is BELIEF / KNOWLEDGE content — that belongs in central_dynamic (it's the belief-commitment + escalation-cause work). Present_state opens with what's PHYSICALLY HAPPENING — the breach, the body, the rising sound, the moved patrol.\n\nONE TIMER ONLY: any other time references are consequences of the primary clock, not parallel timers. Reference factions by their existing names from inhabitants; do NOT re-describe identity, position, or goals.\n\nNO LORE DUMPS. Backstory reveals, traitor identities, future-quest hooks, secret history that the party will discover during the delve — these do NOT belong here. Route revealed-truth content to central_dynamic; route resolution paths to potential_outcomes. Present_state is what the party WALKS INTO, not what they will LEARN.\n\nANTI-LABEL: never open a sentence with 'The clock:', 'The recent shift:', 'The change:', or any equivalent meta-label. Write the time-pressure and the recent shift as PROSE. Violations break the field.\n\nPass shape: 'The redcaps' breach reaches the shard chamber within two days, and ${exampleCharacterA || "[the warlord]"} has not yet been told — his scouts found their camp yesterday and are still arguing whether to report it. Last night the ${exampleCreature || "[register-creature]"} broke into the offering hall and took the third bound prisoner; the enforcers blame the redcaps, the warband no longer answers a single voice.'${motivePresentStateClause}",
  "potential_outcomes": "FREE PROSE PARAGRAPH (2-4 sentences) on how this dungeon could end. GM-facing connected prose, NOT a list or bullet points. Name specific in-world levers (entities that respond to conditions, objects whose destruction shifts the threat, routes that open when factions are engaged) AND the trade-offs (what speed/patience/deception cost).\n\nCOVERAGE — the paragraph MUST touch BOTH: (a) HOW THE BIG THREAT is resolved or evaded — the apex, named boss, named hazard-process, or holder — and (b) HOW THE QUEST-HOOK DELIVERABLE is fulfilled. The party must be able to trace a line from hook → resolution. By motive:\n- ACQUISITION: how the prize is reached given its location and holder.\n- RECOVERY: how the captive or object actually leaves the dungeon (alive / intact / undetected).\n- PREVENTION: what specific act stops the doom — what success looks like at the table.\n- DISCOVERY: how the answer reaches the patron — carrying it out, sending word, the cost of memory.\nIf the party can't trace hook → resolution from this paragraph, the field has skipped the mission.\n\nUse physical actions a GM can adjudicate (pry, pour, recite, destroy, plant) not metaphors. Costs are carried OUT of the dungeon (debts, grudges, wounds) — not catastrophic burials (no collapse, no everyone-dies). Anchor every name in the body prose; never introduce new names.\n\nWorked example: 'The ${exampleCreature || "[register-creature]"} calm when the true heir's name is spoken, and ${exampleCharacterA || "[NPC]"}'s riddles lead there — though each riddle costs a memory. The seep can be slowed with ${exampleMaterial || "[register-material]"} packed into the cracks, but the stores lie past ${exampleCharacterB || "[NPC]"}'s diggers in the lower gallery.'",
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
      "description": "2 sentences. Basic tier of the minion population: a CAPABILITY + WEAKNESS + WHAT THEY WANT (the omniscient motivation), then a GLIMPSE — a sensory cue the GM can drop when they're nearby but not yet seen (a wet click in the vent, the clatter of bone-plates rooms away). The mechanical bite goes in the 'danger' field below — don't duplicate it here.",
      "danger": "ONE SENTENCE describing what this creature did the last time someone fought it — a specific named or nameable victim (use a register-coherent name; do NOT reuse a name from any earlier example), a specific outcome, a specific timeline. The anecdote can describe damage to a person, damage to equipment, a defensive ability (corrosive blood, healing flesh), or an environmental effect. Example shape: '[victim-name]'s hand froze off a day after being gripped by one of these.' Scale outcome and timeline to Tier ${effectiveDifficulty} (T1: 'stiff for an hour'; T5: 'died on the third day, body still hot'). No dice / DCs; no interior consequences; no psychic-as-default.",
      "CR": "${monsterCRs.minion}"
    },
    {
      "type": "strong_minion",
      "name": "Lieutenant-tier name from the SAME minion creature_type population — clearly the same kind, one tier up.",
      "description": "2 sentences. A lieutenant tier of the same population: WHAT THIS TIER ADDS (command role, heavier weapon, extra sense, ritual ability) + what they learned from the apex + what they want (often distinct from basic minions — they organize, preserve, sacrifice). Then a GLIMPSE — sensory cue when sensed but not seen (the candle blown out by an unseen breath, the ${exampleMaterial || "[register-material]"} lock-pin still warm).",
      "danger": "ONE SENTENCE describing what this lieutenant did to its last victim — same anecdote shape as the basic minion's danger, one shelf-step heavier in outcome (hits harder, persists longer, leaves a deeper mark). Same severity tier (${effectiveDifficulty}), scaled within it.",
      "CR": "${monsterCRs.strongMinion}"
    },
    {
      "type": "large_creature",
      "name": "Apex name — a DISTINCT KIND from the minion population. The bestial boss if applicable, OR a separate large threat that fits the dungeon's character.",
      "description": "3 sentences. The dungeon's signature creature, with a PHYSICAL FORM the GM can describe and fight at close range. The apex MUST have a body in its chamber — even if its signature ability operates at distance, over time, or through indirect means (carving names, dream-touching, ambient corruption, prophetic visions), there is a fightable form the party can encounter when they reach it. A creature that only acts at range / over time is a puzzle, not an apex; the apex is both. ACTIVE in present tense (not dormant or centuries-sealed) and ENCOUNTERABLE (combat or evasion are real options; dialogue alone is not a way past it).\n\nSentence one: PHYSICAL FORM + SIGNATURE ABILITY — what the creature LOOKS like in its chamber (the body the GM describes when the party kicks the door open) AND the one move / property that makes it dangerous, strange, or unforgettable. If the signature is indirect (it carves names, it whispers from the stone), the form is still concrete (a figure of fused fulgurite and forge-coal moving through the heat; a tall shape of bone and wax with chisels for fingers). Sentence two: RECENT EVIDENCE planted in the body prose (the cocooned expedition still warm; the chamber the ${exampleCreature || "[register-creature]"} refuse to enter, where the ${exampleMaterial || "[register-material]"} spreads from one wall). Sentence three: MOTIVATION + GLIMPSE — what the creature wants, plus a sensory cue the GM drops before it arrives (a low chord in the floor; lamp-flames bending toward one wall). Never shares a name with an NPC.",
      "danger": "ONE SENTENCE describing what this apex creature did the last time someone fought it — a specific named or nameable victim (use a register-coherent name; do NOT reuse a name from any earlier example), a specific outcome, a specific timeline. Example shapes (T5): '[victim-name]'s whole sword-arm went black to the shoulder a day after the gaze passed over her — she lasted three days before the rot took her heart.' / 'The questioner [victim-name] was found turned to stone where he had spoken, his last word still on his lips.' / '[victim-name]'s ear-drums burst at the howl and she has not heard a sound since; the priests say nothing short of a miracle will bring it back.' Scale outcome and timeline to the TOP of Tier ${effectiveDifficulty}. The anecdote can describe damage to a person, damage to equipment, a defensive ability, or an environmental effect. No dice / DCs; no interior consequences; no psychic-as-default.",
      "CR": "${monsterCRs.largeCreature}"
    }
  ],
  "name": ${userName ? `"${userName}" (use this verbatim)` : '"The dungeon\'s English-readable proper noun. Pick ONE of the NAME TEMPLATES and fill the [image] slot per the IMAGE-FROM-CONTENT rule. 2-5 English words, at most one register-flavored proper noun, no foreign-language particles. Any culturally-rooted original-language phrase goes in the overview\'s first sentence, not here."'},
  "title": "A short evocative subtitle phrase (3-5 words, max 6). Load-bearing word is a CONCRETE IMAGE mined from your prose — a phrase, not a sentence. No leading article ('the', 'a', 'an'); no conjugated verbs (are/is/was/has/have); no '-ed'/'-ing' predicates. Suggest character qualities through imagery, don't name them. Pass: 'Tomb of the Singing Bones'. Fail: 'Where Oaths Are Knotted in Bone' (passive clause)."
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
    'overview', 'quest_hook',
    'relation_to_larger_setting', 'approach_and_threshold',
    'history', 'dominant_power', 'inhabitants',
    'central_dynamic', 'present_state',
    'potential_outcomes',
  ];
  for (const key of requiredStrings) {
    if (typeof data[key] !== 'string' || data[key].trim().length === 0) {
      return false;
    }
  }

  // Optional facet fields — allow empty string but require string type.
  const optionalStrings = [
    'notable_inhabitant_facet',
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
    && typeof m.danger === 'string'
    && m.danger.trim().length > 0
    && (typeof m.CR === 'string' || typeof m.CR === 'number')
  )) return false;

  return true;
}
