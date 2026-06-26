<template>
  <div class="tabs">
    <ul class="tab-header-container" role="tablist">
      <li v-for="(tab, index) in tabs" :key="index" role="presentation">
        <button :ref="(el) => setButtonRef(el, index)" :aria-selected="currentIndex === index"
          :tabindex="focusedIndex === index && !tab.disabled ? 0 : -1" :disabled="tab.disabled" class="tab-header-item"
          :class="{ 'active': currentIndex === index, 'disabled': tab.disabled }" role="tab"
          @click="tab.disabled ? null : selectTab(index)"
          @keydown.right.prevent="tab.disabled ? null : moveFocus(focusedIndex, 'next')"
          @keydown.down.prevent="tab.disabled ? null : moveFocus(focusedIndex, 'next')"
          @keydown.up.prevent="tab.disabled ? null : moveFocus(focusedIndex, 'prev')"
          @keydown.left.prevent="tab.disabled ? null : moveFocus(focusedIndex, 'prev')"
          @keydown.enter.prevent="tab.disabled ? null : selectTab(focusedIndex)"
          @keydown.space.prevent="tab.disabled ? null : selectTab(focusedIndex)">
          {{ tab.label }}
        </button>
      </li>
    </ul>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, provide, onMounted, watch } from 'vue';
// Accept an activeIndex prop
const props = defineProps({
  activeIndex: {
    type: Number,
    default: 0
  }
});

const tabs = ref([]);
const currentIndex = ref(props.activeIndex);
const focusedIndex = ref(props.activeIndex); // Initialize with the active index prop
const tabRefs = ref([]);

watch(() => props.activeIndex, (newIndex) => {
  if (newIndex !== currentIndex.value) {
    selectTab(newIndex);
  }
}, { immediate: true });

const setButtonRef = (el, index) => {
  tabRefs.value[index] = el;
};

function selectTab(index) {
  currentIndex.value = index;
  focusedIndex.value = index; // Update focused index to match the selected tab
  focusTab(index); // Focus when tab is selected
}


function focusTab(index) {
  if (tabRefs.value[index]) {
    tabRefs.value[index].focus(); // Set focus using the DOM element
  }
}

function moveFocus(currentIndex, direction) {
  let newIndex = direction === 'next' ?
    (currentIndex + 1) % tabs.value.length :
    (currentIndex - 1 + tabs.value.length) % tabs.value.length;
  focusedIndex.value = newIndex; // Update focused index
  focusTab(newIndex); // Move focus
}

watch(focusedIndex, (newIndex) => {
  tabRefs.value.forEach((tab, index) => {
    if (tab) tab.tabIndex = index === newIndex ? 0 : -1; // Update tabIndex reactively
  });
}, { immediate: true });

onMounted(() => {
  focusedIndex.value = currentIndex.value; // Initialize focused index
});
provide('tabs', tabs);
provide('currentIndex', currentIndex);
</script>


<style scoped>
.tabs {
  display: flex;
  flex-direction: column;
}

.tab-header-container {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  list-style: none;
  padding: 0;
  /* Whisper-thin separator instead of a hard rule. The bar previously
     read as a Cedar chrome element pasted above the content; at 0.05rem
     and 6% opacity it functions as a layout cue without containing the
     content beneath it. The greyish hex matches the previous accent
     hue — only the weight and opacity change. */
  border-bottom: 0.05rem solid rgba(146, 139, 128, 0.06);
}

@media (max-width: 768px) {
  .tab-header-container {
    flex-direction: column;
  }

  .tab-header-item {
    width: 100%;
  }
}

.tab-header-item {
  padding: 12px 16px;
  text-align: center;
  border: none;
  background-color: inherit;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s;
  font-style: normal;
  font-weight: inherit;
  letter-spacing: -.008rem;
  font-size: 1.6rem;
  line-height: 2.2rem;
  flex-grow: 1;
  background-color: transparent;
  display: block;
  color: #423b2fbf;
  font-weight: 300;
  text-decoration: none;
  padding: 1.2rem .8rem;
  white-space: nowrap;
  outline-offset: -.3rem;
  min-width: 10rem;
}

/* not aria-selected */
.tab-header-item[aria-selected="false"] {
  color: #423b2fbf;
  /* Transparent rather than white so inactive tabs inherit the
     parchment page surface beneath. A white inactive bg against a
     warm-cream page would create a hard chrome-vs-parchment seam at
     the tab strip — the whole strip should read as one continuous
     surface. */
  background-color: transparent;
  font-weight: 300;
  border-bottom: 3px solid transparent;
  border-top: 3px solid transparent;
}

.tab-header-item[aria-selected="true"] {
  color: #0c0b08bf;
  /* Warm parchment tint so the active tab reads as gently recessed into the
     parchment rather than as a Cedar-grey element pasted above. (The page
     surface --par-color-surface-page is the cool gray #EAEEF2; this warm tint
     sits in the editorial register against it.) */
  background-color: #F8F5EF;
  font-weight: 500;
  border-bottom: 3px solid #406eb5;
  border-top: 3px solid #F8F5EF;
}

.tab-header-item.disabled {
  color: #aaa;
  /* Gray out the label */
  cursor: not-allowed;
}

.tab-header-item.disabled:hover,
.tab-header-item.disabled:focus {
  background-color: transparent;
  border: 3px solid transparent;
  font-weight: 300;
  color: #aaa;
}

.tab-header-item:hover,
.tab-header-item:focus {
  border: 3px solid #406eb5;
  color: #406eb5;
  font-weight: 600;
  /* Match the active-tab parchment tint on hover so hovering an
     inactive tab previews the same warm-cream sit-on-parchment
     reading the active tab uses. */
  background-color: #F8F5EF;
}
</style>
