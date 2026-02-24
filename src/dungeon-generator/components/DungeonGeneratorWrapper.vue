<template>
  <DungeonGenerator v-bind="$attrs" />
</template>

<script setup>
import { provide, ref } from 'vue';
import DungeonGenerator from './DungeonGenerator.vue';

// Provide the motionToggle injection that Cedar skeleton components expect
const motionToggle = ref(true);
provide('motionToggle', motionToggle);
</script>
