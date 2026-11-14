// FIX 6 — DOES A COMPOUND WITH A PRINT HEAD ROUTE AS A TWIST ON THAT CREATURE?
//
// "vampire pirate" (typed40 #16) and "ogre blacksmith" should stand on the Vampire and the
// Ogre with a twist. Two controls must NOT: "cathedral-vault ooze" merely contains a print
// word, and "Mind Flayer" is a whole print name, which is `exact` and not a twist.
//
// THE PROOF BELONGS AT THE ROUTING DECISION, not on whole blocks (Fable 5.2's prescription,
// 2026-11-14): one call per prompt, not one block. The decision is part code and part call —
// `dispatch()` returns `twist` when the call answers a print_body with relation "is" — so
// this runs the real prompt and the real dispatcher, and prints BOTH halves.
//
// Production sends no temperature, so neither does this.
//
//   node --import ./scripts/alias-loader.mjs scripts/probe-the-compound-head.mjs [N] [--all] [--show-prompt]
import fs from 'node:fs';
import { buildPathPrompt, validatePathResponse, readPath, dispatch } from '@/tools/statblock-generator/reskin/path.mjs';

const N = Number(process.argv.find((a) => /^\d+$/.test(a)) ?? 5);
const BASE = process.env.PROBE_BASE_URL ?? 'http://localhost:5173';
const MODEL = process.env.PROBE_MODEL ?? 'deepseek-flash';

const FOUR = [
  // THE EXACT typed40 #16 FORM: CR 10, 2014 edition. Probed first at CR 8 / 2024, which is
  // not the case that failed (the canary must match the case — a wrong CR or edition is a
  // different prompt and a different answer).
  { label: 'vampire pirate (#16)', name: '', concept: 'vampire pirate', cr: 10, edition: '2014', want: 'twist', wantBody: 'Vampire', why: 'typed40 #16 verbatim — must flip' },
  { label: 'vampire pirate (2024)', name: '', concept: 'vampire pirate', cr: 8, want: 'twist', wantBody: 'Vampire', why: 'the same words on the 2024 shelf' },
  { label: 'ogre blacksmith', name: '', concept: 'ogre blacksmith', cr: 3, want: 'twist', wantBody: 'Ogre', why: 'must flip' },
  { label: 'cathedral-vault ooze', name: '', concept: 'cathedral-vault ooze', cr: 5, want: null, wantBody: null, why: 'CONTROL — words merely contain a print-ish word; must NOT be a twist on a named body' },
  // The Mind Flayer is NOT in the SRD — it is Product Identity, so `printNameOf` finds
  // nothing and there is no body to twist. The control still holds, for a better reason than
  // the brief gave it: a creature the GM names that print does not have must not be welded
  // onto some other print body that merely sounds close.
  { label: 'Mind Flayer', name: '', concept: 'Mind Flayer', cr: 7, want: null, wantBody: null, why: 'CONTROL — absent from the SRD, so no body to twist' },
];

// THE REQUEST PRODUCTION ACTUALLY SENDS, not an approximation of it. `generateGptResponse`
// prepends a system turn and, for a deepseek model, disables hidden reasoning
// (ai-client.mjs:217, ai-adapters.mjs:31). A first version of this probe sent the bare user
// turn and read 20/20 where the saved runs read 3 of 6 — a probe fed the wrong context
// returns a confident meaningless number, which is the third time this sprint.
const ask = async (prompt) => {
  const body = {
    model: MODEL,
    messages: [{ role: 'system', content: 'You are an assistant Game Master.' }, { role: 'user', content: prompt }],
    ...(MODEL.startsWith('deepseek') ? { thinking: { type: 'disabled' } } : {}),
  };
  const r = await fetch(`${BASE}/api/ai/deepseek`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  return String(j?.choices?.[0]?.message?.content ?? '').replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
};

/** the real decision: code first, and the call only where code does not already decide */
const decide = async (c) => {
  const ed = c.edition ?? '2024';
  const codeOnly = dispatch({ name: c.name, concept: c.concept, role: c.role ?? null, edition: ed }, null);
  if (!codeOnly.failed) return { ...codeOnly, calls: 0 }; // code decided; no call is made in production either
  const raw = await ask(buildPathPrompt({ name: c.name, concept: c.concept, cr: c.cr, role: c.role ?? null, edition: ed }));
  if (!validatePathResponse(raw)) return { path: 'INVALID', receipt: raw.slice(0, 60), calls: 1 };
  // RECEIPTS ARE VALIDATED AGAINST NAME + DESCRIPTION, as production does
  // (StatblockGenerator.vue). Passing the Description alone refuses a receipt quoted from the
  // Name field, which 22 of the 44 key prompts carry — the probe would reject what ships.
  const read = readPath(raw, { concept: `${c.name ?? ''} ${c.concept}`.trim(), edition: ed });
  return { ...dispatch({ name: c.name, concept: c.concept, role: c.role ?? null, edition: ed }, read), calls: 1, read };
};

if (process.argv.includes('--show-prompt')) {
  console.log(buildPathPrompt({ name: '', concept: 'vampire pirate', cr: 8 }));
  process.exit(0);
}

const run = async (cases, { verbose = true } = {}) => {
  const out = [];
  for (const c of cases) {
    const rolls = [];
    for (let i = 0; i < N; i += 1) {
      try { rolls.push(await decide(c)); } catch (e) { rolls.push({ path: 'ERR', receipt: e.message.slice(0, 50) }); }
    }
    const tally = rolls.reduce((m, r) => { const k = `${r.path}${r.print_body ? `:${r.print_body}` : ''}`; return { ...m, [k]: (m[k] ?? 0) + 1 }; }, {});
    const hit = c.want ? rolls.filter((r) => r.path === c.want && (!c.wantBody || r.print_body === c.wantBody)).length : rolls.filter((r) => r.path !== 'twist').length;
    out.push({ ...c, tally, hit, n: N, by: rolls[0]?.by, calls: rolls[0]?.calls });
    if (verbose) {
      const mark = hit === N ? '✓' : '✗';
      console.log(`  ${mark} ${c.label.padEnd(22)} ${String(hit).padStart(2)}/${N}  ${Object.entries(tally).map(([k, v]) => `${k} x${v}`).join('  ')}`);
      console.log(`      ${c.want ? `want ${c.want}${c.wantBody ? ` on the ${c.wantBody}` : ''}` : 'want: anything but a twist'} — ${c.why}  [decided by ${rolls[0]?.by}, ${rolls[0]?.calls} call(s)]`);
    }
  }
  return out;
};

// STEP 2 — EVERY SAVED PROMPT, so an OVER-TRIGGER is visible. One call per prompt, not one
// block. The "before" is not a re-run: each saved sheet recorded its own decision as its
// `[path]` trace line, so the saved runs ARE the before and today's decision is the after.
const savedPrompts = () => {
  // DEDUPED BY PROMPT. typed40 is the same 40 prompts re-run across several dated folders,
  // so walking every sheet costs ~5x the calls for no extra information. One entry per
  // distinct (name, description, CR, edition); every saved decision for it is kept, so a
  // prompt that answered two different ways across runs shows BOTH as its "before".
  const byPrompt = new Map();
  for (const run of fs.readdirSync('smoke-out').filter((d) => /^(typed40|v-regress)-/.test(d))) {
    for (const f of fs.readdirSync(`smoke-out/${run}`).filter((x) => /^\d+.*\.md$/.test(x))) {
      const md = fs.readFileSync(`smoke-out/${run}/${f}`, 'utf8');
      const input = /\*\*Input:\*\* `([^`]*)`/.exec(md)?.[1] ?? null;
      const was = /^\[path\] (\w+)/m.exec(md)?.[1] ?? null;
      if (!input || !was) continue;
      const cr = /— CR ([\d/]+)/.exec(md)?.[1] ?? '5';
      const ed = /— CR [\d/]+, 2014/.test(md) ? '2014' : '2024';
      const [nm, desc] = input.includes(' | ') ? input.split(' | ') : ['', input];
      const key = `${nm}|${desc}|${cr}|${ed}`;
      if (!byPrompt.has(key)) byPrompt.set(key, { label: input.slice(0, 46), name: nm.replace(/^name:\s*/, '').trim(), concept: desc.trim(), cr, edition: ed, saw: new Set(), want: null, why: '' });
      byPrompt.get(key).saw.add(was);
    }
  }
  return [...byPrompt.values()].map((p2) => ({ ...p2, was: [...p2.saw].sort().join('/') }));
};

console.log(`=== STEP 1 — the four prompts, ${N} rolls each ===`);
const four = await run(FOUR);
console.log(`\n  flips: ${four.slice(0, 2).map((c) => `${c.label} ${c.hit}/${c.n}`).join(', ')}`);
console.log(`  controls: ${four.slice(2).map((c) => `${c.label} ${c.hit}/${c.n}`).join(', ')}`);

if (process.argv.includes('--all')) {
  const saved = savedPrompts();
  console.log(`\n=== STEP 2 — every saved prompt (${saved.length}), 1 roll each ===`);
  console.log('  "before" = the [path] line each saved sheet recorded; "after" = the decision today.\n');
  const res = await run(saved, { verbose: false });
  const changed = [];
  for (const r of res) {
    const now = Object.keys(r.tally)[0].split(':')[0];
    if (now !== r.was) changed.push({ ...r, now });
  }
  console.log(`  unchanged: ${res.length - changed.length} of ${res.length}`);
  if (!changed.length) { console.log('  NOTHING CHANGED — no over-trigger, and no prompt newly routed.'); }
  else {
    console.log(`  CHANGED: ${changed.length} — each needs one line saying why it is right, or this is a stop.\n`);
    for (const c of changed) console.log(`    ${String(c.was).padEnd(10)} -> ${String(c.now).padEnd(10)}  ${c.label}`);
  }
  fs.mkdirSync('scripts/smoke-evidence', { recursive: true });
  const outF = `scripts/smoke-evidence/paths-${process.env.PROBE_TAG ?? 'now'}.json`;
  fs.writeFileSync(outF, `${JSON.stringify(res.map((r) => ({ label: r.label, was: r.was, now: Object.keys(r.tally)[0] })), null, 1)}\n`);
  console.log(`\n  wrote ${outF}`);
}
