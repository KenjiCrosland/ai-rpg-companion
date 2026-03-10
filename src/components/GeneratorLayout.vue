<template>
  <div class="layout-wrapper">
    <ToolNavigation />
    <div class="app-container">
    <!-- Overlay to close sidebar on click (mobile only) -->
    <div class="overlay" v-show="isSidebarVisible && windowWidth <= 768" @click="isSidebarVisible = false"></div>

    <!-- Sidebar -->
    <div class="sidebar" :style="sidebarStyle">
      <slot name="sidebar"></slot>
    </div>

    <!-- Main Content -->
    <slot></slot>

    <!-- Bottom Menu Button for Mobile -->
    <button
      class="mobile-menu-button"
      v-show="windowWidth <= 768"
      @click="isSidebarVisible = !isSidebarVisible"
      :class="{ active: isSidebarVisible }"
      aria-label="Toggle menu">
      <icon-navigation-menu inherit-color />
      <span class="button-label">Menu</span>
    </button>
  </div>

    <!-- Mobile Bottom Bar -->
    <div class="mobile-bottom-bar">
      <select :value="currentSlug" @change="navigate($event.target.value)">
        <optgroup label="Generators">
          <option v-for="tool in mainTools" :key="tool.slug" :value="tool.slug">
            {{ tool.name }}
          </option>
        </optgroup>
        <optgroup label="Patron Exclusive">
          <option v-for="tool in patronTools" :key="tool.slug" :value="tool.slug">
            ★ {{ tool.name }}
          </option>
        </optgroup>
      </select>
      <button class="menu-button" @click="isSidebarVisible = !isSidebarVisible">
        <icon-navigation-menu inherit-color />
        <span>Menu</span>
      </button>
    </div>

    <!-- Footer -->
    <footer class="ogl-footer">
      <div class="footer-title">Kenji's Game Master Tools</div>
      <div class="footer-links">
        <cdr-link href="https://cros.land" target="_blank">Blog</cdr-link>
        <span class="separator">•</span>
        <cdr-link href="https://discord.gg/DJVTbkH4VG" target="_blank">Discord</cdr-link>
        <span class="separator">•</span>
        <cdr-link href="https://www.patreon.com/c/ai_rpg_tookit" target="_blank">Patreon</cdr-link>
      </div>
      <div class="ogl-text">
        This content uses the D&D 5e SRD under the <cdr-link href="https://cros.land/ogl" target="_blank">Open Gaming License</cdr-link>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { IconNavigationMenu, CdrLink } from '@rei/cedar';
import '@rei/cedar/dist/style/cdr-link.css';
import ToolNavigation from './ToolNavigation.vue';
import { mainTools, patronTools, getCurrentSlug, navigate as navigateToTool } from '@/data/tool-navigation.js';

const props = defineProps({
  premium: {
    type: Boolean,
    default: false
  }
});

const isSidebarVisible = ref(false);
const windowWidth = ref(window.innerWidth);
const currentSlug = computed(() => getCurrentSlug());

function navigate(slug) {
  if (slug === currentSlug.value) return;
  navigateToTool(slug);
}

function updateWindowWidth() {
  windowWidth.value = window.innerWidth;
}

function updateVisibility() {
  // Show sidebar on tablet and desktop, hide on mobile
  if (windowWidth.value > 768) {
    isSidebarVisible.value = true;
  } else {
    isSidebarVisible.value = false;
  }
}

const sidebarStyle = computed(() => {
  if (windowWidth.value <= 768) {
    return {
      position: 'fixed',
      transform: isSidebarVisible.value ? 'translateX(0)' : 'translateX(-100%)',
      width: '70%',
      maxWidth: '400px'
    };
  } else {
    return {
      width: '400px'
    };
  }
});

onMounted(() => {
  updateWindowWidth();
  updateVisibility();
  window.addEventListener('resize', updateWindowWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
});

// Lock body scroll when sidebar is open on mobile
watch([isSidebarVisible, windowWidth], ([sidebarOpen, width]) => {
  if (width <= 768 && sidebarOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>

<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';

.layout-wrapper {
  position: relative;
}

.app-container {
  display: flex;

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .sidebar {
    transition: transform 0.3s ease;
    background-color: #f4f4f4;
    width: 400px;
    min-width: 320px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    z-index: 1001;
    overflow: hidden;
  }

  .mobile-menu-button {
    display: none;
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 64px;
    height: 64px;
    background-color: #e0e0e0;
    color: #333;
    border: none;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    z-index: 998;
    transition: all 0.3s ease;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;

    svg {
      width: 24px;
      height: 24px;
    }

    .button-label {
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      background-color: #d0d0d0;
    }

    &:active {
      transform: scale(0.95);
    }

    &.active {
      background-color: #333;
      color: #fff;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
  }
}

.mobile-bottom-bar {
  display: none;
}

.ogl-footer {
  text-align: center;
  padding: 2rem 1rem;
  margin-top: 3rem;
  border-top: 1px solid #dee2e6;
  color: $cdr-color-text-secondary;
  font-size: 1.5rem;

  .footer-title {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: $cdr-color-text-primary;
  }

  .footer-links {
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;

    .separator {
      color: #999;
      margin: 0 0.25rem;
    }
  }

  .ogl-text {
    font-size: 1.5rem;
    color: $cdr-color-text-secondary;
  }
}

@media (max-width: 768px) {
  .app-container {
    padding-bottom: 5rem;
  }

  .mobile-bottom-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1002;
    padding: 1rem 1.25rem;
    background: #fff;
    border-top: 1px solid #e5e5e5;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
  }

  .mobile-bottom-bar select {
    flex: 1;
    min-width: 0;
    font-size: 1.125rem;
    padding: 0.75rem 0.875rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    color: #333;
    margin-right: 1rem;
  }

  .mobile-bottom-bar .menu-button {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.75rem 1.125rem;
    font-weight: 600;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    color: #333;
    cursor: pointer;
    white-space: nowrap;
  }

  .mobile-bottom-bar .menu-button svg {
    width: 20px;
    height: 20px;
  }
}
</style>
