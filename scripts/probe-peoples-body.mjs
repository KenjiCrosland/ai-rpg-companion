// RULING C at the path call (2026-11-15): does a people-plus-class dispatch to the people's
// printed body? Five rolls each on "kobold sorcerer" and "goblin wizard"; it should be ten.
//
//   node --import ./scripts/alias-loader.mjs scripts/probe-peoples-body.mjs [N]
import { buildPathPrompt, validatePathResponse, readPath, dispatch } from '@/tools/statblock-generator/reskin/path.mjs';
const N = Number(process.argv.find((a) => /^\d+$/.test(a)) ?? 5);
const ask = async (prompt) => {
  const r = await fetch(`${process.env.PROBE_BASE_URL ?? 'http://localhost:5173'}/api/ai/deepseek`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'deepseek-flash', messages: [{ role: 'system', content: 'You are an assistant Game Master.' }, { role: 'user', content: prompt }], thinking: { type: 'disabled' } }) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return String((await r.json())?.choices?.[0]?.message?.content ?? '').replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
};
let ok = 0; let tot = 0;
for (const [c, cr, want] of [['kobold sorcerer', 2, 'Kobold Warrior'], ['goblin wizard', 3, 'Goblin Warrior']]) {
  const got = [];
  for (let i = 0; i < N; i += 1) {
    tot += 1;
    try {
      const raw = await ask(buildPathPrompt({ name: '', concept: c, cr, edition: '2024' }));
      if (!validatePathResponse(raw)) { got.push('INVALID'); continue; }
      const read = readPath(raw, { concept: c, edition: '2024' });
      const d = dispatch({ name: '', concept: c, edition: '2024' }, read);
      got.push(`${d.path}${d.print_body ? `:${d.print_body}` : ''}`);
      if (d.print_body === want) ok += 1;
    } catch (e) { got.push('ERR'); }
  }
  console.log(`  ${c.padEnd(18)} want ${want.padEnd(16)} ${got.filter((g) => g.endsWith(want)).length}/${N}   ${got.join(', ')}`);
}
console.log(`\n  dispatched to the people's body on ${ok} of ${tot}`);
