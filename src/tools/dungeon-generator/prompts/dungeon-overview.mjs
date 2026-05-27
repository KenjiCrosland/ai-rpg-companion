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
  MOTIVE_DIFFICULTY_CLAUSES,
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
    ? `\nCREATURE TRADITION FOR THIS REGISTER (mandatory reference for monsters / inhabitants / supernatural identity):
${registerEntry.creatureTradition}

When the dungeon needs a non-human threat — a monster in the encounter slots, the supernatural identity behind the central dynamic, an inhabitant beyond the human cultists / scholars / soldiers — PREFER a creature drawn from this tradition before inventing a generic fantasy monster or defaulting to another human institution (yet another cult, order, guild). The named creatures above are the FIRST PLACE to reach. Two human factions arguing in a tomb is the failure case; the dungeon's supernatural population should be visibly NON-HUMAN and culturally specific to the register.\n`
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

INNER PROPER NOUNS must match this register: the boss / miniboss / other NPCs by name, faction names, named items and relics, named chambers and inner locations. These derive from the register's phonology, naming conventions, and cultural texture — they're the in-world detail the GM uses at the table.
${registerPoolBlock}
${creatureTraditionBlock}
${materialTraditionBlock}

THE DUNGEON'S OWN NAME (the "name" field) and SUBTITLE (the "title" field) MUST BE ENGLISH-READABLE. A GM has to say it aloud, write it on a session note, search for it in their campaign log.

${nameTemplatesBlock}

${placeTypeLine}${templateBiasWarning}

IMAGE-FROM-CONTENT — THE LOAD-BEARING RULE:
The name's [image] slot MUST be a concrete element mined from the dungeon you have ALREADY written above (history, dominant_power, inhabitants, hazards, central_dynamic, present_state, potential_outcomes, the prize). Pick the dungeon's strangest TRUE detail. The image can take any of five forms — pick whichever the dungeon offers most strongly:

(1) A THING — the signature creature, the central relic, the material that pervades the place. Mine from inhabitants / hazards / prize. Examples: "Bone Hollow," "Mirror Tomb," "Salt Sepulcher."

(2) AN EVENT — something that HAPPENED that the dungeon still carries. Mine from history. The name encodes a micro-story; the verb is the load-bearer. Examples: "The Last Forge," "The Drowning," "The Sundered Vigil," "Vault of the Broken Oath."

(3) AN OXYMORON — the dungeon's central contradiction, named directly. The uncanny pairing is the strongest intrigue device. Mine from the friction inside the dungeon's own premise — what is here that shouldn't be, what continues that ought to have ended. Examples: "Unfading Roses," "Weeping Forge," "Sunless Bloom," "Living Tomb," "Sanctum of the Unburied."

(4) A NUMBER — a real count from the dungeon that becomes ominous through specificity. Instantly concrete, instantly strange. The number is mined: why seven? Because the dungeon literally has seven of the thing. Examples: "The Seven Rings," "The Thirteenth Hold," "House of Four Doors."

(5) A CONSEQUENCE — what the place DOES to anyone who enters. A name as warning. Mine from hazards / inhabitants' effects on prior visitors. Examples: "The Witherward," "Marrowdrink," "The Quiet Mile," "Hollow Hall of the Forgetting."

Frames are free — possessive, "of," adjective-noun, compound participle, image-led — all work IF the image is doing the load-bearing work. A SINGLE-WORD EVOCATIVE COMPOUND is also a valid name on its own (Ashfall, Gravenmoor, Coldreave) — these read as places on a real map and don't need a separate place-type when the compound fuses image and place. What does NOT work: an adjective or place-type alone with no concrete image. "Cold Hollow" is empty; "Bone Hollow" lives because Bone is mined from the dungeon. "${exampleCharacterA || "[character A]"}'s Mill" is dead; "${exampleCharacterA || "[character A]"}'s Ash Mill" lives because Ash carries the weight and the character name is flavor.

The image must point to something already in your prose — a reader should be able to find it. If the image is an EVENT, the event is named in history. If an OXYMORON, both halves of the contradiction surface in the prose. If a NUMBER, the count is real and verifiable in the body fields. If a CONSEQUENCE, the effect is shown in hazards or inhabitants. If you cannot find an image in your prose, the prose itself is too generic; rewrite a field before naming the dungeon.

HARD RULES (verify the chosen name before returning):
- 2-5 English words total (1 word is fine when it's an evocative compound like "Ashfall"). Compact, scannable, sayable.
- Leading "the" is allowed ONLY when the rolled template is F ("The [image]" — "The Maw," "The Cradle"). Every other template starts with its first content word, no article. Leading "a" / "an" is never allowed.
- AT MOST ONE word may be register-flavored (a 1-3 syllable proper noun). All other words are English.
- NO foreign-language conjunctions, articles, or particles in the name ("an", "na", "ša", "el", "del"). If the register's natural naming uses these particles, that grammar stays inside the dungeon — on chambers, NPCs, items — NEVER in the dungeon's display name.

TRANSLATION HANDOFF — mirrors the item-generator translation rule.
When the register is non-English (Norse, Welsh, Old-Irish, Mesopotamian, Yoruba, Quechua, etc.), the culturally-rooted original-language phrase (the kind a register's poets would actually use) does NOT go in the "name" field. It goes in the FIRST SENTENCE of the "overview" field with cultural framing — so the GM has an English handle for their session notes and the cultural specificity is established once, in prose, where it belongs.

Worked example of the handoff: a register's culturally-rooted original-language phrase is mentioned ONCE in the overview's first sentence — "Known to the highland folk as [phrase] — [English translation] — the barrow sits low..." — and the "name" field carries the English-readable name (image-anchored per the rule above). Don't repeat the original-language phrase across other fields.

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
    ? `\nMINION POPULATION (pre-rolled in code; applies to minion + strong_minion slots):\n  creature_type: "${monsterPopulation.creature_type}"\n  relation:      "${monsterPopulation.relation}"\n  Relation directive: ${RELATION_DIRECTIVES[monsterPopulation.relation] || ''}\n\nThe minion and strong_minion slots are TWO TIERS of the SAME population — basic and lieutenant of one kind. Pick names + descriptions that read as one population scaled, not two unrelated creatures.\n\nThe relation describes how the minion population ties to the dungeon's powers — read the directive's behavior into their role.\n\nThe large_creature slot is NOT constrained by this block — pick a distinct apex creature that fits the dungeon's character and is clearly different from the minion population.\n\nThe inhabitants / dominant_power prose MUST reference the minions by the names you give them here.\n\nSIGNATURE EVIDENCE RULE — the apex's distinctive capability MUST appear as visible evidence in at least one body field (history, inhabitants, hazards, or central_dynamic). Pick ONE signature ability that makes the large_creature dangerous or strange — a hunting move, a defensive move, a sensory trick, a reproductive habit, a passive radiating effect — and plant the EVIDENCE of it in the dungeon's prose, where the party would read it BEFORE meeting the creature. Examples of evidence the apex's behavior leaves behind: a cocooned expedition wrapped in resin-thread (hunting move); a corridor every other faction avoids because the air there 'drinks heat' (passive effect); a stone wall gouged in spiraling claw-marks at head-height for a creature ten feet tall (size + temperament); the local fauna gone deaf in a one-mile radius (sensory cone); the previous miniboss's body still half-fused to the wall (constriction); a tally-mark for every petitioner the order has lost, scratched on the inner door (longevity + persistence). The monster's description in the monsters[] array then refers back to this evidence — the party reads the dungeon and the creature's capability is already PROVEN by the time they encounter it.\n\nCOMBAT-PRESSURE RULE — at least ONE entity in this dungeon must be a credible combat threat the party CANNOT talk around. A dungeon where every faction is dialogue-resolvable and every monster is dormant / sealed / behind an unbreakable barrier fails — the GM has no encounter to actually run. Default: the LARGE_CREATURE (apex) carries this load. The apex is ACTIVE in the present tense (not 'has not moved in forty years,' not 'sealed in a centuries-old slumber'), its evidence is RECENT (a fresh kill, claws still wet, a corridor it patrolled this morning), and it cannot be negotiated past with words alone. If the minion population's relation makes them aggressive (devotee, thrall, predator), they can carry this load instead — but if minions rolled wild_unaffiliated, scholar-coded, or other negotiable relations, the apex MUST be the non-negotiable threat. A dungeon's premise that begs for a creature (a half-dissolved god, a leaking essence, an unfinished forge) should produce a creature CURRENTLY EMERGING from that condition — the heat-crystallized constructs spawned by the leaking essence, the forge-elementals pulled into shape by the burning presence. The dungeon's central condition is generating threats RIGHT NOW.\n`
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

FANTASY TEXTURE REQUIREMENT (mandatory — verify before returning):
The dungeon's CENTRAL SUPERNATURAL REALITY must be NAMED and PRESENT-TENSE. Most dungeons are inherently supernatural (the dragon, the lich, the ancient curse, the bound spirit, the planar incursion) — whatever the central supernatural identity is, it must be specifically named (drawn from the register's CREATURE TRADITION above where the register has one) and operating NOW. The supernatural identity ACTS in the present tense: it dreams, it warns, it stirs, it consumes, it answers. Its actions have ongoing concrete effects the party can observe and the GM can adjudicate at the table tonight.

The opposite of this rule — a supernatural identity rendered as past-tense, faded, broken, forgotten, dead-and-gone — reads as fantasy but FUNCTIONS as historical fiction; the party has nothing to confront, only memorials to read. If every supernatural reference is past-tense, broken, or aspirational, the dungeon fails the texture requirement. At least one supernatural identity (usually the central one) must be present-tense, named, and acting on the world right now.

${buildAdjudicatableDangerRule({ exampleCreature, exampleMaterial, exampleMaterialAlt })}

TIER ${effectiveDifficulty} DANGER SHELF (in-scope consequences for monsters and hazards in THIS dungeon):
${tierEntry.dangerShelf}

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

Return the description in JSON format with the following keys. Make sure \`named_entities\` includes EVERY personal name mentioned across all prose fields (these get first-mention bolding in the renderer). Keep descriptions concise. IMPORTANT: \`name\` and \`title\` appear LAST in the schema below — write the body fields first, then name the dungeon based on what you actually wrote. Don't name a dungeon you haven't built yet.

{
  "overview": ${JSON.stringify(overviewFieldText)},
  "quest_hook": "HOW THE PARTY GOT PULLED INTO THIS DELVE. 1-2 sentences. GM-facing, NOT in-character voice and NOT atmospheric prose — a fishhook the GM can paraphrase at the table. Name the IN-WORLD bait concretely: WHO delivers the hook (a named patron, a kinsman, a guild factor, a dying messenger, a dream that names a person), WHAT they say or pay (a sum, a debt called in, an oath, a written contract, a hereditary obligation), and WHAT the party stands to gain or lose. Motive-aware: under ACQUISITION name the prize a patron wants and what they pay; under PREVENTION name the doom and who carries the warning; under RECOVERY name the specific captive or object and who needs them back; under DISCOVERY name the question and who's paying for the answer. Tie the hook to elements already named in the dungeon's history or the surrounding region — the patron's name, the missing kin's identity, the augury's source should slot into the prose around it.",
  "relation_to_larger_setting": "WHERE this dungeon sits geographically. What region, what landmarks border it, what local powers know of it. 2-3 sentences. Provide a name for the larger region if natural. Voice anchor: the geography matters because it is a way IN, a way OUT, or a way to bring help — name those. Example: 'the only path in is a three-day climb that puts the party out of sleep-cycle by the time they arrive.'",
  "approach_and_threshold": "HOW the party reaches the dungeon and what the entrance experience is. The threshold scene — the door, the descent, the warded sigils, the first chamber's character. 2-3 sentences. This is the GM's first-room handout when the party arrives. Concrete and spatial. Voice anchor: every threshold detail is a decision-point the party will make at the table. Example: 'the door is barred from the inside; the bar has been chopped at recently — by whom, and is whoever did it still inside?'",
  "history": "A brief history of the dungeon — founding / creation / what it was built for, and one or two pivotal events. Scope-match the tier: local history for Tier 1, cosmic history for Tier 5. Plain prose. Every history beat must be LOAD-BEARING IN THE PRESENT: a beat earns its place if cutting it would change what the party adjudicates or what is currently happening in the dungeon. Cosmological backstory belongs here only when its mechanism is still operating now (a cinder still in a hearthstone, a pact still being honored or broken, an old grievance still moving). Voice anchor: lead with what the GM needs to ADJUDICATE in play — promises kept or broken, debts owed, names the party may hear.",
  "dominant_power": "${dominantPowerFieldText}",
  "inhabitants": "WHO/WHAT LIVES OR WORKS INSIDE the dungeon.\n\nHARD PROCEDURAL RULE — NO ENTITY APPEARS TWICE: Each named faction, group, or individual appears EXACTLY ONCE in this field. Before writing each sentence, CHECK: has this entity already been named in a previous sentence? If yes, STOP — move to the next entity or end the field. Do not write an expansive 'hierarchy / orientation' paragraph and then a separate 'one-sentence summary' of the same faction; that is the failure mode. The model has two voices it wants to satisfy here — the relational-map voice ('who they are, what they want') and the operational voice ('who's where, doing what right now'). Both voices write about the same faction, which doubles the field. ONLY the relational-map voice belongs here. The operational voice routes to present_state.\n\nSTRICT FORMAT: ONE SENTENCE per faction or group. Each sentence packs (1) ZONE — where they are in the dungeon at the broadest level, (2) GOAL — what they want here in one phrase, and (3) one BEHAVIORAL NOTE — a single concrete trait (their leader's name, whether they negotiate, the standout fact about them). 2-4 sentences total, one per faction. Start with the first faction's sentence — no preamble, no orientation paragraph.\n\nROUTE OPERATIONAL DETAILS OUT — explicit: current per-faction conditions, current activities, time-pressured action, what someone is doing RIGHT NOW (Kaelen subsists on lumen-moss for three days, his signet is Brass-rank, the foreman is on a whisper-line negotiating with a rival buyer) DO NOT belong in inhabitants. They go to present_state (if they're tied to the clock) or notable_inhabitant_facet (if they're the one standout detail). If you find yourself writing 'and right now they are...' or 'currently doing...' inside inhabitants, STOP — that clause is misrouted. PASS examples:\n- 'Twelve hired diggers camped in the false tomb chamber, working a breach toward the real vault — they want the stole and nothing else, and their leader ${exampleCharacterA || "[a register-coherent NPC name]"} will deal if the price is right.'\n- 'Thirty to forty ${exampleCreature || "[register-creature]"}-kin patrolling the upper and middle halls, maintaining the barrow's integrity by instinct — they do not negotiate and are becoming unpredictable as the song corrupts.'\n- 'Seven blood-claimants camped at the entrance pit, unarmed and frightened, demanding ritual access before any outsider touches the stole.'\n\nLayer factions when the tension calls for it (succession-fracture has two; scoured-and-claimed has one dominant + their direct servants; pilgrimage-route may include other expeditions). Time-pressured activity (a clock counting down, a deadline, an imminent breach) belongs in present_state — NOT here. The standout detail that earns special attention (a fresh effigy being sculpted, an iron sigil that appeared overnight) belongs in notable_inhabitant_facet — NOT here. Every named faction MUST carry a knowable GOAL the GM can state in one line; the GM always knows it, players may never. NATURE TWIST RULE: when a faction's NATURE has a non-obvious truth that reframes every interaction (these aren't jailers, they're worshippers; these aren't guards, they're hostages), surface the twist in the one sentence — not deferred to present_state. SELF-CONSISTENCY RULE: every faction's stated role must be internally coherent. If you call a group X's predators, they cannot also be X's protectors (a 'predator that hunts what threatens X' is a protector — pick one). If a faction's actions seem to contradict their goal (smashing the source they're harvesting; defending what they came to destroy), the sentence MUST name the reason in one phrase (overshoot, miscalculation, escalation beyond control, a competing motive). COMMITMENT RULE: never hedge on faction behavior — no 'possibly doing a ritual,' no 'unknown purpose,' no 'may be planning.' Commit. The party may never learn the truth; the GM always knows. INDIVIDUATING-DETAILS RULE: when you name a faction's possessions, contents, or activities, those specifics must reveal who they are. A smuggler's cache of 'silk, harp-strings, and salt' tells nothing; 'forged temple-seals, harpooned eel-skins, three bound prisoners under a tarp' tells the GM something to play with. CREATURE-THREAT BITE: when a named entity in this field is a CREATURE THREAT (not a dialogue-capable NPC, not an ally) — a mindless predator, a bound horror, a sentient hazard — its BEHAVIORAL NOTE MUST carry the mechanical bite per the ADJUDICATABLE-DANGER RULE above. 'The ${exampleCreature || "[register-appropriate creature]"}, ${exampleMaterial || "[register-appropriate material]"}-veined hunters with ${exampleMaterialAlt || "[a second register-material]"}-rimed bite' is form-flavor only — name what they DO mechanically when they reach a character. The mechanical bite stated here may echo what appears in monsters[].danger for the same creature; that redundancy is INTENDED so the GM reads the inhabitant prose and sees the danger without bouncing to the monsters tab.${thirdPartyInhabitantsNote}",
  "notable_inhabitant_facet": "OPTIONAL. One sentence about a current notable detail of the inhabitants. Plain prose. Empty string is acceptable.",
  "hazards_and_dangers": "HAZARDS AND DANGERS — the physical, magical, environmental threats of this place. THIS FIELD IS DOWNSTREAM ONLY (the GM-facing UI does NOT render a Hazards section); the field's content feeds the room generator for spatial hazard instantiation. 2-3 sentences. HARD CONSTRAINT: every hazard MUST DERIVE from a named force already in the dungeon — the dominant power's secretions, a faction's defensive behavior, the central tension's physical residue, the rolled hazard-process. NO generic architectural traps (no 'spike pits and arrow slits' that could belong to any dungeon of its type, no 'crumbling floors' without a named cause). The named force is the WHY of the hazard. Voice anchor: show each hazard through its EFFECT ON INHABITANTS and PRIOR VISITORS rather than as a stated mechanical threat — 'the ${exampleCreature || "[register-appropriate creature]"} secrete ${exampleMaterial || "[register-appropriate material]"}-and-${exampleMaterialAlt || "[a second register-material]"} sludge the original drones lit by accident; a torch waved near a fresh pour ignites the corridor and slumps the wall' (named force + visible consequence) is right; 'flammable substance lining the walls' (mechanical threat without source) is wrong. Each hazard is a LEVER the party can read, avoid, or disarm — keep the lever named, not abstract.\n\nADJUDICATABLE-DANGER RULE APPLIES: each hazard's threat must specify a Tier ${effectiveDifficulty} mechanical consequence as its load-bearing part (drawn from the danger shelf above). Register-flavor wraps the consequence but never replaces it: 'the brine fog IS petrification (Con save; petrified targets speak in a dead language until Stone to Flesh)' is correct; 'the brine fog crystallizes minds into permanent recollection of the dead world' is the poetry-without-mechanics failure mode the rule is designed to catch.",
  "notable_hazard_facet": "OPTIONAL. One sentence about a current notable detail of the hazards. Empty string is acceptable.",
  "central_dynamic": "HOW THE CENTRAL TENSION CURRENTLY MANIFESTS in the dungeon. Frame in the tension's terms — see the CENTRAL TENSION block above. This is the load-bearing field; it tells the GM what the dungeon is ACTIVELY DOING right now. 2-3 sentences. BELIEF COMMITMENT: when the central tension hinges on a faction's BELIEF about the dungeon's contents (a worshipped relic, a feared prison, a prophesied awakening, a venerated remnant), commit to whether the faction's belief is TRUE or MISTAKEN — and state which. 'They believe the shard will remake the continent' tells the GM nothing about adjudication; 'they believe the shard will remake the continent, and they are wrong — it is a sealed prison, and breaking it releases what was bound, not a prophecy' tells the GM what happens when the party acts. The GM must know which scenario they're running. ESCALATION-CAUSE COMMITMENT: when a faction in the dungeon CAUSED the situation they are now racing against (their operation woke the thing they're now harvesting; their containment is now leaking because of choices they made; the rival they invited has turned on them), commit to whether the faction KNOWS this. State it in one phrase: are they improvising in a crisis they recognize as their own, hiding it from their own membership, or in denial that anything is wrong? The GM must know whether the faction's leader is panicking, plotting cover-up, or oblivious — that determines every interaction the party has with them.${acquisitionPrizeNote}${discoveryQuestionNote}",
  "present_state": "THE CLOCK and what's CHANGING. Only NEW information — do NOT re-introduce factions already named in inhabitants. Refer to factions by their existing names; do NOT re-describe their identity, position, or goals here (that work already happened above). 2 SENTENCES MAX. One sentence carries the time-pressure — what is counting down, on what timescale, and what gets LOST when it runs out. One sentence carries the most recent shift — what changed in the last day, week, or month that the party can READ ON ARRIVAL (a new tremor, a fresh body, a snuffed torch, a hum that wasn't there before).\n\nANTI-LABEL RULE: do NOT write schema-internal labels into the prose output. NEVER begin a sentence with 'The clock:', 'The most recent change:', 'The clock is', or any equivalent meta-label. Those are framing notes for HOW to compose the field, not text that appears in the field. Write the time-pressure and the recent shift as PROSE — 'Three hours until Elara Wex lifts the crown; when she does, the gemma vitae fires and the Sorrow's concentrated form floods the inner hall' is correct. 'The clock: three hours until Elara Wex...' is wrong. The reader should read prose, not a labeled spec sheet.\n\nMULTI-CLOCK RULE — ONE TIMER ONLY: this field contains exactly ONE time-pressure. Subsequent time references in the field must be CONSEQUENCES of that timer, not separate timers running in parallel. 'Three days until the cult exhumes the tablets; the water reaches the alcove by the fourth day; the gas pocket is dispersing now' is THREE timers — pick the binding one and frame the others as its consequences ('three days until the cult exhumes the tablets; the water has already begun seeping in and will erase the ink within hours of the breach; the gas pocket released by the morning's cave-in is the party's window'). If more than one independent timer is in play, name the SHORTEST one as THE clock — any longer timer either gets dropped OR must end in a DIFFERENT kind of loss the party still cares about (the patron survives the delve but loses their seat on the council). A 6-month patron deadline alongside a 4-week dungeon-collapse is broken — the collapse expires first, so the patron timeline is irrelevant. The GM must read this field and know which single timeline is actually ticking down the delve.${motivePresentStateClause}",
  "potential_outcomes": "FREE PROSE PARAGRAPH (2-4 sentences) on how this dungeon could end. GM-facing. NOT a list, NOT an enumeration of levers and costs, NOT bullet points — a connected paragraph that names what the party can do and what it costs them, woven together. The GM reads it once and knows the SHAPE of the dungeon's exit ramps, without being handed a script.\n\nWHAT TO WEAVE IN: name the specific in-world levers the party can pull (an entity that responds to a condition, an object whose destruction shifts the central threat, a route that opens when a faction is engaged) AND the trade-offs of approach (what speed costs against a named faction, what patience costs against a named clock, what deception costs against an oath-bound force). Anchor everything in entities and features already named in the dungeon's body prose; never introduce a new name here.\n\nCOVERAGE: the paragraph must touch (a) how the BIG THREAT could be resolved or evaded — the apex, named boss, named hazard-process, or holder — and (b) how the PRIZE is actually reached given its true location and holder in the dungeon's prose. A paragraph that resolves the threats but never reaches the prize, or never touches the apex, has skipped the mission.\n\nCONCRETE-ACTION: the paragraph names physical actions a GM can adjudicate — pry, pour, recite, douse, destroy, speak-aloud, plant, drag, seal, bring — not metaphors ('commune with the binding,' 'witness the lament correctly').\n\nANTI-CATASTROPHE: the costs are what the party CARRIES OUT of the dungeon (debts, grudges, wounds, lost opportunities, faction enemies), not what they BURY behind them. The dungeon does not collapse, every NPC does not die, the entrance does not seal forever. The party walks out into the next session intact, the cost carried into play.\n\nWORKED EXAMPLE (the shape, not the content): 'The ${exampleCreature || "[register-creature]"} calm when the true heir's name is spoken, and ${exampleCharacterA || "[character A]"}'s riddles lead there — though each riddle costs a memory the speaker won't get back. The oil seep can be slowed with ${exampleMaterial || "[register-material]"} packed into the cracks, which buys hours rather than days, but the ${exampleMaterial || "[register-material]"}-stores lie past ${exampleCharacterB || "[character B]"}'s diggers in the lower gallery. ${exampleCharacterB || "[character B]"} herself will leave if the chronicle is destroyed; she has no use for ${exampleMaterialAlt || "[register-material-alt]"}, but her order remembers, and the party that burns the chronicle carries that grudge home.'",
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
      "description": "2 sentences. The basic tier of the minion population — what the creature IS, how it BEHAVES, and what it WANTS. Sentence one: a CAPABILITY (a tool, tactic, sensory specialty, defensive trick) + a WEAKNESS the party can exploit + WHAT THEY WANT (a short third-person-omniscient motivation — what they're working toward when the party isn't there). Sentence two: a GLIMPSE — a sensory cue the GM can drop when these creatures are nearby but not yet seen (a wet click from the upper vent, the clatter of bone-plates rooms away, the smell of cold iron pooling under a door). Behavior follows the population's rolled relation directive. The mechanical consequence of CONTACT WITH a party member lives in the separate 'danger' field below — do NOT duplicate it here.",
      "danger": "1 sentence. The MECHANICAL CONSEQUENCE when this creature reaches a party member — per the ADJUDICATABLE-DANGER RULE above, drawn from the Tier ${effectiveDifficulty} danger shelf. Stated as save + effect (or damage type + status condition) the GM can adjudicate immediately. Register-flavor MAY accompany the mechanical bite but does NOT replace it. Example shapes: 'A bitten target makes a DC 12 Constitution save or is grappled and dragged from formation, taking 1d6 piercing on the start of each of its turns until freed.' (Tier 1 — complicating.) 'Contact with the creature's gaze inflicts indefinite madness (Wisdom save; Greater Restoration to clear).' (Tier 4 — significant-to-scary.) NOT 'eats your name' or 'consumes memory' without a save-and-effect translation.",
      "CR": "${monsterCRs.minion}"
    },
    {
      "type": "strong_minion",
      "name": "Lieutenant-tier name from the SAME minion creature_type population — clearly the same kind, one tier up.",
      "description": "2 sentences. A more capable tier of the same minion population — better-equipped, more individuated, harder to remove. Sentence one: WHAT THIS TIER ADDS beyond the basic minion (a command role, heavier weapon, extra sense, ritual ability) + WHAT THEY LEARNED FROM CONTACT WITH THE APEX (a habit, a marking, a behavior copied from the large_creature) + WHAT THEY WANT (short motivation — often distinct from the basic tier's: they organize, they preserve, they sacrifice). Sentence two: a GLIMPSE — sensory cue for the GM to drop when this tier is sensed (the candle blown out by an unseen breath, the ${exampleMaterial || "[register-material]"} lock-pin still warm from a hand the party didn't see). Same relation directive as the basic tier. The mechanical consequence of CONTACT lives in the separate 'danger' field — do NOT duplicate it here.",
      "danger": "1 sentence. The MECHANICAL CONSEQUENCE when this creature reaches a party member — one shelf-step HEAVIER than the basic minion's, still within the Tier ${effectiveDifficulty} shelf, per the ADJUDICATABLE-DANGER RULE above. Stated as save + effect the GM can adjudicate immediately. Register-flavor MAY accompany the mechanical bite but does NOT replace it.",
      "CR": "${monsterCRs.strongMinion}"
    },
    {
      "type": "large_creature",
      "name": "Apex name — a DISTINCT KIND from the minion population. The bestial boss if applicable, OR a separate large threat that fits the dungeon's character.",
      "description": "3 sentences. The dungeon's signature creature, the one the GM most needs to know how to run. The apex MUST be ACTIVE in the present tense (not dormant, not centuries-sealed, not 'has not moved in forty years') and ENCOUNTERABLE — the party can meet it without unbreakable seals or impossible conditions, and combat or evasion are real options (per COMBAT-PRESSURE RULE above; dialogue alone is not a way around the apex). Sentence one: the SIGNATURE ABILITY — the one move or property that makes it dangerous, strange, or unforgettable (how it hunts, how it defends, how it senses, what it does passively to the space). Sentence two: the RECENT EVIDENCE — a direct reference to FRESH visible signs of that ability already planted in the dungeon's body prose (per the SIGNATURE EVIDENCE RULE above): 'the cocooned expedition in the third gallery, still warm,' 'the spiraling claw-marks high on the antechamber wall — bone-dust on the floor below,' 'the chamber the ${exampleCreature || "[register-appropriate creature]"} refuse to enter, where the ${exampleMaterial || "[register-appropriate material]"} spreads outward from one wall only.' Sentence three: MOTIVATION + GLIMPSE — a third-person-omniscient line on what the creature wants (return to its egg-chamber; finish the song that was started over it; reclaim something the founders took) PLUS one sensory glimpse the GM can drop when the creature approaches but is not yet seen (a low chord vibrating in the floor; the lamp-flames bending toward the western wall; the silence that flattens every echo a few seconds before it arrives). Never shares a name with any NPC. The mechanical consequence of CONTACT WITH a party member lives in the separate 'danger' field below — do NOT duplicate it here.",
      "danger": "1-2 sentences. The APEX MECHANICAL CONSEQUENCE — the central reason a GM must know what to do when this creature reaches a party member. Per the ADJUDICATABLE-DANGER RULE above, drawn from the TOP of the Tier ${effectiveDifficulty} danger shelf. Stated as save + effect the GM can adjudicate immediately. Worked example shapes (Tier 5; scale down per the tier shelf for lower tiers): 'A hit target makes a DC 18 Constitution save or suffers 1 point of Constitution drain that does not heal naturally; Greater Restoration to clear. The wound looks clean but the bitten character begins answering to a name that is not theirs.' 'A failed Constitution save against the creature's gaze petrifies the target (Stone to Flesh to undo). The petrified speak in a dead language until restored.' 'On a hit, the creature's claws strip muscle from bone: slashing damage plus a major laceration (disadvantage on Strength-based checks until magically healed).' Register-flavor wraps the mechanical bite but never stands alone.",
      "CR": "${monsterCRs.largeCreature}"
    }
  ],
  "name": ${userName ? `"${userName}" (use this verbatim)` : '"the dungeon\'s proper noun, in English. Pick ONE of the NAME TEMPLATES above and fill the [image] slot with a concrete noun MINED FROM THE DUNGEON YOU JUST WROTE — the signature creature, the prize, the central material, the one striking object you already named in the body fields above. Per the IMAGE-FROM-CONTENT rule: a reader should be able to point to the prose and find the named thing. 2-5 English words. At most one register-flavored proper noun. NO foreign-language articles or particles. If the register has a culturally-rooted original-language phrase, it belongs in the FIRST SENTENCE of the overview field, not here."'},
  "title": "A short evocative phrase (3-5 words, max 6) that pairs with the name as a subtitle. Like the name, the title's load-bearing word is a CONCRETE IMAGE mined from what you already wrote — point to a real thing in your prose. STRUCTURE: a phrase, not a sentence — NO 'where X does Y' clauses, NO conjugated verbs (no 'are', 'is', 'was', 'were', 'has', 'have', no '-ed' / '-ing' verb forms used as predicates). DO NOT begin with a leading article ('the', 'a', 'an') — the title starts with its first content word, same rule as the name. PASS: 'Tomb of the Singing Bones', 'Halls of Slow Light', 'Where the Geysers Sing What Was Lost'. FAIL: 'Where Oaths Are Knotted in Bone' (leading 'Where' + passive-voice conjugated 'Are Knotted' = clause, not phrase). SUGGEST the character qualities through imagery; do NOT use a character quality word as an adjective."
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
    'hazards_and_dangers',
    'central_dynamic', 'present_state',
    'potential_outcomes',
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
    && typeof m.danger === 'string'
    && m.danger.trim().length > 0
    && (typeof m.CR === 'string' || typeof m.CR === 'number')
  )) return false;

  return true;
}
