// WHOLE-SHEET BUDGETS SETTLE ON THE FINISHED SHEET (critic's package-six review,
// 2026-10-22). Test categories 1, 9 and 10 from that review, plus the declared
// seat-cell cap the owner's ruling asked for.
import { settleSheetBudgets, readGapOutcomes } from '../generate.mjs';
import { scaleDonor, pickDonor } from '../scale.mjs';

const scaled = () => scaleDonor(pickDonor(8, null, 'brute'), 8, { mechanics: [] });

const freeTrait = (name, template) => ({ name, text: 'A creature that touches it takes 7 (2d6) Fire damage.', freeRow: true, library: true, template });
const nova = (name, over = {}) => ({
  name: `${name} (Recharge 5-6)`,
  text: '*Dexterity Saving Throw:* DC 15, each creature in a 20-foot Emanation. *Failure:* 28 (8d6) Fire damage.',
  ...over,
});

describe('the free-row budget is counted at ship, once', () => {
  test('a single free row survives', () => {
    const sections = { Traits: [freeTrait('Smoldering Stumps', 'heated-body')] };
    const generation = {};
    settleSheetBudgets({ sections, scaled: scaled(), cr: 8, generation });
    expect(sections.Traits.map((e) => e.name)).toEqual(['Smoldering Stumps']);
    expect(generation.free_rows).toBe(1);
  });

  // THE BUG: the allowance used to be spent at GRANT, so a granted row vetoed
  // later still cost the sheet its second candidate. Bog Hound, Thunderwall
  // Drake, Drowned Choir and Trench Antiphon each lost a real trait this way.
  // A row that never reached the sheet must not spend the budget.
  test('a vetoed first candidate does not spend the budget', () => {
    const sections = { Traits: [freeTrait('Silt-Slick Hide', 'resonant-body')] }; // the first was vetoed upstream and is absent
    const generation = {};
    settleSheetBudgets({ sections, scaled: scaled(), cr: 8, generation });
    expect(sections.Traits.map((e) => e.name)).toEqual(['Silt-Slick Hide']);
    expect(generation.free_rows).toBe(1);
  });

  test('a second free row in a DIFFERENT declared cell still yields to the budget of 1', () => {
    const sections = { Traits: [freeTrait('A', 'heated-body'), freeTrait('B', 'warded-mending')] };
    const generation = {};
    settleSheetBudgets({ sections, scaled: scaled(), cr: 8, generation });
    expect(sections.Traits).toHaveLength(1);
    expect(generation.free_rows).toBe(1);
  });

  test('an EXACT print sheet keeps no free row — print closes the row set', () => {
    const sections = { Traits: [freeTrait('Decoration', 'heated-body')] };
    const generation = {};
    settleSheetBudgets({ sections, printExact: true, scaled: scaled(), cr: 8, generation });
    expect(sections.Traits).toHaveLength(0);
    expect(generation.free_rows).toBe(0);
  });

  test('the metric names the templates that shipped, so sameness is visible', () => {
    const sections = { Traits: [freeTrait('A', 'heated-body')] };
    const generation = {};
    settleSheetBudgets({ sections, scaled: scaled(), cr: 8, generation });
    expect(generation.free_row_templates).toEqual(['heated-body']);
  });

  test('a row with no freeRow mark is never touched', () => {
    const sections = { Traits: [{ name: 'Legendary Resistance (3/Day)', text: 'It succeeds instead.' }] };
    settleSheetBudgets({ sections, scaled: scaled(), cr: 8, generation: {} });
    expect(sections.Traits).toHaveLength(1);
  });
});

describe('one Recharge nova a sheet, counted whatever wrote it', () => {
  // 0 of 329 print blocks carry two Recharge Action rows; 72 carry exactly one.
  test('a FITTED nova blocks a later one (the library/template exclusion is gone)', () => {
    const sections = { Actions: [nova('Chorus Barrage', { library: true, template: 'active-toll' }), nova('Whirlwind', { library: true, template: 'spew' })] };
    settleSheetBudgets({ sections, scaled: scaled(), cr: 8, generation: {} });
    const gated = sections.Actions.filter((e) => /\(Recharge/.test(e.name));
    expect(gated).toHaveLength(1);
  });

  // The Air Elemental shipped Chorus Barrage (library, active-toll) beside
  // print's own Whirlwind, because the mid-build check ran ~1,460 lines before
  // print canon places print's rows.
  test("print's nova keeps its gate and the fitted one un-gates", () => {
    const sections = { Actions: [nova('Chorus Barrage', { library: true, template: 'active-toll' }), nova('Whirlwind', { print: true })] };
    settleSheetBudgets({ sections, scaled: scaled(), cr: 8, generation: {} });
    const byName = (n) => sections.Actions.find((e) => e.name.startsWith(n));
    expect(byName('Whirlwind').name).toMatch(/\(Recharge 5-6\)/);
    expect(byName('Chorus Barrage').name).not.toMatch(/\(Recharge/);
  });

  test('a lone nova is left alone', () => {
    const sections = { Actions: [nova('Breath', { print: true })] };
    settleSheetBudgets({ sections, scaled: scaled(), cr: 8, generation: {} });
    expect(sections.Actions[0].name).toMatch(/\(Recharge 5-6\)/);
  });

  // checker.mjs's novasOf counts a gate written in the row's TEXT too, so this
  // pass must see the same rows the gate sees — a name-only filter made a CR 13
  // swarm's 91 (14d12) emanation read as "nova none" (hold 4, 2026-10-16).
  test('a TEXT-gated nova is counted, and the name-gated one yields to it', () => {
    const textGated = {
      name: 'Dirge Burst',
      text: 'The first time the swarm is Bloodied in a fight, *Constitution Saving Throw:* DC 15, each creature in a 30-foot Emanation. *Failure:* 35 (10d6) Necrotic damage.',
      library: true, template: 'bloodied-burst',
    };
    const sections = { Actions: [nova('Chorus Barrage', { library: true, template: 'active-toll' }), textGated] };
    settleSheetBudgets({ sections, scaled: scaled(), cr: 8, generation: {} });
    // the text-gated row cannot be un-gated by renaming, so it keeps the budget
    expect(sections.Actions.find((e) => e.name === 'Dirge Burst')).toBeTruthy();
    expect(sections.Actions.find((e) => e.name.startsWith('Chorus Barrage')).name).not.toMatch(/\(Recharge/);
  });

  // PRINT OVERRULES THE RULE, and it does so exactly once: measured under the
  // gate's own predicate (which counts "1/Day", not only "Recharge"), 1 of 329
  // print blocks carries two — the Vrock's Spores (Recharge 6) beside Stunning
  // Screech (1/Day). So this pass never un-gates a print row.
  test('two PRINT novas are both left alone — print overrules the rule', () => {
    const sections = { Actions: [nova('One', { print: true }), nova('Two', { print: true })] };
    settleSheetBudgets({ sections, scaled: scaled(), cr: 8, generation: {} });
    expect(sections.Actions.filter((e) => /\(Recharge/.test(e.name))).toHaveLength(2);
  });
});

// THE GAP SHIP-CHECK COUNTS APPENDED RIDERS (critic's test category 4,
// 2026-10-22). A rider welded onto a row owns no row of its own, so the
// ship-check — which reads `e.template` off the rows — counted a SHIPPED rider
// as a veto. The Purple Worm's charge rode its Bite and Krennik's rode his
// Saber; both logged "VETOED: charge never reached the sheet".
describe('the gap ship-check counts appended riders', () => {
  const rec = (template) => ({ template, line: `a ram that drives the target back — ${template}` });

  test('a rider welded onto a host row counts as landed', () => {
    const sections = { Actions: [{ name: 'Bite', text: 'Melee Attack Roll: +9. Hit: 22 (3d10 + 6) Piercing damage. ...', riderTemplates: ['charge'] }] };
    const generation = {};
    const lines = [];
    const out = readGapOutcomes({ sections, gapRecords: [rec('charge')], generation, trace: (l, d) => lines.push(`${l} ${d}`) });
    expect(out).toEqual({ vetoed: 0, landed: 1 });
    expect(generation.gap_vetoed).toBe('0 of 1');
    expect(lines.join('\n')).toMatch(/\[landed: charge\]/);
  });

  test('a template on no row and no host is still a veto', () => {
    const sections = { Actions: [{ name: 'Bite', text: 'Melee Attack Roll: +9.' }] };
    const generation = {};
    const out = readGapOutcomes({ sections, gapRecords: [rec('charge')], generation, trace: () => {} });
    expect(out).toEqual({ vetoed: 1, landed: 0 });
    expect(generation.gap_vetoed).toBe('1 of 1');
  });

  test('a row of its own still counts as landed', () => {
    const sections = { Traits: [{ name: 'Heated Body', text: 'A creature that touches it takes damage.', template: 'heated-body' }] };
    const out = readGapOutcomes({ sections, gapRecords: [rec('heated-body')], trace: () => {} });
    expect(out.landed).toBe(1);
  });

  test('a gap record with no template reads as a dropped row, not a veto of something', () => {
    const lines = [];
    const out = readGapOutcomes({ sections: {}, gapRecords: [{ line: 'nothing was offered' }], trace: (l, d) => lines.push(`${l} ${d}`) });
    expect(out.vetoed).toBe(1);
    expect(lines.join('\n')).toMatch(/\[row dropped\]/);
  });

  test('no gap records is not an error', () => {
    expect(readGapOutcomes({ sections: {}, gapRecords: [] })).toEqual({ vetoed: 0, landed: 0 });
  });
});

// THE ACTION ECONOMY IS THE LIMIT (owner's ruling, 2026-10-22). A sheet carrying
// two Recharge novas loses the gate on the extra one, and pricing may NOT refuse:
// valueCheck's voluntary "keep it ungated" branch needs
// `hasDamage && !kill && !recurring`, so a kill-shaped template like `wail` fell
// through and was re-gated on the spot — the Air Elemental shipped Stolen Chorus
// beside print's Whirlwind (branch10-2026-10-22T01-49-29).
//
// Forced, the row keeps its MECHANICS and only its damage moves: down to the
// Multiattack sum. Using it costs the whole action, so at or below the sum of
// what attacking would have dealt, it is never the strictly better play.
describe('the extra nova is un-gated and priced to the Multiattack sum', () => {
  const sheet = () => ({
    Actions: [
      { name: 'Multiattack', text: 'The elemental makes two Slam attacks.' },
      { name: 'Slam', text: '*Melee Attack Roll:* +5, reach 10 ft. 14 (3d6 + 4) Bludgeoning damage.' },
      { name: 'Whirlwind (Recharge 4-6)', text: '*Strength Saving Throw:* DC 13, one creature in the space. *Failure:* 24 (4d10 + 2) Thunder damage.', print: true },
      // `wail` is kill-shaped, which is what the voluntary branch refuses
      { name: 'Stolen Chorus (Recharge 5-6)', text: '*Constitution Saving Throw:* DC 13, each creature in a 15-foot Emanation. *Failure:* 45 (10d8) Thunder damage, and the target has the Deafened condition until the end of its next turn.', library: true, template: 'wail', gate: 'Recharge 5-6' },
    ],
  });
  const run = () => { const s = sheet(); settleSheetBudgets({ sections: s, scaled: scaled(), cr: 5, generation: {} }); return s; };

  test('the gate is removed, and print keeps its own', () => {
    const s = run();
    const names = s.Actions.map((e) => e.name);
    expect(names).toContain('Stolen Chorus');
    expect(names).toContain('Whirlwind (Recharge 4-6)');
  });

  test('pricing may not hand the gate back', () => {
    const sc = run().Actions.find((e) => e.name.startsWith('Stolen Chorus'));
    expect(sc.name).not.toMatch(/\(Recharge/);
    expect(sc.gate).toBeFalsy();
  });

  // the interesting part of the row is the point of keeping it
  test('the save, the area and the condition all survive', () => {
    const sc = run().Actions.find((e) => e.name.startsWith('Stolen Chorus'));
    expect(sc.text).toMatch(/Saving Throw/);
    expect(sc.text).toMatch(/each creature in a 15-foot Emanation/);
    expect(sc.text).toMatch(/Deafened/);
  });

  test('the damage drops to at most the Multiattack sum', () => {
    const sc = run().Actions.find((e) => e.name.startsWith('Stolen Chorus'));
    const dmg = Number(/(\d+) \(\d+d\d+/.exec(sc.text)[1]);
    expect(dmg).toBeLessThan(45);          // it moved
    expect(dmg).toBeLessThanOrEqual(28);   // two Slams at 14
  });

  test('the row is still worth using — not scaled to nothing', () => {
    const sc = run().Actions.find((e) => e.name.startsWith('Stolen Chorus'));
    expect(Number(/(\d+) \(\d+d\d+/.exec(sc.text)[1])).toBeGreaterThan(0);
  });
});

// ONE DEFINITION OF A ROW'S GATE (2026-10-22). Seven sites used to recover a gate
// by re-reading the row's NAME. The field is authoritative now — a gate declared
// in donor data, one written inside a donor's name, and one chosen by pricing all
// land on `e.gate` — and the name survives only as a fallback: canonical for a
// PRINT row, and a missed-stamp SIGNAL for anything else.
describe('gateOf is the single definition of a row gate', () => {
  const { gateOf, gateFromName } = require('../templates.mjs');

  test('the recorded field wins', () => {
    expect(gateOf({ name: 'Area Nova', gate: 'Recharge 5-6' })).toBe('Recharge 5-6');
  });

  test("a print row's name is canonical — the engine never stamps it", () => {
    expect(gateOf({ name: 'Fire Breath (Recharge 5-6)', print: true })).toBe('Recharge 5-6');
    expect(gateOf({ name: 'Legendary Resistance (3/Day)', print: true })).toBe('3/Day');
  });

  // the fallback is deliberate: a missed stamping site must be a cosmetic miss,
  // never a dropped nova
  test('an unstamped engine row still reads its gate off the name', () => {
    expect(gateOf({ name: 'Killing Cold (Recharge 5-6)', library: true })).toBe('Recharge 5-6');
  });

  test('an ungated row reads null', () => {
    expect(gateOf({ name: 'Slam', text: 'x' })).toBeNull();
    expect(gateOf({})).toBeNull();
    expect(gateOf(null)).toBeNull();
  });

  // a range and a /Day rate are both gates; "(Recharge" alone is not
  test.each([
    ['Breath (Recharge 4-6)', 'Recharge 4-6'],
    ['Breath (Recharge 6)', 'Recharge 6'],
    ['Ward (3/Day)', '3/Day'],
    ['Ward (10/Day)', '10/Day'],
  ])('%s -> %s', (name, want) => { expect(gateOf({ name })).toBe(want); });

  test('a parenthetical that is not a gate is not read as one', () => {
    expect(gateOf({ name: 'Bite (Bonus Action)' })).toBeNull();
    expect(gateOf({ name: 'Spellcasting (Psionics)' })).toBeNull();
  });

  // gateFromName is exported so a missed stamp can be REPORTED rather than
  // silently absorbed by the fallback
  test('gateFromName distinguishes a stamped row from one relying on the fallback', () => {
    const stamped = { name: 'Area Nova', gate: 'Recharge 5-6' };
    const unstamped = { name: 'Area Nova (Recharge 5-6)', library: true };
    expect(gateFromName(stamped)).toBeNull();        // its name carries no gate
    expect(gateFromName(unstamped)).toBe('Recharge 5-6');
  });
});

// A FAILED EXPRESSION REVOKES THE CLAIM, NOT THE ROW (owner, 2026-10-22: "we need
// some way to soften the rejection"). Membership is not expression — the one-eyed
// dragon's Blindside Lash named "a blinded eye from an old lance" and shipped as
// damage-on-touch — but refusing the row outright is the 1d behaviour that killed
// six twists a forty, and the expression call errs toward null (18/21, every error
// a false negative, 0 false positives). So the row stays and loses the claim.
describe('revokeUnexpressedClaims softens the rejection', () => {
  const { revokeUnexpressedClaims } = require('../generate.mjs');
  const dragon = () => ({
    sections: { Traits: [{
      name: 'Blindside Lash', freeRow: true, expresses: 'a blinded eye from an old lance',
      text: 'A creature that touches the dragon or hits it with a melee attack while within 5 feet of it takes 10 (3d6) fire damage.',
    }] },
    generation: {},
  });

  test('a row whose quote is verbatim keeps its claim', () => {
    const m = dragon();
    m.sections.Traits[0].text = 'A creature that hits the dragon on its blind side has Disadvantage, and the dragon takes 10 (3d6) fire damage from its own lashing.';
    revokeUnexpressedClaims(m, [{ entry: 'Blindside Lash', quote: 'hits the dragon on its blind side has Disadvantage' }]);
    const e = m.sections.Traits[0];
    expect(e.decoration).toBeUndefined();
    expect(e.expressedQuote).toMatch(/blind side/);
  });

  test('THE EXHIBIT: a null quote keeps the ROW but marks it decoration', () => {
    const m = dragon();
    revokeUnexpressedClaims(m, [{ entry: 'Blindside Lash', quote: null }]);
    expect(m.sections.Traits).toHaveLength(1);           // the row is NOT removed
    expect(m.sections.Traits[0].decoration).toBe(true);
  });

  test('the name claim is identified so the rename pass can strip it', () => {
    const m = dragon();
    revokeUnexpressedClaims(m, [{ entry: 'Blindside Lash', quote: null }]);
    // "blinded" in the element vs "Blindside" in the name
    expect(m.sections.Traits[0].nameClaimRevoked).toEqual(expect.arrayContaining([expect.stringMatching(/blind/)]));
  });

  // the engine validates the quote; this is the half a call cannot be trusted with
  test('a fabricated quote is rejected like a missing one', () => {
    const m = dragon();
    revokeUnexpressedClaims(m, [{ entry: 'Blindside Lash', quote: 'the dragon cannot see on its left side' }]);
    expect(m.sections.Traits[0].decoration).toBe(true);
  });

  test('a name that advertises nothing is still decoration, with no rename needed', () => {
    const m = dragon();
    m.sections.Traits[0].name = 'Searing Body';
    revokeUnexpressedClaims(m, [{ entry: 'Searing Body', quote: null }]);
    expect(m.sections.Traits[0].decoration).toBe(true);
    expect(m.sections.Traits[0].nameClaimRevoked).toBeUndefined();
  });

  test('a row carrying no receipt is untouched', () => {
    const m = { sections: { Traits: [{ name: 'Legendary Resistance (3/Day)', text: 'It succeeds instead.' }] } };
    revokeUnexpressedClaims(m, []);
    expect(m.sections.Traits[0].decoration).toBeUndefined();
  });

  test('an audit that answers nothing at all revokes rather than silently passing', () => {
    const m = dragon();
    revokeUnexpressedClaims(m, []);          // no claim returned for the row
    expect(m.sections.Traits[0].decoration).toBe(true);
  });
});

// THE AUDIT RETURNS A RAW STRING (critic's package-seven review, 2026-10-22).
// `callLLM` hands back the model's text and `validateAuditResponse` is a BOOLEAN
// validator, not a parser — `verifyAuditFindings` parses it itself. Reading
// `.element_claims` off a string gave undefined on every sheet, so every claim was
// revoked for "no verdict" and the expression judge NEVER FUNCTIONED in the
// pipeline. All 7 revocations in sweep-2026-10-22T03-29-45 say "no verdict" and
// none says "the audit judged that nothing in the row carries it": that is 0
// ANSWERS, not 0 positives, and it was reported as a judgment.
describe('readElementClaims reads what the audit actually returns', () => {
  const { readElementClaims } = require('../../format-2024/audit.mjs');
  const payload = { findings: [], element_claims: [{ entry: 'Thorn Garden', quote: null }, { entry: 'Rimed Hide', quote: 'takes 2 (1d4) Cold damage' }] };

  test('a raw STRING — the shape callLLM actually hands back', () => {
    expect(readElementClaims(JSON.stringify(payload))).toEqual([
      { entry: 'Thorn Garden', quote: null },
      { entry: 'Rimed Hide', quote: 'takes 2 (1d4) Cold damage' },
    ]);
  });

  test('a fenced string, as models often answer', () => {
    expect(readElementClaims('```json\n' + JSON.stringify(payload) + '\n```')).toHaveLength(2);
  });

  test('an already-parsed object still works — neither caller can reintroduce it', () => {
    expect(readElementClaims(payload)).toHaveLength(2);
  });

  test('unparseable input yields no claims rather than throwing', () => {
    expect(readElementClaims('not json')).toEqual([]);
    expect(readElementClaims(undefined)).toEqual([]);
  });

  // the distinction that made the bug visible at all
  test('an explicit null quote is a VERDICT, not a missing answer', () => {
    const claims = readElementClaims(JSON.stringify({ findings: [], element_claims: [{ entry: 'X', quote: null }] }));
    expect(claims).toHaveLength(1);
    expect(claims[0]).toEqual({ entry: 'X', quote: null });
  });
});

// ---------------------------------------------------------------------------
// GM QUOTE > ELEMENT > DECORATION (the critic's item 2, 2026-10-22).
// The keep loop walked freeRows in SHEET order, so which row survived a budget
// of 1 depended on where it sat in the sections object. That cut Marrowsun's
// `Marrowsun Cinder` — the row carrying the element receipt — and kept
// `Marrow Rise`, a decoration. A receipt row is never displaced by one without.
describe('the free-row budget keeps the best receipt, not the earliest row', () => {
  const { settleSheetBudgets } = require('../generate.mjs');
  const row = (name, stamp) => ({ name, text: 'The creature does a thing.', freeRow: true, template: null, ...stamp });
  const settle = (sections) => {
    const lines = [];
    settleSheetBudgets({ sections, printExact: false, generation: {}, trace: (a, b) => lines.push(`${a} ${b}`) });
    return { names: Object.values(sections).flat().map((e) => e.name), trace: lines.join('\n') };
  };

  it('keeps the ELEMENT row over a decoration that sits earlier (the Marrowsun shape)', () => {
    const out = settle({ Traits: [row('Marrow Rise', { decoration: true }), row('Marrowsun Cinder', { expresses: 'a sun of bone' })] });
    expect(out.names).toEqual(['Marrowsun Cinder']);
  });

  it('keeps the GM-QUOTE row over an element row that sits earlier', () => {
    const out = settle({ Traits: [row('Element Row', { expresses: 'an element' }), row('Quoted Row', { gmQuote: 'the words the GM typed' })] });
    expect(out.names).toEqual(['Quoted Row']);
  });

  it('prefers a quote to a decoration regardless of order, both ways round', () => {
    expect(settle({ Traits: [row('Deco', { decoration: true }), row('Quoted', { gmQuote: 'x' })] }).names).toEqual(['Quoted']);
    expect(settle({ Traits: [row('Quoted', { gmQuote: 'x' }), row('Deco', { decoration: true })] }).names).toEqual(['Quoted']);
  });

  it('leaves a single free row alone whatever its receipt', () => {
    expect(settle({ Traits: [row('Only', { decoration: true })] }).names).toEqual(['Only']);
    expect(settle({ Traits: [row('Only', {})] }).names).toEqual(['Only']);
  });

  it('traces the order it chose, so a cut row can be accounted for', () => {
    const out = settle({ Traits: [row('Deco', { decoration: true }), row('Elem', { expresses: 'e' })] });
    expect(out.trace).toMatch(/free-row order: "Elem" \[element\] > "Deco" \[decoration\]/);
    expect(out.trace).toMatch(/free row over budget: Traits\/"Deco"/);
  });

  it('breaks ties within a rank by sheet order, so the sort is stable', () => {
    const out = settle({ Traits: [row('FirstDeco', { decoration: true }), row('SecondDeco', { decoration: true })] });
    expect(out.names).toEqual(['FirstDeco']);
  });
});

// A REFUSAL WITH NO `missing` IS STILL A BUILD SIGNAL (2026-10-22). The schema
// asks for `missing`, the prose demands it, readFit parses it correctly — and the
// call omits it on about a third of refusals while still naming `closest`. Those
// were thrown away as UNNAMED, so 12 of 33 gap lines on the forty carried nothing.
// They are now recorded as a VARIANT demand, and kept OUT of the vetoed tally,
// which counts accepted picks only.
describe('gap records: an unnamed mechanic is kept, and does not corrupt the tally', () => {
  const { readGapOutcomes } = require('../generate.mjs');
  const run = (gapRecords) => {
    const lines = [];
    const generation = {};
    const out = readGapOutcomes({
      sections: { Actions: [{ name: 'X', template: 'zone' }] },
      gapRecords, generation, trace: (a, b) => lines.push(`${a} ${b}`),
    });
    return { out, generation, trace: lines.join('\n') };
  };

  it('emits a gap line for a refusal that named no mechanic', () => {
    const r = run([{ line: '(missing unstated) — A VARIANT OF bloodied-fury', template: null, missing_unstated: true }]);
    expect(r.trace).toMatch(/\[gap\] \(missing unstated\) — A VARIANT OF bloodied-fury/);
  });

  it('keeps those records OUT of the accepted-pick tally', () => {
    const r = run([
      { line: 'a real gap', template: 'zone' },                                     // landed
      { line: 'another', template: 'pounce' },                                       // vetoed
      { line: '(missing unstated)', template: null, missing_unstated: true },        // neither
    ]);
    expect(r.out.vetoed).toBe(1);
    expect(r.generation.gap_vetoed).toBe('1 of 2');          // not "1 of 3"
    expect(r.generation.gap_missing_unstated).toBe(1);
    expect(r.trace).toMatch(/1 of 2 accepted signature pick\(s\) never reached the sheet/);
  });

  it('counts them separately so the share stays visible', () => {
    const r = run([
      { line: 'u1', template: null, missing_unstated: true },
      { line: 'u2', template: null, missing_unstated: true },
    ]);
    expect(r.generation.gap_missing_unstated).toBe(2);
    expect(r.generation.gap_vetoed).toBe('0 of 0');
  });
});

// A REPLACEMENT CLAUSE WITHOUT ITS OBJECT IS NONSENSE (2026-10-23). Read live on
// param10: "Multiattack. The gaze lizard makes two Bite attacks. It can replace
// one attack with." The engine wrote "a use of Petrifying Gaze", that row lost its
// name to a rename, and the dead-name sweep removed only the NAME — leaving a
// sentence that stops. Found by READING the block, not by any gate.
describe('a multiattack never ends mid-sentence', () => {
  const strip = (t) => String(t ?? '')
    .replace(/\s*(?:It|The \w+) can replace (?:one|two|three) attacks? with(?:\s+a use of)?\s*\./gi, '')
    .replace(/\s{2,}/g, ' ').trim();

  it('drops a replacement clause that lost its object', () => {
    expect(strip('The gaze lizard makes two Bite attacks. It can replace one attack with.'))
      .toBe('The gaze lizard makes two Bite attacks.');
    expect(strip('The hydra makes two Bite attacks. It can replace one attack with a use of.'))
      .toBe('The hydra makes two Bite attacks.');
  });

  it('leaves an INTACT replacement clause alone', () => {
    const ok = 'The hydra makes two Bite attacks. It can replace one attack with a use of Choking Fumes.';
    expect(strip(ok)).toBe(ok);
  });

  it('leaves a plain multiattack alone', () => {
    const ok = 'The owlbear makes two Rend attacks.';
    expect(strip(ok)).toBe(ok);
  });
});
