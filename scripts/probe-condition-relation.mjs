// THE CONDITION RELATION, PROBED ALONE (owner's ruling 2026-10-22: "the question").
//
// `imposes` asks one nullable field to collapse FIVE different relationships a row
// can have to a condition — inflicts / requires / immune / self / none. The prompt
// already spells all five out, and the call still answered `imposes: Deafened` for
// the Drowned Choir's One Voice, which GRANTS IMMUNITY to Deafened. So the fix is
// not more instruction; it is to stop making one field carry five relations.
//
// This probes a dedicated enum against hand-labelled rows, through the dev
// server's /api/ai proxy (the key stays server-side). Cheaper than a pipeline run.
//   node scripts/probe-condition-relation.mjs [N]
const N = Number(process.argv.find((a) => /^\d+$/.test(a)) ?? 3);
const BASE = process.env.PROBE_BASE_URL ?? 'http://localhost:5173';
const MODEL = process.env.PROBE_MODEL ?? 'deepseek-flash';

// [label, row name, row text, expected condition, expected relation]
const CASES = [
  // THE DEFECT: an immunity read as an imposition (sweep-2026-10-21T22-17-49)
  ['the defect', 'One Voice', 'When the drowned choir would be deafened or silenced, it sings through every throat it has drowned; a single failing voice does not stop the chord, and it is immune to being deafened.', 'Deafened', 'immune'],
  // plain inflictions
  ['inflicts', 'Paralyzing Touch', 'Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed until the end of its next turn.', 'Paralyzed', 'inflicts'],
  ['inflicts', 'Tail Sweep', 'Each creature in a 15-foot Cone must succeed on a DC 17 Dexterity saving throw or have the Prone condition.', 'Prone', 'inflicts'],
  // a PREREQUISITE, not an application (print's own Trample idiom)
  ['requires', 'Trample', 'The creature makes one Slam attack against one creature within 5 feet that has the Prone condition.', 'Prone', 'requires'],
  ['requires', 'Gorge', 'The worm makes one Bite attack against a creature it is grappling.', 'Grappled', 'requires'],
  // the condition lands on the CREATURE ITSELF
  ['self', 'Reckless Abandon', 'At the start of its turn, the creature can gain Advantage on all melee attack rolls during that turn, but attack rolls against it have Advantage until the start of its next turn.', null, 'none'],
  ['self', 'Mist Form', 'While it has 0 hit points in mist form, it returns to its resting place and is paralyzed until it regains any hit points.', 'Paralyzed', 'self'],
  // another immunity, phrased the 2024 way
  ['immune', 'Sealed Mind', 'The creature has immunity to the Charmed and Frightened conditions.', 'Charmed', 'immune'],
  // ADVERSARIAL — the shapes the collapsed field got wrong
  // requires one condition and inflicts ANOTHER: the answer is the one it INFLICTS
  ['both', 'Finishing Stroke', 'The creature makes one Slam attack against a creature that has the Prone condition. On a hit, the target must succeed on a DC 16 Constitution saving throw or be stunned until the end of its next turn.', 'Stunned', 'inflicts'],
  // flavour only — "frightening" is not the Frightened condition
  ['flavour', 'Dread Aspect', 'Its face is a frightening ruin of bone and tallow, and those who have seen it speak of little else.', null, 'none'],
  // a BONUS against an already-afflicted target: a prerequisite, not an application
  ['requires', 'Cruel Advantage', 'The creature has Advantage on attack rolls against any creature that has the Frightened condition.', 'Frightened', 'requires'],
  // self-imposed as a COST of its own ability
  ['self', 'Overchannel', 'The creature can empower its next spell, and until the end of its next turn it has the Blinded condition.', 'Blinded', 'self'],
  // an immunity granted to OTHERS, not to itself — still not an infliction
  ['immune', 'Hymn of Clarity', 'Allies within 30 feet of the creature cannot be charmed while the hymn continues.', 'Charmed', 'immune'],
  // ENDS a condition rather than applying one. NOTE: labelled 'none' here, but the
  // call answers 'requires' 3/3 and that is defensible — the row does need the ally
  // to have Frightened for it to do anything. Kept as a recorded DISPUTE, not
  // re-labelled to make the score look better. It is immaterial to the engine:
  // only `inflicts` causes a recorded `imposes` to be honoured, so 'requires' and
  // 'none' lead to the same behaviour.
  ['removes*', 'Soothing Word', 'The creature touches one ally and ends the Frightened condition on it.', 'Frightened', 'none'],
  // no condition at all
  ['none', 'Bite', 'Melee Attack Roll: +9, reach 10 ft. 22 (3d10 + 6) Piercing damage.', null, 'none'],
];

const PROMPT = (name, text) => `You are reading ONE row of a D&D 5e monster statblock and reporting what relationship it has to a game CONDITION.

Row name: ${name}
Row text: ${text}

The conditions are: Blinded, Charmed, Deafened, Frightened, Grappled, Incapacitated, Invisible, Paralyzed, Petrified, Poisoned, Prone, Restrained, Stunned, Unconscious.

Answer with ONE JSON object and nothing else:
{ "condition": "<the condition this row involves, or null if it involves none>",
  "relation": "<exactly one of: inflicts | requires | immune | self | none>" }

What the relation values mean:
- "inflicts" — the row APPLIES the condition to a target. This is the only value that means the row hands the condition out.
- "requires" — the row needs a target to ALREADY have the condition for it to work ("a creature that has the Prone condition", "a creature it is grappling"). It applies nothing.
- "immune" — the row says the creature CANNOT be given the condition, or is immune to it.
- "self" — the condition lands on THIS CREATURE, not on a target.
- "none" — the row involves no condition at all. Use null for "condition" when you answer none.

A word that merely DESCRIBES is not the condition: "a frightening ruin", "a horrifying stench", "a paralysing cold" are prose, not rules. Answer none unless the row names the condition as a game effect.`;

const ask = async (prompt) => {
  const r = await fetch(`${BASE}/api/ai/deepseek`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: prompt }], temperature: 1 }) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  return String(j?.choices?.[0]?.message?.content ?? '').replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
};

let right = 0, total = 0; const flips = [];
const consequence = { right: 0, total: 0, bad: [] };
for (const [label, name, text, wantCond, wantRel] of CASES) {
  const got = [];
  for (let i = 0; i < N; i += 1) {
    try {
      const j = JSON.parse(await ask(PROMPT(name, text)));
      got.push(`${j.condition ?? 'null'}/${j.relation}`);
    } catch (e) { got.push(`ERR:${e.message}`); }
  }
  const want = `${wantCond ?? 'null'}/${wantRel}`;
  const ok = got.filter((g) => g === want).length;
  right += ok; total += N;
  for (const g of got) {
    const gotInflicts = /\/inflicts$/.test(g);
    const wantInflicts = wantRel === 'inflicts';
    consequence.total += 1;
    if (gotInflicts === wantInflicts) consequence.right += 1;
    else consequence.bad.push(`${name}: answered ${g}, wanted ${wantInflicts ? 'inflicts' : 'NOT inflicts'}`);
  }
  const uniq = [...new Set(got)];
  if (uniq.length > 1) flips.push(`${name}: ${uniq.join(' | ')}`);
  console.log(`${ok === N ? 'OK  ' : ok === 0 ? 'MISS' : 'MIX '} [${label.padEnd(10)}] ${name.padEnd(18)} want ${want.padEnd(22)} got ${uniq.join(' | ')}`);
}
console.log(`\n${right}/${total} correct across ${CASES.length} cases × ${N} runs`);
// THE NUMBER THAT MATTERS. The engine honours a recorded `imposes` ONLY when the
// relation is `inflicts`, so every other value is the same decision. A confusion
// among requires/immune/self/none costs nothing; confusing any of them WITH
// inflicts is the whole risk.
console.log(`${consequence.right}/${consequence.total} correct on the CONSEQUENCE (inflicts vs not) — the only distinction the engine acts on`);
if (consequence.bad.length) { console.log('  consequence errors:'); consequence.bad.forEach((b) => console.log('    ' + b)); }
if (flips.length) { console.log('\nunstable between runs (the visible stochastic failure the ruling accepts):'); flips.forEach((f) => console.log('  ' + f)); }
