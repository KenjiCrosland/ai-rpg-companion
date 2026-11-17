/**
 * THE ROW THE SEAT WROTE FOR A LACK IS NOT DELETED BY THAT LACK (2026-11-17).
 *
 * The GM typed "Adult Red Dragon — blind in one eye from an old lance" and the sheet that shipped
 * was a plain Adult Red Dragon. Of the 13 twists on printed monsters on the baseline tape, 12 add a
 * row for the twist and this one did not.
 *
 * THE CHAIN. The engine reads the words as a `lacks` clause. The seat writes "Ruined Eye, Wary Ear"
 * for it. The free-row budget keeps it and the audit reads it. Then the lacks pass — whose whole job
 * is removing a capability the absence takes away — deletes it, and the flaw-row builder stands down
 * because "the lack already removed something", so `Sight Weakness` never lands either. Nothing on
 * the sheet answers the clause, while the record still says `free_rows: 1`.
 *
 * WHY THE EXEMPTION MISSED. `ownsThisLack` already existed for exactly this row. It compared WORDS:
 * every word of the clause's text had to appear in `row.clause`. But `row.clause` is a COPY of text,
 * and on this roll the seat's row carried the IDEA's sentence — "The dragon's ruined left eye leaves
 * a permanent blind side…" — which shares almost nothing with the clause. So the test failed on the
 * one row it was written to protect.
 *
 * Measured across 289 saved sheets (251 fixture, 38 tape): 24 carry a lacks clause, and NOT ONE had
 * a row bound to it by clause id or by exact text. The join key was never being set.
 *
 * THE FIX. The clause's id travels with the text a seat is handed, the row carries it, and the lacks
 * pass compares ids. These tests drive the real engine: the stub answers the reskin call's `clauses`
 * and `lacks` fields, so the clause record is built by `groundedClauses` with a real id and a real
 * `polarity: 'lacks'` — nothing about the lack is hand-written here.
 */
import { generateReskin } from '../generate.mjs';
import { groundedClauses } from '../generate.mjs';

const CONCEPT = 'Adult Red Dragon — blind in one eye from an old lance';
/** the row's own clause text is the IDEA's sentence, which is what defeated the word test */
const IDEA = "The dragon's ruined left eye leaves a permanent blind side it has learned to cover by ear.";
const ROW = 'Ruined Eye, Wary Ear';

const keysOf = (p, field) => { const i = p.indexOf(`"${field}": {`); if (i < 0) return []; return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]); };

const stub = ({ rowClause = IDEA } = {}) => {
  let cached = null;
  return async (p0) => {
    const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
    if (p.startsWith('You are inventing the SIGNATURE ability')) {
      return JSON.stringify({ trait: { idea: IDEA, section: 'trait', trigger: 'always', effect: 'other', family: 'none' } });
    }
    if (p.startsWith("A monster's signature ability has been described in plain words")) {
      return JSON.stringify({ template: null, declined_because: 'no_fit', closest: null, missing: 'a creature that covers a blind side by ear' });
    }
    if (p.startsWith('You are writing ONE ability')) {
      return JSON.stringify({ traits: [{ clause: rowClause, name: ROW, trigger: 'While the dragon can hear',
        effect: 'it does not suffer Disadvantage on attack rolls for being unable to see a creature it can hear within 30 feet',
        imposes: null, condition_relation: 'none', acts: null, heals: false, mechanics: 1, quantities: 0, passive_effect: 'defense' }] });
    }
    const rk = keysOf(p, 'renames');
    if (rk.length || !cached) {
      const renames = Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`]));
      cached = JSON.stringify({ name: 'Adult Red Dragon', type: 'Dragon', size: 'Huge', alignment: 'Chaotic Evil',
        senses: 'darkvision 120 ft.', languages: 'Common, Draconic', renames, damage_types: {},
        conditions: { condition_minor: 'Prone' }, melee_rider: 'none', projectile: 'fire', wildcard: '',
        // the clause list and the lack come from the CALL, as they do in production
        clauses: [CONCEPT], lacks: [{ quote: 'blind in one eye', takes: 'sight' }] });
    }
    return cached;
  };
};

const build = (opts) => generateReskin({
  mechanics: [], archetype: 'brute', concept: CONCEPT, userConcept: CONCEPT, cr: 17,
  path: { path: 'twist', print_body: 'Adult Red Dragon', relation: 'is', class: null },
}, stub(opts));

const rowsOf = (m) => Object.values(m.sections ?? {}).flat().filter((e) => e?.name);

describe('the clause record the engine actually builds', () => {
  test('the GM\'s words become a lacks clause WITH an id, which is the join key', () => {
    const [c] = groundedClauses([CONCEPT], CONCEPT, () => {}, [{ quote: 'blind in one eye', takes: 'sight' }]);
    expect(c.polarity).toBe('lacks');
    expect(c.takes).toBe('sight');
    expect(c.id).toMatch(/^cl_/);
  });
});

describe('a row written for a lack survives that lack', () => {
  test('the row is on the finished sheet, carrying the lack\'s own clause id', async () => {
    const m = await build();
    const row = rowsOf(m).find((e) => e.name === ROW);
    expect(row).toBeTruthy();
    const lack = (m.generation?.clauses ?? []).find((c) => c.polarity === 'lacks');
    expect(lack?.id).toBeTruthy();
    expect(row.clauseId).toBe(lack.id);
  }, 30000);

  test('it survives even though its own clause text is the IDEA\'s sentence', async () => {
    // the exact shape that defeated the word comparison: the row's clause and the lack's text
    // share almost no words
    const m = await build();
    const row = rowsOf(m).find((e) => e.name === ROW);
    expect(row.clause).toBe(IDEA);
    const lack = (m.generation?.clauses ?? []).find((c) => c.polarity === 'lacks');
    const words = (t) => String(t).toLowerCase().match(/[a-z']+/g)?.filter((w) => w.length > 2) ?? [];
    expect(words(lack.text).every((w) => words(row.clause).includes(w))).toBe(false); // the old test's question
    expect(rowsOf(m).map((e) => e.name)).toContain(ROW);                              // and the new answer
  }, 30000);

  test('the record agrees with what ships', async () => {
    const m = await build();
    expect(m.generation.free_rows).toBe(rowsOf(m).filter((e) => e.freeRow).length);
    expect(m.generation.expressed_rows).toBe(rowsOf(m).filter((e) => e.freeRow && !e.decoration).length);
  }, 30000);

  test('the exemption is keyed on the id, so it covers exactly the rows the engine handed that clause', async () => {
    // MY FIRST VERSION OF THIS TEST ASSERTED THE WRONG THING. It changed the text the model put in
    // the answer's `clause` field and expected the row to lose its exemption — but the binding does
    // not come from that text. It comes from the clause the ENGINE HANDED the seat, which is the
    // whole point: the model's prose cannot decide which clause its row answers.
    const m = await build({ rowClause: "and it hoards a war-band's armoury" });
    const lack = (m.generation?.clauses ?? []).find((c) => c.polarity === 'lacks');
    const row = rowsOf(m).find((e) => e.name === ROW);
    expect(row).toBeTruthy();
    expect(row.clauseId).toBe(lack.id);         // handed the lack, so bound to it whatever it wrote
    // and every row the engine did NOT hand that clause carries no id for it, so the capability
    // removal still governs them — that direction is unchanged and tested in lacks-flaw-row.spec.js
    const others = rowsOf(m).filter((e) => e.name !== ROW);
    expect(others.length).toBeGreaterThan(3);
    expect(others.every((e) => e.clauseId !== lack.id)).toBe(true);
  }, 30000);
});
