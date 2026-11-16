/**
 * THE ANSWER TRANSFORMS (the audit experiment, 2026-11-16).
 *
 * The experiment asks what the audit-and-repair step does to a finished sheet, and which part does
 * the damage: the prompt that nearly always finds something, or the rule that acts on every finding
 * whatever its confidence. Its arms are applied at the HARNESS boundary — no product code changes —
 * and two of them rewrite the audit's ANSWER before the page sees it.
 *
 * Those two are what this file proves, because a wrong transform would silently answer the
 * experiment's question wrongly: an arm that dropped `element_claims` along with the findings would
 * change the sheet for a second reason and no count would show it.
 *
 * They run against a REAL recorded answer from the committed tape, not a hand-built one.
 */
import fs from 'node:fs';
import path from 'node:path';
import { emptyFindings, highOnly, dropLookAgain, LOOK_AGAIN, ARMS, ARM_NAMES } from '../../../../../scripts/lib/arms.mjs';

const unfence = (t) => String(t).replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '').trim();
const inner = (raw) => JSON.parse(unfence(JSON.parse(raw).choices[0].message.content));

/** a real audit answer, from the recorded forty */
const recordedAudit = () => {
  const dir = path.resolve(__dirname, 'fixtures/recordings');
  for (const run of fs.readdirSync(dir)) {
    for (const f of fs.readdirSync(path.join(dir, run)).filter((x) => /^\d+-.*\.json$/.test(x))) {
      const j = JSON.parse(fs.readFileSync(path.join(dir, run, f), 'utf8'));
      const c = (j.calls ?? []).find((x) => String(x.prompt).startsWith('You are auditing a D&D'));
      if (c && (inner(c.response).findings ?? []).some((x) => x.confidence === 'high')
            && (inner(c.response).findings ?? []).some((x) => x.confidence !== 'high')) return c;
    }
  }
  return null;
};

describe('the audit answer transforms', () => {
  const call = recordedAudit();

  test('the tape has an audit answer with findings of mixed confidence to test against', () => {
    expect(call).toBeTruthy();
    const f = inner(call.response).findings;
    expect(f.length).toBeGreaterThan(1);
    expect(new Set(f.map((x) => x.confidence)).size).toBeGreaterThan(1);
  });

  test('None returns the answer with NO findings and everything else intact', () => {
    const before = inner(call.response);
    const after = inner(emptyFindings(call.response));
    expect(after.findings).toEqual([]);
    // every other key survives, by value — the arm removes findings and nothing else
    for (const k of Object.keys(before)) {
      if (k === 'findings') continue;
      expect(after[k]).toEqual(before[k]);
    }
    expect(Object.keys(after).sort()).toEqual(Object.keys(before).sort());
  });

  test('High only returns the answer with only the findings marked high', () => {
    const before = inner(call.response);
    const after = inner(highOnly(call.response));
    expect(after.findings).toEqual(before.findings.filter((f) => f.confidence === 'high'));
    expect(after.findings.length).toBeLessThan(before.findings.length);
    expect(after.findings.every((f) => f.confidence === 'high')).toBe(true);
    for (const k of Object.keys(before)) if (k !== 'findings') expect(after[k]).toEqual(before[k]);
  });

  test('both keep the provider envelope the page expects', () => {
    for (const body of [emptyFindings(call.response), highOnly(call.response)]) {
      const env = JSON.parse(body);
      expect(env.choices[0].message.content).toEqual(expect.any(String));
      expect(env.model).toBe(JSON.parse(call.response).model);   // the envelope is the provider's own
      expect(env.id).toBe(JSON.parse(call.response).id);
    }
  });

  test('an answer with no findings at all survives both unchanged', () => {
    const bare = JSON.stringify({ choices: [{ message: { content: JSON.stringify({ name_grade: 'A', findings: [] }) } }] });
    expect(inner(emptyFindings(bare)).findings).toEqual([]);
    expect(inner(highOnly(bare)).findings).toEqual([]);
    expect(inner(highOnly(bare)).name_grade).toBe('A');
  });

  // THE PROMPT TRANSFORM has no test of its own: its evidence is the harness's miss report, which
  // names the audit call and shows exactly one line removed. What IS worth pinning is that it
  // removes that sentence and nothing else.
  test('the prompt transform removes the one sentence, and leaves a prompt without it alone', () => {
    const p = `BEFORE.\n${LOOK_AGAIN} The don't-manufacture rule still stands.`;
    const after = dropLookAgain(p);
    expect(after).not.toContain(LOOK_AGAIN);
    expect(after).toContain('BEFORE.');
    expect(after).toContain("The don't-manufacture rule still stands.");
    expect(dropLookAgain('a prompt that never had it')).toBe('a prompt that never had it');
  });

  test('every arm names a call it acts on, or acts on nothing', () => {
    for (const name of ARM_NAMES) {
      const arm = ARMS[name];
      expect(typeof arm.why).toBe('string');
      if (arm.prompt || arm.answer) expect(typeof arm.call).toBe('string');
      // an arm that rewrites a PROMPT must go live: the tape has no answer for a prompt it never saw
      if (arm.prompt) expect(arm.live).toBe(true);
      if (arm.answer) expect(arm.live).toBe(false);
    }
  });
});
