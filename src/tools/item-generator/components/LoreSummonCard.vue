<template>
  <div class="summon-card">
    <h3 class="summon-card__heading">{{ heading }}</h3>

    <!-- Generating: skeleton placeholder -->
    <div v-if="loading && !pendingEvent" class="lore-skeleton">
      <span v-for="n in 3" :key="n" class="lore-skeleton__line"></span>
    </div>

    <!-- Form: choose type / period / context, then Generate -->
    <template v-else-if="!pendingEvent">
      <div class="summon-card__fields">
        <ParField label="Event type" required>
          <ParSelect
            :model-value="eventType"
            :options="eventTypeOptions"
            placeholder="Choose type"
            @update:model-value="$emit('update:eventType', $event)"
          />
        </ParField>
        <ParField label="Time period" required>
          <ParSelect
            :model-value="timePeriod"
            :options="periodOptions"
            placeholder="Choose when"
            @update:model-value="$emit('update:timePeriod', $event)"
          />
        </ParField>
      </div>
      <ParField label="Context" optional>
        <ParTextarea
          :model-value="additionalContext"
          :rows="2"
          placeholder="Anything to weave in (optional)"
          @update:model-value="$emit('update:additionalContext', $event)"
        />
      </ParField>
      <div class="summon-card__actions">
        <ParButton variant="primary" :disabled="!eventType || !timePeriod || loading"
          @click="$emit('generate')">
          {{ loading ? 'Summoning…' : 'Generate' }}
        </ParButton>
        <ParButton v-if="canCancel" variant="secondary" @click="$emit('cancel')">
          Cancel
        </ParButton>
      </div>
    </template>

    <!-- Preview: a generated-but-uncommitted event -->
    <div v-else class="summon-preview">
      <h4 class="summon-preview__title">{{ pendingEvent.title }}</h4>
      <p class="summon-preview__year">{{ pendingEvent.eventYear }}</p>
      <p class="summon-preview__text" v-html="formatMarkdown(pendingEvent.description)"></p>
      <div class="summon-card__actions">
        <ParCardButton variant="primary" @click="$emit('keep')">Keep</ParCardButton>
        <ParCardButton variant="affirmative" @click="$emit('regenerate')">Regenerate</ParCardButton>
        <ParCardButton variant="muted" @click="$emit('cancel')">Cancel</ParCardButton>
      </div>
    </div>

    <p v-if="!premium && !pendingEvent" class="summon-card__quota">
      {{ remaining }} lore generation{{ remaining !== 1 ? 's' : '' }} remaining today
    </p>
  </div>
</template>

<script setup>
/**
 * LoreSummonCard — the single, position-aware "summon an event" card for the
 * Lore Builder spine. One component for every slot the card can occupy
 * (first event, mid-spine insert, end of timeline); the parent drives which
 * chronological position it represents via the bound model values and the
 * generate/keep handlers. Local to the item generator — the spine isn't
 * promoted to shared parchment until a second tool wants one.
 *
 * Form values are bound (v-model) so the parent owns the canonical state the
 * generation logic reads. Actions emit; the parent decides what they mean at
 * the current position.
 */
import { ParButton, ParCardButton, ParField, ParSelect, ParTextarea } from '@/parchment';
import { formatMarkdown } from '../utils/format-markdown.mjs';

defineProps({
  heading: { type: String, required: true },
  eventType: { type: String, default: '' },
  timePeriod: { type: String, default: '' },
  additionalContext: { type: String, default: '' },
  eventTypeOptions: { type: Array, default: () => [] },
  periodOptions: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  pendingEvent: { type: Object, default: null },
  premium: { type: Boolean, default: false },
  remaining: { type: Number, default: 0 },
  // Show the form-view Cancel button — true for a mid-spine insert that can
  // collapse back to rest, false for the resting first/end summon.
  canCancel: { type: Boolean, default: false },
});

defineEmits([
  'generate',
  'keep',
  'regenerate',
  'cancel',
  'update:eventType',
  'update:timePeriod',
  'update:additionalContext',
]);
</script>

<style scoped>
.summon-card {
  padding: 1.6rem 1.8rem;
  background: var(--par-color-callout-bg-light, #F8F2E3);
  border: 1px solid var(--par-color-border, #e8e2d4);
  border-radius: var(--par-radius-md, 4px);
}

.summon-card__heading {
  margin: 0 0 1.2rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.3rem;
  font-weight: 600;
  font-variant-caps: small-caps;
  letter-spacing: 0.08em;
  color: var(--par-color-title, #7a1f1f);
}

.summon-card__fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
}

@media (max-width: 560px) {
  .summon-card__fields { grid-template-columns: 1fr; }
}

.summon-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 0.4rem;
}

.summon-card__quota {
  margin: 1rem 0 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.25rem;
  font-style: italic;
  color: var(--par-color-text-muted, #6b6b6b);
}

/* Pending-event preview inside the summon card. */
.summon-preview__title {
  margin: 0 0 0.2rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--par-color-title, #7a1f1f);
}

.summon-preview__year {
  margin: 0 0 0.8rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.35rem;
  font-variant-caps: small-caps;
  letter-spacing: 0.04em;
  color: var(--par-color-text-secondary, #555);
}

.summon-preview__text {
  margin: 0 0 1.2rem;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 1.55rem;
  line-height: 1.65;
  color: var(--par-color-text, #222);
}

.summon-preview__text :deep(strong) { font-weight: 600; }

/* Skeleton (generating state). */
.lore-skeleton {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0.4rem 0;
}

.lore-skeleton__line {
  height: 1.2rem;
  border-radius: var(--par-radius-sm, 3px);
  background: linear-gradient(
    90deg,
    var(--par-color-callout-bg, #f3ebda) 25%,
    var(--par-color-callout-bg-deep, #ede2cb) 50%,
    var(--par-color-callout-bg, #f3ebda) 75%
  );
  background-size: 200% 100%;
  animation: lore-shimmer 1.4s ease-in-out infinite;
}

.lore-skeleton__line:nth-child(1) { width: 100%; }
.lore-skeleton__line:nth-child(2) { width: 92%; }
.lore-skeleton__line:nth-child(3) { width: 84%; }

@keyframes lore-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
