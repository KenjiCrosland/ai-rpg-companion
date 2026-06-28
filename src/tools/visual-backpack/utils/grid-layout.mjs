/**
 * grid-layout.mjs
 *
 * Pure geometry for the positioned backpack grid. Each placed item carries a
 * top-left cell position `pos:{x,y}` and a `size:{w,h}`. The grid is a fixed
 * number of columns wide and grows downward without limit — it NEVER rejects a
 * drop (weight is the only real limit). Dropping onto occupied cells slides to
 * the nearest free spot rather than failing. No DOM.
 */

export const COLS = 8;

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

  // Settle the rest in reading order; anyone overlapping a settled tile relocates.
  const anchor = withMoved.find((i) => i.instanceId === movedId);
  const others = withMoved
    .filter((i) => i.instanceId !== movedId)
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
  return out;
}

const CATEGORY_ORDER = { Weapon: 0, Armor: 1, 'Adventuring Gear': 2, Tools: 3 };
const area = (it) => (it.size?.w || 1) * (it.size?.h || 1);

/**
 * Re-pack every item into a tidy top-left reading-order arrangement (the "Tidy
 * up" action and the fallback for items without a saved position). Groups by
 * category, biggest first. Returns new items with fresh `pos`.
 */
export function packItems(items, cols = COLS) {
  const sorted = [...items].sort((a, b) => {
    const ca = CATEGORY_ORDER[a.category] ?? 9;
    const cb = CATEGORY_ORDER[b.category] ?? 9;
    if (ca !== cb) return ca - cb;
    if (area(b) !== area(a)) return area(b) - area(a);
    return a.name.localeCompare(b.name);
  });

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
