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
import { AFFLICTIONS, imposedCondition, imposedConditions } from './author.mjs'; // one definition: the conditions a finished row imposes
import { lintStatblock } from '../format-2024/lint.mjs';
import { HIT_DIE_BY_SIZE } from '../format-2024/dice.mjs';
import { WEAPONS, weaponFor, weaponProp, namesWeapon } from './weapons.mjs';
import { cardBudget, dmgRow } from './card-budgets.mjs';
import { NOVA_CAP, gateOf } from './templates.mjs'; // one definition of a row's gate: the field first, the name only as print's canon/a missed-stamp signal
import { CONTROL_SPELL_LEVEL, CONTROL_AT_WILL_CR, SPELL_DAMAGE_AVG, printCanonFor, nearPrintCr } from './generate.mjs';
import { speciesFor } from './species.mjs';
import { LINE_VERBS } from './route.mjs'; // the router's own key tables — one definition for what keys an engine (stage 1b)
import { DONORS } from './donors.mjs';
import { piGuard, readPhrases } from './lexicon.mjs';

import CORPUS from '@/data/srd52-monsters.json';
import TABLE from '@/data/challengeRatings.json';
import { PRINT_2014 } from './print-2014.mjs';
import { resolutionOf, TARGET_CLAUSE, SAVE_OUTCOME } from './forms.mjs';
import { NAME_CLAIMS_MECHANIC, mechanicUnkept } from './name-claims.mjs';
import { LACKS_STOP, TEXT_GATE } from './generate.mjs';
export const GATES = ['derivation', 'bands', 'structure', 'gates', 'headerBody', 'edition', 'donor', 'adjudicability', 'reader', 'class'];
const crNum = (k) => (String(k).includes('/') ? Number(String(k).split('/')[0]) / Number(String(k).split('/')[1]) : Number(k));
const CRS = Object.keys(TABLE).filter((k) => /^\d+$|^1\/[248]$|^0$/.test(k)).sort((a, b) => crNum(a) - crNum(b));
const modOf = (v) => Math.floor((Number(v) - 10) / 2);
const pbFor = (cr) => (dmgRow(cr)?.proficiency_bonus ?? (2 + Math.floor(Math.max(0, cr - 1) / 4)));
const WORDS = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
const avgOf = (s) => Number(/(\d+) \(\d+d\d+/.exec(s)?.[1] ?? 0);
const allRows = (m) => Object.entries(m.sections ?? {}).flatMap(([sec, es]) => (es ?? []).filter((e) => !/^Legendary Action Uses/.test(e?.name ?? '')).map((e) => ({ sec, e }))); // the 2024 preamble is not a row
const esc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const bare = (n) => String(n ?? '').replace(/ \(.*\)$/, '');
// ONE DEFINITION, EVERY READER (2026-10-16). This scan used to live only here,
// so the checker could FAIL a sheet for citing a row that does not exist while
// generation happily built it: the Court Step-Wizard shipped a "Missed Step
// Riposte" reaction citing a Longbow it never had. Generation now refuses a
// rendered row this would fail, so the defect cannot reach a sheet at all.
const REF_SKIP = /^(Spellcasting|Multiattack|Dash|Disengage|Dodge|Hide|Help|Ready|Search|Attack|Reaction|Bonus Action)$/;
export const rowNamesOf = (m) => allRows(m).map(({ e }) => bare(e.name));
export function danglingRefIn(text, names, rowName = '') {
  // THE SECOND DOOR. The checker scans two shapes and this function first
  // carried only one, so the guard built for the Court Step-Wizard's Longbow
  // missed it: "snap-shot" renders "makes one {ranged_name} attack", which is
  // this shape, not "uses X". Both live here now — the whole point of the
  // function is that no reader is left holding half the predicate.
  if (!/^Multiattack/.test(String(rowName ?? ''))) {
    for (const mk of String(text ?? '').matchAll(/makes (?:one|two|three|\d+) ([A-Z][\w' -]+?) attacks?\b/g)) {
      const t = mk[1].trim();
      if (!names.includes(t)) return t;
    }
  }
  // A row name is a TITLE-CASE RUN, so the capture ends at the first lowercase
  // word. The old lazy capture leaned on a lookahead list of following words
  // ([.,;], " if", " to", " or", " in any", " instead") and swallowed anything
  // the list missed: "uses Slam against the attacker" captured the whole tail
  // and read as dangling even though Slam is a row. Harmless while only the
  // checker read this (it reported after the fact); a false refusal once
  // generation reads it too, which is why it is bounded here.
  // A PRINT ROW NAME CARRIES LOWERCASE PARTICLES ("Vow of Silence", "Breath of
  // the Grave"), so the title-case run has to step over them. Bounding the run
  // to capitalised words alone fixed the over-capture ("uses Slam against the
  // attacker" took the whole tail) and introduced the opposite fault: "a use of
  // Vow of Silence" captured "Vow", which matches no row, and the checker failed
  // a sheet whose citation was correct. A connective counts as part of the name
  // only when a capitalised word follows it.
  // Two more gaps, found on the 37-block gate (2026-10-17): a name with TWO
  // consecutive particles ("Toll of the Crossing") captured only "Toll", and the
  // bare verb "use" was not in the alternation at all ("It can use Weighing
  // Pan"). Particles may now repeat inside the run, and "use" joins "uses".
  for (const ref of String(text ?? '').matchAll(/(?:use of|uses?|cast) ((?:[A-Z][\w'-]*)(?:(?: (?:of|the|and|in|to|from|at|on|with|upon))* [A-Z][\w'-]*){0,3})/g)) {
    const target = ref[1].trim();
    if (REF_SKIP.test(target)) continue;
    if (/\bcast\b/.test(ref[0])) continue;
    if (/stat block$/i.test(target)) continue; // print's own idiom: the Treant's Animate Trees points at another creature's stat block (critic's blockers audit 2026-10-03)
    if (!names.includes(target)) return target;
  }
  return null;
}

// ---------------------------------------------------------------- arithmetic
export function attackRowsOf(m) {
  return allRows(m).filter(({ e }) => /Attack Roll|(?:Weapon|Spell) Attack:/.test(e.text ?? '')).map(({ sec, e }) => { // 2024 "Attack Roll:" or 2014 "Melee Weapon Attack:" (the SRD 5.1 corpus reads by the same arithmetic)
    const atk = Number(/Attack(?: Roll)?:\*?\s*\+(\d+)/.exec(e.text)?.[1] ?? NaN); // 2024 "Attack Roll: +7" or 2014 "Weapon Attack: +7 to hit"
    const main = String(e.text).replace(/,?\s*plus \d+ \(\d+d\d+(?: [+-] \d+)?\) \w+ damage if [^.]*\.?/g, '').split(/\bIf\b|\bWhen\b|, or \d+ \(/)[0]; // a rider that needs a condition ("if the attack roll had Advantage") is not always-on (critic's audit 2026-10-02)
    const parts = main.match(/\d+ \(\d+d\d+(?: [+-] \d+)?\)/g) ?? [];
    const first = /(\d+) \((\d+)d(\d+)(?: ([+-]) (\d+))?\)/.exec(main);
    return { sec, e, weapon: e.weapon, name: bare(e.name), atk, avg: parts.reduce((a, p) => a + avgOf(p), 0), ranged: /Ranged Attack Roll/.test(e.text) && !/Melee or Ranged/.test(e.text), bonus: first ? (first[4] === '-' ? -1 : 1) * Number(first[5] ?? 0) : null, dice: first ? `${first[2]}d${first[3]}` : null };
  });
}
// A ONCE-PER-FIGHT TRIGGER IS A GATE, WHEREVER IT IS WRITTEN (critic's hold 4,
// 2026-10-16). novasOf only ever read a gate off the NAME — "(Recharge 5-6)",
// "(1/Day)". A bloodied-burst or a death-burst carries its limit in its TEXT
// ("The first time the swarm is Bloodied in a fight"), so a CR 13 swarm shipped
// a 91 (14d12) Necrotic burst in a 30-foot emanation and the read said "nova
// none" — the reader could not see it and the cap never priced it.
// A CONDITION THAT DOES NOT SELF-END STATES WHEN IT ENDS. Measured over print's
// 171 affliction rows: Prone is 50 bare of 51 (it self-ends — you stand up),
// Grappled is always an escape DC, while these are NEVER bare. ONE definition,
// used by the `condition-duration` gate and by the conversion-equivalence check
// in gateEdition (2026-10-22): two copies of a bound pattern is how a gate and
// its sibling drift apart.
const MUST_BE_BOUNDED = ['Paralyzed', 'Stunned', 'Blinded', 'Charmed', 'Deafened', 'Petrified', 'Unconscious'];
const CONDITION_BOUNDED = /until the (?:end|start) of|for 1 (?:minute|hour)|until (?:it|the target|the creature|this|that|cured|dispelled|removed|\w+) (?:dies|ends|is cured|is removed|recovers)|\bwhile\b|\(escape DC|repeats the save|until the (?:web|vines|grasp)/i;

export function novasOf(m) {
  const all = allRows(m);
  return all.map(({ sec, e }, i) => {
    const nameGate = !!gateOf(e); // the recorded gate, falling back to the name
    if (!nameGate && !TEXT_GATE.test(e.text ?? '')) return null;
    // the 2014 two-row breath: "Breath Weapons (Recharge 5–6). The dragon uses one of the following" and the damage sits in the rows beneath
    const subs = /one of the following/i.test(e.text ?? '') && !/\d+ \(\d+d\d+/.test(e.text ?? '') ? all.slice(i + 1, i + 4).map((x) => x.e).filter((x) => /saving throw/i.test(x.text ?? '') && /\d+ \(\d+d\d+/.test(x.text ?? '')) : [];
    const src = subs.length ? subs.sort((a, b) => avgOf(b.text) - avgOf(a.text))[0] : e;
    if (!/Saving Throw/i.test(src.text ?? '') || !/\d+ \(\d+d\d+/.test(src.text ?? '')) return null;
    return { sec, e, name: bare(e.name), gate: nameGate ? gateOf(e) : '1/Day' /* a once-per-fight trigger prices as a daily */, avg: avgOf(src.text), area: /each creature|Cone|Sphere|radius|Line|Emanation|Cube/i.test(src.text) };
  }).filter(Boolean);
}
export function sustainedOf(m) {
  const rows = attackRowsOf(m);
  const multi = (m.sections?.Actions ?? []).find((e) => /^Multiattack/.test(e.name ?? ''));
  let attacks = 1; let used = rows.slice().sort((a, b) => b.avg - a.avg)[0] ?? null;
  if (multi) {
    // `Number('five') ?? 1` is NaN: ?? only catches null/undefined, so a count word the
    // table lacked read as NaN attacks and the Hydra's offense read 1/4 beside bands "ok"
    // (critic A7, 2026-10-18). A count is a finite number or 1.
    const n = /makes (\w+)/i.exec(multi.text)?.[1]; const nn = WORDS[n?.toLowerCase()] ?? Number(n); attacks = Number.isFinite(nn) ? nn : 1;
    const named = rows.filter((r) => new RegExp(`\\b${esc(r.name)}s?\\b`, 'i').test(multi.text)); // 2014 writes "one with its bite and two with its claws"
    if (named.length) used = named.slice().sort((a, b) => b.avg - a.avg)[0];
  }
  // an AT-WILL ray table fires three rays a round at random: three times the table's mean damage (print's Beholder; the orb at 13, rerun 2026-10-03)
  const rayRow = allRows(m).find(({ e }) => /fires three rays/.test(e.text ?? '') && !/\((?:Recharge [\d–-]+|\d\/Day)\)/.test(e.name ?? ''));
  const rayEntries = rayRow ? String(rayRow.e.text).split(/\s\d — /).slice(1) : [];
  const rays = rayEntries.length ? 3 * rayEntries.reduce((a, t) => a + (t.match(/\d+ \(\d+d\d+(?: \+ \d+)?\)/g) ?? []).reduce((b, p) => b + avgOf(p), 0), 0) / rayEntries.length : 0;
  // A PASSIVE DAMAGE AURA IS SUSTAINED DAMAGE (critic A8, 2026-10-18): Widow Alderkin's
  // "Trailing Cold" dealt 13 (3d8) to anyone starting its turn adjacent, no save, at CR 3,
  // and this read it as zero because it is not an attack row. It fires once a round.
  const aura = allRows(m).filter(({ e }) => !/Attack Roll/.test(e.text ?? '') && !/\((?:Recharge [\d–-]+|\d\/Day)\)/.test(e.name ?? '') && /\b(?:starts|ends) its turn within|enters (?:the|a) [^.]{0,40}for the first time|moves within \d+ feet/i.test(e.text ?? ''))
    .map(({ e }) => (String(e.text).match(/\d+ \(\d+d\d+(?: \+ \d+)?\)/g) ?? []).reduce((a, p) => a + avgOf(p), 0)).reduce((a, b) => a + b, 0);
  const sustained = (used?.avg ?? 0) * attacks + rays + aura;
  const legUses = Number(m.legendary_uses ?? 3);
  const legendary = (m.sections?.['Legendary Actions'] ?? []).filter((e) => !/^Legendary Action Uses/.test(e.name ?? '')).map((e) => {
    const ref = /makes (one|two|\d+) ([A-Z][\w' -]+?) attacks?/.exec(e.text ?? '');
    const cost = Number(/\(Costs (\d+) Actions?\)/i.exec(e.name ?? '')?.[1] ?? 1);
    const once = /can['’]t (?:take|use) this action again|once per round|only once/i.test(e.text ?? '');
    let per = 0;
    if (ref) { const r = rows.find((a) => a.name === ref[2]); const k = WORDS[ref[1]] ?? Number(ref[1]); per = r ? r.avg * (Number.isFinite(k) ? k : 1) : 0; }
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
  // DEFENSIVE TRAITS ARE HALF THE EQUATION (owner, 2026-10-16). The defensive
  // half priced HP, AC and wide resistances only, so a trait that makes a
  // creature harder to put down was free. Measured over the 329-block frozen
  // corpus, by full read against print's own CR:
  //   no defensive trait   n=159  -0.60   <- the reader's baseline bias
  //   Magic Resistance     n=33   -1.07
  //   Legendary Resistance n=32   -1.09
  //   Regeneration         n=3    -1.50
  // Carrying one costs about half a CR on the full read, which is one rung on
  // the defensive half. +1 rung brings each shape back to the baseline gap — it
  // does NOT try to correct the baseline itself, which is the parked DPR
  // question. The DMG prices Magic Resistance at +2 effective AC, and a rung is
  // 2 AC, so print and the book agree on the size.
  // Regeneration's -1.50 suggests two rungs; n=3 is too thin to spend, so it
  // takes one with the rest.
  const defText = allRows(m).map(({ e }) => `${e.name ?? ''} ${e.text ?? ''}`).join(' ');
  const defTraitRungs = (/Magic Resistance|Advantage on saving throws against spells/i.test(defText) ? 1 : 0)
    + (/Legendary Resistance/i.test(defText) ? 1 : 0)
    + (/\bRegeneration\b|regains \d+ Hit Points at the start of/i.test(defText) ? 1 : 0)
    + (/Undead Fortitude|drops to 1 Hit Point instead/i.test(defText) ? 1 : 0)
    // STEALTH IS EFFECTIVE AC (owner's lurker work, 2026-10-18). The DMG 2014
    // Monster Features table (p.280-281, from memory — verify against the book)
    // prices Nimble Escape at +4 effective AC, Shadow Stealth at +4, Invisibility
    // and Superior Invisibility at +2, and Incorporeal Movement at no adjustment.
    // A rung here is 2 AC. Tested against print's own stealth creatures before
    // landing: Nimble Escape moved the defensive read from -0.96 to +0.17 at +4,
    // and Invisibility from -1.27 to -0.39 at +2 — both inside the reader's own
    // -0.60 baseline. The DMG also gives Nimble Escape +4 ATTACK (it assumes the
    // creature hides every round); print's Nimble Escape creatures already read
    // +1.00 OVER on offense without it, so the attack half is not applied.
    // Incorporeal Movement takes nothing here because print's incorporeals pay
    // their thin HP with resistances, which effectiveHp already prices.
    // This is why a lurker reads under: it trades HP for stealth, and the reader
    // saw the trade's cost and never its payment. It reads any sheet, so a
    // non-lurker carrying a hide bonus action is priced the same way.
    // One stealth rung, not one per phrasing: 2024's Nimble Escape IS the hide
    // bonus action ("takes the Disengage or Hide action"), so a creature that
    // has it must not be priced twice. Measured: both rungs firing read print's
    // Nimble Escape creatures +2.00 over; one reads them +0.17.
    + ((/\bNimble Escape\b|\bShadow Stealth\b/i.test(defText) || (m.sections?.['Bonus Actions'] ?? []).some((e) => /\bHide action\b/i.test(e.text ?? ''))) ? 2 : 0)
    // Print's at-will invisibility is mostly a spell-list entry ("At Will: ...
    // Invisibility"), so this reads every row's text, not row names; a recharge
    // row is a nova, priced on the offense side.
    + (allRows(m).some(({ e }) => /\bInvisibility\b|has the Invisible condition/i.test(e.text ?? '') && !/\(Recharge/i.test(e.name ?? '')) ? 1 : 0);
  const def = stepCR(defBase, Math.trunc((Number(m.ac) - TABLE[defBase].armor_class) / 2) + defTraitRungs);
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
const MASTERY_FEATURE = /^(?:Topple|Push|Sap|Slow|Vex|Nick|Graze|Cleave)$/i; // the 2024 weapon mastery properties, as the feature table names them
function gateDerivation(m, ctx, F) {
  const pb = Number(m.pb ?? pbFor(ctx.cr)); const mods = Object.fromEntries(Object.entries(m.stats ?? {}).map(([k, v]) => [k, modOf(v)]));
  const declared = m.generation?.declared ?? {}; // user-set numbers are declared fields, not derivations (Resolution 3)
  const modsOf = (keys) => keys.map((k) => mods[k]).filter(Number.isFinite);
  const castStat = (() => { const sp = allRows(m).map(({ e }) => /using (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) as the spellcasting ability/.exec(e.text ?? '')?.[1]).find(Boolean); return sp ? { Strength: 'STR', Dexterity: 'DEX', Constitution: 'CON', Intelligence: 'INT', Wisdom: 'WIS', Charisma: 'CHA' }[sp] : null; })();
  const label2014 = ctx.labels2014 ?? {};
  for (const r of attackRowsOf(m)) {
    if (r.e.print || r.e.overlay_bite) continue; // print's row carries print's numbers; the orb's bite adds PB off a STR 10 (print's Beholder)
    if (!Number.isFinite(r.atk)) continue;
    // a WEAPON row rolls Strength or Dexterity; a SPELL row rolls the casting stat — the 2014 label says which, a 2024 row may be either (the critic's audit 2026-10-02: a scepter rolling Int under "Melee Weapon Attack")
    // A MUNDANE WEAPON BY NAME ROLLS STR OR DEX, whatever the chassis keys to
    // (critic, 2026-10-14: Lady Merivane swung a greatsword at +8 off WIS 20
    // because the caster chassis keys every attack to one stat). Without a 2014
    // label the gate allowed the casting stat on any row, so nothing flagged it.
    // A NULL STAMP IS THE CALL'S ANSWER (gate 2026-10-17: "Snuffer-Pole = none").
    // The engine resolves each row's weapon once: a name, or null when the call
    // said the row is no weapon. Re-reading the name is the fallback for a row
    // that was never resolved (undefined), not a second opinion on one that was.
    const noWeapon = r.weapon === null;
    const label = label2014[r.name]; const mundane = !noWeapon && namesWeapon(r.name) && !/\b(?:arcane|eldritch|spectral|radiant|shadow|flame|frost|storm|spirit|astral|phantom)\b/i.test(String(r.name ?? ''));
    // AND FINESSE SAYS WHICH OF THE TWO (critic's notes, 2026-10-15: "Vareth's
    // Mace rolls off DEX 18; a mace isn't finesse, and the weapon table knows
    // it"). A melee weapon with no finesse property rolls Strength; a finesse one
    // may roll either; a launcher rolls Dexterity. All three are columns of the
    // one weapon table, so this adds no list.
    // the ROW'S OWN declared weapon first — the call answered "which weapon is
    // this" and the engine stamped it; re-reading the name is the fallback
    const wp = noWeapon ? null : (WEAPONS[r.weapon ?? ''] ?? weaponProp(r.name));
    const weaponStats = wp && !label ? (wp.launcher ? ['DEX'] : (wp.finesse || wp.thrown ? ['STR', 'DEX'] : (wp.reach ? ['STR'] : ['STR', 'DEX']))) : null;
    const allowed = label === 'weapon' || mundane ? (weaponStats ?? ['STR', 'DEX']) : label === 'spell' ? [castStat].filter(Boolean) : ['STR', 'DEX', ...(castStat ? [castStat] : [])];
    const any = Object.keys(mods).find((k) => mods[k] + pb === r.atk); const stat = allowed.find((k) => mods[k] + pb === r.atk) ?? any;
    if (!any) F('attack-bonus', 'fail', `${r.name}: +${r.atk} is not ${label ? `a ${label} row's` : 'STR/DEX or the casting stat\'s'} mod + PB ${pb} (mods ${Object.entries(mods).map(([k, v]) => `${k} ${v}`).join(', ')})`, `+${r.atk}`);
    else if (!allowed.includes(stat)) F('attack-stat', 'fail', `${r.name}: +${r.atk} derives from ${stat}, but ${label ? `a ${label} row` : 'an attack row'} rolls ${allowed.join('/')}`, stat);
    else if (r.bonus !== null && r.bonus !== mods[stat] && !(r.ranged && r.bonus === mods.DEX)) F('damage-mod', 'fail', `${r.name}: damage bonus ${r.bonus >= 0 ? '+' : ''}${r.bonus} is not ${stat}'s ${mods[stat]}`, r.bonus);
  }
  // TWO ROWS FOR ONE MECHANIC (critic, 2026-10-16). A berserker shipped
  // "Wounded Rage. While Bloodied, the hull has Advantage on attack rolls."
  // beside "Bloodied Frenzy. While Bloodied, the hull has Advantage on attack
  // rolls and saving throws." — the same trigger and the same effect, extended,
  // which the brief calls chassis filler.
  // It REPORTS and does not repair. As a lint `correctable` it drove the repair
  // path and rewrote unrelated rows; the checker is the reviewer and the lint is
  // the fixer, so it belongs here. A PREFIX, not a subset: a shared vocabulary is
  // not a shared mechanic (print's Swarm trait contains a second movement
  // trait's words), and attack rows are exempt because they share their whole
  // frame (print's Werebear has Rend beside Handaxe).
  for (const [sec, rows] of Object.entries(m.sections ?? {})) {
    const isAttack = (t) => /Attack Roll:|Weapon Attack:/i.test(String(t ?? ''));
    const sig = (t) => String(t ?? '').toLowerCase().replace(/[^a-z ]+/g, ' ').split(/\s+/).filter((w) => w.length > 3).join(' ');
    const cand = (rows ?? []).filter((e) => e?.text && !isAttack(e.text)).map((e) => ({ e, s: sig(e.text) })).filter((x) => x.s.split(' ').length >= 4);
    for (const a of cand) {
      const host = cand.find((b) => b !== a.e && b.s.length > a.s.length && b.s.startsWith(a.s));
      if (host) { F('duplicate-mechanic', 'soft', `${sec}/${bare(a.e.name)}: every part of this row is already in "${bare(host.e.name)}" — two rows, one mechanic`, bare(a.e.name)); break; }
    }
  }
  for (const { sec, e } of allRows(m)) {
    for (const dm of String(e.text ?? '').matchAll(/(?<!escape )DC (\d+)(?! plus the damage taken)/g)) { // print's Zombie: "Constitution saving throw (DC 5 plus the damage taken)" is its own derivation
      const dc = Number(dm[1]); const diff = Math.min(...modsOf(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']).map((x) => Math.abs(8 + pb + x - dc)));
      if (diff === 1) F('dc-float', 'ok', `${sec}/${bare(e.name)}: DC ${dc} sits one off the derived DC (the chassis ±1 float)`, dc);
      else if (diff > 1) F('dc', 'fail', `${sec}/${bare(e.name)}: DC ${dc} is no stat's 8 + PB ${pb} + mod`, dc);
    }
    // A MASTERY SAVE IS THE WEAPON'S OWN DERIVATION (the critic's fifth read:
    // Othyn's Topple read DC 13 where 8 + STR 3 + PB 3 = 14). The general DC
    // rule accepts any stat's 8 + PB + mod, so a mental stat's DC passed it on a
    // weapon rider. A weapon rolls Strength or Dexterity, and so does its save.
    if (MASTERY_FEATURE.test(String(e.feature ?? '')) && /Attack Roll/.test(e.text ?? '')) {
      const want = ['STR', 'DEX'].map((k) => 8 + pb + (mods[k] ?? 0));
      for (const dm of String(e.text ?? '').matchAll(/Saving Throw\*?:?\*? DC (\d+)/g)) {
        const dc = Number(dm[1]);
        if (!want.includes(dc)) F('mastery-dc', 'fail', `${sec}/${bare(e.name)}: the ${e.feature} save is DC ${dc}; a weapon's save derives from Strength or Dexterity (${want.join(' or ')})`, dc);
      }
    }
    for (const em of String(e.text ?? '').matchAll(/escape DC (\d+)/g)) {
      const want = 8 + pb + (mods.STR ?? 0); const dcMax = Math.max(0, ...[...JSON.stringify(m.sections ?? {}).matchAll(/(?<!escape )DC (\d+)/g)].map((x) => Number(x[1]))); const okWeak = (mods.STR ?? 0) < 0 && Number(em[1]) === dcMax; // a weak-armed grappler keys its escape off the save DC (the critic's second species read)
      if (Number(em[1]) !== want && !okWeak) F('escape-dc', 'fail', `${sec}/${bare(e.name)}: escape DC ${em[1]}, derived ${want}`, Number(em[1]));
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
    if (declared.hp == null && avg !== Number(m.hp)) F('hp-formula', 'fail', `HP ${m.hp} but ${m.hp_formula} averages ${avg}`, m.hp);
    if (declared.hp == null && Number.isFinite(mods.CON) && b !== n * mods.CON) F('hp-con', 'fail', `${m.hp_formula}: the bonus is not ${n} × CON ${mods.CON} = ${n * mods.CON}`, b);
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
  const declaredB = m.generation?.declared ?? {};
  if (declaredB.ac != null || declaredB.hp != null) { F('user-set', 'ok', `user-set: ${[declaredB.ac != null ? `AC ${declaredB.ac}` : '', declaredB.hp != null ? `HP ${declaredB.hp}` : ''].filter(Boolean).join(', ')} · reads CR ${r.read}`, r.read); return; } // the user set the number; the band reports the read and stands down (Resolution 3)
  if (Object.keys(declaredB.rows ?? {}).length) F('user-set', 'ok', `user-set: ${Object.entries(declaredB.rows).map(([k, v]) => `${k} ${v}`).join(', ')}`, declaredB.rows);
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
    // PRINT'S OWN COMPOSITION IS NOT UNDER PRINT (twist-ten, 2026-10-19): the Vampire at CR 13 deals
    // ~45 a round by print's own Multiattack and sits under the CR 13 band — print overrules the
    // band for a print body at print's CR, so the finding is a note there, never a FAIL
    const printOwn = !!(ctx?.print && (ctx.print.exact || ctx.print.borrowOnly) && Number.isFinite(Number(ctx.print.cr)) && Math.abs(cr - Number(ctx.print.cr)) <= 1);
    const axisSev = r.read < cr - 1 && !printOwn ? 'fail' : 'soft'; const carried = `${r.read < cr - 1 ? `; reads CR ${r.read}` : `; the read holds at ${r.read}, within print's own ±1`}${printOwn ? ` — print's own ${ctx.print.name} at its CR, a note` : ''}`;
    if (c.dpr && r.dmg < c.dpr[0] * 0.95) F('under', axisSev, `damage ${r.dmg.toFixed(0)} a round sits under print at CR ${cr} (${c.dpr.map(Math.round).join('–')}, n=${c.n})${carried}`, r.dmg);
    else if (c.hp && r.effHp < c.hp[0] * 0.95) F('under', axisSev, `effective HP ${r.effHp}${r.effHp !== Number(m.hp) ? ` (${m.hp} with its resistances)` : ''} sits under print at CR ${cr} (${c.hp.join('–')}, n=${c.n})${carried}`, m.hp);
    else if (c.read && over < -1 && r.read < c.read[0]) F('under', 'fail', `reads CR ${r.read} by the DMG method, under print's own reads at ${cr} (${c.read.join('–')}, n=${c.n})`, r.read);
    else if (over < -1 || over > 1) F('band', 'soft', `reads CR ${r.read} (print at ${cr} reads ${c.read?.join('–')}, n=${c.n})`, r.read);
  }
  if (over > 3) F('hot', declaredB.immunities ? 'soft' : 'fail', `reads CR ${r.read}, more than three over${declaredB.immunities ? ' — the user\'s own immunity line drives the defensive read (user-set)' : ''}`, r.read);
  // the OFFENSIVE AXIS alone: print's adult dragons read +4 to +7 on offense at their own CR (Adult Brass +7), the corpus median is +2 — so over three is soft and over print's own ceiling is fail (the critic's mirror of the one-axis under rule, 2026-10-03)
  const offOver = crNum(r.off) - cr;
  if (offOver > 7) F('hot-offense', 'fail', `offense alone reads CR ${r.off}, ${offOver} over — past print's own ceiling (the Adult Brass Dragon at +7)`, r.off);
  else if (offOver > 3) F('hot-offense', 'soft', `offense alone reads CR ${r.off}, ${offOver} over; the HP axis pulls the read to ${r.read}`, r.off);
  else if (over > 1 && ctx.edition === '2014') F('hot', 'soft', `reads CR ${r.read} (hot, within three)`, r.read);
  for (const n of novasOf(m)) if (n.avg > NOVA_CAP(cr)) F('nova-cap', n.avg > NOVA_CAP(cr) * 1.15 ? 'fail' : 'soft', `${n.name}: ${n.avg} over the ${NOVA_CAP(cr)} cap`, n.avg);
  for (const a of attackRowsOf(m)) if (!a.e?.userSet && a.avg > aim.dpr * 0.9 && r.attacks > 1) F('per-attack-ceiling', 'fail', `${a.name}: ${a.avg} a hit is the whole budget (${aim.dpr})`, a.avg);
  if (r.used && r.attacks >= 1 && r.used.avg < aim.dpr / (r.attacks * 4)) F('per-attack-floor', 'soft', `${r.used.name}: ${r.used.avg} a hit is under a quarter share of ${aim.dpr} across ${r.attacks}`, r.used.avg);
  if (!legendary && cr >= 13 && cr <= 17 && Number(m.hp) <= Math.round(aim.hp * 0.8) + 2 && ctx.edition !== '2014') F('legendary-hp-trade', 'soft', `HP ${m.hp} looks like the legendary HP trade (${Math.round(aim.hp * 0.8)}) with no Legendary Actions section`, m.hp);
}
const KO = /\b(Paralyzed|Stunned|Unconscious|Petrified|Incapacitated)\b/i; // 2014 prose writes the condition lowercase
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
    if (combo && combo[1].split(/,|\bor\b/).map((x) => x.trim()).filter(Boolean).length < 2) F('multiattack-combination', 'fail', `"in any combination" with one row: "${multi.text}"`, multi.text); // Wearwretch, Bog Hound (critic's step-5 read)
  }
  // ONE MECHANIC, ONE ROW — AT PRINT'S OWN LINE (critic's section 5, 2026-10-20).
  // The critic found a sheet that buries four ways ("Scree restrains, Quarry Bury
  // restrains, Entomb engulfs, Quarry Entombment swallows"). The existing
  // duplicate-entry lint compares TEXT, so it only catches two rows worded
  // identically; and the engine-family vocabulary is deliberately narrow, so it
  // reported NO family for all four of the Coil Sump Wyrm's grabs.
  //
  // What each row IMPOSES is the right key, and print sets both thresholds:
  //   2 rows on one condition — print 10 of 329 (3.0%), deliberate: the Kraken's
  //     Tentacle and Swallow both Restrain, the Gorgon's Gore and Trample both
  //     knock Prone. A grab and its payoff. Soft; our own rate is 15.9%, five
  //     times print's, which is a quality signal rather than a per-sheet defect.
  //   3+ rows on one condition — print 0 of 329. Never. A hard floor.
  {
    const tally = {};
    for (const { e } of allRows(m)) for (const c of imposedConditions(e)) { if (AFFLICTIONS.includes(c)) (tally[c] = tally[c] ?? []).push(bare(e.name)); }
    for (const [cond, names] of Object.entries(tally)) {
      if (names.length >= 3) F('duplicate-mechanic', 'fail', `${names.length} rows impose ${cond} — ${names.join(', ')}; print has no block with three (0 of 329)`, cond);
      // NO SOFT AT TWO. Print allows it (3% of blocks, a grab and its payoff),
      // and we do it on 13.5% — four times print's rate. That is a real quality
      // signal, but it is a RUN-level one: as a per-block soft it fired on 1 in 7
      // sheets, which would train a reader to skip this gate's findings
      // altogether and bury the 3+ FAIL that actually matters. Measure the
      // two-rate when we want it; do not spend the gate table on it.
    }
  }
  // THE ATTACK FLOOR BY CR. Print's 329: a Multiattack appears on 40 of 42
  // blocks at CR 5-7, 24 of 24 at 8-10, 21 of 22 at 11-15, and every block
  // above — 110 of 113 at CR 5 and up. One attack and no Multiattack is a
  // CR 0-2 shape (91 of 106 below CR 1). Soft, not fail: print's three
  // exceptions (Gorgon, Wraith, Remorhaz) are real. (Critic, the forty:
  // "Squallwing Drake one Claw at CR 7, Ozghar with no Multiattack".)
  const crHere = Number(ctx?.cr ?? m.cr ?? crNum(m.cr_str ?? '0'));
  // A SWARM IS EXEMPT: swarm-multiattack hard-fails a swarm that HAS one (all
  // seven print swarms make exactly one attack), so the two rules would leave
  // a swarm no legal shape.
  if (crHere >= 5 && !/\bSwarm\b/i.test(m.type ?? '') && !/\bSwarm of\b/i.test(m.size ?? '')) {
    // ONE attack row cited N times is print's OWN idiom, not a defect: 70 of
    // print's 110 CR 5+ Multiattacks (64%) name a single row ("makes three
    // Rend attacks"). Only the MISSING Multiattack is the floor.
    if (!multi) F('attack-floor', 'soft', `CR ${crHere} with no Multiattack (print: 110 of 113 blocks at CR 5+ carry one)`, String(crHere));
  }
  // ONE RECHARGE NOVA PER SHEET — unless BOTH are print's own. Re-measured
  // 2026-10-22 under this gate's OWN predicate (novasOf counts "(N/Day)", not
  // only "(Recharge N)"): 1 of 329 print blocks carries two, the Vrock's
  // Spores (Recharge 6) beside Stunning Screech (1/Day). The earlier "0 of 329"
  // was measured with a narrower pattern than the gate uses.
  //
  // So the Vrock is an exception to pattern FROM, not an exception to ship: a
  // tweak off the Vrock keeps the pair print gave it, and an engine-written
  // second nova is still a defect (owner's ruling, 2026-10-22). The gate
  // therefore fires only when at least one of the pair is NOT print's.
  const novaRows = novasOf(m).filter((n) => n.sec === 'Actions');
  const inventedNovas = novaRows.filter((n) => !n.e?.print);
  if (novaRows.length > 1 && inventedNovas.length) F('two-novas', 'fail', `two Recharge novas on one sheet: ${novaRows.map((n) => `"${n.name}"`).join(' and ')}${novaRows.length > inventedNovas.length ? ` — ${inventedNovas.map((n) => `"${n.name}"`).join(' and ')} ${inventedNovas.length > 1 ? 'are' : 'is'} not print's` : ''}`, novaRows.length);
  for (const { sec, e } of allRows(m)) {
    if (!e.print && /\d+ \(\d+d\d+/.test(e.text ?? '') === false && /\bdamage\b/.test(e.text ?? '') && /\d+ (?:Bludgeoning|Piercing|Slashing|Fire|Cold|Lightning|Thunder|Acid|Poison|Necrotic|Radiant|Psychic|Force) damage/.test(e.text ?? '')) F('diceless-damage', 'fail', `${sec}/${bare(e.name)}: a damage number with no dice`, bare(e.name));
    {
      const dangling = danglingRefIn(e.text, names, e.name ?? '');
      if (dangling) F('dangling-ref', 'fail', `${sec}/${bare(e.name)} references "${dangling}", which is not a row`, dangling);
    }
    // (the "makes one X attack" scan moved into danglingRefIn, called just above)
    const payoff = /(?:that|who) has the (\w+) condition/.exec(e.text ?? '');
    if (payoff) { const producer = allRows(m).some(({ e: o }) => o !== e && new RegExp(`has the ${payoff[1]} condition`).test(o.text ?? '')); if (!producer) F('payoff-producer', 'soft', `${sec}/${bare(e.name)} pays off the ${payoff[1]} condition but nothing on the sheet imposes it`, payoff[1]); }
    const eng = /(?:swallows|engulfs) one (Tiny|Small|Medium|Large|Huge|Gargantuan) or smaller creature/.exec(e.text ?? '');
    if (eng && SIZES.indexOf(eng[1]) > SIZES.indexOf(m.size)) F('engulf-size', 'fail', `${sec}/${bare(e.name)} engulfs ${eng[1]} on a ${m.size} body (print: the Gelatinous Cube takes its own size or smaller)`, eng[1]);
    if (/\bMelee or Melee or\b|\bRanged or Ranged\b/.test(e.text ?? '') || (ctx.legacyDoubled ?? []).includes(bare(e.name))) F('punctuation', 'fail', `${sec}/${bare(e.name)}: a doubled attack label${(ctx.legacyDoubled ?? []).includes(bare(e.name)) ? ' on the 2014 sheet' : ''}`, bare(e.name)); // "Melee or Melee or Ranged Spell Attack" on five 2014 sheets (critic's regressions brief 2026-10-04)
    if (/half as much damage|Half damage/i.test(e.text ?? '') && !/\d+ \(\d+d\d+/.test(e.text ?? '') && !/take only half damage|instead takes no damage/i.test(e.text ?? '')) F('half-no-referent', 'fail', `${sec}/${bare(e.name)}: "half as much damage" with no damage on the row`, bare(e.name));
    if (sec === 'Legendary Actions' && !/^Legendary Action Uses/.test(e.name ?? '') && /^(?:The \w+|It) can['’]t (?:take|use) this action again[^.]*\.?$/i.test(String(e.text ?? '').trim())) F('legendary-no-effect', 'fail', `${sec}/${bare(e.name)}: a legendary action with no effect, only its recharge clause`, bare(e.name));
    if (/\. ,|,\s*,|\.\.(?!\.)|\s,|(?<!ft)\.\s+(?:and|plus)\b/.test(e.text ?? '')) F('punctuation', 'fail', `${sec}/${bare(e.name)}: a ". ,", ", ," or ". and" sequence in the text`, bare(e.name)); // ". and the target has the Paralyzed condition" on the lich's touch (critic's blockers audit 2026-10-03)
    const reach = /reach (\d+) ft\./.exec(e.text ?? '');
    // a REACH WEAPON is its own tether (the weapon table: halberd, glaive, pike, lance, whip all
    // reach 10) — the Legion Halberdier's halberd was flagged for a word the list did not carry
    const reachWeapon = (() => { const w = weaponFor(bare(e.name)) ?? e.weapon ?? null; return !!(w && Number(WEAPONS[w]?.reach ?? 0) >= 10); })();
    if (reach && Number(reach[1]) > (SIZE_REACH[m.size] ?? 5) && !reachWeapon && !TETHER.test(`${e.name} ${e.text}`)) F('reach', Number(reach[1]) > (SIZE_REACH[m.size] ?? 5) + 10 ? 'fail' : 'soft', `${sec}/${bare(e.name)}: reach ${reach[1]} on a ${m.size} body with no tether word`, Number(reach[1]));
  }
  if (/\bSwarm\b/i.test(m.type ?? '') || /\bSwarm of\b/i.test(m.size ?? '')) {
    const large = /\b(?:large|huge|vast|massive|enormous|great)\b/i.test(readPhrases(ctx.userConcept ?? ''));
    if (!/Medium/i.test(m.size ?? '') && !large) F('swarm-size', 'fail', `a swarm sized ${m.size} (print: Medium, Bats alone Large)`, m.size);
    // a hard fail now the engine strips it (critic: "should be structural, not
    // soft"); print's seven swarms all make exactly one attack
    if (multi) F('swarm-multiattack', 'fail', 'a swarm with a Multiattack (all seven print swarms make one attack)', multi.text);
  }
}
// A CONDITION NAMED AS A PREREQUISITE IS NOT AN IMPOSED EFFECT — a
// condition-payoff row exploits Prone, it does not cause it. save-fit has read
// effects through this strip since it was written; ko-ungated read the raw text
// and so counted an exploited Stunned as a Stunned it hands out at will (the
// Mire Sifu, critic's hold 7, 2026-10-16). One stripper, both readers.
const CONDITIONS = 'Blinded|Charmed|Deafened|Frightened|Grappled|Incapacitated|Invisible|Paralyzed|Petrified|Poisoned|Prone|Restrained|Stunned|Unconscious';
export const effectOnly = (t) => String(t ?? '')
  .replace(/that (?:has|have|is|are) the \w+ condition/gi, '')
  // `\\b` here, not `\\\\b`: in a template literal the latter collapses to a LITERAL
  // backslash followed by "b", so this alternative matched nothing from the day it
  // was written. "one creature within 30 feet that is Frightened of the X" kept its
  // condition word, and save-fit then demanded a Wisdom save for what is a damage
  // row targeting the already-frightened (the exploiter shape) — 2 of 5 FAILs on
  // the 2026-10-21 forty were this.
  .replace(new RegExp(`that (?:is|are) (?:the )?(?:${CONDITIONS})\\b`, 'gi'), '')
  .replace(new RegExp(`(?:if|while|when|provided) (?:it|they|the target|the creature)(?: is| are| has| have)?(?: the)? (?:${CONDITIONS})(?: condition)?`, 'gi'), '')
  .replace(/already \w+/gi, '');

// THE CLASS-NPC GATES (Five Pipelines brief, pipeline 3, 2026-10-19): read from the block's own
// path record — the kit lands, the class's stats carry it, the species header is right.
import { classStats as classStatsOf, CLASSES as CLASSES_KITS } from './classes.mjs';
import { SPECIES as SPECIES_KITS } from './species.mjs';
function gateClass(raw, m, ctx, F) {
  const pipe = (raw?.generation ?? m?.generation ?? raw?.other_edition?.generation)?.pipeline ?? null;
  if (!pipe || pipe.path !== 'class_npc') return;
  if (pipe.class) {
    // print's OWN rows are the kit when the body is the class's own block: the Priest's Divine Aid and
    // Spellcasting are the cleric kit (Brother Halric, forty 2026-10-19 — the kit pass ran before print's
    // rows landed and could attach to nothing). The kit table's SRD lifts name them.
    const kitSrd = new Set((CLASSES_KITS.find((k) => k.key === pipe.class)?.rows ?? []).filter((r) => r.srd).map((r) => String(r.srd[1]).toLowerCase()));
    const kitRows = allRows(m).filter(({ e }) => e.kit === pipe.class || (e.print && kitSrd.has(String(e.name ?? '').replace(/ \(.*\)$/, '').toLowerCase())));
    // a kit whose rows are all magic cannot land on a sheet the GM stripped of magic — "a templar priest with a
    // mace and no magic at all" (classes-eight 2026-10-19): the lack is honoured, the gate notes it
    const clausesK = (raw?.generation ?? m?.generation ?? raw?.other_edition?.generation)?.clauses ?? [];
    const magicTaken = clausesK.some((cl) => cl.polarity === 'lacks' && cl.takes === 'spellcasting');
    const csK = classStatsOf(pipe.class);
    if (!kitRows.length) F('kit-lands', magicTaken && csK?.casting ? 'soft' : 'fail', `the ${pipe.class} kit landed no row on a class-NPC sheet${magicTaken && csK?.casting ? ' — its rows are magic and the GM took magic away' : ''}`, pipe.class);
    const cs = classStatsOf(pipe.class);
    if (cs && m.stats) {
      const best = (cs.primary ?? []).reduce((a, k) => Math.max(a, Number(m.stats[k] ?? 0)), 0);
      if ((cs.primary ?? []).length && best < 14) F('class-stat', 'fail', `a ${pipe.class} with ${cs.primary.map((k) => `${k} ${m.stats[k]}`).join('/')} — the PHB's primary stat sits under 14`, best);
      if (cs.casting && Number(m.stats[cs.casting] ?? 0) < 14) F('class-stat', 'fail', `a ${pipe.class} with ${cs.casting} ${m.stats[cs.casting]} — it casts off that stat`, m.stats[cs.casting]);
    }
  }
  if (pipe.species) {
    const sp = SPECIES_KITS.find((x) => x.key === pipe.species);
    if (sp?.languages?.length && !new RegExp(`\\b${sp.languages[sp.languages.length - 1]}\\b`, 'i').test(String(m.languages ?? ''))) F('species-header', 'fail', `a ${sp.key} without ${sp.languages[sp.languages.length - 1]} in its languages ("${m.languages ?? ''}")`, m.languages);
    if (sp?.type && !new RegExp(`^${sp.type}`, 'i').test(String(m.type ?? ''))) F('species-header', 'fail', `a ${sp.key} typed ${m.type} (the kit says ${sp.type})`, m.type);
  }
}

function gateGates(m, ctx, F) {
  for (const { sec, e } of allRows(m)) {
    if (sec === 'Legendary Actions' || e.print) continue;
    const gated = !!gateOf(e); // one definition (templates.mjs): the field first, the name as fallback
    const koText = effectOnly(e.text ?? ''); // a condition this row EXPLOITS is not one it imposes (hold 7)
    const ko = KO.exec(koText);
    // a KO is IMPOSED when a target or each creature gets it on a failure — "It can't use this trait if it has the Incapacitated condition" is a guard on itself (Evasion, goldens 2026-10-02)
    if (ko && !gated && /(?:Failure:\*?|the target|each creature|one creature)[^.]*\b(?:has the (?:Paralyzed|Stunned|Unconscious|Petrified|Incapacitated) condition|(?<!\bthat |\bwho |\bwhich )is (?:paralyzed|stunned|unconscious|petrified|incapacitated))\b/i.test(koText)) { // "the target is stunned" imposes; "one creature that is Stunned" exploits (the 74-run A/B caught eight exploiters, 2026-10-18) // both editions' idiom (Ilyn's "is stunned until the end of its next turn" at will in a Multiattack read soft — critic A8, 2026-10-18) // "provided it doesn't have the Incapacitated condition" is a guard, not a KO (Evasion)
      // A KO RIDER THE MULTIATTACK REPEATS IS UNGATED (critic A8, 2026-10-18): Ilyn's Pressure
      // Point Strike stunned "until the end of its next turn" — the Ghoul's one-turn cap — but
      // in a Multiattack of two it lands twice a round with no save, so the cap caps nothing.
      const maText = String((m.sections?.Actions ?? []).find((o) => /^Multiattack/.test(o.name ?? ''))?.text ?? '');
      const bareK = bare(e.name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const repeatedByMulti = /Attack Roll/.test(e.text ?? '') && !/saving throw/i.test(e.text ?? '') && new RegExp(`\\b${bareK}\\b`, 'i').test(maText) && !/makes one\b/i.test(maText); // a save-gated stun repeated is the Ghoul's shape with a save; the no-save one is the defect
      const multi = /each creature/i.test(koText) || repeatedByMulti; const repeat = /repeat(?:s|ing)? the sav|at the end of each of its turns|until the (?:end|start) of (?:its|the \w+'s|[A-Z][\w' -]+'s) next turn/i.test(e.text);
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
// MEASURED, 2026-10-15 (bodies run flagged an Ooze for missing Poison immunity
// that print's own oozes do not have): Undead 17/19 Poison-immune, Construct
// 9/10, Elemental 12/17 — but Ooze 0/4. Print's oozes are immune to Acid
// (2/4) and to conditions, never to Poison, and generate.mjs's own body table
// already had it right. The gate was asking for a thing print never prints.
const TYPE_IMMUNITY = { Undead: ['Poison'], Construct: ['Poison'], Elemental: ['Poison'] };
function gateHeaderBody(m, ctx, F) {
  const texts = allRows(m).map(({ e }) => `${e.name}. ${e.text}`).join('\n');
  if (/earth glide|move through nonmagical, unworked earth/i.test(texts) && !/Burrow/i.test(m.speed ?? '')) F('earth-glide-burrow', 'fail', 'Earth Glide with no Burrow speed', m.speed);
  const printSpiderClimb = allRows(m).some(({ e }) => e.print && /spider climb|climb difficult surfaces, including along ceilings/i.test(`${e.name}. ${e.text}`)); // print's own Vampire Spawn carries Spider Climb at 30 ft. with no Climb line — print overrules the predicate (canaries 2026-10-12)
  // the TRAIT, not the spell: a Spellcasting menu listing Spider Climb grants no climb (five pumpkin kings, 2026-10-19)
  const spiderTrait = allRows(m).some(({ e }) => /^Spider Climb\b/i.test(e.name ?? '') || (/climb difficult surfaces, including along ceilings/i.test(e.text ?? '') && !/^Spellcasting/i.test(e.name ?? '')));
  if (!printSpiderClimb && spiderTrait && !/Climb/i.test(m.speed ?? '')) F('spider-climb-climb', 'fail', 'Spider Climb with no Climb speed', m.speed);
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
    // THE GATE READS THE MARK AND THE PROSE (critic A9, 2026-10-18). A conversion call
    // that failed ships the deterministic shape with 2024 phrasing; the mark says so.
    // the mark rides on the 2014 shape (`raw`); the 2024 model it was read into may not carry it
    if ((m.generation ?? raw.generation)?.conversion === 'failed') F('conversion-failed', 'fail', 'the 2014 conversion call failed — the sheet ships 2024 phrasing in 2014 furniture', 'failed');
    // and the vocabulary it leaked: reaction grammar, Advantage (2014 writes it lowercase), the spell-list labels, the condition idiom
    for (const w of ['Trigger:', 'Response:', 'Advantage', 'Disadvantage', 'At Will:', '/Day Each']) if (texts.includes(w)) F('vocab-2024-in-2014', 'fail', `2024 "${w}" in a 2014 block`, w);
    if (/\bhas the [A-Z]\w+ condition\b/.test(texts)) F('vocab-2024-in-2014', 'fail', '2024 "has the X condition" in a 2014 block (2014: "is stunned", "is prone")', 'condition');
    for (const w of ['Attack Roll:', 'Saving Throw*:', '*Failure:*', 'Failure:', 'Bloodied', 'Emanation', 'Hit or Miss', 'Success: Half']) if (texts.includes(w)) F('vocab-2024-in-2014', 'fail', `2024 "wording in a 2014 block: "${w}"`, w);
    // a 2024 row with a half-damage success whose 2014 row lost the clause (the dragon's Noxious Miasma, check-in 2026-10-11)
    const legacyByName = new Map([...(raw.abilities ?? []), ...(raw.actions ?? []), ...(raw.reactions ?? []), ...(raw.legendary_actions ?? []), ...(raw.bonus_actions ?? [])].map((e) => [bare(e.name).toLowerCase(), String(e.description ?? e.text ?? '')]));
    for (const { sec, e } of allRows(m)) { if (!/\*Success:\*\s*Half damage/i.test(e.text ?? '')) continue; const l = legacyByName.get(bare(e.name).toLowerCase()); if (l != null && !/half (?:as much )?damage/i.test(l)) F('conversion-dropped-half', 'fail', `${sec}/${bare(e.name)}: the 2024 row halves on a success; the 2014 sheet dropped the clause`, bare(e.name)); }
    // THE PRINT EXEMPTION OUTLIVES THE TEXT IT WAS GRANTED FOR (critic's
    // package-six review, 2026-10-22). The adjudicability loop opens with
    // `|| e.print) continue` — justified, because print's own text is print's.
    // But the 2014 conversion REWRITES a print row and the row keeps its print
    // stamp, so a converted print row carries text print never wrote and is
    // exempt from every adjudicability gate. Ossuar's Paralyzing Touch shipped
    // "or be paralyzed" with no bound at all and the block read CLEAN, while
    // print's own 2024 row ends "until the start of the lich's next turn".
    //
    // This is the printing-equivalence test the package-five brief asked for,
    // and it belongs here beside conversion-dropped-half, which already makes
    // exactly this 2024-vs-2014 comparison. Measured over the 19 2014 sheets of
    // sweep-2026-10-21T22-17-49: 1 fire, 0 false positives, and the one fire is
    // the Bone Sun Lich's Paralyzing Touch.
    for (const { sec, e } of allRows(m)) {
      const l = legacyByName.get(bare(e.name).toLowerCase());
      if (l == null) continue;
      const impo = imposedCondition({ name: e.name, text: l }); // the reader is tuned to 2014 phrasing ("or be paralyzed"); the 2024 wording reads null
      if (!impo || !MUST_BE_BOUNDED.includes(impo)) continue;
      if (CONDITION_BOUNDED.test(l) || !CONDITION_BOUNDED.test(String(e.text ?? ''))) continue;
      F('conversion-dropped-duration', 'fail', `${sec}/${bare(e.name)}: the 2024 row bounds ${impo}; the 2014 sheet dropped the duration and imposes it indefinitely`, bare(e.name));
    }
    const acm = /^(\d+) \(([^)]+)\)/.exec(String(raw.armor_class ?? ''));
    if (acm && !/natural|mage armor|unarmored/i.test(acm[2])) {
      const parts = acm[2].toLowerCase().split(/,\s*/); const base = ARMOR[parts[0]]; const dexMod = modOf(m.stats?.DEX ?? 10);
      if (base && (m.generation?.declared?.ac == null)) { const want = base[0] + (base[1] === 'dex' ? dexMod : base[1] === 'dex2' ? Math.min(2, dexMod) : 0) + (parts.includes('shield') ? 2 : 0); if (want !== Number(acm[1])) F('armor-parenthetical', 'fail', `AC ${acm[1]} (${acm[2]}) — ${parts[0]} with DEX ${dexMod} gives ${want}`, acm[0]); }
    }
  } else {
    for (const w of ['Weapon Attack:', 'to hit', 'must succeed on a DC', 'knocked prone', 'half as much damage']) if (texts.replace(/to hit with spell attacks/g, '').replace(/must succeed on a DC \d+ Constitution saving throw at the end of that turn/g, '') /* print's own 2024 Swallow idiom (the Kraken) */ .includes(w)) F('vocab-2014-in-2024', 'fail', `2014 wording in a 2024 block: "${w}"`, w);
  }
}
const RAYS_2014 = ['Charm Ray', 'Paralyzing Ray', 'Fear Ray', 'Slowing Ray', 'Enervation Ray', 'Telekinetic Ray', 'Sleep Ray', 'Petrification Ray', 'Disintegration Ray', 'Death Ray'];
function gateDonor(raw, m, ctx, F) {
  const hits = piGuard(JSON.parse(JSON.stringify(m)));
  if (hits.length) F('pi-denylist', 'fail', `Product Identity on the sheet: ${hits.join(', ')}`, hits.join(', '));
  const text = JSON.stringify(m.sections ?? {});
  const rays = RAYS_2014.filter((r) => text.includes(r)); if (rays.length >= 3) F('ray-overlap', 'fail', `${rays.length} of the 2014 beholder's rays by name: ${rays.join(', ')}`, rays.length);
  const pc = ctx.print ?? null; // checkBlock resolves the print pick once, with the species guard; a second lookup here read the kenku as the Mimic (species landing 2026-10-13)
  if (!pc || !(pc.exact || pc.borrowOnly)) return;
  const donor = DONORS.find((d) => d.id === ctx.donorId) ?? null;
  const printNames = new Set([...(pc.meleeRows ?? []), ...(pc.rangedRows ?? []), ...(pc.rulesRows ?? [])].map((r) => bare(r.name)).concat((pc.traits ?? []).map((t) => bare(t.name ?? t))));
  const donorNames = new Set((donor ? Object.values(donor.sections ?? {}).flat() : []).map((e) => bare(e.name)));
  const stray = []; const printHasLegendary = (pc.rulesRows ?? []).some((r) => r.section === 'Legendary Actions');
  for (const { sec, e } of allRows(m)) {
    const n = bare(e.name);
    let why = null;
    if (/^(Multiattack|Spellcasting|Legendary Resistance)$/.test(n) || printNames.has(n)) continue;
    else if (e.part || e.feature || e.kit) why = 'the user\'s own part, feature or species';
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
    // THE CLASS FLOOR IS NOT A DEVIATION (pipeline 3): on a class-NPC block a primary or casting stat raised
    // to exactly 14 from print's lower value is the PHB's floor for a trained person, not a drifted array
    const pipeA = (raw?.generation ?? m?.generation ?? raw?.other_edition?.generation)?.pipeline ?? null;
    const csA = pipeA?.path === 'class_npc' && pipeA.class ? classStatsOf(pipeA.class) : null;
    const classFloored = (k, v) => !!csA && ([...(csA.primary ?? []), csA.casting].filter(Boolean).includes(k)) && Number(m.stats?.[k]) === 14 && Number(v) < 14;
    if (pc.stats && Object.entries(pc.stats).some(([k, v]) => Number(m.stats?.[k]) !== Number(v) && !classFloored(k, v))) F('print-array', 'fail', `array is not the ${pc.name}'s at its own CR`, JSON.stringify(m.stats));
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
// THE ADJUDICABILITY GATE (fidelity pipeline step 3): every mechanical row resolves by an attack roll, a saving throw,
// or a stated trigger-and-effect; damage is always dice (the structure gate's diceless-damage); a save's targets are a
// count or an area; a save always has an outcome. A passive rule statement ("can breathe air and water") resolves by
// itself. The row's `flavor` field is exempt — no parser reads it. Calibrated so everything shipping passes.
function gateAdjudicability(m, ctx, F) {
  for (const { sec, e } of allRows(m)) {
    if (/^(?:Multiattack|Legendary Action Uses|Spellcasting)\b/.test(e.name ?? '') || e.print) continue;
    const t = String(e.text ?? ''); const how = resolutionOf(t);
    const dealsOrTargets = /\d+ \(\d+d\d+/.test(t) || /\bhas the [A-Z]\w+ condition\b|\bis (?:knocked|pushed|pulled|grappled|restrained|frightened|charmed|paralyzed|stunned|blinded|poisoned|prone)\b/i.test(t);
    // an ACTION resolves by being taken; a TRAIT or REACTION that deals damage or imposes a condition needs a stated trigger or a save
    // a row that APPLIES Grappled states the escape DC (print: 0 of 2 corpora without it; "that has the Grappled condition" and "While Grappled" are prerequisites, not applications)
    if (/(?<!\b(?:that|which|who|already|while|if the target|if it|unless it|while the target|target that|creature that)\s)has the Grappled condition(?!\s*\(escape DC)/.test(t) || /\bis grappled\b(?!\s*\(escape DC)(?!\s+by\b)/i.test(t)) F('grapple-no-escape', 'fail', `${sec}/${bare(e.name)}: applies the Grappled condition with no escape DC`, bare(e.name));
    if (sec === 'Traits' && !/\d|\{dc\}|\{dmg\}|\b(?:Advantage|Disadvantage|Resistan\w*|Immun\w*|Vulnerab\w*|condition|saving throw|attack roll|Hit Points?|Temporary|Speed|reach|range|can't|cannot|can |ignores?|regains?|moves?|takes? (?:no|half|extra|double|additional)|deals? (?:extra|double|additional)|Blinded|Charmed|Deafened|Frightened|Grappled|Paralyzed|Poisoned|Prone|Restrained|Stunned|Incapacitated|Invisible|Difficult Terrain|breathe|climb|swim|fly|burrow|speak|understand|see|hear|sense|detect|doesn't|does not|isn't|is not|must|dies|die|succeeds|automatically|unless|only|indistinguishable|motionless|while|when|whenever|if|rather than|counts as|determined|damage types?)\b/i.test(t)) F('adjudicable-mechanic', 'fail', `${sec}/${bare(e.name)}: a trait with no rule in it — flavor on a rules row`, bare(e.name)); // the archlich's "Bound Dead of the Kingdom" (check-in 2026-10-11)
    // A CONDITION THAT DOES NOT SELF-END STATES WHEN IT ENDS (critic, 2026-10-21:
    // Ossuar's Paralyzing Touch read "or be paralyzed" with no bound at all, and
    // indefinite paralysis passed this gate). Measured over print's 171 rows that
    // impose an affliction, the split is not uniform and the rule is NOT "every
    // condition states a duration" — that would fail print 58 times:
    //   Prone        50 bare / 1 bounded  — it self-ends; you stand up. EXEMPT.
    //   Grappled      0 bare / 38 bounded — always an escape DC (gated above).
    //   Paralyzed/Stunned/Blinded/Charmed/Deafened  0 bare — ALWAYS bounded.
    //   Incapacitated/Poisoned/Restrained/Frightened  mostly bounded.
    // So: the five that print always bounds must be bounded here too.
    {
      const impo = imposedCondition(e);
      // The bound pattern and the condition list are MODULE constants (above),
      // shared with the conversion-equivalence check in gateEdition — a second
      // copy of either is how a gate and its sibling drift apart.
      if (impo && MUST_BE_BOUNDED.includes(impo) && !CONDITION_BOUNDED.test(t)) {
        F('condition-duration', 'fail', `${sec}/${bare(e.name)}: imposes ${impo} and never says when it ends — print bounds every ${impo} it hands out (0 of ${impo === 'Paralyzed' ? 5 : 'its'} rows bare)`, impo);
      }
    }
    if (/^(?:Traits|Reactions)$/.test(sec) && how === 'passive' && dealsOrTargets) F('adjudicable-resolution', 'fail', `${sec}/${bare(e.name)}: deals damage or imposes a condition but states no trigger, attack roll, or save`, bare(e.name));
    if (how === 'save') {
      const head = /(?:Saving Throw\*?:\*?\s*DC \d+,\s*([^.*]+?)\.)|((?:[^.]*?)\bmust (?:make|succeed on) a DC \d+ \w+ saving throw)/.exec(t);
      const targetText = head ? (head[1] ?? head[2]) : t;
      if (!TARGET_CLAUSE.test(targetText) && !/\bthis (?:aura|emanation|area)\b|starts its turn|enters the (?:aura|area|emanation)|whose space it enters|can see (?:it|the)/i.test(t)) F('adjudicable-target', 'fail', `${sec}/${bare(e.name)}: a save whose targets are neither a count nor an area`, bare(e.name));
      if (!SAVE_OUTCOME.test(t)) F('adjudicable-outcome', 'fail', `${sec}/${bare(e.name)}: a save with no stated outcome`, bare(e.name));
    }
  }
}
// COVERAGE AND CONCEPT SHARE (fidelity pipeline step 4): string-work against the extraction's clause list, never a model
// call. Coverage: of the header and mechanical clauses the user typed, the share whose words appear on the sheet.
// Concept share: of the rows (Multiattack and the legendary-uses line aside), the share that trace to the user's words
// — a clause word in the name or text, or a print row when the user named the print creature.
const STOP = new Set(['a', 'an', 'the', 'of', 'and', 'or', 'with', 'for', 'that', 'who', 'its', 'it', 'is', 'has', 'to', 'in', 'on', 'at', 'by', 'from', 'into', 'as', 'be', 'can', 'very', 'her', 'his', 'she', 'he', 'they', 'them', 'their', 'him', 'you', 'your', 'whom', 'whose', 'this', 'these', 'those', 'any', 'all', 'every', 'each', 'some', 'when', 'while', 'if', 'then', 'but', 'not', 'no', 'are', 'was', 'were', 'does', 'did', 'will', 'would', 'just', 'also', 'only', /* a pronoun shared by two clauses is not provenance (the hag's crows, step 8) */ 'large', 'huge', 'medium', 'small', 'tiny', 'feet', 'ft', 'movement', 'speed', 'attack', 'attacks', 'damage', 'creature', 'monster', 'one', 'two', 'three']);
const stem = (w) => w.toLowerCase().replace(/[^a-z]/g, '').replace(/ies$/, 'y').replace(/(?<=s|x|z|ch|sh)es$/, '').replace(/(?:ing|ed|s)$/, ''); // "bites" → "bite", not "bit" (the Fenmaw's Bite row traced to nothing, step 6 baseline)
const words = (t) => [...new Set(String(t ?? '').split(/[^A-Za-z]+/).map(stem).filter((w) => w.length > 2 && !STOP.has(w)))];
const SIZE_WORDS = /\b(Tiny|Small|Medium|Large|Huge|Gargantuan)\b/i;
const SIZE_HEADER = /\b(?:Tiny|Small|Medium|Large|Huge|Gargantuan)\b(?!\s+(?:teeth|tooth|claws?|jaws?|fangs?|horns?|wings?|tail|eyes?|hands?|arms?|fists?|sword|axe|shield|hammer|mouth|maw))/i; // "large teeth" is a body part, not the size
export const NEG_CUE = /\b(?:cannot|can't|can not|never|no longer|without|doesn't|does not|don't|do not|unable to|isn't|is not|not|lacks?|has no|have no|no(?! one\b))\b/i;

const DMG_TYPE_WORD = /\b(fire|cold|lightning|thunder|acid|poison|necrotic|radiant|psychic|force|bludgeoning|piercing|slashing)\b/i;
const COND_WORD = /\b(charmed|frightened|poisoned|paralyzed|stunned|blinded|deafened|grappled|restrained|prone|exhaustion|petrified|incapacitated)\b/i;
export const VULN_CUE = /\b(?:vulnerab\w*|weak(?:ness)? (?:to|against)|takes (?:extra|double|more|additional) damage|hurt (?:badly )?by)\b/i;
export const IMM_CUE = /\b(?:immune|immunity|immunities|can't be|cannot be|unaffected by|impervious to)\b/i;
export const RES_CUE = /\b(?:resists?|resistant|resistance|shrugs off)\b/i;
export const SPEECH_CUE = /\b(?:speaks?|spoke|languages?|talks?)\b/i;
const SPEECH_STOP = new Set(['speak', 'spoke', 'language', 'talk', 'only', 'understand']);
export function fidelityOf(m, raw, ctx) {
  const printNamed = !!ctx?.print && (ctx.print.exact || ctx.print.borrowOnly);
  const recorded = raw?.generation?.clauses ?? m?.generation?.clauses ?? [];
  // THE READER'S DENOMINATOR (critic's step-5 read: 38 automated against 61 by hand): every phrase counts except the identity
  // phrase (the creature itself); a record without head marks (blocks saved before step 6) keeps the step-4 rule. A prompt that
  // is ONLY a creature ("knife ball", "a bog witch", "Pikachu") has the creature as its one clause
  const marked = recorded.some((c) => c.head);
  const listed = marked ? (recorded.some((c) => !c.head) ? recorded.filter((c) => !c.head) : recorded) : (recorded.some((c) => c.kind !== 'descriptive') ? recorded.filter((c) => c.kind !== 'descriptive') : recorded);
  const clauses = printNamed && !listed.length ? [{ text: ctx.print.name, kind: 'header', _print: true }] : listed; // a bare print name is one clause: the print body itself
  const rows = allRows(m).filter(({ e }) => !/^(?:Multiattack|Legendary Action Uses)\b/.test(e.name ?? ''));
  const sheet = `${m.name} ${m.size} ${m.type} ${m.speed} ${m.languages} ${m.immunities ?? ''} ${m.resistances ?? ''} ${m.vulnerabilities ?? ''} ${rows.map(({ e }) => `${e.name} ${e.text} ${e.flavor ?? ''}`).join(' ')}`;
  const sheetWords = new Set(words(sheet));
  const present = (c) => {
    const crAsk = /\bcr\s*(\d+(?:\/\d+)?|\d*\.\d+)\b/i.exec(c.text ?? ''); if (crAsk && !/\b(?:damage|feet|ft)\b/i.test(c.text ?? '')) return Number.isFinite(Number(ctx?.cr)) && crNum(crAsk[1]) === Number(ctx.cr); // "cr 5" is a header directive the sheet honors or not — two letters and a digit, nothing a row could carry (the big ogre read 1/2, canaries 2026-10-12)
    if (c._print) return true;
    // a LACKS clause ("cannot cast any spells") is covered only when the lacked thing is absent — the Staffbound Caster scored 2/2 with the Mage's full spell list (critic's step-5 read)
    // A KEYED LACK IS JUDGED BY ITS MECHANIC (2026-10-18). The engine's lacks call names
    // what the clause takes ({quote, takes}); the sheet is then checked for THAT, not for
    // the clause's words — "an eyeless hunter" read as broken because "eyeless" appears
    // in its own trait text and "hunter" in its name, while its senses line said
    // "blind beyond this radius". `takes` is the call's enum; the regexes below are the
    // sheet's closed idiom for each mechanic, 2024 and 2014.
    if (c.polarity === 'lacks' && c.takes && c.takes !== 'part' && c.takes !== 'other') {
      const rowText = rows.map(({ e }) => `${e.name} ${e.text}`).join(' ');
      const senses = String(m.senses ?? ''); const speed = String(m.speed ?? '');
      switch (c.takes) {
        case 'grapple': return !/\b(?:has the Grappled condition|is grappled|Grappled condition \(escape|grappled \(escape)/i.test(rowText);
        case 'regeneration': return !/\bRegeneration\b|regains \d+ hit points at the start of/i.test(rowText);
        case 'spellcasting': return !/\bSpellcasting\b|\bcasts?\b/i.test(rowText);
        case 'flight': return !/\b(?:Fly|fly) \d+ ft/.test(speed);
        case 'ranged': return !/Ranged (?:Attack Roll|Weapon Attack|Spell Attack)|Melee or Ranged/i.test(rowText);
        case 'melee': return !/Melee (?:Attack Roll|Weapon Attack|Spell Attack)|Melee or Ranged/i.test(rowText);
        case 'sight': return /blind beyond this radius/i.test(senses) || !/\b(?:darkvision|truesight|tremorsense)\b/i.test(senses) && !/\b(?:sees|can see|sight)\b/i.test(rowText);
        // speech and hearing fall through to the word rule below: "understands no Common"
        // beside Languages: Giant is honoured, and a whole-voice test called it broken
        // (the Quarried Exile, forty 2026-10-18)
        default: break;
      }
    }
    if (c.polarity === 'lacks') { const neg = NEG_CUE.exec(c.text); const after = words(neg ? c.text.slice(neg.index + neg[0].length) : c.text).filter((w) => !LACKS_STOP.has(w)); if (!after.length) return false; if (!after.some((w) => sheetWords.has(w))) return true; return rows.some(({ e }) => /\b(?:can't|cannot|can not|never|unable|must not|only)\b/i.test(e.text ?? '') && words(`${e.name} ${e.text}`).some((w) => after.includes(w))); } // absent, or restated as a restriction ("Bound to the Shore" for "he cannot leave the shoreline")
    if (c.kind === 'header') {
      // a HEADER-VALUE clause is covered only when the header line carries it — the hag's "takes extra damage from fire" scored covered with no Vulnerabilities line (critic's step-5 read)
      const sz = SIZE_WORDS.exec(c.text); if (sz && SIZE_HEADER.test(c.text)) return new RegExp(`^${sz[1]}$`, 'i').test(String(m.size ?? ''));
      const sp = /(\d+)\s*(?:feet|ft)/i.exec(c.text); if (sp) return new RegExp(`\\b${sp[1]} ft`).test(String(m.speed ?? ''));
      const ac = /\bAC\s*(\d+)|armor class (?:of )?(\d+)/i.exec(c.text); if (ac) return Number(m.ac) === Number(ac[1] ?? ac[2]);
      const hp = /\bHP\s*(\d+)|(\d+) hit points/i.exec(c.text); if (hp) return Number(m.hp) === Number(hp[1] ?? hp[2]);
      const prevText = recorded[recorded.indexOf(c) - 1]?.text ?? ''; // "takes extra damage from it" after "She hates fire": the pronoun resolves to the previous phrase's type, as the engine's directive does
      const ty = DMG_TYPE_WORD.exec(c.text)?.[1] ?? (/\b(?:it|that|them)\b/i.test(c.text) ? DMG_TYPE_WORD.exec(prevText)?.[1] : null) ?? COND_WORD.exec(c.text)?.[1] ?? /\b(adamantine|silvered|magical|nonmagical)\b/i.exec(c.text)?.[1];
      const line = (field) => (ty ? new RegExp(`\\b${ty}\\b`, 'i').test(String(m[field] ?? '')) : false);
      if (VULN_CUE.test(c.text)) return line('vulnerabilities');
      if (IMM_CUE.test(c.text)) return line('immunities') || (!!ty && (m.sections?.Traits ?? []).some((e) => new RegExp(`\\b${ty}\\b`, 'i').test(e.name ?? ''))); // the adamantine clause has no 2024 header idiom; a trait named for it is the sheet's way
      if (RES_CUE.test(c.text)) return line('resistances');
      if (SPEECH_CUE.test(c.text)) { const lw = words(String(m.languages ?? '')); return words(c.text).filter((w) => !SPEECH_STOP.has(w)).some((w) => lw.includes(w)); }
      const hw = words(`${m.name} ${m.size} ${m.type} ${m.speed} ${m.languages} ${m.senses ?? ''}`); return words(c.text).some((w) => hw.includes(w));
    }
    // COVERAGE BY PROVENANCE (step 8): a clause is covered when a row's trace binds to it — a part, feature or repaired row's own
    // `clause`, a template row's concept keys (`boundKeys`), or an unplaced entry that carried it to the description — never when a
    // row's text happens to contain its words
    if (c.head) return rows.length > 0; // a creature-only prompt: the sheet IS the creature
    const ws = words(c.text); if (!ws.length) return false;
    const overlaps = (t) => words(t).some((w) => ws.includes(w));
    // A RECEIPT, NOT A WORD MATCH (owner's stage 3 item 4, 2026-10-16). A row's
    // `boundKeys` are template key words, and `words()` stems — so "wound"
    // credited "cracks open when wounded" to Rampage, a row that moves and
    // attacks and answers nothing of the sort. Only an explicit clause binding
    // counts now: the row says which clause it answers, or it does not count.
    // boundKeys still ride for provenance; they just no longer buy credit.
    if (rows.some(({ e }) => e.clause && overlaps(e.clause))) return true;
    const unplaced = (raw?.generation ?? m?.generation)?.unplaced ?? [];
    if (unplaced.some((u) => u?.clause && overlaps(u.clause))) return true;
    const styleWord = String(ctx?.donorId ?? '').replace(/-\d+/, '').split('-').slice(1).join(' '); // the chassis IS the clause when the donor's style is its verb (brute-11-charger for "It charges")
    if (styleWord && words(styleWord).some((k) => ws.some((w) => w.startsWith(k.slice(0, 4)) || k.startsWith(w.slice(0, 4))))) return true;
    return false;
  };
  const covered = clauses.filter(present); const dropped = clauses.filter((c) => !present(c)).map((c) => c.text);
  const clauseWords = new Set([...clauses.flatMap((c) => words(c.text)), ...words(ctx?.userConcept ?? '')]); // a row traces to the user's WORDS, not only to the clause list
  const printRowNames = new Set(printNamed ? [...(ctx.print.meleeRows ?? []), ...(ctx.print.rangedRows ?? []), ...(ctx.print.traits ?? []), ...(ctx.print.rulesRows ?? []), ...(ctx.print.legendaryRows ?? [])].map((r) => String(r.name ?? '').replace(/ \(.*\)$/, '').toLowerCase()) : []);
  const traced = rows.filter(({ e }) => e.kit || e.feature || e.part || (printNamed && (e.print || printRowNames.has(String(e.name ?? '').replace(/ \(.*\)$/, '').toLowerCase()))) || words(`${e.name} ${e.text}`).some((w) => clauseWords.has(w))); // a kit, feature or part row IS the user's (the seven's concept share fell as the rows' wording changed — the critic's third species read)
  // A LACK THE SHEET BREAKS IS A DEFECT, NOT A LOW SCORE (critic's hold 1,
  // 2026-10-15): "no magic at all" shipped on a priest carrying Spellcasting and
  // Divine Aid, and it passed every gate because an unhonored lack only ever
  // lowered coverage. `present()` above already computes it — now it is reported.
  // 1f (owner's ruling, 2026-10-20): A FLAW ROW HONOURS THE LACK. Some absences
  // have no row to remove — "blind in one eye" — and for those the engine now
  // authors one line in print's grammar that costs the creature something. A
  // lack answered that way is honoured, and coverage credits it; a lack with
  // neither a removal nor a flaw row is still the defect this gate was built for.
  const flawRows = rows.filter(({ e }) => e.flaw);
  const flawFor = (c) => flawRows.some(({ e }) => {
    const because = words(String(e.because ?? ''));
    return because.length > 0 && because.every((w) => words(c.text).includes(w));
  });
  const brokenLacks = clauses.filter((c) => c.polarity === 'lacks' && !present(c) && !flawFor(c)).map((c) => c.text);
  return { covered: covered.length, total: clauses.length, dropped, conceptRows: traced.length, rows: rows.length, brokenLacks };
}

// THE READER GATE (the critic's third species read, 2026-10-13): behaviour checks over the output sheet for the defect classes a reader
// kept finding after the mechanical gates passed — each class fails the gate instead of waiting for a reader.
const PRINT_DUAL_RANGES = new Set(['20/60', '30/120', '60/240', '80/320', '100/400', '150/600', '5/15']);
// the three questions this gate asks a row name, all answered by the one table:
// what print's range for that weapon is, whether it is shot rather than thrown,
// and whether it is a weapon print never gives a range at all
const rangeOf = (n) => weaponProp(n)?.range ?? null;
const isLauncher = (n) => !!weaponProp(n)?.launcher;
const neverRanged = (n) => { const w = weaponProp(n); return !!(w && w.reach && !w.thrown && !w.launcher); };
const TYPE_NAME_WORD = /(?:^|\s)(Acid|Cold|Fire|Force|Lightning|Necrotic|Poison|Psychic|Radiant|Thunder|Bludgeoning|Piercing|Slashing)(?=\s|$)/i;
// print's hybrid rows are thrown weapons: the table says which, and a thing that
// flies but no shop sells covers the rest (one weapon table, 2026-10-15)
const FLIES_NOUN = /^(?:boulder|rock|stone|spike|spine|quill|shard|bomb|flask|jar|harpoon|chain|hook|volley|spit|spray|glob|gob|blast|bola|bolas|stinger|needle|barb|thorn|pellet|shot)s?$/i;
const thrownName = (n) => { const k = weaponFor(n); const w = k ? WEAPONS[k] : null; return !!(w && (w.thrown || w.launcher)); };
function gateReader(raw, m, ctx, F) {
  const inl = String(m.inline ?? '').trim(); const name = String(m.name ?? '').trim(); const rows = allRows(m);
  const isPrint = !!ctx.print && String(ctx.print.name ?? '').toLowerCase() === name.toLowerCase(); const humanoid = /^Humanoid/i.test(String(m.type ?? '')); // the sheet's NAME is print's, not merely an alias in the words (a tiefling duelist is not the Gladiator by name)
  // inline-consistency
  // THE TYPE DOES NOT ANSWER THIS QUESTION (critic's hold 2, 2026-10-16). The
  // rule here read a one-word Humanoid name as a person's name, over the top of
  // the call's own person/kind answer. PRINT SAYS OTHERWISE: every one-word
  // Humanoid name in SRD 5.2 is a kind — Archmage, Assassin, Bandit, Berserker,
  // Commoner, Cultist, Druid, Gladiator, Guard, Knight, Mage, Noble, Pirate,
  // Priest, Scout, Spy, Tough (17 of 17) — and print's own rows write "the
  // mage", "the assassin", "the priest". The owner's 2026-10-14 reading ("the
  // smokeveil reads like a species the GM never created") is about COINED
  // names, which is what inline_kind asks the call and what inline-form below
  // validates. So the question goes to the call, and what stays deterministic
  // is that the sheet says one thing throughout.
  if (inl && !/^the /i.test(inl)) { const re = new RegExp(`\\bthe ${name.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:'s)?\\b`, 'i'); for (const { sec, e } of rows) if (re.test(String(e.text ?? ''))) F('inline-consistency', 'fail', `${sec}/${bare(e.name)} says "the ${name.toLowerCase()}" beside the sheet's inline "${inl}"`, bare(e.name)); }
  else if (inl) { const last = inl.replace(/^the /i, ''); const parts = last.split(' '); if (parts.length > 1) { const re = new RegExp(`\\bthe ${parts.at(-1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'); for (const { sec, e } of rows) if (re.test(String(e.text ?? '')) && !new RegExp(`\\b${inl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(String(e.text ?? ''))) F('inline-consistency', 'soft', `${sec}/${bare(e.name)} says "the ${parts.at(-1)}" beside the sheet's inline "${inl}"`, bare(e.name)); } }
  // print-range
  for (const { sec, e } of rows) {
    const t = String(e.text ?? ''); const n = bare(e.name);
    for (const rm of t.matchAll(/range (\d+\/\d+) ft\./g)) {
      const want = rangeOf(n); const ok = want ? rm[1] === want : (PRINT_DUAL_RANGES.has(rm[1]) || (/\b(?:pistol|musket|rifle|firearm|gun)\b/i.test(n) && /^(?:30\/90|40\/120)$/.test(rm[1])));
      if (!ok) F('print-range', 'fail', `${sec}/${n}: range ${rm[1]} is not ${want ? `the ${n}'s ${want}` : 'a print range'}`, rm[1]);
    }
    if (isLauncher(n) && /reach \d+ ft\. or range/.test(t)) F('print-range', 'fail', `${sec}/${n}: a launcher is ranged-only, never "reach … or range"`, n);
    if (neverRanged(n) && !/\b(?:hurl|hurled|throw|thrown)\b/i.test(n) && /Ranged Attack Roll/.test(t) && !/Melee or Ranged/.test(t)) F('print-range', 'fail', `${sec}/${n}: a melee weapon on a ranged-only row`, n);
  }
  // exact-body-identity
  if (ctx.print?.exact && nearPrintCr(ctx.cr, ctx.print.cr)) {
    const pcb = ctx.print;
    if (pcb.alignment && String(m.alignment ?? '') !== pcb.alignment) F('exact-body-identity', 'fail', `alignment ${m.alignment} — the ${pcb.name}'s is ${pcb.alignment}`, m.alignment);
    // 2024 RECLASSED SOME BODIES AND 2014 DID NOT (the forty, 2026-10-18). The
    // engine keeps print's 2014 type on a 2014 sheet — "goblins went Fey in 2024
    // alone" (generate.mjs `reclass2024`) — and this gate read the 2024 corpus,
    // so a 2014 Goblin Boss failed for being the Humanoid the engine meant it to
    // be. One definition, both sides.
    const reclassed2024 = ctx.edition === '2014' && /^Fey$/i.test(String(pcb.type ?? '')) && /^Humanoid/i.test(String(m.type ?? ''));
    if (pcb.type && !reclassed2024 && String(m.type ?? '').toLowerCase() !== pcb.type.toLowerCase() && !/\b(?:aberration|beast|celestial|construct|dragon|elemental|fey|fiend|giant|humanoid|monstrosity|ooze|plant|undead)\b/i.test(String(ctx.userConcept ?? ''))) F('exact-body-identity', 'fail', `type ${m.type} — the ${pcb.name}'s is ${pcb.type}`, m.type);
    // a HUMANOID print body's size is not copied by the engine (print writes
    // "Small or Medium Humanoid" and the corpus keeps the first word — the Druid
    // reads Small), so this gate does not demand it either: one rule, both sides
    // (druid smoke 2026-10-18)
    if (pcb.size && String(m.size ?? '') !== pcb.size && !/^Humanoid\b/i.test(String(pcb.type ?? '')) && !/\b(?:tiny|small|medium|large|huge|gargantuan)\b/i.test(String(ctx.userConcept ?? ''))) F('exact-body-identity', 'fail', `size ${m.size} — the ${pcb.name}'s is ${pcb.size}`, m.size);
    const dice = (t) => (/\d+ \(\d+d\d+(?: [+-] \d+)?\)/.exec(String(t ?? '')) ?? [''])[0]; // the attack's own expression; print's riders ride separately
    for (const r of [...(pcb.meleeRows ?? []), ...(pcb.rangedRows ?? []), ...(pcb.rulesRows ?? [])]) { const row = rows.find(({ e }) => bare(e.name).toLowerCase() === String(r.name ?? '').toLowerCase())?.e; if (!row) continue; const want = dice(r.text ?? r.dmg ?? ''); const have = dice(row.text); if (want && have && want !== have) F('exact-body-identity', 'fail', `${bare(row.name)}: ${have} — the ${pcb.name}'s is ${want}`, have); }
  }
  // ONE KEY DEFINITION, READ BY BOTH THE ROUTER AND THIS GATE (owner's stage 1b,
  // 2026-10-16). The Bog Cauldron was ROUTED to brute-grappler by the router's
  // own key "climbs in" — the GM typed "whatever climbs in" — and then failed
  // this gate twice for having "a grapple or engulf engine with no key in the
  // words". Two tables disagreeing about the same question. The router's
  // brute-grappler verb list is the authority on what keys a grapple engine, so
  // this gate reads it and keeps its own list only as an additional spelling set.
  const ROUTER_GRAPPLE_KEYS = (LINE_VERBS['brute-grappler'] ?? []).concat(LINE_VERBS['lurker-trap'] ?? []);
  const routerKeyed = (txt) => ROUTER_GRAPPLE_KEYS.some((k) => new RegExp(`\\b${String(k).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(txt));
  // engine-needs-key
  const ENGINE_KEY = /\b(?:grapple|grapples|grappled|grab|grabs|seize|seizes|hold|holds|clutch|wrestle|constrict|crush|crushes|squeeze|drag|drags|pull|pulls|swallow|swallows|engulf|engulfs|devour|gulp|smother|entomb|envelop|absorb|coil|coils|wrap|wraps|snare|net|tentacle|tentacles|jaws|maw|hug|cage|lasso|hook|hooks)\b/i;
  const printGrapples = !!ctx.print && [...(ctx.print.meleeRows ?? []), ...(ctx.print.rulesRows ?? [])].some((r) => /Grappled|swallow|engulf/i.test(r.text ?? r.rider ?? ''));
  const creatureOnly = !!((raw?.generation ?? m?.generation ?? raw?.other_edition?.generation)?.creatureOnly);
  // THE CALL ANSWERED THIS ALREADY (owner, 2026-10-17). `ENGINE_KEY` is a word
  // list asking whether the GM's words name a containment engine — the same
  // question the route call now answers as `holds`, with the GM's own words as
  // its receipt. The checker was a FIFTH reader of that question and still read
  // the words: a siege-wasp that "lays its eggs in the wounded" was failed for
  // having no key, while the call had read it as holding. When the answer is
  // recorded, it decides; when it is absent, the word list still does.
  const holdsAnswer = (raw?.generation ?? m?.generation)?.holds;
  if (holdsAnswer === true) { /* the call read a containment engine in the GM's own words */ }
  else if (!creatureOnly && !ENGINE_KEY.test(String(ctx.userConcept ?? '')) && !routerKeyed(String(ctx.userConcept ?? '')) && !printGrapples) for (const { sec, e } of rows) { const t = String(e.text ?? ''); if (e.part || e.print) continue; if (/has the Grappled condition \(escape DC/.test(t) || (e.rules && /^(?:Swallow|Engulf|Smother|Whelm|Cage|Entomb|Cocoon)\b/.test(e.name ?? ''))) F('engine-needs-key', 'fail', `${sec}/${bare(e.name)}: a grapple or engulf engine with no key in the words`, bare(e.name)); }
  // provenance-integrity
  for (const { sec, e } of rows) if ((e.kit || e.feature || e.part) && !e.clause && !(Array.isArray(e.boundKeys) && e.boundKeys.length)) F('provenance-integrity', 'fail', `${sec}/${bare(e.name)}: a ${e.kit ? 'kit' : e.feature ? 'feature' : 'part'} row with no clause on the saved block`, bare(e.name));
  // multiattack-integrity: a print body keeps print's Multiattack, and a Multiattack names only rows that are present
  {
    const ma = rows.find(({ e }) => /^Multiattack/.test(e.name ?? ''))?.e;
    const atk = rows.filter(({ e }) => /Attack Roll/.test(e.text ?? '')).map(({ e }) => bare(e.name));
    // A MULTIATTACK ON A SHEET WITH NOTHING TO ATTACK WITH (owner's stage 1,
    // 2026-10-16). The Courtier Unseen shipped "makes three attacks" over zero
    // attack rows and every gate passed it, because each gate checked a
    // different half: the slot-name check below only reads names the Multiattack
    // lists, and "makes three attacks" lists none. The reader printed off 0.
    if (!atk.length) {
      if (ma) F('multiattack-integrity', 'fail', `"${String(ma.text).slice(0, 60)}" on a sheet with no attack row at all`, 0);
      else F('multiattack-integrity', 'fail', 'the sheet carries no attack row at all', 0);
    }
    if (!ma && ctx.print?.multiattack && atk.length && (ctx.print.exact || nearPrintCr(ctx.cr, ctx.print.cr))) F('multiattack-integrity', 'fail', `no Multiattack — the ${ctx.print.name} has one and this sheet has ${atk.length} attack row(s)`, atk.length); // the engine stands print's Multiattack on an exact body or a borrow at print's CR — one condition, both sides (2026-10-18)
    if (!ma && atk.length > 1 && !ctx.print) F('multiattack-integrity', 'soft', `${atk.length} attack rows and no Multiattack`, atk.length);
    if (ma) { // the ATTACK slots must be attack rows; a name after "uses" or "a use of" is an action print legitimately names (the Kraken uses Fling, Lightning Strike, or Swallow)
      const t0 = String(ma.text); const all = rows.map(({ e }) => bare(e.name).toLowerCase());
      // A ROW NAME MAY CONTAIN "and" (critic, 2026-10-14: "Gorge and Glut" is one
      // row, and splitting the list on "and" reported a dangling "Gorge"). Consume
      // the longest known row name first, and only then fall back to separators.
      const resolveNames = (phrase) => {
        const out = []; let rest = String(phrase ?? '').trim();
        while (rest) {
          const lower = rest.toLowerCase();
          const hit = all.filter((k) => k && lower.startsWith(k)).sort((a, b) => b.length - a.length)[0];
          if (hit) { out.push(rest.slice(0, hit.length)); rest = rest.slice(hit.length).replace(/^(?:,\s*|\s+or\s+|\s+and\s+)/, '').trim(); continue; }
          const cut = /^(.*?)(?:,\s*|\s+or\s+|\s+and\s+)/.exec(rest);
          if (!cut) { out.push(rest); break; }
          out.push(cut[1]); rest = rest.slice(cut[0].length).trim();
        }
        return out.filter(Boolean);
      };
      const slot = [...t0.matchAll(/makes \w+ ([A-Z][\w'-]*(?: [A-Z][\w'-]*)*) attacks/g)].map((x) => x[1])
        .concat([...t0.matchAll(/using ([^.]*?) in any combination/g)].flatMap((x) => resolveNames(x[1])));
      for (const n of slot) { if (!n || !/^[A-Z]/.test(n)) continue; if (!atk.some((a) => a.toLowerCase() === n.toLowerCase())) { F('multiattack-integrity', 'fail', `Multiattack's attack slot names "${n}", which is not an attack row on this sheet`, n); break; } }
      const used = [...t0.matchAll(/(?:a use of|uses) ([^.]*?)(?:\.|$)/g)].flatMap((x) => resolveNames(x[1]).map((y) => y.trim().replace(/^its /, '').replace(/\s+to cast\b.*$/i, ''))).filter(Boolean); // "Spellcasting to cast Hold Person" is the Spellcasting row plus the spell it casts (the critic's fifth read)
      for (const n of used) { if (!n || !/^[A-Z]/.test(n)) continue; if (!all.some((a) => a === n.toLowerCase() || a.startsWith(`${n.toLowerCase()} (`))) { F('multiattack-integrity', 'soft', `Multiattack uses "${n}", which is not a row on this sheet`, n); break; } } }
  }
  // row-parse (critic, 2026-10-14): a row with no name, or whose text opens
  // mid-sentence because a sweep cut its first clause away, is a parse failure.
  for (const { sec, e } of rows) {
    const nm = String(e.name ?? '').trim();
    const txt = String(e.text ?? '').trim();
    if (!nm) F('row-parse', 'fail', `${sec}: a row with no name`, null);
    else if (/^[a-z]/.test(txt) && !/^\*/.test(txt)) F('row-parse', 'fail', `${sec}/${bare(e.name)}: its text begins mid-sentence ("${txt.slice(0, 40)}…")`, bare(e.name));
  }
  // on-hit-type (critic, 2026-10-14, reopened from the fifth read): an on-hit
  // extra rides the hit, so it deals the hit's own type. Assassinate added
  // Bludgeoning to a Shortsword because the rider renders in the trait seat,
  // before the weapon rows have their final types. A deliberate energy stands.
  {
    const PHYS2 = ['Bludgeoning', 'Piercing', 'Slashing'];
    const melee2 = rows.find(({ e }) => /Melee(?: or Ranged)? Attack Roll/.test(e.text ?? '') && !/^Multiattack/.test(e.name ?? ''))?.e;
    const hit2 = (/\) ([A-Z][a-z]+) damage/.exec(melee2?.text ?? '') ?? [])[1] ?? null;
    if (hit2 && PHYS2.includes(hit2)) for (const { sec, e } of rows) {
      if (/Attack Roll/.test(e.text ?? '') || e.print) continue;
      const x = /takes an extra \d+ \(\d+d\d+(?:\s*\+\s*\d+)?\) ([A-Z][a-z]+) damage/.exec(e.text ?? '');
      if (x && PHYS2.includes(x[1]) && x[1] !== hit2) F('on-hit-type', 'fail', `${sec}/${bare(e.name)}: it adds ${x[1]} to a hit that deals ${hit2} (${bare(melee2.name)})`, x[1]);
    }
  }
  // speaks-by-int (critic, 2026-10-14, reopened from the second read: Meshrin is
  // an INT 4 Monstrosity and spoke Common). The rule is TYPE-aware, measured off
  // print's own 139 non-Humanoid blocks at INT 5 or less: Beast 0 of 88,
  // Monstrosity 0 of 19, Ooze 0 of 4, Plant 0 of 3, Undead 0 of 4, Aberration
  // 0 of 4 — none speaks. A Giant, Fiend, Elemental, Dragon or Construct at the
  // same INT often does (the Ogre speaks Common and Giant), so they are exempt.
  {
    const MUTE_AT_LOW_INT = /^(?:Beast|Monstrosity|Ooze|Plant|Undead|Aberration)\b/i;
    const int = Number(m.stats?.INT); const lang = String(m.languages ?? '').trim();
    const says = lang && !/^(?:none|—|-)$/i.test(lang) && !/can'?t speak/i.test(lang);
    const gmSays = /\b(?:speaks?|talks?|whispers?|says|tongue|language|multilingual)\b/i.test(String(ctx.userConcept ?? ''));
    if (Number.isFinite(int) && int <= 5 && MUTE_AT_LOW_INT.test(String(m.type ?? '')) && !isPrint && says && !gmSays) F('speaks-by-int', 'fail', `INT ${int} on a ${String(m.type ?? '').split(' ')[0]} speaks "${lang}" — print has none of 19 Monstrosities, 88 Beasts or 4 Oozes at INT 5 or less speaking a tongue`, lang);
  }
  // attack-in-multiattack (the critic's fifth read): on a sheet with a
  // Multiattack, every Action attack row is named in it — as a slot or as a use
  // it can replace an attack with. Print composes its own card, so print's rows
  // are exempt; a gated row is a nova, not a slot; reactions, bonus actions and
  // legendary actions are their own economy.
  {
    const ma = rows.find(({ e }) => /^Multiattack/.test(e.name ?? ''))?.e;
    if (ma) {
      const cited = String(ma.text ?? '').toLowerCase();
      for (const { sec, e } of rows) {
        // print composes its own card only while the card is still print's: once a
        // lack has removed one of print's rows, the composition is ours (critic,
        // 2026-10-14: the Iron Templar lost Spellcasting to "no magic at all" and
        // kept Radiant Flame orphaned outside the Multiattack)
        const printWhole = !!ctx.print?.exact && nearPrintCr(ctx.cr, ctx.print.cr);
        if (sec !== 'Actions' || !/Attack Roll/.test(e.text ?? '') || (e.print && printWhole) || /^Multiattack/.test(e.name ?? '')) continue;
        if (gateOf(e)) continue; // a gated row is not an at-will attack row
        const n = bare(e.name).toLowerCase(); if (!n) continue;
        if (!cited.includes(n)) F('attack-in-multiattack', 'fail', `Actions/${bare(e.name)} is an attack row the Multiattack never names — a GM who reads the Multiattack never uses it`, bare(e.name));
      }
    }
  }
  // interior-energy (critic, 2026-10-14, the fourth flag): a gullet matches the
  // body it is in. Where a containment row deals one non-physical type on the
  // save and digests in another, the interior is the frame's default, not this
  // creature's. Print's Acid stands only where the creature declares no energy.
  for (const { sec, e } of rows) {
    const t = String(e.text ?? ''); if (!/damage at the start of each of/.test(t)) continue;
    const inside = /(\w+) damage at the start of each of/.exec(t)?.[1] ?? null;
    const onSave = [...t.matchAll(/\d+ \(\d+d\d+(?:\s*\+\s*\d+)?\) (\w+) damage/g)].map((x) => x[1]).find((x) => x !== inside) ?? null;
    const energyish = (x) => x && !['Bludgeoning', 'Piercing', 'Slashing'].includes(x);
    if (energyish(inside) && energyish(onSave) && inside !== onSave) F('interior-energy', 'fail', `${sec}/${bare(e.name)}: it deals ${onSave} and digests in ${inside} — a gullet matches the body it is in`, inside);
  }
  // hybrid-needs-thrown (the critic's fifth read): "Melee or Ranged" is print's
  // grammar for a THROWN weapon — a Spear, a Javelin, a Trident, a Handaxe. A row
  // that names nothing which can fly reads as an elk thrown 120 feet.
  for (const { sec, e } of rows) {
    if (!/Melee or Ranged Attack Roll/.test(e.text ?? '') || e.print) continue;
    const n = bare(e.name); const head = n.toLowerCase().split(/[\s-]+/).pop() ?? '';
    if (thrownName(n) || FLIES_NOUN.test(head) || /\b(?:thrown|throws?|hurl|hurled|hurls|lob|lobs|lobbed|fling|flings|flung|tosse?s?|spit|spits|launch(?:es|ed)?)\b/i.test(n)) continue;
    // the Mage's Arcane Burst reaches both ways because it is a SPELL attack, so
    // the exemption needs a caster (critic, 2026-10-14)
    if (!/\) (?:Bludgeoning|Piercing|Slashing) damage/.test(e.text ?? '') && rows.some(({ e: e2 }) => /^Spellcasting/.test(e2.name ?? ''))) continue;
    if (/\b(?:bow|crossbow|sling|musket|pistol|rifle|firearm|gun|blowgun)\b/i.test(n)) continue; // a launcher is the weapon table's to retable, and print-range already owns it
    F('hybrid-needs-thrown', 'fail', `${sec}/${n}: a "Melee or Ranged" row that names nothing a creature can throw`, n);
  }
  // THE FORM MUST AGREE WITH THE FIELD (critic's hold 6, 2026-10-15). The call
  // answers person|kind; a person speaks as the bare name, a kind starts with
  // "the". NOTE this sits OUTSIDE the inline-correctness block below, which is
  // guarded on the inline already starting with "the" — the defect this is for is
  // a KIND rendered WITHOUT it ("Coinbound Sellsword" speaking as "Sellsword"),
  // which that guard excludes. Measured 2026-10-16: the call answered person|kind
  // correctly on 10 of 10 names-with-concepts, and the ENGINE discarded two of
  // its correct answers — so this gate is aimed at the engine, which is where the
  // defect lives. A misread field stays a trace-and-rate matter.
  // an HONEST OVERRIDE is not a mis-stamp: the engine refused the call's phrase
  // and produced the form itself, and `inline_overridden` says which form it
  // produced. The gate fails a field that disagrees with the form it SHIPPED.
  const kindClaim = String(m.inline_overridden ?? m.inline_kind ?? '').trim().toLowerCase();
  if (inl && kindClaim === 'kind' && !/^the /i.test(inl)) F('inline-form', 'fail', `the call called "${name}" a kind and the sheet speaks it as "${inl}" — a kind starts with "the"`, inl);
  if (inl && kindClaim === 'person' && /^the /i.test(inl)) F('inline-form', 'fail', `the call called "${name}" a person and the sheet speaks it as "${inl}" — a person speaks by its given name`, inl);
  // inline-correctness: the inline follows the name rule, not merely itself
  if (inl && name.split(/\s+/).length > 1 && /^the /i.test(inl)) {
    // A HEAD IS AS GOOD AS A TAIL — print's own blocks said so (2026-10-15).
    // This accepted only a contiguous TAIL, and failed 7 of 7 printed swarms:
    // print names one "Swarm of Bats" and its own rules text says "the swarm",
    // where "swarm" is the HEAD. Every "X of Y" name heads the same way
    // ("Herdmaster of the Storm-Plains" speaks as "the herdmaster"), which is
    // the false positive this gate has been throwing all sprint.
    // Hyphens split too, the way this file's row-name read two dozen lines up
    // already does — "Marrow-Herd Reaver" speaks as "the herd reaver".
    // BOTH SIDES NORMALIZE (live, 2026-10-15): the first cut split the NAME on
    // hyphens and left the INLINE alone, so "Iron Line-Crasher" + "the
    // line-crasher" failed on the hyphen the name had already lost. The pins
    // missed it because every hand-written case put the hyphen on the name side.
    const rest = inl.replace(/^the /i, '').toLowerCase().split(/[\s-]+/).join(' '); const words = name.toLowerCase().split(/[\s-]+/);
    const runs = words.flatMap((_, i) => words.map((__, j) => (j >= i ? words.slice(i, j + 1).join(' ') : null)).filter(Boolean)); // every contiguous run: head, tail, and the middles print uses
    const ok = runs.includes(rest);
    const isRankish = /^(?:sergeant|captain|commander|lieutenant|general|admiral|marshal|warlord|chieftain|lord|lady|baron|baroness|count|countess|duke|duchess|king|queen|prince|princess|abbot|abbess|bishop|brother|sister|mother|father|constable|sheriff|grandmother|grandfather|granny|elder|mistress|master|warden|knight|hunter|pilgrim|marauder|rider|horseman|keeper|witch|hermit|seer|reaver|raider)$/.test(rest);
    if (!ok && !isRankish) F('inline-correctness', 'fail', `the inline "${inl}" is neither this creature's whole name nor its head noun nor a rank — a kind speaks whole, a person by its given name`, inl);
  }
  // gate-fit: a row that shed its use limit must have a Multiattack to join
  {
    const hasMa = rows.some(({ e }) => /^Multiattack/.test(e.name ?? ''));
    if (!hasMa) for (const { sec, e } of rows) { const t = String(e.text ?? ''); if (sec !== 'Actions' || e.print || / \((?:Recharge [\d–-]+|\d\/Day)\)$/.test(e.name ?? '')) continue;
      if (/Saving Throw/.test(t) && /\bhas the [A-Z]\w+ condition\b/.test(t) && !/\d+ \(\d+d\d+/.test(t)) F('gate-fit', 'fail', `${sec}/${bare(e.name)}: an at-will condition action with no Multiattack to join — a shed use limit needs one`, bare(e.name)); }
  }
  // type-fit and save-fit
  for (const { sec, e } of rows) {
    const t = String(e.text ?? ''); const n = bare(e.name); if (e.print) continue;
    // THE HEAD WORD OWNS THE TYPE, AS IT DOES IN THE ENGINE'S OWN NAMER (2026-10-18).
    // This read the first anatomy word anywhere in the name, so "Tail Spines" was
    // judged a tail and its Piercing failed — while print writes the Manticore's
    // "Tail Spike" and the Purple Worm's "Tail Stinger" as Piercing, naming the row
    // for the thing on the end of the tail. honestAttackNames already reads the head
    // word "as it does across a spaced name"; this is one definition with it.
    // Measured over print's 171 anatomy-named attack rows: the first-match read
    // flags 11, the head-word read 9, and the two it clears are exactly those
    // Manticore/Purple Worm rows. The 9 that remain are print's own bare-name
    // oddities (the Camel's Bludgeoning bite, the Ankheg's Slashing one) — as found.
    const anat = /Attack Roll/.test(t) ? /\b(claws?|bite|fangs?|talons?|tusks?|horns?|hooves|hoof|tail|slam|fists?|gore|sting|stinger|maw|jaws|pincers?|beak)\b/i.exec(String(n).split(/[\s-]+/).pop() ?? '') : null; // an anatomy word on a row that makes no attack is flavour ("Answering Sting" is a riposte)
    const dealt = /\d+ \(\d+d\d+(?: [+-] \d+)?\) ([A-Z][a-z]+) damage/.exec(t)?.[1];
    if (anat && dealt) { const want = { claw: 'Slashing', claws: 'Slashing', bite: 'Piercing', fang: 'Piercing', fangs: 'Piercing', talon: 'Slashing', talons: 'Slashing', tusk: 'Piercing', tusks: 'Piercing', horn: 'Piercing', horns: 'Piercing', hooves: 'Bludgeoning', hoof: 'Bludgeoning', tail: 'Bludgeoning', slam: 'Bludgeoning', fist: 'Bludgeoning', fists: 'Bludgeoning', gore: 'Piercing', sting: 'Piercing', stinger: 'Piercing', maw: 'Piercing', jaws: 'Piercing', pincer: 'Bludgeoning', pincers: 'Bludgeoning', beak: 'Piercing' }[anat[1].toLowerCase()];
      // PRINT QUALIFIES THE NOUN AND THE ENERGY FOLLOWS (measured 2026-10-18):
      // the Air Elemental's "Thunderous Slam" deals Thunder, the Pit Fiend's
      // "Devilish Claw" Necrotic, the Unicorn's "Radiant Horn" Radiant — 16 print
      // rows put a non-anatomical type on an anatomy name, and every energy one
      // carries a qualifier beside the noun. Force is the only energy in the
      // comparison set, so a qualified name dealing Force is print's idiom, not a
      // defect (the forty's "Arcane Slam"). A BARE noun still answers for it.
      const qualified = n.toLowerCase().replace(/\b(?:attack|roll)\b/g, '').trim().split(/[\s-]+/).filter(Boolean).length > 1;
      if (want && ['Bludgeoning', 'Piercing', 'Slashing', 'Force'].includes(dealt) && dealt !== want && !(qualified && dealt === 'Force')) F('type-fit', 'fail', `${sec}/${n}: a ${anat[1].toLowerCase()} deals ${want}, not ${dealt}`, dealt); }
    if (dealt && ['Bludgeoning', 'Piercing', 'Slashing'].includes(dealt) && /\b(?:drains?|siphons?|leech(?:es)?)\b/i.test(`${n} ${t}`) && /regains? (?:\d+ )?Hit Points|\bdrain/i.test(t)) F('type-fit', 'fail', `${sec}/${n}: a drain deals ${dealt} — a weapon type for an effect that takes no weapon`, dealt);
    const sv = /\*?(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) Saving Throw/.exec(t);
    // a condition named as a PREREQUISITE is not an imposed effect (a condition-payoff row exploits Prone; it does not cause it)
    if (sv && !e.print) { const eff = effectOnly(t); const want = /\b(?:Prone\b|pushed\b|Grappled\b|Restrained\b|knocked prone)/.test(eff) ? (/Attack Roll/.test(t) ? ['Strength', 'Dexterity', 'Constitution'] : ['Strength', 'Dexterity']) /* print's weapon mastery topples on a Constitution save */ : /\b(?:Poisoned|poison|disease|breath|spores?|choking|suffocat)/i.test(eff) ? ['Constitution'] : /\b(?:Frightened|Charmed)\b/.test(eff) ? ['Wisdom', 'Charisma'] : null;
      if (want && !want.includes(sv[1])) F('save-fit', 'fail', `${sec}/${n}: a ${sv[1]} save for an effect that calls for ${want.join(' or ')}`, sv[1]); }
  }
  // alignment-fit: Unaligned is for a creature with no capacity for ethics.
  // "UNDERSTANDS … BUT CAN'T SPEAK" IS NOT SPEECH (owner's stage 1b, 2026-10-16).
  // The line is not "None", so this gate read it as speech and would have failed
  // PRINT'S OWN Stone Golem — Unaligned, INT 3, "Understands Common plus two
  // other languages but can't speak". It fired on the Dirge Swarm at INT 4 while
  // the Altarstone Warden passed at INT 3 on the identical line. The type list
  // also missed the Swarm-of wrapper, which is how a Construct swarm reached it.
  const mute = /^none$/i.test(String(m.languages ?? 'None').trim()) || /can't speak|cannot speak/i.test(String(m.languages ?? ''));
  const noEthicsType = /^(?:Beast|Ooze|Plant|Construct)\b/i.test(String(m.type ?? '')) || /\bSwarm of \w+ (?:Beast|Ooze|Plant|Construct)/i.test(String(m.type ?? ''));
  // PRINT'S OWN RATE SETS THE THRESHOLD (owner, 2026-10-18: "are these really
  // FAILs or notes?"). The INT >= 6 bar failed a Monstrosity and an Elemental at
  // INT 6 that speak nothing — and of print's 128 creatures with INT <= 8 and no
  // language, 120 are Unaligned: 94%. The four exceptions are Death Dog,
  // Ettercap, Gibbering Mouther and Mimic. So a mute creature at INT <= 8 being
  // Unaligned is print's NORM, not a defect, whatever its type; the gate was
  // contradicting print nine times in ten and spending the critic's attention on
  // it. Above INT 8, or with real speech, the question stands.
  const noEthicsInt = mute && Number(m.stats?.INT ?? 10) <= 8;
  if (/^unaligned$/i.test(String(m.alignment ?? '').trim()) && !noEthicsType && !noEthicsInt && (Number(m.stats?.INT ?? 10) >= 6 || !mute)) F('alignment-fit', 'fail', `Unaligned on a ${m.type} with INT ${m.stats?.INT ?? '?'} that speaks ${String(m.languages ?? 'None').trim() || 'None'} — Unaligned is for a creature with no capacity for ethics`, String(m.alignment ?? ''));
  // name-mechanic + no-type-in-name
  for (const { sec, e } of rows) {
    const n = bare(e.name); const t = String(e.text ?? ''); if (/^(?:Multiattack|Spellcasting|Legendary Resistance|Legendary Action Uses)/.test(n) || e.print) continue;
    { const unkept = mechanicUnkept(n, t); if (unkept) F('name-mechanic', 'fail', `${sec}/${n}: the name promises ${unkept} the text lacks`, n); }
    const tw = TYPE_NAME_WORD.exec(n);
    // a type word that is part of the creature's OWN NAME is its name, not a damage claim:
    // the Cold Lamp Widow's "Shroud of the Cold Lamp" deals Necrotic (feature thirty, 2026-10-19)
    const twPair = tw ? new RegExp(`\\b(${tw[1]} \\w+)`, 'i').exec(n)?.[1] : null;
    const ownName = !!(twPair && String(m.name ?? '').toLowerCase().includes(twPair.toLowerCase()));
    if (tw && !ownName && !new RegExp(`\\b${tw[1]} damage\\b`, 'i').test(t) && !new RegExp(`\\b${tw[1]}\\b`).test(t.replace(/damage/g, ''))) F('no-type-in-name', 'fail', `${sec}/${n}: the name carries ${tw[1]} the text does not deal`, tw[1]);
  }
}

export function checkBlock(raw, ctx = {}) {
  const edition = ctx.edition ?? (raw.format === '2014' || raw.type_and_alignment ? '2014' : '2024');
  const m0 = edition === '2014' ? (raw.other_edition?.format === '2024' ? raw.other_edition : fromLegacyModel(raw)) : raw;
  const m = m0.english?.sections ? m0.english : m0; // a translated block carries its English twin: the engine built and checked it in English and the translation holds the numbers — the checker reads the twin (the Steingolem read "sustained 0 (1 × ?)", canaries 2026-10-12)
  const cr = Number(ctx.cr ?? m.cr ?? crNum(m.cr_str ?? '0'));
  const userConcept = ctx.userConcept ?? (raw.other_edition ?? raw).generation?.userConcept ?? raw.generation?.userConcept ?? [raw.monsterName, raw.monsterDescription].filter(Boolean).join(' — '); // the block carries the user's words from step 4 on
  // THE CHECKER IS A READER OF THE ALIAS TOO (2026-10-17). generate.mjs stands a
  // print body down when the concept's own TYPE or ELEMENT contradicts it — the
  // words RESEMBLE that creature, they do not name it. The checker matched the
  // same alias and did not apply the same test, so a brass-gear hound that
  // correctly refused the Hell Hound was then failed for not having the Hell
  // Hound's Multiattack. Five readers of this alias now, one rule: if the shipped
  // sheet's type contradicts print's, it is not that creature and its structure
  // is not the standard.
  // THE CHECKER IS A READER OF THE PATH (Five Pipelines brief, step 4): a block generated on the
  // dispatcher carries `generation.pipeline` — its path and print body — and the checker takes
  // that record over its own matcher, which misses the shapes the path was built to catch
  // ("a vampire who runs a bathhouse" read homebrew here and failed print's own Vampire as under
  // band, twist-ten 2026-10-19). Blocks from before the dispatcher keep the matcher's read.
  const pipe = (raw?.generation ?? m?.generation ?? raw?.other_edition?.generation)?.pipeline ?? null;
  let print = ctx.print ?? null;
  if (!print && pipe && pipe.path) {
    if (pipe.print_body && (pipe.path === 'exact' || pipe.path === 'twist' || pipe.path === 'class_npc')) {
      try { const rec = printCanonFor(pipe.print_body, cr); print = rec ? { ...rec, exact: pipe.path === 'exact', borrowOnly: pipe.path !== 'exact', fromPath: pipe.path } : null; } catch { print = null; }
    } else print = null;
  } else if (!print && userConcept) { try { print = printCanonFor(readPhrases(userConcept), cr); } catch { print = null; } }
  if (print && !print.fromPath && !print.exact && print.type && m.type) { // the vetoes are the matcher's; a path decision needs none
    const head = (t) => String(t).replace(/^Swarm of \w+ /, '').split(/[ ,(]/)[0].toLowerCase();
    if (head(print.type) !== head(m.type)) print = null;
  }
  if (print && !print.fromPath && userConcept) { const sh = speciesFor([userConcept], userConcept); if (sh && print.type && sh.species.type && print.type.toLowerCase() !== sh.species.type.toLowerCase()) print = null; } // the engine's rule: a species word outranks a monster alias of another type (a kenku mimic is not the Mimic — species landing 2026-10-13)
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
  const servedVerbatimEarly = raw?.generation?.source === 'srd-5.1' && raw?.generation?.calls === 0;
  const safe = (gate, fn) => { try { fn(F(gate)); } catch (e) { F(gate)('checker-error', 'soft', `the gate threw: ${e?.message ?? e}`, String(e)); } };
  // A BLOCK SERVED VERBATIM FROM PRINT IS CHECKED AGAINST THE CORPUS, NOT
  // AGAINST OUR GATES (2026-10-20). Under the owner's 4c ruling an exact 2014
  // name is served straight from the SRD 5.1 corpus: no call, nothing authored,
  // nothing rephrased. Every content gate then judged print by the engine's own
  // standards and failed it — the phrasing lint 12-28 times a block, and after
  // that was stood down, `print-rows` (print's rows are not "ours"),
  // `print-hp` (the 5.1 Vampire's 144 against the 5.2 record's 195, because the
  // print lookup reads the 2024 corpus), `multiattack-integrity`, `escape-dc`,
  // `alignment-fit`. All the same mistake: print overrules reviewers, and this
  // IS print. The brief says so outright — the exact path's gate is "equals the
  // corpus, field by field", which is what the corpus-diff test owns.
  if (servedVerbatimEarly) {
    F('donor')('print-served', 'ok', `"${m.name}" is the SRD 5.1 block, served with no call — the gates that judge authored content do not apply; equality with the corpus is the test`, null);
    return { name: m.name, cr, edition, donor: context.donorId, gates, fails: GATES.filter((g) => gates[g].status === 'fail'), softs: GATES.filter((g) => gates[g].status === 'soft'), read: dmgRead(m), fidelity: null };
  }
  safe('derivation', (f) => gateDerivation(m, context, f));
  safe('bands', (f) => gateBands(m, context, f));
  safe('structure', (f) => gateStructure(m, context, f));
  safe('gates', (f) => gateGates(m, context, f));
  safe('headerBody', (f) => gateHeaderBody(m, context, f));
  safe('adjudicability', (f) => gateAdjudicability(m, context, f));
  safe('edition', (f) => gateEdition(raw, m, context, f));
  safe('donor', (f) => gateDonor(raw, m, context, f));
  safe('reader', (f) => gateReader(raw, m, context, f));
  safe('class', (f) => gateClass(raw, m, context, f));
  // A BLOCK SERVED VERBATIM FROM PRINT IS NOT LINTED (2026-10-20). The owner's
  // 4c ruling serves an exact 2014 name straight from the SRD 5.1 corpus, no
  // call, nothing rephrased — and the real published text then failed our own
  // 2014 phrasing lint 12 to 28 times a block (`phrasing-to-hit`, `term-caps`,
  // `damage-type-caps`). That lint is calibrated to the ENGINE's 2014 idiom, not
  // to the book, so checking the book against it is backwards: print overrules
  // reviewers, and this is print itself. The line below already exempted print's
  // own ROWS one at a time for the same reason; on a served block every row is
  // print's, so the whole pass stands down.
  const servedVerbatim = servedVerbatimEarly;
  if (servedVerbatim) F('edition')('print-served', 'ok', 'served verbatim from the SRD 5.1 corpus — print is not linted against the engine\'s own idiom', null);
  // the lint's own predicates ride in by rule id — one fix, one place
  try {
    const { findings } = servedVerbatim ? { findings: [] } : lintStatblock(JSON.parse(JSON.stringify(m)), { edition: '2024' });
    for (const f of findings) {
      const gate = LINT_GATE.find(([re]) => re.test(f.rule))?.[1]; if (!gate) continue;
      if (f.loc?.entry && allRows(m).some(({ e }) => e.print && bare(e.name) === bare(f.loc.entry))) continue; // print's row is print
      F(gate)(`lint:${f.rule}`, f.severity === 'reject' ? 'fail' : 'soft', f.message, f.expected ?? null);
    }
  } catch (e) { F('structure')('lint-error', 'soft', `the lint threw: ${e?.message ?? e}`, String(e)); }
  const fid = fidelityOf(m, raw, context);
  // 1e (critic's ruling, 2026-10-20): on a print body, a clause the GM added
  // beyond print is the whole reason the sheet exists. The engine records the
  // owed clauses its repair call could not answer; a sheet that shipped as the
  // stock monster fails here instead of reading clean.
  for (const t of (m.generation?.owed_unanswered ?? [])) F('reader')('owed-clause', 'fail', `the GM added "${t}" to a printed creature and the sheet answers it with nothing — this ships as the stock monster`, t);
  for (const t of fid.brokenLacks ?? []) F('reader')('lack-honored', 'fail', `the GM asked for an absence — "${t}" — and the sheet still carries it`, t);
  const fails = GATES.filter((g) => gates[g].status === 'fail'); const softs = GATES.filter((g) => gates[g].status === 'soft');
  return { name: m.name, cr, edition, donor: context.donorId, gates, fails, softs, read: dmgRead(m), fidelity: fid };
}
export function checkTable(results, { title = 'Mechanics check' } = {}) {
  const head = `## ${title}\n\n| block | CR | ed | donor | ${GATES.join(' | ')} | verdict | coverage | concept |\n|---|---|---|---|${GATES.map(() => '---').join('|')}|---|---|---|\n`;
  const cell = (g) => (g.status === 'ok' ? (g.findings.find((f) => f.rule === 'user-set')?.message ?? 'ok') : `${g.status.toUpperCase()}: ${g.findings.filter((f) => f.severity === g.status).map((f) => f.rule).join(', ')}`);
  const rows = results.map((r) => `| ${r.name} | ${r.cr}${r.edition === '2014' ? ' (2014)' : ''} | ${r.edition} | ${r.donor ?? '—'} | ${GATES.map((g) => cell(r.gates[g])).join(' | ')} | ${r.fails.length ? `FAIL (${r.fails.length})` : r.softs.length ? `soft (${r.softs.length})` : 'clean'} | ${r.fidelity ? `${r.fidelity.covered}/${r.fidelity.total}` : '—'} | ${r.fidelity ? `${r.fidelity.conceptRows}/${r.fidelity.rows}` : '—'} |`).join('\n');
  const bySeat = {};
  for (const r of results) for (const g of r.fails) { const k = `${r.donor ?? '?'} / ${g}`; bySeat[k] = (bySeat[k] ?? 0) + 1; }
  const sorted = Object.entries(bySeat).sort((a, b) => b[1] - a[1]).map(([k, v]) => `- ${k}: ${v}`).join('\n');
  const fid = results.filter((r) => r.fidelity && r.fidelity.total > 0);
  const cov = fid.reduce((a, r) => a + r.fidelity.covered, 0); const tot = fid.reduce((a, r) => a + r.fidelity.total, 0);
  const con = fid.reduce((a, r) => a + r.fidelity.conceptRows, 0); const all = fid.reduce((a, r) => a + r.fidelity.rows, 0);
  const droppedLine = tot ? `**Dropped ${tot - cov} of ${tot} user clauses** (coverage ${Math.round((cov / tot) * 100)}%); concept share ${all ? Math.round((con / all) * 100) : 0}% (${con}/${all} rows). A run with zero fails and 60% coverage is a failing run.\n` : '';
  return `${head}${rows}\n\n${droppedLine}**Fails by seat and gate:**\n${sorted || '- none'}\n`;
}
