/**
 * A ROW WRITTEN FOR A CLAUSE THE GM TYPED SURVIVES THE PRINT-CANON PASS (owner's order, 2026-11-18).
 *
 * On a printed body, that pass replaces the CHASSIS's recharge nova with print's own — which is
 * right, because the chassis's is filler the donor brought. It was reading ANY recharge save row in
 * Actions as the chassis's, so the Purple Worm's "Vomited Armoury" — the seat's answer to
 * "swallowed a war-band's armoury" — went with them, and the shipped sheet was print's worm with no
 * armoury anywhere. The owner graded that sheet a Fix for exactly that.
 *
 * COUNTED BEFORE BUILDING IT, on the checkpoint forty: of the 7 rows the pass removed from Actions,
 * **one** carries a typed clause's id. Five are the chassis's own nova renamed by the model, and one
 * had no provenance at all. The trace called all seven "the seat's nova", which is what made one
 * lost answer look like six.
 */
import { generateReskin } from '../generate.mjs';

const CONCEPT = "Purple Worm, that swallowed a war-band's armoury";
const keysOf = (p, field) => { const i = p.indexOf(`"${field}": {`); if (i < 0) return []; return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]); };

/** a twist on print's own Purple Worm, whose body brings a recharge nova of its own */
const build = async (seatAnswer) => {
  let cached = null;
  return generateReskin({
    mechanics: [], archetype: 'brute', concept: CONCEPT, userConcept: CONCEPT, cr: 15,
    path: { path: 'twist', print_body: 'Purple Worm', relation: 'is', class: null },
  }, async (p0) => {
    const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0);
    if (p.startsWith('You are inventing the SIGNATURE ability')) {
      return JSON.stringify({ action: { idea: 'It vomits a war-band\'s worth of rusted iron in a line.', section: 'action', trigger: 'at_will', effect: 'damage', family: 'nova' } });
    }
    if (p.startsWith("A monster's signature ability has been described in plain words")) {
      return JSON.stringify({ template: null, declined_because: 'no_fit', closest: null, missing: 'a line of vomited scrap' });
    }
    if (p.startsWith('You are writing ONE ability')) return JSON.stringify(seatAnswer);
    const rk = keysOf(p, 'renames');
    if (rk.length || !cached) {
      const renames = Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`]));
      cached = JSON.stringify({ name: 'Armoury Worm', type: 'Monstrosity', size: 'Gargantuan', alignment: 'Unaligned',
        senses: 'blindsight 30 ft., tremorsense 60 ft.', languages: 'None', renames, damage_types: {},
        conditions: { condition_minor: 'Prone' }, melee_rider: 'none', projectile: 'scrap', wildcard: '',
        clauses: [CONCEPT] });
    }
    return cached;
  });
};
const rowsOf = (m) => Object.values(m.sections ?? {}).flat().filter((e) => e?.name).map((e) => String(e.name));

const A_CLAUSE_BOUND_NOVA = {
  saves: [{ clause: "swallowed a war-band's armoury", name: 'Vomited Armoury', stat: 'Dexterity',
    target: 'each creature in a 60-foot Line', damage: true, type: 'Acid', condition: null,
    recharge: true, mechanics: 1, quantities: 1 }],
};

describe('a row written for a typed clause survives the print-canon pass', () => {
  test("the seat's recharge nova is on the finished sheet, bound to the clause", async () => {
    const m = await build(A_CLAUSE_BOUND_NOVA);
    const row = Object.values(m.sections ?? {}).flat().find((e) => /^Vomited Armoury/.test(String(e?.name ?? '')));
    expect(row).toBeTruthy();
    expect(row.clauseId ?? row.clause).toBeTruthy();       // it is bound, which is why it stays
    expect(String(row.text)).toMatch(/Saving Throw/);
  }, 30000);

  test("print's own rows are still there beside it", async () => {
    const m = await build(A_CLAUSE_BOUND_NOVA);
    const names = rowsOf(m);
    expect(names).toContain('Multiattack');
    expect(names.some((n) => /^Bite/.test(n))).toBe(true);   // print's worm keeps its own attacks
  }, 30000);

  /**
   * A CHASSIS NOVA IS STILL REMOVED — asserted on the predicate, not end to end.
   *
   * My first version of this blanked the answer's own `clause` field and expected the row to go. It
   * stayed, and correctly: the engine binds a row to the clause it HANDED the seat, not to what the
   * answer says about itself (the rule from 2026-11-17). So a seat row on a clause-carrying seat is
   * always bound, and an unbound recharge nova cannot be produced from a seat answer at all — it is
   * the DONOR's own row, which this fixture has no way to put there.
   *
   * The end-to-end evidence is the checkpoint forty: five renamed chassis novas were removed by this
   * pass on s13, s15, s18, s37 and s39, and all five are still removed after the change — only the
   * Purple Worm's clause-bound armoury now stays.
   */
  test('the skip requires the binding — an unbound row is not exempt', () => {
    const exempt = (row) => !!(row.clauseId || (row.authoredSeat && row.clause));
    expect(exempt({ name: 'Vomited Armoury', clauseId: 'cl_bn8lu2' })).toBe(true);
    expect(exempt({ name: 'Vomited Armoury', authoredSeat: true, clause: "swallowed a war-band's armoury" })).toBe(true);
    expect(exempt({ name: 'Area Nova' })).toBe(false);                       // the chassis's own
    expect(exempt({ name: 'Area Nova', authoredSeat: true })).toBe(false);   // written, but for nothing typed
    expect(exempt({ name: 'Breath Weapon', print: true })).toBe(false);      // print's, skipped earlier anyway
  });
});
