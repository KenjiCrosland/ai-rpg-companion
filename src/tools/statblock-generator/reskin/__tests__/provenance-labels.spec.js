/**
 * A PROVENANCE LABEL MUST NOT ASSERT A RECEIPT THE ROW LACKS.
 *
 * The critic read the print-row-exception list as the engine's account of why a
 * row is on the sheet. Two labels were false: every library draw claimed "the
 * user's words keyed" it (9 of 26 across three runs keyed on nothing) and every
 * template claimed a verb bind even when shape-fit. A confident label reads the
 * same as a true one, which is why this is pinned rather than eyeballed.
 */
import { ridesOn } from '@/tools/statblock-generator/reskin/checker.mjs';

describe('ridesOn', () => {
  it('a seed with the GM\'s matched words says so, and names them', () => {
    const l = ridesOn({ library: true, boundKeys: ['tar', 'cling'] });
    expect(l).toMatch(/keyed on the user's words/);
    expect(l).toContain('tar, cling');
  });

  it('a seed the FALLBACK library drew says no word keyed it', () => {
    const l = ridesOn({ library: true });
    expect(l).toMatch(/fallback library/);
    expect(l).not.toMatch(/keyed on the user's words/); // the old lie
  });

  it('a seed drawn for a clause credits the clause, not words it never matched', () => {
    expect(ridesOn({ library: true, clause: 'drags fishermen under' })).toMatch(/for the user's clause/);
  });

  it('a template bound on a verb says bound; one fit on shape says shape', () => {
    expect(ridesOn({ template: 'adhesive', boundKeys: ['cling'] })).toMatch(/bound on the user's verb/);
    const shape = ridesOn({ template: 'adhesive' });
    expect(shape).toMatch(/shape alone/);
    expect(shape).not.toMatch(/bound on the user's verb/); // the old lie
  });

  it('a free row is named a free row, not a verb bind', () => {
    expect(ridesOn({ template: 'coating', decoration: true })).toMatch(/free row, invented/);
  });

  it('the user\'s own parts and print rows keep their labels', () => {
    expect(ridesOn({ part: true })).toMatch(/own part, feature or species/);
    expect(ridesOn({ kit: true })).toMatch(/own part, feature or species/);
    expect(ridesOn({ print: true })).toBe('print rules row');
  });

  it('a row with no receipt at all gets no label — the caller must not print one', () => {
    expect(ridesOn({})).toBeNull();
    expect(ridesOn({ name: 'Whatever', text: 'x' })).toBeNull();
  });

  it('a receipt never outranks the user\'s own part', () => {
    // precedence: a kit row that also carries a template stamp is still the kit's
    expect(ridesOn({ kit: true, template: 'adhesive' })).toMatch(/own part, feature or species/);
  });
});

/**
 * ONE READER FOR "WHAT DOES THIS SHEET IMPOSE".
 *
 * The payoff gate had its own regex, which accepted Evasion's "can't use this
 * trait if it has the Incapacitated condition" as an imposition — so a payoff
 * keyed on Incapacitated could be seated on any sheet carrying Evasion. The
 * shared reader rejects it via a guard the private copy never had.
 */
describe('imposedConditions is the only reader', () => {
  const { imposedConditions } = require('@/tools/statblock-generator/reskin/author.mjs');

  it('reads print\'s two-condition plural form — 13 rows in the corpus use it', () => {
    expect(imposedConditions({ name: 'Swallow', text: 'While swallowed, the target has the Blinded and Restrained conditions, has Total Cover.' }))
      .toEqual(expect.arrayContaining(['Blinded', 'Restrained']));
  });

  it('still reads the singular form', () => {
    expect(imposedConditions({ name: 'X', text: 'the target has the Restrained condition.' })).toEqual(['Restrained']);
  });

  it('refuses a condition the row only TESTS on itself', () => {
    expect(imposedConditions({ name: 'Evasion', text: "It can't use this trait if it has the Incapacitated condition." })).toEqual([]);
  });

  it('a declared record outranks the prose', () => {
    expect(imposedConditions({ name: 'X', imposes: 'Prone', text: 'the target has the Restrained condition.' })).toEqual(['Prone']);
  });
});

/**
 * A MULTI-CONDITION RECORD SURVIVES THE RECONCILE.
 *
 * `swallow` declares ['Prone','Blinded','Restrained'] and `hook-drag`
 * ['Grappled','Restrained']. The reconcile compared String(e.imposes) —
 * "Prone,Blinded,Restrained" — against the reader's list, so both templates lost
 * their declared record every time, silently.
 */
describe('multi-condition records', () => {
  const { imposedConditions } = require('@/tools/statblock-generator/reskin/author.mjs');

  // the reconcile's own comparison, per condition
  const reconcile = (row) => {
    const rec = [row.imposes].flat().filter(Boolean).map(String);
    const read = imposedConditions({ name: row.name, text: row.text });
    const kept = rec.filter((c) => read.includes(c));
    return kept.length ? (kept.length === 1 ? kept[0] : kept) : undefined;
  };

  it('keeps every condition the text still supports', () => {
    expect(reconcile({ name: 'Swallow', imposes: ['Blinded', 'Restrained'],
      text: 'the target has the Blinded and Restrained conditions.' })).toEqual(['Blinded', 'Restrained']);
  });

  it('keeps the survivors and drops only what left', () => {
    expect(reconcile({ name: 'Swallow', imposes: ['Prone', 'Blinded', 'Restrained'],
      text: 'the target has the Blinded and Restrained conditions.' })).toEqual(['Blinded', 'Restrained']);
  });

  it('drops the record only when nothing in it is supported', () => {
    expect(reconcile({ name: 'X', imposes: ['Grappled'], text: 'it deals 10 damage.' })).toBeUndefined();
  });

  it('a single-condition record still collapses to a string', () => {
    expect(reconcile({ name: 'X', imposes: ['Prone', 'Grappled'],
      text: 'the target has the Prone condition.' })).toBe('Prone');
  });
});
