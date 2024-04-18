<template>
  <div class="main-content">
    <h1>The Town of Silvervale</h1>
    <div class="read-aloud">
      The Town of Silvervale stands at the edge of the Forgotten Kingdom, its cobbled streets winding between towering
      stone structures adorned with intricate clockwork mechanisms that chime melodically throughout the day. A thick
      mist of shimmering blue energy envelops the town, crackling with static electricity and casting a soft,
      otherworldly glow over its inhabitants and visitors alike. Crowds of townsfolk and travelers pass through the
      shimmering gates marked with runes of protection, each visitor experiencing a tingling sensation as they cross the
      threshold into Silvervale's unique border town. At the center of the town square, a massive sculpture crafted
      entirely of enchanted glass orbs spins gracefully, catching and refracting the ever-present energy field in a
      mesmerizing display that captivates onlookers and invokes a sense of wonder and curiosity. As the players explore,
      they come across a trio of musicians performing a haunting melody on instruments made of shimmering crystal, their
      music harmonizing with the crackling energy of the town and drawing a small crowd of mesmerized listeners.
    </div>

    <cdr-button @click="increment">Click Me</cdr-button>
    <p>Count: {{ count }}</p>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CdrInput, CdrButton, CdrText, CdrSelect, CdrCheckbox, CdrLink, CdrList, CdrSkeleton, CdrSkeletonBone, IconXSm, CdrTooltip } from "@rei/cedar";

const message = ref('Hello, Vue 3 + Composition API!')
const count = ref(0)

function increment() {
  count.value++
}
</script>

<style scoped lang="scss">
@import '@rei/cdr-tokens/dist/scss/cdr-tokens.scss';
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  max-width: 800px;
  height: 100vh;
}

.read-aloud {
  background-color: $cdr-color-background-secondary;
  color: $cdr-color-text-secondary;
  padding: 1rem 2rem;
  font-style: italic;
}
</style>
