// IS THIS TRUE OF THE BODY? (step 1+3 of plans/declare-the-body-2026-10-22.md)
//
// The menu screens a template against the creature's JOB and never its BODY, so
// the AI is offered abilities that aren't true and the engine ships its refusals
// anyway (the sticky owlbear). The fix: templates declare what must be true in
// PLAIN WORDS, and the call judges it — never a word list, per the owner's
// standing preference.
//
// The risk worth measuring is NOT whether the model understands the question.
// It is whether the model is AGREEABLE: a judge that says yes to everything is
// the same as no gate at all. So the case mix is deliberately majority-FALSE and
// the headline number is the FALSE-POSITIVE rate.
//
//   node scripts/probe-body-requirement.mjs [runs]
const RUNS = Number(process.argv.find((a) => /^\d+$/.test(a)) ?? 3);
const BASE = process.env.PROBE_BASE_URL ?? 'http://localhost:5173';
const MODEL = process.env.PROBE_MODEL ?? 'deepseek-flash';

// the requirement text that would live on each template as `needs_body`
const REQS = {
  adhesive: 'a surface that is sticky, secreting, or coated in something adhesive',
  'resonant-body': 'a body of metal, crystal, glass, or something hollow that rings when struck',
  'marking-light': 'a body that sheds light, glows, or burns visibly',
  'warded-mending': 'a ward, shrine, charge, or consecrated place it draws strength from',
  'heated-body': 'a body that is burning hot, molten, or wreathed in flame',
  'false-appearance': 'a body that can pass for an ordinary object when it holds still',
  wail: 'a voice, or some way of making sound',
  'shell-withdraw': 'a shell, carapace, or hard case it can pull itself into',
};

// [concept, { id: expected }] — expectations are mine, and the FALSE ones are
// the critic's own package-seven offenders.
const CASES = [
  ['a fierce owlbear that hunts the pine woods and screams when it charges',
    { adhesive: false, wail: true, 'resonant-body': false }],
  ['a vampire lord in a rose-garden mausoleum who bleeds his victims dry',
    { 'warded-mending': false, adhesive: false, 'marking-light': false }],
  ['a venomous lizardfolk raider with a blowpipe and a quiver of darts',
    { 'resonant-body': false, adhesive: false, 'heated-body': false }],
  ['a shadow mage who snuffs out torches and hides in the dark she makes',
    { 'marking-light': false, 'resonant-body': false }],
  // genuine TRUE cases — the gate must not be a wall
  ['a tar-pit horror that drags what it touches down into the black sludge',
    { adhesive: true, 'heated-body': false }],
  ['a brass gate-golem cast as a temple bell, which tolls as it walks',
    { 'resonant-body': true, adhesive: false }],
  ['a will-o-wisp, a cold lantern-flame that leads travellers into the mire',
    { 'marking-light': true, 'resonant-body': false }],
  ['a tomb guardian bound to a consecrated shrine it cannot leave',
    { 'warded-mending': true, 'heated-body': false }],
  ['a mimic shaped like a treasure chest in a dungeon storeroom',
    { adhesive: true, 'false-appearance': true }],
  ['a tortle hermit who draws into his shell when the shouting starts',
    { 'shell-withdraw': true, adhesive: false }],
  ['the heart of a glacier given legs, trailing a wake of killing cold',
    { 'heated-body': false, 'marking-light': false, adhesive: false }],
];

const HEAD = (concept, ids) => `A creature's concept, and a list of BODY REQUIREMENTS. For each one, say whether it is TRUE OF THIS CREATURE'S BODY.

CONCEPT: "${concept}"

REQUIREMENTS:
${ids.map((id) => `- ${id}: ${REQS[id]}`).join('\n')}
`;

const TAIL_JSON = `
"because" must quote the concept's OWN WORDS that settle it, and only for a true answer.

Return ONLY JSON, no markdown: {"body_verdicts":[{"id":"<id copied exactly>","means":<true|false>,"because":"<the concept's own words, or \\"\\">"}]}`;

// A: the first draft. 0 false positives, but 3 false negatives — the cost
// sentence told the model that a false answer is the cheap one.
const A = (concept, ids) => `${HEAD(concept, ids)}
Answer false unless the body REALLY IS that thing. A creature's temperament, its job, its mood or its weapons are not its body: a man with a crab's temperament is not a crab, a fierce bear is not sticky, and a poisoner is not made of metal. A thing the creature merely CARRIES or USES is not its body either. If the concept neither says it nor clearly implies it, the answer is false — a false answer costs the creature one ability it never needed; a wrong true answer puts a rule on the page that the GM can see is nonsense.
${TAIL_JSON}`;

// B: the same discipline, both costs named, and the implication made explicit —
// print's own Mimic HAS Adhesive, so a gate that refuses it is a bad gate.
const B = (concept, ids) => `${HEAD(concept, ids)}
Judge the BODY, not the creature's temperament, job, mood or gear: a man with a crab's temperament is not a crab, a fierce bear is not sticky, and a poisoner is not made of metal. A thing the creature merely CARRIES or USES is not its body.

But the concept does not have to use the requirement's words — judge what the body plainly IS. A pit of tar is sticky without the word "sticky". A thing bound to a shrine HAS a ward. A creature shaped like a chest can pass for one. Say true when the body is plainly that thing even if the concept never names it.

Both mistakes cost something. A wrong TRUE puts a rule on the page a GM can see is nonsense — a bear that glues people to itself. A wrong FALSE takes away an ability the creature obviously should have — a mimic that isn't sticky. Weigh them evenly and answer on the body.
${TAIL_JSON}`;

const VARIANTS = { A, B };
const call = async (prompt) => {
  const r = await fetch(`${BASE}/api/ai/deepseek`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: prompt }], temperature: 0.2 }),
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  const raw = j.choices?.[0]?.message?.content ?? '';
  const m = /\{[\s\S]*\}/.exec(raw);
  return m ? JSON.parse(m[0]) : null;
};

for (const [vname, PROMPT] of Object.entries(VARIANTS)) {
console.log(`\n===== variant ${vname} =====`);
let fp = 0; let fn = 0; let ok = 0; let bad = 0; let noQuote = 0;
const unstable = [];
for (const [concept, want] of CASES) {
  const ids = Object.keys(want);
  const seen = Object.fromEntries(ids.map((id) => [id, []]));
  for (let i = 0; i < RUNS; i += 1) {
    let got = null;
    try { got = await call(PROMPT(concept, ids)); } catch (e) { bad += 1; continue; }
    for (const id of ids) {
      const v = (got?.body_verdicts ?? []).find((x) => x.id === id);
      seen[id].push(v ? !!v.means : null);
      if (v?.means && !String(v.because ?? '').trim()) noQuote += 1;
      // a quote must be the concept's own words
      if (v?.means && String(v.because ?? '').trim()
        && !concept.toLowerCase().includes(String(v.because).trim().toLowerCase().replace(/^["']|["']$/g, '').slice(0, 24))) {
        // not verbatim — report, don't fail the verdict
        seen[id].verbatimMiss = true;
      }
    }
  }
  for (const id of ids) {
    const votes = seen[id].filter((v) => v !== null);
    const uniq = [...new Set(votes)];
    if (uniq.length > 1) unstable.push(`${concept.slice(0, 34)}… / ${id}`);
    const majority = votes.filter((v) => v === true).length > votes.length / 2;
    const expected = want[id];
    if (majority === expected) ok += 1;
    else { if (majority && !expected) fp += 1; else fn += 1; }
    const mark = majority === expected ? 'ok  ' : (majority ? 'FALSE POS' : 'FALSE NEG');
    if (majority !== expected) console.log(`  ${mark.padEnd(10)} ${id.padEnd(17)} want ${String(expected).padEnd(5)} got ${String(majority).padEnd(5)} ${concept.slice(0, 44)}…`);
  }
}
const total = ok + fp + fn;
console.log(`\n  ${ok}/${total} correct over ${RUNS} runs each (${CASES.length} concepts)`);
console.log(`  FALSE POSITIVES (an untrue ability offered): ${fp}   <- the number that matters`);
console.log(`  false negatives (a fair ability withheld):   ${fn}`);
console.log(`  true verdicts with no quote: ${noQuote}   failed calls: ${bad}`);
if (unstable.length) console.log(`  unstable between runs:\n${unstable.map((u) => `    ${u}`).join('\n')}`);
}
