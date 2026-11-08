import { pickDonor, scaleDonor } from '../scale.mjs';
import { withinBudget } from '../card-budgets.mjs';

describe('stage 3: scaling to the card', () => {
  test('every pilot CR lands in the summed band', () => {
    for (const cr of [0.5, 1, 2, 5, 8, 12, 16, 20]) {
      const donor = pickDonor(cr, null, 'skirmisher');
      const s = scaleDonor(donor, cr);
      const rows = Object.entries(s.sections).flatMap(([sec, es]) => es.map((e) => ({ sec, e })));
      const avgOf = (t) => [...t.matchAll(/(\d+) \(\d+d\d+(?:\s*\+\s*\d+)?\)/g)].reduce((n, m) => n + Number(m[1]), 0);
      const attacks = Number(/makes (\w+)/.exec(rows.find((r) => r.e.name === 'Multiattack').e.text)[1].replace('two', 2).replace('three', 3));
      let sustained = attacks * avgOf(rows.find((r) => r.e.name === 'Melee Attack').e.text);
      // A COST-1 LEGENDARY STRIKE FIRES THREE TIMES A ROUND — the DMG's reading,
      // the checker's `sustainedOf`, and scale.mjs's own seed. This line counted
      // it once, which is the arithmetic the solver's loop also used; the CR 15
      // storm dragon shipped a 32-point bite against print's 17-21 (bodies,
      // 2026-10-15). Both now count three.
      for (const r of rows.filter((x) => x.sec === 'Legendary Actions' && /makes one/.test(x.e.text))) sustained += 3 * avgOf(rows.find((x) => x.e.name === (/Melee/.test(r.e.text) ? 'Melee Attack' : 'Ranged Attack')).e.text);
      const novas = rows.filter((r) => r.e.gate).map((r) => ({ avg: avgOf(r.e.text), gate: r.e.gate }));
      const { ok, actual, target } = withinBudget(cr, sustained, novas, { legendary: !!s.legendary });
      expect(`CR ${cr} (donor ${donor.id}): ${actual} vs ${target} ${ok ? 'in band' : 'OUT'}`)
        .toBe(`CR ${cr} (donor ${donor.id}): ${actual} vs ${target} in band`);
      expect(s.ac).toBeGreaterThan(12);
      expect(rows.every((r) => !/DC (?!\d)/.test(r.e.text))).toBe(true);
    }
  });
});

describe('the flight tax (corpus sweep 2026-08-19: flyers 0.98 vs grounded 1.08)', () => {
  const { pickDonor: pdw, scaleDonor: sdw } = require('../scale.mjs');
  const { cardBudget: cbw } = require('../card-budgets.mjs');

  test('winged donors ship ~90% of card HP below the legendary tier; grounded lines ship full card; at 17+ the tax stops (print fliers are not lighter there — checker 2026-10-02)', () => {
    for (const cr of [3, 8, 13, 18]) {
      const winged = sdw(pdw(cr, 'winged', 'skirmisher'), cr);
      const plain = sdw(pdw(cr, null, 'skirmisher'), cr);
      const card = cbw(cr, { legendary: !!pdw(cr, 'winged', 'skirmisher').legendary });
      expect(winged.hp).toBe(cr >= 17 ? card.hp : Math.round(card.hp * 0.9));
      expect(plain.hp).toBe(cbw(cr, { legendary: !!pdw(cr, null, 'skirmisher').legendary }).hp);
    }
  });

  test('a winged donor keeps its Fly speed through scaling — the wildcard fly-guard opens', () => {
    expect(sdw(pdw(8, 'winged', 'skirmisher'), 8).speed).toMatch(/Fly \d+ ft\./);
  });
});

// THE ATTACK FLOOR ON THE CHASSIS (Five Pipelines step 7, 2026-10-20). A donor
// below CR 5 scaled UP kept its low-CR shape: the CR 2 dragon-2 chassis at CR 7
// shipped one Claw and no Multiattack (the Squallwing Drake, the critic's read of
// the forty). Print: a Multiattack on 110 of its 113 blocks at CR 5+, and 80 of
// the 90 donors already carry one — this brings the other ten to their scaled CR.
describe('the chassis gains print\'s Multiattack when it is scaled to CR 5+', () => {
  const { DONORS } = require('../donors.mjs');
  const bare = DONORS.filter((d) => !(d.sections?.Actions ?? []).some((e) => /^Multiattack/.test(e.name ?? '')));
  const maOf = (d, cr, opts = {}) => (scaleDonor(d, cr, { mechanics: [], ...opts }).sections?.Actions ?? []).find((e) => /^Multiattack/.test(e.name ?? '')) ?? null;

  test('every donor with none gains one at CR 7 — swarms included, above their band', () => {
    expect(bare.length).toBeGreaterThan(0);
    for (const d of bare) {
      // CR 7 is past the band print's swarms occupy (all seven are CR 0.25-3), so the
      // swarm exemption no longer applies here — see the CR-bound test below
      expect(maOf(d, 7)?.text).toMatch(/^The creature makes two /);
    }
  });

  test('and a swarm asked for one attack still gets none, at any CR', () => {
    // the identity flag is the caller's to set; when it is set the strip is absolute
    for (const d of DONORS.filter((x) => (x.archetypes ?? []).includes('swarm'))) {
      for (const cr of [1, 3, 7, 13]) expect(maOf(d, cr, { stripMultiattack: true })).toBeNull();
    }
  });

  test('below CR 5 the single attack is the shape and nothing is added', () => {
    for (const d of bare) expect(maOf(d, 4)).toBeNull();
  });

  test("print's modal count: two at CR 5-10, three at CR 11+", () => {
    const d = bare.find((x) => x.id === 'dragon-2');
    expect(maOf(d, 5).text).toMatch(/makes two /);
    expect(maOf(d, 10).text).toMatch(/makes two /);
    expect(maOf(d, 11).text).toMatch(/makes three /);
    expect(maOf(d, 20).text).toMatch(/makes three /);
  });

  test("one attack row is cited N times, which is print's own idiom (the Adult Red Dragon's three Rends)", () => {
    const d = bare.find((x) => x.id === 'dragon-2');
    // dragon-2 carries exactly one attack row, so the citation names it directly
    expect(maOf(d, 7).text).toBe('The creature makes two Melee Attack attacks.');
  });

  // THE SWARM RULE IS CR-BOUND (owner's ruling, 2026-11-08). All seven of print's swarms
  // are CR 0.25-3 and each makes one attack; print has no swarm above CR 3 and no ooze
  // above CR 4, so above there the corpus has no opinion. Holding the rule past its
  // evidence made a high-CR swarm unpriceable — one attack cannot reach a CR 13 card of
  // 100 without breaching the single-target ceiling of 51 — so it shipped `under` every
  // time. `stripMultiattack` now carries the identity half of the old `oneAttack` flag,
  // and the clamp keeps the safety half at every CR.
  test('a swarm keeps one attack through CR 3 and may carry a Multiattack above it', () => {
    for (const d of DONORS.filter((x) => (x.archetypes ?? []).includes('swarm'))) {
      // through the band print measured, the strip holds and nothing is acquired
      expect(maOf(d, 3, { oneAttack: true, stripMultiattack: true })).toBeNull();
      // above it the identity flag is off, so an inherited Multiattack survives and a
      // swarm chassis with none gains one at the CR floor like any other body
      const above = maOf(d, 13, { oneAttack: true, stripMultiattack: false });
      expect(above).not.toBeNull();
      expect(above.text).toMatch(/makes (two|three) /);
    }
  });

  test('a donor that already has one keeps its own text, unchanged', () => {
    const d = DONORS.find((x) => x.id === 'brute-5');
    expect(maOf(d, 7).text).toBe(d.sections.Actions.find((e) => /^Multiattack/.test(e.name)).text);
  });
});
