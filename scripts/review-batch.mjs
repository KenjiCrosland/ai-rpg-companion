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
// THE FALLBACK IS NOT THE PRODUCT (critic's hold 6, 2026-10-16). It read the
// 2014 Oathbroken Marshal as missing its "can take 3 legendary actions"
// preamble and carrying a "Traits" heading 2014 does not use. Both were THIS
// function: the browser capture came back empty (the run logged
// ERR_NETWORK_IO_SUSPENDED on that block), so the sheet in the doc was drawn
// from JSON by a renderer that laid 2014 data out in 2024 furniture. The
// product's 2014 card renders the preamble — three runs the same day captured
// it live. So the legacy branch now matches Statblock.vue, and every
// substituted sheet says so in the fence.
// Mirrors Statblock.vue's legendaryOwnerName so the preamble reads identically.
function legendaryOwner(b) {
  const name = String(b.name ?? '').trim().replace(/^the\s+/i, '');
  const epithet = /^([A-Z][\w'-]+)\s+(?:the|of)\s+/.exec(name);
  if (epithet) return epithet[1];
  const inline = String(b.inline ?? '').trim();
  if (inline) return inline.charAt(0).toUpperCase() + inline.slice(1);
  return name ? `The ${name.toLowerCase()}` : 'The monster';
}

function renderFromJson(b) {
  if (b.type_and_alignment) {
    const sec = (label, es) => (es?.length ? `\n${label}\n${es.map((e) => `${e.name}: ${e.description ?? e.text ?? ''}`).join('\n')}` : '');
    // 2014 lays traits out unlabeled under the rule line — no heading — and
    // prints the legendary preamble above the options.
    const traits = b.abilities?.length ? `\n${b.abilities.map((e) => `${e.name}: ${e.description ?? e.text ?? ''}`).join('\n')}` : '';
    const leg = b.legendary_actions?.length
      ? `\nLegendary Actions\n${legendaryOwner(b)} can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. ${legendaryOwner(b)} regains spent legendary actions at the start of its turn.\n${b.legendary_actions.map((e) => `${e.name}: ${e.description ?? e.text ?? ''}`).join('\n')}`
      : '';
    return [b.name, b.type_and_alignment, `Armor Class ${b.armor_class}`, `Hit Points ${b.hit_points}`, `Speed ${b.speed}`, b.attributes, b.saving_throws ? `Saving Throws ${b.saving_throws}` : '', b.skills ? `Skills ${b.skills}` : '', b.damage_resistances ? `Damage Resistances ${b.damage_resistances}` : '', b.damage_immunities ? `Damage Immunities ${b.damage_immunities}` : '', b.condition_immunities ? `Condition Immunities ${b.condition_immunities}` : '', `Senses ${b.senses}`, `Languages ${b.languages}`, `Challenge ${b.challenge_rating}`, `Proficiency Bonus ${b.proficiency_bonus}`, traits, sec('Actions', b.actions), sec('Reactions', b.reactions), leg].filter(Boolean).join('\n');
  }
  const sec = (label, es) => (es?.length ? `\n${label}\n${es.map((e) => `${e.name}. ${e.text}`).join('\n')}` : '');
  return [b.name, `${b.size} ${b.type}, ${b.alignment}`, `AC ${b.ac}`, `HP ${b.hp} (${b.hp_formula})`, `Speed ${b.speed}`, ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].map((k) => `${k} ${b.stats?.[k]}`).join(' '), b.skills ? `Skills ${b.skills}` : '', b.resistances ? `Resistances ${b.resistances}` : '', b.immunities ? `Immunities ${b.immunities}` : '', `Senses ${b.senses}`, `Languages ${b.languages ?? 'None'}`, `CR ${b.cr_str ?? b.cr}`, ...['Traits', 'Actions', 'Bonus Actions', 'Reactions', 'Legendary Actions'].map((k) => sec(k, b.sections?.[k]))].filter(Boolean).join('\n');
}
// A WHITELIST HIDES EVERY RECEIPT IT WAS NOT WRITTEN FOR (critic, 2026-10-16).
// The trace was filtered to a fixed list of line prefixes — value check,
// signature, library seed, print canon, class kit, a dozen more — so every
// receipt this branch added was invisible in the review doc while sitting in
// the run's own .md all along. It cost the critic three findings in one read:
// "the polarity answer isn't in Ordric's trace" (four `lacks` lines, all
// dropped), "it logs print canon row: Actions/Spellcasting for a row the sheet
// doesn't carry" (the `lacks clause: Actions/"Spellcasting" leaves` line that
// answers it, dropped), and most of hold 6. A trace exists to be read, so it
// is kept whole and only known noise is dropped — a new receipt is visible by
// default, which is the only way this cannot happen again. Whole traces cost
// about 48 lines a block (214KB across a 14-block run before this trim).
const TRACE_NOISE = /^\s*```\s*$|^\[reskin\] (?:lint|audit|done|seats|features):/;

// WHERE EVERY ROW CAME FROM (critic's hold 3, 2026-10-16: "provenance for print
// rows, renamed chassis rows and signature binds"). The engine has stamped this
// on the rows all along — print, printNamed, template, seed, library, kit,
// boundKeys, authored, part, feature — and the review doc printed none of it, so
// a reader could not tell print's own row from a bind from a draw without
// reverse-engineering the trace. One line per row, in sheet order.
function provenanceOf(b) {
  const rows = [];
  for (const [sec, es] of Object.entries(b.sections ?? {})) for (const e of es) {
    const bits = [];
    if (e.print) bits.push(`print's own row${e.printNamed ? ', renamed' : ''}`);
    else if (e.printNamed) bits.push('print\'s row, renamed');
    if (e.template) bits.push(`template ${e.template}`);
    if (e.seed && e.seed !== e.template) bits.push(`library seed ${e.seed}`);
    else if (e.library && !e.seed) bits.push('library draw (seed unstamped)');
    if (e.kit) bits.push(`${e.kit} kit`);
    if (e.authored) bits.push('authored for this sheet');
    if (e.part) bits.push('a named part');
    if (e.feature) bits.push('a declared feature');
    if (e.clause) bits.push(`the GM's clause "${e.clause}"`);
    if (e.boundKeys?.length) bits.push(`binds the GM's words: ${e.boundKeys.join('+')}`);
    if (e.weapon) bits.push(`weapon ${e.weapon}`);
    if (e.energy) bits.push(`energy ${e.energy}`);
    if (!bits.length) bits.push('the chassis');
    rows.push(`- ${sec}/${String(e.name).replace(/ \(.*\)$/, '')} — ${bits.join('; ')}`);
  }
  return rows.join('\n');
}

const entries = [];
for (const f of fs.readdirSync(dir).filter((x) => /^\d+-.*\.json$/.test(x)).sort()) {
  const raw = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); const block = raw.monster ?? raw;
  const md = fs.readFileSync(path.join(dir, f.replace(/\.json$/, '.md')), 'utf8');
  const captured = (/### Block\n```\n([\s\S]*?)\n```/.exec(md) ?? [])[1] ?? '';
  const wrongEdition = block.type_and_alignment ? /Attack Roll:|\bAC \d+\n/.test(captured) : /Weapon Attack:|^Armor Class/m.test(captured);
  // A substituted sheet is labelled. Unlabelled, it reads as what the user saw.
  const substituted = !captured.trim() || wrongEdition;
  const text = substituted
    ? `(not the page capture — ${captured.trim() ? 'the card showed the other edition' : 'the card capture came back empty'}; drawn from the saved JSON)\n${renderFromJson(block)}`
    : captured;
  const trace = (/### Trace\n```\n([\s\S]*?)\n```/.exec(md) ?? [])[1] ?? '';
  // THE RE-ROLL GOES IN THE DOC (critic, 2026-10-14: "§2 says the runner prints
  // before, after and provenance, but none of it is in the blocks"). The runner
  // writes it per block; the review carried only the card and the gates.
  const reroll = (/### Re-roll[^\n]*\n```\n([\s\S]*?)\n```/.exec(md) ?? [])[1] ?? '';
  const input = (/\*\*Input:\*\* `(.*?)`/.exec(md) ?? [])[1] ?? '';
  const r = checkBlock(block);
  // DEGRADED MODE IS PART OF THE VERDICT (critic C4): a block generated while
  // the primary provider was failing had its validation gates relaxed, so its
  // "clean" means less. The engine stamps it; the table says so.
  if (block.generation?.degraded === true) r.degraded = true;
  // 1g: seed share per block, so the sameness metric is a column and not a hunt
  if (Number.isFinite(block.generation?.signature_rows)) { r.sigRows = block.generation.signature_rows; r.seedRows = block.generation.seed_rows ?? 0; }
  const m = r.edition === '2014' && block.other_edition ? block.other_edition : block;
  const provenance = provenanceOf(m); // m is already the edition the sheet shipped in
  entries.push({ f, input, text, trace, reroll, provenance, r, print: /print canon: ".*" (?:heads on|is) the/.test(trace) || /print canon route/.test(trace), nova: (m.sections?.Actions ?? []).some((e) => /\((?:Recharge|\d\/Day)/.test(e.name ?? '') && /Saving Throw/.test(e.text ?? '')), legendary: !!(m.sections?.['Legendary Actions'] ?? []).length });
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
const rowFor = (r) => `| ${r.name}${r.degraded ? ' ⚠︎degraded' : ''}${r.seedRows ? ` [seed ${r.seedRows}/${r.sigRows}]` : ''} | ${r.cr}${r.edition === '2014' ? ' (2014)' : ''} | ${r.donor ?? '—'} | ${GATES.map((g) => (r.gates[g].status === 'ok' ? 'ok' : `${r.gates[g].status.toUpperCase()}: ${r.gates[g].findings.filter((f) => f.severity === r.gates[g].status).map((f) => f.rule).join(', ')}`)).join(' | ')} |`;
let md = `# Review batch — ${path.basename(dir)}\n\nThe checker ran first. The gate table covers every block in the run; ${args.includes('--sample') ? `the blocks below span it (${pick.map((p) => p.label).join(', ')})` : 'every block of the run follows'}. Each block carries its checker row above and its engine trace below. Hand-derive against the row first; then read for what predicates can't see.\n\n${checkTable(results, { title: 'Gate table — the whole run' })}\n`;
for (const { label, e } of pick) {
  const notes = GATES.flatMap((g) => e.r.gates[g].findings.filter((x) => x.severity !== 'ok').map((x) => `- ${g} · ${x.severity} · ${x.rule}: ${x.message}`));
  const read = e.r.read ? `- read: def ${e.r.read.def} / off ${e.r.read.off} → ${e.r.read.read}; sustained ${e.r.read.sustained} (${e.r.read.attacks} × ${e.r.read.used?.name ?? '?'}${e.r.read.legendary?.avg ? ` + legendary ${e.r.read.legendary.name}` : ''}); nova ${e.r.read.nova ? `${e.r.read.nova.name} ${e.r.read.nova.avg}` : 'none'}; dmg ${e.r.read.dmg.toFixed(0)}` : '';
  // THE DROPPED CLAUSE'S TEXT, not just its count (critic's process ask,
  // 2026-10-14: "Vaelrix 1/2, Karrow 1/2 and Hollow Warden 1/2 can't be read
  // from the sheets. A clause list removes the guessing.")
  const dropped = (e.r.fidelity?.dropped ?? []).map((t) => `- **dropped clause:** "${String(t).trim()}"`).join('\n');
  md += `\n\n---\n\n## ${e.r.name} — ${label}\n\n**Concept:** ${e.input}\n\n| block | CR | donor | ${GATES.join(' | ')} |\n|---|---|---|${GATES.map(() => '---').join('|')}|\n${rowFor(e.r)}\n\n${notes.join('\n') || '- clean'}\n${dropped ? `${dropped}\n` : ''}${read}\n\n\`\`\`\n${e.text.trim()}\n\`\`\`\n\n**Where each row came from**\n\n${e.provenance || '- (no rows)'}\n\n**Engine trace**\n\n\`\`\`\n${e.trace.split('\n').filter((l) => !TRACE_NOISE.test(l)).join('\n')}\n\`\`\`\n${e.reroll ? `\n**Re-roll — one entry, replaced**\n\n\`\`\`\n${e.reroll}\n\`\`\`\n` : ''}`;
}
fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, md); console.log(`wrote ${out} (${pick.length} blocks)`);
