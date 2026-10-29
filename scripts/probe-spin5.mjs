/**
 * PROBE v5: THE CALL WRITES, THE ENGINE CHECKS.
 *
 *   SPIN_CASES=<wide-cases.json> node scripts/probe-spin5.mjs [n]
 *
 * Four rounds sorted out who is good at what, and v3/v4 had it backwards.
 *
 *   v1 (free text)     the prose was fine; four of six were NERFS — a precondition
 *                      bolted onto a row that had none.
 *   v2 (constrained)   the prose was still fine; the hydra moved its damage to a
 *                      MISS, the revenant wrote a trigger true of every living
 *                      target. Coherent English, broken game design.
 *   v3/v4 (ids only)   the model wrote NOTHING and picked from a menu. Its picks
 *                      were mostly defensible — and the ROWS came out incoherent,
 *                      because the ENGINE did the writing, by regex, and orphaned
 *                      trailing clauses: "...moves the target to an unoccupied
 *                      space it can see until the Restrained is destroyed (AC 15;
 *                      HP 20)". That was my substitution, not the model's prose.
 *
 * So: the model WRITES the whole row, because it is good at that. The engine
 * CHECKS declared facts, because it is good at that and the model is not:
 *   - the committed numbers are untouched (dice, DC, attack bonus)
 *   - the new consequence is one from print's menu
 *   - the old consequence is actually gone (a trade, not an addition)
 *   - no precondition was added (the v1/v2 failure)
 *   - the duration survived, if the row had one
 *   - nothing is left referring to the consequence that was removed (the v4 failure)
 */
import fs from 'node:fs';

const ENDPOINT = 'http://localhost:5173/api/ai/deepseek';
const MODEL = 'deepseek-flash';
const LIMIT = Number(process.argv[2] ?? 10);

const MENU = ['Prone', 'Grappled', 'Restrained', 'Poisoned', 'damage each turn', 'Incapacitated', 'moved to another space',
  'Paralyzed', "can't regain Hit Points", 'Hit Point maximum reduced', 'cursed', 'Frightened', 'Speed reduced',
  'pushed away', 'Total Cover inside the creature', 'Unconscious', 'Blinded', 'Disadvantage on its next attack',
  'Charmed', 'suffocating', 'Petrified', 'burning', "can't cast with a Verbal component", 'Deafened', 'Exhaustion', 'Stunned'];

const CONSEQ_RE = /\b(Prone|Grappled|Restrained|Poisoned|Frightened|Blinded|Charmed|Deafened|Stunned|Incapacitated|Paralyzed|Petrified|Unconscious)\b|pushed up to \d+ feet|can'?t regain Hit Points|Speed (?:is )?(?:reduced|halved)|Total Cover|suffocat|starts? burning|\bcursed\b|Exhaustion/gi;
const conseqs = (t) => [...new Set((String(t).match(CONSEQ_RE) ?? []).map((x) => x.toLowerCase()))].sort();
const committed = (t) => (String(t).match(/\d+d\d+(?:\s*[+-]\s*\d+)?|DC \d+|\+\d+/g) ?? []).map((x) => x.replace(/\s+/g, '')).sort();
const GATE = /\bonly (?:if|when|while|against)\b|\bcan (?:use|make) this (?:attack|action) only\b|^while [^,]{3,60},\s*\*?(?:Melee|Ranged)/i;
const DURATION = /until the (?:start|end) of|until it|for 1 minute|escape DC|until cured/i;

const prompt = ({ archetype, creature, cr, clause, row }) => `Rewrite ONE row of a D&D 5e (2024) stat block so it answers what the GM asked for. You are writing the finished row — it must read like print.

THE CREATURE: ${creature}, a ${archetype}, CR ${cr}.
WHAT THE GM TYPED, which the stat block does not yet answer: "${clause}"

THE ROW AS IT STANDS:
${row.name}: ${String(row.text).replace(/\s+/g, ' ')}

TRADE ITS CONSEQUENCE. The row does something to the target besides damage. Replace
that with ONE of these, whichever a GM would recognise as "${clause}" happening:

${MENU.map((m) => `  - ${m}`).join('\n')}

HARD RULES, each one learned from a rewrite that broke:
1. CHANGE NO NUMBERS. Every die, average, DC, bonus, range and reach stays exactly
   as written — they are the creature's CR budget.
2. TRADE, DO NOT ADD. The old consequence is GONE from the row. Do not keep it and
   add another.
3. ADD NO PRECONDITION. The row must fire in just as many situations as before.
   Never "only if", "only while", "only against". A row that stops working most
   rounds is broken, not flavoured.
4. KEEP THE ROW WHOLE. If the old consequence had a duration ("until the end of its
   next turn"), the new one keeps it. If any later sentence referred to the old
   consequence, rewrite that sentence too so nothing dangles — a row that says
   "until the Restrained is destroyed" after you removed Restrained is broken.
5. WRITE IT AS PRINT WRITES IT. Same voice, same order, same punctuation style as
   the row you were given.

Return ONLY JSON:
{"name": "<the row's name — keep it unless the trade makes it a lie>",
 "text": "<the complete rewritten row>",
 "consequence": "<which one from the list you used>",
 "sees": "<one sentence: what the GM watches happen that IS the GM's words>"}`;

const ask = async (body) => {
  const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: body }], temperature: 0.7 }) });
  if (!r.ok) throw new Error(`${r.status} ${String(await r.text()).slice(0, 70)}`);
  return String((await r.json()).choices?.[0]?.message?.content ?? '');
};

const ALL = JSON.parse(fs.readFileSync(process.env.SPIN_CASES, 'utf8')).filter((c) => CONSEQ_RE.test(c.row.text));
const byArch = {}; for (const c of ALL) (byArch[c.archetype] = byArch[c.archetype] ?? []).push(c);
const picked = []; let round = 0;
while (picked.length < LIMIT && round < 40) {
  for (const a of Object.keys(byArch)) { const c = byArch[a][round]; if (c && picked.length < LIMIT) picked.push(c); }
  round += 1;
}

let clean = 0; const fails = {};
const note = (k) => { fails[k] = (fails[k] ?? 0) + 1; };
for (const c of picked) {
  let out;
  try { out = JSON.parse((await ask(prompt(c))).replace(/^```json\s*|```\s*$/g, '').trim()); }
  catch (e) { console.log(`${c.creature}: CALL FAILED ${e.message.slice(0, 60)}`); continue; }
  const before = String(c.row.text).replace(/\s+/g, ' ');
  const after = String(out.text).replace(/\s+/g, ' ');
  console.log(`${'─'.repeat(78)}\n${c.archetype} / CR ${c.cr} / ${c.creature}   GM typed: "${c.clause.slice(0, 46)}"`);
  console.log(`BEFORE  ${c.row.name}: ${before}`);
  console.log(`AFTER   ${out.name}: ${after}`);
  console.log(`  GM sees: ${out.sees}`);
  const problems = [];
  if (JSON.stringify(committed(before)) !== JSON.stringify(committed(after))) { problems.push(`numbers moved (${committed(before).join(',')} -> ${committed(after).join(',')})`); note('numbers'); }
  if (!GATE.test(before) && GATE.test(after)) { problems.push('added a precondition'); note('precondition'); }
  const gone = conseqs(before).filter((x) => !conseqs(after).includes(x));
  const added = conseqs(after).filter((x) => !conseqs(before).includes(x));
  if (!gone.length) { problems.push('nothing was traded away'); note('no trade'); }
  if (!added.length) { problems.push('no new consequence'); note('no new'); }
  if (DURATION.test(before) && !DURATION.test(after)) { problems.push('lost its duration'); note('duration'); }
  // the v4 failure: text still pointing at a consequence that is gone
  for (const g of gone) if (new RegExp(`(?:until|while|the) ${g}\\b`, 'i').test(after)) { problems.push(`dangling reference to "${g}"`); note('dangling'); }
  console.log(problems.length ? `  PROBLEMS: ${problems.join('; ')}` : `  CLEAN — traded [${gone.join(', ')}] for [${added.join(', ')}]`);
  if (!problems.length) clean += 1;
}
console.log(`\n${'='.repeat(78)}\nclean ${clean} of ${picked.length}`);
console.log('failures: ' + (Object.keys(fails).length ? Object.entries(fails).map(([k, v]) => `${k} ${v}`).join('  ') : 'none'));
