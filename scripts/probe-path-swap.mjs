// STEP 1 — THE SWAP TEST (Fable 5.2's prescription, 2026-11-14). Build nothing until it is read.
//
// The working diagnosis: the path prompt asks the model to judge "monster or people?", never
// says where an ogre falls, and teaches that a people with a job gets a class and NO body.
// That predicts the answer we recorded 7 times in 10 on "ogre blacksmith":
// `class: fighter, print_body: null`.
//
// The seven prompts swap the HEAD and the TRADE independently, all at CR 5 on the 2024 shelf
// so only the words vary. THE PATH ALONE CANNOT TELL THE THREE OUTCOMES APART, so every roll's
// raw answer is recorded: assembly, print_body, relation, class, species, and what readPath
// refused.
//
//   misses are "class filled, body empty", clustered on the ogre -> the head reads as a people
//   misses follow "blacksmith" whatever the head          -> the trade word is the cause
//   the body IS named but relation is not "is"            -> a different defect; the diagnosis is wrong
//
// Production's own request shape: a system turn, and hidden reasoning disabled for a deepseek
// model (ai-client.mjs:217, ai-adapters.mjs:31). A probe that sent only the user turn read
// 20/20 where production read 3/10 — a probe fed the wrong context returns a confident
// meaningless number.
//
//   node --import ./scripts/alias-loader.mjs scripts/probe-path-swap.mjs [N]
import fs from 'node:fs';
import { buildPathPrompt, validatePathResponse, readPath, dispatch } from '@/tools/statblock-generator/reskin/path.mjs';

const N = Number(process.argv.find((a) => /^\d+$/.test(a)) ?? 10);
const BASE = process.env.PROBE_BASE_URL ?? 'http://localhost:5173';
const MODEL = process.env.PROBE_MODEL ?? 'deepseek-flash';
const LIMIT = Number(process.env.PROBE_CONCURRENCY ?? 4);

// THE CLAUSE UNDER TEST, so the same probe can run the prompt as it was before 095a135.
// Stripping it from the built string is exact and needs no module swapping.
const CLAUSE = ' ANSWER THIS INDEPENDENTLY OF "class": they are different questions and both can be filled. If a published creature noun is in the words, name it HERE even when you also answer a class, a trade or a title — the job word describes what the creature DOES, and this field is what it IS';
const asOld = (p) => { const out = p.split(CLAUSE).join(''); if (out === p) throw new Error('the print_body clause was not found — this probe is out of date with path.mjs'); return out; };

const ask = async (prompt) => {
  const r = await fetch(`${BASE}/api/ai/deepseek`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'system', content: 'You are an assistant Game Master.' }, { role: 'user', content: prompt }], ...(MODEL.startsWith('deepseek') ? { thinking: { type: 'disabled' } } : {}) }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  return String(j?.choices?.[0]?.message?.content ?? '').replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
};

const live = new Set();
const gated = async (fn) => { while (live.size >= LIMIT) await Promise.race(live); const p = (async () => fn())().finally(() => live.delete(p)); live.add(p); return p; };

const oneRoll = async (c, { old = false } = {}) => {
  const ed = c.edition ?? '2024';
  let prompt = buildPathPrompt({ name: c.name ?? '', concept: c.concept, cr: c.cr, role: c.role ?? null, edition: ed });
  if (old) prompt = asOld(prompt);
  try {
    const raw = await ask(prompt);
    if (!validatePathResponse(raw)) return { path: 'INVALID', raw: raw.slice(0, 80) };
    const read = readPath(raw, { concept: `${c.name ?? ''} ${c.concept}`.trim(), edition: ed });
    const d = dispatch({ name: c.name ?? '', concept: c.concept, role: c.role ?? null, edition: ed }, read);
    return { path: d.path, body: d.print_body ?? null, dBody: read.print_body ?? null, rel: read.relation ?? null, cls: read.class ?? null, sp: read.species ?? null, asm: read.assembly ?? null, refused: read.refused ?? [] };
  } catch (e) { return { path: 'ERR', raw: String(e.message).slice(0, 60) }; }
};

const runCase = async (c, opts) => ({ ...c, rolls: await Promise.all(Array.from({ length: N }, () => gated(() => oneRoll(c, opts)))) });

/** the shape that tells the three readings apart */
const shapeOf = (r) => (r.path === 'ERR' || r.path === 'INVALID' ? r.path : `${r.dBody ? `body=${r.dBody}` : 'body=null'} rel=${r.rel ?? 'null'} class=${r.cls ?? 'null'}${r.sp ? ` species=${r.sp}` : ''}`);
const tallyOf = (rolls, f) => Object.entries(rolls.reduce((m, r) => ({ ...m, [f(r)]: (m[f(r)] ?? 0) + 1 }), {})).sort((a, b) => b[1] - a[1]);

const SWAP = JSON.parse(fs.readFileSync('scripts/smoke-batches/path-swap.json', 'utf8'));
const KEY = JSON.parse(fs.readFileSync('scripts/smoke-batches/path-key.json', 'utf8'));
const ASH = KEY.prompts.find((p) => p.id === 'typed40-8');

console.log(`=== STEP 1 — the swap test, ${N} rolls each, CR 5 / 2024, current prompt ===\n`);
const swapped = await Promise.all(SWAP.map((c) => runCase(c)));
let bodyNamed = 0; let classNoBody = 0; let total = 0;
for (const c of swapped) {
  const named = c.rolls.filter((r) => r.dBody).length;
  const cnb = c.rolls.filter((r) => !r.dBody && r.cls).length;
  bodyNamed += named; classNoBody += cnb; total += c.rolls.length;
  console.log(`  ${c.id.replace(/^swap-/, '').padEnd(20)} body named ${String(named).padStart(2)}/${N}   class-filled-body-empty ${cnb}/${N}`);
  console.log(`      paths : ${tallyOf(c.rolls, (r) => `${r.path}${r.body ? `:${r.body}` : ''}`).map(([k, v]) => `${k} x${v}`).join('  ')}`);
  for (const [s, v] of tallyOf(c.rolls, shapeOf).slice(0, 3)) console.log(`      answer: ${s}  x${v}`);
  const ref = c.rolls.flatMap((r) => r.refused ?? []);
  if (ref.length) console.log(`      readPath refused: ${[...new Set(ref)].slice(0, 2).join(' | ')}`);
  console.log(`      predicted: ${c.predict}`);
}
console.log(`\n  across all 7: body named ${bodyNamed}/${total}, class-filled-body-empty ${classNoBody}/${total}`);

console.log(`\n=== Mother Ash (typed40-8) — "${ASH.name} | ${ASH.concept}", CR ${ASH.cr} ===`);
for (const [label, opts] of [['OLD prompt (before 095a135)', { old: true }], ['NEW prompt (current)', {}]]) {
  const r = await runCase(ASH, opts);
  const ok = r.rolls.filter((x) => ASH.okPaths.includes(x.path) && ASH.okBodies.includes(x.body)).length;
  console.log(`  ${label.padEnd(28)} right ${ok}/${N}   ${tallyOf(r.rolls, (x) => `${x.path}${x.body ? `:${x.body}` : ''}`).map(([k, v]) => `${k} x${v}`).join('  ')}`);
  for (const [s, v] of tallyOf(r.rolls, shapeOf).slice(0, 3)) console.log(`      answer: ${s}  x${v}`);
}
