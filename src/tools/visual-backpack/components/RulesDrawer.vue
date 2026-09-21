<template>
  <aside
    class="rules-drawer parchment"
    role="dialog"
    aria-modal="false"
    aria-labelledby="rules-drawer-title"
    :data-open="open"
    :aria-hidden="!open"
    :inert="!open || null"
  >
    <div class="rules-drawer__header">
      <h2 id="rules-drawer-title" class="rules-drawer__title">Inventory rules</h2>
      <button
        ref="closeRef"
        class="rules-drawer__close"
        type="button"
        aria-label="Close rules reference"
        @click="$emit('close')"
      >×</button>
    </div>

    <div class="rules-drawer__body">
      <p class="rules-drawer__attribution">Paraphrased from the D&amp;D 5e SRD 5.1.</p>

      <section class="rules-section">
        <h3 class="rules-section__heading">Carrying capacity</h3>
        <p class="rules-section__text">
          Your maximum carrying capacity is your <strong>Strength score × 15</strong> pounds: a
          hard ceiling on what you can carry at all. By the core rules you're unhindered right up
          to it. The optional <em>encumbrance</em> rules below don't change that ceiling; they add
          graduated speed penalties at lower thresholds, so you slow down before you reach the cap.
          The carrying bar tracks your total either way.
        </p>
      </section>

      <section class="rules-section">
        <h3 class="rules-section__heading">Encumbrance (variant)</h3>
        <p class="rules-section__text">
          Carrying more than <strong>Strength × 5</strong> makes you <em>encumbered</em>: your
          speed drops by 10 feet. Past <strong>Strength × 10</strong> you're
          <em>heavily encumbered</em>: speed drops by 20 feet, and you have disadvantage on
          ability checks, attack rolls, and saving throws that use Strength, Dexterity, or
          Constitution.
        </p>
      </section>

      <section class="rules-section">
        <h3 class="rules-section__heading">Coin weight</h3>
        <p class="rules-section__text">
          Coins add up: <strong>50 coins weigh 1 pound</strong>, regardless of denomination.
          Toggle <em>Include coin weight</em> on the carrying bar to count your purse against
          your load.
        </p>
      </section>

      <section class="rules-section">
        <h3 class="rules-section__heading">Attunement</h3>
        <p class="rules-section__text">
          Some magic items only work once you <strong>attune</strong> to them (a short rest
          spent focused on the item). A creature can be attuned to <strong>no more than three
          items</strong> at once, and attunement ends if you stop carrying or wearing the item.
        </p>
      </section>

      <section class="rules-section">
        <h3 class="rules-section__heading">Wielding weapons</h3>
        <p class="rules-section__text">
          A weapon with the <strong>Two-Handed</strong> property needs both hands, so it fills
          your main and off hand. A <em>versatile</em> weapon works one- or two-handed. With a
          free hand you can wield a one-handed weapon in each hand to <strong>dual-wield</strong>.
        </p>
      </section>

      <section class="rules-section">
        <h3 class="rules-section__heading">Dropping your pack</h3>
        <p class="rules-section__text">
          Setting your pack down is a <strong>free object interaction</strong> on your turn,
          leaving you carrying only your worn and wielded gear, which can shed the
          <em>encumbered</em> condition right before a fight. The catch: if you have to retreat,
          you may have to <strong>leave the pack (and everything in it) behind</strong>.
        </p>
      </section>
    </div>
  </aside>
</template>

<script setup>
/**
 * Rules-reference drawer — slides in from the right over the tool (no backdrop,
 * so the inventory stays visible and usable while consulting rules). Content is
 * paraphrased SRD 5.1 inventory rules; edit freely as editorial copy evolves.
 *
 * Controlled via the `open` prop; emits `close` from the × button or Escape.
 * Focus moves to the close button on open; the parent returns focus to the
 * trigger on close.
 */
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  open: { type: Boolean, default: false },
});
const emit = defineEmits(['close']);

const closeRef = ref(null);

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) nextTick(() => closeRef.value?.focus());
  },
);

function onKeydown(e) {
  if (e.key === 'Escape' && props.open) {
    e.preventDefault();
    emit('close');
  }
}
onMounted(() => document.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown));
</script>

<style scoped>
.rules-drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  height: 100dvh;
  width: 44rem;
  max-width: 90vw;
  background: var(--par-color-surface-card, #fefbf4);
  border-left: 0.5px solid var(--par-color-border-strong, #c9b99a);
  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.08);
  transform: translateX(100%);
  transition: transform 0.25s ease-out;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
}
.rules-drawer[data-open='true'] {
  transform: translateX(0);
}
@media (prefers-reduced-motion: reduce) {
  .rules-drawer {
    transition: none;
  }
}

.rules-drawer__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 0.5px solid rgba(201, 185, 154, 0.5);
}
.rules-drawer__title {
  margin: 0;
  font-size: 2.2rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
}
.rules-drawer__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: var(--par-radius-md, 4px);
  color: var(--par-color-text-secondary, #555);
  font-size: 2.4rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.15s ease;
}
.rules-drawer__close:hover {
  background: rgba(201, 185, 154, 0.2);
}
.rules-drawer__close:focus-visible {
  outline: 2px solid var(--color-action-rest, #365a85);
  outline-offset: 2px;
}

.rules-drawer__body {
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 1.5rem 2rem;
}
.rules-drawer__attribution {
  margin: 0 0 1.5rem;
  font-size: 1.2rem;
  font-style: italic;
  color: var(--par-color-text-muted, #888);
}

.rules-section {
  margin-bottom: 1.75rem;
}
.rules-section__heading {
  margin: 0 0 0.6rem;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--par-color-title, #7a1f1f);
}
.rules-section__text {
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.6;
  color: var(--par-color-text, #2c2c2a);
}
.rules-section__text strong {
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
}
.rules-section__text em {
  font-style: italic;
}
</style>
