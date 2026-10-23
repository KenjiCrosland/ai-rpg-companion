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
