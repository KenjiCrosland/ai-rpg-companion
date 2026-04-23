<template>
  <transition name="rules-slide">
    <div v-if="open" class="rules-overlay" @click.self="$emit('close')">
      <aside class="rules-drawer" role="dialog" aria-label="Chase rules reference">
        <div class="drawer-header">
          <div class="display-heading drawer-title">Chase Rules</div>
          <button class="drawer-close" aria-label="Close rules" @click="$emit('close')">×</button>
        </div>
        <OrnamentalDivider />

        <div class="drawer-body">
          <p class="ink-italic drawer-preamble">
            Below is a paraphrased reference for the standard 5e chase rules.
            This tool doesn't enforce them — it gives you a map to run the chase
            on. Use or ignore as you see fit.
          </p>

          <section>
            <h3 class="display-heading">Starting the Chase</h3>
            <p>
              When a chase kicks off, roll initiative for everyone involved.
              Decide who is fleeing and who is pursuing — the tool calls them
              the Quarry and the Pursuers. You can also set a starting distance
              in zones: same zone for a hand-on-collar start, one or two zones
              apart for a head start, three or more for a cold trail.
            </p>
          </section>

          <OrnamentalDivider glyph="✦" />

          <section>
            <h3 class="display-heading">The Dash Action</h3>
            <p>
              Both sides can Dash each round, effectively doubling their pace.
              A character can keep Dashing a number of consecutive rounds equal
              to <strong>3 + their Constitution modifier</strong> without issue.
            </p>
            <p>
              Past that, each additional Dash forces a Constitution save, DC 10,
              or gain a level of exhaustion. Quarry and pursuers alike — this
              cost applies to anyone pushing themselves.
            </p>
          </section>

          <OrnamentalDivider glyph="✦" />

          <section>
            <h3 class="display-heading">Exhaustion</h3>
            <p>
              Each level of exhaustion makes the character progressively worse
              off: disadvantage on ability checks at level 1, halved speed at
              level 2, disadvantage on attacks and saves at level 3, and so on.
              A long rest removes a level. Running down a quarry often means
              wearing them down as much as catching them.
            </p>
          </section>

          <OrnamentalDivider glyph="✦" />

          <section>
            <h3 class="display-heading">Complications</h3>
            <p>
              The DMG suggests rolling on a table of chase complications each
              round — things that knock pursuers off the trail, drop obstacles,
              or change the terrain. This tool's <strong>What Changes?</strong>
              button serves the same purpose: a nudge to shift the scene when
              it starts to settle.
            </p>
          </section>

          <OrnamentalDivider glyph="✦" />

          <section>
            <h3 class="display-heading">Ending the Chase</h3>
            <p>
              A chase ends when one side catches the other, one side gives up,
              or the quarry breaks line of sight and successfully hides — a
              Stealth check opposed by the pursuers' passive Perception (or an
              active Perception check if they're actively searching).
            </p>
            <p>
              You can also call it when the fiction says so. A chase that spills
              into open combat, crosses a locked border, or reaches a narrative
              stopping point doesn't need to be resolved by the rules.
            </p>
          </section>
        </div>
      </aside>
    </div>
  </transition>
</template>

<script>
import OrnamentalDivider from './OrnamentalDivider.vue';

export default {
  name: 'RulesDrawer',
  components: { OrnamentalDivider },
  props: {
    open: { type: Boolean, default: false },
  },
  emits: ['close'],
};
</script>

<style scoped>
.rules-overlay {
  position: fixed;
  inset: 0;
  background: rgba(46, 33, 20, 0.25);
  z-index: 110;
  display: flex;
  justify-content: flex-end;
}

.rules-drawer {
  width: min(420px, 100%);
  height: 100vh;
  max-width: 100%;
  background-color: var(--parchment-base);
  background-image:
    radial-gradient(ellipse at top left, rgba(164, 134, 86, 0.08), transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(164, 134, 86, 0.10), transparent 50%);
  border-left: 1px solid var(--parchment-edge);
  box-shadow: -8px 0 24px rgba(46, 33, 20, 0.25);
  padding: 1.5rem 1.75rem;
  overflow-y: auto;
  color: var(--ink-primary);
  font-family: var(--font-body);
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer-title {
  font-size: 1.5rem;
}

.drawer-close {
  background: transparent;
  border: none;
  font-size: 1.6rem;
  line-height: 1;
  color: var(--ink-muted);
  cursor: pointer;
  padding: 0.1rem 0.4rem;
}

.drawer-close:hover {
  color: var(--ink-primary);
}

.drawer-preamble {
  font-size: 0.95rem;
  margin: 0.25rem 0 1rem;
}

.drawer-body section {
  margin: 0.75rem 0;
}

.drawer-body h3 {
  font-size: 1.1rem;
  letter-spacing: 0.05em;
  margin-bottom: 0.4rem;
  color: var(--accent-red);
}

.drawer-body p {
  font-size: 1.05rem;
  line-height: 1.55;
  margin: 0 0 0.6rem;
}

.drawer-body strong {
  font-weight: 600;
  color: var(--ink-primary);
}

.rules-slide-enter-active,
.rules-slide-leave-active {
  transition: opacity 160ms ease;
}
.rules-slide-enter-active .rules-drawer,
.rules-slide-leave-active .rules-drawer {
  transition: transform 220ms ease;
}
.rules-slide-enter-from,
.rules-slide-leave-to {
  opacity: 0;
}
.rules-slide-enter-from .rules-drawer,
.rules-slide-leave-to .rules-drawer {
  transform: translateX(100%);
}

@media (max-width: 640px) {
  .rules-drawer {
    width: 100%;
    padding: 1rem 1rem 2rem;
  }

  .drawer-title { font-size: 1.15rem; }

  .drawer-body p { font-size: 0.9rem; }
}
</style>
