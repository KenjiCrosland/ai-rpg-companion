// THE DEFENSIVE READ'S REFERENCE IS PRINT'S OWN HP-BY-CR (owner's read on the review page,
// 2026-11-09: "these blocks are way too cold, mostly on the defensive CR").
//
// The 2014 DMG's HP column was reverse-engineered from the 2014 Monster Manual and no monster in
// the 2024 SRD is built to it: print sits at 71% of the column's band minimum and reads below it on
// 94% of blocks. The read therefore branded print's own Owlbear cold, and every sheet beside it.
// `PRINT_HP_BY_CR` in checker.mjs is a closed fact about print — the same category as the print
// attack list and print's own rates (CLAUDE.md) — so it must not be able to drift from the corpus
// it claims to describe. These tests re-derive it.
import PRINT from '@/data/srd52-monsters.json';
import TABLE from '@/data/challengeRatings.json';
import { checkBlock, PRINT_HP_BY_CR, PRINT_HP_TRAIT_HEADROOM } from '../checker.mjs';

const crOf = (m) => {
  const v = m.cr ?? String(m.challenge_rating ?? '').replace(/\s*\(.*$/, '');
  const f = /^(\d+)\/(\d+)$/.exec(String(v));
  return f ? Number(f[1]) / Number(f[2]) : Number(v);
};
const med = (a) => { const s = a.filter(Number.isFinite).sort((x, y) => x - y); return s.length ? (s.length % 2 ? s[(s.length - 1) / 2] : Math.round((s[s.length / 2 - 1] + s[s.length / 2]) / 2)) : NaN; };
const pct = (a, f) => Math.round(100 * a.filter(f).length / a.length);
const KEY = { 0.125: '1/8', 0.25: '1/4', 0.5: '1/2' };
const key = (k) => (k.includes('/') ? Number(k.split('/')[0]) / Number(k.split('/')[1]) : Number(k));

describe('the curve is print, re-derived', () => {
  const byCr = {};
  for (const m of PRINT) { const c = crOf(m); if (!Number.isFinite(c)) continue; (byCr[c] = byCr[c] ?? []).push(Number(m.hp)); }

  test('every CR with a healthy print sample matches print\'s median exactly', () => {
    const off = [];
    for (const [cr, hps] of Object.entries(byCr)) {
      if (hps.length < 4) continue;                       // thin tiers are smoothed; asserted below
      const key = KEY[cr] ?? String(cr);
      if (PRINT_HP_BY_CR[key] == null) continue;          // the curve carries only CRs the DMG table keys
      if (PRINT_HP_BY_CR[key] !== med(hps)) off.push(`CR ${key}: curve ${PRINT_HP_BY_CR[key]} vs print median ${med(hps)} (n=${hps.length})`);
    }
    expect(off).toEqual([]);
  });

  test('thin tiers are interpolated between their healthy neighbours, never invented', () => {
    // sorted by CR, because JS object key order puts '1/8' AFTER '30'
    const crs = Object.keys(PRINT_HP_BY_CR).sort((a, b) => key(a) - key(b));
    const thin = (k) => (byCr[key(k)] ?? []).length < 4;
    const off = [];
    for (let i = 1; i < crs.length - 1; i++) {
      // ONLY the interpolated tiers. A healthy tier carries print's own median and may sit outside
      // its neighbours' range — CR 11's real median (199) is above CR 12's (198), and smoothing that
      // away is exactly what the first cut did wrong.
      if (!thin(crs[i])) continue;
      const v = PRINT_HP_BY_CR[crs[i]];
      const lo = Math.min(PRINT_HP_BY_CR[crs[i - 1]], PRINT_HP_BY_CR[crs[i + 1]]);
      const hi = Math.max(PRINT_HP_BY_CR[crs[i - 1]], PRINT_HP_BY_CR[crs[i + 1]]);
      if (v < lo || v > hi) off.push(`CR ${crs[i]}: ${v} outside [${lo}, ${hi}]`);
    }
    expect(off).toEqual([]);
  });

  test('the curve rises, and where it dips that dip is print\'s own', () => {
    const crs = Object.keys(PRINT_HP_BY_CR).sort((a, b) => key(a) - key(b));
    const dips = crs.filter((k, i) => i && PRINT_HP_BY_CR[k] < PRINT_HP_BY_CR[crs[i - 1]]);
    // CR 12 (198) after CR 11 (199): print's own medians, left alone rather than smoothed away
    expect(dips).toEqual(['12']);
    for (const k of dips) expect(PRINT_HP_BY_CR[k]).toBeGreaterThan(PRINT_HP_BY_CR[crs[crs.indexOf(k) - 1]] * 0.95);
  });

  test('every key exists in the DMG table — the AC step reads TABLE[defBase]', () => {
    // the first cut keyed '0.125' where the table keys '1/8', and `TABLE[defBase].armor_class`
    // threw on a fractional-CR donor
    for (const k of Object.keys(PRINT_HP_BY_CR)) expect(TABLE[k]).toBeTruthy();
  });

  test('the headroom factor is the DMG method\'s own trait rungs, not a fudge', () => {
    // the method adds rungs for AC and defensive traits on top of an HP-derived base, and print's
    // monsters carry those traits — so the reference sits above print's median by roughly one rung
    expect(PRINT_HP_TRAIT_HEADROOM).toBeGreaterThan(1);
    expect(PRINT_HP_TRAIT_HEADROOM).toBeLessThan(1.5);
  });
});

describe('print, read by this instrument, sits on its own labels', () => {
  const net = [], def = [];
  for (const m of PRINT) {
    const cr = crOf(m); if (!(cr >= 1)) continue;
    let r; try { r = checkBlock(m).read; } catch { continue; }
    if (!r || !Number.isFinite(Number(r.def))) continue;
    net.push(Number(r.read) - cr); def.push(Number(r.def) - cr);
  }

  test('the sample is the corpus, not a handful', () => { expect(net.length).toBeGreaterThan(190); });

  test('the net read centres on print\'s own CR', () => {
    expect(Math.abs(med(net))).toBeLessThanOrEqual(0.5);
  });

  test('and its tails are near symmetric — neither cold nor hot by construction', () => {
    const cold = pct(net, (v) => v <= -1.5), hot = pct(net, (v) => v >= 1.5);
    expect(cold).toBeLessThan(20);                    // was 15% against the DMG column, but on a -0.4 median
    expect(hot).toBeLessThan(20);
    expect(Math.abs(cold - hot)).toBeLessThanOrEqual(10);
  });

  test('the defensive axis alone no longer brands print cold — the defect the owner saw', () => {
    // against the DMG column this read 33% of print's own blocks as 1.5+ CR under their label
    expect(pct(def, (v) => v <= -1.5)).toBeLessThan(25);
  });
});
