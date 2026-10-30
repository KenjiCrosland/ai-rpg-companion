/**
 * A RIDER THAT OUTLASTS THE TARGET'S NEXT TURN LANDS AT MOST ONCE A TURN.
 *
 * The critic's section 2 (2026-10-30): the Dire Wolf's Bite (CR 1, two a turn)
 * and the Adult Red Dragon's Rend (three a turn plus Pounce) each carried a
 * rest-long "Poisoned, and can't regain Hit Points" rider. `contagion`'s own
 * comment already recorded that print never does this — and nothing enforced it.
 *
 * Print's seven such rows each use one of three devices, measured here so the
 * calibration cannot drift: the four lycanthropes replace one attack, the
 * Cockatrice has no Multiattack, and the Incubus's curse is ONE named curse, so
 * the second Restless Touch is a no-op. `contagion` now takes the third.
 *
 * The weld-side half of the fix — an unasked rider never rewrites a print row —
 * lives inline in generate.mjs's rider weld and is reachable only in-pipeline;
 * the smoke covers it (the Dire Wolf is item 1 of the forty).
 */
import printBlocks from '@/data/srd52-monsters.json';
import { SHAPES } from '@/tools/statblock-generator/reskin/shapes.mjs';
import { stampAttacksPerRound } from '@/tools/statblock-generator/reskin/scale.mjs';

// A FAILURE effect that outlasts the target's next turn. Print's success side
// always carries "immune to this creature's X for 24 hours", which is a grace
// period and not a duration on the target, so it is cut before matching — my
// first pass at this counted those and reported a population it did not have.
const failureSide = (t) => { const s = String(t).replace(/\s+/g, ' '); const i = s.search(/\*Success:\*/); return i < 0 ? s : s.slice(0, i); };
const OUTLASTS = /(?:finishes a (?:Long|Short) Rest|until cured|is cured by|cursed for 24 hours|The target is cursed\b(?!.{0,40}?for \d))/i;
const outlasts = (t) => OUTLASTS.test(failureSide(t));
const IDEMPOTENT = /(?:isn't|is not|doesn't|does not) already/i;

describe("print: a rest-long rider never lands twice", () => {
  const rows = printBlocks.flatMap((b) => Object.entries(b.sections ?? {})
    .flatMap(([, rs]) => rs.map((r) => ({ block: b, row: r }))))
    .filter(({ row }) => /Attack Roll/.test(row.text ?? '') && outlasts(row.text));

  it('finds print\'s sample, so the rule below is measured and not asserted', () => {
    expect(rows.length).toBe(7); // Incubus, Otyugh, and the five lycanthropes
  });

  it.each(rows.map(({ block, row }) => [block.name, row.name]))('%s / %s lands at most once a turn, or re-applies as a no-op', (bn, rn) => {
    const block = printBlocks.find((b) => b.name === bn);
    const sections = JSON.parse(JSON.stringify(block.sections ?? {}));
    stampAttacksPerRound(sections); // the engine's own read of the Multiattack sentence, not a second one
    const row = Object.values(sections).flat().find((r) => r.name === rn);
    const once = Number(row.attacksPerRound ?? 1) <= 1;
    // the Incubus: one named curse, so the second touch changes nothing
    const noop = /the target is cursed for 24 hours or until/i.test(String(row.text ?? ''));
    expect(once || noop).toBe(true);
  });
});

describe('our rider shapes obey it', () => {
  const riders = SHAPES.filter((s) => /-rider$/.test(String(s.replaces ?? '')) && s.frames);
  const offending = riders.flatMap((s) => Object.entries(s.frames)
    .filter(([, t]) => outlasts(t) && !IDEMPOTENT.test(String(t)))
    .map(([band]) => `${s.id}/${band}`));

  it('every rider frame that outlasts the next turn declines to re-apply', () => {
    expect(offending).toEqual([]);
  });

  it('contagion is the frame this was built for, and it carries the guard', () => {
    const c = SHAPES.find((s) => s.id === 'contagion');
    expect(Object.keys(c.frames).length).toBeGreaterThanOrEqual(5);
    for (const t of Object.values(c.frames)) {
      expect(outlasts(t)).toBe(true);
      expect(t).toMatch(IDEMPOTENT);
    }
  });
});
