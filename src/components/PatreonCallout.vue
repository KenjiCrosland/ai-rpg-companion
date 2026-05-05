<template>
  <div class="patreon-callout parchment">
    <div class="patreon-callout__label">Premium</div>
    <p class="patreon-callout__body">
      Your work is saved to this browser only. Premium syncs your campaign
      across devices and unlocks unlimited Lore Builder and Quest Hook
      generation.
    </p>
    <p class="patreon-callout__aside">
      cros.land is built and maintained by one developer. Premium support
      keeps the tools improving and the LLM costs covered.
    </p>

    <!-- Inline expandable. Sits in the body content flow above the actions
         row so it reads as part of the message rather than competing with
         the CTA. Candidate for extraction to a ParExpandable primitive if
         a second use case appears (FAQ block, advanced settings, etc.).
         Don't extract preemptively — let the duplication justify the
         abstraction. -->
    <div
      :class="[
        'patreon-callout__expandable',
        { 'patreon-callout__expandable--open': isExpanded },
      ]"
    >
      <button
        type="button"
        class="patreon-callout__expand-trigger"
        :aria-expanded="isExpanded.toString()"
        :aria-controls="expandableId"
        @click="toggleExpandable"
      >
        What's included
        <svg class="patreon-callout__caret" viewBox="0 0 10 10" aria-hidden="true">
          <path
            d="M2 4L5 7L8 4"
            stroke="currentColor"
            stroke-width="1.5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <!-- v-show keeps the DOM stable for screen reader navigation;
           aria-controls/aria-expanded handle the announce-state behavior. -->
      <div
        v-show="isExpanded"
        :id="expandableId"
        class="patreon-callout__expand-content"
      >
        <ul class="patreon-callout__list">
          <slot name="features">
            <!-- Default fallback. Tools that want their own bullet content
                 (e.g. NPC-specific premium benefits) override this slot;
                 the default keeps the existing item-generator-flavored copy
                 for any callout that doesn't pass slot content yet. The
                 final bullet links to the Patreon membership page so users
                 see the full tier breakdown there rather than a vague
                 "future features" line. -->
            <li>Cross-device save and load — your campaigns sync between browsers and devices.</li>
            <li>Unlimited Lore Builder generations — no daily cap.</li>
            <li>Unlimited Quest Hook generations — no daily cap.</li>
            <li>
              <a
                href="https://www.patreon.com/c/ai_rpg_tookit/membership"
                target="_blank"
                rel="noopener"
              >See all premium tiers and benefits on Patreon</a><span aria-hidden="true"> →</span>
            </li>
          </slot>
        </ul>
      </div>
    </div>

    <div class="patreon-callout__actions">
      <ParActionButton
        variant="luminous"
        tag="a"
        :href="patreonUrl"
      >
        <template #icon-left>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <circle cx="9" cy="7" r="4" fill="currentColor" />
            <rect x="2" y="3" width="2" height="8" fill="currentColor" />
          </svg>
        </template>
        Support on Patreon
      </ParActionButton>
    </div>
  </div>
</template>

<script setup>
/**
 * PatreonCallout — premium upsell.
 *
 * Feature component, not a parchment primitive: knows it's about Patreon,
 * has Patreon-specific copy, owns its own surface treatment. If a second
 * "tinted callout" surface emerges (TipCallout, BetaNotice, etc.), the
 * surface pattern can be extracted into a ParCallout primitive then.
 *
 * The expandable behaviour is also inline. If a second use case appears
 * (FAQ, advanced settings, lore expansions), extract into a ParExpandable
 * primitive — the inline implementation here mirrors that planned shape
 * (button trigger with aria-expanded/controls, v-show content) so the
 * extraction is mechanical when earned.
 *
 * Props:
 *   patreonUrl — required. The Patreon link the existing implementation
 *                used. Pass through whatever variable or constant the
 *                calling generator resolves to.
 */

import { ref } from 'vue';
import { ParActionButton } from '@/parchment';

defineProps({
  patreonUrl: {
    type: String,
    required: true,
  },
});

const isExpanded = ref(false);

// Project ID pattern (Vue 3.3 — no useId available until 3.5). Mirrors
// the npc_id / dng_id generators used elsewhere.
const expandableId = `patreon-expandable-${Math.random().toString(36).substr(2, 9)}`;

function toggleExpandable() {
  isExpanded.value = !isExpanded.value;
}
</script>

<style scoped>
.patreon-callout {
  background-color: var(--par-color-callout-bg, #f3ebda);
  border: 0.5px solid var(--par-color-border-strong, #c9b99a);
  border-radius: var(--par-radius-lg, 12px);
  padding: 1.75rem 2rem;
  margin: 1rem 0;
  /* Defensive: some legacy parent wrappers in this codebase apply
     text-align: center as part of their SaaS-styled chrome. The callout
     is always left-aligned regardless of context. */
  text-align: left;
}

.patreon-callout__label {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 11px;
  font-weight: 500;
  color: var(--par-color-title, #7a1f1f);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.6rem;
}

.patreon-callout__body {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 16px;
  color: var(--par-color-text, #222);
  line-height: 1.6;
  margin: 0 0 1rem;
  font-weight: 400;
}

.patreon-callout__aside {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 14px;
  color: var(--par-color-text-secondary, #555);
  line-height: 1.6;
  margin: 0 0 1.25rem;
  font-style: italic;
}

.patreon-callout__actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
}

/* Inline expandable. Sits between the aside copy and the actions row so
   it reads as part of the body content flow. The thin top border + small
   gap establish the disclosure as its own section without needing a label
   or chrome around it. Mirrors the planned ParExpandable primitive shape
   so extraction later is straightforward. */
.patreon-callout__expandable {
  border-top: 0.5px solid var(--par-color-border, #DDD0B7);
  padding-top: 1rem;
  margin-bottom: 1.25rem;
}

.patreon-callout__expand-trigger {
  background: transparent;
  border: none;
  padding: 0;
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 14px;
  font-weight: 500;
  color: var(--par-color-text-secondary, #555);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 0.15s ease;
}

.patreon-callout__expand-trigger:hover {
  color: var(--par-color-text, #222);
}

.patreon-callout__expand-trigger:focus {
  outline: none;
}

.patreon-callout__expand-trigger:focus-visible {
  outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
  outline-offset: 2px;
  border-radius: 2px;
}

.patreon-callout__caret {
  width: 10px;
  height: 10px;
  transition: transform 0.2s ease;
}

.patreon-callout__expandable--open .patreon-callout__caret {
  transform: rotate(180deg);
}

.patreon-callout__expand-content {
  margin-top: 0.75rem;
  width: 100%;
}

.patreon-callout__list {
  list-style: disc;
  padding-left: 1.25rem;
  margin: 0;
}

.patreon-callout__list li {
  font-family: var(--par-font-serif, 'Source Serif 4', Georgia, serif);
  font-size: 14px;
  color: var(--par-color-text, #222);
  line-height: 1.6;
  margin-bottom: 0.4rem;
}

.patreon-callout__list li:last-child {
  margin-bottom: 0;
}

.patreon-callout__list li::marker {
  color: var(--par-color-title, #7a1f1f);
}

/* Inline link inside the bullet list (e.g. "See all premium tiers").
   Faded slate at rest signals "interactive but supporting" — it sits at
   secondary-action volume so it doesn't compete with the Support on
   Patreon CTA. Deepens to primary lapis on hover.

   Each rule is duplicated for `a` and `:slotted(a)`. Reason: when a
   parent fills the #features slot, the slot's `<a>` carries the
   PARENT's [data-v-*] scope, not PatreonCallout's. Vue's scoped CSS
   compiler stamps PatreonCallout's data-v on the bare `a` selector,
   which then fails to match parent-owned slot content. `:slotted(a)`
   is the documented escape hatch for styling slot content from the
   defining component. The bare `a` selector still covers PatreonCallout's
   own default-fallback bullets when no slot is provided. */
.patreon-callout__list a,
.patreon-callout__list :slotted(a) {
  color: var(--color-action-secondary-rest, #5A7A9A);
  text-decoration: none;
  border-bottom: 0.5px solid var(--color-action-secondary-rest, #5A7A9A);
  transition: color 0.15s ease, border-color 0.15s ease;
}

.patreon-callout__list a:hover,
.patreon-callout__list :slotted(a:hover) {
  color: var(--color-action-rest, #365A85);
  border-color: var(--color-action-rest, #365A85);
}

.patreon-callout__list a:focus,
.patreon-callout__list :slotted(a:focus) {
  outline: none;
}

.patreon-callout__list a:focus-visible,
.patreon-callout__list :slotted(a:focus-visible) {
  outline: 2px solid var(--color-action-secondary-rest, #5A7A9A);
  outline-offset: 2px;
  border-radius: 2px;
}
</style>
