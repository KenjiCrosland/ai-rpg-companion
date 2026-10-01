/**
 * Single-sided review doc — NOT part of the test suite. One run dir → one
 * markdown file: per block, the concept, the card as captured, and the
 * engine's own value-check lines so a reviewer can audit the balance rules
 * against the numbers the engine used. Validated like smoke-pair: a block
 * without an Actions section fails the build.
 * Usage: node scripts/smoke-solo.mjs <run-dir> [--out <path>]
 */
import fs from 'node:fs';
import path from 'node:path';
const args = process.argv.slice(2);
const dir = args.find((a) => !a.startsWith('--'));
const out = args.includes('--out') ? args[args.indexOf('--out') + 1] : `scripts/smoke-evidence/SOLO-${path.basename(dir)}.md`;
const hasActions = (b) => /\bActions\b/.test(b) && /Attack Roll|Saving Throw/.test(b);
let doc = `# Signature-slot review — single run, no comparison\n\nRun: \`${path.basename(dir)}\`. Each block is followed by the engine's own value-check lines (expected value vs floor, what the ladder did) and the signature trace, so the balance rules can be checked against the numbers rather than by eye. Blocks are unedited captures.\n`;
const problems = [];
for (const f of fs.readdirSync(dir).filter((x) => /^\d+-.*\.md$/.test(x)).sort()) {
  const md = fs.readFileSync(path.join(dir, f), 'utf8');
  const input = (/\*\*Input:\*\* `(.*?)`/.exec(md) ?? [])[1] ?? '';
  const block = (/### Block\n```\n([\s\S]*?)\n```/.exec(md) ?? [])[1] ?? '';
  const trace = (/### Trace\n```\n([\s\S]*?)\n```/.exec(md) ?? [])[1] ?? '';
  if (!block) { doc += `\n\n---\n\n## ${f.replace(/^\d+-|\.md$/g, '')}\n\n**Concept:** ${input}\n\n_(no block — the generation did not complete; see the run's trace)_\n`; continue; } // a missing capture is noted, a truncated one refuses
  if (!hasActions(block)) { problems.push(`${f}: no Actions section captured`); continue; }
  const lines = trace.split('\n').filter((l) => /value check|signature template|signature rider|library seed drawn|signature miss|^\[route\]|row superseded|trait renamed|chassis nova|nova geometry|nova capped|nova declined|print canon|trait bound|trait declined|energy withheld|movement owed|rename reverted|trait stripped|removal clauses|pi alias|pi guard|floating-orb overlay|imposed nova|fit declined|rider declined|fallback stands down/.test(l)).map((l) => l.replace(/^\[reskin\] /, ''));
  doc += `\n\n---\n\n## ${f.replace(/^\d+-|\.md$/g, '')}\n\n**Concept:** ${input}\n\n\`\`\`\n${block.trim()}\n\`\`\`\n\n**Engine trace**\n\n\`\`\`\n${lines.join('\n')}\n\`\`\`\n`;
}
if (problems.length) { console.error('REFUSING TO WRITE:\n  ' + problems.join('\n  ')); process.exit(1); }
fs.writeFileSync(out, doc); console.log(`wrote ${out}`);
