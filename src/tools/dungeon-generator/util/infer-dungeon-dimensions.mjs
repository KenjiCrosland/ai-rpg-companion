/**
 * infer-dungeon-dimensions.mjs
 *
 * Preliminary inference call for dungeon generation. Parallel to
 * `infer-setting-dimensions.mjs` — extracts dimensional constraints
 * from user input where specified, picks from variety pools for
 * unspecified dimensions, then the main generation call receives
 * fully-specified constraints rather than rolling on its own.
 *
 * Output shape: { type, character, register, userName, tension, difficulty }
 *
 *   type — one entry from DUNGEON_TYPES. The LLM picks based on user
 *     input or rolls from the pool when no signal exists. The pool is
 *     dungeon-specific (33 entries spanning burial / religious /
 *     knowledge / military / industrial / lairs / natural /
 *     architectural / wrecks / organic / liminal).
 *
 *   character — array of 3 strings, one from each of 3 DIFFERENT
 *     sub-dimensions of DUNGEON_CHARACTERS (reused from settings).
 *
 *   register — full humanoid-register descriptor (or null). Same
 *     register pool and resolution logic as settings — recognize-then-
 *     gate via the protected-flag mechanism in humanoidRegisterList.
 *
 *   userName — user-extracted dungeon name if present in input, or
 *     null. The main generation call uses this verbatim.
 *
 *   tension — one entry from DUNGEON_TENSIONS, code-picked uniformly.
 *     NOT extracted from the LLM response — same empirical lesson as
 *     settings (LLM clusters; code-random gives uniform distribution
 *     across the 15 shapes).
 *
 *   difficulty — integer 1-5. If the caller passed in a user-selected
 *     difficulty, that's honored via `resolveDifficulty`. Otherwise
 *     code-picked uniformly via `pickRandomDifficulty`. The tier is
 *     passed to the LLM as TYPE-selection guidance (so god-corpse
 *     doesn't surface at Tier 1) AND used as a fallback weighting
 *     when the LLM doesn't return a usable type.
 *
 * Path scoping: called for both the empty-input AND the user-input
 * paths. Seeded-from-item path (when that ships) will bypass this
 * inference and supply dimensions directly.
 *
 * Graceful degradation: any failure (network, validation, malformed
 * JSON) returns code-rolled defaults rather than throwing — the
 * caller's generation pipeline must keep moving even on a flaky
 * inference call.
 */

import { generateGptResponse } from '@/util/ai-client.mjs';
import { humanoidRegisterList } from '@/shared/register-list.mjs';
import { TOKEN_TO_REGISTER_PREFIX } from '@/tools/npc-generator/utils/infer-register-and-name.mjs';
import {
  DUNGEON_TYPES,
  DUNGEON_CHARACTERS,
  DUNGEON_CHARACTER_SUBDIMENSIONS,
  DUNGEON_CHARACTER_VALUE_TO_SUBDIMENSION,
  TIER_WEIGHTED_TYPES,
  DIFFICULTY_TIERS,
  generateCharacterCandidates,
  pickRandomTension,
  pickRandomDifficulty,
  pickWeightedDungeonType,
  resolveDifficulty,
} from './dungeon-dimensions.mjs';

const TOKENS = Object.keys(TOKEN_TO_REGISTER_PREFIX);

/**
 * Strip markdown code fences from a raw LLM response. Same pattern
 * used in setting / NPC inference — some providers wrap JSON in
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
 * time. Mirrors setting / NPC inference's shape-only approach.
 *
 * Exported for the spec.
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
 * Build the inference prompt. The character section has two variants
 * — candidate-based (empty input) or direct-selection (user input).
 * The type section always includes a tier hint so the LLM picks a
 * scale-appropriate type even when user input doesn't specify one.
 */
function buildPrompt({ description, lore, characterCandidates, tier }) {
  const safeDescription = (description || '').replace(/"/g, '\\"');
  const safeLore = (lore || '').replace(/"/g, '\\"');

  const subdimensionLines = DUNGEON_CHARACTER_SUBDIMENSIONS
    .map(key => `   ${key}: ${DUNGEON_CHARACTERS[key].join(', ')}`)
    .join('\n');

  const characterSection = characterCandidates
    ? buildCandidateBasedCharacterSection(characterCandidates, subdimensionLines)
    : buildDirectSelectionCharacterSection(subdimensionLines);

  const tierEntry = DIFFICULTY_TIERS[tier] || DIFFICULTY_TIERS[1];
  const softWeightedTypes = Object.keys(TIER_WEIGHTED_TYPES).join(', ');

  return `Analyze this dungeon generation request and extract dimensional constraints.

User input description: "${safeDescription}"
User input lore: "${safeLore}"

We have already chosen a difficulty tier for this dungeon: ${tierEntry.name}
Stake-scope at this tier: ${tierEntry.scopeOfStakes}

Return a JSON object with four fields:

1. "type": The dungeon type. The value MUST be one of the following options. Pick the type that matches WHAT THIS DUNGEON IS — its own identity, not surrounding context. "A tomb inside a mountain" is a tomb, not a mountain. "A cult-compound inside an abandoned fortress" is a cult-compound, not a fortress. The surrounding context informs framing but the type is the entity being introduced.

   ${DUNGEON_TYPES.join(', ')}

   TIER-AWARE TYPE SELECTION: the difficulty tier is fixed at ${tier}. Cosmic-scale types (${softWeightedTypes}) read best at Tier 3+ and should be reserved for those tiers unless the user input explicitly demands them. At Tier 1-2, prefer grounded types (tomb, crypt, mine, ruin, lair, sewer-maze, manor-cursed, brewery-ruin, fortress, prison, etc.). At Tier 5, the cosmic types come into their own. Match the type to the scope-of-stakes above. When no signal exists in the input, pick from the pool with a preference for variety (avoid leaning on the same option across many generations).

${characterSection}

3. "register": The linguistic register for the dungeon's naming. The value MUST be one of three things. Pick by working through the cases in order:

   (a) A specific token from this list, when the input contains an EXPLICIT cultural / linguistic signal OR a fantasy-canon setting with strong cultural roots:
       ${TOKENS.join(', ')}

       What COUNTS as an explicit cultural signal:
       - Real culture name ("Welsh-inspired ruin," "Yoruba burial site")
       - Named ethnicity ("Norse barrow," "Aztec ziggurat")
       - Real-world geographic anchor ("on the Russian steppe," "the Mesopotamian floodplain")
       - Culturally-distinct loanword used naturally ("the sultan's vault," "the daimyo's keep")
       - Register-specific occupation or institution ("the shaman-king's tomb," "the legionnaire's keep")
       - Real-world religious/legal system ("Shinto shrine ruins," "the caliphate's prison")

       FANTASY-CANON SETTINGS also count as signals:
       - Feywild / fey-court / sídhe → welsh, middle-welsh, or old-irish (Celtic fairy tradition)
       - Norse-flavored / draugr / jötnar / Yggdrasil → norse or old-norse
       - Greek mythological / titans-and-heroes → greek
       - Pharaonic / pyramid / ankh-and-djed → egyptian
       - Russian folkloric / leshy / rusalka → russian or old-slavic
       - Anglo-Saxon / wyrm-and-mead-hall / Beowulf-style → anglo-saxon
       Pick the closest matching register from the list above.

       What does NOT count as an explicit signal: vague ancient-civilization feel, generic medieval markers, classical-fantasy genre tropes, invented fantasy names that happen to phonologically resemble a real culture.

   (b) null in TWO cases:
       - Non-fantasy genre signal (cyberpunk, sci-fi, modern, historical-fiction).
       - Generic-fantasy input where the user has established their own naming convention via INVENTED proper nouns (place names, character names, faction names). When the user has already provided multiple invented proper nouns establishing a style, return null so the LLM extends the user's invented style freely. D&D race / class descriptors ("elf," "warlock," "ranger") do NOT count as established naming conventions.

   (c) The exact string "fantasy_unspecified" when the input describes generic fantasy WITHOUT case (a) and WITHOUT case (b) — no real-world cultural signal, no fantasy-canon reference, and no invented proper nouns establishing a user-owned naming style. Examples: "a dungeon with traps and treasure" (no names, no canon reference), "an ancient ruin in the mountains" (descriptive only). The orchestrator routes this to a random humanoid register from the variety pool.

4. "userName": The dungeon's specific name if the user provided one, or null if no name is given.
   - "a tomb called the Hollow Vault" → userName: "the Hollow Vault"
   - "Skyhold, the prison of the storm-king" → userName: "Skyhold"
   - "an ancient ruin in the mountains" → userName: null (only descriptive)

Return ONLY valid JSON with the fields listed above. No prose before or after, no markdown code fences, no commentary.

Example outputs:
{"type": "tomb", "character": ["ancient", "haunted", "moss-furred"], "register": "old-norse", "userName": "Eikheim Barrow", "scale-hint": "T1 grounded"}
{"type": "ziggurat", "character": ["scholarly", "ancient", "sun-scorched"], "register": "mesopotamian", "userName": null, "scale-hint": "T3 mid-tier"}
{"type": "god-corpse", "character": ["forgotten", "planar-bleeding", "silence-deep"], "register": "old-norse", "userName": null, "scale-hint": "T5 cosmic — appropriate"}
{"type": "manor-cursed", "character": ["fallen", "cobweb-veiled", "moonlit"], "register": "fantasy_unspecified", "userName": null, "scale-hint": "T1 grounded"}
{"type": "factory-ruin", "character": ["forgotten", "decaying", "kiln-acrid"], "register": null, "userName": "the Verlith Foundry", "scale-hint": "user-named, generic register"}`;
}

/**
 * Character section for the user-input branch.
 */
function buildDirectSelectionCharacterSection(subdimensionLines) {
  return `2. "character": Three character qualities describing the dungeon's facets. MUST be a JSON array of exactly 3 strings. Pick ONE value from each of 3 DIFFERENT sub-dimensions below — choose values that fit the user's description and the register you've selected. Do NOT pick three values from the same sub-dimension; the goal is multi-facet texture across distinct axes (e.g., temporal + mystical + atmospheric), not single-axis variation.

${subdimensionLines}

   Example output: ["ancient", "haunted", "moss-furred"] — temporal + mystical + atmospheric, three distinct sub-dimensions.`;
}

/**
 * Character section for the empty-input branch.
 */
function buildCandidateBasedCharacterSection(candidates, subdimensionLines) {
  const labeled = candidates
    .map((candidate, i) => {
      const label = String.fromCharCode(65 + i);
      const valuesWithSubdims = candidate
        .map(v => `${v} (${DUNGEON_CHARACTER_VALUE_TO_SUBDIMENSION[v] || '?'})`)
        .join(' + ');
      return `   Candidate ${label}: ${valuesWithSubdims}`;
    })
    .join('\n');

  return `2. "character": Three character-combination candidates have been generated for this dungeon. Each candidate is one value drawn from each of three different sub-dimensions. Pick the candidate whose values best match the cultural texture of the register you've selected — the candidate that would feel most coherent for a dungeon in that register.

${labeled}

   Return the chosen candidate as a JSON array of 3 strings (just the values, without sub-dimension labels).

   SWAP ESCAPE: If exactly ONE value in your chosen candidate clashes badly with the register or with the type you've selected, you may swap it for a different value from the SAME sub-dimension. The other two values stay fixed. Swap only when the clash is obvious.

   Full pool by sub-dimension (for swap reference only — do not freely pick three values from here, only swap a single value from the same sub-dimension as the one you're replacing):
${subdimensionLines}

   Example chosen-as-is output: ["ancient", "haunted", "moss-furred"]
   Example with one swap output: ["ancient", "cursed", "moss-furred"] (where the candidate was ["ancient", "haunted", "moss-furred"] and "haunted" was swapped for "cursed" from the same mystical sub-dimension)`;
}

/**
 * Western-medieval default register subset. Same rationale as
 * setting's inference: when the user provides input but no cultural
 * signal, default to a Western-medieval pool rather than the full
 * humanoid register list — production observation showed full-pool
 * defaults producing off-brand outputs (Egyptian register for a
 * "border keep" input).
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
 * register from the full variety pool to maximize cultural exposure
 * for browsing users.
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
 * Run the dungeon dimension inference call.
 *
 * @param {Object} args
 * @param {string} [args.description] — user's free-text dungeon description
 * @param {string} [args.lore] — user's pasted dungeon lore (optional)
 * @param {number|string|null} [args.difficulty] — user-selected difficulty (1-5), or null/undefined to roll
 * @param {() => number} [args.rng] — injectable randomness for deterministic testing
 * @returns {Promise<{type: string|null, character: string[]|null, register: string|null, userName: string|null, tension: string, difficulty: number}>}
 */
export async function inferDungeonDimensions({
  description = '',
  lore = '',
  difficulty = null,
  rng = Math.random,
} = {}) {
  const hasUserInput =
    (typeof description === 'string' && description.trim().length > 0)
    || (typeof lore === 'string' && lore.trim().length > 0);

  // Difficulty: caller-supplied first, then code-roll.
  const resolvedDifficulty = resolveDifficulty(difficulty) || pickRandomDifficulty(rng);

  // Tension: ALWAYS code-picked uniformly. Same empirical lesson as
  // setting's tension — LLM clusters, code-random doesn't.
  const tension = pickRandomTension(rng);

  // Character: candidate-based on empty input, direct-selection when
  // user provided context for the LLM to anchor to.
  const characterCandidates = hasUserInput
    ? null
    : generateCharacterCandidates(3, rng);

  const prompt = buildPrompt({
    description,
    lore,
    characterCandidates,
    tier: resolvedDifficulty,
  });

  // Default result: code-fall-throughs for every dimension. Returned
  // on LLM failure so the caller's pipeline keeps moving.
  const fallbackType = pickWeightedDungeonType(resolvedDifficulty, rng);
  const fallbackRegister = hasUserInput
    ? pickWesternDefaultRegister(rng)
    : resolveRegisterToken('fantasy_unspecified', rng);

  const emptyResult = {
    type: fallbackType,
    character: characterCandidates ? characterCandidates[0] : null,
    register: fallbackRegister,
    userName: null,
    tension,
    difficulty: resolvedDifficulty,
  };

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

  // Type: LLM pick if valid, else weighted fallback.
  const llmType = typeof parsed.type === 'string' && parsed.type.trim().length > 0
    ? parsed.type.trim()
    : null;
  const resolvedType = (llmType && DUNGEON_TYPES.includes(llmType))
    ? llmType
    : pickWeightedDungeonType(resolvedDifficulty, rng);

  // Character: LLM pick if valid array, else fall back to first
  // candidate (or null if no candidates were generated).
  const resolvedCharacter = Array.isArray(parsed.character) && parsed.character.length > 0
    ? parsed.character.filter(c => typeof c === 'string' && c.trim().length > 0).map(c => c.trim())
    : (characterCandidates ? characterCandidates[0] : null);

  // Register: same branching as setting's inference.
  let resolvedRegister;
  if (!hasUserInput) {
    // Empty input: force fantasy_unspecified path → full humanoid pool.
    resolvedRegister = resolveRegisterToken('fantasy_unspecified', rng);
  } else if (typeof parsed.register === 'string' && parsed.register.toLowerCase() === 'fantasy_unspecified') {
    // User-input with no specific cultural signal → Western-medieval default pool.
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
    tension,
    difficulty: resolvedDifficulty,
  };
}
