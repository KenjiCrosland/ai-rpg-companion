/**
 * THE AUDIT NAMES THE DEFECT, AND NOTHING ACTS ON IT (owner's ruling, 2026-11-17).
 *
 * `clarify` said a row needed rewriting and not what was wrong with it, and it was 86% of
 * everything the audit asked for on the forty — so it could neither be acted on nor counted. The
 * audit now answers one word from a closed list, and the engine LOGS it: the label is the gauge for
 * the later change to how abilities are written, giving the count before and the count after.
 *
 * Two things used to act here and both are gone. The one-row repair was deleted on 2026-11-17
 * (unreachable, and it had made five rows worse for three it improved). `add_duration` goes with
 * this commit: named six times across two runs, acted on none, rightly each time — four were medium
 * confidence and the two high ones quoted a span that was not a whole sentence.
 *
 * Renaming is untouched and is not tested here: a finding carrying `rename` is taken by the audit's
 * own loop, with the claims, weapon, part-name and GM-word guards. The guard's test lives in
 * `r4-seat-authors.spec.js`, against the path that actually renames.
 *
 * These tests read RETURN VALUES. None reads a prompt's wording.
 */
import { routeFinding, rowOrigin, renameDropsAGmWord, formatFinding, DEFECT_NAMES, DEFECTS, ORIGIN_WORDS } from '../typed-fixes.mjs';

const ROW = 'Rimewake';
const TEXT = 'Rime crusts the ground around the wolf. A creature that starts its turn within 5 feet has the Restrained condition.';
const SPAN = 'A creature that starts its turn within 5 feet has the Restrained condition.';
const rimewake = (over = {}) => ({ name: ROW, authored: true, text: TEXT, ...over });
const finding = (over = {}) => ({ confidence: 'high', issue: 'the state never ends', span: SPAN, ...over });

describe('the closed list is the owner\'s, and every value is described', () => {
  test('it is exactly the seven the ruling names', () => {
    expect(DEFECT_NAMES).toEqual(['misnamed', 'untrackable', 'open_ended', 'dead_reference', 'wording', 'weak', 'other']);
  });

  test('each one says what it means, so the log needs no key', () => {
    for (const d of DEFECT_NAMES) expect(DEFECTS[d].length).toBeGreaterThan(20);
  });
});

describe('every defect is logged, and the row comes back unchanged', () => {
  test.each(DEFECT_NAMES)('%s returns the row untouched and a log entry with that label', (defect) => {
    const before = rimewake();
    const r = routeFinding({ row: before, finding: finding({ defect }) });
    expect(r).toMatchObject({ outcome: 'logged', defect });
    expect(r.row).toBe(before);              // the same object, not a copy
    expect(r.row.text).toBe(TEXT);           // and its text did not move
  });

  test('a label outside the list is logged as other, and what the audit said is kept', () => {
    const r = routeFinding({ row: rimewake(), finding: finding({ defect: 'substitute_noun' }) });
    expect(r).toMatchObject({ outcome: 'logged', defect: 'other', declared: 'substitute_noun' });
    expect(DEFECT_NAMES).not.toContain('substitute_noun');
  });

  test('a finding with no defect at all is logged as other, with nothing claimed about it', () => {
    const r = routeFinding({ row: rimewake(), finding: finding({}) });
    expect(r).toMatchObject({ outcome: 'logged', defect: 'other', declared: null });
  });

  test('the entry carries the issue and the span, which the last log left out', () => {
    const r = routeFinding({ row: rimewake(), finding: finding({ defect: 'open_ended' }) });
    expect(r.issue).toBe('the state never ends');
    expect(r.span).toBe(SPAN);
    expect(r.confidence).toBe('high');
  });

  test('a finding whose issue arrives as `message` is read all the same', () => {
    const r = routeFinding({ row: rimewake(), finding: { defect: 'wording', message: 'its pronoun is wrong' } });
    expect(r.issue).toBe('its pronoun is wrong');
    expect(r.confidence).toBe('none');       // absent is not low
  });

  test('NOTHING acts, whatever the confidence — there is no outcome but logged', () => {
    for (const confidence of ['high', 'medium', 'low', '', undefined]) {
      for (const defect of DEFECT_NAMES) {
        expect(routeFinding({ row: rimewake(), finding: { defect, confidence, span: SPAN } }).outcome).toBe('logged');
      }
    }
  });
});

describe('the row\'s origin has four values, and a refused template\'s stand-in is its own', () => {
  test.each([
    ['model', { authored: true }],
    ['model', { freeRow: true }],
    ['print', { print: true }],
    ['print', { printNamed: true }],
    ['print', { rules: true }],
    ['catalog', { template: 'fear-aura' }],
    ['catalog', { library: true }],
    ['catalog', {}],
    ['closest', { accepted_closest: true, authored: true }],
  ])('%s', (origin, flags) => {
    expect(rowOrigin({ name: ROW, text: TEXT, ...flags })).toBe(origin);
  });

  test('a stand-in is NOT counted as model-written, which is the point of the fourth value', () => {
    // the fit call refused every template and the engine seated the nearest shape anyway, so the
    // row does something its name was never about — the Owlbear's "Learned to Climb" on a pounce
    expect(rowOrigin({ accepted_closest: true, authored: true })).not.toBe('model');
    expect(routeFinding({ row: rimewake({ accepted_closest: true }), finding: finding({ defect: 'misnamed' }) }).origin).toBe('closest');
  });

  test('no row of that name is its own answer, not an origin', () => {
    expect(rowOrigin(null)).toBe('missing');
    expect(routeFinding({ row: null, finding: finding({ defect: 'dead_reference' }) }).origin).toBe('missing');
  });

  test('every origin has a word the log prints', () => {
    for (const o of ['model', 'catalog', 'print', 'closest', 'missing']) expect(ORIGIN_WORDS[o]).toBeTruthy();
  });
});

describe('the log line reads alone', () => {
  test('it carries the row, its origin, the confidence, the defect, the issue and the span', () => {
    const entry = routeFinding({ row: rimewake(), finding: finding({ defect: 'open_ended' }) });
    const line = formatFinding({ section: 'Traits', name: ROW, entry });
    expect(line).toContain('Traits/"Rimewake"');
    expect(line).toContain('[model-written]');
    expect(line).toContain('high');
    expect(line).toContain('open_ended');
    expect(line).toContain('the state never ends');          // the issue IN FULL, not clipped
    expect(line).toContain(`(about: "${SPAN}")`);
  });

  test('a label outside the list says so, so `other` can be re-cut from the log', () => {
    const entry = routeFinding({ row: rimewake(), finding: finding({ defect: 'substitute_noun' }) });
    expect(formatFinding({ section: 'Traits', name: ROW, entry })).toContain('the audit said "substitute_noun"');
  });

  test('a finding with no span prints no empty parenthetical', () => {
    const entry = routeFinding({ row: rimewake(), finding: { defect: 'weak', issue: 'outclassed by its own Bite' } });
    expect(formatFinding({ section: 'Actions', name: ROW, entry })).not.toContain('(about:');
  });
});

describe('the GM-word guard is unchanged, and still belongs to the rename loop', () => {
  test('a rename dropping a word the GM typed names the words it would lose', () => {
    expect(renameDropsAGmWord({ name: 'Drowning Song' }, 'Drowning Song', 'Abyssal Roar', ['drowning', 'song'])).toEqual(['drowning', 'song']);
  });

  test('a rename that keeps the word is free to proceed', () => {
    expect(renameDropsAGmWord({ name: 'Drowning Song' }, 'Drowning Song', 'Drowning Chorus', ['drowning', 'song'])).toEqual(['song']);
    expect(renameDropsAGmWord({ name: 'Drowning Song' }, 'Drowning Song', 'Song of Drowning', ['drowning', 'song'])).toEqual([]);
  });

  test("a refused template's stand-in is exempt — the Owlbear keeps being renamed", () => {
    expect(renameDropsAGmWord({ accepted_closest: true }, 'Learned to Climb', 'Crashing Pounce', ['learned', 'climb'])).toEqual([]);
  });
});

describe('the span is printed once, not twice', () => {
  test("an issue read off `message` drops the normaliser's own parenthetical", () => {
    // the engine's finding normaliser appends the span to `message`; printing `span` beside it
    // said the same 150-character sentence twice
    const r = routeFinding({
      row: { name: 'R', authored: true, text: 'x' },
      finding: { defect: 'open_ended', span: 'the target is Restrained', confidence: 'high',
        message: 'the state never ends (about: "the target is Restrained")' },
    });
    expect(r.issue).toBe('the state never ends');
    const line = formatFinding({ section: 'Traits', name: 'R', entry: r });
    expect(line.match(/the target is Restrained/g) ?? []).toHaveLength(1);
  });

  test('an issue that carries no parenthetical is untouched', () => {
    const r = routeFinding({ row: { name: 'R', authored: true }, finding: { defect: 'weak', issue: 'outclassed (plainly) by its Bite' } });
    expect(r.issue).toBe('outclassed (plainly) by its Bite');
  });
});
