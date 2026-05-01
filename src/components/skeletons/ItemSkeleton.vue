<template>
  <cdr-skeleton>
    <div class="item-skeleton-card">
      <!-- Header: title + subtitle. The Edit Item button on the live card
           lives in the top-right of the header but isn't represented in
           the skeleton — buttons read as decisive controls and don't need
           a placeholder; the user reads "page is loading" from the title
           bones alone. -->
      <div class="item-skeleton-header">
        <cdr-skeleton-bone type="line" style="width: 72%; height: 3.4rem; margin-bottom: 0.4rem" />
        <cdr-skeleton-bone type="line" style="width: 52%; height: 1.6rem" />
      </div>

      <!-- Description: italic body, 4 lines. 1.9rem bones approximate the
           1.75rem font + 1.65 line-height of `.item-card-description`. -->
      <div class="item-skeleton-description">
        <cdr-skeleton-bone type="line" style="width: 98%; height: 1.9rem; margin-bottom: 0.55rem" />
        <cdr-skeleton-bone type="line" style="width: 96%; height: 1.9rem; margin-bottom: 0.55rem" />
        <cdr-skeleton-bone type="line" style="width: 92%; height: 1.9rem; margin-bottom: 0.55rem" />
        <cdr-skeleton-bone type="line" style="width: 64%; height: 1.9rem" />
      </div>

      <!-- Modifier sentence ("+1 bonus to attack and damage rolls…"). Single
           line, sits between description and features with the same
           `margin: 2.5rem 0 2rem` that `.item-card-modifier` uses on the
           live card. Bone height tracks the 1.55rem mechanical body. -->
      <div class="item-skeleton-modifier">
        <cdr-skeleton-bone type="line" style="width: 78%; height: 1.6rem" />
      </div>

      <!-- Mechanics: three features, each a heading + 4 body lines.
           Reference text is the densest zone on the card — heading 1.6rem,
           body 1.55rem at 1.5 line-height — so the bone heights stay
           tighter than description/lore and inter-line gaps shrink to
           0.35rem. The 1.2rem gap between features mirrors
           `.item-feature { margin-bottom: 1.2rem }`. -->
      <div class="item-skeleton-mechanics">
        <div class="item-skeleton-feature">
          <cdr-skeleton-bone type="line" style="width: 30%; height: 1.7rem; margin-bottom: 0.4rem" />
          <cdr-skeleton-bone type="line" style="width: 98%; height: 1.6rem; margin-bottom: 0.35rem" />
          <cdr-skeleton-bone type="line" style="width: 96%; height: 1.6rem; margin-bottom: 0.35rem" />
          <cdr-skeleton-bone type="line" style="width: 92%; height: 1.6rem; margin-bottom: 0.35rem" />
          <cdr-skeleton-bone type="line" style="width: 60%; height: 1.6rem" />
        </div>
        <div class="item-skeleton-feature">
          <cdr-skeleton-bone type="line" style="width: 36%; height: 1.7rem; margin-bottom: 0.4rem" />
          <cdr-skeleton-bone type="line" style="width: 97%; height: 1.6rem; margin-bottom: 0.35rem" />
          <cdr-skeleton-bone type="line" style="width: 94%; height: 1.6rem; margin-bottom: 0.35rem" />
          <cdr-skeleton-bone type="line" style="width: 90%; height: 1.6rem; margin-bottom: 0.35rem" />
          <cdr-skeleton-bone type="line" style="width: 54%; height: 1.6rem" />
        </div>
        <div class="item-skeleton-feature">
          <cdr-skeleton-bone type="line" style="width: 28%; height: 1.7rem; margin-bottom: 0.4rem" />
          <cdr-skeleton-bone type="line" style="width: 98%; height: 1.6rem; margin-bottom: 0.35rem" />
          <cdr-skeleton-bone type="line" style="width: 95%; height: 1.6rem; margin-bottom: 0.35rem" />
          <cdr-skeleton-bone type="line" style="width: 88%; height: 1.6rem; margin-bottom: 0.35rem" />
          <cdr-skeleton-bone type="line" style="width: 66%; height: 1.6rem" />
        </div>
      </div>

      <!-- Lore: divider above, 7 lines of looser body text. 1.75rem bones
           approximate the 1.65rem font + 1.7 line-height of the lore body. -->
      <div class="item-skeleton-lore">
        <cdr-skeleton-bone type="line" style="width: 97%; height: 1.75rem; margin-bottom: 0.5rem" />
        <cdr-skeleton-bone type="line" style="width: 95%; height: 1.75rem; margin-bottom: 0.5rem" />
        <cdr-skeleton-bone type="line" style="width: 91%; height: 1.75rem; margin-bottom: 0.5rem" />
        <cdr-skeleton-bone type="line" style="width: 94%; height: 1.75rem; margin-bottom: 0.5rem" />
        <cdr-skeleton-bone type="line" style="width: 88%; height: 1.75rem; margin-bottom: 0.5rem" />
        <cdr-skeleton-bone type="line" style="width: 92%; height: 1.75rem; margin-bottom: 0.5rem" />
        <cdr-skeleton-bone type="line" style="width: 68%; height: 1.75rem" />
      </div>

      <!-- Footer: Export (left) + Delete (right). Bones match the default
           ParButton dimensions used on the live card. -->
      <div class="item-skeleton-footer">
        <cdr-skeleton-bone type="line" style="width: 7rem; height: 3rem; flex-shrink: 0" />
        <cdr-skeleton-bone type="line" style="width: 8rem; height: 3rem; margin-left: auto; flex-shrink: 0" />
      </div>
    </div>
  </cdr-skeleton>
</template>

<script setup>
import { CdrSkeleton, CdrSkeletonBone } from "@rei/cedar";
</script>

<style scoped lang="scss">
/* Mirror the live `.item-card` surface so the skeleton occupies the
   same footprint and the swap-in feels seamless. */
.item-skeleton-card {
  background: #fdfbf6;
  border: 1px solid #e8e2d4;
  border-top: 2px solid #7a1f1f;
  border-radius: 2px;
  margin-bottom: 1.5rem;
  padding: 2rem 2.5rem;
}

/* Description top margin matches `.item-card-description { margin: 1.75rem 0 1.25rem }`. */
.item-skeleton-description {
  margin: 1.75rem 0 1.25rem;
  max-width: 65ch;
}

/* Modifier sentence margins mirror `.item-card-modifier` on the live card.
   The 2.5rem top owns the description→modifier gap (collapses with the
   description's 1.25rem bottom margin to 2.5rem effective); the 2rem
   bottom owns the modifier→features gap. */
.item-skeleton-modifier {
  margin: 2.5rem 0 2rem;
  max-width: 65ch;
}

.item-skeleton-mechanics {
  max-width: 65ch;
}

/* Inter-feature gap matches `.item-feature { margin-bottom: 1.2rem }` on
   the live card. Last feature drops the gap so the lore divider's
   margin-top owns the zone change. */
.item-skeleton-feature {
  margin-bottom: 1.2rem;
}

.item-skeleton-feature:last-child {
  margin-bottom: 0;
}

/* Lore zone-change: generous gap + light divider. Matches
   `.item-card-lore { margin-top: 2.5rem; padding-top: 1rem; border-top }`. */
.item-skeleton-lore {
  margin-top: 2.5rem;
  padding-top: 1rem;
  border-top: 1px solid #ece6d4;
  max-width: 65ch;
}

.item-skeleton-footer {
  margin-top: 1.75rem;
  padding-top: 1rem;
  border-top: 1px solid #e2dccd;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

@media (max-width: 600px) {
  .item-skeleton-card {
    padding: 1.5rem;
  }
}
</style>
