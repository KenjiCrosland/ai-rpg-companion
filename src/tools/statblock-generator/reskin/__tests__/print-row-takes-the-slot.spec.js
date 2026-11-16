// PRINT'S OWN ROW, AND THE SEAT ROW THAT SHOULD NEVER HAVE SAT BESIDE IT (owner's parked item,
// 2026-11-08; the one FAIL of the H7 twelve).
//
// The cave roper shipped a Multiattack reading "makes two Tentacle attacks, USES REEL, and makes two
// Bite attacks" with no Reel row on the card. Two causes, both here:
//   1. the paste's "is this row already on the sheet" check was UNANCHORED, so print's `Reel`
//      matched the seat's `Reeling Tendril` as a substring and was silently skipped;
//   2. anchoring it alone would ship BOTH — and `hook-drag` is a template `EXCLUDE_ON` already says
//      may not sit beside a containment engine, which is exactly what print's Reel is. The table
//      was only ever read at the menu, and the paste runs long after it.
import { templateExcludedBy, sheetEngines } from '@/tools/statblock-generator/reskin/templates.mjs';
import CORPUS from '@/data/srd52-monsters.json';

const roper = CORPUS.find((m) => m.name === 'Roper');
const printRow = (name) => roper.sections.Actions.find((e) => e.name === name);

describe("print's Reel reaches the sheet, and the seat's reel row yields to it", () => {
  test('the corpus still has the row the Multiattack names', () => {
    expect(printRow('Reel')).toBeTruthy();
    expect(printRow('Multiattack').text).toMatch(/uses Reel/);
  });

  // the substring that caused the skip
  test('a whole-name check tells "Reel" from "Reeling Tendril"', () => {
    const bare = (n) => n.replace(/ \(.*\)$/, '');
    const whole = (name, rows) => rows.some((n) => new RegExp(`^${bare(name)}$`, 'i').test(bare(n)));
    expect(whole('Reel', ['Reeling Tendril', 'Bite'])).toBe(false);  // print's Reel is NOT on this sheet
    expect(whole('Reel', ['Reel', 'Bite'])).toBe(true);              // …and is not pasted twice
  });

  test("print's Reel reads as a containment engine, by its own text", () => {
    expect([...sheetEngines({ Actions: [{ ...printRow('Reel'), print: true }] })]).toContain('containment');
  });

  test('the templates the menu withholds beside containment yield at the paste too', () => {
    const engines = sheetEngines({ Actions: [{ ...printRow('Reel'), print: true }] });
    for (const id of ['hook-drag', 'reel', 'obstacle-pull', 'snare']) expect(templateExcludedBy(id, engines)).toBe(true);
    expect(templateExcludedBy('false-appearance', engines)).toBe(false); // a gate, not a wall
    expect(templateExcludedBy(null, engines)).toBe(false);               // an authored row declares no template
  });

  test('it reads a plain list as well as a Set, so either caller can use it', () => {
    expect(templateExcludedBy('hook-drag', ['containment'])).toBe(true);
    expect(templateExcludedBy('hook-drag', [])).toBe(false);
  });
});
