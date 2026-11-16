// STEP 1's PROBE — THE MIND, UNDER PRODUCTION'S OWN CONDITIONS (item 4, 2026-11-14).
//
// Probe D asked the identity call to rank all six abilities and showed the chassis line drives
// the PHYSICAL answers: STR, DEX and CON matched under two lines on 2, 1 and 1 of 12 prompts.
// INT matched on 12 of 12, under templates as unlike as a golem and a ghost. So the design
// narrowed: the call answers a tier for INT, WIS and CHA only, and code keeps the body.
//
// Probe D's weakness was that it FORCED two unlike lines on every prompt. This runs the line
// the route actually picks (and none where the prompt is thin, as production does for a blank
// roll), with and without the three-tier question.
//
//   arm 0  production's identity prompt, the routed line
//   arm 1  the same, plus the INT/WIS/CHA tier question
//
// 12 route calls + 120 identity calls. Production's request shape (system turn, reasoning
// disabled). A PROBE COPY of the prompt; nothing in the product changes.
//
//   node --import ./scripts/alias-loader.mjs scripts/probe-mind-tiers.mjs [N]
import fs from 'node:fs';
import { buildIdentityPrompt } from '@/tools/statblock-generator/format-2024/generate.mjs';
import { buildRoutePrompt, chooseLine } from '@/tools/statblock-generator/reskin/route.mjs';
import { readPhrases } from '@/tools/statblock-generator/reskin/lexicon.mjs';

const N = Number(process.argv.find((a) => /^\d+$/.test(a)) ?? 5);
const BASE = process.env.PROBE_BASE_URL ?? 'http://localhost:5173';
const MODEL = process.env.PROBE_MODEL ?? 'deepseek-flash';
const LIMIT = Number(process.env.PROBE_CONCURRENCY ?? 6);
const F = 'scripts/smoke-batches/rank-probes.json';
const CASES = (() => { const d = JSON.parse(fs.readFileSync(F, 'utf8')); return d.prompts ?? d; })();
const MIND = ['INT', 'WIS', 'CHA'];
const TIERS = ['feeble', 'ordinary', 'capable', 'formidable'];

// THE QUESTION. Closed tiers, never a number, and only the three the reread showed hold.
const TIER_FIELD = `  "mind_tiers": {${MIND.map((k) => `"${k}": "<${TIERS.join('|')}>"`).join(', ')}},\n`;
const TIER_NOTE = `
THE CREATURE'S MIND. Rank its Intelligence, Wisdom and Charisma for THIS creature as the GM's
words imply — how clever it is, how perceptive and wilful, how forceful or magnetic. Write one
of the four words for each and never a number: the engine sets every score itself and will not
read one from you. Rank the creature, not the chassis; the chassis is how it fights, not what
it is. A tier is relative to other creatures of this challenge rating.
`;

const ask = async (prompt) => {
  const r = await fetch(`${BASE}/api/ai/deepseek`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'system', content: 'You are an assistant Game Master.' }, { role: 'user', content: prompt }], ...(MODEL.startsWith('deepseek') ? { thinking: { type: 'disabled' } } : {}) }) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  return String(j?.choices?.[0]?.message?.content ?? '').replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
};
const live = new Set();
const gated = async (fn) => { while (live.size >= LIMIT) await Promise.race(live); const p = (async () => fn())().finally(() => live.delete(p)); live.add(p); return p; };

/** the line the route actually picks for this prompt — null when it cannot, as a thin roll gets */
const lineFor = async (c) => {
  try {
    const raw = await ask(buildRoutePrompt(c.concept, { cr: Number(c.cr), menuRole: null }));
    const parsed = JSON.parse(raw);
    return chooseLine(parsed, { text: c.concept, rawText: c.concept, menuRole: null, path: null })?.line ?? null;
  } catch { return null; }
};

const ANCHOR = 'Return ONLY JSON, no markdown:';
const promptFor = (c, line, withTiers) => {
  const base = buildIdentityPrompt(readPhrases(c.concept), '', { cr: Number(c.cr), line: line ?? null, resolvedType: null });
  if (!withTiers) return base;
  const j = base.indexOf(ANCHOR);
  if (j < 0) throw new Error('the identity prompt no longer carries the anchor — this probe is out of date');
  const k = base.indexOf('{', j);
  return `${base.slice(0, j)}${TIER_NOTE}${base.slice(j, k + 1)}\n${TIER_FIELD}${base.slice(k + 1)}`;
};

const roll = async (c, line, withTiers) => {
  try {
    const p = JSON.parse(await ask(promptFor(c, line, withTiers)));
    const t = p.mind_tiers ?? {};
    return {
      type: p.creature_type ?? null, size: p.size ?? null,
      move: Array.isArray(p.movement) ? [...p.movement].map(String).sort() : (p.movement ? [String(p.movement)] : []),
      mind: p.mind ?? null,
      tiers: Object.fromEntries(MIND.map((k) => [k, String(t[k] ?? '').toLowerCase() || null])),
      wroteNumber: /\d/.test(JSON.stringify(t)) ? JSON.stringify(t) : null,
    };
  } catch (e) { return { err: String(e.message).slice(0, 60) }; }
};

const modal = (xs) => { const m = {}; for (const x of xs) if (x != null) m[x] = (m[x] ?? 0) + 1; return Object.entries(m).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null; };
const ix = (t) => TIERS.indexOf(t);
const lines = {};
for (const c of CASES) lines[c.id] = await lineFor(c);

const out = {};
for (const c of CASES) {
  out[c.id] = { line: lines[c.id],
    a0: await Promise.all(Array.from({ length: N }, () => gated(() => roll(c, lines[c.id], false)))),
    a1: await Promise.all(Array.from({ length: N }, () => gated(() => roll(c, lines[c.id], true)))) };
}
fs.writeFileSync('scripts/smoke-evidence/PROBE-MIND-raw-2026-11-14.json', `${JSON.stringify({ what: 'step 1 probe for item 4: the identity call, the routed line, with and without the INT/WIS/CHA tier question', tiers: TIERS, lines, out }, null, 1)}\n`);

let steady = 0, sensible = 0, undisturbed = 0;
console.log(`=== THE MIND TIERS — ${N} rolls per arm, the route's own line ===\n`);
for (const c of CASES) {
  const o = out[c.id]; const A0 = o.a0.filter((r) => !r.err); const A1 = o.a1.filter((r) => !r.err);
  const mode = Object.fromEntries(MIND.map((k) => [k, modal(A1.map((r) => r.tiers[k]))]));
  const intSame = A1.filter((r) => r.tiers.INT === mode.INT).length;
  const spread = Math.max(...MIND.map((k) => { const v = A1.map((r) => ix(r.tiers[k])).filter((x) => x >= 0); return v.length ? Math.max(...v) - Math.min(...v) : 0; }));
  const isSteady = intSame >= 4 && spread <= 1;
  const e = c.expect ?? {};
  const hi = (e.high ?? []).filter((k) => MIND.includes(k)); const lo = (e.low ?? []).filter((k) => MIND.includes(k));
  const isSensible = hi.every((k) => ix(mode[k]) >= 2) && lo.every((k) => ix(mode[k]) <= 1);
  const sameSet = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);
  const isUndist = modal(A0.map((r) => r.type)) === modal(A1.map((r) => r.type))
    && modal(A0.map((r) => r.size)) === modal(A1.map((r) => r.size))
    && sameSet(modal(A0.map((r) => JSON.stringify(r.move))) ? JSON.parse(modal(A0.map((r) => JSON.stringify(r.move)))) : [], modal(A1.map((r) => JSON.stringify(r.move))) ? JSON.parse(modal(A1.map((r) => JSON.stringify(r.move)))) : []);
  steady += isSteady; sensible += isSensible; undisturbed += isUndist;
  console.log(`${c.id}   line: ${o.line ?? '(none — thin)'}`);
  console.log(`  steady ${isSteady ? '✓' : '✗'} (INT ${mode.INT} on ${intSame}/${A1.length}, widest mental spread ${spread})  sensible ${isSensible ? '✓' : '✗'}  undisturbed ${isUndist ? '✓' : '✗'}`);
  console.log(`  tiers: ${MIND.map((k) => `${k} ${mode[k]}`).join(', ')}    key high ${hi.join('/') || '—'} low ${lo.join('/') || '—'}`);
  console.log(`  type ${modal(A0.map((r) => r.type))} -> ${modal(A1.map((r) => r.type))} | size ${modal(A0.map((r) => r.size))} -> ${modal(A1.map((r) => r.size))} | mind field ${modal(A1.map((r) => r.mind))}`);
  const nums = A1.filter((r) => r.wroteNumber);
  if (nums.length) console.log(`  !! wrote a NUMBER on ${nums.length} roll(s): ${nums[0].wroteNumber.slice(0, 80)}`);
  console.log();
}
const n = CASES.length;
console.log('########## THE THREE BARS ##########');
console.log(`  steady       >=10/12 : ${steady}/${n}  ${steady >= 10 ? 'PASS' : 'FAIL — the build does not start'}`);
console.log(`  sensible     >=10/12 : ${sensible}/${n}  ${sensible >= 10 ? 'PASS' : 'FAIL'}`);
console.log(`  undisturbed  >=11/12 : ${undisturbed}/${n}  ${undisturbed >= 11 ? 'PASS' : 'FAIL — the build does not start'}`);
console.log('\nraw: scripts/smoke-evidence/PROBE-MIND-raw-2026-11-14.json');
