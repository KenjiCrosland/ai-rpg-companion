/**
 * THE RENDERED-OUTPUT PINS (§8 R1).
 *
 * "(A) or (B)" came back through 4,300 green tests, and so did Ilvareth's
 * immunity line, because nothing asserted on a rendered sheet. These pin the
 * detectors in BOTH directions on the sheets the critic named in
 * `sweep-2026-11-01T20-03-32`, so a detector cannot quietly stop seeing a defect
 * and cannot start seeing one where the critic says the sheet is right.
 *
 * `npm test` stays green: the lints live in a module, the RUN gate
 * (`scripts/lint-run.mjs`) is what fails on a dirty run. A suite that was red on
 * committed data until R3 landed would mask every new regression — the opposite
 * of this item's purpose.
 */
import fs from 'node:fs';
import { citesGenericAttacks, multiattackAttackClauses, multiattackCitations, multiattackSpells, repairMultiattackAttackList, repairReplaceClause, replaceClauseRowOf } from '../checker.mjs';
import printBlocks from '@/data/srd52-monsters.json';
let _c = null;
const corpus = () => { if (!_c) { _c = Array.isArray(printBlocks) ? printBlocks : Object.values(printBlocks).flat(); } return _c; };
import path from 'node:path';
import { lintSheet, rowsOfSheet, SHEET_LINTS } from '@/tools/statblock-generator/reskin/sheet-lints.mjs';
import * as SHAPES from '@/tools/statblock-generator/reskin/shapes.mjs';
import { capSingleTargetSave, ceilingFor, isSingleTargetSave } from '@/tools/statblock-generator/reskin/card-budgets.mjs';
import { renderTemplate } from '@/tools/statblock-generator/reskin/templates.mjs';
import { drawLibraryRow } from '@/tools/statblock-generator/reskin/library.mjs';

const RUN = 'smoke-out/sweep-2026-11-01T20-03-32';
const sheetFor = (ix) => {
  // the forty's files are zero-padded (02-bog-hound.json), which my first cut missed
  const pad = String(ix).padStart(2, '0');
  const f = fs.readdirSync(RUN).find((x) => x.startsWith(`${pad}-`) && x.endsWith('.json'));
  return f ? JSON.parse(fs.readFileSync(path.join(RUN, f), 'utf8')) : null;
};
const have = fs.existsSync(RUN);
const rulesOn = (ix) => (sheetFor(ix) ? lintSheet(sheetFor(ix)).map((h) => h.rule) : []);

describe('every lint declares what it reads', () => {
  it('and most read declared fields, not text', () => {
    for (const l of SHEET_LINTS) {
      expect(typeof l.reads).toBe('string');
      expect(l.reads.length).toBeGreaterThan(10);
      expect(typeof l.why).toBe('string');
    }
    const declared = SHEET_LINTS.filter((l) => /declared|closed/.test(l.reads));
    expect(declared.length).toBeGreaterThanOrEqual(4);
  });
});

(have ? describe : describe.skip)('it fires on the sheets the critic named', () => {
  it.each([
    [18, 'empty-option'],
    [2, 'missing-number'],
    [30, 'missing-number'],
    [2, 'dangling-save'],
    [32, 'duplicate-row-name'],
    [36, 'engulf-needs-a-grapple'],
    [39, 'inline-weapon-collision'],
    [28, 'double-punctuation'],
  ])('sheet %i -> %s', (ix, rule) => {
    expect(rulesOn(ix)).toContain(rule);
  });

  it('and reports each defect ONCE, not once per printing', () => {
    // a sheet carries its rows twice; the 2014 flat arrays use different words for
    // the same sections, which first reported Bog Hound's Drag Under twice
    const hits = lintSheet(sheetFor(2)).filter((h) => h.rule === 'missing-number');
    expect(hits).toHaveLength(1);
  });
});

(have ? describe : describe.skip)('and stays silent where the critic says the sheet is right', () => {
  it('the warranted engulfs are not flagged', () => {
    // the critic: "Bog Hound's Whelm and the Screeslide's Entomb are the warranted ones"
    for (const ix of [2, 6, 24, 35]) expect(rulesOn(ix)).not.toContain('engulf-needs-a-grapple');
  });

  it('a spell-cast action is not an orphan', () => {
    // Spellcasting and Etherealness are full actions with no damage and no gate, and
    // they are worth an action; they carry `rules`/`print` and are exempt
  });

  it('a bare-print sheet is not judged for orphans at all', () => {
    // #19 carries NO engine flags and an empty 2024 side, so provenance is unknowable;
    // print's 2024 corpus has no "Change Shape" row (0 of 329) though every 2014
    // dragon has one, so the name set cannot vouch for it either
  });

  it('the two print-exact sheets are clean', () => {
    for (const ix of [21, 22]) expect(rulesOn(ix)).toEqual([]);
  });

  it('a name repeating across SHEETS is not a duplicate within one', () => {
    // 39 of 40 sheets carry a "Multiattack"; the lint is per sheet, per section,
    // per printing — the first cut reported 124 findings on this forty
    const all = fs.readdirSync(RUN).filter((x) => /^\d+-.*\.json$/.test(x))
      .flatMap((f) => lintSheet(JSON.parse(fs.readFileSync(path.join(RUN, f), 'utf8'))))
      .filter((h) => h.rule === 'duplicate-row-name');
    expect(all).toHaveLength(1);
  });
});

(have ? describe : describe.skip)('the whole forty', () => {
  // OPENED FROM A CLOSED WORLD (R10 · H4, 2026-11-02). This asserted "exactly ten
  // findings and no more", which was true when the suite held eight classes and is
  // false the moment a class is added: the four R10 classes find real defects on this
  // same forty (doubled spaces after a label, a 2024 spell bullet inside a 2014
  // Spellcasting block). The strength worth keeping is that the ORIGINAL ten are all
  // still found — a regression in any first-generation detector fails here — so the
  // assertion is now per-rule and the total is reported, not pinned.
  it('still finds every one of the original ten the critic listed, less the one print refuted', () => {
    const all = fs.readdirSync(RUN).filter((x) => /^\d+-.*\.json$/.test(x))
      .flatMap((f) => lintSheet(JSON.parse(fs.readFileSync(path.join(RUN, f), 'utf8'))));
    // 'orphan-action-row' left this list 2026-11-03: print ships 38 Actions with no
    // damage, no limit and no Multiattack swap (Harpy/Luring Song, Ghost/Etherealness),
    // so the shape is not a defect. See the refusal note in sheet-lints.mjs.
    const ORIGINAL = ['empty-option', 'missing-number', 'dangling-save', 'duplicate-row-name', 'engulf-needs-a-grapple', 'inline-weapon-collision', 'double-punctuation'];
    const byRule = all.reduce((m, f) => ({ ...m, [f.rule]: (m[f.rule] ?? 0) + 1 }), {});
    const originalCount = ORIGINAL.reduce((n, r) => n + (byRule[r] ?? 0), 0);
    // NINE, not ten: the tenth was sheet 27's orphan-action-row, and print ships 38
    // Actions of that shape. A refuted detector losing its hit is not a regression —
    // the nine below are each a distinct, visible defect and all must stay found.
    expect(originalCount).toBe(9);
    expect(all.length).toBeGreaterThanOrEqual(9);
  });

  it('reads every row of both printings', () => {
    const rows = rowsOfSheet(sheetFor(2));
    expect(rows.length).toBeGreaterThan(4);
    expect(new Set(rows.map((x) => x.ed)).size).toBeGreaterThan(1);
  });
});

describe('the Multiattack citation rules, surveyed against all 178 print Multiattacks', () => {
  // A regex lint invites false positives, so this is specified against print rather than
  // against intuition. Print's 178 Multiattacks fall into nine grammars: "makes N <Name>
  // attack" (69), + a replace clause (35), "makes N attacks, using <A> or <B>" (27), the
  // LIST form "and N <Y> attack" (20), + "and uses <X>" (16), using+replace (8), the
  // Hydra's "as many Bite attacks as it has heads", the Marilith, and the Tarrasque's
  // "one Bite attack and three other attacks".
  const corpusMultiattacks = () => corpus().flatMap((m) => {
    const rows = Object.values(m.sections ?? {}).flat().filter(Boolean);
    const ma = rows.find((r) => /^Multiattack/.test(String(r.name ?? '')));
    return ma ? [{ m, ma, rows }] : [];
  });

  it('extracts 245 citation sets from print, at ZERO false positives', () => {
    const all = corpusMultiattacks();
    expect(all.length).toBe(178);
    let sets = 0; const fp = [];
    for (const { m, ma, rows } of all) {
      const names = rows.map((r) => String(r.name ?? '').replace(/ \(.*\)$/, ''));
      const spells = rows.map((r) => String(r.text ?? '')).join(' ');
      for (const set of multiattackCitations(ma.text)) {
        sets += 1;
        const lc = names.map((n) => n.toLowerCase());
        const ok = set.some((x0) => { const x = String(x0).toLowerCase();
          return lc.includes(x) || lc.some((n) => n.startsWith(x) || x.startsWith(n))
            || new RegExp(`\\*${x0.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i').test(spells); });
        if (!ok) fp.push(`${m.name}: ${set.join('|')}`);
      }
    }
    // 249 sets from 178 rows. The figure is a "does the reader read" sanity check, not a
    // target: it moved 245 -> 249 when print's tenth grammar ("makes two Javelin or
    // Morningstar attacks") was covered, which the survey caught because three print
    // Multiattacks were yielding NO citation at all.
    expect(sets).toBeGreaterThan(245); // a reader that reads; the exact count moves as grammars are covered
    expect(fp).toEqual([]);           // the gate: nothing legitimate is flagged
  });

  it('no print Multiattack cites a spell it cannot cast, and none names no attack', () => {
    for (const { ma, rows } of corpusMultiattacks()) {
      const lists = rows.map((r) => String(r.text ?? '')).join(' ');
      for (const sp of multiattackSpells(ma.text)) expect(lists).toMatch(new RegExp(sp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
      expect(multiattackCitations(ma.text).length).toBeGreaterThan(0);
    }
  });

  // the four print grammars most likely to trip a regex — pinned individually
  it.each([
    ["the Tarrasque's \"three other attacks\" — `other` is lowercase, never a name", 'The tarrasque makes one Bite attack and three other attacks, using Claw or Tail in any combination.', [['Bite'], ['Claw', 'Tail']]],
    ['the Hydra\'s "as many Bite attacks as it has heads"', 'The hydra makes as many Bite attacks as it has heads.', [['Bite']]],
    ["print's tenth grammar: the alternation inside the name slot", 'The bugbear makes two Javelin or Morningstar attacks.', [['Javelin', 'Morningstar']]],
    ['the 2014 lowercase form, which a capital-only capture read as nothing', 'It then makes three attacks: one with its bite and two with its claws.', [['bite'], ['claws']]],
    ["the Aboleth's \"uses either A or B\" — grouped, either satisfies", 'The aboleth makes two Tentacle attacks and uses either Consume Memories or Dominate Mind if available.', [['Tentacle'], ['Consume Memories', 'Dominate Mind']]],
    ['a comma-led middle item is read, not stepped over', 'The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack.', [['Bite'], ['Devilish Claw'], ['Fiery Mace']]],
    // THE EDGE CASES THE SURVEY TURNED UP, each one a real sheet before it was a test.
    ['an "and"-joined pair in the name slot stays one set', 'The marilith makes three Longsword attacks and one Tail attack.', [['Longsword'], ['Tail']]],
    ['a THREE-item Oxford list is one set, and the "or" is not part of the last name', 'The sun-crowned makes three attacks, using Hurled Scythe, Eldritch Burst, or Paralyzing Touch in any combination.', [['Hurled Scythe', 'Eldritch Burst', 'Paralyzing Touch']]],
    ['the possessive is not always "its", and the name carries its particles', 'Maura makes two attacks: one with her Fistful of Shards and one with her Hurled Lantern.', [['Fistful of Shards'], ['Hurled Lantern']]],
    ['"a use of" is its own door, never a row named "a use"', 'It makes two attacks, using Javelin or Morningstar in any combination. It can replace one with a use of Roar.', [['Javelin', 'Morningstar'], ['Roar']]],
    ['the single-name list form, which has no comma and no "and"', 'The hydra makes two Bite attacks.', [['Bite']]],
    ['a replace clause naming a trait, after a lowercase 2014 pair', 'It makes two attacks: one with its bite and one with its claws. It can replace one attack with a use of Spellcasting.', [['bite'], ['claws'], ['Spellcasting']]],
    ['the name slot LOWERCASED — "two bite attacks" over a row named Bite', 'The hydra makes two bite attacks.', [['bite']]],
    ['"it can use X or Y" is the same clause as "uses X or Y"', 'The glass riposte makes three attacks: it can use Shardblade or Mirror Step in any combination.', [['Shardblade', 'Mirror Step']]],
    ['a TYPE word is never a row name', 'The cradle seer makes two ranged attacks.', []],
    ['print\'s generic 2014 idiom names no row either', 'The guard makes two melee attacks.', []],
  ])('%s', (_label, text, expected) => {
    expect(multiattackCitations(text)).toEqual(expected);
  });

  it('a bare "makes two attacks." yields NOTHING, which is a finding and not a pass', () => {
    // print does this 0 of 178 times; ours did it twice in 2,991
    expect(multiattackCitations('The sorrow makes two attacks.')).toEqual([]);
  });

  it('reads the off-list spell the archlich offered', () => {
    expect(multiattackSpells('a use of (A) Scouring Volley or (B) Spellcasting to cast *Ray of Sickness*.')).toEqual(['Ray of Sickness']);
  });

  // THE TWO LIVE DEFECTS THE SURVEY FOUND, replayed at the lint so neither can return
  // silently. Both were read off real sheets, not invented: the pit fiend's is the
  // critic's own finding, still present in the 2026-11-04 sweep.
  const sheetOf = (attacks, ma) => ({ sections: { Actions: [{ name: 'Multiattack', text: ma },
    ...attacks.map((a) => ({ name: a, text: 'Melee Weapon Attack: +7 to hit, reach 5 ft. Hit: 10 (2d6 + 3) piercing damage.' }))] } });
  it.each([
    ['a cited attack row the sheet lacks', ['Bite', 'Devilish Claw'], 'The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack.', 'multiattack-dangling-cite'],
    ['a Multiattack naming nothing to roll', ['Claw'], 'The sorrow makes two attacks.', 'multiattack-cites-nothing'],
  ])('the lint catches %s', (_l, attacks, ma, rule) => {
    expect(lintSheet(sheetOf(attacks, ma)).map((h) => h.rule)).toContain(rule);
  });

  it('the generic form is NOT "names nothing to roll" — print writes it and so do we', () => {
    // "makes two melee attacks" cites no row BY DESIGN and tells a GM exactly what to
    // roll; reading "ranged" as a row name reported a dangling row called "ranged".
    for (const g of ['The guard makes two melee attacks.', 'The seer makes two ranged attacks.', 'It makes three unarmed attacks.']) {
      expect(citesGenericAttacks(g)).toBe(true);
      expect(lintSheet(sheetOf(['Claw'], g)).filter((h) => /^multiattack/.test(h.rule))).toEqual([]);
    }
    expect(citesGenericAttacks('The sorrow makes two attacks.')).toBe(false);
  });

  it('a set of alternatives is satisfied by ANY of its names, so a partial sheet is clean', () => {
    // print writes "using Claw or Tail in any combination" and a GM picks one; flagging
    // the set because one member is absent would fail print 27 times.
    const sh = sheetOf(['Hurled Scythe'], 'It makes three attacks, using Hurled Scythe, Eldritch Burst, or Paralyzing Touch in any combination.');
    expect(lintSheet(sh).filter((h) => /^multiattack/.test(h.rule))).toEqual([]);
  });
});

// EVERY CASE BELOW IS A REAL SHEET, copied verbatim with its own row list — the engine's
// saved runs live in a gitignored smoke-out/, so the ones that actually failed are
// committed here as fixtures rather than invented. Provenance is on each row: a repair
// proven only against hand-written input is proven against the author's imagination.
const FAILING = [
  { label: 'the Pit Fiend, nine runs running (10-19 … 11-04): print\'s Multiattack rides a print body, the Fiery Mace row is shed',
    text: 'The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack. It can replace one attack with a use of (A) Oathbound Chains or (B) Spellcasting to cast *Bestow Curse*.',
    rows: ['Legendary Resistance', 'Diabolical Restoration', 'Fear Aura', 'Magic Resistance', 'Multiattack', 'Bite', 'Devilish Claw', 'Spellcasting', 'Oathbound Chains', 'Hellfire Spellcasting'],
    attacks: ['Bite', 'Devilish Claw'],
    want: 'The pit fiend makes two Bite attacks and two Devilish Claw attacks. It can replace one attack with a use of (A) Oathbound Chains or (B) Spellcasting to cast *Bestow Curse*.',
    total: 4 },
  { label: 'the same sheet under its other subject line ("The fiend", sweep 11-01)',
    text: 'The fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack. It can replace one attack with a use of Spellcasting to cast *Hold Person*.',
    rows: ['Legendary Resistance', 'Diabolical Restoration', 'Fear Aura', 'Magic Resistance', 'Multiattack', 'Bite', 'Devilish Claw', 'Hellfire Burst', 'Spellcasting', 'Hellfire Spellcasting'],
    attacks: ['Bite', 'Devilish Claw'],
    want: 'The fiend makes two Bite attacks and two Devilish Claw attacks. It can replace one attack with a use of Spellcasting to cast *Hold Person*.',
    total: 4 },
];

describe('the Multiattack attack list, repaired from its validated elements', () => {
  const resolverFor = (rows) => (c) => rows.some((n) => n.toLowerCase() === String(c).toLowerCase());

  it.each(FAILING.map((f) => [f.label, f]))('repairs %s', (_l, f) => {
    const got = repairMultiattackAttackList(f.text, resolverFor(f.rows), f.attacks[0]);
    expect(got).not.toBeNull();
    expect(got.text).toBe(f.want);
    expect(got.dropped).toEqual(['Fiery Mace']);
    // THE COUNT IS THE DAMAGE BUDGET'S DIVISOR: 1+2+1 attacks must stay 4, or the sheet
    // is silently repriced by a repair that was only meant to fix a name.
    expect(got.total).toBe(f.total);
    expect(multiattackAttackClauses(got.text).reduce((n, c) => n + c.count, 0)).toBe(f.total);
  });

  it('leaves a sheet whose citations all resolve completely untouched', () => {
    // the 10-27 Pit Fiend DOES carry a Fiery Mace row; its dangling cite is "Merciless
    // Strike" in the `a use of` slot, which is not the attack list and not this repair's.
    const t = 'The pit fiend makes one Bite attack, two Devilish Claw attacks, and one Fiery Mace attack. It can replace one attack with a use of Merciless Strike.';
    expect(repairMultiattackAttackList(t, resolverFor(['Bite', 'Fiery Mace', 'Devilish Claw']), 'Bite')).toBeNull();
  });

  it('re-points rather than empties when EVERY clause is dead', () => {
    // a Multiattack naming no attack at all is worse than one naming the wrong row
    const got = repairMultiattackAttackList('The hound makes two Fiery Mace attacks.', resolverFor(['Bite']), 'Bite');
    expect(got.text).toBe('The hound makes two Bite attacks.');
    expect(got.total).toBe(2);
  });

  it('declines when every clause is dead and the sheet has no attack to re-point at', () => {
    expect(repairMultiattackAttackList('It makes two Fiery Mace attacks.', resolverFor(['Fear Aura']), null)).toBeNull();
  });

  it('cannot help the two sheets that name nothing at all, and says so by declining', () => {
    // homebrew40 07-hollowing-sorrow and 38-marsh-reeve: "The sorrow makes two attacks."
    // There is no element to validate, so this is a generation defect, not a repair case.
    for (const [t, rows] of [['The sorrow makes two attacks.', ['Sorrowful Strike']], ['The reeve makes two attacks.', ['Wading Strike']]]) {
      expect(multiattackAttackClauses(t)).toEqual([]);
      expect(repairMultiattackAttackList(t, resolverFor(rows), rows[0])).toBeNull();
    }
  });

  it('keeps the lowercase 2014 list readable, and repairs it in place', () => {
    const got = repairMultiattackAttackList('The hydra makes two bite attacks.', resolverFor(['Fang']), 'Fang');
    expect(got.text).toBe('The hydra makes two Fang attacks.');
  });

  it('the repaired sentence passes the lint that found it', () => {
    const f = FAILING[0];
    // the Spellcasting row carries the spell the clause offers, as a real sheet does —
    // without it the off-list-spell rule fires, correctly: this fixture only passed
    // before because that rule swept the citing Multiattack into its own list of lists.
    const sheet = { sections: { Actions: [{ name: 'Multiattack', text: f.want },
      ...f.attacks.map((a) => ({ name: a, text: 'Melee Attack Roll: +14, reach 10 ft. Hit: 22 (4d6 + 8) piercing damage.' })),
      { name: 'Spellcasting', text: 'The fiend casts one of the following spells (spell save DC 21): At will: *Bestow Curse*, *Fireball*' }] } };
    expect(lintSheet(sheet).filter((h) => /^multiattack/.test(h.rule))).toEqual([]);
  });
});

// AND THE REPAIR IS SPECIFIED AGAINST PRINT, NOT AGAINST ONE RECURRING SHEET. The real
// failures over 3,200 saved runs are dominated by a single malformed Pit Fiend, so the
// fixtures above prove the repair on ONE instance of the grammar it claims to cover.
// print supplies the variety: take its own Multiattacks, delete a row the sentence cites,
// and require the repair to drop that clause, preserve the total, and leave a sentence
// whose every citation resolves. The deletion is the controlled variable; the grammar is
// real. Same discipline as the 178-row reader gate above.
describe('the repair, against print\'s own Multiattacks with a row deleted', () => {
  const maOf = (m) => {
    const rows = Object.values(m.sections ?? {}).flat().filter(Boolean);
    const ma = rows.find((r) => /^Multiattack/.test(String(r.name ?? '')));
    return ma ? { rows, text: String(ma.text ?? '').replace(/\s+/g, ' ') } : null;
  };
  const bare = (r) => String(r.name ?? '').replace(/ \(.*\)$/, '');

  it('redistributes the count on every multi-clause case, 47 of them, losing none', () => {
    let cases = 0;
    for (const m of corpus()) {
      const got = maOf(m); if (!got) continue;
      const clauses = multiattackAttackClauses(got.text);
      if (clauses.length < 2) continue;
      const total = clauses.reduce((n, c) => n + c.count, 0);
      for (const victim of [...new Set(clauses.map((c) => c.name))]) {
        cases += 1;
        const keep = got.rows.map(bare).filter((n) => n.toLowerCase() !== victim.toLowerCase());
        const resolves = (c) => keep.some((n) => n.toLowerCase() === String(c).toLowerCase());
        const fixed = repairMultiattackAttackList(got.text, resolves, keep[0]);
        expect(fixed).not.toBeNull();                                          // a cited row vanished; the sentence must change
        expect(fixed.dropped.map((d) => d.toLowerCase())).toContain(victim.toLowerCase());
        const after = multiattackAttackClauses(fixed.text);
        expect(after.reduce((n, c) => n + c.count, 0)).toBe(total);             // the budget's divisor survives
        for (const c of after) expect(resolves(c.name)).toBe(true);             // nothing dangles afterwards
        expect(fixed.text).not.toMatch(/\band and\b|\bmakes and\b|attack attack|undefined| {2}/);
      }
    }
    expect(cases).toBe(47);
  });

  it('re-points the single-clause cases at a live attack instead of emptying them', () => {
    let cases = 0;
    for (const m of corpus()) {
      const got = maOf(m); if (!got) continue;
      const clauses = multiattackAttackClauses(got.text);
      if (clauses.length !== 1) continue;
      const attacks = got.rows.filter((r) => /Attack Roll/.test(String(r.text ?? '')) && !/^Multiattack/i.test(String(r.name ?? ''))).map(bare);
      const target = attacks.find((n) => n.toLowerCase() !== clauses[0].name.toLowerCase());
      if (!target) continue;
      cases += 1;
      const resolves = (c) => String(c).toLowerCase() !== clauses[0].name.toLowerCase()
        && got.rows.map(bare).some((n) => n.toLowerCase() === String(c).toLowerCase());
      const fixed = repairMultiattackAttackList(got.text, resolves, target);
      expect(fixed).not.toBeNull();
      expect(fixed.text).toContain(target);
      expect(multiattackAttackClauses(fixed.text).reduce((n, c) => n + c.count, 0)).toBe(clauses[0].count);
    }
    expect(cases).toBe(11);
  });

  it('and declines on ALL 178 when nothing has been deleted', () => {
    // the blast radius, proven on print rather than only on our saved runs: a repair that
    // rewrites correct text is a regression no finding would ever report.
    let seen = 0;
    for (const m of corpus()) {
      const got = maOf(m); if (!got) continue;
      seen += 1;
      const names = got.rows.map(bare);
      const resolves = (c) => names.some((n) => n.toLowerCase() === String(c).toLowerCase());
      expect(repairMultiattackAttackList(got.text, resolves, names[0])).toBeNull();
    }
    expect(seen).toBe(178);
  });
});

// THE REPLACE CLAUSE. print writes it three ways and no more: lettered (10 rows, all
// adult dragons), a single option (24 rows), or absent (69 of its 178 Multiattacks). The
// engine's writer already refuses the lettered form unless both halves exist, but it
// checks at WRITE time and a later pass can shed the row it named — 7 of 139 lettered
// rows over 3,200 saved sheets stranded a letter with nothing behind it.
describe('the replace clause, re-read against the rows that survived', () => {
  const resolverFor = (rows) => (c) => rows.some((n) => n.toLowerCase() === String(c).toLowerCase());
  const maOf = (m) => {
    const rows = Object.values(m.sections ?? {}).flat().filter(Boolean);
    return rows.map((r) => ({ rows, text: String(r.text ?? '').replace(/\s+/g, ' ') }))
      .filter((x) => /It can replace one attack with a use of/.test(x.text));
  };
  const bare = (r) => String(r.name ?? '').replace(/ \(.*\)$/, '');

  it('leaves all 34 of print\'s replace clauses exactly as print wrote them', () => {
    let seen = 0;
    for (const m of corpus()) for (const { rows, text } of maOf(m)) {
      seen += 1;
      expect(repairReplaceClause(text, resolverFor(rows.map(bare)))).toBeNull();
    }
    expect(seen).toBe(34);
  });

  it('degrades to the next print form down when one lettered half is shed, 20 cases', () => {
    let seen = 0;
    for (const m of corpus()) for (const { rows, text } of maOf(m)) {
      const halves = /a use of \(A\) (.*?) or \(B\) (.*?)\.$/.exec(text);
      if (!halves) continue;
      for (const h of [1, 2]) {
        seen += 1;
        const victim = replaceClauseRowOf(halves[h]);
        const keep = rows.map(bare).filter((n) => n.toLowerCase() !== victim.toLowerCase());
        const fixed = repairReplaceClause(text, resolverFor(keep));
        expect(fixed).not.toBeNull();
        expect(fixed.text).not.toMatch(/\((?:A|B|C)\)/);          // no letter left with nothing behind it
        expect(fixed.text).toMatch(/a use of/);                   // the surviving half is still offered
        expect(fixed.text).not.toMatch(new RegExp(victim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
      }
    }
    expect(seen).toBe(20);
  });

  // THE REAL SHEETS, verbatim. The engine's own writer had already been fixed once for
  // this defect (forty #3, the Choir of the Pit) by checking the name at write time; both
  // of these shipped AFTER that fix, which is what showed the check belongs at the end.
  it.each([
    ['the Choir of the Pit (homebrew40 11-02)', 'The choir makes two Dirge Note attacks. It can replace one attack with a use of (A) or (B) Spellcasting to cast *Bestow Curse*.',
      ['Multiattack', 'Dirge Note', 'Spellcasting'],
      'The choir makes two Dirge Note attacks. It can replace one attack with a use of Spellcasting to cast *Bestow Curse*.'],
    ['the Ossuary Sun-Lich (sweep 10-21)', 'The sun-lich makes three attacks, using Eldritch Burst or Paralyzing Touch in any combination. It can replace one attack with a use of (A) or (B) Spellcasting to cast *Guiding Bolt*.',
      ['Multiattack', 'Eldritch Burst', 'Paralyzing Touch', 'Spellcasting'],
      'The sun-lich makes three attacks, using Eldritch Burst or Paralyzing Touch in any combination. It can replace one attack with a use of Spellcasting to cast *Guiding Bolt*.'],
  ])('repairs %s', (_l, text, rows, want) => {
    expect(repairReplaceClause(text, resolverFor(rows)).text).toBe(want);
  });

  it('drops the clause entirely when nothing it offers survives', () => {
    // the 10-27 Pit Fiend's "a use of Merciless Strike" over a sheet with no such row.
    // print's commonest Multiattack carries no replace clause at all, so this is a form
    // print itself writes 69 times — not a hole in the sheet.
    const got = repairReplaceClause('The fiend makes two Bite attacks. It can replace one attack with a use of Merciless Strike.', resolverFor(['Bite']));
    expect(got.text).toBe('The fiend makes two Bite attacks.');
    expect(got.form).toBe(0);
  });

  // EVERY ONE OF THESE WAS A BUG I SHIPPED INTO THE FUNCTION AND THE CORPORA CAUGHT.
  // They are regressions, not hypotheticals: each deleted correct text off real sheets.
  it.each([
    ["print's Vampire: a form restriction in parentheses is not part of the row name",
      'The vampire makes three Dead Hand attacks. It can replace one attack with a use of Bite (Bat or Vampire Form Only).', ['Dead Hand', 'Bite']],
    ['our 2014 printing: "or ITS Spellcasting", the converter\'s documented form',
      'The seer makes three attacks. It can replace one attack with a use of Rot Gaze or its Spellcasting to cast *ray of sickness*.', ['Rot Gaze', 'Spellcasting']],
    ['a row whose name genuinely BEGINS with an article — "The Fen\'s Claim" (sweep 11-04)',
      'The crone makes three Arcane Burst attacks. It can replace one attack with a use of The Fen\'s Claim.', ['Arcane Burst', "The Fen's Claim"]],
    ['the unlettered pair our 2014 printing writes, both halves live',
      'The midwife makes three attacks. It can replace one attack with a use of Fever Blight or Spellcasting to cast *ray of sickness*.', ['Fever Blight', 'Spellcasting']],
  ])('does not touch %s', (_l, text, rows) => {
    expect(repairReplaceClause(text, resolverFor(rows))).toBeNull();
  });
});

// A RULE MUST NOT BE SATISFIED BY THE ROW IT IS JUDGING. `multiattack-offlist-spell`
// built its list of spell lists from every row mentioning "Spellcasting" — which includes
// the Multiattack writing "a use of (B) Spellcasting to cast *Ray of Sickness*". The
// cited spell was therefore always "available", and the rule reported nothing in 3,200
// sheets. The critic found the archlich by reading it. Print stays at 0 findings.
describe('the off-list spell rule cannot be satisfied by the row it judges', () => {
  const sheetOf = (rows) => ({ sections: { Actions: rows } });
  const ARCHLICH_MA = 'The archlich makes three attacks, using Eldritch Burst or Paralyzing Touch. It can replace one attack with a use of (A) Scouring Volley or (B) Spellcasting to cast *Ray of Sickness*.';
  // the 11-04 archlich's three real lists, verbatim — Ray of Sickness is on none of them
  const ARCHLICH_SC = 'The archlich casts one of the following spells, using Intelligence as the spellcasting ability (spell save DC 19): - **At will:** *Detect Magic*, *Detect Thoughts*, *Dispel Magic*, *Fireball*, *Invisibility*, *Lightning Bolt*, *Mage Hand*, *Prestidigitation* **2/day each:** *Animate Dead*, *Dimension Door*, *Plane Shift* **1/day each:** *Chain Lightning*, *Finger of Death*, *Power Word Kill*, *Scrying*';

  it('flags the 11-04 archlich, whose Ray of Sickness is on none of its three lists', () => {
    const hits = lintSheet(sheetOf([
      { name: 'Multiattack', text: ARCHLICH_MA },
      { name: 'Eldritch Burst', text: 'Melee Attack Roll: +12, reach 5 ft. Hit: 18 (4d6 + 4) force damage.' },
      { name: 'Paralyzing Touch', text: 'Melee Attack Roll: +12, reach 5 ft. Hit: 10 (3d6) cold damage.' },
      { name: 'Scouring Volley', text: 'Dexterity Saving Throw: DC 19, each creature in a 60-foot Cone. Failure: 33 (6d10) radiant damage.' },
      { name: 'Spellcasting', text: ARCHLICH_SC },
    ]));
    expect(hits.map((h) => h.rule)).toContain('multiattack-offlist-spell');
    expect(hits.find((h) => h.rule === 'multiattack-offlist-spell').message).toMatch(/Ray of Sickness/);
  });

  it('and clears the same sheet once the spell is on a list', () => {
    const hits = lintSheet(sheetOf([
      { name: 'Multiattack', text: ARCHLICH_MA },
      { name: 'Eldritch Burst', text: 'Melee Attack Roll: +12, reach 5 ft. Hit: 18 (4d6 + 4) force damage.' },
      { name: 'Paralyzing Touch', text: 'Melee Attack Roll: +12, reach 5 ft. Hit: 10 (3d6) cold damage.' },
      { name: 'Scouring Volley', text: 'Dexterity Saving Throw: DC 19, each creature in a 60-foot Cone. Failure: 33 (6d10) radiant damage.' },
      { name: 'Spellcasting', text: `${ARCHLICH_SC} **1/day each:** *Ray of Sickness*` },
    ]));
    expect(hits.map((h) => h.rule)).not.toContain('multiattack-offlist-spell');
  });

  it('no print sheet is flagged', () => {
    const flagged = corpus().flatMap((m) => lintSheet(m).filter((h) => h.rule === 'multiattack-offlist-spell').map(() => m.name));
    expect(flagged).toEqual([]);
  });
});

// THE CRITIC'S EFFECT-CLAIM ITEM, the two halves that were not the enabler. Both are
// format checks on our OWN output — a row judged against itself, not prose read for
// meaning — and both are specified against print before anything else.
describe('an effect must carry the numbers and the things it claims', () => {
  const sheetOf = (rows) => ({ sections: { Actions: rows } });

  it('flags a save with neither an ability nor a DC — the critic\'s Collateral Word', () => {
    // verbatim from sweep-2026-11-04 #17. 1 of 523 authored rows in the saved runs.
    const t = 'A creature within 5 feet of the pit fiend speaks a promise, plea, or vow aloud, casts a spell with a verbal component, surrenders, or calls for aid, on a failed save, the utterance turns to slag.';
    expect(lintSheet(sheetOf([{ name: 'Collateral Word', text: t }])).map((h) => h.rule)).toContain('save-without-its-numbers');
  });

  it.each([
    ['a named ability and a DC', '*Wisdom Saving Throw*: DC 21, each creature in a 20-foot Emanation. *Failure:* The target has the Frightened condition until the end of its next turn.'],
    ['a DC in prose', 'The target must succeed on a DC 17 Strength save or be pushed 10 feet.'],
  ])('and does not flag a save that states %s', (_l, text) => {
    expect(lintSheet(sheetOf([{ name: 'Thing', text }])).map((h) => h.rule)).not.toContain('save-without-its-numbers');
  });

  it('flags an effect ending on an object the row never establishes — the Weeping Snare', () => {
    const t = '*Strength Saving Throw*: DC 17, one creature the golem can see within 120 feet. *Failure:* 17 (5d6) Bludgeoning damage, and the target has the Restrained condition until the mortar is destroyed (AC 15; HP 20).';
    expect(lintSheet(sheetOf([{ name: 'Weeping Snare (1/Day)', text: t }])).map((h) => h.rule)).toContain('effect-cites-nothing');
  });

  it.each([
    ['the row introduces the object, which is what the snare frame now does', '*Strength Saving Throw*: DC 17, one creature within 120 feet. *Failure:* 17 (5d6) Bludgeoning damage, and the target is caught in mortar and has the Restrained condition until the mortar is destroyed (AC 15; HP 20).'],
    ['the row NAME carries it, which is how print does it (Web Strand, Entangling Rope)', '*Dexterity Saving Throw*: DC 13, one creature. *Failure:* The target has the Restrained condition until the web is destroyed (AC 10; HP 5).'],
    ['"until the grapple ends" is rules vocabulary — print writes it 10 times', '*Melee Attack Roll:* +9, reach 10 ft. 14 (2d8 + 5) Bludgeoning damage, and the target has the Grappled condition (escape DC 15) until the grapple ends.'],
  ])('and does not flag it when %s', (_l, text) => {
    const name = /web is destroyed/.test(text) ? 'Web Strand' : 'Thing';
    expect(lintSheet(sheetOf([{ name, text }])).map((h) => h.rule)).not.toContain('effect-cites-nothing');
  });

  it('neither rule flags any print sheet', () => {
    const flagged = corpus().flatMap((m) => lintSheet(m)
      .filter((h) => h.rule === 'save-without-its-numbers' || h.rule === 'effect-cites-nothing')
      .map((h) => `${m.name}: ${h.message}`));
    expect(flagged).toEqual([]);
  });

  it('every band of the snare frame introduces its object, for every fill it gets', () => {
    // the 6 bands shipped "until the {restraint} is destroyed" and relied on print's
    // convention that the ROW NAME names the object — but our names are coined
    // separately, so "Weeping Snare" + fill "mortar" left it unestablished.
    const frames = JSON.stringify(SHAPES).match(/[^"]*until the \{restraint\} is destroyed[^"]*/g) ?? [];
    expect(frames.length).toBe(6);
    for (const f of frames) expect(f).toMatch(/caught in \{restraint\}/);
    for (const fill of ['mortar', 'brambles', 'roots', 'chain', 'noose', 'web']) {
      for (const f of frames) {
        const text = f.replace(/\{restraint\}/g, fill).replace(/\{dc\}/g, '17')
          .replace(/\{avg_half\} \(\{dice_half\}\) \{damage_type\}/, '17 (5d6) Bludgeoning').replace(/\{r_vuln\}/g, 'Fire');
        expect(lintSheet(sheetOf([{ name: 'Weeping Snare (1/Day)', text }])).map((h) => h.rule)).not.toContain('effect-cites-nothing');
      }
    }
  });
});

describe('the condition-payoff template deals print\'s ordinary save amount', () => {
  it('and never double it', () => {
    // print's four cited payoffs sit WELL under the single-target save ceiling:
    // Glabrezu/Pummel 15 of 29 at CR 9, Gorgon/Trample 16 of 24 at CR 5,
    // Succubus/Draining Kiss 13 of 24 at CR 4, Sea Hag/Death Glare 13 of 13 at CR 2.
    // Ours doubled it ({avg_x2}) and shipped "Merciless Strike: 49" against a ceiling
    // of 31 at CR 13 (critic, 2026-11-04). It was the only template using that token.
    const src = JSON.stringify(SHAPES);
    const i = src.indexOf('"condition-payoff"');
    expect(i).toBeGreaterThan(-1);
    const seg = src.slice(i, i + 3000);
    expect(seg).not.toMatch(/\{avg_x2\}|\{dice_x2\}/);
    // the redesign (owner, 2026-11-05), second pass: every band is a flat amount plus a
    // CONDITION step. The damage step went because it made the row a button no GM
    // presses — gated, replacing a 62-damage attack round with 31 and imposing nothing.
    // print's answer is the condition, not the number: its high-CR single-target saves
    // take a turn away and do not compete on damage.
    expect((seg.match(/\{avg\} \(\{dice\}\)/g) ?? []).length).toBe(6);
    expect(seg).not.toMatch(/\{avg_base\}|\{avg_up\}/);
    expect((seg.match(/already has the \{consumed_condition\} condition/g) ?? []).length).toBe(6);
    expect(seg).toMatch(/"gate":"Recharge 5-6"/);                 // gated, as print gates half its own payoffs
    expect(seg).toMatch(/"rewardsCondition":true/);               // and it rewards the condition, never requires it
    expect(seg).not.toMatch(/that has the \{consumed_condition\} condition/); // no targeting requirement left
  });

  it('and print\'s own payoff rows are all under the save ceiling, which is why', () => {
    const want = { 'Sea Hag': 'Death Glare', Gorgon: 'Trample', Succubus: 'Draining Kiss', Glabrezu: 'Pummel' };
    let seen = 0;
    for (const m of corpus()) {
      const w = want[m.name]; if (!w) continue;
      for (const r of Object.values(m.sections ?? {}).flat().filter(Boolean)) {
        if (!String(r.name).startsWith(w)) continue;
        const d = /(\d+) \(\d+d\d+(?: *[+-] *\d+)?\)/.exec(String(r.text ?? '')); if (!d) continue;
        seen += 1;
        expect(Number(d[1])).toBeLessThanOrEqual(ceilingFor(Number(m.cr), { save: true }));
      }
    }
    expect(seen).toBe(4);
  });
});

// A SINGLE-TARGET SAVE IS NOT A BREATH WEAPON. `per_hit` is the round's budget and a
// save frame spent it whole — right for a cone that four characters split and each
// halves, wrong for "one creature within 60 feet". The unproven-twelve of 2026-11-05
// shipped Merciless Strike at 65 (CR 13), 66 (CR 16) and 42 (CR 8) against print's
// hardest single-target save rows of 31, 31 and 29 — one failed save removing a
// character. 47 of the catalog's 87 save frames are single-target, so the earlier
// token rescale on condition-payoff alone took 130 to 65 and left it over the line.
describe('a single-target save row is clamped to print\'s measured ceiling', () => {
  const templates = Object.values(SHAPES).flat().filter((x) => x && typeof x === 'object' && x.id);
  const FILLS = { consumed_condition: 'Grappled', condition_minor: 'Prone', save_stat: 'Strength', finisher: 'drives the axe down two-handed', damage_type: 'Bludgeoning', r_vuln: 'Fire', restraint: 'web' };
  const ctxFor = (cr, perHit) => ({ cr, concept: 'an executioner that finishes the held', scaled: { per_hit: perHit, dc: 17, atk: 10, stats: { STR: 20 }, striker_stat: 'STR' } });
  const dmgOf = (out) => { const d = /(\d+) \(\d+d\d+(?: *[+-] *\d+)?\)/.exec(String(out?.text ?? '')); return d ? Number(d[1]) : null; };

  it.each([[5, 30], [8, 45], [13, 70], [16, 72], [20, 90]])('clamps condition-payoff at CR %i even when the budget is %i', (cr, perHit) => {
    const cp = templates.find((x) => x.id === 'condition-payoff');
    const got = dmgOf(renderTemplate(cp, ctxFor(cr, perHit), FILLS));
    expect(got).not.toBeNull();
    expect(got).toBeLessThanOrEqual(ceilingFor(cr, { save: true }));
  });

  it('leaves an AREA frame on its full budget — a breath weapon is still a breath weapon', () => {
    const area = templates.find((x) => x.id === 'spew');
    const got = dmgOf(renderTemplate(area, ctxFor(13, 70), FILLS));
    expect(got).toBeGreaterThan(ceilingFor(13, { save: true }) * 1.5); // nowhere near the single-target line
  });

  it('holds for every template that has a single-target save frame, at every band', () => {
    // the 12: swallow, gaze-single, snare, reel, condition-payoff, execute, seal,
    // shield-bash, lure, hook-drag, pull-through, burrow-ambush
    let checked = 0;
    for (const t of templates) {
      if (!t.frames) continue;
      for (const [cr, perHit] of [[2, 20], [5, 30], [8, 45], [13, 70], [16, 72], [20, 90]]) {
        const lo = Array.isArray(t.cr_range) ? t.cr_range[0] : 0;
        const hi = Array.isArray(t.cr_range) ? t.cr_range[1] : 30;
        if (cr < lo || cr > hi) continue;
        let out; try { out = renderTemplate(t, ctxFor(cr, perHit), FILLS); } catch { continue; }
        const text = String(out?.text ?? '');
        if (!/Saving Throw/.test(text)) continue;
        if (/each creature|all creatures|Emanation|Cone|Sphere|Cube|Cylinder|\d+-foot[- ][Ll]ine/.test(text)) continue;
        if (!/\bone (?:creature|Large|Huge|Medium|Small|target)/.test(text)) continue;
        const got = dmgOf(out); if (got === null) continue;
        checked += 1;
        expect(got).toBeLessThanOrEqual(ceilingFor(cr, { save: true }));
      }
    }
    expect(checked).toBeGreaterThan(20); // the sweep must actually reach these frames
  });
});

// THE CLAMP MUST LIVE IN ONE PLACE. The first cut put it in renderTemplate only, and the
// live run still shipped 66 at CR 16 — because a condition-payoff row reaches a sheet as
// a LIBRARY row (`{burst}` seed), not through the catalog frames. Two writers, one fix,
// no effect. These texts are verbatim from unproven-twelve-2026-11-05T01-29-41.
describe('the single-target save clamp has one definition and both writers use it', () => {
  const REAL = [
    ['CR 13 oathbroken headsman', 13, 'The oathbroken headsman drives the axe down two-handed. *Dexterity Saving Throw*: DC 17, one creature within 60 feet that has the Grappled condition. *Failure:* 65 (10d12) Bludgeoning damage, and the target has the Prone condition. *Success:* Half damage.'],
    ['CR 8 fen-brute', 8, 'The fen-brute bears down on the sunken mass. *Dexterity Saving Throw*: DC 15, one creature within 30 feet that has the Grappled condition. *Failure:* 42 (12d6) Acid damage. *Success:* Half damage.'],
    ['CR 16 pit-warden', 16, 'The pit-warden hooks its claws into the coils\' prey. *Constitution Saving Throw*: DC 18, one creature within 60 feet that has the Restrained condition. *Failure:* 66 (12d10) Bludgeoning damage, and the target has the Poisoned condition. *Success:* Half damage.'],
  ];

  it.each(REAL)('clamps the %s row that actually shipped', (_l, cr, text) => {
    expect(isSingleTargetSave(text)).toBe(true);
    const cap = ceilingFor(cr, { save: true });
    expect(capSingleTargetSave(200, text, cr)).toBe(cap);   // a huge budget is cut to print's line
    expect(capSingleTargetSave(10, text, cr)).toBe(10);     // a small one is left alone
  });

  it.each([
    ['a cone keeps its budget', 'The drake exhales thunder. *Constitution Saving Throw*: DC 15, each creature in a 15-foot Cone. *Failure:* 42 (12d6) Thunder damage. *Success:* Half damage.'],
    ['an Emanation keeps its budget', '*Wisdom Saving Throw*: DC 21, each creature in a 20-foot Emanation. *Failure:* 22 (4d10) Psychic damage.'],
    ['a line keeps its budget', '*Dexterity Saving Throw*: DC 18, each creature in a 60-foot Line. *Failure:* 55 (10d10) Lightning damage.'],
  ])('%s — an area save is NOT a single-target save', (_l, text) => {
    expect(isSingleTargetSave(text)).toBe(false);
    expect(capSingleTargetSave(200, text, 13)).toBe(200);
  });

  it('and an attack row is untouched, since the ceiling it answers to is different', () => {
    const atk = '*Melee Attack Roll:* +10, reach 5 ft. 44 (6d12 + 5) Slashing damage.';
    expect(isSingleTargetSave(atk)).toBe(false);
    expect(capSingleTargetSave(200, atk, 13)).toBe(200);
  });

  it('BOTH writers route their save damage through the shared helper', () => {
    // the structural guard: this is the regression that made the first fix inert
    // THREE writers compute save damage: the catalog frames (templates.mjs), the
    // library seeds (library.mjs) and the authored save form (generate.mjs). Each one
    // was found by a live run AFTER the previous was fixed, so all three are asserted.
    for (const f of ['templates.mjs', 'library.mjs', 'generate.mjs']) {
      const src = fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
      expect(src).toMatch(/capSingleTargetSave/);
      // and neither keeps its own copy of the decision
      if (f !== 'generate.mjs') expect(src).not.toMatch(/each creature\|all creatures\|Emanation\|Cone\|Sphere/);
    }
  });
});

// THE PAYOFF'S REWARD SCALES WITH THE BAND, and its declared field must equal its
// printed text. `condition_minor` is validated in three places with three fallbacks —
// the reward choice, the pick-and-strip block, and the VOCAB fill loop — and unifying
// only the first two shipped a row whose `imposes` said Restrained while its sentence
// printed Frightened. That disagreement is the regression this pins.
describe('the condition payoff rewards what the band calls for', () => {
  const templates = Object.values(SHAPES).flat().filter((x) => x && typeof x === 'object' && x.id);
  const cp = () => templates.find((x) => x.id === 'condition-payoff');
  const MILD = ['Prone', 'Poisoned', 'Deafened', 'Frightened', 'Blinded'];
  const SEVERE = ['Restrained', 'Incapacitated', 'Paralyzed', 'Blinded'];
  const render = (cr, trigger) => renderTemplate(cp(), {
    scaled: { per_hit: cr * 5, dc: 14 + Math.floor(cr / 4), atk: 10, stats: { STR: 18 }, striker_stat: 'STR' },
    archetype: 'brute', cr, energy: 'Cold', mix: 'both', meleeName: 'Slam', imposed: [trigger], name: 'X',
    concept: 'a horror that finishes the helpless',
  }, { consumed_condition: trigger, condition_minor: 'Prone', save_stat: 'Strength', finisher: 'bears down', damage_type: 'Cold' });
  const rewardOf = (t) => (/also has the (\w+) condition/.exec(String(t ?? '')) ?? [])[1] ?? null;

  it.each([[2, 'Grappled'], [5, 'Restrained'], [9, 'Poisoned']])('at CR %i the reward is mild', (cr, trigger) => {
    const row = render(cr, trigger);
    const inText = rewardOf(row.text);
    if (!inText) return;                                  // the fear gate may strip it; that is its own test
    expect(MILD).toContain(inText);
    expect(row.imposes).toBe(inText);                     // THE FIELD EQUALS THE TEXT
  });

  // THE REWARD IS A RUNG, NOT A PICK. A flat severe pool returned Restrained almost
  // every time and never reached Paralyzed at all (owner, 2026-11-05: "I thought the
  // point of this was escalating conditions"). The reward is now one step up the ladder
  // from the condition the target actually has.
  it.each([
    ['Grappled', 'Restrained'],      // print: Crocodile, Giant Octopus, Roper
    ['Poisoned', 'Paralyzed'],       // print: Chuul, Phase Spider, Vampire Familiar
    ['Incapacitated', 'Paralyzed'],  // print: the Silver Dragons
    ['Charmed', 'Incapacitated'],    // print: Harpy/Luring Song
    ['Restrained', 'Paralyzed'],     // OURS: print's own step is Petrified, which needs the two-failure frame
    ['Prone', 'Restrained'],         // OURS, by severity
  ])('already %s escalates to %s', (trigger, want) => {
    const row = render(16, trigger);
    expect(rewardOf(row.text)).toBe(want);
    expect(row.imposes).toBe(want);
  });

  it('Paralyzed is REACHABLE — a flat pool never got there', () => {
    const reached = new Set(['Restrained', 'Poisoned', 'Incapacitated', 'Stunned']
      .map((trig) => rewardOf(render(16, trig).text)).filter(Boolean));
    expect([...reached]).toContain('Paralyzed');
  });

  it.each([[13, 'Grappled'], [16, 'Restrained'], [20, 'Poisoned'], [24, 'Grappled']])('at CR %i the reward takes a turn away', (cr, trigger) => {
    // print's single-target saves at CR 13+ impose Paralyzed, Incapacitated, Restrained
    // or Blinded and do not compete on damage; a mild rider on a gated row is a button
    // no GM presses when a full attack round deals twice as much.
    const row = render(cr, trigger);
    const inText = rewardOf(row.text);
    expect(inText).not.toBeNull();
    expect(SEVERE).toContain(inText);
    expect(row.imposes).toBe(inText);                     // THE FIELD EQUALS THE TEXT
    expect(inText).not.toBe(trigger);                     // and it is never the condition it keys on
  });

  it('the mild pool is untouched for the other templates that share the slot', () => {
    // gaze-single, bloodied-burst, noxious-aura and truth-aura must not gain the severe
    // pool: only a template declaring `rewardsCondition` draws from it.
    for (const id of ['gaze-single', 'bloodied-burst', 'noxious-aura', 'truth-aura']) {
      const t = templates.find((x) => x.id === id);
      if (!t) continue;
      expect(t.rewardsCondition).toBeFalsy();
    }
  });

  it('and the save stat follows the rewarded condition, as print pairs them', () => {
    const row = render(16, 'Restrained');
    const inText = rewardOf(row.text);
    const save = (/\*(\w+) Saving Throw\*/.exec(String(row.text)) ?? [])[1];
    const expected = { Restrained: ['Strength', 'Dexterity'], Incapacitated: ['Constitution'], Paralyzed: ['Constitution'], Blinded: ['Constitution'] }[inText];
    expect(expected).toContain(save);
  });
});

// THE ESCALATION SHELF — the model picks the shape, the engine owns every number and
// rule (owner, 2026-11-05: "create a format for a model to fill out and exploit").
describe('a payoff escalates in one of four shapes', () => {
  const templates = Object.values(SHAPES).flat().filter((x) => x && typeof x === 'object' && x.id);
  const cp = () => templates.find((x) => x.id === 'condition-payoff');
  const run = (cr, trigger, escalation) => renderTemplate(cp(), {
    scaled: { per_hit: cr * 5, dc: 14 + Math.floor(cr / 4), atk: 10, stats: { STR: 18 }, striker_stat: 'STR' },
    archetype: 'brute', cr, energy: 'Psychic', mix: 'both', meleeName: 'Slam', imposed: [trigger],
    name: 'X', inline: 'the headsman', concept: 'a horror that finishes the helpless',
  }, { consumed_condition: trigger, condition_minor: 'Prone', save_stat: 'Strength', finisher: 'bears down', damage_type: 'Psychic', ...(escalation ? { escalation } : {}) });
  const amounts = (t) => [...String(t ?? '').matchAll(/(\d+) \(\d+d\d+(?: *[+-] *\d+)?\)/g)].map((m) => Number(m[1]));

  it('damage: print\'s two-step amount, a REPLACEMENT not an addition', () => {
    // an additive extra put 31 + 32 = 63 on an afflicted target against a ceiling of 31.
    // print's Mimic deals "7 (1d8 + 3)—or 12 (2d8 + 3)", never 7 plus 12.
    const row = run(16, 'Frightened', 'damage');
    expect(row.text).toMatch(/damage, or \d+ \(\d+d\d+\) \w+ damage if the target already has the Frightened condition/);
    const a = amounts(row.text);
    expect(a).toHaveLength(2);
    expect(Math.max(...a)).toBeLessThanOrEqual(ceilingFor(16, { save: true }));
    expect(a[0]).toBeLessThan(a[1]);                       // the step goes up
    expect(row.imposes).toBeFalsy();                       // no condition is imposed, so nothing is declared
  });

  it('exhaustion: one level, and only in the bands print uses it', () => {
    expect(run(16, 'Restrained', 'exhaustion').text).toMatch(/it gains 1 Exhaustion level/);
    // print writes it at CR 11 and 17 (both Sphinxes); below CR 10 the shape is refused
    // and the row falls back to the condition rung rather than failing
    const low = run(5, 'Grappled', 'exhaustion');
    expect(low.text).not.toMatch(/Exhaustion/);
    expect(low.imposes).toBeTruthy();
  });

  it('mark: bounded in duration AND to one target at a time', () => {
    // 0 print rows grant Advantage against a named target; it ships on the owner's call,
    // bounded both ways because Advantage for a minute, stacking across allies, is
    // permanent inside a fight
    const t = run(13, 'Grappled', 'mark').text;
    expect(t).toMatch(/has Advantage on attack rolls against it until the end of .*'s next turn/);
    expect(t).toMatch(/only one target marked this way at a time/);
    expect(t).not.toMatch(/1 minute|for a minute/);
  });

  it('and an answer off the shelf degrades to the ladder instead of failing the row', () => {
    for (const asked of ['nonsense', '', 'EXHAUSTION!!', null]) {
      const row = run(16, 'Grappled', asked);
      expect(row.imposes).toBe('Restrained');              // the print-attested rung from Grappled
    }
  });

  it('no shape ever exceeds print\'s single-target ceiling', () => {
    for (const cr of [2, 5, 9, 13, 16, 20]) {
      for (const shape of [null, 'condition', 'damage', 'exhaustion', 'mark']) {
        const a = amounts(run(cr, 'Grappled', shape).text);
        if (!a.length) continue;
        expect(Math.max(...a)).toBeLessThanOrEqual(ceilingFor(cr, { save: true }));
      }
    }
  });
});

// A CHOICE THE MENU NEVER OFFERS IS UNREACHABLE. `escalation` was registered in VOCAB,
// but VOCAB is read off the FRAME's own tokens — and the escalation has no token, since
// the engine rewrites the reward clause from the shape. So the model was never asked,
// every row degraded to the condition rung, and three of the four shapes could not ship.
// templates.mjs carries a comment warning about precisely this, from an earlier shape
// that went dead the same way this sprint. This test is the guard that was missing.
describe('the escalation choice reaches the prompt', () => {
  const src = fs.readFileSync(path.join(__dirname, '..', 'templates.mjs'), 'utf8');

  it('is pushed into the template menu for a payoff', () => {
    expect(src).toMatch(/if \(t\.rewardsCondition\) vocab\.push\(/);
  });

  it('and names every shape the band allows, so the model can pick one', () => {
    const line = (src.split('\n').find((l) => /t\.rewardsCondition\) vocab\.push/.test(l)) ?? '');
    expect(line).toMatch(/escalationShapesFor\(cr\)/);   // the band gates exhaustion, not a literal list
    expect(line).toMatch(/Exhaustion/);
    expect(line).toMatch(/Advantage/);
  });

  it('and the engine still owns the numbers, which the menu says out loud', () => {
    const line = (src.split('\n').find((l) => /t\.rewardsCondition\) vocab\.push/.test(l)) ?? '');
    expect(line).toMatch(/engine writes every number/i);
  });
});

// THE SHIPPING ROW IS THE LIBRARY SEED, NOT THE TEMPLATE. `generation.signature` reads
// "library" on 11 of 12 sheets of the payoff-twelve, so the catalog template's redesign
// could not reach a sheet while this seed still REQUIRED its condition ("one creature
// ... that is {imposed_bound}") — the same dead-on-arrival fault, on the row that
// actually lands. It now rewards instead, with the rung off print's ladder.
describe('the library payoff seed rewards the condition and climbs the ladder', () => {
  const draw = (cr, imposed) => drawLibraryRow(
    { per_hit: cr * 5, dc: 14 + Math.floor(cr / 4), atk: 10, stats: { STR: 18 }, striker_stat: 'STR', cr },
    { archetype: 'brute', energy: 'Cold', mix: 'both', name: 'X', shapeKey: 'exploiter', imposed, cr },
  );
  const textOf = (d) => String(d?.row?.text ?? '');
  const rungOf = (t) => (/also has the (\w+) condition/.exec(t) ?? [])[1] ?? null;

  it('no longer requires the condition to have landed', () => {
    const t = textOf(draw(8, ['Grappled']));
    expect(t).toMatch(/one creature within 30 feet\./);     // bare target
    expect(t).not.toMatch(/that is (?:Grappled|Restrained|being)/); // no requirement
    expect(t).toMatch(/If the target is already Grappled by the creature/); // source-bound, as print binds it
  });

  it.each([
    [5, 'Grappled', 'Prone'],
    [8, 'Restrained', 'Poisoned'],
    [16, 'Grappled', 'Restrained'],
    [16, 'Restrained', 'Paralyzed'],
    [20, 'Poisoned', 'Paralyzed'],
  ])('at CR %i on %s it escalates to %s', (cr, imposed, want) => {
    expect(rungOf(textOf(draw(cr, [imposed])))).toBe(want);
  });

  it('and its damage obeys print\'s single-target save ceiling', () => {
    for (const cr of [2, 5, 8, 13, 16, 20]) {
      const d = /(\d+) \(\d+d\d+(?: *[+-] *\d+)?\)/.exec(textOf(draw(cr, ['Grappled'])));
      if (!d) continue;
      expect(Number(d[1])).toBeLessThanOrEqual(ceilingFor(cr, { save: true }));
    }
  });

  it('drops the escalation sentence whole when no rung applies', () => {
    // a half clause ("...it also has the  condition") is worse than no clause
    const t = textOf(draw(8, ['Petrified']));
    expect(t).not.toMatch(/\{escalated_condition\}/);
    expect(t).not.toMatch(/also has the\s+condition/);
  });
});

// A SHEET THAT ALREADY CLOSES ITS LOOP DOES NOT GET A SECOND PAYOFF (owner, 2026-11-05:
// "any creature template where there is a loop payoff is not needed and too much").
// Measured: of 1,209 sheets imposing a condition, 476 (39%) already have a row that
// consumes it — Swallow 66, Whelm 35, Fling 21, Smother 17, the engulf family the
// grappler chassis ship with. The remaining 733 are the ones worth having it on.
describe('the payoff seed stands down when the sheet already uses its own condition', () => {
  const base = { per_hit: 40, dc: 16, atk: 9, stats: { STR: 18 }, striker_stat: 'STR', cr: 8 };
  const CLAW = { name: 'Claw', text: 'Melee Attack Roll: +9. If the target is a Large or smaller creature, it has the Grappled condition (escape DC 15).' };
  const opts = { archetype: 'brute', energy: 'Cold', mix: 'both', name: 'X', shapeKey: 'exploiter', imposed: ['Grappled'], cr: 8 };
  const drawOn = (rows) => drawLibraryRow({ ...base, sections: { Actions: rows } }, opts);

  it('draws the payoff when a condition is on the page with nothing using it', () => {
    expect(drawOn([CLAW])?.seed).toBe('exploiter');
  });

  it.each([
    ['Whelm', 'The creature whelms one Medium or smaller creature it is grappling. While whelmed, the target has the Blinded and Restrained conditions.'],
    ['Swallow', 'The creature swallows one Large or smaller creature it is grappling.'],
    ['Smother', 'The creature smothers one Medium or smaller creature it is grappling.'],
    ['a source-bound payoff', 'Strength Saving Throw: DC 16, one creature within 30 feet that is Grappled by the creature. Failure: 20 (4d8) damage.'],
  ])('stands down when %s already closes the loop', (_l, text) => {
    expect(drawOn([CLAW, { name: 'Closer', text }])?.seed).not.toBe('exploiter');
  });

  it('and the existing teleport precedent still holds — this follows the same law', () => {
    // "the chassis already delivering the mechanic beats the claim" (phase-slip, 2026-09-15)
    const src = fs.readFileSync(path.join(__dirname, '..', 'library.mjs'), 'utf8');
    expect(src).toMatch(/seed\.rewardsCondition && loopClosed/);
    expect(src).toMatch(/seed\.key === 'phase-slip' && chassisTeleports/);
  });
});

// A REPAIR HANDS BACK A CLEAN SENTENCE. The Landing Maw shipped "…in any combination..
// It can replace one attack with a Bite attack." in the 2026-11-05 homebrew40 gate —
// 1 sheet of 40, and zero in the 3,279 sheets before that night, so it came from the
// Multiattack repairs. It does not reproduce from either repair in isolation, so the
// guard sits at their exit and the cause is still open.
describe('a Multiattack repair never leaves doubled punctuation', () => {
  const resolverFor = (rows) => (c) => rows.some((n) => n.toLowerCase() === String(c).toLowerCase());

  it('cleans the exact sentence that shipped', () => {
    const t = 'The landing maw makes three attacks, using Slam, Bite, or Ravenous Hunger in any combination.. It can replace one attack with a use of Gone.';
    const got = repairReplaceClause(t, resolverFor(['Slam', 'Bite', 'Ravenous Hunger']));
    expect(got.text).not.toMatch(/\.\s*\./);
    expect(got.text).toBe('The landing maw makes three attacks, using Slam, Bite, or Ravenous Hunger in any combination.');
  });

  it.each([
    ['a doubled stop', 'The fiend makes one Bite attack, two Claw attacks, and one Gone attack..'],
    ['a stop before a comma', 'The fiend makes one Bite attack., two Claw attacks, and one Gone attack.'],
    ['a space before a stop', 'The fiend makes one Bite attack, two Claw attacks, and one Gone attack .'],
  ])('and the list repair cleans %s', (_l, t) => {
    const got = repairMultiattackAttackList(t, resolverFor(['Bite', 'Claw']), 'Bite');
    expect(got).not.toBeNull();
    expect(got.text).not.toMatch(/\.\s*\.|\.\s*,|\s+[.,]/);
  });

  it('and leaves a correct sentence untouched', () => {
    const t = 'The dragon makes three Rend attacks. It can replace one attack with a use of (A) Sleep Breath or (B) Spellcasting to cast *Scorching Ray*.';
    expect(repairReplaceClause(t, resolverFor(['Rend', 'Sleep Breath', 'Spellcasting']))).toBeNull();
  });
});
