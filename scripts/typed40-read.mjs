// READ A TYPED FORTY THE WAY A GM WOULD.
//   node --import ./scripts/alias-loader.mjs scripts/typed40-read.mjs <run-dir>
// For each sheet: what was typed, what path the engine took, what it shipped (name / type /
// CR), whether the typed CR was honoured, and the gate's verdict — one line each, then the
// register split. The question is not "is it print" but "did the GM get what they asked for".
import fs from 'node:fs';
import path from 'node:path';
const D = process.argv[2]; if (!D) { console.error('usage: <run-dir>'); process.exit(2); }
const files = fs.readdirSync(D).filter((f) => /^\d\d-.*\.md$/.test(f)).sort();
const check = fs.existsSync(`scripts/smoke-evidence/CHECK-${path.basename(D)}.md`) ? fs.readFileSync(`scripts/smoke-evidence/CHECK-${path.basename(D)}.md`, 'utf8') : '';
const crNum = (m) => Number.isFinite(Number(m.cr)) ? Number(m.cr) : Number(String(m.challenge_rating ?? m.cr_str ?? '').replace(/\s.*$/, '').replace('1/2', '0.5').replace('1/4', '0.25'));
const tally = { paths: {}, crHonoured: 0, crGiven: 0, nonSrd: [], empty: 0, fails: 0 };
for (const f of files) {
  const md = fs.readFileSync(`${D}/${f}`, 'utf8'); const idx = f.slice(0, 2);
  const input = (md.match(/\*\*Input:\*\* `([^`]*)`/) ?? [, '?'])[1];
  const jf = f.replace(/\.md$/, '.json'); const m = fs.existsSync(`${D}/${jf}`) ? JSON.parse(fs.readFileSync(`${D}/${jf}`, 'utf8')) : null;
  if (!m) { tally.empty++; console.log(`${idx}  "${input.slice(0, 60)}"  -> NO SHEET`); continue; }
  const sh = m.other_edition ?? m;
  const pathD = (md.match(/\[path\] decides: (\w+)(?: on the ([A-Z][\w' -]+?))?(?: ·|,| \(|$)/m) ?? []);
  const route = (md.match(/\[route\] ([a-z-]+)(?: \([a-z]+\))? type=(\w+)/) ?? []); // caster lines carry a parenthetical role
  const typedCr = (input.match(/\bcr[: ]+(\d+|auto)/i) ?? [])[1] ?? null;
  const gotCr = crNum(m);
  const readCr = (md.match(/read: def \d+ \/ off \d+ → ([\d.]+)/) ?? [])[1];
  const verdict = (check.split('\n').find((l) => l.startsWith(`| ${m.name} |`)) ?? '').split('|')[15]?.trim() ?? '';
  const type = m.type ?? sh.type ?? '';
  tally.paths[pathD[1] ?? 'none'] = (tally.paths[pathD[1] ?? 'none'] ?? 0) + 1;
  if (verdict.startsWith('FAIL')) tally.fails++;
  if (/beholder|mind flayer|displacer/i.test(input)) tally.nonSrd.push(`${idx} "${input.slice(0, 30)}" -> ${pathD[1] ?? '?'}${pathD[2] ? ` on ${pathD[2]}` : ''} / ${type} / ${m.name}`);
  console.log(`${idx}  "${input.slice(0, 58).padEnd(58)}"  path=${(pathD[1] ?? '?').padEnd(9)}${pathD[2] ? `(${pathD[2].slice(0, 14)}) ` : ''.padEnd(17)} route=${(route[1] ?? '?').padEnd(18)} -> "${String(m.name).slice(0, 26)}" ${type.slice(0, 22)} CR ${gotCr}${readCr ? ` (reads ${readCr})` : ''} ${verdict}`);
}
console.log(`\nsheets: ${files.length} | no sheet: ${tally.empty} | FAIL verdicts: ${tally.fails}`);
console.log('paths:', JSON.stringify(tally.paths));
console.log('non-SRD names:'); tally.nonSrd.forEach((x) => console.log('  ', x));
