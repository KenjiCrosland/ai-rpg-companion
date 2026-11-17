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
import { routeFinding, applyRename, applyAddDuration, onlyTheAllowedThingMoved, rowOrigin, FIX_NAMES } from '../typed-fixes.mjs';
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
    expect(applyAddDuration(rimewake(), { span: SPAN, fix_param: 'for one hour' }).reason).toMatch(/not one of the engine's duration forms/);
  });

  test('it is refused on a row the model did not write', () => {
    for (const [flag, word] of [['print', 'print'], ['template', 'body'], ['library', 'body']]) {
      const r = applyAddDuration({ ...rimewake(), authored: false, [flag]: true }, { span: SPAN, fix_param: 'target_end' });
      expect(r.outcome).toBe('refused');
      expect(r.reason).toContain(word);
    }
  });

  test('it is refused when the quoted sentence is not found exactly once', () => {
    const twice = { ...rimewake(), text: `${SPAN} ${SPAN}` };
    expect(applyAddDuration(twice, { span: SPAN, fix_param: 'target_end' }).reason).toMatch(/appears 2 times/);
    expect(applyAddDuration(rimewake(), { span: 'a sentence the row does not carry', fix_param: 'target_end' }).reason).toMatch(/appears 0 times/);
  });

  test('it is refused when the sentence already says when the state ends', () => {
    const already = { ...rimewake(), text: `The ground is Difficult Terrain. ${SPAN.replace(/\.$/, '')} until the end of its next turn.` };
    const r = applyAddDuration(already, { span: `${SPAN.replace(/\.$/, '')} until the end of its next turn.`, fix_param: 'target_end' });
    expect(r.outcome).toBe('refused');
    expect(r.reason).toMatch(/already says when the state ends/);
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
    expect(routeFinding({ row: rimewake(), finding: high({ fix: 'rename', fix_param: 'Rimewake Hold' }) }).outcome).toBe('acted');
  });

  test.each(['medium', 'low', '', undefined])('a %s-confidence finding does not act', (confidence) => {
    const r = routeFinding({ row: rimewake(), finding: { fix: 'rename', fix_param: 'Rimewake Hold', confidence } });
    expect(r.outcome).toBe('logged');
    expect(r.reason).toMatch(/only high acts/);
  });

  test.each(['fix_reference', 'delete_span', 'fill_number', 'reformat', 'clarify', 'none'])('%s is logged, not applied', (fix) => {
    const r = routeFinding({ row: rimewake(), finding: high({ fix }) });
    expect(r.outcome).toBe('logged');
    expect(r.row).toEqual(rimewake());
  });

  test('a finding with no fix is logged as unlabelled', () => {
    const r = routeFinding({ row: rimewake(), finding: high({}) });
    expect(r).toMatchObject({ outcome: 'logged', kind: 'unlabelled' });
    expect(r.reason).toMatch(/carries no fix/);
  });

  test('a fix name outside the list is logged, never guessed at', () => {
    expect(routeFinding({ row: rimewake(), finding: high({ fix: 'substitute_noun' }) }).reason).toMatch(/is not one of the fixes/);
    expect(FIX_NAMES).not.toContain('substitute_noun');
  });

  test.each([['print', 'print'], ['printNamed', 'print'], ['rules', 'print'], ['template', 'body'], ['library', 'body']])
  ('a finding on a %s row is classified and traced, not fixed here', (flag, origin) => {
    const row = { name: 'Rimewake', text: rimewake().text, [flag]: true };
    const r = routeFinding({ row, finding: high({ fix: 'rename', fix_param: 'Other' }) });
    expect(r.outcome).toBe('logged');
    expect(rowOrigin(row)).toBe(origin);
  });

  test('no row of that name is logged, not an error', () => {
    expect(routeFinding({ row: null, finding: high({ fix: 'rename' }) }).outcome).toBe('logged');
  });
});

describe('the rename guard', () => {
  // The Trench Leviathan's "Drowning Song": the GM typed "song", and the audit renamed it away.
  const song = () => ({ name: 'Drowning Song', text: 'Each creature within 30 feet makes a DC 17 Constitution Saving Throw.', authored: true });

  test('a rename that drops a word of the request is refused', () => {
    const r = applyRename(song(), { fix_param: 'Drowning Chord' }, { gmWords: ['drowning', 'song'] });
    expect(r.outcome).toBe('refused');
    expect(r.reason).toMatch(/drops "song", which the GM typed/);
    expect(r.row).toEqual(song());
  });

  test('a rename that keeps it is applied', () => {
    const r = applyRename(song(), { fix_param: 'Drowning Song of the Deep' }, { gmWords: ['drowning', 'song'] });
    expect(r.outcome).toBe('acted');
    expect(r.row.name).toBe('Drowning Song of the Deep');
    expect(r.row.text).toBe(song().text);
  });

  test('a word the GM never typed is not guarded', () => {
    expect(applyRename(song(), { fix_param: 'Crushing Depths' }, { gmWords: ['leviathan'] }).outcome).toBe('acted');
  });

  test('the use-limit suffix is kept across a rename', () => {
    const r = applyRename({ ...song(), name: 'Drowning Song (Recharge 5-6)' }, { fix_param: 'Drowning Song of the Deep' }, { gmWords: ['song'] });
    expect(r.row.name).toBe('Drowning Song of the Deep (Recharge 5-6)');
  });

  test('a rename to the name it already has is refused', () => {
    expect(applyRename(song(), { fix_param: 'Drowning Song' }, {}).reason).toMatch(/already has/);
    expect(applyRename(song(), { fix_param: '' }, {}).reason).toMatch(/named no replacement/);
  });
});
