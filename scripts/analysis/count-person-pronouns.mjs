// WHERE "IT"/"ITS" COMES FROM ON A SHEET WHOSE CREATURE IS A NAMED PERSON, and what each
// one actually refers to. This produced the 361 / 52% / 28% / 20% split in
// scripts/smoke-evidence/HANDOFF-fix5-proposal-2026-11-14.md, which is the measurement the
// owner's 2026-11-14 ruling rests on (a named person keeps "it" for now).
//
// COMMITTED SO THE RULING CAN BE REVISITED ON ITS MERITS. It reads `smoke-out/`, which is
// gitignored, so a fresh clone will print zeros until some runs exist — that is why the
// numbers in the handoff could not be reproduced by a reviewer. Re-run it after any forty.
//
// The classification is an APPROXIMATION and is honest about it: each pronoun is assigned to
// whichever of "target"/"creature" appears nearer before it in the same sentence. That is
// good enough to establish the thing that matters — a large share mean the TARGET, in the
// same words as the creature — and not good enough to be a gate.
//
//   node --import ./scripts/alias-loader.mjs scripts/analysis/count-person-pronouns.mjs
// Approximated by the nearest preceding noun phrase in the same sentence.
import fs from 'node:fs';
const runs = fs.readdirSync('smoke-out').filter((d) => fs.statSync(`smoke-out/${d}`).isDirectory()).filter((d) => /2026-11-(0[5-9]|1[0-4])/.test(d));
let creature = 0; let target = 0; let unclear = 0; const ex = { creature: [], target: [], unclear: [] };
for (const run of runs) {
  for (const f of fs.readdirSync(`smoke-out/${run}`).filter((x) => /^\d+.*\.json$/.test(x))) {
    let m; try { m = JSON.parse(fs.readFileSync(`smoke-out/${run}/${f}`, 'utf8')); } catch { continue; }
    m = m.monster ?? m;
    const inline = String(m.inline ?? '');
    if (!inline || /^the\s/i.test(inline) || !/^[A-Z]/.test(inline)) continue;
    if (String(m.type ?? '').toLowerCase() !== 'humanoid') continue;
    for (const es of Object.values(m.sections ?? {})) for (const e of es ?? []) {
      for (const sent of String(e.text ?? '').split(/(?<=[.!?])\s+/)) {
        for (const mm of sent.matchAll(/\b(its|it)\b/gi)) {
          const before = sent.slice(0, mm.index);
          const lastT = Math.max(before.lastIndexOf('target'), before.lastIndexOf('creature'), before.lastIndexOf('Creature'));
          const lastC = Math.max(before.lastIndexOf(inline), before.toLowerCase().lastIndexOf(inline.toLowerCase()));
          if (lastT < 0 && lastC < 0) { unclear += 1; if (ex.unclear.length < 2) ex.unclear.push(`${m.name}/${e.name}: ${sent.slice(0, 95)}`); }
          else if (lastT > lastC) { target += 1; if (ex.target.length < 2) ex.target.push(`${m.name}/${e.name}: ${sent.slice(0, 95)}`); }
          else { creature += 1; if (ex.creature.length < 2) ex.creature.push(`${m.name}/${e.name}: ${sent.slice(0, 95)}`); }
        }
      }
    }
  }
}
const tot = creature + target + unclear;
console.log(`"it"/"its" on named-person Humanoid sheets: ${tot}`);
console.log(`  means THE CREATURE : ${creature}  (${(100*creature/tot).toFixed(0)}%)   <- would become they/their/them`);
console.log(`  means THE TARGET   : ${target}  (${(100*target/tot).toFixed(0)}%)   <- MUST NOT CHANGE`);
console.log(`  no antecedent in the sentence: ${unclear}  (${(100*unclear/tot).toFixed(0)}%)`);
for (const k of ['creature','target','unclear']) for (const s of ex[k]) console.log(`  [${k}] ${s}`);
