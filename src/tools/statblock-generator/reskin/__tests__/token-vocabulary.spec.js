/**
 * EVERY TOKEN THE CATALOGS WRITE IS ONE THE ENGINE SUBSTITUTES.
 *
 * On 2026-10-29 three donors were authored with `{energy_type}` — a token that
 * appears NOWHERE in the engine, while every other donor uses `{damage_type}`
 * (216 uses). It shipped unsubstituted on the Vampire's Grave Strike, which the
 * critic scored the run's best idea at soundness 0.
 *
 * The one guard built for this (`unfilled slot … failing loudly per spec`) was an
 * ALLOWLIST of four tokens, so it was blind to a token nobody had declared. It is
 * inverted now — no brace survives to ship — but that fires at generation time,
 * on a sheet, in front of whoever is watching.
 *
 * This fires at `npm test`, before a token can reach a sheet. It reads no
 * meaning: a catalog is a data file, the engine is what substitutes, so a token
 * appearing ONLY in the catalog that wrote it is a token nothing will replace.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'src/tools/statblock-generator');
const CATALOGS = ['reskin/donors.mjs', 'reskin/shapes.mjs', 'reskin/library.mjs', 'reskin/classes.mjs', 'reskin/species.mjs'];
const read = (f) => { try { return fs.readFileSync(path.join(ROOT, f), 'utf8'); } catch { return null; } };
// comments explain tokens (including this bug's own post-mortem), so they are not data
const stripComments = (src) => src.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^\s*\/\/.*$/gm, ' ');
// `${regen}` is JavaScript interpolation inside a template literal, not an engine
// token — the first cut of this test read the brace out of it and reported a
// shape's helper parameter as an undeclared slot.
const tokensIn = (src) => new Set([...src.matchAll(/(?<!\$)\{([a-z_0-9]+)\}/g)].map((m) => m[1]));

// the engine: every file that is not a catalog. Substitution lives here.
const engineSrc = (() => {
  const out = [];
  const walk = (dir) => { for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.relative(ROOT, path.join(dir, e.name));
    if (e.isDirectory()) { if (!/__tests__|node_modules/.test(e.name)) walk(path.join(dir, e.name)); continue; }
    if (!e.name.endsWith('.mjs') || CATALOGS.includes(rel)) continue;
    out.push(fs.readFileSync(path.join(dir, e.name), 'utf8'));
  } };
  walk(ROOT);
  return out.join('\n');
})();
// A TOKEN IS DECLARED IN ANY OF THREE FORMS. The engine substitutes slots
// generically against a fills map, so a slot is named as a bare string in a slot
// table ('disguise') rather than as a brace. Tokens the renderer writes literally
// appear as {damage_type}. Either counts; nothing else does.
const engineClean = stripComments(engineSrc);
const declared = (t) => new RegExp(`\\{${t}\\}|['"\`]${t}['"\`]|\\b${t}:`).test(engineClean);
const vocabulary = { has: declared, size: tokensIn(engineClean).size };

describe('the catalogs speak the engine\'s vocabulary', () => {
  it.each(CATALOGS)('%s writes no token the engine never substitutes', (file) => {
    const src = read(file); if (src === null) return;
    // A CATALOG MAY PROVIDE ITS OWN TOKENS. `library.mjs` substitutes
    // `{imposed_bound}` and `{imposed_condition}` at its own draw site, so the
    // file that writes a token also counts as a place that can declare it.
    const own = stripComments(src);
    // the brace may be INSIDE the quotes — `text.split('{imposed_bound}')` — so
    // the declaration form accepts it either way
    const unknown = [...tokensIn(own)].filter((t) => !vocabulary.has(t) && !new RegExp(`['"\`]\\{?${t}\\}?['"\`]|\\b${t}:`).test(own)).sort();
    expect(`${file}: ${unknown.join(', ') || 'none'}`).toBe(`${file}: none`);
  });

  it('the vocabulary is non-trivial, so this cannot pass by reading nothing', () => {
    expect(vocabulary.size).toBeGreaterThan(30);
    for (const t of ['damage_type', 'dc', 'save_stat', 'duration', 'projectile', 'disguise', 'mimicked']) expect(vocabulary.has(t)).toBe(true);
  });

  it('and it would have caught the one that shipped: {energy_type} is not in it', () => {
    expect(vocabulary.has('energy_type')).toBe(false);
  });
});
