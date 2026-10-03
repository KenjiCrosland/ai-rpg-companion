/**
 * THE 2014 PRINT CORPUS — the SRD 5.1 monsters (src/data/srd-monsters.json), read into the
 * same shape the checker and the card read 2024 print in. The 2014 DMG table was never
 * print: a CR 1 2014 block has 19–37 HP where the table says 71–85 (critic's release audit
 * 2026-10-03), so a 2014 sheet's HP aim and its bands come from here, exactly as a 2024
 * sheet's come from the SRD 5.2 corpus.
 */
import SRD2014 from '@/data/srd-monsters.json';

export const crNum2014 = (s) => { const t = String(s ?? '0').trim().split(/\s/)[0]; return t.includes('/') ? Number(t.split('/')[0]) / Number(t.split('/')[1]) : Number(t); };
const rows = (list) => (list ?? []).map((a) => ({ name: String(a.name ?? ''), text: String(a.description ?? a.text ?? '') }));
export function legacyToBlock(x) {
  return {
    name: x.name, cr: crNum2014(x.challenge_rating), format: '2014',
    hp: Number(/\d+/.exec(String(x.hit_points ?? ''))?.[0] ?? 0), hp_formula: /\(([^)]*)\)/.exec(String(x.hit_points ?? ''))?.[1] ?? '',
    ac: Number(/\d+/.exec(String(x.armor_class ?? ''))?.[0] ?? 10),
    stats: { STR: x.str, DEX: x.dex, CON: x.con, INT: x.int, WIS: x.wis, CHA: x.cha },
    resistances: x.damage_resistances || null, immunities: [x.damage_immunities, x.condition_immunities].filter(Boolean).join('; ') || null, vulnerabilities: x.damage_vulnerabilities || null,
    legendary_uses: (x.legendary_actions ?? []).length ? 3 : 0,
    sections: { Traits: rows(x.abilities), Actions: rows(x.actions), Reactions: rows(x.reactions), 'Legendary Actions': rows(x.legendary_actions) },
  };
}
export const PRINT_2014 = (Array.isArray(SRD2014) ? SRD2014 : []).map(legacyToBlock).filter((b) => Number.isFinite(b.cr) && b.hp > 0);
/** print's HP at a CR: the median at the exact CR when three or more blocks sit there, else pooled one CR either side */
export function hpAim2014(cr) {
  let pool = PRINT_2014.filter((b) => b.cr === cr);
  if (pool.length < 3) pool = PRINT_2014.filter((b) => Math.abs(b.cr - cr) <= 1);
  if (!pool.length) return null;
  const hp = pool.map((b) => b.hp).sort((a, b) => a - b);
  return hp[Math.floor(hp.length / 2)];
}
