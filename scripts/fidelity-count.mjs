// Hand-count aid for the fidelity baseline (step 1): for each block, print the user's clause list beside the sheet's header
// and rows with provenance, so coverage and concept share can be judged by eye. node scripts/fidelity-count.mjs <run-dir> <batch>
import fs from 'node:fs';
import path from 'node:path';
const [runDir, batchName = 'baseline-fidelity'] = process.argv.slice(2);
const batch = JSON.parse(fs.readFileSync(path.resolve('scripts/smoke-batches', `${batchName}.json`), 'utf8'));
const files = fs.readdirSync(runDir).filter((f) => f.endsWith('.json')).sort();
for (const f of files) {
  const n = Number(f.split('-')[0]); const entry = batch[n - 1]; if (!entry) continue;
  const m = JSON.parse(fs.readFileSync(path.join(runDir, f), 'utf8')); const b = m.statblock ?? m.block ?? m; const s = b.other_edition ?? b;
  const legacy = !!b.actions;
  const header = legacy ? `${b.name} | ${b.type_and_alignment} | ${b.speed} | AC ${b.armor_class} | HP ${b.hit_points} | ${b.languages}` : `${s.name} | ${s.size} ${s.type} | ${s.speed} | AC ${s.ac} | HP ${s.hp} | ${s.languages}`;
  const rows = legacy ? [...(b.abilities ?? []).map((r) => ['T', r]), ...(b.actions ?? []).map((r) => ['A', r]), ...(b.legendary_actions ?? []).map((r) => ['L', r])].map(([k, r]) => ({ k, name: r.name, text: r.description ?? '' }))
    : Object.entries(s.sections ?? {}).flatMap(([k, es]) => es.map((e) => ({ k: k[0], name: e.name, text: e.text ?? '', prov: e.print ? 'print' : e.library ? 'seed' : e.template ? 'template' : e.rules ? 'rules' : '' })));
  console.log(`\n## ${n}. ${entry.name || entry.description.slice(0, 60)} [${entry.shape}, ${entry.rules}, CR ${entry.cr || 'blank'}]`);
  console.log(`  CLAUSES (${entry.clauses.length}): ${entry.clauses.map((c, i) => `${i + 1}:${c}`).join(' | ')}`);
  console.log(`  HEADER: ${header}`);
  for (const r of rows) console.log(`  [${r.k}${r.prov ? ':' + r.prov : ''}] ${r.name} — ${r.text.replace(/\s+/g, ' ').slice(0, 110)}`);
}
