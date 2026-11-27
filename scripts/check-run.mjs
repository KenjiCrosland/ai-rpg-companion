#!/usr/bin/env node
// node --import ./scripts/alias-loader.mjs scripts/check-run.mjs <run-dir> [--out <path>]
// The mechanics checker over a smoke run: one row per block, one column per gate.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { checkBlock, checkTable, GATES } from '../src/tools/statblock-generator/reskin/checker.mjs';
import { PRINT_ROW_NAMES } from '../src/tools/statblock-generator/reskin/generate.mjs';
import { SHAPES } from '../src/tools/statblock-generator/reskin/shapes.mjs';
// FROZEN CLAUSE LISTS (critic's package-seven review, 2026-10-22). The clause
// extraction is an LLM call, so the same concept yields a different list run to
// run and two forties score against different denominators (Caustic Scythe 5 -> 4,
// Meshrin 7 -> 8 from the same words). The first time a concept is scored, its
// list is frozen here keyed by a hash of the concept text; later runs score
// against that list and any drift is REPORTED rather than silently moving the
// denominator. Delete an entry to re-freeze deliberately. Measurement only — the
// engine never reads this file.
const FREEZE = path.join('scripts', 'frozen-clauses.json');
const conceptHash = (t) => crypto.createHash('sha1').update(String(t ?? '').trim()).digest('hex').slice(0, 12);
// THE LEDGER SCOREBOARD (Fable's round one, Part A, 2026-11-26). The owner reads one count each
// round: how many typed asks reached the finished sheet. It is read off generation.ledger, which
// the engine writes last, so it cannot be contradicted by a later pass.
const LEDGERS = [];
const ledgerScoreboard = () => {
  const withL = LEDGERS.filter((x) => Array.isArray(x.ledger));
  if (!withL.length) return '';
  const all = withL.flatMap((x) => x.ledger.filter((e) => e.status !== 'header'));
  const n = (f) => all.filter(f).length;
  const reasons = {};
  for (const e of all.filter((x) => x.status === 'open')) reasons[e.reason ?? 'unknown'] = (reasons[e.reason ?? 'unknown'] ?? 0) + 1;
  const answered = all.filter((e) => e.status === 'answered');
  const byReceiptOrAnchor = answered.filter((e) => e.boundBy !== 'handed').length;
  return `\n## The ledger — typed asks that reached the sheet\n\n`
    + `**${all.length} ask(s) across ${withL.length} sheet(s): ${answered.length} answered `
    + `(${byReceiptOrAnchor} by receipt or anchor, ${answered.length - byReceiptOrAnchor} handed), `
    + `${n((e) => e.status === 'mismatch')} mismatch, ${n((e) => e.status === 'open')} open.**\n\n`
    + (Object.keys(reasons).length ? `Open by reason: ${Object.entries(reasons).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(', ')}.\n` : '')
    + (all.filter((e) => e.conditionUnchecked).length ? `\n${all.filter((e) => e.conditionUnchecked).length} entr(ies) name a condition the engine could not check against the row.\n` : '');
};

const frozen = (() => { try { return JSON.parse(fs.readFileSync(FREEZE, 'utf8')); } catch { return {}; } })();
const drift = [];
const freezeFor = (block) => {
  const g = block?.generation ?? block?.other_edition?.generation ?? {};
  const concept = String(g.userConcept ?? '').trim();
  const live = g.clauses ?? null;
  if (!concept || !Array.isArray(live)) return null;
  const key = conceptHash(concept);
  const seen = frozen[key];
  if (!seen) { frozen[key] = { concept: concept.slice(0, 120), clauses: live }; return null; }
  // COMPARE WHAT THE DENOMINATOR DEPENDS ON, not just the text. The checker's
  // `listed` filter keys on `head` and `kind`, so a clause re-marked
  // descriptive -> mechanical moves the denominator with the clause COUNT
  // unchanged. Measured over the two forties: 0 of 39 concepts drifted by text,
  // but 4 of 39 drifted by marks — Caustic Scythe 5 -> 4 and Meshrin 7 -> 8 are
  // both re-markings, which is what the critic saw and what a text-only
  // comparison reported as "no drift".
  const shape = (c) => `${String(c?.text ?? c)}#${c?.kind ?? ''}#${c?.head ? 'H' : ''}#${c?.polarity ?? ''}`;
  const a = seen.clauses.map(shape).join('|');
  const b = live.map(shape).join('|');
  if (a !== b) {
    const marks = seen.clauses.length === live.length ? ' (same count — re-marked kind/head)' : '';
    drift.push(`${block.name}: ${seen.clauses.length} frozen vs ${live.length} this run${marks}`);
  }
  return seen.clauses;
};

const args = process.argv.slice(2); const dir = args.find((a) => !a.startsWith('--'));
if (!dir) { console.error('usage: node --import ./scripts/alias-loader.mjs scripts/check-run.mjs <run-dir> [--out <path>]'); process.exit(2); }
const out = args.includes('--out') ? args[args.indexOf('--out') + 1] : path.join('scripts', 'smoke-evidence', `CHECK-${path.basename(dir)}.md`);
/**
 * THE BATCH CHECK (N3, 2026-11-01). The release bar asks that no INVENTED row name
 * repeat across a run, and that no two rows ship byte-identical text.
 *
 * Two closed sets are exempt, and neither is a word list:
 *   - `PRINT_ROW_NAMES`, derived from the corpus at import. It already contains
 *     print's generic attack names — bite, claw, rend, slam, talons — so no
 *     separate "plain attack name" list is needed or wanted.
 *   - the CATALOG's own template names. The owner's one-mechanic-one-name ruling
 *     (2026-10-27) says a stock row CONVERGES on its template's name, so two
 *     sheets both carrying `ground-burst` both call it "Shockwave". That is the
 *     ruling working, not a repeat — it read as the forty's one name violation
 *     until this exemption existed.
 * The STOCK tally is reported too, so the exemption cannot hide what it exempts.
 */
const TEMPLATE_NAMES = new Set(SHAPES.map((t) => String(t.name ?? '').trim().toLowerCase()).filter(Boolean));
const bareRow = (n) => String(n ?? '').replace(/ \(.*\)$/, '').trim();
const batchNames = new Map(); const batchStock = new Map(); const batchTexts = new Map();
// WHAT MAY NOT DIFFER between two rows that share a name — the MECHANIC, never
// the numbers. A stock name is SUPPOSED to repeat with its own sheet's numbers
// (the one-mechanic-one-name ruling), so dice, attack bonus, DC and area SIZE are
// all excluded: every creature's Bite has its own. What may not differ is the kind
// of thing the row is — does it ask a save or roll an attack, does it hit an area
// or one creature, which conditions does it hand out. The first cut compared the
// numbers too and flagged `bite` on 9 sheets, which is the ruling working.
const rowShape = (t) => {
  const s = String(t ?? '');
  return JSON.stringify({
    kind: /Attack Roll/i.test(s) ? 'attack' : /Saving Throw/i.test(s) ? 'save' : 'other',
    save: /\*?(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) Saving Throw/i.exec(s)?.[1] ?? null,
    reach: /\b(Cone|Sphere|Line|Cube|Cylinder|Emanation)\b/i.exec(s)?.[1]?.toLowerCase()
      ?? (/\bone creature\b|\bone target\b/i.test(s) ? 'single' : null),
    conds: [...new Set([...s.matchAll(/has the (\w+) condition/g)].map((x) => x[1]))].sort().join(',') || null,
  });
};
const batchShapes = new Map();
const batchScan = (block, file) => {
  // A ROW SAYS WHAT IT IS. Every piece of engine furniture carries a DECLARED
  // flag — `print` (imported from the corpus), `kit` (a species row such as the
  // lizardfolk's Marsh Stride), `feature` (a class feat such as Great Weapon
  // Master), `rules` (a derived line such as "Legendary Action Uses: 3"),
  // `library`/`template` (a catalog shape). Those names are SUPPOSED to repeat:
  // the owner's one-mechanic-one-name ruling says a stock row converges on its
  // catalog name. Only a name the MODEL coined can be an invented repeat.
  //
  // The flags live on whichever side the engine built; a 2014 sheet keeps the
  // flagged rows under `other_edition`. So both sides are read and the flags are
  // UNIONED per name per file, or a 2014 row would look unflagged and a kit name
  // would read as an invention. (That is how Marsh Stride, Great Weapon Master
  // and the legendary header first showed up as three "invented" repeats.)
  const seen = new Map();
  const push = (r) => {
    const nm = bareRow(r.name); if (!nm) return;
    const key = nm.toLowerCase();
    const stock = !!(r.print || r.kit || r.feature || r.rules || r.library || r.template)
      || PRINT_ROW_NAMES.has(key) || TEMPLATE_NAMES.has(key);
    const prev = seen.get(key) ?? { nm, stock: false, text: '', template: null };
    seen.set(key, { nm, stock: prev.stock || stock, template: prev.template || r.template || r.seed || null, text: prev.text || String(r.text ?? r.description ?? '').replace(/\s+/g, ' ').trim() });
  };
  for (const sec of [block.sections ?? {}, (block.other_edition ?? {}).sections ?? {}]) {
    for (const rs of Object.values(sec)) if (Array.isArray(rs)) rs.filter((r) => r && typeof r === 'object').forEach(push);
  }
  for (const sec of ['abilities', 'actions', 'traits', 'legendary_actions', 'reactions']) {
    if (Array.isArray(block[sec])) block[sec].filter((r) => r && typeof r === 'object').forEach(push);
  }
  for (const [key, v] of seen) {
    const bag = v.stock ? batchStock : batchNames;
    if (!bag.has(key)) bag.set(key, new Set());
    bag.get(key).add(file);
    // ONE NAME, ONE MECHANIC (N4, 2026-11-02). The owner's ruling says a stock row
    // converges on its catalog name, and the byte-identical check above watches the
    // opposite failure — the same text twice. Between them sits the one the critic
    // found and this report PASSED: "Sundering Shove" shipped a 30-foot cone on the
    // Scaffold Ram and a single-target shove on the Stone Golem. Same name, two
    // rules, is worse than the same text twice: a GM who learns one row learns the
    // wrong thing about the other. Compared by STRUCTURE — the save stat, the DC,
    // the dice, the target shape — not by wording, which may differ freely.
    // ONE TEMPLATE, ONE MECHANIC — keyed on the TEMPLATE, never on the name. The
    // ruling says a catalog row converges on its catalog name; it does not license
    // two MECHANICS under one template. `push-prone` defines a single-target shove
    // and shipped as "Sundering Shove" twice — a 30-foot Cone on the Scaffold Ram,
    // "one creature within 5 feet" on the Stone Golem (critic, forty #1).
    //
    // Keying on the NAME instead flagged `bite` on 9 sheets and `slam` on 5, which
    // is the ruling working as designed: an anatomy row takes its body's own
    // mechanic (a dire wolf's Bite knocks Prone, a purple worm's grapples) and
    // those names are not a template's promise. `template` is declared on the row,
    // so this reads a field rather than guessing from the name.
    if (v.template && v.text.length > 40) {
      const tk = `${v.template} as "${v.nm}"`;
      if (!batchShapes.has(tk)) batchShapes.set(tk, new Map());
      batchShapes.get(tk).set(file, rowShape(v.text));
    }
    if (!v.stock && v.text.length > 60) {
      if (!batchTexts.has(v.text)) batchTexts.set(v.text, new Set());
      batchTexts.get(v.text).add(`${file} / ${v.nm}`);
    }
  }
};
const batchReport = () => {
  const rep = (m) => [...m.entries()].filter(([, f]) => f.size >= 2).sort((a, b) => b[1].size - a[1].size);
  const inv = rep(batchNames); const stock = rep(batchStock); const txt = rep(batchTexts);
  const lines = ['', '## Batch check', '',
    `**Invented row names repeated across sheets: ${inv.length}**` + (inv.length ? '' : ' ✓'),
    ...inv.map(([n, f]) => `- \`${n}\` on ${f.size} sheets: ${[...f].join(', ')}`),
    '',
    `Stock names that converged (exempt by the one-mechanic-one-name ruling; counted, not failed): ${stock.length}`,
    ...stock.slice(0, 8).map(([n, f]) => `- \`${n}\` ×${f.size}`),
    '',
    `**Byte-identical row texts across sheets: ${txt.length}**` + (txt.length ? '' : ' ✓'),
    ...txt.map(([, f]) => `- ${[...f].join('  ==  ')}`),
    '',
    ...(() => {
      const split = [...batchShapes.entries()]
        .filter(([, byFile]) => byFile.size >= 2 && new Set([...byFile.values()]).size > 1)
        .sort((a, b) => b[1].size - a[1].size);
      return [`**One template, two mechanics across sheets: ${split.length}**` + (split.length ? '' : ' ✓'),
        ...split.flatMap(([n, byFile]) => [`- \`${n}\` on ${byFile.size} sheets, ${new Set([...byFile.values()]).size} different rules:`,
          ...[...byFile.entries()].map(([f, sh]) => `    - ${f}: ${sh}`)])];
    })(),
  ];
  return lines.join('\n');
};

// AUDIT FINDINGS DISMISSED ON PRINT ROWS (owner's ruling, 2026-11-14).
//
// The audit reads every sheet and the engine repairs only free and authored rows, so a
// finding on a row carrying print's stamp is dropped. That is often right — the audit
// arguing with published text — and sometimes it is OUR paste having broken print's row,
// which is the valuable kind. Fix 4 found two of those: Thornback's Bite named the ankheg
// and Lord Vexmoor's Misty Step named the mage, both CAUGHT here and waved through.
//
// This REPORTS. It raises no FAIL, changes no sheet, and the exemption is untouched. The
// owner reads the list after the next forty and decides whether narrowing it is worth
// changing what the audit call returns.
const dismissed = [];
let sheetsWithRecord = 0;
const dismissedScan = (block, file) => {
  const rec = block?.generation?.audit_dismissed_on_print;
  // ABSENT IS NOT ZERO. The field is stamped by the audit step, so its absence means the
  // sheet is older than 2026-11-14 OR the audit never ran — and neither is the same fact as
  // "the audit ran and dismissed nothing". It is deliberately not defaulted at creation.
  if (!Array.isArray(rec)) return;
  sheetsWithRecord += 1;
  for (const d of rec) dismissed.push({ file, name: block?.name ?? file, ...d });
};
const dismissedReport = () => {
  const lines = ['', '## Audit findings dismissed on print rows', ''];
  if (!sheetsWithRecord) return [...lines, '- no record on any sheet in this run: either older sheets, or the audit step did not run', ''].join('\n');
  lines.push(`**${dismissed.length}** finding(s) dismissed across ${sheetsWithRecord} sheet(s) that carry the record.`, '');
  if (!dismissed.length) return [...lines, '- none', ''].join('\n');
  for (const d of dismissed) lines.push(`- ${d.name} · ${d.section}/"${String(d.row).replace(/ \(.*\)$/, '')}" — ${d.message}`);
  lines.push('', 'Reporting only: none of these raised a FAIL or changed a sheet.', '');
  return lines.join('\n');
};

const results = [];
for (const f of fs.readdirSync(dir).filter((x) => /^\d+-.*\.json$/.test(x)).sort()) {
  const raw = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); const block = raw.monster ?? raw;
  LEDGERS.push({ name: (raw.monster ?? raw)?.name ?? f, ledger: ((raw.monster ?? raw)?.generation?.ledger) ?? null });
  batchScan(block, f);
  dismissedScan(block, f);
  try { results.push({ file: f, ...checkBlock(block, { frozenClauses: freezeFor(block) ?? undefined }) }); } catch (e) { results.push({ file: f, name: f, cr: '?', edition: '?', donor: null, gates: Object.fromEntries(GATES.map((g) => [g, { status: 'soft', findings: [] }])), fails: [], softs: [], error: String(e?.message ?? e) }); }
}
let md = `# Mechanics check — ${path.basename(dir)}\n\n${checkTable(results, { title: 'Gate table' })}\n`;
for (const r of results) {
  const lines = GATES.flatMap((g) => r.gates[g].findings.filter((x) => x.severity !== 'ok').map((x) => `- ${g} · ${x.severity.toUpperCase()} · ${x.rule}: ${x.message}`));
  const floats = GATES.flatMap((g) => r.gates[g].findings.filter((x) => x.severity === 'ok').map((x) => `- ${g} · note · ${x.rule}: ${x.message}`));
  md += `\n## ${r.name} (CR ${r.cr}${r.edition === '2014' ? ', 2014' : ''})\n${r.error ? `- checker error: ${r.error}\n` : ''}${lines.join('\n') || '- clean'}\n${floats.length ? `${floats.join('\n')}\n` : ''}`;
  if (r.read) md += `- read: def ${r.read.def} / off ${r.read.off} → ${r.read.read}; sustained ${r.read.sustained} (${r.read.attacks} × ${r.read.used?.name ?? '?'}${r.read.legendary?.avg ? ` + legendary ${r.read.legendary.name}` : ''}); nova ${r.read.nova ? `${r.read.nova.name} ${r.read.nova.avg}` : 'none'}; dmg ${r.read.dmg.toFixed(0)}\n`;
}
fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, `${md}\n${ledgerScoreboard()}\n${dismissedReport()}\n${batchReport()}\n`); console.log(`wrote ${out}`);
console.log(`${results.filter((r) => r.fails.length).length} block(s) with a FAIL of ${results.length}`);
console.log(`${dismissed.length} audit finding(s) dismissed on print rows across ${sheetsWithRecord} sheet(s) carrying the record`);
// persist any newly frozen concepts, and SAY SO when a run's extraction drifted
// from the frozen list — the denominator stays put, the drift is visible
fs.writeFileSync(FREEZE, `${JSON.stringify(frozen, null, 1)}\n`);
if (drift.length) {
  console.log(`\n${drift.length} concept(s) whose extraction DRIFTED from the frozen list (scored against the frozen one):`);
  drift.forEach((d) => console.log(`  ${d}`));
} else {
  console.log(`clause lists: ${Object.keys(frozen).length} concept(s) frozen, no drift`);
}
