/**
 * THE DONOR TABLE DECLARES WHAT ITS ROWS IMPOSE. `imposes` is the field every
 * downstream reader uses (payoff reachability, the save-stat pass, reconcile,
 * both printings' condition grammar); a row that imposes a condition in prose
 * and carries no record forces each of them back to re-reading text. 11 donor
 * rows owed it (Swallow x8, Engulf x3: Blinded + Restrained) and 4 declared
 * half of it (the hold line's attack: Grappled, while its text also restrains).
 * This pins the data so it cannot drift back, using the one shared reader.
 * (Tag-vs-text agreement for TAGGED rows lives in imposes-grammar.spec; this
 * covers the untagged rows and the chassis fill site's precondition.)
 */
import { imposedConditions } from '@/tools/statblock-generator/reskin/author.mjs';
import * as D from '@/tools/statblock-generator/reskin/donors.mjs';

const donors = D.DONORS ?? D.default ?? Object.values(D).find((v) => Array.isArray(v));
const rows = [];
const walk = (o) => {
  if (!o || typeof o !== 'object') return;
  if (Array.isArray(o)) return o.forEach(walk);
  if (typeof o.text === 'string' && typeof o.name === 'string') rows.push(o);
  for (const [k, v] of Object.entries(o)) if (k !== 'text') walk(v);
};
walk(donors);

describe('donor rows declare the conditions their text imposes', () => {
  it('walks a real table', () => { expect(rows.length).toBeGreaterThan(500); });

  it('no row imposes a condition in prose without a record', () => {
    const owe = rows.filter((r) => imposedConditions({ text: r.text }).length && !r.imposes).map((r) => r.name);
    expect(owe).toEqual([]);
  });

  it('every {condition_minor} slot is an imposition, so the fill site may record its pick', () => {
    // generate.mjs stamps `imposes` when it fills this slot on a chassis row;
    // that is only true if the slot never sits in a requirement
    // ("one creature that has the {condition_minor} condition").
    const uses = rows.filter((r) => r.text.includes('{condition_minor}'));
    expect(uses.length).toBeGreaterThan(10);
    for (const r of uses) expect(r.text).toMatch(/(?:the target|it) has the \{condition_minor\} condition/i);
  });
});
