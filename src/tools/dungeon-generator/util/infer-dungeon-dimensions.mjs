/**
 * infer-dungeon-dimensions.mjs
 *
 * Preliminary inference call for dungeon generation. Parallel to
 * `infer-setting-dimensions.mjs` — extracts dimensional constraints
 * from user input where specified, picks from variety pools for
 * unspecified dimensions, then the main generation call receives
 * fully-specified constraints rather than rolling on its own.
 *
 * Output shape: { type, character, register, userName, tension, difficulty, powerStructure, organizingLogic, thirdParty, povFrame, placeType, nameTemplate, registerPool, driveType, formedNature, monsterPopulation }
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
 *     gate via the protected-flag mechanism in registerList.
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
 *   organizingLogic — array of length 1 or 2 of entries from
 *     ORGANIZING_LOGICS (or ['invent'] for the open slot). The
 *     structural "bones" of the place — what it was built or shaped
 *     for. LLM extracts from user input when present; code-rolls
 *     otherwise. Composite (length 2) for palimpsest places (a tomb
 *     repurposed as a base, an undercity grown into a creature warren).
 *
 *   powerStructure — one entry from POWER_STRUCTURES. Coupled to
 *     organizingLogic via mismatch bias (`pickHolderForOrganizingLogic`)
 *     so the "ancient place, new residents" default predominates and
 *     fusion (the thing that built the place still rules it) is the
 *     rare-deliberate path.
 *
 *   thirdParty — unified non-controlling outsider (replaces the old
 *     contender + contact split). Shape: `{ present: false }` or
 *     `{ present: true, type: 'adversary' | 'ally', kind }`. Adversary
 *     picks from CONTENDER_KINDS (19 entries); ally picks from
 *     CONTACT_KINDS (10 entries). Presence + type split are
 *     code-rolled, with driveType bumping presence and biasing toward
 *     adversary under acquisition-style drives (acquire_by_*).
 *     SUPPRESS rule flips adversary → ally under rival-coded tensions.
 *
 *   povFrame — one entry from POV_FRAMES, gated on holder + tension.
 *     Re-specs the overview field as a POV hook (a voice with bias and
 *     partial knowledge) rather than omniscient atmospheric prose.
 *     Couplings prevent obvious nonsense (no failed_negotiation with
 *      *     a hazard-only place; no survivor of a dormant-with-witness place).
 *
 *   placeType — the place-type noun for the dungeon's title (Sepulcher,
 *     Hold, Foundry, Warren, etc.), pre-rolled from the bucket gated on
 *     organizingLogic. Code-rolled because the LLM's genre prior pulls
 *     toward funerary vocabulary regardless of what was rolled. Null
 *     for the 'invent' open-slot organizingLogic (LLM picks free).
 *
 *   nameTemplate — the structural shape of the dungeon's title
 *     (A-F, see NAME_TEMPLATES). Code-rolled because the LLM defaults
 *     to one template after a few generations regardless of bias
 *     guidance in prose. Filtered to B/D/F (no register-noun) when
 *     register is null.
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
import { registerList } from '@/shared/register-list.mjs';
import { TOKEN_TO_REGISTER_PREFIX } from '@/tools/npc-generator/utils/infer-register-and-name.mjs';
import {
  DUNGEON_TYPES,
  DUNGEON_CHARACTERS,
  DUNGEON_CHARACTER_SUBDIMENSIONS,
  DUNGEON_CHARACTER_VALUE_TO_SUBDIMENSION,
  TIER_WEIGHTED_TYPES,
  DIFFICULTY_TIERS,
  ORGANIZING_LOGICS,
  generateCharacterCandidates,
  pickRandomTension,
  pickRandomDifficulty,
  pickRandomOrganizingLogic,
  pickRandomThirdParty,
  pickHolderForOrganizingLogic,
  pickRandomPovFrame,
  pickPlaceTypeForLogic,
  pickRandomNameTemplate,
  pickRegisterPoolSubset,
  pickRandomFormedNature,
  pickRandomDriveType,
  pickWeightedDungeonType,
  resolveDifficulty,
  rollMonsterPopulation,
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
  // organizingLogic is optional in the response — if absent the
  // resolver code-rolls. When present, accepts string OR array-of-strings.
  const hasOrganizingLogic =
    parsed.organizingLogic === undefined
    || parsed.organizingLogic === null
    || typeof parsed.organizingLogic === 'string'
    || (Array.isArray(parsed.organizingLogic) && parsed.organizingLogic.every(l => typeof l === 'string'));
  return hasType && hasCharacter && hasRegister && hasUserName && hasOrganizingLogic;
}

/**
 * Build the inference prompt. The character section has two variants
 * — candidate-based (empty input) or direct-selection (user input).
 * The type section always includes a tier hint so the LLM picks a
 * scale-appropriate type even when user input doesn't specify one.
 */
function buildPrompt({ description, lore, characterCandidates, tier, preRolledOrganizingLogic, preRolledHolder, preRolledTension }) {
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

1. "type": The dungeon's PHYSICAL FORM — gross shape, scale, and cosmological frame. NOT what it was built FOR (that's organizingLogic, field 5 below). NOT its mood or geography (that's character, field 2 below).

   The value MUST be one of the following options:

   ${DUNGEON_TYPES.join(', ')}

   How type interacts with the OTHER dimensions: a "tomb" is NOT a type — "tomb" is what it was built FOR (purpose = funerary, supplied by organizingLogic). A tomb could be SHAPED as a chambered-complex, a vertical-shaft, an undercity, a single-great-chamber, or even a planar-pocket. Pick the SHAPE based on what the user input or the place's organizing logic implies about CONTAINER FORM, never the purpose.

   Examples:
   - "an ancient tomb" → type: "chambered-complex" (the shape) + organizingLogic: ["funerary"] (the purpose); placeType renders as Tomb/Crypt/Barrow
   - "a god-corpse the party traverses" → type: "single-great-chamber" or "cave-system" (the shape) + organizingLogic: ["formed"]; placeType renders as Hollow/Maw/Gut
   - "a wizard's tower" → type: "tower" or "spire" (the shape) + organizingLogic: ["production"]; placeType renders as Foundry/Works
   - "an undercity of bandits" → type: "undercity" (the shape) + organizingLogic: ["inhabited_base"]
   - "a Far Realm enclave" → type: "planar-pocket" (the frame) + organizingLogic: ["formed"] or ["containment"]

   TIER-AWARE TYPE SELECTION: the difficulty tier is fixed at ${tier}. Cosmic-scale types (${softWeightedTypes}) read best at Tier 3+ and should be reserved for those tiers unless the user input explicitly demands them. At Tier 1-2, prefer grounded shapes (single-great-chamber, chambered-complex, cave-system, maze, vertical-shaft, tower, spire, wreck). Vast scales (undercity, sprawling-labyrinth) lean Tier 2+. Match the form's implied scale to the scope-of-stakes above. When no signal exists in the input, pick with a preference for variety.

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

5. "organizingLogic": The STRUCTURAL INTENT of the space — what it was built or shaped FOR. This is the bones, separate from the "type" (skin / scale). Return as a JSON array of ONE or TWO strings from:

   - "funerary" — built to inter and honor the dead.
   - "containment" — built to keep something IN; locks face inward; depth = danger.
   - "production" — built to make, extract, or process (mine, foundry, lab, workshop, cistern).
   - "inhabited_base" — organized for occupants to LIVE in and DEFEND it (war-camp, garrison, village, hideout).
   - "creature_territory" — SHAPED by a beast's habits, not designed (den, nest, roost).
   - "formed" — NOT built by design (geological, organic / anatomical, reality-warped).
   - "invent" — user input establishes a structural intent that genuinely answers the question but is NOT one of the above. Use SPARINGLY.

   Return TWO values when the input describes a PALIMPSEST place — two intents layered, friction between them:
   - "a tomb repurposed as a cult base" → ["funerary", "inhabited_base"]
   - "an old mine now occupied by bandits" → ["production", "inhabited_base"]
   - "an undercity grown into a creature warren" → ["formed", "creature_territory"]
   - "a god-corpse with a cult inside" → ["formed", "inhabited_base"]

   Return ONE value otherwise:
   - "ancient tomb" → ["funerary"]
   - "old fortress" → ["inhabited_base"]
   - "deep cave system" → ["formed"]
   - "abandoned village" → ["inhabited_base"]  (the bones are still inhabited_base; the abandonment is the holder, not the logic)
   - "wizard's tower" → ["production"]

   Return null when no input signal exists — the orchestrator code-rolls.

   COHERENCE CHECK (mandatory pass before returning organizingLogic):

   We have PRE-ROLLED an organizingLogic for this generation: ${JSON.stringify(preRolledOrganizingLogic)}.

   You have three valid moves:
   (a) CONFIRM the pre-roll — return it verbatim.
   (b) OVERRIDE because the USER INPUT clearly signals a different organizingLogic ("an ancient tomb" forces ["funerary"] regardless of the pre-roll).
   (c) OVERRIDE because the pre-roll is STRUCTURALLY INCOHERENT with the character you've selected — the dungeon could not be both at once. Pick the nearest coherent organizingLogic instead.

   What "structurally incoherent" means: the place could not function as both. Examples:
   - Pre-roll ["funerary"] + character includes occupational / institutional / embattled / mercantile signals → incoherent (a tomb is not a working guildhall). Override toward inhabited_base or production depending on the character.
   - Pre-roll ["creature_territory"] + character includes scholarly / monastic / law-bound signals → incoherent (a beast's den is not a scriptorium). Override toward inhabited_base.
   - Pre-roll ["containment"] + character includes thriving / festival / open-trade signals → incoherent (a prison is not a marketplace). Override toward inhabited_base or production.

   What "structurally incoherent" does NOT mean: merely unusual. A cult ascendant inside an ancient tomb is unusual but coherent — KEEP it. An old foundry haunted by its makers is unusual but coherent — KEEP it. The bar is the dungeon could NOT BE BOTH AT ONCE, not "this is rare." Most pre-rolls should CONFIRM.

   If you override, your returned organizingLogic IS what gets persisted and what downstream coupling derives from. The pre-roll is discarded.

Return ONLY valid JSON with the fields listed above. No prose before or after, no markdown code fences, no commentary.

Example outputs:
{"type": "chambered-complex", "character": ["ancient", "haunted", "moss-furred"], "register": "old-norse", "userName": "Eikheim Barrow", "organizingLogic": ["funerary"], "scale-hint": "T1 grounded — tomb-purpose in a branching chamber shape"}
{"type": "spire", "character": ["scholarly", "ancient", "sun-scorched"], "register": "mesopotamian", "userName": null, "organizingLogic": ["funerary", "production"], "scale-hint": "T3 mid-tier — palimpsest of grave-monument + workshop, vertical shape"}
{"type": "single-great-chamber", "character": ["forgotten", "planar-bleeding", "silence-deep"], "register": "old-norse", "userName": null, "organizingLogic": ["formed"], "scale-hint": "T5 cosmic — god-corpse organic form, one vast chamber"}
{"type": "tower", "character": ["fallen", "cobweb-veiled", "moonlit"], "register": "fantasy_unspecified", "userName": null, "organizingLogic": ["inhabited_base"], "scale-hint": "T1 grounded — cursed-manor purpose in a tower shape"}
{"type": "undercity", "character": ["forgotten", "decaying", "kiln-acrid"], "register": null, "userName": "the Verlith Foundry", "organizingLogic": ["production"], "scale-hint": "T2-3 — production purpose in a vast underground sprawl"}`;
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
 * Pick a random register from the full pool. Matches the item
 * generator's behavior — the full `registerList` (including the
 * thematic-genre registers like Aberrant, Abyssal, Infernal,
 * Primordial) is in scope, with no narrowing filter.
 *
 * The earlier Western-medieval-only filter was removed at the user's
 * request for parity with item / NPC generators: vague fantasy inputs
 * now have access to fantasy species (Elven / Orcish / Goblin /
 * Gnomish / Draconic), ancient-world registers (Egyptian /
 * Mesopotamian), other cultural registers, and the thematic genres.
 */
function pickRegisterFromFullPool(rng) {
  if (registerList.length === 0) return null;
  return registerList[Math.floor(rng() * registerList.length)];
}

/**
 * Resolve a classifier-style register token to a full registerList
 * descriptor, or null when the prefix is filtered out (protected
 * gate) / unrecognized.
 *
 * The `fantasy_unspecified` token routes here too — when called this
 * way (empty-input path), the resolver picks a random register from
 * the full pool to maximize cultural exposure for browsing users.
 */
function resolveRegisterToken(token, rng = Math.random) {
  if (typeof token !== 'string') return null;
  const lowered = token.toLowerCase();
  if (lowered === 'fantasy_unspecified') {
    return pickRegisterFromFullPool(rng);
  }
  if (!TOKENS.includes(lowered)) return null;
  const prefix = TOKEN_TO_REGISTER_PREFIX[lowered];
  return registerList.find(r => r.startsWith(prefix)) || null;
}

/**
 * Run the dungeon dimension inference call.
 *
 * @param {Object} args
 * @param {string} [args.description] — user's free-text dungeon description
 * @param {string} [args.lore] — user's pasted dungeon lore (optional)
 * @param {number|string|null} [args.difficulty] — user-selected difficulty (1-5), or null/undefined to roll
 * @param {() => number} [args.rng] — injectable randomness for deterministic testing
 * @returns {Promise<{type: string|null, character: string[]|null, register: string|null, userName: string|null, tension: string, difficulty: number, powerStructure: string}>}
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

  // Tension: code-picked, tier-weighted. Cosmic-coded tensions
  // (sealed-and-stirring, awakening-architecture, etc.) are down-
  // weighted at tier 1-2 to stop the cosmic-drift on low-tier
  // generations; mortal-scale tensions are up-weighted.
  const tension = pickRandomTension(rng, { tier: resolvedDifficulty });

  // Organizing logic / holder / contender form a coupled chain:
  //   organizingLogic → (mismatch-biased) holder → (presence-gated) contender.
  // Pre-roll the chain here so the fallback emptyResult has a
  // coherent (logic, holder, contender) triple. organizingLogic is
  // tier-weighted: `formed` is hard-banned at T1-2 (inherently
  // cosmic-scale); `containment` leans high; `inhabited_base` leans
  // low. If the LLM call succeeds and provides an organizingLogic,
  // the chain is re-derived below using the LLM's value.
  const fallbackOrganizingLogic = pickRandomOrganizingLogic(rng, { tier: resolvedDifficulty });
  const fallbackPowerStructure = pickHolderForOrganizingLogic(fallbackOrganizingLogic, rng);
  // FormedNature: rolled ONLY when 'formed' is in organizingLogic.
  // Other logics don't have an ambient-force problem to solve, so
  // the field is null. Holder-gated: under several_unrelated the
  // picker forces `remnant` (a phenomenon-shaped "third power"
  // reads as scenery pretending to be a faction).
  const fallbackFormedNature = fallbackOrganizingLogic.includes('formed')
    ? pickRandomFormedNature(rng, { holder: fallbackPowerStructure })
    : null;
  // Drive type: fused stake-and-method directive (replaces orthogonal
  // motive + mode). Cascade-weighted on (powerStructure, tension,
  // organizingLogic) per the user's design notes — prevent_by_killing
  // up under single_apex, exploit_the_standoff up under
  // several_unrelated, survive_and_escape up under scoured-and-claimed,
  // etc.
  const fallbackDriveType = pickRandomDriveType(rng, {
    powerStructure: fallbackPowerStructure,
    tension,
    organizingLogic: fallbackOrganizingLogic,
  });
  const fallbackPovFrame = pickRandomPovFrame(rng, { holder: fallbackPowerStructure, tension });
  const fallbackPlaceType = pickPlaceTypeForLogic(fallbackOrganizingLogic, rng);
  // Third-party: unified contender + contact axis. ONE third party per
  // dungeon (adversary or ally, never both). driveType feeds the
  // acquisition-style presence bump; tension feeds the SUPPRESS rule
  // (rival-coded tensions flip an adversary roll to ally so the
  // dungeon doesn't double up on rivals).
  const fallbackThirdParty = pickRandomThirdParty(rng, {
    holder: fallbackPowerStructure,
    driveType: fallbackDriveType,
    tension,
    tier: resolvedDifficulty,
  });

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
    preRolledOrganizingLogic: fallbackOrganizingLogic,
    preRolledHolder: fallbackPowerStructure,
    preRolledTension: tension,
  });

  // Default result: code-fall-throughs for every dimension. Returned
  // on LLM failure so the caller's pipeline keeps moving.
  const fallbackType = pickWeightedDungeonType(resolvedDifficulty, rng);
  // Both branches now route through the full registerList — parity
  // with the item generator. The empty-input branch goes via
  // resolveRegisterToken('fantasy_unspecified') for the comment trail;
  // both ultimately hit pickRegisterFromFullPool.
  const fallbackRegister = pickRegisterFromFullPool(rng);
  // Pool injection: a rotated 6-name subset of the register's curated
  // character pool, for the LLM to derive from. Null when the register
  // is a catchall (no curated pool); the prompt falls back to
  // descriptor-only.
  const fallbackRegisterPool = pickRegisterPoolSubset(fallbackRegister, rng);
  // nameTemplate pre-roll: gated on register availability. Both
  // branches above resolve a register, so the fallback assumes
  // hasRegister: true. The post-LLM re-derive below re-checks against
  // the LLM-resolved register and filters to B/D/F if it came back null.
  const fallbackNameTemplate = pickRandomNameTemplate(rng, { hasRegister: !!fallbackRegister });

  // Monster population: ONE creature_type + ONE relation that apply
  // to all three encounter slots. The 3-slot roster shares a kind so
  // the dungeon reads as one population, not three unrelated creatures.
  const fallbackMonsterPopulation = rollMonsterPopulation({ rng });

  const emptyResult = {
    type: fallbackType,
    character: characterCandidates ? characterCandidates[0] : null,
    register: fallbackRegister,
    userName: null,
    tension,
    difficulty: resolvedDifficulty,
    powerStructure: fallbackPowerStructure,
    organizingLogic: fallbackOrganizingLogic,
    thirdParty: fallbackThirdParty,
    povFrame: fallbackPovFrame,
    placeType: fallbackPlaceType,
    nameTemplate: fallbackNameTemplate,
    registerPool: fallbackRegisterPool,
    formedNature: fallbackFormedNature,
    driveType: fallbackDriveType,
    monsterPopulation: fallbackMonsterPopulation,
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
    // Empty input: pick from the full register pool.
    resolvedRegister = resolveRegisterToken('fantasy_unspecified', rng);
  } else if (typeof parsed.register === 'string' && parsed.register.toLowerCase() === 'fantasy_unspecified') {
    // User-input with no specific cultural signal → also full pool.
    // Item generator parity: no narrowing filter; vague fantasy inputs
    // get access to all registers (Western-medieval, fantasy species,
    // ancient-world, other cultural, thematic).
    resolvedRegister = pickRegisterFromFullPool(rng);
  } else {
    resolvedRegister = resolveRegisterToken(parsed.register, rng);
  }

  const resolvedUserName = typeof parsed.userName === 'string' && parsed.userName.trim().length > 0
    ? parsed.userName.trim()
    : null;

  // Organizing logic: LLM pick if valid (array or single string), else
  // fall back to the pre-roll. Composite is capped at 2 values.
  let resolvedOrganizingLogic = fallbackOrganizingLogic;
  if (Array.isArray(parsed.organizingLogic) && parsed.organizingLogic.length > 0) {
    const valid = parsed.organizingLogic
      .filter(l => typeof l === 'string')
      .map(l => l.trim())
      .filter(l => ORGANIZING_LOGICS.includes(l));
    if (valid.length > 0) resolvedOrganizingLogic = valid.slice(0, 2);
  } else if (typeof parsed.organizingLogic === 'string') {
    const v = parsed.organizingLogic.trim();
    if (ORGANIZING_LOGICS.includes(v)) resolvedOrganizingLogic = [v];
  }

  // Holder + driveType + thirdParty: re-derive from the LLM-resolved
  // organizing logic to keep the coupling and presence-gating coherent.
  // If the LLM didn't move organizingLogic off the fallback, these
  // rolls diverge slightly from the pre-rolls (different rng state)
  // but the coupling invariants still hold.
  const resolvedPowerStructure = pickHolderForOrganizingLogic(resolvedOrganizingLogic, rng);
  // Drive type re-rolls against the LLM-resolved (holder, tension,
  // organizingLogic) so the cascade weighting tracks any LLM override.
  const resolvedDriveType = pickRandomDriveType(rng, {
    powerStructure: resolvedPowerStructure,
    tension,
    organizingLogic: resolvedOrganizingLogic,
  });
  // Third-party: re-roll against the LLM-resolved holder + driveType
  // so a user-input or coherence-pass override flows through to the
  // presence rate, type split, and SUPPRESS rule.
  const resolvedThirdParty = pickRandomThirdParty(rng, {
    holder: resolvedPowerStructure,
    driveType: resolvedDriveType,
    tension,
    tier: resolvedDifficulty,
  });
  const resolvedPovFrame = pickRandomPovFrame(rng, { holder: resolvedPowerStructure, tension });
  // placeType re-derives from the LLM-resolved organizingLogic so a
  // user-input or coherence-check override flows through to the noun.
  const resolvedPlaceType = pickPlaceTypeForLogic(resolvedOrganizingLogic, rng);
  // nameTemplate re-derives against the LLM-resolved register so the
  // template-bucket filter (B/D/F when no register) honors the LLM's
  // actual register resolution, not the pre-roll's guess.
  const resolvedNameTemplate = pickRandomNameTemplate(rng, { hasRegister: !!resolvedRegister });

  return {
    type: resolvedType,
    character: resolvedCharacter,
    register: resolvedRegister,
    userName: resolvedUserName,
    tension,
    difficulty: resolvedDifficulty,
    powerStructure: resolvedPowerStructure,
    organizingLogic: resolvedOrganizingLogic,
    thirdParty: resolvedThirdParty,
    povFrame: resolvedPovFrame,
    placeType: resolvedPlaceType,
    nameTemplate: resolvedNameTemplate,
    // Re-derive the pool subset from the LLM-resolved register so a
    // user-input register override flows through to the injected pool.
    registerPool: pickRegisterPoolSubset(resolvedRegister, rng),
    // Re-derive formedNature against the LLM-resolved organizingLogic
    // AND the resolved holder. If the LLM overrode the logic away from
    // 'formed', the field drops to null. If overrode INTO 'formed', a
    // fresh roll fires under the resolved holder (so several_unrelated
    // still forces `remnant`).
    formedNature: resolvedOrganizingLogic.includes('formed')
      ? (fallbackFormedNature || pickRandomFormedNature(rng, { holder: resolvedPowerStructure }))
      : null,
    driveType: resolvedDriveType,
    // Monster population is a fresh roll (creature_type + relation,
    // both dungeon-wide; the 3 encounter slots inherit them). No
    // coupling to LLM-resolved fields — pure code-roll.
    monsterPopulation: rollMonsterPopulation({ rng }),
  };
}
