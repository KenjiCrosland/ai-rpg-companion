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
import path from 'node:path';
import { lintSheet, rowsOfSheet, SHEET_LINTS } from '@/tools/statblock-generator/reskin/sheet-lints.mjs';

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
    [27, 'orphan-action-row'],
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
    for (const ix of [4, 26, 40]) expect(rulesOn(ix)).not.toContain('orphan-action-row');
  });

  it('a bare-print sheet is not judged for orphans at all', () => {
    // #19 carries NO engine flags and an empty 2024 side, so provenance is unknowable;
    // print's 2024 corpus has no "Change Shape" row (0 of 329) though every 2014
    // dragon has one, so the name set cannot vouch for it either
    expect(rulesOn(19)).not.toContain('orphan-action-row');
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
  it('still finds every one of the original ten the critic listed', () => {
    const all = fs.readdirSync(RUN).filter((x) => /^\d+-.*\.json$/.test(x))
      .flatMap((f) => lintSheet(JSON.parse(fs.readFileSync(path.join(RUN, f), 'utf8'))));
    const ORIGINAL = ['empty-option', 'missing-number', 'dangling-save', 'duplicate-row-name', 'engulf-needs-a-grapple', 'inline-weapon-collision', 'orphan-action-row', 'double-punctuation'];
    const byRule = all.reduce((m, f) => ({ ...m, [f.rule]: (m[f.rule] ?? 0) + 1 }), {});
    const originalCount = ORIGINAL.reduce((n, r) => n + (byRule[r] ?? 0), 0);
    expect(originalCount).toBe(10);
    expect(all.length).toBeGreaterThanOrEqual(10);
  });

  it('reads every row of both printings', () => {
    const rows = rowsOfSheet(sheetFor(2));
    expect(rows.length).toBeGreaterThan(4);
    expect(new Set(rows.map((x) => x.ed)).size).toBeGreaterThan(1);
  });
});
