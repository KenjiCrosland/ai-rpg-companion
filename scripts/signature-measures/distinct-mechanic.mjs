// MEMORABILITY, measured the way the print survey defined it: one vivid mechanic
// no other monster in the set has. Per run: how many sheets carry a signature
// template that appears on NO other sheet in that run; distinct templates / rows.
import fs from 'node:fs'; import path from 'node:path';
for (const D of process.argv.slice(2)) {
  const per = {};
  for (const f of fs.readdirSync(D).filter((x) => /^\d.*\.md$/.test(x)).sort()) {
    const t = fs.readFileSync(path.join(D, f), 'utf8');
    per[f.slice(0, 2)] = [...t.matchAll(/signature (?:template(?: \(trait\))?|rider): ([a-z-]+) ->/g)].map((m) => m[1]);
  }
  const count = {}; for (const ids of Object.values(per)) for (const id of new Set(ids)) count[id] = (count[id] ?? 0) + 1;
  const sheets = Object.keys(per).length; const rows = Object.values(per).flat().length;
  const unique = Object.entries(per).filter(([, ids]) => ids.some((id) => count[id] === 1)).length;
  const repeated = Object.entries(count).filter(([, n]) => n > 1).map(([id, n]) => `${id}x${n}`).join(' ');
  console.log(`${path.basename(D).slice(0, 26).padEnd(28)} sheets ${sheets}  sig rows ${rows}  distinct ${Object.keys(count).length}  sheets with a UNIQUE mechanic ${unique}/${sheets}  repeated: ${repeated || '—'}`);
}
