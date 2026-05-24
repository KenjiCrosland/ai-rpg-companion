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
 * Output shape: { type, character, register, userName, tension, scale }
 *
 *   scale — 'polity' | 'place' | 'landscape'. Determined by what
 *     this setting CONTAINS (the single-rule architecture replacing
 *     an earlier headcount / footprint / deflated-sections stack):
 *     'place' = a single bounded location that contains nothing
 *       inside it that could itself be a sub-location (one room,
 *       one structure, one spring, one square, one chamber). May
 *       sit INSIDE a larger polity whose customs cluster around it;
 *       those customs belong in `what_happens_here`, not in deflated
 *       polity slots.
 *     'landscape' = geographic features or bounded historical sites
 *       (mountain range, river, forest, desert, battlefield) that
 *       span distances with named parts but no single center to
 *       stand in. Inhabited by populations (fauna, scavengers,
 *       hermits, ghosts) rather than a named ruler.
 *     'polity' = CONTAINS multiple distinct places (a region
 *       contains cities, a hamlet contains its hearths + its spring
 *       + its road, a monastery-complex contains chapter house +
 *       dormitory + scriptorium). Default for most inhabited
 *       settings. Code overrides to 'polity' for a small set of
 *       types unambiguously too large to be either place- or
 *       landscape-scale (region, kingdom, empire, plane). The
 *       router in SettingGenerator.vue picks the right prompt based
 *       on this field.
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
  // Scale is OPTIONAL at the validator level. Older inference calls
  // pre-dating the place-scale split returned no scale field; the
  // resolver below defaults missing/invalid scale to 'polity' so
  // pre-existing call sites continue to work without breakage. Only
  // reject explicit non-string non-null values (numbers, objects).
  const hasScale = parsed.scale === undefined
    || parsed.scale === null
    || typeof parsed.scale === 'string';
  return hasType && hasCharacter && hasRegister && hasUserName && hasScale;
}

/**
 * Types whose scale CANNOT be place regardless of description. The
 * LLM's scale judgment is overridden to 'polity' when the picked type
 * matches one of these — small wayside shrine in a "kingdom"
 * description should never route place-scale because the type label
 * itself rules it out.
 *
 * Kept deliberately small (the four types that are unambiguously too
 * large): the goal is to catch a bad-day LLM call on obvious cases,
 * not to enumerate every polity type. Most types stay LLM-judged
 * since "small monastery vs grand monastery" can only be resolved by
 * the description.
 *
 * Match is case-insensitive on the trimmed type string.
 */
const ALWAYS_POLITY_TYPES = new Set(['region', 'kingdom', 'empire', 'plane']);

/**
 * Normalize the LLM's scale field to one of 'polity' | 'place' |
 * 'landscape'. Applies the ALWAYS_POLITY_TYPES ceiling, defaults to
 * 'polity' on missing / invalid input. Exported for direct testing.
 *
 * The ceiling only forces 'polity' — it doesn't have a 'no-landscape'
 * twin because landscape is a contextual judgment (a "kingdom" of
 * unsettled hills could be landscape-shaped narratively, but the
 * ceiling overrides any LLM that called it landscape). The narrow
 * effect: the four ceiling types ALWAYS go polity, everything else
 * defers to the LLM's pick among the three scales.
 *
 * @param {unknown} rawScale - LLM-provided scale, or null/undefined
 * @param {unknown} rawType - LLM-provided type, used for the ceiling
 * @returns {'polity' | 'place' | 'landscape'}
 */
export function resolveScale(rawScale, rawType) {
  const typeStr = typeof rawType === 'string' ? rawType.trim().toLowerCase() : '';
  if (typeStr && ALWAYS_POLITY_TYPES.has(typeStr)) return 'polity';
  const scaleStr = typeof rawScale === 'string' ? rawScale.trim().toLowerCase() : '';
  if (scaleStr === 'place') return 'place';
  if (scaleStr === 'landscape') return 'landscape';
  return 'polity';
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

1. "type": The setting type. The value MUST be one of the following options. Pick the type that matches WHAT THIS SETTING IS — its own identity, not surrounding context. "A spring that the hamlet gathers around" is a spring, not a hamlet. "A tower on the cliff above the village" is a tower, not a village. The hamlet / village in those phrasings are surrounding context the setting sits INSIDE; the type matches the entity being introduced, not the context noun. If the description names a feature with no perfect entry in the list, pick the closest match by what the entity IS (a sacred spring → "elemental-spring" or "shrine"; a market square → "ritual-precinct" or whatever fits best) — do NOT fall back to a context-noun match just because that word is in the list. When no signal exists at all, pick from the pool with a preference for variety (avoid leaning on the same option across many generations).

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

5. "scale": The size class — "polity", "place", or "landscape" — determined by what this setting CONTAINS.

   - "polity" = CONTAINS multiple distinct places. A region contains cities. A city contains districts. A hamlet contains its hearths, its shared well, the path to the pass. A monastery-complex contains a chapter house, dormitory, scriptorium, refectory. People LIVE across these places and govern themselves.

   - "place" = is a SINGLE bounded location — one room, one structure, one spring, one square, one chamber, one cell. It may sit INSIDE a larger polity whose customs cluster around it; those customs belong in what_happens_here, not in deflated polity slots. The defining question is structural, not social: a sacred grove with daily rituals is still ONE space.

   - "landscape" = extends across miles or a battlefield-sized footprint with named parts but no single center to stand in. Inhabited by populations (fauna, scavengers, hermits, ghosts) rather than a named ruler.

   THE CONTAINMENT TEST (single decision rule):
     Ask: "could this setting plausibly be a sub-location OF something else, with nothing inside it that could itself be a sub-location?"
     - If yes → place.
     - If it CONTAINS multiple distinct sub-locations → polity.
     - If it spans distances and contains no center → landscape.

   Worked examples (the rule applied):
   - "the central spring of a hamlet" → contained by the hamlet, contains nothing → place
   - "a wind-scoured watch-post, one stone house with three keepers" → contained by the mountain, contains nothing → place
   - "a hamlet of a dozen houses around a shared spring" → contains the spring, the hearths, the path to the pass → polity
   - "a mountain range with named peaks and dangerous passes" → spans distances, no center → landscape
   - "a monastery with chapter house, dormitory, library" → contains multiple buildings → polity
   - "a hermit's stone cell on the cliff" → contained by the cliff, contains nothing → place

   IMPORTANT: the type label can mislead — apply the test to the DESCRIPTION, not the type word. A "monastery" can be polity (full complex of distinct buildings) or place (a single cell on a cliff). A "village" of one family in one house is place. An "outpost" with a real garrison + inner/outer ward + storehouse is polity. The containment test is what decides.

Return ONLY valid JSON with the fields listed above. No prose before or after, no markdown code fences, no commentary.

Example outputs:
{"type": "kingdom", "character": ["ancient", "corrupt", "misty"], "register": "welsh", "userName": null, "scale": "polity"}    (input mentioned "Welsh-style settlement")
{"type": "treetop-village", "character": ["fey-touched", "forest-hidden", "twilit"], "register": "middle-welsh", "userName": null, "scale": "polity"}    (input was "Feywild treetop village with fey-pact warlock" — fey-canon maps to Celtic via middle-welsh)
{"type": "monastery", "character": ["scholarly", "mountainous", "fog-shrouded"], "register": "old-irish", "userName": "Glenmara", "scale": "polity"}    (Old Irish phonology evident in user-named "Glenmara"; monastery here is a full complex, polity-scale)
{"type": "shrine", "character": ["fey-touched", "forest-hidden", "twilit"], "register": "middle-welsh", "userName": null, "scale": "place"}    (input was "a single wayside shrine the fey have claimed" — small, one-room, place-scale)
{"type": "watch-outpost", "character": ["isolated", "monastic", "wind-scoured"], "register": "old-norse", "userName": "Korrin Outpost", "scale": "place"}    (input was "a small order of watch-keepers in a stone house on the mountain's spur" — one stone house, contains nothing inside; could itself be a sub-location of the mountain range; containment test → place)
{"type": "mountain-range", "character": ["ancient", "mountainous", "song-keeping"], "register": "old-norse", "userName": "Stonemother", "scale": "landscape"}    (input was "the Stonemother — a great range where the dwarven clans dig deep" — geographic feature, populations rather than rulers, landscape-scale)
{"type": "battlefield", "character": ["embattled", "haunted", "twice-burned"], "register": "old-norse", "userName": "the Broken Gate", "scale": "landscape"}    (input was "the Broken Gate, a battlefield where the siege-golems were unmade" — bounded historical site, ghosts and scavengers rather than residents, landscape-scale)
{"type": "port-city", "character": ["mercantile", "cosmopolitan", "sun-scorched"], "register": null, "userName": "Velrith", "scale": "polity"}    (user provided extensive lore with multiple invented proper nouns)
{"type": "kingdom", "character": ["ancient", "corrupt", "misty"], "register": "fantasy_unspecified", "userName": null, "scale": "polity"}    (input was "a flourishing kingdom" — no canon reference, no invented proper nouns)
{"type": "ruined-city", "character": ["fallen", "haunted", "twilit"], "register": null, "userName": null, "scale": "polity"}    (input was "a post-apocalyptic ruin" — non-fantasy genre)`;
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

  const emptyResult = { type: null, character: null, register: null, userName: null, tension: codePickedTension, scale: 'polity' };

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

  const resolvedScale = resolveScale(parsed.scale, resolvedType);

  return {
    type: resolvedType,
    character: resolvedCharacter,
    register: resolvedRegister,
    userName: resolvedUserName,
    tension: codePickedTension,
    scale: resolvedScale,
  };
}
