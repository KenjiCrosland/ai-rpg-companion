/**
 * EXPERIMENT ARMS — what the audit and repair do to a finished sheet (2026-11-16).
 *
 * Each arm is a plain function pair applied AT THE HARNESS BOUNDARY, to one named call:
 *
 *   `prompt(text)`  rewrites the outgoing prompt before the model sees it
 *   `answer(body)`  rewrites the raw response body before the page sees it
 *
 * No product code is touched: the harness already sits on every request and answer, and these are
 * the only two things an experiment needs to change. A new arm is a new entry here.
 *
 * The question this set asks: does the audit-and-repair step make a finished sheet better, and
 * which part does the damage — the prompt that nearly always finds something, or the rule that acts
 * on every finding whatever its confidence?
 */

/** The content of a provider envelope, with the model's ```json fence stripped. */
const inner = (rawBody) => {
  const env = JSON.parse(rawBody);
  const text = String(env?.choices?.[0]?.message?.content ?? '');
  const bare = text.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '').trim();
  return { env, text, bare };
};

/** Put a transformed answer back in the envelope, keeping everything else the provider sent. */
const reseal = (env, obj) => {
  const copy = JSON.parse(JSON.stringify(env));
  copy.choices[0].message.content = JSON.stringify(obj);
  return JSON.stringify(copy);
};

/**
 * ARM "none": the audit's own answer with its findings emptied, EVERYTHING ELSE KEPT.
 *
 * `name_grade`, `type_correction` and `element_claims` stay, because they are not the thing under
 * test — only the findings are, and with none the repair has nothing to act on. So the sheet comes
 * out as the engine built it, before the audit and repair touched it.
 */
export const emptyFindings = (rawBody) => {
  const { env, bare } = inner(rawBody);
  const obj = JSON.parse(bare);
  return reseal(env, { ...obj, findings: [] });
};

/** ARM "high": the same answer with every finding not marked `high` removed. */
export const highOnly = (rawBody) => {
  const { env, bare } = inner(rawBody);
  const obj = JSON.parse(bare);
  const findings = (obj.findings ?? []).filter((f) => String(f?.confidence ?? '').toLowerCase() === 'high');
  return reseal(env, { ...obj, findings });
};

/**
 * ARM "no-look-again": the ONE sentence that tells the audit an empty array is probably a miss.
 *
 * format-2024/audit.mjs:311, in reskin mode only. It contradicts line 288 of the same prompt — "An
 * empty findings array is a correct and common output. Do not manufacture findings to appear
 * thorough." — and on the recorded forty 38 of 39 audits returned findings, 2.5 on average.
 *
 * Removed from the OUTGOING PROMPT, so the product still ships the sentence.
 */
export const LOOK_AGAIN = 'A typical reskin block carries 1-3 such findings; an empty array on a block with model-written traits usually means a MISSED finding, not a clean block — look again before returning empty.';
export const dropLookAgain = (prompt) => {
  const text = String(prompt ?? '');
  if (!text.includes(LOOK_AGAIN)) return text; // not a reskin-mode audit; nothing to remove
  return text.replace(`${LOOK_AGAIN} `, '').replace(LOOK_AGAIN, '');
};

export const ARMS = {
  /** the sheet as the engine built it — the baseline every other arm is measured against */
  none: { call: 'audit', answer: emptyFindings, live: false,
    why: "the audit's answer with its findings emptied; everything else kept" },
  /** what ships now. The taped sheets already are this, so it generates nothing new */
  today: { live: false, why: 'the taped answer, untouched' },
  /** the engine rule, with the audit's roll held still */
  high: { call: 'audit', answer: highOnly, live: false,
    why: 'the taped answer with every finding not marked high removed' },
  /** the prompt, with the audit re-rolled live */
  'no-look-again': { call: 'audit', prompt: dropLookAgain, live: true,
    why: 'a live audit whose prompt drops the one "look again" sentence' },
};

export const ARM_NAMES = Object.keys(ARMS);
