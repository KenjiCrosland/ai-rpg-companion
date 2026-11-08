// PRINT'S ATTACK LIST IS LOCKED ON A PRINT BODY (owner's ruling, 2026-11-08; critic
// #17 and #01). Two mechanisms, one principle: on the twist and exact paths the sheet
// carries every attack row print names, and no more attacks than print makes.
//
// These assert the DATA and the GATES the two mechanisms turn on, read off the real
// corpus — the full pipeline is covered by the twelve. The gates are what regressed
// before: a positional pairing that never visits print's tail row, and a Multiattack
// paste that does nothing when print has none.
import { printCanonFor, nearPrintCr } from '../generate.mjs';
import { checkBlock } from '../checker.mjs';

describe("print's attack list on a print body", () => {
  // MECHANISM #17 — the Pit Fiend's Fiery Mace never arrives. The rename pass pairs the
  // sheet's melee rows positionally with `pc.meleeRows`, so a sheet that wrote two rows
  // leaves print's THIRD unvisited, and print's three-name Multiattack is then pasted
  // over it. Because the pairing is positional the unmapped rows are always the tail,
  // which is why the add-back is `pc.meleeRows.slice(meleeRows.length)`.
  test("the Pit Fiend names three melee rows, so a sheet that wrote two is short by the tail", () => {
    const pc = printCanonFor('Pit Fiend', 20);
    expect(pc.exact).toBe(true);
    expect(pc.meleeRows.map((r) => r.name)).toEqual(['Bite', 'Devilish Claw', 'Fiery Mace']);
    expect(pc.multiattack).toMatch(/Fiery Mace/); // the sentence cites the row the sheet lacked
    // the add-back's own arithmetic: two written, so print's tail is exactly [Fiery Mace]
    expect(pc.meleeRows.slice(2).map((r) => r.name)).toEqual(['Fiery Mace']);
    for (const pr of pc.meleeRows.slice(2)) { expect(pr.text).toBeTruthy(); expect(Number.isFinite(pr.bonus)).toBe(true); } // the add-back skips a row missing either
  });

  // MECHANISM #01 — print's Dire Wolf has Bite and NO Multiattack, so a chassis
  // Multiattack doubled print's own verbatim row: 16 damage a round against print's 8
  // at the very same CR.
  test('the Dire Wolf names no Multiattack, and print rules its CR', () => {
    const pc = printCanonFor('Dire Wolf', 1);
    expect(pc.multiattack).toBeNull();
    expect(pc.meleeRows.map((r) => r.name)).toEqual(['Bite']);
    expect(nearPrintCr(1, pc.cr)).toBe(true); // print's numbers govern, so print's COUNT may too
  });

  // THE SAFETY, AND IT IS LOAD-BEARING. The exposure list handed to this build also named
  // the Skeleton — print's Skeleton has no Multiattack either, and 3 of 3 sheets shipped
  // one. Stripping it would have been wrong: those sheets are CR 6 on a `brute-5` donor
  // borrowing only the Skeleton's row NAMES, and a CR 6 brute is priced for two attacks.
  // Print's CR 1/4 Skeleton says nothing about a CR 6 one.
  test("a far-CR print body does NOT lend its attack count — the CR 6 Skeleton keeps its Multiattack", () => {
    const pc = printCanonFor('Skeleton', 6);
    expect(pc.multiattack).toBeNull();      // print has none...
    expect(nearPrintCr(6, pc.cr)).toBe(false); // ...but print's CR does not govern, so the strip stands down
  });

  // the Vampire was the other false lead: print's row is "Multiattack (Vampire Form
  // Only)", which a bare-name match misses and `/^Multiattack\b/i` catches. A sheet on
  // the Vampire must never reach the strip at all.
  test("a form-suffixed Multiattack still counts as print's", () => {
    expect(printCanonFor('Vampire', 13).multiattack).toMatch(/^The vampire makes|Multiattack|attack/i);
    expect(printCanonFor('Vampire', 13).multiattack).toBeTruthy();
  });
});

// STRIPPING THE MULTIATTACK MUST NOT ORPHAN THE ROW THAT JOINED IT. Measured on the
// fortys: the Dire Wolf's control row is seat-authored and at-will, and its Multiattack
// carried the only way to use it ("It can replace one attack with a use of X"). Remove
// the Multiattack and the checker's `gate-fit` fails that row — 1 of 3 forty sheets would
// have turned FAIL on the strip alone. The engine's answer is the inverse of the arm that
// sheds a gate to JOIN a Multiattack: with none to join, an ungated control row takes a
// Recharge. These assert the checker rule both ways, so the pairing cannot drift apart.
describe('an at-will condition action needs a Multiattack or a use limit', () => {
  // the checker's own fixture shape (checker.spec.js `base`), so this asserts the rule and
  // not my guess at the block schema
  const sheet = (actions) => ({
    name: 'Dire Wolf', format: '2024', size: 'Large', type: 'Monstrosity', alignment: 'Unaligned',
    ac: 14, hp: 30, hp_formula: '4d10 + 8', speed: '50 ft.',
    stats: { STR: 17, DEX: 15, CON: 15, INT: 3, WIS: 12, CHA: 7 }, saves: {}, skills: '',
    senses: 'Passive Perception 11', languages: 'None', initiative_bonus: 2,
    cr: 1, cr_str: '1', pb: 2, xp: 200, generation: { donor: 'skirmisher-1' },
    sections: { Traits: [], Actions: actions },
  });
  const bite = { name: 'Bite', text: '*Melee Attack Roll:* +5, reach 5 ft. 8 (1d10 + 3) Piercing damage.', print: true };
  const lunge = (name) => ({ name, text: '*Strength Saving Throw:* DC 13, one creature within 5 feet. *Failure:* The target has the Prone condition.' });
  // checkBlock reports per-GATE: `gates.<gate>.findings[]`, each with `rule`/`severity`.
  // `fails` is only the list of gate NAMES, which is what a first pass of this test read.
  const gateFits = (b) => Object.values(checkBlock(b).gates).flatMap((g) => g.findings ?? [])
    .filter((f) => f.rule === 'gate-fit' && f.severity === 'fail');

  test('ungated, with no Multiattack, is the FAIL this pairing exists to prevent', () => {
    const hits = gateFits(sheet([bite, lunge('Fur-Bristled Lunge')]));
    expect(hits).toHaveLength(1);
    expect(hits[0].message).toMatch(/Fur-Bristled Lunge/);
  });

  test('the same row with a Recharge passes — which is what the engine now gives it', () => {
    expect(gateFits(sheet([bite, lunge('Fur-Bristled Lunge (Recharge 5-6)')]))).toHaveLength(0);
  });

  test('and ungated BESIDE a Multiattack passes, so the strip is what creates the need', () => {
    const ma = { name: 'Multiattack', text: 'The dire wolf makes two Bite attacks. It can replace one attack with a use of Fur-Bristled Lunge.' };
    expect(gateFits(sheet([ma, bite, lunge('Fur-Bristled Lunge')]))).toHaveLength(0);
  });
});
