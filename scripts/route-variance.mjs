#!/usr/bin/env node
// ROUTE VARIANCE (the critic's third species read, 2026-10-13): the same prompt produced a defender at AC 18 and a grappler at AC 13 on
// consecutive runs. Replay the route call N times per prompt of a batch through the app's own client and tabulate the line chosen.
//   node scripts/route-variance.mjs <batch-name> [n=5]        → one row per prompt: the lines chosen and how often
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
const [batchName, nArg = '5'] = process.argv.slice(2);
if (!batchName) { console.error('usage: node scripts/route-variance.mjs <batch-name> [n]'); process.exit(2); }
const batch = JSON.parse(fs.readFileSync(`scripts/smoke-batches/${batchName}.json`, 'utf8'));
console.log(`| # | prompt | CR | lines chosen (${nArg} replays) | settled? |\n|---|---|---|---|---|`);
let unsettled = 0;
batch.forEach((c, i) => {
  const concept = c.name && c.description ? `${c.name} — ${c.description}` : (c.name || c.description || c.concept || '');
  const cr = String(c.cr ?? 'auto') === 'auto' ? '5' : String(c.cr);
  let out = '';
  try { out = execFileSync('node', ['scripts/smoke-replay-resolve.mjs', concept, cr, nArg, '--compact'], { encoding: 'utf8', timeout: 900000 }); } catch (e) { out = String(e.stdout ?? '') + String(e.stderr ?? ''); }
  // report the line AFTER any refusal beside the model's own first pick, so a prompt the engine rescued never reads as settled (the critic's fourth read)
  const rows = [...out.matchAll(/→ ([a-z0-9-]+|NONE) \| picks=([^|]*)/g)].map((m) => ({ final: m[1], pick: (/^([a-z][a-z0-9-]*)/.exec(m[2].trim()) ?? [, '?'])[1] }));
  const lines = rows.length ? rows.map((r) => (r.pick && r.pick !== r.final ? `${r.pick}→${r.final}` : r.final)) : [...out.matchAll(/→ ([a-z0-9-]+|NONE)/g)].map((m) => m[1]);
  const tally = {}; for (const l of lines) tally[l] = (tally[l] ?? 0) + 1;
  const settled = new Set(lines.map((l) => l.split('→').pop())).size <= 1 && lines.length > 0;
  if (!settled) unsettled += 1;
  console.log(`| ${i + 1} | ${concept.slice(0, 60)} | ${cr} | ${Object.entries(tally).map(([k, v]) => `${k} ×${v}`).join(', ') || '(no replies)'} | ${settled ? 'yes' : '**no**'} |`);
});
console.log(`\n**Route variance:** ${batch.length - unsettled} of ${batch.length} prompts settle on one line across ${nArg} replays.`);
