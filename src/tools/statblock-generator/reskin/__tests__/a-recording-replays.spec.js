/**
 * REPLAYING A COMMITTED RECORDING (the record-and-replay harness, 2026-11-16).
 *
 * A forty costs twenty minutes and a different roll every time, so a refactor's effect cannot be
 * told from the model's variance. `scripts/smoke-statblock.mjs --record <batch>` saves each
 * generation's inputs, the names already taken, every prompt with its raw answer, and the sheet it
 * produced; `--replay <dir>` drives the same inputs with the network intercepted and every answer
 * served from the file.
 *
 * WHAT THIS FILE PROVES AND WHAT IT DOES NOT. The sheet-level claim — "the same prompts give the
 * same sheet" — is carried by the harness, because record and replay must run in the SAME
 * environment or a mismatch could be the environment rather than the code; jest cannot drive the
 * page. On the recorded sweep forty it reproduced 37 of 40 sheets byte for byte, twice in a row,
 * and the three that did not are reported with their causes.
 *
 * What this file proves is the part jest can own honestly: the committed recordings are complete
 * and replayable, and the tape the harness serves them from is order-correct and fails loudly
 * rather than quietly handing back the wrong answer. It imports the SAME module the harness uses,
 * so this is not a test of a copy.
 */
import fs from 'node:fs';
import path from 'node:path';
import { buildTape, takeAnswer, unusedAnswers, decide, describeMiss, formatMiss, familyOf, FAMILY_NAMES, MISS_BODY } from '../../../../../scripts/lib/tape.mjs';

const DIR = path.resolve(__dirname, 'fixtures/recordings');
const recordings = () => (fs.existsSync(DIR) ? fs.readdirSync(DIR) : [])
  .flatMap((run) => fs.readdirSync(path.join(DIR, run))
    .filter((f) => /^\d+-.*\.json$/.test(f))
    .map((f) => ({ run, file: f, ...JSON.parse(fs.readFileSync(path.join(DIR, run, f), 'utf8')) })));

describe('the tape serves a recording back in place of the model', () => {
  test('every recorded answer is served, once, in the order it was recorded', () => {
    const calls = [
      { prompt: 'A', response: '{"first":1}' },
      { prompt: 'B', response: '{"other":1}' },
      { prompt: 'A', response: '{"second":2}' }, // the same prompt asked twice
    ];
    const tape = buildTape(calls);
    expect(takeAnswer(tape, 'A')).toBe('{"first":1}');
    expect(takeAnswer(tape, 'B')).toBe('{"other":1}');
    expect(takeAnswer(tape, 'A')).toBe('{"second":2}');  // the queue, in recorded order
    expect(takeAnswer(tape, 'A')).toBeNull();            // and then a miss, not a repeat
    expect(unusedAnswers(tape)).toBe(0);
  });

  test('a prompt that differs by one character is a MISS, not the closest answer', () => {
    const tape = buildTape([{ prompt: 'Challenge Rating: 7', response: '{"ok":1}' }]);
    expect(takeAnswer(tape, 'Challenge Rating: 8')).toBeNull();
    expect(unusedAnswers(tape)).toBe(1); // the recorded answer is left, which is how a miss is seen
  });

  test('it never throws on a tape that is empty or absent', () => {
    expect(takeAnswer(buildTape([]), 'anything')).toBeNull();
    expect(takeAnswer(null, 'anything')).toBeNull();
    expect(unusedAnswers(null)).toBe(0);
  });
});

describe('the committed recordings are replayable', () => {
  const all = recordings();

  test('there is at least one committed recording', () => {
    expect(all.length).toBeGreaterThan(0);
  });

  test('each carries its inputs, the names already taken, its calls and the sheet they produced', () => {
    for (const r of all) {
      expect(r.input).toBeTruthy();
      expect(Array.isArray(r.takenNames)).toBe(true); // the hidden input this harness found
      expect(Array.isArray(r.calls)).toBe(true);
      expect(r.calls.length).toBeGreaterThan(0);
      for (const c of r.calls) {
        expect(typeof c.prompt).toBe('string');
        expect(c.prompt.length).toBeGreaterThan(20);
        expect(typeof c.response).toBe('string');
      }
      // a sheet, or an honest record that this generation produced none
      expect('sheet' in r).toBe(true);
    }
  });

  test('every prompt in a recording can be served from its own tape', () => {
    for (const r of all) {
      const tape = buildTape(r.calls);
      for (const c of r.calls) expect(takeAnswer(tape, c.prompt)).not.toBeNull();
      expect(unusedAnswers(tape)).toBe(0);
    }
  });

  test('a recorded sheet is a statblock, not a placeholder', () => {
    for (const r of all.filter((x) => x.sheet)) {
      expect(typeof r.sheet.name).toBe('string');
      expect(r.sheet.name.length).toBeGreaterThan(1);
      // EITHER SHAPE. A 2024 sheet carries `sections`; a 2014 one carries `actions`/`abilities`
      // (the Ancient Gold Dragon in the recorded forty is the second kind), and a sheet generated
      // in one edition may carry the other under `other_edition`.
      expect(r.sheet.sections ?? r.sheet.actions ?? r.sheet.other_edition).toBeTruthy();
    }
  });
});

/**
 * ROUTING A CALL (2026-11-16). Three modes, and the decision is always one of three words.
 *
 *   strict        a hit is served, a miss FAILS. What proves a refactor.
 *   pass-through  a miss goes LIVE, so a prompt change can be tried without paying for a forty.
 *   live-from F   everything before the F call is served; F and everything after go live even
 *                 where the prompt is unchanged, so one step can be re-rolled on a frozen sheet.
 */
describe('where a call\'s answer comes from', () => {
  const AUDIT = 'You are auditing a D&D 2024-format monster statblock for MECHANICAL defects.';
  const FIT = "A monster's signature ability has been described in plain words. Pour it into ONE of the printed shapes.";
  const tape = () => buildTape([{ prompt: AUDIT, response: 'a' }, { prompt: FIT, response: 'b' }]);

  test('the call is recognised by the line its builder opens with', () => {
    expect(familyOf(AUDIT)).toBe('audit');
    expect(familyOf(FIT)).toBe('fit');
    expect(familyOf('Something no builder writes')).toBe('unknown');
    expect(FAMILY_NAMES).toContain('audit');
  });

  test('strict: a hit is served from the tape, a miss fails', () => {
    expect(decide({ mode: 'strict', prompt: FIT, tape: tape() })).toMatchObject({ use: 'tape', family: 'fit' });
    expect(decide({ mode: 'strict', prompt: 'unrecorded', tape: tape() })).toMatchObject({ use: 'miss' });
  });

  test('pass-through: a hit is served, a miss goes live', () => {
    expect(decide({ mode: 'pass-through', prompt: FIT, tape: tape() })).toMatchObject({ use: 'tape' });
    expect(decide({ mode: 'pass-through', prompt: 'unrecorded', tape: tape() })).toMatchObject({ use: 'live' });
  });

  describe('live-from: both sides of the named call', () => {
    test('BEFORE it, a recorded call is served from the tape', () => {
      expect(decide({ mode: 'live-from', liveFrom: 'audit', prompt: FIT, tape: tape() })).toMatchObject({ use: 'tape', family: 'fit' });
    });

    test('the named call itself goes live, and latches', () => {
      const d = decide({ mode: 'live-from', liveFrom: 'audit', prompt: AUDIT, tape: tape() });
      expect(d).toMatchObject({ use: 'live', family: 'audit', flips: true });
    });

    test('AFTER it, every call goes live even when the tape has its answer', () => {
      // the latch is the caller's: once the named family has been seen, nothing is served
      expect(decide({ mode: 'live-from', liveFrom: 'audit', prompt: FIT, tape: tape(), afterNamed: true }))
        .toMatchObject({ use: 'live', family: 'fit' });
    });

    test('before the named call, an unrecorded prompt is still a miss — the frozen half must be exact', () => {
      expect(decide({ mode: 'live-from', liveFrom: 'audit', prompt: 'unrecorded', tape: tape() })).toMatchObject({ use: 'miss' });
    });
  });

  test('a miss is answered with a 200 that cannot open the circuit breaker', () => {
    // ai-client records a PROVIDER failure on a non-2xx, an error-shaped body, or a thrown fetch,
    // and three of those open a breaker PERSISTED in localStorage. A 500 therefore stamped
    // `degraded: true` on every later sheet and made 17 sheets of a forty differ for a reason
    // unrelated to the code under test. So a miss fails the caller's VALIDATION instead.
    const body = JSON.parse(MISS_BODY);
    expect(body.error).toBeUndefined();              // not an error-shaped body
    expect(body.choices[0].message.content).toContain('__replay_miss'); // content that fails validation
  });
});

describe('naming the difference', () => {
  const AUDIT = ['You are auditing a D&D 2024-format monster statblock for MECHANICAL defects.',
    'Deterministic checks have already run.', 'ROWS:', '- Bite: 7 (1d8 + 3) Piercing damage.'].join('\n');
  const calls = [
    { prompt: "A monster's signature ability has been described in plain words. Pour it in.", response: 'x' },
    { prompt: AUDIT, response: 'y' },
  ];

  test('it names the call by its builder and the first line that differs', () => {
    const changed = AUDIT.replace('MECHANICAL', 'STRUCTURAL');
    const d = describeMiss(changed, calls);
    expect(d.family).toBe('audit');
    expect(d.builder).toBe('buildAuditPrompt');
    expect(d.line).toBe(1);
    expect(d.recorded.at).toContain('MECHANICAL');
    expect(d.live.at).toContain('STRUCTURAL');
  });

  test('the nearest recorded prompt is the same call, not whichever shares a word', () => {
    const changed = AUDIT.replace('1d8 + 3', '1d10 + 3');
    const d = describeMiss(changed, calls);
    expect(d.nearestIsSameFamily).toBe(true);
    expect(d.nearest).toBe(AUDIT);
    expect(d.line).toBe(4);                           // the row line, not the header
    expect(d.recorded.before).toBe('ROWS:');          // a line of context either side
    expect(d.live.at).toContain('1d10');
  });

  test('the printed report shows both sides with context', () => {
    const out = formatMiss(AUDIT.replace('MECHANICAL', 'STRUCTURAL'), calls);
    expect(out).toMatch(/REPLAY MISS — the audit call \(buildAuditPrompt\)/);
    expect(out).toMatch(/-\s+1 \|.*MECHANICAL/);
    expect(out).toMatch(/\+\s+1 \|.*STRUCTURAL/);
    expect(out).toMatch(/characters shared/);
  });

  test('a prompt of a family this generation never recorded says so rather than guessing', () => {
    const d = describeMiss('You are generating creature intelligence data for a custom D&D 5e statblock.', calls);
    expect(d.family).toBe('enrichment');
    expect(d.nearestIsSameFamily).toBe(false);
  });

  test('it never throws with no recorded calls at all', () => {
    const d = describeMiss(AUDIT, []);
    expect(d.nearest).toBeNull();
    expect(d.summary).toContain('no prompt to compare');
    expect(() => formatMiss(AUDIT, [])).not.toThrow();
  });
});
