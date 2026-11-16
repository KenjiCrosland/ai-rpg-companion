// HOW DOES PRINT BALANCE A LOW-CR NOVA AGAINST A HIGH-CR ONE? (owner, 2026-10-27)
// Not "how big is the number" — what else moves with CR: the area it covers, the
// gate it sits behind, how much of the block's own round it represents, and what
// other action economy the block has to compete with it.
import CORPUS from '@/data/srd52-monsters.json';

const WORD = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
const GATED = /\((?:Recharge [\d–-]+|\d\/Day)\)/;
const bare = (n) => String(n ?? '').replace(/\s*\(.*\)$/, '').trim();
// ALTERNATIVE DAMAGE IS NOT EXTRA DAMAGE. Print's swarm idiom reads "24 (6d6 + 3)
// Piercing damage, or 12 (2d8 + 3) Piercing damage if the swarm is Bloodied" —
// summing both read a CR-3 swarm at 41 where it deals 24, putting it over the
// band. Everything after an "or" that introduces a second damage expression is
// an alternative, so only the head counts.
const avg = (t) => [...String(t ?? '').split(/\bor\s+(?=\d+ \()/)[0].matchAll(/(\d+) \(\d+d\d+(?: [+-] \d+)?\)/g)].reduce((s, m) => s + Number(m[1]), 0);
const rows = (c) => Object.entries(c.sections ?? {}).flatMap(([sec, es]) => (es ?? []).filter(Boolean).map((e) => ({ sec, ...e })));

const out = [];
for (const c of (Array.isArray(CORPUS) ? CORPUS : Object.values(CORPUS).flat())) {
  const rs = rows(c);
  const ma = rs.find((e) => /^Multiattack/.test(e.name ?? ''));
  let round = 0, atks = 0;
  if (ma) for (const m of String(ma.text).matchAll(/(\w+) ([A-Z][\w' -]*?) attacks?\b/g)) {
    const n = WORD[m[1].toLowerCase()] ?? Number(m[1]);
    const r = rs.find((e) => bare(e.name) === m[2].trim());
    if (n && r && avg(r.text)) { round += n * avg(r.text); atks += n; }
  }
  const legendary = rs.some((e) => e.sec === 'Legendary Actions');
  for (const e of rs) {
    if (!GATED.test(e.name ?? '')) continue;
    const a = avg(e.text); if (!a) continue;
    const shape = (/(\d+)-foot (Cone|Line|Emanation|Sphere|radius)/i.exec(e.text) ?? []);
    out.push({
      cr: Number(c.cr), mon: c.name, nova: bare(e.name), a, round, atks, legendary,
      gate: /Recharge/.test(e.name) ? 'Recharge' : '1-2/Day',
      size: shape[1] ? Number(shape[1]) : null, geom: shape[2] ?? (/each creature/i.test(e.text) ? 'area(unsized)' : 'single'),
      save: /Saving Throw/.test(e.text),
    });
  }
}

const band = (cr) => (cr <= 4 ? 'CR 0-4' : cr <= 10 ? 'CR 5-10' : cr <= 16 ? 'CR 11-16' : 'CR 17+');
const groups = {};
for (const x of out) (groups[band(x.cr)] ??= []).push(x);
const med = (v) => (v.length ? v.slice().sort((a, b) => a - b)[Math.floor(v.length / 2)] : null);

console.log(`${out.length} gated damage rows in print.\n`);
console.log('band       n   nova dmg  round  ratio   area ft  attacks  Recharge  has Legendary');
for (const [b, g] of Object.entries(groups)) {
  const withRound = g.filter((x) => x.round);
  console.log(
    b.padEnd(11) + String(g.length).padEnd(4)
    + String(med(g.map((x) => x.a))).padEnd(10)
    + String(med(withRound.map((x) => x.round)) ?? '—').padEnd(7)
    + (withRound.length ? (med(withRound.map((x) => x.a / x.round))).toFixed(2) + 'x' : '—').padEnd(8)
    + String(med(g.filter((x) => x.size).map((x) => x.size)) ?? '—').padEnd(9)
    + String(med(withRound.map((x) => x.atks)) ?? '—').padEnd(9)
    + `${Math.round((100 * g.filter((x) => x.gate === 'Recharge').length) / g.length)}%`.padEnd(10)
    + `${Math.round((100 * g.filter((x) => x.legendary).length) / g.length)}%`,
  );
}
console.log('\nthe spread INSIDE each band (ratio min → max), which is the variance question:');
for (const [b, g] of Object.entries(groups)) {
  const r = g.filter((x) => x.round).map((x) => x.a / x.round).sort((a, b2) => a - b2);
  if (r.length) console.log(`  ${b.padEnd(11)} ${r[0].toFixed(2)}x → ${r[r.length - 1].toFixed(2)}x   (n=${r.length})`);
}
console.log('\ngeometry by band:');
for (const [b, g] of Object.entries(groups)) {
  const t = {}; for (const x of g) t[x.geom] = (t[x.geom] ?? 0) + 1;
  console.log(`  ${b.padEnd(11)} ${Object.entries(t).sort((a, b2) => b2[1] - a[1]).map(([k, n]) => `${k} ${n}`).join(', ')}`);
}
