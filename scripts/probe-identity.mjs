// Prompt-level probe for the identity call's CLASSIFICATION fields.
// Samples the same prompt N times per concept so a nondeterministic answer can
// be measured as a rate instead of read off one run. Goes through the dev
// server's /api/ai proxy, which injects the key server-side.
//   node --import ./scripts/alias-loader.mjs scripts/probe-identity.mjs [N] [label]
import { buildIdentityPrompt } from '@/tools/statblock-generator/format-2024/generate.mjs';

const N = Number(process.argv[2] ?? 5);
const LABEL = process.argv[3] ?? 'baseline';
const BASE = process.env.PROBE_BASE_URL ?? 'http://localhost:5173';
const MODEL = process.env.PROBE_MODEL ?? 'deepseek-flash';

// expect: themes that must NOT appear, and (for controls) one that must
const CASES = [
  { c: 'a berserker who flies into an unstoppable rage once per day when wounded', cr: 8, archetype: 'brute', banned: ['aerial'], why: '"flies into a rage" is anger' },
  { c: 'an iron-willed inquisitor who never yields ground', cr: 6, archetype: 'defender', banned: ['forged'], why: '"iron-willed" is resolve' },
  { c: 'a troll that grows back unless the blade was silvered', cr: 6, archetype: 'brute', banned: ['verdant', 'forged'], why: '"grows back" is regeneration; the silver is the blade\'s' },
  { c: 'a knight-errant cut off from his fallen order who shields the weak', cr: 7, archetype: 'defender', banned: ['amorphous'], why: '"cut off" is isolation' },
  { c: 'a storm roc that dives on fishing boats from the clouds', cr: 9, archetype: 'skirmisher', banned: [], need: 'aerial', why: 'CONTROL: it really flies' },
  { c: 'an iron golem forged in a volcano', cr: 10, archetype: 'brute', banned: [], need: 'forged', why: 'CONTROL: it really is metal' },
];

const ask = async (prompt) => {
  const r = await fetch(`${BASE}/api/ai/deepseek`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: prompt }], temperature: 1 }),
  });
  if (!r.ok) throw new Error(`${r.status} ${await r.text().catch(() => '')}`.slice(0, 160));
  const j = await r.json();
  return j?.choices?.[0]?.message?.content ?? '';
};
const parse = (t) => { try { return JSON.parse(t.replace(/^```(?:json)?|```$/gm, '').trim()); } catch { return null; } };

console.log(`probe "${LABEL}" — ${N} samples x ${CASES.length} concepts, model ${MODEL}\n`);
let bad = 0; let tot = 0;
// every sample of every concept fires at once: 30 small calls serially took
// longer than the harness allows, and they are independent
const sample = async (k) => {
  const prompt = buildIdentityPrompt(k.c, '', { cr: k.cr, archetype: k.archetype });
  const out = await Promise.all(Array.from({ length: N }, async () => {
    try {
      const p = parse(await ask(prompt));
      return {
        th: ((p?.themes ?? []).map((x) => String(x).toLowerCase())).join('/') || '(none)',
        hv: (p?.hint_verdicts ?? []).filter((h) => h?.cue).map((h) => `${h.cue}${h.accepted ? '✓' : '✗'}`),
      };
    } catch (e) { return { th: `ERR ${e.message.slice(0, 40)}`, hv: [] }; }
  }));
  return { k, seen: out.map((o) => o.th), verdicts: out.flatMap((o) => o.hv) };
};
const results = await Promise.all(CASES.map(sample));
for (const { k, seen, verdicts } of results) {
  const miss = seen.filter((s) => k.banned.some((b) => s.split('/').includes(b)) || (k.need && !s.split('/').includes(k.need)));
  bad += miss.length; tot += seen.length;
  console.log(`${miss.length ? 'MISS' : ' ok '} ${miss.length}/${seen.length}  ${k.c.slice(0, 54)}`);
  console.log(`        ${k.why}`);
  console.log(`        themes: ${[...new Set(seen)].map((s) => `${s} x${seen.filter((x) => x === s).length}`).join(', ')}`);
  if (verdicts.length) console.log(`        hints:  ${[...new Set(verdicts)].map((v) => `${v} x${verdicts.filter((x) => x === v).length}`).join(', ')}`);
}
console.log(`\n"${LABEL}" misread rate: ${bad}/${tot} = ${Math.round((bad / tot) * 100)}%`);
