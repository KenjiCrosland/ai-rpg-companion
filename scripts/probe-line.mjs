// THE CHASSIS LINE ON THE HOMEBREW PATH, PROBED (Five Pipelines brief, step 7).
// The retirement swaps the mechanism: "the concept's VERB outranks the noun" stops
// being a ROUTE DECISION on homebrew, and the call's own ranked pick stands. This
// probe runs ONE route call per sample and feeds the SAME answer to both
// mechanisms, so the comparison is exact and free of call variance.
//   node --import ./scripts/alias-loader.mjs scripts/probe-line.mjs [N] [--only=brief,trap]
import { buildRoutePrompt, chooseLine } from '@/tools/statblock-generator/reskin/route.mjs';
import { readPhrases } from '@/tools/statblock-generator/reskin/lexicon.mjs';

const N = Number(process.argv.find((a) => /^\d+$/.test(a)) ?? 5);
const only = (process.argv.find((a) => a.startsWith('--only=')) ?? '').slice(7).split(',').filter(Boolean);
const BASE = process.env.PROBE_BASE_URL ?? 'http://localhost:5173';
const MODEL = process.env.PROBE_MODEL ?? 'deepseek-flash';

// [group, concept, the hand-labelled line]
const CASES = [
  // the brief's own homebrew five
  ['brief', 'a golem of lashed timber that shoulders through walls', 'brute-juggernaut'],
  ['brief', 'a leviathan of the trench whose song drowns fleets', 'caster'],
  ['brief', 'a plague-bearing archon of flies', 'swarm'],
  ['brief', 'a tyrant of burning brass', 'brute-juggernaut'],
  ['brief', 'a berserker who flies into an unstoppable rage', 'brute'],
  // the brief's next five
  ['brief2', 'the thing in the well', 'lurker'],
  ['brief2', 'pumpkin king', 'caster'],
  ['brief2', 'a coil-bodied horror that seizes a victim', 'brute-grappler'],
  ['brief2', 'a swarm of funeral bells', 'swarm'],
  ['brief2', 'a young storm drake', 'dragon'],
  // THE TRAPS: the three pins whose outcome the override produced today. If the
  // call now ranks these itself, the retirement keeps the outcome; if it does
  // not, the owner rules on the mechanism (the brief's instruction).
  ['trap', "the drowned king's crown, a crab the size of a longboat that wears it and rules the wreck-fields", 'brute-grappler'],
  ['trap', 'a miller who turns into a boar under the moon', 'skirmisher-shifter'],
  ['trap', "a lighthouse keeper's drowned wife who pulls anyone who follows her back down", 'lurker-phantom'],
];

const ask = async (prompt) => {
  const r = await fetch(`${BASE}/api/ai/deepseek`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: prompt }], temperature: 0.2 }) });
  if (!r.ok) throw new Error(`${r.status}`);
  const j = await r.json(); const text = j?.choices?.[0]?.message?.content ?? '';
  return text.replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
};

// A route call takes ~50s, so the samples run CONCURRENTLY with a bounded pool
// (13 prompts x N runs serial is an hour; the engine itself never fans out).
const LIMIT = Number(process.env.PROBE_CONCURRENCY ?? 8);
const live = new Set();
const gated = async (fn) => {
  while (live.size >= LIMIT) await Promise.race(live);
  const p = (async () => fn())().finally(() => live.delete(p));
  live.add(p); return p;
};
const picked = CASES.filter(([g]) => !only.length || only.includes(g));
const jobs = picked.map(([group, concept, want]) => {
  const text = readPhrases(concept);
  const common = { text, rawText: concept, menuRole: null };
  return Promise.all(Array.from({ length: N }, () => gated(async () => {
    try {
      const parsed = JSON.parse(await ask(buildRoutePrompt(text, { cr: null, menuRole: null })));
      return [chooseLine(parsed, { ...common })?.line ?? 'none', chooseLine(parsed, { ...common, path: 'homebrew' })?.line ?? 'none'];
    } catch (e) { return [`ERR:${e.message}`, `ERR:${e.message}`]; }
  }))).then((pairs) => ({ group, concept, want, old: pairs.map((p) => p[0]), neu: pairs.map((p) => p[1]) }));
});
const results = await Promise.all(jobs);
const rows = [];
for (const { group, concept, want, old, neu } of results) {
  const mode = (a) => { const c = {}; a.forEach((x) => { c[x] = (c[x] ?? 0) + 1; }); return Object.entries(c).sort((p, q) => q[1] - p[1]); };
  rows.push({ group, concept, want, old: mode(old), neu: mode(neu), flips: new Set(neu).size > 1, changed: old.join() !== neu.join() });
  const fmt = (m) => m.map(([k, v]) => `${k}×${v}`).join(' ');
  console.log(`${want === neu[0] ? '✓' : '✗'} [${group}] ${concept.slice(0, 58)}\n    want ${want}\n    today ${fmt(rows.at(-1).old)}\n    step7 ${fmt(rows.at(-1).neu)}${rows.at(-1).changed ? '   << CHANGED' : ''}${rows.at(-1).flips ? '   << FLIPS' : ''}`);
}

const hit = (r, which) => r[which][0][0] === r.want && r[which].length === 1;
const tot = rows.length;
console.log(`\n=== ${tot} prompts × ${N} runs`);
console.log(`today: ${rows.filter((r) => hit(r, 'old')).length}/${tot} on the label with no flip`);
console.log(`step7: ${rows.filter((r) => hit(r, 'neu')).length}/${tot} on the label with no flip`);
const changed = rows.filter((r) => r.changed);
console.log(`\nthe mechanism changed the answer on ${changed.length} of ${tot}:`);
for (const r of changed) console.log(`  ${r.want === r.neu[0][0] ? 'KEPT  ' : 'LOST  '} "${r.concept.slice(0, 50)}" want ${r.want}: today ${r.old[0][0]} -> step7 ${r.neu[0][0]}`);
