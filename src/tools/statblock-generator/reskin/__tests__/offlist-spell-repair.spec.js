/**
 * AN OPTION IS DEAD BY ITS SPELL, NOT ONLY BY ITS ROW — and the lint that found it is
 * reachable from the pipeline.
 *
 * The critic's gate of 2026-11-08, their §2a. Two of their four Fixes were a Multiattack
 * offering a spell the sheet cannot cast: #18 Ossuar "Spellcasting to cast *Hold Person*"
 * and #26 Marshena "(B) Spellcasting to cast *Ray of Sickness*". Both shipped because
 * `optionResolves` passes an option whose ROW exists, and `Spellcasting` does exist — the
 * spell was what was dead.
 *
 * It shipped CLEAN because `sheet-lints.mjs` was never called by the pipeline. The trace
 * read "lint: 0 findings" while the offline linter found five on the same forty. Third
 * dead path of the sprint, after the audit's rewrite arm (a flag no site sets) and the
 * duplicate-condition guard (three doors of four). A rule that cannot be reached is worse
 * than no rule, because the trace says 0 and reads as clean.
 */
import { repairReplaceClause } from '../checker.mjs';
import { sheetCanCast, spellListTextOf, lintSheet } from '../sheet-lints.mjs';
import { readFileSync, readdirSync } from 'fs';

const RUN = 'smoke-out/sweep-2026-11-08T05-42-47';
const FLAT = ['abilities', 'actions', 'bonus_actions', 'reactions', 'legendary_actions'];
const rowsOf = (o) => [...Object.values(o?.sections ?? {}).flat(), ...FLAT.flatMap((k) => o?.[k] ?? [])].filter(Boolean);
const sheet = (n) => {
  const f = readdirSync(RUN).find((x) => x.startsWith(`${n}-`) && x.endsWith('.json'));
  const j = JSON.parse(readFileSync(`${RUN}/${f}`, 'utf8'));
  return j.monster ?? j;
};
const repair = (o) => {
  const rows = rowsOf(o);
  const ma = rows.find((r) => /^Multiattack/.test(String(r.name ?? '')));
  const names = rows.map((r) => String(r.name ?? '').replace(/\s*\(.*\)$/, ''));
  const resolves = (x) => names.some((nn) => nn.toLowerCase() === String(x).toLowerCase());
  return repairReplaceClause(String(ma?.text ?? ma?.description ?? ''), resolves, (sp) => sheetCanCast(o, sp));
};

describe("the critic's two off-list Fixes, on their own sheets", () => {
  it('#18 Ossuar: the clause leaves entirely, which is print\'s commonest Multiattack', () => {
    const r = repair(sheet(18));
    expect(r).toBeTruthy();
    expect(r.dropped).toEqual(['Spellcasting to cast Hold Person']); // names the SPELL, not the innocent row
    expect(r.form).toBe(0);
    expect(r.text).not.toMatch(/Hold Person/);
    expect(r.text).toMatch(/Eldritch Burst or Paralyzing Touch/); // the attack list is untouched
  });

  it('#26 Marshena: lettered degrades to its surviving option', () => {
    const r = repair(sheet(26));
    expect(r).toBeTruthy();
    expect(r.dropped).toEqual(['Spellcasting to cast Ray of Sickness']);
    expect(r.form).toBe(1);
    expect(r.text).toMatch(/with a use of Withering Bolt\./); // no "(A)" left stranded
    expect(r.text).not.toMatch(/Ray of Sickness|\(B\)/);
  });

  it('leaves a clause alone when the sheet CAN cast what it offers', () => {
    // same machinery, a spell that is on the list: nothing moves
    const o = sheet(18);
    const rows = rowsOf(o);
    const names = rows.map((r) => String(r.name ?? '').replace(/\s*\(.*\)$/, ''));
    const resolves = (x) => names.some((nn) => nn.toLowerCase() === String(x).toLowerCase());
    const spellRow = rowsOf(o).find((r) => /^Spellcasting/.test(String(r.name ?? '')));
    const onList = String(spellRow?.text ?? spellRow?.description ?? '');
    expect(onList).toMatch(/Fireball/); // it really is on Ossuar's list
    const t = 'Ossuar makes three attacks. It can replace one attack with a use of Spellcasting to cast *Fireball*.';
    expect(repairReplaceClause(t, resolves, (sp) => sheetCanCast(o, sp))).toBeNull();
  });

  it('without the predicate the behaviour is exactly what it was', () => {
    // every existing caller and pin passes two arguments; this must not have changed
    const r = repair(sheet(26));
    const rows = rowsOf(sheet(26));
    const names = rows.map((x) => String(x.name ?? '').replace(/\s*\(.*\)$/, ''));
    const resolves = (x) => names.some((nn) => nn.toLowerCase() === String(x).toLowerCase());
    const ma = rows.find((x) => /^Multiattack/.test(String(x.name ?? '')));
    expect(repairReplaceClause(String(ma.text), resolves)).toBeNull(); // 2-arg: no change
    expect(r).toBeTruthy();                                            // 3-arg: repaired
  });

  it('the lint and the repair share ONE definition of "on a list"', () => {
    // a private copy is how a gate and its sibling drift apart: the lint would fail a
    // sheet for a clause the repair had just judged fine
    const o = sheet(18);
    const lists = spellListTextOf(rowsOf(o).map((r) => ({ ed: 'a', sec: 'Actions', r })));
    expect(lists).toMatch(/Fireball/);
    expect(sheetCanCast(o, 'Fireball')).toBe(true);
    expect(sheetCanCast(o, 'Hold Person')).toBe(false);
  });
});

describe('the sheet lints are reachable from the pipeline', () => {
  it('generate.mjs calls lintSheet and merges its findings', () => {
    const src = readFileSync(require('path').join(__dirname, '..', 'generate.mjs'), 'utf8');
    expect(src).toMatch(/import \{ lintSheet, sheetCanCast \} from '\.\/sheet-lints\.mjs'/);
    expect(src).toMatch(/lintSheet\(monster\)/);
    expect(src).toMatch(/lint\.findings\.push\(\.\.\.sheetHits/);
  });

  it('and sheet-lints no longer imports generate.mjs, so the cycle is gone', () => {
    const src = readFileSync(require('path').join(__dirname, '..', 'sheet-lints.mjs'), 'utf8');
    expect(src).not.toMatch(/from '\.\/generate\.mjs'/);
  });

  it('fires on the two sheets that shipped clean — the proof it was unreachable', () => {
    for (const n of [18, 26]) {
      const hits = lintSheet(sheet(n)).filter((h) => h.rule === 'multiattack-offlist-spell');
      expect(hits.length).toBeGreaterThan(0);
    }
  });
});
