/**
 * THE WRITER'S RECORD SURVIVES THE RECONCILE.
 *
 * Roadmap item 1a: `imposes` sat at 22 of 25 rows whose text imposes a condition.
 * The three owing rows had TWO different causes, and neither was a missing stamp
 * at the fill site the plan predicted.
 *
 * (i) The reconcile pass asked `imposedConditions` "is the clause still there?".
 *     That function answers a different question — "does this row IMPOSE this?" —
 *     and carries a deliberate `PRECONDITION` guard whose first arm is "an `if`
 *     appears earlier in this sentence", there to keep out Evasion's "can't use
 *     this trait if it has the Incapacitated condition". Print's SIZE GATE is also
 *     an `if`: "if the target is Medium or smaller, it has the Prone condition".
 *     So every size-gated imposition read as imposing nothing and the reconcile
 *     deleted a TRUE catalog record — 6 of 8 firings on the last forty.
 *     `IMPOSES_BY_TEMPLATE` already annotates three such entries "behind a size
 *     gate", so the catalog knew what the reader could not see.
 *
 * (ii) Nine donor rows impose Prone in their own text and declared nothing — the
 *     mounted and winged charge riders and the hurler's burst. The four
 *     `brute-*-charger` Tramples that match the same words REQUIRE Prone
 *     ("one creature within 5 feet that has the Prone condition") and must stay
 *     undeclared; the reader's `that\s*$` arm is right about those.
 *
 * The blind spot is PINNED rather than fixed: `imposedConditions` is a judge and
 * its guard is correct for judging. What changed is that it is no longer allowed
 * to overrule the writer.
 */
import { imposedConditions } from '@/tools/statblock-generator/reskin/author.mjs';
import { imposedByFrame } from '@/tools/statblock-generator/reskin/templates.mjs';
import { DONORS } from '@/tools/statblock-generator/reskin/donors.mjs';
import { generateReskin, renameKeysOf } from '@/tools/statblock-generator/reskin/generate.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const SIZE_GATED = '*Strength Saving Throw*: DC 15, one creature within 5 feet that the drake can see. *Failure:* 9 (2d8) Bludgeoning damage, and if the target is Medium or smaller, it has the Prone condition. *Success:* Half damage only.';

describe('the reader sees a size gate, and still refuses a precondition', () => {
  // The blind spot that caused (i) was not worked around — it was removed, and
  // print is why. Of the 49 `if` clauses standing before "has the X condition" in
  // the corpus, 47 are a SIZE restriction on the imposition ("If the target is a
  // Large or smaller creature", 24 times; Medium 18; Huge 5) or an HP threshold,
  // and all 47 are real impositions. Exactly ONE is the Evasion-style precondition
  // the guard exists for. So the guard's `if` arm was suppressing 47 true readings
  // to catch 1; the size/HP clause is now removed from the window before it runs.
  //
  // `imposes-grammar.spec.js` — "every tag agrees with the grammar that reads it"
  // — passes unmodified after this, which is the evidence that the reader was
  // wrong rather than the tags.
  it.each([
    ['print\'s own wording', '10 damage. If the target is a Large or smaller creature, it has the Prone condition.', ['Prone']],
    ['our donor\'s wording', '10 damage and, if it is Large or smaller, has the Prone condition.', ['Prone']],
    ['shield-bash\'s wording', '*Failure:* 9 (2d8) Bludgeoning damage, and if the target is Medium or smaller, it has the Prone condition.', ['Prone']],
    ['an HP threshold', 'If the target has 20 Hit Points or fewer, it has the Unconscious condition.', ['Unconscious']],
  ])('reads a size-gated imposition: %s', (_l, text, want) => {
    expect(imposedConditions({ name: 'X', text }).sort()).toEqual(want);
  });

  it.each([
    ['Evasion — the one row the guard is for', "takes no damage if it fails. It can't use this trait if it has the Incapacitated condition."],
    ['Trample — the condition is REQUIRED of the target', 'DC 12, one creature within 5 feet that has the Prone condition. *Failure:* 9 damage.'],
    ['an "already" clause', 'if the target already has the Poisoned condition, nothing happens.'],
  ])('still refuses a precondition: %s', (_l, text) => {
    expect(imposedConditions({ name: 'X', text })).toEqual([]);
  });

  it('and the catalog declares it too, so neither side stands alone', () => {
    for (const band of ['0-2', '3-5', '6-9', '10-12', '13-20', '21+']) {
      expect(imposedByFrame('shield-bash', band)).toBe('Prone');
    }
  });
});

describe('the donor catalog declares what its own text imposes', () => {
  const rows = DONORS.flatMap((d) => Object.entries(d.sections ?? {})
    .flatMap(([sec, rs]) => (rs ?? []).map((r) => ({ donor: d.id, sec, r }))))
    .filter(({ r }) => /has the \w+(?: and \w+)? conditions?/.test(String(r.text ?? '')));

  it('has a sample worth asserting over', () => {
    expect(rows.length).toBeGreaterThanOrEqual(70);
  });

  it('every donor row that IMPOSES a condition declares it', () => {
    // a row whose condition sits behind "that has the …" REQUIRES it; everything
    // else in this set states it as an effect
    const imposing = rows.filter(({ r }) => !/that has the \w+ condition/.test(String(r.text)));
    const undeclared = imposing.filter(({ r }) => !r.imposes).map(({ donor, sec, r }) => `${donor} ${sec}/${r.name}`);
    expect(undeclared).toEqual([]);
  });

  it('and no row that merely REQUIRES one claims to impose it', () => {
    const requiring = rows.filter(({ r }) => /that has the \w+ condition/.test(String(r.text)));
    expect(requiring.length).toBe(4);                       // the four chargers' Tramples
    for (const { r } of requiring) expect(r.imposes).toBeUndefined();
  });
});

describe('end to end: the record reaches the sheet', () => {
  // the donor decides how many rows need a name; an unrenamed entry fails loudly
  const scaled = scaleDonor(pickDonor(8, 'mounted', 'skirmisher'), 8, { mechanics: [] }); // style is pickDonor's 2nd arg
  const renames = {}; renameKeysOf(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
  renames['Melee Attack'] = 'Lance';
  const answer = (over = {}) => JSON.stringify({
    name: 'Lance Courser', type: 'Fey', size: 'Medium', alignment: 'Neutral',
    senses: 'darkvision 60 ft.', languages: 'Sylvan',
    renames,
    damage_types: Object.fromEntries(Object.values(renames).map((n) => [n, 'Piercing'])),
    conditions: { condition_minor: 'Prone' }, melee_rider: 'none',
    ...over,
  });

  it('a mounted charge rider keeps its Prone record through the whole pipeline', async () => {
    const orig = console.log; console.log = () => {};
    let m;
    try { m = await generateReskin({ archetype: 'skirmisher', concept: 'a lance courser', userConcept: 'a lance courser', cr: 8, style: 'mounted' }, async () => answer()); } finally { console.log = orig; }
    const rows2 = Object.values(m.sections).flat();
    const charge = rows2.find((e) => /has the Prone condition/.test(String(e.text ?? '')) && /Attack Roll/.test(String(e.text ?? '')));
    expect(charge).toBeDefined();                            // the rider survived
    expect(charge.imposes).toBe('Prone');                    // and so did its record
  });
});

/**
 * Roadmap item 1b — the area geometry is declared, not read back off the sentence.
 *
 * Measured before building: 0 of 11 area rows on sweep-2026-10-30T02-34-52 carried
 * an `area` field. Two causes, both the `gate` disease:
 *   - the render resolved a shape only for templates carrying `targets` — TWO of
 *     them — while THIRTEEN state their geometry inside the frame text itself, so
 *     the field could never have covered more than 2 of the 11;
 *   - `DECLARED_BY_WRITER` (the carrier) did not list `area`, so even those two
 *     were dropped between the render and the row.
 * And where it did fire it was WRONG: `AREA_SHAPES` is `Object.keys(AREA_LADDER)`
 * — Cone and Line — so a 30-foot Emanation declared `area: false`. Carrying that
 * without fixing it would have made `areaDamage` answer "not an area" for every
 * Emanation row.
 */
describe('1b — the area geometry is declared', () => {
  const { TEMPLATE_BY_ID, renderTemplate, areaOfFrame } = require('@/tools/statblock-generator/reskin/templates.mjs');
  const { areaDamage } = require('@/tools/statblock-generator/reskin/author.mjs');

  it('reads our own catalog once: 13 templates state a geometry in their frames', () => {
    const withGeom = [...TEMPLATE_BY_ID.values()].filter((t) => t.frame_area && Object.keys(t.frame_area).length);
    expect(withGeom.length).toBeGreaterThanOrEqual(13);
  });

  it('and derives shape and size from a frame, not a guess', () => {
    expect(areaOfFrame('each creature in a 30-foot Emanation originating from it')).toEqual({ shape: 'Emanation', size: 30 });
    expect(areaOfFrame('a 10-foot-radius Sphere centered on that point')).toEqual({ shape: 'Sphere', size: 10 });
    expect(areaOfFrame('one creature within 30 feet')).toBeNull();
  });

  it.each([['energy-aura', 7, 'Emanation'], ['wail', 5, 'Emanation'], ['fear-aura', 9, 'Emanation'], ['thrown-burst', 11, 'Sphere'], ['ground-burst', 7, 'Emanation']])
  ('%s declares its geometry on the render', (id, cr, shape) => {
    const scaled = scaleDonor(pickDonor(cr, null, 'brute'), cr, { mechanics: [] });
    const r = renderTemplate(TEMPLATE_BY_ID.get(id), { cr, size: 'Large', concept: 'a thing', meleeName: 'Slam', scaled }, {});
    expect(r.area).toEqual({ shape, size: expect.any(Number) });
    expect(r.area.size).toBeGreaterThan(0);
  });

  // `areaDamage` asks "area AND damage". An Emanation that deals none is an area
  // and not area damage — print's modal fear row deals no damage at all (7 of its
  // 11). My first cut of this asserted areaDamage on every shape above and
  // fear-aura correctly refused it.
  it.each([['energy-aura', 7], ['thrown-burst', 11], ['ground-burst', 7]])
  ('%s is read as area DAMAGE off the declared geometry, which the old boolean denied for an Emanation', (id, cr) => {
    const scaled = scaleDonor(pickDonor(cr, null, 'brute'), cr, { mechanics: [] });
    const r = renderTemplate(TEMPLATE_BY_ID.get(id), { cr, size: 'Large', concept: 'a thing', meleeName: 'Slam', scaled }, {});
    expect(/\d+ \(\d+d\d+/.test(r.text)).toBe(true);   // it does deal damage
    expect(areaDamage(r)).toBe(true);
  });

  it('a damageless aura declares its area and is not area damage', () => {
    const scaled = scaleDonor(pickDonor(9, null, 'brute'), 9, { mechanics: [] });
    const r = renderTemplate(TEMPLATE_BY_ID.get('fear-aura'), { cr: 9, size: 'Large', concept: 'a thing', meleeName: 'Slam', scaled }, {});
    expect(r.area.shape).toBe('Emanation');
    expect(areaDamage(r)).toBe(false);
  });
});

/**
 * Roadmap item 1e — the rider hold gate reads the record, not the sentence.
 *
 * It asked two questions of the rendered text that the writer already answers:
 * "does this rider impose a hold" (`row.imposes`, complete as of 1a) and "does
 * its frame carry a save" (now `frame_save`, derived once from our own frames the
 * way `frame_area` is).
 *
 * THIS SUITE EXISTS BECAUSE THE FULL SUITE PASSED WITH A GUARANTEED CRASH ON THAT
 * LINE. The first cut referenced `bandFor`, which generate.mjs does not import —
 * a `ReferenceError` on every templated rider weld — and 165 suites / 4,495 tests
 * went green, because no unit test drove a rider through the weld. Same shape as
 * the swallowed throw recorded in plans/ ("the ceiling gate reported 0 firings
 * while throwing on every row"). The test below drives the weld.
 */
describe('1e — the hold gate, and the weld path actually runs', () => {
  const { TEMPLATE_BY_ID, bandFor } = require('@/tools/statblock-generator/reskin/templates.mjs');

  it('bandFor is reachable from generate.mjs\'s import surface', () => {
    expect(typeof bandFor).toBe('function');
    expect(bandFor(8)).toBe('6-9');
  });

  it.each([['contagion', true], ['affliction', true], ['snatch', false], ['bolt-restrain', false], ['adhesive', false]])
  ('%s declares whether its frame carries a save', (id, want) => {
    expect(TEMPLATE_BY_ID.get(id).frame_save['6-9']).toBe(want);
  });

  it('every template declares frame_save for every frame it has', () => {
    for (const t of TEMPLATE_BY_ID.values()) {
      if (!t.frames) continue;
      for (const b of Object.keys(t.frames)) expect(typeof t.frame_save?.[b]).toBe('boolean');
    }
  });

  // the weld itself: a rider template, welded onto a melee row, through the real
  // pipeline. If anything on the hold-gate line throws, this fails.
  it('drives a rider weld end to end without throwing', async () => {
    const scaled = scaleDonor(pickDonor(8, null, 'brute'), 8, { mechanics: [] });
    const renames = {}; renameKeysOf(scaled).forEach((k, i) => { renames[k] = `Named Row${i}`; });
    const body = JSON.stringify({
      name: 'Blight Hulk', type: 'Monstrosity', size: 'Large', alignment: 'Neutral Evil',
      senses: 'darkvision 60 ft.', languages: 'none', renames,
      damage_types: Object.fromEntries(Object.values(renames).map((n) => [n, 'Slashing'])),
      conditions: { condition_minor: 'Prone' }, melee_rider: 'none',
    });
    const orig = console.log; const lines = []; console.log = (...a) => { lines.push(a.join(' ')); };
    let m;
    try {
      m = await generateReskin({ archetype: 'brute', concept: 'a blight hulk whose bite spreads a wasting rot', userConcept: 'a blight hulk whose bite spreads a wasting rot', cr: 8 }, async (prompt) => {
        if (prompt.startsWith('You are inventing the SIGNATURE ability')) {
          return JSON.stringify({ action: { idea: 'When it bites, the wound festers and will not close.', section: 'action', trigger: 'on_hit', effect: 'condition', family: 'payoff' }, trait: { idea: 'Its hide is bark-hard.', trigger: 'always', effect: 'defense' } });
        }
        // the FIT call must return a pick, or the seat misses and the weld is never
        // reached — which is exactly how the first cut of this test passed with a
        // guaranteed ReferenceError on the hold-gate line
        if (prompt.startsWith("A monster's signature ability")) {
          // a REAL GM quote, or the rider is declined as decoration and the weld is
          // never entered — the second way this test can pass without testing
          return JSON.stringify({ template: 'contagion', because: 'the wound festers:concept', asked: 'spreads a wasting rot', name: 'Wasting Bite', fills: {} });
        }
        if (prompt.startsWith('You are auditing')) return JSON.stringify({ findings: [] });
        if (prompt.startsWith('You are repairing') || prompt.startsWith('You are completing')) return JSON.stringify({});
        return body;
      });
    } finally { console.log = orig; }
    expect(m).toBeTruthy();
    // the weld was REACHED — without this assertion the test passes while the
    // seat misses and the hold-gate line never runs
    expect(lines.join('\n')).toMatch(/signature rider:|rider refused|rider gated/);
    expect(lines.join('\n')).not.toMatch(/bandFor is not defined|ReferenceError|is not defined/);
  });
});
