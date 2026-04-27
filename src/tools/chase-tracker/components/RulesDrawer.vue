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
            The tool gives you a map to run the chase on. Use or ignore
            these rules as you see fit.
          </p>

          <section>
            <h3 class="display-heading">Starting the Chase</h3>
            <p>
              When a chase kicks off, roll initiative for everyone involved.
              Decide who is fleeing and who is pursuing. The tool calls them
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
              or gain a level of exhaustion. This cost applies to anyone
              pushing themselves, quarry and pursuers alike.
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
              round: things that knock pursuers off the trail, drop obstacles,
              or change the terrain. Use zone pills to mark the result:
              Crowded, Obstacle, Closed, and so on.
            </p>
          </section>

          <OrnamentalDivider glyph="✦" />

          <section>
            <h3 class="display-heading">Editing Zones</h3>
            <p>
              On mobile, tap any zone card to open an editor for that zone.
              From there you can rename it, edit its description, adjust
              its size, manage conditions, add tokens, or delete it. On
              desktop the same actions live in the icon row at the bottom
              of each card.
            </p>
          </section>

          <OrnamentalDivider glyph="✦" />

          <section>
            <h3 class="display-heading">Tokens &amp; Dashes</h3>
            <p>
              Each token on the map represents a creature in the chase: a PC,
              pursuer, or quarry. The number on a token's badge shows how many
              Dashes that character has taken.
            </p>
            <p>
              Dashes increment automatically whenever a token moves between
              zones on the map. To correct a count (for example, if a
              character used Misty Step instead of Dashing), tap the
              <strong>−</strong> button in the Participants panel or the zone
              detail sheet.
            </p>
            <p>
              In 5e, a creature can Dash a number of times equal to
              <strong>3 + their Constitution modifier</strong> before risking
              exhaustion. Apply this limit yourself based on your characters'
              stats.
            </p>
          </section>

          <OrnamentalDivider glyph="✦" />

          <section>
            <h3 class="display-heading">Ending the Chase</h3>
            <p>
              A chase ends when one side catches the other, one side gives up,
              or the quarry breaks line of sight and successfully hides with a
              Stealth check opposed by the pursuers' passive Perception (or an
              active Perception check if they're actively searching).
            </p>
            <p>
              You can also call it when the fiction says so. A chase that spills
              into open combat, crosses a locked border, or reaches a narrative
              stopping point can end by GM call without rolling it out.
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
  width: min(570px, 100%);
  height: 100vh;
  max-width: 100%;
  background-color: var(--parchment-base);
  background-image:
    radial-gradient(ellipse at top left, rgba(164, 134, 86, 0.08), transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(164, 134, 86, 0.10), transparent 50%);
  border-left: 1px solid var(--parchment-edge);
  box-shadow: -8px 0 24px rgba(46, 33, 20, 0.25);
  padding: 2rem 2.3rem;
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
  font-size: 2rem;
}

.drawer-close {
  background: transparent;
  border: none;
  font-size: 2.15rem;
  line-height: 1;
  color: var(--ink-muted);
  cursor: pointer;
  padding: 0.15rem 0.55rem;
}

.drawer-close:hover {
  color: var(--ink-primary);
}

.drawer-preamble {
  font-size: 1.5rem;
  line-height: 1.55;
  margin: 0.65rem 0 1.65rem;
}

.drawer-body section {
  margin: 1.35rem 0;
}

.drawer-body h3 {
  font-size: 1.75rem;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
  color: var(--accent-red);
}

.drawer-body p {
  font-size: 1.55rem;
  line-height: 1.6;
  margin: 0 0 0.95rem;
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
    padding: 1.35rem 1.35rem 2.25rem;
  }

  .drawer-title { font-size: 1.75rem; }
  .drawer-close { font-size: 1.9rem; }
  .drawer-body p { font-size: 1.4rem; }
  .drawer-body h3 { font-size: 1.6rem; }
  .drawer-preamble { font-size: 1.35rem; }
}
</style>
