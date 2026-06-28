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

// Larger tiles sort first within a category, so autopack reads big-to-small.
const area = (it) => (it.size?.w || 1) * (it.size?.h || 1);

/**
 * Central backpack state: Strength, the carried tiles, the user's custom catalog
 * templates, and all the mutations the UI drives. Persists to localStorage on any
 * change.
 */
export function useBackpack() {
  const initial = loadBackpack();
  const strength = ref(initial.strength);
  const items = ref(initial.items); // placed tile instances
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

  function addItem(template) {
    if (!template) return;
    items.value = [...items.value, instantiate(template)];
  }

  /** Expand a starter pack's contents into the pack as individual tiles. */
  function addPack(packId) {
    const pack = srdPacks.find((p) => p.id === packId);
    if (!pack) return null;
    const tiles = expandPackToTemplates(pack).map(instantiate);
    items.value = [...items.value, ...tiles];
    return pack;
  }

  function removeItem(instanceId) {
    items.value = items.value.filter((i) => i.instanceId !== instanceId);
  }

  /** Move the tile at `from` to position `to` (array-order arrangement). */
  function reorder(from, to) {
    const list = [...items.value];
    if (from < 0 || from >= list.length) return;
    const clampedTo = Math.min(list.length - 1, Math.max(0, to));
    const [moved] = list.splice(from, 1);
    list.splice(clampedTo, 0, moved);
    items.value = list;
  }

  /** Tidy the visual arrangement: group by category, big tiles first, then name. */
  function autopack() {
    const order = { Weapon: 0, Armor: 1, 'Adventuring Gear': 2, Tools: 3 };
    items.value = [...items.value].sort((a, b) => {
      const ca = order[a.category] ?? 9;
      const cb = order[b.category] ?? 9;
      if (ca !== cb) return ca - cb;
      if (area(b) !== area(a)) return area(b) - area(a);
      return a.name.localeCompare(b.name);
    });
  }

  function clearAll() {
    items.value = [];
  }

  /**
   * Define a reusable custom catalog item (also covers SRD gaps). Returns the
   * created template so the caller can immediately add it to the pack.
   */
  function addCustomItem({ name, weight, category, size }) {
    const template = {
      id: `custom-${slug(name) || 'item'}-${makeInstanceId()}`,
      name: String(name || 'Custom item').trim() || 'Custom item',
      weight: Math.max(0, Number(weight) || 0),
      category: category || 'Adventuring Gear',
      size: { w: size?.w || 1, h: size?.h || 1 },
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
    items.value = next.items;
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
    reorder,
    autopack,
    clearAll,
    addCustomItem,
    removeCustomItem,
    importBundle,
    currentState,
  };
}
