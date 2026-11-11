/**
 * THE REPAIR CHAIN, STRESSED ALONE (owner, 2026-11-11: "repair and fix call chains in isolation
 * instead of whole blocks. known failures?").
 *
 * A twelve yields ~2 free-row repairs and the H8 refusal fired 0 times in 12 sheets, so the chain
 * is measured at a rate of a handful a day. Every case it has ever seen is on disk: the saved runs
 * carry the sheet, the flagged row, the audit's complaint and what the chain did about it. This
 * replays them with no generation around it.
 *
 *   node scripts/probe-repair-chain.mjs [--sets A,B,C,D] [--rolls N] [--limit N] [--runs <glob>]
 *
 * Sets, after the four the plan names (HANDOVER-2026-11-11, item S):
 *   A  repairs that LANDED      — is the audit's own complaint gone, and did the new row add a FAIL?
 *   B  repairs that DECLINED    — by which refusal, and was the decline right?
 *   C  findings the GATE DROPPED — put them through the fix prompt anyway and score the answer
 *   D  the rows that shipped BROKEN — the H8 refusal must fire on each
 *
 * A, B and D need no model: the before/after text, the complaint and the final sheet are all saved.
 * C calls the model through the dev server's /api/ai proxy, the way the other probes do
 * (PROBE_BASE_URL, default http://localhost:5173; the key stays server-side).
 *
 * NOT YET END-TO-END: the engine's render step (`authoredRow`) is a closure inside `generateReskin`,
 * so C scores the model's ANSWER (parsed, a form of some kind, the complaint addressed) and not the
 * engine's rendered row. Lifting that closure into one exported `repairFreeRow` both the engine and
 * this probe call is the next step — see item S. A measures the rendered row, because the rendered
 * row is on disk.
 */
import fs from 'node:fs';
import path from 'node:path';
import { buildFreeRowFixPrompt, parseAuthorResponse, imposedConditions, damageIsThePoint } from '@/tools/statblock-generator/reskin/author.mjs';
import { saveStatsFor, declaredBodyFacts } from '@/tools/statblock-generator/reskin/templates.mjs';
import { mechanicUnkept } from '@/tools/statblock-generator/reskin/name-claims.mjs';
import { checkBlock } from '@/tools/statblock-generator/reskin/checker.mjs';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const SETS = String(opt('--sets', 'A,B,D')).toUpperCase().split(',');
const ROLLS = Number(opt('--rolls', 1));
const LIMIT = Number(opt('--limit', 0)) || Infinity;
const RUNS = opt('--runs', 'smoke-out/*2026-11-1*');
const BASE = process.env.PROBE_BASE_URL ?? 'http://localhost:5173';
const MODEL = process.env.PROBE_MODEL ?? 'deepseek-flash';

// ---- the corpus, read off the saved runs -------------------------------------------------------
const runDirs = fs.readdirSync('smoke-out')
  .filter((d) => new RegExp(RUNS.replace('smoke-out/', '').replace('*', '.*')).test(d))
  .filter((d) => { try { return fs.statSync(path.join('smoke-out', d)).isDirectory(); } catch { return false; } });

const cases = { A: [], B: [], C: [] };
for (const d of runDirs) {
  for (const f of fs.readdirSync(path.join('smoke-out', d)).filter((x) => /^\d+-.*\.md$/.test(x))) {
    const md = path.join('smoke-out', d, f);
    const jf = md.replace(/\.md$/, '.json');
    let sheet = null; try { const raw = JSON.parse(fs.readFileSync(jf, 'utf8')); sheet = raw.monster ?? raw; } catch { /* a sheet that failed to save */ }
    if (!sheet?.sections) continue;
    const t = fs.readFileSync(md, 'utf8');
    const faults = new Map();
    for (const m of t.matchAll(/\[reskin\] row repair: "([^"]+)" \[[^\]]+\] — the audit faults it \(([^)]{0,400})/g)) faults.set(m[1], m[2]);
    for (const m of t.matchAll(/\[reskin\] free row repaired: "([^"]+)": "([^"]*)" -> "([^"]*)"/g)) {
      cases.A.push({ run: d, file: f, sheet, name: m[1], was: m[2], now: m[3], fault: faults.get(m[1]) ?? null });
    }
    for (const m of t.matchAll(/\[reskin\] free row repair declined: "([^"]+)" — ([^\n]{0,220})/g)) {
      cases.B.push({ run: d, file: f, sheet, name: m[1], why: m[2], fault: faults.get(m[1]) ?? null });
    }
    for (const m of t.matchAll(/audit finding below confidence gate: ([^\n]{0,300})/g)) {
      const line = m[1];
      const rows = Object.entries(sheet.sections).flatMap(([sec, es]) => (es ?? []).map((e) => [sec, e]));
      const hit = rows.map(([sec, e]) => [sec, e, String(e.name ?? '').replace(/ \(.*\)$/, '')])
        .filter(([, , n]) => n && (line.startsWith(`${n} `) || line.startsWith(`${n}.`)))
        .sort((a, b) => b[2].length - a[2].length)[0];
      if (!hit) continue;
      const [sec, row, bare] = hit;
      const repairable = !!(row.freeRow || row.authored) && !row.print;
      cases.C.push({ run: d, file: f, sheet, sec, row, name: bare, issue: line.slice(bare.length).trim(), repairable });
    }
  }
}

// ---- the engine's own refusal, composed as the call site composes it ---------------------------
const wouldBreak = (row) => {
  const sv = /\*?([A-Z][a-z]+) Saving Throw/.exec(row?.text ?? '');
  if (sv) {
    const want = saveStatsFor({ imposes: imposedConditions(row)[0] ?? null, damageDominant: damageIsThePoint(row), movement: !!row.imposesMovement });
    if (want.length && !want.includes(sv[1])) return `a ${sv[1]} save where the table calls for ${[...new Set(want)].join(' or ')}`;
  }
  const unkept = mechanicUnkept(String(row?.name ?? '').replace(/ \(.*\)$/, ''), row?.text ?? '');
  if (unkept) return `a name promising ${unkept} the text lacks`;
  return null;
};
// the audit quotes a VERBATIM span in its message: "(about: "…")". That is what "fixed" means.
const spanOf = (fault) => /\(about: "([^"]{3,})"/.exec(fault ?? '')?.[1] ?? null;
const norm = (s) => String(s ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
const failsNaming = (sheet, name) => {
  try {
    return Object.values(checkBlock(sheet).gates).flatMap((g) => g.findings ?? [])
      .filter((x) => x.severity === 'fail' && String(x.message ?? '').includes(name)).map((x) => x.rule);
  } catch { return ['(checker error)']; }
};

const pct = (a, b) => (b ? `${((a / b) * 100).toFixed(0)}%` : '—');
const out = [];
const say = (s) => { out.push(s); console.log(s); };

// ---- A: did the repair fix the thing it was sent for? ------------------------------------------
if (SETS.includes('A')) {
  const A = cases.A.slice(0, LIMIT);
  let spanGone = 0, spanKnown = 0, broke = 0, changed = 0;
  const bad = [];
  for (const c of A) {
    const row = Object.values(c.sheet.sections).flat().find((e) => String(e.name ?? '').replace(/ \(.*\)$/, '') === c.name.replace(/ \(.*\)$/, ''));
    const text = row?.text ?? c.now;
    if (norm(text) !== norm(c.was)) changed += 1;
    const span = spanOf(c.fault);
    if (span) { spanKnown += 1; if (!norm(text).includes(norm(span))) spanGone += 1; else bad.push([c, `the span it was sent to fix is still there: "${span.slice(0, 60)}"`]); }
    const fails = failsNaming(c.sheet, c.name.replace(/ \(.*\)$/, ''));
    if (fails.length) { broke += 1; bad.push([c, `the repaired row FAILs ${fails.join(', ')}`]); }
    const wb = row ? wouldBreak(row) : null;
    if (wb) bad.push([c, `today's refusal would decline it: ${wb}`]);
  }
  say(`\n## A — repairs that LANDED (${A.length})`);
  say(`   text actually changed ............ ${changed}/${A.length} (${pct(changed, A.length)})`);
  say(`   the audit's span is GONE ......... ${spanGone}/${spanKnown} (${pct(spanGone, spanKnown)})   [spans recoverable: ${spanKnown}]`);
  say(`   the repaired row FAILs the checker ${broke}/${A.length} (${pct(broke, A.length)})`);
  say(`   cases worth a look:`);
  for (const [c, why] of bad.slice(0, 12)) say(`     ${c.run.slice(0, 26)}/${c.file.slice(0, 18)} "${c.name}" — ${why}`);
}

// ---- B: why repairs declined -------------------------------------------------------------------
if (SETS.includes('B')) {
  const B = cases.B.slice(0, LIMIT);
  const by = new Map();
  for (const c of B) {
    const k = /held no row of any kind/.test(c.why) ? 'the answer held no row of any kind'
      : /a trait is not a save/.test(c.why) ? 'parser: a trait is not a save'
        : /counts \d+ number/.test(c.why) ? 'parser: promised a number it never wrote'
          : /counts \d+ mechanic/.test(c.why) ? 'parser: two mechanics in one row'
            : /belongs in the/.test(c.why) ? 'the call said it is not a row'
              : /still carries \{/.test(c.why) ? 'engine: an unsubstituted token'
                : /cites "/.test(c.why) ? 'engine: a dangling reference'
                  : /would /.test(c.why) ? 'engine: H8 — it would break a gate'
                    : /came back empty/.test(c.why) ? 'engine: empty' : c.why.slice(0, 48);
    by.set(k, [...(by.get(k) ?? []), c]);
  }
  say(`\n## B — repairs that DECLINED (${B.length})`);
  for (const [k, v] of [...by.entries()].sort((a, b) => b[1].length - a[1].length)) {
    say(`   ${String(v.length).padStart(3)}  ${k}`);
    for (const c of v.slice(0, 2)) say(`        e.g. ${c.run.slice(0, 24)}/${c.file.slice(0, 16)} "${c.name}"${c.fault ? ` — sent for: ${c.fault.slice(0, 70)}` : ''}`);
  }
}

// ---- D: the rows that shipped broken -----------------------------------------------------------
if (SETS.includes('D')) {
  const D = [
    { name: 'Broken-Ground Slam (Recharge 5-6)', imposes: 'Prone', text: '*Strength Saving Throw*: DC 13, each creature in a 15-foot Cone. *Failure:* 21 (6d6) Bludgeoning damage, and the target has the Prone condition. *Success:* Half damage only.' },
    { name: 'Mirefast Grip', imposes: 'Restrained', text: '*Strength Saving Throw*: DC 16, one creature within 10 feet. *Failure:* The target is pulled up to 10 feet straight toward the lurker, and the target has the Restrained condition until the end of its next turn.' },
    { name: 'Pearlescent Slime', imposes: 'Grappled', text: 'While the bull eel is Grappled, checks made to sustain a Grapple on the bull eel have Disadvantage, and the bull eel can take a Bonus Action to end the Grapple on itself.' },
  ];
  say(`\n## D — the three that shipped broken: does a refusal fire?`);
  for (const r of D) {
    const wb = wouldBreak(r);
    const rel = r.name.startsWith('Pearl') ? 'declared relation (H4): the row says it REQUIRES Grappled, so the gate no longer reads it as applying one' : null;
    say(`   ${wb ? 'REFUSED' : rel ? 'covered ' : 'PASSES '}  ${r.name.padEnd(34)} ${wb ?? rel ?? '— no refusal fires'}`);
  }
}

// ---- C: the findings the gate threw away -------------------------------------------------------
if (SETS.includes('C')) {
  const C = cases.C.filter((c) => c.repairable).slice(0, LIMIT === Infinity ? 24 : LIMIT);
  say(`\n## C — findings the confidence gate DROPPED, put through the fix anyway (${C.length} of ${cases.C.length} dropped; ${cases.C.filter((x) => x.repairable).length} on a repairable row)`);
  const ask = async (prompt) => {
    const r = await fetch(`${BASE}/api/ai/deepseek`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: prompt }] }),
    });
    if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
    const j = await r.json();
    return j.choices?.[0]?.message?.content ?? j.content?.[0]?.text ?? '';
  };
  let parsed = 0, formed = 0, tried = 0;
  const notes = [];
  for (const c of C) {
    const sheetText = Object.entries(c.sheet.sections).flatMap(([sec, es]) => (es ?? []).map((e) => `${sec} / ${e.name}: ${e.text}`)).join('\n');
    const taken = Object.values(c.sheet.sections).flat().map((e) => String(e.name ?? '').replace(/ \(.*\)$/, '')).filter((n) => n && n !== c.name);
    const prompt = buildFreeRowFixPrompt({
      name: c.sheet.name, inline: c.sheet.inline ?? 'the creature', cr: c.sheet.cr_str ?? String(c.sheet.cr), sheet: sheetText,
      row: { name: c.name, text: String(c.row.text ?? '') }, problems: [c.issue],
      kind: c.sec === 'Traits' ? 'a trait' : c.sec === 'Reactions' ? 'a reaction' : 'an action',
      taken, lacks: [], bodyFacts: declaredBodyFacts({ sections: c.sheet.sections, holdShape: c.sheet.generation?.hold_shape ?? null }),
    });
    for (let i = 0; i < ROLLS; i += 1) {
      tried += 1;
      try {
        const raw = await ask(prompt);
        const w = parseAuthorResponse(raw, { attackKeys: [], attackCap: 0, traitSlots: 1 });
        if (w) parsed += 1;
        const form = w && (w.traits?.[0] || w.reactions?.[0] || w.saves?.[0]);
        if (form) formed += 1;
        else notes.push(`${c.name}: ${w ? ((w.refused ?? []).map((x) => x.why).join('; ') || (w.unplaced ?? []).length ? 'answered "not a row"' : 'no row of any kind') : 'did not parse'}`);
      } catch (e) { notes.push(`${c.name}: call failed — ${e.message}`); }
    }
  }
  say(`   answers that parsed .............. ${parsed}/${tried} (${pct(parsed, tried)})`);
  say(`   answers carrying a usable row ... ${formed}/${tried} (${pct(formed, tried)})`);
  for (const n of notes.slice(0, 10)) say(`     ${n}`);
}

const dest = `scripts/smoke-evidence/REPAIR-CHAIN-${new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-')}.md`;
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, `# Repair chain, stressed alone\n\nruns: \`${RUNS}\` · sets ${SETS.join(',')} · rolls ${ROLLS}\n${out.join('\n')}\n`);
console.log(`\nwrote ${dest}`);
