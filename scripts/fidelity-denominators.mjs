// The hand count beside the automated denominator, per block (critic's step-5 read: "the denominator itself needs to match a
// reader's count before the number is quoted"). node scripts/fidelity-denominators.mjs <run-dir> <batch.json>
import fs from 'node:fs';
import path from 'node:path';
const [runDir, batchFile] = process.argv.slice(2);
const batch = JSON.parse(fs.readFileSync(batchFile, 'utf8'));
const files = fs.readdirSync(runDir).filter((f) => f.endsWith('.json')).sort((a, b) => Number(a.split('-')[0]) - Number(b.split('-')[0]));
console.log('| # | block | hand | automated | automated record (head in brackets) |\n|---|---|---|---|---|');
let hand = 0; let auto = 0; let within = 0;
for (const f of files) {
  const i = Number(f.split('-')[0]) - 1; const m = JSON.parse(fs.readFileSync(path.join(runDir, f), 'utf8'));
  const g = (m.other_edition ?? m).generation ?? m.generation ?? {}; const rec = g.clauses ?? [];
  const counted = rec.some((c) => c.head) ? (rec.some((c) => !c.head) ? rec.filter((c) => !c.head) : rec) : rec.filter((c) => c.kind !== 'descriptive');
  const h = (batch[i]?.clauses ?? []).length; const a = counted.length || (rec.length ? 1 : 0);
  hand += h; auto += a; if (Math.abs(h - a) <= 1) within += 1;
  console.log(`| ${i + 1} | ${m.name ?? m.monsterName} | ${h} | ${a} | ${rec.map((c) => (c.head ? `[${c.text}]` : `${c.kind[0]}${c.polarity ? '¬' : ''}:${c.text}`)).join(' · ').slice(0, 220)} |`);
}
console.log(`\n**Denominators:** hand ${hand}, automated ${auto}; ${within} of ${files.length} blocks within one clause of the hand count.`);
