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
import { tileSize } from '../utils/tile-presentation.mjs';
import { resolvePosition, placeItemAt, packItems, collidesAny, COLS } from '../utils/grid-layout.mjs';

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
  return {
    instanceId: makeInstanceId(),
    id: template.id,
    name: template.name,
    weight: Number(template.weight) || 0,
    category: template.category || 'Adventuring Gear',
    size: { w: template.size?.w || 1, h: template.size?.h || 1 },
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
   * Add a catalog item. With a `preferred` cell (a drop), it lands exactly there
   * and displaces whatever it overlaps; without one (click/pack), it fills the
   * first free spot.
   */
  function addItem(template, preferred = null) {
    if (!template) return;
    const item = instantiate(template);
    if (preferred) {
      const list = [...items.value, { ...item, pos: { x: 0, y: 0 } }];
      items.value = placeItemAt(list, item.instanceId, preferred, COLS);
    } else {
      const pos = resolvePosition({ x: 0, y: 0 }, item.size, items.value, COLS);
      items.value = [...items.value, { ...item, pos }];
    }
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
  }

  /** Move a tile to exactly the `preferred` cell, displacing anything it overlaps. */
  function moveItemTo(instanceId, preferred) {
    if (!items.value.some((i) => i.instanceId === instanceId)) return;
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
