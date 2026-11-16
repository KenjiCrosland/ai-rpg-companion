// Lay the step-1 hand counts beside the checker's automated coverage/concept per baseline block.
// node scripts/fidelity-compare.mjs <BASELINE-...md> <CHECK-baseline-fidelity-...md>
import fs from 'node:fs';
const [handFile, checkFile, runDir] = process.argv.slice(2); // runDir (optional): align the automated rows to the batch index from the saved JSON filenames, so a timed-out entry leaves a gap instead of shifting every row below it
const hand = [...fs.readFileSync(handFile, 'utf8').matchAll(/^\| (\d+) \| ([^|]+?) \| [^|]+ \| (\d+)\/(\d+) \| (\d+)\/(\d+) \|/gm)].map((m) => ({ i: Number(m[1]), name: m[2].trim(), cov: [Number(m[3]), Number(m[4])], con: [Number(m[5]), Number(m[6])] }));
const auto = [...fs.readFileSync(checkFile, 'utf8').matchAll(/^\| ([^|]+?) \| ([^|]+?) \| [^|]+ \| [^|]+ \|(?:[^|]+\|){9} ([^|]+) \| ([^|]+) \|$/gm)].map((m) => ({ name: m[1].trim(), cr: m[2].trim(), cov: m[3].trim(), con: m[4].trim() })).filter((r) => r.name !== 'block' && /\d\/\d/.test(r.cov) || (r.name !== 'block' && r.cov === '—'));
const pct = (a, b) => (b ? Math.round((a / b) * 100) : null);
console.log('| # | hand coverage | auto coverage | Δ pts | hand concept | auto concept | Δ pts |');
let agree = 0;
const idx = runDir ? fs.readdirSync(runDir).filter((f) => f.endsWith('.json')).sort().map((f) => Number(f.split('-')[0]) - 1) : auto.map((_, k) => k);
auto.forEach((a, j) => { const k = idx[j] ?? j; const h = hand[k]; if (!h) return; const [ac, at] = a.cov.split('/').map(Number); const [bc, bt] = a.con.split('/').map(Number);
  const dcov = pct(ac, at) == null || pct(h.cov[0], h.cov[1]) == null ? null : pct(ac, at) - pct(h.cov[0], h.cov[1]); const dcon = pct(bc, bt) - pct(h.con[0], h.con[1]);
  if (dcov != null && Math.abs(dcov) <= 34 && Math.abs(dcon) <= 34) agree += 1;
  console.log(`| ${k + 1} ${a.name.slice(0, 22)} | ${h.cov.join('/')} | ${a.cov} | ${dcov == null ? '—' : dcov} | ${h.con.join('/')} | ${a.con} | ${dcon} |`); });
console.log(`blocks within one third (≈ "a block or two" on these denominators): ${agree} of ${auto.length}`);
