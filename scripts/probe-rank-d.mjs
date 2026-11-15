// PROBE D — CAN THE IDENTITY CALL RANK ABILITIES? (item 4, 2026-11-14.)
//
// Item 4 assumes the call can be asked for the SHAPE of a creature's six abilities and give
// the same sensible answer every time. Nobody had tested it. Probe C step 1 settled the
// alternative: the printed creature's scores taken as printed are the wrong thing to lend —
// they stranded the attack maths on two sheets and overrode the GM's words on a third.
//
// Three arms, ~220 calls, production's request shape, on a PROBE COPY of the prompt. Nothing
// in the product changes.
//   0  today's prompt                                        12 prompts x 5
//   1  + the rank question, under TWO different chassis lines 12 x 2 x 5
//   2  + the rank question, the model's name and its printed scores   8 x 5
//
// THE ADDED QUESTION, under the handoff's constraints: closed answers, never a number; it
// names the ability the attacks key on; and it asks about the CREATURE from the GM's words,
// in the same spirit as the prompt's own line that the chassis is how it fights, not what it
// is. The four tiers are deliberately wordy rather than numeric so nothing invites a score.
//
//   node --import ./scripts/alias-loader.mjs scripts/probe-rank-d.mjs [N]
import fs from 'node:fs';
import { buildIdentityPrompt } from '@/tools/statblock-generator/format-2024/generate.mjs';
import PRINT from '@/data/srd52-monsters.json';

const N = Number(process.argv.find((a) => /^\d+$/.test(a)) ?? 5);
const BASE = process.env.PROBE_BASE_URL ?? 'http://localhost:5173';
const MODEL = process.env.PROBE_MODEL ?? 'deepseek-flash';
const LIMIT = Number(process.env.PROBE_CONCURRENCY ?? 6);
const CASES = JSON.parse(fs.readFileSync('scripts/smoke-batches/rank-probes.json', 'utf8')).prompts
  ?? JSON.parse(fs.readFileSync('scripts/smoke-batches/rank-probes.json', 'utf8'));
const BLOCKS = Object.fromEntries((Array.isArray(PRINT) ? PRINT : Object.values(PRINT)).map((b) => [b.name, b]));
const KEYS = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
const TIERS = ['feeble', 'ordinary', 'capable', 'formidable'];
// two lines per prompt, deliberately unlike each other, so bar 2 is a real test
const CHASSIS = ['brute-juggernaut', 'lurker-phantom'];

const RANK_Q = `  "ability_shape": {${KEYS.map((k) => `"${k}": "<${TIERS.join('|')}>"`).join(', ')}},
  "attacks_with": "<${KEYS.join('|')} — the ONE ability this creature's own attacks key on>",
`;
const RANK_NOTE = `
THE CREATURE'S ABILITY SHAPE. Rank all six for THIS creature as the GM's words imply it, and
name the one its attacks key on. This is the creature's shape, not its numbers: the engine sets
every score from the chassis's budget and will never read a number from you, so write none.
Rank the creature, not the chassis — the chassis is how it fights, not what it is. A tier is
relative to other creatures of this challenge rating, not to a person.
`;

const ANCHOR = 'Return ONLY JSON, no markdown:';
const promptFor = (c, { rank = false, line = null, model = false } = {}) => {
  const base = buildIdentityPrompt(c.concept, '', { cr: Number(c.cr), ...(line ? { line } : {}) });
  const i = base.indexOf(ANCHOR);
  if (i < 0) throw new Error('the identity prompt no longer carries the anchor — this probe is out of date');
  let out = base;
  if (model && c.model && BLOCKS[c.model]) {
    const s = BLOCKS[c.model].stats ?? {};
    out = out.slice(0, i) + `\nTHE PRINTED CREATURE THIS ONE RESEMBLES: ${c.model}, whose own scores are ${KEYS.map((k) => `${k} ${s[k]}`).join(', ')}. They are that creature's, not necessarily this one's.\n` + out.slice(i);
  }
  if (!rank) return out;
  const j = out.indexOf(ANCHOR);
  const k = out.indexOf('{', j);
  return `${out.slice(0, j)}${RANK_NOTE}${out.slice(j, k + 1)}\n${RANK_Q}${out.slice(k + 1)}`;
};

const ask = async (prompt) => {
  const r = await fetch(`${BASE}/api/ai/deepseek`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'system', content: 'You are an assistant Game Master.' }, { role: 'user', content: prompt }], ...(MODEL.startsWith('deepseek') ? { thinking: { type: 'disabled' } } : {}) }) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  return String(j?.choices?.[0]?.message?.content ?? '').replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
};
const live = new Set();
const gated = async (fn) => { while (live.size >= LIMIT) await Promise.race(live); const p = (async () => fn())().finally(() => live.delete(p)); live.add(p); return p; };

const roll = async (c, opts) => {
  try {
    const p = JSON.parse(await ask(promptFor(c, opts)));
    const sh = p.ability_shape ?? {};
    return {
      type: p.creature_type ?? null, size: p.size ?? null, move: Array.isArray(p.movement) ? p.movement.join('/') : (p.movement ?? null),
      shape: Object.fromEntries(KEYS.map((k) => [k, String(sh[k] ?? '').toLowerCase() || null])),
      on: String(p.attacks_with ?? '').toUpperCase().slice(0, 3) || null,
      wroteNumber: JSON.stringify(sh).match(/\d/) ? JSON.stringify(sh) : null,
    };
  } catch (e) { return { err: String(e.message).slice(0, 60) }; }
};

const modal = (xs) => { const m = {}; for (const x of xs) if (x != null) m[x] = (m[x] ?? 0) + 1; return Object.entries(m).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null; };
const tierIx = (t) => TIERS.indexOf(t);
const run = (c, opts) => Promise.all(Array.from({ length: N }, () => gated(() => roll(c, opts))));

const out = { a0: {}, a1: {}, a2: {} };
for (const c of CASES) {
  out.a0[c.id] = await run(c, {});
  out.a1[c.id] = { [CHASSIS[0]]: await run(c, { rank: true, line: CHASSIS[0] }), [CHASSIS[1]]: await run(c, { rank: true, line: CHASSIS[1] }) };
  if (c.model) out.a2[c.id] = await run(c, { rank: true, model: true });
}
fs.writeFileSync('/tmp/probe-d-raw.json', JSON.stringify(out, null, 1));

// ---- the five bars ----
let steady = 0, blind = 0, sensible = 0, undisturbed = 0;
console.log(`=== PROBE D — ${N} rolls per cell; chassis lines: ${CHASSIS.join(' and ')} ===\n`);
for (const c of CASES) {
  const all1 = [...out.a1[c.id][CHASSIS[0]], ...out.a1[c.id][CHASSIS[1]]].filter((r) => !r.err);
  const L = out.a1[c.id][CHASSIS[0]].filter((r) => !r.err); const R = out.a1[c.id][CHASSIS[1]].filter((r) => !r.err);
  const onMode = modal(L.map((r) => r.on));
  const onSteady = L.filter((r) => r.on === onMode).length >= 4;
  const spread = Math.max(...KEYS.map((k) => { const ix = L.map((r) => tierIx(r.shape[k])).filter((x) => x >= 0); return ix.length ? Math.max(...ix) - Math.min(...ix) : 0; }));
  const isSteady = onSteady && spread <= 1;
  const modeOf = (rs) => Object.fromEntries(KEYS.map((k) => [k, modal(rs.map((r) => r.shape[k]))]));
  const mL = modeOf(L); const mR = modeOf(R);
  const isBlind = KEYS.every((k) => mL[k] === mR[k]) && onMode === modal(R.map((r) => r.on));
  const e = c.expect ?? {};
  const hiOk = (e.high ?? []).every((k) => tierIx(mL[k]) >= 2);
  const loOk = (e.low ?? []).every((k) => tierIx(mL[k]) <= 1);
  const onOk = !(e.attacksOn ?? []).length || (e.attacksOn ?? []).includes(onMode);
  const isSensible = hiOk && loOk && onOk;
  const a0 = out.a0[c.id].filter((r) => !r.err);
  const isUndist = modal(a0.map((r) => r.type)) === modal(all1.map((r) => r.type)) && modal(a0.map((r) => r.size)) === modal(all1.map((r) => r.size)) && modal(a0.map((r) => r.move)) === modal(all1.map((r) => r.move));
  steady += isSteady; blind += isBlind; sensible += isSensible; undisturbed += isUndist;
  console.log(`${c.id}`);
  console.log(`  steady ${isSteady ? '✓' : '✗'} (attacks_with ${onMode} on ${L.filter((r) => r.on === onMode).length}/${L.length}, widest tier spread ${spread})  blind ${isBlind ? '✓' : '✗'}  sensible ${isSensible ? '✓' : '✗'}${isSensible ? '' : ` (high ${hiOk} low ${loOk} on ${onOk})`}  undisturbed ${isUndist ? '✓' : '✗'}`);
  console.log(`  ${CHASSIS[0]}: ${KEYS.map((k) => `${k} ${mL[k]}`).join(', ')}`);
  console.log(`  ${CHASSIS[1]}: ${KEYS.map((k) => `${k} ${mR[k]}`).join(', ')}  (attacks ${modal(R.map((r) => r.on))})`);
  console.log(`  key: high ${(e.high ?? []).join('/') || '—'} low ${(e.low ?? []).join('/') || '—'} attacksOn ${(e.attacksOn ?? []).join('/')}`);
  if (out.a2[c.id]) {
    const A = out.a2[c.id].filter((r) => !r.err); const mA = modeOf(A); const onA = modal(A.map((r) => r.on));
    const a2Steady = A.filter((r) => r.on === onA).length >= 4 && Math.max(...KEYS.map((k) => { const ix = A.map((r) => tierIx(r.shape[k])).filter((x) => x >= 0); return ix.length ? Math.max(...ix) - Math.min(...ix) : 0; })) <= 1;
    const a2Sens = (e.high ?? []).every((k) => tierIx(mA[k]) >= 2) && (e.low ?? []).every((k) => tierIx(mA[k]) <= 1) && (!(e.attacksOn ?? []).length || (e.attacksOn ?? []).includes(onA));
    console.log(`  arm2 (told the model ${c.model}): ${KEYS.map((k) => `${k} ${mA[k]}`).join(', ')}  attacks ${onA}  steady ${a2Steady ? '✓' : '✗'} sensible ${a2Sens ? '✓' : '✗'}`);
  }
  const nums = [...all1, ...(out.a2[c.id] ?? [])].filter((r) => r.wroteNumber);
  if (nums.length) console.log(`  !! wrote a NUMBER in ability_shape on ${nums.length} roll(s): ${nums[0].wroteNumber.slice(0, 90)}`);
  console.log();
}
const n = CASES.length;
console.log('########## THE FIVE BARS ##########');
console.log(`  1 steady      >=10/12 : ${steady}/${n}  ${steady >= 10 ? 'PASS' : 'FAIL — the path is dead'}`);
console.log(`  2 blind       >=10/12 : ${blind}/${n}  ${blind >= 10 ? 'PASS' : 'FAIL'}`);
console.log(`  3 sensible    >=10/12 : ${sensible}/${n}  ${sensible >= 10 ? 'PASS' : 'FAIL'}`);
const mum = out.a2['rank-mummy-librarian'] ?? [];
const mumLow = mum.filter((r) => !r.err && tierIx(r.shape.INT) <= 0).length;
console.log(`  4 words win  (mummy INT not bottom on >=4/5 in arm 2) : bottom on ${mumLow}/${mum.filter((r) => !r.err).length}  ${mum.length - mumLow >= 4 ? 'PASS' : 'FAIL'}`);
console.log(`  5 undisturbed >=11/12 : ${undisturbed}/${n}  ${undisturbed >= 11 ? 'PASS' : 'FAIL'}`);
console.log('\nraw: /tmp/probe-d-raw.json');
