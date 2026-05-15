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
 *   subLocationsPrompt — generates a list of sub-location stubs
 *     within a parent setting. Each stub has name, setting_type,
 *     title, and brief description. Full dimensional inference
 *     happens later when the user expands a stub into a full
 *     sub-location via sublocationOverviewPrompt.
 *
 * All three prompts forbid the same list of overused NPC names —
 * see `FORBIDDEN_NPC_NAMES` below.
 */

import {
  CHARACTER_VALUE_TO_SUBDIMENSION,
  TENSION_DESCRIPTIONS,
} from '../utils/setting-dimensions.mjs';

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
  return `FANTASY TEXTURE REQUIREMENT:
This is a folkloric fantasy setting, not historical fiction. The setting MUST include at least one supernatural element that is LITERALLY TRUE in the world — a spirit, a creature, a magic-working, a folk-belief made real — drawn from the register's own mythological tradition (e.g., Slavic → leshy/rusalka/domovoi; Celtic → Tylwyth Teg/sídhe; Norse → jötnar/draugr; for other registers, use that culture's known folkloric tradition). The element should appear in at least one of: main_problem, history, recent_event_*, current_ruler_sentence, npc_list, or mystical detail.

Do NOT write historical fiction with fantasy names. The difference is that in THIS world the folk-magic actually works — the rusalka is in the river, the sídhe hill is dangerous to climb. The supernatural can be subtle but it MUST be present and real.
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

  return `SETTING TYPE: ${type || 'unspecified — pick a fitting type'}
CHARACTER QUALITIES: ${characterStr}
LINGUISTIC REGISTER: ${registerStr}
NAME: ${nameInstruction}${descriptionStr}${loreStr}

${fantasyTextureBlock}
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

  return `Generate a detailed setting overview using the following constraints. These are FULLY-SPECIFIED inputs from an upstream inference call — do not override or substitute them.

${constraints}

${framing}
Return JSON with the following fields. Temperature: 0.9. Keep sentences concise; avoid run-on prose.

{
  "name": "The bare register-coherent place name only (e.g., 'Valderia', 'Ashenmoor', 'Glenmara'). No articles, no qualities, no type — just the proper noun. This is what shows in sidebars and lists.",
  "title": "A short evocative phrase (3-5 words, max 6) that pairs with the name as a subtitle in the UI. STRUCTURE: a phrase, not a sentence or clause — NO 'where X does Y' constructions, NO verbs in conjugated form. Most should follow '[Type] of [Poetic Phrase]' (4-5 words) or 'the [Poetic Noun-Phrase]' (3-4 words) — these convey both the setting type AND the place's character. The phrase SUGGESTS the character qualities through concrete imagery — it MUST NOT use any character quality word as an adjective ('plague-stricken', 'ancient', 'ember-banked', 'duel-honored', 'coastal', etc. are FORBIDDEN). GOOD invented examples: 'Village of the Drawn Blade' (suggests duel-honored); 'City of Tolling Bells' (suggests plague-stricken); 'Republic of Banked Coals' (suggests ember-banked); 'Monastery of the Long Silence' (suggests ancient); 'the Codified March' (suggests legal/structured); 'Hold of the Iron Vigil' (suggests militant); 'the Lantern-Bound Quarter' (suggests insular). BAD — never generate: 'Duel-Honored Coastal Village' (pastes quality keywords); 'Village Where the Fjord-Edge Holds the Gavel' (sentence-clause structure, too long, 8 words). Keep it tight.",
  "overview": "A brief overview embodying the character qualities and reflecting current state.",
  "relation_to_larger_setting": "How this setting relates to a larger world. Provide a register-coherent name for the larger context if relevant.",
  "history": "A brief history including founding and significant recent events.",
  "current_ruler_sentence": "A sentence describing the current ruler — register-coherent name, position, recent action.",
  "social_history": "A brief social-structure history.",
  "notable_social_facet": "OPTIONAL. 1 sentence max about current social life. May be a routine that's holding, a gradual change, atmospheric texture, a notable absence, or a discrete development — whatever matches the central tension's character. Empty string is acceptable if nothing notable applies.",
  "economic_history": "A brief economic-structure history.",
  "notable_economic_facet": "OPTIONAL. 1 sentence max about current economic life. May be a steady arrangement, an ongoing project, an incremental shift, or a discrete development. Empty string is acceptable.",
  "military_history": "A brief military / security history.",
  "notable_security_facet": "OPTIONAL. 1 sentence max about the current security posture — militia, guard, levy, fortifications, or formal military arrangements. May be a routine, a holding pattern, an ongoing arrangement, or a discrete development. Empty string is acceptable.",
  "central_dynamic": "The central dynamic of the setting — how the central tension shapes daily life. A specific named scene, recurring pattern, or present condition that captures the tension. The character of this dynamic follows from the tension: a recovery-rebuilding setting's central_dynamic is the ongoing work of repair; an aspirational-striving setting's is the active pursuit of the goal; an ongoing-accommodation setting's is the daily negotiation of sustained difficulty; an open-secret setting's is the structure of willful inaction; an inheritance-burden setting's is the way the ancestral weight shapes present life; an imminent-crisis setting's is the approaching decision-point. Match the tension.",
  "responses_in_motion": "1-2 sentences on what is currently in motion in response to the central tension. The shape of these responses follows the tension: adaptations, institutional responses, ritual practices, long-term efforts, evolving accommodations, generational labor, or active interventions — whichever fits. Who's leading the effort, what trade-offs or obstacles.",
  "present_state": "Present state of the setting in the tension's terms. A recovery setting's present_state reads about whether repair is holding; an aspirational setting's about the state of the work; a cyclical setting's about position within the cycle; an imminent-crisis setting's about the approach of the break. Tie back to central_dynamic and responses_in_motion. Match the tension.",
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
  const antiClusteringBlock = buildAntiClusteringBlock(bannedTropes);

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

${fantasyTextureBlock}
GENERATION RULES:
- The three character qualities shape the sub-location's overall feel. Express each one through the mode noted below — NOT by repeating its literal word across every field. Texture comes from structure, events, and consequence.
- Each quality's literal keyword should appear sparingly (at most once or twice). For atmospheric qualities, the keyword appears at most ONCE — never make a sensory quality into the political, economic, or religious driver.

EXPRESSION MODES (for this sub-location's qualities):
${expressionModesBlock || '(no specific guidance — express the qualities coherently)'}

- Focus on THIS sub-location, not the parent. The parent context is for tone and relationship only.
- All proper nouns match the linguistic register.
- Avoid common fantasy tropes and cliches.
- Do NOT use these NPC names: ${FORBIDDEN_NPC_NAMES}.

${antiClusteringBlock}
${tensionBlock}
Return JSON with the same field structure as a top-level setting. Temperature: 0.9.

{
  "name": "The bare register-coherent place name only (e.g., 'Riverside', 'Ashen Watch', 'Hearthgate'). No articles or qualities — just the proper noun. Shows in sidebars.",
  "title": "A short evocative phrase (3-5 words, max 6) that pairs with the name as a subtitle. STRUCTURE: a phrase, not a sentence — NO 'where X does Y' clauses, NO conjugated verbs. Most should follow '[Type] of [Poetic Phrase]' or 'the [Poetic Noun-Phrase]'. The phrase SUGGESTS the character qualities through imagery — it MUST NOT use any character quality word as an adjective. GOOD invented examples: 'Quarter of the Singing Stones'; 'Watchtower of the Long Vigil'; 'the Smoke-Veiled District'; 'Foundry of the Banked Coals'. BAD: 'The Bell-Ringing Quarter of Estharic' (pastes quality keyword); 'Quarter Where Bells Wake the Dead and the Smoke Settles' (sentence-clause, too long).",
  "overview": "A brief overview embodying the character qualities and reflecting current state and relation to the parent",
  "relation_to_larger_setting": "How this sub-location relates to ${parentName || 'the parent setting'} specifically — geographic position, political role, economic function, or cultural significance.",
  "history": "A brief history specific to the sub-location, including how it became part of the parent setting",
  "current_ruler_sentence": "The local ruler or prominent individual of the sub-location (may be a vassal of the parent's ruler, or just a notable figure if the sub-location is too small for formal leadership). Use a register-coherent name.",
  "social_history": "Brief social history specific to this sub-location",
  "notable_social_facet": "OPTIONAL. 1 sentence max about current social life. May be a routine, gradual shift, atmospheric detail, or development. Empty string is acceptable.",
  "economic_history": "Brief economic role of this sub-location, especially its role within the parent setting's economy",
  "notable_economic_facet": "OPTIONAL. 1 sentence max about current economic life. May be a steady arrangement, ongoing project, or development. Empty string is acceptable.",
  "military_history": "Brief security history (for small sub-locations, this may be the local militia, guard, or informal posse)",
  "notable_security_facet": "OPTIONAL. 1 sentence max about the current security posture. May be a routine, ongoing arrangement, or development. Empty string is acceptable.",
  "central_dynamic": "The central dynamic of the sub-location — how the central tension shapes life here. Frame in the tension's terms — see the CENTRAL TENSION block above. Match the tension's character; do not impose a different framing.",
  "responses_in_motion": "1-2 sentences on what is currently in motion in response to the tension. The shape follows the tension: adaptations, institutional responses, ritual practices, long-term efforts, or active interventions — whichever fits.",
  "present_state": "Present state of the sub-location in the tension's terms.",
  "npc_list": [
    {
      "name": "Register-coherent NPC name",
      "description": "Role and personality within this sub-location"
    }
  ]
}`;
}

export function subLocationsPrompt({
  settingDescription,
  existingSubLocations,
  register,
} = {}) {
  const registerStr = register
    ? `\n\nLINGUISTIC REGISTER: ${register}\n\nAll sub-location names MUST match this register. Sub-locations are part of the parent setting and inherit its naming style.`
    : '\n\nNo specific register set; use the naming style established in the setting description.';

  const existingStr = existingSubLocations
    ? `\nExisting sub-locations to include and build on:\n${existingSubLocations}\n`
    : '';

  return `Below is a description of a setting:
${settingDescription || '(no description provided)'}
${existingStr}${registerStr}

Return a JSON array containing 5-6 sub-locations within this setting. If existing sub-locations are listed above, include them in the array and add fresh entries to round out the total to 5-6. Each sub-location's scale must be appropriately smaller than the parent setting:
- Parent 'country' → sub-locations are 'regions'
- Parent 'region' → sub-locations are 'cities' or 'towns'
- Parent 'city' → sub-locations are 'districts' or 'quarters'
- Parent 'building' → sub-locations are 'rooms' or 'wings'

All sub-locations must be CONTAINED within the parent setting — not neighboring settings. Avoid common fantasy tropes.

Temperature: 0.9.

[
  {
    "name": "Sub-location's bare name (register-coherent)",
    "setting_type": "The type of place this sub-location is (e.g., 'district', 'fortress', 'monastery', 'forest', 'quarter')",
    "title": "A short evocative phrase (3-5 words, max 6) that pairs with the name as a subtitle. STRUCTURE: a phrase, not a sentence — NO 'where X does Y' clauses, NO conjugated verbs. Most should follow '[Type] of [Poetic Phrase]' or 'the [Poetic Noun-Phrase]'. Suggest the place's character through concrete imagery; never paste quality keyword adjectives. GOOD invented examples: 'Quarter of the Singing Stones'; 'Watchtower of the Long Vigil'; 'the Smoke-Veiled District'. BAD: 'The Bell-Ringing Quarter of Estharic'; 'Ashen Watchtower of the Eastern Pass'.",
    "description": "Two sentences: first a general overview of the sub-location, second describing why it's important or notable."
  }
]`;
}
