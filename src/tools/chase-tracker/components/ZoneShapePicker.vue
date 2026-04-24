<template>
  <div class="shape-picker">
    <button
      v-for="shape in shapes"
      :key="shape.key"
      type="button"
      :class="['shape-btn', { 'shape-btn--active': modelValue === shape.key }]"
      :title="shape.label"
      @click="$emit('update:modelValue', shape.key)"
    >
      <svg :width="shape.w" :height="shape.h" viewBox="0 0 60 60" aria-hidden="true">
        <rect
          :x="shape.x"
          :y="shape.y"
          :width="shape.rw"
          :height="shape.rh"
          rx="3"
          class="shape-rect"
        />
      </svg>
      <span class="shape-label">{{ shape.label }}</span>
    </button>
  </div>
</template>

<script>
// Each shape has a representative SVG rect sized to fit a 60×60 viewBox so
// relative footprints read at a glance.
export default {
  name: 'ZoneShapePicker',
  props: {
    modelValue: { type: String, default: 'small' },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      // Widths/heights are pixel sizes for the preview SVG; bumped
      // ~1.35× from the original 42/56/30/48 scale so the shape glyphs
      // read at a glance. The viewBox stays 60×60 — only the rendered
      // dimensions change.
      shapes: [
        { key: 'small', label: 'Small', w: 56, h: 56, x: 18, y: 18, rw: 24, rh: 24 },
        { key: 'wide',  label: 'Wide',  w: 76, h: 40, x: 6,  y: 18, rw: 48, rh: 24 },
        { key: 'tall',  label: 'Tall',  w: 40, h: 76, x: 18, y: 6,  rw: 24, rh: 48 },
        { key: 'large', label: 'Large', w: 64, h: 64, x: 6,  y: 6,  rw: 48, rh: 48 },
      ],
    };
  },
};
</script>

<style scoped>
.shape-picker {
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.shape-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding: 0.6rem 0.8rem 0.5rem;
  background: var(--parchment-base);
  border: 1.5px solid var(--parchment-edge);
  cursor: pointer;
  color: var(--ink-primary);
  border-radius: 2px;
  min-width: 6rem;
}

.shape-btn:hover {
  background: var(--parchment-shadow);
}

.shape-btn--active {
  box-shadow: 0 0 0 2px var(--accent-gold);
  border-color: var(--accent-gold-dark);
}

.shape-rect {
  fill: var(--parchment-warm);
  stroke: var(--parchment-edge);
  stroke-width: 2;
}

.shape-btn--active .shape-rect {
  fill: #f0dda8;
  stroke: var(--accent-gold-dark);
}

.shape-label {
  font-family: var(--font-display);
  font-size: 0.95rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

.shape-btn--active .shape-label {
  color: var(--ink-primary);
}
</style>
