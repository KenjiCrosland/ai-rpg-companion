/**
 * Ad hoc smoke SCANNER — NOT part of the test suite.
 *
 * Reads the .md/.json written by smoke-statblock.mjs and tallies the known
 * defect classes, so a batch of five yields RATES instead of prose. Every
 * item in the defect queue is currently logged as "1 sighting" / "2
 * sightings" with no frequency, which is what makes release priority a
 * judgment call. This turns accumulated runs into a table.
 *
 * Usage:
 *   node scripts/smoke-scan.mjs                 # every run in smoke-out/
 *   node scripts/smoke-scan.mjs rules2014       # runs whose dir starts with this
 *   node scripts/smoke-scan.mjs --dir smoke-out/bodies-2026-09-16T15-10-00
 *
 * Only signatures that are genuinely computable live here. Judgment-tier
 * defects (undefined referents, name/content mismatch, dominated rows) still
 * need a reader — those are reported as audit/lint counts, not auto-verdicts.
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const dirArg = args.includes('--dir') ? args[args.indexOf('--dir') + 1] : null;
const prefix = args.find((a) => !a.startsWith('--') && a !== dirArg) ?? '';

const runs = dirArg ? [path.resolve(dirArg)]
  : fs.existsSync('smoke-out')
    ? fs.readdirSync('smoke-out').filter((d) => d.startsWith(prefix)).map((d) => path.resolve('smoke-out', d))
    : [];
if (!runs.length) { console.error('No smoke-out runs found.'); process.exit(1); }

// text signatures — each is a defect class we have already adjudicated at
// least once, expressed as something a regex can actually decide
const SIGNATURES = [
  ['2014-wrapper in a 2024 block', (b, t, m) => m.format !== '2014'
    && /must (?:make|succeed on) an? DC \d+ \w+ saving throw/i.test(b)],
  ['save with no DC', (b) => /must (?:make|succeed on) an? (?:Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) saving throw/i.test(b)],
  ["can't-be condition grant", (b) => /can(?:no|')t be (?:Grappled|Frightened|Charmed|Deafened|Blinded|Prone)/i.test(b)],
  ['anatomical verb on a long-range row', (b) => /\b(?:Slam|Grip|Fist|Bite|Claw|Maw|Hammer|Saber|Blade|Lance)\b[^\n]{0,45}Ranged[^\n]{0,60}range \d{2,3}\/\d{2,3}/i.test(b)],
  ['duplicate OA-disadvantage grant', (b) => (b.match(/[Oo]pportunity [Aa]ttacks against it are made with [Dd]isadvantage/g) ?? []).length > 1],
  ['invented condition', (b) => /the (?:Surprised|Dazed|Slowed|Staggered|Marked) condition/i.test(b)],
  ['trait grants a named Speed', (b) => /(?:has|gains) an? (?:Climb|Fly|Swim|Burrow)(?:ing)? [Ss]peed/i.test(b)],
  ['swarm sized Tiny', (b, t, m) => /swarm/i.test(m.type ?? m.type_and_alignment ?? '')
    && /\bTiny (?:swarm|Swarm)\b/.test(m.type_and_alignment ?? `${m.size} ${m.type}`)],
  ['off-turn subsystem', (b) => /whenever the target (?:moves|takes)/i.test(b)],
  ['gendered pronoun in rules text', (b) => /\b(?:she|he|her|his|hers)\b/.test(b.replace(/^[^\n]*\n/, ''))],
];

const num = (s, re) => Number((re.exec(s) ?? [])[1] ?? 0);
const rows = [];

for (const dir of runs) {
  for (const f of fs.readdirSync(dir).filter((x) => /^\d+-.*\.md$/.test(x)).sort()) {
    const md = fs.readFileSync(path.join(dir, f), 'utf8');
    const jsonPath = path.join(dir, f.replace(/\.md$/, '.json'));
    const m = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : {};
    const block = (/### Block\n```\n([\s\S]*?)\n```/.exec(md) ?? [])[1] ?? '';
    const trace = (/### Trace\n```\n([\s\S]*?)\n```/.exec(md) ?? [])[1] ?? '';

    // a style that resolve named but the chosen donor does not carry = the
    // style silently dropped (the STYLE_HOME class)
    const style = (/\[concept\] resolve:.*?style=([\w—-]+)/.exec(trace) ?? [])[1] ?? '—';
    const donor = (/\[reskin\] donor: ([\w-]+)/.exec(trace) ?? [])[1] ?? '';
    // a re-route handled it, OR the engine DELIBERATELY overrode the style
    // (engulf claims the grappler line; a body type outranks the role) —
    // neither is a silent drop, and counting them inflated the rate to 24%
    const rerouted = /style re-route|archetype re-route|style overridden|body type: \w+ — the body outranks/.test(trace);
    const styleDropped = style !== '—' && donor && !donor.includes(style) && !rerouted;

    // lint findings that SHIPPED (the reject-gap measurement)
    const lintLine = (/\[reskin\] lint: (.*)/.exec(trace) ?? [])[1] ?? '0 findings';
    // a finding whose message says "Renamed to" was ACTUATED, not shipped —
    // counting those inflated the reject-gap rate
    const lintRules = lintLine === '0 findings' ? []
      : lintLine.split(' | ').filter((x) => !/Renamed to/.test(x))
        .map((x) => x.split(':')[0].trim()).filter(Boolean);

    rows.push({
      run: path.basename(dir), file: f,
      name: m.name ?? '?', cr: String(m.cr ?? m.challenge_rating ?? '?').split(' ')[0],
      format: m.format ?? '2024',
      signature: (m.generation ?? m.other_edition?.generation)?.signature ?? '—',
      donor, style, styleDropped,
      repairsBurned: (trace.match(/repair draft rejected|repair trait draft rejected/g) ?? []).length,
      wildcardDied: /wildcard repair skipped|slot is dropped|library seed drawn/.test(trace),
      lintRules,
      auditCount: num(trace, /\[reskin\] audit: \((\d+)\)/) || (/audit: nothing flagged/.test(trace) ? 0 : (/\[reskin\] audit: \[/.test(trace) ? 1 : 0)),
      auditNoop: /audit rewrite: (.*?)" -> "(.*?)"/.test(trace)
        && (() => { const mm = /audit rewrite: .*?"(.*?)" -> "(.*?)"/.exec(trace); return mm && mm[1] === mm[2]; })(),
      hits: SIGNATURES.filter(([, fn]) => { try { return fn(block, trace, m); } catch { return false; } }).map(([n]) => n),
    });
  }
}

const n = rows.length;
const pct = (k) => `${String(k).padStart(3)}/${n}  ${String(Math.round((k / n) * 100)).padStart(3)}%`;
const count = (fn) => rows.filter(fn).length;

console.log(`\n=== SMOKE SCAN — ${n} block(s) across ${runs.length} run(s) ===\n`);

console.log('SIGNATURE CHANNEL (the redesign\'s scoreboard)');
for (const s of ['custom', 'library', 'dropped', '—']) {
  const k = count((r) => r.signature === s);
  if (k) console.log(`  ${s.padEnd(10)} ${pct(k)}`);
}
console.log(`  wildcard died      ${pct(count((r) => r.wildcardDied))}`);
console.log(`  repair rounds burned: ${rows.reduce((a, r) => a + r.repairsBurned, 0)} across ${n} blocks\n`);

console.log('ROUTING');
console.log(`  style silently dropped ${pct(count((r) => r.styleDropped))}`);
for (const r of rows.filter((x) => x.styleDropped)) console.log(`     - ${r.name} (CR ${r.cr}): style=${r.style} -> donor ${r.donor}`);
console.log();

console.log('LINT FINDINGS THAT SHIPPED (the reject-gap)');
const byRule = {};
for (const r of rows) for (const rule of r.lintRules) byRule[rule] = (byRule[rule] ?? 0) + 1;
const ruleRows = Object.entries(byRule).sort((a, b) => b[1] - a[1]);
if (!ruleRows.length) console.log('  (none)');
for (const [rule, k] of ruleRows) console.log(`  ${rule.padEnd(28)} ${pct(k)}`);
console.log(`  blocks with 0 lint findings ${pct(count((r) => !r.lintRules.length))}\n`);

console.log('AUDIT');
console.log(`  blocks with findings   ${pct(count((r) => r.auditCount > 0))}`);
console.log(`  no-op rewrites         ${pct(count((r) => r.auditNoop))}\n`);

console.log('TEXT SIGNATURES');
const bySig = {};
for (const r of rows) for (const h of r.hits) bySig[h] = (bySig[h] ?? 0) + 1;
const sigRows = Object.entries(bySig).sort((a, b) => b[1] - a[1]);
if (!sigRows.length) console.log('  (none)');
for (const [sig, k] of sigRows) console.log(`  ${sig.padEnd(36)} ${pct(k)}`);

console.log('\nPER BLOCK');
for (const r of rows) {
  const flags = [r.styleDropped ? 'STYLE-DROP' : '', ...r.lintRules, ...r.hits].filter(Boolean);
  console.log(`  ${r.cr.padStart(3)} ${r.format} ${String(r.signature).padEnd(8)} ${r.name.slice(0, 26).padEnd(27)} ${flags.join(', ') || 'clean'}`);
}
console.log();
