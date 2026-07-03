/**
 * parse-treasure.mjs
 *
 * Turns a pasted treasure-hoard block (the kind loot generators spit out) into
 * structured coins + items, so the whole haul lands in one paste instead of
 * coin-by-coin, tile-by-tile. Pure — no DOM, no storage; the composable feeds it
 * the SRD catalog for name matching and writes the result.
 *
 * The DMG hoard format is HIERARCHICAL, not flat: a value-group header sets a
 * per-unit worth that the item lines beneath it inherit until the next header or
 * a blank line. So the parser is stateful — it carries a "current group value"
 * as it walks the lines:
 *
 *   "10 gp gemstones (×4; worth 40 gp total):"   ← header: sets 10 gp
 *     Azurite (opaque mottled deep blue)          ← inherits 10 gp
 *     Moss agate (…), ×2                           ← inherits 10 gp, qty 2
 *   "25 gp art objects (×4; worth 100 gp total):" ← header: sets 25 gp
 *     Gold locket …                                ← inherits 25 gp
 *   "5 mundane items:"                            ← header: valueless group
 *     A kneeling bench …                           ← no value (flavor loot)
 *   "Magic Items (Table A)"                       ← header: valueless (GM-priced)
 *     Potion of Healing (Rolled 19) [reroll]       ← roll-noise stripped, matched
 *
 * Summary/total lines ("A total of 837 gp …", "447 gp in coinage:") are skipped —
 * the tool recomputes those. Coin breakdown lines (110 gp / 3,000 sp / 3,700 cp)
 * feed the purse.
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
// "5 mundane items:" / "Mundane:" — a valueless flavor group.
const MUNDANE_SECTION_RE = /^(?:\d+\s+)?mundane\b/i;
// Magic-item section headers — either DMG "Magic Items (Table A)" or the donjon
// rarity tiers ("Legendary items (×1):", "Very Rare items (×2):", "Major items:").
const MAGIC_SECTION_RE = /^(?:magic|major|minor|legendary|very rare|rare|uncommon|common)\s+items?\b/i;
// A leading quantity, optionally with donjon's "x"/"×" multiplier ("3 bottles of
// wine", "2 x agate"), or a trailing count ("Moss agate, ×2"). The "x" must be a
// standalone token (space after) so it can't eat the start of a word like "xorn".
const LEAD_QTY_RE = /^(\d[\d,]*)\s+(?:[×x]\s+)?(.+)$/i;
const TRAIL_QTY_RE = /[,;]?\s*[×xX]\s*(\d+)\s*$/;
const WORTH_RE = /^(?:(\d[\d,]*)\s+(?:[×x]\s+)?)?(.+?)\s+worth\s+([\d,.]+)\s*(pp|gp|ep|sp|cp)?\b(?:\s+each)?\.?$/i;
const PAREN_RE = /^(?:(\d[\d,]*)\s+(?:[×x]\s+)?)?(.+?)\s*\(\s*([\d,.]+)\s*(pp|gp|ep|sp|cp)?\s*\)\.?$/i;

// Container words a loot generator prepends to a real item ("vial of holy water"
// → holy water). Stripped only as a matching fallback, never from the shown name.
const CONTAINER_RE = /^(?:vial|flask|bottle|jar|jug|pot|flagon|pouch|bag|barrel|keg|cask) of /;

// When a hoard is copied as text, the generator's interactive spell-scroll widget
// lands as loose fragment lines. These are pure UI cruft — never loot:
const NOISE_RE = /^(?:[()[\]{}]+|\[?\s*reroll\s*\]?|\(?\s*rolled\b[^)]*\)?|-or-|see all\b.*)$/i;
// "Spell Scroll (5th Level) (" — a trailing "(" means the spell name follows on a
// later line; we emit "Spell Scroll (<that spell>)" once we reach it.
const SCROLL_OPEN_RE = /^spell scroll\b.*\(\s*$/i;

// A trailing "(rarity, source page)" tag donjon appends to magic items, e.g.
// "Horseshoes of a Zephyr (very rare, dmg 175)" — metadata, not part of the name.
const META_PAREN_RE = /\s*\((?:[^)]*\b(?:common|uncommon|rare|very rare|legendary|artifact|dmg|phb|xge|tce|scag|ftd|erlw|mm)\b[^)]*)\)\s*$/i;

// An inline label prefix ("Coins: 88 pp, …", "Gems: …") — strip it; the list follows.
const LABEL_RE = /^(?:coins?|coinage|currency|gems?|treasure|loot|valuables?)\s*:\s*/i;
// A list bullet at the start of a line ("- a silver ewer", "• …").
const BULLET_RE = /^[-*•–—]\s+/;
// A prose summary/total line to ignore ("A hoard totaling … in value.").
const SUMMARY_RE = /^a\s+(?:hoard|total)\b|\bin value\b/i;
// A leading "×N name" multiplier ("×2 tiger eye" → qty 2, "tiger eye").
const LEAD_MULT_RE = /^[×x]\s*(\d+)\s+(.+)$/i;
// A trailing count in parens: "(×3)" or "(20 arrows)" → quantity (never "(25 gp)"
// or "(3rd level)"; those aren't a bare number-then-close or number+ammo-noun).
const COUNT_PAREN_RE = /\(\s*(?:[×x]\s*(\d[\d,]*)|(\d[\d,]*)\s+(?:arrows?|bolts?|bullets?|needles?|darts?|stones?|shots?|rounds?|pieces?))\s*\)\s*$/i;

/**
 * Split a line on TOP-LEVEL list separators — a semicolon, or a comma FOLLOWED BY
 * whitespace. Requiring the space after a comma preserves thousands separators
 * ("1,204" stays one token) and only splits real list commas ("88 pp, 1,204 gp").
 * Separators inside "(...)" are ignored.
 */
function splitTopLevelList(line) {
  const out = [];
  let depth = 0;
  let cur = '';
  const chars = [...line];
  for (let i = 0; i < chars.length; i += 1) {
    const ch = chars[i];
    if (ch === '(') depth += 1;
    else if (ch === ')') depth = Math.max(0, depth - 1);
    const isSep = depth === 0 && (ch === ';' || (ch === ',' && /\s/.test(chars[i + 1] ?? ' ')));
    if (isSep) {
      out.push(cur.trim());
      cur = '';
    } else {
      cur += ch;
    }
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

/**
 * Is this a value-group header? Recognizes the phrasings loot generators use for
 * "these items are each worth N gp":
 *   "10 gp gemstones (×4):"            (value leads)
 *   "Gemstones (10 gp each, ×3): …"    (value in parens, "each")
 *   "500 gp gems (2): …"               (value leads)
 *   "art objects worth 250 gp apiece"  (value mid, "apiece")
 * Returns { value, rest } (rest = same-line items after ":") or null. A lump-sum
 * line ("Assorted gems totaling 1,750 gp") is NOT a header — it has no colon, no
 * "each/apiece", and doesn't lead with the value.
 */
function detectValueHeader(line) {
  if (!/\b(?:gemstones?|gems?|art\s*objects?|jewell?ery)\b/i.test(line)) return null;
  const vm = line.match(/([\d,]+)\s*gp\b/i);
  if (!vm) return null;
  const hasEach = /\b(?:each|apiece|a piece|per)\b/i.test(line);
  const valueLeads = /^\s*[\d,]+\s*gp\s+(?:gemstones?|gems?|art\s*objects?|jewell?ery)\b/i.test(line);
  const colon = line.indexOf(':');
  if (colon < 0 && !hasEach && !valueLeads) return null;
  return { value: toNum(vm[1]), rest: colon >= 0 ? line.slice(colon + 1).trim() : '' };
}
// A comma-segment that reads like a coin or a priced/rarity item.
const SEG_VALUE_RE = /\(\s*[\d,.]+\s*(?:pp|gp|ep|sp|cp)?\s*\)\s*$/i;
const looksTreasureLike = (seg) => COIN_RE.test(seg) || SEG_VALUE_RE.test(seg) || META_PAREN_RE.test(seg);

const toInt = (s) => parseInt(String(s).replace(/,/g, ''), 10) || 0;
const toNum = (s) => parseFloat(String(s).replace(/,/g, '')) || 0;
const round2 = (n) => Math.round(n * 100) / 100;

/**
 * Normalize a line: drop invisible characters (soft-hyphen U+00AD, zero-width
 * spaces, BOM) that copy-paste smuggles in — they silently break name matching —
 * then collapse a markdown link "[Mending](https://…)" down to its text.
 */
const stripMarkdownLinks = (s) =>
  String(s || '')
    .replace(/[­​‌‍﻿]/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');

/** Clean a parsed item name: drop "(s)" plural markers, collapse whitespace. */
const cleanItemName = (name) => String(name || '').replace(/\(s\)/gi, '').replace(/\s+/g, ' ').trim();

/** Strip a trailing "(colour/描述)" qualifier — used on gems: "Azurite (deep blue)" → "Azurite". */
const stripTrailingParen = (name) => String(name || '').replace(/\s*\([^)]*\)\s*$/, '').trim();

/** Strip loot-generator roll noise + attunement annotations from a magic-item line. */
const stripRollNoise = (name) =>
  String(name || '')
    .replace(/\[[^\]]*\]/g, ' ') // "[reroll]", "[requires attunement]" — any bracketed note
    .replace(/\(\s*rolled[^)]*\)/gi, ' ')
    .replace(/\([^)]*(?:reroll|-or-|see all)[^)]*\)/gi, ' ') // parenthetical tool-cruft
    .replace(/\s*[—–-]\s*(?:requires\s+)?attunement\b.*$/i, '') // "— attunement", "- requires attunement"
    .replace(/\s+/g, ' ')
    .trim();

/** Loose key for catalog matching: lowercase alphanumerics only. */
const matchKey = (name) => String(name || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
/** Match key with any trailing "(qualifier)" dropped: "Holy water (flask)" → "holy water". */
const bareKey = (name) => matchKey(String(name || '').replace(/\([^)]*\)/g, ''));
const slug = (name) => String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** Build a name→template resolver over the catalog (exact, paren-stripped, or container-stripped). */
function makeResolveMatch(catalog) {
  const byKey = new Map();
  for (const t of catalog) {
    for (const k of [matchKey(t?.name), bareKey(t?.name)]) {
      if (k && !byKey.has(k)) byKey.set(k, t);
    }
  }
  // Reorderings loot generators introduce, tried in combination with each other:
  //  - a leading bonus:  "+2 Ammunition" → "Ammunition +2"
  //  - a comma variant:  "Figurine …, Marble Elephant" → "Marble Elephant Figurine …"
  const reorderings = (s) => {
    const out = [s];
    const bonus = s.match(/^([+-]\d+)\s+(.+)$/);
    if (bonus) out.push(`${bonus[2]} ${bonus[1]}`);
    const comma = s.match(/^(.+?),\s*(.+)$/);
    if (comma) out.push(`${comma[2]} ${comma[1]}`);
    return out;
  };
  return (name) => {
    // Compose the transforms: the name as-is AND with "(qualifier)" tails dropped,
    // each then bonus/comma-reordered — so "+2 Ammunition (20 arrows)" reaches
    // "Ammunition +2", which matches the catalog's "Ammunition, +2".
    const bare = name.replace(/\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();
    const variants = [...reorderings(name), ...(bare && bare !== name ? reorderings(bare) : [])];
    for (const v of variants) {
      const k = matchKey(v);
      if (byKey.has(k)) return byKey.get(k);
      const unpacked = k.replace(CONTAINER_RE, '');
      if (unpacked !== k && byKey.has(unpacked)) return byKey.get(unpacked);
    }
    return null;
  };
}

const MAGIC_RARITIES = new Set(['common', 'uncommon', 'rare', 'very rare', 'legendary', 'artifact']);

/**
 * Parse a structured loot-generator JSON export (donjon / 5etools shape:
 * `{ currency, entityInfos: [{ entity, options }] }`). Far more reliable than the
 * text dump — coins are exact, `entity.value` is copper, and each item's kind is
 * explicit — so there's no roll-noise or spell-scroll-widget junk to scrub.
 */
function parseTreasureJson(data, resolveMatch) {
  const coins = { pp: 0, gp: 0, ep: 0, sp: 0, cp: 0 };
  const cur = data.currency || {};
  for (const d of ['pp', 'gp', 'ep', 'sp', 'cp']) coins[d] = Math.max(0, Math.floor(Number(cur[d]) || 0));

  const items = new Map();
  const addItem = (entry) => {
    if (items.has(entry.id)) items.get(entry.id).quantity += entry.quantity;
    else items.set(entry.id, entry);
  };

  for (const ei of Array.isArray(data.entityInfos) ? data.entityInfos : []) {
    const e = ei?.entity || {};
    const name = String(e.name || '').trim();
    if (!name) continue;
    const quantity = Math.max(1, Math.floor(Number(ei?.options?.quantity) || 1));
    const types = (e._typeListText || []).join(' ').toLowerCase();
    const rarity = String(e.rarity || '').toLowerCase();

    if (types.includes('treasure')) {
      // Gems / art objects — entity.value is in copper (1000 cp = 10 gp), per unit.
      addItem({
        id: `trs-${slug(name)}`, name, quantity, category: 'Treasure',
        weight: 0, valueGp: round2((Number(e.value) || 0) / 100), matched: false, source: 'custom',
      });
    } else if (e.__prop === 'spell') {
      // A spell in a hoard is a Spell Scroll of that spell.
      const scrollName = `Spell Scroll (${name})`;
      const t = resolveMatch(scrollName) || resolveMatch(name);
      if (t) addItem({ ...t, name: t.name, quantity, matched: true });
      else addItem({ id: `mag-${slug(scrollName)}`, name: scrollName, quantity, category: 'Magic Item', weight: 0, valueGp: 0, matched: false, source: 'custom' });
    } else if (MAGIC_RARITIES.has(rarity)) {
      const t = resolveMatch(name);
      if (t) addItem({ ...t, name: t.name, quantity, matched: true });
      else addItem({ id: `mag-${slug(name)}`, name, quantity, category: 'Magic Item', weight: 0, valueGp: 0, matched: false, source: 'custom' });
    } else {
      // Mundane flavor loot (rarity "unknown"/none, no value) — match if we can; an
      // unrecognized line is Misc, not gear (a poem-scroll isn't adventuring equipment).
      const t = resolveMatch(name);
      if (t) addItem({ ...t, name: t.name, quantity, matched: true });
      else addItem({ id: `cst-${slug(name)}`, name, quantity, category: 'Misc', weight: 0, valueGp: 0, matched: false, source: 'custom' });
    }
  }

  const itemList = [...items.values()];
  return {
    coins,
    items: itemList,
    coinLines: ['pp', 'gp', 'ep', 'sp', 'cp'].filter((d) => coins[d] > 0).length,
    unmatchedCount: itemList.filter((i) => !i.matched).length,
    unrecognized: [],
  };
}

/**
 * @param {string} text  the pasted block — a loot-generator JSON export OR a text dump
 * @param {Array}  catalog  SRD templates (gear + magic items) for name matching
 * @returns {{ coins, items, coinLines, unmatchedCount, unrecognized }}
 */
export function parseTreasure(text, catalog = []) {
  const resolveMatch = makeResolveMatch(catalog);

  // Structured JSON export? Parse it directly — far cleaner than the text dump.
  const trimmed = String(text || '').trim();
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      const data = JSON.parse(trimmed);
      if (data && (data.currency || Array.isArray(data.entityInfos))) {
        return parseTreasureJson(data, resolveMatch);
      }
    } catch {
      // Not valid JSON — fall through to the text parser.
    }
  }

  const coins = { pp: 0, gp: 0, ep: 0, sp: 0, cp: 0 };
  let coinLines = 0;
  const items = new Map();
  const unrecognized = [];
  const addItem = (entry) => {
    if (items.has(entry.id)) items.get(entry.id).quantity += entry.quantity;
    else items.set(entry.id, entry);
  };

  // Stateful group context: a value-group header sets `groupValue` (per-unit gp)
  // and `groupTreasure`; a "Magic Items" header sets `groupMagic` (unmatched lines
  // stay Magic Items, GM-priced). All reset on blank lines / new headers.
  let groupValue = 0;
  let groupTreasure = false;
  let groupMagic = false;
  let pendingScroll = false; // saw a "Spell Scroll (…) (" line; the spell follows
  let widgetDepth = 0; // inside a "( … )" alternatives/roll widget → skip its lines
  const resetGroup = () => {
    groupValue = 0;
    groupTreasure = false;
    groupMagic = false;
    pendingScroll = false;
  };

  // Turn one item line into an entry (used for standalone lines AND for the items
  // a value-header carries on its own line). Reads the current group context.
  const emitItem = (rawItem) => {
    const line = String(rawItem || '').trim();
    if (!line) return;
    let quantity = 1;
    let name = '';
    let valueGp = 0;
    let segLooksMagic = false; // a "(very rare, …)" tag marks a loose line as magic
    let m;
    if ((m = line.match(WORTH_RE))) {
      quantity = Math.max(1, toInt(m[1] || '1'));
      name = cleanItemName(m[2]);
      valueGp = round2(toNum(m[3]) * (UNIT_TO_GP[(m[4] || 'gp').toLowerCase()] || 1));
    } else if ((m = line.match(PAREN_RE))) {
      quantity = Math.max(1, toInt(m[1] || '1'));
      name = cleanItemName(m[2]);
      valueGp = round2(toNum(m[3]) * (UNIT_TO_GP[(m[4] || 'gp').toLowerCase()] || 1));
    } else {
      // Bare line: trailing "×N", leading "×N name", or leading "N [x] name".
      const trail = line.match(TRAIL_QTY_RE);
      const lead = line.match(LEAD_MULT_RE);
      if (trail) {
        quantity = Math.max(1, toInt(trail[1]));
        name = line.replace(TRAIL_QTY_RE, '').trim();
      } else if (lead) {
        quantity = Math.max(1, toInt(lead[1]));
        name = lead[2].trim();
      } else if ((m = line.match(LEAD_QTY_RE))) {
        quantity = Math.max(1, toInt(m[1]));
        name = m[2].trim();
      } else {
        name = line;
      }
      name = cleanItemName(name);
      // A trailing "(×3)" or "(20 arrows)" is a count, not a value → use as qty.
      const cnt = name.match(COUNT_PAREN_RE);
      if (cnt) {
        quantity = Math.max(1, toInt(cnt[1] || cnt[2]));
        name = name.replace(/\([^)]*\)\s*$/, '').trim();
      }
      if (groupTreasure) {
        // Gems/art inherit the header's value; drop the colour-description paren.
        valueGp = groupValue;
        name = stripTrailingParen(name);
      } else {
        // Drop a trailing "(very rare, dmg 175)" tag — metadata, and a magic tell.
        if (META_PAREN_RE.test(name)) {
          name = name.replace(META_PAREN_RE, '').trim();
          segLooksMagic = true;
        }
        // Magic / mundane / loose lines: scrub roll noise + attunement notes.
        name = stripRollNoise(name);
      }
    }
    if (!name) return;
    if (!/[a-z0-9]/i.test(name)) return; // only punctuation/brackets left (widget cruft)
    if (/^[×x]*\s*\d[\d,]*\s*[×x]*$/i.test(name)) return; // a bare count token ("1×", "28")
    if (/-or-|see all/i.test(name)) {
      unrecognized.push(line); // couldn't confidently clean → set aside for the user
      return;
    }

    const template = resolveMatch(name);
    if (template) {
      addItem({ ...template, name: template.name, quantity, matched: true });
    } else if (valueGp > 0) {
      addItem({ id: `trs-${slug(name)}`, name, quantity, category: 'Treasure', weight: 0, valueGp, matched: false, source: 'custom' });
    } else {
      // An unmatched line under a "Magic Items" header, or one tagged with a
      // rarity, is still a (GM-priced) magic item; anything else is unrecognized Misc.
      const isMagic = groupMagic || segLooksMagic;
      addItem({ id: `${isMagic ? 'mag' : 'cst'}-${slug(name)}`, name, quantity, category: isMagic ? 'Magic Item' : 'Misc', weight: 0, valueGp: 0, matched: false, source: 'custom' });
    }
  };

  // Expand donjon's flat "300 cp, 2500 gp, a bone comb (25 gp), …" lists: a line of
  // ≥3 list segments where several read as coins/priced items is split into one
  // logical line per token (a leading "Coins:" label is dropped first; separators
  // inside "(…)" are respected). A one-off comma in an item name stays intact.
  const logicalLines = [];
  for (const raw of String(text || '').split(/\r?\n/)) {
    const t = stripMarkdownLinks(raw).trim().replace(LABEL_RE, '');
    const segs = splitTopLevelList(t);
    if (segs.length >= 3 && segs.filter(looksTreasureLike).length >= 2) {
      logicalLines.push(...segs);
    } else {
      logicalLines.push(raw);
    }
  }

  for (const rawLine of logicalLines) {
    const line = stripMarkdownLinks(rawLine).trim().replace(LABEL_RE, '').replace(BULLET_RE, '').trim();
    if (!line) {
      resetGroup();
      widgetDepth = 0;
      continue;
    }

    // A lone "(" opens an alternatives/roll widget ("Arrow of Slaying (*)" then a
    // "( … Crossbow Bolt of Slaying )" choice); skip everything through its ")".
    if (line === '(') { widgetDepth += 1; continue; }
    if (line === ')') { widgetDepth = Math.max(0, widgetDepth - 1); continue; }
    if (widgetDepth > 0) continue;

    // 1. Value-group header (gems/art with a per-unit value, any phrasing). Any
    //    items on the SAME line after ":" are emitted now in the group's context.
    const header = detectValueHeader(line);
    if (header) {
      resetGroup();
      groupValue = header.value;
      groupTreasure = true;
      if (header.rest) for (const seg of splitTopLevelList(header.rest)) emitItem(seg);
      continue;
    }
    // 2. Section header — mundane (valueless flavor) or magic (DMG table / rarity tier).
    if (MUNDANE_SECTION_RE.test(line) || MAGIC_SECTION_RE.test(line)) {
      resetGroup();
      groupMagic = MAGIC_SECTION_RE.test(line);
      continue;
    }
    // 3. Prose summary / total / label lines → skip (the tool recomputes totals).
    if (SUMMARY_RE.test(line) || /:$/.test(line)) {
      resetGroup();
      continue;
    }

    // 3b. Spell-scroll widget fragments (from copying the dump as text).
    if (SCROLL_OPEN_RE.test(line)) {
      pendingScroll = true;
      continue;
    }
    if (NOISE_RE.test(line)) continue; // "(", ")", "[reroll]", "-or-", "see all …"
    if (pendingScroll) {
      // The first real line after "Spell Scroll (…) (" is the scroll's spell.
      pendingScroll = false;
      const spell = cleanItemName(stripRollNoise(line));
      if (spell) {
        const scrollName = `Spell Scroll (${spell})`;
        const t = resolveMatch(scrollName) || resolveMatch(spell);
        if (t) addItem({ ...t, name: t.name, quantity: 1, matched: true });
        else addItem({ id: `mag-${slug(scrollName)}`, name: scrollName, quantity: 1, category: 'Magic Item', weight: 0, valueGp: 0, matched: false, source: 'custom' });
      }
      continue;
    }

    // 4. A coin line ("110 gp", "3,000 sp") — exact match only, so a group header
    //    like "10 gp gemstones …" never counts as coinage.
    const coin = line.match(COIN_RE);
    if (coin) {
      const denom = METAL_TO_DENOM[coin[2].toLowerCase()];
      if (denom) {
        coins[denom] += toInt(coin[1]);
        coinLines += 1;
        continue;
      }
    }

    // 5. Otherwise it's an item line.
    emitItem(line);
  }

  const itemList = [...items.values()];
  return {
    coins,
    items: itemList,
    coinLines,
    unmatchedCount: itemList.filter((i) => !i.matched).length,
    unrecognized,
  };
}
