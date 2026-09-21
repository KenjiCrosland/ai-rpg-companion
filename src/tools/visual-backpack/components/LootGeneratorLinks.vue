<template>
  <section class="lgl">
    <h3 class="lgl__title">Works with these loot generators</h3>
    <p class="lgl__lead">Paste the output from any of these straight in — no cleanup needed:</p>
    <ul class="lgl__list">
      <li>
        <a href="https://donjon.bin.sh/5e/random/#type=treasure" target="_blank" rel="noopener">Donjon — 5e Treasure Generator</a>
      </li>
      <li>
        <a href="https://5e.tools/lootgen.html" target="_blank" rel="noopener">5e.tools — Loot Generator</a>
      </li>
      <li>
        <a href="https://www.thievesguild.cc/tables/treasuresplit.php" target="_blank" rel="noopener">Thieves’ Guild — Treasure Generator</a>
      </li>
    </ul>
    <p class="lgl__contact">
      Have a treasure generator you’d like this tool to support — or one that already
      works but isn’t listed?
      <a href="https://cros.land/contact-me/" target="_blank" rel="noopener">Contact Kenji</a>.
    </p>
  </section>
</template>

<script setup>
/**
 * The loot generators this splitter is verified compatible with — their text /
 * JSON output pastes straight into parse-treasure. Shared by the standalone Loot
 * Splitter page and the backpack's "Paste loot list" modal so the list (and the
 * outreach note for other generator authors) lives in exactly one place.
 */
</script>

<style scoped>
.lgl {
  padding: 1.2rem 1.4rem;
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-md, 4px);
  background: rgba(243, 235, 218, 0.3);
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
}
.lgl__title {
  margin: 0 0 0.3rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-action-hover, #2a4d70);
}
.lgl__lead {
  margin: 0 0 0.6rem;
  font-size: 1.25rem;
  color: var(--par-color-text-secondary, #555);
}
.lgl__list {
  margin: 0 0 0.8rem;
  padding-left: 1.6rem;
  font-size: 1.3rem;
  line-height: 1.7;
}
.lgl__list a,
.lgl__contact a {
  color: var(--color-action-hover, #2a4d70);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.lgl__contact {
  margin: 0;
  font-size: 1.15rem;
  font-style: italic;
  line-height: 1.5;
  color: var(--par-color-text-muted, #6b6b6b);
}
</style>
