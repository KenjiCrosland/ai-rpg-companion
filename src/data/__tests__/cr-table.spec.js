/**
 * Guards the frozen CR table (src/data/cr-table.json).
 *
 * The table is produced OFFLINE by parsing the SRD. Generation never parses
 * anything — it reads this file. That split is deliberate: a parser bug then
 * shows up here, once, instead of silently inside generated monsters. (It
 * already happened: a Multiattack regex that required a capitalised attack
 * name read the Tarrasque as 36 damage instead of 120.)
 *
 * These are hand-verified anchors. If one fails, the extraction changed and
 * the table needs re-review against the published statblocks — do not just
 * update the expectation.
 */
const table = require('../cr-table.json');
const srd = require('../srd52-monsters.json');
const rows = Array.isArray(srd) ? srd : Object.values(srd);
const byName = Object.fromEntries(rows.map((m) => [m.name, m]));

describe('source data anchors (verify against a published statblock)', () => {
  test.each([
    ['Tarrasque', 30, 25, 697, '34d20 + 340'],
    ['Adult Red Dragon', 17, 19, 256, '19d12 + 133'],
    ['Aboleth', 10, 17, 150, '20d10 + 40'],
    ['Bulette', 5, 17, 94, '9d10 + 45'],
    ['Owlbear', 3, 13, 59, '7d10 + 21'],
    ['Wolf', 0.25, 12, 11, '2d8 + 2'],
  ])('%s is unchanged', (name, cr, ac, hp, formula) => {
    const m = byName[name];
    expect(m).toBeDefined();
    expect(m.cr).toBe(cr);
    expect(m.ac).toBe(ac);
    expect(m.hp).toBe(hp);
    expect(m.hp_formula).toBe(formula);
  });

  test('hit-point formulas obey dice x CON mod', () => {
    for (const name of ['Tarrasque', 'Adult Red Dragon', 'Aboleth']) {
      const m = byName[name];
      const [, n, die, flat] = /(\d+)d(\d+)(?: \+ (\d+))?/.exec(m.hp_formula).map(Number);
      expect(Math.floor((n * (die + 1)) / 2) + (flat || 0)).toBe(m.hp);
      if (flat) expect(flat % n).toBe(0); // flat is dice x CON, so it divides
    }
  });
});

describe('frozen CR table', () => {
  const CRS = ['0', '1/8', '1/4', '1/2', ...Array.from({ length: 30 }, (_, i) => String(i + 1))];
  const num = (c) => (c.includes('/') ? eval(c) : Number(c));

  test('every CR is present and carries its provenance', () => {
    for (const cr of CRS) {
      const r = table.by_cr[cr];
      expect(r).toBeDefined();
      expect(['corpus', 'blend', 'formula']).toContain(r.source);
      expect(Array.isArray(r.derived_from)).toBe(true);
      // a corpus-sourced row must name the creatures behind it
      if (r.source === 'corpus') expect(r.derived_from.length).toBeGreaterThanOrEqual(8);
    }
  });

  test('hit points and DPR rise monotonically with CR', () => {
    let hp = 0; let dpr = 0;
    for (const cr of CRS) {
      const r = table.by_cr[cr];
      expect(r.hp).toBeGreaterThanOrEqual(hp);
      expect(r.dpr_target).toBeGreaterThanOrEqual(dpr);
      hp = r.hp; dpr = r.dpr_target;
    }
  });

  test('AC, attack bonus and save DC stay inside sane bands', () => {
    for (const cr of CRS) {
      const r = table.by_cr[cr];
      if (r.ac) expect(r.ac).toBeGreaterThanOrEqual(8) && expect(r.ac).toBeLessThanOrEqual(25);
      if (r.attack_bonus) expect(r.attack_bonus).toBeLessThanOrEqual(20);
      // a save DC can never exceed 8 + PB + the best possible modifier
      if (r.save_dc && r.pb) expect(r.save_dc).toBeLessThanOrEqual(8 + r.pb + 10);
    }
  });

  /**
   * The tests above all passed against two badly broken tables, so these
   * exist to catch that specific class of failure:
   *
   *  1. Interpolation with no anchor above CR 17 flat-extrapolated the last
   *     well-sampled row across CR 18-30. The Tarrasque's AC went 25 -> 19.
   *     Flat is monotonic and inside every sane band, so nothing failed.
   *  2. Falling back to the DMG per-CR table put CR 24 at AC 19 / +11 when
   *     both Ancient Dragons there are AC 22 / +17.
   *  3. Clamping per-attack damage monotonic smeared one Balor's 43-point
   *     Lightning Blade across every CR from 20 to 30.
   *
   * What all three have in common is a number no creature supports, so the
   * guard is to go back to the creatures and check.
   */
  const notBeast = (m) => (m.type || '').split(' ')[0] !== 'Beast';
  const entries = (m) => Object.values(m.sections || {}).flat().filter(Boolean);
  const bestAttack = (m) => {
    const v = entries(m).flatMap((e) => [...(e.text || '').matchAll(/Attack Roll:\*?\s*\+(\d+)/g)].map((x) => +x[1]));
    return v.length ? Math.max(...v) : null;
  };
  const bestDC = (m) => {
    const v = entries(m).flatMap((e) => [...(e.text || '').matchAll(/DC\s*(\d+)/g)].map((x) => +x[1]));
    return v.length ? Math.max(...v) : null;
  };
  const atCR = (cr) => rows.filter((m) => m.cr_str === cr && notBeast(m));

  test.each([
    ['ac', (m) => m.ac],
    ['attack_bonus', bestAttack],
    ['save_dc', bestDC],
  ])('%s never sits outside the creatures actually printed at that CR', (field, read) => {
    const offenders = [];
    for (const cr of CRS) {
      const r = table.by_cr[cr];
      if (r.field_source !== 'corpus') continue; // interpolated rows have nothing to check against
      const seen = atCR(cr).map(read).filter((x) => x != null);
      if (!seen.length) continue;
      const lo = Math.min(...seen); const hi = Math.max(...seen);
      // A row may sit above its own creatures only where the monotonic clamp
      // raised it, and only where the row says so. CR 12 is the live case:
      // its corpus is the Archmage (+9) and Erinyes (+8), both casters whose
      // attack roll understates them, so it is held at CR 11's +10.
      const clamp = r.clamped?.[field];
      if (clamp && clamp.raised_to === r[field] && clamp.observed_median <= hi) continue;
      if (r[field] < lo || r[field] > hi) {
        offenders.push(`CR ${cr}: table says ${r[field]}, creatures there are ${lo}-${hi} `
          + `(${atCR(cr).map((m) => m.name).join(', ')})`);
      }
    }
    expect(offenders).toEqual([]);
  });

  test('the Tarrasque is the CR 30 row, not a formula guess at it', () => {
    // The single most-checkable creature in the game, and the one the
    // flat-extrapolation bug mangled worst. Anyone can look this up.
    const t = byName.Tarrasque; const r = table.by_cr['30'];
    expect(r.ac).toBe(t.ac);
    expect(r.attack_bonus).toBe(bestAttack(t));
    expect(r.save_dc).toBe(bestDC(t));
  });

  test('no field flatlines across a long stretch of CRs', () => {
    // Flat runs are how both bad tables looked: a real value repeated by
    // machinery rather than by the data. Some plateaus are genuine, so the
    // threshold sits between the two. Armour class really does flatten at
    // 18 across CR 10-15 (observed medians 18, 17, 17.5, 17.5, 18, 18),
    // whereas the flat-extrapolation bug held every field static for the
    // thirteen rows from CR 18 to CR 30.
    const MAX_RUN = 8;
    const upper = CRS.slice(CRS.indexOf('10'));
    for (const field of ['ac', 'attack_bonus', 'save_dc', 'per_attack_damage']) {
      let run = 0; let prev = null; let worst = '';
      for (const cr of upper) {
        const v = table.by_cr[cr][field];
        run = v === prev ? run + 1 : 1;
        prev = v;
        if (run > MAX_RUN && !worst) worst = `${field} held at ${v} for ${run} CRs ending at CR ${cr}`;
      }
      expect(worst).toBe('');
    }
  });

  test('per-attack damage is pooled, and is not forced to rise', () => {
    // It genuinely falls with CR in places (25 at CR 11, 21 at CR 17) because
    // designers add attacks rather than inflate each hit. A table where it
    // only ever rises has been clamped, and clamping fabricates the top end.
    for (const cr of CRS) expect(table.by_cr[cr].per_attack_damage_pooled_from).toBeTruthy();
    const series = CRS.map((c) => table.by_cr[c].per_attack_damage);
    expect(series.some((v, i) => i && v < series[i - 1])).toBe(true);
  });

  test('corpus-sourced rows match the creatures they name', () => {
    for (const cr of CRS) {
      const r = table.by_cr[cr];
      if (r.source !== 'corpus') continue;
      const hps = r.derived_from.map((n) => byName[n]).filter(Boolean).map((m) => m.hp).sort((a, b) => a - b);
      const mid = hps.length % 2 ? hps[(hps.length - 1) / 2]
        : (hps[hps.length / 2 - 1] + hps[hps.length / 2]) / 2;
      expect(Math.abs(r.hp - mid)).toBeLessThanOrEqual(1); // the stated median
    }
  });
});
