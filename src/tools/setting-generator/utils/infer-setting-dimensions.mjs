/**
 * infer-setting-dimensions.mjs
 *
 * Preliminary inference call for setting generation. Parallel to
 * `infer-register-and-name.mjs` for NPCs — extracts dimensional
 * constraints from user input where specified, picks from variety
 * pools for unspecified dimensions, then the main generation call
 * receives fully-specified constraints rather than rolling on its own.
 *
 * The architectural pattern: dimensional variety controlled by code,
 * not by the LLM's distribution. Pool entries live in
 * `./setting-dimensions.mjs`; new dimensions or rebalancing happens
 * there with no prompt changes.
 *
 * Output shape: { type, character, register, userName, tension }
 *
 *   type — one entry from SETTING_TYPES (e.g., 'kingdom', 'monastery',
 *     'oasis-settlement'). The LLM picks based on user input or rolls
 *     from the pool when no signal exists.
 *
 *   character — array of 3 strings, one from each of 3 DIFFERENT
 *     sub-dimensions of SETTING_CHARACTERS. Sub-dimension keys
 *     (state/political/cultural/geographic/mystical/temporal/hidden/
 *     atmospheric) are taxonomy for selection guidance only — they
 *     do not surface in the response.
 *
 *   register — full registerList descriptor (e.g., 'Welsh-inspired:
 *     soft consonants (ll, dd, ch), vowel-rich, mythic-poetic
 *     register'), or null when the input implies non-fantasy genre /
 *     a register the protected-flag gates off. Recognize-then-gate
 *     behavior identical to NPC inference: classifier recognizes the
 *     cultural signal; the resolver's lookup in `humanoidRegisterList`
 *     decides whether to surface or null-out. When `parentRegister`
 *     is supplied (sublocation case), the caller overrides this field
 *     after inference returns.
 *
 *   userName — user-extracted setting name if present in input, or
 *     null. The main generation call uses this verbatim when
 *     populating place_name; otherwise it generates a register-
 *     coherent title from scratch.
 *
 *   tension — one entry from SETTING_TENSIONS, code-picked
 *     uniformly. NOT extracted from the LLM response — empirical
 *     production observation (~2026-05): LLM selection clustered
 *     ~6 of 7 generations on imminent-crisis even with explicit
 *     anti-default prompt directives. Tension is orthogonal to
 *     other dimensions, so the LLM's coherence-checking adds no
 *     value; code-random gives the uniform distribution we want.
 *     The picked tension feeds the main generation prompt's field-
 *     framing logic (see buildTensionGuidanceBlock in
 *     setting-prompts.mjs).
 *
 * Path scoping: called for the empty-input AND the user-input paths.
 * Seeded-from-item / seeded-from-NPC paths bypass this inference
 * entirely (seed supplies type/register/etc. directly).
 *
 * Graceful degradation: any failure (network, validation, malformed
 * JSON) returns `{ type: null, character: null, register: null,
 * userName: null }`. The caller falls back to defaults (random pool
 * pick or freeform main-call generation, depending on the strategy
 * chosen in the orchestrator).
 */

import { generateGptResponse } from '@/util/ai-client.mjs';
import { humanoidRegisterList } from '@/shared/register-list.mjs';
import { TOKEN_TO_REGISTER_PREFIX } from '@/tools/npc-generator/utils/infer-register-and-name.mjs';
import {
  SETTING_TYPES,
  SETTING_CHARACTERS,
  SETTING_CHARACTER_SUBDIMENSIONS,
  CHARACTER_VALUE_TO_SUBDIMENSION,
  generateCharacterCandidates,
  pickRandomTension,
} from './setting-dimensions.mjs';

const TOKENS = Object.keys(TOKEN_TO_REGISTER_PREFIX);

/**
 * Strip markdown code fences from a raw LLM response. Same pattern
 * as the NPC inference — DeepSeek occasionally wraps JSON in
 * ```json … ``` fences despite the prompt asking for raw JSON.
 */
function stripCodeFences(raw) {
  if (typeof raw !== 'string') return '';
  return raw
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();
}

/**
 * JSON-shape validator. Accepts any object whose four fields are of
 * the right TYPE; pool-membership validation happens at resolution
 * time. This matches the NPC inference's shape-only approach — the
 * prompt is the constraint, the validator catches malformed JSON.
 *
 * Exported for the spec; not application code.
 */
export function validateInferenceResponse(raw) {
  const cleaned = stripCodeFences(raw);
  if (!cleaned) return false;
  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    return false;
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return false;
  const hasType = parsed.type === null || typeof parsed.type === 'string';
  const hasCharacter =
    parsed.character === null
    || (Array.isArray(parsed.character) && parsed.character.every(c => typeof c === 'string'));
  const hasRegister = parsed.register === null || typeof parsed.register === 'string';
  const hasUserName = parsed.userName === null || typeof parsed.userName === 'string';
  return hasType && hasCharacter && hasRegister && hasUserName;
}

/**
 * Build the inference prompt. The character section has two
 * variants:
 *
 *   - User input present (`characterCandidates` is null): the LLM
 *     picks 3 values directly from the full pool, anchored to the
 *     user's input + the register it selects. The sub-dimension
 *     diversity rule applies.
 *
 *   - Empty input (`characterCandidates` is a 3-array of candidates):
 *     the LLM picks the candidate whose values best match the
 *     register's cultural texture. A single swap is permitted if
 *     one value clashes badly with the register or type; swaps draw
 *     from the same sub-dimension as the value being replaced.
 *
 * Type, register, and userName sections are constant across both
 * variants.
 */
function buildPrompt({ description, lore, characterCandidates }) {
  const safeDescription = (description || '').replace(/"/g, '\\"');
  const safeLore = (lore || '').replace(/"/g, '\\"');

  // Full sub-dimension pool listing — shown in both variants. In
  // the candidate-based variant it serves as the swap-escape
  // reference; in the user-input variant it's the direct selection
  // pool.
  const subdimensionLines = SETTING_CHARACTER_SUBDIMENSIONS
    .map(key => `   ${key}: ${SETTING_CHARACTERS[key].join(', ')}`)
    .join('\n');

  const characterSection = characterCandidates
    ? buildCandidateBasedCharacterSection(characterCandidates, subdimensionLines)
    : buildDirectSelectionCharacterSection(subdimensionLines);

  // Tension is ALWAYS code-picked uniformly from the pool. LLM
  // selection (even with explicit anti-default-to-crisis guidance)
  // empirically clustered ~6 of 7 generations on imminent-crisis;
  // the training-data bias toward "interesting fantasy setting =
  // crisis" overrides prompt-level corrections. Tension is largely
  // orthogonal to other dimensions, so the LLM's coherence-checking
  // adds no value here — code-random gives the uniform distribution
  // we want. The picked tension is passed forward to the main
  // generation prompt where it reshapes the field framings.

  return `Analyze this setting generation request and extract dimensional constraints.

User input description: "${safeDescription}"
User input lore: "${safeLore}"

Return a JSON object with four fields:

1. "type": The setting type. The value MUST be one of the following options. Pick the one that best fits the user input; when no signal exists, pick from the pool with a preference for variety (avoid leaning on the same option across many generations).

   ${SETTING_TYPES.join(', ')}

${characterSection}

3. "register": The linguistic register for the setting's naming. The value MUST be one of three things. Pick by working through the cases in order:

   (a) A specific token from this list, when the input contains an EXPLICIT cultural / linguistic signal OR a fantasy-canon setting with strong cultural roots:
       ${TOKENS.join(', ')}

       What COUNTS as an explicit cultural signal:
       - Real culture name ("Welsh village," "Yoruba diaspora")
       - Named ethnicity ("Norse settlers," "Hellenic colonists")
       - Real-world geographic anchor ("on the Russian steppe," "the Mesopotamian floodplain")
       - Culturally-distinct loanword used naturally ("the sultan," "the polis," "the daimyo")
       - Register-specific occupation or institution ("the legionnaire," "the shaman-king," "the caliph's diwan")
       - Real-world religious/legal system ("Shinto shrines," "the caliphate," "the polis")

       FANTASY-CANON SETTINGS also count as signals — these are fictional realms with strong literary / cultural roots that map to a register:
       - Feywild / fey-court / fey-pact / fairy realm / Tylwyth Teg / sídhe → welsh, middle-welsh, or old-irish (Celtic fairy tradition)
       - Norse-flavored realm / draugr / Vanir / jötnar / Yggdrasil → norse or old-norse
       - Greek mythological setting / pantheon-of-Olympus / titans-and-heroes → greek
       - Pharaonic / pyramid / ankh-and-djed setting → egyptian
       - Russian folkloric / leshy / rusalka / domovoi → russian or old-slavic
       - Anglo-Saxon / wyrm-and-mead-hall / Beowulf-style → anglo-saxon
       - Aztec / mexica / featherserpent → aztec (if in pool)
       Pick the closest matching register from the list above.

       What does NOT count as an explicit signal: vague ancient-civilization feel ("bronze, temples, exiles, necropolis"), generic medieval markers ("knights, castles, kingdom, abbey"), classical-fantasy genre tropes ("ancient ruins, temples on hills, founding exiles"), invented fantasy names that happen to phonologically resemble a real culture ("Velrith" is NOT a Mesopotamian signal; "Aelinwood" is NOT a Celtic signal). These are fantasy-genre defaults the LLM gravitates toward; do not promote them to cultural signals.

   (b) null in TWO cases:
       - Non-fantasy genre signal (cyberpunk, sci-fi, modern, historical-fiction).
       - Generic-fantasy input where the user has established their own naming convention via INVENTED proper nouns (place names like "Velrith" / "the Drowning Quarter," character names like "Lysette Sarvane," faction names like "House Tarn," festival names like "Bronzewater Festival"). When the user has already provided multiple invented proper nouns establishing a style, return null so the LLM extends the user's invented style freely without a register constraint imposed on top. NOTE: D&D race / class descriptors ("elf," "tiefling," "warlock," "ranger") are NOT proper nouns and do NOT count as established naming conventions for this case.

   (c) The exact string "fantasy_unspecified" when the input describes generic fantasy WITHOUT case (a) and WITHOUT case (b) — i.e., no real-world cultural signal, no fantasy-canon setting reference, and no invented proper nouns establishing a user-owned naming style. Examples: "a flourishing kingdom" (no names, no canon reference), "a haunted city in the mountains" (descriptive only). The orchestrator routes this to a random humanoid register from the variety pool. This is a normal, expected case — do not avoid it; pick it whenever (a) and (b) don't apply.

4. "userName": The setting's specific name if the user provided one, or null if no name is given.
   - "a town called Ashenmoor" → userName: "Ashenmoor"
   - "Valderia, a decadent republic" → userName: "Valderia"
   - "a haunted city in the mountains" → userName: null (only descriptive)

Return ONLY valid JSON with the fields listed above. No prose before or after, no markdown code fences, no commentary.

Example outputs:
{"type": "kingdom", "character": ["ancient", "corrupt", "misty"], "register": "welsh", "userName": null}    (input mentioned "Welsh-style settlement")
{"type": "treetop-village", "character": ["fey-touched", "forest-hidden", "twilit"], "register": "middle-welsh", "userName": null}    (input was "Feywild treetop village with fey-pact warlock" — fey-canon maps to Celtic via middle-welsh)
{"type": "monastery", "character": ["scholarly", "mountainous", "fog-shrouded"], "register": "old-irish", "userName": "Glenmara"}    (Old Irish phonology evident in user-named "Glenmara")
{"type": "port-city", "character": ["mercantile", "cosmopolitan", "sun-scorched"], "register": null, "userName": "Velrith"}    (user provided extensive lore with multiple invented proper nouns: "Velrith," "House Sarvane," "Drowning Quarter," "Bronzewater Festival" — null lets the LLM extend their established style without imposing a register)
{"type": "kingdom", "character": ["ancient", "corrupt", "misty"], "register": "fantasy_unspecified", "userName": null}    (input was "a flourishing kingdom" — no canon reference, no invented proper nouns; fantasy_unspecified routes to a random register)
{"type": "ruined-city", "character": ["fallen", "haunted", "twilit"], "register": null, "userName": null}    (input was "a post-apocalyptic ruin" — non-fantasy genre)`;
}

/**
 * Character section for the user-input branch: LLM picks 3 values
 * directly from the full pool, anchored to user input and register,
 * with the sub-dimension diversity rule.
 */
function buildDirectSelectionCharacterSection(subdimensionLines) {
  return `2. "character": Three character qualities describing the setting's facets. MUST be a JSON array of exactly 3 strings. Pick ONE value from each of 3 DIFFERENT sub-dimensions below — choose values that fit the user's description and the register you've selected. Do NOT pick three values from the same sub-dimension; the goal is multi-facet texture across distinct axes (e.g., temporal + political + atmospheric), not single-axis variation.

${subdimensionLines}

   Example output: ["ancient", "corrupt", "misty"] — temporal + political + atmospheric, three distinct sub-dimensions.`;
}

/**
 * Character section for the empty-input branch: three pre-generated
 * candidates with their sub-dimension labels; LLM picks the one
 * best matching the register, with a single-swap escape.
 */
function buildCandidateBasedCharacterSection(candidates, subdimensionLines) {
  const labeled = candidates
    .map((candidate, i) => {
      const label = String.fromCharCode(65 + i); // A, B, C, ...
      const valuesWithSubdims = candidate
        .map(v => `${v} (${CHARACTER_VALUE_TO_SUBDIMENSION[v] || '?'})`)
        .join(' + ');
      return `   Candidate ${label}: ${valuesWithSubdims}`;
    })
    .join('\n');

  return `2. "character": Three character-combination candidates have been generated for this setting. Each candidate is one value drawn from each of three different sub-dimensions. Pick the candidate whose values best match the cultural texture of the register you've selected — the candidate that would feel most coherent for a setting in that register.

${labeled}

   Return the chosen candidate as a JSON array of 3 strings (just the values, without sub-dimension labels).

   SWAP ESCAPE: If exactly ONE value in your chosen candidate clashes badly with the register or with the type you've selected, you may swap it for a different value from the SAME sub-dimension. The other two values stay fixed. Swap only when the clash is obvious; default to using the candidate as-is.

   Full pool by sub-dimension (for swap reference only — do not freely pick three values from here, only swap a single value from the same sub-dimension as the one you're replacing):
${subdimensionLines}

   Example chosen-as-is output: ["ancient", "corrupt", "misty"]
   Example with one swap output: ["ancient", "feudal", "misty"] (where the candidate was ["ancient", "corrupt", "misty"] and "corrupt" was swapped for "feudal" from the same political sub-dimension)`;
}

/**
 * Western-medieval default register subset. Used when the user has
 * provided input but no cultural signal — the absence of signal often
 * implies expectation (Western-medieval fantasy default) rather than
 * openness to anything. Production observation: routing such cases
 * to the full pool occasionally produced well-crafted but off-brand
 * outputs (e.g., "border town between two warring kingdoms" rolling
 * Egyptian register with sistrums and granite pylons — coherent but
 * not what the user expected).
 *
 * Empty-input generations still draw from the full humanoidRegisterList
 * so users browsing for variety see Yoruba, Lakota, Sanskrit, etc.
 * User-input-without-signal generations draw from this curated subset
 * — same variety principle, narrower pool that stays within Western
 * medieval expectations.
 *
 * The list covers British Isles, Germanic Europe, Scandinavia, and
 * the Romance/Latin world — registers that match the cros.land and
 * typical-TTRPG default aesthetic.
 */
const WESTERN_MEDIEVAL_DEFAULT_PREFIXES = [
  'Latin-inspired',
  'Italian-Renaissance-inspired',
  'Norse-inspired',
  'Old-Norse-inspired',
  'Gothic-inspired',
  'Anglo-Saxon-inspired',
  'Germanic-inspired',
  'Old-High-German-inspired',
  'Middle-High-German-inspired',
  'Celtic-inspired',
  'Welsh-inspired',
  'Middle-Welsh-inspired',
  'Irish-inspired',
  'Old-Irish-inspired',
  'Old-Occitan-inspired',
];

/**
 * Pick a random register from the Western-medieval default subset.
 * Filters humanoidRegisterList by the curated prefix list above. If
 * no entries match (unlikely — the prefixes are taken from the
 * canonical list), falls back to the full pool to avoid breaking the
 * generation.
 */
function pickWesternDefaultRegister(rng) {
  const pool = humanoidRegisterList.filter(register =>
    WESTERN_MEDIEVAL_DEFAULT_PREFIXES.some(prefix => register.startsWith(prefix))
  );
  if (pool.length === 0) {
    return humanoidRegisterList.length > 0
      ? humanoidRegisterList[Math.floor(rng() * humanoidRegisterList.length)]
      : null;
  }
  return pool[Math.floor(rng() * pool.length)];
}

/**
 * Resolve a classifier-style register token to a full
 * humanoidRegisterList descriptor, or null when the prefix is
 * filtered out (protected gate) / unrecognized.
 *
 * The `fantasy_unspecified` token routes here too — when called this
 * way (empty-input path), the resolver picks a random humanoid
 * register from the FULL variety pool to maximize cultural exposure
 * for browsing users. The orchestrator routes user-input cases
 * through `pickWesternDefaultRegister` instead (narrower pool, stays
 * within Western-medieval expectations).
 *
 * Differs from the NPC inference's resolver only in pool source —
 * settings draw from `humanoidRegisterList` (excludes thematic
 * cosmic-genre registers) rather than the full `registerList`.
 * The protected-register filter is inherited from registerList via
 * humanoidRegisterList's derivation.
 */
function resolveRegisterToken(token, rng = Math.random) {
  if (typeof token !== 'string') return null;
  const lowered = token.toLowerCase();
  if (lowered === 'fantasy_unspecified') {
    if (humanoidRegisterList.length === 0) return null;
    return humanoidRegisterList[Math.floor(rng() * humanoidRegisterList.length)];
  }
  if (!TOKENS.includes(lowered)) return null;
  const prefix = TOKEN_TO_REGISTER_PREFIX[lowered];
  return humanoidRegisterList.find(r => r.startsWith(prefix)) || null;
}

/**
 * Run the inference call.
 *
 * Character-selection mode is determined by user input presence:
 *
 *   - Description AND lore both empty → code generates 3 random
 *     character candidates from distinct sub-dimensions, prompt
 *     shows them, LLM picks the candidate best matching the
 *     register (single-swap escape allowed). This eliminates LLM
 *     training-data clustering when there's no user signal to
 *     anchor selection.
 *
 *   - Description OR lore present → no candidate generation. LLM
 *     picks 3 values directly from the full pool, anchored to the
 *     user's input and the register, with the sub-dimension
 *     diversity rule. User input is itself the anchor that prevents
 *     clustering.
 *
 * Seeded dimensions are handled by the CALLER, not by this module.
 * The caller can override any field of the inference output with a
 * seeded value (e.g., sublocation inherits parent's register, item
 * → setting cross-tool flow supplies character from the item's
 * thematic context).
 *
 * @param {Object} args
 * @param {string} [args.description] — user's free-text setting description
 * @param {string} [args.lore] — user's pasted setting lore (optional)
 * @param {() => number} [args.rng] — injectable randomness for the
 *   candidate generator; defaults to Math.random. Used for
 *   deterministic testing.
 * @returns {Promise<{type: string|null, character: string[]|null, register: string|null, userName: string|null, tension: string|null}>}
 */
export async function inferSettingDimensions({ description = '', lore = '', rng = Math.random } = {}) {
  const hasUserInput =
    (typeof description === 'string' && description.trim().length > 0)
    || (typeof lore === 'string' && lore.trim().length > 0);

  const characterCandidates = hasUserInput
    ? null
    : generateCharacterCandidates(3, rng);

  // Tension is ALWAYS code-picked uniformly. LLM selection (even
  // with explicit anti-default directives) empirically clustered
  // ~6 of 7 generations on imminent-crisis; the training-data bias
  // overrides prompt-level corrections. Tension is orthogonal to
  // other dimensions, so the LLM's coherence-checking adds no value
  // — code-random gives the uniform distribution we want.
  const codePickedTension = pickRandomTension(rng);

  const prompt = buildPrompt({ description, lore, characterCandidates });

  const emptyResult = { type: null, character: null, register: null, userName: null, tension: codePickedTension };

  let response;
  try {
    response = await generateGptResponse(prompt, validateInferenceResponse, 3);
  } catch (e) {
    return emptyResult;
  }

  let parsed;
  try {
    parsed = JSON.parse(stripCodeFences(response));
  } catch (e) {
    return emptyResult;
  }

  const resolvedType = typeof parsed.type === 'string' && parsed.type.trim().length > 0
    ? parsed.type.trim()
    : null;

  const resolvedCharacter = Array.isArray(parsed.character) && parsed.character.length > 0
    ? parsed.character.filter(c => typeof c === 'string' && c.trim().length > 0).map(c => c.trim())
    : null;

  // Register resolution branches on input presence and the LLM's pick:
  //
  //   - Empty input: force fantasy_unspecified → full humanoid pool
  //     random. Variety is the goal when users have no preference.
  //
  //   - User input with specific token: respect the LLM's mapping
  //     (e.g., "Welsh village" → welsh, "Feywild" → middle-welsh).
  //
  //   - User input with explicit null: respect it. The LLM picks null
  //     either for non-fantasy genres (cyberpunk, sci-fi, modern) or
  //     when the user has established their own invented naming
  //     convention that should be extended without a register imposed.
  //
  //   - User input with fantasy_unspecified: the LLM signaled "no
  //     cultural marker, generic fantasy." Production observation
  //     showed routing this to the full pool produced occasional
  //     off-brand picks (Egyptian for a "border town" input). Users
  //     who provided input but no signal usually expect a Western-
  //     medieval default. Restrict to that subset; still random for
  //     variety, but within expected aesthetic.
  let resolvedRegister;
  if (!hasUserInput) {
    resolvedRegister = resolveRegisterToken('fantasy_unspecified', rng);
  } else if (typeof parsed.register === 'string' && parsed.register.toLowerCase() === 'fantasy_unspecified') {
    resolvedRegister = pickWesternDefaultRegister(rng);
  } else {
    resolvedRegister = resolveRegisterToken(parsed.register, rng);
  }

  const resolvedUserName = typeof parsed.userName === 'string' && parsed.userName.trim().length > 0
    ? parsed.userName.trim()
    : null;

  return {
    type: resolvedType,
    character: resolvedCharacter,
    register: resolvedRegister,
    userName: resolvedUserName,
    tension: codePickedTension,
  };
}
