/**
 * PROBE v3: THE ENGINE OFFERS A MENU; THE CALL ONLY JUDGES FIT.
 *
 *   SPIN_CASES=<cases.json> node scripts/probe-spin3.mjs [n]
 *
 * v1 asked the model to rewrite a row freely and got NERFS — four of six bolted a
 * precondition onto a row that had none. v2 narrowed it to "swap a rider or move a
 * trigger" with rails against gates, and the breakage got subtler instead of
 * rarer: the hydra moved its damage to a MISS, the revenant wrote a trigger true
 * of every living target, the choir swapped its self-damage clause and never
 * touched the clause it was given, and Vashka re-added her precondition as
 * "While Vashka is within 5 feet of an ally, *Melee Attack Roll:*" — slipping the
 * rail by rephrasing. Three of v2's five passes were bad spins.
 *
 * Patching the rails further is the word-list treadmill. So v3 inverts the
 * mechanism: the ENGINE offers a closed menu drawn from print, and the call
 * answers only WHICH option fits the GM's words. Validation becomes enum
 * membership, which cannot be gamed, and the engine writes the sentence.
 *
 * SCOPE, stated honestly: only the RIDER menu is grounded. Print welds these onto
 * its attack rows — Prone 37, Grappled 27, Poisoned 18, Restrained 11, with a thin
 * tail. A TRIGGER menu would need real extraction; my attempts to pull print's
 * trigger idioms by pattern returned zeros, and guessing them is the very thing
 * this probe exists to avoid. So v3 tests the half that can be grounded, and the
 * trigger half stays open.
 */
import fs from 'node:fs';

const ENDPOINT = 'http://localhost:5173/api/ai/deepseek';
const MODEL = 'deepseek-flash';
const CASES = JSON.parse(fs.readFileSync(process.env.SPIN_CASES, 'utf8'));
const LIMIT = Number(process.argv[2] ?? 6);

// print's own riders on attack rows, with the counts that justify each
const MENU = [
  { id: 'Prone', n: 37, writes: 'the target has the Prone condition' },
  { id: 'Grappled', n: 27, writes: 'the target has the Grappled condition (escape DC {dc})' },
  { id: 'Poisoned', n: 18, writes: 'the target has the Poisoned condition' },
  { id: 'Restrained', n: 11, writes: 'the target has the Restrained condition (escape DC {dc})' },
  { id: 'Frightened', n: 1, writes: 'the target has the Frightened condition' },
  { id: 'Blinded', n: 2, writes: 'the target has the Blinded condition' },
  { id: 'pushed', n: 1, writes: 'the target is pushed up to 10 feet straight away from the creature' },
];
const RIDER_RE = /\b(Prone|Grappled|Restrained|Poisoned|Frightened|Blinded|Charmed|Deafened|Stunned)\b|is pushed up to \d+ feet/;
const riderOf = (t) => (RIDER_RE.exec(String(t)) ?? [])[0] ?? null;

const prompt = ({ creature, cr, clause, row, current }) => `A D&D 5e stat block row carries a rider — an effect it adds on a hit. Pick the rider that best answers what the GM asked for.

THE CREATURE: ${creature}, CR ${cr}.
WHAT THE GM TYPED, which the stat block does not yet answer: "${clause}"
THE ROW: ${row.name}: ${String(row.text).replace(/\s+/g, ' ')}
ITS RIDER TODAY: ${current ?? 'none'}

CHOOSE ONE of these, by id, and nothing outside the list:
${MENU.map((m) => `  ${m.id} — "${m.writes}"`).join('\n')}

Pick the one a GM would recognise as "${clause}" happening at the table. If none of
them says anything about the GM's words, answer "none" — a wrong rider is worse
than leaving the row alone, and "none" is a perfectly good answer.

You are NOT writing any text. The engine writes the sentence. You are only
choosing which effect fits.

Return ONLY JSON: {"rider": "<id from the list, or none>", "because": "<one sentence: what a GM would see at the table that matches the GM's words>"}`;

const ask = async (body) => {
  const r = await fetch(ENDPOINT, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: body }], temperature: 0.7 }),
  });
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
  return String((await r.json()).choices?.[0]?.message?.content ?? '');
};

let inMenu = 0; let none = 0; let offMenu = 0; let changed = 0;
for (const c of CASES.slice(0, LIMIT)) {
  const current = riderOf(c.row.text);
  console.log(`\n${'='.repeat(78)}\n${c.creature} (CR ${c.cr})   clause: "${c.clause}"`);
  console.log(`  row: ${c.row.name}   rider today: ${current ?? 'none'}`);
  let out;
  try { out = JSON.parse((await ask(prompt({ ...c, current }))).replace(/^```json\s*|```\s*$/g, '').trim()); }
  catch (e) { console.log(`  CALL FAILED: ${e.message.slice(0, 110)}`); continue; }
  const pick = String(out.rider ?? '').trim();
  const hit = MENU.find((m) => m.id.toLowerCase() === pick.toLowerCase());
  if (/^none$/i.test(pick)) { none += 1; console.log(`  chose NONE — ${out.because}`); continue; }
  if (!hit) { offMenu += 1; console.log(`  OFF-MENU: "${pick}"`); continue; }
  inMenu += 1;
  if (hit.id !== current) changed += 1;
  console.log(`  chose ${hit.id}${hit.id === current ? '  (unchanged — the row already had it)' : `  (was ${current ?? 'none'})`}`);
  console.log(`  because: ${out.because}`);
  console.log(`  the engine would write: "${hit.writes}"   [print uses it ${hit.n}x on attack rows]`);
}
console.log(`\n${'='.repeat(78)}`);
console.log(`in-menu picks ${inMenu} of ${Math.min(LIMIT, CASES.length)}   off-menu ${offMenu}   declined ${none}   actually changed the row ${changed}`);
console.log('Judge the "because" lines: does a GM see the clause happen, or is the rider merely legal?');
