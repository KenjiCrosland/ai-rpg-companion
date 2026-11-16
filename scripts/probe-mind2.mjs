// MIND PROBE 2 — LET THE CALL SAY "UNSAID" (2026-11-15).
//
// Probe 1 (2351622) fixed 3 of 3 mental scores the donor card gets wrong and made none wrong,
// and failed only by DRIFTING a tier where the GM's words say nothing — 4 of 10 such scores
// held the card's tier. A score the words are silent about has no right answer, and the card's
// is usually fine, so a guess there replaces something that may already be right.
//
// Arm `t` is probe 1's question exactly as it ran, rerun today. Arm `u` adds one more answer,
// `unsaid`, and two sentences. Nothing else differs, including the sentence about challenge
// rating. No example creatures and no example words: an example list is a word list.
//
// 18 route calls + 180 identity calls, production's request shape, on a PROBE COPY of the
// prompt. Nothing in the product changes and no flag is added.
//
//   node --import ./scripts/alias-loader.mjs scripts/probe-mind2.mjs [N]
import fs from 'node:fs';
import { buildIdentityPrompt } from '@/tools/statblock-generator/format-2024/generate.mjs';
import { buildRoutePrompt, chooseLine, LINES } from '@/tools/statblock-generator/reskin/route.mjs';
import { readPhrases } from '@/tools/statblock-generator/reskin/lexicon.mjs';
import { pickDonor } from '@/tools/statblock-generator/reskin/scale.mjs';

const N = Number(process.argv.find((a) => /^\d+$/.test(a)) ?? 5);
const BASE = process.env.PROBE_BASE_URL ?? 'http://localhost:5173';
const MODEL = process.env.PROBE_MODEL ?? 'deepseek-flash';
const LIMIT = Number(process.env.PROBE_CONCURRENCY ?? 6);
const KEY = JSON.parse(fs.readFileSync('scripts/smoke-batches/mind-probes.json', 'utf8'));
const MIND = ['INT', 'WIS', 'CHA'];
const TIERS = ['feeble', 'ordinary', 'capable', 'formidable'];

// ARM t — probe 1's question, verbatim from scripts/probe-mind-tiers.mjs
const T_FIELD = `  "mind_tiers": {${MIND.map((k) => `"${k}": "<${TIERS.join('|')}>"`).join(', ')}},\n`;
const T_NOTE = `
THE CREATURE'S MIND. Rank its Intelligence, Wisdom and Charisma for THIS creature as the GM's
words imply — how clever it is, how perceptive and wilful, how forceful or magnetic. Write one
of the four words for each and never a number: the engine sets every score itself and will not
read one from you. Rank the creature, not the chassis; the chassis is how it fights, not what
it is. A tier is relative to other creatures of this challenge rating.
`;

// ARM u — the same, plus `unsaid`. THE EXACT WORDING THAT RAN, fixed before the first call.
const U_FIELD = `  "mind_tiers": {${MIND.map((k) => `"${k}": "<${TIERS.join('|')}|unsaid>"`).join(', ')}},\n`;
const U_NOTE = `
THE CREATURE'S MIND. Rank its Intelligence, Wisdom and Charisma for THIS creature as the GM's
words imply — how clever it is, how perceptive and wilful, how forceful or magnetic. Write one
of the five words for each and never a number: the engine sets every score itself and will not
read one from you. Rank the creature, not the chassis; the chassis is how it fights, not what
it is. A tier is relative to other creatures of this challenge rating.
Answer unsaid when neither the GM's words nor the creature they name tells you anything about
that score. The chassis already carries a score for it that may well be right, and a tier from
you replaces it; unsaid keeps it.
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

/** the route's own line, and the card pickDonor returns for it at that CR */
const routeFor = async (c) => {
  let line = null;
  try {
    const parsed = JSON.parse(await ask(buildRoutePrompt(c.concept, { cr: Number(c.cr), menuRole: null })));
    line = chooseLine(parsed, { text: c.concept, rawText: c.concept, menuRole: null, path: null })?.line ?? null;
  } catch { line = null; }
  if (!line) return { line: null, card: null };
  const L = (LINES ?? []).find((x) => x.id === line) ?? null;
  const d = pickDonor(Number(c.cr), L?.style ?? null, L?.archetype ?? L?.body ?? (String(line).split('-')[0]));
  return { line, card: d ? { id: d.id, INT: d.stats.INT, WIS: d.stats.WIS, CHA: d.stats.CHA } : null };
};

const ANCHOR = 'Return ONLY JSON, no markdown:';
const promptFor = (c, line, arm) => {
  const base = buildIdentityPrompt(readPhrases(c.concept), '', { cr: Number(c.cr), line: line ?? null, resolvedType: null });
  const j = base.indexOf(ANCHOR);
  if (j < 0) throw new Error('the identity prompt no longer carries the anchor — this probe is out of date');
  const k = base.indexOf('{', j);
  const [note, field] = arm === 'u' ? [U_NOTE, U_FIELD] : [T_NOTE, T_FIELD];
  return `${base.slice(0, j)}${note}${base.slice(j, k + 1)}\n${field}${base.slice(k + 1)}`;
};

const roll = async (c, line, arm) => {
  try {
    const p = JSON.parse(await ask(promptFor(c, line, arm)));
    const t = p.mind_tiers ?? {};
    return {
      tiers: Object.fromEntries(MIND.map((k) => [k, String(t[k] ?? '').toLowerCase().trim() || null])),
      type: p.creature_type ?? null, size: p.size ?? null,
      move: Array.isArray(p.movement) ? [...p.movement].map(String).sort() : (p.movement ? [String(p.movement)] : []),
      mind: p.mind ?? null,
      ...(/\d/.test(JSON.stringify(t)) ? { wroteNumber: JSON.stringify(t) } : {}),
    };
  } catch (e) { return { err: String(e.message).slice(0, 70) }; }
};

const out = {};
for (const c of KEY.prompts) {
  const { line, card } = await routeFor(c);
  out[c.id] = { line, card };
  if (!card) { console.log(`  !! ${c.id}: the route gave no line — left unscored`); continue; }
  out[c.id].t = await Promise.all(Array.from({ length: N }, () => gated(() => roll(c, line, 't'))));
  out[c.id].u = await Promise.all(Array.from({ length: N }, () => gated(() => roll(c, line, 'u'))));
}
fs.writeFileSync('scripts/smoke-evidence/PROBE-MIND2-raw-2026-11-15.json',
  `${JSON.stringify({ what: 'mind probe 2: arm t is probe 1\'s question rerun, arm u adds "unsaid". The routed line and the card pickDonor returns for it.', wording: { t: T_NOTE.trim(), u: U_NOTE.trim() }, out }, null, 1)}\n`);

// how often unsaid was used at all, split by whether the words speak to the score
let saidU = { words: 0, silent: 0 }, totU = { words: 0, silent: 0 };
for (const c of KEY.prompts) {
  const o = out[c.id]; if (!o?.u) continue;
  for (const k of MIND) {
    const bucket = c.mind[k].words ? 'words' : 'silent';
    for (const r of o.u.filter((x) => !x.err)) { totU[bucket] += 1; if (r.tiers[k] === 'unsaid') saidU[bucket] += 1; }
  }
}
console.log(`\nunsaid used: ${saidU.words}/${totU.words} on scores the words SPEAK TO, ${saidU.silent}/${totU.silent} on SILENT scores`);
const nums = KEY.prompts.flatMap((c) => [...(out[c.id]?.t ?? []), ...(out[c.id]?.u ?? [])]).filter((r) => r?.wroteNumber);
if (nums.length) console.log(`!! wrote a NUMBER on ${nums.length} roll(s): ${nums[0].wroteNumber.slice(0, 90)}`);
console.log('\nraw: scripts/smoke-evidence/PROBE-MIND2-raw-2026-11-15.json');
