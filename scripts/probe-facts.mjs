#!/usr/bin/env node
/** Part B's probe: the facts call on every replayable input of both forties, three rolls each. */
import fs from 'node:fs';
import { buildFactsPrompt, validateFacts } from '../src/tools/statblock-generator/reskin/facts.mjs';

// EIGHT MORE, HELD OUT (Fable §12). They ask for the same kinds of fact in words the prompt has
// not seen, and none of them appears in the prompt either.
const HELD_OUT = [
  ['held1', '', 'a sprite archer'],
  ['held2', '', 'a halfling necromancer'],
  ['held3', '', 'a hobgoblin sergeant in chain mail'],
  ['held4', '', 'a rat as big as a wagon'],
  ['held5', '', 'a scarecrow, vulnerable to fire, 60 HP'],
  ['held6', '', 'a hill giant chief with 4 attacks'],
  ['held7', '', 'a lich-queen crowned in black fire'],
  ['held8', '', 'a bear that heals 5 hit points whenever it bites'],
];
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
inputs.push(...EXTRA, ...HELD_OUT);

const ask = async (prompt) => {
  // a per-request deadline: one hung request must not stall 252 readings
  const res = await fetch('http://localhost:5173/api/ai/deepseek', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    // THE SETTINGS THE GENERATOR'S OWN READER CALLS USE (Fable §12, item 5), read off
    // ai-client.mjs and ai-adapters.mjs: model deepseek-flash, the same system message, hidden
    // reasoning disabled, and NO temperature — the provider's default. The first run set
    // temperature 1 by hand and left the system message and `thinking` out, so it measured a
    // different call from the one that would ship (and ran reasoning, which is why it crawled).
    body: JSON.stringify({
      model: 'deepseek-flash',
      messages: [{ role: 'system', content: 'You are an assistant Game Master.' }, { role: 'user', content: prompt }],
      thinking: { type: 'disabled' },
    }),
    signal: AbortSignal.timeout(90000),
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
    done += 1;
    fs.writeFileSync('/tmp/probe-facts.progress', `${done}/${inputs.length * 3} ${label} roll ${roll}${err ? ` ERR ${err}` : ''}\n`);
    fs.writeFileSync('/tmp/probe-facts.partial.json', JSON.stringify(out));
  }
}
fs.writeFileSync('/tmp/probe-facts.json', JSON.stringify(out, null, 1));
process.stderr.write(`\nwrote ${out.length} readings over ${inputs.length} inputs\n`);
