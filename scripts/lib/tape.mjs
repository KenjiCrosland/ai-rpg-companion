/**
 * THE TAPE: a recorded generation's prompts and answers, served back in place of the model.
 *
 * Shared by the harness (`scripts/smoke-statblock.mjs --record` / `--replay`) and its spec, so the
 * test exercises the code that actually runs rather than a copy of it.
 *
 * KEYED ON THE PROMPT TEXT, NOT ON ORDER. The page issues the route and path calls in parallel
 * (`Promise.all`), so their arrival order is not stable between runs; their prompts differ, so by
 * text each still finds its own answer. A prompt that legitimately repeats — the client re-asks
 * with a fix-the-JSON prompt, and a retry can send the same text twice — keeps a QUEUE of its
 * answers and they are served in the order they were recorded.
 */

/**
 * THE CALL FAMILIES, read off the recorded forty rather than guessed from the code: every one of
 * the 434 calls in it starts with one of these lines, and each line belongs to one prompt builder.
 * That is how a call is recognised — by the opening line its builder writes, which is stable
 * because it is a literal in the builder and not assembled from the concept.
 *
 * In arrival order, which is also the order a generation runs them in.
 */
export const CALL_FAMILIES = [
  { name: 'path', builder: 'buildPathPrompt', file: 'reskin/path.mjs', head: 'A game master filled in a monster form' },
  { name: 'route', builder: 'buildRoutePrompt', file: 'reskin/route.mjs', head: 'Route this D&D monster concept onto ONE chassis' },
  { name: 'seed', builder: 'buildSeedSynthesisPrompt', file: 'reskin/generate.mjs', head: 'Fuse these randomly rolled traits' },
  { name: 'identity', builder: 'buildIdentityPrompt', file: 'format-2024/generate.mjs', head: "Sketch this D&D monster concept's combat identity" },
  { name: 'reskin', builder: 'buildReskinPrompt', file: 'reskin/generate.mjs', head: 'You are reskinning a mechanical monster chassis' },
  { name: 'idea', builder: 'buildIdeaPrompt', file: 'reskin/templates.mjs', head: 'You are inventing the SIGNATURE ability' },
  { name: 'fit', builder: 'buildFitPrompt', file: 'reskin/templates.mjs', head: "A monster's signature ability has been described in plain words" },
  { name: 'seat', builder: 'buildSeatPrompt', file: 'reskin/author.mjs', head: 'You are writing ONE ability for a D&D monster' },
  { name: 'audit', builder: 'buildAuditPrompt', file: 'format-2024/audit.mjs', head: 'You are auditing a D&D' },
  { name: 'repair', builder: 'buildRepairPrompt', file: 'reskin/author.mjs', head: 'You are repairing the ABILITIES' },
  { name: 'free-row-fix', builder: 'buildFreeRowFixPrompt', file: 'reskin/author.mjs', head: 'You are REPAIRING one ability' },
  { name: 'legacy', builder: 'fromLegacyModel', file: 'reskin/generate.mjs', head: 'You are converting D&D statblock entries' },
  { name: 'enrichment', builder: 'buildEnrichmentPrompt', file: 'util/statblock-enrichment.mjs', head: 'You are generating creature intelligence data' },
];

export const FAMILY_NAMES = CALL_FAMILIES.map((f) => f.name);

/** Which call this is, by the line its builder opens with. 'unknown' is reported, never guessed at. */
export const familyOf = (prompt) => {
  const p = String(prompt ?? '').trim();
  return CALL_FAMILIES.find((f) => p.startsWith(f.head))?.name ?? 'unknown';
};

export const builderOf = (family) => CALL_FAMILIES.find((f) => f.name === family)?.builder ?? '(unrecognised prompt)';

/** @param {{prompt: string, response: string}[]} calls */
export const buildTape = (calls = []) => {
  const tape = new Map();
  for (const c of calls) {
    if (!tape.has(c.prompt)) tape.set(c.prompt, []);
    tape.get(c.prompt).push(c.response);
  }
  return tape;
};

/** Is there an unserved answer for this prompt? Does not consume one. */
export const hasAnswer = (tape, prompt) => !!(tape?.get(prompt)?.length);

/**
 * The next unserved answer for this prompt, or null when there is none — which is a MISS, and the
 * caller fails loudly and names the prompt. That is how a behaviour change shows itself, and it is
 * wanted: a changed prompt is the point of the instrument, not an inconvenience.
 */
export const takeAnswer = (tape, prompt) => {
  const q = tape?.get(prompt);
  return q && q.length ? q.shift() : null;
};

/** How many recorded answers were never asked for — a prompt the code no longer sends. */
export const unusedAnswers = (tape) => [...(tape?.values() ?? [])].reduce((n, q) => n + q.length, 0);

export const MODES = ['strict', 'pass-through', 'live-from'];

/**
 * WHERE THIS CALL'S ANSWER COMES FROM. Pure: it peeks at the tape and decides nothing else.
 *
 *   strict        a hit is served, a miss FAILS. The default, and what proves a refactor.
 *   pass-through  a hit is served, a miss goes LIVE — a prompt change can be tried without
 *                 paying for a forty, and the result is written to a NEW recording.
 *   live-from     everything before the named call is served; that call and everything after it go
 *                 live even where the prompt is unchanged, so one step can be re-rolled on a frozen
 *                 sheet. `afterNamed` is the caller's latch: once the named family has been seen in
 *                 this generation, every later call is live whatever its family.
 *
 * @returns {{use: 'tape'|'live'|'miss', family: string, flips?: boolean}}
 */
export const decide = ({ mode = 'strict', liveFrom = null, prompt = '', tape = null, afterNamed = false } = {}) => {
  const family = familyOf(prompt);
  if (mode === 'live-from') {
    if (afterNamed) return { use: 'live', family };
    if (family === liveFrom) return { use: 'live', family, flips: true }; // the named call itself goes live, and latches
    return hasAnswer(tape, prompt) ? { use: 'tape', family } : { use: 'miss', family };
  }
  if (hasAnswer(tape, prompt)) return { use: 'tape', family };
  return { use: mode === 'pass-through' ? 'live' : 'miss', family };
};

/**
 * A MISS A PERSON CAN READ. Names the call by its builder, finds the nearest recorded prompt of the
 * same generation, and points at the FIRST place the two differ with a line of context each side.
 *
 * Nearest by same-family first, then by longest shared opening — a prompt differing in one clause
 * shares thousands of characters with its recorded self and nothing like that with any other call.
 */
export const describeMiss = (prompt, calls = []) => {
  const family = familyOf(prompt);
  const shared = (a, b) => { let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i += 1; return i; };
  const pool = calls.filter((c) => familyOf(c.prompt) === family);
  const candidates = (pool.length ? pool : calls).map((c) => c.prompt);
  if (!candidates.length) {
    return { family, builder: builderOf(family), nearest: null,
      summary: `the ${family} call (${builderOf(family)}) — this generation recorded no prompt to compare it with` };
  }
  const nearest = candidates.reduce((best, c) => (shared(prompt, c) > shared(prompt, best) ? c : best), candidates[0]);
  const a = nearest.split('\n'); const b = String(prompt).split('\n');
  let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i += 1;
  const ctx = (arr, n) => ({ before: arr[n - 1] ?? null, at: arr[n] ?? '(end of prompt)', after: arr[n + 1] ?? null });
  return {
    family, builder: builderOf(family), nearest,
    nearestIsSameFamily: pool.length > 0,
    line: i + 1,
    recorded: ctx(a, i),
    live: ctx(b, i),
    sharedChars: shared(prompt, nearest),
    summary: `the ${family} call (${builderOf(family)}) — first differs at line ${i + 1} of ${b.length}`,
  };
};

/** The miss report as the harness prints it: the call, the line, and both sides with context. */
export const formatMiss = (prompt, calls = []) => {
  const d = describeMiss(prompt, calls);
  const out = [`REPLAY MISS — ${d.summary}`];
  if (!d.nearest) return out.join('\n');
  out.push(`  nearest recorded prompt: ${d.nearestIsSameFamily ? 'the same call in this generation' : 'a DIFFERENT call (no recorded prompt of this family)'}, ${d.sharedChars} characters shared`);
  if (d.recorded.before !== null) out.push(`   ${String(d.line - 1).padStart(4)} | ${d.recorded.before}`);
  out.push(`  -${String(d.line).padStart(4)} | ${d.recorded.at}`);
  out.push(`  +${String(d.line).padStart(4)} | ${d.live.at}`);
  const after = d.recorded.after ?? d.live.after;
  if (after !== null && after !== undefined) out.push(`   ${String(d.line + 1).padStart(4)} | ${after}`);
  return out.join('\n');
};

/**
 * THE ANSWER A MISS IS GIVEN, and why it is a 200.
 *
 * A miss must fail the call, but it must not look like a PROVIDER failure: `recordFailure` in
 * ai-client.mjs fires on a non-2xx, on an error-shaped body, or on a thrown fetch, and three of
 * those open a circuit breaker that is PERSISTED in localStorage. A 500 therefore stamped
 * `degraded: true` on every later sheet of a replay and made 17 sheets of a forty differ for a
 * reason that had nothing to do with the code under test.
 *
 * So a miss answers 200 with a well-formed provider envelope whose CONTENT fails the caller's own
 * validator. The call fails as a validation failure, the breaker is never touched, and the harness
 * reports the miss itself.
 */
export const MISS_BODY = JSON.stringify({ choices: [{ message: { content: JSON.stringify({ __replay_miss: true }) } }] });
