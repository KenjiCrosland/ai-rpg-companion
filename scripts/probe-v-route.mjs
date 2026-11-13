// RUNG 1 FOR ITEM 1 — THE ROUTE CALL ALONE (Fable 5.2's brief, 2026-11-13).
// No generation: one route call per roll, fed to `chooseLine` exactly as the
// component does, so the only thing under test is the shelf filter and the
// caster gate. Green (the brief's own done-when):
//   five non-casters OFF the caster family 5 of 5, three controls hold 5 of 5.
//
//   node --import ./scripts/alias-loader.mjs scripts/probe-v-route.mjs [N] [--show-prompt]
//
// The concept text is built the way StatblockGenerator does
// (`[name, description].filter(Boolean).join(' — ')`) and read through
// `readPhrases`, because a probe fed a fabricated input returns a confident
// meaningless number (three of them did, 2026-11-08).
import fs from 'node:fs';
import { buildRoutePrompt, chooseLine } from '@/tools/statblock-generator/reskin/route.mjs';
import { readPhrases } from '@/tools/statblock-generator/reskin/lexicon.mjs';

const N = Number(process.argv.find((a) => /^\d+$/.test(a)) ?? 5);
const SHOW = process.argv.includes('--show-prompt');
const BASE = process.env.PROBE_BASE_URL ?? 'http://localhost:5173';
const MODEL = process.env.PROBE_MODEL ?? 'deepseek-flash';
const BATCH = 'scripts/smoke-batches/v-route.json';

const cases = JSON.parse(fs.readFileSync(BATCH, 'utf8')).map((e, i) => ({
  n: i + 1,
  concept: [e.name, e.description].map((s) => String(s ?? '').trim()).filter(Boolean).join(' — '),
  cr: e.cr ?? null,
  role: e.role ?? null,
  green: e.green ?? '',
  // the batch states the expectation in prose; the machine-checkable half is
  // whether the sheet may sit on the caster family
  control: /^CONTROL/i.test(e.green ?? ''),
}));

const ask = async (prompt) => {
  const r = await fetch(`${BASE}/api/ai/deepseek`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: prompt }], temperature: 0.2 }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  return String(j?.choices?.[0]?.message?.content ?? '').replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
};

if (SHOW) {
  const c = cases[0];
  console.log(`=== THE PROMPT, AS SENT (case ${c.n}, role=${c.role}) ===\n`);
  console.log(buildRoutePrompt(readPhrases(c.concept), { cr: c.cr, menuRole: c.role }).slice(0, 2600));
  console.log('\n=== (truncated) ===');
  process.exit(0);
}

const LIMIT = Number(process.env.PROBE_CONCURRENCY ?? 8);
const live = new Set();
const gated = async (fn) => {
  while (live.size >= LIMIT) await Promise.race(live);
  const p = (async () => fn())().finally(() => live.delete(p));
  live.add(p); return p;
};

const jobs = cases.map((c) => {
  const text = readPhrases(c.concept);
  return Promise.all(Array.from({ length: N }, () => gated(async () => {
    try {
      const parsed = JSON.parse(await ask(buildRoutePrompt(text, { cr: c.cr, menuRole: c.role })));
      const r = chooseLine(parsed, { text, rawText: c.concept, menuRole: c.role });
      return { line: r?.line ?? 'none', family: r?.archetype ?? 'none', notes: r?.notes ?? [] };
    } catch (e) { return { line: `ERR:${e.message}`, family: 'ERR', notes: [] }; }
  }))).then((rolls) => ({ ...c, rolls }));
});

const results = await Promise.all(jobs);
const tally = (a) => Object.entries(a.reduce((m, x) => ({ ...m, [x]: (m[x] ?? 0) + 1 }), {})).sort((p, q) => q[1] - p[1]);
const fmt = (t) => t.map(([k, v]) => `${k}×${v}`).join(' ');

let offOk = 0; let ctlOk = 0; let offTot = 0; let ctlTot = 0;
for (const r of results) {
  const casters = r.rolls.filter((x) => x.family === 'caster').length;
  const pass = r.control ? casters === N || r.rolls.every((x) => x.family === r.rolls[0].family) : casters === 0;
  if (r.control) { ctlTot += 1; ctlOk += pass ? 1 : 0; } else { offTot += 1; offOk += pass ? 1 : 0; }
  console.log(`${pass ? '✓' : '✗'} #${String(r.n).padStart(2)} [${String(r.role ?? '—').padEnd(10)}] ${r.concept.slice(0, 52)}`);
  console.log(`      green: ${r.green}`);
  console.log(`      lines: ${fmt(tally(r.rolls.map((x) => x.line)))}   families: ${fmt(tally(r.rolls.map((x) => x.family)))}`);
  const why = r.rolls[0].notes.filter((n) => /does not make it one|outside the user|fell to|taken on rank|✓/.test(n)).slice(0, 3);
  if (why.length) console.log(`      roll 1: ${why.join(' | ').slice(0, 170)}`);
}
console.log(`\nGREEN: five non-casters off the caster family ${offOk}/${offTot} · three controls hold ${ctlOk}/${ctlTot}  (N=${N} rolls each)`);
