// REGRESSION CANARIES (owner, 2026-10-12): ten fixed blocks from the old smoke batches — single Name, description only, print
// heads, a 2014 sheet — run with every feature-branch landing to see that the NUMBERS are intact. Print-headed blocks must match
// the reference exactly (AC, HP, every attack's bonus and damage, every DC, the Multiattack count); routed blocks must hold the
// band (AC ±1, HP ±15%, bonuses ±1, damage ±25%, DCs ±1) because their chassis is the route's roll.
//   node scripts/canaries.mjs <run-dir>                     → the table against scripts/smoke-evidence/canaries-reference.json
//   node scripts/canaries.mjs <run-dir> --write-reference   → (re)baseline the reference from this run
import fs from 'node:fs';
import path from 'node:path';
//   node scripts/canaries.mjs <run-dir> --batch scripts/smoke-batches/features-2026-10.json --reference scripts/smoke-evidence/features-2026-10-reference.json
//                                                           → the same check over a frozen sprint feature batch with its own reference (close-out, 2026-10-12)
const argv = process.argv.slice(2); const opt = (k, d) => (argv.includes(k) ? argv[argv.indexOf(k) + 1] : d);
const runDir = argv.find((a) => !a.startsWith('--') && a !== opt('--batch') && a !== opt('--reference')); const flag = argv.includes('--write-reference') ? '--write-reference' : null;
const REF = opt('--reference', 'scripts/smoke-evidence/canaries-reference.json');
const batch = JSON.parse(fs.readFileSync(opt('--batch', 'scripts/smoke-batches/canaries.json'), 'utf8'));
const numbersOf = (m) => {
  const o0 = m.other_edition ?? m; const o = o0.english?.sections ? o0.english : o0; const rows = Object.entries(o.sections ?? {}).flatMap(([s, es]) => es.map((e) => ({ s, e }))); // a translated block (the German golem) is read on its English twin, stored by the translation call (canaries 2026-10-12)
  const atk = rows.filter(({ e }) => /Attack Roll/.test(e.text ?? '')).map(({ e }) => ({ name: String(e.name).replace(/ \(.*\)$/, ''), bonus: Number(/Attack Roll:\*? \+(\d+)/.exec(e.text)?.[1]), avg: Number(/(\d+) \(\d+d\d+/.exec(e.text)?.[1]) }));
  const dcs = [...new Set(rows.flatMap(({ e }) => [...String(e.text ?? '').matchAll(/(?<!escape )DC (\d+)/g)].map((x) => Number(x[1]))))].sort((a, b) => a - b);
  const ma = rows.find(({ e }) => /^Multiattack/.test(e.name ?? ''))?.e.text ?? '';
  const count = ({ one: 1, two: 2, three: 3, four: 4 }[(/makes (\w+)/.exec(ma) ?? [])[1]] ?? (ma ? null : 0));
  const untranslated = o0.english?.sections ? Object.values(o0.sections ?? {}).flat().filter((e, i) => String(e.text ?? '').trim() === String(Object.values(o0.english.sections ?? {}).flat()[i]?.text ?? '').trim()).length : null; // a translated block whose rows equal the twin's was echoed, not translated (the Steingolem shipped print's English — the critic's second species read)
  return { name: m.name ?? m.monsterName, cr: o.cr ?? o.cr_str, ac: Number(o.ac), hp: Number(o.hp), attacks: atk, dcs, multiattack: count, donor: o.generation?.donor ?? null, untranslated };
};
const files = fs.readdirSync(runDir).filter((f) => f.endsWith('.json')).sort((a, b) => Number(a.split('-')[0]) - Number(b.split('-')[0]));
const now = Object.fromEntries(files.map((f) => [Number(f.split('-')[0]), numbersOf(JSON.parse(fs.readFileSync(path.join(runDir, f), 'utf8')))]));
if (flag === '--write-reference') { fs.writeFileSync(REF, JSON.stringify({ engine: path.basename(runDir), blocks: now }, null, 2)); console.log(`reference written from ${runDir}: ${Object.keys(now).length} blocks`); process.exit(0); }
const ref = JSON.parse(fs.readFileSync(REF, 'utf8'));
const within = (a, b, tol, pct) => (Number.isFinite(a) && Number.isFinite(b) ? (pct ? Math.abs(a - b) <= Math.abs(b) * tol : Math.abs(a - b) <= tol) : a === b);
console.log(`| # | canary | mode | AC | HP | attacks (bonus/avg) | DCs | Multiattack | verdict |\n|---|---|---|---|---|---|---|---|---|`);
let moved = 0;
batch.forEach((c, i) => {
  const k = i + 1; const r = ref.blocks[k]; const n = now[k]; const exact = c.mode === 'exact'; c.canary = c.canary ?? `${c.group ? `${c.group}: ` : ''}${c.feature ?? c.name ?? c.description}`;
  if (!n) { console.log(`| ${k} | ${c.canary} | ${c.mode} | — | — | — | — | — | **MISSING** (no block saved) |`); moved += 1; return; }
  if (!r) { console.log(`| ${k} | ${c.canary} | ${c.mode} | ${n.ac} | ${n.hp} | ${n.attacks.map((a) => `${a.name} +${a.bonus}/${a.avg}`).join(', ')} | ${n.dcs.join(',')} | ${n.multiattack} | no reference |`); return; }
  const cmp = (a, b, tol, pct) => (exact ? a === b : within(a, b, tol, pct));
  const problems = [];
  if (n.untranslated) problems.push(`${n.untranslated} row(s) untranslated (echo of the English twin)`);
  if (!cmp(n.ac, r.ac, 1)) problems.push(`AC ${r.ac}→${n.ac}`);
  if (!cmp(n.hp, r.hp, 0.15, true)) problems.push(`HP ${r.hp}→${n.hp}`);
  if (exact ? n.multiattack !== r.multiattack : !within(n.multiattack, r.multiattack, 1)) problems.push(`Multiattack ${r.multiattack}→${n.multiattack}`);
  const byName = new Map(r.attacks.map((a) => [a.name, a]));
  for (const a of n.attacks) { const b = byName.get(a.name) ?? (exact ? null : r.attacks[0]); if (!b) { problems.push(`${a.name} is new`); continue; } if (!cmp(a.bonus, b.bonus, 1)) problems.push(`${a.name} +${b.bonus}→+${a.bonus}`); if (!cmp(a.avg, b.avg, 0.25, true)) problems.push(`${a.name} ${b.avg}→${a.avg}`); }
  for (const b of r.attacks) if (exact && !n.attacks.some((a) => a.name === b.name)) problems.push(`${b.name} missing`);
  if (exact ? n.dcs.join(',') !== r.dcs.join(',') : !n.dcs.every((d) => r.dcs.some((e) => Math.abs(d - e) <= 1))) problems.push(`DCs ${r.dcs.join(',')}→${n.dcs.join(',')}`);
  const flipped = !exact && r.donor && n.donor && r.donor !== n.donor; // a routed block's chassis is the route's roll: a different donor explains a moved band, it is not a regression
  if (problems.length && flipped) problems.unshift(`donor ${r.donor} → ${n.donor} (route roll)`);
  if (problems.length && !flipped) moved += 1;
  console.log(`| ${k} | ${c.canary} | ${c.mode} | ${n.ac} | ${n.hp} | ${n.attacks.map((a) => `${a.name} +${a.bonus}/${a.avg}`).join(', ')} | ${n.dcs.join(',')} | ${n.multiattack} | ${problems.length ? (flipped ? `band moved with the donor: ${problems.join('; ')}` : `**moved**: ${problems.join('; ')}`) : 'intact'} |`);
});
console.log(`\n**Canaries:** ${batch.length - moved} of ${batch.length} intact against the reference from \`${ref.engine}\`.`);
process.exit(moved ? 1 : 0);
