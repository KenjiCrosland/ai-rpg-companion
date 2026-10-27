// WHAT COUNTS AS UNDERPOWERED OR GROSSLY OVERPOWERED? (owner, 2026-10-27: "the
// threshold should be determined by print, I believe we have rule based
// recommendations but print commonly breaks those".)
//
// The DMG table gives a damage-per-round band per CR. Print ignores it routinely,
// so the honest threshold is PRINT'S OWN SPREAD against that table: measure
// every print block's round DPR as a ratio of the table's midpoint, and let its
// percentiles define acceptable. Then the same measure on our sheets says which
// are under print's floor (never acceptable) and which are past its ceiling.
import CORPUS from '@/data/srd52-monsters.json';
import TABLE from '@/data/challengeRatings.json';
import fs from 'node:fs';

const WORD = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
const bare = (n) => String(n ?? '').replace(/\s*\(.*\)$/, '').trim();
const avg = (t) => [...String(t ?? '').matchAll(/(\d+) \(\d+d\d+(?: [+-] \d+)?\)/g)].reduce((s, m) => s + Number(m[1]), 0);
const crKey = (cr) => (cr === 0.125 ? '1/8' : cr === 0.25 ? '1/4' : cr === 0.5 ? '1/2' : String(cr));
const expected = (cr) => { const r = TABLE[crKey(cr)]; return r ? (Number(r.min_damage_per_round) + Number(r.max_damage_per_round)) / 2 : null; };

// A ROUND IS WHAT THE CREATURE DOES ON ITS TURN: the Multiattack as written, or
// its single biggest attack when it has none. Novas are excluded — they are
// gated, and the owner's question is the sustained round.
const roundOf = (rows) => {
  const ma = rows.find((e) => /^Multiattack/.test(e.name ?? ''));
  if (ma) {
    let sum = 0;
    for (const m of String(ma.text).matchAll(/(\w+) ([A-Z][\w' -]*?) attacks?\b/g)) {
      const n = WORD[m[1].toLowerCase()] ?? Number(m[1]);
      const r = rows.find((e) => bare(e.name) === m[2].trim());
      if (n && r && avg(r.text)) sum += n * avg(r.text);
    }
    if (sum) return sum;
  }
  const atk = rows.filter((e) => /Attack Roll/.test(e.text ?? '') && !/\((?:Recharge|\d\/Day)/.test(e.name ?? '')).map((e) => avg(e.text));
  return atk.length ? Math.max(...atk) : 0;
};

const pct = (v, p) => v[Math.min(v.length - 1, Math.max(0, Math.floor((v.length - 1) * p)))];
const ratios = [];
for (const c of (Array.isArray(CORPUS) ? CORPUS : Object.values(CORPUS).flat())) {
  const rows = Object.values(c.sections ?? {}).flat().filter(Boolean);
  const r = roundOf(rows); const e = expected(Number(c.cr));
  if (r && e) ratios.push({ mon: c.name, cr: Number(c.cr), r, e, ratio: r / e });
}
ratios.sort((a, b) => a.ratio - b.ratio);
const rv = ratios.map((x) => x.ratio);
console.log(`PRINT: ${ratios.length} blocks, round DPR as a ratio of the DMG table's midpoint\n`);
for (const p of [0, 0.05, 0.25, 0.5, 0.75, 0.95, 1]) console.log(`  p${String(Math.round(p * 100)).padStart(3)}  ${pct(rv, p).toFixed(2)}x`);
console.log(`\n  print under the table at all: ${rv.filter((x) => x < 1).length} of ${rv.length} (${Math.round((100 * rv.filter((x) => x < 1).length) / rv.length)}%)`);
console.log(`  print above 1.5x the table:   ${rv.filter((x) => x > 1.5).length} (${Math.round((100 * rv.filter((x) => x > 1.5).length) / rv.length)}%)`);
console.log('\n  coldest five:'); for (const x of ratios.slice(0, 5)) console.log(`    ${x.ratio.toFixed(2)}x  CR ${String(x.cr).padEnd(4)} ${x.mon}: round ${x.r} vs table ${x.e}`);
console.log('  hottest five:'); for (const x of ratios.slice(-5)) console.log(`    ${x.ratio.toFixed(2)}x  CR ${String(x.cr).padEnd(4)} ${x.mon}: round ${x.r} vs table ${x.e}`);
console.log(`\nPROPOSED BAND, from print's own spread:`);
console.log(`  UNDERPOWERED      below ${pct(rv, 0.05).toFixed(2)}x  (print's 5th percentile — 5% of print is colder)`);
console.log(`  GROSSLY OVER      above ${pct(rv, 0.95).toFixed(2)}x  (print's 95th — 5% of print is hotter)`);

// and our sheets, measured the same way
const ours = [];
for (const D of fs.readdirSync('smoke-out').filter((d) => fs.statSync(`smoke-out/${d}`).isDirectory())) {
  for (const f of fs.readdirSync(`smoke-out/${D}`).filter((x) => /^\d.*\.json$/.test(x))) {
    let j; try { j = JSON.parse(fs.readFileSync(`smoke-out/${D}/${f}`, 'utf8')); } catch { continue; }
    const cr = Number(String(j.challenge_rating ?? j.cr ?? '').split(' ')[0]); if (!cr) continue;
    const rows = [...Object.values(j.sections ?? {}).flat(), ...(j.abilities ?? []), ...(j.actions ?? [])].filter(Boolean);
    const r = roundOf(rows); const e = expected(cr);
    if (r && e) ours.push(r / e);
  }
}
ours.sort((a, b) => a - b);
if (ours.length) {
  console.log(`\nOURS: ${ours.length} saved sheets`);
  for (const p of [0, 0.05, 0.25, 0.5, 0.75, 0.95, 1]) console.log(`  p${String(Math.round(p * 100)).padStart(3)}  ${pct(ours, p).toFixed(2)}x`);
  const lo = pct(rv, 0.05), hi = pct(rv, 0.95);
  console.log(`\n  UNDER print's floor (${lo.toFixed(2)}x): ${ours.filter((x) => x < lo).length} (${Math.round((100 * ours.filter((x) => x < lo).length) / ours.length)}%)`);
  console.log(`  OVER print's ceiling (${hi.toFixed(2)}x): ${ours.filter((x) => x > hi).length} (${Math.round((100 * ours.filter((x) => x > hi).length) / ours.length)}%)`);
}
