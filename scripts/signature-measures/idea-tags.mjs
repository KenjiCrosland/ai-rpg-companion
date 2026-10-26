import fs from 'node:fs'; import path from 'node:path';
const rows = []; let untagged = 0;
for (const D of process.argv.slice(2)) for (const f of fs.readdirSync(D).filter((x) => /^\d.*\.md$/.test(x)).sort()) {
  for (const l of fs.readFileSync(path.join(D, f), 'utf8').split('\n')) {
    const m = /^\[reskin\] signature idea \((action|trait)\): "(.*?)"\s*\[(\w+)\/(\w+)\/(\w+)\]/.exec(l);
    if (m) rows.push({ seat: m[1], idea: m[2], section: m[3], trigger: m[4], effect: m[5] });
    else if (/^\[reskin\] signature idea \(/.test(l)) untagged += 1;
  }
}
const tally = (key) => { const t = {}; for (const r of rows) { const k = `${r.seat}:${r[key]}`; t[k] = (t[k] ?? 0) + 1; } return t; };
const show = (title, t) => { console.log(`\n${title}`); for (const seat of ['action', 'trait']) { const n = rows.filter((r) => r.seat === seat).length; const line = Object.entries(t).filter(([k]) => k.startsWith(seat + ':')).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k.split(':')[1]} ${v} (${Math.round(100 * v / n)}%)`).join('  ·  '); console.log(`  ${seat.padEnd(7)} n=${n}: ${line}`); } };
console.log(`${rows.length} tagged ideas, ${untagged} untagged`);
show('TRIGGER (when it fires) — on_being_hit is the reactive one', tally('trigger'));
show('EFFECT (what it does)', tally('effect'));
// the reactive share, plainly
const re = rows.filter((r) => r.trigger === 'on_being_hit');
console.log(`\nReactive ("when it is hit/touched/held"): ${re.length} of ${rows.length} (${Math.round(100 * re.length / rows.length)}%) — trait ${re.filter((r) => r.seat === 'trait').length}, action ${re.filter((r) => r.seat === 'action').length}`);
fs.writeFileSync(process.env.OUT, JSON.stringify(rows, null, 1));
