// THE EXPRESSION QUOTE, PROBED ALONE (critic's proposal 4, 2026-10-22).
//
// The element receipt failed because MEMBERSHIP is not EXPRESSION: the call named
// one of the creature's own elements and the row shipped a generic template with
// the element's words in its NAME. The decisive exhibit was the one-eyed red
// dragon's Blindside Lash — "a blinded eye from an old lance" over
// damage-on-touch.
//
// So expression becomes its own question, judged by a DIFFERENT call than the one
// that picked the template: "quote the words of this row that carry the element."
// The engine then validates by checking the quote is VERBATIM in the row text —
// the house split: the call judges, the engine validates.
//
// The five twist rows below are REAL, lifted from sweep-2026-10-21T22-17-49, and
// their expected answers encode the critic's own verdict: only Hydra and Vampire
// express theirs mechanically; the dragon, the golem and the lich ship a generic
// template wearing the twist's words.
//   node scripts/probe-expression-quote.mjs [N]
const N = Number(process.argv.find((a) => /^\d+$/.test(a)) ?? 3);
const BASE = process.env.PROBE_BASE_URL ?? 'http://localhost:5173';
const MODEL = process.env.PROBE_MODEL ?? 'deepseek-flash';

// [label, row name, row text, element, expresses?]
const CASES = [
  ['THE EXHIBIT', 'Blindside Lash',
    'A creature that touches the dragon or hits it with a melee attack while within 5 feet of it takes 10 (3d6) fire damage.',
    'a blinded eye from an old lance', false],
  ['generic', 'Sorrowful Wrath',
    'While Bloodied, the stone golem has Advantage on attack rolls.',
    'carved saint in stone, weeping', false],
  ['generic', 'Shard Retort',
    'A creature that touches the sun lich or hits it with a melee attack while within 5 feet of it takes 10 (3d6) necrotic damage.',
    'a throne-core sun of splintered bone', false],
  ['expresses', 'Smoldering Stumps',
    'The first time the hydra has half of its hit points or fewer in a fight, it releases a burst. Each creature within 15 feet of the hydra must make a DC 16 Constitution saving throw, taking 24 (7d6) fire damage on a failed save, or half as much damage on a successful one. On a failed save, the target is also blinded until the end of its next turn.',
    'a scalding, blinding smoke shroud that thickens as it is wounded', true],
  ['expresses', 'Briar Regrowth',
    'The vampire regains 20 hit points at the start of each of its turns if it has at least 1 hit point and thorns is within 30 feet of it.',
    'bleeding vines and blood-fed roses that reknit its flesh', true],
  // controls
  ['control yes', 'Tail-Blow Drag',
    'Melee Attack Roll: +9, reach 15 ft. 16 (2d10 + 5) Bludgeoning damage, and the target is pulled up to 10 feet toward the wyrm and has the Prone condition.',
    'a tail that sweeps riders out of the saddle', true],
  ['control no', 'Iron Fury',
    'While Bloodied, the creature has Advantage on attack rolls.',
    'a forge-hot hide that scalds what touches it', false],
];

const PROMPT = (name, text, element) => `A monster's statblock row is supposed to EXPRESS one of the creature's distinctive features. Your job is to say whether it actually does, by quoting the words of the row that carry it.

The feature: "${element}"

The row:
${name}. ${text}

Answer with ONE JSON object and nothing else:
{ "quote": "<the exact words from the ROW TEXT that carry the feature, copied verbatim — or null if the row does not carry it>" }

Rules:
- The quote MUST be copied verbatim from the row text above. Do not paraphrase and do not quote the row's NAME.
- A row carries the feature only if its RULES do. A name that sounds like the feature is not the feature; neither is damage of a plausible type on its own.
- If the row would read the same for a creature without this feature at all, answer null.
- But PART of the feature is enough. If any clause of the row's rules carries any part of it — a condition it imposes, a trigger, a movement, a damage type that the feature specifically calls for — quote that clause. The row need not capture the whole feature.`;

const ask = async (prompt) => {
  const r = await fetch(`${BASE}/api/ai/deepseek`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: prompt }], temperature: 1 }) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  return String(j?.choices?.[0]?.message?.content ?? '').replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
};

// the ENGINE's half: a quote only counts if it is verbatim in the row text
const verbatim = (q, text) => !!q && text.toLowerCase().includes(String(q).toLowerCase().trim());

let right = 0, total = 0, fabricated = 0; const flips = [];
for (const [label, name, text, element, want] of CASES) {
  const got = [];
  for (let i = 0; i < N; i += 1) {
    try {
      const j = JSON.parse(await ask(PROMPT(name, text, element)));
      const q = j.quote ?? null;
      if (q && !verbatim(q, text)) { fabricated += 1; got.push('FABRICATED'); continue; }
      got.push(q ? 'expresses' : 'none');
    } catch (e) { got.push(`ERR:${e.message}`); }
  }
  const wanted = want ? 'expresses' : 'none';
  const ok = got.filter((g) => g === wanted).length;
  right += ok; total += N;
  const uniq = [...new Set(got)];
  if (uniq.length > 1) flips.push(`${name}: ${uniq.join(' | ')}`);
  console.log(`${ok === N ? 'OK  ' : ok === 0 ? 'MISS' : 'MIX '} [${label.padEnd(11)}] ${name.padEnd(19)} want ${wanted.padEnd(9)} got ${uniq.join(' | ')}`);
}
console.log(`\n${right}/${total} correct across ${CASES.length} cases × ${N} runs`);
console.log(`${fabricated} quote(s) were NOT verbatim in the row text — the engine rejects these outright`);
if (flips.length) { console.log('\nunstable between runs:'); flips.forEach((f) => console.log('  ' + f)); }
