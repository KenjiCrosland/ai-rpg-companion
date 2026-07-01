import { ref, computed, watch } from 'vue';
import srdEquipment from '../data/srd-equipment.json';
import srdPacks from '../data/srd-packs.json';
import {
  loadBackpack,
  saveBackpack,
  makeInstanceId,
  fromJSON,
  defaultCharacter,
} from '../utils/backpack-storage.mjs';
import { useCarryCapacity } from './useCarryCapacity.js';
import {
  coinWeight,
  coinValueGp,
  totalWeight,
  totalCoins,
  canAfford,
  spendCoins,
  formatCost,
} from '../utils/carry-capacity.mjs';
import { expandPackToTemplates } from '../utils/pack-expansion.mjs';
import { parseTreasure } from '../utils/parse-treasure.mjs';
import {
  tileSize,
  cleanName,
  equipSlot,
  equipTargets,
  isTwoHanded,
  isBagOfHolding,
  EQUIP_SLOTS,
} from '../utils/tile-presentation.mjs';

const MAX_ATTUNEMENT = 3;
const BAG_CAPACITY = 500; // lb — a bag of holding holds up to 500 lb (SRD)
const COIN_ID = '__coins__'; // the synced coin-purse marker (one per character)
const SLOT_LABEL = Object.fromEntries(EQUIP_SLOTS.map((s) => [s.id, s.label]));
import {
  resolvePosition,
  placeItemAt,
  packItems,
  collidesAny,
  findStackTarget,
  clampPos,
  COLS,
} from '../utils/grid-layout.mjs';

const MIN_STR = 1;
const MAX_STR = 30;
const clampStr = (v) => Math.min(MAX_STR, Math.max(MIN_STR, Math.round(Number(v) || MIN_STR)));

const slug = (name) =>
  String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

/** Build a fresh placed instance from a catalog template. */
function instantiate(template) {
  const weight = Number(template.weight) || 0;
  const quantity = Math.max(1, Math.floor(Number(template.quantity) || 1));
  const category = template.category || 'Adventuring Gear';
  const name = template.name;
  return {
    instanceId: makeInstanceId(),
    id: template.id,
    name,
    weight,
    quantity,
    category,
    // Size always derives from the item's own (effective) weight.
    size: tileSize({ name, category, weight, quantity }),
    description: template.description || '',
    // Treasure/valuable worth (gp) — 0 for ordinary gear; drives the wealth total.
    valueGp: Number(template.valueGp) || 0,
    rarity: template.rarity || '',
    magicType: template.magicType || '',
    requiresAttunement: !!template.requiresAttunement,
    attunementNote: template.attunementNote || '',
    equippedSlot: null,
    attuned: false,
    inBagId: null,
    source: template.source === 'srd' ? 'srd' : 'custom',
    ...(typeof template.twoHanded === 'boolean' ? { twoHanded: template.twoHanded } : {}),
  };
}

// Pack any GRID items missing a position; bag-stashed items (inBagId) stay off-grid.
const ensurePositions = (list) => {
  if (!list.some((i) => !i.inBagId && !i.pos)) return list;
  const bagged = list.filter((i) => i.inBagId);
  const grid = list.filter((i) => !i.inBagId);
  return [...packItems(grid, COLS), ...bagged];
};

// Drop dangling bag references (stashed in a bag that no longer exists → back to pack).
const sweepBags = (list) => {
  const bagIds = new Set(list.filter(isBagOfHolding).map((i) => i.instanceId));
  return list.map((i) => (i.inBagId && !bagIds.has(i.inBagId) ? { ...i, inBagId: null } : i));
};

// Heal saved SRD items that predate the magicType/attunement fields — without it
// they carry an empty magicType, so equipSlot() returns null and no Equip button
// appears. Match the current catalog by id and fill only when the stored field is
// empty, so user edits are never clobbered.
const backfillFromCatalog = (list) => {
  const byId = new Map(srdEquipment.map((t) => [t.id, t]));
  const byName = new Map(srdEquipment.map((t) => [t.name, t]));
  return list.map((it) => {
    if (it.source !== 'srd') return it;
    const t = byId.get(it.id) || byName.get(it.name); // id first, name fallback if ids drifted
    if (!t) return it;
    const patch = {};
    if (!it.magicType && t.magicType) {
      patch.magicType = t.magicType;
      if (!it.requiresAttunement && t.requiresAttunement) patch.requiresAttunement = true;
      if (!it.attunementNote && t.attunementNote) patch.attunementNote = t.attunementNote;
      if (!it.rarity && t.rarity) patch.rarity = t.rarity;
    }
    // Heal weapons saved before the twoHanded field existed.
    if (it.twoHanded === undefined && typeof t.twoHanded === 'boolean') patch.twoHanded = t.twoHanded;
    return Object.keys(patch).length ? { ...it, ...patch } : it;
  });
};

// Refresh each item's footprint from its weight first: the tile renders at
// tileSize(item), but the packer/collision read the stored item.size — if a saved
// size is stale (e.g. the bucket rules changed) the two disagree and Tidy leaves
// gaps. Recompute size, then position.
const hydrate = (list) =>
  ensurePositions(
    sweepBags(backfillFromCatalog(list)).map((i) => ({
      ...i,
      size: tileSize(i),
      ...(i.inBagId ? { pos: null } : {}), // stashed items have no grid position
    })),
  );

/**
 * Central backpack state: Strength, the carried tiles, the user's custom catalog
 * templates, and all the mutations the UI drives. Persists to localStorage on any
 * change.
 */
export function useBackpack() {
  const store = loadBackpack();
  // Each character owns its inventory; hydrate items (grid positions + catalog backfill).
  const characters = ref(store.characters.map((c) => ({ ...c, items: hydrate(c.items) })));
  const currentId = ref(store.currentId);
  const customItems = ref(store.customItems); // shared custom catalog across characters
  const selectedId = ref(null); // tile open in the detail panel (ephemeral)

  // The active character — every mutation below reads/writes through it.
  const current = computed(
    () => characters.value.find((c) => c.id === currentId.value) || characters.value[0],
  );

  // Per-character state surfaced as writable refs, so the rest of the composable is
  // untouched: `items.value = …` / `strength.value = …` write into the character.
  // Raw (allows transient empty while typing); the sidebar shows a fallback label.
  const characterName = computed({
    get: () => current.value?.name ?? '',
    set: (v) => { if (current.value) current.value.name = String(v); },
  });
  const strength = computed({ get: () => current.value.strength, set: (v) => { current.value.strength = v; } });
  const items = computed({ get: () => current.value.items, set: (v) => { current.value.items = v; } });
  const coins = computed({ get: () => current.value.coins, set: (v) => { current.value.coins = v; } });
  const countCoinWeight = computed({
    get: () => current.value.countCoinWeight,
    set: (v) => { current.value.countCoinWeight = v; },
  });
  const packDropped = computed({ get: () => current.value.packDropped, set: (v) => { current.value.packDropped = v; } });

  // Lightweight roster for the sidebar.
  const characterList = computed(() =>
    characters.value.map((c) => ({
      id: c.id,
      name: c.name,
      itemCount: c.items.filter((i) => !i.isCoinPurse).length,
      totalWeight: totalWeight(c.items.filter((i) => !i.inBagId && !i.isCoinPurse)),
    })),
  );

  watch(
    [characters, currentId, customItems],
    () => {
      saveBackpack({
        version: 2,
        currentId: currentId.value,
        customItems: customItems.value,
        characters: characters.value,
      });
    },
    { deep: true },
  );

  // --- character management ----------------------------------------------
  function selectCharacter(id) {
    if (!characters.value.some((c) => c.id === id)) return;
    currentId.value = id;
    selectedId.value = null; // the detail panel belongs to whoever's active
  }
  function addCharacter(name = '') {
    // Empty name by default — the sidebar focuses the field so the user names it
    // immediately (it shows "Unnamed character" until they do).
    const ch = defaultCharacter(String(name).trim());
    characters.value = [...characters.value, ch];
    currentId.value = ch.id;
    selectedId.value = null;
    return ch;
  }
  function renameCharacter(id, name) {
    const c = characters.value.find((x) => x.id === id);
    if (c) c.name = String(name).trim() || c.name;
  }
  function removeCharacter(id) {
    // Never leave zero characters — emptying the last one resets it instead.
    if (characters.value.length <= 1) {
      const fresh = defaultCharacter('Character 1');
      characters.value = [fresh];
      currentId.value = fresh.id;
      selectedId.value = null;
      return;
    }
    const idx = characters.value.findIndex((c) => c.id === id);
    if (idx < 0) return;
    const wasCurrent = currentId.value === id;
    characters.value = characters.value.filter((c) => c.id !== id);
    if (wasCurrent) {
      currentId.value = characters.value[Math.max(0, idx - 1)].id;
      selectedId.value = null;
    }
  }

  // Coin weight (lb) folded into encumbrance only when the toggle is on.
  const coinLbs = computed(() => coinWeight(coins.value));
  const coinGold = computed(() => coinValueGp(coins.value));

  // Equipped (worn) vs. carried split — the heart of "drop pack". Equipped items
  // stay on the body; everything else (plus coins) is in the pack and hits the
  // ground when dropped.
  const round2 = (n) => Math.round(n * 100) / 100;
  // Total gp worth of Treasure tiles (gems, art, trade goods) — feeds the purse's
  // "total wealth" readout alongside coin value.
  const treasureValue = computed(() =>
    round2(
      items.value.reduce(
        (s, i) =>
          i.category === 'Treasure' ? s + (Number(i.valueGp) || 0) * (Number(i.quantity) || 1) : s,
        0,
      ),
    ),
  );
  // Items stashed in a bag of holding don't weigh you down (only the bag's own
  // 15 lb does, and the bag is a normal carried item). So they're excluded from
  // every carry-weight figure.
  const carried = (i) => !i.inBagId;
  const equippedWeight = computed(() => totalWeight(items.value.filter((i) => i.equippedSlot)));
  // Coin weight rides on the coin-purse marker (an item), so it's already in these
  // sums — no separate extraWeight term.
  const packWeight = computed(() =>
    round2(totalWeight(items.value.filter((i) => carried(i) && !i.equippedSlot))),
  );

  // When the pack is dropped, encumbrance counts only worn gear (and no coins).
  const loadItems = computed(() =>
    packDropped.value
      ? items.value.filter((i) => i.equippedSlot)
      : items.value.filter(carried),
  );

  const status = useCarryCapacity(strength, loadItems);

  // Drag-source catalog = SRD items + the user's custom templates.
  const catalog = computed(() => [...srdEquipment, ...customItems.value]);

  // Starter packs (static SRD data) — expand into their contents on add.
  const packs = srdPacks;

  // The tile currently open in the detail panel.
  const selectedItem = computed(
    () => items.value.find((i) => i.instanceId === selectedId.value) || null,
  );
  const selectItem = (id) => { selectedId.value = id; };
  const deselect = () => { selectedId.value = null; };

  // --- equip / attune ----------------------------------------------------
  // Screen-reader announcement (bound to a polite aria-live region in the UI).
  const announcement = ref('');
  const announce = (msg) => { announcement.value = msg; };

  const attunedCount = computed(() => items.value.filter((i) => i.attuned).length);
  const equippedBySlot = computed(() => {
    const map = {};
    for (const i of items.value) if (i.equippedSlot) map[i.equippedSlot] = i;
    return map;
  });

  /**
   * Equip an item. With `targetSlot` (from the doll menu) it goes exactly there;
   * otherwise it resolves automatically (rings pick a free ring). The prior
   * occupant of the destination slot is bumped off.
   */
  function equipItem(instanceId, targetSlot = null) {
    const item = items.value.find((i) => i.instanceId === instanceId);
    if (!item) return;
    const targets = equipTargets(item);
    if (!targets.length) return;
    const twoH = isTwoHanded(item);

    let slot;
    if (twoH) {
      slot = 'mainHand'; // two-handers always anchor in the main hand
    } else if (targetSlot) {
      if (!targets.includes(targetSlot)) return;
      slot = targetSlot;
    } else if (targets.length === 1) {
      slot = targets[0];
    } else if (equipSlot(item) === 'ring') {
      const taken = new Set(
        items.value.filter((i) => i.instanceId !== instanceId && i.equippedSlot).map((i) => i.equippedSlot),
      );
      slot = taken.has('ring1') ? (taken.has('ring2') ? 'ring1' : 'ring2') : 'ring1';
    } else {
      slot = targets[0]; // one-handed weapon, no explicit choice → main hand
    }

    // Slots vacated by this equip. A two-hander claims both hands; equipping into
    // the off hand bumps a two-hander out of the main hand (it needs both).
    const clear = new Set([slot]);
    if (twoH) clear.add('offHand');
    if (slot === 'offHand') {
      const main = equippedBySlot.value.mainHand;
      if (main && isTwoHanded(main)) clear.add('mainHand');
    }

    items.value = items.value.map((i) => {
      if (i.instanceId === instanceId) return { ...i, equippedSlot: slot };
      // Displaced items leave the doll — and lose attunement with it.
      if (clear.has(i.equippedSlot)) return { ...i, equippedSlot: null, attuned: false };
      return i;
    });
    announce(
      `${cleanName(item.name)} equipped${twoH ? ' (both hands)' : ` to ${SLOT_LABEL[slot] || slot} slot`}.`,
    );
  }

  // Unequipping ends attunement too — you can't stay attuned to gear you've taken
  // off (5e: attunement requires keeping the item worn/held).
  function unequipItem(instanceId) {
    const item = items.value.find((i) => i.instanceId === instanceId);
    if (!item) return;
    const wasAttuned = item.attuned;
    items.value = items.value.map((i) =>
      i.instanceId === instanceId ? { ...i, equippedSlot: null, attuned: false } : i,
    );
    announce(`${cleanName(item.name)} unequipped${wasAttuned ? ' and no longer attuned' : ''}.`);
  }

  /** Toggle attunement (hard cap of 3 attuned items; only for items that need it). */
  function toggleAttune(instanceId) {
    const item = items.value.find((i) => i.instanceId === instanceId);
    if (!item || !item.requiresAttunement) return;
    if (!item.attuned && attunedCount.value >= MAX_ATTUNEMENT) {
      announce(`Cannot attune ${cleanName(item.name)}: already attuned to ${MAX_ATTUNEMENT} items.`);
      return;
    }
    const willAttune = !item.attuned;
    items.value = items.value.map((i) =>
      i.instanceId === instanceId ? { ...i, attuned: !i.attuned } : i,
    );
    announce(
      `${cleanName(item.name)} ${willAttune ? 'attuned' : 'no longer attuned'}. ${attunedCount.value} of ${MAX_ATTUNEMENT} attuned.`,
    );
  }

  // --- bag of holding ----------------------------------------------------
  /** Every bag of holding in the pack, with its live contents + capacity read. */
  const bags = computed(() =>
    items.value
      .filter(isBagOfHolding)
      .map((bag) => {
        const contents = items.value.filter((i) => i.inBagId === bag.instanceId);
        return {
          instanceId: bag.instanceId,
          name: cleanName(bag.name),
          contents,
          used: contents.reduce((s, i) => s + (Number(i.weight) || 0) * (Number(i.quantity) || 1), 0),
          capacity: BAG_CAPACITY,
        };
      }),
  );
  const hasBag = computed(() => bags.value.length > 0);

  /** Place a (newly un-bagged) item back on the grid at the first free spot. */
  function placeOnGrid(list, instanceId) {
    const it = list.find((i) => i.instanceId === instanceId);
    const others = list.filter((i) => i.instanceId !== instanceId && !i.inBagId);
    const pos = resolvePosition({ x: 0, y: 0 }, it.size, others, COLS);
    return list.map((i) => (i.instanceId === instanceId ? { ...i, pos } : i));
  }

  /** Stash an item into a bag of holding — it leaves the grid and stops counting weight. */
  function stashItem(instanceId, bagId) {
    const item = items.value.find((i) => i.instanceId === instanceId);
    const bag = items.value.find((i) => i.instanceId === bagId);
    if (!item || !bag || !isBagOfHolding(bag) || instanceId === bagId) return false;
    if (isBagOfHolding(item)) return false; // a bag inside a bag — handled by the caller (rift!)
    items.value = items.value.map((i) =>
      i.instanceId === instanceId
        ? { ...i, inBagId: bagId, equippedSlot: null, attuned: false, pos: null }
        : i,
    );
    announce(`${cleanName(item.name)} stashed in the ${cleanName(bag.name)}.`);
    return true;
  }

  /** Take an item out of its bag and back into the main pack. */
  function retrieveItem(instanceId) {
    const item = items.value.find((i) => i.instanceId === instanceId);
    if (!item || !item.inBagId) return;
    const cleared = items.value.map((i) => (i.instanceId === instanceId ? { ...i, inBagId: null } : i));
    items.value = placeOnGrid(cleared, instanceId);
    announce(`${cleanName(item.name)} taken out of the bag.`);
  }

  /** Empty a bag — all its contents return to the main pack. */
  function emptyBag(bagId) {
    let working = items.value;
    for (const it of items.value.filter((i) => i.inBagId === bagId)) {
      working = placeOnGrid(
        working.map((i) => (i.instanceId === it.instanceId ? { ...i, inBagId: null } : i)),
        it.instanceId,
      );
    }
    items.value = working;
  }

  // --- coin purse (a marker item synced from the coins object — no second store) ---
  const coinPurseId = COIN_ID;
  function syncCoinPurse() {
    if (!current.value) return;
    const list = items.value;
    const existing = list.find((i) => i.instanceId === COIN_ID);
    // Coins are a weighable tile only when "include coin weight" is on (else just a number).
    const show = countCoinWeight.value && totalCoins(coins.value) > 0;
    if (!show) {
      if (existing) items.value = list.filter((i) => i.instanceId !== COIN_ID);
      return;
    }
    const weight = coinLbs.value;
    const valueGp = coinGold.value;
    const size = tileSize({ weight });
    if (existing) {
      if (existing.weight !== weight || existing.valueGp !== valueGp) {
        items.value = list.map((i) =>
          i.instanceId === COIN_ID ? { ...i, weight, valueGp, size } : i,
        );
      }
      return;
    }
    const marker = {
      instanceId: COIN_ID,
      id: COIN_ID,
      isCoinPurse: true,
      name: 'Coin purse',
      weight,
      valueGp,
      quantity: 1,
      category: 'Currency',
      size,
      pos: null,
      inBagId: null,
      source: 'srd',
    };
    items.value = placeOnGrid([...list, marker], COIN_ID);
  }
  watch([coins, countCoinWeight, currentId], () => syncCoinPurse(), { deep: true, immediate: true });

  function setStrength(v) {
    strength.value = clampStr(v);
  }

  function setCoin(denom, value) {
    const n = Math.max(0, Math.floor(Number(value) || 0));
    coins.value = { ...coins.value, [denom]: n };
  }

  /**
   * Relative purse adjustment (the coin-purse "Adjust" row):
   *  - 'add'   → literally add N coins of `denom` (a reward: gp 100 → 137).
   *  - 'spend' → subtract N×denom of VALUE, making change across denominations
   *              via spendCoins (pay 15 gp out of silver). No-op + notice if the
   *              purse can't cover it. Returns whether it applied.
   */
  function adjustCoins({ denom, amount, mode } = {}) {
    const n = Math.max(0, Math.floor(Number(amount) || 0));
    if (!n || !['pp', 'gp', 'ep', 'sp', 'cp'].includes(denom)) return false;
    if (mode === 'spend') {
      const next = spendCoins(coins.value, { quantity: n, unit: denom });
      if (!next) {
        announce(`Not enough coin to spend ${n} ${denom}.`);
        return false;
      }
      coins.value = next;
      announce(`Spent ${n} ${denom}.`);
      return true;
    }
    coins.value = { ...coins.value, [denom]: (Number(coins.value[denom]) || 0) + n };
    announce(`Added ${n} ${denom}.`);
    return true;
  }

  /** Zero out every denomination (the confirmable "Empty purse" action). */
  function emptyPurse() {
    coins.value = { pp: 0, gp: 0, ep: 0, sp: 0, cp: 0 };
    announce('Purse emptied.');
  }

  function toggleCoinWeight(on) {
    countCoinWeight.value = on === undefined ? !countCoinWeight.value : !!on;
  }

  /**
   * Drop the pack (or pick it back up) — a reversible combat mode, never a
   * deletion. While dropped, encumbrance counts only worn gear; the pack's weight
   * waits on the ground until picked up.
   */
  function toggleDropPack(on) {
    packDropped.value = on === undefined ? !packDropped.value : !!on;
    announce(
      packDropped.value
        ? `Pack dropped: ${packWeight.value} lb set down. Carrying ${status.value.total} lb of worn gear.`
        : `Pack picked up. Carrying ${status.value.total} lb.`,
    );
  }

  /** Add `addQty` to a placed stack, resize it, and re-settle (displacing if it grew). */
  function bumpStack(targetId, addQty) {
    const target = items.value.find((i) => i.instanceId === targetId);
    if (!target) return;
    const q = (Number(target.quantity) || 1) + (Number(addQty) || 1);
    const next = items.value.map((i) =>
      i.instanceId === targetId
        ? { ...i, name: cleanName(i.name), quantity: q, size: tileSize({ ...i, quantity: q }) }
        : i,
    );
    items.value = placeItemAt(next, targetId, target.pos, COLS);
  }

  /**
   * Add a catalog item.
   *  - Click (no preferred): if an identical item is already packed, just bump its
   *    count; otherwise drop a new tile in the first free spot.
   *  - Drop at a cell (preferred): land there (displacing), unless it lands on an
   *    identical item — then stack into it.
   */
  function addItem(template, preferred = null) {
    if (!template) return;
    const addQty = Math.max(1, Math.floor(Number(template.quantity) || 1));

    if (!preferred) {
      const existing = items.value.find((i) => i.id === template.id);
      if (existing) {
        bumpStack(existing.instanceId, addQty);
        return;
      }
      const item = instantiate(template);
      const pos = resolvePosition({ x: 0, y: 0 }, item.size, items.value, COLS);
      items.value = [...items.value, { ...item, pos }];
      return;
    }

    const item = instantiate(template);
    const list = [...items.value, { ...item, pos: clampPos(preferred, item.size, COLS) }];
    const targetId = findStackTarget(list, item.instanceId, preferred, COLS);
    if (targetId) {
      bumpStack(targetId, item.quantity);
      return;
    }
    items.value = placeItemAt(list, item.instanceId, preferred, COLS);
  }

  /**
   * Buy a catalog item: deduct its price (× quantity) from the purse, then add it
   * like a normal drop. Priceless items (no `cost`) and unaffordable ones are
   * no-ops here — the catalog disables Buy in those cases; this is the guard.
   */
  function buyItem(template) {
    if (!template?.cost) return;
    const qty = Math.max(1, Math.floor(Number(template.quantity) || 1));
    if (!canAfford(coins.value, template.cost, qty)) return;
    coins.value = spendCoins(coins.value, template.cost, qty);
    addItem(template);
    announce(`Bought ${cleanName(template.name)} for ${formatCost(template.cost)}.`);
  }

  /** Parse a pasted hoard for the preview (pure — commits nothing). */
  function previewTreasure(text) {
    return parseTreasure(text, srdEquipment);
  }

  /**
   * Commit a pasted treasure hoard: add its coins to the purse and drop its items
   * (matched SRD gear/magic + Treasure/custom tiles) into the pack.
   */
  function importTreasure(text) {
    const parsed = parseTreasure(text, srdEquipment);
    const next = { ...coins.value };
    for (const d of ['pp', 'gp', 'ep', 'sp', 'cp']) {
      next[d] = (Number(next[d]) || 0) + (parsed.coins[d] || 0);
    }
    coins.value = next;
    for (const t of parsed.items) addItem(t);
    const coinCount = ['pp', 'gp', 'ep', 'sp', 'cp'].reduce((s, d) => s + (parsed.coins[d] || 0), 0);
    const itemCount = parsed.items.reduce((s, i) => s + (Number(i.quantity) || 1), 0);
    announce(`Treasure added: ${itemCount} item(s)${coinCount ? ' and coins' : ''}.`);
    return parsed;
  }

  /**
   * Expand a starter pack's contents into the pack as individual tiles. A pack is
   * a bulk drop of many varied sizes, so we re-tidy the whole pack afterward
   * (grouped by type) rather than scattering the new tiles into existing gaps.
   */
  function addPack(packId) {
    const pack = srdPacks.find((p) => p.id === packId);
    if (!pack) return null;
    const added = expandPackToTemplates(pack).map(instantiate);
    items.value = packItems([...items.value, ...added], COLS, 'type');
    return pack;
  }

  function removeItem(instanceId) {
    if (instanceId === COIN_ID) return; // the coin purse is managed via the stepper
    // Removing a bag returns its contents to the pack rather than vanishing them.
    const removed = items.value.find((i) => i.instanceId === instanceId);
    if (removed && isBagOfHolding(removed)) emptyBag(instanceId);
    items.value = items.value.filter((i) => i.instanceId !== instanceId);
    if (selectedId.value === instanceId) selectedId.value = null;
  }

  /** Change a placed item's quantity; resize and re-settle (displacing if it grew). */
  function setQuantity(instanceId, quantity) {
    const item = items.value.find((i) => i.instanceId === instanceId);
    if (!item) return;
    const q = Math.max(1, Math.floor(Number(quantity) || 1));
    const size = tileSize({ ...item, quantity: q });
    const updated = items.value.map((i) =>
      i.instanceId === instanceId ? { ...i, quantity: q, size } : i,
    );
    items.value = placeItemAt(updated, instanceId, item.pos, COLS);
  }

  /** Edit a placed item's fields (name/weight/category/quantity/description). */
  function updateItem(instanceId, patch) {
    const item = items.value.find((i) => i.instanceId === instanceId);
    if (!item) return;
    const next = { ...item };
    if (patch.name !== undefined) next.name = String(patch.name).trim() || item.name;
    if (patch.category !== undefined) next.category = patch.category || item.category;
    if (patch.description !== undefined) next.description = String(patch.description);
    if (patch.weight !== undefined) next.weight = Math.max(0, Number(patch.weight) || 0);
    if (patch.quantity !== undefined) next.quantity = Math.max(1, Math.floor(Number(patch.quantity) || 1));
    if (patch.valueGp !== undefined) next.valueGp = Math.max(0, Number(patch.valueGp) || 0);
    next.size = tileSize(next);
    const updated = items.value.map((i) => (i.instanceId === instanceId ? next : i));
    items.value = placeItemAt(updated, instanceId, item.pos, COLS);
  }

  /**
   * Move a tile to the `preferred` cell. If it lands on an identical item, stack
   * the two (combine counts); otherwise place there, displacing what it overlaps.
   */
  function moveItemTo(instanceId, preferred) {
    const moved = items.value.find((i) => i.instanceId === instanceId);
    if (!moved) return;
    const targetId = findStackTarget(items.value, instanceId, preferred, COLS);
    if (targetId) {
      const addQty = Number(moved.quantity) || 1;
      items.value = items.value.filter((i) => i.instanceId !== instanceId);
      bumpStack(targetId, addQty);
      if (selectedId.value === instanceId) selectedId.value = targetId;
      return;
    }
    items.value = placeItemAt(items.value, instanceId, preferred, COLS);
  }

  /** List view: move one item to sit where another is (vertical reorder). */
  function reorderList(movedId, targetId) {
    if (movedId === targetId) return;
    const list = [...items.value];
    const from = list.findIndex((i) => i.instanceId === movedId);
    if (from < 0) return;
    const [moved] = list.splice(from, 1);
    const to = list.findIndex((i) => i.instanceId === targetId);
    list.splice(to < 0 ? list.length : to, 0, moved);
    items.value = list;
  }

  /** Keyboard reposition: move one cell if the target is free, else no-op. */
  function nudge(instanceId, dx, dy) {
    const item = items.value.find((i) => i.instanceId === instanceId);
    if (!item) return;
    const others = items.value.filter((i) => i.instanceId !== instanceId);
    const x = Math.max(0, Math.min(COLS - item.size.w, item.pos.x + dx));
    const y = Math.max(0, item.pos.y + dy);
    if (collidesAny({ x, y, w: item.size.w, h: item.size.h }, others)) return;
    items.value = items.value.map((i) => (i.instanceId === instanceId ? { ...i, pos: { x, y } } : i));
  }

  /** Tidy: re-pack the grid items top-left by `sortKey`; bag-stashed items stay put. */
  function autopack(sortKey = 'type') {
    const bagged = items.value.filter((i) => i.inBagId);
    const grid = items.value.filter((i) => !i.inBagId);
    items.value = [...packItems(grid, COLS, sortKey), ...bagged];
  }

  function clearAll() {
    items.value = items.value.filter((i) => i.isCoinPurse); // keep the coin purse
  }

  /**
   * Define a reusable custom catalog item (also covers SRD gaps). Returns the
   * created template so the caller can immediately add it to the pack.
   */
  function addCustomItem({ name, weight, category }) {
    const w = Math.max(0, Number(weight) || 0);
    const cleanName = String(name || 'Custom item').trim() || 'Custom item';
    const cat = category || 'Adventuring Gear';
    const template = {
      id: `custom-${slug(name) || 'item'}-${makeInstanceId()}`,
      name: cleanName,
      weight: w,
      category: cat,
      size: tileSize({ name: cleanName, category: cat, weight: w }), // shape + weight
      source: 'custom',
    };
    customItems.value = [...customItems.value, template];
    return template;
  }

  function removeCustomItem(id) {
    customItems.value = customItems.value.filter((t) => t.id !== id);
  }

  /** Replace the whole store from an imported bundle (JSON text). Throws on bad JSON. */
  function importBundle(text) {
    const next = fromJSON(text);
    characters.value = next.characters.map((c) => ({ ...c, items: hydrate(c.items) }));
    currentId.value = next.currentId;
    customItems.value = next.customItems;
    selectedId.value = null;
  }

  function currentState() {
    return {
      version: 2,
      currentId: currentId.value,
      customItems: customItems.value,
      characters: characters.value,
    };
  }

  return {
    // characters
    characters: characterList,
    currentCharacterId: currentId,
    characterName,
    selectCharacter,
    addCharacter,
    renameCharacter,
    removeCharacter,
    strength,
    items,
    customItems,
    coins,
    countCoinWeight,
    packDropped,
    equippedWeight,
    packWeight,
    toggleDropPack,
    coinLbs,
    coinGold,
    catalog,
    packs,
    status,
    selectedItem,
    selectItem,
    deselect,
    setQuantity,
    updateItem,
    attunedCount,
    maxAttunement: MAX_ATTUNEMENT,
    equippedBySlot,
    equipItem,
    unequipItem,
    toggleAttune,
    bags,
    hasBag,
    bagCapacity: BAG_CAPACITY,
    stashItem,
    retrieveItem,
    emptyBag,
    coinPurseId,
    announcement,
    setStrength,
    setCoin,
    adjustCoins,
    emptyPurse,
    toggleCoinWeight,
    addItem,
    buyItem,
    previewTreasure,
    importTreasure,
    treasureValue,
    addPack,
    removeItem,
    moveItemTo,
    reorderList,
    nudge,
    autopack,
    clearAll,
    addCustomItem,
    removeCustomItem,
    importBundle,
    currentState,
  };
}
