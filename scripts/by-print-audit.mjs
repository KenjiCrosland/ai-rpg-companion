// STAGE 2 ITEM 5 (owner's fix order, 2026-10-16) — audit every "by print" rule
// against the FROZEN SRD 5.2 labels. "Skulker owes assassinate by print" is the
// first: the Assassin has no Assassinate in SRD 5.2 and ambush is 3 of 329.
// Changes nothing; reports what print actually says about each claim.
import fs from 'node:fs';
const { SEAT_DEFAULT_TRAIT } = await import('../src/tools/statblock-generator/reskin/templates.mjs');
const { patternsOf } = await import('./pattern-label.mjs');
const print = JSON.parse(fs.readFileSync('src/data/print-patterns.json', 'utf8'));
const all = JSON.parse(fs.readFileSync('src/data/srd52-monsters.json', 'utf8'));
const list = Array.isArray(all) ? all : Object.values(all).flat();

// what each owed template actually does, by its own mechanics
const { TEMPLATES } = await import('../src/tools/statblock-generator/reskin/templates.mjs');
const byId = new Map(TEMPLATES.map((t) => [t.id, t]));
const patOf = (id) => {
  const t = byId.get(id); if (!t) return ['(no such template)'];
  const txt = String(t.text ?? '') || Object.values(t.frames ?? {}).join(' ');
  const p = patternsOf(t.name, txt, { trait: 'Traits', action: 'Actions', bonus_action: 'Bonus Actions', reaction: 'Reactions', rider: 'Actions' }[t.section] ?? t.section);
  return p.length ? p : ['(passive — no pattern)'];
};
// does any print block carry a row whose NAME is this template's name?
const printRowsNamed = (name) => list.filter((m) => Object.values(m.sections ?? {}).flat().some((e) => String(e.name ?? '').replace(/\s*\(.*\)$/, '').toLowerCase() === String(name).toLowerCase()));

const pf = {}; const N = Object.keys(print).length;
for (const m of Object.values(print)) for (const p of m.patterns) pf[p] = (pf[p] ?? 0) + 1;

console.log('STAGE 2 ITEM 5 — "owed by print" audited against the frozen labels\n');
console.log('A seat that OWES a trait seats it before the idea, so the claim had better be print\'s.\n');
for (const [seat, owed] of Object.entries(SEAT_DEFAULT_TRAIT)) {
  if (!owed.length) { console.log(`  ${seat.padEnd(10)} owes nothing`); continue; }
  for (const id of owed) {
    const t = byId.get(id);
    const pats = patOf(id);
    const named = printRowsNamed(t?.name ?? id);
    const share = pats.map((p) => `${p} ${Math.round((100 * (pf[p] ?? 0)) / N)}% of print`).join('; ');
    const verdict = !named.length ? `*** NO PRINT ROW IS NAMED "${t?.name ?? id}" ***`
      : named.length <= 2 ? `thin: ${named.length} print block(s) — ${named.map((m) => m.name).join(', ')}`
      : `${named.length} print blocks carry it`;
    console.log(`  ${seat.padEnd(10)} owes ${String(id).padEnd(18)} [${share}]`);
    console.log(`  ${' '.repeat(10)}      ${verdict}`);
  }
}
// and the cite each template claims, checked for existence
console.log('\nEVERY TEMPLATE\'S `cite` — does the print creature it names still exist in SRD 5.2?');
const missing = [];
for (const t of TEMPLATES) {
  if (!t.cite) continue;
  for (const m of String(t.cite).matchAll(/([A-Z][A-Za-z' -]+?)\/([A-Z][A-Za-z' -]+?)(?: \(|;|,|$)/g)) {
    const creature = m[1].trim(); const row = m[2].trim();
    const blk = list.find((x) => x.name.toLowerCase() === creature.toLowerCase());
    if (!blk) { missing.push(`${t.id}: cites "${creature}" — NOT IN SRD 5.2`); continue; }
    const has = Object.values(blk.sections ?? {}).flat().some((e) => String(e.name ?? '').replace(/\s*\(.*\)$/, '').toLowerCase().startsWith(row.toLowerCase().slice(0, 12)));
    if (!has) missing.push(`${t.id}: cites ${creature}/"${row}" — the creature exists, that row does not`);
  }
}
console.log(missing.length ? missing.map((x) => `  ${x}`).join('\n') : '  every cite resolves');
console.log(`\n  ${missing.length} broken cite(s) of ${TEMPLATES.filter((t) => t.cite).length} templates that carry one`);
