/**
 * THE TAPE: a recorded generation's prompts and answers, served back in place of the model.
 *
 * Shared by the harness (`scripts/smoke-statblock.mjs --record/--replay`) and its spec, so the
 * test exercises the code that actually runs rather than a copy of it.
 *
 * KEYED ON THE PROMPT TEXT, NOT ON ORDER. The page issues the route and path calls in parallel
 * (`Promise.all`), so their arrival order is not stable between runs; their prompts differ, so by
 * text each still finds its own answer. A prompt that legitimately repeats — the client re-asks
 * with a fix-the-JSON prompt, and a retry can send the same text twice — keeps a QUEUE of its
 * answers and they are served in the order they were recorded.
 */

/** @param {{prompt: string, response: string}[]} calls */
export const buildTape = (calls = []) => {
  const tape = new Map();
  for (const c of calls) {
    if (!tape.has(c.prompt)) tape.set(c.prompt, []);
    tape.get(c.prompt).push(c.response);
  }
  return tape;
};

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
