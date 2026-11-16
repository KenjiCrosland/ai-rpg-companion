// Reference check for a class standing on a people's own printed body (2026-11-15).
//
//   node --import ./scripts/alias-loader.mjs scripts/reference-lend-checks.mjs
//
// No model: the path is handed in and the stub reads the answer skeleton out of the prompt.
//
// WHAT IT CHECKS, for mage and cleric on each declared people at several CRs
//   1. THE SPELL LIST FITS THE SHEET'S CR. Every spell on the people's body must also be on
//      the list the same class carries at the same CR when it stands on the class's own body
//      (no print_body). That path already trims by CR. A shorter list is fine; a spell the
//      class's own body would not have at that CR is not. ONE ALLOWANCE (owner's side, 2026-11-15):
//      the lending block's own At Will line is accepted as it stands. Print's Mage has Light and
//      Mage Armor at will where the low-CR chassis has Minor Illusion; both are fit for CR 1.
//   2. NO FUSED RIDER. No attack row reads "<damage> if the attack roll had Advantage" without
//      the "plus N (dice)" that print puts before it.
const R = `${process.cwd()}/src/tools/statblock-generator/reskin`;
const { generateReskin } = await import(`${R}/generate.mjs`);

const keysOf = (p, field) => { const i = p.indexOf(`"${field}": {`); if (i < 0) return []; return [...p.slice(i + field.length + 5, p.indexOf('}', i)).matchAll(/"([^"]+)":\s*"</g)].map((m) => m[1]); };
const stub = () => { let cached = null; return async (p0) => {
  const p = typeof p0 === 'string' ? p0 : JSON.stringify(p0); const rk = keysOf(p, 'renames');
  if (rk.length || !cached) {
    const renames = Object.fromEntries(rk.map((k, i) => [k, `Named Row${i}`])); const typed = [...keysOf(p, 'damage_types'), ...Object.values(renames)];
    cached = JSON.stringify({ name: 'Pip', type: 'Humanoid', size: 'Small', alignment: 'Neutral', senses: 'darkvision 60 ft.', languages: 'Common', renames,
      damage_types: Object.fromEntries(typed.map((n) => [renames[n] ?? n, 'Bludgeoning'])), conditions: { condition_minor: 'Prone' }, melee_rider: 'none', projectile: 'stone',
      wildcard: '*Strength Saving Throw*: DC 12, one creature within 10 feet. *Failure:* The target has the Prone condition.' });
  }
  return cached; }; };
const build = (concept, cr, path) => generateReskin({ mechanics: [], archetype: 'caster', concept, userConcept: concept, cr, path }, stub());
const spellsOf = (m) => { const sp = Object.values(m.sections).flat().find((e) => /^Spellcasting/.test(e.name ?? '')); return sp ? [...String(sp.text).matchAll(/\*([A-Z][A-Za-z' ]+)\*/g)].map((x) => x[1]).filter((s) => !/^(At Will|\d\/Day)/.test(s)).sort().join(', ') : null; };
const atWillOf = (m) => { const sp = Object.values(m.sections).flat().find((e) => /^Spellcasting/.test(e.name ?? '')); const line = sp ? (/At Will:\*\*([^\n]*)/.exec(String(sp.text)) ?? [])[1] ?? '' : ''; return [...line.matchAll(/\*([A-Z][A-Za-z' ]+)\*/g)].map((x) => x[1]); };
const FUSED = /\)\s+\w+ damage if the attack roll had Advantage/; const PRINTS = /plus \d+ \([^)]*\) \w+ damage if the attack roll had Advantage/;

const PEOPLES = ['Kobold Warrior', 'Goblin Warrior', 'Hobgoblin Warrior', 'Bugbear Warrior', 'Satyr', 'Centaur Trooper'];
const CLASSES = ['mage', 'cleric', 'rogue', 'fighter']; const CRS = [1, 2, 3, 4, 6, 8];
const log = console.log; for (const k of ['log', 'warn', 'info', 'debug']) console[k] = () => {};
const own = {}; const lenderAtWill = {}; const wrongList = []; const fused = []; let cases = 0, threw = 0;
for (const cls of ['mage', 'cleric']) for (const cr of CRS) {
  try { own[`${cls}@${cr}`] = spellsOf(await build(`a ${cls}`, cr, { path: 'class_npc', print_body: null, relation: null, class: cls })); } catch { own[`${cls}@${cr}`] = 'THREW'; }
}
for (const cls of ['mage', 'cleric']) { try { lenderAtWill[cls] = atWillOf(await build(`a ${cls}`, 8, { path: 'class_npc', print_body: null, relation: null, class: cls })); } catch { lenderAtWill[cls] = []; } }
for (const body of PEOPLES) for (const cls of CLASSES) for (const cr of CRS) {
  cases++;
  const concept = `${body.split(' ')[0].toLowerCase()} ${cls}`;
  let m; try { m = await build(concept, cr, { path: 'class_npc', print_body: body, relation: 'is', class: cls }); } catch { threw++; continue; }
  for (const e of Object.values(m.sections).flat()) if (FUSED.test(e.text ?? '') && !PRINTS.test(e.text ?? '')) fused.push(`${body} ${cls} CR ${cr}: ${e.name}: ${String(e.text).slice(0, 110)}`);
  if (cls === 'mage' || cls === 'cleric') { const got = spellsOf(m); const want = own[`${cls}@${cr}`]; const extra = (got ?? '').split(', ').filter((s) => s && !(want ?? '').split(', ').includes(s) && !(lenderAtWill[cls] ?? []).includes(s)); if (got === null || extra.length) wrongList.push(`${body} ${cls} CR ${cr}\n      on the people's body: ${got}\n      on the class's own:   ${want}\n      not on the class's own: ${extra.join(', ') || '(no Spellcasting row)'}`); }
}
console.log = log;
console.log(`cases ${cases}, threw ${threw}`);
console.log(`the lender's At Will line: mage ${lenderAtWill.mage?.join(', ')} | cleric ${lenderAtWill.cleric?.join(', ')}`);
console.log(`the class's own list, by CR:`); for (const [k, v] of Object.entries(own)) console.log(`   ${k.padEnd(10)} ${v}`);
console.log(`caster sheets carrying a spell the class's own body would not have at that CR: ${wrongList.length} of ${PEOPLES.length * 2 * CRS.length}`); for (const x of wrongList.slice(0, 6)) console.log(`   ${x}`);
console.log(`rows with a rider fused onto the base damage: ${fused.length}`); for (const x of fused.slice(0, 6)) console.log(`   ${x}`);
process.exitCode = threw || wrongList.length || fused.length ? 1 : 0;
