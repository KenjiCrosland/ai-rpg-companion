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
          <path :d="buildMergedRoomPerimeterPath(room)" fill="none" stroke="rgba(55, 55, 55, 0.8)" stroke-width="2.2"
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
          <!-- Circular room -->
          <template v-if="room.shape === 'circular'">
            <path :d="buildCircularRoomPath(room)" fill="none" stroke="rgba(55, 55, 55, 0.8)" stroke-width="2.2"
              stroke-linecap="round" filter="url(#pencil-stroke)" />
          </template>
          <!-- Domed room — rect with one curved wall -->
          <template v-else-if="room.shape === 'domed'">
            <path :d="buildDomedRoomPath(room)" fill="none" stroke="rgba(55, 55, 55, 0.8)" stroke-width="2.2"
              stroke-linecap="round" filter="url(#pencil-stroke)" />
          </template>
          <!-- Capsule room — curved narrow ends, straight long sides -->
          <template v-else-if="room.shape === 'capsule'">
            <path :d="buildCapsuleRoomPath(room)" fill="none" stroke="rgba(55, 55, 55, 0.8)" stroke-width="2.2"
              stroke-linecap="round" filter="url(#pencil-stroke)" />
          </template>
          <!-- Standard rectangular room -->
          <template v-else>
            <path :d="buildRoomOutlinePath(room)" fill="none" stroke="rgba(55, 55, 55, 0.8)" stroke-width="2.2"
              stroke-linecap="round" filter="url(#pencil-stroke)" />
          </template>
          <!-- Doorways (all shapes) -->
          <template v-for="(dw, di) in (room.doorways || [])" :key="'dw-' + room.id + '-' + di">
            <g v-if="dw.type !== 'merged'" v-html="buildDoorwaySvg(room, dw)" filter="url(#pencil-stroke)"></g>
          </template>
          <!-- Merged wall extensions (rectangular rooms only) -->
          <template v-for="(dw, di) in (room.doorways || [])" :key="'mw-' + room.id + '-' + di">
            <path v-if="dw.type === 'merged' && !room.shape" :d="buildMergedWallPath(room, dw)" fill="none"
              stroke="rgba(55, 55, 55, 0.8)" stroke-width="2.2" stroke-linecap="round" filter="url(#pencil-stroke)" />
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
  const { x, y, width, height, doorways } = room;
  const T = props.tileSize;
  const ox = x * T;
  const oy = y * T;

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
  const r = Math.min(w, h) / 2 - 2;
  return { cx: ox + w / 2, cy: oy + h / 2, r };
}

// Build a true circular room path with gaps at exact doorway intersection points
function buildCircularRoomPath(room) {
  const T = props.tileSize;
  const { cx, cy, r } = getCircleParams(room);
  const doorways = (room.doorways || []).filter(dw => dw.type !== 'merged');

  if (doorways.length === 0) {
    return `M ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy}`;
  }

  // Compute exact gap endpoints as angles on the circle
  const ox = room.x * T, oy = room.y * T;
  const w = room.width * T, h = room.height * T;
  const gapAngles = []; // [{a1, a2, side, pts}] — angular range to skip + connector endpoints

  doorways.forEach(dw => {
    const p = dw.position;
    if (dw.side === 'top' || dw.side === 'bottom') {
      const x1 = ox + p * T, x2 = ox + (p + 1) * T;
      const v1 = r * r - (x1 - cx) * (x1 - cx);
      const v2 = r * r - (x2 - cx) * (x2 - cx);
      if (v1 < 0 || v2 < 0) return;
      const iy1 = dw.side === 'top' ? cy - Math.sqrt(v1) : cy + Math.sqrt(v1);
      const iy2 = dw.side === 'top' ? cy - Math.sqrt(v2) : cy + Math.sqrt(v2);
      const a1 = Math.atan2(iy1 - cy, x1 - cx);
      const a2 = Math.atan2(iy2 - cy, x2 - cx);
      const edgeY = dw.side === 'top' ? oy : oy + h;
      gapAngles.push({
        a1: Math.min(a1, a2), a2: Math.max(a1, a2), side: dw.side,
        p1: { x: x1, cy: iy1, ey: edgeY }, p2: { x: x2, cy: iy2, ey: edgeY }
      });
    } else {
      const y1 = oy + p * T, y2 = oy + (p + 1) * T;
      const v1 = r * r - (y1 - cy) * (y1 - cy);
      const v2 = r * r - (y2 - cy) * (y2 - cy);
      if (v1 < 0 || v2 < 0) return;
      const ix1 = dw.side === 'left' ? cx - Math.sqrt(v1) : cx + Math.sqrt(v1);
      const ix2 = dw.side === 'left' ? cx - Math.sqrt(v2) : cx + Math.sqrt(v2);
      const a1 = Math.atan2(y1 - cy, ix1 - cx);
      const a2 = Math.atan2(y2 - cy, ix2 - cx);
      const edgeX = dw.side === 'left' ? ox : ox + w;
      gapAngles.push({
        a1: Math.min(a1, a2), a2: Math.max(a1, a2), side: dw.side,
        p1: { y: y1, cx: ix1, ex: edgeX }, p2: { y: y2, cx: ix2, ex: edgeX }
      });
    }
  });

  // Sort gaps by start angle
  gapAngles.sort((a, b) => a.a1 - b.a1);

  if (gapAngles.length === 0) {
    return `M ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy}`;
  }

  // Draw arcs between gaps, with connector lines at gap edges
  let d = '';
  for (let i = 0; i < gapAngles.length; i++) {
    const gap = gapAngles[i];
    const gapEnd = gap.a2;
    const nextGap = gapAngles[(i + 1) % gapAngles.length];
    const nextGapStart = nextGap.a1;

    const startX = cx + r * Math.cos(gapEnd);
    const startY = cy + r * Math.sin(gapEnd);
    const endX = cx + r * Math.cos(nextGapStart);
    const endY = cy + r * Math.sin(nextGapStart);

    let sweep = nextGapStart - gapEnd;
    if (sweep < 0) sweep += 2 * Math.PI;
    const largeArc = sweep > Math.PI ? 1 : 0;

    // Connector line from arc endpoint INTO the gap (toward bounding box edge)
    if (gap.side === 'top' || gap.side === 'bottom') {
      d += `M ${gap.p2.x} ${gap.p2.ey} L ${gap.p2.x} ${gap.p2.cy} `;
    } else {
      d += `M ${gap.p2.ex} ${gap.p2.y} L ${gap.p2.cx} ${gap.p2.y} `;
    }

    // The arc
    d += `M ${startX.toFixed(1)} ${startY.toFixed(1)} A ${r} ${r} 0 ${largeArc} 1 ${endX.toFixed(1)} ${endY.toFixed(1)} `;

    // Connector line from arc endpoint INTO the next gap
    if (nextGap.side === 'top' || nextGap.side === 'bottom') {
      d += `M ${nextGap.p1.x} ${nextGap.p1.cy} L ${nextGap.p1.x} ${nextGap.p1.ey} `;
    } else {
      d += `M ${nextGap.p1.cx} ${nextGap.p1.y} L ${nextGap.p1.ex} ${nextGap.p1.y} `;
    }
  }

  return d;
}

// Build a domed room path — rect with one curved wall, doorway gaps on straight sides
function buildDomedRoomPath(room) {
  const { x, y, width, height, doorways } = room;
  const T = props.tileSize;
  const ox = x * T;
  const oy = y * T;
  const w = width * T;
  const h = height * T;
  const curvedSide = room.domedSide || 'top';
  const arcDepth = Math.min(w, h) * 0.3;

  const nonMergedDoors = (doorways || []).filter(dw => dw.type !== 'merged');

  // Helper: build a straight side with doorway gaps
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
      // Draw the curved wall
      if (side === 'top') d += `M ${ox + w} ${oy} Q ${ox + w / 2} ${oy - arcDepth} ${ox} ${oy} `;
      else if (side === 'bottom') d += `M ${ox} ${oy + h} Q ${ox + w / 2} ${oy + h + arcDepth} ${ox + w} ${oy + h} `;
      else if (side === 'left') d += `M ${ox} ${oy + h} Q ${ox - arcDepth} ${oy + h / 2} ${ox} ${oy} `;
      else if (side === 'right') d += `M ${ox + w} ${oy} Q ${ox + w + arcDepth} ${oy + h / 2} ${ox + w} ${oy + h} `;
    } else {
      d += straightSide(side);
    }
  });

  return d;
}

// Build a capsule room path — straight long sides, curved narrow ends, doorway gaps on straight sides
function buildCapsuleRoomPath(room) {
  const { x, y, width, height, doorways } = room;
  const T = props.tileSize;
  const ox = x * T;
  const oy = y * T;
  const w = width * T;
  const h = height * T;
  const arcDepth = Math.min(w, h) * 0.3;
  const nonMergedDoors = (doorways || []).filter(dw => dw.type !== 'merged');

  // Helper: build a straight side with doorway gaps
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
    // Wider than tall — curve left and right, straight top and bottom
    d += straightSide('top');
    d += `M ${ox + w} ${oy} Q ${ox + w + arcDepth} ${oy + h / 2} ${ox + w} ${oy + h} `;
    d += straightSide('bottom');
    d += `M ${ox} ${oy + h} Q ${ox - arcDepth} ${oy + h / 2} ${ox} ${oy} `;
  } else {
    // Taller than wide — curve top and bottom, straight left and right
    d += `M ${ox} ${oy} Q ${ox + w / 2} ${oy - arcDepth} ${ox + w} ${oy} `;
    d += straightSide('right');
    d += `M ${ox + w} ${oy + h} Q ${ox + w / 2} ${oy + h + arcDepth} ${ox} ${oy + h} `;
    d += straightSide('left');
  }

  return d;
}

// Build a single perimeter path for a merged room by tracing outer tile edges
function buildMergedRoomPerimeterPath(room) {
  const T = props.tileSize;
  const tiles = new Set();

  // Collect all tiles from all sections
  room.sections.forEach(section => {
    for (let i = 0; i < section.width; i++) {
      for (let j = 0; j < section.height; j++) {
        tiles.add(`${section.x + i},${section.y + j}`);
      }
    }
  });

  // Collect non-merged doorway edges to skip
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

  // Collect horizontal perimeter edges keyed by y (tile coords)
  const hEdges = {};
  // Collect vertical perimeter edges keyed by x (tile coords)
  const vEdges = {};

  tiles.forEach(key => {
    const [tx, ty] = key.split(',').map(Number);

    // Top edge — no neighbor above
    if (!tiles.has(`${tx},${ty - 1}`) && !doorwayEdges.has(`h,${ty},${tx}`)) {
      if (!hEdges[ty]) hEdges[ty] = [];
      hEdges[ty].push(tx);
    }
    // Bottom edge — no neighbor below
    if (!tiles.has(`${tx},${ty + 1}`) && !doorwayEdges.has(`h,${ty + 1},${tx}`)) {
      const by = ty + 1;
      if (!hEdges[by]) hEdges[by] = [];
      hEdges[by].push(tx);
    }
    // Left edge — no neighbor to the left
    if (!tiles.has(`${tx - 1},${ty}`) && !doorwayEdges.has(`v,${tx},${ty}`)) {
      if (!vEdges[tx]) vEdges[tx] = [];
      vEdges[tx].push(ty);
    }
    // Right edge — no neighbor to the right
    if (!tiles.has(`${tx + 1},${ty}`) && !doorwayEdges.has(`v,${tx + 1},${ty}`)) {
      const rx = tx + 1;
      if (!vEdges[rx]) vEdges[rx] = [];
      vEdges[rx].push(ty);
    }
  });

  let d = '';

  // Merge adjacent horizontal edges at each y into longer lines
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

  // Merge adjacent vertical edges at each x into longer lines
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

  // Door dimensions — rect spans full tile width, sits between straight walls
  const doorDepth = Math.max(T / 3, 3);          // thickness of the door rectangle
  const totalExt = T;                              // total extension from room wall
  const wallLen = (totalExt - doorDepth) / 2;      // wall length on each side of door
  const stroke = 'rgba(55,55,55,0.8)';
  const wallSw = '2.2';   // match room walls
  const doorSw = '1.5';   // thin stroke for door rectangle

  let svg = '';

  if (doorway.side === 'top') {
    const sx = ox + doorway.position * T;
    const sy = oy;
    svg += `<line x1="${sx}" y1="${sy}" x2="${sx}" y2="${sy - wallLen}" stroke="${stroke}" stroke-width="${wallSw}" stroke-linecap="round"/>`;
    svg += `<line x1="${sx + T}" y1="${sy}" x2="${sx + T}" y2="${sy - wallLen}" stroke="${stroke}" stroke-width="${wallSw}" stroke-linecap="round"/>`;
    svg += `<rect x="${sx}" y="${sy - wallLen - doorDepth}" width="${T}" height="${doorDepth}" fill="#fff" stroke="${stroke}" stroke-width="${doorSw}"/>`;
    if (isLocked) {
      svg += `<line x1="${sx + 2}" y1="${sy - wallLen - doorDepth + 1}" x2="${sx + T - 2}" y2="${sy - wallLen - 1}" stroke="${stroke}" stroke-width="1.2"/>`;
      svg += `<line x1="${sx + 2}" y1="${sy - wallLen - 1}" x2="${sx + T - 2}" y2="${sy - wallLen - doorDepth + 1}" stroke="${stroke}" stroke-width="1.2"/>`;
    }
  }

  if (doorway.side === 'bottom') {
    const sx = ox + doorway.position * T;
    const sy = oy + height * T;
    svg += `<line x1="${sx}" y1="${sy}" x2="${sx}" y2="${sy + wallLen}" stroke="${stroke}" stroke-width="${wallSw}" stroke-linecap="round"/>`;
    svg += `<line x1="${sx + T}" y1="${sy}" x2="${sx + T}" y2="${sy + wallLen}" stroke="${stroke}" stroke-width="${wallSw}" stroke-linecap="round"/>`;
    svg += `<rect x="${sx}" y="${sy + wallLen}" width="${T}" height="${doorDepth}" fill="#fff" stroke="${stroke}" stroke-width="${doorSw}"/>`;
    if (isLocked) {
      svg += `<line x1="${sx + 2}" y1="${sy + wallLen + 1}" x2="${sx + T - 2}" y2="${sy + wallLen + doorDepth - 1}" stroke="${stroke}" stroke-width="1.2"/>`;
      svg += `<line x1="${sx + 2}" y1="${sy + wallLen + doorDepth - 1}" x2="${sx + T - 2}" y2="${sy + wallLen + 1}" stroke="${stroke}" stroke-width="1.2"/>`;
    }
  }

  if (doorway.side === 'left') {
    const sx = ox;
    const sy = oy + doorway.position * T;
    svg += `<line x1="${sx}" y1="${sy}" x2="${sx - wallLen}" y2="${sy}" stroke="${stroke}" stroke-width="${wallSw}" stroke-linecap="round"/>`;
    svg += `<line x1="${sx}" y1="${sy + T}" x2="${sx - wallLen}" y2="${sy + T}" stroke="${stroke}" stroke-width="${wallSw}" stroke-linecap="round"/>`;
    svg += `<rect x="${sx - wallLen - doorDepth}" y="${sy}" width="${doorDepth}" height="${T}" fill="#fff" stroke="${stroke}" stroke-width="${doorSw}"/>`;
    if (isLocked) {
      svg += `<line x1="${sx - wallLen - doorDepth + 1}" y1="${sy + 2}" x2="${sx - wallLen - 1}" y2="${sy + T - 2}" stroke="${stroke}" stroke-width="1.2"/>`;
      svg += `<line x1="${sx - wallLen - doorDepth + 1}" y1="${sy + T - 2}" x2="${sx - wallLen - 1}" y2="${sy + 2}" stroke="${stroke}" stroke-width="1.2"/>`;
    }
  }

  if (doorway.side === 'right') {
    const sx = ox + width * T;
    const sy = oy + doorway.position * T;
    svg += `<line x1="${sx}" y1="${sy}" x2="${sx + wallLen}" y2="${sy}" stroke="${stroke}" stroke-width="${wallSw}" stroke-linecap="round"/>`;
    svg += `<line x1="${sx}" y1="${sy + T}" x2="${sx + wallLen}" y2="${sy + T}" stroke="${stroke}" stroke-width="${wallSw}" stroke-linecap="round"/>`;
    svg += `<rect x="${sx + wallLen}" y="${sy}" width="${doorDepth}" height="${T}" fill="#fff" stroke="${stroke}" stroke-width="${doorSw}"/>`;
    if (isLocked) {
      svg += `<line x1="${sx + wallLen + 1}" y1="${sy + 2}" x2="${sx + wallLen + doorDepth - 1}" y2="${sy + T - 2}" stroke="${stroke}" stroke-width="1.2"/>`;
      svg += `<line x1="${sx + wallLen + 1}" y1="${sy + T - 2}" x2="${sx + wallLen + doorDepth - 1}" y2="${sy + 2}" stroke="${stroke}" stroke-width="1.2"/>`;
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
  const stroke = 'rgba(55,55,55,0.8)';
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
  const stroke = 'rgba(55,55,55,0.8)';
  let svg = '';

  if (doorway.side === 'top') {
    const cx = ox + doorway.position * T;
    svg += `<line x1="${cx}" y1="${oy}" x2="${cx}" y2="${oy - T}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
    svg += `<line x1="${cx + T}" y1="${oy}" x2="${cx + T}" y2="${oy - T}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
  }

  if (doorway.side === 'bottom') {
    const cx = ox + doorway.position * T;
    const sy = oy + height * T;
    svg += `<line x1="${cx}" y1="${sy}" x2="${cx}" y2="${sy + T}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
    svg += `<line x1="${cx + T}" y1="${sy}" x2="${cx + T}" y2="${sy + T}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
  }

  if (doorway.side === 'left') {
    const cy = oy + doorway.position * T;
    svg += `<line x1="${ox}" y1="${cy}" x2="${ox - T}" y2="${cy}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
    svg += `<line x1="${ox}" y1="${cy + T}" x2="${ox - T}" y2="${cy + T}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
  }

  if (doorway.side === 'right') {
    const sx = ox + width * T;
    const cy = oy + doorway.position * T;
    svg += `<line x1="${sx}" y1="${cy}" x2="${sx + T}" y2="${cy}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
    svg += `<line x1="${sx}" y1="${cy + T}" x2="${sx + T}" y2="${cy + T}" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round"/>`;
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
  let svg = '';

  if (doorway.side === 'top') {
    const sx = ox + doorway.position * T;
    const sy = oy;
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

// Unused but kept for API compat — rooms don't need individual outline props
function roomOutlinePaths() {
  return {};
}

// Event handlers
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