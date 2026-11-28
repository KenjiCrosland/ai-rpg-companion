#!/usr/bin/env node
/** Part B's probe: the facts call on every replayable input of both forties, three rolls each. */
import fs from 'node:fs';
import { buildFactsPrompt, validateFacts } from '../src/tools/statblock-generator/reskin/facts.mjs';

const EXTRA = [
  ['extra1', '', 'a troll that regains 10 HP at the start of its turn'],
  ['extra2', '', 'a golem that explodes when it drops to 0 HP'],
  ['extra3', '', 'a wolf that makes 2 attacks when bloodied'],
  ['extra4', '', 'a knight whose allies within 10 feet are immune to fear'],
  ['extra5', '', 'a spider that pulls its prey 10 ft'],
  ['extra6', '', 'an ogre with a large shield'],
];
const SKIP = { gm40: [40], sweep: [22, 36] };   // cr auto / a blank form: not replayable
const inputs = [];
for (const [batch, file] of [['gm40', 'gm40.json'], ['canary', 'sweep.json']]) {
  const rows = JSON.parse(fs.readFileSync(`scripts/smoke-batches/${file}`, 'utf8'));
  rows.forEach((r, i) => {
    const n = i + 1;
    if ((SKIP[batch === 'canary' ? 'sweep' : 'gm40'] ?? []).includes(n)) return;
    inputs.push([`${batch} s${String(n).padStart(2, '0')}`, r.name ?? '', r.description ?? '']);
  });
}
inputs.push(...EXTRA);

const ask = async (prompt) => {
  const res = await fetch('http://localhost:5173/api/ai/deepseek', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'deepseek-flash', messages: [{ role: 'user', content: prompt }], temperature: 1 }),
  });
  const j = await res.json();
  const text = j?.choices?.[0]?.message?.content ?? '';
  const m = /\{[\s\S]*\}/.exec(text);
  try { return JSON.parse(m ? m[0] : text); } catch { return { facts: [], _unparsed: text.slice(0, 120) }; }
};

const out = [];
let done = 0;
for (const [label, name, description] of inputs) {
  const prompt = buildFactsPrompt({ name, description });
  for (let roll = 1; roll <= 3; roll += 1) {
    let kept = []; let dropped = []; let err = null;
    try { ({ kept, dropped } = validateFacts(await ask(prompt), { name, description })); }
    catch (e) { err = String(e?.message ?? e).slice(0, 80); }
    out.push({ label, roll, name, description, kept, dropped, err });
    process.stderr.write(`\r${++done}/${inputs.length * 3}`);
  }
}
fs.writeFileSync('/tmp/probe-facts.json', JSON.stringify(out, null, 1));
process.stderr.write(`\nwrote ${out.length} readings over ${inputs.length} inputs\n`);
