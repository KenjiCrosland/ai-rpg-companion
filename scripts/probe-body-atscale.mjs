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
const REQS_FULL = null; // replaced below by the real NEEDS_BODY table
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
  // HELD OUT: concepts taken from the actual smoke runs and critic packages, with
  // labels fixed BEFORE the variant was chosen. Variant B scored 26/26 on the
  // tuning set; this set exists because that number was self-graded.
  ['a drowned cathedral choir that sings in one voice',
    { wail: true, 'heated-body': false, adhesive: false }],
  ['a quarry-pit thing of living scree that buries what it catches',
    { adhesive: false, 'marking-light': false, 'resonant-body': false }],
  ['a templar priest with a mace and no magic at all',
    { 'marking-light': false, 'resonant-body': false, 'shell-withdraw': false }],
  ['an archlich enthroned on a sun of bone',
    { 'marking-light': true, adhesive: false }],
  ['a glacier\'s heart given legs, trailing a wake of killing cold',
    { 'heated-body': false, 'noxious-aura': false }],
  ['a cathedral-vault ooze that swallows whoever walks the nave',
    { adhesive: true, 'shell-withdraw': false }],
  ['a skeleton with a greatsword',
    { 'marking-light': false, adhesive: false, wail: false }],
  ['a marsh witch who curses trespassers',
    { 'marking-light': false, 'heated-body': false }],
  ['a brass gate-golem of a desert temple, sand-scoured and hollow',
    { 'resonant-body': true, 'heated-body': false }],
  ['a rust-plated siege engine that belches smoke as it rolls',
    { 'noxious-aura': true, 'marking-light': false }],
  ['a swarm of carrion beetles stripping a battlefield',
    { 'noxious-aura': true, wail: false, 'marking-light': false }],
  ['a courtly duelist in silk, famous for never being touched',
    { adhesive: false, 'heated-body': false, 'resonant-body': false, 'marking-light': false }],
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

const VARIANTS = { B };
// ask EVERY declared requirement, as folding into the route call would, and score
// only the labelled ones. The question is whether 41 at once degrades the 2-4 case.
const { NEEDS_BODY } = await import('@/tools/statblock-generator/reskin/templates.mjs');
for (const [k, v] of Object.entries(NEEDS_BODY)) REQS[k] = v;
const ALL_IDS = Object.keys(NEEDS_BODY);

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
let trueCount = 0; let askedBack = [];
for (const [concept, want] of CASES) {
  const ids = ALL_IDS;                 // ask all 41
  const scored = Object.keys(want);    // score only these
  const seen = Object.fromEntries(ids.map((id) => [id, []]));
  const answered = [];
  for (let i = 0; i < RUNS; i += 1) {
    let got = null;
    try { got = await call(PROMPT(concept, ids)); } catch (e) { bad += 1; continue; }
    answered.push((got?.body_verdicts ?? []).length);
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
  askedBack.push(Math.max(...answered, 0));
  trueCount += ids.filter((id) => seen[id].filter((v) => v === true).length > seen[id].filter((v) => v !== null).length / 2).length;
  for (const id of scored) {
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
console.log(`  verdicts returned per call (max seen): ${askedBack.join(', ')}`);
console.log(`  TRUE verdicts across all 41 x ${CASES.length} concepts: ${trueCount} (a yes-man would return ~${ALL_IDS.length * CASES.length})`);
if (unstable.length) console.log(`  unstable between runs:\n${unstable.map((u) => `    ${u}`).join('\n')}`);
}
