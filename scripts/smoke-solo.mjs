/**
 * Single-sided review doc — NOT part of the test suite. One run dir → one
 * markdown file: per block, the concept, the card as captured, and the
 * engine's own value-check lines so a reviewer can audit the balance rules
 * against the numbers the engine used. Validated like smoke-pair: a block
 * without an Actions section fails the build.
 * Usage: node scripts/smoke-solo.mjs <run-dir> [--out <path>]
 */
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
const args = process.argv.slice(2);
const dir = args.find((a) => !a.startsWith('--'));
const out = args.includes('--out') ? args[args.indexOf('--out') + 1] : `scripts/smoke-evidence/SOLO-${path.basename(dir)}.md`;
// a captured block has an Actions section in EITHER edition's grammar — 2014 prints "Melee Weapon Attack:" and "must succeed on a … saving throw" (a 2014 swarm with a single weapon row was refused as "no Actions section captured", release smoke 2026-10-02)
function renderFromJson(b) {
  if (b.type_and_alignment) {
    const sec = (label, es) => (es?.length ? `\n${label}\n${es.map((e) => `${e.name}: ${e.description ?? e.text ?? ''}`).join('\n')}` : '');
    return [b.name, b.type_and_alignment, `Armor Class ${b.armor_class}`, `Hit Points ${b.hit_points}`, `Speed ${b.speed}`, b.attributes, b.saving_throws ? `Saving Throws ${b.saving_throws}` : '', b.skills ? `Skills ${b.skills}` : '', b.damage_resistances ? `Damage Resistances ${b.damage_resistances}` : '', b.damage_immunities ? `Damage Immunities ${b.damage_immunities}` : '', b.condition_immunities ? `Condition Immunities ${b.condition_immunities}` : '', `Senses ${b.senses}`, `Languages ${b.languages}`, `Challenge ${b.challenge_rating}`, `Proficiency Bonus ${b.proficiency_bonus}`, sec('Traits', b.abilities), sec('Actions', b.actions), sec('Reactions', b.reactions), sec('Legendary Actions', b.legendary_actions)].filter(Boolean).join('\n');
  }
  const sec = (label, es) => (es?.length ? `\n${label}\n${es.map((e) => `${e.name}. ${e.text}`).join('\n')}` : '');
  return [b.name, `${b.size} ${b.type}, ${b.alignment}`, `AC ${b.ac}`, `HP ${b.hp} (${b.hp_formula})`, `Speed ${b.speed}`, ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].map((k) => `${k} ${b.stats?.[k]}`).join(' '), b.skills ? `Skills ${b.skills}` : '', b.resistances ? `Resistances ${b.resistances}` : '', b.immunities ? `Immunities ${b.immunities}` : '', `Senses ${b.senses}`, `Languages ${b.languages ?? 'None'}`, `CR ${b.cr_str ?? b.cr}`, ...['Traits', 'Actions', 'Bonus Actions', 'Reactions', 'Legendary Actions'].map((k) => sec(k, b.sections?.[k]))].filter(Boolean).join('\n');
}
const hasActions = (b) => /\bActions\b/.test(b) && /Attack Roll|Saving Throw|(?:Weapon|Spell) Attack:|saving throw/.test(b);
let doc = `# Signature-slot review — single run, no comparison\n\nRun: \`${path.basename(dir)}\`. Each block is followed by the engine's own value-check lines (expected value vs floor, what the ladder did) and the signature trace, so the balance rules can be checked against the numbers rather than by eye. Blocks are unedited captures.\n`;
// THE CHECKER RUNS FIRST (owner's brief 2026-10-02): its gate table heads the doc,
// and a block with a FAIL gets no concept read — the numbers come before the prose.
const checkPath = path.join('scripts', 'smoke-evidence', `CHECK-${path.basename(dir)}.md`);
let checkTable = ''; const failed = new Set();
try {
  execFileSync(process.execPath, ['--import', './scripts/alias-loader.mjs', 'scripts/check-run.mjs', dir, '--out', checkPath], { stdio: 'pipe' });
  const check = fs.readFileSync(checkPath, 'utf8');
  checkTable = (/## Gate table\n[\s\S]*?\*\*Fails by seat and gate:\*\*\n(?:- [^\n]*\n?)+/.exec(check) ?? [''])[0];
  for (const row of check.split('\n')) { const m = /^\| (.+?) \| .* \| FAIL \(\d+\) \|$/.exec(row); if (m) failed.add(m[1].trim()); }
} catch (e) { checkTable = `_(checker did not run: ${String(e?.message ?? e).split('\n')[0]})_`; }
doc += `\n\n${checkTable}\n\nFull findings per block: \`${path.basename(checkPath)}\`. Blocks marked FAIL are listed below without a concept read.\n`;
const problems = [];
for (const f of fs.readdirSync(dir).filter((x) => /^\d+-.*\.md$/.test(x)).sort()) {
  const md = fs.readFileSync(path.join(dir, f), 'utf8');
  const input = (/\*\*Input:\*\* `(.*?)`/.exec(md) ?? [])[1] ?? '';
  const captured = (/### Block\n```\n([\s\S]*?)\n```/.exec(md) ?? [])[1] ?? '';
  // the saved JSON is the sheet; the page capture can be empty or show the other edition (critic's audit 2026-10-02)
  let block = captured; try {
    const jp = path.join(dir, f.replace(/\.md$/, '.json')); if (fs.existsSync(jp)) { const raw = JSON.parse(fs.readFileSync(jp, 'utf8')); const b = raw.monster ?? raw;
      const wrongEdition = b.type_and_alignment ? /Attack Roll:|\bAC \d+\n/.test(captured) : /Weapon Attack:|^Armor Class/m.test(captured);
      if (!captured.trim() || wrongEdition) block = renderFromJson(b); }
  } catch { /* the capture stands */ }
  const trace = (/### Trace\n```\n([\s\S]*?)\n```/.exec(md) ?? [])[1] ?? '';
  if (!block) { doc += `\n\n---\n\n## ${f.replace(/^\d+-|\.md$/g, '')}\n\n**Concept:** ${input}\n\n_(no block — the generation did not complete; see the run's trace)_\n`; continue; } // a missing capture is noted, a truncated one refuses
  if (/TIMED OUT \/ no save/.test(md)) { doc += `\n\n---\n\n## ${f.replace(/^\d+-|\.md$/g, '')}\n\n**Concept:** ${input}\n\n_(no block — the generation timed out at the provider; see the run's trace)_\n`; continue; } // a provider timeout is noted, never a refusal (the dragon turtle, 2026-10-02)
  if (!hasActions(block)) { problems.push(`${f}: no Actions section captured`); continue; }
  const blockName = (block.trim().split('\n')[0] ?? '').trim();
  if (failed.has(blockName)) { doc += `\n\n---\n\n## ${f.replace(/^\d+-|\.md$/g, '')}\n\n**Concept:** ${input}\n\n_(FAIL on the gate table — no concept read; see the checker's findings)_\n`; continue; }
  const lines = trace.split('\n').filter((l) => /value check|signature template|signature rider|library seed drawn|signature miss|^\[route\]|row superseded|trait renamed|chassis nova|nova geometry|nova capped|nova declined|print canon|trait bound|trait declined|energy withheld|movement owed|rename reverted|trait stripped|removal clauses|pi alias|pi guard|floating-orb overlay|imposed nova|fit declined|rider declined|fallback stands down|cr from|edition directive|output-language/.test(l)).map((l) => l.replace(/^\[reskin\] /, ''));
  doc += `\n\n---\n\n## ${f.replace(/^\d+-|\.md$/g, '')}\n\n**Concept:** ${input}\n\n\`\`\`\n${block.trim()}\n\`\`\`\n\n**Engine trace**\n\n\`\`\`\n${lines.join('\n')}\n\`\`\`\n`;
}
if (problems.length) { console.error('REFUSING TO WRITE:\n  ' + problems.join('\n  ')); process.exit(1); }
fs.writeFileSync(out, doc); console.log(`wrote ${out}`);
