<template>
  <div class="chase-map-wrap">
    <ConnectModeBanner
      :source-name="connectingFromZoneName"
      @cancel="$emit('cancel-connect')"
    />

    <div class="edge-expand">
      <div class="edge-row">
        <GridEdgeButton direction="top" @click="$emit('expand-grid', 'top')" />
      </div>

      <div
        ref="grid"
        class="chase-map"
        :class="{ 'chase-map--empty': !zones.length }"
        :style="gridStyle"
      >
        <div v-if="!zones.length" class="chase-map-empty-hint">
          <p>
            The map is empty. Click the
            <span class="chase-map-empty-plus" aria-hidden="true">+</span>
            buttons at the edges of the grid to expand it, or open the
            <strong>Zone Library</strong> to add your first zone.
          </p>
        </div>

        <svg
          class="connection-layer"
          :viewBox="`0 0 ${svgSize.w} ${svgSize.h}`"
          :width="svgSize.w"
          :height="svgSize.h"
        >
          <g v-for="(seg, i) in connectionLines" :key="i">
            <line
              :x1="seg.x1"
              :y1="seg.y1"
              :x2="seg.x2"
              :y2="seg.y2"
              class="connection-line"
            />
            <polygon :points="seg.arrowA" class="connection-arrow" />
            <polygon :points="seg.arrowB" class="connection-arrow" />
          </g>
        </svg>

        <Zone
          v-for="zone in zones"
          :key="zone.id"
          :zone="zone"
          :tokens="tokensByZone[zone.id] || []"
          :selected-token-id="selectedTokenId"
          :valid-destination="adjacentZoneIds.has(zone.id)"
          :dimmed="selectedTokenId && !adjacentZoneIds.has(zone.id)"
          :dragged-token-id="draggedTokenId"
          :valid-drop-zone-ids="validDropZoneIds"
          :connect-source="connectingFromZoneId === zone.id"
          :connect-target="Boolean(connectingFromZoneId) && connectingFromZoneId !== zone.id"
          @zone-clicked="(id) => $emit('zone-clicked', id)"
          @select-token="(id) => $emit('select-token', id)"
          @rename-token="(id, label) => $emit('rename-token', id, label)"
          @remove-token="(id) => $emit('remove-token', id)"
          @update-zone="(id, fields) => $emit('update-zone', id, fields)"
          @delete-zone="(id) => $emit('delete-zone', id)"
          @start-connect="(id) => $emit('start-connect', id)"
          @open-conditions="(id) => $emit('open-conditions', id)"
          @add-token="(id) => $emit('add-token', id)"
          @drag-start="(id) => $emit('drag-start', id)"
          @drag-end="(id) => $emit('drag-end', id)"
          @drop-token="(id, zoneId) => $emit('drop-token', id, zoneId)"
        />
      </div>

      <div class="edge-row">
        <GridEdgeButton direction="bottom" @click="$emit('expand-grid', 'bottom')" />
      </div>
    </div>
  </div>
</template>

<script>
import Zone from './Zone.vue';
import ConnectModeBanner from './ConnectModeBanner.vue';
import GridEdgeButton from './GridEdgeButton.vue';
import { useIsMobile } from '../composables/useBreakpoint.js';

// Clip a line from the center of `rect` toward (tx, ty) so it lands on the
// rectangle's perimeter instead of passing through the card body.
function rectEdgeTowards(rect, tx, ty, inset = 12) {
  const dx = tx - rect.cx;
  const dy = ty - rect.cy;
  if (dx === 0 && dy === 0) return { x: rect.cx, y: rect.cy };
  const hw = Math.max(rect.width / 2 - inset, 0);
  const hh = Math.max(rect.height / 2 - inset, 0);
  const sx = dx === 0 ? Infinity : hw / Math.abs(dx);
  const sy = dy === 0 ? Infinity : hh / Math.abs(dy);
  const s = Math.min(sx, sy);
  return { x: rect.cx + dx * s, y: rect.cy + dy * s };
}

// Arrow polygon: tip at (tx, ty) pointing in unit direction (dx, dy).
// Length + half-width are in pixels.
function arrowPolygon(tx, ty, dx, dy, length = 10, halfWidth = 5) {
  const baseX = tx - dx * length;
  const baseY = ty - dy * length;
  const perpX = -dy;
  const perpY = dx;
  const c1x = baseX + perpX * halfWidth;
  const c1y = baseY + perpY * halfWidth;
  const c2x = baseX - perpX * halfWidth;
  const c2y = baseY - perpY * halfWidth;
  return `${tx},${ty} ${c1x},${c1y} ${c2x},${c2y}`;
}

export default {
  name: 'ChaseMap',
  components: { Zone, ConnectModeBanner, GridEdgeButton },
  props: {
    zones: { type: Array, required: true },
    connections: { type: Array, required: true },
    tokensByZone: { type: Object, required: true },
    selectedTokenId: { type: String, default: null },
    adjacentZoneIds: { type: Set, required: true },
    draggedTokenId: { type: String, default: null },
    validDropZoneIds: { type: Set, default: () => new Set() },
    connectingFromZoneId: { type: String, default: null },
    gridCols: { type: Number, required: true },
    gridRows: { type: Number, required: true },
  },
  emits: [
    'zone-clicked',
    'select-token',
    'rename-token',
    'remove-token',
    'update-zone',
    'delete-zone',
    'start-connect',
    'cancel-connect',
    'open-conditions',
    'add-token',
    'drag-start',
    'drag-end',
    'drop-token',
    'expand-grid',
  ],
  setup() {
    const isMobile = useIsMobile();
    return { isMobile };
  },
  data() {
    return {
      connectionLines: [],
      svgSize: { w: 0, h: 0 },
      resizeObserver: null,
    };
  },
  computed: {
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.gridCols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${this.gridRows}, minmax(140px, auto))`,
      };
    },
    connectingFromZoneName() {
      if (!this.connectingFromZoneId) return '';
      const zone = this.zones.find((z) => z.id === this.connectingFromZoneId);
      return zone?.name || '';
    },
  },
  watch: {
    zones: { handler: 'scheduleRecompute', deep: true },
    connections: { handler: 'scheduleRecompute', deep: true },
  },
  mounted() {
    this.$nextTick(() => this.recomputeConnections());
    window.addEventListener('resize', this.scheduleRecompute);
    if (typeof ResizeObserver !== 'undefined' && this.$refs.grid) {
      this.resizeObserver = new ResizeObserver(() => this.scheduleRecompute());
      this.resizeObserver.observe(this.$refs.grid);
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.scheduleRecompute);
    this.resizeObserver?.disconnect();
  },
  methods: {
    scheduleRecompute() {
      this.$nextTick(() => this.recomputeConnections());
    },
    recomputeConnections() {
      const grid = this.$refs.grid;
      if (!grid) return;
      const gridRect = grid.getBoundingClientRect();
      this.svgSize = { w: gridRect.width, h: gridRect.height };

      const rects = {};
      const zoneEls = grid.querySelectorAll('[data-zone-id]');
      zoneEls.forEach((el) => {
        const id = el.getAttribute('data-zone-id');
        const r = el.getBoundingClientRect();
        rects[id] = {
          width: r.width,
          height: r.height,
          cx: r.left - gridRect.left + r.width / 2,
          cy: r.top - gridRect.top + r.height / 2,
        };
      });

      // Line ends a few pixels inside each arrow so the stroke never pokes
      // past the triangle's tapering tip. Mobile uses a smaller arrow
      // proportional to the thinner stroke so direction is legible
      // without dominating the tight cards.
      const ARROW_LENGTH = this.isMobile ? 7 : 10;
      const ARROW_HALF_W = this.isMobile ? 3.5 : 5;
      const LINE_BACKOFF = this.isMobile ? 2 : 4;

      this.connectionLines = this.connections
        .map(([a, b]) => {
          const ra = rects[a];
          const rb = rects[b];
          if (!ra || !rb) return null;
          const tipA = rectEdgeTowards(ra, rb.cx, rb.cy);
          const tipB = rectEdgeTowards(rb, ra.cx, ra.cy);
          const vx = tipB.x - tipA.x;
          const vy = tipB.y - tipA.y;
          const dist = Math.hypot(vx, vy);
          if (dist < 0.001) return null;
          const nx = vx / dist;
          const ny = vy / dist;

          const lineStart = {
            x: tipA.x + nx * (ARROW_LENGTH - LINE_BACKOFF),
            y: tipA.y + ny * (ARROW_LENGTH - LINE_BACKOFF),
          };
          const lineEnd = {
            x: tipB.x - nx * (ARROW_LENGTH - LINE_BACKOFF),
            y: tipB.y - ny * (ARROW_LENGTH - LINE_BACKOFF),
          };

          return {
            x1: lineStart.x,
            y1: lineStart.y,
            x2: lineEnd.x,
            y2: lineEnd.y,
            arrowA: arrowPolygon(tipA.x, tipA.y, -nx, -ny, ARROW_LENGTH, ARROW_HALF_W),
            arrowB: arrowPolygon(tipB.x, tipB.y, nx, ny, ARROW_LENGTH, ARROW_HALF_W),
          };
        })
        .filter(Boolean);
    },
  },
};
</script>

<style scoped>
.chase-map-wrap {
  position: relative;
}

.edge-expand {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  align-items: stretch;
}

.edge-row {
  display: flex;
  justify-content: center;
}

.chase-map {
  position: relative;
  display: grid;
  gap: 3.5rem;
}

.chase-map--empty {
  min-height: 16rem;
}

.chase-map-empty-hint {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1.5rem;
  pointer-events: none;
}

.chase-map-empty-hint p {
  font-family: var(--font-display);
  font-size: 1.1rem;
  line-height: 1.6;
  letter-spacing: 0.02em;
  color: var(--ink-muted);
  max-width: 32rem;
  margin: 0;
  font-weight: 400;
}

.chase-map-empty-hint strong {
  color: var(--ink-secondary);
  font-weight: 600;
}

.chase-map-empty-plus {
  font-family: var(--font-body);
  font-size: 1.2rem;
  color: var(--ink-secondary);
}

.connection-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow: visible;
}

.connection-line {
  stroke: var(--ink-secondary);
  stroke-width: 2.75;
  opacity: 0.72;
  /* butt cap (not round) so the stroke ends flush with the arrow tip —
     a rounded cap extends stroke-width/2 past the endpoint and pokes
     through the triangle. */
  stroke-linecap: butt;
}

.connection-arrow {
  fill: var(--ink-primary);
  opacity: 1;
}

@media (max-width: 640px) {
  .chase-map {
    gap: 1rem;
  }

  /* Thinner stroke at mobile widths, but stay dark and legible —
     earlier we faded these to 0.4 so they read as hints; that left
     them nearly invisible. Ink-primary at full opacity keeps them
     clearly readable, and the 1.6 stroke-width still reads as
     subordinate to the zone cards. */
  .chase-map :deep(.connection-line) {
    stroke: var(--ink-primary);
    stroke-width: 1.6;
    opacity: 0.9;
  }

  .chase-map :deep(.connection-arrow) {
    /* Arrow stays dark and fully opaque so direction reads at a
       glance despite the thinner stroke. */
    opacity: 1;
  }

  .edge-expand {
    gap: 0.4rem;
  }
}
</style>
