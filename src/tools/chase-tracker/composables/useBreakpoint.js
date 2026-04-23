import { ref, onMounted, onBeforeUnmount } from 'vue';

const MOBILE_QUERY = '(max-width: 640px)';

export function useIsMobile() {
  const isMobile = ref(false);
  let mq = null;
  let listener = null;

  function sync(e) {
    isMobile.value = e.matches;
  }

  onMounted(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    mq = window.matchMedia(MOBILE_QUERY);
    isMobile.value = mq.matches;
    listener = (e) => sync(e);
    // Modern + legacy safe.
    if (mq.addEventListener) mq.addEventListener('change', listener);
    else mq.addListener(listener);
  });

  onBeforeUnmount(() => {
    if (!mq || !listener) return;
    if (mq.removeEventListener) mq.removeEventListener('change', listener);
    else mq.removeListener(listener);
  });

  return isMobile;
}
