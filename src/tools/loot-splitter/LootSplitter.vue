<template>
  <div class="lst parchment">
    <header class="lst__hero">
      <h1 class="lst__title">Kenji&rsquo;s D&amp;D Loot Splitter</h1>
      <p class="lst__subtitle">
        Paste a hoard and split it fairly between players — coins divided evenly by
        value, magic items dealt out (or balanced by worth). No sign-in, nothing saved.
      </p>
    </header>

    <main class="lst__page">
      <section class="lst__input parchment paper-grain">
        <label class="lst__label" for="lst-text">Your hoard</label>
        <p class="lst__intro">Coins and items, one per line — loot-generator dumps work as-is. <button v-if="!text.trim()" type="button" class="lst__example-link" @click="loadExample">Load an example</button></p>
        <ParTextarea
          id="lst-text"
          v-model="text"
          class="lst__textarea"
          :rows="7"
          placeholder="374 Silver&#10;74 Gold&#10;3 black jasper worth 50 gp each&#10;Potion of Healing&#10;Flame Tongue"
          aria-label="Hoard to split"
        />

        <div v-if="hasAnything" class="lst__parsed">
          <template v-if="coinChips.length">
            <span class="lst__parsed-label">Coins</span>
            <span v-for="c in coinChips" :key="c.denom" class="lst__chip">{{ formatCount(c.n) }} {{ c.denom }}</span>
          </template>
          <template v-if="itemCount > 0">
            <span class="lst__parsed-label">Items</span>
            <span class="lst__chip lst__chip--item">{{ itemCount }} item{{ itemCount === 1 ? '' : 's' }}</span>
          </template>
        </div>
        <p v-else-if="text.trim()" class="lst__nowt">
          Nothing recognized yet — try a line like “120 gp” or “Potion of Healing”.
        </p>

        <div v-if="preview.unrecognized && preview.unrecognized.length" class="lst__skipped">
          <span class="lst__skipped-title">Couldn’t read these — edit the text above:</span>
          <span v-for="(l, i) in preview.unrecognized" :key="i" class="lst__skipped-line">{{ l }}</span>
        </div>

        <button
          v-if="hasAnything && !splitOpen"
          type="button"
          class="lst__split-btn"
          @click="splitOpen = true"
        >⚖ Split this loot between players</button>
      </section>

      <LootGeneratorLinks />

      <LootSplit
        v-if="hasAnything && splitOpen"
        :coins="coins"
        :items="items"
        :allow-claim="false"
      />
    </main>

    <footer class="lst__foot">
      <p>
        Part of <a class="lst__foot-link" href="#" @click.prevent="goBackpack">Kenji’s Visual Inventory Manager</a>,
        where you can also track carry weight per character. Item values use standard DMG
        rarity prices and are estimates. Built for tabletop RPGs.
      </p>
    </footer>
  </div>
</template>

<script setup>
/**
 * Standalone Loot Splitter — the backpack's loot-split feature as its own page.
 * Paste a hoard (coins + items), then split it between players. Reuses the exact
 * splitter component and parser from the Visual Backpack; it just supplies its own
 * paste input and drops the "claim into your pack" action (there's no pack here).
 *
 * Stateless and free: nothing persists, no accounts.
 */
import { ref, computed, watch } from 'vue';
import { ParTextarea } from '@/parchment';
import LootSplit from '@/tools/visual-backpack/components/LootSplit.vue';
import LootGeneratorLinks from '@/tools/visual-backpack/components/LootGeneratorLinks.vue';
import { parseTreasure } from '@/tools/visual-backpack/utils/parse-treasure.mjs';
import srdEquipment from '@/tools/visual-backpack/data/srd-equipment.json';
import { navigateToTool } from '@/util/navigation.mjs';

const DENOMS = ['pp', 'gp', 'ep', 'sp', 'cp'];

const text = ref('');
const splitOpen = ref(false);

const preview = computed(() =>
  text.value.trim() ? parseTreasure(text.value, srdEquipment) : { coins: {}, items: [], unrecognized: [] },
);
const coins = computed(() => preview.value.coins || {});
const items = computed(() => preview.value.items || []);

const coinChips = computed(() =>
  DENOMS.map((denom) => ({ denom, n: Number(coins.value[denom]) || 0 })).filter((c) => c.n > 0),
);
const itemCount = computed(() => items.value.reduce((s, it) => s + (Number(it.quantity) || 1), 0));
const hasAnything = computed(() => coinChips.value.length > 0 || items.value.length > 0);

// Emptying the field collapses the split so the empty-state guidance returns.
watch(hasAnything, (has) => { if (!has) splitOpen.value = false; });

function formatCount(n) {
  return (Number(n) || 0).toLocaleString('en-US');
}
function loadExample() {
  text.value = '374 Silver\n74 Gold\n3 black jasper worth 50 gp each\nPotion of Healing\nFlame Tongue';
  splitOpen.value = true;
}
function goBackpack() {
  navigateToTool('backpack');
}
</script>

<style scoped>
.lst {
  min-height: 100vh;
  padding: 0 0 4rem;
  background: var(--par-color-surface-page, #eaeef2);
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  color: var(--par-color-text, #222);
}

/* Hero */
.lst__hero {
  max-width: 72rem;
  margin: 0 auto;
  padding: 3.2rem 2rem 1.6rem;
  text-align: center;
}
.lst__title {
  margin: 0 0 0.6rem;
  font-size: 3.2rem;
  font-weight: 600;
  line-height: 1.1;
  color: var(--color-action-hover, #2a4d70);
}
.lst__subtitle {
  margin: 0 auto;
  max-width: 52rem;
  font-size: 1.5rem;
  font-style: italic;
  line-height: 1.5;
  color: var(--par-color-text-muted, #6b6b6b);
}

/* Page column */
.lst__page {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

/* Input card */
.lst__input {
  padding: 1.8rem;
  background: var(--par-color-surface-card, #fefbf4);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
}
.lst__label {
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-action-hover, #2a4d70);
}
.lst__intro {
  margin: 0.3rem 0 0.9rem;
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}
.lst__textarea {
  width: 100%;
  font-family: var(--par-font-mono, ui-monospace, 'SF Mono', Menlo, monospace);
}

.lst__parsed {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.1rem;
}
.lst__parsed-label {
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--par-color-text-muted, #6b6b6b);
}
.lst__parsed-label:not(:first-child) {
  margin-left: 0.8rem;
}
.lst__chip {
  padding: 0.15rem 0.7rem;
  border-radius: 999px;
  background: var(--par-color-callout-bg, #f3ebda);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
}
.lst__chip--item {
  color: var(--color-action-hover, #2a4d70);
}
.lst__nowt {
  margin: 1.1rem 0 0;
  font-size: 1.3rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}

.lst__skipped {
  margin-top: 1rem;
  padding: 0.7rem 1rem;
  border-radius: var(--par-radius-md, 4px);
  background: rgba(160, 51, 51, 0.06);
  border: 0.5px solid rgba(160, 51, 51, 0.25);
  font-size: 1.25rem;
}
.lst__skipped-title {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 600;
  color: var(--par-color-destructive, #a03333);
}
.lst__skipped-line {
  display: block;
  font-family: var(--par-font-mono, ui-monospace, 'SF Mono', Menlo, monospace);
  font-size: 1.15rem;
  color: var(--par-color-text-secondary, #555);
}

.lst__split-btn {
  margin-top: 1.4rem;
  width: 100%;
  min-height: 4.2rem;
  border: none;
  border-radius: var(--par-radius-md, 4px);
  background: var(--color-action-rest, #365a85);
  color: var(--color-action-text, #fbf7f0);
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
}
.lst__split-btn:hover {
  background: var(--color-action-hover, #2a4d70);
}
.lst__split-btn:focus-visible {
  outline: 2px solid var(--color-action-rest, #365a85);
  outline-offset: 2px;
}

/* "Load an example" — a quiet inline link in the intro, not a whole card. */
.lst__example-link {
  padding: 0;
  border: none;
  background: none;
  font-family: inherit;
  font-size: inherit;
  color: var(--color-action-hover, #2a4d70);
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
}
.lst__example-link:hover {
  color: var(--color-action-active, #1f3a5c);
}

/* Footer */
.lst__foot {
  max-width: 72rem;
  margin: 2.4rem auto 0;
  padding: 0 2rem;
  text-align: center;
}
.lst__foot p {
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--par-color-text-muted, #6b6b6b);
}
.lst__foot-link {
  color: var(--color-action-hover, #2a4d70);
  text-decoration: underline;
  text-underline-offset: 2px;
}

@media (max-width: 560px) {
  .lst__hero {
    padding: 2.2rem 1.2rem 1.2rem;
  }
  .lst__title {
    font-size: 2.6rem;
  }
  .lst__page,
  .lst__foot {
    padding: 0 1.2rem;
  }
}
</style>
