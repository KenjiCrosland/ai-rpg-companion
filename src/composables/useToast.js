// useToast.js
// Lightweight event bus for toast notifications.
// Works without provide/inject so any component at any depth can fire toasts.

import { ref } from 'vue';

const toastRef = ref(null);

export function registerToast(componentRef) {
  toastRef.value = componentRef;
}

export function useToast() {
  return {
    success(message, duration = 3000, key = null) {
      toastRef.value?.show(message, 'success', duration, key);
    },
    error(message, duration = 5000, key = null) {
      toastRef.value?.show(message, 'error', duration, key);
    },
    warning(message, duration = 4000, key = null) {
      toastRef.value?.show(message, 'warning', duration, key);
    },
    info(message, duration = 3000, key = null) {
      toastRef.value?.show(message, 'info', duration, key);
    },
  };
}
