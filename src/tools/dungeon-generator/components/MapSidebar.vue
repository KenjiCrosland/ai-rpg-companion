<template>
  <div class="map-sidebar-container">
    <div class="toggle-button" :class="{ 'mobile': isMobile, 'expanded': !props.isCollapsed && isMobile }"
      @click="toggleSidebar" :aria-expanded="!props.isCollapsed" aria-label="Toggle sidebar" role="button" tabindex="0"
      @keydown.enter.space="toggleSidebar">
      <!-- Toggle icon changes based on the state and viewport -->
      <span>{{ toggleIcon }}</span>
    </div>
    <div class="map-sidebar" :class="{ 'is-collapsed': props.isCollapsed }">
      <div class="sidebar-content">
        <!-- Slot for injecting content -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const isMobile = ref(false);

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:isCollapsed']);

function toggleSidebar() {
  emit('update:isCollapsed', !props.isCollapsed);
}

function checkIsMobile() {
  isMobile.value = window.innerWidth <= 768;
}

onMounted(() => {
  checkIsMobile();
  window.addEventListener('resize', checkIsMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkIsMobile);
});

// Computed property to determine the toggle icon
const toggleIcon = computed(() => {
  if (isMobile.value) {
    return props.isCollapsed ? '▲' : '▼'; // Up and Down triangles for mobile
  } else {
    return props.isCollapsed ? '◀' : '▶'; // Left and Right triangles for desktop
  }
});
</script>

<style scoped>
.map-sidebar-container {
  position: relative;
}

.sidebar-content {
  /* Generous inner padding — sourcebook content needs breathing room
     between the text and the column edge. Horizontal gutters at
     3.5rem (the widest comfortable margin without starving the line
     length) so body paragraphs and the read-aloud box read like
     printed page spreads, not narrow webpage columns. */
  padding: 2rem 3.5rem 2.5rem;
  overflow-y: auto;
}

/* Sidebar Styles */
.map-sidebar {
  background-color: #fafaf6;
  /* Divider rule matches the collapse-tab outline (faded slate) —
     same lapis-family secondary chrome color, so the tab reads as
     an affordance hanging off the divider rather than a foreign
     element. The tab itself drops its own right border so the
     sidebar's left border serves as the tab's right edge — single
     continuous slate line. */
  border-left: 1px solid var(--color-action-secondary-rest, #5A7A9A);
  /* Sidebar holds the room description. Width tuned for sourcebook
     line lengths: at 540px with 3.5rem horizontal gutters the body
     column lands at ~428px, giving roughly 42-46 chars per line at
     1.6rem Source Serif — closer to WotC printed adventures (which
     run ~40-55 chars in their narrow columns) than to webpage body
     widths. Fixed (not percentage) because the nested container
     chain makes percentages resolve unpredictably. */
  width: 540px;
  transition: width 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 1.6rem;
}

.map-sidebar.is-collapsed {
  width: 20px;
}

/* Sidebar collapse tab — passive chrome affordance, styled as a
   ParButton secondary variant: transparent surface, faded
   slate outline, slate icon. The outlined treatment recedes against
   the parchment surroundings instead of competing for attention.
   Hover/active fill with progressively deeper slate tints, matching
   the secondary action pattern used elsewhere in parchment chrome. */
.toggle-button {
  position: absolute;
  width: 30px;
  height: 60px;
  /* Solid parchment surface fill — the tab overhangs the map area
     (where the map's #fafaf6 surface sits behind), so a transparent
     bg would let map content bleed through and the outline-only
     treatment would feel unanchored. Matching the sidebar's own
     surface color keeps it visually attached to the sidebar edge. */
  background-color: var(--par-color-surface, #FBF7F0);
  border: 1px solid var(--color-action-secondary-rest, #5A7A9A);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--action-transition);
  z-index: 1001;
  color: var(--color-action-secondary-rest, #5A7A9A);
}

.toggle-button span {
  font-size: 1.5rem;
  line-height: 1;
}

/* Hover/active layer the slate tint OVER the cream surface using
   background-image (which stacks above background-color) rather than
   replacing background-color outright. Otherwise the rgba tint shows
   the map through the button on interaction — the secondary action
   pattern in ParButton works the same way when sitting on a
   solid card surface; here we have to be explicit because the button
   overhangs the map area. */
.toggle-button:hover {
  background-image: linear-gradient(
    var(--color-action-secondary-hover-bg, rgba(90, 122, 154, 0.08)),
    var(--color-action-secondary-hover-bg, rgba(90, 122, 154, 0.08))
  );
}

.toggle-button:active {
  background-image: linear-gradient(
    var(--color-action-secondary-active-bg, rgba(90, 122, 154, 0.16)),
    var(--color-action-secondary-active-bg, rgba(90, 122, 154, 0.16))
  );
}

.toggle-button:focus-visible {
  outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px var(--color-action-secondary-focus-glow, rgba(90, 122, 154, 0.3));
}

/* Desktop-specific Styles */
@media (min-width: 769px) {
  .toggle-button {
    top: 60px;
    left: -30px;
    /* Fixed to the edge of the sidebar */
    transform: translateY(-50%);
    /* Right side flush against the sidebar edge — squared off so the
       sidebar's left border continues seamlessly as the tab's right
       edge; only the left side is rounded into the tab shape. */
    border-radius: 5px 0 0 5px;
    /* Drop the right border; the sidebar's border-left fills that
       role, giving a single continuous slate line down the column. */
    border-right: none;
  }

  .toggle-button.expanded {
    left: -25px;
    /* Maintain fixed position to the edge when expanded */
  }
}

/* Mobile-specific Styles */
@media (max-width: 768px) {
  .map-sidebar-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
  }

  .map-sidebar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    transition: height 0.3s ease;
    overflow: hidden;
    border-left: none;
    border-top: 1px solid #ccc;
  }

  .map-sidebar.is-collapsed {
    height: 0;
  }

  .map-sidebar:not(.is-collapsed) {
    height: 500px;
    /* Adjust this height as needed */
  }

  .toggle-button.mobile {
    position: fixed;
    left: 50%;
    bottom: 10px;
    /* When collapsed */
    transform: translateX(-50%);
    width: 50px;
    /* Larger size for better touch targets */
    height: 50px;
    /* Larger size for better touch targets */
    border-radius: 50%;
    /* Completely round */
  }

  .toggle-button.mobile.expanded {
    bottom: 510px;
    /* 500px sidebar height + 10px margin */
  }
}
</style>
