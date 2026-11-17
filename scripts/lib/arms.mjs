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


/**
 * THE CLOSED LIST OF FIXES (owner's ruling, 2026-11-16). A fix is deterministic, hybrid or a drop:
 * the model is not relied on to write a fix alone. The audit must therefore NAME the fix, because
 * its seven principles do not map one to one onto repairs — one principle covers several.
 *
 * Part 1 only measures which fix the audit would choose. Nothing is applied: this arm is paired
 * with the None answer transform, so the engine sees no findings and the sheets equal the None
 * arm's. What is being measured is how much of the work is deterministic, how much is `clarify`,
 * and whether the model uses the list sensibly at all.
 */
export const FIX_FIELD = `

EVERY FINDING MUST ALSO NAME ITS FIX, from this closed list, with the one parameter that fix needs.
Choose the narrowest fix that resolves the issue you described. Add two keys to each finding:

  "fix": one of
    "rename"        the NAME is wrong; the rules text stays byte for byte.
                    "fix_param": the replacement name.
    "fill_number"   ONE quantity is missing (a bonus, Temporary Hit Points, a distance, a number of
                    uses). "fix_param": which quantity is missing, in two or three words.
    "add_duration"  an imposed state never says when it ends.
                    "fix_param": the clause, e.g. "until the end of its next turn".
    "swap_stat"     the saving throw's ability contradicts what the save represents; the DC stays.
                    "fix_param": the ability it should be, e.g. "Dexterity".
    "delete_span"   the span you quoted should simply be removed, and nothing put in its place.
                    "fix_param": null.
    "reformat"      the row's existing parts are right but rendered in the wrong form; no content
                    changes. "fix_param": null.
    "drop"          the row cites something that is not on the sheet, or cannot be run, and no fix
                    above reaches it. "fix_param": null.
    "clarify"       the row needs words rewritten to make sense, and no fix above reaches it.
                    "fix_param": null.
    "none"          an observation; nothing on the row should change. "fix_param": null.

Do not invent a fix name outside this list. If the issue needs new prose written, that is "clarify".`;

export const askForFix = (prompt) => `${dropLookAgain(prompt)}${FIX_FIELD}`;

/**
 * ANSWER THE AUDIT FROM THE TAPE, WHATEVER THE PROMPT SAYS (2026-11-17).
 *
 * The tape is keyed on the exact prompt, so the moment the audit's prompt changes every sheet
 * misses at the audit and strict comparison is lost on the branch that changed it. This arm looks
 * the audit's answer up by its CALL instead of by its text: the one audit answer recorded for that
 * generation is served, whatever the engine asked.
 *
 * It separates a change to the ENGINE from a change to the PROMPT. With it, the 38 sheets replay in
 * minutes with no model, and a difference is the engine's.
 *
 * Its limit is the mirror of its purpose: it says nothing about how the audit answers the new
 * prompt. That is what the live Typed run is for.
 */
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
  /**
   * PART 1 OF THE TYPED FIXES: a live audit asked to name its fix from the closed list, with its
   * answer then EMPTIED before the page sees it. The findings are measured; none is applied, so
   * these sheets equal the None arm's and nothing about the engine is being tested here.
   */
  'audit-as-taped': { call: 'audit', fromTapeByCall: true, live: false,
    why: "the audit is answered from the tape by its CALL, not by its prompt text — so a prompt change does not cost the comparison" },
  'fix-kinds': { call: 'audit', prompt: askForFix, answer: emptyFindings, live: true,
    why: 'a live audit asked to name each finding\'s fix, with the findings then emptied so nothing is applied' },
};

export const ARM_NAMES = Object.keys(ARMS);
