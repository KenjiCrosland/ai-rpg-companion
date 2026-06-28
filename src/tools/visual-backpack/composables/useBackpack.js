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
import { coinWeight, coinValueGp } from '../utils/carry-capacity.mjs';
import { expandPackToTemplates } from '../utils/pack-expansion.mjs';
import { tileSize, cleanName } from '../utils/tile-presentation.mjs';
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
    source: template.source === 'srd' ? 'srd' : 'custom',
  };
}

// Items load with saved grid positions; pack any that are missing one.
const ensurePositions = (list) => (list.some((i) => !i.pos) ? packItems(list, COLS) : list);

/**
 * Central backpack state: Strength, the carried tiles, the user's custom catalog
 * templates, and all the mutations the UI drives. Persists to localStorage on any
 * change.
 */
export function useBackpack() {
  const initial = loadBackpack();
  const strength = ref(initial.strength);
  const items = ref(ensurePositions(initial.items)); // placed tiles (each has pos)
  const customItems = ref(initial.customItems); // user-defined catalog templates
  const coins = ref(initial.coins); // { gp, ep, sp, cp }
  const countCoinWeight = ref(initial.countCoinWeight); // toggle coin encumbrance
  const selectedId = ref(null); // tile open in the detail panel (ephemeral)

  watch(
    [strength, items, customItems, coins, countCoinWeight],
    () => {
      saveBackpack({
        strength: strength.value,
        items: items.value,
        customItems: customItems.value,
        coins: coins.value,
        countCoinWeight: countCoinWeight.value,
      });
    },
    { deep: true },
  );

  // Coin weight (lb) folded into encumbrance only when the toggle is on.
  const coinLbs = computed(() => coinWeight(coins.value));
  const coinGold = computed(() => coinValueGp(coins.value));
  const extraWeight = computed(() => (countCoinWeight.value ? coinLbs.value : 0));

  const status = useCarryCapacity(strength, items, extraWeight);

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

  /** Tidy: re-pack into a top-left, category-grouped, big-first arrangement. */
  function autopack() {
    items.value = packItems(items.value, COLS);
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
    items.value = ensurePositions(next.items);
    customItems.value = next.customItems;
    coins.value = next.coins;
    countCoinWeight.value = next.countCoinWeight;
  }

  function currentState() {
    return {
      strength: strength.value,
      items: items.value,
      customItems: customItems.value,
      coins: coins.value,
      countCoinWeight: countCoinWeight.value,
    };
  }

  return {
    strength,
    items,
    customItems,
    coins,
    countCoinWeight,
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
    setStrength,
    setCoin,
    toggleCoinWeight,
    addItem,
    addPack,
    removeItem,
    moveItemTo,
    nudge,
    autopack,
    clearAll,
    addCustomItem,
    removeCustomItem,
    importBundle,
    currentState,
  };
}
