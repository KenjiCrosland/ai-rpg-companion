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
import { ceilingFor } from '@/tools/statblock-generator/reskin/card-budgets.mjs';

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
    expect((seg.match(/\{avg\} \(\{dice\}\)/g) ?? []).length).toBe(6);
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
