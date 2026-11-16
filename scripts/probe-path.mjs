// THE PATH FIELD, PROBED ALONE (Five Pipelines brief, step 3). Five prompts per path, N runs
// each, hand-labelled; the call goes through the dev server's /api/ai proxy like
// probe-identity.mjs. Reports misread per field, and names any prompt that flips paths
// between runs — the stochastic failure the ruling accepts only when it is visible.
//   node --import ./scripts/alias-loader.mjs scripts/probe-path.mjs [N] [--only=twist,class_npc]
import { buildPathPrompt, validatePathResponse, readPath, dispatch, pathLine } from '@/tools/statblock-generator/reskin/path.mjs';

const N = Number(process.argv.find((a) => /^\d+$/.test(a)) ?? 5);
const only = (process.argv.find((a) => a.startsWith('--only=')) ?? '').slice(7).split(',').filter(Boolean);
const BASE = process.env.PROBE_BASE_URL ?? 'http://localhost:5173';
const MODEL = process.env.PROBE_MODEL ?? 'deepseek-flash';

// [label, name field, description field, expected path, expected print body (or null), expected class (or null)]
const CASES = [
  // exact — by code, the call never runs
  ['exact', 'Owlbear', '', 'exact', 'Owlbear'], ['exact', 'Druid', '', 'exact', 'Druid'], ['exact', 'Pit Fiend', '', 'exact', 'Pit Fiend'], ['exact', 'Mummy', '', 'exact', 'Mummy'], ['exact', 'Goblin Boss', '', 'exact', 'Goblin Boss'],
  // twist
  ['twist', '', 'a troll that grows back unless the blade was silvered', 'twist', 'Troll'],
  ['twist', '', 'a stone giant exile', 'twist', 'Stone Giant'],
  ['twist', '', 'a Huge frost giant jarl who throws boulders', 'twist', 'Frost Giant'],
  ['twist', 'Dire Wolf', 'with a frost-rimed hide', 'twist', 'Dire Wolf'],
  ['twist', '', 'a skeleton with a greatsword', 'twist', 'Skeleton'],
  ['twist', '', 'a cave troll that speaks only Giant', 'twist', 'Troll'],
  ['twist', '', 'Hydra whose stumps smoke instead of regrowing', 'twist', 'Hydra'],
  ['twist', '', 'a hobgoblin with a halberd', 'twist', 'Hobgoblin Warrior'],
  ['twist', '', 'an ogre with a greataxe', 'twist', 'Ogre'],
  ['twist', 'Purple Worm', 'that swallowed an armoury', 'twist', 'Purple Worm'],
  // class NPC
  ['class_npc', '', 'lizardfolk ninja', 'class_npc', null, 'rogue'],
  ['class_npc', '', 'lizardfolk monk', 'class_npc', undefined, 'monk'], // the forty's one live class misread (critic B, 2026-10-19)
  ['class_npc', '', 'tabaxi cutpurse', 'class_npc', undefined, 'rogue'],
  ['class_npc', '', 'goliath berserker', 'class_npc', undefined, 'barbarian'],
  ['class_npc', '', 'a hobgoblin warlord who fights from a shield wall', 'class_npc', undefined, 'fighter'], // the body may be the Hobgoblin Warrior: a people body beside a class word is the brief's own precedence
  ['class_npc', '', 'a kuo-toa priest who drags swimmers under the ice', 'class_npc', undefined, 'cleric'],
  ['class_npc', '', 'a templar priest with a mace and no magic at all', 'class_npc', undefined, null],
  ['class_npc', 'Dame Oriel', '', 'class_npc', null, null],
  ['class_npc', '', 'fire monk', 'class_npc', null, 'monk'],
  ['class_npc', '', 'samurai retainer', 'class_npc', null, 'fighter'],
  ['class_npc', 'Grik', '', 'class_npc', null, null],
  ['class_npc', '', 'a veteran soldier who bashes with a buckler', 'class_npc', null, 'fighter'],
  ['class_npc', '', 'a skald who sings his warband into a fury', 'class_npc', null, 'bard'],
  // homebrew
  ['homebrew', '', 'a golem of lashed timber that shoulders through walls', 'homebrew', null],
  ['homebrew', '', 'a leviathan of the trench whose song drowns fleets', 'homebrew', null],
  ['homebrew', '', 'a plague-bearing archon of flies', 'homebrew', null],
  ['homebrew', '', 'a tyrant of burning brass', 'homebrew', null],
  ['homebrew', '', 'a berserker who flies into an unstoppable rage', ['homebrew', 'class_npc', 'twist'], undefined], // owner 2026-10-19: the print Berserker or not, either is fine
  ['homebrew', '', 'the thing in the well', 'homebrew', null],
  ['homebrew', '', 'pumpkin king', 'homebrew', null],
  ['homebrew', '', 'a coil-bodied horror that seizes a victim', 'homebrew', null],
  ['homebrew', '', 'a swarm of funeral bells', 'homebrew', null],
  ['homebrew', '', 'a young storm drake', 'homebrew', null],
  // common-noun heads — the shape the twist-ten missed (2026-10-19): a published creature as the subject of a longer clause
  ['head', '', 'a vampire who runs a bathhouse', 'twist', 'Vampire'],
  ['head', '', "a chapel bell-ringer's ghost that tolls for the dying", 'twist', 'Ghost'],
  ['head', '', 'a wolf with two heads', 'twist', 'Wolf'],
  ['head', '', 'Hydra whose stumps smoke instead of regrowing', 'twist', 'Hydra'],
  ['head', '', 'a hobgoblin with a halberd', 'twist', 'Hobgoblin Warrior'],
  ['head', '', 'an owlbear that has learned to climb', 'twist', 'Owlbear'],
  ['head', '', 'a mummy that guards a flooded tomb', 'twist', 'Mummy'],
  ['head', '', 'a goblin who was a wizard\'s apprentice', 'twist', 'Goblin'],
  // a monster beside a job word (owner 2026-10-19: probe and tune) — the body wins, the class rides as flavour
  ['head', '', 'an imp rogue who picks locks for a devil', 'twist', 'Imp'],
  ['head', '', 'a goblin assassin who hunts by night', 'class_npc', undefined, 'rogue'], // a class word beside a PEOPLE body is class NPC on that body (the brief's precedence)
  ['head', '', 'a troll shaman who calls down hail', 'twist', 'Troll'],
  ['head', '', 'an archlich enthroned on a sun of bone', 'twist', 'Lich'], // the forty 2026-10-19: homebrew by the call, the Lich by the matcher
  // traps — the label is the path a GM meant
  ['trap', '', 'an iron-willed inquisitor who never yields ground', 'class_npc', null],
  ['trap', '', 'a knight-errant cut off from his fallen order', 'class_npc', null, 'paladin'],
  ['trap', '', 'a guard who never leaves the gate', 'class_npc', undefined],
  ['trap', '', 'a troll riding a worg', 'twist', 'Troll'],
  ['trap', '', 'a sentinel of black iron', 'homebrew', null],
];

const ask = async (prompt) => {
  const r = await fetch(`${BASE}/api/ai/deepseek`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: prompt }], temperature: 0.2 }), signal: AbortSignal.timeout(150_000) }); // one hung proxy request stalled a whole Promise.all (2026-10-19)
  if (!r.ok) throw new Error(`${r.status}`);
  const j = await r.json(); const text = j?.choices?.[0]?.message?.content ?? '';
  return text.replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
};

const rows = [];
for (const c of CASES) {
  const [label, name, concept, want, wantBody, wantClass = undefined] = c;
  if (only.length && !only.includes(label)) continue;
  const fields = { name, concept, cr: null, role: null, edition: '2024' };
  const byCode = dispatch(fields, null);
  const runs = [];
  if (byCode.path && byCode.by === 'code') runs.push({ d: byCode, refused: [] });
  else {
    const batch = await Promise.all(Array.from({ length: N }, async () => {
      try { const raw = await ask(buildPathPrompt(fields)); const ok = validatePathResponse(raw); const read = ok ? readPath(raw, { concept: `${name} ${concept}`.trim() }) : null; return { d: dispatch(fields, read), refused: read?.refused ?? ['invalid shape'] }; }
      catch (e) { return { d: dispatch(fields, null), refused: [String(e?.message ?? e)] }; }
    }));
    runs.push(...batch);
  }
  const paths = runs.map((r) => r.d.path); const bodies = runs.map((r) => r.d.print_body); const classes = runs.map((r) => r.d.class);
  const wantSet = Array.isArray(want) ? want : [want]; const pathMiss = paths.filter((p) => !wantSet.includes(p)).length; const bodyMiss = wantBody !== undefined ? bodies.filter((b) => (b ?? null) !== (wantBody ?? null)).length : 0;
  const classMiss = wantClass !== undefined && wantClass !== null ? classes.filter((k) => k !== wantClass).length : 0;
  const flips = new Set(paths.filter((p) => p)).size > 1 && !Array.isArray(want);
  rows.push({ label, text: `${name}${name && concept ? ' — ' : ''}${concept}`, want: wantSet.join('|'), wantBody, runs: runs.length, pathMiss, bodyMiss, classMiss, flips, got: runs.map((r) => pathLine(r.d).replace(/^\[path\] /, '').replace(/ — ".*$/, '')), refused: [...new Set(runs.flatMap((r) => r.refused))].slice(0, 3) });
  process.stdout.write(`${pathMiss || bodyMiss ? '✗' : '✓'} ${label.padEnd(9)} ${(name + ' ' + concept).trim().slice(0, 52).padEnd(52)} path ${paths.join('/')}${bodyMiss ? ` body ${bodies.join('/')}` : ''}${flips ? '  FLIPS' : ''}\n`);
}
const total = rows.reduce((a, r) => a + r.runs, 0);
const sum = (k) => rows.reduce((a, r) => a + r[k], 0);
console.log(`\nassembly misread ${sum('pathMiss')}/${total} (${(100 * sum('pathMiss') / total).toFixed(1)}%) · print_body misread ${sum('bodyMiss')}/${total} · class misread ${sum('classMiss')}/${rows.filter((r) => r.classMiss !== undefined).reduce((a, r) => a + (r.runs), 0)} · prompts that flip: ${rows.filter((r) => r.flips).map((r) => `"${r.text}"`).join(', ') || 'none'}`);
for (const r of rows.filter((r) => r.pathMiss || r.bodyMiss || r.flips)) console.log(`  ✗ "${r.text}" wanted ${r.want}${r.wantBody ? ` ${r.wantBody}` : ''}: ${[...new Set(r.got)].join(' | ')}${r.refused.length ? `  refused: ${r.refused.join('; ')}` : ''}`);
