/**
 * Stage 3 — scaling. The donor's numbers move to the target CR along the
 * business card's lines; dice re-derive from the card's summed budget so
 * sustained + amortized nova land in band TOGETHER (the whole point).
 */
import { cardBudget, withinBudget } from './card-budgets.mjs';
import { attackDamageDiceFor, saveDamageDiceFor, hpFormulaFor } from '../format-2024/dice.mjs';
import { DONORS } from './donors.mjs';

export function pickDonor(cr, style = null) {
  // style-matched template first (the full-template lines: mounted,
  // skulker, hurler); plain seat when the style has no line here
  const pool = DONORS.filter((d) => (style ? d.style === style : !d.style));
  const fallback = DONORS.filter((d) => !d.style);
  const from = (list) => list.filter((d) => d.cr <= cr).sort((a, b) => b.cr - a.cr)[0] ?? list[0];
  return (pool.length ? from(pool) : from(fallback)) ?? from(fallback);
}

const ATTACK_RE = /(\+\d+)(, reach [^.]+|, range [^.]+)? ?\.? (\d+) \((\d+d\d+(?:\s*\+\s*\d+)?)\) ([\w{}]+) damage/;

export function scaleDonor(donor, cr, { legendary = donor.legendary, movement = [], mechanics = null } = {}) {
  const card = cardBudget(cr, { legendary: !!legendary });
  const scaled = JSON.parse(JSON.stringify(donor));
  // CONCEPT GATING (owner "let's do it", 2026-08-24): rows tagged gated_on
  // ship only when the concept call listed that mechanic. mechanics=null
  // (blank path, direct callers) = ungated; an ARRAY gates — including []
  // (default closed: print's default is no gaze and no teleport). Both
  // gated rows sit outside summedDPR, so omission is budget-neutral.
  scaled.gated_out = [];
  if (Array.isArray(mechanics)) {
    for (const [sec, es] of Object.entries(scaled.sections)) {
      scaled.sections[sec] = es.filter((e) => {
        if (!e.gated_on || mechanics.includes(e.gated_on)) return true;
        scaled.gated_out.push(`${e.name} (${e.gated_on})`);
        return false;
      });
    }
  }
  // ESCAPE-ROW STANDARDIZATION (owner + print, 2026-08-26): seven bespoke
  // names shipped on one verbatim sentence — the one repetition the
  // owner's eye caught across the probe set. Print's cure is
  // standardization, not variety: shared mechanics share names (corpus:
  // Cunning Action x2, Nimble Escape x6, Deathless Agility x2). Skulkers
  // keep Hide under print's own name; every other style drops Hide (a
  // mount, a Large ogre, a mid-air flyer have no business hiding —
  // owner: "mounts shouldn't hide") under the owner's "[Adjective]
  // Agility" house family. rules:true takes the row out of the rename
  // pool; the audit's NEVER_RENAME covers the names.
  const AGILITY_NAME = { mounted: 'Mounted Agility', winged: 'Aerial Agility', hurler: 'Fleet Agility' };
  for (const es of Object.values(scaled.sections)) {
    for (const e of es) {
      if (/takes the Dash, Disengage, or Hide action/.test(e.text)) {
        if (scaled.style === 'skulker') e.name = 'Cunning Action';
        else {
          e.name = AGILITY_NAME[scaled.style] ?? 'Fleet Agility';
          e.text = e.text.replace('the Dash, Disengage, or Hide action', 'the Dash or Disengage action');
        }
        e.rules = true;
      } else if (/takes the Disengage or Hide action/.test(e.text)) {
        // the legendary escape: 0/329 print legendaries grant
        // Disengage/Hide — the row is our invention, so its NAME
        // standardizes like the bonus-action suite (5 bespoke names
        // shipped on one verbatim sentence). Print has no name to
        // borrow and "Nimble Escape" means the goblin BONUS action;
        // 'Withdraw' is the function name. Skulkers keep Hide.
        e.name = 'Withdraw';
        if (scaled.style !== 'skulker') e.text = e.text.replace('the Disengage or Hide action', 'the Dash or Disengage action');
        e.rules = true;
      }
    }
  }
  // CON carries more of the HP load as CR climbs (batch review: 38 dice
  // on CON 14 at CR 20 — peers run CON 20-26 on 24-31 dice)
  scaled.stats.CON = Math.max(scaled.stats.CON, 12 + Math.floor(cr / 2));
  scaled.cr = cr;
  scaled.ac = card.ac; scaled.hp = card.hp; scaled.atk = card.atk; scaled.dc = card.dc;
  // full print ladder: the old ceiling of 6 shipped wrong PB/saves/skills
  // on every CR 21+ block (Stormfall +6 at CR 22, lint-caught 2026-08-20)
  scaled.pb = cr >= 29 ? 9 : cr >= 25 ? 8 : cr >= 21 ? 7 : cr >= 17 ? 6 : cr >= 13 ? 5 : cr >= 9 ? 4 : cr >= 5 ? 3 : 2;
  // The concept call's movement grant: a flying concept on a grounded
  // chassis gains Fly (hover) — print's ghost idiom (Wraith, Fly 60
  // hover on an ordinary frame). Winged-style donors carry Fly natively.
  const walkFt = Number((/^(\d+)/.exec(scaled.speed) ?? [0, 30])[1]);
  if (movement.includes('fly') && !/Fly/.test(scaled.speed)) {
    scaled.speed = `${scaled.speed.replace(/,\s*$/, '')}, Fly ${walkFt} ft. (hover)`;
  }
  // burrow/swim were interviewed but never consumed (the Burrower shipped
  // "while underground" gates with no Burrow speed, 2026-08-25). No tax —
  // print prices wings, not fins or claws.
  if (movement.includes('burrow') && !/Burrow/i.test(scaled.speed)) {
    scaled.speed = `${scaled.speed.replace(/,\s*$/, '')}, Burrow 30 ft.`;
  }
  if (movement.includes('swim') && !/Swim/i.test(scaled.speed)) {
    scaled.speed = `${scaled.speed.replace(/,\s*$/, '')}, Swim ${walkFt} ft.`;
  }
  // THE FLIGHT TAX — one rule, keyed on the SHEET, not the source (owner
  // call 2026-08-19: "a flight tax generally makes sense"). Any chassis
  // whose final speed carries Fly pays the measured 10% (flyers 0.98 of
  // card HP vs grounded 1.08, corpus sweep). Winged donors, movement
  // grants, and any future wings all price identically.
  if (/Fly/.test(scaled.speed)) scaled.hp = Math.round(scaled.hp * 0.9);
  // STAT COHERENCE (raise-only, the skeleton path's idiom): a reader
  // recomputes attack = striker mod + PB, so the striker stat rises to
  // pay the card's attack bonus. The DC stays at card — print lets DCs
  // float +-1 off-stat, and attack+DC cannot both cohere to one stat.
  {
    const targetMod = scaled.atk - scaled.pb;
    const striker = scaled.stats.DEX >= scaled.stats.STR ? 'DEX' : 'STR';
    if (Math.floor((scaled.stats[striker] - 10) / 2) < targetMod) scaled.stats[striker] = 10 + targetMod * 2;
    // skills re-derive from the FINAL stats so Stealth/Perception match
    // what a reader computes (donor skill strings are seat-authored)
    const mod = (k) => Math.floor((scaled.stats[k] - 10) / 2);
    const SKILL_STAT = { Perception: 'WIS', Stealth: 'DEX', Acrobatics: 'DEX', Athletics: 'STR', Intimidation: 'CHA' };
    scaled.skills = String(scaled.skills ?? '').split(',').map((t) => t.trim().replace(/^([A-Za-z]+)\s*\+\d+$/, (m0, name) => (SKILL_STAT[name] ? `${name} +${mod(SKILL_STAT[name]) + scaled.pb}` : m0))).join(', ');
  }

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
  scaled.hp_formula = hpFormulaFor(scaled.hp, scaled.size ?? 'Medium', conMod);
  scaled.per_hit = perHit;
  return scaled;
}
