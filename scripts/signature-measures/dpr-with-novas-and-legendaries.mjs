// TOTAL DAMAGE OUTPUT, THE WAY THE CARD MODELS A FIGHT (owner, 2026-10-27:
// "we need to get the DPR right … It's ok if the blocks run hot, as print does
// run hot especially 2024. But we can't be underpowered or grossly
// overpowered", and "the reason why I'm focused on DPR again is because we're
// doing novas. don't forget damage by legendaries too").
//
// Uses the ENGINE'S OWN model rather than a second one: `summedDPR` amortizes a
// nova's surplus over a 3-round fight by its gate (Recharge 5-6 once, 2/Day
// twice…), and `cardBudget` sets the target, raising it for a legendary block.
// Legendary ACTION damage is added to the sustained round — print's legendary
// actions are extra turns, which is why `cardBudget` already expects more of
// such a block.
//
// The threshold is PRINT'S OWN SPREAD against that target, not the DMG table's
// band: print breaks the table routinely (owner), so print defines acceptable.
import CORPUS from '@/data/srd52-monsters.json';
import { cardBudget, summedDPR, NOVA_USES_PER_FIGHT, FIGHT_ROUNDS } from '@/tools/statblock-generator/reskin/card-budgets.mjs';
import fs from 'node:fs';

const WORD = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
const bare = (n) => String(n ?? '').replace(/\s*\(.*\)$/, '').trim();
// ALTERNATIVE DAMAGE IS NOT EXTRA DAMAGE. Print's swarm idiom reads "24 (6d6 + 3)
// Piercing damage, or 12 (2d8 + 3) Piercing damage if the swarm is Bloodied" —
// summing both read a CR-3 swarm at 41 where it deals 24, putting it over the
// band. Everything after an "or" that introduces a second damage expression is
// an alternative, so only the head counts.
const avg = (t) => [...String(t ?? '').split(/\bor\s+(?=\d+ \()/)[0].matchAll(/(\d+) \(\d+d\d+(?: [+-] \d+)?\)/g)].reduce((s, m) => s + Number(m[1]), 0);
const gateOf = (n) => (/\(Recharge 4[–-]6\)/.test(n) ? 'Recharge 4-6' : /\(Recharge 5[–-]6\)/.test(n) ? 'Recharge 5-6' : /\((\d)\/Day\)/.test(n) ? `${/\((\d)\/Day\)/.exec(n)[1]}/Day` : null);

// PRINT'S MULTIATTACK GRAMMARS, not just "<count> <Name> attacks". The first
// cut read only the numeral form and so under-counted exactly the blocks the
// owner expected to run hottest: the Hydra ("as many Bite attacks as it has
// heads") came out at ONE bite, the Kraken ("two Tentacle attacks and uses
// Fling, Lightning Strike, or Swallow") lost the save action, the Mummy Lord
// ("one Rotting Fist ... and it uses Dreadful Glare") lost the Glare. High-CR
// blocks use these forms and low-CR blocks do not, so a parse bug was about to
// become a false claim about print's shape.
function outputOf(rows, { legendarySection }) {
  const dmgOf = (nm) => { const r = rows.find((e) => bare(e.name) === String(nm).trim()); return r ? avg(r.text) : 0; };
  const ma = rows.find((e) => /^Multiattack/.test(e.name ?? ''));
  let sustained = 0;
  if (ma) {
    const t = String(ma.text);
    const bestOf = (list) => Math.max(0, ...String(list).split(/,| or /).map((x) => dmgOf(x.trim().replace(/\.$/, ''))));
    // "makes one Bite attack and three other attacks, using Claw or Tail in any
    // combination" (Tarrasque) — the named one, then N of the pool
    const mixed = /\b(\w+) ([A-Z][\w' -]*?) attack and (\w+) other attacks?, using ([^.]+?) in any combination/.exec(t);
    // "makes three attacks, using Rend or Tail Spike in any combination" — print's
    // most common 2024 form, and the one the first two cuts of this missed
    // entirely: the regex wanted a capitalised name between the count and
    // "attacks", so the Manticore read as ONE 7-damage attack against a CR-3
    // target of 25, and the Djinni as one of three.
    const pooled = /\b(\w+) attacks?, using ([^.]+?) in any combination/.exec(t);
    if (mixed) {
      const n1 = WORD[mixed[1].toLowerCase()] ?? Number(mixed[1]) ?? 1;
      const n2 = WORD[mixed[3].toLowerCase()] ?? Number(mixed[3]) ?? 0;
      sustained += n1 * dmgOf(mixed[2]) + n2 * bestOf(mixed[4]);
    } else if (pooled) {
      const n = WORD[pooled[1].toLowerCase()] ?? Number(pooled[1]);
      if (n) sustained += n * bestOf(pooled[2]);
    } else {
      for (const m of t.matchAll(/(\w+) ([A-Z][\w' -]*?) attacks?\b/g)) {
        const n = WORD[m[1].toLowerCase()] ?? Number(m[1]);
        const d = dmgOf(m[2]);
        if (n && d) sustained += n * d;
      }
      const many = /as many ([A-Z][\w' -]*?) attacks as it has (\w+)/.exec(t);
      if (many) {
        const hit = rows.map((e) => new RegExp('has (\\w+) ' + many[2], 'i').exec(e.text ?? '')).find(Boolean);
        const n = hit ? (WORD[String(hit[1]).toLowerCase()] ?? Number(hit[1])) : 2;
        sustained += (n || 2) * dmgOf(many[1]);
      }
      const either = /\b(?:one|1) ([A-Z][\w' -]*?) or ([A-Z][\w' -]*?) attack\b/.exec(t);
      if (either && !sustained) sustained += Math.max(dmgOf(either[1]), dmgOf(either[2]));
    }
    const uses = /\band (?:it )?uses ([^.]+)/.exec(t);
    if (uses) sustained += bestOf(uses[1]);
  }
  if (!sustained) {
    const one = rows.filter((e) => !gateOf(e.name ?? '') && !/^Multiattack/.test(e.name ?? '') && avg(e.text)).map((e) => avg(e.text));
    sustained = one.length ? Math.max(...one) : 0;
  }
  // LEGENDARY ACTIONS ARE EXTRA TURNS. Print allows 3 uses a round; this counts
  // the best damaging one ONCE per round (conservative), and resolves the
  // "uses <RowName>" form that carries no dice of its own. `cardBudget` already
  // raises the target for a legendary block, so this is the output side only.
  const legs = legendarySection.filter((e) => !/^Legendary Action Uses/.test(e.name ?? ''))
    .map((e) => { const d = avg(e.text); if (d) return d; const u = /uses ([A-Z][\w' -]*)/.exec(e.text ?? ''); return u ? dmgOf(u[1]) : 0; });
  const legendaryPerRound = legs.length ? Math.max(0, ...legs) : 0;
  const novas = rows.filter((e) => gateOf(e.name ?? '') && avg(e.text)).map((e) => ({ avg: avg(e.text), gate: gateOf(e.name), targets: /each creature/i.test(e.text) ? 2 : 1 }));
  // PAYOFFS ARE NOT COUNTED, DELIBERATELY (owner, 2026-10-27: "we probably don't
  // need to calculate a payoff because the creature will likely stay in band.
  // make it easy"). Measured before dropping it: amortizing a payoff's surplus
  // once per fight moved our median 0.90x -> 0.91x across the forty, because
  // payoffs appear on 10% of sheets and the surplus over the one attack they
  // replace is small. The accounting gap is real — the chassis solver in
  // scale.mjs never sees a payoff row, so its damage is unmodelled surplus
  // whatever we do here — but it does not move a sheet out of band, and a second
  // condition-name regex in the measure cost more than it bought.
  return { sustained, legendaryPerRound, novas, total: summedDPR(sustained + legendaryPerRound, novas) };
}

const pct = (v, p) => v[Math.min(v.length - 1, Math.max(0, Math.floor((v.length - 1) * p)))];
const collect = (blocks) => {
  const out = [];
  for (const { name, cr, sections, legendary } of blocks) {
    if (!cr) continue;
    const rows = Object.entries(sections ?? {}).flatMap(([sec, es]) => (es ?? []).filter(Boolean).map((e) => ({ sec, ...e })));
    const legendarySection = rows.filter((e) => e.sec === 'Legendary Actions');
    const o = outputOf(rows, { legendarySection });
    const target = cardBudget(cr, { legendary: legendary || legendarySection.length > 0 }).dpr;
    if (o.total && target) out.push({ name, cr, ...o, target, ratio: o.total / target });
  }
  return out.sort((a, b) => a.ratio - b.ratio);
};

const print = collect((Array.isArray(CORPUS) ? CORPUS : Object.values(CORPUS).flat()).map((c) => ({ name: c.name, cr: Number(c.cr), sections: c.sections, legendary: false })));
const pr = print.map((x) => x.ratio);
console.log(`PRINT: ${print.length} blocks — total output (round + legendary + amortized novas) over the card's target\n`);
for (const p of [0, 0.05, 0.25, 0.5, 0.75, 0.95, 1]) console.log(`  p${String(Math.round(p * 100)).padStart(3)}  ${pct(pr, p).toFixed(2)}x`);
console.log('\n  coldest:'); for (const x of print.slice(0, 4)) console.log(`    ${x.ratio.toFixed(2)}x CR ${String(x.cr).padEnd(4)} ${x.name}: ${Math.round(x.total)} vs target ${x.target}`);
console.log('  hottest:'); for (const x of print.slice(-4)) console.log(`    ${x.ratio.toFixed(2)}x CR ${String(x.cr).padEnd(4)} ${x.name}: ${Math.round(x.total)} vs target ${x.target}`);
const LO = pct(pr, 0.05), HI = pct(pr, 0.95);
console.log(`\nTHE BAND, from print: underpowered below ${LO.toFixed(2)}x · grossly over above ${HI.toFixed(2)}x`);
const bandOf = (cr) => (cr <= 4 ? 'CR 0-4' : cr <= 10 ? 'CR 5-10' : cr <= 16 ? 'CR 11-16' : 'CR 17+');
const byBand = {};
for (const x of print) (byBand[bandOf(x.cr)] ??= []).push(x.ratio);
console.log('\nDOES PRINT RUN HOTTER AT HIGH CR? (the owner\'s claim)');
// IS THE MISSING SPELL DAMAGE THE EXPLANATION? (owner, 2026-10-27: "do you
// think 1/2 would really account for that much variance?") Split each band by
// whether the block casts at all: if spells explain the high-CR dip, the
// NON-casters up there should read normal.
const casts = (c) => Object.values(c.sections ?? {}).flat().filter(Boolean).some((r) => /^Spellcasting|casts one of the following/i.test(`${r.name ?? ''}${r.text ?? ''}`));
const CORP = (Array.isArray(CORPUS) ? CORPUS : Object.values(CORPUS).flat());
const casterOf = new Map(CORP.map((c) => [c.name, casts(c)]));
const split = {};
for (const x of print) { const b = bandOf(x.cr); const k = casterOf.get(x.name) ? 'casters' : 'no spells'; ((split[b] ??= {})[k] ??= []).push(x.ratio); }
console.log('\n  split by whether the block casts:');
for (const b of ['CR 0-4', 'CR 5-10', 'CR 11-16', 'CR 17+']) {
  const g = split[b] ?? {};
  const line = ['no spells', 'casters'].map((k) => { const v = (g[k] ?? []).slice().sort((a, c) => a - c); return v.length ? `${k} n=${String(v.length).padEnd(3)} median ${pct(v, 0.5).toFixed(2)}x` : `${k} —`; }).join('   ');
  console.log(`  ${b.padEnd(10)} ${line}`);
}
for (const b of ['CR 0-4', 'CR 5-10', 'CR 11-16', 'CR 17+']) {
  const v = (byBand[b] ?? []).slice().sort((a, c) => a - c);
  if (v.length) console.log(`  ${b.padEnd(10)} n=${String(v.length).padEnd(4)} median ${pct(v, 0.5).toFixed(2)}x   p5 ${pct(v, 0.05).toFixed(2)}x   p95 ${pct(v, 0.95).toFixed(2)}x`);
}

const dirs = process.argv.slice(2);
if (dirs.length) {
  const mine = [];
  for (const D of dirs) for (const f of fs.readdirSync(D).filter((x) => /^\d.*\.json$/.test(x)).sort()) {
    let j; try { j = JSON.parse(fs.readFileSync(`${D}/${f}`, 'utf8')); } catch { continue; }
    const cr = Number(String(j.challenge_rating ?? j.cr ?? '').split(' ')[0]); if (!cr) continue;
    const secs = Object.keys(j.sections ?? {}).length ? j.sections : { Traits: j.abilities ?? [], Actions: j.actions ?? [], 'Legendary Actions': j.legendary_actions ?? [] };
    mine.push({ f, ...collect([{ name: j.name, cr, sections: secs, legendary: false }])[0] ?? {} });
  }
  const ok = mine.filter((x) => x.ratio);
  ok.sort((a, b) => a.ratio - b.ratio);
  console.log(`\nOURS: ${ok.length} sheets`);
  const mr = ok.map((x) => x.ratio);
  for (const p of [0, 0.05, 0.25, 0.5, 0.75, 0.95, 1]) console.log(`  p${String(Math.round(p * 100)).padStart(3)}  ${pct(mr, p).toFixed(2)}x`);
  // PER-BAND VERDICT, in the script that owns the parser. A verdict table built
  // by reimplementing this parser inline scored the Carrion Seraph at 0.31x and
  // Mirelda Sedge at 0.43x — both "underpowered" — because the inline copy
  // lacked the pooled "three attacks, using A or B in any combination" grammar
  // and fell back to ONE attack. One definition, one answer.
  const BAND = { 'CR 0-4': [0.60, 1.67], 'CR 5-10': [0.46, 1.25], 'CR 11-16': [0.38, 0.97], 'CR 17+': [0.38, 0.75] };
  console.log('\n  per sheet, against its own band:');
  for (const x of ok) {
    const b = bandOf(x.cr); const [lo, hi] = BAND[b];
    const v = x.ratio < lo ? 'UNDERPOWERED' : x.ratio > hi ? 'GROSSLY OVER' : 'ok';
    console.log(`    ${String(x.name).slice(0, 24).padEnd(26)}CR ${String(x.cr).padEnd(5)}${x.ratio.toFixed(2)}x  ${b.padEnd(11)}${v}`);
  }
  const under = ok.filter((x) => x.ratio < BAND[bandOf(x.cr)][0]), over = ok.filter((x) => x.ratio > BAND[bandOf(x.cr)][1]);
  console.log(`\n  UNDERPOWERED for its band: ${under.length} of ${ok.length}`);
  for (const x of under.slice(0, 8)) console.log(`    ${x.f?.slice(0, 2)} ${x.ratio.toFixed(2)}x CR ${String(x.cr).padEnd(4)} ${x.name}: ${Math.round(x.total)} vs ${x.target}`);
  console.log(`  GROSSLY OVER for its band: ${over.length}`);
  for (const x of over.slice(-8)) console.log(`    ${x.f?.slice(0, 2)} ${x.ratio.toFixed(2)}x CR ${String(x.cr).padEnd(4)} ${x.name}: ${Math.round(x.total)} vs ${x.target}`);
}
