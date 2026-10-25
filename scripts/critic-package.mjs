// Build a critic package from one or more smoke runs: the blocks ONLY, no brief.
//   node scripts/critic-package.mjs <out.md> <run-dir> [<run-dir> ...]
// RENDERS FROM THE SAVED JSON, never from the .md's on-screen capture. The smoke's
// block text is allInnerTexts() of the ACTIVE card, and the tool sorts a folder by
// CR — so two same-name same-CR sheets leave run #1's card active and run #2's .md
// shows run #1's block (horseman2 2026-10-25: JSONs differed, .md blocks identical).
// Keyed by run+index, never by name; byte-identical blocks fail loudly.
import fs from 'node:fs'; import path from 'node:path';
const [out, ...dirs] = process.argv.slice(2);
if (!out || !dirs.length) { console.error('usage: node scripts/critic-package.mjs <out.md> <run-dir>...'); process.exit(1); }
const rowsOf = (m) => {
  const o = [];
  for (const [sec, es] of Object.entries(m.sections ?? {})) for (const e of (es ?? [])) if (e) o.push([sec, e]);
  for (const [k, sec] of [['abilities', 'Traits'], ['actions', 'Actions'], ['bonus_actions', 'Bonus Actions'], ['reactions', 'Reactions'], ['legendary_actions', 'Legendary Actions']])
    for (const e of (m[k] ?? [])) if (e && typeof e === 'object') o.push([sec, e]);
  return o;
};
const stat = (m, k) => (m.stats?.[k] ?? m.attributes?.match(new RegExp(`${k}\\s+(\\d+)`))?.[1] ?? '?');
const render = (m) => {
  const L = [m.name, `${m.size ?? ''} ${m.type ?? m.type_and_alignment ?? ''}${m.alignment ? ', ' + m.alignment : ''}`.trim(),
    `AC ${m.ac ?? m.armor_class ?? '?'}   HP ${m.hp ?? m.hit_points ?? '?'}${m.hp_formula ? ` (${m.hp_formula})` : ''}   Speed ${m.speed ?? '?'}`,
    `STR ${stat(m,'STR')}  DEX ${stat(m,'DEX')}  CON ${stat(m,'CON')}  INT ${stat(m,'INT')}  WIS ${stat(m,'WIS')}  CHA ${stat(m,'CHA')}`,
    `CR ${m.cr ?? m.challenge_rating ?? '?'}${m.format ? `   [${m.format} rules]` : ''}`, ''];
  let cur = null;
  for (const [sec, e] of rowsOf(m)) { if (sec !== cur) { L.push(`${sec}`); cur = sec; } L.push(`  ${e.name}. ${String(e.text ?? e.description ?? '').replace(/\*/g, '')}`); }
  return L.join('\n');
};
const seen = new Map(); const parts = [];
for (const dir of dirs) for (const f of fs.readdirSync(dir).filter((x) => /^\d+-.*\.json$/.test(x)).sort()) {
  const n = f.slice(0, f.indexOf('-')); const key = `${path.basename(dir)}#${n}`;
  const m = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  const block = render(m); const sig = block.replace(/\s+/g, ' ');
  if (seen.has(sig)) { console.error(`DUPLICATE CONTENT: ${key} is identical to ${seen.get(sig)} — refusing to write a short package`); process.exit(3); }
  seen.set(sig, key);
  const md = fs.existsSync(path.join(dir, f.replace(/\.json$/, '.md'))) ? fs.readFileSync(path.join(dir, f.replace(/\.json$/, '.md')), 'utf8') : '';
  const input = /\*\*Input:\*\* `([^`]*)`/.exec(md)?.[1] ?? '';
  parts.push(`## ${key} — ${m.name}\n\n**Input:** \`${input}\`\n\n\`\`\`\n${block}\n\`\`\`\n`);
}
fs.writeFileSync(out, `# Blocks for review\n\n${parts.length} blocks, rendered from the saved JSON, keyed by run and sheet index.\n\n---\n\n${parts.join('\n---\n\n')}`);
console.log(`wrote ${parts.length} block(s) to ${out}`);
