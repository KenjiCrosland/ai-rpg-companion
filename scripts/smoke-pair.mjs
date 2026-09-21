/**
 * Build a blind paired-comparison document for review — NOT part of the test suite.
 *
 * WHY THIS IS A SCRIPT AND NOT A ONE-OFF: two review artifacts in two days
 * silently dropped content (a hand-rolled JSON dump lost the legendary
 * preamble; a hand-edited paired doc lost a whole Actions column, then a
 * repair of that doc lost another version entirely). The reviewer cannot
 * distinguish "a block with no actions" from "a capture that lost them" and
 * will confidently review the wrong thing. So every version is VALIDATED
 * before the file is written, and the build FAILS LOUDLY rather than
 * emitting a doc with a hole in it.
 *
 * Source of truth is the CARD CAPTURE (.md "### Block") — what a reader
 * actually sees. A JSON-rendered fallback is allowed only with --allow-json
 * and is labelled inline, because rendering from JSON drops display-time
 * constants (e.g. the 2014 legendary-actions preamble).
 *
 * Usage:  node scripts/smoke-pair.mjs [--out <path>] [--allow-json]
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const outPath = args.includes('--out') ? args[args.indexOf('--out') + 1]
  : 'scripts/smoke-evidence/PAIRED-for-critic.md';
const allowJson = args.includes('--allow-json');
// --runs a,b : only pair captures from run dirs whose name starts with one of
// these prefixes — otherwise an OLD capture of the same concept can be paired
const runPrefixes = args.includes('--runs') ? args[args.indexOf('--runs') + 1].split(',') : null;

const hasActions = (b) => /\bActions\b|\bACTIONS\b/.test(b) && /Attack Roll|to hit|Saving Throw|saving throw/.test(b);

// ---- gather every capture, keyed by input prefix, split by pipeline
const cap = {};
for (const d of fs.readdirSync('smoke-out')) {
  if (runPrefixes && !runPrefixes.some((p) => d.startsWith(p))) continue;
  for (const f of fs.readdirSync(path.join('smoke-out', d)).filter((x) => /^\d+-.*\.md$/.test(x))) {
    const md = fs.readFileSync(path.join('smoke-out', d, f), 'utf8');
    const input = ((/\*\*Input:\*\* `(.*?)`/.exec(md) ?? [])[1] ?? '').slice(0, 30);
    const trace = (/### Trace\n```\n([\s\S]*?)\n```/.exec(md) ?? [])[1] ?? '';
    const block = (/### Block\n```\n([\s\S]*?)\n```/.exec(md) ?? [])[1] ?? '';
    if (!input || !block) continue;
    const k = /\[reskin\]/.test(trace) ? 'B' : 'A';
    const json = path.join('smoke-out', d, f.replace(/\.md$/, '.json'));
    (cap[input] = cap[input] ?? { A: [], B: [] })[k].push({ block, json: fs.existsSync(json) ? json : null });
  }
}

// ---- render a legacy/2024 model from JSON (fallback only)
const renderJson = (p) => {
  const m = JSON.parse(fs.readFileSync(p, 'utf8'));
  const L = { damage_vulnerabilities: 'Damage Vulnerabilities', damage_resistances: 'Damage Resistances', damage_immunities: 'Damage Immunities', condition_immunities: 'Condition Immunities' };
  const o = [m.name, m.type_and_alignment ?? `${m.size} ${m.type}, ${m.alignment}`, '',
    `Armor Class ${m.armor_class ?? m.ac}`, `Hit Points ${m.hit_points ?? m.hp}`, `Speed ${m.speed}`, '',
    m.attributes ?? Object.entries(m.stats ?? {}).map(([k, v]) => `${k} ${v}`).join(', '), ''];
  if (m.saving_throws) o.push(`Saving Throws ${m.saving_throws}`);
  if (m.skills) o.push(`Skills ${m.skills}`);
  for (const k of Object.keys(L)) if (m[k]) o.push(`${L[k]} ${m[k]}`);
  o.push(`Senses ${m.senses}`, `Languages ${m.languages || '—'}`,
    `Challenge ${m.challenge_rating}    Proficiency Bonus ${m.proficiency_bonus}`, '');
  for (const a of m.abilities ?? []) o.push(`${a.name}. ${a.description}`);
  o.push('', 'ACTIONS');
  for (const a of m.actions ?? []) o.push(`${a.name}. ${a.description}`);
  if ((m.legendary_actions ?? []).length) {
    // print constant the CARD renders and the data does not carry
    o.push('', 'LEGENDARY ACTIONS',
      `${m.name} can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. ${m.name} regains spent legendary actions at the start of its turn.`);
    for (const a of m.legendary_actions) o.push(`${a.name}. ${a.description}`);
  }
  return o.join('\n');
};

// ---- pick the best version per side, then VALIDATE
const problems = [];
const rounds = [];
for (const [input, v] of Object.entries(cap)) {
  if (!v.A.length || !v.B.length) continue;
  const pick = (side) => {
    const good = v[side].find((c) => hasActions(c.block));
    if (good) return { text: good.block, note: null };
    const withJson = v[side].find((c) => c.json);
    if (allowJson && withJson) return { text: renderJson(withJson.json), note: 'rendered from saved data — the card capture for this run predates a capture fix' };
    problems.push(`"${input}" side ${side}: no capture contains an Actions section`);
    return null;
  };
  const A = pick('A'); const B = pick('B');
  if (A && B) rounds.push({ input, A, B });
}

if (problems.length) {
  console.error('REFUSING TO WRITE — incomplete versions:\n  ' + problems.join('\n  ')
    + (allowJson ? '' : '\n(re-run with --allow-json to fall back to saved data)'));
  process.exit(1);
}

let out = `# Paired comparison — same prompt, two pipelines

For each concept, Version A and Version B were generated from the IDENTICAL
input. One pipeline is live today; the other is the branch. Deliberately
unlabelled.

The question is NOT defect-counting — that is already measured and the two are
close. The question is DESIGN: which block is better to run at a table? Look at
interlock between rows, whether the signature ability earns its slot, and
whether the mechanics express the concept that was asked for.

Every version below has been checked to contain an Actions section; this build
fails rather than emit a truncated block.
`;
rounds.forEach((r, i) => {
  out += `\n\n---\n\n## ${i + 1}. Concept: "${r.input}..."\n`;
  for (const side of ['A', 'B']) {
    out += `\n### Version ${side}${r[side].note ? `\n\n_(${r[side].note})_` : ''}\n\n\`\`\`\n${r[side].text.trim()}\n\`\`\`\n`;
  }
});
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out);
console.log(`wrote ${outPath} — ${rounds.length} pairs, all validated`);
for (const r of rounds) console.log(`  ${r.input}${r.B.note ? '   [B from saved data]' : ''}`);
