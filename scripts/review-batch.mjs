#!/usr/bin/env node
// node --import ./scripts/alias-loader.mjs scripts/review-batch.mjs <run-dir> [--out <path>]
// THE CRITIC'S BATCH (owner's brief 2026-10-02): the full gate table, then six to
// eight blocks spanning it — the lowest and highest CR, one of each format, a print
// donor, a homebrew with a nova, one legendary, one marked soft — each with its
// checker row above the block and its trace below. The critic hand-derives against
// the checker rows, then reads for what predicates can't see.
import fs from 'node:fs';
import path from 'node:path';
import { checkBlock, checkTable, GATES } from '../src/tools/statblock-generator/reskin/checker.mjs';
const args = process.argv.slice(2); const dir = args.find((a) => !a.startsWith('--'));
if (!dir) { console.error('usage: node --import ./scripts/alias-loader.mjs scripts/review-batch.mjs <run-dir> [--out <path>]'); process.exit(2); }
const out = args.includes('--out') ? args[args.indexOf('--out') + 1] : path.join('scripts', 'smoke-evidence', `REVIEW-${path.basename(dir)}.md`);
// a block rendered from its saved JSON — used when the page capture is empty or shows the other edition (the 2014 goblin was the 2024 goblin; the green dragon's fence was empty — critic's audit 2026-10-02)
function renderFromJson(b) {
  if (b.type_and_alignment) {
    const sec = (label, es) => (es?.length ? `\n${label}\n${es.map((e) => `${e.name}: ${e.description ?? e.text ?? ''}`).join('\n')}` : '');
    return [b.name, b.type_and_alignment, `Armor Class ${b.armor_class}`, `Hit Points ${b.hit_points}`, `Speed ${b.speed}`, b.attributes, b.saving_throws ? `Saving Throws ${b.saving_throws}` : '', b.skills ? `Skills ${b.skills}` : '', b.damage_resistances ? `Damage Resistances ${b.damage_resistances}` : '', b.damage_immunities ? `Damage Immunities ${b.damage_immunities}` : '', b.condition_immunities ? `Condition Immunities ${b.condition_immunities}` : '', `Senses ${b.senses}`, `Languages ${b.languages}`, `Challenge ${b.challenge_rating}`, `Proficiency Bonus ${b.proficiency_bonus}`, sec('Traits', b.abilities), sec('Actions', b.actions), sec('Reactions', b.reactions), sec('Legendary Actions', b.legendary_actions)].filter(Boolean).join('\n');
  }
  const sec = (label, es) => (es?.length ? `\n${label}\n${es.map((e) => `${e.name}. ${e.text}`).join('\n')}` : '');
  return [b.name, `${b.size} ${b.type}, ${b.alignment}`, `AC ${b.ac}`, `HP ${b.hp} (${b.hp_formula})`, `Speed ${b.speed}`, ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].map((k) => `${k} ${b.stats?.[k]}`).join(' '), b.skills ? `Skills ${b.skills}` : '', b.resistances ? `Resistances ${b.resistances}` : '', b.immunities ? `Immunities ${b.immunities}` : '', `Senses ${b.senses}`, `Languages ${b.languages ?? 'None'}`, `CR ${b.cr_str ?? b.cr}`, ...['Traits', 'Actions', 'Bonus Actions', 'Reactions', 'Legendary Actions'].map((k) => sec(k, b.sections?.[k]))].filter(Boolean).join('\n');
}
const entries = [];
for (const f of fs.readdirSync(dir).filter((x) => /^\d+-.*\.json$/.test(x)).sort()) {
  const raw = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); const block = raw.monster ?? raw;
  const md = fs.readFileSync(path.join(dir, f.replace(/\.json$/, '.md')), 'utf8');
  const captured = (/### Block\n```\n([\s\S]*?)\n```/.exec(md) ?? [])[1] ?? '';
  const wrongEdition = block.type_and_alignment ? /Attack Roll:|\bAC \d+\n/.test(captured) : /Weapon Attack:|^Armor Class/m.test(captured);
  const text = captured.trim() && !wrongEdition ? captured : renderFromJson(block);
  const trace = (/### Trace\n```\n([\s\S]*?)\n```/.exec(md) ?? [])[1] ?? '';
  const input = (/\*\*Input:\*\* `(.*?)`/.exec(md) ?? [])[1] ?? '';
  const r = checkBlock(block);
  const m = r.edition === '2014' && block.other_edition ? block.other_edition : block;
  entries.push({ f, input, text, trace, r, print: /print canon: ".*" (?:heads on|is) the/.test(trace) || /print canon route/.test(trace), nova: (m.sections?.Actions ?? []).some((e) => /\((?:Recharge|\d\/Day)/.test(e.name ?? '') && /Saving Throw/.test(e.text ?? '')), legendary: !!(m.sections?.['Legendary Actions'] ?? []).length });
}
const results = entries.map((e) => e.r);
const pick = []; const take = (label, fn) => { const e = entries.find((x) => fn(x) && !pick.some((p) => p.e === x)); if (e) pick.push({ label, e }); };
const byCr = entries.slice().sort((a, b) => a.r.cr - b.r.cr);
take('lowest CR', (x) => x === byCr[0]); take('highest CR', (x) => x === byCr[byCr.length - 1]);
take('a 2014 sheet', (x) => x.r.edition === '2014'); take('a 2024 sheet', (x) => x.r.edition === '2024');
take('a print donor', (x) => x.print); take('a homebrew with a nova', (x) => !x.print && x.nova);
take('a legendary', (x) => x.legendary); take('one marked soft', (x) => x.r.softs.length && !x.r.fails.length);
for (const e of entries) if (e.r.gates.bands.status !== 'ok' && !pick.some((p) => p.e === e)) pick.push({ label: `bands ${e.r.gates.bands.status}`, e }); // the gate that started this: every block it flags is in the sample
// EVERY BLOCK, by default (the critic, 2026-10-13: "blocks are missing from the docs"): a reader reads sheets, not a sample of them. `--sample`
// restores the spanning subset for a run too large to read whole (the forty).
if (!args.includes('--sample')) for (const e of entries) if (!pick.some((p) => p.e === e)) pick.push({ label: 'in the run', e });
const rowFor = (r) => `| ${r.name} | ${r.cr}${r.edition === '2014' ? ' (2014)' : ''} | ${r.donor ?? '—'} | ${GATES.map((g) => (r.gates[g].status === 'ok' ? 'ok' : `${r.gates[g].status.toUpperCase()}: ${r.gates[g].findings.filter((f) => f.severity === r.gates[g].status).map((f) => f.rule).join(', ')}`)).join(' | ')} |`;
let md = `# Review batch — ${path.basename(dir)}\n\nThe checker ran first. The gate table covers every block in the run; ${args.includes('--sample') ? `the blocks below span it (${pick.map((p) => p.label).join(', ')})` : 'every block of the run follows'}. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.\n\n${checkTable(results, { title: 'Gate table — the whole run' })}\n`;
for (const { label, e } of pick) {
  const notes = GATES.flatMap((g) => e.r.gates[g].findings.filter((x) => x.severity !== 'ok').map((x) => `- ${g} · ${x.severity} · ${x.rule}: ${x.message}`));
  const read = e.r.read ? `- read: def ${e.r.read.def} / off ${e.r.read.off} → ${e.r.read.read}; sustained ${e.r.read.sustained} (${e.r.read.attacks} × ${e.r.read.used?.name ?? '?'}${e.r.read.legendary?.avg ? ` + legendary ${e.r.read.legendary.name}` : ''}); nova ${e.r.read.nova ? `${e.r.read.nova.name} ${e.r.read.nova.avg}` : 'none'}; dmg ${e.r.read.dmg.toFixed(0)}` : '';
  md += `\n\n---\n\n## ${e.r.name} — ${label}\n\n**Concept:** ${e.input}\n\n| block | CR | donor | ${GATES.join(' | ')} |\n|---|---|---|${GATES.map(() => '---').join('|')}|\n${rowFor(e.r)}\n\n${notes.join('\n') || '- clean'}\n${read}\n\n\`\`\`\n${e.text.trim()}\n\`\`\`\n\n**Engine trace**\n\n\`\`\`\n${e.trace.split('\n').filter((l) => /value check|signature|library seed|chassis nova|nova capped|print canon|^\[route\]|hp restored|removal|claim gate|cr from/.test(l)).join('\n')}\n\`\`\`\n`;
}
fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, md); console.log(`wrote ${out} (${pick.length} blocks)`);
