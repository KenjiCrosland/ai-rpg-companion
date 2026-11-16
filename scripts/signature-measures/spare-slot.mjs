// THE SPARE SLOT: is it still three templates? (plans/the-spare-slot-2026-10-27.md)
//
// Heated Body (500), Surprise Attack (443) and Resonant Body (299) were 1,248 of
// the saved runs' shipped rows, for three unrelated reasons — a blind seat
// default, a 39-word keyword list injecting onto the fit menu, and an idea call
// that asked for hit-me-back traits 18% of the time against print's 1%.
// Four readings, one per cause plus the total.
import fs from 'node:fs'; import path from 'node:path';

const FAMILY = ['heated-body', 'resonant-body', 'bloodied-burst', 'energy-aura', 'noxious-aura'];
const dirs = process.argv.slice(2);
let sheets = 0, famSheets = 0, famRows = 0, seatDefault = 0, boundWrong = 0;
const trig = {}; const detail = [];
for (const D of dirs) for (const f of fs.readdirSync(D).filter((x) => /^\d.*\.json$/.test(x)).sort()) {
  const md = path.join(D, f.replace(/\.json$/, '.md'));
  if (!fs.existsSync(md)) continue;
  let j; try { j = JSON.parse(fs.readFileSync(path.join(D, f), 'utf8')); } catch { continue; }
  const tr = fs.readFileSync(md, 'utf8');
  sheets += 1;
  const rows = Object.values(j.sections ?? {}).flat().filter(Boolean);
  const fam = rows.filter((e) => FAMILY.includes(String(e.template ?? '')));
  if (fam.length) { famSheets += 1; famRows += fam.length; }
  if (/^\[reskin\] seat default:/m.test(tr) && rows.some((e) => e.template === 'assassinate')) seatDefault += 1;
  const m = /menu ordered by the idea's stamps: trait — idea fires ([a-z_]+)\/does ([a-z_]+)/.exec(tr);
  if (m) {
    trig[m[1]] = (trig[m[1]] ?? 0) + 1;
    // a family row whose idea asked for a DIFFERENT trigger, where the keys matched:
    const ok = m[1] === 'on_being_hit' || ((m[1] === 'always' || m[1] === 'start_of_turn') && fam.some((e) => /aura/.test(String(e.template))));
    for (const e of fam) if (!ok && new RegExp(`keys would have bound[^\n]*${e.template}`).test(tr)) { boundWrong += 1; detail.push(`${f.slice(0, 2)} ${e.template} shipped but the idea wanted ${m[1]}/${m[2]}`); }
  }
}
const pc = (n, d) => (d ? `${Math.round((100 * n) / d)}%` : '—');
console.log(`${sheets} sheets.\n`);
console.log(`(a) sheets shipping a retaliation/aura row: ${famSheets} (${pc(famSheets, sheets)})   [before: 18%  bar: <=10%]`);
console.log(`    rows: ${famRows}`);
console.log(`(b) sheets where a BLIND seat default shipped the ambush trait: ${seatDefault}   [before: 331 of 366 such rows  bar: 0]`);
console.log(`(c) family rows the keys would have injected against the idea's own trigger: ${boundWrong}   [before: 4 of 5  bar: 0]`);
for (const d of detail.slice(0, 8)) console.log('      ' + d);
const n = Object.values(trig).reduce((a, b) => a + b, 0);
console.log(`\n(d) what the idea asked the TRAIT seat to do (${n} stamped ideas)   [on_being_hit before: 18%  bar: <=8%; print: 1%]`);
for (const [k, v] of Object.entries(trig).sort((a, b) => b[1] - a[1])) console.log(`      ${k.padEnd(16)}${String(v).padStart(3)}  ${pc(v, n)}`);
