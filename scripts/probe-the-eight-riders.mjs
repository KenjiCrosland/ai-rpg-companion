// FIX 2, THE CALL-LEVEL RUNG (Fable 5.2's prescription, 2026-11-14).
//
// A whole-block canary cannot reproduce this defect: it starts inside one call's
// answer, and no prompt can force the idea call to label a passive stance a condition
// on a hit. Twice a block prompt was written for it and twice the ask routed around it.
// So this replays the REAL answers the pipeline already gave.
//
// The eight are every `signature idea (trait)` across three saved forties that came
// back `[trait/*/condition] [family: payoff]` — the exact shape fix 2 re-seats. The
// ninth case is the mislabelled stance from the v-small Grask block, the control: the
// fit call should refuse it and its trait should stand.
//
// FIDELITY. The menu is not reconstructed — it is read from each trace's own
// `— menu: … (+ shelf: …)`, so every roll sees exactly what the engine offered that
// sheet. Three probes in this sprint returned confident meaningless numbers because
// their input was invented; this one prints its first prompt on request.
//
//   node --import ./scripts/alias-loader.mjs scripts/probe-the-eight-riders.mjs [N] [--show-prompt]
import fs from 'node:fs';
import { parseIdeas, buildFitPrompt, parseFit, TEMPLATE_BY_ID } from '@/tools/statblock-generator/reskin/templates.mjs';

const N = Number(process.argv.find((a) => /^\d+$/.test(a)) ?? 3);
const SHOW = process.argv.includes('--show-prompt');
const BASE = process.env.PROBE_BASE_URL ?? 'http://localhost:5173';
const MODEL = process.env.PROBE_MODEL ?? 'deepseek-flash';
const RUNS = ['typed40-2026-11-13T00-37-36', 'typed40-2026-11-09T21-04-40', 'sweep-2026-11-12T07-37-26'];

/** Every trait-seat condition payoff in the saved forties, with the menu it was shown. */
function theEight() {
  const out = [];
  for (const run of RUNS) {
    const dir = `smoke-out/${run}`;
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter((x) => /^\d+.*\.md$/.test(x)).sort()) {
      for (const line of fs.readFileSync(`${dir}/${f}`, 'utf8').split('\n')) {
        const m = /signature idea \(trait\): "([\s\S]*?)" \[trait\/([a-z_]+)\/condition\] \[family: payoff\] — menu: ([^(]*)(?:\(\+ shelf: ([^)]*)\))?/.exec(line);
        if (!m) continue;
        const ids = [...String(m[3]).split(','), ...String(m[4] ?? '').split(',')].map((s) => s.trim()).filter(Boolean);
        const name = /^\d+-(.*)$/.exec(f.replace(/\.md$/, ''))?.[1] ?? f;
        out.push({ sheet: f.replace(/\.md$/, ''), run, idea: m[1], trigger: m[2], menuIds: ids, name });
      }
    }
  }
  return out;
}

// the control, saved from smoke-out/v-small-2026-11-14T00-47-54 (Grask): the idea call
// labelled a passive stance `payoff` + `condition`, which is the mislabel fix 2 must not act on
const CONTROL = {
  sheet: 'CONTROL mislabelled stance', run: 'v-small-2026-11-14T00-47-54', name: 'Grask Ironjaw', trigger: 'always',
  idea: 'Grask fights from the center of his shield-wall: while at least one ally that can hear him is within reach of him, his Iron Jaw attack scores a Critical Hit on a roll of 19 or 20, and he cannot be Frightened.',
  menuIds: ['stunning-strike', 'charge-push', 'affliction', 'contagion', 'pounce', 'bolt-restrain', 'bolt-mark', 'phobia', 'bloodied-fury', 'blood-frenzy', 'pack-tactics', 'death-restoration', 'berserk', 'shielded-mind', 'relentless-pursuit', 'bound', 'undead-fortitude', 'truth-aura', 'fear-aura', 'weapon-lodge'],
};

const ask = async (prompt) => {
  const r = await fetch(`${BASE}/api/ai/deepseek`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: prompt }] }), // no temperature: production sends none
  });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  return String(j?.choices?.[0]?.message?.content ?? '').replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
};

const cases = [...theEight(), CONTROL];
// STEP 2 of the prescription: all eight should move to the rider path.
for (const c of cases) {
  const parsed = parseIdeas(JSON.stringify({ trait: { idea: c.idea, section: 'trait', trigger: c.trigger, effect: 'condition', family: 'payoff' } }), []).trait;
  c.reseated = parsed?.section === 'rider';
  c.idea_obj = parsed;
  c.menu = c.menuIds.map((id) => TEMPLATE_BY_ID.get(id)).filter(Boolean);
}
console.log('=== STEP 2 — the re-seat ===');
for (const c of cases) console.log(`  ${c.reseated ? '✓' : '✗'} ${c.sheet.padEnd(28)} menu ${String(c.menu.length).padStart(2)}/${c.menuIds.length} resolved`);
console.log(`  re-seated: ${cases.filter((c) => c.reseated).length}/${cases.length}\n`);

if (SHOW) {
  const c = cases[0];
  console.log(`=== THE FIT PROMPT, AS SENT (${c.sheet}) ===\n`);
  console.log(buildFitPrompt({ name: c.name, idea: c.idea_obj, menu: c.menu, cr: 5, concept: '' }).slice(0, 3000));
  process.exit(0);
}

// STEP 3: the fit call alone, N rolls. Does it FILL a rider form, or refuse?
const LIMIT = Number(process.env.PROBE_CONCURRENCY ?? 6);
const live = new Set();
const gated = async (fn) => { while (live.size >= LIMIT) await Promise.race(live); const p = (async () => fn())().finally(() => live.delete(p)); live.add(p); return p; };

const jobs = cases.map((c) => Promise.all(Array.from({ length: N }, () => gated(async () => {
  try {
    const raw = await ask(buildFitPrompt({ name: c.name, idea: c.idea_obj, menu: c.menu, cr: 5, concept: '' }));
    const fit = parseFit(raw, c.menu, c.name, []);
    if (fit?.template) return { v: 'filled', id: fit.template };
    return { v: 'refused', id: fit?.declined_because ?? 'no_reason', closest: fit?.closest ?? null };
  } catch (e) { return { v: 'ERR', id: e.message.slice(0, 40) }; }
}))).then((rolls) => ({ ...c, rolls })));

const res = await Promise.all(jobs);
console.log(`=== STEP 3 — the fit call alone, ${N} rolls each ===`);
let filled = 0; let refused = 0;
for (const c of res) {
  const f = c.rolls.filter((r) => r.v === 'filled');
  const tally = Object.entries(c.rolls.reduce((m, r) => ({ ...m, [`${r.v}:${r.id}`]: (m[`${r.v}:${r.id}`] ?? 0) + 1 }), {})).sort((a, b) => b[1] - a[1]);
  if (c.sheet.startsWith('CONTROL')) {
    console.log(`  ${f.length === 0 ? '✓' : '✗'} ${c.sheet.padEnd(28)} ${tally.map(([k, v]) => `${k}x${v}`).join('  ')}   << must REFUSE`);
    continue;
  }
  filled += f.length; refused += N - f.length;
  console.log(`    ${c.sheet.padEnd(28)} ${tally.map(([k, v]) => `${k}x${v}`).join('  ')}`);
}
console.log(`\n  of the eight, ${N} rolls each (${8 * N} calls): FILLED a rider form ${filled}, REFUSED ${refused}`);
console.log('  If refusals dominate, fix 2 in practice deletes these traits rather than moving them to the attack.');
