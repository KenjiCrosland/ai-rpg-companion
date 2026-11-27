#!/usr/bin/env node
/**
 * REFRESH A RECORDING'S STORED SHEETS, AND NOTHING ELSE (Fable, round two, 2026-11-27).
 *
 * A round that adds a field to the stored sheet leaves every recording stale, and both strict
 * replays then end red on sheets whose rows are identical — noise a real regression could hide in.
 *
 * This copies ONLY the `sheet` field from a freshly recorded folder into the recording it came
 * from, so every `calls` array is untouched by construction. That matters: the whole-batch recorder
 * drops the first call on most sheets, and installing its files whole has damaged a recording
 * twice — the second time the canary, before anyone noticed. Fixing the recorder is a separate job.
 *
 *   node scripts/refresh-recording.mjs <fresh-folder> <recording-folder> [--allow field,field]
 *
 * It refuses unless every sheet's diff is confined to the fields named by --allow (default: the
 * three round one added), and prints the count by leaf path with array indices collapsed.
 */
import fs from 'node:fs';
import path from 'node:path';

const [fresh, target, ...rest] = process.argv.slice(2);
if (!fresh || !target) { console.error('usage: refresh-recording.mjs <fresh-folder> <recording-folder> [--allow a,b]'); process.exit(2); }
const allowIx = rest.indexOf('--allow');
const ALLOW = new Set((allowIx >= 0 ? rest[allowIx + 1] : 'ledger,clauseBy,claimedClause').split(',').map((s) => s.trim()).filter(Boolean));

const leaves = (a, b, p = '') => {
  if (a && b && typeof a === 'object' && typeof b === 'object' && !Array.isArray(a) && !Array.isArray(b)) {
    return [...new Set([...Object.keys(a), ...Object.keys(b)])].flatMap((k) => leaves(a[k], b[k], `${p}/${k}`));
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    return Array.from({ length: Math.max(a.length, b.length) }, (_, i) => leaves(a[i], b[i], `${p}[]`)).flat();
  }
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null) ? [] : [p];
};

const files = fs.readdirSync(fresh).filter((f) => /^\d+-.*\.json$/.test(f)).sort();
if (!files.length) { console.error(`no recordings in ${fresh}`); process.exit(2); }
const tally = new Map(); const bad = []; const plan = [];
for (const f of files) {
  const to = path.join(target, f);
  if (!fs.existsSync(to)) { bad.push(`${f}: no such sheet in ${target}`); continue; }
  const old = JSON.parse(fs.readFileSync(to, 'utf8'));
  const now = JSON.parse(fs.readFileSync(path.join(fresh, f), 'utf8'));
  for (const leaf of leaves(old.sheet, now.sheet)) {
    const segs = leaf.split('/').filter(Boolean).map((x) => x.replace(/\[\]$/, ''));
    // AN ALLOWED FIELD COVERS WHAT IS INSIDE IT. The walk reaches leaves, so a change anywhere
    // under `generation.ledger` arrives as `/generation/ledger[]/status` — the ledger's own shape,
    // not a fourth field on the sheet. The check is on the PATH: allowed if any segment is named.
    const named = segs.find((x) => ALLOW.has(x));
    const field = named ?? segs.at(-1);
    tally.set(field, (tally.get(field) ?? 0) + 1);
    if (!named) bad.push(`${f}: ${leaf} is not an allowed field`);
  }
  plan.push([to, { ...old, sheet: now.sheet }]);
}
console.log(`fields changed (leaf paths, indices collapsed): ${[...tally].map(([k, v]) => `${k} ${v}`).join(', ') || 'none'}`);
if (bad.length) { console.error(`REFUSED — ${bad.length} problem(s):`); for (const b of bad.slice(0, 10)) console.error(`  ${b}`); process.exit(1); }
for (const [to, obj] of plan) fs.writeFileSync(to, `${JSON.stringify(obj, null, 1)}\n`);
console.log(`refreshed ${plan.length} stored sheet(s) in ${target}; every calls array untouched`);
