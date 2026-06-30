<template>
  <span class="richtext"><template
      v-for="(s, i) in spans"
      :key="i"
    ><strong v-if="s.bold && s.italic"><em>{{ s.text }}</em></strong><strong
        v-else-if="s.bold"
      >{{ s.text }}</strong><em v-else-if="s.italic">{{ s.text }}</em><template
        v-else
      >{{ s.text }}</template></template></span>
</template>

<script setup>
/**
 * Renders a Markdown string's inline emphasis (bold / italic / bold-italic) as
 * real strong/em elements — no v-html, so it's XSS-safe even for user-entered
 * custom-item text.
 */
import { computed } from 'vue';
import { parseInline } from '../utils/format-description.mjs';

const props = defineProps({ text: { type: String, default: '' } });
const spans = computed(() => parseInline(props.text));
</script>
