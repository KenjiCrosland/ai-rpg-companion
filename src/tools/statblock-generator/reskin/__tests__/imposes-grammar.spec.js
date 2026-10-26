/**
 * ONE DEFINITION, EVERY READER — the grammar for "what condition does this row
 * impose".
 *
 * The duplicate-mechanic gate and the engine's stripping pass each grew a
 * private copy of this grammar. When print's own Trample ("one creature within
 * 5 feet THAT HAS the Prone condition" — a targeting restriction) was read as
 * an imposition, the gate failed a sheet that imposes Prone only twice, which
 * print allows; and because the strip's copy kept the narrow exclusion too, it
 * silently declined, so the failure looked like a pass that had never run.
 */
import { AFFLICTIONS, ALL_CONDITIONS, imposedCondition, imposedConditions } from '../author.mjs';
import { checkBlock } from '../checker.mjs';
import * as DONORS from '../donors.mjs';
import * as LIBRARY from '../library.mjs';

const PRINT_TRAMPLE =
  '*Dexterity Saving Throw*: DC 14, one creature within 5 feet that has the Prone condition. *Failure:* 9 (2d8) Bludgeoning damage. *Success:* Half damage.';
const IMPOSING_SLAM =
  '*Melee Attack Roll:* +6, reach 5 ft. 28 (7d6 + 4) Bludgeoning damage, and the target has the Prone condition.';

describe('a relative clause selects a target; it does not inflict a condition', () => {
  it.each([
    ["print's Trample targets the already-prone", PRINT_TRAMPLE],
    ['a "which" clause', 'Each creature which has the Restrained condition takes 5 (2d4) damage.'],
    ['a "who" clause', 'An ally who has the Frightened condition may reroll.'],
    ['an "if" preamble', 'The attack deals 7 extra damage if the target has the Prone condition.'],
    ['an "already" preamble', 'The effect ends if the target is already Grappled.'],
  ])('reads nothing imposed: %s', (_label, text) => {
    expect(imposedCondition({ text })).toBeNull();
    expect(imposedConditions({ text })).toEqual([]);
  });

  it.each([
    ['a trailing rider', IMPOSING_SLAM, 'Prone'],
    ['a standalone sentence', '*Failure:* 14 (4d6) damage. The target has the Poisoned condition.', 'Poisoned'],
    ["2014's idiom", 'the target is knocked prone.', 'Prone'],
    ["2014's bare verb", 'the target is poisoned until the end of its next turn.', 'Poisoned'],
  ])('reads the imposition: %s', (_label, text, cond) => {
    expect(imposedCondition({ text })).toBe(cond);
    expect(imposedConditions({ text })).toContain(cond);
  });

  it('prefers the row\'s own record over the grammar', () => {
    expect(imposedCondition({ imposes: 'Stunned', text: 'no condition words at all' })).toBe('Stunned');
  });

  it('collects every condition one row imposes', () => {
    const text = 'The target has the Grappled condition and has the Restrained condition.';
    expect(imposedConditions({ text }).sort()).toEqual(['Grappled', 'Restrained']);
  });
});

describe('the duplicate-mechanic gate counts impositions, not targeting', () => {
  const block = (rows) => ({
    name: 'Test', cr: 8, cr_str: '8', ac: 16, hp: '84', hp_num: 84,
    attributes: ['18 (+4)', '10 (+0)', '16 (+3)', '6 (-2)', '10 (+0)', '6 (-2)'],
    sections: { Actions: rows },
  });
  const dupeFail = (m) =>
    (checkBlock(m, {}).gates?.structure?.findings ?? []).find(
      (x) => x.rule === 'duplicate-mechanic' && x.severity === 'fail',
    );

  it('passes two impositions beside a targeting row (print allows two)', () => {
    expect(
      dupeFail(block([
        { name: 'Slam', text: IMPOSING_SLAM },
        { name: 'Searing Backhand', text: IMPOSING_SLAM.replace('Bludgeoning', 'Fire') },
        { name: 'Trample', text: PRINT_TRAMPLE },
      ])),
    ).toBeUndefined();
  });

  it('still fails three real impositions', () => {
    expect(
      dupeFail(block([
        { name: 'Slam', text: IMPOSING_SLAM },
        { name: 'Searing Backhand', text: IMPOSING_SLAM.replace('Bludgeoning', 'Fire') },
        { name: 'Crushing Step', text: IMPOSING_SLAM.replace('28 (7d6 + 4)', '9 (2d8)') },
      ]))?.message,
    ).toMatch(/3 rows impose Prone/);
  });
});

describe('no stored row claims an imposition its text does not make', () => {
  const tagged = [];
  const walk = (o, src) => {
    if (!o || typeof o !== 'object') return;
    if (Array.isArray(o)) return o.forEach((x) => walk(x, src));
    if (typeof o.text === 'string' && o.imposes) tagged.push({ src, ...o });
    for (const v of Object.values(o)) walk(v, src);
  };
  walk(DONORS, 'donors');
  walk(LIBRARY, 'library');

  it('has tagged rows to check', () => expect(tagged.length).toBeGreaterThan(40));

  // A TAG MAY NAME SEVERAL CONDITIONS (2026-10-26). The hold line's attack
  // grapples AND restrains; Swallow blinds AND restrains. The first cut of this
  // test compared a string tag against the FIRST condition the reader found, so
  // a row that declared both read as a disagreement and a row that declared
  // half was never caught. Both sides are a set now, read by the one reader.
  const asList = (v) => (Array.isArray(v) ? v : [v]).map(String).sort().join('+');
  it('every tag agrees with the grammar that reads it — every condition, not the first', () => {
    const wrong = tagged
      .filter((r) => asList(r.imposes) !== imposedConditions({ text: r.text }).sort().join('+'))
      .map((r) => `[${r.src}] ${r.name}: tagged ${asList(r.imposes)}, text reads ${imposedConditions({ text: r.text }).sort().join('+')}`);
    expect(wrong).toEqual([]);
  });

  // A TAG OUTSIDE THE AFFLICTIONS IS LEGAL AND UNCOUNTED. Print's Legendary
  // Fade records `Invisible`, which it grants ITSELF — the row is read correctly
  // and the duplicate-mechanic gate rightly ignores it, because three self-buffs
  // are not the repetition it looks for.
  it('counts only the conditions inflicted on a target', () => {
    const list = (v) => (Array.isArray(v) ? v : [v]).map(String);
    const selfBuffs = tagged.filter((r) => !list(r.imposes).some((c) => AFFLICTIONS.includes(c)));
    for (const r of selfBuffs) expect(imposedConditions({ text: r.text }).sort()).toEqual(list(r.imposes).sort());
    expect(tagged.filter((r) => list(r.imposes).some((c) => AFFLICTIONS.includes(c))).length).toBeGreaterThan(40);
  });
});

/**
 * THE CATALOG DECLARES; NOTHING READS THE SENTENCE BACK.
 *
 * This is the drift guard. Any frame that mentions a condition must be either
 * declared in IMPOSES_BY_TEMPLATE or named in the exclusions below with a
 * reason — so adding a template that imposes something forces the decision
 * instead of silently falling through to the text grammar.
 */
describe('every condition-bearing frame has a declared answer', () => {
  const { TEMPLATES, imposedByFrame } = require('../templates.mjs');
  const list = Array.isArray(TEMPLATES) ? TEMPLATES : Object.values(TEMPLATES).flat();
  const textOf = (v) => (typeof v === 'string' ? v : Array.isArray(v) ? v.join(' ') : (v?.text ?? ''));

  // frames that mention a condition but impose nothing ON A TARGET, each with its reason
  const EXCLUDED = {
    'shell-withdraw': 'imposes Prone on ITSELF while withdrawn, not on a target',
    evasion: "names Incapacitated only to say the trait can't be used while it holds",
    'condition-payoff': 'its target filter CONSUMES a condition; the Stunned it imposes at 21+ is declared',
    affliction: 'its wound is a bespoke effect, not a rules condition',
    seal: "imposes \"can't regain Hit Points\", which is not a condition",
    phobia: 'imposes Disadvantage, which is not a condition',
    zone: 'carries its effect in the {zone_effect} slot',
    'noxious-aura': 'slot-driven: the condition comes from {condition_minor} at render',
  };

  // (template, condition) pairs whose frame NAMES a condition without imposing
  // it on a target. Each was read by hand; the reason is the point of the entry.
  const NOT_IMPOSED = {
    'execute|Frightened': 'targets "one Frightened creature" — a filter, not an imposition',
    'swallow|Restrained': 'also says a swallowed creature "is no longer Restrained" when the creature dies — a release',
    'condition-payoff|Stunned': 'declared at 21+; its other bands name {consumed_condition}, a filter',
  };

  // THE SCAN MUST BE WIDER THAN THE ONE THAT BUILT THE MAP. The first pass
  // looked only for the singular "has the X condition" and missed two real
  // impositions: swallow's compound "has the Blinded and Restrained CONDITIONS"
  // and pull-through's bare "the target emerges Prone", with no condition noun
  // at all. A guard that repeats the builder's blind spot guards nothing.
  const mentions = (s, c) =>
    new RegExp(`has the (?:\\w+(?:,| and) )*${c} conditions?|\\bis (?:also )?${c} by it\\b|\\b(?:is|are|becomes?|emerges?|knocked)\\s+(?:knocked\\s+)?${c}\\b`, 'i').test(s);

  const offenders = [];
  for (const t of list) {
    for (const [band, v] of Object.entries(t.frames ?? {})) {
      const s = textOf(v);
      if (EXCLUDED[t.id]) continue;
      for (const c of ALL_CONDITIONS) {
        if (!mentions(s, c)) continue;
        if (NOT_IMPOSED[`${t.id}|${c}`]) continue;
        const d = imposedByFrame(t.id, band);
        const has = d && (Array.isArray(d) ? d : [d]).includes(c);
        if (!has) offenders.push(`${t.id} [${band}] ${c}`);
      }
    }
  }

  it('leaves no condition-bearing frame undeclared', () => expect(offenders).toEqual([]));

  it('declares nothing for a template it also excludes', () => {
    const both = Object.keys(EXCLUDED).filter((id) =>
      Object.keys(list.find((t) => t.id === id)?.frames ?? {}).some((b) => imposedByFrame(id, b)) && id !== 'condition-payoff',
    );
    expect(both).toEqual([]);
  });

  it.each([
    ['snatch', '6-9', 'Grappled'],
    ['shield-bash', '0-2', 'Prone'],
    ['gaze-single', '13-20', 'Paralyzed'],
    ['gaze-single', '21+', 'Blinded'],
    ['leap', '21+', null],
    ['shell-withdraw', '0-2', null],
  ])('declares %s [%s] as %s', (id, band, want) => {
    const got = imposedByFrame(id, band);
    expect(Array.isArray(got) ? got[0] : got).toBe(want);
  });
});
