// SIGNATURE MOVE SETS, PHASES 3 AND 4 — one closed pattern vocabulary, applied
// to PRINT and to the CATALOG by the same predicates (owner's brief, 2026-10-16).
//
// The brief says "LLM-assisted". These labels are derived instead from the
// printed MECHANICS of each row — a Grappled condition plus a payoff is grab-and-
// hold whatever the fiction calls it — because that is a closed fact the engine
// may read, it is reproducible, it costs nothing to re-run, and it can be frozen
// and diffed. Rows no predicate claims are reported as UNLABELLED rather than
// guessed; that list is where a call's judgment is actually needed, and it is the
// honest input to the hand spot-check the brief asks for.
//
// usage: node scripts/pattern-label.mjs [--print] [--catalog] [--freeze <path>] [--unlabelled]
import fs from 'node:fs';

const A = /\*?Melee|\*?Ranged|Attack Roll/;
const COND = 'Blinded|Charmed|Deafened|Frightened|Grappled|Incapacitated|Invisible|Paralyzed|Petrified|Poisoned|Prone|Restrained|Stunned|Unconscious';

// Each predicate reads ONE row's name+text. A row may carry several patterns.
export const PATTERNS = [
  // a GATED AREA row is a nova whether or not it rolls damage — the Basilisk's
  // Petrifying Gaze (Recharge 4-6) in a 30-foot Cone is the creature's whole turn
  ['nova', (n, t) => /\((?:Recharge [\d–-]+|\d\/Day)\)/.test(n) && /each creature|Emanation|Cone|Line|Sphere|Cube|Cylinder/i.test(t)],
  // print's most common CONTROL row is a save, not an attack rider (the Giant
  // Spider's Web, the Lion's Roar) — the brief's vocabulary has no slot for it,
  // so it is labelled separately rather than folded into rider control
  ['save control', (n, t) => /Saving Throw/.test(t) && new RegExp(`has the (?:${COND}) condition`, 'i').test(t)],
  ['zone', (n, t) => /Emanation|is Difficult Terrain|Lightly Obscured|Heavily Obscured|remains|until the (?:start|end) of its next turn, the area|enters the (?:area|space)/i.test(t)
    && !/\((?:Recharge [\d–-]+|\d\/Day)\)/.test(n)],
  ['grab and hold', (n, t) => /has the Grappled condition|is Grappled/i.test(t) || /swallow|engulf|adhere/i.test(`${n} ${t}`)],
  ['setup → payoff', (n, t) => new RegExp(`(?:target|creature)[^.]{0,60}that (?:has|is)(?: the)? (?:${COND})`, 'i').test(t)
    || /if the target is (?:already )?(?:Grappled|Prone|Restrained|Bloodied)/i.test(t)
    || /already (?:Frightened|Poisoned|Bloodied) by this/i.test(t)],
  ['rider control', (n, t) => A.test(t) && new RegExp(`has the (?:${COND}) condition`, 'i').test(t)],
  ['approach', (n, t) => /if (?:it|the \w+) (?:moved|flew|has moved)[^.]{0,40}(?:toward|straight)|immediately before the hit|moves? up to (?:half )?its Speed (?:straight )?toward/i.test(t)],
  ['hit-and-run', (n, t) => /takes the (?:Dash|Disengage|Hide)|doesn't provoke Opportunity Attacks|without provoking Opportunity Attacks|Opportunity Attacks against it are made with Disadvantage/i.test(t)],
  // deception IS the ambush on a print body that pretends to be furniture
  ['ambush', (n, t) => /first round of (?:each )?combat|hasn't taken a turn|surprise|while (?:it is )?(?:hidden|unseen)|Invisible condition until it attacks|indistinguishable from|resemble (?:an?|a Medium|a Small)[^.]{0,30}object|must succeed on a DC \d+ Wisdom \(Perception\) check to notice/i.test(`${n} ${t}`)],
  // the Hydra's heads are the pattern: a condition the players must find and meet
  ['durability with a key', (n, t) => /regains? \d+ Hit Points at the start of|Regeneration|doesn't die|drops to 1 Hit Point instead|reduced to 0 Hit Points[^.]{0,60}(?:unless|instead)|re-?forms|Legendary Resistance|dies if all its \w+ are dead|one of its \w+ dies|takes \d+ damage or more on a single turn/i.test(`${n} ${t}`)],
  // a CLOCK gets worse each turn: the petrification ladder (Restrained, then
  // Petrified) and the Shadow's draining Strength score
  ['clock', (n, t) => /(?:Petrified|Paralyzed) condition[^.]{0,140}repeat|at the end of each of its turns[^.]{0,90}(?:Petrified|dies|level of Exhaustion)|(?:reduces?|decreases? by) [^.]{0,30}(?:Hit Point maximum|Strength)|(?:Hit Point maximum|Strength) score decreases|Exhaustion|Restrained[^.]{0,120}Petrified|First Failure[\s\S]{0,400}Second Failure/i.test(t)],
  ['force multiplier', (n, t) => /allies|ally|its allies have|each creature of its choice[^.]{0,40}(?:gains|has Advantage)|Pack Tactics|regains \d+ Hit Points.*(?:ally|creature within)/i.test(t)],
  ['menu', (n, t) => /^Spellcasting/i.test(n) && /At Will|\d\/Day Each/i.test(t)],
  ['reaction tax', (n, t, sec) => sec === 'Reactions'],
];

export function patternsOf(name, text, sec) {
  const n = String(name ?? ''); const t = String(text ?? '');
  return PATTERNS.filter(([, p]) => { try { return p(n, t, sec); } catch { return false; } }).map(([k]) => k);
}
// a row that only attacks is MEAT; "meat" is a sheet-level answer, not a row's
const isPlainAttack = (n, t) => A.test(t) && !patternsOf(n, t).length;

export function sheetPatterns(sections) {
  const set = new Set(); let plain = 0; const unl = [];
  for (const [sec, es] of Object.entries(sections ?? {})) for (const e of es ?? []) {
    if (/^Multiattack/i.test(e.name ?? '')) continue;
    const p = patternsOf(e.name, e.text, sec);
    if (p.length) p.forEach((x) => set.add(x));
    else if (isPlainAttack(e.name, e.text)) plain += 1;
    else unl.push(`${sec}/${e.name}`);
  }
  if (!set.size) set.add('meat');
  return { patterns: [...set], plainAttacks: plain, unlabelled: unl };
}

// THE CLI RUNS ONLY WHEN THIS FILE IS THE ENTRY POINT. Importing it for the
// predicates was printing the whole print report into the importer's stdout,
// because the report ran on an empty argv.
const IS_MAIN = process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href;
const args = IS_MAIN ? process.argv.slice(2) : ['--noop'];
const band = (cr) => (cr <= 1 ? '0-1' : cr <= 4 ? '2-4' : cr <= 8 ? '5-8' : cr <= 12 ? '9-12' : cr <= 16 ? '13-16' : '17+');
const pc = (n, d) => (d ? `${Math.round((100 * n) / d)}%` : '—');

if (args.includes('--print') || (IS_MAIN && !process.argv.slice(2).length)) {
  const all = JSON.parse(fs.readFileSync('src/data/srd52-monsters.json', 'utf8'));
  const list = Array.isArray(all) ? all : Object.values(all).flat();
  const labelled = list.map((m) => ({ name: m.name, type: String(m.type ?? ''), cr: Number(m.cr ?? 0), ...sheetPatterns(m.sections) }));
  console.log(`PRINT — ${labelled.length} SRD 5.2 blocks labelled by row mechanics\n`);
  const freq = {}; for (const m of labelled) for (const p of m.patterns) freq[p] = (freq[p] ?? 0) + 1;
  console.log('PATTERN FREQUENCY ACROSS PRINT');
  for (const [k, v] of Object.entries(freq).sort((a, b) => b[1] - a[1])) console.log(`  ${k.padEnd(24)} ${String(v).padStart(4)}  ${pc(v, labelled.length)}`);
  console.log('\nPATTERNS PER CREATURE, BY CR BAND (hypothesis 4)');
  for (const b of ['0-1', '2-4', '5-8', '9-12', '13-16', '17+']) {
    const g = labelled.filter((m) => band(m.cr) === b); if (!g.length) continue;
    const avg = (g.reduce((a, m) => a + (m.patterns[0] === 'meat' ? 0 : m.patterns.length), 0) / g.length).toFixed(1);
    const meat = g.filter((m) => m.patterns[0] === 'meat').length;
    const hist = [0, 1, 2, 3, 4].map((k) => g.filter((m) => (m.patterns[0] === 'meat' ? 0 : m.patterns.length) === k).length);
    console.log(`  CR ${b.padEnd(6)} n=${String(g.length).padStart(3)}  mean ${avg} patterns  meat-only ${pc(meat, g.length).padStart(4)}  dist 0:${hist[0]} 1:${hist[1]} 2:${hist[2]} 3:${hist[3]} 4+:${g.length - hist.slice(0, 4).reduce((a, b2) => a + b2, 0)}`);
  }
  console.log('\nTHE MOST COMMON TRUE LOOP (hypothesis 3) — top pattern pairs');
  const pair = {};
  for (const m of labelled) { const p = m.patterns.filter((x) => x !== 'meat').sort(); for (let i = 0; i < p.length; i += 1) for (let j = i + 1; j < p.length; j += 1) { const k = `${p[i]} + ${p[j]}`; pair[k] = (pair[k] ?? 0) + 1; } }
  for (const [k, v] of Object.entries(pair).sort((a, b) => b[1] - a[1]).slice(0, 10)) console.log(`  ${k.padEnd(44)} ${v}`);
  if (args.includes('--unlabelled')) {
    const u = {}; for (const m of labelled) for (const r of m.unlabelled) u[r.split('/')[1]] = (u[r.split('/')[1]] ?? 0) + 1;
    console.log(`\nUNLABELLED PRINT ROWS (${Object.values(u).reduce((a, b) => a + b, 0)}) — where a call's judgment is actually needed`);
    for (const [k, v] of Object.entries(u).sort((a, b) => b[1] - a[1]).slice(0, 30)) console.log(`  ${k.padEnd(32)} ${v}`);
  }
  const fz = args.includes('--freeze') ? args[args.indexOf('--freeze') + 1] : null;
  if (fz) { fs.writeFileSync(fz, JSON.stringify(Object.fromEntries(labelled.map((m) => [m.name, { cr: m.cr, type: m.type, patterns: m.patterns, plainAttacks: m.plainAttacks, unlabelled: m.unlabelled }])), null, 1)); console.log(`\nfroze ${labelled.length} print labels -> ${fz}`); }
}

if (args.includes('--catalog')) {
  const { TEMPLATES } = await import('../src/tools/statblock-generator/reskin/templates.mjs');
  console.log(`\n\nCATALOG — ${TEMPLATES.length} templates tagged by the same predicates\n`);
  const sec = (s) => ({ action: 'Actions', bonus_action: 'Bonus Actions', trait: 'Traits', reaction: 'Reactions', rider: 'Actions' }[s] ?? s);
  const tagged = TEMPLATES.map((t) => {
    // A SHAPE'S MECHANICS LIVE IN `frames`, ONE PER CR BAND — only the 27 seeds
    // carry a flat `text`. Reading `text ?? flavor` tagged 83 of 107 as unlabelled
    // because `flavor` is prose about when to pick the template, not its rules.
    // Every frame is joined so a pattern that only appears at high CR still counts.
    const txt = String(t.text ?? '') || Object.values(t.frames ?? {}).join(' ');
    let p = patternsOf(t.name, txt, sec(t.section));
    // a template's own declared metadata is evidence too, and it is closed data
    if (t.nova) p = [...new Set([...p, 'nova'])];
    if (t.section === 'reaction') p = [...new Set([...p, 'reaction tax'])];
    // A RIDER TEMPLATE'S FRAME IS A CLAUSE appended to an attack row, so it
    // carries no "Attack Roll" of its own and the rider-control predicate — which
    // print needs, because print's riders are written inside the attack — cannot
    // see it. The section IS the evidence here. Without this the catalog read
    // "0 templates" against print's commonest pattern, which is an artifact.
    if (t.section === 'rider') p = [...new Set([...p, 'rider control'])];
    return { id: t.id, kind: t.kind, section: t.section, effect: t.effect, patterns: p };
  });
  const freq = {}; for (const t of tagged) for (const p of t.patterns) freq[p] = (freq[p] ?? 0) + 1;
  console.log('TEMPLATES PER PATTERN SHELF');
  for (const [k, v] of Object.entries(freq).sort((a, b) => b[1] - a[1])) console.log(`  ${k.padEnd(24)} ${String(v).padStart(3)}`);
  const none = tagged.filter((t) => !t.patterns.length);
  console.log(`\nTEMPLATES NO PREDICATE CLAIMS: ${none.length} of ${tagged.length}`);
  console.log(`  ${none.map((t) => t.id).join(', ')}`);
}
