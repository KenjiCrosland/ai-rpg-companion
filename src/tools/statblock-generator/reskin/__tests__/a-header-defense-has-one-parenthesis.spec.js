/**
 * A HEADER DEFENSE CARRIES ONE PARENTHESIS (item 1.4, 2026-11-18).
 *
 * Ilvareth Dusksong (s28 of the forty) shipped:
 *
 *   Immunities  Psychic; Charmed ((with Mind Blank))
 *   Damage Immunities  psychic, charmed ((with mind blank))     [the 2014 half]
 *
 * The engine did not write it. The trace reads "print canon defenses: immunities none ->
 * Psychic; Charmed ((with Mind Blank)) — the Archmage's own header lines", and the doubling was in
 * `srd52-monsters.json` itself — on BOTH of print's only two parenthesised defenses, the Archmage's
 * and the Vampire Familiar's. Print writes one layer: "Charmed (with Mind Blank)". It is an artifact
 * of the markdown extraction the corpus came from, so the fix is the data, and the rows that quote
 * print are correct again without the engine learning anything.
 *
 * `sheet-lints.mjs` already CAUGHT it — `double-punctuation` names header fields explicitly and
 * fired on s28 twice. It reports; nothing repairs a header, so the sheet shipped anyway. That is why
 * this test guards the corpus rather than the renderer: the net was working and the hole was
 * upstream of it.
 */
import srd from '@/data/srd52-monsters.json';

const list = Array.isArray(srd) ? srd : (srd.monsters ?? Object.values(srd).flat());
const DEFENSES = ['immunities', 'resistances', 'vulnerabilities', 'damage_immunities', 'damage_resistances', 'condition_immunities'];

describe('a header defense carries one parenthesis', () => {
  test('the corpus actually has parenthesised defenses to judge', () => {
    const withParens = list.flatMap((m) => DEFENSES.filter((k) => typeof m[k] === 'string' && m[k].includes('(')).map((k) => `${m.name} ${k}: ${m[k]}`));
    expect(withParens).toHaveLength(2);           // the Archmage and the Vampire Familiar
    expect(withParens.join(' ')).toContain('Mind Blank');
  });

  test('no header defense in the corpus doubles a parenthesis', () => {
    const bad = list.flatMap((m) => DEFENSES.filter((k) => /\(\(|\)\)/.test(String(m[k] ?? ''))).map((k) => `${m.name} ${k}: ${m[k]}`));
    expect(bad).toEqual([]);
  });

  test("print's two citations read as print writes them", () => {
    expect(list.find((m) => m.name === 'Archmage').immunities).toBe('Psychic; Charmed (with Mind Blank)');
    expect(list.find((m) => m.name === 'Vampire Familiar').immunities).toBe('Charmed (except from its vampire master)');
  });

  // THE WHOLE CORPUS, not only the defenses: a doubled parenthesis anywhere is the same artifact,
  // and a row quoted onto a sheet carries it just as the header line did.
  test('no row text in the corpus doubles a parenthesis either', () => {
    const bad = [];
    for (const m of list) for (const r of Object.values(m.sections ?? {}).flat().filter((x) => x?.text)) {
      if (/\(\(|\)\)/.test(r.text)) bad.push(`${m.name} / ${r.name}`);
    }
    expect(bad).toEqual([]);
  });

  test('every parenthesis in the corpus is balanced', () => {
    const bad = [];
    for (const m of list) {
      const txt = [...DEFENSES.map((k) => m[k]), ...Object.values(m.sections ?? {}).flat().map((r) => r?.text)].filter((x) => typeof x === 'string').join(' ');
      const open = (txt.match(/\(/g) ?? []).length; const close = (txt.match(/\)/g) ?? []).length;
      if (open !== close) bad.push(`${m.name}: ${open} open, ${close} close`);
    }
    expect(bad).toEqual([]);
  });
});
