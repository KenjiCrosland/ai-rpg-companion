// THE NAMES ARM, SCORED AGAINST path-key.json (2026-11-14).
//
// Two prompts, same code: WITHOUT the offered names (today's prompt) and WITH them. Scoring
// follows the key's own `how_to_score` — what `dispatch()` returns, because that is what the
// generator consumes. The relation is not scored separately; on a homebrew path the body is
// not scored.
//
// Production's request shape: a system turn, and hidden reasoning disabled for a deepseek
// model (ai-client.mjs:217, ai-adapters.mjs:31). Receipts are validated against NAME +
// DESCRIPTION, as StatblockGenerator.vue does — 22 of the 44 key prompts carry a Name, and
// passing the Description alone refuses a receipt quoted from the Name.
//
//   node --import ./scripts/alias-loader.mjs scripts/probe-path-key.mjs [--only <id>]
import fs from 'node:fs';
import { buildPathPrompt, validatePathResponse, readPath, dispatch, namesInTheWords } from '@/tools/statblock-generator/reskin/path.mjs';

const BASE = process.env.PROBE_BASE_URL ?? 'http://localhost:5173';
const MODEL = process.env.PROBE_MODEL ?? 'deepseek-flash';
const LIMIT = Number(process.env.PROBE_CONCURRENCY ?? 6);
const KEY = JSON.parse(fs.readFileSync('scripts/smoke-batches/path-key.json', 'utf8'));
const ONLY = (() => { const i = process.argv.indexOf('--only'); return i > 0 ? process.argv[i + 1] : null; })();

// THE KEY'S GROUPS drive the roll count and which bar a prompt answers to (key v3, 2026-11-14).
const ROLLS = { monster: 10, control: 10, watched: 10, other: 5 };

const ask = async (prompt) => {
  const r = await fetch(`${BASE}/api/ai/deepseek`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'system', content: 'You are an assistant Game Master.' }, { role: 'user', content: prompt }], ...(MODEL.startsWith('deepseek') ? { thinking: { type: 'disabled' } } : {}) }) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  return String(j?.choices?.[0]?.message?.content ?? '').replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
};
const live = new Set();
const gated = async (fn) => { while (live.size >= LIMIT) await Promise.race(live); const p = (async () => fn())().finally(() => live.delete(p)); live.add(p); return p; };

// STRIPPING THE ARM. The two prompt additions are both gated on a name being found, so
// removing those two spans gives exactly today's prompt.
const stripArm = (prompt, k) => {
  const off = namesInTheWords(k.concept, { edition: k.edition ?? '2024' });
  if (!off.length) return prompt;
  let out = prompt.replace(/\n\nPublished monsters whose names appear in the Description:[^\n]*\n/, '\n');
  out = out.replace(/ {2}"offered_verdicts": \[[\s\S]*?\],\n {2}/, '  ');
  if (/offered_verdicts|Published monsters whose/.test(out)) throw new Error(`stripArm failed on ${k.id} — the probe is out of date with buildPathPrompt`);
  return out;
};

/** the key's rule, applied to what dispatch returns */
const scoreRoll = (k, d) => {
  const body = d.print_body ?? null;
  // a control's notBodies is a veto on ANY path: the forbidden block must not become the body
  if (k.notBodies && body && k.notBodies.includes(body) && d.path !== 'homebrew') return false;
  if (!k.okPaths.includes(d.path)) return false;
  if (d.path === 'homebrew') return true; // the body is not scored there
  if (k.needBody) return !!body && (k.okBodies ?? []).includes(body);
  if (k.okBodies) return body === null || k.okBodies.includes(body);
  return body === null;
};

const oneRoll = async (k, { arm }) => {
  const ed = k.edition ?? '2024';
  let prompt = buildPathPrompt({ name: k.name ?? '', concept: k.concept, cr: k.cr, role: k.role ?? null, edition: ed });
  if (!arm) prompt = stripArm(prompt, k);
  try {
    const raw = await ask(prompt);
    if (!validatePathResponse(raw)) return { path: 'INVALID', raw: raw.slice(0, 70) };
    const p = JSON.parse(raw);
    const read = readPath(raw, { concept: `${k.name ?? ''} ${k.concept}`.trim(), edition: ed });
    const d = dispatch({ name: k.name ?? '', concept: k.concept, role: k.role ?? null, edition: ed }, read);
    const offeredNames = namesInTheWords(k.concept, { edition: ed }).map((o) => o.name);
    return {
      path: d.path, body: d.print_body ?? null, ok: scoreRoll(k, d),
      rawBody: p.print_body ?? null, rawRel: p.relation ?? null, cls: p.class ?? null, sp: p.species ?? null,
      emptyRel: !!p.print_body && !['is', 'resembles'].includes(String(p.relation ?? '').toLowerCase()),
      bodyWasOffered: !!p.print_body && offeredNames.some((n) => n.toLowerCase() === String(p.print_body).toLowerCase()),
      // the call answers `word`; printing `name` showed every verdict as "undefined=..." in the
      // 2026-11-14 run. readPath reads `word ?? name`, so only the DISPLAY was wrong.
      verdicts: Array.isArray(p.offered_verdicts) ? p.offered_verdicts.map((v) => `${v?.word ?? v?.name}=${v?.verdict}`).join(',') : null,
    };
  } catch (e) { return { path: 'ERR', raw: String(e.message).slice(0, 60) }; }
};

const runArm = async (arm) => {
  const prompts = KEY.prompts.filter((k) => !ONLY || k.id === ONLY);
  const out = [];
  await Promise.all(prompts.map(async (k) => {
    const n = ROLLS[k.group ?? 'other'] ?? 5;
    const rolls = await Promise.all(Array.from({ length: n }, () => gated(() => oneRoll(k, { arm }))));
    out.push({ k, rolls, n });
  }));
  return out.sort((a, b) => KEY.prompts.indexOf(a.k) - KEY.prompts.indexOf(b.k));
};

const report = (label, res) => {
  const g = (name) => res.filter((r) => (r.k.group ?? 'other') === name);
  const rollsOf = (rows) => rows.flatMap((r) => r.rolls);
  const rightOf = (rows) => rollsOf(rows).filter((x) => x.ok).length;
  const monster = g('monster'); const control = g('control'); const other = g('other'); const watched = g('watched');
  const multi = res.filter((r) => new Set(r.rolls.map((x) => x.path)).size > 1);
  console.log(`\n########## ${label} ##########`);
  console.log(`  MONSTER  ${rightOf(monster)}/${rollsOf(monster).length} right   (${monster.length} prompts, worst ${Math.min(...monster.map((r) => r.rolls.filter((x) => x.ok).length))}/10)`);
  console.log(`  CONTROL  ${rollsOf(control).length - rightOf(control)}/${rollsOf(control).length} WRONG   (${control.length} prompts)`);
  console.log(`  OTHER    ${rightOf(other)}/${rollsOf(other).length} right   (${other.length} prompts)`);
  console.log(`  WATCHED  ${watched.map((r) => `${r.k.id} ${r.rolls.filter((x) => x.ok).length}/${r.rolls.length} (reported, not scored)`).join('; ')}`);
  console.log(`  more than one path: ${multi.length} of ${res.length}`);
  const emptyRel = rollsOf(res).filter((x) => x.emptyRel);
  console.log(`  body named with NO relation: ${emptyRel.length} of ${rollsOf(res).length}`);
  for (const grp of [['MONSTER', monster], ['CONTROL', control]]) {
    const lost = grp[1].filter((r) => r.rolls.some((x) => !x.ok));
    if (!lost.length) continue;
    console.log(`\n  --- every ${grp[0]} prompt that lost a roll ---`);
    for (const r of lost) {
      const bad = r.rolls.filter((x) => !x.ok);
      console.log(`  ${r.k.id.padEnd(26)} lost ${bad.length}/${r.rolls.length}  "${String(r.k.concept).slice(0, 38)}"  want ${r.k.okPaths.join('|')}${r.k.okBodies ? ` on ${r.k.okBodies.join('|')}` : ''}${r.k.notBodies ? ` NOT ${r.k.notBodies.join('|')}` : ''}`);
      for (const x of bad.slice(0, 4)) console.log(`       got ${x.path}${x.body ? `:${x.body}` : ''} | raw body=${x.rawBody} rel=${x.rawRel} class=${x.cls} species=${x.sp} verdicts=[${x.verdicts ?? '-'}]`);
    }
  }
  return { monsterRight: rightOf(monster), monsterRolls: rollsOf(monster).length, monsterWorst: Math.min(...monster.map((r) => r.rolls.filter((x) => x.ok).length)), controlWrong: rollsOf(control).length - rightOf(control), otherRight: rightOf(other), multi: multi.length };
};

console.log(`prompts: ${KEY.prompts.filter((k) => !ONLY || k.id === ONLY).length}; rolls by group ${JSON.stringify(ROLLS)}`);
const without = report("WITHOUT the arm (today's prompt)", await runArm(false));
const withArm = report('WITH the narrowed names arm', await runArm(true));

console.log(`\n########## THE BARS ##########`);
const b1 = withArm.monsterRight >= 144 && withArm.monsterWorst >= 7;
console.log(`  1 MONSTERS  >=144/160 right and no prompt below 7/10 : ${withArm.monsterRight}/160, worst ${withArm.monsterWorst}/10  ->  ${b1 ? 'PASS' : 'FAIL'}`);
const b2 = withArm.controlWrong <= 2;
console.log(`  2 CONTROLS  at most 2 of 80 wrong                   : ${withArm.controlWrong}/80 wrong  ->  ${b2 ? 'PASS' : 'FAIL'}`);
const b3 = withArm.otherRight >= without.otherRight - 6;
console.log(`  3 OTHERS    no more than 6 below the current prompt  : ${withArm.otherRight} vs ${without.otherRight} (of 130)  ->  ${b3 ? 'PASS' : 'FAIL'}`);
console.log(`\n  monster group WITHOUT the arm: ${without.monsterRight}/${without.monsterRolls}`);
console.log(`  more-than-one-path: ${withArm.multi} with, ${without.multi} without`);
console.log(`\n  ${b1 && b2 && b3 ? 'ALL THREE BARS PASS — the arm ships' : 'A BAR IS MISSED — the arm does not ship'}`);
