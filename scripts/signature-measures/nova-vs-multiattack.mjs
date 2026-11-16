// HOW MUCH BIGGER IS A NOVA THAN THE ROUND IT REPLACES? (owner, 2026-10-27:
// "check print on how much more a nova is compared to the multiattack sum. It
// should always be more and not just by a little bit".)
//
// Print is the authority. For every block with a gated damage row, this compares
// that row's average damage to the block's whole Multiattack round, parsed from
// the Multiattack sentence and the named rows' own dice.
import fs from 'node:fs';
import CORPUS from '@/data/srd52-monsters.json';

const WORDS = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
const bare = (n) => String(n ?? '').replace(/\s*\(.*\)$/, '').trim();
// the average of every damage expression in a row, as print writes it: "22 (3d8 + 9)"
const avgOf = (t) => [...String(t ?? '').matchAll(/(\d+) \(\d+d\d+(?: [+-] \d+)?\)/g)].reduce((s, m) => s + Number(m[1]), 0);
const GATED = /\((?:Recharge [\d–-]+|\d\/Day)\)/;

const rowsOf = (c) => Object.entries(c.sections ?? {}).flatMap(([sec, es]) => (es ?? []).filter(Boolean).map((e) => ({ sec, ...e })));

const out = [];
for (const c of (Array.isArray(CORPUS) ? CORPUS : Object.values(CORPUS).flat())) {
  const rows = rowsOf(c);
  const ma = rows.find((e) => /^Multiattack/.test(e.name ?? ''));
  if (!ma) continue;
  // the round: each "<count> <Name> attacks" in the Multiattack, priced off that row
  let round = 0; const parts = [];
  for (const m of String(ma.text).matchAll(/(\w+) ([A-Z][\w' -]*?) attacks?\b/g)) {
    const n = WORDS[m[1].toLowerCase()] ?? Number(m[1]);
    const row = rows.find((e) => bare(e.name) === m[2].trim());
    if (!n || !row) continue;
    const a = avgOf(row.text);
    if (a) { round += n * a; parts.push(`${n}x${bare(row.name)} ${a}`); }
  }
  if (!round) continue;
  for (const e of rows) {
    if (!GATED.test(e.name ?? '')) continue;
    const nova = avgOf(e.text);
    if (!nova) continue;
    out.push({ mon: c.name, cr: c.cr, nova: bare(e.name), novaAvg: nova, round, ratio: nova / round, parts: parts.join(' + ') });
  }
}

out.sort((a, b) => a.ratio - b.ratio);
const r = out.map((x) => x.ratio);
const pct = (p) => r[Math.floor((r.length - 1) * p)].toFixed(2);
console.log(`${out.length} gated damage rows in print, against their own block's Multiattack round.\n`);
console.log(`  ratio nova / round:  min ${pct(0)}  p25 ${pct(0.25)}  MEDIAN ${pct(0.5)}  p75 ${pct(0.75)}  max ${pct(1)}`);
console.log(`  under 1.0x (a nova WEAKER than the round it replaces): ${r.filter((x) => x < 1).length} of ${r.length}`);
console.log(`  under 1.5x: ${r.filter((x) => x < 1.5).length}   under 2.0x: ${r.filter((x) => x < 2).length}`);
console.log('\nthe weakest ten in print:');
for (const x of out.slice(0, 10)) console.log(`  ${x.ratio.toFixed(2)}x  CR ${String(x.cr).padEnd(4)} ${x.mon}/${x.nova}: ${x.novaAvg} vs round ${x.round} (${x.parts})`);
console.log('\nthe strongest five:');
for (const x of out.slice(-5)) console.log(`  ${x.ratio.toFixed(2)}x  CR ${String(x.cr).padEnd(4)} ${x.mon}/${x.nova}: ${x.novaAvg} vs round ${x.round}`);
