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

// A KO CONDITION IS WORTH THE ACTION BY ITSELF (2026-11-09). `gate-fit` failed a
// grapple-and-drag row on three `typed40` runs running — Death Roll, Reel In, Debtor's Pin, all
// three imposing Grappled — because the engine's dead-control block skips a KO condition and
// this rule carried its own copy of the list without that exclusion. One definition now, in
// `author.mjs`. Print's warrant: of 329 blocks, exactly 3 carry this shape (Brass Dragon
// Wyrmling / Sleep Breath, Harpy / Luring Song, Homunculus / Bite) and all 3 impose a KO
// condition — and all 3 FAILED this rule when print is scored as a sheet, which is how the
// release bar's print no-op check reads print.
describe('gate-fit and the engine agree on what a KO condition is', () => {
  const PRINT = require('@/data/srd52-monsters.json');
  const gateFits = (b) => Object.values(checkBlock(b).gates).flatMap((g) => g.findings ?? []).filter((f) => f.rule === 'gate-fit' && f.severity === 'fail');

  test("print's three at-will condition actions pass, scored as sheets", () => {
    for (const n of ['Brass Dragon Wyrmling', 'Harpy', 'Homunculus']) {
      const m = PRINT.find((x) => x.name === n);
      expect(m).toBeTruthy();
      expect(gateFits(m)).toHaveLength(0);
    }
  });

  test('a grapple at will with no Multiattack is not a defect', () => {
    const sheet = (actions) => ({
      name: 'Sewer Alligator', format: '2024', size: 'Large', type: 'Beast', alignment: 'Unaligned',
      ac: 14, hp: 76, hp_formula: '9d10 + 27', speed: '20 ft., swim 30 ft.',
      stats: { STR: 17, DEX: 10, CON: 17, INT: 2, WIS: 11, CHA: 5 }, saves: {}, skills: '',
      senses: 'Passive Perception 10', languages: 'None', initiative_bonus: 0,
      cr: 4, cr_str: '4', pb: 2, xp: 1100, generation: { donor: 'brute-2' },
      sections: { Traits: [], Actions: actions },
    });
    const bite = { name: 'Bite', text: '*Melee Attack Roll:* +5, reach 5 ft. 11 (2d6 + 4) Piercing damage.' };
    const grapple = { name: 'Death Roll', text: '*Strength Saving Throw:* DC 13, one creature within 30 feet. *Failure:* The target is pulled up to 20 feet straight toward the alligator and has the Grappled condition (escape DC 13).' };
    expect(gateFits(sheet([bite, grapple]))).toHaveLength(0);
  });

  test('but a NON-KO condition at will with no Multiattack still fails', () => {
    // the Dire Wolf's Fur-Bristled Lunge shape: Prone is not a KO condition
    const sheet = {
      name: 'Dire Wolf', format: '2024', size: 'Large', type: 'Monstrosity', alignment: 'Unaligned',
      ac: 14, hp: 30, hp_formula: '4d10 + 8', speed: '50 ft.',
      stats: { STR: 17, DEX: 15, CON: 15, INT: 3, WIS: 12, CHA: 7 }, saves: {}, skills: '',
      senses: 'Passive Perception 11', languages: 'None', initiative_bonus: 2,
      cr: 1, cr_str: '1', pb: 2, xp: 200, generation: { donor: 'skirmisher-1' },
      sections: { Traits: [], Actions: [
        { name: 'Bite', text: '*Melee Attack Roll:* +5, reach 5 ft. 8 (1d10 + 3) Piercing damage.', print: true },
        { name: 'Fur-Bristled Lunge', text: '*Strength Saving Throw:* DC 13, one creature within 5 feet. *Failure:* The target has the Prone condition.' },
      ] },
    };
    expect(gateFits(sheet)).toHaveLength(1);
  });
});

// AN AREA ROW SWAPPED FOR ONE ATTACK MAY NOT OUT-DAMAGE IT (critic's release ruling, 2026-11-09).
// "It can replace one attack with a use of X" is a trade the GM makes every round; when X hits an
// area for more than the attack, the round multiplies instead of swapping. Gormak's Shattered
// Ground: 38 to everything within 10 ft in place of a 30 attack — sustained 106 at CR 9 against a
// band of 57-62. Our own gate priced it at ZERO (it is neither an attack row nor an aura), which
// is why the critic read 3 hot sheets on sweep 3 and we read none.
//
// PRINT'S WARRANT, measured over 329 blocks: of print's 24 at-will "replace one attack with X"
// rows, 0 are an area effect whose damage reaches the attack they replace. Print puts area damage
// behind a Recharge and keeps at-will replace rows as control. So the fix is print's shape.
describe('the gate prices an at-will area swap, and print never ships one', () => {
  const PRINT = require('@/data/srd52-monsters.json');
  const avgOf = (t) => Number(/^(\d+)/.exec(t)?.[1]) || 0;

  test("print has 24 at-will replace-an-attack rows and none out-damages the attack", () => {
    let atWill = 0, offenders = [];
    for (const m of PRINT) {
      const rows = [...Object.values(m.sections ?? {}).flat()];
      const multi = rows.find((r) => /^Multiattack/.test(r.name ?? '')); if (!multi) continue;
      const atk = Math.max(0, ...rows.filter((r) => /Attack Roll/.test(r.text ?? '')).map((r) => avgOf((/(\d+) \(\d+d\d+/.exec(r.text ?? '') ?? [])[1] ?? '')));
      for (const c of [...String(multi.text).matchAll(/replace (?:one|two) attacks? with (?:a use of |one use of )?(?:\(A\) )?([A-Z][\w' -]+?)(?: or| \(|\.|,)/g)].map((x) => x[1].trim())) {
        const r = rows.find((x) => String(x.name).replace(/ \(.*\)$/, '') === c); if (!r) continue;
        if (/\((?:Recharge [\d–-]+|\d\/Day)\)/.test(r.name)) continue;
        atWill++;
        const area = /\b(?:Cone|Line|Emanation|Sphere|Cube|Cylinder)\b|each creature (?:within|in)/i.test(r.text ?? '');
        const dmg = (String(r.text).match(/\d+ \(\d+d\d+(?: \+ \d+)?\)/g) ?? []).reduce((a, p) => a + avgOf(p), 0);
        if (area && dmg >= atk && dmg > 0) offenders.push(`${m.name} / ${r.name}`);
      }
    }
    expect(atWill).toBeGreaterThan(20);   // the population is real, not an empty scan
    expect(offenders).toEqual([]);        // and print never does it
  });

  test('our read now prices the swap — Gormak reads hot, the controls do not', () => {
    const sheet = (actions) => ({
      name: 'Probe', format: '2024', size: 'Huge', type: 'Giant', alignment: 'Neutral',
      ac: 14, hp: 161, hp_formula: '14d12 + 70', speed: '40 ft.',
      stats: { STR: 23, DEX: 15, CON: 20, INT: 10, WIS: 12, CHA: 9 }, saves: {}, skills: '',
      senses: 'Passive Perception 15', languages: 'Giant', initiative_bonus: 2,
      cr: 9, cr_str: '9', pb: 4, xp: 5000, generation: { donor: 'brute-9' },
      sections: { Traits: [], Actions: actions },
    });
    const club = { name: 'Stone Club', text: '*Melee Attack Roll:* +10, reach 15 ft. 30 (7d6 + 6) Bludgeoning damage.' };
    const aoe = { name: 'Shattered Ground', text: '*Dexterity Saving Throw:* DC 18, each creature within 10 feet. *Failure:* 38 (11d6) Bludgeoning damage.' };
    const control = { name: 'Shattered Ground', text: '*Dexterity Saving Throw:* DC 18, each creature within 10 feet. *Failure:* The target has the Prone condition.' };
    const ma = (cites) => ({ name: 'Multiattack', text: `The giant makes two Stone Club attacks. It can replace one attack with a use of ${cites}.` });
    const sus = (b) => checkBlock(b).read?.sustained;
    expect(sus(sheet([ma('Shattered Ground'), club, aoe]))).toBeGreaterThan(90);  // the swap is priced
    expect(sus(sheet([ma('Shattered Ground'), club, control]))).toBeLessThan(70); // print's shape: control costs nothing extra
    const gated = { ...aoe, name: 'Shattered Ground (Recharge 5-6)' };
    expect(sus(sheet([ma('Shattered Ground'), club, gated]))).toBeLessThan(70);   // a Recharge row is a nova, priced elsewhere
  });
});
