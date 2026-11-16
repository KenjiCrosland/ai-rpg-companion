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
import { buildTape, takeAnswer, unusedAnswers } from '../../../../../scripts/lib/tape.mjs';

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
