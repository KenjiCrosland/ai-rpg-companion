#!/usr/bin/env node
// node --import ./scripts/alias-loader.mjs scripts/check-run.mjs <run-dir> [--out <path>]
// The mechanics checker over a smoke run: one row per block, one column per gate.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { checkBlock, checkTable, GATES } from '../src/tools/statblock-generator/reskin/checker.mjs';
// FROZEN CLAUSE LISTS (critic's package-seven review, 2026-10-22). The clause
// extraction is an LLM call, so the same concept yields a different list run to
// run and two forties score against different denominators (Caustic Scythe 5 -> 4,
// Meshrin 7 -> 8 from the same words). The first time a concept is scored, its
// list is frozen here keyed by a hash of the concept text; later runs score
// against that list and any drift is REPORTED rather than silently moving the
// denominator. Delete an entry to re-freeze deliberately. Measurement only — the
// engine never reads this file.
const FREEZE = path.join('scripts', 'frozen-clauses.json');
const conceptHash = (t) => crypto.createHash('sha1').update(String(t ?? '').trim()).digest('hex').slice(0, 12);
const frozen = (() => { try { return JSON.parse(fs.readFileSync(FREEZE, 'utf8')); } catch { return {}; } })();
const drift = [];
const freezeFor = (block) => {
  const g = block?.generation ?? block?.other_edition?.generation ?? {};
  const concept = String(g.userConcept ?? '').trim();
  const live = g.clauses ?? null;
  if (!concept || !Array.isArray(live)) return null;
  const key = conceptHash(concept);
  const seen = frozen[key];
  if (!seen) { frozen[key] = { concept: concept.slice(0, 120), clauses: live }; return null; }
  // COMPARE WHAT THE DENOMINATOR DEPENDS ON, not just the text. The checker's
  // `listed` filter keys on `head` and `kind`, so a clause re-marked
  // descriptive -> mechanical moves the denominator with the clause COUNT
  // unchanged. Measured over the two forties: 0 of 39 concepts drifted by text,
  // but 4 of 39 drifted by marks — Caustic Scythe 5 -> 4 and Meshrin 7 -> 8 are
  // both re-markings, which is what the critic saw and what a text-only
  // comparison reported as "no drift".
  const shape = (c) => `${String(c?.text ?? c)}#${c?.kind ?? ''}#${c?.head ? 'H' : ''}#${c?.polarity ?? ''}`;
  const a = seen.clauses.map(shape).join('|');
  const b = live.map(shape).join('|');
  if (a !== b) {
    const marks = seen.clauses.length === live.length ? ' (same count — re-marked kind/head)' : '';
    drift.push(`${block.name}: ${seen.clauses.length} frozen vs ${live.length} this run${marks}`);
  }
  return seen.clauses;
};

const args = process.argv.slice(2); const dir = args.find((a) => !a.startsWith('--'));
if (!dir) { console.error('usage: node --import ./scripts/alias-loader.mjs scripts/check-run.mjs <run-dir> [--out <path>]'); process.exit(2); }
const out = args.includes('--out') ? args[args.indexOf('--out') + 1] : path.join('scripts', 'smoke-evidence', `CHECK-${path.basename(dir)}.md`);
const results = [];
for (const f of fs.readdirSync(dir).filter((x) => /^\d+-.*\.json$/.test(x)).sort()) {
  const raw = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); const block = raw.monster ?? raw;
  try { results.push({ file: f, ...checkBlock(block, { frozenClauses: freezeFor(block) ?? undefined }) }); } catch (e) { results.push({ file: f, name: f, cr: '?', edition: '?', donor: null, gates: Object.fromEntries(GATES.map((g) => [g, { status: 'soft', findings: [] }])), fails: [], softs: [], error: String(e?.message ?? e) }); }
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
// persist any newly frozen concepts, and SAY SO when a run's extraction drifted
// from the frozen list — the denominator stays put, the drift is visible
fs.writeFileSync(FREEZE, `${JSON.stringify(frozen, null, 1)}\n`);
if (drift.length) {
  console.log(`\n${drift.length} concept(s) whose extraction DRIFTED from the frozen list (scored against the frozen one):`);
  drift.forEach((d) => console.log(`  ${d}`));
} else {
  console.log(`clause lists: ${Object.keys(frozen).length} concept(s) frozen, no drift`);
}
