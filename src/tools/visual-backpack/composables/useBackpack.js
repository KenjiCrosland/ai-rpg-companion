import { ref, computed, watch } from 'vue';
import srdEquipment from '../data/srd-equipment.json';
import srdPacks from '../data/srd-packs.json';
import {
  loadBackpack,
  saveBackpack,
  makeInstanceId,
  fromJSON,
} from '../utils/backpack-storage.mjs';
import { useCarryCapacity } from './useCarryCapacity.js';
import { coinWeight, coinValueGp, totalWeight } from '../utils/carry-capacity.mjs';
import { expandPackToTemplates } from '../utils/pack-expansion.mjs';
import {
  tileSize,
  cleanName,
  equipSlot,
  equipTargets,
  isTwoHanded,
  EQUIP_SLOTS,
} from '../utils/tile-presentation.mjs';

const MAX_ATTUNEMENT = 3;
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
    rarity: template.rarity || '',
    magicType: template.magicType || '',
    requiresAttunement: !!template.requiresAttunement,
    attunementNote: template.attunementNote || '',
    equippedSlot: null,
    attuned: false,
    source: template.source === 'srd' ? 'srd' : 'custom',
    ...(typeof template.twoHanded === 'boolean' ? { twoHanded: template.twoHanded } : {}),
  };
}

// Items load with saved grid positions; pack any that are missing one.
const ensurePositions = (list) => (list.some((i) => !i.pos) ? packItems(list, COLS) : list);

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

const hydrate = (list) => backfillFromCatalog(ensurePositions(list));

/**
 * Central backpack state: Strength, the carried tiles, the user's custom catalog
 * templates, and all the mutations the UI drives. Persists to localStorage on any
 * change.
 */
export function useBackpack() {
  const initial = loadBackpack();
  const strength = ref(initial.strength);
  const items = ref(hydrate(initial.items)); // placed tiles (each has pos)
  const customItems = ref(initial.customItems); // user-defined catalog templates
  const coins = ref(initial.coins); // { gp, ep, sp, cp }
  const countCoinWeight = ref(initial.countCoinWeight); // toggle coin encumbrance
  const packDropped = ref(initial.packDropped); // "pack dropped" combat mode
  const selectedId = ref(null); // tile open in the detail panel (ephemeral)

  watch(
    [strength, items, customItems, coins, countCoinWeight, packDropped],
    () => {
      saveBackpack({
        strength: strength.value,
        items: items.value,
        customItems: customItems.value,
        coins: coins.value,
        countCoinWeight: countCoinWeight.value,
        packDropped: packDropped.value,
      });
    },
    { deep: true },
  );

  // Coin weight (lb) folded into encumbrance only when the toggle is on.
  const coinLbs = computed(() => coinWeight(coins.value));
  const coinGold = computed(() => coinValueGp(coins.value));

  // Equipped (worn) vs. carried split — the heart of "drop pack". Equipped items
  // stay on the body; everything else (plus coins) is in the pack and hits the
  // ground when dropped.
  const round2 = (n) => Math.round(n * 100) / 100;
  const equippedWeight = computed(() => totalWeight(items.value.filter((i) => i.equippedSlot)));
  const packWeight = computed(() =>
    round2(
      totalWeight(items.value.filter((i) => !i.equippedSlot)) +
        (countCoinWeight.value ? coinLbs.value : 0),
    ),
  );

  // When the pack is dropped, encumbrance counts only worn gear (and no coins).
  const loadItems = computed(() =>
    packDropped.value ? items.value.filter((i) => i.equippedSlot) : items.value,
  );
  const extraWeight = computed(() =>
    packDropped.value ? 0 : countCoinWeight.value ? coinLbs.value : 0,
  );

  const status = useCarryCapacity(strength, loadItems, extraWeight);

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

  function setStrength(v) {
    strength.value = clampStr(v);
  }

  function setCoin(denom, value) {
    const n = Math.max(0, Math.floor(Number(value) || 0));
    coins.value = { ...coins.value, [denom]: n };
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
        ? `Pack dropped — ${packWeight.value} lb set down. Carrying ${status.value.total} lb of worn gear.`
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

  /** Expand a starter pack's contents into the pack as individual tiles. */
  function addPack(packId) {
    const pack = srdPacks.find((p) => p.id === packId);
    if (!pack) return null;
    const list = [...items.value];
    for (const tile of expandPackToTemplates(pack).map(instantiate)) {
      const pos = resolvePosition({ x: 0, y: 0 }, tile.size, list, COLS);
      list.push({ ...tile, pos });
    }
    items.value = list;
    return pack;
  }

  function removeItem(instanceId) {
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

  /** Tidy: re-pack into a top-left arrangement, sorted by `sortKey`. */
  function autopack(sortKey = 'type') {
    items.value = packItems(items.value, COLS, sortKey);
  }

  function clearAll() {
    items.value = [];
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

  /** Replace all state from an imported bundle (JSON text). Throws on bad JSON. */
  function importBundle(text) {
    const next = fromJSON(text);
    strength.value = next.strength;
    items.value = hydrate(next.items);
    customItems.value = next.customItems;
    coins.value = next.coins;
    countCoinWeight.value = next.countCoinWeight;
    packDropped.value = next.packDropped;
  }

  function currentState() {
    return {
      strength: strength.value,
      items: items.value,
      customItems: customItems.value,
      coins: coins.value,
      countCoinWeight: countCoinWeight.value,
      packDropped: packDropped.value,
    };
  }

  return {
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
    announcement,
    setStrength,
    setCoin,
    toggleCoinWeight,
    addItem,
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
