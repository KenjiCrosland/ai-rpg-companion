import { buildPoolPromptBlock } from '@/shared/pool-prompt.mjs';
import { buildCatchallPromptBlock } from '@/shared/catchall-prompt.mjs';
import { buildCharacterWhitelistBlock } from '@/shared/character-whitelist-prompt.mjs';
import { buildLanguageRegisterRestrictionBlock } from '@/shared/language-register-restriction.mjs';
import { WESTERN_FANTASY_BOUND_RACES } from '@/shared/select-register.mjs';
import { registerList } from '@/shared/register-list.mjs';
import { rotateRegisterExamples } from '@/shared/rotate-register-examples.mjs';

/** Probability that a relationships generation includes an outsider
 *  register. Mono-cultural relationships are realistic for most NPCs;
 *  occasional cross-cultural variety better reflects how social
 *  networks work in fantasy settings. 50% balances realism (mono-
 *  cultural is still the majority outcome) with variety (a measurable
 *  fraction of generations have an outsider). */
const OUTSIDER_PROBABILITY = 0.5;

/**
 * Allow-list of register prefixes that can serve as the outsider
 * register when the source NPC is in a WESTERN_FANTASY_BOUND_RACES
 * context. Mirrors the allow-list from the LANGUAGE REGISTER
 * RESTRICTION prompt block — picking a non-Western outsider would
 * contradict the same restriction that gates the source's own naming.
 *
 * Non-Western registers (Yoruba / Maori / Andean / etc.) are
 * already excluded from `registerList` when `enableProtectedRegisters`
 * is off, so this filter is mostly a future-proofing layer for when
 * the flag flips on.
 */
const WESTERN_BOUND_OUTSIDER_PREFIXES = [
  'Latin-inspired', 'Greek-inspired',
  'Old-Slavic-inspired', 'Slavic-inspired', 'Russian-inspired',
  'Romanian-inspired', 'Hungarian-inspired', 'Finnish-inspired',
  'Norse-inspired', 'Old-Norse-inspired',
  'Anglo-Saxon-inspired', 'Old-High-German-inspired',
  'Middle-High-German-inspired', 'Gothic-inspired', 'Germanic-inspired',
  'Celtic-inspired', 'Welsh-inspired', 'Middle-Welsh-inspired',
  'Old-Irish-inspired', 'Irish-inspired', 'Old-Occitan-inspired',
  'Italian-Renaissance-inspired',
  'Elven', 'Goblin-inspired', 'Orcish', 'Gnomish',
  'Draconic', 'Aberrant', 'Abyssal', 'Infernal', 'Primordial',
  'Technomagical',
];

/**
 * Roll for an outsider register for a relationships generation.
 *
 * 50% of generations return null (mono-cultural relationships — the
 * source register applies to all three relationship targets). The
 * remaining 50% pick uniformly from a candidate pool of registers
 * other than the source.
 *
 * Candidate pool:
 *   - All entries in `registerList` whose prefix differs from the
 *     source register's prefix.
 *   - For WESTERN_FANTASY_BOUND_RACES sources, additionally filtered
 *     to the European + fictional-fantasy allow-list so the outsider
 *     doesn't contradict the LANGUAGE REGISTER RESTRICTION the source
 *     is operating under.
 *
 * Selection is uniform random within the candidate pool. No affinity
 * tables, no archetype assignment — DeepSeek determines a narratively
 * coherent role for the outsider from the source NPC's context.
 *
 * @param {Object} args
 * @param {string|null} args.sourceRegister — the primary register.
 * @param {string|null} args.fantasyRace — race signal from source-NPC
 *                                         resolution (drives WESTERN_
 *                                         FANTASY_BOUND_RACES filter).
 * @param {number} [args.gateRoll] — injected randomness for the 50/50
 *                                   gate. Defaults to Math.random().
 * @param {number} [args.indexRoll] — injected randomness for picking
 *                                    within the candidate pool.
 *                                    Defaults to Math.random().
 * @returns {string|null} an outsider register, or null when the gate
 *                        skips or no candidates remain.
 */
export function pickOutsiderRegister({
  sourceRegister,
  fantasyRace = null,
  gateRoll = Math.random(),
  indexRoll = Math.random(),
} = {}) {
  if (gateRoll >= OUTSIDER_PROBABILITY) return null;

  const sourcePrefix = typeof sourceRegister === 'string'
    ? sourceRegister.split(':')[0].trim()
    : null;

  let candidates = registerList.filter(r => {
    const prefix = r.split(':')[0].trim();
    return prefix !== sourcePrefix;
  });

  if (WESTERN_FANTASY_BOUND_RACES.includes(fantasyRace)) {
    candidates = candidates.filter(r =>
      WESTERN_BOUND_OUTSIDER_PREFIXES.some(allowed => r.startsWith(allowed)),
    );
  }

  if (candidates.length === 0) return null;
  return candidates[Math.floor(indexRoll * candidates.length)];
}

/**
 * Compose the cultural-engagement prompt blocks for an NPC generation.
 * Inputs come from NPCGenerator.vue's `selectRegister` +
 * `resolveFantasyRace` resolution at generation time.
 *
 * Layered structure:
 *   1. NAMING REGISTER baseline — always rendered when a register is
 *      supplied. Tells the LLM which register to use for the NPC's
 *      name and any names mentioned in the description / relationships.
 *      Without this line, Western-canonical registers (Latin / Norse /
 *      Elven / Slavic / …) reach the LLM as null information and
 *      the prompt's example placeholders are the only naming signal.
 *   2. Cultural-detection override — also always rendered, mirroring
 *      the item generator's LANGUAGE REGISTER OVERRIDE. Lets the LLM
 *      pivot to a register implied by the user's input when the input
 *      carries a strong cultural signal the pre-selection didn't catch.
 *   3. WESTERN_FANTASY_BOUND restriction — fires only for Orcish /
 *      Goblinoid / Dwarven / Gnomish / Elven contexts; revokes the
 *      override authority above for those races.
 *   4. Pool / catchall / whitelist — fire only for the registers they
 *      target (Yoruba/Andean pool, protected-tradition catchall, Maori
 *      whitelist, etc.).
 *
 * Returns an empty string when no register is supplied (legacy callers
 * that don't compute one — e.g., extra-description / dashboard flows).
 */
function buildRegisterBlocks({ register, fantasyRace, outsiderRegister = null }) {
  // Trust the orchestrator. When the orchestrator wants the register
  // block suppressed (non-fantasy user input, or user-named character
  // for the source NPC), it passes register=null. When it wants the
  // block, it passes a real register descriptor.
  //
  // Suppression decisions live in NPCGenerator.vue / generateNPCDescription
  // because they depend on signals (userName, seed, empty input) the
  // prompt builder doesn't have on its own.
  if (!register) return '';
  const isWesternFantasyRaceContext = WESTERN_FANTASY_BOUND_RACES.includes(fantasyRace);
  // Rotate the descriptor's "(e.g., …)" tail with fresh whitelist samples
  // for fictional palettes (Goblin-inspired, Orcish, Elven, Draconic,
  // Aberrant, Abyssal, Infernal, Primordial). Static tails on those
  // descriptors anchor DeepSeek's relationship-name selection onto the
  // same 3-4 names per generation; rotating breaks the anchor without
  // sacrificing phonological signal. Real-cultural registers without
  // whitelists pass through unchanged — their static examples are the
  // model.
  const rotatedRegister = rotateRegisterExamples(register);
  const rotatedOutsiderRegister = outsiderRegister
    ? rotateRegisterExamples(outsiderRegister)
    : null;
  const baselineRegisterLine = rotatedOutsiderRegister
    ? `NAMING REGISTER FOR THIS GENERATION:
- Source NPC and most relationships: ${rotatedRegister}
- One outsider relationship: ${rotatedOutsiderRegister}`
    : `NAMING REGISTER FOR THIS GENERATION: ${rotatedRegister}`;
  const baseline = `${baselineRegisterLine}

Use the source register for the NPC's own name and any locations / factions in the description. Names should sound like they belong to the same linguistic family. Do not mix registers within a single name. Do not default to default English-fantasy specifics if the register is something else.`;
  const overrideAuthority = `LANGUAGE REGISTER OVERRIDE (LLM AUTHORITY):

The pre-selected register above is a fallback. If the user's free-text input contains clear cultural-linguistic signals — proper names from a specific tradition (e.g., "Akiko" → Japanese, "Olaf" → Norse, "Inkari" → Andean), place names, deity names, or other markers — OVERRIDE the pre-selected register and use the tradition the user's input implies for ALL generated names. The user's signal is authoritative; the pre-selection is what to use when no cultural signal is detectable.`;
  const outsiderDirective = rotatedOutsiderRegister
    ? `RELATIONSHIPS — INCLUDE ONE OUTSIDER FROM A DIFFERENT CULTURE:

Two of the three relationship targets should be drawn from the source register's culture (their name in ${rotatedRegister}). One should be an outsider drawn from ${rotatedOutsiderRegister} — pick a narratively-coherent reason for them to be in this NPC's life (trade, debt, history, mentorship, exile, marriage, etc.) without falling on a stereotyped "exotic visitor" framing. The outsider's name comes from the outsider register; do not blend the two registers within a single character name.`
    : '';
  // Source whitelist: by-origin lookup wins when fantasyRace resolves
  // (Goblinoid/Orcish/Elven/Dwarven), by-register lookup catches the
  // random-fallback case where no race resolved (e.g., NPC generator
  // empty input rolling Goblin-inspired register).
  const sourceWhitelist = buildCharacterWhitelistBlock(fantasyRace, register);
  // Outsider whitelist: pass null origin so the lookup goes through
  // the register-prefix axis. Don't double-fire restriction or pool
  // blocks for the outsider — the source's blocks already constrain
  // the generation, and the outsider is a single relationship within
  // that constraint.
  const outsiderWhitelist = outsiderRegister
    ? buildCharacterWhitelistBlock(null, outsiderRegister)
    : '';
  // Tag the outsider whitelist so the LLM doesn't conflate the two
  // pools when both are present.
  const taggedOutsiderWhitelist = outsiderWhitelist
    ? `OUTSIDER ${outsiderWhitelist}`
    : '';
  const blocks = [
    baseline,
    overrideAuthority,
    buildLanguageRegisterRestrictionBlock({
      register,
      isWesternFantasyRaceContext,
      entityNoun: 'NPC',
    }),
    buildPoolPromptBlock(register),
    buildCatchallPromptBlock(register),
    sourceWhitelist,
    outsiderDirective,
    taggedOutsiderWhitelist,
  ].filter(Boolean);
  return `\n\n${blocks.join('\n\n')}\n`;
}

export function createNPCPrompt(param, {
  isCreatureProfile = false,
  register = null,
  fantasyRace = null,
} = {}) {
  // Use different key names for creature profiles to avoid person-priming
  if (isCreatureProfile) {
    return `CRITICAL: This is a CREATURE PROFILE, not an NPC. Use "it" pronouns only. Do not anthropomorphize.

Please create a creature profile for ${param} in the form of a JSON object. The JSON object should include the following keys: creature_title, creature_description, origin_and_circumstance, observable_behaviors, hidden_truth, encounter_description, and dm_guidance. Temperature: 0.9.
    {
        "format": "JSON",
        "instructions": {
            "note": "This is a CREATURE, not a person. Each key should flow into the next. Use transition words between them. NEVER use he/she/they pronouns — only 'it'. EXAMPLES USE BRACKETED PLACEHOLDERS (e.g., [DESCRIPTOR], [LOCATION], [ACTION]) to show STRUCTURE. Replace each placeholder with concrete content; do NOT output the placeholders themselves. Do not default to English-fantasy specifics — let the linguistic register guide naming and locality.",
            "creature_title": "The local name or title people use for this creature. Examples (placeholders show structure — fill with concrete content fitting the linguistic register): 'The [DESCRIPTOR] of [LOCATION]', 'Old [DESCRIPTOR]', 'The [INTENSE_QUALITY] [NOUN]', 'The [VAGUE_NOUN] in the [PLACE]'. This should sound like a local legend or nickname, NOT a person's given name.",
            "creature_description": "What the creature IS and what it does. Describe it as a THING, not a person with a job. Examples: 'A [PHYSICAL_FORM] of [MATERIAL] that [BEHAVIORAL_PATTERN] at [LOCATION], attacking anything that [TRIGGER_CONDITION].' NOT 'A skilled guardian stationed at the gates.' Focus on WHAT IT IS physically and WHAT IT DOES mechanically.",
            "origin_and_circumstance": "Origin and circumstance — who or what created, summoned, or brought it here? Why hasn't it been destroyed, moved, or contained? What keeps it in this location? Examples: '[ORIGIN_AGENT]'s failed [PROJECT] abandoned when [PRECIPITATING_EVENT], now territorial over [LOCATION] it cannot leave.' NOT 'It chose to stay because it loves the area.'",
            "observable_behaviors": "Observable behaviors ONLY. Patrol routes, damage marks, sounds it makes, how it reacts to different stimuli (fire, loud noises, movement, time of day). Examples: 'It [PHYSICAL_ALTERATION] any [SURFACE_OR_OBJECT_TYPE] it encounters, and [REACTION] when hearing [SPECIFIC_STIMULUS].' NOT 'It has a penchant for humming' or 'It pauses contemplatively.'",
            "hidden_truth": "A hidden truth about the creature that locals don't know. A vulnerability, a trigger, something about its origin, a way to control or disable it, or an unintended side effect of its existence. Examples: 'It will ignore anyone carrying [SPECIFIC_OBJECT] — a remnant of its original [SOURCE_OF_RULE].' NOT 'It secretly yearns for friendship' or 'It dreams of freedom.'",
            "encounter_description": "Describe the creature as a THING the party encounters. Emphasize sensory details — what they see, hear, smell, and feel as they approach. Frame it as a potential threat or wonder, not a character introduction. Do NOT use 'you meet' or 'you see [NAME] standing' — instead describe the creature in action or at rest. Example: 'The [SOUND] of [MATERIAL_ON_MATERIAL] echoes from [LOCATION] — a [PHYSICAL_FORM] of [COMPONENT_PARTS] suspended in a vaguely [SHAPE] frame, [ONGOING_ACTION] as it pivots in [MOVEMENT_QUALITY].'",
            "dm_guidance": "How a DM should RUN this creature at the table — movement patterns, aggression triggers, threat escalation, retreat behavior, environmental interaction. NOT dialogue advice. This creature does not speak. Examples: 'It attacks the first target that crosses within [DISTANCE] of [LOCATION_FEATURE]. If damaged below half health, it retreats to [DEFENSIVE_POSITION] and [DEFENSIVE_BEHAVIOR], creating [DEFENSIVE_EFFECT]. It ignores targets that [PASSIVE_CONDITION].' NOT 'Speak in a gravelly voice' or 'It will try to negotiate.'"
        }
    }`;
  }

  // Standard NPC prompt (existing)
  return `Please create an Tabletop Roleplaying NPC description for ${param} in the form of a JSON object using the given instructions and examples as guidelines. The JSON object should include the following keys: character_name, description_of_position, reason_for_being_there, distinctive_feature_or_mannerism, character_secret, read_aloud_description, and roleplaying_tips. Temperature: 0.9.${buildRegisterBlocks({ register, fantasyRace })}
    {
        "format": "JSON",
        "instructions": {
            "note": "Examples are separated by '&&' within each instruction. Also each key should flow into the next as though they are part of the same summary. Use transition words to improve the flow between them. EXAMPLES USE BRACKETED PLACEHOLDERS (e.g., [TITLE], [LOCATION], [PROFESSION]) — these show the STRUCTURE of a good answer. Replace each placeholder with concrete content that fits the linguistic register established elsewhere in this prompt; do NOT output the placeholders themselves. Do not default to default English-fantasy specifics or cyberpunk tropes — those are register choices, not example mandates.",
            "character_name": "The character's proper name ONLY — the noun phrase that identifies them as an individual. Typically 1-4 words. Do NOT include role, title-with-relation, em-dashes, parentheticals, or any descriptive phrasing — that content belongs in description_of_position. Acceptable shapes: a single given name; a given name with a brief locative ([Name] of the [Place]); a title-plus-name ([Title] [Name]). NOT acceptable: '[Name] — [Description]' (the part after the dash is description, not name; use just '[Name]'). If the source text already provides a name, use it verbatim with no additions. Choose the name so it fits the linguistic register established elsewhere in this prompt; do not default to default English-fantasy names.",
            "description_of_position": "Provide a specific and detailed description of their job or position in society, including a detail that sets them apart from others in that position. Examples (placeholders show structure — fill with concrete details that fit the linguistic register, NOT the placeholders themselves): && npc_name is the [HIGH_TITLE] of [POLITY], and they also happen to [SURPRISING_PERSONAL_TRAIT]. && npc_name grew up [UNUSUAL_FORMATIVE_EXPERIENCE] while their peers were [TYPICAL_PEER_ACTIVITY] — so it's not surprising they became one of the best-known [PROFESSION] in [PLACE]. && npc_name is the [BIRTH_ORDER] (and [DESCRIPTOR_FOR_NEGLECT]) child of the preeminent [FAMILY_NAME] family, they aspire to [GRAND_GOAL], but [COMPLICATION_FROM_FAMILY]. && npc_name is a consummate liar, but at least half of their stories about [PAST_PROFESSION_OR_ROLE] are in fact true (if [QUALIFYING_HEDGE]).",
            "reason_for_being_there": "Provide a reason for why they happen to be where they are that aligns with their goals and aspirations. If no location is provided for this NPC please generate one. If it is obvious why they are there (because they are the proprietor or owner, etc) then give a reason for why they have decided to continue to be there. Examples: && Recently npc_name has been [VISIBLE_BEHAVIOR_THAT_DRAWS_ATTENTION] at [LOCATION] for days now hoping [DESIRED_OUTCOME], and [SOCIAL_FRICTION_FROM_THE_BEHAVIOR]. && For the last few weeks, npc_name has been [ACTIVITY] in [REMOTE_OR_NICHE_LOCATION], hoping to [PROXIMATE_GOAL] so that they can ultimately [LONGER_GOAL]. && Recently, [PRECIPITATING_EVENT] left npc_name [CURRENT_STATE], and they have been [COPING_ACTIVITY] at [LOCATION] ever since.",
            "distinctive_feature_or_mannerism": "Provide a distinctive feature or peculiar mannerism observable in their actions. Examples: && [PHYSICAL_OBSERVATION_TIED_TO_RECENT_EXERTION], and they have [VOCAL_OR_SPEECH_DETAIL]. && npc_name absentmindedly [HABITUAL_ACTION_WITH_AN_OBJECT_THEY_CARRY], occasionally [VERBAL_TIC] as they [MICRO_ADJUSTMENT_OR_INSPECTION]. && npc_name is easy to pick out from a crowd because they often [DISTINCTIVE_GESTURE] as they [SPEECH_OR_PERFORMANCE_BEHAVIOR], punctuating with [INCIDENTAL_ACTION].",
            "character_secret": "Provide a secret or hidden motivation that the character has that they are keeping from others. Examples: && npc_name secretly hopes that by [SECRET_PURSUIT], they will [DEEP_PRIVATE_GOAL]. && Although npc_name keeps a [SURFACE_DEMEANOR], they are actually [HIDDEN_PREDICAMENT] involving [ANTAGONIST] who wants [ANTAGONIST_GOAL].",
            "read_aloud_description": "Provide a concise 2-3 sentence description that provides evocative character details. This is meant for a GM to read aloud to players when they meet this character.",
            "roleplaying_tips": "Provide 1-2 sentences of roleplaying tips for this NPC. Examples: && When roleplaying npc_name, [VOCAL_QUALITY_AND_TIC]. Pepper their speech with [CHARACTERISTIC_PHRASE_OR_PLATITUDE_THAT_FITS_THEIR_VOICE]. && When roleplaying npc_name, [SPEECH_REGISTER_OR_ACCENT_DESCRIPTION] and use [DOMAIN_JARGON] drawn from their trade or background. Substitute their own slang for everyday concepts (e.g., '[THEIR_TERM]' for [COMMON_CONCEPT])."
        }
    }`;
}

export function createRelationshipAndTipsPrompt(param, {
  isCreatureProfile = false,
  register = null,
  fantasyRace = null,
  outsiderRegister = undefined,
} = {}) {
  // Roll an outsider register internally if the caller didn't supply
  // one. Per-prompt-build decision: the source register applies to all
  // three relationships ~50% of the time; the other ~50% adds one
  // cross-cultural relationship. Caller can override (passing null
  // forces mono-cultural; passing a register forces that outsider —
  // useful for tests).
  const resolvedOutsiderRegister = outsiderRegister === undefined && !isCreatureProfile
    ? pickOutsiderRegister({ sourceRegister: register, fantasyRace })
    : (outsiderRegister || null);
  // Branch based on whether this is a creature profile or standard NPC
  if (isCreatureProfile) {
    return `Please create descriptions of ASSOCIATED FIGURES for the creature described by the following JSON object:

    ${param}

    CRITICAL RULES:
    - These are NOT interpersonal relationships. This creature does not have friendships, romantic interests, or emotional bonds.
    - These are PEOPLE OR CREATURES who have encountered, been affected by, or interact with this creature in observable ways.
    - Focus on what locals DO in response to this creature, NOT what they feel.
    - Describe observable interactions, not emotional connections.

    Please respond in JSON Format with the following key: relationships.

    For each associated figure, provide 2 sentences:

    EXAMPLES BELOW USE BRACKETED PLACEHOLDERS (e.g., [PROFESSION], [LOCATION], [ACTION]) for any specific noun the linguistic register would shape — fill them with concrete content that fits, do NOT output the placeholders themselves, and do not default to English-fantasy specifics.

    SENTENCE 1 — How this person/creature interacts with or has been affected by the creature:
    Examples:
    - person_name_1 the [PROFESSION] [REGULAR_INTERACTION] at [TIME], maintaining a pattern that began when the creature [PROTECTIVE_ACT_TOWARD_PERSON] during [PAST_EVENT] [TIME_AGO].
    - person_name_2 has been [TRACKING_OR_STUDY_BEHAVIOR] for [DURATION], [CONCRETE_METHOD] to test whether it can be [CONDITIONED_OUTCOME].
    - person_name_3 [AVOIDANCE_BEHAVIOR] every [INTERVAL] to avoid [LOCATION_WHERE_CREATURE_NESTS], and warns newcomers to do the same with [WARNING_METHOD].
    - person_name_4 discovered that it recoils from [SPECIFIC_STIMULUS], and now [RITUAL_USE_OF_STIMULUS] at [INTERVAL] as a ward against intrusion.

    SENTENCE 2 — A recent observable event or change in their interaction:
    Examples:
    - Last [TIME_INTERVAL] it appeared at [PLACE] late at night when person_name_1 [DEVIATION_FROM_PATTERN], [DAMAGE_OR_ALTERATION_LEFT] but leaving before dawn.
    - Three [TIME_INTERVALS] ago it followed one of person_name_2's [SUBORDINATES] [DISTANCE] beyond its usual territory, then [DEPARTURE_BEHAVIOR_AT_BOUNDARY] — the first time it has been seen [BOUNDARY_BREAK].
    - Yesterday person_name_3 saw it [CARRYING_BEHAVIOR] into [LOCATION] — [DESCRIPTION_OF_BURDEN] — and has [REACTION] since.
    - [TIME_AGO] the creature [UNEXPECTED_BEHAVIOR_DURING_RITUAL] despite [WARDING_PRACTICE], [PASSIVE_PRESENCE] for [DURATION], then [DEPARTURE_BEHAVIOR] without attacking — person_name_4 has not [RITUAL_PRACTICE] since.

    DO NOT INCLUDE:
    - Emotional bonds ("they became friends", "she loves it", "he trusts it")
    - Dialogue or communication between the person and creature
    - The creature having preferences for specific people
    - People understanding the creature's intentions or feelings

    DO INCLUDE:
    - Observable actions and responses
    - Patterns of behavior (feeding, avoidance, tracking)
    - Consequences and effects on the local area
    - Practical adaptations people have made
    - Recent changes that create tension or questions

    {
        "format": "JSON",
        "relationships": {
            "person_name_1": "Description (see format above). This should be a single string without brackets",
            "person_name_2":  "Description (see format above). This should be a single string without brackets",
            "person_name_3": "Description (see format above). This should be a single string without brackets"
        }
    }

    Please replace "person_name" with actual names. Use proper nouns for individuals, not titles. Be sure that the relationships object has child keys with the names of each person associated with this creature.
    `;
  }

  // Standard NPC relationship prompt (existing)
  return `Please create description of relationships for an NPC described by the following JSON object:

    ${param}${buildRegisterBlocks({ register, fantasyRace, outsiderRegister: resolvedOutsiderRegister })}

    Please respond in JSON Format with the following key: relationships. When describing relationships please mention one meaningful event that occurred between the npc and the character they have a relationship with.

    CRITICAL OUTPUT SHAPE (read carefully):
    - The top-level object has exactly one key, "relationships".
    - The value of "relationships" is a flat object with EXACTLY THREE keys.
    - Each KEY is the proper-name of a SEPARATE CHARACTER who has a relationship with the source NPC. Each key is a DIFFERENT person — NOT the source NPC's own name, NOT a relationship type, NOT a title.
    - Each VALUE is a single plain-string description. Values are strings ONLY — never objects, never arrays, never nested structures.
    - Do NOT wrap the three relationships inside an outer object keyed by the source NPC's name. The source NPC's name MUST NOT appear as a key anywhere in "relationships".

    WRONG SHAPE — do not produce this:
    {
      "relationships": {
        "[SourceNPCName]": {
          "[RelationshipTarget1]": "description...",
          "[RelationshipTarget2]": "description...",
          "[RelationshipTarget3]": "description..."
        }
      }
    }
    (The outer "[SourceNPCName]" key is wrong; relationships must NOT be nested under the source NPC.)

    CORRECT SHAPE — produce this:
    {
      "relationships": {
        "[RelationshipTarget1]": "Rich multi-sentence description string...",
        "[RelationshipTarget2]": "Rich multi-sentence description string...",
        "[RelationshipTarget3]": "Rich multi-sentence description string..."
      }
    }

    EXAMPLES BELOW USE BRACKETED PLACEHOLDERS (e.g., [PROFESSION], [LOCATION], [OBJECT]) to show the STRUCTURE of a good answer. Replace each placeholder with concrete content that fits the linguistic register the NPC is being generated in. Do NOT output the placeholders themselves, and do not default to default English-fantasy specifics or cyberpunk tropes.

    In the example sentences below, "source_npc" refers to the NPC whose relationships you are describing (the one in the JSON object above). "target_name" refers to the OTHER character — this is the person whose name appears as the KEY in the "relationships" object.

    LENGTH AND CONCRETENESS:
    Each description is 2-3 sentences of dense, specific prose — not a clipped summary. The best descriptions read like a paragraph from a session-prep doc: they ground the relationship in concrete material, observable behaviors, and a recent specific event that a DM can use at the table.

    Each description MUST include AT LEAST:
    - One named or vividly-specified object, place, frequency, or quantity tied to the source NPC's setting (a sack of silver, twice a year, the boundary-stones, a cart of wire and nails, the spice merchant's stall) — not just an abstract noun like "a gift" or "a place".
    - One observable behavior or scene that shows the relationship in action (reading letters aloud before burning them, slipping a parchment into a lute case, haggling over broken ploughshares) — not an emotional summary like "they trust each other".
    - One recent moment introduced by a specific timing word (last market-day, yesterday, three nights ago, since last winter, this season) carrying a concrete detail that creates table-usable tension or opportunity.

    THIN — avoid this register of writing:
    "target_name and source_npc met at a feast and have had a complicated relationship since. Recently target_name has been distant and source_npc is worried."
    "target_name was source_npc's friend before exile and now they barely speak. They saw each other in the market last week."
    (Vague nouns, no objects, no scene, no concrete recent detail.)

    RICH — target this register of writing:
    "target_name is a [SPECIFIC_OCCUPATION] who passes through [PLACE_FROM_SOURCE_NPC_SETTING] [FREQUENCY] with [CART/PACK/CARGO_DESCRIBED_WITH_MATERIAL_SPECIFICS]. They first met when target_name [CONCRETE_INCITING_ACTION_WITH_OBJECT], and source_npc [SPECIFIC_RESPONSE_WITH_OBJECT]; now they [PRESENT_PATTERN_WITH_OBSERVABLE_BEHAVIOR_AND_OBJECTS]. [TIMING_WORD], target_name [SPECIFIC_RECENT_GESTURE_WITH_OBJECT_AND_QUOTED_PHRASE_OR_OBSERVABLE_DETAIL], and source_npc [ALTERED_STATE_OR_BEHAVIOR_SINCE]."

    Sentence-1 starters (nature of the relationship, how they met, how it has evolved). Show a scene; do not summarize:
    target_name is a celebrated [PROFESSION] whose work is sought by [PATRON_TYPE]. source_npc met them while [INCIDENTAL_FIRST_MEETING_WITH_OBJECT_OR_PLACE], and despite [CONFLICTING_FEELING], [EMOTIONAL_OUTCOME_RENDERED_AS_OBSERVABLE_BEHAVIOR].
    Aside from [HOBBY_OR_CRAFT], source_npc's [RELATIONSHIP_TYPE] target_name has been the greatest joy of their life. However, target_name has been [WORRYING_BEHAVIOR_AT_NAMED_LOCATION] which is causing source_npc to [SPECIFIC_OBSERVABLE_REACTION].
    source_npc's [FAMILY_RELATION] target_name seems to be the only one in the family who remembers source_npc's name. They often come to [NAMED_LOCATION] to check in on source_npc, [SPECIFIC_GESTURE_OR_OBJECT_BROUGHT], worried that they might [FEARED_ACTION].

    Sentence-2 / 3 starters (recent specific event, show don't tell):
    Recently, source_npc [BOLD_ACTION_WITH_OBJECT] toward target_name, to which they responded with [AMBIGUOUS_RESPONSE_WITH_PHYSICAL_DETAIL], and the [UNCERTAINTY] is driving source_npc to [SPECIFIC_BEHAVIORAL_CONSEQUENCE].
    Last [SPECIFIC_TIME_INTERVAL], target_name [SECRET_REGULAR_ACTIVITY_AT_NAMED_LOCATION_WITH_OBJECT] in the hopes that [DESIRED_OUTCOME].
    [TIMING_WORD], target_name slipped [SPECIFIC_OBJECT_WITH_MATERIAL_DETAIL] into source_npc's [POSSESSION] — [OBSERVABLE_DETAIL_OR_QUOTED_PHRASE] — and source_npc has [ALTERED_STATE_SINCE].

    Schema example with placeholder keys to make the shape explicit:
    {
        "format": "JSON",
        "relationships": {
            "target_name_1": "Rich 2-3 sentence description with concrete specifics (see LENGTH AND CONCRETENESS above). This MUST be a single string, not an object.",
            "target_name_2": "Rich 2-3 sentence description with concrete specifics (see LENGTH AND CONCRETENESS above). This MUST be a single string, not an object.",
            "target_name_3": "Rich 2-3 sentence description with concrete specifics (see LENGTH AND CONCRETENESS above). This MUST be a single string, not an object."
        }
    }
    Replace "target_name_1", "target_name_2", "target_name_3" with the actual proper names of three DIFFERENT characters who have relationships with the source NPC. Use proper nouns for individuals, not titles or roles. The source NPC's own name must NOT appear as a key.
    `;
}

export function generateSingleRelationshipPrompt(npcDescription, relationshipName, relationshipShortDescription) {
  return `
You are creating a compelling NPC relationship for a tabletop RPG. This relationship must be SPECIFIC, DRAMATIC, and immediately usable at the game table.

=== THE NPC WHO NEEDS THIS RELATIONSHIP ===
${npcDescription}

=== THE RELATIONSHIP TARGET ===
Name: ${relationshipName}
Description: ${relationshipShortDescription}

CRITICAL REQUIREMENTS:
1. Make this relationship DRAMATIC and SPECIFIC - avoid generic descriptions
2. Include a CONCRETE EVENT that happened between them - not vague history
3. The relationship should create roleplaying opportunities and potential conflicts
4. Use the NPC's personality, role, or secrets to inform the dynamic
5. Create tension or opportunity that a DM can USE at the table

FORMAT (exactly 2 sentences):

SENTENCE 1: Describe HOW they met or how the relationship formed through a SPECIFIC EVENT. Include:
- A concrete scene or moment (not "they've known each other for years")
- The nature of their connection (ally, rival, complicated history, etc.)
- A detail that makes it memorable and unique

SENTENCE 2: Describe a RECENT DEVELOPMENT that creates tension or opportunity:
- Something that happened in the last few weeks/days
- A change in their dynamic, a betrayal, a favor owed, new information revealed
- Something that a DM can USE at the table to create drama
- Show, don't tell - use specific details, not emotional adjectives

EXAMPLES (placeholders show structure — fill with concrete content that fits the linguistic register the NPC was generated in; do NOT output the placeholders themselves, and do not default to European-court / English-fantasy specifics):

✓ GOOD STRUCTURE: "${relationshipName} discovered them [INCRIMINATING_ACT_RELATED_TO_NPC_ROLE] [TIME_AGO], and rather than [EXPECTED_RESPONSE], demanded [LEVERAGE_OR_FAVOR] — they have been [STRAINED_INTERACTION_PATTERN] ever since, but the [OBLIGATION] remains."

✓ GOOD STRUCTURE: "They saved ${relationshipName}'s life during [CONCRETE_EVENT_SPECIFIC_TO_SETTING], taking [SACRIFICE_DETAIL] meant for [INTENDED_VICTIM], but ${relationshipName} saw them [SUSPICIOUS_AFTER_ACTION] afterward and now carries that [KIND_OF_KNOWLEDGE] in silence."

✗ BAD: "They have a complicated history together and sometimes argue about their different approaches to handling [GENERIC_TOPIC]." (Vague, no concrete event, no setting-specific detail.)

✗ BAD: "${relationshipName} is an old friend who they trust completely and rely on for emotional support during difficult times." (No tension, no concrete event, no roleplaying hook.)

FORBIDDEN NAMES (do not use): Seraphina, Alistair, Kael, Elara, Thalia, Blackthorn, Nightshade, Lyra, Varian, Selene, Lyria, Isolde, Morgana, Raven, Thorne

Return ONLY valid JSON:
{
  "name": "${relationshipName}",
  "relationship": "Two sentences as specified above"
}
`;
}
