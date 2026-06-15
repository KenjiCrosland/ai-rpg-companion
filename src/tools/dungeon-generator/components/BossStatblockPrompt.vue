<template>
  <ParModal
    :opened="opened"
    title="Generate boss statblock first?"
    @cancel="onCancel"
  >
    <p class="boss-prompt__lede">
      Boss rooms generate stronger descriptions when the boss's statblock
      is available as context — the tactics paragraph leans on the actual
      abilities to describe how the encounter plays.
    </p>

    <div class="boss-prompt__callout">
      <p class="boss-prompt__callout-text">
        <strong>{{ apexName || 'The apex monster' }}</strong>
        doesn't have a statblock yet.
      </p>
    </div>

    <p class="boss-prompt__detail">
      Generating it first takes an extra moment but gives the room
      description access to the boss's abilities, recharge timing, and
      weak saves — the room then writes how the boss <em>uses</em> those
      abilities rather than inventing new ones.
    </p>

    <ParCheckbox
      v-model="dontAskAgain"
      label="Don't ask again for this dungeon"
      class="boss-prompt__toggle"
    />

    <template #footer>
      <ParActionButton variant="secondary" @click="onSkip">
        Skip and generate without
      </ParActionButton>
      <ParActionButton variant="primary" @click="onGenerate">
        Generate statblock first
      </ParActionButton>
    </template>
  </ParModal>
</template>

<script setup>
import { ref, watch } from 'vue';
import { ParActionButton, ParCheckbox, ParModal } from '@/parchment';

const props = defineProps({
  opened: { type: Boolean, default: false },
  apexName: { type: String, default: '' },
});

const emit = defineEmits(['generate', 'skip', 'cancel']);

const dontAskAgain = ref(false);

// Reset the toggle each time the modal opens so a prior session's
// state doesn't carry over.
watch(() => props.opened, (isOpen) => {
  if (isOpen) dontAskAgain.value = false;
});

function onGenerate() {
  emit('generate', { dontAskAgain: dontAskAgain.value });
}

function onSkip() {
  emit('skip', { dontAskAgain: dontAskAgain.value });
}

function onCancel() {
  emit('cancel');
}
</script>

<style scoped>
.boss-prompt__lede {
  font-size: 1.5rem;
  line-height: 1.55;
  margin: 0 0 1rem;
  color: var(--par-color-readaloud-text, #1a1a1a);
}

/* Inner fact callout — uses the DEEPER lapis surface so it stays
   distinguishable from ParModal's pale lapis bg. Rule lines a touch
   thicker to reinforce the "this is the important fact" register. */
.boss-prompt__callout {
  background-color: var(--par-color-readaloud-bg-deep, #C5D4E5);
  border-left: 3px solid var(--color-action-hover);
  border-right: 3px solid var(--color-action-hover);
  padding: 1rem 1.25rem;
  margin: 0 0 1rem;
}

.boss-prompt__callout-text {
  font-size: 1.5rem;
  line-height: 1.5;
  margin: 0;
  color: var(--par-color-readaloud-text, #1a1a1a);
}

.boss-prompt__callout-text strong {
  font-weight: 700;
  color: var(--color-action-hover);
}

.boss-prompt__detail {
  font-size: 1.4rem;
  line-height: 1.5;
  margin: 0 0 1.25rem;
  color: var(--par-color-readaloud-text, #1a1a1a);
  opacity: 0.85;
}

.boss-prompt__toggle {
  margin: 0 0 1rem;
}
</style>
