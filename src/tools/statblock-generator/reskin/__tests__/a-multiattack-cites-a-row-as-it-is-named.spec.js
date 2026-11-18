/**
 * A MULTIATTACK CITES A ROW AS THE ROW IS NAMED (item 1.1, 2026-11-18).
 *
 * The Multiattack is composed while a nova row is still gated, so it writes "a use of Molten Seam
 * (Recharge 5-6)". The ONE-NOVA RULE then un-gates that row — the chassis already carries a
 * Recharge nova, so the seat's gate leaves (`generate.mjs`, "one nova:") — and the citation keeps a
 * Recharge the sheet no longer has anywhere. Three of the forty shipped it: the Glacierheart's
 * Glacial Advance, the Brass Tyrant's Molten Seam, the Trenchsong Leviathan's Brineplate
 * Detonation. The Brass Tyrant's own rows are the fixture below, copied from the sheet.
 *
 * WHAT PRINT DOES, measured on srd52-monsters.json: of the 27 "use of X" citations whose row
 * resolves, ZERO carry a usage parenthetical — including the one whose row IS gated, the Chimera's
 * "Fire Breath (Recharge 5-6)", which print cites bare. So a citation is the row's BARE name and a
 * parenthetical in a citation is always stale. The handoff asked for "the bare name, then the row's
 * own parenthetical if it has one"; print disagrees 1 of 1, and print rules calibration, so the
 * second test below is the Chimera's case and asserts the citation stays bare with the gate KEPT.
 *
 * WHY THE GATE AND NOT THE NAME. A citation whose row was renamed is `sweepDeadName`'s — it is
 * handed the dead name and re-points or drops the clause, which is pinned behaviour in
 * `a-cited-ability-takes-its-parenthetical.spec.js`. This pass acts only where the cited row still
 * EXISTS, so the two cannot fight; the last two tests prove that on the same body.
 *
 * SCOPE OF THE DEFECT, measured: the sync changes 0 of print's 178 Multiattacks and 0 of the 129
 * committed finished sheets under `fixtures/runs` — this is a new defect that arrived with the
 * one-nova rule, which is why no older sheet carries it.
 */
import { syncMultiattackCitations, sweepDeadName } from '../generate.mjs';
import srd from '@/data/srd52-monsters.json';

const GATE = /\s*\((?:Recharge [\d–-]+|\d\/Day|Costs? \d+ Actions?)\)/;
const rowsOf = (sections) => Object.values(sections ?? {}).flat().filter((r) => r?.name);
const ma = (sections) => rowsOf(sections).find((r) => /^Multiattack/.test(String(r.name)));

/** the Brass Tyrant as generateReskin finished it, with the citation still gated */
const tyrant = (citation) => ({
  Actions: [
    { name: 'Multiattack', text: `The brass tyrant makes two Brass Fist attacks. It can replace one attack with a use of ${citation}.` },
    { name: 'Brass Fist', text: '*Melee Attack Roll:* +12, reach 10 ft. 19 (3d8 + 6) Bludgeoning damage plus 14 (4d6) Fire damage.' },
    { name: 'Forge-Heat Roar (Recharge 5-6)', text: '*Constitution Saving Throw*: DC 19, each creature in a 60-foot Cone. *Failure:* 66 (12d10) Fire damage. *Success:* Half damage only.' },
    { name: 'Molten Seam', text: '*Constitution Saving Throw*: DC 19, each creature in a 60-foot-long, 5-foot-wide Line. *Failure:* 35 (10d6) Fire damage. *Success:* Half damage only.' },
  ],
});

/** THE INVARIANT the handoff states: every row the Multiattack cites exists, and cites it bare. */
const everyCitationResolvesBare = (sections) => {
  const names = new Set(rowsOf(sections).map((r) => String(r.name).replace(GATE, '').trim().toLowerCase()));
  const out = [];
  for (const g of String(ma(sections)?.text ?? '').matchAll(/use of ([^.;,]*?)(\s*\((?:Recharge [\d–-]+|\d\/Day|Costs? \d+ Actions?)\))?(?=[.;,]|$)/g)) {
    out.push({ cited: g[1].trim(), gated: !!g[2], exists: names.has(g[1].trim().toLowerCase()) });
  }
  return out;
};

describe('a multiattack cites a row as the row is named', () => {
  test('THE GATE REMOVED: the row is un-gated, so the citation drops the Recharge it kept', () => {
    const sections = tyrant('Molten Seam (Recharge 5-6)');
    const row = rowsOf(sections).find((r) => r.name === 'Molten Seam');
    expect(row).toBeDefined();                                  // the subject is present
    expect(row.name).not.toMatch(GATE);                         // the one-nova rule has un-gated it
    expect(ma(sections).text).toContain('Molten Seam (Recharge 5-6)'); // and the defect is present

    syncMultiattackCitations(sections, () => {});

    expect(ma(sections).text).toBe('The brass tyrant makes two Brass Fist attacks. It can replace one attack with a use of Molten Seam.');
    expect(everyCitationResolvesBare(sections)).toEqual([{ cited: 'Molten Seam', gated: false, exists: true }]);
    expect(row.name).toBe('Molten Seam');                        // the ROW is not touched
  });

  test("THE GATE KEPT: a gated row is still cited bare, as print cites the Chimera's Fire Breath", () => {
    const sections = tyrant('Forge-Heat Roar (Recharge 5-6)');
    const row = rowsOf(sections).find((r) => /^Forge-Heat Roar/.test(r.name));
    expect(row.name).toMatch(GATE);                              // the gate is KEPT on the row

    syncMultiattackCitations(sections, () => {});

    expect(ma(sections).text).toBe('The brass tyrant makes two Brass Fist attacks. It can replace one attack with a use of Forge-Heat Roar.');
    expect(everyCitationResolvesBare(sections)).toEqual([{ cited: 'Forge-Heat Roar', gated: false, exists: true }]);
    expect(row.name).toBe('Forge-Heat Roar (Recharge 5-6)');     // the row keeps its gate
  });

  test('a citation that is already bare is left exactly as it is, and nothing traces', () => {
    const sections = tyrant('Molten Seam');
    const before = ma(sections).text;
    const traced = [];
    syncMultiattackCitations(sections, (...a) => traced.push(a.join(' ')));
    expect(ma(sections).text).toBe(before);
    expect(traced).toEqual([]);
  });

  test('a row name with a lowercase interior word is handled — a name-shaped pattern cannot see it', () => {
    // the Swarm of Funeral Bells' row is "Over the Dying"; matching on the GATE rather than on a
    // run of Title-Case words is what makes this case reachable at all
    const sections = tyrant('Over the Dying (1/Day)');
    sections.Actions.push({ name: 'Over the Dying', text: '*Wisdom Saving Throw*: DC 15, each creature in a 20-foot Emanation. *Failure:* 18 (4d8) Psychic damage.' });
    syncMultiattackCitations(sections, () => {});
    expect(ma(sections).text).toMatch(/a use of Over the Dying\.$/);
    expect(everyCitationResolvesBare(sections)).toEqual([{ cited: 'Over the Dying', gated: false, exists: true }]);
  });

  // THE TWO PASSES DO NOT FIGHT. `sweepDeadName` owns a citation whose row is GONE; this one owns a
  // citation whose row EXISTS. Run in either order the sentence ends clean.
  test('a citation whose row is gone is not this pass\'s to touch, and the sweep still strips it', () => {
    const sections = tyrant('Splintering Charge (Recharge 5-6)'); // no such row on the body
    const before = ma(sections).text;
    syncMultiattackCitations(sections, () => {});
    expect(ma(sections).text).toBe(before);                      // left for the sweep, gate included

    sweepDeadName(sections, 'Splintering Charge', null, () => {});
    expect(ma(sections).text).toBe('The brass tyrant makes two Brass Fist attacks.');
    expect(ma(sections).text).not.toMatch(/\(Recharge/);
    expect(everyCitationResolvesBare(sections)).toEqual([]);
  });

  test('the sweep runs first and the sync then finds nothing left to fix', () => {
    const sections = tyrant('Splintering Charge (Recharge 5-6)');
    sweepDeadName(sections, 'Splintering Charge', null, () => {});
    const after = ma(sections).text;
    syncMultiattackCitations(sections, () => {});
    expect(ma(sections).text).toBe(after);
  });

  // 0-FP ON THE CORPUS: print's own citations must survive the pass untouched.
  test("print's 178 Multiattacks are not changed by this pass", () => {
    const list = Array.isArray(srd) ? srd : (srd.monsters ?? Object.values(srd).flat());
    const bodies = list.filter((m) => m?.sections && ma(m.sections));
    expect(bodies.length).toBeGreaterThan(150);                  // the sweep actually ran
    const changed = [];
    for (const m of bodies) {
      const before = String(ma(m.sections).text);
      syncMultiattackCitations(m.sections, () => {});
      if (String(ma(m.sections).text) !== before) changed.push(m.name);
    }
    expect(changed).toEqual([]);
  });

  test("print never carries a usage parenthetical in a citation — the rule this pass enforces", () => {
    const list = Array.isArray(srd) ? srd : (srd.monsters ?? Object.values(srd).flat());
    let resolved = 0; let gatedCitations = 0;
    for (const m of list.filter((x) => x?.sections && ma(x.sections))) {
      const names = new Set(rowsOf(m.sections).map((r) => String(r.name).replace(GATE, '').trim().toLowerCase()));
      for (const c of everyCitationResolvesBare(m.sections)) {
        if (!names.has(c.cited.toLowerCase())) continue;   // "Fire Breath if available" and the like
        resolved += 1;
        if (c.gated) gatedCitations += 1;
      }
    }
    expect(resolved).toBeGreaterThan(10);  // the sweep actually resolved citations
    expect(gatedCitations).toBe(0);        // and print gates one ZERO times
  });

  // THE CHIMERA, asserted by name rather than through the extractor above: print's one gated row
  // that a Multiattack cites, cited bare. This is the whole evidence for "the gate never travels".
  test("print's one gated cited row — the Chimera's Fire Breath — is cited bare", () => {
    const list = Array.isArray(srd) ? srd : (srd.monsters ?? Object.values(srd).flat());
    const chimera = list.find((m) => m?.name === 'Chimera');
    expect(chimera).toBeDefined();
    const row = rowsOf(chimera.sections).find((r) => /^Fire Breath/.test(r.name));
    expect(row.name).toBe('Fire Breath (Recharge 5-6)');             // the row IS gated
    expect(ma(chimera.sections).text).toContain('a use of Fire Breath if available');
    expect(ma(chimera.sections).text).not.toMatch(/Fire Breath[^.]*\(Recharge/); // and cited bare
  });
});

/**
 * THE 2014 CONVERSION DOES NOT CHANGE WHAT THE MULTIATTACK ALLOWS (item 1.5, 2026-11-18).
 *
 * The 2024 row grants a free choice — "makes two attacks, using Stone Club or Boulder in any
 * combination" — and the 2014 renderer turned that into "makes two attacks: one with its Stone Club
 * and one with its Boulder", which forces one of each. The Barrowstone Exile had to throw a boulder
 * every round, the Riverbank Reed-Ascetic a dart, Brother Halric a Radiant Flame.
 *
 * Measured on the saved sheets: of 37 whose 2024 Multiattack says "in any combination", 19 shipped a
 * 2014 half that forced one of each — s32, s33 and s40 in every run of the forty. (s34 escaped only
 * because its conversion call failed into the degraded path, which skips this renderer entirely.)
 *
 * `multiattack2014` only ever runs on a row that says "in any combination", so the enumerated form
 * can never be honest in it, and it is deleted rather than guarded. The `LAUNCHER` word list that
 * used to carve out the one case anybody had noticed — a bow beside a sword, which forced Sir
 * Reginald a crossbow shot a round — went with it.
 */
describe('the 2014 conversion does not change what the Multiattack allows', () => {
  const { multiattack2014 } = require('@/tools/statblock-generator/format-2024/generate.mjs');
  const FREE = /using .* or /;

  test('a two-name, two-attack row keeps the choice instead of forcing one of each', () => {
    const out = multiattack2014('The exile makes two attacks, using Stone Club or Boulder in any combination.');
    expect(out).toBe('The exile makes two attacks, using Stone Club or Boulder.');
    expect(out).not.toMatch(/one with/);
    expect(out).toMatch(FREE);
  });

  test('the three sheets that shipped a forced pairing all keep their choice', () => {
    for (const [src, want] of [
      ['The exile makes two attacks, using Stone Club or Boulder in any combination.', 'The exile makes two attacks, using Stone Club or Boulder.'],
      ['The reed-ascetic makes two attacks, using Unarmed Strike or Dart in any combination.', 'The reed-ascetic makes two attacks, using Unarmed Strike or Dart.'],
      ['Halric makes two attacks, using Mace or Radiant Flame in any combination.', 'Halric makes two attacks, using Mace or Radiant Flame.'],
    ]) expect(multiattack2014(src)).toBe(want);
  });

  test('a bow beside a sword needs no word list any more', () => {
    expect(multiattack2014('Sir Reginald makes two attacks, using Greatsword or Heavy Crossbow in any combination.'))
      .toBe('Sir Reginald makes two attacks, using Greatsword or Heavy Crossbow.');
  });

  test('ONE name is still collapsed, which is print 2014\'s own form', () => {
    expect(multiattack2014('The bog hound makes two attacks, using Mud-Caked Jaws in any combination. It can replace one attack with a use of Drag Under.'))
      .toBe('The bog hound makes two Mud-Caked Jaws attacks. It can replace one attack with a use of Drag Under.');
  });

  test('more attacks than names, and the replace clause, are unchanged', () => {
    expect(multiattack2014('Meshrin makes three attacks, using Greataxe or Javelin in any combination. It can replace one attack with a use of Frightening Roar.'))
      .toBe('Meshrin makes three attacks, using Greataxe or Javelin. It can replace one attack with a use of Frightening Roar.');
    expect(multiattack2014('Meshrin makes two attacks, using Greatsword, Tail Swipe, Razor Claws or Vicious Bite in any combination.'))
      .toBe('Meshrin makes two attacks, using Greatsword, Tail Swipe, Razor Claws, or Vicious Bite.');
  });

  test('a row with no combination clause is left to the grammar pass', () => {
    expect(multiattack2014('The hydra makes as many Bite attacks as it has heads.')).toBe('The hydra makes as many Bite attacks as it has heads.');
  });
});
