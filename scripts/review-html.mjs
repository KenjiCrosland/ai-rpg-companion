#!/usr/bin/env node
// THE HUMAN SPOT-CHECK PAGE (owner's brief 2026-11-09: "I caught this one, not the critic").
//
//   node --import ./scripts/alias-loader.mjs scripts/review-html.mjs <run-dir> [--out <path>]
//   -> writes <run-dir>/review.html, self-contained, and prints the path
//
// The returning-weapon clause shipped 28 times across a week of fortys; the critic read ~400
// blocks and never named it, and the owner named it from one. This is the surface for reading
// blocks by hand: the sheet in print's layout, every row's provenance visible as a tag, the
// numbers the checker already computes, an interactive DPR calculator (our own gate was blind to
// an at-will area swap), the receipts for what the GM typed, and the trace.
//
// It COMPUTES NOTHING the engine owns: `checkBlock` is imported and its result embedded. The only
// new arithmetic is hit chance against a target AC, a reading aid. If a number is missing, add it
// to `checkBlock` — one owner for the computation (CLAUDE.md).
import fs from 'node:fs';
import path from 'node:path';
import { checkBlock, corpusAt } from '@/tools/statblock-generator/reskin/checker.mjs';
import TABLE from '@/data/challengeRatings.json';

const runDir = process.argv[2];
if (!runDir || !fs.existsSync(runDir)) { console.error('usage: review-html.mjs <run-dir> [--out <path>]'); process.exit(1); }
const outArg = process.argv.indexOf('--out');
const outPath = outArg > 0 ? process.argv[outArg + 1] : path.join(runDir, 'review.html');

// THE TWO PRINTINGS DIFFER EVERYWHERE, and this reader was bitten three times building one page:
// the DMG band (2014 has `challenge_rating: "7 (2,900 XP)"` and no numeric `cr`), the attack idiom
// ("Melee Weapon Attack: +10 to hit" vs "*Melee Attack Roll:* +10"), and the header block — 2014
// writes AC as `armor_class`, HP as `hit_points`, the six abilities as ONE PROSE STRING in
// `attributes` ("STR 16 (+3), DEX 10 (+0), …"), saves as prose in `saving_throws`, and size/type/
// alignment fused in `type_and_alignment`. Reading only 2024's keys rendered Sister Maudra with a
// blank AC, a blank HP and a table of NaN. Every difference is confined to this file's readers,
// and each has a guard that SAYS when it found nothing (memory: a-parser-reporting-zero).
const FLAT = ['abilities', 'actions', 'bonus_actions', 'reactions', 'legendary_actions'];
const FLAT_LABEL = { abilities: 'Traits', actions: 'Actions', bonus_actions: 'Bonus Actions', reactions: 'Reactions', legendary_actions: 'Legendary Actions' };
const SECTION_ORDER = ['Traits', 'Actions', 'Bonus Actions', 'Reactions', 'Legendary Actions'];
const ABIL = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

const sheetOf = (m) => ((m.other_edition?.sections || m.other_edition?.abilities) && !(m.sections || m.abilities) ? m.other_edition : m);
const sectionsOf = (sh) => {
  const out = {};
  for (const k of SECTION_ORDER) if (sh.sections?.[k]?.length) out[k] = [...sh.sections[k]];
  for (const k of FLAT) if (Array.isArray(sh[k]) && sh[k].length) { const L = FLAT_LABEL[k]; out[L] = [...(out[L] ?? []), ...sh[k]]; }
  return out;
};
const prose = (r) => String(r.text ?? r.description ?? '');

const statsFromProse = (txt) => {
  const out = {};
  for (const a of ABIL) { const m = new RegExp(`\\b${a}\\b[^0-9+-]*(\\d+)`).exec(String(txt ?? '')); if (m) out[a] = Number(m[1]); }
  return out;
};
const savesFromProse = (txt) => {
  const out = {};
  for (const m of String(txt ?? '').matchAll(/\b(STR|DEX|CON|INT|WIS|CHA)\b\s*([+-]\d+)/gi)) out[m[1].toUpperCase()] = Number(m[2]);
  return out;
};
function headerOf(sh, raw) {
  const ta = String(sh.type_and_alignment ?? '');
  const [head, ...tail] = ta.split(',');
  const words = head.trim().split(/\s+/);
  const crRaw = sh.cr ?? raw.cr ?? sh.challenge_rating ?? raw.challenge_rating ?? '';
  const xpM = /\(([\d,]+)\s*XP\)/.exec(String(crRaw));
  return {
    size: sh.size ?? (ta ? words[0] : ''),
    type: sh.type ?? (ta ? words.slice(1).join(' ') : ''),
    alignment: sh.alignment ?? (tail.length ? tail.join(',').trim() : ''),
    ac: sh.ac ?? sh.armor_class ?? '',
    hp: sh.hp ?? String(sh.hit_points ?? '').replace(/\s*\(.*$/, ''),
    hp_formula: sh.hp_formula ?? (/\(([^)]*)\)/.exec(String(sh.hit_points ?? '')) ?? [, ''])[1],
    speed: sh.speed ?? '',
    skills: sh.skills ?? '', senses: sh.senses ?? '', languages: sh.languages ?? '',
    immunities: sh.immunities ?? sh.damage_immunities ?? '',
    resistances: sh.resistances ?? sh.damage_resistances ?? '',
    vulnerabilities: sh.vulnerabilities ?? sh.damage_vulnerabilities ?? '',
    cr: String(crRaw).trim().replace(/\s*\(.*$/, ''),
    xp: sh.xp ?? raw.xp ?? (xpM ? xpM[1] : ''),
    pb: Number(String(sh.pb ?? sh.proficiency_bonus ?? '').replace('+', '')) || null,
    initiative_bonus: sh.initiative_bonus ?? null,
    stats: (sh.stats && Object.keys(sh.stats).length) ? sh.stats : statsFromProse(sh.attributes),
    saves: (sh.saves && Object.keys(sh.saves).length) ? sh.saves
      : (typeof sh.saving_throws === 'string' ? savesFromProse(sh.saving_throws) : (sh.saving_throws ?? {})),
  };
}

// the provenance a reader cannot see in the prose — the "metadata I may not be aware of"
function tagsOf(r) {
  const t = [];
  if (r.print) t.push(['print', "print's own row, verbatim at this sheet's DC/PB"]);
  if (r.library) t.push(['library', `a catalog template${r.seed ? ` (${r.seed})` : ''}`]);
  if (r.authored || r.authoredSeat) t.push(['authored', 'written by the authoring call for this sheet']);
  if (r.clause || r.gmQuote) t.push(['GM-asked', `answers: "${String(r.clause ?? r.gmQuote)}"`]);
  else if (r.freeRow || r.wildcard) t.push(['free row', 'not asked for — the engine added it']);
  if (r.part) t.push(['part', 'a body part or weapon the concept named']);
  if (r.imposes) t.push([`imposes ${r.imposes}`, 'the condition this row applies']);
  if (r.rules) t.push(['rules', 'a rules row, not an attack']);
  const gate = /\(((?:Recharge [^)]+|\d\/Day))\)/.exec(r.name ?? '');
  if (gate) t.push([gate[1], 'how often it can be used']);
  if (r.answersAlso?.length) t.push(['answers also', r.answersAlso.join(' · ')]);
  return t;
}

const sheets = [];
const bandMisses = [];
const headerMisses = [];
for (const f of fs.readdirSync(runDir).filter((x) => /^\d\d-.*\.json$/.test(x)).sort()) {
  const raw = JSON.parse(fs.readFileSync(path.join(runDir, f), 'utf8'));
  let md = ''; try { md = fs.readFileSync(path.join(runDir, f.replace(/\.json$/, '.md')), 'utf8'); } catch { /* no trace file */ }
  const sh = sheetOf(raw);
  const header = headerOf(sh, raw);
  const secs = sectionsOf(sh);
  const rowCount = Object.values(secs).flat().length;
  const band = TABLE[header.cr] ?? TABLE[String(Number(header.cr))] ?? null;
  if (!band) bandMisses.push(`${f.slice(0, 2)} cr=${JSON.stringify(header.cr)}`);
  if (!header.ac || !header.hp || ABIL.some((a) => !Number.isFinite(Number(header.stats[a])))) headerMisses.push(`${f.slice(0, 2)} ${sh.name ?? ''}`);
  let check = null;
  try { check = checkBlock(raw); } catch (err) { check = { error: String(err?.message ?? err) }; }
  sheets.push({
    idx: f.slice(0, 2), file: f,
    name: sh.name ?? raw.name ?? f,
    input: (/\*\*Input:\*\* `([^`]*)`/.exec(md) ?? [, ''])[1],
    donor: (/\*\*Donor:\*\* ([^\n]*)/.exec(md) ?? [, ''])[1],
    pathLine: (/\[path\] decides: ([^\n]*)/.exec(md) ?? [, ''])[1],
    pathKind: (/\[path\] decides: (\w+)/.exec(md) ?? [, '?'])[1],
    format: sh.format ?? raw.format ?? (sh.sections ? '2024' : '2014'),
    header, band, rowCount,
    printAt: (() => { try { return corpusAt(Number(header.cr), sh.format === '2014' ? '2014' : null); } catch { return null; } })(),
    sections: Object.fromEntries(Object.entries(secs).map(([k, rows]) => [k, rows.map((r) => ({ name: r.name, text: prose(r), tags: tagsOf(r) }))])),
    read: check?.read ?? null,
    findings: Object.entries(check?.gates ?? {}).flatMap(([g, v]) => (v.findings ?? []).map((x) => ({ gate: g, ...x }))),
    fidelity: check?.fidelity ?? null,
    trace: md.split('\n').filter((l) => /^\[(reskin|path|route|gap|audit)\]/.test(l)),
    error: check?.error ?? null,
  });
}
// A LOOKUP THAT SILENTLY MISSES IS WORSE THAN ONE THAT ERRORS: say so, loudly.
if (headerMisses.length) console.error(`WARNING: ${headerMisses.length} sheet(s) have a blank AC/HP or a non-numeric ability — the header reader missed a printing: ${headerMisses.join(', ')}`);
if (bandMisses.length) console.error(`WARNING: ${bandMisses.length} sheet(s) found no DMG band — their Numbers panel has no comparison: ${bandMisses.join(', ')}`);
const thin = sheets.filter((s) => s.rowCount === 0);
if (thin.length) console.error(`WARNING: ${thin.length} sheet(s) read zero rows: ${thin.map((s) => s.idx).join(', ')}`);

// embedded in a <script type="application/json">: only `<` and the two JS line separators need escaping
// embedded in a <script type="application/json">: only `<` and the two JS line separators
// (U+2028/U+2029, legal in JSON but not in a JS string literal) need escaping.
const JS_SEPS = new RegExp('[\\u2028\\u2029]', 'g');
const DATA = JSON.stringify({ run: path.basename(runDir), generated: new Date().toISOString(), sheets })
  .replace(/</g, '\\u003c')
  .replace(JS_SEPS, (c) => '\\u202' + (c.charCodeAt(0) - 0x2028 + 8));

fs.writeFileSync(outPath, `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Review — ${path.basename(runDir)}</title>
<style>${fs.readFileSync(new URL('./review-html.css', import.meta.url), 'utf8')}</style>
</head><body>
<div id="app"><p class="loading">Loading…</p></div>
<script id="run-data" type="application/json">${DATA}</script>
<script>${fs.readFileSync(new URL('./review-html.js', import.meta.url), 'utf8')}</script>
</body></html>`);
console.log(`${sheets.length} sheets -> ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(0)} KB)`);
console.log(`open ${outPath}`);
