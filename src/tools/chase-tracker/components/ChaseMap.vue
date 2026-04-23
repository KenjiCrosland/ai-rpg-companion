<template>
  <div class="chase-map-wrap">
    <ConnectModeBanner
      :source-name="connectingFromZoneName"
      @cancel="$emit('cancel-connect')"
    />

    <div
      ref="grid"
      class="chase-map"
      :style="gridStyle"
    >
      <svg
        class="connection-layer"
        :viewBox="`0 0 ${svgSize.w} ${svgSize.h}`"
        :width="svgSize.w"
        :height="svgSize.h"
      >
        <defs>
          <marker
            id="chase-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" class="connection-arrow" />
          </marker>
        </defs>
        <line
          v-for="(line, i) in connectionLines"
          :key="i"
          :x1="line.x1"
          :y1="line.y1"
          :x2="line.x2"
          :y2="line.y2"
          class="connection-line"
          :marker-start="isMobile ? null : 'url(#chase-arrow)'"
          :marker-end="isMobile ? null : 'url(#chase-arrow)'"
        />
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
        @drag-start="(id) => $emit('drag-start', id)"
        @drag-end="(id) => $emit('drag-end', id)"
        @drop-token="(id, zoneId) => $emit('drop-token', id, zoneId)"
      />
    </div>
  </div>
</template>

<script>
import Zone from './Zone.vue';
import ConnectModeBanner from './ConnectModeBanner.vue';
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

export default {
  name: 'ChaseMap',
  components: { Zone, ConnectModeBanner },
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
    'drag-start',
    'drag-end',
    'drop-token',
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

      this.connectionLines = this.connections
        .map(([a, b]) => {
          const ra = rects[a];
          const rb = rects[b];
          if (!ra || !rb) return null;
          const start = rectEdgeTowards(ra, rb.cx, rb.cy);
          const end = rectEdgeTowards(rb, ra.cx, ra.cy);
          return { x1: start.x, y1: start.y, x2: end.x, y2: end.y };
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

.chase-map {
  position: relative;
  display: grid;
  gap: 3.5rem;
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
  stroke-linecap: round;
}

.connection-arrow {
  fill: var(--ink-primary);
  opacity: 1;
}

@media (max-width: 640px) {
  .chase-map {
    gap: 1rem;
  }

  .chase-map :deep(.connection-line) {
    stroke-width: 1;
    opacity: 0.4;
  }
}
</style>
