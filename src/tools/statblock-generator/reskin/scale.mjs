/**
 * Stage 3 — scaling. The donor's numbers move to the target CR along the
 * business card's lines; dice re-derive from the card's summed budget so
 * sustained + amortized nova land in band TOGETHER (the whole point).
 */
import { cardBudget, withinBudget } from './card-budgets.mjs';
import { attackDamageDiceFor, saveDamageDiceFor, hpFormulaFor } from '../format-2024/dice.mjs';
import { DONORS } from './donors.mjs';

export function pickDonor(cr) {
  const atOrBelow = DONORS.filter((d) => d.cr <= cr).sort((a, b) => b.cr - a.cr);
  return atOrBelow[0] ?? DONORS[0];
}

const ATTACK_RE = /(\+\d+)(, reach [^.]+|, range [^.]+)? ?\.? (\d+) \((\d+d\d+(?:\s*\+\s*\d+)?)\) ([\w{}]+) damage/;

export function scaleDonor(donor, cr, { legendary = donor.legendary } = {}) {
  const card = cardBudget(cr, { legendary: !!legendary });
  const scaled = JSON.parse(JSON.stringify(donor));
  // CON carries more of the HP load as CR climbs (batch review: 38 dice
  // on CON 14 at CR 20 — peers run CON 20-26 on 24-31 dice)
  scaled.stats.CON = Math.max(scaled.stats.CON, 12 + Math.floor(cr / 2));
  scaled.cr = cr;
  scaled.ac = card.ac; scaled.hp = card.hp; scaled.atk = card.atk; scaled.dc = card.dc;
  scaled.pb = cr >= 17 ? 6 : cr >= 13 ? 5 : cr >= 9 ? 4 : cr >= 5 ? 3 : 2;

  // Damage split: the donor's SHAPE decides the ratio (how much of the
  // budget its nova carries); the card decides the total. Solve per-hit
  // damage so summedDPR hits the card's dpr, holding the donor's attack
  // count and nova-to-sustained ratio.
  const rows = Object.entries(scaled.sections).flatMap(([sec, es]) => es.map((e) => ({ sec, e })));
  const multi = rows.find((r) => r.e.name === 'Multiattack');
  const attacks = multi ? Number(/makes (\w+)/.exec(multi.e.text)[1].replace('two', 2).replace('three', 3)) : 1;
  const legendaryStrikes = rows.filter((r) => r.sec === 'Legendary Actions' && /makes one (Melee Attack|Ranged Attack)/.test(r.e.text)).length;
  const novaRows = rows.filter((r) => r.e.gate);
  // iterate per-hit until in band (coarse then fine — the dice snap anyway)
  let perHit = Math.max(4, Math.round(card.dpr / (attacks + legendaryStrikes + 1)));
  // PER-USE nova ceiling, measured against ALL printed single-entry
  // maxima (2026-08-18, the reviewer's non-dragon rider — which was
  // earned: 5.5xCR ran 75% over print at the top). Print's biggest
  // swings PLATEAU: CR 5 max 31, CR 8 49, CR 11 66 (Behir), then 55-88
  // from CR 13 through CR 30 (Ancient White 63 at 20, Tarrasque bellow
  // 78 at 30). min(6xCR, 70) tracks the line within a die at every
  // measured point. Reallocated budget lands in sustained, which is
  // bounded by the band by construction (summedDPR returns sustained
  // alone once the nova sinks beneath it).
  // Sloped plateau (batch two: 12/16/20 all shipped 71 — one number,
  // three tiers). NOTE the reviewer's "print ~91" is the 2014 figure; the
  // measured 5.2 maxima at CR 20 is 63. min(6xCR, 55+CR) varies within
  // the printed plateau: 66@11 (the Behir exactly), 67@12, 71@16, 75@20.
  const novaCeil = Math.min(Math.round(6 * cr), 55 + Math.round(cr));
  const novaAvgFor = (ph) => Math.min(Math.round(ph * attacks * 1.5), novaCeil);
  for (let i = 0; i < 40; i += 1) {
    const sustained = perHit * (attacks + legendaryStrikes);
    const novas = novaRows.map((r) => ({ avg: novaAvgFor(perHit), gate: r.e.gate }));
    const { ok, actual, target } = withinBudget(cr, sustained, novas, { legendary: !!legendary });
    if (ok && actual >= target * 0.9) break;
    perHit += actual < target ? 1 : -1;
  }
  const dexMod = Math.floor((scaled.stats.DEX - 10) / 2);
  const strMod = Math.floor((scaled.stats.STR - 10) / 2);
  for (const { e } of rows) {
    if (!ATTACK_RE.test(e.text)) continue;
    const mod = /Ranged/.test(e.text) || /Melee/.test(e.text) ? Math.max(dexMod, strMod) : dexMod;
    // the dominated-twin price (batch four): a budget-identical ranged
    // option is strictly safer than the melee it mirrors, so the ranged
    // row pays ~15% (print's own premium: Frost Giant axe 28 vs bow 24)
    const rowBudget = /Ranged Attack Roll/.test(e.text) && !/Melee/.test(e.text)
      ? Math.max(3, Math.round(perHit * 0.85)) : perHit;
    const { avg, dice } = attackDamageDiceFor(rowBudget, Math.min(mod, rowBudget - 1));
    e.text = e.text
      .replace(/\+\d+, (reach|range)/, `+${card.atk}, $1`)
      .replace(/\d+ \(\d+d\d+(?:\s*\+\s*\d+)?\) ([\w{}]+) damage/, `${avg} (${dice}) $1 damage`);
    // THE ENERGY RIDER (owner TODO, landed 2026-08-18; the Assassin datum:
    // print tops up a skirmisher's thin base with per-hit riders — the 73%
    // "both" shape). The MELEE attack always scales as a split — 60% base
    // physical + 40% rider dice, sum = the solved per-hit, budget
    // unchanged — and the reskin model decides: a rider type fills
    // {damage_type_2}; "none" ships text_noRider, the full-budget single
    // clause. Priced either way, chosen by concept.
    if (/Melee Attack Roll/.test(e.text) && !e.gate) {
      e.text_noRider = e.text;
      const base = Math.max(2, Math.round(perHit * 0.6));
      const riderAvg = perHit - base;
      // no split on tiny budgets: two dice-snap floors overshoot a small
      // per-hit (live: CR 1/2 shipped 175% of band), and print's riders
      // start at the Assassin's tier anyway
      if (perHit >= 8 && riderAvg >= 3) {
        const b2 = attackDamageDiceFor(base, Math.min(mod, base - 1));
        const r2 = saveDamageDiceFor(riderAvg);
        e.text = e.text.replace(/\d+ \(\d+d\d+(?:\s*\+\s*\d+)?\) ([\w{}]+) damage/,
          `${b2.avg} (${b2.dice}) $1 damage plus ${r2.avg} (${r2.dice}) {damage_type_2} damage`);
      }
    }
  }
  for (const { e } of rows) {
    // the wildcard SLOT's chassis text is the verified fallback — it must
    // carry the scaled DC too (live: a CR 20 shipped its donor's DC 20)
    if (!e.gate) e.text = e.text.replace(/DC \d+/g, `DC ${card.dc}`);
    if (e.gate) {
      const { avg, dice } = saveDamageDiceFor(novaAvgFor(perHit));
      e.text = e.text.replace(/DC \d+/g, `DC ${card.dc}`)
        .replace(/\d+ \(\d+d\d+\) ([\w{}]+) damage/, `${avg} (${dice}) $1 damage`);
    }
  }
  const conMod = Math.floor((scaled.stats.CON - 10) / 2);
  scaled.hp_formula = hpFormulaFor(card.hp, scaled.size ?? 'Medium', conMod);
  scaled.per_hit = perHit;
  return scaled;
}
