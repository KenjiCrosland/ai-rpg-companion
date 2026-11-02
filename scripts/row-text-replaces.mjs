#!/usr/bin/env node
// ROADMAP R3's INSTRUMENT (2026-11-01). "The engine edits fields, never
// sentences" needs a number that cannot drift, so this counts `.replace(` calls
// whose RECEIVER is a row's text — not every `.replace(` in the file, most of
// which read names, concepts or JSON fences and are none of this program's
// business.
//
// A receiver counts as row text when it is `<something>.text`, `.text_noRider`,
// or one of the local names the renderers carry a row's sentence in. Printed per
// file and in total; `--list` shows each site so a rise can be attributed.
//
// CAVEAT, so the number is read right: a CHAIN counts once, because only the
// first `.replace(` in `e.text.replace(a).replace(b)` sits next to the receiver.
// So this counts SITES, not edits, and retiring one cut of a chain does not move
// it. The companion number is the count of `[^.]*` patterns (plain grep), which
// is what the roadmap names: those are the reads that cut a sentence at the next
// full stop and have each been a near-miss of our own grammar.
import { readFileSync } from 'node:fs';
import path from 'node:path';

const FILES = [
  'src/tools/statblock-generator/reskin/generate.mjs',
  'src/tools/statblock-generator/reskin/templates.mjs',
  'src/tools/statblock-generator/reskin/shapes.mjs',
  'src/tools/statblock-generator/reskin/scale.mjs',
];
// the local names a row's SENTENCE lives in while it is being written
const LOCALS = ['text', 'riderText', 't0', 'riderTrig', 'merged'];
const ROW_TEXT = new RegExp(
  String.raw`(?:\.text(?:_noRider)?|\b(?:${LOCALS.join('|')}))\s*(?:\?\?\s*''\s*)?\)?\s*\.replace\(`,
  'g',
);

const list = process.argv.includes('--list');
let total = 0;
for (const f of FILES) {
  const abs = path.resolve(process.cwd(), f);
  let src;
  try { src = readFileSync(abs, 'utf8'); } catch { console.log(`${f}: (absent)`); continue; }
  const lines = src.split('\n');
  let n = 0;
  lines.forEach((line, i) => {
    const hits = [...line.matchAll(ROW_TEXT)].length;
    if (!hits) return;
    n += hits;
    if (list) console.log(`  ${f}:${i + 1}  x${hits}  ${line.trim().slice(0, 110)}`);
  });
  console.log(`${f}: ${n}`);
  total += n;
}
console.log(`TOTAL row-text .replace(: ${total}`);
