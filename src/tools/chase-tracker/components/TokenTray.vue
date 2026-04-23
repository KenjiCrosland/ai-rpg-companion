<template>
  <div
    :class="['token-tray', { 'token-tray--drop-active': canAcceptDrop }]"
    @dragover="onDragOver"
    @drop="onDrop"
  >
    <div class="tray-header">
      <span class="display-heading tray-title">Off the Board</span>
    </div>

    <div class="tray-body">
      <Token
        v-for="token in tokens"
        :key="token.id"
        :token="token"
        :selected="token.id === selectedTokenId"
        @select="(id) => $emit('select-token', id)"
        @rename="(id, label) => $emit('rename-token', id, label)"
        @remove="(id) => $emit('remove-token', id)"
        @drag-start="(id) => $emit('drag-start', id)"
        @drag-end="(id) => $emit('drag-end', id)"
      />

      <p v-if="tokens.length === 0" class="tray-empty ink-italic">
        Drag tokens here to remove them from play.
      </p>

      <button class="tray-add" @click="$emit('add-token')">
        <span class="tray-add-plus">+</span>
        <span class="tray-add-label">Add Token</span>
      </button>
    </div>
  </div>
</template>

<script>
import Token from './Token.vue';

export default {
  name: 'TokenTray',
  components: { Token },
  props: {
    tokens: { type: Array, default: () => [] },
    selectedTokenId: { type: String, default: null },
    draggedTokenId: { type: String, default: null },
    draggedTokenFromZoneId: { type: String, default: null },
  },
  emits: [
    'select-token',
    'rename-token',
    'remove-token',
    'add-token',
    'drag-start',
    'drag-end',
    'drop-token',
  ],
  computed: {
    // A drag from a zone -> tray is always valid (removes from play).
    // A drag from tray -> tray is a no-op; skip highlighting in that case.
    canAcceptDrop() {
      return Boolean(this.draggedTokenId) && this.draggedTokenFromZoneId !== null;
    },
  },
  methods: {
    onDragOver(event) {
      if (!this.canAcceptDrop) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    },
    onDrop(event) {
      if (!this.canAcceptDrop) return;
      event.preventDefault();
      const tokenId = event.dataTransfer.getData('text/plain');
      if (!tokenId) return;
      this.$emit('drop-token', tokenId, null);
    },
  },
};
</script>

<style scoped>
.token-tray {
  margin-top: 1.5rem;
  padding: 0.8rem 1rem 1rem;
  background-color: var(--parchment-shadow);
  border: 1px solid var(--parchment-edge);
  box-shadow:
    inset 0 2px 6px rgba(46, 33, 20, 0.15),
    inset 0 -1px 0 rgba(46, 33, 20, 0.1);
  border-radius: 2px;
  transition: box-shadow 150ms ease, background-color 150ms ease;
}

.token-tray--drop-active {
  background-color: #e6d097;
  box-shadow:
    inset 0 0 0 2px var(--accent-gold),
    inset 0 2px 6px rgba(46, 33, 20, 0.15);
}

.tray-header {
  margin-bottom: 0.5rem;
}

.tray-title {
  font-size: 0.78rem;
  color: var(--ink-muted);
  letter-spacing: 0.14em;
}

.tray-body {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 1rem;
  min-height: 84px;
}

.tray-empty {
  font-size: 0.85rem;
  color: var(--ink-muted);
  flex: 1;
  margin: 0;
  align-self: center;
}

.tray-add {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  width: 56px;
  background: transparent;
  border: 2px dashed var(--parchment-edge);
  border-radius: 50%;
  padding: 0;
  height: 56px;
  cursor: pointer;
  color: var(--ink-muted);
  font-family: var(--font-display);
  transition: color 150ms ease, border-color 150ms ease, background 150ms ease;
}

.tray-add:hover {
  color: var(--ink-primary);
  border-color: var(--accent-gold);
  background: var(--parchment-warm);
}

.tray-add-plus {
  font-size: 1.3rem;
  line-height: 1;
}

.tray-add-label {
  font-size: 0.55rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
