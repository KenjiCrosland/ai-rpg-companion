/**
 * grid-layout.mjs
 *
 * Pure geometry for the positioned backpack grid. Each placed item carries a
 * top-left cell position `pos:{x,y}` and a `size:{w,h}`. The grid is a fixed
 * number of columns wide and grows downward without limit — it NEVER rejects a
 * drop (weight is the only real limit). Dropping onto occupied cells slides to
 * the nearest free spot rather than failing. No DOM.
 */

import { itemType, itemTypes } from './tile-presentation.mjs';

export const COLS = 6;

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

export function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

/** Does a rect {x,y,w,h} collide with any placed item (which have pos + size)? */
export function collidesAny(rect, items) {
  return items.some((it) =>
    it?.pos &&
    rectsOverlap(rect, { x: it.pos.x, y: it.pos.y, w: it.size.w, h: it.size.h }),
  );
}

/** Pixel offset within the grid → cell index along one axis. */
export function offsetToCell(offset, pitch) {
  if (!(pitch > 0)) return 0;
  return Math.max(0, Math.floor(offset / pitch));
}

/** Clamp a preferred top-left so a `size` tile stays inside the columns. */
export function clampPos(pos, size, cols = COLS) {
  const maxX = Math.max(0, cols - (size?.w || 1));
  return {
    x: clamp(Math.round(pos?.x ?? 0), 0, maxX),
    y: Math.max(0, Math.round(pos?.y ?? 0)),
  };
}

/**
 * If dropping `movedId` at `preferred` would land on an IDENTICAL item (same id),
 * return that item's instanceId so the caller can stack them; otherwise null.
 */
export function findStackTarget(items, movedId, preferred, cols = COLS) {
  const moved = items.find((i) => i.instanceId === movedId);
  if (!moved) return null;
  const pos = clampPos(preferred, moved.size, cols);
  const rect = { x: pos.x, y: pos.y, w: moved.size.w, h: moved.size.h };
  const target = items.find(
    (i) =>
      i.instanceId !== movedId &&
      i.id === moved.id &&
      i.pos &&
      rectsOverlap(rect, { x: i.pos.x, y: i.pos.y, w: i.size.w, h: i.size.h }),
  );
  return target ? target.instanceId : null;
}

/**
 * A free position for `size` as close to `preferred` as possible, never failing:
 * if the preferred cell is free it's used as-is (so gaps are preserved); else we
 * scan left-to-right then down until the rect fits. `others` is every OTHER item.
 */
export function resolvePosition(preferred, size, others, cols = COLS) {
  const maxX = Math.max(0, cols - size.w);
  const startX = clamp(Math.round(preferred?.x ?? 0), 0, maxX);
  const startY = Math.max(0, Math.round(preferred?.y ?? 0));

  // Preferred cell first — keeps "dropped where I pointed" when it's free.
  if (!collidesAny({ x: startX, y: startY, w: size.w, h: size.h }, others)) {
    return { x: startX, y: startY };
  }

  for (let y = startY; y < startY + 2000; y += 1) {
    for (let x = 0; x <= maxX; x += 1) {
      if (!collidesAny({ x, y, w: size.w, h: size.h }, others)) return { x, y };
    }
  }
  return { x: startX, y: startY };
}

/**
 * Place `movedId` at exactly the `preferred` cell (clamped to fit the columns),
 * then DISPLACE any items it now overlaps to their nearest free cell — cascading,
 * so nothing ends up overlapping. The dragged item always lands where you point;
 * the others get out of its way. Returns new items.
 */
export function placeItemAt(items, movedId, preferred, cols = COLS) {
  const moved = items.find((i) => i.instanceId === movedId);
  if (!moved) return items;

  const maxX = Math.max(0, cols - moved.size.w);
  const pos = {
    x: clamp(Math.round(preferred?.x ?? 0), 0, maxX),
    y: Math.max(0, Math.round(preferred?.y ?? 0)),
  };
  const withMoved = items.map((i) => (i.instanceId === movedId ? { ...i, pos } : i));

  // Off-grid items (no pos — e.g. stashed in a bag of holding) sit out of the
  // geometry entirely and are preserved as-is.
  const offGrid = withMoved.filter((i) => i.instanceId !== movedId && !i.pos);

  // Settle the rest in reading order; anyone overlapping a settled tile relocates.
  const anchor = withMoved.find((i) => i.instanceId === movedId);
  const others = withMoved
    .filter((i) => i.instanceId !== movedId && i.pos)
    .sort((a, b) => a.pos.y - b.pos.y || a.pos.x - b.pos.x);

  const settled = [anchor];
  const out = [anchor];
  for (const it of others) {
    const rect = { x: it.pos.x, y: it.pos.y, w: it.size.w, h: it.size.h };
    const next = collidesAny(rect, settled)
      ? { ...it, pos: resolvePosition(it.pos, it.size, settled, cols) }
      : it;
    settled.push(next);
    out.push(next);
  }
  return [...out, ...offGrid];
}

// Match the filter pills' classification + order (so "consumables sort with
// consumables", not lumped into Adventuring Gear). See itemType / the pill list.
const TYPE_ORDER = { weapon: 0, armor: 1, consumable: 2, tools: 3, gear: 4, magic: 5, treasure: 6 };
const tw = (it) => it.size?.w || 1;
const th = (it) => it.size?.h || 1;
const effWeight = (it) => (Number(it.weight) || 0) * (Number(it.quantity) || 1);

/**
 * Shelf-friendly shape ordering: tallest first, then widest. Placing the big
 * blocks before the small ones lets first-fit tuck the 1×1/2×1 tiles into the
 * leftover slivers beside tall items instead of stranding them — the key to
 * packing the mixed rectangles (1×1 … 3×3) without ragged gaps.
 */
const byShape = (a, b) => th(b) - th(a) || tw(b) - tw(a) || a.name.localeCompare(b.name);

// A "steppable" item shows a +/− stepper in the list: any consumable/ammo (even
// a single one, so you can restock) or any stack of more than one. Kept in sync
// with BackpackGrid's isNumbered().
const steppable = (i) =>
  itemTypes(i).includes('consumable') || (Number(i.quantity) || 1) > 1;

/** Comparator for a sort key: 'type' (default) | 'name' | 'weight-asc' | 'weight-desc'. */
function packComparator(sortKey) {
  switch (sortKey) {
    case 'name':
      return (a, b) => a.name.localeCompare(b.name);
    case 'weight-desc':
      return (a, b) => effWeight(b) - effWeight(a) || byShape(a, b);
    case 'weight-asc':
      return (a, b) => effWeight(a) - effWeight(b) || byShape(a, b);
    case 'quantity':
      return (a, b) => {
        // Everything with a stepper rises to the top (grouped together — that's
        // where the counts you're actually tracking live); the static "just a
        // count of 1" items settle below. Within each group, most-first.
        const sa = steppable(a) ? 1 : 0;
        const sb = steppable(b) ? 1 : 0;
        return (
          sb - sa ||
          (Number(b.quantity) || 1) - (Number(a.quantity) || 1) ||
          byShape(a, b)
        );
      };
    case 'type':
    default:
      return (a, b) => {
        const ta = TYPE_ORDER[itemType(a)] ?? 9;
        const tb = TYPE_ORDER[itemType(b)] ?? 9;
        if (ta !== tb) return ta - tb;
        return byShape(a, b);
      };
  }
}

/** Order items by a sort key WITHOUT assigning positions (for the flat list view). */
export function sortItems(items, sortKey = 'type') {
  return [...items].sort(packComparator(sortKey));
}

/**
 * Re-pack every item into a tidy top-left reading-order arrangement (the "Tidy
 * up" action and the fallback for items without a saved position), sorted by
 * `sortKey`. Returns new items with fresh `pos`.
 */
export function packItems(items, cols = COLS, sortKey = 'type') {
  const sorted = sortItems(items, sortKey);
  const placed = [];
  for (const it of sorted) {
    const pos = resolvePosition({ x: 0, y: 0 }, it.size, placed, cols);
    placed.push({ ...it, pos });
  }
  return placed;
}

/** Number of occupied rows (for sizing the droppable area). */
export function contentRows(items) {
  return items.reduce((max, it) => Math.max(max, (it.pos?.y || 0) + (it.size?.h || 1)), 0);
}
