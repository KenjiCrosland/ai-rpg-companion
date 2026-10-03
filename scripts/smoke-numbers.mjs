#!/usr/bin/env node
/**
 * NUMBERS CHECK — the DMG's own arithmetic over a smoke run (owner 2026-10-02:
 * "I want to make sure the numbers add up"). For every captured block (2014 or
 * 2024 grammar) it reads AC, HP, the best attack bonus, the best DC, the
 * sustained damage (Multiattack count x best attack row, always-on riders
 * included, conditional clauses excluded) and the biggest gated nova, then
 * walks the DMG table: defensive CR from HP adjusted by AC, offensive CR from
 * damage adjusted by attack bonus (or DC), final = the average. The sustained
 * figure alone is shown beside the DMG figure (three rounds, one nova round at
 * two targets for an area) so a reviewer sees both counts.
 *
 * Usage: node scripts/smoke-numbers.mjs <run-dir> [--out <path>]
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const dir = args.find((a) => !a.startsWith('--'));
if (!dir) { console.error('usage: node scripts/smoke-numbers.mjs <run-dir> [--out <path>]'); process.exit(2); }
const out = args.includes('--out') ? args[args.indexOf('--out') + 1] : path.join('scripts', 'smoke-evidence', `NUMBERS-${path.basename(dir)}.md`);
const TABLE = JSON.parse(fs.readFileSync('src/data/challengeRatings.json', 'utf8'));
// THE CORPUS IS THE BAND (owner 2026-10-02: "measure our expectations against the
// corpus" — legendary print runs hot by the DMG method and that is fine): every
// SRD 5.2 block is parsed with the same arithmetic, so a sheet is compared to what
// print measures at its CR (±1 CR pooled when a CR holds fewer than three blocks)
const CORPUS = JSON.parse(fs.readFileSync('src/data/srd52-monsters.json', 'utf8'));
const crNum = (k) => (k.includes('/') ? Number(k.split('/')[0]) / Number(k.split('/')[1]) : Number(k));
// JS orders integer-like keys first ('0','1',…,'30','1/8','1/4','1/2') — sort by value or a step up from 30 lands on 1/4
const CRS = Object.keys(TABLE).filter((k) => /^\d+$|^1\/[248]$|^0$/.test(k)).sort((a, b) => crNum(a) - crNum(b));
const rowOf = (cr) => TABLE[CRS.find((k) => crNum(k) === cr)];
const avgOf = (s) => Number(/(\d+) \(\d+d\d+/.exec(s)?.[1] ?? 0);
const WORDS = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };

function parseBlock(block) {
  const is2014 = /Melee Weapon Attack:|Ranged Weapon Attack:|Challenge/.test(block);
  const cr = is2014 ? /Challenge\s*\n*\s*([\d/]+)/.exec(block)?.[1] : /\bCR ([\d/]+)/.exec(block)?.[1];
  const ac = Number((is2014 ? /Armor Class\s*\n*\s*(\d+)/ : /\bAC (\d+)/).exec(block)?.[1] ?? NaN);
  const hp = Number((is2014 ? /Hit Points:?\s*\n*\s*(\d+)/ : /\bHP (\d+)/).exec(block)?.[1] ?? NaN);
  const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
  const attackRows = []; const novas = []; const legendaryRows = []; let multi = null; let inLegendary = false;
  for (const l of lines) {
    if (/^Legendary Actions\b/.test(l)) { inLegendary = true; continue; }
    if (/^(Traits|Actions|Bonus Actions|Reactions|Lair Actions)$/.test(l)) { inLegendary = false; continue; }
    const name = /^([^.:]+?)[.:]\s/.exec(l)?.[1] ?? '';
    if (/^Multiattack\b/i.test(name)) { multi = l; continue; }
    if (inLegendary && name) { legendaryRows.push({ name, line: l }); continue; }
    const atk = /Attack(?: Roll)?:?\*?\s*\+(\d+)/.exec(l);
    if (atk) {
      // the always-on damage: the first "N (dice)" and every "plus N (dice)" BEFORE a conditional clause
      const main = l.split(/\bIf\b|\bWhen\b|\bOn a hit, if\b|, or \d+ \(/)[0]; // the swarm's ", or N (dice) if Bloodied" half is an alternative, not a rider
      const parts = main.match(/\d+ \(\d+d\d+(?: \+ \d+)?\)/g) ?? [];
      const avg = parts.reduce((a, p) => a + avgOf(p), 0);
      attackRows.push({ name, atk: Number(atk[1]), avg, line: l });
      continue;
    }
    const gate = /\((Recharge [\d–-]+|\d\/Day)\)/.exec(name)?.[1];
    const dc = /DC (\d+)/.exec(l);
    if (gate && /\d+ \(\d+d\d+/.test(l)) novas.push({ name, gate, avg: avgOf(l), area: /each creature|Cone|Sphere|radius|Line|Emanation|Cube|cube/i.test(l), dc: Number(dc?.[1] ?? NaN) });
  }
  const dcs = [...block.matchAll(/DC (\d+)/g)].map((m) => Number(m[1]));
  let attacks = 1; let sustained = 0; let how = 'one attack';
  const best = attackRows.slice().sort((a, b) => b.avg - a.avg)[0];
  if (multi) {
    const n = /makes (\w+)/i.exec(multi)?.[1]; attacks = WORDS[n?.toLowerCase()] ?? Number(n) ?? 1;
    const named = attackRows.filter((r) => new RegExp(`\\b${r.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(multi));
    const pool = named.length ? named : attackRows;
    const top = pool.slice().sort((a, b) => b.avg - a.avg)[0];
    sustained = (top?.avg ?? 0) * attacks; how = `${attacks} x ${top?.name ?? '?'} (${top?.avg ?? 0})`;
  } else if (best) { sustained = best.avg; how = `1 x ${best.name} (${best.avg})`; }
  // LEGENDARY damage: the best single legendary use counted ONCE per round (the solver's own convention — one legendary strike rides beside the Multiattack); three uses of it would be the DMG's upper bound and is shown in the notes
  const legendaryAvg = (lr) => { const ref = /makes (one|two|\d+) ([A-Z][\w' -]+?) attacks?/.exec(lr.line); if (ref) { const r = attackRows.find((a) => a.name === ref[2]); const n = WORDS[ref[1]] ?? Number(ref[1]) ?? 1; return r ? r.avg * n : 0; } const parts = (lr.line.split(/\bIf\b/)[0].match(/\d+ \(\d+d\d+(?: \+ \d+)?\)/g) ?? []); return parts.reduce((a, p) => a + avgOf(p), 0); };
  const legendary = legendaryRows.map((lr) => ({ ...lr, avg: legendaryAvg(lr) })).sort((a, b) => b.avg - a.avg)[0] ?? null;
  if (legendary && legendary.avg) { sustained += legendary.avg; how += ` + legendary ${legendary.name} (${legendary.avg}) once`; }
  const nova = novas.slice().sort((a, b) => b.avg - a.avg)[0] ?? null;
  const uses = nova ? ({ 'Recharge 4-6': 2, 'Recharge 5-6': 1, '1/Day': 1, '2/Day': 2, '3/Day': 3 }[nova.gate] ?? 1) : 0;
  const perUse = nova ? nova.avg * (nova.area ? 2 : 1) : 0;
  const dmgDpr = (sustained * 3 + uses * Math.max(0, perUse - sustained)) / 3;
  return { is2014, cr, ac, hp, atkBest: Math.max(0, ...attackRows.map((r) => r.atk)), dcBest: Math.max(0, ...dcs), sustained, how, nova, dmgDpr, attackRows, legendary, legendaryRows };
}

function corpusText(m) {
  const lines = [`AC ${m.ac}`, `HP ${m.hp}`, `CR ${m.cr_str ?? m.cr}`];
  for (const sec of ['Traits', 'Actions', 'Bonus Actions', 'Reactions', 'Legendary Actions']) {
    const es = m.sections?.[sec] ?? []; if (!es.length) continue;
    lines.push(sec); for (const e of es) lines.push(`${e.name}. ${String(e.text ?? '').replace(/\*/g, '')}`);
  }
  return lines.join('\n');
}
const corpusCache = new Map();
function corpusAt(cr) {
  if (corpusCache.has(cr)) return corpusCache.get(cr);
  const list = Array.isArray(CORPUS) ? CORPUS : [];
  let pool = list.filter((m) => Number(m.cr) === cr);
  if (pool.length < 3) pool = list.filter((m) => Math.abs(Number(m.cr) - cr) <= 1);
  if (pool.length < 3) pool = list.filter((m) => Math.abs(Number(m.cr) - cr) <= 2);
  const parsed = pool.map((m) => { const p = parseBlock(corpusText(m)); const d = dmgCR({ ...p, cr: String(m.cr) }); return { name: m.name, hp: Number(m.hp), ac: Number(m.ac), atk: p.atkBest, dc: p.dcBest, dpr: p.dmgDpr, read: d.final }; });
  const span = (k) => { const v = parsed.map((x) => x[k]).filter((x) => Number.isFinite(x) && x > 0).sort((a, b) => a - b); return v.length ? [v[0], v[v.length - 1], v[Math.floor(v.length / 2)]] : null; };
  const out = { n: parsed.length, hp: span('hp'), ac: span('ac'), atk: span('atk'), dc: span('dc'), dpr: span('dpr'), read: span('read'), names: parsed.map((x) => x.name) };
  corpusCache.set(cr, out); return out;
}
const fmtSpan = (s) => (s ? `${Math.round(s[0])}–${Math.round(s[1])}` : '—');
function crByBand(value, min, max) {
  // the CR whose [min,max] holds the value; above the top band, the top; between bands, the lower
  let found = CRS[0];
  for (const k of CRS) { const r = TABLE[k]; if (Number(value) >= Number(r[min])) found = k; if (Number(value) >= Number(r[min]) && Number(value) <= Number(r[max])) return k; }
  return found;
}
// THE 2024 CARD (the engine's own budget, card-budgets.mjs mirrored here so this
// script runs under plain node): a 2024 sheet is judged against it, not the DMG
const FRACTIONAL = { 0: { hp: 3, dpr: 2 }, 0.125: { hp: 9, dpr: 4 }, 0.25: { hp: 15, dpr: 6 }, 0.5: { hp: 24, dpr: 8 } };
const roundUp5 = (n) => Math.ceil(n / 5) * 5;
function card2024(cr, legendary) {
  const frac = FRACTIONAL[cr];
  let hp = frac ? frac.hp : (cr <= 20 ? 15 + 15 * cr : 315 + 50 * (cr - 20));
  let dpr = frac ? frac.dpr : (cr <= 20 ? roundUp5(7.5 * cr) : roundUp5(150 + 12.5 * (cr - 20)));
  if (legendary && cr >= 13 && cr <= 17) { hp = Math.round(hp * 0.8); dpr = roundUp5(dpr * 1.45); } else if (legendary) { dpr = roundUp5(dpr * 1.25); }
  return { hp, dpr, atk: 4 + Math.floor(cr / 2), ac: cr < 1 ? Math.round(14 + cr / 3) : Math.floor(15 + cr / 4), dc: 11 + Math.floor(cr / 2) };
}
const stepCR = (k, delta) => { const i = CRS.indexOf(k); return CRS[Math.max(0, Math.min(CRS.length - 1, i + delta))]; };
function dmgCR(p) {
  const defBase = crByBand(p.hp, 'min_hit_points', 'max_hit_points');
  const defRow = TABLE[defBase]; const defAdj = Math.trunc((p.ac - defRow.armor_class) / 2);
  const def = stepCR(defBase, defAdj);
  const offBase = crByBand(Math.round(p.dmgDpr), 'min_damage_per_round', 'max_damage_per_round');
  const offRow = TABLE[offBase];
  const useDc = !p.atkBest && p.dcBest; const offAdj = Math.trunc(((useDc ? p.dcBest - offRow.save_dc : p.atkBest - Number(String(offRow.attack_bonus).replace('+', ''))) || 0) / 2);
  const off = stepCR(offBase, offAdj);
  const finalNum = (crNum(def) + crNum(off)) / 2;
  return { def, off, final: finalNum };
}

let md = `# Numbers check — ${path.basename(dir)}\n\nEvery block is measured by the DMG method and compared to the SRD 5.2 print blocks at its CR measured the same way (the "print" spans: min–max over the blocks at that CR, ±1 CR pooled when fewer than three). Verdict (owner's rule, 2026-10-02): UNDER = reads a CR or more low AND sits under print's damage and HP; hot up to three CRs over is fine; OFF = more than three over.\n\nDMG method per block: defensive CR from HP adjusted by AC (±1 CR per 2 AC off the table), offensive CR from damage per round adjusted by attack bonus or DC (±1 CR per 2 off), final = average. Damage per round is the DMG's three-round figure with the biggest limited-use row counted once (twice for Recharge 4-6 / 2/Day) at two targets when it is an area; sustained alone is shown beside it. "Sustained" = Multiattack count × the best named attack row (always-on riders in, conditional clauses out).\n\n| block | CR | AC (print) | HP (print) | atk (print) | DC (print) | sustained | DMG dpr (print) | def CR | off CR | DMG CR (print reads) | verdict |\n|---|---|---|---|---|---|---|---|---|---|---|---|\n`;
const details = [];
for (const f of fs.readdirSync(dir).filter((x) => /^\d+-.*\.md$/.test(x)).sort()) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  const block = (/### Block\n```\n([\s\S]*?)\n```/.exec(src) ?? [])[1] ?? '';
  const label = f.replace(/^\d+-|\.md$/g, '');
  if (!block) { md += `| ${label} | — | | | | | | | | | | no block |\n`; continue; }
  const p = parseBlock(block);
  const cr = p.cr ? crNum(p.cr) : NaN; const row = rowOf(cr);
  if (!row) { md += `| ${label} | ${p.cr ?? '?'} | ${p.ac} | ${p.hp} | +${p.atkBest} | ${p.dcBest} | ${p.sustained} | ${p.dmgDpr.toFixed(0)} | | | | CR not in table |\n`; continue; }
  const d = dmgCR(p);
  const c = corpusAt(cr);
  const over = d.final - cr;
  // the owner's rule (2026-10-02): underpowered is a defect; hot is fine up to three CRs over; beyond that it is off
  const under = over <= -1 && (!c.dpr || p.dmgDpr < c.dpr[0]) && (!c.hp || p.hp < c.hp[0]);
  const verdict = over > 3 ? `OFF (+${over.toFixed(1)} hot)` : under ? `UNDER (${over.toFixed(1)})` : over <= -1 ? `low (${over.toFixed(1)}; within print's spread)` : over > 1 ? `hot (+${over.toFixed(1)}, fine)` : 'ok';
  md += `| ${label} | ${p.cr}${p.is2014 ? ' (2014)' : ''} | ${p.ac} (${fmtSpan(c.ac)}) | ${p.hp} (${fmtSpan(c.hp)}) | +${p.atkBest} (${fmtSpan(c.atk)}) | ${p.dcBest} (${fmtSpan(c.dc)}) | ${p.sustained} | ${p.dmgDpr.toFixed(0)} (${fmtSpan(c.dpr)}) | ${d.def} | ${d.off} | ${d.final} (print ${fmtSpan(c.read)}, n=${c.n}) | ${verdict} |\n`;
  details.push(`## ${label} (${p.is2014 ? '2014' : '2024'} grammar)\n- sustained: ${p.how}\n- rows read: ${p.attackRows.map((r) => `${r.name} +${r.atk} → ${r.avg}`).join('; ') || 'none'}\n- nova: ${p.nova ? `${p.nova.name} ${p.nova.avg}${p.nova.area ? ' (area, x2 targets)' : ''}` : 'none'}\n- legendary: ${p.legendaryRows.length ? `${p.legendaryRows.length} row(s); best ${p.legendary?.name ?? '?'} ${p.legendary?.avg ?? 0} (three uses a round would add ${(p.legendary?.avg ?? 0) * 3})` : 'none'}`);
}
md += `\n${details.join('\n\n')}\n`;
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, md); console.log(`wrote ${out}`);
