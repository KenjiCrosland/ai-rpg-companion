#!/usr/bin/env node
// node --import ./scripts/alias-loader.mjs scripts/check-run.mjs <run-dir> [--out <path>]
// The mechanics checker over a smoke run: one row per block, one column per gate.
import fs from 'node:fs';
import path from 'node:path';
import { checkBlock, checkTable, GATES } from '../src/tools/statblock-generator/reskin/checker.mjs';
const args = process.argv.slice(2); const dir = args.find((a) => !a.startsWith('--'));
if (!dir) { console.error('usage: node --import ./scripts/alias-loader.mjs scripts/check-run.mjs <run-dir> [--out <path>]'); process.exit(2); }
const out = args.includes('--out') ? args[args.indexOf('--out') + 1] : path.join('scripts', 'smoke-evidence', `CHECK-${path.basename(dir)}.md`);
const results = [];
for (const f of fs.readdirSync(dir).filter((x) => /^\d+-.*\.json$/.test(x)).sort()) {
  const raw = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); const block = raw.monster ?? raw;
  try { results.push({ file: f, ...checkBlock(block) }); } catch (e) { results.push({ file: f, name: f, cr: '?', edition: '?', donor: null, gates: Object.fromEntries(GATES.map((g) => [g, { status: 'soft', findings: [] }])), fails: [], softs: [], error: String(e?.message ?? e) }); }
}
let md = `# Mechanics check — ${path.basename(dir)}\n\n${checkTable(results, { title: 'Gate table' })}\n`;
for (const r of results) {
  const lines = GATES.flatMap((g) => r.gates[g].findings.filter((x) => x.severity !== 'ok').map((x) => `- ${g} · ${x.severity.toUpperCase()} · ${x.rule}: ${x.message}`));
  const floats = GATES.flatMap((g) => r.gates[g].findings.filter((x) => x.severity === 'ok').map((x) => `- ${g} · note · ${x.rule}: ${x.message}`));
  md += `\n## ${r.name} (CR ${r.cr}${r.edition === '2014' ? ', 2014' : ''})\n${r.error ? `- checker error: ${r.error}\n` : ''}${lines.join('\n') || '- clean'}\n${floats.length ? `${floats.join('\n')}\n` : ''}`;
  if (r.read) md += `- read: def ${r.read.def} / off ${r.read.off} → ${r.read.read}; sustained ${r.read.sustained} (${r.read.attacks} × ${r.read.used?.name ?? '?'}${r.read.legendary?.avg ? ` + legendary ${r.read.legendary.name}` : ''}); nova ${r.read.nova ? `${r.read.nova.name} ${r.read.nova.avg}` : 'none'}; dmg ${r.read.dmg.toFixed(0)}\n`;
}
fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, md); console.log(`wrote ${out}`);
console.log(`${results.filter((r) => r.fails.length).length} block(s) with a FAIL of ${results.length}`);
