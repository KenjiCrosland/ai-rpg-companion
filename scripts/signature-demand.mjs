// STAGE 2 ITEMS 4, 6 AND 7 (owner's fix order, 2026-10-16). Trace-only; changes
// nothing. Each answers one decision:
//   item 4 — floor drops BY PATTERN: if control rows dominate, the value floor
//            is pricing out print's second-commonest pattern.
//   item 6 — DEMAND from the miss log: signature misses by the idea's effect tag
//            say which shelves the GM's own ideas keep asking for.
//   item 7 — "fallback stands down" counted SEPARATELY from other "nothing":
//            "nothing" jumped 1% -> 13% on 10-01, the day the print-body
//            ruling landed, and the two causes have different fixes.
import fs from 'node:fs';
import path from 'node:path';
const { patternsOf } = await import('./pattern-label.mjs');
const { TEMPLATES } = await import('../src/tools/statblock-generator/reskin/templates.mjs');

const byId = new Map(TEMPLATES.map((t) => [t.id, t]));
const patternOfTemplate = (id) => {
  const t = byId.get(id); if (!t) return ['(unknown template)'];
  const txt = String(t.text ?? '') || Object.values(t.frames ?? {}).join(' ');
  let p = patternsOf(t.name, txt, { action: 'Actions', bonus_action: 'Bonus Actions', trait: 'Traits', reaction: 'Reactions', rider: 'Actions' }[t.section] ?? t.section);
  if (t.nova) p = [...new Set([...p, 'nova'])];
  if (t.section === 'reaction') p = [...new Set([...p, 'reaction tax'])];
  if (t.section === 'rider') p = [...new Set([...p, 'rider control'])];
  return p.length ? p : ['(passive — no pattern)'];
};

const since = process.argv.includes('--since') ? process.argv[process.argv.indexOf('--since') + 1] : null;
const floorByPattern = {}; const floorRows = {};
const missByEffect = {}; const missBySection = {}; const missIdeas = {};
const nothingCause = {}; const standDownByDate = {}; const nothingByDate = {};
let blocks = 0;

for (const d of fs.readdirSync('smoke-out')) {
  const p = path.join('smoke-out', d);
  if (!fs.statSync(p).isDirectory()) continue;
  const dm = /(\d{4}-\d{2}-\d{2})T/.exec(d); if (!dm) continue;
  if (since && dm[1] < since) continue;
  for (const f of fs.readdirSync(p).filter((x) => /^\d+-.*\.md$/.test(x))) {
    const md = fs.readFileSync(path.join(p, f), 'utf8');
    const trace = (/### Trace\n```\n([\s\S]*?)\n```/.exec(md) ?? [])[1] ?? '';
    if (!trace || /print canon: ".*" is a print creature/.test(trace)) continue;
    blocks += 1;

    // ITEM 4 — every row the floor dropped, by the pattern it would have carried
    for (const m of trace.matchAll(/signature dropped by the floor: "([^"]+)"/g)) floorRows[m[1]] = (floorRows[m[1]] ?? 0) + 1;
    for (const m of trace.matchAll(/fallback skipped by the floor: ([\w-]+) \(EV/g)) {
      for (const q of patternOfTemplate(m[1])) floorByPattern[q] = (floorByPattern[q] ?? 0) + 1;
    }

    // ITEM 6 — demand: what the idea asked for when the signature missed
    for (const m of trace.matchAll(/signature miss: (\w+) — "([^"]*)" \[(\w+)\/(\w+)\/(\w+)\]/g)) {
      const [, seat, idea, section, trigger, effect] = m;
      missByEffect[effect] = (missByEffect[effect] ?? 0) + 1;
      missBySection[`${section}/${trigger}`] = (missBySection[`${section}/${trigger}`] ?? 0) + 1;
      (missIdeas[effect] ??= []).push(`${seat}: ${idea.slice(0, 74)}`);
    }

    // ITEM 7 — why nothing landed.
    // THE ACTION SEAT IS NOT THE WHOLE SIGNATURE (corrected after a first pass
    // put 64% of these in "other"): 11% of the blocks I had called "nothing"
    // carried a TRAIT signature and 12% a wildcard row. "Nothing" means no
    // signature row of any kind — action, rider, seed, trait or wildcard.
    const heldAction = /signature template: |signature rider: |library seed drawn: /.test(trace);
    const heldTrait = /signature template \(trait\): /.test(trace);
    const heldWild = /wildcard accepted:|wildcard repaired:/.test(trace);
    if (!heldAction && !heldTrait && !heldWild) {
      // ATTRIBUTE BY FINAL CAUSE, PER SEAT (critic, 2026-10-16, and a second
      // correction of my own). Three readings of this number were wrong:
      //   1. an if-else chain testing "fallback stands down" FIRST credited that
      //      rule with 56% of empty slots it merely appeared in — and it does not
      //      stop the draw (118 stand-downs since 10-15: 40% drew a row anyway);
      //   2. walking every line and taking the last dropped it to 0%, because a
      //      TRAIT-seat miss further down the trace became the "final cause" of
      //      an empty ACTION signature — two different slots;
      //   3. so the walk is now per seat, over that seat's own lines only.
      // The stand-down's real share is the blocks where it fired and the ACTION
      // seat then drew nothing at all.
      // An if-else chain that tested "fallback stands down" first credited that
      // rule with every empty slot it merely appeared in — and it does not stop
      // the draw: Templar Vowsworn stands down and then draws the exploiter seed
      // on the next line; Sergeant Halloran stands down, draws Horrid Display,
      // and the FLOOR drops it. The last gate the row failed is the cause.
      // only the ACTION seat's own lines; a trait line is a different slot
      const ACTION_LINE = /signature idea \(action\)|signature miss: (?:action|rider)|fit declined:|nova declined:|rider declined:|fallback stands down:|fallback skipped|no seed is legal|signature dropped by the floor:|library seed drawn:|signature template:|signature rider:|menu pruned: action/;
      const ORDER = [
        [/signature miss: (?:action|rider) — .*? no template on the shelf shares a verb/, 'no shelf template shared a verb (no call made)'],
        [/signature miss: (?:action|rider) — .*the model found no template that holds it/, 'the call was asked and found no fit'],
        [/(?:fit|nova|rider) declined:/, 'a post-call veto dropped the pick'],
        [/fallback stands down:/, 'print body: "nothing invented"'],
        [/fallback skipped: [^\n]*the sheet cannot render/, 'the sheet could not render any seed'],
        // "signature dropped — no template held the idea and no seed is legal on
        // this sheet" is a SUMMARY line, printed after whatever actually killed
        // the row, so it is not a cause. Leaving it in made it 58% and swallowed
        // the floor's own cases — the critic's Sergeant Halloran is exactly that:
        // stands down, draws Horrid Display, the FLOOR drops it, then the summary.
        [/signature dropped by the floor:/, 'the value floor dropped it'],
      ];
      let cause = /signature idea \(action\)/.test(trace) ? 'other' : 'no action idea was produced';
      for (const line of trace.split('\n')) {
        if (!ACTION_LINE.test(line)) continue;
        for (const [re, label] of ORDER) { if (re.test(line)) cause = label; }
      }
      nothingCause[cause] = (nothingCause[cause] ?? 0) + 1;
      (nothingByDate[dm[1]] ??= {})[cause] = ((nothingByDate[dm[1]] ?? {})[cause] ?? 0) + 1;
    } else if (!heldAction) {
      nothingCause[heldTrait ? 'the TRAIT seat landed, the action seat did not' : 'a wildcard row landed, no signature'] = (nothingCause[heldTrait ? 'the TRAIT seat landed, the action seat did not' : 'a wildcard row landed, no signature'] ?? 0) + 1;
    }
    if (/fallback stands down:/.test(trace)) standDownByDate[dm[1]] = (standDownByDate[dm[1]] ?? 0) + 1;
  }
}
const pc = (n, d) => (d ? `${Math.round((100 * n) / d)}%` : '—');
const table = (title, obj, total, note = '') => {
  console.log(`\n${title}${note}`);
  const rows = Object.entries(obj).sort((a, b) => b[1] - a[1]);
  if (!rows.length) { console.log('  (none)'); return; }
  for (const [k, v] of rows) console.log(`  ${String(k).padEnd(38)} ${String(v).padStart(5)}  ${pc(v, total)}`);
};
console.log(`STAGE 2 ITEMS 4, 6, 7 — ${blocks} non-print blocks${since ? ` since ${since}` : ''}`);

const floorTotal = Object.values(floorByPattern).reduce((a, b) => a + b, 0);
table('ITEM 4 — WHAT THE VALUE FLOOR PRICES OUT, by the dropped template\'s pattern', floorByPattern, floorTotal);
table('  and the named rows the floor dropped outright (top)', Object.fromEntries(Object.entries(floorRows).sort((a, b) => b[1] - a[1]).slice(0, 12)), Object.values(floorRows).reduce((a, b) => a + b, 0));

const missTotal = Object.values(missByEffect).reduce((a, b) => a + b, 0);
table('ITEM 6 — DEMAND: signature misses by the idea\'s own effect tag', missByEffect, missTotal);
table('  by seat and trigger', Object.fromEntries(Object.entries(missBySection).sort((a, b) => b[1] - a[1]).slice(0, 12)), missTotal);
for (const [eff, list] of Object.entries(missIdeas).sort((a, b) => b[1].length - a[1].length).slice(0, 3)) {
  console.log(`\n  what a "${eff}" idea actually asked for (${list.length} misses, 4 shown):`);
  for (const x of list.slice(0, 4)) console.log(`    - ${x}`);
}

const nTotal = Object.values(nothingCause).reduce((a, b) => a + b, 0);
table('ITEM 7 — WHY NOTHING LANDED, by cause', nothingCause, nTotal);
console.log('\n  "nothing invented" (print body stands the fallback down) by date:');
for (const [d, n] of Object.entries(standDownByDate).sort()) {
  const nb = nothingByDate[d] ?? {}; const tot = Object.values(nb).reduce((a, b) => a + b, 0);
  console.log(`    ${d}  stand-downs ${String(n).padStart(4)}   of which shipped nothing: ${String(nb['print body: "nothing invented"'] ?? 0).padStart(4)}  (all "nothing" that day: ${tot})`);
}
