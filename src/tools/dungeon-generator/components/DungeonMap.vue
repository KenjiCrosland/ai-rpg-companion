<template>
  <div class="dungeon-map">
    <svg ref="dungeonSvg" class="responsive-svg" :viewBox="`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`"
      :width="viewBox.w" :height="viewBox.h" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision"
      @click="handleMapClick">
      <defs>
        <!-- Grid pattern -->
        <pattern id="grid-pattern" :width="tileSize" :height="tileSize" patternUnits="userSpaceOnUse">
          <rect :width="tileSize" :height="tileSize" fill="none" stroke="#b8d4e3" stroke-width="0.35" opacity="0.7" />
        </pattern>

        <!-- Pencil filter — soft blur + slight opacity for hand-drawn feel -->
        <filter id="pencil-stroke" x="-1%" y="-1%" width="102%" height="102%" color-interpolation-filters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.45" result="softened" />
          <feComponentTransfer in="softened">
            <feFuncA type="linear" slope="0.88" />
          </feComponentTransfer>
        </filter>
      </defs>

      <!-- Background -->
      <rect :x="viewBox.x" :y="viewBox.y" :width="viewBox.w" :height="viewBox.h" fill="#f3f3e8" />
      <!-- Grid -->
      <rect :x="viewBox.x" :y="viewBox.y" :width="viewBox.w" :height="viewBox.h" fill="url(#grid-pattern)" />

      <!-- Rooms -->
      <template v-for="room in rooms" :key="'room-' + room.id">
        <template v-if="room.type === 'merged'">
          <template v-for="(section, si) in room.sections" :key="'section-' + room.id + '-' + si">
            <g v-bind="roomOutlinePaths({ ...section, id: room.id })"></g>
          </template>
        </template>
        <template v-else>
          <g v-bind="roomOutlinePaths(room)"></g>
        </template>
      </template>

      <!-- Room outlines and doorways rendered via path elements -->
      <template v-for="room in rooms" :key="'outline-' + room.id">
        <template v-if="room.type === 'merged'">
          <!-- Single perimeter path for the entire merged room -->
          <path :d="buildMergedRoomPerimeterPath(room)" fill="none" stroke="#6b6b6b" stroke-width="2.2"
            stroke-linecap="round" filter="url(#pencil-stroke)" />
          <!-- Doorways from each section (non-merged only) -->
          <template v-for="(section, si) in room.sections" :key="'sdw-' + room.id + '-' + si">
            <template v-for="(dw, di) in (section.doorways || [])" :key="'dw-' + room.id + '-' + si + '-' + di">
              <g v-if="dw.type !== 'merged'" v-html="buildDoorwaySvg({ ...section, id: room.id }, dw)"
                filter="url(#pencil-stroke)"></g>
            </template>
          </template>
        </template>
        <template v-else>
          <!-- Circular room (only if safe — truly square enough) -->
          <template v-if="room.shape === 'circular' && isCircleSafe(room)">
            <path :d="buildCircularRoomPath(room)" fill="none" stroke="#6b6b6b" stroke-width="2.2"
              stroke-linecap="round" filter="url(#pencil-stroke)" />
          </template>
          <!-- Domed room — rect with one curved wall -->
          <template v-else-if="room.shape === 'domed'">
            <path :d="buildDomedRoomPath(room)" fill="none" stroke="#6b6b6b" stroke-width="2.2" stroke-linecap="round"
              filter="url(#pencil-stroke)" />
          </template>
          <!-- Capsule room — curved narrow ends, straight long sides -->
          <template v-else-if="room.shape === 'capsule'">
            <path :d="buildCapsuleRoomPath(room)" fill="none" stroke="#6b6b6b" stroke-width="2.2" stroke-linecap="round"
              filter="url(#pencil-stroke)" />
          </template>
          <!-- Standard rectangular room -->
          <template v-else>
            <path :d="buildRoomOutlinePath(room)" fill="none" stroke="#6b6b6b" stroke-width="2.2" stroke-linecap="round"
              filter="url(#pencil-stroke)" />
          </template>
          <!-- Doorways (all shapes) -->
          <template v-for="(dw, di) in (room.doorways || [])" :key="'dw-' + room.id + '-' + di">
            <g v-if="dw.type !== 'merged'" v-html="buildDoorwaySvg(room, dw)" filter="url(#pencil-stroke)"></g>
          </template>
          <!-- Merged wall extensions (rectangular rooms only) -->
          <template v-for="(dw, di) in (room.doorways || [])" :key="'mw-' + room.id + '-' + di">
            <path v-if="dw.type === 'merged' && !room.shape" :d="buildMergedWallPath(room, dw)" fill="none"
              stroke="#6b6b6b" stroke-width="2.2" stroke-linecap="round" filter="url(#pencil-stroke)" />
          </template>
        </template>
      </template>

      <!-- Room numbers (interactive) -->
      <g v-for="pos in numberPositions" :key="'num-' + pos.roomId" class="room-number"
        :class="{ hovered: hoveredRoomId === pos.roomId, clicked: clickedRoomId === pos.roomId }"
        @click.stop="handleRoomClick(pos)" @mouseenter="hoveredRoomId = pos.roomId" @mouseleave="hoveredRoomId = null"
        @mousedown="clickedRoomId = pos.roomId" style="cursor: pointer;">
        <!-- Invisible hit area -->
        <circle :cx="pos.x" :cy="pos.y" r="10" fill="transparent" />
        <!-- Room number text -->
        <text :x="pos.x" :y="pos.y" text-anchor="middle" dominant-baseline="central" fill="#222"
          :font-size="hoveredRoomId === pos.roomId || clickedRoomId === pos.roomId ? 16 : 14"
          :font-weight="hoveredRoomId === pos.roomId || clickedRoomId === pos.roomId ? 'bold' : 'normal'"
          font-family="Arial, sans-serif" filter="url(#pencil-stroke)">{{ pos.roomId }}</text>
      </g>

      <!-- Boss room star icon -->
      <template v-for="pos in numberPositions" :key="'boss-' + pos.roomId">
        <g v-if="isBossRoom(pos.roomId)">
          <path :d="buildStarPath(bossStarPos(pos.roomId).x, bossStarPos(pos.roomId).y, 3.5, 1.5)" fill="#4a4a4a" />
          <circle :cx="bossStarPos(pos.roomId).x" :cy="bossStarPos(pos.roomId).y" r="5" fill="none" stroke="#4a4a4a"
            stroke-width="0.8" />
        </g>
      </template>

      <!-- Entrance arrow -->
      <g v-if="entranceGap" v-html="buildEntranceArrowSvg()"></g>
    </svg>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const emit = defineEmits(['roomClicked', 'mapClicked']);

const props = defineProps({
  rooms: {
    type: Array,
    required: true,
  },
  tileSize: {
    type: Number,
    default: 16,
  },
  dungeonName: {
    type: String,
    required: true,
  },
});

const dungeonSvg = ref(null);
const hoveredRoomId = ref(null);
const clickedRoomId = ref(null);

defineExpose({
  downloadCanvasAsImage() {
    const svg = dungeonSvg.value;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const canvas = document.createElement('canvas');
    canvas.width = viewBox.value.w;
    canvas.height = viewBox.value.h;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const link = document.createElement('a');
      link.download = `${props.dungeonName}-map.png`;
      link.href = canvas.toDataURL();
      link.click();
    };
    img.src = url;
  },
});

// Compute the viewBox from room extents
const viewBox = computed(() => {
  const T = props.tileSize;
  const padding = 2;

  const allX = props.rooms.flatMap(room => {
    if (room.type === 'merged') {
      return room.sections.flatMap(s => [s.x, s.x + s.width]);
    }
    return [room.x, room.x + room.width];
  });

  const allY = props.rooms.flatMap(room => {
    if (room.type === 'merged') {
      return room.sections.flatMap(s => [s.y, s.y + s.height]);
    }
    return [room.y, room.y + room.height];
  });

  const minX = Math.min(...allX) - padding;
  const maxX = Math.max(...allX) + padding;
  const minY = Math.min(...allY) - padding;
  const maxY = Math.max(...allY) + padding;

  return {
    x: minX * T,
    y: minY * T,
    w: (maxX - minX) * T,
    h: (maxY - minY) * T,
  };
});

// Compute group map for room number positioning
const groupMap = computed(() => {
  const map = new Map();

  props.rooms.forEach(room => {
    const roomId = room.id;
    if (!map.has(roomId)) {
      map.set(roomId, { tiles: new Set(), minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity, roomId });
    }
    const group = map.get(roomId);

    const collectTiles = (r) => {
      for (let i = 0; i < r.width; i++) {
        for (let j = 0; j < r.height; j++) {
          const tileX = r.x + i;
          const tileY = r.y + j;
          group.tiles.add(`${tileX},${tileY}`);
          group.minX = Math.min(group.minX, tileX);
          group.maxX = Math.max(group.maxX, tileX + 1);
          group.minY = Math.min(group.minY, tileY);
          group.maxY = Math.max(group.maxY, tileY + 1);
        }
      }
    };

    if (room.type === 'merged') {
      room.sections.forEach(collectTiles);
    } else {
      collectTiles(room);
    }
  });

  return map;
});

// Compute number positions from group map
const numberPositions = computed(() => {
  const T = props.tileSize;
  const positions = [];

  groupMap.value.forEach((group) => {
    const tiles = Array.from(group.tiles).map(key => {
      const [x, y] = key.split(',').map(Number);
      return { x, y };
    });
    if (tiles.length === 0) return;

    const sumX = tiles.reduce((acc, t) => acc + t.x + 0.5, 0);
    const sumY = tiles.reduce((acc, t) => acc + t.y + 0.5, 0);
    let cx = sumX / tiles.length;
    let cy = sumY / tiles.length;
    cx = Math.max(group.minX, Math.min(cx, group.maxX));
    cy = Math.max(group.minY, Math.min(cy, group.maxY));

    positions.push({
      roomId: group.roomId,
      x: cx * T,
      y: cy * T,
    });
  });

  return positions;
});

// Compute entrance gap info — pick a free side that doesn't collide with other rooms
const entranceGap = computed(() => {
  const room = props.rooms.find(r => r.roomType === 'entrance');
  if (!room || room.type === 'merged') return null;

  const T = props.tileSize;
  const usedSides = new Set((room.doorways || []).map(d => d.side));

  // Collect all occupied tile positions from every room
  const occupiedTiles = new Set();
  props.rooms.forEach(r => {
    if (r.id === room.id) return;
    const addTiles = (rm) => {
      for (let i = -1; i <= rm.width; i++) {
        for (let j = -1; j <= rm.height; j++) {
          occupiedTiles.add(`${rm.x + i},${rm.y + j}`);
        }
      }
    };
    if (r.type === 'merged') {
      r.sections.forEach(addTiles);
    } else {
      addTiles(r);
    }
  });

  // Check if a candidate entrance position collides with other rooms
  function isBlocked(side, position) {
    // Check the 2 tiles extending outward from the gap (corridor + arrow space)
    for (let ext = 1; ext <= 2; ext++) {
      let tx, ty;
      if (side === 'bottom') { tx = room.x + position; ty = room.y + room.height + ext - 1; }
      else if (side === 'top') { tx = room.x + position; ty = room.y - ext; }
      else if (side === 'left') { tx = room.x - ext; ty = room.y + position; }
      else { tx = room.x + room.width + ext - 1; ty = room.y + position; }
      if (occupiedTiles.has(`${tx},${ty}`)) return true;
    }
    return false;
  }

  // Try each side, pick first that's free and unblocked
  const candidates = ['bottom', 'top', 'left', 'right'];
  let bestSide = null;
  let bestPosition = 0;

  for (const side of candidates) {
    if (usedSides.has(side)) continue;
    const dim = (side === 'top' || side === 'bottom') ? room.width : room.height;
    const position = Math.floor(dim / 2);
    if (!isBlocked(side, position)) {
      bestSide = side;
      bestPosition = position;
      break;
    }
    // Try other positions on this side
    for (let p = 1; p < dim - 1; p++) {
      if (p === position) continue;
      if (!isBlocked(side, p)) {
        bestSide = side;
        bestPosition = p;
        break;
      }
    }
    if (bestSide) break;
  }

  if (!bestSide) return null;

  return { roomId: room.id, side: bestSide, position: bestPosition };
});

// Build entrance arrow SVG — short corridor + triangle pointing into the room
function buildEntranceArrowSvg() {
  const eg = entranceGap.value;
  if (!eg) return '';
  const room = props.rooms.find(r => r.id === eg.roomId);
  if (!room) return '';

  const T = props.tileSize;
  const ox = room.x * T, oy = room.y * T;
  const w = room.width * T, h = room.height * T;
  const stroke = '#6b6b6b';
  const sw = '2.2';
  const p = eg.position;
  let svg = '';

  // Arc intersection helpers for circular rooms
  function arcY(px) {
    if (room.shape !== 'circular') return null;
    const c = getCircleParams(room);
    const val = c.r * c.r - (px - c.cx) * (px - c.cx);
    return val < 0 ? null : { top: c.cy - Math.sqrt(val), bottom: c.cy + Math.sqrt(val) };
  }
  function arcX(py) {
    if (room.shape !== 'circular') return null;
    const c = getCircleParams(room);
    const val = c.r * c.r - (py - c.cy) * (py - c.cy);
    return val < 0 ? null : { left: c.cx - Math.sqrt(val), right: c.cx + Math.sqrt(val) };
  }

  const corridorLen = T * 0.8;
  const arrowW = T * 0.35;
  const arrowH = T * 0.4;

  if (eg.side === 'bottom') {
    const lx = ox + p * T, rx = ox + (p + 1) * T;
    const sy = oy + h;
    const lA = arcY(lx), rA = arcY(rx);
    const ly = lA ? lA.bottom : sy;
    const ry = rA ? rA.bottom : sy;
    svg += `<line x1="${lx}" y1="${typeof ly === 'number' ? ly.toFixed(1) : ly}" x2="${lx}" y2="${sy + corridorLen}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
    svg += `<line x1="${rx}" y1="${typeof ry === 'number' ? ry.toFixed(1) : ry}" x2="${rx}" y2="${sy + corridorLen}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
    const cx = (lx + rx) / 2, ty = sy + corridorLen + arrowH + 2;
    svg += `<polygon points="${cx},${ty - arrowH} ${cx - arrowW},${ty} ${cx + arrowW},${ty}" fill="#4a4a4a"/>`;
  } else if (eg.side === 'top') {
    const lx = ox + p * T, rx = ox + (p + 1) * T;
    const sy = oy;
    const lA = arcY(lx), rA = arcY(rx);
    const ly = lA ? lA.top : sy;
    const ry = rA ? rA.top : sy;
    svg += `<line x1="${lx}" y1="${typeof ly === 'number' ? ly.toFixed(1) : ly}" x2="${lx}" y2="${sy - corridorLen}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
    svg += `<line x1="${rx}" y1="${typeof ry === 'number' ? ry.toFixed(1) : ry}" x2="${rx}" y2="${sy - corridorLen}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
    const cx = (lx + rx) / 2, ty = sy - corridorLen - arrowH - 2;
    svg += `<polygon points="${cx},${ty + arrowH} ${cx - arrowW},${ty} ${cx + arrowW},${ty}" fill="#4a4a4a"/>`;
  } else if (eg.side === 'left') {
    const ty = oy + p * T, by = oy + (p + 1) * T;
    const sx = ox;
    const tA = arcX(ty), bA = arcX(by);
    const tx = tA ? tA.left : sx;
    const bx = bA ? bA.left : sx;
    svg += `<line x1="${typeof tx === 'number' ? tx.toFixed(1) : tx}" y1="${ty}" x2="${sx - corridorLen}" y2="${ty}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
    svg += `<line x1="${typeof bx === 'number' ? bx.toFixed(1) : bx}" y1="${by}" x2="${sx - corridorLen}" y2="${by}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
    const cy = (ty + by) / 2, ttx = sx - corridorLen - arrowH - 2;
    svg += `<polygon points="${ttx + arrowH},${cy} ${ttx},${cy - arrowW} ${ttx},${cy + arrowW}" fill="#4a4a4a"/>`;
  } else {
    const ty = oy + p * T, by = oy + (p + 1) * T;
    const sx = ox + w;
    const tA = arcX(ty), bA = arcX(by);
    const tx = tA ? tA.right : sx;
    const bx = bA ? bA.right : sx;
    svg += `<line x1="${typeof tx === 'number' ? tx.toFixed(1) : tx}" y1="${ty}" x2="${sx + corridorLen}" y2="${ty}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
    svg += `<line x1="${typeof bx === 'number' ? bx.toFixed(1) : bx}" y1="${by}" x2="${sx + corridorLen}" y2="${by}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
    const cy = (ty + by) / 2, ttx = sx + corridorLen + arrowH + 2;
    svg += `<polygon points="${ttx - arrowH},${cy} ${ttx},${cy - arrowW} ${ttx},${cy + arrowW}" fill="#4a4a4a"/>`;
  }

  return svg;
}

// Find all flat rooms (expanding merged rooms into sections)
function getAllFlatRooms() {
  const all = [];
  props.rooms.forEach(r => {
    if (r.type === 'merged') {
      all.push(...r.sections);
    } else {
      all.push(r);
    }
  });
  return all;
}

// Build the room outline path, leaving gaps for doorways
function buildRoomOutlinePath(room) {
  const { x, y, width, height } = room;
  const T = props.tileSize;
  const ox = x * T;
  const oy = y * T;

  // Include entrance gap as a virtual doorway if this is the entrance room
  let doorways = room.doorways || [];
  const eg = entranceGap.value;
  if (eg && eg.roomId === room.id) {
    doorways = [...doorways, { side: eg.side, position: eg.position, type: 'entrance' }];
  }

  const hasMerged = (side) => doorways?.some(d => d.side === side && d.type === 'merged');

  let d = '';

  // Top side
  if (!hasMerged('top')) {
    const topDoors = (doorways?.filter(dw => dw.side === 'top' && dw.type !== 'merged') || []).sort((a, b) => a.position - b.position);
    let curX = ox;
    d += `M ${curX} ${oy} `;
    topDoors.forEach(dw => {
      const doorX = ox + dw.position * T;
      d += `L ${doorX} ${oy} `;
      d += `M ${doorX + T} ${oy} `;
      curX = doorX + T;
    });
    d += `L ${ox + width * T} ${oy} `;
  }

  // Right side
  if (!hasMerged('right')) {
    const rightDoors = (doorways?.filter(dw => dw.side === 'right' && dw.type !== 'merged') || []).sort((a, b) => a.position - b.position);
    let curY = oy;
    d += `M ${ox + width * T} ${oy} `;
    rightDoors.forEach(dw => {
      const doorY = oy + dw.position * T;
      d += `L ${ox + width * T} ${doorY} `;
      d += `M ${ox + width * T} ${doorY + T} `;
      curY = doorY + T;
    });
    d += `L ${ox + width * T} ${oy + height * T} `;
  }

  // Bottom side
  if (!hasMerged('bottom')) {
    const bottomDoors = (doorways?.filter(dw => dw.side === 'bottom' && dw.type !== 'merged') || []).sort((a, b) => b.position - a.position);
    d += `M ${ox + width * T} ${oy + height * T} `;
    bottomDoors.forEach(dw => {
      const doorX = ox + (dw.position + 1) * T;
      d += `L ${doorX} ${oy + height * T} `;
      d += `M ${ox + dw.position * T} ${oy + height * T} `;
    });
    d += `L ${ox} ${oy + height * T} `;
  }

  // Left side
  if (!hasMerged('left')) {
    const leftDoors = (doorways?.filter(dw => dw.side === 'left' && dw.type !== 'merged') || []).sort((a, b) => b.position - a.position);
    d += `M ${ox} ${oy + height * T} `;
    leftDoors.forEach(dw => {
      const doorY = oy + (dw.position + 1) * T;
      d += `L ${ox} ${doorY} `;
      d += `M ${ox} ${oy + dw.position * T} `;
    });
    d += `L ${ox} ${oy} `;
  }

  return d;
}

// Shared circle geometry — true circle inscribed in the bounding box
function getCircleParams(room) {
  const T = props.tileSize;
  const ox = room.x * T, oy = room.y * T;
  const w = room.width * T, h = room.height * T;
  const r = Math.min(w, h) / 2 - 1;
  return { cx: ox + w / 2, cy: oy + h / 2, r };
}

// Build a true circular room path with gaps at exact doorway intersection points
function buildCircularRoomPath(room) {
  const T = props.tileSize;
  const { cx, cy, r } = getCircleParams(room);
  let doorways = (room.doorways || []).filter(dw => dw.type !== 'merged');
  const eg = entranceGap.value;
  if (eg && eg.roomId === room.id) {
    doorways = [...doorways, { side: eg.side, position: eg.position, type: 'entrance' }];
  }

  if (doorways.length === 0) {
    return `M ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy}`;
  }

  const ox = room.x * T, oy = room.y * T;
  const w = room.width * T, h = room.height * T;
  const gapAngles = [];

  // Normalize angle to [0, 2π)
  function norm(a) { return ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI); }

  doorways.forEach(dw => {
    const p = dw.position;
    if (dw.side === 'top' || dw.side === 'bottom') {
      const x1 = ox + p * T, x2 = ox + (p + 1) * T;
      const v1 = r * r - (x1 - cx) * (x1 - cx);
      const v2 = r * r - (x2 - cx) * (x2 - cx);
      if (v1 < 0 || v2 < 0) return;
      const iy1 = dw.side === 'top' ? cy - Math.sqrt(v1) : cy + Math.sqrt(v1);
      const iy2 = dw.side === 'top' ? cy - Math.sqrt(v2) : cy + Math.sqrt(v2);
      let a1 = norm(Math.atan2(iy1 - cy, x1 - cx));
      let a2 = norm(Math.atan2(iy2 - cy, x2 - cx));
      // Ensure a1 < a2, taking the short arc
      if (a1 > a2) { const tmp = a1; a1 = a2; a2 = tmp; }
      // If the gap is more than π, it's the wrong way around
      if (a2 - a1 > Math.PI) { gapAngles.push({ a1: a2, a2: a1 + 2 * Math.PI }); }
      else { gapAngles.push({ a1, a2 }); }
    } else {
      const y1 = oy + p * T, y2 = oy + (p + 1) * T;
      const v1 = r * r - (y1 - cy) * (y1 - cy);
      const v2 = r * r - (y2 - cy) * (y2 - cy);
      if (v1 < 0 || v2 < 0) return;
      const ix1 = dw.side === 'left' ? cx - Math.sqrt(v1) : cx + Math.sqrt(v1);
      const ix2 = dw.side === 'left' ? cx - Math.sqrt(v2) : cx + Math.sqrt(v2);
      let a1 = norm(Math.atan2(y1 - cy, ix1 - cx));
      let a2 = norm(Math.atan2(y2 - cy, ix2 - cx));
      if (a1 > a2) { const tmp = a1; a1 = a2; a2 = tmp; }
      if (a2 - a1 > Math.PI) { gapAngles.push({ a1: a2, a2: a1 + 2 * Math.PI }); }
      else { gapAngles.push({ a1, a2 }); }
    }
  });

  gapAngles.sort((a, b) => a.a1 - b.a1);

  if (gapAngles.length === 0) {
    return `M ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy}`;
  }

  let d = '';
  for (let i = 0; i < gapAngles.length; i++) {
    const gapEnd = gapAngles[i].a2;
    const nextGapStart = gapAngles[(i + 1) % gapAngles.length].a1;
    // Adjust nextGapStart to be after gapEnd
    let ngs = nextGapStart;
    while (ngs < gapEnd) ngs += 2 * Math.PI;

    const startX = cx + r * Math.cos(gapEnd);
    const startY = cy + r * Math.sin(gapEnd);
    const endX = cx + r * Math.cos(ngs);
    const endY = cy + r * Math.sin(ngs);

    let sweep = ngs - gapEnd;
    if (sweep <= 0.01) continue; // skip zero-length arcs
    const largeArc = sweep > Math.PI ? 1 : 0;

    d += `M ${startX.toFixed(1)} ${startY.toFixed(1)} A ${r} ${r} 0 ${largeArc} 1 ${endX.toFixed(1)} ${endY.toFixed(1)} `;
  }

  return d;
}

// Build connector lines from circle arc endpoints to bounding box edges
function buildCircularConnectorsSvg(room) {
  const T = props.tileSize;
  const { cx, cy, r } = getCircleParams(room);
  const ox = room.x * T, oy = room.y * T;
  const w = room.width * T, h = room.height * T;
  let doorways = (room.doorways || []).filter(dw => dw.type !== 'merged');
  const eg = entranceGap.value;
  if (eg && eg.roomId === room.id) {
    doorways = [...doorways, { side: eg.side, position: eg.position, type: 'entrance' }];
  }
  const stroke = '#6b6b6b';
  let svg = '';

  const inset = 1; // offset lines inward from grid so they sit inside the opening

  doorways.forEach(dw => {
    const p = dw.position;
    if (dw.side === 'top' || dw.side === 'bottom') {
      const x1 = ox + p * T + inset, x2 = ox + (p + 1) * T - inset;
      const v1 = r * r - ((ox + p * T) - cx) * ((ox + p * T) - cx);
      const v2 = r * r - ((ox + (p + 1) * T) - cx) * ((ox + (p + 1) * T) - cx);
      if (v1 < 0 || v2 < 0) return;
      const edgeY = dw.side === 'top' ? oy : oy + h;
      const iy1 = dw.side === 'top' ? cy - Math.sqrt(v1) : cy + Math.sqrt(v1);
      const iy2 = dw.side === 'top' ? cy - Math.sqrt(v2) : cy + Math.sqrt(v2);
      svg += `<line x1="${x1}" y1="${edgeY}" x2="${x1}" y2="${iy1.toFixed(1)}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
      svg += `<line x1="${x2}" y1="${edgeY}" x2="${x2}" y2="${iy2.toFixed(1)}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
    } else {
      const y1 = oy + p * T + inset, y2 = oy + (p + 1) * T - inset;
      const v1 = r * r - ((oy + p * T) - cy) * ((oy + p * T) - cy);
      const v2 = r * r - ((oy + (p + 1) * T) - cy) * ((oy + (p + 1) * T) - cy);
      if (v1 < 0 || v2 < 0) return;
      const edgeX = dw.side === 'left' ? ox : ox + w;
      const ix1 = dw.side === 'left' ? cx - Math.sqrt(v1) : cx + Math.sqrt(v1);
      const ix2 = dw.side === 'left' ? cx - Math.sqrt(v2) : cx + Math.sqrt(v2);
      svg += `<line x1="${edgeX}" y1="${y1}" x2="${ix1.toFixed(1)}" y2="${y1}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
      svg += `<line x1="${edgeX}" y1="${y2}" x2="${ix2.toFixed(1)}" y2="${y2}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
    }
  });

  return svg;
}

// Build a domed room path — rect with one curved wall, doorway gaps on straight sides
function buildDomedRoomPath(room) {
  const { x, y, width, height } = room;
  const T = props.tileSize;
  const ox = x * T;
  const oy = y * T;
  const w = width * T;
  const h = height * T;
  const curvedSide = room.domedSide || 'top';
  const arcDepth = Math.min(w, h) * 0.3;

  let doorways = room.doorways || [];
  const eg = entranceGap.value;
  if (eg && eg.roomId === room.id) {
    doorways = [...doorways, { side: eg.side, position: eg.position, type: 'entrance' }];
  }
  const nonMergedDoors = doorways.filter(dw => dw.type !== 'merged');

  function straightSide(side) {
    const doors = nonMergedDoors.filter(dw => dw.side === side).sort((a, b) => a.position - b.position);
    let d = '';
    if (side === 'top') {
      d += `M ${ox} ${oy} `;
      doors.forEach(dw => { d += `L ${ox + dw.position * T} ${oy} M ${ox + (dw.position + 1) * T} ${oy} `; });
      d += `L ${ox + w} ${oy} `;
    } else if (side === 'bottom') {
      d += `M ${ox + w} ${oy + h} `;
      doors.sort((a, b) => b.position - a.position).forEach(dw => { d += `L ${ox + (dw.position + 1) * T} ${oy + h} M ${ox + dw.position * T} ${oy + h} `; });
      d += `L ${ox} ${oy + h} `;
    } else if (side === 'left') {
      d += `M ${ox} ${oy + h} `;
      doors.sort((a, b) => b.position - a.position).forEach(dw => { d += `L ${ox} ${oy + (dw.position + 1) * T} M ${ox} ${oy + dw.position * T} `; });
      d += `L ${ox} ${oy} `;
    } else if (side === 'right') {
      d += `M ${ox + w} ${oy} `;
      doors.forEach(dw => { d += `L ${ox + w} ${oy + dw.position * T} M ${ox + w} ${oy + (dw.position + 1) * T} `; });
      d += `L ${ox + w} ${oy + h} `;
    }
    return d;
  }

  let d = '';
  const sides = ['top', 'right', 'bottom', 'left'];

  sides.forEach(side => {
    if (side === curvedSide) {
      // If any doorway is on the curved side, fall back to straight with gaps
      const hasDoorOnCurve = nonMergedDoors.some(dw => dw.side === curvedSide);
      if (hasDoorOnCurve) {
        d += straightSide(side);
      } else {
        if (side === 'top') d += `M ${ox + w} ${oy} Q ${ox + w / 2} ${oy - arcDepth} ${ox} ${oy} `;
        else if (side === 'bottom') d += `M ${ox} ${oy + h} Q ${ox + w / 2} ${oy + h + arcDepth} ${ox + w} ${oy + h} `;
        else if (side === 'left') d += `M ${ox} ${oy + h} Q ${ox - arcDepth} ${oy + h / 2} ${ox} ${oy} `;
        else if (side === 'right') d += `M ${ox + w} ${oy} Q ${ox + w + arcDepth} ${oy + h / 2} ${ox + w} ${oy + h} `;
      }
    } else {
      d += straightSide(side);
    }
  });

  return d;
}

// Build a capsule room path — straight long sides, curved narrow ends, doorway gaps on straight sides
function buildCapsuleRoomPath(room) {
  const { x, y, width, height } = room;
  const T = props.tileSize;
  const ox = x * T;
  const oy = y * T;
  const w = width * T;
  const h = height * T;
  const arcDepth = Math.min(w, h) * 0.3;
  let doorways = room.doorways || [];
  const eg = entranceGap.value;
  if (eg && eg.roomId === room.id) {
    doorways = [...doorways, { side: eg.side, position: eg.position, type: 'entrance' }];
  }
  const nonMergedDoors = doorways.filter(dw => dw.type !== 'merged');

  function straightSide(side) {
    const doors = nonMergedDoors.filter(dw => dw.side === side).sort((a, b) => a.position - b.position);
    let d = '';
    if (side === 'top') {
      d += `M ${ox} ${oy} `;
      doors.forEach(dw => { d += `L ${ox + dw.position * T} ${oy} M ${ox + (dw.position + 1) * T} ${oy} `; });
      d += `L ${ox + w} ${oy} `;
    } else if (side === 'bottom') {
      d += `M ${ox + w} ${oy + h} `;
      doors.sort((a, b) => b.position - a.position).forEach(dw => { d += `L ${ox + (dw.position + 1) * T} ${oy + h} M ${ox + dw.position * T} ${oy + h} `; });
      d += `L ${ox} ${oy + h} `;
    } else if (side === 'left') {
      d += `M ${ox} ${oy + h} `;
      doors.sort((a, b) => b.position - a.position).forEach(dw => { d += `L ${ox} ${oy + (dw.position + 1) * T} M ${ox} ${oy + dw.position * T} `; });
      d += `L ${ox} ${oy} `;
    } else if (side === 'right') {
      d += `M ${ox + w} ${oy} `;
      doors.forEach(dw => { d += `L ${ox + w} ${oy + dw.position * T} M ${ox + w} ${oy + (dw.position + 1) * T} `; });
      d += `L ${ox + w} ${oy + h} `;
    }
    return d;
  }

  let d = '';

  if (w >= h) {
    // Wider than tall — left and right are curved
    const hasRightDoor = nonMergedDoors.some(dw => dw.side === 'right');
    const hasLeftDoor = nonMergedDoors.some(dw => dw.side === 'left');
    d += straightSide('top');
    d += hasRightDoor ? straightSide('right') : `M ${ox + w} ${oy} Q ${ox + w + arcDepth} ${oy + h / 2} ${ox + w} ${oy + h} `;
    d += straightSide('bottom');
    d += hasLeftDoor ? straightSide('left') : `M ${ox} ${oy + h} Q ${ox - arcDepth} ${oy + h / 2} ${ox} ${oy} `;
  } else {
    // Taller than wide — top and bottom are curved
    const hasTopDoor = nonMergedDoors.some(dw => dw.side === 'top');
    const hasBottomDoor = nonMergedDoors.some(dw => dw.side === 'bottom');
    d += hasTopDoor ? straightSide('top') : `M ${ox} ${oy} Q ${ox + w / 2} ${oy - arcDepth} ${ox + w} ${oy} `;
    d += straightSide('right');
    d += hasBottomDoor ? straightSide('bottom') : `M ${ox + w} ${oy + h} Q ${ox + w / 2} ${oy + h + arcDepth} ${ox} ${oy + h} `;
    d += straightSide('left');
  }

  return d;
}

// Build a single perimeter path for a merged room by tracing outer tile edges
function buildMergedRoomPerimeterPath(room) {
  const T = props.tileSize;
  const tiles = new Set();

  room.sections.forEach(section => {
    for (let i = 0; i < section.width; i++) {
      for (let j = 0; j < section.height; j++) {
        tiles.add(`${section.x + i},${section.y + j}`);
      }
    }
  });

  const doorwayEdges = new Set();
  room.sections.forEach(section => {
    (section.doorways || []).forEach(dw => {
      if (dw.type === 'merged') return;
      const sx = section.x, sy = section.y;
      if (dw.side === 'top') doorwayEdges.add(`h,${sy},${sx + dw.position}`);
      if (dw.side === 'bottom') doorwayEdges.add(`h,${sy + section.height},${sx + dw.position}`);
      if (dw.side === 'left') doorwayEdges.add(`v,${sx},${sy + dw.position}`);
      if (dw.side === 'right') doorwayEdges.add(`v,${sx + section.width},${sy + dw.position}`);
    });
  });

  const hEdges = {};
  const vEdges = {};

  tiles.forEach(key => {
    const [tx, ty] = key.split(',').map(Number);

    if (!tiles.has(`${tx},${ty - 1}`) && !doorwayEdges.has(`h,${ty},${tx}`)) {
      if (!hEdges[ty]) hEdges[ty] = [];
      hEdges[ty].push(tx);
    }
    if (!tiles.has(`${tx},${ty + 1}`) && !doorwayEdges.has(`h,${ty + 1},${tx}`)) {
      const by = ty + 1;
      if (!hEdges[by]) hEdges[by] = [];
      hEdges[by].push(tx);
    }
    if (!tiles.has(`${tx - 1},${ty}`) && !doorwayEdges.has(`v,${tx},${ty}`)) {
      if (!vEdges[tx]) vEdges[tx] = [];
      vEdges[tx].push(ty);
    }
    if (!tiles.has(`${tx + 1},${ty}`) && !doorwayEdges.has(`v,${tx + 1},${ty}`)) {
      const rx = tx + 1;
      if (!vEdges[rx]) vEdges[rx] = [];
      vEdges[rx].push(ty);
    }
  });

  let d = '';

  for (const y in hEdges) {
    const xCoords = hEdges[y].sort((a, b) => a - b);
    let startX = xCoords[0];
    let endX = startX + 1;
    for (let i = 1; i < xCoords.length; i++) {
      if (xCoords[i] === endX) {
        endX = xCoords[i] + 1;
      } else {
        d += `M ${startX * T} ${y * T} L ${endX * T} ${y * T} `;
        startX = xCoords[i];
        endX = startX + 1;
      }
    }
    d += `M ${startX * T} ${y * T} L ${endX * T} ${y * T} `;
  }

  for (const x in vEdges) {
    const yCoords = vEdges[x].sort((a, b) => a - b);
    let startY = yCoords[0];
    let endY = startY + 1;
    for (let i = 1; i < yCoords.length; i++) {
      if (yCoords[i] === endY) {
        endY = yCoords[i] + 1;
      } else {
        d += `M ${x * T} ${startY * T} L ${x * T} ${endY * T} `;
        startY = yCoords[i];
        endY = startY + 1;
      }
    }
    d += `M ${x * T} ${startY * T} L ${x * T} ${endY * T} `;
  }

  return d;
}

// Build doorway SVG strings
function buildDoorwaySvg(room, doorway) {
  const type = doorway.type || 'door';
  if (type === 'door') return buildDoorSvg(room, doorway, false);
  if (type === 'locked-door') return buildDoorSvg(room, doorway, true);
  if (type === 'secret') return buildSecretDoorSvg(room, doorway);
  if (type === 'corridor') return buildCorridorWallsSvg(room, doorway);
  if (type === 'stairs' && room.id < doorway.connectedRoomId) return buildStairsSvg(room, doorway);
  return '';
}

function buildDoorSvg(room, doorway, isLocked) {
  const { x, y, width, height } = room;
  const T = props.tileSize;
  const ox = x * T;
  const oy = y * T;

  const wallStroke = '#6b6b6b';
  const wallSw = '2.2';
  const doorStroke = '#555';
  const doorSw = '1.2';
  const doorDepth = Math.max(T / 3, 3);

  // For circular rooms, extend flanking walls inward to the arc
  function arcY(px) {
    if (room.shape !== 'circular') return null;
    const { cx, cy, r } = getCircleParams(room);
    const val = r * r - (px - cx) * (px - cx);
    if (val < 0) return null;
    return { top: cy - Math.sqrt(val), bottom: cy + Math.sqrt(val) };
  }
  function arcX(py) {
    if (room.shape !== 'circular') return null;
    const { cx, cy, r } = getCircleParams(room);
    const val = r * r - (py - cy) * (py - cy);
    if (val < 0) return null;
    return { left: cx - Math.sqrt(val), right: cx + Math.sqrt(val) };
  }

  let svg = '';

  if (doorway.side === 'top') {
    const sx = ox + doorway.position * T;
    const sy = oy;
    const lA = arcY(sx), rA = arcY(sx + T);
    const ly1 = lA ? lA.top : sy;
    const ry1 = rA ? rA.top : sy;
    svg += `<line x1="${sx}" y1="${ly1.toFixed ? ly1.toFixed(1) : ly1}" x2="${sx}" y2="${sy - T}" stroke="${wallStroke}" stroke-width="${wallSw}" stroke-linecap="round"/>`;
    svg += `<line x1="${sx + T}" y1="${ry1.toFixed ? ry1.toFixed(1) : ry1}" x2="${sx + T}" y2="${sy - T}" stroke="${wallStroke}" stroke-width="${wallSw}" stroke-linecap="round"/>`;
    const dy = sy - T / 2 - doorDepth / 2;
    svg += `<rect x="${sx}" y="${dy}" width="${T}" height="${doorDepth}" fill="#fff" stroke="${doorStroke}" stroke-width="${doorSw}"/>`;
    if (isLocked) {
      svg += `<line x1="${sx + 1}" y1="${dy + 1}" x2="${sx + T - 1}" y2="${dy + doorDepth - 1}" stroke="${doorStroke}" stroke-width="1"/>`;
      svg += `<line x1="${sx + 1}" y1="${dy + doorDepth - 1}" x2="${sx + T - 1}" y2="${dy + 1}" stroke="${doorStroke}" stroke-width="1"/>`;
    }
  }

  if (doorway.side === 'bottom') {
    const sx = ox + doorway.position * T;
    const sy = oy + height * T;
    const lA = arcY(sx), rA = arcY(sx + T);
    const ly1 = lA ? lA.bottom : sy;
    const ry1 = rA ? rA.bottom : sy;
    svg += `<line x1="${sx}" y1="${ly1.toFixed ? ly1.toFixed(1) : ly1}" x2="${sx}" y2="${sy + T}" stroke="${wallStroke}" stroke-width="${wallSw}" stroke-linecap="round"/>`;
    svg += `<line x1="${sx + T}" y1="${ry1.toFixed ? ry1.toFixed(1) : ry1}" x2="${sx + T}" y2="${sy + T}" stroke="${wallStroke}" stroke-width="${wallSw}" stroke-linecap="round"/>`;
    const dy = sy + T / 2 - doorDepth / 2;
    svg += `<rect x="${sx}" y="${dy}" width="${T}" height="${doorDepth}" fill="#fff" stroke="${doorStroke}" stroke-width="${doorSw}"/>`;
    if (isLocked) {
      svg += `<line x1="${sx + 1}" y1="${dy + 1}" x2="${sx + T - 1}" y2="${dy + doorDepth - 1}" stroke="${doorStroke}" stroke-width="1"/>`;
      svg += `<line x1="${sx + 1}" y1="${dy + doorDepth - 1}" x2="${sx + T - 1}" y2="${dy + 1}" stroke="${doorStroke}" stroke-width="1"/>`;
    }
  }

  if (doorway.side === 'left') {
    const sx = ox;
    const sy = oy + doorway.position * T;
    const tA = arcX(sy), bA = arcX(sy + T);
    const tx1 = tA ? tA.left : sx;
    const bx1 = bA ? bA.left : sx;
    svg += `<line x1="${tx1.toFixed ? tx1.toFixed(1) : tx1}" y1="${sy}" x2="${sx - T}" y2="${sy}" stroke="${wallStroke}" stroke-width="${wallSw}" stroke-linecap="round"/>`;
    svg += `<line x1="${bx1.toFixed ? bx1.toFixed(1) : bx1}" y1="${sy + T}" x2="${sx - T}" y2="${sy + T}" stroke="${wallStroke}" stroke-width="${wallSw}" stroke-linecap="round"/>`;
    const dx = sx - T / 2 - doorDepth / 2;
    svg += `<rect x="${dx}" y="${sy}" width="${doorDepth}" height="${T}" fill="#fff" stroke="${doorStroke}" stroke-width="${doorSw}"/>`;
    if (isLocked) {
      svg += `<line x1="${dx + 1}" y1="${sy + 1}" x2="${dx + doorDepth - 1}" y2="${sy + T - 1}" stroke="${doorStroke}" stroke-width="1"/>`;
      svg += `<line x1="${dx + 1}" y1="${sy + T - 1}" x2="${dx + doorDepth - 1}" y2="${sy + 1}" stroke="${doorStroke}" stroke-width="1"/>`;
    }
  }

  if (doorway.side === 'right') {
    const sx = ox + width * T;
    const sy = oy + doorway.position * T;
    const tA = arcX(sy), bA = arcX(sy + T);
    const tx1 = tA ? tA.right : sx;
    const bx1 = bA ? bA.right : sx;
    svg += `<line x1="${tx1.toFixed ? tx1.toFixed(1) : tx1}" y1="${sy}" x2="${sx + T}" y2="${sy}" stroke="${wallStroke}" stroke-width="${wallSw}" stroke-linecap="round"/>`;
    svg += `<line x1="${bx1.toFixed ? bx1.toFixed(1) : bx1}" y1="${sy + T}" x2="${sx + T}" y2="${sy + T}" stroke="${wallStroke}" stroke-width="${wallSw}" stroke-linecap="round"/>`;
    const dx = sx + T / 2 - doorDepth / 2;
    svg += `<rect x="${dx}" y="${sy}" width="${doorDepth}" height="${T}" fill="#fff" stroke="${doorStroke}" stroke-width="${doorSw}"/>`;
    if (isLocked) {
      svg += `<line x1="${dx + 1}" y1="${sy + 1}" x2="${dx + doorDepth - 1}" y2="${sy + T - 1}" stroke="${doorStroke}" stroke-width="1"/>`;
      svg += `<line x1="${dx + 1}" y1="${sy + T - 1}" x2="${dx + doorDepth - 1}" y2="${sy + 1}" stroke="${doorStroke}" stroke-width="1"/>`;
    }
  }

  return svg;
}

function buildSecretDoorSvg(room, doorway) {
  const { x, y, width, height } = room;
  const T = props.tileSize;
  const ox = x * T;
  const oy = y * T;
  const wallSeg = (T - T / 2) / 2;
  const stroke = '#6b6b6b';
  const sw = '2.2';
  let svg = '';

  if (doorway.side === 'top') {
    const sx = ox + doorway.position * T;
    const sy = oy;
    svg += `<line x1="${sx}" y1="${sy}" x2="${sx}" y2="${sy - wallSeg}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
    svg += `<line x1="${sx + T}" y1="${sy}" x2="${sx + T}" y2="${sy - wallSeg}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
    svg += `<line x1="${sx}" y1="${sy - wallSeg}" x2="${sx + T}" y2="${sy - wallSeg}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
  }

  if (doorway.side === 'bottom') {
    const sx = ox + doorway.position * T;
    const sy = oy + height * T;
    svg += `<line x1="${sx}" y1="${sy}" x2="${sx}" y2="${sy + wallSeg}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
    svg += `<line x1="${sx + T}" y1="${sy}" x2="${sx + T}" y2="${sy + wallSeg}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
    svg += `<line x1="${sx}" y1="${sy + wallSeg}" x2="${sx + T}" y2="${sy + wallSeg}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
  }

  if (doorway.side === 'left') {
    const sx = ox;
    const sy = oy + doorway.position * T;
    svg += `<line x1="${sx}" y1="${sy}" x2="${sx - wallSeg}" y2="${sy}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
    svg += `<line x1="${sx}" y1="${sy + T}" x2="${sx - wallSeg}" y2="${sy + T}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
    svg += `<line x1="${sx - wallSeg}" y1="${sy}" x2="${sx - wallSeg}" y2="${sy + T}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
  }

  if (doorway.side === 'right') {
    const sx = ox + width * T;
    const sy = oy + doorway.position * T;
    svg += `<line x1="${sx}" y1="${sy}" x2="${sx + wallSeg}" y2="${sy}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
    svg += `<line x1="${sx}" y1="${sy + T}" x2="${sx + wallSeg}" y2="${sy + T}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
    svg += `<line x1="${sx + wallSeg}" y1="${sy}" x2="${sx + wallSeg}" y2="${sy + T}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
  }

  return svg;
}

function buildCorridorWallsSvg(room, doorway) {
  const { x, y, width, height } = room;
  const T = props.tileSize;
  const ox = x * T;
  const oy = y * T;
  const stroke = '#6b6b6b';

  // For circular rooms, extend walls to arc
  function arcY(px) {
    if (room.shape !== 'circular') return null;
    const c = getCircleParams(room);
    const val = c.r * c.r - (px - c.cx) * (px - c.cx);
    return val < 0 ? null : { top: c.cy - Math.sqrt(val), bottom: c.cy + Math.sqrt(val) };
  }
  function arcX(py) {
    if (room.shape !== 'circular') return null;
    const c = getCircleParams(room);
    const val = c.r * c.r - (py - c.cy) * (py - c.cy);
    return val < 0 ? null : { left: c.cx - Math.sqrt(val), right: c.cx + Math.sqrt(val) };
  }

  let svg = '';

  if (doorway.side === 'top') {
    const cx = ox + doorway.position * T;
    const lA = arcY(cx), rA = arcY(cx + T);
    const ly = lA ? lA.top : oy;
    const ry = rA ? rA.top : oy;
    svg += `<line x1="${cx}" y1="${typeof ly === 'number' ? ly.toFixed(1) : ly}" x2="${cx}" y2="${oy - T}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
    svg += `<line x1="${cx + T}" y1="${typeof ry === 'number' ? ry.toFixed(1) : ry}" x2="${cx + T}" y2="${oy - T}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
  }

  if (doorway.side === 'bottom') {
    const cx = ox + doorway.position * T;
    const sy = oy + height * T;
    const lA = arcY(cx), rA = arcY(cx + T);
    const ly = lA ? lA.bottom : sy;
    const ry = rA ? rA.bottom : sy;
    svg += `<line x1="${cx}" y1="${typeof ly === 'number' ? ly.toFixed(1) : ly}" x2="${cx}" y2="${sy + T}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
    svg += `<line x1="${cx + T}" y1="${typeof ry === 'number' ? ry.toFixed(1) : ry}" x2="${cx + T}" y2="${sy + T}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
  }

  if (doorway.side === 'left') {
    const cy = oy + doorway.position * T;
    const tA = arcX(cy), bA = arcX(cy + T);
    const tx = tA ? tA.left : ox;
    const bx = bA ? bA.left : ox;
    svg += `<line x1="${typeof tx === 'number' ? tx.toFixed(1) : tx}" y1="${cy}" x2="${ox - T}" y2="${cy}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
    svg += `<line x1="${typeof bx === 'number' ? bx.toFixed(1) : bx}" y1="${cy + T}" x2="${ox - T}" y2="${cy + T}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
  }

  if (doorway.side === 'right') {
    const sx = ox + width * T;
    const cy = oy + doorway.position * T;
    const tA = arcX(cy), bA = arcX(cy + T);
    const tx = tA ? tA.right : sx;
    const bx = bA ? bA.right : sx;
    svg += `<line x1="${typeof tx === 'number' ? tx.toFixed(1) : tx}" y1="${cy}" x2="${sx + T}" y2="${cy}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
    svg += `<line x1="${typeof bx === 'number' ? bx.toFixed(1) : bx}" y1="${cy + T}" x2="${sx + T}" y2="${cy + T}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
  }

  return svg;
}

function buildStairsSvg(room, doorway) {
  const { x, y, width, height } = room;
  const T = props.tileSize;
  const ox = x * T;
  const oy = y * T;
  const stepH = T / 5;
  const numSteps = 3;
  const minStepLen = T / 3;
  const firstStepLen = T * 0.75;
  const stroke = '#666';
  const wallStroke = '#6b6b6b';

  // Arc helpers for circular rooms
  function arcY(px) {
    if (room.shape !== 'circular') return null;
    const c = getCircleParams(room);
    const val = c.r * c.r - (px - c.cx) * (px - c.cx);
    return val < 0 ? null : { top: c.cy - Math.sqrt(val), bottom: c.cy + Math.sqrt(val) };
  }
  function arcX(py) {
    if (room.shape !== 'circular') return null;
    const c = getCircleParams(room);
    const val = c.r * c.r - (py - c.cy) * (py - c.cy);
    return val < 0 ? null : { left: c.cx - Math.sqrt(val), right: c.cx + Math.sqrt(val) };
  }

  let svg = '';

  if (doorway.side === 'top') {
    const sx = ox + doorway.position * T;
    const sy = oy;
    const lA = arcY(sx), rA = arcY(sx + T);
    const ly = lA ? lA.top : sy;
    const ry = rA ? rA.top : sy;
    // Flanking walls
    svg += `<line x1="${sx}" y1="${typeof ly === 'number' ? ly.toFixed(1) : ly}" x2="${sx}" y2="${sy - T}" stroke="${wallStroke}" stroke-width="2.2" stroke-linecap="round"/>`;
    svg += `<line x1="${sx + T}" y1="${typeof ry === 'number' ? ry.toFixed(1) : ry}" x2="${sx + T}" y2="${sy - T}" stroke="${wallStroke}" stroke-width="2.2" stroke-linecap="round"/>`;
    // Steps
    const shift = stepH;
    svg += `<line x1="${sx + (T - firstStepLen) / 2}" y1="${sy - shift}" x2="${sx + (T + firstStepLen) / 2}" y2="${sy - shift}" stroke="${stroke}" stroke-width="2"/>`;
    for (let i = 1; i <= numSteps; i++) {
      const len = Math.max(minStepLen, firstStepLen - i * (firstStepLen / numSteps));
      const stepY = sy - (i + 1) * stepH;
      svg += `<line x1="${sx + (T - len) / 2}" y1="${stepY}" x2="${sx + (T + len) / 2}" y2="${stepY}" stroke="${stroke}" stroke-width="2"/>`;
    }
  }

  if (doorway.side === 'bottom') {
    const sx = ox + doorway.position * T;
    const sy = oy + height * T;
    const lA = arcY(sx), rA = arcY(sx + T);
    const ly = lA ? lA.bottom : sy;
    const ry = rA ? rA.bottom : sy;
    svg += `<line x1="${sx}" y1="${typeof ly === 'number' ? ly.toFixed(1) : ly}" x2="${sx}" y2="${sy + T}" stroke="${wallStroke}" stroke-width="2.2" stroke-linecap="round"/>`;
    svg += `<line x1="${sx + T}" y1="${typeof ry === 'number' ? ry.toFixed(1) : ry}" x2="${sx + T}" y2="${sy + T}" stroke="${wallStroke}" stroke-width="2.2" stroke-linecap="round"/>`;
    const shift = stepH;
    svg += `<line x1="${sx + (T - firstStepLen) / 2}" y1="${sy + shift}" x2="${sx + (T + firstStepLen) / 2}" y2="${sy + shift}" stroke="${stroke}" stroke-width="2"/>`;
    for (let i = 1; i <= numSteps; i++) {
      const len = Math.max(minStepLen, firstStepLen - i * (firstStepLen / numSteps));
      const stepY = sy + (i + 1) * stepH;
      svg += `<line x1="${sx + (T - len) / 2}" y1="${stepY}" x2="${sx + (T + len) / 2}" y2="${stepY}" stroke="${stroke}" stroke-width="2"/>`;
    }
  }

  if (doorway.side === 'left') {
    const sx = ox;
    const sy = oy + doorway.position * T;
    const tA = arcX(sy), bA = arcX(sy + T);
    const tx = tA ? tA.left : sx;
    const bx = bA ? bA.left : sx;
    svg += `<line x1="${typeof tx === 'number' ? tx.toFixed(1) : tx}" y1="${sy}" x2="${sx - T}" y2="${sy}" stroke="${wallStroke}" stroke-width="2.2" stroke-linecap="round"/>`;
    svg += `<line x1="${typeof bx === 'number' ? bx.toFixed(1) : bx}" y1="${sy + T}" x2="${sx - T}" y2="${sy + T}" stroke="${wallStroke}" stroke-width="2.2" stroke-linecap="round"/>`;
    const shift = stepH;
    svg += `<line x1="${sx - shift}" y1="${sy + (T - firstStepLen) / 2}" x2="${sx - shift}" y2="${sy + (T + firstStepLen) / 2}" stroke="${stroke}" stroke-width="2"/>`;
    for (let i = 1; i <= numSteps; i++) {
      const len = Math.max(minStepLen, firstStepLen - i * (firstStepLen / numSteps));
      const stepX = sx - (i + 1) * stepH;
      svg += `<line x1="${stepX}" y1="${sy + (T - len) / 2}" x2="${stepX}" y2="${sy + (T + len) / 2}" stroke="${stroke}" stroke-width="2"/>`;
    }
  }

  if (doorway.side === 'right') {
    const sx = ox + width * T;
    const sy = oy + doorway.position * T;
    const tA = arcX(sy), bA = arcX(sy + T);
    const tx = tA ? tA.right : sx;
    const bx = bA ? bA.right : sx;
    svg += `<line x1="${typeof tx === 'number' ? tx.toFixed(1) : tx}" y1="${sy}" x2="${sx + T}" y2="${sy}" stroke="${wallStroke}" stroke-width="2.2" stroke-linecap="round"/>`;
    svg += `<line x1="${typeof bx === 'number' ? bx.toFixed(1) : bx}" y1="${sy + T}" x2="${sx + T}" y2="${sy + T}" stroke="${wallStroke}" stroke-width="2.2" stroke-linecap="round"/>`;
    const shift = stepH;
    svg += `<line x1="${sx + shift}" y1="${sy + (T - firstStepLen) / 2}" x2="${sx + shift}" y2="${sy + (T + firstStepLen) / 2}" stroke="${stroke}" stroke-width="2"/>`;
    for (let i = 1; i <= numSteps; i++) {
      const len = Math.max(minStepLen, firstStepLen - i * (firstStepLen / numSteps));
      const stepX = sx + (i + 1) * stepH;
      svg += `<line x1="${stepX}" y1="${sy + (T - len) / 2}" x2="${stepX}" y2="${sy + (T + len) / 2}" stroke="${stroke}" stroke-width="2"/>`;
    }
  }

  return svg;
}

function buildMergedWallPath(room, doorway) {
  const T = props.tileSize;
  const side = doorway.side;

  const adjacentRoom = findAdjacentRoom(room, doorway);
  if (!adjacentRoom) return '';

  const r1ox = room.x * T;
  const r1oy = room.y * T;
  const r2ox = adjacentRoom.x * T;
  const r2oy = adjacentRoom.y * T;

  let d = '';

  if (side === 'right' || side === 'left') {
    const wallX = side === 'right' ? r1ox + room.width * T : r1ox;
    const overlapTop = Math.max(r1oy, r2oy);
    const overlapBottom = Math.min(r1oy + room.height * T, r2oy + adjacentRoom.height * T);

    if (overlapTop > Math.min(r1oy, r2oy)) {
      d += `M ${wallX} ${Math.min(r1oy, r2oy)} L ${wallX} ${overlapTop} `;
    }
    if (overlapBottom < Math.max(r1oy + room.height * T, r2oy + adjacentRoom.height * T)) {
      d += `M ${wallX} ${overlapBottom} L ${wallX} ${Math.max(r1oy + room.height * T, r2oy + adjacentRoom.height * T)} `;
    }
  } else if (side === 'top' || side === 'bottom') {
    const wallY = side === 'bottom' ? r1oy + room.height * T : r1oy;
    const overlapLeft = Math.max(r1ox, r2ox);
    const overlapRight = Math.min(r1ox + room.width * T, r2ox + adjacentRoom.width * T);

    if (overlapLeft > Math.min(r1ox, r2ox)) {
      d += `M ${Math.min(r1ox, r2ox)} ${wallY} L ${overlapLeft} ${wallY} `;
    }
    if (overlapRight < Math.max(r1ox + room.width * T, r2ox + adjacentRoom.width * T)) {
      d += `M ${overlapRight} ${wallY} L ${Math.max(r1ox + room.width * T, r2ox + adjacentRoom.width * T)} ${wallY} `;
    }
  }

  return d;
}

function findAdjacentRoom(room, doorway) {
  const side = doorway.side;
  const position = doorway.position;
  let adjX = room.x;
  let adjY = room.y;

  if (side === 'top') { adjY = room.y - 1; adjX = room.x + position; }
  else if (side === 'bottom') { adjY = room.y + room.height; adjX = room.x + position; }
  else if (side === 'left') { adjX = room.x - 1; adjY = room.y + position; }
  else if (side === 'right') { adjX = room.x + room.width; adjY = room.y + position; }

  const allRooms = getAllFlatRooms();

  return allRooms.find(r => {
    if (side === 'top' || side === 'bottom') {
      return r.y === adjY && r.x <= adjX && adjX < r.x + r.width;
    } else {
      return r.x === adjX && r.y <= adjY && adjY < r.y + r.height;
    }
  });
}

function roomOutlinePaths() {
  return {};
}

// Check if a circular room is safe to render — all doorways must fall within circle radius
function isCircleSafe(room) {
  const T = props.tileSize;
  const { cx, cy, r } = getCircleParams(room);
  const ox = room.x * T, oy = room.y * T;
  const w = room.width * T, h = room.height * T;
  let doorways = (room.doorways || []).filter(dw => dw.type !== 'merged');
  const eg = entranceGap.value;
  if (eg && eg.roomId === room.id) {
    doorways = [...doorways, { side: eg.side, position: eg.position, type: 'entrance' }];
  }

  for (const dw of doorways) {
    const p = dw.position;
    if (dw.side === 'top' || dw.side === 'bottom') {
      const x1 = ox + p * T, x2 = ox + (p + 1) * T;
      if (r * r - (x1 - cx) * (x1 - cx) < 0) return false;
      if (r * r - (x2 - cx) * (x2 - cx) < 0) return false;
    } else {
      const y1 = oy + p * T, y2 = oy + (p + 1) * T;
      if (r * r - (y1 - cy) * (y1 - cy) < 0) return false;
      if (r * r - (y2 - cy) * (y2 - cy) < 0) return false;
    }
  }
  return true;
}

// Check if a room is a boss room
function isBossRoom(roomId) {
  const room = props.rooms.find(r => r.id === roomId);
  return room && room.roomType === 'boss';
}

// Position the boss star at the far end of the room's longest axis, away from doorways
function bossStarPos(roomId) {
  const room = props.rooms.find(r => r.id === roomId);
  if (!room) return { x: 0, y: 0 };

  const T = props.tileSize;
  let ox, oy, w, h;

  if (room.type === 'merged') {
    ox = Math.min(...room.sections.map(s => s.x)) * T;
    oy = Math.min(...room.sections.map(s => s.y)) * T;
    w = (Math.max(...room.sections.map(s => s.x + s.width)) * T) - ox;
    h = (Math.max(...room.sections.map(s => s.y + s.height)) * T) - oy;
  } else {
    ox = room.x * T;
    oy = room.y * T;
    w = room.width * T;
    h = room.height * T;
  }

  const cx = ox + w / 2;
  const cy = oy + h / 2;
  const margin = T * 0.7;

  // Count doorways on each side to find the "far" end
  const doorways = room.type === 'merged'
    ? room.sections.flatMap(s => s.doorways || [])
    : (room.doorways || []);

  const doorCount = { top: 0, bottom: 0, left: 0, right: 0 };
  doorways.forEach(d => { if (doorCount[d.side] !== undefined) doorCount[d.side]++; });

  if (w >= h) {
    // Wide room — place star at left or right end, whichever has fewer doors
    const x = doorCount.right <= doorCount.left ? ox + w - margin : ox + margin;
    return { x, y: cy };
  } else {
    // Tall room — place star at top or bottom end, whichever has fewer doors
    const y = doorCount.bottom <= doorCount.top ? oy + h - margin : oy + margin;
    return { x: cx, y };
  }
}

// Build a 5-pointed star SVG path centered at (cx, cy)
function buildStarPath(cx, cy, outerR, innerR) {
  const pts = [];
  for (let i = 0; i < 5; i++) {
    const outerAngle = (i * 72 - 90) * Math.PI / 180;
    const innerAngle = ((i * 72 + 36) - 90) * Math.PI / 180;
    pts.push(`${cx + outerR * Math.cos(outerAngle)},${cy + outerR * Math.sin(outerAngle)}`);
    pts.push(`${cx + innerR * Math.cos(innerAngle)},${cy + innerR * Math.sin(innerAngle)}`);
  }
  return `M ${pts.join(' L ')} Z`;
}

function handleRoomClick(pos) {
  clickedRoomId.value = pos.roomId;
  emit('roomClicked', { roomId: pos.roomId, x: pos.x, y: pos.y });
}

function handleMapClick() {
  emit('mapClicked');
}
</script>

<style scoped>
.dungeon-map {
  margin: auto;
  display: flex;
}

.responsive-svg {
  max-width: 100%;
  height: auto;
}

.room-number text {
  transition: font-size 0.15s;
}
</style>