<template>
  <div
    :class="['token', { 'token--selected': selected, 'token--dragging': dragging }]"
    :draggable="!isTouch"
    @click.stop="onClick"
    @dblclick.stop="beginRename"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
  >
    <div
      class="token-checker"
      :style="checkerStyle"
    >
      <Icon
        v-if="iconifyName"
        :icon="iconifyName"
        :width="32"
        :height="32"
        :style="{ color: palette.text }"
        aria-hidden="true"
      />
      <button
        class="token-remove"
        title="Remove token"
        @click.stop="confirmRemove"
      >×</button>
    </div>
    <div v-if="!editing" class="token-label" :title="token.label">
      {{ token.label }}
    </div>
    <input
      v-else
      ref="renameInput"
      v-model="draft"
      class="token-rename"
      @click.stop
      @keydown.enter="commitRename"
      @keydown.esc="cancelRename"
      @blur="commitRename"
    />
  </div>
</template>

<script>
import { nextTick } from 'vue';
import { Icon } from '@iconify/vue';
import { TOKEN_ICON_MAP } from '../config/tokenIcons.js';
import { TOKEN_COLORS } from '../config/tokenColors.js';

const isTouch =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || (navigator.maxTouchPoints || 0) > 0);

export default {
  name: 'Token',
  components: { Icon },
  props: {
    token: { type: Object, required: true },
    selected: { type: Boolean, default: false },
  },
  emits: ['select', 'rename', 'remove', 'drag-start', 'drag-end'],
  data() {
    return { editing: false, draft: '', dragging: false, isTouch };
  },
  computed: {
    palette() {
      return TOKEN_COLORS[this.token.color] || TOKEN_COLORS.ink;
    },
    iconifyName() {
      return TOKEN_ICON_MAP[this.token.icon]?.iconifyName;
    },
    checkerStyle() {
      return {
        backgroundColor: this.palette.fill,
        borderColor: this.palette.border,
        color: this.palette.text,
      };
    },
  },
  methods: {
    onClick() {
      if (this.editing) return;
      this.$emit('select', this.token.id);
    },
    async beginRename() {
      this.draft = this.token.label;
      this.editing = true;
      await nextTick();
      this.$refs.renameInput?.focus();
      this.$refs.renameInput?.select();
    },
    commitRename() {
      if (!this.editing) return;
      const value = this.draft.trim();
      if (value && value !== this.token.label) {
        this.$emit('rename', this.token.id, value);
      }
      this.editing = false;
    },
    cancelRename() {
      this.editing = false;
    },
    confirmRemove() {
      if (window.confirm(`Remove ${this.token.label}?`)) {
        this.$emit('remove', this.token.id);
      }
    },
    onDragStart(event) {
      if (isTouch) return;
      this.dragging = true;
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', this.token.id);
      this.$emit('drag-start', this.token.id);
    },
    onDragEnd() {
      this.dragging = false;
      this.$emit('drag-end', this.token.id);
    },
  },
};
</script>

<style scoped>
.token {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  max-width: 100px;
  user-select: none;
  cursor: grab;
  transition: transform 120ms ease;
}

.token:active {
  cursor: grabbing;
}

.token--dragging {
  opacity: 0.45;
}

.token-checker {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2px solid var(--parchment-edge);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(46, 33, 20, 0.3);
  position: relative;
  transition: transform 150ms ease, box-shadow 150ms ease;
}

.token:hover .token-checker {
  transform: scale(1.06);
  box-shadow: 0 4px 8px rgba(46, 33, 20, 0.35);
}

.token--selected .token-checker {
  box-shadow:
    0 0 0 3px var(--accent-gold),
    0 0 12px rgba(168, 133, 54, 0.55),
    0 2px 4px rgba(46, 33, 20, 0.3);
  animation: token-pulse 1.6s ease-in-out infinite;
}

@keyframes token-pulse {
  0%, 100% {
    box-shadow:
      0 0 0 3px var(--accent-gold),
      0 0 8px rgba(168, 133, 54, 0.35),
      0 2px 4px rgba(46, 33, 20, 0.3);
  }
  50% {
    box-shadow:
      0 0 0 3px var(--accent-gold),
      0 0 16px rgba(168, 133, 54, 0.75),
      0 2px 4px rgba(46, 33, 20, 0.3);
  }
}

.token-label {
  font-family: var(--font-display);
  font-size: 0.82rem;
  letter-spacing: 0.03em;
  color: var(--ink-primary);
  text-align: center;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.1;
}

.token-rename {
  font: inherit;
  font-family: var(--font-body);
  font-size: 0.85rem;
  background: var(--parchment-warm);
  border: 1px solid var(--button-border);
  padding: 0.1rem 0.3rem;
  width: 6.5rem;
  color: var(--ink-primary);
  text-align: center;
}

.token-remove {
  position: absolute;
  top: -6px;
  right: -6px;
  opacity: 0;
  background: var(--parchment-warm);
  border: 1px solid var(--parchment-edge);
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 0;
  font-size: 0.9rem;
  line-height: 1;
  color: var(--ink-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 120ms ease;
}

.token:hover .token-remove {
  opacity: 1;
}

.token-remove:hover {
  color: var(--accent-red);
  border-color: var(--accent-red);
}

@media (max-width: 640px) {
  .token {
    gap: 0;
    cursor: pointer;
  }

  .token-checker {
    width: 44px;
    height: 44px;
    border-width: 2px;
    box-shadow: 0 2px 3px rgba(46, 33, 20, 0.35);
  }

  .token:hover .token-checker,
  .token:active .token-checker {
    transform: none;
  }

  .token-checker svg {
    width: 26px;
    height: 26px;
  }

  .token-label,
  .token-remove {
    display: none;
  }

  /* Clearer selected treatment on mobile — slightly thicker ring,
     no pulsing animation (feels less frantic at thumb distance). */
  .token--selected .token-checker {
    box-shadow:
      0 0 0 3px var(--accent-gold),
      0 0 8px rgba(168, 133, 54, 0.6),
      0 2px 3px rgba(46, 33, 20, 0.35);
    animation: none;
  }
}
</style>
