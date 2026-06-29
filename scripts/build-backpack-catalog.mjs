/**
 * build-backpack-catalog.mjs
 *
 * Dev-only / maintenance script. Transforms the SRD 5.1 equipment list from the
 * 5e-bits/5e-database project (CC-BY-4.0) into the committed catalog the Visual
 * RPG Backpack tool ships with — so there is NO network dependency at runtime or
 * build time. Re-run by hand if the upstream data changes.
 *
 *   node scripts/build-backpack-catalog.mjs
 *
 * Output:
 *  - src/tools/visual-backpack/data/srd-equipment.json — individual gear tiles
 *  - src/tools/visual-backpack/data/srd-packs.json      — starter packs that
 *    EXPAND into their individual contents (the SRD `contents` array, resolved)
 *
 * Transform rules (see plans / parchment-adjacent notes):
 *  - Keep categories: Weapon, Armor, Adventuring Gear, Tools. Drop "Mounts and
 *    Vehicles" (a backpack carries gear, not an elephant).
 *  - Each entry → { id, name, weight, category, size:{w,h}, source:'srd' }.
 *  - `size` is COSMETIC variety in v1 and the forward hook for a future spatial
 *    (Tetris) mode. Assigned by a category + weight heuristic.
 *  - Equipment packs (entries with a `contents` array) are NOT catalog tiles —
 *    a pack is a bundle, not an object. They go to srd-packs.json with each
 *    content line resolved to its catalog item + quantity, so the UI can drop
 *    the real contents in as individual tiles.
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { tileSize } from '../src/tools/visual-backpack/utils/tile-presentation.mjs';

const SRC_URL =
  'https://raw.githubusercontent.com/5e-bits/5e-database/main/src/2014/en/5e-SRD-Equipment.json';
const MAGIC_URL =
  'https://raw.githubusercontent.com/5e-bits/5e-database/main/src/2014/en/5e-SRD-Magic-Items.json';

const KEPT_CATEGORIES = new Set(['Weapon', 'Armor', 'Adventuring Gear', 'Tools']);

const round2 = (n) => Math.round(n * 100) / 100;

/**
 * Magic-item weight. SRD magic items rarely list a weight; when they do
 * ("...weighs 15 pounds"), use it. Otherwise apply cross-edition guidelines:
 * rods/staves are heavier (~5 lb); magic weapons/armor weigh roughly half their
 * mundane counterpart; everything else (potions, rings, scrolls, wands, wondrous
 * items, ammo) is negligible for carry purposes (0). All editable in-app.
 */
function magicWeight(e) {
  const text = (e.desc || []).join(' ');
  const m = text.match(/weighs?\s+([\d.]+)\s*(?:pounds?|lbs?)\b/i);
  if (m) return round2(parseFloat(m[1]));
  const cat = e.equipment_category?.name;
  if (cat === 'Rod' || cat === 'Staff') return 5;
  if (cat === 'Weapon') return 2; // ~half a typical weapon
  if (cat === 'Armor') return 20; // ~half typical armor (rough)
  return 0;
}

// --- description / mechanics builders -------------------------------------

function describeWeapon(e) {
  const parts = [];
  const kind = [e.weapon_category, e.weapon_range].filter(Boolean).join(' ');
  if (kind) parts.push(`${kind} weapon.`);
  if (e.damage) {
    parts.push(`Damage: ${e.damage.damage_dice} ${e.damage.damage_type?.name || ''}`.trim() + '.');
  }
  if (e.two_handed_damage) {
    parts.push(`Two-handed: ${e.two_handed_damage.damage_dice} ${e.two_handed_damage.damage_type?.name || ''}`.trim() + '.');
  }
  if (e.properties?.length) parts.push('Properties: ' + e.properties.map((p) => p.name).join(', ') + '.');
  if (e.range && (e.range.normal || e.range.long)) {
    parts.push(`Range: ${e.range.normal}${e.range.long ? `/${e.range.long}` : ''} ft.`);
  }
  return parts.join(' ');
}

/** True when the weapon has the SRD "Two-Handed" property (needs both hands —
 *  distinct from a versatile weapon, which CAN use two hands but is one-handed). */
function isTwoHandedWeapon(e) {
  return (e.properties || []).some((p) => /two-handed/i.test(p.name));
}

function describeArmor(e) {
  const parts = [];
  if (e.armor_category) parts.push(`${e.armor_category} armor.`);
  if (e.armor_class) {
    const ac = e.armor_class;
    let s = `AC ${ac.base}`;
    if (ac.dex_bonus) s += ` + Dex${ac.max_bonus ? ` (max ${ac.max_bonus})` : ''}`;
    parts.push(s + '.');
  }
  if (e.str_minimum) parts.push(`Requires Strength ${e.str_minimum}.`);
  if (e.stealth_disadvantage) parts.push('Disadvantage on Stealth checks.');
  return parts.join(' ');
}

function describeEquipment(e) {
  if (e.desc?.length) return e.desc.join('\n\n');
  const cat = e.equipment_category?.name;
  if (cat === 'Weapon') return describeWeapon(e);
  if (cat === 'Armor') return describeArmor(e);
  return '';
}

async function main() {
  const here = dirname(fileURLToPath(import.meta.url));
  const outDir = join(here, '..', 'src', 'tools', 'visual-backpack', 'data');
  const itemsFile = join(outDir, 'srd-equipment.json');
  const packsFile = join(outDir, 'srd-packs.json');

  process.stdout.write(`Fetching ${SRC_URL}\n`);
  const res = await fetch(SRC_URL);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  const raw = await res.json();

  const items = [];
  const packEntries = [];
  let dropped = 0;
  const stillMissing = [];

  for (const e of raw) {
    const category = e.equipment_category?.name;
    if (!KEPT_CATEGORIES.has(category)) {
      dropped += 1;
      continue;
    }

    // Packs are bundles, not tiles — collect them for the packs file instead.
    if (Array.isArray(e.contents) && e.contents.length) {
      packEntries.push(e);
      continue;
    }

    let weight = e.weight;
    if (typeof weight !== 'number') {
      weight = 1; // long-tail fallback; user can edit
      stillMissing.push(e.name);
    }

    items.push({
      id: e.index,
      name: e.name,
      weight,
      category,
      size: tileSize({ name: e.name, category, weight }),
      source: 'srd',
      description: describeEquipment(e),
      // Hand occupancy for the paper doll (weapons only).
      ...(category === 'Weapon' ? { twoHanded: isTwoHandedWeapon(e) } : {}),
    });
  }

  // Resolve packs against the GEAR catalog (built above) before adding magic.
  const itemsById = new Map(items.map((i) => [i.id, i]));

  // --- magic items (separate SRD file) ------------------------------------
  process.stdout.write(`Fetching ${MAGIC_URL}\n`);
  const magicRes = await fetch(MAGIC_URL);
  if (!magicRes.ok) throw new Error(`Magic fetch failed: ${magicRes.status}`);
  const magicRaw = await magicRes.json();
  for (const e of magicRaw) {
    const weight = magicWeight(e);
    // Attunement lives in the first desc line: "...rarity (requires attunement[ by …])".
    const att = ((e.desc || [])[0] || '').match(/\(requires attunement([^)]*)\)/i);
    items.push({
      id: `mi-${e.index}`, // namespaced so it can't collide with gear ids
      name: e.name,
      weight,
      category: 'Magic Item',
      size: tileSize({ name: e.name, category: 'Magic Item', weight }),
      source: 'srd',
      description: (e.desc || []).join('\n\n'),
      rarity: e.rarity?.name || '',
      magicType: e.equipment_category?.name || '', // Ring / Weapon / Wondrous Items / …
      requiresAttunement: !!att,
      attunementNote: att ? att[1].trim() : '',
    });
  }

  items.sort((a, b) =>
    a.category === b.category
      ? a.name.localeCompare(b.name)
      : a.category.localeCompare(b.category),
  );

  // Resolve each pack's contents against the gear catalog (itemsById, above).
  const unresolved = [];
  const packs = packEntries
    .map((e) => {
      const contents = [];
      for (const c of e.contents) {
        const ref = itemsById.get(c.item?.index);
        if (!ref) {
          unresolved.push(`${e.name} → ${c.item?.index}`);
          continue;
        }
        contents.push({
          id: ref.id,
          name: ref.name,
          weight: ref.weight, // unit weight
          category: ref.category,
          size: ref.size,
          quantity: Number(c.quantity) || 1,
          description: ref.description || '',
        });
      }
      return {
        id: e.index,
        name: e.name,
        itemCount: contents.length,
        totalWeight: round2(contents.reduce((s, c) => s + c.weight * c.quantity, 0)),
        contents,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  await mkdir(outDir, { recursive: true });
  await writeFile(itemsFile, JSON.stringify(items, null, 2) + '\n', 'utf8');
  await writeFile(packsFile, JSON.stringify(packs, null, 2) + '\n', 'utf8');

  const byCat = {};
  for (const i of items) byCat[i.category] = (byCat[i.category] || 0) + 1;
  process.stdout.write(`Wrote ${items.length} items → ${itemsFile}\n`);
  process.stdout.write(`Wrote ${packs.length} packs → ${packsFile}\n`);
  process.stdout.write(`Dropped ${dropped} (mounts/vehicles & other)\n`);
  process.stdout.write(`By category: ${JSON.stringify(byCat)}\n`);
  process.stdout.write(
    `Packs: ${packs.map((p) => `${p.name} (${p.itemCount} items, ${p.totalWeight} lb)`).join('; ')}\n`,
  );
  if (unresolved.length) {
    process.stdout.write(`UNRESOLVED pack contents: ${unresolved.join(', ')}\n`);
  }
  if (stillMissing.length) {
    process.stdout.write(
      `Weight defaulted to 1 for ${stillMissing.length}: ${stillMissing.join(', ')}\n`,
    );
  }
}

main().catch((err) => {
  process.stderr.write(String(err?.stack || err) + '\n');
  process.exit(1);
});
