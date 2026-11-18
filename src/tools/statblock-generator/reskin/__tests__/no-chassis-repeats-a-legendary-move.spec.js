/**
 * NO CHASSIS OFFERS THE SAME LEGENDARY MOVE TWICE (fix 4, 2026-11-18).
 *
 * The owner on the Brass Tyrant: "anvil advance and forge wreck are almost dupes". Both rows of
 * `brute-17-juggernaut` opened "The creature moves up to half its Speed without provoking
 * Opportunity Attacks", so a three-option legendary menu spent two options on the same move.
 *
 * Wrecking Path now moves up to its FULL Speed: a short step with a blow, beside a long charge
 * through walls. That is print's own pair — the Tarrasque's Onslaught is half its Speed and an
 * attack, World-Shaking Movement is its full Speed — and the sibling chassis brute-17-charger
 * already writes its Stampede at full Speed.
 *
 * The other three chassis the survey found are left alone: brute-17-charger (half plus an attack
 * against a full-Speed straight-line stampede), brute-17-grappler (the drag carries grappled
 * creatures) and lurker-13 (the lunge provokes, the withdraw does not). In each the second row
 * differs in a way a GM would use differently.
 *
 * This is data integrity on the catalog, so it guards every chassis rather than this one row.
 */
import * as donors from '../donors.mjs';

/** every chassis's legendary rows, read out of the module's own exported data */
const legendaryByChassis = () => {
  const out = new Map();
  const seen = new Set();
  const walk = (o, id) => {
    if (!o || typeof o !== 'object' || seen.has(o)) return;
    seen.add(o);
    const here = typeof o.id === 'string' ? o.id : id;
    for (const [k, v] of Object.entries(o)) {
      if (Array.isArray(v) && v.some((e) => /^Legendary /.test(String(e?.name ?? '')))) {
        const rows = v.filter((e) => /^Legendary /.test(String(e?.name ?? '')) && e?.text && !/^Legendary (?:Resistance|Action Uses)/.test(e.name));
        if (rows.length && here) out.set(here, [...(out.get(here) ?? []), ...rows]);
      }
      if (v && typeof v === 'object') walk(v, here);
    }
  };
  for (const v of Object.values(donors)) walk(v, null);
  return out;
};

const firstSentence = (t) => String(t ?? '').split('.')[0].trim();

describe('no chassis repeats a legendary move', () => {
  const byChassis = legendaryByChassis();

  test('the sweep actually found the catalog\'s legendary chassis', () => {
    expect(byChassis.size).toBeGreaterThan(20);
    expect([...byChassis.keys()]).toContain('brute-17-juggernaut');
  });

  test('no chassis holds two legendary rows identical up to the first full stop', () => {
    const dupes = [];
    for (const [id, rows] of byChassis) {
      const seen = new Map();
      for (const r of rows) {
        const key = firstSentence(r.text);
        if (seen.has(key)) dupes.push(`${id}: "${seen.get(key)}" and "${r.name}" both open "${key}"`);
        else seen.set(key, r.name);
      }
    }
    expect(dupes).toEqual([]);
  });

  test("the juggernaut's pair is a short step and a long charge", () => {
    const rows = byChassis.get('brute-17-juggernaut');
    const move = rows.find((r) => r.name === 'Legendary Move and Attack');
    const wreck = rows.find((r) => r.name === 'Legendary Wrecking Path');
    expect(move).toBeDefined();
    expect(wreck).toBeDefined();
    expect(move.text).toMatch(/up to half its Speed/);
    expect(wreck.text).toMatch(/up to its Speed/);
    expect(wreck.text).not.toMatch(/half its Speed/);
    expect(wreck.text).toMatch(/destroying them/);     // what it is FOR survives the change
    expect(firstSentence(move.text)).not.toBe(firstSentence(wreck.text));
  });

  // THE THREE LEFT ALONE, pinned so a later tidy does not flatten them into one shape.
  test('the other three chassis keep their distinct second row', () => {
    const open = (id, name) => firstSentence((byChassis.get(id) ?? []).find((r) => r.name === name)?.text);
    expect(open('brute-17-charger', 'Legendary Stampede')).toMatch(/up to its Speed in a straight line/);
    expect(open('brute-17-grappler', 'Legendary Drag')).toMatch(/carrying/);
    expect(open('lurker-13', 'Legendary Lunge')).not.toMatch(/without provoking/);
    expect(open('lurker-13', 'Legendary Withdraw')).toMatch(/without provoking/);
  });
});
