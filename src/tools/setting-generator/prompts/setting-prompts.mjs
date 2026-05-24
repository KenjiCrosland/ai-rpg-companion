/**
 * Setting-generation prompts using the dimensional architecture.
 *
 * The inference call upstream (`infer-setting-dimensions.mjs`)
 * extracts type, character, register, and userName from user input
 * (or picks from variety pools when no input). The main generation
 * call receives those as fully-specified constraints rather than
 * rolling its own dimensions. This produces dimensional variety
 * controlled by code and coherence judgment from the LLM, instead
 * of letting the LLM both roll AND compose — same shape as the NPC
 * register-inference architecture.
 *
 * Three prompts in this module:
 *
 *   settingOverviewPrompt — top-level setting generation. Takes
 *     {type, character, register, userName, description, lore}.
 *     Returns the rich overview JSON with `name` (bare register-
 *     coherent place name, used in sidebars/lists) and `title` (full
 *     descriptive title like "The Ember-Banked Republic of Valderia",
 *     used in headers). The two fields replace the old adjective +
 *     setting_type + place_name composition.
 *
 *   sublocationOverviewPrompt — sub-location generation. Takes the
 *     new dimensions plus parent context. The caller propagates
 *     the parent's register as a constraint so sub-location names
 *     stay coherent with the parent.
 *
 * (subLocationsPrompt was removed — bulk stub generation no longer
 * matches how the rest of the tool works. Single-shot manual creation
 * and prose-extraction promotion replaced it.)
 *
 * Both prompts forbid the same list of overused NPC names —
 * see `FORBIDDEN_NPC_NAMES` below.
 */

import {
  CHARACTER_VALUE_TO_SUBDIMENSION,
  TENSION_DESCRIPTIONS,
} from '../utils/setting-dimensions.mjs';
import { buildDeityModeBlock } from '@/shared/deity-mode-block.mjs';
import { findRegisterByPrefix } from '@/shared/registers/index.mjs';

const FORBIDDEN_NPC_NAMES =
  'Seraphina, Alistair, Kael, Elara, Thalia, Blackthorn, Nightshade, Lyra, Varian, Selene, Lyria, Isolde';

/**
 * Per-sub-dimension expression-mode instructions. Each character
 * quality has a "natural" mode of expression matched to its sub-
 * dimension's nature. Without this guidance the LLM defaults to
 * literal keyword-threading — invoking each quality's keyword in
 * every section, which produces output that feels stuffed (most
 * visible with concrete atmospheric qualities like "incense-laden",
 * "bell-ringing", "ash-falling" that have only one obvious surface
 * form).
 *
 * The modes:
 *   - state/temporal qualities → shape the history-arc and current-
 *     state framing. Expressed through trajectory, not the adjective.
 *   - political/cultural qualities → show through institutions,
 *     factions, customs. Express through structures, not labels.
 *   - geographic qualities → physical context that radiates into
 *     economy/military/daily life. Named once or twice; consequences
 *     carry the rest.
 *   - mystical/hidden qualities → 1-2 specific beats. Not threaded
 *     ambiently — concentrated in concrete manifestations.
 *   - atmospheric qualities → ONE sensory beat. The most dangerous
 *     sub-dimension for keyword-stuffing; the prompt is explicit
 *     about capping repetition and forbidding the quality from
 *     becoming the economic/political driver.
 */
const EXPRESSION_MODES = {
  state: 'shape the framing of history and current state so they feel this way. A "declining" setting reads late-stage; a "thriving" setting reads ascendant. Express through trajectory and tone, not by naming the adjective.',
  political: 'show through specific institutions, contested authority, and named factions — describe the structures and the conflict, not the label.',
  cultural: 'show through customs, daily practice, intellectual life. Describe what people DO and value, not the label that fits them.',
  geographic: 'physical context. Name the terrain once or twice; let consequences (economy, military, daily life) carry the rest.',
  mystical: 'give 1-2 specific supernatural beats with concrete manifestation. Do NOT thread mystical references ambiently through every field.',
  temporal: 'shape the history-arc framing — show how time has marked this place. The arc carries the meaning; don\'t repeat the adjective.',
  hidden: 'revealed through 1-2 specific scenes or plot beats, not announced upfront. The reader infers it; the text doesn\'t state it.',
  atmospheric: 'ONE specific sensory beat that establishes the texture (a single descriptive moment, ideally in the overview or atmosphere field). Do NOT make this quality the economic, political, religious, or social driver. The keyword appears at most ONCE in the entire output — sensory texture is most effective when used sparingly.',
};

/**
 * Registers whose orthography imposes significant cognitive load on
 * English-speaking GMs reading the setting at-table. Welsh / Irish
 * orthography (digraphs ll, dd, ch, mh, bh; mutation patterns), and
 * Finnish (long compound words, repeated double consonants) all
 * produce names that are visually heavy and slow to parse even when
 * authentic. The texture is worth it, but unconstrained the LLM will
 * stack 6-10 register-coherent names per overview and bury the read.
 *
 * Match is substring-insensitive so 'Welsh-inspired', 'Middle-Welsh-
 * inspired', 'Old-Irish-inspired', and 'Finnish-inspired' all hit.
 * Extend the list if production observation surfaces another register
 * with the same readability tax (Old-Slavic, Sanskrit, etc.).
 */
const HIGH_COGNITIVE_LOAD_REGISTER_KEYWORDS = ['welsh', 'irish', 'finnish', 'mesopotamian'];

function isHighCognitiveLoadRegister(register) {
  if (!register || typeof register !== 'string') return false;
  const lower = register.toLowerCase();
  return HIGH_COGNITIVE_LOAD_REGISTER_KEYWORDS.some(k => lower.includes(k));
}

/**
 * Readability guidance for registers whose orthography is hard for
 * English-speaking readers to parse at-table. The texture is the
 * point of the register — strip it and the setting reads generic —
 * but unconstrained generation produces 6-10 names per overview where
 * a GM has to stop and decode each one. This block caps the load:
 * fewer total names, shorter forms, role-words and epithets carrying
 * the repetition.
 *
 * Returns an empty string for low-load registers (Anglo-Saxon, Latin,
 * Greek, Old-Norse, etc.) — they're already accessible at-table and
 * don't need the directive.
 */
function buildHighCognitiveLoadReadabilityBlock(register) {
  if (!isHighCognitiveLoadRegister(register)) return '';
  return `READABILITY (this register's orthography imposes cognitive load on English-speaking GMs reading at-table; the texture is valuable but cap the load):

- TOTAL BUDGET: across the entire overview, use AT MOST 3-5 register-coherent proper nouns. NOT one per field. NOT one per sentence. Counted across the whole output: ruler name, setting/place name, one notable NPC, one named landmark or institution — that's already 4. Stop there.

- LENGTH: prefer 2-syllable names (3 max). Bran over Branwen. Caer over Caerfyrddin. Eda over Edalwyn. Keep the single longest authentic name for the ruler or a focal NPC where the texture is worth the cost.

- AFTER FIRST USE, USE ROLE-WORDS OR EPITHETS, NOT THE NAME AGAIN: introduce the name once, then refer back by their role or by a short epithet in plain English. "**Gwarchodwyr** now light shadow-torches each dusk" — and in the next sentence "the Watch-Master" or "the wardens," NOT "Gwarchodwyr" again. The register-coherent name appears ONCE per entity unless the second mention is many sentences away.

- IN-WORLD ITALIC TERMS (like *ffaglau cysgod*, *sídhe*, *kantele*): cap at ONE across the entire overview. Each one costs reader attention; spend it on the single most flavor-defining term, not every concept.

- NEVER STACK two register-coherent names in the same sentence. If a sentence has two such terms, swap one for its English role-word. "**Magnus**, *brenin* of **Hjallmark**" becomes "**Magnus**, king of **Hjallmark**."

- For supporting / minor NPCs, prefer English-language role-words ("the bog-keeper", "the iron-warden") over register-coherent names. Reserve names for entities the GM will actually need to address by name at the table.

- DEITIES IN PROSE: reference gods/spirits by EPITHET, not by name. "the Earth-Maker" instead of "Enki"; "the Storm-Bringer" instead of "Adad"; "the Star-Lady" instead of "Ishtar"; "the Soil-Burner" instead of "Nergal". Names of gods are not free — each named deity costs the same attention as a named character. Authentic register-specific epithets are listed in the DEITY HANDLING block below (when one fires); use those directly. Most generations should name NO deities at all.
`;
}

/**
 * Build the fantasy-texture directive. Production observation
 * (~2026-05): strongly culturally-coded registers (Slavic, Russian,
 * Old-Slavic) produced setting outputs that read as historical
 * fiction — Old Believer villages with Patriarchs and silver kopecks,
 * no supernatural texture, nothing that distinguishes from a 19th-c.
 * Russian short story. The LLM defaults to historical-fiction mode
 * for these registers because that's where the cultural training
 * data lives.
 *
 * Fix: when the register is non-null (i.e., this IS a fantasy
 * setting, not a sci-fi / modern / historical alt), explicitly
 * require at least one supernatural element drawn from the
 * register's own folklore. The folklore-by-register hints anchor
 * the LLM in the *fantasy* part of its training rather than the
 * historical part.
 *
 * Returns an empty string when register is null (user explicitly
 * indicated a non-fantasy genre) — those settings shouldn't get
 * fantasy-pressure.
 */
function buildFantasyTextureBlock(register) {
  if (!register) return '';
  return `FANTASY TEXTURE REQUIREMENT (mandatory — verify before returning):
This is a folkloric fantasy setting, not historical fiction. The setting MUST include at least one supernatural element that is ACTIVELY OPERATING in the present-tense narrative — a spirit, creature, magic-working, or folk-belief made literally true that:
  (a) appears in the current-day setting, not just in history or legend,
  (b) is FUNCTIONING, not merely remembered, feared, hoped-for, or believed-in.

The element should be drawn from the register's own mythological tradition. Suggestive examples:
  Slavic → leshy in the wood, rusalka in the river, domovoi behind the hearth
  Celtic → sídhe on the hill, Tylwyth Teg watching the bog, púca on the road
  Norse → draugr in the howe, jötunn at the pass, fylgja walking beside someone
  Mesopotamian → apkallu spirits at the gate, lilītu at the threshold, ūtukku haunting the canal, edimmu refusing burial, mušḫuššu seen at dusk on the temple wall
  Egyptian → akh visiting the priest, sheut following its caster, kheper-scarab in the morning grain
  Greek/Roman → genius loci speaking through the spring, dryad answering from the olive, lar of the household sharing the meal
  Finnish → metsänpeitto hiding travelers, väki of the lake refusing the fisherman, haltija of the threshold

The element must show up CONCRETELY in at least one of: overview (atmosphere), notable_social_facet, notable_economic_facet, notable_security_facet, central_dynamic, responses_in_motion, or npc_list — and it must be UNAMBIGUOUSLY REAL within the setting. Not "the old women say it is the touch of Nergal" (folk-belief framing); rather "the canal-pool grows cold each dusk and the catfish drift up dead — the ūtukku is awake again." The first is historical fiction with a divine name. The second is fantasy.

ANTI-PATTERN ALERT: rituals that have "never been performed successfully," priests who "no longer remember the words," dead gods, lost magic, faded blessings — these read as fantasy but FUNCTION as historical fiction. If every supernatural reference is past-tense, broken, or aspirational, the setting fails the texture requirement. At least one supernatural beat must be present-tense and working.

The supernatural can be subtle (a single sentence on a sensory beat, a brief NPC encounter) but it MUST be there, MUST be real, and MUST be active in present time. Do NOT write historical fiction with fantasy names.
`;
}

/**
 * Build the anti-clustering directive. Production observation:
 * certain worldbuilding premises (sealed-danger maintenance,
 * silence-cult paralysis, aging-authority succession, cursed-artifact
 * fade, etc.) appear too often because the LLM has strong training-
 * data attractors toward them. The dimensional architecture controls
 * texture but not the structural premise. This block bans ~70% of
 * the known attractor pool per generation, forcing the LLM to
 * explore unfamiliar premises most of the time.
 *
 * The ~30% unbanned attractors stay available — the LLM uses them
 * when they naturally fit the rolled type/character/register/tension.
 * Generations don't need to AVOID all clustering attractors; they
 * need to AVOID DEFAULTING to them when something else would work.
 *
 * Returns empty string when bannedTropes is empty (defensive; should
 * not happen given every generation gets bans from the orchestrator).
 */
function buildAntiClusteringBlock(bannedTropes) {
  if (!Array.isArray(bannedTropes) || bannedTropes.length === 0) return '';
  const banList = bannedTropes.map(t => `- ${t}`).join('\n');
  return `ANTI-CLUSTERING:
Do NOT use the following worldbuilding patterns in this generation:
${banList}

These patterns are compelling but appear too often in unguided generation. Use a different worldbuilding premise. Communities can be defined by trade relationships, agricultural cycles, scholarly traditions, craft mastery, pilgrimage hosting, festival cycles, treaty obligations, ecological adaptation, generational migration, frontier expansion, religious-calendar cycles, mercantile rivalries, technological transition, ethnic or cultural mixing, climate adaptation, or many other organizing premises that don't involve sealed-evil-beneath-the-earth or community-paralyzed-by-secrets.
`;
}

/**
 * Build the tension-guidance block injected into the main prompt.
 * The tension reshapes how the LLM frames the setting's main_problem,
 * potential_solutions, and conclusion fields. Without this, the
 * field templates ("recent scene illustrating the main problem,"
 * "what happens if unresolved") all bias toward imminent-crisis
 * framing — producing same-y outputs at the decision-point even
 * when the dimensional pick said otherwise.
 *
 * The guidance is explicit per-tension because different tensions
 * need different field framings (a recovery-rebuilding main_problem
 * is "what's still broken from the crisis"; an aspirational-striving
 * main_problem is "what's standing in the way of the goal"). The
 * description from `TENSION_DESCRIPTIONS` carries most of the
 * weight; the framing notes are how it should affect specific
 * fields.
 */
function buildTensionGuidanceBlock(tension) {
  if (!tension || !TENSION_DESCRIPTIONS[tension]) return '';
  return `CENTRAL TENSION: ${tension}
${TENSION_DESCRIPTIONS[tension]}

How this shapes the output:
- central_dynamic: describes what this tension currently looks like in the setting, framed in the tension's own terms.
- responses_in_motion: what is currently in motion in response to the tension — adaptations, institutional responses, ritual practices, generational labor, or active interventions, whichever the tension calls for.
- notable_social_facet / notable_economic_facet / notable_security_facet: each OPTIONAL, capped at 1 sentence. May read as routines, holding patterns, gradual shifts, atmospheric details, or discrete developments. NOT all need to be filled — leave any of them empty if nothing notable distinct from history applies. The accumulation of dramatic incidents is what produces crisis-shape regardless of the tension; one sentence per facet, or fewer, is enough.
- present_state: reads consistently with the tension. A recovery-rebuilding present_state is different in character from an aspirational-striving one, which is different from an imminent-crisis one. Each tension has its own shape; let that shape come through.
- The tension is the GM-useful spine of the setting. Express it through the structural arrangement of activities and dynamics, not by naming the tension keyword.
`;
}

/**
 * Build the per-quality expression-mode block injected into the
 * GENERATION RULES section. For each picked character value, look
 * up its sub-dimension and emit a labeled line with the mode-
 * appropriate guidance. Falls back to a generic note if the sub-
 * dimension lookup fails (shouldn't happen, but defensive against
 * pool drift).
 */
function buildExpressionModesBlock(character) {
  if (!Array.isArray(character) || character.length === 0) return '';
  const lines = character.map(value => {
    const subdim = CHARACTER_VALUE_TO_SUBDIMENSION[value];
    const mode = EXPRESSION_MODES[subdim]
      || 'express as texture, not by repeating the keyword.';
    return `- "${value}" (${subdim || 'unknown'}): ${mode}`;
  });
  return lines.join('\n');
}

/**
 * Builds the SETTING TYPE / CHARACTER / REGISTER / NAME constraint
 * block, the FANTASY TEXTURE requirement, the GENERATION RULES, and
 * the EXPRESSION MODES section. Shared between settingHeadlinePrompt
 * and settingDetailsPrompt so both phases generate against the same
 * dimensional constraints and texture rules.
 */
function buildSettingConstraints({
  type, character, register, userName, description, lore,
}) {
  const characterStr = Array.isArray(character) && character.length > 0
    ? character.join(', ')
    : 'unspecified — choose qualities that fit a coherent setting';

  const registerStr = register
    ? `${register}

All proper nouns (place names, character names, faction names, organizational names) MUST match this register's phonological style and cultural texture.`
    : 'No specific linguistic register is set. Use generic fantasy naming with creative variety.';

  const nameInstruction = userName
    ? `The user has named this setting "${userName}". Use this name verbatim as the "name" field. Do NOT translate, alter, or "improve" the user's chosen name. The "title" field is a separate short evocative phrase that pairs with the name as a subtitle.`
    : `Generate a register-coherent bare name for the "name" field. The "title" field is a separate short evocative phrase that pairs with the name as a subtitle.`;

  const descriptionStr = description && typeof description === 'string' && description.trim()
    ? `\nUser's setting description: "${description.trim()}".`
    : '';

  const loreStr = lore && typeof lore === 'string' && lore.trim()
    ? `\nUser's setting lore (incorporate authoritatively into history and details): "${lore.trim()}".`
    : '';

  const expressionModesBlock = buildExpressionModesBlock(character);
  const fantasyTextureBlock = buildFantasyTextureBlock(register);
  const readabilityBlock = buildHighCognitiveLoadReadabilityBlock(register);
  const deityModeBlock = buildDeityModeBlock(findRegisterByPrefix(register));

  return `SETTING TYPE: ${type || 'unspecified — pick a fitting type'}
CHARACTER QUALITIES: ${characterStr}
LINGUISTIC REGISTER: ${registerStr}
NAME: ${nameInstruction}${descriptionStr}${loreStr}

${fantasyTextureBlock}${readabilityBlock}${deityModeBlock ? '\n' + deityModeBlock + '\n' : ''}
PROSE FORMATTING (the renderer handles emphasis — keep your prose clean):
- FIRST-MENTION EMPHASIS: every PERSON you name in the prose MUST appear in the \`named_entities\` JSON array at the bottom (rulers, historical figures, NPCs — anyone introduced by a personal name). The renderer wraps the FIRST occurrence of each listed name in semibold, signaling "new character introduced." Places, factions, buildings, regions, and titles of office do NOT go in this array — context carries them. Deity names also do NOT go in this array.
- Do NOT use markdown bold (\`**text**\`) for proper nouns. The renderer applies first-mention emphasis automatically using the \`named_entities\` array you return. Wrap nothing in \`**\` — write proper nouns as plain text.
- Use *italic* (\`*term*\`) ONLY for foreign in-world terms that genuinely shift register (e.g., *sídhe*, *kantele*, *aes dána*) and want a visual cue that they're foreign vocabulary. Cap italic usage strictly: at most one or two italic terms across the ENTIRE overview. Do NOT italicize whole sentences. Do NOT use italic on proper names.
- Every field is a plain paragraph of prose. No blockquotes, no callouts, no special structure. Temporality ("Yesterday at dawn…", "Two harvests ago…") is signaled by the words themselves, not by markdown markers.

GENERATION RULES:
- The three character qualities shape the setting's overall feel. Express each one through the mode noted below — NOT by repeating its literal word across every field. Texture comes from structure, events, and consequence, not from keyword repetition.
- Each quality's literal keyword should appear sparingly across the entire output (at most once or twice). For atmospheric qualities especially, the keyword appears at most ONCE — never make a sensory quality into the political, economic, or religious driver.

EXPRESSION MODES (for this setting's qualities):
${expressionModesBlock || '(no specific guidance — express the qualities coherently)'}

- All proper nouns match the linguistic register.
- Each field flows into the next, building a cohesive picture.
- Avoid common fantasy tropes and cliches. Each setting should feel distinct.
- Do NOT use these NPC names: ${FORBIDDEN_NPC_NAMES}.`;
}

/**
 * Lore-preservation directive. When the user provides lore that
 * contains specific named entities (festivals, characters, places,
 * organizations, customs), production observation showed the LLM
 * treating those names as creative inspiration — keeping the
 * imagery but reframing or renaming the institutions. Users
 * extending their existing worldbuilding need named entities to
 * survive the generation verbatim.
 *
 * Returns an empty string when no lore is provided. When lore is
 * present, the directive instructs the LLM to preserve named
 * entities with the user's exact terminology, treat contradictions
 * as creative challenges to reconcile rather than license to drop
 * names, and accept passing mentions when an entity doesn't fit
 * centrally.
 */
function buildLorePreservationBlock(lore) {
  if (!lore || typeof lore !== 'string' || !lore.trim()) return '';
  return `LORE PRESERVATION:
Specific named entities in the user-provided lore are AUTHORITATIVE and must be preserved with the user's exact terminology. This includes:
- Named festivals, holidays, or recurring events (e.g., "the Long Night," "the Bone Feast")
- Named characters, including player characters and their relationships
- Named places (districts, landmarks, neighboring settlements)
- Named organizations (guilds, orders, factions, cults)
- Named customs, rituals, or institutions

These elements must appear in the generated output using the user's exact names and basic framing. Build the setting AROUND user-named details rather than replacing them with thematically-similar inventions. If the user says "Long Night festival," the output must include the Long Night festival by that name — not a reframed institution that shares the festival's imagery.

UNNAMED PC REFERENCES AND USER-REQUESTED CONNECTIONS are also AUTHORITATIVE, even without proper nouns. When the user describes a PC's relationship to the setting or requests specific narrative hooks, the output must acknowledge those connections at minimum as passing references:
- "my halfling cleric grew up here" → the setting must acknowledge the cleric's origin (a hint of family, a familiar street or building from their childhood, an old neighbor who remembers them, a parent's grave or homestead)
- "old friend or family member" → at minimum one such NPC must appear in the npc_list or be mentioned in passing
- "the warlock should have something interesting waiting for them" → some setting element must support that hook (a strange visitor seeking them, an inherited letter, a recurring dream that pulls them toward a local landmark)
- "the cleric should feel out of place" → some setting element must specifically support that emotional beat
- "PCs are stopping by between adventures" → the setting must read as a place adventurers can rest and resupply, not a crisis-point that demands their intervention

Drop NONE of the user's requested connections. If a connection seems to conflict with another constraint, find a way to reconcile rather than omitting.

If user-named entities seem to conflict with each other or with other constraints, find ways to reconcile them rather than dropping any. Contradictions in user input are creative challenges to resolve, not permission to ignore specific named elements.

Passing mentions are acceptable when entities don't fit centrally. A user-named character mentioned in passing acknowledges the user's worldbuilding even if that character isn't central to the setting.
`;
}

/**
 * Build the SIBLING SETTINGS directive. Used when this generation has
 * other settings that share a source (e.g., multiple settings promoted
 * from the same item's lore, or sublocations sharing a parent). Pastes
 * the full markdown of each sibling and instructs the LLM to treat
 * their named entities, geography, and history as canonical.
 *
 * Without this, cross-setting drift is common: the same NPC ends up
 * with two roles, the same region gets two different names, the same
 * founder is both hero and villain. Brief stub names are not enough
 * to anchor — the model needs the actual prose of the sibling so it
 * can see WHICH facts have already been canonized and reuse them.
 *
 * Returns an empty string when siblingSettings is missing or empty.
 *
 * @param {Array<string>} siblingSettings - Full markdown strings, one
 *   per sibling. Caller passes already-rendered prose
 *   (consolidateOverviewToMarkdown of each canonical setting).
 */
function buildSiblingSettingsBlock(siblingSettings) {
  if (!Array.isArray(siblingSettings) || siblingSettings.length === 0) return '';
  const siblings = siblingSettings
    .map((md, i) => `--- Sibling ${i + 1} ---\n${md}`)
    .join('\n\n');
  return `SIBLING SETTINGS (already generated; treat as canonical context):
${siblings}

When the new setting could reasonably share characters, factions, geography, or history with these siblings, USE the established names and details from above. Do not invent contradictory facts for entities that already appear in a sibling. Specifically:
- NAMED CHARACTERS (people, rulers, deities) introduced in a sibling are CANONICAL. If your new setting would naturally reference one — same family, same office, same incident — use the existing name and role. Do not invent a second character with the same name in a different role.
- GEOGRAPHIC POSITIONING (regions, neighboring polities, named roads or landmarks) established in a sibling is CANONICAL. If your new setting sits adjacent to, within, or contains a sibling's geography, anchor it accordingly. Do not place the same named landmark in two different regions.
- HISTORICAL EVENTS, founding stories, and named institutions established in a sibling are CANONICAL. Do not contradict the timeline (when something happened, who founded what, who broke faith with whom).
- RESIDENT SPIRITS, supernatural elements, and folkloric figures: if a sibling has already named one for this location or cluster, reference rather than reinvent.

The new setting should feel like it belongs in the same world as the siblings — not like a parallel-universe version with similar-sounding-but-different facts.
`;
}

/**
 * Build the CHILDREN SETTINGS directive. Used by the parent-promote
 * flow: when generating a setting that will contain existing
 * children (the source of the parent-promote plus any cascaded
 * siblings), tell the LLM about them so the prose treats them as
 * places it contains — not as peers, neighbors, or "regions where X
 * happens to be."
 *
 * Without this, the LLM treats child names mentioned in user input
 * as references to external places. Production observation: a new
 * region setting generated as parent of two existing cities ended
 * up describing those cities as "neighbors at the crossroads" rather
 * than as places "within its borders," because the generation prompt
 * had no signal that they were contained by the new region.
 *
 * Returns an empty string when childrenSettings is missing or empty.
 *
 * @param {Array<string>} childrenSettings - Full markdown strings,
 *   one per child. Caller passes already-rendered prose
 *   (consolidateOverviewToMarkdown of each canonical child setting).
 */
function buildChildrenSettingsBlock(childrenSettings) {
  if (!Array.isArray(childrenSettings) || childrenSettings.length === 0) return '';
  const children = childrenSettings
    .map((md, i) => `--- Child ${i + 1} ---\n${md}`)
    .join('\n\n');
  return `PLACES THIS SETTING CONTAINS (canonical; treat as parts of yourself):
${children}

These places sit INSIDE the setting you are generating. When your prose mentions them, frame them accordingly:
- USE phrases like "within its borders," "the city of X lies to the south of the capital," "the kingdom contains," "among the lands of [this setting] is X" — relationships that make the containment relationship clear.
- DO NOT describe them as "neighboring," "adjacent," "across the border," "to the east/west of," or "peer of" — those phrasings would imply they sit OUTSIDE you. They don't.
- NAMED CHARACTERS, factions, geographic features, and historical events established in a child's prose are CANONICAL. Reference them by their established names; never invent variant names or reframe their roles.
- The relation_to_larger_setting field for your setting should describe what's OUTSIDE you (neighboring polities, larger containing region), not what's inside. Reserve the contained children for the central_dynamic, social_history, or other fields where their relationship to you is relevant.

The new setting should read as a parent place containing these children — not as a peer of them.
`;
}

/**
 * Builds the late-context framing that sits immediately before the
 * JSON schema: anti-clustering trope bans and the tension-guidance
 * block. These two are positioned for maximum salience at the
 * moment the LLM generates field content.
 */
function buildSettingFraming({ tension, bannedTropes }) {
  const antiClusteringBlock = buildAntiClusteringBlock(bannedTropes);
  const tensionBlock = buildTensionGuidanceBlock(tension);
  return `${antiClusteringBlock}
${tensionBlock}`;
}

/**
 * Generate the full setting overview in a single call. Two-phase
 * splitting was tried (settingHeadlinePrompt + settingDetailsPrompt)
 * but introduced continuity drift between phases — even with the
 * headline shown as input context, Phase 2 occasionally contradicted
 * Phase 1's facts (renamed rulers, shifted founding dates, swapped
 * fire-for-flood in historical events). The single call is coherent
 * by construction because all fields are generated in one context
 * window. Wall-clock latency is higher but predictable, and lore
 * stays internally consistent.
 */
export function settingOverviewPrompt(args = {}) {
  const constraints = buildSettingConstraints(args);
  const framing = buildSettingFraming(args);
  const lorePreservation = buildLorePreservationBlock(args.lore);
  const siblingBlock = buildSiblingSettingsBlock(args.siblingSettings);
  const childrenBlock = buildChildrenSettingsBlock(args.childrenSettings);

  return `Generate a detailed setting overview using the following constraints. These are FULLY-SPECIFIED inputs from an upstream inference call — do not override or substitute them.

${constraints}

${lorePreservation}${siblingBlock ? '\n' + siblingBlock + '\n' : ''}${childrenBlock ? '\n' + childrenBlock + '\n' : ''}
${framing}
Return JSON with the following fields. Temperature: 0.9. Keep sentences concise; avoid run-on prose.

{
  "name": "The bare register-coherent place name only (e.g., 'Valderia', 'Ashenmoor', 'Glenmara'). No articles, no qualities, no type — just the proper noun. This is what shows in sidebars and lists.",
  "title": "A short evocative phrase (3-5 words, max 6) that pairs with the name as a subtitle in the UI. STRUCTURE: a phrase, not a sentence or clause — NO 'where X does Y' constructions, NO verbs in conjugated form. Most should follow '[Type] of [Poetic Phrase]' (4-5 words) or 'the [Poetic Noun-Phrase]' (3-4 words) — these convey both the setting type AND the place's character. The phrase SUGGESTS the character qualities through concrete imagery — it MUST NOT use any character quality word as an adjective ('plague-stricken', 'ancient', 'ember-banked', 'duel-honored', 'coastal', etc. are FORBIDDEN). GOOD invented examples: 'Village of the Drawn Blade' (suggests duel-honored); 'City of Tolling Bells' (suggests plague-stricken); 'Republic of Banked Coals' (suggests ember-banked); 'Monastery of the Long Silence' (suggests ancient); 'the Codified March' (suggests legal/structured); 'Hold of the Iron Vigil' (suggests militant); 'the Lantern-Bound Quarter' (suggests insular). BAD — never generate: 'Duel-Honored Coastal Village' (pastes quality keywords); 'Village Where the Fjord-Edge Holds the Gavel' (sentence-clause structure, too long, 8 words). Keep it tight.",
  "overview": "ATMOSPHERIC opener. 2-3 short sentences of sensory, mood-setting prose: what one sees, smells, hears, feels in this place at a moment. The establishing shot — film-camera-on-a-tripod-style, not encyclopedia entry. NO geographical positioning ('a kingdom in the X mountains', 'a port city on the Y coast'); positioning lives in relation_to_larger_setting. NO history. NO political structure. Just texture and mood. Plain prose, no markdown markers on proper nouns.",
  "relation_to_larger_setting": "GEOGRAPHIC AND POLITICAL POSITIONING. Where this setting sits on the map: what type of place it is, the terrain it occupies, the larger geographical region containing it, neighboring polities, larger trade/political/military networks. Use register-coherent names for any larger geographical or political contexts. 2-3 sentences. The reader should finish this field knowing where this place IS — what surrounds it, what larger body it belongs to. Plain prose.",
  "history": "A brief history including founding and significant recent events. Plain prose.",
  "current_ruler_sentence": "LEADERSHIP. 2-3 sentences. Make the leader's power SPECIFIC — name how it's exercised, what it rests on, and the character of their rule. Contested vs uncontested authority follows the CENTRAL TENSION: imminent-crisis / open-secret / inheritance-burden / ongoing-accommodation settings typically have contested or fragile authority (rival factions, succession disputes, limits on writ). Cozy-routine / aspirational-striving / steady-prosperity / sacred-practice settings can have stable, uncontested, or charismatic rulers without forced opposition. Match the framing to the tension — don't manufacture rivals where the tension doesn't call for them, and don't gloss over real fractures where it does. Scale-aware framing: (a) Continent / region (containing kingdoms, leagues, or city-states): there is NO singular ruler at this scale — name the dominant polities and how they relate (alliance, rivalry, ceremonial overlordship, contested zones). (b) Kingdom / duchy: ruler + the character of their power. May be contested (great houses, succession crisis) OR absolute (strength of arms, charisma, divine mandate) per the tension. (c) City / town: ruler + actual scope. May be uncontested (entrenched mayor, theocratic governor, dynastic certainty) OR contested (merchant houses, temple, military, succession) per the tension. (d) Village / hamlet: elder, headman, or council + the social fabric they operate within. (e) Building: proprietor + the relationships that define their hold on the place. Plain prose, no markers.",
  "social_history": "A brief social-structure history. Plain prose.",
  "notable_social_facet": "OPTIONAL. One sentence about current social life. May be a routine that's holding, a gradual change, atmospheric texture, a notable absence, or a discrete development. The temporality reads in the prose itself (\"Yesterday at dawn…\", \"This past spring…\"); do NOT add markdown markers. Empty string is acceptable if nothing notable applies.",
  "economic_history": "A brief economic-structure history. Plain prose.",
  "notable_economic_facet": "OPTIONAL. One sentence about current economic life. May be a steady arrangement, ongoing project, incremental shift, or development. Plain prose. Empty string is acceptable.",
  "military_history": "A brief military / security history. Plain prose.",
  "notable_security_facet": "OPTIONAL. One sentence about current security posture. May be a routine, holding pattern, arrangement, or development. Plain prose. Empty string is acceptable.",
  "central_dynamic": "The central dynamic of the setting — how the central tension shapes daily life. Plain prose. A specific named scene, recurring pattern, or present condition that captures the tension. The character of this dynamic follows from the tension: a recovery-rebuilding setting's central_dynamic is the ongoing work of repair; an aspirational-striving setting's is the active pursuit of the goal; an ongoing-accommodation setting's is the daily negotiation of sustained difficulty; an open-secret setting's is the structure of willful inaction; an inheritance-burden setting's is the way the ancestral weight shapes present life; an imminent-crisis setting's is the approaching decision-point. Match the tension.",
  "responses_in_motion": "1-2 sentences on what is currently in motion in response to the central tension. Plain prose. The shape of these responses follows the tension: adaptations, institutional responses, ritual practices, long-term efforts, evolving accommodations, generational labor, or active interventions — whichever fits. Who's leading the effort, what trade-offs or obstacles.",
  "present_state": "Present state of the setting in the tension's terms. Plain prose. A recovery setting's present_state reads about whether repair is holding; an aspirational setting's about the state of the work; a cyclical setting's about position within the cycle; an imminent-crisis setting's about the approach of the break. Tie back to central_dynamic and responses_in_motion. Match the tension.",
  "named_entities": [
    "Example Person One",
    "Example Person Two"
  ],
  "//named_entities_note": "REPLACE the example entries above with the CHARACTER NAMES (people only — first name + family/clan/byname if applicable) of every individual named in the prose fields above. Rules: (a) PEOPLE ONLY. Include rulers, NPCs, historical figures, and any other individual named by a personal name. (b) EXCLUDE place names, region names, polity names, faction names, building names, geographical features — those are handled by context, not by emphasis. (c) EXCLUDE titles of offices and role-words even when they look like proper nouns ('Winding-Leader', 'the Lawgiver', 'High Priest', 'Watch-Master', 'Lord Mayor' — these are roles, not personal names). When a person is introduced with both name + title (e.g., 'Greta Gearspring the Founder'), include ONLY the personal-name part: 'Greta Gearspring'. (d) Match the prose VERBATIM, case-sensitive — if your prose says 'Greta Gearspring' include 'Greta Gearspring' with the same capitalization and any diacritics. (e) EXCLUDE deity names (gods are referenced by epithet per the deity-handling block). (f) Include EVERY individual named in the prose — typically 3-6 people across overview / history / leadership / society / present_state / npc_list. If you mention a person by name once anywhere in the prose, they belong here. The renderer wraps the FIRST occurrence of each entry in semibold, signaling 'new character introduced — track this name.'",
  "npc_list": [
    {
      "name": "Register-coherent NPC name (individuals only, not organizations)",
      "description": "Role and personality"
    }
  ]
}`;
}

export function sublocationOverviewPrompt({
  type,
  character,
  register,
  userName,
  tension,
  bannedTropes,
  parentName,
  parentLore,
  subLocationDescription,
  siblingSettings,
  childrenSettings,
} = {}) {
  const characterStr = Array.isArray(character) && character.length > 0
    ? character.join(', ')
    : 'unspecified — choose qualities coherent with the parent setting';

  const registerStr = register
    ? `${register}

All proper nouns MUST match this register. This sub-location inherits the parent setting's register so names stay coherent with the larger setting.`
    : 'No specific linguistic register is set. Use the naming style established in the parent setting description.';

  const nameInstruction = userName
    ? `The user has named this sub-location "${userName}". Use this name verbatim as the "name" field. The "title" field is a separate short evocative phrase that pairs with the name as a subtitle.`
    : `Generate a register-coherent bare name for the "name" field. The "title" field is a separate short evocative phrase that pairs with the name as a subtitle.`;

  const expressionModesBlock = buildExpressionModesBlock(character);
  const tensionBlock = buildTensionGuidanceBlock(tension);
  const fantasyTextureBlock = buildFantasyTextureBlock(register);
  const readabilityBlock = buildHighCognitiveLoadReadabilityBlock(register);
  const deityModeBlock = buildDeityModeBlock(findRegisterByPrefix(register));
  const antiClusteringBlock = buildAntiClusteringBlock(bannedTropes);
  // Lore preservation applies when the parent setting carries lore
  // (which may itself contain named entities the user established
  // when generating the parent) or when the sub-location stub
  // description carries names the user added or edited.
  const lorePreservation = buildLorePreservationBlock(
    [parentLore, subLocationDescription].filter(Boolean).join('\n')
  );
  const siblingBlock = buildSiblingSettingsBlock(siblingSettings);
  const childrenBlock = buildChildrenSettingsBlock(childrenSettings);

  return `Generate a detailed overview for a sub-location within a larger setting.

PARENT SETTING: ${parentName || 'unspecified'}
PARENT SETTING LORE:
${parentLore || '(no additional parent lore)'}

SUB-LOCATION INITIAL DESCRIPTION:
${subLocationDescription || '(none — generate freely within the constraints)'}

SUB-LOCATION CONSTRAINTS:
SETTING TYPE: ${type || 'unspecified — pick a fitting sub-location type, smaller in scale than the parent'}
CHARACTER QUALITIES: ${characterStr}
LINGUISTIC REGISTER: ${registerStr}
NAME: ${nameInstruction}

${fantasyTextureBlock}${readabilityBlock}${deityModeBlock ? '\n' + deityModeBlock + '\n' : ''}
PROSE FORMATTING (the renderer handles emphasis — keep your prose clean):
- Do NOT use markdown bold (\`**text**\`) for proper nouns. The renderer applies first-mention emphasis using the \`named_entities\` array you return.
- Use *italic* (\`*term*\`) ONLY for foreign in-world terms that genuinely shift register. Cap italic usage strictly: at most one or two italic terms across the ENTIRE overview. Do NOT italicize whole sentences. Do NOT italicize proper names.
- Every field is a plain paragraph of prose. No blockquotes, no callouts, no special structure.

GENERATION RULES:
- The three character qualities shape the sub-location's overall feel. Express each one through the mode noted below — NOT by repeating its literal word across every field. Texture comes from structure, events, and consequence.
- Each quality's literal keyword should appear sparingly (at most once or twice). For atmospheric qualities, the keyword appears at most ONCE — never make a sensory quality into the political, economic, or religious driver.

EXPRESSION MODES (for this sub-location's qualities):
${expressionModesBlock || '(no specific guidance — express the qualities coherently)'}

- Focus on THIS sub-location, not the parent. The parent context is for tone and relationship only.
- All proper nouns match the linguistic register.
- Avoid common fantasy tropes and cliches.
- Do NOT use these NPC names: ${FORBIDDEN_NPC_NAMES}.

${lorePreservation}${siblingBlock ? '\n' + siblingBlock + '\n' : ''}${childrenBlock ? '\n' + childrenBlock + '\n' : ''}
${antiClusteringBlock}
${tensionBlock}
Return JSON with the same field structure as a top-level setting. Temperature: 0.9.

{
  "name": "The bare register-coherent place name only (e.g., 'Riverside', 'Ashen Watch', 'Hearthgate'). No articles or qualities — just the proper noun. Shows in sidebars.",
  "title": "A short evocative phrase (3-5 words, max 6) that pairs with the name as a subtitle. STRUCTURE: a phrase, not a sentence — NO 'where X does Y' clauses, NO conjugated verbs. Most should follow '[Type] of [Poetic Phrase]' or 'the [Poetic Noun-Phrase]'. The phrase SUGGESTS the character qualities through imagery — it MUST NOT use any character quality word as an adjective. GOOD invented examples: 'Quarter of the Singing Stones'; 'Watchtower of the Long Vigil'; 'the Smoke-Veiled District'; 'Foundry of the Banked Coals'. BAD: 'The Bell-Ringing Quarter of Estharic' (pastes quality keyword); 'Quarter Where Bells Wake the Dead and the Smoke Settles' (sentence-clause, too long).",
  "overview": "ATMOSPHERIC opener. 2-3 short sentences of sensory, mood-setting prose: what one sees, smells, hears, feels in this sub-location at a moment. The establishing shot — texture and mood, not encyclopedia entry. NO geographical positioning (that lives in relation_to_larger_setting). NO history. NO political structure. Plain prose, no markdown markers.",
  "relation_to_larger_setting": "GEOGRAPHIC AND POLITICAL POSITIONING within ${parentName || 'the parent setting'}. Where this sub-location sits: which district / quarter / region of the parent, what surrounds it, its political role or economic function within the parent's structure, what neighboring sub-locations it borders. 2-3 sentences. The reader should finish this field knowing where this place sits inside the parent. Plain prose.",
  "history": "A brief history specific to the sub-location, including how it became part of the parent setting. Plain prose.",
  "current_ruler_sentence": "LEADERSHIP. 2-3 sentences. Make the leader's power SPECIFIC — name how it's exercised, what it rests on, and the character of their rule, including how their authority relates to the parent setting's ruler (vassal, autonomous holdout, informal recognition, etc.). Contested vs uncontested authority follows the CENTRAL TENSION: imminent-crisis / open-secret / inheritance-burden / ongoing-accommodation settings typically have contested or fragile authority (rival factions, succession disputes, limits on writ). Cozy-routine / aspirational-striving / steady-prosperity / sacred-practice settings can have stable, uncontested, or charismatic rulers without forced opposition. Match the framing to the tension — don't manufacture rivals where the tension doesn't call for them, and don't gloss over real fractures where it does. Scale-aware framing: (a) City / town / district: ruler + actual scope. May be uncontested (entrenched mayor, theocratic governor, dynastic certainty) OR contested (merchant houses, temple, militia, succession) per the tension. (b) Village / hamlet / quarter: headman, elder, or council + the families and social fabric they operate within. (c) Building / single-room location: proprietor + the relationships that define their hold on the place — for very small sub-locations, the notable figure who frequents the place may matter more than formal ownership. Plain prose, no markers. Register-coherent name.",
  "social_history": "Brief social history specific to this sub-location. Plain prose.",
  "notable_social_facet": "OPTIONAL. One sentence about current social life. Plain prose. Empty string is acceptable.",
  "economic_history": "Brief economic role of this sub-location, especially its role within the parent setting's economy. Plain prose.",
  "notable_economic_facet": "OPTIONAL. One sentence about current economic life. Plain prose. Empty string is acceptable.",
  "military_history": "Brief security history (for small sub-locations, this may be the local militia, guard, or informal posse). Plain prose.",
  "notable_security_facet": "OPTIONAL. One sentence about current security posture. Plain prose. Empty string is acceptable.",
  "central_dynamic": "The central dynamic of the sub-location — how the central tension shapes life here. Plain prose. Frame in the tension's terms — see the CENTRAL TENSION block above. Match the tension's character; do not impose a different framing.",
  "responses_in_motion": "1-2 sentences on what is currently in motion in response to the tension. Plain prose. The shape follows the tension: adaptations, institutional responses, ritual practices, long-term efforts, or active interventions — whichever fits.",
  "present_state": "Present state of the sub-location in the tension's terms. Plain prose.",
  "named_entities": [
    "Example Person One",
    "Example Person Two"
  ],
  "//named_entities_note": "REPLACE the example entries above with the CHARACTER NAMES (people only) of every individual named in the prose fields above. Rules: (a) PEOPLE ONLY — rulers, NPCs, historical figures, anyone named by a personal name. (b) EXCLUDE places, regions, polities, factions, buildings, geographical features. (c) EXCLUDE titles of offices and role-words even when capitalized ('Winding-Leader', 'the Lawgiver', 'High Priest', 'Watch-Master' — these are roles, not personal names). When a person is introduced with name + title (e.g., 'Greta Gearspring the Founder'), include ONLY the personal-name part. (d) Match the prose VERBATIM, case-sensitive. (e) EXCLUDE deity names (gods are referenced by epithet). (f) Include EVERY individual named in the prose — typically 3-6 people total.",
  "npc_list": [
    {
      "name": "Register-coherent NPC name",
      "description": "Role and personality within this sub-location"
    }
  ]
}`;
}

/**
 * Place-scale tension guidance. The polity-scale tensionBlock
 * (buildTensionGuidanceBlock) names polity fields — central_dynamic,
 * responses_in_motion, notable_*_facets — that don't exist in
 * place-scale schema. This variant names the place-scale fields and
 * says where tension lands when it does land.
 *
 * At place-scale most tension lives in two fields: who_frequents_here
 * (an NPC's backstory carries the bound-here feeling) and
 * hidden_detail (the physical residue). Sometimes it shows in
 * what_happens_here (a council under threat meets under tighter
 * guard). Atmospheric vignette and features rarely carry tension
 * directly — texture, not stakes, is their job.
 */
function buildPlaceTensionGuidanceBlock(tension) {
  if (!tension || !TENSION_DESCRIPTIONS[tension]) return '';
  return `CENTRAL TENSION: ${tension}
${TENSION_DESCRIPTIONS[tension]}

How this shapes a place-scale output:
- who_frequents_here is the primary carrier — an NPC's backstory binds them to this place because of the tension (the brother who fell here; the council that meets despite the threat). Backstory IS tension at this scale.
- hidden_detail often carries the tension's residue — the bloodstain, the embedded bullet, the chalk tally nobody admits keeping.
- what_happens_here picks up tension only when the activity itself is shaped by it (a council meeting under tighter guard; a market thinning each season).
- overview, where_it_sits, and features stay primarily about texture and orientation — they may glance at the tension but don't carry it.
- Express tension through structural arrangement and concrete detail, not by naming the tension keyword. A place at this scale is small; tension lands as one or two specific facts, not as an organizing principle for the whole field set.
`;
}

/**
 * Generate a place-scale setting overview. Place-scale = a single
 * small space (square, hall, tower, sacred grove, building room),
 * NOT a polity. Six prose fields total — atmospheric vignette, what
 * happens here, where it sits, features, who frequents here, hidden
 * detail — plus name / title / named_entities. No npc_list array;
 * NPCs live inside the who_frequents_here prose with backstory.
 *
 * The router in SettingGenerator.vue branches on setting.scale: when
 * scale === 'place', this prompt fires; otherwise settingOverviewPrompt
 * (top-level) or sublocationOverviewPrompt (sublocation) fires. The
 * inference call upstream decides the scale; see
 * infer-setting-dimensions.mjs for the ceiling logic.
 *
 * Accepts optional `parentName` / `parentLore`: place-scale settings
 * usually sit inside a parent (a piazza inside a city), and the
 * "where it sits" field benefits from being anchored to that parent
 * by name. Top-level place-scale generations omit parent context.
 *
 * @param {Object} args
 * @param {string} [args.type]
 * @param {Array<string>} [args.character]
 * @param {string} [args.register]
 * @param {string} [args.userName]
 * @param {string} [args.tension]
 * @param {Array<string>} [args.bannedTropes]
 * @param {string} [args.description]
 * @param {string} [args.lore]
 * @param {string} [args.parentName]
 * @param {string} [args.parentLore]
 * @param {Array<string>} [args.siblingSettings]
 * @param {Array<string>} [args.childrenSettings]
 */
export function placeOverviewPrompt(args = {}) {
  const constraints = buildSettingConstraints(args);
  const lorePreservation = buildLorePreservationBlock(
    [args.parentLore, args.lore].filter(Boolean).join('\n')
  );
  const siblingBlock = buildSiblingSettingsBlock(args.siblingSettings);
  const childrenBlock = buildChildrenSettingsBlock(args.childrenSettings);
  const tensionBlock = buildPlaceTensionGuidanceBlock(args.tension);
  const antiClusteringBlock = buildAntiClusteringBlock(args.bannedTropes);
  const parentName = args.parentName;
  const parentLine = parentName ? `${parentName.toUpperCase()}` : 'THE LARGER SETTING';

  return `Generate a PLACE-SCALE setting overview. This is a SMALL place — a piazza, a tower, a hall, a sacred grove, a single building — not a polity. The output is a concrete description of one space, not a worldbuilding write-up of a region. Every field is shorter and more sensory than polity-scale generation; the schema below is the entire output.

${constraints}

${parentName ? `PARENT SETTING: ${parentName}
PARENT SETTING LORE:
${args.parentLore || '(no additional parent lore)'}

` : ''}${lorePreservation}${siblingBlock ? '\n' + siblingBlock + '\n' : ''}${childrenBlock ? '\n' + childrenBlock + '\n' : ''}
${antiClusteringBlock}
${tensionBlock}
Return JSON with EXACTLY these fields. Temperature: 0.9. No extra fields, no commentary outside the JSON.

{
  "name": "The bare register-coherent place name only (e.g., 'Piazza dei Fonditori', 'the Long Shed', 'the Iron Grove'). What shows in sidebars and lists. No qualities, no type word, no article unless part of the name proper.",
  "title": "A short evocative phrase (3-5 words, max 6) that pairs with the name as a subtitle. STRUCTURE: a phrase, not a sentence — no 'where X does Y' clauses, no conjugated verbs. Usually '[Type] of [Poetic Phrase]' or 'the [Poetic Noun-Phrase]'. The phrase SUGGESTS the character qualities through imagery; it MUST NOT paste a character quality word as an adjective. GOOD: 'Piazza of the Cracked Cobbles' (suggests violent past). BAD: 'Bloodstained Piazza' (pastes a quality keyword).",
  "overview": "ATMOSPHERIC VIGNETTE — what a GM reads aloud when the party walks in. 2-3 short sentences. Sensory texture only: what one sees, smells, hears, feels at a moment. NO history. NO political structure. NO geographic positioning (that's where_it_sits). NO who-runs-it. Just the establishing shot — film-camera-on-tripod, not encyclopedia entry. Plain prose, no markdown markers.",
  "where_it_sits": "WHERE THIS PLACE SITS IN ${parentLine}. 1-2 sentences. Orientation: what part of the parent it occupies (a quarter, a side of the hill, a street, an end of the building), what's adjacent, how a traveler reaches it. Concrete and spatial. Plain prose. ${parentName ? `Anchor to ${parentName} by name where natural.` : 'When no parent context is provided, describe the immediate surrounding terrain or settlement instead.'}",
  "features": "WHAT'S HERE — what fills the place physically. 2-3 sentences. Furnishings, fixtures, doors, windows, distinctive objects. Include a rough sense of size or dimensions ('a single chamber roughly fifteen paces across,' 'three connected rooms,' 'an open square the width of two cart-lengths,' 'a corridor narrow enough that two people abreast must turn sideways'). Concrete enough that a GM can describe the space without making it up on the spot. Plain prose.",
  "what_happens_here": "WHAT THIS PLACE IS FOR — the function. 2-3 sentences. The activity this place exists to host, on what cadence (daily, weekly, on full moons, on feast days). Fold in sustaining arrangements (who pays for upkeep, who guards the door, who's admitted) ONLY when they're load-bearing for play — a council hall mentions its guards because they'd block a sneaking PC; a baker's stall does not mention its lease because nobody at the table cares. Plain prose.",
  "who_frequents_here": "ONE OR TWO NAMED NPCs whose lives are bound to this place. 3-5 sentences of prose, ONE paragraph. For each NPC: name + brief role/manner + the BACKSTORY that ties THEM to THIS place specifically — the personal reason this place matters to them. Time-of-day appears ONLY when load-bearing for the NPC (sweeping at dusk because of what happened at dusk; unlocking at Vespers because that's when council meets). DO NOT parade demographics or list ambient crowds. ONE backstory-anchored person, or at most two — whichever fits this scale. Even a place that seems empty has someone: the abandoned cellar has the scavenger who comes for the copper pipes; the disused shrine has the old woman who lights a candle each Sunday. Plain prose. Register-coherent names.",
  "hidden_detail": "ONE small physical thing a perceptive person would notice — an old mark of past trouble, or a present-day oddity, or something subtly off. ONE sentence, maybe two if a brief why is needed. Examples: 'A dark stain on the third step, scrubbed but never gone, from a fistfight last winter.' 'An embedded musket-ball in the lintel, painted over but still bulging through the plaster.' 'A single floorboard in the western corner polished smoother than the others.' 'A chalk tally on the doorpost — nine marks, none of them recent — that nobody admits to keeping.' Keep it pointable-to: a detail a GM can drop into a perception check. Plain prose.",
  "named_entities": [
    "Example Person One",
    "Example Person Two"
  ],
  "//named_entities_note": "REPLACE the example entries above with the CHARACTER NAMES (people only) of every individual named in the prose fields above. Rules: (a) PEOPLE ONLY — anyone introduced by a personal name. (b) EXCLUDE places, regions, polities, factions, buildings, geographical features. (c) EXCLUDE titles of offices and role-words even when capitalized ('the warden,' 'the priest,' 'the sweeper'). When a person is introduced with name + title (e.g., 'Renzo the Sweeper'), include ONLY the personal-name part: 'Renzo.' (d) Match the prose VERBATIM, case-sensitive. (e) EXCLUDE deity names. (f) At place scale typically 1-2 entries, sometimes 3.",
  "npc_list": [
    {
      "name": "Same name as one of the named_entities — the named NPCs from who_frequents_here, structured for the NPCs tab",
      "description": "One sentence summary of the NPC's role + the personal connection to this place. Recap from your who_frequents_here prose — don't introduce new facts."
    }
  ],
  "//npc_list_note": "1-2 entries, matching the 1-2 NPCs you named in who_frequents_here. Names must match the prose VERBATIM. Descriptions condense the NPC's role + their bound-to-this-place backstory into a single sentence (the NPCs tab uses these as standalone stubs). DO NOT include unnamed populations or scavengers — only named individuals."
}`;
}

/**
 * Shape-only validator for placeOverviewPrompt responses. Required
 * fields present and of the right type; content quality (atmosphere,
 * NPC backstory depth, hidden-detail concreteness) is verified by
 * manual production review per the project test convention.
 *
 * Field set matches the place-scale schema:
 *   - 8 required strings (name, title + 6 content fields)
 *   - named_entities array of strings
 *
 * Notably absent from the place schema (and so NOT required here):
 * history, current_ruler_sentence, social_history, economic_history,
 * military_history, notable_*_facets, central_dynamic,
 * responses_in_motion, present_state, npc_list. Those are polity-
 * scale concerns; place-scale routes through the trimmer 6-slot shape.
 */
export function validatePlaceOverviewResponse(jsonString) {
  let parsed;
  try {
    parsed = JSON.parse(jsonString);
  } catch (e) {
    return false;
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return false;

  const requiredStringFields = [
    'name', 'title', 'overview', 'where_it_sits',
    'features', 'what_happens_here', 'who_frequents_here', 'hidden_detail',
  ];
  for (const field of requiredStringFields) {
    if (typeof parsed[field] !== 'string' || !parsed[field].trim()) return false;
  }
  if (!Array.isArray(parsed.named_entities)) return false;
  if (!parsed.named_entities.every(n => typeof n === 'string')) return false;
  // npc_list is structurally optional (handler defaults to [] for
  // back-compat with responses pre-dating the place-scale npc_list
  // addition). When present it must be an array of {name, description}
  // objects so SettingGenerator can populate setting.npcs[] for the
  // NPCs tab. Same rule as polity-scale npc_list.
  if (parsed.npc_list !== undefined) {
    if (!Array.isArray(parsed.npc_list)) return false;
    for (const npc of parsed.npc_list) {
      if (!npc || typeof npc !== 'object') return false;
      if (typeof npc.name !== 'string' || !npc.name.trim()) return false;
      if (typeof npc.description !== 'string') return false;
    }
  }
  return true;
}

/**
 * Landscape-scale tension guidance. Like the place-scale variant, but
 * the load-bearing fields are different — at landscape scale, tension
 * lives primarily in what_lives_here (the embattled fauna, the
 * haunted dead, the recovering ecosystem), travel_and_hazards (the
 * danger character), and hidden_detail (the residue of past events).
 * Extent and where_it_sits stay primarily spatial; the vignette is
 * tension-tinged atmosphere but rarely the primary carrier.
 */
function buildLandscapeTensionGuidanceBlock(tension) {
  if (!tension || !TENSION_DESCRIPTIONS[tension]) return '';
  return `CENTRAL TENSION: ${tension}
${TENSION_DESCRIPTIONS[tension]}

How this shapes a landscape-scale output:
- what_lives_here is a primary carrier — the populations (people, fauna, spirits) that inhabit this landscape register the tension through what they're doing now (a hermit cult thinning under siege; the wolves grown bold after a hard winter; the dead unsettled by recent disturbance).
- travel_and_hazards carries tension as concrete danger character — what makes this landscape dangerous right now, not just always.
- hidden_detail carries tension as physical residue (a forgotten cairn at the pass; a half-buried sword catching morning light).
- extent and where_it_sits stay primarily spatial — what this landscape covers and where it sits. They may glance at the tension but don't carry it.
- overview is atmospheric — tension may shade its mood, but the vignette is texture, not stakes.
- Express tension through structural arrangement and concrete detail, not by naming the tension keyword. Landscape settings are wider than places; tension lands as one or two specific conditions, not as an organizing principle for the whole field set.
`;
}

/**
 * Generate a landscape-scale setting overview. Landscape-scale = a
 * geographic feature or bounded historical site: mountain range,
 * river system, forest, desert, plains, archipelago, coastline,
 * battlefield, ghost-shore, ruin-field. Sits between polity-scale
 * (no governance, no named NPC list) and place-scale (not a single
 * standable space).
 *
 * Six prose fields total — atmospheric vignette, extent, where it
 * sits, what lives here, travel and hazards, hidden detail — plus
 * name / title / named_entities. No npc_list array; populations and
 * the occasional named individual live inside what_lives_here prose.
 *
 * The router in SettingGenerator.vue branches on setting.scale: when
 * scale === 'landscape', this prompt fires. The inference call upstream
 * decides scale; see infer-setting-dimensions.mjs.
 *
 * Accepts optional `parentName` / `parentLore`: most landscape
 * settings sit inside a parent (a mountain range inside a region, a
 * battlefield within a kingdom), and where_it_sits benefits from
 * being anchored to that parent by name.
 *
 * @param {Object} args
 * @param {string} [args.type]
 * @param {Array<string>} [args.character]
 * @param {string} [args.register]
 * @param {string} [args.userName]
 * @param {string} [args.tension]
 * @param {Array<string>} [args.bannedTropes]
 * @param {string} [args.description]
 * @param {string} [args.lore]
 * @param {string} [args.parentName]
 * @param {string} [args.parentLore]
 * @param {Array<string>} [args.siblingSettings]
 * @param {Array<string>} [args.childrenSettings]
 */
export function landscapeOverviewPrompt(args = {}) {
  const constraints = buildSettingConstraints(args);
  const lorePreservation = buildLorePreservationBlock(
    [args.parentLore, args.lore].filter(Boolean).join('\n')
  );
  const siblingBlock = buildSiblingSettingsBlock(args.siblingSettings);
  const childrenBlock = buildChildrenSettingsBlock(args.childrenSettings);
  const tensionBlock = buildLandscapeTensionGuidanceBlock(args.tension);
  const antiClusteringBlock = buildAntiClusteringBlock(args.bannedTropes);
  const parentName = args.parentName;
  const parentLine = parentName ? `${parentName.toUpperCase()}` : 'THE LARGER REGION';

  return `Generate a LANDSCAPE-SCALE setting overview. This is a geographic feature or bounded historical site — a mountain range, river system, forest, desert, plains, archipelago, coastline, battlefield, ghost-shore, ruin-field. NOT a polity (no government, no economy at this register) and NOT a single standable space (it has extent and parts, not a "what's in this room"). The schema below is the entire output: six prose fields capture the landscape's character, extent, life, and hazards.

${constraints}

${parentName ? `PARENT SETTING: ${parentName}
PARENT SETTING LORE:
${args.parentLore || '(no additional parent lore)'}

` : ''}${lorePreservation}${siblingBlock ? '\n' + siblingBlock + '\n' : ''}${childrenBlock ? '\n' + childrenBlock + '\n' : ''}
${antiClusteringBlock}
${tensionBlock}
Return JSON with EXACTLY these fields. Temperature: 0.9. No extra fields, no commentary outside the JSON.

{
  "name": "The bare register-coherent name only (e.g., 'Stonemother', 'the Broken Gate', 'Storm-tooth Range', 'the Bone Coast'). No qualities, no type word. Article only if it's part of the name proper.",
  "title": "A short evocative phrase (3-5 words, max 6) that pairs with the name as a subtitle. STRUCTURE: a phrase, not a sentence — no 'where X does Y' clauses, no conjugated verbs. Usually '[Type] of [Poetic Phrase]' or 'the [Poetic Noun-Phrase]'. The phrase SUGGESTS the character qualities through imagery; it MUST NOT paste a character quality word as an adjective. GOOD: 'Range of the Singing Peaks' (suggests mythic-poetic); 'the Cracked Obsidian Field' (suggests battlefield). BAD: 'Haunted Battlefield' (pastes a quality keyword).",
  "overview": "ATMOSPHERIC VIGNETTE — what the GM reads when the party arrives at the edge or stands within. 2-3 short sentences. Sensory texture only: what one sees, smells, hears, feels at a moment. NO origin / history. NO travel routes. NO named landmarks (those live in extent). NO inhabitants (those live in what_lives_here). Just the establishing shot — film-camera-on-tripod, not encyclopedia entry. Plain prose, no markdown markers.",
  "extent": "WHAT THIS LANDSCAPE COVERS — bounds, scale, and named parts. 2-3 sentences. BUDGET: 4-5 NAMED ANCHORS TOTAL across geography AND inhabitants combined. The field is a GM-table reference, not a tour — every named anchor must do unique work. For geography (range, forest, river): a sense of scale, ONE named highest peak or central feature (not its twin), and 1-2 named passes / valleys / tributaries that orient a traveler. For bounded historical sites (battlefield, ruin-field): the footprint and the central landmark — do NOT enumerate every named segment. ONE INHABITED POINT WITH A PROPER NOUN: a register-coherent place name, not a category. A GM running this landscape needs a name to point the party toward for shelter, supplies, or someone to talk to — "a hamlet at the foot of the pass" is NOT enough; the hamlet must have a name. Category-only ("a single hermitage in a high valley," "a way-station at the southern edge") is a failure of this field. Give the inhabited point a real proper noun in the register, and a one-clause function (what travelers come there for). Two inhabited points are allowed ONLY when they serve clearly different functions (e.g., a named hamlet AND a named hermitage); each still needs its own proper noun. NEVER name three or more settlements — one stands for the type. Genuinely uninhabited landscapes (recent battlefield, deep waste, open sea) can omit settlements entirely. Concrete and spatial. Plain prose. Every named anchor earns its mention.",
  "where_it_sits": "WHERE THIS LANDSCAPE SITS IN ${parentLine}. 1-2 sentences. Orientation: what regions, polities, or other landscapes border it; what roads or rivers connect to it; how a traveler from the parent reaches its edge. Plain prose. ${parentName ? `Anchor to ${parentName} by name where natural.` : 'When no parent context is provided, describe the immediate surrounding regions or polities instead.'}",
  "what_lives_here": "WHAT INHABITS THIS LANDSCAPE. 2-4 sentences. Populations: flora, fauna, beasts, monsters, isolated communities, scavengers, ghosts — whatever class of inhabitant fits the type and tension. Usually described as types or groups rather than named individuals, since landscape scale doesn't have the daily-frequenter intimacy of place scale. ONE named individual is fine when load-bearing (the hermit who keeps the high cairn; the mad watcher of the Broken Gate); more than one starts to feel like polity-NPCs. For uninhabited landscapes (a recent battlefield, a desert waste), name what scavenges or haunts the place. Plain prose. Register-coherent names.",
  "travel_and_hazards": "HOW ONE MOVES THROUGH + WHAT MAKES IT DANGEROUS. 2-3 sentences. Roads, trails, seasonal access (a pass that opens only in summer; a coast walkable only at low tide). Concrete hazards — physical (snowblind passes, sinking ground, riptide) AND atmospheric / supernatural (lingering magic, restless dead, the wyrm in its lair). Frame both routine travel and what specifically can kill an unprepared party. Plain prose.",
  "hidden_detail": "ONE small physical thing a perceptive person would notice — an old marker, a present-day oddity, a small physical residue of a past event. ONE sentence, maybe two if a brief why is needed. Examples: 'A weathered cairn at the south pass, three stones taller than a man, marking where the last clan-king fell.' 'A half-buried sword in the obsidian, its edge still catching the morning light.' 'A single tree at the center of the burn-field that still puts out green leaves, despite the salt the besiegers spread.' Keep it pointable-to: a detail a GM can drop into a perception check. Plain prose.",
  "named_entities": [
    "Example Person One",
    "Example Person Two"
  ],
  "//named_entities_note": "REPLACE the example entries above with the CHARACTER NAMES (people only) of every individual named in the prose fields above. Rules: (a) PEOPLE ONLY — anyone introduced by a personal name. (b) EXCLUDE places, regions, polities, factions, buildings, geographical features. (c) EXCLUDE titles of offices and role-words even when capitalized ('the hermit,' 'the watcher,' 'the warden'). When a person is introduced with name + title, include ONLY the personal-name part. (d) Match the prose VERBATIM, case-sensitive. (e) EXCLUDE deity names. (f) At landscape scale typically 0-2 entries — many landscapes have no named individuals at all, and that's fine. Return an empty array when no people are named.",
  "npc_list": [
    {
      "name": "Same name as one of the named_entities — the named individual(s) you put in what_lives_here",
      "description": "One sentence summary of the NPC's role + their connection to this landscape. Condense from your what_lives_here prose — don't introduce new facts."
    }
  ],
  "//npc_list_note": "0-2 entries — many landscapes have no named individuals (just populations like 'bears and ice-wolves'), in which case return an empty array. When the prose names a hermit, watcher, or other specific person tied to this landscape, structure them here for the NPCs tab. Names must match the prose VERBATIM. DO NOT include unnamed populations or species — only named individuals."
}`;
}

/**
 * Shape-only validator for landscapeOverviewPrompt responses. Required
 * fields present and of the right type; content quality is verified
 * by manual production review per the project test convention.
 *
 * Field set matches the landscape-scale schema:
 *   - 8 required strings (name, title + 6 content fields)
 *   - named_entities array of strings (empty array allowed — many
 *     landscapes have no named individuals)
 */
export function validateLandscapeOverviewResponse(jsonString) {
  let parsed;
  try {
    parsed = JSON.parse(jsonString);
  } catch (e) {
    return false;
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return false;

  const requiredStringFields = [
    'name', 'title', 'overview', 'extent',
    'where_it_sits', 'what_lives_here', 'travel_and_hazards', 'hidden_detail',
  ];
  for (const field of requiredStringFields) {
    if (typeof parsed[field] !== 'string' || !parsed[field].trim()) return false;
  }
  if (!Array.isArray(parsed.named_entities)) return false;
  if (!parsed.named_entities.every(n => typeof n === 'string')) return false;
  // npc_list is structurally optional. Empty array is the common case
  // at landscape scale (many landscapes have no named individuals).
  // When present, must be an array of {name, description} objects.
  if (parsed.npc_list !== undefined) {
    if (!Array.isArray(parsed.npc_list)) return false;
    for (const npc of parsed.npc_list) {
      if (!npc || typeof npc !== 'object') return false;
      if (typeof npc.name !== 'string' || !npc.name.trim()) return false;
      if (typeof npc.description !== 'string') return false;
    }
  }
  return true;
}

// subLocationsPrompt was deleted along with the bulk "Generate
// Important Locations" UI entry point. Sublocations now come through
// the Related Places extraction (auto from prose) or the manual
// add-place form (user-typed name + kind + description), both of
// which feed onPromoteRelatedPlace and produce a single, fully-formed
// sub-setting per click — never a batch of stubs to whittle down.
