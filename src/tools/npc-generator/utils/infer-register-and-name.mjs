/**
 * infer-register-and-name.mjs
 *
 * Combined upfront inference for NPC generation. Single LLM call
 * extracts both:
 *   - the linguistic register that fits the user's NPC request, and
 *   - the user-provided character name (when present), so the
 *     orchestrator can suppress the source-NPC whitelist for that
 *     generation while still applying it to relationships.
 *
 * The `register` return value has THREE possible shapes — the
 * orchestrator routes each differently:
 *
 *   1. A full registerList descriptor (e.g., 'Goblin-inspired: …',
 *      'Hungarian-inspired: …'). The user's input carried a clear
 *      cultural / racial / linguistic signal that mapped to a known
 *      register that is currently available (not gated by the
 *      protected-register flag). Use it directly.
 *
 *   2. The sentinel string `FANTASY_UNSPECIFIED` ('fantasy_unspecified').
 *      The input describes a generic fantasy NPC ("a tavern patron",
 *      "a wandering merchant", "a village blacksmith") that doesn't
 *      pin down a specific register. The orchestrator treats this the
 *      same as empty input: roll a random fantasy register from the
 *      variety pool via `selectRegister`. Without this distinction,
 *      generic-fantasy inputs landed on `register: null` and DeepSeek
 *      defaulted to its English-fantasy mode (Sera / Kaelen / Mira
 *      clones across many generations).
 *
 *   3. `null`. Either (a) the input describes a non-fantasy genre
 *      (cyberpunk, sci-fi, noir, modern, historical), OR (b) the
 *      input matched a register that the protected-register flag
 *      currently gates off (Japanese, Chinese, Mongolian, etc. when
 *      `enableProtectedRegisters` is false). In both cases: no
 *      whitelist injection, no register block; DeepSeek generates
 *      freehand in whatever idiom the input implies.
 *
 * RECOGNIZE-THEN-GATE ARCHITECTURE
 * --------------------------------
 *
 * The classifier's token list deliberately covers the FULL register
 * catalog including protected entries (japanese, chinese, mongolian,
 * hawaiian, lakota, …). Recognition is broad on purpose — the
 * alternative is force-fitting culturally-specific inputs into the
 * nearest available register, which produced bugs like "a drunken
 * ronin" → Germanic Eckhart-the-Drunk. By giving the classifier the
 * vocabulary to recognize "ronin" as Japanese, then letting the
 * resolver return null when Japanese is gated off, freehand mode
 * takes over and DeepSeek generates a ronin-coded NPC without us
 * mis-routing it.
 *
 * The protected-gate happens implicitly at the resolution step: we
 * look up the resolved prefix in `registerList`, which already
 * filters out protected registers when `enableProtectedRegisters` is
 * false. If the lookup misses, we return null — same path as a fully
 * unrecognized token. No explicit `protected` flag check needed.
 *
 * Replaces the earlier `inferRegister` (post-Part-1 single-token
 * inference). The combined upfront approach has three advantages:
 *
 *   1. One LLM call instead of two — register selection happens
 *      before any generation, so source NPC and relationships use
 *      the same register without a second classification pass.
 *
 *   2. Captures user-provided names structurally — DeepSeek's NLP
 *      handles apposition / possessives / lowercase / diacritics
 *      better than the regex layers we accumulated previously.
 *
 *   3. Source-NPC and relationships register agree by construction.
 *      The earlier post-Part-1 path could disagree (e.g., elven
 *      context with a Norse-coded character_name → relationships
 *      inferred as Norse instead of Elven).
 *
 * Path scoping: only called for the non-empty-input, non-seeded
 * path. Seeded NPCs use `seedItem.register` directly (no inference);
 * empty-input NPCs use the random-fantasy-register selection
 * upstream (no inference).
 *
 * Graceful degradation: any failure (network, validation, malformed
 * JSON, unknown token) returns `{ register: null, userName: null }`.
 * Generation continues without a whitelist — the same as the pre-
 * architecture behavior for any specific generation.
 */

import { generateGptResponse } from '@/util/ai-client.mjs';
import { registerList } from '@/shared/register-list.mjs';

/**
 * Sentinel value the inference returns when the input is fantasy but
 * doesn't pin down a specific register. The orchestrator routes this
 * to the random-fantasy-register variety pool (same as empty input).
 * Distinct from `null`, which signals non-fantasy genre.
 */
export const FANTASY_UNSPECIFIED = 'fantasy_unspecified';

/**
 * Tokens the inference call is allowed to return for `register`.
 * Each maps to a register-prefix string the rest of the system uses.
 * Lowercase single-word (or hyphenated) tokens are easier for
 * DeepSeek to produce reliably than full register descriptors.
 *
 * Coverage is broad — every register in `ALL_REGISTERS` has a token,
 * including protected ones. Recognition happens here; the
 * protected-gate fires later, at resolution time, by way of the
 * `registerList` lookup (which excludes protected entries when
 * `enableProtectedRegisters` is false). See the "recognize-then-
 * gate" architecture note at the top of this file.
 *
 * The Dwarven race's primary linguistic register is Old Norse, so
 * the 'dwarven' token maps to the Old-Norse-inspired prefix.
 */
export const TOKEN_TO_REGISTER_PREFIX = {
  // Fantasy races
  'elven':              'Elven',
  'goblin':             'Goblin-inspired',
  'orcish':             'Orcish',
  'dwarven':            'Old-Norse-inspired',
  'draconic':           'Draconic',

  // Thematic / cosmic-genre registers
  'aberrant':           'Aberrant',
  'abyssal':            'Abyssal',
  'infernal':           'Infernal',
  'primordial':         'Primordial',

  // Germanic family
  'norse':              'Norse-inspired',
  'old-norse':          'Old-Norse-inspired',
  'gothic':             'Gothic-inspired',
  'anglo-saxon':        'Anglo-Saxon-inspired',
  'germanic':           'Germanic-inspired',
  'old-high-german':    'Old-High-German-inspired',
  'middle-high-german': 'Middle-High-German-inspired',

  // Celtic family
  'celtic':             'Celtic-inspired',
  'welsh':              'Welsh-inspired',
  'middle-welsh':       'Middle-Welsh-inspired',
  'irish':              'Irish-inspired',
  'old-irish':          'Old-Irish-inspired',

  // Slavic family
  'slavic':             'Slavic-inspired',
  'old-slavic':         'Old-Slavic-inspired',
  'russian':            'Russian-inspired',

  // Other European
  'romanian':           'Romanian-inspired',
  'hungarian':          'Hungarian-inspired',
  'finnish':            'Finnish-inspired',
  'old-occitan':        'Old-Occitan-inspired',

  // Classical Mediterranean
  'latin':              'Latin-inspired',
  'greek':              'Greek-inspired',
  'italian-renaissance':'Italian-Renaissance-inspired',

  // Ancient extinct-religion Mediterranean (non-protected)
  'mesopotamian':       'Mesopotamian-inspired',
  'phoenician-punic':   'Phoenician-Punic-inspired',
  'egyptian':           'Egyptian-inspired',
  'etruscan':           'Etruscan-inspired',

  // Protected catchall — recognized at classifier-time so we can
  // route to freehand (null) when the flag gates these off, instead
  // of force-fitting to the nearest non-protected token.
  'caucasian':          'Caucasian-inspired',
  'atlas-berber':       'Atlas-Berber-inspired',
  'pamir':              'Pamir-inspired',
  'arabic':             'Arabic-inspired',
  'japanese':           'Japanese-inspired',
  'chinese':            'Chinese-inspired',
  'korean':             'Korean-inspired',
  'mongolian':          'Mongolian-inspired',
  'tibetan':            'Tibetan-inspired',
  'hindi-sanskrit':     'Hindi/Sanskrit-inspired',
  'thai':               'Thai-inspired',
  'hawaiian':           'Hawaiian-inspired',
  'maori':              'Maori-inspired',
  'akan':               'Akan-inspired',
  'igbo':               'Igbo-inspired',
  'swahili':            'Swahili-inspired',
  'yoruba':             'Yoruba-inspired',
  'maya':               'Maya-inspired',
  'aztec-nahuatl':      'Aztec/Nahuatl-inspired',
  'lakota':             'Lakota-inspired',
  'andean':             'Andean-inspired',

  // Fictional fantasy (universal-invent path)
  'gnomish':            'Gnomish',
  'technomagical':      'Technomagical',
};

const TOKENS = Object.keys(TOKEN_TO_REGISTER_PREFIX);

/**
 * Strip markdown code fences and surrounding whitespace from a raw
 * LLM response. DeepSeek occasionally wraps JSON output in
 * ```json … ``` blocks despite the prompt asking for raw JSON.
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
 * JSON-shape validator passed to generateGptResponse. Accepts any
 * object with `register` (string or null) and `userName` (string or
 * null). The retry logic in generateGptResponse keeps trying until
 * the LLM produces a valid shape.
 *
 * Exported for the spec; not meant to be called by application code.
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
  if (!parsed || typeof parsed !== 'object') return false;
  const hasRegister = parsed.register === null || typeof parsed.register === 'string';
  const hasUserName = parsed.userName === null || typeof parsed.userName === 'string';
  return hasRegister && hasUserName;
}

/**
 * Combined inference call: extract register and userName from the
 * user's free-text NPC request.
 *
 * @param {string} userInput — the user's NPC description.
 * @returns {Promise<{register: string|null, userName: string|null}>}
 *   - `register`: one of three values —
 *     • a full registerList descriptor (e.g., 'Goblin-inspired: …')
 *       when the LLM identifies a known active register;
 *     • the sentinel `FANTASY_UNSPECIFIED` when the input is fantasy
 *       but doesn't pin down a register (caller routes to the random-
 *       fantasy variety pool);
 *     • `null` when the input is non-fantasy genre (caller suppresses
 *       whitelist injection entirely).
 *   - `userName`: a non-empty trimmed string when the LLM extracted a
 *     specific name from the user's input; otherwise null.
 */
export async function inferRegisterAndName(userInput) {
  if (typeof userInput !== 'string' || userInput.trim().length === 0) {
    return { register: null, userName: null };
  }

  const prompt = `Analyze this NPC request and extract two pieces of information.

User input: "${userInput.replace(/"/g, '\\"')}"

Return a JSON object with two fields:

1. "register": The linguistic register that fits this NPC. The value MUST be one of three things:

   (a) A specific token from this list, when the input carries an EXPLICIT cultural, racial, or linguistic signal — a culturally-distinct loanword (ronin, samurai, boyar, sheikh, druid, valkyrie, pharaoh, conquistador), a named ethnicity, a register-specific occupation, or a place that pins down a culture:
       ${TOKENS.join(', ')}

       Map the input to the token of the culture it most clearly references. "Ronin" or "samurai" → japanese. "Boyar" → russian. "Bedouin warrior" or "Sheikh" → arabic. "Pharaoh" or "vizier of the river-kingdom" → egyptian. "Druid" → celtic. "Skald" or "viking" → old-norse. "Berserker" or "thane" → anglo-saxon. "Curandera" → no token (no Latin-American register; fall through to null). Only use a token when the cultural signal is explicit — do NOT pick a token from implicit tropes (a "scholar" is not Chinese; a "merchant" is not Phoenician; a "warrior" is not Norse).

   (b) The exact string "fantasy_unspecified" when the input describes a fantasy NPC but does NOT pin down a specific register — generic fantasy roles or settings without a cultural / racial / linguistic marker. Examples: "a tavern patron", "a village blacksmith", "a wandering merchant", "a hooded stranger", "an old wizard", "a bandit captain". Use this whenever the NPC fits a default sword-and-sorcery world but the user hasn't said which culture they belong to.

   (c) null when the input describes a non-fantasy genre (cyberpunk, sci-fi, modern, post-apocalyptic, noir, weird-west, historical, real-world) OR an explicit cultural signal that doesn't match any token above (Polynesian-but-not-Maori-or-Hawaiian, Indigenous-South-American-not-Andean, Indian-vernacular-not-Hindi-Sanskrit, etc.). Examples: "an edgerunner", "a noir detective", "a 1920s flapper", "a corporate suit with cybereyes".

2. "userName": The character's specific name if the user has provided one, or null if no name is given.
- "goblin named Boblin" → userName: "Boblin"
- "Csaba" → userName: "Csaba"
- "an elven scout" → userName: null (only descriptive)
- "Aelindar the wise" → userName: "Aelindar"
- "Boblin the goblin" → userName: "Boblin"

Return ONLY valid JSON with these two fields. No other text, no markdown formatting.

Example outputs:
{"register": "goblin", "userName": "Boblin"}
{"register": "elven", "userName": null}
{"register": "hungarian", "userName": "Csaba"}
{"register": "japanese", "userName": null}               (input was "a drunken ronin")
{"register": "russian", "userName": null}                (input was "a boyar's huntsman")
{"register": "egyptian", "userName": null}               (input was "a temple-scribe of the river-kingdom")
{"register": "fantasy_unspecified", "userName": null}    (input was "a tavern patron")
{"register": "fantasy_unspecified", "userName": null}    (input was "a wandering merchant")
{"register": null, "userName": null}                     (input was "an edgerunner with cyberpsychosis")
{"register": null, "userName": "Jax Voss"}               (input was "a noir detective named Jax Voss")`;

  let response;
  try {
    response = await generateGptResponse(prompt, validateInferenceResponse, 3);
  } catch (e) {
    return { register: null, userName: null };
  }

  let parsed;
  try {
    parsed = JSON.parse(stripCodeFences(response));
  } catch (e) {
    return { register: null, userName: null };
  }

  // Three-state resolution:
  //   - 'fantasy_unspecified' → return the sentinel as-is; the
  //     orchestrator treats it like empty input (random fantasy
  //     register from the variety pool).
  //   - known token whose prefix is in `registerList` → resolve to
  //     the full registerList descriptor.
  //   - known token whose prefix is filtered out of `registerList`
  //     (protected register, gated by `enableProtectedRegisters`) →
  //     null. The classifier recognized the culture, but the gate
  //     keeps the register block from firing — DeepSeek falls
  //     through to freehand generation in the recognized culture's
  //     idiom. Better than force-fitting "drunken ronin" into a
  //     Germanic register because Japanese isn't available.
  //   - null / unknown token → null (non-fantasy, unrecognized, or
  //     hallucinated token; no whitelist injection).
  let resolvedRegister = null;
  if (typeof parsed.register === 'string') {
    const lowered = parsed.register.toLowerCase();
    if (lowered === FANTASY_UNSPECIFIED) {
      resolvedRegister = FANTASY_UNSPECIFIED;
    } else if (TOKENS.includes(lowered)) {
      const prefix = TOKEN_TO_REGISTER_PREFIX[lowered];
      resolvedRegister = registerList.find(r => r.startsWith(prefix)) || null;
    }
  }

  const resolvedUserName = (typeof parsed.userName === 'string' && parsed.userName.trim().length > 0)
    ? parsed.userName.trim()
    : null;

  return { register: resolvedRegister, userName: resolvedUserName };
}
