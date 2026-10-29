/**
 * ONE READER FOR A RUN'S SHEETS.
 *
 * Six scripts each resolved a sheet's rows their own way, and every ad-hoc probe
 * invented a seventh. That cost real money twice: a sweep read as "58% of sheets
 * land nothing" when the truth was 13%, because the script walked `sections` and
 * 2014 sheets keep their rows in `abilities`. The same mistake corrupted a lever
 * framing a week earlier. The shapes on disk, counted over every run in
 * smoke-out:
 *
 *     bare 2024, `sections`                        — the 2024 model, rows stamped
 *     bare 2014, `abilities` + `other_edition`     — 2014 card; the STAMPED model
 *                                                    is in other_edition
 *     bare 2014, `abilities` only                  — the conversion fell back to
 *                                                    the deterministic shape and
 *                                                    the engine stamps are GONE
 *
 * That third shape is the trap: it has no 2024 model, so it cannot be scored for
 * feature rows at all. `modelOf` returns null and callers must report it as
 * UNSCORABLE — never as a sheet that landed nothing.
 */
import fs from 'node:fs';
import path from 'node:path';

/** Every sheet in a run directory, in file order. */
export function readRun(dir) {
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => ({ file: f, sheet: JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) }));
}

/** The 2024 model — the only printing that carries engine stamps. Null when the conversion fell back. */
export const modelOf = (sheet) => (sheet?.sections ? sheet : (sheet?.other_edition?.sections ? sheet.other_edition : null));
export const scorable = (sheet) => !!modelOf(sheet);
export const nameOf = (sheet) => String(sheet?.name ?? modelOf(sheet)?.name ?? '?');
export const formatOf = (sheet) => String(sheet?.format ?? modelOf(sheet)?.format ?? '?');

export const generationOf = (sheet) => sheet?.generation ?? sheet?.other_edition?.generation ?? {};
/** exact | twist | homebrew | class_npc | blank — declared by the dispatcher, not inferred. */
export const pathOf = (sheet) => String(generationOf(sheet).pipeline?.path ?? '?');

/** A path whose sheets are SUPPOSED to carry no engine feature row. */
export const expectedBare = (sheet) => pathOf(sheet) === 'exact' || pathOf(sheet) === 'blank';

const PREAMBLE = /^(?:Legendary Action Uses)/;
/** [{ sec, row }] from the stamped model. Multiattack and the 2024 preamble are left out. */
export function rowsOf(sheet) {
  const m = modelOf(sheet);
  if (!m) return [];
  return Object.entries(m.sections ?? {}).flatMap(([sec, es]) => (es ?? [])
    .filter((e) => e && !PREAMBLE.test(String(e.name ?? '')) && !/^Multiattack/.test(String(e.name ?? '')))
    .map((e) => ({ sec, row: e })));
}

/** A row the ENGINE put there — a template, a library draw or a seed. */
export const isFeatureRow = (row) => !!(row?.template || row?.library || row?.seed);
export const featureRowsOf = (sheet) => rowsOf(sheet).filter(({ row }) => isFeatureRow(row));

export const clausesOf = (sheet) => (generationOf(sheet).clauses ?? []).filter((c) => c && typeof c.text === 'string');

/**
 * Which clauses a row on the sheet actually answers, by the engine's OWN
 * provenance: a row carries `clauseId`, and `generation.clauses[].id` matches it.
 * No prose matching, and nothing credited for merely appearing in the
 * description — the coverage metric credits a descriptive clause to the flavour
 * text, which is why a sheet could read 60% covered while delivering none of the
 * nouns the GM typed.
 */
export function deliveredClauseIds(sheet) {
  const out = new Set();
  for (const { row } of rowsOf(sheet)) {
    if (row.clauseId) out.add(String(row.clauseId));
    for (const id of row.clauseIds ?? []) out.add(String(id));
  }
  return out;
}

/** The per-sheet signature tally the engine traces, parsed. Null when the run kept no trace. */
export function pickTallyOf(dir, file) {
  const md = path.join(dir, file.replace(/\.json$/, '.md'));
  if (!fs.existsSync(md)) return null;
  const line = /accepted picks lost: (\d+) of (\d+)(?: \(([^)]*)\))?/.exec(fs.readFileSync(md, 'utf8'));
  if (!line) return null;
  const sites = (line[3] ?? '').split('·').map((s) => s.trim().replace(/^\d+x\s*/, '')).filter(Boolean);
  return { lost: Number(line[1]), counted: Number(line[2]), sites };
}
