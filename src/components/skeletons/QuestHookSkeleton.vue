<!-- QuestHookSkeleton.vue -->
<template>
  <div class="quest-content">
    <cdr-skeleton>
      <!-- Title -->
      <h3>
        <cdr-skeleton-bone type="line" class="title-bone" />
      </h3>

      <!-- Quest Giver -->
      <p class="quest-giver">
        <cdr-skeleton-bone type="line" class="label-bone" />
        <cdr-skeleton-bone type="line" class="line-70" />
      </p>

      <!-- Body paragraph -->
      <div class="paragraph">
        <cdr-skeleton-bone type="line" class="line-95" />
        <cdr-skeleton-bone type="line" class="line-85" />
        <cdr-skeleton-bone type="line" class="line-90" />
        <cdr-skeleton-bone type="line" class="line-75" />
        <cdr-skeleton-bone type="line" class="line-95" />
        <cdr-skeleton-bone type="line" class="line-85" />
        <cdr-skeleton-bone type="line" class="line-90" />
        <cdr-skeleton-bone type="line" class="line-75" />
      </div>

      <!-- Objectives -->
      <section>
        <h4><cdr-skeleton-bone type="line" class="subhead-bone" /></h4>
        <ul class="list">
          <li v-for="i in 3" :key="'obj-' + i">
            <cdr-skeleton-bone type="line" class="list-bone" />
          </li>
        </ul>
      </section>

      <!-- Challenges -->
      <section>
        <h4><cdr-skeleton-bone type="line" class="subhead-bone" /></h4>
        <ul class="list">
          <li v-for="i in 3" :key="'chal-' + i">
            <cdr-skeleton-bone type="line" class="list-bone" />
          </li>
        </ul>
      </section>

      <!-- Rewards -->
      <section>
        <h4><cdr-skeleton-bone type="line" class="subhead-bone" /></h4>
        <div class="paragraph">
          <cdr-skeleton-bone type="line" class="line-90" />
          <cdr-skeleton-bone type="line" class="line-80" />
          <cdr-skeleton-bone type="line" class="line-70" />
        </div>
      </section>
    </cdr-skeleton>
  </div>
</template>

<script setup>
import { CdrSkeleton, CdrSkeletonBone } from "@rei/cedar";
</script>

<style scoped lang="scss">
.quest-content {
  position: relative;
  padding-right: 2rem;
}

.delete-button {
  position: absolute;
  top: 0.25rem;
  right: 0;
}

.icon-bone {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.25rem;
}

.title-bone {
  width: 65%;
  height: 2rem;
  margin-bottom: 0.5rem;
}

.quest-giver {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.label-bone {
  width: 6rem;
  height: 1.125rem;
}

.line-70 {
  width: 70%;
  height: 1.125rem;
}

.line-75 {
  width: 75%;
  height: 1.125rem;
}

.line-80 {
  width: 80%;
  height: 1.125rem;
}

.line-85 {
  width: 85%;
  height: 1.125rem;
}

.line-90 {
  width: 90%;
  height: 1.125rem;
}

.line-95 {
  width: 95%;
  height: 1.125rem;
}

.paragraph {
  margin: 0.75rem 0 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.subhead-bone {
  width: 8rem;
  height: 1.25rem;
  margin-bottom: 0.5rem;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.list-bone {
  width: 85%;
  height: 1rem;
  margin: 0.3rem 0;
}
</style>
