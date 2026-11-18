// WHAT A REACTION WOULD DO TO THE CR READ, counted once a round — no model (2026-11-18).
//
//   node --import ./scripts/alias-loader.mjs scripts/reaction-price.mjs
//
// The checker's damage read does not count a Reaction at all. This asks what it WOULD read if a
// Reaction's damage were counted once a round, for our sheets and for print's own blocks, so the
// question "count it, cap it, or leave it as print has it" can be answered from print's behaviour
// rather than from taste.
//
// A CAVEAT ON ONE ROW. The detector counts any damage expression in a Reaction's text, and the Stone
// Giant's Deflect Missile REDUCES damage by 11 (1d10 + 6) rather than dealing it — so its +22 is
// overstated and only its redirected attack is real damage. The Riposte rows (Vashka, the veteran
// sellsword, print's Pirate Captain) are the clean cases, and they are the ones the answer rests on.
import fs from 'node:fs';
import { dmgRead } from '@/tools/statblock-generator/reskin/checker.mjs';
const crOf = (j) => { for (const v of [j?.cr, j?.cr_str, j?.selectedChallengeRating, j?.challenge_rating]) { const t = String(v ?? '').trim(); const fr = /^(\d+)\s*\/\s*(\d+)/.exec(t); if (fr) return Number(fr[1]) / Number(fr[2]); const n = /^-?\d+(?:\.\d+)?/.exec(t); if (n) return Number(n[0]); } return NaN; };
const dice = (t) => [...String(t).matchAll(/(\d+)\s*\(\d+d\d+(?:\s*[+-]\s*\d+)?\)/g)].reduce((s, m) => s + Number(m[1]), 0);
/**
 * The read with the Reaction's damage folded in, once a round.
 *
 * My first probe appended a new Action row and mentioned it in the Multiattack; `dmgRead` did not
 * pick it up and every sheet read unchanged, which looks exactly like "a Reaction costs nothing"
 * and was my instrument instead. This adds the damage to the sheet's BIGGEST existing attack
 * expression, which the read certainly counts.
 */
const withRx = (m, add) => {
  const probe = JSON.parse(JSON.stringify(m));
  let best = null;
  for (const es of Object.values(probe.sections ?? {})) for (const e of (es ?? [])) {
    if (!/Attack Roll/.test(String(e?.text ?? ''))) continue;
    const d = dice(e.text); if (!best || d > best.d) best = { e, d };
  }
  if (!best) return null;
  best.e.text = String(best.e.text).replace(/(\d+)(\s*\(\d+d\d+(?:\s*[+-]\s*\d+)?\))/, (m0, n, rest) => `${Number(n) + add}${rest}`);
  try { return dmgRead(probe); } catch { return null; }
};

const look = (label, sheets) => {
  console.log(`\n=== ${label} ===`);
  let n = 0; let moved = 0;
  for (const { name, m, cr } of sheets) {
    const rx = (m.sections?.Reactions ?? []).filter((e) => e?.name);
    if (!rx.length) continue;
    // a Reaction that ATTACKS or DEALS DAMAGE: an attack roll, dice of its own, or the row telling
    // the creature to make one of its own attacks (Riposte's "makes one Longsword attack")
    const attacking = rx.filter((r) => /Attack Roll/.test(String(r.text ?? '')) || dice(r.text) > 0 || /makes? (?:one|a|its) [^.]{0,40}attack/i.test(String(r.text ?? '')));
    if (!attacking.length) continue;
    n += 1;
    // what it adds in a round: its own dice, or — for a row that makes one of the creature's own
    // attacks — that attack's damage, found on the sheet by name
    const add = attacking.reduce((sum, r) => {
      const own = dice(r.text); if (own > 0) return sum + own;
      const named = /makes? (?:one|a|its) ([A-Z][A-Za-z' -]{2,30}?) attack/.exec(String(r.text ?? ''));
      if (!named) return sum;
      const row = Object.values(m.sections ?? {}).flat().find((e) => e?.name && String(e.name).replace(/ \(.*\)$/, '') === named[1].trim());
      return sum + (row ? dice(row.text) : 0);
    }, 0);
    const base = (() => { try { return dmgRead(m); } catch { return null; } })();
    const after = add > 0 ? withRx(m, add) : null;
    const b = base ? (Number(base.off) + Number(base.def)) / 2 : NaN;
    const a = after ? (Number(after.off) + Number(after.def)) / 2 : NaN;
    const leaves = Number.isFinite(a) && Math.abs(a - cr) > 1 && Math.abs(b - cr) <= 1;
    if (leaves) moved += 1;
    console.log(`  ${String(name).slice(0, 26).padEnd(27)} CR ${String(cr).padStart(2)}  off ${String(base?.off ?? '?').padStart(3)} -> ${String(after?.off ?? '—').padStart(3)}   read ${String(b).padStart(5)} -> ${String(Number.isFinite(a) ? a : '—').padStart(5)}  +${add} from ${attacking.map((r) => `"${r.name}"`).join(', ')}${leaves ? '   LEAVES the band of one' : ''}`);
  }
  console.log(`  sheets with a Reaction that attacks or deals damage: ${n}; leaving the band when it is counted: ${moved}`);
};

const D = 'smoke-out/sweep-2026-11-18T14-01-36';
look('the clean forty', fs.readdirSync(D).filter((x) => /^\d+.*\.json$/.test(x)).sort().map((f) => {
  const raw = JSON.parse(fs.readFileSync(`${D}/${f}`, 'utf8'));
  const m = raw.sections ? raw : (raw.other_edition?.sections ? raw.other_edition : raw);
  return { name: f.replace(/\.json$/, ''), m, cr: crOf(raw) };
}));
const raw = JSON.parse(fs.readFileSync('src/data/srd52-monsters.json', 'utf8'));
look("print's own blocks", (Array.isArray(raw) ? raw : Object.values(raw)).map((m) => ({ name: m.name, m, cr: crOf(m) })));
