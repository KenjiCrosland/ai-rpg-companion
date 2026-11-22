/**
 * PROBE A — EIGHTY RIBBONS.
 *
 * Builds nothing into the pipeline. No sheet changes and no existing prompt changes. This asks the
 * model for two ribbons per sheet of the forty, runs every answer through the validator that will
 * ship (reskin/ribbon.mjs), and writes a blocks file the owner can read.
 *
 * Sheet i takes family `i mod N` and `(i + 3) mod N` over the families as they stand, so each is
 * asked an equal number of times and the run can be repeated.
 *
 * THE EIGHTY OF 22 NOVEMBER WERE ASKED OVER EIGHT FAMILIES. The owner then cut them to six —
 * hiding went, bound folded into taboo — so this script no longer reproduces that run. The eighty
 * lines are the kept artifact: `scripts/smoke-evidence/BLOCKS-ribbon-probe-2026-11-22.md`.
 *
 * THE CONTEXT COMES FROM THE RECORDING, NOT A NEW RUN. The forty's finished sheets are already on
 * disk in baseline-2026-11-20, each with the GM's input, the creature's name and type, and its row
 * names. Nothing is generated to feed this probe.
 *
 * THE CALL GOES BY THE DEV SERVER, the same route the harness's browser uses: POST to
 * /api/ai/deepseek, where the Vite proxy injects the key server-side. This script does not read
 * .env.local and does not hold a key.
 *
 *   npm run dev                       # in another terminal
 *   node scripts/ribbon-probe.mjs     # --limit N to stop early, --out <path>
 */
import fs from 'node:fs';
import path from 'node:path';
import { RIBBON_FAMILIES, ribbonRefusal } from '../src/tools/statblock-generator/reskin/ribbon.mjs';
import { rowsOfSheet } from '../src/tools/statblock-generator/reskin/sheet-lints.mjs';

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const LIMIT = Number(flag('limit', 0)) || 0;
const ORIGIN = flag('origin', 'http://localhost:5173');
const RECORDING = path.resolve(flag('recording',
  'src/tools/statblock-generator/reskin/__tests__/fixtures/recordings/baseline-2026-11-20'));
const today = new Date().toISOString().slice(0, 10);
const OUT = path.resolve(flag('out', `scripts/smoke-evidence/BLOCKS-ribbon-probe-${today}.md`));

/** The rules of a ribbon, as the handoff states them. The ask carries these verbatim. */
const RULES = `A ribbon is a trait with no price in a fight. It senses something, sheds light, moves
or speaks strangely, has a taboo, is bound to something, or leaves something behind when it dies.

Rules:
- One or two sentences.
- No damage, no saving throw, no condition, no bonus to an attack, to Armor Class or to a save.
- No Advantage or Disadvantage on an attack roll or a saving throw. On an ABILITY CHECK both are
  allowed: the Sphinx's Inscrutable gives Disadvantage on Insight checks.
- A number only as a distance, a length of time, or the DC of an ability check, as in Mimicry.
- It may hang on anything thematic you like. A ribbon is the one place a condition may be written
  freely as flavour, so long as no creature gains one.

Answer with JSON only: {"ribbon": "<one or two sentences>"} — or, if this family does not suit this
creature, {"declined": "<why, in one short sentence>"}.`;

const readSheets = () => fs.readdirSync(RECORDING)
  .filter((f) => /^\d+-.*\.json$/.test(f))
  .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
  .map((f) => {
    const { input, sheet } = JSON.parse(fs.readFileSync(path.join(RECORDING, f), 'utf8'));
    const rows = [...new Set(rowsOfSheet(sheet).map(({ r }) => String(r?.name ?? '')).filter(Boolean))];
    return {
      file: f,
      index: parseInt(f, 10),
      typed: [input?.name, input?.description].filter(Boolean).join(' — ') || '(blank form)',
      name: sheet?.name ?? input?.name ?? '(unnamed)',
      type: [sheet?.size, sheet?.type].filter(Boolean).join(' ') || String(sheet?.type ?? 'unknown'),
      cr: sheet?.cr_str ?? sheet?.challenge_rating ?? '?',
      rows,
    };
  });

const askFor = (sheet, family) => `You are writing one ribbon for a D&D 5e monster.

Creature: ${sheet.name} — ${sheet.type}, CR ${sheet.cr}
What the GM typed: ${sheet.typed}
The rows already on its sheet: ${sheet.rows.join(', ') || '(none)'}

The family you are writing in: ${family.label}
Print's own row in that family, as the example: ${family.print}

${RULES}`;

async function callModel(prompt) {
  const res = await fetch(`${ORIGIN}/api/ai/deepseek`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'deepseek-flash',
      messages: [{ role: 'user', content: prompt }],
      temperature: 1,
      response_format: { type: 'json_object' },
    }),
  });
  if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 200)}`);
  const body = await res.json();
  const raw = body?.choices?.[0]?.message?.content ?? '';
  try {
    return JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g, ''));
  } catch {
    return { unparsed: raw.slice(0, 400) };
  }
}

const sheets = readSheets();
if (sheets.length !== 40) console.warn(`note: ${sheets.length} sheets in the recording, not 40`);

/** Sheet i takes family i mod 8 and (i + 3) mod 8. i is the sheet's own 1-based index. */
const asks = [];
for (const s of sheets) {
  const n = RIBBON_FAMILIES.length;
  for (const k of [s.index % n, (s.index + 3) % n]) asks.push({ sheet: s, family: RIBBON_FAMILIES[k] });
}
const planned = LIMIT ? asks.slice(0, LIMIT) : asks;
console.log(`${planned.length} asks over ${sheets.length} sheets, ${RIBBON_FAMILIES.length} families, via ${ORIGIN}`);

const results = [];
for (const [n, ask] of planned.entries()) {
  const label = `[${String(n + 1).padStart(2, '0')}/${planned.length}] ${ask.sheet.name} · ${ask.family.label}`;
  let outcome;
  try {
    const answer = await callModel(askFor(ask.sheet, ask.family));
    if (answer.declined) outcome = { kind: 'declined', why: String(answer.declined) };
    else if (answer.unparsed) outcome = { kind: 'refused', text: answer.unparsed, why: 'the answer was not JSON' };
    else {
      const text = String(answer.ribbon ?? '').trim();
      const refusal = ribbonRefusal(text);
      outcome = refusal ? { kind: 'refused', text, why: refusal } : { kind: 'written', text };
    }
  } catch (e) {
    outcome = { kind: 'error', why: e?.message ?? String(e) };
  }
  results.push({ ...ask, ...outcome });
  console.log(`${label} — ${outcome.kind}${outcome.why ? `: ${outcome.why}` : ''}`);
}

// THE BLOCKS FILE. Eighty lines, then one table by family. Not ranked — the owner reads all eighty.
const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim();
const lines = results.map((r, i) => {
  const said = r.kind === 'written' ? esc(r.text)
    : r.kind === 'declined' ? `_declined_ — ${esc(r.why)}`
      : r.kind === 'refused' ? `**refused** (${esc(r.why)}) — ${esc(r.text)}`
        : `**error** — ${esc(r.why)}`;
  return `| ${i + 1} | ${String(r.sheet.index).padStart(2, '0')} ${esc(r.sheet.name)} | ${esc(r.sheet.typed)} | ${esc(r.family.label)} | ${said} |`;
});

const byFamily = RIBBON_FAMILIES.map((f) => {
  const mine = results.filter((r) => r.family.key === f.key);
  const count = (k) => mine.filter((r) => r.kind === k).length;
  return `| ${f.label} | ${count('written')} | ${count('declined')} | ${count('refused')} | ${count('error')} | ${mine.length} |`;
});

const tally = (k) => results.filter((r) => r.kind === k).length;
fs.writeFileSync(OUT, `# Probe A — eighty ribbons · ${today}

${planned.length} asks over ${sheets.length} sheets of the forty, two per sheet: sheet \`i\` took
family \`i mod 8\` and \`(i + 3) mod 8\`, so each family was asked ten times.

The creature's name, type and CR, what the GM typed, and the names of the rows on its finished
sheet all come from \`${path.relative(process.cwd(), RECORDING)}\` — no sheet was regenerated for
this probe. Each answer was run through \`reskin/ribbon.mjs\`, the validator that will ship.

Written ${tally('written')} · declined ${tally('declined')} · refused ${tally('refused')}${tally('error') ? ` · errored ${tally('error')}` : ''}.

Not ranked, and no favourites picked.

## By family

| Family | Written | Declined | Refused | Errored | Asked |
|---|---|---|---|---|---|
${byFamily.join('\n')}

## The ${planned.length} lines

| # | Sheet | What the GM typed | Family | The ribbon, or why not |
|---|---|---|---|---|
${lines.join('\n')}
`);
console.log(`\nwrote ${path.relative(process.cwd(), OUT)}`);
console.log(`written ${tally('written')} · declined ${tally('declined')} · refused ${tally('refused')} · errored ${tally('error')}`);
