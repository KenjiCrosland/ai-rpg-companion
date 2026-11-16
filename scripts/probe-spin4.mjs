/**
 * PROBE v4: NARROW ON TRIGGER, WIDE ON CONSEQUENCE.
 *
 *   SPIN_CASES=<wide-cases.json> node scripts/probe-spin4.mjs [n]
 *
 * The owner's split (2026-10-29), and the corpus agrees with it:
 *
 *   TRIGGERS are narrow because print's are. Stripping the size gates that
 *   condition a rider, print keys attack riders on STATE and nothing else — the
 *   attack roll had Advantage (6), the creature is Bloodied (11), the target is
 *   Grappled by it (4), the target is wounded (5), the attack dropped it to 0 (4).
 *   Print NEVER keys one on terrain or weather: "in water or mud" appears once in
 *   329 blocks. That matters, because a trigger's whole safety requirement is that
 *   it fires as often as the one it replaced, and an environmental trigger's
 *   frequency is unknowable — it could be every round or never.
 *
 *   CONSEQUENCES are wide because print's are. 28 distinct things print does to a
 *   target, from Prone (55) down to Invisible (1).
 *
 * v3 had this backwards: a 7-item rider menu and no triggers. It declined half its
 * cases for want of vocabulary and the picks it did make were mostly power added
 * where no rider existed.
 *
 * TRADE ONLY. v1 bolted on preconditions, v2 inverted a trigger to fire on a miss,
 * v3 added riders to rows that had none. So: one consequence out, one in — and a
 * row with no consequence to trade is not a candidate. The model writes NO text;
 * it answers with ids, and the engine writes the sentence.
 */
import fs from 'node:fs';

const ENDPOINT = 'http://localhost:5173/api/ai/deepseek';
const MODEL = 'deepseek-flash';
const LIMIT = Number(process.argv[2] ?? 14);

// NARROW: print's own state triggers, with the counts that justify each
const TRIGGERS = [
  { id: 'advantage', n: 6, writes: 'if the attack roll had Advantage' },
  { id: 'bloodied', n: 11, writes: 'while the creature is Bloodied' },
  { id: 'grappled_by_it', n: 4, writes: 'if the target is Grappled by the creature' },
  { id: 'wounded', n: 5, writes: "if the target doesn't have all its Hit Points" },
  { id: 'dropped_to_0', n: 4, writes: 'if the attack reduces the target to 0 Hit Points' },
];
// WIDE: everything print visits on a target
const CONSEQUENCES = [
  { id: 'Prone', n: 55, writes: 'the target has the Prone condition' },
  { id: 'Grappled', n: 38, writes: 'the target has the Grappled condition (escape DC {dc})' },
  { id: 'Restrained', n: 29, writes: 'the target has the Restrained condition (escape DC {dc})' },
  { id: 'Poisoned', n: 24, writes: 'the target has the Poisoned condition' },
  { id: 'damage_each_turn', n: 20, writes: 'the target takes {dmg} damage at the start of each of its turns' },
  { id: 'Incapacitated', n: 19, writes: 'the target has the Incapacitated condition' },
  { id: 'displaced', n: 16, writes: 'the creature moves the target to an unoccupied space it can see' },
  { id: 'Paralyzed', n: 14, writes: 'the target has the Paralyzed condition' },
  { id: 'no_healing', n: 13, writes: "the target can't regain Hit Points" },
  { id: 'hp_max_reduced', n: 12, writes: 'the target&apos;s Hit Point maximum is reduced by {dmg}' },
  { id: 'cursed', n: 12, writes: 'the target is cursed' },
  { id: 'Frightened', n: 11, writes: 'the target has the Frightened condition' },
  { id: 'speed_reduced', n: 11, writes: "the target's Speed is reduced by 10 feet" },
  { id: 'pushed', n: 8, writes: 'the target is pushed up to 10 feet straight away from the creature' },
  { id: 'total_cover', n: 8, writes: 'the target is enclosed and has Total Cover against attacks from outside the creature' },
  { id: 'Unconscious', n: 7, writes: 'the target has the Unconscious condition' },
  { id: 'Blinded', n: 6, writes: 'the target has the Blinded condition' },
  { id: 'disadvantage_attacks', n: 6, writes: 'the target has Disadvantage on its next attack roll' },
  { id: 'Charmed', n: 5, writes: 'the target has the Charmed condition' },
  { id: 'suffocating', n: 5, writes: 'the target is suffocating' },
  { id: 'Petrified', n: 4, writes: 'the target has the Petrified condition' },
  { id: 'burning', n: 4, writes: 'the target starts burning' },
  { id: 'no_verbal', n: 4, writes: "the target can't cast spells with a Verbal component" },
  { id: 'Deafened', n: 3, writes: 'the target has the Deafened condition' },
  { id: 'Exhaustion', n: 3, writes: 'the target gains 1 Exhaustion level' },
  { id: 'Stunned', n: 2, writes: 'the target has the Stunned condition' },
];

const CONSEQ_RE = /\b(Prone|Grappled|Restrained|Poisoned|Frightened|Blinded|Charmed|Deafened|Stunned|Incapacitated|Paralyzed|Petrified|Unconscious)\b|is pushed up to \d+ feet|can'?t regain Hit Points|Speed (?:is )?(?:reduced|halved)|Total Cover|suffocat|starts burning|\bcursed\b/i;
const has = (t) => CONSEQ_RE.test(String(t));
const current = (t) => (CONSEQ_RE.exec(String(t)) ?? [])[0] ?? null;

const prompt = ({ archetype, creature, cr, clause, row }) => `A D&D 5e stat block row has a CONSEQUENCE — what it does to a target besides damage. Trade it for one that answers what the GM asked for.

THE CREATURE: ${creature}, a ${archetype}, CR ${cr}.
WHAT THE GM TYPED, which the stat block does not yet answer: "${clause}"
THE ROW: ${row.name}: ${String(row.text).replace(/\s+/g, ' ')}
ITS CONSEQUENCE TODAY: ${current(row.text) ?? 'none'}

Choose ONE consequence from this list, by id, to replace the one the row has:
${CONSEQUENCES.map((m) => `  ${m.id}  — "${m.writes}"`).join('\n')}

You may ALSO move what the row fires on, choosing one of these or "keep":
${TRIGGERS.map((m) => `  ${m.id}  — "${m.writes}"`).join('\n')}

RULES
- This is a TRADE. The old consequence is gone. Nothing is added on top.
- Pick what a GM would SEE at the table and recognise as "${clause}". If nothing on
  the list says anything about the GM's words, answer "none" — a legal-but-unrelated
  consequence is worse than leaving the row alone, and "none" is a good answer.
- A trigger you move to must come up about as often as what it replaced. If you are
  not sure, answer "keep".
- You write NO text. The engine writes the sentence. You only choose.

Return ONLY JSON: {"consequence": "<id or none>", "trigger": "<id or keep>", "sees": "<one sentence: what the GM watches happen that IS the GM's words>"}`;

const ask = async (body) => {
  const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: body }], temperature: 0.7 }) });
  if (!r.ok) throw new Error(`${r.status} ${String(await r.text()).slice(0, 80)}`);
  return String((await r.json()).choices?.[0]?.message?.content ?? '');
};

// stratify: spread the sample across archetypes rather than taking the first N,
// which would be all brutes (171 of the 312 harvested cases are brute rows)
const ALL = JSON.parse(fs.readFileSync(process.env.SPIN_CASES, 'utf8')).filter((c) => has(c.row.text));
const byArch = {};
for (const c of ALL) (byArch[c.archetype] = byArch[c.archetype] ?? []).push(c);
const picked = [];
let round = 0;
while (picked.length < LIMIT && round < 40) {
  for (const a of Object.keys(byArch)) { const c = byArch[a][round]; if (c && picked.length < LIMIT) picked.push(c); }
  round += 1;
}
console.log(`trade-eligible cases: ${ALL.length} of the harvest   sampling ${picked.length} across ${Object.keys(byArch).length} archetypes\n`);

let traded = 0; let declined = 0; let offMenu = 0; const perArch = {};
for (const c of picked) {
  let out;
  try { out = JSON.parse((await ask(prompt(c))).replace(/^```json\s*|```\s*$/g, '').trim()); }
  catch (e) { console.log(`${c.archetype} ${c.row.name}: CALL FAILED ${e.message.slice(0, 70)}`); continue; }
  const cq = String(out.consequence ?? '').trim();
  const tg = String(out.trigger ?? 'keep').trim();
  const cHit = CONSEQUENCES.find((m) => m.id.toLowerCase() === cq.toLowerCase());
  const tHit = TRIGGERS.find((m) => m.id.toLowerCase() === tg.toLowerCase());
  perArch[c.archetype] = perArch[c.archetype] ?? { t: 0, d: 0 };
  console.log(`${'─'.repeat(78)}\n${c.archetype} / CR ${c.cr} / ${c.creature}   clause: "${c.clause.slice(0, 44)}"`);
  console.log(`  row ${c.row.name}  (consequence today: ${current(c.row.text)})`);
  if (/^none$/i.test(cq)) { declined += 1; perArch[c.archetype].d += 1; console.log(`  DECLINED — ${out.sees}`); continue; }
  if (!cHit) { offMenu += 1; console.log(`  OFF-MENU "${cq}"`); continue; }
  traded += 1; perArch[c.archetype].t += 1;
  console.log(`  ${current(c.row.text)}  ->  ${cHit.id}${tHit ? `   trigger -> ${tHit.id}` : '   trigger kept'}`);
  console.log(`  engine writes: "${cHit.writes}"${tHit ? ` ${tHit.writes}` : ''}`);
  console.log(`  print backing: consequence ${cHit.n}x${tHit ? `, trigger ${tHit.n}x` : ''}`);
  console.log(`  GM sees: ${out.sees}`);
}
console.log(`\n${'='.repeat(78)}`);
console.log(`traded ${traded}   declined ${declined}   off-menu ${offMenu}`);
console.log('by archetype: ' + Object.entries(perArch).map(([a, v]) => `${a} ${v.t}t/${v.d}d`).join('  '));
