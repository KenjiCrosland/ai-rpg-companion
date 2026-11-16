// Does the template a trait idea was poured into FIRE THE WAY THE IDEA SAID?
// Idea trigger = the AI's own tag. Template trigger = the catalog's declared cell.
// Bound-by = the fit trace's bracket: [verb: x:concept] / [verb: x:idea] / [shape fit, no verb match].
import fs from 'node:fs'; import path from 'node:path';
import { TEMPLATE_BY_ID } from '@/tools/statblock-generator/reskin/templates.mjs';
const tally = {}; const rows = [];
for (const D of process.argv.slice(2)) for (const f of fs.readdirSync(D).filter((x) => /^\d.*\.md$/.test(x)).sort()) {
  const t = fs.readFileSync(path.join(D, f), 'utf8');
  const idea = /signature idea \(trait\): ".*?"\s*\[trait\/(\w+)\/(\w+)\]/.exec(t); if (!idea) continue;
  const fit = /signature template \(trait\): ([a-z-]+) -> [^"]*"([^"]+)" \("(.*?)(\[(?:verb: [^\]]*|shape fit[^\]]*)\])?"\)/.exec(t); if (!fit) continue;
  const tmpl = TEMPLATE_BY_ID.get(fit[1]); const tTrig = tmpl?.trigger ?? '?';
  const bracket = fit[4] ?? '[?]';
  const by = /shape fit/.test(bracket) ? 'shape fit (nearest)' : /:concept/.test(bracket) ? 'concept keyword' : /:idea/.test(bracket) ? 'idea keyword' : 'other';
  const match = idea[1] === tTrig;
  const k = `${by} / trigger ${match ? 'MATCHES' : 'DIFFERS'}`; tally[k] = (tally[k] ?? 0) + 1;
  rows.push({ f: f.slice(0, 2), run: path.basename(D).slice(6, 22), by, ideaTrig: idea[1], tmpl: fit[1], tTrig, name: fit[2] });
}
console.log(`${rows.length} shipped trait signatures across ${process.argv.length - 2} runs\n`);
for (const [k, v] of Object.entries(tally).sort()) console.log(`  ${String(v).padStart(3)}  ${k}`);
console.log('\nThe DIFFERS cases:');
for (const r of rows.filter((r) => r.ideaTrig !== r.tTrig)) console.log(`  ${r.run} #${r.f}  idea fires ${r.ideaTrig.padEnd(13)} -> shipped ${r.tmpl.padEnd(16)} (${r.tTrig.padEnd(13)}) "${r.name}"  bound by ${r.by}`);
