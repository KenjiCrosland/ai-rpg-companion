// PROBE A — IF THE IDENTITY CALL IS TOLD WHICH PRINTED CREATURE THIS ONE RESEMBLES,
// DOES IT NAME THAT CREATURE'S HALLMARK? (the layered design, 2026-11-14.)
//
// Three arms, one added line of data and no new rules:
//   0  today's prompt
//   1  the model creature's name and its 2024 ROW NAMES (traits, non-attack abilities,
//      anything on a recharge or a daily limit) — the handoff's definition, followed exactly
//   2  the model creature's name and its SIGNATURE SENTENCE from creature-intelligence.json
//
// EVIDENCE ONLY. The arms are built in this probe by inserting a line into the prompt the
// product already builds; nothing in src is changed and nothing in the product sets an arm.
//
// Production's request shape: a system turn, and hidden reasoning disabled for a deepseek
// model (ai-client.mjs:217, ai-adapters.mjs:31). A probe that sent the bare user turn read
// 20/20 where production read 3/10 earlier in this sprint.
//
// ARM 0 IS NOT BLIND, and the report says so: `lexicon.mjs` carries a hand-written CUES list
// that already briefs a print hallmark for five creature words (troll, golem, zombie, spider,
// mephit), so "clockwork spider" is already told "a spider carries print Spider Climb" with no
// arm at all. The medusa, mummy, ghost, ghoul and hag get nothing.
//
//   node --import ./scripts/alias-loader.mjs scripts/probe-layer-a.mjs [N]
import fs from 'node:fs';
import { buildIdentityPrompt } from '@/tools/statblock-generator/format-2024/generate.mjs';
import PRINT from '@/data/srd52-monsters.json';
import INTEL from '@/data/creature-intelligence.json';

const N = Number(process.argv.find((a) => /^\d+$/.test(a)) ?? 5);
const BASE = process.env.PROBE_BASE_URL ?? 'http://localhost:5173';
const MODEL = process.env.PROBE_MODEL ?? 'deepseek-flash';
const LIMIT = Number(process.env.PROBE_CONCURRENCY ?? 6);
const BATCH = JSON.parse(fs.readFileSync('scripts/smoke-batches/layer-probes.json', 'utf8'));
const CASES = (Array.isArray(BATCH) ? BATCH : BATCH.prompts).filter((c) => (c.probes ?? []).includes('A'));
const BLOCKS = Object.fromEntries((Array.isArray(PRINT) ? PRINT : Object.values(PRINT)).map((b) => [b.name, b]));

/** the handoff's arm 1: traits, non-attack abilities, anything gated. NOT plain attack rows. */
const rowNamesOf = (name) => {
  const b = BLOCKS[name]; if (!b) return [];
  const out = [];
  for (const [sec, rs] of Object.entries(b.sections ?? {})) for (const r of rs ?? []) {
    const nm = String(r?.name ?? '');
    if (nm === 'Multiattack') continue;
    const gated = /\((?:Recharge|\d+\/Day)/i.test(nm);
    if (sec === 'Actions' && /Attack Roll/.test(String(r?.text ?? '')) && !gated) continue;
    out.push(`${nm} (${sec})`);
  }
  return out;
};
const signatureOf = (name) => String(INTEL?.[name]?.signature ?? '').trim();

const ANCHOR = 'Return ONLY JSON, no markdown:';
const armPrompt = (c, arm) => {
  const base = buildIdentityPrompt(c.concept, '', { cr: Number(c.cr) });
  if (!arm) return base;
  const line = arm === 1
    ? `\nTHE PRINTED CREATURE THIS ONE RESEMBLES: ${c.model}. Its own published abilities are: ${rowNamesOf(c.model).join('; ') || '(none beyond its attacks and numbers)'}.\n`
    : `\nTHE PRINTED CREATURE THIS ONE RESEMBLES: ${c.model}. What that creature is known for: ${signatureOf(c.model) || '(no entry)'}\n`;
  const i = base.indexOf(ANCHOR);
  if (i < 0) throw new Error('the identity prompt no longer carries the anchor — this probe is out of date');
  return base.slice(0, i) + line + base.slice(i);
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

const roll = async (c, arm) => {
  try {
    const raw = await ask(armPrompt(c, arm));
    const p = JSON.parse(raw);
    return {
      type: p.creature_type ?? null, src: p.type_source ?? null, size: p.size ?? null,
      move: Array.isArray(p.movement) ? p.movement.join('/') : (p.movement ?? null),
      mech: p.signature_mechanic ?? null,
      els: (Array.isArray(p.signature_elements) ? p.signature_elements : []).map((e) => (typeof e === 'string' ? e : `${e?.element ?? e?.text ?? JSON.stringify(e)}${e?.kind ? ` [${e.kind}]` : ''}`)),
    };
  } catch (e) { return { err: String(e.message).slice(0, 70) }; }
};

const out = {};
for (const arm of [0, 1, 2]) {
  out[arm] = await Promise.all(CASES.map(async (c) => ({ c, rolls: await Promise.all(Array.from({ length: N }, () => gated(() => roll(c, arm)))) })));
}

for (const arm of [0, 1, 2]) {
  console.log(`\n################ ARM ${arm} — ${['today\'s prompt', 'model + its 2024 row names', 'model + its signature sentence'][arm]} ################`);
  for (const { c, rolls } of out[arm]) {
    console.log(`\n--- ${c.id}  "${c.concept}"  CR ${c.cr}  model ${c.model}`);
    console.log(`    HALLMARK KEY: ${c.hallmark ?? '(none — control)'}`);
    for (const [i, r] of rolls.entries()) {
      if (r.err) { console.log(`    ${i + 1}. ERR ${r.err}`); continue; }
      console.log(`    ${i + 1}. type=${r.type} (${r.src}) size=${r.size} move=${r.move} mech=${r.mech}`);
      for (const e of r.els) console.log(`         · ${String(e).slice(0, 150)}`);
    }
  }
}
