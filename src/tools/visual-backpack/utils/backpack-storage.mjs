/**
 * backpack-storage.mjs
 *
 * Self-contained persistence for the Visual RPG Backpack. The tool lives OUTSIDE
 * the AI generator suite, so it owns its own localStorage key and its own
 * JSON export/import — it deliberately does NOT touch the suite's DataManagerModal
 * / EXPORT_KEYS. The read/write + custom-event shape mirrors `item-storage.mjs`,
 * and export/import reuses the suite's Blob+anchor / FileReader conventions.
 */

import { logger } from '@/util/logger.mjs';

const STORAGE_KEY = 'backpackInventory';
const VERSION = 1;
const DEFAULT_STRENGTH = 10;
const COIN_DENOMS = ['gp', 'ep', 'sp', 'cp'];

function defaultCoins() {
  return { gp: 0, ep: 0, sp: 0, cp: 0 };
}

function normalizeCoins(input) {
  const coins = defaultCoins();
  if (input && typeof input === 'object') {
    for (const k of COIN_DENOMS) {
      const n = Math.floor(Number(input[k]));
      coins[k] = Number.isFinite(n) && n > 0 ? n : 0;
    }
  }
  return coins;
}

/** A fresh, empty backpack. */
export function defaultState() {
  return {
    version: VERSION,
    strength: DEFAULT_STRENGTH,
    items: [],
    customItems: [],
    coins: defaultCoins(),
    countCoinWeight: true,
    // Tactical "pack dropped" mode: count only equipped weight (reversible).
    packDropped: false,
  };
}

/** Coerce arbitrary parsed input into a valid, complete state object. */
export function normalizeState(input) {
  const base = defaultState();
  if (!input || typeof input !== 'object') return base;
  const strength = Number(input.strength);
  return {
    version: VERSION,
    strength: Number.isFinite(strength) && strength > 0 ? strength : DEFAULT_STRENGTH,
    items: Array.isArray(input.items) ? input.items.map(normalizeItem) : [],
    customItems: Array.isArray(input.customItems) ? input.customItems.map(normalizeItem) : [],
    coins: normalizeCoins(input.coins),
    // Default to RAW (coins count); only an explicit false disables it.
    countCoinWeight: input.countCoinWeight !== false,
    packDropped: !!input.packDropped,
  };
}

function normalizeItem(it) {
  const weight = Number(it?.weight);
  const w = Number(it?.size?.w);
  const h = Number(it?.size?.h);
  const px = Number(it?.pos?.x);
  const py = Number(it?.pos?.y);
  const qty = Math.floor(Number(it?.quantity));
  return {
    instanceId: it?.instanceId || makeInstanceId(),
    id: String(it?.id ?? ''),
    name: String(it?.name ?? 'Item'),
    weight: Number.isFinite(weight) ? weight : 0,
    quantity: Number.isFinite(qty) && qty > 0 ? qty : 1,
    category: String(it?.category ?? 'Adventuring Gear'),
    size: { w: Number.isFinite(w) ? w : 1, h: Number.isFinite(h) ? h : 1 },
    // Grid position; null means "unplaced" (the composable packs it on load).
    pos: Number.isFinite(px) && Number.isFinite(py) ? { x: px, y: py } : null,
    description: typeof it?.description === 'string' ? it.description : '',
    rarity: typeof it?.rarity === 'string' ? it.rarity : '',
    magicType: typeof it?.magicType === 'string' ? it.magicType : '',
    requiresAttunement: !!it?.requiresAttunement,
    attunementNote: typeof it?.attunementNote === 'string' ? it.attunementNote : '',
    equippedSlot: typeof it?.equippedSlot === 'string' ? it.equippedSlot : null,
    attuned: !!it?.attuned,
    source: it?.source === 'srd' ? 'srd' : 'custom',
    // Weapon grip — preserved only when present so the catalog backfill can heal
    // older saved weapons that predate the field (undefined ≠ false here).
    ...(typeof it?.twoHanded === 'boolean' ? { twoHanded: it.twoHanded } : {}),
  };
}

let counter = 0;
/** Unique-enough id for a placed tile instance. */
export function makeInstanceId() {
  counter += 1;
  const rand = Math.random().toString(36).slice(2, 8);
  return `bp_${Date.now().toString(36)}_${counter}_${rand}`;
}

export function loadBackpack() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    return normalizeState(JSON.parse(raw));
  } catch (error) {
    logger.warn('Corrupted backpackInventory detected, starting fresh:', error);
    return defaultState();
  }
}

export function saveBackpack(state) {
  const bundle = serializeBundle(state);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bundle));
  window.dispatchEvent(
    new CustomEvent('backpack-updated', { detail: { count: bundle.items.length } }),
  );
}

export function clearBackpack() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('backpack-updated', { detail: { count: 0 } }));
}

/** The portable bundle shape (what export writes and import reads). */
export function serializeBundle(state) {
  const s = normalizeState(state);
  return {
    version: VERSION,
    strength: s.strength,
    items: s.items,
    customItems: s.customItems,
    coins: s.coins,
    countCoinWeight: s.countCoinWeight,
    packDropped: s.packDropped,
  };
}

export function toJSON(state) {
  return JSON.stringify(serializeBundle(state), null, 2);
}

export function fromJSON(text) {
  return normalizeState(JSON.parse(text));
}

/** Filename matching the suite convention: `backpack-{mon}-{day}-{yy}.json`. */
export function exportFilename(date = new Date()) {
  const month = date.toLocaleString('default', { month: 'short' }).toLowerCase();
  const day = date.getDate();
  const year = String(date.getFullYear()).slice(-2);
  return `backpack-${month}-${day}-${year}.json`;
}

/** Trigger a browser download of the current state (Blob + anchor pattern). */
export function downloadBackpack(state) {
  const blob = new Blob([toJSON(state)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = exportFilename();
  link.click();
  URL.revokeObjectURL(url);
}
