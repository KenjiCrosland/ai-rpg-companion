<template>
  <cdr-skeleton>
    <div class="item-skeleton-card">
      <!-- Header (title + subtitle on the left, Edit Item button top-right) -->
      <div class="item-skeleton-header">
        <div class="item-skeleton-header-text">
          <cdr-skeleton-bone type="line" style="width: 55%; height: 3rem; margin-bottom: 0.5rem" />
          <cdr-skeleton-bone type="line" style="width: 28%; height: 1.4rem" />
        </div>
        <cdr-skeleton-bone type="line" style="width: 7rem; height: 2rem" />
      </div>

      <!-- Description (italic body text, no box) -->
      <div class="item-skeleton-description">
        <cdr-skeleton-bone type="line" style="width: 95%; height: 1.5rem; margin-bottom: 0.4rem" />
        <cdr-skeleton-bone type="line" style="width: 88%; height: 1.5rem; margin-bottom: 0.4rem" />
        <cdr-skeleton-bone type="line" style="width: 70%; height: 1.5rem" />
      </div>

      <!-- Mechanics (highest contrast) -->
      <div class="item-skeleton-mechanics">
        <cdr-skeleton-bone type="line" style="width: 32%; height: 1.7rem; margin-bottom: 0.4rem" />
        <cdr-skeleton-bone type="line" style="width: 96%; height: 1.4rem; margin-bottom: 0.3rem" />
        <cdr-skeleton-bone type="line" style="width: 80%; height: 1.4rem; margin-bottom: 1rem" />

        <cdr-skeleton-bone type="line" style="width: 28%; height: 1.7rem; margin-bottom: 0.4rem" />
        <cdr-skeleton-bone type="line" style="width: 92%; height: 1.4rem; margin-bottom: 0.3rem" />
        <cdr-skeleton-bone type="line" style="width: 78%; height: 1.4rem" />
      </div>

      <!-- Lore: just body lines below the divider (no label) -->
      <div class="item-skeleton-lore">
        <cdr-skeleton-bone type="line" style="width: 96%; height: 1.4rem; margin-bottom: 0.3rem" />
        <cdr-skeleton-bone type="line" style="width: 86%; height: 1.4rem; margin-bottom: 0.3rem" />
        <cdr-skeleton-bone type="line" style="width: 70%; height: 1.4rem" />
      </div>

      <!-- Footer: Export (left) + Delete (right). Edit lives in the header. -->
      <div class="item-skeleton-footer">
        <cdr-skeleton-bone type="line" style="width: 5rem; height: 2rem" />
        <cdr-skeleton-bone type="line" style="width: 6rem; height: 2rem; margin-left: auto" />
      </div>
    </div>
  </cdr-skeleton>
</template>

<script setup>
import { CdrSkeleton, CdrSkeletonBone } from "@rei/cedar";
</script>

<style scoped lang="scss">
.item-skeleton-card {
  background: #fdfbf6;
  border: 1px solid #e8e2d4;
  border-top: 2px solid #7a1f1f;
  border-radius: 2px;
  margin-bottom: 1.5rem;
  padding: 2rem 2.5rem;
}

.item-skeleton-header {
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.item-skeleton-header-text {
  flex: 1;
  min-width: 0;
}

.item-skeleton-description {
  margin-bottom: 1.25rem;
}

.item-skeleton-mechanics {
  margin-bottom: 1.25rem;
}

.item-skeleton-lore {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e2dccd;
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
