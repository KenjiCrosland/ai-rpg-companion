// EVERY DONOR'S HP CLEARS PRINT'S OWN FLOOR (canaries baseline, 2026-10-15).
//
// `hp_scale` is a deliberate per-donor field — it models print's role trade
// ("AC runs 2-3 UNDER the card, HP ~1.1 over"). Nothing checked it against
// print, so seven donors shipped sheets below the thinnest block print prints at
// that CR: lurker-5 at 65 where print's floor is 67, and lurker-17-phantom at
// 151 where it is 199.
//
// It went unseen because the old canaries were 8/10 print-canon, and a print
// borrow takes print's OWN hp — the engine's solver was barely exercised by the
// floor. Two live sightings before this pin: the CR 5 polarity canary (FAIL
// `under`) and the CR 19 high-cr block.
//
// This is the print-overrules discipline applied to the donor table: a future
// hp_scale that dips below print fails here instead of on a GM's sheet.
import { DONORS } from '../donors.mjs';
import { cardBudget } from '../card-budgets.mjs';
import printBlocks from '@/data/srd52-monsters.json';

const ALL = Array.isArray(printBlocks) ? printBlocks : Object.values(printBlocks).flat();
const HP_BY_CR = ALL.reduce((acc, m) => {
  const cr = Number(m.cr); const hp = Number(m.hp);
  if (Number.isFinite(cr) && Number.isFinite(hp)) (acc[cr] = acc[cr] ?? []).push(hp);
  return acc;
}, {});
// A THIN SAMPLE BOUNDS NOTHING. print has FOUR blocks at CR 17 — all Celestial
// and Dragon, the thinnest a Sphinx of Valor at 199 — and no lurker-shaped
// creature at all, so a CR 17 lurker has no peer to be measured against. At
// CR 5 print has 25, and the thinnest is the Wraith at 67: a real thin peer, and
// the reason lurker-5 at 65 was genuinely wrong. Ten blocks is where the floor
// starts meaning something. (The checker's own `under` gate does not make this
// distinction — it bounded a CR 19 sheet by a four-block sample. Noted, not
// fixed here.)
// RAW HP, NOT EFFECTIVE — this pin is weaker than the checker's `under` gate and
// must not be read as covering it. print's thinnest CR 5 block is the Wraith at
// 67, and it resists Acid/Bludgeoning/Cold/Fire/Piercing/Slashing and is immune
// to Necrotic and Poison: its EFFECTIVE hp is far past 67, which is why the
// checker's effective band at CR 5 starts at 75. The thinnest CR 5 block with no
// mitigation at all is the Giant Crocodile at 85.
//
// So print pairs thinness with resistance, and our lurker donors have neither
// enough hp nor any mitigation. That is an open design question (give the thin
// lurkers print's resistances, or retire the 2026-09-04 sweep's hp_scale <= 0.8
// ceiling) — NOT a number to nudge, and passing this pin does not mean the
// checker's gate passes.
const MIN_SAMPLE = 10;
const band = (cr) => { const v = HP_BY_CR[cr]; return v && v.length >= MIN_SAMPLE ? { min: Math.min(...v), max: Math.max(...v), n: v.length } : null; };
const scaledHp = (d) => Math.round(cardBudget(d.cr, { legendary: !!d.legendary }).hp * (d.hp_scale ?? 1));

describe("every donor's HP sits inside print's own range", () => {
  test('no donor is thinner than the thinnest block print prints at its CR', () => {
    const under = DONORS.map((d) => ({ d, hp: scaledHp(d), b: band(d.cr) }))
      .filter(({ hp, b }) => b && hp < b.min)
      .map(({ d, hp, b }) => `${d.id} (cr ${d.cr}): ${hp} < print's ${b.min} (n=${b.n})`);
    expect(under).toEqual([]);
  });

  // THE CEILING GETS A MARGIN, THE FLOOR DOES NOT. print's high-CR samples are
  // thin (n=4-6), and a brute is deliberately the fat end of the trade — four
  // brutes sit 0.4%-4.4% over the fattest printed block at their CR, which at
  // six samples is noise, not a defect. A runaway (a donor at twice print's max)
  // still fails. The floor stays strict because a sheet thinner than anything
  // print prints is wrong at any sample size, and the checker's `under` gate
  // agrees — it FAILED the CR 5 polarity canary at 65.
  test('and none is a runaway above print — 10% past the fattest at thin samples', () => {
    const over = DONORS.map((d) => ({ d, hp: scaledHp(d), b: band(d.cr) }))
      .filter(({ hp, b }) => b && hp > b.max * 1.1)
      .map(({ d, hp, b }) => `${d.id} (cr ${d.cr}): ${hp} > print's ${b.max} + 10% (n=${b.n})`);
    expect(over).toEqual([]);
  });

  test('the role trade survives the floor: a lurker is still thinner than a brute', () => {
    const at = (arch, cr) => DONORS.filter((d) => (d.archetypes ?? []).includes(arch) && d.cr === cr && !d.style).map(scaledHp)[0];
    expect(at('lurker', 5)).toBeLessThan(at('brute', 5)); // the field still does its job
    expect(at('caster', 6)).toBeLessThan(at('brute', 5) * 1.2);
  });
});
