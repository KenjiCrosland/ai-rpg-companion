/**
 * parse-treasure.mjs
 *
 * Turns a pasted treasure-hoard block (the kind loot generators spit out) into
 * structured coins + items, so the whole haul lands in one paste instead of
 * coin-by-coin, tile-by-tile. Pure — no DOM, no storage; the composable feeds it
 * the SRD catalog for name matching and writes the result.
 *
 * Recognized line shapes (checked in this order):
 *   "374 Silver"                         → coins (pp/gp/ep/sp/cp)
 *   "3 black jasper worth 50 gp each"    → item ×3, 50 gp each
 *   "1 set of bagpipes (30 gp)"          → item ×1, 30 gp
 *   "Potion of Healing" (repeated)       → item, quantity = repeat count
 *
 * Each item is matched against the catalog by normalized name. A match uses the
 * real template (weight, category, magicType, …). No match with a listed value
 * becomes a Treasure tile (gems/art/trade goods — worth only their gp). No match,
 * no value → a plain custom item.
 */

const METAL_TO_DENOM = {
  platinum: 'pp', plat: 'pp', pp: 'pp',
  gold: 'gp', gp: 'gp',
  electrum: 'ep', ep: 'ep',
  silver: 'sp', sp: 'sp',
  copper: 'cp', cp: 'cp',
};
const UNIT_TO_GP = { pp: 10, gp: 1, ep: 0.5, sp: 0.1, cp: 0.01 };

const COIN_RE = /^(\d[\d,]*)\s+(platinum|plat|pp|gold|gp|electrum|ep|silver|sp|copper|cp)(?:\s+(?:pieces?|coins?|pcs?))?\.?$/i;
// Leading quantity is optional — "ivory bracelet worth 250 gp" is as valid as "3 gems worth 50 gp each".
const WORTH_RE = /^(?:(\d[\d,]*)\s+)?(.+?)\s+worth\s+([\d,.]+)\s*(pp|gp|ep|sp|cp)?\b(?:\s+each)?\.?$/i;
const PAREN_RE = /^(?:(\d[\d,]*)\s+)?(.+?)\s*\(\s*([\d,.]+)\s*(pp|gp|ep|sp|cp)?\s*\)\.?$/i;
const BARE_RE = /^(?:(\d[\d,]*)\s+)?(.+?)\.?$/;

// Container words a loot generator prepends to a real item ("vial of holy water"
// → holy water). Stripped only as a matching fallback, never from the shown name.
const CONTAINER_RE = /^(?:vial|flask|bottle|jar|jug|pot|flagon|pouch|bag|barrel|keg|cask) of /;

const toInt = (s) => parseInt(String(s).replace(/,/g, ''), 10) || 0;
const toNum = (s) => parseFloat(String(s).replace(/,/g, '')) || 0;
const round2 = (n) => Math.round(n * 100) / 100;

/** Clean a parsed item name: drop "(s)" plural markers, collapse whitespace. */
function cleanItemName(name) {
  return String(name || '').replace(/\(s\)/gi, '').replace(/\s+/g, ' ').trim();
}

/** Loose key for catalog matching: lowercase alphanumerics only. */
const matchKey = (name) => String(name || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/** Match key with any trailing "(qualifier)" dropped: "Holy water (flask)" → "holy water". */
const bareKey = (name) => matchKey(String(name || '').replace(/\([^)]*\)/g, ''));

const slug = (name) =>
  String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/**
 * @param {string} text  the pasted block
 * @param {Array}  catalog  SRD templates (gear + magic items) for name matching
 * @returns {{ coins, items, unmatchedCount, coinLines }}
 *   coins: { pp, gp, ep, sp, cp } to ADD to the purse
 *   items: [{ id, name, quantity, category, weight, valueGp, matched, source, ... }]
 */
export function parseTreasure(text, catalog = []) {
  // Index the catalog by full name AND by parenthetical-stripped name, so
  // "Holy water (flask)" is reachable as both "holy water flask" and "holy water".
  const byKey = new Map();
  for (const t of catalog) {
    for (const k of [matchKey(t?.name), bareKey(t?.name)]) {
      if (k && !byKey.has(k)) byKey.set(k, t);
    }
  }

  /** Resolve a parsed name to a catalog template, trying a container-prefix strip. */
  const resolveMatch = (name) => {
    const k = matchKey(name);
    if (byKey.has(k)) return byKey.get(k);
    const unpacked = k.replace(CONTAINER_RE, ''); // "vial of holy water" → "holy water"
    if (unpacked !== k && byKey.has(unpacked)) return byKey.get(unpacked);
    return null;
  };

  const coins = { pp: 0, gp: 0, ep: 0, sp: 0, cp: 0 };
  let coinLines = 0;
  // Merge repeated / identical items, summing quantity. Key = catalog id when
  // matched, else the normalized name (so "Potion of Healing" ×4 → one ×4 tile).
  const items = new Map();

  const addItem = (entry) => {
    const key = entry.id;
    if (items.has(key)) {
      items.get(key).quantity += entry.quantity;
    } else {
      items.set(key, entry);
    }
  };

  for (const rawLine of String(text || '').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;

    // 1. Coins.
    const coin = line.match(COIN_RE);
    if (coin) {
      const denom = METAL_TO_DENOM[coin[2].toLowerCase()];
      if (denom) {
        coins[denom] += toInt(coin[1]);
        coinLines += 1;
        continue;
      }
    }

    // 2. "N name worth X <unit> each".
    let m = line.match(WORTH_RE);
    let quantity = 1;
    let name = '';
    let valueGp = 0;
    if (m) {
      quantity = Math.max(1, toInt(m[1]));
      name = cleanItemName(m[2]);
      valueGp = round2(toNum(m[3]) * (UNIT_TO_GP[(m[4] || 'gp').toLowerCase()] || 1));
    } else if ((m = line.match(PAREN_RE))) {
      // 3. "N name (X <unit>)".
      quantity = Math.max(1, toInt(m[1] || '1'));
      name = cleanItemName(m[2]);
      valueGp = round2(toNum(m[3]) * (UNIT_TO_GP[(m[4] || 'gp').toLowerCase()] || 1));
    } else {
      // 4. Bare name, optional leading quantity.
      m = line.match(BARE_RE);
      quantity = Math.max(1, toInt(m[1] || '1'));
      name = cleanItemName(m[2]);
    }
    if (!name) continue;

    const template = resolveMatch(name);
    if (template) {
      addItem({ ...template, name: template.name, quantity, matched: true });
    } else if (valueGp > 0) {
      // A valuable with a listed price → Treasure tile.
      addItem({
        id: `trs-${slug(name)}`,
        name,
        quantity,
        category: 'Treasure',
        weight: 0,
        valueGp,
        matched: false,
        source: 'custom',
      });
    } else {
      // Unknown, no value → a plain custom item you can edit.
      addItem({
        id: `cst-${slug(name)}`,
        name,
        quantity,
        category: 'Adventuring Gear',
        weight: 0,
        valueGp: 0,
        matched: false,
        source: 'custom',
      });
    }
  }

  const itemList = [...items.values()];
  return {
    coins,
    items: itemList,
    coinLines,
    unmatchedCount: itemList.filter((i) => !i.matched).length,
  };
}
