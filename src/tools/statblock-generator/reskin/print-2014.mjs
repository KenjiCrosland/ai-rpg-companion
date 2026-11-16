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

/**
 * OWNER'S RULING (2026-10-20): AN EXACT NAME ON A 2014 SHEET IS THE 2014 BLOCK.
 * There are two different Vampires in print — the 5.1 one has AC 16 and 144 HP,
 * the 5.2 one 16 and 195 — and a GM who chose 2014 rules and typed "Vampire"
 * was getting the 5.2 creature with 2014 phrasing applied. That is a different
 * monster from the one in their book.
 *
 * The exact path takes NO call in either edition, so this is a lookup, not a
 * pipeline: a whole-name match against the 5.1 corpus returns that block.
 * TWISTS on a 2014 sheet still start from the 5.2 body — the narrow version of
 * the ruling; widening it is a product decision (the critic's 4c).
 */
export const PRINT_2014_RAW = Array.isArray(SRD2014) ? SRD2014 : [];
const norm2014 = (s) => String(s ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
const BY_NAME_2014 = new Map(PRINT_2014_RAW.map((x) => [norm2014(x.name), x]));
/** The raw 5.1 record for a WHOLE name, or null. Case- and space-insensitive; never a partial match. */
export function exact2014Record(name) {
  return BY_NAME_2014.get(norm2014(name)) ?? null;
}
/**
 * The 5.1 record as the 2014 CARD reads it. The corpus is already in the legacy
 * model's shape ({name, description} entry lists, string header fields), so this
 * is a rename and a provenance stamp rather than a conversion — nothing is
 * rephrased, which is the whole point of serving it straight.
 */
export function exact2014Printing(name) {
  const x = exact2014Record(name);
  if (!x) return null;
  const entries = (list) => (list ?? []).map((e) => ({ name: String(e.name ?? ''), description: String(e.description ?? e.text ?? '') }));
  // THE CANONICAL LEGACY FIELD NAMES, which is what every downstream reader
  // expects (2026-10-20). My first cut renamed `type_and_alignment` to
  // `size_type_alignment` and omitted `attributes` and `format` — so the checker
  // read the served Ancient Gold Dragon as an engine-shaped block, found no
  // stats, and failed it for "WIS undefined + PB 2" and "no attack row at all".
  // Found by the regression run, not the gate. The 5.1 corpus already carries
  // these names; passing them through is all that was needed.
  return {
    name: x.name,
    format: '2014',
    type_and_alignment: String(x.type_and_alignment ?? ''),
    attributes: String(x.attributes ?? ''),
    armor_class: String(x.armor_class ?? ''), hit_points: String(x.hit_points ?? ''), speed: String(x.speed ?? '').trim(),
    str: x.str, dex: x.dex, con: x.con, int: x.int, wis: x.wis, cha: x.cha,
    saving_throws: x.saving_throws || '', skills: x.skills || '',
    damage_vulnerabilities: x.damage_vulnerabilities || '', damage_resistances: x.damage_resistances || '',
    damage_immunities: x.damage_immunities || '', condition_immunities: x.condition_immunities || '',
    senses: String(x.senses ?? '').replace(/\s{2,}/g, ' ').trim(), languages: x.languages || '',
    challenge_rating: String(x.challenge_rating ?? ''), proficiency_bonus: String(x.proficiency_bonus ?? ''),
    abilities: entries(x.abilities), actions: entries(x.actions),
    reactions: entries(x.reactions), legendary_actions: entries(x.legendary_actions),
    generation: { path: 'reskin', pipeline: { path: 'exact', print_body: x.name, relation: 'is', class: null, species: null, by: 'code' }, source: 'srd-5.1', calls: 0 },
  };
}
