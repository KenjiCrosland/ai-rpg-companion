// node --import ./scripts/alias-loader.mjs scripts/gap-outcomes.mjs <run-dir>
//
// THE SIGNATURE-OUTCOME TABLE (critic's section 6, 2026-10-21). Reads the [gap]
// lines a run emitted and reports, per seat, what actually SHIPPED — not what was
// accepted. The distinction is the whole point: `[nearest landed]` used to be
// stamped at acceptance, ~100 lines before the receipt gate and verb preference
// can veto the seat, which read 23 real vetoes of 41 as 1.
//
// "shipped nothing" is the number that moves when sheets stop being flat.
//
// Fields are read BY NAME, never by position. The first version of this script
// was one positional regex, and when gap records moved to emitting at
// sheet-final — putting the outcome stamp after [menu:] rather than before it —
// it matched 0 of 30 lines and printed a table of zeroes that looked like a
// clean run. Anything unparsed is now counted and shown; silence is never read
// as zero.
import fs from 'fs';
import { TEMPLATES } from '@/tools/statblock-generator/reskin/templates.mjs';

const dir = process.argv[2];
if (!dir) { console.error('usage: gap-outcomes.mjs <run-dir>'); process.exit(1); }
const byId = new Map(TEMPLATES.map((t) => [t.id, t]));

/** Pull a `[key: value]` field out of a trace line by name, wherever it sits. */
const field = (line, key) => {
  const m = new RegExp(`\\[${key}: ([^\\]]*)\\]`).exec(line);
  return m ? m[1].trim() : null;
};
const ids = (raw) => (!raw || raw === 'empty' || raw === 'none' ? [] : raw.split(/\s+/));

const B = { landed: [], vetoed: [], dropped: [] };
const cause = { overDecline: 0, role: 0, legality: 0, genuine: 0 };
const unparsed = [];

for (const f of fs.readdirSync(dir).filter((x) => /^\d+.*\.md$/.test(x))) {
  for (const line of fs.readFileSync(`${dir}/${f}`, 'utf8').split('\n')) {
    if (!line.includes('[gap]')) continue;

    // A seat is what makes this a seat-outcome record. Other [gap] diagnostics
    // (e.g. "UNNAMED trait declined with no missing mechanic named") carry no
    // seat, no menu and no stamp, and belong to no bucket here.
    const seatRaw = /\[seat: (\w+) \[([^\]]+)\]\]/.exec(line);
    if (!seatRaw) continue;
    const [, seat, tags] = seatRaw;

    const landedId = field(line, 'landed');
    const vetoedRaw = field(line, 'VETOED AFTER ACCEPTANCE');
    const vetoedId = vetoedRaw ? vetoedRaw.split(/\s+/)[0] : null; // "<id> never reached the sheet"
    const isDropped = /\browdropped\b|\brow dropped\b/.test(line);

    if (!landedId && !vetoedId && !isDropped) {
      unparsed.push(`${f}: no outcome stamp — ${line.slice(0, 150)}`);
      continue;
    }

    const head = line.slice(0, line.indexOf('[seat:'));
    const wantEnd = head.indexOf(' — "');
    const want = (wantEnd > -1 ? head.slice(head.indexOf('[gap]') + 6, wantEnd) : head).trim();
    const parts = head.trim().split(' — ');
    const name = parts.length > 1 ? parts[parts.length - 1].trim() : '(unnamed)';

    const rec = { name, seat, tags, want: want.slice(0, 92), template: landedId ?? vetoedId ?? null };
    (landedId ? B.landed : vetoedId ? B.vetoed : B.dropped).push(rec);

    // why was nothing same-seat offered?
    const [sec, trig, eff] = tags.split('/');
    const menu = ids(field(line, 'menu'));
    const rej = ids(field(line, 'same-seat rejected'));
    const sameSeatOnMenu = menu.filter((id) => {
      const t = byId.get(id);
      return t && t.section === sec && t.trigger === trig && t.effect === eff;
    });
    if (sameSeatOnMenu.length) cause.overDecline += 1;
    else if (rej.some((r) => r.endsWith(':role'))) cause.role += 1;
    else if (rej.length) cause.legality += 1;
    else cause.genuine += 1;
  }
}

const n = B.landed.length + B.vetoed.length + B.dropped.length;
const pc = (x) => `${String(x).padStart(3)}  ${n ? String(Math.round((100 * x) / n)).padStart(3) : 0}%`;
console.log(`${n} seat-outcome gap records in ${dir}\n`);
if (!n) {
  console.log('NO RECORDS PARSED. The trace format has moved — fix this script before');
  console.log('reading any conclusion from it. A table of zeroes is not a clean run.');
}
console.log('WHAT SHIPPED (read off the finished sheet)');
console.log(`  landed            ${pc(B.landed.length)}`);
console.log(`  VETOED after acceptance ${pc(B.vetoed.length)}   <- 23 of 41 on 2026-10-21, before the 1d replacement`);
console.log(`  row dropped       ${pc(B.dropped.length)}`);
console.log('\nWHY NOTHING SAME-SEAT WAS OFFERED (the engine\'s own rejection reasons)');
console.log(`  over-decline  ${pc(cause.overDecline)}  a same-seat template WAS on the menu and the call said no`);
console.log(`  role shelf    ${pc(cause.role)}  same-seat ones exist; the role filter cut them`);
console.log(`  legality      ${pc(cause.legality)}  correctly cut (body type, host row, style)`);
console.log(`  genuine gap   ${pc(cause.genuine)}  nothing rejected and nothing offered`);
if (B.vetoed.length) {
  console.log('\nvetoed after acceptance — these are the flat seats:');
  for (const r of B.vetoed.slice(0, 12)) console.log(`  ${r.name} [${r.seat} ${r.tags}] via ${r.template}: ${r.want}`);
}
if (unparsed.length) {
  console.log(`\n${unparsed.length} seat record(s) UNPARSED — the format may have moved:`);
  for (const u of unparsed.slice(0, 8)) console.log(`  ${u}`);
}
