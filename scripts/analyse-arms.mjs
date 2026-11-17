// WHAT THE AUDIT AND REPAIR DO TO A FINISHED SHEET — the experiment's arithmetic (2026-11-16).
//
//   node --import ./scripts/alias-loader.mjs scripts/analyse-arms.mjs <tape-dir> <arm-dir>...
//
// Reads the recorded forty (the "Today" arm) and one directory per arm, and prints the per-arm
// counts and the changed-row table. Measures nothing itself: every number comes from a sheet on
// disk or an answer in a tape.
import fs from 'node:fs';
import path from 'node:path';

const unfence = (t) => String(t ?? '').replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '').trim();
const content = (raw) => { try { return JSON.parse(unfence(JSON.parse(raw)?.choices?.[0]?.message?.content)); } catch { return null; } };
const idx = (f) => parseInt(path.basename(f), 10);

/** every row of a sheet, by section, as {name, text} */
const rowsOf = (sheet) => {
  const out = [];
  for (const [sec, es] of Object.entries(sheet?.sections ?? {})) for (const e of es ?? []) out.push({ sec, name: String(e?.name ?? ''), text: String(e?.text ?? '') });
  return out;
};
const DAMAGE = /\d+\s*\(\d+d\d+(?:\s*[+-]\s*\d+)?\)\s*\w+ damage/g;
const damageOf = (t) => (String(t).match(DAMAGE) ?? []).join(' | ');

/** the widened ship-gate scan, with "DC of DC" and any doubled word added */
const scanRow = (name, text) => {
  const hits = [];
  const t = String(text);
  if (/\bwith\s*\(/i.test(t)) hits.push('with-paren');
  if (/can replace (?:one|two|three) attacks? with\s*(?:\((?:Recharge|\d)[^)]*\)\s*)?[.;]/i.test(t)) hits.push('objectless-clause');
  if (/Attack Roll/.test(t) && /\)\s+\w+ damage if /.test(t) && !/plus \d+ \([^)]*\) \w+ damage if /.test(t)) hits.push('rider-no-damage');
  if (/(?:Attack Roll|Saving Throw)/.test(t) && !/[.!?]["')\]]?$/.test(t.trim())) hits.push('row-not-a-sentence');
  if (/\bDC\s+of\s+DC\b/i.test(t)) hits.push('DC-of-DC');                       // added for this round
  const dbl = /\b([A-Za-z']{3,})\s+\1\b/i.exec(t);
  if (dbl && !/^(?:that|had|very)$/i.test(dbl[1])) hits.push(`doubled-word:${dbl[0]}`); // added for this round
  if (/\{[a-z_]+\}/.test(t) || /\bundefined\b|\bNaN\b|\bnull\b/.test(t)) hits.push('raw-token');
  return hits.map((h) => `${name}: ${h}`);
};

const loadArm = (dir) => {
  const byIdx = {};
  for (const f of fs.readdirSync(dir).filter((x) => /^\d+-.*\.json$/.test(x) && x !== 'calls.json')) {
    byIdx[idx(f)] = { sheet: JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) };
  }
  for (const f of fs.readdirSync(dir).filter((x) => /^\d+-.*\.md$/.test(x))) {
    const i = idx(f); const txt = fs.readFileSync(path.join(dir, f), 'utf8');
    byIdx[i] = { ...(byIdx[i] ?? {}), trace: txt, repairs: (txt.match(/\[reskin\] (?:row repair|free row repaired|repair round \d+):/g) ?? []).length };
  }
  // the arm's own calls, when the run saved them (arm tapes live in the run folder, never the repo)
  const cf = path.join(dir, 'calls.json');
  if (fs.existsSync(cf)) for (const [i, calls] of Object.entries(JSON.parse(fs.readFileSync(cf, 'utf8')))) {
    byIdx[Number(i)] = { ...(byIdx[Number(i)] ?? {}), calls };
  }
  return byIdx;
};

const auditOf = (entry) => {
  const c = (entry?.calls ?? []).find((x) => String(x.prompt).startsWith('You are auditing a D&D'));
  return c ? content(c.response) : null;
};

const [tapeDir, ...armDirs] = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const tape = {};
for (const f of fs.readdirSync(tapeDir).filter((x) => /^\d+-.*\.json$/.test(x))) {
  const j = JSON.parse(fs.readFileSync(path.join(tapeDir, f), 'utf8'));
  tape[idx(f)] = j;
}
const replayable = Object.entries(tape).filter(([, j]) => !j.replay?.skip).map(([i]) => Number(i));
const arms = Object.fromEntries(armDirs.map((d) => [path.basename(d).replace(/^arm-/, '').replace(/-\d{4}-\d{2}-\d{2}T.*$/, ''), loadArm(d)]));

// the Today arm is the tape itself
const todaySheet = (i) => tape[i]?.sheet ?? null;
const todayAudit = (i) => { const c = (tape[i]?.calls ?? []).find((x) => String(x.prompt).startsWith('You are auditing a D&D')); return c ? content(c.response) : null; };
const todayRepairs = (i) => (tape[i]?.calls ?? []).filter((x) => /^You are (?:REPAIRING one ability|repairing the ABILITIES)/.test(String(x.prompt))).length;

/**
 * A ROW THE MODEL WROTE, read from the trace rather than guessed from the sheet.
 *
 * A sheet carries no provenance — the flags live in the engine during generation — so the only
 * honest source is the authoring lines the trace prints. These four say the seat or the call wrote
 * the row; a row that came from the template catalog or print says so differently.
 * Anything the trace does not name either way is counted as UNCLASSIFIED, never as one or the other.
 */
const AUTHORED = /\[reskin\] (?:seat authored the row|free signature row|signature authored(?: \(\w+\))?)[^\n]*?"([^"]+)"/g;
const authoredRows = (trace) => {
  const out = new Set();
  for (const m of String(trace ?? '').matchAll(AUTHORED)) out.add(m[1].replace(/ \(.*\)$/, ''));
  // `signature authored (trait): … -> Traits/"Name"` puts the name after the arrow
  for (const m of String(trace ?? '').matchAll(/\[reskin\] signature authored[^\n]*?-> [A-Za-z ]+\/"([^"]+)"/g)) out.add(m[1].replace(/ \(.*\)$/, ''));
  return out;
};

console.log(`\n=== per arm, across ${replayable.length} replayable sheets ===\n`);
const hdr = ['arm', 'findings', 'high', 'med', 'low', 'on model row', 'not', 'unclass', 'audits w/ findings', 'repair calls', 'engine rounds', 'rows changed', 'removed', 'added', 'renamed', 'damage moved', 'scan hits'];
const rows = [];
const baseline = arms.none;
// every arm handed in, in the order given, with `today` (the tape itself) second — so an arm added
// later appears in this table without editing it. The list used to be hardcoded, which silently
// dropped the two typed arms the first time they were measured.
const ARM_ORDER = ['none', 'today', ...Object.keys(arms).filter((k) => k !== 'none')];
for (const name of ARM_ORDER) {
  const a = name === 'today' ? null : arms[name];
  if (name !== 'today' && !a) continue;
  let f = 0, hi = 0, me = 0, lo = 0, withF = 0, rep = 0, rounds = 0, ch = 0, rm = 0, ad = 0, ren = 0, dmg = 0, scan = 0, onAuthored = 0, notAuthored = 0, unclassified = 0;
  for (const i of replayable) {
    const aud = name === 'today' ? todayAudit(i) : auditOf(a[i]);
    const fs_ = aud?.findings ?? null;
    // the authoring happens BEFORE the audit, so the baseline arm's trace names the same rows for
    // every arm — and the Today arm has no trace of its own at all
    const auth = authoredRows(baseline?.[i]?.trace ?? a?.[i]?.trace);
    if (fs_) { f += fs_.length; if (fs_.length) withF += 1; for (const x of fs_) {
      const c = String(x.confidence).toLowerCase(); if (c === 'high') hi += 1; else if (c === 'medium') me += 1; else lo += 1;
      const entry = String(x.entry ?? '').replace(/ \(.*\)$/, '');
      if (auth.size === 0) unclassified += 1; else if (auth.has(entry)) onAuthored += 1; else notAuthored += 1;
    } }
    const calls = name === 'today' ? (tape[i]?.calls ?? []) : (a[i]?.calls ?? []);
    rep += calls.filter((x) => /^You are (?:REPAIRING one ability|repairing the ABILITIES)/.test(String(x.prompt))).length;
    const mine = name === 'today' ? todaySheet(i) : a[i]?.sheet;
    const base = baseline?.[i]?.sheet;
    if (mine && base) {
      const B = new Map(rowsOf(base).map((r) => [r.name, r.text]));
      const M = new Map(rowsOf(mine).map((r) => [r.name, r.text]));
      for (const [n, t] of M) { if (!B.has(n)) ad += 1; else if (B.get(n) !== t) { ch += 1; if (damageOf(B.get(n)) !== damageOf(t)) dmg += 1; } }
      for (const n of B.keys()) if (!M.has(n)) rm += 1;
      ren = ren; // renames are counted from the trace below
    }
    if (mine) for (const r of rowsOf(mine)) scan += scanRow(r.name, r.text).length;
    const tr = name === 'today' ? null : a[i]?.trace;
    if (tr) { ren += (tr.match(/\[reskin\] name follows content:/g) ?? []).length; rounds += (tr.match(/\[reskin\] repair round \d+:/g) ?? []).length; }
  }
  // AN ARM WHOSE AUDIT ANSWER THIS SCRIPT CANNOT SEE reports "—", never 0. The finding columns are
  // read out of a RECORDED audit call; an arm that answered the audit live, or from the tape by its
  // call rather than its prompt, has no such call in its own directory. Printing 0 there reads as
  // "the audit found nothing", which is the opposite of the truth — the typed arms' findings are in
  // their traces (`typed fix:` lines), not in a recorded call.
  const sawAudit = name === 'today' || replayable.some((i) => auditOf(arms[name]?.[i]));
  const n = (x) => (sawAudit ? x : '—');
  rows.push([name, n(f), n(hi), n(me), n(lo), n(onAuthored), n(notAuthored), n(unclassified), sawAudit ? `${withF} of ${replayable.length}` : '—', rep, name === 'today' ? '— (no trace)' : rounds, ch, rm, ad, ren, dmg, scan]);
}
const w = hdr.map((h, k) => Math.max(h.length, ...rows.map((r) => String(r[k]).length)));
console.log(hdr.map((h, k) => h.padEnd(w[k])).join('  '));
for (const r of rows) console.log(r.map((v, k) => String(v).padEnd(w[k])).join('  '));
console.log('\n(rows changed/removed/added and damage moved are against the None arm\'s sheet; the None row is therefore zero by definition)');

// ---- THE CHANGED ROWS, one table for the whole run -------------------------------------------
// The sheet, the row, its text in the None arm, its text in each other arm, and the finding that
// caused the change. Full text, not a summary: this is what the owner reads to judge whether a
// change was an improvement.
console.log('\n\n=== every row that differs from the None arm ===\n');
const findingFor = (aud, rowName) => (aud?.findings ?? []).find((f) => String(f.entry ?? '').replace(/ \(.*\)$/, '') === String(rowName).replace(/ \(.*\)$/, ''));
let shown = 0;
for (const i of replayable) {
  const base = baseline?.[i]?.sheet;
  if (!base) continue;
  const B = new Map(rowsOf(base).map((r) => [r.name, r.text]));
  const others = [['today', todaySheet(i), todayAudit(i)],
    ...Object.keys(arms).filter((k) => k !== 'none').map((k) => [k, arms[k][i]?.sheet, auditOf(arms[k][i])])];
  const names = new Set();
  for (const [, sheet] of others) for (const r of rowsOf(sheet ?? {})) names.add(r.name);
  for (const n of B.keys()) names.add(n);
  for (const n of [...names].sort()) {
    const mine = others.map(([k, sheet, aud]) => [k, new Map(rowsOf(sheet ?? {}).map((r) => [r.name, r.text])).get(n), aud]);
    if (mine.every(([, t]) => t === B.get(n))) continue;
    shown += 1;
    console.log(`--- sheet ${i} · ${base.name} · row "${n}"`);
    console.log(`    none          : ${B.get(n) ?? '(the row is not on this sheet)'}`);
    for (const [k, t, aud] of mine) {
      if (t === B.get(n)) { console.log(`    ${k.padEnd(14)}: (unchanged)`); continue; }
      console.log(`    ${k.padEnd(14)}: ${t ?? '(removed)'}`);
      const f = findingFor(aud, n);
      if (f) console.log(`    ${' '.repeat(14)}  ^ finding [${f.confidence}] principle ${f.principle}: ${String(f.issue ?? '').slice(0, 170)}`);
    }
    console.log('');
  }
}
console.log(`${shown} row(s) differ from the None arm across the ${replayable.length} sheets.`);
