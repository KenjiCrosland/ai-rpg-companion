/**
 * THE MODEL DOES NOT SPEAK OUR LINGO.
 *
 * Owner, 2026-10-30: "stuff like 'print' for example means nothing to them."
 * He was right. Across the six prompts we send, bare-noun `print` — our word
 * for the published 5e statblocks — appeared 20 times and was never once
 * defined: "one word like print (Scimitar, Claw, Talons)", "Title Case, as
 * print writes every row name", "print is sparing". In every case an example
 * list was quietly carrying the instruction, so the word did no work rather
 * than active harm — but "as print writes every row name" cited it as the only
 * authority. These same prompts already say "printed monsters", "printed
 * exemplars" and "a published creature", so the clear phrasing was house style
 * and bare `print` was the outlier.
 *
 * This guards the prompts only. In CODE `print` is correct and load-bearing
 * (printBlocks, the `print` row flag, printNearAdd) and nothing here touches it.
 *
 * Our other in-house words are left alone deliberately, because each is defined
 * where it is used: `chassis` ("Every chassis is a hand-built template"),
 * `shelf` (the menu header), `twist` ('"twist" = a published creature IS the
 * body'), `nova` and `payoff` (glossary lines), and `expresses`/`slot` (JSON
 * fields whose contract follows immediately). `rider` in the routing prompt is
 * not jargon at all — it means a horseman.
 */
import { buildRepairPrompt } from '@/tools/statblock-generator/reskin/author.mjs';
import { buildPathPrompt } from '@/tools/statblock-generator/reskin/path.mjs';
import { buildReskinPrompt } from '@/tools/statblock-generator/reskin/generate.mjs';
import { buildRoutePrompt } from '@/tools/statblock-generator/reskin/route.mjs';
import { buildIdeaPrompt, buildFitPrompt } from '@/tools/statblock-generator/reskin/templates.mjs';
import { pickDonor, scaleDonor } from '@/tools/statblock-generator/reskin/scale.mjs';
import { SHAPES } from '@/tools/statblock-generator/reskin/shapes.mjs';

// bare noun only: `printed`, `printing` and identifiers are all fine
const BARE_PRINT = /(?<![A-Za-z_])print(?:'s)?(?![A-Za-z_])/g;

const scaled = scaleDonor(pickDonor(8, null, 'brute'), 8, { mechanics: [] });
const sheetLines = Object.entries(scaled.sections)
  .flatMap(([s, rs]) => rs.map((r) => `[${s}] ${r.name}: ${r.text}`)).join('\n');
// the REAL shape objects: a hand-built menu lacked `flavor` and threw
const menu = SHAPES.filter((s) => Array.isArray(s.flavor) && s.frames?.['6-9']).slice(0, 6);

const PROMPTS = {
  route: () => buildRoutePrompt('a bog hound that drags fishermen under', { cr: 1 }),
  path: () => buildPathPrompt({ name: 'Dire Wolf', concept: 'with a frost-rimed hide', cr: 1 }),
  reskin: () => buildReskinPrompt(scaled, { concept: 'a bog hound that drags fishermen under' }),
  idea: () => buildIdeaPrompt({ name: 'Bog Hound', cr: 8, concept: 'drags fishermen under', sheetLines, verbs: ['drags'] }),
  fit: () => buildFitPrompt({ name: 'Bog Hound', idea: { name: 'Drag Under', text: 'it hauls a victim under' }, menu, cr: 8, concept: 'drags fishermen under' }),
  repair: () => buildRepairPrompt({ name: 'Bog Hound', inline: 'the hound', clauses: [{ text: 'drags fishermen under' }], cr: 8, sheet: sheetLines }),
};

const textOf = (p) => String(p?.prompt ?? p ?? '');

describe('no prompt we send uses our in-house word for the corpus', () => {
  it.each(Object.keys(PROMPTS))('%s', (key) => {
    const text = textOf(PROMPTS[key]());
    expect(text.length).toBeGreaterThan(500); // the prompt actually built; an empty string passes any regex
    const found = [...text.matchAll(BARE_PRINT)].map((m) => text.slice(Math.max(0, m.index - 55), m.index + 25).replace(/\s+/g, ' '));
    expect(found).toEqual([]);
  });

  it('still says "published" or "printed" somewhere, so the authority is named and not merely deleted', () => {
    const all = Object.values(PROMPTS).map((f) => textOf(f())).join('\n');
    expect(all).toMatch(/\bpublished\b|\bprinted\b/);
  });
});
