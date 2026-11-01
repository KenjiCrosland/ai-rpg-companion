/**
 * A ONE-ATTACK BODY MAY NOT CARRY A WHOLE ROUND IN ONE HIT.
 *
 * Owner's ruling, 2026-11-01 (roadmap item 3b). The swarm strip drops the donor's
 * Multiattack because print's seven swarms each make one attack — correct for the
 * ROUND and ruinous for the HIT: `oneAttack` makes the solver put the entire round
 * into the one row, which at CR 13 is 90 against print's hardest single-target row
 * of 51 (1.76x). That one-shots a player character.
 *
 * Print has NO swarm above CR 3, so there is no printed peer to copy; what print
 * does state is the per-band ceiling, and that holds whatever the body.
 *
 * WHAT THE RULING ASKED FOR AND WHY HALF OF IT IS NOT HERE: it also said to move
 * the surplus into the sheet's area row. Measured on sweep-2026-10-30T02-34-52 #29
 * through the real checker, four variants:
 *   bite 90, area 67 (shipped)  -> FAIL single-target-ceiling, soft hot-offense
 *   bite 50, area 67 (clamp)    -> no FAIL, soft aim-dpr + band
 *   bite 50, area 108 (+surplus)-> FAIL nova-cap
 *   bite 50, area 67 ungated    -> FAIL under
 * The area row is a Recharge nova and print caps nova damage per use, so the
 * surplus has nowhere legal to go. The clamp ships alone and the round lands under
 * budget; that trade was reported to the owner.
 */
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';
import { SINGLE_TARGET_CEILING, singleTargetCeiling, ceilingBandOf } from '@/tools/statblock-generator/reskin/card-budgets.mjs';

const hitOf = (scaled) => {
  const row = Object.values(scaled.sections).flat().find((e) => /Attack Roll/.test(String(e.text ?? '')));
  // the Bloodied split is ONE attack at two rates, never their sum — the gate
  // strips it the same way (donors.spec has stripped it since 2026-09-11)
  const stripped = String(row?.text ?? '').replace(/, or \d+ \(\d+d\d+(?:\s*\+\s*\d+)?\)(?: \{damage_type\} damage)?(?: plus \d+ \(\d+d\d+\) \{damage_type_2\} damage)? if [^.]{0,40}Bloodied/, '');
  return [...stripped.matchAll(/(\d+) \(\d+d\d+/g)].map((m) => Number(m[1])).reduce((a, b) => a + b, 0);
};
const swarm = (cr) => scaleDonor(pickDonor(cr, null, 'swarm'), cr, { mechanics: [], oneAttack: true });

describe('the ceiling is one closed fact', () => {
  it('lives in card-budgets and never falls as CR rises', () => {
    const bands = Object.keys(SINGLE_TARGET_CEILING);
    let prev = 0;
    for (const b of bands) { expect(SINGLE_TARGET_CEILING[b]).toBeGreaterThanOrEqual(prev); prev = SINGLE_TARGET_CEILING[b]; }
  });

  it('resolves a band for every CR the engine ships', () => {
    for (const cr of [0, 0.5, 1, 4, 9, 13, 16, 20, 24, 30]) {
      expect(typeof singleTargetCeiling(cr)).toBe('number');
      expect(SINGLE_TARGET_CEILING[ceilingBandOf(cr)]).toBe(singleTargetCeiling(cr));
    }
  });
});

describe('the swarm hit is held under it', () => {
  it('records the clamp as a field, so generate.mjs can trace it', () => {
    const s = swarm(13);
    expect(s.hit_clamped).toEqual({ from: expect.any(Number), to: 51, cr: 13 });
    expect(s.hit_clamped.from).toBeGreaterThan(51);      // it really was over
    expect(s.per_hit).toBe(51);
  });

  it('does not clamp at or below print\'s own swarm ceiling of CR 3', () => {
    for (const cr of [1, 3]) expect(swarm(cr).hit_clamped).toBeUndefined();
  });

  it('never leaves a hit at a FAIL margin (1.25x or more) in any band', () => {
    for (const cr of [5, 9, 13, 17, 20, 24]) {
      const cap = singleTargetCeiling(cr);
      expect(hitOf(swarm(cr)) / cap).toBeLessThan(1.25);
    }
  });

  it('brings the two bands that FAILED down to a soft margin', () => {
    // measured before the clamp: CR 9 at 1.83x, CR 13 at 1.76x
    for (const cr of [9, 13]) {
      const ratio = hitOf(swarm(cr)) / singleTargetCeiling(cr);
      expect(ratio).toBeGreaterThan(1);        // the dice snap lands a few points over
      expect(ratio).toBeLessThan(1.10);        // and the gate grades that soft, not fail
    }
  });

  it('still makes exactly one attack, with no Multiattack', () => {
    const rows = Object.values(swarm(13).sections).flat();
    expect(rows.filter((e) => /Attack Roll/.test(String(e.text ?? '')))).toHaveLength(1);
    expect(rows.find((e) => /^Multiattack/.test(String(e.name ?? '')))).toBeUndefined();
  });

  it('keeps print\'s Bloodied split at half the main clause', () => {
    const row = Object.values(swarm(13).sections).flat().find((e) => /Attack Roll/.test(String(e.text ?? '')));
    const main = Number(/(\d+) \(/.exec(String(row.text))[1]);
    const blood = Number(/, or (\d+) \(/.exec(String(row.text))[1]);
    expect(blood).toBeGreaterThan(0);
    expect(blood / main).toBeGreaterThan(0.4);
    expect(blood / main).toBeLessThan(0.6);
  });
});

/**
 * Roadmap item 3a — print's Swallow is control, not a damage row.
 *
 * The frames spent the row's whole budget TWICE, `{avg}` on the hit plus
 * `{avg_half}` ongoing, which read 42 + 22 = 64 to one target at CR 15 — against
 * print's hardest single-target row of 51 and against print's OWN Purple Worm
 * Swallow of 17.
 *
 * All five printed Swallow rows, measured: four deal NO damage on the hit (only
 * the Kraken's 23 at CR 23), and the ongoing acid is a flat constant — Behir 21 at
 * CR 11, Purple Worm 17 at CR 15, Kraken 24 at CR 23, Tarrasque 56 at CR 30,
 * Giant Toad none at CR 1. The row's value is the engulf.
 */
describe('3a — the swallow follows print, not the budget', () => {
  const { SHAPES } = require('@/tools/statblock-generator/reskin/shapes.mjs');
  const { TEMPLATE_BY_ID, renderTemplate, valueCheck } = require('@/tools/statblock-generator/reskin/templates.mjs');
  const printBlocks = require('@/data/srd52-monsters.json');
  const sw = SHAPES.find((s) => s.id === 'swallow');

  it('print really does keep the hit clause empty on four of its five', () => {
    const rows = printBlocks.flatMap((b) => Object.values(b.sections ?? {}).flat()
      .filter((r) => /Swallow/.test(String(r?.name ?? ''))).map((r) => String(r.text)));
    expect(rows.length).toBe(7);                                   // incl. Giant Frog/Toad
    const withHit = rows.filter((t) => /\*Failure:\*\s*\d+ \(/.test(t));
    expect(withHit).toHaveLength(1);                               // the Kraken alone
  });

  it('no frame spends the row budget any more', () => {
    for (const [, t] of Object.entries(sw.frames)) {
      expect(t).not.toMatch(/\{avg\}/);
      expect(t).not.toMatch(/\{avg_half\}/);
    }
  });

  it('the tick never falls as CR rises, and stays inside print\'s range', () => {
    let prev = -1;
    for (const b of ['0-2', '3-5', '6-9', '10-12', '13-20', '21+']) {
      const v = sw.swallow_tick[b];
      expect(v).toBeGreaterThanOrEqual(prev); prev = v;
      expect(v).toBeLessThanOrEqual(56);                           // the Tarrasque, print's highest
    }
  });

  it.each([[9, 14], [15, 21], [23, 28]])('CR %d renders a single %d-point tick, under the ceiling', (cr, tick) => {
    const scaled = scaleDonor(pickDonor(cr, null, 'brute'), cr, { mechanics: [] });
    const r = renderTemplate(TEMPLATE_BY_ID.get('swallow'), { cr, size: 'Huge', concept: 'a worm that swallows', meleeName: 'Bite', scaled }, {});
    const nums = [...String(r.text).matchAll(/(\d+) \(\d+d\d+/g)].map((m) => Number(m[1]));
    expect(nums).toEqual([tick]);
    expect(nums.reduce((a, b) => a + b, 0)).toBeLessThanOrEqual(singleTargetCeiling(cr));
  });

  it('and still earns its slot — the engulf carries the value, as print intends', () => {
    for (const cr of [9, 15, 23]) {
      const scaled = scaleDonor(pickDonor(cr, null, 'brute'), cr, { mechanics: [] });
      const r = renderTemplate(TEMPLATE_BY_ID.get('swallow'), { cr, size: 'Huge', concept: 'a worm that swallows', meleeName: 'Bite', scaled }, {});
      const vc = valueCheck({ name: 'Swallow', text: r.text, imposes: r.imposes, template: 'swallow' }, { scaled, sections: scaled.sections, section: 'Actions', cr });
      expect(vc.ev).toBeGreaterThan(vc.floor);          // a zero-damage row must not be floored out
    }
    const r9 = renderTemplate(TEMPLATE_BY_ID.get('swallow'), { cr: 9, size: 'Huge', concept: 'x', meleeName: 'Bite', scaled: scaleDonor(pickDonor(9, null, 'brute'), 9, { mechanics: [] }) }, {});
    expect(r9.imposes).toEqual(expect.arrayContaining(['Blinded', 'Restrained']));
  });
});
