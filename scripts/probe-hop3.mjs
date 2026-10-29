/**
 * HOP 3 OF THE AUGMENTATION PIPELINE: does the call ANSWER the field?
 *
 * Six diagnoses tonight and this hop was never checked once. I debugged the menu
 * wording, the response schema, the header ordering, the slotless case and the
 * fill vet — every layer downstream of an answer I had no evidence existed.
 */
import { buildFitPrompt, TEMPLATES } from '@/tools/statblock-generator/reskin/templates.mjs';

const ask = async (body) => {
  const r = await fetch('http://localhost:5173/api/ai/deepseek', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'deepseek-flash', messages: [{ role: 'user', content: body }], temperature: 0.7 }),
  });
  if (!r.ok) throw new Error(String(r.status));
  return String((await r.json()).choices?.[0]?.message?.content ?? '');
};

const cases = [
  ['spider-climb', 'a cliff-stalker that climbs sheer rock and squeezes into crevices', 'it climbs sheer rock and squeezes into crevices'],
  ['earth-glide', 'a dune-burrower that swims through loose sand and feels every footstep above it', 'it swims through sand and senses footsteps above'],
  ['web-walker', 'a cellar-spider at home in its own webs, which it reads like a map', 'it reads its own webs like a map'],
];
let answered = 0; let total = 0;
for (const [id, concept, idea] of cases) {
  const p = buildFitPrompt({ name: 'X', idea, cr: 7, concept, menu: TEMPLATES.filter((t) => t.id === id) });
  for (let i = 0; i < 2; i += 1) {
    total += 1;
    let out;
    try { out = JSON.parse((await ask(p)).replace(/^```json\s*|```\s*$/g, '').trim()); }
    catch (e) { console.log(`  ${id}: CALL/PARSE FAILED ${String(e.message).slice(0, 50)}`); continue; }
    const a = out.augmentation;
    if (typeof a === 'string' && a.trim() && a.trim() !== 'none') answered += 1;
    console.log(`  ${id.padEnd(14)} template=${String(out.template).padEnd(14)} augmentation=${JSON.stringify(a ?? '(absent)').padEnd(22)} fills=${JSON.stringify(out.fills ?? {})}`);
  }
}
console.log(`\n  answered the augmentation field: ${answered} of ${total}`);
