// THE MECHANICS CHECKER (owner's brief, 2026-10-02): seven gates, each a
// function from a finished block to ok / soft / fail plus the offending value.
// Predicates the lint already owns are mapped in by rule id (one fix, one
// place); the arithmetic the lint does not do — derivation from the array,
// bands against print, header-body, donor fidelity — lives here. It runs on
// every batch before a review doc is built, and a block with a fail gets no
// concept read. Amendments over the brief (owner go, 2026-10-02): bands are
// print's own spread by the DMG method (the table fails print itself — the
// Adult Red Dragon measures 87 against a table asking 105); the engulfer gate
// is "no larger than itself" (the Gelatinous Cube); KO at will is soft when
// single-target with a repeat save (the Ghoul); leveled spells at will are a
// fail only for hard control below CR 13; reach follows size before a tether.
import { fromLegacyModel } from '../format-2024/generate.mjs';
import { lintStatblock } from '../format-2024/lint.mjs';
import { HIT_DIE_BY_SIZE } from '../format-2024/dice.mjs';
import { cardBudget, dmgRow } from './card-budgets.mjs';
import { NOVA_CAP } from './templates.mjs';
import { CONTROL_SPELL_LEVEL, CONTROL_AT_WILL_CR, SPELL_DAMAGE_AVG, printCanonFor, nearPrintCr } from './generate.mjs';
import { DONORS } from './donors.mjs';
import { piGuard, readPhrases } from './lexicon.mjs';

import CORPUS from '@/data/srd52-monsters.json';
import TABLE from '@/data/challengeRatings.json';
import { PRINT_2014 } from './print-2014.mjs';
export const GATES = ['derivation', 'bands', 'structure', 'gates', 'headerBody', 'edition', 'donor'];
const crNum = (k) => (String(k).includes('/') ? Number(String(k).split('/')[0]) / Number(String(k).split('/')[1]) : Number(k));
const CRS = Object.keys(TABLE).filter((k) => /^\d+$|^1\/[248]$|^0$/.test(k)).sort((a, b) => crNum(a) - crNum(b));
const modOf = (v) => Math.floor((Number(v) - 10) / 2);
const pbFor = (cr) => (dmgRow(cr)?.proficiency_bonus ?? (2 + Math.floor(Math.max(0, cr - 1) / 4)));
const WORDS = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
const avgOf = (s) => Number(/(\d+) \(\d+d\d+/.exec(s)?.[1] ?? 0);
const allRows = (m) => Object.entries(m.sections ?? {}).flatMap(([sec, es]) => (es ?? []).filter((e) => !/^Legendary Action Uses/.test(e?.name ?? '')).map((e) => ({ sec, e }))); // the 2024 preamble is not a row
const esc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const bare = (n) => String(n ?? '').replace(/ \(.*\)$/, '');

// ---------------------------------------------------------------- arithmetic
export function attackRowsOf(m) {
  return allRows(m).filter(({ e }) => /Attack Roll|(?:Weapon|Spell) Attack:/.test(e.text ?? '')).map(({ sec, e }) => { // 2024 "Attack Roll:" or 2014 "Melee Weapon Attack:" (the SRD 5.1 corpus reads by the same arithmetic)
    const atk = Number(/Attack(?: Roll)?:\*?\s*\+(\d+)/.exec(e.text)?.[1] ?? NaN); // 2024 "Attack Roll: +7" or 2014 "Weapon Attack: +7 to hit"
    const main = String(e.text).replace(/,?\s*plus \d+ \(\d+d\d+(?: [+-] \d+)?\) \w+ damage if [^.]*\.?/g, '').split(/\bIf\b|\bWhen\b|, or \d+ \(/)[0]; // a rider that needs a condition ("if the attack roll had Advantage") is not always-on (critic's audit 2026-10-02)
    const parts = main.match(/\d+ \(\d+d\d+(?: [+-] \d+)?\)/g) ?? [];
    const first = /(\d+) \((\d+)d(\d+)(?: ([+-]) (\d+))?\)/.exec(main);
    return { sec, e, name: bare(e.name), atk, avg: parts.reduce((a, p) => a + avgOf(p), 0), ranged: /Ranged Attack Roll/.test(e.text) && !/Melee or Ranged/.test(e.text), bonus: first ? (first[4] === '-' ? -1 : 1) * Number(first[5] ?? 0) : null, dice: first ? `${first[2]}d${first[3]}` : null };
  });
}
export function novasOf(m) {
  const all = allRows(m);
  return all.map(({ sec, e }, i) => {
    if (!/\((?:Recharge [\d–-]+|\d\/Day)\)/.test(e.name ?? '')) return null;
    // the 2014 two-row breath: "Breath Weapons (Recharge 5–6). The dragon uses one of the following" and the damage sits in the rows beneath
    const subs = /one of the following/i.test(e.text ?? '') && !/\d+ \(\d+d\d+/.test(e.text ?? '') ? all.slice(i + 1, i + 4).map((x) => x.e).filter((x) => /saving throw/i.test(x.text ?? '') && /\d+ \(\d+d\d+/.test(x.text ?? '')) : [];
    const src = subs.length ? subs.sort((a, b) => avgOf(b.text) - avgOf(a.text))[0] : e;
    if (!/Saving Throw/i.test(src.text ?? '') || !/\d+ \(\d+d\d+/.test(src.text ?? '')) return null;
    return { sec, e, name: bare(e.name), gate: /\((Recharge [\d–-]+|\d\/Day)\)/.exec(e.name)[1], avg: avgOf(src.text), area: /each creature|Cone|Sphere|radius|Line|Emanation|Cube/i.test(src.text) };
  }).filter(Boolean);
}
export function sustainedOf(m) {
  const rows = attackRowsOf(m);
  const multi = (m.sections?.Actions ?? []).find((e) => /^Multiattack/.test(e.name ?? ''));
  let attacks = 1; let used = rows.slice().sort((a, b) => b.avg - a.avg)[0] ?? null;
  if (multi) {
    const n = /makes (\w+)/i.exec(multi.text)?.[1]; attacks = WORDS[n?.toLowerCase()] ?? Number(n) ?? 1;
    const named = rows.filter((r) => new RegExp(`\\b${esc(r.name)}s?\\b`, 'i').test(multi.text)); // 2014 writes "one with its bite and two with its claws"
    if (named.length) used = named.slice().sort((a, b) => b.avg - a.avg)[0];
  }
  // an AT-WILL ray table fires three rays a round at random: three times the table's mean damage (print's Beholder; the orb at 13, rerun 2026-10-03)
  const rayRow = allRows(m).find(({ e }) => /fires three rays/.test(e.text ?? '') && !/\((?:Recharge [\d–-]+|\d\/Day)\)/.test(e.name ?? ''));
  const rayEntries = rayRow ? String(rayRow.e.text).split(/\s\d — /).slice(1) : [];
  const rays = rayEntries.length ? 3 * rayEntries.reduce((a, t) => a + (t.match(/\d+ \(\d+d\d+(?: \+ \d+)?\)/g) ?? []).reduce((b, p) => b + avgOf(p), 0), 0) / rayEntries.length : 0;
  const sustained = (used?.avg ?? 0) * attacks + rays;
  const legUses = Number(m.legendary_uses ?? 3);
  const legendary = (m.sections?.['Legendary Actions'] ?? []).filter((e) => !/^Legendary Action Uses/.test(e.name ?? '')).map((e) => {
    const ref = /makes (one|two|\d+) ([A-Z][\w' -]+?) attacks?/.exec(e.text ?? '');
    const cost = Number(/\(Costs (\d+) Actions?\)/i.exec(e.name ?? '')?.[1] ?? 1);
    const once = /can['’]t (?:take|use) this action again|once per round|only once/i.test(e.text ?? '');
    let per = 0;
    if (ref) { const r = rows.find((a) => a.name === ref[2]); per = r ? r.avg * (WORDS[ref[1]] ?? Number(ref[1]) ?? 1) : 0; }
    else per = (String(e.text ?? '').split(/\bIf\b/)[0].match(/\d+ \(\d+d\d+(?: \+ \d+)?\)/g) ?? []).reduce((a, p) => a + avgOf(p), 0);
    // the DMG counts every use: a cost-1 damaging option with no repeat clause fires Uses times between turns (the critic's audit 2026-10-02 — one Searing Ray was counted where three fire)
    const times = once ? 1 : Math.max(1, Math.floor(legUses / cost));
    return { name: bare(e.name), avg: per * times, per, times };
  }).sort((a, b) => b.avg - a.avg)[0] ?? null;
  const nova = novasOf(m).sort((a, b) => b.avg - a.avg)[0] ?? null;
  const uses = nova ? ({ 'Recharge 4-6': 2, 'Recharge 5-6': 1, '1/Day': 1, '2/Day': 2, '3/Day': 3 }[nova.gate] ?? 1) : 0;
  const withLegendary = sustained + (legendary?.avg ?? 0);
  const dmg = (withLegendary * 3 + uses * Math.max(0, (nova ? nova.avg * (nova.area ? 2 : 1) : 0) - withLegendary)) / 3;
  return { attacks, used, sustained: withLegendary, legendary, nova, dmg };
}
function crByBand(value, min, max) {
  let found = CRS[0];
  for (const k of CRS) { const r = TABLE[k]; if (Number(value) >= Number(r[min])) found = k; if (Number(value) >= Number(r[min]) && Number(value) <= Number(r[max])) return k; }
  return found;
}
const stepCR = (k, delta) => { const i = CRS.indexOf(k); return CRS[Math.max(0, Math.min(CRS.length - 1, i + delta))]; };
export function effectiveHp(m, cr) {
  const def = `${m.resistances ?? ''}`; const imm = `${m.immunities ?? ''}`;
  const bps = (x) => /Bludgeoning/i.test(x) && /Piercing/i.test(x) && /Slashing/i.test(x);
  const types = (x) => (x.match(/\b(Bludgeoning|Piercing|Slashing|Fire|Cold|Lightning|Thunder|Acid|Poison|Necrotic|Radiant|Psychic|Force)\b/g) ?? []).length;
  const wide = (x) => bps(x) || types(x) >= 3;
  let mult = 1;
  if (wide(imm)) mult = cr <= 4 ? 2 : cr <= 10 ? 2 : cr <= 16 ? 1.5 : 1.25;
  else if (wide(def)) mult = cr <= 4 ? 2 : cr <= 10 ? 1.5 : cr <= 16 ? 1.25 : 1;
  return Math.round(Number(m.hp) * mult);
}
export function dmgRead(m) {
  const s = sustainedOf(m);
  const atkBest = Math.max(0, ...attackRowsOf(m).map((r) => r.atk).filter(Number.isFinite));
  const dcBest = Math.max(0, ...[...JSON.stringify(m.sections ?? {}).matchAll(/DC (\d+)/g)].map((x) => Number(x[1])));
  const effHp = effectiveHp(m, Number(m.cr ?? crNum(m.cr_str ?? '0')));
  const defBase = crByBand(effHp, 'min_hit_points', 'max_hit_points');
  const def = stepCR(defBase, Math.trunc((Number(m.ac) - TABLE[defBase].armor_class) / 2));
  const offBase = crByBand(Math.round(s.dmg), 'min_damage_per_round', 'max_damage_per_round');
  const offRow = TABLE[offBase];
  const offAdj = Math.trunc(((atkBest ? atkBest - Number(String(offRow.attack_bonus).replace('+', '')) : dcBest ? dcBest - offRow.save_dc : 0)) / 2);
  const off = stepCR(offBase, offAdj);
  return { ...s, atkBest, dcBest, def, off, effHp, read: (crNum(def) + crNum(off)) / 2 };
}
const corpusCache = new Map();
export function corpusAt(cr, edition = null) {
  const key = `${edition === '2014' ? '2014' : '2024'}:${cr}`;
  if (corpusCache.has(key)) return corpusCache.get(key);
  const list = edition === '2014' ? PRINT_2014 : (Array.isArray(CORPUS) ? CORPUS : []); // a 2014 sheet measures against the SRD 5.1 (critic's release audit 2026-10-03)
  // print's neighbours one CR either side are always in the band: a CR 7 caster has no print peer at 7, but the Mage at 6 (81 HP) shows what print's casters weigh (goldens gate table 2026-10-02)
  let pool = list.filter((x) => Math.abs(Number(x.cr) - cr) <= 1);
  if (edition === '2014') { const exact = list.filter((x) => Number(x.cr) === cr); if (exact.length >= 5) pool = exact; } // the SRD 5.1 is dense: five or more at the CR is the band (pooling CR 0 critters into CR 1 put the floor at 1 HP)
  for (const w of [2, 3]) if (pool.length < 3) pool = list.filter((x) => Math.abs(Number(x.cr) - cr) <= w);
  const rows = pool.map((x) => { const r = dmgRead(x); return { name: x.name, hp: r.effHp, ac: Number(x.ac), dpr: r.dmg, read: r.read }; });
  const span = (k) => { const v = rows.map((r) => r[k]).filter((v2) => Number.isFinite(v2) && v2 > 0).sort((a, b) => a - b); return v.length ? [v[0], v[v.length - 1]] : null; };
  const out = { n: rows.length, hp: span('hp'), ac: span('ac'), dpr: span('dpr'), read: span('read') };
  corpusCache.set(key, out); return out;
}

// ---------------------------------------------------------------- gates
const SKILL_STAT = { Athletics: 'STR', Acrobatics: 'DEX', 'Sleight of Hand': 'DEX', Stealth: 'DEX', Arcana: 'INT', History: 'INT', Investigation: 'INT', Nature: 'INT', Religion: 'INT', 'Animal Handling': 'WIS', Insight: 'WIS', Medicine: 'WIS', Perception: 'WIS', Survival: 'WIS', Deception: 'CHA', Intimidation: 'CHA', Performance: 'CHA', Persuasion: 'CHA' };
function gateDerivation(m, ctx, F) {
  const pb = Number(m.pb ?? pbFor(ctx.cr)); const mods = Object.fromEntries(Object.entries(m.stats ?? {}).map(([k, v]) => [k, modOf(v)]));
  const modsOf = (keys) => keys.map((k) => mods[k]).filter(Number.isFinite);
  const castStat = (() => { const sp = allRows(m).map(({ e }) => /using (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) as the spellcasting ability/.exec(e.text ?? '')?.[1]).find(Boolean); return sp ? { Strength: 'STR', Dexterity: 'DEX', Constitution: 'CON', Intelligence: 'INT', Wisdom: 'WIS', Charisma: 'CHA' }[sp] : null; })();
  const label2014 = ctx.labels2014 ?? {};
  for (const r of attackRowsOf(m)) {
    if (r.e.print || r.e.overlay_bite) continue; // print's row carries print's numbers; the orb's bite adds PB off a STR 10 (print's Beholder)
    if (!Number.isFinite(r.atk)) continue;
    // a WEAPON row rolls Strength or Dexterity; a SPELL row rolls the casting stat — the 2014 label says which, a 2024 row may be either (the critic's audit 2026-10-02: a scepter rolling Int under "Melee Weapon Attack")
    const label = label2014[r.name]; const allowed = label === 'weapon' ? ['STR', 'DEX'] : label === 'spell' ? [castStat].filter(Boolean) : ['STR', 'DEX', ...(castStat ? [castStat] : [])];
    const any = Object.keys(mods).find((k) => mods[k] + pb === r.atk); const stat = allowed.find((k) => mods[k] + pb === r.atk) ?? any;
    if (!any) F('attack-bonus', 'fail', `${r.name}: +${r.atk} is not ${label ? `a ${label} row's` : 'STR/DEX or the casting stat\'s'} mod + PB ${pb} (mods ${Object.entries(mods).map(([k, v]) => `${k} ${v}`).join(', ')})`, `+${r.atk}`);
    else if (!allowed.includes(stat)) F('attack-stat', 'fail', `${r.name}: +${r.atk} derives from ${stat}, but ${label ? `a ${label} row` : 'an attack row'} rolls ${allowed.join('/')}`, stat);
    else if (r.bonus !== null && r.bonus !== mods[stat] && !(r.ranged && r.bonus === mods.DEX)) F('damage-mod', 'fail', `${r.name}: damage bonus ${r.bonus >= 0 ? '+' : ''}${r.bonus} is not ${stat}'s ${mods[stat]}`, r.bonus);
  }
  for (const { sec, e } of allRows(m)) {
    for (const dm of String(e.text ?? '').matchAll(/(?<!escape )DC (\d+)/g)) {
      const dc = Number(dm[1]); const diff = Math.min(...modsOf(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']).map((x) => Math.abs(8 + pb + x - dc)));
      if (diff === 1) F('dc-float', 'ok', `${sec}/${bare(e.name)}: DC ${dc} sits one off the derived DC (the chassis ±1 float)`, dc);
      else if (diff > 1) F('dc', 'fail', `${sec}/${bare(e.name)}: DC ${dc} is no stat's 8 + PB ${pb} + mod`, dc);
    }
    for (const em of String(e.text ?? '').matchAll(/escape DC (\d+)/g)) {
      const want = 8 + pb + (mods.STR ?? 0); if (Number(em[1]) !== want) F('escape-dc', 'fail', `${sec}/${bare(e.name)}: escape DC ${em[1]}, derived ${want}`, Number(em[1]));
    }
  }
  for (const [k, v] of Object.entries(m.saves ?? {})) { const n = Number(String(v).replace('+', '')); if (n !== mods[k] && n !== mods[k] + pb) F('save', 'fail', `${k} save ${v}: neither mod ${mods[k]} nor mod + PB ${mods[k] + pb}`, v); }
  let perception = null;
  for (const sk of String(m.skills ?? '').matchAll(/([A-Z][a-z]+(?: of [A-Z][a-z]+| [A-Z][a-z]+)?) ([+-]\d+)/g)) {
    const stat = SKILL_STAT[sk[1]]; if (!stat) continue; const n = Number(sk[2]); if (sk[1] === 'Perception') perception = n;
    if (n !== mods[stat] + pb && n !== mods[stat] + 2 * pb) F('skill', 'fail', `${sk[1]} ${sk[2]}: not ${stat} ${mods[stat]} + PB ${pb} (or expertise)`, n);
  }
  const pp = /Passive Perception (\d+)/i.exec(m.senses ?? ''); const wantPP = 10 + (perception ?? mods.WIS ?? 0);
  if (pp && Number(pp[1]) !== wantPP) F('passive', 'fail', `Passive Perception ${pp[1]}, derived ${wantPP}`, Number(pp[1]));
  if (Number.isFinite(m.initiative_bonus) && m.initiative_bonus !== mods.DEX && m.initiative_bonus !== mods.DEX + pb) F('initiative', 'fail', `Initiative ${m.initiative_bonus}, DEX mod ${mods.DEX}`, m.initiative_bonus);
  const hf = /(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?/.exec(m.hp_formula ?? '');
  if (hf) {
    const n = Number(hf[1]); const d = Number(hf[2]); const b = (hf[3] === '-' ? -1 : 1) * Number(hf[4] ?? 0);
    const avg = Math.floor(n * (d + 1) / 2) + b;
    if (avg !== Number(m.hp)) F('hp-formula', 'fail', `HP ${m.hp} but ${m.hp_formula} averages ${avg}`, m.hp);
    if (Number.isFinite(mods.CON) && b !== n * mods.CON) F('hp-con', 'fail', `${m.hp_formula}: the bonus is not ${n} × CON ${mods.CON} = ${n * mods.CON}`, b);
    if (m.size && HIT_DIE_BY_SIZE[m.size] && d !== HIT_DIE_BY_SIZE[m.size]) F('hit-die', 'soft', `d${d} on a ${m.size} body (d${HIT_DIE_BY_SIZE[m.size]})`, d);
  }
}
function gateBands(m, ctx, F) {
  // TWO LAYERS (owner 2026-10-02): "did the engine produce what it aimed at?" — the
  // card (2024) or the table (2014), drift past ±20% is soft; "is this block
  // print-plausible?" — print's own spread by the DMG method (2024) or ±35% of the
  // table where there is no corpus (2014), outside it is fail. Hot stays fine up to
  // three CRs over; beyond that is fail. The CR 10 horseman at 36 sustained with HP
  // on budget is soft here, not ok — enough to get him read.
  const cr = ctx.cr; const r = dmgRead(m); const legendary = !!(m.sections?.['Legendary Actions'] ?? []).length;
  const pcB = ctx.print;
  if (pcB && (pcB.exact || pcB.borrowOnly) && nearPrintCr(cr, pcB.cr)) { F('print-numbers', 'ok', `${pcB.name}'s own numbers at its own CR — the donor gate verifies them; the band is print's by definition`, pcB.name); return; }
  const aim = cardBudget(cr, { legendary, edition: ctx.edition === '2014' ? '2014' : null });
  const drift = (v, a) => (a ? (v - a) / a : 0);
  const dDpr = drift(r.dmg, aim.dpr); const dHp = drift(Number(m.hp), aim.hp);
  if (dDpr < -0.2) F('aim-dpr', 'soft', `damage ${r.dmg.toFixed(0)} a round is ${Math.round(-dDpr * 100)}% under the ${ctx.edition === '2014' ? 'table' : 'card'}'s ${aim.dpr}`, r.dmg);
  if (dHp < -0.2) F('aim-hp', 'soft', `HP ${m.hp} is ${Math.round(-dHp * 100)}% under the ${ctx.edition === '2014' ? 'table' : 'card'}'s ${aim.hp}`, m.hp);
  if (Number.isFinite(aim.atk) && r.atkBest && Math.abs(r.atkBest - aim.atk) > 1) F('aim-atk', 'soft', `attack +${r.atkBest} against the aim's +${aim.atk}`, r.atkBest);
  const over = r.read - cr;
  { // both editions measure against their own print — the SRD 5.2 for 2024, the SRD 5.1 for 2014 (critic's release audit 2026-10-03: "no 2014 corpus" was wrong)
    const c = corpusAt(cr, ctx.edition === '2014' ? '2014' : null);
    // ONE AXIS under print's spread is a fail only when the block is underpowered — its DMG read at or under the
    // CR. When the other axis carries the read over, it is soft: the asymmetric verdict ("not underpowered") is
    // the rule, the spread is its measure (the Sun-Crowned Archlich at 24: HP 437 under a spread that is five
    // Gargantuan dragons and the Kraken, 468–546, while the block reads 25.5 — sweep 2026-10-03)
    // print's own blocks read their CR ±1 by this method, so one axis under is a fail only when the read sits more than one under the CR (the Suncorpse King at 24 read 23 — print-heads 2026-10-03)
    const axisSev = r.read < cr - 1 ? 'fail' : 'soft'; const carried = r.read < cr - 1 ? `; reads CR ${r.read}` : `; the read holds at ${r.read}, within print's own ±1`;
    if (c.dpr && r.dmg < c.dpr[0] * 0.95) F('under', axisSev, `damage ${r.dmg.toFixed(0)} a round sits under print at CR ${cr} (${c.dpr.map(Math.round).join('–')}, n=${c.n})${carried}`, r.dmg);
    else if (c.hp && r.effHp < c.hp[0] * 0.95) F('under', axisSev, `effective HP ${r.effHp}${r.effHp !== Number(m.hp) ? ` (${m.hp} with its resistances)` : ''} sits under print at CR ${cr} (${c.hp.join('–')}, n=${c.n})${carried}`, m.hp);
    else if (c.read && over < -1 && r.read < c.read[0]) F('under', 'fail', `reads CR ${r.read} by the DMG method, under print's own reads at ${cr} (${c.read.join('–')}, n=${c.n})`, r.read);
    else if (over < -1 || over > 1) F('band', 'soft', `reads CR ${r.read} (print at ${cr} reads ${c.read?.join('–')}, n=${c.n})`, r.read);
  }
  if (over > 3) F('hot', 'fail', `reads CR ${r.read}, more than three over`, r.read);
  // the OFFENSIVE AXIS alone: print's adult dragons read +4 to +7 on offense at their own CR (Adult Brass +7), the corpus median is +2 — so over three is soft and over print's own ceiling is fail (the critic's mirror of the one-axis under rule, 2026-10-03)
  const offOver = crNum(r.off) - cr;
  if (offOver > 7) F('hot-offense', 'fail', `offense alone reads CR ${r.off}, ${offOver} over — past print's own ceiling (the Adult Brass Dragon at +7)`, r.off);
  else if (offOver > 3) F('hot-offense', 'soft', `offense alone reads CR ${r.off}, ${offOver} over; the HP axis pulls the read to ${r.read}`, r.off);
  else if (over > 1 && ctx.edition === '2014') F('hot', 'soft', `reads CR ${r.read} (hot, within three)`, r.read);
  for (const n of novasOf(m)) if (n.avg > NOVA_CAP(cr)) F('nova-cap', n.avg > NOVA_CAP(cr) * 1.15 ? 'fail' : 'soft', `${n.name}: ${n.avg} over the ${NOVA_CAP(cr)} cap`, n.avg);
  for (const a of attackRowsOf(m)) if (a.avg > aim.dpr * 0.9 && r.attacks > 1) F('per-attack-ceiling', 'fail', `${a.name}: ${a.avg} a hit is the whole budget (${aim.dpr})`, a.avg);
  if (r.used && r.attacks >= 1 && r.used.avg < aim.dpr / (r.attacks * 4)) F('per-attack-floor', 'soft', `${r.used.name}: ${r.used.avg} a hit is under a quarter share of ${aim.dpr} across ${r.attacks}`, r.used.avg);
  if (!legendary && cr >= 13 && cr <= 17 && Number(m.hp) <= Math.round(aim.hp * 0.8) + 2 && ctx.edition !== '2014') F('legendary-hp-trade', 'soft', `HP ${m.hp} looks like the legendary HP trade (${Math.round(aim.hp * 0.8)}) with no Legendary Actions section`, m.hp);
}
const KO = /\b(Paralyzed|Stunned|Unconscious|Petrified|Incapacitated)\b/;
const SIZE_REACH = { Tiny: 5, Small: 5, Medium: 5, Large: 10, Huge: 15, Gargantuan: 20 };
const SIZES = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];
const TETHER = /\b(whip|chain|tentacle|lash|tether|hook|tongue|vine|cable|rope|lance|pike|arm|limb)\b/i;
function gateStructure(m, ctx, F) {
  const names = allRows(m).map(({ e }) => bare(e.name));
  for (const n of names.filter((x, i) => names.indexOf(x) !== i)) F('duplicate-row', 'fail', `two rows named "${n}"`, n);
  const multi = (m.sections?.Actions ?? []).find((e) => /^Multiattack/.test(e.name ?? ''));
  if (multi) {
    const n = /makes (\w+)/i.exec(multi.text)?.[1]; const count = WORDS[n?.toLowerCase()] ?? Number(n);
    const named = [...String(multi.text).matchAll(/\b([A-Z][\w'-]+(?: [A-Z][\w'-]+)*)\b/g)].map((x) => x[1]).filter((x) => names.includes(x));
    if (count && /makes \w+ ([A-Z][\w' -]+?) attacks\b/.test(multi.text) && !named.length) F('multiattack-row', 'fail', `Multiattack names a row that does not exist: "${multi.text}"`, multi.text);
    // EVERY name in the "using A or B in any combination" list must be a row: "Slam or Mirror Slam" passed because "Slam"
    // exists and the nested "Mirror Slam" was never checked (critic's blockers audit 2026-10-03)
    const combo = /using ([^.]*?) in any combination/.exec(multi.text ?? '');
    if (combo) for (const nm of combo[1].split(/,|\bor\b/).map((x) => x.trim().replace(/^\([A-Z]\)\s*/, '')).filter(Boolean)) {
      if (!names.includes(nm)) F('multiattack-row', 'fail', `Multiattack names "${nm}", which is not a row`, nm);
    }
    if (count && count > 1 && named.length === 0) F('multiattack-count', 'soft', `Multiattack says ${count} but names no rows`, count);
  }
  for (const { sec, e } of allRows(m)) {
    if (!e.print && /\d+ \(\d+d\d+/.test(e.text ?? '') === false && /\bdamage\b/.test(e.text ?? '') && /\d+ (?:Bludgeoning|Piercing|Slashing|Fire|Cold|Lightning|Thunder|Acid|Poison|Necrotic|Radiant|Psychic|Force) damage/.test(e.text ?? '')) F('diceless-damage', 'fail', `${sec}/${bare(e.name)}: a damage number with no dice`, bare(e.name));
    for (const ref of String(e.text ?? '').matchAll(/(?:use of|uses|cast) ([A-Z][\w' -]+?)(?=[.,;]| if| to| or| in any| instead|$)/g)) {
      const target = ref[1].trim(); if (/^(Spellcasting|Multiattack|Dash|Disengage|Dodge|Hide|Help|Ready|Search|Attack|Reaction|Bonus Action)$/.test(target)) continue;
      if (/\bcast\b/.test(ref[0])) continue;
      if (/stat block$/i.test(target)) continue; // print's own idiom: the Treant's Animate Trees points at another creature's stat block (critic's blockers audit 2026-10-03)
      if (!names.includes(target)) F('dangling-ref', 'fail', `${sec}/${bare(e.name)} references "${target}", which is not a row`, target);
    }
    for (const mk of String(e.text ?? '').matchAll(/makes (?:one|two|three|\d+) ([A-Z][\w' -]+?) attacks?\b/g)) if (!names.includes(mk[1].trim()) && !/^Multiattack/.test(e.name ?? '')) F('dangling-ref', 'fail', `${sec}/${bare(e.name)} makes a "${mk[1].trim()}" attack, which is not a row`, mk[1].trim());
    const payoff = /(?:that|who) has the (\w+) condition/.exec(e.text ?? '');
    if (payoff) { const producer = allRows(m).some(({ e: o }) => o !== e && new RegExp(`has the ${payoff[1]} condition`).test(o.text ?? '')); if (!producer) F('payoff-producer', 'soft', `${sec}/${bare(e.name)} pays off the ${payoff[1]} condition but nothing on the sheet imposes it`, payoff[1]); }
    const eng = /(?:swallows|engulfs) one (Tiny|Small|Medium|Large|Huge|Gargantuan) or smaller creature/.exec(e.text ?? '');
    if (eng && SIZES.indexOf(eng[1]) > SIZES.indexOf(m.size)) F('engulf-size', 'fail', `${sec}/${bare(e.name)} engulfs ${eng[1]} on a ${m.size} body (print: the Gelatinous Cube takes its own size or smaller)`, eng[1]);
    if (/\bMelee or Melee or\b|\bRanged or Ranged\b/.test(e.text ?? '') || (ctx.legacyDoubled ?? []).includes(bare(e.name))) F('punctuation', 'fail', `${sec}/${bare(e.name)}: a doubled attack label${(ctx.legacyDoubled ?? []).includes(bare(e.name)) ? ' on the 2014 sheet' : ''}`, bare(e.name)); // "Melee or Melee or Ranged Spell Attack" on five 2014 sheets (critic's regressions brief 2026-10-04)
    if (/half as much damage|Half damage/i.test(e.text ?? '') && !/\d+ \(\d+d\d+/.test(e.text ?? '')) F('half-no-referent', 'fail', `${sec}/${bare(e.name)}: "half as much damage" with no damage on the row`, bare(e.name));
    if (sec === 'Legendary Actions' && !/^Legendary Action Uses/.test(e.name ?? '') && /^(?:The \w+|It) can['’]t (?:take|use) this action again[^.]*\.?$/i.test(String(e.text ?? '').trim())) F('legendary-no-effect', 'fail', `${sec}/${bare(e.name)}: a legendary action with no effect, only its recharge clause`, bare(e.name));
    if (/\. ,|,\s*,|\.\.(?!\.)|\s,|(?<!ft)\.\s+(?:and|plus)\b/.test(e.text ?? '')) F('punctuation', 'fail', `${sec}/${bare(e.name)}: a ". ,", ", ," or ". and" sequence in the text`, bare(e.name)); // ". and the target has the Paralyzed condition" on the lich's touch (critic's blockers audit 2026-10-03)
    const reach = /reach (\d+) ft\./.exec(e.text ?? '');
    if (reach && Number(reach[1]) > (SIZE_REACH[m.size] ?? 5) && !TETHER.test(`${e.name} ${e.text}`)) F('reach', Number(reach[1]) > (SIZE_REACH[m.size] ?? 5) + 10 ? 'fail' : 'soft', `${sec}/${bare(e.name)}: reach ${reach[1]} on a ${m.size} body with no tether word`, Number(reach[1]));
  }
  if (/\bSwarm\b/i.test(m.type ?? '') || /\bSwarm of\b/i.test(m.size ?? '')) {
    const large = /\b(?:large|huge|vast|massive|enormous|great)\b/i.test(readPhrases(ctx.userConcept ?? ''));
    if (!/Medium/i.test(m.size ?? '') && !large) F('swarm-size', 'fail', `a swarm sized ${m.size} (print: Medium, Bats alone Large)`, m.size);
    if (multi) F('swarm-multiattack', 'soft', 'a swarm with a Multiattack (print swarms make one attack)', multi.text);
  }
}
function gateGates(m, ctx, F) {
  for (const { sec, e } of allRows(m)) {
    if (sec === 'Legendary Actions' || e.print) continue;
    const gated = /\((?:Recharge [\d–-]+|\d\/Day)\)/.test(e.name ?? '');
    const ko = KO.exec(e.text ?? '');
    // a KO is IMPOSED when a target or each creature gets it on a failure — "It can't use this trait if it has the Incapacitated condition" is a guard on itself (Evasion, goldens 2026-10-02)
    if (ko && !gated && /(?:Failure:\*?|the target|each creature|one creature)[^.]*\bhas the (?:Paralyzed|Stunned|Unconscious|Petrified|Incapacitated) condition/.test(e.text)) { // "provided it doesn't have the Incapacitated condition" is a guard, not a KO (Evasion)
      const multi = /each creature/i.test(e.text); const repeat = /repeat(?:s|ing)? the sav|at the end of each of its turns|until the (?:end|start) of (?:its|the \w+'s|[A-Z][\w' -]+'s) next turn/i.test(e.text);
      if (multi || !repeat) F('ko-ungated', 'fail', `${sec}/${bare(e.name)}: ${ko[1]} at will ${multi ? 'on each creature' : 'with neither a repeat save nor a one-turn cap'}`, ko[1]);
      else F('ko-at-will', 'soft', `${sec}/${bare(e.name)}: ${ko[1]} at will, single target with a repeat save or a one-turn cap (the Ghoul's shape)`, ko[1]);
    }
    const noGrapple = /escape DC/.test(e.text ?? '') ? String(e.text ?? '').replace(/(?:While Grappled, the target has|,? and (?:it|the target) has) the Restrained condition(?: until the grapple ends)?\.?/g, '') : String(e.text ?? ''); // only a row that grapples (an escape DC) gets the exemption // print's grapple shapes: the Giant Toad's "While Grappled…" and the Kraken's "and it has the Restrained condition until the grapple ends" // print's grapple shape (the Giant Toad, the Mimic): the escape DC is the save
    if (!e.print && /Attack Roll/.test(e.text ?? '') && !/Saving Throw/.test(e.text ?? '') && /has the (Frightened|Poisoned|Blinded|Deafened|Charmed|Stunned|Paralyzed|Restrained) condition/.test(noGrapple)) F('rider-no-save', 'soft', `${sec}/${bare(e.name)}: a ${/has the (?!Grappled\b)(\w+) condition/.exec(noGrapple)[1]} rider on every hit with no save`, bare(e.name)); // print's hit riders without a save are Grappled and Prone (critic's audit: Frightened on every hit, three times a round)
    if (!gated && sec !== 'Traits' && /each creature/i.test(e.text ?? '') && /has the \w+ condition/.test(e.text ?? '') && !/\d+ \(\d+d\d+/.test(e.text ?? '')) {
      // print has 15 rows of this shape and NOT ONE is wide and free: the 13 dragon breaths (Sleep, Repulsion, Paralyzing)
      // are named in Multiattack's replacement clause, so they cost an attack, and the rest are narrow emanations. A wide
      // one taken for free is the row a GM house-rules mid-fight (the Lake That Thinks: 120 feet, every creature of its
      // choice, Charmed and walking in) — fail (critic's blockers audit 2026-10-03)
      const maText = (m.sections?.Actions ?? []).find((x) => /^Multiattack/.test(x.name ?? ''))?.text ?? '';
      const traded = new RegExp(`\\b${esc(bare(e.name))}\\b`).test(maText);
      const wide = /of (?:its|his|her|their) choice/i.test(e.text ?? '') || Number(/within (\d+) feet/.exec(e.text ?? '')?.[1] ?? 0) > 60;
      if (wide && !traded) F('control-aoe-ungated', 'fail', `${sec}/${bare(e.name)}: at-will multi-target control, no damage, no gate, and nothing traded for it — print's 13 breaths of this shape all cost an attack`, bare(e.name));
      else F('control-aoe-ungated', 'soft', `${sec}/${bare(e.name)}: at-will multi-target control with no damage and no gate${traded ? ' (traded for an attack in Multiattack, print\'s shape)' : ''}`, bare(e.name));
    }
    const atWill = /At Will:\*?\*?\s*([^\n]+)/.exec(e.text ?? '');
    if (atWill) for (const sp of atWill[1].split(',').map((x) => x.replace(/[*]/g, '').trim())) {
      const lvl = CONTROL_SPELL_LEVEL[sp]; if (lvl && ctx.cr < CONTROL_AT_WILL_CR) F('control-at-will', 'fail', `${sp} (level ${lvl} hard control) at will at CR ${ctx.cr} (print: CR ${CONTROL_AT_WILL_CR}+)`, sp);
      else if (SPELL_DAMAGE_AVG[sp] && !new RegExp(`cast \\*?${esc(sp)}`).test((m.sections?.Actions ?? []).find((x) => /^Multiattack/.test(x.name ?? ''))?.text ?? '')) F('damage-spell-at-will', 'soft', `${sp} at will outside a Multiattack replacement clause`, sp);
    }
  }
}
const TYPE_IMMUNITY = { Undead: ['Poison'], Construct: ['Poison'], Elemental: ['Poison'], Ooze: ['Poison'] };
function gateHeaderBody(m, ctx, F) {
  const texts = allRows(m).map(({ e }) => `${e.name}. ${e.text}`).join('\n');
  if (/earth glide|move through nonmagical, unworked earth/i.test(texts) && !/Burrow/i.test(m.speed ?? '')) F('earth-glide-burrow', 'fail', 'Earth Glide with no Burrow speed', m.speed);
  if (/spider climb|climb difficult surfaces, including along ceilings/i.test(texts) && !/Climb/i.test(m.speed ?? '')) F('spider-climb-climb', 'fail', 'Spider Climb with no Climb speed', m.speed);
  if (/blind beyond this radius/i.test(m.senses ?? '') && /darkvision/i.test(m.senses ?? '')) F('blind-beyond-darkvision', 'fail', 'blind beyond its blindsight yet it has darkvision', m.senses);
  const type = String(m.type ?? '').split(/[\s(]/)[0];
  const want = TYPE_IMMUNITY[type]; const imm = String(m.immunities ?? '');
  if (want && !want.every((w) => new RegExp(`\\b${w}\\b`).test(imm))) F('type-immunities', 'soft', `a ${type} without ${want.join(', ')} immunity (${imm || 'none listed'})`, imm);
  const lang = String(m.languages ?? '').trim();
  if (/^Beast\b/.test(type) && lang && !/^(none|—|-)$/i.test(lang)) F('languages-type', 'soft', `a Beast that speaks (${lang})`, lang);
  if (/^Ooze\b/.test(type) && /Common/.test(lang)) F('languages-type', 'soft', `an Ooze that speaks Common`, lang);
}
const ARMOR = { padded: [11, 'dex'], leather: [11, 'dex'], 'studded leather': [12, 'dex'], hide: [12, 'dex2'], 'chain shirt': [13, 'dex2'], 'scale mail': [14, 'dex2'], breastplate: [14, 'dex2'], 'half plate': [15, 'dex2'], 'ring mail': [14, 0], 'chain mail': [16, 0], splint: [17, 0], plate: [18, 0] };
function gateEdition(raw, m, ctx, F) {
  const texts = ctx.edition === '2014'
    ? [...(raw.abilities ?? []), ...(raw.actions ?? []), ...(raw.reactions ?? []), ...(raw.legendary_actions ?? []), ...(raw.bonus_actions ?? [])].map((e) => `${e.name ?? ''}. ${e.description ?? e.text ?? ''}`).join('\n')
    : allRows(m).filter(({ e }) => !e.print).map(({ e }) => `${e.name}. ${e.text}`).join('\n'); // print's own 2024 text is print (the Kraken's "must succeed on a DC 25")
  if (ctx.edition === '2014') {
    for (const w of ['Attack Roll:', 'Saving Throw*:', '*Failure:*', 'Failure:', 'Bloodied', 'Emanation', 'Hit or Miss', 'Success: Half']) if (texts.includes(w)) F('vocab-2024-in-2014', 'fail', `2024 wording in a 2014 block: "${w}"`, w);
    const acm = /^(\d+) \(([^)]+)\)/.exec(String(raw.armor_class ?? ''));
    if (acm && !/natural|mage armor|unarmored/i.test(acm[2])) {
      const parts = acm[2].toLowerCase().split(/,\s*/); const base = ARMOR[parts[0]]; const dexMod = modOf(m.stats?.DEX ?? 10);
      if (base) { const want = base[0] + (base[1] === 'dex' ? dexMod : base[1] === 'dex2' ? Math.min(2, dexMod) : 0) + (parts.includes('shield') ? 2 : 0); if (want !== Number(acm[1])) F('armor-parenthetical', 'fail', `AC ${acm[1]} (${acm[2]}) — ${parts[0]} with DEX ${dexMod} gives ${want}`, acm[0]); }
    }
  } else {
    for (const w of ['Weapon Attack:', 'to hit', 'must succeed on a DC', 'knocked prone', 'half as much damage']) if (texts.replace(/to hit with spell attacks/g, '').includes(w)) F('vocab-2014-in-2024', 'fail', `2014 wording in a 2024 block: "${w}"`, w);
  }
}
const RAYS_2014 = ['Charm Ray', 'Paralyzing Ray', 'Fear Ray', 'Slowing Ray', 'Enervation Ray', 'Telekinetic Ray', 'Sleep Ray', 'Petrification Ray', 'Disintegration Ray', 'Death Ray'];
function gateDonor(raw, m, ctx, F) {
  const hits = piGuard(JSON.parse(JSON.stringify(m)));
  if (hits.length) F('pi-denylist', 'fail', `Product Identity on the sheet: ${hits.join(', ')}`, hits.join(', '));
  const text = JSON.stringify(m.sections ?? {});
  const rays = RAYS_2014.filter((r) => text.includes(r)); if (rays.length >= 3) F('ray-overlap', 'fail', `${rays.length} of the 2014 beholder's rays by name: ${rays.join(', ')}`, rays.length);
  const pc = ctx.print ?? (ctx.userConcept ? printCanonFor(readPhrases(ctx.userConcept), ctx.cr) : null);
  if (!pc || !(pc.exact || pc.borrowOnly)) return;
  const donor = DONORS.find((d) => d.id === ctx.donorId) ?? null;
  const printNames = new Set([...(pc.meleeRows ?? []), ...(pc.rangedRows ?? []), ...(pc.rulesRows ?? [])].map((r) => bare(r.name)).concat((pc.traits ?? []).map((t) => bare(t.name ?? t))));
  const donorNames = new Set((donor ? Object.values(donor.sections ?? {}).flat() : []).map((e) => bare(e.name)));
  const stray = []; const printHasLegendary = (pc.rulesRows ?? []).some((r) => r.section === 'Legendary Actions');
  for (const { sec, e } of allRows(m)) {
    const n = bare(e.name);
    let why = null;
    if (/^(Multiattack|Spellcasting|Legendary Resistance)$/.test(n) || printNames.has(n)) continue;
    else if (e.print) why = 'print rules row';
    else if (e.library) why = 'seed the user\'s words keyed';
    else if (e.template) why = 'template bound on the user\'s verb';
    else if (sec === 'Legendary Actions' && ctx.cr >= 17 && !printHasLegendary) why = 'the legendary tier\'s kit (print carries none)';
    else if (sec === 'Legendary Actions' && (pc.legendaryRows ?? []).length) { F('print-legendary', 'soft', `${sec}/${n}: the chassis's legendary row stands where ${pc.name} prints its own (${pc.legendaryRows.map((x) => bare(x.name)).join(', ')})`, n); continue; }
    else if (pc.addsSeat && (donorNames.has(e.was ?? '') || sec === 'Legendary Actions' || sec === 'Bonus Actions' || sec === 'Actions' || sec === 'Traits')) why = 'the seat the user\'s words named';
    if (why) { F('print-row-exception', 'ok', `${sec}/${n} rides on: ${why}`, n); continue; }
    stray.push(`${sec}/${n}`);
  }
  if (stray.length) F('print-rows', stray.length > 2 ? 'fail' : 'soft', `rows outside print, the named seat and the keyed seeds: ${stray.join(', ')}`, stray.join(', '));
  if (nearPrintCr(ctx.cr, pc.cr)) {
    if (pc.stats && Object.entries(pc.stats).some(([k, v]) => Number(m.stats?.[k]) !== Number(v))) F('print-array', 'fail', `array is not the ${pc.name}'s at its own CR`, JSON.stringify(m.stats));
    if (Number.isFinite(pc.hp) && pc.hp > 0 && Number(m.hp) !== pc.hp) F('print-hp', 'fail', `HP ${m.hp}, the ${pc.name}'s is ${pc.hp}`, m.hp);
    if (Number.isFinite(pc.ac) && pc.ac > 0 && Number(m.ac) !== pc.ac) F('print-ac', 'fail', `AC ${m.ac}, the ${pc.name}'s is ${pc.ac}`, m.ac);
  }
}
const LINT_GATE = [
  [/^(multiattack|dangling-use-ref|undefined-attack-ref|unknown-action-ref|duplicate-|diceless-damage|damage-dice|legendary|swarm-|counts|section-|slot-missing|empty-entry|hp-formula)/, 'structure'],
  [/^(restrain-gate|cc-aoe|spell-tiers|trait-recharge|trait-imposes-save|buff-behind-save)/, 'gates'],
  [/^(phrasing-|vocab-|bloodied-in-2014|emanation-in-2014|condition-.*-in-2014|area-caps-in-2014|half-as-much|term-caps|condition-caps|damage-type-caps|area-term-caps)/, 'edition'],
  [/^(identity-immunity|defense-|beast-intelligence|bps-|resistance-|immune-|self-condition)/, 'headerBody'],
  [/^(attack-mod-coherence|saves|pb|initiative|xp|escape-dc|spell-dc-ability|attack-band|dc-band|ac-band|hp-band|attack-damage-band)/, 'derivation'],
];
export function checkBlock(raw, ctx = {}) {
  const edition = ctx.edition ?? (raw.format === '2014' || raw.type_and_alignment ? '2014' : '2024');
  const m = edition === '2014' ? (raw.other_edition?.format === '2024' ? raw.other_edition : fromLegacyModel(raw)) : raw;
  const cr = Number(ctx.cr ?? m.cr ?? crNum(m.cr_str ?? '0'));
  const userConcept = ctx.userConcept ?? [raw.monsterName, raw.monsterDescription].filter(Boolean).join(' — ');
  let print = ctx.print ?? null; if (!print && userConcept) { try { print = printCanonFor(readPhrases(userConcept), cr); } catch { print = null; } }
  const labels2014 = {};
  if (edition === '2014') for (const e of [...(raw.actions ?? []), ...(raw.legendary_actions ?? []), ...(raw.reactions ?? [])]) { const t = String(e.description ?? e.text ?? ''); labels2014[bare(e.name)] = /Spell Attack:/.test(t) ? 'spell' : /Weapon Attack:/.test(t) ? 'weapon' : null; }
  const context = { ...ctx, edition, cr, userConcept, print, labels2014, donorId: ctx.donorId ?? raw.generation?.donor ?? m.generation?.donor ?? null };
  // the 2014 SHEET's own text (the legacy render) is what a GM reads: a doubled label there is a structure fail even though the saved 2024 rows are clean (five 2014 sheets read "Melee or Melee or Ranged", critic's regressions brief 2026-10-04)
  const legacyDoubled = edition === '2014' ? [...(raw.abilities ?? []), ...(raw.actions ?? []), ...(raw.legendary_actions ?? []), ...(raw.reactions ?? [])].filter((e) => /\bMelee or Melee or\b|\bRanged or Ranged\b/.test(String(e.description ?? e.text ?? ''))).map((e) => bare(e.name)) : [];
  context.legacyDoubled = legacyDoubled;
  const gates = Object.fromEntries(GATES.map((g) => [g, { status: 'ok', findings: [] }]));
  const F = (gate) => (rule, severity, message, value) => {
    const g = gates[gate]; g.findings.push({ rule, severity, message, value });
    if (severity === 'fail') g.status = 'fail'; else if (severity === 'soft' && g.status !== 'fail') g.status = 'soft';
  };
  const safe = (gate, fn) => { try { fn(F(gate)); } catch (e) { F(gate)('checker-error', 'soft', `the gate threw: ${e?.message ?? e}`, String(e)); } };
  safe('derivation', (f) => gateDerivation(m, context, f));
  safe('bands', (f) => gateBands(m, context, f));
  safe('structure', (f) => gateStructure(m, context, f));
  safe('gates', (f) => gateGates(m, context, f));
  safe('headerBody', (f) => gateHeaderBody(m, context, f));
  safe('edition', (f) => gateEdition(raw, m, context, f));
  safe('donor', (f) => gateDonor(raw, m, context, f));
  // the lint's own predicates ride in by rule id — one fix, one place
  try {
    const { findings } = lintStatblock(JSON.parse(JSON.stringify(m)), { edition: '2024' });
    for (const f of findings) {
      const gate = LINT_GATE.find(([re]) => re.test(f.rule))?.[1]; if (!gate) continue;
      if (f.loc?.entry && allRows(m).some(({ e }) => e.print && bare(e.name) === bare(f.loc.entry))) continue; // print's row is print
      F(gate)(`lint:${f.rule}`, f.severity === 'reject' ? 'fail' : 'soft', f.message, f.expected ?? null);
    }
  } catch (e) { F('structure')('lint-error', 'soft', `the lint threw: ${e?.message ?? e}`, String(e)); }
  const fails = GATES.filter((g) => gates[g].status === 'fail'); const softs = GATES.filter((g) => gates[g].status === 'soft');
  return { name: m.name, cr, edition, donor: context.donorId, gates, fails, softs, read: dmgRead(m) };
}
export function checkTable(results, { title = 'Mechanics check' } = {}) {
  const head = `## ${title}\n\n| block | CR | ed | donor | ${GATES.join(' | ')} | verdict |\n|---|---|---|---|${GATES.map(() => '---').join('|')}|---|\n`;
  const cell = (g) => (g.status === 'ok' ? 'ok' : `${g.status.toUpperCase()}: ${g.findings.filter((f) => f.severity === g.status).map((f) => f.rule).join(', ')}`);
  const rows = results.map((r) => `| ${r.name} | ${r.cr}${r.edition === '2014' ? ' (2014)' : ''} | ${r.edition} | ${r.donor ?? '—'} | ${GATES.map((g) => cell(r.gates[g])).join(' | ')} | ${r.fails.length ? `FAIL (${r.fails.length})` : r.softs.length ? `soft (${r.softs.length})` : 'clean'} |`).join('\n');
  const bySeat = {};
  for (const r of results) for (const g of r.fails) { const k = `${r.donor ?? '?'} / ${g}`; bySeat[k] = (bySeat[k] ?? 0) + 1; }
  const sorted = Object.entries(bySeat).sort((a, b) => b[1] - a[1]).map(([k, v]) => `- ${k}: ${v}`).join('\n');
  return `${head}${rows}\n\n**Fails by seat and gate:**\n${sorted || '- none'}\n`;
}
