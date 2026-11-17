/**
 * TYPED FIXES FOR AUDIT FINDINGS (owner's ruling, 2026-11-16).
 *
 * A fix is deterministic, hybrid or a drop: the audit NAMES the kind from a closed list and gives
 * its one parameter, and the engine writes the change and checks it. Two kinds act — a name that
 * does not fit its row, and a state that never ends — and the rest are logged as labels that count.
 *
 * This replaces the one-row re-authoring call for audit findings. That call re-authored a row from
 * nothing into a closed form with a damage field, and across the tapes it added damage to ten rows
 * that had none, a condition to six, and turned three passive traits into saves.
 */
import { routeFinding, applyAddDuration, onlyTheAllowedThingMoved, rowOrigin, renameDropsAGmWord, FIX_NAMES } from '../typed-fixes.mjs';
import { DURATIONS, durationClause } from '../templates.mjs';

/** Rimewake, from sheet 14 of the baseline tape: a model-written row whose state never ends */
const rimewake = () => ({
  name: 'Rimewake', authored: true,
  text: 'The ground within 10 feet of the creature becomes Difficult Terrain. A creature that starts its turn there has the Restrained condition.',
});
const SPAN = 'A creature that starts its turn there has the Restrained condition.';

describe('add_duration does only its own thing', () => {
  test('one end clause is added and nothing else moves', () => {
    const before = rimewake();
    const { row, outcome } = applyAddDuration(before, { span: SPAN, fix_param: 'target_end' });
    expect(outcome).toBe('acted');
    expect(row.text).toBe('The ground within 10 feet of the creature becomes Difficult Terrain. A creature that starts its turn there has the Restrained condition until the end of its next turn.');
    expect(row.name).toBe(before.name);
    // the dice, damage, conditions, save, DC, area and form are all what they were
    expect(onlyTheAllowedThingMoved(before, row, 'duration')).toBeNull();
  });

  test.each(DURATIONS)('it renders the engine\'s own "%s" clause', (form) => {
    const { row, outcome } = applyAddDuration(rimewake(), { span: SPAN, fix_param: form });
    expect(outcome).toBe('acted');
    expect(row.text).toContain(durationClause(form));
  });

  // THE SPAN IS NOT ALWAYS THE LAST SENTENCE. The first version of the check asked whether the
  // original text was a PREFIX of the result, which can only be true when the quoted span sits at
  // the end of the row — so a mid-row span was refused however correct it was. It cost a real fix
  // on the live run (Echo of the Stolen Chorus) and these tests missed it by quoting an end-of-row
  // span every time.
  test('a span in the MIDDLE of the row is added to, and the rest is left alone', () => {
    const row = { name: 'Echo of the Stolen Chorus', authored: true,
      text: 'The first creature to hit the elemental each turn has Disadvantage on its next attack roll. The elemental then moves up to 10 feet without provoking Opportunity Attacks.' };
    const span = 'The first creature to hit the elemental each turn has Disadvantage on its next attack roll.';
    const { row: after, outcome } = applyAddDuration(row, { span, fix_param: 'target_end' });
    expect(outcome).toBe('acted');
    expect(after.text).toBe('The first creature to hit the elemental each turn has Disadvantage on its next attack roll until the end of its next turn. The elemental then moves up to 10 feet without provoking Opportunity Attacks.');
    // the sentence AFTER the span is untouched
    expect(after.text).toContain('moves up to 10 feet without provoking Opportunity Attacks.');
  });

  test('the result must be the original with exactly one clause added', () => {
    // a row whose span appears to be edited beyond the clause is refused even when the shape holds
    const row = { name: 'R', authored: true, text: 'A creature is Restrained. It then stands.' };
    const r = applyAddDuration(row, { span: 'A creature is Restrained.', fix_param: 'target_end' });
    expect(r.outcome).toBe('acted');
    expect(r.row.text).toBe('A creature is Restrained until the end of its next turn. It then stands.');
  });

  test('the clause itself is accepted as the parameter, and nothing else is', () => {
    expect(applyAddDuration(rimewake(), { span: SPAN, fix_param: 'until the end of its next turn' }).outcome).toBe('acted');
    expect(applyAddDuration(rimewake(), { span: SPAN, fix_param: 'for one hour' }))
      .toMatchObject({ outcome: 'refused', code: 'not_a_duration_form' });
  });

  test('it is refused on a row the model did not write', () => {
    for (const [flag, origin] of [['print', 'print'], ['template', 'body'], ['library', 'body']]) {
      const r = applyAddDuration({ ...rimewake(), authored: false, [flag]: true }, { span: SPAN, fix_param: 'target_end' });
      expect(r).toMatchObject({ outcome: 'refused', code: 'not_a_model_row' });
      expect(rowOrigin({ ...rimewake(), authored: false, [flag]: true })).toBe(origin);
    }
  });

  test('it is refused when the quoted sentence is not found exactly once', () => {
    const twice = { ...rimewake(), text: `${SPAN} ${SPAN}` };
    expect(applyAddDuration(twice, { span: SPAN, fix_param: 'target_end' }))
      .toMatchObject({ outcome: 'refused', code: 'span_not_once' });
    expect(applyAddDuration(rimewake(), { span: 'a sentence the row does not carry', fix_param: 'target_end' }))
      .toMatchObject({ outcome: 'refused', code: 'span_not_once' });
  });

  test('it is refused when the sentence already says when the state ends', () => {
    const already = { ...rimewake(), text: `The ground is Difficult Terrain. ${SPAN.replace(/\.$/, '')} until the end of its next turn.` };
    const r = applyAddDuration(already, { span: `${SPAN.replace(/\.$/, '')} until the end of its next turn.`, fix_param: 'target_end' });
    expect(r).toMatchObject({ outcome: 'refused', code: 'already_ends' });
  });
});

describe('the check refuses anything extra', () => {
  const before = rimewake();
  test.each([
    ['dice', 'and takes 7 (2d6) damage'],
    ['a damage type', 'and takes Fire damage'],
    ['a condition', 'and has the Prone condition'],
    ['a save', 'Dexterity Saving Throw: DC 13'],
    ['an area', 'each creature within 30 feet'],
  ])('a change that adds %s is refused', (_what, added) => {
    const after = { ...before, text: `${before.text} ${added}` };
    expect(onlyTheAllowedThingMoved(before, after, 'duration')).toBeTruthy();
  });

  test('a rename may not touch the rules text at all', () => {
    expect(onlyTheAllowedThingMoved(before, { ...before, name: 'Other' }, 'name')).toBeNull();
    expect(onlyTheAllowedThingMoved(before, { ...before, name: 'Other', text: `${before.text} extra.` }, 'name'))
      .toMatch(/the rules text changed/);
  });

  test('a duration fix may not change the name', () => {
    expect(onlyTheAllowedThingMoved(before, { ...before, name: 'Other' }, 'duration')).toMatch(/the name changed/);
  });

  test('and the original row is what comes back when it is refused', () => {
    const r = applyAddDuration(before, { span: SPAN, fix_param: 'for one hour' });
    expect(r.row).toBe(before);
  });
});

describe('routing', () => {
  const high = (over) => ({ confidence: 'high', span: SPAN, ...over });

  test('a high finding of a kind that acts, acts', () => {
    expect(routeFinding({ row: rimewake(), finding: high({ fix: 'add_duration', fix_param: 'target_end' }) }).outcome).toBe('acted');
  });

  test('rename is logged here — the audit\'s own loop owns renaming', () => {
    const r = routeFinding({ row: rimewake(), finding: high({ fix: 'rename', fix_param: 'Rimewake Hold' }) });
    expect(r.outcome).toBe('logged');
    expect(r.row.name).toBe('Rimewake');
  });

  test.each(['medium', 'low', '', undefined])('a %s-confidence finding does not act', (confidence) => {
    const r = routeFinding({ row: rimewake(), finding: { fix: 'add_duration', fix_param: 'target_end', span: SPAN, confidence } });
    expect(r).toMatchObject({ outcome: 'logged', code: 'not_high_confidence', kind: 'add_duration' });
  });

  test.each(['fix_reference', 'delete_span', 'fill_number', 'reformat', 'clarify', 'none', 'rename'])('%s is logged, not applied', (fix) => {
    const r = routeFinding({ row: rimewake(), finding: high({ fix }) });
    expect(r.outcome).toBe('logged');
    expect(r.row).toEqual(rimewake());
  });

  test('a finding with no fix is logged as unlabelled', () => {
    const r = routeFinding({ row: rimewake(), finding: high({}) });
    expect(r).toMatchObject({ outcome: 'logged', code: 'no_fix_named', kind: 'unlabelled' });
  });

  test('a fix name outside the list is logged, never guessed at', () => {
    expect(routeFinding({ row: rimewake(), finding: high({ fix: 'substitute_noun' }) }))
      .toMatchObject({ outcome: 'logged', code: 'unknown_fix', kind: 'substitute_noun' });
    expect(FIX_NAMES).not.toContain('substitute_noun');
  });

  test.each([['print', 'print'], ['printNamed', 'print'], ['rules', 'print'], ['template', 'body'], ['library', 'body']])
  ('a finding on a %s row is classified and traced, not fixed here', (flag, origin) => {
    const row = { name: 'Rimewake', text: rimewake().text, [flag]: true };
    const r = routeFinding({ row, finding: high({ fix: 'add_duration', fix_param: 'target_end' }) });
    expect(r.outcome).toBe('logged');
    expect(rowOrigin(row)).toBe(origin);
  });

  test('no row of that name is logged, not an error', () => {
    expect(routeFinding({ row: null, finding: high({ fix: 'add_duration' }) }).outcome).toBe('logged');
  });
});

// THE RENAME GUARD IS TESTED WHERE RENAMING HAPPENS. A finding carrying `rename` never reached
// this route — the audit's own rename loop takes it, and that loop carries the claims, weapon and
// part-name guards — so rename logs here and the guard is exercised in r4-seat-authors.spec.js
// against a built sheet.

/**
 * THE GM-WORD GUARD ON A RENAME (widened and then exempted, 2026-11-17).
 *
 * The audit renames a row whose name promises what its text does not deliver, and that is usually
 * right. It is wrong when the name is built from the GM's own words — the Trench Leviathan's
 * "Drowning Song" became "Abyssal Roar" and the request's "song" went with it.
 *
 * And the widened rule was too blunt in one place, which is the exemption below.
 */
describe('a rename may not drop a word the GM typed', () => {
  const gm = ['drowning', 'song', 'ships', 'under'];

  test('it names the words that would be lost', () => {
    expect(renameDropsAGmWord({}, 'Drowning Song', 'Abyssal Roar', gm)).toEqual(['drowning', 'song']);
  });

  test('a rename that keeps the word is free to proceed', () => {
    expect(renameDropsAGmWord({}, 'Drowning Song', 'Drowning Song of the Deep', gm)).toEqual([]);
  });

  test('a word the GM never typed is not guarded', () => {
    expect(renameDropsAGmWord({}, 'Crushing Grip', 'Vice Hold', gm)).toEqual([]);
  });

  test('short words are not guarded — they are not the request\'s substance', () => {
    expect(renameDropsAGmWord({}, 'Song of Woe', 'Dirge', ['of', 'woe'])).toEqual([]);
  });

  // THE EXEMPTION. The Owlbear's "Learned to Climb" is the `leap` template landing as its closest
  // after the fit call refused it, and the row is a pounce — a jump, a Dexterity save, Slashing
  // damage and Prone. Keeping that name because it quotes the request kept a label on the wrong
  // thing, and the sheet shipped "It can replace one attack with a use of Learned to Climb."
  test("a refused template's stand-in is exempt, and may lose the words", () => {
    expect(renameDropsAGmWord({ accepted_closest: true }, 'Learned to Climb', 'Crashing Pounce', ['learned', 'climb']))
      .toEqual([]);
    // the same row without the mark is still guarded
    expect(renameDropsAGmWord({}, 'Learned to Climb', 'Crashing Pounce', ['learned', 'climb']))
      .toEqual(['learned', 'climb']);
  });

  test('it never throws on missing arguments', () => {
    expect(renameDropsAGmWord(null, 'A Name', 'Another', [])).toEqual([]);
    expect(renameDropsAGmWord({}, null, null, gm)).toEqual([]);
  });
});
