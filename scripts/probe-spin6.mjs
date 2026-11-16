/**
 * PROBE v6: IDEA -> SLOT -> MODIFICATION, as three separate stages.
 *
 *   CHASSIS=<chassis.json> node scripts/probe-spin6.mjs "<concept>" <chassis-id>
 *
 * The owner's proof of concept (2026-10-29): "1) idea 2) selection of chassis row
 * to modify 3) modification — and let's see if the modified row is technically
 * sound", against a concept whose whole point is that it should NOT read like the
 * generic chassis it is built on.
 *
 * Each stage is its own call so each can be judged on its own:
 *   1. TEN IDEAS for the concept, with no chassis shown at all — so the ideas are
 *      about the creature, not about what happens to be convenient to edit.
 *   2. SLOT SELECTION. The chassis is shown with its rows, and the call says which
 *      row each idea belongs on, or none. A row it picks that cannot carry the
 *      idea is as useful a result as one it can.
 *   3. MODIFICATION of that row, under the rules four earlier rounds established:
 *      trade, never add; no new precondition; numbers untouched; keep the row whole.
 *
 * Then the engine judges stage 3 on facts, and prints the generic row beside the
 * modified one so the difference (or the absence of one) is visible.
 */
import fs from 'node:fs';

const ENDPOINT = 'http://localhost:5173/api/ai/deepseek';
const MODEL = 'deepseek-flash';
const CONCEPT = process.argv[2] ?? 'the Pumpkin King';
const CHASSIS_ID = process.argv[3] ?? 'brute-11-charger';
const CHASSIS = JSON.parse(fs.readFileSync(process.env.CHASSIS, 'utf8'))[CHASSIS_ID];
const HOW_MANY_TO_BUILD = Number(process.argv[4] ?? 4);

const ask = async (body, temp = 0.9) => {
  const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: body }], temperature: temp }) });
  if (!r.ok) throw new Error(`${r.status} ${String(await r.text()).slice(0, 80)}`);
  return String((await r.json()).choices?.[0]?.message?.content ?? '');
};
const json = (s) => JSON.parse(String(s).replace(/^```json\s*|```\s*$/g, '').trim());

// the chassis as a GM would read it, tokens and all
const sheet = CHASSIS.rows.map((r, i) => `  ${i + 1}. [${r.section}] ${r.name}: ${r.text.replace(/\s+/g, ' ')}`).join('\n');

// ---------------------------------------------------------------- stage 1
const ideasPrompt = `${CONCEPT} is a D&D monster at CR ${CHASSIS.cr}.

Give TEN abilities it should have. Think about what makes this creature itself and
not a generic monster of its kind — what a player would remember a week later.

Each is one sentence of plain English describing what happens at the table. Do not
write stat block text, do not pick numbers, do not worry about balance yet.

Return ONLY JSON: {"ideas": ["...", ... ten of them]}`;

// ---------------------------------------------------------------- stage 2
const slotPrompt = (ideas) => `A D&D stat block for ${CONCEPT} (CR ${CHASSIS.cr}) is built on a standard chassis. Here are its rows exactly as they stand — these are the GENERIC rows every creature of this kind gets:

${sheet}

Here are ten abilities the creature ought to have:
${ideas.map((x, i) => `  ${String.fromCharCode(97 + i)}. ${x}`).join('\n')}

For each idea, say which ONE chassis row above could be MODIFIED to carry it —
by its number — or "none" if no row on this chassis could ever express it.

A row can carry an idea when the idea is the same KIND of thing the row already
does: a row that damages one creature it hits can carry another on-hit effect; it
cannot carry an aura, a summon, or something that happens while the creature is
elsewhere. Be strict — "none" is the right answer more often than not.

Return ONLY JSON: {"map": [{"idea": "<letter>", "row": <number or "none">, "why": "<one short clause>"}, ...]}`;

// ---------------------------------------------------------------- stage 3
const modPrompt = (idea, row) => `Rewrite ONE row of a D&D 5e (2024) stat block so it carries a specific ability. Write the finished row; it must read like print.

THE CREATURE: ${CONCEPT}, CR ${CHASSIS.cr}.
THE ABILITY IT MUST CARRY: ${idea}

THE ROW AS IT STANDS (a generic ${CHASSIS.style} row):
${row.name}: ${row.text.replace(/\s+/g, ' ')}

RULES — each one learned from a rewrite that broke:
1. CHANGE NO NUMBERS. Every die, average, DC, bonus, range and reach stays exactly
   as written. They are the creature's CR budget. Tokens like {damage_type} and
   {save_stat} stay as tokens.
2. TRADE, DO NOT ADD. Whatever the row did to the target besides damage is REPLACED.
   Do not keep it and add another effect on top.
3. ADD NO PRECONDITION. The row must fire in as many situations as before. Never
   "only if", "only while", "only against".
4. KEEP THE ROW WHOLE. If the old effect had a duration, the new one keeps it. If a
   later sentence referred to the old effect, rewrite it so nothing dangles.
5. SAME VOICE. Same clause order and punctuation style as the row you were given.

Return ONLY JSON: {"name": "<the row's new name>", "text": "<the complete rewritten row>", "traded": "<what went out, what came in>"}`;

// ---------------------------------------------------------------- the facts the engine can check
const committed = (t) => (String(t).match(/\d+d\d+(?:\s*[+-]\s*\d+)?|DC \d+|\+\d+|reach \d+|range [\d/]+|\{[a-z_]+\}/g) ?? []).map((x) => x.replace(/\s+/g, '')).sort();
const CONSEQ = /\b(Prone|Grappled|Restrained|Poisoned|Frightened|Blinded|Charmed|Deafened|Stunned|Incapacitated|Paralyzed|Petrified|Unconscious)\b|pushed up to \d+ feet|can'?t regain Hit Points|Speed (?:is )?(?:reduced|halved)|Total Cover|suffocat|starts? burning|Disadvantage on/gi;
const conseqs = (t) => [...new Set((String(t).match(CONSEQ) ?? []).map((x) => x.toLowerCase()))].sort();
const GATE = /\bonly (?:if|when|while|against)\b|\bcan (?:use|make) this (?:attack|action) only\b/i;
const DURATION = /until the (?:start|end) of|escape DC|until it|for 1 minute/i;

(async () => {
  console.log(`CONCEPT: ${CONCEPT}\nCHASSIS: ${CHASSIS_ID} — CR ${CHASSIS.cr}, the generic ${CHASSIS.style}\n`);
  console.log('THE GENERIC CHASSIS, AS EVERY CREATURE OF THIS KIND GETS IT');
  console.log(sheet);

  const { ideas } = json(await ask(ideasPrompt));
  console.log(`\n${'='.repeat(78)}\nSTAGE 1 — TEN IDEAS (the chassis was not shown)\n`);
  ideas.forEach((x, i) => console.log(`  ${String.fromCharCode(97 + i)}. ${x}`));

  const { map } = json(await ask(slotPrompt(ideas), 0.4));
  console.log(`\n${'='.repeat(78)}\nSTAGE 2 — WHICH CHASSIS ROW COULD CARRY IT\n`);
  for (const m of map) {
    const letter = String(m.idea).trim().toLowerCase();
    const idx = letter.charCodeAt(0) - 97;
    const rowN = m.row === 'none' || m.row == null ? null : Number(m.row);
    const rowName = rowN ? (CHASSIS.rows[rowN - 1]?.name ?? `?${rowN}`) : '— none';
    console.log(`  ${letter}. ${String(ideas[idx] ?? '').slice(0, 56).padEnd(58)}-> ${String(rowName).padEnd(17)} ${m.why ?? ''}`);
  }

  const placeable = map.filter((m) => m.row !== 'none' && m.row != null && CHASSIS.rows[Number(m.row) - 1]).slice(0, HOW_MANY_TO_BUILD);
  console.log(`\n${'='.repeat(78)}\nSTAGE 3 — THE MODIFIED ROWS, AND WHETHER THEY HOLD\n`);
  let clean = 0;
  for (const m of placeable) {
    const idx = String(m.idea).trim().toLowerCase().charCodeAt(0) - 97;
    const idea = ideas[idx]; const row = CHASSIS.rows[Number(m.row) - 1];
    let out; try { out = json(await ask(modPrompt(idea, row), 0.8)); } catch (e) { console.log(`  CALL FAILED: ${e.message.slice(0, 70)}`); continue; }
    const before = row.text.replace(/\s+/g, ' '); const after = String(out.text).replace(/\s+/g, ' ');
    console.log(`${'─'.repeat(78)}\nIDEA: ${idea}`);
    console.log(`GENERIC   ${row.name}: ${before}`);
    console.log(`MODIFIED  ${out.name}: ${after}`);
    console.log(`  traded: ${out.traded}`);
    const problems = [];
    if (JSON.stringify(committed(before)) !== JSON.stringify(committed(after))) problems.push(`numbers/tokens moved: ${committed(before).join(',')} -> ${committed(after).join(',')}`);
    if (!GATE.test(before) && GATE.test(after)) problems.push('added a precondition');
    const gone = conseqs(before).filter((x) => !conseqs(after).includes(x));
    const came = conseqs(after).filter((x) => !conseqs(before).includes(x));
    if (conseqs(before).length && !gone.length) problems.push('nothing traded away');
    if (DURATION.test(before) && !DURATION.test(after)) problems.push('lost its duration');
    for (const g of gone) if (new RegExp(`(?:until|while|the) ${g}\\b`, 'i').test(after)) problems.push(`dangling reference to "${g}"`);
    console.log(problems.length ? `  NOT SOUND: ${problems.join('; ')}` : `  SOUND — out [${gone.join(', ') || 'nothing'}], in [${came.join(', ') || 'nothing'}]`);
    if (!problems.length) clean += 1;
  }
  console.log(`\n${'='.repeat(78)}\ntechnically sound: ${clean} of ${placeable.length} built`);
})();
