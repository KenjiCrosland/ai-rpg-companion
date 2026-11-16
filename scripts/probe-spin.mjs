/**
 * PROBE: CAN A CHASSIS ROW CARRY A CLAUSE WITHOUT MOVING A NUMBER?
 *
 *   node scripts/probe-spin.mjs [n]
 *
 * Built OUTSIDE the engine on purpose (owner, 2026-10-29). The idea is to keep
 * the chassis — its rows, its numbers, its CR math — and give ONE row a signature
 * spin so it answers something the GM typed. A sheet carries 4.0 chassis rows, of
 * which 3.2 are not structural, against 0.85 rows that answer the concept, so the
 * headroom is about 3x without lengthening the card or swapping a template.
 *
 * Every case here is REAL: a clause a run left unanswered, beside a chassis row
 * from that same sheet. Fabricated input has made three probes this sprint return
 * confident nonsense, so nothing is invented.
 *
 * The key is never read: the request goes to the dev server's own proxy, which
 * injects the Authorization header server-side.
 *
 * A spin PASSES only if:
 *   - every number, die, DC and range is unchanged (the CR math is untouched)
 *   - the conditions it imposes are unchanged
 *   - the text actually changed, and changed something a GM ADJUDICATES — a new
 *     trigger or circumstance, not new adjectives. Paint is not variety (owner's
 *     one-mechanic-one-name ruling), so a spin that only swaps words has failed
 *     even when it reads nicely.
 */
import fs from 'node:fs';

const ENDPOINT = 'http://localhost:5173/api/ai/deepseek';
const MODEL = 'deepseek-flash';
const CASES = JSON.parse(fs.readFileSync(process.env.SPIN_CASES, 'utf8'));
const LIMIT = Number(process.argv[2] ?? 6);

// every number-bearing token the row commits to
const nums = (s) => (String(s).match(/\d+d\d+(?:\s*[+-]\s*\d+)?|DC \d+|\+\d+|\d+\/\d+|\b\d+\b/g) ?? []).map((x) => x.replace(/\s+/g, '')).sort();
const CONDITIONS = ['Blinded', 'Charmed', 'Deafened', 'Frightened', 'Grappled', 'Incapacitated', 'Invisible', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained', 'Stunned', 'Unconscious'];
const conds = (s) => CONDITIONS.filter((c) => new RegExp(`\\b${c}\\b`).test(String(s))).sort();
// THE RAIL THAT ACTUALLY MATTERS. v1 passed four nerfs as "mechanically safe"
// because the dice held. A row that keeps its numbers and acquires a precondition
// has lost most of its value and the CR maths cannot see it.
const GATE = /\bonly (?:if|when|while|against|on a target|usable)\b|\bcan (?:use|make) this (?:attack|action) only\b|\bmust (?:first|already) (?:be|have)\b|\bprovided that\b/i;
const gated = (s) => GATE.test(String(s));
// a rider counts as present if the row does anything beyond its damage line
const RIDERS = /\b(?:Prone|Grappled|Restrained|Poisoned|Frightened|Blinded|Stunned|Charmed|Deafened|Incapacitated|Paralyzed)\b|\bpushed up to\b|\bknocked\b|\bpulled up to\b/g;
const riders = (s) => [...new Set(String(s).match(RIDERS) ?? [])].sort();

// WHAT A SPIN IS ALLOWED TO BE (v2, 2026-10-29). v1 asked for "a twist on the
// circumstance" and got NERFS: four of six spins bolted a precondition onto a row
// that had none — the revenant's only attack usable solely against a creature
// that had failed a death save, the vampire's Grave Strike only inside its
// garden, Vashka refusing to swing unless an ally stood beside her. Numbers all
// held, which is exactly why "the numbers did not move" is NOT a CR-safety rail:
// a row gated behind a rare circumstance keeps its dice and loses most of its
// value.
//
// So the space is narrower than it first looked. A spin may not ADD power and may
// not RESTRICT use, which leaves two honest moves: SWAP a rider for one of equal
// weight, or MOVE a trigger the row already has to an equally common one.
const prompt = ({ creature, cr, clause, row }) => `You are editing ONE row of a D&D 5e (2024) stat block so it carries something the GM asked for.

THE CREATURE: ${creature}, CR ${cr}.
WHAT THE GM TYPED, which this stat block does NOT yet answer: "${clause}"

THE ROW AS IT STANDS:
${row.name}: ${row.text}

You may make EXACTLY ONE of these two changes, and nothing else:

(A) SWAP A RIDER. The row already does something besides damage — knocks Prone,
    Grapples, pushes, poisons. Replace that with a DIFFERENT effect of the same
    weight that fits the GM's words better. Prone for pushed 10 feet. Grappled for
    Restrained. Poisoned for Frightened. One rider out, one rider in.

(B) MOVE A TRIGGER. The row already fires on something — a hit, a charge of 20
    feet, a failed save. Change WHAT that something is, to a circumstance that
    comes up JUST AS OFTEN and fits the GM's words. "If it moved 20 feet straight
    toward the target" could become "if the target is standing in water or mud".

HARD RULES — a break on any of these makes the answer useless:

1. CHANGE NO NUMBERS. Every die, average, DC, bonus, range and reach stays exactly
   as written. These are the creature's CR budget.
2. ADD NO PRECONDITION. The row must be usable in just as many situations as
   before. Never write "only if", "only while", "only against", "can use this
   attack only" — a creature's attack that stops working most rounds is broken,
   not flavoured. If you choose (B), the new trigger replaces the old one and must
   be no rarer than it was.
3. ADD NOTHING THE CREATURE DID NOT HAVE. No new damage, no extra effect on top,
   no second rider. If you choose (A) the old rider is GONE.
4. TRACK NOTHING NEW. Never key the row on a state the stat block does not already
   say how to judge ("while it sings in one voice", "if a stump is present"). A GM
   must be able to answer your condition by looking at the table.
5. EVERY WORD DOES SOMETHING. "The wound is seared" is not an effect. If you write
   a clause, it must tell the GM what to do.

Return ONLY JSON:
{"change": "A" or "B",
 "name": "<the row's new name>",
 "text": "<the rewritten row>",
 "traded": "<what went OUT and what came IN, in one line>",
 "as_often": "<one sentence: why the row still comes up as often as it did>"}`;

const ask = async (body) => {
  const r = await fetch(ENDPOINT, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: body }], temperature: 0.8 }),
  });
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
  const j = await r.json();
  return String(j.choices?.[0]?.message?.content ?? '');
};

let pass = 0; let numFail = 0; let condFail = 0; let paintFail = 0;
for (const c of CASES.slice(0, LIMIT)) {
  console.log(`\n${'='.repeat(78)}\n${c.creature} (CR ${c.cr})   clause: "${c.clause}"`);
  console.log(`BEFORE  ${c.row.name}: ${c.row.text.replace(/\s+/g, ' ')}`);
  let out;
  try { out = JSON.parse((await ask(prompt(c))).replace(/^```json\s*|```\s*$/g, '').trim()); }
  catch (e) { console.log(`  CALL FAILED: ${e.message.slice(0, 120)}`); continue; }
  console.log(`AFTER   ${out.name}: ${String(out.text).replace(/\s+/g, ' ')}`);
  console.log(`  the GM now rules on: ${out.adjudicates}`);
  // the row's COMMITTED numbers: attack bonus, dice, DCs. A newly named distance
  // inside a swapped rider is not a changed number — v1 failed Vashka for the "5"
  // in "within 5 feet".
  const committed = (t) => (String(t).match(/\d+d\d+(?:\s*[+-]\s*\d+)?|DC \d+|Attack Roll:\*? \+\d+/g) ?? []).map((x) => x.replace(/\s+/g, '')).sort();
  const nOk = JSON.stringify(committed(c.row.text)) === JSON.stringify(committed(out.text));
  const newGate = !gated(c.row.text) && gated(out.text);
  const moved = String(out.text).replace(/\s+/g, ' ') !== String(c.row.text).replace(/\s+/g, ' ');
  const riderIn = riders(out.text).filter((x) => !riders(c.row.text).includes(x));
  const riderOut = riders(c.row.text).filter((x) => !riders(out.text).includes(x));
  console.log(`  declared: ${out.change} — ${out.traded}`);
  console.log(`  still as often: ${out.as_often}`);
  if (!nOk) { numFail += 1; console.log(`  FAIL committed numbers moved: ${committed(c.row.text).join(',')} -> ${committed(out.text).join(',')}`); }
  if (newGate) { condFail += 1; console.log(`  FAIL acquired a precondition — the row now works less often`); }
  if (!moved) { paintFail += 1; console.log('  FAIL text unchanged'); }
  if (riderIn.length || riderOut.length) console.log(`  riders: out [${riderOut.join(', ') || '-'}]  in [${riderIn.join(', ') || '-'}]${riderIn.length && !riderOut.length ? '   <- ADDED without trading' : ''}`);
  if (nOk && !newGate && moved) { pass += 1; console.log('  PASS: numbers held, no new gate, text moved'); }
}
console.log(`\n${'='.repeat(78)}`);
console.log(`PASS ${pass} of ${Math.min(LIMIT, CASES.length)}   committed numbers moved: ${numFail}   acquired a gate: ${condFail}   unchanged: ${paintFail}`);
console.log('Whether each spin is PAINT or a real variant is a judgement call — read the "rules on" lines.');
