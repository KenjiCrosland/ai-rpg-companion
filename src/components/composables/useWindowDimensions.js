import { ref, onMounted, onUnmounted } from 'vue';

function useWindowDimensions() {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  function handleResize() {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  return { width, height };
}

export default useWindowDimensions;
