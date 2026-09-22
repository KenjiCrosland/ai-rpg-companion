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

const BASE = process.env.SMOKE_BASE_URL ?? 'http://localhost:5173';
const GEN_TIMEOUT_MS = Number(process.env.SMOKE_TIMEOUT_MS ?? 240_000);

const args = process.argv.slice(2);
const headed = args.includes('--headed');
const onlyIdx = args.includes('--only') ? Number(args[args.indexOf('--only') + 1]) : null;
const batchName = args.find((a) => !a.startsWith('--') && a !== String(onlyIdx)) ?? 'batch';
let goldenFailures = 0;

const batchPath = path.resolve('scripts/smoke-batches', `${batchName}.json`);
if (!fs.existsSync(batchPath)) {
  console.error(`No batch file at ${batchPath}\nAvailable: ${fs.existsSync('scripts/smoke-batches') ? fs.readdirSync('scripts/smoke-batches').join(', ') : '(none yet)'}`);
  process.exit(1);
}
let entries = JSON.parse(fs.readFileSync(batchPath, 'utf8'));
if (onlyIdx) entries = [entries[onlyIdx - 1]];

const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const outDir = path.resolve('smoke-out', `${batchName}-${stamp}`);
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
  page.on('console', (msg) => {
    const t = msg.text();
    // every warning/error is captured (minus browser noise) — a "Statblock
    // generation failed: TypeError: Failed to fetch" was dropped by the old
    // allowlist and a dead run looked like a resolve hiccup (2026-09-20)
    const noise = /font-src|Content Security Policy|runtime\.lastError|Receiving end does not exist/.test(t);
    if (!noise && (/\[concept\]|\[reskin\]|\[route\]|audit|resolve failed|generation failed|Failed to/.test(t) || msg.type() === 'warning' || msg.type() === 'error')) {
      lines.push(`${msg.type() === 'warning' || msg.type() === 'error' ? '!! ' : ''}${t}`);
    }
  });
  page.on('pageerror', (e) => lines.push(`!! pageerror: ${e.message}`));

  // premium is the page VARIANT in dev, not a runtime flag — and it's what
  // keeps the 5/24h free quota out of the way
  await page.addInitScript(() => {
    localStorage.setItem('dev-current-page', 'statblock-generator-premium');
  });

  const results = [];
  for (const [i, entry] of entries.entries()) {
    const n = String(i + 1).padStart(2, '0');
    const label = entry.name ?? entry.concept;
    process.stdout.write(`[${n}/${entries.length}] CR ${entry.cr} — ${String(label).slice(0, 56)}… `);
    lines = [];
    const t0 = Date.now();

    // Google-Fonts <link>s keep `load` pending in headless — domcontentloaded
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#monsterName', { timeout: 30_000 });
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
    if (entry.flags) {
      await page.evaluate((f) => { for (const [k, v] of Object.entries(f)) localStorage.setItem(k, v); }, entry.flags);
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#monsterName', { timeout: 30_000 });
    }
    await page.fill('#monsterName', entry.name ?? entry.concept);
    if (entry.name && entry.concept) await page.fill('textarea', entry.concept);

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
    try {
      await page.waitForFunction(
        (want) => {
          const m = JSON.parse(localStorage.getItem('monsters') || '{}');
          return Object.values(m).filter(Array.isArray).flat().length >= want;
        },
        before + 1,
        { timeout: GEN_TIMEOUT_MS },
      );
    } catch {
      status = 'TIMED OUT / no save';
    }

    // ENRICHMENT runs after the save and is not awaited by the app — moving
    // to the next entry the instant the save lands aborted it on 8 of 10
    // blocks ("Failed to enrich ... Failed to fetch"), which read like a
    // product failure until an isolated run came back clean. Wait (bounded)
    // for its localStorage write before navigating; never fail the run on it.
    if (status === 'ok') {
      await page.waitForFunction((known) => {
        const ci = JSON.parse(localStorage.getItem('creature-intelligence') || '{}');
        const m = JSON.parse(localStorage.getItem('monsters') || '{}');
        const fresh = Object.values(m).filter(Array.isArray).flat().filter((x) => !known.includes(JSON.stringify(x))).map((x) => x?.name);
        return fresh.length && fresh.every((nm) => nm in ci);
      }, namesBefore, { timeout: 20_000 }).catch(() => lines.push('(enrichment did not settle within 20s — moving on)'));
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
      return all.find((x) => !seen.has(JSON.stringify(x))) ?? null;   // no new block => null, never the previous one
    }, namesBefore);

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
    const secs = ((Date.now() - t0) / 1000).toFixed(0);
    console.log(`${status === 'ok' ? '✓' : '✗ ' + status} ${secs}s`);

    const md = [
      `## ${n}. ${monster?.name ?? label} — CR ${entry.cr}${status === 'ok' ? '' : `  [${status}]`}`,
      '',
      `**Input:** \`${entry.name ? `name: ${entry.name} | ` : ''}${entry.concept}\``,
      `**Donor:** ${(lines.find((l) => l.includes('[reskin] donor:')) ?? '—').replace(/.*donor: /, '')}`,
      // toLegacyModel drops `generation`, so on a 2014 block the signature
      // survives only on the cached 2024 printing
      `**Signature:** ${(monster?.generation ?? monster?.other_edition?.generation)?.signature ?? '—'} · **elapsed** ${secs}s`,
      '',
      '### Block', '```', card, '```', '',
      ...(converted ? ['### Converted', '```', converted, '```', ''] : []),
      '### Trace', '```', lines.join('\n') || '(no trace captured)', '```', '',
    ].join('\n');

    fs.writeFileSync(path.join(outDir, `${n}-${slug(monster?.name ?? label)}.md`), md);
    if (monster) fs.writeFileSync(path.join(outDir, `${n}-${slug(monster.name)}.json`), JSON.stringify(monster, null, 2));
    results.push({ n, md, status, name: monster?.name ?? label, signature: (monster?.generation ?? monster?.other_edition?.generation)?.signature });
  }

  await browser.close();

  const summary = results.map((r) => `- ${r.n} ${r.name} — ${r.status}, signature: ${r.signature ?? '—'}`).join('\n');
  fs.writeFileSync(path.join(outDir, 'all.md'),
    `# Smoke: ${batchName} (${stamp})\n\n${summary}\n\n---\n\n${results.map((r) => r.md).join('\n---\n\n')}`);

  console.log(`\n${summary}\n\nWrote ${results.length} block(s) to ${outDir}\n  all.md  — everything in one file`);
};

run().then(() => { if (goldenFailures) { console.log(`${goldenFailures} golden(s) FAILED`); process.exit(2); } }).catch((e) => { console.error(e); process.exit(1); });
