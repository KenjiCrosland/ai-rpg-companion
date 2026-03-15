<template>
  <Teleport to="body">
    <TransitionGroup name="toast" tag="div" class="toast-container" :class="position">
      <div v-for="toast in toasts" :key="toast.id" class="toast" :class="toast.type" role="status" aria-live="polite">
        <span class="toast-icon" v-if="toast.type === 'success'">&#10003;</span>
        <span class="toast-icon" v-else-if="toast.type === 'error'">!</span>
        <span class="toast-icon" v-else-if="toast.type === 'warning'">&#9888;</span>
        <span class="toast-message">{{ toast.message }}</span>
        <button class="toast-dismiss" @click="dismiss(toast.id)" aria-label="Dismiss">&times;</button>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  position: {
    type: String,
    default: 'bottom-center',
    validator: (val) => ['top-center', 'top-right', 'bottom-center', 'bottom-right'].includes(val)
  }
});

const toasts = ref([]);
let nextId = 0;

function show(message, type = 'success', duration = 3000, key = null) {
  // If a key is provided, replace any existing toast with the same key
  if (key) {
    const existingIndex = toasts.value.findIndex(t => t.key === key);
    if (existingIndex > -1) {
      return; // Already showing this toast, don't stack
    }
  }

  const id = nextId++;
  toasts.value.push({ id, message, type, key });

  if (duration > 0) {
    setTimeout(() => dismiss(id), duration);
  }
}

function dismiss(id) {
  const index = toasts.value.findIndex(t => t.id === id);
  if (index > -1) {
    toasts.value.splice(index, 1);
  }
}

// Expose methods so parent components can call them via ref
defineExpose({ show, dismiss });
</script>

<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';

.toast-container {
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  pointer-events: none;
  padding: 1rem;

  &.top-center {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  }

  &.top-right {
    top: 0;
    right: 0;
    align-items: flex-end;
  }

  &.bottom-center {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  }

  &.bottom-right {
    bottom: 0;
    right: 0;
    align-items: flex-end;
  }
}

.toast {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-size: 1.4rem;
  line-height: 1.4;
  max-width: 480px;
  min-width: 280px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.08);

  &.success {
    background-color: #f0faf0;
    border: 1px solid #b7ddb7;
    color: #1a5c1a;

    .toast-icon {
      color: #2d8a2d;
    }
  }

  &.error {
    background-color: #fef2f2;
    border: 1px solid #f5c6c6;
    color: #7f1d1d;

    .toast-icon {
      color: #c53030;
    }
  }

  &.warning {
    background-color: #fdf8ef;
    border: 1px solid #f0e4cc;
    color: #7c5a10;

    .toast-icon {
      color: #9c6a0a;
    }
  }

  &.info {
    background-color: #f0f4ff;
    border: 1px solid #c6d4f5;
    color: #1e3a6e;

    .toast-icon {
      color: #3b6bd5;
    }
  }
}

.toast-icon {
  flex-shrink: 0;
  font-size: 1.4rem;
  font-weight: 700;
  width: 1.5rem;
  text-align: center;
}

.toast-message {
  flex: 1;
}

.toast-dismiss {
  flex-shrink: 0;
  background: none;
  border: none;
  font-size: 1.6rem;
  line-height: 1;
  cursor: pointer;
  color: inherit;
  opacity: 0.5;
  padding: 0 0.25rem;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }
}

/* Transitions */
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.2s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.toast-move {
  transition: transform 0.25s ease;
}
</style>