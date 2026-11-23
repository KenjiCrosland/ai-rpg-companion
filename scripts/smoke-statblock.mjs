/**
 * Ad hoc statblock smoke runner — NOT part of the test suite.
 *
 * Drives the real UI in a headless browser against the live dev server and
 * the real /api/ai proxy, so the whole path is exercised: concept synthesis,
 * archetype resolve, ROUTING (the Vue layer, where the style-drop defects
 * live), the reskin pipeline, lint, and audit. A Node script calling
 * generateReskin directly would skip resolve + routing entirely, which is
 * half of what a smoke is for.
 *
 * Usage:
 *   npm run dev                                  # in another terminal
 *   node scripts/smoke-statblock.mjs batch5      # scripts/smoke-batches/batch5.json
 *   node scripts/smoke-statblock.mjs batch5 --headed
 *   node scripts/smoke-statblock.mjs --only 3    # just the 3rd entry of that batch
 *
 * Batch file: an array of entries.
 *   { "cr": "8", "concept": "a leopard-thing that stalks the canopy" }
 *   { "cr": "5", "name": "Brazen Bull", "concept": "a brass bull construct",
 *     "role": "brute", "caster": true, "rules": "2014" }
 * `concept` alone goes in the Name-or-concept field (what the field is for).
 * With `name`, the name goes there and `concept` goes in Description.
 *
 * Output: smoke-out/<batch>-<timestamp>/  — one .md per block (trace + the
 * rendered card exactly as it appears on screen), plus all.md and raw .json.
 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { buildTape, takeAnswer, unusedAnswers, decide, formatMiss, familyOf, MISS_BODY, FAMILY_NAMES, sheetsDiffer, differingFields, onlyKeyOrderDiffers , notReplayable} from './lib/tape.mjs';
import { ARMS, ARM_NAMES } from './lib/arms.mjs';
// the engine's own reader for a CR typed in the words, so the harness and the page agree (item 0.4)
import { crFromPrompt } from '../src/tools/statblock-generator/reskin/lexicon.mjs';

const BASE = process.env.SMOKE_BASE_URL ?? 'http://localhost:5173';
const GEN_TIMEOUT_MS = Number(process.env.SMOKE_TIMEOUT_MS ?? 240_000);

const args = process.argv.slice(2);
const headed = args.includes('--headed');
// `--only` TAKES ONE INDEX, AND SAYS SO WHEN IT DOES NOT (2026-11-14). `--only 4,11,12`
// used to become NaN and silently run the whole batch — a reviewer lost a run to it,
// having asked for three blocks and been handed twelve. A flag that quietly does the
// opposite of what it was given is worse than one that refuses.
const onlyIdx = (() => {
  if (!args.includes('--only')) return null;
  const raw = args[args.indexOf('--only') + 1];
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 1) {
    console.error(`--only takes ONE 1-based index; got "${raw ?? '(nothing)'}".`);
    if (String(raw ?? '').includes(',')) console.error('A comma list is not supported — run the batch once, or pass a single index per run.');
    process.exit(2);
  }
  return n;
})();
// RECORD AND REPLAY (2026-11-16). A forty costs twenty minutes and a different roll every time,
// so a refactor's effect cannot be told from the model's variance. Recorded once and replayed,
// the same inputs give the same sheet and any difference is the code's.
//
// WHERE IT RECORDS. Every model call in this tool crosses ONE function — `generateGptResponse`
// in src/util/ai-client.mjs: the eight inside `generateReskin` arrive through the `callLLM` it is
// handed (`(prompt, validate) => generateGptResponse(prompt, validate, 3)`,
// StatblockGenerator.vue:1736) and the identity, route and path calls are made directly. Nothing
// under the tool calls `fetch` itself. So this intercepts the HTTP request that function issues,
// one level below it: the same boundary, and NO product code changes to record or replay.
//
// RECORD AND REPLAY SHARE THIS DRIVER on purpose. If one ran in a browser and the other under
// node, a mismatch could be the environment; here it cannot.
const replayDir = args.includes('--replay') ? path.resolve(args[args.indexOf('--replay') + 1] ?? '') : null;
const recording = args.includes('--record');
// THE RIBBON IS PARKED AND OFF BY DEFAULT (owner, 2026-11-23). `--ribbons` turns it on, which is
// what a replay of baseline-2026-11-23 needs; every other run reproduces the product's default.
const ribbons = args.includes('--ribbons');
// THREE REPLAY MODES (2026-11-16).
//   strict        (default) a hit is served, a miss FAILS. What proves a refactor.
//   pass-through  a miss goes LIVE, so a prompt change can be tried without paying for a forty.
//   live-from F   everything before the F call is served; F and everything after go live even
//                 where the prompt is unchanged, so one step can be re-rolled on a frozen sheet.
// Both live modes write a NEW recording folder; the tape they were given is never overwritten.
// AN EXPERIMENT ARM (2026-11-16) applies one of two plain functions from ./lib/arms.mjs to ONE
// named call: a rewrite of the outgoing prompt, or a rewrite of the answer before the page sees it.
// Nothing in src/ changes. An arm that rewrites an ANSWER needs no model: it serves the tape and
// transforms what it serves, so the run is deterministic. An arm that rewrites a PROMPT must go
// live from that call, because the tape has no answer for a prompt it never saw.
const armName = args.includes('--arm') ? String(args[args.indexOf('--arm') + 1] ?? '') : null;
if (armName && !ARM_NAMES.includes(armName)) {
  console.error(`--arm takes one arm name; got "${armName}".\nKnown arms: ${ARM_NAMES.join(', ')}`);
  process.exit(2);
}
const arm = armName ? ARMS[armName] : null;
const liveFrom = args.includes('--live-from') ? String(args[args.indexOf('--live-from') + 1] ?? '')
  : (arm?.live ? arm.call : null);
const mode = liveFrom ? 'live-from' : args.includes('--pass-through') ? 'pass-through' : 'strict';
const rolls = Math.max(1, Number(args.includes('--rolls') ? args[args.indexOf('--rolls') + 1] : 1) || 1);
if (liveFrom && liveFrom !== 'miss' && !FAMILY_NAMES.includes(liveFrom)) {
  console.error(`--live-from takes one call name, or "miss".\ngot "${liveFrom}".\nKnown calls: ${FAMILY_NAMES.join(', ')}\n"miss" serves every answer whose prompt still matches and goes live at the first that does not — which is what "re-record from the call that missed" means when a family is called more than once.`);
  process.exit(2);
}
const batchName = args.find((a) => !a.startsWith('--') && a !== String(onlyIdx) && a !== (replayDir ? args[args.indexOf('--replay') + 1] : null)) ?? 'batch';
let goldenFailures = 0;
let replayFailures = 0;
let replaySkipped = 0;

const RECORDINGS = path.resolve('src/tools/statblock-generator/reskin/__tests__/fixtures/recordings');
// IN REPLAY THE RECORDING IS THE INPUT, not a batch file — so the inputs cannot drift from the
// prompts that were recorded against them.
/**
 * AN INPUT WHOSE PROMPTS CANNOT BE FROZEN (2026-11-18).
 *
 * Two of the forty roll part of themselves before any call is built: `cr: "auto"` is rolled by
 * `rollRandomCR` and lands in the route prompt, and a blank name AND description make
 * `buildRandomConceptSeed` invent the whole creature. Their prompts differ every run, so the tape
 * cannot serve them and the harness skips them in every replay mode.
 *
 * THE RECORDER NOW WRITES THE MARK. It was hand-added to the tape of 2026-11-16 and then lost: each
 * generation of the tape is recorded by replaying the last, and a skipped entry produces no entry,
 * so the mark fell out of the lineage. The clean forty of 2026-11-18 recorded all 40 and strict
 * replay reported 2 misses that had been 2 skips. The rule is knowable from the input, so it is
 * written rather than remembered.
 */

let replayCases = [];
if (replayDir) {
  if (!fs.existsSync(replayDir)) { console.error(`No recording at ${replayDir}`); process.exit(1); }
  replayCases = fs.readdirSync(replayDir).filter((f) => /^\d+-.*\.json$/.test(f)).sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
    .map((f) => ({ file: f, ...JSON.parse(fs.readFileSync(path.join(replayDir, f), 'utf8')) }));
  console.log(`replaying ${replayCases.length} recorded generation(s) from ${path.relative(process.cwd(), replayDir)} — no network`);
}
const batchPath = path.resolve('scripts/smoke-batches', `${batchName}.json`);
if (!replayDir && !fs.existsSync(batchPath)) {
  console.error(`No batch file at ${batchPath}\nAvailable: ${fs.existsSync('scripts/smoke-batches') ? fs.readdirSync('scripts/smoke-batches').join(', ') : '(none yet)'}`);
  process.exit(1);
}
let entries = replayDir ? replayCases.map((c) => c.input) : JSON.parse(fs.readFileSync(batchPath, 'utf8'));
// `--only` SLICES THE RECORDING TOO. It sliced `entries` alone at first, so the Nth entry was
// served the FIRST recording's answers and missed every prompt — a harness fault that reads
// exactly like a real replay failure.
if (onlyIdx) { entries = [entries[onlyIdx - 1]]; if (replayDir) replayCases = [replayCases[onlyIdx - 1]]; }
// `--rolls N` runs each recorded generation N times. Everything up to the named call is identical
// each time, so the only thing that varies is the step being re-rolled.
if (replayDir && rolls > 1) {
  replayCases = replayCases.flatMap((c) => Array.from({ length: rolls }, (_, k) => ({ ...c, roll: k + 1 })));
  entries = replayCases.map((c) => c.input);
}
// the union of every flag key this batch sets, cleared before each entry (see below). Read
// from the WHOLE file, not the --only slice, so a single-entry run starts just as clean.
const flagKeys = new Set((replayDir ? replayCases.map((c) => c.input) : JSON.parse(fs.readFileSync(batchPath, 'utf8'))).flatMap((e) => Object.keys(e?.flags ?? {})));

const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const outDir = path.resolve('smoke-out', `${armName ? `arm-${armName}` : batchName}-${stamp}`);
// WHERE A NEW RECORDING LANDS. `--record` and `--pass-through` make a tape meant to be kept, so
// they write to the committed fixtures folder. Every other live mode is an EXPERIMENT — a step
// re-rolled on a frozen sheet — and its tape stays out of the repo under the gitignored run folder,
// per the standing order: a recording made for an experiment is committed only when a handoff names
// it. `--live-from` was writing to the fixtures folder and leaving an uncommitted tape behind.
const keptTape = recording || mode === 'pass-through';
const recDir = keptTape
  ? path.resolve(RECORDINGS, replayDir ? `${path.basename(replayDir)}-${mode}-${stamp}` : `${batchName}-${stamp}`)
  : path.resolve(outDir, 'tape');
fs.mkdirSync(outDir, { recursive: true });

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48);
const savedCount = (page) => page.evaluate(() => {
  const m = JSON.parse(localStorage.getItem('monsters') || '{}');
  return Object.values(m).filter(Array.isArray).flat().length;
});

const run = async () => {
  const browser = await chromium.launch({ headless: !headed });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  // the trace IS half the deliverable — logger.mjs writes every [concept] and
  // [reskin] line through console.log, and warnings (resolve failures) through
  // console.warn
  let lines = [];
  let genFailed = null; // a THROWN generation never saves — without this the run waited out the full timeout on it (the gmAsked ReferenceError read as six "timeouts", 2026-10-18)
  // A PAGE ERROR CARRIES THE STACK. The console text of a caught-and-logged
  // failure usually does not, and a stochastic throw cannot be found without one.
  // THE ONE BOUNDARY. `prompt` is the user turn of the request `generateGptResponse` sends; the
  // RAW response body is recorded and replayed byte for byte, so nothing is re-encoded between
  // the two runs.
  //
  // KEYED ON THE PROMPT TEXT, NOT ON ORDER, because the page issues the route and path calls in
  // parallel (`Promise.all`) and their arrival order is not stable. A prompt that legitimately
  // repeats keeps a queue of its answers and they are served in the order they were recorded.
  let callLog = [];          // record mode: what this generation asked and was told
  let served = null;         // replay mode: prompt text -> queue of raw response bodies
  let caseCalls = [];        // …and this generation's recorded calls, for an arm that looks one up by its CALL
  let replayMiss = null;     // replay mode: the first prompt with no recorded answer
  let missCount = 0;         // …and how many there were in all, including any after the sheet was saved
  const shapeOf = (req) => {
    try {
      const body = req.postDataJSON();
      const sys = (Array.isArray(body?.messages) ? body.messages : []).find((m) => m?.role === 'system');
      return { system: String(sys?.content ?? ''), model: String(body?.model ?? '') };
    } catch { return { system: '', model: '' }; }
  };
  const promptOf = (req) => {
    try {
      const body = req.postDataJSON();
      const msgs = Array.isArray(body?.messages) ? body.messages : [];
      const user = [...msgs].reverse().find((m) => m?.role === 'user');
      return String(user?.content ?? '');
    } catch { return ''; }
  };
  let fromTape = 0; let wentLive = 0; let afterNamed = false; let reqSeen = null;
  let armedPrompts = 0; let armedAnswers = 0; let missFamilies = {}; let enrichmentSuppressed = 0;
  const goLive = async (route, prompt, req = null) => {
    // THE ENRICHMENT CALL CAN OUTLIVE THE RUN. It is fired after the save and not awaited by the
    // app, so one can still be in flight when the browser closes — and `route.fetch` then throws
    // "Request context disposed", which killed a 15-sheet run at the very end. A call that arrives
    // after the page is gone is nothing to report: there is no sheet left for it to affect.
    try {
      // a rewritten prompt is sent as rewritten: the request body carries it in place of the
      // original user turn
      let post;
      if (req) {
        try {
          const b = req.postDataJSON();
          const msgs = (b?.messages ?? []).map((m) => m);
          for (let k = msgs.length - 1; k >= 0; k -= 1) if (msgs[k]?.role === 'user') { msgs[k] = { ...msgs[k], content: prompt }; break; }
          post = JSON.stringify({ ...b, messages: msgs });
        } catch { post = undefined; }
      }
      // PLAYWRIGHT'S route.fetch DEFAULTS TO 30 SECONDS, which is shorter than a slow model call:
      // the Scree Pit's live audit took longer and the sheet timed out as a harness failure, not a
      // product one. The engine's own hang guard is 240s (ai-client's REQUEST_TIMEOUT_MS), so this
      // follows it and lets the call fail honestly where it would have failed anyway.
      const res = await route.fetch({ ...(post ? { postData: post } : {}), timeout: 240_000 });
      const asAnswered = await res.text();
      let body = asAnswered;
      if (arm?.answer && arm.call === familyOf(prompt)) { body = arm.answer(body); armedAnswers += 1; }
      // RECORD WHAT THE MODEL SAID, not what the arm turned it into. The fix-kinds arm empties the
      // findings before the page sees them, and they are the whole measurement.
      callLog.push({ prompt, response: asAnswered });
      wentLive += 1;
      await route.fulfill({ response: res, body });
    } catch (e) {
      lines.push(`[harness] a live call could not complete (${String(e?.message ?? e).slice(0, 60)}) — the page was already gone`);
      try { await route.abort(); } catch { /* the context is disposed; nothing to abort */ }
    }
  };
  if (recording || replayDir) {
    await page.route('**/api/ai/**', async (route) => {
      const req = route.request();
      const prompt = promptOf(req);
      // WHAT THE RECORDING WAS MADE AGAINST (item 4). The key is the user turn only; the request
      // also carries a system turn and a model name, and if either has changed since the tape was
      // cut, every answer on it was given under different instructions.
      if (!reqSeen) reqSeen = shapeOf(req);
      if (!replayDir) { await goLive(route, prompt); return; }
      // ENRICHMENT DOES NOT RUN IN A REPLAY (2026-11-16). It is fired after the save, is not
      // awaited by the app, and writes to its OWN localStorage key ('creature-intelligence') — it
      // cannot touch the sheet under test. Its prompt embeds the finished sheet, so the moment an
      // experiment changes a sheet the call misses the tape, and the harness then waited 20 seconds
      // per sheet for a write that was never coming: twelve wasted minutes an arm.
      //
      // So it is answered instantly, offline, with a body that fails its validator. The call fails
      // the way it already fails on a flaky network, which the page treats as non-fatal, and no
      // miss is counted because nothing was asked of the tape.
      if (familyOf(prompt) === 'enrichment') {
        enrichmentSuppressed += 1;
        await route.fulfill({ status: 200, contentType: 'application/json', body: MISS_BODY });
        return;
      }
      // THE ARM'S PROMPT REWRITE, if this is its call. The transformed text is what goes to the
      // model and what the new recording stores, because it is what was actually asked.
      const armed = arm?.prompt && arm.call === familyOf(prompt) ? arm.prompt(prompt) : prompt;
      if (armed !== prompt) armedPrompts += 1;
      // AN ARM THAT ANSWERS A CALL FROM THE TAPE BY ITS CALL, not by its prompt text. The tape is
      // keyed on the exact prompt, so a changed prompt misses on every sheet and the comparison is
      // lost; this serves the one answer recorded for that call in that generation.
      if (arm?.fromTapeByCall && arm.call === familyOf(armed)) {
        const rec = caseCalls.find((c) => familyOf(c.prompt) === arm.call);
        if (rec) {
          fromTape += 1;
          let body = rec.response;
          if (arm.answer) { body = arm.answer(body); armedAnswers += 1; }
          await route.fulfill({ status: 200, contentType: 'application/json', body });
          return;
        }
      }
      const d = decide({ mode, liveFrom, prompt: armed, tape: served, afterNamed });
      if (d.flips) afterNamed = true;
      if (d.use === 'tape') {
        fromTape += 1;
        // THE ARM'S ANSWER REWRITE, if this is its call: the page is handed the transformed answer
        // and cannot tell the difference.
        let body = takeAnswer(served, armed);
        if (arm?.answer && arm.call === familyOf(armed)) { body = arm.answer(body); armedAnswers += 1; }
        // a tape-served call goes in the log too, so an arm's own record is EVERYTHING the page was
        // told — not only what came off the network. Without this an arm whose answers all come
        // from the tape has no record of the answer it actually transformed.
        callLog.push({ prompt: armed, response: body });
        await route.fulfill({ status: 200, contentType: 'application/json', body });
        return;
      }
      if (d.use === 'live') { await goLive(route, armed, req); return; }
      // A MISS. Loud, named by its builder, and answered with a 200 so it can never open the
      // circuit breaker (see MISS_BODY): the call fails validation instead of looking like a
      // provider outage.
      missCount += 1;
      const mf = familyOf(armed); missFamilies[mf] = (missFamilies[mf] ?? 0) + 1;
      if (!replayMiss) replayMiss = armed;
      await route.fulfill({ status: 200, contentType: 'application/json', body: MISS_BODY });
    });
  }
  page.on('pageerror', (err) => { lines.push(`[pageerror] ${err?.stack ?? err?.message ?? err}`); });
  page.on('console', (msg) => {
    const t = msg.text();
    if (/Statblock generation failed/.test(t)) genFailed = t.slice(0, 900); // 160 truncated away the STACK, which is the only thing that locates a stochastic throw (2026-10-22)
    // every warning/error is captured (minus browser noise) — a "Statblock
    // generation failed: TypeError: Failed to fetch" was dropped by the old
    // allowlist and a dead run looked like a resolve hiccup (2026-09-20)
    const noise = /font-src|Content Security Policy|runtime\.lastError|Receiving end does not exist/.test(t);
    if (!noise && (/\[concept\]|\[reskin\]|\[route\]|\[path\]|audit|resolve failed|generation failed|Failed to/.test(t) || msg.type() === 'warning' || msg.type() === 'error')) {
      lines.push(`${msg.type() === 'warning' || msg.type() === 'error' ? '!! ' : ''}${t}`);
    }
  });
  page.on('pageerror', (e) => lines.push(`!! pageerror: ${e.message}`));

  // premium is the page VARIANT in dev, not a runtime flag — and it's what
  // keeps the 5/24h free quota out of the way
  await page.addInitScript((wantRibbons) => {
    localStorage.setItem('dev-current-page', 'statblock-generator-premium');
    if (wantRibbons) localStorage.setItem('statblock-ribbons', '1');
    else localStorage.removeItem('statblock-ribbons');
  }, ribbons);

  const results = [];
  for (const [i, entry] of entries.entries()) {
    const n = String(i + 1).padStart(2, '0');
    const label = entry.name || entry.concept || entry.description || '(blank)';
    process.stdout.write(`[${n}/${entries.length}] CR ${entry.cr} — ${String(label).slice(0, 56)}… `);
    // A GENERATION MARKED NOT REPLAYABLE IS SKIPPED, NOT FAILED (owner's ruling, 2026-11-16).
    // Two of the forty are plain printed monsters whose CR the page rolls, and one is a blank form
    // that rolls its whole creature; none is worth harness work. But a replay that always ends
    // "3 did NOT reproduce" teaches everyone to ignore its last line, so they are skipped by name
    // with their reason and counted separately. The live modes still run them.
    // SKIPPED IN EVERY REPLAY MODE (corrected 2026-11-17). The mark means THE TAPE CANNOT BE
    // REPLAYED — sheet 22's CR and sheet 36's whole creature are rolled locally, so their prompts
    // differ every run and the frozen half cannot be served. That is true whatever the mode: run
    // live-from-the-audit, both sheets threw "Failed to generate a valid response", because the
    // calls BEFORE the named one missed the tape and were answered offline.
    // THE MARK IS READ FROM THE INPUT, NOT REMEMBERED FROM THE TAPE (owner, 2026-11-21 evening).
    // `notReplayable` already answers this from the entry alone — that was the point of writing it
    // rather than hand-marking the files — and the tape's copy still fell out of the lineage twice:
    // a skipped entry writes no tape, so the next generation, recorded by replaying the last, has
    // no mark to carry. It was present on the 18 November tapes and null on the 20 November ones,
    // and both sheets were then reported as MISSES, which is what made "38 of 40" read as a
    // failure for a week.
    const skipMark = replayCases[i]?.replay?.skip ? replayCases[i].replay : notReplayable(entry).replay;
    if (replayDir && skipMark?.skip) {
      const why = skipMark.why ?? 'marked not replayable';
      console.log(`SKIPPED — ${why}`);
      replaySkipped += 1;
      results.push({ n, status: `SKIPPED — ${why}`, name: label, signature: null,
        md: [`## ${n}. ${label} — CR ${entry.cr}  [SKIPPED: not replayable]`, '', `**Why:** ${why}`, '',
          '_Strict replay does not run this generation: it does not depend only on its inputs, by the',
          'product\'s own design. The live modes still do._', ''].join('\n') });
      continue;
    }
    lines = [];
    const t0 = Date.now();
    callLog = [];
    replayMiss = null;
    missCount = 0;
    fromTape = 0; wentLive = 0; afterNamed = false; reqSeen = null; armedPrompts = 0; armedAnswers = 0; missFamilies = {}; enrichmentSuppressed = 0;
    if (replayDir) {
      // one queue per distinct prompt, in the order recorded
      served = buildTape(replayCases[i]?.calls ?? []);
      caseCalls = replayCases[i]?.calls ?? [];
    }

    // Google-Fonts <link>s keep `load` pending in headless — domcontentloaded
    // the page may not come up after a stalled block (the features run died on the entry
    // after a 411 s stall, "waiting for locator('#monsterName')", 2026-10-19): one retry
    const open = async () => { await page.goto(BASE, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('#monsterName', { timeout: 30_000 }); };
    try { await open(); } catch { lines.push('[harness] the page did not come up — retrying once'); await page.waitForTimeout(5_000); await open(); }
    // A GENERATION'S PROMPTS DEPEND ON WHAT IS ALREADY SAVED (found by this harness, 2026-11-16).
    // Two prompts carry `NAMES ALREADY TAKEN — never reuse or closely echo any: …`, built from the
    // names in the user's own collection (StatblockGenerator.vue:1733, capped at 40). So the same
    // inputs give a DIFFERENT prompt depending on what the browser has stored: the two-entry
    // recording replayed exactly as a pair and never on its own, because run second the marsh witch
    // was told "Owlbear" was taken and run alone she was told nothing.
    //
    // That is a real hidden input, so the recording carries it and replay restores it. A minimal
    // collection is enough — the page reads nothing from these but `.name`.
    // THE CIRCUIT BREAKER IS PERSISTED IN localStorage ('ai-breaker-open-until'), and a replay
    // miss answers with a 500, which is a provider failure: three of them open the breaker and
    // every later sheet is stamped `degraded: true` — differing from its recording for a reason
    // that has nothing to do with the code under test. Cleared per entry so one entry's miss
    // cannot reach the next. (Must run AFTER the page is open: on about:blank it throws.)
    if (replayDir || recording) await page.evaluate(() => localStorage.removeItem('ai-breaker-open-until'));
    const takenNow = () => page.evaluate(() => Object.values(JSON.parse(localStorage.getItem('monsters') || '{}'))
      .filter(Array.isArray).flat().map((m) => m?.name).filter(Boolean));
    let takenNames = [];
    if (replayDir) {
      const want = replayCases[i]?.takenNames ?? [];
      await page.evaluate((names) => localStorage.setItem('monsters', JSON.stringify({ Replay: names.map((n) => ({ name: n })) })), want);
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#monsterName', { timeout: 30_000 });
      lines.push(`[harness] restored ${want.length} taken name(s) the recording carried`);
    } else if (recording) {
      takenNames = await takenNow();
    }
    const before = await savedCount(page);
    // identity, not name: five runs of one concept can all be named "Brass
    // Bull", and a name-set diff then reports the INPUT as the new monster
    // with no signature (clear-variance 2026-09-21). The new monster is the
    // one whose serialized form was not there before.
    const namesBefore = await page.evaluate(() => {
      const m = JSON.parse(localStorage.getItem('monsters') || '{}');
      return Object.values(m).filter(Array.isArray).flat().map((x) => JSON.stringify(x));
    });

    // NOT a click — `statblock-format` persists, so clicking every load
    // TOGGLES it (the first 2014 run flipped even-numbered entries back to
    // 2024 and they rendered as 2024 cards). Set the state, then reload.
    const want = entry.rules === '2014' ? '2014' : '2024';
    const has = await page.evaluate(() => localStorage.getItem('statblock-format'));
    if ((has ?? '2024') !== want) {
      await page.evaluate((v) => localStorage.setItem('statblock-format', v), want);
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#monsterName', { timeout: 30_000 });
    }
    // arbitrary localStorage flags — lets a batch exercise the KILL SWITCHES
    // (statblock-reskin-{pilot,brute,caster,lurker,defender,bodies,2014}='0'),
    // which are the production rollback plan and were never smoked
    // EVERY FLAG THE BATCH USES IS CLEARED BEFORE EACH ENTRY (2026-11-14). This used to SET
    // only, so a flag carried over into every later entry: probe B's first run had all eight
    // sheets injected because each baseline inherited the previous entry's element, and the
    // run was void. Clearing the union of every entry's flag keys makes that impossible
    // rather than something a batch author has to remember.
    if (flagKeys.size) {
      await page.evaluate((keys) => { for (const k of keys) localStorage.removeItem(k); }, [...flagKeys]);
      if (entry.flags) await page.evaluate((f) => { for (const [k, v] of Object.entries(f)) localStorage.setItem(k, v); }, entry.flags);
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#monsterName', { timeout: 30_000 });
    }
    // FORM-SHAPED entries (2026-10-01): `name` goes to the name field even when empty,
    // `description` to the textarea; the older concept-only shape still types the
    // concept into the name field (and into the textarea when a name is given too)
    if ('description' in entry || 'name' in entry) {
      await page.fill('#monsterName', String(entry.name ?? ''));
      if (entry.description) await page.fill('textarea', String(entry.description));
      if (!('description' in entry) && entry.name && entry.concept) await page.fill('textarea', entry.concept);
    } else {
      await page.fill('#monsterName', entry.concept ?? '');
    }

    // ParSelect renders a native <select>; pick the one that actually offers
    // this value (CR vs Combat role) rather than guessing at order
    for (const sel of await page.locator('select').all()) {
      const vals = await sel.locator('option').evaluateAll((os) => os.map((o) => o.value));
      if (entry.role && vals.includes(entry.role)) await sel.selectOption(entry.role);
      else if (vals.includes(String(entry.cr))) await sel.selectOption(String(entry.cr));
    }
    if (entry.caster) await page.locator('input[type="checkbox"]').first().check();

    await page.click('.generate-button');

    let status = 'ok';
    genFailed = null;
    try {
      const saved = page.waitForFunction(
        (want) => {
          const m = JSON.parse(localStorage.getItem('monsters') || '{}');
          return Object.values(m).filter(Array.isArray).flat().length >= want;
        },
        before + 1,
        { timeout: GEN_TIMEOUT_MS },
      );
      const thrown = new Promise((_, rej) => { const iv = setInterval(() => { if (genFailed) { clearInterval(iv); rej(new Error(genFailed)); } }, 500); saved.then(() => clearInterval(iv), () => clearInterval(iv)); }); // handled on both branches — a bare .finally() re-raised the timeout as an unhandled rejection and killed the run (forty, 2026-10-18)
      await Promise.race([saved, thrown]);
    } catch (e) {
      status = genFailed ? `GENERATION THREW — ${genFailed}` : 'TIMED OUT / no save';
      // WHAT THE PAGE WAS DOING when the clock ran out — a timeout with no trace at all
      // is the harness or the page, not the engine (the scree block, forty 2026-10-18)
      const diag = await page.evaluate(() => ({ ready: document.readyState, generating: !!document.querySelector('.generate-button[disabled]'), url: location.href })).catch((e3) => ({ error: String(e3?.message ?? e3).slice(0, 120) }));
      lines.push(`[harness] at timeout: ${JSON.stringify(diag)}`);
    }

    // ENRICHMENT runs after the save and is not awaited by the app — moving
    // to the next entry the instant the save lands aborted it on 8 of 10
    // blocks ("Failed to enrich ... Failed to fetch"), which read like a
    // product failure until an isolated run came back clean. Wait (bounded)
    // for its localStorage write before navigating; never fail the run on it.
    if (status === 'ok' && !replayDir) {
      await page.waitForFunction((known) => {
        const ci = JSON.parse(localStorage.getItem('creature-intelligence') || '{}');
        const m = JSON.parse(localStorage.getItem('monsters') || '{}');
        const fresh = Object.values(m).filter(Array.isArray).flat().filter((x) => !known.includes(JSON.stringify(x))).map((x) => x?.name);
        return fresh.length && fresh.every((nm) => nm in ci);
      }, namesBefore, { timeout: 20_000 }).catch(() => lines.push('(enrichment did not settle within 20s — moving on)'));
    } else if (replayDir) {
      lines.push(`[harness] enrichment not run (${enrichmentSuppressed} request(s) answered offline) and not waited for — it writes to its own key and cannot affect the sheet`);
    }
    // EDITION CONVERSION (entry.convert: true): the tab flip is the one
    // advertised path only mocked tests had touched. Flip to the other
    // edition's tab, press the one-time Convert, wait for `other_edition`
    // to land on the saved monster, and capture the now-active card.
    let converted = null;
    if (status === 'ok' && entry.convert) {
      const born = entry.rules === '2014' ? '2014' : '2024';
      const target = born === '2014' ? '2024' : '2014';
      try {
        await page.locator('[data-testid="edition-switch"]').getByText(`${target} rules`).click({ timeout: 15_000 })
          .catch((e) => { throw new Error(`tab "${target} rules" — ${e.message.split('\n')[0]}`); });
        // a born-2014 block already CARRIES its 2024 printing (the 2014 move
        // saves both), so the tab is a free cache swap — no Convert button
        // ever appears. Only press Convert when the other edition is absent.
        const cached = await page.evaluate((known) => {
          const m = JSON.parse(localStorage.getItem('monsters') || '{}');
          const fresh = Object.values(m).filter(Array.isArray).flat().filter((x) => !known.includes(JSON.stringify(x)));
          return fresh.length && fresh.every((x) => x?.other_edition);
        }, namesBefore);
        if (cached) lines.push('[harness] other edition already cached — free tab flip, no Convert call');
        else await page.locator('[data-testid="convert-edition"]').click({ timeout: 15_000 })
          .catch((e) => { throw new Error(`Convert button — ${e.message.split('\n')[0]}`); });
        await page.waitForFunction((known) => {
          const m = JSON.parse(localStorage.getItem('monsters') || '{}');
          const fresh = Object.values(m).filter(Array.isArray).flat().filter((x) => !known.includes(JSON.stringify(x)));
          return fresh.length && fresh.every((x) => x?.other_edition);
        }, namesBefore, { timeout: GEN_TIMEOUT_MS });
        converted = await page.locator('.sb24-container, .statblock').allInnerTexts().then((t) => t.join('\n\n'));
        lines.push(`[harness] converted ${born} -> ${target}`);
      } catch (e) {
        converted = `(conversion did not complete: ${String(e?.message ?? e).slice(0, 120)})`;
        lines.push(`!! [harness] conversion failed: ${String(e?.message ?? e).slice(0, 120)}`);
      }
    }
    // the rendered card, exactly as it reads on screen
    // the 2014 card is TWO .statblock divs (part-1 stats, part-2 actions) —
    // .first() captured only the stat column and silently dropped every
    // action row from the .md
    const card = await page.locator('.sb24-container, .statblock')
      .allInnerTexts().then((t) => t.join('\n\n')).catch(() => '(card did not render)');
    // the tool SORTS saved monsters by CR within a folder, so the newest is
    // NOT last — taking the tail silently returned the highest-CR block for
    // three of five entries on the first 2014 run. Diff against the names
    // present before this generation instead.
    const monster = await page.evaluate((known) => {
      const m = JSON.parse(localStorage.getItem('monsters') || '{}');
      const all = Object.values(m).filter(Array.isArray).flat();
      const seen = new Set(known);
      // THE LAST fresh entry, not the first (2026-10-25). A run that re-serializes an
      // OLDER same-name entry — the 2014/2024 other_edition write does — makes that
      // old sheet "fresh" too, and it sits EARLIER in the array, so .find returned
      // run #1's block for run #2 (tally6: traces differed, blocks byte-identical;
      // horseman4: a 2014 block hashed identical to a 2024 one). New saves append.
      const fresh = all.filter((x) => !seen.has(JSON.stringify(x)));
      return fresh.length ? fresh[fresh.length - 1] : null;   // no new block => null, never the previous one
    }, namesBefore);
    if (recording) {
      fs.mkdirSync(recDir, { recursive: true });
      fs.writeFileSync(path.join(recDir, `${n}-${slug(monster?.name ?? label)}.json`),
        JSON.stringify({ input: entry, request: reqSeen, takenNames, calls: callLog, sheet: monster }, null, 1));
      lines.push(`[harness] recorded ${callLog.length} model call(s)`);
    }
    // A LIVE MODE WRITES A NEW RECORDING. The tape it was given is never overwritten, so a
    // pass-through run or a re-roll is itself replayable afterwards.
    // AN ARM'S OWN CALLS go in the RUN folder, which is gitignored — an experiment's tape stays
    // out of the repo unless a handoff names it (owner's addition to the standing order,
    // 2026-11-16). It is what the per-confidence counts are read from for a live arm, since a
    // trace records a finding's entry but not its confidence.
    if (replayDir && arm) {
      const f = path.join(outDir, 'calls.json');
      const all = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {};
      all[Number(n)] = callLog;
      fs.writeFileSync(f, JSON.stringify(all));
    }
    if (replayDir && mode !== 'strict' && !arm) {
      fs.mkdirSync(recDir, { recursive: true });
      const roll = replayCases[i]?.roll ? `-roll${replayCases[i].roll}` : '';
      fs.writeFileSync(path.join(recDir, `${n}-${slug(monster?.name ?? label)}${roll}.json`),
        JSON.stringify({ input: entry, ...notReplayable(entry), request: reqSeen, takenNames: replayCases[i]?.takenNames ?? [], calls: callLog, sheet: monster }, null, 1));
    }
    if (replayDir) {
      const want = replayCases[i]?.sheet ?? null;
      const unserved = unusedAnswers(served);
      // ONLY STRICT COMPARES THE SHEET. In a live mode the sheet is MEANT to differ — that is what
      // re-rolling a step is for — so comparing it would report the instrument working as a failure.
      // AN ARM THAT ONLY RE-KEYS THE TAPE IS STILL COMPARED. audit-as-taped changes nothing about
      // the answers — it serves the same recorded audit answer by its call rather than its text —
      // so a difference from the tape is the ENGINE's, which is the whole reason the arm exists.
      const comparable = mode === 'strict' || (arm?.fromTapeByCall && !arm.answer && !arm.prompt);
      if (!comparable) {
        lines.push(`[harness] ${arm ? `arm ${armName}` : mode}: the sheet is not compared with the recording — the point is that it may differ`);
      } else if (replayMiss) {
        replayFailures += 1;
        // THE WHOLE PROMPT, to a file. 400 characters of a 4,000-character prompt is not enough
        // to see which clause moved, and that is the only question a miss asks.
        const missFile = path.join(outDir, `${n}-REPLAY-MISS.txt`);
        const recordedPrompts = (replayCases[i]?.calls ?? []).map((c, k) => `--- recorded prompt ${k + 1} (${familyOf(c.prompt)}) ---\n${c.prompt}`);
        fs.writeFileSync(missFile, [`--- the prompt with no recorded answer ---`, replayMiss, '', ...recordedPrompts].join('\n'));
        // NAMED BY ITS BUILDER, with the first line that differs and a line of context each side.
        const report = formatMiss(replayMiss, replayCases[i]?.calls ?? []);
        lines.push(`[harness] ${report}\n[harness] the whole prompt, and every recorded one, is in ${path.basename(missFile)}`);
        console.log(report.split('\n')[0]);
      } else if (sheetsDiffer(want, monster)) {
        replayFailures += 1;
        const diffKey = differingFields(want, monster);
        lines.push(`[harness] REPLAY DIFFERS from ${replayCases[i].file} — fields: ${diffKey.join(', ') || '(shape)'}`);
        console.log(`REPLAY DIFFERS (${diffKey.slice(0, 4).join(', ')})`);
      } else {
        // KEY ORDER IS NOT A DIFFERENCE, but it is worth saying when it moved: a field stamped
        // earlier in the pipeline serialises in a different position, and knowing that is how last
        // round's 13 "failures" were read correctly.
        const moved = onlyKeyOrderDiffers(want, monster);
        lines.push(`[harness] replay identical to ${replayCases[i].file}${moved ? ' — the same sheet, with some keys in a different order' : ''}${unserved ? ` — ${unserved} recorded answer(s) unused` : ''}`);
      }
      if (missCount) lines.push(`[harness] ${missCount} prompt(s) had no recorded answer during this entry: ${Object.entries(missFamilies).map(([k, v]) => `${k} x${v}`).join(', ')}`);
      if (arm) lines.push(`[harness] arm "${armName}": ${arm.why} — ${armedPrompts} prompt(s) rewritten, ${armedAnswers} answer(s) rewritten`);
      if (mode !== 'strict' || arm) lines.push(`[harness] ${fromTape} call(s) from the tape, ${wentLive} live${liveFrom ? ` (live from the ${liveFrom} call onward)` : ''}`);
      // WHAT THE TAPE WAS CUT AGAINST. The key is the user turn only, so a changed system turn or
      // model is invisible to it — and every answer on the tape was given under the old ones.
      const was = replayCases[i]?.request;
      if (was && reqSeen) {
        const bad = [];
        if (was.model && was.model !== reqSeen.model) bad.push(`model: recorded ${JSON.stringify(was.model)}, now ${JSON.stringify(reqSeen.model)}`);
        if (was.system == null) lines.push('[harness] this tape does not record the system turn it was cut against (recorded before the field existed) — only the model could be checked');
        else if (was.system !== reqSeen.system) bad.push(`system turn: recorded ${JSON.stringify(was.system)}, now ${JSON.stringify(reqSeen.system)}`);
        if (bad.length) lines.push(`[harness] THE TAPE WAS CUT AGAINST A DIFFERENT REQUEST — every answer on it was given under the recorded one:\n  ${bad.join('\n  ')}`);
      }
    }

    // GOLDENS (critic, v2 blind read 2026-09-21: "freeze the v1 winners — if a
    // build can't reproduce the bishop's peal and the keeper's lure on those
    // concepts, it fails before review"): an entry's `expect` names the route
    // line(s) and signature template(s) it must reproduce; the run prints
    // PASS/FAIL and the batch exits 2 on any failure.
    if (entry.expect) {
      const tr = lines.join('\n');
      const routeGot = (/\[route\] ([a-z-]+)/.exec(tr) ?? [])[1] ?? null;
      // a seed drawn by the verb-ranked fallback IS the card (the bishop's mark
      // shipped as "Binding Mark" and the golden had counted only fits)
      const tmplGot = [...tr.matchAll(/signature template(?: \(trait\))?: ([a-z-]+)|signature rider: ([a-z-]+)|library seed drawn: ([a-z-]+)/g)].map((m) => m[1] ?? m[2] ?? m[3]);
      const routeOk = !entry.expect.route || (routeGot && entry.expect.route.includes(routeGot));
      const tmplOk = !entry.expect.template || entry.expect.template.some((t) => tmplGot.includes(t));
      // an API failure is an ERROR, not a verdict on the build
      const apiDied = /call failed|Failed to fetch|Circuit breaker opened/.test(tr);
      const verdict = routeOk && tmplOk ? 'PASS' : apiDied ? 'ERROR' : 'FAIL';
      if (verdict === 'FAIL') goldenFailures += 1;
      lines.push(`[golden] ${verdict} — route ${routeGot ?? 'none'} (want ${(entry.expect.route ?? ['any']).join('|')}); templates ${tmplGot.join(',') || 'none'} (want ${(entry.expect.template ?? ['any']).join('|')})`);
      console.log(`  [golden] ${verdict}`);
    }
    // RE-ROLL ONE ENTRY (step 9b, 2026-10-14): the per-entry re-roll is a UI
    // path — the card's own button — so nothing but this harness can show a
    // critic what a re-rolled row looks like beside the block it came from.
    // Batch entry: "reroll": { "section": "Traits", "match": "Hold Breath" }
    // (2024 cards only; the classic card is a different component).
    let rerolled = null;
    if (entry.reroll && monster && (entry.rules ?? '2024') === '2024') {
      const want = entry.reroll;
      try {
        const sec = want.section ?? 'Actions';
        const list = (monster.sections ?? {})[sec] ?? [];
        const idx = want.match ? list.findIndex((e) => new RegExp(want.match, 'i').test(String(e?.name ?? ''))) : Number(want.index ?? 0);
        if (idx < 0) throw new Error(`no ${sec} row matching /${want.match}/`);
        const before = { name: list[idx].name, text: list[idx].text };
        const sel = `[data-testid="reroll-${sec}-${idx}"]`;
        await page.locator('[data-testid="edit-statblock"]').click({ timeout: 15_000 });
        await page.locator(sel).click({ timeout: 15_000 });
        // the button is disabled while the call is in flight and re-enabled
        // after: wait for it to go, then to come back
        await page.waitForFunction((s) => { const b = document.querySelector(s); return !!b && b.disabled; }, sel, { timeout: 15_000 }).catch(() => {});
        await page.waitForFunction((s) => { const b = document.querySelector(s); return !!b && !b.disabled; }, sel, { timeout: GEN_TIMEOUT_MS, polling: 500 });
        await page.locator('[data-testid="save-edit"]').click({ timeout: 15_000 });
        const after = await page.evaluate(({ s, i, nm }) => {
          const m = JSON.parse(localStorage.getItem('monsters') || '{}');
          const mine = Object.values(m).filter(Array.isArray).flat().find((x) => x?.name === nm);
          const e = mine?.sections?.[s]?.[i] ?? null;
          return e ? { name: e.name, text: e.text, template: e.template ?? null, boundKeys: e.boundKeys ?? null } : null;
        }, { s: sec, i: idx, nm: monster.name });
        rerolled = { sec, before, after };
        lines.push(`[harness] re-rolled ${sec}/"${before.name}" -> "${after?.name ?? '(unchanged)'}"${after?.template ? ` [catalog: ${after.template}]` : ' [the call\'s own text]'}`);
      } catch (e2) {
        rerolled = { error: String(e2?.message ?? e2).slice(0, 160) };
        lines.push(`!! [harness] re-roll failed: ${rerolled.error}`);
      }
    }
    const secs = ((Date.now() - t0) / 1000).toFixed(0);
    console.log(`${status === 'ok' ? '✓' : '✗ ' + status} ${secs}s`);
    // A TIMEOUT THAT LOGGED NOTHING never reached the engine: the page did not start
    // generating. That is a harness-side miss, so the entry gets ONE more turn at the
    // end of the batch (the iterator visits what is appended) — a real engine stall
    // leaves [concept]/[reskin] lines and is not retried.
    if (/^TIMED OUT/.test(status) && !lines.some((l) => /\[(?:concept|reskin|route)\]/.test(l)) && !entry._retryOf) {
      entries.push({ ...entry, _retryOf: n });
      lines.push(`[harness] no trace captured — re-queued once as a harness miss`);
    }

    const md = [
      `## ${n}. ${monster?.name ?? label} — CR ${entry.cr}${status === 'ok' ? '' : `  [${status}]`}${entry._retryOf ? `  (retry of ${entry._retryOf})` : ''}`,
      '',
      `**Input:** \`${entry.name ? `name: ${entry.name} | ` : ''}${entry.concept ?? entry.description ?? ''}${entry.role ? ` | role: ${entry.role}` : ''}\``,
      `**Donor:** ${(lines.find((l) => l.includes('[reskin] donor:')) ?? '—').replace(/.*donor: /, '')}`,
      // toLegacyModel drops `generation`, so on a 2014 block the signature
      // survives only on the cached 2024 printing
      // THE ELAPSED SECONDS ARE NOT IN THE SHEET'S HEADER (Fable, 2026-11-22). They differ every
      // run, so a whole-file diff of two blocks files reported ~1,040 changed lines when one sheet
      // had changed, and the diff that proves a round could not be read. They go in all.md's
      // summary instead, which a blocks file assembled from the per-sheet files never meets.
      `**Signature:** ${(monster?.generation ?? monster?.other_edition?.generation)?.signature ?? '—'}`,
      '',
      '### Block', '```', card, '```', '',
      ...(converted ? ['### Converted', '```', converted, '```', ''] : []),
      ...(rerolled ? (rerolled.error
        ? ['### Re-roll', '```', `(re-roll did not complete: ${rerolled.error})`, '```', '']
        : ['### Re-roll — one entry, replaced', '```',
          `${rerolled.sec} / BEFORE  ${rerolled.before.name}: ${rerolled.before.text}`,
          `${rerolled.sec} / AFTER   ${rerolled.after?.name ?? '—'}: ${rerolled.after?.text ?? '—'}`,
          `provenance: ${rerolled.after?.template ? `catalog template "${rerolled.after.template}"${rerolled.after.boundKeys?.length ? `, binds ${rerolled.after.boundKeys.join(', ')}` : ''}` : 'none — the call wrote the text itself'}`,
          '```', ''] ) : []),
      '### Trace', '```', lines.join('\n') || '(no trace captured)', '```', '',
    ].join('\n');

    fs.writeFileSync(path.join(outDir, `${n}-${slug(monster?.name ?? label)}.md`), md);
    if (monster) fs.writeFileSync(path.join(outDir, `${n}-${slug(monster.name)}.json`), JSON.stringify(monster, null, 2));
    results.push({ n, md, status, secs, name: monster?.name ?? label, signature: (monster?.generation ?? monster?.other_edition?.generation)?.signature });
  }

  // drop the interceptor before the context goes, so a call still in flight cannot throw
  await page.unrouteAll({ behavior: 'ignoreErrors' }).catch(() => {});
  await browser.close();

  const summary = results.map((r) => `- ${r.n} ${r.name} — ${r.status}, signature: ${r.signature ?? '—'}, ${r.secs}s`).join('\n');
  fs.writeFileSync(path.join(outDir, 'all.md'),
    `# Smoke: ${batchName} (${stamp})\n\n${summary}\n\n---\n\n${results.map((r) => r.md).join('\n---\n\n')}`);

  console.log(`\n${summary}\n\nWrote ${results.length} block(s) to ${outDir}\n  all.md  — everything in one file`);
  if (recording) console.log(`recorded ${results.length} generation(s) to ${path.relative(process.cwd(), recDir)}`);
  if (replayDir) {
    const attempted = results.length - replaySkipped;
    const skipNote = replaySkipped ? `, ${replaySkipped} skipped (not replayable)` : '';
    const armCompared = arm?.fromTapeByCall && !arm.answer && !arm.prompt;
    if (arm && !armCompared) console.log(`ARM "${armName}" (${arm.why}): ${attempted} generation(s)${skipNote}; sheets not compared with the tape — that is the point`);
    else if (arm) console.log(replayFailures
      ? `ARM "${armName}": ${replayFailures} of ${attempted} differ from the tape${skipNote} — each one is the engine's, see the [harness] lines`
      : `ARM "${armName}": all ${attempted} identical to the tape${skipNote}`);
    else if (mode !== 'strict') console.log(`REPLAY (${mode}${liveFrom ? ` ${liveFrom}` : ''}): ${attempted} generation(s) run; sheets not compared — the new recording is in ${path.relative(process.cwd(), recDir)}`);
    else console.log(replayFailures
      ? `REPLAY: ${replayFailures} of ${attempted} did NOT reproduce${skipNote} — see the [harness] lines above`
      : `REPLAY: ${attempted} of ${attempted} reproduced EXACTLY${skipNote}`);
  }
};

run().then(() => { if (goldenFailures) { console.log(`${goldenFailures} golden(s) FAILED`); process.exit(2); } if (replayFailures) process.exit(3); }).catch((e) => { console.error(e); process.exit(1); });
