<template>
  <div v-show="isActive" class="panel-content">
    <slot></slot>
  </div>
</template>

<script setup>
import { inject, computed, defineProps } from 'vue';

const props = defineProps(['label']);
const tabs = inject('tabs');
const currentIndex = inject('currentIndex');

const index = tabs.value.length;
tabs.value.push({ label: props.label });

const isActive = computed(() => index === currentIndex.value);
</script>

<style scoped>
.panel-content {
  padding: 10px;
  background: #fff;
  min-height: 100px;
}
</style>
