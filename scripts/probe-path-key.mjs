// THE NAMES ARM, SCORED AGAINST path-key.json (2026-11-14).
//
// Two prompts, same code: WITHOUT the offered names (today's prompt) and WITH them. Scoring
// follows the key's own `how_to_score` — what `dispatch()` returns, because that is what the
// generator consumes. The relation is not scored separately; on a homebrew path the body is
// not scored.
//
// Production's request shape: a system turn, and hidden reasoning disabled for a deepseek
// model (ai-client.mjs:217, ai-adapters.mjs:31). Receipts are validated against NAME +
// DESCRIPTION, as StatblockGenerator.vue does — 22 of the 44 key prompts carry a Name, and
// passing the Description alone refuses a receipt quoted from the Name.
//
//   node --import ./scripts/alias-loader.mjs scripts/probe-path-key.mjs [--only <id>]
import fs from 'node:fs';
import { buildPathPrompt, validatePathResponse, readPath, dispatch, namesInTheWords } from '@/tools/statblock-generator/reskin/path.mjs';

const BASE = process.env.PROBE_BASE_URL ?? 'http://localhost:5173';
const MODEL = process.env.PROBE_MODEL ?? 'deepseek-flash';
const LIMIT = Number(process.env.PROBE_CONCURRENCY ?? 6);
const KEY = JSON.parse(fs.readFileSync('scripts/smoke-batches/path-key.json', 'utf8'));
const ONLY = (() => { const i = process.argv.indexOf('--only'); return i > 0 ? process.argv[i + 1] : null; })();

// the 8 watched prompts get 10 rolls, the rest 5
const WATCHED = new Set(['fix6-ogre-blacksmith', 'typed40-16', 'fix6-vampire-pirate-2024', 'ruling3-goblin-assassin', 'typed40-8', 'fix6-ooze-control', 'typed40-13', 'typed40-22']);

const ask = async (prompt) => {
  const r = await fetch(`${BASE}/api/ai/deepseek`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'system', content: 'You are an assistant Game Master.' }, { role: 'user', content: prompt }], ...(MODEL.startsWith('deepseek') ? { thinking: { type: 'disabled' } } : {}) }) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  return String(j?.choices?.[0]?.message?.content ?? '').replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
};
const live = new Set();
const gated = async (fn) => { while (live.size >= LIMIT) await Promise.race(live); const p = (async () => fn())().finally(() => live.delete(p)); live.add(p); return p; };

// STRIPPING THE ARM. The two prompt additions are both gated on a name being found, so
// removing those two spans gives exactly today's prompt.
const stripArm = (prompt, k) => {
  const off = namesInTheWords(k.concept, { edition: k.edition ?? '2024' });
  if (!off.length) return prompt;
  let out = prompt.replace(/\n\nPrinted stat blocks whose names appear in the Description:[^\n]*\n/, '\n');
  out = out.replace(/ {2}"offered_verdicts": \[[\s\S]*?\],\n {2}/, '  ');
  return out;
};

/** the key's rule, applied to what dispatch returns */
const scoreRoll = (k, d) => {
  if (!k.okPaths.includes(d.path)) return false;
  if (d.path === 'homebrew') return true; // the body is not scored there
  const body = d.print_body ?? null;
  if (k.needBody) return !!body && (k.okBodies ?? []).includes(body);
  if (k.okBodies) return body === null || k.okBodies.includes(body);
  return body === null;
};

const oneRoll = async (k, { arm }) => {
  const ed = k.edition ?? '2024';
  let prompt = buildPathPrompt({ name: k.name ?? '', concept: k.concept, cr: k.cr, role: k.role ?? null, edition: ed });
  if (!arm) prompt = stripArm(prompt, k);
  try {
    const raw = await ask(prompt);
    if (!validatePathResponse(raw)) return { path: 'INVALID', raw: raw.slice(0, 70) };
    const p = JSON.parse(raw);
    const read = readPath(raw, { concept: `${k.name ?? ''} ${k.concept}`.trim(), edition: ed });
    const d = dispatch({ name: k.name ?? '', concept: k.concept, role: k.role ?? null, edition: ed }, read);
    const offeredNames = namesInTheWords(k.concept, { edition: ed }).map((o) => o.name);
    return {
      path: d.path, body: d.print_body ?? null, ok: scoreRoll(k, d),
      rawBody: p.print_body ?? null, rawRel: p.relation ?? null, cls: p.class ?? null, sp: p.species ?? null,
      emptyRel: !!p.print_body && !['is', 'resembles'].includes(String(p.relation ?? '').toLowerCase()),
      bodyWasOffered: !!p.print_body && offeredNames.some((n) => n.toLowerCase() === String(p.print_body).toLowerCase()),
      verdicts: Array.isArray(p.offered_verdicts) ? p.offered_verdicts.map((v) => `${v?.name}=${v?.verdict}`).join(',') : null,
    };
  } catch (e) { return { path: 'ERR', raw: String(e.message).slice(0, 60) }; }
};

const runArm = async (arm) => {
  const prompts = KEY.prompts.filter((k) => !ONLY || k.id === ONLY);
  const out = [];
  await Promise.all(prompts.map(async (k) => {
    const n = WATCHED.has(k.id) ? 10 : 5;
    const rolls = await Promise.all(Array.from({ length: n }, () => gated(() => oneRoll(k, { arm }))));
    out.push({ k, rolls, n });
  }));
  return out.sort((a, b) => KEY.prompts.indexOf(a.k) - KEY.prompts.indexOf(b.k));
};

const report = (label, res) => {
  const counted = res.filter((r) => r.k.counts);
  const perfect = counted.filter((r) => r.rolls.every((x) => x.ok));
  const lost = counted.filter((r) => r.rolls.some((x) => !x.ok));
  const multi = res.filter((r) => new Set(r.rolls.map((x) => x.path)).size > 1);
  const allRolls = res.flatMap((r) => r.rolls);
  const empty = allRolls.filter((x) => x.emptyRel);
  console.log(`\n########## ${label} ##########`);
  console.log(`  counted prompts right on EVERY roll: ${perfect.length} of ${counted.length}`);
  console.log(`  counted prompts losing any roll    : ${lost.length}`);
  console.log(`  prompts showing MORE THAN ONE path : ${multi.length} of ${res.length}`);
  console.log(`  rolls with a body named and NO relation: ${empty.length} of ${allRolls.length}  (offered ${empty.filter((x) => x.bodyWasOffered).length}, unprompted ${empty.filter((x) => !x.bodyWasOffered).length})`);
  console.log(`\n  --- the 8 watched ---`);
  for (const r of res.filter((x) => WATCHED.has(x.k.id))) {
    const ok = r.rolls.filter((x) => x.ok).length;
    console.log(`  ${ok === r.n ? '✓' : ok >= 9 ? '~' : '✗'} ${r.k.id.padEnd(26)} ${ok}/${r.n}  ${Object.entries(r.rolls.reduce((m, x) => ({ ...m, [`${x.path}${x.body ? `:${x.body}` : ''}`]: (m[`${x.path}${x.body ? `:${x.body}` : ''}`] ?? 0) + 1 }), {})).sort((a, b) => b[1] - a[1]).map(([a, b]) => `${a} x${b}`).join('  ')}`);
    for (const x of r.rolls.filter((y) => !y.ok).slice(0, 3)) console.log(`       miss raw: body=${x.rawBody} rel=${x.rawRel} class=${x.cls} species=${x.sp} verdicts=[${x.verdicts ?? '-'}]`);
  }
  if (lost.length) {
    console.log(`\n  --- every counted prompt that lost a roll ---`);
    for (const r of lost) {
      const bad = r.rolls.filter((x) => !x.ok);
      console.log(`  ${r.k.id.padEnd(26)} lost ${bad.length}/${r.n}  "${String(r.k.concept).slice(0, 40)}"  want ${r.k.okPaths.join('|')}${r.k.okBodies ? ` on ${r.k.okBodies.join('|')}` : ' with no body'}`);
      for (const x of bad.slice(0, 3)) console.log(`       got ${x.path}${x.body ? `:${x.body}` : ''} | raw body=${x.rawBody} rel=${x.rawRel} class=${x.cls} species=${x.sp} verdicts=[${x.verdicts ?? '-'}]`);
    }
  }
  return { perfect: perfect.length, counted: counted.length, lost, multi: multi.length, empty };
};

console.log(`prompts: ${KEY.prompts.filter((k) => !ONLY || k.id === ONLY).length}; 10 rolls for the 8 watched, 5 for the rest`);
const without = report('WITHOUT the names arm (today\'s prompt)', await runArm(false));
const withArm = report('WITH the names arm', await runArm(true));

console.log(`\n########## THE BARS ##########`);
const w = (id) => withArm;
const named = ['fix6-ogre-blacksmith', 'typed40-16', 'fix6-vampire-pirate-2024', 'ruling3-goblin-assassin', 'typed40-8', 'typed40-13', 'typed40-22'];
console.log(`  bar 2 — more counted prompts right on every roll: ${withArm.perfect} vs ${without.perfect}  ->  ${withArm.perfect > without.perfect ? 'PASS' : 'FAIL'}`);
const over = withArm.lost.filter((r) => r.rolls.filter((x) => !x.ok).length >= (r.n === 10 ? 3 : 2));
console.log(`  bar 2 — none loses 2+ of 5 or 3+ of 10: ${over.length === 0 ? 'PASS' : `FAIL (${over.map((r) => r.k.id).join(', ')})`}`);
console.log(`  more-than-one-path count: ${withArm.multi} with the arm, ${without.multi} without`);
