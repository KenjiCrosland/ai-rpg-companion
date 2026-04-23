<template>
  <footer class="tool-footer">
    <OrnamentalDivider />
    <p class="footer-credits">
      A gift from
      <a href="https://cros.land" class="footer-link">cros.land</a>
      · Token icons by
      <a href="https://game-icons.net" rel="noopener" class="footer-link">game-icons.net</a>
      (<a href="https://creativecommons.org/licenses/by/3.0/" rel="noopener" class="footer-link">CC BY 3.0</a>)
    </p>
    <p class="footer-links">
      <a href="/dnd-5e-encounter-generator/">Encounter Generator</a>
      · <a href="/rpg-ai-npc-generator/">NPC Generator</a>
      · <a href="/ai-rpg-location-generator/">Location Generator</a>
      · <a href="/ai-powered-dnd-5e-monster-statblock-generator/">Statblock Generator</a>
    </p>
  </footer>
</template>

<script>
import OrnamentalDivider from './OrnamentalDivider.vue';

export default {
  name: 'ToolFooter',
  components: { OrnamentalDivider },
};
</script>

<style scoped>
.tool-footer {
  padding: 2rem 1rem 3rem;
  text-align: center;
  color: var(--ink-muted);
  font-size: 0.85rem;
}

.footer-credits,
.footer-links {
  margin: 0.5rem 0;
  line-height: 1.5;
}

.footer-link,
.footer-links a {
  color: var(--ink-secondary);
  text-decoration: underline;
  text-decoration-color: var(--parchment-edge);
  text-underline-offset: 2px;
}

.footer-link:hover,
.footer-links a:hover {
  color: var(--accent-red);
}
</style>
