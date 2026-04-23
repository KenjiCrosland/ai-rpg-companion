<template>
  <transition name="sheet-slide">
    <div v-if="zone" class="sheet-backdrop" @click.self="$emit('close')">
      <div
        class="sheet"
        role="dialog"
        :aria-label="`Zone: ${zone.name}`"
        @touchstart.passive="onTouchStart"
        @touchmove.passive="onTouchMove"
        @touchend="onTouchEnd"
      >
        <button class="sheet-close" aria-label="Close" @click="$emit('close')">×</button>
        <div class="sheet-handle" aria-hidden="true" />

        <div class="sheet-header">
          <h2 class="display-heading sheet-title">{{ zone.name }}</h2>
          <p v-if="zone.description" class="ink-italic sheet-description">{{ zone.description }}</p>
        </div>

        <OrnamentalDivider glyph="❦" />

        <section class="sheet-section">
          <div class="section-label">Conditions</div>
          <div class="condition-row">
            <div
              v-for="pill in zone.pills"
              :key="pill.id"
              class="sheet-pill-wrap"
            >
              <button
                :class="['sheet-pill', `sheet-pill--${pill.tone}`, { 'sheet-pill--open': openPillId === pill.id }]"
                :aria-expanded="openPillId === pill.id"
                @click="togglePill(pill)"
              >{{ pill.label }}</button>
              <p v-if="openPillId === pill.id && pill.detail" class="sheet-pill-detail">{{ pill.detail }}</p>
            </div>
            <button class="sheet-pill sheet-pill--add" @click="$emit('open-conditions', zone.id)">+ Add</button>
          </div>
        </section>

        <OrnamentalDivider glyph="❦" />

        <section class="sheet-section">
          <div class="section-label">Tokens</div>
          <p v-if="zoneTokens.length === 0" class="empty-note ink-italic">
            No tokens here right now.
          </p>
          <ul v-else class="token-list">
            <li
              v-for="token in zoneTokens"
              :key="token.id"
              class="token-row"
            >
              <span
                class="token-swatch"
                :style="{ backgroundColor: paletteFor(token).fill, borderColor: paletteFor(token).border, color: paletteFor(token).text }"
              >
                <Icon v-if="iconNameFor(token)" :icon="iconNameFor(token)" :width="16" :height="16" />
              </span>
              <span class="token-label">{{ token.label }}</span>
              <div class="token-move-wrap">
                <button
                  :class="['token-move-btn', { 'token-move-btn--open': openMoveTokenId === token.id }]"
                  @click="toggleMove(token.id)"
                  :aria-expanded="openMoveTokenId === token.id"
                >Move ▾</button>
                <ul
                  v-if="openMoveTokenId === token.id"
                  class="move-menu"
                  @click.stop
                >
                  <li v-if="moveTargets.length === 0" class="move-empty ink-italic">
                    No connected zones. Use Connect first.
                  </li>
                  <li
                    v-for="target in moveTargets"
                    :key="target.id"
                  >
                    <button class="move-menu-item" @click="selectMoveTarget(token.id, target.id)">
                      {{ target.name }}
                    </button>
                  </li>
                  <li>
                    <button class="move-menu-item move-menu-item--muted" @click="selectMoveTarget(token.id, null)">
                      Off the Board
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </section>

        <OrnamentalDivider glyph="❦" />

        <div class="sheet-actions">
          <button class="sheet-action" @click="onAction('edit')">
            <Icon icon="game-icons:quill-ink" :width="22" :height="22" />
            <span>Edit</span>
          </button>
          <button class="sheet-action" @click="onAction('connect')">
            <Icon icon="game-icons:linked-rings" :width="22" :height="22" />
            <span>Connect</span>
          </button>
          <button class="sheet-action sheet-action--danger" @click="onAction('delete')">
            <Icon icon="game-icons:trash-can" :width="22" :height="22" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { Icon } from '@iconify/vue';
import OrnamentalDivider from './OrnamentalDivider.vue';
import { TOKEN_COLORS } from '../config/tokenColors.js';
import { TOKEN_ICON_MAP } from '../config/tokenIcons.js';

export default {
  name: 'ZoneDetailSheet',
  components: { Icon, OrnamentalDivider },
  props: {
    zone: { type: Object, default: null },
    tokens: { type: Array, default: () => [] },
    connections: { type: Array, default: () => [] },
    allZones: { type: Array, default: () => [] },
  },
  emits: ['close', 'open-conditions', 'edit', 'connect', 'delete', 'move-token'],
  data() {
    return {
      openPillId: null,
      openMoveTokenId: null,
      touchStartY: null,
      touchCurrentY: null,
    };
  },
  computed: {
    zoneTokens() {
      if (!this.zone) return [];
      return this.tokens.filter((t) => t.zoneId === this.zone.id);
    },
    moveTargets() {
      if (!this.zone) return [];
      const neighborIds = new Set();
      for (const [a, b] of this.connections) {
        if (a === this.zone.id) neighborIds.add(b);
        if (b === this.zone.id) neighborIds.add(a);
      }
      return this.allZones.filter((z) => neighborIds.has(z.id));
    },
  },
  watch: {
    zone(val, prev) {
      if (!val || (prev && val.id !== prev.id)) {
        this.openPillId = null;
        this.openMoveTokenId = null;
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
  methods: {
    handleKeydown(e) {
      if (e.key === 'Escape' && this.zone) this.$emit('close');
    },
    paletteFor(token) {
      return TOKEN_COLORS[token.color] || TOKEN_COLORS.ink;
    },
    iconNameFor(token) {
      return TOKEN_ICON_MAP[token.icon]?.iconifyName;
    },
    togglePill(pill) {
      if (!pill.detail) return;
      this.openPillId = this.openPillId === pill.id ? null : pill.id;
    },
    toggleMove(tokenId) {
      this.openMoveTokenId = this.openMoveTokenId === tokenId ? null : tokenId;
    },
    selectMoveTarget(tokenId, targetZoneId) {
      this.$emit('move-token', tokenId, targetZoneId);
      this.openMoveTokenId = null;
    },
    onAction(kind) {
      this.$emit(kind, this.zone.id);
    },
    onTouchStart(e) {
      if (!e.touches || !e.touches[0]) return;
      // Only start tracking when the touch originates near the sheet's top.
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      if (e.touches[0].clientY - rect.top > 60) return;
      this.touchStartY = e.touches[0].clientY;
      this.touchCurrentY = e.touches[0].clientY;
    },
    onTouchMove(e) {
      if (this.touchStartY == null) return;
      if (e.touches && e.touches[0]) this.touchCurrentY = e.touches[0].clientY;
    },
    onTouchEnd() {
      if (this.touchStartY == null) return;
      const delta = (this.touchCurrentY ?? this.touchStartY) - this.touchStartY;
      this.touchStartY = null;
      this.touchCurrentY = null;
      if (delta > 90) this.$emit('close');
    },
  },
};
</script>

<style scoped>
.sheet-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(46, 33, 20, 0.45);
  z-index: 130;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.sheet {
  position: relative;
  background-color: var(--parchment-base);
  background-image:
    radial-gradient(ellipse at top left, rgba(164, 134, 86, 0.08), transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(164, 134, 86, 0.1), transparent 50%);
  width: 100%;
  max-width: 640px;
  max-height: 85vh;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  box-shadow: 0 -8px 30px rgba(46, 33, 20, 0.35);
  overflow-y: auto;
  padding: 0.9rem 1.1rem 2rem;
}

.sheet-handle {
  width: 42px;
  height: 5px;
  background: var(--parchment-edge);
  border-radius: 3px;
  margin: 0 auto 0.9rem;
  opacity: 0.7;
}

.sheet-close {
  position: absolute;
  top: 0.5rem;
  right: 0.6rem;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  font-size: 1.6rem;
  line-height: 1;
  color: var(--ink-muted);
  cursor: pointer;
  padding: 0;
  z-index: 2;
}

.sheet-close:hover { color: var(--ink-primary); }

.sheet-header {
  margin-bottom: 0.4rem;
  padding-right: 2rem;
}

.sheet-title {
  font-size: 1.25rem;
  margin: 0 0 0.25rem;
  line-height: 1.2;
}

.sheet-description {
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
  color: var(--ink-secondary);
}

.sheet-section {
  margin: 0.4rem 0;
}

.section-label {
  font-family: var(--font-display);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: 0.45rem;
}

.condition-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.sheet-pill-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.sheet-pill {
  font-family: var(--font-display);
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  border: 1px solid;
  cursor: pointer;
  line-height: 1.4;
}

.sheet-pill--open {
  box-shadow: 0 0 0 2px var(--accent-gold);
}

.sheet-pill--neutral { background: #d9c28d; color: #2e2114; border-color: #a3905f; }
.sheet-pill--warm    { background: #c46a3b; color: #f5ede0; border-color: #8b4322; }
.sheet-pill--danger  { background: #8a2a2a; color: #f5ede0; border-color: #5a1515; }
.sheet-pill--muted   { background: #8a8270; color: #f5ede0; border-color: #5f594b; }
.sheet-pill--mystery { background: #5c3762; color: #f5ede0; border-color: #38213c; }

.sheet-pill--add {
  background: transparent;
  color: var(--ink-secondary);
  border-color: var(--button-border);
  border-style: dashed;
}

.sheet-pill--add:hover {
  background: var(--parchment-warm);
  color: var(--ink-primary);
}

.sheet-pill-detail {
  font-family: var(--font-body);
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--ink-primary);
  background: var(--parchment-warm);
  border: 1px solid var(--parchment-edge);
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
  margin: 0;
  max-width: 18rem;
}

.empty-note {
  font-size: 0.9rem;
  color: var(--ink-muted);
  margin: 0;
}

.token-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.token-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.35rem 0.5rem;
  background: var(--parchment-warm);
  border: 1px solid var(--parchment-edge);
  border-radius: 3px;
}

.token-swatch {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid;
  flex-shrink: 0;
}

.token-label {
  flex: 1;
  font-family: var(--font-display);
  font-size: 0.9rem;
  color: var(--ink-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.token-move-wrap {
  position: relative;
}

.token-move-btn {
  font-family: var(--font-display);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.3rem 0.65rem;
  background: transparent;
  border: 1px solid var(--button-border);
  color: var(--ink-primary);
  cursor: pointer;
  border-radius: 2px;
}

.token-move-btn--open,
.token-move-btn:hover {
  background: var(--button-bg);
}

.move-menu {
  position: absolute;
  top: calc(100% + 0.3rem);
  right: 0;
  min-width: 12rem;
  max-height: 50vh;
  overflow-y: auto;
  background: var(--parchment-warm);
  border: 1px solid var(--parchment-edge);
  box-shadow: 0 4px 12px rgba(46, 33, 20, 0.3);
  padding: 0.25rem 0;
  margin: 0;
  list-style: none;
  z-index: 5;
}

.move-menu-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.45rem 0.75rem;
  background: transparent;
  border: none;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--ink-primary);
  cursor: pointer;
}

.move-menu-item:hover {
  background: var(--parchment-shadow);
}

.move-menu-item--muted {
  color: var(--ink-muted);
  border-top: 1px solid var(--parchment-edge);
  font-style: italic;
}

.move-empty {
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  color: var(--ink-muted);
}

.sheet-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.4rem;
}

.sheet-action {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.65rem 0.25rem;
  background: var(--parchment-warm);
  border: 1px solid var(--parchment-edge);
  font-family: var(--font-display);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-primary);
  cursor: pointer;
  border-radius: 3px;
}

.sheet-action:hover {
  background: var(--button-bg);
}

.sheet-action--danger {
  color: var(--accent-red);
}

.sheet-action--danger:hover {
  background: rgba(138, 42, 42, 0.08);
}

.sheet-slide-enter-active,
.sheet-slide-leave-active {
  transition: opacity 180ms ease;
}

.sheet-slide-enter-active .sheet,
.sheet-slide-leave-active .sheet {
  transition: transform 220ms ease;
}

.sheet-slide-enter-from,
.sheet-slide-leave-to {
  opacity: 0;
}

.sheet-slide-enter-from .sheet,
.sheet-slide-leave-to .sheet {
  transform: translateY(100%);
}
</style>
